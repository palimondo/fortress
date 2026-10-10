import pickle,re,collections,sys
allr=pickle.load(open('all.pkl','rb'))
pats={
 'BUILD FAILED':r'BUILD FAILED',
 'NoSuchMethodError':r'NoSuchMethodError',
 'NoClassDefFound':r'NoClassDefFoundError',
 'serialized/relink':r'Unable to read serialized|relink',
 'Resource not found':r'Resource not found|Could not load',
 'No such file':r'No such file or directory',
 'command not found':r'command not found',
 'timed out':r'timed out|Command timed out|timeout:',
 'Killed/OOM':r'OutOfMemoryError|Killed\b|GC overhead',
 'Permission':r'Permission denied|permission',
 'index.lock':r'index\.lock',
 'not clean/exit 2':r'not clean|not built|exit=2|exit 2',
 'refused/hook':r'refus|blocked|denied|Hook|not allowed',
 'Address in use / Too many':r'Too many open|No space left|disk',
 'cannot find symbol':r'cannot find symbol|error: ',
 'stack empty jars':r'0 bytes|empty',
 'Stale':r'stale',
}
rx={k:re.compile(v,re.I if k in('Stale',) else 0) for k,v in pats.items()}
tot=collections.defaultdict(lambda: collections.Counter())
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']!='Bash' or not c['res']: continue
            for k,r in rx.items():
                if r.search(c['res']):
                    tot[(tag,a['label'])][k]+=1
for tag in allr:
    print('==',tag)
    keys=list(pats)
    print('keys',keys)
    for (t,l),cnt in tot.items():
        if t!=tag: continue
        print(f'{l:14s}',' '.join(f'{cnt[k]:3d}' for k in keys))
