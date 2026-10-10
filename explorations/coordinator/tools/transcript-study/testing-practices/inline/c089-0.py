import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for aid,a in allr['b8'].items():
    if a['label']=='skeptic2:Q':
        for c in a['calls']:
            if c['i']==106:
                r=c['res']; s=r.find('analysed'); print(r[max(0,s-1500):s+700])
