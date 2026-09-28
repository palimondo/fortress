# The briefing and checks lists of climb batch 7C's two rungs (CLIMB-BATCH-7C.md, section 7),
# keys of explorations/coordinator/tools/facts-extract.sh. Run as a script, it checks each list
# with the tool's --check on the tree at $FORTRESS_HOME: every key must match exactly one place.
# The form is batch 7R's lists7r.py (explorations/compile-ladder/plan-7r/manifest/).
SRC = 'ProjectFortress/src/com/sun/fortress'
THC = SRC + '/scala_src/typechecker/TypeHierarchyChecker.scala'
W = 'explorations/reviews/anyintegral-comprises-ways'
JDG = 'explorations/reviews/anyintegral-comprises-judgement.md'
TYPES = 'Documentation/Specification/Prose/Language/types.tick'

K_DECISION = "positions:2026-09-28 comprises clause four options"
K_PARKED = "positions:2026-09-21 library commit"
K_STOPS = "positions:2026-09-27 stops a batch record reserves"
K_RECOMMEND = "doc:" + JDG + "#3. The recommendation"
K_TYPES_COMPRISES = "code:" + TYPES + "#comprises} clause,..corresponding instantiations of the generic type in this set"
K_TYPES_DETERMINES = "code:" + TYPES + "#We say that one generic type..with the corresponding arguments of"
K_WW_GRAMMAR = "code:Papers/Welterweight/grammar.tick#the comprises clause, if present..to one of the comprised types"
K_WW_DTRAIT = "code:Papers/Welterweight/fig-wellformeddecls.tick#[D-Trait]"
K_RULE = "code:" + THC + "#S does not have any comprises clause, or (already checked)..private def comprisesContains"
K_SITE = "code:" + THC + "#val comprises = toSet(si.comprisesTypes)..should not be extended"
K_SHADOW = "doc:" + W + "/shadow-thc.py"
K_LIB = "code:Library/FortressLibrary.fsi#trait AnyIntegral extends { Number } comprises..MultiplicativeRing["
K_NOTE = "code:Specification/basic/traits.tex#If a trait declaration of..(see"
K_FROZEN_NOTE = "code:Specification-1.0-frozen/basic/traits.tex#If a trait declaration of..(see"

Y_BRIEFING = [
  K_DECISION, K_PARKED,
  "positions:2026-09-23 exclusion-rule fork", "positions:2026-09-26 lineage note",
  "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-21 library route",
  "positions:2026-09-19 answering the open question", "positions:2026-09-23 checker count",
  "positions:2026-09-26 answer 11", "positions:2026-09-28 nine-steps worker",
  K_STOPS, "positions:2026-09-26 rung D's stop",
  "ledger:459", "ledger:354", "ledger:407",
  "doc:" + JDG + "#1. The type question, in plain words",
  K_RECOMMEND,
  "doc:" + JDG + "#4. What the record does not hold",
  "doc:" + W + ".md#1. The type question",
  "doc:" + W + ".md#Way 10. The parked accommodation, broad form",
  "doc:" + W + ".md#Way 11. The parked accommodation, narrow form",
  "doc:" + W + ".md#6. Re-measured against the record",
  "doc:explorations/perf-probes/nat/zero.md#2. The closure's accommodation",
  K_SHADOW,
  "doc:" + W + "/captures/count/summary.txt",
  "doc:" + W + "/captures/probes/switches.txt",
  "doc:" + W + "/captures/probes/guards.txt",
  "doc:" + W + "/captures/probes/user-integral.txt",
  "doc:" + W + "/probes/UserIntegralTrait.fss",
  K_SITE, K_RULE,
  "doc:ProjectFortress/compiler_tests/Compiled10.i.fss", "doc:ProjectFortress/compiler_tests/XXX10i.test",
  "doc:ProjectFortress/compiler_tests/Compiled9.z.fss", "doc:ProjectFortress/compiler_tests/XXX9z.test",
  "doc:explorations/perf-probes/nat/zero/zElig.fss", "doc:explorations/perf-probes/nat/zero/zElig2.fss",
  K_LIB,
  "code:Specification/basic/traits.tex#A trait reference listed in the..instantiations of parametric traits",
  K_NOTE,
  "code:Specification/basic/traits.tex#The following example trait:..though only",
  K_TYPES_DETERMINES, K_TYPES_COMPRISES, K_WW_GRAMMAR, K_WW_DTRAIT,
  "The tower closure of", "The compiled checker refuses every api-declared trait that extends a trait whose",
  "Crashes reach zero in the shadow", "The hidden layer, classified",
  "The true distance to the switch-over", "The distance to the switch-over by root cause",
  "The team's latest word on types",
  "The static type checker (Scala, scala_src/typechecker/) runs only on the compile path",
  "The XXX expected-failure mechanism in compiler_tests",
  "An XXX compile test pinned by compile_err_contains",
  "ant compileAll deletes a tracked file", "The checker-count stage's table",
  "map:README.md#Touch this@scala_src/typechecker",
]
Y_CHECKS = [
  K_DECISION, K_PARKED, K_STOPS, "ledger:459", "ledger:354",
  K_RECOMMEND,
  "doc:" + W + ".md#Way 11. The parked accommodation, narrow form",
  "doc:explorations/perf-probes/nat/zero.md#2. The closure's accommodation",
  K_SITE, K_RULE, K_SHADOW,
  "doc:ProjectFortress/compiler_tests/Compiled10.i.fss",
  "doc:explorations/perf-probes/nat/zero/zElig.fss", "doc:explorations/perf-probes/nat/zero/zElig2.fss",
  K_TYPES_COMPRISES,
  "The XXX expected-failure mechanism in compiler_tests",
]

