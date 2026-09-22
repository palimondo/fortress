#!/usr/bin/env python3
"""classify.py <errs.py list> [<@@TRI diag run.out>] : the triage class of every error.
Prints one compact line per error -- class | kind | name | where | first decl | second decl --
then the tally.  Classes (triage.md):
  a   also certified by the strong checkP alone (flag, from the diag run; never the only class)
  b   the static-parameter sentence (Specification/basic/overloading.tex:100-105)
  c   the Meet Rule: no declaration on the meet, or no exclusion that would make one unnecessary
  d   a real library defect (api return or parameter type)
  e1  a type-variable parameter against an arrow parameter (fill, array1, array2)
  e2  variable capture when an inherited generic method is instantiated (generate)"""
import re, sys, collections
FF = {1297, 1316, 1336, 1368}          # the function-taking fill declarations, FortressLibrary.fsi
def sparams(sig):
    if not sig.startswith("[\\"): return None
    i, depth, body = 2, 1, ""
    while depth:
        if sig.startswith("[\\", i): depth += 1; body += "[\\"; i += 2; continue
        if sig.startswith("\\]", i):
            depth -= 1
            if depth: body += "\\]"
            i += 2; continue
        body += sig[i]; i += 1
    ps, depth, cur = [], 0, ""
    for ch in body:
        if ch == "," and depth == 0: ps.append(cur.strip()); cur = ""; continue
        depth += ch == "["; depth -= ch == "]"; cur += ch
    ps.append(cur.strip())
    names = [p.split(" extends ")[0].replace("nat ", "").strip() for p in ps]
    out = []
    for i, p in enumerate(ps):
        b = p.split(" extends ")[1] if " extends " in p else ""
        for j, n in enumerate(names): b = re.sub(r"\b%s\b" % re.escape(n), "#%d" % j, b)
        out.append(("nat" if p.startswith("nat ") else "type", b))
    return out
def btest(a, b):
    sa, sb = sparams(a), sparams(b)
    if (sa is None) != (sb is None): return "b1"
    if sa is not None and sa != sb: return "b2"
    return ""
def loc(sig):
    m = re.search(r"@ (?:\S*/)?(\w+\.fsi):(\d+):", sig)
    return f"{m.group(1).replace('FortressLibrary','FL').replace('RangeInternals','RI')}:{m.group(2)}" if m else "?"
strong = set()
if len(sys.argv) > 2:
    for l in open(sys.argv[2], encoding="utf-8", errors="replace"):
        if l.startswith("@@TRI") and "exclStrong=true" in l:
            f = l.split(" | "); strong.add((f[0][6:], frozenset((loc(f[3]), loc(f[4])))))
rows, tally = [], collections.Counter()
for l in open(sys.argv[1], encoding="utf-8"):
    f = [x.strip() for x in l.rstrip("\n").split(" | ")]
    kind, name = f[0], f[1]
    if kind not in ("OVL", "RET"):
        rows.append(f"other | {l.strip()}"); tally["other"] += 1; continue
    a, b = f[3], f[4]
    bt = btest(a, b)
    lines = [int(x) for x in re.findall(r"FortressLibrary\.fsi:(\d+):", a + " " + b)]
    if kind == "OVL":
        if name == "fill":
            c = "e1" if len({n in FF for n in lines}) == 2 else "c"
        elif name in ("copy", "FORWARD_CMP", "IN", "map", "ivmap", "SQCAP"): c = "c"
        elif name in ("CAP", "MIN", "MAX", "openRangeHelper", "CMP", "MINMAX"): c = "b"
        elif name in ("seq", "juxtaposition"): c = "b" if bt else "c"
        elif name in ("lift", "isLeftZero"): c = "d"
        elif name == "generate": c = "e2"
        else: c = "?"
    else:
        c = "e1" if name in ("array1", "array2") else "d"
    if c == "b": assert bt, (name, a, b)          # the manual class agrees with the mechanical test
    fl = " +a" if (name, frozenset((loc(a), loc(b)))) in strong else ""
    rows.append(f"{c}{fl} | {bt or '-'} | {kind} | {name} | {f[2]} | {loc(a)} | {loc(b)}")
    tally[c] += 1
    if fl: tally["(+a)"] += 1
    if bt: tally["(sentence applies: %s)" % bt] += 1
for r in rows: print(r)
print("# tally:", dict(sorted(tally.items())), "total", len(rows))
