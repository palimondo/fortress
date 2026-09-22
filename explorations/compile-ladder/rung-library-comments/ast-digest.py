#!/usr/bin/env python3
# Rung C: digest of a parse-tree dump (bin/fortress parse -out) with every source span removed; see REPORT.md.
# usage: ast-digest.py <dump.tfs>...   prints: sha256  spans-removed  lines  file
import hashlib, re, sys
SPAN = re.compile(r'@("[^"]*":)?\d+:\d+(~\d+(:\d+)?)?')
for f in sys.argv[1:]:
    text = open(f, encoding="utf-8").read()
    norm, n = SPAN.subn("@", text)
    left = len(re.findall(r'@\S*\d', norm))
    print("%s  spans-removed=%d  spans-left=%d  lines=%d  %s"
          % (hashlib.sha256(norm.encode("utf-8")).hexdigest(), n, left, norm.count("\n"), f))
