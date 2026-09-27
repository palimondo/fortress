#!/usr/bin/env python3
"""The library's devices for writing a number of type T inside generic code, one walk
probe per device (a walk failure ends the run), and one checker probe (BDevCk)."""
import os
D = os.path.dirname(os.path.abspath(__file__))
DECLS = r'''shown(v: Any): String = v.asString || " : " || v.ilkName
thr[\T\](): T = throw ForbiddenException
oneOf[\T extends Integral[\T\]\](): T =
    typecase thr[\T\] of
        () -> ZZ32 => cast[\T\](1)
        () -> ZZ64 => cast[\T\](widen(1))
        () -> NN32 => cast[\T\](unsigned(1))
        else => cast[\T\](1)
    end
incOne[\T extends Integral[\T\]\](x: T): T = x + x.one
incCast[\T extends Integral[\T\]\](x: T): T = x + cast[\T\](1)
incAsif[\T extends Integral[\T\]\](x: T): T = x + (1 asif T)
incWit[\T extends Integral[\T\]\](x: T): T = x + oneOf[\T\]()
incWiden[\T extends Integral[\T\]\](x: T): T = x + widen(1)
'''
CASES = [
  ('BwD1One',   'println("D1 incOne(l: ZZ64) -> " shown(incOne(l)))'),
  ('BwD2Cast',  'println("D2 incCast(l: ZZ64) -> " shown(incCast(l)))'),
  ('BwD3Asif',  'println("D3 incAsif(l: ZZ64) -> " shown(incAsif(l)))'),
  ('BwD4Wit',   'println("D4 incWit(l: ZZ64) -> " shown(incWit(l)))'),
  ('BwD5Widen', 'println("D5 incWiden(l: ZZ64) -> " shown(incWiden(l)))'),
  ('BwD6OneNN', 'println("D6 incOne(u: NN32) -> " shown(incOne(u)))'),
  ('BwD7WitNN', 'println("D7 incWit(u: NN32) -> " shown(incWit(u)))'),
]
PRE = '''    z: ZZ32 = 5
    l: ZZ64 = widen(z)
    u: NN32 = unsigned(z)
'''
for name, stmt in CASES:
    src = 'component %s\nexport Executable\n(* evidence-B probe; walk *)\n%s\nrun(): () = do\n%s    %s\n  end\nend\n' % (name, DECLS, PRE, stmt)
    open(os.path.join(D, name + '.fss'), 'w', encoding='utf-8').write(src)
    print(name)
ck = 'component BDevCk\nexport Executable\n(* evidence-B probe; the compiled checker over the one library: the devices *)\n%s\nl: ZZ64 = widen(5)\nu: NN32 = unsigned(5)\nd1(): () = do v = incOne(l); c: String = v; () end\nd2(): () = do v = incWit(u); c: String = v; () end\nrun(): () = ()\nend\n' % DECLS
open(os.path.join(D, 'BDevCk.fss'), 'w', encoding='utf-8').write(ck)
