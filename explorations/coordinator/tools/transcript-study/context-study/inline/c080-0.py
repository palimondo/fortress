import json
for w in 'NGC':
    d=json.load(open(f'so-{w}.json'))
    print('=====',w)
    for k in ('decisions','precedentSearch','stopsMet','forPavol'):
        v=d.get(k)
        s=json.dumps(v,ensure_ascii=False) if not isinstance(v,str) else v
        print('--',k,len(s)); print(s[:2600])
