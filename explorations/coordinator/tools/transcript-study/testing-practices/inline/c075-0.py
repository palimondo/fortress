import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
hits=collections.defaultdict(list)
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                m=re.search(r'-debug\s+(\S+)',cmd)
                if m and re.search(r'fortress|walk|compile',cmd):
                    hits[(tag,a['label'])].append((c['i'],m.group(1)))
for k,v in hits.items(): print(k,v[:6])
# also "Turn on" hints in results
n=collections.Counter()
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']=='Bash' and c['res'] and 'Turn on "-debug interpreter"' in c['res']: n[(tag,a['label'])]+=1
print(sum(n.values()),len(n))
