#!/usr/bin/env python3
"""workers.py counts, for each worker of the coordinating session (an Agent-tool
subagent or a Workflow agent; its transcript is a file agent-*.jsonl under the
session's subagents/ folder): the parts of the fortress-repo skill that its
brief names, the parts that it read, and the parts that its own tool calls show
it needed. It answers whether a brief that names parts keeps the worker from
loading the other parts that its task needs.

    python3 scripts/workers.py --build     # one pass over about 3.4 GB, 5 to 10 minutes; writes tmp/pm/workers.jsonl
    python3 scripts/workers.py             # the sums, workers from 2026-10-13
    python3 scripts/workers.py --since 2026-11-08T15:38
    python3 scripts/workers.py --list rung # one line for each rung worker (or: named, none, all)

What a line counts.
  Named: the brief (the worker's first message) names a part of fortress-repo, as
  `references/NAME.md`, as `NAME.md`, or as "its NAME part".
  Read: a Read call on the part's file, or a Bash call that prints it or a
  section of it (cat, sed -n, awk, head, tail).
  Needed: a part whose kind of work the worker's own tool calls show (NEEDS
  below): a commit needs committing.md, a build needs build-and-caches.md, and
  so on; every task needs records.md; a task that reads or edits the original
  tree needs revival-changes.md. This is the skill's own list ("The parts"),
  read from the acts and not from the brief's words.
What it cannot show: a part that was needed for a judgement that left no tool
call (exploring.md); whether a part that was read was followed; headless
`claude -p` sessions (the skill writer, a landing), which are not under
subagents/ and are not counted.
"""
import collections, glob, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib

ROOTS = ['%s/%s/subagents' % (tlib.BACKUP, tlib.SESSION),
         '/root/.claude/projects/-home-user-fortress/%s/subagents' % tlib.SESSION]
OUT = os.path.join(tlib.CACHE, 'workers.jsonl')
PARTS = ['build-and-caches', 'session', 'worktrees', 'toolchain', 'interpreter', 'compiler', 'library',
         'specification', 'revival-changes', 'exploring', 'tests-writing', 'tests-running', 'gate',
         'committing', 'records']
NAMED_RE = re.compile(r'(?:references/)?(%s)\.md|\bits (%s) part|`(%s)` part' % ('|'.join(PARTS), '|'.join(PARTS), '|'.join(PARTS)))
ORIGINAL = re.compile(r'/(ProjectFortress|Library|Specification|SpecData|default_repository|bin)/|\.(fss|fsi|rats|tex|scala|java)\b')

def needs(tool):
    """The parts of fortress-repo that one tool call of a worker shows it needed."""
    name, inp = tool['name'], tool.get('inp') or {}
    cmd = inp.get('command') or '' if name == 'Bash' else ''
    path = inp.get('file_path') or inp.get('path') or ''
    out = set()
    if cmd:
        if re.search(r'(?<![\w-])git\s+(-C\s+\S+\s+)?(commit|push)\b', cmd): out.add('committing')
        if re.search(r'(?<![\w/-])ant\s|bin/fortress|(?<![\w-])fortress\s+(compile|run|walk|link)\b', cmd): out.add('build-and-caches')
        if re.search(r'\bnohup\b|wait_for', cmd) or inp.get('bg'): out.add('session')
        if re.search(r'git\s+(-C\s+\S+\s+)?worktree|seed-worktree', cmd): out.add('worktrees')
        if re.search(r'harness-one\.sh|junit\.sh|ant\s+test', cmd): out.add('tests-running')
        if re.search(r'gate-functions|tools/gate|count-run|checker-count|tools/distance', cmd): out.add('gate')
        if re.search(r'facts-extract|ledger\.py|record\.py', cmd): out.add('records')
        if ORIGINAL.search(cmd): out.add('revival-changes')
    if name in ('Edit', 'Write'):
        if re.search(r'/(tests|compiler_tests|not_passing_yet|demos|test_library)/[^ ]*\.(fss|fsi|test)$', path): out.add('tests-writing')
        if re.search(r'fortress/(interpreter|nativeHelpers)/', path): out.add('interpreter')
        if re.search(r'fortress/(compiler|runtimeSystem|scala_src)/|/scala_src/', path): out.add('compiler')
        if re.search(r'/(Library|LibraryBuiltin)/', path): out.add('library')
        if re.search(r'/Specification/', path): out.add('specification')
    if name in ('Read', 'Edit', 'Write', 'Grep') and ORIGINAL.search(path) and '.claude/' not in path and '/explorations/' not in path:
        out.add('revival-changes')
    return out

