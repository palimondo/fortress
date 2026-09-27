#!/usr/bin/env python3
# demos-summary.py <list> <flat-log-dir> <base-log-dir>: one line per demo of the repair round's demos count (instruction 7):
# base rc and first error line or timeout, flat rc and first error line or timeout, and whether the flat failure is row 424's
# (a join or unlift unification error naming BOTTOM, or a CastError whose context passes the identity functions at
# Library/FortressLibrary.fss:3107-3131). Then the summary line.
import re, sys, os
lst, fdir, bdir = sys.argv[1:4]
ERR = re.compile(r'(Error|Exception|error:|Unification|Failed to find|undefined|not defined|CastError|FAIL)')
def read(d, t):
    p = os.path.join(d, t + '.txt')
    if not os.path.exists(p): return None, None, ''
    L = open(p, encoding='utf-8', errors='replace').read().split('\n')
    rc = None
    for l in L:
        m = re.match(r'^rc=(\d+) secs=(\d+)', l)
        if m: rc = int(m.group(1)); secs = int(m.group(2))
    first = ''
    body = [l for l in L if not re.match(r'^\s+at ', l)]
    for i, l in enumerate(body):
        if ERR.search(l) and not l.startswith('Rats!') and 'uses unchecked' not in l:
            first = l.strip()
            if first.startswith('com.sun.fortress.exceptions.') and i + 1 < len(body):
                first = first + ' ' + body[i + 1].strip()
            break
    first = re.sub(r'/home/user/fortress-flat/(tmp/r2/demos/[a-z0-9-]+/src/)?', '', first)[:200]
    return rc, first, '\n'.join(body)
def verdict(rc, first):
    if rc is None: return 'missing'
    if rc in (124, 137): return 'timeout'
    return 'rc=%d%s' % (rc, (' ' + first) if rc != 0 else '')
def row424(rc, text):
    if rc in (None, 0, 124, 137): return 'no'
    if re.search(r'Unification error: Closure/Constructor for (join|unlift) param 1 \([a-z]+:BOTTOM\)', text): return 'yes (join/unlift BOTTOM)'
    if 'CastError' in text and re.search(r'FortressLibrary\.fss:31(0[7-9]|[12][0-9]|3[01]):', text): return 'yes (CastError via the identity)'
    return 'no'
tests = [os.path.basename(l.strip())[:-4] for l in open(lst) if l.strip()]
ranb = failf = at424 = 0
print('# demo | base | flat | flat failure is row 424\'s')
for t in tests:
    brc, bf, bt = read(bdir, t)
    frc, ff, ft = read(fdir, t)
    r = row424(frc, ft)
    print(f'{t} | base {verdict(brc, bf)} | flat {verdict(frc, ff)} | {r}')
    if brc == 0:
        ranb += 1
        if frc != 0:
            failf += 1
            if r.startswith('yes'): at424 += 1
print(f'# summary: {len(tests)} demos; {ranb} ran on the base (rc=0); {failf} of those fail on the flat library; {at424} of those fail at row 424.')
