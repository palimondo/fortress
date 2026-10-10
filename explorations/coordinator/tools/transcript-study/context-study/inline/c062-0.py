import json,sys
sys.path.insert(0,'.')
import use
for w in 'WN':
    ks=use.key_strings(w); tbl=json.load(open(f'keys-{w}.json'))
    print(w,len(ks),len(tbl))
    for i in range(max(len(ks),len(tbl))):
        a=ks[i] if i<len(ks) else ''
        b=tbl[i][0] if i<len(tbl) else ''
        flag='' if a[:30]==b[:30] else '  <<<'
        print(i,a[:60],'|',b[:60],flag)
    break
