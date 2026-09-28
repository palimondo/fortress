#!/usr/bin/env python3
"""respell-prototype.py <scratch-dir> <in.fss> <out.fss>: the team's ProjectFortress/tests/RangePrototype.fss
restated for ranges over ZZ32, by the two rules respell.py applies to the library through z32.py:
  1. every written static argument list of a RangeInternals name that lost its parameters is shortened
     (z32.py's pass 1, run unchanged over a scratch copy of the base RangeInternals api and component,
     BOUNDS applied first as respell.py applies it, beside the test);
  2. every static parameter of the test's own declarations bounded Integral[\\X\\] is removed and its
     name replaced by ZZ32 within the declaration (z32.py's pass 2 rule, with the whole file as its
     region; the functions are z32.py's own, executed from its source).
The test's unbounded dumpShow[\\I\\](r:Range[\\I\\]) keeps its parameter, as the public Range trait does."""
import io, os, re, shutil, subprocess, sys, collections

S, IN, OUT = sys.argv[1:4]
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../.."))
Z32 = os.path.join(ROOT, "explorations/reviews/numerics-plan-coordinator/probes-C/z32.py")
VAR = os.path.join(ROOT, "explorations/perf-probes/prelude/distance-triage/variants.py")

BASE = "26c5d3dd7e436ff3b200d32346f92b8f1af1a33e"      # the batch's base, before rung J
shutil.rmtree(S, ignore_errors=True); os.makedirs(S)
for n in ("RangeInternals.fsi", "RangeInternals.fss", "FortressLibrary.fsi", "FortressLibrary.fss"):
    txt = subprocess.run(["git", "-C", ROOT, "show", "%s:Library/%s" % (BASE, n)],
                         capture_output=True, check=True).stdout
    open(os.path.join(S, n), "wb").write(txt)
shutil.copy(IN, os.path.join(S, "RangePrototype.fss"))
assert subprocess.run([sys.executable, VAR, S, "BOUNDS"]).returncode == 0
assert subprocess.run([sys.executable, Z32, S]).returncode == 0          # pass 1 reaches RangePrototype.fss

src = io.open(Z32, encoding="utf-8").read()
defs = src[:src.index("# ---- pass 0")]
g = {"__name__": "z32defs"}
sys.argv = [Z32, S]
exec(compile(defs, Z32, "exec"), g)
headers, split_top, is_integer_param = g["headers"], g["split_top"], g["is_integer_param"]

p = os.path.join(S, "RangePrototype.fss")
s = io.open(p, encoding="utf-8").read()
hs = headers(s)
edits, removed = [], 0
for k, (st, name, ls, le) in enumerate(hs):
    ps = split_top(s[ls + 2:le - 2])
    gone = [is_integer_param(q) for q in ps]
    names = [x for x in gone if x]
    if not names: continue
    m = re.compile(r"^(?!end\b)\S", re.M).search(s, s.index("\n", le) + 1)
    se = m.start() if m else len(s)
    tv = re.compile(r"(?<![\w'])(%s)(?![\w'])" % "|".join(names))
    kept = [q.strip() for q, x in zip(ps, gone) if not x]
    rest = tv.sub("ZZ32", s[le:se])
    new = tv.sub("ZZ32", s[st:ls]) + (("[\\" + ", ".join(kept) + "\\]") if kept else "") + rest
    edits.append((st, se, new)); removed += len(names)
for st, se, new in sorted(edits, reverse=True):
    s = s[:st] + new + s[se:]
# 2b. a call of one of the test's own declarations that lost every static parameter loses its written list
close_of = g["close_of"]
own = []
for (st, name, ls, le) in hs:
    ps = split_top(io.open(p, encoding="utf-8").read()[ls + 2:le - 2])
    if not name.startswith("opr ") and ps and all(is_integer_param(q) for q in ps): own.append(name)
calls = 0
for name in own:
    while True:
        m = re.search(r"\b%s(?=\[\\)" % re.escape(name), s)
        if not m: break
        le = close_of(s, m.end())
        s = s[:m.end()] + s[le:]; calls += 1
print("respell-prototype.py: %d calls of %s lose their static arguments" % (calls, ", ".join(own)))
# 3. a line that lies wholly inside a comment keeps the team's text (the respelling changes no line count)
orig = io.open(IN, encoding="utf-8").read()
depth, inside, line = 0, set(), 0
starts_in = {0: 0}
for i, c in enumerate(orig):
    if orig.startswith("(*", i): depth += 1
    elif orig.startswith("*)", i) and depth: depth -= 1
    if c == "\n":
        line += 1; starts_in[line] = depth
ol, nl = orig.split("\n"), s.split("\n")
assert len(ol) == len(nl), (len(ol), len(nl))
for k, text in enumerate(ol):
    if starts_in.get(k, 0) > 0 and "*)" not in text and "(*" not in text:
        nl[k] = text
s = "\n".join(nl)
io.open(OUT, "w", encoding="utf-8").write(s)
print("respell-prototype.py: %d declarations, %d static parameters removed" % (len(edits), removed))
