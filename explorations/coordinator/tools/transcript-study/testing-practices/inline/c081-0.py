import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','gather','review','commit'): continue
        items=[]
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                if re.search(r'FileTests\.java|SystemJUTest\.java|CompilerJUTest\.java',cmd) and re.match(r'\s*(cd [^;&]*&&\s*)?(cat|sed|head|grep)',cmd):
                    cm=re.sub(r'\s+',' ',cmd)
                    cm=re.sub(r'^cd \S+ && ','',cm)
                    items.append((c['i'],cm[:170]))
        if items:
            print('##',tag,a['label'],len(items))
            for i,cm in items[:5]: print('   ',i,cm)
