import pickle,collections
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
for o in sorted([o for o in O.values() if o['batch']==10 and o['role'] in('skeptic','judge','skeptic2','repair')],key=lambda o:(o['role'],o['label'])):
    a=A[o['aid']]; T=a['turns']
    # cumulative writes per turn
    cum=[];s=0
    for t in T:
        u=t['usage']; s+=u['cache_creation_input_tokens']+u['input_tokens']; cum.append(s)
    idx={}
    for c in o['calls']:
        idx.setdefault(c['cls'],c['turn'])
    first_probe=min([c['turn'] for c in o['calls'] if c['cls'] in('run:probes','write:scratch')] or [None]) if any(c['cls'] in('run:probes','write:scratch') for c in o['calls']) else None
    first_edit=min([c['turn'] for c in o['calls'] if c['cls'] in('write:product','write:test','write:report')] or [None]) if any(c['cls'] in('write:product','write:test','write:report') for c in o['calls']) else None
    nprobe=len([c for c in o['calls'] if c['cls']=='run:probes'])
    ts=[t['ts0'] for t in T]; mins=(T[-1]['ts1']-T[0]['ts0'])/60
    def sh(i): return '-' if i is None else f"turn {i} at {100*cum[i]/o['W']:.0f}% of writes"
    print(f"{o['label']:11s} W {o['W']/1000:5.0f}K turns {o['nturns']:3d} {mins:5.1f} min  first=%.0fK think=%.0fK  first probe/scratch: {sh(first_probe)};  first write of a file: {sh(first_edit)}; probe runs {nprobe}"%(o['w1']/1000,o['think']/1000))
