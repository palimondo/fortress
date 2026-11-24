<!-- The record of climb batch 36, in two runs (climb batch 36 and climb batch 36b), for the coordinating session, the curator and the batch's workers: the list that climb batch 35b's review left, in the brief's order of priority. Run 1, four rungs: the checker's choice among a call's declarations by their signatures as declared, in an order that no hash decides, a tie the rules leave a static error (K, rows 1100, 935, 1112, 1127 and 543, with the gate repair's special case removed); three of walk's departures, two generic dotted methods that differ only in their bounds, a tuple result between two generic declarations, and a numeral type written as a return, a variable's or a field's type (G, rows 1125, 1122 and 1124); a numeral coercion's four numbers converting where they stand, with no getter, on both paths (N, P-174); three walls of a compiled program against the one library (C, rows 994, 1091 and 1099, with `Arr` and `Dot` as run tests). Run 2, four rungs on run 1's landed tree: the getter `asRR64` in place of `asFloat` (F, P-165); the one library's run-time names (Y, rows 1101, 1102 and 1103); `⊕`, `⊼`, `⊽` and `majority` in the one library (B, row 1121); walk's `tryatomic` that wraps an exit or an exception (T, rows 1110 and 1111). -->
<!-- History. Drafted 2026-11-24 by the planning worker of climb batch 36, on Opus, against `main` with the code of `4b0e3abd6a` (the base build `/home/user/fortress-wsuite`; `git diff --stat 4b0e3abd6a HEAD -- . ':!explorations' ':!docs' ':!.claude'` printed nothing on `98b96c0b04`). -->
<!-- **The go.** The curator's go, at 00:2x UTC on 2026-11-24: "approved for the next batch with planner's defaults after Fable review. Go overnight." The batch launches after the Fable review of this record, every fork at its default; a fork whose default would reverse a decision of his holds the batch (the `coordinator` skill's `references/batch.md`, "The go"). This record finds none. -->
<!-- Sources: the planner's brief (`<scratchpad>/batch36/planner-36-brief.md`); `reviews/batch-35b-review.md`, Part 5, "The batch after", and "The steps due before the batch after"; `PLAN.md`, phase 4's line for climb batch 35b; POSITIONS P-180, P-174 with its history, P-173, P-165, P-146 with its history, P-157, P-60, P-45, P-37, P-12, P-87, P-79, P-103, P-148; FACTS F-26, F-53, F-76, F-225, F-232, F-253, F-324, F-341, F-342, F-345, F-347, F-377, F-396, F-403, F-405; review-queue items 58, 503, 616 and 617; `compile-ladder/climb-batch-35/REPAIR-gate.md`; the ledger rows named in section 1, and rows 1128 and 1129 from the coordinator's message of 2026-11-24; `Specification/basic/overloading.tex`, "Overloading Resolution"; the `coordinator` skill's `references/batch.md`, "The go" and "The workflow"; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; `CLIMB-BATCH-35.md` for the form. -->
<!-- The planner's probes: `compile-ladder/plan-36/probes/fixes-36.md`, with its programs in `programs/` and two patches beside it, run in a worktree of the planner's own, `/home/user/fortress-p36`, seeded from the base build and removed after. Every defect that a rung takes was reproduced there on the base, under walk, compiled against the prelude, or compiled against the one library through `old-fortress.sh`; an instrumented checker counted the ties over the one library and the compiled suite, and one marked hack sized rung K. No timing ran; the distance stage and the compiled suite's `compiler_tests/` ran twice each, as probes. -->

# Climb batch 36

## 1. The manifest, rung by rung

The batch's generator writes each run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. Run 1, climb batch 36, holds K, G, N and C in that order; run 2, climb batch 36b, holds F, Y, B and T. No two rungs of a run are expected to edit one declaration; where two rungs of run 1 reach one file, section 4, "The rule the rungs keep", gives each its members. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-36.md#`, PRB for `doc:explorations/compile-ladder/plan-36/probes/fixes-36.md#`, SPEC for `doc:Specification/`, and SRC for `code:ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main`, each of the 65 distinct keys matching one place, REC's on this record as committed.

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | K | `rung-checker-most-specific` | The checker chooses among a call's declarations by their signatures as declared, in an order that no hash decides | 300 |
| 1 | G | `rung-walk-bounds-tuple-numeral-type` | Three of walk's departures: methods that differ only in their bounds, a tuple result, and a numeral type written | 150 |
| 1 | N | `rung-numeral-coercion-body` | A numeral coercion's four numbers convert where they stand, on both paths | 270 |
| 1 | C | `rung-one-library-run-walls` | Three walls of a compiled program against the one library | 180 |
| 2 | F | `rung-as-rr64-getter` | The getter asRR64 in place of asFloat | 180 |
| 2 | Y | `rung-one-library-run-time-names` | The one library's run-time names: a generic asString, an uncaught exception, a raised singleton | 180 |
| 2 | B | `rung-boolean-operators-one-library` | The exclusive or, the nand, the nor and majority of booleans in the one library | 120 |
| 2 | T | `rung-walk-tryatomic-rethrow` | Walk's tryatomic passes an exit and an exception through unwrapped | 120 |

Fields common to the eight rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-checker-most-specific`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** none: every new or promoted test is in a gated folder. **expected moves:** none.
- **lands only with:** none. In each run every rung lands on its own. Run 2 is written on run 1's landed tree, and none of its rungs needs a rung of run 1, though F rewrites the `asFloat` of C's `Dot` test (section 2, "The two runs").
- **its test is the stage:** no. **the stages:** K, N, F and B run the count stage and the distance stage once on their final trees, as a step of their sections: K and N edit the checker, which the stages run, N and F and B edit `FortressLibrary`, which they read. G, C, Y and T run neither and list their files (`STAGE_BLIND`): their edits are in walk, the code generator or the run time, which the stages do not run.
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 35b's gate left them (F-53). **expected checker crash:** none.

### K
- **slug:** `rung-checker-most-specific`
- **worktree:** `/home/user/fortress-checker-most-specific`
- **section:** `K. The checker chooses among a call's declarations by their signatures as declared, in an order that no hash decides, and refuses a tie that the rules leave (rows 1100, 935, 1112, 1127 and 543)`
- **blurb:** where the checker judges two of a call's declarations equally specific, it keeps the first in an order that follows the JVM's identity hashes. It makes such ties where the specification makes none: it reads self in a declaration's signature as the trait met with its comprises clause's types, so the one library's QQ and Ratio declarations of denominator look alike, and it compares generic declarations at their instances, not on their declared domains. The rung reads each declaration's signature as declared, so that the most specific decides; takes the order from no hash; makes a tie that the rules leave a static error, except P-60's coverage; casts self where the call takes a listed type's declaration; and removes the gate repair's special case.
- **points to report:**
  - The readings as built, by file and member, and the gate repair's case as removed.
  - Each test, failing on the base in the JVM's default hash mode and passing after; the expected failures that your change turns, and what you did with each.
  - Every tie that the rules leave in the one library, the compiled suite and the prelude, and what the checker now says at it.
  - The two stages' tables on your final tree against the comparand, and the checker's timing before and after.
  - Each sentence of the specification that your change makes false, before and after.
  - A file edited beyond those named.
- **briefing** (14 keys, 11 checks):
  - ledger:1100 (check): the tie that self's type makes, which closes.
  - ledger:935 (check): the order of a call's candidates, which closes.
  - ledger:1112 (check): the trait's return type taken at a call on self, which closes.
  - ledger:1127 (check): an object's narrower return type refused, which closes.
  - ledger:543 (check): a coverage tie typed by its first candidate, which closes.
  - P-146 (check): the signatures keep the plain trait type, and why.
  - P-60: the coverage tie, typed by the intersection.
  - F-377: the code generator's cast of self, where it stops.
  - SPEC `basic/overloading.tex#Overloading Resolution` (check): which declaration is more specific.
  - SRC `compiler/index/FunctionalMethod.java#public List<Param> parameters() {` (check): where self keeps the meet in a signature.
  - SRC `scala_src/typechecker/impls/Functionals.scala#def takesSelfAtTrait(c: Ranked) = {` (check): the gate repair's case, at the tie.
  - `doc:explorations/compile-ladder/climb-batch-35/REPAIR-gate.md#The site`: the trace of the tie at QQ.
  - PRB `4. The checker's choice among equally specific candidates, counted` (check): the ties, by kind, and the 22 that the rules leave.
  - REC `Forks the batch takes` (check): the defaults you build.

### G
- **slug:** `rung-walk-bounds-tuple-numeral-type`
- **worktree:** `/home/user/fortress-walk-bounds-tuple-numeral-type`
- **section:** `G. Three of walk's departures: generic dotted methods that differ only in their bounds, a tuple result between two generic declarations, and a numeral type written as a return, a variable's or a field's type (rows 1125, 1122 and 1124)`
- **blurb:** three places where walk departs and the compiled checker or the text is right. Of two generic dotted methods of one name that differ only in their static parameters' bounds, walk keeps the first it meets, a wrong answer with no error (row 1125, the step back of climb batch 35b). Walk refuses at load a valid pair of generic declarations whose results are tuples that hold their type parameters (row 1122). Walk loads a numeral type written as a return type, a variable's or a field's type, where the text and the checker refuse it (row 1124). The rung repairs the three in walk.
- **points to report:**
  - Each fix as made, by file and member.
  - The three expected failures promoted, each failing on the base and passing after.
  - Walk's suite: every test that failed after your change, with its cause; a line of the library or a test that walk now refuses at load.
  - Each sentence of the specification that your change makes false, before and after.
  - P-174's sentence on row 1124, quoted, for the record-landing.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (11 keys, 8 checks):
  - ledger:1125 (check): the methods that differ only in their bounds, which closes.
  - ledger:1122 (check): the tuple result between two generic declarations, which closes.
  - ledger:1124 (check): the numeral type written, which closes.
  - ledger:1123: two generic functional methods, a sibling that stays.
  - F-405 (check): walk's generic dotted methods of one name, as climb batch 35b built them.
  - SPEC `advanced/overloading.tex#Declarations with Static Parameters` (check): which of two generic declarations is more specific.
  - SRC `interpreter/evaluator/values/Constructor.java#private static String genericKey(String s, GenericMethod g) {` (check): the key that two bounds share.
  - SRC `interpreter/evaluator/values/OverloadedFunction.java#static private boolean belowAtObjectArguments(FType rIn, FType rOut, FType p,`: the tuple read element by element, the precedent.
  - SRC `interpreter/evaluator/BuildEnvironments.java#public static void checkNumeralTypesWritten(List<? extends CUWrapper> units) {` (check): the load check that leaves the three forms out.
  - PRB `1. Under walk, on the base`: the failures on the base.
  - REC `Forks the batch takes` (check): the defaults you build.

### N
- **slug:** `rung-numeral-coercion-body`
- **worktree:** `/home/user/fortress-numeral-coercion-body`
- **section:** `N. A numeral coercion's four numbers convert where they stand, with no getter, on both paths (P-174)`
- **blurb:** a numeral coercion's body is a computation at compile time with no method invocation: each of the numeral's four numbers, used as a value there, converts where it stands into the type that its place fixes, and is an exact ZZ where nothing fixes one, so a byte type's coercion is Byte(v). Today walk, the checker and the code generator read each number as a ZZ wherever it stands, so Byte(v) is refused on both paths, and the one library's coercions and seventeen tests call a getter, v.asZZ32. The rung converts each number where it stands on both paths, and rewrites the library's and the tests' coercions as P-174 gives.
- **points to report:**
  - The reading as built on each path, by file and member, and where a number that does not fit its place is refused.
  - The tests, each failing on the base and passing after; every coercion rewritten, library and tests.
  - Walk's suite, the compiled tracks and the onelibrary track: every test that failed after your change, with its cause.
  - The two stages' tables on your final tree against the comparand, and the checker's timing before and after.
  - Each sentence of the specification that your change makes false, before and after; P-174's last sentence, quoted, for the record-landing.
  - A file edited beyond those named.
