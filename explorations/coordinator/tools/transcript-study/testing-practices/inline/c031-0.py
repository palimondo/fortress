import pickle,re
allr=pickle.load(open('all.pkl','rb'))
def show(tag,label,i,n=1500):
    for aid,a in allr[tag].items():
        if a['label']==label:
            for c in a['calls']:
                if c['i']==i:
                    print('-----',tag,label,i); print(c['input'].get('command','')[:n]); print('  RES:',(c['res'] or '')[:300])
                    return
show('b8','rung:I',38,2200)
show('b8','rung:I',135,1800)
show('b9','rung:W',136,1500)
show('b10','rung:W',115,1800)
show('b10','rung:G',87,1800)
