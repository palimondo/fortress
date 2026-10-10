import json
for w in 'WNGC':
    d=json.load(open(f'so-{w}.json'))
    def n(k):
        v=d.get(k)
        return len(v) if isinstance(v,list) else (1 if v else 0)
    print(w,{k:n(k) for k in ('decisions','divergences','forPavol','stopsMet','defectHomes','notDone','historicalFiles','specCitations')}, 'filesChanged',n('filesChanged'))
