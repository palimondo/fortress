#!/bin/bash
# run.sh: RR32Micro and RR32Div2 under walk on the base tree, with rr32-sibling.patch (the first shape) and
# with rr32-sibling-api.patch (the first shape plus RR32's operators declared in its api); then the corpus
# pass on a patched tree (count-run.sh), compared with two base passes (compare-normalised.py), as the
# commented lines say. Run from $FORTRESS_HOME on a clean tree.
set -u
D=explorations/compile-ladder/plan-6.5/probes/rr32
W=explorations/compile-ladder/plan-6.5/walk1.sh
LABEL=base bash $W $D RR32Micro > /dev/null
git apply $D/rr32-sibling.patch
LABEL=sibling bash $W $D RR32Micro > /dev/null
LABEL=sibling bash $W $D RR32Div2 > /dev/null
# the corpus pass of the first shape: bash explorations/compile-ladder/plan-6.5/count-run.sh tmp/p-rr32 explorations/compile-ladder/plan-6.5/count-list.txt
git apply -R $D/rr32-sibling.patch
git apply $D/rr32-sibling-api.patch
LABEL=sibling-api bash $W $D RR32Micro > /dev/null
LABEL=sibling-api bash $W $D RR32Div2 > /dev/null
# the corpus pass of the second shape: bash explorations/compile-ladder/plan-6.5/count-run.sh tmp/p-rr32api explorations/compile-ladder/plan-6.5/count-list.txt
# the comparison, patched tree in place (its line map is git diff against the base):
#   python3 explorations/compile-ladder/plan-6.5/compare-normalised.py 2851e5086 explorations/compile-ladder/plan-6.5/count-list.txt tmp/p-baseA tmp/p-baseB tmp/p-rr32api
git apply -R $D/rr32-sibling-api.patch
