"""Measure what gathering context cost the batch agents: calls, bytes, wall time and tokens.

python3 measure.py            writes calls.csv (one row per tool call) and agents.csv
                              (one row per agent) beside this script.

Tokens. The API's usage gives, per turn k, the context size C_k = input +
cache creation + cache read. calibrate.py fits the growth C_k - C_{k-1} on the
turns whose usage is final: output (thinking included) plus 0.41 tokens per
byte of tool result plus about 110 tokens per result. A result of t tokens
then sits at a fixed position in the prefix and is billed on every later
turn m: at the cache-read rate for the part of it inside that turn's cache
read, at 1.25 for the part inside the turn's cache write (the first turn
that sees it, and every turn after the 5-minute cache expired), and at 1 for
the part sent uncached. Rates are relative to the input price: cache read
0.1 on Opus 5 and 0.05 on Opus 5.5, cache write 1.25 (5-minute), output 5.
One compaction (batch 6, rung F) drops everything before it.

Cost is given in input-token equivalents (ITE: tokens times those rates), and
in dollars at list price ($5 per M input on Opus 5, $4 on Opus 5.5).
"""
import csv
import json
import os
import re
import statistics
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from agents import agents          # noqa: E402
from parse import parse            # noqa: E402
from classify import classify, own_dirs_of, is_scratch   # noqa: E402

CAL = json.load(open(os.path.join(HERE, 'calibration.json')))

RATES = {'Opus 5': dict(read=0.10, write=1.25, inp=1.0, out=5.0, usd=5.0),
         'Opus 5.5': dict(read=0.05, write=1.25, inp=1.0, out=5.0, usd=4.0)}


def overlap(a, b, c, d):
    return max(0.0, min(b, d) - max(a, c))


def billed(a, b, turn, R):
    """Cost in ITE of the context interval [a, b) at one turn, and its cache-read tokens."""
    u = turn['usage']
    cr, cc, inp = u['cache_read_input_tokens'], u['cache_creation_input_tokens'], u['input_tokens']
    rd = overlap(a, b, 0, cr)
    wr = overlap(a, b, cr, cr + cc)
    ip = overlap(a, b, cr + cc, cr + cc + inp)
    return R['read'] * rd + R['write'] * wr + R['inp'] * ip, rd


