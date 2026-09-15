#!/usr/bin/env python3
"""Summarise jdk.ExecutionSample events from a JFR recording into top frames by
sample count.  Three views:
  * leaf frames        -- where the time is actually spent
  * frames anywhere    -- which methods the time is under (one count per sample)
  * top whole stacks   -- the common shapes, deepest 8 frames

A recording covers the whole process, so samples are restricted twice: to the
thread that ran the loop, and to the last WINDOW seconds before the last
sample, which is the timed loop (pass the program's own loop_ns in seconds).
Both filters are named in the header so the reader can see what was counted.

Usage: top-frames.py <file.jfr> <thread-substring> [window-seconds]
"""
import re, subprocess, sys, collections, datetime

jfr = sys.argv[1]
thread = sys.argv[2]
window = float(sys.argv[3]) if len(sys.argv) > 3 else None

out = subprocess.run(["jfr", "print", "--stack-depth", "64", "--events",
                      "jdk.ExecutionSample", jfr],
                     capture_output=True, text=True, check=True).stdout

def parse_t(s):
    m = re.search(r"(\d\d):(\d\d):(\d\d\.\d+)", s)
    h, mi, se = int(m.group(1)), int(m.group(2)), float(m.group(3))
    return h * 3600 + mi * 60 + se

raw, cur, inst, th, t = [], None, False, "", 0.0
for line in out.splitlines():
    s = line.strip()
    if s.startswith("jdk.ExecutionSample {"):
        cur, inst, th, t = [], False, "", 0.0
    elif s.startswith("startTime ="):
        t = parse_t(s)
    elif s.startswith("sampledThread ="):
        th = s
    elif s.startswith("stackTrace = ["):
        inst = True
    elif inst and s == "]":
        inst = False
        if thread in th:
            raw.append((t, cur))
        cur = None
    elif inst and cur is not None:
        cur.append(re.sub(r" line: \d+$", "", s))

tmax = max(t for t, _ in raw) if raw else 0.0
if window is None:
    samples = [st for _, st in raw]
    note = "whole process"
else:
    samples = [st for t, st in raw if t >= tmax - window]
    note = f"last {window} s before the final sample (the timed loop)"

n = len(samples)
print(f"## {jfr}")
print(f"## thread filter: {thread!r}   time filter: {note}")
print(f"## samples counted: {n}  (of {len(raw)} on that thread)")

def show(title, counter, k=25):
    print(f"\n### {title}")
    for f, c in counter.most_common(k):
        print(f"{c:6d}  {100.0*c/n:5.1f}%  {f}")

show("leaf frames (top of stack)",
     collections.Counter(s[0] for s in samples if s))

anywhere = collections.Counter()
for s in samples:
    for f in set(s):
        anywhere[f] += 1
show("frames appearing anywhere in the stack (one count per sample)", anywhere)

print("\n### top 10 stack shapes (deepest 8 frames)")
shapes = collections.Counter(" | ".join(s[:8]) for s in samples if s)
for sh, c in shapes.most_common(10):
    print(f"{c:6d}  {100.0*c/n:5.1f}%")
    for f in sh.split(" | "):
        print(f"          {f}")
