import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
for pat in [r'cache0',r'nativewrapper_cache',r'rm -rf[^\n]*default_repository/caches',r'find[^\n]*caches[^\n]*-exec rm',r'git checkout[^\n]*global\.map',r'bin/fortress_classpath',r'FORTRESS_SOURCE_PATH',r'-Dfortress\.caches',r'FORTRESS_CACHES',r'ant\s+[^\n|;]*-D']:
    who=collections.Counter()
    for tag,ag in allr.items():
        for aid,a in ag.items():
            role=a['label'].split(':')[0]
            for c in a['calls']:
                if c['name']=='Bash' and re.search(pat,c['input'].get('command','')) and not re.match(r'\s*(cat|sed -n|head|grep)\b',c['input'].get('command','')):
                    who[(tag,role)]+=1; break
    print(pat, sum(who.values()), dict(who))
