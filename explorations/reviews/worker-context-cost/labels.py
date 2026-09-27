"""Hand labels for the gathering calls of the eight sampled agents, and their tally.

python3 labels.py      prints the tally and writes labels.txt beside this script.

Each gathering call of a sampled agent (its seq in calls.csv) gets one label, read
from sample/<agent>.txt against the record at the batch's base commit:

  B  the batch's decision record or the agent's own brief, which the prompt
     tells it to read first; a lookup does not replace it
  K  a read of FACTS.md, INDEX.md or a map: what the lookup would print instead
  H  held: the record at the base commit stated what the agent went to learn
     (how the harness decides a test, what compileAll does to the caches, how
     the shards count, the checker count's stage, a prior rung's result), and
     the agent did not need the primary text for an edit or a citation
  P  primary text needed: source to edit, a test to model, specification or
     library lines to cite or to check a claim against; the record may point
     there, but the agent has to read the text itself
  N  not on record: new ground, the rung's own question, or records the lookup
     does not print (the gap ledger's rows, other rungs' reports and probes,
     POSITIONS, git history)
  O  not gathering after all: the agent's own or reviewed work, or the state
     of its build (the classifier's error, counted for the hand check)

Ranges are inclusive; a seq that is not a gathering call is ignored.
"""
import csv
import os
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))


def spans(spec):
    out = {}
    for part in spec.split():
        label, rng = part.split('=')
        for r in rng.split(','):
            a, _, b = r.partition('-')
            for s in range(int(a), int(b or a) + 1):
                out[s] = label
    return out


LABELS = {
    ('batch 1', 'rung:M'): spans(
        'B=1 O=7,47,66 P=8-10,12-13,16,23,35,64 K=11,17,36,39,41 N=18-22,25,40,42-45,48 H=57'),
    ('batch 1', 'skeptic:N'): spans(
        'B=2 P=5-11,13,17-19,21-22,31,43-45 O=12,14-16 H=20,34-37'),
    ('batch 1', 'repair:N'): spans(
        'O=5-6,33,51,58,64 P=7-8,22-29,31,52-55 H=11-14 N=30 K=32'),
    ('batch 2', 'rung:X'): spans(
        'O=0,162-163 B=1 P=3-18,26-29,40-41,49-50,55,59-61,64-72,73-75,77,83-96,101,130-132,152-156 '
        'N=19-23,35-39,46-47,63,80,165 K=24-25 H=30-33,76,78,111-123'),
    ('batch 3', 'skeptic:R'): spans(
        'B=2,37 N=3,38-41,53-54,62-66 P=4-6,10-13,15-16,34-35,42-46,51-52,55-59,61,68-69,72 '
        'O=7,14,60,77 H=17,21,31-33,48-50,74-75'),
    ('batch 4', 'rung:O'): spans(
        'B=1-3,119 K=4,10 P=5-7,18,30,34,53-58 N=8-9,11-17,19-25,31-32,38,44,51-52,68-116 '
        'O=27-28,122 H=33,59,87'),
    ('batch 5', 'rung:D'): spans(
        'B=2-5 O=6,15,21,27-28,53,74,134,157,161,166,212 P=17,34-41,44,46-49,65-66,84-85,100-105,107-108,164,182,186,201-206 '
        'H=23,32,50,68,88,106,109 K=24,42-43,57-58,162 N=25-26,45,56,59-63,89-90,99,116-133,139-152,175-179,185,191'),
    ('batch 6', 'rung:R'): spans(
        'B=1-4 P=5-6,15-25,30-31,39,41-44,51,55-57,72,84-89,94-95,98,102-103,114,127,133,156,169 N=7,11,34,40,50,53,67,117-118,122-124,140,149-150,158 '
        'K=8-10,35 O=28,76,161-165,179-182 H=32-33,45-46,58-64,66,70,77,125,151'),
}


def brief_ite():
    """The briefing's cost for each agent, as aggregate.py computes it."""
    import json
    cal = json.load(open(os.path.join(HERE, 'calibration.json')))
    out = {}
    for a in csv.DictReader(open(os.path.join(HERE, 'agents.csv'))):
        k = cal[a['tier']]
        tok = k['per_byte'] * (25432 + 11206 + 26168 + 5978) + 4 * k['per_result']
        out[(a['batch'], a['role'])] = tok * float(a['brief_rate_per_token'])
    return out


