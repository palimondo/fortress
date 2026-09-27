#!/usr/bin/env python3
"""new-sites.py <full.tsv> : the sites that appeared between the 2026-09-26 measurement and
today's (switch-over-distance-flat.md section 2.3, "Appeared"), by class of classify.py.
Run from $FORTRESS_HOME.  A site is an error's kind and location; the 2026-09-26 table
(../switch-over-distance/errors-walk.tsv, on b628871a2) is carried to today's lines by the
flat measurement's line map (../switch-over-distance-flat/compare-sites.py, imported)."""
import collections, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import classify as C
src = open(os.path.join(HERE, "../switch-over-distance-flat/compare-sites.py"), encoding="utf-8").read()
ns = {"__name__": "compare_sites", "sys": sys}
exec(src.split("A, B = load(before, True), load(after, False)")[0].replace(
    "old_commit, before, after = sys.argv[1:4]", "old_commit = 'b628871a2'"), ns)
old = ns["load"](os.path.join(HERE, "../switch-over-distance/errors-walk.tsv"), True)
old_sites = {(r[0], r[2]) for r in old}
rows = C.load(sys.argv[1]); cls = C.with_cascades(rows)
by = collections.Counter(); unit = collections.Counter(); ex = collections.defaultdict(list)
seen = set()
for r, c in zip(rows, cls):
    kind, fam, loc, msg = r
    site = (kind, loc)
    if site in old_sites or site in seen: continue
    seen.add(site)
    f = loc.split(":")[0]
    by[(f, kind, c)] += 1
    if len(ex[(f, c)]) < 3: ex[(f, c)].append(loc)
print("# sites of today's list with no site in the 2026-09-26 list (walk's setting), by file, kind and class")
for (f, kind, c), n in sorted(by.items(), key=lambda x: (x[0][0], -x[1])):
    print("%-22s %-10s %-4s %4d  %s  e.g. %s" % (f, kind, c, n, C.NAMES[c][:60], ", ".join(ex[(f, c)])))
print("total", sum(by.values()))
