import pickle,re
A=pickle.load(open('agents.pkl','rb'))
for aid,a in sorted(A.items(),key=lambda x:x[1]['label']):
    if a['batch']!=10: continue
    for t in a['turns']:
        for c in t['calls']:
            fp=c['input'].get('file_path','') if c['name'] in('Write','Edit') else ''
            if re.search(r'(REPORT|SKEPTIC|JUDGE|record)[\w.-]*\.md$',fp):
                print(a['label'],c['name'],fp.split('/')[-2:], 'err' if c['err'] else 'ok', c['text'][:130].replace('\n',' '))
