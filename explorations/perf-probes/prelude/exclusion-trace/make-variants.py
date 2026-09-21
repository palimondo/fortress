#!/usr/bin/env python3
# Builds the four library copies the exclusion trace measures, in the directory
# given as argv[1] (a private scratch directory outside the repository).
# L0  the tree's library, copied unchanged -- the control for the interpreter run
# L1b only the api ellipsis fix (bucket 1, the one fix with no interpreter cost)
# L1a bucket-1 fixes except the closure
# L1  L1a + the 2026-09-19 closure dropped
# L2  every comprises clause removed (bucket 3, option (ii))
import os, re, shutil, sys

S = sys.argv[1]
SRC = {"fss": "Library/FortressLibrary.fss", "fsi": "Library/FortressLibrary.fsi"}
for v in ("L0", "L1b", "L1a", "L1", "L2"):
    os.makedirs(f"{S}/{v}", exist_ok=True)
    for e, p in SRC.items():
        shutil.copy(p, f"{S}/{v}/FortressLibrary.{e}")

def edit(path, subs):
    s = open(path, encoding="utf-8").read()
    for a, b, n in subs:
        assert s.count(a) == n, (path, a[:50], s.count(a), n)
        s = s.replace(a, b)
    open(path, "w", encoding="utf-8").write(s)

# bucket 1, site FortressLibrary.fsi:2526 / .fss:4444 -- extends and excludes the same type
EC_old = "trait RelationalPredicateCondition[\\E\\] extends { Condition[\\()\\] } excludes Condition[\\()\\]"
EC_new = "trait RelationalPredicateCondition[\\E\\] extends { Condition[\\()\\] }"
# bucket 1, site FortressLibrary.fsi:409 (E-ellipses) -- the api's QQ comprises ... in an api
QQ_old = "trait QQ extends { RR64, StandardPartialOrder[\\QQ\\] } comprises { ... }"
QQ_new = "trait QQ extends { RR64, StandardPartialOrder[\\QQ\\] } comprises { AnyIntegral }"
# bucket 1, site FortressLibrary.fsi:411 (E-eligible) -- the 2026-09-19 closure
AI_old = "trait AnyIntegral extends { QQ } comprises { ZZ } end"
AI_new = "trait AnyIntegral extends { QQ } end"

for v, fixes in (("L1b", (2,)), ("L1a", (1, 2)), ("L1", (1, 2, 3))):
    for e in ("fss", "fsi"):
        subs = []
        if 1 in fixes:            subs.append((EC_old, EC_new, 1))
        if 2 in fixes and e == "fsi": subs.append((QQ_old, QQ_new, 1))
        if 3 in fixes:            subs.append((AI_old, AI_new, 1))
        edit(f"{S}/{v}/FortressLibrary.{e}", subs)

pat = re.compile(r"[ \t]*comprises\s*\{[^}]*\}")
for e in ("fss", "fsi"):
    p = f"{S}/L2/FortressLibrary.{e}"
    out, removed = [], 0
    for line in open(p, encoding="utf-8"):
        if "comprises" in line and not line.lstrip().startswith("(*"):
            new = pat.sub("", line)
            if new != line:
                removed += 1
                if new.strip() == "":
                    continue
                line = new
        out.append(line)
    open(p, "w", encoding="utf-8").write("".join(out))
    print(f"L2 {e}: {removed} comprises clauses removed")
