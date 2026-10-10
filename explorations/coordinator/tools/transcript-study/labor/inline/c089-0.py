import pickle,collections
O=pickle.load(open('acct.pkl','rb'))
for o in O.values():
    if o['role']=='judge:review':
        print('==',o['batch'],o['label'],o['W'])
        c=collections.Counter()
        for x in o['calls']:
            c[x['cls']]+=x['res']+x['inp']
        print({k:round(v/1000,1) for k,v in c.items()})
        for x in sorted(o['calls'],key=lambda x:-(x['res']+x['inp']))[:8]:
            print('   %5.1fK %-18s %s'%((x['res']+x['inp'])/1000,x['cls'],(x['input'].get('command') or str(x['input']))[:150].replace('\n',' ⏎ ')))
# skeptic SKEPTIC.md reading by batch
for o in O.values():
    if o['role'] in('skeptic','skeptic2'):
        t=sum(x['res']+x['inp'] for x in o['calls'] if any('SKEPTIC' in f for f in x['files']) and x['cls'] not in('write:report',))
        print(o['batch'],o['label'],'SKEPTIC.md-touching calls %.1fK'%(t/1000))
