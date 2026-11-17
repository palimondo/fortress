<!-- The check of climb batch 33's record, `CLIMB-BATCH-33.md` (`91029fdea7` on `main`), with its probe notes `compile-ladder/plan-33/PROBES.md`, before any launch and before the curator's go, by a fresh reader on Fable on 2026-11-17: run 1's citations at their sources, its reproducers run once on a worktree seeded from the base build `/home/user/fortress-base37` (`c3b16ef2d1`), each repair against the team's sources, each rung against the decisions on record, the forks, the merge of each run, the measures and the estimate, and the section for the curator; of run 2, the decisions, the forks and the merge. No consequential fork; five points for the coordinator before the launch; twelve changes of the record, each with its reason. -->

# The check of climb batch 33's record before its launch

## For the curator

**What I checked.** I read the record as a new reader. I ran each of run 1's failing programs once, on a scratch tree with the code of `main`. I read each decision that a rung names, with its history. I read the carriers' review, ways C and D and its three forms. I checked whether the rungs of each run can be merged, and whether the cost fits the last batch.

**What I found.**

- **No fork needs your answer before the launch.** The form of the prelude's number types is your decision P-178. Its detail is the review's way D, which uses way C's code generator. Inside way C the review recommends form 2. Review-queue item 513 says that the choice between forms 1 and 2 is the planner's, not yours.
- **Every program of run 1 fails today as the record says,** with the message that it gives. One description was too wide (rung V, below).
- **The selector works alone.** I built its two lines on today's code, without the number change. A `println` program and the `QQ` program compile against the one library. The array program stops, 'Not in the trait table: Array1', as the record says. With the planner's search hack for the trait table added, the array program compiles. So rung R does not need rung N.
- **One sentence of your section was wrong.** It said that the number types' hand-written classes "now name no library". They still name the prelude's string type in one method. I corrected it. The answer to item 521 stays the same in kind: no fork for you. But it is shown by reading, not by a run.
- **Your entry P-33 says** "one build serving both by a second set of the run time's value classes". After run 2 the seven number types use no second set. That does not bend what you said: your words were to take microGPT's slice first if probe Y works. But the entry's words need a change after the landing. I put that on your review list in the record.
- **Rung N's half for the one library has no test that can fail.** No program runs on the one library yet. The record's check for it is a count, which loads no class. This is a point for the coordinator.
- **Run 2's cost looks low.** By the last batch's second run, I expect about 3.1 to 3.4 million tokens for it, not 2.6. That is inside the record's range.

**What I changed.** Twelve places in the record and one in the probe notes. Each is a citation, a count, or a sentence that its source contradicts. I changed no design. They are listed in part A.

## A. Changes of the record that I made

Each has one reason. Section 1 of the record is the manifest's source. I did not edit it. Where a change of a rung's section needs the same change there, I say so.

1. **Rung V, row 822's form (section 2, and section 4, V, step 1).** The record said that a `typecase` inside a generic function "whose arms name its type parameters" stops. Reason: my first reproducer of that description compiles and runs.
   - `pick[\T, E extends T, F extends T\](a: Bx[\E\], b: Bx[\F\])` with arms `(a': Bx[\T\], b': Bx[\T\]) => "both T"`: compiles, prints `both T`, as walk.
   - The same with the arm `=> a'.same(b')`, which reads the bound value: the compile stops, 'E is not in the kind env [][]', at the function's first parameter (`:11:40`). Walk prints `same`.
   - The same function without a `typecase`, calling `a.joinR[\F\](b)`: compiles and runs.
   - So the form needs an arm whose body reads the value that it binds, and the message named `E`, not `T`. The section now says so and tells the worker to pin 'is not in the kind env'. **The manifest's blurb for V** ("'T is not in the kind env' on a typecase inside a generic function whose arms name its type parameters") needs the same change.
