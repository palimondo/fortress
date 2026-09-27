#!/bin/bash
# stage.sh <variant> <walk|any|compile> : one DistanceMulti run over the library copy
# $W/libs/<variant> (distance-triage/run.sh's step `stage`, unchanged), with the JVM's temp
# directory private to this run, then the distinct errors with whole messages
# (distance-triage/fullerrs.py) into $W/full-<variant>-<setting>.tsv.
set -u
OUT=/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-C
W=$OUT/work; T=/home/user/fortress/explorations/perf-probes/prelude/distance-triage
v=$1; s=$2
mkdir -p "$W/tmp/$v-$s"
EXTRA_FLAGS="-Djava.io.tmpdir=$W/tmp/$v-$s" $T/run.sh "$W" stage "$v" "$s"
python3 $T/fullerrs.py "$W/stage-$v-$s.out" > "$W/full-$v-$s.tsv"
rm -rf "$W/tmp/$v-$s"
echo "full-$v-$s.tsv: $(wc -l < "$W/full-$v-$s.tsv") distinct errors"
