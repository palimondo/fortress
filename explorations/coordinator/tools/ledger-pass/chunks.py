#!/usr/bin/env python3
"""chunks.py [--section N ...] [--rows N,N,...] [--size 12] [--runs K] [--order 6,7,10,...] [--prefix c]
         [--base REV] [--out-root DIR] [--reconcile PATH ...]

The ledger pass's chunks and runs, read-only. It takes the open rows (NEGATIVE-VERIFIED, NEGATIVE-BOUNDED,
CONTESTED) of the sections named, or the rows listed, or with neither every open row; links each pair of
rows that likely overlap (common.links: a citation of one file within 10 lines, one reproducer, two rare
backticked names, one naming the other: the duplicate search, as its own step, before any writer); packs
each linked group into one chunk of at most --size rows, splitting a larger group by its strong links,
then by the file and line it cites; orders the chunks by the sections' order (--order, default the order
of use 6, 7, 10, 12, 5, 2, then 4, 8, 9, 3, 1, 11, 13, 14, 15) and deals them in that order, each to the run with
the fewest rows so far, so that every run starts on the sections read first. No row moves between sections: a chunk is a reading unit.

It prints one JSON object: base; order; runs, each { name, out, chunks: [{ name, rows }] } in the form
ledger-pass.js takes; cross, the linked pairs whose rows fell in different chunks, with why; counts.
With --reconcile PATH..., it packs into chunks r1, r2, ... of one run named reconcile, for the pass's last
run, the pairs whose rows are both still open: those that the judges upheld for it, in each final.pairs
under the folders named (the landed runs' kept folders), or every cross pair of a plan's JSON.
"""
import argparse, collections, json, re, sys
import common as C

ap = argparse.ArgumentParser()
ap.add_argument('--section', action='append', default=[])
ap.add_argument('--rows')
ap.add_argument('--size', type=int, default=12)
ap.add_argument('--runs', type=int, default=4)
ap.add_argument('--order', default='6,7,10,12,5,2,4,8,9,3,1,11,13,14,15')
ap.add_argument('--prefix', default='c')
ap.add_argument('--base', default='HEAD')
ap.add_argument('--out-root', default=C.ROOT + '/tmp/ledger-pass/')
ap.add_argument('--reconcile', nargs='+', metavar='PATH')
a = ap.parse_args()

BASE = C.git('rev-parse', '--short=9', a.base).strip()
order = [int(x) for x in a.order.split(',')]
rank = {s: i for i, s in enumerate(order)}
led = C.ledger_at(BASE)
tree = C.Tree(BASE)
openrows = [r for r in led.rows if r.status_word in C.OPEN]
secnum = lambda r: int(re.match(r'(\d+)', r.section or '99').group(1))
rk = lambda r: rank.get(secnum(r), len(order) + secnum(r))
by = {r.num: r for r in openrows}


def weight(why):
    return sum(2 if w in ('names row', 'one reproducer') else 1 for w in why)


def cluster(nums, pairs, size):
    """Size-capped greedy clustering: merge the two groups with the most link weight between them while the
    merged group holds at most size rows (ties: one section rank, then the smaller group)."""
    members = {n: [n] for n in nums}
    owner = {n: n for n in nums}
    cw = collections.defaultdict(int)
    for (x, y), why in pairs.items():
        if x in owner and y in owner:
            cw[tuple(sorted((x, y)))] += weight(why)
    while True:
        best = None
        for (p, q), v in cw.items():
            n = len(members[p]) + len(members[q])
            if n > size:
                continue
            same = min(rk(by[m]) for m in members[p]) == min(rk(by[m]) for m in members[q])
            key = (v, same, -n)
            if best is None or key > best[0]:
                best = (key, p, q)
        if best is None:
            break
        _, p, q = best
        members[p].extend(members.pop(q))
        for m in members[p]:
            owner[m] = p
        new = collections.defaultdict(int)
        for (x, y), v in cw.items():
            x, y = owner[x], owner[y]
            if x != y:
                new[tuple(sorted((x, y)))] += v
        cw = new
    return list(members.values())


