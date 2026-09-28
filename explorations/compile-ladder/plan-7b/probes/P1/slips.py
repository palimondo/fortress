#!/usr/bin/env python3
"""slips.py <dir>: one way to repair the three component declarations probe P1 found refused by the
positional rule, each a declared return type wider than the declaration it overrides, in place in
FortressLibrary.fss of <dir>, each edit matching as counted:
  Col's and Row's subarray[\\nat b, nat s, nat o\\] declare ReadableArray1[\\T, b, s\\] where Array1's,
      which they override, declares Array1[\\T, b, s\\]; their bodies build a Col and a Row, each an Array1:
      declared Array1[\\T, b, s\\];
  MappedGenerator's map[\\G\\] declares the object SimpleMappedGenerator[\\E,G\\], which
      SimpleMappedIndexed's map, returning SimpleMappedIndexed[\\E,G,I\\], cannot be below: declared
      the trait MappedGenerator[\\E,G\\], which both objects extend."""
import os
import sys

p = os.path.join(sys.argv[1], "FortressLibrary.fss")
s = open(p, encoding="utf-8").read()
for old, new, n in [
    ("    subarray[\\nat b, nat s, nat o\\](m: ZZ32): ReadableArray1[\\T, b, s\\] =\n",
     "    subarray[\\nat b, nat s, nat o\\](m: ZZ32): Array1[\\T, b, s\\] =\n", 2),
    ("    map[\\G\\](f': F->G): SimpleMappedGenerator[\\E,G\\] =\n        SimpleMappedGenerator[\\E,G\\](self.g, f' COMPOSE self.f)\n",
     "    map[\\G\\](f': F->G): MappedGenerator[\\E,G\\] =\n        SimpleMappedGenerator[\\E,G\\](self.g, f' COMPOSE self.f)\n", 1)]:
    assert s.count(old) == n, (old[:60], s.count(old))
    s = s.replace(old, new)
open(p, "w", encoding="utf-8").write(s)
print("slips ->", p)
