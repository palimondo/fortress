<!-- The record of climb batch 34, in two runs (climb batch 34 and climb batch 34b), for the coordinating session, the curator and the batch's workers: the first program compiled to bytecode and run against the one library, under the gate, the aim that the curator took on 2026-11-18. Run 1, five walls that stand between the fourteen components and that run, each with a test of its own: a variable read by a label body's code on a path that never set it (L, row 1078); an overloaded call with an assumption at some arguments (P, row 818); a generic method called on a receiver typed by a type variable (T, row 1076); NN32's two getters and the checker's acceptance of a getter that widens an inherited one (G, row 993); walk's strings freed of the line that names FlatString as a value (F, row 1090). Run 2, on run 1's landed tree: the carriers of the one library's built-in types, fork N4 among them, the run time's prelude names, the fourteen components compiled to jars in the gate's onelibrary track, and Hello run there (C, rows 874 and 1062). -->
<!-- History. Drafted 2026-11-18 by the planning worker of climb batch 34, on Opus, against `main` with the code of `ba3c7c876d`, the base build `/home/user/fortress-base39` (`git diff --stat ba3c7c876d HEAD -- . ':!explorations' ':!docs' ':!.claude'` prints nothing). -->
<!-- **No go.** The curator took the aim on 2026-11-18 at about 07:5x UTC ("Okay, let's go with that."), and gave no go. This record launches nothing. A Fable review reads it after the weekly reset of Friday 2026-11-20, 10:00 UTC; section 2 is written for his go or his refusal. -->
<!-- Sources: the planner's brief (`<scratchpad>/batch33b/planner-34-brief.md`); POSITIONS P-33 with its history, P-37, P-164, P-169, P-178, P-148; FACTS F-34, F-53, F-352, F-353, F-381, F-388, F-390, F-391; `coordinator/CLIMB-BATCH-33.md`, section 2, "For the batch after, in this order" and its last paragraph; `reviews/batch-33b-review.md`, sections 3 and 5, Part 5 and "The steps due before the batch after"; `reviews/batch-33-review.md`, section 5; `compile-ladder/plan-33/probes/measure-ba3c7c876d.txt`; `compile-ladder/rung-number-payload-objects/REPORT.md`; `compile-ladder/plan-31/probes/switch-rehearsal.md`, `probe-y.md` and its patch; `reviews/carriers-ways-2026-11-13.md`, whole; `reviews/arrays-primer-2026-11-17.md`, section 11; review-queue items 513, 521, 592, 597 and 601; the ledger rows named in section 1; the `coordinator` skill's `references/batch.md`, "The go" and "The workflow"; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the code at the sites. -->
<!-- Checked 2026-11-20 by a fresh reader on Fable, by reading only: `coordinator/climb-batch-34-review.md`. Its corrections are in place here (its section A); its finding C1 names fork L1's fallback as the curator's to decide before the launch. Its check 2, the failing programs of rungs P, T, G and F run once on a worktree seeded from the base build (rung L has none yet), followed the same day (its section B8): P's, T's and F's tests and G's first fail on the base as their sections' lines "Seen failing on the base:" quote; G's second test compiles on the base, a point for the coordinator in G's section; forks P1 and G1 are restated by it. -->
<!-- The planner's probe: `compile-ladder/plan-34/probes/rehearsal.md`, with its patch `rehearsal-34.patch`, its scripts and programs beside it, run in a worktree of the planner's own, `/home/user/fortress-p34`, seeded from the base build and removed after. No gate stage ran. -->

# Climb batch 34

## 1. The manifest, rung by rung

The batch's generator writes each run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. Run 1, climb batch 34, holds L, P, T, G and F in that order; run 2, climb batch 34b, holds C. In run 1, L, P and T share `compiler/codegen/CodeGen.java`, each in members of its own; G and F share no file with any rung. The order of run 1 is that of the rungs' lowest edited lines in `CodeGen.java` (section 4, "The rule the rungs keep"), then G and F. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-34.md#`, PRB for `doc:explorations/compile-ladder/plan-34/probes/rehearsal.md#`, PY for `doc:explorations/compile-ladder/plan-31/probes/probe-y.md#`, REH for `doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#`, CW for `doc:explorations/reviews/carriers-ways-2026-11-13.md#`, RN for `doc:explorations/compile-ladder/rung-number-payload-objects/REPORT.md#`, SPEC for `doc:Specification/`, and SRC for `code:ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main`, each matching one place.

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | L | `rung-label-local-verify` | A label body's local that the JVM's verifier finds unset, in the one library's simplestRationalBetween | 240 |
| 1 | P | `rung-partial-assumption` | An overloaded call with a type assumption at some of its arguments | 200 |
| 1 | T | `rung-type-variable-receiver` | A generic method called on a receiver typed by a type variable | 150 |
| 1 | G | `rung-widening-getter` | NN32's two getters, and the checker's refusal of a getter that widens an inherited one | 180 |
| 1 | F | `rung-flatstring-name` | Walk's strings without the line that names FlatString as a value | 150 |
| 2 | C | `rung-first-run-one-library` | The first program compiled and run against the one library, under the gate | 420 |

Fields common to the six rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-label-local-verify`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** none: C's fourteen library compiles are `.test` files of the onelibrary track, which `testFast` already runs (section 4, C). **expected moves:** none.
- **lands only with:** none. In each run every rung lands on its own. C is written on run 1's landed tree: its test, `Hello`'s run, needs L, P, T, G and F (section 2, "The two runs").
- **its test is the stage:** no. **the stages:** G, F and C run the count stage and the distance stage once on their final trees, as a step of their sections: G edits the checker's Scala and `FortressBuiltin.fss`, F edits `FlatString.fss`, both read by the stages, and C edits `NamingCzar`'s tables, which the checker's rewrite of the bindings reads. L, P and T run neither and list their files (`STAGE_BLIND`): their edits are in the code generator, which the stages do not run. L, P, T and C each run the distance stage's shadow patch once on their final trees if they edit `CodeGen.java`, since that tool edits a copy of it.
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 33b's gate left them (F-53). **expected checker crash:** none.

### L
- **slug:** `rung-label-local-verify`
- **worktree:** `/home/user/fortress-label-local-verify`
- **section:** `L. The JVM's verifier and a label body's local in the one library's simplestRationalBetween: the cause traced, a test against the prelude, and the repair (row 1078)`
- **blurb:** compiled against the one library, every program dies as the library's main class loads: 'VerifyError: Bad local variable type' in simplestRationalBetween, a function with mutable locals, exits in typecase and if arms and a local function in one label block, where a local is read on a path that never set it (row 1078). The planner's probe met it on climb batch 33b's landed code with the carriers' walls hacked past; two ZZ32 copies of the shape verify against the prelude. The rung traces the cause in a scratch copy, writes a test against the prelude that shows it, and repairs it in the code generator.
- **points to report:**
  - The cause as found: the local, the path that leaves it unset, and the bytecode around the refused instruction.
  - The test against the prelude that shows the cause, failing on the base and passing after, at one thread and at four; or, if none can be written, why not.
  - The one library's simplestRationalBetween after the repair: whether its class passes the verifier in the scratch copy, and what the planner's verifier count gives there.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (11 keys, 6 checks):
  - ledger:1078 (check): the verifier's refusal, which closes.
  - ledger:983: a closure that captures every variable in scope, a sibling of the local's path.
  - PRB `3. The walls, in the order met` (check): wall 2, its message, and the two prelude copies that verify.
  - PRB `2. The hacks, each marked PROBE 34 HACK in the patch`: the scratch tree in which the wall reproduces.
  - PRB `4. The verifier's count over the emitted library`: ASM's reading of the same method.
  - `code:Library/FortressLibrary.fss#simplestRationalBetween(a:QQ, b:QQ): QQ = label done` (check): the one library's site.
  - SRC `compiler/codegen/CodeGen.java#public void forLabel(com.sun.fortress.nodes.Label x)` (check): the label block's code.
  - SRC `compiler/codegen/CodeGen.java#public void forExit(com.sun.fortress.nodes.Exit x)`: the exit's code.
  - SPEC `basic/expressions/label.tex#Label and Exit` (check): what a label block and an exit do.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator writes a method body.
  - REC `Forks the batch takes` (check): the defaults you build.

### P
- **slug:** `rung-partial-assumption`
- **worktree:** `/home/user/fortress-partial-assumption`
- **section:** `P. An overloaded call with a type assumption at some of its dispatched arguments but not all, on the compiled path (row 818)`
- **blurb:** the code generator refuses a call of an overloaded function or functional method with asif at some of its dispatched arguments and not at the others: 'Can't compile a dispatched call whose arguments are not all type assumptions' (row 818). The one library's String has the form twice, concatAndBalanceIfNecessary(s1 asif String, s2), so the component does not compile under the selector, and every program against the one library needs String. The rung compiles the form: the call chooses among the declarations as if each assumed argument had its assumed type, and by run-time type at the others, as walk does.
- **points to report:**
  - The call as compiled: how the declarations applicable at the assumed types are found, and what is emitted when one is left and when several are.
  - Row 818's test promoted, failing on the base and passing after, and walk's answer for it; `String`'s compile under the selector, before and after.
  - The other forms of row 818's notes, each still refused: unchanged, or their message.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (9 keys, 6 checks):
  - ledger:818 (check): the refusal, which closes for the partial form.
  - SPEC `basic/expressions/type-annotation.tex#Type Assumption` (check): what an assumption does to the call around it.
  - SPEC `basic/overloading.tex#Overloading Resolution` (check): how the declaration of a call is chosen.
  - SRC `compiler/codegen/CodeGen.java#private boolean assumedArgumentsCall(FunctionalRef x, ArrowType arrow, String pkgClass, String theFunction,` (check): where the code generator refuses the form.
  - SRC `interpreter/evaluator/Evaluator.java#public FValue forAsIfExpr(AsIfExpr x)`: walk's value of an assumption, the precedent.
  - `code:Library/String.fss#concatAndBalanceIfNecessary(s1: CatString, s2: FlatString):String = do`: the one library's site.
  - PRB `3. The walls, in the order met` (check): wall 1, which the measure does not count.
  - `map:compile-path-walkthrough.md#4. Desugaring, overload rewriting, and the switches`: where an overloaded call is marked before the code generator.
  - REC `Forks the batch takes` (check): the defaults you build.

