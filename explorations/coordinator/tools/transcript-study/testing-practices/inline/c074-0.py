import pickle,re,datetime,collections
allr=pickle.load(open('all.pkl','rb'))
def ts(s): return datetime.datetime.fromisoformat(s.replace('Z','+00:00'))
stages={'checker-count':r'checker-count/run\.sh','distance':r'distance/run\.sh|dev-check\.sh|devcheck','ladder':r'run-subset\.sh|run-ladder\.sh','mgphase':r'microgpt-phase\.sh','count-run':r'count-run\.sh'}
rows=[]
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in ('gate','gather','review','commit','judge'): continue
        d={}
        for k,p in stages.items():
            execs=[c for c in a['calls'] if c['name']=='Bash' and re.search(p,c['input'].get('command','')) and not re.match(r'\s*(cat|sed|head|grep|ls|wc|tail)\b',c['input'].get('command',''))]
            if execs:
                d[k]=len(execs)
        if d: rows.append((tag,a['label'],d))
for r in rows: print(r)
