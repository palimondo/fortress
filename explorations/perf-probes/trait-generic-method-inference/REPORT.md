<!-- Probe of 2026-10-17: the ways to make walk instantiate a generic dotted method that a trait declares by the checker's bound rules (ledger row 766), and the most direct one built and measured. Worktree `/home/user/fortress-probe-row766`, branch `wip/probe-row766`, commit `814c1300c` from main `5dd54b64b`; the patch is `way-a.patch` beside this report. Not landed, not pushed. The harness refused the worker a report file; this is its returned text, written here by the coordinator. -->

# A trait's generic dotted method under walk (row 766): a probe

## In short
- **Reproduced on the current tree** (`5dd54b64b`):
  - `Maker.wrap(z, w)` gives `Box[\AnyIntegral\]`, and the `ZZ32` is not converted.
  - `Over.same(z, w)`, beside an overload, gives `[3:ZZ32,4:ZZ64]`.
  - `Maker.make()` gives `Empty[\BOTTOM\]`.
  - The compiled path gives `Box[ZZ64]`, `[ZZ64,ZZ64]` and `Empty[Number]`.
- **Cause, traced.** Walk reads a trait method's bounds and coercion targets in the trait's member environment, which has no parent.
  - A bound such as `Number` cannot be evaluated there, so the parameter ends at `BottomType`.
  - The coercion lookup throws `** bug! This should have been an environment with a Top Level`.
  - The inference with coercion swallows the throw and falls back to unification: the join of the run-time types, with no argument converted.
- **Built: way A.** The inference reads a trait's method's bounds and coercions in the trait's method environment. The method's instances already evaluate their parameter types there. The patch is +27 −4 lines in two walk files: `way-a.patch` (commit `814c1300c`). It gives every value the checker gives, and the compiled values did not move.
- **Tests.**
  - The 13 listed tests pass.
  - The tests of rows 766 and 765 are promoted from `XXX`: red on the base code, green on the patch.
  - `ant testSystem` on the patch: 649 tests, 0 failures.
- **Row 765 is repaired too.** An inherited generic functional method beside an object's own plain one is now chosen where only it fits.

## 1. Setup
- **Worktree.** Seeded with `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base17 /home/user/fortress-probe-row766 wip/probe-row766 5dd54b64b`. The script warned that the copied build was the base's.
- **Build.** `ant compileAll`: `BUILD SUCCESSFUL`, 40 s, "Caches ... started again, empty". Then the library order: exit 0, five jars.
- **Machine.** 4 CPUs, Intel Xeon at 2.10 GHz, OpenJDK 25.0.4.1.
- **Threads.** Direct walk runs used `FORTRESS_THREADS=1`; the harness and the suite force 4. One JVM command ran at a time.
- **Probe programs.** They are scratch. They declare:
  - the gated test's methods (section 6);
  - `wrap` on a `ZZ32` and an `RR64`;
  - the same methods in an object, and as top-level functions;
  - a trait's `pick[\K extends Shape\](x: K)`.
- **How values were printed.** Walk prints each object, for example `Box[\ZZ64\]`. The compiled program sorts each value with a `typecase` and prints a label such as `Box[ZZ64]`.

## 2. The cause, at `5dd54b64b`
All paths below are under `ProjectFortress/src/com/sun/fortress/interpreter/`.

- **How a trait's method is built.**
  - A trait's generic method is `new GenericMethod(containing, methodEnvironment, x, definer, true)` (`evaluator/BuildTraitEnvironment.java:42-44`).
  - Its own environment (`within`) is the trait's member environment, `declaredMembersOf = new BetterEnv(at)` (`evaluator/types/FTypeTrait.java:45-48`, `:96-104`). That environment has no parent, and its `getTopLevel()` throws `bug("This should have been an environment with a Top Level")` (`env/BetterEnv.java:338-340`).
  - Its second field, `evaluationEnv`, is the trait's method environment, `interior.extend()` (`FTypeTrait.java:81-86`). A generic trait's instance binds its static parameters there (`FTypeGeneric.java:204-206`).
