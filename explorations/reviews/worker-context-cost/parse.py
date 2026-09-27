"""Parse one agent transcript into turns, tool calls and between-turn chunks.

A turn is one API call: the records sharing one message id. Its usage is the
last record's; where that record has no stop_reason, the usage was written
from a streaming snapshot and its output_tokens is too low (60% of the
Opus 5.5 turns, 19% of the Opus 5 turns), which measure.py corrects for.
"""
import json, datetime

def ts(s):
    return datetime.datetime.fromisoformat(s.replace('Z', '+00:00')).timestamp()

def text_of(content):
    if content is None: return ''
    if isinstance(content, str): return content
    out = []
    for x in content:
        if isinstance(x, dict):
            if x.get('type') == 'text': out.append(x.get('text', ''))
            elif x.get('type') == 'image': out.append('[image]')
            else: out.append(json.dumps(x))
        else: out.append(str(x))
    return '\n'.join(out)

def parse(path):
    turns = []          # dicts: id, usage, t0, t1, calls[], out_text_bytes
    byid = {}
    calls = {}          # tool_use_id -> call dict
    order = []
    chunk_extra = {}    # turn index -> bytes of attachments/user text arriving before it
    compactions = []    # turn index at which a compaction happened
    first_user_ts = None
    cur = -1
    pending_extra = 0
    for line in open(path):
        r = json.loads(line)
        t = r.get('type')
        if t == 'assistant':
            m = r['message']; mid = m['id']
            if mid not in byid:
                cur = len(turns)
                tu = {'i': cur, 'id': mid, 'usage': m['usage'], 't0': ts(r['timestamp']), 't1': ts(r['timestamp']),
                      'calls': [], 'text_bytes': 0, 'extra_before': pending_extra, 'model': m.get('model')}
                pending_extra = 0
                turns.append(tu); byid[mid] = tu
            tu = byid[mid]
            tu['usage'] = m['usage']; tu['t1'] = ts(r['timestamp'])
            tu['final'] = m.get('stop_reason') is not None   # else the recorded output_tokens is a streaming snapshot
            for b in m['content']:
                if b['type'] == 'tool_use':
                    c = {'id': b['id'], 'name': b['name'], 'input': b['input'], 'turn': tu['i'],
                         't_call': ts(r['timestamp']), 't_res': None, 'bytes': 0, 'result': '', 'is_error': False,
                         'seq': len(order)}
                    calls[b['id']] = c; order.append(c); tu['calls'].append(c)
                    tu['text_bytes'] += len(json.dumps(b['input']).encode())
                elif b['type'] == 'text':
                    tu['text_bytes'] += len(b.get('text', '').encode())
        elif t == 'user':
            c = r['message']['content']
            if first_user_ts is None: first_user_ts = ts(r['timestamp'])
            if isinstance(c, list):
                for x in c:
                    if x.get('type') == 'tool_result' and x.get('tool_use_id') in calls:
                        cc = calls[x['tool_use_id']]
                        txt = text_of(x.get('content'))
                        cc['t_res'] = ts(r['timestamp']); cc['bytes'] = len(txt.encode()); cc['result'] = txt
                        cc['is_error'] = bool(x.get('is_error'))
                    else:
                        pending_extra += len(text_of([x]).encode())
            else:
                pending_extra += len(c.encode())
        elif t == 'attachment':
            for x in r.get('rendered', []) or []:
                pending_extra += len(str(x.get('content', '')).encode())
        elif t == 'system' and r.get('subtype') == 'compact_boundary':
            compactions.append(len(turns))
    for tu in turns:
        u = tu['usage']
        tu['ctx'] = u['input_tokens'] + u['cache_creation_input_tokens'] + u['cache_read_input_tokens']
        tu['out'] = u['output_tokens']
        tu['think'] = (u.get('output_tokens_details') or {}).get('thinking_tokens', 0)
    return {'turns': turns, 'calls': order, 'compactions': compactions, 't_start': first_user_ts}
