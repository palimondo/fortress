#!/bin/bash
# perturb-probe.sh <work-dir>: ReflectiveQuickCheckTest under walk on the flat library with one line put back,
# genZZ.perturb's recursive argument as the base has it ("perturb(obj LSHIFT 32, ..."), through a shadow copy
# of QuickCheck.fss in <work-dir> (Shell.sourcePath: a program's own directory shadows the tree's library).
# Stack frames are dropped from the capture; the exception lines stay.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=$(mkdir -p "$1" && cd "$1" && pwd)
rm -rf "$W/caches"; mkdir -p "$W/caches" "$W/tmp"; printf '\0\0\0\0' > "$W/caches/global.map"
sed 's/perturb(big(widen(obj) LSHIFT 32),/perturb(obj LSHIFT 32,/' Library/QuickCheck.fss > "$W/QuickCheck.fss"
cp Library/QuickCheck.fsi ProjectFortress/tests/ReflectiveQuickCheckTest.fss "$W/"
bash explorations/compile-ladder/rung-flat-tower/machine.sh "row 431 probe: ReflectiveQuickCheckTest, flat library, genZZ.perturb's base line put back in a shadow QuickCheck.fss, walk"
echo "shadow differs from the tree's QuickCheck.fss at:"; diff Library/QuickCheck.fss "$W/QuickCheck.fss"
S=$(date +%s)
FORTRESS_CACHES="$W/caches" JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$W/tmp" timeout 900 ./bin/fortress "$W/ReflectiveQuickCheckTest.fss" < /dev/null > "$W/out.txt" 2>&1
rc=$?
grep -v '^	at \|^	\.\.\. ' "$W/out.txt"
echo "rc=$rc secs=$(( $(date +%s) - S ))"
