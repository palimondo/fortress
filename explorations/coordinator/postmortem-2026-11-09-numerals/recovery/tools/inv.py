import json, os, re, glob, sys
sys.path.insert(0, os.path.dirname(__file__))
from rd import strip_sr, HARNESS
ROOT='/root/.claude/projects'; W='2026-11-08T10:30:55'
out=[]
for dp, dn, fn in os.walk(ROOT):
    for f in fn:
        if not f.endswith('.jsonl'): continue
        p=os.path.join(dp,f); n=0; tmin='9'; tmax=''; first=None; inwin=0; firsthis=None; models=set()
        with open(p) as fh:
            for l in fh:
                n+=1
                try: d=json.loads(l)
                except Exception: continue
                ts=d.get('timestamp') or d.get('ts') or ''
                if isinstance(ts,(int,float)): ts=''
                if ts:
                    tmin=min(tmin,ts); tmax=max(tmax,ts)
                    if ts>=W: inwin+=1
                m=d.get('message') or {}
                if d.get('type')=='assistant' and m.get('model'): models.add(m['model'])
                if first is None and d.get('type')=='user':
                    c=m.get('content')
                    s=c if isinstance(c,str) else '\n'.join(x.get('text','') for x in c or [] if isinstance(x,dict) and x.get('type')=='text')
                    s=strip_sr(s)
                    if s: first=s
                if firsthis is None and d.get('type')=='user' and (d.get('origin') or {}).get('kind')=='human' and not d.get('isMeta'):
                    c=m.get('content'); s=c if isinstance(c,str) else '\n'.join(x.get('text','') for x in c or [] if isinstance(x,dict) and x.get('type')=='text')
                    s=strip_sr(s)
                    if s and not any(s.startswith(h) for h in HARNESS): firsthis=s
        meta={}
        mp=p[:-6]+'.meta.json'
        if os.path.exists(mp):
            try: meta=json.load(open(mp))
            except Exception: pass
        out.append(dict(path=p,size=os.path.getsize(p),lines=n,tmin=tmin if tmin!='9' else '',tmax=tmax,inwin=inwin,first=(first or '')[:600],firsthis=(firsthis or '')[:300],desc=meta.get('description',''),model=meta.get('model',''),effort=meta.get('effort',''),models=sorted(models)))
json.dump(out,open(os.path.join(os.path.dirname(__file__),'inv.json'),'w'),indent=0)
print(len(out), sum(1 for o in out if o['inwin']))
