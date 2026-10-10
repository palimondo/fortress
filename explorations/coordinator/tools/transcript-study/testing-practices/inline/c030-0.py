import pickle,re
allr=pickle.load(open('all.pkl','rb'))
rx=re.compile(r"cat\s*>\s*(\S+\.sh)\b|tee\s+(\S+\.sh)|chmod \+x\s+(\S+)")
for tag,ag in allr.items():
    print('==',tag)
    for aid,a in ag.items():
        names=[]
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                for m in rx.finditer(cmd):
                    n=[x for x in m.groups() if x][0]
                    names.append((c['i'],n.split('/')[-1]))
            elif c['name']=='Write':
                p=c['input'].get('file_path','')
                if p.endswith('.sh') or p.endswith('.py'):
                    names.append((c['i'],'Write:'+p.split('/')[-1]))
        if names and a['label'].split(':')[0] in('rung','skeptic','repair','skeptic2','gate','gather','commit','review','judge'):
            print(a['label'],names[:14])