- **How an object's method is built.** It gets the object's method environment in both fields (`BuildObjectEnvironment.java:39-40`, `FTypeObject.java:103`). This is why the same method declared in the object is right.
- **Where instances read their types.** In `evaluationEnv`: `GenericMethod.java:69` and `TraitMethod.getEvalEnv`, `TraitMethod.java:29-31`.
- **What batch 17 passes.** The call path passes `gm.evaluationEnv` as the inference environment (`DottedMethodApplication.java:177-180`).
- **Where the inference reads instead.** In `appliedThing.getWithin()`, the member environment:
  - the bounds, `EvaluatorBase.java:557`;
  - the coercion targets, through `narrowest`, `:634-635` and `:639-640`;
  - `boundAtInstances`, `:491`.
- **Measured with a temporary trace** (removed after the run).
  - Every `wrap`, `same` and `gwrap` call failed in `inferWithCoercion`, on `[Int, Long]` and `[Int, FloatLiteral]`, with `InterpreterBug ** bug! This should have been an environment with a Top Level`.
  - The throw comes from `Coercions.coercionTargets` (`values/Coercions.java:209`). `inferWithCoercion` returns null (`EvaluatorBase.java:527-532`), and `inferByUnification` then joins the run-time types.
  - `make` takes another route. Its bound fails to evaluate, so `T` is put in `rechecks`, and `instanceOf` leaves it at `BottomType` (`:374-379`).

## 3. The ways (not chosen among)
- **A. Read the bounds where the trait declares them** (built). Bounds and coercion targets are read in the environment where the declaration's types are evaluated, as for a top-level generic function. The change is in walk only.
- **A2. The same, through the environment that the call passes.** For a dotted call this gives the same values. But each caller passes its own environment: a generic functional method passes its self type's environment (`EvaluatorBase.java:553`), and `OverloadedFunction.inferenceEnv` passes `getWithin()` (`:2149-2152`).
- **B. Read them at the call**, in the caller's lexical environment, which would have to be carried into `instanceFor`. A bound that names the trait's own static parameter (`T extends S`) would not resolve there, nor would a type that the caller does not import. The checker reads bounds at the declaration.
- **C. Refuse loudly, as the base before batch 17 did**, wherever the member environment cannot read a bound or a coercion. This keeps P-48 by stopping, but gives none of the checker's values. Which of batch 17's working calls it would stop again is not measured.
- **D. Give the trait's method the method environment as its own environment** (as `BuildObjectEnvironment` does for an object), or give the member environment a parent. This reaches every reader of `getWithin()`: the overload comparisons (`OverloadedFunction.java:1031-1032`, `:1147`, `:1340`) and member lookup. The team kept the two apart: "not yet, it changes overloading semantics" (`GenericMethod.java:91-92`).
- **E. Mend only the coercion lookup**: skip an environment that has no top level. Read from the trace, not built. It repairs `wrap` and `same`, but `make` and `gmake` keep `BottomType` (against P-48).
- **F. Re-make inherited methods in the inheriting object's environment.** Bounds would then resolve in the object's scope. That is wrong for a trait in another component, and for a bound that names a generic trait's parameter.
- **G. The language's own forms, with no change to walk.** Write the static argument: `Maker.wrap[\ZZ64\](z, w)` gives `Box[\ZZ64\] 3:ZZ64` (measured). Or declare the method in the object (measured right). These are workarounds for a program.
- **H. Carry the checker's static arguments into walk's tree.** Not available before the switch-over: walk turns the checker off.

## 4. The patch (way A)
The diff is `way-a.patch`, beside this report (`git apply` applies it to `main` at `5dd54b64b` or later, and the two tests it renames are its own).

- **New accessor.** `GenericMethod.getTypeEnv()` returns `evaluationEnv` when the method is a trait's, and `getWithin()` otherwise.
- **New helper.** `EvaluatorBase.declarationEnv(g)` calls `getTypeEnv()` for a `GenericMethod`, and `getWithin()` for any other generic.
- **Where it is used.** The four reads listed in section 2.
- **What stays the same.** Functions, constructors and an object's own methods read the same environment as before.

