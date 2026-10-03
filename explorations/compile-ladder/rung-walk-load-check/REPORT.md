# Rung K: walk's load check and the harness key for an expected refusal at load

*Row numbers are the final ones, assigned at climb batch 9's gather: the provisional 587 and 588 are rows 595 and 596. The gather made the skeptic's four required corrections here, each marked "(the gather, correction N)".*

problem: walk loads a program whose object extends two closed traits unlisted and runs the first-written of two incomparable declarations, `f(Z)` printing `f(S)` (row 551, `ProjectFortress/tests/ComprisesUnlistedExtender.fss:11`), and refuses a generic beside a plain declaration whose type parameter has two bounds (row 552, `ProjectFortress/tests/GenericBesidePlainTwoBounds.fss:11`)
spec: a type that explicitly extends a trait with a comprises clause is a subtype of a listed type, or a closed trait of such types, or a trait with static parameters every extender of which is below a listed type, `Specification/basic/traits.tex:235-252`; a declaration with static parameters ranges over its instances, `Specification/advanced/overloading.tex:531-563`
precedent: the checker's eligibility, `isEligibleToExtend` and `everyKnownSubtypeListed`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:257-287`; the compiled harness's keys through `generalTestFailed` (`CommandTest.testFailed`) and the `.timing` file beside a test, `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:702-703` and `:548` at the base; batch 7b's `overlapPieces`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:901-945` at the base
deviation: the closure check reads only the main component's clauses, where the text and the checker read the library's too (section 5); an `XXX` file with the key is the expected failure of a refusal, where the compiled harness's `XXX` file with `compile_err_contains` demands the refusal (section 3); the overlap reading reads a type that mentions a static parameter as `Any`, not over its instances, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:767-774`
historical: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:322`, `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:227`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1064`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:736`

## 1. What changed

Walk's test harness reads a key that names a refusal at load. Three things change in walk's load check.

- **The key.** A file `Name.fss` of `ProjectFortress/tests/` names the refusal at load it expects in `Name.test` beside it, in the compiled tests' format: `load_exception_contains=<text>`, or any other `load_` key that `generalTestFailed` reads. A plain test passes when walk refuses the program at load with an exception that meets the key. An `XXX` test is the expected failure of that: it passes when the program loads and runs without an exception and without `fail` or `FAIL` in its output. It fails when walk refuses it as the key names, or when it fails in any other way (`FileTests.java:456-515`, `:835-879`).
- **Row 552.** The overlap reading of a generic declaration beside a plain one now handles every shape of static parameter:
  - a type parameter with several bounds is read as the intersection of its bounds;
  - a bound that names a static parameter is left out;
  - a parameter type that mentions a static parameter is read as `Any`;
  - a non-type static parameter is no longer a reason to refuse.

  The code is `OverloadedFunction.java:728-778`, with `intersectionPieces` at `:917-976`.
- **Row 551.** Walk checks at load the comprises clauses of the program's main component against every trait and object of the program, as the traits chapter's 2012 reading and the compiled checker read a clause. The code is `BuildEnvironments.java:1052-1352`. It is called from `Driver.java:227` once every component's types are built, before any overload set is checked.
- **Tests.** The rung adds:
  - two plain tests and two refusal tests for rows 551 and 552;
  - a guard of the eligible forms;
  - five expected failures by the key: rows 534, 544 and 549, as the record asks, and rows 22 and 487, for the library's clauses the check does not read.

Four Java files change: 538 lines added, 28 removed. The checker, the library and the specification are untouched.

## 2. The order of work

Each test was committed alone and seen failing before its edit. The runs below are `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh <absolute scratch dir> <files>` from the worktree, after `source explorations/experiment/env.sh`.

1. `bc4ca0888` promotes `XXXGenericBesidePlainTwoBounds.fss` by `git mv` to `GenericBesidePlainTwoBounds.fss`. The component name and the comment line change, and the first assertion gains a section citation. Run on the base (tree `fa14a190c`):

        . interpret .../GenericBesidePlainTwoBounds
         UNEXPECTED exception
        with generic type, at least one pair of parameters must have excluding types
        Tests run: 1,  Failures: 1,  Errors: 0

2. `f7731ce05` is the key alone. It was shown both ways on stand-ins before it was committed (section 3).
3. `88af50016` is row 551's test, `ComprisesUnlistedExtender.fss` with its key. Run on the key's commit (tree `f7731ce05`, walk unchanged):

        . interpret .../ComprisesUnlistedExtender
        f(S)
         Missing expected refusal at load
        Tests run: 1,  Failures: 1,  Errors: 0

4. `8c554438a` holds the three expected failures of rows 534, 544 and 549 (section 6).
5. `c6aa596cd` is `GenericBesidePlainOverlapShapes.fss`, for row 552's other shapes. It was written while the first edit sat uncommitted in the worktree, after that edit had been built (the build at 22:12-22:13, the test at 22:16), so it was seen failing on the base's code before the fix commit but after the fix was built (the gather, correction 4; `SKEPTIC.md` section 1). It was run in the rung's copy of the base (`FORTRESS_HOME=/home/user/fortress-walkload-base bash .../harness-one.sh ...`, tree `fa14a190c`):

        . interpret .../GenericBesidePlainOverlapShapes
         UNEXPECTED exception
        boxed[\T\](x:Box[\T\],y:FortressLibrary.ZZ32):FortressLibrary.String ... has a parameter
        with generic type, at least one pair of parameters must have excluding types
        Tests run: 1,  Failures: 1,  Errors: 0

6. `4b2d97c75` is row 552's edit. It was built once. The two row 552 tests and eleven batch 7b tests of the overlap reading were run on that build; the harness header names tree `c6aa596cd`, whose working tree held exactly this edit:

        . interpret .../GenericBesidePlainOverlapShapes  OK (time = 552ms)
        . interpret .../GenericBesidePlainTwoBounds  OK (time = 188ms)
        OK (13 tests)

7. `0cf9834c1` is `ComprisesGenericChildUnlistedExtender.fss`, the closure check's rule for a generic child. It was written while the closure check was built but uncommitted, after it had been built four times (22:20 to 22:40), so it too was seen failing on the base's code after its fix was built. Its first version declared `f(x: A)` beside `f(x: B)` and was refused on the base for that unrelated pair (22:42:27); it was rewritten before the run below (the gather, correction 4; `SKEPTIC.md` section 1). Its failure before the edit was shown with the key's harness classes over the base's walk: `tmp/rung-walk-load-check/harness-key-on-base.sh` is `harness-one.sh` with the key's `FileTests` classes first on the base's classpath, so nothing was built:

        # harness-one ...; tree fa14a190c; ...
        . interpret .../ComprisesGenericChildUnlistedExtender
         Missing expected refusal at load
        Tests run: 1,  Failures: 1,  Errors: 0

8. `524852baf` is the closure check. Its build was run on twenty-two tests, all passing (header tree `0cf9834c1`, working tree holding exactly this edit):

        . interpret .../ComprisesUnlistedExtender  OK Saw expected refusal at load
        . interpret .../ComprisesGenericChildUnlistedExtender  OK Saw expected refusal at load
        . interpret .../extendNumber  OK (time = 324ms)
        OK (22 tests)

9. `6e192f7f3` adds the guard `ComprisesEligibleExtenders.fss`, which gives `OK (1 test)` on both the base and the edit, and the expected failures of rows 22 and 487 (section 7).

Builds: six runs of `ant compileAll`, one per code state:
- the key;
- row 552;
- the closure check four times:
  - first without resolving a `VarType` (walk spells a trait with no static arguments that way in an `extends` clause), so it refused nothing;
  - then reading each component's own clauses, which refused the library's `Reflect` (section 5);
  - then reading the main component's clauses only;
  - last with an arity guard.

`default_repository/caches/global.map` was restored after each.

## 3. The key

**Where the precedent is.** The compiled harness reads a test's keys from a properties file beside it. At the base, `TestTest` and `CommandTest` read `Name.test` (`FileTests.java:702-703`), and `TestTest` also reads `Name.timing` beside a test (`:548`). It judges an output or an exception against `pfx + which + _contains` and its siblings (`generalTestFailed`, `:129-275`), and 13 compiled tests key an exception by `compile_exception_contains`. The interpreter harness had no key. `InterpreterTest` inherits `BaseTest.testFailed`, which answers `null` (`:111-113`). So a file of `tests/` was judged only by whether it throws, and an `XXX` file by whether it throws at all (`:341-366`).

**What it is.** `InterpreterTest.loadRefusalKeys` reads `Name.test` beside `Name.fss` when there is one and keeps its `load_` keys, composed with the project's properties as the compiled keys are (`FileTests.java:835-863`). A file with no such key is judged exactly as before. With a key, `SourceFileTest.refusalVerdict` judges the run (`:470-515`). The program counts as refused as named when two things hold:
- it threw while walk built its environments: `thrownAtLoad` finds a frame of `Driver.evalComponent` in the exception or its causes (`:865-879`);
- `generalTestFailed("load_", ...)` finds the keys met.

**Why the `XXX` reading is not the compiled one.** In `compiler_tests/`, an `XXX` file with `compile_err_contains` demands that the compile fail with that message, so it gates a refusal that happens. An over-acceptance cannot be gated there: an `XXX` compile test whose program compiles is red (FACTS, "An `XXX` compile test pinned by `compile_err_contains` whose program compiles"). The same held for walk: a program walk wrongly loads fails on its call today and would still fail once refused (batch 7b's review, finding 7). Here the key says what the specification asks, a refusal at load:
- The plain name gates the refusal.
- The `XXX` name gates its absence. It is green while walk loads and runs the program cleanly, and red the day walk refuses it; the file is then promoted by `git mv`.
- An `XXX` file is also red on any other failure, so it cannot stay green when the program fails for another reason than the refusal it names.

**Shown both ways before it was committed.** The stand-ins are in `tmp/rung-walk-load-check/keydemo/`: ten programs over `trait Aa` and `trait Bb`. Some declare `f(x: Aa)` beside `f(x: Bb)`, which walk refuses with "... are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present". The others declare `f(x: Aa)` beside `g(x: Bb)`, which walk loads. One run of `harness-one.sh` over all of them:

    . interpret .../KeyRefused  OK Saw expected refusal at load
    . interpret .../KeyLoads  Missing expected refusal at load                       (red)
    . interpret .../XXXKeyLoads  Saw expected failure: loaded and ran, not refused at load
    . interpret .../XXXKeyRefused  Refused at load as its keys name                  (red)
    . interpret .../XXXKeyRefusedOther  Refused at load, but did not satisfy load_exception_contains (red)
    . interpret .../XXXKeyRunFails  Failed after load                                (red)
    . interpret .../KeyRefusedOther  Refused at load, but did not satisfy load_exception_contains (red)
    . interpret .../NoKeyLoads  OK (time = 340ms)
    . interpret .../XXXNoKeyRefused  OK Saw expected exception

One more stand-in: a plain test keyed `load_exception_contains=FailCalled`, whose `run` throws `FailCalled`. The exception's text holds the key, but the run threw it, not the load, and the harness reports ` Failed after load`, red.

A failure while the top-level variables are initialized counts as a refusal at load: `Driver.evalComponent` initializes them (`cw.initVars()`, `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:244`), and `thrownAtLoad` finds that frame. The skeptic's `SkKeyTopInit`, a plain test keyed `load_exception_contains=FailCalled` that calls `fail` in a top-level variable's initializer, gives ` OK Saw expected refusal at load` (the gather, correction 3; `SKEPTIC.md` section 2). Only a failure in `run` is judged "Failed after load".

The key moves the `testSystem` shards. A `Name.test` file is listed beside the `.fss` files and skipped ("Not compiling file ..."), and the gate compares the shards' sum (FACTS, "`testSystem`'s four shards are one suite split by sorted index").

## 4. Row 552: the overlap reading of a generic beside a plain declaration

**What batch 7b built.** Its lift reads a generic declaration beside a plain one on their declared domains. Where neither domain lies inside the other, it asks that declarations below both cover the overlap (`validOnDeclaredDomains`, `OverloadedFunction.java:693-722`). The overlap was read by instantiating the generic at its bounds. That holds every value of the generic only when each type parameter is a whole parameter type with at most one bound naming no static parameter, and any other generic was refused (`genericOverlapCovered` at the base, `:736-763`).

**What the edit reads.** Each parameter of the generic is read as the types whose intersection holds every value it takes in any instance (`:728-778`):
- a type parameter as its bounds that name no static parameter, or `Any` when none is left;
- a type that mentions a static parameter as `Any`;
- any other type as itself.

A non-type static parameter is no longer a reason to refuse, and a single parameter of tuple type is read by its elements.

**How it is cut.** `overlapCoveredBy` (`:834-903`) takes these sets. `intersectionPieces` (`:917-976`) cuts the intersection of any number of types by the `comprises` clauses, as `overlapPieces` cuts two. For two types it is `overlapPieces` itself, so every pair of plain declarations, and every generic of the shape read before, is read exactly as before.

**Why it is sound.** Each reading holds every value of the generic; it is an over-approximation where a parameter mentions a static parameter. A cover still has to lie inside an instance of the generic (`instanceHolding`), so the reading only loads sets whose overlap is covered.

Programs in `tmp/rung-walk-load-check/p552/`, each run with `bin/fortress P.fss` on the edit and in the base copy:

| program | base | edit |
|---|---|---|
| `NatParam` (`w[\T extends Aa, nat n\](x: T, y: ZZ32)`, a plain pair and their meet) | refused, "with generic type, ..." | `meet`, `bothAny` |
| `InsideTrait` (`w[\T\](x: Box[\T\], y: ZZ32)` beside `w(x: IntBox, y: Any)`, meet on `IntBox, ZZ32`) | refused | `meet`, `generic`, `intBoxAny` |
| `FBoundTrait` (`w[\T extends Ord[\T\]\](x: T, y: ZZ32)`, traits `Pt`, `Qt`) | refused | `meet`, `generic`, `ptAny` |
| `InsideTraitUncovered` (no meet) | refused | refused, same message |
| `TwoBoundsUncovered` (no meet) | refused | refused, same message |
| `TwoBoundsExcluding` (overlap empty by an exclusion) | `generic`, `cAny` | the same |

The sets that now load are those of the table's first three rows and of `GenericBesidePlainTwoBounds`. With an object instead of a trait in the type parameter's place (`InsideType`, `FBound`), the base already loads them. Its parameter-by-parameter check finds `Box[\T\]` and the object excluding through instantiation exclusion before the lift is reached.

## 5. Row 551: the closure check

**What the text says.** `Specification/basic/traits.tex:235-252` (section "Trait Declarations", the 2012 reading since climb batch 7C):
- every type listed in a `comprises` clause of `T` extends `T`;
- every value of `T` is a value of a listed type;
- "A trait or object that explicitly extends `T` must be a subtype of a listed type, unless it is a trait with a `comprises` clause of its own each of whose listed types meets this requirement, or a trait with static parameters such that at least one trait or object extends it and every trait or object that extends it is a subtype of a listed type";
- for a generic `T`, these hold of each instantiation, with its static arguments substituted.

**What the checker does** (`TypeHierarchyChecker.scala:154-237`, `:257-287`). For each declaration, and each trait in its `extends` clause with a non-ellipsis clause substituted by that clause's static arguments, the declaration is eligible when one of these holds:
- its self type is below a listed type;
- it is a closed trait each of whose listed types is eligible;
- it is generic, and every type the trait table knows to extend it immediately is below a listed type (`everyKnownSubtypeListed`).

Otherwise it refuses with "Invalid comprises clause: S has a comprises clause but its immediate subtype Z is not eligible to extend it".

**What walk did.** It records a clause (`BuildEnvironments.finishTrait`, `:884-906`) and checked no closure. Three sites trust the closure:
- exclusion through the transitive clauses (`FType.java:283-296`);
- the overlap reading's cut by a clause in `overlapPieces` (`OverloadedFunction.java:1000-1001`);
- the same cut in the new `intersectionPieces` (`:956-963`).

**The check** is `BuildEnvironments.checkComprisesClauses` and the class `ComprisesCheck` (`:1052-1352`), called at `Driver.java:227`. That is after every component's types are built and before the functional methods and overload sets are finished, so a broken clause is refused before any load check trusts it.
- It reads the declarations as written, as the checker reads its indexes: every trait and object declaration of every component of the program.
- Their `extends` and `comprises` entries become terms (`termOf`, `:1288-1344`; `Term.with`). Walk resolves the names in the declaration's environment: `Environment.getType` for a `TraitType`, and `getTypeNull` for a `VarType`, which is how walk's syntax spells a trait with no static arguments. Static parameters become positions, substituted when a term is read through another declaration.
- Subtyping is the declarations' `extends` clauses read transitively, with substitution (`subtype`, `:1260-1270`).
- For every explicit extension of a trait with a clause declared in the main component (`:1186`), the extender must meet one of the three rules (`ineligible`, `:1200-1223`):
  - it is a subtype of a listed type;
  - it is a trait whose own clause lists only such types or such traits (`closedAndCovered`);
  - it is a generic trait that at least one trait or object of the program extends, every one of them immediately (as the checker reads it) a subtype of a listed type, with the generic's static parameters replaced by that extender's arguments.
- The refusal carries the checker's words and, for a generic child, the extender that breaks it: "Invalid comprises clause: AnyI has a comprises clause but its immediate subtype I is not eligible to extend it; C extends it and is a subtype of none of the types the clause lists".

**Why the main component only (decision 6).** The check was first built to read every component's clauses against extenders of the same component. It was then measured over the whole library and the corpus with the same class. `tmp/rung-walk-load-check/jt/Enum.java` loads a program and lists every explicit extension of a closed trait that the rules refuse, whatever the scope:

    === Reflect
    BREACH same Reflect.Reflect extends Reflect.Type
    closed-trait extensions: 50 (same unit 41), units 19
    === extendNumber
    BREACH cross extendNumber.Infinity extends FortressLibrary.Number
    === atomicList
    BREACH cross atomicList.ListError extends FortressLibrary.Exception

The library was measured by one program importing each api (`tmp/rung-walk-load-check/jt/enum-all.sh`). GeneratorLibrary and CompilerAlgebra are refused by walk's front end, and PrefixMap by an overload refusal the base shows too. Over the 41 apis that reach the check, the library has one breach: `object Reflect[\T\]() extends Type` (`Library/Reflect.fss:304`), an internal object below none of the six types `Type` lists (`Library/Reflect.fss:19-21`; the same list is in `Library/Reflect.fsi:9-11`).

Reading the library's clauses would refuse at load every program that imports `Reflect`. That includes three tests, `ReflectTest.fss`, `ReflectiveNumberTypes.fss` and `ReflectiveQuickCheckTest.fss`. Measured with the build that read each component's own clauses:

    . interpret .../ReflectTest
     UNEXPECTED exception
    Invalid comprises clause: Type has a comprises clause but its immediate subtype Reflect is not eligible to extend it

Reading them across components would also refuse four team tests whose objects extend the library's `Number` or `Exception` directly (`tests/extendNumber.fss:17`, `tests/extendException.fss:17`, `tests/atomicList.fss:24`, `tests/typeTests.fss:15`), and two demos (`demos/tictactoe.fss:29`, `demos/newtictactoe.fss:26`). The `Enum` lines for all six are in `tmp/rung-walk-load-check/jt/enum-teamtests.log`.

The text refuses each of them, and so does the checker over the one library, though not the compiled run (the gather, correction 2; `SKEPTIC.md` section 5): the compiled prelude's `Number` has no `comprises` clause (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:510`), so row 22's program compiles and runs, printing `Value`, rc=0, and the checker refuses it only over the one library (`Library/FortressLibrary.fss:360-361`). `Number`'s closure is the library's, since the specification's prose gives `Number` no clause (`Specification/basic-lib/numbers.tex`, "siblings under the trait Number"); `Exception`'s is the prose's:
- `Number`'s clause is `Library/FortressLibrary.fss:361`;
- `Exception`'s is `:1620`, with `Specification/basic/exceptions.tex:73-74`: "Every exception is a subtype of either type `CheckedException` or `UncheckedException`".

