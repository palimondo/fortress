import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
who=collections.defaultdict(list)
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                if re.search(r'\bcp\b[^\n;&|]*(run-subset|run-ladder)\.sh',cmd) or re.search(r'sed[^\n]*-e?[^\n]*(LADDER_ROOT|OUT=)[^\n]*run-subset',cmd) or re.search(r'sed\s+(-e\s+)?[\'"]s[^\n]*LADDER_ROOT',cmd):
                    who[(tag,a['label'])].append(c['i'])
for k,v in who.items(): print(k,v)