def scan(path):
    meta = {}
    mp = path[:-6] + '.meta.json'
    if os.path.exists(mp):
        try:
            meta = json.load(open(mp))
        except ValueError:
            pass
    w = {'id': os.path.basename(path)[6:-6], 'run': None, 'type': meta.get('agentType'), 'desc': meta.get('description'),
         'phase': meta.get('workflowPhase'), 'first': None, 'last': None, 'models': {}, 'brief_chars': 0, 'named': [],
         'says_skill': False, 'skill_loaded': False, 'read': [], 'needed': [], 'ntools': 0, 'out': 0, 'relayed': None}
    m = re.search(r'/workflows/([^/]+)/', path)
    if m:
        w['run'] = m.group(1)
    models, read, needed = collections.Counter(), [], set()
    brief, replied = None, False
    with open(path) as f:
        for line in f:
            try:
                e = json.loads(line)
            except ValueError:
                continue
            ts = e.get('timestamp')
            if ts:
                w['first'] = w['first'] or ts
                w['last'] = ts
            t = e.get('type')
            msg = e.get('message') or {}
            if t == 'user':
                c = msg.get('content')
                text = c if isinstance(c, str) else '\n'.join(p.get('text', '') for p in c if isinstance(p, dict) and p.get('type') == 'text') if isinstance(c, list) else ''
                if 'Base directory for this skill' in text:
                    if 'skills/fortress-repo' in text:
                        w['skill_loaded'] = True
                elif not replied and text.strip():
                    # the brief: every message before the worker's first reply. A Workflow agent gets two:
                    # the chat message that started the launching turn, relayed by the harness, then the task.
                    if text.startswith('[Workflow harness') and 'user request' in text[:60]:
                        w['relayed'] = ' '.join(text.split('this request wins:')[-1].split())[:400]
                    else:
                        brief = (brief or '') + text + '\n'
            elif t == 'assistant':
                replied = True
                if msg.get('model') and msg.get('model') != '<synthetic>':
                    models[msg['model']] += 1
                    w['out'] += (msg.get('usage') or {}).get('output_tokens') or 0
                for p in msg.get('content') or []:
                    if isinstance(p, dict) and p.get('type') == 'tool_use':
                        w['ntools'] += 1
                        inp = p.get('input') if isinstance(p.get('input'), dict) else {}
                        tool = {'name': p.get('name'), 'inp': {'command': inp.get('command'), 'file_path': inp.get('file_path'),
                                                              'path': inp.get('path'), 'bg': inp.get('run_in_background')}}
                        if p.get('name') == 'Skill' and inp.get('skill') == 'fortress-repo':
                            w['skill_loaded'] = True
                        part = None
                        if p.get('name') == 'Read':
                            part = tlib.part_of(inp.get('file_path'))
                            if part:
                                read.append(part)
                        elif p.get('name') == 'Bash' and tlib.bash_read(inp.get('command') or ''):
                            for mm in tlib.PART_RE.finditer(inp.get('command') or ''):
                                read.append(tlib.part_of(mm.group(0)))
                        if not part:
                            needed |= needs(tool)
    brief = brief or ''
    w['brief_chars'] = len(brief)
    w['named'] = sorted({next(g for g in m.groups() if g) for m in NAMED_RE.finditer(brief)})
    w['says_skill'] = bool(re.search(r'fortress-repo', brief))
    w['says_coordinator_part'] = bool(re.search(r'skills/coordinator/|coordinator`? skill', brief))
    w['models'] = dict(models)
    if 'fortress-repo/CORE' in read:
        w['skill_loaded'] = True
    w['read'] = sorted({r.split('/')[1] for r in read if r.startswith('fortress-repo/') and not r.endswith('/CORE')})
    w['read_other'] = sorted({r for r in read if not r.startswith('fortress-repo/')})
    if w['ntools']:
        needed.add('records')
    w['needed'] = sorted(needed)
    return w

def build():
    os.makedirs(tlib.CACHE, exist_ok=True)
    seen, n = set(), 0
    with open(OUT, 'w') as out:
        for root in ROOTS:
            for path in sorted(glob.glob(root + '/agent-*.jsonl') + glob.glob(root + '/workflows/*/agent-*.jsonl')):
                key = os.path.basename(path)
                if key in seen:
                    continue
                seen.add(key)
                out.write(json.dumps(scan(path)) + '\n')
                n += 1
                if n % 200 == 0:
                    print('%d workers scanned' % n, flush=True)
    print('%d workers -> %s' % (n, OUT))

def kind_of(w):
    if w.get('phase') == 'Rung' or (w.get('desc') or '').startswith('rung:'):
        return 'rung'
    return 'workflow' if w.get('run') else 'agent'

