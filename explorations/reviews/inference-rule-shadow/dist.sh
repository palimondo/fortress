#!/bin/bash
# dist.sh <lib: L0|A0> <setting: walk|any> <variant: stock|rule>
# The distance: the compiled checker over the twelve prelude components of a library copy in one
# JVM, every stage and declaration, the overload memo off -- distance-triage/run.sh's step `stage`
# (the measurement of switch-over-distance-flat.md, the gate's distance stage's method,
# coordinator/tools/distance/run.sh) -- with this probe's frozen classpath and, for `rule`, the
# shadow classes ahead of it. The library copies and the driver's classes are distance-triage/run.sh's
# steps `lib L0`, `lib A0` and `build`, run into $X/work-dist before the batch could change the tree.
# -> $X/dist/stage-<lib>-<setting>-<variant>.out (the run), and here dist/run-<...>.txt (its header,
#    crashes and timing), dist/full-<...>.tsv (fullerrs.py), dist/table-<...>.txt (the gate stage's table.py)
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
LIB=$1; SET=$2; V=$3
W=$X/work-dist; P=$FORTRESS_HOME/explorations/perf-probes/prelude/distance-triage
SH=""; [ "$V" != stock ] && SH="$X/classes-$V:"
ALL="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
COMPONENTS="FortressLibrary RangeInternals FortressBuiltin NativeArray List String FlatString Stream NatReflect TypeProxy Writer AnyType"
T=""; for c in $COMPONENTS; do T="$T $W/libs/$LIB/$c.fss"; done
mkdir -p "$X/dist"; out=$X/dist/stage-$LIB-$SET-$V
rm -rf "$out.caches"; mkdir -p "$out.caches/tmp"
{ echo "########## DistanceMulti variant=$LIB setting=$SET checker=$V"; echo "# jvm flags: $ALL"
  echo "# machine: $(machine_line)"; echo "# tree $(git -C $FORTRESS_HOME rev-parse --short HEAD) (snapshot of $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2))"
  date -u +'# start %Y-%m-%dT%H:%M:%SZ'; B=$(date +%s)
  ( cd "$FORTRESS_HOME" && timeout -k 30 5400 java $JAVA_FLAGS -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$out.caches" -Djava.io.tmpdir="$out.caches/tmp" $ALL \
       -cp "$SH$W/shadow-classes:$W/classes:$CP" DistanceMulti -order check -setting $SET $T )
  echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - B )) s"; date -u +'# end %Y-%m-%dT%H:%M:%SZ'; } > "$out.out" 2>&1
rm -rf "$out.caches"
D=$O/dist; tag=$LIB-$SET-$V
python3 "$P/fullerrs.py" "$out.out" > "$D/full-$tag.tsv"
{ grep -P '^# |^#########|^### done|^### all|^ELAPSED|^exit=|^@@SC CRASH\t|^@@TC DECL-CRASH|^### target-crash' "$out.out" \
    | sed -e "s#$W/libs/[^/]*/##g" -e "s#$X#<X>#g" | cut -c1-240
  echo "distinct errors: $(wc -l < "$D/full-$tag.tsv")"; } > "$D/run-$tag.txt"
python3 -B "$FORTRESS_HOME/explorations/coordinator/tools/distance/table.py" "$out.out" 2>&1 | sed "s#$W/libs/[^/]*/##g" > "$D/table-$tag.txt"
echo "dist $tag: $(grep -E '^ELAPSED' "$out.out"); $(wc -l < "$D/full-$tag.tsv") distinct errors"
