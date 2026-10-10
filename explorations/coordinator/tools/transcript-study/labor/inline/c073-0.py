import pickle,collections
from tab1 import grp
O=pickle.load(open('acct.pkl','rb'))
for o in O.values():
    if o['role'] in('review','gather','repair:review'):
        c=collections.Counter()
        for x in o['calls']:
            if grp(x['cls'])=='other': c[x['cls']]+=x['res']+x['inp']
        print(o['batch'],o['label'],{k:round(v/1000,1) for k,v in c.items()})
        for x in o['calls']:
            if grp(x['cls'])=='other' and x['res']+x['inp']>3000: print('    ',round((x['res']+x['inp'])/1000,1),(x['input'].get('command') or str(x['input']))[:150].replace('\n',' ⏎ '))
