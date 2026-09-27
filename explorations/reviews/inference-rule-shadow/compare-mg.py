#!/usr/bin/env python3
"""compare-mg.py : microGPT's own errors (mg/<prog>-<lib>-<variant>.own.tsv, fullerrs.py's rows at the
programs' own files) stock against the rule, per program and library copy: the counts, each error
the rule clears and each it adds, matched by kind, site and whole message; and, per library, the
refusals at the range operators # and : (the numeral switch's shape, numerics-plan-fable.md § 3.2).
Then, by site alone (a site's message may list other candidates on another library), each library
copy under the rule against today's library under the rule: what the switch still costs."""
import os, re, collections
here = os.path.join(os.path.dirname(os.path.abspath(__file__)), "mg")
def rows(p):
    out = []
    for l in open(p, encoding="utf-8"):
        f = l.rstrip("\n").split("\t")
        if len(f) >= 5: out.append((f[0], f[3], f[4]))
    return out
def decls(rs):   # the declarations a range refusal sits in: distinct sites
    return sorted(set(r[1] for r in rs if re.search(r"Could not check call to operator [#:] ", r[2])))
for prog in ("c4", "apl"):
    for lib in ("L0", "A0", "A0T2"):
        a, b = os.path.join(here, "%s-%s-stock.own.tsv" % (prog, lib)), os.path.join(here, "%s-%s-rule.own.tsv" % (prog, lib))
        if not (os.path.exists(a) and os.path.exists(b)): continue
        ra, rb = rows(a), rows(b)
        ca, cb = collections.Counter(ra), collections.Counter(rb)
        gone, new = list((ca - cb).elements()), list((cb - ca).elements())
        print("%s %s: own errors stock %d, rule %d; cleared %d, new %d; range refusals at # or : stock %d sites, rule %d"
              % (prog, lib, len(ra), len(rb), len(gone), len(new), len(decls(ra)), len(decls(rb))))
        for r in sorted(gone, key=lambda r: r[1]): print("    cleared  %s  %s" % (r[1], r[2][:170]))
        for r in sorted(new, key=lambda r: r[1]): print("    NEW      %s  %s" % (r[1], r[2][:170]))

print("\n# by site: each copy under the rule against today's library (L0) under the rule")
def sites(p): return collections.Counter((r[0], r[1]) for r in rows(p))
for prog in ("c4", "apl"):
    base = os.path.join(here, "%s-L0-rule.own.tsv" % prog)
    if not os.path.exists(base): continue
    for lib in ("A0", "A0T2"):
        p = os.path.join(here, "%s-%s-rule.own.tsv" % (prog, lib))
        if not os.path.exists(p): continue
        a, b = sites(base), sites(p)
        full = {(r[0], r[1]): r[2] for r in rows(p)}
        fa = {(r[0], r[1]): r[2] for r in rows(base)}
        print("%s %s: sites %d, L0 %d; only on %s %d, only on L0 %d" % (prog, lib, sum(b.values()), sum(a.values()), lib, sum((b - a).values()), sum((a - b).values())))
        for k in (b - a): print("    only %s  %s  %s" % (lib, k[1], full[k][:160]))
        for k in (a - b): print("    only L0    %s  %s" % (k[1], fa[k][:160]))