- **briefing** (13 keys, 9 checks):
  - P-174 (check): the coercion's body, Byte(v), and the four numbers.
  - P-173 (check): a numeral converts where it stands.
  - F-341 (check): walk's numeral and its coercion, run with the four numbers bound.
  - F-342 (check): the checker's numeral, and the four numbers read as ZZ.
  - F-347: the compiled coercion, folded or run once.
  - F-345: the literals chapter, which reads the four numbers as ZZ.
  - SPEC `basic/expressions/literals.tex#Literals`: the numeral types and their coercions.
  - SRC `interpreter/evaluator/values/Numerals.java#private static FValue convert(FType target, Site s, SingleFcn c) {` (check): where walk binds the four numbers.
  - SRC `scala_src/typechecker/staticenv/KindEnv.scala#def getType(x: Name): Option[Type] = lookup(x).flatMap(b =>` (check): where the checker types them.
  - SRC `compiler/codegen/NumeralCoercionFold.java#public static Object fold(FnRef ref, Expr numeral, Component current) {`: the code generator's fold of a coercion.
  - `code:Library/FortressLibrary.fss#= numeralRR64(v, r.asZZ32, m.asZZ32)` (check): the library's coercions, the first of six.
  - PRB `7. The counts for rungs N and F` (check): the coercions and tests to rewrite.
  - REC `Forks the batch takes` (check): the defaults you build.

### C
- **slug:** `rung-one-library-run-walls`
- **worktree:** `/home/user/fortress-one-library-run-walls`
- **section:** `C. Three walls of a compiled program against the one library: the package of a generic dispatch method, and a method written twice into a class (rows 994, 1091 and 1099)`
- **blurb:** a program compiled against the one library dies at three walls that the gate's onelibrary track already holds as expected failures: the dispatch method of a generic overloaded function names the library's class without its package, so = of two strings dies with NoClassDefFoundError (row 994); a trait's class of default methods holds a method twice, its own and a bridge from a generic trait at its own type, so a varargs call's array fails to load (row 1091); and a range's class holds a bridge twice, so a reduction over a range fails to load (row 1099). The rung repairs the three in the code generator, and adds the switch rehearsal's two array programs, Arr and Dot, as run tests.
- **points to report:**
  - Each fix as made, by file and member.
  - The expected failures promoted and the new run tests, each failing on the base and passing after, with the verifier on; each that still fails, and at which row.
  - The onelibrary track, `ant testOneLibrary`, on your final code.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (10 keys, 7 checks):
  - ledger:994 (check): the bare api name, which closes.
  - ledger:1091 (check): the default method written twice, which closes.
  - ledger:1099 (check): the bridge written twice, which closes.
  - ledger:1098: println of a number, which stays and may stop a promoted program.
  - F-396 (check): the one library's jars and the onelibrary track.
  - SRC `compiler/OverloadSet.java#String owner = Naming.dotToSep(f.tagA.getText());` (check): one of the four bare names.
  - SRC `compiler/codegen/CodeGen.java#Set<Functional> bridged = Collections.newSetFromMap(new java.util.IdentityHashMap<Functional, Boolean>());`: the bridges of a class, where a second one is written.
  - `code:explorations/compile-ladder/plan-34/probes/programs/Arr.fss#component Arr`: the rehearsal's array program.
  - PRB `3. Compiled, against the one library, on the old code` (check): the failures on the base.
  - REC `Forks the batch takes` (check): the defaults you build.

### F
- **slug:** `rung-as-rr64-getter`
- **worktree:** `/home/user/fortress-as-rr64-getter`
- **section:** `F. The getter asRR64 in place of asFloat on the eight number types, in the one library, its uses, the tests, the demos and the specification (P-165)`
- **blurb:** each of the eight number types converts into RR64 by its own getter, x.asRR64, as the compiler's prelude named it; the one library declares asFloat(self) instead, a method called asFloat(x), the interpreter library's earlier idea. The rung renames it to the getter on the eight types, rewrites every use in the library, the tests and the demos, and brings the specification's sentence in line.
- **points to report:**
  - The declarations as written, and every use rewritten, by file.
  - The tests, each failing on the base and passing after.
  - Walk's suite and the onelibrary track on your final tree; each demo rewritten.
  - The two stages' tables on your final tree against the comparand.
  - Each sentence of the specification that your change makes false, before and after.
  - A file edited beyond those named.
- **briefing** (7 keys, 5 checks):
  - P-165 (check): the getter asRR64, and why.
  - P-161: the integer conversions, getters named for their target.
  - P-79 (check): every team demo kept running.
  - F-324 (check): the one library's asFloat, the departure that closes.
  - `code:Library/FortressLibrary.fss#coerce(x: ZZ32) = asFloat(x)`: the first use in the library.
  - PRB `7. The counts for rungs N and F` (check): the declarations and uses to rewrite.
  - REC `Forks the batch takes` (check): the defaults you build.

### Y
- **slug:** `rung-one-library-run-time-names`
- **worktree:** `/home/user/fortress-one-library-run-time-names`
- **section:** `Y. The one library's run-time names: asString in a generic body, an uncaught exception's report, and a raised object without value parameters (rows 1101, 1102 and 1103)`
- **blurb:** three run-time differences of a compiled program against the one library, which the gate holds as expected failures: a generic body's u.asString for a type parameter bounded by ZZ32 dies with NoSuchMethodError (row 1101); an uncaught exception is reported with a placeholder, 'Bogus value from FValue.asString()' (row 1102); and an exception object without value parameters that a helper raises is a second instance of the object (row 1103). The rung repairs the three in the run time's classes for the one library.
- **points to report:**
  - Each fix as made, by file and member, in each set of run-time classes.
  - The expected failures promoted, each failing on the base and passing after, with the verifier on.
  - The onelibrary track, `ant testOneLibrary`, on your final code.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (8 keys, 5 checks):
  - ledger:1101 (check): asString in a generic body, which closes.
  - ledger:1102 (check): the placeholder report, which closes.
  - ledger:1103 (check): the second instance, which closes.
  - F-396: the second set of run-time classes.
  - F-388: the payload classes.
  - SRC `compiler/runtimeValues/Utility.java#public static FException makeFortressException(String name, String msg) {`: where a helper's raise makes its object.
  - PRB `3. Compiled, against the one library, on the old code` (check): the failures on the base.
  - REC `Forks the batch takes` (check): the defaults you build.

### B
- **slug:** `rung-boolean-operators-one-library`
- **worktree:** `/home/user/fortress-boolean-operators-one-library`
- **section:** `B. The exclusive or, the nand and the nor of two booleans, and majority, in the one library (row 1121)`
- **blurb:** the specification's Boolean has the operators exclusive or, nand and nor, and the method majority; the compiler's prelude declares the three operators, and the one library declares none of the four, so walk and the compiled path under the one library refuse t OPLUS f, and the switch-over would drop the prelude's. The rung declares the four in the one library, in its own form for the boolean operators, as climb batch 35b's rung E did for EQV and NEQV.
- **points to report:**
  - The declarations as written, and their place.
  - The tests, each failing on the base and passing after.
  - The onelibrary track, and the two stages' tables on your final tree against the comparand.
  - A file edited beyond those named.
- **briefing** (7 keys, 4 checks):
  - ledger:1121 (check): the four missing, which closes.
  - F-403 (check): EQV and NEQV as built, the precedent.
  - P-37: the prelude gains no declaration.
  - `code:Library/FortressLibrary.fsi#opr EQV(a: Boolean, b:Boolean):Boolean` (check): where the four go.
  - `code:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi#opr OPLUS(self, other:Boolean):Boolean`: the prelude's three.
  - PRB `1. Under walk, on the base`: the failure on the base.
  - REC `Forks the batch takes` (check): the defaults you build.

### T
- **slug:** `rung-walk-tryatomic-rethrow`
- **worktree:** `/home/user/fortress-walk-tryatomic-rethrow`
- **section:** `T. Walk's tryatomic passes an exit and an exception through unwrapped (rows 1110 and 1111)`
- **blurb:** under walk, a tryatomic block that no atomic block encloses wraps whatever leaves it in a Java RuntimeException: an exit to an enclosing label never reaches it, 'exit from nonexistent label block done' (row 1110), and a Fortress exception never reaches a catch clause around it (row 1111). The rung passes both through unwrapped, as the atomic block does.
- **points to report:**
  - The fix as made, by file and member.
  - The two expected failures promoted, each failing on the base and passing after, at one thread and at four.
  - Walk's suite: every test that failed after your change, with its cause.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (7 keys, 5 checks):
  - ledger:1110 (check): the exit wrapped, which closes.
  - ledger:1111 (check): the exception wrapped, which closes.
  - F-401: an exit out of an atomic block, as climb batch 35 built it.
  - SPEC `basic/expressions/atomic.tex#Atomic Expressions` (check): what a tryatomic does.
  - SRC `interpreter/evaluator/Evaluator.java#public FValue forTryAtomicExpr(TryAtomicExpr x) {` (check): where the wrapping is.
  - PRB `1. Under walk, on the base`: the failures on the base.
  - REC `Forks the batch takes` (check): the defaults you build.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** first checks a program's types with the **checker**, then writes JVM bytecode with the **code generator**, and the **run time** runs it.
- The **prelude** is the small library that the compiled path uses today. The **one library** is the interpreter's library. At the **switch-over**, the compiled path moves onto the one library and the prelude is deleted.
- A **declaration** is one definition of a name. A name with several declarations is **overloaded**, and each call **chooses** one. One declaration is **more specific** than another when the types it accepts lie strictly inside the other's, as a function on `Ratio` is more specific than one on `QQ`.
- A **tie** is a call where the checker finds two declarations and judges neither more specific.
- A **hash order** is the order in which Java lists the members of a set. It depends on numbers that the JVM gives each object, which change from run to run. A choice that follows it is not a property of the program.
- A **trait** is an interface that can hold method bodies. `self` is the object that a method runs on. A trait's **`comprises` clause** lists the only types below it, as the one library's `QQ` lists `Ratio`.
- A **generic** declaration has type parameters, as `f[\T\](x: T)`.
- A **row** is one known defect in the gap ledger. An **expected-failure test** is a test that is known to fail and is marked so; to **promote** it is to make it a plain test once the fix lands.
- A **numeral** is a number as written, such as `200`. A program's own number type takes a numeral through a **coercion** that reads the numeral's four numbers: its digit count, its digits after the point, its radix and its value.
- A **getter** is a method called without parentheses, as `x.asRR64`.
- A **rung** is one fix, built by one worker and checked by a second, the skeptic. A **run** is one launch of the batch workflow. The **gate** is the full test pass before a run lands.
- A **fork** is a choice that the batch makes. Its **default** is the way it builds unless you say otherwise.
- The **checker count** and the **distance** are two counts of the errors that the checker still finds in the one library. Both are 0 today, and the switch-over needs them at 0.
- The **fixed roles** are the agents that every run has besides its rungs: the gather, which merges the rungs' changes into one tree; the review of the merged change; the gate; the commit; and the disk check.
- **microGPT** is the model program. No rung changes a line of it.

### The go

You gave it at 00:2x UTC: "approved for the next batch with planner's defaults after Fable review. Go overnight." The batch launches after that review. I found no fork that reverses a decision of yours, and none that is consequential by the rule: section 3 says why, fork by fork. No rung changes a line of microGPT.

### The two runs

- **Run 1, climb batch 36, four rungs:** K, G, N and C, the first three of your list and the head of the review's list.
- **Run 2, climb batch 36b, four rungs:** F, Y, B and T, on run 1's landed tree.
- **Why two runs.** The disk and one file. The batch script needs 1.5 GB a rung plus 4 GB free before it starts. About 11.2 GB is free, so a run holds four rungs. And rungs N and F both rewrite neighbouring lines of the one library, the number `RR64`'s coercions, in two different ways; one run cannot merge them, so F waits for N.

