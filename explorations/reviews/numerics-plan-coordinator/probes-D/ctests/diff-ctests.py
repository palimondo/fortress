#!/usr/bin/env python3
"""diff-ctests.py <typecheck-stock.txt> <typecheck-fix.txt> : per compiler test, the type checker's
diagnostics under the stock checker and the shadow, compared.

Each file's block is what Shell printed between TestsD's "=== <file>" and "### rc=<rc> <file> ms=<ms>"
markers; the timing is dropped, absolute paths are cut to the file name. Prints the counts (files,
files with diagnostics, files whose rc or diagnostics differ) and every differing block as a diff."""
import difflib, re, sys

def blocks(path):
    out, cur, name = {}, [], None
    for raw in open(path, encoding="utf-8", errors="replace"):
        l = raw.rstrip("\n")
        m = re.match(r"^=== (\S+)$", l)
        if m: name, cur = m.group(1), []; continue
        m = re.match(r"^### rc=(-?\d+) (\S+) ms=\d+$", l)
        if m and name == m.group(2):
            out[name] = (m.group(1), cur); name = None; continue
        if name is not None:
            if l.startswith("@@"): continue
            l = re.sub(r"(/[^\s:]+/)([^/\s:]+\.fs[si])", r"\2", l)
            cur.append(l)
    return out

a, b = blocks(sys.argv[1]), blocks(sys.argv[2])
names = sorted(set(a) | set(b))
diff = [n for n in names if a.get(n) != b.get(n)]
witherr = [n for n in names if a.get(n) and a[n][0] != "0"]
print(f"# files: stock {len(a)}, shadow {len(b)}; stock rc != 0: {len(witherr)}; "
      f"shadow rc != 0: {sum(1 for n in b if b[n][0] != '0')}; blocks that differ: {len(diff)}")
def errcount(blk):
    if not blk: return "missing"
    m = [re.search(r"has (\d+) errors?\.", l) for l in blk[1]]
    m = [x for x in m if x]
    return m[-1].group(1) if m else "0"
tot_a = sum(int(errcount(a[n])) for n in a if errcount(a[n]).isdigit())
tot_b = sum(int(errcount(b[n])) for n in b if errcount(b[n]).isdigit())
print(f"# errors reported in all: stock {tot_a}, shadow {tot_b}")
for n in diff:
    print(f"\n## {n}: stock rc={a.get(n, ('missing',))[0]} errors={errcount(a.get(n))}; "
          f"shadow rc={b.get(n, ('missing',))[0]} errors={errcount(b.get(n))}")
    for l in difflib.unified_diff(a.get(n, ("", []))[1], b.get(n, ("", []))[1], "stock", "shadow", lineterm="", n=1):
        print(l[:300])
