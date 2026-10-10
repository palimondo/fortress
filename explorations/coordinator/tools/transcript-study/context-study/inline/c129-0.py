import json,re,collections
def kind(k):
    return k.split(':')[0] if re.match(r'^(positions|ledger|doc|code|map|index|section|spec|ledger-find):',k) else 'facts'
tot=collections.defaultdict(lambda:[0,0,0,0,0,0])
per={}
for w in 'WNGC':
    rows=json.load(open(f'use-{w}.json'))
    p=collections.defaultdict(lambda:[0,0,0,0,0,0])
    for k,r1,r2,b in rows:
        for t in (tot,p):
            a=t[kind(k)]; a[0]+=1; a[1]+=b
            if r1: a[2]+=1; a[3]+=b
            if r2: a[4]+=1; a[5]+=b
    per[w]=p
print('| kind of key | keys | KB handed | named in its own calls before the fix edit: keys / KB | named anywhere in its calls or report: keys / KB |')
print('|---|---|---|---|---|')
order=['positions','ledger','doc','code','facts','map','index']
names={'positions':'POSITIONS entries (`positions:`)','ledger':'ledger rows (`ledger:`)','doc':'notes and specification sections (`doc:`)','code':'declarations (`code:`)','facts':'FACTS entries (by title)','map':'map section (`map:`)','index':'INDEX lines (`index:`)'}
T=[0]*6
for k in order:
    a=tot[k]
    if not a[0]: continue
    print(f'| {names[k]} | {a[0]} | {a[1]/1000:.1f} | {a[2]} / {a[3]/1000:.1f} | {a[4]} / {a[5]/1000:.1f} |')
    for i in range(6): T[i]+=a[i]
print(f'| all | {T[0]} | {T[1]/1000:.1f} | {T[2]} / {T[3]/1000:.1f} ({100*T[3]/T[1]:.0f}%) | {T[4]} / {T[5]/1000:.1f} ({100*T[5]/T[1]:.0f}%) |')
print()
for w in 'WNGC':
    a=[sum(v[i] for v in per[w].values()) for i in range(6)]
    print(w,'keys',a[0],'KB %.1f'%(a[1]/1000),'named before fix %d (%.0f%% of bytes)'%(a[2],100*a[3]/a[1]),'anywhere %d (%.0f%%)'%(a[4],100*a[5]/a[1]))