### T
- **slug:** `rung-type-variable-receiver`
- **worktree:** `/home/user/fortress-type-variable-receiver`
- **section:** `T. A generic method called on a receiver typed by a type variable, on the compiled path (row 1076)`
- **blurb:** the code generator crashes on a generic method called on a receiver whose static type is a type variable, as x.m[ZZ32](3) with x: F and F extends Gen: 'ClassCastException: VarType cannot be cast to TraitType' (row 1076). The one library's __bigOperator2 meets it, the one declaration of the fourteen components that F-34's measure counts as refused. The rung reads the receiver at the variable's bound that declares the method, and casts it there, as rung I does for an intersection.
- **points to report:**
  - The owner as found: the bound that is chosen where several are, and the cast.
  - Row 1076's test against the prelude, failing on the base and passing after, and walk's answer; the planner's measure on a scratch copy of your final tree.
  - Whether the distance stage's shadow patch still applies to your `CodeGen.java`.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (9 keys, 5 checks):
  - ledger:1076 (check): the crash, which closes.
  - ledger:540: rung I's receiver typed by an intersection, the precedent.
  - F-34 (check): the measure, whose one refused declaration this is.
  - SPEC `basic/expressions/method-invocation.tex#Dotted Method Invocations` (check): what the call does.
  - SRC `compiler/codegen/CodeGen.java#public void forMethodInvocation(MethodInvocation x)` (check): the dotted call, and the cast that crashes.
  - SRC `compiler/codegen/CodeGen.java#private TraitType intersectionMethodOwner(ASTNode x, IntersectionType it, IdOrOp method,`: how the owner of a method is found for an intersection.
  - `code:Library/FortressLibrary.fss#resolvedouterBody=__resolveBottomArgumentType`: the one library's site, two lines above the call.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks a generic body.
  - REC `Forks the batch takes` (check): the defaults you build.

### G
- **slug:** `rung-widening-getter`
- **worktree:** `/home/user/fortress-widening-getter`
- **section:** `G. NN32's two getters at NN32, and the checker's refusal of a getter that widens the return type of a getter it inherits (row 993)`
- **blurb:** the one library's NN32 declares getter zero(): Number and getter one(): Number, wider than the zero(): I and one(): I that it inherits at I = NN32. The checker accepts them, and the code generator then stops the whole of FortressBuiltin: 'Likely bug in static analysis, apparently malformed overload set not rejected' (row 993). A program's own object that widens an inherited getter so stops the same way against the prelude. The rung gives the library's two getters their type, NN32, and has the checker refuse such a getter by the rule of return types.
- **points to report:**
  - Where the checker now refuses the form, by file and member, its message, and the rule it follows.
  - The test against the prelude, failing on the base and passing after; the one library's NN32 getters typed NN32, their refusal by the new checker seen before their edit (the distance stage or a compile of FortressBuiltin under the selector) and gone after.
  - Every line of the libraries or the tests that the checker now refuses, and what you did with each.
  - The two stages' tables on your final tree against the comparand, and the checker's timing before and after.
  - Each sentence of the specification that your change makes false, or none.
  - A file edited beyond those named.
- **briefing** (11 keys, 7 checks):
  - P-148: the checker's timing after a change.
  - ledger:993 (check): the two getters and the checker's acceptance, which closes.
  - SPEC `advanced/overloading.tex#Declarations with Static Parameters` (check): the Return Type Rule (`:555-559`), the ground of fork G1.
  - SPEC `basic/traits.tex#Method Declarations` (check): a method declared below one that it inherits.
  - SRC `scala_src/typechecker/OverloadingChecker.scala#the return type of the overriding declaration` (check): where the checker compares an override's return type today.
  - `code:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss#getter zero(): Number = unsigned(0)` (check): the library's two lines.
  - `code:Library/FortressLibrary.fss#getter zero(): I`: the getter that NN32 inherits.
  - REH `W4. NN32's zero and one return Number (no row)`: the wall as the rehearsal met it.
  - PRB `6. For the ledger` (check): the reproducer against the prelude.
  - `map:compile-path-walkthrough.md#3. The checker`: how the checker checks a declaration.
  - REC `Forks the batch takes` (check): the defaults you build.

### F
- **slug:** `rung-flatstring-name`
- **worktree:** `/home/user/fortress-flatstring-name`
- **section:** `F. Walk's native strings work without the library's line that names the object FlatString as a value (row 1090)`
- **blurb:** under walk the native strings work only after the object FlatString has been made from its name, so the one library's FlatString component names it as a value, ignore(FlatString), before its first native string; without the line walk dies at its first string, 'NullPointerException: ... getConstructor() is null'. Once FlatString is written over a payload class, as the next run does, the compiled path refuses that line, 'Can't compile the number type FlatString as a value yet', and what such a name denotes is an open question on record (row 1082). The rung sets walk's native string constructor without the name and takes the line out.
- **points to report:**
  - Where walk now sets the constructor, by file and member, and why it is ready there.
  - The line taken out; walk's suites and the compiled tracks with it out; each test that failed, with its cause.
  - Every other native object whose constructor walk sets only when its name is evaluated, and whether a line of the libraries names one for that.
  - The two stages' tables on your final tree against the comparand.
  - A file edited beyond those named.
- **briefing** (9 keys, 5 checks):
  - ledger:1090 (check): the line and walk's need for it, which closes.
  - ledger:1082: the compiled path's refusal of such a name, an open question on record that this rung leaves open.
  - `code:Library/FlatString.fss#ignore(FlatString)` (check): the line.
  - SRC `interpreter/glue/prim/FlatString.java#protected FNativeObject makeNativeObject(List<FValue> args, NativeConstructor con)` (check): where walk sets the strings' constructor today.
  - SRC `interpreter/evaluator/BuildNativeEnvironment.java#public static Constructor nativeConstructor(Environment containing,` (check): where walk makes a native object's constructor.
  - SRC `interpreter/glue/prim/Boolean.java#FBool.setConstructor(this)`: a sibling that sets its constructor the same way.
  - PRB `3. The walls, in the order met`: wall 4, the line on the compiled path and walk's failure without it.
  - `map:modules-and-phases.md#B.12 Native code and Java interop`: how walk binds a native component.
  - REC `Forks the batch takes` (check): the defaults you build.

### C
- **slug:** `rung-first-run-one-library`
- **worktree:** `/home/user/fortress-first-run-one-library`
- **section:** `C. The first program compiled and run against the one library under the gate: the carriers of its built-in types, the run time's prelude names, and its fourteen components compiled to jars in the onelibrary track (rows 874 and 1062)`
- **blurb:** under the selector a program compiles against the one library but does not run, since no compile writes the library's jars (row 1062): the code generator refuses FortressLibrary, FortressBuiltin and FlatString whole at the wrappers of their helper classes, because no run-time class carries the one library's built-in types (row 874). By the decisions on record each number type is a value object over a payload class (fork N4), Boolean, Char and FlatString take the same form, and the reader, the writer and the two array stores are hand-written classes of the one library's traits, in one build that serves both libraries. The planner's probe built it in scratch and ran Hello. The rung builds it, compiles the fourteen in the onelibrary track and runs Hello there.
- **points to report:**
  - The design as built: the second set of run-time classes and how the class path chooses it, the payload table's rows, the names that the second set's LibraryNames gives, the converters, the raise strings, and each place that names a prelude class at run.
  - The fourteen compiles in the track: their form, their seconds, and how a run step finds the jars.
  - Hello's run test, failing on the base and passing after with the verifier on; the run tests of varargs, the conditional reduction and Half: each promoted, or still failing with its wall and row.
  - The whole compiled tracks and walk's suite: every test that failed after your change, with its cause.
  - The two stages' tables on your final tree against the comparand; the planner's measure on a scratch copy of your final tree, with and without its patch.
  - Each sentence of the specification that your change makes false, before and after.
  - A file edited beyond those named.
- **briefing** (27 keys, 18 checks):
  - P-33 (check): the slice first, one build serving both libraries, each wall a rung under the gate.
  - P-37 (check): the prelude stays until the switch-over and gains no declaration.
  - P-178 (check): each number type one value object, and its detail.
  - P-164 (check): the reader and the writer carried by classes of the one library's traits.
  - P-169: the array stores, by P-164's device.
  - F-388 (check): the prelude's seven over payload classes; the one library's seven have no rows.
  - F-381 (check): the selector, its caches folder and its track.
  - F-353 (check): one build, with a second set of classes in a second folder first on the class path.
  - F-390: varargs under the selector, and the run that would fail at the array's indices.
  - ledger:874 (check): the carriers, which closes.
  - ledger:1062 (check): no program runs, which closes.
  - ledger:995: a carried type's two names, open for the types other than the seven numbers.
  - ledger:1090: the line of FlatString, which run 1's rung F takes out.
  - PRB `2. The hacks, each marked PROBE 34 HACK in the patch` (check): each piece as the probe built it in scratch.
  - PRB `3. The walls, in the order met` (check): what the probe met, and what it took out again.
  - PRB `5. How the gate can build the jars` (check): the compiles in the track, and row 757.
  - RN `The one library's seven (fork N4, a point to report)` (check): where the entries of the seven go.
  - CW `Way C. The object's class carries the value, and the trait stays an interface` (check): form 2, and the four other shapes.
  - PY `2. How the library is selected` (check): the second folder and the class path.
  - PY `3. The hacks`: the proper form of each shortcut, the raise strings and the stamp among them.
  - REH `W2. The wrappers of the helper classes (row 874)`: the wall as first met.
  - SRC `compiler/NamingCzar.java#private static final String[][] payloadObjects = {` (check): the table of payload objects.
  - SRC `compiler/runtimeValues/LibraryNames.java#public static String numberObjectClass(String t)` (check): the names of the objects' classes.
  - SRC `compiler/runtimeValues/FZZ32.java#public abstract class FZZ32 extends FValue`: a payload class, the precedent.
  - `code:ProjectFortress/compiler_tests/CompilerBuiltinComponent.test#tests=`: how the compiler track compiles the prelude.
  - `map:compile-path-walkthrough.md#6. The run: the second JVM and the class loader`: how a class is loaded and named at the run.
  - REC `Forks the batch takes` (check): the defaults you build.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** first checks a program's types with the **checker**, then writes JVM bytecode with the **code generator**. The **JVM's verifier** checks each class's bytecode as it loads, and refuses a class that could misuse a value.
