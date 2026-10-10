import pickle,re
allr=pickle.load(open('all.pkl','rb'))
pat=re.compile(r'Unable to read serialized|NoSuchMethodError|NoClassDefFoundError')
for tag,label in [('b8','skeptic:I'),('b8','rung:O'),('b9','skeptic:W'),('b9','skeptic2:W'),('b8','rung:I')]:
    for aid,a in allr[tag].items():
        if a['label']!=label: continue
        print('###',tag,label)
        calls=a['calls']
        for k,c in enumerate(calls):
            if c['name']=='Bash' and c['res'] and pat.search(c['res']):
                # find the next TEXT or next 2 Bash commands
                nxt=[]
                for d in calls[k+1:k+4]:
                    if d['name']=='TEXT': nxt.append('TEXT: '+d['input']['text'][:200])
                    elif d['name']=='Bash': nxt.append('CMD: '+re.sub(r'\s+',' ',d['input'].get('command',''))[:170])
                m=pat.search(c['res'])
                print(f" [{c['i']}] {re.sub(chr(10),' ',c['res'][max(0,m.start()-60):m.start()+110])}")
                for x in nxt[:2]: print('       ',x)
