import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
pats={'nospace':r'No space left on device','disk_guard':r'disk free|disk_guard|DISK','JTO':r'JAVA_TOOL_OPTIONS|Picked up JAVA_TOOL_OPTIONS','OOM':r'java\.lang\.OutOfMemoryError|StackOverflowError','Killed':r'\bKilled\b','timeout124':r'rc=124|exit=124|EXIT=124','too many procs':r'Cannot allocate memory|fork: retry'}
for k,p in pats.items():
    hits=[]
    for tag,ag in allr.items():
        for aid,a in ag.items():
            for c in a['calls']:
                if c['name']=='Bash' and c['res'] and re.search(p,c['res']):
                    hits.append((tag,a['label'],c['i']))
    print(k,len(hits),hits[:12])
