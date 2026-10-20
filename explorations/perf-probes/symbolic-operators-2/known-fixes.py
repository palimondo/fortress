#!/usr/bin/env python3
r"""known-fixes.py <tree> <family>...: the library edits this probe measured under the full
overloading check, as exact-text edits that must each match exactly once (one that does not
stops the script before any file is written). They are shadow edits: the probe applies them
to its worktree's library, runs the distance stage (run-shadow.sh) and resets the library
with git checkout. SORT.md's known fixes, as they stand on main at d97001d19:

  empty     EmptyString's || (row 611): the meet opr ||(self, _:EmptyString) in the component,
            and in String's api too when str4 is applied (str4 makes the object's members visible)
  str4      String's four concatenation families (row 585): juxtaposition's device, three
            top-level operators per family. Since climb batch 19 the library carries the
            conversion C ("" || a and cast[\Object\]), so this is the earlier probe's way JC:
            way J's shape with today's bodies, and String's api's 5 lines
  eq        = : Integral's meet opr =(self, b:I) (api and component, bodiless as Integral's
            other operators), and ZZ's api opr =(self, b:ZZ), which its component declares
  abs       |_| : Maybe's meet (api and component), SubString's and FlatString's api stating the
            opr |self| their components have, Float's |self| : RR64
  abshead   |_| another way: String's api header extends DelegatedIndexed[\Char,ZZ32\] as its
            component does (in place of abs's SubString and FlatString lines); with abs's Maybe
            and Float lines
  maybeidx  Maybe's subscript meet opr [i:ZZ32] (api, and the component restating Condition's body)
  vecops    the api's six top-level Vector and Matrix + and -, which the component never defines
            (the Vector three lost their unused nat m in climb batch 20, e487cec2d)
  floatpow  ^ : Float's meet opr ^(self, b:RR64):RR64 (the one ^ error left after P-153)

The designs of the subscripts and of the vector's scalar + are in designs.py beside this.
"""
import sys

T = sys.argv[1]
fams = sys.argv[2:]
FL, FLI = T + '/Library/FortressLibrary.fss', T + '/Library/FortressLibrary.fsi'
FB = T + '/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss'
SS, SSI, FSI = T + '/Library/String.fss', T + '/Library/String.fsi', T + '/Library/FlatString.fsi'
known = {'empty', 'str4', 'eq', 'abs', 'abshead', 'maybeidx', 'vecops', 'floatpow'}
bad = [f for f in fams if f not in known]
if bad:
    sys.exit('unknown families: ' + ' '.join(bad))
edits = []


def e(f, old, new):
    edits.append((f, old, new))


if 'empty' in fams:
    e(SS, "    opr || (self, other:String): String = other\n    opr || (self, other:Char):String = other.asString\n",
          "    opr || (self, other:String): String = other\n    opr || (self, _:EmptyString): String = self\n"
          "    opr || (self, other:Char):String = other.asString\n")

