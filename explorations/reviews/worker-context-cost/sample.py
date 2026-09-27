"""For the sampled agents: each gathering call beside what the record held at the run's start.

python3 sample.py      writes sample/<batch>-<role>.txt, one per sampled agent.

For every gathering call it prints the agent's own words before the call (what it
said it was looking for), the command, the bytes and cost, and a mechanical check
against the record at the batch's base commit (FACTS.md, INDEX.md and the maps,
read with git show): which of the files the call read are named in the record,
and which of its search words appear there. The mechanical check only says the
record mentions the thing; whether it held what the agent learned is judged by
hand in the note.
"""
import csv
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from agents import agents          # noqa: E402

REPO = '/home/user/fortress'
BASE = {'repair batch': '49ee5e91a', 'batch 1': 'cb242a2d8', 'batch 2': '8590d7a9e', 'batch 3': 'd610695c0',
        'batch 3.5': 'abdfbb2db', 'batch 4': '47437c65f', 'batch 5': '6030e4b36', 'batch 6': 'e5414f5bf'}
SAMPLE = [('batch 1', 'rung:M'), ('batch 1', 'skeptic:N'), ('batch 1', 'repair:N'), ('batch 2', 'rung:X'),
          ('batch 3', 'skeptic:R'), ('batch 4', 'rung:O'), ('batch 5', 'rung:D'), ('batch 6', 'rung:R')]


def record_at(commit):
    files = ['explorations/coordinator/FACTS.md', 'explorations/coordinator/INDEX.md']
    files += subprocess.run(['git', '-C', REPO, 'ls-tree', '-r', '--name-only', commit, 'explorations/coordinator/map/'],
                            capture_output=True, text=True).stdout.split()
    out = {}
    for f in files:
        r = subprocess.run(['git', '-C', REPO, 'show', commit + ':' + f], capture_output=True, text=True)
        if r.returncode == 0:
            out[f.split('/')[-1] if 'map/' not in f else 'map/' + f.split('/')[-1]] = r.stdout
    return out


def said_before(path):
    """tool_use id -> the visible text the agent wrote in the turns since its previous call."""
    said, buf = {}, []
    for line in open(path):
        r = json.loads(line)
        if r.get('type') != 'assistant':
            continue
        for b in r['message']['content']:
            if b['type'] == 'text' and b.get('text', '').strip():
                buf.append(b['text'].strip())
            elif b['type'] == 'tool_use':
                said[b['id']] = ' '.join(buf)[-400:]
                buf = []
    return said


def main():
    calls = list(csv.DictReader(open(os.path.join(HERE, 'calls.csv'))))
    os.makedirs(os.path.join(HERE, 'sample'), exist_ok=True)
    byagent = {(a['batch'], a['role']): a for a in agents()}
    summary = []
    for batch, role in SAMPLE:
        a = byagent[(batch, role)]
        rec = record_at(BASE[batch])
        blob = '\n'.join(rec.values())
        low = blob.lower()
        # the transcript's tool_use ids in call order
        ids = []
        for line in open(a['path']):
            r = json.loads(line)
            if r.get('type') == 'assistant':
                ids += [b['id'] for b in r['message']['content'] if b['type'] == 'tool_use']
        said = said_before(a['path'])
        rows = [c for c in calls if c['aid'] == a['aid']]
        lines = ['# %s %s (%s), base %s; record: %s' % (batch, role, a['tier'], BASE[batch],
                 ', '.join('%s %dK' % (k, len(v) // 1000) for k, v in rec.items()))]
        n_g = n_named = 0
        for c in rows:
            if c['cat'] != 'gather':
                continue
            n_g += 1
            cmd = c['cmd']
            files = sorted(set(re.findall(r'[A-Za-z0-9_\-]+\.(?:java|scala|fss|fsi|tex|md|test|xml|ast)\b', cmd)))
            named = [f for f in files if f.lower() in low]
            words = [w for w in re.findall(r"grep[^|;&]*?-[A-Za-z]*\s+['\"]([^'\"]{3,60})['\"]", cmd)]
            wfound = [w for w in words if re.sub(r'\\[|b()]', ' ', w).split() and
                      all(x.lower() in low for x in re.sub(r'\\\||\\b|[()^$\\]', ' ', w).split()[:1])]
            if files and len(named) == len(files):
                n_named += 1
            tid = ids[int(c['seq'])] if int(c['seq']) < len(ids) else ''
            lines.append('')
            lines.append('[%s] %s bytes, %s ITE, pre-edit %s, targets %s' % (c['seq'], c['bytes'], c['ite'], c['before_first_do'], c['targets']))
            if said.get(tid):
                lines.append('  said: ' + said[tid].replace('\n', ' ')[:400])
            lines.append('  cmd: ' + cmd[:300])
            lines.append('  record names files: %s of %s %s' % (len(named), len(files), named[:6]))
            if words:
                lines.append('  search words found in record: %s of %s %s' % (len(wfound), len(words), wfound[:4]))
        lines.insert(1, 'gathering calls %d; calls whose every named file the record names: %d' % (n_g, n_named))
        name = '%s-%s.txt' % (batch.replace(' ', ''), role.replace(':', '-'))
        open(os.path.join(HERE, 'sample', name), 'w').write('\n'.join(lines) + '\n')
        summary.append('%s %s: %d gathering calls, %d with every named file in the record' % (batch, role, n_g, n_named))
    print('\n'.join(summary))


if __name__ == '__main__':
    main()
