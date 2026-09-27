#!/usr/bin/env python3
"""A numeral at a typed binding of each number type, walk (one component per case) and
the checker (BBindCk, one function per case)."""
import os
D = os.path.dirname(os.path.abspath(__file__))
CASES = [
  ('BwB1NN32',   'a: NN32 = 3'),
  ('BwB2NN64',   'a: NN64 = 3'),
  ('BwB3ZZ',     'a: ZZ = 3'),
  ('BwB4RR32',   'a: RR32 = 1.5'),
  ('BwB5RR64Big','a: RR64 = 3000000000'),
  ('BwB6ZZ32Big','a: ZZ32 = 3000000000'),
  ('BwB7ZZ64Big','a: ZZ64 = 3000000000'),
  ('BwB8NNplus', 'u: NN32 = unsigned(5)\n    a = u + 1'),
  ('BwB9RR64Int','a: RR64 = 3'),
]
SHOWN = 'shown(v: Any): String = v.asString || " : " || v.ilkName\n'
names = []
for name, stmt in CASES:
    body = '\n'.join('    ' + s.strip() for s in stmt.split('\n'))
    src = 'component %s\nexport Executable\n(* evidence-B probe; walk *)\n%srun(): () = do\n%s\n    println("%s -> " shown(a))\n  end\nend\n' % (name, SHOWN, body, stmt.replace('\n', '; '))
    open(os.path.join(D, name + '.fss'), 'w', encoding='utf-8').write(src)
    names.append(name)
fns = '\n'.join('k%d(): () = do %s; () end' % (i + 1, stmt.replace('\n', '; ')) for i, (n, stmt) in enumerate(CASES))
ck = 'component BBindCk\nexport Executable\n(* evidence-B probe; the compiled checker over the one library: a numeral at a typed binding *)\n%s\nk10(): () = do u: NN32 = unsigned(5); v = u + 1; c: String = v; () end\nrun(): () = ()\nend\n' % fns
open(os.path.join(D, 'BBindCk.fss'), 'w', encoding='utf-8').write(ck)
print('\n'.join(names))
