#!/usr/bin/env python3
"""demos-compare.py <base-log-dir> <edit-log-dir>: the demos pass before and after the edit (extra-run.sh logs, each
ending in an rc= secs= trailer), demo by demo. Each output is read without its trailer, with the worktree's scratch
paths replaced, and with numbers that measure time (a number followed by ms, s, sec, secs, seconds or milliseconds,
or on a line that names elapsed, time or took) replaced by N. A demo is
  SAME       both runs ended (no timeout) with the same exit code and the same normalised output;
  PREFIX     one or both runs reached the 120 s cut (rc=124), and the shorter output is a prefix of the longer;
  MOVED      the same once every line number of a position in RangeInternals.fss or FortressLibrary.fss, the two
             files the edit rewrote, span is replaced by L (file:L): the same messages at moved library lines;
  CHANGED    anything else, printed with the first differing line of each.
The counts of each verdict and each demo's exit codes and seconds follow."""
import os, re, sys

A, B = sys.argv[1:3]
LIB = re.compile(r"((?:RangeInternals|FortressLibrary)\.fss):\d+(?::\d+)?(?:-\d+(?::\d+)?)?")
TIME = re.compile(r"\b\d+(\.\d+)?\s*(ms|milliseconds|s|sec|secs|seconds)\b")

def load(d, t):
    p = os.path.join(d, t)
    if not os.path.exists(p): return None, None, None
    lines = open(p, encoding="utf-8", errors="replace").read().split("\n")
    rc = secs = None
    body = []
    for l in lines:
        m = re.match(r"^rc=(\d+) secs=(\d+)$", l)
        if m: rc, secs = int(m.group(1)), int(m.group(2)); continue
        l = re.sub(r"/home/user/fortress-ranges/tmp/demos-[a-z]+/tmp-\d+", "TMP", l)
        l = l.replace("/home/user/fortress-ranges/", "")
        if re.search(r"elapsed|time|took", l, re.I): l = re.sub(r"\d+(\.\d+)?", "N", l)
        l = TIME.sub("N", l)
        body.append(l)
    while body and body[-1] == "": body.pop()
    return rc, secs, body

names = sorted(set(os.listdir(A)) | set(os.listdir(B)))
count = {}
rows = []
for t in names:
    ra, sa, a = load(A, t); rb, sb, b = load(B, t)
    if a is None or b is None:
        v = "MISSING"; detail = ""
    elif ra == rb and ra != 124 and a == b:
        v = "SAME"; detail = ""
    elif ra == rb and ra != 124 and [LIB.sub(r"\1:L", x) for x in a] == [LIB.sub(r"\1:L", x) for x in b]:
        v = "MOVED"; detail = ""
    elif (ra == 124 or rb == 124) and (a[:len(b)] == b or b[:len(a)] == a or a[:-1] == b[:len(a) - 1] or b[:-1] == a[:len(b) - 1]):
        v = "PREFIX"; detail = "lines %d / %d" % (len(a), len(b))
    else:
        v = "CHANGED"
        k = next((i for i in range(min(len(a), len(b))) if a[i] != b[i]), min(len(a), len(b)))
        detail = "first difference at line %d:\n      base: %s\n      edit: %s" % (
            k + 1, a[k] if k < len(a) else "<end>", b[k] if k < len(b) else "<end>")
    count[v] = count.get(v, 0) + 1
    rows.append("%-8s %-28s rc %s/%s  secs %s/%s  %s" % (v, t[:-4], ra, rb, sa, sb, detail))
for r in rows: print(r)
print("# " + ", ".join("%s %d" % kv for kv in sorted(count.items())) + " of %d demos" % len(names))
