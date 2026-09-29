#!/usr/bin/env python3
"""summarize.py <log-dir> <out-file>: one line per program of list.txt from the logs count-run.sh wrote
(<log-dir>/log/<Name>.txt): its name, the call, the setup, the exit code, and either the printed result
with its run-time type or the refusal's first words with the declarations walk names (file:line)."""
import os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
logdir, outf = sys.argv[1:3]
out = []
for line in open(os.path.join(HERE, 'list.txt')):
    name, call, setup = line.rstrip('\n').split('\t')
    text = open(os.path.join(logdir, 'log', name + '.txt'), errors='replace').read()
    rc = re.search(r'^rc=(\d+)', text, re.M).group(1)
    res = re.search(r'^(?!#)(.* = .* : .*)$', text, re.M)
    if res:
        what = res.group(1)
    else:
        amb = re.search(r'(Ambiguous coercion, args = \([^)]*\)).*?= \{(.*)\}', text)
        if amb:
            sites = re.findall(r'\((?:/[^ (]*?/)?((?:Library|ProjectFortress)/[^:]+:\d+):', amb.group(2))
            what = amb.group(1) + '; candidates at ' + ', '.join(sites)
        else:
            what = next((l for l in text.splitlines() if l and not l.startswith('#')), '')[:200]
    out.append(f'{name}\t{call}\t[{setup}]\trc={rc}\t{what}')
open(outf, 'w').write('\n'.join(out) + '\n')
print('\n'.join(out))
