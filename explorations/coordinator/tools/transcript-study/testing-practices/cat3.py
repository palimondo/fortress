import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
arts={
 'harness-one.sh':r'harness-one\.sh',
 'junit.sh':r'merged-tests/junit\.sh',
 'env.sh':r'experiment/env\.sh',
 'checker-count/run.sh':r'checker-count/run\.sh',
 'distance/run.sh':r'distance/run\.sh',
 'run-subset/ladder':r'run-subset\.sh|run-ladder\.sh',
 'build.xml':r'build\.xml',
 'FileTests.java':r'FileTests\.java',
 'bin/fortress':r'bin/fortress\b(?!\s+(compile|run|junit|typecheck|link|-))\s*$|cat[^|;]*bin/fortress\b|sed[^|;]*bin/fortress\b|head[^|;]*bin/fortress\b',
 'Shell.java':r'Shell\.java',
 'repo-internals':r'repo-internals\.md',
 'build-cache-expl':r'build-cache-exploration\.md',
 'ProjectProperties':r'ProjectProperties',
 'seed-worktree.sh':r'seed-worktree\.sh',
 'old-fortress.sh':r'old-fortress\.sh',
 'map/':r'coordinator/map/',
}
rd=re.compile(r'^\s*(cd [^;&]*&&\s*)?(cat|sed -n|head|tail|less|grep|ls)\b')
def isread(cmd):
    # read-type: commands that are cat/sed -n/head/grep on the artifact (not executing it)
    return bool(re.search(r'\b(cat|sed -n|head|tail|grep|ls|wc)\b',cmd))
rx={k:re.compile(v) for k,v in arts.items()}
for tag,ag in allr.items():
    print('==',tag,list(arts))
    for aid,a in ag.items():
        cnt=collections.Counter()
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                for k,r in rx.items():
                    if r.search(cmd):
                        # a read: command starts with cat/sed/head/grep... that names the artifact
                        parts=re.split(r'&&|;|\|\|',cmd)
                        for p in parts:
                            if r.search(p) and re.match(r'\s*(cat|sed -n|head|tail|grep|ls|wc|less)\b',p):
                                cnt[k]+=1;break
            elif c['name']=='Read':
                fp=c['input'].get('file_path','')
                for k,r in rx.items():
                    if r.search(fp): cnt[k]+=1
            elif c['name'] in('Grep',):
                pass
        lab=a['label']
        if lab.split(':')[0] in ('gather','review','commit','judge','gate'): continue
        print(f'{lab:14s}',' '.join(f'{cnt[k]:3d}' for k in arts))