def main():
    calls = list(csv.DictReader(open(os.path.join(HERE, 'calls.csv'))))
    briefs = brief_ite()
    out = ['Per agent: gathering calls and cost (ITE, results with their re-reads); per label: calls/ITE(share).', '']
    tot = defaultdict(lambda: defaultdict(float))
    cmp_rows = []
    for (batch, role), lab in LABELS.items():
        rows = [c for c in calls if c['batch'] == batch and c['role'] == role and c['cat'] == 'gather']
        tier = rows[0]['tier']
        by = defaultdict(lambda: defaultdict(float))
        missing = []
        for c in rows:
            l = lab.get(int(c['seq']))
            if l is None:
                missing.append(c['seq']); l = '?'
            by[l]['calls'] += 1; by[l]['bytes'] += float(c['bytes']); by[l]['ite'] += float(c['ite'])
            by[l]['out_ite'] += float(c['out_ite']); by[l]['time'] += float(c['tool_s']) + float(c['gen_s'])
        g_ite = sum(v['ite'] for v in by.values())
        line = '%-9s %-8s %-10s %3d calls %6.0fK ITE |' % (tier, batch, role, len(rows), g_ite / 1e3)
        for l in 'BKHPNO?':
            if l in by:
                line += ' %s %2d/%4.0fK(%2.0f%%)' % (l, by[l]['calls'], by[l]['ite'] / 1e3, 100 * by[l]['ite'] / g_ite)
                for k in ('calls', 'bytes', 'ite', 'out_ite', 'time'):
                    tot[(tier, l)][k] += by[l][k]
                    tot[('all', l)][k] += by[l][k]
        for t in (tier, 'all'):
            tot[(t, 'gather')]['ite'] += g_ite
            tot[(t, 'brief')]['ite'] += briefs[(batch, role)]
        out.append(line + ('  unlabelled: ' + ','.join(missing) if missing else ''))
        hk = by['H']['ite'] + by['K']['ite']
        hk_out = hk + by['H']['out_ite'] + by['K']['out_ite']
        cmp_rows.append('%-9s %-8s %-10s briefing %5.0fK | held %4.0fK, held+kb %4.0fK, with their turns\' output %4.0fK, time %3.0f s | briefing / (held+kb+output) %.1f' % (
            tier, batch, role, briefs[(batch, role)] / 1e3, by['H']['ite'] / 1e3, hk / 1e3, hk_out / 1e3,
            by['H']['time'] + by['K']['time'], briefs[(batch, role)] / max(1, hk_out)))
    out.append('')
    for tier in ('Opus 5', 'Opus 5.5', 'all'):
        g = tot[(tier, 'gather')]['ite']
        parts = ['%s %.0f%%' % (l, 100 * tot[(tier, l)]['ite'] / g) for l in 'BKHPNO' if tot[(tier, l)]['ite']]
        out.append('%-8s gathering %.2fM ITE: %s' % (tier, g / 1e6, ', '.join(parts)))
    out.append('')
    out.append('The briefing against what the record could have saved (ITE).')
    out += cmp_rows
    for tier in ('Opus 5', 'Opus 5.5', 'all'):
        hk = tot[(tier, 'H')]['ite'] + tot[(tier, 'K')]['ite']
        hko = hk + tot[(tier, 'H')]['out_ite'] + tot[(tier, 'K')]['out_ite']
        out.append('%-8s briefing %.2fM; held %.2fM; held+kb %.2fM; with output %.2fM; ratio %.1f' % (
            tier, tot[(tier, 'brief')]['ite'] / 1e6, tot[(tier, 'H')]['ite'] / 1e6, hk / 1e6, hko / 1e6, tot[(tier, 'brief')]['ite'] / hko))
    # The sample's shares, by role, applied to all 78 agents' gathering cost.
    agents_rows = list(csv.DictReader(open(os.path.join(HERE, 'agents.csv'))))
    kind_of = {(a['batch'], a['role']): a['kind'] for a in agents_rows}
    share = defaultdict(lambda: defaultdict(float))
    for (batch, role), lab in LABELS.items():
        kind = kind_of[(batch, role)]
        for c in calls:
            if c['batch'] == batch and c['role'] == role and c['cat'] == 'gather':
                l = lab[int(c['seq'])]
                share[kind]['g'] += float(c['ite'])
                if l in 'HK':
                    share[kind]['hk'] += float(c['ite']); share[kind]['hko'] += float(c['ite']) + float(c['out_ite'])
                if l == 'H':
                    share[kind]['h'] += float(c['ite'])
    gath = defaultdict(float)
    for c in calls:
        if c['cat'] == 'gather':
            gath[c['kind']] += float(c['ite'])
    bri = defaultdict(float)
    for a in agents_rows:
        bri[a['kind']] += briefs[(a['batch'], a['role'])]
    out.append('')
    out.append('Projected to all 78 agents with the sample\'s shares by role (ITE): held; held+kb; held+kb with their turns\' output; briefing.')
    sums = [0.0, 0.0, 0.0, 0.0]
    for kind in ('rung', 'skeptic', 'repair'):
        s_ = share[kind]
        vals = [gath[kind] * s_['h'] / s_['g'], gath[kind] * s_['hk'] / s_['g'], gath[kind] * s_['hko'] / s_['g'], bri[kind]]
        sums = [x + y for x, y in zip(sums, vals)]
        out.append('  %-8s gathering %5.1fM, shares %2.0f%% %2.0f%% %2.0f%%: %5.1fM %5.1fM %5.1fM against %5.1fM' % (
            kind, gath[kind] / 1e6, 100 * s_['h'] / s_['g'], 100 * s_['hk'] / s_['g'], 100 * s_['hko'] / s_['g'],
            vals[0] / 1e6, vals[1] / 1e6, vals[2] / 1e6, vals[3] / 1e6))
    out.append('  all      %5.1fM %5.1fM %5.1fM against %5.1fM; net cost of the briefing %.1fM to %.1fM' % (
        sums[0] / 1e6, sums[1] / 1e6, sums[2] / 1e6, sums[3] / 1e6, (sums[3] - sums[2]) / 1e6, (sums[3] - sums[0]) / 1e6))
    open(os.path.join(HERE, 'labels.txt'), 'w').write('\n'.join(out) + '\n')
    print('\n'.join(out))


if __name__ == '__main__':
    main()
