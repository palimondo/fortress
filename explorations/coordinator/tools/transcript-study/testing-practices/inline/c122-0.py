import pickle,re
allr=pickle.load(open('all.pkl','rb'))
for aid,a in allr['b10'].items():
    if a['label']=='gate':
        t=a['first_user'].replace('\\n','\n')
        print(len(t))
        for pat in ['gate_summary','gate_compare','ladder_compare','atomic','run-subset','helpers','microgpt-phase','checker_compare']:
            print(pat, len(re.findall(pat,t)))
        i=t.find('gate_summary'); print(t[max(0,i-600):i+900])
