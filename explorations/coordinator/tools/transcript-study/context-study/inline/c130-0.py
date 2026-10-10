import json
d=json.load(open('json/ac7f17fcef729d710.json'))
for e in d['events']:
    if e['k']=='call' and e['n'] in (41,112,113):
        print(e['n'],(e['input'].get('command') or '')[:420].replace('\n',' ⏎ '))
        r=e['res']; i=r.find('corpus.sh'); print('   RES tail:',r[-420:].replace('\n',' ⏎ '))
