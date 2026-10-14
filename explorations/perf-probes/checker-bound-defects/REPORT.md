# Checker bound defects: rows 680 and 685 to 690 traced, with a fix for each (climb batch 15 probe)

problem: six compiled-checker defects, five distance sites and one crash row. Climb batch 14's record kept them out until they were traced (`explorations/coordinator/CLIMB-BATCH-14.md` section 4, "Kept out for want of a measurement"; F-94). Rows 680, 685, 686, 687, 689 and 690.
base: `main` at 873d65f0c. A base build was made at `/home/user/fortress-b15probe-base`, and a worktree was seeded from it. Both were removed after the run.
measured: the distance stage, run once with all three fixes in place: 54 sites became 49. The compiler, othercompiler and library tracks were run twice, once with the minimal fixes and once with the sibling fix added.
committed: `patches/`, `repro/` and `mini-distance.sh` beside this note (`32269d57d`). Nothing in the original tree was committed.

## 1. The answer, row by row

| row | sites | the cause, traced to the line (at 873d65f0c) | the fix (`patches/`) |
|---|---|---|---|
| 686 | 1 (`squaredNorm(me)`, `Library/FortressLibrary.fss:2493`) | `TypeAnalyzer.normConjunct` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:692-698`) replaces the closed trait `K` by its listed types that the conjunct `R[\$T\]` does not exclude. The bound then becomes the union `OR(AND(T,A,R[$T]),AND(T,B,R[$T]))`. The union rule (`:165-166`) splits that union before the bound of the type variable `T` is read, so `T <: union` is false (section 2.2) | `rows-686-687-689-690-normal-form.patch`: `normConjunct` expands a closed trait only against a conjunct that holds no type variable and no inference variable |
| 687 | 0 | The same normal form. In the coercion attempt (`typechecker/impls/Functionals.scala:383`), the unifier applied to `$T <: union` gives an `Or`, and `Formula.slv` stops on it (`typechecker/Formula.scala:640`) | the same patch |
| 689 | 0 | The same: the plain attempt is refused as 686 is, and the coercion attempt then stops as 687 does | the same patch |
| 690 | 0 | The same normal form, at the meet of the two domains. `meet(T, K)` normalizes to `AND(T,OR(A,B))` instead of `T` (`overloading/OverloadingOracle.scala:115`), and `subtypeUA` then finds no instance (`:117`) | the same patch |
| 685 | 4 (`:2464`, `:2837`, two each) | A library line, not the checker's scope. `array1` and `array2` call `vector[\T,s0\]()` (`:2454`) and `matrix[\T,s0,s1\]()` (`:2826`) with their own unbounded `T`, inside a `typecase` on `__thrower[\T\]`, which does not bound `T`. The checker's refusal is right. It names the callee's declared result because the call's type keeps the declaration's spans (`typechecker/TypeWellFormedChecker.scala:137`, `:183`, `:158-165`) | `row-685-array-factories.patch`: the witness `typecase` per number type with `cast`, which is the library's own way (`additiveIdentity`, `:3229`) |
| 680 | crash row, 0 sites behind it | Nothing in `plane`'s body fails. The local function group's return-type thunks are primed with a TryChecker over the environment before the group is added (`typechecker/impls/Decls.scala:414`). So `plane`'s inferred return type is checked without its sibling `row` ('Variable `<row's unambiguous name>` not found', which the TryErrorLog keeps). `plane(k)` then comes back untyped in the loop's function expression (`typechecker/STypeChecker.scala:598-603`) | `row-680-local-function-group.patch`: prime the thunks with the checker that holds the group |

Fixed together: 54 → 49 (section 6). The sites cleared are the five that the brief names, 686's one and 685's four. No site appears that was not there before. Row 680's crash row is gone, and `Array3`'s body checks with no error, so nothing was hidden behind it.

A sibling outside the rows' tests (section 2.5): a call through a type parameter whose second bound names no type parameter (`T extends { K, Q }` with `Q excludes { C }`) still crashes after the normal-form fix. Two cases of the union rule repair it (`sibling-ground-bound.patch`). Its tracks are green, and it was not run in the distance stage.

## 2. Rows 686, 687, 689 and 690: one cause, in the analyzer's normal form

### 2.1 Reproduction

