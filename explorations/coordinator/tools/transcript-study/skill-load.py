#!/usr/bin/env python3
# skill-load.py [--repo DIR] RUN_DIR [RUN_DIR...]
#
# The measure the earlier transcript studies lacked (explorations/coordinator/process-engineering/skill-effect.md):
# per agent of a Workflow run, the calls that load a skill and the parts of .claude/skills/ it reads.
# RUN_DIR is a run's directory (<project>/<session>/subagents/workflows/wf_<id>/: one agent-<id>.jsonl and
# agent-<id>.meta.json per agent, the label in the meta file's "description"), as for tools/batch-measures.py.
# Nothing is run; the transcripts are only read.
#
#   writes:     input plus cache-creation tokens, each message counted once by its id (labor.md's method).
#   loads:      tool calls named Skill, with the skill's name; "load text" is the text the harness injects after
#               such a call (a user message that opens "Base directory for this skill:"), in characters and in
#               tokens at labor.md's 0.40 a character.
#   parts read: Bash, Read, Grep and Glob calls that name a file under .claude/skills/: SKILL.md or a
#               references/ part. A part is a *.md name that exists in .claude/skills/ in some commit of the
#               repository's history (git log --all), so that a skill's older parts count too. A Bash call that
#               enters a skills folder (cd) and then names parts relative to it counts for those parts. A call that
#               names no part (ls, grep -r) counts as "(search of skills)". The result of a call is charged
#               0.40 tokens a character plus 110 (labor.md), shared equally between the parts the call names.
#   brief:      whether the agent's first message names the skill (the word fortress-repo).
#
#   ITE:        the same reading as input-token equivalents (testing-practices.md, "Words used": cache write 1.25,
#               cache read 0.05 for each later turn), the measure in which the relearning of the old batches was priced.
#
# Output: one line per agent, then a line per run: agents that loaded fortress-repo, the load text, the reading of
# parts, each as tokens and as a share of the run's writes.
import glob, json, os, re, subprocess, sys
from collections import defaultdict

def known_parts(repo):
    names = set()
    try:
        out = subprocess.run(['git', '-C', repo, 'log', '--all', '--name-only', '--format=', '--', '.claude/skills'],
                             capture_output=True, text=True, timeout=60).stdout
        for l in out.split('\n'):
            if l.endswith('.md'):
                names.add(os.path.basename(l))
    except Exception:
        pass
    return names

def text_of(x):
    if isinstance(x, str):
        return x
    if isinstance(x, list):
        return '\n'.join(b.get('text', '') for b in x if isinstance(b, dict))
    return ''

def tok(chars, calls=0):
    return 0.40 * chars + 110 * calls

def agent(path, parts_known):
    seen, order = {}, []
    first_user = None
    loads, load_chars, calls_by_id = [], 0, {}
    parts = defaultdict(lambda: [0, 0.0, 0.0])     # part -> [calls, tokens written, ITE]
    pending = []                                   # (turn, part names, result chars, command chars), for the ITE
    load_turn = None
    for line in open(path, errors='replace'):
        try:
            r = json.loads(line)
        except Exception:
            continue
        m = r.get('message') if isinstance(r.get('message'), dict) else None
        if not m:
            continue
        if r.get('type') == 'user':
            c = m.get('content')
            if first_user is None and isinstance(c, str):
                first_user = c
            if isinstance(c, list):
                for b in c:
                    if not isinstance(b, dict):
                        continue
                    if b.get('type') == 'text':
                        t = b.get('text', '')
                        if first_user is None:
                            first_user = t
                        if t.startswith('Base directory for this skill:'):
                            load_chars += len(t)
                            load_turn = len(order)
                    elif b.get('type') == 'tool_result':
                        call = calls_by_id.pop(b.get('tool_use_id'), None)
                        if call:
                            names, turn, cmdlen = call
                            res = text_of(b.get('content'))
                            t = tok(len(res), 1)
                            ns = names or ['(search of skills)']
                            for n in ns:
                                parts[n][0] += 1
                                parts[n][1] += t / len(ns)
                            pending.append((turn, ns, len(res), cmdlen))
        if r.get('type') == 'assistant':
            for c in m.get('content') or []:
                if not isinstance(c, dict) or c.get('type') != 'tool_use':
                    continue
                nm, inp = c.get('name'), c.get('input') or {}
                if nm == 'Skill':
                    loads.append(inp.get('skill') or '?')
                    continue
                blob = ''
                if nm == 'Bash':
                    blob = inp.get('command') or ''
                elif nm in ('Read', 'Grep', 'Glob', 'Edit', 'Write'):
                    blob = ' '.join(str(inp.get(k) or '') for k in ('file_path', 'path', 'pattern'))
                if '.claude/skills' not in blob and 'skills/fortress-repo' not in blob:
                    continue
                names = []
                sk = re.search(r'skills/([\w-]+)', blob)
                sk = sk.group(1) if sk else '?'
                for mm in re.finditer(r'([\w.-]+\.md)\b', blob):
                    n = mm.group(1)
                    if n in parts_known and n not in names:
                        names.append(n)
                names = ['%s/%s' % (sk, n) for n in names]
                calls_by_id[c.get('id')] = (names, len(order), len(blob))
        if 'usage' in m:
            mid = m.get('id') or id(m)
            if mid not in seen:
                order.append(mid)
            seen[mid] = m['usage']
    w = sum(u.get('input_tokens', 0) + u.get('cache_creation_input_tokens', 0) for u in (seen[k] for k in order))
    T = len(order)
    # ITE, the input-token equivalents of testing-practices.md (cost.py's call_cost): a result's tokens (0.41 a byte
    # plus 110) at 1.25 for the write and 0.05 for each later turn; the command at 0.28 a character, written as output
    # (5) and then as input at the same rate.
    for turn, ns, rchars, cchars in pending:
        ite = (0.41 * rchars + 110) * (1.25 + 0.05 * max(0, T - turn - 1)) + 0.28 * cchars * (5 + 1.25 + 0.05 * max(0, T - turn))
        for n in ns:
            parts[n][2] += ite / len(ns)
    load_ite = (0.41 * load_chars) * (1.25 + 0.05 * max(0, T - (load_turn or 1) - 1)) if load_chars else 0.0
    return dict(written=w, loads=loads, load_tok=tok(load_chars), load_ite=load_ite, parts=dict(parts),
                brief_names=bool(first_user and 'fortress-repo' in first_user))