def measure(a):
    p = parse(a['path'])
    T, calls = p['turns'], p['calls']
    R = RATES[a['tier']]
    own = own_dirs_of(calls)
    saved = {}
    for i, c in enumerate(calls):
        c.update(classify(c, own))
        # A long output is saved by the harness to tool-results/ and read back:
        # that read belongs to the call whose output it is.
        for m in re.finditer(r'saved to: (\S+/tool-results/\S+)', c['result'][:600]):
            saved[m.group(1)] = c
        src = re.search(r'/\S*tool-results/[A-Za-z0-9_.-]+', json.dumps(c['input']))
        if src:
            origin = saved.get(src.group(0)) or (calls[i - 1] if i else None)
            if origin is not None:
                for key in ('cat', 'sub', 'targets', 'kb'):
                    c[key] = origin[key]
    comp = p['compactions']

    # Tokens of each result, from the fit in calibration.json (tokens per byte plus a
    # fixed cost per result). Where a turn's recorded usage is a streaming snapshot,
    # its true output is what the context grew by beyond the results and reminders.
    K = CAL[a['tier']]
    for k in range(1, len(T) + 1):
        prev = T[k - 1]
        chunk = sorted([c for c in prev['calls'] if c['t_res'] is not None], key=lambda c: c['t_res'])
        for c in chunk:
            c['tokens'] = K['per_byte'] * c['bytes'] + K['per_result']
        extra_tok = K['per_extra_byte'] * (T[k]['extra_before'] if k < len(T) else 0)
        if not prev['final'] and k < len(T) and k not in comp:
            grown = T[k]['ctx'] - prev['ctx'] - sum(c['tokens'] for c in chunk) - extra_tok
            prev['out'] = max(prev['out'], grown)
        pos = prev['ctx'] + prev['out']
        for c in chunk:
            c['pos'] = (pos, pos + c['tokens'])
            c['seen_from'] = k
            pos += c['tokens']
    for c in calls:
        c.setdefault('tokens', 0.0); c.setdefault('pos', (0.0, 0.0)); c.setdefault('seen_from', len(T))

    # Bill each result on every later turn until the end or the next compaction.
    for c in calls:
        a0, b0 = c['pos']; k0 = c['seen_from']
        stop = min([m for m in comp if m >= k0] + [len(T)])
        ite = reads = 0.0
        for m in range(k0, stop):
            x, rd = billed(a0, b0, T[m], R)
            ite += x; reads += rd
        c['ite'] = ite; c['cache_reads'] = reads; c['turns_after'] = stop - k0

    # The output of each turn: billed at the output rate once, then as context.
    for k, t in enumerate(T):
        a0, b0 = t['ctx'], t['ctx'] + t['out']
        stop = min([m for m in comp if m > k] + [len(T)])
        ite = R['out'] * t['out']
        for m in range(k + 1, stop):
            ite += billed(a0, b0, T[m], R)[0]
        t['out_ite'] = ite

    # Generation time of each turn, and its share to each call it issued.
    last_res = p['t_start'] or T[0]['t0']
    for k, t in enumerate(T):
        gen = max(0.0, t['t1'] - last_res)
        t['gen'] = gen
        n = len(t['calls'])
        for c in t['calls']:
            c['gen_share'] = gen / n
            c['out_share_ite'] = t['out_ite'] / n
            c['out_share_tok'] = t['out'] / n
        rs = [c['t_res'] for c in t['calls'] if c['t_res']]
        last_res = max(rs) if rs else t['t1']
    for c in calls:
        c['tool_s'] = max(0.0, (c['t_res'] or c['t_call']) - c['t_call'])
        c.setdefault('gen_share', 0.0); c.setdefault('out_share_ite', 0.0); c.setdefault('out_share_tok', 0.0)

    # The first edit or probe: an Edit or Write, a write to a file outside the agent's
    # scratch space (tmp/, logs), or a run of a Fortress program or test. A baseline
    # build started in the background, or a helper script written to tmp/, is neither.
    first_do = None
    for c in calls:
        if c['cat'] != 'do' or c['sub'] == 'report':
            continue
        real_write = any(not is_scratch(p) and cls != 'unknown' for cls, p in c.get('wtargets', []))
        if c['name'] in ('Edit', 'Write') and any(is_scratch(p) for _, p in c.get('wtargets', [])):
            real_write = False
        elif c['name'] in ('Edit', 'Write'):
            real_write = True
        if real_write or c.get('probe'):
            first_do = c['seq']; break
    for c in calls:
        c['before_first_do'] = first_do is None or c['seq'] < first_do

    total_ite = sum(R['inp'] * t['usage']['input_tokens'] + R['write'] * t['usage']['cache_creation_input_tokens']
                    + R['read'] * t['usage']['cache_read_input_tokens'] + R['out'] * t['out'] for t in T)
    total_input_ite = total_ite - sum(R['out'] * t['out'] for t in T)
    ag = dict(a)
    ag.update(dict(turns=len(T), calls=len(calls), own=';'.join(sorted(own)), first_do=first_do,
                   ctx0=T[0]['ctx'], ctx_end=T[-1]['ctx'],
                   wall_s=(T[-1]['t1'] - (p['t_start'] or T[0]['t0'])),
                   tok_in=sum(t['usage']['input_tokens'] for t in T),
                   tok_cc=sum(t['usage']['cache_creation_input_tokens'] for t in T),
                   tok_cr=sum(t['usage']['cache_read_input_tokens'] for t in T),
                   tok_out=sum(t['out'] for t in T), total_ite=total_ite, total_input_ite=total_input_ite,
                   compactions=len(comp)))
    # the prompt (system prompt, tools and task) and the system reminders, for the accounting
    prefix_ite = sum(billed(0, T[0]['ctx'], T[m], R)[0] for m in range(0, min(comp + [len(T)])))
    ag['prefix_ite'] = prefix_ite
    ag['other_ite'] = total_ite - prefix_ite - sum(c['ite'] for c in calls) - sum(t['out_ite'] for t in T)
    # the per-turn rate a block placed right after the prompt would pay (for the briefing)
    P0 = T[0]['ctx'] + T[0]['out']
    rate = 0.0
    for m in range(1, len(T)):
        u = T[m]['usage']
        cr, cc = u['cache_read_input_tokens'], u['cache_creation_input_tokens']
        if m in comp:
            break
        rate += R['read'] if cr > P0 else (R['write'] if cr + cc > P0 else R['inp'])
    ag['brief_rate_per_token'] = rate   # ITE per token of a block read at the start
    return ag, calls


def main():
    rows_a, rows_c = [], []
    for a in agents():
        ag, calls = measure(a)
        rows_a.append(ag)
        for c in calls:
            tg = sorted(set(x for x, _ in c['targets']))
            cmd = c['input'].get('command') or c['input'].get('file_path') or ''
            rows_c.append(dict(batch=a['batch'], tier=a['tier'], role=a['role'], kind=a['kind'], aid=a['aid'],
                               seq=c['seq'], turn=c['turn'], tool=c['name'], cat=c['cat'], sub=c['sub'],
                               kb=int(c['kb']), targets='|'.join(tg),
                               kbfiles='|'.join(n for n, pat in (('map', 'coordinator/map'), ('FACTS', 'FACTS.md'), ('INDEX', 'INDEX.md'))
                                                if c['cat'] == 'gather' and any(pat in p for _, p in c['targets'])), bytes=c['bytes'], tokens=round(c['tokens']),
                               ite=round(c['ite']), cache_reads=round(c['cache_reads']), turns_after=c['turns_after'],
                               tool_s=round(c['tool_s'], 2), gen_s=round(c['gen_share'], 2),
                               out_tok=round(c['out_share_tok']), out_ite=round(c['out_share_ite']),
                               before_first_do=int(c['before_first_do']), is_error=int(c['is_error']),
                               cmd=re.sub(r'\s+', ' ', cmd)[:160]))
    with open(os.path.join(HERE, 'calls.csv'), 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=list(rows_c[0].keys())); w.writeheader(); w.writerows(rows_c)
    keys = [k for k in rows_a[0].keys() if k != 'path']
    with open(os.path.join(HERE, 'agents.csv'), 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=keys, extrasaction='ignore'); w.writeheader(); w.writerows(rows_a)


if __name__ == '__main__':
    main()