### What the probes found

I reproduced every defect that a rung takes on today's code, through the test harness. Each fails as its row says. Two probes sized rung K:

- **I counted the checker's ties.** A logging copy of the checker found 66 ties in the one library and 1,598 in the compiled tests. Almost all come from the two causes that rung K removes. After both are gone, 22 remain in 15 test files, and each is a case that the rules already settle, or a program that the checker refuses anyway.
- **I tried the main change in a scratch copy.** Reading `self` at its trait in each declaration kept the checker's error count on the one library at 0 and changed 5 of 1,770 compiled tests. One of the five shows that the code generator must also change: it passes `self` where the chosen declaration expects a `Ratio`. That is in rung K.

### Run 1, rung by rung

Each program is shortened to the lines that matter.

**K. Which declaration a call runs, decided by the rules, never by chance.**

- What it changes: the checker, and one place in the code generator.
- Your question tonight was how `Ratio`'s declaration and `QQ`'s could be "equally good". The checker reads `self` in `QQ`'s own declaration as "a `QQ` that is also a `Ratio`", which is exactly `Ratio`. So the two declarations look the same to it, and it keeps whichever comes first in a hash order.
- The specification says: compare the types that each declaration was written with. `QQ`'s says `QQ`, `Ratio`'s says `Ratio`, and `Ratio` lies strictly inside `QQ`, so `Ratio`'s declaration is more specific and wins.
- A program that shows it:

      trait Q comprises { R }
          getter next(): R = twin(self)
          abstract twin(self): Q
      end
      object R(n: ZZ32) extends Q
          twin(self): R = R(n + 1)
      end

- Today: refused, 'Function body has type Q, but declared return type is R.' The checker took `Q`'s declaration. Remove the getter, and the checker refuses `R`'s narrower result instead.
- After: it compiles and runs, `next` gives `R(2)` for `R(1)`.
- A second cause of ties: generic declarations compared after they are filled in. Twelve pairs like

      f[\T\](x: T): ZZ32 = 0
      f[\U\](x: Box[\U\]): ZZ32 = 1

  called on a `Box`: today 5 of 12 calls run the `Box` declaration in one run, 6 of 12 in another. After: 12 of 12, every run.
- What remains a tie after the rules is a static error, except your coverage case, P-60, where several declarations together cover a type and the run picks one. The gate's special case for `QQ` goes.

**G. Three walk errors the rules settle.**

- What it changes: walk only.

      object Nested
          tk[\U extends Number\](y: U): ZZ32 = 2
          tk[\U extends ZZ32\](y: U): ZZ32 = 3
      end

- Today: `Nested.tk(n)` for a `ZZ32` gives 2, a wrong answer with no error, the step back of the last batch. After: 3.
- Two generic declarations whose results are pairs, one more specific than the other: today walk refuses the valid program when it loads it. After: it runs, as the checker accepts it.
- A numeral type written as a function's result, `never(x: ZZ32): NaturalNumeral[\1, 10, 3\]`: today walk runs it, against your rule that a numeral type is only a parameter's type. After: walk refuses it when it loads, as the checker does.

**N. `Byte(v)`, as you said.**

- What it changes: walk, the checker, the code generator, the one library's coercions and seventeen tests.

      value object Byte(b: ZZ32)
          coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)
      end
      y: Byte = 200

- Today: walk stops, 'got arg 200:ZZ of type ZZ'; compiled, 'ZZ32->Byte is not applicable to an argument of type ZZ'. Both read `v` as a big integer wherever it stands. The library and the tests write `v.asZZ32` instead.
- After: `v` converts where it stands, into `ZZ32` here, on both paths. The library's and the tests' coercions are written `v`, with no getter.

**C. Three crashes of compiled programs against the one library.**

- What it changes: the code generator.
- Today, compiled against the one library: `=` of two strings dies, 'NoClassDefFoundError'; any call with a variable number of arguments, and the two array programs of the switch rehearsal, die when a class loads, 'Duplicate method name'; a loop over a range dies the same way.
- After: each runs. The two array programs become tests: one fills an array of eight numbers and prints `a[5] = 25`, the other takes a dot product of a thousand numbers.

### Run 2, rung by rung

**F. `x.asRR64`, as you said.**

    n: ZZ64 = 3
    y: RR64 = n.asRR64

- Today: walk stops, since the one library spells the conversion `asFloat(n)`.
- After: `3.0`. The one library's `asFloat` becomes the getter `asRR64` on the eight number types, with every use: about 30 lines of the library, 33 test files, 18 demos and the specification's sentence. No line of microGPT calls it.

**Y. Three more differences of compiled programs against the one library.**

    m: ZZ32 = 2147483647
    try
        k: ZZ32 = m + 1
    catch e
        IntegerOverflow => println(if e SEQV IntegerOverflow then "the object" else "a copy" end)
    end

- Today, compiled against the one library: `a copy`. The library's addition raises the overflow, and the run time makes a second copy of the object. Also `u.asString` in a generic function crashes, and an uncaught exception is reported with a placeholder text.
- After: `the object`, as under walk; the other two work.

**B. More operators on booleans.**

    println(true ⊕ false)

- Today: refused, 'Operator OPLUS is not defined.', under walk and compiled against the one library.
- After: `true`. The same for `⊼` and `⊽`, and the function `majority` of three booleans, beside `≡` and `≢` from the last batch, before the switch-over drops the prelude's three.

**T. Walk's `tryatomic`.**

    label done
        tryatomic do exit done end
    end done

- Today: walk stops, 'exit from nonexistent label block done'; an exception thrown inside reaches no `catch` either.
- After: the exit reaches its label and the exception its `catch`, as out of an `atomic` block.

### The merge

- In run 1, each rung edits files of its own, but for three that reach the code generator's one big file and two that reach the checker. Each keeps to its own methods there (section 4, "The rule the rungs keep").
- In run 2, F and B both edit the one library, far apart; Y the run time; T walk.

### The measures

- **The checker count and the distance** stay 0 and 0. Rungs K, N, F and B run them, since they change the checker or the library that it reads.
- **microGPT:** no line changes. Its quick checks under walk stay 7 of 7 for both programs, checked at each commit stage. Rung N changes how each numeral of microGPT converts under walk, through the library's coercions, to the same values; rung F renames a method that microGPT does not call.
- **Rows closed:** run 1 closes about 12 (1100, 935, 1112, 1127, 543 and 770 by K; 1125, 1122 and 1124 by G; 994, 1091 and 1099 by C), and removes two departures from your P-174 that had no row. Run 2 closes 6 (1101, 1102, 1103, 1121, 1110 and 1111), and removes the departure from your P-165 that had no row.
- **The skill:** 14 passages go or are rewritten, 8 after run 1 and 6 after run 2 (section 6, the list for the skill writer).
- **Which suites each rung's fix touches:** K the compiled tracks and the onelibrary track; G walk's; N walk's, the compiled tracks and the onelibrary track; C the onelibrary track; F walk's, the onelibrary track and the demos; Y the onelibrary track; B walk's and the onelibrary track; T walk's. The gate runs them all.

### What the batch leaves out

- **Row 996**, the code generator's order of methods in a class, which follows a hash order too. It changes no answer, only bytes, and no site is traced; it is not small, so it waits.
- **Row 1098**, `println` of a number compiled against the one library, waits for your answer to review-queue item 616, which has no default on record.
- **The rest of the review's list** for a later batch: rows 1104 and 1105; rows 1106 to 1109, the other forms of `override`; row 594; rows 1123, 1126, 1118 and 1127's sibling 1094; review.1's Appendix I clauses where no rung edits the entry; rows 744 and 1120 once their questions are settled.
- **Rows 1128 and 1129**, which the count of the interpreter's suite on the compiled path found tonight: after the list, as size allows; it does not allow.

### The forks that wait for you

None new. Row 1098's question (item 616) is the one that the list meets; the others of climb batch 35's list stand as that record gives them.

### Cost and time

The agents run on the regular tiers (`tier-mode.sh status` prints `regular`).

- **Run 1: about 5.6 million tokens written, 6.4 million with the reserve. The range is 4.8 to 7.2 million. About 5 hours 30 minutes, 6 hours 15 minutes with the reserve.** Four rungs with their skeptics write about 4.4 million, the fixed roles about 1.15 million. The reserve is 0.8 million and 45 minutes: one ruling on a rung with its repair, and a second gate.
- **Run 2: about 3.8 million, 4.4 million with the reserve. The range is 3.3 to 5.0 million. About 4 hours, 4 hours 45 minutes with the reserve.** Four rungs with their skeptics about 2.65 million, the fixed roles about 1.15 million; the reserve 0.6 million.
- **Each landing's own work** comes on top: the post-batch review and the record-landing wrote 5.78 million at climb batch 35's first landing, more than a run (`reviews/batch-35b-review.md`, section 7, span 1).
- The evidence, climb batch 35's two runs on the regular tiers (`reviews/batch-35-review.md` and `reviews/batch-35b-review.md`, section 7), each role priced from the last run on the same tier:
  - Run 2 of 35, each rung with its skeptic: E, two library lines with the stages and the onelibrary track, 0.62 million; L, three walk fixes with two skeptic fixes and a whole suite, 0.91; M, two code-generator fixes with the onelibrary track, 1.27, of which 0.40 one cache refill, so 0.87 without it. Its fixed roles wrote 1.14 million: the gather 425 thousand, the review 393 thousand, the gate 139 thousand, the commit stage 117 thousand, the disk check 64 thousand. Run 1 of 35: R 0.51, W 0.63, S 0.57, O, a checker and code-generator rung with the stages and the timing, 0.85, A 0.64.
  - So K is priced at 1.4 million, above O and M: the checker and the code generator, five tests, the stages, the timing, the compiled tracks and the onelibrary track, and the most uncertainty. N at 1.3: three areas, the library and seventeen tests. G at 0.8, as L less its skeptic's extra fixes. C at 0.9, as M without its refill. In run 2: F at 0.8, a rename across about 50 files with the demos; Y at 0.8, three run-time fixes with the onelibrary track; B at 0.55, as E; T at 0.5, one walk fix.
  - The minutes: run 2 of 35's workers took 35 to 82 minutes and its skeptics 20 to 31; its rung stage 2 hours 10 minutes for three rungs, two agents at a time; the gather 36 minutes; the review 15 beside the gate's 22; the commit stage 2. Run 1 of 35's gate turned red and its ruling, repair and second gate took 71 minutes and 0.79 million.
  - The reserve: run 1 of 35 spent 1.31 million of its 0.8; run 2 none of its 0.6.
- **The disk.** The script stops a run under 1.5 GiB a rung plus 4 GiB, so four rungs need 10 GiB. Free after the planner's probe tree was removed: 11.19 GiB (`df -P /home/user`, 11,736,096 blocks of 1,024 bytes available) at 01:2x UTC on 24 November. A fifth rung would need 11.5 GiB.

### Your review list from this record

- The forks of section 3, each at its default. By my reading none is consequential by the rule.
- Fork K1 reads `self` at its trait in the signature of every trait's methods, also where the trait has a `comprises` clause. Your P-146 says so for the self-typed traits, for a reason that holds for these too; tonight's words asked for the cause to go.
- Fork K5 types row 543's call by the intersection, P-60's text, as review-queue item 58's settlement says.
- Under the prelude, `c = 0` for a number `c` of type `RR32` becomes a static error, where it compiled and overflowed the stack when it ran (row 528, fork K8). The prelude gains nothing (P-37).

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision on record; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential fork

None, by the planner's reading. What the record settles, and so is no fork:

