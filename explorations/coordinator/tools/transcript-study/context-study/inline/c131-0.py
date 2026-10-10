import json
for w,i,ns in (('N','a9d085d2ca3d1673f',(213,226,236)),('G','ad8b9ef1d620d222e',(142,143))):
    d=json.load(open(f'json/{i}.json'))
    for e in d['events']:
        if e['k']=='call' and e['n'] in ns:
            c=e['input'].get('command','')
            print(w,e['n'],len(c),'chars:',c[:330].replace('\n',' ⏎ '))
d=json.load(open('json/a17fa6c49e2058f77.json'))
for e in d['events']:
    if e['k']=='call' and e['n']==14: print('skG',14,len(e['input']['command']),e['input']['command'][:260].replace('\n',' ⏎ '))
