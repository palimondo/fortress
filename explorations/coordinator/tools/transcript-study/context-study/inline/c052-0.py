import json,re
d=json.load(open('json/ac7f17fcef729d710.json'))
calls={e['n']:e for e in d['events'] if e['k']=='call'}
txt=''
for n in (8,10,11,12,13):
    r=calls[n]['res']
    # strip leading line numbers of Read output
    lines=[re.sub(r'^\s*\d+\t?','',l,count=1) for l in r.split('\n')]
    txt+='\n'.join(lines)+'\n'
open('briefing-W.txt','w').write(txt)
print(len(txt))
for i,l in enumerate(txt.split('\n')):
    if l.startswith('== ') or l.startswith('facts-extract:') or l.startswith('Asked for'):
        print(i,l[:170])
