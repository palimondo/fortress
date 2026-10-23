<!-- Probe for climb batch 21's preparation (brief `compile-ladder/plan-21/evidence/briefs/probe-walk-conditional-extension.md`): the walk values that walk's half of conditional extension (row 774) moves, measured with a shadow of the fix that never lands, in the worktree `/home/user/fortress-probe-walk-cond-ext` at `main` 0c7e7be18 (climb batch 20's landed code), branch `wip/probe-walk-cond-ext`; the shadow is `walk-conditional-extension.patch` beside this report; the library and test respellings are given inline. Runs of 2026-10-23, 00:00 to 02:00 UTC, beside the export-check probe on the same machine. Meant for `explorations/perf-probes/walk-conditional-extension/REPORT.md`; the Write tool refused that path, so this text was written to the scratchpad, as the brief allows. -->

# Probe: walk reading an `extends` entry's `where` clause (row 774)

Worktree `/home/user/fortress-probe-walk-cond-ext`, seeded by `seed-worktree.sh` from the main tree's build at 0c7e7be18 (decision 1). The old code is the unchanged tree: the demos, microGPT and the probe programs ran in the worktree before the shadow was built; every later old run is the main tree's build through `old-fortress.sh` with a private caches folder in the worktree's `tmp/`. The main tree's code and build did not change during the probe (`git diff --stat 0c7e7be18 ddf5f8214` over `ProjectFortress Library build.xml bin` is empty; `ProjectFortress/build/implementation.stamp` dated 2026-10-20 09:02). Direct runs at `FORTRESS_THREADS=1`; the harness and the suites at 4. No timing is recorded.

## In short

- **The shadow:** two files, 56 lines of code added (about 10 of them a trace that only an environment variable turns on) and 7 removed, with comments 79 lines added. Walk reads an `extends` entry whose `where` clause binds no variable and holds only `X extends B` constraints, the checker's rule (`KindEnv.extendsConditions`), and leaves the entry out of an instance's extends list where some `X` is not a subtype of its `B`, tested by `subtypeOf` as walk tests a declaration's own constraint. Load, type tests and dispatch all read that list (section 1).
- **The gate test turns:** `XXXConditionalExtensionTypeTestWalk` passes with the shadow, so the harness reports it red, "Missing expected failure"; landing the fix promotes it (section 4).
- **What moves:** `ant testSystem`, 668 tests: 11 red, the gate test and 10 list tests, 4 of them the team's (`booleanGuard`, `asifTest`, `RangePrototype`, `QuickCheckTest`) and 6 the revival's. `ant testSpecData`, 130: 1 red, the team's `Generators.GeneratorDefn`. The demos: of 52, the 29 that ran to their end before still do, and no exit code or printed value moves beyond elapsed times and random inputs. microGPT's quick pair: both pass, with the same values (sections 2 and 5).
- **Three mechanisms make the 11 moves (section 3):**
  - (A) Walk instantiates a list at its elements' run-time class (row 364): `<|1, 2|>` is a `List[\Int\]`, `"a"` a `FlatString`, and `Int extends ZZ32`, which is a `StandardTotalOrder[\ZZ32\]`, not a `StandardTotalOrder[\Int\]`. So the condition fails, and the list loses its order, for every list of numerals or string literals built without a written static argument. `<|[\ZZ32\] 1, 2|>` keeps it.
  - (B) Once the order goes, the interpreter's library compares such lists by identity: its `=/=` and its three-argument `assert` call `=` in `FortressLibrary`'s scope, and `List`'s own element-wise `=` is reachable there only through `LexicographicOrder`'s. This is a defect today for any type whose `=` is its own: `P(1) =/= P(1)` answers `true` (section 7).
  - (C) The order that P-154 takes away: lists of tuples, floats, `Any` and ranges have no `<` or `CMP`. The library's QuickCheck keys a `Map[\Any,ZZ32\]` by lists of `Any`.
- **Respellings by the library's own way, each run:** `List` extends `Equality[\List[\E\]\]` outside the condition, as `Map`, `IntMap` and `PrefixMap` extend `Equality` (one line each in `List.fsi` and `List.fss`). This clears 7 tests and the specification example, and moves nothing else in the two suites, the 29 running demos or microGPT's quick pair. Two revival test lines write `[\ZZ32\]`. QuickCheck keys its frequency map by the collected values' printed form (3 hunks). With all three, both suites pass apart from the gate test's promotion (section 3.2).

## 1. What was built

`walk-conditional-extension.patch`, against 0c7e7be18:

- `BuildEnvironments.conditional(TraitTypeWhere)`: an entry is conditional where its `where` clause binds no variable and all its constraints are `WhereExtends`, the rule of the checker's `KindEnv.extendsConditions` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:180-188`).
- `BuildEnvironments.holdingExtends(ttws, et, interior, owner)`: the entries of an extends clause that the type extends. A conditional entry is kept where, for each constraint `X extends B`, the type bound to `X` in the instance's environment `subtypeOf` the evaluated `B`, as `processWhereClauses` checks a declaration's own constraint with `mustExtend` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1008` at 0c7e7be18). A condition that cannot be evaluated fails; no run met one (no trace line holds "error" or "unbound").
- The call sites: `finishTrait` (`BuildEnvironments.java:909-921` at 0c7e7be18) and the static `finishObjectTrait` (`:1032-1042`), which now takes the `TraitTypeWhere` list, so its three callers change: the `ObjectDecl` and `_RewriteObjectExpr` wrappers (`:1021-1030`) and `ComponentWrapper.registerObjectExprs` (`ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:167`). These are the only places where walk sets a trait's or object's extends list from its declaration. A generic instance reaches them through `FTypeGeneric.make` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeGeneric.java:228`, `:250`, `:274`), with the static parameters bound to the instance's arguments, so every instance, concrete or symbolic, reads its condition at its own arguments.
- Left as they were: the stand-in that walk's load checks use for a generic declaration (`symbolicInstance`, `BuildEnvironments.java:1073-1095` at 0c7e7be18) still reads every entry, so the members are checked as if the condition held, as the checker checks them (F-255). `Constructor.boundsUnread` and its comment (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:722-737`) are unchanged: the stand-in still reads the static parameters without the condition.
- The trace: with `FORTRESS_CONDEXT_TRACE` set, each conditional entry read prints `condext: <instance> extends <entry>: kept` or `dropped (<X> is not a <B>)` to standard error. It is for this probe only.

