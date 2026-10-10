import pickle,re,collections
A=pickle.load(open('agents.pkl','rb'))
pat={'old-fortress.sh':r'old-fortress','seed-worktree.sh':r'seed-worktree','harness-one.sh':r'harness-one','junit.sh/junit':r'junit','facts-extract':r'facts-extract','run_bg/wait_for':r'run_bg|wait_for','git worktree':r'git (-C \S+ )?worktree','ant ':r'(^|[;&| ])ant '}
for role in ['skeptic','judge','skeptic2','rung']:
    cnt=collections.Counter(); n=0
    for a in A.values():
        if a['batch']!=10 or a['label'].split(':')[0]!=role: continue
        for t in a['turns']:
            for c in t['calls']:
                if c['name']!='Bash': continue
                cmd=c['input'].get('command',''); n+=1
                for k,p in pat.items():
                    if re.search(p,cmd): cnt[k]+=1
    print(role,'bash calls',n,dict(cnt))
