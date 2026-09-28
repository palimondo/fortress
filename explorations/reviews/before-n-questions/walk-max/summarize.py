#!/usr/bin/env python3
"""summarize.py: writes summary.txt from captures/, one line per program: its name, the call, the
exit code, and either the printed result with its run-time type or the refusal's first words with the
declarations walk names as applicable with coercion (file:line)."""
import os, re

HERE = os.path.dirname(os.path.abspath(__file__))
out = []
for line in open(os.path.join(HERE, 'list.txt')):
    name, call, setup = line.rstrip('\n').split('\t')
    text = open(os.path.join(HERE, 'captures', name + '.txt')).read()
    rc = re.search(r'^rc=(\d+)', text, re.M).group(1)
    res = re.search(r'^(?!#)(.* = .* : .*)$', text, re.M)
    if res:
        what = res.group(1)
    else:
        amb = re.search(r'(Ambiguous coercion, args = \([^)]*\)).*?= \{(.*)\}', text)
        if amb:
            sites = re.findall(r'\((Library/[^:]+:\d+):', amb.group(2))
            what = amb.group(1) + '; candidates at ' + ', '.join(sites)
        else:
            what = next((l for l in text.splitlines() if l and not l.startswith('#')), '')[:200]
    out.append(f'{name}\t{call}\t[{setup}]\trc={rc}\t{what}')
open(os.path.join(HERE, 'summary.txt'), 'w').write('\n'.join(out) + '\n')
print('\n'.join(out))
