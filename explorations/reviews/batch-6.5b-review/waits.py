"""Every wait of more than two minutes between an agent's tool call and its result, for every agent of
climb batch 6.5b (wf_07b95462-a7d), with the command that waited. A long wait is either a long command
(a build, a test pass) or a permission prompt; the command says which. python3 waits.py > waits.txt"""
import json, datetime, os
W = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_07b95462-a7d'
labels = {}; order = []
for l in open(W + '/journal.jsonl'):
    o = json.loads(l)
    if o.get('type') == 'started':
        labels[o['agentId']] = o['label']; order.append(o['agentId'])
t = lambda s: datetime.datetime.fromisoformat(s.replace('Z', '+00:00'))
for aid in order:
    f = f'{W}/agent-{aid}.jsonl'
    if not os.path.exists(f): continue
    calls = {}
    for l in open(f):
        o = json.loads(l)
        if o.get('type') == 'assistant':
            for b in o['message']['content']:
                if b['type'] == 'tool_use':
                    calls[b['id']] = (o['timestamp'], b['name'], json.dumps(b['input'])[:150])
        elif o.get('type') == 'user' and isinstance(o['message']['content'], list):
            for b in o['message']['content']:
                if b.get('type') == 'tool_result' and b['tool_use_id'] in calls:
                    ts, name, inp = calls.pop(b['tool_use_id'])
                    d = (t(o['timestamp']) - t(ts)).total_seconds()
                    if d > 120:
                        print('%-14s %s -> %s %6.1f min  %s %s' % (labels[aid], ts[11:19], o['timestamp'][11:19], d / 60, name, inp))
