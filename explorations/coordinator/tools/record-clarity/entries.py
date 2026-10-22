#!/usr/bin/env python3
"""entries.py N...: for each POSITIONS entry N, its text in the record now, and the provenance audit's evidence on it.

    python3 -I explorations/coordinator/tools/record-clarity/entries.py 45 50 51

The evidence comes from the provenance audit of 2026-10-21 and 22 (positions-audit/): the scout's report
on the curator's messages behind the entry, with a block of his exact quotes, and its chunk's judgement,
corrections and takeaway files, each with the line where its section on the entry starts. The audit's
corrections are applied (6b560762f), so the text now is the corrected text. An entry the audit did not
trace has no evidence; run the mining workflow first (positions-audit/README.md).
"""
import os, re, subprocess, sys
REPO = '/home/user/fortress/'
E = 'explorations/coordinator/positions-audit/full/evidence/'
CHUNKS = {'c1': [7, 8, 9, 11, 12, 16, 17, 19, 25, 26], 'c2': [27, 28, 29, 30, 32, 33, 37, 38, 39, 40],
          'c3': [41, 42, 43, 44, 45, 46, 47, 48, 49, 50], 'c4': [51, 52, 53, 54, 56, 57, 58, 59, 60, 62],
          'c5': [146, 147, 149, 152, 154, 155, 67, 68, 69, 70], 'c6': [71, 72, 73, 74, 75, 76, 77, 78, 79, 80],
          'c7': [153, 84, 87, 89, 90, 91, 95, 96, 97, 98], 'c8': [102, 103, 123, 124, 125]}

def entries(text):
    return {m.group(1): l[2:] for l in text.split('\n') for m in [re.match(r'- (P-\d+) ', l)] if m}

now = entries(subprocess.run(['git', '-C', REPO, 'show', 'HEAD:explorations/coordinator/POSITIONS.md'], capture_output=True, text=True).stdout)
TRIAL = [10, 18, 55, 66, 85, 86, 88, 148, 150, 151]
T = 'explorations/coordinator/positions-audit/trial/evidence/'

def where(path, n):
    try:
        lines = open(REPO + path).read().split('\n')
        for pat in (r'#+ .*\bP-%d\b' % n, r'- \*\*P-%d\*\*' % n):
            for i, l in enumerate(lines, 1):
                if re.match(pat, l):
                    return '%s:%d' % (path, i)
    except FileNotFoundError:
        return path + ' (missing)'
    return path

for a in sys.argv[1:]:
    n = int(a.replace('P-', ''))
    key = 'P-%d' % n
    c = next((k for k, v in CHUNKS.items() if n in v), None)
    print('## %s\n' % key)
    print('Now:\n\n> - %s\n' % now.get(key, '(not in POSITIONS)'))
    if c:
        print('Evidence: %s; %s; %s; %s\n' % (E + key + '.md', where(E + 'judgement-%s.md' % c, n),
              where(E + 'corrections-%s.md' % c, n), where(E + 'takeaway-%s.md' % c, n)))
    elif n in TRIAL:
        print('Evidence: %s; %s; %s; %s\n' % (T + key + '.md', where(T + 'judgement.md', n), where(T + 'corrections.md', n), where(T + 'takeaway-check.md', n)))
    else:
        print('Evidence: none; the provenance audit did not trace this entry.\n')
