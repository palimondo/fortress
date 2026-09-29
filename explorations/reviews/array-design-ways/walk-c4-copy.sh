#!/bin/bash
# walk-c4-copy.sh <scratch> <variant> : C4's check program (explorations/run-c4/src, unchanged) under walk against a
# library copy (lib-variants.py's variant): the copy and C4's sources in one directory laid out as run-c4/src is,
# the goldens and weights reached by two symlinks (decision-d-diff/rebase-2026-09-29/run.sh's walk step), one
# private cache, FORTRESS_THREADS=1.  Capture: captures/walk-c4-<variant>.txt.  Never removes /tmp/fortress*rats.
set -u
H=${FORTRESS_HOME:?source an env with FORTRESS_HOME}; cd "$H"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
unset JAVA_TOOL_OPTIONS
HERE=$H/explorations/reviews/array-design-ways
W=${1:?scratch}; V=${2:?variant}; mkdir -p "$W"; W=$(cd "$W" && pwd)
RT=$W/c4root-$V; C=$W/c4cache-$V
rm -rf "$RT" "$C"; mkdir -p "$RT/c4/src" "$C/tmp" "$HERE/captures"; printf '\0\0\0\0' > "$C/global.map"
ln -s "$H/explorations/run-c" "$RT/run-c"; ln -s "$H/explorations/apl" "$RT/apl"
cp Library/*.fsi Library/*.fss ProjectFortress/LibraryBuiltin/*.fsi ProjectFortress/LibraryBuiltin/*.fss "$RT/c4/src/"
python3 "$HERE/lib-variants.py" "$RT/c4/src" "$V" || exit 1
cp explorations/run-c4/src/*.fsi explorations/run-c4/src/*.fss "$RT/c4/src/"
CP=$(bin/fortress_classpath | tail -1); O=$HERE/captures/walk-c4-$V.txt
{ echo "# walk MicroGptFlatCheck against library copy $V $(date -u +%FT%TZ); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=1; tree $(git rev-parse --short HEAD)"
  cd "$RT/c4/src"; S=$(date +%s)
  FORTRESS_THREADS=1 FORTRESS_CACHES="$C" timeout -k 10 3600 java -Xmx4g -Xss64m -Djava.io.tmpdir="$C/tmp" -cp "$CP" com.sun.fortress.Shell walk MicroGptFlatCheck.fss 2>&1 \
    | grep -v '^\s*at \|^java.lang.Throwable\|Turn on "-debug'
  echo "exit ${PIPESTATUS[0]}; elapsed $(( $(date +%s) - S )) s"; } > "$O" 2>&1
rm -rf "$C"; tail -2 "$O"