if 'str4' in fams:
    # the component: String's members out
    e(FL, "    opr ||(self, b:String):String\n    opr ||(self, b:Number)", "    opr ||(self, b:Number)")
    e(FL, "    opr ||(a:Any, self):String = (\"\" || a) || self\n"
          "    opr ||(self, b:Any):String = self || cast[\\Object\\](b).asString\n", "")
    e(FL, """    opr |||(self, b:String): String =
        if |self| = 0 then b
        elif |b| = 0 then self
        else self || " " || b
        end
    opr |||(self, b:Any): String = self ||| (""||b)
    opr |||(a:Any, self): String = (""||a) ||| self
""", "")
    e(FL, """    opr //(self, a:String): String = self || newline || a
    opr //(self, a:Any): String    = self || newline || a
    opr //(a:Any, self): String    = a || newline || self
""", "")
    e(FL, """    opr ///(self, a:String): String = self || doubleNewline || a
    opr ///(self, a:Any): String    = self || doubleNewline || a
    opr ///(a:Any, self): String    = a || doubleNewline || self
""", "")
    top = """(** String's four concatenation families are top-level operators, as juxtaposition's
    below: two functional methods with self at different positions have no meet. **)
opr ||(a:Any, b:String):String = ("" || a) || b
opr ||(a:String, b:String):String =
    typecase a of
        a':FlatString => a' || b
        a':Concatenable => a' || b
        else => concatAndBalanceIfNecessary(a, b)
    end
opr ||(a:String, b:Any):String = a || cast[\\Object\\](b).asString

opr |||(a:Any, b:String): String = (""||a) ||| b
opr |||(a:String, b:String): String =
    if |a| = 0 then b
    elif |b| = 0 then a
    else a || " " || b
    end
opr |||(a:String, b:Any): String = a ||| (""||b)

opr //(a:Any, b:String): String    = a || newline || b
opr //(a:String, b:String): String = a || newline || b
opr //(a:String, b:Any): String    = a || newline || b

opr ///(a:Any, b:String): String    = a || doubleNewline || b
opr ///(a:String, b:String): String = a || doubleNewline || b
opr ///(a:String, b:Any): String    = a || doubleNewline || b

"""
    J = "(** Right now for backward compatibility juxtaposition works like %||% **)\nopr juxtaposition(a:Any, b:String)"
    e(FL, J, top + J)
    # String's api: the string objects' own || made visible, so the meet's typecase reaches them
    e(SSI, "  trait Concatenable extends String\n  end\n",
           "  trait Concatenable extends String\n    opr ||(self, other:String): String\n"
           "    opr ||(self, _:EmptyString): String\n    opr ||(self, other:Char): String\n  end\n")
    e(SSI, "  value object EmptyString extends {String, Concatenable}\n  end\n",
           "  value object EmptyString extends {String, Concatenable}\n    opr ||(self, other:String): String\n" +
           ("    opr ||(self, _:EmptyString): String\n" if 'empty' in fams else "") +
           "    opr ||(self, other:Char): String\n  end\n")
    # the api
    e(FLI, "    opr ||(self, b:String):String\n    opr ||(self, b:Number):String\n", "    opr ||(self, b:Number):String\n")
    e(FLI, "    opr ||(a:Any, self):String\n    opr ||(self, b:Any):String\n", "")
    e(FLI, "    opr |||(self, b:String): String\n    opr |||(self, b:Any): String\n    opr |||(a:Any, self): String\n", "")
    e(FLI, "    opr //(self, a:String): String\n    opr //(self, a:Any): String\n    opr //(a:Any, self): String\n", "")
    e(FLI, "    opr ///(self, a:String): String\n    opr ///(self, a:Any): String\n    opr ///(a:Any, self): String\n", "")
    e(FLI, "(** Right now for backward compatibility juxtaposition works like %||% **)\nopr juxtaposition(a:Any, b:String):String\n",
           """(** String's four concatenation families are top-level operators, as juxtaposition's **)
opr ||(a:Any, b:String):String
opr ||(a:String, b:String):String
opr ||(a:String, b:Any):String
opr |||(a:Any, b:String):String
opr |||(a:String, b:String):String
opr |||(a:String, b:Any):String
opr //(a:Any, b:String):String
opr //(a:String, b:String):String
opr //(a:String, b:Any):String
opr ///(a:Any, b:String):String
opr ///(a:String, b:String):String
opr ///(a:String, b:Any):String

(** Right now for backward compatibility juxtaposition works like %||% **)
opr juxtaposition(a:Any, b:String):String
""")

if 'eq' in fams:
    e(FLI, "    opr -(self):I\n    opr DOTMINUS(self):I\n    opr +(self,b:I):I\n",
           "    opr -(self):I\n    opr DOTMINUS(self):I\n    opr =(self,b:I):Boolean\n    opr +(self,b:I):I\n")
    e(FL, "    opr -(self):I\n    opr DOTMINUS(self):I\n    opr +(self,b:I):I\n",
          "    opr -(self):I\n    opr DOTMINUS(self):I\n    opr =(self,b:I):Boolean\n    opr +(self,b:I):I\n")
    e(FLI, "    coerce(x: IntLiteral)\n    opr <(self, other:ZZ): Boolean\n",
           "    coerce(x: IntLiteral)\n    opr =(self, b: ZZ):Boolean\n    opr <(self, other:ZZ): Boolean\n")

if 'abs' in fams or 'abshead' in fams:
    e(FLI, "    opr SQCAP(self, o: Maybe[\\T\\]): Maybe[\\T\\]\n    map[\\G\\](f: T->G): Maybe[\\G\\]\n",
           "    opr SQCAP(self, o: Maybe[\\T\\]): Maybe[\\T\\]\n    opr |self| : ZZ32\n    map[\\G\\](f: T->G): Maybe[\\G\\]\n")
    e(FL, "        comprises { Nothing[\\T\\], Just[\\T\\] }\n    opr SQCAP(self, o: Maybe[\\T\\]): Maybe[\\T\\] = Nothing[\\T\\]    (*) semilattice \"meet\" operator\n",
          "        comprises { Nothing[\\T\\], Just[\\T\\] }\n    opr SQCAP(self, o: Maybe[\\T\\]): Maybe[\\T\\] = Nothing[\\T\\]    (*) semilattice \"meet\" operator\n"
          "    opr |self|: ZZ32 = if self.holds then 1 else 0 end\n")
    e(FB, "    opr |self| : Number =\n        builtinPrimitive(\"com.sun.fortress.interpreter.glue.prim.Float$Abs\")",
          "    opr |self| : RR64 =\n        builtinPrimitive(\"com.sun.fortress.interpreter.glue.prim.Float$Abs\")")