2. **Rung Q in section 2.** "which the coordinator placed first in this batch" became three sentences. Reason: item 572 says that the coordinator took the placing without asking, and that "his review can undo it before that batch launches"; the curator's section did not tell him that he can.
3. **Item 521 in section 2,** and PROBES, section 7. "Their hand-written classes now name no library" is false on the probe's own patch. Each payload class's `asString` returns `FJavaString`, the prelude's string carrier, and `FValue.asString()` is declared at `fortress.CompilerBuiltin.String` (`compiler/runtimeValues/FValue.java:21`). Item 521 names this condition: "there may be no second set at all, if `FValue.asString()` is also freed of the library's name, which is by reading only".
4. **The measures, section 2.** "the 4 of the kind environment" became "the 4 that stop at rung V's wall". Reason: the section never defines "kind environment".
5. **The measures, section 2: a line on microGPT itself.** Reason: the section did not say how far the batch brings microGPT. The line gives what I saw under the selector (last section).
6. **Cost, section 2.** "Its fixed roles wrote about 0.9 million in each run" was false for run 2: 1.25 million (`reviews/batch-31b-review.md:139`). The sentence now gives both figures and the two runs' figure for a rung with its skeptic.
7. **The review list, section 2:** P-33's words added. Reason: finding C1.
8. **Rung D, "Specification".** The record named no rule of the team's that refuses the program, and rung D refuses programs that load today. The rule is `Specification/basic/declarations.tex:571-572`: "it is a static error for a reference to a name to occur where it is not in scope in the appropriate namespace".
9. **Rung N, "Files":** `methodCall` (`:624`) is the member at `:611`; `:624` is the line inside it that the probe edits. The probe's patch also adds a field and a helper at `:231-233` and a line in the private constructor (`:367`), which the list did not name.
10. **"The rule the rungs keep", run 2:** "N's lowest edited line is `methodCall` (`:624`)". By the probe's patch it is `:233`. The order N, R is unchanged.
11. **Rung N, step 6, row 566.** Finding B3: two hash modes that pass do not settle the cause. The step now asks for the same two runs on the base's code and for the name that the failing cast holds.
12. **"For the record-landing workflow", after run 2:** P-33 added before "P-178 and P-37 stay true". Reason: finding C1.

The record's header has one new history line that names this review.

## B. Points for the coordinator before the launch

1. **Rung N's half for the one library lands without a test that can fail (fork N4).** The rule of the work is the test first. The record's check is the measure, which "writes no class that runs" (PROBES, section 5). The names table that follows the selector, `LibraryNames`, is read only when a value is made at a run. So after run 2 nothing gated shows that `fortress.FortressLibrary$ZZ32` is found, or that its class loads over `FZZ32`. The record's other way, the prelude's seven first and the one library's in a later rung, costs a second pass over the same files. Decide which; either can be undone. If N4 stays, say in N's brief that this half is unverified at the run, and give the batch after's first rung its test.
2. **Run 2's sections name V's landed code.** Row 812 (V, run 1) and row 1061 (R, run 2) stop in one call: `analyzer.lteq(tt2, tt)` in `STypesUtil.removeIdenticallyCoveredMethods` (`STypesUtil.scala:1587`), reached from `CodeGen`'s constructor (`CodeGen.java:488`). V may not edit `STypesUtil.scala`, so its repair is in how the constructor makes the analyzer. R's root is in the entries that reach the same call. They are in two runs, so the gather has no conflict. When R's section is read again on run 1's tree, name V's change at that site in it.
3. **Row 566.** The record gives N two hash modes. That is two orders, not a cause. The row's message names an instance stamped `fortress|CompilerBuiltin%ZZ32`. That is the two-names fault that fork N3 removes. So form 2 may repair the row, and the order may have nothing to do with it. Change 11 gives N the base's runs and the trace.
4. **The estimate of run 2.** Run 2 of climb batch 31 wrote 0.89 million for a rung with its skeptic, and 1.25 million in the fixed roles. Rung N is larger than any rung of that run: the prelude, seven run-time classes, the code generator, both suites, the measure. By those figures run 2 is about 3.1 to 3.4 million without a ruling. The record says 2.6, with a range to 4.0. Run 1's 4.1 million sits between the two runs' rates (3.6 million by run 1's, 5.7 by run 2's); its range of 3.6 to 5.6 nearly holds both.
5. **microGPT under the selector.** The curator's section did not say how far the batch brings microGPT. I tried it once (last section): the checker refuses `FlatArrays` with 17 errors, F-58's. Change 5 says so. Nothing to decide; the figure is his to read before the go.

## C. Points that would change a decision of the curator's

None would change one. One touches an entry's words.

1. **P-33's mechanism.** The entry says "one build serving both by a second set of the run time's value classes (F-353)". Forks S5 and N4 build no second set for the numbers. His words on record for that block are: "if the probe y works, we will take the micro GPT slice first" (P-33's history, 2026-11-17 12:35Z). The mechanism is the coordinator's summary of probe Y, and item 521 itself foresees "no second set at all" under form 2. So the forks do not bend his decision. The entry's words become inexact after run 2. The record said "The batch edits no FACTS or POSITIONS entry" and listed P-178 and P-37 as staying true, without P-33. Changes 7 and 12 put it on his list and on the record-landing's.

