import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
tot=collections.Counter(); ex=[]
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            m=re.findall(r'wait_for\s+\S+\s+(\d+)',cmd)
            if not m: continue
            w=max(int(x) for x in m)
            to=c['input'].get('timeout')
            moved=bool(c['res'] and 'moved to the background' in c['res'])
            key=(tag, 'w>=120' if w>=120 else 'w<120', 'timeout-set' if to else 'no-timeout')
            tot[key]+=1
            tot[(tag,'moved')]+= moved
            if moved and len(ex)<3: ex.append((tag,a['label'],c['i'],w,to))
for k in sorted(tot): print(k,tot[k])
print(ex)
# count bg-moved events overall and what the agent did next
