#!/bin/bash
# walk-copy.sh <scratch> <variant> [test ...] : the team's array tests under walk against a library copy
# (lib-variants.py's variant, or L0 for the unchanged copy).  Each test is copied into the copy's directory,
# whose path then leads walk's lookup path (Shell.sourcePath prepends the program's own directory), and run
# with one private cache per variant.  Captures: captures/walk-<variant>-<test>.txt beside this script, the
# first line naming the machine and load.  Never removes /tmp/fortress*rats.
set -u
H=${FORTRESS_HOME:?source an env with FORTRESS_HOME}; cd "$H"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_THREADS=${FORTRESS_THREADS:-1}; unset JAVA_TOOL_OPTIONS
HERE=$H/explorations/reviews/array-design-ways
W=${1:?scratch}; V=${2:?variant}; shift 2; mkdir -p "$W"; W=$(cd "$W" && pwd)
TESTS=${*:-"vectorOps matrixOps ArrayScalarExtension ArrayOperatorsBesideLibrary FlatTowerRungF TabulateRungA sparseMatrix"}
L=$W/walk-libs/$V; C=$W/walk-cache-$V
rm -rf "$L" "$C"; mkdir -p "$L" "$C/tmp" "$HERE/captures"; printf '\0\0\0\0' > "$C/global.map"
cp Library/*.fsi Library/*.fss ProjectFortress/LibraryBuiltin/*.fsi ProjectFortress/LibraryBuiltin/*.fss "$L/"
[ "$V" = L0 ] || python3 "$HERE/lib-variants.py" "$L" "$V" || exit 1
CP=$(bin/fortress_classpath | tail -1)
for t in $TESTS; do
  cp "ProjectFortress/tests/$t.fss" "$L/"
  O=$HERE/captures/walk-$V-$t.txt
  { echo "# walk $t against library copy $V $(date -u +%FT%TZ); nproc=$(nproc); load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git rev-parse --short HEAD)"
    cd "$L"; S=$(date +%s)
    FORTRESS_CACHES="$C" timeout -k 10 1200 java -Xmx4g -Xss64m -Djava.io.tmpdir="$C/tmp" -cp "$CP" com.sun.fortress.Shell walk "$t.fss" 2>&1 \
      | grep -v '^\s*at \|^java.lang.Throwable\|Turn on "-debug' | sed "s#$L/##g"
    echo "exit ${PIPESTATUS[0]}; elapsed $(( $(date +%s) - S )) s"; cd "$H"; } > "$O" 2>&1
  echo "$V $t: $(tail -1 "$O")"
done
rm -rf "$C"
