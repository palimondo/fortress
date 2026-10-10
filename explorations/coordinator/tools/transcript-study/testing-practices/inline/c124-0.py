import pickle,re
allr=pickle.load(open('all.pkl','rb'))
seen=0
for tag in ['b8','b10']:
    for aid,a in allr[tag].items():
        for c in a['calls']:
            if c['name']=='Bash' and c['res'] and 'Blocked: sleep' in c['res']:
                print(tag,a['label'],c['i'],re.sub(r'\s+',' ',c['input']['command'])[:120]); print(c['res'][:700]); seen+=1; break
        if seen>=2: break
    if seen>=2: break
