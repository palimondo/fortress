#!/bin/bash
# guards.sh <work-dir> <shadow-classes-dir>: the two expected-failure tests that guard the ellipsis rule,
# ProjectFortress/compiler_tests/XXX3q.test (Compiled3.q) and XXX10p.test (Compiled10.p), run as plain
# compiles (`Shell compile <file>` from compiler_tests/, as their .test files do), each with a private
# cache: with the tree's classes, and with the TypeHierarchyChecker shadow under each accommodation
# switch. Prints each run's stderr lines that the .test file's compile_err_equals pins.
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=${1:?usage}; S=$(cd "${2:?usage}" && pwd); mkdir -p "$W"; W=$(cd "$W" && pwd)
CP=$(./bin/fortress_classpath 2>/dev/null | tail -1)
echo "# $(date -u +%FT%TZ); nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/^[^:]*: *//'); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1)"
for t in Compiled3.q Compiled10.p; do
  for m in tree shadow-off relax narrow; do
    case $m in tree) PRE=""; FL="";; shadow-off) PRE="$S:"; FL="";;
                relax) PRE="$S:"; FL="-Dprobe.aicw.eligibleRelax=true";; narrow) PRE="$S:"; FL="-Dprobe.aicw.eligibleNarrow=true";; esac
    C="$W/c-$t-$m"; T="$W/t-$t-$m"; rm -rf "$C" "$T"; mkdir -p "$C" "$T"
    ( cd ProjectFortress/compiler_tests && timeout -k 10 600 java -Xmx2g -Xss64m -Djava.io.tmpdir="$T" -Dfortress.caches="$C" $FL \
        -cp "$PRE$CP" com.sun.fortress.Shell compile "$t.fss" ) > "$W/$t-$m.txt" 2>&1
    rc=$?; rm -rf "$C" "$T"
    echo "## $t, $m (rc=$rc)"
    grep -E "Invalid comprises|should not be extended|has [0-9]+ errors?\." "$W/$t-$m.txt" | sed "s#$FORTRESS_HOME/##g"
  done
done
