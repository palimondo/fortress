
import json
for w in 'NGC':
    print(w,[k for k in json.load(open('keys-%s.json'%w)) if k[0].startswith('map')])
