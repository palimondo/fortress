import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
cnt=collections.defaultdict(lambda: collections.Counter())
ex=[]
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        for c in a['calls']:
            if c['name']!='Bash' or not c['res']: continue
            r=c['res']
            if 'Picked up JAVA_TOOL_OPTIONS' in r: cnt[(tag,role)]['JTO']+=1; 
            if 'Guessing FORTRESS_HOME' in r: cnt[(tag,role)]['guess']+=1; ex.append((tag,a['label'],c['i'],re.sub(r'\s+',' ',c['input'].get('command',''))[:150]))
for k,v in sorted(cnt.items()): print(k,dict(v))
print(len(ex)); 
for e in ex[:25]: print(e)
