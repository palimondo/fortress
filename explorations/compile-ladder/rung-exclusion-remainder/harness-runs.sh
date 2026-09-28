#!/bin/bash
# harness-runs.sh <scratch-root>: the testSystem harness (rung-interp-coercion/harness-one.sh, SystemJUTest with
# build.xml's systemShard settings) over rung H's two new tests: on the edited tree; on the base library
# (a copy of ff1649cea's FortressLibrary.{fsi,fss} heading FORTRESS_SOURCE_PATH); and, for the expected failure,
# on the edited library with the deliberate local fix of row 457 (Comparison's LEXICO given the compiler
# prelude's body), which must make the harness report the expected failure missing.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
R=${1:?usage}; H=explorations/compile-ladder/rung-interp-coercion/harness-one.sh
SP () { echo ";$1;.;$FORTRESS_HOME/ProjectFortress/LibraryBuiltin;$FORTRESS_HOME/Library;$FORTRESS_HOME/ProjectFortress/test_library"; }
T1=ProjectFortress/tests/ExclusionRemainderRungH.fss; T2=ProjectFortress/tests/XXXLexicoUnorderedRungH.fss
run () { echo; echo "## $1"; bash explorations/compile-ladder/rung-exclusion-remainder/machine.sh "$1"; echo "HEAD $(git rev-parse --short HEAD); FORTRESS_SOURCE_PATH=${FORTRESS_SOURCE_PATH:-unset}"; shift; bash $H "$@" 2>&1 | grep -v '^	at \|^Rats! Parser\|^Processing /\|^Note: '; echo "[status ${PIPESTATUS[0]}]"; }
run "(a) the edited tree, both tests" "$R/a" $T1 $T2
FORTRESS_SOURCE_PATH=$(SP "$FORTRESS_HOME/tmp/libs/base") run "(b) the base library ff1649cea, both tests" "$R/b" $T1 $T2
FORTRESS_SOURCE_PATH=$(SP "$FORTRESS_HOME/tmp/libs/lexfix-final") run "(c) the edited library with row 457's deliberate fix, the expected failure" "$R/c" $T2
rm -rf "$R"