- The **prelude** is the small library that the compiled path uses by default. The **one library** is the interpreter's library. The **selector** is the setting `FORTRESS_LIBRARY=one`: with it, the compile command reads the one library.
- A **jar** is the file of compiled classes for one part of a library or one program. The one library has fourteen parts, so fourteen jars.
- A **carrier** is the Java class whose objects are the values of a built-in type, such as `Boolean` or `ZZ32`, when a compiled program runs. A **payload class** is a small hand-written carrier that holds the bare JVM value, such as an `int`. Since your decision P-178, the code generator writes each number type's class on top of one.
- A **wall** is a place where the compiler or the compiled library stops. A **rung** is one change, built by one worker and checked by a second, the skeptic. A **run** is one launch of the batch workflow. The **gate** is the full check before a run lands.
- A **type assumption**, `e asif T`, makes the call around it choose its declaration as if `e` were a `T`.
- A **row** is one known defect in the ledger. An **expected-failure test** is one that is known to fail and is marked so.
- A **probe** is a trial in a scratch tree. Nothing of it lands. A **fork** is a choice that the batch makes. Its **default** is the way that the batch builds unless you say otherwise.
- A **getter** is a method without parameters that reads like a field, such as `n.zero`. A **label block** is a block with a name, which an `exit` leaves early with a value.
- **Rung N** is the rung of climb batch 33b that wrote the prelude's number types over payload classes. **Fork N4** is that batch's choice to leave the same work for the one library's seven number types to the first run against it, which is this batch.
- **microGPT** is the model program. No rung changes a line of it.

### The go

None yet. You took this aim on 18 November: the first program that runs against the one library, under the gate. You gave no go. The coordinator launches nothing until you say so. The planner found no fork that needs your answer before the start: by its reading none bends a decision of yours, and none touches microGPT. The check of 20 November names one, the fallback of fork L1 under rung L below, which lands a repair with no test that fails first (P-102).

### The two runs

- **Run 1, climb batch 34, five rungs:** L, P, T, G and F. Each removes one wall between the one library's fourteen parts and a running program, and each has a test of its own, mostly against the prelude.
- **Run 2, climb batch 34b, one rung:** C, on run 1's landed tree. It makes the carriers, compiles the fourteen jars in the gate and runs `Hello` there.
- **Why two runs.** C's test is `Hello`'s run. That run needs all five walls of run 1 gone, and a rung cannot build on another rung of its own run.
- **Why C is one rung.** Its pieces share the same tables of names, and each piece's test is the same first run.

### What the probe found

Before cutting the rungs, I rehearsed the batch in a scratch tree on today's code. I put in marked temporary fixes for exactly the walls that this batch removes. Then the fourteen parts compiled to jars, in 197 seconds, and `Hello` printed `Hello, one library`, with the verifier on and with it off.

The walls met, in order:

1. `String` did not compile: an assumption at one argument of two (row 818). The count on record missed it. Rung P.
2. With the verifier on, every program died as the library loaded, in `simplestRationalBetween` (row 1078). Rung L.
3. With the verifier off, the first number made died: the one library's number types are not yet written over their payload classes (fork N4). Rung C.
4. `FlatString` did not compile once it had its carrier: a line of the library names the object as a value, and walk needs that line (new row 1090). Rungs F and C.
5. Then `Hello` ran.
6. The two array programs, `Arr` and `Dot`, met two more walls: the first `for` loop (row 994), and, with the verifier on, a method written twice into `Vector`'s class (new row 1091). Those go to the batch after.

The fixes before the run, which nothing met because they were in already: the carriers' tables of the measure on record, the `Boolean`, `Char` and string carriers, the reader and writer carriers, and the run time's prelude names. Two parts of earlier temporary fixes proved unneeded and were taken out: the old trait table search, and a special package for `FlatString`.

### Run 1, rung by rung

Each program is shortened to the lines that matter.

**L. A variable read on a path that never set it.**

- What it changes: the code generator.
- The one library's `simplestRationalBetween` has mutable variables, several exits from one labelled block, and a local function. Its compiled form reads a variable on a path that never set it.
- Today: in the probe's tree, with the carriers built, `run(): () = println("Hello, one library")` dies with the verifier on: 'VerifyError: Bad local variable type', as the library loads. Every program would. Two copies of the function with `ZZ32` in place of `QQ` compile and run against the prelude, so the cause is not yet known, and no small program shows it yet.
- After: the worker finds the cause first, writes a small test against the prelude that shows it, and repairs it. The library's function then passes the verifier.
- The choice (fork L1): the test comes first. If the worker shows that no small test can exist, the default lands the repair on the scratch tree's evidence. `Hello`'s run then goes in as an expected-failure test, which run 2 turns on. The other way: the repair waits for run 2, inside rung C, where `Hello`'s run can fail first.
- The check of 20 November reads that fallback as a bend of your rule P-102, test first. So this choice is yours before the launch (`climb-batch-34-review.md`).

**P. An assumption at some arguments of a call.**

- What it changes: the code generator.
- The program that fails today:

      pair(x: Named, y: Named): String = "Named, Named"
      pair(x: Leaf, y: Leaf): String = "Leaf, Leaf"
      println(pair(Leaf asif Named, Leaf))

- Today: the compile stops: 'Can't compile a dispatched call whose arguments are not all type assumptions'. The one library's `String` has this form twice, so `String` does not compile, and every program needs `String`.
- After: it compiles and prints `Named, Named`, as walk does.
- The choice (fork P1): the compiler builds the form. The other way: rewrite the library's two lines. Then a program that writes the form is still refused.
- What stays refused (fork P2): four rarer forms of row 818, such as an assumption at the receiver of a generic method. A program that writes one gets the refusal that it gets today.

**T. A generic method called on a value whose type is a type parameter.**

- What it changes: the code generator.
- A type parameter is a name that stands for a type, such as `F` below. A generic method is a method with a type parameter of its own, such as `m`.
- The program that fails today, where the trait `Gen` has a generic method `m`:

      f[\F extends Gen\](x: F): ZZ32 = x.m[\ZZ32\](3)
      println(f[\G\](G))

- Today: the compile crashes: 'ClassCastException: VarType cannot be cast to TraitType' (row 1076). The one library's `__bigOperator2` stops so.
- After: it compiles and runs as under walk.
- The choice (fork T1): the compiler reads the value at the bound of its type parameter that has the method, here `Gen`. The other way: it reads the value at `Any` and looks the method up at the run. The code generator does that nowhere else.

**G. `NN32`'s two getters.**

- What it changes: two lines of the one library, and the checker.
- The program that fails today:

      trait Tz[\I extends Tz[\I\]\] getter zero(): I end
      object Oz extends Tz[\Oz\]
          getter zero(): Number = 0 end

- Today: the checker accepts it, and the code generator stops: 'Likely bug in static analysis'. The one library's `NN32` has this form, so its part `FortressBuiltin` does not compile.
- After: the checker refuses the program, with the message for a return type that is too wide. `NN32`'s two getters say `NN32`.
- The choice (fork G1): the checker refuses the form, by the rule of return types that it already has for a method. The program above doesn't compile today either: the code generator stops it.
- The choice (fork G2): if the checker then refuses a line of a library or of a team test, the worker repairs the line where its intent is plain. A test's checked value that would change comes to you.

**F. One line of the string library.**

- What it changes: walk, and one line of the one library.
- Today: the library's `FlatString` part holds `ignore(FlatString)`, only to make walk ready for strings. Once strings have their carrier, as run 2 gives them, the compiled path cannot compile that line, since it names the type as a value. What such a name means is an open question of yours (review-queue item 599, row 1082), and this rung does not answer it.
- After: walk gets ready for strings by itself, and the line goes. Nothing that a program prints changes.
- The choice (fork F1): walk changes, and the line goes. The other way: the compiled path compiles the name `FlatString` as a value. That would answer your open question for you.
- With the default, a program that itself writes `ignore(FlatString)` is refused under the selector after run 2, as `x: Object = ZZ32` is today.

### Run 2, rung by rung

**C. The first program that runs against the one library.**

- What it changes: the run time's classes, the code generator's tables of names, the build, and the onelibrary test group of the gate.
- The program that fails today, with the selector:

      run(): () = println("Hello, one library")

- Today: it compiles. When it runs: 'NoClassDefFoundError: fortress/FortressLibrary$String' (row 1062). No compile writes the one library's jars, since nothing carries its built-in types (row 874).
- After: it prints `Hello, one library`, in the gate, with the verifier on.
- The parts, each by a decision on record or by a default on your review list:
  - the one library's seven number types written over their payload classes, as rung N wrote the prelude's (fork N4, P-178);
  - `Boolean`, `Char` and the flat string in the same form, with payload classes of their own for the one library (fork C1; review-queue item 513 leaves this form to the builder, so it is no decision of yours);
  - the reader, the writer and the two array stores as hand-written classes of the one library's types (P-164, P-169);
  - these classes as a second set, in a second folder that comes first when the one library is selected, so that one build serves both libraries (P-33 for the one build; fork C2 for the folder, the default of review-queue item 521; F-353);
  - the run time's names of the prelude, such as its 105 names of exceptions, made to follow the library in use;
  - the fourteen parts compiled once in each gate, about 200 seconds, in the onelibrary group.
- The run tests of varargs and of the `AND:` reduction, which wait for this run, are promoted where they pass.
- The choices, each at its default:
  - Fork C1: the code generator writes the classes of `Boolean`, `Char` and the flat string over payload classes. The other way: classes written by hand over generated ones, which Java can't express for `FlatString`.
  - Fork C2: the second set is a second folder under the same class names. The other way: new class names for the one library's carriers, which every place that names a carrier would then follow.
  - Fork C3: the run time names no prelude class where the second set is in use.
  - Fork C4: the fourteen parts compile as test files of the onelibrary group. The other way: a build step before the tests.
  - Fork C5: the old search of the trait table by the prelude's names stays as it is.
  - Fork C6: a waiting run test is promoted if it passes with the verifier on. One that meets another wall stays an expected failure, with a row.

