import pickle
A=pickle.load(open('agents.pkl','rb'))
a=A['a226d80289a5176a7']
i=0
for t in a['turns'][:90]:
    for c in t['calls']:
        i+=1
        inp=c['input']
        s=inp.get('command') or inp.get('file_path') or str(inp)
        s=s.replace('\n',' ⏎ ')
        print(i,c['name'],c['rbytes'],s[:170])
