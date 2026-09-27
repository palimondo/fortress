"""Summarise calls.csv and agents.csv by era (Opus 5, Opus 5.5) and role; writes summary.txt.

The briefing's size is the facts-extract.sh output for rung O's list plus --common
(68,784 bytes in four parts, measured on branch script-retry at 21dcccfe2), in
tokens by the fit in calibration.json.
"""
import collections
import csv
import json
import os
import statistics

HERE = os.path.dirname(os.path.abspath(__file__))
BRIEF_BYTES = 25432 + 11206 + 26168 + 5978       # --common parts 1-2, rung O's list parts 1-2
USD = {'Opus 5': 5.0, 'Opus 5.5': 4.0}
READ = {'Opus 5': 0.10, 'Opus 5.5': 0.05}


def brief_tokens(tier):
    k = json.load(open(os.path.join(HERE, 'calibration.json')))[tier]
    return k['per_byte'] * BRIEF_BYTES + 4 * k['per_result']


def main():
    A = {r['aid']: r for r in csv.DictReader(open(os.path.join(HERE, 'agents.csv')))}
    C = list(csv.DictReader(open(os.path.join(HERE, 'calls.csv'))))
    per = {aid: collections.defaultdict(float) for aid in A}
    for c in C:
        d = per[c['aid']]
        cat = c['cat']
        for key in ('bytes', 'tokens', 'ite', 'cache_reads', 'tool_s', 'gen_s', 'out_ite', 'out_tok'):
            d[cat + '.' + key] += float(c[key])
        d[cat + '.calls'] += 1
        if cat == 'gather':
            if c['before_first_do'] == '1':
                d['gpre.calls'] += 1; d['gpre.bytes'] += float(c['bytes']); d['gpre.ite'] += float(c['ite'])
                d['gpre.tokens'] += float(c['tokens'])
            if c['kb'] == '1':
                d['kb.calls'] += 1; d['kb.bytes'] += float(c['bytes']); d['kb.ite'] += float(c['ite'])
                d['kb.tokens'] += float(c['tokens']); d['kb.tool_s'] += float(c['tool_s']); d['kb.gen_s'] += float(c['gen_s'])
                if c['before_first_do'] == '1':
                    d['kbpre.calls'] += 1; d['kbpre.ite'] += float(c['ite'])
            tg = [t for t in c['targets'].split('|') if t and t != 'own'] or ['unnamed']
            if c['sub'] == 'history':
                tg = ['history']
            for t in tg:
                d['tg.' + t + '.bytes'] += float(c['bytes']) / len(tg)
                d['tg.' + t + '.ite'] += float(c['ite']) / len(tg)
                d['tg.' + t + '.calls'] += 1.0 / len(tg)
    for aid, a in A.items():
        d = per[aid]
        d['total_ite'] = float(a['total_ite']); d['turns'] = float(a['turns']); d['calls'] = float(a['calls'])
        d['wall_s'] = float(a['wall_s']); d['brief_ite'] = brief_tokens(a['tier']) * float(a['brief_rate_per_token'])
        d['prefix_ite'] = float(a['prefix_ite']); d['ctx_end'] = float(a['ctx_end'])
        d['tok_cr'] = float(a['tok_cr']); d['tok_cc'] = float(a['tok_cc']); d['tok_out'] = float(a['tok_out'])
        d['kb.any'] = 1.0 if d['kb.calls'] > 0 else 0.0

    out = []
    w = out.append

    def group(pred):
        return [aid for aid, a in A.items() if pred(a)]

    def mean(ids, key):
        return sum(per[i][key] for i in ids) / len(ids) if ids else 0.0

    def tot(ids, key):
        return sum(per[i][key] for i in ids)

    def K(x):
        return '%.0f' % x if abs(x) < 1000 else ('%.0fK' % (x / 1e3) if abs(x) < 1e6 else '%.2fM' % (x / 1e6))

    groups = [('Opus 5, all', group(lambda a: a['tier'] == 'Opus 5')),
              ('Opus 5.5, all', group(lambda a: a['tier'] == 'Opus 5.5'))]
    for tier in ('Opus 5', 'Opus 5.5'):
        for kind in ('rung', 'repair', 'skeptic'):
            groups.append(('%s, %s' % (tier, kind), group(lambda a, t=tier, k=kind: a['tier'] == t and a['kind'] == k)))
    groups.append(('both eras', list(A)))

    w('Briefing size: %d bytes = %s tokens (Opus 5), %s tokens (Opus 5.5), by calibration.json' % (
        BRIEF_BYTES, K(brief_tokens('Opus 5')), K(brief_tokens('Opus 5.5'))))
    w('ITE = input-token equivalents: input 1, cache write 1.25, cache read 0.1 (Opus 5) or 0.05 (Opus 5.5), output 5.')
    w('')
    w('Per agent means (n = agents in the group).')
    hdr = '%-20s %3s %5s %6s %8s | %6s %7s %7s %7s %6s %6s | %6s %6s | %5s %6s %7s | %7s %7s %6s'
    w(hdr % ('group', 'n', 'turns', 'calls', 'ITE', 'gCalls', 'gBytes', 'gTok', 'gITE', 'gITE%', 'gOut%',
             'pre%c', 'pre%I', 'kbAg%', 'kbCall', 'kbITE', 'briefI', 'brief%', 'b/g'))
    for name, ids in groups:
        if not ids:
            continue
        n = len(ids)
        g_ite = mean(ids, 'gather.ite'); t_ite = mean(ids, 'total_ite'); g_out = mean(ids, 'gather.out_ite')
        w(hdr % (name, n, '%.0f' % mean(ids, 'turns'), '%.0f' % mean(ids, 'calls'), K(t_ite),
                 '%.0f' % mean(ids, 'gather.calls'), K(mean(ids, 'gather.bytes')), K(mean(ids, 'gather.tokens')),
                 K(g_ite), '%.0f%%' % (100 * g_ite / t_ite), '%.0f%%' % (100 * g_out / t_ite),
                 '%.0f%%' % (100 * tot(ids, 'gpre.calls') / max(1, tot(ids, 'gather.calls'))),
                 '%.0f%%' % (100 * tot(ids, 'gpre.ite') / max(1, tot(ids, 'gather.ite'))),
                 '%.0f%%' % (100 * mean(ids, 'kb.any')), '%.1f' % mean(ids, 'kb.calls'), K(mean(ids, 'kb.ite')),
                 K(mean(ids, 'brief_ite')), '%.0f%%' % (100 * mean(ids, 'brief_ite') / t_ite),
                 '%.2f' % (mean(ids, 'brief_ite') / g_ite)))
    w('')
    w('gCalls..gITE: gathering calls, result bytes, result tokens, and their cost in ITE with every later re-read;')
    w('gITE%: that cost as a share of the agent\'s whole cost; gOut%: the output of the gathering turns (their thinking')
    w('and tool calls, with its own re-reads), as a further share. pre%c, pre%I: share of gathering calls and of its')
    w('cost that came before the first edit or probe. kbAg%: agents that read FACTS, INDEX or a map at least once;')
    w('kbCall, kbITE: such calls per agent and their cost. briefI: what the 29K-token briefing, read first, would cost the')
    w('same agent over the same turns; brief%: as a share of the agent\'s cost; b/g: briefing cost over gathering cost.')
    w('')
    w('All four categories, per agent means: calls, result bytes, cost in ITE (results and their re-reads), tool wall time')
    w('(seconds, summed per call) and model time of the turns issuing them (seconds).')
    for name, ids in groups:
        if not ids:
            continue
        w('  %s (n=%d), wall %.0f min per agent, whole cost %s ITE (prompt prefix %s):' % (
            name, len(ids), mean(ids, 'wall_s') / 60, K(mean(ids, 'total_ite')), K(mean(ids, 'prefix_ite'))))
        for cat in ('gather', 'inspect', 'do', 'other'):
            w('    %-8s calls %5.0f  bytes %6s  tokens %6s  ITE %6s  tool %5.0f s  model %5.0f s' % (
                cat, mean(ids, cat + '.calls'), K(mean(ids, cat + '.bytes')), K(mean(ids, cat + '.tokens')),
                K(mean(ids, cat + '.ite')), mean(ids, cat + '.tool_s'), mean(ids, cat + '.gen_s')))
    w('')
    w('Calls that read FACTS.md, INDEX.md or a map, per agent means: calls, bytes, tokens, ITE, tool and model seconds,')
    w('share of those calls before the first edit or probe, and share of the agent\'s gathering cost.')
    for name, ids in groups:
        if not ids:
            continue
        w('  %-18s agents touching %2.0f of %2d  calls %4.1f  bytes %5s  tokens %5s  ITE %5s  tool %3.0f s  model %3.0f s  pre %3.0f%%  of gathering %2.0f%%' % (
            name, sum(per[i]['kb.any'] for i in ids), len(ids), mean(ids, 'kb.calls'), K(mean(ids, 'kb.bytes')),
            K(mean(ids, 'kb.tokens')), K(mean(ids, 'kb.ite')), mean(ids, 'kb.tool_s'), mean(ids, 'kb.gen_s'),
            100 * tot(ids, 'kbpre.calls') / max(1, tot(ids, 'kb.calls')), 100 * tot(ids, 'kb.ite') / tot(ids, 'gather.ite')))
    w('')
    w('Agents of each batch whose gathering read a map, FACTS.md or INDEX.md at least once.')
    for b in ('repair batch', 'batch 1', 'batch 2', 'batch 3', 'batch 3.5', 'batch 4', 'batch 5', 'batch 6'):
        ids = [i for i, a in A.items() if a['batch'] == b]
        line = '  %-12s %2d agents' % (b, len(ids))
        for f in ('map', 'FACTS', 'INDEX'):
            k = len({c['aid'] for c in C if c['batch'] == b and f in c['kbfiles'].split('|')})
            line += '   %s %2d (%3.0f%%)' % (f, k, 100 * k / len(ids))
        w(line)
    w('')
    w('Gathering by what it read, per agent means: calls, bytes, ITE (a call naming several kinds is shared among them).')
    kinds = ['source', 'library', 'spec', 'tests', 'records', 'brief', 'kb', 'history', 'unnamed']
    for name, ids in groups[:2] + groups[-1:]:
        w('  %s:' % name)
        for k in kinds:
            w('    %-8s %5.1f calls  %6s bytes  %6s ITE' % (k, mean(ids, 'tg.%s.calls' % k), K(mean(ids, 'tg.%s.bytes' % k)),
                                                          K(mean(ids, 'tg.%s.ite' % k))))
    w('')
    w('Totals over all agents of the group: whole cost, gathering cost, FACTS/INDEX/maps cost, briefing cost (ITE and $ at list price).')
    for name, ids in groups[:2] + groups[-1:]:
        tier_usd = lambda i: USD[A[i]['tier']] / 1e6
        w('  %-14s n=%2d  whole %7s ($%.0f)  gathering %6s ($%.0f)  kb %5s  briefing %6s ($%.0f)' % (
            name, len(ids), K(tot(ids, 'total_ite')), sum(per[i]['total_ite'] * tier_usd(i) for i in ids),
            K(tot(ids, 'gather.ite')), sum(per[i]['gather.ite'] * tier_usd(i) for i in ids),
            K(tot(ids, 'kb.ite')), K(tot(ids, 'brief_ite')), sum(per[i]['brief_ite'] * tier_usd(i) for i in ids)))
    w('')
    w('Totals of the gathering calls: calls, result bytes, tokens written, tokens re-read from cache, ITE, tool and model hours;')
    w('and of the agents: wall hours, cache reads, whole cost; the accounting (prompt prefix, results and outputs, the rest).')
    for name, ids in groups[:2] + groups[-1:]:
        g = [c for c in C if c['aid'] in set(ids) and c['cat'] == 'gather']
        w('  %-14s %5d calls  %5.1f MB  %5.2fM tokens  %4.0fM re-read  %5.1fM ITE  tool %.1f h  model %.1f h | wall %.1f h  cache reads %4.0fM  whole %5.1fM | prefix %2.0f%%  results+outputs %2.0f%%  rest %2.0f%%' % (
            name, len(g), sum(float(c['bytes']) for c in g) / 1e6, sum(float(c['tokens']) for c in g) / 1e6,
            sum(float(c['cache_reads']) for c in g) / 1e6, sum(float(c['ite']) for c in g) / 1e6,
            sum(float(c['tool_s']) for c in g) / 3600, sum(float(c['gen_s']) for c in g) / 3600,
            tot(ids, 'wall_s') / 3600, tot(ids, 'tok_cr') / 1e6, tot(ids, 'total_ite') / 1e6,
            100 * tot(ids, 'prefix_ite') / tot(ids, 'total_ite'),
            100 * (tot(ids, 'total_ite') - tot(ids, 'prefix_ite') - sum(float(A[i]['other_ite']) for i in ids)) / tot(ids, 'total_ite'),
            100 * sum(float(A[i]['other_ite']) for i in ids) / tot(ids, 'total_ite')))
    for kind in ('rung', 'repair', 'skeptic'):
        ids = [i for i, a in A.items() if a['kind'] == kind]
        w('  %-14s %2d agents  whole %5.1fM  gathering %5.1fM  briefing %4.1fM' % (
            kind, len(ids), tot(ids, 'total_ite') / 1e6, tot(ids, 'gather.ite') / 1e6, tot(ids, 'brief_ite') / 1e6))
    w('')
    w('Per agent (batch, role, turns, gathering calls, gathering ITE, share, pre-edit share of gathering calls, kb calls, briefing ITE).')
    for aid, a in sorted(A.items(), key=lambda x: (x[1]['tier'], x[1]['batch'], x[1]['role'])):
        d = per[aid]
        w('  %-9s %-12s %-12s %4.0f turns  %4.0f g-calls  %6s g-ITE  %3.0f%%  pre %3.0f%%  kb %2.0f  brief %6s  %s' % (
            a['tier'], a['batch'], a['role'], d['turns'], d['gather.calls'], K(d['gather.ite']),
            100 * d['gather.ite'] / d['total_ite'], 100 * d['gpre.calls'] / max(1, d['gather.calls']), d['kb.calls'],
            K(d['brief_ite']), aid))
    open(os.path.join(HERE, 'summary.txt'), 'w').write('\n'.join(out) + '\n')
    print('\n'.join(out))


if __name__ == '__main__':
    main()
