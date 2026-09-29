#!/usr/bin/env python3
"""summarize.py <work-dir> [<work-dir> ...]: the shadow's difference lines of one or more passes.

run-pass.sh writes, for each program, <work-dir>/probe/<name>.txt: one line per difference the shadow
met, 'PROBE-K <kind>\t<what>\t...\t<site>', kind INFER (a generic call's inference, place 1), DISPATCH
(an overloaded call's choice, place 2, with place 1 inside it) or COERCE (a coercion lookup, place 3).
Prints, per pass: each program with lines, its lines de-duplicated with a count; then the distinct lines
over all programs, with the programs that met each; the work directory's path is replaced by W and the
private home's by H."""
import collections
import glob
import os
import re
import sys

HOME = '/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/pk/home'


def norm(s, d):
    s = s.replace(os.path.abspath(d), 'W').replace(HOME, 'H')
    return s


def main():
    for d in sys.argv[1:]:
        files = sorted(glob.glob(os.path.join(d, 'probe', '*.txt')))
        per = collections.OrderedDict()
        allk = collections.OrderedDict()
        kinds = collections.Counter()
        for f in files:
            t = os.path.basename(f)[:-4]
            lines = [norm(l.rstrip('\n'), d) for l in open(f, encoding='utf-8', errors='replace') if l.startswith('PROBE-K')]
            if not lines:
                continue
            c = collections.Counter(lines)
            per[t] = c
            for l in c:
                kinds[l.split('\t')[0]] += 1
                # the distinct difference, without its site
                key = '\t'.join(l.split('\t')[:-1])
                allk.setdefault(key, []).append(t)
        print('# %s: %d programs ran, %d met a difference; distinct lines by kind: %s'
              % (d, len(glob.glob(os.path.join(d, 'log', '*.txt'))), len(per), dict(kinds)))
        for t, c in per.items():
            print('== %s (%d lines, %d distinct)' % (t, sum(c.values()), len(c)))
            for l, k in c.items():
                print('   %dx %s' % (k, l))
        print('# distinct differences over all programs, without the site: %d' % len(allk))
        for k, ts in allk.items():
            print('-- %s\n   in %d: %s' % (k, len(ts), ' '.join(ts[:12]) + (' ...' if len(ts) > 12 else '')))


if __name__ == '__main__':
    main()
