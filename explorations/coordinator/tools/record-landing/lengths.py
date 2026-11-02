#!/usr/bin/env python3
"""lengths.py --root WT --base AT: each changed entry's length before and after.

For each FACTS or POSITIONS entry whose line in the worktree WT differs from its line at AT, the commit
that the worktree was made at: its number, its characters at AT and now, the change, and whether it stands
over the record's 600, the size that record.py reports. An entry already over 600 at AT that grew is marked
"grew past 600": the judge holds it unless the clause that its change owes alone explains the growth
(judge.md). The last line names each such entry. Information only; exit 0.
"""
import argparse
import os
import re
import subprocess

ap = argparse.ArgumentParser()
ap.add_argument('--root', required=True)
ap.add_argument('--base', required=True)
a = ap.parse_args()
D = 'explorations/coordinator/'
SIZE = 600


def entries(text):
    out = {}
    for l in text.split('\n'):
        m = re.match(r'- ([FP]-\d+) ', l)
        if m:
            out.setdefault(m.group(1), l)
    return out


rows, grew = [], []
for f in ('FACTS.md', 'POSITIONS.md'):
    old = entries(subprocess.run(['git', '-C', a.root, 'show', '%s:%s' % (a.base, D + f)], capture_output=True, text=True).stdout)
    with open(os.path.join(a.root, D + f), encoding='utf-8') as fh:
        new = entries(fh.read())
    for k in sorted(set(old) | set(new), key=lambda k: (k[0], int(k[2:]))):
        if old.get(k) != new.get(k):
            b, n = len(old.get(k, '')), len(new.get(k, ''))
            mark = ', grew past 600' if b > SIZE and n > b else ', over 600' if n > SIZE else ''
            if b > SIZE and n > b:
                grew.append('%s (%+d)' % (k, n - b))
            rows.append('- %s: %s to %s characters (%+d)%s' % (k, b or 'none', n or 'gone', n - b, mark))
print('lengths: %d entries changed' % len(rows))
print('\n'.join(rows))
print('lengths: %d already over 600 grew%s' % (len(grew), ': ' + ', '.join(grew) if grew else ''))
