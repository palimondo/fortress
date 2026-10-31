#!/usr/bin/env python3
"""Climb batch 24's planner: the 83 bindings of movable.tsv that can name their helper as a bare string and still
name a glue class (`now` glue), sorted into the batch's families, and, with --apply, moved onto their helpers by
exact text, as plan-23/probes/family-edits.py does.
  F  the floating-point family: value object Float's 30.
  Z  the 64-bit and big integers: trait ZZ64's 21 less CHOOSE, and trait ZZ's 16.
  S  the small rest: Long's 2, BigNum's 2, the top-level char, and the singletons that fit, NN32's and NN64's
     signed and Char's codePoint.
  K  ZZ32's and ZZ64's CHOOSE, which rung K moves with its helpers' fix (rows 521 and 855).
  out  the two top-level bindings declared over String (row 846; the record's
     question 1), and FlatString's 5 (outside the curator's scope for this batch).
  H  the hard set's way 2b (plan-24/probes/hard-set.md): of the bindings that do not fit as a bare string (`bare` not),
     the 82 over Char, NN32 and NN64 (UnsignedLong's among them), less NN32's asFloat (climb batch 23's fork 12) and
     NN32's CHOOSE (it reaches simpleLongArith.longOverflowingChoose, which rung K fixes), 80, and less the four whose
     helper moves a value under walk (the planner's run): UnsignedLong's asString and asExprString (row 326), NN64's
     prefix DOTMINUS (row 860) and Char's asExprString (row 861); 76. With --apply, H also needs the rewrite of
     rung-H.patch (hard-set-way2b-rewrite.patch's) before the checker reads them.
Usage: families.py <movable.tsv>                         prints the table, one line a binding
       families.py <movable.tsv> --apply <tree> F,Z,S   moves those families in <tree> (`out` names the nine left
                                                         out); stops before writing if one string does not match"""
import csv, sys, os
FILES = {'FortressLibrary.fss': 'Library/FortressLibrary.fss', 'FortressBuiltin.fss': 'ProjectFortress/LibraryBuiltin/FortressBuiltin.fss',
         'FlatString.fss': 'Library/FlatString.fss', 'System.fss': 'Library/System.fss'}
OVER_STRING = {'printlnWithThread', 'getProperty'}

HARD = ('Char', 'NN32', 'NN64', 'UnsignedLong')

def family(r):
    o, name = r['owner'], r['header'].split('(')[0].split(':')[0].strip()
    if r['bare'] == 'not':
        if 'CHOOSE' in r['header']: return 'out:CHOOSE over NN32, after rungs H and K'
        if name.endswith('asFloat'): return 'out:asFloat, fork 12'
        if o == 'UnsignedLong': return 'out:its helper prints signed, row 326'
        if o == 'NN64' and r['header'].replace(' ', '').startswith('oprDOTMINUS(self):'): return 'out:its helper answers its operand, row 860'
        if o == 'Char' and 'asExprString' in r['header']: return 'out:its helper writes another form, row 861'
        return 'H'
    if 'CHOOSE' in r['header']: return 'K'
    if o == 'Float': return 'F'
    if o in ('ZZ64', 'ZZ'): return 'Z'
    if o in ('Long', 'BigNum', 'NN32', 'NN64', 'Char'): return 'S'
    if o == '(top)':
        return 'out:over String, row 846' if name in OVER_STRING else 'S'
    if o == 'FlatString': return 'out:FlatString, outside the scope'
    return 'out:?'

rows = [r for r in csv.DictReader(open(sys.argv[1]), delimiter='\t')
        if r['now'] == 'glue' and (r['bare'] == 'movable' or r['owner'] in HARD)]
for r in rows: r['fam'] = family(r)
if '--apply' not in sys.argv:
    print('family\tfile:line\towner\theader\tclass\tglue\thelper')
    order = {'F': 0, 'Z': 1, 'S': 2, 'K': 3, 'H': 4}
    for r in sorted(rows, key=lambda r: (order.get(r['fam'], 9), r['fam'], r['file'], int(r['line']))):
        print('\t'.join([r['fam'], r['file'] + ':' + r['line'], r['owner'], r['header'], r['class'], r['glue'], r['helper']]))
    from collections import Counter
    sys.stderr.write(str(sorted(Counter(r['fam'] for r in rows).items())) + ' total %d\n' % len(rows))
    sys.exit(0)
tree = sys.argv[sys.argv.index('--apply') + 1]
fams = sys.argv[sys.argv.index('--apply') + 2].split(',')
texts, edits = {}, []
for r in rows:
    if r['fam'] not in fams and not ('out' in fams and r['fam'].startswith('out')): continue
    p = FILES[r['file']]
    L = texts.setdefault(p, open(os.path.join(tree, p), encoding='utf-8').read().split('\n'))
    old = 'builtinPrimitive("com.sun.fortress.interpreter.glue.prim.%s")' % r['glue']
    new = 'builtinPrimitive("com.sun.fortress.nativeHelpers.%s")' % r['helper']
    i0 = int(r['line']) - 1
    hit = [i for i in range(i0, i0 + 3) if L[i].count(old) == 1]
    if not hit: sys.exit('no match: %s:%s %s' % (p, r['line'], old))
    L[hit[0]] = L[hit[0]].replace(old, new)
    edits.append('%s:%d\t%s\t%s\t%s' % (p, hit[0] + 1, r['fam'], r['header'], r['helper']))
for p, L in texts.items():
    open(os.path.join(tree, p), 'w', encoding='utf-8').write('\n'.join(L))
print('\n'.join(edits)); print('# %d bindings moved' % len(edits))
