import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
pats={
 'ant compileAll':r'ant\b[^|;\n]*compileAll',
 'ant testSystem':r'ant\b[^|;\n]*testSystem',
 'ant testFast':r'ant\b[^|;\n]*testFast',
 'ant testOnly':r'ant\b[^|;\n]*testOnly',
 'ant other test':r'ant\b[^|;\n]*(testCompiler|testLibrary|testOtherCompiler|testSpecData|testNotPassing|testSystem1|testSystem2)',
 'ant any':r'(^|[\s;&(])ant\s',
 'libraryorder':r'compile[^\n]*(AnyType|CompilerBuiltin|CompilerLibrary|CompilerAlgebra|CompilerSystem)\.fss',
 'harness-one':r'harness-one\.sh',
 'junit.sh':r'junit\.sh',
 'fortress junit':r'fortress\s+junit',
 'fortress compile':r'fortress\s+compile',
 'fortress run':r'fortress\s+run\b',
 'fortress typecheck etc':r'fortress\s+(typecheck|disambiguate|desugar|parse|unparse|link|grammar)',
 'bin/fortress walk':r'bin/fortress\s+(?!compile|run|junit|typecheck|link)[^\s]*\.fss',
 'seed-worktree':r'seed-worktree',
 'old-fortress':r'old-fortress\.sh',
 'env.sh':r'env\.sh',
 'rm caches':r'rm\s+-rf?[^\n;&|]*(caches|bytecode_cache|analyzed_cache|test-caches|test-tmp)',
 'rm fortress*rats':r'fortress\*rats|fortress.*rats',
 'run_bg':r'run_bg',
 'wait_for':r'wait_for',
 'sleep':r'\bsleep\s+\d+',
 'checker-count':r'checker-count',
 'distance':r'distance',
 'run-ladder/ladder':r'run-ladder|run-subset|ladder',
 'gate':r'\bgate\b',
 'mg-run':r'mg-run',
 'facts-extract':r'facts-extract',
 'git':r'^\s*(cd [^\n;&]*&&\s*)?git\b',
 'stacktrace':r'stacktrace',
 'JAVA_FLAGS':r'JAVA_FLAGS',
 'FORTRESS_THREADS':r'FORTRESS_THREADS',
 'ps/pgrep/kill':r'\b(pgrep|pkill|kill|ps\s)',
 'df':r'\bdf\s',
}
rx={k:re.compile(v) for k,v in pats.items()}
for tag,agents in allr.items():
    print('==',tag)
    hdr=['agent','label']+list(pats)
    rows=[]
    for aid,a in agents.items():
        cnt=collections.Counter()
        for c in a['calls']:
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            for k,r in rx.items():
                if r.search(cmd): cnt[k]+=1
        rows.append((aid[:6],a['label'],cnt))
    keys=[k for k in pats if any(r[2][k] for r in rows)]
    print('cols:',keys)
    for aid,lab,cnt in rows:
        print(f'{lab:14s}',' '.join(f'{cnt[k]:3d}' for k in keys))