The only conditional entries in the interpreter's library are `List`'s, in `Library/List.fsi:67-68`, `Library/List.fss:106-107` and `Library/PureList.fss:41-42`. In the tests: `XXXConditionalExtensionTypeTestWalk`, `OverrideConditionalExtensionWalk` and `XXXOverrideNothingConditionalExtensionWalk`. `conditionalExtension.fss` binds variables in its clause, so it stays unconditional. No demo, specification example or microGPT program has one (a scan of every `extends` clause of their `.fss` and `.fsi` files).

## 2. The runs and their verdicts

All with the shadow built (`ant compileAll`, BUILD SUCCESSFUL, "Caches ... started again, empty") and the trace off, except where a trace is named.

| run | before (climb batch 20's gate, `climb-batch-20/gate/summary.txt`) | with the shadow |
|---|---|---|
| `ant testSystem` | 668 tests, 0 failures | 668 tests, 11 failures: shards 4, 1, 4, 2; BUILD FAILED |
| `ant testSpecData` | 130, 0 | 130, 1 failure: `advanced/Generators.GeneratorDefn`; BUILD FAILED |
| the demos, each `bin/fortress X.fss` from `ProjectFortress/demos/` under a 120 s limit (`tennisRanking` with the arguments `FileTests` gives it) | 29 exit 0, 21 exit 1, 1 exit 255 (`BirdCount2d`), 1 at the limit (`Generator2Demo`) | the same exit code for each of the 52 |
| `explorations/coordinator/tools/mg-run.sh <work-dir> new` | "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" twice | the same twice, `rc=0` |

The 11 red tests of `ant testSystem`: `NumberOrderListDeclarations`, `QuickCheckTest`, `UnwrittenListMapComprehensionWalk`, `booleanGuard`, `XXXConditionalExtensionTypeTestWalk`, `NestedListComprehensionWalk`, `ResultBoundsRungB`, `UnwrittenComprehensionElementsWalk`, `asifTest`, `RangePrototype`, `TupleOrderBounds`. A traced run of the same 667 files through `harness-one.sh`, in four calls of every fourth file, reports the same 11 red.

The trace of that run: 642 of the 667 programs drop `List`'s order at symbolic instances while the library loads, such as `List[\E@Library/List.fss:12:1-506:2\]` and `List[\T@Library/List.fss:252:1-482:2\]`; where the static parameter is bounded by a total order the order stays, as at the 50 instances of `PrefixSet.fss`. 55 programs drop it at a concrete instance. The 11 red tests are among the 55, and none of the 612 others moved its verdict.

## 3. Each move, why, and the respelling

### 3.1 The moves

| test (author) | line | what fails | mechanism | respelling tried |
|---|---|---|---|---|
| `booleanGuard` (team, 2007) | `:19`, `:21`, `:25`, `:27`, `:29`: `assert(c,a," true")` and four more `assert(list, list, msg)` | "FAIL: a ArrayList[\Int\]: <\|0, 1, 2, 3, 5, 6, 7\|> =/= a ArrayList[\Int\]: <\|0, 1, 2, 3, 5, 6, 7\|>" | B, over A (`List[\Int\]`) | E, or the five as `assert(x = y, msg)` |
| `asifTest` (team, 2008) | `:62` `assert(a,<\|[\RR64\] 1,2,3,4\|>," lists ought to compare at RR64")` | "FAIL: a ArrayList[\RR64\]: <\|1.0, 2.0, 3.0, 4.0\|> =/= ..." | B, over C (`RR64`) | E, or `assert(a = <\|[\RR64\] 1,2,3,4\|>, ...)` |
| `RangePrototype` (team, 2008) | `:277` `assert(is_par,is_seq,...)` (lists of pairs); `:286-287` (lists of `Range2D`) | "FAIL: a ArrayList[\(Int,Int)\]: ..." | B, over C | E, or `=` at `:277`, `:286` and `:338` (respelled together) |
| `QuickCheckTest` (team, 2010) | the library: `Library/QuickCheck.fss:1069`, `:1080-1082`, `:1128` | "Library/Map.fss:53:30: Failed to find any matching overload, args = (ArrayList[\Any\],ArrayList[\Any\])" for `CMP` | C | Q |
| `NumberOrderListDeclarations` (revival) | `:43` `assert(<\|1,2\|> < <\|1,3\|>, ...)`; `:47-54`, six `assert(list, list, msg)` | ":43:12-27: Failed to find any matching overload, args = (ArrayList[\Int\],ArrayList[\Int\])" | A at `:43`; B over A at `:47-54` | `[\ZZ32\]` at `:43`; E, or `=` at `:47-54` |
| `TupleOrderBounds` (revival) | `:11`, a pair of `<\|1,2\|>`-style lists under `<` | "Failed to find any matching overload, args = ((ArrayList[\Int\],ArrayList[\Int\]): ...)" | A | `[\ZZ32\]` on the four lists |
| `ResultBoundsRungB` (revival) | `:49`, `:51`, `:55`, `:59`, lists of pairs, triples, `Int` and `FlatString` | "FAIL: a ArrayList[\(Int,Int)\]: <\|(1,11), (2,12), (3,13)\|> =/= ..." | B, over A and C | E, or `=` |
| `UnwrittenListMapComprehensionWalk` (revival) | `:10` | "FAIL: a ArrayList[\Int\]: <\|0, 2, 4\|> =/= ..." | B over A | E, or `=` |
| `NestedListComprehensionWalk` (revival) | `:9` | "FAIL: a ArrayList[\ArrayList[\Int\]\]: ..." | B over A | E, or `=` |
| `UnwrittenComprehensionElementsWalk` (revival) | `:17` | "FAIL: a ArrayList[\Int\]: <\|2, 4, 6\|> =/= ..." | B over A | E, or `=` |
| `SpecData/examples/advanced/Generators.GeneratorDefn` (team, 2008) | its `run()`, `assert(x,<\|2,4,...,20\|>,"Unexpected list")`, outside the example the specification shows | "UNEXPECTED exception" after printing the list | B over A | E, or `assert(x = <\|...\|>, ...)` |
| `XXXConditionalExtensionTypeTestWalk` (revival) | the gate test | passes | the fix | promotion (section 4) |

E is the `Equality` line, Q is QuickCheck's frequency map, and `=` is `assert(x = y, msg)` (section 3.2). Authors are from `git log --follow`; the team's four files are in the team's tree at `a874948ac`. Each team test relies on the old reading, as `List` and QuickCheck do. Its lists are compared through the library's `assert`, which reached element-wise equality only through `LexicographicOrder`. QuickCheck needs lists of `Any` to be totally ordered.

**Mechanism A.** Walk instantiates a list at its elements' run-time class (row 364), and the classes of numerals and literals extend their order at their declared trait: `value object Int extends ZZ32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`), `trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\] }` (`Library/FortressLibrary.fsi:533`), `Integral[\I\] extends { StandardTotalOrder[\I\], ... }` (`:447`). The same holds for `object FlatString extends { String, ... }` (`Library/FlatString.fss:34`) under `trait String extends { StandardTotalOrder[\String\], ... }` (`FortressLibrary.fsi:2438`), and for `Long`. Generics are invariant, so `Int` is no `StandardTotalOrder[\Int\]`. `Char` and `Boolean`, which extend their order at themselves, are unaffected. 39 probe programs show it, each a component that imports `List.{...}`, binds `a` and `b` to two lists and prints one of `a < b`, `a = b`, `a CMP b` or `a MAX b`, run as `bin/fortress X.fss` with the trace. Before the shadow, all 39 answer, as:

    Ints LT: true                    (<|1, 2, 3|> < <|1, 2, 4|>)
    Strings LT: true                 (<|"a", "b"|> < <|"a", "c"|>)

With the shadow:

    condext: List[\Int\] extends LexicographicOrder[\List.List[\E\],E\]: dropped (Int is not a StandardTotalOrder[\Int\])
    CondExtIntsLT.fss:8:26-30: Failed to find any matching overload, args = (ArrayList[\Int\],ArrayList[\Int\]), ...
    condext: List[\FlatString\] extends ...: dropped (FlatString is not a StandardTotalOrder[\FlatString\])
    condext: List[\ZZ32\] extends ...: kept             IntsZZ32 LT: true   (<|[\ZZ32\] 1, 2, 3|> ...)
    condext: List[\String\] extends ...: kept           StringsT LT: true   (<|[\String\] "a", "b"|> ...)
    condext: List[\List[\ZZ32\]\] extends ...: kept     ListsT LT: true
    condext: List[\Char\] extends ...: kept             Chars LT: true
    condext: List[\FloatLiteral\] extends ...: dropped (FloatLiteral is not a StandardTotalOrder[\FloatLiteral\])

So `<`, `CMP` and `MAX` fail on lists of `Int`, `FlatString`, floats, `ArrayList[\Int\]` (lists of lists) and "tuples". The literal `<|(1, 2)|>` is a list of the two integers, not of a pair. With `[\ZZ32\]`, `[\ZZ64\]`, `[\String\]` or `[\List[\ZZ32\]\]` written, `<` and `CMP` hold.

**Mechanism B.** The library's `opr =/=(a:Any, b:Any):Boolean = NOT (a=b)` (`Library/FortressLibrary.fss:98`) and `assert(x:Any, y:Any, failMsg: Any...)` (`:307`, which tests `x =/= y`) call `=` in `FortressLibrary`'s scope. There a functional `=` of a `FortressLibrary` trait reaches a value's own body by dispatch on `self`, and a functional `=` declared elsewhere does not. `List`'s element-wise `opr =(self, other:List[\E\])` is declared in `List` (`Library/List.fss:126`), and before the shadow it was reached through `LexicographicOrder`'s `opr =(self,other:T)` (`FortressLibrary.fss:2069`) at every instance. With the shadow, where the condition fails, the only `=` left there is `opr =(a:Any, b:Any) = a SEQV b` (`:96`). The probe `CondExtEqSame.fss`, with the shadow:

    condext: List[\Int\] ...: dropped (Int is not a StandardTotalOrder[\Int\])
    eq: true
    ne: true
    condext: List[\ZZ32\] ...: kept
    eq ZZ32: true
    ne ZZ32: false

At the program's own scope, `a = b` finds `List`'s `=` and answers `true`. The library's `a =/= b` answers `true` too.

**Mechanism C.** P-154's intended effect: lists of `RR64`, tuples, `Any`, `Range2D` and the like have no order. QuickCheck's `freqmap: Map[\Any,ZZ32\]` is keyed by `collected = quicksort(result.collected)`, a `List[\Any\]` (`Library/QuickCheck.fss:1069`, `:1080-1082`), and `Map` compares keys by `CMP` (`Library/Map.fss:53`). Its report sorts `(freq, objs)` pairs whose second element is such a list (`:1128`).

### 3.2 The respellings, and what they clear

**E, the library's own way for an equality that library code sees.** `Map`, `IntMap` and `PrefixMap` extend `Equality[\Self\]` (`Library/Map.fsi:24-25`, `Library/IntMap.fsi:21`, `Library/PrefixMap.fsi:36`), whose `opr =(self, other:T)` is declared in `FortressLibrary` (`Library/FortressLibrary.fsi:73-75`, `Library/FortressLibrary.fss:100-102`). The line in `Library/List.fsi:67` and `Library/List.fss:106`:

    -trait List[\E\] extends { AnyList, ZeroIndexed[\E\],
    +trait List[\E\] extends { AnyList, ZeroIndexed[\E\], Equality[\List[\E\]\],
                               LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] } }

