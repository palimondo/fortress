#!/usr/bin/env python3
"""compare-sites.py <old-commit> <before.tsv> <after.tsv> : two errors.py tables of two trees
compared by site, not by message.  Run from $FORTRESS_HOME.

A site is an error's kind and its location (file:line, several for a pair), with each line
of the older table carried to the newer tree by a line map of its file between <old-commit>
and the work tree (difflib over the two texts; a line inside an edited hunk maps to nothing).
Whole messages are not compared, because a message that lists candidates changes when a
candidate's type changes, while the site does not: an error at a site both tables have is
the same obligation, whatever its message now says (`reworded` counts those whose message
differs).  Prints sites that go, appear and stay, by kind and unit."""
import collections, difflib, os, re, subprocess, sys

old_commit, before, after = sys.argv[1:4]
DIRS = ["Library", "ProjectFortress/LibraryBuiltin"]
_maps = {}

def path_of(name):
    for d in DIRS:
        if os.path.exists(os.path.join(d, name)): return os.path.join(d, name)
    return None

def line_map(name):
    if name in _maps: return _maps[name]
    p = path_of(name)
    m = None
    if p:
        try:
            old = subprocess.run(["git", "show", "%s:%s" % (old_commit, p)], capture_output=True,
                                 text=True, check=True).stdout.splitlines()
            new = open(p, encoding="utf-8").read().splitlines()
            m = {}
            for a, b, n in difflib.SequenceMatcher(None, old, new, autojunk=False).get_matching_blocks():
                for i in range(n): m[a + i + 1] = b + i + 1
        except subprocess.CalledProcessError:
            m = None
    _maps[name] = m
    return m

def load(path, mapped):
    rows = []
    for l in open(path, encoding="utf-8"):
        if l.startswith("#"): continue
        kind, fam, sub, units, stages, loc, msg = l.rstrip("\n").split("\t")
        locs = []
        for x in loc.split(","):
            r = re.match(r"([\w.]+\.fs[si]):(\d+)$", x)
            if not r: locs.append(x); continue
            f, n = r.group(1), int(r.group(2))
            if mapped:
                m = line_map(f)
                if m is not None: n = m.get(n, "edited@%d" % n)
            locs.append("%s:%s" % (f, n))
        rows.append((kind, units.split("+")[0], ",".join(sorted(locs)), re.sub(r"[\w.]+\.fs[si]:\d+", "L", msg)))
    return rows

A, B = load(before, True), load(after, False)
ka = collections.Counter((r[0], r[1], r[2]) for r in A)
kb = collections.Counter((r[0], r[1], r[2]) for r in B)
ma = collections.defaultdict(collections.Counter); mb = collections.defaultdict(collections.Counter)
for r in A: ma[r[:3]][r[3]] += 1
for r in B: mb[r[:3]][r[3]] += 1
go, new, stay = ka - kb, kb - ka, ka & kb
reworded = sum(min(n, sum((mb[k] - ma[k]).values())) for k, n in stay.items())
unmapped = sum(1 for r in A if "edited@" in r[2])
print("# sites: before %d, after %d; go %d, appear %d, stay %d (of which reworded %d); before-errors at an edited line %d"
      % (sum(ka.values()), sum(kb.values()), sum(go.values()), sum(new.values()), sum(stay.values()), reworded, unmapped))
print("\n## by kind: before, after, go, appear, stay")
kinds = sorted(set(k[0] for k in list(ka) + list(kb)))
for k in kinds:
    f = lambda c: sum(n for e, n in c.items() if e[0] == k)
    print("%-16s %6d %6d %6d %6d %6d" % (k, f(ka), f(kb), f(go), f(new), f(stay)))
print("\n## by unit: before, after, go, appear, stay")
for u in sorted(set(k[1] for k in list(ka) + list(kb))):
    f = lambda c: sum(n for e, n in c.items() if e[1] == u)
    print("%-28s %6d %6d %6d %6d %6d" % (u, f(ka), f(kb), f(go), f(new), f(stay)))
print("\n## by kind and unit: go, appear")
for k in kinds:
    for u in sorted(set(e[1] for e in list(go) + list(new) if e[0] == k)):
        g = sum(n for e, n in go.items() if e[:2] == (k, u)); a = sum(n for e, n in new.items() if e[:2] == (k, u))
        print("%-16s %-28s %6d %6d" % (k, u, g, a))

def shape(m):
    m = re.sub(r"\[\\.*?\\\]", "[\\..\\]", m)
    m = re.sub(r"\(.*", "(..", m) if m.startswith("Could not check call") and " - " not in m[:60] else m
    return m[:100]
for name, keys, src in (("go", go, ma), ("appear", new, mb)):
    print("\n## %s: sites by kind, unit and message shape (top 40)" % name)
    c = collections.Counter()
    for k, n in keys.items():
        msgs = list(src[k].elements())
        for m in msgs[:n]: c[(k[0], k[1], shape(m))] += 1
    for (k, u, s), n in c.most_common(40): print("%5d  %-12s %-26s %s" % (n, k[:12], u[:26], s))