def pct(a, b):
    return '%3d%%' % (100 * a // b) if b else '  - '

def main():
    args = sys.argv[1:]
    if '--build' in args:
        return build()
    if not os.path.exists(OUT):
        sys.exit('missing %s: run workers.py --build first' % OUT)
    since = args[args.index('--since') + 1] if '--since' in args else '2026-10-13T19:22'
    ws = [json.loads(l) for l in open(OUT)]
    ws = [w for w in ws if w['first'] and w['first'] >= since and w['ntools'] > 0]
    for w in ws:
        w['kind'] = kind_of(w)
        w['tier'] = tlib.tier(max(w['models'], key=w['models'].get)) if w['models'] else '?'
        w['repo'] = w['skill_loaded'] or bool(w['read'])
    if '--list' in args:
        which = args[args.index('--list') + 1]
        for w in sorted(ws, key=lambda w: w['first']):
            if which == 'all' or which == w['kind'] or (which == 'named' and w['named']) or (which == 'none' and not w['named']):
                un = sorted(set(w['needed']) - set(w['named']))
                print('%s %-17s %-8s %-9s skill %s named[%s] read[%s] needed-unnamed-unread[%s] | %s' % (
                    tlib.fmt_ts(w['first']), w['id'], w['kind'], w['tier'], 'y' if w['skill_loaded'] else 'n', ','.join(w['named']),
                    ','.join(w['read']), ','.join(sorted(set(un) - set(w['read']))), (w.get('desc') or '')[:50]))
        return
    print('Workers from %s that made a tool call: %d.' % (since, len(ws)))
    print('repo = the worker loaded the fortress-repo skill or read a part of it.\n')
    print('== the workers, by kind and by whether the brief names parts')
    def row(label, group):
        n = len(group)
        if not n:
            return
        repo = [w for w in group if w['repo']]
        need = sum(len(w['needed']) for w in repo)
        got = sum(len(set(w['needed']) & set(w['read'])) for w in repo)
        un = sum(len(set(w['needed']) - set(w['named'])) for w in repo)
        un_got = sum(len((set(w['needed']) - set(w['named'])) & set(w['read'])) for w in repo)
        nm = sum(len(set(w['named'])) for w in repo)
        nm_got = sum(len(set(w['named']) & set(w['read'])) for w in repo)
        rd = sorted(len(w['read']) for w in repo)
        print('  %-44s workers %4d  repo %4d | parts read, median %d | needed parts read %4d of %5d (%s) | named parts read %3d of %3d (%s) | needed parts that the brief does not name, read %4d of %5d (%s)' % (
            label, n, len(repo), rd[len(rd) // 2] if rd else 0, got, need, pct(got, need), nm_got, nm, pct(nm_got, nm), un_got, un, pct(un_got, un)))
    for kind in ('agent', 'rung', 'workflow'):
        g = [w for w in ws if w['kind'] == kind]
        row('%s, brief names parts' % kind, [w for w in g if w['named']])
        row('%s, brief names none' % kind, [w for w in g if not w['named']])
    print('\n== the same, by the worker\'s model (Agent-tool workers and rung workers together)')
    for tier in sorted({w['tier'] for w in ws}):
        g = [w for w in ws if w['tier'] == tier and w['kind'] in ('agent', 'rung')]
        row('%s, brief names parts' % tier, [w for w in g if w['named']])
        row('%s, brief names none' % tier, [w for w in g if not w['named']])
    for title, pick in (('all workers', lambda w: True), ('Agent-tool workers only', lambda w: w['kind'] == 'agent'),
                        ('Agent-tool workers on Opus 5.5 only', lambda w: w['kind'] == 'agent' and w['tier'] == 'Opus 5.5'),
                        ('Agent-tool workers on Fable 5.2 only', lambda w: w['kind'] == 'agent' and w['tier'] == 'Fable 5.2')):
        print('\n== by needed part, %s with the skill loaded: read when the brief names it / when the brief names other parts only / when the brief names none' % title)
        tot = [[0, 0], [0, 0], [0, 0]]
        for part in PARTS:
            a = [w for w in ws if w['repo'] and part in w['needed'] and pick(w)]
            if not a:
                continue
            gs = [[w for w in a if part in w['named']], [w for w in a if w['named'] and part not in w['named']], [w for w in a if not w['named']]]
            cells = []
            for i, g in enumerate(gs):
                r = sum(1 for w in g if part in w['read'])
                tot[i][0] += r; tot[i][1] += len(g)
                cells.append('%3d of %3d (%s)' % (r, len(g), pct(r, len(g))))
            print('  %-17s named %s   other parts named %s   none named %s' % (part, cells[0], cells[1], cells[2]))
        print('  %-17s named %s   other parts named %s   none named %s' % tuple(['all parts'] + ['%3d of %3d (%s)' % (r, n, pct(r, n)) for r, n in tot]))
    print('\n== how the briefs changed: Agent-tool workers by week, the share whose brief names parts')
    by = collections.defaultdict(lambda: [0, 0])
    for w in ws:
        if w['kind'] == 'agent' and w['says_skill']:
            wk = w['first'][:10]
            import datetime
            d = datetime.date.fromisoformat(wk)
            key = (d - datetime.timedelta(days=d.weekday())).isoformat()
            by[key][0] += 1
            by[key][1] += bool(w['named'])
    for k in sorted(by):
        print('  week of %s  briefs that name the skill %3d  of which name parts %3d (%s)' % (k, by[k][0], by[k][1], pct(by[k][1], by[k][0])))

if __name__ == '__main__':
    main()