Two lines were measured one at a time, each on its own build:
- **The `:491` line is needed.** Without it, a trait's `pair[\A extends Number, B extends Box[\A\]\]()` still gives `Empty[\BOTTOM\]`, as on the base. With it, it gives `Empty[\Box[\Number\]\]`, as the object's method and the function do.
- **The `:875` line, in `inferByUnification`, is left unchanged.** Reading the bounds there was built and measured.
  - It changed no value, and no result among the 13 listed tests.
  - It changed only the error for an argument outside the bound, `Picker.pick(5)`. Without it, the error is 'Unification error ... Cannot unify Int ... with Shape ... abm=K=(Int,Any)'. With it, the error is the function path's own InterpreterBug, '** bug! Meet(Int, Shape) not a singleton: []'.
  - Its `testSystem` run gave 649 tests with 1 failure: row 765's `XXX` test.

## 5. Values, before and after
Walk was run directly. The compiled path was compiled and run before the patch, then again after the build, the library order and a fresh compile.

| Call | walk before | walk after | compiled before = after |
|---|---|---|---|
| `Maker.wrap(z, w)` ZZ32, ZZ64 | `Box[\AnyIntegral\]`, 3:ZZ32 | `Box[\ZZ64\]`, 3:ZZ64 | `Box[ZZ64]`, ZZ64 |
| `Maker.wrap(z, r)` ZZ32, RR64 | `Box[\Number\]`, 3:ZZ32 | `Box[\RR64\]`, 3.0:RR64 | `Box[Object]`, ZZ32 |
| `Maker.make()` | `Empty[\BOTTOM\]` | `Empty[\Number\]` | `Empty[Number]` |
| `Maker.same(z, w)`, alone | `[3:ZZ32,4:ZZ64]` | `[3:ZZ64,4:ZZ64]` | `[ZZ64,ZZ64]` |
| `Over.same(z, w)`, beside `same(String, String)` | `[3:ZZ32,4:ZZ64]` | `[3:ZZ64,4:ZZ64]` | `[ZZ64,ZZ64]` |
| `Over.same("a", "b")` | `strings` | `strings` | `strings` |
| `GMaker[\Number\]().gwrap(z, w)`, `T extends S` | `Box[\AnyIntegral\]`, 3:ZZ32 | `Box[\ZZ64\]`, 3:ZZ64 | not run |
| `GMaker[\ZZ64\]().gmake()` | `Empty[\BOTTOM\]` | `Empty[\ZZ64\]` | not run |
| `GMaker[\Number\]().gmake()` | `Empty[\BOTTOM\]` | `Empty[\Number\]` | not run |
| `Pairer.pairM()`, `B extends Box[\A\]` | `Empty[\BOTTOM\]` | `Empty[\Box[\Number\]\]` | not run |
| `Picker.pick(Circle)` | `picked` | the same | not run |
| `Picker.pick(5)` | 'Unification error ... abm=K=(Int,Any)' | the same | not run |
| the same methods in an object, and as functions | `Box[\ZZ64\]` 3:ZZ64, `Box[\RR64\]`, `Empty[\Number\]`, `[3:ZZ64,4:ZZ64]`, `Empty[\Box[\Number\]\]` | the same | not run |
| `Maker.wrap[\ZZ64\](z, w)`, written | `Box[\ZZ64\]` 3:ZZ64 | the same | not run |

After the patch, every trait row equals the object row and the function row. This satisfies P-74, P-48 and P-46. The paths differ only at `ZZ32` with `RR64` (section 7).

## 6. Tests
All runs used `harness-one.sh`, except the suite.

- **Row 766's test, unchanged, on the base code** (19:29:28Z): `FAIL: J5/0:other =/= J9/0:Box[ZZ64]; ...`, then ` OK Saw expected exception`.
- **Promoted to `ProjectFortress/tests/TraitGenericMethodInference.fss`.**
  - On the base code (19:34:40Z): red, with the same `FAIL` and `Tests run: 1,  Failures: 1`.
  - Three assertions added:
    - `Maker.pair()` gives `Empty[Box[Number]]`.
    - `Over.same(z, w)` gives `3:ZZ64,4:ZZ64`.
    - `Holder[\ZZ64\]().held()` gives `Empty[ZZ64]`, for `held[\T extends S\]` in `Holds[\S extends Number\]`.
  - No earlier assertion changed.
