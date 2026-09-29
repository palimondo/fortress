#!/usr/bin/env python3
"""Check a consolidation of FACTS.md or POSITIONS.md: every entry of the file as
it stood at BASE appears verbatim, whole, in the file now or in its history file,
and in exactly one of the two.

An entry is a top-level bullet ("- ") with its indented continuation lines.
Written 2026-09-27 for the POSITIONS split (886a06e1d, repaired in cda7d86a6,
whose first pass had lost 20 entries' text); generalised 2026-09-29 to either file.

usage: check-verbatim.py BASE FILE HISTORY
  e.g. check-verbatim.py 8c1158937 explorations/coordinator/FACTS.md explorations/coordinator/FACTS-history.md
Exit 0 when no entry is missing and none is in both files; 1 otherwise.
"""
import subprocess, sys

if len(sys.argv) != 4:
    sys.exit(__doc__)
base, path, hpath = sys.argv[1:]
old = subprocess.run(['git', 'show', f'{base}:{path}'], capture_output=True, text=True, check=True).stdout
new = open(path, encoding='utf-8').read()
hist = open(hpath, encoding='utf-8').read()

def entries(text):
    out, cur, start = [], None, 0
    for i, ln in enumerate(text.split('\n'), 1):
        if ln.startswith('- '):
            if cur is not None:
                out.append((start, cur))
            cur, start = ln, i
        elif cur is not None and ln.startswith('  '):
            cur += '\n' + ln
        else:
            if cur is not None:
                out.append((start, cur))
            cur = None
    if cur is not None:
        out.append((start, cur))
    return out

E = entries(old)
in_new = [n for n, e in E if e in new]
in_hist = [n for n, e in E if e in hist]
both = [n for n, e in E if e in new and e in hist]
missing = [(n, e) for n, e in E if e not in new and e not in hist]
print(f'entries in {path} at {base}: {len(E)} ({len(old.encode())} bytes); now {len(new.encode())} bytes')
print(f'  verbatim in the file now:        {len(in_new)}')
print(f'  verbatim in the history file:    {len(in_hist)}')
print(f'  in both (should be 0):           {len(both)} {both}')
print(f'  in neither (should be 0):        {len(missing)}')
for n, e in missing:
    print(f'    MISSING old line {n}: {e[:100]}')
print('moved to history (old line numbers):', ' '.join(str(n) for n in in_hist))
sys.exit(1 if missing or both else 0)