`repro/Bounds*.fss` are the four gated programs (`XXXInferCallerTwoBoundsClosedTrait` and its siblings) in the rows' shapes, plus the sibling. In each, `K comprises { A, B, C }`, `R[\T extends R[\T\]\]`, `A` and `B` extend `R`, and `C` does not. On the base (`old-fortress.sh <base> <caches> compile X.fss`):

    BoundsBoxArg.fss:11:48-50:  Could not check call to function h
        - [\T extends K R[\T\]\]Box[\T\]->T is not applicable to an argument of type Box[\T\].
    BoundsCallerParam:  ** bug! Applied a substitution to an And and got an Or
    BoundsNumeral:      ** bug! Applied a substitution to an And and got an Or
    BoundsReturnRule.fss:  For f, the return type of [\T extends K R[\T\]\]T->String ... should be a subtype of the return type of K->String

The two crashes go through the same frames (`fortress compile -debug stacktrace`): `Formula.slv(Formula.scala:640)` < `solveToBounds(:544)` < `STypesUtil.inferStaticParamsHelper(useful/STypesUtil.scala:1036)` < `Functionals.attempt$1(impls/Functionals.scala:383)` < `checkApplicableWithCoercion(:392)` < `typedApplicationOfChecked(:739)`. The ledger's `:593` and `:721` have drifted. The refusal is signalled at `Functionals.scala:755`.

### 2.2 The trace

- **The normal form.** `normConjunct` (`TypeAnalyzer.scala:692-713`) has three branches.
  - First, if a conjunct definitely excludes a type that a closed conjunct lists, the closed conjunct becomes the union of its other listed types (`:693-698`).
  - Then come the check for Bottom and the removal of redundant conjuncts (`:699-705`). The comprises branch skips that removal.
  - So the bound `K ∩ R[\$T\]` normalizes to `AND(OR(A,B),R[$T])`, and once more to `OR(AND(A,R[$T]),AND(B,R[$T]))`, since `C`, an object outside `R`, excludes `R[\anything\]`.
- **The union rule.** In `pSubInner`, a union on the right (`:165-166`) comes before the inference-variable cases (`:171-174`) and before the type-variable case (`:184-220`). This is the paper's first-match order (`Papers/Types/fig-subtype.tick`).
  - `S <: U ∪ V` becomes `S <: U ∨ S <: V`.
  - A variable whose instances fall in different disjuncts is below the union only as a whole.
- **686.** The constraint is `Box[\T\] <: Box[\$T\]`, so `$T` has lower bound `T` and upper bound `T`, and the bound adds `K ∩ R[$T]`.
  - `Formula.reduce`'s contradiction test (`Formula.scala:375`) asks whether `join(pl) <: meet(pu)`.
  - `meet({T, K∩R[$T]})` normalizes the inner bound first, and so becomes `OR(AND(T,A,R[$T]),AND(T,B,R[$T]))`. `K` is never dropped as implied by `T`.
  - The trace with `-Dfortress.debug.analyzer.subtype=true` shows `psub > (T, OR(AND(T,A,R[\#7ljj\]),AND(T,B,R[\#7ljj\])), false)` returning `False`, through `psub < (T, A, false) RETURNS False`.
  - So the formula is `False` and the candidate is not applicable.
- **689.** The constraint is `T <: $T` with `$T <: OR(AND(A,R[$T]),AND(B,R[$T]))`. The plain attempt is false as in 686.
  - The coercion attempt's combination with no chosen type keeps only the bound.
  - `cMap` (`Formula.scala:795-829`, `puf` at `:808`) re-derives `$T <: union`, which the union rule makes an `Or`.
  - `slv` expects an `And` after unification and stops (`:640`).
- **687.** The call `f(A, 1)` needs a coercion, so it reaches the coercion attempt, whose combination with no chosen type stops as 689's does.
- **690.** The Return Type Rule's special arrow has domain `nta.meet(d1, d2)` (`OverloadingOracle.scala:115`). A probe print at `:117`, with the comment lines there turned into a print:

      base:      fa = T$3->String  ga = K->String  ra = AND(T$3,OR(A,B))->String  result = false
      with fix:  fa = T$4->String  ga = K->String  ra = T$4->String  result = true

  The meet of `T` and `K` is `T` (since `T <: K`), but the comprises branch runs first and keeps `K` expanded. The 2012 write-up's rule holds of the pair, since every instance of the more specific declaration returns `String` (`Papers/Types/journal/justificationOfRTR.tex:313-322`).

### 2.3 Does one fix in the inference step serve 686, 687 and 689?

No. One fix serves all four rows, 690 included, but it is in the normal form, not in the inference step.

A guard in `slv` that solves the `Or` branch by branch was measured: `case o:Or => slv(o, toBounds).map(...)` in place of the `bug` at `Formula.scala:640`, on the base build's classes. It clears 687 only:

    BoundsNumeral.fss       (compiles)
    BoundsCallerParam.fss:10:41-43: Could not check call to function h - ... T->T is not applicable to an argument of type T.
    BoundsBoxArg.fss:11:48-50: ... not applicable to an argument of type Box[\T\].   (unchanged)
    BoundsReturnRule.fss: ... should be a subtype of the return type of K->String   (unchanged)

