# Independent check of rung U's re-anchoring: every citation of a line of an edited chapter,
# in every file of the three test corpora, at the base and at HEAD; the cited text must be the same.
import re, subprocess, sys, os
BASE = "26c5d3dd7e436ff3b200d32346f92b8f1af1a33e"
os.chdir("/home/user/fortress-specranges")
CH = {"ranges.tex": "Specification/basic/expressions/ranges.tex",
      "basic-integers.tex": "Specification/basic-lib/basic-integers.tex",
      "defining-generators.tex": "Specification/advanced/parallelism-locality/defining-generators.tex",
      "blocks.tex": "Specification/basic/expressions/blocks.tex",
      "changes.tex": "Specification/appendices/changes.tex"}
def show(rev, path):
    try: return subprocess.run(["git","show",f"{rev}:{path}"],capture_output=True,text=True,check=True).stdout.split("\n")
    except subprocess.CalledProcessError: return None
base_ch = {k: show(BASE, v) for k, v in CH.items()}
head_ch = {k: open(v).read().split("\n") for k, v in CH.items()}
tok = re.compile(r'([A-Za-z0-9_.-]+\.tex):(\d+)(?:-(\d+))?|(?<=[ ,;(])(:)(\d+)(?:-(\d+))?')
def cites(line):
    out = []; cur = None
    for m in tok.finditer(line):
        if m.group(1):
            cur = os.path.basename(m.group(1)); a, b = int(m.group(2)), int(m.group(3) or m.group(2))
        else:
            a, b = int(m.group(5)), int(m.group(6) or m.group(5))
        if cur in CH: out.append((cur, a, b))
    return out
files = subprocess.run(["git","ls-files","ProjectFortress/tests","ProjectFortress/compiler_tests","ProjectFortress/library_tests"],capture_output=True,text=True).stdout.split()
J = {"RangePrototype.fss","XXXRangeBoundsRungO.fss","XXXSeqRangeTopRungO.fss","XXXRangeSizeZZ64RungO.fss"}
bad = ok = moved = 0; jcites = []
for f in files:
    if not f.endswith(".fss"): continue
    b = show(BASE, f); h = open(f).read().split("\n")
    if b is None: continue
    if len(b) != len(h): print("LINECOUNT", f); continue
    for i, (lb, lh) in enumerate(zip(b, h), 1):
        cb, chh = cites(lb), cites(lh)
        if not cb and not chh: continue
        if os.path.basename(f) in J:
            jcites.append(f"{f}:{i}: {cb}"); continue
        if len(cb) != len(chh): print("MISMATCH", f, i); bad += 1; continue
        for (c1, a1, b1), (c2, a2, b2) in zip(cb, chh):
            t1 = base_ch[c1][a1-1:b1]; t2 = head_ch[c2][a2-1:b2]
            if t1 != t2: print(f"TEXT-DIFF {f}:{i} {c1}:{a1}-{b1} -> {a2}-{b2}"); bad += 1
            else:
                ok += 1
                if (a1, b1) != (a2, b2): moved += 1
        # assertion unchanged outside the numbers
        if re.sub(r'\d+', '#', lb) != re.sub(r'\d+', '#', lh): print("NONNUM-CHANGE", f, i); bad += 1
print(f"citations checked {ok}, of them moved {moved}, bad {bad}")
print("J's four files, citations left for the gather:")
print("\n".join(jcites))
