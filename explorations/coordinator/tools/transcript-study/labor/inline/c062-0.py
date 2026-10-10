import pickle,collections
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
readish=lambda c: c.startswith('read:') or c in('search','git:diff-show')
tot=collections.Counter(); byrole=collections.defaultdict(collections.Counter)
for aid,o in O.items():
    # per turn: classes of calls issued in that turn (turn index k-1 -> think appears in turn k record as think of previous output)
    callsby=collections.defaultdict(list)
    for c in o['calls']: callsby[c['turn']].append(c['cls'])
    # thinking of turn j (the output of turn j) appears in turns[j] record (k=j+1) 'think'
    thinkby={t['k']-1:t['think'] for t in o['turns']}
    n=o['nturns']
    run=0
    for j in range(n):
        cl=callsby.get(j,[])
        is_read = len(cl)>0 and all(readish(x) for x in cl)
        if is_read:
            run+=1
            if run>=2:
                byrole[o['role']]['mergeable_turns']+=1
                byrole[o['role']]['think_in_mergeable']+=thinkby.get(j,0)
        else: run=0
        byrole[o['role']]['turns']+=1; byrole[o['role']]['think']+=thinkby.get(j,0)
nag=collections.Counter(o['role'] for o in O.values())
T=collections.Counter()
for r,c in byrole.items():
    print('%-14s turns/agent %5.0f  consecutive-read follow-on turns %5.1f (%2.0f%%) carrying thinking %5.1fK/agent of %5.1fK (%2.0f%%)'%(r,c['turns']/nag[r],c['mergeable_turns']/nag[r],100*c['mergeable_turns']/c['turns'],c['think_in_mergeable']/nag[r]/1000,c['think']/nag[r]/1000,100*c['think_in_mergeable']/c['think']))
    T.update(c)
print('ALL turns',T['turns'],'mergeable',T['mergeable_turns'],'think in mergeable %.0fK of %.0fK'%(T['think_in_mergeable']/1000,T['think']/1000))
