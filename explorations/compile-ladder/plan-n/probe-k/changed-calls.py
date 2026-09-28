#!/usr/bin/env python3
"""changed-calls.py <apply-dir> [<log-dir>] [--compare <compare-output>]: the calls whose inference, dispatch
or coercion the rule changes, one entry per distinct difference, from the shadow's lines (run-pass.sh's
<work-dir>/probe/<name>.txt; summarize.py shows them raw).  Each entry: the kind (INFER, DISPATCH, COERCE),
the declaration and where it is declared, the arguments' run-time types, today's static arguments and
the rule's (with the positions the binding or the coercion pass converts, cvN), the first call site met
with the nearest one in the program, and the programs that met it; with --compare, whether each such
program's output or exit changed (compare.py's CHANGED, ORDER, NORMALISED or UNSTABLE line for it).
With a log-mode directory, whether the log pass (today's run, nothing applied) met the same difference.
Paths: the private home is H."""
import collections
import glob
import os
import re
import sys

HOME = '/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/pk/home'


def short(inst):
    """'name[\\decl\\](params):R[\\ARGS\\] (dom)->rng H/file:l:c cv1:T' -> ('[\\ARGS\\]', 'dom', 'cv...')"""
    if inst.startswith('ERROR') or inst.startswith('coerced ') is False and ' (' not in inst:
        return inst[:160]
    m = re.search(r'\\\] \((.*?)\)->\S+ \S+?:\d+:\d+(?:-\d+)?(?::\d+)?((?: cv\d+:.*)?)$', inst)
    if not m:
        return inst[:200]
    end = m.start() + 2                       # just after the static arguments' closing \]
    depth, i = 0, end - 2
    while i > 0:                              # back to the matching [\
        if inst.startswith('\\]', i):
            depth += 1
        elif inst.startswith('[\\', i):
            depth -= 1
            if depth == 0:
                break
        i -= 1
    sargs = inst[i:end]
    cv = m.group(2).strip()
    cv = re.sub(r'cv(\d+):(coerce_\w+)\(x:[^)]*\):.*?(?= cv\d+:|$)', r'cv\1 by \2', cv)
    return '%s dom (%s)%s' % (sargs, m.group(1), (' ' + cv) if cv else '')


def decl(what):
    m = re.match(r'(.*?)(H/\S+?:\d+:\d+(?:-\d+(?::\d+)?)?)$', what)
    if m:
        name = re.sub(r'\[\\.*', '', m.group(1)).strip()
        return name, m.group(2)
    return what[:120], ''


def load(d):
    out = collections.OrderedDict()
    for f in sorted(glob.glob(os.path.join(d, 'probe', '*.txt'))):
        t = os.path.basename(f)[:-4]
        for l in open(f, encoding='utf-8', errors='replace'):
            if not l.startswith('PROBE-K'):
                continue
            l = l.rstrip('\n').replace(HOME, 'H')
            parts = l.split('\t')
            kind = parts[0].split()[1]
            site = parts[-1]
            key = '\t'.join(parts[:-1])
            e = out.setdefault(key, {'kind': kind, 'parts': parts[1:-1], 'sites': [], 'programs': []})
            e['sites'].append(site)
            if t not in e['programs']:
                e['programs'].append(t)
    return out


def main():
    args = sys.argv[1:]
    cmp_file = None
    if '--compare' in args:
        i = args.index('--compare')
        cmp_file = args[i + 1]
        del args[i:i + 2]
    apply_d = args[0]
    log_d = args[1] if len(args) > 1 else None
    status = {}
    if cmp_file:
        for l in open(cmp_file):
            m = re.match(r'^(CHANGED|ORDER|NORMALISED|UNSTABLE|MISSING)\s+(\S+)\s*(.*)', l)
            if m:
                status[m.group(2)] = m.group(1) + ' ' + m.group(3)[:60]
    a = load(apply_d)
    lg = load(log_d) if log_d else {}
    kinds = collections.Counter(e['kind'] for e in a.values())
    print('# %d distinct differences in %s: %s' % (len(a), apply_d, dict(kinds)))
    for n, (k, e) in enumerate(a.items(), 1):
        p = e['parts']
        print('%d. %s' % (n, e['kind']))
        if e['kind'] == 'INFER':
            name, where = decl(p[0])
            print('   declaration: %s  %s' % (name, where))
            print('   arguments:   %s' % p[1].replace('args ', ''))
            print('   today:       %s' % short(p[2].replace('today ', '', 1)))
            print('   rule:        %s' % short(p[3].replace('rule ', '', 1)))
        elif e['kind'] == 'DISPATCH':
            print('   function:    %s' % p[0])
            print('   arguments:   %s' % p[1].replace('args ', ''))
            for lab, s in (('today', p[2]), ('rule', p[3])):
                s = s.split(' ', 1)[1]
                co = s.startswith('coerced ')
                s2 = s[len('coerced '):] if co else s
                name = re.split(r'\[\\|\(', s2, 1)[0] if not s2.startswith('ERROR') else s2[:160]
                w = re.search(r' (H/\S+?:\d+:\S+)', s2)
                where = w.group(1) if w else ''
                print('   %-12s %s%s  %s  %s' % (lab + ':', 'by coercion, ' if co else '', name, where,
                                               short(s2) if not s2.startswith('ERROR') else ''))
        else:
            print('   ' + '\n   '.join(x[:260] for x in p))
        print('   first site:  %s' % e['sites'][0])
        progs = e['programs']
        print('   programs (%d): %s' % (len(progs), ' '.join(progs[:15]) + (' ...' if len(progs) > 15 else '')))
        if status:
            for t in progs:
                print('     %s: %s' % (t, status.get(t, 'SAME output and exit')))
        if log_d:
            print('   log pass:    %s' % ('met it in ' + ' '.join(lg[k]['programs'][:8]) if k in lg else 'not met'))
    if log_d:
        extra = [k for k in lg if k not in a]
        print('# met by the log pass and not by the apply pass: %d' % len(extra))
        for k in extra:
            print('   ' + k[:400] + '\n     in ' + ' '.join(lg[k]['programs'][:8]))


if __name__ == '__main__':
    main()
