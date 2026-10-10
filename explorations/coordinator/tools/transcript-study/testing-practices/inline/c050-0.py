import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for tag,ag in allr.items():
    for aid,a in ag.items():
        calls=a['calls']
        for k,c in enumerate(calls):
            if c['name']=='Bash' and c['res'] and 'denied by a built-in Claude Code safety check' in c['res']:
                cm=re.sub(r'\s+',' ',c['input'].get('command',''))
                m=re.search(r'What was flagged:(.{0,300})',c['res'].replace('\n',' '))
                print(f"## {tag} {a['label']} [{c['i']}] {cm[:420]}")
                print('   FLAG:',m.group(1)[:250] if m else '')
                # next 2 calls
                for d in calls[k+1:k+3]:
                    if d['name']=='Bash':
                        print('   NEXT[%d]:'%d['i'],re.sub(r'\s+',' ',d['input'].get('command',''))[:260])
                    elif d['name']=='TEXT':
                        print('   NEXT TEXT:',d['input']['text'][:200])
