#!/usr/bin/env python3
"""Print a verbatim view of the coordinating session's transcript between two
UTC times, for the post-mortem of 2026-11-16.

    view.py FROM TO [--his] [--index] [TRANSCRIPT]

FROM and TO are ISO times, such as 2026-11-16T00:20 and 2026-11-16T02:20.
--his prints only the curator's own messages; without it the coordinator's
texts are printed too. --index prints one line for each message, its time and
its first 110 characters. The transcript defaults to this session's file; a
backed-up copy is on the branch transcripts-blinded.
"""
import json, sys

DEFAULT = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl'

def text_of(message):
    content = message.get('content')
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return '\n'.join(part.get('text', '') for part in content
                         if isinstance(part, dict) and part.get('type') == 'text')
    return ''

def is_his(text):
    head = text.lstrip()[:80]
    return bool(text.strip()) and not head.startswith('<') and not head.startswith('[SYSTEM') \
        and not head.startswith('Another Claude session') and not head.startswith('This session is being continued') \
        and not head.startswith('(Re-invocation of') and not head.startswith('Base directory for this skill')

def main(argv):
    flags = {a for a in argv if a.startswith('--')}
    args = [a for a in argv if not a.startswith('--')]
    start, end = args[0], args[1]
    path = args[2] if len(args) > 2 else DEFAULT
    with open(path) as lines:
        for number, line in enumerate(lines, 1):
            try:
                entry = json.loads(line)
            except ValueError:
                continue
            stamp = entry.get('timestamp') or ''
            if not (start <= stamp <= end + '~'):
                continue
            kind = entry.get('type')
            if kind not in ('user', 'assistant'):
                continue
            text = text_of(entry.get('message') or {})
            if kind == 'user' and not is_his(text):
                continue
            if kind == 'assistant' and ('--his' in flags or not text.strip()):
                continue
            who = 'he' if kind == 'user' else 'coordinator'
            if '--index' in flags:
                print('%s  line %d  %s: %s' % (stamp[:16], number, who, ' '.join(text.split())[:110]))
            else:
                print('=== %s  line %d  %s\n%s\n' % (stamp, number, who, text))

if __name__ == '__main__':
    main(sys.argv[1:])
