#!/usr/bin/env python3
"""famcount.py <errors-file>... : for each errors list (reviews/anyintegral-comprises-ways/errlist.py's
one line per error, or a count capture with a #errors section), the count per family: "Invalid
overloading of <name>" and "For <name>, the return type", and the other errors by their first words;
printed as one row per family with one column per file."""
import re
import sys
from collections import Counter

cols = []
for p in sys.argv[1:]:
    c = Counter()
    lines = open(p, encoding="utf-8").read().splitlines()
    if any(l.startswith("#errors") for l in lines):
        lines = lines[[i for i, l in enumerate(lines) if l.startswith("#errors")][0] + 1:]
    for l in lines:
        if not l.strip() or l.startswith("#"):
            continue
        m = re.search(r"Invalid overloading of (\S+)", l) or re.search(r"For (\S+), the return type", l)
        if m:
            kind = "overloading" if "Invalid overloading" in l else "return type"
            c[f"{kind} {m.group(1)}"] += 1
        else:
            msg = l.split(" :: ", 1)[-1]
            c["other: " + " ".join(msg.split()[:6])] += 1
    cols.append(c)
keys = sorted(set().union(*cols))
print("family\t" + "\t".join(p.split("/")[-1] for p in sys.argv[1:]))
for k in keys:
    vals = [str(c.get(k, 0)) for c in cols]
    print(k + "\t" + "\t".join(vals))
print("total\t" + "\t".join(str(sum(c.values())) for c in cols))
