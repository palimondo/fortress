import pickle
allr=pickle.load(open('all.pkl','rb'))
for tag,agents in allr.items():
    print('==',tag)
    for aid,a in agents.items():
        w=sum(t['cc']+t['inp'] for t in a['turns'])
        nb=sum(1 for c in a['calls'] if c['name']=='Bash')
        print(aid,a['label'],'turns',len(a['turns']),'calls',len(a['calls']),'bash',nb,'writes',w, 'brief chars',len(a['first_user'] or ''))
