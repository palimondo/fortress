#!/usr/bin/env python3
"""build.py: the apply files of 2026-10-22, from the audit's and the clarity pilot's, at his word of 08:19 UTC.

    python3 -I build.py

Writes into this folder, in the order they apply: 01-c1.apply ... 08-c8.apply (the audit's
corrections, without the four entries held for his answers, P-27, P-38, P-43, P-90; P-89 keeps
its bare "Built."), 09-handles.apply (group 7, without the held entries and without the pilot's
ten, whose clarity text replaces it), 10-pilot.apply (the clarity pilot's ten entries, as committed).
"""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(HERE, '..')
HELD = {'P-27', 'P-38', 'P-43', 'P-90'}
PILOT = {'P-45', 'P-50', 'P-51', 'P-12', 'P-29', 'P-40', 'P-74', 'P-146', 'P-153', 'P-67'}

def blocks(text):
    """(entry key or None, lines) per block: an op line and its indented provenance line."""
    out, cur = [], None
    for line in text.split('\n'):
        m = re.match(r'(?:- |remove |note |move |merge )([PF]-\d+)', line)
        if m:
            cur = [m.group(1), [line]]; out.append(cur)
        elif line.startswith('  ') and cur:
            cur[1].append(line)
        else:
            cur = None; out.append([None, [line]])
    return out

def built(lines):
    if lines[0].startswith('- P-89 ') and not lines[0].rstrip().endswith('Built.'):
        lines[0] = lines[0].rstrip() + ' Built.'
    return lines

def write(name, src, drop):
    kept, dropped = [], []
    for key, lines in blocks(open(src).read()):
        if key in drop:
            dropped.append(key); continue
        kept += built(lines)
    open(os.path.join(HERE, name), 'w').write('\n'.join(kept))
    print(name, 'dropped', sorted(dropped))

for i in range(1, 9):
    write('%02d-c%d.apply' % (i, i), os.path.join(A, 'full/evidence/corrections-c%d.apply' % i), HELD)
write('09-handles.apply', os.path.join(A, 'full/evidence/handles.apply'), HELD | PILOT)
write('10-pilot.apply', os.path.join(A, 'clarity/evidence/pilot/proposals.apply'), set())
