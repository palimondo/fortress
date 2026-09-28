# The briefing and checks lists of climb batch N's four rungs (CLIMB-BATCH-N.md, section 7),
# keys of explorations/coordinator/tools/facts-extract.sh. Run as a script, it checks each list
# with the tool's --check on the tree at $FORTRESS_HOME: every key must match exactly one place.
# The form is batch 7R's lists7r.py (explorations/compile-ladder/plan-7r/manifest/).
SRC = 'ProjectFortress/src/com/sun/fortress'
TC = SRC + '/scala_src/typechecker'
EV = SRC + '/interpreter/evaluator'
SH = 'explorations/reviews/inference-rule-shadow'
C = 'explorations/reviews/numerics-plan-coordinator'
F = 'explorations/reviews/numerics-plan-fable'

I_BRIEFING = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-26 answer 8", "positions:2026-09-27 numeral's type",
  "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-19 answering the open question",
  "positions:2026-09-21 library route", "positions:2026-09-26 answer 12", "positions:2026-09-22 on planning",
  "positions:2026-09-27 launch of phase 3's batches", "positions:2026-09-27 stops a batch record reserves",
  "positions:2026-09-26 rung D's stop",
  "ledger:401", "ledger:388", "ledger:455", "ledger:447", "ledger:425", "ledger:432", "ledger:79",
  "doc:" + SH + ".md#The answers", "doc:" + SH + ".md#1. The edit", "doc:" + SH + ".md#2. The probes",
  "doc:" + SH + ".md#3. microGPT and row 401", "doc:" + SH + ".md#4. The distance",
  "doc:" + SH + ".md#5. The compiler's tests",
  "doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets",
  "doc:" + SH + "/rule.patch", "doc:" + SH + "/probes/RuleCRun.fss",
  "doc:explorations/reviews/numerics-plan-synthesis.md#Decision 3. The rule and the numeral switch as one batch, before 7b",
  "doc:" + F + ".md#3.1 Face A: inference does not consider coercion",
  "doc:" + F + ".md#3.3 Face C: inference with nothing to infer from",
  "doc:" + C + "/evidence-B.md#3.2 How a static argument is inferred",
  "doc:" + C + "/evidence-B.md#3.3 Whether the expected type is used",
  "doc:" + C + "/evidence-B.md#3.4 Whether a coercion is considered while solving",
  "doc:" + C + "/measure-D.md#1.3 The same drop elsewhere, not changed",
  "doc:" + C + "/measure-D.md#2.2 What else the kept context changes",
  "doc:Specification/basic/inference.tex",
  "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
  "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls",
  "code:" + TC + "/impls/Functionals.scala#def checkApplicable(preCandidate: PreAppCandidate,..def checkApplicableWithoutInference(",
  "code:" + TC + "/impls/Functionals.scala#Type check the application of the given arrow candidates to the given args",
  "code:" + TC + "/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(info, multi, infix, front::rest, true, true)",
  "code:" + SRC + "/scala_src/useful/STypesUtil.scala#def inferStaticParams(fnType: ArrowType,",
  "code:" + TC + "/CoercionOracle.scala#def getCoercionsTo(uu: Type)",
  "code:" + TC + "/CoercionOracle.scala#def substitutableFor(t: Type, u: Type)",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral extends",
  "doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.fss", "doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.test",
  "doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.fss",
  "doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.test",
  "Static arguments are inferred from the arguments alone, on both paths",
  "Keeping the expected type at a call written", "A numeral's type depends on the path and on the library in scope",
  "An inferred generic refuses a coercion that the method it forwards to accepts",
  "MicroGPT's own programs through the compiled checker against the one library",
  "The specification never wrote static-argument inference", "The true distance to the switch-over",
  "The compiled checker refuses a call whose most specific arm has a size the call cannot fix",
  "The compiled type checker checks nat and int static parameters",
  "An XXX compile test pinned by compile_err_contains whose program compiles",
  "The XXX expected-failure mechanism in compiler_tests", "ant compileAll deletes a tracked file",
  "The checker-count stage's table", "map:compile-path-walkthrough.md#How it walks the tree",
  "map:README.md#Touch this@scala_src/typechecker",
]
I_CHECKS = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-26 answer 8", "positions:2026-09-27 stops a batch record reserves",
  "ledger:401", "ledger:388", "ledger:455", "ledger:447",
  "doc:" + SH + ".md#5. The compiler's tests",
  "doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets",
  "doc:" + SH + "/rule.patch", "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
  "code:" + TC + "/impls/Functionals.scala#def checkApplicable(preCandidate: PreAppCandidate,..def checkApplicableWithoutInference(",
  "doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.fss",
  "doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.fss",
  "An XXX compile test pinned by compile_err_contains whose program compiles",
]

