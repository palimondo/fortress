#!/bin/bash
# mg.sh <lib: L0|A0> <prog: c4|apl> <variant: stock|rule>
# microGPT's own components through the compiled checker against the one library, every stage and
# declaration, the overload memo off, under the switch-over's setting `any`: the distance driver
# pointed at the programs (numerics-plan-fable/probes/microgpt-distance.sh), with the programs'
# sources copied beside the library copy so that the copy shadows the tree's library, as that script
# did for A0, and here for L0 too. The frozen classpath; `rule` puts the shadow classes ahead.
# -> mg/<prog>-<lib>-<variant>.own.tsv (fullerrs.py's rows at the programs' own files),
#    mg/<prog>-<lib>-<variant>.run.txt (header, per-target timing, totals)
set -u
source "$(dirname "${BASH_SOURCE[0]}")/env.sh"
LIB=$1; PROG=$2; V=$3
W=$X/work-dist; P=$FORTRESS_HOME/explorations/perf-probes/prelude/distance-triage
case $PROG in
  c4)  SRC=$S/run-c4;  COMPS="FlatArrays FlatData MicroGptFlat MicroGptFlatCheck";;
  apl) SRC=$S/apl-mg;  COMPS="AplMgSyntax FlatArrays2 FlatData2 AplMg MicroGptApl MicroGptAplCheck";;
esac
SH=""; [ "$V" != stock ] && SH="$X/classes-$V:"
ALL="-Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false"
D=$X/mg/$LIB-$PROG-$V; rm -rf "$D"; mkdir -p "$D/caches/tmp"
cp "$W/libs/$LIB"/*.fs? "$D/"; cp "$SRC"/*.fsi "$SRC"/*.fss "$D/"
T=""; for c in $COMPS; do T="$T $D/$c.fss"; done
out=$D/run.out; tag=$PROG-$LIB-$V
{ echo "########## DistanceMulti microGPT prog=$PROG lib=$LIB setting=any checker=$V"; echo "# jvm flags: $ALL"
  echo "# machine: $(machine_line)"; echo "# tree $(git -C $FORTRESS_HOME rev-parse --short HEAD) (snapshot of $(sed -n 2p "$O/snapshot.txt" | cut -d' ' -f2))"
  date -u +'# start %Y-%m-%dT%H:%M:%SZ'; B=$(date +%s)
  ( cd "$D" && timeout -k 30 5400 java $JAVA_FLAGS -XX:-OmitStackTraceInFastThrow -Dfortress.caches="$D/caches" -Djava.io.tmpdir="$D/caches/tmp" $ALL \
       -cp "$SH$W/shadow-classes:$W/classes:$CP" DistanceMulti -order check -setting any $T )
  echo "exit=$?"; echo "ELAPSED $(( $(date +%s) - B )) s"; date -u +'# end %Y-%m-%dT%H:%M:%SZ'; } > "$out" 2>&1
rm -rf "$D/caches"
FILES=$(for f in "$SRC"/*.fs?; do basename "$f"; done | paste -sd'|')
python3 "$P/fullerrs.py" "$out" > "$D/full.tsv"
awk -F'\t' -v re="^($FILES):" '$4 ~ re' "$D/full.tsv" > "$O/mg/$tag.own.tsv"
{ grep -P '^# |^#########|^### done|^### all|^ELAPSED|^exit=|^@@SC CRASH\t|^@@TC DECL-CRASH|^### target-crash' "$out" | sed -e "s#$D/##g" -e "s#$X#<X>#g" | cut -c1-240
  echo "distinct errors: $(wc -l < "$D/full.tsv"); at the program's own files: $(wc -l < "$O/mg/$tag.own.tsv")"; } > "$O/mg/$tag.run.txt"
echo "mg $tag: $(grep -E '^ELAPSED' "$out"); $(wc -l < "$O/mg/$tag.own.tsv") own of $(wc -l < "$D/full.tsv")"
