import re,random,collections
src=open('practices.py').read().split("for n in sorted(P):")[0]
exec(src)
random.seed(3)
samples=collections.defaultdict(list)
for tag,ag in allr.items():
    for aid,a in ag.items():
        role=a['label'].split(':')[0]
        if role in('gate','commit','gather','review','judge'): continue
        for k,c in enumerate(a['calls']):
            if c['name']!='Bash': continue
            cmd=c['input'].get('command','')
            parts=re.split(r'&&|;',cmd)
            for p_ in parts:
                if READ.match(p_):
                    for kd,r in READ_ART.items():
                        if re.search(r,p_): samples['read:'+kd].append((tag,a['label'],c['i'],re.sub(r'\s+',' ',p_)[:150]))
            for m in rxcreate.finditer(cmd):
                kd=kind_of_body(m.group(3)); samples['make:'+kd].append((tag,a['label'],c['i'],m.group(1).split('/')[-1]+' :: '+re.sub(r'\s+',' ',m.group(3))[:110]))
for k in ['read:stage','make:stage']:
    print('##',k,len(samples[k]))
    for s in random.sample(samples[k],min(14,len(samples[k]))): print('  ',s)
