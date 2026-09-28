#!/usr/bin/env python3
"""devices.py <home> <src-dir> <out-dir>: the overloading judgement's devices
(reviews/overloading-judgement/variants/overload-devices.py) on a flat directory of library copies,
for probe P1.  <src-dir> holds make-libs.py's four files (FortressLibrary and FortressBuiltin, api and
component); they are copied to <out-dir> with RangeInternals.fsi and .fss from <home>/Library, and the
judgement's edits are applied, each matching exactly once:
  CAP            plain exclusion traits for the three range kinds (Rank1/2/3's device);
  MIN/MAX        plain marker traits over StandardMin and StandardMax, and ReadableArray excludes them
                 (Vector excludes { AnyMultiplicativeRing }'s device);
  juxtaposition  String excludes { AnyMultiplicativeRing }.
The judgement's fourth edit, StandardMinMax's MIN and MAX returning T, landed with climb batch 7's
rung B (de22fd928) and is not repeated.  openRangeHelper and seq are left, as the judgement left them.
Marker names are the judgement's placeholders."""
import os
import shutil
import sys

HOME, SRC, OUT = sys.argv[1:4]
os.makedirs(OUT, exist_ok=True)
for f in os.listdir(SRC):
    shutil.copy(os.path.join(SRC, f), os.path.join(OUT, f))
for f in ("RangeInternals.fsi", "RangeInternals.fss"):
    shutil.copy(os.path.join(HOME, "Library", f), os.path.join(OUT, f))


def edit(name, pairs):
    p = os.path.join(OUT, name)
    s = open(p, encoding="utf-8").read()
    for old, new in pairs:
        n = s.count(old)
        assert n == 1, (name, old, n)
        s = s.replace(old, new)
    open(p, "w", encoding="utf-8").write(s)


edit("RangeInternals.fsi", [
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
edit("FortressLibrary.fsi", [
    ("trait StandardMin[\\T extends StandardMin[\\T\\]\\]\n",
     "trait AnyStandardMin end\ntrait StandardMin[\\T extends StandardMin[\\T\\]\\] extends AnyStandardMin\n"),
    ("trait StandardMax[\\T extends StandardMax[\\T\\]\\]\n",
     "trait AnyStandardMax end\ntrait StandardMax[\\T extends StandardMax[\\T\\]\\] extends AnyStandardMax\n"),
    ("trait ReadableArray[\\E,I\\]\n        extends { HasRank, Indexed[\\E,I\\], DelegatedIndexed[\\E,I\\] }\n",
     "trait ReadableArray[\\E,I\\]\n        extends { HasRank, Indexed[\\E,I\\], DelegatedIndexed[\\E,I\\] }\n"
     "        excludes { AnyStandardMin, AnyStandardMax }\n"),
    ("trait String extends { StandardTotalOrder[\\String\\], ZeroIndexed[\\Char\\] }\n",
     "trait String extends { StandardTotalOrder[\\String\\], ZeroIndexed[\\Char\\] }\n"
     "        excludes { AnyMultiplicativeRing }\n"),
])
print("devices ->", OUT)