- **Row 765's test, `XXXInheritedGenericFunctionalMethodBesidePlain`.**
  - It went red in the suite (` Missing expected failure`), so it was promoted to `ProjectFortress/tests/InheritedGenericFunctionalMethodBesidePlain.fss`.
  - On the base code (19:44:25Z): 'Failed to find any matching overload, args = (Square)'.
  - On the patch without the `:875` line (19:45:48Z): `OK (2 tests)`. The bound read during the inference with coercion is what repairs row 765.
- **Final test text on the base code** (19:49:01Z): `Tests run: 2,  Failures: 2,  Errors: 0`.
- **Final patch, cold cache** (19:50:46Z): `OK (14 tests)`. The 14 tests:
  - `MethodStaticArgCases`, `MethodStaticArgDeclaredDomain`, `MethodStaticArgInference`, `MethodStaticArgInheritedGeneric` and `MethodStaticArgOverloadedReceiver`;
  - `DispatchRenamedGenericArmWalk` and `DispatchSwappedGenericArmWalk`;
  - `GenericReturnRuleHoldsWalk`, and `GenericReturnRuleInvariantWalk` and `GenericReturnRuleOuterParamWalk`, each `OK Saw expected refusal at load`;
  - `NestedReductionFusion` and `LibraryOverloadFamilies`;
  - the two promoted tests.
- **`ant testSystem` on the final patch:** shards of 157, 167, 165 and 160 tests, 0 failures. `BUILD SUCCESSFUL`, `Total time: 3 minutes 2 seconds`. It ran whole, since it takes well under 40 minutes.
- **Not run:** `testSpecData` and the compiled suites; microGPT (no line of the model changed); the listed tests on the base code (the base is taken as passing).

## 7. Defects and findings
- **Row 766.** Repaired by the patch, and recorded as a plain test with its fix (way 1). The row is not closed: the patch has not landed.
- **Row 765.** Repaired by the same patch, and its test promoted. Not closed.
- **The compiled path, with no ledger row yet.**
  - `wrap` on a `ZZ32` and an `RR64` gives `Box[Object]`, with the `ZZ32` not converted. Walk gives `Box[\RR64\]`, and P-74 converts a `ZZ32` into `RR64`.
  - The compiler prelude's `trait RR64` declares `coerce` only from `FloatLiteral` and `RR32` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`).
  - SKEPTIC.md's `SkTraitU` shows the same value.
  - Its ledger row needs a reproducer that names a file; this report is that file.

## 8. Sentences made false if the patch lands (none edited)
- `Specification/basic/inference.tex:290-293` (row 765), `:299-304` (row 766) and `:422-424` (row 766, the bounded parameter of a method that a trait declares).
- `Specification/appendices/changes.tex:2162-2164` (row 765) and `:2172-2177` (row 766).
- FACTS F-253's exception sentence.
- The skill's `references/revival-changes.md:148`, its last sentence.

## 9. Decisions
- **Way A over way D.** A changes only where the inference reads. D moves the environment of every trait method, which the team kept apart. No position of the curator covers this, and the way that lands is the curator's. The coordinator's default is A.
- **The two measured lines.** The patch keeps `:491` and leaves `:875` unchanged, for the reasons measured in section 4.
- **Tests.** Both `XXX` tests promoted, and three assertions added to row 766's test.
- **Branch.** The patch is committed on the local branch `wip/probe-row766` and not pushed, as the designated branch rule requires. Its text is in `way-a.patch` on `main`.

## 10. What was run, and what was only read
- **Run:** every build, value, harness result and suite count above.
- **Only read:**
  - that the base before batch 17 stopped these calls (SKEPTIC.md §3.2, §6);
  - SKEPTIC.md's compiled `SkTraitU`;
  - the effects claimed for ways B, C, D, E, F and H, from the code cited;
  - the reach of the `:875` line beyond the tests that were run.

## For FACTS
- **The fact.** At `5dd54b64b`, walk reads a trait's generic method's bounds and coercion targets in the trait's member environment, which has no parent. The coercion lookup throws, the inference with coercion falls back to unification, and an unfixed bounded parameter takes `BottomType`.
- **What it means.** A repair reads them in the trait's method environment (way A, `way-a.patch`).
- **What fails if it stops holding.** `ProjectFortress/tests/XXXTraitGenericMethodInference.fss` on `main`.
- **Detail.** Sections 2 and 5.
