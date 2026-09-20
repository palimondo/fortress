#!/usr/bin/env python3
"""Streaming indexer for one Claude Code session transcript (JSONL), over a time range.

Usage (the run that built the 2026-09-19 post-mortem indices):

    python3 parse.py \
        --transcript /root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl \
        --from 2026-09-19T06:38:20.976Z --to 2026-09-20T05:32:47.771Z \
        --subagents /root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents \
        --out /home/user/fortress/tmp/postmortem-2026-09-19

Any other range works the same way: --from / --to are ISO timestamps compared as strings
against each record's `timestamp`, inclusive at both ends. Records without a timestamp
(queue-operation, atis-latch, last-prompt, custom-title, mode, agent-name, cost-state)
are never indexed. The file is streamed once; nothing is printed except a short tally.

It writes, into --out:
  turns.tsv          one row per timestamped record in range, in file order
  user-messages.md   Pavol's typed messages verbatim; then every harness-generated input
  assistant-text.md  every assistant text block verbatim
  tool-calls.tsv     one row per tool_use, joined to its tool_result
  context.tsv        one row per API call (distinct assistant message id) with usage
  compactions.md     every compact_boundary in the whole file, flagged in/out of range
  agents.md          every Agent / Workflow launch in range, joined to its outcome
  boots.md           the first turn after each compaction in range, call by call

Record kinds (the `kind` column of turns.tsv) are decided by `classify_user` and friends
below; the README explains each.

Method notes that matter for reading the numbers:
  * a tool call's duration is result timestamp minus the timestamp of the assistant
    record carrying the tool_use (the convention of iteration-cost.md);
  * an API call's context size is input_tokens + cache_read_input_tokens +
    cache_creation_input_tokens of its usage block, which the harness repeats identically
    on every content block of the same message id, so it is taken once per id;
  * `chars` is the length of the text the record carries as stored; for a tool result that
    the harness persisted to a file, that is the short stub the model saw, and the
    persisted size is reported separately; for a result the harness cut in the middle
    ("[N characters truncated]") the cut size is reported separately.
"""
import argparse, csv, json, os, re, sys
from collections import Counter, OrderedDict
from datetime import datetime


def ts(s):
    return datetime.fromisoformat(s.replace('Z', '+00:00'))


def squash(s, n):
    return re.sub(r'\s+', ' ', s)[:n]


def text_of_content(c):
    """The text a user/assistant record carries, and a tag list of block types."""
    if isinstance(c, str):
        return c, ['str']
    parts, tags = [], []
    for b in c:
        t = b.get('type')
        tags.append(t)
        if t == 'text':
            parts.append(b.get('text', ''))
        elif t == 'tool_result':
            cc = b.get('content')
            if isinstance(cc, str):
                parts.append(cc)
            elif isinstance(cc, list):
                parts.append(''.join(x.get('text', '') for x in cc if isinstance(x, dict)))
        elif t == 'thinking':
            parts.append(b.get('thinking', ''))
        elif t == 'tool_use':
            parts.append(json.dumps(b.get('input')))
        elif t == 'image':
            parts.append('[image]')
    return '\n'.join(parts), tags


LISTING = re.compile(r'(^|[;&|(]\s*|&&\s*)(ls|find|tree)\b')
LS_ENTRY = re.compile(r'^[-dl][rwx-]{9}', re.M)
CUT = re.compile(r'\[(\d+) characters truncated\]')


def classify_user(r, text, tags):
    if r.get('isCompactSummary'):
        return 'compaction summary'
    if 'tool_result' in tags:
        return 'tool result'
    o = (r.get('origin') or {}).get('kind')
    if o == 'human':
        return 'Pavol typed'
    if o == 'task-notification':
        if '<task-type>queued-remote-notifications</task-type>' in text:
            return 'scheduled trigger'
        return 'task notification'
    if o == 'peer':
        return 'agent message'
    if text.startswith('[Request interrupted'):
        return 'interrupt'
    if text.startswith('<command-name>'):
        return 'slash command'
    if text.startswith('<local-command-stdout>'):
        return 'command output'
    if text.startswith('<local-command-caveat>'):
        return 'command caveat'
    if text.startswith('Stop hook feedback'):
        return 'stop hook'
    if text.startswith('<system-reminder>'):
        return 'system reminder'
    if text.startswith('[Image:') or 'image' in tags:
        return 'image'
    if text.startswith('<task-notification>'):
        return 'task notification'
    if r.get('isMeta'):
        return 'meta (other)'
    return 'user (other)'


