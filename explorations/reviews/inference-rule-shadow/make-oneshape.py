#!/usr/bin/env python3
"""make-oneshape.py : probes/OneShapeW.fss from Fable's one-shape walk cases
(numerics-plan-fable/probes/one-shape/walk/*.fss, one case per file), for the compiled checker:
the shared preamble once, the run() locals as top-level bindings, and each file's case line as a
declaration of its own, w<Name>(), so that the checker, which stops a declaration at its first
error, reports every case in one run. The cases' text is unchanged."""
import glob, io, os, re
here = os.path.dirname(os.path.abspath(__file__))
d = os.path.join(here, "../numerics-plan-fable/probes/one-shape/walk")
files = sorted(glob.glob(os.path.join(d, "*.fss")))
first = io.open(files[0], encoding="utf-8").read().split("\n")
i = next(k for k, l in enumerate(first) if l.startswith("run(): () = do"))
pre = [l for l in first[1:i] if l != "export Executable"]
locals_ = []
for l in first[i + 1:]:
    if re.match(r"^    \w+: .* = ", l) and "println" not in l and not l.strip().startswith("do "):
        locals_.append(l.strip())
    else:
        break
out = ["component OneShapeW", "export Executable",
       "(* Fable's one-shape walk cases (numerics-plan-fable/probes/one-shape/walk/), made by",
       "   make-oneshape.py: the preamble once, run()'s locals at top level, one declaration per case. *)"]
out += pre + locals_
for f in files:
    n = os.path.basename(f)[:-4]
    t = io.open(f, encoding="utf-8").read().split("\n")
    j = next(k for k, l in enumerate(t) if l.startswith("run(): () = do"))
    body = [l for l in t[j + 1:] if l.strip() and l.strip() not in ("end",)]
    case = [l.strip() for l in body if l.strip() not in locals_]
    assert len(case) == 1, (n, case)
    out.append("w%s(): () = %s" % (n, case[0]))
out += ["run(): () = ()", "end", ""]
io.open(os.path.join(here, "probes/OneShapeW.fss"), "w", encoding="utf-8").write("\n".join(out))
print("\n".join(out))
