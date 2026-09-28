# The briefing and checks lists of climb batch 6.5's four rungs (CLIMB-BATCH-6.5.md, section 7). Each briefing entry
# is a pair: its facts-extract.sh key and one line on why it is there and what the rung does with it (the process
# review's measure 5, explorations/reviews/process-review-6b-7-7R.md section 9, approved by Pavol on 2026-09-28 at
# 14:18 UTC). gen65.py renders the lines at the end of each rung's tail, after its section of the record, in the order
# of the briefing. A checks list is a sub-list of its briefing's keys. `python3 lists65.py` checks every key with
# facts-extract.sh --check (each must match exactly one place) and every reason's form.
SRC = 'ProjectFortress/src/com/sun/fortress'
GLUE = SRC + '/interpreter/glue/prim'
HELP = SRC + '/nativeHelpers'

STOPS = "Every stop reserved for Pavol is reversible: finish, list it in stopsMet with liftedBy citing this entry, and land."
RUN_TO_RUN = "An output the untouched tree already varies from run to run, its verdict unchanged, is a ledger row and not a stop; apply it to every comparison you run."
COMPILEALL = "Restore default_repository/caches/global.map after every ant compileAll, or the linker's state is lost."
GATE_BEFORE = "The rule for your checker count's before: the last landed gate's table, not a run of the stage on your unchanged base; capture only the after."
FROZEN = "The frozen copy is the Working Draft of February 2011: quote originals from it, and never edit it (a stop)."

