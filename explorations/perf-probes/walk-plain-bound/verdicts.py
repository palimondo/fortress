#!/usr/bin/env python3
"""verdicts.py <file-or-dir> ...: one line per test, name<TAB>verdict, from SystemJUTest/SpecDataJUTest plain reports."""
import os, re, sys
def files(p):
    if os.path.isdir(p):
        for root, _, fs in os.walk(p):
            for f in fs:
                if f.startswith('TEST-') and f.endswith('.txt'): yield os.path.join(root, f)
    else: yield p
out = {}
for p in sys.argv[1:]:
    for f in files(p):
        for line in open(f, errors='replace'):
            m = re.match(r'^\s*interpret (\S+?)\s+(.*)$', line)
            if m:
                name = m.group(1).rsplit('/', 1)[-1]
                v = re.sub(r'\s*\(time = \d+ms\)', '', m.group(2)).strip()
                out[name] = v
for k in sorted(out): print(k + '\t' + out[k])
