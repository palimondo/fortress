import pickle,re
allr=pickle.load(open('all.pkl','rb'))
ws=re.compile(r'\s+')
for aid,a in allr['b9'].items():
    if a['label'] not in ('rung:R','rung:S'): continue
    print('###',a['label'],aid[:6])
    for c in a['calls']:
        if c['name']=='Bash':
            cmd=c['input'].get('command','')
            if 'harness-one' in cmd and not re.match(r'\s*(cat|sed|head|grep|ls|cp)\b',cmd):
                files=re.findall(r'[\w/]*tests/(\w+)\.fss',cmd)
                res=ws.sub(' ',c['res'] or '')
                m=re.search(r'(OK \(\d+ tests?\)|Tests run: \d+,\s+Failures: \d+)',res)
                tail=ws.sub(' ',cmd)[-150:]
                print('  [%d] files=%d %s :: %s'%(c['i'],len(set(files)),m.group(0) if m else '',tail))
