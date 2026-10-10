import pickle,re,os
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byl={lab[a]:BR[a] for a in lab}
t=byl['judge:N'][48363:145546]
lines=t.split('\n')
pos=0
for ln in lines:
    s=ln.strip()
    if (s.endswith(':') and len(s)<120 and not s.startswith('"')) or s.startswith('The ') and len(s)<100 or re.match(r'^"[A-Za-z]+": ',s) and len(ln)>2000:
        print(pos,len(ln),s[:110])
    pos+=len(ln)+1
