"""tlib: the curator's messages, and the coordinating session's message that each one answered,
read along the transcript's reply chain (standard library).

His messages are exactly what explorations/coordinator/curator-profile/show.py's load() gives: the
live transcripts, the backup copies in /home/user/fortress-transcripts-blinded (the .parts folders
and the copy until 2026-10-08T15-41 included) and the first session on the `transcripts` branch;
deduplicated by uuid; queued messages with the time he sent them. load_msgs() rebuilds that list
from a per-file index (cache below) with show.py's own functions, in show.py's file order, so the
list is the same; tests.py checks it against show.load().

The message he answered (Talk.answered) follows the chain of the transcript itself: each line's
parentUuid (a compaction's logicalParentUuid), back from his message. Every line on the chain is
one of:
  his     a message of his (show.py's test), or his message queued while a turn ran, delivered
          into that turn (a queued_command attachment that is not a notification)
  text    an assistant line of the session (not a sidechain) holding text
  note    a prompt that is not his: Stop-hook feedback, an agent's message or hand-back, a task
          notification (also a scheduled check-in), a system reminder, a prompt starting '<'
  pass    everything else, passed through: tool calls and results, attachments, hook summaries,
          and the prompts that only continue a turn (a compaction summary, "Continue from where
          you left off", a worker restart notice, a skill's text, an image, a local command)
Going back from his message, the texts met are collected; reaching a note drops them as a turn
not to him (they are listed as skipped), and reaching a prompt of his makes them the answer: the
coordinator's whole turn after that prompt, every text of it, oldest first. A text written after
he sent his message (a queued message is delivered late) is listed apart, not taken. The turns to
him further back on the chain are kept too (Talk.answered(..., earlier=3)), for a reply to an
older question. Two checks on the rule: a skipped turn that answers a notification and ends with
an ask to him (ASK: a question mark, "The ask", "I recommend", "your yes", ...) is marked 'asks',
since the coordinator often relays an agent's result with a question; and when his message
quotes lines ("> ..."), the newest text on the chain that holds them is found ('quoted').
Talk.reply(m) gives the coordinator's turn after his message m.

Cache: ./cache/tx3-<path hash>.pickle, one per transcript file, holding the file's index and its
key (path, size and mtime; the blob id for the `transcripts` branch). A file whose key changed is
indexed again and its entry replaced. INDEX_VERSION is part of the key.
"""
import bisect
import glob
import hashlib
import json
import os
import pickle
import re
import subprocess
import sys

REPO = '/home/user/fortress'
SHOW_DIR = REPO + '/explorations/coordinator/curator-profile'
HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, 'cache')
INDEX_VERSION = 1

sys.dont_write_bytecode = True          # import show.py without writing into the repository
sys.path.insert(0, SHOW_DIR)
import show  # noqa: E402
sys.path.pop(0)

COORDINATING = ('fe616d40', 'bdff267d')  # the coordinating sessions: the live one and the first

# prompts that only continue the turn they interrupt (kind 'pass')
_CONTINUE = ('This session is being continued', 'Continue from where you left off',
             "This session's worker process was restarted", '[Your previous response had no visible output',
             'Base directory for this skill', '[Image', '<command-', '<local-command', 'Already available in this co')


SHORT = (('/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/', 'backup/'),
         ('/root/.claude/projects/-home-user-fortress/', 'live/'))
LEGEND = ('(paths: backup/ is %s, live/ is %s, origin/transcripts:... is a file of that branch)'
          % (SHORT[0][0], SHORT[1][0]))


def short_path(p):
    for a, b in SHORT:
        if p.startswith(a):
            return b + p[len(a):]
    return p


def _qhash(q):
    return hashlib.sha1(show._norm(q).encode('utf-8', 'replace')).hexdigest()[:16]


