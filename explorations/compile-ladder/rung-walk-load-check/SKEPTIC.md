# Skeptic: rung K, walk's load check (first judgement)

Judged head: `6e192f7f33c6c73ea43853990575bde85d7107af` on `wip/rung-walk-load-check`.

Verdict: **approved, with required corrections.** The three pieces do what the report says, each test was committed alone and seen failing on the base's code before its fix, and the suite run is of the head's code. The corrections are to the record: row 551 is repaired for the main component's clauses only. Two programs of mine show row 551's wrong dispatch still under walk at the head, and the report says the row's own scope is repaired. Three other statements of the report are also wrong.

## 1. The order of work (check 3)

Read in the worker's transcript (`agent-a96efb9f64cf35a36.jsonl`), by time (UTC) and call id:

- `bc4ca0888` (21:50:31, `jCqPSp`): the promoted `GenericBesidePlainTwoBounds.fss`, alone. It was seen failing at 21:50:08 (`gN4yeG`, harness header `tree fa14a190c`): ` UNEXPECTED exception` / `with generic type, at least one pair of parameters must have excluding types` / `Tests run: 1,  Failures: 1,  Errors: 0`. That is before row 552's edit (22:11) and its build (22:12-22:13).
- `f7731ce05` (21:55:32): the key alone. It was built at 21:52 (`4EBW79`) and shown on the stand-ins at 21:54:22 (`77BxHi`) and 21:55:06 (`Hnpwj2`): `Tests run: 10,  Failures: 6`, the six red ones being `XXXKeyRefused`, `KeyLoads`, `XXXKeyRefusedOther`, `KeyRefusedOther`, `KeyRunThrowsMessage` and `XXXKeyRunFails`, as the report's section 3 lists them.
- `88af50016` (21:56:41, `xUXZzJ`): `ComprisesUnlistedExtender.fss` and `.test` alone. They were seen failing at 21:56:16 on the key's commit, walk unchanged (`goSB4s`): `f(S)` / ` Missing expected refusal at load` / `Tests run: 1,  Failures: 1`.
- `c6aa596cd` (22:16:59): `GenericBesidePlainOverlapShapes.fss` alone, before the fix commit `4b2d97c75` (22:17:40). It was **written after row 552's edit was built** (build at 22:12:14-22:13:40, `Bf1DbQ`; test at 22:16:27, `wuMzjZ`). It was run in the rung's base copy (`FORTRESS_HOME=/home/user/fortress-walkload-base`, header `tree fa14a190c`): ` UNEXPECTED exception` / `with generic type, ...` / `Tests run: 1,  Failures: 1`.
- `0cf9834c1` (22:43:40): `ComprisesGenericChildUnlistedExtender` alone. It was **written after the closure check had been built four times** (22:20 to 22:40). Its failure was seen at 22:43:05 (`6VkM6k`) with the key's `FileTests` classes over the base's walk: ` Missing expected refusal at load` / `Tests run: 1,  Failures: 1`. Its first version, which declared `f(x: A)` beside `f(x: B)`, was refused on the base for that unrelated pair (22:42:27, `xdSLgW`) and was rewritten. The report does not say so.
- `524852baf` (22:47:08): the closure check. The last build of the code was at 22:44:43-22:46:18 (`nFMXYK`), with no edit after it. The 22-file run at 22:46:26 (`5ENrR1`) gave `OK (22 tests)`.
- The interpreter suite was run once, after the last code commit, on `code 524852baf` (tree `6e192f7f3`, `tmp/rung-walk-load-check/corpus-0.log` and `corpus-1.log`): `OK (246 tests)` and `OK (243 tests)`, each ending `EXIT=0`.

The build in the worktree (`BuildEnvironments.class` 22:46:09, `FileTests.class` 22:46:16) is the head's code. Every fix had a test that was seen failing before the fix was first built: `GenericBesidePlainTwoBounds` for row 552 and `ComprisesUnlistedExtender` for row 551. The two later tests were seen failing on the base's code before their fix commits, though after the fixes were built. That is a finding, not a ground to refuse.

## 2. The key against the compiled harness's keys

The key reads `Name.test` with `java.util.Properties`, keeps the `load_` keys and composes them with `ProjectProperties` (`FileTests.java:840-862`). It judges them with the compiled tests' own `generalTestFailed("load_", ...)` (`FileTests.java:491`). The compiled harness reads its keys with `StringMap.FromFileProps` and judges them with `generalTestFailed(command + "_", ...)` (`FileTests.java:702-703` at the base). The form is the same and the evaluator is the same.

