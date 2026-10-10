import re
s=open('classify.py').read()
# replace run detection and dir handling
s=s.replace("""    # runs
    if re.search(r'bin/fortress|\\bant\\b|harness-one|junit\\.sh|run_bg|FORTRESS_HOME|checker-count/run|distance/run|run-subset|nohup|\\bjava\\b|shard\\.sh|classify\\.py|compare\\.sh',c):
        tags.append('RUN')
    return tags""","""    # runs: first word of a simple command
    for seg in re.split(r'&&|\\|\\||;|\\n|\\|',c):
        w=seg.strip().split()
        while w and (re.match(r'^[A-Za-z_]+=',w[0]) or w[0] in('timeout','nohup','time','env','source','.') or re.match(r'^\\d+$',w[0])):
            if w[0] in('source','.'): w=[]; break
            w=w[1:]
        if not w: continue
        f=w[0]
        if f in('ant','java','run_bg','wait_for') or f.endswith('bin/fortress') or re.search(r'(harness-one|junit|shard|run|run-subset|compare|dev-check|each)\\.sh$',f):
            tags.append('RUN')
        elif f in('bash','sh') and len(w)>1 and re.search(r'\\.sh$',w[1]): tags.append('RUN')
        elif f.startswith('python3') and len(w)>1 and re.search(r'(tmp/|tools/).*\\.py$|classify\\.py|errors\\.py',' '.join(w[1:3])): tags.append('RUN')
    return tags""")
s=s.replace("""        if '/' not in tok and not re.search(r'\\.'+EXT+r'$',tok): continue""","""        isfile=bool(re.search(r'\\.'+EXT+r'$',tok))
        if not isfile and tok not in('.','..') and not (('/' in tok) and re.search(r'\\b(ls|find|grep|rg)\\b',c)): continue
        if not isfile and tok in cdtargets: continue""")
s=s.replace("""    cwd=worker_root
    for m in re.finditer(r'\\bcd\\s+("?[^\\s;&|"]+"?)',c):
        t=m.group(1).strip('"')""","""    cwd=worker_root
    cdtargets=set()
    for m in re.finditer(r'\\bcd\\s+("?[^\\s;&|"]+"?)',c):
        t=m.group(1).strip('"'); cdtargets.add(t)""")
s=s.replace("""    if rel.startswith('explorations/'):
        if rel.endswith('.md'): return 'RNOTES'""","""    if rel.startswith('explorations/'):
        if rel.endswith('.md'): return 'RNOTES'
        if not re.search(r'\\.[a-z]+$',rel): return 'TOOLS' if re.search(r'gate|tools',rel) else 'RNOTES'""")
open('classify.py','w').write(s)
