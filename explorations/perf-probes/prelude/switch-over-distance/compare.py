#!/usr/bin/env python3
"""compare.py <a.tsv> <b.tsv> : error-by-error comparison of two errors.py tables.

The library copies of make-flat-lib.py change FortressLibrary.{fsi,fss} and
FortressBuiltin.{fsi,fss}, which shifts their line numbers, so line numbers in those four
files are removed (from the location and from the message) before two errors are matched;
everything else must be equal: kind, family, subclass, unit and message.  Prints what goes,
what appears and what stays, by kind and by family."""
import collections, re, sys

SHIFTED = r"((?:FortressLibrary|FortressBuiltin)\.fs[si]):\d+(?::\d+(?:-\d+)?(?::\d+)?)?"

def load(p):
    c = collections.Counter()
    for l in open(p, encoding="utf-8"):
        if l.startswith("#"): continue
        kind, fam, sub, units, stages, loc, msg = l.rstrip("\n").split("\t")
        loc = ",".join(sorted(set(re.sub(SHIFTED, r"\1", x) for x in loc.split(","))))
        c[(kind, fam, sub, units, loc, re.sub(SHIFTED, r"\1", msg))] += 1
    return c

a, b = load(sys.argv[1]), load(sys.argv[2])
go, new, stay = a - b, b - a, a & b
print("# %s %d   %s %d   go %d   appear %d   stay %d" % (sys.argv[1].split("/")[-1], sum(a.values()),
      sys.argv[2].split("/")[-1], sum(b.values()), sum(go.values()), sum(new.values()), sum(stay.values())))
KS = ["exclusion", "comprises", "overloading", "return-type", "abstract-method", "bound-Object",
      "wellformed", "typecheck", "export"]
def big(k):
    return k if k in KS else "other"
for name, c in (("go", go), ("appear", new), ("stay", stay)):
    print("\n## %s, by kind" % name)
    for k, n in collections.Counter(big(e[0]) for e in c.elements()).most_common(): print("%6d  %s" % (n, k))
    print("## %s, overloading and return-type by family (subclass)" % name)
    fam = collections.Counter((e[0], e[1], e[2]) for e in c.elements() if e[0] in ("overloading", "return-type"))
    for (k, f, s), n in sorted(fam.items(), key=lambda kv: (kv[0][0], -kv[1], kv[0][1])):
        print("%6d  %-12s %-40s %s" % (n, k, f, s))
    print("## %s, the component's type errors and the rest, by message shape (top 25)" % name)
    rest = collections.Counter((e[0], e[1]) for e in c.elements() if e[0] not in ("overloading", "return-type"))
    for (k, f), n in rest.most_common(25): print("%6d  %-14s %s" % (n, k, f[:110]))
