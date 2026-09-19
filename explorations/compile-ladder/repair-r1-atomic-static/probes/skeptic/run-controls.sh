#!/bin/bash
set -u
LABEL="$1"
shift
cd /home/user/fortress-r1 || exit 1
source experiment/env.sh >/dev/null 2>&1
export TMPDIR=/home/user/fortress-r1/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-r1/tmp"
P="$FORTRESS_HOME/explorations/compile-ladder/repair-r1-atomic-static/probes/skeptic"
OUT="$P/skeptic-controls-$LABEL.txt"
WORK="$FORTRESS_HOME/ProjectFortress/skprobes"
mkdir -p "$WORK"
cp "$P"/SK*.fss "$WORK"/ 2>/dev/null
: > "$OUT"
echo "label=$LABEL  date=$(date -Is)  nproc=$(nproc)" >> "$OUT"
echo "src vs 49ee5e91: [$(git diff 49ee5e91 --stat -- ProjectFortress/src | tail -1)]" >> "$OUT"
cd "$FORTRESS_HOME/ProjectFortress" || exit 1
for n in "$@" ; do
    o=$(FORTRESS_THREADS=1 timeout 300 ../bin/fortress "skprobes/$n.fss" 2>&1); rc=$?
    echo "walk     $n exit=$rc :: $(echo "$o" | tr '\n' '|' | cut -c1-500)" >> "$OUT"
    c=$(timeout 600 ../bin/fortress compile "skprobes/$n.fss" 2>&1); rc=$?
    echo "compile  $n exit=$rc :: $(echo "$c" | tr '\n' '|' | cut -c1-500)" >> "$OUT"
    if [ $rc -eq 0 ] ; then
      for cfg in 1 4 ; do
        o=$(FORTRESS_THREADS=$cfg timeout 300 ../bin/fortress run "$n" 2>&1); rc2=$?
        echo "run      $n THREADS=$cfg exit=$rc2 :: $(echo "$o" | tr '\n' '|' | cut -c1-600)" >> "$OUT"
      done
    fi
    echo "" >> "$OUT"
done
echo "SKEPTIC_CONTROLS_DONE_$LABEL" >> "$OUT"
