<!-- The record of climb batch 29, the seventh batch of the plan's phase 4, the switch-over, for the coordinating session, the curator and the batch's workers: the literals, one design on walk and on the compiled path before the switch-over. Drafted 2026-11-09 by an Opus planning worker against `main` at `7da318db4d`, whose code is the base build's `8cde0b2c4f` (`git diff --stat 8cde0b2c4f 7da318db4d -- Library ProjectFortress Specification build.xml bin` prints nothing), so climb batch 28's gate tables (`compile-ladder/climb-batch-28/gate/`) describe the base. Its content is PLAN's phase 4 line "Climb batch 29, the literals" (`coordinator/PLAN.md:68-76` at `1001bff8a3`) and its defaults the review list "Climb batch 29, listed for his review" (review-queue items 438 to 447). It proposes six rungs, N, C, F, G, S and T, three points with no default on record named as forks with defaults (section 2), and no question that holds the launch. Reviewed before the launch by the Fable review `coordinator/climb-batch-29-review.md`, whose changes are in place and whose recommended defaults stand (`coordinator` skill, `references/batch.md`, "The go"). -->
<!-- Sources: PLAN.md, phase 4's line on climb batch 29 and the review list; POSITIONS P-173, P-174, P-76, P-172, P-171, P-165, P-168 and their histories, P-12, P-26, P-37, P-40, P-48, P-49, P-58, P-74, P-96, P-148, P-154, P-160, P-167, P-169, cited by number; FACTS F-57, F-73, F-74, F-118, F-262, F-299, F-328; HELD.md, "Held in chat (2026-11-08)", 12:1x to 23:3x; the ledger rows 20, 79, 325, 360, 361, 362, 364, 432, 443, 454, 484, 486, 506, 578, 717, 721, 722, 824, 862, 943, 944, 945, 946; review-queue items 438 to 447; `reviews/literal-design-judgement-2026-11-08.md` whole; the prototype `compile-ladder/plan-29/probes/literal-default.md` and its patch; `reviews/literal-fork-2026-11-08.md`, sections 3, 4.2, 4.3, 5.3 and 6; `reviews/literals-2026-11-08.md`, sections 2.1 and 6.1; `reviews/row-364-walk-generics-2026-11-08.md` whole; `reviews/batch-28-review.md`, sections 2 and 3; `CLIMB-BATCH-28.md` as the form; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the `coordinator` skill's `references/batch.md` and `SKILL.md`, "The curator's role and decisions"; the code at the sites; the Working Draft's and the specification's sections cited. -->
<!-- The planner's probes: `compile-ladder/plan-29/PROBES.md`, in a worktree of the planner's own, `/home/user/fortress-p29`, seeded from the base build at `7da318db4d` and removed after. Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, loads 0.08 to 1.70. -->

# Climb batch 29

## 1. The manifest, rung by rung

The batch's generator writes the workflow's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. The rungs are in the manifest's order, N, C, F, G, S, T. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-29.md#`, PROTO for `doc:explorations/compile-ladder/plan-29/probes/literal-default.md#`, PROBES for `doc:explorations/compile-ladder/plan-29/PROBES.md#`, JUDGE for `doc:explorations/reviews/literal-design-judgement-2026-11-08.md#`, and SRC for `ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read.

| id | slug | title | expected minutes |
|---|---|---|---|
| N | `rung-numeral-types` | The numeral types: `NaturalNumeral` and `RadixPointNumeral` below `Numeral`, their four numbers as fields, each number type's coercions and `=` pairs, the 24 glue bindings gone, and walk's numerals converted where they stand | 110 |
| C | `rung-numeral-checker` | The checker's numerals: the default where nothing fixes a type, a numeral type written only as a parameter type, a numeral out of range or at a type with no coercion from it refused, and a size read as a value a `ZZ32` | 90 |
| F | `rung-literal-fold` | The fold: numerals alone folded exactly on both paths, a numeral at a typed place a constant rounded once, a program's coercion from a numeral called once per class, and two natural numerals concatenated | 75 |
| G | `rung-walk-language-types` | Walk's generics and messages at language types: a number or string value read at its trait where walk infers a static argument and where it prints a type | 60 |
| S | `rung-string-literals` | String literals: one object for each text on both paths, and a concatenation of literals folded | 40 |
| T | `rung-literals-spec` | The specification: the numeral types, their conversions and default, the fold, and a string literal as one object, with their Appendix I entries | 60 |

Fields common to the six rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-numeral-types`; **branch:** `wip/<slug>`.
- **writes state:** no. **its test is the stage:** no. **joins the gate:** none, but T's specification build at the gather (fork 7). **expected moves:** none.
- **lands only with:** C lands only with N; T lands only with N, C, F and S; N, F, G and S land on their own (section 4, "The rule the rungs keep").
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 28's gate left them (F-53) and as the prototype and probe 1 measured the design (PROBES `Probe 1. The`). **expected checker crash:** none.

### N
- **slug:** `rung-numeral-types`
- **worktree:** `/home/user/fortress-numeral-types`
- **section:** `N. The numeral types: NaturalNumeral and RadixPointNumeral below Numeral, their four numbers as fields, each number type's coercions and = pairs, the 24 glue bindings gone, and walk's numerals converted where they stand (P-174, P-76, P-172, P-173)`
- **blurb:** P-174 and P-76/P-172 in the one library: IntLiteral and FloatLiteral, with their 24 glue bindings, give way to trait Numeral and two value objects with the four numbers as fields, NaturalNumeral(digits, radix, digitValue) and RadixPointNumeral(digits, fractionDigits, radix, digitValue), in FortressLibrary beside Ratio; each of the eight number types coerces from them, the integer types and QQ exactly, RR64 and RR32 by one rounding on a new helper pair, each coercion with its = pair both ways; RR64 comprises Float alone; pi and e at RR64; the checker's two literal names switched by library as CHARACTER is, and its float tie rule; walk converts a numeral where it stands, place by place, its choice of declaration reading a numeral argument as the checker does, a program's coercion called with the numeral object once per site; SEQV of two numeral objects by their reduced values; rows 943, 944, 454, 443, 484, 361 and 578 close.
- **points to report:**
  - The library's declarations as written: Numeral, the two objects, their getters, asFloat, asString, and each coercion and pair, by type, in the component and the api.
  - The new helpers, their Java signatures and their bindings; walk's answers and the compiled helpers' at the edges of one rounding (a tie, the largest finite, a subnormal).
  - Walk's rule for a numeral argument as written, each walk class changed, and each place where walk converts a numeral.
  - Each line of the library that named IntLiteral or FloatLiteral, before and after; the glue classes left or deleted.
  - Each team test line changed (NumberPrintTest.fss, sequivTest.fss) with its before and after; each revival test respelled, promoted or removed, with its row.
  - The count table and the distance table on your final tree, the count run's seconds (P-148), and any site that comes.
  - Each test whose verdict changes in ant testSystem or ant testQuick; TupleOrderMixedRefused's, which rung G owns (section 4, rung G).
  - Every sentence made false: the Appendix I entries and boxes that name IntLiteral or FloatLiteral, F-57, F-74, F-79, F-118, F-328, the skill's numbers.
  - A file edited beyond those named, any edit of the prelude, of the code generator or of the checker beyond Types.java and the two functions named.
- **briefing** (28 keys, 14 checks):
  - P-174 (check): the decision you build: the numeral types, their four numbers as fields, a program's type through its coercion.
  - P-76 (check): an integer numeral's conversions, exact into the five integer types and QQ, one rounding into RR64 and RR32, and walk's half.
  - P-172 (check): a float numeral's conversions, its pairs, and walk's conversion at a binding, a parameter and a field.
  - P-173 (check): where a numeral converts, the default where nothing fixes a type, the float tie, and walk place by place before P-12.
  - P-165: asFloat on each number type, and an = pair for each coercion.
  - P-168 (check): SEQV, with the one exception of two numeral values inside a coercion's body.
  - P-169: the 24 numeral glue bindings, which leave with the two objects.
  - P-49: a declaration that fits as it is wins over one that coercion reaches, the rule your walk dispatch keeps.
  - P-37: no declaration is added to the prelude, whose names stay.
  - F-74: walk's integer numeral by its value today, which your rule keeps where nothing fixes a type.
  - F-299: walk's loader of helpers and its carriers, which your rounding helpers meet.
  - ledger:943 (check): a float numeral bound at RR64 stays a FloatLiteral under walk, which closes.
  - ledger:944 (check): QQ takes no float numeral, which closes.
  - ledger:454 (check): NN32, NN64 and RR32 bindings refuse numerals, which closes on both halves.
  - ledger:443: walk refuses a numeral beyond ZZ32 at RR64, which closes.
  - ledger:578: IntLiteral's own arithmetic, which goes with the object and its test.
  - JUDGE `1. Coherence` (check): the design's one rule and its six repairs, which the curator took.
  - JUDGE `Appendix: the test list and citations` (check): the programs whose walk answers your tests assert.
  - PROTO `Step 1, the library` (check): the prototype's library change, which you rename and complete.
  - PROTO `4.5 Walk`: the 71 walk failures of the library change alone, and why walk needs your rule.
  - PROTO `6. A program`: a program's own number type, an interval and bfloat16, your own-type tests.
  - PROTO `7.1 A hybrid`: the four numbers, walk's FFloatLiteral parts and the reduced-value SEQV.
  - PROBES `Probe 1. The` (check): the pairs kept, count and distance 0, and RR32's missing coercion from an integer numeral.
  - `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object IntLiteral extends Number` (check): the object you remove, with its 21 glue bindings.
  - `code:Library/FortressLibrary.fss#value object Ratio(num: ZZ, den: ZZ) extends { QQ }`: the library's value object with fields, the form of yours.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/Types.java#public static void useFortressLibraries` (check): the switch of names by library, which your two names join.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FFloatLiteral.java#public class FFloatLiteral`: walk's float numeral today, its parts and its double-based SEQV.
  - REC `Forks the batch takes`: the defaults your rung builds, each with the ways not taken.

### C
- **slug:** `rung-numeral-checker`
- **worktree:** `/home/user/fortress-numeral-checker`
- **section:** `C. The checker's numerals: the default where nothing fixes a type, a numeral type written only as a parameter type, a numeral out of range or at a type with no coercion from it refused, and a size read as a value a ZZ32 (P-173, P-174, P-40)`
- **lands only with:** N.
- **blurb:** P-173's and P-174's checker, from the prototype's step 2: a numeral where nothing fixes a type, at an untyped binding, Any, Object, Number, an unbounded type parameter, a receiver or a join, coerced to its default, ZZ32, ZZ64 or ZZ by value, RR64 with a radix point; a type parameter that several numerals fix at the narrowest default holding them all; the numeral types written in a program only as a parameter type; a numeral outside its type's range refused statically (row 325); a program's type with no coercion from the numeral type refusing a numeral, the prototype's chain not built and its step 5 kept in its narrow form (probe 1; fork C4); a nat or int parameter read as a value a ZZ32 (row 486); rows 79, 946, 486 and 325 close; the team's compiled tests that write IntLiteral respelled; P-148's timing.
- **points to report:**
  - Each place where the checker now applies the default, with its code site, and each place it does not, with the reason.
  - The rule for a type parameter that several numerals fix, as written, and its answers on your tests.
  - The written-only rule's message, where it applies and where not, and inferred bindings inside a coercion's body.
  - The range refusal's message and the types it covers.
  - The nat value: KindEnv's change and the code generator's, and the compiled answers of row 486's program.
  - Each team test line changed (Compiled5.ah, 5.aj, 5.ak, 6.az, 9.g, 9.j, 9.p, 9.t, 9.u, and the pinned texts of XXX6at, XXX6bw and XXXApplicationErrors) with its before and after; each revival test respelled, promoted or rewritten, with its row.
  - The count and distance tables on your final tree; P-148's change and pass runs with their seconds, the profile's top frames, and the comparison of results.
  - Each test whose verdict changes in ant testQuick.
  - Every sentence made false: F-57, F-73, F-79, inference.tex's numeral sections, the skill's numbers.
  - A file edited beyond those named, any edit of the library, of walk or of the prelude.
- **briefing** (24 keys, 13 checks):
  - P-173 (check): the decision whose checker you build: where a numeral converts, the default, the tie and the range.
  - P-174 (check): a numeral type written only as a parameter type, and a program's type refusing a numeral without a coercion from the numeral type.
  - P-49 (check): the checker's two attempts, which your default ranks within.
  - P-40 (check): a size used as a number converts to ZZ32, the type a nat value takes.
  - P-74: an exact conversion is implicit, so a ZZ32 default still converts to ZZ64.
  - P-37: no edit of the prelude, whose names your rule must exempt.
  - P-148 (check): the checker's timing, a change and a pass.
  - F-57: a numeral's type by path and library today.
  - F-73: the coercion inference whose candidates the default narrows.
  - ledger:79 (check): a numeral at Object and Any stays IntLiteral compiled, which closes.
  - ledger:946 (check): a variable bound from a numeral read as ZZ32 at a tie, which closes.
  - ledger:486 (check): a nat value typed IntLiteral, which closes.
  - ledger:325 (check): a numeral out of range at run time, which closes statically.
  - ledger:506: the 64-combination cap, whose test turns red under the default.
  - ledger:362: a float numeral's rendering, whose test turns red under the default.
  - JUDGE `1. Coherence` (check): the definition of fixes a type, the default for numerals only, the narrowest default, refuse rather than chain.
  - JUDGE `Appendix: the test list and citations`: the compiled answers your tests assert.
  - PROTO `Step 2, the checker` (check): the prototype's checker, which you complete.
  - PROTO `4.3 The compiled suites` (check): the tests that flip or break, and how the prototype respelled three.
  - PROBES `Probe 1. The` (check): the chain not needed once the pairs are kept; the library clean with step 5 and without it.
  - `doc:explorations/reviews/literal-fork-2026-11-08.md#3.7 A defect found on the way`: row 946's mechanism.
  - `code:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala#def getType(x: Name)`: where a nat value is typed IntLiteral.
  - `doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie`: the tie rule, which the default widens.
  - REC `Forks the batch takes`: the defaults your rung builds, each with the ways not taken.

