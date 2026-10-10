import json,sys,re,collections
sys.path.insert(0,'.')
import classify as C
import importlib.util
ids={'N':'a3efce1e24bbeda39','G':'a17fa6c49e2058f77','W':'a67eeefc52d0d3403','C':'a0870bca7f79bbd8d'}
def tags(c,w):
    cmd=c['input'].get('command','') if c['tool']=='Bash' else ''
    if c['tool']=='Read' and re.search(r'scratchpad/brief\d*\.txt',c['input'].get('file_path','')): return ['BRIEFING']
    if c['tool']=='Bash':
        if re.search(r'subagents/workflows|agent-[0-9a-f]+\.jsonl|\.meta\.json',cmd): return ['TRANSCRIPT']
        if 'facts-extract' in cmd and (cmd.count('"')>=12 or '--part' in cmd): return ['BRIEFING']
        if re.search(r'cat\s+\S*scratchpad/brief\d*\.txt',cmd): return ['BRIEFING']
        if re.search(r'git\s+(diff|log|status)[^|;]*(9c9e823d5|\.\.\.HEAD|\.\.HEAD)|git\s+show\s+--stat|git\s+diff\s+--stat',cmd): return ['DIFF']
    return ['OTHER']
def isprobe(c):
    cmd=c['input'].get('command','') if c['tool']=='Bash' else ''
    return bool(re.search(r'bin/fortress|harness-one|junit\.sh|\bant\b|cat\s*>\s*\S+\.fss|\.fss\s*<<|seed-worktree',cmd))
rows=[]
for w,i in ids.items():
    d=json.load(open(f'json/{i}.json')); turns=d['turns']
    calls=[e for e in d['events'] if e['k']=='call']
    pr=next((c['n'] for c in calls if isprobe(c)),len(calls)+1)
    cls=collections.defaultdict(float)
    for c in calls:
        if c['n']>=pr: break
        for x in tags(c,w): cls[x]+=C.tok(c)
    last=[c for c in calls if c['n']<pr][-1]['turn']
    writes=sum(turns[k]['input']+turns[k]['cc'] for k in range(last+1))
    brief=0.425*len(d['brief'])
    rows.append((w,pr-1,writes,brief,cls))
print('| skeptic | calls before the first probe | writes | brief | briefing slice | the worker\'s transcript | the worker\'s diff | everything else |')
print('|---|---|---|---|---|---|---|---|')
for w,n,wr,b,c in rows:
    print('| %s | %d | %dK | %.0fK | %.1fK (%.1f%%) | %.1fK (%.1f%%) | %.1fK (%.1f%%) | %.1fK (%.1f%%) |'%(w,n,wr/1000,b/1000,c['BRIEFING']/1000,100*c['BRIEFING']/wr,c['TRANSCRIPT']/1000,100*c['TRANSCRIPT']/wr,c['DIFF']/1000,100*c['DIFF']/wr,c['OTHER']/1000,100*c['OTHER']/wr))
