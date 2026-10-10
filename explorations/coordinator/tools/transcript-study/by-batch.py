#!/usr/bin/env python3
# by-batch.py [BATCH...]: labor.md's classes of tokens written, one column for each batch, from acct.pkl.
# New text, not recovered: it is the inline program c059 of the labor author (labor/inline/c059-0.py), which
# prints the classes for batch 8, 9 and both, with the batch list taken from the command line and the classes
# summed into the groups the later notes quote. Run it in a folder that holds acct.pkl and labor/tab1.py (see
# README.md, "How to run").
import collections, pickle, sys
from tab1 import grp
O = pickle.load(open('acct.pkl', 'rb'))
batches = [int(x) for x in sys.argv[1:]] or sorted(set(o['batch'] for o in O.values()))
G = [
    ('first call (system, tools, attachments, brief)', ['first']),
    ('own thinking and narration', ['think']),
    ('briefing (facts-extract parts)', ['KB: briefing (facts-extract)']),
    ('the record read directly (FACTS, POSITIONS, PLAN, ledger, INDEX, maps, batch record, other docs)',
     ['KB: FACTS', 'KB: POSITIONS', 'KB: PLAN', 'KB: ledger', 'KB: INDEX and maps', 'KB: batch record', 'KB: handover/other docs']),
    ('specification', ['KB: specification']),
    ('reports, records, transcripts of the chain', ['reports and artifacts of the rung chain']),
    ('source, library, tests', ['source (Java, Scala)', 'Fortress library', 'tests']),
    ('search (grep, find, ls, git log)', ['search (grep, find, ls, git log)']),
    ('git diff, show, status', ['git diff/show/status']),
    ('edits and writes (product, tests, probes, reports, record)',
     ['edit: product (src, library, spec)', 'edit: tests', 'write: probes and scratch', 'write: report files', 'edit: record (FACTS, ledger...)']),
    ('build, run tests and stages, probes, wait, read output', ['build', 'run tests/stages', 'run probes', 'wait/poll', 'read output (logs, results)']),
    ('reads that fit no class (after batch 10, mostly the skill\'s parts and saved tool results)', ['__readother']),
    ('git commit and push, structured result, other', ['git: commit/push/ops', 'structured result', 'other']),
    ('cache refill', ['refill']),
]
S = {}
W = {}
for b in batches:
    c = collections.Counter(); w = 0; n = 0
    for o in O.values():
        if o['batch'] != b:
            continue
        n += 1; w += o['W']
        c['first'] += o['w1']; c['think'] += o['think']; c['refill'] += o['refill']
        for k in o['calls']:
            if k['cls'] == 'read:other':
                c['__readother'] += k['res'] + k['inp']
            else:
                c[grp(k['cls'])] += k['res'] + k['inp']
    S[b] = c; W[b] = (w, n)
print('class (K tokens written, share of the batch)\t' + '\t'.join('batch %d' % b for b in batches))
print('agents\t' + '\t'.join(str(W[b][1]) for b in batches))
print('written (K)\t' + '\t'.join('%.0f' % (W[b][0] / 1000) for b in batches))
for name, keys in G:
    row = []
    for b in batches:
        v = sum(S[b][k] for k in keys)
        row.append('%.0f (%.1f%%)' % (v / 1000, 100.0 * v / W[b][0]))
    print(name + '\t' + '\t'.join(row))
print()
roles = sorted(set(o['role'] for o in O.values() if o['batch'] in batches))
print('role (K written, agents)\t' + '\t'.join('batch %d' % b for b in batches))
for r in roles:
    row = []
    for b in batches:
        xs = [o for o in O.values() if o['batch'] == b and o['role'] == r]
        row.append('%.0f (%d)' % (sum(o['W'] for o in xs) / 1000, len(xs)) if xs else '-')
    print(r + '\t' + '\t'.join(row))
