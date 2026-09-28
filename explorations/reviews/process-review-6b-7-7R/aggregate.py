"""Tables of this review from agents.csv and calls.csv, beside the baseline's published figures.

python3 aggregate.py > summary.txt

The baseline figures are quoted, not re-measured (protocol principle 5):
worker-context-cost.md section 1 (the Opus 5.5 rows of its table) and summary.txt (briefI, the
projected cost of a 29K-token briefing read first); worker-global-decisions.md "What the agents read".
"""
import csv, os
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
A = list(csv.DictReader(open(os.path.join(HERE, 'agents.csv'))))
C = list(csv.DictReader(open(os.path.join(HERE, 'calls.csv'))))
for a in A:
    for k, v in a.items():
        if k in ('batch', 'role', 'label', 'kind', 'aid', 'wf', 'tier', 'own', 'b_key_kinds'): continue
        try: a[k] = float(v)
        except (TypeError, ValueError): pass

# worker-context-cost.md section 1, Opus 5.5 rows; summary.txt briefI column
BASE = {
    'rung':    dict(n=18, turns=212, calls=219, whole=5.47e6, gcalls=117, gbytes=363e3, gite=1.72e6, gshare=.31, pre_c=.41, pre_i=.71, brief=358e3),
    'repair':  dict(n=12, turns=103, calls=108, whole=2.03e6, gcalls=46, gbytes=104e3, gite=232e3, gshare=.11, pre_c=.24, pre_i=.41, brief=187e3),
    'skeptic': dict(n=26, turns=98, calls=101, whole=1.84e6, gcalls=55, gbytes=145e3, gite=309e3, gshare=.17, pre_c=.38, pre_i=.70, brief=176e3),
    'all three': dict(n=56, turns=136, calls=140, whole=3.05e6, gcalls=73, gbytes=206e3, gite=746e3, gshare=.24, pre_c=.38, pre_i=.69, brief=237e3),
}


def K(x):
    x = float(x)
    if abs(x) >= 1e6: return '%.2fM' % (x / 1e6)
    if abs(x) >= 1e3: return '%.0fK' % (x / 1e3)
    return '%.0f' % x


def mean(xs):
    xs = list(xs)
    return sum(xs) / len(xs) if xs else 0.0


print('Climb batches 6b, 7 and 7R: what the agents read and what it cost')
print('ITE = input-token equivalents, the baseline\'s unit (worker-context-cost.md, "Sources and method").')
print()
print('1. Every agent. b = the briefing (facts-extract.sh and its read-backs): calls, parts read / announced,')
print('   bytes, ITE with every later re-read, and the index of its first call (0 = the first tool call).')
print('   g = gathering (the baseline\'s rule): calls, ITE. Direct reads (calls, any category that reads):')
print('   map, INDEX, FACTS, POSITIONS, ledger, Library.')
print('%-3s %-17s %5s %5s %7s | %3s %5s %6s %6s %4s | %4s %6s %5s | %s' % (
    'bat', 'role', 'turns', 'calls', 'whole', 'b#', 'parts', 'bytes', 'bITE', 'at', 'g#', 'gITE', 'g%',
    'map INDEX FACTS POS ledger Library'))
for a in A:
    print('%-3s %-17s %5d %5d %7s | %3d %2d/%-2d %6s %6s %4s | %4d %6s %4.0f%% | %3d %5d %5d %3d %6d %7d' % (
        a['batch'], a['role'], a['turns'], a['calls'], K(a['total_ite']), a['b_calls'], a['b_parts_run'],
        a['b_parts_announced'], K(a['b_bytes']), K(a['b_ite']),
        ('%d' % a['b_first_seq']) if a['b_first_seq'] != '' else '-',
        a['g_calls'], K(a['g_ite']), 100 * a['g_ite'] / a['total_ite'],
        a['read_map'], a['read_INDEX'], a['read_FACTS'], a['read_POSITIONS'], a['read_ledger'], a['read_Library']))
print()

GROUPS = [('rung', ['rung']), ('repair', ['repair']), ('skeptic', ['skeptic']),
          ('all three', ['rung', 'repair', 'skeptic']), ('judge', ['judge']),
          ('review repair', ['review-repair']), ('review', ['review']), ('gather', ['gather']),
          ('gate', ['gate']), ('commit', ['commit'])]

