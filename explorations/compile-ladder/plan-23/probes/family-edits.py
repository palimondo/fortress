#!/usr/bin/env python3
"""Move a family of bindings onto their helpers: each binding of movable.tsv whose owner is
named and whose bare form fits has its glue string replaced by the helper's string,
"com.sun.fortress.nativeHelpers.<Class>.<method>", by exact text from its header line on.
Stops before writing anything if one does not match.
Usage: family-edits.py <tree> <movable.tsv> <owner,...> [--except NAME,...]"""
import csv, sys, os
tree, tsv, owners = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
skip = set(sys.argv[5].split(',')) if len(sys.argv) > 5 and sys.argv[4] == '--except' else set()
FILES = {'FortressLibrary.fss': 'Library/FortressLibrary.fss', 'FortressBuiltin.fss': 'ProjectFortress/LibraryBuiltin/FortressBuiltin.fss',
         'FlatString.fss': 'Library/FlatString.fss', 'System.fss': 'Library/System.fss'}
rows = [r for r in csv.DictReader(open(tsv), delimiter='\t') if r['owner'] in owners and r['bare'] == 'movable']
texts, edits = {}, []
for r in rows:
    name = r['header'].split('(')[0].split(':')[0].strip()
    if any(name.endswith(' ' + s) or name == s for s in skip): continue
    p = FILES[r['file']]
    L = texts.setdefault(p, open(os.path.join(tree, p), encoding='utf-8').read().split('\n'))
    old = 'builtinPrimitive("com.sun.fortress.interpreter.glue.prim.%s")' % r['glue']
    new = 'builtinPrimitive("com.sun.fortress.nativeHelpers.%s")' % r['helper']
    i0 = int(r['line']) - 1
    hit = [i for i in range(i0, i0 + 3) if L[i].count(old) == 1]
    if not hit: sys.exit('no match: %s:%s %s' % (p, r['line'], old))
    L[hit[0]] = L[hit[0]].replace(old, new)
    edits.append('%s:%d\t%s\t%s' % (p, hit[0] + 1, r['header'], r['helper']))
for p, L in texts.items():
    open(os.path.join(tree, p), 'w', encoding='utf-8').write('\n'.join(L))
print('\n'.join(edits)); print('# %d bindings moved' % len(edits))
