#!/usr/bin/env python3
"""Parse the repair batch's Workflow transcripts.

One command regenerates every number in explorations/coordinator/repair-batch-review.md:

    python3 explorations/coordinator/repair-batch-review/parse.py \
        --root /root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows \
        --out  explorations/coordinator/repair-batch-review

It writes agents.csv beside itself and prints the tables the report quotes:
the per-workflow span and concurrency, the command classes with their walls,
the map and Specification counts per agent, the first-edit ordering, and every
Specification citation in the batch's records against what an agent opened
(that last pass reads the repository, whose path is --repo, default
/home/user/fortress).

Method follows the two earlier measurements so the numbers compare:
  * a tool call's wall time is the interval between the timestamp of the
    assistant message carrying the tool_use and the timestamp of the
    tool_result that answers it (iteration-cost.md, "Sources" [T]);
  * an agent's wall is its first to its last record; model time is wall
    minus tool time;
  * a path touched is a path named in a tool_use input, and nothing else is
    measurable this way (provenance.md, "Method").
"""

import argparse, csv, json, os, re, sys
from collections import Counter, defaultdict
from datetime import datetime

WORKFLOWS = {
    'wf_aabc0cb2-d31': 'relaunch',   # the run that landed
    'wf_9777a563-c5e': 'cut',        # the 22:57 launch cut by the platform restart
    'wf_9b6732fc-64c': 'probe',      # the four-trivial-agent concurrency probe
}


def ts(s):
    return datetime.fromisoformat(s.replace('Z', '+00:00'))


# --------------------------------------------------------------------------
# path classification (provenance.md section 1 and 4)
# --------------------------------------------------------------------------

SPEC_PROSE = re.compile(r'Specification(?:-1\.0-frozen)?/(basic|basic-lib|advanced|advanced-lib|appendices)/')
SPEC_API = re.compile(r'Specification(?:-1\.0-frozen)?/library/')
SPEC_ANY = re.compile(r'Specification(?:-1\.0-frozen)?/')
MAP_PART = re.compile(r'coordinator/map/([A-Za-z-]+)\.md')
MAP_DIR = re.compile(r'coordinator/map/?(?![A-Za-z-]+\.md)')
INTERP_LIB = re.compile(r'(FortressLibrary\.(?:fss|fsi)|FortressBuiltin\.(?:fss|fsi))')
PAPERS = re.compile(r'(^|[^A-Za-z])Papers/|(^|[^A-Za-z/])research/')
NOTE_PASSAGE = re.compile(r'\\note\{|\\note\b')

# a command that only writes the word into a commit message / report is not an open
HEREDOC = re.compile(r"<<\s*'?(EOF|MSG|PY|TXT)'?")


def spec_files(text):
    """Every distinct Specification/ path mentioned, split prose vs library."""
    prose = set(re.findall(r'Specification(?:-1\.0-frozen)?/(?:basic|basic-lib|advanced|advanced-lib|appendices)/[A-Za-z0-9_./-]*\.tex', text))
    api = set(re.findall(r'Specification(?:-1\.0-frozen)?/library/[A-Za-z0-9_./-]*\.tex', text))
    return prose, api


# --------------------------------------------------------------------------
# command classification (iteration-cost.md section B)
# --------------------------------------------------------------------------

POLL = re.compile(r"for i in \$\(seq|until grep|while ! grep|\bsleep \d")


