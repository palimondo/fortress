import json,glob
for name,id in [('W','ac7f17fcef729d710'),('N','a9d085d2ca3d1673f'),('G','ad8b9ef1d620d222e'),('C','a17102eab231ad505')]:
    d=json.load(open(f'json/{id}.json'))
    ev=d['events']
    calls=[e for e in ev if e['k']=='call']
    big=[e for e in calls if 'tool-results' in e['res'] or 'saved to' in e['res'][:300] or 'Output too large' in e['res'][:300]]
    print(name,len(calls),'saved-output calls',len(big))
    from collections import Counter
    print(Counter(c['tool'] for c in calls))
    print('total result bytes',sum(c['rbytes'] for c in calls))
