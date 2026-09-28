"""The cost of the two conformance reviews of these batches, against the batch runs they review,
by the baseline's billing (worker-context-cost/measure.py; ITE, input-token equivalents).
python3 review_cost.py > review_cost.txt"""
import csv, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import measure as ours                    # this directory's: loads the baseline's billing as ours.M
from agents import agents
S = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents'
REVIEWS = [('a3b6a9510a5f5b738', 'conformance review, batches 6b and 7'),
           ('ac6383b7bc198ce8b', 'conformance review, batch 7R')]
def K(x): return '%.2fM' % (x / 1e6) if x >= 1e6 else '%.0fK' % (x / 1e3)
tot = {}
for a in agents():
    ag, _ = ours.M.measure(a)
    b = a['batch']
    t = tot.setdefault(b, [0.0, 0, 0.0])
    t[0] += ag['total_ite']; t[1] += 1; t[2] += ag['wall_s']
for b, (ite, n, wall) in tot.items():
    print('batch %-3s run: %2d agents, %s ITE, %.1f agent-hours' % (b, n, K(ite), wall / 3600))
print('all three runs: %s ITE' % K(sum(v[0] for v in tot.values())))
for aid, name in REVIEWS:
    a = dict(path='%s/agent-%s.jsonl' % (S, aid), tier='Opus 5.5', aid=aid, role=name, label=name, kind='review', batch='-', wf='-')
    ag, calls = ours.M.measure(a)
    print('%-38s %4d turns, %4d calls, %s ITE, %.0f min' % (name, ag['turns'], ag['calls'], K(ag['total_ite']), ag['wall_s'] / 60))