### F
- **slug:** `rung-literal-fold`
- **worktree:** `/home/user/fortress-literal-fold`
- **section:** `F. The fold: numerals alone folded exactly on both paths, a numeral at a typed place a constant rounded once, a program's coercion from a numeral called once per class, and two natural numerals concatenated (P-173, P-174, P-172)`
- **blurb:** P-173's fold, from the prototype's step 3: the fold phase run in walk's phase order too, so both paths fold alike (probe 2); an expression of numerals alone folded exactly into numerals as written, an integer, a decimal with a radix point, or the quotient of two such, the operators that need a width left alone and the base's CHOOSE crash and BOXPLUS fold repaired (probe 3); two natural numerals of one radix joined by || folded into one; on the compiled path a numeral at a typed place a constant rounded once (row 862) and a program's coercion from the numeral type called once per class, when the class loads, one object per site; two tests that meant ZZ32 arithmetic on numerals given typed operands.
- **points to report:**
  - The operators folded and those left alone, each with its reason; the forms of a folded result, with an example of each.
  - The phase order of both paths before and after, and each walk answer that the fold changes.
  - The two repaired defects with their tests, and their rows.
  - The typed-place constants: the types folded, the rounding as written, and row 862's numerals before and after.
  - The once-per-class call as compiled: where the class holds the result, when the call runs, and what a raising coercion does.
  - NativeHelperFamilyZZ32Walk.fss:31 and ChooseZZ32Walk.fss as changed, each line before and after.
  - The count and distance tables on your final tree, which read the folded library, and any site that comes.
  - Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false: F-118, F-262, constant.tex and literals.tex where they speak of static expressions.
  - A file edited beyond those named, any edit of the checker's Scala under typechecker/, of the library or of the prelude.
- **briefing** (21 keys, 12 checks):
  - P-173 (check): an expression of numerals alone folds exactly before the checker into a signed constant with its three defaults.
  - P-174 (check): a program's coercion called once per class, at load, one object per site, review-queue item 440's default.
  - P-172 (check): one rounding into RR64 and RR32, and row 862.
  - P-12: walk runs the phases it runs today, the fold among them by your change.
  - F-262: today's fold of prefix minus, the one sign a numeral node carries.
  - F-118: how the code generator carries a numeral's value today.
  - ledger:862 (check): two or three roundings, which closes with XXXFloatNumeralOneRounding promoted.
  - ledger:954 (check): the fold stopping the compile at a CHOOSE of two numerals where the answer is 0, which closes.
  - ledger:955 (check): the fold taking the wrapping and saturating operators on two numerals as exact + and -, which closes.
  - JUDGE `1. Coherence` (check): repair 3, the fold's signed constant, and a program's coercion seeing written numerals only.
  - JUDGE `4. The sub-choices`: x = 7/2 a QQ, and the fold free and favoured by the Draft.
  - PROTO `Step 3, the fold` (check): the prototype's fold, which you complete and correct.
  - PROBES `Probe 2. The fold phase` (check): the phase in walk's order, 789 of 791, and the two tests.
  - PROBES `Probe 3. Two defects` (check): the CHOOSE crash and the BOXPLUS fold.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java#private Node foldBinaryOperator` (check): the fold you rework.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java#static public final PhaseOrder[] interpreterPhaseOrder`: walk's phase order, which gains the fold.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forFloatLiteralExpr`: the float constant, rounded two or three times today.
  - `doc:Specification/basic/expressions/constant.tex#Types of Static Expressions` (check): the static expressions and the concatenation of literals.
  - `doc:Specification-1.0-frozen/basic/expressions/literals.tex#Literals`: the rational value of a radix-point numeral and the one rounding.
  - `doc:explorations/reviews/literal-fork-2026-11-08.md#4.2 Reading B`: the fold's two parts and their sizes by reading.
  - REC `Forks the batch takes`: the defaults your rung builds, each with the ways not taken.

### G
- **slug:** `rung-walk-language-types`
- **worktree:** `/home/user/fortress-walk-language-types`
- **section:** `G. Walk's generics and messages at language types: a number or string value read at its trait where walk infers a static argument and where it prints a type (row 364's way A)`
- **blurb:** row 364's way A, with the review's strings and messages: walk's inference reads a value of the five native number objects at its trait, ZZ32, ZZ64, ZZ, RR64 and NN64, and of the four string objects at String, also inside tuples, at EvaluatorBase's three reads of a value's type, by a helper moved from ObjectPrims.traitOf into evaluator/types; walk's messages and Reflect's text print those types by their trait; so Cell(3) is a Cell[\ZZ32\] and Cell("s") a Cell[\String\] under walk; LongStringTests' two Generator[\Int\] lines respelled; six XXX tests promoted; rows 364, 432, 721, 722 and 717 close and 20 and 824 narrow.
- **points to report:**
  - The helper as written and each read that calls it, with its line.
  - Where a type's text is made for messages and for Reflect, and the messages that now print a trait; the three TupleOrder keys before and after.
  - LongStringTests.fss:121 and :141 before and after.
  - Each XXX test promoted, and each row closed or narrowed, with its whole new line where it narrows.
  - Each test whose verdict changes in ant testSystem; the 52 demos are the gather's.
  - Every sentence made false: F-74, F-229, F-328, the skill's sentences on walk's Int and the instance at the class.
  - A file edited beyond those named, any edit of LHSEvaluator.java's or OverloadedFunction.java's dispatch and binding code, or of the library.
- **briefing** (18 keys, 9 checks):
  - P-48 (check): a type parameter that a call does not fix takes its bound; dispatch under walk takes the value's type, read here as its trait.
  - P-167: the five stop being types a program sees, which your messages extend.
  - P-154: row 774's walk half waits for row 364 for lists, integer and string.
  - P-74: promotion, which the trait keeps.
  - F-74: walk's integer numeral by its value, an Int, which you read at ZZ32.
  - F-328: the ilk that already prints the trait.
  - F-229: the one type ZZ32 comprises.
  - ledger:364 (check): the gap you close, number and string halves.
  - ledger:432 (check): a bare big operator over a list of numerals, which closes.
  - ledger:721 (check): the array factories at Int, which closes.
  - ledger:722: openRange at Int, which closes.
  - ledger:717: the inner comprehension at its elements' class, whose integer case closes.
  - `doc:explorations/reviews/row-364-walk-generics-2026-11-08.md#1. Where walk instantiates at a run-time class` (check): the sites.
  - `doc:explorations/reviews/row-364-walk-generics-2026-11-08.md#2. The ways (item 1)` (check): way A, its size, its flips and LongStringTests.
  - `doc:explorations/reviews/row-364-walk-generics-2026-11-08.md#3. What else still shows the five to a program (item 2)` (check): the messages and Reflect.
  - `doc:explorations/reviews/row-364-walk-generics-2026-11-08.md#4. Conflicts with decisions (item 3)` (check): P-48 and P-154 as the review read them.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java#static java.lang.String traitOf(FType t)` (check): the test of the five, which you move.
  - REC `Forks the batch takes`: the defaults your rung builds, each with the ways not taken.

### S
- **slug:** `rung-string-literals`
- **worktree:** `/home/user/fortress-string-literals`
- **section:** `S. String literals: one object for each text on both paths, and a concatenation of literals folded (P-171)`
- **blurb:** P-171, the literals review's ways S-b with compiled way (i) and S-d: walk's evaluator interns a string literal's text with String.intern() and walk's SEQV compares two flat strings' carried Java strings by ==; the compiled equalityRule compares the Java strings two FJavaString wrappers carry by ==; a concatenation by || of two string literals, or of a string and a character literal, folded into one string literal in the desugaring phase before the checker that both paths run; "ab" SEQV "ab", one literal evaluated twice and ("foo" || "bar") SEQV "foobar" true on both paths, a string built at run time not SEQV an equal literal; row 945 closes.
- **points to report:**
  - Walk's and the compiled code as changed, each with its line.
  - The fold as written, its phase, and the concatenations it folds and leaves.
  - Your tests' answers on both paths before and after; compiler_regressions/seqv.fss:22's verdict on the prelude.
  - Each library concatenation of literals that the fold now folds, by file and line.
  - The count and distance tables on your final tree, which read the folded library.
  - Each test whose verdict changes in ant testSystem or ant testQuick.
  - Every sentence made false: the fortress-repo skill's sentences that walk and the compiled path depart from P-171's answer at a string literal (row 945), F-326 if it names one.
  - A file edited beyond those named.
- **briefing** (11 keys, 8 checks):
  - P-171 (check): the decision you build, its walk way and its compiled way (i).
  - P-168 (check): strings are reference objects, their text equality their =.
  - ledger:945 (check): each evaluation makes a new string, which closes.
  - `doc:explorations/reviews/literals-2026-11-08.md#6.1 String literals` (check): ways S-b and S-d, the prototypes protoS and protoC, and their tests.
  - `doc:explorations/reviews/literals-2026-11-08.md#2.1 String literals`: today's answers on both paths.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java#public FValue forStringLiteralExpr` (check): walk's literal, made at each evaluation.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FString.java#public boolean seqv(FValue v)` (check): walk's string SEQV, identity.
  - `code:ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java#static boolean sEquiv(Object a, Object b)` (check): the compiled SEQV, a string a reference object.
  - `doc:Specification/basic/expressions/constant.tex#Types of Static Expressions` (check): the fold of a concatenation of literals.
  - `doc:Specification/appendices/changes.tex#Which objects are value objects`: strings as reference objects, whose effect your change narrows for literals.
  - REC `Forks the batch takes`: the defaults your rung builds, each with the ways not taken.

### T
- **slug:** `rung-literals-spec`
- **worktree:** `/home/user/fortress-literals-spec`
- **section:** `T. The specification: the numeral types, their conversions and default, the fold, and a string literal as one object, with their Appendix I entries (P-173, P-174, P-172, P-171, P-96)`
- **lands only with:** N, C, F and S.
- **blurb:** the specification in the revision form: the literals chapter's numeral types as NaturalNumeral and RadixPointNumeral below Numeral with the four numbers as fields, the default where nothing fixes a type, the conversion where a place fixes one, a program's type through its coercion and one object per site; the constant chapter's fold as a signed constant with its three defaults and the two concatenations kept; numbers.tex's coercions; conversions-coercions.tex's box on integer numerals; the inference chapter's numeral section widened; a string literal one object, with its folded concatenation; Appendix I: one entry for P-173 and P-174 naming what they contradict and what they change in form, one for P-171, and the existing entries that name IntLiteral revised; the trait-parameters and binary chapters' sentences that P-173 and P-174 contradict, with callouts; both PDF builds.
- **points to report:**
  - Each passage revised, with its callout and the Appendix I entry it names; each entry's Change, Rationale, Effect, Original text and Route C.
  - Each sentence of the Working Draft that the design contradicts, quoted, with its file and line.
  - The specification's build: both BUILD SUCCESSFUL lines and the warnings count.
  - Each existing entry or box revised, before and after.
  - A file edited beyond those named; any sentence you wrote that the rungs' sections do not support.
- **briefing** (19 keys, 10 checks):
  - P-173 (check): the default, the conversion, the tie, the fold, and the Draft's text it contradicts, for Appendix I.
  - P-174 (check): the numeral types and their four numbers, and the binary chapter's text it contradicts.
  - P-172 (check): the float numeral's conversions and the coercions of numbers.tex:43.
  - P-76: the integer numeral's conversions.
  - P-171 (check): a string literal one object, and the folded concatenation.
  - P-165: asFloat on each number type, and the sentence of numbers.tex it follows.
  - P-96 (check): the revision form.
  - P-40: a size used as a number converts to ZZ32, against trait-parameters.tex:84-86.
  - P-26: the bend P-173 takes, which its entry owns.
  - JUDGE `3. Against the Draft` (check): what the design keeps, changes in form and contradicts.
  - JUDGE `1. Coherence`: the six repairs, each a sentence of yours.
  - `doc:explorations/reviews/literal-fork-2026-11-08.md#5.3 The specification text` (check): reading B's text, chapter by chapter.
  - `doc:Specification-1.0-frozen/basic/expressions/literals.tex#Literals` (check): the Draft's numeral types and sentences, the original text you quote.
  - `doc:Specification/basic/expressions/literals.tex#Literals` (check): the revised chapter you revise again.
  - `doc:Specification/basic/expressions/constant.tex#Types of Static Expressions`: the constant traits and the two concatenations.
  - `doc:Specification/basic/inference.tex#A Numeral Whose Conversions Tie`: the section you widen.
  - `doc:Specification/appendices/changes.tex#The type of an integer numeral` (check): the entry you revise, whose Effect the design makes false.
  - `doc:Specification/appendices/changes.tex#Integers in floating-point expressions`: the entry whose box names IntLiteral.
  - REC `Forks the batch takes`: the defaults your rung builds, each with the ways not taken.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode with the **code generator**. Until the **switch-over**, the compiled path uses its own small library, the **prelude**; after it, the interpreter's library, the **one library**.
