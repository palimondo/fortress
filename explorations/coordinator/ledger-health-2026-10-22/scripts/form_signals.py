#!/usr/bin/env python3
"""Form signals over the open rows (NEGATIVE-VERIFIED, NEGATIVE-BOUNDED, CONTESTED) that the
template's lint does not check:
  nv-silent        NEGATIVE-VERIFIED (the specification settles it) with the spec cell `silent`
  deliberate-open  a class of kind `deliberate` on an open status
  after-marker     text after the "full text: history, row N" marker (a note appended after it)
  history-markers  the notes name a batch, a rung, a skeptic, judge or gather, a promotion, a
                   date, or "fixed half"/"since climb batch": the repair story, counted per row
Writes form-signals.tsv (row, status, signal, detail) and prints counts."""
import collections, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'explorations', 'coordinator', 'tools'))
import ledger as L
led = L.Ledger(os.path.join(ROOT, L.LEDGER_REL))
OPEN = ('NEGATIVE-VERIFIED', 'NEGATIVE-BOUNDED', 'CONTESTED')
MARKERS = {
    'batch/rung': re.compile(r'\b(climb batch|batch \d+|rung [A-Z]\b|repair batch|ladder rung)', re.I),
    'skeptic/judge/gather': re.compile(r'\b(skeptic|judge|gather)', re.I),
    'promotion/XXX bookkeeping': re.compile(r'\b(promoted|gated by|keyed|expected failure)', re.I),
    'date': re.compile(r'\b20\d\d-\d\d-\d\d\b'),
    'repair story': re.compile(r'\b(fixed half|half fixed|since climb batch|is fixed since|was fixed|now (?:refuses|accepts|runs|says|gives))', re.I),
    'repair design': re.compile(r'\b(Fix:|Repair:|The fix is|To be fixed|would fix)', re.I),
}
out = []
cnt = collections.Counter()
per_row = collections.Counter()
nopen = 0
for r in led.rows:
    if r.status_word not in OPEN:
        continue
    nopen += 1
    if r.status_word == 'NEGATIVE-VERIFIED' and r.spec.strip() == 'silent':
        out.append((r.num, r.status_word, 'nv-silent', L.clip(r.klass, 60)))
    if r.klass.startswith('deliberate'):
        out.append((r.num, r.status_word, 'deliberate-open', r.klass))
    m = re.search(r'full text: history, row \d+', r.notes)
    if m and r.notes[m.end():].strip(' .;'):
        out.append((r.num, r.status_word, 'after-marker', L.clip(r.notes[m.end():].strip(), 120)))
    k = 0
    for name, pat in MARKERS.items():
        if pat.search(r.notes):
            cnt[name] += 1
            k += 1
    per_row[k] += 1
with open(os.path.join(HERE, '..', 'form-signals.tsv'), 'w') as f:
    f.write('row\tstatus\tsignal\tdetail\n')
    for t in out:
        f.write('\t'.join(map(str, t)) + '\n')
c = collections.Counter(t[2] for t in out)
print('open rows', nopen)
for k in sorted(c):
    print('%-16s %d rows' % (k, c[k]))
print('notes naming each marker (rows):')
for k, v in cnt.most_common():
    print('  %-28s %d' % (k, v))
print('rows by the number of marker kinds in their notes:', dict(sorted(per_row.items())))
