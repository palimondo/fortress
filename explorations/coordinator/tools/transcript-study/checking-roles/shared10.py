import pickle,collections,os,re,hashlib
from cls import kind_of_path
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
READ_OK=lambda cls: (cls.startswith('read:') and cls not in('read:output','read:transcripts')) or cls in('search','git:diff-show')
def chain_of(o):
    l=o['label']; 
    if ':' in l and l.split(':')[0] in('rung','skeptic','skeptic2','judge','repair') and l.split(':')[1] in list('NCGW'): return l.split(':')[1]
    return 'tail'
def lab(c):
    cls=c['cls']
    if cls=='read:kb:briefing': return 'BRIEFING'
    fs=sorted(set(os.path.basename(f) for f in c['files'] if kind_of_path(f))) or sorted(set(os.path.basename(f) for f in c['files']))
    return ','.join(fs[:3]) if fs else '('+cls+')'
def H(s): return hash(s)
def lines_of(txt):
    out=[]
    for l in txt.split('\n'):
        l=l.strip()
        if len(l)>=25: out.append(l)
    return out
def main():
    res_all=[]
    for batch in (10,):
        ags=sorted([o for o in O.values() if o['batch']==batch],key=lambda o:o['t0'])
        seen=collections.defaultdict(set)   # line -> set of (aid) that read it (read results)
        # also brief lines
        for o in ags:
            aid=o['aid']; ag=A[aid]
            # map call id -> text
            txt={c['id']:c.get('text','') for t in ag['turns'] for c in t['calls']}
            mine=[]
            for c in o['calls']:
                if not READ_OK(c['cls']): continue
                ls=lines_of(txt.get(c['id'],''))
                tot=sum(len(l) for l in ls) or 1
                prior_chain=0;prior_other=0;
                prior_c=0;prior_o=0
                for l in set(ls):
                    pass
                # fraction of chars in lines seen earlier (by earlier agents), split by same chain or not
                sc=0;so=0
                for l in ls:
                    h=H(l); s=seen.get(h)
                    if s:
                        ch=[ (A_chain[x]==chain_of(o) and chain_of(o)!='tail') for x in s]
                        if any(ch): sc+=len(l)
                        else: so+=len(l)
                f_c=sc/tot; f_o=so/tot
                mine.append((c,ls))
                res_all.append(dict(aid=aid,batch=batch,role=o['role'],chain=chain_of(o),label=lab(c),cls=c['cls'],tok=c['res'],same_chain=c['res']*f_c,other=c['res']*f_o,id=c['id']))
            # now register this agent's lines (after scanning, so within-agent repeats not counted here)
            for c,ls in mine:
                for l in ls: seen[H(l)].add(aid)
    return res_all
A_chain={}
for o in O.values(): A_chain[o['aid']]=chain_of(o)
if __name__=='__main__':
    R=main()
    pickle.dump(R,open('shared10.pkl','wb'))
    nag=collections.Counter(o['role'] for o in O.values() if o['batch']==10)
    by=collections.defaultdict(lambda:[0,0,0])
    for r in R:
        b=by[r['role']]; b[0]+=r['tok']; b[1]+=r['same_chain']; b[2]+=r['other']
    print('role: read tokens, already read by earlier agent of same chain, by another chain/tail (per agent K)')
    for role,b in by.items():
        n=nag[role]; print('%-14s n=%d read %6.1fK  same-chain-earlier %6.1fK (%2.0f%%)  other-earlier %6.1fK (%2.0f%%)'%(role,n,b[0]/n/1000,b[1]/n/1000,100*b[1]/b[0],b[2]/n/1000,100*b[2]/b[0]))
    tot=sum(b[0] for b in by.values()); print('ALL read %.0fK, repeated %.0fK (%.0f%%)'%(tot/1000,sum(b[1]+b[2] for b in by.values())/1000,100*sum(b[1]+b[2] for b in by.values())/tot))