The compiled harness and the key read an `XXX` name differently. A compiled `XXX` test with `compile_err_contains` passes when the compile fails with that text. A tests/ `XXX` file with a `load_` key passes only when the program loads and runs clean (`FileTests.java:493-494`). Under this reading:
- an `XXX` file asserts the refusal the specification asks for, and is an expected failure while walk loads the program, as home 2 asks;
- it goes red when walk refuses as named, or when the program fails in any other way. So the record's stop, "a key that lets an `XXX` file pass when the program fails for another reason than the refusal it names", is not met.

My own probes of the key, run with `harness-one.sh` on the rung's build (`tmp/rung-walk-load-check/skeptic/key/harness.log`, header `tree 6e192f7f3`):

    . interpret .../SkKeyTopInit       OK Saw expected refusal at load
    . interpret .../XXXSkKeyTopInit    Refused at load as its keys name       (red)
    . interpret .../SkKeyFrontEnd      Failed after load / Variable undefinedThing is not defined.   (red)
    . interpret .../SkKeyTypo          OK Saw expected refusal at load

- `SkKeyTopInit` is a plain test keyed `load_exception_contains=FailCalled`. It calls `fail` in a top-level variable's initializer. A run-time failure there counts as a refusal at load, because `Driver.evalComponent` initializes top-level variables (`cw.initVars()`, `Driver.java:244`) and `thrownAtLoad` looks for that frame (`FileTests.java:870-879`). The report's decision 3 says a run-time `FailCalled` whose text met the key was judged "Failed after load". That holds only for a failure in `run`.
- `SkKeyFrontEnd`: a refusal by walk's front end, before `evalComponent`, is reported as "Failed after load". The verdict is right and the words are wrong.
- `SkKeyTypo`: a misspelled key (`load_exception_contain`) is ignored, so the plain test passes on any refusal at load. Here the refusal was an unrelated overload pair. The compiled harness has the same weakness for its own keys.

None of these changes a verdict of a test the rung adds.

## 3. The closure check against the traits chapter and `everyKnownSubtypeListed`

The paragraph read in full: `Specification/basic/traits.tex`, section "Trait Declarations", the comprises paragraph and its revision callout. The checker read: `TypeHierarchyChecker.scala:257-287`.

The check implements the text's three forms:
- a subtype of a listed type;
- a trait whose own clause lists only such types (`closedAndCovered`);
- a generic trait that at least one trait or object extends, every immediate extender being below a listed type, with the static arguments substituted by position.

The last is as `everyKnownSubtypeListed` reads it, with one difference. It substitutes by position where the checker compares spellings (row 489), so it is more exact than the checker.

My programs (`tmp/rung-walk-load-check/skeptic/`): walk with `bin/fortress P.fss` at the head and in `/home/user/fortress-walkload-base`; the compiled path with `fortress compile` and `fortress run` in the base copy, since the rung changes nothing the compiled path reads and the worktree's `bytecode_cache` is empty after its `ant compileAll`.

