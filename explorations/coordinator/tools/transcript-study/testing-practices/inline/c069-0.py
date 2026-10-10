import pickle,re
allr=pickle.load(open('all.pkl','rb'))
def full(tag,label,i,n=2500):
    for aid,a in allr[tag].items():
        if a['label']==label:
            for c in a['calls']:
                if c['i']==i:
                    print('-----',tag,label,i); print(c['input'].get('command','')[:n]); print('  RES:',re.sub(r'\s+',' ',(c['res'] or ''))[:500])
full('b8','rung:Q',160,2200)
