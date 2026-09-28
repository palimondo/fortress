#!/usr/bin/env python3
"""cc-errors.py <run.txt>: the checker-count stage's errors (explorations/coordinator/tools/checker-count/run.sh's
run.txt), one line each: its kind (the message's first words) and the declarations it names, with static argument
lists and line numbers dropped, so that a table before and after an edit that respells I as ZZ32 and moves lines
can be compared error by error. Prints the lines sorted, then their count."""
import re, sys
txt = open(sys.argv[1], encoding="utf-8").read().split("\n")
errs, cur = [], None
for l in txt:
    if l.startswith("@@PROBE") or l.startswith("###") or l.startswith("File "): continue
    if re.match(r"^/\S+:\d+:\d+", l):
        if cur and cur[1]: errs.append(cur); cur = None
        if cur is None: cur = [[], []]
        cur[0].append(re.sub(r".*/(\w+\.fs[si]):.*", r"\1", l))
    elif l.strip() and cur is not None:
        cur[1].append(l.strip())
if cur: errs.append(cur)
def norm(s):
    s = re.sub(r"@ \S+", "", s)
    s = re.sub(r"\[\\[^\]]*?\\\]", "", s)
    s = re.sub(r"\[\\[^\]]*?\\\]", "", s)
    s = re.sub(r"\b[IJK]\b", "ZZ32", s)
    return re.sub(r"\s+", " ", s).strip()
out = []
for locs, msg in errs:
    m = norm(" ".join(msg))
    head = re.sub(r"^(Invalid overloading of \S+ in \S+ \S+|Invalid comprises clause|For \w+,).*", r"\1", m)
    out.append("%s | %s | %s" % (" ".join(sorted(set(locs))), head, m[len(head):len(head)+160]))
for o in sorted(out): print(o)
print("# %d errors" % len(out))
