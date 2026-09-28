# Skeptic, climb batch 6.5 rung G (`rung-generic-runtime`), first judgement

**Verdict: approved, with the required corrections of section 11.** The six fixes are real. Each has a recorded failure captured before the edit, and my own programs confirm each one on shapes the worker did not write, at one and four threads. No stop the batch record reserves is met.

The corrections are to the record. It overstates the reach of two fixes and misses one ledger row:
- The dispatch change moves the compiled answer for a class of arm pairs the report does not name.
- The row 351 fix does not reach a clause inside a `do … also` arm.
- The report says a pattern-bound name is desugarer-only, which is untrue.
- Row 460 still says the compiled run cannot read a clause binding.

Five defects I measured that the rung does not repair are in section 12 as recommended rows.

Every capture below is under `explorations/compile-ladder/rung-generic-runtime/probes/skeptic/` unless a path says otherwise. Machine for every capture: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, JDK 25.0.4, the load at start in each capture's first line (1.39 to 3.14). The other rung of the batch shared the box. The drivers are `sk.sh`, `threads-32.sh`, `junit-catch-tests.sh`, `junit-integer.sh` and `junit-rung-tests.sh`.

"Base" is the rung's tree run with a classpath shadow of the base's three edited Java files (`git show b797d8037:…`, compiled ahead of the build). So "base" means the base's code generator and loader over the rung's library cache. For row 417 I used a loader-only shadow instead.

## 1. The recorded failure

Present, and captured before any edit was compiled.
- `probes/junit-before.txt` was committed in `e4fad17ec`. That commit carries tests and probes only; the source edits arrive in `b677fdff9`.
- The capture's tree line reads `b797d8037 with source edits:` followed by nothing (`:2`).
- The failures it cites are at the lines cited: `:6`, `:25`, `:71`, `:109`, `:128`, `:151` and `:174`.
- `threads-before.txt:10` holds the four-thread NPE, `"cl" is null`.
- Two tests were recorded later: `WitnessIdentityRungG`, and `XXXDispatchMethodArmRungG`, which fails either way. They are in the block appended at `:199-260`. It is headed as run on the base build, with source edits present but not compiled (`:199-201`).
- Its `fortress/CompilerLibrary$y` failure is the base's `cast` defect, so the claim is credible.

## 2. The provenance block

I opened every cited line, and each one says what the block says.
- **problem:** the capture lines above.
- **spec:**
  - `overloading.tex:262-276`, dispatch to the most specific declaration applicable at run time;
  - `:100-107`, `:136-138`;
  - `trait-parameters.tex:19-24`, "in scope of the entire body";
  - `also.tex:17-21`, "a separate implicit thread";
  - `try.tex:56-60`, "the exception value is bound to the identifier";
  - `typecase.tex:88-99`;
  - `casting.tex:15-34`.
- **precedent:**
  - `CodeGen.java:3479-3489`, `forFnExpr`'s oxford-bracketed class and its xlation data;
  - `:373`, the copied `lexEnv`;
  - `:6463-6467`;
  - `RttiTupleMap.java:148-157`;
  - `jdk-loadclass-javap.txt:2-9`, which shows `getClassLoadingLock` then `monitorenter`.
- **deviation:** `OverloadSet.java:1338-1370`, `InstantiatingClassloader.java:178-211`, `FortressLibrary.fss:3126-3128`.
- **historical:** names all four 2012-tree files the diff edits.

No `spec:` line cites `Specification/library/apis/`.

## 3. The diff, against the specification and the measured patches