def k(n):
    return '%.0fK' % (n / 1000.0) if n < 1e6 else '%.2fM' % (n / 1e6)

def main():
    args = sys.argv[1:]
    repo = os.getcwd()
    if args[:1] == ['--repo']:
        repo, args = args[1], args[2:]
    pk = known_parts(repo)
    for run in args:
        ags = []
        for meta in sorted(glob.glob(os.path.join(run, 'agent-*.meta.json'))):
            try:
                label = json.load(open(meta)).get('description') or '?'
            except Exception:
                continue
            jl = meta[:-len('.meta.json')] + '.jsonl'
            if os.path.isfile(jl):
                a = agent(jl, pk)
                a['label'] = label
                a['id'] = os.path.basename(jl)[6:-6]
                ags.append(a)
        total = sum(a['written'] for a in ags)
        print('# %s: %d agents, %s written' % (os.path.basename(run.rstrip('/')), len(ags), k(total)))
        print('label\tid\twrites\tbrief names skill\tSkill calls\tload text\tparts read (calls)\tparts tokens')
        for a in ags:
            pr = a['parts']
            print('%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s' % (
                a['label'], a['id'][:8], k(a['written']), 'yes' if a['brief_names'] else 'no',
                ','.join(a['loads']) or '-', k(a['load_tok']) if a['load_tok'] else '-',
                ' '.join('%s:%d' % (n, v[0]) for n, v in sorted(pr.items(), key=lambda x: -x[1][1])) or '-',
                k(sum(v[1] for v in pr.values())) if pr else '-'))
        fr = [a for a in ags if 'fortress-repo' in a['loads']]
        lt = sum(a['load_tok'] for a in ags)
        pt = sum(v[1] for a in ags for v in a['parts'].values())
        lite = sum(a['load_ite'] for a in ags)
        pite = sum(v[2] for a in ags for v in a['parts'].values())
        pc = sum(v[0] for a in ags for v in a['parts'].values())
        other = sorted(set(s for a in ags for s in a['loads'] if s != 'fortress-repo'))
        byp = defaultdict(lambda: [0, 0.0])
        for a in ags:
            for n, v in a['parts'].items():
                byp[n][0] += v[0]; byp[n][1] += v[1]
        sh = lambda x: '%.1f%%' % (100.0 * x / total) if total else '-'
        print('run total\tagents %d\tloaded fortress-repo %d\tbrief names it %d\tother skills %s\tload text %s (%s)\tparts read: %d calls, %s (%s)' % (
            len(ags), len(fr), sum(a['brief_names'] for a in ags), ','.join(other) or '-', k(lt), sh(lt), pc, k(pt), sh(pt)))
        print('run total ITE\tload text %s, parts read %s, together %s' % (k(lite), k(pite), k(lite + pite)))
        print('parts of the run\t' + ', '.join('%s %d calls %s' % (n, v[0], k(v[1])) for n, v in sorted(byp.items(), key=lambda x: -x[1][1])))
        print()

if __name__ == '__main__':
    main()
