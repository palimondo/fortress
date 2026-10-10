import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
c1=collections.Counter()
allmoved=0; moved_wait=0
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            moved=bool(c['res'] and 'moved to the background' in c['res'])
            allmoved+=moved
            m=re.findall(r'wait_for\s+\S+\s+(\d+)',cmd)
            if m:
                w=max(int(x) for x in m); to=c['input'].get('timeout')
                key=('w>=120' if w>=120 else 'w<120','timeout' if to else 'no-timeout','moved' if moved else 'ok')
                c1[key]+=1
                if moved: moved_wait+=1
print(sorted(c1.items())); print('all moved',allmoved,'moved wait_for',moved_wait)
# timeouts values when set
vals=collections.Counter()
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']=='Bash' and c['input'].get('timeout'):
                vals[c['input']['timeout']]+=1
print(sorted(vals.items())[:12])