def pack(groups, size):
    """The groups, by rank, filled first-fit into chunks of at most size rows; neighbouring small chunks merged."""
    pieces = sorted(groups, key=lambda g: (min(rk(by[n]) for n in g), -len(g), min(g)))
    chunks = []          # [rank, rows]
    for g in pieces:
        r = min(rk(by[n]) for n in g)
        for c in chunks:
            if c[0] == r and len(c[1]) + len(g) <= size:
                c[1].extend(g)
                break
        else:
            chunks.append([r, list(g)])
    merged = []
    for c in chunks:
        if merged and len(merged[-1][1]) + len(c[1]) <= size and min(len(merged[-1][1]), len(c[1])) < size // 2:
            merged[-1][1].extend(c[1])
        else:
            merged.append(c)
    return [sorted(c[1], key=lambda n: (rk(by[n]), n)) for c in merged]


if a.reconcile:
    import os
    cross = []
    for path in a.reconcile:
        if path.endswith('.json'):
            cross += [(x, y, w) for x, y, w in json.load(open(path))['cross']]
            continue
        for d, _, files in os.walk(path):
            if 'final.pairs' in files:
                for ln in open(os.path.join(d, 'final.pairs'), encoding='utf-8'):
                    f = ln.rstrip('\n').split('\t')
                    if len(f) >= 2 and f[0].strip().isdigit() and f[1].strip().isdigit():
                        x, y = sorted((int(f[0]), int(f[1])))
                        cross.append((x, y, f[2].strip() if len(f) > 2 else 'named by a judge'))
    seen, kept = set(), []
    for x, y, w in cross:
        if x in by and y in by and (x, y) not in seen:
            seen.add((x, y)); kept.append((x, y, w))
    cross = kept
    pairs = {(x, y): set(w.split(', ')) for x, y, w in cross}
    nums = sorted({n for x, y, _ in cross for n in (x, y)})
    chunks = pack(cluster(nums, pairs, a.size), a.size) if nums else []
    runs = [{'name': 'reconcile', 'out': a.out_root + 'reconcile/',
             'chunks': [{'name': 'r%d' % (i + 1), 'rows': [str(n) for n in c]} for i, c in enumerate(chunks)]}]
    json.dump({'base': BASE, 'order': order, 'runs': runs, 'cross': [[x, y, w] for x, y, w in cross],
               'counts': {'pairs': len(cross), 'rows': len(nums), 'chunks': len(chunks)}}, sys.stdout, indent=1)
    print()
    sys.exit(0)

if a.rows:
    want = [int(x) for x in re.findall(r'\d+', a.rows)]
    rows = [by[n] for n in want if n in by]
    missing = [n for n in want if n not in by]
    if missing:
        sys.stderr.write('chunks.py: not open at %s, left out: %s\n' % (BASE, ', '.join(map(str, missing))))
elif a.section:
    secs = {int(s) for s in a.section}
    rows = [r for r in openrows if secnum(r) in secs]
else:
    rows = openrows
nums = [r.num for r in rows]
allpairs = C.links(openrows, tree)
pairs = {k: v for k, v in allpairs.items() if k[0] in set(nums) and k[1] in set(nums)}
chunks = pack(cluster(nums, pairs, a.size), a.size)
names = ['%s%d' % (a.prefix, i + 1) for i in range(len(chunks))]
where = {n: names[i] for i, c in enumerate(chunks) for n in c}
k = max(1, min(a.runs, len(chunks)))
runs = [{'name': '%s-run%d' % (a.prefix, j + 1), 'out': '%s%s-run%d/' % (a.out_root, a.prefix, j + 1), 'chunks': []} for j in range(k)]
for i, c in enumerate(chunks):      # in order, each chunk to the run with the fewest rows so far
    j = min(range(k), key=lambda j: (sum(len(x['rows']) for x in runs[j]['chunks']), j))
    runs[j]['chunks'].append({'name': names[i], 'rows': [str(n) for n in c]})
cross = sorted([x, y, ', '.join(sorted(w))] for (x, y), w in pairs.items() if where[x] != where[y])
sections = collections.Counter()
for c in chunks:
    sections[len({secnum(by[n]) for n in c})] += 1
json.dump({'base': BASE, 'order': order, 'runs': runs, 'cross': cross,
           'counts': {'rows': len(nums), 'chunks': len(chunks), 'runs': k, 'pairs': len(pairs), 'cross': len(cross),
                      'chunks by sections mixed': dict(sorted(sections.items()))}}, sys.stdout, indent=1)
print()
