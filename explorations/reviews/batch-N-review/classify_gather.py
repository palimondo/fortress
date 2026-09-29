"""Classify each step of batch N's gather (before and after its compaction) by what its tool call did, and sum the
tokens each kind added to the context. A step's tokens are the growth of the context from that API call to the next
(the harness's own count: input + cache read + cache write), split between the call's own output and its tool results
at the measured 0.40 tokens per character; the rest of the step is the agent's reasoning and per-call overhead."""
import json, re, collections, sys
S = json.load(open('gather_steps.json'))
D = json.load(open('gather_calls.json'))
C = D['calls']
RATIO = 0.40
def fam(path):
    p = path
    for pat, name in [
        (r'CLIMB-BATCH-N\.md', 'batch record CLIMB-BATCH-N.md'),
        (r'climb-batch-workflow\.md', 'workflow manual'),
        (r'climb-batch-6\.5/', 'batch 6.5 gather record (precedent)'),
        (r'climb-batch-N/RECORD\.md', "own RECORD.md"),
        (r'climb-batch-N/merged-tests|tmp/gather-N', 'own captures'),
        (r'PLAN\.md', 'PLAN.md'),
        (r'FACTS(-history)?\.md|tool-results/blwuik48y', 'FACTS.md'),
        (r'fortress-gap-ledger\.md', 'ledger'),
        (r'microgpt-run-c-handover', 'handover'),
        (r'protocol\.md|coordinator/README\.md', 'protocol and coordinator README'),
        (r'rung-inference-checker|rung-inference-walk|rung-spec-inference|rung-integer-minmax|wip/rung-', "rungs' records and probes"),
        (r'Specification/', 'Specification'),
        (r'reviews/', 'reviews'),
        (r'compiler_tests|ProjectFortress/tests', 'tests'),
        (r'ProjectFortress/src|Library/|LibraryBuiltin', 'source and library'),
        (r'scratchpad/batchN/(task|.*\.py)|task_full', 'own scratch (task copy, scripts)'),
        (r'\.claude/projects', 'session transcripts'),
    ]:
        if re.search(pat, p): return name
    return 'other file'
def kind(call):
    n = call['name']; inp = call['inp']
    cmd = inp.get('command') or ''
    if n == 'Write':
        fp = inp['file_path']
        if re.search(r'\.(report|record)\.json$', fp): return 'copy a report/record text out of the prompt (Write)'
        return 'write a file (Write/Edit)'
    if n == 'Edit': return 'write a file (Write/Edit)'
    if n == 'Read': return 'read: ' + fam(inp['file_path'])
    if n == 'StructuredOutput': return 'return (StructuredOutput)'
    if n != 'Bash': return n
    c = cmd
    if re.search(r'\.claude/projects', c): return 'read: session transcripts'
    if re.search(r'\bant\b.*(compileAll|genSource|tex)|specbuild|compileAll\.log|libcache|fortress compile', c) and not re.search(r'junit\.sh|both\.sh', c):
        if re.search(r'sleep|while', c): return 'build (wait and poll)'
        return 'build'
    if re.search(r'both\.sh|junit\.sh|harness-one|SystemJUTest|bin/fortress|Shell junit|fortress run', c): return 'test runs'
    if re.search(r'^\s*(for i in 1 2 3 4; do )?git (add|commit)|git apply|msg_[A-Z]\.txt', c): return 'apply, stage, commit'
    if re.search(r"python3 - <<'EOF'|python3 -c|cat > [^ ]+\.py|sed -i|cat > \S+\.(fss|test|sh)|cp \S+", c) and not re.search(r'^\s*(sed -n|grep|cat [^>]|head|awk)', c):
        return 'edit files (scripts, sed -i, heredoc)'
    if re.search(r'git blame', c): return 'git blame'
    if re.search(r'git (diff|show)', c) and not re.search(r'git show --stat|--name-only|--stat', c): return 'git diff/show'
    if re.search(r'git (log|status|diff --name-only|diff --stat|diff --cached --stat|show --stat|ls-tree|merge-base)', c): return 'git log/status/stat'
    # reads: find the first path
    m = re.findall(r'[\w./@-]+\.(?:md|txt|tex|fss|fsi|test|scala|java|py|sh|json)\b|explorations/[\w./-]+|\$R/\S+', c)
    # resolve $R variable
    rv = re.search(r'R=(\S+?);', c)
    paths = [x.replace('$R', rv.group(1)) if rv else x for x in m]
    if paths: return 'read: ' + fam(' '.join(paths[:3]))
    return 'other'
out = collections.OrderedDict()
def add(key, part, tok):
    out.setdefault(key, collections.Counter())[part] += tok
steps = [s for s in S if not s.get('boundary')]
boundary = [s for s in S if s.get('boundary')][0]['line']
rows = []
for s in steps:
    if 'delta' not in s: continue
    phase = 'pre' if s['line'] < boundary else 'post'
    ks = [kind(C[t]) for t in s['tools']] or ['own text only']
    k = ks[0]
    R = s['res_chars']*RATIO; A = s['out_chars']*RATIO
    rest = max(0, s['delta'] - R - A)
    rows.append(dict(line=s['line'], ts=s['ts'], phase=phase, kind=k, delta=s['delta'], R=R, A=A, rest=rest, tools=s['tools']))
json.dump(rows, open('gather_kinds.json','w'))
for phase in ('pre', 'post'):
    agg = collections.defaultdict(lambda: [0,0,0,0,0])
    for r in rows:
        if r['phase'] != phase: continue
        a = agg[r['kind']]; a[0]+=1; a[1]+=r['R']; a[2]+=r['A']; a[3]+=r['rest']; a[4]+=r['delta']
    tot = sum(a[4] for a in agg.values())
    print(f'== {phase}: {sum(a[0] for a in agg.values())} steps, {tot/1000:.1f}K tokens added')
    for k, a in sorted(agg.items(), key=lambda kv: -kv[1][4]):
        print(f'{a[4]/1000:7.1f}K  {a[0]:3d} calls  results {a[1]/1000:6.1f}K  own output {a[2]/1000:6.1f}K  reasoning/overhead {a[3]/1000:5.1f}K  {k}')