def starts_turn(kind):
    return kind in ('Pavol typed', 'scheduled trigger', 'task notification', 'agent message',
                    'compaction summary', 'interrupt')


def tool_label(name, inp):
    if name == 'Bash':
        d = inp.get('description') or ''
        c = inp.get('command') or ''
        return (d + ' :: ' + c) if d else c
    if name in ('Agent', 'Task'):
        return inp.get('description') or inp.get('prompt', '')
    if name == 'Workflow':
        return inp.get('name') or inp.get('description') or ('%s args=%s' % (inp.get('scriptPath', ''), json.dumps(inp.get('args'))) if inp.get('scriptPath') else json.dumps(inp))
    for k in ('file_path', 'path', 'pattern', 'query', 'message', 'prompt', 'name'):
        if k in inp:
            return str(inp[k])
    return json.dumps(inp)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--transcript', required=True)
    ap.add_argument('--from', dest='t0', required=True)
    ap.add_argument('--to', dest='t1', required=True)
    ap.add_argument('--out', required=True)
    ap.add_argument('--subagents', default=None)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)

    turns_rows = []          # turns.tsv
    pavol, harness = [], []  # user-messages.md
    atext = []               # assistant-text.md
    calls = OrderedDict()    # tool_use id -> dict
    api = OrderedDict()      # message id -> usage row
    boundaries = []          # every compact_boundary in the file
    summaries = {}           # boundary ts -> summary chars
    launches = []
    task_notes = []          # (ts, text) task notifications, for agent outcomes
    peer_msgs = []           # (ts, from, text)
    humans = []              # (ts, text) in whole file, for compactions "first message after"
    all_calls_file = []      # (ts, name, label, result chars) for whole file, for compactions
    turn = 0
    api_no = 0
    last_ctx = None
    n_in = 0

    for line in open(a.transcript):
        r = json.loads(line)
        t = r.get('type')
        tstamp = r.get('timestamp')
        if not tstamp:
            continue
        inr = a.t0 <= tstamp <= a.t1

        if t == 'system' and r.get('subtype') == 'compact_boundary':
            cm = r.get('compactMetadata') or {}
            boundaries.append({'ts': tstamp, 'pre': cm.get('preTokens'), 'trigger': cm.get('trigger'),
                               'ms': cm.get('durationMs'), 'in_range': inr, 'uuid': r.get('uuid')})

        if t == 'user':
            text, tags = text_of_content(r['message']['content'])
            kind = classify_user(r, text, tags)
            if kind == 'compaction summary':
                summaries[tstamp] = len(text)
            if kind == 'Pavol typed':
                humans.append((tstamp, text))
            if kind == 'task notification' or kind == 'scheduled trigger':
                task_notes.append((tstamp, text))
            if kind == 'agent message':
                m = re.search(r'from="([0-9a-f]+)"', text)
                peer_msgs.append((tstamp, m.group(1) if m else '', text))
            if kind == 'tool result':
                for b in r['message']['content']:
                    if b.get('type') == 'tool_result':
                        cc = b.get('content')
                        s = cc if isinstance(cc, str) else ''.join(x.get('text', '') for x in (cc or []) if isinstance(x, dict))
                        tu = r.get('toolUseResult')
                        info = {'result_ts': tstamp, 'result_chars': len(s), 'result_head': squash(s, 160),
                                'persisted': '', 'cut': '', 'ls_entries': len(LS_ENTRY.findall(s)),
                                'agent_id': '', 'run_id': '', 'status': '', 'model': '', 'output_file': ''}
                        if isinstance(tu, dict):
                            if tu.get('persistedOutputPath'):
                                info['persisted'] = '%s (%s bytes)' % (os.path.basename(tu['persistedOutputPath']), tu.get('persistedOutputSize'))
                            info['agent_id'] = tu.get('agentId', '') or tu.get('resumedAgentId', '')
                            info['run_id'] = tu.get('runId', '')
                            info['status'] = str(tu.get('status', ''))
                            info['model'] = tu.get('resolvedModel', '')
                            info['output_file'] = tu.get('outputFile', '') or tu.get('transcriptDir', '')
                        if '<persisted-output>' in s and not info['persisted']:
                            m = re.search(r'Output too large \(([^)]+)\)', s)
                            info['persisted'] = 'stub; full ' + (m.group(1) if m else '?')
                        m = CUT.search(s)
                        if m:
                            info['cut'] = m.group(1)
                        if b.get('is_error'):
                            info['status'] = (info['status'] + ' error').strip()
                        cid = b.get('tool_use_id')
                        if cid in calls:
                            calls[cid].update(info)
                            all_calls_file.append((calls[cid]['ts'], calls[cid]['name'], calls[cid]['label'], len(s)))
            if inr:
                if starts_turn(kind):
                    turn += 1
                turns_rows.append([tstamp, 'user', kind, turn, api_no, len(text), '', squash(text, 100)])
                if kind == 'Pavol typed':
                    pavol.append((tstamp, turn, text, tags))
                elif kind != 'tool result':
                    harness.append((tstamp, turn, kind, text))

        elif t == 'assistant':
            m = r['message']
            mid = m.get('id')
            u = m.get('usage') or {}
            first_block = mid not in api
            if first_block:
                ctx = (u.get('input_tokens', 0) or 0) + (u.get('cache_read_input_tokens', 0) or 0) + (u.get('cache_creation_input_tokens', 0) or 0)
                api[mid] = {'ts': tstamp, 'in_range': inr, 'turn': turn, 'input': u.get('input_tokens'),
                            'cache_read': u.get('cache_read_input_tokens'), 'cache_creation': u.get('cache_creation_input_tokens'),
                            'output': u.get('output_tokens'), 'context_in': ctx, 'model': m.get('model'),
                            'stop': m.get('stop_reason')}
                if inr:
                    api_no += 1
                    api[mid]['no'] = api_no
            for b in m.get('content', []):
                bt = b.get('type')
                if bt == 'text':
                    s = b.get('text', '')
                    if inr:
                        turns_rows.append([tstamp, 'assistant', 'assistant text', turn, api_no, len(s), u.get('output_tokens') if first_block else '', squash(s, 100)])
                        atext.append((tstamp, turn, api_no, s))
                elif bt == 'thinking':
                    s = b.get('thinking', '')
                    if inr:
                        turns_rows.append([tstamp, 'assistant', 'assistant thinking', turn, api_no, len(s), u.get('output_tokens') if first_block else '', squash(s, 100)])
                elif bt == 'tool_use':
                    inp = b.get('input') or {}
                    lab = tool_label(b['name'], inp)
                    calls[b['id']] = {'id': b['id'], 'ts': tstamp, 'turn': turn, 'api_no': api_no, 'name': b['name'],
                                      'label': lab, 'input_chars': len(json.dumps(inp)), 'in_range': inr,
                                      'lists_dir': bool(LISTING.search(inp.get('command', '') if b['name'] == 'Bash' else '')),
                                      'result_ts': '', 'result_chars': '', 'result_head': '', 'persisted': '', 'cut': '',
                                      'ls_entries': '', 'agent_id': '', 'run_id': '', 'status': '', 'model': '', 'output_file': '',
                                      'input': inp}
                    if inr:
                        turns_rows.append([tstamp, 'assistant', 'assistant tool call', turn, api_no, len(json.dumps(inp)), u.get('output_tokens') if first_block else '', b['name'] + ': ' + squash(lab, 90)])
                        if b['name'] in ('Agent', 'Task', 'Workflow'):
                            launches.append(calls[b['id']])
                first_block = False

        elif t == 'system':
            if inr:
                c = r.get('content') or ''
                sub = r.get('subtype')
                kind = {'compact_boundary': 'compaction boundary', 'stop_hook_summary': 'hook summary (UI record)',
                        'local_command': 'local command (UI record)'}.get(sub, 'system:' + str(sub))
                extra = ''
                if sub == 'compact_boundary':
                    extra = 'preTokens=%s' % (r.get('compactMetadata') or {}).get('preTokens')
                turns_rows.append([tstamp, 'system', kind, turn, api_no, len(str(c)), '', squash(extra or str(c), 100)])

        elif t == 'attachment':
            if inr:
                at = (r.get('attachment') or {}).get('type')
                rendered = r.get('rendered')
                s = json.dumps(rendered) if rendered is not None else json.dumps(r.get('attachment'))
                head = ''
                if isinstance(rendered, list) and rendered and isinstance(rendered[0], dict):
                    head = rendered[0].get('content', '')
                turns_rows.append([tstamp, 'attachment', 'attachment:' + str(at), turn, api_no, len(s), '', squash(head or s, 100)])
        if inr:
            n_in += 1

    # ---------------- turns.tsv
    with open(os.path.join(a.out, 'turns.tsv'), 'w', newline='') as fh:
        w = csv.writer(fh, delimiter='\t', lineterminator='\n')
        w.writerow(['timestamp', 'type', 'kind', 'turn', 'api_call', 'chars', 'output_tokens', 'head'])
        for row in turns_rows:
            w.writerow(row)

    # ---------------- user-messages.md
    with open(os.path.join(a.out, 'user-messages.md'), 'w') as fh:
        fh.write('# Messages into the coordinator, %s .. %s\n\n' % (a.t0, a.t1))
        fh.write('## A. Messages Pavol typed (verbatim, %d)\n\n' % len(pavol))
        for i, (t_, tn, s, tags) in enumerate(pavol, 1):
            img = ' [with image]' if 'image' in tags else ''
            fh.write('### %d. %s  (turn %d, %d chars)%s\n\n%s\n\n' % (i, t_, tn, len(s), img, s.strip()))
        fh.write('\n## B. Harness-generated inputs (verbatim, %d)\n\n' % len(harness))
        fh.write('Kinds: scheduled trigger (a send_later check-in delivered as a queued-remote-notifications task notification), task notification, agent message (a worker\'s SendMessage/report), stop hook, compaction summary, slash command, command output, command caveat, system reminder, image, interrupt.\n\n')
        for i, (t_, tn, kind, s) in enumerate(harness, 1):
            fh.write('### B%d. %s  %s  (turn %d, %d chars)\n\n%s\n\n' % (i, t_, kind, tn, len(s), s.strip()))

    # ---------------- assistant-text.md
    with open(os.path.join(a.out, 'assistant-text.md'), 'w') as fh:
        fh.write('# Assistant text blocks, %s .. %s (%d blocks)\n\n' % (a.t0, a.t1, len(atext)))
        for i, (t_, tn, an, s) in enumerate(atext, 1):
            fh.write('### %d. %s  (turn %d, api call %d, %d chars)\n\n%s\n\n' % (i, t_, tn, an, len(s), s.strip()))

    # ---------------- tool-calls.tsv
    with open(os.path.join(a.out, 'tool-calls.tsv'), 'w', newline='') as fh:
        w = csv.writer(fh, delimiter='\t', lineterminator='\n')
        w.writerow(['timestamp', 'turn', 'api_call', 'tool', 'label_200', 'input_chars', 'duration_s', 'result_chars',
                    'persisted', 'harness_cut_chars', 'lists_dir', 'ls_entries_in_result', 'agent_or_run_id', 'status', 'result_head'])
        for c in calls.values():
            if not c['in_range']:
                continue
            dur = ''
            if c['result_ts']:
                dur = '%.1f' % (ts(c['result_ts']) - ts(c['ts'])).total_seconds()
            w.writerow([c['ts'], c['turn'], c['api_no'], c['name'], squash(c['label'], 200), c['input_chars'], dur,
                        c['result_chars'], c['persisted'], c['cut'], 'yes' if c['lists_dir'] else '', c['ls_entries'],
                        c['agent_id'] or c['run_id'], c['status'], c['result_head']])

    # ---------------- context.tsv
    with open(os.path.join(a.out, 'context.tsv'), 'w', newline='') as fh:
        w = csv.writer(fh, delimiter='\t', lineterminator='\n')
        w.writerow(['api_call', 'timestamp', 'turn', 'input', 'cache_read', 'cache_creation', 'output', 'context_in', 'delta_vs_prev', 'note'])
        bidx = 0
        blist = [b for b in boundaries if b['in_range']]
        prev = None
        for mid, u in api.items():
            if not u['in_range']:
                continue
            while bidx < len(blist) and blist[bidx]['ts'] <= u['ts']:
                b = blist[bidx]
                w.writerow(['', b['ts'], '', '', '', '', '', b['pre'], '', 'COMPACTION BOUNDARY: context before = %s tokens, summary that followed = %s chars' % (b['pre'], summaries.get(_nearest(summaries, b['ts']), '?'))])
                prev = None
                bidx += 1
            d = '' if prev is None else u['context_in'] - prev
            w.writerow([u['no'], u['ts'], u['turn'], u['input'], u['cache_read'], u['cache_creation'], u['output'], u['context_in'], d, u['stop'] or ''])
            prev = u['context_in']
        while bidx < len(blist):
            b = blist[bidx]
            w.writerow(['', b['ts'], '', '', '', '', '', b['pre'], '', 'COMPACTION BOUNDARY: context before = %s tokens, summary that followed = %s chars' % (b['pre'], summaries.get(_nearest(summaries, b['ts']), '?'))])
            bidx += 1

    # ---------------- compactions.md
    api_list = list(api.values())
    with open(os.path.join(a.out, 'compactions.md'), 'w') as fh:
        fh.write('# Compaction boundaries in the whole transcript (%d), with those in range marked\n\n' % len(boundaries))
        fh.write('Context before = `compactMetadata.preTokens`. Context after = the first API call after the boundary (input + cache read + cache creation). Summary size = characters of the `isCompactSummary` user record the harness inserted.\n\n')
        for b in boundaries:
            sk = _nearest(summaries, b['ts'])
            after = [u for u in api_list if u['ts'] > b['ts']]
            nxt = after[0] if after else None
            fh.write('## %s  %s\n\n' % (b['ts'], 'IN RANGE' if b['in_range'] else 'outside range'))
            fh.write('- trigger: %s; compaction took %s ms\n- context before: **%s tokens**\n- summary that followed: %s chars (record at %s)\n' % (b['trigger'], b['ms'], b['pre'], summaries.get(sk, '?'), sk))
            if nxt:
                fh.write('- context at the first API call after (%s): **%s tokens** (input %s, cache read %s, cache creation %s)\n' % (nxt['ts'], nxt['context_in'], nxt['input'], nxt['cache_read'], nxt['cache_creation']))
            hs = [h for h in humans if h[0] > b['ts']]
            if hs:
                fh.write('- first message Pavol typed after: %s — %s\n' % (hs[0][0], squash(hs[0][1], 160)))
            cs = [c for c in all_calls_file if c[0] > b['ts']][:10]
            fh.write('- first tool calls after:\n')
            for c in cs:
                fh.write('    - %s %s: %s  (result %d chars)\n' % (c[0], c[1], squash(c[2], 130), c[3]))
            fh.write('\n')

    # ---------------- agents.md
    with open(os.path.join(a.out, 'agents.md'), 'w') as fh:
        fh.write('# Agent and Workflow launches in range (%d)\n\n' % len(launches))
        fh.write('Outcome = the harness task notification naming the agent id and/or the agent\'s own message back (`agent message` kind). Transcript = the agent\'s JSONL under --subagents, by id.\n\n')
        for i, c in enumerate(launches, 1):
            inp = c['input']
            brief = inp.get('prompt') or inp.get('script') or ''
            first = next((l for l in brief.splitlines() if l.strip()), '')
            ident = c['agent_id'] or c['run_id']
            fh.write('## %d. %s  %s — %s\n\n' % (i, c['ts'], c['name'], squash(c['label'], 100)))
            fh.write('- id: `%s`; model: %s; status at launch: %s; output: %s\n' % (ident, c['model'] or '(session)', c['status'], c['output_file']))
            fh.write('- brief: %d chars; first line: %s\n' % (len(brief), squash(first, 220)))
            if c['name'] == 'Workflow':
                fh.write('- script: %d chars; result head: %s\n' % (len(inp.get('script', '')), c['result_head']))
            # outcome
            if ident:
                tn = [(t_, s) for t_, s in task_notes if ident in s]
                for t_, s in tn[:3]:
                    st = re.search(r'<status>([^<]*)</status>', s)
                    sm = re.search(r'<summary>(.*?)</summary>', s, re.S)
                    fh.write('- task notification %s: status=%s; %s\n' % (t_, st.group(1) if st else '?', squash(sm.group(1) if sm else s, 240)))
                if len(tn) > 3:
                    fh.write('- (%d more task notifications for this id)\n' % (len(tn) - 3))
                pm = [(t_, s) for t_, f, s in peer_msgs if f == ident]
                for t_, s in pm:
                    body = re.sub(r'^Another Claude session sent a message:\s*<agent-message[^>]*>', '', s).strip()
                    fh.write('- agent message %s (%d chars): %s\n' % (t_, len(s), squash(body, 300)))
                # transcript
                if a.subagents:
                    cand = [os.path.join(a.subagents, 'agent-%s.jsonl' % ident)]
                    wf = os.path.join(a.subagents, 'workflows', ident)
                    if os.path.isdir(wf):
                        files = sorted(os.listdir(wf))
                        tot = sum(os.path.getsize(os.path.join(wf, f)) for f in files)
                        fh.write('- workflow run dir: %d files, %d bytes: %s\n' % (len(files), tot, ', '.join('%s (%d)' % (f, os.path.getsize(os.path.join(wf, f))) for f in files if f.endswith('.jsonl'))))
                    for p in cand:
                        if os.path.exists(p):
                            n, t0, t1, toks = _agent_stats(p)
                            fh.write('- transcript: %s, %d bytes, %d records, %s .. %s, output tokens %d\n' % (os.path.basename(p), os.path.getsize(p), n, t0, t1, toks))
            fh.write('\n')

    # ---------------- boots.md
    with open(os.path.join(a.out, 'boots.md'), 'w') as fh:
        fh.write('# The first turn after each compaction in range, call by call\n\n')
        fh.write('A boot turn runs from the first message Pavol typed after the boundary to the next message he typed. Each row: time, tool, what it did, the result size the model saw, and flags (LISTS = the command lists a directory; N entries = `ls -l` lines in the result; cut = characters the harness removed from the middle; persisted = the harness replaced the result by a stub). USAGE rows are the API calls, with the context size at each.\n\n')
        bl = [b for b in boundaries if b['in_range']]
        for b in bl:
            hs = [h for h in humans if h[0] > b['ts']]
            if not hs:
                continue
            start = hs[0][0]
            end = hs[1][0] if len(hs) > 1 else a.t1
            fh.write('## Boundary %s (context before %s tokens); boot turn %s .. %s\n\n' % (b['ts'], b['pre'], start, end))
            fh.write('Pavol: %s\n\n' % squash(hs[0][1], 400))
            if len(hs) > 1:
                fh.write('Next message from Pavol: %s\n\n' % squash(hs[1][1], 400))
            rows = []
            for u in api_list:
                if start <= u['ts'] < end:
                    rows.append((u['ts'], 'USAGE', 'context_in=%d (input %s, cache_read %s, cache_creation %s), output %s' % (u['context_in'], u['input'], u['cache_read'], u['cache_creation'], u['output'])))
            tot_chars = 0
            listing_chars = 0
            for c in calls.values():
                if start <= c['ts'] < end and c['result_ts']:
                    flags = []
                    if c['lists_dir']:
                        flags.append('LISTS')
                    if c['ls_entries']:
                        flags.append('%s entries' % c['ls_entries'])
                    if c['cut']:
                        flags.append('cut %s chars' % c['cut'])
                    if c['persisted']:
                        flags.append('persisted: ' + c['persisted'])
                    tot_chars += c['result_chars'] or 0
                    if c['lists_dir']:
                        listing_chars += c['result_chars'] or 0
                    rows.append((c['ts'], c['name'], '%s  -> result %s chars %s' % (squash(c['label'], 150), c['result_chars'], ' '.join(flags))))
                    if c['lists_dir'] or (c['ls_entries'] or 0) > 5:
                        rows.append((c['ts'], '  full command', c['label'].replace('\n', ' ⏎ ')))
            for t_, k, s in sorted(rows):
                fh.write('- %s %s: %s\n' % (t_, k, s))
            us = [u for u in api_list if start <= u['ts'] < end]
            if us:
                fh.write('\nTotals: tool results %d chars, of which directory-listing commands %d chars; context %d tokens at the turn\'s first API call, %d at its last.\n\n' % (tot_chars, listing_chars, us[0]['context_in'], us[-1]['context_in']))

    print('records in range: %d; turns: %d; api calls: %d; tool calls: %d; Pavol messages: %d; harness inputs: %d; assistant text blocks: %d; launches: %d; boundaries in range: %d'
          % (n_in, turn, api_no, sum(1 for c in calls.values() if c['in_range']), len(pavol), len(harness), len(atext), len(launches), sum(1 for b in boundaries if b['in_range'])))


def _nearest(summaries, t):
    """The compaction summary record is written a few ms before its boundary."""
    best = None
    for k in summaries:
        if abs((ts(k) - ts(t)).total_seconds()) < 5 and (best is None or abs((ts(k) - ts(t)).total_seconds()) < abs((ts(best) - ts(t)).total_seconds())):
            best = k
    return best


def _agent_stats(p):
    n = 0; t0 = None; t1 = None; seen = {}
    for line in open(p):
        try:
            r = json.loads(line)
        except Exception:
            continue
        n += 1
        if r.get('timestamp'):
            t0 = t0 or r['timestamp']; t1 = r['timestamp']
        if r.get('type') == 'assistant':
            # a subagent transcript carries a running output count on each block of one
            # message id, so the message's total is the max, not the first
            m = r.get('message', {})
            o = (m.get('usage') or {}).get('output_tokens', 0) or 0
            seen[m.get('id')] = max(seen.get(m.get('id'), 0), o)
    return n, t0, t1, sum(seen.values())


if __name__ == '__main__':
    main()
