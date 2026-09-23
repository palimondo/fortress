#!/usr/bin/env python3
"""Error-by-error comparison of two checker-count runs made by count-variant.sh.
usage: count-diff.py <work-dir> <variant-a> <variant-b>
Splits each run-<v>.txt into its errors (the location lines plus the message), writes them to
<work-dir>/errors-<v>.txt with the copy's directory shown as <copy>/, and compares the two sets
with the copy's own line numbers removed, since the edits shift them.  Prints what goes, what
appears and what stays, by kind, and every error that appears."""
import collections, os, re, sys

W, A, B = sys.argv[1:4]
LOC = r"^(<copy>/|Library/|ProjectFortress/)\S+:\d+:"

def errors(v):
    copy = os.path.join(W, "libs", v) + "/"
    out, cur = [], []
    for l in open(os.path.join(W, f"run-{v}.txt"), encoding="utf-8", errors="replace"):
        l = l.rstrip("\n")
        if l.startswith(("@@PROBE", "###")) or re.match(r"\s+at ", l): continue
        l = l.replace(copy, "<copy>/").replace(os.getcwd() + "/", "").replace("/home/user/fortress/", "")
        if l.startswith("File ") and " has " in l: break
        if re.match(LOC, l) and cur and not re.match(LOC, cur[-1]):
            out.append("\n".join(cur)); cur = []
        cur.append(l)
    if cur: out.append("\n".join(cur))
    with open(os.path.join(W, f"errors-{v}.txt"), "w") as w:
        w.write("\n=====\n".join(out) + "\n")
    return out

def norm(e): return re.sub(r"(<copy>/\S+?):\d+:\d+(-\d+)?(:\d+)?:?", r"\1", e)

def kind(e):
    msg = " ".join(x.strip() for x in e.split("\n") if not re.match(LOC, x))
    if "exclude each other" in msg: return "family B (hierarchy)"
    if "excludes" in msg and "but it extends" in msg: return "family A (hierarchy)"
    if "Invalid comprises" in msg: return "family E (comprises)"
    if "Invalid overloading" in msg: return "overloading"
    if "return type" in msg: return "return type rule"
    return "other: " + msg[:80]

ea, eb = collections.Counter(norm(e) for e in errors(A)), collections.Counter(norm(e) for e in errors(B))
gone, new, common = ea - eb, eb - ea, ea & eb
print(f"{A} {sum(ea.values())}   {B} {sum(eb.values())}   go {sum(gone.values())}   appear {sum(new.values())}   stay {sum(common.values())}")
for name, c in (("go", gone), ("appear", new), ("stay", common)):
    print(f"  {name:7s}", dict(sorted(collections.Counter(kind(e) for e in c.elements()).items())))
for e in sorted(gone.elements()):
    if kind(e) == "overloading": print("GOES   >>", e.replace("\n", " | ")[:260])
for e in sorted(new.elements()): print("APPEARS>>", e.replace("\n", " | ")[:400])
