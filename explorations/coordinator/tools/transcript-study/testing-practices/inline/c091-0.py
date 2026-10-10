import pickle,re
allr=pickle.load(open('all.pkl','rb'))
def full(tag,label,i,n=1500):
    for aid,a in allr[tag].items():
        if a['label']==label:
            for c in a['calls']:
                if c['i']==i:
                    print('-----',tag,label,i); print(c['input'].get('command','')[:n])
full('b10','skeptic:C',23,1800)
full('b10','skeptic:W',28,1500)
full('b10','rung:G',85,1500)
