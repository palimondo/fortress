#!/bin/bash
# junit.sh <label> <dir-of-tests> <Name.test>... : the compiled test harness (fortress junit) over the named
# .test files in one run, in the order given, as climb batch N's merged-tests/junit.sh ran it, with each named
# component's cache entries removed before and after. First line: the machine line (protocol.md, principle 2).
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=${FORTRESS_THREADS:-1}
unset JAVA_TOOL_OPTIONS
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$(pwd)/tmp"
FH=$FORTRESS_HOME; L=${1:?label}; D=$(cd "${2:?dir}" && pwd); shift 2
mkdir -p $FH/tmp/junit-$$
cd "$FH/ProjectFortress"
CP=$(../bin/fortress_classpath | tail -1)
echo "# junit.sh $L $(date -u +%FT%TZ); nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | cut -d: -f2 | sed 's/^ //') MHz; load at start $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git -C $FH rev-parse --short HEAD)$(git -C $FH diff --quiet HEAD -- ProjectFortress/src Library || echo ' with its working changes'); build ${BUILD_NOTE:-ProjectFortress/build}; tests from ${D#$FH/}"
clean () { for t in "$@"; do n=$(sed -n 's/^tests=//p' "$D/$t" | head -1); [ -n "$n" ] && find ../default_repository/caches -name "*$n*" -exec rm -rf {} + 2>/dev/null; done; }
clean "$@"
T=(); for t in "$@"; do T+=("$D/$t"); done
java -Xmx4g -Xss64m -Djava.io.tmpdir=$FH/tmp/junit-$$ -Dfile.encoding=UTF-8 -cp "$CP" com.sun.fortress.Shell junit "${T[@]}" 2>&1 | sed "s#$FH/##g" | grep -v '^\s*at ' | cut -c1-400
echo "exit=${PIPESTATUS[0]}"
clean "$@"
rm -rf $FH/tmp/junit-$$
