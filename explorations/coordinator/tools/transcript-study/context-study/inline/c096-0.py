import re,os,collections
idx=open('explorations/coordinator/INDEX.md').read().split('\n')
files=[]
for l in idx:
    m=re.match(r'^\d*:?\s*-?\s*`([^`]+)`',l)
    m=re.search(r'`(explorations/[^`]+)`',l)
    if l.startswith('- ') and m:
        files.append(m.group(1))
print('index lines naming a file',len(files))
tot=0;ex=0;miss=[]
sizes={}
for f in files:
    if os.path.isfile(f):
        s=os.path.getsize(f); tot+=s; ex+=1; sizes[f]=s
    elif os.path.isdir(f):
        s=sum(os.path.getsize(os.path.join(dp,fn)) for dp,dn,fns in os.walk(f) for fn in fns); tot+=s; ex+=1; sizes[f]=s
    else: miss.append(f)
print('exist',ex,'bytes',tot,'tokens@0.41',int(tot*0.41/1000),'K; missing',len(miss))
big=sorted(sizes.items(),key=lambda kv:-kv[1])[:8]
for f,s in big: print('  ',s,f)
# all md under explorations
allmd=[]
for dp,dn,fns in os.walk('explorations'):
    for fn in fns:
        if fn.endswith('.md'): allmd.append(os.path.join(dp,fn))
tb=sum(os.path.getsize(f) for f in allmd)
print('all md under explorations',len(allmd),'bytes',tb,'tokens@0.41',int(tb*0.41/1000),'K')
cat=collections.Counter(); catn=collections.Counter()
for f in allmd:
    parts=f.split('/')
    k='/'.join(parts[:3]) if parts[1] in('compile-ladder','coordinator','reviews') else parts[1]
    cat[k]+=os.path.getsize(f); catn[k]+=1
for k,v in cat.most_common(12): print('  ',k,catn[k],v)
rung=[f for f in allmd if re.match(r'explorations/compile-ladder/rung-',f)]
print('rung dirs md files',len(rung),sum(os.path.getsize(f) for f in rung))
rr=[f for f in rung if f.endswith('REPORT.md')]
print('REPORT.md of rungs',len(rr),sum(os.path.getsize(f) for f in rr))
for f in ('explorations/coordinator/FACTS.md','explorations/coordinator/POSITIONS.md','explorations/coordinator/INDEX.md','explorations/fortress-gap-ledger.md','explorations/coordinator/PLAN.md','explorations/compile-ladder/climb-batch-10/RECORD.md','explorations/reviews/batch-10-review.md','explorations/coordinator/CLIMB-BATCH-10.md'):
    print(f, os.path.getsize(f))
