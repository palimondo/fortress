# Rung G, climb batch 6.5: the record lines for the gather

The harness refused this rung's write of this file; the gather writes it from the structured result. `fd5cb4864` below is the landed commit, which the commit stage filled in where the gather wrote the placeholder. New ledger rows are numbered provisionally from 493 and the gather assigns the final numbers in manifest order (G, P).

At the gather: the rung's rows keep their numbers, 493 to 496, and its skeptic's three new rows are 497 to 499 (the last section below); the rung's commit placeholder is written as the one the commit stage replaces; the skeptic's five required corrections are made in the text below.

## FACTS.md

Under "Execution model", after "Generic instantiations":

- **The compiled run's class loader takes its first load of a name under the JDK's class-loading lock, and a generic arm's first load is safe on four threads** (2026-09-28, climb batch 6.5 rung G, `fd5cb4864`; `compile-ladder/rung-generic-runtime/REPORT.md` sections 1, 11, 12; row 417).
  - What changed: `InstantiatingClassloader.loadClass` runs under `getClassLoadingLock(name)`, as the JDK's own `ClassLoader.loadClass` does (`compile-ladder/rung-generic-runtime/probes/jdk-loadclass-javap.txt:2-9`). No loader in the tree registers as parallel-capable, so that lock is the loader's own monitor, the one the JVM already holds when it resolves a class through the loader. The explicit loads, `RTHelpers.loadClosureClass`, `RTHelpers.getRTTIclass` and the union instantiation, had been the only ones without it. `history` is still written before `defineClass`, safe under the lock.
  - Measured: `compiler_tests/FirstLoadThreadsRungG` fails 5 of 5 compiled runs at `FORTRESS_THREADS=4` on the base and passes 5 of 5 after (`probes/threads-before.txt:10-14`, `threads-after.txt:10-14`). The gate's four-thread stage runs it as its fourteenth program, 42 PASS on the rung's tree (`probes/atomic-after.txt:12-14`).
  - Cost: none measurable. Against a base-loader shadow, seven interleaved runs each at four threads, the medians differ by -42 to +62 ms on the thirteen `atomic` programs, whose runs take 270 to 1,400 ms (`probes/lock-cost.txt`; nproc 4, Intel Xeon @ 2.10GHz, 2100.000 MHz, load 4.2 to 5.1, JDK 25).

Under "Landed semantics":

- **A typecase or catch clause's bound name is a local on the compiled path, so the compiled `cast[\T\]` matches a value of type `T`** (2026-09-28, climb batch 6.5 rung G, `fd5cb4864`; rows 351, 426).
  - What changed: `CodeGen.forTypecase` binds a named clause's matched value, cast to the clause's type, as a local of a nested scope for the clause body, the shape of `forLocalVarDecl`. `CodeGen.forTry` binds the catch name to the exception's value the same way. A clause without a name is generated as before.
  - What it means: the compiler library's `cast` template stores and reads its `y` where it had read a missing top-level object. That template is the one class of the five library jars that changes (`compile-ladder/rung-generic-runtime/probes/library-jars.txt`, `cast-template-javap.txt`).
  - What it does not reach: `cast[\ZZ32\](0)` still throws, because a numeral is not a `ZZ32` (`Specification/basic/expressions/literals.tex:132-141`). A name bound inside a clause's pattern, which the coercion desugarer produces and a program may write (`Leaf(i) => i`; the team's ungated `ProjectFortress/compiler_tests/patternMatching1.fss:37-43`), is still unbound on the compiled path, and walk refuses it too (rows 340, 498; `compile-ladder/rung-generic-runtime/probes/skeptic/pattern-bind.txt:6`, `:17`, `:27`). A named clause or a `catch` inside a `do … also` arm whose body then reads a captured variable still fails verification. A local in a task body takes `this`'s slot (row 497). A `catch` there also meets row 322's mechanism (`compile-ladder/rung-generic-runtime/probes/skeptic/clause-in-task.txt:33-34`, `:50`, `clause-in-task-split.txt:62`, `:95`, `try-in-arm.txt:41`).
  - Gated by `compiler_tests/TypecaseBindRungG`, `CastBindRungG`, `ArrowClauseBindRungG` (`andCondCombine`'s shape: a binding at an arrow over the function's own type parameter, nested), `WitnessIdentityRungG` and `library_tests/ClauseBindingRungB`.
