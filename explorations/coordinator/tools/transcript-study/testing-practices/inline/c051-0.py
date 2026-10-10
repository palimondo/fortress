import pickle,re
allr=pickle.load(open('all.pkl','rb'))
def find(tag,label,pat,w=420,maxn=8,pre=150):
    for aid,a in allr[tag].items():
        if a['label']!=label: continue
        idx=[c for c in a['calls'] if c['name']=='Bash' and c['res'] and re.search(pat,c['res'])]
        print('###',tag,label,aid[:6],'matches',len(idx))
        for c in idx[:maxn]:
            cm=re.sub(r'\s+',' ',c['input'].get('command',''))
            m=re.search(pat,c['res'])
            s=max(0,m.start()-pre)
            print(f"[{c['i']} {c['ts'][11:19]}] {cm[:300]}\n    -> ...{re.sub(chr(10),' ',c['res'][s:s+w])}")
find('b8','skeptic2:Q','NoSuchMethodError')
find('b9','repair:W','NoSuchMethodError',maxn=6)
