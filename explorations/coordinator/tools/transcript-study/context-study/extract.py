#!/usr/bin/env python3 -I
"""Extract per-agent event lists from a batch transcript.

Usage: extract.py AGENT_JSONL OUT_JSON
Output JSON: {"brief": str, "events": [...], "turns": [...]}
 event: {"k":"call","n":int,"ts":str,"turn":int,"tool":str,"input":obj,"res":str,"rbytes":int}
        {"k":"text","ts":str,"turn":int,"text":str}
 turn:  {"i":int,"id":str,"ts":str,"input":int,"cc":int,"cr":int,"out":int}
"""
import json, sys

def res_text(c):
    if isinstance(c, str):
        return c
    out = []
    for x in c:
        if isinstance(x, dict):
            if x.get('type') == 'text':
                out.append(x.get('text', ''))
            else:
                out.append('[%s]' % x.get('type'))
        else:
            out.append(str(x))
    return '\n'.join(out)

def main(src, dst):
    recs = [json.loads(l) for l in open(src) if l.strip()]
    brief = None
    events = []
    turns = []
    turn_by_id = {}
    calls_by_use = {}
    n = 0
    for d in recs:
        t = d['type']
        ts = d.get('timestamp', '')
        if t == 'user':
            m = d['message']
            c = m['content']
            if isinstance(c, str):
                if brief is None:
                    brief = c
                continue
            for b in c:
                if b.get('type') == 'tool_result':
                    ev = calls_by_use.get(b['tool_use_id'])
                    if ev is not None:
                        txt = res_text(b['content'])
                        ev['res'] = txt
                        ev['rbytes'] = len(txt.encode('utf-8'))
                        ev['rts'] = ts
                elif b.get('type') == 'text' and brief is None:
                    brief = b['text']
        elif t == 'assistant':
            m = d['message']
            mid = m.get('id')
            u = m.get('usage') or {}
            if mid not in turn_by_id:
                turn_by_id[mid] = len(turns)
                turns.append({'i': len(turns), 'id': mid, 'ts': ts})
            tr = turns[turn_by_id[mid]]
            tr.update({'input': u.get('input_tokens', 0),
                       'cc': u.get('cache_creation_input_tokens', 0),
                       'cr': u.get('cache_read_input_tokens', 0),
                       'out': u.get('output_tokens', 0)})
            for b in m['content']:
                if b.get('type') == 'text':
                    events.append({'k': 'text', 'ts': ts, 'turn': tr['i'], 'text': b['text']})
                elif b.get('type') == 'tool_use':
                    n += 1
                    ev = {'k': 'call', 'n': n, 'ts': ts, 'turn': tr['i'], 'tool': b['name'],
                          'input': b['input'], 'res': '', 'rbytes': 0}
                    events.append(ev)
                    calls_by_use[b['id']] = ev
    json.dump({'brief': brief, 'events': events, 'turns': turns}, open(dst, 'w'))
    print(src.split('/')[-1], 'calls', n, 'turns', len(turns))

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
