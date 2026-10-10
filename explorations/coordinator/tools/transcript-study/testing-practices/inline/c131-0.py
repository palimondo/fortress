import pickle,re
allr=pickle.load(open('all.pkl','rb'))
rx=re.compile(r"cat\s*>\s*(\S+\.sh)\s*<<\s*'?\"?(\w+)'?\"?\n(.*?)\n\2\n",re.S)
for tag in ['b8','b9','b10']:
    for aid,a in allr[tag].items():
        if a['label'].startswith('gate'):
            tot=0;names=[]
            for c in a['calls']:
                if c['name']=='Bash':
                    for m in rx.finditer(c['input'].get('command','')):
                        tot+=len(m.group(3)); names.append(m.group(1).split('/')[-1])
            print(tag,a['label'],names,tot)