### The merge

- In run 1, L, P and T edit the code generator's main file, `CodeGen.java`, each in methods of its own. G edits the checker and two library lines, F walk and one library line. No two rungs edit the same method.
- Run 2 has one rung.

### The measures

- **Declarations of the one library that the code generator refuses** (F-34):
  - Before: 2, on `ba3c7c876d`. The measure's script counts 1, `__bigOperator2` (row 1076). The probe found the second, which the script does not count: `String`'s two calls with a partial assumption (row 818), which stop `String`'s whole compile.
  - After run 1: 0, and the real compile of the fourteen, with the carriers' fixes, refuses nothing.
  - After run 2: 0 with no patch at all: the fourteen compile to jars in every gate.
- **Programs that run compiled against the one library:** none on `main` today (row 1062). After run 2: `Hello`, with the verifier on, in the gate; and the varargs, `AND:` and `QQ` programs where they pass. `Arr` and `Dot` wait for rows 994 and 1091.
- **The checker's two measures** stay 0 and 0. Rung G's change of the checker must keep them so.
- **microGPT:** no line changes. Its quick checks under walk stay 7 of 7 for both programs.
- **How far this brings microGPT compiled against the one library.** After run 2, the first program runs there: one line that prints. microGPT doesn't compile there yet. Its arrays stop first at rows 994 and 1091, which the batch after takes. Then the checker stops its flat program at 42 places of its own (F-58).

### What the batch leaves out

- **Rows 994 and 1091,** which only `Arr` and `Dot` meet: the first `for` over `seq`, and `Vector`'s `-` written twice. Row 994 is four lines in `OverloadSet.java`, a file that only rung P may edit, for another purpose.
- **The other forms of row 818,** such as an assumption at the receiver of a generic method. No library line has them.
- **Your three questions on `typecase` arms:** review-queue item 592 (row 1064), row 1081 and row 1068. They are of one kind, and one rung on the static rules of a `typecase` clause could answer all three. They wait for you.

### For the batch after, in this order

1. Rows 994 and 1091, then `Arr` and `Dot` as run tests: the first array programs on the one library.
2. The verifier's count over the library's generic classes, which the probe's count skipped (1,092 classes), and row 1054, which two methods of `RangeInternals` have.
3. Row 996, the stable order, with the next rung on the dispatch's order; rows 1055, 1056 and 1035; the checker's other gaps (rows 1007, 1009, 1010, 1012, 1015, 1067, 1070 to 1075, 1080, 1084, 1088); row 1085's build or refusal; row 1086; the other forms of row 818.
4. If you answer them: one rung on the static rules of a `typecase` clause, for item 592 (row 1064), row 1081 and row 1068.
5. The matrix and the library's `DOT` as tests; then microGPT's own needs under the checker (F-58).

The default of item 597 stands: no mode lets the compiler skip a declaration that it refuses.

### Cost and time

The agents run on the regular tiers (`tier-mode.sh status` prints `regular`).

- **Run 1: about 5.3 million tokens written, 6.1 million with the reserve. The range is 4.6 to 7.0 million. About 4 hours and 45 minutes, 5 hours and a half with the reserve.** Five rungs with their skeptics write about 4.0 million, the fixed roles about 1.3 million. The reserve is 0.8 million and 45 minutes: one ruling on a rung with its repair, one on the review with its repair, and a second gate.
- **Run 2: about 2.4 million, 3.0 million with the reserve. The range is 2.0 to 3.6 million. About 3 hours and a quarter, 4 hours with the reserve.** C with its skeptic about 1.25 million, the fixed roles about 1.15 million; the reserve 0.6 million and 45 minutes: one ruling with its repair, and a second gate.
- The evidence, climb batch 33's two runs on Opus (`reviews/batch-33-review.md` and `reviews/batch-33b-review.md`, section 5), each role priced from the last run on the same tier:
  - Run 2 of 33: a rung with its skeptic wrote 0.70 million at 150 minutes (W), about 0.84 million at 200 (R, without the restart's re-reading), 0.92 million at 300 (N) and 1.05 million at 280 (G, which built six times). Run 1 of 33: 0.67 to 0.76 million for rungs of 150 to 220 minutes. The fixed roles of run 2 wrote 1.31 million: the gather 471 thousand, the review 464 thousand, the gate 149 thousand, the commit stage 164 thousand and the disk check 65 thousand.
  - So L, at 240 minutes and building a scratch library more than once, is priced at 1.05 million; P at 0.8; T and F at 0.7; G at 0.75, as run 1's C, 220 minutes in the checker. C, at 420 minutes, scales N's worker, 581 thousand at 300 minutes, to about 0.85 million, with a skeptic at run 2's largest, 0.4 million. A run of one rung has a smaller gather, about 0.3 million.
  - The reserve: run 2 of 33 spent 0.53 million of its 1.04 million, one ruling on a rung (214 thousand) and one on the review with its repair (317 thousand).
  - The minutes: run 2 of 33's workers took 41 to 61 minutes and its skeptics 26 to 32, two agents at a time; its rung stage 3 hours 14 for four rungs, the gather 41 minutes, the review 22 beside the gate's 22, the commit stage 5.
  - A restart of the machine is left outside the estimate; run 2 of 33's cost about 0.38 million.
- **The disk.** The script stops a run under 1.5 GiB a rung plus 4 GiB. Run 1 needs 11.5 GiB, run 2 5.5 GiB. Free on 18 November, after the probe's tree went: about 13.5 GiB (`df -P /home/user`, 14,181,964 blocks of 1,024 bytes available). Free on 20 November: about 13.4 GiB (14,024,248 blocks).
- **The gate's time.** From run 2, the onelibrary group compiles the fourteen parts, about 200 seconds more in that group, which starts when another group ends.

### Your review list from this record

- The forks of section 3. Each takes its default. By the planner's reading none is consequential by the rule; the check of 20 November names fork L1's fallback as one.
- Rows 1090 and 1091, filed by the planner.
- The count on record of refused declarations (F-34) missed one wall, row 818's. F-34 now says so: the code generator refuses 2, and the measure's script counts 1.
- The second set of run-time classes comes back for `Boolean`, `Char`, the strings, the reader, the writer and the stores. Your P-33 lost its words on the second set today, since the numbers need none. Its decision, one build for both libraries, stays true.
- Item 597's default stands: no skipping mode.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision on record; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential fork

None, by the planner's reading. The check of 2026-11-20 (`coordinator/climb-batch-34-review.md`, finding C1) reads the fallback of fork L1 as consequential: it lands a repair of the code generator with no test that fails first for its gap, which bends P-102, and fork N4 of climb batch 33 deferred work for that same reason. What the record settles, and so is no fork:

- The order of the work and one build for both libraries: P-33, with its history of 2026-11-18 08:14Z ("the decision, microGPT's slice first with one build serving both libraries, is unchanged").
- The form of the one library's seven number types: P-178's detail, the carriers' review's way D with way C's machinery, and rung N's form 2 (fork N4's default, F-388).
- The reader, the writer and the stores: P-164 and P-169, whose run-time classes implement the one library's traits.
- `Boolean`, `Char` and `FlatString`: review-queue item 513, which leaves "the form that gives `FlatString`'s class while it stays an object, the same work as for `Boolean`, `Char`" and the choice between way C's forms to the builder, not to the curator; the default follows rung N's form 2.
- The second set of classes for those types: review-queue item 521's default, files of their own, by probe Y's mechanism (F-353). The probe showed no real fork.
- No skipping mode: review-queue item 597, at its default.
- What a payload object's name denotes as a value (row 1082) stays the curator's question: fork F1's default does not answer it.

### Forks the batch takes

Each fork below builds within a decision on record or chooses where the record leaves an implementation open, and each can be undone. For a fork that leaves a form unbuilt, it says what a program that writes the form gets.

1. **B1. One record, two runs.** Run 1 is L, P, T, G and F; run 2 is C on run 1's landed tree. **Default: so.** Way not taken: one run, in which C's test, `Hello`'s run, cannot pass on C's own branch. The reason: `references/batch.md`, "The go"; a rung cannot build on another of its own run.
2. **B2. What the batch takes.** The brief's pieces (row 874 with fork N4, the run time's prelude names, row 993, row 1076, the fourteen jars in the gate with `Hello` and the run tests of varargs and of row 315) and the probe's walls between them and `Hello`'s run under the gate (rows 818, 1078 and 1090). **Default: so.** Rows 994 and 1091 wait: only `Arr` and `Dot` meet them, and row 994's file, `OverloadSet.java`, is in no rung's list but P's, which names it only for the dispatch of fork P1 (the brief's rule). Their programs get a failure at the run, as today: 'NoClassDefFoundError: FortressLibrary' at the first `for` over `seq` with the verifier off; 'ClassFormatError: Duplicate method name' at an `array1` of a number type with it on.
3. **B3. Row 1078's rung is in run 1, its cause traced in scratch.** **Default: so;** its worker builds the probe's scratch tree from the committed patch, traces the cause, and writes a test against the prelude that shows it (fork L1). Way not taken: the repair inside C, which would put the run's whole risk on one rung.
4. **L1. If no test against the prelude can show row 1078's cause,** the rung lands its repair with the scratch tree's evidence, its test `one_library_tests/XXXOneLibraryRunHello` written as an expected failure, which C promotes. **Default: a test against the prelude first;** the fallback only if the worker shows why none can be written, and the skeptic checks the repair in the same scratch tree.
5. **P1. A call with an assumption at some arguments** dispatches among the set of declarations that take the assumed types at the assumed places and that the other arguments' static types do not exclude: the call tests the other arguments' run-time types over that set, as walk's dispatch does, and where the set holds one declaration, the call names it. The specification gives an assumed type only to the assumed expression ("considers both the static and the dynamic type of the value of the expression to be the specified type", `Specification/basic/expressions/type-annotation.tex:44-47`), and walk dispatches the other arguments on their run-time types: `forAsIfExpr` wraps only the assumed value (`interpreter/evaluator/Evaluator.java:109-116`). So for `pair(x: Named, y: Named)` beside `pair(x: Named, y: Leaf)`, the call `pair(a asif Named, n)` with `n: Named = Leaf(2)` keeps both in the set and runs `pair(x: Named, y: Leaf)`, as walk does on the base (`climb-batch-34-review.md`, B8, run 2). A rule by the other arguments' static types would call `pair(x: Named, y: Named)` there. **Default: so.** The reason: the specification's "Type Assumption"; walk's precedent. Way not taken: a rewrite of the library's two lines, which leaves the form refused for programs.
6. **P2. The other forms of row 818** (a generic method at an assumed receiver, an overloaded generic function, another component's overloaded function, a functional method whose `self` is not first) are not built. **Default: so; a program that writes one gets the code generator's refusal, as today,** and their tests stay expected failures.
7. **T1. A receiver typed by a type variable** is read at the variable's bound that declares or inherits the method, the most specific where several do, and cast to it, as rung I's `intersectionMethodOwner` does for an intersection. **Default: so.** Way not taken: the receiver read at `Any` with a dynamic lookup, which the code generator has nowhere else.
8. **G1. The checker refuses a getter whose return type is not a subtype of the return type of a getter that it keeps from being inherited at the same parameter types,** with the message of `returnTypeCheck`: "For ...,\nthe return type of ... should be a subtype of the\n    return type of ..." (`OverloadingChecker.scala:742-743`). A method redeclared at the same parameter types is checked already: `checkOverridingReturnType` checks the pair as an overloading (`:712-714`), so only the getter is new. **Default: so.** The reason: the Return Type Rule of the revised overloading chapter (`Specification/advanced/overloading.tex:555-559`, section "Declarations with Static Parameters"): where one declaration is more specific than another, as the object's getter is by its receiver at the same parameter types, its return type must be a subtype of the other's; and the checker's own check for methods. The Subtype Rule for dotted methods (`:203-208`) asks for strictly narrower parameter types, which a getter does not have.
9. **G2. A line of the libraries or of the team's tests that the checker then refuses** is repaired in the library's own spelling where its intent is plain, as `NN32`'s two lines; a team test's checked value that would change is a reserved point. **Default: so.**
10. **F1. Walk sets each native string's constructor when its native component's environment is made, not when the name `FlatString` is first evaluated, and `Library/FlatString.fss:29` loses `ignore(FlatString)`.** **Default: so.** Way not taken: the compiled path compiles `FlatString` as a value, which answers row 1082, the curator's open question. With F1, a program that itself writes `ignore(FlatString)` gets, after run 2, the code generator's refusal under the selector: 'Can't compile the number type FlatString as a value yet', as `x: Object = ZZ32` gets today.
11. **C1. `Boolean`, `Char` and `FlatString` take rung N's form 2 under the selector:** the code generator writes `FortressBuiltin$Boolean`, `FortressBuiltin$Char` and `FlatString$FlatString` over payload classes `FBoolean`, `FCharacter` and `FJavaString` of the second set, whose `make` reaches the object's class by the name that the second set's `LibraryNames` gives. **Default: so, as the probe built it.** The class of `FlatString` keeps its component's name: the probe showed `fortress/FlatStringC` unneeded.
12. **C2. The second set is a second class folder, `ProjectFortress/build-one` from sources in `ProjectFortress/src-one`, under the first set's names, which `bin/fortress_classpath` and the onelibrary track's JVM put first where `FORTRESS_LIBRARY=one`; the build's stamp covers it.** It holds the three payload classes of C1, `FJavaBufferedReader` and `FJavaBufferedWriter` over the one library's traits, the stores' `FJavaArrayStore` and `FJavaRR64ArrayStore`, the stub of the one library's traits that these extend, and its own `LibraryNames`. **Default: so,** probe Y's mechanism (F-353) with item 521's files of their own. Way not taken: new class names for the one library's carriers, which every place that names a carrier would follow (the code generator's constants, `equalityRule`, the converters, the loader's tables).
13. **C3. The run time names no prelude class where the second set is in use:** `FValue.asString()` and `MutableFValue.asString()` are typed at `FValue` in both sets; `Utility` looks up the exception's constructor over the library's `String`; a helper names an exception by its simple name, and each set's `LibraryNames` gives the component (probe Y's section 3, item 4). **Default: so.**
14. **C4. The one library's fourteen components compile in the onelibrary track as `.test` files with a `compile` step,** as the compiler track compiles the prelude (`compiler_tests/CompilerBuiltinComponent.test`), in the probe's order, before any run step of the track needs them. **Default: so.** Way not taken: an ant step before the track's JUnit run, outside the tests.
15. **C5. The trait table's search by the prelude's names stays, and gains no search of the one library's apis:** the probe compiled the fourteen and ran the three programs without it. **Default: so** (fork R1 of climb batch 33).
16. **C6. Each run test that waits for this run** (`XXXOneLibraryRunHalf`, `XXXOneLibraryRunVarargs`, `XXXOneLibraryRunConditionalReduction`) is promoted if it passes with the verifier on; one that meets another wall stays an expected failure, its wall a row. **Default: so.**

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code that the rung rests on. A line citation in run 1's sections is of `main`'s code, `95611a87c5`: the check of 2026-11-20 lowered by one each of the six citations of `CodeGen.java` after `:2611`, which were of `ba3c7c876d`. Section C's citations are still of `ba3c7c876d`; run 2's section is read again on run 1's landed tree before its launch. The record's forks are section 3's. The planner's probe programs are in `explorations/compile-ladder/plan-34/probes/programs/`; a test is written new in the test folders, and no file is moved from there.

