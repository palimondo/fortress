"""Every tool call of batch N's gather, in order: its transcript line (1-based), time, tool, input size, result size, the command or path.
Writes gather_calls.tsv. Also every assistant text/thinking block's size."""
import json, sys
W = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_4ba3c084-2b3'
F = W + '/agent-a368e1e3b5dc1fb4a.jsonl'
L = [json.loads(l) for l in open(F)]
calls = {}; order = []; texts = []
ctx_by_msg = {}; msg_order = []
for i, o in enumerate(L):
    t = o.get('type')
    if t == 'assistant':
        m = o['message']; u = m.get('usage') or {}
        mid = m['id']
        if mid not in ctx_by_msg:
            ctx_by_msg[mid] = (i, o['timestamp'], u.get('input_tokens',0)+u.get('cache_creation_input_tokens',0)+u.get('cache_read_input_tokens',0))
            msg_order.append(mid)
        for b in m['content']:
            if b['type'] == 'tool_use':
                inp = b['input']
                calls[b['id']] = dict(line=i, ts=o['timestamp'], mid=mid, name=b['name'], inp=inp, insize=len(json.dumps(inp, ensure_ascii=False)), res=None, ressize=0)
                order.append(b['id'])
            elif b['type'] == 'text':
                texts.append((i, mid, 'text', len(b['text'])))
            elif b['type'] == 'thinking':
                texts.append((i, mid, 'thinking', len(b.get('thinking',''))))
    elif t == 'user':
        c = o['message']['content']
        if isinstance(c, list):
            for b in c:
                if b.get('type') == 'tool_result' and b['tool_use_id'] in calls:
                    cc = b.get('content')
                    s = cc if isinstance(cc, str) else ''.join(x.get('text','') for x in cc if isinstance(x, dict))
                    calls[b['tool_use_id']]['res'] = s
                    calls[b['tool_use_id']]['ressize'] = len(s)
                    calls[b['tool_use_id']]['resline'] = i
json.dump(dict(order=order, calls=calls, texts=texts, ctx=ctx_by_msg, msg_order=msg_order), open('gather_calls.json','w'))
with open('gather_calls.tsv','w') as f:
    for k in order:
        c = calls[k]
        cmd = c['inp'].get('command') or c['inp'].get('file_path') or c['inp'].get('pattern') or ''
        f.write('\t'.join([str(c['line'] + 1), c['ts'][11:19], c['name'], str(c['insize']), str(c['ressize']), cmd.replace('\n',' ')[:220]])+'\n')
print(len(order), 'calls;', len(msg_order), 'API calls')
