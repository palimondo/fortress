#!/usr/bin/env python3
"""unstable-check.py <baseA-dir> <baseB-dir> <edit-dir> <test>...: for each test the comparison calls UNSTABLE,
the line numbers at which base A and base B differ, and those at which the edit differs from base A, with each
log's work path masked and an object's identity hash masked; a test whose edit lines are all among the lines
where the two base runs differ, with the same line count, is printed 'within', otherwise 'OUTSIDE' with the
lines."""
import re, sys
da, db, de = sys.argv[1:4]
def read(d, t):
    s = open(f'{d}/log/{t}.txt', encoding='utf-8', errors='replace').read()
    s = re.sub(r'/home/user/fortress-bounds/tmp/pass/[A-Za-z0-9]+', 'W', s)
    s = re.sub(r'@[0-9a-f]+', '@HASH', s)
    s = re.sub(r'secs=\d+', 'secs=', s)
    return s.split('\n')
for t in sys.argv[4:]:
    a, b, e = read(da, t), read(db, t), read(de, t)
    ab = {i for i in range(max(len(a), len(b))) if (a[i] if i < len(a) else None) != (b[i] if i < len(b) else None)}
    ae = {i for i in range(max(len(a), len(e))) if (a[i] if i < len(a) else None) != (e[i] if i < len(e) else None)}
    ok = ae <= ab and len(a) == len(e)
    print(f"{t}: A/B differ at {len(ab)} lines, edit/A at {len(ae)}: {'within' if ok else 'OUTSIDE ' + str(sorted(ae - ab)[:10])}")
    for i in sorted(ae)[:3]:
        print(f"    line {i+1}: A: {a[i][:90] if i < len(a) else ''!r}")
        print(f"             B: {b[i][:90] if i < len(b) else ''!r}")
        print(f"          edit: {e[i][:90] if i < len(e) else ''!r}")
