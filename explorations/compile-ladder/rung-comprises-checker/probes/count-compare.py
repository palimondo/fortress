#!/usr/bin/env python3
"""count-compare.py <narrow-base.txt> <pre-errors> <post-errors>: the count stage's error lists set against
each other, source positions masked (a line number or column after .fsi/.fss becomes L) and the Library/
prefix dropped, since the ways note's copy ran from a library directory and this rung from the tree.
<narrow-base.txt> is the ways note's capture (its '#errors' section, errlist.py's lines); the other two are
errlist.py's output over this rung's runs. Prints the pre->post move, the post list against the ways note's,
and each list's errors by the operator or method they name."""
import collections
import re
import sys

MASK = re.compile(r'\.(fsi|fss):\d+(:\d+)?(-\d+(:\d+)?)?')


def norm(e):
    return MASK.sub(r'.\1:L', e.strip().replace('Library/', ''))


def read_list(path, section=None):
    lines = open(path, encoding='utf-8').read().splitlines()
    if section:
        lines = lines[lines.index(section) + 1:]
    return [l for l in lines if l.strip() and not l.startswith('#')]


def name_of(e):
    msg = e.split(' :: ', 1)[1]
    m = re.match(r'Invalid overloading of (\S+) in', msg) or re.match(r'For (\S+), the return type', msg)
    return (('overloading ' if msg.startswith('Invalid') else 'return type ') + m.group(1)) if m else msg[:60]


def diff(title, a, b, la, lb):
    ca, cb = collections.Counter(map(norm, a)), collections.Counter(map(norm, b))
    only_a, only_b = ca - cb, cb - ca
    print('## %s: %d only in %s, %d only in %s' % (title, sum(only_a.values()), la, sum(only_b.values()), lb))
    for e in sorted(only_a.elements()):
        print('< ' + e)
    for e in sorted(only_b.elements()):
        print('> ' + e)
    print()


def by_name(title, errs):
    c = collections.Counter(name_of(norm(e)) for e in errs)
    print('## %s by name (%d errors): %s' % (title, len(errs), ', '.join('%s %d' % kv for kv in sorted(c.items(), key=lambda kv: (-kv[1], kv[0])))))


ways, pre, post = read_list(sys.argv[1], '#errors'), read_list(sys.argv[2]), read_list(sys.argv[3])
print('# count-compare.py: the ways note narrow-base (%d errors), this rung pre-edit (%d), post-edit (%d)\n' % (len(ways), len(pre), len(post)))
diff('pre-edit against post-edit', pre, post, 'pre', 'post')
diff('ways note narrow-base (81f0151be, shadow switch on) against post-edit (this base, the edit landed)', ways, post, 'narrow-base', 'post')
new = list((collections.Counter(map(norm, post)) - collections.Counter(map(norm, pre))).elements())
gone = list((collections.Counter(map(norm, pre)) - collections.Counter(map(norm, post))).elements())
both = collections.Counter(new) & collections.Counter(map(norm, ways))
print('## the %d errors the edit brought in, against the ways note narrow-base: %d of them in its list, %d not; the %d the edit removed: %s\n'
      % (len(new), sum(both.values()), len(new) - sum(both.values()), len(gone), '; '.join(gone)))
for e in sorted((collections.Counter(new) - both).elements()):
    print('not in the ways note: ' + e)
by_name('the edit brought in', new)
by_name('ways note narrow-base', ways)
by_name('post-edit', post)
by_name('pre-edit', pre)
