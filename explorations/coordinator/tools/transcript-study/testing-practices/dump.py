import pickle,re,sys,datetime
allr=pickle.load(open('all.pkl','rb'))
tag,aid_prefix=sys.argv[1],sys.argv[2]
cmdw=int(sys.argv[3]) if len(sys.argv)>3 else 350
resw=int(sys.argv[4]) if len(sys.argv)>4 else 200
filt=re.compile(r'(\bant\b|harness-one|junit|bin/fortress|\.\./fortress|fortress\s+(compile|run|walk|test)|seed-worktree|old-fortress|rm -rf|run_bg|wait_for|sleep|env\.sh|checker-count|distance|run\.sh|java |javac|scalac|timeout|nohup|FORTRESS_|ladder|stacktrace|\.sh\b|gate|compileAll|mg-run|df -|pgrep|kill)')
for aid,a in allr[tag].items():
    if not (aid.startswith(aid_prefix) or a['label']==aid_prefix): continue
    t0=datetime.datetime.fromisoformat(a['calls'][0]['ts'].replace('Z','+00:00'))
    print('##',aid,a['label'])
    for c in a['calls']:
        if c['name']=='TEXT':
            tx=re.sub(r'\s+',' ',c['input']['text'])
            print(f"   TEXT[{c['i']}]: {tx[:400]}")
            continue
        if c['name']!='Bash': continue
        cmd=c['input'].get('command','')
        if not filt.search(cmd): continue
        t=datetime.datetime.fromisoformat(c['ts'].replace('Z','+00:00'))
        dt=(t-t0).total_seconds()/60
        cm=re.sub(r'\s+',' ',cmd)
        res=(c['res'] or '')
        rs=re.sub(r'\s+',' ',res)
        print(f"[{c['i']} +{dt:.0f}m{' ERR' if c['err'] else ''}] {cm[:cmdw]}")
        if resw: print('     ->',rs[:resw], ('...'+rs[-120:]) if len(rs)>resw+120 else '')
