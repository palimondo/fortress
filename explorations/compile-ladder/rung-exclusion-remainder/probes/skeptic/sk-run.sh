#!/bin/bash
# sk-run.sh <Name> [walk-edit|walk-base|compiled]...: the skeptic's differential runner for rung H.
# walk-edit: bin/fortress on the worktree's library; walk-minmax: the same with tmp/skeptic/libs/minmax (TotalComparison
# also extending StandardMinMax[\TotalComparison\]) heading FORTRESS_SOURCE_PATH; walk-base: the same with ff1649cea's
# FortressLibrary.{fsi,fss} heading FORTRESS_SOURCE_PATH; compiled: bin/fortress compile, then run.
# Each mode uses its own private cache directory under tmp/skeptic/, FORTRESS_THREADS=1.
set -u
cd "$(dirname "$0")"; P=$(pwd)
FH=$(cd ../../../../.. && pwd)
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$FH" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
N=$1; shift
head () { echo "--- $N, $1, skeptic of rung H, $(cd $FH && git rev-parse --short HEAD), $(date -u +%FT%TZ)"; echo "nproc $(nproc); $(grep -m1 'model name' /proc/cpuinfo); $(grep -m1 'cpu MHz' /proc/cpuinfo); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | sed -n 1p); FORTRESS_THREADS=1"; }
for m in "$@"; do
  C="$FH/tmp/skeptic/c-$m"; T="$FH/tmp/skeptic/jtmp/$m"; mkdir -p "$C" "$T"
  [ "$m" = compiled ] && [ ! -e "$C/global.map" ] && cp -a "$FH/tmp/skeptic/cc-compiled/." "$C/"
  export FORTRESS_CACHES="$C" JAVA_FLAGS="-Xmx2g -Xss64m -Dfortress.caches=$C -Djava.io.tmpdir=$T"
  O="$P/$N-$m.txt"
  case $m in
    walk-edit) { head "$m"; "$FH/bin/fortress" "$N.fss"; echo "[rc=$?]"; } > "$O" 2>&1 ;;
    walk-base) { head "$m"; FORTRESS_SOURCE_PATH=";$FH/tmp/skeptic/lib-base;.;$FH/ProjectFortress/LibraryBuiltin;$FH/Library;$FH/ProjectFortress/test_library" "$FH/bin/fortress" "$N.fss"; echo "[rc=$?]"; } > "$O" 2>&1 ;;
    walk-minmax) { head "$m"; FORTRESS_SOURCE_PATH=";$FH/tmp/skeptic/libs/minmax;.;$FH/ProjectFortress/LibraryBuiltin;$FH/Library;$FH/ProjectFortress/test_library" "$FH/bin/fortress" "$N.fss"; echo "[rc=$?]"; } > "$O" 2>&1 ;;
    compiled) { head "$m"; echo "## compile"; "$FH/bin/fortress" compile "$N.fss"; echo "[compile rc=$?]"; echo "## run"; "$FH/bin/fortress" run "$N"; echo "[run rc=$?]"; } > "$O" 2>&1 ;;
  esac
  sed -i -e '/^\tat /d' "$O"
  rm -rf "$T"
done
