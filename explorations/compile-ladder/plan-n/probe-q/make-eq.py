#!/usr/bin/env python3
"""make-eq.py <switched FortressLibrary.fss> <out-dir>

Writes the devices for Number's = as edited copies of the switched library (<out-dir>/eqN.fss) and
their patches against it (<out-dir>/lib-eqN.patch, labels Library/FortressLibrary.fss, applied by
homes.sh after lib-switch.patch):
  eq0m  no device, as the switch leaves rung F's = (a numeral falls to exactValue's else, Ratio(0, 0)),
        with a marker line printed at that else, to count the calls that reach it (the reach pass).
  eq1   a numeral case in exactValue, the one library's own typecase: the numeral converted to QQ.
  eq2   Number's = promoting to the narrowest common type instead of QQ where a numeral is one side:
        the numeral compared at the other operand's type when it holds the numeral's value, else
        unequal (Julia's promotion for a literal); two exact non-numerals keep exactValue's QQ.
  eq3   the compiled library's shape within rung Q's files: no = on Number, each number type's own
        = (the top-level opr =(a:Any, b:Any), the team's, stays).
"""
import difflib, os, sys

src, out = sys.argv[1], sys.argv[2]
base = open(src).read()
os.makedirs(out, exist_ok=True)

ELSE = "        else => Ratio(0, 0)\n    end\n"
assert base.count(ELSE) == 1
NUMBER_EQ = """    (** Two exact numbers of different types compare as rationals; a float
        compares with any number after %asFloat%, so an exact value equals
        its nearest float. **)
    opr =(self, other:Number):Boolean =
        typecase self of
            RR64 => (asFloat(self) = asFloat(other))
            else => typecase other of
                        RR64 => (asFloat(self) = asFloat(other))
                        else => (exactValue(self) = exactValue(other))
                    end
        end
"""
assert base.count(NUMBER_EQ) == 1

v = {}
v['eq0m'] = base.replace(ELSE, '        else => do printlnWithThread("PROBEQ-EXACTVALUE-ELSE"); Ratio(0, 0) end\n    end\n')
v['eq1'] = base.replace(ELSE, "        z: IntLiteral => do q: QQ = z; q end\n" + ELSE)
EQ2 = NUMBER_EQ.replace("else => (exactValue(self) = exactValue(other))",
                        "else => promotedEq(self, other)")
HELPERS = """
(* Probe Q, device 2: two exact numbers of different types compared at their narrowest common type
   where one is a numeral, which takes the other operand's type when that type holds its value. *)
promotedEq(a: Number, b: Number): Boolean =
    typecase a of
        n: IntLiteral => literalEq(n, b)
        else => typecase b of
                    n: IntLiteral => literalEq(n, a)
                    else => (exactValue(a) = exactValue(b))
                end
    end

literalEq(n: IntLiteral, b: Number): Boolean =
    typecase b of
        y: IntLiteral => (n = y)
        y: ZZ32 => if (n >= -2147483648) AND (n <= 2147483647) then (y = n.asZZ32) else false end
        y: ZZ64 => if (n >= -9223372036854775808) AND (n <= 9223372036854775807) then (y = n.asZZ64) else false end
        y: NN32 => if (n >= 0) AND (n <= 4294967295) then (y = n.asNN32) else false end
        y: NN64 => if (n >= 0) AND (n <= 18446744073709551615) then (y = n.asNN64) else false end
        y: ZZ => (y = n.asZZ)
        y: QQ => (y = Ratio(n.asZZ, 1))
        else => false
    end
"""
v['eq2'] = base.replace(NUMBER_EQ, EQ2).replace("\nexactValue(x: Number): QQ =", HELPERS + "\nexactValue(x: Number): QQ =")
v['eq3'] = base.replace(NUMBER_EQ, "    (* Probe Q, device 3: no = on Number; each number type declares its own. *)\n")

for name, text in v.items():
    open(os.path.join(out, name + '.fss'), 'w').write(text)
    d = difflib.unified_diff(base.splitlines(True), text.splitlines(True),
                             'a/Library/FortressLibrary.fss', 'b/Library/FortressLibrary.fss')
    open(os.path.join(out, 'lib-' + name + '.patch'), 'w').write(''.join(d))
    print(name, sum(1 for l in text.splitlines()) - sum(1 for l in base.splitlines()), 'lines net')
