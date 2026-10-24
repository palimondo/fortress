<!-- The audit of phase 3's zero for the curator: whether climb batch 22's distance 0 and checker count 0 (F-53) are correct, what the two stages see and leave unseen, every library change made since `sealed-tree` to clear a checker error sorted into four kinds, and the debt that goes into phase 4. Written 2026-10-24 by an Opus audit worker against `main` at `30373c041` (`ef103a417` by the end, record commits only: `git diff --stat 2bff2fe23 ef103a417 -- Library ProjectFortress build.xml bin Specification` is empty, so the code is climb batch 22's landing). I read the main tree only. I measured in one worktree, `/home/user/fortress-zaudit`, seeded detached from `/home/user/fortress-base23` (`e0ec620a9`, whose code is `main`'s), and removed it after. The measurements: the stock distance stage, and copies of it with one shadow class each, compiled into a scratch folder ahead of the build: an instrument for row 470, two for row 782, the planner's `export-check-alt4i.patch` for row 816, a reversed component order, the `compile` setting, other target lists, and `-order full` for code generation. Also two small compiled programs and two walk programs. Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Up to two stage runs went side by side, so I give no timing. I changed nothing in the main tree or the base build and committed nothing. -->

# Phase 3's zero, audited

## In short

- **The number is correct for what it measures.** I re-ran the gate's distance stage on `main`'s code and got `#total 0`, every `#kind` 0 and `#crash none`. All 12 targets ended rc 0, and all 168 stage lines read `errors=0`, 5 for each api and 9 for each component. Nothing is caught, filtered or classed away before the total. `classify.py` only labels the errors, and the total is `len(rows)` (`tools/distance/table.py`). A reversed component order also gives 0.
- **I found no error left uncounted on purpose.** The limits of the zero are named in the record: row 816's reading of `abstract`, row 782, and the twelve-component scope. They are wider than the record says, in three places:
  1. **Row 782 hides 9 real differences.** The export check skips top-level symbolic operators. With them admitted, the api's 157 top-level operator declarations in the twelve are 148 matches and **9 real differences**: `#` ×3, `:` ×3, `BIG ||`, `BIG |||` and `List`'s `BIG <|[\T\]|>`. The 157 "missing declarations" that the stock rules then print are the check's own defect: it files each operator twice, once under a key made from its span. I showed the cost on a two-file program: such a difference compiles, links and dies with `NoSuchMethodError` at the call. `#` and `:` build every range loop. The library fix is 10 lines, and with it every operator matches and no type error comes.
  2. **The twelve are not closed under import.** `List` imports `CovariantCollection` and `OneShotFlag` (`Library/List.fss:13`, `:15`). Neither is checked. Checked once: `CovariantCollection` has 12 errors and 2 crashes, `OneShotFlag` 1 export error. Every `ArrayList` holds `OneShot` fields (`List.fss:253-254`), and every list comprehension goes through `covariantCompr` (`List.fss:178-179`).
  3. **The zero holds at the setting P-42 promises, which the compiled path does not have yet.** `Shell.useCompilerLibraries()` still sets the extends-`Object` pre-desugaring (`ProjectFortress/src/com/sun/fortress/Shell.java:371-372`). Under that `compile` setting the same twelve give 685 errors, 580 of them "bound Object". No PLAN line holds the flip.
- **Library changes made to clear checker errors (Part B): 57 entries.**
  - kind 1, the team's own device: 14 groups;
  - kind 2, a restoration of the team's text: 8;
  - kind 3, a reading of ours: 13 groups, about 180 retyped sites among them;
  - kind 4, a giveaway by the brief's letter: 22 items. 9 rest on a decision of the curator, and their judgement belongs to the decisions map. 13 landed at a rung's or a planner's default: 9 of these lose nothing a program could use, and 4 cost something real (the casts in items 12 to 14, item 19's weaker type).
- **The largest debt after the switch-over** (Part C): P-42's flip; row 782's 9 operators; the 449 natives, which the checker reads none of until climb batch 23's rung C; code generation, which refuses 52 declarations of the twelve on `main` (F-34 counted 58 on an older base); row 701, where 4 of the 5 walls are lines the revival added to clear checker errors; `List`'s two unchecked imports; the model's four imports (31 errors); row 816's 12 members.

## Part A. What the two stages see, and what they don't

### A.1 The number, reproduced

    explorations/coordinator/tools/distance/run.sh tmp/dist-stock.txt tmp/dist-stock
    #total  0
    #kind   export  0          (every #kind row 0)
    #crash  none
    #shadow every shadow edit matched the tracked sources

In its `run.txt`, every `### done` line reads `rc=0`, and all 168 `@@SC STAGE` lines read `errors=0`. No `API-CRASH`, `COMPONENT-CRASH`, `APIS-NOT-SUCCESSFUL` or "has N errors" line occurs. I reused the gate's count stage (F-53, `climb-batch-22/gate/checker-count.txt`), since the code is the gate's.

### A.2 Scope

- **The twelve** (`explorations/coordinator/tools/distance/run.sh:85-87`): `FortressLibrary`, `RangeInternals`, `FortressBuiltin`, `NativeArray`, `List`, `String`, `FlatString`, `Stream`, `NatReflect`, `TypeProxy`, `Writer` and `AnyType`.
- **The library has 54 components:** 50 in `Library/` without the three `Compiler*` files, and 4 in `ProjectFortress/LibraryBuiltin/` without `CompilerBuiltin`. The brief's 53 counts the `.fss` files of `Library/` with the compiler's three.
- **`List`'s two imports.** In the stock run their apis are checked only during the `List` target. That target runs with `probe.componentOnly` (`tools/distance/DistanceMulti.java:58`), so the tracked method checks them with no error lines (`add-patch.py:46`, `:70`). Their `@@TC API ... errors=0` lines say they are clean today. Their components are never checked. Checked once each, as the first target, with the stage's own driver:

      TARGETS=Library/CovariantCollection.fss <run.sh copy>   -> #total 12 (export 1, return-type 2, typecheck 9)
        #crash decl  ObjectDecl CovariantCollection.fss:123:1-134:2  TypeError  Cannot handle (LValue ...
        #crash stage component CovariantCollection thunker  TypeError  ...:125:5-126:6: Must provide type for initializer List(sz)
      TARGETS=Library/OneShotFlag.fss <run.sh copy>           -> #total 1 (export: ObjectDecl OneShot at OneShotFlag.fsi:14.1, due to different parameters for object constructors)

  The crash means the checker never typed that declaration, so more errors may sit behind it.