- A **numeral** is a number written in the program, `3` or `0.5`. A **numeral type** is the type the checker gives it while it types the program: today `IntLiteral` and `FloatLiteral`, after this batch, in the one library, the Working Draft's `NaturalNumeral` and `RadixPointNumeral` below `Numeral`. The **four numbers** are the Draft's `n`, `m`, `r` and `v`: the digit count, the digits after the radix point, the radix, and the digits read as one integer.
- A place **fixes a type** when its declared type has a coercion from the numeral type, or is a numeral type; elsewhere the numeral takes its **default**, `ZZ32`, or `ZZ64` or `ZZ` by its value, `RR64` with a radix point (P-173).
- The **fold** turns an expression of numerals alone, `3 + 4`, into one numeral before the checker. A **pair** is the `=` that goes with a coercion, as `opr =(self, b: NaturalNumeral)` in `NN32` (P-165).
- A **glue binding** names a Java class only walk can call; a **helper** binding names a static method both paths call (P-58).
- **The count** and **the distance** are the checker's errors on the one library: 0 and 0 at climb batch 28's gate, the distance with no crash (F-53).
- A **rung** is one change, built by one worker and checked by a second agent, the skeptic; the **gather** composes the rungs; a **guard** is a test that passes before the change and after it. **Appendix I** is the specification's appendix of changes.
- **microGPT** is the model program. No rung of this batch changes a line of it, and by reading no bit (the judgement's appendix).

### The scope: six rungs, the decided design whole

The record proposes six rungs:

- **N**, the numeral types in the one library and walk's numerals: P-174's names and fields, P-76's and P-172's conversions with their pairs, the 24 glue bindings gone (P-169), and P-173's walk half, place by place.
- **C**, the checker's half of P-173 and P-174: the default, the narrowest default for a type parameter, the numeral types unwritable but as a parameter type, the static range refusal, no chain, a size as a `ZZ32`. It lands only with N.
- **F**, the fold, on both paths, with one rounding and the once-per-class coercion on the compiled path.
- **G**, row 364's way A: walk's generics and messages at the trait.
- **S**, P-171: the strings.
- **T**, the specification. It lands only with N, C, F and S.

The reasons, one by one:

1. **The library and walk's numerals go in one rung, N, not two.** PLAN's line puts walk's numerals in a rung of their own that lands with the library's. But every rung branches from the base (PLAN, "The principle for the batches"), and on the base's library a float numeral is an `RR64` (`value object FloatLiteral extends RR64`), `QQ` takes no float numeral and `RR32` none at all, so a walk rung built there could test neither its tie, nor its `QQ` and `RR32` places, nor the numeral objects a program's coercion receives. And the library change alone fails 71 of walk's 791 tests (the prototype, section 4.5). So the two change together, and N holds them, with the two checker edits the library needs: the names switched by library, and the float tie rule, without which the library alone makes two ties (the prototype, step 1a).
2. **The checker's default and refusals go in C, against the prelude.** Its rules are the same on either library, so its compiled tests run on the base's prelude, and its count on the base's library. It lands only with N: the two change one behaviour, a numeral's type, in its two halves, which the batch rule lands together (`references/batch.md`, "The go"); without N, the checker would default and refuse the numeral types against a library that still declares `IntLiteral`'s arithmetic and `FloatLiteral` below `RR64`, a state the design never names.
3. **The pairs stay, C builds no chain, and the prototype's step 5 stays in its narrow form.** With the 15 pairs over the integer numeral and new pairs over the float numeral, the prototype's checker counts 0 and the distance 0, with and without its step 5 and its chained coercion, and every comparison of a number with a numeral reaches its pair but one: `r = 0` for an `RR32`, which declares no coercion from an integer numeral (probe 1). P-76 has `RR32` convert from it; N adds the coercion and its pair. Step 5, a numeral's conversion into its own default ranked as no coercion, stays (fork C4, the Fable review's change): P-173 reads `gg(5, w)` by P-49 as both declarations fitting the numeral as it is, and walk's dispatch keeps that rule (fork N6), so the checker's static choice and the compiled dispatch agree on `ee(5)`.
4. **The fold runs on both paths.** Its phase runs today on the compiled path only. Put in walk's phase order at the base, it passes 789 of walk's 791 tests; the two write `ZZ32` operations on numerals alone and mean `ZZ32` arithmetic (probe 2). On the way, probe 3 found two defects of today's fold, a compile that stops at `3 CHOOSE 5` and a wrapping `BOXPLUS` folded as exact addition, both F's.
5. **G, S and T.** G is one walk rung by the row 364 review, independent of the numerals but for one test key (section 4, "The rule the rungs keep"). S is one small rung with its fold. T describes the merged design, so it lands only with the four rungs whose code it describes.
6. **Six rungs keep the gather in bounds.** Section 4, "The rule the rungs keep", gives each rung's place in each shared file: N and C share `Functionals.scala` only at named functions, N and G share `EvaluatorBase.java` at two places 500 lines apart, N and S share `Evaluator.java` at two methods 600 lines apart, C and F share `CodeGen.java` at methods 2,100 lines and more apart.

### The three points with no default on record

Each is named as a fork with the record's default and its reason (section 3). None holds the launch: each can be undone, none reverses a decision of his.

**Point 1, review-queue item 443: may a value of a numeral type be bound by inference inside a coercion's body, `t = x` in `coerce(x: RadixPointNumeral)`?** Default: **yes; `t` takes the numeral type** (fork C2). The reason: P-174 says a numeral type is *written* only as a parameter type, and a check of written types does not see an inferred one; the binding adds no numeral value, since the parameter already holds it; refusing it would need a second check over inferred types that protects nothing, since `x` itself can still be passed on. The principles that speak agree: the team's later word, the prelude, binds `IntLiteral` anywhere, and the library writes it as a variable's and a return type. Not consequential. The Fable review recommends the default (`climb-batch-29-review.md`, section 1).

**Point 2, review-queue item 447: the constant chapter's concatenation of two natural numerals, `deadc_16 || 0de_16` giving `deadc0de_16` (`Specification-1.0-frozen/basic/expressions/constant.tex:80-82`).** Default: **folded, as the Draft says, in rung F** (fork F4): two natural numerals of one radix joined by `||` fold into one natural numeral, whose four numbers are the digits of both. The reason: the Draft's sentence is the one team word on it, beside the string concatenation that P-171 folds; neither implementation contradicts it, they never built it; and the four numbers P-174 keeps hold the digit count, leading zeros included, which the concatenation needs, so nothing of the binary chapter's static width is involved. Its cost is a case of the fold and one test. Not consequential: only the Draft speaks, and it is kept as written. The Fable review recommends the default: at the base `deadc_16 || 0de_16` finds no `||` under walk ("Failed to find any matching overload, args = (912092: ZZ32,222: ZZ32)"), so the fold adds what no path has and changes no program that runs today (`climb-batch-29-review.md`, section 1).

