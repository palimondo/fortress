import pickle,sys,json
A=pickle.load(open('agents.pkl','rb'))
O=pickle.load(open('acct.pkl','rb'))
lab=sys.argv[1]; bat=int(sys.argv[2]) if len(sys.argv)>2 else 10
lim=int(sys.argv[3]) if len(sys.argv)>3 else 200
for aid,a in A.items():
    if a['label']==lab and a['batch']==bat:
        o=O[aid]
        calls={c['id']:c for c in o['calls']}
        print(lab,aid,'W',o['W'],'first',o['w1'],'turns',o['nturns'])
        T=a['turns']; n=0
        t0=T[0]['ts0']
        for k,t in enumerate(T):
            tu=o['turns'][k-1] if k>0 else None
            th=round(tu['think']) if tu else 0
            for c in t['calls']:
                cc=calls.get(c['id'])
                inp=c['input']
                s=inp.get('command') or inp.get('file_path') or inp.get('pattern') or json.dumps(inp)[:100]
                s=s.replace('\n',' ⏎ ')[:130]
                print(f"{k:3d} t={int(t['ts0']-t0):5d}s w={t['usage']['cache_creation_input_tokens']+t['usage']['input_tokens']:6d} {c['name'][:5]:5s} {cc['cls'] if cc else '?':22s} r={c['rbytes']:6d} {s}")
                n+=1
                if n>=lim: sys.exit()
