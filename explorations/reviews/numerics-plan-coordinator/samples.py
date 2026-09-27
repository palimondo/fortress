import sys, collections, re
sys.path.insert(0, "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan")
from encl import lines
def rows(p):
    for l in open(p, encoding="utf-8"):
        q = l.rstrip("\n").split("\t")
        if len(q) >= 4: yield q
def src(loc):
    out = []
    for x in loc.split(","):
        if ":" not in x: continue
        fn, ln = x.split(":")[0], int(x.split(":")[1])
        L = lines(fn)
        if L: out.append("%s:%d `%s`" % (fn, ln, L[1][ln-1].strip()[:140]))
    return " | ".join(out)
def shape(m):
    m = re.sub(r"\S+\.fs[si]:\d+(:\d+(-\d+)?)?(:\d+)?", "@", m)
    return m[:70]
p = sys.argv[1]; want = sys.argv[2:]
by = collections.defaultdict(list)
for q in rows(p): by[q[0]].append(q)
for c in want:
    rs = by[c]
    shapes = collections.Counter(shape(q[3]) for q in rs)
    print("=== %s  %d" % (c, len(rs)))
    for s, n in shapes.most_common(12): print("   %4d  %s" % (n, s))
    seen = set(); k = 0
    for q in rs:
        s = shape(q[3]); f = q[2].split(":")[0]
        if (s, f) in seen: continue
        seen.add((s, f)); k += 1
        print("  - %s\n      MSG: %s\n      SRC: %s" % (q[2], q[3], src(q[2])))
        if k >= 5: break
