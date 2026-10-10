import pickle,re
allr=pickle.load(open('all.pkl','rb'))
a=allr['b10']['a9d085d2ca3d1673f']
for c in a['calls']:
    if 165<=c['i']<=236 and c['name'] in('Bash','TEXT'):
        if c['name']=='TEXT':
            print(f"TEXT[{c['i']}]",c['input']['text'][:500]); continue
        cm=re.sub(r'\s+',' ',c['input'].get('command',''))
        res=re.sub(r'\s+',' ',c['res'] or '')
        print(f"[{c['i']} {c['ts'][11:19]}{' ERR' if c['err'] else ''}] {cm[:700]}\n    -> {res[:500]}{' ... '+res[-300:] if len(res)>800 else ''}")
