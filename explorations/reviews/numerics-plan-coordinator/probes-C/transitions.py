#!/usr/bin/env python3
"""transitions.py <base-full.tsv> <variant-full.tsv> [--map <base-lib> <variant-lib>] [-v CLASS...] :
site by site (compare_c.py's keys: kind, location at the base's lines, n-th at the site), what
became of each base error: gone, or still an error and in which class of classify.py; and the
variant's new sites by class.  With -v, lists the sites of the named base classes and their fate,
and every new site (class, kind, location, message cut at 200)."""
import collections, sys
HERE = "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C"
argv = sys.argv[1:]
show = []
if "-v" in argv:
    i = argv.index("-v"); show = argv[i + 1:]; argv = argv[:i]
src = open(HERE + "/compare_c.py").read().split("a, b = keyed(args[0], False), keyed(args[1], True)")[0]
saved = sys.argv; sys.argv = ["compare_c.py", "--sites"] + argv
ns = {"__file__": HERE + "/compare_c.py"}; exec(src, ns)
sys.argv = saved
A = ns["keyed"](ns["args"][0], False); B = ns["keyed"](ns["args"][1], True)
trans = collections.defaultdict(collections.Counter)
for k, (c, m) in A.items():
    trans[c]["GONE" if k not in B else B[k][0]] += 1
newc = collections.Counter(c for k, (c, m) in B.items() if k not in A)
codes = [c for c, _, _ in ns["C"].RULES] + ["GF", "OT"]
print("# base class: base count -> gone, and the classes of the sites still in error")
for c in codes:
    if not trans[c]: continue
    t = trans[c]; tot = sum(t.values())
    rest = ", ".join("%s %d" % (x, n) for x, n in sorted(t.items(), key=lambda z: -z[1]) if x != "GONE")
    print("%-3s %4d -> gone %4d; still: %s" % (c, tot, t["GONE"], rest or "-"))
print("# new sites by class: " + ", ".join("%s %d" % (c, n) for c, n in newc.most_common()))
print("# total: base %d, variant %d, gone %d, new %d" % (len(A), len(B), sum(t["GONE"] for t in trans.values()), sum(newc.values())))
if show:
    for k, (c, m) in A.items():
        if c in show:
            fate = "GONE" if k not in B else "-> " + B[k][0]
            print("B\t%s\t%s\t%s\t%s\t%s" % (c, fate, k[0], k[1], m[:200]) + ("" if k not in B else "\n  now: " + B[k][1][:260]))
    for k, (c, m) in B.items():
        if k not in A:
            print("N\t%s\t%s\t%s\t%s" % (c, k[0], k[1], m[:200]))
