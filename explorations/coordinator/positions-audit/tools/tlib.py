"""tlib: the curator's messages and the coordinating session's text before each (standard library).

His messages are exactly what explorations/coordinator/curator-profile/show.py gives (its load(),
imported read-only): the live transcripts, the backup copies in /home/user/fortress-transcripts-
blinded (the .parts folders and the copy until 2026-10-08T15-41 included) and the first session on
the `transcripts` branch; deduplicated by uuid; queued messages with the time he sent them.

The coordinator's side is read from the same files: every `assistant` line that is not a
sidechain and holds a text block, deduplicated by uuid (a resumed transcript replays earlier lines;
the first copy, in show.py's file order, is cited). The message he answered is the last such text
of the same session before his message's time. A text that answers a Stop hook's feedback (the
hook's prompt is the latest before it) is skipped and counted. Cache: ./cache/tx2-*.pickle, per file, keyed by size
and mtime (by blob id for the `transcripts` branch).
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

sys.dont_write_bytecode = True          # import show.py without writing into the repository
sys.path.insert(0, SHOW_DIR)
import show  # noqa: E402
sys.path.pop(0)


def _assistant_texts(lines, src):
    """The assistant text lines of a transcript, and its prompt lines (a `user` line that is not a
    tool result), each prompt marked 'hook' when it is a Stop hook's feedback."""
    out = []
    for n, line in enumerate(lines, 1):
        if '"type":"user"' in line and '"isSidechain":false' in line[:400]:
            hook = 'Stop hook feedback' in line[:4000]
            if not hook and '"tool_result"' in line[:2000]:
                continue
            try:
                d = json.loads(line)
            except ValueError:
                continue
            if d.get('type') == 'user' and not d.get('isSidechain'):
                out.append({'ts': d.get('timestamp') or '', 'sid': d.get('sessionId') or '', 'uuid': d.get('uuid'),
                            'where': '%s:%d' % (src, n), 'kind': 'hook' if hook else 'prompt'})
            continue
        if '"type":"assistant"' not in line or '"type":"text"' not in line:
            continue
        try:
            d = json.loads(line)
        except ValueError:
            continue
        if d.get('type') != 'assistant' or d.get('isSidechain'):
            continue
        c = d.get('message', {}).get('content')
        if not isinstance(c, list):
            continue
        txt = '\n'.join(x.get('text', '') for x in c if isinstance(x, dict) and x.get('type') == 'text')
        if not txt.strip():
            continue
        out.append({'ts': d.get('timestamp') or '', 'sid': d.get('sessionId') or '', 'uuid': d.get('uuid'),
                    'where': '%s:%d' % (src, n), 'text': txt, 'kind': 'text'})
    return out


def _cached(key, fn):
    os.makedirs(CACHE, exist_ok=True)
    p = os.path.join(CACHE, 'tx2-' + hashlib.sha1(key.encode()).hexdigest()[:16] + '.pickle')
    if os.path.exists(p):
        with open(p, 'rb') as f:
            return pickle.load(f)
    v = fn()
    with open(p + '.tmp', 'wb') as f:
        pickle.dump(v, f)
    os.replace(p + '.tmp', p)
    return v


def assistant_texts():
    """All coordinator texts, deduplicated by uuid (first copy kept), sorted by (session, time)."""
    paths = glob.glob(show.ROOTS[0] + '/*.jsonl') + glob.glob(show.ROOTS[1] + '/**/*.jsonl', recursive=True)
    recs = []
    for p in sorted(paths):
        if '/subagents/' in p:
            continue
        st = os.stat(p)

        def read(p=p):
            with open(p, errors='replace') as f:
                return _assistant_texts(f, p)
        recs += _cached('%s|%d|%d' % (p, st.st_size, st.st_mtime_ns), read)
    for part in show.S1_PARTS:
        spec = show.S1_BRANCH + ':' + part
        r = subprocess.run(['git', '-C', REPO, 'rev-parse', spec], capture_output=True, text=True)
        if r.returncode != 0:
            sys.stderr.write('note: %s not readable; the first session is skipped\n' % spec)
            continue
        bid = r.stdout.strip()

        def read(spec=spec):
            out = subprocess.run(['git', '-C', REPO, 'show', spec], capture_output=True).stdout
            return _assistant_texts(out.decode('utf-8', 'replace').splitlines(), spec)
        recs += _cached('blob|' + bid, read)
    seen, out = set(), []
    for x in recs:
        k = x['uuid'] or (x['ts'], x['text'][:50])
        if k in seen:
            continue
        seen.add(k)
        out.append(x)
    by = {}
    for x in out:
        by.setdefault(x['sid'], []).append(x)
    for v in by.values():
        v.sort(key=lambda x: x['ts'])
    return by


class Talk:
    def __init__(self):
        self.msgs = show.load()
        allr = assistant_texts()
        self.asst = {s: [x for x in v if x['kind'] == 'text'] for s, v in allr.items()}
        self.prompts = {s: [x for x in v if x['kind'] != 'text'] for s, v in allr.items()}
        self.keys = {s: [x['ts'] for x in v] for s, v in self.asst.items()}
        self.pkeys = {s: [x['ts'] for x in v] for s, v in self.prompts.items()}

    def his(self, start, end):
        """His messages with start <= ts <= end (ISO strings compared as text, all UTC)."""
        return [m for m in self.msgs if m['ts'] >= start and m['ts'][:19] <= end[:19]]

    def before(self, sid, ts):
        """The coordinator's last text in session sid before ts, skipping its replies to a Stop
        hook's feedback (a text whose latest prompt is that feedback). Returns (text, skipped)."""
        v = self.asst.get(sid)
        if not v:
            return None, []
        i = bisect.bisect_left(self.keys[sid], ts)
        skipped = []
        while i > 0:
            x = v[i - 1]
            j = bisect.bisect_left(self.pkeys.get(sid, []), x['ts'])
            pr = self.prompts[sid][j - 1] if j > 0 else None
            if pr is not None and pr['kind'] == 'hook':
                skipped.append(x)
                i -= 1
                continue
            return x, skipped
        return None, skipped


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
