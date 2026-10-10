import pickle,re
briefs=pickle.load(open('briefs.pkl','rb'))
t=list(briefs.values())[0][1]
for kw in ['parallel','one message','single message','batch the','several commands','at once','think','thinking','effort','brief']:
    ms=[m.start() for m in re.finditer(kw,t)]
    print(kw,len(ms), [t[max(0,p-60):p+80].replace('\n',' ') for p in ms[:2]])
