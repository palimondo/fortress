import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
runs=0; reads=0; ag=set()
for tag,ag_ in allr.items():
    for aid,a in ag_.items():
        for c in a['calls']:
            if c['name']=='Bash' and c['res'] and 'Turn on "-debug interpreter"' in c['res']:
                cmd=c['input'].get('command','')
                if re.match(r'\s*(cd [^;&]*&&\s*)?(cat|sed|grep|head)\b[^|;]*(Shell\.java|\.md|\.txt|Debug)',cmd) : reads+=1
                else: runs+=1; ag.add((tag,aid))
print(runs,reads,len(ag))
