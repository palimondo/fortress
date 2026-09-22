#!/usr/bin/env python3
"""routeC-textcount.py <FortressLibrary.fsi>: count, from the text, the overload pairs route C's
overload half refuses.  A pair is a functional method (a declaration with a `self` parameter)
of one of the seven exempted traits, generic in the trait's parameter, and a declaration of
the same name with the same number of parameters, itself not generic, in a trait or object
that is not generic and extends the exempted trait (directly or through other traits of this
file).  The `ret` column keeps only the pairs where the generic declaration's return type
mentions the parameter.  Symbolic names (+ - = < ...) are counted apart: the compiled
overloading checker skips them (OverloadingChecker.scala:546-550, NodeUtil.java:1460-1477)."""
import re, sys, collections
EXEMPT = ["Equality", "StandardPartialOrder", "StandardMin", "StandardMax",
          "StandardMinMax", "StandardTotalOrder", "Integral"]
lines = open(sys.argv[1], encoding="utf-8").read().split("\n")
# strip comments (nested (* *)), keeping line numbers
text = "\n".join(lines); out = []; depth = 0; i = 0
while i < len(text):
    if text.startswith("(*", i): depth += 1; i += 2; continue
    if text.startswith("*)", i) and depth: depth -= 1; i += 2; continue
    out.append(text[i] if depth == 0 or text[i] == "\n" else " "); i += 1
lines = "".join(out).split("\n")
decls = {}                     # name -> dict(line, params(list), extends(list of (name, args)), methods)
cur = None
for n, l in enumerate(lines, 1):
    m = re.match(r'(?:value )?(?:trait|object) (\w+)(\[\\.*?\\\])?', l)
    if m:
        cur = dict(line=n, generic=bool(m.group(2)) and m.group(2) != "[\\\\]", ext=[], methods=[], hdr=True)
        decls[m.group(1)] = cur; hdrtext = l
    elif cur and cur["hdr"] and (re.match(r'\s+(extends|comprises|excludes)\b', l)
                                 or hdrtext.count("{") > hdrtext.count("}")):
        hdrtext += " " + l
    elif cur and cur["hdr"]:
        cur["hdr"] = False
        e = re.search(r'extends\s*(\{[^}]*\}|[\w\\\[\], ]+?)(?=\s+(comprises|excludes|$))', hdrtext + " ")
        if e:
            for t in re.finditer(r'(\w+)(\[\\(.*?)\\\])?', e.group(1).strip("{} ")):
                cur["ext"].append((t.group(1), t.group(3) or ""))
    if cur and re.match(r'end\b', l): cur = None; continue
    if cur and not cur["hdr"]:
        m = re.match(r'\s+(?:abstract )?(?:opr\s+)?(\S+?)\s*(\[\\[^]]*\\\])?\s*\((self[^)]*)\)\s*:\s*(.*)$', l)
        if m and "self" in m.group(3):
            cur["methods"].append(dict(name=m.group(1), generic=bool(m.group(2)),
                                       arity=len(m.group(3).split(",")), ret=m.group(4).strip(), line=n))
def closure(d, seen=None):
    seen = seen or set()
    for s, _ in decls.get(d, {}).get("ext", []):
        if s not in seen: seen.add(s); closure(s, seen)
    return seen
pairs = []
for e in EXEMPT:
    param = "I" if e == "Integral" else "T"
    for g in decls[e]["methods"]:
        for dname, d in decls.items():
            if dname in EXEMPT or d["generic"] or e not in closure(dname): continue
            for f in d["methods"]:
                if f["name"] == g["name"] and f["arity"] == g["arity"] and not f["generic"]:
                    ret = re.search(r'\b%s\b' % param, g["ret"]) is not None
                    sym = not re.match(r'[A-Za-z_]', g["name"])
                    pairs.append((f["line"], dname, f["name"], g["line"], e, ret, sym))
def show(sel, title):
    ps = [p for p in pairs if sel(p)]
    print(f"{title}: {len(ps)} pairs (ret: {sum(p[5] for p in ps)})")
    print("   by exempted trait: " + ", ".join(f"{k} {v}" for k, v in collections.Counter(p[4] for p in ps).most_common()))
    print("   by declaring trait: " + ", ".join(f"{k} {v}" for k, v in collections.Counter(p[1] for p in ps).most_common()))
    return ps
print("# routeC-textcount.py over " + sys.argv[1])
alpha = show(lambda p: not p[6], "names the checker examines (alphabetic and juxtaposition)")
sym = show(lambda p: p[6], "symbolic names the checker skips")
print("# every pair: specialised .fsi line, trait, name  <-  generic .fsi line, exempted trait  [ret]")
for p in sorted(pairs, key=lambda p: (p[6], p[3], p[0])):
    print(f"  {p[0]:5} {p[1]:16} {p[2]:14} <- {p[3]:5} {p[4]:22} {'ret' if p[5] else ''}{'  (symbolic)' if p[6] else ''}")