if 'abs' in fams:
    e(SSI, "  object SubString(baseString: String, range: Range[\\ZZ32\\]) extends {Concatenable, DelegatedIndexed[\\Char, ZZ32\\]}\n  end\n",
           "  object SubString(baseString: String, range: Range[\\ZZ32\\]) extends {Concatenable, DelegatedIndexed[\\Char, ZZ32\\]}\n"
           "    opr |self| : ZZ32\n  end\n")
    e(FSI, "    opr ||(self, b:Char): String\n    flatConcat(self, b:FlatString):String\n",
           "    opr ||(self, b:Char): String\n    opr |self| : ZZ32\n    flatConcat(self, b:FlatString):String\n")
if 'abshead' in fams:
    e(FLI, "trait String extends { StandardTotalOrder[\\String\\], ZeroIndexed[\\Char\\] }\n",
           "trait String extends { StandardTotalOrder[\\String\\], ZeroIndexed[\\Char\\], DelegatedIndexed[\\Char,ZZ32\\] }\n")

if 'maybeidx' in fams:
    e(FLI, "    map[\\G\\](f: T->G): Maybe[\\G\\]\n    ivmap[\\G\\](f: (ZZ32,T)->G): Maybe[\\G\\]\nend\n",
           "    opr [i:ZZ32]:T throws NotFound\n    map[\\G\\](f: T->G): Maybe[\\G\\]\n    ivmap[\\G\\](f: (ZZ32,T)->G): Maybe[\\G\\]\nend\n")
    e(FL, "    map[\\G\\](f: T->G): Maybe[\\G\\] =\n        cond[\\Maybe[\\G\\]\\](fn (e:T):Maybe[\\G\\] => Just[\\G\\](f(e)), fn ():Maybe[\\G\\] => Nothing[\\G\\])\n",
          "    opr [i:ZZ32]:T throws NotFound = if i=0 then self.get else throw NotFound end\n"
          "    map[\\G\\](f: T->G): Maybe[\\G\\] =\n        cond[\\Maybe[\\G\\]\\](fn (e:T):Maybe[\\G\\] => Just[\\G\\](f(e)), fn ():Maybe[\\G\\] => Nothing[\\G\\])\n")

if 'vecops' in fams:
    for old in ["""opr +[\\ T extends { Number, MultiplicativeRing[\\T\\] }, nat n \\]
     (me : Vector[\\T,n\\], other : Vector[\\T,n\\]):Vector[\\T,n\\]

opr -[\\ T extends { Number, MultiplicativeRing[\\T\\] }, nat n \\]
     (me : Vector[\\T,n\\], other : Vector[\\T,n\\]):Vector[\\T,n\\]

opr -[\\ T extends { Number, MultiplicativeRing[\\T\\] }, nat n \\]
     (me : Vector[\\T,n\\]):Vector[\\T,n\\]

""", """opr +[\\ T extends { Number, MultiplicativeRing[\\T\\] }, nat n, nat m \\]
     (me:Matrix[\\T,n,m\\], other:Matrix[\\T,n,m\\]): Matrix[\\T,n,m\\]

opr -[\\ T extends { Number, MultiplicativeRing[\\T\\] }, nat n, nat m \\]
     (me:Matrix[\\T,n,m\\], other:Matrix[\\T,n,m\\]) : Matrix[\\T,n,m\\]

opr -[\\ T extends { Number, MultiplicativeRing[\\T\\] }, nat n, nat m \\]
     (me:Matrix[\\T,n,m\\]): Matrix[\\T,n,m\\]

"""]:
        e(FLI, old, "")

if 'floatpow' in fams:
    e(FB, "    opr ^(self, b:RR32):RR64 =\n        builtinPrimitive(\"com.sun.fortress.interpreter.glue.prim.Float$Pow\")\n",
          "    opr ^(self, b:RR32):RR64 =\n        builtinPrimitive(\"com.sun.fortress.interpreter.glue.prim.Float$Pow\")\n"
          "    opr ^(self, b:RR64):RR64 =\n        builtinPrimitive(\"com.sun.fortress.interpreter.glue.prim.Float$Pow\")\n")

texts = {}
for (f, old, new) in edits:
    s = texts.get(f)
    if s is None:
        s = open(f, encoding='utf-8').read()
    n = s.count(old)
    if n != 1:
        sys.exit('edit matches %d times in %s:\n%s' % (n, f, old[:300]))
    texts[f] = s.replace(old, new, 1)
for f, s in texts.items():
    open(f, 'w', encoding='utf-8').write(s)
print('%s: %d edits in %d files' % (' '.join(fams), len(edits), len(texts)))
