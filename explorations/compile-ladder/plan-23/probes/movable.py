#!/usr/bin/env python3
"""Which bindings of class A or B can move onto their helper as a bare builtinPrimitive string
now: the helper's Java signature, read through the foreign-type table (the stand-in table of
walk's world: int ZZ32, long ZZ64, double RR64, float RR32, boolean Boolean, String String,
BigInteger ZZ, void (); the special-name helpers give NN32, NN64 or Char), fits the declaration,
self first.  Usage: movable.py classified.tsv helpers-javap.txt > movable.tsv"""
import csv, re, sys
from collections import Counter, defaultdict
rows = list(csv.DictReader(open(sys.argv[1]), delimiter='\t'))
H = defaultdict(list)
for ln in open(sys.argv[2]):
    cls, sig = ln.rstrip('\n').split('\t', 1)
    m = re.match(r'public static (\S+) (\w+)\(([^)]*)\)', sig)
    if m: H[(cls, m.group(2))].append((m.group(1), [p.strip() for p in m.group(3).split(',') if p.strip()]))
J = {'int': 'ZZ32', 'long': 'ZZ64', 'double': 'RR64', 'float': 'RR32', 'boolean': 'Boolean',
     'java.lang.String': 'String', 'java.math.BigInteger': 'ZZ', 'void': '()'}
SPECIAL = {('charMakeCharacterWithSpecialCompilerHackForCharacterResultType', 'r'): 'Char',
           ('charCodePointWithSpecialCompilerHackForCharacterArgumentType', 'p'): 'Char',
           ('makeNN32FromZZ32WithSpecialCompilerHackForNN32ResultType', 'r'): 'NN32',
           ('makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType', 'p'): 'NN32',
           ('makeNN64FromZZ64WithSpecialCompilerHackForNN64ResultType', 'r'): 'NN64',
           ('makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType', 'p'): 'NN64'}
OWNER = {'ZZ32': 'ZZ32', 'Int': 'Int', 'ZZ64': 'ZZ64', 'Long': 'Long', 'NN32': 'NN32', 'NN64': 'NN64',
         'UnsignedLong': 'NN64', 'ZZ': 'ZZ', 'BigNum': 'BigNum', 'Float': 'Float', 'RR64': 'RR64', 'RR32': 'RR32',
         'FlatString': 'FlatString', 'Char': 'Char', 'Boolean': 'Boolean', 'IntLiteral': 'IntLiteral',
         'FloatLiteral': 'FloatLiteral', 'Object': 'Object', 'String': 'String'}
SUB = {('FlatString', 'String'), ('Float', 'RR64'), ('Int', 'ZZ32'), ('Long', 'ZZ64'), ('BigNum', 'ZZ')}
ALIAS = {}
def fits(a, b):            # a value of declared type a passes where type b is wanted
    a = ALIAS.get(a, a); b = ALIAS.get(b, b)
    return a == b or (a, b) in SUB
def decl(h):
    m = re.search(r'\((.*?)\)\s*:\s*(.+?)\s*$', h) if not h.startswith('getter') else None
    res = re.search(r':\s*([^:=]+?)\s*$', h).group(1).strip() if ':' in h else None
    ps = []
    if h.startswith('opr |self|') or re.match(r'opr \|\\self/\||opr \|/self\\\|', h): ps = ['self']
    elif m:
        for x in re.split(r',(?![^\[]*\\\])', m.group(1)):
            x = x.strip()
            if not x: continue
            ps.append('self' if x == 'self' else (x.split(':', 1)[1].strip() if ':' in x else '?'))
    return ps, res
out, cnt, byown = [], Counter(), Counter()
for r in rows:
    if r['class'] not in ('A', 'B') or '.' not in r['helper']:
        continue
    cls, name = r['helper'].split('.', 1)
    ps, res = decl(' '.join(r['header'].split()))
    inType = r['owner'] != '(top)'
    if inType and 'self' not in ps: ps = ['self'] + ps
    elif 'self' in ps: ps = ['self'] + [p for p in ps if p != 'self']
    ps = [OWNER.get(r['owner'], r['owner']) if p == 'self' else p for p in ps]
    why = 'no overload of its arity'
    ok = False
    for (jr, jps) in H.get((cls, name), []):
        if len(jps) != len(ps): continue
        fr = SPECIAL.get((name, 'r'), J.get(jr, jr))
        fps = [SPECIAL.get((name, 'p'), J.get(j, j)) for j in jps]
        bad = [f'{p}->{q}' for p, q in zip(ps, fps) if not fits(p, q)]
        if res and not fits(fr, res): bad.append(f'result {fr}->{res}')
        if not bad: ok = True; why = ''; break
        why = '; '.join(bad)
    k = 'movable' if ok else 'not'
    cnt[(r['class'], k)] += 1
    byown[(r['owner'], k)] += 1
    out.append([r['file'], r['line'], r['owner'], r['header'], r['glue'], r['class'], r['helper'], k, why])
print('file\tline\towner\theader\tglue\tclass\thelper\tbare\twhy')
for o in out: print('\t'.join(o))
sys.stderr.write(str(sorted(cnt.items())) + '\n')
sys.stderr.write(str(sorted(byown.items())) + '\n')
