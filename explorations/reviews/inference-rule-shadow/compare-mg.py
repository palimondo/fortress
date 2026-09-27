#!/usr/bin/env python3
"""compare-mg.py : microGPT's own errors (mg/<prog>-<lib>-<variant>.own.tsv, fullerrs.py's rows at the
programs' own files) stock against the rule, per program and library copy: the counts, each error
the rule clears and each it adds, matched by kind, site and whole message; and, per library, the
refusals at the range operators # and : (the numeral switch's shape, numerics-plan-fable.md § 3.2)."""
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
