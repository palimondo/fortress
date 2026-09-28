#!/usr/bin/env python3
"""reach-scan.py <file>...: a text scan, not the checker. Lists every name that has, in one file and at column 0
(top level), both a declaration with its own static parameters (name[\\...\\] or opr name[\\...\\])
and one without (name(...) or opr name(...)). For each such name it prints both kinds of
declaration with file and line, so that a reader can see which pairs are in the more-specific
relation (a generic arm whose domain is narrower than a plain arm's is the question's shape).
Functional methods inside traits are not scanned: their static parameters are the trait's."""
import re, sys, collections

decl = re.compile(r'^(?:opr\s+)?(?P<name>[A-Za-z_][A-Za-z0-9_]*|[^\sA-Za-z0-9_(\[]+)\s*(?P<sp>\[\\)?')
skip = re.compile(r'^(component|api|import|export|trait|object|end|value|type|test|property|\(\*|\*|\s|$|var|private)')
by = collections.defaultdict(lambda: {'generic': [], 'plain': []})
for path in sys.argv[1:]:
    for n, line in enumerate(open(path, encoding='utf-8', errors='replace'), 1):
        if skip.match(line):
            continue
        m = decl.match(line)
        if not m:
            continue
        rest = line[m.end():] if not m.group('sp') else line[m.end() - 2:]
        if not m.group('sp') and not rest.lstrip().startswith('('):
            continue
        kind = 'generic' if m.group('sp') else 'plain'
        by[(path, m.group('name'))][kind].append(f"{path}:{n}: {line.strip()[:110]}")
for name in sorted(by):
    d = by[name]
    if d['generic'] and d['plain']:
        print(f"== {name[1]}  ({name[0]})")
        for k in ('plain', 'generic'):
            for s in d[k]:
                print(f"  {k:7} {s}")
