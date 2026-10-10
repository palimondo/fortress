#!/usr/bin/env python3 -I
import json,sys,re,collections
sys.path.insert(0,'.')
import classify as C
ids={'N':'a3efce1e24bbeda39','G':'a17fa6c49e2058f77','W':'a67eeefc52d0d3403','C':'a0870bca7f79bbd8d'}
def tags(c,w):
    cmd=c['input'].get('command','') if c['tool']=='Bash' else ''
    if c['tool']=='Bash':
        if re.search(r'subagents/workflows|agent-[0-9a-f]+\.jsonl|\.meta\.json',cmd): return ['TRANSCRIPT']
        if 'facts-extract' in cmd and (cmd.count('"')>=12 or '--part' in cmd): return ['BRIEFING']
        if re.search(r'cat\s+\S*scratchpad/brief\d*\.txt',cmd): return ['BRIEFING']
        if re.search(r'git\s+(diff|log|status)[^|;]*(9c9e823d5|\.\.\.HEAD|\.\.HEAD)|git\s+show\s+--stat|git\s+diff\s+--stat',cmd): return ['DIFF']
    t=C.classify(c,C.ROOTS[w])
    return t
def isprobe(c):
    cmd=c['input'].get('command','') if c['tool']=='Bash' else ''
    return bool(re.search(r'bin/fortress|harness-one|junit\.sh|\bant\b|cat\s*>\s*\S+\.fss|\.fss\s*<<|seed-worktree',cmd))
for w,i in ids.items():
    d=json.load(open(f'json/{i}.json')); turns=d['turns']
    calls=[e for e in d['events'] if e['k']=='call']
    pr=next((c['n'] for c in calls if isprobe(c)),len(calls)+1)
    cls=collections.defaultdict(lambda:[0,0.0,0.0])
    for c in calls:
        if c['n']>=pr: break
        tg=tags(c,w); tg=list(dict.fromkeys(tg))
        if 'EDIT' in tg: tg=['EDIT']
        if len(tg)>1: tg=[x for x in tg if x not in('GIT','RUN')] or tg
        t=C.tok(c)
        for x in tg:
            cls[x][0]+=1/len(tg); cls[x][1]+=c['rbytes']/len(tg); cls[x][2]+=t/len(tg)
    last=[c for c in calls if c['n']<pr][-1]['turn']
    writes=sum(turns[k]['input']+turns[k]['cc'] for k in range(last+1))
    totw=sum(t['input']+t['cc'] for t in turns)
    print(f'== skeptic {w}: first probe at call {pr} of {len(calls)}; window writes {writes/1000:.0f}K of {totw/1000:.0f}K total; brief {len(d["brief"])} chars (~{0.425*len(d["brief"])/1000:.0f}K tok)')
    for k,v in sorted(cls.items(),key=lambda kv:-kv[1][2]):
        print(f'   {k:10s} calls {v[0]:5.1f}  bytes {v[1]:8.0f}  tokens {v[2]/1000:5.1f}K  {100*v[2]/writes:4.1f}% of window writes')