def _note_label(s, d):
    if s.startswith('Stop hook feedback'):
        return 'Stop-hook feedback'
    if (d.get('origin') or {}).get('kind') == 'peer' or s.startswith('Another Claude session sent a message') \
            or s.startswith('<agent-message'):
        return 'an agent\'s message'
    if s.startswith('<task-notification'):
        return 'a check-in' if 'queued-remote-notifications' in s[:200] else 'a task notification'
    if s.startswith('<system-reminder>'):
        return 'a system reminder'
    return 'a prompt not his'


def _classify(d, his_text):
    """(kind, label) of a parsed line on the main chain."""
    t = d.get('type')
    if t == 'assistant':
        return 'text', None
    if t == 'user':
        c = d.get('message', {}).get('content') if isinstance(d.get('message'), dict) else None
        if isinstance(c, list) and any(isinstance(x, dict) and x.get('type') == 'tool_result' for x in c):
            return 'pass', None
        if his_text is not None:
            return 'his', None
        s = (show._text(c) or '').lstrip()
        if s.startswith(_CONTINUE) or (d.get('isMeta') and s.startswith('#')):
            return 'pass', None
        return 'note', _note_label(s, d)
    if t == 'attachment':
        a = d.get('attachment') or {}
        if a.get('type') == 'queued_command':
            q = show._text(a.get('prompt')) or ''
            if a.get('commandMode') == 'task-notification' or q.lstrip().startswith('<'):
                return 'note', _note_label(q.lstrip(), d)
            if q.strip():
                return 'hisq', _qhash(q)
    return 'pass', None


def _index(lines, src, where):
    """One transcript's index: show.py's message records in order, and its main-chain lines.
    msgs: ('h', key, rec) for show's messages, ('q', norm, rec) for queued candidates
    nodes: (uuid, parent, kind, label, ts, sid, line, text) for lines that are not 'pass'
    alias: {uuid: parent} for 'pass' lines; enq: (sid, ts, qhash) for each enqueue line."""
    msgs, raw, enq = [], [], []
    for n, line in enumerate(lines, 1):
        try:
            d = json.loads(line)
        except ValueError:
            continue
        if not isinstance(d, dict):
            continue
        his = None
        if not show._skip(line):            # show.py's own reading, in its order
            c = show._human(d)
            if c is not None:
                key = d.get('uuid') or (d.get('timestamp'), c[:50])
                msgs.append(('h', key, {'ts': d.get('timestamp') or '', 'source': src, 'sid': d.get('sessionId') or '',
                                        'text': c, 'uuid': d.get('uuid')}))
                his = c
            else:
                q = None
                if d.get('type') == 'attachment' and d.get('attachment', {}).get('type') == 'queued_command':
                    q = show._text(d['attachment'].get('prompt'))
                elif d.get('type') == 'queue-operation' and d.get('operation') == 'enqueue':
                    q = show._text(d.get('content'))
                if q and q.strip() and not q.lstrip().startswith('<'):
                    msgs.append(('q', show._norm(q), {'ts': d.get('timestamp') or '', 'source': 'queued',
                                                      'sid': d.get('sessionId') or '', 'text': q, 'qh': _qhash(q)}))
        if d.get('type') == 'queue-operation' and d.get('operation') == 'enqueue':
            q = show._text(d.get('content'))
            if q:
                enq.append((d.get('sessionId') or '', d.get('timestamp') or '', _qhash(q)))
        u = d.get('uuid')
        if not u or d.get('isSidechain'):
            continue
        kind, label = _classify(d, his)
        text = None
        if kind == 'text':
            c = d.get('message', {}).get('content')
            if isinstance(c, list):
                text = '\n'.join(x.get('text', '') for x in c if isinstance(x, dict) and x.get('type') == 'text')
            if not text or not text.strip():
                kind, text = 'pass', None
        raw.append((u, d.get('parentUuid') or d.get('logicalParentUuid'), kind, label, d.get('timestamp') or '',
                    d.get('sessionId') or '', n, text))
    # each line's parent resolved past the 'pass' lines of this file
    alias = {r[0]: r[1] for r in raw if r[2] == 'pass'}

    def res(p):
        seen = []
        while p in alias and len(seen) < 100000:
            seen.append(p)
            p = alias[p]
        for s in seen:
            alias[s] = p
        return p
    nodes = []
    for r in raw:
        if r[2] != 'pass':
            nodes.append((r[0], res(r[1]) if r[1] else None) + r[2:])
    for u in list(alias):
        if alias[u]:
            res(u)
    return {'msgs': msgs, 'nodes': nodes, 'alias': alias, 'enq': enq, 'where': where}


