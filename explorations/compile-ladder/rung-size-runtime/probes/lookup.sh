#!/bin/bash
# The table lookup's cost on a dispatched call (CLIMB-BATCH-5.md section 3, Z, the measurements):
# SzLookupCost.fss, ten million calls per loop, four rounds per run of the four loops interleaved
# (a literal-size arm h[\T\](v: Vec[\T,3\]) dispatched and static; its twin with no size,
# k[\T\](v: Box[\T\]), dispatched and static), three runs, FORTRESS_THREADS=1; then javap of h's dispatcher.
source /home/user/fortress-size/explorations/compile-ladder/rung-size-runtime/probes/common.sh
P=$FH/explorations/compile-ladder/rung-size-runtime/probes
clean SzLookupCost
(cd $P && timeout 300 $FH/bin/fortress compile $P/SzLookupCost.fss 2>&1 | filt; echo "compile exit=${PIPESTATUS[0]}")
for r in 1 2 3; do
  echo "########## run $r"; machine
  (cd $P && timeout 600 $FH/bin/fortress run SzLookupCost 2>&1 | filt; echo "exit=${PIPESTATUS[0]}")
done
J=$FH/tmp/lookup-jar; rm -rf $J; mkdir -p $J
unzip -q -o $FH/default_repository/caches/bytecode_cache/SzLookupCost.jar -d $J 2>/dev/null
echo "########## javap -c of the dispatcher h(Any), SzLookupCost.class"
(cd $J && javap -c -p SzLookupCost.class | sed -n '/ h(fortress.AnyType\$Any);/,/athrow/p')
clean SzLookupCost
