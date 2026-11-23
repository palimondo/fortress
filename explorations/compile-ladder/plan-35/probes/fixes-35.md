<!-- The probes of climb batch 35's planner, 2026-11-23, for the record `coordinator/CLIMB-BATCH-35.md`, the housekeeping batch of P-180: each defect that the record takes, reproduced on the base build `295c215c2c` through the harness, walk and compiled; two marked hacks that size a fix (the override modifier let through the code generator, and the logical equivalence of two booleans declared in the one library, with microGPT's quick pair run beside it); and the checks that moved four entries of the inventory out of the batch. -->

# Climb batch 35's probes: the fixes, reproduced on the base

Run 2026-11-23 between 09:10 and 09:25 UTC, in a worktree of the planner's own, `/home/user/fortress-p35`, seeded from the base build `/home/user/fortress-base42` at `295c215c2c` and removed after. The machine: 4 CPUs, Intel Xeon @ 2.30 GHz, JDK 25.0.4.1, the harness at `FORTRESS_THREADS=4`. The programs are in `programs/` beside this note: `programs/tests/` ran under walk through `harness-one.sh`, `programs/compiler_tests/` against the compiler's prelude through `junit.sh` with `ONE_JVM=1`. A walk program here is the plain-named copy of the row's `XXX` test where one exists, so that it fails as the promoted test will; a compiled one has the prefix `P35`, which a rung drops. The inventory that this batch works from is `skill-workarounds.md`, beside this note.

## 1. Under walk, on the base

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/RadixPointLeadingZerosWalk.fss \
      ProjectFortress/tests/SubscriptThenSuperscriptWalk.fss ProjectFortress/tests/TopLevelTupleBindingOnceWalk.fss \
      ProjectFortress/tests/ExitOutOfAtomicWalk.fss ProjectFortress/tests/NumeralBesideTypeParameterWalk.fss \
      ProjectFortress/tests/GenericMethodOverloadArity.fss ProjectFortress/tests/NumeralTypeComprisedWalk.fss ProjectFortress/tests/NumeralTypeComprisedWalk.test ...

`# harness-one 2026-11-23T09:11:47Z; tree 295c215c2c; nproc=4; ... cache empty`, then `Tests run: 8,  Failures: 8,  Errors: 0`. Each, by its row:

- **Row 960,** `RadixPointLeadingZerosWalk`: 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section "Literals": 00.5 has three digits'.
- **Row 1,** `SubscriptThenSuperscriptWalk`: 'FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript'. With one index, a direct run of `P35SubscriptOneIndexWalk.fss` prints `x[5]^2 = 36` for `(x[5])^2`, then stops at the bare `x[5]^2`: 'Failed to find any matching overload, args = (), overload = { ... }'.
- **Row 1026,** `TopLevelTupleBindingOnceWalk`: 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once'.
- **Row 1039,** `ExitOutOfAtomicWalk`: 'FAIL: a ZZ32: 0 =/= a ZZ32: 7; writes within a block that an exit leaves are retained'.
- **Row 1017,** `NumeralBesideTypeParameterWalk`: 'FAIL: J7/0:generic =/= J4/0:nn32'.
- **Row 1057,** `GenericMethodOverloadArity`: 'Cannot find definition for method tk given receiver Two'.
- **Row 981,** `NumeralTypeComprisedWalk` with its `.test`: 'REACHED: a numeral type is in a comprises clause', then 'Missing expected refusal at load'.
- **Row 1044,** a plain copy of `XXXGenericBesidePlainObjectNoReturnTypeWalk` with its `.test` (it overwrote, in the scratch tree only, the team-plain test of the same name, restored after): 'two', then 'Missing expected refusal at load'. Not taken (section 5).

Two more, each in a call of its own:

- **Row 1058,** `GenericBesidePlainTupleReturnWalk`, run as `harness-one.sh $PWD/tmp/h3 ...`: refused at load, 'Overloading of pt(a:Dot):(Dot, FortressLibrary.ZZ32) ... and pt[\T extends FortressLibrary.Number\](a:T):(T, FortressLibrary.ZZ32) ...' ('fails the Return Type Rule'), `Tests run: 1,  Failures: 1`.
- **Row 184,** `BooleanEquivalenceWalk`, `t ≡ t` and `t EQV f` for `t: Boolean = true`, `f: Boolean = false`: '** bug! Expect all oprefs to be top level EQV', an `InterpreterBug`, `Tests run: 1,  Failures: 1`.

