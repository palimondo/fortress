import sys, collections
def files(loc):
    return tuple(sorted(set(x.split(":")[0] for x in loc.split(","))))
for path in sys.argv[1:]:
    t = collections.defaultdict(collections.Counter)
    for l in open(path, encoding="utf-8"):
        p = l.rstrip("\n").split("\t")
        if len(p) < 4: continue
        c, k, loc = p[0], p[1], p[2]
        fs = files(loc)
        key = fs[0] if len(fs) == 1 else "+".join(fs)
        t[c][key] += 1
    print("##", path)
    for c in sorted(t):
        print(c, sum(t[c].values()), dict(t[c].most_common()))