- **That these defects are fixed now:** P-180 ("Beside its main work, a batch fixes the defects that make walk and the compiled path behave differently or depart from the specification"), and the go of 00:2x UTC with the brief's list.
- **Which declaration is more specific:** `Specification/basic/overloading.tex:353-372`, a declaration whose declared parameter types are strict subtypes, a dotted method's receiver among them; declarations with static parameters on their declared domains, with no static argument inferred (P-45). The self parameter's declared type is the trait (`Specification/basic/expressions/var-ref.tex:53-54`).
- **The signature at the plain trait type:** P-146, "The method signatures keep the plain trait type, because the proofs of the POPL 2019 paper on multiple dispatch ... assume that no declared type holds a type parameter inside an intersection"; P-157 keeps the exclusion test's reading. Fork K1 extends the signature rule to a trait whose `comprises` clause lists types; F-225, a fact, states today's reading there, not a decision.
- **A redeclaration below at the same parameter types hides the inherited declaration:** `Specification/basic/traits.tex:584-590`, a trait does not inherit a declaration whose parameter type equals one that it declares.
- **P-60's coverage tie, typed by the intersection:** P-60, and Appendix I's sentence that a call's type is the intersection "where those declarations and every declaration more specific than them that the call may run have no static parameters" (`Specification/appendices/changes.tex:3745-3749`); review-queue item 58, settled: "Row 540 is closed ... which removes the narrowing's only reason, so the text's boundary stands; row 543 holds the change to it (P-180)."
- **`Byte(v)`:** P-174, its history of 14:33Z on 2026-11-23, "This is all compile time computation. No method invocations."
- **`x.asRR64`:** P-165, its history of 14:33Z on 2026-11-23.
- **Row 1124 fixed now:** P-174 writes a numeral type only as a coercion's or an operator's parameter type; P-180; review-queue item 503's triage, "P-12 holds the other three forms until walk runs the checker", is a routing, not a decision, and P-12 does not keep walk's load check from refusing them.
- **The one library's boolean operators:** item E.skeptic.1 of climb batch 35b, settled by P-180 with fork E1's form, as its review gives it.
- **Row 1098 waits:** review-queue item 616, "No default on record; as landed, neither rule built". Its default lets no rung run tonight.
- **What stays the curator's:** rows 744 and 1120 (items L.worker.1 and E.skeptic.2 of climb batch 35b); the `NOR` text of `Specification/basic-lib/booleans.tex:293-294` (E.skeptic.3), which no rung of this batch edits.

Two effects near microGPT, neither consequential by the rule: rung N changes the body of the library's coercions, which walk runs once for each numeral of microGPT at a library type, to the same values; rung F renames a method that no component of microGPT calls (`grep -rn asFloat explorations/run-c4/src explorations/apl/mg` prints nothing).

### Forks the batch takes

Each fork below builds within a decision on record or chooses where the record leaves an implementation open, and each can be undone.

1. **X1. One record, two runs.** Run 1 is K, G, N and C; run 2 is F, Y, B and T on run 1's landed tree. **Default: so.** The reason: the disk floor, 1.5 GiB a rung and 4 GiB, against 11.19 GiB free, holds four rungs; and N and F rewrite adjacent lines of `Library/FortressLibrary.fss` (`:386-389`, `RR64`'s coercions), which one gather cannot merge. Way not taken: N in run 2 and F in run 1, against the brief's order of priority.
2. **X2. What the batch takes.** The brief's first four pieces; then the review's list in its order as four rungs a run allow: rows 994, 1091 and 1099 with `Arr` and `Dot` (C); rows 1101 to 1103 (Y); row 1121 (B); rows 1110 and 1111 (T). **Default: so.** Row 1098 waits for item 616. Row 996 waits: it changes bytes, not answers, no site is traced, and its test compares two compiles' bytes, which is not small. Rows 1104 to 1109, 1118, 1123, 1126, 594, 1128 and 1129 wait for size.
3. **K1. A functional method's `self` parameter reads at its plain trait type in every declaration's signature, a `comprises` clause's trait and the prelude's `comprises T` spelling included; the bodies keep the meet, and so does the overloading check's exclusion test, for a `comprises` clause's trait as P-157 has it for a self type read from the F-bound.** **Default: so.** It is what the probe measured: the one change of `FunctionalMethod.parameters()` gives the exclusion test the meet through the declaration's own parameters (`OverloadingChecker.scala`, `selfTyped`), and the distance stayed 0. The meet is sound there, since every value of the trait is a value of a listed type. Ways not taken: the meet kept in the signature, with a special case at the tie, as the gate repair did; the exclusion test kept plain for a `comprises` trait, as F-225 states today.
4. **K2. Of a call's most specific candidates, one decides where the rules order it: by the declared signature, `self` at its trait; a generic declaration on its declared domain (`CoercionOracle.moreSpecificDeclared`); a dotted method's redeclaration below at the same parameter types over the declaration that it hides; and one declaration met twice counts once.** **Default: so.**
5. **K3. A tie that the rules leave is a static error, in the form of the checker's ambiguity error, except P-60's coverage tie.** **Default: so.** The probe found such ties only in programs that the checker refuses already (PRB section 4); the worker reports each new message in a pinned test.
6. **K4. The order of a call's candidates is taken from no hashed set: the checker sorts them by their declarations' places (file, then position) before its partial order, so that P-60's head, and the call that the code generator writes from it, are the same in every run.** **Default: so.** Way not taken: the disambiguator's order sorted, a phase that both paths run.
7. **K5. P-60's coverage tie is typed by the intersection where its tied declarations, and every declaration more specific than them that the call may run, have no static parameters, the text's boundary; row 543's call is typed so.** **Default: so.**
8. **K6. The code generator casts `self` at a call whose chosen declaration takes a listed type, as F-377's cast does at a call with one argument; the gate repair's special case goes.** **Default: so.**
9. **K7. Row 1094's dotted-method form, and row 1046's crash, are siblings: run their programs once after the fix and report; repair neither unless the same edit does.** **Default: so.**
10. **K8. Row 528's `XXXNumeralEqualsRR32Compiled`: under the prelude, `c = 0` for `c: RR32` becomes a static ambiguity, since the prelude's `RR32` declares no `=` of its own and `Equality`'s and `RR64`'s are unordered; the test's expected failure moves to the compile, and row 528 is rewritten; the prelude gains nothing (P-37).** **Default: so.** Way not taken: a declaration of `=` in the prelude's `RR32`, which P-37 forbids.
11. **G1. Walk's key of a generic dotted method reads its static parameters' kinds and bounds, the parameters renamed by position, so that `Generator`'s `map[\G\]` and `Indexed`'s `map[\R\]` share one key and two methods that differ in their bounds do not; the call then runs the most specific instance.** **Default: so.**
12. **G2. Walk's Return Type Rule at every instance reads a tuple result element by element, as at object arguments.** **Default: so.**
13. **G3. Walk's load check refuses a numeral type written as a return type, a variable's or a field's type, with the message that it gives in an `extends` clause.** **Default: so.**
14. **N1. Each of a numeral coercion's four numbers, used as a value in its body, converts where it stands, on both paths: at a place that fixes a number type, into that type from its exact value; where nothing fixes one, a `ZZ`. A number that does not fit its place, at the numeral's instance of the coercion, is refused statically at the numeral's place, as an out-of-range numeral is; walk refuses it when the place runs.** **Default: so.** The mechanism on each path is the worker's: section 4 names the readers.
15. **N2. The coercions of the one library and of the tests are written as P-174 gives, with no getter and no helper on the four numbers; the prelude's two coercions that call `jBigToZZ64(v)` too, under P-37's exception for its numeral coercions.** **Default: so.**
16. **C1. The four places in `OverloadSet` that name a generic function's class by the api's bare name ask `NamingCzar.javaPackageClassForApi`, the switch rehearsal's repair.** **Default: so.**
17. **C2. A class's methods are written once for each name and descriptor: a trait's own method over a bridge from a generic trait at its own type, and one bridge where two parents give the same.** **Default: so.**
18. **C3. `Arr` and `Dot` become one-library run tests that assert their values; an expected failure that the three fixes do not let pass stays one, naming the row that stops it (row 1098 for a program that prints a number).** **Default: so.**
19. **F1. `asRR64` is a getter on each of the eight number types, declared where `asFloat` is now; `asFloat` goes, with no alias; every use becomes `x.asRR64`; the vector norm reads it.** **Default: so.**
20. **Y1. The second set of run-time classes answers `asString` at the one library's `String`, an uncaught exception is reported by its own `asString`, and a helper's raise of an object without value parameters gives the object itself.** **Default: so.** Item 617 holds the type of `FValue.asString` in each set as not consequential.
21. **B1. The one library declares `OPLUS`, `NAND` and `NOR` over two booleans as top-level operators beside `<->`, fork E1's form, and `majority` as a top-level function of three booleans.** **Default: so.**
22. **T1. Walk's `tryatomic` lets an exit and a Fortress exception leave it as they are, as `atomic` does.** **Default: so.**

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code that the rung rests on. A line citation is of `main`'s code at `4b0e3abd6a`. The record's forks are section 3's. The planner's probe programs are in `explorations/compile-ladder/plan-36/probes/programs/`, its notes in `fixes-36.md` beside them (PRB); a test is written new in the test folders, and no file is moved from there. The skill is cited by its sections. Run 2's sections are read again on run 1's landed tree before its launch.

### K. The checker chooses among a call's declarations by their signatures as declared, in an order that no hash decides, and refuses a tie that the rules leave (rows 1100, 935, 1112, 1127 and 543)

**The mission.** Where the checker finds two or more most specific declarations for a call, a tie, it keeps the first in its sorted order (`scala_src/typechecker/impls/Functionals.scala`, `typedApplicationOfChecked`, its local `resolved`, `sorted.headOption`). The sort keeps the input order where neither candidate precedes (`scala_src/useful/PartialOrder.scala`), and the input is the disambiguator's list of the name's declarations, made from a set of index entries that hash by identity (`compiler/disambiguator/TopLevelEnv.java`, `unambiguousFunctionNames`; `scala_src/disambiguator/ExprDisambiguator.scala`, `toSet(env.unambiguousFunctionNames(...)).toList`). So the choice follows the JVM's identity hashes (row 935). The checker makes ties that the specification does not, from two causes:

- **`self` in a signature.** In a trait whose `comprises` clause lists types, and in the prelude's self-typed traits, whose self type the prelude spells `comprises T` (`Library/CompilerAlgebra.fsi`; F-225), a functional method's `self` parameter keeps the trait met with the listed types in the declaration's signature: `FunctionalMethod.parameters()` reads it plain only where the self type comes from the F-bound (`compiler/index/FunctionalMethod.java`, `_selfFromBound`). So in the one library, `denominator(self)` in `QQ comprises { Ratio }` finds `QQ`'s declaration at `(QQ & {Ratio})->ZZ` beside `Ratio`'s at `Ratio->ZZ`, two equivalent domains (`climb-batch-35/REPAIR-gate.md`, "The site"; row 1100), and every `=` of two prelude numbers finds the type's own `=` beside `Equality`'s. The specification compares the declared parameter types, a dotted method's receiver among them (`Specification/basic/overloading.tex:353-372`), and the declared type of `self` is the trait (`basic/expressions/var-ref.tex:53-54`); P-146 keeps the plain trait type in the signatures of a self-typed trait for a reason that holds for every trait. Read so, `Ratio`'s declaration is strictly more specific: the call takes it and its return type (row 1112), and an object's narrower return type is valid (row 1127).
- **Generic declarations compared at their instances.** `f[\T\](x: T)` beside `f[\U\](x: Box[\U\])`, called on a `Box`, instantiate to one parameter type and tie. The specification compares declarations with static parameters on their declared domains, with no static argument inferred (`overloading.tex:364-372`; P-45): the `Box` declaration decides.

Climb batch 35's gate repair added a case for the first cause: a tie that `self`'s type makes keeps the trait's own declaration (`b7b5b0c02b`; `Functionals.scala`, `traitOfSelf`, `takesSelfAtTrait` and the branch of `head` that reads them). It goes when the cause is gone. You make the checker compare a call's declarations by their signatures as declared, so that the most specific one decides; take the order of the candidates from no hashed set; make a tie that the rules leave a static error, except P-60's coverage tie; and make the code generator cast `self` where the call now takes a listed type's declaration.

