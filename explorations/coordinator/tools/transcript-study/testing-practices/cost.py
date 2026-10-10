import pickle,re,collections,datetime,sys,json
allr=pickle.load(open('all.pkl','rb'))
def ts(s): return datetime.datetime.fromisoformat(s.replace('Z','+00:00'))
RU_RE=r'harness-one|junit\.sh|checker-count|distance/|run-subset|run-ladder|microgpt-phase|count-run|devcheck|dev-check|DistanceMulti|classify\.py|report\.py|tracks\.sh|corpus\.sh|shard\.sh|SystemJUTest|CompilerJUTest'
RULES=[
 ('stage-run',  r'(checker-count/run\.sh|distance/run\.sh|run-subset\.sh|run-ladder\.sh|microgpt-phase\.(sh|py)|count-run\.sh|compare-normalised|devcheck|dev-check|DistanceMulti|distance/compare\.sh|classify\.py|ladder\.log|checker-count|dist-post|distance-post)'),
 ('suite-by-hand', r'(tracks\.sh|tracks/run\.sh|corpus\.sh|shard\.sh|run_track|SystemJUTest|CompilerJUTest|LibraryJUTest|OtherCompilerJUTest|/suite/|tracks3|tracks/|fastTrack|systemShard|\bant\b[^|;\n]*test(Fast|System|Only|Compiler|Library|OtherCompiler))'),
 ('harness-one', r'harness-one'),
 ('junit.sh',   r'junit\.sh|fortress junit|bin/fortress junit|junit-(base|edit|final|head)'),
 ('build',      r'\bant\b[^|;\n]*compileAll|compileAll[-.\w]*\.(log|txt)|global\.map|fortress compile[^\n&;]*(AnyType|CompilerBuiltin|CompilerLibrary|CompilerAlgebra|CompilerSystem)\.fss|libs?-?\d*\.log|libcache|library order'),
 ('seed/old-code', r'seed-worktree|worktree add|old-fortress|-base\b.*bin/fortress|fortress-[a-z0-9]+-base/'),
 ('probe-run',  r'(bin/fortress|\.\./fortress|\bfortress)\s+(compile|run|typecheck|disambiguate|desugar|parse|unparse|link|grammar|walk|api|test)\b|(bin/fortress|\.\./fortress)(\s+-\w+\s+\w+)?\s+[^\s|;&]*\.fss|probe\.sh|walk[a-z0-9]*\.sh|runeach|run-probes|each\.sh|check\.sh|time\.sh|run3\.sh|\./run\.sh|\bsh\.sh\b|apirun|phases'),
 ('wait/poll',  r'^\s*(source [^;&]*;\s*)*(wait_for|sleep)\b|wait_for|tail -[a-z]*\s*\d* [^|;]*\.(log|txt)\s*$'),
]
RX=[(n,re.compile(p,re.S)) for n,p in RULES]
def classify(cmd):
    if re.match(r'\s*(cd [^;&]*&&\s*)?(cat|sed -n|head|tail|grep|ls|wc|less)\b[^|;&]*(harness-one\.sh|merged-tests/junit\.sh|experiment/env\.sh|checker-count/run\.sh|distance/run\.sh|run-subset\.sh|run-ladder\.sh|build\.xml|FileTests\.java|SystemJUTest|CompilerJUTest|Shell\.java|bin/fortress\b|repo-internals|build-cache-exploration|ProjectProperties|seed-worktree|old-fortress|count-run|DistanceMulti|classify\.py|report\.py)',cmd):
        return 'learn-by-reading'
    for n,r in RX:
        if r.search(cmd): return n
    return 'other'
def call_cost(a,k):
    c=a['calls'][k]
    T=len(a['turns'])
    tk=c['turn']  # index (1-based count of turns so far) when issued
    inp=0.41*len(c.get('res') or '')+110
    cmd=0.28*len(str(c['input'].get('command','')))
    decay=1.25+0.05*max(0,T-tk-1)
    return inp*decay + cmd*(5+1.25+0.05*max(0,T-tk))
def agent_total(a):
    return sum(t['cc']*1.25+t['cr']*0.05+t['inp']+t['out']*5 for t in a['turns'])
res=collections.defaultdict(lambda: collections.defaultdict(lambda:[0,0.0,0.0]))
tot=collections.defaultdict(float)
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        grp=role
        tot[(tag,grp)]+=agent_total(a)
        calls=a['calls']
        for k,c in enumerate(calls):
            if c['name']!='Bash': continue
            cat=classify(c['input'].get('command',''))
            nxt=ts(calls[k+1]['ts']) if k+1<len(calls) else ts(c['ts'])
            mins=(nxt-ts(c['ts'])).total_seconds()/60
            if mins>25: mins=0
            r=res[(tag,grp)][cat]
            r[0]+=1; r[1]+=call_cost(a,k); r[2]+=mins
out={}
cats=['stage-run','suite-by-hand','harness-one','junit.sh','build','seed/old-code','probe-run','wait/poll','learn-by-reading','other']
for tag in ['b8','b9','b10']:
    print('==',tag)
    for grp in ['rung','skeptic','repair','skeptic2','judge','gate','gather','review','commit']:
        d=res.get((tag,grp))
        if not d: continue
        T=tot[(tag,grp)]
        print(f'{grp:9s} total={T/1e6:.2f}M ITE '+' | '.join(f'{c}:{d[c][0]}c/{d[c][1]/1e3:.0f}K({100*d[c][1]/T:.1f}%)/{d[c][2]:.0f}m' for c in cats if d[c][0] and c!='other'))
