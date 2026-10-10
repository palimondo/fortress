import pickle,re
A=pickle.load(open('agents.pkl','rb'))
for a in A.values():
    if a['batch']!=10: continue
    for t in a['turns']:
        for c in t['calls']:
            cmd=(c['input'].get('command') or c['input'].get('file_path') or '')
            if c['rbytes']>30000 and a['label'].split(':')[0] in('skeptic','judge','skeptic2'):
                print(a['label'],c['rbytes'],cmd[:150].replace('\n',' '))
            if re.search(r'(cat|Read).*(FACTS|INDEX|POSITIONS)\.md',cmd) and not re.search(r'sed|grep|head|tail|awk',cmd) and a['label'].split(':')[0] in('skeptic','judge','skeptic2'):
                print('WHOLE?',a['label'],cmd[:120])
