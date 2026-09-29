#!/usr/bin/env python3
"""make-r1.py <home-r> <out-dir>

Writes lib-r1.patch, applied by homes.sh after lib-switch.patch, lib-eq1.patch and lib-r.patch:
ZZ32's comparisons >, >=, <= and CMP stated on ZZ32 itself, in the api and the component, as ZZ64
states them under the team's comment "Argh!  Due to method ambiguities with ZZ, these definitions must
be given explicitly here" (Library/FortressLibrary.fss, trait ZZ64), and as the plan-6.5 probe's
numeral-lib-A1.patch stated them on ZZ32.  Today ZZ32 inherits the four from StandardTotalOrder[\ZZ32\].
"""
import difflib, os, sys

home, out = sys.argv[1], sys.argv[2]
FSI_AT = "    opr <(self, b:ZZ32):Boolean\n"
FSI_ADD = ("    opr >(self, b:ZZ32):Boolean\n    opr >=(self, b:ZZ32):Boolean\n"
           "    opr <=(self, b:ZZ32):Boolean\n    opr CMP(self, b:ZZ32): TotalComparison\n")
FSS_AT = ('    opr <(self, b:ZZ32):Boolean =\n'
          '        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Int$Less")\n')
FSS_ADD = ("    (* Probe Q: stated on ZZ32 itself, as ZZ64 states them. *)\n"
           "    opr >(self, b:ZZ32):Boolean = b < self\n"
           "    opr >=(self, b:ZZ32):Boolean = NOT (self < b)\n"
           "    opr <=(self, b:ZZ32):Boolean = NOT (b < self)\n"
           "    opr CMP(self, b:ZZ32): TotalComparison =\n"
           "        if self < b then LessThan\n"
           "        elif b < self then GreaterThan\n"
           "        else EqualTo end\n")
patch = []
for f, at, add in (('Library/FortressLibrary.fsi', FSI_AT, FSI_ADD), ('Library/FortressLibrary.fss', FSS_AT, FSS_ADD)):
    text = open(os.path.join(home, f)).read()
    assert text.count(at) == 1, f
    t2 = text.replace(at, at + add)
    patch += difflib.unified_diff(text.splitlines(True), t2.splitlines(True), 'a/' + f, 'b/' + f)
open(os.path.join(out, 'lib-r1.patch'), 'w').write(''.join(patch))
print('lib-r1.patch', len(patch), 'lines')
