<!-- The record of climb batch 31, in two runs (climb batch 31 and climb batch 31b), for the coordinating session, the curator and the batch's workers: the walls between today's tree and a compiled program on the interpreter's library that a test against the compiler's prelude can show and repair today, with three pieces kept from the unlaunched run 2 of climb batch 30 and the model program's top-level tuple binding. Drafted 2026-11-13 by a planning worker on Fable against `main` at `840a4056c1`, whose code is the base build's, `/home/user/fortress-base33` at `84f1c37190` (`git diff --stat 84f1c37190 main -- . ':!explorations' ':!docs'` prints nothing), and the code of `832f7d0d91`, on which the rehearsal and probe Y ran. It proposes seven rungs: M, K, L, A and N in run 1, T and D in run 2, after run 1 lands. **The batch has no go: the curator asked on 2026-11-13 for it to be planned and said that its start is not authorized. This record launches nothing.** It has one consequential fork, W (section 2), and seventeen forks with defaults (section 3). It replaces run 2 of `CLIMB-BATCH-30.md` (climb batch 30b), which was planned and never launched. -->
<!-- Sources: the planner's brief (`<scratchpad>/batch31/planner-brief.md`); `compile-ladder/plan-31/probes/switch-rehearsal.md` (the rehearsal, walls W1 to W16); `reviews/plan-review-2026-11-10.md`, sections 7.1, 7.2 and 7.5; `compile-ladder/plan-31/probes/probe-y.md`; `reviews/carriers-ways-2026-11-13.md`, whose "Points to report" bind how the rehearsal is read; `reviews/numeral-equality-ways-2026-11-10.md`; `reviews/batch-30-review.md`, Part 5 and "The steps due before the next batch"; `compile-ladder/plan-31/probes/model-closure-check.md`; `CLIMB-BATCH-30.md`, rungs Y and C, and for the form; POSITIONS P-46, P-49, P-173, P-59, P-12, P-37, P-9, P-87, P-47, P-60, P-146, P-156, P-169, P-175; FACTS F-34, F-53, F-19; the ledger rows named in section 1; the `coordinator` skill's `references/batch.md`; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the code at the sites. -->
<!-- The planner's probes: `compile-ladder/plan-31/PROBES.md`, with their programs in `compile-ladder/plan-31/probes/planner/`, run in a worktree of the planner's own, `/home/user/fortress-p31`, seeded from the base build and removed after. No suite and no stage of the gate was run. -->

# Climb batch 31

## 1. The manifest, rung by rung

The batch's generator writes each run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. Run 1, climb batch 31, holds N, M, L, A and K in that order; run 2, climb batch 31b, holds T and D. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-31.md#`, REH for `doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#`, PRB for `doc:explorations/compile-ladder/plan-31/PROBES.md#`, NEQ for `doc:explorations/reviews/numeral-equality-ways-2026-11-10.md#`, MCC for `doc:explorations/compile-ladder/plan-31/probes/model-closure-check.md#`, SPEC for `doc:Specification/`, and SRC for `code:ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main` (PROBES, section 4).

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | N | `rung-numeral-most-specific` | A numeral at a call goes to the most specific declaration that takes it | 210 |
| 1 | M | `rung-method-forwarders` | The methods that a class inherits: one method once, and a body inherited through an api's trait | 220 |
| 1 | L | `rung-label-exit` | `label` and `exit`, and two closures at one source position | 200 |
| 1 | A | `rung-atomic-expr-field` | `atomic` as an expression, and a mutable field inside a transaction | 170 |
| 1 | K | `rung-comprises-cast` | The cast where a trait's value stands for the type that its `comprises` clause lists | 150 |
| 2 | T | `rung-tuple-parameter` | A method whose one parameter is a tuple, and a tuple as an operator's operand | 220 |
| 2 | D | `rung-tuple-binding` | A top-level tuple binding | 170 |

Fields common to the seven rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-method-forwarders`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** none, but the specification's build at the gather of run 1, for N's and K's text, and of run 2, for T's. **expected moves:** none.
- **lands only with:** none. In each run every rung lands on its own. T and D are written on run 1's landed tree: T edits the forwarding code that M owns in run 1.
- **its test is the stage:** no. **the stages:** N and D run the count stage and the distance stage once on their final trees, with the checker's timing (P-148), N because it edits the checker and the one library, D because it edits the checker. M, L, A, K and T run neither and list their files (`STAGE_BLIND`); each of them runs the distance stage's shadow patch once on its final tree, since that tool edits a copy of `CodeGen.java` (section 4, "The rule the rungs keep").
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 30's gate left them (F-53). **expected checker crash:** none.

### N
- **slug:** `rung-numeral-most-specific`
- **worktree:** `/home/user/fortress-numeral-most-specific`
- **section:** `N. A numeral at a call goes to the most specific declaration that takes it, by its own conversion if need be, its default the last resort: u = 0 is true for a zero u of NN32, on both paths (P-46, P-49, P-173)`
- **blurb:** the decision on record for a numeral at a call (P-46): a numeral is applicable to a parameter that fixes no type, at its default, and to a parameter whose type declares a coercion from the numeral's type, by that coercion; among the applicable declarations the most specific runs, and where two are not ordered, the one that the default fits. Built in the compiled checker and, by fork W's default, in walk; the one library's Equality gains =/= so that u =/= 0 follows; the two expected-failure walk tests are promoted (rows 973 and 966, their kin 975 and 976); row 390's numeral case and row 989 close under the prelude, and the two model lines that row 989 names pass the checker against the one library; the specification's coercion chapter and the Effect of Appendix I's numerals are brought in line.
- **points to report:**
  - The rule as built in the checker and in walk, by declaration, and what each does where two applicable declarations are not ordered.
  - The one library's overload sets in which a numeral now reaches another declaration than on the base, each with a call that shows it; any such call on a model line, which is reserved.
  - Every existing test whose verdict, output or pinned message changed, with its line before and after; every line of a team test changed.
  - `k(5)` beside `k(x: Any)` and `k(x: NN32)`, and `mul(1.0, f)` of row 989, on each path, before and after; the two model lines under the distance stage's driver, before and after.
  - Row 390: what closes and what stays, with the row's whole new line.
  - What walk answers for `a = 0`, `a: Any` holding an `NN32` zero, and what the checker answers.
  - The count and distance tables on your final tree, the commit they ran on, their seconds, and P-148's runs.
  - Each sentence of the specification changed, before and after; each sentence your change makes false that this section does not name.
  - A file edited beyond those named.
- **briefing** (26 keys, 19 checks):
  - P-46 (check): the decision you build, with the numeral's rule and its tie.
  - P-49 (check): the checker's order of attempts, and its exception for a numeral.
  - P-173 (check): where a numeral converts, and its default as the last resort.
  - P-174 (check): the numeral types; no `=` ties one to a number type.
  - P-176: one value for each place where a numeral is written.
  - P-168 (check): the library's `=` over `Any`, which stays.
  - P-165: which pairs of number types compare by `=`.
  - P-59 (check): walk chooses a coercion by the run-time value; fork W reads it.
  - P-12: walk runs the checker only after the switch-over.
  - P-148 (check): the checker's timing for your edit.
  - P-37: the prelude is not changed for this.
  - ledger:973 (check): `u = 0` under walk, which closes.
  - ledger:966 (check): `u =/= 0` under walk, which closes.
  - ledger:975 (check): the `case` clause, its kin.
  - ledger:976 (check): a program's own number type, its kin.
  - ledger:390 (check): the dispatcher at `Any` that is never emitted; its numeral case is yours.
  - ledger:989 (check): the float numeral beside a value, two declarations by coercion.
  - NEQ `Way B. A numeral goes to the most specific declaration that takes it; the default is the last resort` (check): the way, what it sees, keeps and bends.
  - NEQ `2.3 The one thing measured: the checker against the one library` (check): what the checker chooses today, call by call.
  - `doc:explorations/reviews/batch-30-review.md#Part 5. What changes run 2's plan`: the sites in walk and the checker that the last landing left.
  - MCC `2. A line of the model that the checker refuses against the one library`: the model line and its driver.
  - SPEC `basic/conversions-coercions.tex#Coercion Resolution` (check): the specification's rule and the sentences you change.
  - SRC `scala_src/typechecker/impls/Functionals.scala#def typedApplication(` (check): the checker's attempts at a call.
  - SRC `interpreter/evaluator/values/OverloadedFunction.java#private SingleFcn bestMatchForNumerals` (check): walk's choice for a call with a numeral.
  - `code:Library/FortressLibrary.fss#trait Equality`: where `=/=` goes.
  - REC `Forks the batch takes` (check): the defaults you build.