## The checks, one by one

### 1. Citations, run 1

Read at `main`'s code. Right: `Shell.java:373-379`; `parser/DelimitedExpr.rats:241-248`; `Library/FortressLibrary.fss:291-294`, and the four integer objects at `:846`, `:951`, `:1063`, `:1170`; `Library/List.fss:93` and `:252`; `CodeGen.java` `:1023`, `:2524`, `:3867`, `:3941`, `:4485`, `:4822`, `:7028`, `:7630`; `MethodInstantiater.java:269`; `TypeAnalyzer.scala:1102`; `TraitTable.scala:79-84`; `FZZ32.java:14-15`; `STypesUtil.scala:1584-1588`; rows 959, 812, 822, 1051, 1050, 1052, 1005, 1028, 1029, 1060 and 1061; F-34 (17, printed 18, 742 emitted, 5 kinds); F-353; item 572; climb batch 31b's gate counts. Wrong: `CodeGen.java:624` for `methodCall` (change 9); the fixed roles' figure (change 6).

### 2. Reproducers, run 1

One worktree, `/home/user/fortress-chk33`, seeded from the base build and removed. Each program ran once; I ran two `run` steps a second time to read a message that my first command cut.

- **S.** `Half.fss` (`q: QQ = 1/2`), `fortress compile`: 'QQ is undefined.', with and without `FORTRESS_LIBRARY=one`. As the record says. With the selector's two lines built: `HelloOne` exit 0, `Half` exit 0, `Arr` 'Not in the trait table: Array1'.
- **D.** `v: Any = 2.5`, an arm `Int`: prints `an Int` under walk and compiled. Row 959's own test loads and prints 'the undefined arm'. As the record says.
- **V.** `ComprisesWhereFunctionalMethodChecker` compiled: 'E is not in the kind env [][]'; walk prints `PASS`. As the record says. Row 822's form: change 1.
- **Q.** The record's `Tord` program: compiles; the run dies, 'VerifyError: Bad return type'; walk prints 5. `XXXComprisesValueAtConditionalArmRun` and `XXXComprisesValueFromClosureRun`: 'VerifyError: Bad return type'. `XXXSelfTypeParameterReceiverRun`: 'ClassCircularityError: ...$Pt'. The three links pass. As the record says.
- **C.** Row 1060's program: compiles; the run dies, 'NoClassDefFoundError: fortress/CompilerBuiltin$v'; walk prints 4. `XXXSubscriptThenSuperscriptCompiled`: 'Result of typechecking still contains intermediate nodes'. `XXXTopLevelVarByAssignExport`: 'due to different modifiers'. `XXXLocalTupleBindingMixedTypes`: 'ClassCastException', `FZZ32` to `FZZ64`. As the record says.

No rung's test fails for another reason than its gap.

### 3. Repairs against the team's sources, run 1

- **S** builds P-33's selector. It changes nothing without the selection.
- **D** refuses programs that load today. The team's rule: `declarations.tex:571-572` (change 8). No library, test, demo or model line has an arm at one of the five removed names (`grep` of `Library`, `LibraryBuiltin`, the tests, the demos and microGPT's folders).
- **V** and **Q**: the checker passes each program and walk runs it; the code generator's stop or the JVM's refusal is the defect. P-146 and P-60 give `self` its type.
- **C**: each row cites its section. Row 1028: `variables.tex`, `var` is optional with `:=`. Row 1029's repair refuses `(e: String, f) = two()`, which compiles today and prints 7; walk refuses it, and the rung's reserved point names such a program. Row 1060 follows P-173.

### 4. Decisions

- **N.** P-178's history, 2026-11-17 15:26Z: fork H2 is settled by way D, "whose code generator is way C's"; "No word of his names a way". The review, way C, "Where the class comes from: three forms": "Form 2 looks best to me". Item 513: the choice of forms 1 and 2 is "the planner's, not his". P-37 holds the second exception. P-17 and P-84: form 2 still boxes, and the review's "Speed later" keeps the road to a bare value open; the record claims no more. One tension, not a fork: way D's text says "one declaration, one class, one name" and "without W12's rule for the numbers", and form 2 keeps two class names and W12's rule (fork N3). The review itself puts the forms inside way C and says of way D's code generator "as way C".
- **S.** P-33 and F-353: finding C1.
- **Q.** Item 572, "Taken by the coordinator on 2026-11-17: 1a": change 2.
- **P-87 and P-9.** No rung names a model line. Each rung's reserved points hold "A model line: none".
- I found no premise stated as the curator's that an entry or its history lacks.

