# Skeptic's review of rung M, rung-compiled-missing-methods (climb batch 35b)

One launch of the skeptic worked this rung. Head judged: `f835e5463a`, the worker's last commit. The worker's `REPORT.md` and `record.md` were already on the branch (`6335bf0696`, `f835e5463a`), so the journal step wrote nothing. Verdict: **approved**, with one fix of the change and five corrections, none contested.

## What I checked, and what it showed

1. **Stages.** The section sets none (STAGE_BLIND). The diff's one path outside the test and record folders is `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, the code generator, which neither the count stage nor the distance stage runs; no Scala of the checker and nothing the build generates for it changed. No stage ran, and none was owed; the gate's tables on the merged tree are the record.
2. **Test first, from the worker's transcript.** Call `AQyVCm` at 17:52:23Z echoed the "Expected failure:" line before `junit.sh base`, on `5a59551554` with the tests uncommitted, before the first edit of `CodeGen.java` at 18:02:03Z (`VHXShk`): 'Tests run: 9,  Failures: 3', with the three `NoSuchMethodError` lines that `recordedFailure` quotes. The last edit of code was 18:13:20Z (`4BqZdR`, `forwardToPrincipal`'s argument count), built at 18:13:47Z with the library order (`JZt3ig`); the last run, `junit.sh last` at 19:02:17Z (`whq4t8`), printed 'OK (143 tests)'. Row 390's promoted test failed on the old code through `old-fortress.sh ... junit` at 19:02:06Z (`vN717Q`, its "Expected failure:" line echoed first): 'Tests run: 3,  Failures: 1'. `ant testOneLibrary` started after that build ('Caches ... kept'): '[junit] Tests run: 40, Failures: 0'. The order holds.
3. **The diff against the section and the forks.** Row 1053's part does what fork M1 says (`explorations/coordinator/CLIMB-BATCH-35.md`, "Forks the batch takes", 14): an arrowless setter call takes the setter's parameter type at the receiver's instance, and `evalArg`'s one-argument branch casts `self` below its trait. It read only a trait or object receiver; a receiver typed by a type variable kept the value's type and still died (finding 1, fixed). Row 815's part writes the overload method by `os.split(true)`, as the two other sites do (`CodeGen.java:7457`, `:8817` on the final tree), and fork M2's "the overload method written" names that way. The forwarder at the call's arrow is the worker's own device, listed as a deviation; I measured it running (program `SkSolidOutside` under `-XX:hashCode=0`, below).
4. **Precedent.** `git show 2fb7488717` adds `if (principalMember == null) return;` to `OverloadSet.generateAnOverloadDefinitionInner` (the team, 2012-05-09), and `git log -S'os.split(false)'` on `CodeGen.java` ends at `5a68404fdf` (2012-07-19): the worker's account of why no rewritten overload method was written holds. `setterParamType` copies `callTakesTupleBoxed`'s replacer (`CodeGen.java:7699-7726`); the bounds of my fix are read as `typeVariableMethodOwner` reads them.
5. **The tests.** Each file holds one comment line. The specification's sections cited exist and say what the comments say: `bindings.tex`, "Assignments"; `traits.tex`, "Method Declarations"; `overloading.tex`, "Principles of Overloading"; `conversions-coercions.tex`, "Coercion Resolution". `CoercionAnyOverloadRungC` keeps the suffix of its series (`tests/CoercionOverloadRungC.fss`, and its link test, which predates the rung) and its assertion's "row 390:" prefix; I left both, as the worker's decision 8 does.
6. **My programs**, below: fifteen programs over the setter's receivers and field types and the functional-method and coercion sets, at one and four threads for the setter programs.
7. **Homes.** Rows 1053, 815 and 390: home 1, in the rung's tests. The setter's other forms that the change repairs: home 1, assertions added to `VarFieldAssignedSubtypeRun` (correction 1). The type-variable receiver: home 1 with my fix. The checker's refusal of a narrower functional return: home 2, `compiler_tests/XXXComprisesFunctionalMethodNarrowedReturn`, and row 1127 in `record.md` (correction 2). `QQ`'s `isFinite`, which now passes `denominator(self)` and stops at `=/=`: row 994's claim covers it, its "seen at" list is not exhaustive, and a note does not fit the row ('does not fit ... the notes have -154 characters left', `ledger.py note 994 ... --check`).
8. **Ledger and siblings.** `ledger.py find` for `NoSuchMethodError`, `setter`, `dispatcher` and `emitted` over open rows: rows 594, 643, 1013 and 1098 die by other mechanisms (generic functional methods, an inherited generic method, a functional method as a value, the export check), and row 1113 is the checker's choice among setters. The sibling site of the setter's own repair, a receiver typed by a type variable, is finding 1.
9. **The report.** Its provenance lines' citations, opened with `sed -n`, say what they claim (`fixes-35.md:46-47`, `bindings.tex:60-61` and `:86-87`, `traits.tex:616-626`, `overloading.tex:302-311`, the `CodeGen.java` lines); after my fix they cite the final tree (correction 5). `grep -rn 'NoSuchMethodError' Specification --include=*.tex` prints only `changes.tex:4713` and `:4754`, rows 816 and 839: no sentence of the specification is made false. Section 6 says `record.md` gives the new text of `compiler.md:172` and `:174`; it did not, and now does (correction 3).
10. **Competing declarations.** `setterParamType`, `forwardToPrincipal` and `rewrittenOverloadsWritten` occur only in `CodeGen.java`; `XXXComprisesFunctionalMethodNarrowedReturn` occurs nowhere else; the declarations added to `VarFieldAssignedSubtypeRun` (`Box`, `Pair`, `AnyCell`, `Holder`, `HCell`, `lift`) are local to its component, and none is declared in the compiler's prelude (`grep -nw` over its four `.fsi` files prints nothing).
11. **Failure mode.** No loud failure becomes a quiet value. Where `setterParamType` finds no setter or two of differing types, and where `forwardToPrincipal` declines (no principal member, a generic one, another argument count, a primitive argument), the call keeps today's `NoSuchMethodError`. One shape I could not make: `OverloadRewriteVisitor` keeps one rewrite node per list of overloadings, with the type of the last call that put it (`compiler/OverloadRewriteVisitor.java:126-127`), so two calls of one set at two arrows that are both not the principal member's would leave one without its forwarder. No program of mine made two such calls in one compile, under six hash modes; such a call would die as before, not regress.

