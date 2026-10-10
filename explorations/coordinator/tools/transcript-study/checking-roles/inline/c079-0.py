import pickle,re
A=pickle.load(open('agents.pkl','rb'))
for a in A.values():
    if a['batch']==10 and a['label'] in('skeptic:N','judge:N'):
        for k,t in enumerate(a['turns']):
            for c in t['calls']:
                s=(c['input'].get('command') or '')+c['input'].get('file_path','')
                if 'SKEPTIC.md' in s or 'JUDGE.md' in s:
                    print(a['label'],k,c['name'],s[:140].replace('\n',' '),'->',c['text'][:160].replace('\n',' '))
        # last turn text
        print(a['label'],'last turn textchars',a['turns'][-1]['textchars'])
