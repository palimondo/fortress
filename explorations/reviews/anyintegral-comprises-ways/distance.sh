#!/bin/bash
# distance.sh <work-dir> <label> <lib-dir> [shadow-classes-dir] [-Dname=value ...]
# The gate's distance stage (explorations/coordinator/tools/distance/run.sh, setting "any") on a library
# copy, with an optional shadow ahead of the classpath and extra JVM switches. The tracked run.sh is not
# edited: a copy is made in <work-dir> at every run by three text edits, each checked to match once:
#   1. the two components the copy replaces, Library/FortressLibrary.fss and
#      ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, are named from <lib-dir>, and
#      FORTRESS_SOURCE_PATH puts <lib-dir> first, so that their apis come from the copy too;
#   2. the shadow classes directory, if given, goes first on the checker's classpath;
#   3. the -D switches are added to the run's flags.
# Writes <work-dir>/distance-<label>.txt (the table) and keeps <work-dir>/dist-<label>/ (run.txt, errors.tsv).
set -u
cd "$(dirname "$0")/../../.."                               # $FORTRESS_HOME
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)" FORTRESS_THREADS=1
unset JAVA_TOOL_OPTIONS
W=${1:?usage}; LBL=${2:?usage}; L=$(cd "${3:?usage}" && pwd); shift 3
SH=""; if [ $# -gt 0 ] && [ -d "$1" ]; then SH="$(cd "$1" && pwd)"; shift; fi
mkdir -p "$W"; W=$(cd "$W" && pwd)
R="$W/distance-run-$LBL.sh"
python3 - "$R" "$L" "$SH" "$*" <<'PY'
import sys
out, lib, sh, flags = sys.argv[1:5]
s = open('explorations/coordinator/tools/distance/run.sh').read()
edits = [
 ('rm -rf "$SCRATCH/shadow-src"',
  'COMPONENTS=$(echo $COMPONENTS | sed "s#Library/FortressLibrary.fss#%s/FortressLibrary.fss#; s#ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#%s/FortressBuiltin.fss#")\n'
  'export FORTRESS_SOURCE_PATH=";%s;.;$FH/ProjectFortress/LibraryBuiltin;$FH/Library;$FH/ProjectFortress/test_library"\n'
  'rm -rf "$SCRATCH/shadow-src"' % (lib, lib, lib)),
 ('-cp "$SCRATCH/shadow-classes:$SCRATCH/classes:$CP" DistanceMulti',
  '-cp "%s$SCRATCH/shadow-classes:$SCRATCH/classes:$CP" DistanceMulti' % (sh + ':' if sh else '')),
 ('-Dfortress.caches="$SCRATCH/caches" $FLAGS \\',
  '-Dfortress.caches="$SCRATCH/caches" $FLAGS %s \\' % flags),
]
for a, b in edits:
    if s.count(a) != 1:
        sys.exit('distance.sh: %d matches for %r' % (s.count(a), a))
    s = s.replace(a, b)
open(out, 'w').write(s)
PY
[ -f "$R" ] || exit 1
bash "$R" "$W/distance-$LBL.txt" "$W/dist-$LBL" any > "$W/distance-$LBL.log" 2>&1
echo "rc=$?" >> "$W/distance-$LBL.log"
grep -c "$L/FortressLibrary" "$W/dist-$LBL/run.txt" | sed 's/^/lines naming the copy: /'
head -12 "$W/distance-$LBL.txt"
