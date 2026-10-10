import re,os,shlex
from cls import split_heredocs,files_in,kind_of_path,dirkind,FILE_RE
def simple_commands(s):
    """split on unquoted ; && || | newline &  -> list of (text, after_pipe)"""
    s=s.replace('\\\n',' ')
    s=re.sub(r'\d?>&\d|&>|>&',' > ',s)
    out=[];cur=[];i=0;n=len(s);q=None;dep=0;after_pipe=False
    def flush(ap):
        t=''.join(cur).strip()
        if t: out.append((t,ap))
        cur.clear()
    while i<n:
        ch=s[i]
        if q:
            cur.append(ch)
            if ch==q and s[i-1]!='\\': q=None
            i+=1; continue
        if ch in('"',"'"):
            q=ch; cur.append(ch); i+=1; continue
        if ch=='$' and i+1<n and s[i+1]=='(':
            dep+=1; cur.append('$('); i+=2; continue
        if ch=='(' and dep>0: dep+=1; cur.append(ch); i+=1; continue
        if ch==')' and dep>0: dep-=1; cur.append(ch); i+=1; continue
        if dep>0: cur.append(ch); i+=1; continue
        two=s[i:i+2]
        if two in('&&','||'):
            flush(after_pipe); after_pipe=False; i+=2; continue
        if ch=='|':
            flush(after_pipe); after_pipe=True; i+=1; continue
        if ch in(';','\n'):
            flush(after_pipe); after_pipe=False; i+=1; continue
        if ch=='&':
            flush(after_pipe); after_pipe=False; i+=1; continue
        cur.append(ch); i+=1
    flush(after_pipe)
    return out
KW=('do','then','else','elif','if','while','until','!','{','(','}',')','done','fi','esac','time','nohup','exec','command','builtin')
def argv_of(t):
    t=t.strip()
    while True:
        m=re.match(r'^(do|then|else|elif|if|while|until|!|\{|\(|time|nohup|exec|command)\s+',t)
        if not m: break
        t=t[m.end():]
    try: av=shlex.split(t,posix=True)
    except Exception: av=t.split()
    # strip env assignments
    while av and re.match(r'^[A-Za-z_]\w*=',av[0]): av=av[1:]
    # timeout N / env
    if av and av[0]=='timeout' and len(av)>2: av=av[2:]
    if av and av[0]=='env': 
        av=av[1:]
        while av and re.match(r'^[A-Za-z_]\w*=',av[0]): av=av[1:]
    return av