K_BRIEFING = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-26 answer 8", "positions:2026-09-27 numeral's type",
  "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-19 answering the open question",
  "positions:2026-09-26 climb batch 4's held push", "positions:2026-09-26 climb batch 5 (coordinator",
  "positions:2026-09-26 answer 9", "positions:2026-09-22 on planning", "positions:2026-09-27 launch of phase 3's batches",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:388", "ledger:389", "ledger:387", "ledger:432", "ledger:20", "ledger:21", "ledger:364", "ledger:424", "ledger:430",
  "doc:" + SH + ".md#The answers", "doc:" + SH + ".md#6. What walk would need",
  "doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets", "doc:" + SH + "/probes/OneShapeW.fss",
  "doc:explorations/reviews/numerics-plan-synthesis.md#Decision 3. The rule and the numeral switch as one batch, before 7b",
  "doc:" + F + ".md#3.1 Face A: inference does not consider coercion",
  "doc:" + C + "/evidence-B.md#4.2 How a generic call's static arguments are inferred",
  "doc:" + C + "/evidence-B.md#4.3 Rung C's coercion at dispatch meets a generic callee",
  "doc:" + C + "/evidence-B.md#8. How the three interact: observations, with their sources",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type",
  "doc:explorations/compile-ladder/rung-interp-coercion/REPORT.md#1. What changed",
  "doc:explorations/compile-ladder/rung-interp-coercion/REPORT.md#5. Decisions",
  "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
  "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls",
  "code:" + EV + "/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction",
  "code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion",
  "code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchInternal",
  "code:" + EV + "/values/Coercions.java#static SingleFcn coercionFor",
  "code:" + EV + "/values/NonPrimitive.java#public List<FValue> typecheckParams",
  "code:" + EV + "/types/FType.java#public static Set<FType> join(List<FValue> evaled)",
  "doc:ProjectFortress/tests/XXXCoercionGenericFnRungC.fss", "doc:ProjectFortress/tests/XXXCoercionGenericTraitRungC.fss",
  "doc:ProjectFortress/tests/roundBug.fss", "code:ProjectFortress/tests/IntSemanticsRungI.fss#zz32Shown(v: Any): String",
  "Under walk, the interpreter converts by coercion at its three kinds of type check",
  "Static arguments are inferred from the arguments alone, on both paths",
  "An inferred generic refuses a coercion that the method it forwards to accepts",
  "A numeral's type depends on the path and on the library in scope", "The one library's number tower is flat",
  "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
  "testSystem's four shards are one suite split by sorted index",
  "The interpreter's overload-ambiguity message names its two declarations", "Three heaps run the interpreter",
  "ant compileAll deletes a tracked file", "map:README.md#Touch this@interpreter/ (evaluator",
]
K_CHECKS = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-26 answer 8", "positions:2026-09-27 stops a batch record reserves",
  "positions:2026-09-26 rung D's stop", "ledger:388", "ledger:389", "ledger:432",
  "doc:" + SH + ".md#6. What walk would need", "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "code:" + EV + "/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction",
  "code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion",
  "code:" + EV + "/values/Coercions.java#static SingleFcn coercionFor",
  "Under walk, the interpreter converts by coercion at its three kinds of type check",
  "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
]

T_BRIEFING = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-26 answer 8", "positions:2026-09-27 numeral's type",
  "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 lineage note",
  "positions:2026-09-24 requirement on the plan", "positions:2026-09-26 number chapters under S2",
  "positions:2026-09-26 answer 9", "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:447", "ledger:425", "ledger:455", "ledger:401", "ledger:388",
  "doc:" + SH + ".md#The answers", "doc:" + SH + ".md#1. The edit",
  "doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets",
  "doc:explorations/reviews/numerics-plan-synthesis.md#Decision 3. The rule and the numeral switch as one batch, before 7b",
  "doc:" + C + "/evidence-B.md#1.2 Static arguments, and the inference chapter the text cites",
  "doc:" + C + "/evidence-B.md#1.3 Coercion at a call and in a typed binding",
  "doc:" + C + "/evidence-B.md#2. The team's later Types chapter and the Types papers",
  "doc:Specification/basic/inference.tex",
  "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
  "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls",
  "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
  "doc:Specification/appendices/changes.tex#Passages not yet revised",
  "doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#5. Decisions taken inside the rung",
  "The specification never wrote static-argument inference", "The team's latest word on types",
  "Specification-1.0-frozen/ is byte for byte", "The specification states instantiation exclusion, and its refused examples",
  "The specification's number chapters describe the flat library",
  "A generic object referenced without its static arguments is a static error on the compiled path",
  "Static arguments are inferred from the arguments alone, on both paths", "Keeping the expected type at a call written",
  "map:README.md#Touch this@Specification/ (the standard)",
]
T_CHECKS = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
  "positions:2026-09-27 stops a batch record reserves", "ledger:447",
  "doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets", "doc:Specification/basic/inference.tex",
  "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
  "doc:Specification/appendices/changes.tex#Passages not yet revised",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "The specification never wrote static-argument inference",
]