- **`OverloadSet.java`.** The change is exactly `plan-6.5/probes/dispatch/callsite-rebased.patch` minus the `-Dprobe.scope` switch and the `skip` variant. I diffed the added and removed lines of both: the only differences are the switch's five lines, its `off` condition and the `skip` block's three lines.
- **`CodeGen.delegate`.** Exactly `rung-size-runtime/probes/xxx-task-red-demo-fix.patch`, plus the deleted TO DO line. `delegate` has one caller (`CodeGen.java:1638`).
- **The loader.** It takes `synchronized (getClassLoadingLock(name))`. No loader in the tree is parallel-capable, so this is the loader's monitor.
  - `history` is a `Vector` (`InstantiatingClassloader.java:110`), and `loadClassHoldingLock` is its only reader and writer (`:189`, `:211`).
  - The explicit callers go through the locked override: `RTHelpers.java:49` and `:133`, and `InstantiatingClassloader.java:1921`.
- **The clause binding** (`CodeGen.java:2059-2061`, `:2131-2137`, `:2156-2164`) follows `forLocalVarDecl`'s shape. The value is cast with the same boxed type name the clause's `instanceof` tested, so the cast cannot fail where the test passed. This holds for tuple and arrow clause types too: `SkTupleNamed`, and `SkClauseKinds`'s `f: ZZ32 -> ZZ32`.
- **The library edit** is the two branches named, nothing else.

**What the edit does beyond what the report says.** `atTemplateParams` (`OverloadSet.java:1342-1353`) maps an arm's static parameters onto the dispatcher's by position. It checks only that:
- the counts are equal;
- each parameter is of type kind (`:1350`);
- both are `DeclaredFunction`s.

It does not check that the arm and the dispatcher relate by position. So it changes every such arm, not only α-renamings (finding 1).

## 4. The precedent search

It is sound for rows 417, 419 and 426, and for the dispatch change. It misses one sibling in the file it cites.
- For row 419 the report names `forFnExpr`'s device as the precedent for making a class from an expression (`CodeGen.java:3479-3489`).
- The same method's `apply` reserves local slot 0 for `this` (`cg.mv.reserveSlot0()`, `CodeGen.java:3509`).
- The task's `compute`, the other class `delegate` makes, does not: `generateTaskCompute` (`CodeGen.java:4739-4763`) calls `visitCode` at `:4742` and never reserves the slot.
- So the first local of a task body lands on `this`. The rung's clause binding makes exactly such a local, so a bound clause inside a `do … also` arm meets this defect (finding 2).
- Rule 2 asks for sites to be counted where a precedent repaired a defect. The report counted the five binding-name sites in `CodeGen.java`. It did not count the two class-making sites against each other.

## 5. The tests

I ran every `.test` file the rung adds or promotes through the harness on the rung's build, one per JVM (`junit-rung-tests.txt`).
- Every home-1 file is `OK`:
  - `TypecaseBindRungG`, `CastBindRungG`, `ArrowClauseBindRungG` and `WitnessIdentityRungG`, 2 tests each;
  - `FirstLoadThreadsRungG`, 3;
  - the three dispatch tests and their link tests;
  - `NatRtTask`, `NatRtMethBoth`, `ClauseBindingRungB` and their link tests.
- `XXXDispatchMethodArmRungG` shows its expected failure after its link test (`junit-xxx-method-after-link.txt`: `REACHED`, the `ClassCastException`, "Saw expected failure").
- My first run put it before its link test, and it failed on `run_out_contains` with nothing loaded. In the suite that cannot happen: `suiteFromListOfFiles` adds every command stage before any run stage (`FileTests.java:997-1005`), although the file order is shuffled by a time seed (`:1116`, `:1137`).

Each test file carries one comment line. The promotions change no assertion: `NatRtMethBoth` adds one, the `Hu` shape, and the other two only rename their component. The assertions exercise the defects the rows name, and I read each test. `FirstLoadThreadsRungG` is a real check only in the gate's four-thread stage, which names it (`explorations/coordinator/climb-batch-workflow.js:1650`, `:1713`), as the batch record intends.

The gated tests that reach the changed `forTry` code were not in the worker's measurements. Every `catch` clause now binds its name. All pass on the rung's build:
- `junit-catch-tests.txt`: `DefaultRenderRungS`, `IntSemanticsRungB`, `NatDispArmChecker`, `XXX9ad` to `XXX9ag` (expected failures seen), `IntegralOpsRungN`, `MaybeRungM`, `TryAtomicRungB`;
- `junit-integer.txt`: `Integer`, `OK (27 tests)`.

