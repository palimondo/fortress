#!/usr/bin/env python3
"""compare-3pass.py <base-list> <edit-list> <baseA-dir> <baseB-dir> <edit-dir>: rung O's count-compare.py with
two additions for this rung: every home a pass ran in (the worktree, tmp/baseA-home, tmp/baseB-home) is
replaced by H, as the work directory is by W, and a test the rung renamed is compared under its old name in
the base passes and its new name in the edit pass. A test is STABLE when A equals B; a stable test is CHANGED
when the edit differs from A; a test whose A and B differ is UNSTABLE. The rung's new tests, in the edit list
alone, are listed as NEW with their exit code. Prints one line per CHANGED, UNSTABLE or NEW test, then the totals."""
import os, re, sys

WT = '/home/user/fortress-sizerange'
HOMES = [WT + '/tmp/baseA-home', WT + '/tmp/baseB-home', WT]
RENAMED = {'XXXNatBigSizeWalk': 'NatBigSizeWalk', 'XXXRangeBoundsRungO': 'RangeBoundsRungO',
           'XXXRangeEmptyHashRungO': 'RangeEmptyHashRungO', 'XXXSeqRangeTopRungO': 'SeqRangeTopRungO'}

def load(d, t):
    p = os.path.join(d, 'log', t + '.txt')
    try:
        s = open(p, encoding='utf-8', errors='replace').read()
    except FileNotFoundError:
        return None
    s = s.replace(os.path.abspath(d), 'W')
    for h in HOMES:
        s = s.replace(h, 'H')
    s = re.sub(r'^(rc=\S+) secs=\d+$', r'\1', s, flags=re.M)
    return s.splitlines()

def first_diff(a, b):
    for i in range(max(len(a), len(b))):
        x = a[i] if i < len(a) else '<end of output>'
        y = b[i] if i < len(b) else '<end of output>'
        if x != y:
            return i + 1, x, y
    return None

def rc(lines):
    for l in reversed(lines or []):
        if l.startswith('rc='):
            return l[3:]
    return '?'

def main():
    bl, el, da, db, de = sys.argv[1:6]
    base = [os.path.basename(l.strip())[:-4] for l in open(bl) if l.strip()]
    edit = [os.path.basename(l.strip())[:-4] for l in open(el) if l.strip()]
    stable = changed = unstable = missing = renamed = 0
    for t in base:
        te = RENAMED.get(t, t)
        a, b, e = load(da, t), load(db, t), load(de, te)
        if a is None or b is None or e is None:
            missing += 1
            print('MISSING  %s' % t)
            continue
        if t in RENAMED:
            renamed += 1
            d = first_diff(a, e)
            print('RENAMED  %s -> %s  rc %s -> %s  A=B %s%s' % (t, te, rc(a), rc(e), a == b,
                  ('  line %d\n    base: %s\n    edit: %s' % (d[0], d[1][:200], d[2][:200])) if d else '  identical'))
            continue
        if a == b:
            stable += 1
            d = first_diff(a, e)
            if d:
                changed += 1
                print('CHANGED  %s  rc %s -> %s  line %d\n    base: %s\n    edit: %s'
                      % (t, rc(a), rc(e), d[0], d[1][:200], d[2][:200]))
        else:
            unstable += 1
            dab = first_diff(a, b)
            dae = first_diff(a, e)
            print('UNSTABLE %s  rc A %s B %s edit %s  A/B line %d%s\n    A:    %s\n    B:    %s'
                  % (t, rc(a), rc(b), rc(e), dab[0],
                     ('  A/edit line %d' % dae[0]) if dae else '  A/edit identical',
                     dab[1][:200], dab[2][:200]))
            if dae:
                print('    edit: %s' % dae[2][:200])
    new = [t for t in edit if t not in base and t not in RENAMED.values()]
    for t in new:
        e = load(de, t)
        print('NEW      %s  rc %s' % (t, rc(e) if e else 'missing'))
    print('tests %d  stable %d  changed %d  unstable %d  renamed %d  missing %d  new %d'
          % (len(base), stable, changed, unstable, renamed, missing, len(new)))

if __name__ == '__main__':
    main()