- **The model's four imports.** `explorations/compile-ladder/plan-23/probes/four-imports-base.tsv` and its `NOTES.md` give `System` 2, `File` 4, `FileSupport` 24 and `FortressAst` 1 (an export error over 203 generated objects), and `FortressSyntax` 0, on this code. The four are on microGPT's path: its I/O, its arguments and the APL program's syntax api.
- **The rest of the library, one census.** I ran the stage's driver over the 41 components outside the twelve, in one JVM, all but the compiler's three files and `GeneratorLibrary`:
  - `#total none`, because `Avl.fss`, an Executable kept in `Library/`, stops before the checker: "File Avl.fss has 25 errors.", 'Variable key is not defined.', also under walk.
  - Of the other 40: **624 distinct component errors in 30 components**. The most are in `ReflectiveQuickCheck` and `Random` (63 each), `SkipList` 58, `QuickCheck` 48 and `Heap` 40. `Constants`, `Containment`, `FortressSyntax`, `Generator22D`, `Pairs`, `Reader`, `StatDigest`, `Testable`, `Timing` and `Tuple` read 0.
  - **At least 92 api errors in 10 apis**, read from the untallied `@@TC API` lines; each counts only up to its api's first failing stage. `Random` has 40 and `Sparse` 16.
  - **25 crash rows**, among them `Format`'s 12 functions with untyped parameters.
  - None of this is phase 3's exit by its letter, but it is what "the one library" holds beyond the prelude. `Containment` reads 0 here, though review-queue item 212 expects it to be refused under P-146's text.
- **What else the switch-over needs:**
  - `Executable.fsi`, an api with no component, which a program exports (`run(): ()`);
  - `System`, which takes `CompilerSystem`'s place in 27 compiled tests (`ProjectFortress/compiler_tests/*.fss` import it);
  - `Set`, which one compiled test imports.

  Only `System` is measured (2 errors).

### A.3 The settings, and what the tools leave out

- **The bound `Any`.** The stage runs `-setting any`: walk's extends-`Object` pre-desugaring off, the compiled-expression desugaring on (`tools/distance/DistanceMulti.java:46-48`). The compile command sets the pre-desugaring on today (`Shell.java:372`), and P-42 says the switch-over ends that departure. Measured on the same code:

      run.sh tmp/dist-compile.txt tmp/dist-compile compile
      #total  685
      #kind   bound-Object  580
      #kind   typecheck     105
      #crash  none

  So the zero holds only once the compiled path takes walk's setting. PLAN's phase 4 does not name that step, and its 27 compiled tests that import `CompilerSystem` were never run under it.
- **The memo is off** (`-Dfortress.analyzer.overload.cache=false`, `run.sh:84`; F-43). An ordinary `fortress compile` runs with it on (`OverloadingChecker.scala:79`). So the stage is stricter than a compile, which is the safe direction for the library.
- **Every stage of each unit** (`add-patch.py`). For an api: hierarchy, acyclic, two well-formedness passes and overloading. For a component, also api extraction, typecheck, export and variance. Each stage's crash is caught and counted (`table.py:63-72`).
- **The phases end at the type checker** (`DistanceMulti.java:37-39`). Desugaring and code generation are not in the number (F-34; Part C).
- **Two gaps of the tool's own, both 0 today:**
  1. `table.py` reads no `@@TC API ... errors=N`, `API-CRASH` or `COMPONENT-CRASH` line. So an error in an api that only a later target checks, as `List`'s two imports are, would not be counted. Both read `errors=0`.
  2. `CompoundApiChecker`'s early return (`StaticChecker.java:174-179`) prints no error line. No api of the twelve is compound.

### A.4 The checker's known blind spots, row by row

I listed the 86 open checker rows (`python3 explorations/coordinator/tools/ledger.py heads`, filtered to open rows of area checker or specification) and read each where the checker accepts what the text or the designers refuse.

**Row 816, the reading of `abstract` (CONTESTED).** I measured it again on the landed tree with the planner's `compile-ladder/plan-22/probes/export-check-alt4i.patch` as a shadow class:

    #total 1   #kind export 1   #crash none
    (TraitDecl ReadableArray at FortressLibrary.fsi:1427.1, due to missing members ...),
    (TraitDecl ActualReduction at ...:1896.1 ...), (TraitDecl Range at ...:2189.1 ...),
    (TraitDecl String at ...:2447.1 ...), (TraitDecl AnyMaybe at ...:981.1 ...)

This is the planner's figure: 5 entries over 12 members (`CLIMB-BATCH-22.md`, question 1). So the zero rests on question 1's default, as the batch 22 review's finding 1 says. Today it costs nothing, since no compiled client reads the library. After the switch-over, a compiled call of any of the 12 through the trait's type dies with `NoSuchMethodError`, except the 3 that resolve through a parent at the same descriptor (`perf-probes/export-abstract-codegen/REPORT.md`, "In short").

**Row 782, top-level symbolic operators (NEGATIVE-BOUNDED): measured and sorted.**
- The stock check reads only `isDeclaredName` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:275`).
- `perf-probes/export-check-full/` admits no operators, so I wrote two shadows of `ExportChecker.scala`:
  - (a) under an environment switch, `isCheckedName` in place of `isDeclaredName` at `:275`, with one line printed for each api declaration that finds no match;
  - (b) the same, plus, for every top-level operator of the api, a comparison with every component declaration of the same name, whatever key holds it, through the check's own `equalFnHeaders`.
- Results on the twelve:
  - (a): `#total 3` (`#kind export 3`, units `FortressLibrary`, `List`, `RangeInternals`, `#crash none`), with 157 "absent" entries and 9 headers that differ.
  - (b): FortressLibrary.fsi 138 match and 8 differ, List.fsi 4 and 1, RangeInternals.fsi 6 and 0. Each operator is listed twice, once under its name and once under its span key, so the raw counts are doubled.