X_BRIEFING = [
  K_DECISION, "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
  "positions:2026-09-26 lineage note", "positions:2026-09-23 exclusion-rule fork",
  "positions:2026-09-24 requirement on the plan", K_STOPS, "positions:2026-09-26 rung D's stop",
  "ledger:459", "ledger:354", "ledger:407",
  "doc:" + JDG + "#1. The type question, in plain words",
  K_RECOMMEND,
  "doc:" + W + ".md#1. The type question",
  "doc:Specification/basic/traits.tex#Trait Declarations",
  K_FROZEN_NOTE,
  "doc:Specification/appendices/changes.tex#Where-clause variables in extends clauses",
  "doc:Specification/appendices/changes.tex#Passages not yet revised",
  K_TYPES_DETERMINES, K_TYPES_COMPRISES, K_WW_GRAMMAR, K_WW_DTRAIT,
  K_LIB, K_RULE, K_SHADOW,
  "doc:explorations/coordinator/spec-lineage.md#6. The consequence",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "Specification-1.0-frozen/ is byte for byte", "The team's latest word on types",
  "The specification states instantiation exclusion, and its refused examples",
  "The tower closure of",
  "map:README.md#Touch this@Specification/ (the standard)",
]
X_CHECKS = [
  K_DECISION, "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
  "positions:2026-09-26 lineage note", K_STOPS,
  K_RECOMMEND, K_FROZEN_NOTE, K_TYPES_COMPRISES,
  "doc:Specification/appendices/changes.tex#Where-clause variables in extends clauses",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
]

LISTS = {'Y': (Y_BRIEFING, Y_CHECKS), 'X': (X_BRIEFING, X_CHECKS)}

if __name__ == '__main__':
    import subprocess, re, sys, os
    root = os.environ.get('FORTRESS_HOME', '/home/user/fortress')
    verbose = '-v' in sys.argv
    bad = 0
    for rid, (b, c) in LISTS.items():
        for name, keys in (('briefing', b), ('checks', c)):
            assert len(set(keys)) == len(keys), (rid, name, 'duplicate')
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k)]
            assert not badk, (rid, name, badk)
            if name == 'checks':
                stray = [k for k in keys if k not in b]
                assert not stray, (rid, 'stray', stray)
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys,
                               capture_output=True, text=True, cwd=root)
            lines = r.stdout.strip().splitlines()
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:300])
            if r.returncode or verbose:
                for l in lines: print('   ', l[:300])
            if r.returncode: bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
