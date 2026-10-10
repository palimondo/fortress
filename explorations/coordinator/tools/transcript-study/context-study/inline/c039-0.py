import json
for name,id in [('W','ac7f17fcef729d710'),('N','a9d085d2ca3d1673f'),('G','ad8b9ef1d620d222e'),('C','a17102eab231ad505')]:
    d=json.load(open(f'json/{id}.json'))
    calls=[e for e in d['events'] if e['k']=='call']
    for c in calls:
        if c['tool']=='Write':
            p=c['input']['file_path']; txt=c['input']['content']
            fn=f"w-{name}-{c['n']}-{p.split('/')[-1]}"
            open(fn,'w').write(txt)
            print(name,c['n'],p.split('fortress-')[-1],len(txt))
        if c['tool']=='StructuredOutput':
            open(f'so-{name}.json','w').write(json.dumps(c['input'],indent=1))
            print(name,'SO',len(json.dumps(c['input'])), list(c['input'].keys()))
