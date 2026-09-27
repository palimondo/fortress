#!/usr/bin/env python3
# decl-errors.py <distance .out> <FortressLibrary.fss the run checked>: one line per checked declaration of
# the component, its first source line as its name, its error count (DECL-OK) or its crash (DECL-CRASH).
import re, sys
out, src = sys.argv[1], sys.argv[2]
lines = open(src, encoding='utf-8').read().split('\n')
pat = re.compile(r'^@@TC (DECL-OK|DECL-CRASH)\t(\w+)\t\S*FortressLibrary\.fss:(\d+):(\d+)-(?:(\d+):)?(\d+)\t(.*)$')
for l in open(out, encoding='utf-8', errors='replace'):
    m = pat.match(l.rstrip('\n'))
    if not m: continue
    kind, dk, a, _, b, _, rest = m.groups()
    b = b or a
    head = lines[int(a) - 1].strip()[:90]
    what = rest if kind == 'DECL-OK' else 'CRASH ' + rest.split('\t')[0].split('.')[-1] + ' ' + rest.split('\t')[-1][:120]
    print(f'{int(b) - int(a) + 1:5d} lines\t{head}\t{what}')
