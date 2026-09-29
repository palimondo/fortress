#!/usr/bin/env python3
"""Match every native binding of the one library (bindings.tsv) against the compiler
prelude's native-backed declarations (cprelude.tsv) by owner, name and arity, the owner
mapped between the two worlds' spellings.  Writes matched.tsv; prints the counts.
Run from this directory after extract.py."""
import csv, re
from collections import Counter, defaultdict

OWNER = {  # one library's owner -> the compiler prelude's owner
    'ZZ32': 'ZZ32', 'Int': 'ZZ32', 'ZZ64': 'ZZ64', 'Long': 'ZZ64',
    'NN64': 'NN64', 'UnsignedLong': 'NN64', 'NN32': 'NN32', 'ZZ': 'ZZ', 'BigNum': 'ZZ',
    'Float': 'RR64', 'RR32': 'RR32', 'FloatLiteral': 'FloatLiteral', 'IntLiteral': 'IntLiteral',
    'Char': 'Character', 'FlatString': 'JavaString', 'Object': 'Object', '(top)': '(top)',
    'Boolean': 'Boolean',
}
TYPE = {'Char': 'Character', 'FlatString': 'JavaString', 'String': 'JavaString', 'Float': 'RR64',
        'Int': 'ZZ32', 'Long': 'ZZ64', 'UnsignedLong': 'NN64', 'BigNum': 'ZZ', 'Maybe': 'Option'}

def params(h):
    """parameter list text of a header, '' for a getter."""
    m = re.search(r'\((.*?)\)\s*(?::|$|throws)', h)
    if h.startswith('getter') or not m: return ''
    return m.group(1)

def arity(h):
    p = params(h).strip()
    if h.startswith('opr |self|'): return 1
    if not p: return 0
    return len([x for x in re.split(r',(?![^\[]*\\\])', p) if x.strip()])

def result(h):
    m = re.search(r'(?:\)|\|self\||getter [^:]*\(\s*\))\s*:\s*([^=]+?)\s*(?:throws.*)?$', h)
    t = m.group(1).strip() if m else '?'
    return TYPE.get(t, t)

def ptypes(h):
    out = []
    for x in re.split(r',(?![^\[]*\\\])', params(h)):
        x = x.strip()
        if not x: continue
        t = x.split(':', 1)[1].strip() if ':' in x else x
        out.append(TYPE.get(t, t))
    return tuple(out)

def main():
  lib = list(csv.DictReader(open('bindings.tsv'), delimiter='\t'))
  cpre = list(csv.DictReader(open('cprelude.tsv'), delimiter='\t'))
  idx = defaultdict(list)
  for c in cpre:
      idx[(c['owner'], c['name'], arity(c['header']))].append(c)
      idx[(c['owner'], c['name'], None)].append(c)

  rows, cnt = [], Counter()
  for b in lib:
      o = OWNER.get(b['owner'])
      a = arity(b['header'])
      hit = idx.get((o, b['name'], a)) if o else None
      how = ''
      if hit:
          same = [c for c in hit if ptypes(c['header']) == ptypes(b['header'])
                and result(c['header']) in (result(b['header']), '?')]
          how = 'same-signature' if same else 'same-name-arity'
          c = (same or hit)[0]
      else:
          near = idx.get((o, b['name'], None)) if o else None
          if near: how, c = 'same-name-other-arity', near[0]
          else: c = None
      cnt[(b['file'].split('/')[-1], how or 'none')] += 1
      rows.append([b['file'].split('/')[-1], b['line'], b['owner'], b['name'], str(a), b['header'],
                   b['glue'].replace('com.sun.fortress.interpreter.glue.prim.', ''), how or 'none',
                   (c['header'] + ' -> ' + c['javamethods'].replace('com.sun.fortress.nativeHelpers.', '')) if c else ''])
  with open('matched.tsv', 'w') as fh:
      fh.write('file\tline\towner\tname\tarity\theader\tglue\tmatch\tcompiled\n')
      for r in rows: fh.write('\t'.join(r) + '\n')
  tot = Counter()
  for (f, how), n in sorted(cnt.items()):
      print(f'{n:4d}  {f:24s} {how}'); tot[how] += n
  print(tot, sum(tot.values()))

if __name__ == '__main__':
  main()
