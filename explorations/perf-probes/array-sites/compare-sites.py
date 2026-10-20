#!/usr/bin/env python3
# compare-sites.py <before.tsv> <after.tsv>: two per-site lists of the distance stage (the landed
# explorations/compile-ladder/gate/distance-sites.tsv, or errors.py's errors.tsv in a run's scratch folder),
# compared site by site with line numbers masked, and the two export errors entry by entry. Written for
# the array-sites probe (REPORT.md beside it).
import sys, re, collections
def rows(p):
    out = []
    for l in open(p, encoding="utf-8"):
        if l.startswith("#") or not l.strip(): continue
        c = l.rstrip("\n").split("\t")
        out.append(c)
    return out
def mask(s): return re.sub(r"(\.fs[si]):\d+([:.]\d+)?(-\d+(:\d+)?)?", r"\1:L", s)
def key(c):
    kind, loc, msg = c[0], c[5], c[6]
    if kind == "export":
        return (kind, mask(loc), mask(msg.split(":")[0]))
    return (kind, mask(loc), mask(msg))
def entries(msg):
    m = re.search(r"\{(.*)\}\s*$", msg)
    if not m: return []
    body = m.group(1)
    # split on top-level ", " that start an entry: missing declarations end in "at FILE:pos"
    if "Missing declarations" in msg:
        return [mask(e.strip()) for e in re.findall(r"(.*?at FortressLibrary\.fsi:[\d:.-]+)(?:, |$)", body)]
    return [mask(e.strip()) for e in re.findall(r"\((?:ObjectDecl|TraitDecl)[^()]*?(?:\([^()]*\)[^()]*?)*\)", body)]
old, new = rows(sys.argv[1]), rows(sys.argv[2])
ko = collections.Counter(key(c) for c in old); kn = collections.Counter(key(c) for c in new)
print("landed", sum(ko.values()), "now", sum(kn.values()))
for k in sorted(ko - kn): print("GONE\t" + "\t".join(k)[:300], "x%d" % (ko - kn)[k] if (ko-kn)[k] > 1 else "")
for k in sorted(kn - ko): print("COME\t" + "\t".join(k)[:300], "x%d" % (kn - ko)[k] if (kn-ko)[k] > 1 else "")
# the export errors entry by entry
for which in ("does not define all declarations", "are not matched by the declarations"):
    eo = [e for c in old if c[0] == "export" and which in c[6] for e in entries(c[6])]
    en = [e for c in new if c[0] == "export" and which in c[6] for e in entries(c[6])]
    print("export '%s': landed %d entries, now %d" % (which, len(eo), len(en)))
    for e in sorted(set(eo) - set(en)): print("  entry GONE  ", e[:200])
    for e in sorted(set(en) - set(eo)): print("  entry COME  ", e[:200])
