
# The briefing and checks lists of climb batch 6.5's four rungs (CLIMB-BATCH-6.5.md, section 7).
SRC = 'ProjectFortress/src/com/sun/fortress'

E_BRIEFING = [
  "positions:2026-09-27 size's range", "positions:2026-09-22 ledger row 334", "positions:2026-09-24 run-time size design",
  "positions:2026-09-26 fourth batch-5 answer", "positions:2026-09-26 fifth batch-5 answer", "positions:2026-09-21 nat plan",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:418", "ledger:334", "ledger:307",
  "doc:explorations/compile-ladder/rung-size-runtime/JUDGE.md#For Pavol",
  "doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@size's range",
  "doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@size-range",
  "doc:explorations/reviews/batch-3.5-4-conformance.md#Smaller findings, for the record@sign-extended operands",
  "doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters",
  "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#5. NN32's LCM",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#7. What was not probed",
  "doc:explorations/compile-ladder/plan-6.5/probes/lcm/NN32Lcm.walk.txt",
  "code:" + SRC + "/scala_src/typechecker/TypeWellFormedChecker.scala#private val sizeArithmetic..private def hasSizeArithmetic",
  "code:" + SRC + "/scala_src/typechecker/staticenv/KindEnv.scala#def getType",
  "code:" + SRC + "/runtimeSystem/MethodInstantiater.java#public void visitMethodInsn",
  "code:" + SRC + "/interpreter/evaluator/EvalType.java#public static void bindGenericParameters",
  "code:" + SRC + "/interpreter/evaluator/EvalType.java#public FType forIntArg",
  "code:" + SRC + "/interpreter/glue/prim/NN32.java#public static final class Gcd extends NN2N..public static final class Lcm extends NN2N",
  "doc:ProjectFortress/compiler_tests/NatRtBigSize.fss", "doc:ProjectFortress/tests/XXXNatBigSizeWalk.fss",
  "doc:ProjectFortress/compiler_tests/XXXNatArithChecker.fss", "doc:ProjectFortress/compiler_tests/XXXNatArithChecker.test",
  "code:ProjectFortress/tests/IntSemanticsRungI.fss#overflows(f: () -> Any): Boolean =..zz32Shown(v: Any): String =",
  "A size is carried at run time as a descriptor", "The compiled type checker checks nat and int static parameters",
  "A size at run time can follow the opr path", "The interpreter's integer rules", "Under walk, a native can raise a Fortress exception",
  "An XXX compile test pinned by compile_err_contains", "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
  "ant compileAll deletes a tracked file",
  "map:compile-path-walkthrough.md#What the specification says it is", "map:README.md#Touch this@scala_src/typechecker",
  "map:README.md#Touch this@interpreter/ (evaluator",
]
E_CHECKS = [
  "positions:2026-09-27 size's range", "positions:2026-09-22 ledger row 334",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:418", "ledger:334",
  "doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters",
  "code:" + SRC + "/scala_src/typechecker/TypeWellFormedChecker.scala#private val sizeArithmetic..private def hasSizeArithmetic",
  "code:" + SRC + "/interpreter/evaluator/EvalType.java#public static void bindGenericParameters",
  "code:" + SRC + "/interpreter/evaluator/EvalType.java#public FType forIntArg",
  "code:" + SRC + "/interpreter/glue/prim/NN32.java#public static final class Gcd extends NN2N..public static final class Lcm extends NN2N",
  "doc:ProjectFortress/compiler_tests/NatRtBigSize.fss",
  "The compiled type checker checks nat and int static parameters",
]

