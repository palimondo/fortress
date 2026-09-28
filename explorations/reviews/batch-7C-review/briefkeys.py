"""The keys each rung worker, skeptic, judge and review repair of batch 7C ran through facts-extract.sh,
so that a miss can be checked against what its briefing carried (../process-review-6b-7-7R/briefkeys.py,
widened to the judge and the review repair).  python3 briefkeys.py > briefkeys.txt"""
import json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from agents import agents
for a in agents(kinds=('rung', 'skeptic', 'judge', 'review-repair')):
    keys = []
    for line in open(a['path']):
        r = json.loads(line)
        if r.get('type') != 'assistant': continue
        for b in r['message']['content']:
            if b['type'] == 'tool_use' and b['name'] == 'Bash' and 'facts-extract.sh' in b['input'].get('command', ''):
                for k in re.findall(r'"([^"]+)"', b['input']['command']):
                    if k not in keys: keys.append(k)
    print('== %s %s (%d keys)' % (a['batch'], a['label'], len(keys)))
    for k in keys: print('   ' + k)
