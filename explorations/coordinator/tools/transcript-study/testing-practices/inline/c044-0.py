import pickle,re
allr=pickle.load(open('all.pkl','rb'))
def find(tag,label,pat,ctx=0,w=500):
    for aid,a in allr[tag].items():
        if a['label']!=label: continue
        idx=[c for c in a['calls'] if c['name']=='Bash' and c['res'] and re.search(pat,c['res'])]
        print('###',tag,label,aid[:6],'matches',len(idx))
        for c in idx[:12]:
            cm=re.sub(r'\s+',' ',c['input'].get('command',''))
            m=re.search(pat,c['res'])
            s=max(0,m.start()-150)
            print(f"[{c['i']} {c['ts'][11:19]}] {cm[:260]}\n    -> ...{re.sub(chr(10),' ',c['res'][s:s+w])}")
find('b8','rung:I','Unable to read serialized|relink')
