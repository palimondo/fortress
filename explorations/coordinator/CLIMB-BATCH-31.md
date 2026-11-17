<!-- The record of climb batch 31, in two runs (climb batch 31 and climb batch 31b), for the coordinating session, the curator and the batch's workers. Run 1: four walls between today's tree and a compiled program on the interpreter's library that a test against the compiler's prelude can show and repair today (rungs M, K, L and A), and the two repairs that the merge of the five built-in number types with their objects needs first (rungs V and X). Run 2, on run 1's landed tree: the method over a tuple (T), the merge of P-178 in the one library and in walk (O), and a numeral at the end of a block (E). The prelude's half of the merge is in no run: it is not designed (fork H2). -->
<!-- History. Drafted 2026-11-13 by a planning worker on Fable against `main` at `840a4056c1`, for seven rungs, and checked that day by a fresh reader (`coordinator/climb-batch-31-review.md`), whose corrections of fact are kept here. Amended 2026-11-15: rungs N and D moved to climb batch 32, which landed on 2026-11-16 (`567c36dadc`). Brought in line with the landed tree and extended on 2026-11-16 by a planning worker on Fable, on `main` at `97c2b74e1f`, whose code is that of `c0c35b4f9e`, the base build `/home/user/fortress-base34` (`git diff --stat c0c35b4f9e main -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin ProjectFortress/astgen build.xml bin` prints nothing): the five rungs read again on that tree and their reproducers run; the rows and steps that climb batch 32's review offered, weighed (`reviews/batch-32-review.md`, Part 5); rungs V, X, O and E added; the merge of P-178 planned. Checked before the launch on 2026-11-16 by a fresh reader, whose corrections are in place (`coordinator/climb-batch-31-review.md`). The coordinator then decided that check's points B1 and B2: fork V4, by which row 550's pair at `ZZ64` stays an expected failure until rung O, and one more guard in rung V's step 2. Run 1 landed on 2026-11-17 as `7858d0e97b`. Run 2's sections T, O and E, its parts of sections 1, 2 and 6 and its estimate were brought in line with that tree on 2026-11-17 by a fresh reader, who ran each of run 2's reproducers once on the base build `/home/user/fortress-base36` (`a3e35bbdb0`); his changes are in place and listed in `coordinator/climb-batch-31-review.md`, "Run 2, before its launch". -->
<!-- **The go for run 2: the curator wrote at about 06:40 UTC on 2026-11-17 that run 2 starts with the planner's defaults, with no question to him first, forks O3 and O4 among them; he reviews them after the landing. No rung of run 2 is held out.** -->
<!-- **The go: the curator gave it at 23:04 UTC on 2026-11-16, dictated as he went to sleep: "Approved. Plan autonomously, with details. I'll review afterwards. Go for batch." Run 1 launches on this record with no question put to him first; each fork took its default by the rule of the `coordinator` skill's `references/batch.md`, "The go", and is on the review list. No rung was held out for bending a decision on record or for a model line.** -->
<!-- Sources: the planner's brief (`<scratchpad>/batch31/planner-31b-brief.md`); `reviews/batch-32-review.md`, Part 5 and its process findings 1 to 9; POSITIONS P-178 with its history, P-37, P-160, P-167, P-68, P-45, P-87, P-173, P-176, P-148 and those of the record as first drafted (P-47, P-60, P-146, P-149, P-147, P-156, P-169, P-175); FACTS F-34, F-53, F-361; `compile-ladder/plan-31/probes/number-object-merge.md`; `reviews/carriers-ways-2026-11-13.md`, "Way D"; review-queue items 516 to 520; the ledger rows named in section 1; `compile-ladder/plan-31/probes/switch-rehearsal.md`; the `coordinator` skill's `references/batch.md`; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the code at the sites. -->
<!-- The planner's probes: `compile-ladder/plan-31/PROBES.md`, sections 6 to 11 for 2026-11-16, with their programs in `compile-ladder/plan-31/probes/planner/`, run in a worktree of the planner's own, `/home/user/fortress-p31b`, seeded from the base build and removed after. No suite and no stage of the gate was run. -->

# Climb batch 31

## 1. The manifest, rung by rung

The batch's generator writes each run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. Run 1, climb batch 31, holds M, K, L, A, V and X in that order; run 2, climb batch 31b, holds T, O and E. The order of M, K, L and A is the order of their lowest edited lines in the file that they share (section 4, "The rule the rungs keep"). The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-31.md#`, REH for `doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#`, PRB for `doc:explorations/compile-ladder/plan-31/PROBES.md#`, MRG for `doc:explorations/compile-ladder/plan-31/probes/number-object-merge.md#`, SPEC for `doc:Specification/`, and SRC for `code:ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main` (PROBES, section 10).

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | M | `rung-method-forwarders` | The methods that a class inherits: one method once, and a body inherited through an api's trait | 220 |
| 1 | K | `rung-comprises-cast` | The cast where a trait's value stands for the type that its `comprises` clause lists | 150 |
| 1 | L | `rung-label-exit` | `label` and `exit` on the compiled path | 180 |
| 1 | A | `rung-atomic-expr-field` | `atomic` as an expression, and a mutable field inside a transaction | 170 |
| 1 | V | `rung-walk-value-bound` | Walk before the merge of the number types: a type parameter bounded by a value type, and a generic declaration beside a plain one | 200 |
| 1 | X | `rung-return-rule-object` | The checker's Return Type Rule for a generic declaration beside a plain one over an object type | 160 |
| 2 | T | `rung-tuple-parameter` | A method whose one parameter is a tuple, and a tuple as an operator's operand | 220 |
| 2 | O | `rung-number-objects` | The five number types as value objects in the one library, and walk's native number objects removed | 300 |
| 2 | E | `rung-numeral-block-end` | A numeral at the end of a block at a declared return type on the compiled path | 180 |

Fields common to the nine rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-method-forwarders`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** none, but the specification's build at the gather of run 1, for K's, V's and X's text, and of run 2, for T's, O's and E's. **expected moves:** none.
- **lands only with:** none. In each run every rung lands on its own. T, O and E are written on run 1's landed tree: T edits the forwarding code that M owns in run 1, O needs V's two repairs of walk, and E may edit the code at a returned value that K owns in run 1.
- **its test is the stage:** no. **the stages:** X, O and E run the count stage and the distance stage once on their final trees, as a step of their sections: X edits the checker, O the one library, and E the checker or the code generator. M, K, L, A, V and T run neither and list their files (`STAGE_BLIND`); M, K, L, A and T each run the distance stage's shadow patch once on their final trees, since that tool edits a copy of `CodeGen.java` (section 4, "The rule the rungs keep").
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 32's gate left them (F-53). **expected checker crash:** none.

### M
- **slug:** `rung-method-forwarders`
- **worktree:** `/home/user/fortress-method-forwarders`
- **section:** `M. The methods that a trait's or an object's class inherits: one method written once where a generic trait gives a body to a method that it also inherits with a body, and a forwarder for a body inherited through an api's trait that is not first, a generic method's among them (rows 990, 732 and 571)`
- **blurb:** the code generator gathers, for each trait's and object's class, forwarders to the method bodies that the class inherits from the traits after its first. Two defects of that gathering: where a generic trait declares a method with a body that it also inherits with a body, the class gets the method twice and fails as it loads (row 990, the rehearsal's W6); where the body comes through an imported api's trait that is not first in the extends clause, a plain or a generic method gets no forwarder and the call dies with AbstractMethodError (row 732, the rehearsal's W16). Both are repaired, the first so that the trait's own declaration runs whatever the order in which the compiler meets the two.
- **points to report:**
  - The override test as built: which declaration a class's method runs where its trait declares one that it also inherits, and why the result no longer depends on the order of the gathered methods.
  - Row 990's reproducer and row 732's two cases, the plain and the generic method, each failing on the base and passing after; the same programs compiled twice, once with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` in the compile's `JAVA_FLAGS`, with both runs' output.
  - Row 571's own test, `XXXFunctionalMethodMeetNarrowedSelfNotFirst`: passes after, or what remains.
  - Row 1013's test, `XXXFunctionalMethodValueGenericTraitCompiled`: passes after, or unchanged, by a run.
  - Rows 495 and 733: touched or not.
  - Every existing test that failed after your change, with its cause.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (17 keys, 11 checks):
  - P-47 (check): each integer type declares its own `MIN`, `MAX` and `MINMAX` beside the inherited ones: the library's shape that row 990 meets.
  - P-149 (check): an abstract method from one trait and its body from another.
  - P-147: an object defines an inherited abstract method by bodies that cover it.
  - ledger:990 (check): the method written twice, which closes.
  - ledger:732 (check): the body inherited through an api's trait, which closes.
  - ledger:571 (check): the nearest older row; its test is a guard or a promotion.
  - ledger:495: the generic dotted methods' dispatch, which is not yours.
  - ledger:1013: a functional method of a generic trait as a value, a kin that you report on.
  - REH `W6. One method written twice into a class` (check): the library's 27 classes, and the hack that failed after a rebuild.
  - REH `W16. The library's vector algebra` (check): the library's site, `Indexed`'s `map` on a range object.
  - PRB `2. The walls under the prelude` (check): the reproducers and their narrowing.
  - SPEC `basic/traits.tex#Method Declarations` (check): what a trait's own declaration does to an inherited one.
  - SRC `compiler/codegen/CodeGen.java#private void dumpMethodChaining` (check): where the forwarders are gathered.
  - SRC `compiler/codegen/CodeGen.java#private void generateForwardingFor(Functional from_fnl, Functional to_fnl`: how one forwarder is written.
  - `code:Library/FortressLibrary.fss#trait StandardTotalOrder`: the library's precedent, bodies beside inherited bodies.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks a trait and an object.
  - REC `Forks the batch takes` (check): the defaults you build.

### K
- **slug:** `rung-comprises-cast`
- **worktree:** `/home/user/fortress-comprises-cast`
- **section:** `K. The cast where a value typed by a trait stands for the type that the trait's comprises clause lists: the checker accepts it, and the compiled code now casts (rows 991 and 695)`
- **blurb:** the checker reads a comprises clause at the level of values (P-60), so in trait Q comprises { R } a value of Q may stand where R is expected, and in a self-typed trait self may be returned as the implementing type (P-146). The code generator emits no cast there, and the JVM's verifier refuses the class when it loads (row 991, the rehearsal's W7; row 695). The rung emits the cast at the places where a value meets a declared type.
- **points to report:**
  - Each place where the cast is now emitted (an argument, a returned value, a typed binding, a field), and the test that decides whether one is needed.
  - Row 991's reproducer and row 695's test, failing on the base and passing after.
  - Row 307's `XXXNatOpenRun` and row 815's case: passing after, or unchanged, by a run.
  - The bytecode of a call that needs no cast, before and after.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - Each sentence of the specification changed, before and after.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (12 keys, 9 checks):
  - P-60 (check): a `comprises` clause speaks of values.
  - P-146 (check): `self` in a self-typed trait.
  - ledger:991 (check): the missing cast, which closes.
  - ledger:695 (check): the returned `self`, which closes if the same cast reaches it.
  - ledger:307: the run-time size's `VerifyError`, a kin that you report on.
  - ledger:815: the functional method of a listed object, a kin that you report on.
  - REH `W7. Missing casts that the JVM's verifier refuses` (check): the library's site, `QQ` and `Ratio`.
  - `doc:explorations/reviews/carriers-ways-2026-11-13.md#Way C. The object's class carries the value, and the trait stays an interface`: what a trait with one listed object may mean for descriptors later; not built here.
  - SPEC `basic/traits.tex#Trait Declarations` (check): the `comprises` clause.
  - SRC `compiler/codegen/CodeGen.java#private void conditionallyCastParameter(Option<Type> apparent_type` (check): where an argument is cast today.
  - `map:compile-path-walkthrough.md#5. Code generation` (check): how the code generator walks a call.
  - REC `Forks the batch takes` (check): the defaults you build.

### L
- **slug:** `rung-label-exit`
- **worktree:** `/home/user/fortress-label-exit`
- **section:** `L. label and exit on the compiled path: an exit leaves its label's block with its value, also from inside a loop's body (row 81)`
- **blurb:** the code generator has no case for a label block or an exit (row 81), so every declaration that holds one is refused, the one library's Indexed among them. The rung compiles label and exit, an exit from inside a loop's body or a function expression included.
- **points to report:**
  - `exit` as built: how it reaches its label from a loop's body, which is a closure and can run in a task; what the other iterations of a parallel loop do; what a `finally` clause between the `exit` and its label does; and an `exit` out of an `atomic` block, whose writes the specification retains: built, or its expected-failure test and its new row.
  - Each form tested, failing on the base and passing after at one thread and at four: an `exit` with and without a value, out of a `while`, out of a `for`, a label nested in a label, a label as a function's whole body.
  - Every existing test whose pinned message changed.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - Each sentence of the specification that your change makes false, or none.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (12 keys, 8 checks):
  - P-175 (check): a group joins every arm that it forked before it completes abruptly, which an `exit` out of a parallel loop meets.
  - F-19: what may run in parallel, and what each path forks.
  - ledger:81 (check): the refusal, which closes.
  - REH `W9. ` (check): the library's sites of `label`.
  - SPEC `basic/expressions/label.tex#Label and Exit` (check): the construct.
  - SPEC `basic/evaluation/parallelism.tex#Threads and Parallelism`: when a group completes abruptly.
  - SPEC `basic/expressions/atomic.tex#Atomic Expressions` (check): what an `exit` out of an `atomic` block does to the block's writes.
  - SRC `interpreter/evaluator/Evaluator.java#public FValue forLabel` (check): walk's label, the precedent.
  - SRC `interpreter/evaluator/Evaluator.java#public FValue forExit` (check): walk's exit.
  - SRC `compiler/codegen/CodeGen.java#public void forFnExpr`: how a loop's body becomes a closure, which an `exit` leaves.
  - `code:Library/FortressLibrary.fss#trait Indexed[`: the library's `indexOf`, an `exit` out of a `for`.
  - REC `Forks the batch takes` (check): the defaults you build.

### A
- **slug:** `rung-atomic-expr-field`
- **worktree:** `/home/user/fortress-atomic-expr-field`
- **section:** `A. atomic as an expression, and a mutable field inside a transaction: the form of the one library's OneShot (rows 875 and 319)`
- **blurb:** the code generator compiles an atomic block and has no case for an atomic expression (row 875); and a mutable field of an object is read and written outside the transaction, so atomic do n := n + 1 end on a field loses updates at four threads (row 319). The one library's OneShot writes both in one line. The rung compiles the atomic expression on the landed transaction and handler, and keeps a var field in a cell, as a top-level var is kept, so that the transaction tracks it; an immutable field is unchanged.
- **points to report:**
  - The atomic expression as built, and what it shares with the block's code.
  - A mutable field as built: what the object holds, the code at a read and a write inside and outside a block, a `var` value parameter of a generic object, and the bytecode of an immutable field's read before and after.
  - Each test failing on the base and passing after at one thread and at four; the atomic programs' runs on your final tree.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - Each sentence of the specification that your change makes false, or none.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (12 keys, 10 checks):
  - P-169 (check): the compiled transaction's slots, the shape your work stays within.
  - ledger:875 (check): the atomic expression, which closes.
  - ledger:319 (check): the field outside the transaction, which closes.
  - ledger:641: what a check before every access costs.
  - `doc:explorations/reviews/parallelism-foundations-2026-11-08.md#1.6 The code generator's` (check): the block's code and its gaps.
  - SPEC `basic/expressions/atomic.tex#Atomic Expressions` (check): the atomic expression.
  - SRC `compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x)` (check): the block's code and handler, as climb batch 30 landed them.
  - SRC `compiler/codegen/VarCodeGen.java#public static class MutableFieldVar` (check): a field's read and write.
  - SRC `compiler/codegen/VarCodeGen.java#public static class FieldVar` (check): a value parameter's read and write, a var one's among them.
  - `code:Library/OneShotFlag.fss#object OneShot` (check): the library's site.
  - `map:modules-and-phases.md#B.11 The runtime`: the compiled run time and its transaction.
  - REC `Forks the batch takes` (check): the defaults you build.

