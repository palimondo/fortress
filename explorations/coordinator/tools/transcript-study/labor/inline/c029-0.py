import pickle,collections,os
from cls import *
A=pickle.load(open('agents.pkl','rb'))
c1=collections.Counter()
for a in A.values():
    for t in a['turns']:
        for c in t['calls']:
            r=classify(c['name'],c['input'])
            if r['cls']=='read:rung:artifacts':
                fs=[f for f in r['files'] if kind_of_path(f)=='rung:artifacts'] or r['files']
                for f in fs[:3]: c1[os.path.basename(f)]+=c['rbytes']/max(1,len(fs[:3]))
print(c1.most_common(40))
