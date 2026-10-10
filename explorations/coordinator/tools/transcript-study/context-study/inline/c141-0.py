import json
for w in 'CG':
    ks=json.load(open(f'keys-{w}.json'))
    print(w,[k[0][:70] for k in ks if k[0].startswith('"')])