- **A parallel task in a generic declaration is generic over its free static parameters** (2026-09-28, climb batch 6.5 rung G, `fd5cb4864`; rows 419, 420).
  - What changed: `CodeGen.delegate` names the task class with the task's free static parameters and writes its xlation data, `forFnExpr`'s device for a closure (rung Z's measured 13-line patch).
  - Row 420 was the same defect. The generic method's `||` operands are run as a task, and a one-parameter method with two task operands failed the same way (`compile-ladder/rung-generic-runtime/probes/row420-cause-before.txt`).
  - Gated by `compiler_tests/NatRtTask` and `NatRtMethBoth`, promoted from their `XXX` forms, the second with a third assertion for the cause.
- **A generic arm of a template dispatcher is called at the dispatcher's own static parameters** (2026-09-28, climb batch 6.5 rung G, `fd5cb4864`; `explorations/reviews/mie-probes/scope-call-site-dispatch.md` sections 2-4; rows 493 and 494).
  - What changed: `OverloadSet.generateCall` reads every declared generic arm with as many static parameters as the template dispatcher at the dispatcher's parameters by position, when the dispatcher's own static parameters are all of type kind; the arm's kinds are not checked (`OverloadSet.java:1342-1353`, the kind test at `:1350`). It tests the arm so read with a plain `instanceof` and calls it by name, and the loader sets both to the call site's arguments. This is the measured 43-line change without its probe switch.
  - What else it changes: an arm in the more-specific relation that is not the dispatcher's by position is now tested at the call's instantiation. For `f[\T\](x: T)` beside `f[\U\](x: Box[\U\])` reached through a generic caller, and for `grab[\Y\](t: Fixed[\Y\])` with `Fixed[\Y\] extends Tag[\Blue\]`, the compiled answer moved from the more specific arm to the less specific one (`compile-ladder/rung-generic-runtime/probes/skeptic/dispatch-pos.txt:6`, `:17`, `:38`, `:45`). `Specification/basic/overloading.tex:100-107` with `:136-138` gives the new answer, and `:173-175` and `:292-295` the old one; answer 9's narrow rule refuses both pairs once built (POSITIONS 2026-09-26, answer 9; row 499).
  - What it fixes: a generic arm that names its parameters differently (`compiler_tests/DispatchRenamedArmRungG`, `DispatchSwappedArmRungG`), and a `ZZ32` instantiation spelled at run time, on this path (`DispatchZZ32ArmRungG`).
  - Reach: it changes no class of the compiler library's five jars (the one class that differs, `cast`'s template, is the clause-binding fix's), and the 20 sized tests' verdicts, outputs and classes are identical (`compile-ladder/rung-generic-runtime/probes/library-jars.txt`, `compare-sized.txt`). Of the 43 generic-overload compiler tests, only the dispatcher templates of `Compiled12.invariantInference`, `invariantInference2` and `Compiled180` change, with every verdict and output the same (`compile-ladder/rung-generic-runtime/probes/compare-generic-overload.txt`).
  - Remainder: generic dotted methods (row 495; `compiler_tests/XXXDispatchMethodArmRungG`) and a dispatcher that is not a template (row 496) keep both defects.

Amendments to existing entries:

- "A size is carried at run time as a descriptor from `RTTIsize.of`, and a sized program loads, dispatches and runs compiled" (FACTS.md:112).
  - Replace "the exceptions, shared with types, are a parallel task (row 419) and a generic method that builds over both its object's static parameter and its own (row 420)" with "a parallel task too, since climb batch 6.5 rung G (rows 419, 420; row 420's cause was row 419's)".
  - In its "Open:" list, remove "the class loader's first-load race at more than one thread (row 417)", "a parallel task (row 419)" and "a generic method building over two parameters (row 420)".
- "The replacement for `SUM`'s and `PROD`'s catch-all, judged on both paths" (FACTS.md:62). After "so the compiled half waits on row 426 or a checker refinement of the witness branch (§ 7 check 3), before the switch-over", add: "Row 426 closed with row 351 in climb batch 6.5 rung G. The witness through the repaired `cast` answers each static argument's identity compiled (`compiler_tests/WitnessIdentityRungG`), and the one library's `ZZ32` and `RR64` branches pass a typed binding, `v: ZZ32 = 0` then `cast[\T\](v)`, whose value under walk is unchanged (`compile-ladder/rung-generic-runtime/probes/identity-walk-before.txt`, `identity-walk-after.txt`). The checker refinement was not needed. A compiled `SUM` end to end waits for the switch-over."

## The gap ledger

Rows closed, status "NEGATIVE-VERIFIED (at b797d8037), POSITIVE-VERIFIED (the fix)", with a note appended:

- **351**, append: "Fixed `fd5cb4864` by climb batch 6.5 rung G, at both sites.
  - `CodeGen.forTypecase` binds a named clause's value, cast to the clause's type, as a `VarCodeGen.LocalVar` of a nested `CodeGen` for the clause body, then disposes of it. `CodeGen.forTry` binds the catch name to `getValue` of the exception the same way (`bindAndGenerateClauseBody`, `CodeGen.java:2156-2164`).
  - Gated by `compiler_tests/TypecaseBindRungG`, `ArrowClauseBindRungG` (`andCondCombine`'s shape, a binding at `Gen[\E\] -> RelCondG[\E\]` over the function's own parameter, nested) and `CastBindRungG`, and by `library_tests/ClauseBindingRungB`, promoted from `XXXClauseBindingRungB`.
  - A clause name captured by a `fn`, read in task operands and read in a generic function agrees with walk at 1 and 4 threads (`compile-ladder/rung-generic-runtime/probes/clause-capture.txt`).
  - Still unbound: a name bound inside a clause's pattern, which the coercion desugarer produces and a program may write (`Leaf(i) => i`; the team's ungated `ProjectFortress/compiler_tests/patternMatching1.fss:37-43`), is still unbound on the compiled path, and walk refuses it too (row 340's note, row 498; `compile-ladder/rung-generic-runtime/probes/skeptic/pattern-bind.txt:6`, `:17`, `:27`).
  - Not reached: a named clause or a `catch` inside a `do … also` arm whose body then reads a captured variable still fails verification. A local in a task body takes `this`'s slot (row 497). A `catch` there also meets row 322's mechanism (`compile-ladder/rung-generic-runtime/probes/skeptic/clause-in-task.txt:33-34`, `:50`, `clause-in-task-split.txt:62`, `:95`, `try-in-arm.txt:41`)."
- **417**, append: "Fixed `fd5cb4864` by climb batch 6.5 rung G. `loadClass` runs under `getClassLoadingLock(name)`, the loader's own monitor, the lock of the JDK method it overrides.
  - Measured: `compiler_tests/FirstLoadThreadsRungG` fails 5 of 5 at four threads before and passes 5 of 5 after. `ZsThreadsT`, `ZsThreadsS`, `ZsThreads` and a 24-instantiation widening pass 5 of 5 at both counts (`compile-ladder/rung-generic-runtime/probes/threads-before.txt`, `threads-after.txt`, `threads-zs-after.txt`, `threads-24-after.txt`).
  - Gated at four threads as the fourteenth program of the gate's stage, at one thread in `testFast`.
  - The lock's cost is not measurable on the thirteen `atomic` programs (`probes/lock-cost.txt`).
  - Unchanged: a name whose load failed stays in `history`, and a later load of it returns null (`InstantiatingClassloader.java:189-193`), by reading."
- **419**, append: "Fixed `fd5cb4864` by climb batch 6.5 rung G: the measured patch as it stood, with the TO DO line it answers deleted. `compiler_tests/NatRtTask`, promoted from `XXXNatRtTask`. No class of the compiler library changes."
- **420**, append: "Fixed `fd5cb4864` by climb batch 6.5 rung G, by row 419's fix. The site was row 419's.
  - The method's `||` operands are run as a task, and the task class was not generic. The base's method template builds the second operand in a non-generic `task0` that names `U`.
  - A one-parameter method with two task operands fails the same way, and both parameters with no task operand pass (`compile-ladder/rung-generic-runtime/probes/MethOneParTask.fss`, `MethBothNoTask.fss`, `row420-cause-before.txt`).
  - `compiler_tests/NatRtMethBoth`, promoted, with a third assertion for the one-parameter shape."
- **426**, append: "Fixed `fd5cb4864` by climb batch 6.5 rung G. Its cause was row 351: the compiled `cast[\T\]` matched and then read its clause name as a missing top-level object (`compile-ladder/rung-generic-runtime/probes/cast-template-javap.txt`).
  - Its other failures pass a numeral, which on the compiled path is an `IntLiteral` and correctly not a `ZZ32` (`Specification/basic/expressions/literals.tex:132-141`, `typecase.tex:94-95`).
  - Answer 7's identity functions pass a typed binding in their `ZZ32` and `RR64` branches (`Library/FortressLibrary.fss:3126-3156`). Their walk values are identical at every leaf, and `FlatTowerRungF` passes.
  - The witness shape is gated compiled by `compiler_tests/WitnessIdentityRungG`, the judgement's § 7 check 3. A compiled `SUM` end to end waits for the switch-over."

Notes appended to open rows:

- **460**, append: "Climb batch 6.5 rung G (`fd5cb4864`): the compiled run reads the clause-binding form `rp:T =>` (row 351). The shorthand form's narrowing and the binding form `typecase x = e of` are unchanged."
- **159**, append: "Climb batch 6.5 rung G: the same rule refuses an α-renamed pair of top-level generic functions, `grab[\X\](t: Tag[\X\])` beside `grab[\Y\](t: Sub[\Y\])`, and the swapped `pair[\A,B\]` beside `pair[\B,A\]`. It accepts the same pair with one parameter name. `Specification/basic/overloading.tex:100-105` allows both, since the parameters differ only up to α-equivalence.
  - Compiled, all three run and give the specification's answers (`compiler_tests/DispatchRenamedArmRungG`, `DispatchSwappedArmRungG`, `DispatchZZ32ArmRungG`); under walk, `compile-ladder/rung-generic-runtime/probes/differential-after.txt:77`, `:113`.
  - The gated walk half is `ProjectFortress/tests/XXXDispatchRenamedArmWalkRungG.fss` and `XXXDispatchSwappedArmWalkRungG.fss`, expected failures since the judge's repair of climb batch 6.5; answer 9's walk rung (batch 7b's rung W) promotes them (`compile-ladder/climb-batch-6.5/judge-repair/walk-dispatch-xxx.txt`)."
- **340**, append: "Climb batch 6.5 rung G. The union-coercion `typecase` the coercion desugarer wraps around this row's shape has three defects on the compiled path: it binds its own name inside a one-element pattern, it tests one-element tuple types and it has no `else`. After rung G a clause's own name is stored, but the pattern-bound name is still read as a missing top-level object, the tests are still of one-element tuples, and the frame crash stands (`compile-ladder/rung-generic-runtime/probes/UnionCoerceBind.fss`, `union-coerce-after.txt:49`, `:56`, `:60`, `:67`)."

New rows (numbered provisionally by the rung; the numbers are final):

- **493**, in section 10, opened and closed:
  - claim: **a generic arm of a template dispatcher that names its static parameters differently from the dispatcher (renamed, or the same names in another order) dies compiled with `ClassCastException`**. The value-inference path casts the arm's result to its declared return type spelled with the arm's own parameter names, which the loader rewrites only by the dispatcher's map. `ScopeArmsLegal`'s `grab[\Y\](t: Sub[\Y\])` cast to an unrewritten `Marker⟦Y⟧`, and `ScopeAlpha2`'s `pair[\B,A\]` to `Marker⟦Blue,Red⟧`. Walk refuses both at declaration (row 159).
  - status: NEGATIVE-VERIFIED (at b797d8037), POSITIVE-VERIFIED (the fix).
  - class: implementation gap (code generation, dispatch).
  - spec citation: `Specification/basic/overloading.tex:100-107`, `:136-138`, `:262-276`; `Specification/basic/expressions/var-ref.tex:37-40`.
  - reproducer: `compiler_tests/DispatchRenamedArmRungG.fss`, `DispatchSwappedArmRungG.fss`; captures `compile-ladder/rung-generic-runtime/probes/junit-before.txt:71`, `:90`, `junit-promoted.txt`.
  - found by: `explorations/reviews/mie-probes/scope-call-site-dispatch.md` § 4 (2026-09-23); `explorations/reviews/batch-3-conformance.md` finding 1.
  - notes: "Fixed `fd5cb4864` by climb batch 6.5 rung G. The call-site change calls such an arm at the dispatcher's own static parameters, 43 lines of `OverloadSet.java`, the scope note's measured change without its switch. It covers template dispatchers of top-level functions. Home 1. The remainder is rows 495 and 496."
- **494**, in section 10, opened and closed for template dispatchers:
  - claim: **a `ZZ32` instantiation made at run time is spelled `fortress|CompilerBuiltin%ZZ32`, where static code spells `…runtimeValues|FZZ32`, so a generic arm dispatched at `ZZ32` through the value path dies with `ClassCastException`**: `IntSub` is not a `Sub⟦fortress|CompilerBuiltin%ZZ32⟧`.
  - status: NEGATIVE-VERIFIED (at b797d8037), POSITIVE-VERIFIED (the fix, on template dispatchers).
  - class: implementation gap (run time and dispatch).
  - spec citation: `Specification/basic/overloading.tex:262-276`.
  - reproducer: `compiler_tests/DispatchZZ32ArmRungG.fss`; capture `compile-ladder/rung-generic-runtime/probes/junit-before.txt:109`.
  - found by: the same.
  - notes: "Fixed `fd5cb4864` by climb batch 6.5 rung G for template dispatchers. The call-site change names the arm at the dispatcher's parameters, so the loader writes the call site's own spelling. Home 1. The two spellings remain, built from `RTTI.className()` in `RTHelpers.loadClosureClass` (`RTHelpers.java:174-175`) and `RTHelpers.getRTTIclass` (`:18-54`). Dotted methods (row 495) and a dispatcher that is not a template (row 496) still reach the first."
- **495**, in section 10, open:
  - claim: **generic dotted methods keep both dispatch defects of rows 493 and 494**. `object K` with `grab[\X\](t: Tag[\X\])` and `grab[\Y\](t: Sub[\Y\])` dies on `K.grab(b2)` with `ClassCastException` (`Marker⟦Y⟧`), and so does the swapped pair. The `ZZ32` pair dies on the run-time spelling.
  - status: NEGATIVE-VERIFIED.
  - class: implementation gap (code generation, dispatch).
  - spec citation: `Specification/basic/overloading.tex:100-107`, `:262-276`, as for row 493.
  - reproducer: `compiler_tests/XXXDispatchMethodArmRungG.fss` with `XXXDispatchMethodArmRungG.test` (run, `run_out_contains=REACHED`) and `DispatchMethodArmRungGLink.test` (link); probes `compile-ladder/rung-generic-runtime/probes/MethRenamed.fss`, `MethSwapped.fss`, `MethZZ32.fss`; captures `probes/junit-after.txt:114-118`, `differential-after.txt`.
  - found by: ours (climb batch 6.5 rung G).
  - notes: "Home 2: the specification settles it as for top-level functions. The dotted method's dispatcher template comes from `OverloadSet`'s generic-function-class path with the trait's parameters ahead of the method's (`scope-call-site-dispatch.md` § 3, 'The remainder'), which the call-site change does not reach. Walk cannot run these, because it infers no static argument for a method call (row 21)."
- **496**, in section 10, open:
  - claim: **a dispatcher that is not a template keeps both dispatch defects**. This is a generic declaration beside a plain one, legal since answer 9, reached with an argument whose static type is `Any`. `peek[\X\](t: Tag[\X\]): Any` beside `peek(a: Any): Any` dies on the `ZZ32` spelling (`PlainBesideZZ32`). `grab[\X\](t: Tag[\X\]): Marker[\X\]` beside `grab(a: Any): Any` dies casting to the unrewritten `Marker⟦X⟧` (`PlainBesideRet`).
  - status: NEGATIVE-VERIFIED.
  - class: implementation gap (dispatch) with an unwritten specification.
  - spec citation: none settles the run-time answer. `Specification/basic/overloading.tex:103-105` still forbids the pair, and answer 9 (POSITIONS.md:108) makes it legal without saying which declaration applies when the call site resolved to the plain one.
  - reproducer: `compile-ladder/rung-generic-runtime/probes/PlainBesideZZ32.fss`, `PlainBesideRet.fss`; captures `probes/differential-before.txt`, `differential-after.txt:335-365`.
  - found by: ours (climb batch 6.5 rung G; the scope note's `MieDispatchAny` and `MieDispatchZZ32`, there with double membership).
  - notes: "Home 3, because the specification is silent. Walk answers both ways: the plain declaration for `PlainBesideZZ32`, the generic arm (`Marker[Red]`) for `PlainBesideRet`. The candidates are the scope note's § 2: the generic arm is applicable only with the call site's static arguments, so none here and the plain declaration runs; or it is applicable for some instantiation read from the value, so it runs as the more specific. Answer 9's specification rung is where the text would say which. Either way a crash is wrong."

## The handover's state line

Climb batch 6.5 rung G (`fd5cb4864`): the compiled path's generics at run time.
- Fixed: the class loader's first load takes the JDK's class-loading lock (row 417), with no measurable cost; a parallel task in a generic declaration is generic (row 419, which also closes row 420); a generic arm of a template dispatcher is called at the dispatcher's own parameters (rows 493 and 494); a `typecase` or `catch` clause's name is bound (row 351, closing row 426); answer 7's identity functions pass values of type `T` through `cast`.
- Gated: 12 new or promoted compiled tests, and the gate's four-thread stage runs `FirstLoadThreadsRungG`.
- Open: the dispatch remainder, generic dotted methods (row 495, `XXXDispatchMethodArmRungG`) and a dispatcher that is not a template (row 496, the specification silent). From its skeptic: a local in a `do … also` arm takes the task's `this` slot (row 497, gated as an expected failure by the gather's `XXXTaskArmLocalSlot`), a name bound in a clause's pattern is unbound on both paths (row 498), and a generic arm not the dispatcher's by position answers at the call's instantiation until answer 9's rule refuses the pair (row 499).
- Unmoved: the checker count 75, the distance 626 (three class rows move by the library's line shift), the ladder's 85 files.

## For the gather

- **The gate's counts**: the compiler track +24 command lines, the library track +1, the four-thread stage 42 PASS.
- **The map**: `explorations/coordinator/map/README.md:120`'s "Blind" cell for `runtimeSystem/` names row 417, which the four-thread stage now guards.
- **Stale citations**: two test comments cite library lines that were already stale on the base and that rung G's 8 inserted lines move further: `library_tests/LineConcatRung5.fss:9`, `:18` and `library_tests/TimingRungT.fss:6`. Not re-anchored, since they are not G's files.
- **The distance classifier**: `explorations/coordinator/tools/distance/classify.py:24-32` assigns classes by hard-coded FortressLibrary line ranges, so any library edit above them moves class rows without moving an error, as G's did (`I1` +1, `G1` -2, `OT` +1).

## Rows and notes from the skeptic's recommendations (opened at the gather)

The skeptic's section 12 recommended five; each is opened here, in the ledger's column order, so that the ledger and this file agree.

- **497**, in section 10, open:
  - claim: **a local declared in a `do … also` arm takes local slot 0 of the task's `compute`, the slot of `this`, so any later read of a variable the arm captured fails verification**: `VerifyError: Bad type on operand stack`, the frame's `locals: { FZZ32 }`, for a plain `j: ZZ32 = 2` in an arm with no generics and no clause (`SkTaskLocalSlot`) and for a local read by a nested `also` (`SkTaskNestedPlain`, `SkTaskNested`). Since climb batch 6.5 rung G binds a clause's name as a local, a named `typecase` clause or a `catch` name in an arm meets it too (`SkClauseInTask`, `locals: { Wrap }`; `SkCatchInArm`). Walk is right at 1 and 4 threads.
  - status: NEGATIVE-VERIFIED.
  - class: implementation gap (code generation).
  - spec citation: `Specification/basic/expressions/also.tex:17-21`, `typecase.tex:88-91`, `try.tex:56-60`.
  - reproducer: `ProjectFortress/compiler_tests/XXXTaskArmLocalSlot.fss` with its two `.test` files (home 2); `compile-ladder/rung-generic-runtime/probes/skeptic/SkTaskLocalSlot.fss` (`task-local-slot.txt:5`, `:14`), `SkTaskNestedPlain.fss` and `SkTaskNested.fss` (`task-nested-plain.txt:6`, `:41`), `SkClauseInTask.fss` (`clause-in-task.txt:33-34`), `SkCatchInArm.fss` (`clause-in-task-split.txt:62`).
  - found by: climb batch 6.5 rung G's skeptic, 2026-09-28.
  - notes: "Cause: `CodeGen.generateTaskCompute` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4739-4763`) opens the method with `visitCode` (`:4742`) and never calls `mv.reserveSlot0()`, which `forFnExpr`'s `apply` does (`:3509`). The fix is `mv.reserveSlot0()` after `visitCode`, with the compiler library's jars compared, since a library task with a local would renumber. Home 2, written at the gather of climb batch 6.5 as the skeptic recommended, a link test and an `XXX` run test, since a run-time defect needs two `.test` files (FACTS, \"The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/` can express a compile-stage failure only, and a run-time defect needs two `.test` files\"): `ProjectFortress/compiler_tests/XXXTaskArmLocalSlot.fss` with `XXXTaskArmLocalSlot.test` (run, `run_out_contains=REACHED`) and `TaskArmLocalSlotLink.test` (link), `SkTaskLocalSlot`'s program asserting `12`. It shows 'Saw expected failure' on rung G's code and on the base's, and goes red, 'Did not see expected failure', under the fix (`compile-ladder/climb-batch-6.5/merged-tests/junit-g.txt`, with its driver `junit-g.sh`)."
- **498**, in section 10, open:
  - claim: **a name bound inside a `typecase` clause's pattern that a program writes, `Leaf(i) => i`, is unbound on both paths, before and after climb batch 6.5 rung G**: compiled, `NoClassDefFoundError: SkPatternBind$i`; walk, "undefined variable [i]". The checker accepts the program, and the pattern desugarer keeps the pattern (`ProjectFortress/src/com/sun/fortress/compiler/PatternMatchingDesugarer.scala:668-671`).
  - status: NEGATIVE-VERIFIED.
  - class: implementation gap (both paths), specification silent.
  - spec citation: silent: the chapter defers patterns to "the pattern matching proposal" (`Specification/basic/expressions/typecase.tex:15`).
  - reproducer: `compile-ladder/rung-generic-runtime/probes/skeptic/SkPatternBind.fss`, `pattern-bind.txt:6`, `:17`, `:27`.
  - found by: climb batch 6.5 rung G's skeptic, 2026-09-28.
  - notes: "Home 3, the specification being silent on patterns. The team's ungated `ProjectFortress/compiler_tests/patternMatching1.fss:37-43` has the shape (`Leaf(i) => i` at `:38`). The coercion desugarer's pattern-bound name is the same defect (row 340's note of climb batch 6.5 rung G)."
- **499**, in section 10, open:
  - claim: **until answer 9's narrow rule is built, the compiled checker accepts generic arms in the more-specific relation that do not agree position by position, and since climb batch 6.5 rung G the compiled dispatcher answers them at the call's instantiation, where it answered by value inference before**: `SkPosBox`, `f[\T\](x: T)` beside `f[\U\](x: Box[\U\])` reached through `viaT[\T\](x: T) = f(x)`, `box` → `any`; `SkPosFixed`, `grab[\X\](t: Tag[\X\])` beside `grab[\Y\](t: Fixed[\Y\])` with `Fixed[\Y\] extends Tag[\Blue\]`, `fixed` → `tag`; at both thread counts. Walk answers `SkPosBox`'s direct call with the less specific declaration where the compiled run answers `box`, and refuses `SkPosFixed` (row 159).
  - status: NEGATIVE-VERIFIED (the passages disagree).
  - class: design limit (the checker accepts what answer 9 refuses; dispatch).
  - spec citation: the chapter gives both answers: one instantiation fixed at the call, `Specification/basic/overloading.tex:100-107` with `:136-138`, gives the new one; each declaration's static parameters inferred before applicability and specificity, `:173-175` and `:292-295`, the old one.
  - reproducer: `compile-ladder/rung-generic-runtime/probes/skeptic/SkPosBox.fss`, `SkPosFixed.fss`, `dispatch-pos.txt:5-6`, `:17`, `:26-27`, `:38`, `:45`.
  - found by: climb batch 6.5 rung G's skeptic, 2026-09-28.
  - notes: "Home 3 until answer 9's checker rung refuses the pairs (POSITIONS 2026-09-26, answer 9), when it closes. The change's guard reads every declared generic arm with as many static parameters as the template dispatcher at the dispatcher's parameters by position, when the dispatcher's own static parameters are all of type kind; the arm's kinds are not checked (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1342-1353`, the kind test at `:1350`). No gated verdict moves (`compile-ladder/rung-generic-runtime/probes/compare-generic-overload.txt`)."
- **322**, append: "Climb batch 6.5 rung G's skeptic: `try … catch` in a `do … also` arm fails verification by this row's mechanism. The task's `this` sits on the operand stack across the arm's body, and the handler clears the stack: 'Inconsistent stackmap frames', on the base and rung trees alike, while walk prints `hit 6` (`compile-ladder/rung-generic-runtime/probes/skeptic/SkTryInArm.fss`, `try-in-arm.txt:6`, `:41`, `:74`). The general statement extends from `forAtomicBlock` to `forTry`."
- **340**, append: "Climb batch 6.5 rung G's skeptic: the same ASM stack-map failure, `Error trying to close method scope` from `ArrayIndexOutOfBoundsException` in `Frame.merge`, occurs in two more shapes. A `typecase` clause whose body has operands the analyzer runs as tasks (`v: Wrap => g(v) + h(v)`), named or not (`compile-ladder/rung-generic-runtime/probes/skeptic/SkClauseTaskOps.fss`, `SkTypecaseTaskOps.fss`; `clause-task-ops.txt:5`, `:26`, `:46`; `typecase-task-ops.txt:4`, `:17`, `:33`): both probes end in `else => 0` in a function declared `ZZ32` whose body is the `typecase`, this row's own coercion, and with that `else` answering `g(y)` or `g(Wrap(0))` each compiles and prints walk's answer, so in these probes the task operands are not a trigger of their own (corrected by the judge's repair of climb batch 6.5, where the note had said 'without a coercion'; `compile-ladder/climb-batch-6.5/judge-repair/task-ops-split.txt`). And, without a coercion, a named tuple clause spread into a two-parameter call (`SkTupleClauseSpread.fss`, `tuple-clause-spread.txt:4`, `:21`, `:41`). A plain local tuple spreads fine (`SkTupleSpread.fss`, `tuple-spread.txt`). The base and rung trees fail alike, and walk is right."
