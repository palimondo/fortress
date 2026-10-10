import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for tag in ['b8','b9','b10']:
    for aid,a in allr[tag].items():
        runs=[c for c in a['calls'] if c['name']=='Bash' and 'harness-one.sh' in c['input'].get('command','') and not re.match(r'\s*(cat|sed|head|grep|ls|cp)\b',c['input'].get('command','')) and c['res'] and ('# harness-one' in c['res'] or 'does not exist' in c['res'] or 'OK (' in c['res'])]
        if runs:
            first=runs[0]
            bad='tests does not exist' in first['res']
            nbad=sum(1 for c in runs if 'tests does not exist' in c['res'])
            print(tag,a['label'],aid[:6],'runs',len(runs),'first failed:',bad,'failed total',nbad)
