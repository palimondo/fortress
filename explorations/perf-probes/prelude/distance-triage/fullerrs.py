#!/usr/bin/env python3
"""fullerrs.py <run.out>... : every distinct error of a run, as errors.py
(../switch-over-distance/errors.py) counts them, with the WHOLE message (errors.py's
.tsv cuts it at 160 characters).  One row per error on stdout:
    kind <tab> family <tab> stage <tab> location <tab> message
Paths are cut to the file name, so a library copy's errors compare with the tree's."""
import collections, re, sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                "../switch-over-distance"))
LOC = re.compile(r"(/\S+?/)?([\w.]+\.fs[si]):(\d+):\d+(?:-\d+)?(?::\d+)?")
PREFIX = re.compile(r"^((?:\S+?\.fs[si]:\d+:\d+(?:-\d+)?(?::\d+)?:\s*)+)(.*)$")
def norm(s):
    s = re.sub(r"[\w./<>+-]*/([\w.]+\.fs[si])", r"\1", s)
    s = re.sub(r"\$\d+", "", s)
    return re.sub(r"\s+", " ", s).strip()
# errors.py's classify, imported without running its main block
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        "../switch-over-distance/errors.py"), encoding="utf-8").read()
ns = {}
exec(src.split("out_path, runs = sys.argv[1], sys.argv[2:]")[0], ns)
seen = collections.OrderedDict()
for path in sys.argv[1:]:
    for raw in open(path, encoding="utf-8", errors="replace"):
        f = raw.rstrip("\n").split("\t")
        if f[0] != "@@SC ERR" or len(f) < 4: continue
        unit, stage, text = f[1], f[2], "\t".join(f[3:])
        m = PREFIX.match(text.strip())
        locs, msg = (m.group(1), m.group(2)) if m else ("", text)
        loc = ",".join(sorted(set("%s:%s" % (g[1], g[2]) for g in LOC.findall(locs)))) or "?"
        msg = norm(msg)
        seen.setdefault((loc, msg), set()).add(stage)
for (loc, msg), stages in seen.items():
    kind, fam = ns["classify"](sorted(stages)[-1], msg)
    if kind == "overloading": fam = fam + "|" + ns["overload_sub"](fam.split(" ")[0], msg)
    print("\t".join([kind, fam if kind in ("overloading", "return-type", "abstract-method") else "-",
                     "+".join(sorted(stages)), loc, msg]))