A program met on the way, already a row: an untyped `x = [1 2 3 4 5 6 7]` in a block stops, 'Can't infer element type for array construction' (row 49); the programs bind `x: ZZ32[7]`.

## 2. Compiled, against the prelude, on the base

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh p35 ProjectFortress/compiler_tests P35*.test

`# junit.sh p35 2026-11-23T09:13:14Z; nproc 4; ... FORTRESS_THREADS=4; tree 295c215c2c`, then `Tests run: 25,  Failures: 15,  Errors: 0`. By row:

- **Row 960,** `P35RadixPointLeadingZerosCompiled`, a `value object Digits` whose coercion over `RadixPointNumeral[\n, m, r, v\]` answers `n`: links, and the run fails 'FAIL:  2 =/= 3; literals.tex, section "Literals": 00.5 has three digits'. The compiled path reads the same node as walk.
- **Row 1,** `P35SubscriptThenSuperscriptCompiled`: passes, `m[3,7]^2` is 1075369 and `m[7]^2` 11449. The compiled path is right.
- **Rows 573 and 1038,** the plain copies of the three `XXX` run tests: `P35FunctionalMethodOverloadSelfLast`, 'ClassCastException: class ...$C cannot be cast to class ...$N1'; `P35FunctionalMethodCoverSelfSecond`, '...$Pq cannot be cast to class ...$Ka'; `P35FunctionalMethodSelfSecondReceiverTested`, 'FAIL:  3 =/= 1; mark(1, Pq): only the inherited declaration applies, though the receiver is a K'.
- **Row 650,** `P35OverrideModifierCodeGeneration`: 'CompilerError: ... Don't know how to compile this kind of FnDecl. node = f(self:B,other:Number):String'.
- **Row 653,** `P35OverrideNothingCompiled`, walk's `OverrideNothingWalk` program under `typecheck` with `typecheck_err_contains=override`: the checker accepts it, 'Must satisfy typecheck_err_contains'.
- **Row 1039,** `P35ExitOutOfAtomicCompiled`: 'FAIL:  0 =/= 7; atomic.tex, section "Atomic Expressions": writes within a block that an exit leaves are retained'.
- **Row 1017,** `P35NumeralBesideTypeParameterCompiled`: 'FAIL:  generic =/= nn32'.
- **Row 964,** `P35TypecasePatternUntypedBinder`: 'java.lang.RuntimeException: typcase match failure!'. **Row 963,** `P35NumeralTypecaseSelector`: 'The typecase clause, ZZ32, is unreachable.' Neither taken (section 5).
- **Row 1053,** `P35VarFieldAssignedSubtypeRun`: 'NoSuchMethodError: ... FVoid P35VarFieldAssignedSubtypeRun$Cell.t(P35VarFieldAssignedSubtypeRun$High)'.
- **Row 815,** `P35FunctionalMethodComprisedObject`: 'NoSuchMethodError: ... FZZ32 P35FunctionalMethodComprisedObject.\=num{...}'.
- **Row 184,** `P35BooleanEquivalenceCompiled`, with the prelude's one-message `assert`: `OK (2 tests)`, 'PASS'. The prelude declares `opr EQV(self, other:Boolean)` and `opr NEQV` in `Boolean` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:465-466`); the one library declares neither, only `opr <->` (`Library/FortressLibrary.fsi:2792`). So the compiled path runs `≡` today and loses it at the switch-over.

## 3. The override modifier let through (PROBE 35 HACK, not kept)

