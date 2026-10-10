import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
n=0
for tag,ag in allr.items():
    for aid,a in ag.items():
        for c in a['calls']:
            if c['name']=='Bash' and c['res'] and re.search(r'fortress[0-9a-z]*rats|rats.*No such file|Parser.*not found|RatsUtil',c['res']) and re.search(r'No such file|cannot|Exception|Error',c['res']):
                m=re.search(r'.{120}fortress[0-9a-z]*rats.{120}',c['res'].replace('\n',' '))
                n+=1
                print(tag,a['label'],c['i'],re.sub(r'\s+',' ',c['input'].get('command',''))[:120],'|',m.group(0) if m else '')
print(n)
# count source env.sh without private
cnt=collections.Counter()
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        for c in a['calls']:
            if c['name']=='Bash':
                cmd=c['input'].get('command','')
                if re.search(r'source\s+(\S*/)?explorations/experiment/env\.sh|\.\s+\S*experiment/env\.sh',cmd): cnt[(tag,role)]+=1
print(sorted(cnt.items()))
