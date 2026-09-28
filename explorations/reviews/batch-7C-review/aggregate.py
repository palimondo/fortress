"""Batch 7C's process measures, in tokens as the harness counts them, beside batches 6b, 7 and 7R.

python3 aggregate.py > summary.txt

The harness's count. The workflow's completion notice gives <subagent_tokens> per run: 2,075,355
(6b, wf_08949b8a-a21), 4,927,714 (7, wf_8a018276-f71), 3,146,146 (7R, wf_568733d7-19c) and
3,707,091 (7C, wf_5c4d7157-2e7), from the coordinator's session transcript. It is the sum over the
run's agents of each agent's context at its last turn (input + cache write + cache read): section 1
checks that against this directory's agents.csv (column ctx_end). So "tokens" below are context
tokens as the harness counts them: a tool result counts once, at its size, if it is still in the
agent's context at the end (no agent of these runs compacted). The earlier note's ITE figures are not
used here.

Batch 7C's agents are measured by ../process-review-6b-7-7R/measure.py, unchanged (this directory's
measure.py); batches 6b, 7 and 7R are read from that note's committed agents.csv, not measured again.
Workers and skeptics are the rung, repair and skeptic agents, as in that note.
"""
import csv, os
HERE = os.path.dirname(os.path.abspath(__file__))
PR = os.path.join(HERE, '..', 'process-review-6b-7-7R', 'agents.csv')
HARNESS = {'6b': 2075355, '7': 4927714, '7R': 3146146, '7C': 3707091}
NUM = ('turns', 'calls', 'ctx_end', 'compactions', 'b_calls', 'b_tokens', 'b_first_seq', 'b_parts_run',
       'b_parts_announced', 'g_calls', 'g_tokens', 'g_pre_calls', 'read_map', 'read_INDEX', 'read_FACTS',
       'read_POSITIONS', 'read_ledger', 'read_Library', 'total_ite')

def load(p):
    A = list(csv.DictReader(open(p)))
    for a in A:
        for k in NUM:
            try: a[k] = float(a[k])
            except (TypeError, ValueError): a[k] = None
    return A

def K(x):
    x = float(x)
    if abs(x) >= 1e6: return '%.2fM' % (x / 1e6)
    if abs(x) >= 1e3: return '%.0fK' % (x / 1e3)
    return '%.0f' % x

A7C = load(os.path.join(HERE, 'agents.csv'))
AOLD = load(PR)
ALL = AOLD + A7C
WS = ('rung', 'repair', 'skeptic')

print('Climb batch 7C, process measures, in tokens as the harness counts them (each agent\'s context at its last turn)')
print()
print('1. The harness count against the per-agent contexts (sum of ctx_end), per run:')
for b in ('6b', '7', '7R', '7C'):
    g = [a for a in ALL if a['batch'] == b]
    s = sum(a['ctx_end'] for a in g)
    print('   %-3s %2d agents  harness %s  sum of last contexts %s  compactions %d' % (
        b, len(g), K(HARNESS[b]), K(s), sum(a['compactions'] or 0 for a in g)))
print('   The notice equals the sum for 7 and 7C. For 6b and 7R it is lower, also over the agents that returned a result')
print('   (6b 13 of 15 with its cut launch wf_2da3e152-2d5, 7R 12 of 13 without rung J\'s killed first launch): cause not traced.')
print()
print('2. Batch 7C, every agent. tokens = context at the last turn; brief = the briefing\'s results (facts-extract.sh')
print('   and its read-backs); search = the baseline\'s "gathering" results; at = index of the first briefing call.')
print('   Direct reads (gathering or inspecting calls naming the file): map, INDEX, FACTS, POSITIONS, ledger, Library.')
print('%-18s %5s %5s %7s | %3s %5s %6s %4s %3s | %4s %6s %4s | %3s %5s %5s %3s %6s %7s' % (
    'role', 'turns', 'calls', 'tokens', 'b#', 'parts', 'brief', 'b%', 'at', 'g#', 'search', 'g%',
    'map', 'INDEX', 'FACTS', 'POS', 'ledger', 'Library'))
for a in A7C:
    print('%-18s %5d %5d %7s | %3d %2d/%-2d %6s %3.0f%% %3s | %4d %6s %3.0f%% | %3d %5d %5d %3d %6d %7d' % (
        a['role'], a['turns'], a['calls'], K(a['ctx_end']), a['b_calls'], a['b_parts_run'] or 0,
        a['b_parts_announced'] or 0, K(a['b_tokens']), 100 * a['b_tokens'] / a['ctx_end'],
        ('%d' % a['b_first_seq']) if a['b_first_seq'] is not None else '-', a['g_calls'], K(a['g_tokens']),
        100 * a['g_tokens'] / a['ctx_end'], a['read_map'], a['read_INDEX'], a['read_FACTS'],
        a['read_POSITIONS'], a['read_ledger'], a['read_Library']))
print()

def group(rows, kinds):
    return [a for a in rows if a['kind'] in kinds]

