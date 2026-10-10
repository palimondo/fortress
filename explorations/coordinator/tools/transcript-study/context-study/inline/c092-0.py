import json,sys
sys.path.insert(0,'.')
import classify as C
ids={'N':'a3efce1e24bbeda39','G':'a17fa6c49e2058f77','W':'a67eeefc52d0d3403','C':'a0870bca7f79bbd8d'}
for w,i in ids.items():
    d=json.load(open(f'json/{i}.json'))
    calls=[e for e in d['events'] if e['k']=='call']
    print('== skeptic',w,len(calls),'calls; brief',len(d['brief']),'chars; total writes',sum(t['input']+t['cc'] for t in d['turns'])//1000,'K')
    first=None
    for c in calls:
        tg=C.classify(c,C.ROOTS[w])
        if c['tool'] in('Edit','Write') or 'EDIT' in tg or 'RUN' in tg:
            first=c['n']; print('  first doing call',c['n'],c['tool'],(c['input'].get('command') or c['input'].get('file_path'))[:120].replace('\n',' ')); break
    print('  facts-extract calls:',sum(1 for c in calls if 'facts-extract' in c['input'].get('command','')),' first call text:',(calls[0]['input'].get('command') or '')[:150].replace('\n',' '))
