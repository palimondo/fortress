#!/usr/bin/env python3
"""extract.py counts nothing: one pass over the coordinating session's transcript
(three segments, about 650 MB, de-duplicated by record uuid) that writes a slim
event list to tmp/pm/events-{A,B,C}.jsonl, which the scripts beside it read.

    python3 scripts/extract.py            # about two minutes

The events, one JSON object a line, each with ts (UTC) and ref (SEG:LINE):
  boundary  a compaction: trigger, pre (context before, tokens), post
  summary   the compaction's summary: chars, text
  his       a message of the curator's (origin human): text, queued
  prompt    any other prompt that starts a turn (a worker's notification, a
            check-in, a hook): origin, chars, head
  reply     one record of the coordinator's reply: model, ctx (the context of
            that API call, tokens), out, text, tools [{id, name, inp}]
  result    a tool call's result: id, chars, head (its first 400 characters),
            err, file {path, num, start, total}, agent
  att       an attachment that the harness added: atype and its detail (a file
            re-attached after a compaction, the skills re-attached, a hook's text)
The output is under tmp/, which git ignores; nothing of it is committed.
"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import tlib

def text_of(content):
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return '\n'.join(p.get('text', '') for p in content if isinstance(p, dict) and p.get('type') == 'text')
    return ''

def result_text(content):
    if isinstance(content, str):
        return content
    out = []
    if isinstance(content, list):
        for p in content:
            if isinstance(p, dict):
                out.append((p.get('text') or '') if p.get('type') == 'text' else json.dumps(p))
    return '\n'.join(out)

def slim_input(name, inp):
    if not isinstance(inp, dict):
        return {}
    if name == 'Bash':
        return {'command': (inp.get('command') or '')[:6000], 'bg': bool(inp.get('run_in_background'))}
    if name == 'Read':
        return {k: inp[k] for k in ('file_path', 'offset', 'limit') if k in inp}
    if name in ('Edit', 'Write'):
        return {'file_path': inp.get('file_path'), 'chars': len(inp.get('content') or inp.get('new_string') or '')}
    if name == 'Grep':
        return {k: inp[k] for k in ('pattern', 'path', 'glob') if k in inp}
    if name == 'Skill':
        return {'skill': inp.get('skill')}
    if name in ('Agent', 'Task'):
        p = inp.get('prompt') or ''
        return {'description': inp.get('description'), 'model': inp.get('model'),
                'subagent_type': inp.get('subagent_type'), 'bg': bool(inp.get('run_in_background')),
                'chars': len(p), 'prompt': p[:40000]}
    if name == 'Workflow':
        s = inp.get('script') or ''
        return {'scriptPath': inp.get('scriptPath'), 'args': inp.get('args'), 'resume': inp.get('resumeRunId') or inp.get('resume'),
                'chars': len(s), 'script': s[:3000]}
    if name == 'SendMessage':
        return {'to': inp.get('to'), 'chars': len(inp.get('message') or '')}
    if name == 'Artifact':
        return {k: inp[k] for k in ('action', 'file_path', 'url') if k in inp}
    return {'json': json.dumps(inp)[:400]}

def events_of(e, ref):
    t = e.get('type')
    ts = e.get('timestamp') or ''
    base = {'ts': ts, 'ref': ref}
    if t == 'system' and e.get('subtype') == 'compact_boundary':
        m = e.get('compactMetadata') or {}
        yield dict(base, k='boundary', trigger=m.get('trigger'), pre=m.get('preTokens'), post=m.get('postTokens'))
    elif t == 'user':
        msg = e.get('message') or {}
        content = msg.get('content')
        if e.get('isCompactSummary'):
            text = text_of(content)
            yield dict(base, k='summary', chars=len(text), text=text)
            return
        results = [p for p in content if isinstance(p, dict) and p.get('type') == 'tool_result'] if isinstance(content, list) else []
        if results:
            tur = e.get('toolUseResult')
            for p in results:
                body = result_text(p.get('content'))
                ev = dict(base, k='result', id=p.get('tool_use_id'), chars=len(body), head=body[:400], err=bool(p.get('is_error')))
                if isinstance(tur, dict):
                    f = tur.get('file')
                    if isinstance(f, dict):
                        ev['file'] = {'path': f.get('filePath'), 'num': f.get('numLines'), 'start': f.get('startLine'),
                                      'total': f.get('totalLines'), 'capped': bool(f.get('truncatedByTokenCap'))}
                    if tur.get('agentId'):
                        ev['agent'] = {'id': tur.get('agentId'), 'model': tur.get('resolvedModel'), 'status': tur.get('status')}
                    if tur.get('runId'):
                        ev['run'] = {'id': tur.get('runId'), 'name': tur.get('workflowName')}
                yield ev
            return
        text = text_of(content)
        origin = e.get('origin')
        kind = origin.get('kind') if isinstance(origin, dict) else None
        if kind == 'human':
            yield dict(base, k='his', text=text, queued=False)
        else:
            yield dict(base, k='prompt', origin=kind or ('meta' if e.get('isMeta') else 'none'), chars=len(text), head=' '.join(text.split())[:160])
    elif t == 'assistant':
        msg = e.get('message') or {}
        u = msg.get('usage') or {}
        ctx = (u.get('input_tokens') or 0) + (u.get('cache_creation_input_tokens') or 0) + (u.get('cache_read_input_tokens') or 0)
        tools, text = [], []
        for p in msg.get('content') or []:
            if not isinstance(p, dict):
                continue
            if p.get('type') == 'text':
                text.append(p.get('text') or '')
            elif p.get('type') == 'tool_use':
                tools.append({'id': p.get('id'), 'name': p.get('name'), 'inp': slim_input(p.get('name'), p.get('input'))})
        yield dict(base, k='reply', model=msg.get('model'), ctx=ctx, written=(u.get('input_tokens') or 0) + (u.get('cache_creation_input_tokens') or 0),
                   out=u.get('output_tokens') or 0, rid=e.get('requestId'), text='\n'.join(text)[:8000], tools=tools)
    elif t == 'attachment':
        a = e.get('attachment') or {}
        at = a.get('type')
        if at == 'queued_command':
            o = a.get('origin')
            if isinstance(o, dict) and o.get('kind') == 'human':
                yield dict(base, k='his', text=str(a.get('prompt') or ''), queued=True)
        elif at == 'file':
            f = ((a.get('content') or {}).get('file') or {}) if isinstance(a.get('content'), dict) else {}
            yield dict(base, k='att', atype='file', path=a.get('filename'), chars=len(f.get('content') or ''),
                       num=f.get('numLines'), total=f.get('totalLines'))
        elif at == 'compact_file_reference':
            yield dict(base, k='att', atype='file_reference', path=a.get('filename'))
        elif at == 'invoked_skills':
            yield dict(base, k='att', atype='skills', skills=[
                {'name': s.get('name'), 'chars': len(s.get('content') or ''), 'tail': (s.get('content') or '')[-200:]}
                for s in a.get('skills') or []])
        elif at == 'hook_additional_context':
            c = a.get('content')
            c = '\n'.join(c) if isinstance(c, list) else str(c or '')
            yield dict(base, k='att', atype='hook', hook=a.get('hookName'), event=a.get('hookEvent'), chars=len(c), text=c[:1500])
        elif at == 'edited_text_file':
            yield dict(base, k='att', atype='edited', path=a.get('filename'))
        elif at == 'credential_org':
            yield dict(base, k='att', atype='procstart')
        elif at == 'model':
            yield dict(base, k='att', atype='model', model=(a.get('identity') or {}).get('modelId'))

def main():
    os.makedirs(tlib.CACHE, exist_ok=True)
    seen = set()
    for seg, files in reversed(tlib.segments()):       # newest first: a later copy of a record wins
        out_path = os.path.join(tlib.CACHE, 'events-%s.jsonl' % seg)
        n_rec = n_dup = n_ev = 0
        line_base = 0
        with open(out_path, 'w') as out:
            fresh = set()
            for prefix, path in files:
                n = 0
                with open(path) as f:
                    for n, line in enumerate(f, 1):
                        try:
                            e = json.loads(line)
                        except ValueError:
                            continue
                        uuid = e.get('uuid')
                        if not uuid or not e.get('timestamp'):
                            continue
                        n_rec += 1
                        if uuid in seen:
                            n_dup += 1
                            continue
                        fresh.add(uuid)
                        ref = '%s:%d' % (prefix, n + (line_base if seg == 'C' else 0))
                        for ev in events_of(e, ref):
                            out.write(json.dumps(ev) + '\n')
                            n_ev += 1
                if seg == 'C':
                    line_base += n
            seen |= fresh
        print('segment %s: %d records with a uuid, %d already in a newer segment, %d events -> %s' % (seg, n_rec, n_dup, n_ev, out_path))

if __name__ == '__main__':
    main()
