"""Part 2's reading figures for batch 6.5b's workers, repair round and skeptics, beside N's, 7C's and 6b-7R's from
those notes' committed agents.csv (not measured again; batch 6.5's review committed none, so its figures are cited
from its text). Tokens as the harness counts them (context at the last turn).
python3 measure.py; python3 aggregate_65b.py > summary.txt"""
import csv, os
R = '/home/user/fortress/explorations/reviews/'
HERE = os.path.dirname(os.path.abspath(__file__))
def load(p): return list(csv.DictReader(open(p)))
B = load(os.path.join(HERE, 'agents.csv')); N = load(R + 'batch-N-review/agents.csv'); C7 = load(R + 'batch-7C-review/agents.csv'); E = load(R + 'process-review-6b-7-7R/agents.csv')
f = lambda x: float(x) if x not in ('', None) else 0.0
def stats(rows, kinds, name):
    rs = [r for r in rows if r['kind'] in kinds]
    if not rs: return
    n = len(rs); m = lambda k: sum(f(r[k]) for r in rs) / n
    ctx, b, g = m('ctx_end'), m('b_tokens'), m('g_tokens')
    turns = sum(f(r['turns']) for r in rs); gc = sum(f(r['g_calls']) for r in rs); gt = sum(f(r['g_tokens']) for r in rs); gp = sum(f(r['g_pre_calls']) for r in rs)
    print(f"{name:30s} n={n:2d} context {ctx/1e3:4.0f}K  briefing {b/1e3:4.0f}K ({100*b/ctx:2.0f}%)  searching {g/1e3:4.0f}K ({100*g/ctx:2.0f}%)  "
          f"per turn {gc/turns:.2f} calls {gt/turns:4.0f} tokens  before the first edit or probe {100*gp/max(1,gc):2.0f}%")
print('== Reading cost, means per agent')
for rows, name in ((B, '6.5b'), (N, 'N'), (C7, '7C'), (E, '6b-7R')):
    for kinds, lab in ((('rung',), 'rung workers'), (('repair',), 'repair rounds'), (('skeptic',), 'skeptics'), (('rung', 'skeptic', 'repair'), 'all three')):
        stats(rows, kinds, f'{name} {lab}')
print('\n== Briefing, map and INDEX, batch 6.5b')
for r in B:
    if r['kind'] in ('rung', 'repair', 'skeptic', 'judge', 'review-repair', 'gate-repair'):
        print(f"{r['label']:14s} briefing first at call {r['b_first_seq']:>2s}, parts {r['b_parts_run']}/{r['b_parts_announced']}, {f(r['b_tokens'])/1e3:4.0f}K; "
              f"keys {r['b_key_kinds']}; map files opened {r['read_map']}, INDEX opened {r['read_INDEX']}")
