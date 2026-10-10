#!/usr/bin/env python3
# replay-check.py NOTE [--work DIR]
#
# Shows that the recovered scripts are the ones the earlier studies ran: it replays the computational calls of the
# note's author, in the order of the author's transcript, and compares what each prints with what the transcript
# stored as that call's result.
#
#   NOTE   labor | checking-roles | testing-practices | context-study (the author is named in README.md)
#   --work the scratch folder for the replay (default ./replay-work). It takes the place of the author's own scratch
#          folder, which is gone.
#
# How: every Bash call of the author that names the author's scratch folder or runs python3 is run again, in order,
# as written, inside a private mount namespace (unshare -m, so it needs root) in which the author's scratch path is
# bound to the work folder and the live path of the session's transcripts is bound to the backup copy (the live
# folder no longer holds batches 8 to 10). So no path in any command is changed. Files the author wrote with a
# Write call go to the work folder. Not run: calls that commit, add or push; calls that write or append to the note's
# prose or to INDEX.md, in write or append mode (a call that appends the note's INDEX line, run again, would add a
# duplicate line to the real INDEX.md); calls that name neither the scratch folder nor python3. The output of a replayed
# call is "same" when it equals the stored result line by line, trailing blanks ignored.
#
# Prints, for the note, the calls compared and the calls that differ, each with its first differing lines. The
# differences found on 2026-10-09 are explained in README.md ("Re-running: the same figures").
import json, os, re, subprocess, sys, time, difflib

BAKS = '/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d'
LIVES = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d'
OLD = '/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad'
AUTHORS = {'labor': 'a65c4632fd664fceb', 'checking-roles': 'aa122ba984c79739f',
           'testing-practices': 'af6381052a41159c8', 'context-study': 'a291b83dd2cbf44d4'}

def strip_heredocs(s):
    out, tag = [], None
    for line in s.split('\n'):
        if tag is not None:
            if line.strip() == tag:
                tag = None
            continue
        out.append(line)
        m = re.search(r'<<-?\s*[\'"]?(\w+)[\'"]?', line)
        if m:
            tag = m.group(1)
    return '\n'.join(out)

def eligible(cmd):
    sh = strip_heredocs(cmd)
    if re.search(r'(^|[;&|(]\s*)git (commit|add|push|checkout|reset|mv|rm|stash)', sh, re.M):
        return False, 'git-mutating'
    if re.search(r"open\(\s*p\s*,\s*['\"][wa]|open\([^)]*(process-engineering|INDEX)[^)]*['\"][wa]|INDEX\.md['\"]\s*,\s*['\"][wa]", cmd):
        return False, 'note-edit'
    if re.search(r"open\(\s*['\"][^'\"]*(process-engineering/[\w-]+\.md|INDEX\.md|note-final\.md|note-template2?\.md|"
                 r"(testing-practices|checking-roles-cost|context-study|labor)\.md)['\"]\s*,\s*['\"][wa]", cmd):
        return False, 'note-edit'
    if OLD in cmd or 'python3' in cmd or '$S/' in cmd:
        return True, ''
    return False, 'not-computational'

def main():
    a = sys.argv[1:]
    work = os.path.abspath('replay-work')
    if '--work' in a:
        i = a.index('--work'); work = os.path.abspath(a[i + 1]); del a[i:i + 2]
    note = a[0]
    if note == 'checking-roles':      # its author copied labor's scripts from labor's scratch folder: replay labor first, in the same one
        replay(work, 'labor', quiet=True)
    replay(work, note)

def replay(work, note, quiet=False):
    aid = AUTHORS[note]
    scr = os.path.join(work, 'SCR')
    os.makedirs(scr, exist_ok=True)
    calls, results, seq = [], {}, 0
    for ln, l in enumerate(open(BAKS + '/subagents/agent-%s.jsonl' % aid)):
        d = json.loads(l)
        m = d.get('message')
        if not m or not isinstance(m.get('content'), list):
            continue
        for c in m['content']:
            if c.get('type') == 'tool_use':
                seq += 1
                calls.append(dict(id=c['id'], seq=seq, ln=ln, name=c['name'], input=c['input']))
            elif c.get('type') == 'tool_result':
                x = c['content']
                if isinstance(x, list):
                    x = ''.join(y.get('text', '') for y in x if isinstance(y, dict))
                results[c['tool_use_id']] = x
    out = open(os.path.join(work, 'replay-%s.jsonl' % note), 'w')
    stat = {}
    for c in calls:
        rec = dict(note=note, call='C %d' % c['seq'], line=c['ln'], id=c['id'])
        if c['name'] == 'Write' and OLD in c['input'].get('file_path', ''):
            p = c['input']['file_path'].replace(OLD, scr)
            os.makedirs(os.path.dirname(p), exist_ok=True)
            open(p, 'w').write(c['input']['content'])
            rec['status'] = 'write'
        elif c['name'] == 'Bash':
            cmd = c['input'].get('command', '')
            ok, why = eligible(cmd)
            if not ok:
                rec['status'] = 'skip:' + why
            else:
                env = dict(os.environ, PYTHONHASHSEED='0', CMD=cmd)
                wrap = 'mount --bind %s %s && mount --bind %s %s && exec bash -c "$CMD"' % (BAKS, LIVES, scr, OLD)
                t0 = time.time()
                try:
                    r = subprocess.run(['unshare', '-m', 'bash', '-c', wrap], cwd='/home/user/fortress', env=env,
                                       capture_output=True, timeout=170)
                    new = (r.stdout + r.stderr).decode('utf-8', 'replace')
                    rec['rc'] = r.returncode
                except subprocess.TimeoutExpired:
                    new, rec['rc'] = 'TIMEOUT', -9
                orig = results.get(c['id'], '')
                x = [t.rstrip() for t in orig.strip().split('\n')]
                y = [t.rstrip() for t in new.strip().split('\n')]
                rec['seconds'] = round(time.time() - t0, 1)
                if x == y:
                    rec['status'] = 'same'
                else:
                    rec['status'] = 'diff'
                    dl = [t for t in difflib.unified_diff(x, y, lineterm='', n=0) if not t.startswith(('---', '+++', '@@'))]
                    rec['differing lines'] = len(dl)
                    rec['first'] = [t[:160] for t in dl[:4]]
        else:
            continue
        stat[rec['status'].split(':')[0]] = stat.get(rec['status'].split(':')[0], 0) + 1
        out.write(json.dumps(rec) + '\n')
        if rec['status'] == 'diff' and not quiet:
            print('DIFF %s line %d rc %s, %d differing lines: %s' % (rec['call'], rec['line'], rec.get('rc'), rec['differing lines'], rec['first'][:2]))
    out.close()
    if not quiet:
        print('%s: %s' % (note, stat))

if __name__ == '__main__':
    main()
