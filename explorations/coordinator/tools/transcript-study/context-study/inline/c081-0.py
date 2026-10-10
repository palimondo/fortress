import json
ids={'W':'ac7f17fcef729d710','N':'a9d085d2ca3d1673f','G':'ad8b9ef1d620d222e','C':'a17102eab231ad505'}
for w,i in ids.items():
    d=json.load(open(f'json/{i}.json'))
    print('=====',w)
    for e in d['events']:
        if e['k']=='text':
            print(' TEXT t%d: %s'%(e['turn'],e['text'][:300].replace('\n',' ')))
        elif e['k']=='call' and e['tool']=='TaskCreate':
            print(' TASK #%d: %s'%(e['n'],json.dumps(e['input'])[:600]))
        elif e['k']=='call' and e['tool']=='Bash' and 'git commit' in e['input'].get('command','') and e['n']<=160:
            c=e['input']['command']
            k=c.index('git commit')
            print(' COMMIT #%d: %s'%(e['n'],' '.join(c[k:k+900].split())))
