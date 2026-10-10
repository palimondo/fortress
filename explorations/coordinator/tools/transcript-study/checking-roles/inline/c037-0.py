# per-label detail for the chain: what the checking roles read that earlier chain agents read
import pickle,collections
R=pickle.load(open('shared10.pkl','rb'))
by=collections.defaultdict(lambda:[0,0,0])
for r in R:
    if r['role'] in ('skeptic','judge','skeptic2','repair'):
        k=(r['role'],r['cls'].split(':')[0] if r['cls'] in('search','git:diff-show') else r['cls'])
        b=by[k]; b[0]+=r['tok']; b[1]+=r['same_chain']; b[2]+=r['other']
for k,b in sorted(by.items(),key=lambda x:-x[1][0])[:30]:
    print(k,'read %.0fK repeated-in-chain %.0fK other %.0fK'%(b[0]/1000,b[1]/1000,b[2]/1000))
