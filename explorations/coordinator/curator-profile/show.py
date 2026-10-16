#!/usr/bin/env python3
"""Print the curator's message(s) at a UTC timestamp or its prefix, verbatim.

    python3 -I show.py 2026-10-12T15:53          # every message of his in that minute
    python3 -I show.py 2026-10-12T15:53:07.5     # a finer prefix
    python3 -I show.py --list 2026-10-12         # one line per message (timestamp, source, length, start)
    python3 -I show.py --count                   # how many messages the three sources give

A prefix may use a space instead of the T and may end in Z. All times are UTC.

His messages come from three places, and the header of each printed message says which:
  main  the main-session lines of the transcripts in /root/.claude/projects/-home-user-fortress/
        and /home/user/fortress-transcripts-blinded/projects/-home-user-fortress/ (the .parts
        folders included): `user` lines that are not isMeta, not sidechain, with text content
        that does not start with '<' and is not a compaction summary; deduplicated by uuid,
        because a resumed transcript replays earlier lines.
  s1    the same lines of the first coordinating session (bdff267d), read with `git show` from
        the `transcripts` branch (origin/transcripts) of this repository, 2026-08-18 to 2026-09-17.
        Skipped, with a note on stderr, if that branch is not in the clone.
  queued  a message he queued while an agent was busy that no `user` line holds as its text
        (the queue-operation `enqueue` lines and the queued_command attachments); its time is the
        time he sent it.
Nothing is filtered by author or by kind: a scheduled check-in or a pasted report that arrived as a
`user` line is printed too, so a reader decides what is his.
"""
import glob
import json
import re
import subprocess
import sys

ROOTS = ['/root/.claude/projects/-home-user-fortress',
         '/home/user/fortress-transcripts-blinded/projects/-home-user-fortress']
REPO = '/home/user/fortress'
S1_BRANCH = 'origin/transcripts'
S1_PARTS = ['projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl.parts/000.jsonl',
            'projects/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6.jsonl.parts/001.jsonl']


def _text(content):
    if isinstance(content, list):
        content = '\n'.join(x.get('text', '') for x in content
                            if isinstance(x, dict) and x.get('type') == 'text')
    return content if isinstance(content, str) else None


def _human(d):
    """The text of a `user` line if it is a message typed by a person, else None."""
    if d.get('type') != 'user' or d.get('isMeta') or d.get('isSidechain'):
        return None
    c = _text(d.get('message', {}).get('content'))
    if not c or not c.strip():
        return None
    if c.lstrip().startswith('<') or c.startswith('This session is being continued'):
        return None
    return c


def _skip(line):
    """True for a line that cannot hold a message of his, tested on the raw text so that the
    large assistant and tool-result lines are never parsed. Anything unclear is parsed."""
    if '"operation":"enqueue"' in line or 'queued_command' in line:
        return False
    if '"role":"user"' not in line:
        return True
    return not ('"role":"user","content":"' in line
                or '"role":"user","content":[{"type":"text"' in line
                or '"role":"user","content":[{"type":"image"' in line)


def _lines_main():
    paths = glob.glob(ROOTS[0] + '/*.jsonl') + glob.glob(ROOTS[1] + '/**/*.jsonl', recursive=True)
    for p in sorted(paths):
        if '/subagents/' in p:
            continue
        try:
            f = open(p, errors='replace')
        except OSError:
            continue
        with f:
            for line in f:
                if _skip(line):
                    continue
                try:
                    yield 'main', json.loads(line)
                except ValueError:
                    continue


def _lines_s1():
    for part in S1_PARTS:
        r = subprocess.run(['git', '-C', REPO, 'show', S1_BRANCH + ':' + part], capture_output=True)
        if r.returncode != 0:
            sys.stderr.write('note: %s:%s is not readable; the first session is skipped\n' % (S1_BRANCH, part))
            return
        for line in r.stdout.decode('utf-8', 'replace').splitlines():
            if _skip(line):
                continue
            try:
                yield 's1', json.loads(line)
            except ValueError:
                continue


def _norm(s):
    return re.sub(r'\s+', ' ', s).strip()


def load():
    """All messages, sorted by time: dicts with ts, source, sid, text."""
    seen = {}
    queued = {}
    for src, d in list(_lines_main()) + list(_lines_s1()):
        c = _human(d)
        if c is not None:
            key = d.get('uuid') or (d.get('timestamp'), c[:50])
            seen.setdefault(key, {'ts': d.get('timestamp') or '', 'source': src,
                                  'sid': d.get('sessionId') or '', 'text': c})
            continue
        q = None
        if d.get('type') == 'attachment' and d.get('attachment', {}).get('type') == 'queued_command':
            q = _text(d['attachment'].get('prompt'))
        elif d.get('type') == 'queue-operation' and d.get('operation') == 'enqueue':
            q = _text(d.get('content'))
        if q and q.strip() and not q.lstrip().startswith('<'):
            queued.setdefault(_norm(q), {'ts': d.get('timestamp') or '', 'source': 'queued',
                                         'sid': d.get('sessionId') or '', 'text': q})
    msgs = list(seen.values())
    blob = ' '.join(_norm(m['text']) for m in msgs)
    for n, m in queued.items():
        if n not in blob:
            msgs.append(m)
    msgs.sort(key=lambda m: (m['ts'], m['source']))
    return msgs


def _prefix(arg):
    a = arg.strip().replace(' ', 'T')
    return a[:-1] if a.endswith('Z') else a


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    msgs = load()
    if argv[0] == '--count':
        from collections import Counter
        print(len(msgs), 'messages;', dict(Counter(m['source'] for m in msgs)))
        print('first', msgs[0]['ts'], 'last', msgs[-1]['ts'])
        return 0
    listing = argv[0] == '--list'
    if listing:
        argv = argv[1:]
    pre = _prefix(argv[0]) if argv else ''
    hit = [m for m in msgs if m['ts'].startswith(pre)]
    if not hit:
        print('no message of his at', argv[0] if argv else '(none)')
        return 1
    for m in hit:
        if listing:
            print('%s  %-6s %5d  %s' % (m['ts'], m['source'], len(m['text']), _norm(m['text'])[:70]))
        else:
            print('=== %s  source=%s  session=%s  (%d characters)' % (m['ts'], m['source'], m['sid'][:8], len(m['text'])))
            print(m['text'])
            print()
    if not listing and len(hit) > 1:
        print('(%d messages matched this prefix)' % len(hit))
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