Refusing a library type or team tests at load is a stop of this rung, and it turns the gate red. So the check reads only the main component's clauses, and the wider reading goes to Pavol (section 12).

**What it now refuses and loads.** Programs in `tmp/rung-walk-load-check/p551/`, each run with `bin/fortress P.fss` on the edit and in the base copy. The base loads every one:

| program | edit |
|---|---|
| row 551's (`ComprisesUnlistedExtender`) | refused, "S has a comprises clause but its immediate subtype Z ..." |
| `IntegralShape` (`AnyIntegral`'s shape: `I[\X\]` unlisted, extended by the listed `A` and `B`) | loads |
| `IntegralShapeUnlisted` (and `trait C extends I[\C\]`) | refused, "...; C extends it and is a subtype of none of the types the clause lists" |
| `GenericChildNoExtender` (an unlisted generic child nothing extends) | refused, "...; no trait or object extends it" |
| `GenericListed` (`Some[\T\] extends Opt[\T\]`, listed at its own parameters) | loads |
| `GenericListedSwapped` (`PairOf[\K, V\] extends Pair[\V, K\]`, whose clause lists `PairOf[\V, K\]`) | refused |
| `GenericObjectUnlisted` (the `Reflect` shape in the program) | refused |
| `OwnClauseCovered` (`M` lists only a type below a listed one; `N` lists an unrelated type) | refused at `N`; `M` passes |
| `ListedViaSupertype` (`Low` below a listed type through `Mid`) | loads |
| `Row22Value` (`object Value extends Number`) | loads (the library's clause) |
| `Row487MyIntegral` (`trait MyIntegral extends Integral[\MyIntegral\]`) | loads (the library's clause) |

Not checked:
- the clause's other half, that each listed type extends the trait. The soundness of walk's reading does not need it: a listed type outside `T` only widens the overlap walk must cover;
- a clause declared in any component other than the main one;
- object expressions, which the checker's trait table does not hold either.

## 6. Rows 534, 544 and 549: expected failures by the key

Each file asserts the refusal at load the specification settles, and walk loads and runs each today. The named message is walk's own message for the rule where walk has one, so the repair can reuse it, and the checker's otherwise:

- **`XXXOverloadSingleParamBoundAny`** (row 534; `Specification/advanced/overloading.tex`, section "Principles of Overloading", `:134-150`). `f[\T extends Any\](x: T)` beside `f(x: ZZ32, y: ZZ32)`. Key "A functional which takes a single parameter of a parametric type bound by Any", the checker's words (`OverloadingChecker.scala:430-439`); walk has none.
- **`XXXFunctionalMethodMeetInherited`** (row 544; section "Meet Rule", paragraph "The Meet Rule for Functional Methods", `:469-486`). `trait V extends { S, T }` inherits `tag(self)` from two open traits and has no declaration on their meet. Key "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present", walk's words for two declarations that overlap with nothing excluding or covering them. The row's own program used closed traits; two open traits are the core.
- **`XXXGenericBesidePlainSameDomain`** (row 549; sections "Subtype Rule", `:184-201`, and "Declarations with Static Parameters", `:541-563`). `tie[\T extends Wide\](a: T, b: T)` beside `tie(a: Wide, b: Wide)`. Key "fails because their parameter lists have the same types", walk's words for two declarations with equal parameter types.

On the key's commit (tree `88af50016`):

    . interpret .../XXXOverloadSingleParamBoundAny  Saw expected failure: loaded and ran, not refused at load
    . interpret .../XXXGenericBesidePlainSameDomain  Saw expected failure: loaded and ran, not refused at load
    . interpret .../XXXFunctionalMethodMeetInherited  Saw expected failure: loaded and ran, not refused at load
    OK (3 tests)

Each goes red on a stand-in that walk refuses with the named message, the stand-in carrying the same `.test`. The stand-ins are in `tmp/rung-walk-load-check/standins/`:
- `tag(s: S)` beside `tag(t: T)` as top-level functions;
- `tie(a: Wide, b: Wide)` twice;
- a top-level `refusal: ZZ32 = "A functional which ..."`, refused at load with "Type mismatch binding ...".

The run:

     Refused at load as its keys name     (three times)
    Tests run: 3,  Failures: 3,  Errors: 0

## 7. Rows 22 and 487: expected failures for the clauses the check does not read

- **`XXXComprisesLibraryTraitUnlistedExtender`** is row 22's program, which is also the team test `extendNumber.fss`: `object Value extends Number`. Key "Invalid comprises clause: Number has a comprises clause but its immediate subtype Value is not eligible to extend it". The checker refuses it over the one library only: the compiled run, over the compiled prelude's open `Number` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:510`), prints `Value`, rc=0 (the gather, correction 2).
- **`XXXComprisesGenericChildAcrossComponents`** is row 487's program: `trait MyIntegral extends Integral[\MyIntegral\]`. Key "... AnyIntegral has a comprises clause but its immediate subtype Integral is not eligible to extend it; MyIntegral extends it and is a subtype of none of the types the clause lists". The check counts a generic child's extenders across the whole program, so it gives this message the day it reads `AnyIntegral`'s clause.

Both give `Saw expected failure: loaded and ran, not refused at load` on the edit (tree `524852baf`). Both go red on stand-ins refused with the named text: `Tests run: 4,  Failures: 2`, the two failures being the stand-ins.

## 8. The interpreter suite

Run once, after the last edit, on the code of `524852baf` (tree `6e192f7f3`), with `tmp/rung-walk-load-check/corpus.sh`. That is `SystemJUTest` over `ProjectFortress/tests/` in two shards (`-Dfortress.suite.shard=0/2` and `1/2`), with private caches, `-Xmx768m -Xss32m` and `FORTRESS_THREADS=1`:

    # corpus shard 0/2 2026-10-02T22:50:10Z; tree 6e192f7f3; code 524852baf
    OK (246 tests)
    # corpus shard 1/2 2026-10-02T22:50:10Z; tree 6e192f7f3; code 524852baf
    OK (243 tests)

The 489 tests are batch 8's gated 480 (`climb-batch-8/gate/summary.txt`, `system-0` to `system-3`: 122 + 120 + 119 + 119) plus the nine new `.fss` files. Among them:
- the two refusal tests give `OK Saw expected refusal at load`;
- the five keyed `XXX` files give `Saw expected failure: loaded and ran, not refused at load`;
- the library types and the team tests of section 5 pass.

The key changes how every file of the suite is judged. A file without a `Name.test` takes the old path unchanged, so this run is also the key's check over the corpus.

## 9. The checker count and the distance

Not run, and unchanged. The rung changes paths under:
- `ProjectFortress/tests/`;
- `ProjectFortress/src/com/sun/fortress/tests/`;
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`;
- `explorations/`;
- plus `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java`, walk's driver.

The stages do not run walk's driver either. Both run `Shell.compilerPhases` over the library (FACTS, "The checker-count and distance stages read only the compiler's phases ..."). The only ways into `Driver.evalComponent` are `Driver.runProgram` and `Driver.runTests`, and outside `interpreter/` those are called only by walk's commands (`Shell.java:621`, `:1221`) and by the test harness (`FileTests.java:815-822`).

The ladder subset was not run either. The compiled path reads none of the changed code, and no ladder file's recorded first error names a name this rung adds.

## 10. What the specification settles

- **Row 551 and the check:** `Specification/basic/traits.tex:235-252`, read in full above. The eligible forms are the text's; the checker's reading of the generic child (immediate extenders, at least one) is `TypeHierarchyChecker.scala:275-287`.
- **Row 552:** `Specification/advanced/overloading.tex:531-563`: "A declaration with static parameters is read as one declaration whose parameter type ranges over every instance of it whose static arguments satisfy their bounds". The Meet Rule there asks for "some declaration of the set ... more specific than both and applicable to every call to which both are applicable", which the covering declaration is in each test.
- **Rows 534, 544 and 549:** the passages of section 6.
- **Rows 22 and 487, the team tests and `Reflect` of section 5:** `traits.tex:241-248`; for `Exception`, also `Specification/basic/exceptions.tex:58-74`.

## 11. Decisions

1. **The key's form is a `.test` file beside the `.fss`.** Considered: a key in the program's comment, which would make a second comment line in a test (the corpus allows one); a new file extension. Chosen: the compiled tests' own format and evaluator (`StringMap.FromFileProps`, `generalTestFailed` with prefix `load_`). The `.timing` file beside a test is the precedent.
2. **An `XXX` file with the key passes only when the program loads and runs cleanly.** Considered:
   - the compiled reading, where an `XXX` file demands the refusal; under it, rows 534, 544 and 549 could not be expected failures;
   - "any outcome but the refusal", under which an `XXX` file would stay green on another failure, which is a stop of the record.

   Evidence: the stand-ins of section 3.
3. **"At load" means under `Driver.evalComponent`.** Considered: the message alone, as the compiled keys judge it. But a run-time exception can carry the text (the `FailCalled` stand-in), and walk's load checks all run under `evalComponent`. So does the initialization of the top-level variables (`Driver.java:244`): a failure there counts as a refusal at load, and only a failure in `run` as "Failed after load" (the gather, correction 3; `SKEPTIC.md` section 2, `SkKeyTopInit`).
4. **The overlap reading over-approximates rather than instantiating symbolically.** Considered: reading a type that mentions a static parameter over symbolic instances. `Any` in its place is sound, since a cover still has to lie inside an instance, and it adds no instance at load. It refuses what it cannot cover.
5. **The closure check reads declarations, not types.** Considered: walk's types (`FType.subtypeOf`, `getComprises`). A generic declaration has no type until it is instantiated. Instantiating one at symbolic arguments at load registers the functional methods of a generic object's instance among the top-level overloads (`FTraitOrObjectOrGeneric.java:111-123`; only a trait instance with symbolic arguments is marked symbolic, `FTypeTraitInstance.java:50`), which could change which sets load. Reading the declarations is what the checker does.
6. **The main component's clauses only.** Considered: every clause of the program, as the text and the checker read them; every clause against extenders of its own component. Both refuse the library's `Reflect` (section 5), and the first also four team tests; both meet this rung's stops and turn the gate red. Reading the main component's clauses repairs row 551 for the main component only, and leaves the library's clauses to Pavol. Row 551's scope, "within one" component, is any component: its program inside another component of the user's program still loads under walk and dispatches to `f(S)` (the skeptic's `SkNonMain551`), and so does an object expression that extends both closed traits (`SkObjExpr551`), so row 551 stays open for both, the second also row 597 (the gather, correction 1; `SKEPTIC.md` sections 3 and 8). A third scope, every component outside the library, would refuse neither `Reflect` nor the team tests and close the first case; it was not considered here and goes to Pavol.
7. **The check runs after the types and before the overload sets.** Considered: placing it in `BuildTopLevelEnvironments`'s third pass, which sees one component. The check needs every component's types and must come before the overload checks that trust a clause.
8. **The named messages of rows 534, 544 and 549** (section 6): walk's words where walk has the rule, the checker's otherwise.
9. **A generic child that nothing extends is refused**, as the text's "at least one trait or object extends it" and the checker's `subs.nonEmpty` read.
10. **Extra tests.** The guard `ComprisesEligibleExtenders` passes before and after the edit: it is not a failing-first test, it holds the forms the check must load. Row 551's generic-child refusal got its own failing-first test (`0cf9834c1`).

## 12. For Pavol

- **Reading the library's comprises clauses at load.** The text and the checker read them; walk now reads only the main component's. Reading all of them refuses at load:
  - every program importing `Reflect`, because of the library's `object Reflect[\T\]() extends Type` (`Library/Reflect.fss:304`), which is below none of `Type`'s listed types. That is three tests;
  - four team tests and two demos whose objects extend `Number` or `Exception` directly (section 5).

  The repairs are:
  - a library edit: `Reflect` below a listed type, or `Type`'s clause revised;
  - team-test edits: extend `UncheckedException`, and for `extendNumber`, a listed numeric type;
  - then the scope widened at `BuildEnvironments.java:1186`.

  On that day `XXXComprisesLibraryTraitUnlistedExtender` and `XXXComprisesGenericChildAcrossComponents` go red, to be promoted. New rows 595 and 596.
- **The key's form and its `XXX` reading** (section 3).
- **What the check now refuses, and the sets the overlap reading now loads** (sections 4 and 5).

## 13. Homes of the measured defects

| defect | home | where |
|---|---|---|
| row 552, two bounds | 1 | `tests/GenericBesidePlainTwoBounds.fss` (promoted) |
| row 552's other shapes: a parameter inside a type, an F-bound, a nat parameter | 1 | `tests/GenericBesidePlainOverlapShapes.fss` |
| row 551, an unlisted extender of the main component's closed traits | 1 | `tests/ComprisesUnlistedExtender.fss` + `.test` |
| row 551, a generic child with an unlisted extender | 1 | `tests/ComprisesGenericChildUnlistedExtender.fss` + `.test` |
| row 534 | 2 | `tests/XXXOverloadSingleParamBoundAny.fss` + `.test` |
| row 544 | 2 | `tests/XXXFunctionalMethodMeetInherited.fss` + `.test` |
| row 549 | 2 | `tests/XXXGenericBesidePlainSameDomain.fss` + `.test` |
| row 22, a program's object below none of a library clause's types | 2 | `tests/XXXComprisesLibraryTraitUnlistedExtender.fss` + `.test` |
| row 487 under walk, a program's extender of a library generic child | 2 | `tests/XXXComprisesGenericChildAcrossComponents.fss` + `.test` |
| the library's `Reflect[\T\]` below none of `Type`'s listed types | ledger row 595 | settled by the text, but no gated program can show it while the check does not read the library's clauses, and an `XXX` file would assert a broken library; the `Enum` lines of section 5 |
| four team tests and two demos below none of `Number`'s or `Exception`'s types | ledger row 596 | the programs are team tests; their gate is their own verdict the day the scope widens; the `Enum` lines of section 5 |
| row 551 in another component of the program than the main one (the skeptic's `SkNonMain551`, added at the gather) | the row alone | row 551 stays open; no file of `tests/` can hold a program of two components |
| an object expression that extends a closed trait unlisted (the skeptic's `SkObjExpr551`, added at the gather) | 2 | `tests/XXXComprisesObjectExpressionUnlisted.fss` + `.test`, row 597 |
| a listed type that does not extend each instantiation of a generic closed trait (the skeptic's `SkGenericChildListed`, added at the gather) | 2 | `tests/XXXComprisesListedTypeExtendsEachInstance.fss` + `.test`, row 598 |

## 14. Inherited and not done

Nothing was inherited: the branch was cut fresh at the base, and every commit is this run's.

Not done:
- reading the library's clauses (section 12);
- the clause's other half, that listed types extend the trait;
- object expressions.

The harness refused this agent's write of `REPORT.md` and `record.md`; their text is carried in the structured result.
