import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
pats={
 'Cannot find file':r'Cannot find file',
 'Could not find an implementation for API':r'Could not find an implementation',
 'Could not load X (after failed compile)':r'Could not load \S+\s*\n?\s*java\.lang\.ClassNotFoundException',
 'Blocked: sleep':r'Blocked: sleep',
 'moved to background':r'moved to the background',
 'git index.lock':r'index\.lock',
 'timeout rc124':r'rc=124|EXIT=124|exit=124',
 'No tests/ dir(harness)':r'tests does not exist',
 'permission':r'denied by a built-in',
 'nativewrapper/relink':r'nativewrapper',
 'Variable even already declared':r'is already declared',
 'ant: command/JAVA_HOME':r'JAVA_HOME is not set|ant: command not found|java: command not found',
}
cnt=collections.defaultdict(lambda: collections.defaultdict(set))
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']=='Bash' and c['res']:
                for k,p in pats.items():
                    if re.search(p,c['res']): cnt[k][tag].add(a['label']+aid[:4]) ; 
for k,v in cnt.items(): print(k,{t:len(s) for t,s in v.items()})
