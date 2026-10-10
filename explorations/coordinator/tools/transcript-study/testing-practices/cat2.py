import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
pats={
 'blockedSleep':r'<tool_use_error>Blocked: sleep|Blocked: ',
 'movedToBg':r'was moved to the background|Command running in background',
 'permDenied':r'Permission for this command was denied|denied by a built-in',
 'toolError':None,
 'stillRunning':r'still running after',
 'NoSuchMethod':r'NoSuchMethodError',
 'BUILD FAILED':r'BUILD FAILED',
 'ResNotFound':r'Resource not found',
 'serialized':r'Unable to read serialized',
 'tmpdir missing':r'java\.io\.tmpdir directory does not exist',
 'harnessCannotFind':r'does not exist|Cannot find file',
 'No such file':r'No such file or directory',
}
tot=collections.defaultdict(collections.Counter)
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']!='Bash': continue
            res=c['res'] or ''
            for k,p in pats.items():
                if k=='toolError':
                    if c['err']: tot[(tag,a['label'],aid)][k]+=1
                elif re.search(p,res): tot[(tag,a['label'],aid)][k]+=1
keys=list(pats)
for tag in allr:
    print('==',tag, keys)
    sums=collections.Counter()
    for (t,l,aid),cnt in tot.items():
        if t!=tag: continue
        if l.split(':')[0] in ('gather','review','commit','judge'): continue
        print(f'{l:14s}',' '.join(f'{cnt[k]:3d}' for k in keys))
        for k in keys: sums[k]+=cnt[k]
    print('SUM          ',' '.join(f'{sums[k]:3d}' for k in keys))