## 6. The competing-declaration grep

Every component name the rung adds occurs only in its own `.fss` and `.test` files, across `ProjectFortress/tests/`, every `*_tests/` directory and `ProjectFortress/src/com/sun/fortress/` whole. `DispatchMethodArmRungG` occurs nowhere as a component, since the component is `XXXDispatchMethodArmRungG`. The five new Java methods occur only in their own files: `loadClassHoldingLock` 2 hits, `bindAndGenerateClauseBody` 3, `templateStaticParams` 3, `atTemplateParams` 3, `invokeArmAtTemplateParams` 2.

## 7. The count table

The rung does not set `testIsStage`. The table it committed is `probes/checker-count-postedit.txt`:
- its `#total` is 75;
- the report and the record declare 75;
- the manifest's `expectedCheckerCount`, a prediction, is 75;
- the last landed gate's table is 75 (`explorations/compile-ladder/climb-batch-7C/gate/checker-count.txt`).

## 8. The differentials (my own programs, both thread columns)

Where the rung writes state, both thread columns are given (`writesState`: the loader, tasks, `atomic` accumulators).

| program (what it adds to the rung's tests) | base 1 / 4 | rung 1 / 4 | walk 1 / 4 | verdict |
|---|---|---|---|---|
| `SkFirstLoad32`: 32 instantiations and three first-load routes (dispatch to a generic arm, a generic function called from generic code, a tuple over an instantiation); 5 runs at 4 threads each way | 1: PASS; 4: 5 of 5 `"cl" is null` (`threads-32.txt:9-13`) | 1: PASS; 4: 5 of 5 PASS, 1,047-1,132 ms, no timeout (`:4-8`) | PASS | row 417 fixed |
| `SkTaskTuple`: a tuple's two components as tasks in a generic function | `NoSuchMethodError` (`task-shapes-split.txt:6`) | `stringstring zz32zz32` (`:12`, `:14`) | same | fixed (row 419) |
| `SkTaskHs`: a size read as a value in task operands of a generic method | `NoClassDefFoundError: CONST` (`:98`) | `7` (`:108`, `:110`) | `7` | fixed |
| `SkTaskHt`: object and method parameters in `also` arms and a closure argument | `U$RTTIc` (`:119`) | `stringzz32zz32zz32` (`:130`, `:132`) | same | fixed (row 420) |
| `SkTaskFor`: a parallel `for` over `T` | `8` | `8` | `8` | unchanged |
| `SkRenamed3`: three renamed arms, a generic caller, `ZZ32` | `ClassCastException` `Marker⟦Y⟧` (`dispatch-renamed.txt:6`, `:9`) | right, all eight answers (`:12-13`, `:16-17`) | refused (row 159) | fixed (row 493) |
| `SkRenamedTwo`: a two-parameter renamed arm, one parameter used as a value type (`dispatch-renamed-two.txt`; the block in `dispatch-renamed.txt` is a first spelling the parser refused) | `subtwo two` | `subtwo two` | refused (row 159) | unchanged |
| `SkPosBox`: `f[\T\](x: T)` beside `f[\U\](x: Box[\U\])`, reached through `viaT[\T\](x: T) = f(x)` | `box` (`dispatch-pos.txt:6`, `:11`) | `any` (`:17`, `:22`) | `any` (`:27`, `:32`); and `any` for the direct call, where compiled says `box` (`:26` vs `:5`) | answer changed, finding 1 |
| `SkPosFixed`: `grab[\X\](t: Tag[\X\])` beside `grab[\Y\](t: Fixed[\Y\])`, `Fixed[\Y\] extends Tag[\Blue\]` | `fixed` (`:38`, `:41`) | `tag` (`:45`, `:48`) | refused (row 159) | answer changed, finding 1 |
| `SkClauseKinds`: clause bindings at `Boolean`, `ZZ64`, `RR64`, `Box[\3\]`, an arrow; catch reading a field, two catch clauses, nested catch, a catch name captured by a `fn`, catch with `finally` | `VerifyError` (`clause-kinds.txt:5`, `:22`) | `T 14 0.5 box3 7 27` / `8 107 207 15 1007` / `fin 8` (`:40-42`, `:44-46`) | same (`:48-54`) | fixed |
| `SkTupleNamed`: a named tuple clause, bound and passed on | `ClassFormatError` (`tuple-named.txt:5`) | `matched a tuple` (`:16`) | same | fixed |
| `SkClauseOperand`: a named typecase as a `\|\|` operand | `NoClassDefFoundError $w` | `6#9` (`clause-in-task-split.txt:16`, `:18`) | `6#9` | fixed |
| `SkArrowMethodBind`: `andCondCombine`'s binding at an arrow over the generic's own parameter, at two instantiations, inside a 64-iteration parallel `for` | `NoClassDefFoundError $rp` (`arrow-method-bind.txt:6`) | `rel1rel2 cond rel11rel12`, `hits 64` (`:16-17`, `:19-20`) | same | fixed |
| `SkClauseInTask`: a named clause inside a `do … also` arm reading a captured variable | `NoClassDefFoundError $w` | `VerifyError`, `locals: { Wrap }` (`clause-in-task.txt:33-34`) | `a7!` (`:50`, `:54`) | not reached, finding 2 |
| `SkCatchInArm`: a catch inside a `do … also` arm | `VerifyError` (inconsistent stack map; `clause-in-task-split.txt:27`) | `VerifyError`, bad type (`:62`) | `a5?` (`:95`, `:97`) | not reached, finding 2 |
| `SkTaskLocalSlot`: a plain `j: ZZ32 = 2` in an `also` arm, no generics, no clause | not run | `VerifyError`, `locals: { FZZ32 }` (`task-local-slot.txt:5`, `:14`) | `12` | pre-existing, recommended row 1 |
| `SkTaskNestedPlain`, `SkTaskNested`: a local in an arm read by a nested `also` | `VerifyError` | `VerifyError` (`task-nested-plain.txt:6`, `:41`) | right | the same defect |
| `SkTryInArm`: `try … catch` in an arm, reading nothing captured | inconsistent stack map (`try-in-arm.txt:6`) | inconsistent stack map (`:41`) | `hit 6` | pre-existing, recommended row 2 |
| `SkPatternBind`: a program's own pattern clause, `Leaf(i) => i` | `NoClassDefFoundError $i` (`pattern-bind.txt:6`) | same (`:17`) | "undefined variable [i]" (`:27`) | pre-existing, finding 3 |
| `SkClauseTaskOps`, `SkTypecaseTaskOps`: a clause body `g(v) + h(v)`, named or not | code generator dies (`clause-task-ops.txt:5`; `typecase-task-ops.txt:4`) | same (`clause-task-ops.txt:26`; `typecase-task-ops.txt:17`) | `7` | pre-existing, recommended row 3 |
| `SkTupleClauseSpread`: a named tuple clause spread into a two-parameter call | code generator dies (`tuple-clause-spread.txt:4`) | same (`:21`) | `s7` | pre-existing, recommended row 3 |
| `SkIdentityWalk`: the base's and the rung's two branches beside the library's `SUM` and `PROD`, value and run-time type | n/a | n/a | identical at every leaf: `0 : ZZ32`, `0.0 : FloatLiteral`, `1 : ZZ32`, `1.0 : FloatLiteral` (`identity-walk.txt:3-14`, `:20-31`) | "its values stay what they are" holds |

- **Thread counts.** Every compiled differential ran at `FORTRESS_THREADS=1` and `4`, and every walk run too. No program's two columns disagree, except `SkFirstLoad32` under the base loader, which is row 417 itself.
- **Walk against the compiled run, by rule 4:**
  - For the fixed shapes, the specification settles against the base's compiled run, and the rung now agrees with walk.
  - For `SkPosBox` and `SkPosFixed`, the chapter gives both answers (finding 1). Walk's `any` for `SkPosBox`'s direct call is walk's own; row 159 and answer 9's walk rung own it.
  - For the task-arm, pattern and ASM-frame shapes, the specification settles against both compiled trees, and the repair lies outside this rung's fixes (the fourth outcome).

## 9. Findings, and the corrections they require

**Finding 1: the dispatch change moves the compiled answer for generic arms that are not the dispatcher's by position, and the record does not say so.**
- The record's FACTS line says `generateCall` "renames an arm whose static parameters match the template dispatcher's, up to renaming". The code renames every declared generic arm with as many type-kind static parameters as the dispatcher, by position (`OverloadSet.java:1342-1353`).
- Two pairs today's checker accepts change answer, silently, at both thread counts:
  - `SkPosBox`: `box` → `any`;
  - `SkPosFixed`: `fixed` → `tag`.
- The chapter gives both answers:
  - one instantiation fixed at the call gives the rung's answer (`Specification/basic/overloading.tex:100-107` with `:136-138`);
  - each declaration's static parameters inferred before applicability gives the base's (`:173-175`, "they are inferred … before checking the applicability of the declaration to the call", and `:292-295`).
- Answer 9's narrow rule refuses both pairs once built (`explorations/coordinator/POSITIONS.md:108`). The change assumes that rule, which the checker does not yet enforce.
- The 43 generic-overload tests are unchanged, so no gated verdict moves. The report's "Reach" is true as far as it goes.

**Finding 2: the row 351 fix does not reach a clause inside a `do … also` arm.**
- A named typecase clause or a `catch` in an arm whose body then reads a captured variable fails verification after the fix (`SkClauseInTask`, `SkCatchInArm`); walk is right.
- The cause is not row 351's own. `generateTaskCompute` never reserves slot 0 (section 4), so any local in an arm clobbers `this`: `SkTaskLocalSlot` fails with a plain `ZZ32` local and no clause.
- A `catch` in an arm also fails by row 322's mechanism (`SkTryInArm`, base and rung).
- A typecase used as a `||` operand works (`SkClauseOperand`).
- Row 351 can close, but the record must say what the fix does not reach, and the slot-0 defect needs a row.

**Finding 3: the report and the record say a pattern-bound name is produced "only by the coercion desugarer". A program may write one.**
- The parser takes a pattern in a typecase clause (`MayNewlineHeader.rats:35-40`, `:54-57`). The pattern desugarer keeps it (`PatternMatchingDesugarer.scala:668-671`).
- The team's own ungated `compiler_tests/patternMatching1.fss:39-43` writes `Leaf(i) => i`.
- `SkPatternBind` fails on both paths, before and after.
- The chapter defers patterns (`Specification/basic/expressions/typecase.tex:15`), so for this the specification is silent.

**Finding 4: row 460 still says the compiled run "cannot read its binding (row 351)"** (`explorations/fortress-gap-ledger.md:471`). The record appends nothing to it.

**Finding 5: home 3 for the non-template dispatcher shows no grep, and its departure from the record is not listed as a decision.**
- The batch record plans home 2 for both remainders "where the rung shows it failing" (`explorations/coordinator/CLIMB-BATCH-6.5.md:188`). The report argues home 3 in its section 9 but lists no decision in section 12.
- My grep (`grep -n 'static parameters' Specification/basic/overloading.tex Specification/advanced/overloading.tex`) finds:
  - `:102-107`, the sentence;
  - `:167`, `:173-175`, `:205` and `:292-295`, inference before applicability and specificity;
  - `advanced/overloading.tex:95-103`, "identical (up to α-equivalence)".
- None says which declaration applies at run time to a call resolved to a declaration without static parameters. The chapter forbids such a pair outright. The worker's home 3 stands on that.

**The failure-mode question.** Each loud failure the rung replaces becomes the specification's value, and I checked each against walk:
- `cast[\T\]` of a value of type `T` returns it;
- the dispatch programs answer the more specific arm at the call's instantiation;
- bound names read their values;
- the loader's race gives the right sum;
- tasks build their instances.

No loud failure became a quiet wrong value. The one quiet value that changed is finding 1's: a quiet answer before became a different quiet answer, on programs answer 9 will refuse. The identity functions' walk values are unchanged (`SkIdentityWalk`).

## 10. Stops

None met.
- **Compiled verdicts:** no compiled test's verdict changes other than the rung's own. That covers:
  - the catch-bearing gated tests (section 5);
  - the worker's 43 generic-overload and 20 sized tests (`probes/compare-generic-overload.txt`, `probes/compare-sized.txt`);
  - the 85 ladder files (`explorations/compile-ladder/rung-generic-runtime/ladder-compare.txt`: 82 "stdout same", and the three `nestedTransactions` timing lines, which are rung D's rule).
- **Four-thread runs:** none deadlocks or times out (`threads-32.txt`, the worker's `probes/atomic-after.txt`).
- **Library jars:** the one class that changes is `cast`'s template, named before measuring (`probes/library-jars.txt`). The prelude's other typecase, `instanceOf`, has no name (`Library/CompilerLibrary.fss:45-49`).
- **Scope:** no edit touches the checker, walk or a library line beyond the two identity functions.

## 11. Required corrections (the commit stage closes each)

1. **The dispatch change's reach** (finding 1).
   - In the record's FACTS line "A generic arm of a template dispatcher is called at the dispatcher's own static parameters", and in REPORT.md sections 7 and 9, replace "renames an arm whose static parameters match the template dispatcher's, up to renaming" with the guard the code has. It reads every declared generic arm with as many static parameters as the template dispatcher, all of type kind, at the dispatcher's parameters by position (`OverloadSet.java:1342-1353`).
   - Add the class it changes: "An arm in the more-specific relation that is not the dispatcher's by position is now tested at the call's instantiation. For `f[\T\](x: T)` beside `f[\U\](x: Box[\U\])` reached through a generic caller, and for `grab[\Y\](t: Fixed[\Y\])` with `Fixed[\Y\] extends Tag[\Blue\]`, the compiled answer moved from the more specific arm to the less specific one."
   - Cite the evidence: `compile-ladder/rung-generic-runtime/probes/skeptic/dispatch-pos.txt:6`, `:17`, `:38`, `:45`.
   - Say where each answer comes from: the chapter gives the new answer by `Specification/basic/overloading.tex:100-107` with `:136-138`, and the old one by `:173-175` and `:292-295`. Answer 9's narrow rule refuses both pairs once built (POSITIONS 2026-09-26, answer 9).
2. **Row 351's reach** (finding 2). In REPORT.md section 1 item 6 and section 10, in the FACTS line's "What it does not reach", and in row 351's closing note, add: "A named clause or a `catch` inside a `do … also` arm whose body then reads a captured variable still fails verification. A local in a task body takes `this`'s slot (the new row). A `catch` there also meets row 322's mechanism." Cite `compile-ladder/rung-generic-runtime/probes/skeptic/clause-in-task.txt:33-34`, `:50`, `clause-in-task-split.txt:62`, `:95`, `try-in-arm.txt:41`.
3. **Pattern-bound names** (finding 3).
   - Where it occurs, remove "which only the coercion desugarer produces": REPORT.md section 5 (row 351's second bullet) and section 10 (the last row), the FACTS line's "What it does not reach", and row 351's closing note.
   - In its place write: "a name bound inside a clause's pattern, which the coercion desugarer produces and a program may write (`Leaf(i) => i`; the team's ungated `ProjectFortress/compiler_tests/patternMatching1.fss:39-43`), is still unbound on the compiled path, and walk refuses it too".
   - Cite `compile-ladder/rung-generic-runtime/probes/skeptic/pattern-bind.txt:6`, `:17`, `:27`.
4. **Row 460** (finding 4). The record appends to row 460: "Climb batch 6.5 rung G (`<commit>`): the compiled run reads the clause-binding form `rp:T =>` (row 351). The shorthand form's narrowing and the binding form `typecase x = e of` are unchanged."
5. **Home 3's grep and the decision** (finding 5).
   - REPORT.md section 9's paragraph on a dispatcher that is not a template shows the grep behind "the specification is silent", with section 9's result lines.
   - REPORT.md section 12 lists as a decision the choice of home 3 over the batch record's home 2 for that remainder (`explorations/coordinator/CLIMB-BATCH-6.5.md:188`). The alternative to name is an `XXX` test asserting only that the call does not throw and answers one of the two declarations. It was not taken, because the chapter as committed forbids the pair.

## 12. Recommended rows (the gather opens or refuses each)

1. **New row: a local declared in a `do … also` arm takes local slot 0 of the task's `compute`, the slot of `this`, so any later read of a variable the arm captured fails verification.**
   - Symptom: `VerifyError: Bad type on operand stack`, the frame's `locals: { FZZ32 }`.
   - Cause: `CodeGen.generateTaskCompute` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4739-4763`) opens the method with `visitCode` (`:4742`) and never calls `mv.reserveSlot0()`, which `forFnExpr`'s `apply` does (`:3509`).
   - Reproducers: `compile-ladder/rung-generic-runtime/probes/skeptic/SkTaskLocalSlot.fss` (`task-local-slot.txt:5`, `:14`); `SkTaskNestedPlain.fss`, `SkTaskNested.fss` (`task-nested-plain.txt:6`, `:41`).
   - Since rung G it also stops a named typecase clause or a catch name in an arm: `SkClauseInTask.fss`, `SkCatchInArm.fss` (`clause-in-task.txt:33-34`; `clause-in-task-split.txt:62`).
   - Walk is right at 1 and 4 threads.
   - Specification: `Specification/basic/expressions/also.tex:17-21`, `typecase.tex:88-91`, `try.tex:56-60`.
   - Status: NEGATIVE-VERIFIED. Class: implementation gap (code generation).
   - The fix is `mv.reserveSlot0()` after `visitCode`, with the compiler library's jars compared, since a library task with a local would renumber.
   - Home 2: an `XXX` compiled pair in `compiler_tests/`, a link test and an `XXX` run test (FACTS, "The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only, and a run-time defect needs two `.test` files").
2. **A note on row 322: `try … catch` in a `do … also` arm fails verification by the same mechanism as `atomic`.**
   - The task's `this` sits on the operand stack across the arm's body, and the handler clears the stack: "Inconsistent stackmap frames".
   - The base and rung trees fail alike, while walk prints `hit 6`: `compile-ladder/rung-generic-runtime/probes/skeptic/SkTryInArm.fss`, `try-in-arm.txt:6`, `:41`, `:74`.
   - The row's general statement extends from `forAtomicBlock` to `forTry`.
3. **A note on row 340: the same ASM stack-map failure without a coercion.**
   - The symptom is `Error trying to close method scope`, from `ArrayIndexOutOfBoundsException` in `Frame.merge`. Two shapes reach it:
     - a typecase clause whose body has operands the analyzer runs as tasks (`v: Wrap => g(v) + h(v)`), with or without a name (`compile-ladder/rung-generic-runtime/probes/skeptic/SkClauseTaskOps.fss`, `SkTypecaseTaskOps.fss`; `clause-task-ops.txt:5`, `:26`, `:46`; `typecase-task-ops.txt:4`, `:17`, `:33`);
     - a named tuple clause spread into a two-parameter call (`SkTupleClauseSpread.fss`, `tuple-clause-spread.txt:4`, `:21`, `:41`).
   - A plain local tuple spreads fine (`SkTupleSpread.fss`, `tuple-spread.txt`).
   - Both trees fail alike, and walk is right.
4. **New row: a name bound inside a typecase clause's pattern that a program writes, `Leaf(i) => i`, is unbound on both paths.**
   - Compiled: `NoClassDefFoundError: …$i`. Walk: "undefined variable [i]". Before and after rung G.
   - The checker accepts it, and the pattern desugarer keeps the pattern (`ProjectFortress/src/com/sun/fortress/compiler/PatternMatchingDesugarer.scala:668-671`).
   - Home 3: the chapter defers patterns (`Specification/basic/expressions/typecase.tex:15`).
   - Probe: `compile-ladder/rung-generic-runtime/probes/skeptic/SkPatternBind.fss`, `pattern-bind.txt:6`, `:17`, `:27`. The team's ungated `ProjectFortress/compiler_tests/patternMatching1.fss:39-43` has the shape.
5. **New row, or a note on provisional row 493: until answer 9's narrow rule is built, the compiled checker accepts generic arms in the more-specific relation that do not agree position by position.**
   - Since rung G the compiled dispatcher answers them at the call's instantiation, where it answered by value inference before: `box` → `any`, `fixed` → `tag`.
   - Probes: `compile-ladder/rung-generic-runtime/probes/skeptic/SkPosBox.fss`, `SkPosFixed.fss`, `dispatch-pos.txt:5-6`, `:17`, `:26-27`, `:38`, `:45`.
   - The chapter gives both answers (`Specification/basic/overloading.tex:100-107` with `:136-138`, against `:173-175` and `:292-295`).
   - Walk answers `SkPosBox` with the less specific declaration even for the direct call, where compiled answers `box`, and refuses `SkPosFixed` (row 159).
   - It closes when answer 9's checker rung refuses the pairs (POSITIONS 2026-09-26, answer 9). Home 3 until then, the passages disagreeing.

## 13. For Pavol

- **The measured dispatch change landed with its switch removed, and it changes the compiled answer for a class it was not measured on.** That class is generic arms in the more-specific relation that do not agree position by position (`compile-ladder/rung-generic-runtime/probes/skeptic/dispatch-pos.txt:6` → `:17`, `:38` → `:45`).
  - Today's checker accepts these programs, and answer 9's narrow rule will refuse them.
  - The chapter's two passages give the two answers (`Specification/basic/overloading.tex:100-107`, `:173-175`).
  - No gated verdict moves (the worker's `probes/compare-generic-overload.txt`).
  - Reversible. For his review, not a hold.
- The worker's two points stand: `compile-ladder/rung-generic-runtime/probes/for-pavol.txt:2` (a dispatcher that is not a template) and `:3` (walk's row 159 refusal of α-renamed pairs).

## 14. Where each defect this skeptic measured lives

- **Row 417:** home 1, `compiler_tests/FirstLoadThreadsRungG` in the gate's four-thread stage. My 32-instantiation variant is `SkFirstLoad32` (`threads-32.txt`).
- **Rows 419 and 420:** home 1, `NatRtTask` and `NatRtMethBoth`. My variants `SkTaskTuple`, `SkTaskHs` and `SkTaskHt` pass after (`task-shapes-split.txt`).
- **Dispatch rows 493 and 494:** home 1, the three `Dispatch*RungG` tests. My `SkRenamed3` passes after.
- **Rows 351 and 426:** home 1, the rung's typecase, cast, witness and catch tests. My `SkClauseKinds`, `SkTupleNamed`, `SkClauseOperand` and `SkArrowMethodBind` pass after.
- **The slot-0 defect of task bodies:** recommended row 1, home 2 owed.
- **`try` in an arm:** recommended row 2, a note on row 322.
- **The ASM frame shapes:** recommended row 3, a note on row 340.
- **Pattern-bound names:** recommended row 4, home 3, the specification silent (`typecase.tex:15`).
- **The interim dispatch answer:** recommended row 5, home 3, the passages disagreeing.