**Point 3: does `RadixPointNumeral` declare `asFloat`? P-165's list names `NaturalNumeral` and not it.** Default: **yes, with one rounding, as `NaturalNumeral` declares it** (fork N4). The reason: P-165's list came from `IntLiteral`'s own `asFloat` when `FloatLiteral` extended `RR64` and inherited `RR64`'s, so the list's silence is history, not a choice; today's `FloatLiteral` declares `asFloat` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:213-214`), so dropping it would change `asFloat(x)` at that type, against P-165's "unchanged at every concrete type"; and the library's pattern gives every number type and the other numeral type the method. **Consequential**, since it reads P-165's list anew; it bends nothing and lands with its default. The record writer would add `RadixPointNumeral` to P-165's list. The Fable review recommends the default (`climb-batch-29-review.md`, section 1).

### The forks he may want to see

Two forks besides point 3 are consequential by the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions"). Each lands with its default overnight, by the go rule, and goes on the review list:

- **Fork N1, the numeral types as plain value objects with Fortress fields.** `NaturalNumeral(digits, radix, digitValue)` and `RadixPointNumeral(digits, fractionDigits, radix, digitValue)`, in `FortressLibrary` beside `Ratio`, under `trait Numeral`, with no binding: walk builds one only where a numeral meets a parameter of a numeral type, and the compiled path after the switch-over constructs one as any object, "invocation of the numeric type constructor that gets the constants from the parser" in his words. The way not taken: traits, as the prelude declares its two, with walk's native objects and compiled run-time classes below them and the four getters on helpers by P-167's device, P-164's form for a value a Java class holds, the form both team libraries gave their numerals. Consequential because the principles split: the team's two libraries back Java-held numerals, the library's own `Ratio` and P-174's words back fields. The Fable review recommends the default (`climb-batch-29-review.md`, section 1).
- **The deferrals to the switch-over on the compiled path (forks F5, F6, F7).** The compiled path reads the prelude until the switch-over, which declares neither the four numbers nor the pairs nor `QQ`. So three pieces of the decided design reach the compiled path only then, each with a PLAN line: a program's coercion there receives today's compiled numeral value, without its four numbers; the pairs' conversion of a numeral is not folded at a call; and the compiled `SEQV` of two numeral values by their reduced value. Walk builds all three now. Not consequential by the rule, since nothing observable differs before the switch-over; listed because P-173 names the pairs' fold. The Fable review recommends the defaults, each with its PLAN line (`climb-batch-29-review.md`, section 1).

### What the batch leaves out

- The parallelism review's repairs N1 and N5 and every other item of that review (rows 947 to 953 and row 466's N7): out at his word for the budget (P-175).
- `Reflect`'s 28 glue bindings, at Q4 of the natives review.
- The prelude's own numerals and their defects, which retire with it (P-37, P-38).
- Row 774's walk half, which G's string mapping unblocks for lists of strings and integers, beside it: its own rung after.

### Before the batch runs

- **The Fable review of this record,** `coordinator/climb-batch-29-review.md`, with his go in advance (HELD, 23:3x): its changes are in place and its recommended defaults stand.
- **Rows 954 and 955, filed by the record writer** from probe 3 (`2f4b3d7d01`), which F closes (section 5, "Rows filed by plan").
- **The manifest's generator,** `compile-ladder/plan-29/manifest/`, made by the coordinator from `plan-28/manifest/` with this record's values (section 6).
- **The base build:** `/home/user/fortress-base29` at `8cde0b2c4f`, built, clean and kept. The batch's base will be `main`'s head at the launch; while `main` changes only under `explorations/`, its code is the base build's, and the trial seed proves it (the manual's "Before the launch", step 3). If code lands on `main` first, the base build is made again at the base.
- **The disk.** The script stops under 1.5 G a rung plus 4 G (`climb-batch-workflow.js`, `DISK_FLOOR_G`): 13 G for six rungs. Free at 00:48 UTC on 2026-11-09, the planner's worktree removed: 21,162,204 KB by `df -P`, about 20.2 G, above the floor by about 7 G; 21,425,372 KB at the Fable review, the old base build `/home/user/fortress-base28` gone. Climb batch 28 used about 1.1 G a rung and 15 G free at its lowest (`reviews/batch-28-review.md`, section 3), so about 8 G for six.
- The gather runs the 52 team demos on the merged tree (P-79; F-283): N changes every numeral walk evaluates, F every numeral expression, G every generic built from a number or string, S every string literal.

### Cost

- **About 6.8M tokens written, from 5.8M to 8.0M; about 6 hours 30 minutes at two agents at a time.**
- **Workers, about 3.0M:** N 0.75M, C 0.6M, F 0.5M, G 0.4M, T 0.4M, S 0.3M.
- **Skeptics, about 2.3M:** N 0.5M, C 0.45M (it runs the count stage itself, P-148), F 0.4M, G 0.35M, T 0.3M, S 0.28M.
- **The fixed roles, about 1.3M:** the disk check 0.06M; the gather 0.5M with six rungs, two `landsOnlyWith` orders, the demos, the natives effect and one specification build; the merged-diff review 0.4M; the gate 0.18M; the commit stage 0.16M.
- **A judge and a repair round, about 0.3M**, which climb batch 28's record held in no figure and its run spent (164K).
- **The evidence.** Climb batch 28's run wrote 6.65M over 20 transcripts for seven rungs (`reviews/batch-28-review.md`, section 3): its workers 307K to 550K, V the largest at 550K and 52.8 minutes, A 463K and 88.9 minutes; its skeptics 279K to 499K, mean 357K; the gather 444K, the review 401K, the gate 149K, the commit 158K; 0.95M a landed rung.
- **The figures.** N is the largest rung yet: the prototype's library step renamed and completed with fields and 11 coercions with their pairs, a helper pair, two checker edits, and walk's numerals, 40 to 60 lines by the fork review for floats alone, plus integers, dispatch and the own-type call; it carries the judgement's walk programs and some 20 test files' changes. C is the prototype's step 2, +219 −25 lines of Scala (the prototype, section 3.1), with three rules more, the nat value and some 20 test files' respellings, and P-148's two timed runs and a profile. F is the prototype's step 3, +206 −5, reworked for the forms of section 3, plus the phase on walk, two repairs and the once-per-class call. G is 40 to 50 lines in 3 files by the review, plus messages and six promotions. S is about 3 and 4 lines and a fold, with tests on both paths. T is six chapters and two new Appendix I entries with four revised, about climb batch 28's V in text.
- **Minutes, for the scatter:** N 110, C 90, F 75, G 60, T 60, S 40, against climb batch 28's workers' 38.5 to 88.9.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of his; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential forks

N1 (the numeral types as value objects with fields), N4 (point 3, `RadixPointNumeral`'s `asFloat`), and F5 to F7 taken together are in section 2. Each is below with its rung, at its default.

### Forks the batch takes

Each default can be undone and none reverses a decision of his; none touches a model line. Where the record leaves a choice open, the default follows the team's source or the library's way, which the fork names. Those marked **(consequential)** are the three of section 2.

**For the whole batch**

1. **Six rungs, N, C, F, G, S, T, in the manifest's order; C lands only with N; T lands only with N, C, F and S.** Default: so. The way not taken: PLAN's split by area, with walk's numerals in a rung of their own landing with the library's, which no worker could build on the base's library (section 2, reason 1).
2. **The suites each rung runs, once, after its last change of code** (`fortress-repo`, `tests-running.md`, "When to run a whole suite"). Default: N edits the library, walk and the checker, so it runs `ant testSystem` and `ant testQuick`; C edits the checker and the code generator, so it runs `ant testQuick` once after its pass (`compiler.md`, "The checker's time", step 4); F edits the code generator, the desugarer and walk's phase order, so it runs both; G edits walk only, so it runs `ant testSystem`; S edits walk, a helper and a desugaring phase, so it runs both; T runs the specification's build only.
3. **The stages.** Default: N, C, F and S each run the count stage and the distance stage once on their final tree, against climb batch 28's gate tables, 0 and 0 (F's and S's folds and N's and C's edits change what the stages read); C also times them by P-148, its `change` and `pass` runs against the base's 122 s measured by the prototype on this base build (the prototype, section 4.2), which it cites and does not take again; N times its own count run as its `change` against the same 122 s, since its float tie rule is checking code; G and T change nothing the stages read and list their files (`STAGE_BLIND`).
4. **Appendix I's natives effect** (`Specification/appendices/changes.tex:4673-4674`, "twenty-one of the interpreter's object IntLiteral, three of its object FloatLiteral") is made false by N. Default: no rung edits it; the gather writes the merged tree's count there, as climb batch 28's gather did (its fork 5).
5. **The team's tests that the design changes are respelled at the rung that changes each** (review-queue item 444's default): `tests/NumberPrintTest.fss:16` and `:31` and `tests/sequivTest.fss:58` and `:94` in N; the nine compiled tests that write `IntLiteral` and the three pinned messages in C; `tests/LongStringTests.fss:121` and `:141` in G. Each changed line is a point for his sight.
6. **No rung edits the prelude** (P-37). Its `IntLiteral` and `FloatLiteral` keep their names and their arithmetic until the switch-over deletes it; the compiled tests of this batch write those names only as a coercion's parameter type.
7. **The specification's build joins the gather, not the gate** (T), as climb batch 28's V. Default: so; `ant testSpecData` runs in the gate as landed.
8. **microGPT's quick check stays the commit stage's** (P-30; the manual's "Preparing a batch record"). Default: no rung runs it; N changes how walk evaluates every numeral the model writes, and the gather's 52 demos and the commit stage's check see it on the merged tree.

**Rung N**

9. **N1 (consequential). The numeral types as plain value objects with Fortress fields, in `Library/FortressLibrary.fsi` and `.fss` beside `Ratio`.** `trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }` declares the four getters abstract; `value object NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral`, whose `fractionDigits` is 0; `value object RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral`. No binding: walk builds one by its constructor, found as walk's loader finds the library's exceptions (`interpreter/glue/StaticNativeApp.java:281-286`, `getRootValue`). In `FortressBuiltin`, a native component, an object holds no field under walk (the mechanism of row 926, `BuildNativeEnvironment`; the row itself is closed, for `File`, which ceased to be native), so they leave it. The way not taken: section 2.
10. **N2. The checker's names switch by library**, as `CHARACTER` does (`compiler/Types.java:78-91`): `INT_LITERAL` and `FLOAT_LITERAL` name the prelude's `IntLiteral` and `FloatLiteral` under the compiler's libraries and `FortressLibrary`'s `NaturalNumeral` and `RadixPointNumeral` under the one library. Default: so. The way not taken: rename the prelude's two traits, an edit of the prelude (P-37).
11. **N3. The getters' names and types:** `digits`, `fractionDigits`, `radix`, `digitValue`, the names the prototype proposed (section 7.1), `ZZ32` for the first three and `ZZ` for the value, which a 20-digit numeral needs; `Numeral` extends `Number`, as `IntLiteral` does today, so the library's `excludes` clauses and P-160's Meet Rule readings stand with the names changed. Default: so. The ways not taken: the Draft's letters `n`, `m`, `r`, `v`, which the specification keeps beside each name; `Numeral` outside `Number`.
12. **N4 (consequential; point 3). `RadixPointNumeral` declares `asFloat`, by one rounding, as `NaturalNumeral` does.** Section 2.
13. **N5. One rounding by a new pair of helpers,** a rational `v / r^m` correctly rounded to a double and to a float, in an existing helper class of the float arithmetic or a new one, bound by P-58's form, called by `RR64`'s and `RR32`'s coercions and by both numeral types' `asFloat`; walk's Java conversions call the same Java methods, so the two paths round alike. The prototype's `roundToDouble` and `roundToFloat` in the code generator are the precedent (its section 1, step 3). Default: so. The way not taken: `QQ`'s `asFloat`, `asFloat(num) / asFloat(den)` (`Library/FortressLibrary.fss:656`), which rounds up to three times.
14. **N6. Walk's choice of a declaration reads a numeral argument as the checker does.** A declaration whose parameter at that position is the numeral's own type, or its default, fits the numeral as it is, and the default ranks as no coercion; the most specific of those that fit as they are wins (P-49); if none fits, the coercion attempt runs, and a tie that only numerals make reads each at its default (`Specification/basic/inference.tex`, "A Numeral Whose Conversions Tie", widened by P-173 to float numerals, which read `RR64`). So `x + 1` runs `ZZ32`'s `+` as today, `u = 0` for `u: NN32` runs `NN32`'s pair, `1.0 s` runs `RR64`'s juxtaposition, and `1/2 = 0.5` runs `QQ`'s pair. Default: so. The way not taken: walk's float numeral an `RR64` at evaluation, way F-c, which his default of item 446 declined.
15. **N7. Where walk converts, and how.** At a chosen declaration's parameter, a typed binding, a field and a declared return type, the checker's places, a numeral converts from its exact value: into the eight number types in walk's Java, by the same conversion as the library's coercion, a numeral out of the type's range refused at the place when it runs, as walk refuses one at a binding today (row 325's walk half); into a numeral type as the numeral object; into a program's type through its coercion from the numeral type, called with the numeral object, its result kept for the site so that a site gives one object (review-queue item 440's default); else refused. Elsewhere, an untyped binding, `Any`, `Object`, `Number` or an unbounded type parameter, it takes its default, as F-74 gives it for integers today. A type parameter that several numerals fix takes the narrowest default holding them all, by a hook at the head of `EvaluatorBase.inferAndInstantiateGenericFunction` (`EvaluatorBase.java:72-94`), not at its three reads of a value's type, which are G's. Default: so. The ways not taken: a numeral object at every evaluation, which every `i + 1` would pay; conversion at bindings and fields only, as P-172's text names, which would leave a return of `QQ`, `RR32`, `NN32` or `NN64` unconverted.
16. **N8. The pairs, kept and completed.** Every coercion from a numeral type has its pair both ways: the eight number types each with `NaturalNumeral`, `RR32` gaining its coercion from it (P-76; probe 1), and `QQ`, `RR64` and `RR32` each with `RadixPointNumeral`: 11 coercions, 11 pairs at the number types and 11 at the numeral types, each pair's body converting and comparing as the library's do today (`Library/FortressLibrary.fss:418`). Default: so. Under walk a pair's body runs with the numeral object; on the compiled path its fold waits for the switch-over (fork F6).
17. **N9. SEQV of two numeral objects inside a coercion's body compares their reduced values,** `digitValue / radix^fractionDigits`, so `2.5` and `2.50` are strictly equivalent there and `0.1_2` and `0.5` are too (P-168's one exception; review-queue item 445's default); walk's rule for value objects field by field takes the two types as its exception. Default: so.
18. **N10. A numeral object prints as the Draft writes a numeral,** its digits in its radix with the radix point after `digits - fractionDigits` of them and `_r` where the radix is not ten, so `C.8_16` in gives `C.8_16` out (the judgement's appendix); a numeral that took its default prints as its type does, `"" 2.50` giving `2.5`. Default: so.
19. **N11. Walk's glue classes of the two objects stay in the tree, unused,** `interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java`, as climb batch 28's rung R left its own (its fork R3); walk's value classes `FIntLiteral` and `FFloatLiteral` are N's to keep, rework or replace. Default: so; the removal is the names batch's clean-up.
20. **N12. The tests whose answer the design drops.** `tests/XXXRoundNearTieNumeral.fss` asserts 3 and 3 for `round(2.50000000000000001)` and `round(3.49999999999999999)`, where P-173's tie reading gives 2 and 4 on both paths (row 360, closed): it becomes a plain guard under a name of its topic that asserts 2 and 4, by `tests-writing.md`'s promotion steps. `tests/IntLiteralValue.fss` goes with row 578 and the object. `XXXNumeralFloatRungP` (row 443), `XXXNumeralWithNN32` (row 484) and `XXXRadixTenPointNumeral` (row 361) are promoted where your change makes them pass. `XXXextendIntLiteral` and `XXXextendFloatLiteral` name the new types, still refused. Default: so.

**Rung C**

21. **C1. Where the default applies:** exactly P-173's places that fix no type, an untyped binding, a parameter of `Any`, `Object`, `Number` or an unbounded type parameter, a static argument that numerals alone fix, a dotted receiver, and the branches of an `if` or `case` at an untyped binding, which the prototype did not build and the judgement's repair 4 names. Default: so; the prototype's receiver rule, the default only where it has the member, stays (its decision 2).
22. **C2 (point 1). The written-only rule:** a numeral type written as a variable's, field's or return type, or as a static argument, is refused in a program, "IntLiteral cannot be written in a program" in the prototype's words, renamed for both names; files under `Library/` and `ProjectFortress/LibraryBuiltin/` are exempt, since the prelude writes `IntLiteral` as return types and no rung edits it (P-37), and N's library writes the numeral types as parameter types only, which its skeptic checks by grep. The rule reads written types, so `t = x` inside a coercion's body binds `t` at the numeral type (review-queue item 443). Default: so. The way not taken: a check of inferred types too.
23. **C3. The static range refusal** (row 325; item 438): a numeral converted at an integer place outside the type's range is refused, and so is a numeral whose one rounding into `RR64` or `RR32` is an infinity. Default: so; P-173 says "a numeral outside the type's range", not only an integer's.
24. **C4. No chain; a numeral's conversion into its own default ranks as no coercion wherever it lands.** `CoercionOracle.buildCoercion` returns the coercion it checks, without the prototype's `viaDefault`: a program's type with no coercion from the numeral type refuses a numeral (item 439's default). A numeral fits as it is a parameter of its own default type, as it fits `Any`, `Object`, `Number` or an unbounded type parameter (fork C1), and its conversion into any other type ranks as a coercion: so `ee[\nat n\](x: ZZ32)` and `ee(x: Any)` both fit `ee(5)` as it is and the narrower runs (fork C8), P-173's reading of P-49, and the rule walk's dispatch keeps (fork N6). This is the prototype's step 5 in its narrow form, the mark in `buildCoercion` of a numeral's coercion into its default (its section 1, step 5); probe 1 measured the one library clean with it and the pairs (1a, count 0 and distance 0) and without it (1b), and the prototype measured that it changed no compiled test's verdict (its section 4.6). Default: so. The way not taken, the record's as drafted: the default ranked as a coercion at a parameter of exactly the default type, which leaves the checker's static choice at `ee(x: Any)` while the run answers 1 (the prototype, section 4.3), and splits the checker's rule from walk's.
25. **C5. A size read as a value is a `ZZ32`** (row 486; item 441; P-40): `KindEnv.getType` answers `ZZ32` for a `nat` or `int` parameter (`scala_src/typechecker/staticenv/KindEnv.scala:66-72`), and the code generator converts the class loader's constant, which it builds as an `IntLiteral` (`compiler/codegen/CodeGen.java:6336-6345`), to a `ZZ32` where the size is read. `tests/XXXNatValueNN32RungK.fss` asserts the `NN32` binding that P-173 drops: it becomes a test of P-173's answer, the `ZZ32` binding 3 and the `NN32` binding refused, with a substring of walk's message that names no class, since G changes walk's type text. Default: so.
26. **C6. A negative constant at a program's type** reaches it as prefix `-` on the program's coercion of the natural numeral, so the program's coercion sees the four numbers of a written numeral only (the judgement's repair 3, which he took); a program's type with no `-` refuses it. Default: so. Today's fold already makes a negative integer node (F-262), so C meets it on its own tree.
27. **C7. Rows 362 and 506.** Their `XXX` tests turn red under the default (the prototype, section 4.3): a bare float numeral at the prelude's `Object` is an `RR64`, and four numerals no longer reach the cap. Default: promote or rewrite each by what remains, closing the row or giving its whole new line in `record.md`.
28. **C8. `InferO2Pos.fss:18-19`:** `gg(5, w)` runs `gg[\T extends Number\](x: ZZ32, y: T)` and `ee(5)` gives 1, P-173's answer (P-49: both declarations fit the default as it is, and the narrower wins). Default: respell the two lines to it.

**Rung F**

29. **F1. The forms of a folded result,** each a numeral as written or an operation on such numerals, so that a program's coercion sees the four numbers of a written numeral only (repair 3): an integer as an integer numeral, negative as today's negative node (F-262); a result of operands among which one has a radix point, whose denominator divides a power of ten, as a decimal radix-point numeral (`0.1 + 0.2` is `0.3`), negative as prefix `-` on it; any other quotient as the reduced quotient of two numerals: `n / d` of two integer numerals for operands without a radix point (`7/2` is `7 / 2`), so that it is a `QQ` where nothing fixes a type, and `p.0 / d` where one has a radix point (`0.1/3` is `1.0 / 30`), so that the float tie reads it `RR64`; and at an `RR64` place the quotient's one rounding is IEEE division of two exact doubles, exact while both fit 53 bits. Default: so. The way not taken: the prototype's numeral in the denominator's radix, `1/3` a radix-3 numeral, which defaults to `RR64` against item 442's `QQ` and hands a program's coercion a numeral nobody wrote.
30. **F2. What the fold leaves alone, and the two repairs** (probe 3): the operators whose meaning needs a width, the wrapping and saturating `BOXPLUS`, `DOTPLUS`, `BOXMINUS`, `DOTMINUS`, `BOXDOT`, `BOXCROSS` and `DOTCROSS`, the bitwise operators and the shifts, are not folded, so their operands take their types and the operator its meaning; `CHOOSE` folds where 0 ≤ k ≤ n and gives 0 otherwise, as walk's `ZZ32` answers; a division by zero and a result that IEEE arithmetic could make `-0.0` stay as written, as the prototype kept them. Default: so.
31. **F3. The fold runs in walk's phase order too,** after `PRETYPECHECKDESUGAR`, as in the compiler's (`compiler/phases/PhaseOrder.java:125-147`), so `2147483647 + 1` is the `ZZ64` 2147483648 and `-2147483648` a `ZZ32` on both paths; `NativeHelperFamilyZZ32Walk.fss:31` and `ChooseZZ32Walk.fss` get typed operands where they mean `ZZ32` arithmetic (probe 2). Default: so.
32. **F4 (point 2). Two natural numerals of one radix joined by `||` fold into one natural numeral,** whose digits are both numerals' digits in order, leading zeros kept (`Specification-1.0-frozen/basic/expressions/constant.tex:80-82`). Default: so. The ways not taken: dropped, so that `deadc_16 || 0de_16` finds no `||`; given a written size, which no library declares.
33. **F5. A program's coercion from a numeral type, on the compiled path, is called once per class, when the class loads,** and each evaluation of the site reads the result, one object per site (item 440); a coercion that raises fails the class's load. Until the switch-over the coercion receives today's compiled numeral value, of the prelude's `IntLiteral` or `FloatLiteral`, and its four numbers wait for the one library's numeral objects, a line for the names batch. Default: so.
34. **F6. The pairs' fold on the compiled path waits for the switch-over.** P-173 folds "their conversion of a numeral"; the prelude declares no pair at a number type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:916` is `IntLiteral`'s own), so no compiled test can show it before then, and after it a pair's body converts the numeral object correctly unfolded. Default: so, with a PLAN line for the names batch.
35. **F7. A numeral at a `QQ` place is not folded on the compiled path,** since the prelude has no `QQ` to test against (the prototype, step 3); the compiled `SEQV` of two numeral values by their reduced value waits for the switch-over too. Default: so.
36. **F8. Typed-place constants as the prototype built them,** `CoercionDesugarer.foldsTo` and the code generator's one rounding (the prototype, step 3), with `XXXFloatNumeralOneRounding` promoted (row 862); a numeral out of range keeps its coercion call, which C refuses statically on the merged tree. Default: so.

