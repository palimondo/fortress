"""Every agent of batch N's first run (wf_4ba3c084-2b3), from its journal and transcript: label, start and end,
API calls, the context at its last turn and at its peak (input + cache read + cache write, the harness's count),
and the tokens read across all its turns (the sum of those contexts). Writes run_agents.tsv."""
import json, glob, os, datetime
W = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_4ba3c084-2b3'
labels = {}; order = []
for l in open(W + '/journal.jsonl'):
    o = json.loads(l)
    if o.get('type') == 'started':
        labels[o['agentId']] = o['label']; order.append(o['agentId'])
def t(s): return datetime.datetime.fromisoformat(s.replace('Z', '+00:00'))
rows = []
for aid in order:
    f = f'{W}/agent-{aid}.jsonl'
    if not os.path.exists(f): continue
    seen = set(); ctxs = []; ts = []; comp = 0
    for l in open(f):
        o = json.loads(l)
        if o.get('timestamp'): ts.append(o['timestamp'])
        if o.get('type') == 'system' and o.get('subtype') == 'compact_boundary': comp += 1
        if o.get('type') == 'assistant':
            m = o['message']; u = m.get('usage')
            if u and m['id'] not in seen:
                seen.add(m['id']); ctxs.append(u['input_tokens'] + u['cache_creation_input_tokens'] + u['cache_read_input_tokens'])
    rows.append(dict(label=labels[aid], aid=aid, start=min(ts)[11:19], end=max(ts)[11:19],
                     minutes=round((t(max(ts)) - t(min(ts))).total_seconds() / 60, 1), calls=len(ctxs),
                     last=ctxs[-1], peak=max(ctxs), read=sum(ctxs), compactions=comp))
with open('run_agents.tsv', 'w') as f:
    f.write('\t'.join(rows[0].keys()) + '\n')
    for r in rows: f.write('\t'.join(str(v) for v in r.values()) + '\n')
for r in rows: print('\t'.join(str(v) for v in r.values()))
print('agents', len(rows), 'sum last', sum(r['last'] for r in rows), 'sum peak', sum(r['peak'] for r in rows), 'sum read', sum(r['read'] for r in rows))