**What the probe found** (PRB sections 4 to 6). On the base, 66 ties in the one library's fourteen components and 1,598 in the compiles of `compiler_tests/`, 1,416 of them `Equality`'s. Reading `self` at its trait in each signature (a hack, never in a tree): the distance stays 0; the 42 self ties of the library go; 5 of 1,770 compiled tests change: rows 1127's and 770's expected failures now compile; `ComprisesSelfAbstractFunctionalMethodCall` fails verification, 'Type '...$Solid' (current frame, stack[0]) is not assignable to '...$Brick'', because the code generator passes `self` uncast where the call's arrow takes the listed type, row 1100's original failure; and row 528's `XXXNumeralEqualsRR32Compiled` becomes a static ambiguity (fork K8). After both readings, 22 ties in 15 files remain: one declaration met twice through imports or an api (`Compiled7.e.fss`, `XXXImportExceptOperator.fss`, `XXXImportExplicitHidesOnDemand.fss`; the library's `List.fss:96-97`); a dotted method beside its redeclaration below at the same parameter types (`TraitOwnMethodBesideInheritedCompiled.fss:95-103`, `ArrowClauseBindRungG.fss:36`, `:42`), which `Specification/basic/traits.tex:584-590` settles; row 543's coverage tie; and sets that the checker refuses already.

**The decisions this rung builds.** P-146's ground and the specification's definition of "more specific"; P-45; P-60; P-37 for the prelude; P-148 for the checker's timing. Section 3's forks K1 to K8.

**What you build, in order.**
1. **The tests first.**
   - `compiler_tests/GenericTiesDeclaredCompiled`, from `plan-36/probes/programs/compiler_tests/P36GenericTiesDeclaredCompiled.fss` and its `.test`, the prefix dropped: twelve generic pairs, each call on a `Box`. Seen failing on the base in the JVM's default hash mode, through `junit.sh`: 'FAIL:  5 =/= 12; each direct call on a Box runs the declaration on Box, the more specific by its declared parameter types', and in another JVM 'FAIL:  6 =/= 12' (PRB section 2). This is rows 935's and 1100's test in the default mode; row 1100's `ComprisesSelfAbstractFunctionalMethodCall`, which passes on the base in that mode, stays.
   - `compiler_tests/ComprisesSelfListedTypeCompiled`, from `P36ComprisesSelfListedTypeCompiled.fss`: on the base 'Function body has type Q, but declared return type is R.' (row 1112).
   - Promote `compiler_tests/XXXComprisesFunctionalMethodNarrowedReturn` to a run test with `run_out_contains=PASS` (row 1127); on the base 'should be a subtype of the'.
   - Promote `compiler_tests/XXXCoverageReturnGenericFamily` (row 543), its two bindings `left` and `right` both accepted; on the base 'but declared type is'.
   See each fail on the base through `old-fortress.sh` and the base build (`worktrees.md`, "Running the old code"), and echo its expected failure first (`tests-writing.md`, "The order").
2. **The signature** (fork K1): `FunctionalMethod.parameters()`. Rows 1127's and 1112's tests type check.
3. **The tie** (forks K2, K3 and K5): in `Functionals.scala`'s `resolved`, where `top` holds two or more, the rules of K2 decide; P-60's tie keeps its intersection type (`tieType`) with K5's boundary (`groundFamily` read over the tied declarations and those more specific that the call may run, not over the whole family); any other tie is the static error of K3. Remove `traitOfSelf`, `takesSelfAtTrait` and the branch of `head` that reads them. The generic pairs' test passes.
4. **The order** (fork K4), so that P-60's head is the same in every run.
5. **The code generator** (fork K6): the cast of `self` at a call whose chosen arrow takes a listed type. `ComprisesSelfAbstractFunctionalMethodCall` and `ComprisesSelfListedTypeCompiled` pass with the verifier on.
6. **The expected failures that your change turns:** run `compiler_tests/XXXApiFunctionalMethodOfComprisedObject` (row 770) and promote it if it passes, closing row 770; `XXXNumeralEqualsRR32Compiled` (row 528) by fork K8. Run row 1094's `XXXSelfTypedMethodNarrowedReturn` and row 1046's program (`compile-ladder/rung-return-rule-object/probes/XXXOverloadGenericObjectTwoParams.fss`) once and report each (fork K7).
7. **The whole tracks once,** `ant testQuick` and `ant testOneLibrary`, on your final code (`tests-running.md`, "When to run a whole suite"): the one library's `QQ` is row 1100's library instance.
8. **The stages** once on your final tree, and the checker's timing before and after (P-148; `compiler.md`, "The checker's time").

**The stages.** Both, once.

**Rows.** Close 1100, 935, 1112, 1127 and 543, and 770 if its test passes. Rewrite row 528's claim (fork K8) and row 499's notes, whose direct call `f(b)` no longer answers by the compiling JVM; its dispatcher half stays. Rows 1094 and 1046 as fork K7 gives.