Q_BRIEFING = [
  "positions:2026-09-27 numeral's type", "positions:2026-09-27 numerics plans", "positions:2026-09-26 answer 8",
  "positions:2026-09-26 answer 7 catch-all", "positions:2026-09-24 exclusion route rung P's fork",
  "positions:2026-09-19 answering the open question", "positions:2026-09-21 library route",
  "positions:2026-09-19 on the FlatArrays review", "positions:2026-09-22 a design principle",
  "positions:2026-09-26 climb batch 4's held push", "positions:2026-09-26 climb batch 5 (coordinator",
  "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
  "positions:2026-09-27 launch of phase 3's batches", "positions:2026-09-27 stops a batch record reserves",
  "positions:2026-09-26 rung D's stop",
  "ledger:79", "ledger:443", "ledger:454", "ledger:387", "ledger:426", "ledger:432", "ledger:437", "ledger:401",
  "ledger:325", "ledger:318", "ledger:442", "ledger:20",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type",
  "doc:explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch",
  "doc:explorations/compile-ladder/plan-6.5/probes/numeral/numeral-java.patch",
  "doc:" + F + ".md#3.2 Face B: a numeral's type is modelled three ways",
  "doc:" + C + "/evidence-B.md#3.1 Where a numeral gets",
  "doc:" + C + "/evidence-B.md#4.1 A numeral's run-time type",
  "doc:" + C + "/evidence-B.md#5. The compiler library",
  "doc:" + C + "/evidence-B.md#6.2 The library's devices for a number of type T in generic code",
  "doc:" + C + "/evidence-B.md#7.1 Where a numeral meets a non-",
  "doc:" + SH + ".md#2.3 Fable's one-shape cases", "doc:" + SH + ".md#3. microGPT and row 401",
  "doc:" + SH + ".md#4. The distance", "doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets",
  "doc:Specification/basic/expressions/literals.tex#Literals",
  "code:Specification/basic/conversions-coercions.tex#revision{revival-int-float}",
  "doc:Specification/appendices/changes.tex#Integers in floating-point expressions",
  "doc:Specification/appendices/changes.tex#Passages not yet revised",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral extends",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#object IntLiteral extends ZZ32",
  "code:Library/FortressLibrary.fss#The identity of + and of juxtaposition for the number type named by the..multiplicativeIdentity[",
  "code:" + EV + "/values/FIntLiteral.java#public static FValue make(BigInteger v)",
  "code:" + EV + "/values/Simple_fcn.java#protected FValue check(FValue x)",
  "doc:" + SRC + "/interpreter/glue/prim/IntLiteral.java",
  "doc:ProjectFortress/tests/XXXCoercionReturnRungC.fss", "doc:ProjectFortress/tests/NumeralTest.fss",
  "doc:ProjectFortress/tests/litCoercion.fss", "doc:ProjectFortress/tests/XXXextendIntLiteral.fss",
  "A numeral's type depends on the path and on the library in scope",
  "A numeral's value reaches the compiled world intact", "The replacement for SUM's and PROD's catch-all",
  "The one library's number tower is flat", "Under walk, the interpreter converts by coercion at its three kinds of type check",
  "MicroGPT's own programs through the compiled checker against the one library",
  "The distance to the switch-over by root cause", "The specification never wrote static-argument inference",
  "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
  "testSystem's four shards are one suite split by sorted index",
  "The interpreter's overload-ambiguity message names its two declarations", "Three heaps run the interpreter",
  "ant compileAll deletes a tracked file", "map:README.md#Touch this@Library/FortressLibrary.fss and the other",
  "map:README.md#Touch this@interpreter/ (evaluator",
]
Q_CHECKS = [
  "positions:2026-09-27 numeral's type", "positions:2026-09-27 numerics plans", "positions:2026-09-27 stops a batch record reserves",
  "positions:2026-09-26 rung D's stop", "ledger:79", "ledger:443", "ledger:454", "ledger:387",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends",
  "code:" + EV + "/values/FIntLiteral.java#public static FValue make(BigInteger v)",
  "doc:Specification/basic/expressions/literals.tex#Literals",
  "A numeral's type depends on the path and on the library in scope",
]

LISTS = {'I': (I_BRIEFING, I_CHECKS), 'K': (K_BRIEFING, K_CHECKS), 'T': (T_BRIEFING, T_CHECKS), 'Q': (Q_BRIEFING, Q_CHECKS)}

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
                for l in lines:
                    if verbose or 'NOT FOUND' in l or 'not one' in l or 'entries' in l: print('   ', l[:300])
            if r.returncode: bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
