#!/bin/bash
# run-small.sh : every small program through the compiled checker against the one library
# (check.sh), stock (instr: the tree plus the trace) against the rule (rule-instr), under walk's
# setting, `any` and the compile path's, on today's library (L0) and on the numeral switch's copy
# (A0); then summarize.py per program and setting into small/<Name>.summary-<setting>.txt.
# The trace-free build `rule` is run once on RuleL and DArg to show the trace changes nothing.
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PD=$D/../numerics-plan-coordinator/probes-D/small
for s in walk any compile; do
  for lib in L0 A0; do
    for v in instr rule-instr; do
      for n in DCtx DArg DMore; do bash "$D/check.sh" $v $s $lib "$PD" $n "$D/small"; done
      for n in RuleL OneShapeW; do bash "$D/check.sh" $v $s $lib "$D/probes" $n "$D/small"; done
    done
  done
done
bash "$D/check.sh" rule walk L0 "$D/probes" RuleL "$D/small"
bash "$D/check.sh" rule walk L0 "$PD" DArg "$D/small"
for s in walk any compile; do
  for n in DCtx DArg DMore; do python3 "$D/summarize.py" "$PD/$n.fss" "$D"/small/$n.{instr,rule-instr}.$s.{L0,A0}.txt > "$D/small/$n.summary-$s.txt"; done
  python3 "$D/summarize.py" "$D/probes/RuleL.fss" "$D"/small/RuleL.{instr,rule-instr}.$s.{L0,A0}.txt > "$D/small/RuleL.summary-$s.txt"
  python3 "$D/summarize.py" --only 'println\(|^ *do [sc]' "$D/probes/OneShapeW.fss" "$D"/small/OneShapeW.{instr,rule-instr}.$s.{L0,A0}.txt > "$D/small/OneShapeW.summary-$s.txt"
done
echo "run-small done $(date -u +%FT%TZ)"
