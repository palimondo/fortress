import pickle,re,sys
allr=pickle.load(open('all.pkl','rb'))
tag,label,i0,i1=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4])
cw=int(sys.argv[5]) if len(sys.argv)>5 else 400
rw=int(sys.argv[6]) if len(sys.argv)>6 else 300
n=0
for aid,a in allr[tag].items():
    if a['label']!=label and not aid.startswith(label): continue
    n+=1
    if n>1 and a['label']==label: 
        # duplicates (b9 rung W/S twice): print marker
        print('#### second agent with label',aid)
    print('####',aid,a['label'])
    for c in a['calls']:
        if i0<=c['i']<=i1:
            if c['name']=='TEXT':
                print(f"TEXT[{c['i']}] {c['input']['text'][:cw]}"); continue
            if c['name']=='Bash':
                cm=re.sub(r'\s+',' ',c['input'].get('command',''))
            else:
                cm=c['name']+' '+re.sub(r'\s+',' ',str(c['input']))[:cw]
            res=re.sub(r'\s+',' ',c['res'] or '')
            tail=(' ... '+res[-int(rw*0.6):]) if len(res)>rw*1.6 else ''
            print(f"[{c['i']} {c['ts'][11:19]}{' ERR' if c['err'] else ''}] {cm[:cw]}\n    -> {res[:rw]}{tail}")
