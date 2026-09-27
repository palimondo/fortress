#!/usr/bin/env python3
"""summarize.py <Name> : one line per probe declaration of small/<Name>.fss, with what each captured run
(small/<Name>.<variant>.<setting>.txt) made of each call on that line: the static arguments inferred
(from the @@PROBE-D trace: the last OK or FAIL at that span wins, since a failed context check repeats
the call) and the probe's own error at that line, cut."""
import glob, os, re, sys
n = sys.argv[1]
here = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(here, n + ".fss"), encoding="utf-8").read().split("\n")
runs = sorted(glob.glob(os.path.join(here, n + ".*.*.txt")))
order = {"instr": 0, "fix90": 1, "fix": 2}
runs.sort(key=lambda p: (["walk", "any", "compile"].index(p.split(".")[-2]), order.get(p.split(".")[-3], 9)))
res = {}
for p in runs:
    tag = ".".join(os.path.basename(p).split(".")[1:3])
    calls, errs, exp = {}, {}, {}
    lines = open(p, encoding="utf-8").read().split("\n")
    for i, l in enumerate(lines):
        m = re.match(r"@@PROBE-D (FN|MI)(-OK|-FAIL)? %s\.fss:(\d+):(\S+)(.*)" % n, l)
        if m:
            ln, sp, rest = int(m.group(3)), m.group(4), m.group(5)
            if m.group(2) is None:
                e = re.search(r"expected=(.*)$", rest); exp[(ln, sp)] = e.group(1) if e else "?"
            elif m.group(2) == "-OK":
                calls[(ln, sp)] = re.search(r"sargs=(\S+)", rest).group(1)
            else:
                calls[(ln, sp)] = "FAIL"
        m = re.match(r"^\d+:%s\.fss:(\d+):" % n, l)
        if m:
            msg = " ".join(x.split("-", 1)[1].strip() if re.match(r"^\d+-", x) else x for x in lines[i + 1:i + 3] if not re.match(r"^\d+:", x))
            errs.setdefault(int(m.group(1)), []).append(msg[:150])
    res[tag] = (calls, errs, exp)
for ln, text in enumerate(src, 1):
    if not re.match(r"^\s*(c|d|a|k|m)\w*\(|^\s*c02|^\s*m04", text): continue
    print(f"{n}.fss:{ln}  {text.strip()}")
    for tag, (calls, errs, exp) in res.items():
        cs = sorted((k, v) for k, v in calls.items() if k[0] == ln)
        parts = [f"{sp} expected={exp.get((ln, sp), '?')} -> {v}" for (l, sp), v in cs]
        e = "; ".join(errs.get(ln, [])) or "no error"
        print(f"    {tag:14s} {' | '.join(parts) or '(no call traced)'}  ::  {e}")
