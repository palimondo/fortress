#!/usr/bin/env python3
# For each integer trait that extends Integral[\I\], list every abstract operator of Integral
# whose parameter type the trait declares differently from Integral's promise (I replaced by
# the trait), in the component and in the api. Usage: integral-contract.py <fss> <fsi> [<builtin fss> <builtin fsi>]
import re, sys
def blocks(path):
    out = {}; cur = None
    for i, l in enumerate(open(path).read().split('\n'), 1):
        m = re.match(r'^(?:value )?(?:trait|object) (\w+)', l)
        if m: cur = m.group(1); out.setdefault(cur, []); continue
        if re.match(r'^end\b', l): cur = None; continue
        if cur:
            d = re.match(r'\s+opr\s+(\S+?)\(self,\s*\w+\s*:\s*([\w\\\[\]]+)\)\s*:\s*([\w\\\[\]]+)', l)
            if d: out[cur].append((i, d.group(1), d.group(2), d.group(3)))
    return out
fss, fsi = sys.argv[1], sys.argv[2]
extra = sys.argv[3:5]
promise = {op: p for (_, op, p, _) in blocks(fss)['Integral']}
for path in [fss, fsi] + extra:
    b = blocks(path)
    for t in ['ZZ32', 'ZZ64', 'NN64', 'ZZ', 'NN32']:
        if t not in b: continue
        for (i, op, p, r) in b[t]:
            if op in promise:
                want = t if promise[op] == 'I' else promise[op]
                flag = '' if p == want else '   <-- Integral promises b:' + want
                if flag: print('%s:%d  %s: opr %s(self,b:%s):%s%s' % (path, i, t, op, p, r, flag))
print('checked:', ', '.join(sorted(promise)))
