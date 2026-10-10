import re
s=open('dump.py').read()
s=s.replace("""        if c['name']=='TEXT':
            continue""","""        if c['name']=='TEXT':
            tx=re.sub(r'\\s+',' ',c['input']['text'])
            print(f"   TEXT[{c['i']}]: {tx[:400]}")
            continue""")
open('dump.py','w').write(s)
import pickle,subprocess
allr=pickle.load(open('all.pkl','rb'))
for tag,ag in allr.items():
    for aid,a in ag.items():
        lab=a['label'].replace(':','_')
        out=subprocess.run(['python3','-I','dump.py',tag,aid,'320','220'],capture_output=True,text=True).stdout
        open(f'dumps/{tag}_{lab}_{aid[:6]}.txt','w').write(out)
