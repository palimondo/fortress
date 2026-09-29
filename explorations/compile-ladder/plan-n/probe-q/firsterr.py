#!/usr/bin/env python3
"""firsterr.py <edit-dir> [<base-dir>] : for each log of the edit pass, its exit code and the first
line of its first error (the message line after a ProgramError's location, or the exception line),
and the base pass's exit code where it has the log; prints only the tests whose exit code differs
from the base's, or all with --all.  A working aid for classifying; compare.py is the comparison."""
import os, re, sys

def info(p):
    try:
        s = open(p, encoding='utf-8', errors='replace').read().splitlines()
    except FileNotFoundError:
        return None, None
    rc = None
    for l in s:
        m = re.match(r'^rc=(\d+)', l)
        if m: rc = int(m.group(1))
    err = None
    for i, l in enumerate(s):
        if re.match(r'^(com\.sun\.fortress\.exceptions\.\w+|java\.lang\.\w+(Error|Exception))', l) or 'Exception in thread' in l:
            nxt = s[i + 1] if i + 1 < len(s) else ''
            err = (l.split(': ')[0].split('.')[-1] + ': ' + nxt.strip())[:220]
            break
        if re.match(r'^\s+(Failed to find|Ambiguous|Could not|Cannot|Unification)', l) or l.startswith('FAIL'):
            err = l.strip()[:220]
            break
    return rc, err

ed = sys.argv[1]
base = sys.argv[2] if len(sys.argv) > 2 and not sys.argv[2].startswith('--') else None
allp = '--all' in sys.argv
for f in sorted(os.listdir(os.path.join(ed, 'log'))):
    t = f[:-4]
    rc, err = info(os.path.join(ed, 'log', f))
    if rc is None: continue
    brc = info(os.path.join(base, 'log', f))[0] if base else None
    if allp or brc is None or brc != rc:
        print(f"{t}\trc={rc}\tbase={brc}\t{err or ''}")
