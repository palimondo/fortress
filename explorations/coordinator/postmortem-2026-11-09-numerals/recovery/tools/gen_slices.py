import sys, json, re
sys.path.insert(0, '/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/recovery/tools')
from rd import *
OUT='/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/recovery/slices/'
W0='2026-11-08T10:30:55'
FENCE='``````'
ents=[]   # (line, ts, role, text, extra)
alltexts=[]  # all coordinator text before, for quote search: (line, ts, text)
nhis=0
for i,d in lines():
    ts=d.get('timestamp') or ''
    k=kind(d)
    if k=='asst':
        s=asst_text(d)
        if s.strip() and s.strip()!='.' : alltexts.append((i,ts,s))
        if ts>=W0:
            for x in d['message']['content']:
                if x.get('type')=='thinking' and x.get('thinking'):
                    ents.append((i,ts,'coordinator',x['thinking'].strip(),'upd'))
        if ts>=W0 or i==2869:
            if s.strip() and s.strip()!='.': ents.append((i,ts,'coordinator',s,'' if ts>=W0 else 'pre'))
            for t in tool_uses(d):
                n=t['name']; inp=t['input']
                if n in ('Agent','Workflow','SendMessage','TaskStop'):
                    desc=inp.get('description') or inp.get('scriptPath') or ''
                    to=inp.get('to') or inp.get('task_id') or ''
                    ents.append((i,ts,'call',f"[{n} call{(' to '+to) if to else ''}{(': '+desc) if desc else ''}{(' | model '+inp['model']) if inp.get('model') else ''}] (input in briefs files; see INDEX.md)",''))
    elif i==2851 and k=='his':
        ents.append((i,ts,'CURATOR',his_text(d),'before the window'))
    elif ts>=W0 and k=='his':
        nhis+=1
        ents.append((i,ts,'CURATOR',his_text(d),nhis))
    elif ts>=W0 and k=='compact':
        ents.append((i,ts,'marker','[COMPACTION: the summary the harness wrote is on this line; its numeral part is in compaction-summaries.md]',''))
    elif ts>=W0 and k.startswith('harness:<command-name>'):
        s=his_text(d); m=re.search(r'<command-name>(.*?)</command-name>',s); a=re.search(r'<command-args>(.*?)</command-args>',s,re.S)
        ents.append((i,ts,'marker',f'[slash command {m.group(1) if m else "?"} {a.group(1).strip() if a else ""}] (typed by the curator)',''))
    elif ts>=W0 and k.startswith('harness:[Request interrupted'):
        ents.append((i,ts,'marker','[Request interrupted by user] (harness marker: the stop button)',''))
# quote sources
def norm(x):
    x=re.sub(r'[`*]','',x); x=re.sub(r'[_\u2022\t]',' ',x); x=x.replace('\u2019',"'").replace('\u201c','"').replace('\u201d','"')
    return re.sub(r'\s+',' ',x).strip()
def find_quote(q, before):
    q=norm(q).rstrip('\u2026').rstrip('.')
    if len(q)<12: return []
    keys=[q[:40], q[len(q)//2:len(q)//2+30]] if len(q)>60 else [q[:40]]
    hits=[]
    for i,ts,s in alltexts:
        if i>=before: break
        ns=norm(s)
        if any(k in ns for k in keys): hits.append((i,ts))
    return hits[-2:]
def fmt(e):
    i,ts,role,s,n=e
    if role=='CURATOR':
        h=f"### L{i} · {ts[:19]}Z · CURATOR ({'his message before the window, for context' if isinstance(n,str) else 'his message '+str(n)+' of 82 in the window'})\n"
        qs=[l[1:].strip() for l in s.split('\n') if l.startswith('>')]
        notes=[]
        for q in qs:
            hits=find_quote(q,i)
            if hits: notes.append(f"quotes coordinator text at " + ', '.join(f'L{a} ({b[11:19]}Z)' for a,b in hits) + f': "{q[:70]}"')
            elif len(q)>=12: notes.append(f'quoted text not found in the coordinator\'s own text before this line: "{q[:70]}"')
        if notes: h+='\n'.join('- '+x for x in notes)+'\n'
        return h+FENCE+'\n'+s+'\n'+FENCE+'\n\n'
    if role=='coordinator':
        return f"### L{i} · {ts[:19]}Z · coordinator{' (before the window: the passage his first message in the window answers)' if n=='pre' else (' (text of a thinking block whose display mode is `updates`, which the client shows; his message at 13:30:58, L6436, quotes the one at L6407)' if n=='upd' else '')}\n{FENCE}\n{s}\n{FENCE}\n\n"
    return f"- L{i} · {ts[:19]}Z · {s}\n\n"
blocks=[(e,fmt(e)) for e in ents]
json.dump([[e[0],e[1],e[2]] for e in ents],open(OUT+'../tools/ents.json','w'))
# split into files <= ~95KB at a curator-message boundary (start a file before a coordinator block following a curator msg)
files=[]; cur=[]; size=0
for idx,(e,b) in enumerate(blocks):
    bs=len(b.encode())
    if size+bs>95000 and cur and cur[-1][0][2]=='CURATOR':
        files.append(cur); cur=[]; size=0
    cur.append((e,b)); size+=bs
if cur: files.append(cur)
summary=[]
for f in files:
    a=f[0][0][1][:16].replace(':',''); z=f[-1][0][1][:16].replace(':','')
    name=f"dialogue_{a}Z_to_{z}Z.md"
    nh=sum(1 for e,b in f if e[2]=='CURATOR' and e[4]!='before the window')
    head=(f"# Dialogue, {f[0][0][1][:19]}Z to {f[-1][0][1][:19]}Z (main coordinating session)\n\n"
          f"Source: `{J}`. L = 1-based line of the .jsonl (sed -n 'Np'); view.py and his-messages.md count from 0, one less. "
          f"Every curator message in this span ({nh}) and every text the coordinator wrote to him, verbatim, in order. "
          "Tool calls appear as one-line markers; their inputs are in the briefs files. Tool results are left out. "
          "A curator message that quotes earlier text carries a note naming the line it quotes.\n\n")
    open(OUT+name,'w').write(head+''.join(b for e,b in f))
    summary.append((name,f[0][0][0],f[-1][0][0],f[0][0][1],f[-1][0][1],nh,len((head+''.join(b for e,b in f)).encode())))
for s in summary: print(s)
print('his total',nhis)
