#!/bin/bash
cd "$(dirname "$0")" || exit 1
echo "=========== p21_patched_library (sum-extensible.patch applied) ==========="
./run.sh p21_patched_library.fss 2>&1 | head -20
echo "=========== p22_naive_patch_probe (needs sum-any-naive.patch instead) ==========="
./run.sh p22_naive_patch_probe.fss 2>&1 | head -6
echo "=========== regression: interpreter tests under the patch ==========="
./regress.sh simpleSum setSum simpleBig naiveSeq restTest restTest2 restTest2a Generator2Test PureListQuick ArrayListQuick 2>&1 | head -45
