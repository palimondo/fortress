import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
rx=re.compile(r"cat\s*>>?\s*(\S+\.py)\s*<<\s*'?\"?(\w+)'?\"?\n(.*?)\n\2\n",re.S)
res=collections.defaultdict(list)
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','commit','review'): continue
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                for m in rx.finditer(cmd):
                    body=m.group(3)
                    if re.search(r'git diff|difflib|hunk|@@|base.*head|shift|line',body,re.I) and re.search(r'classify|distance|site|\.tsv|errors',body,re.I):
                        res[(tag,a['label'])].append((c['i'],m.group(1).split('/')[-1]))
            elif c['name']=='Write':
                p=c['input'].get('file_path','')
                if p.endswith('.py'):
                    body=c['input'].get('content','')
                    if re.search(r'git diff|difflib|hunk|@@|shift|line',body,re.I) and re.search(r'classify|distance|site|\.tsv|errors',body,re.I):
                        res[(tag,a['label'])].append((c['i'],'W:'+p.split('/')[-1]))
for k,v in res.items(): print(k,v)
