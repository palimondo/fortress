#!/bin/bash
# The per-declaration run of rung N (explorations/perf-probes/nat/followup/run-all.sh, its perdecl step;
# explorations/compile-ladder/rung-nat-checker/REPORT.md section 10): PhaseProbe -order typecheck over
# Library/FortressLibrary.fss, tolerant, one line per top-level declaration, with the error texts, on the
# build in ProjectFortress/build; the probe's shadow classes are generated from this tree by make-shadows.sh.
# usage: perdecl.sh <out.txt> <label>
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
OUT=$1; LABEL=$2
DC=explorations/perf-probes/prelude/desugar-codegen
WD=$FH/tmp/perdecl-$LABEL
rm -rf $WD; mkdir -p $WD/caches; printf '\0\0\0\0' > $WD/caches/global.map
$DC/make-shadows.sh "$WD/dc-src" "$WD/dc-classes" > $WD/make-shadows.txt 2>&1 || { echo "make-shadows failed"; cat $WD/make-shadows.txt; exit 1; }
javac -nowarn -cp "$CP" -d "$WD/dc-classes" $DC/PhaseProbe.java || exit 1
{ echo "# PhaseProbe per top-level declaration of Library/FortressLibrary.fss, $LABEL; the @@TC DECLAT stack lines dropped, paths made relative"
  echo "########## PhaseProbe -order typecheck Library/FortressLibrary.fss (tolerant, per declaration, error texts)"
  echo "# $(date -u) load $(cat /proc/loadavg)"; machine; S=$(date +%s)
  timeout 2400 java -Xmx4g -Xss64m -XX:-OmitStackTraceInFastThrow -Dprobe.tolerant=true -Dprobe.dumpErrors=true \
       -Dfortress.caches="$WD/caches" -Djava.io.tmpdir=$FH/tmp -cp "$WD/dc-classes:$CP" \
       PhaseProbe -order typecheck Library/FortressLibrary.fss 2>&1 | grep -v '^@@TC DECLAT' | sed "s#$FH/##g"
  echo "exit=${PIPESTATUS[0]}"; echo "ELAPSED $(( $(date +%s) - S )) s"; } > "$OUT"
