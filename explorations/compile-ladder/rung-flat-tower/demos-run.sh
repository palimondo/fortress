#!/bin/bash
# demos-run.sh <flat|base> <list> [work-subdir]: the repair round's demos count (instruction 7; REPORT.md section 20). Each demo of <list> runs
# under walk from a scratch copy of ProjectFortress/demos (so its relative input paths hold), FORTRESS_THREADS=1, a 180 s timeout,
# its own private cache, four JVMs at a time. "base" puts e5414f5bf's copies of the library files this rung edits into the scratch
# copy, beside the demo, where they shadow the tree's (Shell.sourcePath). Logs: tmp/r2/demos/<lib>/log/<demo>.txt, rc= trailer.
set -u
cd "$(dirname "$0")/../../.."
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH="/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH" FORTRESS_HOME="$(pwd)"
unset JAVA_TOOL_OPTIONS
export FORTRESS_THREADS=1
D=$1; L=$2
W=$(pwd)/tmp/r2/demos/${3:-$D}
rm -rf "$W"; mkdir -p "$W/log" "$W/caches" "$W/jtmp"
cp -r ProjectFortress/demos "$W/src"
# wordcount2 reads ProjectFortress/demos/hamlet relative to its working directory (wordcount2.fss:132)
mkdir -p "$W/src/ProjectFortress/demos" && ln -s ../../hamlet "$W/src/ProjectFortress/demos/hamlet"
if [ "$D" = base ]; then
  for f in $(git diff --name-only e5414f5bf HEAD -- Library ProjectFortress/LibraryBuiltin); do git show e5414f5bf:$f > "$W/src/$(basename $f)"; done
fi
export CP=$(./bin/fortress_classpath 2>/dev/null | tail -1) W
one () {
  t=$(basename "$1" .fss)
  mkdir -p "$W/caches/$t"; printf '\0\0\0\0' > "$W/caches/$t/global.map"
  s=$(date +%s)
  ( cd "$W/src" && FORTRESS_CACHES="$W/caches/$t" timeout -k 10 180 java -Xmx2g -Xss64m -Djava.io.tmpdir="$W/jtmp" -Dfile.encoding=UTF-8 \
      -cp "$CP" com.sun.fortress.Shell walk "$t.fss" < /dev/null > "$W/log/$t.txt" 2>&1 )
  rc=$?
  printf '\nrc=%s secs=%s\n' "$rc" "$(( $(date +%s) - s ))" >> "$W/log/$t.txt"
}
export -f one
echo "start $(date -u +%FT%TZ) load: $(cut -d' ' -f1-3 /proc/loadavg) library: $D"
xargs -a "$L" -n 1 -P 4 bash -c 'one "$0"'
echo "done $(date -u +%FT%TZ)"
