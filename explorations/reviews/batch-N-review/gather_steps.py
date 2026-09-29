"""Per API call of the gather before its compaction: the context it read (input+cache), the delta to the next call,
and what the step added: the assistant's visible output (tool inputs, text), its tool results, attachments."""
import json
W = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_4ba3c084-2b3'
F = W + '/agent-a368e1e3b5dc1fb4a.jsonl'
L = [json.loads(l) for l in open(F)]
steps = []   # one per unique assistant message id
cur = None
for i, o in enumerate(L):
    t = o.get('type')
    if t == 'system' and o.get('subtype') == 'compact_boundary':
        steps.append(dict(boundary=True, line=i)); cur = None; continue
    if t == 'assistant':
        m = o['message']; u = m.get('usage') or {}
        if cur is None or cur['mid'] != m['id']:
            cur = dict(mid=m['id'], line=i, ts=o['timestamp'], ctx=u.get('input_tokens',0)+u.get('cache_creation_input_tokens',0)+u.get('cache_read_input_tokens',0),
                       out_chars=0, think_blocks=0, res_chars=0, att_chars=0, tools=[])
            steps.append(cur)
        for b in m['content']:
            if b['type'] == 'tool_use':
                cur['out_chars'] += len(json.dumps(b['input'], ensure_ascii=False)); cur['tools'].append(b['id'])
            elif b['type'] == 'text':
                cur['out_chars'] += len(b['text'])
            elif b['type'] == 'thinking':
                cur['think_blocks'] += 1
    elif t == 'user' and cur is not None:
        c = o['message']['content']
        if isinstance(c, list):
            for b in c:
                if b.get('type') == 'tool_result':
                    cc = b.get('content'); s = cc if isinstance(cc, str) else ''.join(x.get('text','') for x in cc if isinstance(x, dict))
                    cur['res_chars'] += len(s)
    elif t == 'attachment' and cur is not None:
        cur['att_chars'] += len(json.dumps(o.get('attachment', {}), ensure_ascii=False))
# deltas
seq = [s for s in steps]
for k in range(len(seq)-1):
    a, b = seq[k], seq[k+1]
    if a.get('boundary') or b.get('boundary'): continue
    a['delta'] = b['ctx'] - a['ctx']
json.dump(seq, open('gather_steps.json', 'w'))
pre = [s for s in seq if not s.get('boundary') and s['line'] < 973]
print('pre steps', len(pre), 'first ctx', pre[0]['ctx'], 'last ctx', pre[-1]['ctx'])
# fit
import itertools
rows = [(s['delta'], s['res_chars'], s['out_chars']) for s in pre if 'delta' in s]
n = len(rows)
# least squares delta = a*R + b*A + c
import statistics
def solve(rows):
    # normal equations 3x3
    X = [[r[1], r[2], 1.0] for r in rows]; y = [r[0] for r in rows]
    XtX = [[sum(X[i][p]*X[i][q] for i in range(len(X))) for q in range(3)] for p in range(3)]
    Xty = [sum(X[i][p]*y[i] for i in range(len(X))) for p in range(3)]
    # gaussian elimination
    M = [XtX[p]+[Xty[p]] for p in range(3)]
    for p in range(3):
        piv = M[p][p]
        for q in range(p, 4): M[p][q] /= piv
        for r in range(3):
            if r != p:
                f = M[r][p]
                for q in range(p, 4): M[r][q] -= f*M[p][q]
    return [M[p][3] for p in range(3)]
print('fit a (per result char), b (per output char), c (per step):', solve(rows))
print('sum deltas', sum(r[0] for r in rows), 'sum R chars', sum(r[1] for r in rows), 'sum A chars', sum(r[2] for r in rows))
