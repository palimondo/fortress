# Variant: the library's own devices applied to the families the overload sentence's
# clean list names, on a private copy of the apis (the checker reads the .fsi files):
#   CAP            plain "Potemkin" exclusion traits for the three range kinds, the
#                  device of Rank1/2/3 (FortressLibrary.fsi:1074-1084) and AnyMaybe;
#   MIN/MAX        plain marker traits over StandardMin/StandardMax and an excludes
#                  clause on ReadableArray, the device of Vector excludes
#                  { AnyMultiplicativeRing } (FortressLibrary.fsi:1467);
#   juxtaposition  String excludes { AnyMultiplicativeRing }, the same device;
#   StandardMinMax the declaration slip: MIN and MAX return one T, as the bodies do
#                  (FortressLibrary.fss:260-261).
# openRangeHelper and seq are left as they are on purpose (see the judgement).
# Marker names are placeholders for the measurement, not proposals.
import os, sys

ROOT = sys.argv[1]


def edit(path, pairs):
    s = open(path, encoding="utf-8").read()
    for old, new in pairs:
        n = s.count(old)
        assert n == 1, (path, old, n)
        s = s.replace(old, new)
    open(path, "w", encoding="utf-8").write(s)


edit(os.path.join(ROOT, "Library", "RangeInternals.fsi"), [
    ("trait ScalarRange[\\I extends Integral[\\I\\]\\] extends Range[\\I\\]\n",
     "trait AnyScalarRange excludes { AnyRange2D, AnyRange3D } end\n"
     "trait AnyRange2D excludes { AnyRange3D } end\n"
     "trait AnyRange3D end\n\n"
     "trait ScalarRange[\\I extends Integral[\\I\\]\\] extends { Range[\\I\\], AnyScalarRange }\n"),
    ("trait Range2D[\\I extends Integral[\\I\\], J extends Integral[\\J\\]\\]\n    extends Range[\\(I, J)\\]\n",
     "trait Range2D[\\I extends Integral[\\I\\], J extends Integral[\\J\\]\\]\n    extends { Range[\\(I, J)\\], AnyRange2D }\n"),
    ("        K extends Integral[\\K\\]\\]\n    extends Range[\\(I, J, K)\\]\n",
     "        K extends Integral[\\K\\]\\]\n    extends { Range[\\(I, J, K)\\], AnyRange3D }\n"),
])

edit(os.path.join(ROOT, "Library", "FortressLibrary.fsi"), [
    ("trait StandardMin[\\T extends StandardMin[\\T\\]\\]\n",
     "trait AnyStandardMin end\ntrait StandardMin[\\T extends StandardMin[\\T\\]\\] extends AnyStandardMin\n"),
    ("trait StandardMax[\\T extends StandardMax[\\T\\]\\]\n",
     "trait AnyStandardMax end\ntrait StandardMax[\\T extends StandardMax[\\T\\]\\] extends AnyStandardMax\n"),
    ("    opr MIN(self, other:T): (T,T)\n    opr MAX(self, other:T): (T,T)\nend",
     "    opr MIN(self, other:T): T\n    opr MAX(self, other:T): T\nend"),
    ("trait ReadableArray[\\E,I\\]\n        extends { HasRank, Indexed[\\E,I\\], DelegatedIndexed[\\E,I\\] }\n",
     "trait ReadableArray[\\E,I\\]\n        extends { HasRank, Indexed[\\E,I\\], DelegatedIndexed[\\E,I\\] }\n"
     "        excludes { AnyStandardMin, AnyStandardMax }\n"),
    ("trait String extends { StandardTotalOrder[\\String\\], ZeroIndexed[\\Char\\] }\n",
     "trait String extends { StandardTotalOrder[\\String\\], ZeroIndexed[\\Char\\] }\n"
     "        excludes { AnyMultiplicativeRing }\n"),
])