**Specification.** `grep -rn '~1100\|~935\|~1112\|~1127\|~770' Specification --include=*.tex` prints nothing on the base; `~543` prints one line in Appendix I's entry on `comprises` (`Specification/appendices/changes.tex:3750-3753`, "it types such a call by the intersection only in a family none of whose declarations has static parameters, and otherwise by one of its most specific declarations (row~543 of the revival's gap ledger)"). Take that clause out, keeping the sentence's other two, and list it before and after. In `Specification/basic/expressions/var-ref.tex:63-69`, the sentence on a trait with a `comprises` clause gives `self` the meet without saying where; the sentence after it says that for a self-type parameter "the \KWD{self} parameter keeps the type `\EXP{T}' in the signature of each method declaration". Write the same for the `comprises` case, in the revision form (`specification.md`), and list it.

**Files.** `compiler/index/FunctionalMethod.java` (`parameters()`); `scala_src/typechecker/impls/Functionals.scala` (`typedApplicationOfChecked`, its tie: `resolved`, `tieType`, `groundFamily`, `head`); `scala_src/typechecker/CoercionOracle.scala` or `scala_src/typechecker/OverloadingChecker.scala` only where a reading of K1 or K2 needs them; `compiler/codegen/CodeGen.java`, the emission of a call's arguments and its casts (`castToTypeBelow` and its callers); `Specification/appendices/changes.tex:3750-3753`, `Specification/basic/expressions/var-ref.tex:63-69`; your tests; rows 528 and 499. Not: walk; the disambiguator (fork K4); `KindEnv.scala` and the numeral conversion (rung N); the prelude's text (P-37); microGPT.

**Reserved points.** A model line: none. A team test's checked value or pinned message changed. A line of the libraries that the checker now refuses.

**Overlaps by file.** `CodeGen.java` with rungs N and C, `Functionals.scala` with rung N only if N must reach a numeral's conversion there: each keeps to its own members (section 4, "The rule the rungs keep").

### G. Three of walk's departures: generic dotted methods that differ only in their bounds, a tuple result between two generic declarations, and a numeral type written as a return, a variable's or a field's type (rows 1125, 1122 and 1124)

**The mission.** Three places where walk departs and the compiled checker or the text is right.
- Row 1125. Climb batch 35b's rung L made an object take each generic method of a name as its instance at symbolic static arguments, one instantiation for each key, the name and the kinds of the static parameters (`interpreter/evaluator/values/Constructor.java`, `genericKey`, `accumulateGenericMethods`; F-405). Two methods of one name that differ only in their bounds, `tk[\U extends Number\](y: U)` beside `tk[\U extends ZZ32\](y: U)`, share a key, their instances get one signature, and `putIfAbsent` keeps the first met: `Nested.tk(n)` for a `ZZ32` answers 2, where the more specific declaration answers 3 (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters"). On the base before rung L the call stopped; now it is a wrong answer with no error. A key that reads the bounds must read them with the static parameters renamed by position, since the one library redeclares `Generator`'s `map[\G\]` (`Library/FortressLibrary.fss:1374`) in `Indexed` as `map[\R\]`, and the redeclaration must keep hiding it (the row's notes; L's `SKEPTIC.md`, finding 3).
- Row 1122. Walk refuses at load `ident[\T extends Shape\](x: T): (T, ZZ32)` beside `ident[\T extends Round\](x: T): (T, ZZ32)`, a valid pair, 'fails the Return Type Rule': its Return Type Rule at every instance reads a returned type parameter only, `if (rOut != p) return false` (`interpreter/evaluator/values/OverloadedFunction.java:1305`, `returnRuleAtEveryInstance`), where the reading at object arguments compares a tuple result element by element since rung L (`belowAtObjectArguments`).
- Row 1124. Walk loads a numeral type written as a return type, a variable's or a field's type, and refuses it only where a numeral meets it, as `never(x: ZZ32): NaturalNumeral[\1, 10, 3\] = never(x)`; P-174 writes a numeral type only as a coercion's or an operator's parameter type, and the checker refuses the three forms. Walk's load check refuses the `extends`, `comprises` and static-argument forms (`interpreter/evaluator/BuildEnvironments.java:1211-1237`, `checkNumeralTypesWritten`).

**The decisions this rung builds.** P-174 for row 1124; P-45 for the declared domains. Section 3's forks G1, G2 and G3.

**What you build, in order.**
1. **The tests first.** Promote `tests/XXXGenericMethodBoundsDifferWalk.fss`, `tests/XXXGenericPairTupleReturnWalk.fss` and row 1124's `tests/XXXNumeralTypeReturnTypeWalk.fss` with its `.test`. Seen failing on the base, as plain copies through `harness-one.sh`: 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; a ZZ32 takes the declaration bounded by ZZ32, the more specific', and refused at load, 'Overloading of ident[\T extends Round\](x:T):(T, FortressLibrary.ZZ32) ... fails the Return Type Rule' (PRB section 1); the third by its row. Add to the first a trait's generic method redeclared in an object at the same bound under another parameter name, which must still hide it, and run the one library's `map` once through a program of yours.
2. **Row 1125** (fork G1), **row 1122** (fork G2), **row 1124** (fork G3), each test passing after its fix. After each, run one program that loads the library, since walk's load check reads every program's library (`interpreter.md`, "What walk checks").
3. **The whole suite once,** `ant testSystem`. The gather runs the demos on the merged tree.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 1125, 1122 and 1124. Row 1123, two generic functional methods of one name in an object, and row 1126, a call on an assumed receiver, are siblings: run each test once after your fix and report whether it still fails; do not repair them here. Closing row 1124 makes P-174's sentence "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it." false. Edit no POSITIONS entry: quote it in your report with the words that would make it true after your change, for the record-landing.

**Specification.** `grep -rn '~1125\|~1122\|~1124' Specification --include=*.tex` prints three places on the base: `Specification/appendices/changes.tex:2424-2426` and `Specification/basic/inference.tex:345-347` (row 1125, the same sentence twice), and `changes.tex:3128-3131` (row 1122). Take each clause out, keeping each sentence's other clauses whole, and list it before and after. Row 1124 is named in no effect (climb batch 35b's review.1); the numeral entry's sentence on walk's refusals at load, "It refuses when it loads a program a numeral type written as a type that an object or a trait extends, or as a static argument." (`changes.tex:5447-5448`), gains the `comprises` clause and the three forms.

**Files.** `interpreter/evaluator/values/Constructor.java` (`genericKey`, `accumulateGenericMethods` and the instantiation that reads the key); `interpreter/evaluator/values/OverloadedFunction.java` (`returnRuleAtEveryInstance`); `interpreter/evaluator/BuildEnvironments.java` (`checkNumeralTypesWritten`); the clauses of `changes.tex` and `inference.tex` named; your tests. Not: the compiled path; the library; `interpreter/evaluator/values/Numerals.java` (rung N); microGPT.

**Reserved points.** A model line: none. A line of the library or a team test that walk now refuses at load. A demo that no longer reaches its end.

**Overlaps by file.** `changes.tex` with rungs K and N, at other entries.

### N. A numeral coercion's four numbers convert where they stand, with no getter, on both paths (P-174)

**The mission.** P-174: "A coercion's body is a computation at compile time, with no method invocation: a number used as a value there converts where it stands, as a numeral does (P-173), into the type that its place fixes, and is refused statically where it does not fit, so `value object Byte(b: ZZ32)` declares `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)`; where nothing fixes a type, it is an exact integer, `ZZ`." The tree reads each of the four numbers as a `ZZ` wherever it stands:
- walk binds each as an `FBigNum` before it runs the body (`interpreter/evaluator/values/Numerals.java`, `convert`), so `Byte(v)` stops, 'Unification error: Closure/Constructor for Byte param 1 ($b:ZZ32) got arg 200:ZZ of type ZZ' (PRB section 1);
- the checker types each as a `ZZ` (`scala_src/typechecker/staticenv/KindEnv.scala`, `getType`, "A numeral coercion's four numbers are exact integers, a ZZ."; F-342), so the compile refuses it, 'ZZ32->Byte is not applicable to an argument of type ZZ.' (PRB section 2);
- the code generator folds the body over the four numbers as `ZZ` values, or runs its method with them so (`compiler/codegen/NumeralCoercionFold.java`; F-347).
So the one library's coercions call a getter on the numbers (`Library/FortressLibrary.fss:388-389`, `:635`, `:847`, `:954`, `:1065`), as do 17 tests, the compiled ones through the helper `bigToZZ64(v).asZZ32` (PRB section 7), and the literals chapter reads the four as `ZZ` values (`Specification/basic/expressions/literals.tex:186-188`; F-345). You make each number convert where it stands on both paths, and write the coercions as P-174 gives.

**The decisions this rung builds.** P-174, P-173; P-37 for the prelude's coercions; P-148 for the checker's timing. Section 3's forks N1 and N2.

**What you build, in order.**
1. **The tests first.** `tests/NumeralCoercionBodyWalk.fss`, from `plan-36/probes/programs/tests/P36NumeralCoercionBodyWalk.fss`, prefix dropped: `Byte(v)` at `where { v < 256 }`, `Digits(n)` for `00.5`, and `w = v` where nothing fixes a type, a `ZZ`. Seen failing on the base: 'Unification error: ... got arg 200:ZZ of type ZZ'. Its compiled twin, `compiler_tests/NumeralCoercionBodyCompiled`, from `P36NumeralCoercionBodyCompiled.fss`, with the `ZZ` case asserted as a string or dropped, since the prelude has no `assert` at `ZZ`: seen failing on the base, 'ZZ32->Byte is not applicable to an argument of type ZZ.' Add, on each path, a coercion without a `where` clause whose `v` stands at a `ZZ32` place and a numeral too large for it: refused statically (fork N1), by walk when the place runs.
2. **The checker** (fork N1): how a number of the four types where it stands. The compiled test passes.
3. **Walk** (fork N1). The walk test passes.
4. **The code generator** (fork N1), where the fold or the coercion's method needs the conversion. The compiled test passes, with the verifier on.
5. **The coercions** (fork N2): the one library's six; the tests' (PRB section 7, the list), each test passing after; the prelude's two that call `jBigToZZ64(v)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:578`, `:663`), then the library order (`build-and-caches.md`). If a prelude coercion cannot change without a change outside your files, leave it and report.
6. **The whole suites once,** `ant testSystem`, `ant testQuick` and `ant testOneLibrary`, on your final code: walk and the checker both change, and every numeral at a library type runs a coercion that you rewrote.
7. **The stages** once on your final tree, and the checker's timing before and after (P-148).

**The stages.** Both, once.

**Rows.** None names P-174's departure (P-174, "with no row"). Quote P-174's last sentence, "The tree departs too, with no row, where the numeral coercions of the one library and of many tests call a getter on the four numbers, as `v.asZZ32`, and where the checker and the literals chapter read each of the four as a `ZZ` value wherever it stands (F-342, F-345).", in your report with the words that make it true after your change, for the record-landing. A defect that your change finds and does not fix gets its row, `NEW-N-<n>`.

**Specification.** The sentences that read the four numbers as `ZZ` values wherever they stand: `Specification/basic/expressions/literals.tex:186-188` ("which it reads as values, integers of type \EXP{\mathbb{Z}}"), the box of `Specification/basic/trait-parameters.tex:115-121`, and Appendix I's numeral entry at `changes.tex:5202-5205`, `:5255-5257` and `:5437-5439` (walk binds them "as values of type \EXP{\mathbb{Z}}"). Bring each in line with P-174, in the revision form, and list each before and after.

**Files.** `interpreter/evaluator/values/Numerals.java` (`convert` and what binds the numbers); `scala_src/typechecker/staticenv/KindEnv.scala` (`getType`), and the checker's numeral conversion where a number of the four needs it, but not `Functionals.scala`'s `typedApplicationOfChecked` (rung K): if your reading must reach a call's resolution there, report it and build it outside; `compiler/codegen/NumeralCoercionFold.java`, and `CodeGen.java` only at the numeral coercion's method; `Library/FortressLibrary.fss` (the six coercions); `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:578`, `:663`; the tests of PRB section 7; `literals.tex:186-188`, `trait-parameters.tex:115-121` and the numeral entry's sentences of `changes.tex` named. Not: `FortressLibrary.fss:386-387` (`RR64`'s `coerce(x: ZZ32)` and `coerce(x: RR32)`, rung F's in run 2); walk's load check (rung G); microGPT.

**Reserved points.** A model line: none. A value of a numeral at a library type that changed under walk or compiled. A pinned message changed.

**Overlaps by file.** `CodeGen.java` with K and C; `changes.tex` with K and G: each keeps to its own members and entries.

### C. Three walls of a compiled program against the one library: the package of a generic dispatch method, and a method written twice into a class (rows 994, 1091 and 1099)

**The mission.** Compiled against the one library, with the verifier on, three walls stop programs that walk runs, and the onelibrary track holds them as expected failures (F-396):
- Row 994. `OverloadSet` names the owner of a generic function's instance table and its template class by the api's bare name at four places, `Naming.dotToSep(f.tagA.getText())` (`compiler/OverloadSet.java:962`, `:1421`, `:1784`, `:1788`), where every other place asks `NamingCzar.javaPackageClassForApi`, which puts a default library's classes in the package `fortress`. So the first call of the one library's generic `=` over `StandardPartialOrder`, or of `seq`, dies: 'NoClassDefFoundError' (PRB section 3, `OneLibraryStringEquality`). The switch rehearsal's repair: the four places ask `javaPackageClassForApi` (`compile-ladder/plan-31/probes/switch-rehearsal.md`, W11).
- Row 1091. A trait's class of default methods holds a method twice under one descriptor, its own and a bridge from a generic trait at its own type, so the class fails to load: 'ClassFormatError: Duplicate method name "copy" ... ImmutableArray1' at every varargs call, and 'Duplicate method name "-?0" ... Vector' in the rehearsal's `Arr` and `Dot`.
- Row 1099. `FullScalarRange`'s class of default methods holds `narrowToRange` twice, a bridge for each parent that declares it at a wider return type: 'Duplicate method name "narrowToRange"' at a reduction over a range (`OneLibraryConditionalReduction`).
The code generator gathers a class's bridges with an identity set per declaration (`compiler/codegen/CodeGen.java:1197-1236`, around `bridged`), which keeps no record of the descriptors written. You make each call name its class with its package, and write each method once per name and descriptor.

**The decisions this rung builds.** None names the mechanism. Section 3's forks C1, C2 and C3.

**What you build, in order.**
1. **The tests first.** Promote `one_library_tests/XXXOneLibraryRunStringEquality.test`, `XXXOneLibraryRunConditionalReduction.test` and `XXXOneLibraryRunVarargs.test` (each a run test of a plain compile test). Add `one_library_tests/OneLibraryArr` and `OneLibraryDot`, from `plan-34/probes/programs/Arr.fss` and `Dot.fss`, each a compile test and a run test that asserts its value (`a[5] = 25`; `dot = 499500.0`), with the verifier on. Seen failing on the base, compiled against the one library through `old-fortress.sh` with a private copy of the base build's `caches-one`: 'REACHED', then 'java.lang.NoClassDefFoundError'; 'Duplicate method name "copy"'; 'Duplicate method name "narrowToRange"'; and for both array programs 'Duplicate method name "-?0"' (PRB section 3). Run them in one JVM with `junit.sh`, `FORTRESS_LIBRARY=one ONE_JVM=1`, `OneLibraryComponents.test` named first (`tests-running.md`, "Compiled tests").
2. **Row 994** (fork C1), then **rows 1091 and 1099** (fork C2). Each test passes, or stops at a later row: `OneLibraryVarargsCount` prints numbers by `println`, which by reading meets row 1098 once its array's class loads (fork C3).
3. **`ant testOneLibrary`** once, at the end, on your final code.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 994, 1091 and 1099. Row 1098, `println` of a number, waits for review-queue item 616: leave it, and name each test that it still stops.

**Specification.** `grep -rn '~994\|~1091\|~1099' Specification --include=*.tex` prints two places on the base, both on row 1091: `Specification/appendices/changes.tex:4063-4067` ("but the class of the array of a varargs call's arguments does not load ... (row~1091 ...), so no program that calls a declaration with a varargs parameter runs on the compiled path yet") and `:6424-6426`. Bring each in line, naming row 1098 where it stops a program, and list each before and after.

**Files.** `compiler/OverloadSet.java` (the four names); `compiler/codegen/CodeGen.java`, the gathering and writing of a class's own methods and bridges (`:974-1240`); the two clauses of `changes.tex`; your tests. Not: `CodeGen.java`'s call emission and casts (rung K) or the numeral coercion's method (rung N); the library; walk; microGPT.

**Reserved points.** A model line: none.

**Overlaps by file.** `CodeGen.java` with K and N; `changes.tex` with K, G and N: each keeps to its own members and entries.

### F. The getter asRR64 in place of asFloat on the eight number types, in the one library, its uses, the tests, the demos and the specification (P-165)

**The mission.** P-165: "`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64` each declare the getter `asRR64`, so the written conversion into `RR64` is `x.asRR64` at every concrete type". The one library declares `asFloat(self): RR64` on each, called `asFloat(x)` (F-324; `Library/FortressLibrary.fsi` six declarations, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:66`, `:132`), and uses it in its own bodies, in `QuickCheck`, `Random`, `String` and `Timing` (PRB section 7). 33 test files, 18 demos and rung C's `Dot` call it. You declare the getter on the eight types in its place, and rewrite every use.

**The decisions this rung builds.** P-165, P-161 for the getter's form, P-79 for the demos. Section 3's fork F1.

