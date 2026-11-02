#!/usr/bin/env python3
"""Climb batch 25's planner: N3's 158, the bindings of class C (F-32) that need a new helper, one line a binding, sorted
into the batch's rungs or left out with the home of what each waits on, each with the helper the rung would write,
its Java signature, the types the compiled checker reads it at in walk's world (NamingCzar's one-library table:
int ZZ32, long ZZ64, float RR32, double RR64, BigInteger ZZ, boolean Boolean, String String; an NN32, NN64 or Char
position through the six transfers of F-308; UnsignedLong's self through the NN64 transfer once rung U adds it),
whether microGPT's lines reach it, and the glue class's computation, the helper's source (natives-shape.md,
section 2, "What the classes hide": the glue class's body is its source).
  R  REM and MOD on ZZ32, ZZ64, NN32, NN64 and ZZ (rows 336, 848).
  N  the integer divisors: GCD and LCM on the five, CHOOSE on NN64 and ZZ, partitionL on the four fixed widths,
     ZZ's cmp, and the top-level nanoTime at ZZ64.
  A  the asFloats of Long and BigNum (with the B asFloats of Int, RR32 and NN32, which are not in class C);
  U  UnsignedLong's asFloat, beside its two string getters (class A).
  D  Float's 27 and the top-level fromRawBits.
  P  RR32's 49, in a new helper class simpleFloatArith.
  out:<what it waits on>  the others.
Usage: n3.py <classified.tsv> <glue source dir>     prints the table, tab-separated, and a count per rung"""
import csv, re, sys, os
from collections import Counter
rows = [r for r in csv.DictReader(open(sys.argv[1]), delimiter='\t') if r['class'] == 'C']
GLUE = sys.argv[2]
CARRY = {'ZZ32': 'int', 'Int': 'int', 'NN32': 'int', 'ZZ64': 'long', 'Long': 'long', 'NN64': 'long', 'UnsignedLong': 'long',
         'ZZ': 'BigInteger', 'BigNum': 'BigInteger', 'Float': 'double', 'RR64': 'double', 'RR32': 'float', 'Boolean': 'boolean',
         'String': 'String', 'FlatString': 'String', 'Char': 'int'}
READ = {'int': 'ZZ32', 'long': 'ZZ64', 'float': 'RR32', 'double': 'RR64', 'BigInteger': 'ZZ', 'boolean': 'Boolean', 'String': 'String'}
TRANSFER = {'NN32', 'NN64', 'Char', 'UnsignedLong'}
PREFIX = {'ZZ32': ('simpleIntArith', 'int'), 'ZZ64': ('simpleLongArith', 'long'), 'NN32': ('simpleUnsignedIntArith', 'unsignedInt'),
          'NN64': ('simpleUnsignedLongArith', 'unsignedLong'), 'ZZ': ('simpleArbitraryPrecisionArith', ''),
          'Float': ('simpleDoubleArith', 'double'), 'RR32': ('simpleFloatArith', 'float')}

def name_of(r):
    h = r['header'].replace('private ', '').replace('getter ', '').replace('opr ', '').strip()
    return re.split(r'[\s(:\[]', h)[0] if not h.startswith('|') else h.split(':')[0].strip()

def glue_body(glue):
    cls, _, inner = glue.partition('$')
    p = os.path.join(GLUE, cls + '.java')
    if not os.path.exists(p): return ''
    s = open(p).read()
    m = re.search(r'class ' + re.escape(inner) + r'\b[^{]*\{(.*?)\n    \}', s, flags=re.S)
    if not m: return ''
    body = ' '.join(m.group(1).split())
    m2 = re.search(r'\{ (.*) \}$', body)
    return (m2.group(1) if m2 else body)[:160]

def params(r):
    h = r['header']
    inside = h[h.index('(') + 1:h.rindex(')')] if '(' in h else ''
    out = []
    for p in [x.strip() for x in inside.split(',') if x.strip()]:
        out.append('self' if p == 'self' else p.split(':')[1].strip())
    return out

def result(r):
    return r['header'].rsplit(':', 1)[1].strip() if ':' in r['header'].split(')')[-1] else '()'

def sig(r, owner_type):
    ps = params(r)
    has_self = 'self' in ps or not r['header'].lstrip().startswith(('opr', 'getter')) and r['owner'] != '(top)' and 'self' not in ps
    jt = []
    if r['owner'] != '(top)':
        jt.append(('self', CARRY.get(r['owner'], '?')))
    for p in ps:
        if p != 'self': jt.append((p, CARRY.get(p, '?')))
    res = result(r)
    jres = 'void' if res == '()' else CARRY.get(res, '?')
    java = '%s(%s)' % (jres, ', '.join(t for _, t in jt))
    readas = []
    for decl, t in jt:
        d = r['owner'] if decl == 'self' else decl
        readas.append(d + ' via its transfer' if d in TRANSFER else READ.get(t, '?'))
    rres = res if res in TRANSFER else READ.get(jres, res)
    return java, '(%s)->%s' % (', '.join(readas), rres)

def family(r):
    o, n, h = r['owner'], name_of(r), r['header']
    if 'AnyIntegral' in h or ': Number' in h or 'a:Number' in h: return 'out:item 331, a parameter over AnyIntegral or Number'
    if o == 'IntLiteral': return 'out:N5, the IntLiteral helpers (P-76; row 578)'
    if o == 'FloatLiteral': return 'out:a carrier of self for FloatLiteral, which walk lacks (F-299)'
    if o == 'FlatString': return 'out:item 340, walk carries no self of FlatString'
    if o == '(top)' and n in ('printThreadInfo', 'printWithThread', 'getEnvironment'): return 'out:item 310, declared over String (row 846)'
    if o == '(top)' and n == 'match': return 'out:the string family, declared over FlatString, which the checker reads String'
    if o == '(top)' and n == 'natLineSeparator': return 'out:the string family; it fits, a String result'
    if o == 'ZZ' and n in ('narrow', 'widen'): return 'out:the integer conversions ask (row 502; item 338)'
    if n in ('REM', 'MOD'): return 'R'
    if n in ('GCD', 'LCM', 'CHOOSE', 'partitionL', 'cmp') or n == 'nanoTime': return 'N'
    if n == 'asFloat': return 'U' if o == 'UnsignedLong' else 'A'
    if o == 'Float' or n == 'fromRawBits': return 'D'
    if o == 'RR32': return 'P'
    return 'out:unsorted'

MICROGPT = {('ZZ32', 'MOD'): 'yes, ZZ32 MOD at the keys and the blocked arrays (MicroGptFlat.fss:93, FlatArrays.fss:86-101, MicroGptApl.fss:122, AplMg.fss:14)',
            ('(top)', 'nanoTime'): 'yes, the step times (MicroGptFlat.fss:92, MicroGptApl.fss:121, both quick checks)'}
print('\t'.join(['file', 'line', 'owner', 'name', 'header', 'glue', 'rung', 'java', 'read as', 'microGPT', 'glue computation']))
cnt = Counter()
for r in rows:
    f = family(r); cnt[f] += 1
    java, readas = sig(r, r['owner'])
    mg = MICROGPT.get((r['owner'], name_of(r)), 'no')
    print('\t'.join([r['file'], r['line'], r['owner'], name_of(r), ' '.join(r['header'].split()), r['glue'], f, java, readas, mg, glue_body(r['glue'])]))
sys.stderr.write('\n'.join('%4d %s' % (n, f) for f, n in sorted(cnt.items(), key=lambda kv: (-kv[1], kv[0]))) + '\n%4d in all\n' % len(rows))
