#!/bin/bash
# run.sh <scratch> <step>... : decision-d-diff.md's measurement, from anywhere.  Nothing tracked is
# modified; the driver's classes, the C4 copies, the library copy and every cache live under <scratch>.
#
#   build            the distance stage's one-JVM driver and checker shadows (distance-triage/run.sh build)
#   copies           <scratch>/base (run-c4/src as it is), <scratch>/d (base + decision-d.patch), their
#                    two split variants (make-variants.py split) and d-split-e3 (d-split beside a library
#                    copy without the dead sizes, make-variants.py e3)
#   check <copy>...  the compiled checker over the copy's four components against the one library, setting
#                    any (numerics-plan-fable/probes/microgpt-distance.sh's run, without sourcing env.sh,
#                    whose rm of /tmp/fortress*rats would hit other runs); writes <scratch>/mg-<copy>-any.*
#   walk [threads]   MicroGptFlatCheck under walk from a copy of d laid out as run-c4/src is (the goldens and
#                    weights reached through two symlinks), one private cache; FORTRESS_THREADS=threads (1)
#   own <copy>       the copy's own errors, one per line, from mg-<copy>-any.out
set -u
H=/home/user/fortress; cd "$H"
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64 PATH=/usr/lib/jvm/java-25-openjdk-amd64/bin:$PATH
export FORTRESS_HOME=$H FORTRESS_THREADS=${FORTRESS_THREADS:-1} JAVA_FLAGS="-Xmx4g -Xss64m"; unset JAVA_TOOL_OPTIONS
O=$H/explorations/reviews/decision-d-diff
W=${1:?scratch}; shift; mkdir -p "$W"; W=$(cd "$W" && pwd)
C4="FlatArrays FlatData MicroGptFlat MicroGptFlatCheck"
machine () { echo "nproc=$(nproc); $(grep -m1 'model name' /proc/cpuinfo | sed 's/.*: //'); $(grep -m1 'cpu MHz' /proc/cpuinfo | sed 's/.*: //') MHz; load $(cut -d' ' -f1-3 /proc/loadavg); $(java -version 2>&1 | head -1); FORTRESS_THREADS=$FORTRESS_THREADS; tree $(git rev-parse --short HEAD)"; }
while [ $# -gt 0 ]; do step=$1; shift; case $step in
build)
  explorations/perf-probes/prelude/distance-triage/run.sh "$W/work" build ;;
copies)
  rm -rf "$W/base" "$W/d" "$W/base-split" "$W/d-split" "$W/d-split-e3"
  mkdir -p "$W/base"; cp explorations/run-c4/src/*.fsi explorations/run-c4/src/*.fss "$W/base/"
  cp -r "$W/base" "$W/d"; (cd "$W/d" && patch -s -p4 < "$O/decision-d.patch") || exit 1
  for c in base d; do cp -r "$W/$c" "$W/$c-split"; python3 "$O/make-variants.py" "$W/$c-split" split; done
  mkdir -p "$W/d-split-e3"; cp Library/*.fsi Library/*.fss ProjectFortress/LibraryBuiltin/*.fsi ProjectFortress/LibraryBuiltin/*.fss "$W/d-split-e3/"
  python3 "$O/make-variants.py" "$W/d-split-e3" e3; cp "$W/d-split/"* "$W/d-split-e3/" ;;
check)
  L=$1; shift; D=$W/$L; OUT=$W/mg-$L-any
  CP=$(./bin/fortress_classpath 2>/dev/null | tail -1 | sed 's#:[^:]*/default_repository/caches/bytecode_cache##')
  ALL="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
  rm -rf "$OUT.caches"; mkdir -p "$OUT.caches/tmp"
  T=""; for c in $C4; do T="$T $D/$c.fss"; done
  { echo "########## DistanceMulti microGPT label=$L setting=any dir=$D"; echo "# jvm flags: $ALL"; echo "# machine: $(machine)"
    date -u +'# start %Y-%m-%dT%H:%M:%SZ'; ST=$(date +%s)
    ( cd "$D" && timeout -k 30 5400 java $JAVA_FLAGS -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$OUT.caches" -Djava.io.tmpdir="$OUT.caches/tmp" $ALL \
         -cp "$W/work/shadow-classes:$W/work/classes:$CP" DistanceMulti -order check -setting any $T )
    echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - ST )) s"; date -u +'# end %Y-%m-%dT%H:%M:%SZ'; } > "$OUT.out" 2>&1
  rm -rf "$OUT.caches"
  python3 explorations/perf-probes/prelude/switch-over-distance/errors.py "$OUT.tsv" "$OUT.out" > "$OUT.tally.txt" 2>&1
  echo "check $L: $(grep ELAPSED "$OUT.out"); $(grep -c '^@@SC ERR' "$OUT.out") error lines, $(grep '^@@SC ERR' "$OUT.out" | grep -c "$D/") at the program's own lines" ;;
own)
  L=$1; shift; grep '^@@SC ERR' "$W/mg-$L-any.out" | grep "$W/$L/[A-Z][A-Za-z]*\.fs[is]:" | grep -v "$W/$L/\(FortressLibrary\|FortressBuiltin\|NativeArray\)" \
    | sed "s#$W/$L/##g" | awk -F'\t' '{print $4}' | sed 's/^ *//' ;;
walk)
  N=${1:-1}; [ $# -gt 0 ] && shift; R=$W/walkroot; C=$W/cache-walk
  rm -rf "$R" "$C"; mkdir -p "$R/c4" "$C/tmp"; printf '\0\0\0\0' > "$C/global.map"
  ln -s "$H/explorations/run-c" "$R/run-c"; ln -s "$H/explorations/apl" "$R/apl"; cp -r "$W/d" "$R/c4/src"
  CP=$(bin/fortress_classpath | tail -1)
  { echo "# walk MicroGptFlatCheck (decision D's copy) $(date -u +%FT%TZ); $(FORTRESS_THREADS=$N machine | sed "s/FORTRESS_THREADS=[0-9]*/FORTRESS_THREADS=$N/")"
    cd "$R/c4/src"; S=$(date +%s)
    FORTRESS_THREADS=$N FORTRESS_CACHES="$C" timeout -k 10 3600 java $JAVA_FLAGS -Djava.io.tmpdir="$C/tmp" -cp "$CP" com.sun.fortress.Shell walk MicroGptFlatCheck.fss 2>&1 \
      | grep -v '^\s*at \|^java.lang.Throwable\|Turn on "-debug'
    echo "exit ${PIPESTATUS[0]}; elapsed $(( $(date +%s) - S )) s"; } > "$W/walk-threads$N.txt" 2>&1
  rm -rf "$C"; tail -3 "$W/walk-threads$N.txt" ;;
*) echo "unknown step $step"; exit 1 ;;
esac; done
