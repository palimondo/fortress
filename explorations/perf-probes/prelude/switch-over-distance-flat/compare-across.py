#!/usr/bin/env python3
"""compare-across.py <before.tsv> <after.tsv> : errors.py tables of two trees compared error
by error, as ../switch-over-distance/compare.py does for two library copies, except that
line numbers are removed from every .fsi and .fss location and message, since batch 6
edited FortressLibrary, FortressBuiltin, RangeInternals and String and shifted their lines.
Two errors match when kind, family, subclass, unit(s), file and message are equal; a
count, not a set, so that one message at several lines of one file matches by number.
Prints what goes, what appears and what stays, by kind, by family and by message shape,
and the net change by kind and unit."""
import collections, re, sys

LINES = r"([\w.]+\.fs[si]):\d+(?::\d+(?:-\d+)?(?::\d+)?)?"

def load(p):
    c = collections.Counter()
    for l in open(p, encoding="utf-8"):
        if l.startswith("#"): continue
        kind, fam, sub, units, stages, loc, msg = l.rstrip("\n").split("\t")
        loc = ",".join(sorted(set(re.sub(LINES, r"\1", x) for x in loc.split(","))))
        c[(kind, fam, sub, units, loc, re.sub(LINES, r"\1", msg))] += 1
    return c

a, b = load(sys.argv[1]), load(sys.argv[2])
go, new, stay = a - b, b - a, a & b
print("# %s %d   %s %d   go %d   appear %d   stay %d" % (sys.argv[1], sum(a.values()),
      sys.argv[2], sum(b.values()), sum(go.values()), sum(new.values()), sum(stay.values())))
KS = ["exclusion", "comprises", "overloading", "return-type", "abstract-method", "bound-Object",
      "wellformed", "typecheck", "export"]
def big(k):
    return k if k in KS else "other"
print("\n## net by kind: before, after, go, appear")
for k in KS + ["other"]:
    bk = sum(n for e, n in a.items() if big(e[0]) == k); ak = sum(n for e, n in b.items() if big(e[0]) == k)
    gk = sum(n for e, n in go.items() if big(e[0]) == k); nk = sum(n for e, n in new.items() if big(e[0]) == k)
    if bk or ak: print("%-16s %6d %6d %6d %6d" % (k, bk, ak, gk, nk))
print("\n## net by unit (first unit of the error): before, after, go, appear")
units = sorted(set(e[3].split("+")[0] for e in list(a) + list(b)))
for u in units:
    f = lambda c: sum(n for e, n in c.items() if e[3].split("+")[0] == u)
    print("%-28s %6d %6d %6d %6d" % (u, f(a), f(b), f(go), f(new)))
for name, c in (("go", go), ("appear", new), ("stay", stay)):
    print("\n## %s, by kind" % name)
    for k, n in collections.Counter(big(e[0]) for e in c.elements()).most_common(): print("%6d  %s" % (n, k))
    print("## %s, overloading and return-type by family (subclass)" % name)
    fam = collections.Counter((e[0], e[1], e[2]) for e in c.elements() if e[0] in ("overloading", "return-type"))
    for (k, f, s), n in sorted(fam.items(), key=lambda kv: (kv[0][0], -kv[1], kv[0][1])):
        print("%6d  %-12s %-40s %s" % (n, k, f, s))
    print("## %s, the rest by kind and message shape (top 40)" % name)
    rest = collections.Counter((e[0], e[1] if e[1] != "-" else e[5][:100]) for e in c.elements()
                               if e[0] not in ("overloading", "return-type"))
    for (k, f), n in rest.most_common(40): print("%6d  %-14s %s" % (n, k, f[:110]))
