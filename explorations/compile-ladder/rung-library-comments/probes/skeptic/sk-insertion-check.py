#!/usr/bin/env python3
# Skeptic's independent check for rung C: the net diff of a library file is pure insertion,
# removing the inserted lines gives the base byte for byte, each inserted run is whole
# comments by a depth scan of the new file, and no insertion point lies inside a comment.
# usage: sk-insertion-check.py <base-commit> <path>
import re, subprocess, sys
base, path = sys.argv[1], sys.argv[2]
old = subprocess.run(['git', 'show', f'{base}:{path}'], capture_output=True, text=True, check=True).stdout
new = open(path, encoding='utf-8').read()
diff = subprocess.run(['git', 'diff', '-U0', base, '--', path], capture_output=True, text=True, check=True).stdout
minus = [l for l in diff.splitlines() if l.startswith('-') and not l.startswith('---')]
added = set()
for m in re.finditer(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@', diff, re.M):
    s, c = int(m.group(3)), int(m.group(4) or 1)
    added.update(range(s, s + c))
nl = new.split('\n')
rebuilt = '\n'.join(l for i, l in enumerate(nl, 1) if i not in added)
print(f'{path}: {len(minus)} deleted lines, {len(added)} inserted lines')
print(f'  new minus inserted == base: {rebuilt == old}')
# depth scan over the new file: '(*)' opens a line comment (at depth 0 it ends at the newline;
# inside a block comment it is three characters of text), '(*' opens and '*)' closes a block.
depth_at_line_start, depth, i, line, linecom = {}, 0, 0, 1, False
depth_at_line_start[1] = (0, False)
while i < len(new):
    ch = new[i]
    if ch == '\n':
        linecom = False if depth == 0 else linecom
        line += 1; depth_at_line_start[line] = (depth, linecom); i += 1; continue
    if linecom:
        if new.startswith('(*)', i): i += 3; continue
        if new.startswith('(*', i): depth += 1; i += 2; continue   # nested block on the line
        if new.startswith('*)', i) and depth > 0: depth -= 1; i += 2; continue
        i += 1; continue
    if depth == 0 and new.startswith('(*)', i): linecom = True; i += 3; continue
    if depth > 0 and new.startswith('(*)', i): i += 3; continue
    if new.startswith('(*', i): depth += 1; i += 2; continue
    if new.startswith('*)', i) and depth > 0: depth -= 1; i += 2; continue
    i += 1
ok = True
for ln in sorted(added):
    text = nl[ln - 1]
    d0, lc0 = depth_at_line_start[ln]
    starts_comment = text.lstrip().startswith('(*')
    if d0 == 0 and not lc0 and not starts_comment:
        print(f'  line {ln}: inserted line is code at depth 0: {text!r}'); ok = False
first_lines = [ln for ln in sorted(added) if ln - 1 not in added]
last_lines = [ln for ln in sorted(added) if ln + 1 not in added]
for a, b in zip(first_lines, last_lines):
    before = depth_at_line_start[a]
    after = depth_at_line_start.get(b + 1, (depth, False))
    print(f'  run {a}-{b}: depth before {before[0]}, depth after {after[0]}')
    if before[0] != 0 or after[0] != 0: ok = False
print(f'  RESULT: {"every inserted run is whole comments at depth 0" if ok else "FAIL"}')
