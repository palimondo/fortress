import re,collections
t=open('explorations/coordinator/process-engineering/context-study.md').read()
sec=t[t.index('### The sample of facts'):t.index('### The five clearest cases')]
c=collections.Counter(); per=collections.defaultdict(collections.Counter); cur=None
for l in sec.split('\n'):
    m=re.match(r'\*\*([WNGC])\*\* \(',l)
    if m: cur=m.group(1)
    if l.startswith('|') and not l.startswith('|---') and not l.startswith('| calls'):
        v=l.rstrip('|').split('|')[-1].strip()
        v=v.split(',')[0]
        c[v]+=1; per[cur][v]+=1
print(c, {k:dict(v) for k,v in per.items()})
