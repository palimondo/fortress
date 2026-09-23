#!/usr/bin/env python3
# Rung C: compare two parse-tree dumps (bin/fortress parse -out) of one library file before and
# after an edit that only inserts lines, with every source position in the later dump mapped
# back to the earlier file's line numbering; see REPORT.md.
# usage: ast-compare.py <base-commit> <library-file> <pre.tfs> <post.tfs>
# Exit 0: identical; 2: the only differences are span ends moved onto inserted lines; 1: otherwise.
# Source positions occur in spans (@L:C, @L:C~C, @L:C~L:C, with or without a quoted path) and in
# the parser's location-derived unambiguous names (_text="_|Library|FortressLibrary.fss:L:C-C").
# The directory part of the file's path, in quoted spans and in the names, is dropped from both
# dumps, so that the base version can be parsed from a scratch directory (parse-compare.sh).
import re, subprocess, sys
base, lib, pre, post = sys.argv[1:5]
diff = subprocess.run(["git", "diff", "-U0", base, "--", lib], capture_output=True, text=True, check=True).stdout
inserted = []
for l in diff.splitlines():
    if l.startswith("@@"):
        old, new = l.split()[1], l.split()[2]
        if not old.endswith(",0"):
            sys.exit("the edit is not insert-only: " + l)
        start, _, count = new[1:].partition(",")
        inserted += range(int(start), int(start) + int(count or 1))
def old_line(n):
    if n in inserted:
        return "INSERTED%d" % n
    return str(n - sum(1 for k in inserted if k < n))
SPAN = re.compile(r'(@(?:"[^"]*":)?)(\d+):(\d+)(?:~(\d+)(?::(\d+))?)?')
NAME = re.compile(r'(FortressLibrary\.fs[si]):(\d+):(\d+)(?:-(\d+)(?::(\d+))?)?')
counts = {"span": 0, "name": 0}
def remap(m, kind, sep):
    counts[kind] += 1
    head, l1, c1, x, c2 = m.groups()
    s = "%s%s:%s" % (head + (":" if kind == "name" else ""), old_line(int(l1)), c1)
    if x is not None:
        s += sep + (("%s:%s" % (old_line(int(x)), c2)) if c2 is not None else x)
    return s
PATH = re.compile(r'@"[^"]*/(FortressLibrary\.fs[si])":')
NAMEPATH = re.compile(r'_text="_\|[^"]*?\|(Library\|FortressLibrary\.fs[si]:)')
def norm(t):
    return NAMEPATH.sub(r'_text="_|\1', PATH.sub(r'@"\1":', t))
text = norm(open(post, encoding="utf-8").read())
text = SPAN.sub(lambda m: remap(m, "span", "~"), text)
text = NAME.sub(lambda m: remap(m, "name", "-"), text)
before = norm(open(pre, encoding="utf-8").read())
print("%s: %d lines inserted; %d spans and %d location-derived names remapped; post dump %s the pre dump"
      % (lib, len(inserted), counts["span"], counts["name"], "IDENTICAL to" if text == before else "DIFFERS from"))
if text != before:
    # Classify: a difference is a "moved span end" when the two dump lines are equal once the end
    # of every span and of every location-derived name is dropped, and the later end lies on an
    # inserted line, i.e. inside the inserted comment.
    import difflib
    a, b = before.splitlines(), text.splitlines()
    END = re.compile(r'(@(?:"[^"]*":)?[^ ~:]+:\d+)~[^ )]+|(FortressLibrary\.fs[si]:[^:]+:\d+)-[^")]+')
    cut = lambda l: END.sub(lambda m: m.group(1) or m.group(2), l)
    moved, other = [], []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag == "equal":
            continue
        if tag == "replace" and i2 - i1 == j2 - j1:
            for x, y in zip(a[i1:i2], b[j1:j2]):
                (moved if cut(x) == cut(y) and "INSERTED" in y else other).append((x, y))
        else:
            other += [(x, None) for x in a[i1:i2]] + [(None, y) for y in b[j1:j2]]
    print("  %d dump lines differ: %d are a span end moved onto an inserted comment line, %d are anything else"
          % (len(moved) + len(other), len(moved), len(other)))
    for x, y in moved + other:
        print("  - %s\n  + %s" % (x.strip() if x else "", y.strip() if y else ""))
    sys.exit(1 if other else 2)