### V
- **slug:** `rung-walk-value-bound`
- **worktree:** `/home/user/fortress-walk-value-bound`
- **section:** `V. Walk before the merge of the number types: a generic method's type parameter bounded by a value type, and the load check of a generic declaration beside a plain one over an object type (rows 997, 998 and 550)`
- **blurb:** two defects of walk stand today at NN32 and RR32, which are value objects, and the merge of the five number types with their objects (run 2's rung O) would bring them to the types that every program uses: a generic method of a trait whose type parameter is bounded by the trait's static parameter stops at an instance at a value object (row 997), and walk's load check loads a generic declaration beside a plain one over an object type against the Return Type Rule (row 998) and refuses a valid pair of that kind (row 550). The rung repairs both under walk at an object type, and writes the expected failure of row 1036; row 550's own pair at ZZ64, a trait until run 2's rung O, stays an expected failure.
- **points to report:**
  - The check of a value type as built: which types `enforceValueness` still refuses, and the test that holds the refusal.
  - The load check as built for a generic declaration beside a plain one: when the two parameter lists count as excluding, and at which instances the two results are compared.
  - Rows 997 and 998: each test failing on the base and passing after; row 550's test at ZZ64, still an expected failure after, by a run; the plain declaration with no written return type beside a generic one, still loading after.
  - Every pair of the one library or of an existing test that walk refuses at load after your change and loaded before, or loads and refused before, with its file and line.
  - Row 697's test, `XXXReturnRuleObjectParamWalk`: unchanged, by a run.
  - Row 1036's expected failure and the sentence of the specification's box, before and after.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (16 keys, 11 checks):
  - P-178 (check): the decision that the two repairs come before.
  - P-45 (check): overloads may differ in their static parameters, and the Return Type Rule holds at every instance that the argument types allow.
  - P-12: walk has no static types before the switch-over.
  - ledger:997 (check): the type parameter bounded by a value type, which closes.
  - ledger:998 (check): the invalid pair that loads at an object type, which closes.
  - ledger:550 (check): the valid pair that walk refuses, whose test at ZZ64 stays an expected failure until rung O.
  - ledger:697: two plain parameter lists at an object type, which is not yours.
  - ledger:1036 (check): the expected failure that step 3 writes.
  - ledger:1019: its kin, the immutable top-level variable, and the form of its test.
  - MRG `Obstacles, in the order met` (check): obstacles 5 and 6, the two defects as the probe met them.
  - SPEC `advanced/overloading.tex#Declarations with Static Parameters` (check): the rule for a generic declaration beside another.
  - SRC `interpreter/evaluator/types/FTraitOrObject.java#private void enforceValueness` (check): the check that stops the symbolic type.
  - SRC `interpreter/evaluator/values/OverloadedFunction.java#static private DomainReading validOnDeclaredDomains` (check): walk's reading of a pair on its declared domains.
  - SRC `interpreter/evaluator/values/OverloadedFunction.java#static private boolean returnRuleAtEveryInstance`: the precedent, the rule at every instance for two generic declarations.
  - `map:modules-and-phases.md#B.8 The interpreter tail`: how walk loads and runs a component.
  - REC `Forks the batch takes` (check): the defaults you build.

### X
- **slug:** `rung-return-rule-object`
- **worktree:** `/home/user/fortress-return-rule-object`
- **section:** `X. The checker's Return Type Rule for a generic declaration beside a plain one whose domain is an object type (row 542)`
- **blurb:** the compiled checker's Return Type Rule refuses a generic declaration beside a plain one whose domain is an object type, a pair that the rule of the team's paper accepts (row 542). Once each built-in number type is one value object (P-178), that refusal reaches the number types. The rung repairs the rule: only the instances whose domain meets the plain declaration's count.
- **points to report:**
  - The rule as built: which instances of the generic declaration the Return Type Rule now compares, and where the paper's condition is read.
  - Row 542's two pairs compiling and running after, and an invalid pair still refused, each seen on the base first.
  - Every pair of the one library or of an existing test whose verdict changed, with its file and line.
  - The two stages' tables on your final tree against the comparand, and the timing of the checker before and after.
  - Each sentence of the specification changed, before and after.
  - A file edited beyond those named.
- **briefing** (10 keys, 7 checks):
  - P-45 (check): the Return Type Rule over declared domains, at every instance that the argument types allow.
  - P-178: why the refusal would reach the number types.
  - P-148 (check): the checker's timing for your edit.
  - F-75 (check): what the checker's two rules find in the one library today.
  - ledger:542 (check): the refusal of a valid pair, which closes.
  - ledger:853: the sibling in the specificity test, which is not yours.
  - SPEC `advanced/overloading.tex#Declarations with Static Parameters` (check): the rule.
  - SRC `scala_src/overloading/OverloadingOracle.scala#def satisfiesReturnTypeRule(f: Functional, g: Functional)` (check): the checker's Return Type Rule.
  - `map:modules-and-phases.md#B.7 Overloading`: where the checker's overloading rules run.
  - REC `Forks the batch takes` (check): the defaults you build.

### T
- **slug:** `rung-tuple-parameter`
- **worktree:** `/home/user/fortress-tuple-parameter`
- **section:** `T. A method whose one parameter is a tuple: an object's body at a tuple type implements its generic trait's method over a type parameter, a generic method takes a tuple, and a postfix operator takes a tuple operand (rows 992, 832 and 819)`
- **blurb:** the code generator passes a tuple-typed parameter's elements as separate JVM parameters, and a generic trait's method over a type parameter takes one boxed tuple, so an object's body written at the tuple type does not implement it, and the object's class fails verification (row 992, the rehearsal's W15: every m[i,j] of the one library's arrays of rank 2 and 3); a generic dotted method with one tuple parameter dies at the call (row 832); a postfix operator applied to a tuple operand stops the code generator (row 819, the one library's four range operators over pairs and triples).
- **points to report:**
  - The convention as built: what a method's JVM parameters are where its one parameter is a tuple, and where the instantiated signature and the body's signature differ, what joins them.
  - Rows 992, 832 and 819: each reproducer failing on the landed tree and passing after.
  - Every existing test that failed after your change, with its cause.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - Each sentence of the specification changed, before and after.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (13 keys, 10 checks):
  - P-156 (check): an index type extends `Index`, and a tuple of indices is an `Index`.
  - ledger:992 (check): the method over a tuple index type, which closes.
  - ledger:832 (check): the generic dotted method with a tuple parameter, which closes.
  - ledger:819 (check): the postfix operator on a tuple operand, which closes.
  - REH `W15. An array of rank 2` (check): the library's site.
  - PRB `2. The walls under the prelude` (check): the reproducer, and its form with the verifier on.
  - SPEC `basic/expressions/method-invocation.tex#Dotted Method Invocations` (check): a dotted call's argument.
  - SRC `compiler/codegen/CodeGen.java#private Type receiverPrependedDomainType` (check): where the receiver joins a tuple domain's elements.
  - SRC `compiler/codegen/CodeGen.java#private void generateForwardingFor(Functional from_fnl, Functional to_fnl` (check): the forwarder, as run 1 left it.
  - SRC `compiler/codegen/CodeGen.java#private void castToTypeBelow`: rung K's cast of one argument, which a bridge method may need for a self among a tuple's elements.
  - REC `M. The methods that a trait's or an object's class inherits`: what rung M built in the same code, which you build on.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks a method and a call.
  - REC `Forks the batch takes` (check): the defaults you build.

### O
- **slug:** `rung-number-objects`
- **worktree:** `/home/user/fortress-number-objects`
- **section:** `O. The five number types as value objects in the one library: each of ZZ32, ZZ64, ZZ, NN64 and RR64 merged with its one object, and walk's native number objects Int, Long, Float, BigNum and UnsignedLong removed (rows 1003, 1000 and 551)`
- **blurb:** the one library declares each of ZZ32, ZZ64, ZZ, NN64 and RR64 as a trait that comprises one native object, Int, Long, BigNum, UnsignedLong and Float. By the decision on record each is one value object under its own name, as NN32 and RR32 are, and the five objects leave the library and walk (P-178; row 1003). The rung makes that change in the one library and in walk, on the tree that run 1 landed; the compiler's prelude is not in it.
- **points to report:**
  - The library's text by file: lines added and deleted, the members that each of the five types took from its object, and the bodies of the five traits that went, with the reason for each kind.
  - Walk's Java by file: where the five get their native values, the constructor classes renamed, and each line deleted because it served the two names.
  - The test of step 1 failing on the base and passing after; `asifTest`, `NumberPrintTest` and `NativeHelperFloatCarriedWalk` after.
  - Every existing test whose checked value or pinned message changed, with its before and after; a test of the team's among them is a reserved point.
  - Row 550's test, `XXXGenericBesidePlainReturnParam`, promoted: failing as an expected failure on the base, passing after.
  - What a program sees differently: a printed type, a message, a `typecase` arm, an overloading that loads or is refused; among them the plain declaration with no written return type beside a generic one over `ZZ64`, refused on the base and loading after.
  - Every pair of the one library or of an existing test that walk refuses at load after your change and loaded before, with its file and line and the rule that refuses it.
  - The two stages' tables on your final tree against the comparand.
  - Each sentence of the specification changed, before and after.
  - A line of the model program or of its helper files that the change needs: none, or the line, not changed.
  - A file edited beyond those named.
- **briefing** (28 keys, 19 checks):
  - P-178 (check): the decision you build, in the one library and walk.
  - P-160 (check): a program's own number type extends `Number`.
  - P-167 (check): walk's native objects are no types that a program sees or prints.
  - P-68 (check): `round`, `truncate` and the brackets wait for a library rung after the switch-over.
  - P-37: the prelude's half of the decision, which is not in this rung.
  - P-87 (check): no line of the model program or of its helper files changes.
  - F-361 (check): the probe's result: the two measures, walk's suite, the gaps that widen.
  - F-344: walk reads a native object's value at its trait, which the numbers stop needing.
  - F-328: the ilk names, which the numbers stop needing.
  - ledger:1003 (check): the row of the decision, whose one-library half you build.
  - ledger:1000 (check): `round` declared twice, which the merge reduces to one declaration.
  - ledger:551 (check): a program's object below a number type, which walk loads today.
  - ledger:550 (check): the valid pair at ZZ64 that walk refuses, whose test you promote.
  - ledger:959 (check): a `typecase` arm at a name that no declaration defines.
  - ledger:330: the row of the decision on `round`, `truncate` and the brackets.
  - ledger:785: a plain declaration with no written return type, which walk refuses over a trait type.
  - ledger:1044: the same declaration over an object type, which walk loads unjudged.
  - MRG `What was built` (check): the probe's change, file by file, and what it left undone.
  - MRG `Obstacles, in the order met` (check): each obstacle and how the probe passed it.
  - MRG `The bodies of trait RR64 that go through asFloat(self)` (check): which bodies of the trait run today, and which survive.
  - MRG `Sentences of the specification made false` (check): the Effect's sentences that name the objects.
  - `doc:explorations/reviews/carriers-ways-2026-11-13.md#Way D. One object per type: each number trait merged with its one object` (check): the way, and why the split is there.
  - `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#value object NN32` (check): the library's precedent, a number type as one value object.
  - `code:Library/FortressLibrary.fss#trait RR64`: the largest of the five traits.
  - SRC `interpreter/evaluator/BuildEnvironments.java#protected void forObjectDecl1` (check): where walk builds an object's environment.
  - `map:modules-and-phases.md#B.13 Where each library enters`: where each path reads its library.
  - `map:compile-path-walkthrough.md#7. Native bindings in both worlds`: how a native binding and a native object reach Java on each path.
  - REC `Forks the batch takes` (check): the defaults you build.

### E
- **slug:** `rung-numeral-block-end`
- **worktree:** `/home/user/fortress-numeral-block-end`
- **section:** `E. A numeral at the end of a block at a declared return type on the compiled path: alone after a local declaration, and as an element of a tuple (rows 1014 and 1030)`
- **blurb:** a compiled function whose body is a block that ends in a numeral after a local declaration, at a declared return type, links and dies when it runs with NoClassDefFoundError: fortress/CompilerBuiltin$v (row 1014), and so does a block that ends in a tuple with a numeral element (row 1030): the numeral's coercion is written as a reference to a function that is not instantiated. The rung repairs both, and writes the compiled test of u = 0 at NN32, NN64 and RR32 that an earlier landing owes.
- **points to report:**
  - The cause as found: where the reference to the coercion is written, by file and member, and why a typed binding does not take that path.
  - Rows 1014 and 1030: each test failing on the base and passing after; row 1031's test by a run.
  - The three kin of rows 1043 and 340, `XXXAtomicExprNumeralArms`, `XXXAtomicExprNumeralBody` and `XXXLabelNumeralValueCompiled`: each promoted, or unchanged with its message, by a run.
  - The compiled test of `u = 0` and `u =/= 0` at `NN32`, `NN64` and `RR32`: each case's answer, the refusal and the expected failure at `RR32`, and the Effect's sentence before and after.
  - The bytecode of a function that returns a numeral with no local declaration before it, before and after.
  - The two stages' tables on your final tree against the comparand, and the timing of the checker before and after if you edited it.
  - A file edited beyond those named.
- **briefing** (17 keys, 10 checks):
  - P-173 (check): a numeral converts where it stands, a declared return type among the places.
  - P-176 (check): one value for each place where a numeral is written.
  - P-174: the numeral types and their coercions.
  - P-50 (check): the body of a `label` and each value of an `exit` take the label's expected type, the decision for the label's kin.
  - P-37 (check): the prelude is not changed for this.
  - P-148 (check): the checker's timing, if your edit is there.
  - ledger:1014 (check): the numeral that ends a block after a declaration, which closes.
  - ledger:1030 (check): the tuple with a numeral element, which closes.
  - ledger:1031: the tuple binding over an `if`, a kin that you report on.
  - ledger:1043: a numeral as the value of an atomic expression, a kin that you report on.
  - ledger:340: the code generator's crash at a coerced value, whose label case is a kin that you report on.
  - SPEC `basic/expressions/blocks.tex#Do Expressions`: a block's value and type.
  - SPEC `basic/conversions-coercions.tex#Coercions for Tuple and Arrow Types` (check): how a tuple converts, element by element.
  - `map:compile-path-walkthrough.md#What it writes onto the tree` (check): what the checker writes onto the tree, the coercions among it.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks a function's body.
  - `code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss#trait RR32`: the prelude's `RR32`, which declares no `=/=`.
  - REC `Forks the batch takes` (check): the defaults you build.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** first checks the types of a program with the **checker**. Then it writes JVM bytecode with the **code generator**.
- The **prelude** is the small library that the compiled path uses today. The **one library** is the interpreter's library. Only walk runs it today. The **switch-over** is the move of the compiled path onto the one library.
- A **wall** is a place where the compiler or the compiled library stops.
- A **rung** is one change. One worker builds it. A second worker, the skeptic, checks it. A **run** is one launch of the batch workflow. The **gather** merges the rungs of a run. The **gate** is the full check before a run lands.
- A **numeral** is a number written in digits.
- A **generic** declaration has a type parameter, such as `T`. A **plain** declaration has none. An **instance** is the generic declaration with a type in the place of `T`.
- A **value object** is an object without identity. Two value objects with the same contents are the same value. No type can extend an object.
- The **merge** is your decision P-178. Each of the five number types `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` becomes one value object. The five internal objects of the interpreter, `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong`, go.
- The **ledger** is the list of known defects. A **row** is one defect. An **expected-failure test** is a test that is known to fail and is marked so.
- **microGPT** is the model program. No rung changes a line of it.

### The go

You gave the go at 23:04 UTC on 16 November: "Approved. Plan autonomously, with details. I'll review afterwards. Go for batch." Run 1 started that night on this record. The coordinator put no question to you first. The rule for a night when you are away decided each fork below: the fork took its default, and it is on your review list. Run 1 landed at 04:26 UTC on 17 November. For run 2 you wrote at about 06:40 UTC that day that it starts with the defaults of the planner, with no question to you first. The part "Run 2, rung by rung" has your words.

### What was held out

- **No rung was held out.** No default bends a decision of yours. No rung changes a line of the model program or of its helper files.
- **One piece of the merge waits: the prelude.** It is not designed. The section "The merge" gives the question that holds it.

### The two runs

- **Run 1, climb batch 31, six rungs:** M, K, L, A, V and X. It landed on 17 November.
- **Run 2, climb batch 31b, three rungs:** T, O and E. It starts on run 1's landed tree.
- Climb batch 32 took rungs N and D from this record and landed them on 16 November.

### Run 1, rung by rung

Each program below is shortened to the lines that matter. The planner ran each whole program, except two: the program of rung X, and the `for` form of the program of rung L. The reviewer of this record ran those two, and each stops with the message that is given. The whole programs are in the folder of probe programs. The whole program of rung X is the test `XXXOverloadReturnObjectDomain`.

**M. Methods that a class inherits.**

- What it changes: the code generator. It writes one method once, and it writes the method that calls a body inherited from another component.
- The program that fails today:

      trait Mmx[\T\] mx(self, other: T): T = other end
      trait Tord[\T\] extends { Pord[\T\], Mmx[\T\] }
          mx(self, other: T): T = self end

- Today: it compiles. When it runs, the JVM refuses the class: 'ClassFormatError: Duplicate method name "mx?0"'. The one library has this form in 27 classes.
- After: it runs. The `mx` of `Tord` is the one that is called.
- The second program: `object Rng extends { Other, Ix[\ZZ32\] }`, where `Ix` is a trait of another component and has a method with a body. Today a call of that method on `Rng` ends 'AbstractMethodError'. After: it runs. The library's `DOT` and `SUM` stop at this wall.
- Fork M1: the trait's own declaration replaces the inherited body. The other way keeps the first body that the compiler meets; that is what fails today.
- Fork M2: a method that an interface file declares without `abstract` has a body. The other way treats it as a method without a body, and the call fails as it does today.
- M also runs the test of row 1013 once, and builds nothing for it.

**K. The cast at a `comprises` type.**

- What it changes: the code generator. It writes a cast where a value typed by a trait stands for the one type that the trait lists.
- The program that fails today:

      trait Q comprises { R }
          getter fin(): Boolean = (den(self) > 0)
      end

- Today: it compiles. When it runs: 'VerifyError: Bad type on operand stack ... Type Q is not assignable to R'. The library's rational numbers have this on 23 lines.
- After: it runs and prints `true`.
- Fork K1: the cast is written only where the value's type is not already a subtype. The other way casts at every call, and changes the bytecode of calls that work today.

**L. `label` and `exit`.**

- What it changes: the code generator. It compiles `label` and `exit`.
- The program that fails today:

      find(n: ZZ32): ZZ32 = label found
          for i <- 0#10 do if i = n then exit found with i end end
          -1 end found

- Today: the compile stops: 'Can't compile Label'. The trait `Indexed` of the one library has such a method, and every string and every array extends that trait.
- After: it compiles, and `find(3)` is 3.
- Fork L1: an `exit` out of a parallel loop first joins the tasks that the loop started. Then the block of the label ends with the value. This follows your decision P-175. The other way stops the other tasks at once.
- Fork L2 has two parts. The first: L does not repair a class that the code generator writes twice for one function expression (row 315). Only the one library shows that defect, so no test can fail first. The second: an `exit` out of an `atomic` block keeps the writes of the block, by the specification. The compiled code that ends a transaction is not in this rung. So L writes the case as a test. If the test fails, it is an expected-failure test with a new row.

**A. `atomic` as an expression, and a mutable field.**

- What it changes: the code generator. It compiles `atomic` before an expression. It keeps a `var` field where a transaction can see it.
- The program that fails today:

      object OneShot(var canTryIt: Boolean)
          tryOnce(): Boolean = atomic if canTryIt then canTryIt := false; true else false end
      end

- Today: the compile stops: 'Can't compile AtomicExpr'. And 40,000 additions to a `var` field inside `atomic`, at four threads, gave 36,374 and 36,931 in two runs today.
- After: it compiles, exactly one caller wins, and the sum is 40,000.
- Fork A1: a `var` field is kept in a cell, as a `var` at the top of a program is. A cell is a small object that holds one value that can change. A transaction records each cell that it reads or writes. So each `var` field costs one more object, and one more step at each read. The other way keeps the value in the object itself, and the transaction records the object and the field. Neither microGPT program declares a `var` field, and neither of their helper files does.
- Fork B2: the two new tests join the tests that the gate runs three times at four threads.

**V. Two repairs of walk, before the merge.**

- What it changes: the interpreter. Two defects stand today at `NN32` and `RR32`, which are value objects. The merge brings them to the five types that every program uses. So they are repaired first.
- The first program that fails today:

      trait Holds[\S extends Number\]
          held[\T extends S\](): Empty[\T\] = Empty[\T\]() end
      object Holder[\S extends Number\]() extends Holds[\S\] end

- Today: `Holder[\RR32\]().held()` stops walk: 'non-value subtype of value type RR32'. After: it runs.
- The second program:

      pickFirst[\T extends Number\](a: T, b: T): T = a
      pickFirst(a: NN32, b: NN32): String = "plain"

- Today: walk loads this pair and prints `plain`. The pair is not valid by the Return Type Rule of the specification (the chapter on overloading, "Declarations with Static Parameters"). The rule: where one declaration is more specific than another, its result type must be a subtype of the result type of each instance of the other that takes the same arguments. Here the second declaration is more specific, and its result is not an `NN32`. After: walk refuses it when the program loads: 'fails the Return Type Rule'. This refusal is the one change of run 1 that stops a program that runs today. The valid pair, with the result `NN32`, loads. Today walk refuses the valid pair at `ZZ64`. Before the merge, `ZZ64` is a trait with one object below it. The pair is valid there only because the trait lists that one object. The review of this record gives the detail (`climb-batch-31-review.md`, finding B1).
- Fork V1: the internal type that walk makes for a type parameter is not a declared type, so the check of value types does not refuse it. The other way makes that internal type a value type when its bound is one.
- Fork V2: one step repairs both halves of the load check: the pair that is not valid and loads, and the valid pair that is refused. The other way repairs only the first, and walk would then refuse valid pairs over a program's own objects.
- Fork V3: V also writes a test that an earlier batch owes. Under walk, a generic function that is returned at a declared function type stays generic. I ran it today: the call runs at a size that the type does not allow. The compiled path refuses that call. It is ledger row 1036, filed today. V writes the expected-failure test and one sentence of the specification. It builds no repair: walk reads no declared return type at all today (row 387).
- Fork V4: in run 1, walk still refuses the valid pair at `ZZ64`, and its test stays an expected-failure test. Rung O of run 2 makes `ZZ64` an object. Then the pair is valid by the plain rule, and O makes the test a normal test. The other way teaches the check of walk tonight to read the list of types that a trait gives. The coordinator decided this fork after the review of this record.

**X. The checker's rule for a generic declaration beside a plain one.**

- What it changes: the checker. It accepts a valid pair that it refuses today.
- The program that fails today:

      object Circle end
      ident[\T\](x: T): T = x
      ident(x: Circle): Circle = x

- Today: the compile stops: 'the return type of Circle->Circle ...'. Today the number types of the prelude are traits, so they do not meet this. After the merge they are objects, and every such pair over `ZZ64` or `RR64` would be refused.
- After: it compiles, and each call runs the more specific declaration.
- Fork X1: the rule compares only the instances of the generic declaration that can hold the plain one's argument. This is the rule of the team's paper. The other way has no source.

### Run 2, rung by rung

Run 1 landed at 04:26 UTC on 17 November. A reviewer read the three sections of run 2 again on the landed tree that morning. He ran each program below once, on the code that run 2 starts from. Each message below is from those runs. Each program is shortened to the lines that matter.

You wrote at about 06:40 UTC on 17 November: "You don't need to ask me about this before the run starts. You had defaults from the planning phase. And when they land, I'll review them. Don't delay the launch of the batch. Start it with the original planner defaults." So every fork of run 2 takes the default of the planner. Forks O3 and O4 are among them. They are items 518 and 519 of your review queue.

**T. A method over a pair of indices.**

- What it changes: the code generator. Today a compiled method that takes a pair gets the two elements as two JVM parameters. A method of a generic trait over a type parameter gets one value. Where the type parameter is a pair, the two forms do not meet. T makes them meet.
- The program that fails today:

      trait Arr[\E, I\] get(i: I): E end
      object A2 extends Arr[\ZZ32, (ZZ32, ZZ32)\]
          get(t: (ZZ32, ZZ32)): ZZ32 = 7 end

- Today: it compiles. When it runs: 'VerifyError: Bad type on operand stack ... Type A2 is not assignable to FZZ32'. This is the wall of every matrix: `m[i,j]` on the one library.
- After: it runs and gives 7.
- Two more programs fail for the same cause, and T repairs them:
  - A generic method that takes a pair, `Box[\ZZ32\](1).first[\ZZ32\]((2, 3))`. Today it compiles, and the run ends 'ClassCastException' (row 832).
  - A postfix operator on a pair, `opr (x:(ZZ32,ZZ32))! : ZZ32`. Today the compile stops: 'Error trying to close method scope' (row 819). The one library has four such operators on ranges.
- Fork T1. Default: a pair is still passed as two JVM parameters, and a small bridge method joins the two forms. A bridge method is a method that only calls another method with the arguments in the other form. The other way passes a pair as one object everywhere. That changes every compiled method that takes a tuple.
- T is in run 2 because M and T both edit the code that writes forwarders. A forwarder is a method that calls a body that a class inherits.

**O. The merge, in the one library and in walk.**

- What it changes: the one library and the interpreter. Each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` is one value object. `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` are gone.
- The program that fails today:

      object Mine extends ZZ32
          asFloat(self): RR64 = 0.0
      end

- Today: walk loads it, and a program with this object prints. But a `ZZ32` value is a JVM `int`, and `Mine` is not.
- After: walk refuses it when the program loads: 'Attempt to extend object type ZZ32'.
- What a program sees differently after O. There are four things:
  - A program's object cannot extend one of the five types. That is the purpose.
  - An arm `typecase x of Int => ...` takes the number 3 today. `Int` is an internal name. After the merge the name is gone, and the arm takes every value, with no message. That is fork O4.
  - A generic declaration beside a plain declaration over one of the five types. Walk now reads such a pair by the Return Type Rule, as rung V built it for object types. The valid pair `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64` is refused today, 'fails the Return Type Rule', and loads after.
  - A plain declaration that writes no return type, such as `pick(a: ZZ64) = 2`, beside a generic `pick`. Walk refuses that pair today. After the merge walk loads it and does not judge it, as it does for every object type today (row 1044).
- One test of the rung cannot fail first. It checks that each of the five types still behaves as before: `x asif ZZ32`, the name that a value prints for its type, and the `typecase` arms at the five names. All of that is true today. The test is a guard. The tests that fail first are the refusal of `Mine` and the valid pair at `ZZ64`.
- The forks O1 to O7 are in the section "The merge" below, each with its default and the other way.
- O is in run 2 because it needs the two repairs of rung V.

**E. A numeral at the end of a block.**

- What it changes: the checker or the code generator. The rung first finds which of the two.
- The program that fails today:

      four(): ZZ32 = do
          k: ZZ32 = 3
          4 end

- Today: it compiles. When it runs: 'NoClassDefFoundError: fortress/CompilerBuiltin$v'. A block that ends in `-4`, in `4.5` at `RR64`, or in a pair with a numeral fails in the same way.
- After: it runs and gives 4.
- One form fails in another way today. A block that ends in `if c then 1 else 2 end` stops the compile: 'Error trying to close method scope'. That is an older defect (row 340). E repairs it only if the same repair reaches it. If not, E writes it as an expected-failure test.
- E also runs four tests of related defects once, and builds nothing more for them: a pair of names bound to an `if` (row 1031), a numeral as the value of an `atomic` expression (row 1043, two tests), and a numeral at the end of a `label` block (row 340). Rungs A and L of run 1 left the last three.
- Fork E1. Default: the repair goes where the cause is. If the cause is in the code generator inside a method that rung T edits, E reports it and does not edit there. The other way lets E and T edit one method in one run.
- Fork E2. E also writes a test that an earlier batch owes: `u = 0` and `u =/= 0` for a zero `u` of `NN32`, `NN64` and `RR32`, compiled. The record of 16 November said that five of the six cases pass. That was not correct. The reviewer ran them on 17 November:
  - At `NN32` and at `NN64`, all four cases pass.
  - `c =/= 0` for `c: RR32` is refused: 'Could not check call to operator NE'. The prelude's `RR32` has no `=/=`.
  - `c = 0` for `c: RR32` compiles. When it runs, it ends 'StackOverflowError'. The prelude's `RR32` has no `=` of its own, and the two general declarations that take its place call each other.
  - Under walk all six cases give the correct answer.
  - Default: the prelude is not changed (your decision P-37). E writes the four cases as a test, the refusal as a test, and the stack overflow as an expected-failure test with a new row. E corrects one sentence of the specification, which says that both paths answer at `RR32`.
  - The other way adds `=` and `=/=` to the `RR32` of the prelude. Then both paths give the same answer before the switch-over.
- E is in run 2 because its repair may be at a returned value, which rung K edits in run 1.

### The merge

Your decision P-178 asks for the merge on both paths before the switch-over.

**The one library and walk: it runs, as rung O.** A probe built it on 13 November in a scratch tree. The two measures of the checker stayed 0. Walk's suite passed, but for the two defects that rung V repairs. Both microGPT quick checks passed 7 of 7. No model line changed. The probe left five questions. They are review-queue items 516 to 520. Each is decided at a default:

- **Fork O1 (item 516). Where the five types live.** Default: they stay in `FortressLibrary`, and walk gets a table of the five names. This is what the probe built. The other way moves them to `FortressBuiltin`, beside `NN32` and `RR32`. That moves about 620 lines and takes the five types out of the interface file `FortressLibrary`. It can be done later.
- **Fork O2 (item 517). The two repairs of walk first.** Default: yes. They are rung V of run 1. The other way merges first and records the two defects. Then walk loads pairs that are not valid at the types that every program uses.
- **Fork O3 (item 518). `round` of an `RR64`.** Default: it stays a `ZZ64`, as it runs today. Your decision P-68 makes `round`, `truncate` and the brackets a `ZZ` together, in one library rung after the switch-over. The other way does one part of that rung now.
- **Fork O4 (item 519). A `typecase` arm at a removed name.** After the merge, an arm `Int => ...` takes every value, with no message. That is an old defect: an arm at a name that no declaration defines takes every value (row 959). Default: the merge does not wait for it. One test of the tree names such arms, and O changes it. The other way repairs row 959 first, in one more rung on both paths. Row 959 is second in the list for the batch after.
- **Fork O5 (item 520). Row 542.** Default: it is not a condition of the merge in the one library. It is repaired now all the same, as rung X of run 1, because the prelude's half and the switch-over both need it.
- **Fork O6. The Java classes of the five old objects.** Default: O renames them to the types' names and deletes their dead parts, about 2,000 lines that nothing calls. The other way keeps the old classes and adds four small ones, as the probe did.
- **Fork O7. The bodies of `trait RR64`.** 56 bodies of the trait only call the object's body. Default: they go, and the object's bodies stay. One construct ran them: `x asif RR64`. After the merge that construct gives the value itself. The other way keeps the 56 bodies in the object, where nothing calls them.

**The prelude: it waits.** Your decision says that the prelude takes the same form. No design on record says what the code generator makes of a number type that is an object in the prelude. I made the smallest change in a scratch tree: `value object ZZ32` in place of `trait ZZ32`.

- The prelude compiles.
- The checker then refuses `object MyNum extends ZZ32`: 'Invalid type in extends clause: ZZ32'. That is the answer that your decision asks for. Today that program compiles and dies when it runs (row 866).
- But every compiled program then dies when it starts: 'IncompatibleClassChangeError: class FZZ32 can not implement fortress.CompilerBuiltin$ZZ32, because it is not an interface'.
- The cause: a Java class written by hand, `FZZ32`, holds each `ZZ32` value. It extends a class that the code generator writes only for a trait.

So the prelude's half is work in the code generator, and there are two ways:

- **Way (a).** The code generator writes for these number objects the same classes that it writes for a trait today. This is small. It goes when the prelude goes.
- **Way (b).** The code generator learns that a value object holds a JVM `int`, `long` or `double`. The switch-over needs this in any case. The review of 13 November on the Java classes that hold built-in values estimated about three rungs.

**The question that holds it: which way.** Neither way has a probe, so I could not write a rung with a size. My recommendation: a probe of way (a) of about one hour, then one rung. With it goes a second point: in the prelude, `NN32` and `RR32` are traits too. They become value objects in the same rung. This is fork H2. It is a new item for your review queue.

### What the offered rows became

The review of climb batch 32 offered rows to this batch. Four more rows were filed after it.

- **Rows 1014 and 1030,** a numeral at the end of a block: rung E.
- **Row 1031,** a pair of names bound to an `if` with pairs: E runs its test once and builds nothing more.
- **Row 1013,** a method of a generic trait used as a value: M runs its test once and builds nothing more.
- **Rows 1028 and 1029,** two gaps of the checker at variable declarations: they wait. They are not on the path to the switch-over. They are in the list for the batch after.
- **Row 1032,** an object parameter without a type: it waits for your answer to review-queue item 552.
- **Rows 1033 and 1034,** commands of the Working Draft that the tree does not have: no work. A new deliverable needs your go.
- **Row 1035,** a function declared in an interface file as `echo: String -> String`: it waits for the batch after.
- **The test of `u = 0`,** routed from climb batch 32: rung E, with one finding, above.
- **Walk at a declared function type,** routed from climb batch 32: I ran it, filed row 1036, and gave the test to rung V.

### The measure

The measure is the number of declarations of the one library that the code generator refuses.

- **Before: 24, of 8 kinds.** Measured today on the landed tree. Climb batch 32 did not change it.
- **After run 1: 19 to 21.** L takes off the 4 of `label`. A takes off the 1 of the `atomic` expression. Two of the four declarations with `label` have a second wall behind the first. So the number is 19 if both pass that wall, and 21 if neither does.
- **After run 2: 15 to 17.** T takes off the 4 range operators over pairs.
- **What stays:** functions with a variable number of arguments 7, a missing type environment 4, a class written twice 2, and 2 single ones.
- M, K, V, X, O and E do not move this number. Their measure is their tests.
- **The merge's own measure:** the library names the five old objects on 54 lines today. After rung O: 0.
- The two measures of the checker on the one library stay 0.

### What the batch leaves out

- **The prelude's half of the merge.** It is not designed (above).
- **Everything that only the switch-over shows:** the Java classes that carry `Boolean`, `Char` and `String`, and five smaller walls. They wait for your decision on those classes (review-queue item 513) and on the order of the remaining work.
- **Functions with a variable number of arguments (row 624).** The prelude has no array type, so a test of the repair needs the one library.
- **A class written twice for one function expression (row 315).** Only the one library shows it.
- **Row 959,** the `typecase` arm at an unknown name: fork O4.
- **The checker's smaller gaps:** rows 1005, 1007, 1009, 1010, 1012, 1015, 1028 and 1029. None is a wall on the path.
- **`tryatomic` and the parser's leftovers for numerals:** behind the first compiled matrix.
- **Your decisions on arrays (P-85) and on unboxed numbers (P-17, P-84).**

### For the batch after, in this order

1. The prelude's half of the merge: the probe of way (a), then its rung.
2. Row 959: an arm at a name that no declaration defines is refused.
3. The missing type environment (rows 812 and 822): 4 of the refused declarations, the one for `List` among them.
4. A method call on a value of two types at once (row 540), and row 818, in the code that T leaves.
5. A stable order of the code generator's output (fork S; row 996).
6. The checker's smaller gaps, above.
7. Row 1035, and row 571 if rung M leaves it open.
8. Functions with a variable number of arguments, and the class written twice, when a program compiles against the one library.

### Cost and time

Run 1's agents ran on Fable at medium effort. Run 2's workers and its other roles run on Opus. Fable runs only a judge's second ruling.

- **Run 1: about 4.3 million tokens written, between 3.6 and 5.4 million. About 5 hours and a half.** Six workers write about 2.0 million, six skeptics about 1.3 million, and the fixed roles about 1.0 million.
- **Run 1 as it ran: 5.08 million tokens written, in 4 hours and 23 minutes.** The six workers wrote 1.75 million, the skeptics 1.65 million, and the fixed roles 0.90 million. Two rulings of a judge, two repairs and a second gate wrote 0.77 million. The plan had no reserve for them. They are the whole excess.
- **Run 2: about 3.0 million tokens written without a ruling, and about 3.8 million with the reserve. The range is 2.5 to 4.3 million. About 3 hours, and about 3 hours and three quarters with the reserve.** The three workers write about 1.1 million: O about 0.45, T about 0.35, E about 0.30. The three skeptics write about 0.8 million. The fixed roles write about 0.9 million, as in run 1. The reserve is 0.8 million and 45 minutes: one ruling on the review with its repair, and one ruling on the gate with its repair and a second gate. The estimate was made again on 17 November from run 1's figures. Rung O is the largest of the nine.
- The evidence: climb batch 32 had seven rungs. It wrote 5.0 million tokens in 6 hours and 10 minutes, against a plan of 6.2 million. That is 0.71 million for each rung. Climb batch 30 had three rungs and wrote 2.9 million.
- **The disk.** The script stops a run under 1.5 G for each rung plus 4 G. Run 1 needs 13 G. Run 2 needs 8.5 G. Free on the morning of 17 November, with run 2's base build in place: 13.8 G.

### Your review list from this record

- The 27 forks of section 3. Each took its default. One is consequential by the rule: fork H2, the way for the prelude's half of the merge. Its default builds nothing, and it is in no run.
- The new item: the way for the prelude's half of the merge (fork H2).
- Items 516 to 520, each answered at a default by forks O1 to O5.
- Row 1036 and the finding on `=/=` and `=` at `RR32` (fork E2).
- From the check before run 2: the four things that a program sees differently after rung O, and the test of rung O that is a guard.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision on record; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone. On the night of the go the rule of `references/batch.md`, "The go", decides each fork: a fork takes its default and goes on the review list, and a rung is held out only where the default would reverse or bend a decision on record or change a model line.

### The consequential fork

None in a rung that runs. **Fork H2,** the way in which the compiler's prelude takes the form of P-178, chooses among ways that the record does not settle, and neither way has a probe: the piece that needs it is in no run of this record (section 2, "The merge"; section 5, "The probes of 2026-11-16"). **Fork W** of the record as first drafted moved with rung N to climb batch 32 and landed there at (a).

### Forks the batch takes

Of the forks below only H2 (item 5) is consequential, and its default builds nothing. Each other fork builds within a decision on record or chooses where the record leaves an implementation open, and each can be undone.

1. **B1. One record, two runs.** Run 1 is M, K, L, A, V and X; run 2 is T, O and E on run 1's landed tree. **Default: so.** Way not taken: one run of nine rungs, in which M and T would edit `CodeGen.generateForwardingFor` and `dumpMethodChaining` together, O would be built without V's two repairs, and E could meet K at a returned value. The reason: `references/batch.md`, "The go".
2. **B2. A's two compiled tests join the atomic runs.** **Default: `AtomicExprCompiled` and `AtomicFieldCompiled`, three runs each at four threads.** The reason: each is a test of a race.
3. **B3. Of the rows that climb batch 32's review offered, and rows 1032 to 1035, four are built and the others wait.** Rows 1014 and 1030 are rung E; rows 1031 and 1013 are tried by a run, in E and in M; rows 1028, 1029, 1005, 1007, 1009, 1010, 1012, 1015 and 1035 wait for the batch after; row 1032 waits for review-queue item 552; rows 1033 and 1034 are no work of a batch. **Default: so.** Way not taken: a checker rung for rows 1028 and 1029 in run 1, about 0.7M, for two gaps that are no wall on the path to the switch-over.
4. **H1. Varargs is left out.** **Default: so; first rung once a program compiles against the one library.** Way not taken: a rung that compiles only a declaration whose body does not read the parameter, which no line of the library has. The reason: PROBES, section 2.
5. **H2. The prelude's half of the merge is in no run.** P-178 and P-37's exception ask that the prelude's number types take the form of a `value object` before the switch-over. The declaration alone compiles and then stops every compiled program, since the hand-written run-time class of each type extends a class that the code generator writes only for a trait (PROBES, section 8). **Default: it waits for a probe of the smaller way, in which the code generator writes for these objects what it writes for a trait today, and is then one rung; `NN32` and `RR32` of the prelude, which are traits there, go with it.** Way not taken: a rung tonight without a probe; or the larger way, a value object with a JVM payload in the code generator, which the switch-over needs and the carriers' review sized at about three rungs. The one library's half does not wait for it: each half brings its own path to the decision's answer, and neither makes a difference between the paths that the tree does not have today.
6. **S. The stable order of the code generator's output is not a rung of this batch.** **Default: so; M's choice is made by rule and shown under two hash modes; the order's own rung is in the batch after.** Way not taken: one more rung in run 1, which would edit the loop that M repairs and `OverloadSet`'s order. What breaks without it: jars of two compiles cannot be compared byte for byte; no test is known to pass or fail by the order once M lands.
7. **M1. A trait's own declaration replaces an inherited body at the same parameter types.** The class's method forwards to the trait's own body, and no second method is written. **Default: so.** The reason: the specification's method declarations; P-47 relies on it; walk runs the trait's own.
8. **M2. A method that an api declares without `abstract` has a body in its component,** so an object that inherits it gets a forwarder to the trait's class. **Default: so.** The reason: with the trait first in the `extends` clause the same call runs today.
9. **K1. The cast is emitted only where the value's static type is not a subtype of the declared type by the `extends` clauses,** so a call that verifies today keeps its bytecode. **Default: so.**
10. **L1. An `exit` leaves through the loop's body as an abrupt completion that names its label,** each evaluation of a label block having its own identity; a parallel loop joins the arms that it forked first. **Default: so.** The reason: walk's `forLabel` and `forExit`; P-175.
11. **L2. The closure class written twice (row 315) is left out.** **Default: so; it waits with varargs for a program compiled against the one library.** Way not taken: a repair of the name in rung L with the measure as its only check. The reason: the row's two programs pass, the library's form cannot be written under the prelude, and no test can fail first (`climb-batch-31-review.md`, B1). An `exit` out of an `atomic` block is rung L's to test: the specification retains the block's writes (`Specification/basic/expressions/atomic.tex:60-63`), the compiled handler discards them for every abrupt completion, and the handler's code is no rung's of this run; so L builds it if its own files reach it, and else leaves an expected-failure test and a new row.
12. **A1. A `var` field is kept in a cell, as a top-level `var` is;** a `var` value parameter too. **Default: so.** Way not taken: a location keyed by the object and the field. The reason: the code's own way for a mutable variable. The one library's `var` fields are of both forms: `OneShot(var canTryIt: Boolean)` and the generic `Box[\T\](var val: T)` as value parameters, and `String.fss`'s as fields of an object's body; a cell holds any of them.
13. **V1. The symbolic type that walk makes for a type parameter is no declared type, and the check of value types passes it.** **Default: so.** Way not taken: the symbolic type is made a value type where its bound is one, which changes what every later check of that type reads. The reason: the probe passed its suite so, by one line.
14. **V2. Walk's load check for a generic declaration beside a plain one is repaired in both directions in one step:** the invalid pair that loads at an object type (row 998), and the valid pair that is refused where the plain result is compared with the type parameter itself (row 550). **Default: so.** Way not taken: row 998 alone, after which walk would refuse at load every valid pair of that kind over a program's own object, which loads today. Two plain parameter lists that differ at an object type (row 697) are not in the step: its repair alone refuses pairs of the library (row 785).
15. **V3. Walk gets no repair for a generic function at a declared arrow return type or at a field (row 1036).** **Default: an expected-failure test, the row and the specification's sentence; no code.** Way not taken: `Fcn.received` at a field's and a top-level variable's cell, with row 1019, and a declared return type left out. The reason: walk applies no declared return type (row 387), so the repair is half of a design that no batch holds.
16. **V4. The valid pair at `ZZ64` (row 550) stays an expected failure in run 1.** On run 1's tree `ZZ64` is a trait that comprises the one object `Long`, and the pair is valid there only by that clause, read at values (P-60). **Default: V's check does not read a `comprises` clause; run 2's rung O makes `ZZ64` an object and promotes `tests/XXXGenericBesidePlainReturnParam.fss`.** Way not taken: V's check reads a `comprises` clause that lists one object as that object, and V promotes the test in run 1. The reason: no new reading in walk's load check on the night of the go; the coordinator decided it after the check of this record (`climb-batch-31-review.md`, B1).
17. **X1. The checker's Return Type Rule compares only the instances of the generic declaration whose domain meets the more specific declaration's domain in a type that is not `Bottom`.** **Default: so.** The reason: the team's paper, `Papers/Types/overloading-check.tick:180`; P-45.
18. **T1. A tuple-typed parameter keeps today's convention, its elements as separate JVM parameters, and a bridge method joins the instantiated signature to it.** **Default: so, if the worker's reading of row 832 allows it; else the worker reports the other way before building it.** Way not taken: one boxed tuple everywhere, which changes every compiled method with a tuple parameter. The reason: the compiled tests run on today's convention.
19. **O1. The five types stay in the component `FortressLibrary`, and walk has a table of the five names whose objects have native values** (review-queue item 516). **Default: so, as the probe built it.** Way not taken: the five move into `FortressBuiltin` beside `NN32` and `RR32`, with six private functions and the five types' api, about 620 lines of objects and 50 of helpers; it keeps walk's one rule, that a native component's objects are native, and can be done later.
20. **O2. Walk's two repairs come before the merge** (item 517). **Default: so; they are rung V of run 1, and O is written on run 1's landed tree.** Way not taken: merge first and record the two.
21. **O3. `round` of an `RR64` stays one declaration at `ZZ64`, the body that runs today** (item 518; row 1000). **Default: so.** Way not taken: `ZZ`, as the trait declares, which changes the type that `round` answers under walk. The reason: P-68 gives `round`, `truncate` and the brackets to one library rung after the switch-over, which first counts the tests whose output changes; the other way would do part of that rung without its count.
22. **O4. The merge does not wait for row 959** (item 519). After it, a `typecase` arm at `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` names no declared type and takes every value, with no message, as any undefined name does today on both paths. **Default: so; the one test that names such arms, `tests/NumberPrintTest.fss`, is changed in rung O, and row 959 is second in the list for the batch after.** Way not taken: row 959 first, one more rung in the parser's and the checker's files and in walk.
23. **O5. Row 542 is not a condition of the merge in the one library, and it is repaired in run 1 as rung X** (item 520). **Default: so.** The reason: the one library holds no such pair, and the compiled path does not read the one library before the switch-over; the prelude's half and the switch-over both need the repair.
24. **O6. The five constructor classes of `interpreter/glue/prim/` take the types' names, and their dead nested natives are deleted.** **Default: so.** Way not taken: the probe's four new classes that extend the old ones, which keeps about 2,000 dead lines and the old names in walk.
25. **O7. The bodies of `trait RR64` that go through `asFloat(self)` go with the merge.** **Default: so.** The reason: each calls the object's own body, and only `x asif RR64` ran one; after the merge that construct is the identity (the probe's note, "The bodies of `trait RR64`").
26. **E1. The repair of rows 1014 and 1030 goes where the reference to the coercion is written,** the checker's conversion of a block's last expression or the code generator's reference to a function as a value. **Default: so; the worker finds the place first, and keeps out of the members that rung T names.**
27. **E2. `c =/= 0` for `c: RR32`, which the prelude refuses, and `c = 0` for `c: RR32`, which compiles and overflows the stack when it runs, are recorded and not repaired.** The second case was found on 2026-11-17 by the check before run 2's launch; the record of 2026-11-16 gave it as passing. **Default: a compiled test of the refusal, an expected-failure test of the overflow with a new row, and the Effect's sentence narrowed.** Way not taken: `=` and `=/=` added to the prelude's `RR32` or to its `Equality`. The reason: P-37 adds no declaration to the prelude, and the sentence in the specification is the thing that is wrong.

Forks N1 to N4, D1, D2 and W moved with their rungs to `CLIMB-BATCH-32.md`, section 3.

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code that the rung rests on. In run 1's sections a line citation is of `c0c35b4f9e`, the landed tree of climb batch 32. In run 2's sections T, O and E a line citation is of `7858d0e97b`, run 1's landed tree, whose code is `main`'s at run 2's base: the three sections were read again on that tree on 2026-11-17, before run 2's launch. The record's forks are section 3's. The reproducers are in `explorations/compile-ladder/plan-31/probes/planner/`; a test is written new in the test folders, and no file is moved from there.

### M. The methods that a trait's or an object's class inherits: one method written once where a generic trait gives a body to a method that it also inherits with a body, and a forwarder for a body inherited through an api's trait that is not first, a generic method's among them (rows 990, 732 and 571)

**The mission.** A class inherits through the JVM only from the first trait that its declaration extends. For every other trait the code generator writes forwarders, methods that call the inherited bodies (`CodeGen.dumpMethodChaining`). The rehearsal of the switch-over met two defects of that step on the one library: 244 methods written twice into 27 classes, each a `ClassFormatError` at load (its W6), and no body for `Indexed`'s `map` on a range object, the wall of the library's `DOT` and `SUM` (its W16). Both reproduce under the prelude in a few lines (`explorations/compile-ladder/plan-31/PROBES.md`, section 2). You repair both.

**The decisions this rung builds.** P-47, whose library shape is the first defect's; P-149 and P-147, which stay. Section 3's forks M1 and M2.

**What you build, in order.**
1. **One method once** (fork M1; row 990). Where a trait declares a method with a body at the parameter types of a body that it inherits, at the instance that its `extends` clause gives, its class holds one method, which runs the trait's own body. The choice does not depend on the order in which the methods are gathered: the rehearsal's first hack kept the first copy and failed after an unrelated rebuild. Test first, `ProjectFortress/compiler_tests/TraitOwnMethodBesideInheritedCompiled.test` (`compile`, `link`, `run`), from `PDupMethod3.fss`: it prints 2, -1, true, false, as walk does; add the library's own shape, an operator declared in three levels, as `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below them. Seen failing on the base: 'ClassFormatError: Duplicate method name "mx?0"'.
2. **A body inherited through an api's trait** (fork M2; row 732). Test first, `compiler_tests/ApiTraitMethodNotFirstCompiled.test`, with its api and component beside it as `VarargsExportMethod` has: from `GenApi` and `PGenUse4.fss`, a plain method and a generic method of an api's trait that is second in an object's `extends` clause, each called on the object and through a variable typed by the trait; and the same with the trait reached through a trait of the program. Seen failing on the base: 'AbstractMethodError … does not define or inherit an implementation'.
3. **Row 571's test,** `XXXFunctionalMethodMeetNarrowedSelfNotFirst`: promote it if your repair reaches it; else report what remains.
4. **The kin, by a run:** `compiler_tests/XXXFunctionalMethodValueGenericTraitCompiled` (row 1013), a functional method of a generic trait named as a value. Promote it if it passes, and report if it does not; build nothing more for it.
5. **The two hash modes.** Compile and run step 1's and step 2's programs once more with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` added to the compile's `JAVA_FLAGS`. Report both outputs. It is a run to report, not a gated test.
6. **The whole compiled suite once,** `ant testFast`: your edit reaches every compiled trait and object.

**The stages.** None. List your files (`STAGE_BLIND`). Run `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` once on your final tree and report its exit.

**Rows.** Close 990 and 732; 571 closed, or a note on what remains; a note on 1013 only if its test changed.

**Specification.** No Effect of Appendix I and no note names these rows. List each sentence your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java` from `dumpTraitDecls` through `dumpOverloadedMethodChaining` and what follows it up to `genParallelExprs` (`:769-1690`); `scala_src/useful/STypesUtil.scala`, the helpers that list a type's methods; your tests. Not: the rest of `CodeGen.java`; `compiler/OverloadSet.java`; `scala_src/overloading/`, which is rung X's; the prelude; the one library; microGPT.

**Reserved points.** A model line: none. A change of which declaration a dispatch method reaches. A change to the one library's text.

**Overlaps by file.** L, A and K edit `CodeGen.java` too: "The rule the rungs keep".

### K. The cast where a value typed by a trait stands for the type that the trait's `comprises` clause lists: the checker accepts it, and the compiled code now casts (rows 991 and 695)

**The mission.** A `comprises` clause says that every value of its trait is a value of a listed type (P-60). So the checker lets a value typed by `trait Q comprises { R }` stand where `R` is expected, and in a self-typed trait it lets `self` be returned as the implementing type (P-146). The code generator emits no cast at those places, and the JVM's verifier refuses the class. Against the one library that stops every program: `trait QQ comprises { Ratio }` passes `self` to `numerator` and `denominator` on 23 lines, and the library's static initializer loads `QQ`'s class (the rehearsal's W7). The rehearsal ran with the verifier off, so nobody knows how many other methods it refuses.

**The decisions this rung builds.** P-60, P-146. Section 3's fork K1.

**What you build, in order.**
1. **The cast** (fork K1; row 991). Test first, `ProjectFortress/compiler_tests/ComprisesValueAtListedTypeCompiled.test` (`compile`, `link`, `run`), from `PComprisesCast.fss`: a trait's value passed as a function's argument at the listed object type, as a method's argument, returned at that type, bound to a variable of that type; a trait that lists two types, with a `typecase` before the use. Seen failing on the base: 'VerifyError: Bad type on operand stack … is not assignable to'.
2. **The returned `self`** (row 695). `compiler_tests/XXXSelfTypeReturnSelfRun` promoted, if the same cast reaches a returned value.
3. **The kin, by a run each:** `compiler_tests/XXXNatOpenRun` (row 307) and row 815's `num(R)`. Promote what passes, and report what does not; build nothing more for them.
4. **The whole compiled suite once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the distance stage's shadow patch once on your final tree, as rung M's section gives it, and report its exit.

**Rows.** Close 991; 695 if step 2 lands; a note on 307 or 815 only if a test of theirs changed.

**Specification.** `Specification/appendices/changes.tex:4434` names row 695: bring its sentence in line if the row closes. `changes.tex:1734` and `Specification/basic/inference.tex:509` name row 307: leave them unless `XXXNatOpenRun` passes.

**Files.** `compiler/codegen/CodeGen.java`: `conditionallyCastParameter` (`:7289-7321`) and its callers' arguments to it, the returned value in `generateFunctionalBody`, and a new member put directly above `conditionallyCastParameter`; your tests; the specification's sentence named. Not: `evalArg`'s forking; `dumpMethodChaining`; `forAtomicBlock`; microGPT.

A cast that is needed at a field, whose code is rung A's (`forObjectDeclPrePass`, `VarCodeGen`), or in a forwarder, whose code is rung M's (`generateForwardingFor`), is reported with its program, not built.

**Reserved points.** A model line: none. A cast at a place that verifies today.

**Overlaps by file.** M, L and A edit `CodeGen.java` too: "The rule the rungs keep".

### L. `label` and `exit` on the compiled path: an `exit` leaves its label's block with its value, also from inside a loop's body (row 81)

**The mission.** A wall on the path of a one-line program against the one library shows under the prelude: the code generator has no case for `label` and `exit` (row 81), and the one library's `Indexed`, above every string and array, holds one in `indexOf`.

**The decisions this rung builds.** P-175, for an `exit` out of a parallel loop. Section 3's forks L1 and L2. The specification's section "Label and Exit" is the standard, and walk's `forLabel` and `forExit` the precedent.

**What you build, in order.**
1. **`label` and `exit`** (fork L1; row 81). Test first, `ProjectFortress/compiler_tests/LabelExitCompiled.test`, printing `PASS` or `FAIL`: `PLabel.fss`'s `exit … with` out of a `while`; an `exit` with no value; an `exit` out of a `for` over a range, the form of `Library/FortressLibrary.fss:2189-2195`, at one thread and at four, with the label's value one of the values that an iteration exits with; a label nested in a label, the inner `exit` naming the outer; a label as a function's whole body with several `exit`s (`Library/String.fss:148-158`); an `exit` inside a `try` with a `catch` of every exception, which does not catch it. Seen failing on the base: 'Can't compile Label'.
2. **An `exit` out of an `atomic` block.** The specification: "If it completes abruptly by exiting to an enclosing label expression, writes within the block are retained and become visible to other threads" (`Specification/basic/expressions/atomic.tex:60-63`). The compiled block's handler takes every abrupt completion and ends the transaction with its writes discarded (`runtimeSystem/BaseTask.java:285-314`), and that code is not yours. Write the case as a test: `atomic do g := 7; exit done end` inside `label done`, `g` read after. If your own files reach the specification's answer, the test is plain and in step 1's file. If not, it is an expected-failure test, `compiler_tests/XXXExitOutOfAtomicCompiled`, with a new row in your `record.md`; build nothing in `forAtomicBlock`, `BaseTask.java` or `Transaction.java`.
3. **The whole compiled suite once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the distance stage's shadow patch once on your final tree, as rung M's section gives it, and report its exit.

**Rows.** Close 81. A new row, `NEW-L-1`, if step 2 leaves an expected failure.

**Specification.** No Effect of Appendix I names this row. List each sentence your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`: new members for the label block and the exit, put directly above `defaultCase` (`:1776`); a run-time class for the exit under `runtimeSystem/` if you need one; your tests. Not: `forFnExpr` and the closures' names (row 315 is not this batch's); `forAtomicBlock`, `forTry`, `genParallelExprs`; `runtimeSystem/BaseTask.java` and `Transaction.java`; microGPT.

**Reserved points.** A model line: none. A change to a class name that a test or the class loader reads.

**Overlaps by file.** M, A and K edit `CodeGen.java` too: "The rule the rungs keep".

### A. `atomic` as an expression, and a mutable field inside a transaction: the form of the one library's `OneShot` (rows 875 and 319)

**The mission.** Climb batch 30 repaired the compiled transaction and the handler of an `atomic` block. Two pieces of its unlaunched second run stand on the switch-over's road, because `Library/OneShotFlag.fss:18` writes both in one line and `List` imports it: the code generator has no case for an `atomic` expression (row 875), and a mutable field is read and written outside the transaction (row 319). You build both on the landed code.

**The decisions this rung builds.** P-169, whose store and slots stay as they are. Section 3's fork A1. Not yours: `tryatomic`, an `atomic` block as a later argument (row 322), plain writes beside a block (row 948).

**What you build, in order.** Each compiled test prints `PASS` or `FAIL`, seen failing first and passing at one thread and at four.
1. **The atomic expression** (row 875). `ProjectFortress/compiler_tests/AtomicExprCompiled.test`: `atomic if … end` over a `var` value parameter, `OneShot`'s form, called from a parallel `for`; exactly one iteration wins; an atomic expression whose value is a number, over a top-level `var`. Seen failing on the base: 'Can't compile AtomicExpr'.
2. **A mutable field** (fork A1; row 319). `compiler_tests/AtomicFieldCompiled.test`, from `PFieldAtomic.fss`, whose `n` is a `var` value parameter: 40,000 `atomic do n := n + 1 end` on it from a parallel `for`, exact; the same on a `var` field of an object's body and on the `var` value parameter of a generic object, the form of `Box[\T\](var val: T)`; a field read twice in one block beside blocks that write it; an immutable field read as before. Seen failing on the base at four threads, for the value parameter: 29,456 and 39,276 of 40,000.
3. **The atomic programs** on your final tree, as the skill's `gate.md` gives them, and the whole compiled suite, since every object's fields pass your code.

**The stages.** None. List your files (`STAGE_BLIND`). Run the distance stage's shadow patch once on your final tree, as rung M's section gives it, and report its exit.

**Rows.** Close 875 and 319.

**Specification.** List each sentence your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`: a new member for the atomic expression, put directly below `forAtomicBlock` (`:1835-1868`), and, in `forObjectDeclPrePass`, the value parameters' declarations (`:4813-4831`, a `FieldVar` each) and the body fields' (`:4850-4862`, a `MutableFieldVar` each); `compiler/codegen/VarCodeGen.java`, `FieldVar` and `MutableFieldVar`; your tests. Not: `forAtomicBlock`'s own body and `forTry`; `dumpMethodChaining`; `runtimeSystem/Transaction.java`; walk; microGPT.

**Reserved points.** A model line: none. A change to an immutable field's code. A change to a plain read or write of a variable outside `atomic`.

**Overlaps by file.** M, L and K edit `CodeGen.java` too: "The rule the rungs keep".

### V. Walk before the merge of the number types: a generic method's type parameter bounded by a value type, and the load check of a generic declaration beside a plain one over an object type (rows 997, 998 and 550)

**The mission.** By the decision on record, each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` becomes one `value object` (P-178); rung O of run 2 makes that change in the one library. A probe made it in a scratch tree and met two defects of walk. Both stand today at `NN32` and `RR32`, which are value objects already, and the merge would bring them to the types that every program uses (`explorations/compile-ladder/plan-31/probes/number-object-merge.md`, obstacles 5 and 6). You repair both under walk, before the merge. You also write one expected-failure test that an earlier landing owes.

**The decisions this rung builds.** P-178, for the reason; P-45, the Return Type Rule at every instance that the argument types allow; P-12, walk has no static types. Section 3's forks V1 to V4.

**What you build, in order.** Each test is a walk test under `ProjectFortress/tests/`, seen failing through the harness first, but for step 2's two guards.
1. **A type parameter bounded by a value type** (fork V1; row 997). Test first, `tests/TraitGenericMethodValueBoundWalk.fss`, from `explorations/compile-ladder/plan-31/probes/planner/P997.fss`: `Holder[\RR32\]().held()` and the same at `NN32`, for `held[\T extends S\]()` in `Holds[\S extends Number\]`, each result's type asserted by a `typecase`, as `tests/TraitGenericMethodInference.fss` asserts it at `ZZ64`. Seen failing on the base: 'non-value subtype of value type RR32'. The repair is in `FTraitOrObject.enforceValueness` (`interpreter/evaluator/types/FTraitOrObject.java:97-104`): the symbolic type that walk makes for a type parameter is not a declared type, and the check does not refuse it. A declared type that is not a value type stays refused below a value type; `tests/XXXNonValueOfValue.fss` is the tree's test of that check: run it after your change.
2. **A generic declaration beside a plain one** (forks V2 and V4; rows 998 and 550). Tests first: a test of the refusal at load, from `P998.fss` in the same folder: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: NN32, b: NN32): String`, 'fails the Return Type Rule', which loads and prints `plain` on the base (row 998); and two guards, which pass on the base through the shortcut and still pass after: the valid pair at `NN32`, `pickFirst(a: NN32, b: NN32): NN32`, which runs the plain declaration for two `NN32` values, and a plain declaration that writes no return type beside a generic one, `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = 2`, which still loads and answers 2 for an `NN32` (row 785's refusal must not reach it). `tests/XXXGenericBesidePlainReturnParam.fss`, the valid pair at `ZZ64` (row 550), stays an expected failure (fork V4): on this tree `ZZ64` is a trait that comprises the one object `Long`, the pair is valid there only because every `ZZ64` value is a `Long` (P-60), and your check does not read a `comprises` clause; run 2's rung O makes `ZZ64` an object and promotes the test. The repair is in the load check of `interpreter/evaluator/values/OverloadedFunction.java`. The shortcut that calls two parameter lists excluding where they differ at an object type (`:511`) does not apply to a generic declaration beside a plain one whose object type lies in the generic one's declared domain. The reading on declared domains (`validOnDeclaredDomains`, `:772`) compares the plain declaration's result with the generic one's at the instances that hold the plain one's domain, as `returnRuleAtEveryInstance` (`:1165`) does for two generic declarations. That reading is the rule only where the plain declaration's parameter type is an object type. The rule compares at every argument type to which the plain declaration applies, and at every instance of the generic one that applies to that argument (`Specification/advanced/overloading.tex:555-559`): below a trait, an argument of a lower type selects a lower instance, as `returnRuleAtEveryInstance`'s comment says. So `tests/XXXGenericBesidePlainReturnRule.fss`, the specification's refused pair at `trait Round` with `object Circle` below it, stays refused: run it with your tests.
3. **The expected failure of row 1036.** `tests/XXXGenericFunctionArrowReturnWalk.fss`, from `PArrowRet.fss` in the same folder, in the form of `tests/XXXGenericFunctionTopLevelVariableWalk.fss`: a generic function returned at a declared arrow return type is called at another size, and the call runs where the rule refuses it. Seen passing as an expected failure. Row 1036's whole new line names it as the reproducer. In the box at `Specification/basic/inference.tex:264-268`, name the declared return type and the field of an object beside the immutable top-level variable. Build nothing in walk for it.
4. **Walk's suite once,** `ant testSystem`: your edit reaches every overloaded name that walk loads.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 997 and 998. A note on row 550: the load check reads a generic declaration beside a plain one over an object type by the rule, and the row's pair at `ZZ64` stays an expected failure until run 2's rung O. Row 1036's whole new line. Not yours: row 697, two plain parameter lists that differ at an object type, with row 785's pairs of the library; the shortcut stays as it is for them.

**Specification.** No Effect of Appendix I names rows 997, 998 or 550. The box of step 3. List each other sentence your change makes false, or none.

**Files.** `interpreter/evaluator/types/FTraitOrObject.java`, `enforceValueness`; `interpreter/evaluator/values/OverloadedFunction.java`, the load check, from the parameter-by-parameter comparison (`:439-540`) through `returnRuleAtEveryInstance`; your tests; the box named. Not: the choice of a declaration at a call and `bestMatchForNumerals` in the same file; the one library; `compiler/` and `scala_src/`; microGPT.

**Reserved points.** A model line: none. A pair of the one library or of an existing test that walk refuses at load after your change and loaded before. A change of which declaration a call runs.

**Overlaps by file.** None with M, K, L, A or X.

### X. The checker's Return Type Rule for a generic declaration beside a plain one whose domain is an object type (row 542)

**The mission.** The compiled checker refuses a valid pair: `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, where `Circle` is an object. The rule of the team's paper accepts it: only the instances whose domain meets the plain declaration's domain count, and below an object type is only the object (row 542). Today the number types of the compiler's prelude are traits, so the refusal does not reach them. By the decision on record each built-in number type becomes one `value object` on both paths before the switch-over (P-178), and then the refusal reaches every such pair over `ZZ32`, `ZZ64` or `RR64`. You repair the rule first.

**The decisions this rung builds.** P-45, the Return Type Rule over declared domains at every instance that the argument types allow; P-178, for the reason; P-148, for your checker edit. Section 3's fork X1.

**What you build, in order.**
1. **The rule** (fork X1; row 542). Test first: `ProjectFortress/compiler_tests/XXXOverloadReturnObjectDomain` promoted: `ident[\T\](x: T): T` beside `ident(x: Circle): Circle` compiles, and each call runs the more specific declaration that takes it. Add the row's second pair, `f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]` with `object Box[\U\]`. Add a compiled test of a refusal: `g[\T\](x: T): T` beside `g(x: Circle): String` stays refused, 'the return type of'. Seen failing on the base: 'the return type of Circle->Circle'. The repair is in `satisfiesReturnTypeRule` (`scala_src/overloading/OverloadingOracle.scala:77-83`) and what it calls in that folder: the instances that it compares are those whose domain meets the more specific declaration's domain in a type that is not `Bottom` (`Papers/Types/overloading-check.tick:180`).
2. **The whole compiled suite once,** `ant testFast`: the rule reads every overloaded name of every compiled test.
3. **The stages and the timing,** once on your final tree: the count stage and the distance stage against climb batch 32's gate (`explorations/compile-ladder/climb-batch-32/gate/`), 0 and 0 with `#crash none`, and P-148's runs.

**Rows.** Close 542. Not yours: row 853, the specificity test that holds by a `Bottom` instance, whose code is in `scala_src/types/TypeSchemaAnalyzer.scala` and `scala_src/useful/STypesUtil.scala`.

**Specification.** `Specification/appendices/changes.tex:3101` names row 542: bring its sentence in line. List each other sentence your change makes false, or none.

**Files.** `scala_src/overloading/OverloadingOracle.scala`, `satisfiesReturnTypeRule` and what it calls in `scala_src/overloading/`; your tests; the specification's sentence named. Not: `scala_src/useful/STypesUtil.scala`, which rung M edits; `scala_src/typechecker/` and `scala_src/types/`; walk; the prelude; the one library; microGPT.

**Reserved points.** A model line: none. A pair of the one library or of an existing test that the checker refuses after your change and accepted before, or accepts and refused before, other than row 542's two. A rise of the checker's count or of the distance.

**Overlaps by file.** None with M, K, L, A or V.

### T. A method whose one parameter is a tuple: an object's body at a tuple type implements its generic trait's method over a type parameter, a generic method takes a tuple, and a postfix operator takes a tuple operand (rows 992, 832 and 819)

**The mission.** The code generator passes a tuple-typed parameter's elements as separate JVM parameters. A generic trait's method over a type parameter takes one value. Where the type parameter is a tuple type, the two do not meet: the object's class fails verification, and with the verifier off no method implements the trait's (row 992). It is the wall of every array of rank 2 and 3 of the one library, `m[i,j]` (the rehearsal's W15, where no hack got past). Rows 832 and 819 are the same confusion at a generic method's call and at a postfix operator's.

**The decisions this rung builds.** P-156. Section 3's fork T1. You build on rung M's landed forwarders: `STypesUtil.allMethodsNotReplaced` now decides which inherited declarations get a forwarder (`CodeGen.java:980`), `hasBodyInItsTrait` (`:1051`) which of them count as bodies, and rung M's one line inside `generateForwardingFor` is `:873`. Rung K's `castToTypeBelow` (`:7436-7459`) casts a single argument where its static type is not below the declared type (`:7417`); whether a `self` among a tuple's elements that your bridge method joins needs that cast is yours to try.

**What you build, in order.**
1. **The trait's method at a tuple type** (fork T1; row 992). Test first, `ProjectFortress/compiler_tests/TupleIndexMethodCompiled.test` (`compile`, `link`, `run`), from `PTupleIndex.fss`: `get` and `offset` over `I` at a pair and at a triple, called from the trait's own body and on the object; a body that destructures its tuple; an indexed assignment's form, a method of `(I, E)`. Seen failing on the base: 'VerifyError … is not assignable to FZZ32'.
2. **A generic dotted method with one tuple parameter** (row 832). Test first, from the row's program: `Box[\ZZ32\](1).first[\ZZ32\]((2, 3))` and `wrap[\(ZZ32,ZZ32)\]((2, 3))`. Seen failing on the base, for the first: it compiles, and the run dies, 'ClassCastException', the method's arrow over `Tuple[\U,U\]` cast to an arrow of three objects.
3. **A postfix operator on a tuple operand** (row 819). Test first, from the row's probe text: `opr (x:(ZZ32,ZZ32))! : ZZ32` and an operator that applies it. Seen failing on the base: the compile stops, 'Error trying to close method scope'.
4. **The whole compiled suite once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the distance stage's shadow patch once on your final tree and report its exit.

**Rows.** Close 992, 832 and 819.

**Specification.** `Specification/appendices/changes.tex:3333` names row 832: bring its sentence in line.

**Files.** `compiler/codegen/CodeGen.java`: `generateForwardingFor` (`:793`), `forMethodInvocation` (`:7071`), `receiverPrependedDomainType` (`:7211`), the operator application's call (`forOpExpr`, `:5531`); `compiler/NamingCzar.java`, the methods' signatures; your tests; the specification's sentence named. Not: `forVarDeclPrePass` (`:6614`), which climb batch 32 landed; the members that write a reference to a function as a value (`forFnRef`, `:4101`, and `forFunctionalRef`, `:4182`), and the checker, which are rung E's; the one library, which is rung O's; microGPT.

**Reserved points.** A model line: none. A change of a compiled method's JVM parameters where no tuple-typed parameter stands.

**Overlaps by file.** `CodeGen.java` with E, only if E's repair is in the code generator: "The rule the rungs keep".

### O. The five number types as value objects in the one library: each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` merged with its one object, and walk's native number objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` removed (rows 1003, 1000 and 551)

**The mission.** The one library declares each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` as a trait that comprises one native object: `Int`, `Long`, `BigNum`, `UnsignedLong` and `Float`. By the decision on record each is one `value object` under its own name, as `NN32` and `RR32` already are, and the five objects leave the library and walk (P-178; row 1003). A probe made the change in a scratch tree: the checker's two measures stayed 0, and walk's suite passed but for two defects of walk, which run 1's rung V has repaired (`explorations/compile-ladder/plan-31/probes/number-object-merge.md`). The probe's patch is beside its note. It was made on an older tree: it is a guide, and you do not apply it as it is. You make the change on the landed tree, in the one library and in walk. The compiler's prelude is not yours: its half of the decision is in no run of this record.

**The decisions this rung builds.** P-178; P-160, a program's own number type extends `Number`; P-167, walk's native objects are no types that a program sees; P-68, which keeps `round` for a library rung after the switch-over; P-87, no line of the model program changes. Section 3's forks O1 to O7.

**What you build, in order.**
1. **The test first.** `ProjectFortress/tests/NumberTypesAreObjectsWalk.fss`, and a test of a refusal at load beside it. The first: for each of the five types, `x asif T` on a value of the type is the value itself; `(3.0 asif RR64) + 17` is 20.0, as `tests/asifTest.fss:102` has it; a `typecase` arm at each of the five names takes its values and no value of another number type; a value's `ilkName` is its type's name. The second, from `explorations/compile-ladder/plan-31/probes/planner/P551.fss` with its own `asFloat`: `object Mine extends ZZ32` is refused at load, 'Attempt to extend object type ZZ32'. Seen failing on the base: the object loads and the program prints `Mine` (row 551). The first test is a guard: each of its assertions holds on the base, where the trait's name is the ilk and `asif` runs the trait's bodies (run on 2026-11-17 on the base build's code), and it must still pass after. The tests that fail first are the refusal, and step 5's promoted test of row 550.
2. **The library's text** (forks O1, O3 and O7). In `Library/FortressLibrary.fss` and `.fsi`, each `trait X ... excludes ... comprises { O }` becomes `value object X`, takes its object's members, and loses its `excludes` and `comprises` clauses, since an object excludes each type that it does not extend. An object's getters stand before its methods. In `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi` the five objects go, and `RR32`'s `opr ^(self, b:Float)` names `RR64`. In `RR64`, the bodies of the trait that go through `asFloat(self)` go, since the object's own bodies are the ones that run; the trait's members for which the object has no body stay; `round(self): ZZ64` stays as the one declaration of `round`, the body that runs today (fork O3); one `^` at `RR64` stays.
3. **Walk's place for the five** (fork O1). The five stay in the component `FortressLibrary`, which is not a native component. Walk is told which five objects of that component have native values: a table of the five names where walk builds an object's environment (`interpreter/evaluator/BuildEnvironments.java`, `forObjectDecl1`), with each constructor registered when it is made (`interpreter/evaluator/BuildNativeEnvironment.java`).
4. **The old names leave walk** (fork O6). The constructor classes `Int.java`, `Long.java`, `Float.java`, `BigNum.java` and `UnsignedLong.java` of `interpreter/glue/prim/` take the types' names, and their nested native classes, which no `builtinPrimitive` string of the library names, are deleted. The lines that served the two names go: the five number entries of `LanguageTypes.OBJECTS` and `numberTraitName` (`interpreter/evaluator/types/LanguageTypes.java:33-37`, `:53`) with its caller (`interpreter/glue/prim/ObjectPrims.java:55`); the lines for the five in `interpreter/glue/StaticNativeApp.java` (`:64`, `:117-120`); the `UnsignedLong` clause of `compiler/BuiltinPrimitiveRewriter.java`.
5. **The tests and comments that name the objects** (fork O4). `tests/NativeHelperFloatCarriedWalk.fss:5-6`: its two bindings declared `Float` name `RR64`. `tests/NumberPrintTest.fss:31` and `:35`: its arms at an object's name take the type's name. The comments and assertion messages that name the five objects, in the walk tests, the compiled tests and `Library/ReflectiveQuickCheck.fss`. `compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.fss` declares its own `UnsignedLong` against the prelude: leave it. `tests/XXXGenericBesidePlainReturnParam.fss`, the valid pair at `ZZ64` (row 550), which run 1 left an expected failure (fork V4): promote it, since `ZZ64` is now an object and the load check that rung V landed takes the pair.
6. **Walk's suite once,** `ant testSystem`, and the library tests of `ant testFast`.
7. **The stages,** once on your final tree: the count stage and the distance stage against run 1's gate (`explorations/compile-ladder/climb-batch-31/gate/`), 0 and 0 with `#crash none`.

**What the merge meets for the first time.** Rung V's reading of a generic declaration beside a plain one acts only where a parameter type is an object type (`interpreter/evaluator/values/OverloadedFunction.java:513-527` and `:792-904`). Your change makes five more types objects, so walk reads each such pair over them, in the one library and in the tests, on its declared domains for the first time; the probe of the merge ran without that reading. Step 6's `ant testSystem` is the first run of the two together. Report each pair that walk refuses at load after your change and loaded before, with the rule that refuses it. A plain declaration that writes no return type beside a generic one moves the other way: over a trait type walk refuses such a pair (row 785), and over an object type it loads it unjudged (row 1044), so `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: ZZ64) = 2` is refused on the base and loads after. Report it under what a program sees differently; build nothing for it.

**Rows.** Read each with `ledger.py show N` first. Row 1003's whole new line: the one library and walk have the form, and the compiler's prelude does not. Row 1000's whole new line: one declaration of `round` stands at `ZZ64`, and the type that the decision on record asks is row 330's. A note on row 551: a program's object below one of the five is refused at load. A note on row 959: the five names are no declared types, so an arm at one of them takes every value. Close row 550 with its promoted test.

**Specification.** `Specification/appendices/changes.tex:4826-4829` and `:4861` name `UnsignedLong`, `Float`, `Int`, `Long` and `BigNum` as the interpreter's objects: bring those sentences in line. The library chapter prints the api and follows it. Rungs T and E edit the same file apart from your lines, at `:3333` and at `:5435-5441`. List each other sentence your change makes false, or none.

**Files.** `Library/FortressLibrary.fss` and `.fsi`, the five types and the private functions that their bodies call; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` and `.fsi`, the five objects and `RR32`'s one `^`; `Library/ReflectiveQuickCheck.fss`, its comment; `interpreter/evaluator/BuildEnvironments.java`, `forObjectDecl1`; `interpreter/evaluator/BuildNativeEnvironment.java`; `interpreter/glue/prim/`, the five constructor classes; `interpreter/evaluator/types/LanguageTypes.java`; `interpreter/glue/StaticNativeApp.java`; `interpreter/glue/prim/ObjectPrims.java`; `compiler/BuiltinPrimitiveRewriter.java`, the one clause; your tests and the tests named; the specification's sentences named. Not: `interpreter/evaluator/types/FTraitOrObject.java` and the load check of `OverloadedFunction.java`, which run 1 landed; `compiler/codegen/` and `compiler/runtimeValues/`; the compiler's prelude; every other declaration of the one library; microGPT and its helper files.

**Reserved points.** A line of the model program or of its helper files: none; if the change needs one, do not change it, and report. A printed type, a message other than the list of overloads, or which declaration a call runs, where it differs from the base. A test of the team's whose checked value changes. A pair of the one library that walk refuses at load after your change and loaded before. A rise of the checker's count or of the distance.

**Overlaps by file.** None with T or E.

### E. A numeral at the end of a block at a declared return type on the compiled path: alone after a local declaration, and as an element of a tuple (rows 1014 and 1030)

**The mission.** A compiled function whose body is a block that ends in a numeral after a local declaration, at a declared return type, links and dies when it runs: `four(): ZZ32 = do`, `k: ZZ32 = 3`, `4`, `end` on four lines ends 'NoClassDefFoundError: fortress/CompilerBuiltin$v' (row 1014). A block that ends in a tuple with a numeral element, at a declared tuple type, names the same class (row 1030). The run's stack names the numeral's coercion called as a function value whose arrow type still holds the coercion's static parameters: `coerce_ZZ32[\1,10,4\]` at an arrow from `NaturalNumeral[\n,r,v\]`. So at these places the numeral is converted by a reference to the coercion that is not instantiated, where a typed binding converts it in place. The form is plain, and a program compiled against the one library will meet it. You repair it. You also write one compiled test that an earlier landing owes.

**The decisions this rung builds.** P-173, a numeral converts where it stands, a declared return type among the places; P-176, one value for each place where a numeral is written; P-174, the numeral types; P-37, the prelude is not changed for this; P-148, where you edit the checker. Section 3's forks E1 and E2.

**What you build, in order.**
1. **The numeral that ends a block** (fork E1; row 1014). Test first: `ProjectFortress/compiler_tests/XXXNumeralEndsBlockAfterDeclarationCompiled` promoted, with a float numeral at `RR64`, a negative numeral, and a block that ends in an `if` whose branches are numerals. Seen failing on the base: 'NoClassDefFoundError: fortress/CompilerBuiltin$v', for the row's program and for the float and the negative numeral. The `if` form fails otherwise on the base: the compile stops, 'Error trying to close method scope', row 340's message, where two paths reach the coercion at unlike stacks. If your repair of the numeral's conversion reaches it, it is in the promoted test; if not, leave it out of that test, write it as an expected-failure test of its own, `compiler_tests/XXXNumeralIfEndsBlockAfterDeclarationCompiled`, with a note on row 340, and build nothing more for it. Find first where the reference to the coercion is written: the checker's conversion of a block's last expression at its expected type, or the code generator's reference to a function as a value. The repair makes that place convert the numeral as a typed binding does.
2. **The tuple with a numeral element** (row 1030). `compiler_tests/XXXBlockEndsInTupleOfNumeralCompiled` promoted, with the row's kin, `nest(): ((ZZ32, ZZ32), String) = ((10, 20), "s")`.
3. **The kin, by a run each:** `compiler_tests/XXXTupleBindingIfBranchesCompiled` (row 1031); `compiler_tests/XXXAtomicExprNumeralArms` and `compiler_tests/XXXAtomicExprNumeralBody` (row 1043), a numeral as the value of an atomic expression at a declared type, which run 1's rung A left; `compiler_tests/XXXLabelNumeralValueCompiled` (row 340's label case), a numeral that ends a label block at a declared type, which run 1's rung L left and P-50 decides. Promote each that passes, and report each that does not with its message; build nothing more for them.
4. **The test owed** (fork E2). `compiler_tests/NumeralEqualsNumberCompiled.test`, from `explorations/compile-ladder/plan-31/probes/planner/PEqNum.fss`: for a zero `u` of `NN32` and of `NN64`, `u = 0` is `true` and `u =/= 0` is `false`. These four cases pass on the base. At `RR32` neither operator works under the prelude, which declares neither on `trait RR32`: the checker refuses `c =/= 0` for `c: RR32`, 'Could not check call to operator NE'; and `c = 0` compiles and dies when it runs, 'StackOverflowError', since `Equality`'s `=` calls `===` and the prelude's `===` at `RR32` calls `=` (`Library/CompilerAlgebra.fss:26`, `Library/CompilerLibrary.fss:67`; run on 2026-11-17 on the base build's code). The prelude is not changed for either: write `c =/= 0` as a compiled test of the refusal, write `c = 0` as an expected-failure test, `compiler_tests/XXXNumeralEqualsRR32Compiled`, and narrow the Effect's sentence at `Specification/appendices/changes.tex:5435-5441` to what the two tests show.
5. **The whole compiled suite once,** `ant testFast`.
6. **The stages and the timing,** once on your final tree: the count stage and the distance stage against run 1's gate (`explorations/compile-ladder/climb-batch-31/gate/`), 0 and 0 with `#crash none`, and P-148's runs.

**Rows.** Close 1014 and 1030; 1031 if its test of step 3 passes. A note on row 1043 or on row 340 only if a test of theirs changed. A new row, `NEW-E-1`, for `=/=` at `RR32` under the prelude, and one, `NEW-E-2`, for `=` at `RR32` under the prelude, which overflows the stack, each if no row holds it when you look.

**Specification.** The sentence of step 4. List each other sentence your change makes false, or none.

**Files.** Under `scala_src/typechecker/`, the place that writes the coercion of a block's last expression; in `compiler/codegen/CodeGen.java`, only the members that write a reference to a function as a value (`forFnRef`, `:4101`, and `forFunctionalRef`, `:4182`), if the cause is there; your tests; the sentence named. Rung K's cast at a returned value (`:3126`, through `declaredResult`, `:7424`) stays as run 1 landed it. Not: the members of `CodeGen.java` and `compiler/NamingCzar.java` that rung T names ("The rule the rungs keep"); `forVarDeclPrePass`; `scala_src/overloading/`; the prelude; the one library; walk; microGPT.

**Reserved points.** A model line: none. The value or the type that a numeral takes at a place that runs today. A rise of the checker's count or of the distance.

**Overlaps by file.** `CodeGen.java` with T, only if your repair is in the code generator: "The rule the rungs keep".

### The rule the rungs keep, and how they meet

- **Run 1.** V and X share no file with the other four or with each other. M, K, L and A share `compiler/codegen/CodeGen.java`, by declaration:
  - M: `dumpTraitDecls` through the code before `genParallelExprs` (`:769-1690`); a new member goes directly above `dumpMethodChaining` (`:926`).
  - K: `conditionallyCastParameter` (`:7289-7321`), the returned value in `generateFunctionalBody` (`:2880`), a new member directly above `conditionallyCastParameter`; two of its callers stand in `genParallelExprs` (`:1756`, `:1768`).
  - L: new members directly above `defaultCase` (`:1776`).
  - A: a new member directly below `forAtomicBlock` (`:1868`); the value parameters and the fields in `forObjectDeclPrePass` (`:4813-4862`).
  - The gather's order is the script's: of two rungs that share a file, the one whose lowest edited line is lower goes first (`climb-batch-workflow.md`, "Gather", "The order"). The manifest's order is that order as this record expects it, M, K, L, A; the hunks do not overlap in any order.
  - M also edits `scala_src/useful/STypesUtil.scala`, the helpers that list a type's methods; X keeps out of that file.
- **The distance stage's shadow patch** (`explorations/coordinator/tools/distance/shadow-patch.py`) edits a copy of `CodeGen.java` by text. A rung that edits `CodeGen.java` runs it once and reports its exit; if it no longer applies, the rung reports the lines, and the gather repairs the tool.
- **Run 2.** O shares no file with T or E. T's members of `CodeGen.java` are `generateForwardingFor` (`:793`), `forMethodInvocation` (`:7071`), `receiverPrependedDomainType` (`:7211`) and the operator application's call (`forOpExpr`, `:5531`), with the methods' signatures in `compiler/NamingCzar.java`. E edits `CodeGen.java` only in the members that write a reference to a function as a value (`forFnRef`, `:4101`, and `forFunctionalRef`, `:4182`), and only if the cause of its rows is there; if E's cause lies in a member that T names, E reports it and builds its repair in the checker's half or not at all. The gather applies T, then O, then E.
- **They meet on the merged tree:** the suites, the atomic runs with A's two programs, the ladder and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief of 2026-11-16, piece by piece, with its home here.

- **The record against the landed tree:** sections 1 and 4 are read again on `c0c35b4f9e`; each rung's reproducer fails there as its section says (PROBES, section 6); K's lines in `CodeGen.java`, K's and T's in `changes.tex` and `inference.tex`, and L's in `FortressLibrary.fss` are corrected; M's, L's and A's hold.
- **Rows 1014 and 1030:** rung E. **Row 1031:** E's step 3, by a run. **Row 1013:** M's step 4, by a run. **Rows 1028 and 1029:** wait (fork B3). **Rows 1032 to 1035:** wait or no work (fork B3).
- **review-routed.2 of climb batch 32,** the compiled test of `u = 0`: E's step 4; `c =/= 0` at `RR32` is refused under the prelude (PROBES, section 9), and `c = 0` at `RR32` overflows the stack when it runs (`climb-batch-31-review.md`, "Run 2, before its launch").
- **review-routed.1 of climb batch 32,** walk at a declared arrow return type and at a field: both run where the rule refuses (PROBES, section 9); row 1036 is filed; V's step 3 writes the expected failure and the box's clause.
- **The merge of P-178:** rung O for the one library and walk, with V's repairs in run 1 and X's for row 542; the prelude's half in no run (fork H2).
- **The process findings of climb batch 32's review:** 1 and 2, the first paragraph of each run's intro (section 6); 3, the intro's sentence on a test's comment line; 4, the intro's sentence on the reserved points; 5, the intro's sentence that no rung runs the demos or the microGPT pair; 7, the manifest's order M, K, L, A; 8, the estimate; 6 and 9 are the script's, named in "Before the launch".

From the record as first drafted, each with its home:

- **Varargs (row 624):** out (fork H1). **A closure class written twice (row 315):** out (fork L2).
- **One method written twice (row 990), and a body inherited through an api's trait (row 732):** M.
- **The missing cast at a `comprises` type (rows 991 and 695):** K. **The method over a tuple index type (row 992), with rows 832 and 819:** T. **`label` and `exit` (row 81):** L. **`atomic` as an expression and a field in a transaction (rows 875 and 319):** A.
- **Rows 822, 812, 540 and 818:** the batch after.
- **Rungs N and D:** landed with climb batch 32 (rows 988, 989, 973, 966, 975 and 976 closed there).

### The planner's probes

`compile-ladder/plan-31/PROBES.md` holds each with its commands and output. Sections 1 to 5 are of 2026-11-13, on `84f1c37190`. Sections 6 to 11 are of 2026-11-16, on a worktree seeded from the base build `/home/user/fortress-base34` at `c0c35b4f9e`: the rungs' reproducers on the landed tree; the measure, 24 in 8 kinds; the prelude with `value object ZZ32`; the two routed steps; the briefing keys; the disk.

**Not run:** a suite, a stage or a timing.

### The probes of 2026-11-16

- **Every reproducer of M, K, L, A and T fails on the landed tree as its section says.** A's field lost updates: 36,374 and 36,931 of 40,000 at four threads.
- **Rows 997 and 998 reproduce under walk.** `object Mine extends ZZ32` with its own `asFloat` loads and prints. `typecase x of Int` takes the arm for 3.
- **The prelude with `value object ZZ32`:** its four components compile; row 866's program is refused, 'Invalid type in extends clause: ZZ32'; a program that adds two `ZZ32` values dies as it starts, 'IncompatibleClassChangeError: class com.sun.fortress.compiler.runtimeValues.FZZ32 can not implement fortress.CompilerBuiltin$ZZ32, because it is not an interface'.
- **Row 1014** reproduces; the stack names `coerce_ZZ32[\1,10,4\]` at an arrow from `NaturalNumeral[\n,r,v\]`.

### Rows filed by plan

By this planner on 2026-11-16, with `ledger.py add`: 1036, a generic function at a declared arrow return type and at a field under walk. By the first planner on 2026-11-13: 988 to 992. A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

### Left out, each with its home

Section 2, "What the batch leaves out" and "For the batch after". Their homes: the prelude's half of the merge, row 1003 and a new review-queue item; the walls that only the switch shows, PLAN's phase 4 and review-queue item 513; varargs, row 624; row 959, the batch after; `tryatomic`, rows 322 and 497, and rows 960, 963 and 957, `CLIMB-BATCH-30.md`'s rungs Y and C, behind the first compiled matrix; rows 812, 822, 540 and 818, the batch after; rows 1005, 1007, 1009, 1010, 1012, 1015, 1028, 1029 and 1035, the batch after; row 1032, review-queue item 552.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 32: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-31/manifest/` is brought in line with this record: `lists31.py` holds the briefings of section 1, `gen31.py --run 1|2` writes a run's block from the record, and `check31.js --run 1|2` checks the block in a scratch copy of the script and, with `--write`, splices it.

- run 1: `BATCH` `31`, the folder `compile-ladder/climb-batch-31/`, the rungs M, K, L, A, V, X in that order; run 2: `BATCH` `31b`, `compile-ladder/climb-batch-31b/`, the rungs T, O, E;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backtick or a double quote;
- no rung declaring a count, a crash or a move;
- M, K, L, A, V and T `STAGE_BLIND`; X, O and E naming the two stages in a step of their sections;
- no block is kept beside the generator. Run 1's block is spliced into the script, with rung A's two programs in its atomic list, by the commit of 2026-11-17 that holds this sentence, after the review of this record; run 2's block was generated, checked and spliced on 2026-11-17, after its sections were read again on run 1's landed tree, by the commit that holds this sentence; with it the script's `atomic_runs` reads only its own lines of the gate's summary (process finding 10 of `reviews/batch-31-review.md`).

### What every agent reads first

**Run 1.** This run is climb batch 31, the first of the two runs of the record CLIMB-BATCH-31.md. Its rungs are of two kinds. Four repair walls between today's tree and a compiled program on the interpreter's library that a test against the compiler's prelude can show today; a wall is a place where the compiler or the compiled library stops. Two prepare the merge of the five built-in number types with their objects, which the decisions on record ask for before the switch-over and which the next run builds. Its rungs:

- M, the methods that a class inherits: one method written once where a generic trait gives a body to a method that it also inherits, and a forwarder for a body inherited through an api's trait that is not first;
- K, the cast where a trait's value stands for the type that its comprises clause lists;
- L, label and exit on the compiled path;
- A, atomic as an expression, and a mutable field inside a transaction;
- V, two repairs of walk before the merge: a type parameter bounded by a value type, and the load check of a generic declaration beside a plain one over an object type;
- X, the checker's Return Type Rule for a generic declaration beside a plain one whose domain is an object type.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If your worktree and your branch exist when you start, an earlier launch worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. M, K, L and A share CodeGen.java by declaration: each keeps to its own, as its section says. Only X runs the count stage and the distance stage. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT changes no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies the rungs in the script's order, expected M, K, L, A, V, X, and builds the specification once. The gate's atomic runs hold two new programs.

**Run 2.** This run is climb batch 31b, the second of the two runs of the record CLIMB-BATCH-31.md, after climb batch 31, which landed rungs M, K, L, A, V and X. Its rungs:

- T, a method whose one parameter is a tuple: an object's body at a tuple type implements its generic trait's method over a type parameter, the wall of every array of rank 2;
- O, the five built-in number types ZZ32, ZZ64, ZZ, NN64 and RR64 as value objects in the interpreter's library, each merged with its one object, and walk's native number objects removed;
- E, a numeral at the end of a block at a declared return type on the compiled path.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: for a worker, the worktree and the branch exist; for a skeptic, a judge or a repair round, which always find the worker's worktree and branch, the branch or the rung's folder holds work of that role. Then read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. O and E run the count stage and the distance stage once; T runs neither. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies T, then O, then E, and builds the specification once.

### Before the launch

The coordinator, for run 1:

1. **The check of this record by a fresh reader on Fable,** its changes in place (`references/batch.md`, "The go").
2. **The script:** A's two programs in the atomic list, 24 programs and 72 runs, and the gate role's sentence on "42 runs" brought in line with the list (process finding 9 of `reviews/batch-32-review.md`); the gate runs the two stages apart from `testFast`, or the commit stage writes the distance stage's seconds only with the load of the whole stage (process finding 6). Then the generator's block for `--run 1`, its checks and the splice, as the manual's "Before the launch", step 4, gives them. The base is `main`'s head after that commit. Done on 2026-11-17, in the commit that holds this sentence: the gate's result counts its runs from the two lists, 72; and of process finding 6's two ways the second, the commit stage keeps F-240's words that the distance stage ran beside the first minutes of `testFast`, with the gate's order as it was.
3. **The base build,** made new at that base outside the main tree, as the manual's step 2 gives it; its trial seed and the old code's run. `/home/user/fortress-base34` at `c0c35b4f9e` has the code of `main` today, and `main` has moved since in tests and in `Specification/`.
4. **The disk:** 13 G or more free; `git status --porcelain` empty in the main tree. `/home/user/fortress-base32` and `/home/user/fortress-base33` are older base builds that no run of this record reads.
5. **The launch from a turn that no message of the curator's started,** a check-in's turn (process finding 1).
6. **Check-ins** for about 5 hours and a half, 45 minutes apart (`<scratchpad>/batch31/checkins.txt`).

For run 2, after run 1's landing: sections T, O and E read again against the landed tree, done on 2026-11-17 by the check before run 2's launch (`climb-batch-31-review.md`, "Run 2, before its launch"), with the reproducers run once on the base build's code; the base build `/home/user/fortress-base36` at `a3e35bbdb0`, whose code is `7858d0e97b`'s; the generator's block for `--run 2`, checked and spliced by that check; then steps 4 to 6 with 8.5 G free, check-ins for about 3 hours and three quarters. The base is `main`'s head after the splice's commit; a commit after the base build's that changes no code, test, library or build file needs no new base build (`git diff --stat a3e35bbdb0 <base> -- ProjectFortress Library build.xml bin` prints nothing).

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 2>', baseBuild: '<the base build of step 3>'}})` for run 1, and the same with run 2's base and its base build for run 2. The arguments of each are kept byte for byte.

### The gate, and what it should show

The comparands for run 1 are climb batch 32's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, `#crash none`), in `compile-ladder/climb-batch-32/gate/`: `CompilerJUTest` 1,616, the system shards 856, 22 atomic programs, 3,422 tests in all. `main` gained three test files of the compiler track since that gate, for rows 1032 and 1035. For run 2 the comparands are run 1's second gate, in `compile-ladder/climb-batch-31/gate/`: 63 suites, 3,484 tests, `CompilerJUTest` 1,667, the system shards 867, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`. In run 2, `testSystem` gains O's two new tests, with row 550's test promoted in place; `testFast` gains T's three or more new tests and E's two or three, with E's promotions in place; the atomic list is unchanged. Rung A's handover offers a third atomic program, `VarFieldCapturedCompiled`; it is not in the list.

- `testSystem`: the comparand's count plus V's new tests and its expected failure; V promotes no test in run 1 (fork V4).
- `testFast`: the compiler track's count plus the three files that `main` gained, M's two, K's one, L's one, A's two and X's new tests, and L's expected failure if its step 2 leaves one, with the promotions keeping the count; the library track unchanged.
- The atomic runs: the comparand's 22 programs and A's two, each three times `PASS`.
- The ladder: no rung declares a move.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each.
- **The measure,** once after each run's landing, by the coordinator or the post-batch reviewer in a scratch worktree: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Before, on `c0c35b4f9e`: 24 in 8 kinds, 742 emitted. If a rung's edit of `NamingCzar.java` stops the measure's patch from applying, the patch's hunk is brought in line by hand. After run 2 the script's two `sed` lines for `NN32`'s getters are read again against rung O's library.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Run 1, closed:** 990, 732, and 571 if it passes (M); 991, and 695 if the cast reaches it (K); 81 (L); 875, 319 (A); 997, 998 (V); 542 (X). Row 1036's whole new line, and a note on row 550 (V).
- **Run 2, closed:** 992, 832, 819 (T); 1014, 1030, and 1031 if its test passes (E); 550 (O). Rows 1003 and 1000 rewritten, and notes on 551 and 959 (O).

### After the landing

- **PLAN:** phase 4's F-34 line with the new count and its kinds by row; the merge's line: the one library's half landed with run 2, the prelude's half waits for its probe; a line that varargs waits for a program compiled against the one library; "Next" and the line of climb batch 31.
- **The review queue:** this record's 27 forks as new items; items 516 to 520 answered at forks O1 to O5; a new item for fork H2, the way of the prelude's half.
- **The post-batch review** of each run.

### For the record-landing workflow

The batch edits no FACTS or POSITIONS entry. After run 1, these are false or name a closed row as open:

- **F-34:** "refuses 24 declarations of the fourteen components ... in 8 kinds", and its kinds by row; the new figure is the measure's after the landing.
- **F-352:** its walls that a test against the prelude shows, rows 81, 732, 990 and 991. **F-354:** row 990, the choice between two copies of one method.
- **F-19** and the entries that name rows 319 and 875 as open: a mutable field is inside the transaction, and the atomic expression compiles.
- **F-225:** row 695, if K's step 2 lands.
- **F-257** and **F-361:** rows 997 and 998. **F-75** and **F-174:** row 542, "open".
- **PLAN's** phase 4 line on the merge: "Two repairs of the interpreter come first", done.

After run 2:

- **F-34** again, and **F-291** and **F-296:** rows 832 and 819.
- **F-257** and **F-361:** row 550, which rung O closes.
- **F-361:** "nothing landed" of the merge; **F-360** and **F-359,** where they give the five traits with one object each as the tree's state.
- **F-344** and **F-328:** walk's reading of a native number object at its trait and the ilk names of the five, which the numbers stop needing; the entries that name `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` as objects of the library: F-74, F-79, F-229, F-262, F-276, F-299, F-303, F-306 to F-308, F-310, F-311, F-313, F-314 and F-323, each to be read.
- **P-68:** "`round` is `ZZ64`, but `ZZ` in the `FortressLibrary` component's `trait RR64`": one declaration, `ZZ64`.
- **P-178,** **P-37,** **P-164** and **P-167** stay true; PLAN's and row 1003's "the tree does not do it yet" holds for the prelude only.
- **F-29** and **F-299:** row 551, for an extender of the five.

### For the skill writer: the sentences of `fortress-repo` this batch makes false

The batch writes no skill text. After the landings, the record-landing workflow's skill writer brings these in line (each as on `main` on 2026-11-16).

After run 1:

- `references/compiler.md:40`, "What the compiled path cannot compile yet": "`label` and `exit`, `spawn`, and `atomic` used as an expression": `spawn` alone stays (L, A).
- `references/compiler.md:75`: "The compiled code keeps each mutable variable in a cell ...": a `var` field is such a variable too (A).
- `references/compiler.md:122`: the call of a functional method of a listed object (row 815), if K's step 3 promotes its case.
- `references/revival-changes.md:41`: "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695).", if K's step 2 lands. `references/compiler.md:136`: the sentence of row 307, only if `XXXNatOpenRun` passes.
- `references/gate.md`, "The atomic runs": the count and the list of names, with A's two.
- `references/revival-changes.md:17`, "Walk's load check is not the verdict of these rules": it stays true; `references/interpreter.md`, "What walk checks", gains the two cases that V repairs where it lists rows 550, 697 or 998.
- `references/interpreter.md:18`: the sentence of row 1019 gains the declared return type and the field (row 1036).

After run 2:

- `SKILL.md`, "How a program runs": "A value object is ... as the library's numbers, characters and booleans do": it stays true, and now holds for all eight number types by their own declarations.
- `references/interpreter.md:118` and `:124`: "`RR64` and `Float`, the library's object that extends `RR64`, in `double`" and "the library's objects that extend number types ...: `Int` (`ZZ32`) in `int`, `Long` (`ZZ64`) and `UnsignedLong` (`NN64`) in `long`, and `BigNum` (`ZZ`) in `BigInteger`": the objects are gone.
- `references/interpreter.md:138`: "So a program's object that extends `ZZ32` loads ... (ledger row 551)": it is refused at load.
- `references/interpreter.md:144` and `references/compiler.md:22`: `interpreter/glue/prim/Int.java` and `Long.java`, renamed.
- `references/compiler.md:99`: "or a parameter or `self` the type `UnsignedLong`".
- `references/library.md:39`: "because they call `Float`'s natives".
- `references/compiler.md:112`: the trap of rows 1014 and 1030, which closes (E).
- `references/revival-changes.md`, "Numbers": "Until the switch-over ..." sentences on `=/=`: the prelude's `RR32` has no `=/=` (E's step 4), a limit to add.

## 7. Files cited, with their links

- Records: [CLIMB-BATCH-32.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-32.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [the merge probe](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/number-object-merge.md), [the carriers' ways](https://github.com/palimondo/fortress/blob/main/explorations/reviews/carriers-ways-2026-11-13.md), [the rehearsal](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), [climb batch 32's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-32-review.md), [the check of this record of 2026-11-13](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-31-review.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/PROBES.md), [the probe programs](https://github.com/palimondo/fortress/tree/main/explorations/compile-ladder/plan-31/probes/planner), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md).
- Code: [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [VarCodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java), [NamingCzar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java), [OverloadingOracle.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala), [OverloadedFunction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), [FTraitOrObject.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java), [BuildEnvironments.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss), [CompilerBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss), [OneShotFlag.fss](https://github.com/palimondo/fortress/blob/main/Library/OneShotFlag.fss).
- Specification: [label.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/label.tex), [atomic.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/atomic.tex), [traits.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/traits.tex), [overloading.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/overloading.tex), [inference.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/inference.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
