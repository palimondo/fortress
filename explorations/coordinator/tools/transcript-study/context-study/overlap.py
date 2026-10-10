#!/usr/bin/env python3 -I
import re,json,sys,os
ids={'W':'ac7f17fcef729d710','N':'a9d085d2ca3d1673f','G':'ad8b9ef1d620d222e','C':'a17102eab231ad505'}
after={'W':13,'N':10,'G':6,'C':10}
fixedit={'W':76,'N':152,'G':109,'C':136}
def brief_ranges(w):
    txt=open(f'briefing-{w}.txt').read()
    rng={}
    for l in txt.split('\n'):
        m=re.match(r'^== (\S+?):(\d+)-(\d+)(?:,.*)?$',l)
        if m:
            rng.setdefault(m.group(1),[]).append((int(m.group(2)),int(m.group(3))))
    return rng
def norm(p):
    m=re.match(r'^/home/user/fortress[-a-z0-9]*/(.*)$',p)
    return m.group(1) if m else p
def reads(call,cwd0):
    """yield (relpath, a, b) line ranges read by a call; b None if whole file"""
    t=call['tool']; i=call['input']; out=[]
    if t=='Read':
        p=norm(i['file_path']); off=i.get('offset'); lim=i.get('limit')
        if off is None and lim is None: out.append((p,1,None))
        else:
            a=off or 1; b=a+(lim or 2000)-1; out.append((p,a,b))
    elif t=='Bash':
        c=i.get('command','')
        cwd=cwd0
        for seg in re.split(r'&&|;|\n',c):
            m=re.match(r'\s*cd\s+(\S+)',seg)
            if m:
                t2=m.group(1).strip('"')
                cwd=t2 if t2.startswith('/') else os.path.normpath(os.path.join(cwd,t2))
        # sed -n A,Bp FILE
        for m in re.finditer(r"sed\s+-n\s+['\"]?(\d+),(\d+)p['\"]?\s+(\S+)",c):
            f=m.group(3).strip('"\'')
            if f.startswith('-') or '|' in f: continue
            p=f if f.startswith('/') else os.path.join(cwd,f)
            out.append((norm(os.path.normpath(p)),int(m.group(1)),int(m.group(2))))
    return out
def main():
    for w in 'WNGC':
        d=json.load(open(f'json/{ids[w]}.json'))
        calls=[e for e in d['events'] if e['k']=='call' and after[w]<e['n']<fixedit[w]]
        br=brief_ranges(w)
        root={'W':'/home/user/fortress-walkmeet','N':'/home/user/fortress-numslips','G':'/home/user/fortress-genslips','C':'/home/user/fortress-checkdefects'}[w]
        tot=0;ov=0;byfile={}
        whole=0
        for c in calls:
            for (p,a,b) in reads(c,root):
                if b is None: whole+=1; continue
                n=b-a+1
                tot+=n
                o=0
                for (x,y) in br.get(p,[]):
                    o+=max(0,min(b,y)-max(a,x)+1)
                ov+=o
                if o: byfile.setdefault(p,[]).append((c['n'],a,b,o))
        print(f'== {w}: range reads before fix edit: {tot} lines; inside briefing-printed ranges: {ov} ({100*ov/max(tot,1):.1f}%); whole-file reads: {whole}')
        for p,v in byfile.items():
            print('   ',p.split('/')[-1],v[:6])
        # nearby: did the worker read adjacent lines of a printed range?
        print('   briefing ranges for files:',{k.split('/')[-1]:v for k,v in br.items() if k.startswith(('ProjectFortress','Library'))})
main()
