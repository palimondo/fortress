import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
tot=collections.Counter(); who=collections.defaultdict(list)
for tag,ag in allr.items():
    for aid,a in ag.items():
        n=0
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                if re.search(r'fortress compile[^\n&;]*CompilerBuiltin\.fss',cmd) or re.search(r'compile\s+\S*CompilerBuiltin\.fss',cmd):
                    n+=1
        if n:
            tot[tag]+=n; who[tag].append((a['label'],n))
print(tot)
for t in who: print(t,who[t])
