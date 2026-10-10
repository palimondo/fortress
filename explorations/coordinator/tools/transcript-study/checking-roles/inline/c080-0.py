import json
res=json.load(open('results10.json'))
for k in ['judge:N','judge:C','judge:G']:
    r=res[k]
    ins=sum(len(i) for i in r['instructions'])
    print(k,'ruling',len(r['ruling']),'spec',len(r['specRuling']),'instructions',len(r['instructions']),ins,'summary',len(r['summary']),'total',len(r['ruling'])+len(r['specRuling'])+ins+len(r['summary']))
for k in ['skeptic:N','skeptic:C','skeptic:W','skeptic:G']:
    r=res[k]; print(k,'skepticText',len(r['skepticText']) if isinstance(r['skepticText'],str) else r['skepticText'], 'findings',len(r['findings']), 'requiredCorrections',len(r['requiredCorrections']))