print('2. The briefing read, by role. "ran" = ran facts-extract.sh or read a saved copy of its output;')
print('   "first" = as the first or second tool call (the second after a git log of the branch);')
print('   "whole" = every part the tool announced. Keys: agents whose briefing carried a map / INDEX /')
print('   FACTS / POSITIONS / ledger key. Direct: agents that opened the file themselves at least once.')
for name, kinds in GROUPS:
    g = [a for a in A if a['kind'] in kinds]
    if not g: continue
    ran = [a for a in g if a['b_calls'] > 0]
    first = [a for a in ran if a['b_first_seq'] != '' and a['b_first_seq'] <= 2]
    whole = [a for a in ran if a['b_parts_run'] >= max(1, a['b_parts_announced'])]
    kk = lambda k: sum(1 for a in ran if (k + '=') in str(a['b_key_kinds']))
    d = lambda k: sum(1 for a in g if a['read_' + k] > 0)
    print('  %-14s n=%2d  ran %2d  first %2d  whole %2d | keys: map %2d INDEX %2d FACTS %2d POSITIONS %2d ledger %2d'
          ' | direct: map %2d INDEX %2d FACTS %2d POSITIONS %2d ledger %2d Library %2d' % (
              name, len(g), len(ran), len(first), len(whole), kk('map'), kk('INDEX'), kk('FACTS'), kk('POSITIONS'),
              kk('ledger'), d('map'), d('INDEX'), d('FACTS'), d('POSITIONS'), d('ledger'), d('Library')))
print('  Baseline (worker-global-decisions.md, "What the agents read"), 58 Opus 5.5 workers and skeptics of')
print('  batches 3 to 6: map 25, FACTS 37, INDEX 2, POSITIONS 38, ledger 56, Library 53; batch 6 alone map 2 of 12.')
print()

print('3. Cost per agent, means, against the baseline (worker-context-cost.md section 1, Opus 5.5).')
print('   gather = the baseline\'s gathering; brief = the briefing, read, with its re-reads; both = the two.')
print('   The baseline\'s "brief" column is the cost it projected for a 29K-token briefing read first.')
print('%-10s %-6s %3s %5s %5s %7s | %5s %6s %6s %5s %9s | %6s %6s %5s | %6s %5s' % (
    'group', 'batch', 'n', 'turns', 'calls', 'whole', 'g#', 'gBytes', 'gITE', 'g%', 'pre c/I',
    'bBytes', 'bITE', 'b%', 'both', 'both%'))
for name, kinds in GROUPS[:4]:
    for label, sel in (('now', lambda a: True),):
        g = [a for a in A if a['kind'] in kinds]
        if not g: continue
        whole = mean(a['total_ite'] for a in g)
        gite = mean(a['g_ite'] for a in g)
        bite = mean(a['b_ite'] for a in g)
        gc = sum(a['g_calls'] for a in g)
        prec = sum(a['g_pre_calls'] for a in g) / gc if gc else 0
        prei = sum(a['g_pre_ite'] for a in g) / max(1, sum(a['g_ite'] for a in g))
        print('%-10s %-6s %3d %5.0f %5.0f %7s | %5.0f %6s %6s %4.0f%% %4.0f%%/%3.0f%% | %6s %6s %4.0f%% | %6s %4.0f%%' % (
            name, '6b-7R', len(g), mean(a['turns'] for a in g), mean(a['calls'] for a in g), K(whole),
            mean(a['g_calls'] for a in g), K(mean(a['g_bytes'] for a in g)), K(gite),
            100 * sum(a['g_ite'] for a in g) / sum(a['total_ite'] for a in g), 100 * prec, 100 * prei,
            K(mean(a['b_bytes'] for a in g)), K(bite), 100 * sum(a['b_ite'] for a in g) / sum(a['total_ite'] for a in g),
            K(gite + bite), 100 * (sum(a['g_ite'] for a in g) + sum(a['b_ite'] for a in g)) / sum(a['total_ite'] for a in g)))
        b = BASE[name]
        print('%-10s %-6s %3d %5d %5d %7s | %5d %6s %6s %4.0f%% %4.0f%%/%3.0f%% | %6s %6s %5s |' % (
            '', 'base', b['n'], b['turns'], b['calls'], K(b['whole']), b['gcalls'], K(b['gbytes']), K(b['gite']),
            100 * b['gshare'], 100 * b['pre_c'], 100 * b['pre_i'], '(29K t)', K(b['brief']), 'proj.'))
print()

