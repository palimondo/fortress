import json,re,sys
sys.path.insert(0,'.')
import classify as C, summarize as Z
after={'W':13,'N':10,'G':6,'C':10}
for w in 'WNGC':
    d=C.load(w)
    calls=[e for e in d['events'] if e['k']=='call' and e['n']>after[w]]
    def cnt(pat,upto):
        return [c['n'] for c in calls if c['n']<=upto and c['tool']=='Bash' and re.search(pat,c['input'].get('command',''))]
    B=Z.WIN[w][1]
    for name,pat in (('POSITIONS','POSITIONS|positions:'),('FACTS','FACTS\\.md|FACTS-history'),('INDEX','INDEX\\.md|index:'),('ledger','fortress-gap-ledger|ledger:'),('facts-extract','facts-extract'),('map','/map/|map:')):
        pre=cnt(pat,B); allc=cnt(pat,10**6)
        print(f'{w} {name:13s} before fix edit: {len(pre):3d} {pre[:12]} | whole run: {len(allc)}')
