#!/usr/bin/env python3
# The skeptic's own one-call programs for rung M. Each case: name, call, walk setup, compiled setup (None: walk only).
# Writes walk/<Name>.fss and compiled/C<Name>.fss beside this file, and list.txt.
import os
D = os.path.dirname(os.path.abspath(__file__))
HELP = '''typeOf(x: Any): String = typecase x of
    ZZ32 => "ZZ32"
    ZZ64 => "ZZ64"
    NN32 => "NN32"
    NN64 => "NN64"
    ZZ => "ZZ"
    %s
    RR64 => "RR64"
    else => "other"
  end
'''
GEN = 'bigger[\\T extends StandardTotalOrder[\\T\\]\\](a: T, c: T): T = a MAX c\n'
M3 = 'm3: ZZ32 = -1 ; '
cases = [
 # control: must refuse on the base sandbox and answer on the edit, as the worker's matrix measured
 ('ControlMaxNumZZ64', 'b MAX 1', 'b: ZZ64 = widen(3)', 'b: ZZ64 = 3'),
 # the sibling operators MAXNUM and MINNUM, which Integral gives every integer type by self MAX other (FortressLibrary.fss:661-662)
 ('MaxnumNumZZ64', 'b MAXNUM 1', 'b: ZZ64 = widen(3)', None),
 ('MinnumNumZZ64', 'b MINNUM 1', 'b: ZZ64 = widen(3)', None),
 ('MaxnumNumZZ',   'b MAXNUM 1', 'b: ZZ = big(3)', None),
 ('MaxnumVarZZ64ZZ32', 'w MAXNUM z', 'w: ZZ64 = widen(4) ; z: ZZ32 = 3', None),
 ('MaxnumVarNN64NN32', 'v MAXNUM u', 'v: NN64 = unsigned(widen(4)) ; u: NN32 = unsigned(3)', None),
 ('MaxnumNumZZ32', 'b MAXNUM 1', 'b: ZZ32 = 3', None),
 ('MaxnumVarZZ64ZZ64', 'w MAXNUM y', 'w: ZZ64 = widen(4) ; y: ZZ64 = widen(3)', None),
 # beside the rationals and the floats
 ('MaxZZ32QQ', 'z MAX q', 'z: ZZ32 = 3 ; q: QQ = 7/2', None),
 ('MaxZZ64QQ', 'w MAX q', 'w: ZZ64 = widen(3) ; q: QQ = 7/2', None),
 ('MaxZZQQ',   'g MAX q', 'g: ZZ = big(3) ; q: QQ = 7/2', None),
 ('MinQQNN64', 'q MIN v', 'q: QQ = 7/2 ; v: NN64 = unsigned(widen(3))', None),
 ('MaxZZ32RR64', 'z MAX f', 'z: ZZ32 = 3 ; f: RR64 = 2.5', 'z: ZZ32 = 3 ; f: RR64 = 2.5'),
 ('MaxZZ64RR64', 'w MAX f', 'w: ZZ64 = widen(3) ; f: RR64 = 2.5', 'w: ZZ64 = 3 ; f: RR64 = 2.5'),
 ('MaxNN32RR64', 'u MAX f', 'u: NN32 = unsigned(3) ; f: RR64 = 2.5', 'k: ZZ32 = 3 ; u: NN32 = unsigned(k) ; f: RR64 = 2.5'),
 # values beyond the signed range, and the unsigned order
 ('EdgeNN32ZZ32Max', 'u MAX z', 'u: NN32 = unsigned(-1) ; z: ZZ32 = -1', M3 + 'u: NN32 = unsigned(m3) ; z: ZZ32 = -1'),
 ('EdgeNN32ZZ32Min', 'u MIN z', 'u: NN32 = unsigned(-1) ; z: ZZ32 = -1', M3 + 'u: NN32 = unsigned(m3) ; z: ZZ32 = -1'),
 ('EdgeNN32NN32Min', 'u MIN t', 'u: NN32 = unsigned(-1) ; t: NN32 = unsigned(1)', M3 + 'o: ZZ32 = 1 ; u: NN32 = unsigned(m3) ; t: NN32 = unsigned(o)'),
 ('EdgeNN64NN64Min', 'v MIN y', 'v: NN64 = unsigned(widen(-1)) ; y: NN64 = unsigned(widen(1))', M3 + 'o: ZZ32 = 1 ; v: NN64 = unsigned(widen(m3)) ; y: NN64 = unsigned(widen(o))'),
 ('EdgeNN64ZZ64Max', 'v MAX w', 'v: NN64 = unsigned(widen(-1)) ; w: ZZ64 = widen(-5)', M3 + 'v: NN64 = unsigned(widen(m3)) ; w: ZZ64 = -5'),
 ('EdgeNN64NN32Max', 'v MAX u', 'v: NN64 = unsigned(widen(-1)) ; u: NN32 = unsigned(-1)', M3 + 'v: NN64 = unsigned(widen(m3)) ; u: NN32 = unsigned(m3)'),
 ('EdgeZZ32ZZ64Min', 'z MIN w', 'z: ZZ32 = -2147483647 - 1 ; w: ZZ64 = widen(-2147483647) TIMES widen(2147483647)', 'z: ZZ32 = -2147483647 - 1 ; w: ZZ64 = -4611686014132420609'),
 ('EdgeZZZZ64Max', 'g MAX w', 'g: ZZ = big(2147483647) TIMES big(2147483647) TIMES big(2147483647) ; w: ZZ64 = widen(-1)', 'g: ZZ = 9903520300447984150353281023 ; w: ZZ64 = -1'),
 ('EdgeZZ64ZZMin', 'w MIN g', 'g: ZZ = big(2147483647) TIMES big(2147483647) TIMES big(2147483647) ; w: ZZ64 = widen(-1)', 'g: ZZ = 9903520300447984150353281023 ; w: ZZ64 = -1'),
 # numerals beyond ZZ32
 ('NumeralBigZZ32', 'z MAX 3000000000', 'z: ZZ32 = 3', 'z: ZZ32 = 3'),
 ('NumeralBigZZ64', 'w MAX 3000000000', 'w: ZZ64 = widen(3)', 'w: ZZ64 = 3'),
 ('NumeralHugeZZ64', 'w MAX 100000000000000000000', 'w: ZZ64 = widen(3)', 'w: ZZ64 = 3'),
 ('NumeralBigNN32', 'u MIN 3000000000', 'u: NN32 = unsigned(3)', 'k: ZZ32 = 3 ; u: NN32 = unsigned(k)'),
 # equal values at mixed widths
 ('EqualZZ64ZZ32Max', 'w MAX z', 'w: ZZ64 = widen(3) ; z: ZZ32 = 3', 'w: ZZ64 = 3 ; z: ZZ32 = 3'),
 ('EqualZZ32ZZ64Min', 'z MIN w', 'w: ZZ64 = widen(3) ; z: ZZ32 = 3', 'w: ZZ64 = 3 ; z: ZZ32 = 3'),
 ('EqualNN32ZZ32Minmax', 'u MINMAX z', 'u: NN32 = unsigned(3) ; z: ZZ32 = 3', 'k: ZZ32 = 3 ; u: NN32 = unsigned(k) ; z: ZZ32 = 3'),
 # inside a generic function and a reduction
 ('GenericZZ64', 'bigger(w, y)', 'w: ZZ64 = widen(3) ; y: ZZ64 = widen(7)', 'w: ZZ64 = 3 ; y: ZZ64 = 7'),
 ('GenericNN32', 'bigger(u, t)', 'u: NN32 = unsigned(3) ; t: NN32 = unsigned(7)', 'k: ZZ32 = 3 ; o: ZZ32 = 7 ; u: NN32 = unsigned(k) ; t: NN32 = unsigned(o)'),
 ('GenericExplicitZZ64', 'bigger[\\ZZ64\\](w, z)', 'w: ZZ64 = widen(3) ; z: ZZ32 = 7', 'w: ZZ64 = 3 ; z: ZZ32 = 7'),
 # printing an NN64 above the signed range, apart from any MAX (the compiled CEdgeNN64NN32Max printed -1)
 ('PrintNN64', 'v', 'v: NN64 = unsigned(widen(-1))', M3 + 'v: NN64 = unsigned(widen(m3))'),
 ('BigMaxZZ64', 'BIG MAX [i <- 1#5] widen(i)', 'ignored: ZZ32 = 0', None),
 ('BigMinZZ', 'BIG MIN [i <- 1#5] big(i)', 'ignored: ZZ32 = 0', None),
]
os.makedirs(os.path.join(D, 'walk'), exist_ok=True)
os.makedirs(os.path.join(D, 'compiled'), exist_ok=True)
def prog(name, call, setup, compiled):
    lit = 'IntLiteral => "IntLiteral"' if compiled else 'QQ => "QQ"'
    body = '\n'.join('    ' + s.strip() for s in setup.split(';'))
    gen = GEN if 'bigger' in call else ''
    lab = call.replace('\\', '')
    show = ('    r = %s\n    println("%s = " r " : " typeOf(r))\n' % (call, lab)) if 'MINMAX' not in call else \
           ('    (r, s) = %s\n    println("%s = (" r ", " s ") : (" typeOf(r) ", " typeOf(s) ")")\n' % (call, lab))
    return 'component %s\nexport Executable\n\n%s\n%srun(): () = do\n%s\n%s  end\n\nend\n' % (name, HELP % lit, gen, body, show)
with open(os.path.join(D, 'list.txt'), 'w') as L:
    for n, call, ws, cs in cases:
        open(os.path.join(D, 'walk', n + '.fss'), 'w').write(prog(n, call, ws, False))
        if cs is not None:
            open(os.path.join(D, 'compiled', 'C' + n + '.fss'), 'w').write(prog('C' + n, call, cs, True))
        L.write('%s\t%s\t[%s]\t%s\n' % (n, call, ws, 'C' + n if cs else '-'))
print(len(cases), 'cases')
