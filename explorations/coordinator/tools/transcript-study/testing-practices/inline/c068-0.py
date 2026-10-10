import pickle,re
allr=pickle.load(open('all.pkl','rb'))
sel=[('b8','rung:Q',36),('b8','rung:Q',158),('b8','skeptic:M',71),('b9','rung:S',83),('b10','rung:N',61),('b10','rung:N',62)]
for tag,lab,i in sel:
    for aid,a in allr[tag].items():
        if a['label']!=lab: continue
        for k,c in enumerate(a['calls']):
            if c['i']==i:
                cm=re.sub(r'\s+',' ',c['input'].get('command',''))
                res=re.sub(r'\s+',' ',c['res'] or '')
                m=re.search(r'OutOfMemoryError|StackOverflowError',res)
                print(f"## {tag} {lab} [{i}] {cm[:300]}\n   -> ...{res[max(0,m.start()-200):m.start()+200]}")
                nxt=[d for d in a['calls'][k+1:k+3]]
                for d in nxt:
                    if d['name']=='TEXT': print('   TEXT:',d['input']['text'][:250])
                    elif d['name']=='Bash': print('   NEXT:',re.sub(r'\s+',' ',d['input'].get('command',''))[:250])