**What you build, in order.**
1. **The tests first.** `tests/AsRR64GetterWalk.fss`: `x.asRR64` at each of the eight types, at a value where each converts exactly and one where it rounds; seen failing on the base (`asRR64` is not a member of the one library's types). A one-library compile test that the checker accepts `x.asRR64` at the eight types; seen failing on the base.
2. **The library** (fork F1), its declarations and uses. Then the tests and the demos that call `asFloat`, and `Dot`. Run the tests that you rewrote in one JVM.
3. **Walk's suite once,** `ant testSystem`, and **`ant testOneLibrary`**. The gather runs the 52 demos on the merged tree; rewrite each demo's `asFloat` all the same (P-79).
4. **The stages** once on your final tree.

**The stages.** Both, once.

**Rows.** None names the departure; F-324 states it ("no row"). Quote F-324's "but for P-165's name: the types declare `asFloat`, not the getter `asRR64` (no row)" in your report for the record-landing.

**Specification.** `Specification/basic-lib/numbers.tex:60-75` ("written \EXP{\VAR{asFloat}(x)} with the method that each of these types declares"), and Appendix I's entry on `asFloat`, `revival-asfloat` (`Specification/appendices/changes.tex:2882-2951`) and its other mentions (`:578`, `:4855`, `:5254`, `:5262`, `:5322`, `:5658`): bring each in line in the revision form, and list each before and after.

**Files.** `Library/FortressLibrary.fsi` and `.fss`, the `asFloat` declarations and uses; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and `.fss`; `Library/QuickCheck.fss`, `Random.fss`, `String.fss`, `Timing.fss`; the tests and demos that call `asFloat`; `one_library_tests/OneLibraryDot.fss`; `numbers.tex` and `changes.tex` as named. Not: the prelude (P-37); microGPT; walk's Java.

**Reserved points.** A model line: none. A demo that no longer reaches its end. A team test's checked value changed.

**Overlaps by file.** `FortressLibrary.fsi` and `.fss` with rung B, far apart (B beside `opr <->`).

### Y. The one library's run-time names: asString in a generic body, an uncaught exception's report, and a raised object without value parameters (rows 1101, 1102 and 1103)

**The mission.** Three differences of a compiled program against the one library, each an expected failure or a pinned placeholder in the onelibrary track:
- Row 1101. `u.asString` in a generic body, `u` of a type parameter bounded by `ZZ32`, dies with 'NoSuchMethodError': the payload class answers `asString` only at the prelude's `String` (PRB section 3, `OneLibraryGenericAsString`).
- Row 1102. An uncaught exception is reported with the run time's placeholder, 'Bogus value from FValue.asString()' (`compiler/runtimeValues/FValue.java:22`; `OneLibraryUncaughtRaise.test` pins it).
- Row 1103. An exception object without value parameters that a helper raises is a second instance of the object (`compiler/runtimeValues/Utility.java`, `makeFortressException`, `c.getConstructor().newInstance()`), so `e SEQV IntegerOverflow` is `false`: 'FAIL: the caught IntegerOverflow is the object IntegerOverflow' (`OneLibraryHelperRaiseSingleton`).
You make each behave as under walk, in the second set of run-time classes (`ProjectFortress/src-one/`) where the first set must stay the prelude's.

**The decisions this rung builds.** Review-queue item 617 (not consequential): the type of `FValue.asString` in each set. Section 3's fork Y1.

**What you build, in order.**
1. **The tests first.** Promote `one_library_tests/XXXOneLibraryRunGenericAsString.test` and `XXXOneLibraryRunHelperRaiseSingleton.test`; change `OneLibraryUncaughtRaise.test`'s pinned report to the exception's own `asString`. Seen failing on the base as PRB section 3 gives.
2. **The three fixes** (fork Y1), each test passing with the verifier on. Make the same change in a class's copy under `src-one` where both sets hold it (`compiler.md`, "The compiler's prelude, until the switch-over").
3. **`ant testOneLibrary`** once, at the end, and the compiled tests of exceptions in one JVM (`git ls-files 'ProjectFortress/compiler_tests/*Raise*.test' 'ProjectFortress/compiler_tests/*Exception*.test'`).

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 1101, 1102 and 1103.

**Specification.** `grep -rn '~1101\|~1102\|~1103' Specification --include=*.tex`: list any sentence that your change makes false, or none.

**Files.** `compiler/runtimeValues/Utility.java`, `FValue.java`, `MutableFValue.java`, and their copies under `ProjectFortress/src-one/`; the payload classes only where row 1101's method lives; your tests. Not: the code generator; the libraries' text; walk; microGPT.

**Reserved points.** A model line: none.

**Overlaps by file.** None.

### B. The exclusive or, the nand and the nor of two booleans, and majority, in the one library (row 1121)

**The mission.** The specification's `Boolean` has `OPLUS` (⊕), `NAND` (⊼), `NOR` (⊽) and the method `majority` (`Specification/basic-lib/booleans.tex:60-69`, `:131`); the compiler's prelude declares the three operators (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:464`, `:469-470`); the one library declares none of the four, so walk refuses `t OPLUS f`, 'Operator OPLUS is not defined.' (PRB section 1), and the switch-over would drop the prelude's three. Climb batch 35b's rung E declared `EQV` and `NEQV` beside `opr <->` as top-level operators (F-403; `Library/FortressLibrary.fsi:2792-2794`, `.fss:4922-4924`). You declare the four in the same form.

**The decisions this rung builds.** P-37: the prelude gains no declaration. Section 3's fork B1.

**What you build, in order.**
1. **The tests first.** Promote `tests/XXXBooleanOplusNandNorMajorityWalk.fss`, which asserts each by the trait's properties, `(a NOR b) = NOT (a OR b)` among them; seen failing on the base, 'Operator OPLUS is not defined.' A one-library compile test that the checker accepts the four; see it fail on the base.
2. **The library** (fork B1), beside `opr <->`. The tests pass.
3. **`ant testOneLibrary`** and **the stages** once on your final tree.

**The stages.** Both, once.

**Rows.** Close 1121.

**Specification.** `grep -rn '~1121' Specification --include=*.tex`: list any sentence that your change makes false, or none. Leave `booleans.tex:293-294`, the `NOR` entry's text, as it is: it waits for the curator (item E.skeptic.3 of climb batch 35b).

**Files.** `Library/FortressLibrary.fsi` and `.fss`, beside `opr <->`; your tests. Not: the prelude (P-37); walk's Java; microGPT.

**Reserved points.** A model line: none. A program over the APL experiments' `AplCore`, which declares its own boolean operators: run one once and report.

**Overlaps by file.** `FortressLibrary.fsi` and `.fss` with rung F, far apart.

### T. Walk's tryatomic passes an exit and an exception through unwrapped (rows 1110 and 1111)

**The mission.** Under walk, a `tryatomic` block that no `atomic` block encloses wraps whatever leaves it in a Java `RuntimeException` (`interpreter/evaluator/Evaluator.java:205-233`, `forTryAtomicExpr`): an `exit` to an enclosing `label` never reaches it, 'exit from nonexistent label block done' (row 1110), and a Fortress exception never reaches a `catch` clause around it, 'java.lang.RuntimeException: java.lang.RuntimeException: FortressException: Boom' (row 1111; PRB section 1). Climb batch 35's rung A made an exit out of an `atomic` block keep its writes and reach its label (F-401). You let both leave the `tryatomic` as they are.

**The decisions this rung builds.** None names the mechanism. Section 3's fork T1.

**What you build, in order.**
1. **The tests first.** Promote `tests/XXXExitOutOfTryAtomicWalk.fss` and `tests/XXXThrowOutOfTryAtomicWalk.fss`; seen failing on the base as above.
2. **The fix** (fork T1). Both pass, at one thread by a direct run and at four through the harness (`tests-writing.md`, "Names, comments, citations").
3. **The whole suite once,** `ant testSystem`, and the four-thread atomic runs (`gate.md`, "The atomic runs"), since the change is in transactions.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 1110 and 1111.

**Specification.** `grep -rn '~1110\|~1111' Specification --include=*.tex`: list any sentence that your change makes false, or none.

**Files.** `interpreter/evaluator/Evaluator.java` (`forTryAtomicExpr`); your tests. Not: the compiled path; microGPT.

**Reserved points.** A model line: none. An atomic run that fails.

**Overlaps by file.** None.

### The rule the rungs keep, and how they meet

- **Run 1.** No declaration is expected in two rungs. Where one may reach another's file, each keeps to its members:
  - `compiler/codegen/CodeGen.java`: K in the emission of a call's arguments and its casts (`castToTypeBelow`, `:8255`, and its callers); C in the gathering and writing of a class's own methods and bridges (`:974-1240`); N only at the numeral coercion's method, if `NumeralCoercionFold.java` cannot hold its change.
  - `scala_src/typechecker/impls/Functionals.scala`: K only. N keeps out of it, and reports if its reading must reach a call's resolution.
  - `Specification/appendices/changes.tex`: K at `:3750-3753`, G at `:2424-2426`, `:3128-3131` and the numeral entry's sentence on walk's load check (`:5447-5448`), N at the numeral entry's sentences on the four numbers (`:5202-5205`, `:5255-5257`, `:5437-5439`), C at `:4063-4067` and `:6424-6426`. G and N meet in the numeral entry, at sentences ten lines apart; each keeps to its own.
  - The gather's order is the script's: of two rungs that share a file, the one whose lowest edited line is lower goes first (`climb-batch-workflow.md`, "Gather", "The order").
  - If a rung's cause lies in a member that another names, it reports it and builds its repair outside it.
- **Run 2.** F and B share `FortressLibrary.fsi` and `.fss`, far apart; Y and T share nothing. Their sections are read again on run 1's landed tree before the launch.
- **They meet on the merged tree:** the suites, the atomic runs and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief, piece by piece, with its home here.

- **The checker's choice by hash order, at the root (rows 1100 and 935), with row 996 sized apart:** rung K; row 996 waits (section 3, fork X2). The specification's overloading chapter gives a declaration more specific by its declared parameter types, a dotted method's receiver among them, declarations with static parameters compared on their declared domains with no static argument inferred, and says that the rules on overloaded declarations "guarantee that among all applicable declarations, one is more specific than all the others" (`Specification/basic/overloading.tex:353-372`); at run time it chooses "an arbitrary declaration among the declarations such that no other applicable declaration is more specific than them" (`:309-311`), which only P-60's coverage reaches.
- **Row 1125, first among the rows:** rung G.
- **P-174's coercion body, `Byte(v)`:** rung N.
- **P-165's getter `asRR64`:** rung F, run 2, after N, which rewrites adjacent lines of the library.
- **The rest of the review's list, as size allows:** rung C (rows 994, 1091 and 1099, `Arr` and `Dot`); run 2's Y (rows 1101 to 1103), B (row 1121) and T (rows 1110 and 1111). Row 1098 waits for item 616.
- **The skill passages that go:** section 6, "For the skill writer".

### The planner's probes

`compile-ladder/plan-36/probes/fixes-36.md` holds the runs with their commands and output: walk on the base (section 1), compiled against the prelude (section 2), compiled against the one library on the old code (section 3), the checker's ties counted (section 4), the plain-self hack (sections 5 and 6), the counts for rungs N and F (section 7), the disk (section 8), and the ledger (section 9). Its programs are in `programs/tests/` and `programs/compiler_tests/`; its two patches, never in a tree, beside it.

**Not run:** a gate stage but the distance stage as a probe; a whole suite but `compiler_tests/` as a probe; a timing; walk's form of rows 1100 to 1127 that are the checker's; row 1124's and row 1101's, 1102's and 1103's own tests on the base, which their rows state; the run tests of rung C with the fixes in place.

### Rows filed by plan

None new: each defect that a rung takes has its row, and the probes found none that no row holds. A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

### Left out, each with its home

- Row 996: the batch after, beside rung K's stable order; its test compares two compiles' bytes.
- Row 1098: review-queue item 616.
- Rows 1104 and 1105; rows 1106 to 1109; row 594; rows 1123, 1126 and 1118; row 1094 (fork K7): the review's list, in its order, for the batch after.
- Rows 744 and 1120, and the `NOR` text: their questions (`PLAN.md`, "Climb batch 35b, listed for his review").
- Rows 1128 and 1129: after the list, as the coordinator's message of 2026-11-24 gives them.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 35b: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-36/manifest/` is made from `compile-ladder/plan-35/manifest/` before the launch: `lists36.py` holds the briefings of section 1, `gen36.py --run 1|2` writes a run's block from the record, and `check36.js --run 1|2` checks the block in a scratch copy of the script and, with `--write`, splices it.

- run 1: `BATCH` `36`, the folder `compile-ladder/climb-batch-36/`, the rungs K, G, N, C in that order; run 2: `BATCH` `36b`, `compile-ladder/climb-batch-36b/`, the rungs F, Y, B, T;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backtick, a backslash or a double quote;
- no rung declaring a count, a crash or a move;
- G, C, Y and T `STAGE_BLIND`; K, N, F and B naming the two stages in a step of their sections;
- section 4's characters outside ASCII: `≡`, `≢`, `⊕`, `⊼`, `⊽` in prose only, none in a key.

### What every agent reads first

**Run 1.** This run is climb batch 36, the first of the two runs of the record CLIMB-BATCH-36.md: the batch after climb batch 35b, in the order of priority that the record gives. Its rungs:

- K, the checker chooses among a call's declarations by their signatures as declared, in an order that no hash decides;
- G, three of walk's departures: methods that differ only in their bounds, a tuple result, and a numeral type written;
- N, a numeral coercion's four numbers convert where they stand, on both paths;
- C, three walls of a compiled program against the one library.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. K, N and C may all reach CodeGen.java, and K and N the checker: each keeps to its own members, as its section says. K and N run the count stage and the distance stage once; G and C run neither. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies the rungs in the script's order, expected K, G, N, C, and builds the specification once.

**Run 2.** This run is climb batch 36b, the second of the two runs of the record CLIMB-BATCH-36.md, after climb batch 36, which landed rungs K, G, N and C. Its rungs:

- F, the getter asRR64 in place of asFloat;
- Y, the one library's run-time names;
- B, the exclusive or, the nand, the nor and majority of booleans in the one library;
- T, walk's tryatomic passes an exit and an exception through unwrapped.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. F and B both edit the one library, far apart. F and B run the count stage and the distance stage once; Y and T run neither. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies the rungs in the script's order, expected F, Y, B, T, and builds the specification once.

### Before the launch

The coordinator, for run 1:

1. **The check of this record by a fresh reader on Fable,** its changes in place (`references/batch.md`, "The go"); the go was given in advance.
2. **The gate's step 7 and the skills' passages on comparing output,** by P-103's new sentences, the coordinator's (the brief).
3. **The generator** for `--run 1`, its checks and the splice, as the manual's "Before the launch", step 4, gives them; the keys into this record and into the probe notes checked with `facts-extract.sh --check`. The base is `main`'s head after that commit.
4. **The base build.** `/home/user/fortress-wsuite` at `4b0e3abd6a`, built and clean, with its `caches-one`, serves while `main` moves only under `explorations/`, `docs/` and `.claude/` (`git diff --stat 4b0e3abd6a <base> -- . ':!explorations' ':!docs' ':!.claude'` prints nothing; it printed nothing on `98b96c0b04`). The planner seeded its probe tree from it on 2026-11-24 and removed it.
5. **The disk:** 10 GiB or more free for four rungs (section 2, "Cost and time"); `git status --porcelain` empty in the main tree. `/home/user/fortress-base43`, at `0a83a70498`, serves no run.
6. **The launch from a turn that no message of the curator's started,** a check-in's turn.
7. **Check-ins** for about 6 hours and 15 minutes, 45 minutes apart; the check-in file `<scratchpad>/batch36/checkins.txt`.

For run 2, after run 1's landing: sections F, Y, B and T and "The rule the rungs keep" read again against the landed tree; a base build at run 1's landing; the generator's block for `--run 2`, checked and spliced; then steps 5 to 7 with 10 GiB free and check-ins for about 4 hours and 45 minutes.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-wsuite'}})` for run 1, and the same with run 2's base and its base build for run 2. The arguments of each are kept byte for byte.

### The gate, and what it should show

The comparands for run 1 are climb batch 35b's, in `compile-ladder/climb-batch-35b/gate/`: 64 suites, 3,698 tests, `CompilerJUTest` 1,810, `OtherCompilerJUTest` 263, `LibraryJUTest` 86, `OneLibraryJUTest` 41, the system shards 897, `SpecDataJUTest` 130, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`, microGPT's quick pair 7 of 7 each. The gate's new step for P-103 takes its comparand where the coordinator's change of step 7 says.

