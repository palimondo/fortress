import pickle,re
allr=pickle.load(open('all.pkl','rb'))
n=0
for tag,ag in allr.items():
    for aid,a in ag.items():
        for k,c in enumerate(a['calls']):
            if c['name']=='Bash' and 'harness-one' in c['input'].get('command','') and c['res'] and ('does not exist' in c['res'] or 'No such file' in c['res'] or 'Not compiling' in c['res'] and 'OK (0 tests)' in c['res']):
                n+=1
                res=re.sub(r'\s+',' ',c['res'])
                m=re.search(r'(does not exist|No such file)',res)
                print(tag,a['label'],c['i'],re.sub(r'\s+',' ',c['input']['command'])[:200].replace('/home/user/',''),'\n    ->',res[max(0,m.start()-120):m.start()+100] if m else res[:200])
print(n)
