import pickle,collections
O=pickle.load(open('acct.pkl','rb'))
W=sum(o['W'] for o in O.values())
res=sum(o['res'] for o in O.values()); inp=sum(o['inp'] for o in O.values()); th=sum(o['think'] for o in O.values()); w1=sum(o['w1'] for o in O.values()); rf=sum(o['refill'] for o in O.values()); rs=sum(o['resid'] for o in O.values())
print('W %.0fK first %.0fK (%.1f%%) results %.0fK (%.1f%%) call inputs %.0fK (%.1f%%) think %.0fK (%.1f%%) refill %.0fK (%.1f%%) resid %.0fK'%(W/1000,w1/1000,100*w1/W,res/1000,100*res/W,inp/1000,100*inp/W,th/1000,100*th/W,rf/1000,100*rf/W,rs/1000))
print('turns',sum(o['nturns'] for o in O.values()),'calls',sum(len(o['calls']) for o in O.values()))
# refill events
ev=[(o['label'],o['batch'],t['refill'],t['gap']) for o in O.values() for t in o['turns'] if t['refill']>5000]
print(ev)
# per-role n, turns, calls, W
G=collections.defaultdict(list)
for o in O.values(): G[o['role']].append(o)
for r,a in G.items(): print(r,len(a),'turns/agent %.0f calls/agent %.0f W/agent %.0fK'%(sum(o['nturns'] for o in a)/len(a),sum(len(o['calls']) for o in a)/len(a),sum(o['W'] for o in a)/len(a)/1000))