| program | head (walk) | base (walk) | compiled |
|---|---|---|---|
| `SkUnlistedShape`: `object Tri extends Shape`, Shape lists Circle, Square | refused, "Invalid comprises clause: Shape has a comprises clause but its immediate subtype Tri is not eligible to extend it" | `other` | refused, same words |
| `SkGenericChildListed2`: AnyIntegral's shape (`N[\X extends N[\X\]\] extends AnyN`, listed objects `N8`, `N16`) and a listed object pair | `n8 n16 no` | `n8 n16 no` | `n8 n16 no` |
| `SkGenericChildDeep`: `M extends N[\M\]` unlisted, `N8 extends M` listed | refused, "...immediate subtype N ...; M extends it and is a subtype of none of the types the clause lists" | `loaded` | refused at N |
| `SkGenericObjectChild`: `object Odd[\T\]() extends Opt[\T\]` beside the listed `Sm[\T\]`, `Nn[\T\]` (the shape of the library's `Reflect`) | refused, "Opt ... Odd" | `loaded` | refused, same |
| `SkCrossUnlisted`: `S comprises { U, V }` in the program's own component `SkClosedLib`, `object Z extends S` in main | `f(S)` | `f(S)` | refused, "Invalid comprises clause: SkClosedLib.S has a comprises clause but its immediate subtype Z is not eligible to extend it" |
| `SkNonMain551`: row 551's own set, all in the program's own component `SkLib551`, called from main | `f(S)` | `f(S)` | `SkLib551.fss` refused, "S ... Z" and "T ... Z" (4 errors) |
| `SkObjExpr551`: row 551's set in main with `z = object extends { S, T } end` | `f(S)` | `f(S)` | checker passes; code generation "emitDesc of type AND(S,T) failed" |
| `SkGenericChildListed`: adds `Expr[\T\] comprises { IntE, BoolE }`, `IntE extends Expr[\ZZ32\]` | `n8 n16 no` | `n8 n16 no` | refused, "IntE is included in the comprises clause of Expr but IntE does not extend Expr[\T\]" |

The first five rows agree with the checker, and the repair is right for them.

The rows `SkCrossUnlisted`, `SkNonMain551` and `SkObjExpr551` are the fourth outcome of rule 4. The text settles each against walk, and the repair is outside what lands:
- the first two because the check reads only the main component's clauses (`BuildEnvironments.java:1186`);
- the third because object expressions are not read.

`SkNonMain551` is row 551's own program. Row 551's note reads "the closure is row 487's across components and this row's within one". "Within one" means one component, any component. So row 551 is not closed by this rung, and decision 6's sentence "Reading the main component's clauses repairs row 551, whose own scope is one component" is wrong.

`SkGenericChildListed` is the clause's other half, which the report lists as not checked. The text ("these statements hold of each instantiation") refuses it.

Neither the decision's reason nor the stop applies to a component of the user's own program. The withheld wider readings refuse the library's `Reflect` and the team tests, both of which are the library's clauses. A reading of every component outside the library would refuse `SkCrossUnlisted` and `SkNonMain551` and leave `Reflect` and the team tests alone. Decision 6 does not consider it, and it goes to Pavol.

## 4. The overlap reading against "Declarations with Static Parameters"

The section reads a declaration with static parameters as one declaration whose parameter type ranges over its instances. The Meet Rule there asks for declarations more specific than both that cover their common calls.

The edit reads each position of the generic as an over-approximation of the values it takes in any instance:
- a type parameter as its bounds that name no static parameter;
- a type that mentions a static parameter as `Any`;
- any other type as itself.

It also asks every cover to lie inside an instance of the generic (`instanceHolding`, `OverloadedFunction.java:868-870`) and below the plain domain. So it loads only sets whose real overlap is covered.

`intersectionPieces` with two types is `overlapPieces` itself (`OverloadedFunction.java:927`), and a plain pair is passed one type per position (`OverloadedFunction.java:822-824`). So no pair read before is read differently.

My programs, the same three ways:

| program | head | base | compiled |
|---|---|---|---|
| `SkSameParamTwice` (`pick[\T extends Aa\](x: T, y: T)`, `pick(Ao, Any)`, meet `pick(Ao, Aa)`) | `meet generic aoAny` | the same | the same |
| `SkSameParamTwiceUncovered` (meet only on `(Ao, Ao)`) | refused, "with generic type, ..." | refused | refused, "Invalid overloading of pick" |
| `SkBoundNamesOther` (`rel[\U extends Aa, T extends U\](x: T, y: U)`, a bound naming another static parameter) | `meet boAny` | refused, "with generic type, ..." | `meet boAny` |
| `SkNatInType` (`sized[\nat n\](x: Vec[\n\], y: ZZ32)`) | `meet v3Any` | `meet v3Any` | `meet v3Any` |

All agree with the checker. `SkBoundNamesOther` is a shape the worker's tests do not hold, a bound naming another parameter, and it is repaired.

The question of a loud failure becoming a quiet value: refusals at load ("with generic type, at least one pair of parameters must have excluding types") of sets the specification allows now load, and each call runs the most specific declaration (`SkBoundNamesOther` prints `meet boAny`, the compiled answer). The closure check goes the other way, making walk loud where it was quiet. The `catch (RuntimeException ex)` in `termOf` (`BuildEnvironments.java:1306-1311`, `:1319-1324`) turns a name walk cannot resolve into an unresolved term, and such a term can only fail to match. No valid program of mine or of the suite was refused.

## 5. The home-2 files against their rows and passages

Each passage was read in full: `overloading.tex` sections "Principles of Overloading", "Subtype Rule", "Meet Rule" with its paragraph "The Meet Rule for Functional Methods", and "Declarations with Static Parameters"; `traits.tex` section "Trait Declarations"; `exceptions.tex` section "Types of Exceptions".

Each comment line says what its section says. Each file has one comment line and no line citation. Each `.test` holds one `load_exception_contains` key.

The compiled path on copies of the five programs:
- row 534's: "A functional which takes a single parameter of a parametric type bound by Any cannot be overloaded."
- row 544's: "Invalid overloading of tag in trait V".
- row 549's: "There are multiple declarations of tie with the same parameter type: (Wide, Wide)".
- row 22's: compiles and runs, printing `Value`, rc=0. The compiled prelude's `Number` has no `comprises` clause (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:510`).
- row 487's: "Integral is undefined".

So the report's sentence on row 22's program and the team tests, "The text refuses each of them, and so does the checker", holds for the checker over the one library (`Library/FortressLibrary.fss:360-361`), not for the compiled run.

The specification's prose does not close `Number`. `Specification/basic-lib/numbers.tex`, at "They are siblings under the trait Number", names the number types as siblings and gives no clause. The closure is the library's. `Exception`'s closure is the prose's: `exceptions.tex`, "Every exception is a subtype of either type CheckedException or UncheckedException".

`tests/extendNumber.fss:15` carries the team's comment "We ought to be able to extend the builtin type Number." This is against the clause the library has had since 2012 (`comprises { RR64 }` at `a874948ac`, `Library/FortressLibrary.fss:349-352`). Row 588's proposed repair, editing that team test, runs against its stated intent.

## 6. Library types and team tests at load

From the worker's suite run, not repeated:
- every library type and team test passes;
- `ReflectTest`, `ReflectiveNumberTypes`, `ReflectiveQuickCheckTest`, `extendNumber`, `extendException`, `atomicList` and `typeTests` are `OK`;
- only the two refusal tests give `OK Saw expected refusal at load`.

The 489 tests are the 479 `.fss` files of the base plus `concurrentPrinting.sh` (480, batch 8's gated sum) plus nine new `.fss` files. The demos are outside the suite. By reading, the demos whose own components declare closed traits (`BirdCount1m`-`r`, `Lambda`, `Words`, `aStar`, `IntegrationStats`, `turnersParaffins0`, `wordcount2`) list every extender of their clauses.

## 7. Other checks

- **Provenance block (check 2).** Every `file:line` was opened and says what the block says. The `historical:` line names all four files of the 2012 tree the diff edits.
- **Competing declarations (check 7).** None. No new component name exists elsewhere under `ProjectFortress/`, and the new Java names (`checkComprisesClauses`, `ComprisesCheck`, `intersectionPieces`, `loadRefusalKeys`, `thrownAtLoad`, `refusalVerdict`) occur only in the four edited files.
- **No count table (check 10).** `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java` is outside the paths the rule allows without a table. The report's section 9 gives the reason. I checked it: outside `interpreter/`, `Driver` is called only from `Shell.eval` (`Shell.java:621`), the test command (`Shell.java:1221`) and `FileTests`. Neither stage can read the change.
- **Decisions on record (check 12).** The landed text agrees with "`AnyIntegral`'s closure and how the checker reads `comprises`" (`everyKnownSubtypeListed`, at least one extender) and with "The static-parameter sentence goes" (walk by declared domains). The batch record's intro lifts the stop "the clause and walk stay as they are" for this rung.
- **Threads.** The rung touches no mutable state. Walk ran at the default thread count and the harness at `FORTRESS_THREADS=1`.

## 8. Required corrections

1. Row 551 is not closed by this rung. The record says it is repaired for the main component's clauses only. The row stays open (or a new row is opened) for two cases, quoting `SkNonMain551` and `SkObjExpr551` (both print `f(S)` under walk at `6e192f7f3`):
   - a clause and its unlisted extender in another component of the program;
   - an object expression that extends a closed trait unlisted.

   Decision 6's sentence in the report ("Reading the main component's clauses repairs row 551, whose own scope is one component") is corrected to say this.
2. The report's section 5 sentence "The text refuses each of them, and so does the checker", and the matching divergence for row 22's program and the team tests, say that the compiled run of row 22's program prints `Value`. The compiled prelude's `Number` is open (`CompilerBuiltin.fss:510`), and the checker refuses the program only over the one library.
3. Decision 3 and section 3 of the report say that a failure while top-level variables are initialized counts as a refusal at load (`Driver.java:244`; `SkKeyTopInit`).
4. The report's step 7 says that the first version of `ComprisesGenericChildUnlistedExtender` was refused on the base for its unrelated `f(x: A)`, `f(x: B)` pair and was rewritten. Steps 5 and 7 say each test was written after its fix was built.
