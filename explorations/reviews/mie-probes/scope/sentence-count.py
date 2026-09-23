#!/usr/bin/env python3
"""sentence-count.py <lib-stack dir> <tracked FortressLibrary.fsi>: the pairs the sentence check
refuses in the WorldFlip runs wf-own.out / wf-lifted.out (its @@SPSENTENCE lines), how many of
them the stock rules already refuse (wf-off.out's "Invalid overloading" and return-type errors on
the same two spans), grouped by name: under own each name's declarations with their text, and
under both readings every refused pair, marked (stock) when the stock rules refuse it too."""
import re, sys, collections
L, FSI = sys.argv[1], sys.argv[2]
def span(s): return s.split('/')[-1]
def key(s): f, l = span(s).split(':')[:2]; return (f, int(l))
def stock_pairs():
    t = open(f"{L}/wf-off.out", encoding='utf-8', errors='replace').read()
    ps = set()
    for m in re.finditer(r'Invalid overloading of \S+ in [^\n]*:\n\s+.*? @ (\S+)\n and .*? @ (\S+)', t):
        ps.add(tuple(sorted((span(m.group(1)), span(m.group(2))), key=lambda s: key(s))))
    for m in re.finditer(r'the return type of .*? @ (\S+) should be a subtype of the\n\s*return type of .*? @ (\S+)', t):
        ps.add(tuple(sorted((span(m.group(1)), span(m.group(2))), key=lambda s: key(s))))
    return ps
stock = stock_pairs()
src = {}
def text(f, l):
    if f not in src:
        p = FSI if f == 'FortressLibrary.fsi' else FSI.replace('FortressLibrary.fsi', f)
        try: src[f] = open(p, encoding='utf-8').read().split('\n')
        except OSError: src[f] = []
    return src[f][l - 1].strip()[:90] if l <= len(src[f]) else '?'
print("# The sentence (overloading.tex:100-105) over the interpreter's library: WorldFlip on ZALL3,")
print("# -Dprobe.spSentence=own|lifted.  pairs = distinct declaration pairs refused; stock = of them,")
print("# pairs the stock rules already refuse (same two spans in wf-off.out).")
print("stock (-Dprobe.spSentence=off): whole-unit errors " + re.findall(r'File \S+ has (\d+) errors', open(f"{L}/wf-off.out", encoding="utf-8", errors="replace").read())[-1])
for mode in ("off", "own", "lifted"):   # errors per api: an api with 0 reached the overloading check
    t = open(f"{L}/wf-{mode}.out", encoding="utf-8", errors="replace").read()
    print(f"# checkApi errors, {mode}: " + " ".join(f"{a}={e}" for a, e in re.findall(r"checkApi (\S+) -> errors=(\d+)", t)))
for mode in ('own', 'lifted'):
    pairs = set()
    for l in open(f"{L}/wf-{mode}.out", encoding='utf-8', errors='replace'):
        m = re.match(r'@@SPSENTENCE\t(\S+)\t(\S+)\t(\S+)', l)
        if m: pairs.add((m.group(1),) + tuple(sorted((span(m.group(2)), span(m.group(3))), key=key)))
    both = {p for p in pairs if p[1:] in stock}
    total = re.findall(r'File \S+ has (\d+) errors', open(f"{L}/wf-{mode}.out", encoding='utf-8', errors='replace').read())[-1]
    print(f"\n## {mode}: {len(pairs)} pairs, {len(both)} already refused by the stock rules; whole-unit errors {total}")
    byname = collections.defaultdict(list)
    for p in pairs: byname[p[0]].append(p)
    for n, ps in sorted(byname.items(), key=lambda kv: (-len(kv[1]), kv[0])):
        lines = sorted({x for p in ps for x in p[1:]}, key=key)
        print(f"{n:16} {len(ps):3} pairs ({sum(1 for p in ps if p in both)} stock)  over {len(lines)} declarations")
        if mode == 'own':
            for x in lines: print(f"    {x.split(':')[0]}:{x.split(':')[1]:5}  {text(*key(x))}")
        for p in sorted(ps, key=lambda p: (key(p[1]), key(p[2]))):   # every refused pair
            print(f"      pair {p[1].split(':')[0]}:{p[1].split(':')[1]} x {p[2].split(':')[0]}:{p[2].split(':')[1]}" + ("  (stock)" if p in both else ""))
