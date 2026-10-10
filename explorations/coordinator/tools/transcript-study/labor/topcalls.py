import pickle,sys,collections
O=pickle.load(open('acct.pkl','rb'))
want=sys.argv[1:]
for aid,o in O.items():
    key=f"{o['batch']} {o['label']}"
    if not any(key==w for w in want): continue
    print('==',key,'W',o['W'],'turns',o['nturns'])
    cs=sorted(o['calls'],key=lambda c:-(c['res']+c['inp']))[:14]
    for c in cs:
        inp=c['input']; s=(inp.get('command') or inp.get('file_path') or inp.get('description') or str(inp)).replace('\n',' ⏎ ')
        print('  %6.1fK t%-3d %-18s %s'%((c['res']+c['inp'])/1000,c['turn'],c['cls'],s[:130]))