P_BRIEFING = [
  "positions:2026-09-22 ledger row 335", "positions:2026-09-22 ledger row 334", "positions:2026-09-22 ledger row 333",
  "positions:2026-09-22 ledger row 346", "positions:2026-09-22 design principle for integer semantics",
  "positions:2026-09-24 climb batch 3.5", "positions:2026-09-24 ledger rows 380 and 381",
  "positions:2026-09-24 requirement on the plan", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
  "positions:2026-09-26 lineage note", "positions:2026-09-26 number chapters under S2", "positions:2026-09-26 answer 6",
  "positions:2026-09-19 answering the open question",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:394", "ledger:440", "ledger:443", "ledger:335", "ledger:346",
  "doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1",
  "doc:explorations/compile-ladder/rung-spec-numbers/JUDGE.md#1.5 Example 1 against the numerals",
  "doc:explorations/compile-ladder/rung-spec-numbers/JUDGE.md#1.8 The rows",
  "doc:explorations/reviews/batch-3.5-4-conformance.md#Batch 3.5 as a whole",
  "doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@specification is behind",
  "doc:explorations/reviews/batch-3-conformance.md#Findings that need Pavol@library comment",
  "doc:explorations/reviews/batch-6-conformance.md#Smaller findings, for the record@algebraic supertraits",
  "doc:Specification/basic-lib/basic-integers.tex#Integers",
  "code:Specification/basic-lib/numbers.tex#%% trait QQ..%% end",
  "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators",
  "doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators",
  "doc:Specification/appendices/changes.tex#The integer trait", "doc:Specification/appendices/changes.tex#Passages not yet revised",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#2. The one reading everything rational rests on",
  "doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#5. Decisions taken inside the rung",
  "doc:explorations/compile-ladder/rung-library-comments/REPORT.md#5. How the change was verified",
  "doc:explorations/compile-ladder/plan-6.5/probes/numeral/NumMicro.base.txt",
  "code:Library/FortressLibrary.fsi#trait QQ extends..comprises { ... }",
  "code:Library/FortressLibrary.fss#(*) Scalar extension: an array of numbers..declarations beside these.",
  "code:Library/FortressLibrary.fsi#(*) Scalar extension: an array of numbers..declarations beside these.",
  "The compiled path's integer rules", "The interpreter's integer rules",
  "The specification's number chapters describe the flat library",
  "The specification states instantiation exclusion, and its refused examples", "Specification-1.0-frozen/ is byte for byte",
  "The team's latest word on types", "A comment placed after a declaration that ends in an expression",
  "Citing Specification/library/apis/*.tex as an independent standard is circular", "The one library's number tower is flat",
  "map:README.md#Touch this@Specification/ (the standard)", "index:number chapters",
]
P_CHECKS = [
  "positions:2026-09-22 ledger row 335", "positions:2026-09-22 ledger row 334", "positions:2026-09-22 ledger row 333",
  "positions:2026-09-22 ledger row 346", "positions:2026-09-22 design principle for integer semantics",
  "positions:2026-09-24 climb batch 3.5", "positions:2026-09-24 ledger rows 380 and 381",
  "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 number chapters under S2",
  "positions:2026-09-26 answer 6",
  "ledger:394", "ledger:440", "ledger:443",
  "doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1",
  "code:Specification/basic-lib/numbers.tex#%% trait QQ..%% end",
  "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "code:Library/FortressLibrary.fsi#trait QQ extends..comprises { ... }",
  "The compiled path's integer rules", "The interpreter's integer rules",
]

G_BRIEFING = [
  "doc:explorations/coordinator/PLAN.md#Phase 2b. The repair batch from the conformance reviews",
  "positions:2026-09-26 answer 9", "positions:2026-09-26 answer 7 catch-all", "positions:2026-09-24 run-time size design",
  "positions:2026-09-26 fourth batch-5 answer", "positions:2026-09-24 exclusion route rung P's fork",
  "positions:2026-09-17 a standing preference", "positions:2026-09-19 after climb batch 1 landed",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:417", "ledger:419", "ledger:420", "ledger:351", "ledger:426", "ledger:415",
  "doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@Three compiled-path defects",
  "doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@cannot hold a defect",
  "doc:explorations/reviews/batch-3-conformance.md#Two compiled dispatch defects that stayed out of every list",
  "doc:explorations/reviews/batch-6-conformance.md#Findings that need Pavol@identity on the compiled path",
  "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#2. The design",
  "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#3. The size, measured",
  "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#4. The two side defects",
  "doc:explorations/reviews/sum-replacement-judgement.md#7. Three checks that tell the options apart, still open",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#2. Row 426",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#3. The two compiled dispatch defects",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#4. Row 419",
  "doc:explorations/compile-ladder/plan-6.5/probes/dispatch/callsite-rebased.patch",
  "doc:explorations/compile-ladder/rung-size-runtime/probes/xxx-task-red-demo-fix.patch",
  "doc:explorations/compile-ladder/rung-size-runtime/probes/skeptic/ZsThreadsT.fss",
  "doc:ProjectFortress/compiler_tests/XXXNatRtTask.fss", "doc:ProjectFortress/compiler_tests/XXXNatRtMethBoth.fss",
  "doc:ProjectFortress/library_tests/XXXClauseBindingRungB.fss",
  "code:" + SRC + "/runtimeSystem/InstantiatingClassloader.java#protected Class loadClass(String name, boolean resolve)",
  "code:" + SRC + "/runtimeSystem/RTHelpers.java#static Object loadClosureClass(long l, BAlongTree t,",
  "code:" + SRC + "/runtimeSystem/RttiTupleMap.java#private RTTI putIfNewHelper",
  "code:" + SRC + "/compiler/runtimeValues/RTTIsize.java#public static RTTI of(String size)",
  "code:" + SRC + "/compiler/codegen/CodeGen.java#public void forTypecase(Typecase x)",
  "code:" + SRC + "/compiler/codegen/CodeGen.java#public void forTry(Try x)",
  "code:" + SRC + "/compiler/codegen/CodeGen.java#public String delegate(Expr x",
  "code:" + SRC + "/compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)",
  "code:Library/FortressLibrary.fss#The identity of + and of juxtaposition..multiplicativeIdentity[",
  "Generic instantiations", "The XXX expected-failure mechanism in compiler_tests/", "The gate's thread count is pinned",
  "The replacement for SUM's and PROD's catch-all", "The compile ladder loses one file",
  "Under walk, the interpreter converts by coercion", "A size is carried at run time as a descriptor",
  "ant compileAll deletes a tracked file",
  "map:compile-path-walkthrough.md#6. The run: the second JVM and the class loader",
  "map:compile-path-walkthrough.md#What the loader and the code generator lack",
  "map:README.md#Touch this@runtimeSystem/", "map:README.md#Touch this@compiler/codegen/",
]
G_CHECKS = [
  "doc:explorations/coordinator/PLAN.md#Phase 2b. The repair batch from the conformance reviews",
  "positions:2026-09-26 answer 9", "positions:2026-09-26 answer 7 catch-all", "positions:2026-09-24 run-time size design",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:417", "ledger:419", "ledger:420", "ledger:351", "ledger:426",
  "doc:explorations/reviews/batch-3-conformance.md#Two compiled dispatch defects that stayed out of every list",
  "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#4. The two side defects",
  "code:" + SRC + "/runtimeSystem/InstantiatingClassloader.java#protected Class loadClass(String name, boolean resolve)",
  "code:" + SRC + "/compiler/codegen/CodeGen.java#public void forTypecase(Typecase x)",
  "code:" + SRC + "/compiler/codegen/CodeGen.java#public void forTry(Try x)",
  "code:Library/FortressLibrary.fss#The identity of + and of juxtaposition..multiplicativeIdentity[",
  "The XXX expected-failure mechanism in compiler_tests/", "The replacement for SUM's and PROD's catch-all",
]

