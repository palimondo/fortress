import pickle,re
allr=pickle.load(open('all.pkl','rb'))
ws=re.compile(r'\s+')
for aid,a in allr['b10'].items():
    if a['label']!='rung:C': continue
    for c in a['calls']:
        if c['name']=='Bash' and c['i']>=257 and re.search(r'tracks',c['input'].get('command','')+(c['res'] or '')[:300]):
            res=ws.sub(' ',c['res'] or '')
            m=re.search(r'(OK \(\d+ tests\)|Time: [\d.]+|FAILURES)',res)
            print(c['i'],c['ts'][11:19],ws.sub(' ',c['input']['command'])[:140],'->',res[:150], m.group(0) if m else '')
