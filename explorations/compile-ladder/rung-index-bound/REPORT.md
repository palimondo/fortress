<!-- Climb batch 21, rung B: the index bound with the tuple rule (P-156; row 783), on both paths and in the specification. -->
# Rung B: the index bound with the tuple rule

problem: the full check of symbolic operators gives 124 errors at the subscripts over the library's generic index types, the subscript pair invalid at an unbounded `I` (F-245; row 783; `explorations/perf-probes/symbolic-operators-2/REPORT.md:97`)
spec: `Specification/basic/types-vals-vars.tex:335-351` ("Tuple Types", as revised here; the base's `:314-324`), with the team's wish at `Specification/appendices/future.tex:200-207`
precedent: `trait Object extends Any` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32`) for `Index` outside `Object`; `SumReduction`'s `distribute` with its method condition (`Library/FortressLibrary.fss:3441`) for `atMost`; the probe's `subscripts-index-bound.patch` and `walk-tupleindex.patch` and the planner's `checker-tupleindex-exclusion.patch`; the checker's tuple-against-tuple case (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:329-330`)
deviation: `trait Index extends Any end` with a doc comment of its own, before `Indexed`'s comment, where the patch put a bare `trait Index end` after it (`Library/FortressLibrary.fsi:1241-1245`)
deviation: `BoundedRange`'s `atMost` kept under `where { I extends Index }`, which the patch drops (`Library/FortressLibrary.fsi:2257`, `.fss:4105`)
deviation: `Random`'s `UniformDistribution[\T extends Index\]`, which the patch leaves unbounded (`Library/Random.fsi:260`, `.fss:374`)
deviation: the rule names `FortressLibrary.Index` by its qualified name, where the probes matched the bare text (`TypeAnalyzer.scala:853-862`, `FTypeTuple.java:71-79`, `PreDisambiguationDesugaringVisitor.java:127-130`)
deviation: walk's `excludesOther` is the dual of the rule, a tuple excludes `Index` only where an element does, where the patch excluded every tuple not below `Index` (`FTypeTuple.java:412-422`); `FType`'s exclusion of a tuple by `Index` asks the tuple (`FType.java:205`); walk's `join` reads the rule (`FTypeTuple.java:219-220`)
deviation: the void type is outside the rule in the checker (`TypeAnalyzer.scala:332`, `:566`); the checker's shortcut that every trait type is an `Object` excepts `Index` (`TypeAnalyzer.scala:261-262`)
deviation: the desugarer makes a type that extends only `Index` (and `Any`) extend `Object` too (`PreDisambiguationDesugaringVisitor.java:91-123`)
historical: `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`, `Library/Random.fsi`, `Library/Random.fss`, `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java`, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeTuple.java`, `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`, `Specification/basic/types-vals-vars.tex`, `Specification/basic/traits.tex`, `Specification/appendices/future.tex`, `Specification/appendices/changes.tex:4062`

Commits on `wip/rung-index-bound`: `23623dee6` (the test, the library, the checker, walk and the desugarer), `20138d56c` and `c9f04e2b5` (the test's function over `Index`, then with typed indices), `903e65328` and `add3f149b` (the specification and the decision record).

## 1. What changed and why

P-156 decides it: every index parameter of the library's generic indexed types is bounded `I extends Index`, `ZZ32` extends `Index`, `Range` excludes it, and a tuple type whose element types are all `Index` types is an `Index`, on both paths and in the specification. Question 1's answer (option 1) puts `Index` beside `Any` and `Object`, outside `Object`; question 2's answer (option 2) keeps `BoundedRange`'s narrowed `atMost` under a method condition.

- **The library** (`Library/FortressLibrary.fsi`, `.fss`): `subscripts-index-bound.patch` applied as it stands (`git apply --check` passed on the base), then three changes. `Index` is declared `trait Index extends Any end` with its doc comment, before `Indexed`'s comment, so that Part IV gives `Indexed`'s description to `Indexed` (`fsi:1241-1245`, `fss:1943-1947`). `atMost(n: I): FullRange[\I\] where { I extends Index }` stands in `BoundedRange` (`fsi:2257`, `fss:4105`). `Random`'s `UniformDistribution`, whose range is a `FullRange[\T\]`, is bounded `T extends Index` (`Library/Random.fsi:260`, `.fss:374`); unbounded, its api is ill-formed under the bound, which no stage reads (`Random` is not among the twelve components).
- **The checker** (`TypeAnalyzer.scala`): in `pSubInner`, a tuple type without varargs and with elements is a subtype of the library's `Index` where each element is (`:331-333`); in `pExcInner`, such a tuple excludes `Index` only where an element does (`:565-567`), so a tuple of `Index` types neither excludes `Index` nor is excluded by it; and the shortcut that makes every trait type an `Object` (`:261-262`) excepts `Index`, so the checker too keeps `Index` outside `Object`. `isLibraryIndex` (`:851-862`) reads the trait by its qualified name, `Index` of the api `WellKnownNames.fortressLibrary`, so a program's own trait `Index` is not it; the name is `WellKnownNames.indexTypeName` (`WellKnownNames.java:25-26`).
- **Walk** (`FTypeTuple.java`, `FType.java`): `subtypeOf` (`:130`), `meet` (`:200-201`) and `join` (`:219-220`) read the rule; `excludesOther` reads its dual (`:412-422`); `FType.excludesOther`, which made every trait exclude every tuple, asks the tuple when the trait is `Index` (`FType.java:205`). `isLibraryIndex` (`FTypeTuple.java:71-79`) is the trait named `Index` that the library's environment holds (`Driver.getFortressLibrary().getRootTypeNull`).
- **The desugarer** (`PreDisambiguationDesugaringVisitor.java`), which both paths run (`PhaseOrder.java`, `interpreterPhaseOrder` and `compilerPhaseOrder`): the library's `Index`, a trait named `Index` in the compilation unit `WellKnownNames.fortressLibrary()`, keeps `extends Any` as written (`:127-130`, `:169-171`); a trait, object or object expression whose `extends` clause names only `Index` and `Any` gets `Object` beside its `Index` (`:91-123`). Walk makes a trait an `Object` nowhere else: `grep -rn 'objectTypeName' ProjectFortress/src/com/sun/fortress/interpreter` prints nothing, and `PreTypeCheckDesugaringVisitor`'s rewrite is commented out (`PreTypeCheckDesugaringVisitor.java:63`).
- **The specification**, in the S1 form: section 7.

## 2. The test: its failure on the base and its pass

`ProjectFortress/tests/TupleIndexBoundWalk.fss`: a function `ident[\I extends Index\]` and a trait `Cells[\I extends Index\]` with the subscript pair, at `ZZ32` and its pairs and triples; a `Matrix` with a number on either side and with `MAX`; an `Array2` read and written at `a[i, j]`; a function over `Index` called with a `ZZ32`, a pair and three arguments; `instanceOf` showing a pair and a triple of `ZZ32` an `Index` and no `Object`, a pair with a `String` no `Index`, and an object of the program's own that extends `Index` both an `Index` and an `Object`; and `kind(x: Object)` beside `kind(x: Any)`, where a pair goes to `Any`'s.

The failing run, on the base's code before the edit's first build (13:42:11 UTC):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-index-bound/h1 ProjectFortress/tests/TupleIndexBoundWalk.fss
    # harness-one 2026-10-23T13:42:11Z; tree 00f2e1bdc; nproc=4; load 0.62 0.59 0.35; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
     UNEXPECTED exception 
        Index is undefined.
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

The test then gained its function over `Index` (`20138d56c`, `c9f04e2b5`); its final text fails the same way on the old code (14:43:49 UTC):

    FORTRESS_HOME=/home/user/fortress-base21 /home/user/fortress-base21/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-index-bound/old-harness $PWD/ProjectFortress/tests/TupleIndexBoundWalk.fss
    # harness-one 2026-10-23T14:43:49Z; tree aa5ff2423; ...
        Index is undefined.
    Tests run: 1,  Failures: 1,  Errors: 0

The passing run, on the final code (14:43:51 UTC):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-index-bound/h1 ProjectFortress/tests/TupleIndexBoundWalk.fss
    OK (1 test)

Without walk's rule, with the library edit, the test stops at its first pair: the edited tree's walk with the base's `FTypeTuple.java` and `FType.java` compiled ahead of the build on the class path (`java ... -cp "<base classes>:$CP" com.sun.fortress.Shell walk tests/TupleIndexBoundWalk.fss`):

    ** bug! Meet((Int,Int), Index) not a singleton: []
    .../ProjectFortress/tests/TupleIndexBoundWalk.fss:24:12-23:

**The compiled test.** None: the compiled tests compile against the compiler's prelude, which declares no `Index` and takes no new declaration (the skill's `compiler.md`, "The compiler's prelude"), and `WellKnownNames.fortressLibrary()` is `CompilerLibrary` there, so the rule reads nothing on that path. The checker's test is the stages (section 5); the probes of section 6 run the checker over small programs with the interpreter's library.

## 3. Where the fix belongs, and the precedent search

- The tuple types' rules are the checker's `TypeAnalyzer` (`pSubInner`, `pExcInner`) and walk's `FTypeTuple` (`explorations/coordinator/map/modules-and-phases.md`, B.6 for the checker's types and B.5 for the desugaring both paths share).
- The implicit `Object` is the pre-disambiguation desugarer, which both paths run; the revival already changed it once for `Any` and `Object` (`git diff a874948ac -- ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java`: `namesOnlyAny` and `objectTypeId` are the revival's).
- How the checker names the library's traits: `Types.java` makes each with `makeId(span, fortressLibrary(), "ZZ32")` and the like (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:44-70`), and the disambiguator qualifies a name by its api in an api and in a component that exports it (`TopLevelEnv.java:324-374`), so every reference to `Index` reaches the checker as `FortressLibrary.Index`. Walk names the library's values through `Driver.getFortressLibrary()` (`Int.java:259`, `Evaluator.java:225`), and the type's object is shared between the library's component and its api (`BuildApiEnvironment.java:67`).
- A member that applies at some instances only: the library's two `distribute`s with a method condition (`Library/FortressLibrary.fss:3441`, `:3443`), the only other method conditions of the twelve components.
- Other sites: the patch's 40 edits cover every generic declaration of `FortressLibrary` that instantiates an indexed type at a type parameter of its own; a search of `Library/` and `ProjectFortress/LibraryBuiltin/` for the bounded types at a type variable finds one more, `UniformDistribution`'s `FullRange[\T\]`; the others are element types (`ZeroIndexed[\E\]`, `primitiveImmutableArray[\E\]`).

