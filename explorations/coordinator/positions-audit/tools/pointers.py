#!/usr/bin/env python3
"""pointers.py: every line of the record that names an entry of POSITIONS.md by its number.

    python3 -I pointers.py 86            (or P-86)
    python3 -I pointers.py 86 --at REV   the files as commit REV holds them

Searches, at the working tree: explorations/coordinator/FACTS.md, POSITIONS.md, PLAN.md,
review-queue.md, HELD.md and BOOT.md; explorations/reviews/open-asks-*.md; and every file under
.claude/skills/. The history files (POSITIONS-history.md, FACTS-history.md) are not searched:
trail.py reads the first, and both only record. A line counts when it holds the number as a word:
P-86 matches, as in "P-86's" or "(P-86)", but P-860 and P-186 do not. A line that names a range
holding the number ("P-85 to P-88") is listed too, marked as a range.
Prints path:line and the line (cut at 400 characters around the number; --whole prints it whole),
grouped by file; the entry's own line in POSITIONS.md is marked.
"""
import fnmatch
import glob
import os
import re
import subprocess
import sys

REPO = '/home/user/fortress'
FILES = ['explorations/coordinator/FACTS.md', 'explorations/coordinator/POSITIONS.md',
         'explorations/coordinator/PLAN.md', 'explorations/coordinator/review-queue.md',
         'explorations/coordinator/HELD.md', 'explorations/coordinator/BOOT.md']
GLOBS = ['explorations/reviews/open-asks-*.md']
TREES = ['.claude/skills']
RANGE = re.compile(r'(?<![\w-])P-(\d+)\s*(?:to|-|–|through)\s*P-(\d+)(?!\d)')


def _git(*a):
    return subprocess.run(['git', '-C', REPO] + list(a), capture_output=True).stdout.decode('utf-8', 'replace')


def files(at=None):
    """The files searched: in the working tree, or at commit `at`."""
    if at:
        listed = _git('ls-tree', '-r', '--name-only', at, '--', *(FILES + ['explorations/reviews'] + TREES)).split('\n')
        return ([f for f in FILES if f in listed] + sorted(f for f in listed if fnmatch.fnmatch(f, GLOBS[0]))
                + sorted(f for f in listed if f.startswith(TREES[0] + '/')))
    out = [f for f in FILES if os.path.exists(os.path.join(REPO, f))]
    for g in GLOBS:
        out += sorted(os.path.relpath(p, REPO) for p in glob.glob(os.path.join(REPO, g)))
    for t in TREES:
        for d, _, fs in sorted(os.walk(os.path.join(REPO, t))):
            for f in sorted(fs):
                out.append(os.path.relpath(os.path.join(d, f), REPO))
    return out


def read(f, at=None):
    if at:
        return _git('show', '%s:%s' % (at, f))
    with open(os.path.join(REPO, f), errors='replace') as fh:
        return fh.read()


def pointers(num, at=None):
    """[(path, line number, line, how)] for P-num; how is 'names' or 'range'."""
    n = int(str(num).replace('P-', ''))
    word = re.compile(r'(?<![\w-])P-%d(?!\d)' % n)
    out = []
    for f in files(at):
        try:
            lines = read(f, at).split('\n')
        except (OSError, UnicodeDecodeError):
            continue
        for k, l in enumerate(lines, 1):
            if word.search(l):
                out.append((f, k, l, 'names'))
            elif any(int(a) < n < int(b) for a, b in RANGE.findall(l)):
                out.append((f, k, l, 'range'))
    return out


def print_pointers(num, out=sys.stdout, width=400, at=None):
    num = num if str(num).startswith('P-') else 'P-%s' % num
    p = lambda *a: print(*a, file=out)
    hits = pointers(num, at)
    own = re.compile(r'^-\s+%s\s' % re.escape(num))
    p('Lines that name %s: %d (FACTS, POSITIONS, PLAN, review-queue, HELD, BOOT, reviews/open-asks-*.md, '
      '.claude/skills/; lines cut at %s characters around the number, --whole for whole lines)'
      % (num, len(hits), width or 'no limit'))
    last = None
    for f, k, l, how in hits:
        if f != last:
            p()
            p('-- %s' % f)
            last = f
        mark = ' [the entry itself]' if f.endswith('POSITIONS.md') and own.match(l) else ''
        mark += ' [a range holding it]' if how == 'range' else ''
        s = l.strip()
        if width and len(s) > width:
            i = re.search(r'(?<![\w-])P-%d(?!\d)' % int(num[2:]), s)
            a = max(0, (i.start() if i else 0) - width // 2)
            s = ('...' if a else '') + s[a:a + width] + ('...' if a + width < len(s) else '')
        p('%s:%d%s: %s' % (f, k, mark, s))
    return hits


def main(argv):
    if not argv or argv[0] in ('-h', '--help'):
        print(__doc__)
        return 0
    width = 0 if '--whole' in argv else 400
    argv = [a for a in argv if a != '--whole']
    at = None
    if '--at' in argv:
        k = argv.index('--at')
        at = argv[k + 1]
        argv = argv[:k] + argv[k + 2:]
    print_pointers(argv[0], width=width, at=at)
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
