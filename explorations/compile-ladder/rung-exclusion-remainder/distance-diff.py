#!/usr/bin/env python3
"""distance-diff.py <base-commit> <errors-before.tsv> <errors-after.tsv> [edited-dir]: the distance stage's errors before and
after the edit, error by error.  Every FortressLibrary.fsi and .fss position in the after-list (the location
column and the message) is mapped back to the base file through the edit's line map (difflib against the
file at <base-commit>); a position on a line the edit inserted or rewrote becomes EDITED<n>, so that it never
compares equal to a base error.  Columns are dropped.  Prints the errors that go and the errors that appear,
each with its kind, family, unit and message; then the counts."""
import collections, difflib, re, subprocess, sys

base, before, after = sys.argv[1:4]
EDDIR = sys.argv[4] if len(sys.argv) > 4 else 'Library'   # where the edited FortressLibrary.fsi and .fss are
MAPS = {}
for f in ('Library/FortressLibrary.fsi', 'Library/FortressLibrary.fss'):
    A = subprocess.run(['git', 'show', '%s:%s' % (base, f)], capture_output=True, text=True, check=True).stdout.split('\n')
    B = open(EDDIR + '/' + f.split('/')[-1], encoding='utf-8').read().split('\n')
    m = {}
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, A, B, autojunk=False).get_opcodes():
        for k in range(j2 - j1):
            m[j1 + k + 1] = str(i1 + k + 1) if tag == 'equal' else 'EDITED%d' % (j1 + k + 1)
    MAPS[f.split('/')[-1]] = m
POS = re.compile(r'([A-Za-z0-9_]+\.fs[si])[:.](\d+)(?:[:.]\d+)?(?:-\d+(?::\d+)?)?')


def norm(s, mapped):
    def sub(mo):
        f, l = mo.group(1), int(mo.group(2))
        if mapped and f in MAPS:
            return '%s:%s' % (f, MAPS[f].get(l, '?'))
        return '%s:%d' % (f, l)
    return re.sub(r'\s+', ' ', POS.sub(sub, s)).strip()


def load(p, mapped):
    c = collections.Counter()
    for l in open(p, encoding='utf-8'):
        if l.startswith('#'): continue
        r = l.rstrip('\n').split('\t')
        if len(r) < 7: continue
        c[(r[0], r[1], r[3], norm(r[5], mapped), norm(r[6], mapped))] += 1
    return c


B, A = load(before, False), load(after, True)
gone, new = B - A, A - B
print('## gone (%d)' % sum(gone.values()))
for k, n in sorted(gone.items()):
    print('%d\t%s' % (n, '\t'.join(k)))
print('## appear (%d)' % sum(new.values()))
for k, n in sorted(new.items()):
    print('%d\t%s' % (n, '\t'.join(k)))
print('# before %d, after %d, gone %d, appear %d' % (sum(B.values()), sum(A.values()), sum(gone.values()), sum(new.values())))
