import re,pickle
from echo import blocks_judge,BR,byid,unesc
def sh(s,k=7):
    w=re.findall(r'\w+',s.lower()); return {' '.join(w[i:i+k]) for i in range(len(w)-k+1)},w
for l in ['judge:N','judge:C','judge:G']:
    t=BR[byid[l]]; B=blocks_judge(t)
    rep=unesc(B['reportText']); rec=unesc(B['recordText'])
    S_rep,_=sh(rep); S_rec,_=sh(rec)
    for name in ['W:other','S:other','skepticText']:
        x=unesc(B[name]); S,w=sh(x)
        if not S: print(l,name,'empty'); continue
        a=len(S&S_rep)/len(S); b=len(S&S_rec)/len(S)
        print(f'{l} {name:12s} {len(B[name]):6d} chars; 7-word runs also in reportText {100*a:3.0f}%, also in recordText {100*b:3.0f}%')
    # skeptic findings vs skepticText for N
    if l=='judge:N':
        S1,_=sh(unesc(B['S:other'])); S2,_=sh(unesc(B['skepticText']))
        print('  S:other runs also in skepticText: %.0f%%'%(100*len(S1&S2)/len(S1)))
        S3,_=sh(unesc(B['W:other']))
        # worker other fields vs prefix