**Rung G**

37. **G1. Way A, the trait read at inference,** not way B at the instance factories, which would identify two types a program can name (`types-vals-vars.tex:51-52`; the review, section 2). Default: so.
38. **G2. The four string objects too,** `FlatString`, `CatString`, `EmptyString` and `SubString`, read at `String` (the review's sub-choice S, his line in PLAN: "`Cell("s")` a `Cell[\String\]`"). Default: so. `FloatLiteral` is not mapped: N makes a float numeral take its default before inference.
39. **G3. Messages and `Reflect`'s text print the nine by their trait where a type's text is made,** in `interpreter/evaluator/types/`, not at each message's site; `LHSEvaluator.java` and `OverloadedFunction.java`'s dispatch and binding code are N's. A type a program names, as a `typecase` arm `Int` or `BigNum`, keeps its name. Default: so.
40. **G4. G owns the three `TupleOrder*Refused.test` keys.** `TupleOrderMixedRefused.test`'s key becomes the substring that holds on G's tree and on the merged tree, `args = ((1,2): (ZZ32,ZZ32),(1,2.5): (ZZ32,`: `2.5` is a `FloatLiteral` on G's tree and an `RR64` on the merged one. On N's own tree that test fails on its pinned `(Int,FloatLiteral)`; N does not edit it and reports it as G's. Default: so.
41. **G5. `LongStringTests.fss:121` and `:141`,** a team test, respelled `Generator⟦ZZ32⟧` (the review, way A). Default: so.

**Rung S**

42. **S1. The string fold runs in the desugaring phase before the checker that both paths run,** `PRETYPECHECKDESUGAR` (`compiler/phases/PhaseOrder.java:125-147`), not in F's fold, so that S's tests pass on its own tree; it folds `||` of two string literals and of a string and a character literal (`Specification/basic/expressions/constant.tex`, "Types of Static Expressions"). Default: so.
43. **S2. The library's own literals are interned too,** so an empty slice of a flat string can be `SEQV ""` (the review's S5). Default: so; P-171 states it for every literal.

**Rung T**

44. **T1. Two new Appendix I entries,** one for P-173 and P-174 together (the numeral types, their fields, the default, the conversion, the fold), naming what they contradict in the Working Draft and what they change in form, and one for P-171; the entries "The type of an integer numeral", "Integers in floating-point expressions", "The conversion into a float, declared by each number type" and "The inference of a call's static arguments" revised where their Effects become false; "Which objects are value objects" gains P-171's sentence. Default: so.
45. **T2. The binary chapter and the trait-parameters chapter keep their text,** each with a callout naming the new entry, which quotes what the design contradicts: the binary chapter's declarations over `NaturalNumeral[\m,radix,v\]`, the static width from a numeral's digit count and the `opr ||` with a numeral (P-174; the Working Draft's `advanced-lib/binary.tex:1620-1621`, `:1659-1662`; in `Specification/advanced-lib/binary.tex` their typeset forms at `:906-911` and `:1118-1132`, `grep -n NaturalNumeral`); `Specification/basic/trait-parameters.tex:97-99` (the Working Draft's `:84-86`), a `nat` parameter usable as an `NN32` (P-173). Default: so.
46. **T3. T writes the decided design, not the rungs' code,** and names each sentence that a rung's section, as it stands here, does not support; the gather reads T's text against the merged tree. Default: so.

### Points the batch lists for him, not questions

- **The team's lines changed:** `NumberPrintTest.fss:16`, `:31` and `sequivTest.fss:58`, `:94` (N); `Compiled5.ah`, `5.aj`, `5.ak`, `6.az`, `9.g`, `9.j`, `9.p`, `9.t`, `9.u` and the pinned texts of `XXX6at`, `XXX6bw` and `XXXApplicationErrors` (C); `LongStringTests.fss:121`, `:141` (G); the library's `Constants.fsi` and `ReflectiveQuickCheck.fss` lines (N).
- **The rung split against PLAN's areas** (fork 1) and the three deferrals to the switch-over (forks F5 to F7).
- **What walk does differently:** a numeral converts where it stands, `y: RR64 = 0.5` is `SEQV` a computed `0.5`, `q: QQ = 0.1` is `1/10`, `n: NN32 = 5` binds; a bare float numeral prints as its double; the fold runs; `Cell(3)` is a `Cell[\ZZ32\]`; messages print `ZZ32` and `String`; `"ab" SEQV "ab"`.
- **What the compiled path does differently:** a numeral where nothing fixes a type is a `ZZ32` or an `RR64`; `IntLiteral` is refused but as a parameter type; a numeral out of range is a static error; a float constant is rounded once; a program's coercion runs once per class.
- **The specification:** two new Appendix I entries and four revised.

## 4. The rungs

Each rung's section is its worker's brief. The `fortress-repo` skill's part on how revived Fortress differs gives the rules of revived Fortress; the briefing keys of section 1 give the decisions, rows and code the rung rests on. A line citation is the base's, `8cde0b2c4f`; the record's own forks are section 3's, by number.

### N. The numeral types: `NaturalNumeral` and `RadixPointNumeral` below `Numeral`, their four numbers as fields, each number type's coercions and `=` pairs, the 24 glue bindings gone, and walk's numerals converted where they stand (P-174, P-76, P-172, P-173)

**The mission.** The one library gives a numeral the interpreter library's own types: `value object IntLiteral extends Number`, with 21 glue bindings and an arithmetic that answers a `ZZ32` under walk (row 578), and `value object FloatLiteral extends RR64`, with 3 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:208-215`, `:549-629`). Walk evaluates an integer numeral to a `ZZ32`, `ZZ64` or `ZZ` by its value (F-74) and a float numeral to a `FloatLiteral`, which is an `RR64`. So under walk a float numeral bound at `RR64` stays a `FloatLiteral`, not `SEQV` a computed `RR64` (row 943); `QQ` takes no float numeral and `1/2 = 0.5` is `false` (row 944); `NN32` and `NN64` refuse a numeral at a binding and `RR32` a float numeral (row 454); `RR64` refuses `3000000000` (row 443); `u + 1` for an `NN32` answers a `ZZ64` (row 484); `round(2.5_10)` throws (row 361). The decided design gives the numeral the Working Draft's types, holding its four numbers, which each number type receives through its coercion, and has walk convert it where it stands.

**The decisions this rung builds.** P-174: `NaturalNumeral` and `RadixPointNumeral` below `Numeral`, the four numbers as fields, a program's type receiving a numeral through its coercion from the numeral type. P-76 and P-172: each of the eight number types converts from them, exactly into the five integer types and `QQ`, by one rounding into `RR64` and `RR32`, each coercion with its pair (P-165). P-173's walk half: walk converts a numeral from its exact value where its place fixes a type, place by place, before it runs the checker (P-12), and elsewhere gives it its default. P-168's one exception: two numeral values inside a coercion's body are strictly equivalent by their reduced values. P-169: the 24 numeral glue bindings leave. P-37: no edit of the prelude. This record's section 3, forks 1 to 8 and N1 to N12 (9 to 20), give the defaults you build; review-queue items 440, 444, 445 and 446 hold his defaults.

**What you build.**
- The tests first (below).
- `Library/FortressLibrary.fsi` and `.fss`, beside `value object Ratio` (`.fss:648`): `trait Numeral` and the two value objects, their getters, `asFloat` on both (fork N4), `asString` (fork N10), and the conversions in Fortress over the fields: `digitValue` into the integer types by their checked getters, `Ratio(digitValue, radix^fractionDigits)` reduced into `QQ`, the helper pair into `RR64` and `RR32` (fork N5).
- In each number type, the coercion from each numeral type it converts from, renamed or new, and its pair, both ways (fork N8): `RR64` (`FortressLibrary.fsi:295-297`, `.fss:387-389`, the pair at `.fss:418`), `QQ` (`.fsi:399-404`, `.fss:563`, `:582`), `AnyIntegral` (`.fsi:451`, `.fss:661`), `NN64`, `ZZ32`, `ZZ64` and `ZZ` (`.fsi:498-499`, `:563`, `:637-639`, `:712-716` and their bodies), `NN32` (`FortressBuiltin.fsi:134`, `:144`, `.fss:431`, `:454`) and `RR32` (`FortressBuiltin.fsi:47`, `.fss:217`), which gains both. `RR64 comprises { Float }`; `Float`'s `asFloat(self): RR64` (`FortressBuiltin.fss:82`; the prototype, step 1c); `NN32`'s `^` over the numeral (`FortressBuiltin.fsi:185`).
- `value object IntLiteral` and `value object FloatLiteral` removed from `FortressBuiltin.fsi` and `.fss`, with their 24 glue bindings; every other line that names either type renamed or dropped (probe 4: 18, 18, 38 and 63 lines in the four prelude files of the one library), the `excludes` clauses among them; `Library/Constants.fsi:16-17` and `.fss` at `RR64`; `Library/ReflectiveQuickCheck.fss:40` and `:157`, whose `theType[\IntLiteral\]` C's rule refuses, at the numeral's default.
- The helper pair (fork N5), in `ProjectFortress/src/com/sun/fortress/nativeHelpers/`, with the library's bindings and walk's carriers (F-299).
- `ProjectFortress/src/com/sun/fortress/compiler/Types.java`: `INT_LITERAL` and `FLOAT_LITERAL` switched by library (fork N2). `scala_src/typechecker/impls/Functionals.scala`, `isNumeral` and `numeralReading` (`:419-436`) only: a numeral with a radix point counts as a numeral at a tie and reads as `RR64` (the prototype, step 1). Nothing else of the checker: rung C builds the default.
- Walk, under `ProjectFortress/src/com/sun/fortress/interpreter/`: `Evaluator.forIntLiteralExpr` and `forFloatLiteralExpr` (`evaluator/Evaluator.java:1631-1637`), walk's numeral values, its choice of a declaration for a numeral argument (fork N6), its conversions at a parameter, a binding, a field and a return (fork N7; `LHSEvaluator.java:218-226` is the binding's), the hook at the head of `EvaluatorBase.inferAndInstantiateGenericFunction` (`:72-94`), the numeral object built where a parameter of a numeral type or a program's coercion receives it, and `SEQV` of two numeral objects (fork N9). A numeral out of range at a typed place raises there when it runs.
- Not yours: the checker's default and refusals (C); the fold and the code generator (F); walk's reads of a value's type at inference and walk's type text in messages (G); strings (S); the specification and Appendix I's natives effect (T, the gather).

**Tests, first.**
- `ProjectFortress/tests/NumeralTypesWalk.fss`: the judgement's appendix programs whose walk answer this rung gives (JUDGE `Appendix: the test list and citations`): the defaults (`x = 3`, `y = 0.5`, `bigN = 3000000000`, `f(3)` and `f(0.5)` at `Any`, `y SEQV w` for `w: RR64 = 0.5`, `1/2 = 0.5`, `1 - b`, `b^2`, `1.0 s`); the typed places (`q: QQ = 0.1` is `1/10`, `r: RR64 = 0.1` `SEQV` a computed `0.1`, `0.77425264282026984` at `RR64` is `0.7742526428202698`, `n: NN32 = 5`, `r32: RR32 = 0.1` by one rounding, `s: RR64 = 3000000000`, `u + 1` at `NN32`, `round(2.5_10)`); each number type's pair with a numeral (`u = 0` at `NN32`, `NN64` and `RR32` true for `u` zero); Seen failing on the base through the harness. Beside it, a guard in a file of its own with a `.test` key `load_exception_contains`: a top-level `z: ZZ32 = 3000000000` refused, as walk refuses it today.
- `ProjectFortress/tests/NumeralOwnTypeWalk.fss`: a program's `value object CC64` with `coerce(x: NaturalNumeral)` and `coerce(x: RadixPointNumeral)` reading the four numbers (`3 + 4 i`, `3.78 + 3.243 i`), an interval `Iv(0.1)` enclosing `1/10`, `BF16(1.00390625000000000001)` giving `0x3F81`, `Dec(3.14159)` as `Dec(314159, 5)` and `3.14150` keeping scale 5, `C.8_16` round-tripped, one object per site for a reference object's coercion, a type with only `coerce(x: ZZ32)` refusing `3`; and inside a body `2.5 SEQV 2.50` and `0.1_2 SEQV 0.5` true, `0.1 = 0.1_16` false. Seen failing on the base: the types do not exist.
- The guards: `XXXRoundNearTieNumeral` made a plain guard of 2 and 4 (fork N12); walk's number tests and the families' tests as they stand.
- Team and revival tests that your change flips, each line respelled with its before and after (fork 5): `tests/NumberPrintTest.fss:16` to the double's text, `:31`'s arm to the numeral type or dropped; `tests/sequivTest.fss:58` and `:94` back to the team's `equiv`; `tests/StrictEquivalenceRuleWalk.fss:32` to `true`; `tests/FlatTowerRungF.fss:100-113`'s five `0.0 : FloatLiteral` to `RR64`; `tests/NumberMixedEqualityWalk.fss:7` and `:39-108`, `tests/IntLiteralTextWalk.fss`, `IntegerPowerContractWalk.fss:94`, `IntegerConversionsWalk.fss`, `ReflectiveNumberTypes.fss` and `setMakerTest0.fss` where they name the old types; `IntLiteralValue.fss` removed with row 578 (fork N12).
- After the change: `ant testSystem` and `ant testQuick` once each (fork 2). Expect `TupleOrderMixedRefused` red on your tree only (fork G4).