def _files():
    """(src, name, key, reader) in show.py's order: the main files sorted, then the first session."""
    paths = glob.glob(show.ROOTS[0] + '/*.jsonl') + glob.glob(show.ROOTS[1] + '/**/*.jsonl', recursive=True)
    out = []
    for p in sorted(paths):
        if '/subagents/' in p:
            continue
        try:
            st = os.stat(p)
        except OSError:
            continue

        def read(p=p):
            with open(p, errors='replace') as f:
                return _index(f, 'main', p)
        out.append(('main', p, '%s|%d|%d' % (p, st.st_size, st.st_mtime_ns), read))
    for part in show.S1_PARTS:
        spec = show.S1_BRANCH + ':' + part
        r = subprocess.run(['git', '-C', REPO, 'rev-parse', spec], capture_output=True, text=True)
        if r.returncode != 0:
            sys.stderr.write('note: %s not readable; the first session is skipped\n' % spec)
            break

        def read(spec=spec):
            b = subprocess.run(['git', '-C', REPO, 'show', spec], capture_output=True).stdout
            return _index(b.decode('utf-8', 'replace').splitlines(), 's1', spec)
        out.append(('s1', spec, 'blob|' + r.stdout.strip(), read))
    return out


def _cached(name, key, fn):
    os.makedirs(CACHE, exist_ok=True)
    p = os.path.join(CACHE, 'tx3-' + hashlib.sha1(name.encode()).hexdigest()[:16] + '.pickle')
    key = 'v%d|%s' % (INDEX_VERSION, key)
    try:
        with open(p, 'rb') as f:
            v = pickle.load(f)
        if v.get('key') == key:
            return v['idx']
    except (OSError, EOFError, pickle.UnpicklingError, AttributeError, ValueError, TypeError):
        pass
    idx = fn()
    tmp = '%s.%d.tmp' % (p, os.getpid())
    with open(tmp, 'wb') as f:
        pickle.dump({'key': key, 'idx': idx}, f, protocol=pickle.HIGHEST_PROTOCOL)
    os.replace(tmp, p)
    return idx


_INDEX = None


def indexes():
    global _INDEX
    if _INDEX is None:
        _INDEX = [_cached(name, key, fn) for src, name, key, fn in _files()]
    return _INDEX


def load_msgs():
    """show.load()'s list, from the cached indexes: dicts with ts, source, sid, text (and uuid, or
    qh for a queued message)."""
    seen, queued = {}, {}
    for idx in indexes():
        for k, key, rec in idx['msgs']:
            if k == 'h':
                seen.setdefault(key, rec)
            else:
                queued.setdefault(key, rec)
    msgs = list(seen.values())
    blob = ' '.join(show._norm(m['text']) for m in msgs)
    for n, m in queued.items():
        if n not in blob:
            msgs.append(m)
    msgs.sort(key=lambda m: (m['ts'], m['source']))
    return msgs


class Node:
    __slots__ = ('uuid', 'parent', 'kind', 'label', 'ts', 'sid', 'where', 'text')

    def __init__(self, t, where):
        self.uuid, self.parent, self.kind, self.label, self.ts, self.sid, line, self.text = t
        self.where = '%s:%d' % (short_path(where), line)


