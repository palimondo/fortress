import pickle,re,collections,datetime,sys
allr=pickle.load(open('all.pkl','rb'))
def ts(s): return datetime.datetime.fromisoformat(s.replace('Z','+00:00'))
RULES=[
 ('howto-read', r'^\s*(cd [^;&]*&&\s*)?(cat|sed -n|head|tail|grep|ls|wc)\b[^|;&]*(harness-one\.sh|merged-tests/junit\.sh|experiment/env\.sh|checker-count/run\.sh|distance/run\.sh|run-subset\.sh|run-ladder\.sh|build\.xml|FileTests\.java|bin/fortress\b(?!_)|Shell\.java|repo-internals|build-cache-exploration|ProjectProperties|seed-worktree|old-fortress)'),
 ('seed', r'seed-worktree|worktree add|old-fortress\.sh'),
 ('build', r'\bant\b[^|;\n]*compileAll|fortress compile[^\n&;]*(AnyType|CompilerBuiltin|CompilerLibrary|CompilerAlgebra|CompilerSystem)\.fss|git checkout[^\n;&]*global\.map'),
 ('suite', r'\bant\b[^|;\n]*test(Fast|System|Only|Compiler|Library|OtherCompiler|SpecData)|tracks\.sh|corpus\.sh|shard\.sh|SystemJUTest|CompilerJUTest|LibraryJUTest|OtherCompilerJUTest'),
 ('harness', r'harness-one\.sh'),
 ('junit', r'junit\.sh|bin/fortress junit|fortress junit'),
 ('stage', r'checker-count/run\.sh|distance/run\.sh|run-subset\.sh|run-ladder\.sh|microgpt-phase|count-run|devcheck|dev-check|DistanceMulti|checker-count'),
 ('probe', r'(bin/fortress|\.\./fortress|\bfortress)\s+(compile|run|typecheck|disambiguate|desugar|parse|unparse|link|grammar|walk|api|test)\b|(bin/fortress|\.\./fortress)\s+[^\s]*\.fss|probe\.sh|walk[a-z0-9]*\.sh|runeach|run-probes|each\.sh|check\.sh|\./run\.sh|time\.sh'),
 ('wait', r'^\s*(source [^;&]*;\s*)*(wait_for|sleep)\b|^\s*(cd [^;&]*&&\s*)?(tail|cat|grep)\b[^|;]*(\.log|\.txt)\b[^|;]*$'),
]
RX=[(n,re.compile(p,re.S)) for n,p in RULES]
def classify(cmd):
    for n,r in RX:
        if r.search(cmd): return n
    return 'other'
def tok(c):
    return 0.41*len(c['res'] or '')+110
res=collections.defaultdict(lambda: collections.defaultdict(lambda: [0,0.0,0.0]))  # (tag,rolegroup)->cat->[calls,tokens,minutes]
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        grp = role if role in('rung','skeptic','repair','skeptic2','gate','gather','judge','commit','review') else role
        calls=a['calls']
        for k,c in enumerate(calls):
            if c['name']!='Bash': continue
            cat=classify(c['input'].get('command',''))
            nxt=ts(calls[k+1]['ts']) if k+1<len(calls) else ts(c['ts'])
            mins=(nxt-ts(c['ts'])).total_seconds()/60
            if mins>30: mins=0  # idle gaps
            r=res[(tag,grp)][cat]
            r[0]+=1; r[1]+=tok(c); r[2]+=mins
cats=['build','suite','harness','junit','stage','probe','howto-read','seed','wait','other']
for tag in ['b8','b9','b10']:
    print('==',tag)
    for grp in ['rung','skeptic','repair','skeptic2','judge','gate','gather','review','commit']:
        d=res.get((tag,grp))
        if not d: continue
        tot=sum(v[0] for v in d.values())
        print(f'{grp:9s} calls={tot:4d} '+' | '.join(f'{c}:{d[c][0]}/{d[c][1]/1000:.0f}K/{d[c][2]:.0f}m' for c in cats if d[c][0]))
