import json,datetime as dt,sys
sys.path.insert(0,'.')
import classify as C, summarize as Z
def t(s): return dt.datetime.fromisoformat(s.replace('Z','+00:00'))
for w in 'WNGC':
    d=C.load(w); ev=d['events']; calls=[e for e in ev if e['k']=='call']
    t0=t(ev[0]['ts']); t1=t(ev[-1]['ts'])
    a=next(c for c in calls if c['n']==Z.WIN[w][0]+1); b=next(c for c in calls if c['n']==Z.WIN[w][1]+1)
    print(w,'calls',len(calls),'turns',len(d['turns']),'start',ev[0]['ts'][11:19],'end',ev[-1]['ts'][11:19],'min %.0f'%((t1-t0).total_seconds()/60),
      '| first edit call',a['n'],a['ts'][11:19],'(+%.1f min)'%((t(a['ts'])-t0).total_seconds()/60),'| fix edit call',b['n'],b['ts'][11:19],'(+%.1f min)'%((t(b['ts'])-t0).total_seconds()/60),
      '| writes total %dK'%(sum(x['input']+x['cc'] for x in d['turns'])//1000))
