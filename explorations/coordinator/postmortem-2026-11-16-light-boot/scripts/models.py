#!/usr/bin/env python3
"""models.py counts, for each stretch of the coordinating session that one model
served: the replies (API calls with that model's name), the curator's messages
and the compactions inside it. A stretch ends when the model of the replies
changes. It also prints the totals by model, for all time and since the
coordinator skill's rewrite of 2026-10-13 19:22 UTC (commit 7b434aae52).

    python3 scripts/models.py [--runs]      # --runs prints each stretch
"""
import collections, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib

REWRITE = '2026-10-13T19:22'
LAST = '2026-11-08T15:38'      # commit 624b7a79e6, the last change under .claude/skills/coordinator/

def main():
    ev = tlib.load_events({'reply', 'his', 'boundary'})
    runs = []          # [model, first ts, last ts, replies, his, boundaries, first ref]
    cur = None
    for e in ev:
        if e['k'] == 'reply':
            m = e['model']
            if m == '<synthetic>':
                continue
            if cur is None or cur[0] != m:
                cur = [m, e['ts'], e['ts'], 0, 0, 0, e['ref']]
                runs.append(cur)
            cur[2] = e['ts']; cur[3] += 1
        elif cur is not None:
            cur[4 if e['k'] == 'his' else 5] += 1
    if '--runs' in sys.argv:
        for m, a, b, n, h, c, ref in runs:
            print('%s .. %s  %-10s replies %5d  his messages %4d  compactions %2d  from %s' % (tlib.fmt_ts(a), tlib.fmt_ts(b), tlib.tier(m), n, h, c, ref))
    for label, since in (('all of the transcript', ''), ('since the skill rewrite of %s' % REWRITE, REWRITE),
                         ('since the coordinator skill last changed, %s' % LAST, LAST)):
        tot = collections.defaultdict(lambda: [0, 0, 0])
        cur_model = None
        for e in ev:
            if e['k'] == 'reply':
                if e['model'] != '<synthetic>':
                    cur_model = e['model']
                    if e['ts'] >= since:
                        tot[tlib.tier(cur_model)][0] += 1
            elif cur_model and e['ts'] >= since:
                tot[tlib.tier(cur_model)][1 if e['k'] == 'his' else 2] += 1
        print('\n%s (a message of his and a compaction count for the model of the reply before it):' % label)
        for m, (n, h, c) in sorted(tot.items(), key=lambda x: -x[1][0]):
            print('  %-10s replies %6d  his messages %5d  compactions %3d' % (m, n, h, c))

if __name__ == '__main__':
    main()
