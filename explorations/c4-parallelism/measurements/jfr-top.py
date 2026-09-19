#!/usr/bin/env python3
"""Aggregate `jfr print` output into the two top-ten tables the measurement asks for.

Usage:  jfr-top.py alloc   <jfr print --events jdk.ObjectAllocationSample output>
        jfr-top.py monitor <jfr print --events jdk.JavaMonitorEnter,jdk.JavaMonitorWait output>

For allocation: by objectClass, sample count and summed sample weight, with the
topmost stack frame most often seen under each class.
For monitors: by monitorClass, event count and summed blocked duration, with the
topmost stack frame most often seen under each class.
"""
import sys, re, collections

WEIGHT = re.compile(r"^\s*weight\s*=\s*([0-9.]+)\s*(bytes?|B|kB|KB|MB|GB)\s*$")
DUR = re.compile(r"^\s*duration\s*=\s*([0-9.]+)\s*(ns|us|µs|ms|s)\s*$")
CLS = re.compile(r"^\s*(objectClass|monitorClass)\s*=\s*(\S+)")
EVT = re.compile(r"^jdk\.(\w+)\s*\{")
SCALE_W = {"byte": 1, "bytes": 1, "B": 1, "kB": 1024, "KB": 1024,
           "MB": 1024**2, "GB": 1024**3}
SCALE_D = {"ns": 1e-6, "us": 1e-3, "µs": 1e-3, "ms": 1.0, "s": 1000.0}

def main():
    mode, path = sys.argv[1], sys.argv[2]
    n = collections.Counter()          # events per class
    amt = collections.Counter()        # bytes (alloc) or ms (monitor) per class
    frames = collections.defaultdict(collections.Counter)
    ev = collections.Counter()
    cls = None; val = 0.0; in_stack = False; took_frame = False
    total_n = 0; total_amt = 0.0
    for ln in open(path, errors="replace"):
        m = EVT.match(ln)
        if m:
            if cls:
                n[cls] += 1; amt[cls] += val; total_n += 1; total_amt += val
            ev[m.group(1)] += 1
            cls = None; val = 0.0; in_stack = False; took_frame = False
            continue
        m = CLS.match(ln)
        if m:
            cls = m.group(2); continue
        m = WEIGHT.match(ln)
        if m and mode == "alloc":
            val = float(m.group(1)) * SCALE_W[m.group(2)]; continue
        m = DUR.match(ln)
        if m and mode == "monitor":
            val = float(m.group(1)) * SCALE_D[m.group(2)]; continue
        if "stackTrace = [" in ln:
            in_stack = True; continue
        if in_stack and not took_frame:
            f = ln.strip()
            if f and f != "]":
                frames[cls][f.split(" line:")[0]] += 1
                took_frame = True
    if cls:
        n[cls] += 1; amt[cls] += val; total_n += 1; total_amt += val

    unit = "MB" if mode == "alloc" else "ms"
    div = 1024.0**2 if mode == "alloc" else 1.0
    print("events by type: " + ", ".join("%s %d" % (k, v) for k, v in ev.most_common()))
    print("%d events counted, %.1f %s total" % (total_n, total_amt / div, unit))
    print()
    print("%-5s %-9s %-10s %s" % ("#", "events", unit, "class / top frame"))
    for i, (c, k) in enumerate(n.most_common(10), 1):
        print("%-5d %-9d %-10.1f %s" % (i, k, amt[c] / div, c))
        for f, fk in frames[c].most_common(1):
            print("%-26s   %s  (%d)" % ("", f, fk))
    print()
    print("ranked by %s instead:" % unit)
    for i, (c, v) in enumerate(amt.most_common(10), 1):
        print("%-5d %-9d %-10.1f %s" % (i, n[c], v / div, c))

main()