The ways the language and the library offer, for each choice, are in section 9.

## 4. What the specification settles

- The bound: the team's wish (`Specification-1.0-frozen/appendices/future.tex:200-203`), and the overloading rules at every instance (`Specification/advanced/overloading.tex`, "Overloading with Static Parameters").
- The rule: no text of the team's allows it; the Working Draft and the 2012 Types chapter forbid it (`Specification-1.0-frozen/basic/types-vals-vars.tex:215-216`, `:272-273`; `Documentation/Specification/Prose/Language/types.tick:341`, `:424`). P-156 decides it; the judgement (`explorations/reviews/type-decisions-review/judgement.md`, V2) asks that it be recorded as the revival's departure, which the Appendix I entry does.
- `Index` outside `Object`: question 1's answer, with the team's trait of all tuples declared outside `Object` (`Specification/basic-lib/objects.tex:176-186`).
- A tuple expression at a function over `Index`: the rule and the call rules accept it; the checker refuses it (NEW-B-1, section 10). A numeral at a parameter of type `Index`: the checker types it `IntLiteral`, which only `ZZ32`'s coercion takes and `Index` does not (fork 8: only `ZZ32` extends `Index`); walk, whose numerals are `ZZ32` values (row 364), takes it; the test passes typed values.

## 5. The stages, the suites and the time

