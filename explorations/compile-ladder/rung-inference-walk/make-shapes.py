#!/usr/bin/env python3
"""make-shapes.py <out-dir>: one program per assertion of ProjectFortress/tests/InferCoercionRungK.fss, the test's
declarations and bindings with the one call printed, since walk's refusals cannot be caught in Fortress; after
probe K's make-shapes.py (explorations/compile-ladder/plan-n/probe-k/)."""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
TEST = os.path.join(HERE, '..', '..', '..', 'ProjectFortress', 'tests', 'InferCoercionRungK.fss')


def main():
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    src = open(TEST).read().split('\n')
    head_end = next(i for i, l in enumerate(src) if l.startswith('run() = do'))
    pre = [l for l in src[1:head_end] if not l.startswith('(*)')]
    body = src[head_end + 1:]
    binds = [l for l in body if re.match(r'\s+\w+: .* = ', l) and 'assert' not in l]
    calls = []
    for l in body:
        m = re.match(r'\s+assert\((.*), "(.*)", "(.*)"\)$', l)
        if m:
            calls.append(m.group(1))
    with open(os.path.join(out, 'list.txt'), 'w') as lst:
        for k, call in enumerate(calls):
            name = 'KS%02d' % k
            label = call.replace('\\', '\\\\').replace('"', '\\"')
            with open(os.path.join(out, name + '.fss'), 'w') as f:
                f.write('component %s\n' % name)
                f.write('\n'.join(pre) + '\n')
                f.write('run() = do\n' + '\n'.join(binds) + '\n')
                f.write('    println("%s: " (%s))\n  end\n\nend\n' % (label, call))
            lst.write(name + '.fss\n')


if __name__ == '__main__':
    main()
