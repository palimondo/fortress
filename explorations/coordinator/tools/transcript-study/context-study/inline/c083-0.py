import json,re
for w in 'WNGC':
    d=json.load(open(f'so-{w}.json'))
    rt=d['recordText']
    open(f'recordText-{w}.md','w').write(rt)
    open(f'reportText-{w}.md','w').write(d['reportText'])
    print('=====',w,len(rt),len(d['reportText']))
    for m in re.finditer(r'^(#+ .*)$',rt,re.M): print('  ',m.group(1)[:140])
