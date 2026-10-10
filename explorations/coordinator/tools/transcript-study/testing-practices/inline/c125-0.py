import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for aid,a in allr['b8'].items():
    if a['label'] in('rung:I','rung:O'):
        for c in a['calls']:
            if c['name']=='Bash' and c['res'] and re.search(r'FAILURES!!!|Tests run: \d+,\s+Failures: [1-9]|^OK \(\d+ tests\)',c['res'],re.M) and re.search(r'tracks',c['input'].get('command','')+c['res'][:200]):
                r=re.sub(r'\s+',' ',c['res'])
                m=re.search(r'(FAILURES!!!.{0,200}|OK \(\d+ tests\).{0,100})',r)
                print(a['label'],c['i'],c['ts'][11:19],re.sub(r'\s+',' ',c['input']['command'])[:90],'->',m.group(0)[:260] if m else '')
