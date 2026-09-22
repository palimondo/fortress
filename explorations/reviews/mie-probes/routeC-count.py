#!/usr/bin/env python3
"""routeC-count.py <lib-stack dir> <tracked FortressLibrary.fsi>: summarise the three
WorldFlip runs of dispatch-run.sh section 4 (wf-off.out, wf-all.out, wf-ret.out): the
whole-unit and per-api error counts, the return type rule errors, and every distinct pair
the route C sketch refused (its @@ROUTEC lines), grouped by the generic declaration and by
the trait that declares the specialised one.  The library copy (make-lib.py's ZALL3) has
the tracked file's line numbers up to line 600, where every refused pair lies."""
import re, sys, collections
L, FSI = sys.argv[1], sys.argv[2]
src = open(FSI, encoding="utf-8").read().split("\n")
def text(line): return src[line - 1].strip()
def owner(line):
    for i in range(line - 1, -1, -1):
        m = re.match(r'(?:value )?(?:trait|object) (\w+)', src[i])
        if m: return m.group(1)
def span(s): return s.split('/')[-1]
def line(s): return int(span(s).split(':')[1])
def rtr(t): return set(re.findall(r'the return type of .*? @ (\S+) should be a subtype of the\n\s*return type of .*? @ (\S+)', t))
runs = {}
for mode in ("off", "all", "ret"):
    t = open(f"{L}/wf-{mode}.out", encoding="utf-8", errors="replace").read()
    pairs = set()
    for l in t.splitlines():
        m = re.match(r'@@ROUTEC (\S+) .*?  BESIDE  (\S+) ', l)
        if m: pairs.add((span(m.group(1)), span(m.group(2))))
    runs[mode] = dict(total=re.findall(r'File \S+ has (\d+) errors?', t)[-1],
                      apis=re.findall(r'checkApi (\S+) -> errors=(\d+)', t),
                      rtr={(span(a), span(b)) for a, b in rtr(t)}, pairs=pairs,
                      secs=re.findall(r'ELAPSED (\d+) s', t)[-1])
off_rtr = runs["off"]["rtr"]
print("# Route C's overload half over the interpreter's library: WorldFlip on make-lib.py's ZALL3 copy with")
print("# -Dprobe.zero.dropP=true -Dprobe.zero.eligibleNarrow=true (the zero probe's stack) and -Dprobe.routeC=<mode>.")
print("# mode  whole-unit errors  FortressLibrary api  return-type-rule errors  refused pairs (of them already refused by the stock rule)  secs")
for mode, r in runs.items():
    api = dict(r["apis"]).get("FortressLibrary")
    print(f"  {mode:4}  {r['total']:>17}  {api:>19}  {len(r['rtr']):>23}  {len(r['pairs']):>13} ({len(r['pairs'] & off_rtr)})  {r['secs']}")
for mode in ("ret", "all"):
    pairs = sorted(runs[mode]["pairs"], key=lambda p: (line(p[1]), line(p[0])))
    print(f"\n## -Dprobe.routeC={mode}: {len(pairs)} refused pairs, all declared in FortressLibrary.fsi")
    print("# by the generic declaration: its line, its text, the number of specialisations refused beside it")
    for g, n in sorted(collections.Counter(line(p[1]) for p in pairs).items()):
        print(f"  .fsi:{g:<5} {owner(g):22} {text(g):40} {n}")
    print("# by the trait or object that declares the specialisation: " +
          ", ".join(f"{o} {n}" for o, n in collections.Counter(owner(line(p[0])) for p in pairs).most_common()))
    if mode == "ret": continue
    print("# every pair: specialised declaration  <-  generic declaration   (ret = refused under ret too;")
    print("# * = already a stock return type rule error)")
    for s, g in pairs:
        r = "ret" if (s, g) in runs["ret"]["pairs"] else ""
        print(f"  {span(s).split(':',1)[1]:12} {text(line(s)):42} <- {span(g).split(':',1)[1]:12} {text(line(g)):40} {r}{' *' if (s, g) in off_rtr else ''}")
