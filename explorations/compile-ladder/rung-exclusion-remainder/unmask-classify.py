#!/usr/bin/env python3
"""unmask-classify.py <errs-before.txt> <errs-after.txt> <base.fsi> <edited.fsi> <distance-errors.tsv>

The errors the checker-count stage shows after an edit and not before (stage-errors.py's lists), each
looked up among the distance stage's errors on the base (its errors.tsv), where every checker stage ran
whatever the earlier ones reported.  An error is matched by its kind, its family (the operator or name
it is about) and its sites: the lines of FortressLibrary.fsi it names, mapped back to the base file
through the edit's line map (difflib), and the lines it names in other files as they are.  An error so
found is UNMASKED; one not found is NEW and printed whole.  A site on a line the edit inserted maps to
INSERTED, so an error at a declaration the edit adds is never counted as unmasked."""
import collections, difflib, re, sys

before, after, base_fsi, new_fsi, tsv = sys.argv[1:6]


def line_map(a, b):
    A = open(a, encoding='utf-8').read().split('\n'); B = open(b, encoding='utf-8').read().split('\n')
    m = {}
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, A, B, autojunk=False).get_opcodes():
        for k in range(j2 - j1):
            m[j1 + k + 1] = (i1 + k + 1) if tag == 'equal' else 'INSERTED'
    return m


MAP = line_map(base_fsi, new_fsi)


def kind_family(msg):
    m = re.search(r'Invalid overloading of (\S+)', msg)
    if m: return 'overloading', m.group(1)
    m = re.search(r'multiple declarations of (\S+) with the same parameter type', msg)
    if m: return 'overloading', m.group(1) + ' (same parameter type)'
    m = re.search(r'For (\S+?),', msg)
    if m: return 'return-type', m.group(1)
    return 'other', msg[:40]


def sites(msg, mapped):
    out = set()
    for f, l in re.findall(r'([A-Za-z0-9_]+\.fs[si]):(\d+)', msg):
        l = int(l)
        if f == 'FortressLibrary.fsi' and mapped:
            l = MAP.get(l, 'INSERTED')
        out.add('%s:%s' % (f, l))
    return frozenset(out)


new = collections.Counter(open(after).read().split('\n')) - collections.Counter(open(before).read().split('\n'))
dist = collections.Counter()
for l in open(tsv, encoding='utf-8'):
    if l.startswith('#'): continue
    r = l.rstrip('\n').split('\t')
    if len(r) < 7: continue
    fam = r[1]
    dist[(r[0], fam, sites(r[5] + ' ' + r[6], False))] += 1
tally = collections.Counter()
for e, n in sorted(new.items()):
    if not e: continue
    k, fam = kind_family(e)
    key = (k, fam, sites(e, True))
    for _ in range(n):
        if dist[key] > 0:
            dist[key] -= 1; tally[('UNMASKED', k, fam)] += 1
            print('UNMASKED  %-12s %-30s %s' % (k, fam, ' '.join(sorted(key[2]))))
        else:
            tally[('NEW', k, fam)] += 1
            print('NEW       %-12s %-30s %s\n          %s' % (k, fam, ' '.join(sorted(key[2])), e[:600]))
print('# tally')
for (v, k, fam), n in sorted(tally.items()):
    print('%-9s %-12s %-30s %d' % (v, k, fam, n))
print('# UNMASKED %d  NEW %d' % (sum(n for (v, _, _), n in tally.items() if v == 'UNMASKED'),
                                 sum(n for (v, _, _), n in tally.items() if v == 'NEW')))
