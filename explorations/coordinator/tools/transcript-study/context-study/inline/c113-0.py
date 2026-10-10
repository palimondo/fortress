import json
ks=json.load(open('keys-G.json'))
print([k[0][:40] for k in ks if k[0].startswith('ledger')])
ks=json.load(open('keys-C.json'))
print([k[0][:40] for k in ks if k[0].startswith('ledger')])
ks=json.load(open('keys-N.json'))
print([k[0][:40] for k in ks if k[0].startswith('ledger')])
