import pickle,collections
O=pickle.load(open('acct.pkl','rb'))
for b in (8,9,10):
    ags=[o for o in O.values() if o['batch']==b]
    tot=sum(o['W'] for o in ags)
    d=collections.defaultdict(lambda:[0,0])
    for o in ags: d[o['role']][0]+=1; d[o['role']][1]+=o['W']
    chk=sum(d[r][1] for r in ('skeptic','judge','skeptic2'))
    print(f'batch {b}: total {tot/1e6:.2f}M agents {len(ags)}; skeptic n={d["skeptic"][0]} {d["skeptic"][1]/1000:.0f}K, judge n={d["judge"][0]} {d["judge"][1]/1000:.0f}K, skeptic2 n={d["skeptic2"][0]} {d["skeptic2"][1]/1000:.0f}K, repair n={d["repair"][0]} {d["repair"][1]/1000:.0f}K; three checking roles {chk/1000:.0f}K = {100*chk/tot:.1f}%; judge+skeptic2+repair {(d["judge"][1]+d["skeptic2"][1]+d["repair"][1])/1000:.0f}K = {100*(d["judge"][1]+d["skeptic2"][1]+d["repair"][1])/tot:.1f}%')
    # first calls
    fc=sum(o['w1'] for o in ags if o['role'] in('skeptic','judge','skeptic2'))
    th=sum(o['think'] for o in ags if o['role'] in('skeptic','judge','skeptic2'))
    print(f'   checking roles first calls {fc/1000:.0f}K ({100*fc/chk:.0f}%), thinking {th/1000:.0f}K ({100*th/chk:.0f}%)')
    for r in ('skeptic','judge','skeptic2'):
        rs=[o for o in ags if o['role']==r]
        print('   ',r,'mean writes %.0fK, mean turns %.0f, mean first %.0fK, mean brief chars %.0f'%(sum(o['W'] for o in rs)/len(rs)/1000,sum(o['nturns'] for o in rs)/len(rs),sum(o['w1'] for o in rs)/len(rs)/1000,sum(o['brief_chars'] for o in rs)/len(rs)))
