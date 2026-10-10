import pickle
exec(open('cost.py').read().split("res=collections.defaultdict")[0])
T={};W={}
for tag,ag in allr.items():
    T[tag]=sum(agent_total(a) for a in ag.values())
    W[tag]=sum(sum(t['cc']+t['inp'] for t in a['turns']) for a in ag.values())
    n=len(ag); calls=sum(len(a['calls']) for a in ag.values())
    print(tag,'agents',n,'ITE model %.1fM'%(T[tag]/1e6),'writes %.2fM'%(W[tag]/1e6),'calls',calls)
print('all %.1fM'%(sum(T.values())/1e6), 'writes %.2fM'%(sum(W.values())/1e6))
