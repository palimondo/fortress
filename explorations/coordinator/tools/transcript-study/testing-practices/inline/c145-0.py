src=open('practices.py').read().split("for n in sorted(P):")[0]
exec(src)
def sel(tag,label,idx):
    for aid,a in allr[tag].items():
        if a['label']==label:
            s=0;n=0
            for k,c in enumerate(a['calls']):
                if c['i'] in idx and c['name']=='Bash':
                    s+=call_cost(a,k); n+=1
            return n,round(s/1e3)
print('N subset',sel('b10','rung:N',{179,180,181,182,186,188,189,190,229}))
print('G subset',sel('b10','rung:G',{118,119,120,124,134,146}))
print('W b10 suite',sel('b10','rung:W',{114,115,116,124,137,138,144,145,149,150}))
print("W' b9 suite",sel('b9','a8a6f3',{76,81,82,83,84,85,86}))
