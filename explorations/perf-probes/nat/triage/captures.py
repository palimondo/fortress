#!/usr/bin/env python3
"""captures.py <work-dir> <triage-dir> : the small captures of triage.md from the raw runs."""
import os, re, sys, subprocess, collections
W, T = sys.argv[1], sys.argv[2]
B = os.path.dirname(os.path.abspath(__file__))
def sh(*a): return subprocess.run(a, capture_output=True, text=True).stdout
def errs(run): return sh("python3", f"{B}/errs.py", f"{W}/{run}.out").splitlines()
def count(run):
    m = re.findall(r"has (\d+) errors?", open(f"{W}/{run}.out", errors="replace").read()); return m[-1] if m else "?"
def rows(run):
    out = []
    for l in open(f"{W}/{run}.out", errors="replace"):
        m = re.match(r"@@PROBE checkApi (\S+) -> errors=(\d+)", l)
        if m and m.group(2) != "0": out.append(f"{m.group(1)} {m.group(2)}")
        if l.startswith("@@PROBE OverloadingChecker CRASHED"): out.append("CRASH " + l.split(" : ")[-1].strip()[:40])
    return ", ".join(out)
def tally(lines):
    c = collections.Counter(" ".join(x.split(" | ")[:2]) for x in lines)
    return "; ".join(f"{k} {v}" for k, v in sorted(c.items(), key=lambda kv: (-kv[1], kv[0])))
RUNS = [  # capture, world, library, switches
 ("r01-ZALL3-dP-eN", "nat shadow (zero's classes)", "ZALL3", "dropP eligibleNarrow"),
 ("r06-ZALL3-dP-eN-again", "nat shadow (zero's classes)", "ZALL3", "same, again"),
 ("r26-ZALL3-dP-eN-nat1-notri", "nat shadow + shadow-add", "ZALL3", "dropP eligibleNarrow"),
 ("r03-ZALL3-dP-eN-nat1", "nat + shadow-add + triage OC", "ZALL3", "dropP eligibleNarrow"),
 ("r16-ZALL3-dP-eN-nat1-again", "nat + shadow-add + triage OC", "ZALL3", "same, again"),
 ("r07-ZALL3-dP-eN-diag", "nat + shadow-add + triage OC", "ZALL3", "dropP eligibleNarrow diag"),
 ("r05-ZALL3-HO-eN", "nat + shadow-add + triage OC", "ZALL3", "dropPHier dropPOver eligibleNarrow"),
 ("r15-ZALL3-HO-eN-diag", "nat + shadow-add + triage OC", "ZALL3", "dropPHier dropPOver eligibleNarrow diag"),
 ("r04-ZALL3-H-eN", "nat + shadow-add + triage OC", "ZALL3", "dropPHier eligibleNarrow"),
 ("r20-ZALL3-dP-eN-nat0-nomemo", "nat shadow (zero's classes)", "ZALL3", "dropP eligibleNarrow, overload memo off"),
 ("r21-ZALL3-dP-eN-nat1-nomemo", "nat + shadow-add + triage OC", "ZALL3", "dropP eligibleNarrow, overload memo off"),
 ("r25-ZALL3-HO-eN-nomemo", "nat + shadow-add + triage OC", "ZALL3", "dropPHier dropPOver eligibleNarrow, memo off"),
 ("r24-ZALL3-H-eN-nomemo", "nat + shadow-add + triage OC", "ZALL3", "dropPHier eligibleNarrow, memo off"),
 ("r3T1-dP-eN-nomemo", "nat shadow (zero's classes)", "T1", "dropP eligibleNarrow, memo off"),
 ("r3T2-dP-eN-nomemo", "nat shadow (zero's classes)", "T2", "dropP eligibleNarrow, memo off"),
 ("r3T3-dP-eN-nomemo", "nat shadow (zero's classes)", "T3", "dropP eligibleNarrow, memo off"),
 ("r02-ZL-dP", "nat shadow (zero's classes)", "ZL", "dropP"),
 ("r09-ZL-H", "nat + shadow-add + triage OC", "ZL", "dropPHier"),
 ("r13-cur-L0-H", "CURRENT TREE + p-only", "L0 (tracked)", "dropPHier"),
 ("r27-cur-ZL-noP", "CURRENT TREE + p-only", "ZL", "none"),
 ("r11-cur-ZL-H", "CURRENT TREE + p-only", "ZL", "dropPHier"),
 ("r19-cur-ZL-H-again", "CURRENT TREE + p-only", "ZL", "dropPHier, again"),
 ("r22-cur-ZL-H-nomemo", "CURRENT TREE + p-only", "ZL", "dropPHier, memo off"),
 ("r12-cur-ZL-H-eN", "CURRENT TREE + p-only", "ZL", "dropPHier eligibleNarrow"),
 ("r17-cur-ZL-HO", "CURRENT TREE + p-only", "ZL", "dropPHier dropPOver"),
 ("r18-cur-ZL-HO-eN", "CURRENT TREE + p-only", "ZL", "dropPHier dropPOver eligibleNarrow"),
]
with open(f"{T}/counts.txt", "w") as o:
    o.write("# Every whole-unit run of the triage (run-all.sh).  count = 'File FortressLibrary.fss has N errors';\n"
            "# api rows as the instrumented StaticChecker prints them (each api's errors are counted twice there);\n"
            "# by kind: OVL = Invalid overloading, RET = return type, DUP = same parameter type, OTHER = hierarchy/well-formedness.\n")
    for run, world, lib, sw in RUNS:
        if not os.path.exists(f"{W}/{run}.out"): continue
        e = errs(run)
        o.write(f"\n{run}\n  world: {world} | library: {lib} | switches: {sw}\n  count {count(run)} | fill {sum(' | fill ' in x for x in e)}\n"
                f"  apis: {rows(run)}\n  kinds: {tally(e)}\n")
