#!/bin/bash
# shapes-run.sh <label>: the one-call programs of make-shapes.py (each assertion of InferCoercionRungK.fss
# alone), the fork's OpAnyZW, the judgement's walk programs (explorations/reviews/option-2-soundness/O2*.fss)
# and the program that measured row 486 (SkNatType), each under walk by walk-run.sh, one JVM at a time with
# a private cache; writes probes/shapes-<label>.txt: per program its printed lines (the error's first two
# lines when it stops) and its exit code. Source explorations/experiment/env.sh first.
set -u
FH=${FORTRESS_HOME:?}
D="$FH/explorations/compile-ladder/rung-inference-walk"
L=${1:?label}
S="$FH/tmp/shapes-$L"
rm -rf "$S" ; mkdir -p "$S"
python3 "$D/make-shapes.py" "$S"
FILES=$(sed "s#^#$S/#" "$S/list.txt")
FILES="$FILES $FH/explorations/reviews/before-n-questions/fork/OpAnyZW.fss"
FILES="$FILES $(ls $FH/explorations/reviews/option-2-soundness/O2*.fss)"
FILES="$FILES $FH/explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkNatType.fss"
"$D/walk-run.sh" $FILES | awk '
  /^# walk-run/ { print; next }
  /^== / { name = $0; print; err = 0; next }
  /^rc=/ { print "   " $0; next }
  /^com.sun.fortress.exceptions/ { err = 2; sub(/^com.sun.fortress.exceptions./, ""); print "   ! " $0; next }
  err > 0 { err--; if ($0 !~ /^Context:/) print "   ! " $0; next }
  /^(Context:|toplevel:|Turn on|java.lang.Throwable|tmp\/walk-run)/ { next }
  NF { print "   " $0 }
' | sed "s#tmp/walk-run/[A-Za-z0-9]*/##g" > "$D/probes/shapes-$L.txt"
rm -rf "$S"
cat "$D/probes/shapes-$L.txt"