def classify_cmd(cmd, dur):
    """The class of work a Bash call did.

    This batch backgrounded every long step (nohup ... &) and then blocked in a
    poll loop, so a build's wall shows up in the poll call, not in the launch.
    A poll is therefore attributed to whatever its sentinel or log names, which
    is how the build bill below is recovered.
    """
    c = cmd
    if POLL.search(c) and dur >= 5:
        if re.search(r'testFast', c):
            return 'ant testFast (polled)'
        if re.search(r'testSystem', c):
            return 'ant testSystem (polled)'
        if re.search(r'compileAll|build-pass|build-guard', c):
            return 'ant compileAll (polled)'
        if re.search(r'library\.end|cache-rebuild|CACHE_REBUILD', c):
            return 'cache rebuild (polled)'
        # "compile-ladder" is in every output path, so match the driver itself
        if re.search(r'ladder-subset|LADDER_ROOT|ladder\.done|run-subset', c):
            return 'ladder subset (polled)'
        return 'probe/differential run (polled)'
    # a command that mentions a build but returns fast was reading about it
    if re.search(r'\bant\b[^|;&]*\btestFast\b', c) and dur >= 20:
        return 'ant testFast'
    if re.search(r'\bant\b[^|;&]*\btestSystem\b', c) and dur >= 20:
        return 'ant testSystem'
    if re.search(r'\bant\b[^|;&]*\bcompileAll\b', c) and dur >= 20:
        return 'ant compileAll'
    if re.search(r'\bant\b', c) and dur >= 20:
        return 'ant other'
    if 'run-ladder.sh' in c and dur >= 20:
        return 'ladder driver'
    if c.count('fortress compile') >= 3 or ('library-order' in c and 'fortress' in c):
        return 'cache rebuild (library order)'
    if 'fortress junit' in c:
        return 'fortress junit'
    if re.search(r'bin/fortress\s+(compile|run)\b', c) or re.search(r'\bfortress\s+(compile|run)\b', c):
        return 'fortress compile/run'
    if re.search(r'^\s*(git|.*&&\s*git)\b', c) or c.strip().startswith('git '):
        return 'git'
    if re.search(r'\bgit (commit|push)\b', c):
        return 'git'
    if POLL.search(c):
        return 'poll/wait (short)'
    return 'read/grep/edit/misc'


EDIT_TARGET = re.compile(r'[A-Za-z0-9_/.\\-]*(?:ProjectFortress/src|Library/|LibraryBuiltin/)[A-Za-z0-9_/.\\-]*\.(java|scala|fss|fsi)')


def is_source_edit(name, inp):
    """True when this call mutates a compiler or library source file."""
    if name in ('Edit', 'Write', 'NotebookEdit'):
        p = str(inp.get('file_path', ''))
        return bool(EDIT_TARGET.search(p)) or p.endswith(('.java', '.scala')) and 'ProjectFortress' in p
    if name != 'Bash':
        return False
    c = str(inp.get('command', ''))
    if not EDIT_TARGET.search(c):
        return False
    # a copy of a source into tmp/, or a probe program written under probes/,
    # is not an edit of the tree
    if re.search(r'>\s*\S*tmp/|tmp/\S*\.java', c) or 'probes' in c:
        return False
    if re.search(r"\bsed\s+-i", c) or re.search(r"\bpatch\b", c):
        return True
    if re.search(r">\s*\S*\.(java|scala|fss|fsi)\b", c):
        return True
    if 'python3' in c and re.search(r"\.write\(|open\([^)]*['\"]w", c):
        return True
    return False


def is_test_write(name, inp):
    """Writing the new failing test into a *_tests/ corpus."""
    blob = json.dumps(inp)
    if not re.search(r'(compiler_tests|library_tests|other_compiler_tests)/', blob):
        return False
    if name in ('Write', 'Edit'):
        return True
    return bool(re.search(r"(cat\s*>|tee|sed\s+-i|>\s*\S*(compiler_tests|library_tests)\S*)", blob))


# --------------------------------------------------------------------------

def parse_agent(path):
    recs = []
    for line in open(path):
        line = line.strip()
        if line:
            recs.append(json.loads(line))
    aid = os.path.basename(path).split('-')[1].split('.')[0]
    meta = json.load(open(path.replace('.jsonl', '.meta.json')))

    times = [ts(r['timestamp']) for r in recs if 'timestamp' in r]
    start, end = min(times), max(times)

    # tool_use -> timestamp of the assistant message it sits in
    use_at, use_call = {}, {}
    result_at = {}
    tokens = Counter()
    n_assistant = 0
    for r in recs:
        if r.get('type') == 'assistant':
            n_assistant += 1
            u = r['message'].get('usage') or {}
            for k in ('input_tokens', 'output_tokens', 'cache_creation_input_tokens', 'cache_read_input_tokens'):
                tokens[k] += u.get(k, 0)
            for b in r['message'].get('content', []):
                if b.get('type') == 'tool_use':
                    use_at[b['id']] = ts(r['timestamp'])
                    use_call[b['id']] = (b['name'], b.get('input') or {})
        elif r.get('type') == 'user':
            content = r.get('message', {}).get('content')
            if isinstance(content, list):
                for b in content:
                    if b.get('type') == 'tool_result':
                        result_at[b['tool_use_id']] = ts(r['timestamp'])

    calls = []
    for tid, (name, inp) in use_call.items():
        t0 = use_at[tid]
        t1 = result_at.get(tid)
        dur = (t1 - t0).total_seconds() if t1 else 0.0
        calls.append({'id': tid, 'name': name, 'input': inp, 't0': t0, 'dur': dur})
    calls.sort(key=lambda c: c['t0'])

    tool_s = sum(c['dur'] for c in calls)

    return {
        'agent': aid,
        'label': meta.get('description'),
        'phase': meta.get('workflowPhase'),
        # the transcripts carry model names; the committed artifacts do not
        'model_pin': 'pinned' if meta.get('model') else 'session',
        'start': start,
        'end': end,
        'wall_s': (end - start).total_seconds(),
        'tool_s': tool_s,
        'calls': calls,
        'tokens': tokens,
        'n_assistant': n_assistant,
        'records': recs,
    }


