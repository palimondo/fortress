#!/bin/bash
# run-heavy.sh <step>... : the probe's longer runs, one at a time (the machine is shared), in order.
#   comp     the compiled path: library caches, then Fable's one-shape compiled cases, RuleCRun and the
#            two expected-failure compiler tests of rows 401 and 388, compiled and run, stock and rule
#   tcheck   the compiler's type checker with the trace on RuleC and measure-D's DComp
#   ctests   the compiler's type checker over the gate's compiler-test files, stock and rule
#   mg       microGPT's two programs on L0, A0 and A0T2, stock and rule
#   dist     the distance, L0 and A0, walk's setting and any, stock and rule (order in the step)
set -u
D="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$D/env.sh"
FC=$FORTRESS_HOME/explorations/reviews/numerics-plan-fable/probes/one-shape/comp
CASES=$(cd $FC && ls *.fss | sed 's/\.fss$//')
for step in "$@"; do
  echo "== $step start $(date -u +%FT%TZ) load $(cut -d' ' -f1-3 /proc/loadavg)"
  case $step in
    comp)
      for v in stock rule; do bash "$D/comp.sh" libcache $v; done
      for v in stock rule; do
        bash "$D/comp.sh" cases $v "$FC" $CASES
        bash "$D/comp.sh" cases $v "$D/probes" RuleCRun
        bash "$D/comp.sh" cases $v "$S/compiler_tests" XXXNatLitArgChecker XXXCoercionGenericFnCompiledRungC
      done ;;
    tcheck)
      for v in instr rule-instr; do
        bash "$D/tcheck.sh" $v "$D/probes" RuleC "$D/small"
        bash "$D/tcheck.sh" $v "$FORTRESS_HOME/explorations/reviews/numerics-plan-coordinator/probes-D/small" DComp "$D/small"
      done ;;
    ctests)
      for v in stock rule; do bash "$D/ctests.sh" $v; done
      python3 "$FORTRESS_HOME/explorations/reviews/numerics-plan-coordinator/probes-D/ctests/diff-ctests.py" \
        "$D/ctests/typecheck-stock.txt" "$D/ctests/typecheck-rule.txt" > "$D/ctests/diff.txt" ;;
    mg)
      for lib in L0 A0 A0T2; do for p in c4 apl; do for v in stock rule; do bash "$D/mg.sh" $lib $p $v; done; done; done ;;
    dist)
      # the rule on today's library first (measure-D's stock runs of the same sources are on file),
      # then A0's pairs, then today's library's stock runs again, so that each pair is this probe's own
      for r in "L0 walk rule" "L0 any rule" "A0 walk stock" "A0 walk rule" "A0 any stock" "A0 any rule" "L0 walk stock" "L0 any stock"; do
        bash "$D/dist.sh" $r; done ;;
  esac
  echo "== $step end $(date -u +%FT%TZ)"
done