E_BRIEFING = [
  ("positions:2026-09-27 size's range", "The decision this rung builds: a nat parameter is an NN32 value, an int one a ZZ32, a larger one refused; cite it in every refusal and every restated NatRtBigSize line."),
  ("positions:2026-09-22 ledger row 334", "The decision for GCD and LCM, nonnegative and IntegerOverflow when the multiple does not fit, on both paths; NN32's and NN64's LCM follow it."),
  ("positions:2026-09-24 ledger row 379", "The decision that walk raises the specification's catchable IntegerOverflow in its natives, the count of changed interpreter outputs measured and brought to Pavol; your natives follow it."),
  ("positions:2026-09-26 fifth batch-5 answer", "The unsigned types follow the signed ones, overflow raising IntegerOverflow; the rule for NN32's and NN64's LCM, CHOOSE and power."),
  ("positions:2026-09-26 rung O of climb batch 4", "The device for rows 450 and 451, decided for the strided distance: reorder so that no step leaves the range and keep the checked operators; apply it to each range body."),
  ("positions:2026-09-24 run-time size design", "Design B, a size at run time is a descriptor; the loader's reading of a size value rests on it, so keep the descriptor if you touch MethodInstantiater."),
  ("positions:2026-09-26 fourth batch-5 answer", "The descriptor factory RTTIsize.of; a size inside NN32 must still reach it, so check dispatch near the bound goes through it."),
  ("positions:2026-09-21 nat plan", "Where an unknown size is an error; your refusal sits beside that rule and refuses no size the plan leaves alone."),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("ledger:418", "Walk's truncation of a size, which you fix; its expected failure XXXNatBigSizeWalk is the test you promote."),
  ("ledger:334", "The GCD and LCM row with its evidence; the unsigned LCM you fix is its last unfixed face."),
  ("ledger:347", "Int.rc's uncatchable error, still reached from Int$Choose and Int$Pow; it closes if your fix leaves no uncatchable caller, which you show."),
  ("ledger:450", "The three range bodies that relied on wrapping, their tests and their fix; you repair them and promote the two tests."),
  ("ledger:451", "The sequential step past the last element, its test and its fix; you repair it and promote the test."),
  ("ledger:438", "Integer power declared RR64: not yours, so leave the power's declared type as it is."),
  ("ledger:441", "A negative power's result, Pavol's to choose: leave the negative branch of each Pow native as it is."),
  ("ledger:307", "The checker's nat and int handling, with the note that the arithmetic refusal names nat for an int; say what your int refusal says."),
  ("doc:explorations/compile-ladder/rung-size-runtime/JUDGE.md#For Pavol", "The judge who read sizes back at any magnitude; the decision on a size's range reverses that reading, so know what it did."),
  ("doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@size's range", "The finding that brought a size's range to Pavol; your restated NatRtBigSize answers it."),
  ("doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@size-range", "The review's proposed fix, a refusal beside the arithmetic refusal; the record keeps the checker's IntLiteral type, so take the refusal and not the retyping."),
  ("doc:explorations/reviews/batch-3.5-4-conformance.md#Smaller findings, for the record@sign-extended operands", "Where NN32 LCM's sign extension was first seen, with its fix, widening as Gcd does."),
  ("doc:explorations/reviews/batch-6b-7-conformance.md#Findings@Nine natives still give no catchable", "The finding that widened this rung to the nine natives, with its evidence by reading; your tests are their first measurement."),
  ("doc:explorations/reviews/batch-6b-7-conformance.md#Findings@Rows 450 and 451 have a decided repair", "The finding that placed rows 450 and 451 in this batch; check your repair covers every body it names."),
  ("doc:explorations/reviews/batch-7R-conformance.md#Findings@Rows 450 and 451 have no batch", "Why the repair matters beyond walk: the compiled path runs these bodies at the switch-over."),
  ("doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters", "The specification's sentence the refusal rests on; cite it in every refusal message and assertion."),
  ("doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators", "The specification's GCD, LCM and CHOOSE; cite it in the natives test's messages."),
  ("doc:Specification/basic/expressions/ranges.tex#Ranges", "The specification's ranges, a:b, a#n and the size, sets whose every element fits; the answers your repaired bodies give at MIN and MAX."),
  ("doc:explorations/compile-ladder/plan-6.5/NOTES.md#5. NN32's LCM", "The probe that measured NN32's LCM wrapping; your test restates its case as an assertion."),
  ("doc:explorations/compile-ladder/plan-6.5/NOTES.md#7. What was not probed", "What the planner left to you: walk's size site, which you measure, and the type of a size value, which stays."),
  ("doc:explorations/compile-ladder/plan-6.5/probes/lcm/NN32Lcm.walk.txt", "The base's 2147483648 LCM 7 answering 2147483646; your failing test reproduces it."),
  ("doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#3. The precedent search", "Rung O's devices for the natives, and its list of the ten it left; use its devices for yours."),
  ("doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#8. The comparison", "How rung O compared the interpreter corpus for its natives; run the same three passes."),
  ("doc:explorations/compile-ladder/rung-overflow-natives/REPORT.md#9. The logging pass", "Rung O's logging pass, which found the bodies that relied on a wrap; say whether yours needs one, and why."),
  ("doc:explorations/reviews/wrap-dependent-code.md#The library's own ways", "The library's own ways to avoid an overflow, reorder, meetingPoint, floorAverage; choose among them for each range body, never a wrapping operator."),
  ("code:" + SRC + "/scala_src/typechecker/TypeWellFormedChecker.scala#private val sizeArithmetic..private def hasSizeArithmetic", "The checker's refusal of arithmetic in a size, the precedent for where a size refusal sits and how it reads; put yours beside it."),
  ("code:" + SRC + "/scala_src/typechecker/staticenv/KindEnv.scala#def getType", "Where the checker types a size value as IntLiteral; it stays, and changing it is a stop."),
  ("code:" + SRC + "/runtimeSystem/MethodInstantiater.java#public void visitMethodInsn", "The loader's reading of a size value by bit length; change it only if the emission must, and report why."),
  ("code:" + SRC + "/interpreter/evaluator/EvalType.java#public static void bindGenericParameters", "Walk's negative-size check, where the parameter's kind is known; the precedent for walk's refusal."),
  ("code:" + SRC + "/interpreter/evaluator/EvalType.java#public FType forIntArg", "Walk's size site, IntNat.make of intValue(), which keeps the low 32 bits; the line row 418 needs fixed."),
  ("code:" + GLUE + "/NN32.java#public static final class Gcd extends NN2N..public static final class Choose extends NN2N", "NN32's Gcd, Lcm and Choose: Gcd's Unsigned.toLong is the file's own widening for Lcm's and Choose's sign-extended operands."),
  ("code:" + GLUE + "/NN32.java#public static final class Pow extends NativeMeth1", "NN32's power, which calls NN32.rc and hands UnsignedLong a sign-extended base; you fix both."),
  ("code:" + GLUE + "/NN32.java#public static int rc(long i)", "NN32.rc's error, which no catch sees; replace its use with the catchable raise."),
  ("code:" + GLUE + "/Int.java#public static final class Lcm extends ZZ2Z..public static final class Choose extends ZZ2Z", "Int$Lcm already raises catchably, the model; Int$Choose calls Int.rc, which you fix."),
  ("code:" + GLUE + "/Int.java#public static final class Pow extends NativeMeth1", "Int$Pow, rc over a power computed in a long; fix both the uncatchable error and the long's wrap, the negative branch untouched."),
  ("code:" + GLUE + "/Int.java#public static int rc(long i)..public static FortressError overflow()", "Int.rc beside Int.overflow(), the catchable raise every fixed native uses."),
  ("code:" + GLUE + "/Int.java#public static long lcm(long u, long v)", "Int.lcm's guards, the file's own check of a multiple that does not fit."),
  ("code:" + GLUE + "/Int.java#public static long choose(long n, long k)", "The shared binomial helper, which multiplies before it divides and can wrap; ZZ32's and ZZ64's CHOOSE reach it."),
  ("code:" + GLUE + "/Int.java#public static long pow(long x, long y)", "The shared power helper, unchecked in a long; ZZ32's and ZZ64's power reach it."),
  ("code:" + GLUE + "/Long.java#public static final class Lcm extends LL2L..public static final class Choose extends LL2L", "Long$Lcm already raises through Int.lcm; Long$Choose wraps through Int.choose, which you fix."),
  ("code:" + GLUE + "/Long.java#public static final class Pow extends NativeMeth1", "Long$Pow wraps through Int.pow; you make it raise, the negative branch untouched."),
  ("code:" + GLUE + "/UnsignedLong.java#public static final class Gcd extends UU2U..public static final class Choose extends UU2U", "NN64's Lcm, an unchecked multiplyToLong, and Choose; you make both raise."),
  ("code:" + GLUE + "/UnsignedLong.java#public static final class Pow extends NativeMeth1", "NN64's power, unchecked; you make it raise, the negative branch untouched."),
  ("code:" + GLUE + "/UnsignedLong.java#public static long choose(long n, long k)..public static long pow(long x, long y)", "The unsigned binomial and power helpers, which NN32's natives also call; where an unsigned check goes."),
  ("code:" + HELP + "/simpleIntArith.java#public static int intToIntPower(int a, int b)", "The compiled path's ZZ32 power, which raises IntegerOverflow; the team's own checked power."),
  ("code:" + HELP + "/simpleIntArith.java#public static int intOverflowingChoose(int n, int k)", "The compiled path's ZZ32 CHOOSE, which raises IntegerOverflow; the team's own checked binomial."),
  ("code:" + HELP + "/simpleLongArith.java#public static long longOverflowingChoose(long n, long kk)", "The compiled path's ZZ64 CHOOSE, the same device at 64 bits."),
  ("code:" + HELP + "/simpleUnsignedIntArith.java#public static int unsignedIntOverflowingChoose(int n, int k)", "The compiled path's NN32 CHOOSE, the 64-bit one narrowed with a check; the unsigned device."),
  ("code:Library/RangeInternals.fss#trait CompactFullScalarRange extends..getter isEmpty(): Boolean = self.lower > self.upper", "The size getter that computes the distance before it tests emptiness (row 450); test emptiness first."),
  ("code:Library/RangeInternals.fss#trait StridedFullScalarRange..getter isEmpty(): Boolean =", "The strided size, the same shape by reading; reorder it the same way."),
  ("code:Library/RangeInternals.fss#object CompactFullSeqScalarRange(l:ZZ32, r:ZZ32)", "The sequential generate and loop that step past the last element (row 451); step only while the next element is in the range."),
  ("code:Library/RangeInternals.fss#object StridedFullSeqScalarRange(l:ZZ32, r:ZZ32, str:ZZ32)", "The strided sequential steps, the same defect with a stride; the same fix."),
  ("code:Library/RangeInternals.fss#sized1Range(lo:ZZ32,ex:ZZ32)..sized3Range(", "The helpers of # with lo+ex-1 (row 450); reorder, and build the empty MIN # 0 without lo-1."),
  ("code:Library/FortressLibrary.fss#trait CompactFullRange[", "The size operator whose (u - l') + 1 overflows at the bounds (row 450); test emptiness first, the one line of FortressLibrary you may change."),
  ("code:Library/RangeInternals.fss#meetingPoint(init0:ZZ32", "The library's own body that tries to avoid overflow by stepping; a precedent for a reorder."),
  ("doc:ProjectFortress/compiler_tests/NatRtBigSize.fss", "The revival test that gates sizes to 2^64-1; you restate it to NN32's range, each changed line listed before and after."),
  ("doc:ProjectFortress/tests/XXXNatBigSizeWalk.fss", "Row 418's expected failure; it passes once walk reads sizes exactly, and you promote it by git mv."),
  ("doc:ProjectFortress/compiler_tests/XXXNatArithChecker.fss", "The expected-failure compile test of the arithmetic refusal; your refusal test takes its shape."),
  ("doc:ProjectFortress/compiler_tests/XXXNatArithChecker.test", "Its .test file, pinned by compile_err_contains; pin your refusal's message the same way."),
  ("code:ProjectFortress/tests/IntSemanticsRungI.fss#overflows(f: () -> Any): Boolean =..zz32Shown(v: Any): String =", "The helper that catches IntegerOverflow alone; assert every raise of the natives test through it."),
  ("doc:ProjectFortress/tests/XXXRangeBoundsRungO.fss", "Row 450's expected failure; it passes on your repair, and you promote it by git mv, no assertion changed."),
  ("doc:ProjectFortress/tests/XXXRangeEmptyHashRungO.fss", "Row 450's MIN # 0 expected failure; the same."),
  ("doc:ProjectFortress/tests/XXXSeqRangeTopRungO.fss", "Row 451's expected failure; the same."),
  ("A size is carried at run time as a descriptor", "How a size runs compiled today; a size inside NN32 must keep loading and dispatching."),
  ("The compiled type checker checks nat and int static parameters", "What the checker already checks for sizes, and where; your refusal extends it."),
  ("A size at run time can follow the opr path", "Why the checker count stays: the one library's own sizes are the literals 0 to 3."),
  ("The interpreter's integer rules", "Walk's integer rules as landed; your natives complete the overflow rule for LCM, CHOOSE and power."),
  ("Under walk, a native can raise a Fortress exception", "How a native raises the catchable IntegerOverflow; every native you fix raises that way."),
  ("Under walk, fixed-width integer arithmetic raises", "What rung O built, how it was measured, and what it left open, rows 450 and 451 and the ten natives among it."),
  ("The one library's scalar ranges are over", "The ranges as batch 7R left them, over ZZ32 alone, and the tests that gate them; your bodies keep every answer inside the bounds."),
  ("What relies on fixed-width wrapping under", "Which library code meant to wrap and which must not overflow; the range bodies must not, so they are reordered."),
  ("An XXX compile test pinned by compile_err_contains", "How the harness reports an XXX compile test whose program compiles; show your refusal test failing on the base for its own reason."),
  ("An XXX*.fss in the interpreter corpus IS a gated expected-failure test", "The mechanism behind walk's refused case and the three XXX tests you promote."),
  ("ant compileAll deletes a tracked file", COMPILEALL),
  ("map:compile-path-walkthrough.md#What the specification says it is", "What a nat parameter is in the specification; the context of the refusal's wording."),
  ("map:README.md#Touch this@scala_src/typechecker", "What a checker edit moves and which tests guard it; run those."),
  ("map:README.md#Touch this@interpreter/ (evaluator", "What an evaluator edit moves and which tests guard it; run those."),
]
E_CHECKS = [
  "positions:2026-09-27 size's range", "positions:2026-09-22 ledger row 334", "positions:2026-09-24 ledger row 379",
  "positions:2026-09-26 fifth batch-5 answer", "positions:2026-09-26 rung O of climb batch 4",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "positions:2026-09-28 rungs re-running measurements",
  "ledger:418", "ledger:334", "ledger:347", "ledger:450", "ledger:451",
  "doc:explorations/reviews/batch-6b-7-conformance.md#Findings@Nine natives still give no catchable",
  "doc:Specification/basic/trait-parameters.tex#Nat and Int Parameters",
  "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators",
  "doc:Specification/basic/expressions/ranges.tex#Ranges",
  "code:" + SRC + "/scala_src/typechecker/TypeWellFormedChecker.scala#private val sizeArithmetic..private def hasSizeArithmetic",
  "code:" + SRC + "/interpreter/evaluator/EvalType.java#public static void bindGenericParameters",
  "code:" + SRC + "/interpreter/evaluator/EvalType.java#public FType forIntArg",
  "code:" + GLUE + "/NN32.java#public static final class Gcd extends NN2N..public static final class Choose extends NN2N",
  "code:" + GLUE + "/Int.java#public static final class Pow extends NativeMeth1",
  "code:" + HELP + "/simpleIntArith.java#public static int intToIntPower(int a, int b)",
  "code:" + HELP + "/simpleIntArith.java#public static int intOverflowingChoose(int n, int k)",
  "code:Library/RangeInternals.fss#trait CompactFullScalarRange extends..getter isEmpty(): Boolean = self.lower > self.upper",
  "code:Library/RangeInternals.fss#object CompactFullSeqScalarRange(l:ZZ32, r:ZZ32)",
  "code:Library/RangeInternals.fss#sized1Range(lo:ZZ32,ex:ZZ32)..sized3Range(",
  "doc:ProjectFortress/compiler_tests/NatRtBigSize.fss", "The compiled type checker checks nat and int static parameters",
]