print('3. The briefing read, workers and skeptics, and the judges and review repairs apart.')
print('   ran = ran facts-extract.sh; first = as the first or second tool call; whole = every part the tool announced.')
for label, rows in (('6b-7R', AOLD), ('7C', A7C)):
    for name, kinds in (('workers+skeptics', WS), ('judges', ('judge',)), ('review repairs', ('review-repair',))):
        g = group(rows, kinds)
        ran = [a for a in g if a['b_calls'] > 0]
        first = [a for a in ran if a['b_first_seq'] is not None and a['b_first_seq'] <= 2]
        whole = [a for a in ran if (a['b_parts_run'] or 0) >= max(1, a['b_parts_announced'] or 0)]
        print('   %-5s %-17s n=%2d  ran %2d  first %2d  whole %2d' % (label, name, len(g), len(ran), len(first), len(whole)))
print()

print('4. Map and INDEX, workers and skeptics: agents that opened a file of coordinator/map/ or INDEX.md by a')
print('   gathering or inspecting call (direct), and agents whose briefing carried a map: or index: key.')
for label, rows in (('6b-7R', AOLD), ('7C', A7C)):
    g = group(rows, WS)
    km = sum(1 for a in g if 'map=' in (a.get('b_key_kinds') or ''))
    ki = sum(1 for a in g if 'INDEX=' in (a.get('b_key_kinds') or ''))
    dm = sum(1 for a in g if a['read_map'] > 0)
    di = sum(1 for a in g if a['read_INDEX'] > 0)
    either_m = sum(1 for a in g if a['read_map'] > 0 or 'map=' in (a.get('b_key_kinds') or ''))
    either_i = sum(1 for a in g if a['read_INDEX'] > 0 or 'INDEX=' in (a.get('b_key_kinds') or ''))
    print('   %-5s n=%2d  map: key %2d, direct %2d, either %2d | INDEX: key %2d, direct %2d, either %2d' % (
        label, len(g), km, dm, either_m, ki, di, either_i))
print()

print('5. Briefing and searching, as shares of the agents\' final contexts (tokens as the harness counts them), means per agent.')
print('%-6s %-8s %3s %5s %8s | %7s %5s | %7s %5s | %5s' % ('batch', 'group', 'n', 'turns', 'context', 'brief', 'b%',
                                                          'search', 'g%', 'both%'))
for label, rows in (('6b-7R', AOLD), ('7C', A7C)):
    for name, kinds in (('rung', ('rung',)), ('skeptic', ('skeptic',)), ('all', WS)):
        g = group(rows, kinds)
        if not g: continue
        n = len(g); ctx = sum(a['ctx_end'] for a in g); bt = sum(a['b_tokens'] for a in g); gt = sum(a['g_tokens'] for a in g)
        print('%-6s %-8s %3d %5.0f %8s | %7s %4.0f%% | %7s %4.0f%% | %4.0f%%' % (
            label, name, n, sum(a['turns'] for a in g) / n, K(ctx / n), K(bt / n), 100 * bt / ctx, K(gt / n),
            100 * gt / ctx, 100 * (bt + gt) / ctx))
print()
print('6. Searching per turn, workers and skeptics (calls and tokens), and searching before the first edit or probe.')
for label, rows in (('6b-7R', AOLD), ('7C', A7C)):
    g = group(rows, WS)
    t = sum(a['turns'] for a in g)
    gc = sum(a['g_calls'] for a in g)
    print('   %-5s turns %5d  searching calls per turn %.2f  searching tokens per turn %4.0f  before first do: %2.0f%% of calls' % (
        label, t, gc / t, sum(a['g_tokens'] for a in g) / t, 100 * sum(a['g_pre_calls'] for a in g) / gc))
print()
print('7. Per run: agents, the harness\'s tokens, and the share in workers and skeptics.')
for b in ('6b', '7', '7R', '7C'):
    g = [a for a in ALL if a['batch'] == b]
    w = [a for a in g if a['kind'] in WS]
    print('   %-3s agents %2d  tokens %s  workers+skeptics %2d, %s (%2.0f%%)  briefing in all contexts %s (%2.0f%%)' % (
        b, len(g), K(HARNESS[b]), len(w), K(sum(a['ctx_end'] for a in w)),
        100 * sum(a['ctx_end'] for a in w) / sum(a['ctx_end'] for a in g),
        K(sum(a['b_tokens'] for a in g)), 100 * sum(a['b_tokens'] for a in g) / sum(a['ctx_end'] for a in g)))

print()
print('8. The reviews after a batch, in the same unit: each review agent\'s context at its last turn, from its transcript.')
import json
S = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents'
for aid, name in (('a3b6a9510a5f5b738', 'conformance review, batches 6b and 7'),
                  ('ac6383b7bc198ce8b', 'conformance review, batch 7R'),
                  ('aff4eafbf111a9bc7', 'process review, batches 6b, 7 and 7R')):
    last, turns, seen = 0, 0, set()
    for line in open('%s/agent-%s.jsonl' % (S, aid)):
        r = json.loads(line)
        if r.get('type') != 'assistant': continue
        if r['message']['id'] not in seen: seen.add(r['message']['id']); turns += 1
        u = r['message'].get('usage', {})
        last = u.get('input_tokens', 0) + u.get('cache_creation_input_tokens', 0) + u.get('cache_read_input_tokens', 0)
    print('   %-40s %4d turns  %s tokens' % (name, turns, K(last)))
print('   against the runs they review: 6b and 7 together %s, 7R %s (the harness\'s notices above)' % (
    K(HARNESS['6b'] + HARNESS['7']), K(HARNESS['7R'])))
