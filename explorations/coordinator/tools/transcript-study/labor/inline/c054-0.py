import pickle,collections
O=pickle.load(open('acct.pkl','rb')); A=pickle.load(open('agents.pkl','rb'))
def lines_of(txt): return [l.strip() for l in txt.split('\n') if len(l.strip())>=25]
BL={}   # aid -> dict line->chars
for aid,o in O.items():
    txt={c['id']:c.get('text','') for t in A[aid]['turns'] for c in t['calls']}
    d={}
    for c in o['calls']:
        if c['cls']=='read:kb:briefing':
            for l in lines_of(txt.get(c['id'],'')): d[l]=len(l)
    BL[aid]=d
def chain(o):
    l=o['label']
    return l.split(':')[1] if ':' in l and l.split(':')[0] in('rung','skeptic','skeptic2','judge','repair') and l.split(':')[1] in list('IQOMRKWS') else 'tail'
for batch in (8,9):
    ags=[o for o in O.values() if o['batch']==batch]
    cnt=collections.Counter()
    for o in ags:
        for l in BL[o['aid']]: cnt[l]+=1
    n_br=sum(1 for o in ags if BL[o['aid']])
    print('batch',batch,'agents with briefing',n_br)
    tot_chars=sum(sum(BL[o['aid']].values()) for o in ags)
    # lines in >=3 agents
    for k in (2,3,5,8):
        m=sum(len(l)*(c) for l,c in cnt.items() if c>=k)
        print('  lines read by >=%d agents: %.0fK tokens-ish total reads (0.4/char), of %.0fK'%(k,0.4*m/1000,0.4*tot_chars/1000))
    # unique mass
    uniq=sum(len(l) for l in cnt)
    print('  distinct briefing lines mass %.0fK tokens vs total read %.0fK'%(0.4*uniq/1000,0.4*tot_chars/1000))
    # chain overlap
    for o in ags:
        if o['role'] in('skeptic','judge','repair','skeptic2') and BL[o['aid']]:
            w=[x for x in ags if x['role']=='rung' and chain(x)==chain(o)]
            ws=set()
            for x in w: ws|=set(BL[x['aid']])
            mine=BL[o['aid']]; tot=sum(mine.values()); sh=sum(v for l,v in mine.items() if l in ws)
            print('   ',o['label'],'briefing %.1fK, of which also in its worker\'s briefing %.1fK (%.0f%%)'%(0.4*tot/1000,0.4*sh/1000,100*sh/tot if tot else 0))
