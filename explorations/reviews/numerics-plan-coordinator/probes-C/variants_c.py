#!/usr/bin/env python3
"""variants_c.py <copy-dir> <variant> : respell a library copy for measure-C (the numerics plan,
worker C).  <copy-dir> holds every .fsi/.fss of Library/ and ProjectFortress/LibraryBuiltin/ side
by side (distance-triage/run.sh's step `lib`).  A variant name may join several with '+', applied
left to right.  Every edit asserts how many places it changes, so a variant fails loudly on a tree
where its text has moved.

  BP, BOUNDS, DEVICE, R421   distance-triage/variants.py's, called unchanged
  FAILB   the result-only static parameters behind the triage's class N2 given the written bound
          Object, as BP gives it to builtinPrimitive: fail[\\T\\] (FortressLibrary, api and
          component) and List's nullary opr BIG <|[\\T\\]|> (api and component)
  Z32     scalar ranges over ZZ32 only (z32.py): every static parameter of RangeInternals and of
          FortressLibrary's range operators that stands for a scalar range's integer is removed
          and replaced by ZZ32; see z32.py's header for what stays generic

Tree 1 of measure-C is BP+FAILB+R421+BOUNDS+DEVICE; tree 2 is tree 1 +Z32.
"""
import io, os, re, subprocess, sys

d, variant = sys.argv[1], sys.argv[2]
HERE = os.path.dirname(os.path.abspath(__file__))
TRIAGE = "/home/user/fortress/explorations/perf-probes/prelude/distance-triage/variants.py"

def rd(n): return io.open(os.path.join(d, n), encoding="utf-8").read()
def wr(n, s): io.open(os.path.join(d, n), "w", encoding="utf-8").write(s)

def sub(n, pat, rep, count, flags=0):
    s = rd(n)
    s2, k = re.subn(pat, rep, s, flags=flags)
    assert k == count, (n, pat, k, count)
    wr(n, s2)

def one(v):
    if v in ("BP", "BOUNDS", "DEVICE", "R421", "BPANY", "VEC"):
        r = subprocess.run([sys.executable, TRIAGE, d, v])
        assert r.returncode == 0, v
    elif v == "FAILB":
        # fail[\T\](s:String):T  (FortressLibrary.fsi:37, .fss:54)
        sub("FortressLibrary.fsi", r"^fail\[\\T\\\]\(s:String\):T$", r"fail[\\T extends Object\\](s:String):T", 1, re.M)
        sub("FortressLibrary.fss", r"^fail\[\\T\\\]\(s:String\):T = do$", r"fail[\\T extends Object\\](s:String):T = do", 1, re.M)
        # opr BIG <|[\T\]|>  (List.fsi:109, List.fss:177): the nullary comprehension, T only in the result
        sub("List.fsi", r"^opr BIG <\|\[\\T\\\]\|>:", r"opr BIG <|[\\T extends Object\\]|>:", 1, re.M)
        sub("List.fss", r"^opr BIG <\|\[\\T\\\]\|>:", r"opr BIG <|[\\T extends Object\\]|>:", 1, re.M)
    elif v == "Z32":
        r = subprocess.run([sys.executable, os.path.join(HERE, "z32.py"), d])
        assert r.returncode == 0, v
    else:
        raise SystemExit("unknown variant " + v)

for v in variant.split("+"): one(v)
print("variant %s written to %s" % (variant, d))
