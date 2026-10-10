
import json
types={}
for l in open('$f'):
    d=json.loads(l)
    k=(d.get('type'),)
    types[k]=types.get(k,0)+1
print(types)

