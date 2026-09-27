#!/usr/bin/env python3
"""outcomes.py <summary.txt> : summarize.py's summary of RuleL cut to one line per case and capture:
whether the case's declaration is refused, and the static arguments its call inferred with the phase
that succeeded (FAIL: no candidate applicable; a tuple-bound name gives no type and fails silently)."""
import re, sys
cur = None
for l in open(sys.argv[1], encoding="utf-8").read().split("\n"):
    m = re.match(r"\S+\.fss:(\d+)\s+(\w+)\(\)", l)
    if m: cur = m.group(2); continue
    m = re.match(r"\s+(\S+)\s+(.*?)\s+::\s+(.*)", l)
    if m and cur and re.match(r"(r401|s64|sc|pk|pn|lh|tw|rg|bx)", cur):
        tag, calls, err = m.groups()
        r = re.search(r"-> (\S+)( \S+)?", calls.split(" | ")[0])
        res = (r.group(1) + (r.group(2) or "")) if r else calls
        print("%-6s %-20s %-8s %s" % (cur, tag, "ok" if err == "no error" else "REFUSED", res[:70]))
