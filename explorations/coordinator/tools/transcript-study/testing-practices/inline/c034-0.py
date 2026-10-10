import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for tag in ['b10']:
    for aid,a in allr[tag].items():
        if not a['label'].startswith(('rung','repair')): continue
        print('###',tag,a['label'])
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                if 'harness-one' in cmd and 'cat ' not in cmd[:20]:
                    cm=re.sub(r'\s+',' ',cmd)
                    res=re.sub(r'\s+',' ',c['res'] or '')
                    print(f"[{c['i']}] {cm[:420]}\n    -> {res[:260]} ... {res[-200:] if len(res)>460 else ''}")
