import json
d=json.load(open('so-W.json'))
for k,v in d.items():
    s=json.dumps(v) if not isinstance(v,str) else v
    print('==',k,len(s))
    if k in('summary','precedentSearch','decisions','forPavol','stopsMet','defectHomes','divergences','notDone'):
        print(s[:3500])
