#!/usr/bin/env python3
# compare-walk.py <base harness output> <new harness output>: two runs of harness-one.sh over the same
# test files, compared test by test (the harness shuffles their order), with the masks of the
# fortress-repo skill's gate.md, "Comparing with an earlier run". Written for the array-sites probe.
import sys, re, collections
def blocks(p):
    b = collections.OrderedDict(); cur = None
    for l in open(p, encoding="utf-8", errors="replace"):
        m = re.match(r"^\. interpret \S*/tests/(\S+)", l)
        if m: cur = m.group(1); b[cur] = []; continue
        if cur is None: continue
        if l.startswith(("OK (", "exit=", "EXIT=", "Time:", "FAILURES")): cur = None; continue
        l = re.sub(r"Operation took \d+ ?ms", "Operation took Nms", l)
        l = re.sub(r"OK \(time = \d+ms\)", "OK (time = Nms)", l)
        l = re.sub(r"@[0-9a-f]{4,}", "@HASH", l)
        l = re.sub(r"(FortressLibrary\.fs[si]):\d+(:\d+)?(-\d+(:\d+)?)?", r"\1:L", l)
        b[cur].append(l.rstrip("\n"))
    return b
a, n = blocks(sys.argv[1]), blocks(sys.argv[2])
print("tests: base %d, new %d" % (len(a), len(n)))
same = 0
for t in sorted(set(a) | set(n)):
    if a.get(t) == n.get(t): same += 1; continue
    if sorted(a.get(t, [])) == sorted(n.get(t, [])):
        print("ORDER ONLY", t); same += 1; continue
    print("DIFFERS", t)
    import difflib
    for d in difflib.unified_diff(a.get(t, []), n.get(t, []), lineterm="", n=0): print("   ", d[:200])
print("equal after masks:", same, "of", len(set(a) | set(n)))
print("verdict lines base:", [l for l in open(sys.argv[1]) if l.startswith(("OK (", "FAILURES", "Tests run"))])
print("verdict lines new: ", [l for l in open(sys.argv[2]) if l.startswith(("OK (", "FAILURES", "Tests run"))])