- **The defect of the check.** The api's function relation files each top-level operator declaration under two keys: its operator name, and a name made from its span, such as `_|Library|FortressLibrary.fsi:1800:1-1801:59`. The span key can never occur in the component. The 157 "missing" entries are exactly those span keys. This is the cause that row 782's "Not traced" leaves open. It is not `equalFnHeaders`: under (b), `RangeInternals`' `SCMP` and `PCMP` match.
- **The 9 real differences:**

  | api | component | what differs |
  |---|---|---|
  | `Library/FortressLibrary.fsi:2309-2311` `opr #` ×3 → `CompactFullRange[\ZZ32\]`, `[\(ZZ32,ZZ32)\]`, `[\(ZZ32,ZZ32,ZZ32)\]` | `Library/FortressLibrary.fss:4164-4170` → `CompactFullParScalarRange`, `CompactFullRange2D`, `CompactFullRange3D` | return type |
  | `fsi:2313-2317` `opr :` ×3, likewise | `fss:4172-4179` | return type |
  | `fsi:2130` `opr BIG ||(g: Generator[\Any\]): String` | `fss:3689` `opr BIG ||[\T\](g: Generator[\T\]): String` | static parameters, parameter |
  | `fsi:2137` `opr BIG |||`, likewise | `fss:3699` | the same |
  | `Library/List.fsi:114` `BIG <|[\T\]|>: Comprehension[\T,List[\T\],List[\T\],List[\T\]\]` | `Library/List.fss:178` `...,AnyCovColl,AnyCovColl\]` | return type |

- **The cost, shown on a two-file program under the compiler's prelude.** The api declares `opr #(a: String, b: String): A`. The component declares the same operator answering `B`, where `object B extends A`. A client calls `"x" # "y"`:

      bin/fortress compile P782.fss  -> rc=0     bin/fortress link P782.fss -> rc=0
      bin/fortress run P782
      REACHED pick
      Caused by: java.lang.NoSuchMethodError: 'P782Api$A P782Api.#(fortress.CompilerBuiltin$String, fortress.CompilerBuiltin$String)'

  With the component's `#` answering `A`, the same run prints `PASS`.
