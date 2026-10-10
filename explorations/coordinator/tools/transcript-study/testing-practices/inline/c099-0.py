import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for aid,a in allr['b8'].items():
    if a['label'] not in('rung:Q',): continue
    for c in a['calls']:
        if c['name']=='Bash' and re.search(r'count-run|edit-pass|compare-normalised|compare3|compare2|compare\.txt',c['input'].get('command','')):
            cm=re.sub(r'\s+',' ',c['input'].get('command',''))
            res=re.sub(r'\s+',' ',c['res'] or '')
            print(f"[{c['i']} {c['ts'][11:19]}] {cm[:230]}\n    -> {res[:330]}")
