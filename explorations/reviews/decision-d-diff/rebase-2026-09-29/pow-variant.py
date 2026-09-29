#!/usr/bin/env python3
"""pow-variant.py <dir> : a diagnostic copy for the re-measurement, not part of the diff and not a proposed
model change.  Since climb batch N's rung I (8dc1a74d9) the compiled checker against the one library refuses
10.0^(-5) and beta1^t as an ambiguous coercion (RR64's ^ on RR64 against MultiplicativeRing's ^ on ZZ64, both
reached only by coercion), and the refusal ends the check of the enclosing block.  This copy writes each such
power so that one declaration applies without coercion (a numeral power as the decimal it denotes, a ZZ32
exponent widened), on the same lines, so that the rest of the step and of Adam is checked."""
import sys
d = sys.argv[1]
edits = {
  'MicroGptFlat.fss': [('10.0^(-5)', '0.00001'), ('10.0^(-8)', '0.00000001'), ('-(10.0^10)', '-10000000000.0'),
                       ('beta1^t', 'beta1^(widen(t))'), ('beta2^t', 'beta2^(widen(t))')],
  'MicroGptFlatCheck.fss': [('10.0^(-12)', '0.000000000001'), ('10.0^(-8)', '0.00000001'), ('10.0^(-6)', '0.000001')],
}
for f, es in edits.items():
    p = d + '/' + f; s = open(p).read()
    for a, b in es:
        n = s.count(a)
        if n == 0: sys.exit('%s: %r not found' % (f, a))
        s = s.replace(a, b)
    open(p, 'w').write(s)
print('pow: written')
