#!/usr/bin/env python3
"""Classify the overloading errors printed by run-overload-anyway.sh.

For each error that names two declarations, read each declaration's static
parameter list (the leading [\\ ... \\] of its printed arrow) and put the pair
in one of three classes:
  same      both lists present and equal after renaming the parameters in order
  generic+plain  one declaration has static parameters, the other has none
  differ    both have static parameters, and the lists differ
The "multiple declarations" error names one parameter type only; it is counted
apart. Output: one row per (class, kind of error, name), then the totals.
Usage: classify.py <ovl-file>
"""
import re, sys, collections

def split_sparams(sig):
    sig = sig.strip()
    if not sig.startswith('[\\'):
        return None, sig
    depth, i = 0, 0
    while i < len(sig):
        if sig.startswith('[\\', i):
            depth += 1; i += 2; continue
        if sig.startswith('\\]', i):
            depth -= 1; i += 2
            if depth == 0:
                return sig[2:i-2], sig[i:]
            continue
        i += 1
    return None, sig

def top_split(s):
    out, depth, cur = [], 0, ''
    i = 0
    while i < len(s):
        if s.startswith('[\\', i): depth += 1; cur += '[\\'; i += 2; continue
        if s.startswith('\\]', i): depth -= 1; cur += '\\]'; i += 2; continue
        c = s[i]
        if c in '({': depth += 1
        if c in ')}': depth -= 1
        if c == ',' and depth == 0:
            out.append(cur.strip()); cur = ''
        else:
            cur += c
        i += 1
    if cur.strip(): out.append(cur.strip())
    return out

def normalize(sp):
    """Rename parameters in order to P0, P1, ... so alpha-equivalent lists compare equal."""
    params = top_split(sp)
    names = []
    for p in params:
        m = re.match(r'^(?:(nat|int|bool|dim|unit|opr)\s+)?([A-Za-z_][A-Za-z0-9_]*)', p)
        names.append(m.group(2) if m else p)
    text = ' ; '.join(params)
    for k, n in enumerate(names):
        text = re.sub(r'(?<![A-Za-z0-9_])' + re.escape(n) + r'(?![A-Za-z0-9_])', 'P%d' % k, text)
    return text

rows = collections.Counter()
examples = {}
for line in open(sys.argv[1]):
    if not line.startswith('@@OVL error'): continue
    body = line.split(' :: ', 1)[1]
    m = re.search(r'Invalid overloading of (\S+) in ([^:]+):\s+(.*?) @ (\S+)\s+and (.*?) @ (\S+)\s*$', body)
    kind = 'invalid'
    if not m:
        m = re.search(r'For (\S+?), the return type of (.*?) @ (\S+) should be a subtype of the\s+return type of (.*?) @ (\S+)\s*$', body)
        kind = 'return-type-rule'
        if m:
            name, s1, l1, s2, l2 = m.groups(); where = ''
    else:
        name, where, s1, l1, s2, l2 = m.groups()
    if not m:
        m = re.search(r'There are multiple declarations of (\S+) with the same parameter type', body)
        if m:
            rows[('dup', 'same-parameter-type', m.group(1))] += 1
        else:
            rows[('other', 'unparsed', body[:60])] += 1
        continue
    a, _ = split_sparams(s1); b, _ = split_sparams(s2)
    if a is None and b is None: cls = 'none'
    elif (a is None) != (b is None): cls = 'generic+plain'
    elif normalize(a) == normalize(b): cls = 'same'
    else: cls = 'differ'
    key = (cls, kind, name)
    rows[key] += 1
    examples.setdefault(key, (l1, l2))

tot = collections.Counter()
for (cls, kind, name), n in sorted(rows.items()):
    ex = examples.get((cls, kind, name), ('', ''))
    print('%-14s %-17s %-18s %4d   e.g. %s | %s' % (cls, kind, name, n, ex[0], ex[1]))
    tot[(cls, kind)] += n
print('# totals')
for k, n in sorted(tot.items()):
    print('# %-14s %-17s %4d' % (k[0], k[1], n))
print('# all %d' % sum(tot.values()))
