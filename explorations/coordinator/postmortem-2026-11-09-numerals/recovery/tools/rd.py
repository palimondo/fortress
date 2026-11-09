"""Reader for the main coordinating transcript. Line numbers are 1-based
(line N = sed -n 'Np'); view.py and his-messages.md count from 0.
Usage as module: from rd import *  (lines(), kind(d), text(d), tool_uses(d))"""
import json, re
J = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl'
HARNESS = ('<system-reminder>', 'Another Claude session sent a message', '<agent-message',
           '<task-notification', '<command-name>', '[Request interrupted', 'This session is being continued',
           '<local-command', 'Base directory for this skill', '(Re-invocation', 'Caveat:')
def strip_sr(s): return re.sub(r'<system-reminder>.*?</system-reminder>', '', s, flags=re.S).strip()
def lines(path=J, a='', b='9999'):
    with open(path) as f:
        for i, l in enumerate(f, 1):
            d = json.loads(l); ts = d.get('timestamp') or ''
            if a <= ts <= b: yield i, d
def raw_texts(d):
    c = (d.get('message') or {}).get('content')
    if isinstance(c, str): return [c]
    return [x.get('text', '') for x in c or [] if isinstance(x, dict) and x.get('type') == 'text']
def has_tool_result(d):
    c = (d.get('message') or {}).get('content')
    return isinstance(c, list) and any(isinstance(x, dict) and x.get('type') == 'tool_result' for x in c)
def kind(d):
    """'his' for a message the curator typed; otherwise a label."""
    t = d.get('type')
    if t == 'assistant': return 'asst'
    if t != 'user': return t
    if has_tool_result(d): return 'tool_result'
    if d.get('isCompactSummary'): return 'compact'
    o = (d.get('origin') or {}).get('kind')
    s = '\n'.join(raw_texts(d)); body = strip_sr(s)
    if not body: return 'empty-reminder'
    for h in HARNESS:
        if body.lstrip().startswith(h): return 'harness:' + h[:30]
    if d.get('isMeta'): return 'meta'
    if o and o != 'human': return 'origin:' + o
    return 'his'
def his_text(d): return strip_sr('\n'.join(raw_texts(d)))
def asst_text(d): return '\n'.join(raw_texts(d))
def tool_uses(d):
    c = (d.get('message') or {}).get('content')
    return [x for x in c or [] if isinstance(x, dict) and x.get('type') == 'tool_use'] if isinstance(c, list) else []
if __name__ == '__main__':
    # Usage: python3 -I rd.py N[,M...]  prints each 1-based line's kind, time, texts and tool-call inputs, whole.
    import sys
    want = {int(x) for x in sys.argv[1].split(',')}
    for i, d in lines():
        if i in want:
            print(f'=== L{i} {d.get("timestamp")} {kind(d)}')
            for s in raw_texts(d): print(strip_sr(s) if d.get('type') == 'user' else s)
            for t in tool_uses(d): print(f'[tool_use {t["name"]}]'); print(json.dumps(t['input'], ensure_ascii=False, indent=1))
        if i > max(want): break
