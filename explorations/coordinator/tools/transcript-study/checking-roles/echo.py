import json,re,pickle,collections,sys
BD='/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows/wf_d5ec6194-bcc'
lab,BR=pickle.load(open('briefs10.pkl','rb'))
byid={v:k for k,v in lab.items()}
def texts(aid):
    out=[];res=[]
    seen=set()
    for l in open(f'{BD}/agent-{aid}.jsonl'):
        d=json.loads(l)
        if d['type']=='assistant':
            for b in d['message']['content']:
                if b['type']=='text': out.append(b['text'])
                elif b['type']=='tool_use': out.append(json.dumps(b['input']))
        elif d['type']=='user':
            c=d['message']['content']
            if isinstance(c,list):
                for b in c:
                    if b.get('type')=='tool_result':
                        cc=b.get('content')
                        if isinstance(cc,list): cc='\n'.join(x.get('text','') for x in cc if isinstance(x,dict))
                        res.append(cc or '')
    return '\n'.join(out),'\n'.join(res)
PATH=re.compile(r'[A-Za-z0-9_./-]*?([A-Za-z0-9_-]+\.(?:fss|fsi|tex|scala|java|md|tsv|test|sh)(?::\d+)?)')
IDENT=re.compile(r'\b[A-Za-z][A-Za-z0-9_]{6,}\b')
def toks(s):
    T=set()
    for m in PATH.finditer(s): T.add(m.group(1))
    for m in IDENT.finditer(s):
        w=m.group(0)
        if re.search(r'[A-Z]',w[1:]) or '_' in w or re.search(r'\d',w): T.add(w)
    for m in re.finditer(r'\brows? (\d{3})\b',s): T.add('row'+m.group(1))
    for m in re.finditer(r'`([^`\n]{6,60})`',s): T.add(m.group(1))
    return T
def unesc(s): return s.replace('\\n','\n').replace('\\"','"').replace('\\\\','\\')
def blocks_judge(t):
    i=t.index('## What is already known'); j=t.index('## What to read')
    prefix=t[:t.index('# Your role')]
    cur='head'; B=collections.OrderedDict()
    for ln in t[i:j].split('\n'):
        s=ln.strip()
        if s.startswith("The worker's structured report"): cur='W'; continue
        if s.startswith("The skeptic's structured verdict"): cur='S'; continue
        m=re.match(r'^"(\w+)": ',s)
        key=None
        if m and ln.startswith('    "'): key=m.group(1)
        if key in('reportText','recordText','skepticText'): name=key
        else: name=cur+':other'
        B[name]=B.get(name,'')+ln+'\n'
    B['prefix']=prefix; B['role+read+rule']=t[t.index('# Your role'):i]+t[j:]
    return B
if __name__=='__main__':
    for l in sys.argv[1:]:
        aid=byid[l]; t=BR[aid]
        out,res=texts(aid)
        BL=blocks_judge(t)
        pre=toks(BL['prefix'])
        print('=====',l,'brief',len(t),'out chars',len(out),'res chars',len(res))
        for name,txt in BL.items():
            tk=toks(unesc(txt))-pre if name!='prefix' else toks(txt)
            if not tk: print(name,len(txt),'no tokens'); continue
            ino=sum(1 for x in tk if x in out); inr=sum(1 for x in tk if x in res)
            ior=sum(1 for x in tk if x in out or x in res)
            print(f'{name:16s} {len(txt):6d} chars {len(tk):5d} tokens  in-own-calls-and-ruling {100*ino/len(tk):3.0f}%  in-tool-results {100*inr/len(tk):3.0f}%  either {100*ior/len(tk):3.0f}%')
