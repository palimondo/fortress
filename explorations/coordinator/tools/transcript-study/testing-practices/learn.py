import pickle,re,collections,sys
sys.argv=['x']
exec(open('cost.py').read().split("res=collections.defaultdict")[0])
ART=[('harness-one.sh',r'harness-one\.sh'),('junit.sh',r'merged-tests/junit\.sh'),('env.sh',r'experiment/env\.sh'),('checker-count/run.sh',r'checker-count/run\.sh'),('distance/run.sh (+DistanceMulti,classify)',r'distance/run\.sh|DistanceMulti|classify\.py|report\.py'),('ladder run-subset/run-ladder',r'run-subset\.sh|run-ladder\.sh'),('build.xml',r'build\.xml'),('FileTests/SystemJUTest/CompilerJUTest',r'FileTests\.java|SystemJUTest|CompilerJUTest'),('Shell.java',r'Shell\.java'),('bin/fortress script',r'bin/fortress\b'),('repo-internals / build-cache-exploration',r'repo-internals|build-cache-exploration'),('ProjectProperties',r'ProjectProperties'),('seed/old-fortress',r'seed-worktree|old-fortress'),('count-run',r'count-run')]
agg=collections.defaultdict(lambda:[0,0.0,set(),collections.defaultdict(set)])
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','gather','review','commit'): pass
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            if classify(cmd)!='learn-by-reading': continue
            parts=re.split(r'&&|;',cmd)
            matched=set()
            for p in parts:
                if re.match(r'\s*(cd [^;&]*&&\s*)?(cat|sed -n|head|tail|grep|ls|wc|less)\b',p):
                    for n,r in ART:
                        if re.search(r,p): matched.add(n)
            if not matched: matched={'(other)'}
            cost=call_cost(a,k)/len(matched)
            for n in matched:
                e=agg[n]; e[0]+=1; e[1]+=cost; e[2].add((tag,aid)); e[3][role].add((tag,aid))
for n,e in sorted(agg.items(),key=lambda x:-x[1][1]):
    byrole={r:len(s) for r,s in e[3].items()}
    print(f'{n:45s} calls={e[0]:3d} agents={len(e[2]):3d} ITE={e[1]/1e3:6.0f}K  {byrole}')
print('total', sum(e[1] for e in agg.values())/1e6,'M', sum(e[0] for e in agg.values()))
