import pickle,collections
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
for o in sorted([o for o in O.values() if o['batch']==10 and o['role'] in('skeptic','judge','skeptic2','repair')],key=lambda o:(o['role'],o['label'])):
    a=A[o['aid']]; T=a['turns']
    cum=[];s=0
    for t in T:
        u=t['usage']; s+=u['cache_creation_input_tokens']+u['input_tokens']; cum.append(s)
    pr=[c['turn'] for c in o['calls'] if c['cls'] in('run:probes','write:scratch')]
    ed=[c['turn'] for c in o['calls'] if c['cls'] in('write:product','write:test','write:report')]
    nprobe=len([c for c in o['calls'] if c['cls']=='run:probes'])
    mins=(T[-1]['ts1']-T[0]['ts0'])/60
    def sh(l): return '-' if not l else 'turn %d at %.0f%% of writes'%(min(l),100*cum[min(l)]/o['W'])
    print("%-11s W %4.0fK turns %3d %5.1f min first %3.0fK think %3.0fK probes: %s; first file written: %s; probe runs %d"%(o['label'],o['W']/1000,o['nturns'],mins,o['w1']/1000,o['think']/1000,sh(pr),sh(ed),nprobe))
