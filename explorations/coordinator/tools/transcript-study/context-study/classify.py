#!/usr/bin/env python3 -I
import json, re, sys, os
WORKERS={'W':'ac7f17fcef729d710','N':'a9d085d2ca3d1673f','G':'ad8b9ef1d620d222e','C':'a17102eab231ad505'}
# first edit (strict) and first kept fix edit, call numbers (from the traces)
EDITS={'W':(60,76),'N':(21,152),'G':(77,109),'C':(120,136)}
EXT=r'(fss|fsi|fs[?*]|java|scala|md|tex|sh|py|tsv|txt|test|js|xml|rats|json|ast|tick)'
PATHTOK=re.compile(r'^[A-Za-z0-9_.~${}/*+@-]+$')
def strip_heredoc(cmd):
    # cut heredoc bodies
    out=[];skip=None
    for line in cmd.split('\n'):
        if skip is not None:
            if line.strip()==skip: skip=None
            continue
        m=re.search(r"<<-?\s*'?\"?([A-Za-z_]+)'?\"?",line)
        out.append(line)
        if m: skip=m.group(1)
    return '\n'.join(out)
def repo_rel(p, cwd):
    p=p.strip('\'"')
    if p.startswith('~'): return None
    if not p.startswith('/'):
        p=os.path.normpath(os.path.join(cwd,p))
    m=re.match(r'^/home/user/fortress[-a-z0-9]*/(.*)$',p)
    if m: return m.group(1)
    return p.lstrip('/') if p.startswith('/home/user/fortress') else None
def classify_path(rel):
    if rel is None: return None
    if re.match(r'^tmp/',rel): 
        if re.search(r'briefing',rel): return 'BRIEFING'
        return 'OWN'
    if re.match(r'^explorations/coordinator/(FACTS|POSITIONS|INDEX)[A-Za-z-]*\.md',rel) or rel.startswith('explorations/fortress-gap-ledger.md'): return 'RCORE'
    if rel.startswith('explorations/'):
        if rel.endswith('.md'): return 'RNOTES'
        if not re.search(r'\.[a-z]+$',rel): return 'TOOLS' if re.search(r'gate|tools',rel) else 'RNOTES'
        if rel.startswith('explorations/coordinator/map/'): return 'RNOTES'
        return 'TOOLS'
    if rel.startswith('research/'): return 'RNOTES'
    if re.match(r'^(Library/|ProjectFortress/LibraryBuiltin/)',rel): return 'LIB'
    if re.match(r'^(Specification/|Documentation/|Papers/)',rel): return 'SPEC'
    if re.match(r'^ProjectFortress/(tests|compiler_tests|library_tests|[a-z_]*_tests|demos|static_tests)',rel): return 'TEST'
    if rel.startswith('ProjectFortress/src/'): return 'CODE'
    if rel.startswith('ProjectFortress/') or rel in('build.xml','bin/fortress'): return 'CODE'
    if rel.startswith('bin/') or rel.startswith('default_repository/') : return 'CODE'
    return None
