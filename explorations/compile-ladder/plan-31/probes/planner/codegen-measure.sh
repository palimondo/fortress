#!/bin/bash
# codegen-measure.sh <scratch-worktree> <out-dir>: the count of declarations of the one library's fourteen components
# that the code generator refuses, taken the rehearsal's way (switch-rehearsal.md, section 3) with the smallest set of
# its hacks that lets the F-34 probe reach every component: the naming tables and converters of its hack 2
# (NamingCzar, Naming, FortressMethodAdapter), the trait table's search of its hack 5 (TraitTable.scala) and NN32's
# two getters of its hack 6, kept as measure-hacks.patch beside this script. It edits and builds the worktree it is
# given, so give it a scratch worktree seeded from a base build (tools/seed-worktree.sh), never the main tree or a
# base build. Then it runs compile-ladder/plan-25/probes/codegen.sh there. About 60 s for the build and 160 s for
# the probe on an idle machine. On 84f1c37190 it prints: refused declarations 24, kinds 8, emitted 745.
set -eu
W=$(cd "$1" && pwd); O=$2; HERE=$(cd "$(dirname "$0")" && pwd)
cd "$W"; mkdir -p tmp
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_HOME=$PWD FORTRESS_THREADS=1 TMPDIR=$PWD/tmp JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp"
unset JAVA_TOOL_OPTIONS
git apply --check "$HERE/measure-hacks.patch" && git apply "$HERE/measure-hacks.patch"
B=ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
sed -i 's/^\(    getter zero()\): Number = unsigned(0)$/\1: NN32 = unsigned(0)/; s/^\(    getter one()\): Number = unsigned(1)$/\1: NN32 = unsigned(1)/' $B
grep -c 'getter \(zero\|one\)(): NN32 = unsigned' $B | grep -qx 2 || { echo "NN32's two getters not found"; exit 1; }
ant compileAll > tmp/measure-build.txt 2>&1 || { echo "build failed: $W/tmp/measure-build.txt"; exit 1; }
explorations/compile-ladder/plan-25/probes/codegen.sh "$O"
