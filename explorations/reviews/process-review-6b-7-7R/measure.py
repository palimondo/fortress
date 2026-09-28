"""Measure, for the agents of climb batches 6b, 7 and 7R, what reading the briefing and
gathering context cost, with the baseline's own method.

python3 measure.py     writes calls.csv (one row per tool call) and agents.csv (one per agent).

Reused unchanged from ../worker-context-cost/: parse.py (turns, calls, results),
classify.py (gather / inspect / do / other), calibration.json (the token fit on the
Opus 5.5 turns of batches 3 to 6: 0.41 tokens per result byte plus about 107 per
result) and measure.py's billing (every later turn re-reads a result, at the cache-read,
cache-write or input rate that turn paid; ITE = input-token equivalents).

Two extensions, both needed because the process changed on 2026-09-27:
- a fifth category, "briefing": a call that runs explorations/coordinator/tools/facts-extract.sh,
  and a later read of the scratch file such a call wrote its output into (agents run the tool
  with "> $S/brief1.txt" and read the file back with Read or cat), and a read-back of the
  harness's tool-results file of either. The baseline had no such call.
- the batch record: CLIMB-BATCH-7R.md is a batch record as CLIMB-BATCH-7.md is (the baseline's
  pattern climb-batch-[0-9.]+.md did not know a letter suffix).
"""
import csv, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from agents import agents, BASELINE          # noqa: E402  (this directory's agents.py first)
sys.path.insert(1, BASELINE)
import importlib.util                         # noqa: E402
import classify as C                          # noqa: E402  (the baseline's)
_spec = importlib.util.spec_from_file_location('baseline_measure', os.path.join(BASELINE, 'measure.py'))
M = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(M)   # the baseline's billing

_path_class = C.path_class
def path_class(p, own_dirs):
    low = C.norm_path(p).lower()
    if re.search(r'climb-batch-[0-9.]+[a-z]+\.md', low) and 'review' not in low:
        return 'brief'
    return _path_class(p, own_dirs)
C.path_class = path_class

FX = re.compile(r'facts-extract\.sh')
_state = {'aid': None, 'files': set(), 'pats': []}

def brief_targets(cmd):
    """The scratch files a facts-extract call writes: redirect targets, as basenames or patterns."""
    pats = []
    for t in re.findall(r'(?<![0-9&<>])>>?\s*([^\s&|;<>]+)', cmd):
        b = os.path.basename(t.strip('"\''))
        if not b or b == 'null':
            continue
        pat = re.sub(r'\\\$(?:\\\{)?[A-Za-z_]+(?:\\\})?|\\\$\\\(.*?\\\)', r'[^/]*', re.escape(b))
        pats.append(pat)
    return pats

def classify(call, own_dirs):
    if call['seq'] == 0:
        _state['files'] = set(); _state['pats'] = []
    inp = call['input']
    text = inp.get('command', '') if call['name'] == 'Bash' else inp.get('file_path', '')
    if call['name'] == 'Bash' and FX.search(text):
        _state['pats'] += brief_targets(text)
        return dict(cat='briefing', sub='facts-extract', targets=[], kb=True, verbs=['facts-extract'])
    if _state['pats'] and call['name'] in ('Read', 'Bash'):
        names = [os.path.basename(x) for x in re.findall(r'[^\s\'";|&<>()]+', text)]
        is_read = call['name'] == 'Read' or not re.search(r'(?<![0-9&<>])>\s*(?!/dev/null)\S|\b(sed\s+-i|tee|cp|mv|rm)\b', text)
        if is_read and any(re.fullmatch(p, n) for p in _state['pats'] for n in names):
            return dict(cat='briefing', sub='read-back', targets=[], kb=True, verbs=['read-back'])
    if (call['name'] == 'Read' and re.search(r'/tmp/brief[^/\s]*\.txt$', text)
            or call['name'] == 'Bash' and re.search(r'\b(cat|head|sed|grep|tail)\b[^|;&]*[\s/]tmp/brief[^/\s]*\.txt', text)) \
            and not re.search(r'(?<![0-9&<>])>\s*(?!/dev/null)\S*brief', text):
        # a later launch reading the briefing an earlier launch of the same role saved in the worktree
        return dict(cat='briefing', sub='saved-read', targets=[], kb=True, verbs=['saved-read'])
    return C.classify(call, own_dirs)

M.classify = classify

# What an agent read, by kind, whether through its own calls or through the briefing's keys.
KINDS = {
    'map': r'coordinator/map/',
    'FACTS': r'FACTS\.md',
    'INDEX': r'coordinator/INDEX\.md|(^|[\s/])INDEX\.md',
    'POSITIONS': r'POSITIONS(-history)?\.md',
    'ledger': r'fortress-gap-ledger\.md',
    'Library': r'(^|[\s/"\'])Library/',
    'types.tick': r'types\.tick',
    'batch record': r'CLIMB-BATCH-[0-9.]+[A-Za-z]*\.md',
}
KEYPFX = {'map': 'map:', 'INDEX': 'index:', 'POSITIONS': 'positions:', 'ledger': 'ledger:',
          'Library': 'code:Library/', 'types.tick': 'types.tick'}