P_BRIEFING = [
  ("positions:2026-09-22 ledger row 335", "The shift decision, bit operators with the smart-shift rule on the fixed widths and an exact shift on ZZ; your text states it."),
  ("positions:2026-09-22 ledger row 334", "GCD and LCM nonnegative, IntegerOverflow when the multiple does not fit, on both paths; state it where the specification describes them."),
  ("positions:2026-09-22 ledger row 333", "The overflow guards test for the minimum; write nothing about negation or absolute value that contradicts it."),
  ("positions:2026-09-22 ledger row 346", "narrow truncates, keeping the low 32 bits; your text states it."),
  ("positions:2026-09-22 design principle for integer semantics", "JVM defaults where they make sense, corrected where precision matters; the reason behind each rule, for the decision record."),
  ("positions:2026-09-24 climb batch 3.5", "The rider that the signed narrow truncates too; state narrow for both signs."),
  ("positions:2026-09-24 ledger rows 380 and 381", "A ZZ32 shifted by a count of any integral type; state it with the shifts."),
  ("positions:2026-09-24 requirement on the plan", "Pavol's requirement that the specification states what the project changed and why; the reason this rung exists."),
  ("positions:2026-09-26 S1", "The form of every change, text in place, a revision callout, an Appendix I entry quoting the original, reasons in a decision record; follow it for each passage."),
  ("positions:2026-09-26 first of the batch-5 answers", "Quote each original as the Working Draft of February 2011, with its path and line in Specification-1.0-frozen/."),
  ("positions:2026-09-26 lineage note", "Cite the later Types chapter beside the specification where it covers a topic; check it for each passage you revise."),
  ("positions:2026-09-26 number chapters under S2", "The number chapters describe the library and are checked against it; why QQ's listing takes the library's traits."),
  ("positions:2026-09-26 answer 6", "The subtype lists rewritten as the library's check methods; the rational chapter's revision your QQ sentence joins."),
  ("positions:2026-09-19 answering the open question", "The library's practice is the standard; where text and library differ, the library decides what you write."),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("ledger:394", "The coercion example its own chapter's definition refuses; you give it the exclusion and close the row."),
  ("ledger:440", "0/0 compared with itself under walk; you write its expected-failure test and do not change the library."),
  ("ledger:443", "A numeral beyond ZZ32 not converted to RR64 under walk; you write its expected-failure test, the fix being batch N's."),
  ("ledger:335", "The shift row with its measurements; your text states what it fixed, and you append a note."),
  ("ledger:346", "The narrow row; your text states its rule, and you append a note."),
  ("doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1", "The finding that rung S left 13 test citations moved, and the map of unchanged lines batch 6 re-anchored 177 with; re-anchor your own edits' citations that way."),
  ("doc:explorations/compile-ladder/rung-spec-comprises/REPORT.md#The re-anchoring", "How batch 7C's rung X re-anchored the citations rung S moved in its files, from the text each was written against; do the same for the rest."),
  ("doc:explorations/compile-ladder/rung-spec-comprises/probes/reanchor/stale-scan.txt", "X's scan, the citations rung S left moved, line by line, two of them to rewritten text; the list you re-anchor."),
  ("doc:explorations/compile-ladder/rung-spec-numbers/JUDGE.md#1.5 Example 1 against the numerals", "The ruling that row 443's conversion is the specification's answer; your test asserts it."),
  ("doc:explorations/compile-ladder/rung-spec-numbers/JUDGE.md#1.8 The rows", "The ruling that rows 440 and 443 each owe a home-2 walk test; the two tests you write."),
  ("doc:explorations/reviews/batch-3.5-4-conformance.md#Batch 3.5 as a whole", "The review that found the integer rules written nowhere; your list answers it."),
  ("doc:explorations/reviews/batch-3.5-4-conformance.md#Findings that need Pavol@specification is behind", "Which rules the specification lacks; check that your list covers each."),
  ("doc:explorations/reviews/batch-3-conformance.md#Findings that need Pavol@library comment", "The scalar comment's finding and its default, state only what is lost; your reword follows it."),
  ("doc:explorations/reviews/batch-6-conformance.md#Smaller findings, for the record@algebraic supertraits", "The finding that QQ's listing lacks the library's algebra; your QQ edit answers it."),
  ("doc:Specification/basic-lib/basic-integers.tex#Integers", "The integer chapter whole, which you edit; read every passage on the operators before you choose where the rules go."),
  ("code:Specification/basic-lib/numbers.tex#%% trait QQ..%% end", "QQ's listing, which you give the library's supertraits."),
  ("doc:Specification/basic/conversions-coercions.tex#Coercion Resolution", "Row 394's example and the definition it breaks; you edit it."),
  ("doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators", "The overview's GCD, LCM and CHOOSE, one place the rules may go."),
  ("doc:Specification/basic/operators/opr-overview.tex#Multiplication, Division, Modulo, and Remainder Operators", "The overview's sentence that an integer overflow throws IntegerOverflow; keep your text consistent with it."),
  ("doc:Specification/appendices/changes.tex#The integer trait", "The integer chapter's existing Appendix I entry; the model for your entries' form."),
  ("doc:Specification/appendices/changes.tex#Passages not yet revised", "The subsection your entries go before, after batch 7C's last entry; take a passage off it when you revise it."),
  ("doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form", "How rung S applied S1; your callouts and entries take its form."),
  ("doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#2. The one reading everything rational rests on", "The rational chapter's reading of QQ with 0/0 and the infinities; your QQ sentence agrees with it."),
  ("doc:explorations/compile-ladder/rung-spec-numbers/decision-record.md#5. Decisions taken inside the rung", "Rung T's choices in the number chapters; undo none without saying so."),
  ("doc:explorations/compile-ladder/rung-library-comments/REPORT.md#5. How the change was verified", "How rung C checked a comment-only library edit by re-lexing; run the same check on the scalar comment."),
  ("doc:explorations/compile-ladder/plan-6.5/probes/numeral/NumMicro.base.txt", "Row 443's refusal on the base; your test fails with it."),
  ("code:Library/FortressLibrary.fsi#trait QQ extends..comprises { ... }", "The library's QQ, whose supertraits the listing states; copy them exactly."),
  ("code:Library/FortressLibrary.fss#(*) Scalar extension: an array of numbers..declarations beside these.", "The scalar block's comment in the component, which you reword."),
  ("code:Library/FortressLibrary.fsi#(*) Scalar extension: an array of numbers..declarations beside these.", "The same comment in the api, reworded identically."),
  ("The compiled path's integer rules", "What the compiled path runs; the text states no rule that neither path runs."),
  ("The interpreter's integer rules", "What walk runs; with the compiled path's rules, the landed code your text states."),
  ("The specification's number chapters describe the flat library", "What rung T already revised in the number chapters; your QQ edit continues it."),
  ("The specification states instantiation exclusion, and its refused examples", "Why row 394's example needs an exclusion; the rule your edit applies."),
  ("Specification-1.0-frozen/ is byte for byte", FROZEN),
  ("The team's latest word on types", "The later Types chapter's standing, cited beside the specification."),
  ("A comment placed after a declaration that ends in an expression", "A comment's span effect after a declaration; report it for the scalar comment."),
  ("Citing Specification/library/apis/*.tex as an independent standard is circular", "The generated apis render the library; never cite them as the standard for a rule."),
  ("The one library's number tower is flat", "QQ and the integer types as landed; the source your listing and rules describe."),
  ("map:README.md#Touch this@Specification/ (the standard)", "What a specification edit moves, the PDF and the test citations, and what guards it."),
  ("index:number chapters", "The notes on file on the number chapters; open those your passages touch."),
]
P_CHECKS = [
  "positions:2026-09-28 rungs re-running measurements", "positions:2026-09-22 ledger row 335", "positions:2026-09-22 ledger row 334", "positions:2026-09-22 ledger row 333",
  "positions:2026-09-22 ledger row 346", "positions:2026-09-22 design principle for integer semantics",
  "positions:2026-09-24 climb batch 3.5", "positions:2026-09-24 ledger rows 380 and 381",
  "positions:2026-09-26 S1", "positions:2026-09-26 first of the batch-5 answers", "positions:2026-09-26 number chapters under S2",
  "positions:2026-09-26 answer 6",
  "ledger:394", "ledger:440", "ledger:443",
  "doc:explorations/compile-ladder/climb-batch-6/JUDGE-review.md#Finding 1",
  "doc:explorations/compile-ladder/rung-spec-comprises/probes/reanchor/stale-scan.txt",
  "code:Specification/basic-lib/numbers.tex#%% trait QQ..%% end",
  "doc:Specification/basic/conversions-coercions.tex#Coercion Resolution",
  "doc:Specification/basic/operators/opr-overview.tex#GCD, LCM, and CHOOSE Operators",
  "doc:explorations/compile-ladder/rung-spec-route-a/decision-record.md#3.9 The form",
  "code:Library/FortressLibrary.fsi#trait QQ extends..comprises { ... }",
  "The compiled path's integer rules", "The interpreter's integer rules",
]