class Talk:
    def __init__(self):
        self.msgs = load_msgs()
        self.nodes, self.alias, self.hisq, self.enq = {}, {}, {}, {}
        for idx in indexes():
            w = idx['where']
            for t in idx['nodes']:
                if t[0] not in self.nodes:
                    nd = Node(t, w)
                    self.nodes[t[0]] = nd
                    if nd.kind == 'hisq':
                        self.hisq.setdefault((nd.sid, nd.label), nd)
            for u, p in idx['alias'].items():
                self.alias.setdefault(u, p)
            for sid, ts, h in idx['enq']:
                self.enq.setdefault((sid, h), []).append(ts)
        self.by_sid = {}
        for nd in self.nodes.values():
            if nd.kind == 'text':
                self.by_sid.setdefault(nd.sid, []).append(nd)
        for v in self.by_sid.values():
            v.sort(key=lambda x: x.ts)
        self.keys = {s: [x.ts for x in v] for s, v in self.by_sid.items()}

    def reply(self, m):
        """The coordinator's texts of the turn after his message m on the chain, oldest first."""
        if getattr(self, '_turn_of', None) is None:
            self._turn_of = {}
            for nd in self.nodes.values():
                if nd.kind != 'text':
                    continue
                p = self.node(nd.parent)
                while p is not None and p.kind == 'text':
                    p = self.node(p.parent)
                if p is not None and p.kind in ('his', 'hisq'):
                    self._turn_of.setdefault(p.uuid, []).append(nd)
            for v in self._turn_of.values():
                v.sort(key=lambda x: x.ts)
        st, _ = self.start(m)
        return self._turn_of.get(st.uuid, []) if st is not None else []

    def his(self, start, end):
        """His messages with start <= ts <= end (ISO strings compared as text, all UTC)."""
        return [m for m in self.msgs if m['ts'] >= start and m['ts'][:19] <= end[:19]]

    def node(self, u):
        while u is not None and u not in self.nodes:
            if u not in self.alias:
                return None
            u = self.alias[u]
        return self.nodes.get(u) if u else None

    def start(self, m):
        """The chain line of his message m, and the time he sent it."""
        if m.get('uuid') and m['uuid'] in self.nodes:
            nd = self.nodes[m['uuid']]
            # typed while a turn ran and delivered after it: the latest enqueue of the same text in
            # the hour before the line is when he sent it
            ts = m['ts']
            t0 = _minus(ts, 3600)
            c = [t for t in self.enq.get((m['sid'], _qhash(m['text'])), []) if t0 <= t < ts]
            return nd, max(c) if c else ts
        if m.get('qh'):
            nd = self.hisq.get((m['sid'], m['qh']))
            if nd is not None:
                return nd, m['ts']
        return None, m['ts']

    def answered(self, m, earlier=3):
        """The coordinator's turn that his message m answered, by the reply chain:
        {'how': 'chain' or 'none', 'start': his line, 'sent': time he sent it,
         'turn': {'prompt': Node, 'texts': [Node]} or None, 'skipped': [{'prompt', 'texts'}],
         'later': [Node] (texts written after he sent it), 'earlier': [turns further back],
         'unanswered': [his earlier messages on the chain that no text followed],
         'quoted': the text on the chain that holds the lines he quoted, or None}
        Each skipped turn has 'asks': it answers a notification and its last text ends with an
        ask to him (a question mark, "The ask", "I recommend", "your yes", ...)."""
        st, sent = self.start(m)
        out = {'how': 'none', 'start': st, 'sent': sent, 'turn': None, 'skipped': [], 'later': [],
               'earlier': [], 'unanswered': [], 'end': None, 'quoted': None}
        if st is None:
            return out
        out['how'] = 'chain'
        pending = []
        nd = self.node(st.parent)
        while nd is not None:
            if nd.kind == 'text':
                if nd.ts > sent:
                    if out['turn'] is None:
                        out['later'].append(nd)
                else:
                    pending.append(nd)
            elif nd.kind in ('his', 'hisq'):
                if pending:
                    t = {'prompt': nd, 'texts': pending[::-1]}
                    if out['turn'] is None:
                        out['turn'] = t
                    else:
                        out['earlier'].append(t)
                        if len(out['earlier']) >= earlier:
                            break
                    pending = []
                elif out['turn'] is None:
                    out['unanswered'].append(nd)
            elif nd.kind == 'note':
                if pending and out['turn'] is None:
                    out['skipped'].append({'prompt': nd, 'texts': pending[::-1]})
                pending = []
            nd = self.node(nd.parent)
        if nd is None and out['turn'] is None:
            out['end'] = 'the chain ends before any turn to him'
        out['later'].reverse()
        for sk in out['skipped']:
            sk['asks'] = sk['prompt'].label != 'Stop-hook feedback' and bool(ASK.search(sk['texts'][-1].text[-400:]))
        out['quoted'] = self.quoted(m, st, sent)
        return out

    def quoted(self, m, st, sent, limit=400):
        """The newest text on the chain before his message that holds what he quoted (his lines
        starting with '>', the first run of them), compared without markup, case or spacing."""
        run = []
        for l in m['text'].split('\n'):
            if l.lstrip().startswith('>'):
                run.append(l.lstrip()[1:])
            elif run:
                break
        q = _plain(' '.join(run))
        if len(q) < 12:
            return None
        q = q[:200]
        nd, k = self.node(st.parent), 0
        while nd is not None and k < limit:
            if nd.kind == 'text':
                k += 1
                if nd.ts <= sent and q in _plain(nd.text):
                    return nd
            nd = self.node(nd.parent)
        return None

    def before(self, sid, ts):
        """By time, as near.py did before the chain: the coordinator's last text in session sid
        before ts, skipping its replies to Stop-hook feedback. Returns (text, skipped)."""
        v = self.by_sid.get(sid)
        if not v:
            return None, []
        i = bisect.bisect_left(self.keys[sid], ts)
        skipped = []
        while i > 0:
            x = v[i - 1]
            p = self.node(x.parent)
            while p is not None and p.kind == 'text':
                p = self.node(p.parent)
            if p is not None and p.kind == 'note' and p.label == 'Stop-hook feedback':
                skipped.append(x)
                i -= 1
                continue
            return x, skipped
        return None, skipped


