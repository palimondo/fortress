#!/usr/bin/env python3
"""stage-errors.py <run.txt> <prefix-to-drop>... : the checker-count stage's errors, one per line, normalised.

A block starts at a source-position line that follows a line that is not one, and runs to the next
such line; every position is replaced by its file name and line (the column dropped), each given
prefix is removed, whitespace is collapsed.  Prints the blocks sorted, one per line, so that two runs'
outputs compare with diff or comm."""
import re, sys

path, prefixes = sys.argv[1], sys.argv[2:]
POSL = re.compile(r'^/\S+\.fs[si]:\d+')
text = open(path, encoding='utf-8', errors='replace').read()
for p in prefixes:
    text = text.replace(p, '')
blocks, cur, prev_pos = [], [], False
for l in text.split('\n'):
    if l.startswith('@@PROBE') or l.startswith('###') or l.startswith('File ') or not l.strip():
        if cur: blocks.append(cur)
        cur, prev_pos = [], False
        continue
    is_pos = bool(POSL.match(l)) or bool(re.match(r'^[A-Za-z0-9_/.-]+\.fs[si]:\d+', l))
    if is_pos and not prev_pos and cur:
        blocks.append(cur); cur = []
    cur.append(l.strip())
    prev_pos = is_pos
if cur: blocks.append(cur)
def norm(b):
    s = ' '.join(b)
    s = re.sub(r'(\S+?)\.fs([si]):(\d+)(:\d+)?(\.\d+)?(-\d+(:\d+)?)?:?', lambda m: '%s.fs%s:%s' % (m.group(1).split('/')[-1], m.group(2), m.group(3)), s)
    return re.sub(r'\s+', ' ', s)
for s in sorted(norm(b) for b in blocks if any(re.search(r'\.fs[si]:\d+', x) for x in b)):
    print(s)