def cls(errfile_lines, diag, out, head):
    p = f"{W}/tmp-errs.txt"; open(p, "w").write("\n".join(errfile_lines) + "\n")
    args = ["python3", f"{B}/classify.py", p] + ([f"{W}/{diag}.out"] if diag else [])
    open(out, "w").write(head + sh(*args))
cls(errs("r20-ZALL3-dP-eN-nat0-nomemo"), "r15-ZALL3-HO-eN-diag", f"{T}/classified-203.txt",
    "# The 203 errors of the everything-applied copy (ZALL3, dropP + eligibleNarrow, overload memo off,\n"
    "# r20), one per line: class [+a] | static-parameter sentence (b1 one generic, b2 both, differing) | kind | name |\n"
    "# where | the two declarations.  +a: the pair is certified by the strong checkP (diag run r15).\n")
cls(errs("r3T3-dP-eN-nomemo"), None, f"{T}/remaining-72.txt",
    "# What is left after the (d), fill and one-line (c) fixes (library copy T3 of make-fixes.py, r3T3).\n")
with open(f"{T}/strong-vs-relaxed.txt", "w") as o:
    o.write("# r15 (dropPHier + dropPOver, diag): for every invalid pair, oa.excludes asked again with the\n"
            "# strong checkP and with it relaxed.  count | name | exclStrong | exclRelaxed\n")
    c = collections.Counter(); strong = []
    for l in open(f"{W}/r15-ZALL3-HO-eN-diag.out", errors="replace"):
        if not l.startswith("@@TRI"): continue
        f = l.rstrip().split(" | "); d = dict(x.split("=", 1) for x in f[3:] if "=" in x and not x.startswith(("f=", "g=")))
        c[(f[0][6:], d["exclStrong"], d["exclRelaxed"])] += 1
        if d["exclStrong"] == "true":
            strong.append(re.sub(r"/tmp/\S*?/lib/[A-Za-z0-9]+/", "", " | ".join(f[:5])))
    for k, v in sorted(c.items()): o.write(f"{v} | {' | '.join(k)}\n")
    o.write("\n# the pairs the strong checkP alone certifies\n" + "\n".join(strong) + "\n")
with open(f"{T}/narrow-placement.txt", "w") as o:
    e = errs("r24-ZALL3-H-eN-nomemo")
    o.write("# r24: ZALL3 with checkP relaxed ONLY at the two TypeHierarchyChecker calls (batch 3's rung P),\n"
            "# overload memo off: " + count("r24-ZALL3-H-eN-nomemo") + " errors against 203 for the broad placement.\n# by kind and name:\n")
    o.write(tally(e).replace("; ", "\n") + "\n\n# three of them, verbatim\n")
    for pat in ("DUP | BITAND", "RET | DIV", "OVL | combine2D"):
        o.write(next(x for x in e if x.startswith(pat)) + "\n")
with open(f"{T}/batch3-current.txt", "w") as o:
    o.write("# Batch 3 on the CURRENT TREE: the tracked checker, rung P as p-only.patch's switch, rung L as\n"
            "# make-lib.py's ZL copy, nothing of the nat shadow.  Gate-format tables (tools/checker-count/run.sh).\n")
    for run in ("r13-cur-L0-H", "r27-cur-ZL-noP", "r11-cur-ZL-H", "r12-cur-ZL-H-eN", "r17-cur-ZL-HO", "r18-cur-ZL-HO-eN"):
        txt = open(f"{W}/{run}.out", errors="replace").read()
        o.write(f"\n## {run}\n#api\terrors\n")
        for a, n in sorted(set(re.findall(r"@@PROBE checkApi (\S+) -> errors=(\d+)", txt))): o.write(f"{a}\t{n}\n")
        crash = re.search(r"@@PROBE OverloadingChecker CRASHED on (.*)", txt)
        o.write(f"#total\t{count(run)}\n#crash\t{crash.group(1) if crash else 'none'}\n")
    o.write("\n## r11's " + count("r11-cur-ZL-H") + " errors (batch 3 exactly), one per line\n" + "\n".join(errs("r11-cur-ZL-H")) + "\n")
print("captures in", T)
