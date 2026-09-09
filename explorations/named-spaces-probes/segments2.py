#!/usr/bin/env python3
"""Segment line counts, named-spaces round.  Same instrument and same rules as
the diet report's segments.py; only the AFTER ranges are re-derived for the
new stripped core.  Reports any unassigned line (there are none)."""
import sys

SEGS = ["boilerplate/imports", "data + tokenizer", "autodiff engine",
        "notation layer", "model blocks", "config + weight init",
        "optimizer (Adam) + training loop", "sampling + inference"]

def code_lines(path, pyth=False):
    out = {}
    for i, l in enumerate(open(path).read().split("\n"), 1):
        s = l.strip()
        if not s: continue
        if pyth and s.startswith("#"): continue
        out[i] = l
    return out

def tally(lines, ranges):
    t = [0]*len(SEGS); un = []
    for i in lines:
        for k, rs in enumerate(ranges):
            if any(a <= i <= b for a, b in rs):
                t[k] += 1; break
        else:
            un.append(i)
    return t, un

PY = [
    [(1, 1)], [(2, 15), (133, 135)], [(16, 58)], [(75, 76)],
    [(77, 122)], [(59, 74)], [(123, 132), (136, 161)], [(162, 175)],
]
# stripped core of the SHIPPED file (= the diet report's after, 206 lines)
BEFORE = [
    [(1, 4), (147, 147), (205, 206)],
    [(134, 141), (151, 152), (165, 166)],
    [(5, 53)],
    [(54, 85)],
    [(86, 122)],
    [(123, 133), (148, 150), (153, 159)],
    [(160, 164), (167, 190)],
    [(142, 146), (191, 204)],
]
# stripped core AFTER the named spaces (215 lines).  KVCache's carrier body
# (76-83) counts as notation layer, exactly as Vec/Mat do; emptyCache (84)
# counts as model blocks, exactly as emptyHist did.
AFTER = [
    [(1, 4), (156, 156), (214, 215)],
    [(143, 150), (160, 161), (174, 175)],
    [(5, 53)],
    [(54, 83), (85, 96)],
    [(84, 84), (97, 131)],
    [(132, 142), (157, 159), (162, 168)],
    [(169, 173), (176, 199)],
    [(151, 155), (200, 213)],
]

def show(name, path, ranges, pyth=False):
    lines = code_lines(path, pyth)
    t, un = tally(lines, ranges)
    print(f"\n== {name}: {len(lines)} code lines ==")
    for s, n in zip(SEGS, t): print(f"  {s:36s} {n:4d}")
    if un: print("  UNASSIGNED:", un)
    return t

base = "/tmp/claude-0/-home-user-fortress/bdff267d-67dc-5bb9-b970-8c3dfaa634b6/scratchpad/"
here = base + "named-spaces/"
py = show("Karpathy microgpt.py", base + "microgpt.py", PY, pyth=True)
bf = show("microgpt2 before named spaces", here + "before-core.fss", BEFORE)
af = show("microgpt2 after  named spaces", here + "after-core.fss", AFTER)

print("\n| segment | Python | before | after | delta |")
print("|---|---|---|---|---|")
for s, a, b, c in zip(SEGS, py, bf, af):
    print(f"| {s} | {a} | {b} | {c} | {c-b:+d} |")
print(f"| **total** | **{sum(py)}** | **{sum(bf)}** | **{sum(af)}** | **{sum(af)-sum(bf):+d}** |")

for nm, idx in (("math half (engine+notation+model)", [2, 3, 4]),
                ("harness half", [0, 1, 5, 6, 7])):
    print(f"{nm}: python {sum(py[i] for i in idx)}, "
          f"before {sum(bf[i] for i in idx)}, after {sum(af[i] for i in idx)}")
