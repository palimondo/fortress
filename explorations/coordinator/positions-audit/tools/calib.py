#!/usr/bin/env python3
"""calib.py: how the two similarity thresholds of plib were set.

    python3 -I calib.py

The exact links (by number, by line at the numbering, by a title named in a history comment) are
pairs whose answer is known without any score. For each, it prints the true pair's score and the
best score of a wrong candidate in the same commit (another removed text for the new text, or
another new text for the removed one). A threshold for 'similarity' links should sit above most
wrong candidates and below most true pairs; the table shows how many fall on each side.
It then runs the similarity rule alone on the commits of the exact links and counts how often it
agrees, links wrongly or leaves a text unlinked. Last, for every text new in POSITIONS.md that no pair explains, its best score against
the texts that stood earlier in either file, which is what T_RECREATE cuts.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plib  # noqa: E402


def main():
    w = plib.World()
    r = w.repo
    true, wrong = [], []
    rows = []
    for h in r.order:
        ch = w.change(h)
        for t, pr in ch.pairs.items():
            if pr['how'] not in ('number', 'line', 'title'):
                continue
            s = w.sim(t, pr['old'])
            others_old = [o for o in ch.gone_cand if o != pr['old'] and o not in pr.get('also', [])]
            others_new = [n for n in ch.new if n != t]
            b1 = max([w.sim(t, o) for o in others_old] or [0.0])
            b2 = max([w.sim(n, pr['old']) for n in others_new] or [0.0])
            true.append(s)
            wrong.append(max(b1, b2))
            rows.append((s, max(b1, b2), pr['how'], h[:9], len(ch.new)))
    print('exact links: %d (by how: %s)' % (len(rows), {k: sum(1 for x in rows if x[2] == k) for k in ('number', 'line', 'title')}))
    print('%-6s %-24s %-24s %s' % ('T', 'true pairs below T', 'best wrong above T', 'true pairs whose best wrong is higher'))
    for T in (0.15, 0.20, 0.25, 0.30, 0.35, 0.40, 0.45, 0.50):
        print('%-6.2f %-24d %-24d %d' % (T, sum(1 for s in true if s < T), sum(1 for s in wrong if s >= T),
                                         sum(1 for s, b, *_ in rows if b > s)))
    lows = sorted(rows)[:12]
    print('the lowest true pairs (score, best wrong, how, commit, new texts in commit):')
    for x in lows:
        print('   %.3f  %.3f  %-6s %s %d' % x)
    # the similarity rule alone (mutual best, at least T) on the commits that have exact links
    print()
    print('the similarity rule alone (mutual best and >= T) on the %d exact links:' % len(rows))
    for T in (0.20, 0.25, 0.30, 0.35, 0.40):
        agree = wrong = unl = 0
        for h in r.order:
            ch = w.change(h)
            ex = {t: pr for t, pr in ch.pairs.items() if pr['how'] in ('number', 'line', 'title')}
            for t, pr in ex.items():
                s, b = max((w.sim(t, x), x) for x in ch.gone_cand)
                mutual = max((w.sim(n, b), n) for n in ch.new)[1] == t
                if s >= T and mutual:
                    if b == pr['old'] or b in pr.get('also', []):
                        agree += 1
                    else:
                        wrong += 1
                else:
                    unl += 1
        print('   T=%.2f  agrees %d, links wrongly %d, leaves unlinked %d' % (T, agree, wrong, unl))
    # unexplained new texts: their best earlier text
    print()
    print('texts new in POSITIONS.md with no pair in their commit: best score against earlier texts')
    best = []
    for h in r.order:
        ch = w.change(h)
        ps = r.parents(h)
        if not ps:
            continue
        for t in ch.new:
            if t in ch.pairs:
                continue
            if any(t in r.texts(p, 'H') for p in ps):
                continue
            pool = set()
            for p in ps:
                pool |= r.texts(p, 'H')
            s = max([w.sim(t, x) for x in pool] or [0.0])
            best.append((s, h[:9], t[:70]))
    best.sort(reverse=True)
    import collections
    hist = collections.Counter(int(s * 20) / 20 for s, *_ in best)
    print('   bins of 0.05:', ' '.join('%.2f:%d' % (k, hist[k]) for k in sorted(hist)))
    for s, h, t in best[:25]:
        print('   %.3f %s %s' % (s, h, t))


if __name__ == '__main__':
    main()