`List`'s own `=` then implements `Equality`'s. Where the condition holds, `List[\E\]` reaches the same `Equality[\List[\E\]\]` through `LexicographicOrder` as well, which is one instance and not two. A user type shows the same: `object Q(x: ZZ32) extends Equality[\Q\]` with the same `=` prints `user scope =/=: false`, and its `assert` passes, on the old code (the program of section 7 with `extends Equality[\Q\]` added). With E in the worktree's library, the shadow, and the tests and example as the team and the revival wrote them:

    ant testSystem:    shards 162/2, 171/1, 162/0, 173/1 failures: NumberOrderListDeclarations, QuickCheckTest, XXXConditionalExtensionTypeTestWalk, TupleOrderBounds
    ant testSpecData:  Tests run: 130, Failures: 0 ... BUILD SUCCESSFUL
    mg-run.sh <work-dir> eq:  VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS, twice

Under E, the 29 demos that ran before still run, with the same output apart from elapsed times and random inputs. The two tic-tac-toe demos exited 1 in that run because its runner closed their standard input ("FileNotFound: /dev/stdin"). Run with `< /dev/null`, they print what the old run printed.

So E clears `booleanGuard`, `asifTest`, `RangePrototype`, `ResultBoundsRungB`, the three `Unwritten`/`Nested` comprehension tests and `Generators.GeneratorDefn`, and moves no other test or example. `PureList`'s `List` (`Library/PureList.fss:41-42`) has no `=` of its own (rung X's report, section 1), so E does nothing there. `PureList`'s api declares `List[\E\] extends { Equality[\E\], ZeroIndexed[\E\] }` (`Library/PureList.fsi:41`), which looks like a slip for `Equality[\List[\E\]\]`; it is not measured here (row 355 holds that api's other faults). The compiled checker was not run on E (section 6).

