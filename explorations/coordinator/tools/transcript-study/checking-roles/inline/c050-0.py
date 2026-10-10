import json
res=json.load(open('results10.json'))
for k in ['skeptic:N','skeptic:C','skeptic:G']:
    r=res[k]; print('=====',k,'approved',r['approved']); print(r['refusalReason'])
    print('requiredCorrections',len(r['requiredCorrections']),'findings',len(r['findings']))
for k in ['judge:C','judge:G']:
    r=res[k]; print('=====',k,r['kind'],r['decision']); print(r['summary'])
