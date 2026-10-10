import json,re,collections
def kind(k):
    return k.split(':')[0] if re.match(r'^(positions|ledger|doc|code|map|index|section|spec|ledger-find):',k) else 'facts'
tot=collections.defaultdict(lambda:[0,0,0,0,0,0])
for w in 'WNGC':
    for k,r1,r2,b in json.load(open(f'use-{w}.json')):
        a=tot[kind(k)]; a[0]+=1; a[1]+=b
        if r1: a[2]+=1; a[3]+=b
        if r2: a[4]+=1; a[5]+=b
order=['positions','ledger','doc','code','facts','map','index']
names={'positions':'POSITIONS entries (`positions:`)','ledger':'ledger rows (`ledger:`)','doc':'notes and specification sections (`doc:`)','code':'declarations (`code:`)','facts':'FACTS entries, by title','map':'map section (`map:`)','index':'INDEX lines (`index:`)'}
out=['| kind of key | keys | KB handed | named in the worker\'s own calls before the fix edit | named anywhere, report included |','|---|---|---|---|---|']
T=[0]*6
for k in order:
    a=tot[k]
    if not a[0]: continue
    out.append(f'| {names[k]} | {a[0]} | {a[1]/1000:.1f} | {a[2]} keys, {a[3]/1000:.1f} KB | {a[4]} keys, {a[5]/1000:.1f} KB |')
    for i in range(6): T[i]+=a[i]
out.append(f'| all | {T[0]} | {T[1]/1000:.1f} | {T[2]} keys, {T[3]/1000:.1f} KB ({100*T[3]/T[1]:.0f}%) | {T[4]} keys, {T[5]/1000:.1f} KB ({100*T[5]/T[1]:.0f}%) |')
open('table-U.md','w').write('\n'.join(out)+'\n')
print('\n'.join(out))