**A, write the static argument.** In the two revival tests:

    NumberOrderListDeclarations.fss:43   assert(<|1,2|> < <|1,3|>, ...)                      ->  assert(<|[\ZZ32\] 1,2|> < <|[\ZZ32\] 1,3|>, ...)
    TupleOrderBounds.fss:11              assert((<|1,2|>, <|3|>) < (<|1,2|>, <|4|>), true, ...) -> assert((<|[\ZZ32\] 1,2|>, <|[\ZZ32\] 3|>) < (<|[\ZZ32\] 1,2|>, <|[\ZZ32\] 4|>), true, ...)

Writing `[\ZZ32\]` is the workaround that rows 364 and 705 give, and the way the library and the team's demos write list literals where the type matters (`<|[\String\] ...|>`, `ProjectFortress/demos/FeatherweightJava.fss:99`). `:43`'s message, "lists compare lexicographically when their elements support the comparison", keeps its meaning.

**Q, QuickCheck's frequency map, keyed by the collected values' printed form:**

    1069   freqmap: Map[\Any,ZZ32\] := {[\Any,ZZ32\]}     ->  freqmap: Map[\String,ZZ32\] := {[\String,ZZ32\]}
    1081   if NOT collected.isEmpty then
    1082       atomic freqmap := freqmap.update(collected, freqmap.member(collected, 0) + 1)
           ->  key = (BIG || [obj <- seq(collected)] ", " obj.asString)[2:]
               atomic freqmap := freqmap.update(key, freqmap.member(key, 0) + 1)
    1128   sortedfreqmap = quicksort(<| (freq,objs) | (objs,freq) <- freqmap |>)
    1129   for (freq,objs) <- seq(sortedfreqmap.reverse) do
    1130       formated = (BIG || [obj <- seq(objs)] ", " obj.asString)[2:]
           ->  sortedfreqmap = quicksort(<| (freq,formated) | (formated,freq) <- freqmap |>)
               for (freq,formated) <- seq(sortedfreqmap.reverse) do

