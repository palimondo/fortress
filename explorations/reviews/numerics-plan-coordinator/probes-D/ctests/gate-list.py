#!/usr/bin/env python3
"""gate-list.py <compiler_tests dir> : the .fss files the gate's CompilerJUTest compiles.
A .test file is a Java properties file; its `tests=` value names the tests, and a `compile` or `link`
key means the harness compiles (link compiles first) each named test's <name>.fss. Prints one file
name per line, sorted, then counts on stderr."""
import glob, os, re, sys
d = sys.argv[1]
def props(path):
    out, key, buf = {}, None, ""
    lines = open(path, encoding="utf-8", errors="replace").read().split("\n")
    i = 0; logical = []
    cur = ""
    for l in lines:
        s = l.lstrip() if not cur else l.lstrip()
        if not cur and (s.startswith("#") or s.startswith("!")): continue
        if s.endswith("\\") and not s.endswith("\\\\"):
            cur += s[:-1]; continue
        cur += s
        if cur.strip(): logical.append(cur)
        cur = ""
    if cur.strip(): logical.append(cur)
    for l in logical:
        m = re.match(r"\s*([^=:\s]+)\s*(?:[=:]\s*(.*))?$", l)
        if m: out[m.group(1)] = (m.group(2) or "")
    return out
files, ntests, nskip, missing, fsi = set(), 0, 0, [], []
for t in sorted(glob.glob(os.path.join(d, "*.test"))):
    p = props(t)
    if "compile" not in p and "link" not in p: nskip += 1; continue
    names = p.get("tests", "").split()
    for n in names:
        ntests += 1
        f = n if n.endswith(".fss") or n.endswith(".fsi") else n + ".fss"
        if f.endswith(".fsi"): fsi.append(f); continue            # an api: the question is the .fss the gate compiles
        if os.path.exists(os.path.join(d, f)): files.add(f)
        else: missing.append((os.path.basename(t), n))
for f in sorted(files): print(f)
print(f"# .test files: {len(glob.glob(os.path.join(d,'*.test')))}; without compile/link: {nskip}; test names with compile/link: {ntests}; distinct .fss: {len(files)}; names with no .fss: {len(missing)} {missing[:8]}; .fsi names left out: {len(fsi)} {fsi}", file=sys.stderr)
