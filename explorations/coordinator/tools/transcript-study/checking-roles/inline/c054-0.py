import pickle,collections,re
A=pickle.load(open('agents.pkl','rb'))
stat=collections.defaultdict(lambda:[0,0,0,0,0])
for aid,a in A.items():
    if a['batch']!=10: continue
    role=a['label'].split(':')[0]
    for t in a['turns']:
        for c in t['calls']:
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            s=stat[role]; s[0]+=1
            if re.search(r'JAVA_HOME|FORTRESS_HOME|env\.sh|JAVA_FLAGS|FORTRESS_THREADS|TMPDIR',cmd):
                s[1]+=1
                for ln in cmd.split('\n'):
                    if re.search(r'JAVA_HOME|FORTRESS_HOME|env\.sh|JAVA_FLAGS|FORTRESS_THREADS|TMPDIR|unset JAVA_TOOL',ln): s[2]+=len(ln)
            if re.search(r'^cd [^\n&]*&& ',cmd): s[3]+=1
            if re.search(r'bin/fortress|harness-one|junit',cmd): s[4]+=1
n={'rung':4,'skeptic':4,'judge':3,'repair':3,'skeptic2':3,'gather':1,'gate':1,'review':1,'commit':1}
for r,s in stat.items():
    print(r,'bash calls',s[0],'with env setup',s[1],'setup chars',s[2],'= ~%.1fK tokens per agent'%(s[2]*0.4/n[r]/1000),'| runs of fortress/harness',s[4])