The printed line is built from the same string as before. Two collections of equal frequency now sort by their printed form, not by the lexicographic order of their values. `QuickCheckTest`'s inputs are random, so its collected data differs between any two runs, and the order could not be compared.

**With E, A and Q together**, the shadow, and every other file as committed: `harness-one.sh` over the two respelled tests, `QuickCheckTest` with the respelled QuickCheck, and `Generators.GeneratorDefn`: all green. The two suites with E alone are above. Each respelling was also run on the old code, through the main tree's `harness-one.sh` (`FORTRESS_HOME=/home/user/fortress`) or `old-fortress.sh`, and passes there: the nine respelled tests "OK (9 tests)", `Generators.GeneratorDefn` and `QuickCheckTest` exit 0.

**The respelling that needs no library line**, `assert(x = y, msg)` in place of `assert(x, y, msg)`, keeps the value checked and loses the message's print of both values. It compares at the test's own scope, where `List`'s `=` is visible. Applied to the 9 tests above, about 20 lines with four of the team's files among them, it turns them green with the shadow (`harness-one.sh` over the respelled copies), and they stay green on the old code. In `RangePrototype` it was applied to `:277`, `:286-287` and `:338` together. `:338` compares `Maybe` values and may not need it.

## 4. The gate test

`XXXConditionalExtensionTypeTestWalk` on the base (`harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss`, 2026-10-23T00:01Z, tree 0c7e7be18):

    FAIL: a Boolean: true =/= a Boolean: false; a box of integers does not show, since ZZ32 does not extend Shows
     OK Saw expected exception
    OK (1 test)