G_BRIEFING = [
  ("doc:explorations/coordinator/PLAN.md#Phase 2b. The repair batch from the conformance reviews", "The plan's list for this batch: the rows it gives G and row 417's gated home in the four-thread stage."),
  ("positions:2026-09-26 answer 9", "The positional rule; the dispatch programs are legal under it, and so is a dispatcher that is not a template."),
  ("positions:2026-09-26 answer 7 catch-all", "The generic SUM and PROD with the witness typecase; the identity functions you make pass values of type T."),
  ("positions:2026-09-24 run-time size design", "Design B; row 420 has a size twin that goes through descriptors."),
  ("positions:2026-09-26 fourth batch-5 answer", "The descriptor factory's race-safe table; a model for row 417's lock."),
  ("positions:2026-09-24 exclusion route rung P's fork", "Route A; the dispatch programs are legal under it."),
  ("positions:2026-09-17 a standing preference", "A deeper pass, never a rollback; if a fix fails, trace it further."),
  ("positions:2026-09-19 after climb batch 1 landed", "The process decisions every rung follows, test first among them."),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("ledger:417", "The class loader's first-load race; you fix it and write its four-thread program."),
  ("ledger:419", "The parallel task in a generic declaration, with its measured fix; you apply it and promote its test."),
  ("ledger:420", "The generic method over two parameter sets; locate its site and fix it, or record why not."),
  ("ledger:351", "The clause binding the code generator never reads, at two sites, with andCondCombine noted since rung H; you fix both sites."),
  ("ledger:426", "cast never matching on the compiled path; row 351 is its cause, and its numeral half is correct behaviour."),
  ("ledger:415", "RTTI serial numbers repeated across threads, fixed; the precedent for a thread-safe table in the run-time."),
  ("doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@Three compiled-path defects", "The finding that named rows 417, 419 and 420 for this batch."),
  ("doc:explorations/reviews/batch-5-conformance.md#Findings that need Pavol@cannot hold a defect", "Why row 417's gated home is the four-thread stage."),
  ("doc:explorations/reviews/batch-3-conformance.md#Two compiled dispatch defects that stayed out of every list", "The finding that named the two dispatch defects and their probes."),
  ("doc:explorations/reviews/batch-6-conformance.md#Findings that need Pavol@identity on the compiled path", "The finding that answer 7's identities fail compiled through cast; why row 426 is here."),
  ("doc:explorations/reviews/batch-6b-7-conformance.md#Findings@second clause-binding site", "The finding that added andCondCombine's shape to your tests and your skeptic's checks."),
  ("doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#2. The design", "The measured dispatch change's design; read it before you apply the patch."),
  ("doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#3. The size, measured", "Its measured size and its remainder, which you record and do not fix."),
  ("doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#4. The two side defects", "The two dispatch defects with their programs; your expected-failure tests."),
  ("doc:explorations/reviews/sum-replacement-judgement.md#7. Three checks that tell the options apart, still open", "The judgement's open checks on the identities; the checker refinement among them is not yours, and you report it as the way not taken."),
  ("doc:explorations/compile-ladder/plan-6.5/NOTES.md#2. Row 426", "The probe that traced row 426 to row 351 and to numerals; your cast test takes CastBind's shape."),
  ("doc:explorations/compile-ladder/plan-6.5/NOTES.md#3. The two compiled dispatch defects", "The dispatch change re-applied to the tree, with its three programs."),
  ("doc:explorations/compile-ladder/plan-6.5/NOTES.md#4. Row 419", "Row 419's patch applies as it stands."),
  ("doc:explorations/compile-ladder/plan-6.5/probes/dispatch/callsite-rebased.patch", "The dispatch change rebased, its probe switch still in it; remove the switch when you apply it."),
  ("doc:explorations/compile-ladder/rung-size-runtime/probes/xxx-task-red-demo-fix.patch", "Row 419's measured 13-line fix."),
  ("doc:explorations/compile-ladder/rung-size-runtime/probes/skeptic/ZsThreadsT.fss", "The program that fails row 417 at four threads; FirstLoadThreadsRungG takes its shape."),
  ("doc:ProjectFortress/compiler_tests/XXXNatRtTask.fss", "Row 419's expected failure, which you promote."),
  ("doc:ProjectFortress/compiler_tests/XXXNatRtMethBoth.fss", "Row 420's expected failure, promoted if you repair the row."),
  ("doc:ProjectFortress/library_tests/XXXClauseBindingRungB.fss", "Row 351's catch-site expected failure, which you promote."),
  ("doc:explorations/compile-ladder/rung-exclusion-remainder/probes/skeptic/SkTcBind.fss", "Rung H's skeptic's compiled clause binding at an arrow over ZZ32; your test binds over the function's own type parameter, which it does not cover."),
  ("code:" + SRC + "/runtimeSystem/InstantiatingClassloader.java#protected Class loadClass(String name, boolean resolve)", "Where the first-load race is; the lock goes here."),
  ("code:" + SRC + "/runtimeSystem/RTHelpers.java#static Object loadClosureClass(long l, BAlongTree t,", "Where a null class from the race is used; check the fix covers it."),
  ("code:" + SRC + "/runtimeSystem/RttiTupleMap.java#private RTTI putIfNewHelper", "The team's race-safe get then putIfNew; a model for the lock."),
  ("code:" + SRC + "/compiler/runtimeValues/RTTIsize.java#public static RTTI of(String size)", "putIfAbsent returning the winner, the pattern rung Z took."),
  ("code:" + SRC + "/compiler/codegen/CodeGen.java#public void forTypecase(Typecase x)", "Row 351's typecase site; bind the clause's name as a local here."),
  ("code:" + SRC + "/compiler/codegen/CodeGen.java#public void forTry(Try x)", "Row 351's catch site; the same fix."),
  ("code:" + SRC + "/compiler/codegen/CodeGen.java#public String delegate(Expr x", "Row 419's site, a task in a generic declaration."),
  ("code:" + SRC + "/compiler/codegen/CodeGen.java#public void forFnExpr(FnExpr x)", "The closure device row 419's fix copies."),
  ("code:Library/FortressLibrary.fss#The identity of + and of juxtaposition..multiplicativeIdentity[", "Answer 7's identity functions, the only library lines you may change."),
  ("code:Library/FortressLibrary.fss#combining two relational predicates into..Combined condition for relational predicates", "andCondCombine, the library's second clause binding, at an arrow type over its own type parameter; your typecase fix must read rp and rq, and a test in its shape shows it."),
  ("Generic instantiations", "How the loader stamps instantiations; the context of rows 417 and 420."),
  ("The XXX expected-failure mechanism in compiler_tests/", "A run-time defect needs two .test files; the shape of your dispatch tests."),
  ("The gate's thread count is pinned", "Why testFast runs one thread; FirstLoadThreadsRungG passes there and is gated at four by the stage."),
  ("The replacement for SUM's and PROD's catch-all", "The judgement behind answer 7; the values the identities keep."),
  ("The compile ladder loses one file", "Why a compiled check of a SUM's identity waits for the switch-over; say so in your report."),
  ("Under walk, the interpreter converts by coercion", "Why a typed local binding converts a numeral; one way to pass a T through cast."),
  ("A size is carried at run time as a descriptor", "How sizes run compiled; the context of row 420's size twin."),
  ("ant compileAll deletes a tracked file", COMPILEALL),
  ("map:compile-path-walkthrough.md#6. The run: the second JVM and the class loader", "The class loader's walkthrough; read it before row 417."),
  ("map:compile-path-walkthrough.md#What the loader and the code generator lack", "Known gaps of the loader and the code generator; row 420's site may be one."),
  ("map:README.md#Touch this@runtimeSystem/", "What a runtimeSystem edit moves and which tests guard it; run those."),
  ("map:README.md#Touch this@compiler/codegen/", "What a codegen edit moves and which tests guard it; run those."),
]
G_CHECKS = [
  "doc:explorations/coordinator/PLAN.md#Phase 2b. The repair batch from the conformance reviews",
  "positions:2026-09-26 answer 9", "positions:2026-09-26 answer 7 catch-all", "positions:2026-09-24 run-time size design",
  "positions:2026-09-27 stops a batch record reserves", "positions:2026-09-26 rung D's stop", "positions:2026-09-28 rungs re-running measurements",
  "ledger:417", "ledger:419", "ledger:420", "ledger:351", "ledger:426",
  "doc:explorations/reviews/batch-3-conformance.md#Two compiled dispatch defects that stayed out of every list",
  "doc:explorations/reviews/mie-probes/scope-call-site-dispatch.md#4. The two side defects",
  "code:" + SRC + "/runtimeSystem/InstantiatingClassloader.java#protected Class loadClass(String name, boolean resolve)",
  "code:" + SRC + "/compiler/codegen/CodeGen.java#public void forTypecase(Typecase x)",
  "code:" + SRC + "/compiler/codegen/CodeGen.java#public void forTry(Try x)",
  "code:Library/FortressLibrary.fss#The identity of + and of juxtaposition..multiplicativeIdentity[",
  "code:Library/FortressLibrary.fss#combining two relational predicates into..Combined condition for relational predicates",
  "The XXX expected-failure mechanism in compiler_tests/", "The replacement for SUM's and PROD's catch-all",
]

