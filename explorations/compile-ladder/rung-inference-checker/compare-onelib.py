#!/usr/bin/env python3
"""compare-onelib.py: per program and library, the error sites (line:col and the first message line)
of two builds (probes/onelib/<Name>.<BASE>.<lib>.txt against <Name>.<AFTER>.<lib>.txt; BASE and AFTER from the environment, base and after by default), cleared and new,
and beside them the shadow's stock and rule sites where it captured the program
(explorations/reviews/inference-rule-shadow/small/<Name>.{instr,rule-instr}.any.<lib>.txt)."""
import os, re, sys
BASE, AFTER = os.environ.get("BASE", "base"), os.environ.get("AFTER", "after")
R = os.path.dirname(os.path.abspath(__file__))
SH = os.path.join(R, "../../reviews/inference-rule-shadow/small")
def sites(path):
    if not os.path.exists(path): return None
    out, lines = {}, open(path, encoding="utf-8", errors="replace").read().split("\n")
    for i, l in enumerate(lines):
        m = re.match(r"^\d+:(?:\S*/)?([A-Za-z0-9]+\.fss):(\d+):([\d-]+):\s*$", l)
        if m:
            msg = lines[i+1] if i + 1 < len(lines) else ""
            msg = re.sub(r"^\d+-\s*", "", msg).strip()
            out["%s:%s" % (m.group(2), m.group(3))] = msg[:160]
    return out
progs = sys.argv[1:] or ["RuleL", "RuleLI", "DCtx", "DArg", "DMore", "OneShapeW"]
for n in progs:
    for lib in ("L0", "A0"):
        b = sites(os.path.join(R, "probes/onelib/%s.%s.%s.txt" % (n, BASE, lib)))
        a = sites(os.path.join(R, "probes/onelib/%s.%s.%s.txt" % (n, AFTER, lib)))
        if b is None or a is None: continue
        ss = sites(os.path.join(SH, "%s.instr.any.%s.txt" % (n, lib)))
        sr = sites(os.path.join(SH, "%s.rule-instr.any.%s.txt" % (n, lib)))
        print("== %s on %s: %s %d sites, %s %d; cleared %d, new %d%s" % (n, lib, BASE, len(b), AFTER, len(a),
              len(set(b) - set(a)), len(set(a) - set(b)),
              "" if ss is None else "; the shadow's run (library of 917bb7b32): stock %d, rule %d" % (len(ss), len(sr or {}))))
        for k in sorted(set(b) | set(a), key=lambda s: [int(x) for x in re.findall(r"\d+", s)]):
            tag = "both   " if k in b and k in a else ("cleared" if k in b else "NEW    ")
            print("  %s %-10s %s: %s" % (tag, k, BASE, b.get(k, "-")))
            if k in a and a.get(k) != b.get(k): print("  %s %-10s %s: %s" % (" " * 7, "", AFTER, a[k]))
