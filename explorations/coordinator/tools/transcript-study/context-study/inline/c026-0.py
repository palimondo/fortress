import json
for id in ['ac7f17fcef729d710','a9d085d2ca3d1673f','ad8b9ef1d620d222e','a17102eab231ad505']:
    n=0;ne=0;tot=0;texts=0;textchars=0
    for l in open(f'agent-{id}.jsonl'):
        d=json.loads(l)
        if d['type']=='assistant':
            for b in d['message']['content']:
                if b['type']=='thinking':
                    n+=1
                    if b.get('thinking'): ne+=1; tot+=len(b['thinking'])
                if b['type']=='text': texts+=1; textchars+=len(b['text'])
    print(id,'thinking blocks',n,'nonempty',ne,tot,'text blocks',texts,textchars)
