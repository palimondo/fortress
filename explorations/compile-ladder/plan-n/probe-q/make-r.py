#!/usr/bin/env python3
"""make-r.py <home-eq1> <out-dir>

Writes lib-r.patch, applied by homes.sh after lib-switch.patch and lib-eq1.patch: device A, the
numeral at an AnyIntegral parameter (the shift amounts and exponents: LSHIFT, RSHIFT, ^, shift),
written as the library writes a numeral's conversion into a number type, a coerce(x: IntLiteral) in
AnyIntegral, which reads the numeral as Q1 does, ZZ32, or ZZ64 or ZZ for a value ZZ32 cannot hold.
The alternatives (a ZZ32 declaration beside each AnyIntegral one, as the compiler library declares
its shifts and exponents at ZZ32; IntLiteral extends AnyIntegral) are named in PROBE-Q.md, not built.
"""
import difflib, os, sys

home, out = sys.argv[1], sys.argv[2]
HEAD = "trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end\n"
edits = {
    'Library/FortressLibrary.fsi': HEAD.replace(" end\n", "\n") + "    coerce(x: IntLiteral)\nend\n",
    'Library/FortressLibrary.fss': HEAD.replace(" end\n", "\n") +
        "    (* Probe Q, device A: a numeral at an AnyIntegral parameter reads as Q1 reads it. *)\n"
        "    coerce(x: IntLiteral) =\n"
        "        if (x >= -2147483648) AND (x <= 2147483647) then x.asZZ32\n"
        "        elif (x >= -9223372036854775808) AND (x <= 9223372036854775807) then x.asZZ64\n"
        "        else x.asZZ end\n"
        "end\n",
}
patch = []
for f, new in edits.items():
    text = open(os.path.join(home, f)).read()
    assert text.count(HEAD) == 1, f
    t2 = text.replace(HEAD, new)
    patch += difflib.unified_diff(text.splitlines(True), t2.splitlines(True), 'a/' + f, 'b/' + f)
open(os.path.join(out, 'lib-r.patch'), 'w').write(''.join(patch))
print('lib-r.patch', len(patch), 'lines')
