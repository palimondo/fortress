#!/usr/bin/env python3
"""make-libs.py <out-dir> [variant ...]: copies of the one library's two api/component pairs
(Library/FortressLibrary.{fsi,fss}, ProjectFortress/LibraryBuiltin/FortressBuiltin.{fsi,fss}) into
<out-dir>/<variant>/, each with the edits of one way to spell AnyIntegral's closure applied. Every
substitution must match exactly once, or the script stops. Run from $FORTRESS_HOME. No tracked file
is written. With no variant named, every variant is made.

The variants (the note's ways, section 3):
  base      no edit: the control, the tree's text in a copy
  open      AnyIntegral without its comprises clause (the team's open-marker practice, AnyMaybe, HasRank)
  apionly   open in the api only; the component keeps the clause
  self      Integral[\\I\\] ... comprises I (the self-type idiom), AnyIntegral's clause kept
  sketch    Integral[\\I\\] without AnyIntegral in its extends clause (the keep-the-rule sketch)
  skexcl    sketch, and Integral[\\I\\] excludes what Number's exclusions gave it in this api
  y2008     the team's 2008 clause on Integral[\\I\\], listing the five, beside AnyIntegral's
  numlist   open, and Number comprises the seven number types instead of { RR64, QQ, AnyIntegral }
  numlist2  open, and Number comprises { RR64, QQ, AnyIntegral } plus the five integer types
  marker    open, and the library's placeholder device for the orders: AnyStandardMin and
            AnyStandardMax, extended by StandardMin and StandardMax and excluded by HasRank
  markeronly  the placeholder device alone, AnyIntegral's clause kept (for the checker's accommodation)
  skmark    skexcl and the placeholder device
"""
import io
import os
import shutil
import sys

FILES = ['Library/FortressLibrary.fsi', 'Library/FortressLibrary.fss',
         'ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi', 'ProjectFortress/LibraryBuiltin/FortressBuiltin.fss']
FSI, FSS = FILES[0], FILES[1]

ANYINT = "trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end\n"
ANYINT_OPEN = "trait AnyIntegral extends { Number } end\n"
INTEGRAL = ("trait Integral[\\I extends Integral[\\I\\]\\] extends "
            "{ StandardTotalOrder[\\I\\], MultiplicativeRing[\\I\\], AnyIntegral }\n")
NUMBER = "        comprises { RR64, QQ, AnyIntegral }\n"
HASRANK = "trait HasRank extends Equality[\\HasRank\\] excludes { Number, AnyMaybe }\n"
SMIN = "trait StandardMin[\\T extends StandardMin[\\T\\]\\]\n"
SMAX = "trait StandardMax[\\T extends StandardMax[\\T\\]\\]\n"
MARKERS = ("(** Place holder for exclusions of StandardMin **)\ntrait AnyStandardMin end\n\n"
           "(** Place holder for exclusions of StandardMax **)\ntrait AnyStandardMax end\n\n")

# The non-generic traits of this api that exclude Number (grep 'excludes.*Number'
# Library/FortressLibrary.fsi), which reach an Integral[\I\] through Number today and would not
# under the sketch. Rank1 to Rank3 are below HasRank; Generator[\E\], Array1, the strided
# factories' trait and Array3 are generic and cannot be named here without a where clause.
NUMBER_EXCLUDERS = "AnyMaybe, AnyUniqueItem, HasRank"

def both(a, b):
    return {FSI: [(a, b)], FSS: [(a, b)]}

def merge(*ds):
    out = {}
    for d in ds:
        for k, v in d.items():
            out.setdefault(k, []).extend(v)
    return out

OPEN = both(ANYINT, ANYINT_OPEN)
PLACEHOLDERS = merge(both(SMIN, MARKERS + "trait StandardMin[\\T extends StandardMin[\\T\\]\\] extends AnyStandardMin\n"),
                     both(SMAX, "trait StandardMax[\\T extends StandardMax[\\T\\]\\] extends AnyStandardMax\n"),
                     both(HASRANK, HASRANK.replace("{ Number, AnyMaybe }",
                                                   "{ Number, AnyMaybe, AnyStandardMin, AnyStandardMax }")))
VARIANTS = {
    'base': {},
    'open': OPEN,
    'apionly': {FSI: [(ANYINT, ANYINT_OPEN)]},
    'self': both(INTEGRAL, INTEGRAL[:-1] + " comprises I\n"),
    'sketch': both(INTEGRAL, INTEGRAL.replace(", AnyIntegral }", " }")),
    'skexcl': both(INTEGRAL, INTEGRAL.replace(", AnyIntegral }", " }")[:-1]
                   + "\n        excludes { " + NUMBER_EXCLUDERS + " }\n"),
    'y2008': both(INTEGRAL, INTEGRAL[:-1] + " comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }\n"),
    'numlist': merge(OPEN, both(NUMBER, "        comprises { RR64, QQ, ZZ, ZZ64, ZZ32, NN64, NN32 }\n")),
    'numlist2': merge(OPEN, both(NUMBER, "        comprises { RR64, QQ, AnyIntegral, ZZ, ZZ64, ZZ32, NN64, NN32 }\n")),
    'marker': merge(OPEN, PLACEHOLDERS),
    'markeronly': PLACEHOLDERS,
    'skmark': merge(both(INTEGRAL, INTEGRAL.replace(", AnyIntegral }", " }")[:-1]
                         + "\n        excludes { " + NUMBER_EXCLUDERS + " }\n"), PLACEHOLDERS),
}


def make(out, name):
    d = os.path.join(out, name)
    if os.path.isdir(d):
        shutil.rmtree(d)
    os.makedirs(d)
    subs = VARIANTS[name]
    for f in FILES:
        s = io.open(f, encoding='utf-8', newline='').read()
        for a, b in subs.get(f, []):
            n = s.count(a)
            if n != 1:
                sys.exit('%s %s: %d matches for %r' % (name, f, n, a[:90]))
            s = s.replace(a, b)
        io.open(os.path.join(d, os.path.basename(f)), 'w', encoding='utf-8', newline='').write(s)
    print('%-9s %d edit(s) -> %s' % (name, sum(len(v) for v in subs.values()), d))


if __name__ == '__main__':
    out = sys.argv[1]
    for name in (sys.argv[2:] or sorted(VARIANTS)):
        make(out, name)
