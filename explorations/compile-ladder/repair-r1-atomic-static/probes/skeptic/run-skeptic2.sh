#!/bin/bash
# Second skeptic round: each SQ probe under walk and under compile+run, at 1 and 4 threads.
set -u
LABEL="$1"
cd /home/user/fortress-r1 || exit 1
export JAVA_HOME=/usr/lib/jvm/java-25-openjdk-amd64
export PATH="$JAVA_HOME/bin:$PATH"
unset JAVA_TOOL_OPTIONS
export FORTRESS_HOME=/home/user/fortress-r1
export TMPDIR=/home/user/fortress-r1/tmp
export JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress-r1/tmp"
P="$FORTRESS_HOME/explorations/compile-ladder/repair-r1-atomic-static/probes/skeptic"
OUT="$P/skeptic2-$LABEL.txt"
WORK="$FORTRESS_HOME/ProjectFortress/skprobes"
mkdir -p "$WORK"
cp "$P"/SQ*.fss "$WORK"/ 2>/dev/null
: > "$OUT"
echo "label=$LABEL  date=$(date -Is)  nproc=$(nproc)  java=$(java -version 2>&1 | head -1)" >> "$OUT"
echo "HEAD=$(git rev-parse --short HEAD)  src vs 49ee5e91: [$(git diff 49ee5e91 --stat -- ProjectFortress/src | tail -1)]" >> "$OUT"
cd "$FORTRESS_HOME/ProjectFortress" || exit 1
for n in "$@" ; do
    [ "$n" = "$LABEL" ] && continue
    for cfg in 1 4 ; do
        o=$(FORTRESS_THREADS=$cfg timeout 300 ../bin/fortress "skprobes/$n.fss" 2>&1); rc=$?
        echo "walk     $n THREADS=$cfg exit=$rc :: $(echo "$o" | tr '\n' '|' | cut -c1-400)" >> "$OUT"
    done
    c=$(timeout 600 ../bin/fortress compile "skprobes/$n.fss" 2>&1); rc=$?
    echo "compile  $n exit=$rc :: $(echo "$c" | tr '\n' '|' | cut -c1-500)" >> "$OUT"
    if [ $rc -eq 0 ] ; then
      for cfg in 1 4 ; do
        for r in 1 2 ; do
          o=$(FORTRESS_THREADS=$cfg timeout 300 ../bin/fortress run "$n" 2>&1); rc2=$?
          echo "run      $n THREADS=$cfg run$r exit=$rc2 :: $(echo "$o" | tr '\n' '|' | cut -c1-400)" >> "$OUT"
        done
      done
    fi
    echo "" >> "$OUT"
done
echo "SKEPTIC2_DONE_$LABEL" >> "$OUT"