def keys_of(cmd):
    """The keys of one facts-extract call (its double-quoted arguments)."""
    return re.findall(r'"([^"]+)"', cmd)


def key_kind(k):
    if k.startswith('positions:'): return 'POSITIONS'
    if k.startswith('ledger:'): return 'ledger'
    if k.startswith('map:'): return 'map'
    if k.startswith('index:'): return 'INDEX'
    if k.startswith('code:'): return 'code'
    if k.startswith('doc:'):
        return 'doc-spec' if re.search(r'\.(tex|tick)', k) else 'doc-note'
    if k.startswith('@'): return 'item'
    return 'FACTS'


def main():
    rows_a, rows_c = [], []
    for a in agents():
        ag, calls = M.measure(a)
        # the briefing: calls, parts, bytes, its cost with re-reads, and where it came
        bcalls = [c for c in calls if c['cat'] == 'briefing']
        fx = [c for c in bcalls if c['sub'] == 'facts-extract']
        keys = set()
        for c in fx:
            keys.update(keys_of(c['input'].get('command', '')))
        parts_seen = set()
        announced = 0
        for c in bcalls:
            m = re.search(r'--part\s+(\d+)', c['input'].get('command', ''))
            if c['sub'] == 'facts-extract':
                parts_seen.add(int(m.group(1)) if m else 1)
                for loop in re.findall(r'for\s+\w+\s+in\s+([0-9 ]+);', c['input'].get('command', '')):
                    parts_seen.update(int(x) for x in loop.split())
            for n in re.findall(r'end of part \d+ of (\d+)', c['result']):
                announced = max(announced, int(n))
            for n in re.findall(r'part \d+ of (\d+)', c['result']):
                announced = max(announced, int(n))
        first_tool = next((c for c in calls if c['name'] not in ('ToolSearch',)), None)
        first_b = bcalls[0]['seq'] if bcalls else None
        nonb_before = len([c for c in calls if first_b is not None and c['seq'] < first_b and c['cat'] in ('gather', 'inspect')])
        read_kinds = {}
        for k, pat in KINDS.items():
            read_kinds[k] = sum(1 for c in calls if c['cat'] in ('gather', 'inspect')
                                and re.search(pat, json.dumps(c['input'])))
        key_kinds = {}
        for k in keys:
            kk = key_kind(k); key_kinds[kk] = key_kinds.get(kk, 0) + 1
        g = [c for c in calls if c['cat'] == 'gather']
        ag.update(dict(
            b_calls=len(bcalls), b_fx=len(fx), b_bytes=sum(c['bytes'] for c in bcalls),
            b_tokens=sum(c['tokens'] for c in bcalls), b_ite=sum(c['ite'] for c in bcalls),
            b_parts_run=len(parts_seen), b_parts_announced=announced, b_keys=len(keys),
            b_first_seq=first_b, b_reads_before=nonb_before,
            b_key_kinds=';'.join('%s=%d' % kv for kv in sorted(key_kinds.items())),
            g_calls=len(g), g_bytes=sum(c['bytes'] for c in g), g_tokens=sum(c['tokens'] for c in g),
            g_ite=sum(c['ite'] for c in g), g_out_ite=sum(c['out_share_ite'] for c in g),
            g_pre_calls=sum(1 for c in g if c['before_first_do']),
            g_pre_ite=sum(c['ite'] for c in g if c['before_first_do']),
            **{'read_' + k.replace(' ', '_').replace('.', '_'): v for k, v in read_kinds.items()}))
        rows_a.append(ag)
        for c in calls:
            cmd = c['input'].get('command') or c['input'].get('file_path') or c['input'].get('pattern') or ''
            rows_c.append(dict(batch=a['batch'], role=a['label'], kind=a['kind'], aid=a['aid'], seq=c['seq'],
                               turn=c['turn'], tool=c['name'], cat=c['cat'], sub=c['sub'],
                               targets='|'.join(sorted(set(x for x, _ in c.get('targets', []) or [])))[:80],
                               bytes=c['bytes'], tokens=round(c['tokens']), ite=round(c['ite']),
                               turns_after=c['turns_after'], tool_s=round(c['tool_s'], 2),
                               gen_s=round(c['gen_share'], 2), out_ite=round(c['out_share_ite']),
                               before_first_do=int(c['before_first_do']),
                               cmd=re.sub(r'\s+', ' ', cmd)[:200]))
    with open(os.path.join(HERE, 'calls.csv'), 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=list(rows_c[0].keys())); w.writeheader(); w.writerows(rows_c)
    keys = [k for k in rows_a[0].keys() if k != 'path']
    with open(os.path.join(HERE, 'agents.csv'), 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=keys, extrasaction='ignore'); w.writeheader(); w.writerows(rows_a)


if __name__ == '__main__':
    main()
