"""For each of the run's 54 items for Pavol: the PLAN.md entry the agent that routed it named, and whether that
entry's opening words are in PLAN.md on main now."""
import json, re
W = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_4ba3c084-2b3'
plan = open('/home/user/fortress/explorations/coordinator/PLAN.md').read().split('\n')
strip = lambda s: re.sub(r'[`*]', '', s)
routed = {}
for l in open(W + '/journal.jsonl'):
    o = json.loads(l)
    r = o.get('result')
    if o.get('type') == 'result' and isinstance(r, dict) and r.get('pavolItems'):
        for x in r['pavolItems']:
            routed[x['id']] = (x.get('section'), x.get('entry'), o['agentId'])
items = json.load(open('/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/n-run1-forpavol.json'))
for it in items:
    i = it['id']; r = routed.get(i)
    if not r:
        print(i, '| routed by no agent | inPlan', it.get('inPlan')); continue
    key = strip(r[1] or '')[:40]
    hits = [n + 1 for n, l in enumerate(plan) if key and key in strip(l)]
    print(i, '|', r[0], '|', key, '| PLAN lines', hits)