V_BRIEFING = [
  "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-26 answer 8", "positions:2026-09-26 answer 6",
  "positions:2026-09-26 number chapters under S2", "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
  "positions:2026-09-26 lineage note", "positions:2026-09-26 climb batch 5 coordinator/CLIMB-BATCH-5.md",
  "positions:2026-09-26 Q1 of batch 6", "positions:2026-09-19 answering the open question",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop",
  "ledger:435", "ledger:430",
  "doc:explorations/reviews/batch-6-conformance.md#Findings that need Pavol@still a subtype",
  "doc:explorations/reviews/batch-6-conformance.md#Standard 2: the team's built intent@RR32 stays below",
  "doc:Specification/basic/types-vals-vars.tex#Types in the Fortress Standard Libraries",
  "doc:Specification/basic/conversions-coercions.tex#Automatic Widening",
  "code:Specification/basic-lib/numbers.tex#The number types of this chapter are..is explicit, written",
  "doc:Documentation/Specification/Prose/Language/types.tick#Types in the Fortress Standard Libraries",
  "doc:research/extracts/SteeleJuliaCon2016-extract.md#The type system, and where it broke",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#a sibling of",
  "doc:explorations/compile-ladder/plan-6.5/probes/rr32/rr32-sibling-api.patch",
  "doc:ProjectFortress/tests/XXXRR32MixedRungF.fss",
  "doc:explorations/compile-ladder/rung-flat-tower/REPORT.md#11. The comparison",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object RR32 extends RR64",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object RR32 extends RR64",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR64 extends { Number, Equality",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR32 extends { Number, Equality",
  "code:Library/FortressLibrary.fsi#trait RR64 extends { Number, StandardPartialOrder",
  "code:Library/FortressLibrary.fss#trait Number extends { AnyAdditiveGroup",
  "The one library's number tower is flat", "The specification's number chapters describe the flat library",
  "Under walk, the interpreter converts by coercion", "Specification-1.0-frozen/ is byte for byte",
  "The team's latest word on types",
  "map:spec-to-implementation.md#What the compiler prelude has of the tower",
]
V_CHECKS = [
  "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-26 answer 8", "positions:2026-09-26 answer 6",
  "positions:2026-09-26 number chapters under S2", "positions:2026-09-26 rung D's stop",
  "ledger:435",
  "doc:Specification/basic/types-vals-vars.tex#Types in the Fortress Standard Libraries",
  "doc:Specification/basic/conversions-coercions.tex#Automatic Widening",
  "code:Specification/basic-lib/numbers.tex#The number types of this chapter are..is explicit, written",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object RR32 extends RR64",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR64 extends { Number, Equality",
  "code:Library/FortressLibrary.fsi#trait RR64 extends { Number, StandardPartialOrder",
  "The one library's number tower is flat",
]

LISTS = {'E': (E_BRIEFING, E_CHECKS), 'P': (P_BRIEFING, P_CHECKS), 'G': (G_BRIEFING, G_CHECKS), 'V': (V_BRIEFING, V_CHECKS)}

if __name__ == '__main__':
    import subprocess, re, sys, os
    bad = 0
    for rid, (b, c) in LISTS.items():
        for name, keys in (('briefing', b), ('checks', c)):
            assert len(set(keys)) == len(keys), (rid, name, 'duplicate')
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k)]
            assert not badk, (rid, name, badk)
            if name == 'checks':
                stray = [k for k in keys if k not in b]
                assert not stray, (rid, 'stray', stray)
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys, capture_output=True, text=True, cwd=os.environ.get('FORTRESS_HOME', '/home/user/fortress'))
            lines = r.stdout.strip().splitlines()
            probs = [l for l in lines if 'not one' in l or 'not found' in l.lower() or 'no match' in l.lower() or 'nothing' in l.lower()]
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs: bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
