#!/bin/bash
# baseB-swap.sh to-base|to-edit: for the comparison's base B pass, puts back in the worktree the base's version of
# every file this rung changed that walk reads (the four library files and the tests of ProjectFortress/tests/ the
# rung changed or renamed), and afterwards restores the edit from HEAD. Run from $FORTRESS_HOME with a clean tree.
set -eu
BASE=382b9fe7f225607a8e4f39df7d8c4a441be6b832
F="Library/FortressLibrary.fsi Library/FortressLibrary.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi
   ProjectFortress/LibraryBuiltin/FortressBuiltin.fss ProjectFortress/tests/FlatTowerRungF.fss
   ProjectFortress/tests/RoundHalfEvenRungR.fss ProjectFortress/tests/XXXQQPowerExponent.fss
   ProjectFortress/tests/XXXRadixTenPointNumeral.fss ProjectFortress/tests/XXXRationalUnorderedRungP.fss
   ProjectFortress/tests/XXXRoundNearTieNumeral.fss"
case "${1:?usage}" in
  to-base)
    [ -z "$(git status --porcelain)" ] || { echo "tree not clean" >&2; exit 1; }
    git checkout "$BASE" -- $F ProjectFortress/tests/XXXRR32MixedRungF.fss
    git diff --stat "$BASE" -- Library/ ProjectFortress/LibraryBuiltin/ $F ProjectFortress/tests/XXXRR32MixedRungF.fss
    echo "base restored for: $F ProjectFortress/tests/XXXRR32MixedRungF.fss" ;;
  to-edit)
    git reset -q -- ProjectFortress/tests/XXXRR32MixedRungF.fss
    rm -f ProjectFortress/tests/XXXRR32MixedRungF.fss
    git checkout HEAD -- $F
    git status --porcelain ;;
esac
