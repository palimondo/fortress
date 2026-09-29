#!/bin/bash
# sk-walk.sh <edit|base> <dir> <Name>: <dir>/<Name>.fss under walk from an empty private cache, on this
# worktree (edit) or on tmp/skbase (base: git archive of 382b9fe7f's bin, Library, LibraryBuiltin with this
# worktree's build and third_party linked in); captured to <dir>/<Name>.<edit|base>.txt.
# FORTRESS_AUTOHOME is set too, since the library path is taken from it and the build link would otherwise resolve to the worktree.
W=/home/user/fortress-rr32
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64; export PATH="$JAVA_HOME/bin:$PATH"; unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}
case "${1:?usage}" in edit) H=$W ;; base) H=$W/tmp/skbase ;; *) echo usage; exit 2 ;; esac
export FORTRESS_HOME=$H FORTRESS_AUTOHOME=$H
P=$(cd "${2:?usage}" && pwd); N=${3:?usage}
C="$W/tmp/sk-c-$1-$N"; T="$W/tmp/sk-t-$1-$N"
rm -rf "$C" "$T"; mkdir -p "$C" "$T"; printf '\0\0\0\0' > "$C/global.map"
CP=$(FORTRESS_CACHES=$C "$H/bin/fortress_classpath" | tail -1)
cd "$P"
{ echo "# sk-walk.sh $1 $N $(date -u +%FT%TZ); worktree $(git -C $W rev-parse --short HEAD); FORTRESS_HOME=$H; nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | grep -m1 version); FORTRESS_THREADS=$FORTRESS_THREADS"
  FORTRESS_CACHES="$C" timeout -k 10 900 java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Djava.io.tmpdir="$T" -cp "$CP" com.sun.fortress.Shell walk "$N.fss" 2>&1
  echo "rc=$?"; } > "$P/$N.$1.txt" 2>&1
rm -rf "$C" "$T"
cat "$P/$N.$1.txt"