def tags_for_bash(cmd, worker_root):
    c=strip_heredoc(cmd)
    tags=[]
    # briefing / facts-extract
    if 'facts-extract' in c:
        keys=re.findall(r'["\']((?:positions|ledger-find|ledger|index|map|doc|code|spec|section):[^"\']*)["\']',c)
        bare=re.findall(r'^\s*"([^":]{3,}[^":])"\s*\\?$',c,re.M)
        n=len(keys)+len(bare)
        if n>=6 or '--part' in c:
            return ['BRIEFING']
        for k in keys:
            kind=k.split(':')[0]
            tags.append({'positions':'RCORE','ledger':'RCORE','ledger-find':'RCORE','index':'RCORE','section':'RCORE','map':'RNOTES','doc':'RNOTES','code':'CODE','spec':'SPEC'}[kind])
        if not keys: tags.append('RCORE')
    cwd=worker_root
    cdtargets=set()
    for m in re.finditer(r'\bcd\s+("?[^\s;&|"]+"?)',c):
        t=m.group(1).strip('"'); cdtargets.add(t)
        if t.startswith('/'): cwd=t
        else: cwd=os.path.normpath(os.path.join(cwd,t))
    # path tokens
    for tok in re.split(r'[\s;&|()<>=:,]+',c):
        tok=tok.strip('\'"\\')
        if not tok or not PATHTOK.match(tok): continue
        isfile=bool(re.search(r'\.'+EXT+r'$',tok))
        if not isfile and tok not in('.','..') and not (('/' in tok) and re.search(r'\b(ls|find|grep|rg)\b',c)): continue
        if not isfile and tok in cdtargets: continue
        if tok.startswith('-'): continue
        if re.match(r'^/(tmp|usr|dev|proc|root)',tok): continue
        rel=repo_rel(tok,cwd)
        t=classify_path(rel)
        if t and t!='OWN': tags.append(t)
        elif t=='BRIEFING': tags.append('BRIEFING')
    # git history
    if re.search(r'\bgit\s+(-C\s+\S+\s+)?(log|show|blame|ls-remote|merge-base|cat-file|rev-list|diff\s+[0-9a-f]{7,})',c):
        tags.append('GIT')
    # runs: first word of a simple command
    for seg in re.split(r'&&|\|\||;|\n|\|',c):
        w=[x.lstrip('(') for x in seg.strip().split()]
        w=[x for x in w if x]
        while w and (re.match(r'^[A-Za-z_]+=',w[0]) or w[0] in('timeout','nohup','time','env','source','.','!') or re.match(r'^\d+$',w[0])):
            if w[0] in('source','.'): w=[]; break
            w=w[1:]
        if not w: continue
        f=w[0]
        if f in('ant','java','run_bg','wait_for') or f.endswith('bin/fortress') or re.search(r'(harness-one|junit|shard|run|run-subset|compare|dev-check|each)\.sh$',f):
            tags.append('RUN')
        elif f in('bash','sh') and len(w)>1 and re.search(r'\.sh$',w[1]): tags.append('RUN')
        elif f.startswith('python3') and len(w)>1 and re.search(r'(tmp/|tools/).*\.py$|classify\.py|errors\.py',' '.join(w[1:3])): tags.append('RUN')
    # edits to tracked files / commits
    cq=re.sub(r"'[^']*'","''",c); cq=re.sub(r'"[^"]*"','""',cq)
    for seg in re.split(r'&&|\|\||;|\n',cq):
        if re.search(r'git\s+(mv|commit|add|reset|checkout\s+--|stash)|sed\s+-i|\btee\b',seg):
            si=re.search(r'sed\s+-i\s+\S+\s+(\S+)',seg)
            if re.search(r'git\s+(mv|commit|add|reset|checkout)',seg): tags.append('EDIT')
            elif si:
                rel=repo_rel(si.group(1),cwd)
                if rel and not rel.startswith('tmp/'): tags.append('EDIT')
        m=re.search(r'(?<![<>2&=])>(?!=)\s*([^\s|&;>]+)',seg)
        if m:
            tgt=m.group(1).strip('\'"')
            if tgt.startswith('&') or tgt.startswith('/dev/null') or tgt.startswith('/tmp/'): continue
            rel=repo_rel(tgt.replace('$S','/home/user/x/tmp/s'),cwd) if not tgt.startswith('$') else None
            if rel and not rel.startswith('tmp/'): tags.append('EDIT')
    return tags
def classify(call, worker_root):
    t=call['tool']; i=call['input']
    if t=='Read':
        rel=repo_rel(i.get('file_path',''),worker_root)
        x=classify_path(rel)
        if x=='OWN': return ['OWN']
        if i.get('file_path','').startswith('/tmp/'): return ['OWN']
        return [x or 'OTHER']
    if t=='Bash':
        tg=tags_for_bash(i.get('command',''),worker_root)
        if not tg:
            return ['SETUP']
        # a command that only runs or only reads
        seen=[]
        for x in tg:
            if x not in seen: seen.append(x)
        return seen
    if t in('Edit','Write'): return ['EDIT']
    return ['SETUP']
def tok(call): return 0.41*call['rbytes']+110
def load(w):
    d=json.load(open(f'json/{WORKERS[w]}.json'))
    return d
ROOTS={'W':'/home/user/fortress-walkmeet','N':'/home/user/fortress-numslips','G':'/home/user/fortress-genslips','C':'/home/user/fortress-checkdefects'}
if __name__=='__main__':
    w=sys.argv[1]
    d=load(w)
    calls=[e for e in d['events'] if e['k']=='call']
    lim=int(sys.argv[2]) if len(sys.argv)>2 else 10**9
    for c in calls:
        if c['n']>lim: break
        tg=classify(c,ROOTS[w])
        s=c['input'].get('command') or c['input'].get('file_path') or ''
        s=' '.join(s.split())[:95]
        print('%3d %-24s %6dB %s'%(c['n'],'+'.join(tg),c['rbytes'],s))
