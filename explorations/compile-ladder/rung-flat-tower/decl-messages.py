#!/usr/bin/env python3
# decl-messages.py <distance .out> <FortressLibrary.fss the run checked> <text>...: the component-stage errors
# (@@SC ERR component FortressLibrary) that fall inside each checked declaration whose first line holds one of
# the <text>s, with the tree path dropped.
import re, sys
out, src, keys = sys.argv[1], sys.argv[2], sys.argv[3:]
lines = open(src, encoding='utf-8').read().split('\n')
decls = []
errs = []
for l in open(out, encoding='utf-8', errors='replace'):
    l = l.rstrip('\n')
    m = re.match(r'^@@TC DECL-(?:OK|CRASH)\t\w+\t\S*FortressLibrary\.fss:(\d+):\d+-(?:(\d+):)?\d+\t', l)
    if m: decls.append((int(m.group(1)), int(m.group(2) or m.group(1))))
    if l.startswith('@@SC ERR\tcomponent FortressLibrary\t'):
        f = l.split('\t')
        m2 = re.match(r'\S*FortressLibrary\.fss:(\d+)', f[3])
        if m2: errs.append((int(m2.group(1)), f[2], re.sub(r'\s+', ' ', re.sub(r'/\S*/', '', f[3]))))
for a, b in decls:
    head = lines[a-1].strip()
    if not any(k in head for k in keys): continue
    es = [e for e in errs if a <= e[0] <= b]
    print(f'== {a}-{b} {head[:100]}  ({len(es)})')
    for e in es: print(f'   {e[1]}\t{e[2][:330]}')