**The stages.** Both, once each on your final tree (fork 3), from the tree's root after `ant compileAll`, the count timed as P-148's `change` against the prototype's base of 122 s:

    time explorations/coordinator/tools/checker-count/run.sh tmp/rung-numeral-types/checker-count-postedit.txt tmp/rung-numeral-types/cc-post
    explorations/coordinator/tools/distance/run.sh tmp/rung-numeral-types/distance-postedit.txt tmp/rung-numeral-types/dist-post

Compare each with climb batch 28's gate table by `diff`, and the distance with `explorations/coordinator/tools/distance/compare.sh`; tie every new row to an edit. Probe 1 measured 0 and 0 for the library half with the pairs kept.

**Rows.** 943, 944, 454, 443, 484, 361 and 578 close with your commits, each with its test; row 360 is closed already and its test is fork N12's. Read each with `ledger.py show N` first.

**Specification.** Not yours: T's. List every sentence made false: the Appendix I entries and boxes that name `IntLiteral` or `FloatLiteral` (`Specification/basic/expressions/literals.tex:149-165`, `basic/conversions-coercions.tex:74-90`, `appendices/changes.tex:2764`, `:3729-3821`, `:4416`, `:4673-4674`), F-57, F-74, F-79, F-118, F-328, and the `fortress-repo` skill's parts on numbers and on walk.

**Files.**
- `Library/FortressLibrary.fss` and `.fsi`: the numeral types, the number types' coercions and pairs, `RR64`'s `comprises`, only.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi`: the two objects removed, `NN32`'s, `RR32`'s and `Float`'s lines, the other lines that name the old types, only.
- `Library/Constants.fsi` and `.fss`, `Library/ReflectiveQuickCheck.fss`: the lines named.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/`: the helper pair.
- `ProjectFortress/src/com/sun/fortress/compiler/Types.java`; `scala_src/typechecker/impls/Functionals.scala`, `isNumeral` and `numeralReading` only.
- `ProjectFortress/src/com/sun/fortress/interpreter/`: walk's numerals, as above; in `EvaluatorBase.java` the head of `inferAndInstantiateGenericFunction` only.
- `ProjectFortress/tests/`: your tests and the lines above.
- Not: the prelude, the code generator, the rest of the checker, `PhaseOrder.java`, `interpreter/evaluator/types/`, Appendix I.

