#!/usr/bin/env python3
"""cc-diff.py <before-run.txt> <after-run.txt>: the checker-count stage's errors before and after, one by one.
Each run.txt is the checker-count tool's raw output (explorations/coordinator/tools/checker-count/run.sh keeps
it in its scratch directory as run.txt).  An error is its location lines plus its message; the tree's path is
dropped and every line:column is removed, since the edit shifts the api's lines (the method of
explorations/reviews/mie-probes/keep/count-diff.py).  Prints the errors that go and that appear, by kind."""
import collections, re, sys

LOC = r"^/\S+:\d+:"

def errors(path):
    out, cur = [], []
    for l in open(path, encoding="utf-8", errors="replace"):
        l = l.rstrip("\n")
        if l.startswith(("@@PROBE", "###")) or re.match(r"\s+at ", l):
            continue
        if l.startswith("File ") and " has " in l:
            break
        if re.match(LOC, l) and cur and not re.match(LOC, cur[-1]):
            out.append(cur); cur = []
        cur.append(l)
    if cur:
        out.append(cur)
    return ["\n".join(e) for e in out if re.match(LOC, e[0])]

def norm(e):
    e = re.sub(r"/home/user/[^/]+/", "", e)
    return re.sub(r"(\.fs[is]):\d+[:.]\d+(-\d+)?(:\d+)?:?", r"\1", e)

def kind(e):
    msg = " ".join(x.strip() for x in e.split("\n") if not re.match(r"^\S+\.fs[is]$", x.strip()))
    if "exclude each other" in msg: return "hierarchy: exclude each other"
    if "excludes" in msg and "but it extends" in msg: return "hierarchy: excludes but extends"
    if "Invalid comprises" in msg: return "comprises"
    if "Invalid overloading" in msg or "multiple declarations" in msg: return "overloading"
    if "return type" in msg: return "return type"
    return "other"

a = collections.Counter(norm(e) for e in errors(sys.argv[1]))
b = collections.Counter(norm(e) for e in errors(sys.argv[2]))
gone, new = a - b, b - a
print("# errors before %d, after %d (distinct after normalising: %d, %d)" % (sum(a.values()), sum(b.values()), len(a), len(b)))
for title, c in (("GONE", gone), ("APPEAR", new)):
    by = collections.Counter()
    for e, n in c.items(): by[(kind(e), e.split("\n")[0].split(".fs")[0].split("/")[-1])] += n
    print("## %s %d" % (title, sum(c.values())))
    for (k, f), n in sorted(by.items()): print("   %4d  %-35s %s" % (n, k, f))
print("## APPEAR, each")
for e in sorted(new):
    print("---\n" + e)