- **So after the switch-over**, every compiled `lo#n` and `lo:hi` reached through the api's header dies the same way, by this mechanism. `#` and `:` build every range loop. I did not run this on the one library, since no compiled program can link it yet.
- **The fix, measured with the checker only.** It makes 10 library lines say one header on both sides. The component's six `#` and `:` take the api's types, the library's own rule where the api cannot name the component's type (the `fortress-repo` skill's `library.md`, "Designing a change"). The api's `BIG ||` and `BIG |||` take the component's generic header. `List.fsi` imports `CovariantCollection.{AnyCovColl}` and takes the component's type. With these lines and shadow (b), all 157 match, and the stage reads `#total 3` export (the span-key entries) with no other kind. So no type error comes. I did not run walk's suite on these lines.

**Row 731, unwritten reduction arguments.** The checker refuses here; it cannot hide an error. The library writes the argument at its sites (F-285), so the gap stays for user programs and the team demos.

**Every other open row of this kind:**

| Row | What the checker accepts | Could it hide an error in the twelve today? |
|---|---|---|
| 470 | a written static argument at a top-level call, unchecked against its bound (`scala_src/typechecker/impls/Functionals.scala:1191` uses `staticInstantiation`, whose `staticArgsMatchStaticParams` matches kinds only, `scala_src/useful/STypesUtil.scala:782-801`) | **Measured: no.** I put an instrument at that call that tests each overloading with `staticArgsMatchStaticParamsForApp` (`:803-833`, the dotted call's test) and only prints. 1,190 tests over 491 call sites: every one `kinds=true bounds=true`; the stage's total is 0. |
| 352 | the `throws` check is performed on neither path | **Yes, latent.** `cast` throws `CastError`, a `CheckedException` (`fsi:1198`), with no `throws` clause (`fss:32-37`, the team's). So does `__resolveBottomArgumentType` (`fss:1490`, the team's), and the revival's walk replay (`fss:1377`, `20474c144`). A built check would refuse those, and each caller of `cast` that neither declares nor catches `CastError`. The revival added about 50 such calls (Part B). |
| 474 | a top-level tuple binding typed to pass anywhere | No: the twelve have no top-level tuple binding (grep `^(` with `=`). |
| 781 | contracts and trait `throws` dropped | No: every `requires`, `ensures` and `invariant` in the twelve is in a comment (`String.fss:97`, `:114`, `:172`, `:191`, `:319`, `:379`, `:403`, `:559`; `fss:4043-4044`). |
| 393 | cycles of coercions | No: the `coerce` graph runs from narrower to wider only (`fss:414-416`, `:581-586`, `:678`, `:733`, `:821-823`, `:914-915`, `:994-1001`; `FortressBuiltin.fss:388`). |
| 404, 406, 570 | variance annotations; `bool` arguments in exclusion; object expressions | No: none of these in the twelve. |
| 414 | the declaration rule at a static-parameter argument | No, by text: no trait or object header in the twelve extends two instantiations of one trait. Inherited pairs not traced. |
| 547 | a verdict that depends on what compiled before in the same JVM | **Measured: no** for one other order. `FortressLibrary` first, the other eleven reversed: `#total 0`, `#crash none`. |
| 653 | an `override` that overrides nothing | No: walk refuses one at load, and the library loads. |
| 480 | `case` without an operator picks `=` | No: the twelve's one such `case` (`RangeInternals.fss:429`) compares numerals with a `ZZ32`, where `=` is right on either reading. |
| 412 | the bound `Object` on the compile path | The setting: see A.3, 685 errors. |
| 487, 489, 490 | `comprises` checked at immediate subtypes, by the subtrait's own variable names, by simple name | Possible in principle, for closed traits whose extenders are in other units. Not measured. |
| 499, 759, 543 | generic overloads by position; a generic `T` beside `Any`; coverage typing | They choose a dispatch, not an error. A crude grep found no 759 pair in `FortressLibrary`. 499 not measured; 543 is deliberate. |
| 691, 773, 400, 391, 392, 325 | extra arguments to a generic call; a conditional member called where the condition fails; a dropped size arm; coercion pairs unchecked at the declaration; a coercing ascription; a numeral out of range | Each could hide an error in principle. None measured. 773's only conditional extension in the twelve is `List`'s order (`List.fss:107`). |
| 768, 769, 652, 805 | the export check and keyword or tuple refusals | They refuse, so they cannot hide an error. |
| natives, by construction (no row) | `builtinPrimitive[\T\](javaClass:String):T` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:30`) takes `T` from the declared return type | **Yes.** Every native body passes whatever its Java class does: 393 bindings in the twelve, unchecked until rung C of climb batch 23 rewrites them (`CLIMB-BATCH-23.md`, section 4). |

## Part B. Every library change made to clear a checker error

### B.1 Scope and the rule I sorted by

- **Scope.** Commits from `sealed-tree` (`75cca6683`) to `main` that change `Library/` or `ProjectFortress/LibraryBuiltin/` without the compiler's prelude, and whose message, rung report or FACTS entry gives a checker error as the reason. 65 commits touch those paths: `git log 75cca6683..main -- 'Library/*.fs?' 'ProjectFortress/LibraryBuiltin/*.fs?'`.
- **Excluded, with the reason on record:**
  - walk: `02d09a39f` (walk's load refusal), `57600bc27`, `d6faad28f`, `2770550c3`, `f9fe5c874`, `a0f839ad7` (row 721; it adds 16 casts, `fss:2597-2604`, `:2984-2991`), `ff19305cc`, `5e60e356a`, and the walk half of `20474c144`;
  - the specification or a semantic decision: `ab914b6e0`, `413f36ac0`, `5ad4a9957` (P-153);
  - comments: `c2b4e2c95`, `581356f32`;
  - the compiled run's arms: `fd5cb4864`;
  - the compiler's prelude, deleted at the switch-over: `cee79d3f1` to `4ed46558d`, `6bec1b004`, `ce0c7f453`;
  - `de22fd928`'s bounds, reverted by `a1b5c253d`. Only its `StandardMinMax` `MIN` and `MAX` returning `T` stays.
- **One provenance note.** `e487cec2d`, titled "Boot note: the next check-in", carries climb batch 20's rung A: the casts of F-264, `fill` and `tabulate` at `Vector`'s and `Matrix`'s types, and `array3(v)`. `PLAN-history.md` holds it as gather.3, with the force-push left undone.
- **The rule.**
  - A change goes to kind 3 where the team's own texts are split (api against body, library against specification) and we took one side.
  - It goes to kind 4 where it does one of the brief's listed things: an api promise dropped, a declaration removed or commented out, a `cast` where the checker should prove the type, a `fail` body, a type widened or narrowed against all of the team's text, an `excludes` or a bound with no team precedent.
  - A `cast` where no rule of the language can carry the type is kind 1. Examples: a `typecase` arm over a size, where sizes compare by written form (P-55), or a value read from an `Any`-typed store. The team's precedent: `cast[\T\](underlying.get(i))` at `a874948ac:Library/List.fss:312`, and the `cast[\Number\]` unwraps at `a874948ac:Library/FortressLibrary.fss:3042`.
  - A `cast` where a declaration in the library's own style could carry the type is kind 4.
  - An entry is one change the record names. Repeats are grouped.

### B.2 The counts

| Kind | Entries | On a curator's decision |
|---|---|---|
| 1, the team's own device elsewhere | 14 groups (about 60 sites) | G4's witness arms on P-78; G2 on answer 9 |
| 2, restorations of the team's text | 8 | 1 (P-76) |
| 3, readings of ours | 13 groups (about 180 retyped sites among them) | parts of R8 and R11 |
| 4, giveaways by the brief's letter | 22 | 9 |

### B.3 Kind 4, item by item

"D" marks an item on a decision, whose judgement is the decisions map's. "R" marks one at a rung's default.

| # | Commit, line | What | Cost to a user program | To undo it |
|---|---|---|---|---|
| 1 | `a7ced6764`; team `List.fsi:99` | `List`'s `zip[\F\](other: List[\F\])` removed. R | None: the inherited `ZeroIndexed.zip` answers (F-63). | One api line, which the checker refuses as a covariant redeclaration. |
| 2 | `952892a00`; `fsi:981` | `AnyMaybe` no longer extends `Equality[\AnyMaybe\]`; it writes its own `=`. D (P-43/P-97; F-44) | Generic code over `Equality` cannot take a `Maybe`. | The exclusion rule refuses it. |
| 3 | `952892a00`; `fss:4883-4892` | The component's second `ANDCOND`, over relational predicates, is now `andRelCond`, reached by a `typecase`. D (the same) | A program's `p1 ANDCOND p2` of two relational predicates is no relational predicate, so the filter fusion is lost; the values are the same (row 458). | The same. |
| 4 | `f3b62bc83` | `fill(f: I -> E)` becomes `tabulate`; the factories become `tabulatedArray1` to `3` and `tabulatedVector`. D (answer 10) | A program that passes a function to `fill` stores the function. | A respelling. |
| 5 | `d846e3644`, `e455ccd98` | `Number`'s operators move to the flat siblings; `BIG MAXN`, `MINN` and `MINMAXN` are removed; `RR32` is no longer below `RR64`. D (P-43; answers 7, 8) | As decided. | — |
| 6 | `3be1fecd7` | Ranges over `ZZ32` only. D (the ranges decision) | A range over another integer type stops at construction. | — |
| 7 | `070ef39e5`; `fss:4222-4224` | `RangeInternals`' three `openRangeHelper` overloads leave its api; one witness `typecase` with three casts replaces them. D (answer 9) | None: an internal api, and each arm's cast meets its own instance. | — |
| 8 | `631fb867e`; `RangeInternals.fss:188` | `ScalarRange.indexOf` is a meet with a `fail` body. R | None: no team range object without ends had `indexOf`, so walk stopped there before too. | — |
| 9 | `74b28e9d4`; team `fss` `__ImmutableSubArray1` | Its `put` removed. R | None for a correct program: it wrote through an immutable view. | — |
| 10 | `abe8b0342`; `fss:4069-4080` | The five cutting methods of `TrivialOpenRange` `fail`. D (P-56) | `(:).truncL(3)` and its siblings stop with a message, where the team's answered a range; nothing in the tree calls them (P-56). | — |
| 11 | `4190069c4`; team `FlatString.fsi:20` | The api's `opr ||(a:FlatString, self)` removed. R | None: the component never built it (F-83). | — |
| 12 | `4190069c4`, `557cabb04`; `fss:4474` | `opr ||(a:String, b:Any) = a || cast[\Object\](b).asString`. R | Under walk `"x" || (1, 2)` prints `x(1,2)` (measured). After the switch-over a tuple is no `Object` (P-42, P-156), so this cast can raise `CastError`. Not measured. | A body that converts without `asString`, as `println(a:Any) = println("" a)` does (`fss:4535`); the obvious `"" || b` would recurse here. |
| 13 | `e487cec2d`; `fss:2546-2552`, `:2867-2871` | `Vector`'s `+`, binary and unary `-`, `scale` and `pmul`, and `Matrix`'s `+`, binary and unary `-` and `scale`, cast their `map` or `ivmap` result (F-264). R (batch 20's fork 4, default, "not consequential") | A `CastError` if a `Vector`'s `replica` answers no `Vector`; after the switch-over, one type test per operation. | Redeclare `map` and `ivmap` at `Vector`'s and `Matrix`'s own types, as F-158 did for `fill` and `tabulate` (`fsi:1654-1655`). The checker then proves the type. |
| 14 | `e487cec2d`; `fss:2717`, `:2721` | `Array2`'s column and row subscripts cast the sub-array to a sized `Array2`. R (the same fork) | The same kind of run-time test. | A sized range subscript. |
| 15 | `557cabb04`; team `a874948ac:Library/FortressLibrary.fsi:1496-1502`, `:1604-1610` | Six top-level `Vector` and `Matrix` `+` and `-` removed from the api. R | None: the component never built them, and `AdditiveGroup`'s methods answer. | — |
| 16 | `153887360` | Every index parameter is bounded by `Index`, and a tuple of `Index` types is an `Index`. D (P-156; an Appendix I departure) | As decided (`revival-changes.md`). | — |
| 17 | `372b9bf6a`; `List.fsi:67-68` | A list is ordered only where its elements are totally ordered. D (P-154) | A list of `RR64` has no order for the checker. | — |
| 18 | `031c38bbc` | The api's `asDebugStriing()`, a team misspelling, removed. R | None: never built. | — |
| 19 | `8dd64e8fc`; team `fsi` `Just`'s and `Nothing`'s `opr[r:Range[\ZZ32\]]` | Removed from the api; `Condition`'s range subscript answers, typed `Condition[\T\]`. R (batch 22's fork 4) | `j[r]` is typed `Condition[\T\]` where the api said `Maybe[\T\]` or `Nothing[\T\]`. | The api lines back at `Condition`'s type. |
| 20 | `8dd64e8fc` | The four arrays' `opr[_:OpenRange[\ZZ32\]]` removed. R (fork 6) | None: the component never defined them. | — |
| 21 | `8dd64e8fc` | `BigReduction`'s and `Comprehension`'s getters out; the parameters renamed so that the field names are the same. R (fork 8) | None for a read by name; positional construction is unchanged. | — |
| 22 | `e487cec2d`; `fsi:1532-1535` | The api's `immutableArray` of rank 2 and 3 put in a comment. R | None: the team's own component has them in a comment (`fss:2276-2281`, the team's). | — |

Of the 13 items marked R, 9 lose nothing that any program could use (1, 8, 9, 11, 15, 18, 20, 21, 22). Item 19 weakens one static type. Items 12, 13 and 14 put a run-time type test where the team's text had none; the checker could prove 13 and 14 with a library declaration, while 12's type cannot be proven at all.

### B.4 Kinds 1 to 3, grouped

**Kind 1, the team's own device elsewhere** (each with the precedent the record or I cite):
- G1: Meet Rule meets declared on the meet: `0ae526b31` (`Maybe`'s `map` and `ivmap`, `copy`, `map` and `nest`), `631fb867e` (the range `CAP` and `IN` meets, `Just`'s `SQCAP`), `557cabb04` (`EmptyString`, `Integral` and `ZZ` `=`, `Maybe`, `Float`) (F-81, F-82).
- G2: `excludes { HasRank }` on `StandardMin`, `StandardMax`, `SequentialGenerator` and `FilterGenerator` (`fsi:195`, `:207`, `:924`, `:2170`; `070ef39e5`, answer 9). Precedent: the team's `a874948ac:Library/List.fsi:55`.
- G3: written static arguments: `BIG MIN[\ZZ32\]` (`fss:4396`, `:4402`), `<|[\E\] ... |>` (`List.fss:151`) (`bd00ad997`), and `Condition`'s `cond[\..\]` calls (`a9b9933e6`). Precedent: the team's `transpose`, `List.fss:504` (blame `^5a68404fd`).
- G4: casts that no rule can replace:
  - the factories' `N[\0\]` arms (`fss:2574`, `:2585`, `:2975`);
  - `cast[\O0\]` (`fss:1476`, item 46, the coordinator's call);
  - the identities' witness arms and fallbacks (`fss:3394-3421`; P-78; F-250);
  - `List`'s comprehension unwrap (`List.fss:179`).

  Precedent: the team's `List.fss:312`. About 21 sites.
- G5: conversion by concatenation with `""` (`String`'s `||(a:Any, …)`, `4190069c4`). Precedent: the team's `println(a:Any)`, `a874948ac:Library/FortressLibrary.fss:4135`.
- G6: `CatString`'s halves and `StringStats` as fields beside getters, as `depth` is (`1e176516c`).
- G7: a range's ends read through `left.get` and `extent.get`, and `List`'s strided device (`1e176516c`, `abe8b0342`).
- G8: the tuple orders bound each element (`fsi:2660-2670`; `9ba86f7da`, item 43's default). Precedent: the team's per-element bounds on `SCMP` and `PCMP`, `a874948ac:Library/RangeInternals.fss:87-112`. This narrows what walk orders (F-92).
- G9: typed `BigReduction` shapes (`embiggen`; `Map`'s, `IntMap`'s and `PrefixMap`'s `BIG UNION` and `UPLUS`), as the team's `BIG MINNUM` (`2b1cd8e63`).
- G10: each integer type's `numerator` in `ZZ`'s shape, and `Array2`'s offset in `Array1`'s (`604d0e23c`).
- G11: `matrix(v)` writes `v.zero` (`749ec523e`; F-57).
- G12: `fill` and `tabulate` redeclared at `Vector`'s and `Matrix`'s own type (`e487cec2d`), as `FlatString` overrides `generator`.
- G13: the four string-object bodies (`c8e013faf`), as `SubString`'s `balanced` (`String.fss:364-366`) and `FlatString`'s `isBalanced` (`FlatString.fss:48`).
- G14: 11 `RangeInternals` declarations take the `Integral[\I\]` bound of the traits they instantiate (`a7ced6764`). Since superseded by `3be1fecd7`.

**Kind 2, restorations:**
1. `AnyList`'s `comprises { List[\E\] } where [\E\]`, from the team's comment (`24db899fa`; `List.fss:87`).
2. `NatParam`'s `comprises { N[\n\] } where [\ nat n \]`, from the team's comment (`7fd8fddc8`; `NatReflect.fss:24`).
3. The generic `distribute` over its own `K`, the team's commented generic, as Emoto's comment reads (`2b1cd8e63`).
4. `String`'s default `CASE_INSENSITIVE_CMP`, from the team's commented `ensures` (`1e176516c`; `String.fss:114`).
5. `IntLiteral`'s arithmetic, which a team comment withheld, and its 24 bindings that stood inside a comment (`9d2e4c856`, P-76).
6. `fail`, `builtinPrimitive` and `BIG <|` unbounded again, as the team declared them (`a1b5c253d`, undoing `de22fd928`).
7. `StandardMinMax`'s `MIN` and `MAX` answer `T`, as their bodies do and as the specification says (`de22fd928`).
8. `IntMap`'s `genComb` bodies for the team's declarations (`9ba86f7da`).

**Kind 3, readings of ours:**
- R1: declared types retyped to what their bodies answer: `0ae526b31` (23), `631fb867e` (55), `a1b5c253d` (25), `a9b9933e6`, `74b28e9d4` (32), `b872d65a1` (36, Q3's items 39 to 41).
  - Some strengthen the api: `CMP` answers `TotalComparison`, `every` and `atMost` answer narrower types, `theorems` answers `ZeroIndexed`.
  - Some weaken it where the body did: `narrowToRange(other:OpenRange)` answers `Range[\I\]`; `recombine` answers `FullRange2D`; `lift(r:R)` and `simpleJoin(a:R, b:R)` take `R` where the api took `Any`.
- R2: the api states the component's members at their headers (`library.md`'s rule; F-282). `a7ced6764`, `070ef39e5`, `1e176516c` (with `Stream.fsi`'s eight members written `abstract`), `a1b5c253d` (`List`'s ten members written `abstract`, `BufferedWriter`'s constructor, `FortressBuiltin`'s `val` and `ready` now methods), `4190069c4`, `031c38bbc`, `8dd64e8fc`, `c8e013faf`.
- R3: functional methods made top-level operators: `String`'s juxtaposition (`fsi:2548-2550`) and its four concatenation families (`fsi:2526-2547`). The team's shape is one that `Specification/advanced/overloading.tex:518-523` refuses.
- R4: the specification over the team's library: `MatchFailure` unchecked (`fsi:1190`; `Specification/basic/expressions/typecase.tex:100`); `TotalComparison` extends `Comparison` alone; `RelationalPredicateCondition` loses its exclusion of its own supertype (`952892a00`).
- R5: the identity-less reductions at their element type (`aadd02f23`; F-144).
- R6: the array family's ring bound and the scalar block's per-operator bounds (`749ec523e`, landed at the curator's word as climb batch 13b). Under P-43, `Number` no longer carries the arithmetic that the team's bound gave.
- R7: `Generator`'s counted size default (`8f90e1e8c`; item 45's default), a new api member.
- R8: the ranges of rank 2 and 3 get bounded kinds, `narrowToRange` and the bounds check move to the `ZZ32` kinds, ranges compare corner by corner (Q50), and `SimpleMappedSeqIndexed` is new.
- R9: typed bodies: `__bigOperator`'s `body(i: I)` (F-220), local functions' parameter types (`7fd8fddc8`), `Matrix`'s `mul` as `do … also …`, `__whileCond` answering `Boolean`.
- R10: `SUFFIX_SUM` loops over `seq((0 # (|x| - 1)).reverse)`, row 661's workaround (`74b28e9d4`).
- R11: decided semantics: `String`'s `left` and `right` answer `Just` (item 42), `QQ`'s rounding raises (item 44, P-54), `isLeftZero` over `TotalComparison` (P-57), `TotalComparison` extends `StandardMinMax` (item 22).
- R12: `AnyList`'s `addLeft` and `addRight` through `singleton`, and `Comparison`'s lazy `LEXICO`.
- R13: `RR64`'s brackets and `truncate` answer `ZZ64` in the component, and `RR64`'s `^` takes a `Number` (`8dd64e8fc`; forks 3 and `rr64pow`).

**A side effect the record does not draw.** Row 701's walls in the twelve (B.5 and Part C):
- `SumReduction`'s two `distribute`s with a `where` clause (`fss:3445-3447`, `2b1cd8e63`, R11's neighbour);
- `atMost`'s `where { I extends Index }` (`fss:4109`, `153887360`, P-156);
- `AnyList`'s and `NatParam`'s clauses (kind 2, items 1 and 2).

So 4 of the 5 refusals with that message are lines that clearing checker errors put there. The fifth is `stringifyChars` with its `test` modifier.

## Part C. The debt carried into phase 4

In order of what it costs after the switch-over. "Now" is before it, when no compiled client reads the one library.

1. **P-42's flip of the compiled path's implicit bound.** Home: P-42, row 412. No PLAN line names the step.
   - Now: nothing.
   - After: the zero holds only if `fortress compile` takes walk's pre-desugaring. Under today's `compile` setting the twelve give 685 errors (A.3). The 27 compiled tests that import `CompilerSystem`, and their siblings, were never run with the bound `Any`.
2. **Row 782's 9 operators, and the check that cannot read operators.** Home: row 782; PLAN phase 4's names line.
   - Now: nothing.
   - After: every compiled `#` and `:` call reached through the api, so every compiled range loop, dies with `NoSuchMethodError` (A.4). `BIG ||`, `BIG |||` and list comprehensions likewise.
   - To fix: the 10 lines, measured clean by the checker, and the check's double key, a checker change.
3. **The natives.** Home: phase 4's first step; `CLIMB-BATCH-23.md`.
   - 449 live bindings (A 154, B 59, C 158, D1 36, D2 42), 393 of them in the twelve. The checker reads none until rung C.
   - Now: walk's values only.
   - After: the switch-over waits on all of them, and microGPT needs `Writer`'s natives, `nanoTime`, `getProgramArgsPrim` and `NativeArray` (F-32).
4. **Code generation over the twelve.** Home: F-34; PLAN phase 4's last bullet and phase 5; rows 304, 733, 818 to 823, 624.
   - Measured again on `main`, `DistanceMulti -order full -setting any` with dispatch skipped, as F-34 ran it: **52 declarations refused**: `FortressLibrary` 28, `RangeInternals` 11, `List` 5, `String` 5, `FlatString`, `Stream` and `NatReflect` 1 each. 666 `@@CG OK` lines; the checker passes all 52. F-34's 58 were on `aa5c67d48`.
   - The kinds: local functions (`LetFn`), varargs, `asif`, `label`, "Not in the trait table" (4 kinds ×2), `forbid`, "not in the kind env" ×3, two duplicate closure names (`ZipException`), and row 701's five.
   - After: the first wall between the library and bytecode.
5. **Row 701, the code generator's `where` clauses.** Home: PLAN's phase-3 `where`-clauses line, "after the switch-over"; review-queue item 182.
   - Its five walls in the twelve, four of them revival lines (B.4). The first wall `fortress compile` meets in `FortressLibrary` is `SumReduction`'s `distribute`.
6. **`List`'s two imports, unchecked.** Home: none on record; new.
   - `CovariantCollection` has 12 errors and 2 crashes, `OneShotFlag` 1.
   - After: `List` cannot compile without them, and nearly every library collection path uses `List`.
7. **The model's four imports, 31 errors.** Home: the names batch (`CLIMB-BATCH-23.md`, section 4, "Left out"). The rest of the library: at least 716 errors and 25 crashes in 40 components, and `Avl.fss` stops at name binding on both paths. No home.
8. **Row 816, 12 members.**
   - Home: question 1 (`PLAN.md:575`); `perf-probes/export-abstract-codegen/` gives the code generator's third way, about 30 lines, which closes 8 of the 12. 3 already resolve.
   - After: a compiled call of those members through the trait's type dies.
9. **The casts.** About 50 revival casts in the twelve, 16 more from walk's `a0f839ad7`.
   - After: each is a run-time type test in compiled code, and items 12 to 14 can raise `CastError`.
   - When row 352's `throws` check is built, `cast`'s `CastError` needs a `throws` clause or an unchecked `CastError` (A.4). No home for that interaction.
10. **Row 731's checker gap.** Home: row 731; review-queue items 51 and 247.
    - Now: the team demos are refused by the checker, and so are user programs that omit the argument.
    - After: the same for every compiled program.
11. **The review queue's 13 items before the switch-over**: 2, 20, 21, 30, 35, 36, 39, 108, 194, 212, 214, 229, 230 (`review-queue.md:34`). Each holds its own cost.
12. **The gates in phase 4.** Home: `CLIMB-BATCH-23.md`, question 1, default kept.
    - Without the distance stage, a moved native outside `FortressLibrary` is checked by no gate.
    - With it, the stage still cannot see `List`'s imports (item 6), operators (item 2) or code generation (item 4).
13. **Record that the zero made stale:**
    - row 308 ("the compiled checker refuses the interpreter's library") and row 399 (six sites, cleared) are open;
    - row 19 says "`CoercionOracle.scala` exists, unwired", but `STypeChecker.scala` uses it (`grep -l CoercionOracle scala_src`).

## Defects

- **The export check cannot read operators.** Once it admits symbolic names, the check cannot match any top-level operator: the api's function relation files each one under a span key as well as its name. This is row 782's untraced cause. Row 782 is to be rewritten by `ledger.py rewrite`, with the 9 real differences and the probe.
- **9 api and component differences of top-level operators** (A.4's table). A library defect hidden by row 782. Its run-time failure is shown on a two-file compiled program. A new row, `library bug (library)`, in section 3.
- **`List`'s imports have checker errors**: `CovariantCollection`'s 12 errors and 2 crashes, and `OneShotFlag`'s export error (`OneShot`'s constructor parameters). A new row or two, outside the distance.
- **The tool drops some api errors.** `table.py` reads no `@@TC API … errors=N` line, so an error in an api that only a later target checks is not counted. Latent; it holds 0 today.
- **`Avl.fss` stops at name binding on both paths**, with 25 'Variable … is not defined' (key, val, depth, asDebugStriing). No row holds it.
- **Stale rows:** 19, 308, 399 (Part C, item 13).

## Decisions

- **The sorting rule of B.1.** A side taken where the team's texts split is kind 3. Kind 4 follows the brief's list. A `cast` is kind 1 where no rule can carry the type, and kind 4 where a library declaration could. No decision of the curator covers this rule.
- **What counts as an entry.** An entry is one change the record names, with repeats grouped. The other way, one entry per changed line, gives a far larger count of the same changes.
- **The direction of the 782 fix.** For the measurement only, I let the component take the api's types for `#` and `:`, as `library.md`'s rule says where the api cannot name the component's types. I let the api take the component's generic header for `BIG ||` and `BIG |||`, the stronger promise, and `List`'s api take the component's `AnyCovColl`.

## For FACTS

1. Row 782 sorted.
   - The fact: of the 157 top-level operator declarations in the twelve apis, 148 match their components and 9 differ (`#` ×3, `:` ×3, `BIG ||`, `BIG |||`, `List`'s `BIG <|[\T\]|>`). The 157 entries the check lists when it reads operators are its double keys.
   - What it means: phase 3's export zero excludes 9 real differences; the switch-over meets them at every compiled range loop.
   - Shown by: a shadow of `ExportChecker.scala:275` (`isCheckedName`) with a per-declaration comparison: 276 matches and 16 differences in `FortressLibrary.fsi`, counted twice; 10 library lines turn all 314 into matches. Detail: A.4.
2. The twelve are not closed under import.
   - The fact: `List` imports `CovariantCollection` (12 errors, 2 crashes) and `OneShotFlag` (1), which the distance never checks.
   - Shown by: the stage's driver with each one as its first target. Detail: A.2.
3. The zero's setting.
   - The fact: under `run.sh … compile` the twelve give `#total 685` (`bound-Object 580`). The zero needs P-42's flip in `Shell.useCompilerLibraries()`. Detail: A.3.
4. Row 470 hides no error.
   - The fact: all 491 top-level call sites with written static arguments meet their bounds (1,190 tests). Detail: A.4.
5. Code generation on `main`.
   - The fact: 52 declarations of the twelve are refused, against F-34's 58, which stays as the older base's figure. Detail: Part C, item 4.
6. The library outside the twelve.
   - The fact: 624 component errors in 30 of 40 components, at least 92 api errors in 10 apis, 25 crashes; `Avl` stops at name binding. Detail: A.2.
7. Row 816 on the landed tree: `#total 1`, 5 entries, the planner's figure (A.4).
8. A reversed order of the later eleven targets gives `#total 0` (A.4, row 547).

## Commands I worked out

- A copy of `run.sh` whose `-cp` begins with `${EXTRA_CP:+$EXTRA_CP:}`, so that a shadow class compiled with `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d DIR X.scala` comes first, and whose component list is `${TARGETS:-…}`.
- `sed 's#-order check#-order full#'` on that copy, with `-Dprobe.bottomCompare=true -Dprobe.skipOverloads=true` added to `FLAGS`, for F-34's census.

## Questions for the curator (decisions not taken)

1. **Should the distance's list take `List`'s two imports now?** Default (mine): yes, report-only, so the stage reads 13 errors; a rung clears them before the names batch. The other way: they wait for the names batch, and the zero stays a zero of twelve. Consequential: it reads anew F-53's definition.
2. **When are row 782's 9 differences and the check's double key fixed?** Default (mine): one rung before the names batch, in phase 4's first library batch. The other way: in the names batch, where PLAN already places row 782.
3. **Should PLAN carry P-42's flip as a step of the switch-over, with the compiled tests run under it first?** Default (mine): yes.

## For the curator

**Can the zero be trusted?** Yes, in this sense. On `main`'s code the compiled checker reports no error and no crash over the twelve prelude components and their apis, with every stage run, the memo off and the bound `Any`. The number reproduces, is stable under another order, and has nothing filtered out. Two of the named blind spots hide nothing: row 470 (measured) and rows 474, 781, 393, 404, 406, 414 and 570 (none of their constructs in the twelve).

It is not yet a zero for the switch-over. Six things lie outside it:
- the compiled path's own setting (685 errors until P-42's flip);
- top-level operators (9 real differences behind row 782, `#` and `:` among them);
- `List`'s two imports (13 errors, 2 crashes);
- code generation (52 declarations);
- the natives (449, unchecked by construction until climb batch 23's rung C);
- row 816's 12 members.

**The library was bent to reach it mostly by decisions on record.** Of the 22 giveaways, 9 are decided: the flat tower, ranges over `ZZ32`, `Index`, `fill` and `tabulate`, the conditional list order, `(:)`'s fails, and the exclusion rule's two. Of the 13 taken at defaults, 9 lose nothing (promises of members the component never built, an immutable `put`, a meet's `fail`). Four cost something real: the `cast` in `||(String, Any)`, the nine `Vector` and `Matrix` casts, the column and row casts, and `Just`'s range subscript typed as a `Condition`. Every other change follows the team's devices, restores their text, or takes one side where their texts split.

**The debt, in order of what it costs after the switch-over:**
1. P-42's flip;
2. row 782's 9 operators, which every compiled loop meets;
3. the natives;
4. code generation's 52 refusals with row 701's five walls, four of them lines the revival added;
5. `List`'s imports;
6. the model's four imports, and the 40 other components;
7. row 816;
8. the casts, with row 352's latent `CastError`;
9. row 731;
10. the review queue's 13.

**Actions before phase 4, each mine until you say yes:**
1. Add `CovariantCollection` and `OneShotFlag` to the distance stage's list, report-only. Default: yes. Cost: none to measure, 1 rung to clear.
2. Fix row 782's 9 differences (the 10 lines above) and the check's double key, test first, with walk's suite on the lines. Default: one rung, before the names batch. Cost: 1 rung, about half library text and half a checker edit.
3. Put P-42's flip on PLAN's phase 4 as a named step, with the compiled tracks run under the bound `Any` once before it lands. Default: yes. Cost: a probe now, then part of the names batch.
4. Rewrite row 782, add rows for the 9 operators, `List`'s imports and `Avl`, and close or rewrite rows 19, 308 and 399. Default: the routing does it. Cost: no rung.
5. Bring F-34 up to `main` (52) and name row 701's four revival walls in its row. Default: the routing does it. Cost: no rung.
6. Leave question 1 (row 816) as asked, with the landed tree's figure confirmed: 5 entries, 12 members. Default: as landed. Cost: none now; the code generator's third way, 1 rung, after the switch-over.
7. Keep the nine `Vector` and `Matrix` casts until phase 6 measures their cost. Default: keep. The other way, redeclaring `map` and `ivmap` at the two types, costs 1 rung.

The worktree `/home/user/fortress-zaudit` is removed. `/home/user/fortress-base23` is as it was (`git status --porcelain` prints nothing), and so is the main tree.
