import json
d=json.load(open('json/ac7f17fcef729d710.json'))
for e in d['events']:
    if e['k']=='call' and e['n'] in (14,15,48,66,67,68):
        print('#',e['n'],e['input'].get('command','')[:700].replace('\n',' ⏎ '))
        print('   RES:',e['res'][:300].replace('\n',' ⏎ '))