- `testFast`: the compiler track gains K's two tests and N's compiled twin; K's promotions of rows 1127, 543 and, if it passes, 770 become plain tests; row 528's expected failure fails at the compile. The onelibrary track gains C's two array tests and its three promotions where they pass.
- `testSystem`: N's walk test; G's three promotions.
- The atomic runs: unchanged, 24 programs, each three times `PASS`.
- The ladder: no rung declares a move.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each.
- For run 2 the comparands are run 1's gate. `testSystem` gains F's test and its rewritten tests, B's promotion and T's two; `testFast`'s onelibrary track F's and B's compile tests and Y's promotions.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Run 1, closed:** 1100, 935, 1112, 1127, 543, and 770 if its test passes (K), rows 528 and 499 rewritten; 1125, 1122 and 1124 (G); 994, 1091 and 1099 (C).
- **Run 2, closed:** 1101, 1102 and 1103 (Y); 1121 (B); 1110 and 1111 (T).

### After the landing

- **PLAN:** phase 4's climb batch 35b line, whose list this batch takes from (`PLAN.md:60`); "Next" (`:13`); the "Runs" line (`:9`), for the one-library programs that run; phase 5's line on the code generator's gaps (`:120`), for row 770; and the line of each run of this batch.
- **The review queue:** consequential forks only, by the queue's head; this record has none. Item 617 built by Y; item 58's row 543 built by K; item 503's other forms built by G.
- **The post-batch review** of each run.

### For the record-landing workflow

No rung edits a FACTS or POSITIONS entry. After run 1, these are false or name a closed row as open:

- **F-225:** "In a trait whose `comprises` clause lists types, `self` is instead the trait met with the union of those types, and the exclusion test reads its signatures plain." The signatures now keep the plain trait type there too (K).
- **F-76:** "In an accepted family that has any other generic declaration, such a call is typed by its first minimal candidate in the call's order of overloadings, which follows the build (row 935), not by the intersection (row 543). That narrower scope than P-60's is a default." (K).
- **F-377:** the cast of `self` at a call whose chosen declaration takes a listed type (K).
- **F-232:** "`DeclaredFunction`s, entries of the checker's index and not nodes, still hash by identity": no choice of the checker now follows their order (K).
- **F-26, F-253 and F-405:** "except two that differ only in their bounds, of which the first met is kept (row 1125)" and its siblings (G).
- **F-341:** "one written as a return type, a variable's or a field's type loads, and is refused only where a numeral meets it (row 1124)" (G); "run with the four numbers bound as values of type `ZZ`" (N).
- **F-342:** "but not P-174's four numbers, which P-174 converts where they stand (no row)" (N).
- **F-345:** "P-174 instead converts each of the four where it stands (no row)" (N).
- **F-347:** "the coercion's method of the four numbers as `ZZ` values", where N's change reaches it (N).
- **F-396:** rows 1091, 1099 and 994 as the onelibrary track's refusals (C).
- **P-174:** "Row 1124 holds where the tree departs: ..." (G) and "The tree departs too, with no row, where the numeral coercions ... (F-342, F-345)." (N). Rungs G and N quote both in their reports; the record-landing brings P-174 in line, as climb batch 35b's did on 2026-11-23 at 21:55Z, and the coordinator names the change to the curator.

After run 2:

- **F-324:** "but for P-165's name: the types declare `asFloat`, not the getter `asRR64` (no row)" (F); and P-165's own text, which names `asFloat` only as the one library's departure in the skill, stays true.
- **F-403:** the one library's boolean operators, now six (B).
- **F-396:** rows 1101, 1102 and 1103 (Y).

P-37, P-146 and P-180 stay true. P-146 names the self-typed traits; K1 builds its rule for the `comprises` traits too, which the record-landing states in FACTS beside F-225 and names to the curator.

### For the skill writer: the passages of `fortress-repo` this batch makes false or needless

The batch writes no skill text. After each landing, the record-landing workflow's skill writer removes or rewrites these passages, each as on `main` at `7b7d4c1c56`, the last commit that changed the skill when this record was written; other workers edit the skill tonight, so the writer finds each by its words.

After run 1:

- `references/compiler.md:178` (section "The checker's gaps"): the bullet "A tie: where two generic candidates fit a call equally, the checker sorts the candidates and keeps the first. The sort's order varies with what the same JVM compiled before. ... (ledger rows 499, 1046, 1047). If a compiled test passes alone and fails in the suite, look for such a tie first." Goes, or becomes the rule: the more specific declaration by its declared signature decides, and a tie that the rules leave is a static error (K).
- `references/compiler.md:137` (section "Traps of the compiled path"): "At `RR32`, `=` compiles and overflows the stack when it runs (ledger row 528)." Rewritten: `c = 0` at the prelude's `RR32` is a static ambiguity; `=` of two `RR32` values still overflows (K).
- `references/revival-changes.md:15` (section "Dispatch and overloading"): "In a departure, where two generic dotted methods of one name and parameter count differ only in their static parameters' bounds, walk drops one at load. ... a call on a `ZZ32` runs the first (row 1125)." Goes (G).
- `references/interpreter.md:29` (section "What walk checks"): the bullet "A numeral type written as a return type, a variable's or a field's type loads. Walk refuses it only where a numeral is bound at it ..." (row 1124). Goes (G).
- `references/revival-changes.md:99` (section "Numbers"): "The tree departs: walk, the checker and the code generator read each as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347). Under walk, write `Byte(v.asZZ32)`, as the one library does: the getter raises `IntegerOverflow` outside `ZZ32`'s range." Goes (N).
- `references/compiler.md:49`, `:50` and `:52` (section "What the compiled path cannot compile yet"): the bullets on a varargs call (row 1091), a reduction over a range (row 1099), and `=` and `<` of two strings and `=` of two booleans (row 994). Go (C); the list's lead-in stays for rows 1098, 1101 and 1102 until run 2.

After run 2:

- `references/revival-changes.md:112` (section "Numbers"): "The one library departs: each declares `asFloat(self): RR64` instead, so write `asFloat(x)` (F-324)." and "write `asFloat(x) = y` for an `RR64` `y`". Rewritten to `x.asRR64` (F).
- `references/revival-changes.md:116`: "convert each `ZZ64` operand with the one library's `asFloat`, as `asFloat(s) / asFloat(n)`". Rewritten to `s.asRR64 / n.asRR64` (F).
- `references/library.md:23`: "`ZZ64` converts into `RR64` only explicitly, by `asFloat`." Rewritten (F).
- `references/compiler.md:53` and `:54` (section "What the compiled path cannot compile yet"): the bullets on `u.asString` in a generic body (row 1101) and an uncaught exception's placeholder (row 1102). Go (Y).
- `references/compiler.md:156` (section "Traps of the compiled path"): "On the compiled path, against either library, an exception object without value parameters that a helper raises is a second instance of the object ... (ledger row 1103)." Goes, or narrows to the prelude if Y's fix reaches only the one library (Y).

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-35.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-35.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-36/probes/fixes-36.md), [their programs](https://github.com/palimondo/fortress/tree/main/explorations/compile-ladder/plan-36/probes/programs), [climb batch 35b's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-35b-review.md), [climb batch 35's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-35-review.md), [climb batch 35's gate repair](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-35/REPAIR-gate.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md).
- Code: [FunctionalMethod.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java), [Functionals.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala), [CoercionOracle.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala), [TopLevelEnv.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java), [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [OverloadSet.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java), [Constructor.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java), [OverloadedFunction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java), [BuildEnvironments.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java), [Numerals.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java), [KindEnv.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala), [NumeralCoercionFold.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/NumeralCoercionFold.java), [Utility.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java), [Evaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java), [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [CompilerBuiltin.fsi](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi).
- Specification: [overloading.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/overloading.tex), [var-ref.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/var-ref.tex), [traits.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/traits.tex), [advanced/overloading.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/overloading.tex), [literals.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/literals.tex), [numbers.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic-lib/numbers.tex), [booleans.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic-lib/booleans.tex), [atomic.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/atomic.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
