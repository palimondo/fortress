"""How much of each worker's and skeptic's searching opened a file its own briefing had printed from.
A proxy, not a label: a gathering call counts when its command or path names the file of one of the agent's
doc: or code: keys (the key's path), or FACTS.md/POSITIONS.md/the ledger when the briefing carried keys of that
kind; the call may read other lines of the file than the briefing printed.  python3 overlap.py > overlap.txt"""
import csv, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from agents import agents
C = list(csv.DictReader(open(os.path.join(HERE, 'calls.csv'))))
tot = [0, 0, 0.0, 0.0]
for a in agents(kinds=('rung', 'skeptic', 'judge', 'review-repair')):
    keys = []
    for line in open(a['path']):
        r = json.loads(line)
        if r.get('type') != 'assistant': continue
        for b in r['message']['content']:
            if b['type'] == 'tool_use' and b['name'] == 'Bash' and 'facts-extract.sh' in b['input'].get('command', ''):
                keys += re.findall(r'"([^"]+)"', b['input']['command'])
    paths = set()
    for k in keys:
        m = re.match(r'(?:doc|code):([^#]+)', k)
        if m: paths.add(os.path.basename(m.group(1)))
        elif k.startswith('positions:'): paths.add('POSITIONS.md')
        elif k.startswith('ledger:'): paths.add('fortress-gap-ledger.md')
        elif k.startswith('map:'): pass
        elif not k.startswith('$') and k != '^$': paths.add('FACTS.md')
    g = [c for c in C if c['aid'] == a['aid'] and c['cat'] == 'gather']
    hit = [c for c in g if any(p in c['cmd'] for p in paths)]
    gt = sum(float(c['tokens']) for c in g); ht = sum(float(c['tokens']) for c in hit)
    print('%-15s searching calls %3d, of which into a briefed file %3d (%2.0f%%); tokens %6.0fK, of which %6.0fK (%2.0f%%)' % (
        a['label'], len(g), len(hit), 100 * len(hit) / max(1, len(g)), gt / 1e3, ht / 1e3, 100 * ht / max(1, gt)))
    if a['kind'] in ('rung', 'skeptic'):
        tot[0] += len(g); tot[1] += len(hit); tot[2] += gt; tot[3] += ht
print('workers and skeptics: %d of %d searching calls (%.0f%%), %.0fK of %.0fK tokens (%.0f%%)' % (
    tot[1], tot[0], 100 * tot[1] / tot[0], tot[3] / 1e3, tot[2] / 1e3, 100 * tot[3] / tot[2]))
