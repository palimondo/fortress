import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for tag in ['b8','b9','b10']:
    for aid,a in allr[tag].items():
        if not a['label'].startswith(('gate',)): continue
        for c in a['calls']:
            if c['name']=='Bash' and c['res'] and 'BUILD FAILED' in c['res']:
                r=re.sub(r'\s+',' ',c['res']); s=r.find('BUILD FAILED')
                print(tag,a['label'],c['i'],re.sub(r'\s+',' ',c['input'].get('command',''))[:160],'\n   ->',r[max(0,s-250):s+120])
