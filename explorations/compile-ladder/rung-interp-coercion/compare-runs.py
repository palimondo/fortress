#!/usr/bin/env python3
"""compare-runs.py <runA-log-dir> <runB-log-dir> [<runC-log-dir>]: for every test log present in all
the given runs (the output of run-tests.sh), reports the tests whose output differs, after dropping
the timing on the rc= line.  With three runs (base, base again, after), a test whose two base runs
already differ is reported as varying on its own, and a test is reported as changed only when the
after run differs from both base runs."""
import os, re, sys

def load(d, t):
    with open(os.path.join(d, t), errors='replace') as f:
        return [re.sub(r' secs=\d+$', '', l.rstrip('\n')) for l in f]

dirs = sys.argv[1:]
common = sorted(set.intersection(*[set(os.listdir(d)) for d in dirs]))
print("tests compared: %d" % len(common))
if len(dirs) == 2:
    diff = [t for t in common if load(dirs[0], t) != load(dirs[1], t)]
    print("differ: %d" % len(diff))
    for t in diff: print("  " + t)
else:
    a, b, c = dirs
    vary = [t for t in common if load(a, t) != load(b, t)]
    changed = [t for t in common if load(c, t) != load(a, t) and load(c, t) != load(b, t)]
    print("vary on their own (base run 1 against base run 2): %d" % len(vary))
    for t in vary: print("  " + t)
    print("changed by the edit (after differs from both base runs): %d" % len(changed))
    for t in changed: print("  " + t)
    rc = {}
    for t in common:
        for name, d in (('base1', a), ('base2', b), ('after', c)):
            last = [l for l in load(d, t) if l.startswith('rc=')]
            rc.setdefault(t, {})[name] = last[-1] if last else 'rc=?'
    nz = [t for t in common if rc[t]['after'] != 'rc=0']
    print("nonzero exit after the edit: %d (all of them nonzero in both base runs too: %s)" %
          (len(nz), all(rc[t]['base1'] == rc[t]['after'] == rc[t]['base2'] for t in nz)))
