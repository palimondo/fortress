import re,os
HD=re.compile(r"<<-?\s*(['\"]?)([A-Za-z_]\w*)\1")
def split_heredocs(cmd):
    lines=cmd.split('\n'); out=[]; bodies=[]; i=0
    while i<len(lines):
        ln=lines[i]; out.append(ln)
        m=HD.search(ln)
        if m and '<<<' not in ln:
            tag=m.group(2); body=[]; i+=1
            while i<len(lines) and lines[i].strip()!=tag:
                body.append(lines[i]); i+=1
            bodies.append((ln,'\n'.join(body)))
        i+=1
    return '\n'.join(out),bodies
EXT=r'(?:md|scala|java|fss|fsi|tex|test|txt|log|sh|xml|py|json|tsv|csv|out|ast|jj|g|properties|html|js|diff|patch|tick|bib|cls|sty)'
FILE_RE=re.compile(r'(?<![\w$])((?:[\w.$@~-]+/)*[\w$@-][\w$@.-]*\.'+EXT+r')(?![\w])')
def files_in(text):
    out=[]
    for m in FILE_RE.finditer(text):
        f=m.group(1)
        if f.startswith('http'): continue
        out.append(f)
    return out
# kinds, in priority for a single path
KB_RULES=[
 ('kb:FACTS',r'FACTS(-history)?\.md|facts-extract|FACTS\.md'),
 ('kb:POSITIONS',r'POSITIONS(-history)?\.md'),
 ('kb:PLAN',r'coordinator/PLAN\.md|(^|/)PLAN\.md'),
 ('kb:ledger',r'fortress-gap-ledger'),
 ('kb:INDEX',r'(^|/)INDEX\.md'),
 ('kb:map',r'coordinator/map/|(^|/)map/[\w.-]+\.md|dormant-code\.md|repo-internals'),
 ('kb:batch-record',r'CLIMB-BATCH-[\w.]+\.md'),
 ('kb:briefing',r'briefing\d*\.txt|brief\d*\.txt|facts-extract'),
 ('kb:handover',r'handover'),
]
def kind_of_path(p):
    pl=p
    if re.search(r'(REPORT|SKEPTIC|JUDGE|GATHER|REVIEW)[\w.-]*\.md|(^|/)record[\w.-]*\.md|decision-record|second\.md|first\.md',pl): return 'rung:artifacts'
    if re.search(r'brief[\w-]*\.txt',pl): return 'kb:briefing'
    for k,r in KB_RULES:
        if re.search(r,pl): return k
    if re.search(r'Specification',pl): return 'spec'
    if re.search(r'compiler_tests|/tests/|\.test$|FileTests|junit\.sh|/test_',pl): return 'tests'
    if re.search(r'ProjectFortress/src|\.scala$|\.java$|astgen|\.ast$|\.jj$|build\.xml',pl): return 'source'
    if re.search(r'Library/|LibraryBuiltin|\.fs[si]$',pl): return 'library'
    if re.search(r'probes?/|/p/|Sk\w+\.fss|Pb\w+\.fss|\.fss$',pl): return 'probes'
    if re.search(r'\.log$|junit[\w-]*\.txt|\.out$|phases|stage|distance|count|corpus|\.tsv$|summary',pl): return 'output'
    if re.search(r'(^|/)tmp/',pl): return 'rung:artifacts'
    if re.search(r'explorations/.*\.md|reviews/|research/|Documentation/',pl): return 'kb:otherdocs'
    return None
DIRKIND=[('source',r'ProjectFortress/src|scala_src'),('tests',r'compiler_tests|unit_tests|/tests'),('library',r'(^|/)Library|LibraryBuiltin'),('spec',r'Specification'),('kb:otherdocs',r'explorations|research|Documentation')]
def dirkind(text):
    for k,r in DIRKIND:
        if re.search(r,text): return k
    return None