One edit, `Modifiers.Override` added to `CodeGen.fnDeclCompilableModifiers` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3381-3383`), then `ant compileAll` and the library order, `BUILD SUCCESSFUL` and five jars. `P35OverrideModifierCodeGeneration` then links, and its run fails as the object's class loads:

    . run ProjectFortress/compiler_tests/P35OverrideModifierCodeGeneration (256ms) java.lang.ClassFormatError: Duplicate method name "f?0" with signature "(Lfortress.CompilerBuiltin$Number;)Lfortress.CompilerBuiltin$String;"
    Exception in thread "main" java.lang.NoClassDefFoundError: P35OverrideModifierCodeGeneration$B

So row 650's fix is more than the modifier list: the class of `B` gets `f?0` twice, its own `override f(self, other: Number)` and a second method of the same name for the pair with `A`'s `f(self, other: ZZ32)`, which the override hides by the traits chapter's rule. The checker already reads that hiding (`STypesUtil.providedAndOverridden`, `scala_src/useful/STypesUtil.scala:1698`, the declarations that an `override` keeps from being inherited); the code generator gathers an object's inherited methods through `STypesUtil`'s other tables (`CodeGen.java:1096`, `allMethodsNotReplaced`; `:1287`, `properlyInheritedMethodsNotIdenticallyCovered`). Walk prints `f PASS` and `g PASS` (row 650). The edit was reverted.

## 4. The logical equivalence of two booleans in the one library (PROBE 35 HACK, not kept)

One line in each of `Library/FortressLibrary.fsi` and `.fss`, beside `opr <->`: `opr ≡(a: Boolean, b:Boolean):Boolean`, its body `a=b`.

- `BooleanEquivalenceWalk` passes: 'PASS', ` OK (time = 7046ms)`.
- `P35EqvObjectWalk`, row 184's own program (`a ≡ b` for two `Pt(1)` objects of a program's `object Pt(x: ZZ32)`), stops with a dispatch error in place of the `InterpreterBug`: 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt'.
- microGPT's quick pair, `explorations/coordinator/tools/mg-run.sh tmp/mg-eqv eqv-hack`: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', `rc=0 secs=41`, and the same, `rc=0 secs=34`. The model's components declare no `≡`. The APL experiments' `explorations/apl/base/AplCore.fss:207-224` declares seven, over `RR64`, `Vector` and `Matrix`; with the library's one they form one overload set, whose domains exclude the library's, `Boolean` being a value object (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:184`). No gated program imports `AplCore`.

The edit was reverted.

## 5. What the checks moved

- **Row 964** (the inventory's a79): the clause `(x, y: ZZ32) =>` reads `x` as a binder over any element. Whether a bare name in a tuple arm is a binder or a type is review-queue item 592 (fork D1 of climb batch 33, row 1064, `CONTESTED`): under its other way 1b, the clause is refused, 'x is undefined', and written `(x: Any, y: ZZ32)`. So the fix needs that answer first. Group (b).
- **Row 963** (a80): the selector's default moves the pinned span of the team's `compiler_tests/XXX5r.test`, and makes the team's `XXXPatternMatchingc.test`'s `typecase (3, 4) of (x, y: ZZ32)` reachable, which then meets row 964 (item 462). It lands only with row 964. Group (b), beside item 592.
- **Row 1044** (a12): walk has no type for a body without a written return type. Refusing such a pair at an object type refuses the valid ones too, as walk does at a trait type (row 785); loading it loads the invalid ones. Which is item 564's question, and the way out of both is a type for the body, P-12's step. Group (b).
- **Row 1017** (a54) reproduces on both paths, and needs no decision, but is not small: both paths' rule reaches every numeral at a generic declaration (the row's note), so the fix needs a count of the library's and the tests' calls whose choice changes. It stays in group (a), for a later batch.

## 6. The disk

`df -P /home/user` at 09:03 UTC, before the probe tree: 12,573,244 blocks of 1,024 bytes available, 11.99 GiB; with the probe tree, 12,231,500. The base build is 330 MB; `/home/user/fortress-transcripts-blinded`, the transcript backup's worktree, 5.0 GB.

## 7. For the ledger

- Row 960: a note, the compiled reproduction of section 2.
- Row 650: a note, the second wall of section 3.
- Row 184: its notes have 13 characters left of 700, so the facts of sections 2 and 4 (the prelude's `EQV`, the compiled pass, the specification's `opr ≡` in `Specification/basic-lib/booleans.tex:252-263`, where the row's citation reads "silent") go to the rung that closes it, which rewrites the row.
