#!/bin/bash
# variants.sh: NumMicro under walk on the base and under the three library variants of the numeral
# prototype, each with the Java shadow of numeral-java.patch compiled into tmp/shadow-num. Run from a
# worktree of the base commit with a clean tree; it applies and reverts each patch in turn.
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
H="$(cd "$D/../../../../.." && pwd)"
cd "$H"
source explorations/compile-ladder/plan-6.5/env-noclean.sh
git diff --quiet -- Library ProjectFortress || { echo "tree not clean"; exit 1; }
git apply "$D/numeral-java.patch"
CP=$(bin/fortress_classpath | tail -1); rm -rf tmp/shadow-num; mkdir -p tmp/shadow-num
javac -nowarn -encoding UTF-8 -d tmp/shadow-num -cp "$CP" \
  ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java \
  ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java
git apply -R "$D/numeral-java.patch"
LABEL=base bash explorations/compile-ladder/plan-6.5/walk1.sh "$D" NumMicro > /dev/null
for v in A0 A1 B; do
  git apply "$D/numeral-lib-$v.patch"
  LABEL=$v bash explorations/compile-ladder/plan-6.5/walk1.sh "$D" NumMicro "$H/tmp/shadow-num" > /dev/null
  git apply -R "$D/numeral-lib-$v.patch"
done