V_BRIEFING = [
  ("positions:2026-09-24 exclusion route rung P's fork", "Route A, the number types siblings under Number with their own algebra; the reason RR32 stops being an RR64."),
  ("positions:2026-09-26 answer 8", "An exact conversion is a coercion and a lossy one explicit; RR64 converts from RR32 and from nothing more."),
  ("positions:2026-09-26 answer 6", "The number chapters describe the library; the chapter names RR32 once it is a sibling."),
  ("positions:2026-09-26 number chapters under S2", "The chapters are checked against the library; your sentence states no more than the landed library."),
  ("positions:2026-09-26 S1", "The form of your specification change: a callout, an Appendix I entry quoting the original, a decision record."),
  ("positions:2026-09-26 first of the batch-5 answers", "Quote the original as the Working Draft of February 2011, with its path and line in Specification-1.0-frozen/."),
  ("positions:2026-09-26 lineage note", "Cite the later Types chapter beside, which keeps the number types exclusive."),
  ("positions:2026-09-26 climb batch 5 coordinator/CLIMB-BATCH-5.md", "Batch 5's comparison masks, its Q2; your corpus comparison normalises the same way."),
  ("positions:2026-09-26 Q1 of batch 6", "A team test line the change breaks is respelled keeping its value, never deleted; the rule for a line that asserts RR32 below RR64."),
  ("positions:2026-09-19 answering the open question", "The library's practice is the standard; RR64's declarations are the model for RR32's."),
  ("positions:2026-09-27 stops a batch record reserves", STOPS),
  ("positions:2026-09-26 rung D's stop", RUN_TO_RUN),
  ("positions:2026-09-28 rungs re-running measurements", GATE_BEFORE),
  ("ledger:435", "RR32's natives read their argument as an RR32; the row you close, its expected failure promoted."),
  ("ledger:430", "The overload message's order varies from run to run; a changed order in your comparison is this row, not a stop."),
  ("doc:explorations/reviews/batch-6-conformance.md#Findings that need Pavol@still a subtype", "The finding that RR32 below RR64 was a record's reading and not a decision."),
  ("doc:explorations/reviews/batch-6-conformance.md#Standard 2: the team's built intent@RR32 stays below", "The compiler library already has RR32 a sibling that RR64 converts from."),
  ("doc:Specification/basic/types-vals-vars.tex#Types in the Fortress Standard Libraries", "The sentence that the number types are mutually exclusive, the rule your edit restores."),
  ("doc:Specification/basic/conversions-coercions.tex#Automatic Widening", "The worked example that converts an RR32 into RR64 arithmetic; your test's expected answers."),
  ("code:Specification/basic-lib/numbers.tex#The number types of this chapter are..is explicit, written", "The passage that names the number types and their coercions; you name RR32 in it."),
  ("doc:Documentation/Specification/Prose/Language/types.tick#Types in the Fortress Standard Libraries", "The later Types chapter's same sentence, cited beside."),
  ("doc:research/extracts/SteeleJuliaCon2016-extract.md#The type system, and where it broke", "Steele's retrospective draws the floats as siblings; cite it in the decision record."),
  ("doc:explorations/compile-ladder/plan-6.5/NOTES.md#a sibling of", "The probe's two shapes and corpus passes; your comparison's prediction."),
  ("doc:explorations/compile-ladder/plan-6.5/probes/rr32/rr32-sibling-api.patch", "The probe's second shape; evidence to start from, not the brief."),
  ("doc:ProjectFortress/tests/XXXRR32MixedRungF.fss", "Row 435's expected failure, promoted once it passes."),
  ("doc:explorations/compile-ladder/rung-flat-tower/REPORT.md#11. The comparison", "Rung F's corpus comparison, the method you repeat."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object RR32 extends RR64", "RR32's api, which you restate."),
  ("code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object RR32 extends RR64", "RR32's component, which you restate."),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR64 extends { Number, Equality", "The compiler library's RR64 with its coerce from RR32; the team's shape."),
  ("code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR32 extends { Number, Equality", "The compiler library's sibling RR32."),
  ("code:Library/FortressLibrary.fsi#trait RR64 extends { Number, StandardPartialOrder", "The one library's RR64 api, the model for RR32's operators."),
  ("code:Library/FortressLibrary.fss#trait Number extends { AnyAdditiveGroup", "Number's comprises clause and its =, which you change for RR32."),
  ("The one library's number tower is flat", "The tower as landed and its coercion table; RR32 joins it."),
  ("The specification's number chapters describe the flat library", "What the chapter already says; your sentence joins it."),
  ("Under walk, the interpreter converts by coercion", "Why an RR32 converts to RR64 at a parameter under walk."),
  ("Specification-1.0-frozen/ is byte for byte", FROZEN),
  ("The team's latest word on types", "The later Types chapter's standing, cited beside the specification."),
  ("map:spec-to-implementation.md#What the compiler prelude has of the tower", "What the compiler prelude has of the tower, for the comparison with the compiled run."),
]
V_CHECKS = [
  "positions:2026-09-24 exclusion route rung P's fork", "positions:2026-09-26 answer 8", "positions:2026-09-26 answer 6",
  "positions:2026-09-26 number chapters under S2", "positions:2026-09-26 rung D's stop", "positions:2026-09-28 rungs re-running measurements",
  "ledger:435",
  "doc:Specification/basic/types-vals-vars.tex#Types in the Fortress Standard Libraries",
  "doc:Specification/basic/conversions-coercions.tex#Automatic Widening",
  "code:Specification/basic-lib/numbers.tex#The number types of this chapter are..is explicit, written",
  "code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi#value object RR32 extends RR64",
  "code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#trait RR64 extends { Number, Equality",
  "code:Library/FortressLibrary.fsi#trait RR64 extends { Number, StandardPartialOrder",
  "The one library's number tower is flat",
]

BRIEFINGS = {'E': E_BRIEFING, 'P': P_BRIEFING, 'G': G_BRIEFING, 'V': V_BRIEFING}
CHECKS = {'E': E_CHECKS, 'P': P_CHECKS, 'G': G_CHECKS, 'V': V_CHECKS}
LISTS = {rid: ([k for k, _ in BRIEFINGS[rid]], CHECKS[rid]) for rid in 'EPGV'}
REASONS = {rid: [(k, r) for k, r in BRIEFINGS[rid]] for rid in 'EPGV'}

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
    import subprocess, re, sys, os
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
            r = subprocess.run(['bash', 'explorations/coordinator/tools/facts-extract.sh', '--check'] + keys, capture_output=True, text=True, cwd=os.environ.get('FORTRESS_HOME', '/home/user/fortress'))
            lines = r.stdout.strip().splitlines()
            probs = [l for l in lines if 'not one' in l or 'not found' in l.lower() or 'no match' in l.lower() or 'nothing' in l.lower()]
            total = [l for l in lines if l.startswith('Total')]
            print(rid, name, 'keys', len(keys), 'exit', r.returncode, '|', total[0] if total else r.stderr.strip()[:200])
            for l in probs: print('   PROBLEM', l[:300])
            if r.returncode or probs: bad += 1
    print('bad lists', bad)
    sys.exit(1 if bad else 0)
