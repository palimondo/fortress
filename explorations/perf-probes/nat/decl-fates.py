#!/usr/bin/env python3
"""What each top-level declaration of the interpreter's library becomes, before
and after the nat shadow.

Input: two PhaseProbe -Dprobe.tolerant=true runs (see run-all.sh step 3b), which
print one @@TC DECL-OK / @@TC DECL-CRASH line per top-level declaration of the
component.  Output: the counts, the fate of every declaration that changed, and
the crash sites that remain.
"""
import sys, collections

def read(path):
    decls = {}                      # span -> (kind, fate, detail)
    order = []
    for line in open(path, encoding="utf-8", errors="replace"):
        if line.startswith("@@TC DECL-OK\t"):
            _, kind, span, errs = line.rstrip("\n").split("\t", 3)
            decls[span] = (kind, "ok", errs)
            order.append(span)
        elif line.startswith("@@TC DECL-CRASH\t"):
            f = line.rstrip("\n").split("\t")
            kind, span, exc, site, msg = f[1], f[2], f[3], f[4], (f[5] if len(f) > 5 else "")
            decls[span] = (kind, "crash", "%s at %s : %s" % (exc, site, msg))
            order.append(span)
    return decls, order

def short(span):
    return span.split("/")[-1]

a, aorder = read(sys.argv[1])
b, border = read(sys.argv[2])

def tally(d):
    t = collections.Counter()
    for kind, fate, detail in d.values():
        if fate == "ok":
            t["clean" if detail == "errors=0" else "errors of its own"] += 1
        else:
            t["crashed"] += 1
    return t

print("# Per top-level declaration of Library/FortressLibrary.fss, the checker's fate")
print("# with the interpreter prelude, before and after the nat shadow.")
print("# BEFORE:", sys.argv[1])
print("# AFTER :", sys.argv[2])
print()
print("declarations seen: before %d, after %d" % (len(a), len(b)))
for name, d in (("BEFORE", a), ("AFTER", b)):
    t = tally(d)
    print("%-7s clean=%d  errors-of-its-own=%d  crashed=%d"
          % (name, t["clean"], t["errors of its own"], t["crashed"]))
print()

before_crash = [s for s in aorder if a[s][1] == "crash"]
print("## The %d declarations that crashed the checker before, and what they become" % len(before_crash))
fates = collections.Counter()
rows = []
for s in before_crash:
    if s not in b:
        fates["gone from the after run"] += 1; rows.append((s, "MISSING", "")); continue
    kind, fate, detail = b[s]
    if fate == "ok" and detail == "errors=0":
        fates["clean"] += 1; rows.append((s, "clean", ""))
    elif fate == "ok":
        fates["ordinary error"] += 1; rows.append((s, "ordinary error", detail))
    else:
        fates["still crashes"] += 1; rows.append((s, "still crashes", detail))
for k, v in fates.most_common():
    print("  %-24s %d" % (k, v))
print()
print("## The crash sites that remain, by site")
sites = collections.Counter()
for s in border:
    if b[s][1] == "crash":
        sites[b[s][2].split(" : ")[0]] += 1
for k, v in sites.most_common():
    print("  %4d  %s" % (v, k))
print()
print("## The crash sites before, by site")
sites = collections.Counter()
for s in aorder:
    if a[s][1] == "crash":
        sites[a[s][2].split(" : ")[0]] += 1
for k, v in sites.most_common():
    print("  %4d  %s" % (v, k))
print()
print("## Every declaration whose fate changed")
print("# span | before | after")
for s in aorder:
    if s not in b: continue
    fa, fb = a[s], b[s]
    sa = "clean" if fa[1] == "ok" and fa[2] == "errors=0" else ("ok %s" % fa[2] if fa[1] == "ok" else "CRASH %s" % fa[2])
    sb = "clean" if fb[1] == "ok" and fb[2] == "errors=0" else ("ok %s" % fb[2] if fb[1] == "ok" else "CRASH %s" % fb[2])
    if sa != sb:
        print("%s %s | %s | %s" % (fa[0], short(s), sa, sb))
