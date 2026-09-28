# The briefing and checks lists of climb batch N's five rungs (CLIMB-BATCH-N.md, section 7), keys of
# explorations/coordinator/tools/facts-extract.sh. Each briefing entry is a pair: its key and one line on why it is
# there and what the rung does with it (Pavol, 2026-09-28, 14:18 UTC, the process review's measure 5,
# explorations/reviews/process-review-6b-7-7R.md section 9; the form is batch 6.5's lists65.py). genn.py renders the
# lines at the end of each rung's tail, after its section of the record, in the order of the briefing. A checks list is
# a sub-list of its briefing's keys. Pavol's decision on a size used as a value (2026-09-28, 19:17 UTC) joins the lists
# of I, K, T and Q by itself when its POSITIONS.md entry matches (SIZE_VALUE below; committed at 6016fac3f). Run as a script, it checks every key with the tool's --check on the tree at $FORTRESS_HOME (each must match
# exactly one place) and every reason's form. The form was batch 7R's lists7r.py (explorations/compile-ladder/plan-7r/
# manifest/) until the reasons were added on 2026-09-28.
import os, subprocess
SRC = 'ProjectFortress/src/com/sun/fortress'
TC = SRC + '/scala_src/typechecker'
EV = SRC + '/interpreter/evaluator'
SH = 'explorations/reviews/inference-rule-shadow'
C = 'explorations/reviews/numerics-plan-coordinator'
F = 'explorations/reviews/numerics-plan-fable'
J = 'explorations/reviews/conversion-overloading-judgement.md'
BN = 'explorations/reviews/before-n-questions.md'
O2 = 'explorations/reviews/option-2-soundness.md'
ROOT = os.environ.get('FORTRESS_HOME', '/home/user/fortress')

STOPS = "Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land."
RUN_TO_RUN = "An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run."
COMPILEALL = "Restore default_repository/caches/global.map after every ant compileAll, or the linker's state is lost."
GATE_BEFORE = "The rule for your count's and distance's before: the last landed gate's tables and its distance-sites.tsv, not a run of the stages on your unchanged base; capture only the after."
LAUNCH = "The standing go for phase 3's batches; it launched this run, and nothing in it is yours to re-ask."
PROBE_RULE = "Pavol's rule that a fork a probe can settle is probed first; probe K settled this batch's, so cite its result and do not re-measure it."
NUMPLANS = "The decision this batch builds, decision 3: inference with coercion and the promotion, the expected type kept at f(x) with a retry; quote it for every choice you report."
CONV = "The conversion rule you build (decision 1): a declaration chosen on its declared types, then instantiated by the promotion; and row 484's library fix (decision 2); cite it wherever the rule decides a call."
PROBEK9 = "Pavol's principle behind the conversion rule, fast code a JVM can specialise, and his ask for one global rule; read it before you weigh a ranking."
ANSWER8 = "Answer 8: the narrowest type every number argument converts into, ZZ64 for ZZ32 with NN32, and ZZ64 into RR64 kept explicit; your promotion's number case."
ANSWER9 = "Answer 9: declarations compared on their quantified types, inference instantiating the chosen one; the order the conversion rule takes."
NUMERAL = "Pavol's decision that a numeral has its own type, IntLiteral, converting into each number type; the switch run 2 builds and the reason Q1 arises."
JVM = "The JVM principle, Java's default where it makes sense: the ground on which Q1's default, ZZ32 for a numeral nothing else fixes, is read."
ROUTE_A = "Route A: each number type carries its own algebra and converts from the narrower ones by coerce; the tower your rule converts within."
PRACTICE = "The library's own practice is the standard: a device the library already uses beats a new one; name the precedent for each choice."
LIBROUTE = "The library route: the compiler library is not edited, and it is the model the one library takes."
SIZE_VALUE_REASON = {
  'I': "Pavol's decision on item 25: a size used as a value converts to ZZ32 as a numeral does; the checker already types it IntLiteral, so your rule converts it as one.",
  'K': "Pavol's decision on item 25: a size used as a value converts as a numeral does, so walk's refusal of u: NN32 = n is the defect your XXX test records.",
  'T': "Pavol's decision on item 25, with his reasoning: the sentence you write into the ranges section, and why a size converts to ZZ32 there.",
  'Q': "Pavol's decision on item 25: a size used as a value converts as a numeral does; if your switch gives walk's size value the numeral's type, row 486 closes.",
}
SIZE_VALUE_KEY = "positions:2026-09-28 size used as a value"

