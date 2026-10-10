import pickle,random
O=pickle.load(open('acct.pkl','rb'))
allc=[c for o in O.values() for c in o['calls'] if c['res']+c['inp']>1500]
random.seed(11)
for c in random.sample(allc,36):
    inp=c['input']; s=(inp.get('command') or inp.get('file_path') or str(inp)).replace('\n',' ⏎ ')
    print('%-22s %5.1fK %s'%(c['cls'],(c['res']+c['inp'])/1000,s[:170]))