### L. The JVM's verifier and a label body's local in the one library's simplestRationalBetween: the cause traced, a test against the prelude, and the repair (row 1078)

**The mission.** Compiled against the one library, the library's main class `fortress/FortressLibrary` fails the JVM's verification as it loads: 'VerifyError: Bad local variable type ... fortress/FortressLibrary.simplestRationalBetween(...) @1297: aload ... Type top (current frame, locals[8]) is not assignable to reference type' (row 1078). Every program dies there with the verifier on. `simplestRationalBetween` (`Library/FortressLibrary.fss:578`) holds mutable locals of type `ZZ`, a `typecase` on `a CMP b` whose arms exit or assign a tuple, `if` blocks that exit, `exit done with Ratio(0, 1)` and `0/0`, a local function, and a tuple binding, in one `label` block. The planner's probe met it on `ba3c7c876d`'s code (PROBES, wall 2); ASM's verifier finds the same method, a local unset on one path. Two copies of the shape against the prelude, with `ZZ32` for `QQ` and `ZZ` (`plan-34/probes/programs/LabelLocals3.fss`, `LabelLocals4.fss`), verify and run, so the cause lies in what those copies left out. You find it, show it against the prelude, and repair it.

**The decisions this rung builds.** None names the mechanism. Section 3's forks B3 and L1.

**What you build, in order.**
1. **The scratch copy.** A worktree of your own beside your rung's, seeded from the base build, with `explorations/compile-ladder/plan-34/probes/rehearsal-34.patch` applied but its row 1078 stand-in (the commented `label` body, `Library/FortressLibrary.fss:578-626` in the patch) left out; `ant compileAll`, then `plan-34/probes/lib14.sh` and `runprog.sh <copy> Hello`: the `VerifyError` above. `javap -c -p` of the method, and the probe's `verify/VerifyJars.java`, give the refused instruction and its local.
2. **The cause**, by the bytecode: which local, which path leaves it unset, and which construct of the source makes that path. Cut the function in the copy until one construct is left.
3. **The test first** (fork L1): a compiled test against the prelude, in `compiler_tests/`, that dies with the verifier's message on the base and runs after; also at four threads. If no such program can be written, say why, and take L1's fallback.
4. **The repair** in the code generator, then the scratch copy rebuilt with it: `Hello` runs with the verifier on, and `VerifyJars` refuses no method of `fortress/FortressLibrary`.
5. **The whole compiled tracks once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the shadow patch once if you edited `CodeGen.java`, and report its exit.

**Rows.** Close 1078. A new row for a second cause, if the verifier refuses another method of the library after your repair.

**Specification.** `grep -rn '~1078' Specification --include=*.tex` prints nothing on the base. List any sentence that your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`, the members that write a `label` block, an `exit` and the locals they touch (`forLabel`, `:1942`; `forExit`, `:1987`; the binding of a local), or `VarCodeGen.java` if the cause is there; your tests. Not: `assumedArgumentsCall` and its caller in `forFunctionalRef` (P's), `forMethodInvocation` (T's); the library's text; microGPT.

**Reserved points.** A model line: none. A program that ran and now gives another answer.

**Overlaps by file.** P and T edit `CodeGen.java`: "The rule the rungs keep". If the cause lies in a member that P or T names, report it and build the repair outside it.

### P. An overloaded call with a type assumption at some of its dispatched arguments but not all, on the compiled path (row 818)

**The mission.** A type assumption `e asif T` makes the call around it choose its declaration as if `e` were a `T` (`Specification/basic/expressions/type-annotation.tex`, "Type Assumption"). The code generator compiles one at a dotted call's receiver, and at a call whose every dispatched argument is an assumption, by the declaration that the checker resolves (`CodeGen.assumedArgumentsCall`, `:7256`, from `forFunctionalRef`, `:4468`). At some arguments but not all it refuses: 'Can't compile a dispatched call whose arguments are not all type assumptions' (row 818; `compiler_tests/XXXAsIfPartialCallCompiled`). The one library's `String` has the form twice, `concatAndBalanceIfNecessary(s1 asif String, s2)` (`Library/String.fss:67`, `:69`), so under the selector `String` does not compile, and every program against the one library needs it (PROBES, wall 1). F-34's measure does not count it. You compile the form.

**The decisions this rung builds.** None names the mechanism. Section 3's forks P1 and P2.

**What you build, in order.**
1. **The test first:** `XXXAsIfPartialCallCompiled` promoted to a run test, failing on the base with its pinned message; its answer under walk. The second test, the case that tells fork P1's rule from a rule by static types: `pair(x: Named, y: Named)` beside `pair(x: Named, y: Leaf)`, with `object Leaf(k: ZZ32) extends Named`, called as `pair(a asif Named, n)` with `a = Leaf(1)` and `n: Named = Leaf(2)`. It answers `Named, Leaf`: under walk on the base the call runs `pair(x: Named, y: Leaf)`. Seen failing on the base, both as `link` and `run` tests through `junit.sh`: the link, 'UNEXPECTED exception com.sun.fortress.exceptions.CompilerError: ... AsIfPartialCallCompiled.fss:18:12-14: Can't compile a dispatched call whose arguments are not all type assumptions node = pair', and the run, 'Could not load AsIfPartialCallCompiled'; the second test the same at its call, `:19:9-11` (`climb-batch-34-review.md`, B8, runs 1 and 2).
2. **The call** (fork P1): the set of declarations that take the assumed types at the assumed places and that the other arguments' static types do not exclude; the call dispatches among them on the other arguments' run-time types; one left, a direct call.
3. **`String` under the selector:** compile `Library/String.fss` with `FORTRESS_LIBRARY=one` in your tree: before, the refusal; after, no refusal at these lines. (Its jar is not usable before run 2: no carrier serves it.)
4. **The other forms** (fork P2): their tests unchanged.
5. **The whole compiled tracks once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the shadow patch once and report its exit.

**Rows.** Close 818 for the partial form, with a note that the other forms of its notes stay refused; or rewrite it to hold them, as `ledger.py` allows.

**Specification.** `grep -rn '~818' Specification --include=*.tex` prints nothing on the base. List any sentence that your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`: `assumedArgumentsCall` (`:7256`) and its call in `forFunctionalRef` (`:4468`), and `OverloadSet.java` if the dispatch over several is written there; your tests. Not: the library's text; `forMethodInvocation` (T's); the members that L names; microGPT.

