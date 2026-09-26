#!/bin/bash
# Second judgement: the rung's two new tests outside the harness, compiled once, run compiled 5 times at FORTRESS_THREADS=1
# and at 4 (first line of output and exit code per run), then walked once at each count.  usage: sk2-tests-both.sh [N]
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
N=${1:-5}
CT=$FH/ProjectFortress/compiler_tests
machine; echo "# build: $(git -C $FH log -1 --format=%h); source edits in the working tree: [$(git -C $FH status --short -- ProjectFortress/src | tr "\n" " ")]"
for c in NatRtClosure NatRtBigSize; do
  clean $c
  echo "################################ $c.fss"
  (cd $CT && timeout 300 $FH/bin/fortress compile $c.fss 2>&1 | filt | head; echo "compile exit=${PIPESTATUS[0]}")
  for th in 1 4; do
    for i in $(seq 1 $N); do
      out=$(cd $CT && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress run $c 2>&1); rc=$?
      echo "compiled FORTRESS_THREADS=$th run $i exit=$rc: $(echo "$out" | grep -v '^\s*at ' | tail -2 | cut -c1-160 | tr '\n' '|')"
    done
  done
  for th in 1 4; do
    echo "---------- walk, FORTRESS_THREADS=$th"
    (cd $CT && FORTRESS_THREADS=$th timeout 120 $FH/bin/fortress $c.fss 2>&1 | filt | head -6; echo "exit=${PIPESTATUS[0]}")
  done
  clean $c
done