So 689 becomes 686's refusal. Neither branch of the `Or` admits the caller's `T`, which lies below only the whole union.

### 2.4 The fix and its check against the papers

`patches/rows-686-687-689-690-normal-form.patch` adds one local function to `normConjunct`. A closed trait is expanded only against a conjunct for which `getVarTypes(z).isEmpty && !hasInferenceVars(z)` holds. Over a variable, the normal form stays the intersection as written, and the redundancy branch then drops a conjunct that a variable implies, as `K` beside `T`.

- **`Papers/Types/fig-subtype.tick`.** The algorithm is first-match. An intersection on the right comes first (`T <: U ∩ V` gives `C ∧ C'`), and a bound variable is read by `Δ(X) <: T`. On the bound as written, `T <: K ∩ R[$T]` gives `T <: K` (true through `Δ(T)`) and `$T = T` (through `R`). That is the instance the specification asks for (`basic/inference.tex`, "The Static Arguments of a Call": some instance within the bounds applies).
- **`fig-meet.tick`.** The computed meet is `T ∩ U`. Nothing in the subtyping or meet rules reads a `comprises` clause. Only exclusion does (`fig-exclusion.tick:117`). The expansion is the implementation's, present in the team's last tree (`a874948ac`, `TypeAnalyzer.scala:634-637`).
- **POPL 2019 (`research/extracts/ParkPOPL2019-extract.md` section 6).** Completeness of matching "assumes that a matched type holds no `Bottom` and no type parameter inside a union or intersection … declared types have neither, and unions reach a declaration only through already-ground instances". The expansion over a variable builds exactly such a union, a type parameter inside a union of intersections, and the fix keeps every union it builds free of variables. The paper leaves `comprises` out (section 6, "Left open").
- **The Return Type Rule (`Papers/Types/journal/justificationOfRTR.tex:313-322`).** It is checked on the meet of the domains, now `T`.

Measured (section 5): the four gated programs compile, link and run `PASS`. The compiler track's only failures are the four `XXX` tests turning red, which needs their promotion. `TypeAnalyzerJUTest`, `TypeSchemaAnalyzerJUTest`, `FormulaJUTest` and `ConstraintJUTest` pass.

What precision it gives up: the exclusion of a meet over a variable from a type that excludes each remaining listed type but neither conjunct. Neither the tracks nor the distance shows a case.

### 2.5 The sibling: a ground second bound (`repro/BoundsGround.fss`)

`g[\T extends { K, Q }\](x: T): T = h(x)`, with `trait Q excludes { C }`, crashes on the base with the same 'Applied a substitution to an And and got an Or', and still does after 2.4. Walk runs it.

- `K ∩ Q` is ground, so it is still expanded, here to `OR(A,B)`.
- `$T <: OR(A,B)` is split by the union rule into an `Or`, which `slv` stops on.
- `T <: OR(A,B)` is split before `T`'s bound `OR(A,B)` is read.
- The claims of rows 686 and 689 cover this shape, since their bound excluding a listed type need not name `T`. Their tests do not.

`patches/sibling-ground-bound.patch`, on top of 2.4, adds two cases before `TypeAnalyzer.scala:165`, both only when not negated:

- An inference variable below a union takes the union as one upper bound, so the paper's inference-variable rule comes before its union rule.
- A type variable below a union is also tried through its bound, by `Δ(X) <: T`, with the type-variable case's history.

The solver's choice is then "the intersection of the upper bounds" (POPL 2019, extract section 4), here the union, which is the bound. This is the curator's rule for a type parameter that no argument fixes.

Measured:

