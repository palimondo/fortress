import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for tag,labels in [('b9',['rung:R','rung:S']),('b8',['rung:M','rung:Q','rung:O'])]:
    for aid,a in allr[tag].items():
        if a['label'] not in labels: continue
        print('###',tag,a['label'],aid[:6])
        for c in a['calls']:
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            if re.search(r'harness-one|walk[a-z0-9]*\.sh|check\.sh|SystemJUTest|run\.sh|helpers',cmd) and not re.match(r'\s*(cat|sed|head|grep|ls)\b',cmd):
                cm=re.sub(r'\s+',' ',cmd); res=re.sub(r'\s+',' ',c['res'] or '')
                print(f"  [{c['i']} {c['ts'][11:19]}] {cm[:330]}\n      -> {res[:260]} ... {res[-160:] if len(res)>420 else ''}")
