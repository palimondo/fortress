#!/usr/bin/env python3 -I
import re,json,sys
ids={'W':'ac7f17fcef729d710','N':'a9d085d2ca3d1673f','G':'ad8b9ef1d620d222e','C':'a17102eab231ad505'}
after={'W':13,'N':10,'G':6,'C':10}
fixedit={'W':76,'N':152,'G':109,'C':136}
# the exact key strings from each worker's briefing command
def keys_of(w):
    d=json.load(open(f'json/{ids[w]}.json'))
    calls=[e for e in d['events'] if e['k']=='call']
    return d,calls
def key_strings(w):
    d,calls=keys_of(w)
    # briefing command: the facts-extract call with the most quoted keys among first calls
    best=None
    for c in calls[:12]:
        cmd=c['input'].get('command','')
        if 'facts-extract' in cmd:
            ks=re.findall(r'"((?:[^"\\]|\\.)+)"',cmd)
            if best is None or len(ks)>len(best): best=ks
    return best
def mentions(key,corpus):
    corpus_l=corpus.lower()
    k=key
    if k.startswith('positions:'):
        t=k[len('positions:'):].lower()
        return t in corpus_l
    if k.startswith('ledger:'):
        n=k.split(':')[1]
        return bool(re.search(r'(rows?[^\n]{0,60}\b%s\b)|(\|\s*%s\s*\|)|(ledger[^\n]{0,20}\b%s\b)|(\^\|\s*%s\b)'%(n,n,n,n),corpus))
    if k.startswith('doc:'):
        path=k[4:].split('#')[0]; sec=k[4:].split('#',1)[1] if '#' in k else ''
        base=path.split('/')[-1].lower()
        sec1=sec.split('@')[0].lower().strip()
        return base in corpus_l or (sec1 and sec1 in corpus_l)
    if k.startswith('code:'):
        m=re.search(r'#(.*)$',k); decl=m.group(1)
        mm=re.search(r'(?:def|boolean|static|void|class|object|trait)\s+(?:<[^>]*>\s*)?(?:[A-Za-z_<>\[\],]+\s+)?([A-Za-z_][A-Za-z_0-9]*)\s*\(?',decl)
        names=re.findall(r'([A-Za-z_][A-Za-z_0-9]{3,})\s*\(?\s*$',decl.split('..')[0].strip())
        nm=names[-1] if names else None
        if not nm:
            nm=re.findall(r'[A-Za-z_][A-Za-z_0-9]{4,}',decl)[-1]
        return nm.lower() in corpus_l, nm
    if k.startswith('map:'):
        return 'map/' in corpus_l or 'readme.md' in corpus_l
    # FACTS title
    t=k.lower()
    return t in corpus_l or t[:50] in corpus_l
if __name__=='__main__':
    for w in 'WNGC':
        d,calls=keys_of(w)
        ks=key_strings(w)
        keysz=dict(json.load(open(f'keys-{w}.json')))
        def corp(lo,hi):
            parts=[]
            for c in calls:
                if lo<c['n']<=hi:
                    parts.append(json.dumps(c['input'],ensure_ascii=False).replace('\\n','\n').replace('\\"','"'))
            return '\n'.join(parts)
        pre=corp(after[w],fixedit[w]); full=corp(after[w],10**6)
        res=[]
        for k in ks:
            r1=mentions(k,pre); r2=mentions(k,full)
            if isinstance(r1,tuple): r1=r1[0]
            if isinstance(r2,tuple): r2=r2[0]
            res.append((k,r1,r2))
        # sizes: match to key table by position order
        tbl=json.load(open(f'keys-{w}.json'))
        print('==',w,len(ks),'keys',len(tbl),'table rows')
        kind=lambda k:k.split(':')[0] if re.match(r'^(positions|ledger|doc|code|map|index|section|spec|ledger-find):',k) else 'facts'
        agg={}
        for (k,r1,r2),(tk,b) in zip(res,tbl):
            a=agg.setdefault(kind(k),[0,0,0,0,0,0,0])
            a[0]+=1;a[1]+=b
            if r1: a[2]+=1;a[3]+=b
            if r2: a[4]+=1;a[5]+=b
        for kd,a in agg.items():
            print(f'  {kd:10s} keys {a[0]:3d} bytes {a[1]:6d} | named before fix edit: {a[2]:3d} keys {a[3]:6d} B | named anywhere (incl. report): {a[4]:3d} keys {a[5]:6d} B')
        tot=[sum(a[i] for a in agg.values()) for i in range(7)]
        print(f'  TOTAL      keys {tot[0]:3d} bytes {tot[1]:6d} | before fix: {tot[2]} keys {tot[3]} B ({100*tot[3]/tot[1]:.0f}%) | anywhere: {tot[4]} keys {tot[5]} B ({100*tot[5]/tot[1]:.0f}%)')
        json.dump([(k,r1,r2,b) for (k,r1,r2),(tk,b) in zip(res,tbl)],open(f'use-{w}.json','w'))