I_BRIEFING = [
  ("positions:2026-09-27 numerics plans", NUMPLANS),
  ("positions:2026-09-28 two decisions of Fable's judgement", CONV),
  ("positions:2026-09-28 probe K's item 9", PROBEK9),
  ("positions:2026-09-26 answer 8", ANSWER8),
  ("positions:2026-09-26 answer 9", ANSWER9),
  ("positions:2026-09-27 numeral's type", NUMERAL),
  ("positions:2026-09-24 exclusion route rung P's fork", ROUTE_A),
  ("positions:2026-09-19 answering the open question", PRACTICE),
  ("positions:2026-09-21 library route", LIBROUTE),
  ("positions:2026-09-26 answer 12", "Answer 12: a size the call cannot fix is refused at that call, rung R's code in checkApplication, the method you edit; keep its three refusals."),
  ("positions:2026-09-22 a design principle", JVM),
  ("positions:2026-09-22 on planning", PROBE_RULE),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("positions:2026-09-27 launch of phase 3's batches", LAUNCH),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("ledger:401", "Row 401, a numeral for a declared parameter of a generic, the shape of microGPT's heads; you fix it and promote its expected failure."),
  ("ledger:388", "Row 388, a narrower type for a declared parameter of a generic; you fix its compiled half and promote that expected failure."),
  ("ledger:455", "Row 455, the expected type dropped at f(x); you fix it with the retry the decision names."),
  ("ledger:447", "Row 447, a result-only type parameter bound to Bottom; not yours to change, a note appended that your rule leaves it so."),
  ("ledger:425", "Row 425, the reductions whose element type nothing fixes; the same class as 447, left open."),
  ("ledger:432", "Row 432, SUM over numerals refused under walk; a structured position your rule does not reach, named as not covered."),
  ("ledger:79", "Row 79, a numeral's type split between the paths at typecase and dispatch; rung Q's, read so you know what the numeral becomes."),
  ("ledger:484", "Row 484, b MAX 1 tied under walk; your ambiguity check meets the same tie on the checker, which rung M's declarations resolve in this run."),
  ("ledger:485", "Row 485, whether a nat parameter may be a component of a range; Pavol settled it, and your rule converts a size value as a numeral."),
  ("ledger:488", "Row 488, checker errors that move with earlier queries; its probe cleared the clause cache, so a BR-family move after your edit is read as yours."),
  ("ledger:491", "Row 491, the passages that read comprises at the level of types; the in-between call your ambiguity check must not refuse comes from it."),
  ("ledger:390", "Row 390, XXXCoercionAnyOverloadRungC: a plain declaration over Any beats a converted one; it stays an expected failure under your ranking."),
  ("doc:" + J + "#1. The rule", "The rule stated for the specification: resolution, then instantiation, then dispatch, the numeral tie; build the checker's half exactly as stated."),
  ("doc:" + J + "#4. Q1's default", "Q1's default as the tie rule for a numeral alone, and where it applies: the ambiguity check you build at Functionals.scala:463."),
  ("doc:" + J + "#5. Where it lands, and in what order", "Your amendments listed: the promoted candidate kept in the first attempt, the ranking, the ambiguity check and the five tests."),
  ("doc:" + J + "#7. The findings that stand under every way", "The stock compiled crash your O2Z64 test closes, and the ambiguity check the specification assumes."),
  ("doc:" + BN + "#A.1 What was run for question A, and why", "The fork run on both shadows: both took the plain arm; your ranking must take the generic at ZZ64 instead."),
  ("doc:" + BN + "#A.2 Why the checker's shadow takes the plain arm", "Why the shadow lost the generic: moreSpecificCandidate ranks a coercion-free candidate first; the test you change."),
  ("doc:" + O2 + "#2. Static and dynamic agreement", "What the compiled dispatcher does after your static choice: O2Z64 dispatches to plain64, O2Wide splits from walk; the lines your tests assert."),
  ("doc:" + O2 + "#5. Numerals and rung Q", "The numeral cases of the rule, O2Num and O2Pos, and why a looser exemption flips gg(5, w); your guards."),
  ("doc:" + SH + ".md#The answers", "The shadow's measured answers, the one way already built; list it among your ways with its numbers."),
  ("doc:" + SH + ".md#1. The edit", "The shadow's edit: the attempts' order and checkApplicableWithCoercion; a starting point, not the answer."),
  ("doc:" + SH + ".md#2. The probes", "The probe programs and their error sites; your skeptic compares your build's sites with these."),
  ("doc:" + SH + ".md#3. microGPT and row 401", "MicroGPT's refusals and row 401's shape on the switch's library copy; the one-library probe you rerun."),
  ("doc:" + SH + ".md#4. The distance", "The shadow's distance numbers, all the expected type's; by arithmetic your rung moves the landed distance by about nothing."),
  ("doc:" + SH + ".md#5. The compiler's tests", "The compiler tests' diagnostics under the shadow, 2 files changed; your measurement's baseline and its method."),
  ("doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets", "What the rule leaves out and the forks: stay inside it, and report any fork you meet rather than choose it."),
  ("doc:" + SH + "/rule.patch", "The shadow's code; read it before you write yours, and say where yours departs from it and why."),
  ("doc:" + SH + "/probes/RuleCRun.fss", "The compiled probe of the rule's shapes; your new test grows from it."),
  ("doc:explorations/reviews/numerics-plan-synthesis.md#Decision 3. The rule and the numeral switch as one batch, before 7b", "The synthesis's decision 3 as put to Pavol, with its reasons; the scope you stay within."),
  ("doc:" + F + ".md#3.1 Face A: inference does not consider coercion", "Face A, inference without coercion, the problem you fix, with its measured cases."),
  ("doc:" + F + ".md#3.3 Face C: inference with nothing to infer from", "Face C, a parameter nothing fixes: Q1's cases and the result-only parameter you leave."),
  ("doc:" + C + "/evidence-B.md#3.2 How a static argument is inferred", "How the checker infers today, with citations; the code you change."),
  ("doc:" + C + "/evidence-B.md#3.3 Whether the expected type is used", "Where the expected type is dropped, f(x) among them; the four sites of measurement D."),
  ("doc:" + C + "/evidence-B.md#3.4 Whether a coercion is considered while solving", "Why the solver never converts, and why the rule adds an attempt beside it rather than editing it."),
  ("doc:" + C + "/measure-D.md#1.3 The same drop elsewhere, not changed", "The other drops of the expected type, not yours; name them as left."),
  ("doc:" + C + "/measure-D.md#2.2 What else the kept context changes", "What keeping the context changes on its own, a result-only parameter bound to Bottom; why the retry exists."),
  ("doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The checker's solver treats a parameter bounded by", "The solver's two behaviours for a result-only parameter; you record them with a probe's capture and open their row."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value", "Why a size used as a value is typed as a numeral by KindEnv; your rule converts it as one."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@The one library writes two numeral strides", "The library's two numeral strides; your one-library probe shows whether the rule takes each."),
  ("doc:explorations/reviews/batch-7C-review.md#Findings@Row 488 needs a probe before batch N", "Why row 488 is named for you: your queries may move its sites."),
  ("doc:explorations/reviews/row-488-probe.md#What it means for batch N's rung I", "Row 488's probe for you: the memo is not the cause, you may edit TraitTable.scala, and a BR-family move after your edit is yours until the control shows otherwise."),
  ("doc:explorations/reviews/comprises-type-level-judgement.md#2. What was checked, and what was measured", "Item 26's judgement, its note on batch N: your ambiguity check must not refuse the unconverted tie of a call whose argument's static type sits between."),
  ("doc:explorations/reviews/comprises-type-level-judgement/probes/MeetViaExclusion.fss", "The set the checker accepts through a comprises meet; your guard test adds G, H and the in-between call f(g) to it."),
  ("doc:Specification/basic/inference.tex", "The chapter rung T writes, today notes; what the specification says of inference, nothing yet."),
  ("doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion", "Applicability by substitutability, the specification's definition your coercion attempt implements."),
  ("doc:Specification/basic/conversions-coercions.tex#Coercion Resolution", "The order of choice: a declaration applicable without coercion first; the order your ranking keeps."),
  ("doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls", "Applicability to a named call, with its static arguments inferred; the text your change must agree with."),
  ("code:" + TC + "/impls/Functionals.scala#def checkApplicable(preCandidate: PreAppCandidate,..def checkApplicableWithoutInference(", "The applicability methods you edit, with the coercion builder for a plain candidate you can share."),
  ("code:" + TC + "/impls/Functionals.scala#Type check the application of the given arrow candidates to the given args", "checkApplication, the sort and the comment at :463 where the ambiguity check goes; rung R's refusal lives here too."),
  ("code:" + SRC + "/scala_src/useful/STypesUtil.scala#def moreSpecificCandidate", "The ranking whose coercion-first test you leave the promotion's coercion out of; the team's code, changed as little as the rule needs."),
  ("code:" + TC + "/impls/Operators.scala#case SJuxt(info, multi, infix, front::rest, false, true)..case SJuxt(info, multi, infix, front::rest, true, true)", "The tight juxtaposition's cases where f(x) drops its expected type; the four one-token edits."),
  ("code:" + SRC + "/scala_src/useful/STypesUtil.scala#def inferStaticParams(fnType: ArrowType,", "The inference by subtyping you add coercion beside; not the solver, which is a stop."),
  ("code:" + TC + "/staticenv/KindEnv.scala#def getType", "The checker's type for a size used as a value, IntLiteral, as Pavol's item 25 decision reads it; unchanged."),
  ("code:" + TC + "/CoercionOracle.scala#def getCoercionsTo(uu: Type)", "The lookup from a target to its sources; the reverse lookup the promotion needs goes beside it."),
  ("code:" + TC + "/CoercionOracle.scala#def substitutableFor(t: Type, u: Type)", "Substitutability as the checker answers it; your admission of an argument uses it."),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends", "The compiler library's numeral type, a sibling converting into each integer type; the one your compiled tests run against."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral extends", "The one library's numeral type today, below ZZ32; what the checker sees in the count and distance stages until run 2."),
  ("doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.fss", "Row 401's expected failure; you promote it by git mv once it passes."),
  ("doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.test", "Its .test, pinned by compile_err_contains; the promoted one drives compile, link and run."),
  ("doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.fss", "Row 388's compiled expected failure; you promote it, restating its line for row 76's spacing."),
  ("doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.test", "Its .test file; the promoted one drives compile, link and run."),
  ("Static arguments are inferred from the arguments alone, on both paths", "The fact your rung changes on the checker's side; cite it with its measurements."),
  ("Keeping the expected type at a call written", "Measurement D's four edits and why they bind Bottom alone; the retry's reason."),
  ("A numeral's type depends on the path and on the library in scope", "Why IntLiteral differs by library; your compiled tests use the compiler library's."),
  ("An inferred generic refuses a coercion that the method it forwards to accepts", "The container shape scale(b, z) your rule accepts; one of your test's cases."),
  ("MicroGPT's own programs through the compiled checker against the one library", "MicroGPT's refusals on the checker; your rule's effect on them is measured on the switch's library copy."),
  ("The specification never wrote static-argument inference", "Why the chapter is empty; rung T writes it from your rule."),
  ("The true distance to the switch-over", "What the distance stage counts; read it before you classify a moved site as caused or unmasked."),
  ("The compiled checker refuses a call whose most specific arm has a size the call cannot fix", "Rung R's refusal in checkApplication, which your ranking must keep."),
  ("The compiled type checker checks nat and int static parameters", "How sizes are checked, so that your promotion leaves a size argument alone."),
  ("An XXX compile test pinned by compile_err_contains whose program compiles", "Why the two XXX tests go red once your rule passes them: promote both."),
  ("The XXX expected-failure mechanism in compiler_tests", "How an XXX compile test is read; your two new refusal tests use it."),
  ("ant compileAll deletes a tracked file", COMPILEALL),
  ("The checker-count stage's table", "What the count stage's rows mean; tie each moved row to your edit."),
  ("map:compile-path-walkthrough.md#How it walks the tree", "How the checker walks the tree, so that your edit lands at the right node."),
  ("map:README.md#Touch this@scala_src/typechecker", "What else moves when you touch the checker; check each before you report."),
]
I_CHECKS = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 answer 8",
  "positions:2026-09-27 numeral's type", "positions:2026-09-22 a design principle", "positions:2026-09-27 stops a batch record reserves",
  "ledger:401", "ledger:388", "ledger:455", "ledger:447", "ledger:484",
  "doc:" + J + "#1. The rule", "doc:" + J + "#4. Q1's default",
  "doc:" + SH + ".md#5. The compiler's tests",
  "doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets",
  "doc:" + SH + "/rule.patch", "doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion",
  "code:" + TC + "/impls/Functionals.scala#def checkApplicable(preCandidate: PreAppCandidate,..def checkApplicableWithoutInference(",
  "code:" + SRC + "/scala_src/useful/STypesUtil.scala#def moreSpecificCandidate",
  "doc:ProjectFortress/compiler_tests/XXXNatLitArgChecker.fss",
  "doc:ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.fss",
  "An XXX compile test pinned by compile_err_contains whose program compiles",
]