BUILD_RE=re.compile(r'(?<![\w/-])ant\s|\bcompileAll\b|\bscalac\b|\bjavac\b|seed-worktree|\bmvn\b|libbuild|\bgradle\b|facts-extract.*--build')
RUNTEST_RE=re.compile(r'harness-one|junit\.sh|\bjunit\b|FileTests|testFast|testSystem|checker-count|count-run|/distance|distance\.sh|corpus|stages?\.sh|run-stage|\bstage\b.*\.sh|compare\.sh|edit-pass|mg-run|microgpt|\bgate\b.*\.sh|ladder.*\.sh|count-stage|sites-')
RUNPROBE_RE=re.compile(r'bin/fortress|(?<![\w/])fortress\s+(compile|run|walk|test)|\./fortress|probe\.sh|check\.sh|walkwith|\brun_bg\b|\bpb\b|chk\.sh|\brun\.sh')
WAIT_RE=re.compile(r'\bwait_for\b|\bsleep\s+\d|\bpgrep\b|(?<![\w/])ps\s+(aux|-|ax)|tail\s+-f|\buptime\b|\bkill\b|\bwait\b\s*$')
GITW_RE=re.compile(r'\bgit\s+(-C\s+\S+\s+)?(commit|add|push|checkout|switch|worktree|fetch|merge|rebase|cherry-pick|reset|stash|branch|tag|pull|restore|mv|rm|clone|remote|config|update-ref|apply|am|format-patch|bundle)\b')
GITR_RE=re.compile(r'\bgit\s+(-C\s+\S+\s+)?(diff|show|status|log|grep|ls-files|ls-tree|blame|rev-parse|rev-list|cat-file|merge-base|shortlog|describe|name-rev|reflog|ls-remote|count-objects)\b')
SEARCH_RE=re.compile(r'(?<![\w/-])(grep|rg|ack)\s|(?<![\w/-])find\s|(?<![\w/-])ls\b|\bgit\s+(-C\s+\S+\s+)?(log|grep|ls-files|blame)\b|\btree\b|\bwc\b|\blocate\b')
WRITE_REDIR_RE=re.compile(r'(?<![\d&>])>>?\s*(?!/dev/null|&)([^\s|;&]+)')
def classify(name,inp,cwd=None):
    """returns dict(cls=..., kinds=[...], files=[...], verb=...)"""
    if name=='StructuredOutput': return dict(cls='report:structured',kinds=[],files=[],verb='report')
    if name in('TaskCreate','TaskUpdate','ToolSearch'): return dict(cls='other:harness-tool',kinds=[],files=[],verb='other')
    if name in('Write','Edit'):
        p=inp.get('file_path','')
        k=kind_of_path(p)
        if k=='rung:artifacts' and re.search(r'(REPORT|SKEPTIC|JUDGE|GATHER|REVIEW|record|decision)',p): c='write:report'
        elif k in('source','library','spec'): c='write:product'
        elif k=='tests': c='write:test'
        elif k and k.startswith('kb:') and k!='kb:briefing': c='write:kb'
        else: c='write:scratch'
        return dict(cls=c,kinds=[k],files=[p],verb='write')
    if name=='Read':
        p=inp.get('file_path','')
        k=kind_of_path(p) or 'other'
        return dict(cls='read:'+k,kinds=[k],files=[p],verb='read',range=(inp.get('offset'),inp.get('limit')))
    cmd=inp.get('command','')
    stripped,bodies=split_heredocs(cmd)
    # remove comment-only lines
    sc='\n'.join(l for l in stripped.split('\n') if not l.strip().startswith('#'))
    bodytxt='\n'.join(b for _,b in bodies)
    files=files_in(sc)
    # heredoc writes
    write_targets=[]
    for ln,b in bodies:
        m=re.search(r'(?:cat|tee)\s+(?:-a\s+)?>>?\s*(\S+)|(?:cat|tee)\s+(\S+\.\w+)\s*<<|>>?\s*(\S+)\s*<<',ln)
        if m:
            t=m.group(1) or m.group(2) or m.group(3)
            write_targets.append(t)
        elif re.search(r'python3?\s+-?',ln) and re.search(r'\.write\(|open\([^)]*[\'"][wa][\'"]',b):
            write_targets.append('(python)'+' '.join(files_in(b)[:2]))
        elif re.search(r'git\s+commit',ln) or re.search(r'git\s+commit',sc): write_targets.append('(commit-msg)')
    has_write_cmd=bool(re.search(r'\bsed\s+(-[a-zA-Z]*\s+)*-i|\bperl\s+-[a-z]*i|(?<![\w/-])(cp|mv|touch|tee)\s',sc)) or bool(re.search(r'(?<![\w>&])(echo|printf)\b[^|;&\n]*>>?\s*[\w./$"~-]+',sc))
    commit=bool(re.search(r'\bgit\s+(-C\s+\S+\s+)?commit',sc))
    # remove log redirects: command > log 2>&1 is not a write
    kinds=[]; 
    for f in files:
        k=kind_of_path(f)
        if k: kinds.append(k)
    dk=dirkind(sc)
    # precedence
    if BUILD_RE.search(sc) and not re.search(r'^\s*(grep|sed|cat|tail|head)\b',sc.strip()) :
        return dict(cls='build',kinds=kinds,files=files,verb='build')
    if RUNTEST_RE.search(sc) and not re.match(r'\s*(cd\s+\S+\s*&&\s*)?(grep|sed|cat|tail|head|ls|wc|awk)\b',sc.strip()) :
        return dict(cls='run:tests-stages',kinds=kinds,files=files,verb='run')
    if RUNPROBE_RE.search(sc) and not re.match(r'\s*(cd\s+\S+\s*&&\s*)?(grep|sed|cat|tail|head|ls|wc|awk)\b',sc.strip()):
        return dict(cls='run:probes',kinds=kinds,files=files,verb='run')
    if WAIT_RE.search(sc) and not write_targets:
        return dict(cls='wait:poll',kinds=kinds,files=files,verb='wait')
    if commit:
        return dict(cls='git:commit-push',kinds=kinds,files=files,verb='git')
    if write_targets or has_write_cmd:
        tt=' '.join(write_targets)+' '+' '.join(files)
        tk=kind_of_path(tt.split()[0]) if write_targets and not write_targets[0].startswith('(') else None
        alltxt=tt+' '+bodytxt[:2000]
        if re.search(r'(REPORT|SKEPTIC|JUDGE|GATHER|REVIEW)[\w.-]*\.md|(^|/)record[\w.-]*\.md|decision-record',tt): c='write:report'
        elif re.search(r'(^|/)tmp/|probes?/|/p/|Sk\w+\.fss|Pb\w+\.fss|\.sh\b',tt) and not re.search(r'compiler_tests',tt): c='write:scratch'
        elif re.search(r'compiler_tests|/tests/|\.test\b',tt): c='write:test'
        elif re.search(r'ProjectFortress/src|\.scala|\.java|Library/|LibraryBuiltin|Specification|\.fs[si]\b|\.tex\b|build\.xml',tt+' '+sc): c='write:product'
        elif re.search(r'FACTS|ledger|INDEX|POSITIONS|PLAN|map/|\.md\b',tt): c='write:kb'
        else: c='write:scratch'
        if re.search(r'\bmkdir\b|\brm\b',sc) and not write_targets and not has_write_cmd: c='other:fs'
        return dict(cls=c,kinds=kinds,files=files,verb='write')
    if GITW_RE.search(sc) and not GITR_RE.search(sc):
        return dict(cls='git:ops',kinds=kinds,files=files,verb='git')
    if GITW_RE.search(sc) and GITR_RE.search(sc) and not files:
        return dict(cls='git:ops',kinds=kinds,files=files,verb='git')
    # reads
    gitdiff=bool(re.search(r'\bgit\s+(-C\s+\S+\s+)?(diff|show|status)\b',sc))
    searchverb=bool(SEARCH_RE.search(sc))
    explicit_files=[f for f in files]
    if gitdiff and not explicit_files:
        return dict(cls='git:diff-show',kinds=[],files=[],verb='git')
    if gitdiff and re.search(r'\bgit\s+(-C\s+\S+\s+)?(diff|show)\b',sc):
        return dict(cls='git:diff-show',kinds=kinds,files=files,verb='git')
    if searchverb and (not explicit_files or re.search(r'(grep|rg)\s+(-\w*\s+)*-\w*[rR]|--include|find\s|git\s+(-C\s+\S+\s+)?(log|grep)',sc)):
        sub=dk or (kinds[0] if kinds else None) or 'tree'
        return dict(cls='search',kinds=kinds,files=files,verb='search',sub=sub)
    if kinds:
        ks=sorted(set(kinds))
        return dict(cls='read:'+ks[0],kinds=ks,files=files,verb='read')
    if dk:
        return dict(cls='read:'+dk,kinds=[dk],files=files,verb='read')
    if searchverb: return dict(cls='search',kinds=[],files=files,verb='search',sub='tree')
    if re.search(r'python3?\b|awk\b|\bjq\b|\bwc\b|\bsort\b',sc): return dict(cls='other:analysis',kinds=[],files=files,verb='other')
    return dict(cls='other:misc',kinds=kinds,files=files,verb='other')
if __name__=='__main__':
    import pickle,collections
    A=pickle.load(open('agents.pkl','rb'))
    cnt=collections.Counter(); bytes_=collections.Counter(); ex=collections.defaultdict(list)
    for a in A.values():
        for t in a['turns']:
            for c in t['calls']:
                r=classify(c['name'],c['input'])
                cnt[r['cls']]+=1; bytes_[r['cls']]+=c['rbytes']
                if len(ex[r['cls']])<400: ex[r['cls']].append((c['name'],(c['input'].get('command') or c['input'].get('file_path') or '')[:140].replace('\n',' ⏎ '),c['rbytes']))
    for k,v in sorted(cnt.items(),key=lambda x:-bytes_[x[0]]): print(k,v,bytes_[k])
    pickle.dump(ex,open('ex.pkl','wb'))
