#!/usr/bin/env python3
"""compare-runs.py <base1-log-dir> <base2-log-dir> <after-log-dir> [new-test ...]: compares the three runs
of run-tests.sh (the base twice, then the edited tree) over the tests present in all three.  The rc= line's
timing is dropped.  A test whose two base runs differ varies on its own; for those, every line the two base
runs share must still be in the after run, and the rc lines must agree.  A test stable in the base runs is
changed when its after output differs; such a difference is shown again with the Java line numbers of a
printed stack trace (.java:N) and identity hash codes (@HASH) normalised.  The rung's own new tests,
named on the command line, are left out."""
import os, re, sys

def load(d, t, norm=False):
    with open(os.path.join(d, t), errors='replace') as f:
        L = [re.sub(r' secs=\d+$', '', l.rstrip('\n')) for l in f]
    if norm:
        L = [re.sub(r'@[0-9a-f]{5,8}\b', '@HASH', re.sub(r'\.java:\d+\)', '.java:N)', l)) for l in L]
    return L

b1, b2, af = sys.argv[1:4]
new = {n + '.txt' for n in sys.argv[4:]}
common = sorted((set(os.listdir(b1)) & set(os.listdir(b2)) & set(os.listdir(af))) - new)
print("tests compared (the rung's own new tests left out): %d" % len(common))
vary = [t for t in common if load(b1, t) != load(b2, t)]
print("vary on their own (base run 1 against base run 2): %d" % len(vary))
for t in vary:
    a, b, c = load(b1, t, True), load(b2, t, True), load(af, t, True)
    lost = [l for l in set(a) & set(b) if l not in set(c)]
    rc = [[l for l in x if l.startswith('rc=')] for x in (a, b, c)]
    print("  %-28s lines %d/%d/%d  rc %s/%s/%s  base-shared lines missing after: %d%s" % (
        t, len(a), len(b), len(c), rc[0], rc[1], rc[2], len(lost),
        ''.join('\n      ' + l[:140] for l in lost)))
stable = [t for t in common if t not in vary]
changed = [t for t in stable if load(af, t) != load(b1, t)]
print("stable in both base runs: %d; different after the edit: %d" % (len(stable), len(changed)))
for t in changed:
    print("  %s: different after normalising stack-trace line numbers and identity hashes: %s" % (
        t, load(af, t, True) != load(b1, t, True)))
nz = [t for t in common if [l for l in load(af, t) if l.startswith('rc=')] != ['rc=0']]
print("nonzero exit after the edit: %d; the same exit in both base runs for each: %s" % (
    len(nz), all([l for l in load(b1, t) if l.startswith('rc=')] == [l for l in load(af, t) if l.startswith('rc=')]
                  == [l for l in load(b2, t) if l.startswith('rc=')] for t in nz)))
