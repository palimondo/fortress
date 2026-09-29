"""The agents of climb batch 6.5b, wf_07b95462-a7d (launched 2026-09-29 09:52 UTC, landed 17:35 UTC),
from its journal, in the form of ../process-review-6b-7-7R/agents.py so that that note's measure.py runs
on them unchanged (batch-N-review/agents.py with the run changed, and the gate's repair given its own kind)."""
import json, os
D = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
RUNS = [('wf_07b95462-a7d', '6.5b')]
BASELINE = '/home/user/fortress/explorations/reviews/worker-context-cost'
# Every agent of this run ran on the tier of the baseline's newer fit; its key is read from the
# baseline's calibration.json (the longer of its two keys), not written here.
TIER = max(json.load(open(os.path.join(BASELINE, 'calibration.json'))), key=len)

def kind_of(label):
    if label.startswith('skeptic'): return 'skeptic'
    if label.startswith(('repair:review',)): return 'review-repair'
    if label.startswith(('repair:gate',)): return 'gate-repair'
    if label.startswith(('repair', 'resume')): return 'repair'
    if label.startswith('rung'): return 'rung'
    if label.startswith('judge'): return 'judge'
    if label.startswith('review'): return 'review'
    return label.split(':')[0]          # gather, gate, commit

def agents(kinds=None):
    out = []
    for w, batch in RUNS:
        labels = {}
        for l in open(f'{D}/{w}/journal.jsonl'):
            o = json.loads(l)
            if o.get('type') == 'started':
                labels[o['agentId']] = o['label']
        for aid, label in labels.items():
            path = f'{D}/{w}/agent-{aid}.jsonl'
            if not os.path.exists(path): continue
            k = kind_of(label)
            if kinds and k not in kinds: continue
            out.append(dict(wf=w, batch=batch, tier=TIER, role=label, label=label, kind=k, path=path, aid=aid))
    return out