With the shadow, beside the other conditional-extension tests (`harness-one.sh $PWD/tmp/h1 ...XXXConditionalExtensionTypeTestWalk.fss ...OverrideConditionalExtensionWalk.fss ...XXXOverrideNothingConditionalExtensionWalk.fss .test ...conditionalExtension.fss`, 00:30Z):

    . interpret tmp/h1/tests/XXXConditionalExtensionTypeTestWalk
    PASS
     Missing expected failure
    Tests run: 4,  Failures: 1,  Errors: 0

The trace: `Box[\Word\] extends Shows: kept`, `Box[\ZZ32\] extends Shows: dropped (ZZ32 is not a Shows)`. So the fix's own behaviour turns the test green as a plain test, and landing it promotes the test by `tests-writing.md`, "Promoting an `XXX` test". `OverrideConditionalExtensionWalk` stays green (`G[\ZZ32\] extends A[\T\]: kept`). `XXXOverrideNothingConditionalExtensionWalk` stays an expected failure ("Saw expected failure: loaded and ran"): its condition holds at `H[\ZZ32\]`, and the override check of the stand-in is unchanged. `conditionalExtension` stays green.

## 5. Printed values

- **Interpreter tests.** The 55 programs with a concrete drop ran directly, `bin/fortress tests/X.fss` from `ProjectFortress/`, on the old and the new code, at one thread, and their outputs were compared. Apart from the 11 of section 3, their outputs differ only in elapsed times (`ArrayListQuick`, `PureListQuick`, `WordCountSmall`), random values (`ShuffleTest`, `SkipListTest`'s random levels) and the tree's path (`WordCountSmall`, `XXXNestedComprehensionDeclaredTypeWalk`, `XXXSubscriptImplicitStridedRange`).
- **Specification examples.** The 15 examples that build lists, and `OprDecl.Nofix`, ran directly on both codes. Only `Generators.GeneratorDefn` moves. Five others drop a `List[\Int\]` and print the same.
- **Demos.** All 52 ran on both codes with the trace on the new run. The 13 whose outputs differed ran again on both codes with the trace off. What remains is the elapsed time printed in the timing-line failures (`ArrayListLong`, `BiCGSTAB`, `BiCGSTAB2`, `Integrate2`, `IntegrationStats`, `PureListLong`, `wordcount`, `SatEx`; row 791's kind), and random inputs (`DemoGenerator22D`, `conjGrad`, `posFeedback`, `Generator2Demo`), whose two old runs also differ. 29 demos drop the order at a concrete instance, the BirdCount series among them (`List[\RR64\]`, `List[\(RR64,RR64)\]`, `List[\FlatString\]`, ...), and none compares those lists.
- **microGPT.** Its two quick programs drop the order at no concrete instance (13 symbolic trace lines each). The losses print the same before and after, for example "batch 1 step 1 loss 3.3659669475848513 vs 3.365966947584851 ... diff 4.440892098500626E-16 PASS". Only the elapsed milliseconds differ.

## 6. Limits

- The 612 interpreter tests with only symbolic drops were not run on the old code, at the brief's word not to run the suites on the unchanged tree. Their verdicts do not move. A symbolic drop changes a load check or a comparison of declared domains, not a run-time value, but no comparison of their printed output rules out a moved dispatch.
- The compiled path was not touched or run. The code generator still compiles the entry at every instance (row 774's compiled face, row 701). The checker was not run on E or Q. Whether the checker orders `<|1, 2|>`, whose numerals it types as `IntLiteral` (P-76), was not measured.
- E was run on the 29 demos that ran before, not on the 23 that fail or hit the limit.
- `SpecDataJUTest`'s trace could not be read example by example, because it loads the library once for all examples. The direct runs above stand in for it.

## 7. Defects

- **Under walk, the library's `=/=` and three-argument `assert` compare by identity any two values whose `=` is not a functional method of a `FortressLibrary` trait.** This is so today, without the shadow (a component with this object and a `run()` that prints `P(1) = P(1)`, prints `P(1) =/= P(1)` and calls `assert(P(1), P(1), "two P(1) are equal")`, on the old code):

      object P(x: ZZ32)  opr =(self, other: P): Boolean = (x = other.x)  end
      user scope =: true
      user scope =/=: true
      FAIL: a P: P =/= a P: P; two P(1) are equal

  The specification settles it: "The expression e ≠ e' is semantically equivalent to the expression ¬(e = e')" (`Specification/basic/operators/opr-overview.tex:272-273`, before the subsection "Comparisons Operators"). It needs way 2 of `tests-writing.md`, an `XXX` test asserting `NOT (P(1) =/= P(1))`. No ledger row holds it: `ledger-find:=/=` finds only row 639, and rows 30 and 31 are about `+` and `SUM`. The draft row: "under walk, the interpreter's library's `opr =/=(a:Any, b:Any) = NOT (a=b)` and the three-argument `assert` compare by identity two values whose own `=` is not a functional method of a `FortressLibrary` trait: for `object P(x: ZZ32)` with `opr =(self, other: P)`, `P(1) = P(1)` and `P(1) =/= P(1)` are both `true`, and `assert(P(1), P(1), msg)` fails | NEGATIVE-VERIFIED | implementation gap (library) | `basic/operators/opr-overview.tex`, the paragraph before "Comparisons Operators" | none | probe walk-conditional-extension | `Library/FortressLibrary.fss:98`, `:307`; with `extends Equality[\Q\]` the same program prints false and the assert passes; walk's half of row 774 makes every list whose condition fails such a value unless `List` extends `Equality[\List[\E\]\]`." Not filed: the brief keeps only this report and its patch.
- **Row 774's fix, read through `subtypeOf` at the instance, takes the order from every list that walk instantiates at a run-time class** (mechanism A, row 364's consequence). It is a property of the fix rather than a defect of today's tree. A note for row 774, not filed: "a shadow of the fix (probe walk-conditional-extension) drops the order of every list instantiated at a run-time class, as `<|1,2|>` at `List[\Int\]`, since `Int` is a `StandardTotalOrder[\ZZ32\]` (row 364); written `<|[\ZZ32\] 1,2|>` the list keeps it; it moves 10 interpreter tests and one specification example, cleared by `List` extending `Equality[\List[\E\]\]`, two written static arguments and QuickCheck's map keyed by strings."

## 8. Sentences of the specification made false, if the fix lands

- `Specification/appendices/changes.tex:242-248`: "The interpreter reads the extension as holding at every instance, and so does the compiled run time: a type test of an instance whose static arguments fail the constraints answers \VAR{true} on both (row~774, gated for the interpreter by ...XXXConditionalExtensionTypeTestWalk.fss), so the interpreter keeps the order of a list of tuples or of floating-point numbers." The interpreter half becomes false. The compiled run time's half stays true.
- `Specification/fortress/preamble.tex:95`, "where clauses and conditional extension" among the features not yet supported, stays true while the compiled run time reads the entry at every instance.
- Outside the specification, F-255's "walk and the compiled run time read the extension at every instance (row 774)" and `revival-changes.md`'s "Walk orders every list (row 774)" become false for walk.

## 9. Decisions

1. **The tree seeded from.** No worktree at 0c7e7be18 passed the base-build checks (`worktrees.md`). The main tree, at 4463902e9 and later ddf5f8214, whose code is 0c7e7be18's, built 2026-10-20 09:02 after the last code commit (e487cec2d, 08:41), is clean under `ProjectFortress`, `Library` and `default_repository`, the paths the seeding script checks. Its HEAD is not the base and it has untracked `.done` files under `explorations/`. I seeded from it with the branch cut at 0c7e7be18 instead of building a base build: the disk had 1.5 GB free at the start and 316 MB at its lowest during the run, with the export-check probe building beside this one, and climb batch 20's planner seeded its probe from the main tree's gate build in the same way (`CLIMB-BATCH-20.md`'s header). The script ran with exit 0 and no warning, and `ant compileAll` kept the caches. No run of mine wrote into the main tree; its old code ran only through `old-fortress.sh` and its `harness-one.sh` with private caches in this worktree's `tmp/`.
2. **The condition's test.** `subtypeOf` at the instance's arguments, the test walk's `processWhereClauses` makes of a declaration's own constraint (alternatives: keep the entry at symbolic instances, as the stand-in reads it; or test at a run-time class's declared trait, which would keep `List[\Int\]` ordered but departs from the checker's reading at declared types). The checker's half reads the condition at the instance's static arguments (F-255), and no decision of the curator covers walk's run-time classes. The symbolic instances moved no verdict.
3. **The stand-in and `boundsUnread` unchanged.** The brief asks for the values moved at load, type test and dispatch, and the stand-in's reading of the members is the checker's.
4. **Respellings shown, none committed.** The brief keeps only the report and the shadow patch, so E, A, Q and the `=` form are inline, each run on both codes.
5. **No ledger row filed.** Section 7 drafts them, for the same reason.

## 10. For FACTS

- **With row 774's fix built as `subtypeOf` at the instance, walk drops `List`'s order at every list instantiated at a run-time class: `<|1,2|>` is a `List[\Int\]`, and `Int` extends `StandardTotalOrder[\ZZ32\]`, not `StandardTotalOrder[\Int\]`; likewise `FlatString`, `Long`, `FloatLiteral` and lists of these.** For the work: the fix lands with written static arguments where a test orders lists of numerals or strings, or after row 364, or with a walk-only reading at declared types (section 11). The number: of the 10 tests and the one example that the shadow moves (the gate test apart), 8 rest on a run-time class: all but `asifTest`, `RangePrototype` and `QuickCheckTest`, with `ResultBoundsRungB` resting on lists of tuples as well. Test: the gate test with the shadow, and the probe programs of section 3.1. Detail: sections 3.1 and 3.2.
- **Under walk the interpreter's library's `=/=` and three-argument `assert` compare by identity a value whose `=` is not a functional method of a `FortressLibrary` trait: `P(1) =/= P(1)` is `true` while `P(1) = P(1)` is `true`; extending `Equality[\P\]` mends it.** For the work: with row 774's fix, `List` extends `Equality[\List[\E\]\]` outside the condition, or every `assert(list, list, msg)` over lists without a total order fails. Test: none yet (the draft row of section 7); command and output in section 7.
- **The shadow of row 774's fix moves 10 interpreter tests (4 of the team's), one specification example of the team's, no demo and no microGPT value; with `List` extending `Equality[\List[\E\]\]` it moves 3, `NumberOrderListDeclarations`, `TupleOrderBounds` and `QuickCheckTest`, cleared by two written `[\ZZ32\]` and QuickCheck's frequency map keyed by strings.** Detail: sections 2, 3 and 5.

