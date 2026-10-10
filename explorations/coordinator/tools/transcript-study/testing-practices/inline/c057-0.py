import pickle,re,collections
allr=pickle.load(open('all.pkl','rb'))
def secs(s):
    m=re.search(r'Total time: (?:(\d+) minutes? )?(\d+) seconds?',s)
    if m: return int(m.group(1) or 0)*60+int(m.group(2))
rows=collections.defaultdict(list)
for tag,ag in allr.items():
    for aid,a in ag.items():
        seen=set()
        for c in a['calls']:
            if c['name']=='Bash' and c['res']:
                for m in re.finditer(r'(BUILD (?:SUCCESSFUL|FAILED))\s*(?:\d+:)?\s*Total time: (?:(\d+) minutes? )?(\d+) seconds?',c['res']):
                    t=int(m.group(2) or 0)*60+int(m.group(3))
                    key=(m.group(1),t)
                    if key in seen: continue
                    seen.add(key)
                    rows[tag].append((a['label'],m.group(1),t,c['i']))
for tag in rows:
    print('==',tag)
    for r in rows[tag]: print('  ',r)
