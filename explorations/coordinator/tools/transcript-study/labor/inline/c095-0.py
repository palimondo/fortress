import pickle,re
O=pickle.load(open('acct.pkl','rb'))
n=0
for o in O.values():
    for c in o['calls']:
        s=str(c['input'])
        if re.search(r'INDEX\.md',s) and not re.search(r'check-index|grep -n .*INDEX',s[:0]):
            n+=1; print(o['batch'],o['label'],c['cls'],s[:140].replace('\n',' '))
print(n)