## Programs

Each ran under walk on the old code, and compiled on the old code, on the worker's head, and, after my fix, on the final code. Commands, from `tmp/rung-compiled-missing-methods/skeptic/` of the rung's tree (`W` that tree):

    /home/user/fortress-base43/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base43 $W/tmp/rung-compiled-missing-methods/skeptic/old-caches P.fss            # walk, old code
    /home/user/fortress-base43/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base43 $W/tmp/rung-compiled-missing-methods/skeptic/old-caches compile P.fss    # then run P
    FORTRESS_HOME=$W FORTRESS_CACHES=<a copy of $W/default_repository/caches> $W/bin/fortress compile P.fss    # then run P, new code

Walk's code is not changed by the rung. Every program below printed PASS under walk.

| program | construct | compiled, old code | compiled, worker's head | compiled, final code |
|---|---|---|---|---|
| `SkSetGeneric` | `b.x := High`, `object Box[\X\](var x: X)`, `b = Box[\T\](Low)` | 'NoSuchMethodError: ... FVoid SkSetGeneric$\=Box?SkSetGeneric\%T?.x(SkSetGeneric$High)' | PASS | PASS |
| `SkSetAny` | `c.a := k`, `var a: Any`, `k: ZZ32` | 'NoSuchMethodError: ... FVoid SkSetAny$Ca.a(com.sun.fortress.compiler.runtimeValues.FZZ32)' | PASS | PASS |
| `SkSetCompound` | `c.n += 2`, `var n: ZZ32` | PASS | PASS | PASS |
| `SkSetSelfInObj` | `self.t := High` in `Cell`'s own method | 'NoSuchMethodError: ... FVoid SkSetSelfInObj$Cell.t(SkSetSelfInObj$High)' | PASS | PASS |
| `SkSetTraitRecv` | `h.t := High`, `h: Holder`, a trait's explicit `setter t(v: T): ()` | 'NoSuchMethodError: ... FVoid SkSetTraitRecv$Holder.t(SkSetTraitRecv$High)' | PASS | PASS |
| `SkSetTuple` | `p.pr := (High, Low)`, `var pr: (T, T)` | 'NoSuchMethodError: ... FVoid SkSetTuple$P.pr(SkSetTuple$High, SkSetTuple$Low)' | PASS | PASS |
| `SkSetGenInside` | `self.x := v` in `Box[\X extends T\]` | PASS | PASS | PASS |
| `SkSetVarRecv` | `x.h := High` in `put[\X extends Holder\](x: X)` | 'NoSuchMethodError: ... FVoid SkSetVarRecv$HCell.h(SkSetVarRecv$High)' | the same | PASS |
| `SkFmRThenQ`, `SkFmQThenR` | `num(R)` and `num(q)` for `q: Q = R`, in both orders | 'NoSuchMethodError: ... FZZ32 SkFmRThenQ.\=num{...' | PASS | PASS |
| `SkSolidOutside` | `width(b)` for `b: Brick` beside `total`'s calls on `self` | 'NoSuchMethodError: ... FZZ32 SkSolidOutside.\=width{...' | PASS | PASS |
| `SkCoerceTwo` | `p(NarrowOf(1))` and `p(WideOf(2))`, row 390's set | 'NoSuchMethodError: ... SkCoerceTwo.\=p{...' | PASS, 'u= p(Any)  v= p(Wide)' | PASS |
| `SkFmTwoObjs` | `num(R)`, `num(S)`, `q.both`, `trait Q comprises { R, S }` | PASS (no call rewritten) | PASS | PASS |
| `SkFmNarrow` | `twin(self): R` in `R` beside `abstract twin(self): Q` | refused: 'the return type of (Q & {R})->Q ... should be a subtype of the return type of R->R' | the same | not rerun (checker unchanged) |
| `SkOneQQ` (one library) | `q.isFinite` for `q: QQ = 3/4` | 'NoSuchMethodError: ... FZZ fortress.FortressLibrary.\=denominator{...' | 'NoClassDefFoundError: FortressLibrary' at `fortress.FortressLibrary?$\=NE?...` from `QQ$DefaultTraitMethods.isFinite` (`FortressLibrary.fss:641`), row 994 | not rerun |

The setter programs ran at `FORTRESS_THREADS=1` and `=4`, with the same lines at both. `SkSolidOutside` compiled on the worker's head under `-XX:+UnlockExperimentalVMOptions -XX:hashCode=N` for N from 0 to 5: under 0 the call named `\=width{...}(SkSolidOutside$Brick)`, the forwarder was written beside the method at `(Solid)`, and the run printed 'x= 1  y= 21  z= 20' and PASS; under 1 to 5 the call named `(Solid)`. The one-library runs used a copy of the worker's `ant testOneLibrary` caches for the new code and of its old-code compile of the fourteen components for the old.

## Fix and corrections

**Finding 1, a defect of the change: a setter's call on a receiver typed by a type variable kept the value's type.** In `lift[\X extends Holder\](x: X): () = do x.h := High end`, the receiver's type is `X`, a `VarType`, and the worker's condition took only a `TraitType`, so the call still named `HCell.h(High)`. Fix, `35116d1ffb` ("Skeptic's fix: ..."): `CodeGen.setterParamType` takes a `Type`, and for a type variable reads its bounds as `typeVariableMethodOwner` does (`typeAnalyzer.env().staticParam`, `traitConjuncts`), taking their one setter's parameter type (`CodeGen.java:7521-7526`, `:7728-7775`). Ways listed: this; the call given its arrow in `DesugaringVisitor.mangleLhs`, outside the section's files and in a phase walk runs; the receiver cast to its bound and the bound's setter called, as for a generic method, which changes the call's owner as well as its domain. Settled by fork M1: "An assignment to an object's `var` field from outside calls the setter at the field's declared type" (`explorations/coordinator/CLIMB-BATCH-35.md`, "Forks the batch takes", 14). Test: `VarFieldAssignedSubtypeRun` gains `lift[\HCell\](he)` and its assertion.

    $ echo "Expected failure: VarFieldAssignedSubtypeRun.test red on the worker's code, its run after REACHED dying at lift[\HCell\](he), 'NoSuchMethodError: ... FVoid VarFieldAssignedSubtypeRun$HCell.h(VarFieldAssignedSubtypeRun$High)'; VarFieldAssignedSubtypeRunLink.test green"
    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skvar ProjectFortress/compiler_tests VarFieldAssignedSubtypeRunLink.test VarFieldAssignedSubtypeRun.test    # 2026-11-23T19:49:59Z, code of f835e5463a
    . run ProjectFortress/compiler_tests/VarFieldAssignedSubtypeRun (496ms) REACHED
    Caused by: java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FVoid VarFieldAssignedSubtypeRun$HCell.h(VarFieldAssignedSubtypeRun$High)'
    Tests run: 3,  Failures: 1,  Errors: 0

Built with `ant compileAll` and the library order ('BUILD SUCCESSFUL', five jars), then the rung's tests and the compiler track's tests whose names hold field, setter, getter, functionalmethod or comprises, in one JVM:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfix ProjectFortress/compiler_tests CoercionAnyOverloadRungCLink.test CoercionAnyOverloadRungC.test XXXComprisesFunctionalMethodNarrowedReturn.test <94 .test files>    # 2026-11-23T19:51:45Z
    . run ProjectFortress/compiler_tests/VarFieldAssignedSubtypeRun (590ms) REACHED
    PASS
    OK (145 tests)

and the onelibrary track on the final code, `35116d1ffb`:

    $ ant testOneLibrary    # started 2026-11-23T19:53:34Z
    [junit] Tests run: 40, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 185.059 sec
    BUILD SUCCESSFUL

No whole suite: the fix is in the code generator, whose tracks the gate runs (`tests-running.md`, "When to run a whole suite").

**Correction 1 (`03871d0bdb`): the setter's other forms that the change repairs, asserted.** `VarFieldAssignedSubtypeRun` also assigns a narrower value to a field at a static parameter's instance, to a tuple field, to a field at `Any`, through a trait's explicit setter on a value of the trait, and to `self`'s field in the object's own method: each died on the old code (the table above) and runs on the change. Home 1 (`tests-writing.md`, "How a defect is recorded", 1). Through the harness on the old code the test stops at its first form:

    $ echo "Expected failure: VarFieldAssignedSubtypeRun.test red on the old code, its run after REACHED dying 'NoSuchMethodError: ... FVoid VarFieldAssignedSubtypeRun$Cell.t(VarFieldAssignedSubtypeRun$High)'; VarFieldAssignedSubtypeRunLink.test green; XXXComprisesFunctionalMethodNarrowedReturn.test green, its compile refused 'should be a subtype of the'"
    $ cd ProjectFortress && ../explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base43 <tree>/tmp/rung-compiled-missing-methods/skeptic/old-caches junit compiler_tests/VarFieldAssignedSubtypeRunLink.test compiler_tests/VarFieldAssignedSubtypeRun.test compiler_tests/XXXComprisesFunctionalMethodNarrowedReturn.test    # 2026-11-23T19:45:32Z, base build 0a83a70498
    . run compiler_tests/VarFieldAssignedSubtypeRun (282ms) REACHED
    Caused by: java.lang.NoSuchMethodError: 'com.sun.fortress.compiler.runtimeValues.FVoid VarFieldAssignedSubtypeRun$Cell.t(VarFieldAssignedSubtypeRun$High)'
    Tests run: 4,  Failures: 1,  Errors: 0

and on the worker's code, with the rung's other run tests, before my fix: `junit.sh skhead` at 19:45:45Z, 'OK (13 tests)'.

**Correction 2 (`6998b294aa`, row in `3b93382b30`): the checker's refusal of a comprised object's narrower functional return.** `SkFmNarrow`, beside row 815's pair: `object R(n: ZZ32) extends Q` with `twin(self): R` beside `abstract twin(self): Q` in `trait Q comprises { R }`. Walk runs it; the checker refuses it on the base and on the change alike. By the Subtype Rule (`Specification/advanced/overloading.tex`, "Subtype Rule") `R`'s parameter type is strictly below `Q`'s and `R` is below `Q`, so the pair is valid; the checker reads `Q`'s self as `Q & {R}`, one domain with `R`'s, and checks the return types both ways (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:533-534`), as row 1094 for a self-typed trait's dotted methods. Home 2: `compiler_tests/XXXComprisesFunctionalMethodNarrowedReturn`, with row 1127 in `record.md`. Through the harness: 'Saw expected failure' on the old code (above) and on the head (`skhead`); with `R`'s `twin` written at `Q` for one run, then restored, red:

    $ echo "Expected: XXXComprisesFunctionalMethodNarrowedReturn.test red, its program (R's twin at the trait's return type, for this run only) compiling clean"
    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skred ProjectFortress/compiler_tests XXXComprisesFunctionalMethodNarrowedReturn.test    # 2026-11-23T19:46:01Z
     Saw failure, but did not satisfy compile_err_contains; expected
    1) ProjectFortress/compiler_tests/XXXComprisesFunctionalMethodNarrowedReturn(...)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

**Correction 3 (`3b93382b30`): the skill's new text.** `REPORT.md` section 6 says `record.md` gives the new text of `.claude/skills/fortress-repo/references/compiler.md:172` and `:174`; it gave none. `record.md`, "The skill", now gives the list at `:171-174` with only row 839's item.

**Correction 4 (`3b93382b30`, `70b4d1c9e4`): record.md's finding 1** names the forms correction 1 added and the type-variable receiver of my fix.

**Correction 5 (`70b4d1c9e4`): citations at the final tree.** My fix moves every `CodeGen.java` line after `setterParamType` sixteen lines down. The report's provenance lines and `record.md`'s citations now cite the final tree (`:7521-7526`, `:7728-7775`, `:8239`, `:8255`, `:8707-8729`, `:8735-8771`, `:8739-8771`, `:8817`); the report's sections keep the lines of `7cf79900c2`, as a sentence under the provenance lines says.

## Where I differ from the worker

- Decision 2 reads the setter by its shape on "the receiver type"; it left out a receiver typed by a type variable, which my fix adds by the same shape over the variable's bounds.
- Section 6's last sentence, that `record.md` gives the skill's new text: it did not (correction 3).
- Nothing else. Decisions 3 to 7 hold on my programs, the forwarder among them.

## Points to report

- Each fix as made, by file and member: the worker's (`CodeGen.forMethodInvocation`, `setterParamType`, `for_RewriteFnOverloadDecl`, `forwardToPrincipal`; the overload method written by `OverloadSet.generateAnOverloadDefinition` from `for_RewriteFnOverloadDecl`, `CodeGen.java:8725`), and mine: `CodeGen.setterParamType`'s branch for a type variable (`CodeGen.java:7737-7753`).
- The two expected failures promoted, and row 390's beyond the section (the worker's).
- The onelibrary track on the final code: 'Tests run: 40, Failures: 0', `35116d1ffb`.
- The files edited, for STAGE_BLIND: `CodeGen.java` and `compiler_tests/` files of the section; beyond the files named, row 390's test (the worker's) and `compiler_tests/XXXComprisesFunctionalMethodNarrowedReturn.{fss,test}`, the home of a checker defect that the rung does not repair.

## Verdict

Approved. The change is right with my fix and corrections; none is contested. The count and distance tables: none, by the section. Head after: the commit of this file.