**Reserved points.** A model line: none. A change of which declaration a call reaches.

**Overlaps by file.** L and T edit `CodeGen.java`: "The rule the rungs keep".

### T. A generic method called on a receiver typed by a type variable, on the compiled path (row 1076)

**The mission.** The branch of `CodeGen.forMethodInvocation` (`:7313`) for a call with static arguments casts the receiver's type to `TraitType` (`TraitType rt_tt = ((TraitType)receiverType)`, `:7404`); a receiver typed by a type variable crashes it: 'ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType' (row 1076). The one library's `__bigOperator2` (`Library/FortressLibrary.fss:1656-1677`) has it at `xs.generate[\L1\](...)` with `xs: F` and `F extends Generator[\E\]` (`:1675`), the one refused declaration of F-34's measure. Against the prelude the planner's seven lines show it (`plan-34/probes/programs/VarRecv.fss`). Rung I of climb batch 33 found a method's owner among an intersection's conjuncts (`intersectionMethodOwner`, `:7601`); you do the like for a type variable's bounds.

**The decisions this rung builds.** None names the mechanism. Section 3's fork T1.

**What you build, in order.**
1. **The test first,** from `programs/VarRecv.fss`, in `compiler_tests/`: the crash on the base; its answer under walk. A second case with a bound that inherits the method, and one with two bounds. Seen failing on the base, as `link` and `run` tests through `junit.sh`: the harness reports the crash as an exception of the link step, red, 'UNEXPECTED exception java.lang.ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType', and the run as red, 'Could not load VarRecv' (`climb-batch-34-review.md`, B8, run 3). The program prints `7`, not `PASS`: its run test needs a `run_out` key, or a `PASS` line.
2. **The owner** (fork T1), and the cast of the receiver.
3. **The measure** on a scratch copy of your final tree, `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh`: 1 before (`__bigOperator2`), 0 after if nothing stands behind.
4. **The whole compiled tracks once,** `ant testFast`.

**The stages.** None. List your files (`STAGE_BLIND`). Run the shadow patch once and report its exit.

**Rows.** Close 1076.

