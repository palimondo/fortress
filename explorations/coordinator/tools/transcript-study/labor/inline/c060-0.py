import pickle
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
for aid,o in O.items():
    if o['role'] not in('rung','repair','skeptic'): continue
    first=None
    for c in o['calls']:
        if c['cls'] in('write:test','write:product') :
            first=c['turn']; break
    if first is None: print(o['label'],'no edit'); continue
    wb=o['w1']+sum(t['writes'] for t in o['turns'] if t['k']<=first)
    print('%d %-12s first test/product edit at turn %3d of %3d; writes before it %4.0fK of %4.0fK (%2.0f%%)'%(o['batch'],o['label'],first,o['nturns'],wb/1000,o['W']/1000,100*wb/o['W']))
