#!/usr/bin/env python3
# stage-diff.py <before .out> <after .out> <stage>: the errors of one checker stage (@@SC ERR ... <stage>) whose
# count differs between two distance runs, each with paths and line:column positions removed.
import re, sys, collections
def load(p, stage):
    c = collections.Counter()
    for l in open(p, encoding='utf-8', errors='replace'):
        if not l.startswith('@@SC ERR'): continue
        f = l.rstrip('\n').split('\t')
        if f[2] != stage: continue
        m = re.sub(r'/\S*?/(\w+\.fs[si])', r'\1', f[3])
        m = re.sub(r'\.fs([si]):\d+[:.]\d+(-\d+(:\d+)?)?', r'.fs\1', m)
        m = re.sub(r'\s+', ' ', m)
        c[f[1] + ' | ' + m] += 1
    return c
b = load(sys.argv[1], sys.argv[3]); a = load(sys.argv[2], sys.argv[3])
for k in sorted(set(a) | set(b)):
    if a[k] != b[k]: print(f'{b[k]:3d} -> {a[k]:3d}  {k[:400]}')