### M
- **slug:** `rung-method-forwarders`
- **worktree:** `/home/user/fortress-method-forwarders`
- **section:** `M. The methods that a trait's or an object's class inherits: one method written once where a generic trait gives a body to a method that it also inherits with a body, and a forwarder for a body inherited through an api's trait that is not first, a generic method's among them (rows 990, 732 and 571)`
- **blurb:** the code generator gathers, for each trait's and object's class, forwarders to the method bodies that the class inherits from the traits after its first. Two defects of that gathering: where a generic trait declares a method with a body that it also inherits with a body, the class gets the method twice and fails as it loads (row 990, the rehearsal's W6); where the body comes through an imported api's trait that is not first in the extends clause, a plain or a generic method gets no forwarder and the call dies with AbstractMethodError (row 732, the rehearsal's W16). Both are repaired, the first so that the trait's own declaration runs whatever the order in which the compiler meets the two.
- **points to report:**
  - The override test as built: which declaration a class's method runs where its trait declares one that it also inherits, and why the result no longer depends on the order of the gathered methods.
  - Row 990's reproducer and row 732's two cases, the plain and the generic method, each failing on the base and passing after; the same programs compiled twice, once with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` in the compile's `JAVA_FLAGS`, with both runs' output.
  - Row 571's own test, `XXXFunctionalMethodMeetNarrowedSelfNotFirst`: passes after, or what remains.
  - Rows 495 and 733: touched or not.
  - Every existing test that failed after your change, with its cause.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (16 keys, 11 checks):
  - P-47 (check): each integer type declares its own `MIN`, `MAX` and `MINMAX` beside the inherited ones: the library's shape that row 990 meets.
  - P-149 (check): an abstract method from one trait and its body from another.
  - P-147: an object defines an inherited abstract method by bodies that cover it.
  - ledger:990 (check): the method written twice, which closes.
  - ledger:732 (check): the body inherited through an api's trait, which closes.
  - ledger:571 (check): the nearest older row; its test is a guard or a promotion.
  - ledger:495: the generic dotted methods' dispatch, which is not yours.
  - REH `W6. One method written twice into a class` (check): the library's 27 classes, and the hack that failed after a rebuild.
  - REH `W16. The library's vector algebra` (check): the library's site, `Indexed`'s `map` on a range object.
  - PRB `2. The walls under the prelude` (check): the reproducers and their narrowing.
  - SPEC `basic/traits.tex#Method Declarations` (check): what a trait's own declaration does to an inherited one.
  - SRC `compiler/codegen/CodeGen.java#private void dumpMethodChaining` (check): where the forwarders are gathered.
  - SRC `compiler/codegen/CodeGen.java#private void generateForwardingFor(Functional from_fnl, Functional to_fnl`: how one forwarder is written.
  - `code:Library/FortressLibrary.fss#trait StandardTotalOrder`: the library's precedent, bodies beside inherited bodies.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks a trait and an object.
  - REC `Forks the batch takes` (check): the defaults you build.

### L
- **slug:** `rung-label-exit`
- **worktree:** `/home/user/fortress-label-exit`
- **section:** `L. label and exit on the compiled path, and two closures at one source position: an exit leaves its label's block with its value, also from inside a loop's body, and each closure class gets a name of its own (rows 81 and 315)`
- **blurb:** the code generator has no case for a label block or an exit (row 81), so every declaration that holds one is refused, the one library's Indexed among them; and it names a closure's class by its source position alone, so two closures at one position are written under one name and the jar's write stops (row 315). The rung compiles label and exit, an exit from inside a loop's body or a function expression included, and gives each closure class a name of its own.
- **points to report:**
  - `exit` as built: how it reaches its label from a loop's body, which is a closure and can run in a task; what the other iterations of a parallel loop do; what a `finally` clause and an `atomic` block between the `exit` and its label do.
  - Each form tested, failing on the base and passing after at one thread and at four: an `exit` with and without a value, out of a `while`, out of a `for`, a label nested in a label, a label as a function's whole body.
  - The closure's name as built, and row 315's two reproducers before and after.
  - Every existing test whose pinned class name or message changed.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - Each sentence of the specification that your change makes false, or none.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (14 keys, 10 checks):
  - P-175 (check): a group joins every arm that it forked before it completes abruptly, which an `exit` out of a parallel loop meets.
  - F-19: what may run in parallel, and what each path forks.
  - ledger:81 (check): the refusal, which closes.
  - ledger:315 (check): the two closure classes of one name, which closes.
  - REH `W9. ` (check): the library's sites of `label`.
  - REH `W10. A closure class written twice into the jar` (check): the library's site of the closure.
  - SPEC `basic/expressions/label.tex#Label and Exit` (check): the construct.
  - SPEC `basic/evaluation/parallelism.tex#Threads and Parallelism`: when a group completes abruptly.
  - SRC `interpreter/evaluator/Evaluator.java#public FValue forLabel` (check): walk's label, the precedent.
  - SRC `interpreter/evaluator/Evaluator.java#public FValue forExit` (check): walk's exit.
  - SRC `compiler/codegen/CodeGen.java#public void forFnExpr` (check): where a closure's class is named and written.
  - SRC `compiler/NamingCzar.java#public static String gensymArrowClassName(String desc, Span sp)`: the name from the position.
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
- **briefing** (11 keys, 9 checks):
  - P-169 (check): the compiled transaction's slots, the shape your work stays within.
  - ledger:875 (check): the atomic expression, which closes.
  - ledger:319 (check): the field outside the transaction, which closes.
  - ledger:641: what a check before every access costs.
  - `doc:explorations/reviews/parallelism-foundations-2026-11-08.md#1.6 The code generator's` (check): the block's code and its gaps.
  - SPEC `basic/expressions/atomic.tex#Atomic Expressions` (check): the atomic expression.
  - SRC `compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x)` (check): the block's code and handler, as climb batch 30 landed them.
  - SRC `compiler/codegen/VarCodeGen.java#public static class MutableFieldVar` (check): a field's read and write.
  - `code:Library/OneShotFlag.fss#object OneShot` (check): the library's site.
  - `map:modules-and-phases.md#B.11 The runtime`: the compiled run time and its transaction.
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
- **briefing** (12 keys, 10 checks):
  - P-156 (check): an index type extends `Index`, and a tuple of indices is an `Index`.
  - ledger:992 (check): the method over a tuple index type, which closes.
  - ledger:832 (check): the generic dotted method with a tuple parameter, which closes.
  - ledger:819 (check): the postfix operator on a tuple operand, which closes.
  - REH `W15. An array of rank 2` (check): the library's site.
  - PRB `2. The walls under the prelude` (check): the reproducer, and its form with the verifier on.
  - SPEC `basic/expressions/method-invocation.tex#Dotted Method Invocations` (check): a dotted call's argument.
  - SRC `compiler/codegen/CodeGen.java#private Type receiverPrependedDomainType` (check): where the receiver joins a tuple domain's elements.
  - SRC `compiler/codegen/CodeGen.java#private void generateForwardingFor(Functional from_fnl, Functional to_fnl` (check): the forwarder, as run 1 left it.
  - REC `M. The methods that a trait's or an object's class inherits`: what rung M built in the same code, which you build on.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks a method and a call.
  - REC `Forks the batch takes` (check): the defaults you build.

### D
- **slug:** `rung-tuple-binding`
- **worktree:** `/home/user/fortress-tuple-binding`
- **section:** `D. A top-level tuple binding on the compiled path: the checker types each name by its element, and the code generator declares each name (rows 988 and 474)`
- **blurb:** a top-level binding of several names to a tuple, the form of the model program's hyperparameters, stops the compile: the checker leaves a node that it should have replaced (row 988), types each name so that it is accepted anywhere (row 474), and behind it the code generator has no case for a left side of more than one name. The rung types each name by its element and compiles the binding.
- **points to report:**
  - Where the names' types were lost in the checker, and the repair.
  - The binding as compiled: when the right side is evaluated, how many times, and what each name is.
  - Row 988's reproducer and row 474's cases, before and after; a numeral element's type at each name; a `var` tuple binding, a typed one, and one whose right side is a call that returns a tuple.
  - The model's lines 17 to 19 under the distance stage's driver, before and after.
  - The count and distance tables on your final tree, the commit they ran on, their seconds, and P-148's runs.
  - Each sentence of the specification that your change makes false, or none.
  - A file edited beyond those named.
- **briefing** (12 keys, 9 checks):
  - P-9 (check): the model writes its hyperparameters as tuple bindings.
  - P-87: a model line does not change.
  - P-173 (check): the default type of a numeral where nothing fixes one, which each name of such a binding takes.
  - P-148 (check): the checker's timing for your edit.
  - ledger:988 (check): the stop, which closes.
  - ledger:474 (check): the names typed so that they are accepted anywhere, which closes.
  - ledger:175: the single-binding form, the workaround that the model does not take.
  - MCC `3. The model's hyperparameter lines do not compile under either library` (check): the runs and the code generator's site.
  - SPEC `basic/variables.tex#Top-Level Variable Declarations` (check): the tuple notation.
  - SRC `compiler/codegen/CodeGen.java#private void forVarDeclPrePass` (check): the code generator's case.
  - `map:compile-path-walkthrough.md#3. The checker`: how the checker types top-level variables.
  - REC `Forks the batch takes` (check): the defaults you build.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** checks types with the **checker**, then writes JVM bytecode with the **code generator**. Until the **switch-over** it uses its own small library, the **prelude**. After it, both use the **one library**, which only walk runs today.
- A **wall** is a place where the compiler or the compiled library stops. The **rehearsal** is the probe of 2026-11-10 that switched a scratch copy onto the one library and met sixteen walls, W1 to W16.
- A wall of the **first kind** can be shown today by a small program compiled against the prelude. A wall of the **second kind** shows only after the switch.
- A **rung** is one change, built by one worker and checked by a second, the skeptic. A **run** is one launch of the batch workflow. The **gather** merges a run's rungs. The **gate** is the full check before landing.
- A **forwarder** is a small method that the code generator writes into a class, which calls a method body that the class inherits.
- A **numeral** is a number written in digits. Its **default** is the type that it takes where nothing fixes one: `ZZ32`, or `RR64` with a radix point.
- **microGPT** is the model program. No rung changes a line of it. Its quick checks under walk stay 7 of 7 for both programs.

### The go

You asked for this batch to be planned, and said that its start is not authorized. Nothing here launches. The batch waits for your go, and for your answer to one question.

### The one question before the launch

**Fork W. Does walk get the numeral rule now, or when it runs the checker?**

You decided how a numeral at a call chooses its declaration: it goes to the most specific one that takes it (P-46). So `u = 0` is `true` for a zero `u` of type `NN32`. Rung N builds that in the checker. The question is walk.

- Walk has no checker until after the switch-over (P-12). It chooses at run time.
- P-59 says that walk chooses a coercion by the run-time value, and that walk "is not changed for it before the switch-over". The rule for numerals changes which declaration walk runs for a call with a numeral.

The ways:

- **(a) Walk now, in rung N.** Walk's choice for a call with a numeral follows the same rule. Under walk `u = 0` becomes `true` and `u =/= 0` becomes `false`. Rows 973 and 966 close on both paths. Cost: about a third of rung N's work. One difference stays: for `a: Any` that holds an `NN32` zero, walk answers `a = 0` with `true`, because it sees the value, and the checker answers `false`. P-59 already accepts that kind of difference.
- **(b) Walk waits.** Rung N builds the checker's half and the library's `=/=` only. Under walk `u = 0` stays `false` until walk runs the checker, some batches after the switch-over. microGPT runs only under walk today, so every program written until then meets the wrong answer. The two expected-failure tests stay.

**Recommended: (a).** The reasons: you said that no answer but `true` is accepted. P-59 is about a value's coercion, chosen by its run-time type; a numeral is not a value, and walk already converts numerals place by place (P-173). The ways review recommended both paths in one rung. I judge the fork consequential, because (a) reads P-59's sentence more narrowly than its words. The record is written for (a). For (b), step 2 of rung N's section is struck, with its two promotions.

### The scope: two runs, seven rungs

Each rung is given as what a Fortress programmer could not compile before and can after.

**Run 1, climb batch 31:**

- **N, the numeral rule.** Today the compiled program dies when it runs, and walk prints `any`. After: `nn32` on both paths.

      k(x: Any): String = "any"
      k(x: NN32): String = "nn32"
      run(): () = println(k(5))

- **M, inherited methods.** `Tord` gives `mx` a body, and so does `Mmx`, which it extends. Today the compiled class holds `mx` twice and fails when it loads. The library's number types have this shape in 27 classes. After: it runs, and `Tord`'s own `mx` is the one called.

      trait Mmx[\T\] mx(self, other: T): T = other end
      trait Tord[\T\] extends { Pord[\T\], Mmx[\T\] }
          mx(self, other: T): T = self end

  And the second half: `Ix` comes from another component and has a method `map` with a body. Today `Rng.map(...)` dies, because the object's class got no forwarder. The library's `DOT` and `SUM` stop there. After: it runs.

      object Rng extends { Other, Ix[\ZZ32\] }
          one(): ZZ32 = 7
      end

- **L, `label` and `exit`.** Today: 'Can't compile Label'. Every string and every array of the one library is refused for one such line. After: it compiles and prints 3.

      find(n: ZZ32): ZZ32 = label found
          for i <- 0#10 do if i = n then exit found with i end end
          -1 end found

- **A, `atomic` as an expression, on a field.** This is the one library's `OneShot`, which `List` needs. Today: 'Can't compile AtomicExpr'. And a field written inside `atomic` loses updates at four threads. After: it compiles, and exactly one caller wins.

      object OneShot(var canTryIt: Boolean)
          tryOnce(): Boolean = atomic if canTryIt then canTryIt := false; true else false end
      end

- **K, the cast at a `comprises` type.** `comprises { R }` says that every `Q` is an `R`, so the checker accepts `den(self)`. Today the JVM refuses the compiled class when it loads. The library's rational numbers have this on 23 lines, and the first numeral that becomes a rational stops every program. After: it runs.

      trait Q comprises { R }
          getter fin(): Boolean = (den(self) > 0)
      end

**Run 2, climb batch 31b,** after run 1 lands:

- **T, a method over a pair of indices.** Today the JVM refuses `A2`'s class. This is the wall of every matrix: `m[i,j]` on the one library. After: it runs.

      trait Arr[\E, I\] get(i: I): E end
      object A2 extends Arr[\ZZ32, (ZZ32, ZZ32)\]
          get(t: (ZZ32, ZZ32)): ZZ32 = 7 end

- **D, the hyperparameter line.** Today the compile stops with an internal error. After: it compiles, and no model line changes.

      (nEmbd, blockSize) = (16, 4)
      run(): () = println(nEmbd + blockSize)

**Why two runs.** M and T both edit the code that writes forwarders. Two workers in one run would edit the same declarations, and the gather could not merge them. M goes first because the duplicated methods stop the library's first load, and its second half is the wall of `DOT`. T then builds the matrix's method on M's landed code. D goes with T: both are the model's own needs, and run 1 already has four rungs in the code generator's main file.

**Why five rungs in run 1.** Each owns whole declarations of the code generator, far apart (section 4, "The rule the rungs keep"). N edits no file of the code generator.

### The measure

The count of declarations of the one library's fourteen components that the code generator refuses.

- **Before: 24, in 8 kinds.** Measured on the base build's code by the rehearsal's way (PROBES, section 3). The record's older figure, 38 in 10 kinds (F-34), is of older code.
- **Run 1 takes off:** the 4 of `label` and the 2 of the closure class (L), and the 1 of the `atomic` expression (A): 7. Two of those declarations have a second wall behind the first, varargs. So expect 17 to 19 after run 1.
- **Run 2 takes off:** the 4 range operators over pairs and triples (T). Expect 13 to 15.
- **What stays:** varargs 8, the kind environment 4, the intersection 1, and what stands behind them.
- **M, K and the first half of T do not move this count.** Their classes are written and fail when they load, which the count cannot see. Their measure is their tests. The rehearsal counted 244 duplicated methods in 27 classes; that figure can be taken again only after the switch.
- The checker's count and the distance stay 0 and 0 (F-53).

### What the planner found that the plan review did not have

- **Varargs cannot be repaired against the prelude.** A varargs parameter is a function's last parameter that takes any number of arguments, as `println(args: Any...)`. Inside the function it is an array. The prelude has no array type, so a body that reads the parameter is refused there, and the value that a call would pass has no type. The refusal reproduces today, but the repair's test needs the one library. So varargs is a wall of the second kind for its test. It is left out, and it should be the first rung once a program can be compiled against the one library, because `println` needs it.
- **The wall of `DOT` is an old, smaller defect.** The object inherits a method body from another component's trait that is not first in its `extends` list (row 732). A method with type parameters is one case of it.
- **Four walls reproduce in programs of a few lines** against the prelude: the duplicated method, the missing cast, the tuple index and the inherited body. Five new ledger rows hold them (988 to 992).

### The forks you may want to see

Besides fork W, no fork of section 3 is consequential by the `coordinator` skill's rule. Each lands at its default and goes on the review list. Four that you may want first:

- **Fork S, the code generator's output order.** Probe Y found that the order of methods in a class follows the JVM's identity hashes, and asked whether to make it stable first. Default: no rung of its own in this batch. Rung M makes its choice between two bodies by rule, not by order, and shows its tests under two hash modes. A rung for the whole order comes in the batch after, when M and T have landed in the same code. Without it, two compiles of one tree still give different bytes, so jars cannot be compared; no test is known to depend on it once M lands.
- **Fork A1, a `var` field.** It is kept in a cell, as a top-level `var` is, and pays the check before each access that every mutable variable pays (row 641). An immutable field is unchanged. Neither microGPT program declares a `var` field.
- **Fork L1, `exit` out of a loop.** A loop's body can run as several tasks. An `exit` ends the loop: the tasks already started are joined, as P-175 asks, and then the label's block ends with the exit's value.
- **Fork N2, the tie.** `1.0 s`, with `s` an integer variable, fits the float product and the rational product, each only by a conversion. P-46 says that the one that the numeral's default fits runs: the float product. That is what walk does today, and what the two model lines need.

### The carriers

You have not decided which Java class stands for each built-in type (`reviews/carriers-ways-2026-11-13.md`; ways A, C and D stand). No rung here needs that decision, and none is wasted or redone under any of the three ways. One note: under way C or D, a trait with one listed object may later be named by that object's class in compiled code, which makes rung K's cast unnecessary for those few traits. The cast stays right, and stays needed for a trait that lists several types.

### What the batch leaves out

- **Everything that only the switch shows:** the carriers (W2, W12, W13, W14), the trait table's search (W3), `OverloadSet`'s package (W11), `NN32`'s two getters (W4), the second set of run-time classes, the library order of fourteen. They wait for your decisions on the carriers and on the order of the remaining work.
- **Varargs (row 624):** above.
- **`tryatomic` on both paths, an `atomic` block as a later argument (row 322), row 497's test:** behind the first compiled matrix, by the plan review. Their sections are rung Y's in `CLIMB-BATCH-30.md`.
- **The numerals' parser leftovers (rows 960, 963, 957):** behind the first compiled matrix. Their sections are rung C's in `CLIMB-BATCH-30.md`.
- **The array decisions (P-85) and unboxed numbers (P-17, P-84).**

### For the batch after, in this order

1. The kind environment (rows 812 and 822): 4 of the refused declarations, `List`'s among them.
2. The intersection as a receiver (row 540) and the partial type assumption (row 818), in the code that T leaves.
3. The code generator's stable order (fork S).
4. Varargs, as soon as a program can be compiled against the one library.
5. Row 571's own shape, if rung M leaves it open.

### Before the batch runs

- **Your go, and your answer to fork W.**
- **The Fable review of this record** (`references/batch.md`, "The go").
- **The manifest's generator,** `compile-ladder/plan-31/manifest/`, made by the coordinator from `plan-30/manifest/` with this record's values, for two runs.
- **The script's list of atomic programs,** with A's two names.
- **The base build:** `/home/user/fortress-base33` at `84f1c37190`, built, clean and marked by `.base-ready` (PROBES, section 1). Run 1's base is `main`'s head at the launch; while `main` changes only under `explorations/` and `docs/`, its code is the base build's. Run 2 needs a base build of its own at run 1's landing.
- **The disk.** The script stops under 1.5 G a rung plus 4 G: 11.5 G for run 1's five rungs, 7 G for run 2's two. Free on 2026-11-13: 17,867,576 KB by `df -P /home/user`, about 17.0 G (PROBES, section 5). `/home/user/fortress-base32`, `/home/user/fortress-probe-y` and `/home/user/fortress-merge` stand beside the base build; another probe's worktree may still grow.

### Cost

- **Run 1, about 4.6M tokens written, from 3.7M to 5.9M; about 7 hours at two agents at a time.**
  - Workers, about 2.0M: N 0.5M, M 0.5M, L 0.4M, A 0.3M, K 0.3M. Skeptics, about 1.2M; N's runs the count stage itself.
  - The fixed roles, about 1.1M: the disk check, the gather with five rungs and one specification build, the merged-diff review, the gate, the commit stage. A judge and a repair round, about 0.3M.
  - Minutes: N 210, M 220, L 200, A 170, K 150.
- **Run 2, about 2.6M, from 2.1M to 3.4M; about 5 hours.** Workers about 0.9M (T 0.5M, D 0.4M), skeptics 0.5M, the fixed roles 1.0M, a judge and a repair round 0.2M. Minutes: T 220, D 170.
- **The evidence.** Climb batch 30's three rungs and fixed roles wrote 3.13M by the harness's count, 2.92M by its review, 47 % under its estimate (`reviews/batch-30-review.md`, title). Every agent runs on Fable at medium effort (`FABLE_WEEK`).

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision on record; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential fork

**W, walk's half of the numeral rule now or when walk runs the checker:** section 2, "The one question before the launch". Default for the record: (a), walk now. It is consequential because P-59 says that walk "is not changed for it before the switch-over", and (a) reads that sentence as about a value's coercion only.

### Forks the batch takes

None of the forks below is consequential: each builds within a decision on record or chooses where the record leaves an implementation open, and each can be undone.

1. **B1. One record, two runs.** Run 1 is N, M, L, A and K; run 2 is T and D on run 1's landed tree. **Default: so.** Way not taken: one run of seven rungs, in which M and T would edit `CodeGen.generateForwardingFor` and `dumpMethodChaining` together. The reason: `references/batch.md`, "The go".
2. **B2. A's two compiled tests join the atomic runs.** **Default: `AtomicExprCompiled` and `AtomicFieldCompiled`, three runs each at four threads.** The reason: each is a test of a race.
3. **V. Varargs is left out.** **Default: so; first rung once a program compiles against the one library.** Way not taken: a rung that compiles only a declaration whose body does not read the parameter, which no line of the library has. The reason: PROBES, section 2.
4. **S. The stable order of the code generator's output is not a rung of this batch.** **Default: so; M's choice is made by rule and shown under two hash modes; the order's own rung is in the batch after.** Way not taken: a sixth rung in run 1, which would edit the loop that M repairs and `OverloadSet`'s order. What it would cost: one rung, about 0.6M. What breaks without it: jars of two compiles cannot be compared byte for byte; no test is known to pass or fail by the order once M lands.
5. **N1. The prelude is not changed.** It declares no `=` over `Any`, and its `=/=` is each type's own, so the compiled `u = 0` is already `true` there. **Default: so.** The reason: P-37.
6. **N2. Where two applicable declarations are not ordered, the one that the numeral's default fits runs,** whether they differ only at the numeral's position or elsewhere too. **Default: so.** The reason: P-46's words; walk's answer for `1.0 s` and for row 989's reproducer.
7. **N3. `Equality[\T\]` gains `opr =/=(self, other: T): Boolean = NOT (self = other)`.** The library's `=/=` over `Any` stays, and so do the three types' own `=/=`. **Default: so.** The reason: the ways review; the Working Draft's sentence that `e =/= e'` is `NOT (e = e')`.
8. **N4. Row 390's other case stays.** A value's coercion beside `Any` (`p(NarrowOf(1))`) is not the numeral's rule. **Default: the row's whole new line, its numeral case gone.**
9. **M1. A trait's own declaration replaces an inherited body at the same parameter types.** The class's method forwards to the trait's own body, and no second method is written. **Default: so.** The reason: the specification's method declarations; P-47 relies on it; walk runs the trait's own.
10. **M2. A method that an api declares without `abstract` has a body in its component,** so an object that inherits it gets a forwarder to the trait's class. **Default: so.** The reason: with the trait first in the `extends` clause the same call runs today.
11. **L1. An `exit` leaves through the loop's body as an abrupt completion that names its label,** each evaluation of a label block having its own identity; a parallel loop joins the arms that it forked first. **Default: so.** The reason: walk's `forLabel` and `forExit`; P-175.
12. **L2. A closure's class is named by its source position and its number among the closures of that position.** **Default: so; a closure alone at its position keeps today's name.** The reason: tests and the class loader read today's names.
13. **A1. A `var` field is kept in a cell, as a top-level `var` is;** a `var` value parameter too. **Default: so.** Way not taken: a location keyed by the object and the field. The reason: the code's own way for a mutable variable (run 2 of `CLIMB-BATCH-30.md`, fork Y2). The one library's `var` fields are of both forms: `OneShot(var canTryIt: Boolean)` and the generic `Box[\T\](var val: T)` as value parameters, and `String.fss`'s as fields of an object's body; a cell holds any of them.
14. **K1. The cast is emitted only where the value's static type is not a subtype of the declared type by the `extends` clauses,** so a call that verifies today keeps its bytecode. **Default: so.**
15. **T1. A tuple-typed parameter keeps today's convention, its elements as separate JVM parameters, and a bridge method joins the instantiated signature to it.** **Default: so, if the worker's reading of row 832 allows it; else the worker reports the other way before building it.** Way not taken: one boxed tuple everywhere, which changes every compiled method with a tuple parameter. The reason: 1,558 compiled tests run on today's convention.
16. **D1. Each name of a tuple binding is a top-level variable of its element's type; the right side is evaluated once.** A numeral element takes its default at an untyped name (P-173). **Default: so.** The reason: `variables.tex`, the tuple notation; walk.
17. **D2. D's code-generator half is built only for a top-level binding.** A local tuple binding already compiles (row 474). **Default: so.**

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code that the rung rests on. A line citation is the base build's, `84f1c37190`. Run 2's sections are read again against run 1's landed tree before run 2's launch. The record's forks are section 3's. The reproducers are in `explorations/compile-ladder/plan-31/probes/planner/`; a test is written new in the test folders, and no file is moved from there.

### N. A numeral at a call goes to the most specific declaration that takes it, by its own conversion if need be, its default the last resort: `u = 0` is `true` for a zero `u` of `NN32`, on both paths (P-46, P-49, P-173)

**The mission.** A numeral has no value of its own when a program runs: it becomes a value of the type that its place fixes, or of its default. At a call, a numeral fits a parameter of type `Any` at its default, so the library's `=` over `(Any, Any)` took `u = 0` before `NN32`'s own `=` was tried, and answered `false`. The decision on record changes the rule for a numeral at a call (P-46, P-49). You build it.

**The decisions this rung builds.** P-46, P-49, P-173; P-174, P-168 and P-165, which stay; P-59 as fork W reads it; P-148 for your checker edit. Section 3's fork W at its default and forks N1 to N4.

**What you build, in order.**
1. **The checker.** In `scala_src/typechecker/impls/Functionals.scala`, a call with a numeral argument compares the attempt by subtyping with the attempt by the numeral's own coercion: the most specific applicable declaration runs; of two not ordered, the one that the numeral's default fits. A value's coercion stays as it is. Tests first, compiled, under the prelude:
   - `ProjectFortress/compiler_tests/NumeralMostSpecificCompiled.test`: `k(5)` for `k(x: Any)` beside `k(x: NN32)` prints `nn32` (today the run dies, 'NoSuchMethodError … \=k{…}(fortress.AnyType$Any)', row 390's numeral case); a program's `same(a: Any, b: Any)` beside `same(a: NN32, b: NN32)` on `(u, 0)` and `(0, u)`; `k(a)` for `a: Any` still runs the `Any` declaration; `gg(5, w)` of P-173 still runs the `ZZ32` declaration.
   - `ProjectFortress/compiler_tests/NumeralTieDefaultCompiled.test`: row 989's program prints `rr64` (today 'Ambiguous coercion in call to function mul').
   - `compiler_tests/NumeralStaticDesignCompiled` is a guard.
2. **Walk** (fork W). In `interpreter/evaluator/values/OverloadedFunction.java`, `bestMatchForNumerals` and what it calls follow the same rule, and the dispatch cache's keys tell apart what the rule tells apart. Tests first: `tests/XXXNumeralEqualsNumberWalk.fss` and `tests/XXXNotEqualNumeral.fss` promoted, the first with `h: QQ = 1/2`, `h = 0.5` added (PLAN's line on the test owed); `tests/NumeralMostSpecificWalk.fss` with step 1's programs, a `case u of 0 => …` (row 975) and a program's own number type (row 976).
3. **The library.** `Equality[\T\]` in `Library/FortressLibrary.fss` and its api gains `=/=` (fork N3). Study first how the library's order traits give an operator beside a catch-all.
4. **The list.** Before step 1's edit lands in your tree, list the one library's overload sets where one position has a type that fixes no type for a numeral and another declaration has a number type other than the default's there, since each changes its choice. Report it. A changed choice on a model line is reserved.
5. **The model lines.** `explorations/compile-ladder/plan-31/probes/model-closure/run.sh check <out> <dir> NumeralLine.fss`, on the base and on your tree: three refusals, then none. It is a run to report, not a gated test.
6. **The whole suites** where the skill's `tests-running.md`, "When to run a whole suite", asks for them: your edits reach every call with a numeral on both paths.
7. **The stages and the timing,** once on your final tree: the count stage and the distance stage against climb batch 30's gate (`explorations/compile-ladder/climb-batch-30/gate/`), 0 and 0 with `#crash none`, and P-148's runs.

**Rows.** Read each with `ledger.py show N` first. Close 973, 966, 975, 976 and 989. Row 390's whole new line (fork N4).

**Specification.** Your change makes these false; bring them in line, and build the specification as the skill's `specification.md` gives it:
- `Specification/basic/conversions-coercions.tex:111-117`, "At a call, a numeral is applicable without coercion to a parameter of its default type and to a parameter of a type that fixes no type for it; its conversion into any other type is a coercion", and the example after it;
- the Effect of Appendix I's `revival-numerals`, `Specification/appendices/changes.tex:5286-5298`, the clause of rows 966 and 973, and the sentence on `=/=` near `:3813-3825`.

**Files.** `scala_src/typechecker/impls/Functionals.scala` and what it calls in `scala_src/typechecker/`; `interpreter/evaluator/values/OverloadedFunction.java`, `Coercions.java`, `Numerals.java`; `Library/FortressLibrary.fss` and `.fsi`, `Equality` only; your tests; the specification's sentences named. Not: `compiler/codegen/`, the prelude, microGPT.

**Reserved points.** A model line. A change of what a value's coercion chooses. A change of the default.

**Overlaps by file.** None with M, L, A or K.

### M. The methods that a trait's or an object's class inherits: one method written once where a generic trait gives a body to a method that it also inherits with a body, and a forwarder for a body inherited through an api's trait that is not first, a generic method's among them (rows 990, 732 and 571)

**The mission.** A class inherits through the JVM only from the first trait that its declaration extends. For every other trait the code generator writes forwarders, methods that call the inherited bodies (`CodeGen.dumpMethodChaining`). The rehearsal of the switch-over met two defects of that step on the one library: 244 methods written twice into 27 classes, each a `ClassFormatError` at load (its W6), and no body for `Indexed`'s `map` on a range object, the wall of the library's `DOT` and `SUM` (its W16). Both reproduce under the prelude in a few lines (`explorations/compile-ladder/plan-31/PROBES.md`, section 2). You repair both.

**The decisions this rung builds.** P-47, whose library shape is the first defect's; P-149 and P-147, which stay. Section 3's forks M1 and M2.

**What you build, in order.**
1. **One method once** (fork M1; row 990). Where a trait declares a method with a body at the parameter types of a body that it inherits, at the instance that its `extends` clause gives, its class holds one method, which runs the trait's own body. The choice does not depend on the order in which the methods are gathered: the rehearsal's first hack kept the first copy and failed after an unrelated rebuild. Test first, `ProjectFortress/compiler_tests/TraitOwnMethodBesideInheritedCompiled.test` (`compile`, `link`, `run`), from `PDupMethod3.fss`: it prints 2, -1, true, false, as walk does; add the library's own shape, an operator declared in three levels, as `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below them. Seen failing on the base: 'ClassFormatError: Duplicate method name "mx?0"'.
2. **A body inherited through an api's trait** (fork M2; row 732). Test first, `compiler_tests/ApiTraitMethodNotFirstCompiled.test`, with its api and component beside it as `VarargsExportMethod` has: from `GenApi` and `PGenUse4.fss`, a plain method and a generic method of an api's trait that is second in an object's `extends` clause, each called on the object and through a variable typed by the trait; and the same with the trait reached through a trait of the program. Seen failing on the base: 'AbstractMethodError … does not define or inherit an implementation'.
3. **Row 571's test,** `XXXFunctionalMethodMeetNarrowedSelfNotFirst`: promote it if your repair reaches it; else report what remains.
4. **The two hash modes.** Compile and run step 1's and step 2's programs once more with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` added to the compile's `JAVA_FLAGS`. Report both outputs. It is a run to report, not a gated test.
5. **The whole compiled suite once,** `ant testFast`: your edit reaches every compiled trait and object.

**The stages.** None. List your files (`STAGE_BLIND`). Run `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` once on your final tree and report its exit.

**Rows.** Close 990 and 732; 571 closed, or a note on what remains.

**Specification.** No Effect of Appendix I and no note names these rows. List each sentence your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java` from `dumpTraitDecls` through `dumpOverloadedMethodChaining` and what follows it up to `genParallelExprs` (`:769-1690`); `scala_src/useful/STypesUtil.scala`, the helpers that list a type's methods; your tests. Not: the rest of `CodeGen.java`; `compiler/OverloadSet.java`; the prelude; the one library; microGPT.

**Reserved points.** A model line: none. A change of which declaration a dispatch method reaches. A change to the one library's text.

**Overlaps by file.** L, A and K edit `CodeGen.java` too: "The rule the rungs keep".

### L. `label` and `exit` on the compiled path, and two closures at one source position: an `exit` leaves its label's block with its value, also from inside a loop's body, and each closure class gets a name of its own (rows 81 and 315)

**The mission.** Two walls stand on the path of a one-line program against the one library, and both show under the prelude. The code generator has no case for `label` and `exit` (row 81), and the one library's `Indexed`, above every string and array, holds one in `indexOf`. And a closure's class is named by its source position alone, so two closures at one position stop the jar's write (row 315); the one library's `LexicographicOrder` and `List` meet it.

**The decisions this rung builds.** P-175, for an `exit` out of a parallel loop. Section 3's forks L1 and L2. The specification's section "Label and Exit" is the standard, and walk's `forLabel` and `forExit` the precedent.

**What you build, in order.**
1. **`label` and `exit`** (fork L1; row 81). Test first, `ProjectFortress/compiler_tests/LabelExitCompiled.test`, printing `PASS` or `FAIL`: `PLabel.fss`'s `exit … with` out of a `while`; an `exit` with no value; an `exit` out of a `for` over a range, the form of `Library/FortressLibrary.fss:2188-2194`, at one thread and at four, with the label's value one of the values that an iteration exits with; a label nested in a label, the inner `exit` naming the outer; a label as a function's whole body with several `exit`s (`Library/String.fss:148-158`); an `exit` inside a `try` with a `catch` of every exception, which does not catch it. Seen failing on the base: 'Can't compile Label'.
2. **The closure's name** (fork L2; row 315). Test first, `compiler_tests/ClosureSamePositionCompiled.test`: the row's two programs, `5 :OP: 6` over three overloads of `opr OP`, and `sz(fn () => 2147483646 + 1)`. Seen failing on the base: 'ZipException: duplicate entry'.
3. **The whole compiled suite once,** `ant testFast`, since a closure's name reaches every compiled closure.

**The stages.** None. List your files (`STAGE_BLIND`). Run the distance stage's shadow patch once on your final tree, as rung M's section gives it, and report its exit.

**Rows.** Close 81 and 315.

**Specification.** No Effect of Appendix I names these rows. List each sentence your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`: new members for the label block and the exit, put directly above `defaultCase` (`:1776`); `forFnExpr` (`:3643-3707`) and the naming in `forLetFn`; `compiler/NamingCzar.java`, `gensymArrowClassName`; a run-time class for the exit under `runtimeSystem/` if you need one; your tests. Not: `forAtomicBlock`, `forTry`, `genParallelExprs`; `runtimeSystem/BaseTask.java` and `Transaction.java`; microGPT.

**Reserved points.** A model line: none. A change to a class name that a test or the class loader reads, beyond a second closure's.

**Overlaps by file.** M, A and K edit `CodeGen.java` too: "The rule the rungs keep".

### A. `atomic` as an expression, and a mutable field inside a transaction: the form of the one library's `OneShot` (rows 875 and 319)

**The mission.** Climb batch 30 repaired the compiled transaction and the handler of an `atomic` block. Two pieces of its unlaunched second run stand on the switch-over's road, because `Library/OneShotFlag.fss:18` writes both in one line and `List` imports it: the code generator has no case for an `atomic` expression (row 875), and a mutable field is read and written outside the transaction (row 319). You build both on the landed code.

**The decisions this rung builds.** P-169, whose store and slots stay as they are. Section 3's fork A1. Not yours: `tryatomic`, an `atomic` block as a later argument (row 322), plain writes beside a block (row 948).

**What you build, in order.** Each compiled test prints `PASS` or `FAIL`, seen failing first and passing at one thread and at four.
1. **The atomic expression** (row 875). `ProjectFortress/compiler_tests/AtomicExprCompiled.test`: `atomic if … end` over a `var` value parameter, `OneShot`'s form, called from a parallel `for`; exactly one iteration wins; an atomic expression whose value is a number, over a top-level `var`. Seen failing on the base: 'Can't compile AtomicExpr'.
2. **A mutable field** (fork A1; row 319). `compiler_tests/AtomicFieldCompiled.test`, from `PFieldAtomic.fss`: 40,000 `atomic do n := n + 1 end` on a field from a parallel `for`, exact; the same on a `var` value parameter and on the `var` value parameter of a generic object, the form of `Box[\T\](var val: T)`; a field read twice in one block beside blocks that write it; an immutable field read as before. Seen failing on the base at four threads: 29,456 and 39,276 of 40,000.
3. **The atomic programs** on your final tree, as the skill's `gate.md` gives them, and the whole compiled suite, since every object's fields pass your code.

**The stages.** None. List your files (`STAGE_BLIND`). Run the distance stage's shadow patch once on your final tree, as rung M's section gives it, and report its exit.

**Rows.** Close 875 and 319.

**Specification.** List each sentence your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`: a new member for the atomic expression, put directly below `forAtomicBlock` (`:1835-1868`), and the fields' declarations in `forObjectDeclPrePass` (`:4850-4862`); `compiler/codegen/VarCodeGen.java`, `MutableFieldVar`; your tests. Not: `forAtomicBlock`'s own body and `forTry`; `dumpMethodChaining`; `runtimeSystem/Transaction.java`; walk; microGPT.

**Reserved points.** A model line: none. A change to an immutable field's code. A change to a plain read or write of a variable outside `atomic`.

**Overlaps by file.** M, L and K edit `CodeGen.java` too: "The rule the rungs keep".

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

**Specification.** `Specification/appendices/changes.tex:4312` names row 695: bring its sentence in line if the row closes. `changes.tex:1676` and `Specification/basic/inference.tex:458` name row 307: leave them unless `XXXNatOpenRun` passes.

**Files.** `compiler/codegen/CodeGen.java`: `conditionallyCastParameter` (`:7208-7240`) and its callers' arguments to it, the returned value in `generateFunctionalBody`, and a new member put directly above `conditionallyCastParameter`; your tests; the specification's sentence named. Not: `evalArg`'s forking; `dumpMethodChaining`; `forAtomicBlock`; microGPT.

**Reserved points.** A model line: none. A cast at a place that verifies today.

**Overlaps by file.** M, L and A edit `CodeGen.java` too: "The rule the rungs keep".

### T. A method whose one parameter is a tuple: an object's body at a tuple type implements its generic trait's method over a type parameter, a generic method takes a tuple, and a postfix operator takes a tuple operand (rows 992, 832 and 819)

**The mission.** The code generator passes a tuple-typed parameter's elements as separate JVM parameters. A generic trait's method over a type parameter takes one value. Where the type parameter is a tuple type, the two do not meet: the object's class fails verification, and with the verifier off no method implements the trait's (row 992). It is the wall of every array of rank 2 and 3 of the one library, `m[i,j]` (the rehearsal's W15, where no hack got past). Rows 832 and 819 are the same confusion at a generic method's call and at a postfix operator's.

**The decisions this rung builds.** P-156. Section 3's fork T1. You build on rung M's landed forwarders.

**What you build, in order.**
1. **The trait's method at a tuple type** (fork T1; row 992). Test first, `ProjectFortress/compiler_tests/TupleIndexMethodCompiled.test` (`compile`, `link`, `run`), from `PTupleIndex.fss`: `get` and `offset` over `I` at a pair and at a triple, called from the trait's own body and on the object; a body that destructures its tuple; an indexed assignment's form, a method of `(I, E)`. Seen failing on the base: 'VerifyError … is not assignable to FZZ32'.
2. **A generic dotted method with one tuple parameter** (row 832). Test first, from the row's program: `Box[\ZZ32\](1).first[\ZZ32\]((2, 3))` and `wrap[\(ZZ32,ZZ32)\]((2, 3))`.
3. **A postfix operator on a tuple operand** (row 819). Test first, from the row's probe text: `opr (x:(ZZ32,ZZ32))! : ZZ32` and an operator that applies it.
4. **The whole compiled suite once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the distance stage's shadow patch once on your final tree and report its exit.

**Rows.** Close 992, 832 and 819.

**Specification.** `Specification/appendices/changes.tex:3204` names row 832: bring its sentence in line.

**Files.** `compiler/codegen/CodeGen.java`: `generateForwardingFor`, `forMethodInvocation`, `receiverPrependedDomainType`, the operator application's call; `compiler/NamingCzar.java`, the methods' signatures; your tests. Not: `forVarDeclPrePass`, which is D's; the one library; microGPT.

**Reserved points.** A model line: none. A change of a compiled method's JVM parameters where no tuple-typed parameter stands.

**Overlaps by file.** D edits `CodeGen.java` in `forVarDeclPrePass` only.

### D. A top-level tuple binding on the compiled path: the checker types each name by its element, and the code generator declares each name (rows 988 and 474)

**The mission.** The model program binds its hyperparameters as tuples, `(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`, the form that the decisions on record keep for it (P-9). Under walk it runs. On the compiled path it stops under either library: 'Result of typechecking still contains intermediate nodes' (row 988); the checker types each such name so that it is accepted anywhere (row 474); and the code generator throws 'tupled lhs not handled' (`CodeGen.forVarDeclPrePass`).

**The decisions this rung builds.** P-9, P-87, P-173; P-148 for your checker edit. Section 3's forks D1 and D2.

**What you build, in order.**
1. **The checker** (rows 988 and 474). Each name of a top-level tuple binding has its element's type. Tests first: `ProjectFortress/compiler_tests/TopLevelTupleBindingCompiled.test` (`compile`, `link`, `run`), from `explorations/compile-ladder/plan-31/probes/model-closure/TupleTopPlain.fss`: integers and floats, used in arithmetic; a typed binding; a right side that is a call; and a checker test, `z: String = headDim` refused, which row 474 says passes today.
2. **The code generator** (fork D1). Each name is declared as a top-level variable is; the right side is evaluated once.
3. **The model's lines.** `explorations/compile-ladder/plan-31/probes/model-closure/run.sh check` over `MicroGptFlat.fss`'s closure, as `model-closure-check.md` gives the command, before and after: lines 17 to 19. A run to report.
4. **The stages and the timing,** once on your final tree: the count stage and the distance stage against run 1's gate, and P-148's runs.

**Rows.** Close 988 and 474.

**Specification.** List each sentence your change makes false, or none.

**Files.** `scala_src/typechecker/`, where top-level variables are typed (`Thunker.scala` and what it calls); `compiler/codegen/CodeGen.java`, `forVarDeclPrePass` and its caller; your tests. Not: the rest of `CodeGen.java`; walk; microGPT.

**Reserved points.** A model line. A change of how a single top-level binding or a local tuple binding is typed.

**Overlaps by file.** T edits `CodeGen.java` outside `forVarDeclPrePass`.

### The rule the rungs keep, and how they meet

- **Run 1.** N shares no file with the other four. M, L, A and K share `compiler/codegen/CodeGen.java`, by declaration:
  - M: `dumpTraitDecls` through the code before `genParallelExprs` (`:769-1690`); a new member goes directly above `dumpMethodChaining` (`:926`).
  - L: new members directly above `defaultCase` (`:1776`); `forFnExpr` (`:3643-3707`) and the name in `forLetFn` (`:3829`).
  - A: a new member directly below `forAtomicBlock` (`:1868`); the fields in `forObjectDeclPrePass` (`:4850-4862`).
  - K: `conditionallyCastParameter` (`:7208-7240`), the returned value in `generateFunctionalBody` (`:2880`), a new member directly above `conditionallyCastParameter`.
  - The gather applies N, then M, L, A and K: of two rungs that share a file, the one whose lowest edited line is lower goes first (`climb-batch-workflow.md`, "Gather", "The order").
- **The distance stage's shadow patch** (`explorations/coordinator/tools/distance/shadow-patch.py`) edits a copy of `CodeGen.java` by text. A rung that edits `CodeGen.java` runs it once and reports its exit; if it no longer applies, the rung reports the lines, and the gather repairs the tool.
- **Run 2.** T and D share `CodeGen.java` only, in declarations far apart. The gather applies T, then D.
- **They meet on the merged tree:** the suites, the atomic runs with A's two programs, the ladder and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks, which read N's rule under walk.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief, piece by piece, with its home here. "Under the prelude" says whether the piece's reproducer runs there today.

- **Varargs (row 624):** out (fork V). Its refusal reproduces under the prelude (`XXXVarargsCodeGeneration`); a test of its repair needs the one library (PROBES, section 2).
- **`label` and `exit` (row 81):** L. Under the prelude: yes.
- **A closure class written twice (row 315's kind):** L. Row 315's own reproducers run under the prelude; the library's form does not (it needs `zip` and `BIG AND`), and the measure shows it.
- **One method written twice, with the wrong forwarder (row 571's kind):** M, as row 990. Under the prelude: yes.
- **The missing cast at a `comprises` type (rows 307 and 695's kind):** K, as row 991. Under the prelude: yes.
- **The bridge for a method over a tuple index type (row 832's kind):** T, in run 2, as row 992. Under the prelude: yes, as a `VerifyError`.
- **A generic method inherited from another component's trait (rows 495, 496 and 732's kind):** M. It is row 732's defect; rows 495 and 496 are another one, the dispatch among overloaded generic methods, and are not in this batch. Under the prelude: yes.
- **The other refused kinds:** row 875 in A; row 819 in T; rows 822 and 812, and row 540, in the batch after. Rows 812, 819 and 540 name reproducers under the prelude; row 822 is not reproduced apart from the library.
- **From run 2 of climb batch 30:** `atomic` as an expression and a field inside a transaction, A; a number `=` a numeral, N; the rest waits (section 2, "What the batch leaves out").
- **The top-level tuple binding:** D, in run 2; row 988 filed.
- **The measure:** section 2, "The measure", and PROBES, section 3.

### The planner's probes

`compile-ladder/plan-31/PROBES.md` holds each with its commands and output: the base build; each wall under the prelude; the measure, 24 in 8 kinds; the briefing keys; the disk.

**Not run:** a suite, a stage or a timing.

### Rows filed by plan

Five, by the planner, with `ledger.py add`: 988 (the top-level tuple binding, the plan review's draft), 989 (the float numeral beside a value, the plan review's draft with a reproducer under the prelude), 990 (the method written twice), 991 (the cast at a `comprises` type), 992 (the method over a tuple index type). A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

Not filed, each another probe's draft: `NN32`'s two getters (the rehearsal's W4), the code generator's order by identity hashes and the compile that writes no jar (probe Y). They are for the coordinator's routing.

### Left out, each with its home

Section 2, "What the batch leaves out" and "For the batch after". Their homes: the walls of the second kind, PLAN's phase 4 and the curator's two decisions; varargs, row 624 and PLAN's phase 4; `tryatomic`, rows 322 and 497, and rows 960, 963 and 957, `CLIMB-BATCH-30.md`'s rungs Y and C, behind the first compiled matrix; rows 812, 822, 540 and 818, the batch after.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 30: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-31/manifest/` is the coordinator's, made from `plan-30/manifest/`, with `--run 1` and `--run 2` choosing the block's rungs:

- run 1: `BATCH` `31`, the folder `compile-ladder/climb-batch-31/`, the rungs N, M, L, A, K in that order; run 2: `BATCH` `31b`, `compile-ladder/climb-batch-31b/`, the rungs T, D;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backtick or a double quote;
- no rung declaring a count, a crash or a move;
- N's and D's sections naming the two stages; M, L, A, K and T `STAGE_BLIND`.

### What every agent reads first

**Run 1.** This run is climb batch 31, the first of the two runs of the record CLIMB-BATCH-31.md: the walls between today's tree and a compiled program on the interpreter's library that a test against the compiler's prelude can show today. A wall is a place where the compiler or the compiled library stops; a probe that switched a scratch tree onto the interpreter's library met sixteen, and these rungs repair those that need no switch to be seen. Its rungs:

- N, a numeral at a call goes to the most specific declaration that takes it, on both paths, so that u = 0 is true for a zero u of NN32;
- M, the methods that a class inherits: one method written once where a generic trait gives a body to a method that it also inherits, and a forwarder for a body inherited through an api's trait that is not first;
- L, label and exit on the compiled path, and a name of its own for each closure class;
- A, atomic as an expression, and a mutable field inside a transaction;
- K, the cast where a trait's value stands for the type that its comprises clause lists.

Each rung has tests that fail on the base and pass after, compiled against the prelude. M, L, A and K share CodeGen.java by declaration: each keeps to its own, as its section says. N runs the count stage and the distance stage once on its final tree, with the checker's timing; the others run neither. microGPT changes no line, and its quick checks under walk stay 7 of 7. The gather applies N, M, L, A, then K, builds the specification once, and runs the 52 team demos on the merged tree. The gate's atomic runs hold two new programs.

**Run 2.** This run is climb batch 31b, the second of the two runs of the record CLIMB-BATCH-31.md, after climb batch 31, which landed rungs N, M, L, A and K. Its rungs:

- T, a method whose one parameter is a tuple: an object's body at a tuple type implements its generic trait's method over a type parameter, the wall of every array of rank 2;
- D, a top-level tuple binding, the form of the model program's hyperparameters.

T and D share CodeGen.java in declarations far apart. D runs the count stage and the distance stage once on its final tree, with the checker's timing; T runs neither. microGPT changes no line. The gather applies T, then D.

### Before the launch

The coordinator, for run 1, after the curator's go:

1. **Fork W:** the curator's answer. At (a), N's section stands as written. At (b), step 2 of N's section is struck, with rows 973, 966, 975 and 976 left open and their clauses of the specification kept.
2. **The Fable review of this record,** its changes in place.
3. **The script:** A's two programs in the atomic list; then the generator, its checks and the splice, as the manual's "Before the launch", step 4, gives them. The base is `main`'s head after that commit.
4. **The base build:** `/home/user/fortress-base33`, if `git diff --stat 84f1c37190 <base> -- . ':!explorations' ':!docs'` prints nothing; its trial seed and the old code's run.
5. **The disk:** 11.5 G or more free; `git status --porcelain` empty in the main tree.
6. **Check-ins** for about 7 hours, 45 minutes apart (`<scratchpad>/batch31/checkins.txt`).

For run 2, after run 1's landing and its routing: sections T and D read again against the landed tree; a base build at that tree; then steps 3 to 6 with `--run 2`, 7 G free, about 5 hours.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base33'}})` for run 1, and the same with run 2's base and its base build for run 2. The arguments of each are kept byte for byte.

### The gate, and what it should show

The comparands for run 1 are climb batch 30's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, `#crash none`), in `compile-ladder/climb-batch-30/gate/`; for run 2, run 1's.

- `testSystem`: the comparand's count, with N's one new walk test; N's two promotions keep the count.
- `testFast`: the compiler track's count plus N's two, M's two, L's two, A's two and K's one new tests, with the promotions keeping the count; the library track unchanged.
- The atomic runs: the comparand's programs and A's two, each three times `PASS`.
- The ladder: no rung declares a move. N's rule reaches its programs' calls with numerals: a changed output is traced to N.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each.
- **The measure,** once after each run's landing, by the coordinator or the post-batch reviewer in a scratch worktree: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Before: 24 in 8 kinds. If a rung's edit of `NamingCzar.java` stops the measure's patch from applying, the patch's hunk is brought in line by hand.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Run 1, closed:** 973, 966, 975, 976, 989 (N); 990, 732, and 571 if it passes (M); 81, 315 (L); 875, 319 (A); 991, and 695 if the cast reaches it (K). **Rewritten:** 390 (N).
- **Run 2, closed:** 992, 832, 819 (T); 988, 474 (D).

### After the landing

- **PLAN:** phase 4's F-34 line with the new count and its kinds by row, rows 81, 315 and 540 on it; a line that varargs waits for a program compiled against the one library; phase 5's lines for the tuple binding and the model's line 82 (the plan review's 6.2, lines 2 and 3) answered by D and N; climb batch 30b's line replaced by this record's two runs and what waits behind the first compiled matrix.
- **The review queue:** this record's forks as new items; fork W's answer.
- **The post-batch review** of each run.

### For the record-landing workflow

The batch edits no FACTS or POSITIONS entry. After run 1, these are false:

- **F-34:** "refuses 38 declarations of the fourteen components … in 10 kinds", and its kinds; the new figure is the measure's after the landing.
- **P-46:** its sentence "Rows 973 and 966: walk answers `false` for `u = 0`, and `true` for `u =/= 0`", with fork W at (a). **P-173:** "rows 973 and 966 hold where walk departs", the same.
- **P-59,** if fork W lands at (a): it gains the numeral's case, that walk's choice for a call with a numeral follows P-46 before the switch-over.
- **F-19** and the entries that name rows 319 and 875 as open: a mutable field is inside the transaction, and the atomic expression compiles.
- The entries that name rows 81, 315, 732 and 695 as open; F-349's sentence that walk's rule on a declaration that fits a numeral as it is "is apart from it".
- After run 2: P-9's and PLAN's sentences that the tuple binding does not compile, if any names it; the entries that name rows 474, 832 and 819 as open.

### For the skill writer: the sentences of `fortress-repo` this batch makes false

The batch writes no skill text. After the landings, the record-landing workflow's skill writer brings these in line (each at `84f1c37190`).

After run 1:

- `references/revival-changes.md`, "Numbers": "Under walk it is `false` (row 973): bind the numeral at the value's type first, as `z: NN32 = 0`, then write `u = z`." (N, with fork W at (a))
- `references/revival-changes.md`, "Numbers": "Where the tied declarations differ only at the positions of the call's numerals, both paths read the numeral as its default.": the tie also holds where they differ elsewhere (N).
- `references/revival-changes.md`, "Dispatch and overloading" and `SKILL.md`, "Fortress as a language": "A conversion never changes which declaration runs when one already fits.": a numeral's own conversion does (N).
- `references/compiler.md`, "What the compiled path cannot compile yet": "`label` and `exit`, `spawn`, and `atomic` used as an expression" in the list of constructs without a case: `spawn` alone stays (L, A).
- `references/compiler.md`, "The runtime": "The compiled code keeps each mutable variable in a cell …": a `var` field is such a variable too (A).
- `references/compiler.md`, "Traps of the compiled path": the two calls that "die at run time with `NoSuchMethodError`", its first item, if K's step 3 promotes row 815's case.
- `references/revival-changes.md`, "Traits and objects": "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695).", if K's step 2 lands; "Static parameters": "A compiled call fails the JVM's verification if it passes a value of such a trait where a listed type is expected (row 307).", only if `XXXNatOpenRun` passes.
- `references/gate.md`, "The atomic runs": the count and the list of names, with A's two.
- `references/interpreter.md`, walk's departures from "Numbers": the items of rows 973, 966, 975 and 976 (N, with fork W at (a)).

After run 2:

- `references/compiler.md`: no sentence names rows 992, 832 or 819; a sentence that advises single bindings for a top-level tuple, if one stands by then (D).

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-30.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-30.md), [the rehearsal](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), [probe Y](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/probe-y.md), [the plan review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/plan-review-2026-11-10.md), [the carriers' ways](https://github.com/palimondo/fortress/blob/main/explorations/reviews/carriers-ways-2026-11-13.md), [the numeral ways](https://github.com/palimondo/fortress/blob/main/explorations/reviews/numeral-equality-ways-2026-11-10.md), [climb batch 30's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-30-review.md), [the model's closure check](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/model-closure-check.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/PROBES.md), [the probe programs](https://github.com/palimondo/fortress/tree/main/explorations/compile-ladder/plan-31/probes/planner), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md).
- Code: [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [VarCodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java), [NamingCzar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java), [Functionals.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala), [OverloadedFunction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), [Evaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [OneShotFlag.fss](https://github.com/palimondo/fortress/blob/main/Library/OneShotFlag.fss).
- Specification: [label.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/label.tex), [atomic.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/atomic.tex), [traits.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/traits.tex), [variables.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/variables.tex), [conversions-coercions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/conversions-coercions.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
