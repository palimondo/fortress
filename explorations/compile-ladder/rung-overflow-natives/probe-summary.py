#!/usr/bin/env python3
"""probe-summary.py <list-file> <log-dir> [<log-dir> ...]: the logging pass's site list, in the form of rung O's
probes/overflow-probe-summary.txt.  For every program of the list with at least one OVERFLOW-PROBE line: the
number of probe lines, the count per native, and the first probe line; then the number of such programs, the
exit codes, and the programs that reached their timeout (rc=124) or printed no trailer."""
import collections
import os
import re
import sys

lst, dirs = sys.argv[1], sys.argv[2:]
names = [os.path.basename(l.strip())[:-4] for l in open(lst) if l.strip()]
hit = 0
rcs = collections.Counter()
timeouts, missing = [], []
for t in names:
    lines = None
    for d in dirs:
        p = os.path.join(d, t + '.txt')
        if os.path.exists(p):
            lines = open(p, encoding='utf-8', errors='replace').read().splitlines()
            break
    if lines is None:
        missing.append(t)
        continue
    probes = [l for l in lines if l.startswith('OVERFLOW-PROBE ')]
    rc = next((l.split()[0][3:] for l in reversed(lines) if l.startswith('rc=')), None)
    if rc is None:
        missing.append(t)
    else:
        rcs[rc] += 1
        if rc == '124':
            timeouts.append(t)
    if probes:
        hit += 1
        per = collections.Counter(l.split()[1] for l in probes)
        print('%-28s %7d  %-40s first: %s' % (t, len(probes),
              ' '.join('%d %s;' % (n, k) for k, n in sorted(per.items())), probes[0]))
print()
print('programs with at least one probe line: %d of %d' % (hit, len(names)))
print('exit codes: ' + '  '.join('%d rc=%s' % (n, k) for k, n in sorted(rcs.items())))
print('reached the timeout (rc=124): %s' % (' '.join(timeouts) or 'none'))
print('no output or no trailer: %s' % (' '.join(missing) or 'none'))