ASK = re.compile(r'\?|\bThe ask\b|\bthe question\b|\bI recommend\b|\bRecommend(?:ation|ed)\b|\byour (?:yes|go|word|answer|call|pick)\b'
                 r'|\bwhen you say\b|\bwaits? (?:on|for) you', re.I)


def _plain(s):
    return re.sub(r'\s+', ' ', re.sub(r'[*`_#]', '', s.replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"'))).strip().lower()


def _minus(ts, seconds):
    from datetime import datetime, timedelta
    return (datetime.fromisoformat(ts[:19]) - timedelta(seconds=seconds)).strftime('%Y-%m-%dT%H:%M:%S')


def parse_time(s):
    """2026-09-26T10:22:23Z or 2026-09-26 10:22[:23] -> 2026-09-26T10:22:23 (UTC, no zone)."""
    s = s.strip().replace(' ', 'T').rstrip('Z')
    if re.fullmatch(r'\d{4}-\d\d-\d\dT\d\d:\d\d', s):
        s += ':00'
    if not re.fullmatch(r'\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?', s):
        raise ValueError('a UTC time like 2026-09-26T10:22:23Z: %r' % s)
    return s


def window(t, minutes):
    from datetime import datetime, timedelta
    d = datetime.fromisoformat(t[:19])
    return (d - timedelta(minutes=minutes)).strftime('%Y-%m-%dT%H:%M:%S'), t


def parse_window(s):
    m = re.fullmatch(r'(\d+)\s*([mhd]?)', s.strip())
    if not m:
        raise ValueError('a window like 30m, 2h or 1d: %r' % s)
    n, u = int(m.group(1)), m.group(2) or 'm'
    return n * {'m': 1, 'h': 60, 'd': 1440}[u]