print('4. Per agent, per turn: gathering and briefing ITE, so that longer runs do not read as more gathering.')
for name, kinds in GROUPS[:4]:
    g = [a for a in A if a['kind'] in kinds]
    t = sum(a['turns'] for a in g)
    print('  %-10s turns %5d  gathering calls per turn %.2f  gathering bytes per turn %4.0f  gathering ITE per turn %5.0f'
          '  briefing ITE per turn %5.0f' % (name, t, sum(a['g_calls'] for a in g) / t, sum(a['g_bytes'] for a in g) / t,
                                           sum(a['g_ite'] for a in g) / t, sum(a['b_ite'] for a in g) / t))
print('  Baseline, Opus 5.5 (worker-context-cost.md section 3): 0.54 gathering calls and 1.5 KB per turn.')
print()

print('5. Totals over the 17 workers and skeptics, and over every agent of the three runs.')
for name, sel in (('workers and skeptics', lambda a: a['kind'] in ('rung', 'repair', 'skeptic')),
                  ('every agent', lambda a: True)):
    g = [a for a in A if sel(a)]
    print('  %-22s n=%2d  whole %s  gathering %s (%.0f%%)  briefing %s (%.0f%%)  briefing bytes %s  briefing tokens %s' % (
        name, len(g), K(sum(a['total_ite'] for a in g)), K(sum(a['g_ite'] for a in g)),
        100 * sum(a['g_ite'] for a in g) / sum(a['total_ite'] for a in g), K(sum(a['b_ite'] for a in g)),
        100 * sum(a['b_ite'] for a in g) / sum(a['total_ite'] for a in g), K(sum(a['b_bytes'] for a in g)),
        K(sum(a['b_tokens'] for a in g))))
print()
print('6. What the gathering read after the briefing, workers and skeptics: calls and ITE by target class.')
cls = defaultdict(lambda: [0, 0.0])
aids = {a['aid'] for a in A if a['kind'] in ('rung', 'repair', 'skeptic')}
for c in C:
    if c['aid'] in aids and c['cat'] == 'gather':
        t = c['targets'].split('|') if c['targets'] else ['(none: a tree-wide search)']
        for x in t:
            cls[x][0] += 1.0 / len(t); cls[x][1] += float(c['ite']) / len(t)
tot = sum(v[1] for v in cls.values())
for k, v in sorted(cls.items(), key=lambda kv: -kv[1][1]):
    print('  %-28s calls %5.0f  ITE %7s  %3.0f%%' % (k, v[0], K(v[1]), 100 * v[1] / tot))
print()
print('7. What the gathering read, per agent means over the 17 workers and skeptics (a call naming several')
print('   kinds is shared among them), beside the baseline\'s Opus 5.5 column (worker-context-cost.md section 1,')
print('   "What the gathering read"). "own" is the classifier\'s scratch and rung-directory class.')
BASE7 = {'source': (18.5, 42e3, 144e3), 'library': (8.9, 19e3, 78e3), 'spec': (13.8, 32e3, 101e3),
         'tests': (6.7, 14e3, 43e3), 'records': (13.3, 52e3, 198e3), 'brief': (2.7, 28e3, 110e3),
         'kb': (1.7, 8e3, 34e3)}
n = len(aids)
per = defaultdict(lambda: [0.0, 0.0, 0.0])
for c in C:
    if c['aid'] in aids and c['cat'] == 'gather':
        t = c['targets'].split('|') if c['targets'] else ['(none)']
        for x in t:
            per[x][0] += 1.0 / len(t); per[x][1] += float(c['bytes']) / len(t); per[x][2] += float(c['ite']) / len(t)
names = {'brief': 'the batch record', 'records': 'other records', 'kb': 'FACTS, INDEX, maps', 'spec': 'specification',
         'tests': 'tests and harness'}
for k in ('source', 'library', 'spec', 'tests', 'records', 'brief', 'kb', 'own', '(none)'):
    v = per.get(k, [0, 0, 0])
    b = BASE7.get(k)
    print('  %-20s now %5.1f calls %6s bytes %6s ITE   baseline %s' % (
        names.get(k, k), v[0] / n, K(v[1] / n), K(v[2] / n),
        ('%5.1f calls %6s bytes %6s ITE' % (b[0], K(b[1]), K(b[2]))) if b else '(not a class there)'))
print('  the briefing          now %5.1f calls %6s bytes %6s ITE   baseline (none)' % (
    sum(a['b_calls'] for a in A if a['aid'] in aids) / n, K(sum(a['b_bytes'] for a in A if a['aid'] in aids) / n),
    K(sum(a['b_ite'] for a in A if a['aid'] in aids) / n)))