Every run below is on the code of `23623dee6` (the later commits change a test file and prose only).

**The count stage** (`explorations/coordinator/tools/checker-count/run.sh`): its table is the landed one, word for word:

    diff explorations/compile-ladder/climb-batch-20/gate/checker-count.txt <this run's table>     # prints nothing
    #total	3
    #crash	none

**The stock distance** (`explorations/coordinator/tools/distance/run.sh`):

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-20/gate/distance.txt <this run's table>
    DISTANCE SAME   5
    python3 explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv <this run's errors.tsv>
    landed 5 now 5
    export 'are not matched by the declarations': landed 43 entries, now 43

Site by site, by row (row 577): the export error at `FortressLibrary.fss:12`; the two `BIG MIN` sites at `FortressLibrary.fss:4392` and `:4398` (the landed `:4386` and `:4392`, six lines down by `Index`'s declaration); `FortressLibrary.fss:1465` 'Function body has type OR(I0,O0), but declared return type is O0.'; `List.fss:146`. No site came, none of the 73 bound errors that the checker's rule prevents.

**The full check** (`explorations/perf-probes/symbolic-operators-2/run-shadow.sh <out> <scratch> catch`), against the planner's base table:

    #total	67
    #kind	overloading	58
    #crash	none
    python3 explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/plan-21/probes/full-check-base.tsv <this run's errors.tsv>
    landed 191 now 67
    export 'are not matched by the declarations': landed 43 entries, now 43

132 sites print GONE and 8 COME. The 8 are the scalar sites of P-157's family, the same pairs, whose text now shows `I extends Index` ('[\T extends Number AdditiveGroup[\T\], I extends Index\](Array[\T,I\], T)->Array[\T,I\]'); with ` extends Index` taken out of the after's messages, 124 go and none comes: 106 subscripts (`_[_]`) and 18 subscripted assignments (`_[_]:=`), as the probe measured.

**The suites** (once each):

    ant testSystem      Tests run: 163, 175, 172, 159 (669), Failures: 0   BUILD SUCCESSFUL   Total time: 5 minutes 2 seconds
    ant testSpecData    Tests run: 130, Failures: 0, Errors: 0              BUILD SUCCESSFUL   Total time: 1 minute 19 seconds
    ant testQuick       library Tests run: 86, Failures: 0; othercompiler Tests run: 263, Failures: 0; compiler Tests run: 1282, Failures: 0   BUILD SUCCESSFUL   Total time: 7 minutes 33 seconds

669 is the probe's and climb batch 20's 668 plus `TupleIndexBoundWalk`. `ArrayScalarExtension` and `ArrayOperatorsBesideLibrary`, which the probe saw fail without walk's rule, pass among them.

**The ladder**, the change's own subset (the skill's `gate.md`, end of "The ladder regression"), its drivers under `tmp/rung-index-bound/ladder/`: the 61 baseline files whose recorded first error names `Index`, a tuple, `Object`, `Indexed`, `Range` or `Array` (none in climb batch 20's landed `ladder.tsv`, so compared with the baseline's), and the eighteen microGPT components. Every phase and first error is the record's, the tree's path masked in five messages ('Can't compile ObjectExpr at /home/user/fortress/...' in `objectCC`, `objectCC_immutable`, `objectCC_mutable`, `objectTest7`, `scopeSharing`); against the landed microGPT table:

    diff <(mg_phases explorations/compile-ladder/climb-batch-20/gate/ladder/microgpt-phase.md) <(mg_phases <this run's microgpt-phase.md>)     # prints nothing

**microGPT's quick pair** (`explorations/coordinator/tools/mg-run.sh tmp/rung-index-bound/mg rungB`):

    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS
    rc=0 secs=73
    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS
    rc=0 secs=62

**The checker's time** (P-148; the skill's `compiler.md`, "The checker's time"). One session, the same command, each in the background under `nice -n 19` beside the batch's other agents; nproc=4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`:

| run | code | load at start | seconds |
|---|---|---|---|
| base | the base build, `/home/user/fortress-base21` | 0.74 | 99 (`real 1m39.067s`) |
| change | `23623dee6` | 1.80 | 90 (`real 1m30.278s`) |
| pass | none: the second pass changed no code | | the change's |

The two tables are equal (`diff` prints nothing). The two `run.txt` files, each tree's path replaced by `TREE`, differ in two lines only, the two `BIG MIN` positions that `Index`'s six lines moved (`FortressLibrary.fss:4386` to `:4392`, `:4392` to `:4398`), a masked kind of difference (the skill's `gate.md`, "Comparing with an earlier run").

The second pass: a JFR profile of the count stage on the change (`-XX:StartFlightRecording=...,settings=profile`, `jfr view hot-methods`, and the samples through each new method counted in `jfr print --events jdk.ExecutionSample`). Of 6,547 samples, none passes through `isLibraryIndex`, `FTypeTuple` or `namesOnlyAnyOrIndex`, and 3 through the desugarer. The top frames are the generated walker and hashing:

    com.sun.fortress.scala_src.nodes.Walker.walkCases7$(Walker, Object)     311   4.75%
    com.sun.fortress.scala_src.nodes.Walker.walkCases0(Object)              263   4.02%
    com.sun.fortress.scala_src.nodes.Walker.walkCases2(Object)              260   3.97%
    scala.runtime.Statics.anyHash(Object)                                    248   3.79%
    com.sun.fortress.scala_src.nodes.Walker.walkCases5(Object)              230   3.51%

So the new code shows no gain to take and the pass changed nothing; a `pass` run and a second `ant testQuick` would repeat the change's code state and were not run. No reuse of an earlier answer was added, so there is no audit.

**The specification's build** (`cd Specification/fortress && ./ant genSource && ./ant tex`, after the last edit): both `BUILD SUCCESSFUL`. The skill's check, `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log`, prints 44 here, every one the text of LaTeX's own warning macro in the log's trace (`x@warning {Reference `#1' on page \thepage \space undefined}}{}`); `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0. The PDF's text holds each new passage and box, and Part IV renders `trait Index extends Any` with its comment.

## 6. Programs run old against new, and the probes

- `TupleIndexBoundWalk`: old, refused at load ('Index is undefined.'); new, PASS (section 2).
- Walk on a program calling a function over `Index` (`takesIndex((i, j))`, `takesIndex(i, j)`, `takesObject((i, j))` beside `takesObject(x: Any)`, `takesIndex(3)`), new only, since the old code has no `Index`: `bin/fortress IndexCallWalk.fss` prints `1 1 5 1`.
- The checker over small programs with the interpreter's library (the count stage's `WorldFlip -stop typecheck` on the change's classes), new only:
  - `takesIndex(p)` for `p: (ZZ32, ZZ32)`, `viaBound(p)` for `viaBound[\I extends Index\](x: I)`, `ident((i, j))`, `ident(3)`, `ident((1, 2))`, and `takesIndex(x)` inside `viaBound`: accepted. `takesObject(p)`: 'Object->ZZ32 is not applicable to an argument of type (ZZ32, ZZ32).'
  - `takesObject(x)` for `x: I` with `I extends Index`: 'Object->ZZ32 is not applicable to an argument of type I.', so `Index` is no `Object` in the checker; `takesObject(s)` and `takesIndex(s)` for an object `Slot extends Index`, and `takesIndex(p)` for `p: (Slot, ZZ32)`: accepted.
  - `unboundedOver[\I\](a: Array[\RR64,I\])`: 'Ill-formed type: Array[\RR64,I\] The static argument I does not satisfy the corresponding bound Index.'; `boundedOver[\I extends Index\]`: accepted.
  - `takesIndex((i, j))` and `takesIndex((i, j, i))` for `i, j: ZZ32`: 'Index->ZZ32 is not applicable to an argument of type (ZZ32, ZZ32).' (NEW-B-1).
  - `takesIndex(3)` and `oneIndex(3)`: 'Index->ZZ32 is not applicable to an argument of type IntLiteral.'

## 7. The specification's text

In the S1 form: the Appendix I entry "The index type of a subscript" (`Specification/appendices/changes.tex:4062-4205`, `\seclabel{revival-index}`), with the rule recorded as the revival's departure from the designers' tuple-type text, the Working Draft and `types.tick` quoted, the team's "magic to convert" quoted, S5 and W3 named as the ways kept open, and its effect naming NEW-B-1, row 364 and row 701; a box at each changed passage; and `explorations/compile-ladder/rung-index-bound/decision-record.md`. The preamble's paragraph on the revision stays true (`Specification/fortress/preamble.tex:54-64`).

Sentences edited:
- `Specification/basic/types-vals-vars.tex:151-159`: the immediate subtypes of `Any` gain `Index`; a box.
- `Specification/basic/types-vals-vars.tex:238-246`: every trait type other than `Index` excludes every tuple type, and `Index` excludes a tuple type only where an element does (the base's `:232-233`, "Every trait type also excludes every arrow type and every tuple type, and the special types () and BottomType."); a box.
- `Specification/basic/types-vals-vars.tex:335-340`: the rule, and that such a tuple type is no subtype of `Object`.
- `Specification/basic/types-vals-vars.tex:342-351`: "A tuple type excludes any non-tuple type other than Any and Index, and it excludes Index if and only if one of its element types excludes Index." (the base's `:323-324`, "A tuple type excludes any non-tuple type other than Any."); a box for both.
- `Specification/basic/traits.tex:186-195`: `Index` beside `Any` and `Object` in the implicit extension of `Object`, `Index` extending only `Any`, and a type that extends only `Index` extending `Object` too (the base's `:186-188`).
- `Specification/basic/traits.tex:205-210`: the hierarchy "rooted at the traits Object and Index" (the base's `:198-199`, "rooted at trait Object"); a box.
- `Specification/appendices/future.tex:208-214`: the array-indexing item's box, "Done, by subtyping in place of a conversion".

## 8. Sentences this change makes false, not edited here

For the gather:
- `Specification/basic-lib/objects.tex:159-160`: "Every trait other than Any and Object extends Object (\secref{trait-decls})": `Index` does not.
- `Specification/basic-lib/objects.tex:21-22`: "The immediate subtypes of the trait Any are Object, Tuple, and ()": `Index` is one too.
- `Specification/preliminaries/overview.tex:1061-1062`: "Traits in Fortress exist in a multiple inheritance hierarchy rooted at trait Object": rooted at `Object` and `Index`.
- `Specification/appendices/changes.tex:432-433`, in the entry on `Object`'s declaration: "Tuple's declaration is not refused by the rule, since no tuple type extends a trait": a tuple of indices is now a subtype of the trait `Index`; the entry's point stands, since `Index` is not generic, but its reason's wording reads otherwise.
- The record: F-245's "132 wait on two designs ... a bound on the subscripts' index type (124 errors)" and "the subscripts over a generic `Indexed` (124)": the 124 are cleared; row 783's claim: no index parameter is unbounded now.
- The skill: no sentence of `SKILL.md` or its parts is made false that I found (`grep -n -i 'tuple'` and ``grep -n '`Object`'`` over `.claude/skills/fortress-repo/`); "An unbounded type parameter is bounded by `Any`, which holds tuples, functions and `()`, as `Object` does not" (`SKILL.md:132`) stays true. The skill has no sentence yet on `Index`, the tuple rule, or a type that extends only `Index`; record.md's "Revival change" carries them.

## 9. Decisions

1. **The probe's library patch taken as it stands, then three changes** (the deviations above). Ways not taken: the patch alone (it drops `atMost`, against question 2's answer; leaves `Index`'s comment after `Indexed`'s, so Part IV would give `Indexed`'s description to `Index`; leaves `UniformDistribution` ill-formed). Evidence: P-156; `Library/Random.fsi:260`.
2. **`Index` declared `trait Index extends Any end`** (question 1, option 1, P-156). Ways not taken: `trait Index end` (the desugarer would make it an `Object`), question 1's options 2 to 4. Evidence: P-156; `FortressBuiltin.fsi:32`.
3. **The rule names `FortressLibrary.Index` by its qualified name** (fork 6): in the checker by the `Id`'s api and text, in walk by the identity of the library's `FType`, in the desugarer by the compilation unit's name and the trait's. Ways not taken: the bare text (the probes; a program's own `Index` would be read as the library's); `typeCons` identity in the checker (it throws for a name not in the trait table, as `CompilerLibrary.Index`); a `Types.INDEX` constant (it would need resetting per library). Evidence: `Types.java:44-70`; `TopLevelEnv.java:324-374`.
4. **The checker's exclusion side as the dual** (fork 7), the planner's case with the qualified name. Way not taken: subtyping alone (the probe's contradiction, which the judgement names). Evidence: judgement section 2, item 1(a); the stages moved no site.
5. **Walk's `excludesOther` as the same dual, not the patch's "excludes unless a subtype"; `FType`'s exclusion of a tuple by `Index` delegated to the tuple.** Ways not taken: the patch's form (walk would read a tuple with an element that is neither below nor excludes `Index` as excluding `Index`, where the checker and the new text do not); leaving `FType.java` (then `Index` excludes every tuple while a tuple of indices does not exclude `Index`). Evidence: `FType.java:203-204` at the base made every trait exclude every tuple; `ant testSystem` 669 with 0 failures.
6. **Walk's `join` reads the rule too.** Way not taken: the patch's three methods only. Evidence: `FType.join` gives `Index` for `Index.join(pair)` once the pair is below `Index` (`FType.java:350-357`); the tuple's side did not.
7. **The void type outside the rule** (`e1.nonEmpty`). Way not taken: the probe's case, under which `()` is an `Index` (an empty `pAnd` is true). Evidence: `()` is no index; the planner's exclusion case had the guard.
8. **The checker's `Object` shortcut excepts `Index`.** Way not taken: leaving it, under which `Index` is an `Object` in the checker and the relation is not transitive at `Index` (question 1's option 3, not taken). Evidence: the probe 'Object->ZZ32 is not applicable to an argument of type I.'; the stages moved no site.
9. **A type that extends only `Index` extends `Object` too.** Ways not taken: the planner's line alone (`object Slot(n: ZZ32) extends Index end` would be no `Object`, lack `Object`'s methods, and break the traits chapter's rule that every trait but the three extends `Object`); a rule in walk only. Evidence: fork 8 asks programs with index types of their own to declare them `Index`; `TupleIndexBoundWalk`'s `Slot` assertions; the checker probe. The bare text `Index` is read here, since names are not resolved before disambiguation; a clause naming a program's own `Index`, already an `Object`, gains a redundant `Object` at worst.
10. **`atMost` kept under `where { I extends Index }`** (question 2, option 2, P-156). Ways not taken: the drop (option 1), unconditional with `FullRange` unbounded (option 3). Evidence: P-156.
11. **`UniformDistribution[\T extends Index\]`**, a file beyond the brief's. Ways not taken: leave it unbounded; file a row. Evidence: the checker's refusal of the same shape (section 6); every caller in the tree passes `ZZ32` (`ProjectFortress/tests/RandomTest.fss:53`, `UniformDistributionStridedRange.fss:8`, `LibraryMeetDeclarations.fss:91`, `SeededRandomGenAbstractMethods.fss:8`); `XXXUniformDistributionRangeType.fss:8` passes `ZZ64` to be refused and stays an expected failure in the suite.
12. **NEW-B-1 filed, not repaired.** Ways not taken: a case in `Functionals.checkApplicableWithoutInference` beside the domain-`Any` case (`Functionals.scala:480-483`), with its kin in the inference and coercion paths. Evidence: no library line makes the call (the stages moved nothing); the repair is in the application check, outside this rung's files.
13. **The test passes typed indices to the function over `Index`.** Way not taken: numerals (the test would assert walk's numeral departure, row 364). Evidence: the checker's 'Index->ZZ32 is not applicable to an argument of type IntLiteral.'
14. **No speed change.** Way not taken: an optimisation elsewhere in the checker, outside the new code that P-148 names. Evidence: the profile (section 5).
15. **No compiled test.** Way not taken: a compiled test of a program's own `Index` (fork 6 makes the rule ignore it). Evidence: the prelude declares no `Index`.
16. **The ladder subset is the 61 baseline files whose first error names a touched name.** Way not taken: the gate's 85 passing programs (the gate runs them). Evidence: the skill's `gate.md`, end of "The ladder regression".
17. **The count stage's after is the change's timing run**, the same code state as the final code. Way not taken: a second run on unchanged code. Evidence: `SKILL.md`, "Reuse each result ... Run it again only after the code changes."

No decision of the curator covers 5, 6, 7, 8, 9, 11, 12, 13 and 14 to 17; I acted on the readings above.

## 10. Defects measured, each with its home

- **Row 783**, the subscript pair invalid at an unbounded index type: home 1, repaired; `TupleIndexBoundWalk` and the full check's site list (124 gone, none come).
- **NEW-B-1**, the checker refuses a tuple expression of indices at a function whose one parameter's type is `Index`: home 3's row-only form. The specification settles it, but no gated test can hold it: compiled tests use the prelude, which has no `Index`, and walk runs the call. Its row is in record.md.
- **The skill's check of the specification's log** counts 44 trace lines as warnings on this tree (section 5): not a defect of the tree; noted for the skill writer.

## 11. Points to report

- **The probe's patches and how the rule names `Index`:** the library patch as it stands plus three changes; the checker's case with the planner's exclusion case, the void guard and the `Object` shortcut; walk's three methods reworked, `join` and `FType` added; the qualified name everywhere (sections 1, 9). Evidence: `TypeAnalyzer.scala:853-862`, `FTypeTuple.java:71-79`, `PreDisambiguationDesugaringVisitor.java:127-130`.
- **Questions 1's and 2's answers as built:** `Index extends Any` kept by the desugarer (`PreDisambiguationDesugaringVisitor.java:127-130`, `:169-171`), the checker's `Object` shortcut (`TypeAnalyzer.scala:261-262`), the clause rule (`PreDisambiguationDesugaringVisitor.java:91-123`); walk needed no other line; `atMost` under its condition (`Library/FortressLibrary.fsi:2257`, `.fss:4105`).
- **The tables:** count 3 to 3, the same table; stock distance 5 to 5, the same five sites; full check 191 to 67, 124 gone, none come, 8 texts changed (section 5).
- **The count stage's seconds:** 99 before, 90 after; no pass run, since the pass changed no code; tables equal, outputs equal but for two moved positions.
- **Walk values that move, and test verdicts:** none in the suites (669 tests, 0 failures; the new one is `TupleIndexBoundWalk`); a pair of indices is newly an `Index`, and an object that extends only `Index` an `Object`, which no earlier program could ask.
- **The declarations the bound reaches, and Part IV:** in the api, `Index` (new, with its comment), `ZZ32`'s header, `Indexed`, `DelegatedIndexed`, `MutableIndexed`, `ReadableArray`, `ImmutableArray`, `Array`, `StandardImmutableArrayType`, `StandardMutableArrayType`, `Range`'s `excludes`, `BoundedRange`'s `atMost` (its condition), `FullRange`, `CompactFullRange`, `StridedFullRange`, `SimpleMappedSeqIndexed`, and the eight scalar operators over `Array[\T,I\]` (`Library/FortressLibrary.fsi:533`, `:1241-1246`, `:1266`, `:1369`, `:1390`, `:1402`, `:1461`, `:1477`, `:1520`, `:1528`, `:2189`, `:2257`, `:2287`, `:2296`, `:2303`, `:2425`, `:2708-2718`), all of which Part IV renders; `opr :` over a `FullRange` is a comment (`:2420`); in the component only, `SimpleMappedIndexed`, `SimpleIndexValuePairs`, `ReversedIndexed`, `SimpleReversedIndexed` (`.fss:3763`, `:3783`, `:3934`, `:3954`); in `Random`, `UniformDistribution` (`Library/Random.fsi:260`), which Part IV does not render.
- **The sentences made false and those edited:** sections 7 and 8.
- **Ladder files, compiled tests, specification examples, microGPT components:** none changes verdict, phase or first error (section 5).
- **Files edited beyond those named:** `Library/Random.fsi:260`, `Library/Random.fss:374`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:205`. Within named files, beyond the named cases: `TypeAnalyzer.scala:261-262` (the `Object` shortcut) and the desugarer's clause rule (`PreDisambiguationDesugaringVisitor.java:91-123`).
- **A program's own generic over an indexed type's index parameter needs the bound under the checker** (section 6). microGPT's components declare such generics unbounded: `explorations/run-c4/src/FlatArrays.fsi:15-21`, `explorations/apl/mg/FlatArrays2.fsi:68-73`, `:126`, `explorations/apl/mg/AplMg.fsi:41`, with their components. Walk runs them (the quick pair passes); the compiled path reaches no such line before the switch-over (the eighteen components stop at 'Array is undefined.' and the like). No model line was changed.

## 12. For FACTS

See record.md's FACTS entry.

## 13. Commands worked out

- The checker over one program with the interpreter's library, stopping after type checking: `java -Xmx4g -Xss64m -Dfortress.caches=<fresh caches> -cp "<count stage scratch>/classes:$(bin/fortress_classpath | tail -1)" WorldFlip -stop typecheck P.fss`, with the classes that a count-stage run compiled into its scratch.
- Walk with one class of the base ahead of the edited build: `javac -nowarn -cp "$CP" -d <dir> <base copies of the .java files>`, then `java $JAVA_FLAGS -Dfortress.caches=<copy> -cp "<dir>:$CP" com.sun.fortress.Shell walk tests/X.fss` from `ProjectFortress/`.
- A strict check of the specification's log: `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log`.
- The count of profile samples through a method: `jfr print --events jdk.ExecutionSample --stack-depth 256 <file>.jfr`, split on `jdk.ExecutionSample {`, counting the events whose stack holds the method's name.