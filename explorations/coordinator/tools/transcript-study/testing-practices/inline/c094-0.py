import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
seen=collections.defaultdict(list)
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']=='Bash' and c['res'] and 'is already declared' in c['res']:
                cmd=c['input'].get('command','')
                if re.search(r'fortress|harness|junit|\.sh',cmd) and not re.match(r'\s*(cat|sed|grep|head)\b',cmd):
                    m=re.search(r'.{0,80}is already declared.{0,40}',c['res'].replace('\n',' '))
                    seen[(tag,a['label'])].append((c['i'],m.group(0) if m else ''))
for k,v in seen.items(): print(k,len(v),v[0])