## 11. Questions for the curator, as decisions not taken

1. **How walk's half lands, given mechanism A.** (a) With `[\ZZ32\]` written in the two revival tests, so that under walk a list of unwritten numerals has no order until row 364 is fixed. This is the checker's reading at the types walk sees. (b) After row 364, once walk instantiates at the declared type. (c) With a walk-only reading that tests the condition at a run-time class's declared trait, which departs from F-255 at declared types. Evidence: section 3.1. No decision covers it.
2. **Where a list's element-wise equality lives.** (a) E: `List` extends `Equality[\List[\E\]\]`, the library's way for `Map`, `IntMap` and `PrefixMap`, one line in `List.fsi` and in `List.fss`, which clears 7 tests and the example and moves nothing else in the two suites, the running demos or microGPT. (b) Respell about 20 assertion lines in 8 tests and the example as `assert(x = y, msg)`, four of them the team's files. P-154 keeps a list's `=` element by element and does not say where it is declared. The checker's count was not run on E.
3. **QuickCheck's frequency map** (team code, 2010): (a) key it by the printed form (Q, 3 hunks, which reorders lines of equal frequency); (b) leave `QuickCheckTest` red and record it.
4. **The `=/=` defect** of section 7: whether it is filed with its `XXX` test now, apart from row 774.

## Commands worked out

- `FORTRESS_CONDEXT_TRACE=1 bin/fortress X.fss` (with the shadow built): prints each conditional entry read and whether it is kept.
- A traced run of the whole interpreter suite with one test's trace kept apart from another's: `FORTRESS_CONDEXT_TRACE=1 explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> <files>` over every `ProjectFortress/tests/*.fss` with its `.test`, in four calls of every fourth file of the sorted list; the harness prints each test's output under its `interpret` line, so the trace lines can be read test by test.
- `FORTRESS_JUNIT_VERBOSE=1 ant testSpecData` shows each example's output. Its examples share one library load, so a trace cannot be attributed to an example there.
- A modified library component run against one program without editing `Library/`: put the modified `X.fss` (and `X.fsi`) beside the program and run from that folder, or name it among `harness-one.sh`'s files, since the source path searches the program's folder first (`build-and-caches.md`, "Name resolution"); the harness then also runs the component as a test, which fails and is ignored.
