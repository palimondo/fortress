#!/usr/bin/env python3
"""One stripping rule, applied identically to every file counted in
explorations/reviews/run-b-vs-run-b2.md section C.

Rule: remove Fortress block comments (* ... *), including multi-line ones and
the text on the lines they open and close; then remove lines that are blank or
whitespace-only; count what is left.  Nothing else is removed -- component
headers, imports and exports all count.  Harness and fixture files are excluded
by not being passed in.
"""
import re, sys

def strip(text):
    out, depth, buf = [], 0, []
    i = 0
    while i < len(text):
        if text.startswith("(*", i):
            depth += 1; i += 2; continue
        if text.startswith("*)", i) and depth:
            depth -= 1; i += 2; continue
        ch = text[i]
        if depth == 0:
            out.append(ch)
        elif ch == "\n":
            out.append(ch)          # keep line structure; the line may still hold code
        i += 1
    return [l for l in "".join(out).splitlines() if l.strip()]

if __name__ == "__main__":
    total = 0
    for path in sys.argv[1:]:
        n = len(strip(open(path, encoding="utf-8").read()))
        total += n
        print(f"{n:6d}  {path}")
    if len(sys.argv) > 2:
        print(f"{total:6d}  TOTAL")