READERS={'cat','sed','head','tail','grep','rg','awk','cut','sort','uniq','wc','ls','find','diff','cmp','echo','date','stat','file','tr','xargs','column','less','nl','tac','comm','od','jq','basename','dirname','realpath','readlink','test','[','true','printf','pwd','which','type','du','df','id','nproc','free','env','set','unset','sleep'}
STAGE_WORDS=re.compile(r'harness-one|junit|FileTests|testFast|testSystem|checker-count|count-run|distance|corpus|stages?\b|compare|edit-pass|mg-run|microgpt|ladder|sites|gate|run-suite|suite|shard|walk-suite|run-su|ladder|tests\.sh|unit')
PROBE_WORDS=re.compile(r'probe|check\.sh|apirun|walkwith|run\.sh|chk|pb\b|sk\w*\.sh')
def classify(name,inp):
    from cls import classify as c1
    if name!='Bash': return c1(name,inp)
    cmd=inp.get('command','')
    stripped,bodies=split_heredocs(cmd)
    sc='\n'.join(l for l in stripped.split('\n') if not l.strip().startswith('#'))
    bodytxt='\n'.join(b for _,b in bodies)
    files=files_in(sc)
    sims=simple_commands(sc)
    flags=set(); verbs=[]
    kinds=[]
    for f in files:
        k=kind_of_path(f)
        if k: kinds.append(k)
    wr_targets=[]
    for ln,b in bodies:
        m=re.search(r'(?:cat|tee)\s+(?:-a\s+)?>>?\s*(\S+)|(?:cat|tee)\s+(\S+\.\w+)\s*<<|>>?\s*(\S+)\s*<<',ln)
        if m: wr_targets.append(m.group(1) or m.group(2) or m.group(3))
        elif re.search(r'python3?\s',ln) and re.search(r'\.write\(|open\([^)]*[\'"][wa]b?[\'"]|write_text',b): wr_targets.append('(python)'+' '.join(files_in(b)[:2]))
    commit=False; gitw=False; gitd=False; gitr=False; search=False; build=False; runt=False; runp=False; wait=False; readv=False; briefing=False; wr=bool(wr_targets); pyread=False; fsops=False
    for t,ap in sims:
        av=argv_of(t)
        if not av: continue
        a0=os.path.basename(av[0]) if av[0] else ''
        full=' '.join(av)
        if a0 in('for',): continue
        if a0=='cd' or a0=='source' or a0=='.' or a0=='export' or a0=='unset' or a0=='set' or a0=='local' or a0=='alias' or a0=='declare' or a0=='trap': 
            if a0 in('source','.') : pass
            continue
        if ap and a0 not in('tee',): 
            # a filter after a pipe: reads nothing; but xargs / tee write
            continue
        if 'facts-extract' in full: briefing=True; continue
        if a0 in('ant','scalac','javac','mvn'): build=True; continue
        if a0=='seed-worktree.sh': build=True; continue
        if a0 in('wait_for','sleep','pgrep','ps','uptime','kill','pkill','wait','top','lsof'): wait=True; continue
        if a0=='run_bg':
            payload=' '.join(av[2:]) if len(av)>2 else full
            if re.search(r'\bant\b|compileAll|compile\s+Library|compile\s+Compiler|libcache|LibraryBuiltin',payload): build=True
            elif STAGE_WORDS.search(payload): runt=True
            else: runp=True
            continue
        if a0=='nohup' or a0=='bash' or a0=='sh' or a0.endswith('.sh') or a0=='make':
            sc2=full
            if re.search(r'compileAll|libbuild|rebuild',sc2): build=True
            elif STAGE_WORDS.search(sc2): runt=True
            elif a0.endswith('.sh') or a0 in('bash','sh'): 
                if re.search(r'helpers|env\.sh',sc2) and a0 in('bash','sh'): pass
                else: runp=True
            continue
        if a0 in('fortress',) or av[0].endswith('bin/fortress'):
            sub=av[1] if len(av)>1 else ''
            if re.search(r'Library|CompilerLibrary|LibraryBuiltin|NativeSimple',full) and sub=='compile': build=True
            else: runp=True
            continue
        if a0 in('java',): 
            if re.search(r'junit|FileTests|TestRunner|JUnit',full): runt=True
            else: runp=True
            continue
        if a0=='git':
            g=[x for x in av[1:] if not x.startswith('-')]
            # skip -C path
            if len(av)>2 and av[1]=='-C': g=[x for x in av[3:] if not x.startswith('-')]
            sub=g[0] if g else ''
            if sub=='commit': commit=True
            elif sub in('diff','show','status'): gitd=True
            elif sub in('log','grep','ls-files','blame','shortlog','ls-tree','cat-file','rev-list','rev-parse','merge-base','describe','name-rev','ls-remote','reflog','count-objects'): 
                if sub in('log','grep','ls-files','blame','shortlog','ls-tree','reflog'): search=True
                else: gitr=True
            else: gitw=True
            continue
        if a0 in('python3','python'):
            if wr: pass
            else: pyread=True
            continue
        if a0 in('grep','rg','ack','egrep','fgrep'):
            opts=[x for x in av[1:] if x.startswith('-') and not x.startswith('--') ]
            rec=any(re.search(r'r|R',o) for o in opts if not o.startswith('-e')) or any(x.startswith('--include') or x=='--recursive' for x in av)
            nonopt=[x for x in av[1:] if not x.startswith('-')]
            # operands after pattern
            operands=nonopt[1:] if len(nonopt)>1 else []
            hasfile=any(FILE_RE.search(x) for x in operands)
            if rec or not hasfile: search=True
            else: readv=True
            continue
        if a0 in('find','ls','tree','wc','locate'):
            if a0=='wc' and files: readv=True
            else: search=True
            continue
        if a0 in('sed','cat','head','tail','awk','cut','less','nl','diff','cmp','jq','sort','uniq','od','xxd','stat'):
            readv=True; continue
        if a0 in('cp','mv','touch','chmod','tee','install','ln'): wr=True; wr_targets.append(av[-1] if len(av)>1 else ''); continue
        if a0 in('mkdir','rm','rmdir'): fsops=True; continue
        if a0=='sed' and any(x.startswith('-i') for x in av): wr=True; continue
        if a0 in('echo','printf','true','test','[','date','pwd','which','id','nproc','free','df','du','env','type'):
            # echo > file
            if re.search(r'>>?\s*[\w./$"~-]+',t) and not re.search(r'>\s*/dev/null',t): wr=True; wr_targets.append(t)
            continue
        if a0 in('xargs',): readv=True; continue
        readv=True
    # sed -i anywhere
    if re.search(r'\bsed\s+(-[a-zA-Z]*\s+)*-[a-zA-Z]*i\b',sc): wr=True; wr_targets.append(' '.join(files))
    dk=dirkind(re.sub(r'"[^"]*"|\'[^\']*\'','""',sc))
    def pytargets():
        out=[]
        for ln,b in bodies:
            for m in re.finditer(r"open\(\s*([^,)]+)",b):
                out.append(m.group(1))
            for m in re.finditer(r"(?:^|\n)\s*(?:f|p|fn|path|file|fname|name|out|dst)\s*=\s*['\"]([^'\"]+)['\"]",b):
                out.append(m.group(1))
            for m in re.finditer(r"for\s+\w+(?:,\w+)*\s+in\s+\[\s*\(?\s*['\"]([^'\"]+)['\"]",b):
                out.append(m.group(1))
        return out
    def writeclass():
        ex=[t for t in wr_targets if not t.startswith('(')]
        py=pytargets() if any(t.startswith('(python)') for t in wr_targets) or not ex else []
        tt=' '.join(ex+py)
        if not tt.strip(): tt=' '.join(files)
        if re.search(r'(REPORT|SKEPTIC|JUDGE|GATHER|REVIEW)[\w.-]*\.md|(^|/)record[\w.-]*\.md|decision-record|worker-report|RECORD\.md',tt): return 'write:report'
        if re.search(r'scratchpad|(^|/)tmp/|/tmp/|probes?/|/p/|Sk\w+\.fss|Pb\w+\.fss|\.sh\b|\.py\b|\.log\b|\.out\b|\.txt\b|\.json\b|\.tsv\b',tt): return 'write:scratch'
        if re.search(r'compiler_tests|/tests/|\.test\b',tt): return 'write:test'
        if re.search(r'ProjectFortress/src|\.scala|\.java|Library/|LibraryBuiltin|Specification|\.fs[si]\b|\.tex\b|build\.xml',tt): return 'write:product'
        if re.search(r'FACTS|ledger|INDEX|POSITIONS|PLAN|map/|\.md\b',tt): return 'write:kb'
        if re.search(r'\.fss\b',tt): return 'write:test'
        return 'write:scratch'
    base=dict(kinds=kinds,files=files,verb='x',n_bodies=len(bodies),body_chars=len(bodytxt))
    if briefing and not (build or runt): cls='read:kb:briefing'
    elif build: cls='build'
    elif runt: cls='run:tests-stages'
    elif runp: cls='run:probes'
    elif wait and not wr: cls='wait:poll'
    elif commit: cls='git:commit-push'
    elif wr: cls=writeclass()
    elif gitw: cls='git:ops'
    elif gitd: cls='git:diff-show'
    elif search:
        cls='search'; base['sub']=dk or (kinds[0] if kinds else None) or 'tree'
    elif readv or kinds:
        ks=sorted(set(kinds))
        if re.search(r'subagents/workflows|tool-results|prev-transcript|\.jsonl',sc): cls='read:transcripts'
        elif ks: cls='read:'+ks[0]
        elif dk: cls='read:'+dk
        elif re.search(r'tmp/',sc): cls='read:output'
        else: cls='read:other'
    elif gitr: cls='git:diff-show'
    elif pyread:
        cls='read:transcripts' if re.search(r'subagents/workflows|\.jsonl',sc+bodytxt) else 'other:analysis'
    elif fsops: cls='other:fs'
    elif wait: cls='wait:poll'
    else: cls='other:misc'
    base['cls']=cls
    return base
if __name__=='__main__':
    import pickle,collections,random
    A=pickle.load(open('agents.pkl','rb'))
    cnt=collections.Counter(); bytes_=collections.Counter(); ex=collections.defaultdict(list)
    for a in A.values():
        for t in a['turns']:
            for c in t['calls']:
                r=classify(c['name'],c['input'])
                cnt[r['cls']]+=1; bytes_[r['cls']]+=c['rbytes']
                ex[r['cls']].append((c['name'],(c['input'].get('command') or c['input'].get('file_path') or '')[:140].replace('\n',' ⏎ '),c['rbytes']))
    for k,v in sorted(cnt.items(),key=lambda x:-bytes_[x[0]]): print(k,v,bytes_[k])
    pickle.dump(ex,open('ex.pkl','wb'))
