import sys
sys.path.insert(0,'.')
import classify as C, summarize as Z
for w in 'WNGC':
    d=C.load(w); calls=[e for e in d['events'] if e['k']=='call' and e['n']<=Z.WIN[w][1]]
    print('==',w)
    for c in calls:
        tg=Z.OVR[w].get(c['n']) or C.classify(c,C.ROOTS[w])
        if any(t in tg for t in('RNOTES','TOOLS','GIT','RCORE')) and 'BRIEFING' not in tg and 'EDIT' not in tg:
            s=(c['input'].get('command') or c['input'].get('file_path') or '')
            print(' %3d %-14s %6dB %s'%(c['n'],'+'.join(tg),c['rbytes'],' '.join(s.split())[:170]))
