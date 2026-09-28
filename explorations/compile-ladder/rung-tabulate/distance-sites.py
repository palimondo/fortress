#!/usr/bin/env python3
"""distance-sites.py <base-commit> <pre-errors.tsv> <post-errors.tsv>: the distance stage's error lists
(errors.tsv in each run's scratch directory), compared error by error. Every Fortress source position in
the post-edit list, in its location column and in its message, that lies in a file this branch changed is
mapped back to the line it has at <base-commit> through the edit's own line map (git diff -U0), as
rung F's compare-normalised.py does: a position on an inserted line becomes INSERTED<n>, one on a
rewritten line REWRITTEN<base line>. The errors that then appear only before the edit are GONE, only after
it NEW; each is printed with its kind, location and message, and the NEW ones are the ones to classify as
caused or unmasked. Run from $FORTRESS_HOME."""
import re, subprocess, sys, collections

base, pre, post = sys.argv[1:4]
EDITED = subprocess.run(['git', 'diff', '--name-only', base, '--', '*.fss', '*.fsi'],
                        capture_output=True, text=True, check=True).stdout.split()
BASENAMES = {}
for p in EDITED:
    BASENAMES.setdefault(p.split('/')[-1], []).append(p)

def line_map(path):
    diff = subprocess.run(['git', 'diff', '-U0', base, '--', path], capture_output=True, text=True, check=True).stdout
    hunks = []
    for l in diff.splitlines():
        m = re.match(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@', l)
        if m:
            a, b, c, d = int(m.group(1)), int(m.group(2) or 1), int(m.group(3)), int(m.group(4) or 1)
            hunks.append((a, b, c, d))
    def f(n):
        off = 0
        for a, b, c, d in hunks:
            if b == 0:
                if c <= n < c + d: return 'INSERTED%d' % n
                if n >= c + d: off += d
            elif b == d:
                if c <= n < c + d: return 'REWRITTEN%d' % (a + (n - c))
            else:
                if c <= n < c + d: return 'HUNK%d' % n
                if n >= c + d: off += d - b
        return str(n - off)
    return f

MAPS = {}
for name, paths in BASENAMES.items():
    if len(paths) == 1:
        MAPS[name] = line_map(paths[0])
NAMES = '|'.join(re.escape(n) for n in MAPS)
POS = re.compile(r'\b(' + NAMES + r'):(\d+)((?::\d+)?)(?:-(\d+)(:\d+)?)?') if MAPS else None
DOT = re.compile(r'\b(' + NAMES + r'):(\d+)\.(\d+)') if MAPS else None

def remap(s):
    if not POS: return s
    def sub(m):
        fn, l1, c1, x, c2 = m.groups()
        mp = MAPS[fn]
        r = '%s:%s%s' % (fn, mp(int(l1)), c1)
        if x is not None:
            r += '-' + ('%s%s' % (mp(int(x)), c2) if c2 is not None else x)
        return r
    s = POS.sub(sub, s)
    s = DOT.sub(lambda m: '%s:%s.%s' % (m.group(1), MAPS[m.group(1)](int(m.group(2))), m.group(3)), s)
    return s

def load(p, mapped):
    rows = collections.Counter()
    for l in open(p, encoding='utf-8', errors='replace'):
        if l.startswith('#') or not l.strip(): continue
        c = l.rstrip('\n').split('\t')
        if len(c) < 7: continue
        kind, loc, msg = c[0], c[5], c[6]
        if mapped:
            loc, msg = remap(loc), remap(msg)
        rows[(kind, loc, msg)] += 1
    return rows

def loose(key):
    # the same error once every position is dropped from the message and a rewritten line is read as
    # its base line: a position printed inside a message, or a span that ends on a rewritten line, moves
    # the strict key without moving the error
    k, l, m = key
    l = re.sub(r'REWRITTEN(\d+)', r'\1', l)
    m = re.sub(r'\b[\w.]+\.fs[si]:[\w]+(?:[:.]\d+)?(?:-[\w]+(?::\d+)?)?', 'POS', m)
    return (k, l, m)

a, b = load(pre, False), load(post, True)
gone = a - b
new = b - a
lg = collections.Counter()
for key, n in gone.items(): lg[loose(key)] += n
print('# files mapped: %s' % ' '.join(sorted(MAPS)))
print('# before %d rows, after %d rows; gone %d, new %d' % (sum(a.values()), sum(b.values()), sum(gone.values()), sum(new.values())))
print('# NEW= marks a new row that equals a gone row once positions are dropped (the same error, a moved or rewritten position);')
print('# NEW  marks a row with no such counterpart, to be classified by hand.')
matched = collections.Counter()
for (k, l, m), n in sorted(new.items()):
    lk = loose((k, l, m))
    tag = 'NEW '
    if lg[lk] - matched[lk] >= n:
        matched[lk] += n
        tag = 'NEW='
    print('%s\t%s\t%s\t%s%s' % (tag, k, l, m[:400], '' if n == 1 else '\t(x%d)' % n))
for (k, l, m), n in sorted(gone.items()):
    lk = loose((k, l, m))
    tag = 'GONE='  if matched[lk] > 0 else 'GONE '
    if matched[lk] > 0: matched[lk] -= 1
    print('%s\t%s\t%s\t%s%s' % (tag, k, l, m[:400], '' if n == 1 else '\t(x%d)' % n))