- **The five reproducers.** All compile, link and run `PASS`.
- **The three tracks.** The same four expected-red tests and nothing else: compiler 1173 run, 4 failing; library 86, 0; othercompiler 263, 0.
- **The four unit classes.** They pass.
- **Alone, without 2.4.** It clears 687 and the sibling, but not 686, 689 or 690 (the quick loop's switches).
- **Removing the expansion** from `normConjunct` altogether also clears all five (the quick loop). It was not run through the tracks.
- **Not measured.** The distance stage and the count stage with this patch.
- **Row 518's mechanism.** It changes the mechanism that row 518 names, a union on the right taken before the inference-variable cases. `InferUnionInstanceArg` stays green.

## 3. Row 685: a library line, by the team's own TODO

`repro/FactoryUnboundedCaller.fss` copies `array1`'s shape: a bounded factory, called inside a `typecase` on `__thrower[\T\]` against `() -> K`, from a function whose `T` has no bound. On the base:

    FactoryUnboundedCaller.fss:11:42-48:
        Ill-formed type: V[\T,s0\]
        The static argument T does not satisfy the corresponding bound K.

Line 11 is the callee's declared result. The call is on line 16.

- **The mechanism.** A stack printed at the error (a probe copy of `TypeWellFormedChecker.error`) shows the walk of the caller's body (`TypeWellFormedChecker.scala:137`). It reaches the call's type, alone and as a member of the `typecase`'s union (`:183`), and it tests the static argument `T` against `K` (`:158-165`). The type's nodes are the declaration's, with its spans.
- **In the library.** The same holds at `array1` (`Library/FortressLibrary.fss:2452-2456`, call `:2454`) and at `array2` (`:2824-2828`, call `:2826`). Both carry the team's comment "TODO: fix when Number is covariant". So the four sites are two calls, each tested against both bounds of the family, `{ Number, MultiplicativeRing[\T\] }`.
- **The batch 14 hypothesis.** The checker does not test a written argument with no bound in scope: `T` has no bound in `array1`, and the instance is ill-formed (`basic/trait-parameters.tex`, "Type Parameters").
- **The specification's own account.** The revision box at `Specification/appendices/future.tex:257-264` records this design: Jan's overloaded pair is refused by the No Duplicates Rule, so the library writes one factory "which chooses its result by a `typecase` on its type argument, a `Vector` where the argument is a `Number`".

**The fix, the library's own way.** `additiveIdentity` and `multiplicativeIdentity` (`:3229-3262`) produce a value of `T` by the `typecase` over the `() -> T` witness, building the value at each number type and returning `cast[\T\](v)`. `patches/row-685-array-factories.patch` does the same:

- one arm per number type, `() -> ZZ32 => cast[\Array1[\T,0,s0\]\](vector[\ZZ32,s0\]())`, and so on for `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`;
- the same for `array2` with `matrix`;
- the `else` arm unchanged.

Each of the eight satisfies the family's bound (`Library/FortressLibrary.fsi:296`, `:394`, `:446` with `Integral`'s `MultiplicativeRing`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47`).

Under walk (`repro/ArrayFactoryWalk.fss`, base and shadow give identical output):

    array1 RR64 is a vector
    array1 NN32 is a vector
    array1 String is plain
    array2 RR64 is a matrix
    PASS

What changes (`repro/ArrayFactoryAbstract.fss`): at an abstract number type, `array1[\Number,2\]()` and `array1[\AnyIntegral,2\]()` were vectors on the base. With the patch they are plain arrays:

    base:    array1 Number is a vector / array1 AnyIntegral is a vector
    shadow:  array1 Number is plain    / array1 AnyIntegral is plain

`Vector[\Number,n\]` is not a well-formed type under the family's bound, since `Number` is not a `MultiplicativeRing[\Number\]`. So the old result was an instance that the static semantics refuses. Its sentence in `future.tex:263-264` becomes false (section 8). The array literal goes through `__builtinFactory1` → `array1`, so `[1 2 3]` is unaffected. Walk refuses the literal on both trees anyway ('Can't infer element type for array construction').

A second, smaller defect stays: the checker reports the ill-formed instance at the callee's declared type, not at the call (proposed row 3, section 9).

## 4. Row 680: the local function group, not `plane`'s body

**The bisection.** `repro/Array3AsStringProbe.fss` is a trait `P3` extending `Array3` whose getter repeats `asString`'s body. It is checked by the distance stage's own checker over the interpreter library, with the apis not checked by every stage (`mini-distance.sh`, beside this note: about 3 minutes). The base gives the same crash as the stage's `#crash` row. Variants of the body (the outputs are not kept), with one result each:

| variant | result |
|---|---|
| as written | crash |
| loop without `plane(k)` | clean, and `plane(0)` outside the loop checks |
| loop with only `plane(k)` | crash |
| `plane(k: ZZ32): () = ...` | clean, no error at all |
| both return types written | clean |
| `plane` without its `if` | crash |
| `row` without `self[...]` | crash |
| `plane` without calls of `row` | clean |

So `plane`'s body is well typed. What fails is the inference of `plane`'s return type when its body calls its sibling.

**The mechanism.** It was shown by printing the TryChecker's errors in the thunk and the bindings at the failing lookup, in probe copies of `Thunker.scala` and `Misc.scala`:

    @@THUNK-EVAL plane(k:ZZ32) ...
    @@NOTFOUND _|tmp|repro|P3C.fss:7:7-10:12 row=false plane=false r=true class=TryChecker
    @@THUNK-NONE plane(k:ZZ32) errors=Some(...:7:7-10:12: Variable '_|tmp|repro|P3C.fss:7:7-10:12' not found.)

- Consecutive local functions form one `LetFn` group (`parser/LocalDecl.rats:63-72`). The specification makes its members mutually recursive (`basic/functions.tex`, "Local Function Declarations": "locally declared functions in a single scope are allowed to be overloaded and mutually recursive").
- The checker's `SLetFn` case builds `newChecker` with the group, but primes the return-type thunks with `makeTryChecker(this)`, the environment without the group (`impls/Decls.scala:408-414`).
- A thunk re-checks the declaration (`Thunker.scala:158-176`). The call `row(0,k)` carries `row`'s overloading from the disambiguator, and that overloading's unambiguous name is not bound (`impls/Misc.scala:162`). The error goes to the TryChecker's own log, the thunk gives no type, and no error reaches the component.
- From a function expression, the untyped call reaches `TryChecker.tryCheckExpr`'s `bug` (`STypeChecker.scala:598-603`).
- Outside a loop, the same failure is silent. The distance shows it nowhere: it ends in the `leftover` stage's `ClassCastException` (`BoxedUnit` cannot be cast to `Expr`, `useful/STypesUtil.scala:2124`), which the base run of the probe also prints.

**The compiled path shows it too,** against the ledger row's note that "a compiler-world program of the same shape typechecks". `repro/LocalSiblingInLoop.fss` and `repro/LocalSiblingDirect.fss` are two lines each. Walk runs both, `PASS`. The base's `fortress compile` gives:

    LocalSiblingInLoop:  ** bug! TryChecker returned an untyped expr: FnExpr at .../LocalSiblingInLoop.fss:7.9
    LocalSiblingDirect:  ** bug! Result of typechecking still contains intermediate nodes.

With the patch, `fortress typecheck` accepts both, and `compile` stops at the code generator's wall, "Can't compile LetFn".

**The recursive case.** A recursive local function with no written return type (`repro/LocalRecursiveUntyped.fss`) now gets the cycle checker's refusal instead of the crash:

    base:   ** bug! Result of typechecking still contains intermediate nodes.
    patch:  ...:4:5-57: Cannot infer type for function fact(n:ZZ32) because it has reference cycle: fact(n:ZZ32), fact(n:ZZ32)

**The fix.** `patches/row-680-local-function-group.patch` changes `makeTryChecker(this)` to `makeTryChecker(newChecker)`. A library line can avoid the crash, `plane(k: ZZ32): () =` (the variant with `plane`'s type written), but the line is valid as written, so the fix is the checker's. With it, `P3` checks clean in `mini-distance.sh`, and in the distance stage `Array3`'s whole declaration checks with no error:

    @@TC DECL-OK	TraitDecl	.../Library/FortressLibrary.fss:2902:1-3015:2	errors=0

Its two calls of a size known only at run time (`__subarray(self, N[\0\], reflect(z0), ...)`, base `:2955`, `:2966`) are accepted, so nothing was hidden behind the crash.

## 5. The tracks

The run is `ant testQuick`: the compiler, othercompiler and library tracks of `testFast`. It is the skill's command for a checker edit.

- **The three patches of sections 2.4, 3 and 4** (19 min 39 s under load 12 to 19):

      fast-compiler       Tests run: 1173, Failures: 4, Errors: 0
      fast-library        Tests run: 86, Failures: 0, Errors: 0
      fast-othercompiler  Tests run: 263, Failures: 0, Errors: 0

  The four failures are `XXXInferCallerTwoBoundsClosedTrait`, `XXXCoerceTwoBoundsClosedTrait`, `XXXCallerParamTwoBoundsClosedTrait` and `XXXReturnRuleTwoBoundsClosedTrait`, each 'Saw wrong failure. compile', because the programs now compile. The counts equal climb batch 14's gate (`explorations/compile-ladder/climb-batch-14/gate/summary.txt`).
- **The same with `sibling-ground-bound.patch` added** (9 min 24 s): the same three lines and the same four tests.
- **`ant testOnly`** for `TypeAnalyzerJUTest`, `TypeSchemaAnalyzerJUTest`, `FormulaJUTest` and `ConstraintJUTest`, in both states: 4, 4, 5 and 4 tests, no failure.
- **Not run:** the misc track's other classes, `testSystem` and the count stage. The library patch changes walk's library, which only `testSystem` and the demos run.

## 6. The distance stage with the three patches

    explorations/coordinator/tools/distance/run.sh <out> <scratch>
    #total	49
    #crash	decl	FnDecl FortressLibrary.fss:1312:1-1316:4	TypeError	FortressLibrary.fss:1314:10: Missing parameter type for i
    #seconds	2185	FortressLibrary 1247
    #machine	nproc=4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 12.02 8.77 8.59; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=1

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-14/gate/distance.txt <out>
    DISTANCE DOWN   54 -> 49 (-5)
        kind wellformed               8 -> 4      (-4)
        kind typecheck               41 -> 40     (-1)
        crash gone   decl	TraitDecl FortressLibrary.fss:2886:1-2999:2	InterpreterBug	** bug! TryChecker returned an untyped expr: ...

**The per-site comparison.** It compares the run's `errors.tsv` against `explorations/compile-ladder/gate/distance-sites.tsv`, with the base's lines moved by the patch: +9 between the two factories, +16 after `array2`.

- Cleared:
  - the four `wellformed` sites of `Vector[\T,s0\]` and `Matrix[\T,s0,s1\]`, against `Number` and `MultiplicativeRing[\T\]` (row 685);
  - `squaredNorm`'s 'not applicable to an argument of type Vector[\T,k\]' (row 686).
- Behind row 680: none.
- New sites: none. Three rows differ only in a second line number inside a span, which the comparison does not move.

**What the timings say.** The stage ran beside the tracks and other sessions' work, so its time is not comparable with batch 14's (1714 s at load 1.85). The patches' effect on the checker's speed is not measured. The count stage, with its 900-second limit (row 688), was not run. The normal-form patch makes the variable-bounded array family's bounds smaller, not larger, but that is a reading, not a measurement.

## 7. The rungs

The three fixes touch three declarations in three files: `TypeAnalyzer.normConjunct`, the `SLetFn` case of `impls/Decls.scala`, and `array1` and `array2` in `Library/FortressLibrary.fss`. None needs another: each was measured alone on its own reproducers, and the sites they clear are disjoint by site.

1. **The normal form (checker): rows 686, 687, 689, 690.** `rows-686-687-689-690-normal-form.patch`.
   - **Tests first:** promote the four `XXX` tests, with plain names, `link`, `run` and `run_out_contains=PASS`, as the skill's "Promoting an XXX test" says. Each fails on the base as a plain test (section 2.1) and passes with the patch.
   - **Distance:** -1 site. Row 688's count stage should be run once, since the normal form of every variable-bounded meet changes.
   - **Specification:** no sentence found that it makes false. The places searched were the Appendix I entries on bounds and closed traits, `basic/inference.tex` and `advanced/overloading.tex`.
   - **The sibling patch** belongs in this rung or in a later one, not in a parallel rung of the same batch. Alone, it also turns `XXXCoerceTwoBoundsClosedTrait` red, so two parallel rungs would both promote that test. Its test first is `repro/BoundsGround.fss` as a plain compiled test, which crashes on the base. With it, the rung should run the distance and count stages once more.
2. **The local function group (checker): row 680.** `row-680-local-function-group.patch`.
   - **Tests first:** `LocalFunctionSiblingInLoop` and `LocalFunctionSiblingCall` as `compiler_tests` with `typecheck` (from `repro/LocalSibling*.fss`; `link` is blocked by the LetFn wall). Both crash on the base. A third test from `repro/LocalRecursiveUntyped.fss`, with `compile_err_contains=reference cycle`, can carry the recursive case.
   - **Distance:** the crash row goes, 0 sites.
   - **Specification:** none made false. The rationale of Appendix I's "revival-paramtype" entry (`changes.tex:3317-3333`) lists the crash messages of rows 620 to 622 as history, and it stays true.
3. **The array factories (library): row 685.** `row-685-array-factories.patch`.
   - **Tests first:** a walk test in `ProjectFortress/tests/` from `repro/ArrayFactoryWalk.fss`, which is a guard that passes before and after. Beside it, the assertions of `repro/ArrayFactoryAbstract.fss` that an abstract number type gives a plain array, which fail on the base.
   - **Distance:** -4 sites.
   - **Specification:** `Specification/appendices/future.tex:263-264` becomes false (section 8).
   - This edits walk's library, so `testSystem` and the microGPT check under walk apply.

## 8. Sentences of the specification made false

- **Rung 3**, at `Specification/appendices/future.tex:261-264`, in the revision box "revival-overloading":

  > the No Duplicates Rule refuses; \library\ write it as one factory, \EXP{{array}_{1}\llbracket{}T, \KWD{nat}\:s_{0}\rrbracket()}, which chooses its result by a \KWD{typecase} on its type argument, a \TYP{Vector} where the argument is a \TYP{Number}.

  After the patch, the result is a `Vector` where the argument is one of the eight number types, and not where it is `Number`, `AnyIntegral` or another abstract number type.
- **Rungs 1 and 2:** none found.

## 9. Defects, each with its home

- **Rows 686, 687, 689 and 690.** These are home 2, gated by their `XXX` tests. The cause is traced (section 2), and the rows' notes are at their 1,200-character limit. Their close writes the cause into history.
- **Row 680.** Home 3, a row only. Its note "A compiler-world program of the same shape typechecks" is contradicted: `repro/LocalSiblingInLoop.fss` crashes the compiled checker on the base. The row is at 1,122 characters, so the correction goes with its close. A test can now carry it: rung 2's.
- **Row 685.** Its claim is falsified: the checker's refusal is right, and its cause is the library's call. It needs a decision (section 11). Proposed rows 2 and 3 below carry the true defects.
- **Three new rows, proposed.** The brief commits nothing to the ledger. Each passes `ledger.py check --rows`, apart from the `?` in the number cell. Rows 1 and 2 belong in section 2 of the ledger, "Types: generics, static parameters, inference and coercion"; row 3 in the same section or section 12.
  1. The ground-bound sibling. Its home is 2 once a rung writes `BoundsGround` as an `XXX` test, else 3.
  2. The library's factories at an unbounded `T`. Home 1 with rung 3.
  3. The well-formedness error located at the callee's declaration. Home 3, a row only.

```
| ? | the compiled checker crashes on a call through a type parameter bounded by a closed trait and a bound naming no type parameter that excludes one of its listed types: `h(x)` in `g[\T extends { K, Q }\](x: T): T` with `trait Q excludes { C }`, 'Applied a substitution to an And and got an Or' | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/inference.tex`, "The Static Arguments of a Call" | `explorations/perf-probes/checker-bound-defects/repro/BoundsGround.fss` | climb batch 15 checker probe | siblings: 686, 689. `TypeAnalyzer.normConjunct` (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:692-698` at 873d65f0c) normalizes `K` and `Q` to `OR(A,B)`; the union rule (`:165-166`) splits `$T <: OR(A,B)` before the inference-variable case and `T <: OR(A,B)` before T's bound is read, so the solver meets an Or (`typechecker/Formula.scala:640`). Rows 686 to 690's fix leaves it. Walk runs it. Workaround: `h[\T\](x)`. Fix: `explorations/perf-probes/checker-bound-defects/REPORT.md` section 2.5. |
| ? | the library's `array1` and `array2` call the factories `vector[\T,s0\]()` and `matrix[\T,s0,s1\]()` with their own unbounded `T`, an instance the family's bound refuses: four distance sites, which the compiled checker reports at the callee's declared result (row 685) | NEGATIVE-VERIFIED | library bug (library) | `basic/trait-parameters.tex`, "Type Parameters" | `explorations/perf-probes/checker-bound-defects/repro/FactoryUnboundedCaller.fss` | climb batch 15 checker probe | siblings: 685. `Library/FortressLibrary.fss:2454`, `:2826` at 873d65f0c: a `typecase` over `__thrower[\T\]` against `() -> Number` does not bound `T`. The checker's refusal is right; it names `:2464` and `:2837`, the callee's declared result, since the call's type keeps the declaration's spans (`TypeWellFormedChecker.scala:183`, `:158-165`). Fix: the witness `typecase` per number type with `cast`, as `additiveIdentity` (`:3229`); walk keeps its vectors, and `array1[\Number,n\]()` becomes a plain array. |
| ? | the compiled checker reports a call's static argument that fails the callee's bound at the callee's declared type, not at the call: 'Ill-formed type: Vector[\T,s0\] The static argument T does not satisfy the corresponding bound', at `vector`'s result, for `vector[\T,s0\]()` in `array1` | NEGATIVE-VERIFIED | implementation gap (checker) | silent | `explorations/perf-probes/checker-bound-defects/repro/FactoryUnboundedCaller.fss` | climb batch 15 checker probe | siblings: 685. The well-formedness walk of a function body (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:137` at 873d65f0c) meets the call's type, alone and in the typecase's union (`:183`), whose nodes keep the spans of the callee's declaration, and reports there (`:158-165`). The reproducer's two errors name its line 11, the callee's result type, not the call on line 16. |
```

## 10. Decisions

- **The normal-form fix keeps the team's expansion for ground meets.** The alternatives were:
  - removing the expansion altogether, which also clears the sibling and was not run through the tracks;
  - adding the union-rule cases alone, which clear 687 and the sibling only;
  - a guard in `slv`, which clears 687 only and turns 689 into a refusal.

  The kept fix is the smallest change that clears the four rows, and it holds the POPL 2019 condition that no union built by the checker holds a type parameter (section 2.4). No decision of the curator covers the analyzer's normal form.
- **Row 685's fix follows the library's witness `typecase` with `cast`,** not a checker rule that would let a `typecase` on `__thrower[\T\]` bound `T`. That would be a language change, which is the curator's. The patch's one change in walk's results, abstract number types, is listed in section 3 and section 8.
- **Row 680's fix is the checker's.** `plane`'s line is valid Fortress by `basic/functions.tex`. The library workaround, writing `: ()`, is noted and not used.
- **The distance stage is `distance/run.sh`.** The brief's parenthesis names `explorations/coordinator/tools/count-run/`, which is the walk test-count runner. The stage it describes, the distance (26 to 29 minutes), is `explorations/coordinator/tools/distance/run.sh`, and that is what ran.
- **The note itself.** It could not be written as a file by the probe agent: the session's tool guard refused it. The probe committed the patches, the reproducers and the script (`32269d57d`), and handed this text over.

## 11. For the curator

**Row 685's record.** The question: is row 685 retired, its claim falsified (the checker's refusal is right), and replaced by proposed rows 2 and 3?

- Sources: this note, section 3; `Specification/appendices/future.tex:257-264` (the revival's box, 2026); the team's TODO at `Library/FortressLibrary.fss:2451`.
- Solutions:
  - (a) Retire 685 and add rows 2 and 3.
  - (b) Rewrite 685's claim to row 2's and add row 3.
- Current behaviour: the record stays as it is, either way, until rung 3 lands.

**The sibling patch's place.** The question: does `sibling-ground-bound.patch` go into rung 1, wait for a later rung, or give way to removing the expansion?

- Sources: section 2.5. `Papers/Types/fig-subtype.tick` is the team's 2011 paper; the POPL 2019 paper is one of the type group's late positions.
- Each changes:
  - In rung 1: no library site needs it, and it changes row 518's mechanism.
  - A later rung: the sibling row stays open.
  - Removing the expansion: the team's precision for ground meets is lost, unmeasured on the tracks.
- The current behaviour stays with "a later rung".

## 12. For FACTS

- **F-94 is to be rewritten.**
  - **The fact:** the compiled checker's failures at a type parameter bounded by a closed trait and a bound excluding one of its listed types (rows 686, 687, 689, 690) have one cause. `TypeAnalyzer.normConjunct` expands the closed trait over a conjunct that holds a variable, and the first-match union rule then loses the variable's instance. One change there clears all four, and a solver guard does not.
  - **What it means:** one checker rung, not an inference rung, and a second change for the ground sibling.
  - **The number:** 1 distance site (686).
  - **The tests:** the four `XXX` tests, which turn red with the fix.
  - **Detail:** this note, sections 2.2 to 2.5.
- **A new fact.**
  - **The fact:** the compiled checker infers a local function's return type without its group in scope (`impls/Decls.scala:414`). So a local function with no written return type that calls a sibling crashes the checker, from a loop body or directly, and `Array3`'s `asString` is the library's case.
  - **What it means:** row 680 is a one-line checker rung, and nothing waits behind it.
  - **The number:** 0 sites.
  - **The test:** `repro/LocalSiblingInLoop.fss` with `fortress typecheck`, which crashes on the base.
  - **Detail:** section 4.
- **Row 685 is a library line.**
  - **The fact:** `array1` and `array2` instantiate the bounded factories at their unbounded `T`.
  - **The number:** 4 distance sites.
  - **The check:** the distance stage's two `wellformed` pairs.
  - **Detail:** section 3.

## 13. Commands worked out

- **The quick loop on a Scala file.** Compile it with `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d DIR X.scala`, then run `com.sun.fortress.Shell compile` with `DIR` first on the class path. This is `references/compiler.md`'s loop.
  - Against the base build's classes and caches, `CP` must come from the base's `bin/fortress_classpath` with `FORTRESS_HOME` set to the base.
  - Several fixes were compared without rebuilding, behind `-D` switches in a probe copy of `TypeAnalyzer.scala`.
- **`mini-distance.sh` (beside this note).** It runs the distance stage's checker, in the "any" setting with every stage, over small components that import the interpreter library, without checking the apis with every stage. That takes about 3 minutes instead of about 30, so a library body copied into its own component can be bisected.
- **Hidden checker errors.** To see an error that a TryChecker's log swallows, print `tryChecker.getError` where `Thunker.makeThunk` gets `None`, and `nameHasBinding` of the names in scope at `Misc.scala:162`.
