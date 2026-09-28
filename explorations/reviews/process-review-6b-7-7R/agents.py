"""The runs of climb batches 6b, 7 and 7R, and their agents, from each run's journal.

Batch 6b: wf_08949b8a-a21 (the run that landed) and wf_2da3e152-2d5 (a second
launch of rung O at 12:12 UTC on 2026-09-27, cut after six minutes, no result).
Batch 7: wf_8a018276-f71. Batch 7R: wf_568733d7-19c (rung J launched twice).
Batch 7C (wf_5c4d7157-2e7) is running and is not read.
"""
import json, glob, os
D = '/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows'
RUNS = [('wf_08949b8a-a21', '6b'), ('wf_2da3e152-2d5', '6b'), ('wf_8a018276-f71', '7'), ('wf_568733d7-19c', '7R')]
BASELINE = '/home/user/fortress/explorations/reviews/worker-context-cost'

def kind_of(label):
    if label.startswith('skeptic'): return 'skeptic'
    if label.startswith(('repair:review',)): return 'review-repair'
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
            out.append(dict(wf=w, batch=batch, tier='Opus 5.5', role=label, label=label, kind=k, path=path, aid=aid))
    return out