K_BRIEFING = [
  ("positions:2026-09-27 numerics plans", "The decision this batch builds, decision 3: walk does the same at dispatch as the checker; quote it for every choice you report."),
  ("positions:2026-09-28 two decisions of Fable's judgement", "The conversion rule, decision 1: walk re-instantiates the declaration it chose by the promotion from run-time types; the one bestMatchInternal edit you may make."),
  ("positions:2026-09-28 probe K's item 9", PROBEK9),
  ("positions:2026-09-26 answer 8", ANSWER8),
  ("positions:2026-09-26 answer 9", "Answer 9: batch 7b's walk rung compares on declared domains after you; your edit stays out of bestMatchInternal's comparison."),
  ("positions:2026-09-27 numeral's type", "Pavol's decision on a numeral's type; walk's numeral stays a ZZ32 in this run, so Q1 does not arise for you."),
  ("positions:2026-09-24 exclusion route rung P's fork", ROUTE_A),
  ("positions:2026-09-19 answering the open question", PRACTICE),
  ("positions:2026-09-26 climb batch 4's held push", "Rung C's held push and the masks: Java line numbers and identity hashes are masked in every comparison you run."),
  ("positions:2026-09-26 climb batch 5 (coordinator", "Batch 5's comparison masks, its Q2; your corpus comparison normalises the same way."),
  ("positions:2026-09-22 on planning", PROBE_RULE),
  ("positions:2026-09-27 launch of phase 3's batches", LAUNCH),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("ledger:388", "Row 388, gf(NarrowOf(2), \"two\") refused; you fix its walk half and promote its expected failure."),
  ("ledger:389", "Row 389, a generic trait's coercion not applied; you fix it in coercionFor and promote its expected failure."),
  ("ledger:387", "Row 387, walk's return conversion switched off; rung Q's in run 2, not yours."),
  ("ledger:432", "Row 432, SUM over numerals refused under walk; a structured position, a note appended with what you found."),
  ("ledger:20", "Row 20, an older walk inference gap; read so that you do not reopen it."),
  ("ledger:21", "Row 21, a generic method's own static arguments under walk; not yours, left."),
  ("ledger:364", "Row 364, a walk dispatch defect beside yours; read so your edit does not widen it."),
  ("ledger:424", "Row 424, walk's Bottom for a no-argument generic; not yours, left."),
  ("ledger:430", "Row 430, the overload listing's order; XXXInheritedOverload is unstable in your comparison."),
  ("ledger:486", "Row 486, walk refusing u: NN32 = n for a nat n; you write its owed XXX test, home 2."),
  ("ledger:390", "Row 390, a plain declaration over Any that fits beats a converted one; the order your re-instantiation keeps."),
  ("doc:" + J + "#1. The rule", "The rule in full, for walk the same as for the checker: choose, then instantiate, then dispatch the converted call."),
  ("doc:" + J + "#3. Walk at run time", "Walk's half of the rule: choose on today's domains, re-instantiate the winner by the promotion, convert at binding; exactly your edit."),
  ("doc:" + J + "#5. Where it lands, and in what order", "Your amendments listed: the bestMatchInternal edit, OpAnyZW printing generic at ZZ64, O2Wide's split recorded, not a stop."),
  ("doc:" + BN + "#A.1 What was run for question A, and why", "The fork run on walk under probe K's shadow: the plain arm; your build must print the generic at ZZ64."),
  ("doc:" + O2 + "#2. Static and dynamic agreement", "O2Wide and O2Lone: where a static type is wider than its value the paths split on the instance; you capture it for the gather's row."),
  ("doc:explorations/compile-ladder/plan-n/probe-k/PROBE-K.md#6. The forks it meets", "Probe K's forks, the first settled by the conversion rule and its checker reading corrected; the others yours to report."),
  ("doc:" + SH + ".md#The answers", "The shadow's answers, for the checker; your walk rule must agree with them on every shape both paths run."),
  ("doc:" + SH + ".md#6. What walk would need", "The three places of walk's rule as the shadow read them; a starting point, not the answer."),
  ("doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets", "What the rule leaves out; stay inside it."),
  ("doc:" + SH + "/probes/OneShapeW.fss", "The one-shape walk program; your new test's shapes come from it."),
  ("doc:explorations/reviews/numerics-plan-synthesis.md#Decision 3. The rule and the numeral switch as one batch, before 7b", "The synthesis's decision 3 as put to Pavol; the scope you stay within."),
  ("doc:" + F + ".md#3.1 Face A: inference does not consider coercion", "Face A, inference without coercion, with walk's measured refusals."),
  ("doc:" + C + "/evidence-B.md#4.2 How a generic call's static arguments are inferred", "How walk infers today, with citations; the loop you split in two passes."),
  ("doc:" + C + "/evidence-B.md#4.3 Rung C's coercion at dispatch meets a generic callee", "Why rung C's coercion pass skips generics and what refusing scale64(b, 3) costs; the continue you remove."),
  ("doc:" + C + "/evidence-B.md#8. How the three interact: observations, with their sources", "How inference, coercion and dispatch interact under walk; read before you change their order."),
  ("doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type", "The plan-6.5 probe: the switch stops at 0 <= r because the coercion pass skips generics; why run 2 needs your rule."),
  ("doc:explorations/compile-ladder/rung-interp-coercion/REPORT.md#1. What changed", "Rung C's coercion pass, the code you extend; what it changed."),
  ("doc:explorations/compile-ladder/rung-interp-coercion/REPORT.md#5. Decisions", "Rung C's decisions, the most specific coercion among them; keep them."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value", "Why row 486 is yours: the finding that put it in this batch's walk rung."),
  ("doc:explorations/compile-ladder/climb-batch-7R/JUDGE-review.md#5. Considered and left as ruled@Row 486", "The judge's ruling that row 486's test waits for this rung; you write it."),
  ("doc:explorations/compile-ladder/rung-spec-ranges/probes/skeptic/SkNatType.fss", "The program that measured row 486; your XXX test restates its T3 line as an assertion."),
  ("doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion", "Applicability by substitutability; the specification's definition walk's coercion pass implements."),
  ("doc:Specification/basic/conversions-coercions.tex#Coercion Resolution", "The order of choice, a declaration applicable without coercion first; the order your edit keeps."),
  ("doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls", "Applicability to a named call; the text your change must agree with."),
  ("code:" + EV + "/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction", "Walk's inference, the loop you split in two passes."),
  ("code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion", "The coercion pass whose continue skips generics; you let it keep them."),
  ("code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchInternal", "The subtyping pass: its choice stays, and the winner is re-instantiated before application, the one edit you may make here."),
  ("code:" + EV + "/values/Coercions.java#static SingleFcn coercionFor", "coercionFor, which instantiates a generic target too early (row 389); you fix it."),
  ("code:" + EV + "/values/NonPrimitive.java#public List<FValue> typecheckParams", "Where an instantiated function's arguments are converted at binding; place 1 relies on it."),
  ("code:" + EV + "/types/FType.java#public static Set<FType> join(List<FValue> evaled)", "Walk's join of lower bounds, today's instance; the promotion replaces it only for the chosen generic."),
  ("doc:ProjectFortress/tests/XXXCoercionGenericFnRungC.fss", "Row 388's walk expected failure; you promote it by git mv."),
  ("doc:ProjectFortress/tests/XXXCoercionGenericTraitRungC.fss", "Row 389's expected failure; you promote it by git mv."),
  ("doc:ProjectFortress/tests/roundBug.fss", "The test form your new test follows: each assertion with a message citing its source."),
  ("doc:explorations/reviews/before-n-questions/fork/OpAnyZW.fss", "The fork's program; your new test asserts its op(z, w) at ZZ64 under walk."),
  ("code:ProjectFortress/tests/IntSemanticsRungI.fss#zz32Shown(v: Any): String", "The helper that shows a value with its type; show each value of your test through it."),
  ("Under walk, the interpreter converts by coercion at its three kinds of type check", "Rung C's three conversion sites; your rule's conversions happen at binding through them."),
  ("Static arguments are inferred from the arguments alone, on both paths", "The fact your rung changes on walk's side; cite it with its measurements."),
  ("An inferred generic refuses a coercion that the method it forwards to accepts", "The container shape scale(b, z) your rule accepts under walk."),
  ("A numeral's type depends on the path and on the library in scope", "Why walk's numeral is a ZZ32 in this run; Q1 is not yours."),
  ("The one library's number tower is flat", "The flat tower your promotion converts within: each type's own algebra, coerce from the narrower ones."),
  ("An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "Why the two XXX tests go red once they pass, and how your row-486 test is gated."),
  ("testSystem's four shards are one suite split by sorted index", "How testSystem counts your new and renamed files; the gate compares shard sums."),
  ("The interpreter's overload-ambiguity message names its two declarations", "Walk's ambiguity message; a changed listing order is row 430, not a stop."),
  ("Three heaps run the interpreter", "The heaps your comparison runs under; set them as the gate does."),
  ("ant compileAll deletes a tracked file", COMPILEALL),
  ("map:README.md#Touch this@interpreter/ (evaluator", "What else moves when you touch walk's evaluator; check each before you report."),
]
K_CHECKS = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 answer 8",
  "positions:2026-09-27 stops a batch record reserves",
  "positions:2026-09-26 rung D's stop", "ledger:388", "ledger:389", "ledger:432", "ledger:486",
  "doc:" + J + "#3. Walk at run time",
  "doc:" + SH + ".md#6. What walk would need", "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "code:" + EV + "/EvaluatorBase.java#public static Simple_fcn inferAndInstantiateGenericFunction",
  "code:" + EV + "/values/OverloadedFunction.java#private SingleFcn bestMatchWithCoercion",
  "code:" + EV + "/values/Coercions.java#static SingleFcn coercionFor",
  "Under walk, the interpreter converts by coercion at its three kinds of type check",
  "An XXX*.fss in the interpreter corpus IS a gated expected-failure test",
]

T_BRIEFING = [
  ("positions:2026-09-27 numerics plans", "The decision this batch builds: the chapter written in the S1 form, landing only with the checker rung; quote it in your decision record."),
  ("positions:2026-09-28 two decisions of Fable's judgement", "The conversion rule you state: choice by the coercion chapter, then instantiation by the promotion, then dispatch, the numeral tie once."),
  ("positions:2026-09-26 answer 8", "Answer 8: the promotion rule written into the empty inference chapter; the sentence you write."),
  ("positions:2026-09-26 answer 9", "Answer 9: batch 7b's rung S rewrites the overloading chapters after you; you edit neither, and the coercion chapter's cross-reference is S's."),
  ("positions:2026-09-27 numeral's type", "A numeral's own type, the model run 2 builds; your chapter's numeral rule is written for it."),
  ("positions:2026-09-22 a design principle", JVM),
  ("positions:2026-09-26 S1", "The S1 form: text in place, a revision callout, an Appendix I entry, reasons in a decision record; every change you make takes it."),
  ("positions:2026-09-26 first of the batch-5 answers", "The unrevised copy is called the Working Draft of February 2011, cited by its path and line in Specification-1.0-frozen/."),
  ("positions:2026-09-26 lineage note", "The later Types chapter is cited beside where it covers a topic; it covers no inference, and you say so."),
  ("positions:2026-09-24 requirement on the plan", "No open discrepancy between the specification and the implementation: why the chapter lands with rung I."),
  ("positions:2026-09-26 number chapters under S2", "How the number chapters were revised; the callout you revise is one of theirs."),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("ledger:447", "Row 447, the team's BottomType question; the chapter keeps it open, a note appended."),
  ("ledger:425", "Row 425, the reductions' element type; named as not covered, a note appended."),
  ("ledger:455", "Row 455, the expected type at f(x); the chapter states that it is kept, with the retry."),
  ("ledger:401", "Row 401, the shape the rule accepts; an example the chapter may give."),
  ("ledger:388", "Row 388, a narrower argument for a declared parameter of a generic; the admission step the chapter states."),
  ("ledger:485", "Row 485, a nat parameter in a range, now settled by Pavol; your ranges sentence closes it."),
  ("ledger:486", "Row 486, walk refusing a size value at an NN32 binding; that context is rung Q's to write, so your text stops at ranges."),
  ("doc:" + J + "#1. The rule", "The rule as the judgement states it for the specification; your chapter's instantiation, dispatch and numeral paragraphs follow its words."),
  ("doc:" + J + "#4. Q1's default", "Q1's default as the numeral tie rule, stated once, in your chapter; it ranks nothing but numerals."),
  ("doc:" + J + "#5. Where it lands, and in what order", "Your amendment: the two steps, the static insertion, the dispatch, the numeral once, walk's callout; and what is batch 7b's."),
  ("doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The checker's solver treats a parameter bounded by", "The solver's two behaviours for a result-only parameter; your not-covered list names both."),
  ("doc:explorations/reviews/batch-6b-7-conformance.md#Findings@The specification's implicit bound stays", "The implicit bound still Object in the text; your callout names Any as the bound the chapter assumes."),
  ("doc:explorations/reviews/overloading-judgement.md#10. Left open for him@The implicit bound", "Why the sentence waits for rung S: under Any the naked-Any rule reads as forbidding overloads, and S revises both."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value", "The evidence behind Pavol's item 25 decision; your ranges sentence and the notrevised paragraph follow it."),
  ("doc:" + SH + ".md#The answers", "The shadow's measured answers; the chapter states no more than rung I builds from them."),
  ("doc:" + SH + ".md#1. The edit", "The attempts' order as built; the chapter's words for the expected type and the retry."),
  ("doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets", "What the rule does not reach; your chapter names it as not covered."),
  ("doc:explorations/reviews/numerics-plan-synthesis.md#Decision 3. The rule and the numeral switch as one batch, before 7b", "The synthesis's decision 3 as put to Pavol; quote it in your decision record."),
  ("doc:" + C + "/evidence-B.md#1.2 Static arguments, and the inference chapter the text cites", "Every passage that cites the chapter; your list starts from it."),
  ("doc:" + C + "/evidence-B.md#1.3 Coercion at a call and in a typed binding", "What the specification says of coercion at a call; the ground your chapter stands on."),
  ("doc:" + C + "/evidence-B.md#2. The team's later Types chapter and the Types papers", "The team's later word and papers, silent on inference; cite them beside your text."),
  ("doc:Specification/basic/inference.tex", "The chapter you write, today 27 lines of notes; its BottomType note stays."),
  ("doc:Specification/basic/conversions-coercions.tex#Applicability with Coercion", "Applicability by substitutability; your admission step cites it."),
  ("doc:Specification/basic/conversions-coercions.tex#Coercion Resolution", "The resolution your chapter follows as its first step; you cite it and do not restate it."),
  ("doc:Specification/basic/overloading.tex#Applicability to Named Functional Calls", "The passage that says static parameters are inferred as the chapter describes; your list says what becomes of it."),
  ("doc:Specification/basic/trait-parameters.tex#Type Parameters", "The implicit-bound sentence, Object in the text; not yours to edit, named in your callout and your list."),
  ("doc:Specification/basic/expressions/ranges.tex#Ranges", "The ranges section batch 7R revised; you add a size used as a value beside the numeral in its one sentence."),
  ("code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in", "Answer 8's callout; you revise its last rule to say the chapter now states it."),
  ("doc:Specification/appendices/changes.tex#The integer type of a range", "Batch 7R's entry whose Effect sentence points to the open question; you revise that one sentence."),
  ("doc:Specification/appendices/changes.tex#Passages not yet revised", "The paragraphs on the rule and on a nat parameter in a range; you revise both, and insert your entry before this section."),
  ("doc:Specification/appendices/changes.tex#Reductions whose element type nothing fixes", "The reductions entry, rows 424 and 425; left, and your chapter names the class as not covered."),
  ("doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form", "The form batch 5's rung S used; your entry and decision record take it."),
  ("doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#5. Decisions taken inside the rung", "Batch 6's rung T's decisions, the model for the ones you report."),
  ("The specification never wrote static-argument inference", "The fact your chapter corrects; the gather rewrites it."),
  ("The team's latest word on types", "The later Types chapter, cited beside your text where it covers the topic."),
  ("Specification-1.0-frozen/ is byte for byte", "Where to quote the original from; never edit it."),
  ("The specification states instantiation exclusion, and its refused examples", "A revision in the same form; how its entry reads."),
  ("The specification's number chapters describe the flat library", "The number chapters' state; your callout sits in one of them."),
  ("A generic object referenced without its static arguments is a static error on the compiled path", "A case your chapter must not contradict: inference does not supply a generic object's static arguments."),
  ("Static arguments are inferred from the arguments alone, on both paths", "Today's behaviour, which the chapter's rule replaces."),
  ("Keeping the expected type at a call written", "The expected type at f(x) and the retry, in the words of the measurement."),
  ("map:README.md#Touch this@Specification/ (the standard)", "What else moves when you touch the specification: Part IV's rendering, test citations."),
]
T_CHECKS = [
  "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-22 a design principle",
  "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers",
  "positions:2026-09-27 stops a batch record reserves", "ledger:447", "ledger:485",
  "doc:" + J + "#1. The rule",
  "doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets", "doc:Specification/basic/inference.tex",
  "code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in",
  "doc:Specification/appendices/changes.tex#Passages not yet revised",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "The specification never wrote static-argument inference",
]

M_BRIEFING = [
  ("positions:2026-09-28 two decisions of Fable's judgement", "Decision 2 is this rung: each integer type declares its own MIN, MAX and MINMAX, as QQ, RR64, the compiler library and the specification's ZZ do."),
  ("positions:2026-09-26 answer 8", "Answer 8: the type each call now answers at, ZZ64 for NN32 with ZZ32, ZZ for NN64 with ZZ32; your test's expected types."),
  ("positions:2026-09-24 exclusion route rung P's fork", ROUTE_A),
  ("positions:2026-09-19 answering the open question", "The library's own practice is the standard: QQ's and RR64's own MIN and MAX are the device you extend."),
  ("positions:2026-09-21 library route", "The library route: you edit the one library only; the compiler library is the model for the api form and is not edited."),
  ("positions:2026-09-22 a design principle", "The JVM principle; Java's Math.max has one overload per number type, the same shape."),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("positions:2026-09-27 launch of phase 3's batches", LAUNCH),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("ledger:484", "Row 484, b MAX 1 for a ZZ64 stopping walk; you fix it, home 1."),
  ("ledger:421", "Row 421, StandardMinMax's MIN and MAX declared T by batch 7; not yours to edit, the inherited declarations you add beside."),
  ("doc:" + J + "#6. Question B, row 484", "The judgement on row 484: the rule leaves the tie, the library's device fixes it; your rung."),
  ("doc:" + BN + "#Question B: b MAX 1", "The question as put, its options and the measured runs; option 1 is what you build."),
  ("doc:" + BN + "#B.1 Every walk result for question B", "The 23 walk runs; your test's calls and their answers today."),
  ("doc:" + BN + "#B.2 Why + and <= answer where MAX does not", "Why ZZ64's own + answers and the inherited MAX ties; the reading your declarations rest on."),
  ("doc:" + BN + "#B.3 The compiled checker, by reading", "The checker takes the list's head today; rung I's ambiguity check meets the same tie, which your declarations resolve."),
  ("doc:" + BN + "#B.4 Rung Q, by reading", "What the numeral switch meets at MAX after you, and IntLiteral's exclusion of QQ; rung Q's, read so your test leaves the numeral cases to it."),
  ("doc:" + BN + "#B.5 What option 1 would write", "The fifteen declarations and their bodies; your edit."),
  ("doc:Specification/basic/conversions-coercions.tex#Coercion Resolution", "The specification's most specific coercion, by which your declarations win; cite it in your test's messages."),
  ("code:Specification/basic-lib/basic-integers.tex#The Working Draft of February 2011 gave the integers..call writes its static argument, as in", "The integer chapter's callout on mixed widths; your calls follow answer 8 as it states."),
  ("code:Library/FortressLibrary.fss#trait StandardTotalOrder", "The bodies your declarations take: MIN and MAX by one <, MINMAX as a pair."),
  ("code:Library/FortressLibrary.fss#opr MIN(self, other:QQ):QQ =..opr MINMAX(self, other:QQ):(QQ,QQ) =", "QQ's own MIN, MAX and MINMAX, the one library's precedent for a type declaring its own."),
  ("code:Library/FortressLibrary.fss#opr MIN(self, b:RR64):RR64 = asFloat..opr MINMAX(self, b:RR64)", "RR64's own, the second precedent."),
  ("code:Library/FortressLibrary.fss#opr <=(self, b:ZZ64):Boolean = NOT..opr +(self,b:ZZ64):ZZ64 =", "ZZ64's own <= and +, why b + 1 answers today; your MAX plays the same part."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object NN32 extends", "NN32's api, in FortressBuiltin; three of your declarations go here and in the .fss."),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr MIN(self, other:ZZ64): ZZ64..opr MINMAX(self, other:ZZ64)", "The compiler library's api form for ZZ64's three; copy the form, not the file."),
  ("code:" + EV + "/values/Coercions.java#private static boolean noLessSpecific", "Walk's most-specific relation; why your ZZ64 declaration beats QQ's and the inherited one."),
  ("doc:ProjectFortress/tests/roundBug.fss", "The test form: each assertion with a message citing row 484 or its source."),
  ("code:ProjectFortress/tests/IntSemanticsRungI.fss#zz32Shown(v: Any): String", "The helper that shows a value with its type; your test shows each answer's type through it."),
  ("The one library's number tower is flat", "The flat tower: each type's operations at its own type; your declarations follow it."),
  ("Under walk, the interpreter converts by coercion at its three kinds of type check", "Rung C's coercion pass, which now finds your declarations most specific."),
  ("The interpreter's overload-ambiguity message names its two declarations", "The message row 484's calls print today; your test fails on it on the base."),
  ("An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "How the interpreter corpus gates a test; yours is a plain one."),
  ("testSystem's four shards are one suite split by sorted index", "How testSystem counts your new file."),
  ("The checker-count stage's table", "What the count stage's rows mean; tie each moved row to one of your declarations."),
  ("map:README.md#Touch this@Library/FortressLibrary.fss and the other", "What else moves when you touch the library: the specification's Part IV, walk, the count stage."),
]
M_CHECKS = [
  "positions:2026-09-28 two decisions of Fable's judgement", "positions:2026-09-26 answer 8", "positions:2026-09-19 answering the open question",
  "positions:2026-09-21 library route", "positions:2026-09-27 stops a batch record reserves",
  "ledger:484", "ledger:421", "doc:" + J + "#6. Question B, row 484", "doc:" + BN + "#B.5 What option 1 would write",
  "code:Library/FortressLibrary.fss#trait StandardTotalOrder",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr MIN(self, other:ZZ64): ZZ64..opr MINMAX(self, other:ZZ64)",
  "code:" + EV + "/values/Coercions.java#private static boolean noLessSpecific",
]

Q_BRIEFING = [
  ("positions:2026-09-27 numeral's type", "The decision this rung builds: walk switched to IntLiteral, the one library taking the compiler library's; rows 79, 432, 437 and 443 its measure."),
  ("positions:2026-09-27 numerics plans", "Decision 3: the one library and walk take the sibling IntLiteral with its coercions; the switch you land."),
  ("positions:2026-09-28 two decisions of Fable's judgement", "The conversion rule: a declaration that fits without conversion runs first, so ee(5) takes the Any arm and x = 0 reaches Number's =; and the exactValue requirement."),
  ("positions:2026-09-26 answer 8", "Answer 8: integer literals coerce into RR64, exact; each wider type declares its coerce."),
  ("positions:2026-09-26 answer 7 catch-all", "Answer 7: the identity functions pass numerals through cast; the numeral half of row 426 is yours."),
  ("positions:2026-09-24 exclusion route rung P's fork", ROUTE_A),
  ("positions:2026-09-19 answering the open question", PRACTICE),
  ("positions:2026-09-21 library route", LIBROUTE),
  ("positions:2026-09-19 on the FlatArrays review", "That's not Fortress: no microGPT line changes; a changed model line is a stop, shown to Pavol as a diff."),
  ("positions:2026-09-22 a design principle", JVM),
  ("positions:2026-09-26 climb batch 4's held push", "Rung C's held push and the masks: Java line numbers and identity hashes are masked in every comparison you run."),
  ("positions:2026-09-26 climb batch 5 (coordinator", "Batch 5's comparison masks, its Q2; your corpus comparison normalises the same way."),
  ("positions:2026-09-26 S1", "The S1 form for your literals and coercion passages: text in place, callout, Appendix I entry."),
  ("positions:2026-09-26 first of the batch-5 answers", "The unrevised copy is the Working Draft of February 2011; quote originals from it."),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("positions:2026-09-27 launch of phase 3's batches", LAUNCH),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("ledger:79", "Row 79, typecase and dispatch on a numeral split between the paths; you fix it."),
  ("ledger:443", "Row 443, s: RR64 = 3000000000 refused under walk; you fix it."),
  ("ledger:454", "Row 454, a numeral refused for NN32 and NN64; you fix its integer half."),
  ("ledger:387", "Row 387, walk's return conversion switched off; you switch it on, the library needs it under the switch."),
  ("ledger:426", "Row 426, cast on the compiled path, fixed by batch 6.5's rung G; the identity functions it left must keep converting their numerals under your switch."),
  ("ledger:432", "Row 432, SUM over numerals under walk; closed if your IntLiteral carries the algebra."),
  ("ledger:437", "Row 437, matrix(v)'s numeral for NN32 elements; you fix the walk half."),
  ("ledger:401", "Row 401's shape, a numeral binding passed to a ZZ32 parameter of a generic; your test asserts it under walk."),
  ("ledger:325", "Row 325, an older numeral row; read so your switch does not reopen it."),
  ("ledger:318", "Row 318, the compiler library's model; a note appended that the one library takes it now."),
  ("ledger:442", "Row 442, the compiler library's missing RR64 coerce from IntLiteral; the one library declares it, a note appended."),
  ("ledger:20", "Row 20, an older walk inference gap; read so that you do not reopen it."),
  ("ledger:484", "Row 484, fixed by rung M; after the switch its numeral cases need IntLiteral to exclude QQ."),
  ("ledger:485", "Row 485, a size in a range, settled; your switch keeps it converting to ZZ32."),
  ("ledger:486", "Row 486, walk refusing u: NN32 = n; rung K's XXX test is yours to promote if your switch repairs it."),
  ("doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type", "The plan-6.5 probe: where the switch stops under models A0, A1 and B; the sites you meet first."),
  ("doc:explorations/compile-ladder/plan-6.5/probes/numeral/numeral-lib-A0.patch", "The probe's library half, a measurement, not your edit; the declarations it wrote."),
  ("doc:explorations/compile-ladder/plan-6.5/probes/numeral/numeral-java.patch", "The probe's Java half: FIntLiteral.make and the conversion natives."),
  ("doc:" + J + "#7. The findings that stand under every way", "The exactValue requirement and its devices: x = 0 must answer correctly after your switch."),
  ("doc:" + J + "#6. Question B, row 484", "Row 484 after rung M, and the library's own 0 MAX (index - 1) your switch meets."),
  ("doc:explorations/reviews/conversion-overloading-ways.md#5. What the library already does in the same family", "The = family and its catch-alls, and why the switch reaches Number's =; the devices you choose among."),
  ("doc:" + O2 + "#5. Numerals and rung Q", "The numeral cases under the rule: ee(5) prints 2, a numeral converts only for the chosen declaration."),
  ("doc:" + BN + "#B.4 Rung Q, by reading", "What your switch meets at MAX, and the condition that IntLiteral exclude QQ."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@Item 25 is about a size's value", "Why a size used as a value converts as a numeral; walk's half of it may be your switch's."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@The one library writes two numeral strides", "The two numeral strides your switch meets at a generic stride parameter."),
  ("doc:" + F + ".md#3.2 Face B: a numeral's type is modelled three ways", "Face B, the three models of a numeral; the one you make single."),
  ("doc:" + C + "/evidence-B.md#3.1 Where a numeral gets", "Where the checker gives a numeral its type; unchanged by you."),
  ("doc:" + C + "/evidence-B.md#4.1 A numeral's run-time type", "Where walk gives a numeral its type; FIntLiteral.make, which you change."),
  ("doc:" + C + "/evidence-B.md#5. The compiler library", "The compiler library's IntLiteral model in detail; the sibling you copy."),
  ("doc:" + C + "/evidence-B.md#6.2 The library's devices for a number of type T in generic code", "The library's devices for a number in generic code; your respellings use them."),
  ("doc:" + C + "/evidence-B.md#7.1 Where a numeral meets a non-", "Where microGPT's numerals meet a non-ZZ32 type; your comparison's microGPT check."),
  ("doc:" + SH + ".md#2.3 Fable's one-shape cases", "The one-shape cases on the checker; your test's walk counterparts."),
  ("doc:" + SH + ".md#3. microGPT and row 401", "MicroGPT under the switch on the checker; the values your microGPT check must keep."),
  ("doc:" + SH + ".md#4. The distance", "The switch's cost on the checker, 3 errors under the rule; your distance run's expectation."),
  ("doc:" + SH + ".md#7. What the rule does not reach, and the forks it meets", "What the rule leaves out; stay inside it."),
  ("doc:Specification/basic/expressions/literals.tex#Literals", "The literals section, a numeral's own type and its note; you revise the note and the paragraph."),
  ("code:Specification/basic/conversions-coercions.tex#revision{revival-int-float}", "The coercion chapter's note on the interpreter's numerals; you revise its one sentence."),
  ("doc:Specification/appendices/changes.tex#Integers in floating-point expressions", "The entry of that note; your entry follows its form."),
  ("doc:Specification/appendices/changes.tex#Passages not yet revised", "Where your Appendix I entry goes, after rung T's."),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends", "The compiler library's IntLiteral, the model: its exclusions, getters, arithmetic, MIN and MAX."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#object IntLiteral extends", "The one library's IntLiteral api today; you replace it."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#object IntLiteral extends ZZ32", "Its component, with the arithmetic withheld until coercion; you enable what the switch needs."),
  ("code:Library/FortressLibrary.fss#opr =(self, other:Number):Boolean =", "Number's =, which x = 0 reaches after the switch; one of the devices changes it."),
  ("code:Library/FortressLibrary.fss#exactValue(x: Number): QQ =", "exactValue, whose else answers Ratio(0, 0) for a numeral; one device adds a numeral case here."),
  ("code:Library/CompilerAlgebra.fsi#trait Equality", "The compiled library's Equality comprises T, the device with no catch-all =; one of your choices."),
  ("code:Library/FortressLibrary.fsi#stride:I): Range", "The generic strided operator the library's numeral strides reach; where a ZZ32 form beside it would go."),
  ("code:Library/FortressLibrary.fss#The identity of + and of juxtaposition for the number type named by the..multiplicativeIdentity[", "The identity functions and their cast of a numeral, as batch 6.5's rung G left them; row 426's numeral half."),
  ("code:" + EV + "/values/FIntLiteral.java#public static FValue make(BigInteger v)", "FIntLiteral.make, walk's numeral by magnitude; you make it an IntLiteral."),
  ("code:" + EV + "/values/Simple_fcn.java#protected FValue check(FValue x)", "The return check with its Jam on; you switch the conversion on (row 387)."),
  ("doc:" + SRC + "/interpreter/glue/prim/IntLiteral.java", "The team's IntLiteral natives; you add the conversion natives beside them."),
  ("doc:ProjectFortress/tests/XXXCoercionReturnRungC.fss", "Row 387's expected failure; you promote it by git mv."),
  ("doc:ProjectFortress/tests/NumeralTest.fss", "The team's numeral test; its lines must keep their verdict."),
  ("doc:ProjectFortress/tests/litCoercion.fss", "The team's literal coercion test; its lines must keep their verdict."),
  ("doc:ProjectFortress/tests/XXXextendIntLiteral.fss", "The team's expected failure that a program cannot extend IntLiteral; a trait form turns it green, a stop."),
  ("A numeral's type depends on the path and on the library in scope", "The fact your switch makes single; cite it."),
  ("A numeral's value reaches the compiled world intact", "How a numeral's value reaches the compiled path; the checker's view you keep."),
  ("The replacement for SUM's and PROD's catch-all", "Answer 7's identity functions and their numerals; row 426."),
  ("The one library's number tower is flat", "The flat tower IntLiteral joins as a sibling under Number."),
  ("Under walk, the interpreter converts by coercion at its three kinds of type check", "Rung C's conversions, through which a numeral converts after your switch."),
  ("MicroGPT's own programs through the compiled checker against the one library", "MicroGPT on the checker; its errors after the switch are counted by your distance run."),
  ("The distance to the switch-over by root cause", "The distance by root cause; classify each moved site."),
  ("The specification never wrote static-argument inference", "Why the literals section's numeral hierarchy is a note; you revise it."),
  ("An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "Why a promoted XXX test must be renamed, and why XXXextendIntLiteral must stay failing."),
  ("testSystem's four shards are one suite split by sorted index", "How testSystem counts your new and renamed files."),
  ("The interpreter's overload-ambiguity message names its two declarations", "Walk's ambiguity message; a changed listing order is row 430, not a stop."),
  ("Three heaps run the interpreter", "The heaps your comparison runs under; set them as the gate does."),
  ("ant compileAll deletes a tracked file", COMPILEALL),
  ("map:README.md#Touch this@Library/FortressLibrary.fss and the other", "What else moves when you touch the library: Part IV, walk, the count stage."),
  ("map:README.md#Touch this@interpreter/ (evaluator", "What else moves when you touch walk's evaluator."),
]
Q_CHECKS = [
  "positions:2026-09-27 numeral's type", "positions:2026-09-27 numerics plans", "positions:2026-09-28 two decisions of Fable's judgement",
  "positions:2026-09-22 a design principle", "positions:2026-09-27 stops a batch record reserves",
  "positions:2026-09-26 rung D's stop", "ledger:79", "ledger:443", "ledger:454", "ledger:387",
  "doc:explorations/compile-ladder/plan-6.5/NOTES.md#1. A numeral's type",
  "doc:" + J + "#7. The findings that stand under every way",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait IntLiteral extends",
  "code:Library/FortressLibrary.fss#opr =(self, other:Number):Boolean =",
  "code:Library/FortressLibrary.fss#exactValue(x: Number): QQ =",
  "code:" + EV + "/values/FIntLiteral.java#public static FValue make(BigInteger v)",
  "doc:Specification/basic/expressions/literals.tex#Literals",
  "A numeral's type depends on the path and on the library in scope",
]


def _size_value_committed():
    # The key joins the lists only once POSITIONS.md holds its entry, so the lists check stays clean before that.
    try:
        r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check', SIZE_VALUE_KEY],
                           capture_output=True, text=True, cwd=ROOT)
        return r.returncode == 0
    except Exception:
        return False


BRIEFINGS = {'I': I_BRIEFING, 'K': K_BRIEFING, 'T': T_BRIEFING, 'M': M_BRIEFING, 'Q': Q_BRIEFING}
CHECKS = {'I': I_CHECKS, 'K': K_CHECKS, 'T': T_CHECKS, 'M': M_CHECKS, 'Q': Q_CHECKS}
SIZE_VALUE_AFTER = {'I': "positions:2026-09-26 answer 12", 'K': "positions:2026-09-27 numeral's type",
                    'T': "positions:2026-09-27 numeral's type", 'Q': "positions:2026-09-28 two decisions of Fable's judgement"}
if _size_value_committed():
    for rid, after in SIZE_VALUE_AFTER.items():
        b = BRIEFINGS[rid]
        i = [k for k, _ in b].index(after) + 1
        b.insert(i, (SIZE_VALUE_KEY, SIZE_VALUE_REASON[rid]))
        if rid in 'TQ':
            c = CHECKS[rid]
            c.insert(len([k for k in c if k.startswith('positions:')]), SIZE_VALUE_KEY)
ORDER = 'IKTMQ'
LISTS = {rid: ([k for k, _ in BRIEFINGS[rid]], CHECKS[rid]) for rid in ORDER}
REASONS = {rid: [(k, r) for k, r in BRIEFINGS[rid]] for rid in ORDER}


def reason_problems(rid):
    out = []
    for k, r in BRIEFINGS[rid]:
        if not isinstance(r, str) or not r.strip():
            out.append((k, 'no reason'))
        elif '\n' in r or '`' in r or any(ord(c) > 127 for c in r):
            out.append((k, 'a reason is one ASCII line with no backtick'))
        elif not r.endswith('.') or len(r) > 240:
            out.append((k, 'a reason ends with a full stop and is at most 240 characters'))
    return out


if __name__ == '__main__':
    import re, sys
    verbose = '-v' in sys.argv
    print('the key of a size used as a value:', 'in the lists (its POSITIONS.md entry is committed)' if _size_value_committed() else 'not yet in the lists (no POSITIONS.md entry matches it)')
    bad = 0
    for rid, (b, c) in LISTS.items():
        rp = reason_problems(rid)
        print(rid, 'reasons', len(REASONS[rid]), 'for', len(b), 'briefing keys |', 'problems', len(rp))
        for k, why in rp: print('   PROBLEM', why, ':', k[:200])
        if rp: bad += 1
        for name, keys in (('briefing', b), ('checks', c)):
            assert len(set(keys)) == len(keys), (rid, name, 'duplicate')
            badk = [k for k in keys if not k.strip() or k.startswith('-') or re.search(r'["`$\\\n]', k)]
            assert not badk, (rid, name, badk)
            if name == 'checks':
                stray = [k for k in keys if k not in b]
                assert not stray, (rid, 'stray', stray)
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys,
                               capture_output=True, text=True, cwd=ROOT)
            lines = r.stdout.strip().splitlines()
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:300])
            if r.returncode or verbose:
                for l in lines:
                    if verbose or 'NOT FOUND' in l or 'not one' in l or 'entries' in l: print('   ', l[:300])
            if r.returncode: bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
