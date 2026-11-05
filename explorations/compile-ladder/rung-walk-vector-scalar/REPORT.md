# Rung W, climb batch 26: walk's half of row 804

- problem: walk refused at load a program's generic operators between an array of a number type and a number beside a self-typed additive group's own operator, 'with generic type, at least one pair of parameters must have excluding types' (row 804; the planner's probe, `explorations/coordinator/CLIMB-BATCH-26.md:375-383`), at `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:780` at the base, where `validOnDeclaredDomains` returned `NOT_READ` for the pair.
- spec: `Specification/advanced/overloading.tex:531-674`, section "Declarations with Static Parameters" (the Meet Rule, and exclusion by existential reduction).
- precedent: `genericPairValid`, two own generics read on their declared domains, and `domainsExcludeTogether`'s existential reduction (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:894-918` and `:936` at the base; F-252, F-258).
- deviation: walk has no intersection type (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:407-411` reads `A & B` as `A`), so the self parameter's intersection with the self-type parameter is read at the call site in `domainsExcludeTogether` (`OverloadedFunction.java:1081-1092`), as a second member checked with `excludesAtMeet`, not as a new case inside `excludesAtMeet`.
- deviation: a trait is read as self-typed only where its parameter's own bound is the trait at that parameter (`OverloadedFunction.java:845-867`); P-146's second form, a parameter bounded by another self-typed trait that the trait extends at it, is not read, so such a pair keeps the refusal.
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:29-1440`

## 1. What changed and why

Walk's load check first compares two overloads parameter by parameter (`OverloadedFunction.java:420-541`). Where it refuses a pair, it reads the pair again on its declared domains (`validOnDeclaredDomains`, `:772`). Before this rung it read two shapes only: two own generics, and an own generic beside a declaration without static parameters. A functional method of a generic trait, such as `AdditiveGroup`'s `opr +(self, other: T)`, is a `GenericFunctionalMethod`, which `ownGeneric` leaves out (`:2530-2532`), so the pair of row 804 got `NOT_READ` and the team's message.

The edit, all in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`:

1. `validOnDeclaredDomains` (`:772-779`): two new branches. An own generic beside a functional method of a generic trait without static parameters of its own goes to `traitMethodPairValid`, in either order.
2. `traitMethod` (`:814-817`), new: a `GenericFunctionalMethod` whose declaration has no static parameters of its own.
3. `traitMethodPairValid` (`:826-833`), new: calls `genericPairValid` with the own generic first, the trait's static parameters standing for the method's own, and turns a Return Type Rule reading back to the pair's order when the method came first.
4. `selfTypeParameter` (`:845-867`), new: the trait's static parameter `X` by which the trait is self-typed (no `comprises` clause or one that lists only `...`, and `X` bounded by the trait at `X`).
5. `domainsExcludeTogether` (`:1081-1092`): where `g` is such a method, the self parameter's type at the meet is read as the intersection of the trait's instance and `X` at the meet: the position excludes where either member does (`excludesAtMeet` on each). This is P-157's reading of `self` as `C[\X\] & X`.
6. `Apart.of` (`:1433-1435`): the fresh symbolic arguments are made from `getStaticParams()` instead of the declaration's own static parameters, so that a functional method of a generic trait is renamed apart over its trait's parameters. For every declaration that reached `Apart.of` before, the two are the same list (`FGenericFunction.getStaticParams`, `FGenericFunction.java:171-173`; `GenericFunctionalMethod.Own` does not override it).

So for `PLUS[\T extends { Numb, AddG[\T\] }\](x: Arry[\T\], y: T)` beside `AddG[\T'\]`'s `PLUS(self, other: T')`: at the second position `T`'s bound `AddG[\T\]` and `T'`'s bound `AddG[\T'\]` are one generic type, so the existential reduction makes `T` and `T'` one fresh parameter `v` (`matchApart`, `meetParams`); at the first position `Arry[\v\]` meets `AddG[\v\] & v`, and `v`'s bound `Numb` excludes `Arry[\v\]` through `HasRk excludes { Numb }`. The two domains exclude, the Meet Rule holds, and the pair loads. In the other order the same holds at the second position. `excludesAtMeet` itself is unchanged.

The reading runs only where the parameter check refuses today (`:532-540`), so it can turn a refusal into a load, or keep a refusal under the rule's own message, and can refuse nothing that walk loaded.

## 2. Tests: the failing run and the passing run

Tests (all in `ProjectFortress/tests/`):
- `ExclusionVectorScalarWalk.fss`: row 804's `XXXExclusionVectorScalarWalk.fss` promoted with `git mv`, its component renamed, its four asserts kept.
- `ExclusionArrayScalarLibraryShapeWalk.fss`: the library's shape (`Library/FortressLibrary.fss:4942-4948`, `:361-362`) over the program's open trait `Numb`: `PLUS` and `MINUS` with `[\T extends { Numb, AddG[\T\] }, I extends Index\]` between `Arry[\T,I\]` and `T` in both orders, beside `AddG`'s abstract `PLUS` and its `MINUS` with a body; eight asserts of the declaration each call runs, the scalar `MINUS` on the left among them.
- `ExclusionVectorScalarOverlapWalk.fss` and `.test`: the guard; `HasRk` does not exclude `Numb`, so a value can be both an array and a number and no declaration covers the meet: refused at load on the base and after, key `load_exception_contains=ExclusionVectorScalarOverlapWalk.fss:20:1-`, the generic declaration's span, which both messages hold.

The failing run, on the base's code, before the edit was first built (harness line `# harness-one 2026-11-05T20:51:56Z; tree 4d27fbcc5; ... cache empty`; the build of the edit started after 20:52:16Z):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-vector-scalar/h-base ProjectFortress/tests/ExclusionVectorScalarWalk.fss ProjectFortress/tests/ExclusionArrayScalarLibraryShapeWalk.fss ProjectFortress/tests/ExclusionVectorScalarOverlapWalk.fss ProjectFortress/tests/ExclusionVectorScalarOverlapWalk.test

    AddG[\T extends AddG[\T\]\](uninstantiated)[\T extends AddG[\T\]\].PLUS(self:(AddG[\T\] & {T}),other:T):FortressLibrary.String...ExclusionVectorScalarWalk.fss:8:5-9:1 have parameters
    with generic type, at least one pair of parameters must have excluding types
    . interpret tmp/rung-walk-vector-scalar/h-base/tests/ExclusionVectorScalarOverlapWalk
     OK Saw expected refusal at load
    FAILURES!!!
    Tests run: 3,  Failures: 2,  Errors: 0

(the two failures are `ExclusionArrayScalarLibraryShapeWalk` and `ExclusionVectorScalarWalk`, each at that refusal; the shape test's at `ExclusionArrayScalarLibraryShapeWalk.fss:21:1-110` beside `:8:5-36`).

The passing run, after the last edit was built (`ant compileAll`: 'BUILD SUCCESSFUL', 'Total time: 50 seconds'), with the same command into `h-new`:

    # harness-one 2026-11-05T20:55:43Z; tree 48e01cf7f; nproc=4; load 6.20 6.24 3.99; ... cache empty
    OK (3 tests)

No code changed after it; the code was committed as `2fd5d653e` unchanged.

The guard's two messages (direct runs, `cd ProjectFortress && ../bin/fortress tests/ExclusionVectorScalarOverlapWalk.fss`, rc=1 both):
- base: '...ExclusionVectorScalarOverlapWalk.fss:20:1-91 and ...:8:5-9:1 have parameters with generic type, at least one pair of parameters must have excluding types'
- after: 'Overloading of PLUS[\T extends Numb AddG[\T\]\](x:Arry[\T\],y:T):FortressLibrary.String.../ExclusionVectorScalarOverlapWalk.fss:20:1-91 and AddG[...].PLUS(self:(AddG[\T\] & {T}),other:T)... fails the Meet Rule: neither is found to be more specific than the other or to exclude it, and no declaration is found that is more specific than both and applies to every call to which both apply'

The guard under the compiled checker (a copy in `tmp/`, after the library order, `../../../bin/fortress compile ExclusionVectorScalarOverlapWalk.fss`, rc=255): the checker refuses it too:

    Invalid overloading of PLUS in component ExclusionVectorScalarOverlapWalk:
     [\T extends AddG[\T\]\](AddG[\T\], T)->String @ .../ExclusionVectorScalarOverlapWalk.fss:8:5-9:1
     and [\T extends Numb AddG[\T\]\](Arry[\T\], T)->String @ .../ExclusionVectorScalarOverlapWalk.fss:20:1-91
    File ExclusionVectorScalarOverlapWalk.fss has 1 error.

No new `XXX` test is added, so none is shown red on a deliberate fix.

## 3. The suite

`ant testSystem`, once, after the last edit (commit `2fd5d653e`): 'BUILD SUCCESSFUL', 'Total time: 3 minutes 43 seconds'. Shards: 'Tests run: 178, Failures: 0', 'Tests run: 189, Failures: 0', 'Tests run: 184, Failures: 0', 'Tests run: 192, Failures: 0': 743, climb batch 25's 741 and the two new files. No verdict changes: the promoted test was green as an expected failure and is green as a plain test; the two new tests are new. The verdicts the brief names, read from `ProjectFortress/TEST-RESULTS/system-*`:
- row 713, `OverloadTwoBoundsClosedTraitExclusionWalk`: 'OK Saw expected refusal at load' (unchanged);
- row 779, `XXXGenericFunctionalMethodsNestedWalk`: 'OK Saw expected exception'; row 780, `XXXGenericTraitFunctionalMethodsNestedWalk`: 'OK Saw expected exception'; row 786, `GenericPairExcludingWalk`: 'OK'; row 787, `XXXGenericPairWhereExcludesTogetherWalk`: 'OK Saw expected exception'; row 788, `XXXGenericObjectInstanceBesidePlainWalk`: 'Saw expected failure: loaded and ran, not refused' (all unchanged);
- `TupleIndexExclusionWalk`: 'OK Saw expected refusal at load'; `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`, `ArrayElementAlgebra`, `LibraryOverloadFamilies`: 'OK'.

## 4. The scratch measure of P-160's second step (fork 4)

In this tree, never committed: `Number`'s `comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }` deleted at `Library/FortressLibrary.fss:381` and `Library/FortressLibrary.fsi:289`; each program run under walk on the edited code, from `ProjectFortress/`, each with its own empty private caches folder (`FORTRESS_CACHES=<empty dir> ../bin/fortress tests/<P>.fss`), so walk analysed the library each time (45 to 48 cache files written per run):

    BooleanOps rc=0 cachefiles=45
    ArrayScalarExtension rc=0 cachefiles=45
    ArrayOperatorsBesideLibrary rc=0 cachefiles=48
    extendNumber rc=0 cachefiles=45

No refusal in any output (`grep -il "fail\|exception"` over the four outputs prints nothing). Then `git checkout -- Library/FortressLibrary.fss Library/FortressLibrary.fsi`; `git status --short` printed nothing and both lines read the clause again. On the base the same removal fails 603 of 741 suite tests at row 804's refusal (`explorations/reviews/number-closure-2026-11-05.md`, section 2, point 6); that run is the record's and was not repeated.

## 5. Where the fix belongs, and the precedent

The map puts walk's dispatch and its load check in `interpreter/evaluator/values/OverloadedFunction.java` (`explorations/coordinator/map/spec-to-implementation.md:357`; `modules-and-phases.md:78`). Fork 2 names the place. The precedents are the file's own declared-domain readings: `validOnDeclaredDomains` read two shapes (two own generics, `genericPairValid`; an own generic beside a plain declaration, its own body); this is the third. One other site of the file reads pairs on their declared domains and leaves this shape out: `sameDeclaredDomains` (`:920`), the No Duplicates check of a pair that the parameter check orders, which takes only an own generic beside an own generic or a plain declaration. It is not changed: the parameter check refuses row 804's pair, so `sameDeclaredDomains` is not reached for it.

The ways that the language and the code offer, and the one taken:
- taken: read the pair on its declared domains as two own generics are read, with the self parameter of a self-typed trait read as `C[\X\] & X` at the meet (P-157, P-152; fork 2);
- not taken: a case in the team's parameter-by-parameter check, which reads one position at a time and would need the forced equality there (fork 2);
- not taken: walk's reading of `Number`'s `comprises` clause down to objects, which loads the library's pairs today and which P-160's second step removes (fork 2);
- not taken: an intersection type in walk's type model (`EvalType.forIntersectionType`), which reaches every use of `&` in walk and the dispatch; the meet's self member is read where it is needed.

## 6. What the specification settles

`Specification/advanced/overloading.tex`, "Declarations with Static Parameters": two declarations satisfy the Meet Rule where they exclude each other, and exclusion with static parameters is read by existential reduction; P-157 reads `self` of a self-typed trait as `C[\X\] & X` and the static parameters within their bounds. The pair of row 804 excludes so, and the overlap guard's pair does not and has no cover, so the rule refuses it. No sentence of `Specification/basic` or `basic-lib` speaks to walk's check.

## 7. Old against new

- `ExclusionVectorScalarWalk`, `ExclusionArrayScalarLibraryShapeWalk`, `ExclusionVectorScalarOverlapWalk` through the harness, base code then new code (section 2).
- `ExclusionVectorScalarOverlapWalk` directly under walk, base then new (section 2: the team's message, then the Meet Rule's).

## 8. Sentences made false

- `Specification/appendices/changes.tex:2960-2964`: "The interpreter refuses at load the first of these shapes in a program's own component, generic operators between an array of a number type and a number, on either side, beside the operator of a trait with a self-type parameter, as having no pair of parameters whose types exclude each other, which the compiled type checker accepts and runs (row~804 of the revival's gap ledger)." The gather corrects it.
- F-277: "walk refuses at load the vector pairs' shape in a program's own component (row 804)".
- `.claude/skills/fortress-repo/references/interpreter.md:53`, "What walk checks": the bullet "Where a program's own component declares both, it refuses a generic operator between an array of a number type and a number, ... (ledger row 804)."
- `.claude/skills/fortress-repo/references/revival-changes.md:43`, "Traits and objects": "Walk loads the library's pairs, but refuses such a pair where a program's own component declares both (row 804)."
- `.claude/skills/fortress-repo/references/interpreter.md:43`, "What walk checks": walk keeps the team's check and messages for "a pair that is neither two generic declarations nor a generic one beside a plain one"; a generic function beside a functional method of a generic trait without static parameters of its own is now read on the declared domains (added by the skeptic).
- F-252's title, "where the parameter-by-parameter check refuses two declarations with static parameters of their own": the reading now also takes such a functional method beside an own generic (added by the skeptic).
- P-160's "The clause stays until the first step lands" stays true as written.

## 9. Points to report

- Methods changed in `OverloadedFunction.java`: `validOnDeclaredDomains` (`:772-779`), `domainsExcludeTogether` (`:1081-1092`, and its comment `:1000-1004`), `Apart.of` (`:1433-1435`); new `traitMethod` (`:814-817`), `traitMethodPairValid` (`:826-833`), `selfTypeParameter` (`:845-867`); two imports (`NamedType`, `TraitDecl`, `:32`, `:39`). Nothing else: no file of `interpreter/evaluator/types/`, `excludesAtMeet` unchanged.
- The promoted test, the library's shape and the guard, before and after through the harness: section 2; the guard under the compiled checker: refused, section 2.
- The scratch measure: four programs, exit 0, no refusal; the clause restored: section 4.
- `ant testSystem`: no verdict changes; rows 713, 779, 780, 786 to 788 unmoved: section 3.
- Sentences made false: section 8.
- No file edited beyond those named; no edit of `Library/` committed (the scratch edit was restored), none of the checker.

## 10. Decisions

1. The pair is read by `genericPairValid` with the own generic first (`traitMethodPairValid`), not by a new reading of its own. Ways not taken: a separate reading for a function beside a trait method (more code, the same rules); `genericPairValid` in the order met (its `domainsExcludeTogether` takes the self members on `g` only). Evidence: brief, "Read it as genericPairValid reads two own generics".
2. The intersection `C[\X\] & X` is read at the meet in `domainsExcludeTogether`, as two members each checked with `excludesAtMeet`. Ways not taken: a new case inside `excludesAtMeet` (walk has no intersection `FType` to dispatch on, `EvalType.java:407-411`); an intersection type in walk's model. Evidence: `EvalType.java:407-411`.
3. Only a functional method without static parameters of its own is read (`traitMethod`). Way not taken: also methods with their own (`GenericFunctionalMethod` with own static parameters), whose instantiation differs (`GenericFunctionalMethod.java:44-63`) and which no measured pair needs; they keep the refusal.
4. Self-typed is read in its direct form only (`selfTypeParameter`). Way not taken: P-146's indirect form, through a self-typed trait that the trait extends at `X`; a pair so typed keeps the refusal, which shows less and cannot refuse a pair walk loads.
5. `Apart.of` makes fresh arguments from `getStaticParams()`. Way not taken: leave it, under which a function of the trait method's name and static parameters would get an empty fresh list and keep its refusal. Evidence: the two lists are equal for every earlier caller (`FGenericFunction.java:171-173`).
6. The guard's key is the generic declaration's span, `ExclusionVectorScalarOverlapWalk.fss:20:1-`, held by both messages. Way not taken: a rule's message, which the base does not print.
7. The scratch measure ran with a private empty caches folder per program, so walk analysed the library each time (row 342). Way not taken: `harness-one.sh` with `COLD_CACHE=1`, which would have run the four as tests, beside one another in one JVM.
8. Neither the count stage nor the distance stage was run: every path changed is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/` or `explorations/` (`git diff --name-only 4d27fbcc5..HEAD`: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `ProjectFortress/tests/ExclusionArrayScalarLibraryShapeWalk.fss`, `ExclusionVectorScalarOverlapWalk.fss`, `ExclusionVectorScalarOverlapWalk.test`, `ExclusionVectorScalarWalk.fss`, `XXXExclusionVectorScalarWalk.fss` (removed), and this folder). Their before is climb batch 25's landed 0 and 0; the gate runs both.
9. The change's own ladder subset is empty: the ladder compiles programs on the compiled path, which never runs walk's load check, and no file of the baseline's `raw/` names `OverloadedFunction` or row 804's message (`grep -rl` over `explorations/compile-ladder/baseline-2026-09-19/raw/` printed nothing).

## 11. Defects and their homes

- Row 804, walk's half: home 1, repaired; `ExclusionVectorScalarWalk` and `ExclusionArrayScalarLibraryShapeWalk` assert it. The gather closes row 804 with commit `2fd5d653e` and test `ExclusionVectorScalarWalk`.
- No new defect measured. The two readings left out (decisions 3 and 4) were not met by any program run here; no row is filed for them.
- Added by the skeptic (`SKEPTIC.md`): NEW-W-1, walk loads an object that extends a self-typed trait at a type it is not a subtype of, and since this rung a call that two declarations fit then runs one of them: home 2, `ProjectFortress/tests/XXXSelfTypeExtenderOtherTypeWalk.fss` with its `.test`, and the row in `record.md`. NEW-W-2, the compiled checker's `checkFancyRule` refuses a generic function more specific than a self-typed trait's functional method, which walk now loads: home 3, `ProjectFortress/tests/GenericInsideTraitMethodWalk.fss` and the row in `record.md`.

## For FACTS

See `record.md`.

## Commands worked out

- The scratch measure's runs, each from an empty private caches folder: `cd ProjectFortress && FORTRESS_CACHES=<empty dir> ../bin/fortress tests/<P>.fss`.
