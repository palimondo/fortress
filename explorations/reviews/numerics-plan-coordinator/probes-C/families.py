#!/usr/bin/env python3
"""families.py <base-full.tsv> <variant-full.tsv> [--map <base-lib> <variant-lib>] : measure-C's
per-family counts for question 2, over classify.py's classes (the variant's locations carried to
the base's lines by compare_c.py's normalised map when --map is given).

Prints, base -> variant, by site (kind and location, the n-th error at a site with the n-th):
  - the integer family I1..I6, D2, RG, TS;
  - L1 by family (the name after "Invalid overloading of");
  - M1, OT and NM split into their range part and the rest.  An error is in the range part
    when its message names a range type (a word ending in "Range" or containing "Range2D"/
    "Range3D", e.g. Range[\\I\\], ScalarRange, CompactFullParScalarRange) or its location is in
    RangeInternals or in FortressLibrary's range block (FortressLibrary.fss:3680-4030,
    FortressLibrary.fsi:2076-2320).
"""
import collections, re, subprocess, sys
HERE = "/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C"
args = sys.argv[1:]
sys.path.insert(0, "/home/user/fortress/explorations/perf-probes/prelude/distance-triage")
import classify as C
src = open(HERE + "/compare_c.py").read()
# reuse compare_c.py's map and keyed() without running its report
src = src.split("a, b = keyed(args[0], False), keyed(args[1], True)")[0]
saved = sys.argv; sys.argv = ["compare_c.py", "--sites"] + args
ns = {"__file__": HERE + "/compare_c.py"}; exec(src, ns)
sys.argv = saved
A = ns["keyed"](ns["args"][0], False); B = ns["keyed"](ns["args"][1], True)

def inrange(loc, msg):
    if re.search(r"(\w*Range\w*)\b", msg): return True
    for x in loc.split(","):
        m = re.match(r"([\w.]+\.fs[si]):(\d+)$", x)
        if not m: continue
        f, n = m.group(1), int(m.group(2))
        if f.startswith("RangeInternals"): return True
        if f == "FortressLibrary.fss" and 3680 <= n <= 4030: return True
        if f == "FortressLibrary.fsi" and 2076 <= n <= 2320: return True
    return False

def fam(msg):
    m = re.search(r"Invalid overloading of (\S+)", msg)
    return m.group(1) if m else "?"

def tally(D):
    t = collections.Counter()
    for k, (c, msg) in D.items():
        loc = k[1]
        t[c] += 1
        if c == "L1": t["L1:" + fam(msg)] += 1
        if c in ("M1", "OT", "NM"): t["%s:%s" % (c, "range" if inrange(loc, msg) else "other")] += 1
        if c == "M1": t["M1:" + fam(msg) + (" (range)" if inrange(loc, msg) else "")] += 1
    return t
ta, tb = tally(A), tally(B)
gone = collections.Counter(); new = collections.Counter()
for k, (c, msg) in A.items():
    if k not in B:
        gone[c] += 1
        if c in ("M1", "OT", "NM"): gone["%s:%s" % (c, "range" if inrange(k[1], msg) else "other")] += 1
        if c == "L1": gone["L1:" + fam(msg)] += 1
for k, (c, msg) in B.items():
    if k not in A:
        new[c] += 1
        if c in ("M1", "OT", "NM"): new["%s:%s" % (c, "range" if inrange(k[1], msg) else "other")] += 1
        if c == "L1": new["L1:" + fam(msg)] += 1
keys = ["I1", "I2", "I3", "I4", "I5", "I6", "D2", "RG", "TS"] + sorted(k for k in set(ta) | set(tb) if k.startswith("L1:")) \
       + ["M1:range", "M1:other"] + sorted(k for k in set(ta) | set(tb) if k.startswith("M1:") and k not in ("M1:range", "M1:other")) \
       + ["OT:range", "OT:other", "NM:range", "NM:other"]
print("%-40s %7s %7s %7s %7s" % ("family", "base", "variant", "gone", "new"))
for k in keys:
    print("%-40s %7d %7d %7d %7d" % (k, ta[k], tb[k], gone[k], new[k]))
print("%-40s %7d %7d" % ("total", len(A), len(B)))
