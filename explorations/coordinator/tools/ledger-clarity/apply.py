#!/usr/bin/env python3
"""apply.py CHUNK_DIR... [--root DIR] [--ledger FILE] [--history FILE]: apply judged chunks of the ledger clarity workflow.

For each chunk folder: each line of final.rewrite goes through `ledger.py rewrite N FILE`
(the row's number taken from its first cell), and each line of final.closes
(`N<TAB>HASH<TAB>TEST<TAB>NOTE`) through `ledger.py close`. --root, --ledger and --history pass through to
ledger.py, so a run on copies of the ledger and its history writes nothing real. Stops at the first
refusal and prints it.
"""
import re, subprocess, sys, tempfile, os
args = sys.argv[1:]
root = []
for opt in ('--root', '--ledger', '--history'):
    if opt in args:
        i = args.index(opt); root += [opt, args[i + 1]]; args = args[:i] + args[i + 2:]
L = ['python3', '/home/user/fortress/explorations/coordinator/tools/ledger.py']
def run(cmd):
    r = subprocess.run(L + cmd + root, capture_output=True, text=True)
    if r.returncode: sys.exit(f'refused: {" ".join(cmd[:2])}\n{r.stdout}{r.stderr}')
    return r.stdout.strip().splitlines()[-1] if r.stdout.strip() else ''
n = 0
for d in args:
    p = os.path.join(d, 'final.rewrite')
    if os.path.exists(p):
        for line in open(p):
            m = re.match(r'\| *(\d+) *\|', line)
            if not m: continue
            with tempfile.NamedTemporaryFile('w', suffix='.row', delete=False) as f: f.write(line)
            print(run(['rewrite', m.group(1), f.name])); os.unlink(f.name); n += 1
    p = os.path.join(d, 'final.closes')
    if os.path.exists(p):
        for line in open(p):
            c = line.rstrip('\n').split('\t')
            if len(c) < 3 or not c[0].strip().isdigit(): continue
            cmd = ['close', c[0], '--commit', c[1], '--test', c[2]] + (['--note', c[3]] if len(c) > 3 and c[3] else [])
            print(run(cmd)); n += 1
print(f'apply.py: {n} changes')
