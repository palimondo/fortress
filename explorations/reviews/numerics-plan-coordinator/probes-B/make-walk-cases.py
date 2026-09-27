#!/usr/bin/env python3
"""Write one walk probe component per case (a failure under walk ends the run, so each
case stands alone).  The shared declarations are the same text as BGenCk.fss's."""
import os
D = os.path.dirname(os.path.abspath(__file__))
DECLS = r'''shown(v: Any): String = v.asString || " : " || v.ilkName
object BoxT[\T\](v: ZZ32) end
inc[\T extends Integral[\T\]\](x: T): T = x + 1
twice[\T extends Integral[\T\]\](x: T, y: T): T = x + y
pick[\T\](x: T, y: T): T = x
idt[\T\](x: T): T = x
takes64(x: ZZ64): ZZ64 = x
scale64[\T\](b: BoxT[\T\], m: ZZ64): ZZ64 = m
scaleR[\T\](b: BoxT[\T\], m: RR64): RR64 = m
scaleT[\T\](b: BoxT[\T\], m: ZZ32): ZZ32 = m
'''
PRE = '''    z: ZZ32 = 5
    l: ZZ64 = widen(z)
    u: NN32 = unsigned(z)
'''
CASES = [
  # name, the statement(s) of the case
  ('BwG1IncZZ64',   'println("G1 inc(l: ZZ64) -> " shown(inc(l)))'),
  ('BwG2IncZZ32',   'println("G2 inc(z: ZZ32) -> " shown(inc(z)))'),
  ('BwG3IncNum',    'println("G3 inc(5) -> " shown(inc(5)))'),
  ('BwG4IncNN32',   'println("G4 inc(u: NN32) -> " shown(inc(u)))'),
  ('BwG5IncZZ',     'println("G5 inc(big(5): ZZ) -> " shown(inc(big(5))))'),
  ('BwI1TwiceLNum', 'println("I1 twice(l: ZZ64, 3) -> " shown(twice(l, 3)))'),
  ('BwI2TwiceLZ',   'println("I2 twice(l: ZZ64, z: ZZ32) -> " shown(twice(l, z)))'),
  ('BwI3TwiceNums', 'println("I3 twice(3, 4) -> " shown(twice(3, 4)))'),
  ('BwI4PickLNum',  'println("I4 pick(l: ZZ64, 3) -> " shown(pick(l, 3)))'),
  ('BwI5CtxZZ64',   'a: ZZ64 = idt(3)\n    println("I5 a: ZZ64 = idt(3) -> " shown(a))'),
  ('BwI6CtxRR64',   'r: RR64 = idt(3)\n    println("I6 r: RR64 = idt(3) -> " shown(r))'),
  ('BwI7ArgParam',  'println("I7 takes64(idt(3)) -> " shown(takes64(idt(3))))'),
  ('BwI8Gen64Num',  'println("I8 scale64(BoxT[\\\\String\\\\](2), 3) -> " shown(scale64(BoxT[\\String\\](2), 3)))'),
  ('BwI9GenRRNum',  'println("I9 scaleR(BoxT[\\\\String\\\\](2), 3) -> " shown(scaleR(BoxT[\\String\\](2), 3)))'),
  ('BwI10Gen32Num', 'println("I10 scaleT(BoxT[\\\\String\\\\](2), 3) -> " shown(scaleT(BoxT[\\String\\](2), 3)))'),
  ('BwI11Gen64Z',   'println("I11 scale64(BoxT[\\\\String\\\\](2), z: ZZ32) -> " shown(scale64(BoxT[\\String\\](2), z)))'),
  ('BwI12Gen64Written', 'println("I12 scale64[\\\\String\\\\](BoxT[\\\\String\\\\](2), 3) -> " shown(scale64[\\String\\](BoxT[\\String\\](2), 3)))'),
  ('BwR1RangeLNum', 'for i <- seq(l#3) do println("R1 l#3 (l: ZZ64) element -> " shown(i)) end'),
  ('BwR2RangeLL',   'for i <- seq(l#widen(3)) do println("R2 l#widen(3) element -> " shown(i)) end'),
  ('BwR3Range0L',   'for i <- seq(0#l) do println("R3 0#l (l: ZZ64 = 5) element -> " shown(i)) end'),
  ('BwR4RangeNN',   'for i <- seq(u#unsigned(3)) do println("R4 u#unsigned(3) (NN32) element -> " shown(i)) end'),
  ('BwR5RangeZZNum','for i <- seq(big(1)#3) do println("R5 big(1)#3 element -> " shown(i)) end'),
  ('BwR6RangeZZ32', 'for i <- seq(z#3) do println("R6 z#3 (control) element -> " shown(i)) end'),
  ('BwR7ColonL',    'for i <- seq(l:widen(7)) do println("R7 l:widen(7) element -> " shown(i)) end'),
  ('BwR8RangeZNum', 'for i <- seq(big(1)#big(3)) do println("R8 big(1)#big(3) element -> " shown(i)) end'),
]
for name, stmt in CASES:
    body = '\n'.join('    ' + s.strip() for s in stmt.split('\n'))
    src = 'component %s\nexport Executable\n(* evidence-B probe; walk *)\n%s\nrun(): () = do\n%s%s\n  end\nend\n' % (name, DECLS, PRE, body)
    open(os.path.join(D, name + '.fss'), 'w', encoding='utf-8').write(src)
    print(name)
