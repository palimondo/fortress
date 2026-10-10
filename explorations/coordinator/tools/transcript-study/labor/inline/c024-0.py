import pickle,collections,re
A=pickle.load(open('agents.pkl','rb'))
names=collections.Counter(); first=collections.Counter()
for a in A.values():
    for t in a['turns']:
        for c in t['calls']:
            names[c['name']]+=1
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                w=re.findall(r'[\w./-]+',cmd)[:2]
                first[' '.join(w[:1])]+=1
print(names.most_common())
print(first.most_common(60))
