#!/usr/bin/env python3
"""Climb batch 25's planner: the code generator's refusals in a codegen.sh run, by component and by kind.
A declaration counts once, at its first wall: an @@CG FAIL line of the declaration loop, an @@CG PREFAIL line of the
object pre-pass, or an @@CG CTORFAIL line of CodeGen's constructor (inherited methods). Its kind is the code
generator's message, or, where the message is null, the exception's class and the frame that threw, as the probe of
2026-10-23 named them (perf-probes/codegen-distance/REPORT.md, section 1, "Classifier"). The component is the one
whose ### target line came last before the line. Usage: cgkinds.py run.txt [--list]"""
import re, sys
from collections import Counter, defaultdict
lines = open(sys.argv[1], errors='replace').read().split('\n')
comp, rows, ok, compfail = '?', [], Counter(), []
for l in lines:
    m = re.match(r'^### target (\S+)', l)
    if m: comp = m.group(1).split('/')[-1].replace('.fss', ''); continue
    if l.startswith('@@CG OK\t'): ok[comp] += 1; continue
    if l.startswith('@@CG COMPONENT-FAIL'): compfail.append((comp, l)); continue
    for tag in ('@@CG FAIL\t', '@@CG PREFAIL\t', '@@CG CTORFAIL\t'):
        if l.startswith(tag):
            p = l.split('\t')
            if tag == '@@CG CTORFAIL\t':
                name, span, exc, where, msg = p[1], p[2], p[3], p[4], p[5] if len(p) > 5 else ''
            else:
                name, span, exc, where, msg = p[1], p[2], p[3], p[4], p[5] if len(p) > 5 else ''
            kind = msg if msg and msg != 'null' else exc.split('.')[-1] + ' at ' + where
            kind = re.sub(r'^\s*\S+\.fs[si]:\S+:\s*', '', kind).strip()
            kind = re.sub(r' at \S+\.fs[si]:\S+$', '', kind)
            kind = re.sub(r'^Type checker generated\.:0:0:\s*', '', kind)
            kind = re.sub(r'(Error trying to close method scope)\..*', r'\1', kind)
            kind = re.sub(r'class (\S+) cannot be cast to class (\S+) .*', r'ClassCastException: \1 to \2', kind)
            kind = re.sub(r'node = .*', 'node = ...', kind)
            kind = re.sub(r'Not in the trait table: .*', 'Not in the trait table: <api trait>', kind)
            kind = re.sub(r'(duplicate entry: ).*', r'\1<closure class>', kind)
            kind = re.sub(r'^(CompilerBug: )?\S+ is not in the kind env.*', '<X> is not in the kind env', kind)
            kind = re.sub(r"(Can't compile TraitDecl) .*", r'\1', kind)
            rows.append((comp, tag.strip('@\t ').split()[1], name, span, exc.split('.')[-1], kind[:160]))
seen = set(); uniq = []
for r in rows:
    k = (r[0], r[2], r[3])
    if k in seen: continue
    seen.add(k); uniq.append(r)
bycomp = Counter(r[0] for r in uniq); bykind = defaultdict(list)
for r in uniq: bykind[r[5]].append(r)
print('refused declarations', len(uniq), '| emitted (OK lines)', sum(ok.values()), '| component failures', len(compfail))
for c in sorted(set(list(bycomp) + list(ok)), key=lambda c: -bycomp[c]):
    print('  %-20s refused %3d  emitted %3d' % (c, bycomp[c], ok[c]))
print('kinds', len(bykind))
for k, rs in sorted(bykind.items(), key=lambda kv: -len(kv[1])):
    print('%3d  %s  [%s]' % (len(rs), k, ', '.join('%s %d' % x for x in Counter(r[0] for r in rs).most_common())))
    if '--list' in sys.argv:
        for r in rs: print('       %s %s %s %s' % (r[0], r[1], r[2], r[3]))
for c, l in compfail: print('COMPONENT-FAIL', c, l[:300])
for l in lines:
    if l.startswith('rc='): print(l)