**Reserved points.** A step that would edit the prelude. A model line: none (the judgement's appendix).

**Overlaps by file.** `Functionals.scala` with C, which calls `numeralReading` and edits other functions. `EvaluatorBase.java` with G, at `:602`, `:782-785` and `:936`, 500 lines from your hook. `Evaluator.java` with S, at `forStringLiteralExpr` (`:1018`). `tests/TupleOrderMixedRefused.test` is G's (fork G4).

### C. The checker's numerals: the default where nothing fixes a type, a numeral type written only as a parameter type, a numeral out of range or at a type with no coercion from it refused, and a size read as a value a `ZZ32` (P-173, P-174, P-40)

**The mission.** The checker types a numeral `IntLiteral` or `FloatLiteral` by its form and keeps that type wherever nothing converts it (F-57): `x = 3` is an `IntLiteral`, `Cell(3)` a `Cell[\IntLiteral\]`, `7` at `x: Object` takes no `ZZ32` clause and `ee(5)` runs `ee(x: Any)` (row 79), a variable bound from `3000000000` reads `ZZ32` at a tie and dies at run time (row 946), a `nat` parameter read as a value is an `IntLiteral` that `NN32` takes (row 486), a numeral outside its type's range compiles and raises at run time (row 325), and a program may write either type anywhere. The decided design converts a numeral where it stands, else into its default, and keeps the numeral types to the coercions.

**The decisions this rung builds.** P-173: where a place fixes a type, the conversion there, exact or by one rounding, a numeral out of range refused statically; where nothing fixes one, the default, which applies to a numeral, never to an expression of a numeral type; a type parameter that several numerals fix at the narrowest default holding every value, `RR64` where any has a radix point; a float numeral whose conversions tie read `RR64` (N's tie rule). P-174: a numeral type written only as a parameter type, of a coercion or an operator; a program's type with no coercion from the numeral type refuses a numeral. P-40: a size used as a number is a `ZZ32`. P-49: the two attempts. P-148: the timing. Review-queue items 438, 439, 441 and 443 hold his defaults; this record's section 3, forks 1 to 8 and C1 to C8 (21 to 28), the defaults you build.

**What you build.**
- The tests first (below).
- From the prototype's step 2 (PROTO `Step 2, the checker`; the patch's `scala_src/` files, which you apply by hand where they fit): `defaultNumeral` and its sites, `Decls.scala`'s four untyped bindings, `Functionals.scala`'s `Any`, static-argument, receiver and tie sites, the joins (fork C1), the narrowest default for a type parameter that several numerals fix: `pick(3, 3000000000)` a `ZZ64` on the prelude, which declares no coercion into `RR64` from an integer numeral, and `<|3000000000, 0.5|>` a `List[\RR64\]` against the one library, read by the count stage's driver as the prototype read its answers (its section 4.4), not a gated test.
- `TypeWellFormedChecker.scala`: the written-only rule (fork C2).
- The range refusal (fork C3) where the checker converts a numeral at a typed place.
- `CoercionOracle.buildCoercion` without the prototype's chain, `viaDefault`; its mark of a numeral's coercion into its default as no coercion kept, the prototype's step 5 (fork C4).
- `scala_src/typechecker/staticenv/KindEnv.scala:66-72` and `compiler/codegen/CodeGen.java:6336-6345`, the size read as a value (fork C5).
- A negative numeral constant at a program's type (fork C6).
- The compiled tests that the default flips or breaks, by the prototype's section 4.3, each respelled to keep what it checks and named in your report: the nine team tests that write `IntLiteral` (`Compiled5.ah:17`, `5.aj:18-19`, `5.ak:21`, `6.az:15`, `9.g:18-19`, `9.j:17`, `9.p:18-19` and `:26`, `9.t:24` and `:37`, `9.u:27`), at the types they mean; the pinned texts of `XXX6at.test`, `XXX6bw.test` and `XXXApplicationErrors.test`; the eight revival tests' `IntLiteral` arms (`InferCoercionShapes:44`, `InferO2Meet:11`, `InferO2Num:10`, `InferO2Pos:12`, `InferO2Z64:10`, `InferOpAnyZW:10`, `InferResultOnlyLabelBody:9`, `XXXNumeralBeyondWidthMax:9`); `library_tests/IntLiteralArithRung7:35` and `IntLiteralRung6:41`; `InferCoercionShapes:72` and `InferO2Num:20` to `ZZ32`; `InferO2Pos:18-19` (fork C8); `XXXInferComboCap` and `XXXNumeralPrintRungR` (fork C7). Find any other by `git grep -w IntLiteral` and the suite.
- Not yours: the library, walk and the checker's names and tie (N); the fold and the constants (F); the prelude.

**Tests, first.**
- `ProjectFortress/compiler_tests/LiteralDefaultCompiled.fss` with its `.test`, from the prototype: `x = 3` a `ZZ32`, `y = 0.5` an `RR64`, `bigN` a `ZZ64`, `Cell(3)`, `Cell(x)` and `Cell(0.5)`, `f(3)` and `f(0.5)` at `Any`, `pick(3, 4)`, `3 SEQV z`, `x SEQV z`, `y SEQV w`, `g(bigN)` and `g(3000000000)` both `g ZZ64` (row 946), `7` at `x: Object` taking the `ZZ32` clause and `ee(5)` giving 1 (row 79), and the join and several-numeral cases; types read with `stringOps.typeName` bound at `Any`, as the prototype did.
- `XXXLiteralTypeUnwritable` from the prototype, made a plain refusal test of the rule's message for both names; a program's `CC64` with only `coerce(x: ZZ32)` refused at `c: CC64 = 3`; `XXXNumeralBeyondZZ32Range` promoted (row 325) with a float numeral beyond `RR64`; row 486's program, `u: ZZ32 = n` answering 3 and `u: NN32 = n` refused; `XXXNatValueNN32RungK` rewritten (fork C5).
- Each seen failing on the base through `junit.sh`; then `ant testQuick` once after your pass (fork 2).

**The stages and the timing.** By P-148 and `compiler.md`, "The checker's time": commit the correct change, then run the count stage timed as `change`, then a second pass for speed from a profile, then `pass` if the pass changed code, each in the background; the distance once on your final tree; the base is the prototype's 122 s on this base build (fork 3), which you cite:

    export W=$PWD N=change ; mkdir -p $W/tmp/count
    time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N
    explorations/coordinator/tools/distance/run.sh tmp/rung-numeral-checker/distance-postedit.txt tmp/rung-numeral-checker/dist-post

On your tree the library is the base's, so a float numeral is still an `RR64` there and N's names are not yet in place; your default must work on both libraries.

**Rows.** 79, 946, 486 and 325 close with your commits, each with its test; 362 and 506 by fork C7. Read each with `ledger.py show N` first.

**Specification.** Not yours. List every sentence made false: F-57, F-73, F-79, `Specification/basic/inference.tex:183-187` and `:299-317`, the `fortress-repo` skill's numbers.

**Files.**
- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/`: `impls/Functionals.scala` but `isNumeral` and `numeralReading`, `impls/Decls.scala`, `impls/Misc.scala`, `CoercionOracle.scala`, `TypeWellFormedChecker.scala`, `STypeChecker.scala`, `staticenv/KindEnv.scala`; `scala_src/useful/STypesUtil.scala` if the ranking needs it.
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: the size read as a value, only.
- `ProjectFortress/compiler_tests/`, `ProjectFortress/library_tests/`, `ProjectFortress/tests/XXXNatValueNN32RungK.fss`: your tests and the respellings.
- Not: `compiler/Types.java`, the library, walk, the prelude, the fold.

**Reserved points.** A step that would edit the prelude, or a library file. A model line: none.

**Overlaps by file.** `Functionals.scala` with N (`isNumeral`, `numeralReading`, `:419-437`): put no new function within five lines of them, since the prototype's `isLiteralType` went right before `isNumeral` (its patch, the hunk at `:415`), an insertion the gather's `--3way` cannot merge with N's edit of the lines after it; put yours after `numeralReading`'s end, past `:440`, or elsewhere in the file. `CodeGen.java` with F, at `forFloatLiteralExpr` (`:2035-2045`), `forIntLiteralExpr` (`:4207`) and the once-per-class call, 2,100 lines and more from yours.

### F. The fold: numerals alone folded exactly on both paths, a numeral at a typed place a constant rounded once, a program's coercion from a numeral called once per class, and two natural numerals concatenated (P-173, P-174, P-172)

**The mission.** The compiled path folds integer numerals before the checker (`compiler/desugarer/IntegerLiteralFoldingVisitor.java`), walk folds nothing, so `2147483647 + 1` is 2147483648 compiled and `IntegerOverflow` under walk (F-118); the fold treats `BOXPLUS` and `DOTPLUS` as `+`, so `a: ZZ32 = 2147483647 BOXPLUS 1` dies at run time, and stops the compile at `3 CHOOSE 5` (probe 3); a float numeral is folded nowhere, so `0.1 + 0.2` is two roundings and a sum; its compiled constant is two or three roundings (row 862); a program's coercion from a numeral runs at each evaluation. The decided design folds an expression of numerals alone exactly, on both paths, makes a typed place's numeral a constant rounded once, and calls a program's coercion once per class.

**The decisions this rung builds.** P-173: an expression of numerals alone folds exactly before the checker into a signed constant, which defaults as an integer numeral, as a `QQ` for a quotient, or as an `RR64` with a radix point; at a typed place the conversion rounds once. P-174: a program's coercion called once per class, when the class loads, one object per site (item 440). P-172: one rounding into `RR64` and `RR32`. The judgement's repair 3, which he took: a program's coercion sees the four numbers of a written numeral only. This record's section 3, forks 1 to 8 and F1 to F8 (29 to 36), the defaults you build, point 2's among them.

**What you build.**
- The tests first (below).
- `compiler/phases/PhaseOrder.java`: the fold in `interpreterPhaseOrder` after `PRETYPECHECKDESUGAR` (fork F3).
- `compiler/desugarer/IntegerLiteralFoldingVisitor.java`: the fold of numerals alone, integer and radix-point operands, `+`, `-`, multiplication, `/` by a nonzero numeral, `^` by an integer numeral (exponents beyond 4096 left), prefix `-`, `|_|`, `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `MIN`, `MAX` and the comparisons, into the forms of fork F1; what it leaves and the two repairs (fork F2); the concatenation of two natural numerals (fork F4).
- `compiler/desugarer/CoercionDesugarer.scala` and `compiler/codegen/CodeGen.java`, `forFloatLiteralExpr` (`:2035-2045`) and `forIntLiteralExpr` (`:4207`): typed-place constants rounded once (fork F8; the prototype, step 3).
- `CodeGen.java`: a program's coercion from a numeral type called once per class, when the class loads (fork F5).
- `NativeHelperFamilyZZ32Walk.fss:31` and `ChooseZZ32Walk.fss`: typed operands where they mean `ZZ32` arithmetic (probe 2).
- Not yours: the checker under `scala_src/typechecker/` (C, N); the library and walk's evaluator (N); the string fold (S); the pairs' fold and the compiled numeral `SEQV` (forks F6, F7).

**Tests, first.**
- `ProjectFortress/tests/NumeralFoldWalk.fss`: under walk, `2147483647 + 1` a `ZZ64` equal to 2147483648, `-2147483648` a `ZZ32`, `2^40` equal to 1099511627776, `0.1 + 0.2 = 0.3`, `x = 7/2` a `QQ`, `3 CHOOSE 5` 0, `deadc_16 || 0de_16 = deadc0de_16`, `(1/3) + (1/6) = 1/2`; values asserted, not types that N or G changes. Seen failing on the base: the fold does not run under walk.
- `ProjectFortress/compiler_tests/LiteralFoldCompiled.fss` with its `.test`: the same where the prelude can say them (`3 + 4`, `2^40`, `0.77425264282026984` at `RR64` equal to `0.7742526428202698`, `3 CHOOSE 5` compiling and giving 0); the operators left alone by a Java unit test of the visitor (a `*JUTest` under `ProjectFortress/src/`), since no program can run a wrapping operator on numerals on either library: the prelude's `IntLiteral` declares `BOXPLUS` to throw (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:901`) and the one library declares none at `ZZ32` (probe 3); `XXXFloatNumeralOneRounding` promoted (row 862); a program's reference type with `coerce(x: IntLiteral)` that prints when it runs: two evaluations of one site `SEQV`, two sites not, and its print once, at load; a coercion that raises failing the load.
- After the change: `ant testSystem` and `ant testQuick` once each (fork 2).

**The stages.** Both, once each on your final tree (fork 3): the fold runs before the checker in both stages, so they read the folded library. The commands as N's, with `tmp/rung-literal-fold/`.

**Rows.** 862, 954 and 955 close with your commits, each with its test (section 5, "Rows filed by plan"). Read each with `ledger.py show N` first. F-118's and F-262's sentences change.

**Specification.** Not yours. List every sentence made false: `Specification/basic/expressions/constant.tex:44-85` and `literals.tex:163-176` where they speak of static expressions and the compiler, F-118, F-262.

**Files.**
- `ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java`: walk's order, only.
- `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java`, `CoercionDesugarer.scala`.
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: the literal methods and the once-per-class call, only; `compiler/runtimeValues/FIntLiteral.java` and `FFloatLiteral.java` if the call needs it.
- `ProjectFortress/tests/`, `ProjectFortress/compiler_tests/`: your tests and the two respelled.
- Not: the checker's Scala under `typechecker/`, the library, walk's evaluator, `nativeHelpers/equalityRule.java`, the prelude.

**Reserved points.** A step that would edit the prelude. A model line: none; the fold makes `10.0^(-5)` the numeral `0.00001`, the double `Math.pow(10.0, -5.0)` gives (the judgement's appendix).

**Overlaps by file.** `CodeGen.java` with C (`:6336-6345`). None else.

### G. Walk's generics and messages at language types: a number or string value read at its trait where walk infers a static argument and where it prints a type (row 364's way A)

**The mission.** Walk infers a static argument from a value's run-time class: `Int`, `Long`, `BigNum`, `Float` or `UnsignedLong` for a number, `FlatString` and its siblings for a string (row 364). So `Cell(3)` prints `Cell[\ZZ32\]` but is a `Cell[\Int\]` and dispatches past `kind(c: Cell[\ZZ32\])`; `SUM <|1, 2, 3|>` finds no overload (row 432); `array1` gives a plain array (row 721); `openRange` throws `CastError` (row 722); messages print `Int`. His word on the page thread (HELD, 07:51): a walk defect, to be fixed so that walk's internals do not leak to those who write Fortress.

**The decisions this rung builds.** Row 364's way A, which his go of 23:3x names (HELD); the review's strings sub-choice S, which PLAN's line states ("`Cell("s")` a `Cell[\String\]`"); its messages half. P-48: a call's unfixed parameter takes its bound; walk's dispatch on the value's type, read as the trait. P-167. This record's section 3, forks 1 to 8 and G1 to G5 (37 to 41), the defaults you build.

**What you build.**
- The tests first (below).
- A helper in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/` that returns the trait of each of the nine objects, also inside tuples, moved from `ObjectPrims.traitOf` (`interpreter/glue/prim/ObjectPrims.java:61-77`), with the string objects added (fork G2); called at `EvaluatorBase.java:602`, `:782-785` and `:936`.
- Walk's type text for messages and `Reflect` (fork G3), and the three `TupleOrder*Refused.test` keys (fork G4).
- `tests/LongStringTests.fss:121`, `:141` (fork G5).
- The `XXX` tests the change makes pass, promoted: `XXXInferredIntBindingRungT`, `XXXArrayInferredElementVectorWalk`, `XXXOpenRangeInferredIndexWalk`, `XXXNestedComprehensionDeclaredTypeWalk`, `XXXInferredStaticArgRungS`, `XXXPureListStridedSubscriptWalk`, each where it passes.
- Not yours: walk's numerals and the head of `inferAndInstantiateGenericFunction` (N); the library.

**Tests, first.**
- `ProjectFortress/tests/LanguageTypeInstancesWalk.fss`: `Cell(z)` for `z: ZZ32` and `Cell(3)` dispatching to `kind(c: Cell[\ZZ32\])`, `Cell(r)` for a computed `r: RR64` to `kind(c: Cell[\RR64\])`, `Cell("s")` to `kind(c: Cell[\String\])`, `instanceOf[\Cell[\ZZ32\]\](Cell(3))` true, `Just(3) = Just[\ZZ32\](3)` true, `SUM <|1, 2, 3|>` 6, `filled(z)` a vector, `openAt(z)` an open range, `typeOf(3)` printing `ZZ32`, and a refused binding's message naming `ZZ32` by a substring. Not `Cell(0.5)`, whose value N gives: on the merged tree it is a `Cell[\RR64\]` by N's default and your `Float`. Seen failing on the base.
- After the change: `ant testSystem` once (fork 2).

**The stages.** None: walk only. List your files (`STAGE_BLIND`).

**Rows.** 364 (both halves), 432, 721 and 722 close; 717, 20 and 824 close or narrow to what remains, each whole new line in `record.md` (row 20's float example and 824's string half by the review). Row 774's walk half is not yours.

**Specification.** None made false, by the review (section 4). List F-74's, F-229's and F-328's sentences that change, and the skill's on walk's `Int`.

**Files.**
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`: the three reads, only.
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/`, `interpreter/glue/prim/ObjectPrims.java`, `interpreter/glue/prim/Reflect.java`: the helper and the text.
- `ProjectFortress/tests/`: your test, the keys, `LongStringTests.fss`, the promotions.
- Not: `LHSEvaluator.java`, `OverloadedFunction.java`'s dispatch, walk's numerals, the library.

**Reserved points.** A team test line beyond `LongStringTests.fss:121` and `:141`. A model line: none (the review).

**Overlaps by file.** `EvaluatorBase.java` with N (the head of `inferAndInstantiateGenericFunction`, `:72-94`). `tests/TupleOrderMixedRefused.test`: yours, N's tree fails it.

### S. String literals: one object for each text on both paths, and a concatenation of literals folded (P-171)

**The mission.** Each evaluation of a string literal makes a new string object on both paths, so `"ab" SEQV "ab"` is `false`, and so is `f() SEQV f()` for `f(): String = "ab"` (row 945). P-171 makes two literals of one text one object and folds a concatenation of literals.

**The decisions this rung builds.** P-171, the review's way S-b with its compiled way (i), and way S-d. P-168 stands: strings are reference objects, their text equality their `=`. This record's section 3, forks 1 to 8, S1 and S2 (42, 43).

**What you build.**
- The tests first (below).
- `interpreter/evaluator/Evaluator.java:1018-1020`: the literal's text interned; walk's `SEQV` of two flat strings by their carried Java strings' identity (`interpreter/evaluator/values/FString.java:35-38`).
- `nativeHelpers/equalityRule.java:32-64`: two `FJavaString`s by their carried Java strings' identity (the review's `protoC`).
- The fold of fork S1, in the desugaring before the checker.
- Not yours: the numeral fold (F); walk's numerals (N).

**Tests, first.**
- `ProjectFortress/tests/StringLiteralIdentityWalk.fss` and `ProjectFortress/compiler_tests/StringLiteralIdentityCompiled.fss` with its `.test`: `"ab" SEQV "ab"`, one literal evaluated twice, `("foo" || "bar") SEQV "foobar"` and `("a" || 'b') SEQV "ab"` true; a string built at run time not `SEQV` an equal literal; on the compiled path through `equality.sEquiv` bound at `Any`, as `StrictEquivalenceRuleCompiled` binds it. Seen failing on the base.
- Guards: `StrictEquivalenceRuleWalk` and `StrictEquivalenceRuleCompiled` as they stand.
- After the change: `ant testSystem` and `ant testQuick` once each (fork 2).

**The stages.** Both, once each on your final tree (fork 3): the fold runs before the checker. The commands as N's, with `tmp/rung-string-literals/`.

**Rows.** 945 closes with your test.

**Specification.** Not yours. List every sentence made false: the `fortress-repo` skill's sentences that walk and the compiled path depart from P-171's answer at a string literal (row 945), in its part on how revived Fortress differs and in its interpreter and compiler parts, and any FACTS entry that says so.

**Files.**
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java`: `forStringLiteralExpr`, only; `interpreter/evaluator/values/FString.java`.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java`: the string case, only.
- `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java`, or the class that phase runs.
- `ProjectFortress/tests/`, `ProjectFortress/compiler_tests/`: your tests.
- Not: `IntegerLiteralFoldingVisitor.java`, `PhaseOrder.java`, the library.

**Reserved points.** None. A model line: none (`grep -c 'SEQV'` over both programs prints 0, the review's section 6).

**Overlaps by file.** `Evaluator.java` with N (`:1631-1637`).

### T. The specification: the numeral types, their conversions and default, the fold, and a string literal as one object, with their Appendix I entries (P-173, P-174, P-172, P-171, P-96)

**The mission.** The specification still says that a numeral has the type `IntLiteral`, that walk gives it `ZZ32` until it runs the checker, that numerals are not directly converted, and nothing of the default, the fold's result or a string literal's identity (`Specification/basic/expressions/literals.tex:132-165`; `basic/conversions-coercions.tex:74-90`; `basic/inference.tex:183-187`, `:299-317`). The decided design is to be written in the revision form, with Appendix I entries that name what it contradicts in the Working Draft and what it changes in form.

**The decisions this rung builds.** P-173, P-174, P-76, P-172, P-171, P-165 and P-40, each in its sentences; P-96, the revision form; P-26, whose bend P-173's entry owns as his weighing. This record's section 3, forks 1 to 8 and T1 to T3 (44 to 46), and the rungs' forks whose behaviour the text states.

**What you build.**
- `Specification/basic/expressions/literals.tex`: the numeral types (`:83-129`) as `NaturalNumeral` and `RadixPointNumeral` below `Numeral`, the four numbers as fields, the explicit-radix variants and `Literal[\v\]` folded into the radix field; the paragraph "Numerals are not directly converted" (`:132-148`) to P-173's rule, the conversion where a place fixes a type and the default where none does, a program's type through its coercion, one object per site; the box `revival-numeral-type` (`:149-165`) rewritten; the rational paragraph (`:166-176`) kept, with the fold; a string literal one object.
- `Specification/basic/expressions/constant.tex:44-74`: the constant traits changed in form, the fold's signed constant and its three defaults; `:81-88`, the two concatenations, kept, now built.
- `Specification/basic-lib/numbers.tex:40-54`: the coercions from the numeral types, and `asFloat` on both (fork N4).
- `Specification/basic/conversions-coercions.tex:74-90`, the box `revival-int-float`, and `:98-101`, the default as a rule beside coercion.
- `Specification/basic/inference.tex:183-187` and `:299-317`: the default at every place that fixes no type, the float tie, the narrowest default.
- `Specification/basic/objects.tex:50-60`: a string literal one object.
- `Specification/advanced-lib/binary.tex`, its typeset declarations over `NaturalNumeral` (`:906-911`, `:1118-1132`, and any other that `grep -n NaturalNumeral` shows typeset), and `Specification/basic/trait-parameters.tex:97-99`: callouts (fork T2).
- `Specification/appendices/changes.tex`: the entries of fork T1, in the revision form; not the natives effect (fork 4).
- The build, `ant` in `Specification/` as `fortress-repo`'s `specification.md` gives it, both PDFs.

**Tests.** None: an edit of the specification has no test (`fortress-repo`, `SKILL.md`). The build is your check.

**The stages.** None. List your files (`STAGE_BLIND`).

**Files.** `Specification/` only, the chapters named and `appendices/changes.tex`.

**Reserved points.** A sentence the decided design does not state. A model line: none.

**Overlaps by file.** None.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another. C lands only with N; T lands only with N, C, F and S. Each rung's tests pass on its own tree, but N's `TupleOrderMixedRefused`, which is G's (fork G4).
- The declarations each rung changes:
  - N: the numeral types and objects, the number types' coercions and pairs, `RR64`'s `comprises`, `Float`'s `asFloat`, `pi` and `e`, two lines of `ReflectiveQuickCheck`; a helper pair; `Types.java`'s two names; `isNumeral` and `numeralReading`; walk's literal methods, numeral values, numeral dispatch and conversions, the head of `inferAndInstantiateGenericFunction`, numeral `SEQV`; its tests and the team and revival lines named.
  - C: the checker's default sites, the written-only rule, the range refusal, `buildCoercion`, `KindEnv.getType`, the code generator's size constant; its tests and some 20 compiled tests' respellings.
  - F: walk's phase order, the fold visitor, `CoercionDesugarer`, the code generator's literal methods and once-per-class call; its tests and two walk tests.
  - G: the trait helper and its three call sites, walk's type text, `Reflect`'s text; the three keys, `LongStringTests`, six promotions.
  - S: walk's string literal and string `SEQV`, `equalityRule`'s string case, the string fold; two tests.
  - T: the chapters and entries named.
- The files that two rungs share, and each rung's place:
  - `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala`: N `isNumeral` and `numeralReading` (`:419-436`); C the default sites and new functions elsewhere. C calls `numeralReading` and does not edit it, and puts its new functions apart from `:419-437` (rung C, "Overlaps by file").
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`: N the head of `inferAndInstantiateGenericFunction` (`:72-94`); G `:602`, `:782-785`, `:936`.
  - `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java`: S `:1018-1020`; N `:1631-1637`.
  - `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`: F `forFloatLiteralExpr` (`:2035-2045`), `forIntLiteralExpr` (`:4207`) and the once-per-class call; C `isSizeInValuePosition` and its caller (`:6336-6345`).
  - `ProjectFortress/tests/TupleOrderMixedRefused.test`: G only.
- They meet on the merged tree. Walk's suite runs N's, F's, G's and S's walk tests; the compiler track runs C's, F's and S's compiled tests; the stages read the library as N leaves it, folded as F and S fold it, with the checker as N and C leave it, against 0 and 0, every site to be traced to one rung's edit. The specification's build reads T's text. The gather's 52 demos and the commit stage's quick check see every numeral and string at once.
- Five rules hold for every rung's tests, since other rungs change what they can meet: assert no static argument of a generic built from a numeral under walk (N gives the value, G the instance); assert no walk message's type text but by a substring that names no class (G changes it); on the compiled path write `IntLiteral` and `FloatLiteral` only as a coercion's parameter type (C refuses them elsewhere); write typed operands where a test means a fixed-width operation on numerals (F folds numerals alone on both paths); assert no `SEQV` of two string literals outside S.

## 5. The candidates, the probes, and what waits

### What the record owes

PLAN's line, piece by piece, with its home here:

- **The library and the checker** (P-174, P-76, P-172, P-165, P-169): the library and the checker's names and tie in N; the default, the tie of several numerals, the written-only rule, the range refusal and a program's type refusing a numeral in C; `pi` and `e` in N; row 578 and `IntLiteralValue` in N; rows 946 and 454's compiled half in C and N, row 944 in N, row 79's compiled half in C. P-148's timing in C and N.
- **The fold** (P-173, P-174): F, on both paths, with row 862 and the once-per-class call; the pairs' compiled fold and the four numbers on the compiled path wait for the switch-over (forks F5, F6).
- **Walk's numerals, place by place**: in N, with the library, not in a rung of its own (fork 1); rows 943, 443 and 454's walk half; `StrictEquivalenceRuleWalk.fss:32` and `sequivTest.fss:58`, `:94`.
- **Walk's generics and messages at language types** (row 364's way A): G; rows 364 and 432.
- **The strings** (P-171): S, its fold in a shared phase (fork S1); row 945; `compiler_regressions/seqv.fss:22`'s verdict after the switch-over.
- **The specification**: T.
- **The review list, items 438 to 447**: 438 in C (fork C3), 439 in C (fork C4), 440 in N and F (forks N7, F5), 441 in C (fork C5), 442 in F (fork F1), 443 in C (fork C2, point 1), 444 at each rung (fork 5), 445 in N (fork N9), 446 in N (forks N6, N7), 447 in T for the binary chapter (fork T2) and F for the constant chapter (fork F4, point 2).
- **The record writer's rows of tonight:** rows 79 and 486 now state compiled gaps against P-173: C closes both. Row 360 is closed, settled by P-173's tie; its `XXXRoundNearTieNumeral` and row 486's `XXXNatValueNN32RungK` assert answers P-173 drops: forks N12 and C5 deal with each.
- **Not here:** N1 and N5 of the parallelism review, and its other items (P-175; rows 947 to 953, row 466's N7).

### The planner's probes

`compile-ladder/plan-29/PROBES.md` holds each with its commands and output. In short:

1. **The pairs kept, on the prototype:** with the 15 pairs over the integer numeral restored and the float numeral's added, count 0 (113 s) and distance 0 (168 s); with the prototype's step 5 and chain also removed, count 0 (108 s) and distance 0 (185 s). Every comparison of a number with a numeral reaches its pair but `r = 0` for an `RR32`, which declares no coercion from an integer numeral. A pair goes after the getters, or the checker refuses the component.
2. **The fold in walk's phase order, at the base:** 789 of 791 walk tests pass; `NativeHelperFamilyZZ32Walk:31` and `ChooseZZ32Walk` change, the first by P-173's answer for numerals alone, the second by the fold's `CHOOSE` defect.
3. **Two defects of today's fold, on the compiled path:** `3 CHOOSE 5` stops the compile, "Integer Literal folding: Need to do something for factorial of negative values"; `a: ZZ32 = 2147483647 BOXPLUS 1` compiles and dies, "Not in range for ZZ32: 2147483648".
4. **The lines naming the two types:** 18, 18, 38 and 63 in the one library's four prelude files, 2, 2 and 2 in `Constants` and `ReflectiveQuickCheck`; 24 glue strings; 12 walk test files and 38 compiled.

**Not run:** the suites, the stages and the gate on the base, which climb batch 28's gate measured on this code; a prototype of N's walk half, of G or of S; the demos; the specification's build; a timing of the checker beyond the count runs of probe 1, whose 113 s and 108 s stand beside the prototype's 122 s base and 112 s change.

### Rows filed by plan

Two, from probe 3, filed by the record writer before the launch as rows 954 and 955 (`2f4b3d7d01`; the coordinator's step 2 of section 6), each for rung F to close:

- **Row 954: the fold stops `fortress compile` at a `CHOOSE` of numerals with `k` outside `0..n`:** `3 CHOOSE 5` throws `CompilerError` "Integer Literal folding: Need to do something for factorial of negative values" (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:38-55`, `:89-90`); walk answers 0. Implementation gap (codegen), the compiled path. Reproducer: `explorations/compile-ladder/plan-29/probes/FoldChoose.fss`.
- **Row 955: the fold folds the wrapping and saturating operators as exact `+` and `-`:** `a: ZZ32 = 2147483647 BOXPLUS 1` compiles and dies at run time, "Not in range for ZZ32: 2147483648" (`IntegerLiteralFoldingVisitor.java:63-66`). Implementation gap (codegen), the compiled path; walk declares no `BOXPLUS` at the one library. Reproducer: `explorations/compile-ladder/plan-29/probes/FoldWrap.fss`.

### Left out, each with its home

- **The parallelism review** (P-175): its own batches, around the switch-over.
- **The compiled four numbers, the pairs' compiled fold, a numeral at a compiled `QQ` place and the compiled numeral `SEQV`** (forks F5 to F7): the names batch, when the compiled path reads the one library.
- **`Reflect`'s 28:** his Q4 of the natives review.
- **Row 774's walk half:** a rung after G.
- **The removal of the two glue classes** (fork N11): the names batch's clean-up.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 28: `coordinator/climb-batch-workflow.js` and its manual `coordinator/climb-batch-workflow.md`. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest, which the batch's generator reads.

### The generator

`compile-ladder/plan-29/manifest/` (`gen29.py`, `lists29.py`, `check29.js`) is the coordinator's, made from `plan-28/manifest/`. It changes from climb batch 28's in these ways:

- the batch's values: `BATCH` `29`, its folder `compile-ladder/climb-batch-29/`, the output `manifest29.js`;
- the rungs from `lists29.IDS` in the manifest's order N, C, F, G, S, T;
- C's `landsOnlyWith` `['N']` and T's `['N', 'C', 'F', 'S']`;
- the briefings and checks of section 1, with their reasons; no key holds a backslash, a backtick or a double quote, and each matched one place by `facts-extract.sh --check` on `main` at `7da318db4d`, the REC keys against this record as written;
- no rung declaring a count, a crash or a move;
- N's, C's, F's and S's sections naming the count stage and the distance stage as stages they run once on their final tree, C's also P-148's `change` and `pass`; G's and T's naming neither.

### What every agent reads first

This run is climb batch 29, the seventh batch of the plan's phase 4, the switch-over: the literals, one design on walk and on the compiled path before the switch-over (P-173, P-174, P-76, P-172, P-171). Its rungs:

- N, P-174, P-76 and P-172 in the one library, and P-173's walk half: the numeral types `NaturalNumeral` and `RadixPointNumeral` below `Numeral` as value objects with the four numbers as fields, each number type's coercions and pairs, the 24 numeral glue bindings gone, the checker's two names switched by library and its float tie rule, and walk converting a numeral where it stands;
- C, P-173's and P-174's checker: the default where nothing fixes a type, the narrowest default for a type parameter that several numerals fix, the numeral types written only as a parameter type, a numeral out of range or at a type with no coercion from it refused statically, a size read as a value a `ZZ32`; it lands only with N;
- F, P-173's fold on both paths: numerals alone folded exactly into numerals as written, the fold's two defects repaired, two natural numerals concatenated, on the compiled path a typed place's numeral a constant rounded once and a program's coercion called once per class;
- G, row 364's way A: walk's generics and messages at the trait of a number or string value;
- S, P-171: a string literal one object for each text on both paths, and a concatenation of literals folded;
- T, the specification and its Appendix I entries; it lands only with N, C, F and S.

Each rung has tests that fail on the base and pass after, and guards that pass on both. N and C change the checker, and time it by P-148. N, C, F and S change what the stages read, so each runs the count stage and the distance stage once on its final tree, against climb batch 28's landed 0 and 0 (F-53). No rung edits the prelude, whose `IntLiteral` and `FloatLiteral` keep their names until the switch-over. Five rules hold for every rung's tests (section 4, "The rule the rungs keep"): assert no static argument of a generic built from a numeral under walk; assert walk's messages only by substrings that name no class; on the compiled path write `IntLiteral` and `FloatLiteral` only as a coercion's parameter type; write typed operands where a test means a fixed-width operation on numerals; assert no `SEQV` of two string literals outside S. On N's tree `TupleOrderMixedRefused` fails; it is G's. No two rungs change one declaration. The gather composes them, C after N and T after the four it lands with, revises Appendix I's natives effect to the merged count, builds the specification once for T's entries, and runs the 52 team demos on the merged tree. `ant testSpecData` runs in the gate as landed.

### Before the launch

The coordinator:

1. **The Fable review of this record** (`references/batch.md`, "The go"), its changes in place; his go is in advance (HELD, 23:3x).
2. **Rows 954 and 955** (section 5, "Rows filed by plan"), filed by the record writer at `2f4b3d7d01`; their numbers are in F's section, "Rows", and in F's briefing, put there by the Fable review.
3. **The generator,** made as "The generator" above gives it, and committed; its checks run on this record as reviewed: `python3 -B explorations/compile-ladder/plan-29/manifest/lists29.py`, every key matching one place on the base; `gen29.py`; `check29.js` on a scratch splice; `check29.js --write`; `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script; the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`.
4. **The base build:** `/home/user/fortress-base29` at `8cde0b2c4f`, kept from the prototype, if `git diff --stat 8cde0b2c4f <base> -- Library ProjectFortress Specification build.xml bin` prints nothing; else a new one at the base by the manual's "Before the launch", step 2. Its trial seed and the old code's run, step 3.
5. **The disk:** `df -P /home/user`, its Available column at or above the script's floor, 13 G for six rungs (section 2, "Before the batch runs"); before the launch, the main tree's old `tmp/gate-batch-*` and `tmp/gather/` scratch cleared. `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`, and the gather the demo driver.
6. **Check-ins** armed for the run's length, about 6 hours 30 minutes, 45 minutes apart.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base29'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch29/launch-args.json`, since a resume needs them.

### The gate, and what it should show

The comparands are climb batch 28's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0 over the fourteen, setting compile, `#crash none`), in `compile-ladder/climb-batch-28/gate/`.

- `testSystem`: 791, the comparand's, plus the rungs' walk tests (N 2, F 1, G 1, S 1) and the promotions in place, less `IntLiteralValue`: about 795.
- `testFast`: the compiler track 1,475 plus C's tests (about 4), F's (about 4 with the promotion) and S's (2), about 1,485; the library track 86 with C's two respellings in place; the other-compiler track 263; the misc track as landed.
- `testSpecData`: 130 green; T's text adds no example.
- The four-thread atomic runs: unchanged.
- The ladder: no rung declares a move.
- The checker count: 0, reported, not declared; N, C, F and S change what it reads, so a site is to be traced to one rung's edit. The distance: 0 over the fourteen, `#crash none`, reported and never red (P-39).
- The 52 team demos at the gather, each reaching its end (F-283).
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30): its numerals keep their bits by reading (the judgement's appendix).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`.

- **Filed by plan:** rows 954 and 955 (section 5), by the record writer before the launch (`2f4b3d7d01`).
- **Closed:** 943, 944, 454, 443, 484, 361 and 578 (N); 79, 946, 486 and 325 (C), with 362 and 506 by fork C7; 862, 954 and 955 (F); 364, 432, 721 and 722 (G); 945 (S). Each with its test, the commit in `HEAD` first.
- **Rewritten,** each row's whole new line in its rung's `record.md`: 717, 20 and 824 (G) where a half remains.

### After the landing

The landing report; the routing of every item for the curator into PLAN, this record's forks among them, with PLAN lines for the names batch: the compiled four numbers, the pairs' compiled fold, a numeral at a compiled `QQ` place, the compiled numeral `SEQV` (forks F5 to F7), and the two glue classes' removal (fork N11); POSITIONS: P-165's list gains `RadixPointNumeral` by fork N4, his to confirm; FACTS: F-57, F-73, F-74, F-79, F-118, F-262, F-299 and F-32 (the glue count, 52 to 28), F-326, F-328, and the facts the rungs hand over; the skill writer's task with the batch's sentences made false, `revival-changes.md`'s "Numbers" and its string sentence among them; the post-batch review.

## 7. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [HELD.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/HELD.md), [CLIMB-BATCH-28.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-28.md), [climb batch 28's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-28-review.md), [climb batch 28's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-28/gate/summary.txt), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-29/PROBES.md).
- Reviews and the prototype: [the literal design's judgement](https://github.com/palimondo/fortress/blob/main/explorations/reviews/literal-design-judgement-2026-11-08.md), [the prototype](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-29/probes/literal-default.md), [its patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-29/probes/literal-default.patch), [the probe's pairs patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-29/probes/pairs-kept.patch), [the literal fork](https://github.com/palimondo/fortress/blob/main/explorations/reviews/literal-fork-2026-11-08.md), [the literals study](https://github.com/palimondo/fortress/blob/main/explorations/reviews/literals-2026-11-08.md), [row 364's probe](https://github.com/palimondo/fortress/blob/main/explorations/reviews/row-364-walk-generics-2026-11-08.md).
- Code: [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [Types.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/Types.java), [Functionals.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala), [KindEnv.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala), [IntegerLiteralFoldingVisitor.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java), [PhaseOrder.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java), [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [Evaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java), [EvaluatorBase.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java), [equalityRule.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java).
- Specification: [literals.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/literals.tex), [the Working Draft's literals.tex](https://github.com/palimondo/fortress/blob/main/Specification-1.0-frozen/basic/expressions/literals.tex), [constant.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/constant.tex), [inference.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/inference.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
