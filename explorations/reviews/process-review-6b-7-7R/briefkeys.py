"""The keys of each rung worker's briefing, as the worker ran them (the first facts-extract call
of each rung agent), so that a finding can be checked against what the briefing carried.
python3 briefkeys.py > briefkeys.txt"""
import csv, json, re, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from agents import agents
for a in agents(kinds=('rung', 'skeptic')):
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