**Specification.** `grep -rn '~1076' Specification --include=*.tex` prints nothing on the base. List any sentence that your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`: `forMethodInvocation` (`:7313`), and a new member beside `intersectionMethodOwner` (`:7601`); your tests. Not: the members that L and P name; the library's text; microGPT.

**Reserved points.** A model line: none. A change of which declaration a dotted call reaches.

**Overlaps by file.** L and P edit `CodeGen.java`: "The rule the rungs keep".

### G. NN32's two getters at NN32, and the checker's refusal of a getter that widens the return type of a getter it inherits (row 993)

**The mission.** The one library's `NN32` declares `getter zero(): Number = unsigned(0)` and `getter one(): Number = unsigned(1)` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265`), wider than `zero(): I` and `one(): I` that it inherits at `I = NN32` (`Library/FortressLibrary.fss:753-754`). The checker accepts them, and the code generator stops the whole of `FortressBuiltin`: 'Likely bug in static analysis, apparently malformed overload set not rejected for FortressBuiltin..NN32.one():Number' (row 993; the rehearsal's W4). A program's object below a trait of its own stops the same way against the prelude (`plan-34/probes/programs/WidenGetter.fss`). The checker has the rule of return types for a declaration that keeps another from being inherited (`OverloadingChecker.checkOverridingReturnType`, `:702`, by its comment at `:696-701`): at the same parameter types it checks the pair as an overloading (`:712-714`; the message of `returnTypeCheck`, `:742-743`), and an `override` that widens at `:726`. The object's getter passes all the same (PROBES, section 6), so the gap is the getter's; why the check does not reach it is yours to find. You repair the two lines and the checker.

**The decisions this rung builds.** P-148 for the checker's timing. Section 3's forks G1 and G2.

**What you build, in order.**
1. **The tests first.** From `programs/WidenGetter.fss`, a compiled test that the checker refuses the object's getter, its message pinned: `returnTypeCheck`'s (fork G1), as `compile_err_contains=should be a subtype of the`; on the base the code generator's message. Seen failing on the base, as a `compile` test through `junit.sh`: 'Must satisfy compile_err_contains; expected should be a subtype of the', the compile printing 'Likely bug in static analysis, apparently malformed overload set not rejected for WidenGetter..Oz.zero():Number' and 'File WidenGetter.fss has 1 error.' (`climb-batch-34-review.md`, B8, run 4).
   A test under the selector that binds `n.zero` to an `NN32` for `n: NN32` does not fail on the base: it compiles, 'OK (1 test)' (B8, run 4), since the checker accepts the binding though `NN32`'s own getter declares `Number`. So the two library lines take the distance stage as their test, as a library site does: the coordinator's order, set before the launch.
2. **The checker** (fork G1). The first test passes.
3. **The two library lines' failing run:** with the checker of step 2 and the lines unchanged, the distance stage on your tree, or a compile of `FortressBuiltin` under the selector, refuses `FortressBuiltin.fss:264-265` with `returnTypeCheck`'s message (fork G2 expects it). State that before the run, as for any test.
4. **The library's two lines,** at `NN32`; the refusal gone. Then **what the checker now refuses** elsewhere (fork G2): the whole tracks, walk's suite, and the two stages.
5. **The whole suites once,** `ant testFast` and `ant testSystem`.
6. **The stages** once on your final tree, and the checker's timing before and after (P-148).

**The stages.** Both, once.

**Rows.** Close 993.

**Specification.** `grep -rn '~993' Specification --include=*.tex` prints nothing on the base. Grep the Return Type Rule's section (`advanced/overloading.tex`, "Declarations with Static Parameters"), the Subtype Rule's section and `traits.tex`, "Method Declarations", for a sentence that says otherwise; list each sentence that your change makes false, or none.

**Files.** `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265`; `scala_src/typechecker/OverloadingChecker.scala`, or the checker's file where the rule is applied; your tests. Not: the code generator; microGPT.

**Reserved points.** A model line: none. A team test's checked value changed. A line of the libraries changed beyond the two.

**Overlaps by file.** None.

### F. Walk's native strings work without the library's line that names the object FlatString as a value (row 1090)

**The mission.** Walk's native `FlatString` sets the strings' constructor only when the object is made from its name (`interpreter/glue/prim/FlatString.java:32-35`, `makeNativeObject`), so the `FlatString` component names it, `ignore(FlatString)`, before its first native string (`Library/FlatString.fss:29`, under its comment "This initializes the constructor for FlatString before its type is used"; the team's line, `5a68404fdf`, respelled by the revival). Without the line walk's first string dies: 'NullPointerException: Cannot read field "selfType" because the return value of "...FNativeObject.getConstructor()" is null' (PROBES, wall 4). Once the next run writes `FlatString` over a payload class, the compiled path refuses that line: 'Can't compile the number type FlatString as a value yet' (`CodeGen.java:7019`). What such a name denotes is an open question on record (row 1082), which this rung leaves open (fork F1). You make walk ready for strings without the line, and take the line out.

**The decisions this rung builds.** None names the mechanism. Section 3's fork F1.

**What you build, in order.**
1. **The test first:** the line taken out; a walk test that prints a string and the length of `lineSeparator` fails through the harness with the message above. Taking the line out is the test's set-up: the test's failing run follows that one edit of the library, `Library/FlatString.fss:29-30` (the call and the end of its comment), and precedes the fix of step 2. With the line in, walk's strings work on the base, as every walk test that prints one shows, so only a run after that edit can fail. Seen failing on the base with the line out, through `harness-one.sh`: 'UNEXPECTED exception java.lang.NullPointerException', 'Caused by: java.lang.NullPointerException: Cannot read field "selfType" because the return value of "com.sun.fortress.interpreter.evaluator.values.FNativeObject.getConstructor()" is null', before the program's first `println` prints (`climb-batch-34-review.md`, B8, run 5).
2. **Walk** (fork F1): the constructor set when the native component's environment is made (`BuildNativeEnvironment.nativeConstructor`, `:42`), or where the component's objects are made, for `FlatString`; the same for each sibling that sets its constructor only in `makeNativeObject` (`Boolean`, `Char`, `ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32`, `RR64`, `FloatLiteral`, `ReflectCollection`, `ReflectMethod`; `grep -rn 'setConstructor(this)' interpreter/glue/prim` lists them, and `ZZ.java` and `IntLiteral.java` set theirs in another form), if any of them is needed before its name is read.
3. **The whole suites once,** `ant testFast` and `ant testSystem`.
4. **The stages** once on your final tree.

**The stages.** Both, once.

**Rows.** Close 1090 for walk, with a note that the compiled path compiles the component without the line once run 2 lands.

**Specification.** `grep -rn '~1090' Specification --include=*.tex` prints nothing on the base. List any sentence that your change makes false, or none.

**Files.** `Library/FlatString.fss:27-31`; `interpreter/glue/prim/FlatString.java` and `interpreter/evaluator/BuildNativeEnvironment.java`, or walk's file where a native component's objects are made; your tests. Not: the compiled path; microGPT.

**Reserved points.** A model line: none. An interpreter output that changed.

**Overlaps by file.** None.

### C. The first program compiled and run against the one library under the gate: the carriers of its built-in types, the run time's prelude names, and its fourteen components compiled to jars in the onelibrary track (rows 874 and 1062)

**The mission.** Under `FORTRESS_LIBRARY=one` a program compiles against the one library and does not run: no compile writes the library's jars (row 1062), since the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes, for no run-time class carries the one library's built-in types (row 874). The decisions on record fix each carrier: the seven number types as value objects over rung N's payload classes (P-178; fork N4, F-388); `Boolean`, `Char` and `FlatString` in the same form (review-queue item 513); the reader, the writer and the two stores as classes of the one library's traits (P-164, P-169); one build for both libraries (P-33), the second set of classes in a second folder (F-353; item 521's files of their own). The planner's probe built all of it in scratch on climb batch 33b's code, with run 1's five walls hacked past, compiled the fourteen in 197 s and ran `Hello` with the verifier on (PROBES, sections 2 and 3, the patch `plan-34/probes/rehearsal-34.patch`). It replaced the prelude's classes in place; you build them as a second set beside them. Run 1's rungs have removed rows 1078, 818, 1076, 993 and 1090 on the tree you start from.

**The decisions this rung builds.** P-33, P-37, P-178 with its detail, P-164, P-169. Section 3's forks C1 to C6.

**What you build, in order.**
1. **The tests first,** in `one_library_tests/`: the fourteen components' compile tests (fork C4), and `OneLibraryRunHello`, `Hello`'s `run` with `run_out_contains=` its line. On the base: the compiles of `FortressBuiltin`, `FortressLibrary` and `FlatString` fail ('Can't generate header for method ...', row 874), and `Hello`'s run 'NoClassDefFoundError: fortress/FortressLibrary$String'.
2. **The second set** (fork C2): `src-one`, `build-one`, `build.xml`'s compile of it, the stamp over it, `bin/fortress_classpath` and the onelibrary track's JVM.
3. **The tables:** `NamingCzar.payloadObjects`' rows for the one library's seven and for `Boolean`, `Char` and `FlatString` (fork C1), with `FlatString` read as an api of the selected library; the carried types' rows for the one library and the run's copy in `runtimeSystem/Naming.java`; the converters for a helper's `String`, `Object` and the stores (`FortressMethodAdapter`); a carried parent named by its interface (`NamingCzar.extendsClauseToInterfaces`). The probe's patch holds each, marked.
4. **The classes of the second set** (forks C1, C2): payload classes `FBoolean`, `FCharacter`, `FJavaString`; `FJavaBufferedReader`, `FJavaBufferedWriter`, `FJavaArrayStore`, `FJavaRR64ArrayStore` over the one library's traits and their stub; its `LibraryNames`, which names the one library's seven and the three (`fortress.FortressLibrary$ZZ32`, `fortress.FortressBuiltin$NN32`, `fortress.FortressBuiltin$Boolean`, `FlatString$FlatString`, and so on).
5. **The prelude's names at run** (fork C3): `FValue` and `MutableFValue`, `Utility`, and the raise strings of `nativeHelpers` and `runtimeValues` (87 lines in `nativeHelpers` name `fortress.CompilerBuiltin$` or `fortress.CompilerLibrary$` today); a test in which a compiled program against the one library catches `IntegerOverflow`.
6. **The varargs indices and the numeral sites** (review-queue item 601): `CodeGen.java:7904` and `:4708`; by the probe, the one library's carried rows make their descriptors agree with `FZZ32`; show it with the varargs run test.
7. **The run tests** (fork C6), with the verifier on.
8. **The whole suites once,** `ant testFast` and `ant testSystem`: the prelude's tracks run on the first set, the onelibrary track on the second.
9. **The stages** once on your final tree; the shadow patch once if you edited `CodeGen.java`; the planner's measure on a scratch copy, without its patch.

**The stages.** Both, once.

**Rows.** Close 874 and 1062; 995 for `Boolean`, `Char` and `FlatString` if each now has one name at run, else a note; 1090's compiled half, a note. A new row for each wall that stops a run test.

**Specification.** `Specification/appendices/changes.tex:6409-6410` ("against \library\ it compiles one, but a program compiled against \library\ does not run yet (row~1062)") and `:4052-4054` ("a program compiled against \library\ does not run yet, so no program with a varargs parameter runs on the compiled path"): before and after. `grep -rn '~874\|~1062' Specification --include=*.tex` for others.

**Files.** `ProjectFortress/src-one/` (new); `build.xml` (the compile of `src-one`, the stamp, the onelibrary track's class path); `bin/fortress_classpath`; `compiler/NamingCzar.java`, its tables and `extendsClauseToInterfaces`; `compiler/nativeInterface/FortressMethodAdapter.java`; `runtimeSystem/Naming.java`; `compiler/runtimeValues/FValue.java`, `MutableFValue.java`, `Utility.java`, `LibraryNames.java`; the raise strings in `nativeHelpers/` and `runtimeValues/`; `CodeGen.java` only where item 601's sites need it; `one_library_tests/`. Not: the prelude's text and the first set's carriers but where fork C3 names them; the one library's text; walk; microGPT.

**Reserved points.** A model line: none. A prelude test that changed its answer. A run test that runs and prints another line than walk.

**Overlaps by file.** None in its run.

### The rule the rungs keep, and how they meet

- **Run 1.** G and F share no file with any rung. L, P and T share `compiler/codegen/CodeGen.java`, by declaration:
  - L: the members that write a `label` block, an `exit` and their locals (`forLabel`, `:1942`; `forExit`, `:1987`), or `VarCodeGen.java`.
  - P: `assumedArgumentsCall` (`:7256`) and its call in `forFunctionalRef` (`:4468`).
  - T: `forMethodInvocation` (`:7313`) and a new member beside `intersectionMethodOwner` (`:7601`).
  - The gather's order is the script's: of two rungs that share a file, the one whose lowest edited line is lower goes first (`climb-batch-workflow.md`, "Gather", "The order"). The manifest's order L, P, T is that order as this record expects it.
  - If a rung's cause lies in a member that another names, it reports it and builds its repair outside it.
- **Run 2.** One rung. Its section is read again on run 1's landed tree before the launch, with L's, P's and T's members of `CodeGen.java` as landed.
- **The distance stage's shadow patch** edits a copy of `CodeGen.java` by text. A rung that edits `CodeGen.java` runs it once and reports its exit; if it no longer applies, the rung reports the lines, and the gather repairs the tool.
- **They meet on the merged tree:** the suites, the atomic runs, the ladder and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief, piece by piece, with its home here.

- **The carriers (row 874), fork N4, the run time's prelude names:** rung C, run 2. Item 513's leftovers (the class of `FlatString` while it stays an object, `Boolean`, `Char`, the Java-backed traits, the stores) are C's, by rung N's machinery with classes of their own (item 521's default).
- **`NN32`'s two getters (row 993):** rung G, with the checker's half, which reproduces against the prelude.
- **`__bigOperator2`'s wall (row 1076):** rung T, with a test against the prelude.
- **The one library compiled whole into jars, `Hello` run against it in the gate, the run tests of varargs and of row 315 promoted:** rung C, forks C4 and C6.
- **The walls that the probe showed between `Hello` and its run under the gate:** row 818 (rung P), row 1078 (rung L), row 1090 (rung F and rung C).
- **Item 597:** its default stands.
- **Item 592, row 1081 and row 1068:** the batch after's list, item 4.

### The planner's probes

`compile-ladder/plan-34/probes/rehearsal.md` holds the rehearsal with its commands and output: the hacks (section 2), the walls in order (section 3), the verifier's count (section 4), how the gate can build the jars (section 5), and the rows (section 6). Its programs against the prelude: `VarRecv.fss` (row 1076), `WidenGetter.fss` (row 993), `ExitNumeral.fss` (row 340's kind), `LabelLocals3.fss` and `LabelLocals4.fss` (row 1078's shape, which verify).

**Not run:** a gate stage, a whole suite, a timing, walk's answers for the prelude programs but `ExitNumeral`'s.

### Rows filed by plan

By this planner on 2026-11-18, with `ledger.py add`: 1090, walk's native strings and the line that names `FlatString` as a value; 1091, `Vector`'s `-` written twice into its template class. Notes on rows 1054 and 1076. The probe's facts for rows 818, 993, 994, 1078 and 340 did not fit their rows' notes (each row within 210 characters of its 700); they are in the rehearsal's section 6 and in the rungs' sections, and each rung that closes one rewrites it. A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

### Left out, each with its home

Section 2, "What the batch leaves out" and "For the batch after". Rows 994 and 1091 are the batch after's first item; row 1054 its second; the other forms of row 818, rows 996, 1055, 1056, 1035, 1085, 1086 and the checker's gaps its third; items 592, 1081 and 1068 its fourth, on the curator's answer.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 33b: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-34/manifest/` is made from `compile-ladder/plan-33/manifest/` before the launch: `lists34.py` holds the briefings of section 1, `gen34.py --run 1|2` writes a run's block from the record, and `check34.js --run 1|2` checks the block in a scratch copy of the script and, with `--write`, splices it.

- run 1: `BATCH` `34`, the folder `compile-ladder/climb-batch-34/`, the rungs L, P, T, G, F in that order; run 2: `BATCH` `34b`, `compile-ladder/climb-batch-34b/`, the rung C;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backtick, a backslash or a double quote;
- no rung declaring a count, a crash or a move;
- L, P and T `STAGE_BLIND`; G, F and C naming the two stages in a step of their sections.

### What every agent reads first

**Run 1.** This run is climb batch 34, the first of the two runs of the record CLIMB-BATCH-34.md, which aims at the first program compiled and run against the interpreter's library under the gate. This run removes five walls that stand between the library's fourteen components and that run, each with a test of its own. Its rungs:

- L, the JVM's verifier and a label body's local in the library's simplestRationalBetween;
- P, an overloaded call with a type assumption at some of its arguments but not all;
- T, a generic method called on a receiver typed by a type variable;
- G, NN32's two getters, and the checker's refusal of a getter that widens one it inherits;
- F, walk's native strings without the library's line that names the object FlatString as a value.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. Each rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. L, P and T share CodeGen.java by declaration: each keeps to its own, as its section says. G and F run the count stage and the distance stage once; L, P and T run neither. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of a rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather applies the rungs in the script's order, expected L, P, T, G, F, and builds the specification once.

**Run 2.** This run is climb batch 34b, the second of the two runs of the record CLIMB-BATCH-34.md, after climb batch 34, which landed rungs L, P, T, G and F. Its one rung:

- C, the first program compiled and run against the interpreter's library under the gate: the carriers of its built-in types, the run time's prelude names, and its fourteen components compiled to jars in the onelibrary track.

A request that stands before your brief and does not name your rung is not yours to act on, and it goes into no result of yours. If work of your own role on this rung exists when you start, an earlier launch of your role worked this rung: read the branch's log and the uncommitted files, run nothing again whose log is whole, and say in your report that two launches worked the rung. The rung has tests that fail on the base and pass after. A test file that you write holds one comment line, which says what the test checks. C runs the count stage and the distance stage once. No rung runs the team demos or the microGPT checks: the gather runs the 52 demos on the merged tree, and the commit stage the microGPT quick checks, which stay 7 of 7; microGPT and its helper files change no line. For each reserved point of the rung's section, the rung's skeptic runs one program on the base's code and on the rung's, whatever the worker's report says. The gather builds the specification once.

### Before the launch

The coordinator, for run 1, after the curator's go:

1. **The check of this record by a fresh reader on Fable,** its changes in place (`references/batch.md`, "The go").
2. **The generator** for `--run 1`, its checks and the splice, as the manual's "Before the launch", step 4, gives them; the keys into this record and into the rehearsal checked with `facts-extract.sh --check`. The base is `main`'s head after that commit.
3. **The base build.** `/home/user/fortress-base40` at `2676c8009c`, whose code is `95611a87c5` (`ba3c7c876d` with the declared return type passed to `generateActualMethodCode` as a parameter, so section C's line citations in `CodeGen.java` after `:2611` are up to four lines too high: find each member by name; run 1's sections cite `main`'s lines since the check of 2026-11-20), has `main`'s code and serves while `main` moves only under `explorations/`, `docs/` and `.claude/` (`git diff --stat 2676c8009c <base> -- . ':!explorations' ':!docs' ':!.claude'` prints nothing); its trial seed and the old code's run passed on 2026-11-19.
4. **The disk:** 11.5 G or more free; `git status --porcelain` empty in the main tree.
5. **The launch from a turn that no message of the curator's started,** a check-in's turn.
6. **Check-ins** for about 5 hours and a half, 45 minutes apart; the check-in file `<scratchpad>/batch34/checkins.txt`.

For run 2, after run 1's landing: section C and "The rule the rungs keep" read again against the landed tree, with L's, P's and T's members of `CodeGen.java` as landed and the five rows closed; a base build at run 1's landing (`/home/user/fortress-base40`); the generator's block for `--run 2`, checked and spliced; then steps 4 to 6 with 5.5 G free and check-ins for about 4 hours.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 2>', baseBuild: '<the base build of step 3>'}})` for run 1, and the same with run 2's base and its base build for run 2. The arguments of each are kept byte for byte.

### The gate, and what it should show

The comparands for run 1 are climb batch 33b's, in `compile-ladder/climb-batch-33b/gate/`: 64 suites, 3,608 tests, `CompilerJUTest` 1,766, `OneLibraryJUTest` 14, the system shards 878, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`.

- `testFast`: the compiler track's count plus L's, P's, T's and G's tests and promotions; the onelibrary track plus G's compile test (and L's expected failure if fork L1's fallback is taken); F's walk test where its harness runs it.
- `testSystem`: F's walk test, if it is a system test.
- The atomic runs: unchanged, 24 programs, each three times `PASS`.
- The ladder: no rung declares a move.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each.
- **The measure,** once after each run's landing, by the coordinator or the post-batch reviewer in a scratch worktree: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Before, on `ba3c7c876d`: 1 refused, 753 emitted (F-34). After run 1: 0. After run 2: the measure's patch is no longer needed, and its hunks for the carried types no longer apply; the measure is then the gate's own compile of the fourteen, which refuses nothing.
- For run 2 the comparands are run 1's gate. The onelibrary track gains the fourteen compile tests and `Hello`'s run test, and takes about 200 s more.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Run 1, closed:** 1078 (L); 818 for its partial form (P); 1076 (T); 993 (G); 1090 for walk (F).
- **Run 2, closed:** 874 and 1062 (C); 995 for `Boolean`, `Char` and `FlatString` if each has one name at run, else a note; 1090's compiled half, a note.

### After the landing

- **PLAN:** phase 4's F-34 line with the count after each run; the line on the walls that only the switch shows: rows 874, 993 and 1062 closed, row 994 and the new row 1091 the batch after's; the run tests promoted; "Next" and the lines of climb batches 34 and 34b.
- **The review queue:** this record's forks as new items; items 513, 521 and 601 built; item 597 unchanged.
- **The post-batch review** of each run; after run 2, the measure's script retired or taught to run without its patch.

### For the record-landing workflow

The batch edits no FACTS or POSITIONS entry. After run 1, these are false or name a closed row as open:

- **F-34:** "the code generator refuses 2 declarations ... the measure's script counts 1 of them", with its sentences on `__bigOperator2` (row 1076) and on `String`'s call (row 818): both walls are gone.
- **F-352:** "`NN32`'s two getters (row 993)" named as a wall that stands.

After run 2:

- **F-34:** "the count can be taken only on a patched tree", "No emitted class of the measure is run", "after the switch-over the code generator still stands between the library and bytecode": the fourteen compile to jars in each gate.
- **F-352:** "A compiled program has run against the interpreter's library only in a scratch tree": `Hello` runs on `main` in the gate; the walls named open (rows 874, 995, 993).
- **F-353:** "the one library's seven are not yet compiled over them (F-388)", and "`main` has ... one set of run-time classes": a second set serves the one library's other carried types.
- **F-381:** "A program compiled under the selection does not run yet, since the one library has no jars (F-34; row 1062)", and its list of tests.
- **F-388:** "for the prelude only (the one library's seven have no rows yet, fork N4)".
- **F-390:** "By reading, a run there would fail at the array ... no program runs on the one library yet (row 1062)".
- **P-164:** "At the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits": under the selection they do from run 2, in the second set; the words stay true of the first set.
- **P-33, P-37, P-178** stay true. P-33's words lost "by a second set of the run time's value classes" on 2026-11-18; the second set returns for the carried types other than the numbers, and the decision, one build for both libraries, is what the text says.

### For the skill writer: the sentences of `fortress-repo` this batch makes false

The batch writes no skill text. After the landings, the record-landing workflow's skill writer brings these in line (each as on `main` on 2026-11-18, after climb batch 33b's skill update).

After run 1:

- `references/compiler.md`, the type assumptions: "It refuses these forms (ledger row 818): a call of a functional method or an overloaded function with an assumption at some of its arguments but not all: 'Can't compile a dispatched call whose arguments are not all type assumptions'": it compiles (P).
- No sentence names rows 1076, 1078, 993 or 1090; T, L, G and F make none false. `references/compiler.md`, the checker's gaps, lacks one that stays true after G: the checker refuses a getter that widens an inherited one's return type. A sentence to add (G).

After run 2:

- `SKILL.md`, "How a program runs": "With the environment variable `FORTRESS_LIBRARY=one`, `fortress compile` reads the one library instead, and a program compiled so does not run yet": it runs once the fourteen jars are compiled (C).
- `references/build-and-caches.md`, "The caches": "No compile writes the one library's jars yet, so a program compiled with the variable dies at its first library class: 'NoClassDefFoundError: fortress/FortressLibrary$String' (ledger row 1062)"; and the library order, which has a second form under the variable (C).
- `references/compiler.md`, varargs: "With `FORTRESS_LIBRARY=one`, it compiles a varargs parameter, though such a program does not run yet" (C).
- `references/compiler.md`, "What the two paths share": the compiled `runtimeValues/` now has a second set in `src-one` for the one library (C).
- `references/tests-writing.md`: "Give a plain test there a `compile` command only: a program compiled so does not run yet (ledger row 1062)" (C).
- `references/tests-running.md`: the onelibrary track compiles the fourteen components first, about 200 s (C).
- `SKILL.md`, "The compiled runtime": "under the compiler's prelude, an `RR64`'s class extends `FRR64`": also under the one library (C).

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-33.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-33.md), [this planner's rehearsal](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-34/probes/rehearsal.md), [its patch, scripts and programs](https://github.com/palimondo/fortress/tree/main/explorations/compile-ladder/plan-34/probes), [the switch-over rehearsal](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/switch-rehearsal.md), [probe Y](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-31/probes/probe-y.md), [the carriers' ways](https://github.com/palimondo/fortress/blob/main/explorations/reviews/carriers-ways-2026-11-13.md), [rung N's report](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/rung-number-payload-objects/REPORT.md), [climb batch 33b's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-33b-review.md), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md).
- Code: [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [NamingCzar.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java), [LibraryNames.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/LibraryNames.java), [FZZ32.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java), [FValue.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FValue.java), [FortressMethodAdapter.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/nativeInterface/FortressMethodAdapter.java), [Naming.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java), [OverloadingChecker.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala), [glue/prim/FlatString.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FlatString.java), [BuildNativeEnvironment.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss), [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss), [FlatString.fss](https://github.com/palimondo/fortress/blob/main/Library/FlatString.fss), [String.fss](https://github.com/palimondo/fortress/blob/main/Library/String.fss), [build.xml](https://github.com/palimondo/fortress/blob/main/build.xml).
- Specification: [type-annotation.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/type-annotation.tex), [method-invocation.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/method-invocation.tex), [label.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/label.tex), [advanced/overloading.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/overloading.tex), [traits.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/traits.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
