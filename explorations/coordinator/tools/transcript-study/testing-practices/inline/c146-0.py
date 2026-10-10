src=open('practices.py').read().split("for n in sorted(P):")[0]
exec(src)
a=allr['b9']['a8a6f3d6'] if 'a8a6f3d6' in allr['b9'] else [v for k,v in allr['b9'].items() if k.startswith('a8a6f3')][0]
s=0;n=0
for k,c in enumerate(a['calls']):
    if c['i'] in {76,81,82,83,84,85,86} and c['name']=='Bash':
        s+=call_cost(a,k); n+=1
print(n,round(s/1e3))
