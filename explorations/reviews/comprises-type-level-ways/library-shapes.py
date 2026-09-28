#!/usr/bin/env python3
# library-shapes.py [Library-dir] : a crude scan, by the simple text of names, of the one library's apis
# (every Library/*.fsi but the compiler library's Compiler*.fsi, comments removed): the traits with a
# comprises clause, any type listed in two clauses (the intersection example's shape, a V under S and T),
# and every trait or object that extends a closed trait without being listed in its clause.
# A declaration header is the declaration line and its indented extends/excludes/comprises/where lines.
import re, glob, collections, sys, os
d = sys.argv[1] if len(sys.argv) > 1 else 'Library'
comp, ext = {}, {}
for f in sorted(glob.glob(os.path.join(d, '*.fsi'))):
    b = os.path.basename(f)
    if b.startswith('Compiler'):
        continue
    s = re.sub(r'\(\*.*?\*\)', '', open(f).read(), flags=re.S)
    for m in re.finditer(r'^[ \t]*(?:value\s+)?(trait|object)\s+(\w+)(?:\[\\.*?\\\])?(.*?)$((?:\n[ \t]+(?:extends|excludes|comprises|where).*)*)', s, re.M):
        name, head = m.group(2), m.group(3) + m.group(4)
        def names(x):
            if not x:
                return []
            t = re.sub(r'\[\\.*?\\\]', '', x.group(1).strip('{} '))
            return [w.strip() for w in t.split(',') if w.strip()]
        c = re.search(r'comprises\s*(\{[^}]*\}|\w+(?:\[\\[^\]]*\\\])?)', head)
        e = re.search(r'extends\s*(\{[^}]*\}|\w+(?:\[\\[^\]]*\\\])?)', head)
        if c:
            comp[name] = names(c)
        ext[(name, b)] = names(e)
listed = collections.defaultdict(list)
for n, cs in comp.items():
    for c in cs:
        listed[c].append(n)
print("closed traits (%d):" % len(comp), ", ".join(sorted(comp)))
print("types listed in two or more clauses, the ellipsis aside:", {k: v for k, v in listed.items() if len(v) > 1 and k != '...'} or "none")
print("extenders of a closed trait not listed in its clause (clauses with an ellipsis aside):")
for (n, b), es in sorted(ext.items()):
    for e in es:
        if e in comp and n not in comp[e] and '...' not in comp[e]:
            print("  %s: %s extends %s; its own clause: %s" % (b, n, e, comp.get(n)))
