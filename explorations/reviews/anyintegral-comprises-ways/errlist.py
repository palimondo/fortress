#!/usr/bin/env python3
"""errlist.py <run.txt> <lib-dir>: one line per checker error in a WorldFlip or Shell run's output,
sorted: its location lines (a line that is a path, line and columns ending in a colon) joined, then
its message lines joined, the library copy's directory and $FORTRESS_HOME removed from every path.
Lines of the driver's own instrumentation (@@PROBE, ###) and the closing count are not part of an error."""
import os
import re
import sys

run, lib = sys.argv[1], os.path.abspath(sys.argv[2])
home = os.environ.get('FORTRESS_HOME', os.getcwd())
LOC = re.compile(r'^/\S+:\d+:\d+(-\d+)?(:\d+)?(-\d+(:\d+)?)?:$')
errs, locs, msg = [], [], []


def flush():
    if locs:
        errs.append(' | '.join(locs) + ' :: ' + ' '.join(msg))


for line in open(run, encoding='utf-8', errors='replace'):
    line = line.rstrip('\n')
    if LOC.match(line):
        if msg:
            flush()
            locs, msg = [], []
        locs.append(line)
    elif line.startswith('@@PROBE') or line.startswith('###') or re.match(r'^File \S+ has \d+ errors?\.$', line):
        flush()
        locs, msg = [], []
    elif locs:
        msg.append(line.strip())
flush()
out = sorted(e.replace(lib + '/', '').replace(home + '/', '') for e in errs)
sys.stdout.write(''.join(e + '\n' for e in out))
