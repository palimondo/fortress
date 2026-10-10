import pickle,collections
O=pickle.load(open('acct.pkl','rb'))
for o in sorted(O.values(),key=lambda o:o['label']):
    if o['batch']==10 and o['role'] in('skeptic','skeptic2','judge'):
        tr=sum(c['res']+c['inp'] for c in o['calls'] if c['cls']=='read:transcripts')
        n=len([c for c in o['calls'] if c['cls']=='read:transcripts'])
        art=sum(c['res']+c['inp'] for c in o['calls'] if c['cls']=='read:rung:artifacts')
        print(o['label'],'transcript reads %.1fK in %d calls; reports/record files %.1fK'%(tr/1000,n,art/1000))
