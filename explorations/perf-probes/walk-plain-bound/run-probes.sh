#!/bin/bash
# run-probes.sh <tree> <outdir> [probe names...]: runs each probe under walk with <tree>'s bin/fortress,
# each in its own empty private caches folder, four at a time; writes <outdir>/<probe>.txt ending rc=N.
set -u
T=$1; O=$2; shift 2
P=$(cd "$(dirname "$0")/probes" && pwd)
mkdir -p "$O"; O=$(cd "$O" && pwd)
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_HOME=$T FORTRESS_THREADS=1 TMPDIR=$T/tmp JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$T/tmp"
unset JAVA_TOOL_OPTIONS
if [ $# -eq 0 ]; then set -- $(cd $P && ls *.fss | sed 's/\.fss$//'); fi
one () {
  n=$1; c=$O/caches-$n; rm -rf "$c"; mkdir -p "$c"
  ( cd $P && FORTRESS_CACHES=$c timeout 600 $FORTRESS_HOME/bin/fortress $n.fss ) > $O/$n.txt 2>&1
  echo "rc=$?" >> $O/$n.txt; rm -rf "$c"
}
export -f one; export O P
printf '%s\n' "$@" | xargs -P4 -I{} bash -c 'one {}'
for n in "$@"; do printf '%-18s %s\n' "$n" "$(grep -v '^rc=' $O/$n.txt | grep -v '^\s*$' | head -3 | cut -c1-200 | tr '\n' '|')$(tail -1 $O/$n.txt)"; done