### 5. Forks

Of the 21, none is consequential. In one line each: B1, B2, B3 order the work and can be undone. S1 to S4 and S6 are the selector's form, inside P-33. S5 and N4: finding C1 and point B1. D1 follows the specification's rule. V1, Q1, Q2, C1, R1 choose where a repair is made. N1 to N3 name a class inside the run time. N5 keeps a test as it is unless it passes twice. N6 changes a team test's pinned message to P-178's answer; it is a reserved point.

- **Item 521 has no real fork:** I agree, with change 3. Either form of the second set is run-time plumbing that can be undone.
- **Skipping refused declarations belongs to the batch after:** I agree. This batch compiles no library component, so no rung meets the choice. The record names it to the curator with its default and the other way.

### 6. The merge

- **Run 1** merges cleanly. Only V and Q share a file, `CodeGen.java`, in different members; V's lowest line is below Q's. D and V both touch `typecase`, in different phases and different arm forms. No pair changes one behaviour two ways. None needs another's result.
- **Run 2** merges cleanly if R keeps to `methodsNamed` and the Scala. R does not need N: on today's code with the selector's two lines and the trait table's search over the one library, `Arr.fss` compiles, exit 0, without form 2.
- **The reason for two runs holds.** R's test needs S: without S's selector the array program cannot reach the one library at all. N's names table follows S's selector.
- Point B2 for the second reading of R.

### 7. Measures and estimate

- F-34's count is taken on a patched scratch tree, once; the record's gate section says so. The count of programs that compile under the selector: I measured the same on the selector alone (check 2). The planner's own figures for it were taken over form 2 (PROBES, section 6).
- Row 566: point B3. The estimates: point B4.

### 8. The section for the curator

It lets him judge each rung: each has what changes, a small program, today's message and the result after. The forks are in section 3, each with its default and the other way. What is left out has its reason. Wrong or missing, now changed: V's second form (1), item 572's undo (2), item 521's sentence (3), an undefined term (4), microGPT's own distance (5). The register holds: short active sentences, each term defined in "The words this record uses", lists and no tables.

## microGPT under the selector, seen once

On the scratch tree with the selector's two lines and the trait table's search (the planner's hack, which stands for rung R's repair), I compiled the flat program's three components with `FORTRESS_LIBRARY=one`, once, from a copy of `explorations/run-c4/src/`.

- `FlatArrays.fss`: the checker refuses it, 'File FlatArrays.fss has 17 errors.' The first: 'Ill-formed type: Array[\RR64,I\]. The static argument I does not satisfy the corresponding bound Index.' (`FlatArrays.fsi:15`). Another: 'The static argument T does not satisfy the corresponding bound MultiplicativeRing[\T\].'
- `FlatData.fss`: 18 errors, `FlatArrays`'s and one of the library's `File` api against `FileSupport`.
- `MicroGptFlat.fss`: 17 errors, `FlatArrays`'s.

So microGPT stops at the checker, before the code generator, on the errors that F-58 counts (its figure is 42 sites by the distance stage's driver, which catches each failure; the compile command stops earlier). The batch does not move that. The record's section 2 now says so (change 5).

## Commands

- `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base37 /home/user/fortress-chk33 - c3b16ef2d1`; the worktree removed after.
- `bin/fortress compile P.fss`, `bin/fortress run P`, `bin/fortress P.fss` for each program above.
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh chk ProjectFortress/compiler_tests` with the seven `XXX` tests and their five link tests: `OK (12 tests)`.
- The selector: the `Shell.java` and `WellKnownNames.java` hunks of `compile-ladder/plan-31/probes/probe-y.patch`, without the `ByteCodeWriter` line; `ant compileAll`; `FORTRESS_LIBRARY=one FORTRESS_CACHES=<private> JAVA_FLAGS="... -Dfortress.caches=<private>" bin/fortress compile`.
- The trait table's search: the `TraitTable.scala` hunk of `compile-ladder/plan-31/probes/planner/measure-hacks.patch`.
