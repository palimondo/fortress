import json
d=json.load(open('json/ac7f17fcef729d710.json'))
for e in d['events']:
    if e['k']=='call' and e['n'] in (35,42,13,10,12):
        print(e['n'],e['ts'][11:19],e['tool'],(e['input'].get('command') or e['input'].get('file_path'))[:90].replace('\n',' '))
