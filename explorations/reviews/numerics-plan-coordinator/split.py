import sys, collections
sys.path.insert(0, "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan")
from encl import number_bound
def rows(p):
    for l in open(p, encoding="utf-8"):
        q = l.rstrip("\n").split("\t")
        if len(q) >= 4: yield q
def fileof(loc):
    fs = sorted(set(x.split(":")[0] for x in loc.split(",")))
    return fs[0] if len(fs) == 1 else "+".join(fs)
def bounds(loc):
    b = set()
    for x in loc.split(","):
        if ":" not in x: continue
        fn, ln = x.split(":")[0], int(x.split(":")[1])
        f, _ = number_bound(fn, ln); b |= f
    return b
for p in sys.argv[1:]:
    tot = collections.Counter(); nb = collections.defaultdict(collections.Counter)
    percls = collections.defaultdict(collections.Counter)
    for c, k, loc, msg in ((q[0], q[1], q[2], q[3]) for q in rows(p)):
        f = fileof(loc); tot[f] += 1
        b = bounds(loc)
        tag = "integral" if "integral" in b else ("Number" if "Number" in b else ("algebra" if "algebra" in b else "none"))
        nb[f][tag] += 1
        percls[c][tag] += 1
    print("##", p, sum(tot.values()))
    for f, n in tot.most_common():
        print("  %-45s %5d  %s" % (f, n, dict(nb[f])))
    print("  by class:")
    for c in sorted(percls): print("   ", c, sum(percls[c].values()), dict(percls[c]))
