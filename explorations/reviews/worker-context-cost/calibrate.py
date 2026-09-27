"""Fit how many context tokens a tool result adds, from the turns whose usage is final.

For consecutive turns k-1, k where turn k-1's usage is final (its record carries
a stop_reason), the context growth C_k - C_{k-1} is regressed on turn k-1's
output tokens, the bytes of the tool results it received, their number, and the
bytes of the system reminders between them. Writes calibration.json.
"""
import json
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from agents import agents   # noqa: E402
from parse import parse     # noqa: E402

out = {}
for tier in ('Opus 5', 'Opus 5.5'):
    rows = []
    for a in agents():
        if a['tier'] != tier:
            continue
        p = parse(a['path']); T = p['turns']
        for k in range(1, len(T)):
            prev, t = T[k - 1], T[k]
            if not prev['final'] or k in p['compactions']:
                continue
            d = t['ctx'] - prev['ctx']
            if d < 0:
                continue
            rows.append((d, prev['out'], sum(c['bytes'] for c in prev['calls']), len(prev['calls']), t['extra_before']))
    A = np.array(rows, float); y = A[:, 0]; X = A[:, 1:]
    coef, *_ = np.linalg.lstsq(X, y, rcond=None)
    pred = X @ coef
    r2 = 1 - ((y - pred) ** 2).sum() / ((y - y.mean()) ** 2).sum()
    out[tier] = dict(n=len(rows), out=coef[0], per_byte=coef[1], per_result=coef[2], per_extra_byte=coef[3], r2=r2)
    print('%-8s n=%d  growth = %.3f x output + %.3f x result bytes + %.0f per result + %.3f x reminder bytes  (R2 %.3f)' % (
        tier, len(rows), coef[0], coef[1], coef[2], coef[3], r2))
json.dump(out, open(os.path.join(HERE, 'calibration.json'), 'w'), indent=1)
