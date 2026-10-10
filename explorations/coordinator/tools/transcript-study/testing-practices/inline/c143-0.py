import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for tag,aid in [('b10','a9d085d2ca3d1673f'),('b9','a96efb9f64cf35a36')]:
    t=allr[tag][aid]['first_user'].replace('\\n','\n')
    print(tag,len(t))
    for m in re.finditer(r'[^\n]*(harness-one|junit\.sh)[^\n]*',t):
        print('  ',m.group(0).strip()[:400])