def blob_of(call):
    inp = call['input']
    if call['name'] == 'Bash':
        return str(inp.get('command', ''))
    return json.dumps(inp)


def provenance(agent):
    """provenance.md's counts, per agent."""
    p = Counter()
    hits = defaultdict(list)
    for i, c in enumerate(agent['calls']):
        b = blob_of(c)
        heredoc = bool(HEREDOC.search(b)) and 'git commit' in b
        if SPEC_ANY.search(b):
            p['spec_any'] += 1
            if heredoc:
                p['spec_heredoc_only'] += 1
            prose, api = spec_files(b)
            if SPEC_PROSE.search(b):
                p['spec_prose'] += 1
                hits['spec_prose'].append((i, sorted(prose) or [b[:80]]))
            if SPEC_API.search(b):
                p['spec_api'] += 1
                hits['spec_api'].append((i, sorted(api) or [b[:80]]))
            if not SPEC_PROSE.search(b) and not SPEC_API.search(b):
                p['spec_other'] += 1
                hits['spec_other'].append((i, b[:120]))
        for m in set(MAP_PART.findall(b)):
            p['map:' + m] += 1
            hits['map'].append((i, m))
        if MAP_PART.search(b) or 'coordinator/map' in b:
            p['map_any'] += 1
        if INTERP_LIB.search(b):
            p['interp_lib'] += 1
            hits['interp_lib'].append((i, b[:120]))
        if PAPERS.search(b):
            p['papers_research'] += 1
            hits['papers_research'].append((i, b[:120]))
        if NOTE_PASSAGE.search(b):
            p['note_passage'] += 1
    return p, hits


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--repo', default='/home/user/fortress',
                    help='the repository, for cross-checking the records\' citations')
    args = ap.parse_args()
    os.makedirs(args.out, exist_ok=True)

    all_agents = []
    for wf, kind in WORKFLOWS.items():
        d = os.path.join(args.root, wf)
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            if f.startswith('agent-') and f.endswith('.jsonl'):
                a = parse_agent(os.path.join(d, f))
                a['wf'] = wf
                a['kind'] = kind
                all_agents.append(a)

    rows = []
    for a in sorted(all_agents, key=lambda x: (x['kind'], x['start'])):
        p, hits = provenance(a)
        cls = Counter()
        cls_s = Counter()
        for c in a['calls']:
            k = classify_cmd(blob_of(c), c['dur']) if c['name'] == 'Bash' else 'non-Bash tool'
            cls[k] += 1
            cls_s[k] += c['dur']
        a['cls'], a['cls_s'], a['prov'], a['hits'] = cls, cls_s, p, hits
        tk = a['tokens']
        rows.append({
            'workflow': a['wf'], 'kind': a['kind'], 'agent': a['agent'],
            'label': a['label'], 'phase': a['phase'], 'model_pin': a['model_pin'],
            'start_utc': a['start'].strftime('%H:%M:%S'), 'end_utc': a['end'].strftime('%H:%M:%S'),
            'wall_min': round(a['wall_s'] / 60, 1),
            'tool_min': round(a['tool_s'] / 60, 1),
            'model_min': round((a['wall_s'] - a['tool_s']) / 60, 1),
            'tool_pct': round(100 * a['tool_s'] / a['wall_s'], 1) if a['wall_s'] else 0,
            'calls': len(a['calls']),
            'in_tok': tk['input_tokens'], 'out_tok': tk['output_tokens'],
            'cache_create': tk['cache_creation_input_tokens'], 'cache_read': tk['cache_read_input_tokens'],
            'spec_any': p['spec_any'], 'spec_prose': p['spec_prose'], 'spec_api': p['spec_api'],
            'spec_other': p['spec_other'], 'map_any': p['map_any'],
            'interp_lib': p['interp_lib'], 'papers_research': p['papers_research'],
            'ant_testFast': cls['ant testFast'], 'ant_testSystem': cls['ant testSystem'],
            'ant_compileAll': cls['ant compileAll'],
            'cache_rebuild': cls['cache rebuild (library order)'],
            'git_calls': cls['git'],
            'build_min': round((cls_s['ant testFast'] + cls_s['ant testSystem'] + cls_s['ant compileAll']
                                + cls_s['ant other'] + cls_s['cache rebuild (library order)']) / 60, 1),
        })

    csv_path = os.path.join(args.out, 'agents.csv')
    with open(csv_path, 'w', newline='') as fh:
        w = csv.DictWriter(fh, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    # ---- summary to stdout ----
    def show(kind, title):
        sel = [a for a in all_agents if a['kind'] == kind]
        if not sel:
            return
        sel.sort(key=lambda a: a['start'])
        span0, span1 = min(a['start'] for a in sel), max(a['end'] for a in sel)
        wall = sum(a['wall_s'] for a in sel) / 60
        tool = sum(a['tool_s'] for a in sel) / 60
        ncalls = sum(len(a['calls']) for a in sel)
        tk = Counter()
        for a in sel:
            tk.update(a['tokens'])
        print('\n=== %s (%s) ===' % (title, kind))
        print('span %s .. %s = %.1f min' % (span0.isoformat(), span1.isoformat(),
                                            (span1 - span0).total_seconds() / 60))
        print('agents %d   agent-wall %.1f min   tool %.1f min (%.1f%%)   model %.1f min   calls %d'
              % (len(sel), wall, tool, 100 * tool / wall if wall else 0, wall - tool, ncalls))
        print('tokens in=%d out=%d cache_create=%d cache_read=%d  SUM(all)=%d'
              % (tk['input_tokens'], tk['output_tokens'], tk['cache_creation_input_tokens'],
                 tk['cache_read_input_tokens'],
                 tk['input_tokens'] + tk['output_tokens'] + tk['cache_creation_input_tokens'] + tk['cache_read_input_tokens']))
        print('%-14s %-8s %-8s %6s %6s %6s %5s  %s' %
              ('label', 'start', 'end', 'wall', 'tool', 'model', 'calls', 'spec(prose/api) map interp'))
        for a in sel:
            p = a['prov']
            print('%-14s %-8s %-8s %6.1f %6.1f %6.1f %5d  %d/%d %d %d' %
                  (a['label'], a['start'].strftime('%H:%M:%S'), a['end'].strftime('%H:%M:%S'),
                   a['wall_s'] / 60, a['tool_s'] / 60, (a['wall_s'] - a['tool_s']) / 60,
                   len(a['calls']), p['spec_prose'], p['spec_api'], p['map_any'], p['interp_lib']))
        # concurrency
        print('-- overlaps:')
        for i, a in enumerate(sel):
            for b in sel[i + 1:]:
                lo = max(a['start'], b['start'])
                hi = min(a['end'], b['end'])
                if (hi - lo).total_seconds() > 0:
                    print('   %s || %s  %.1f min' % (a['label'], b['label'], (hi - lo).total_seconds() / 60))
        # command classes
        cls, cls_s = Counter(), Counter()
        for a in sel:
            cls.update(a['cls'])
            for k, v in a['cls_s'].items():
                cls_s[k] += v
        print('-- command classes:')
        for k, v in cls_s.most_common():
            print('   %-32s n=%-4d %7.1f min' % (k, cls[k], v / 60))
        # map parts
        mp = Counter()
        for a in sel:
            for k, v in a['prov'].items():
                if k.startswith('map:'):
                    mp[k] += v
        print('-- map parts:', dict(mp))

    show('relaunch', 'the run that landed, wf_aabc0cb2-d31')
    show('cut', 'the launch cut by the restart, wf_9777a563-c5e')
    show('probe', 'the concurrency probe, wf_9b6732fc-64c')

    # ---- per-agent detail: spec/map/interp hits, and the rule-1/rule-2 ordering ----
    print('\n=== detail: what each agent opened, and when it first edited source ===')
    for a in sorted([x for x in all_agents if x['kind'] != 'probe'], key=lambda x: (x['kind'], x['start'])):
        print('\n-- %s/%s (%s)' % (a['wf'][:13], a['label'], a['phase']))
        first_edit = None
        first_test = None
        for i, c in enumerate(a['calls']):
            if first_edit is None and is_source_edit(c['name'], c['input']):
                first_edit = (i, c['t0'])
            if first_test is None and is_test_write(c['name'], c['input']):
                first_test = (i, c['t0'])
        for key in ('map', 'spec_prose', 'spec_api', 'spec_other', 'interp_lib', 'papers_research'):
            for i, what in a['hits'].get(key, []):
                print('   %-14s call#%-4d %s  %s' % (key, i, a['calls'][i]['t0'].strftime('%H:%M:%S'), what))
        print('   FIRST TEST WRITE : %s' % (('call#%d %s' % (first_test[0], first_test[1].strftime('%H:%M:%S'))) if first_test else 'none'))
        print('   FIRST SOURCE EDIT: %s' % (('call#%d %s' % (first_edit[0], first_edit[1].strftime('%H:%M:%S'))) if first_edit else 'none'))

    # ---- every Specification citation in the batch's records, against the transcripts ----
    if args.repo:
        print('\n=== every Specification/ citation in the batch records, against what an agent opened ===')
        cite = re.compile(r'(?:Specification/)?((?:basic|basic-lib|advanced|advanced-lib|appendices|library)/[A-Za-z0-9_./-]*\.tex):([0-9,–-]+)')
        # what each agent opened: file -> list of (agent, lo, hi)
        opened = defaultdict(list)
        for a in all_agents:
            if a['kind'] == 'probe':
                continue
            for c in a['calls']:
                b = blob_of(c)
                files = set(re.findall(r'Specification(?:-1\.0-frozen)?/([A-Za-z0-9_./-]+\.tex)', b))
                # a command that has already cd'd into Specification/ names the
                # chapter by its bare path, so index the basename as well
                files |= set(os.path.basename(x) for x in files)
                files |= set(m for m in re.findall(r'\b([a-z][A-Za-z0-9_-]*\.tex)\b', b)
                             if 'Specification' in b)
                if not files:
                    continue
                rngs = [(int(x), int(y)) for x, y in re.findall(r"(\d+),(\d+)p", b)]
                rngs += [(int(x), int(y)) for x, y in re.findall(r"NR>=(\d+) && NR<=(\d+)", b)]
                # a whole-file read opens every line; a grep shows only the
                # lines that match its pattern, so it is not evidence that a
                # cited passage was read
                whole = bool(re.search(r"\bcat \S+\.tex|grep -n \"\" \S+\.tex", b))
                for f in files:
                    if whole and not rngs:
                        opened[f].append((a['label'], 0, 10 ** 9))
                    for lo, hi in rngs:
                        opened[f].append((a['label'], lo, hi))
        recs = []
        for d in ('repair-r1-atomic-static', 'repair-r2-literal-wrap'):
            for n in ('REPORT.md', 'record.md', 'SKEPTIC.md', 'JUDGE.md'):
                p = os.path.join(args.repo, 'explorations/compile-ladder', d, n)
                if os.path.exists(p):
                    recs.append(p)
        recs.append(os.path.join(args.repo, 'explorations/fortress-gap-ledger.md'))
        seen = {}
        for p in recs:
            text = open(p).read()
            if p.endswith('fortress-gap-ledger.md'):
                text = '\n'.join(l for l in text.splitlines()
                                 if re.match(r'\| 3(19|2[0-8]) \|', l))
            for m in cite.finditer(text):
                f, spans = m.group(1), m.group(2)
                for part in re.split(r',', spans):
                    part = part.strip().replace('–', '-')
                    if not part:
                        continue
                    bits = part.split('-')
                    try:
                        lo = int(bits[0]); hi = int(bits[-1]) if len(bits) > 1 else lo
                    except ValueError:
                        continue
                    seen.setdefault((f, lo, hi), set()).add(os.path.basename(os.path.dirname(p)) + '/' + os.path.basename(p))
        for (f, lo, hi), where in sorted(seen.items()):
            hits = [lab for lab, a, z in opened.get(f, []) + opened.get(os.path.basename(f), [])
                    if a <= lo and z >= hi]
            print('  %-42s %-9s %-28s %s' % (f, '%d-%d' % (lo, hi), ','.join(sorted(set(where)))[:28],
                                             ('OPENED by ' + ','.join(sorted(set(hits)))[:60]) if hits else '*** NOT OPENED AT THESE LINES'))

    print('\nCSV written to %s' % csv_path)


if __name__ == '__main__':
    main()
