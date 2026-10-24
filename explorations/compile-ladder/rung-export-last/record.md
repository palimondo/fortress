# Climb batch 22, rung E (`rung-export-last`): record lines for the gather

Written by the rung worker. Branch `wip/rung-export-last`: `e9bd01280` (the walk guard, ahead of the edit), `94179a74a` (the library). The detail is in `explorations/compile-ladder/rung-export-last/REPORT.md`.

## Findings

1. **The `FortressLibrary` export error names one entry, `String`'s, after this rung; the other 14 are gone and nothing comes.**
   - Claim: three kinds of edit clear 14 of the 15 entries. The api states its component's members at the component's headers: `TotalComparison`'s `=`, `RR64`'s `^`, `Condition` by way A+ with `Maybe`'s header, `Just`'s `SQCAP` and `SQCUP`, `ActualReduction`'s three distributes, and `BigReduction`'s and `Comprehension`'s parameters. The api leaves out what the component never built: `Just`'s and `Nothing`'s 1.0 range subscripts and the four arrays' `opr[_:OpenRange[\ZZ32\]]`. Seven component lines take the api's types (`RR64`'s brackets and `truncate` at `ZZ64`, `DelegatedIndexed`'s `generator`, `Array2`'s and `Array3`'s `bounds` and `zeroIndices`), and `DelegatedIndexed` states the `size` it inherits.
   - Conditions: on `94179a74a` (the base `64386618b` and this rung), the stock distance stage, which gates the full check, and the landed reading of `abstract` (F-282; row 816).
   - Evidence: `explorations/coordinator/tools/distance/run.sh` printed '#total 5', '#kind typecheck 4', '#kind export 1', '#crash none', '#seconds 226 FortressLibrary 169'. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21b/gate/distance.txt <table>` printed 'DISTANCE SAME   5'. `python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv <scratch>/errors.tsv` printed 'landed 5 now 5', 'landed 15 entries, now 1', and 14 'entry GONE' lines (`BigReduction`, `Comprehension`, `Just`, `Nothing`, `ActualReduction`, `Array1`, `Array2`, `Array3`, `Condition`, `DelegatedIndexed`, `ImmutableArray1`, `Maybe`, `RR64`, `TotalComparison`), with none come.
   - The other four sites are the landed ones, read by row: `BIG MIN` at `Library/FortressLibrary.fss:4396` and `:4402` (one line down from `:4395` and `:4401`, by the line added at `:2101`), the fused arm at `:1466`, and `List.fss:146`.
   - Meaning: with rung T's `String` lines, the export site leaves the distance.
2. **The count stage reads 3, its table equal to the landed one, in about 99 s.**
   - Evidence: `explorations/coordinator/tools/checker-count/run.sh` printed '#total 3', '#locations 3', '#crash none', every api 0. `diff explorations/compile-ladder/climb-batch-21b/gate/checker-count.txt <table>` printed nothing.
   - Its errors are the component's three type errors ('File FortressLibrary.fss has 3 errors.'), so it never reaches the export check.
   - The timing ran from 02:10:33Z to 02:12:12Z, on nproc=4, an Intel Xeon @ 2.10GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, load 1.76 at start.
3. **Walk's values hold.**
   - `ant testSystem` on `94179a74a`: 'Tests run: 168', '174', '171', '166, Failures: 0, Errors: 0', 679 in all (the landed 678 and the guard).
   - `ant testSpecData`: 'Tests run: 130, Failures: 0, Errors: 0'.
   - `ProjectFortress/tests/ExportAlignedMembersWalk.fss` passes through `harness-one.sh` on the base and after: 'OK (1 test)'.
   - Meaning: the component lines walk runs (`RR64`'s three, `DelegatedIndexed`'s `size` and `generator`, the arrays' `bounds` and `zeroIndices`) move no value.
4. **Under walk, a float literal's rounding methods answered `ZZ64` before the edit, though the component's `trait RR64` declared `ZZ` for the brackets and `RR64` for `truncate`.**
   - Evidence: a probe on `64386618b` printed 'floor-bracket lit 2 ZZ64', 'ceil-bracket lit 3 ZZ64', 'truncate lit 2 ZZ64'.
   - Meaning: walk does not hold these results to their declared types. The component's `ZZ64` now states what walk answers, and what the api (`Library/FortressLibrary.fsi:379-382`) and `Float` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191`) declare. P-68's rung makes them `ZZ`.
5. **Rows 188 and 283 do not reproduce at the base.**
   - Evidence: `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base22 <tree>/tmp/old-caches ProbeNarrow.fss` printed 'narrow floor-bracket 7 ZZ32' and 'truncate 7.0 7 ZZ64'.
   - Meaning: both rows are stale; the gather can close or retire them.
6. **The ladder subset and the microGPT phases do not move.**
   - The subset is `Generator2Test.fss`, `IntMapTest.fss` and `XXXextendBoolean.fss`, the files whose baseline first error names a touched member. Each stops at its baseline phase (`disambiguate`, `disambiguate`, `typecheck`).
   - `IntMapTest`'s first error text moved, from 'Comprehension is undefined.' to 'ImmutableArray is undefined.', because `Library/CovariantCollection.fsi` changed after the baseline. Its output names no `FortressLibrary` file.
   - The eighteen microGPT components: `diff` of `mg_phases` against `explorations/compile-ladder/climb-batch-21b/gate/ladder/microgpt-phase.md` printed nothing.

## FACTS

F-282, its text after this rung alone (the record pass owns the wording, and folds rung T's `String` lines into it):

- F-282 **The compiled export check matches an api's members by name and header and reads `abstract`, and the `FortressLibrary` export error names one trait, `String`.** It matches an api member with a component member of the same name and header, and a field by its name, its modifiers other than `var` and its type. It compares the component's abstract members against the api's, and asks no definition for an api member written `abstract` (`Specification/basic/components/apis.tex:252-256`). So a component may leave out, or declare at another header, a member its api writes `abstract`, and a client's call of it dies at run time with `NoSuchMethodError` (row 816). `FortressLibrary.fsi` states its component's members at the component's headers. That covers the 57 members written `abstract`, the follow-on lines, `Array2`'s subscripts, `TotalComparison`'s `=`, `RR64`'s `^`, `Condition` with `ZeroIndexed` and its range subscript, `Maybe`'s header, `Just`'s `SQCAP` and `SQCUP`, `ActualReduction`'s distributes, and `BigReduction`'s and `Comprehension`'s parameters. It leaves out the subscripts the component never built (`Just`'s and `Nothing`'s 1.0 range subscripts, the arrays' `OpenRange` subscripts). Where the api's type is the contract, the component takes it: `RR64`'s brackets and `truncate` at `ZZ64`, `DelegatedIndexed`'s `generator`, and `Array2`'s and `Array3`'s `bounds` and `zeroIndices`. So the distance's export error, still one site, names `String` alone (P-155). Gated by `compiler_tests/XXXExportMemberName`, `XXXExportFieldName`, `ExportVarFieldMatchesField`, `ExportComprisesEllipsisAbstract`, `ExportAbstractMemberDefined` and `ExportAbstractMemberAbsent`, and by the distance stage's per-site list. Walk's values of the moved members are gated by `ProjectFortress/tests/ExportAlignedMembersWalk.fss`. Detail: `compile-ladder/rung-export-align/REPORT.md` sections 1, 5 and 6; `compile-ladder/rung-export-last/REPORT.md` sections 1 and 2.

## Ledger

- **Row 330, rewritten.** The edit makes its notes on `truncate` false; the brief's note text ("the component's RR64 now declares the brackets and truncate at ZZ64, as its api and Float do; P-68's rung makes them ZZ") is folded in. Its whole new line (row 1,048 characters, claim 177, notes 660):

| 330 | the float types' `floor` and `ceiling` return a float where the specification returns an integer, and the brackets `⌊x⌋` and `⌈x⌉` are a `ZZ64` under walk and an `RR64` compiled | NEGATIVE-VERIFIED | library gap vs spec (library) | `Specification/basic-lib/numbers.tex`, "Rational Numbers" | `ProjectFortress/library_tests/RR64FunctionsRungF.fss:75-82` | climb batch 1 rung F | Interpreter: `floor` and `ceiling` at `RR64`, the brackets and `truncate` at `ZZ64`, in the api (`Library/FortressLibrary.fsi:378-382`), `Float` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:182-191`) and the component's `trait RR64` (`Library/FortressLibrary.fss:497-501`); `round` `ZZ` there (`:502`), `ZZ64` in `Float`. Compiler world: `floor`, `ceiling` and the brackets at `RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:457-458`, `:468-469`). P-68's rung makes the brackets, `round` and `truncate` `ZZ`. On both paths `round` and `truncate` are `0` at NaN and saturate at ±∞ and past `2^63`. Decision: P-68. full text: history, row 330 |

- **Row 188, a note** (its notes reach 695 characters): "Not reproduced at 64386618b: `truncate(7.0)` under walk is the `ZZ64` 7 (climb batch 22, rung E)."
- **Row 283, a note** (its notes reach 618 characters): "Not reproduced at 64386618b: under walk `narrow` of the floor bracket of 7.5 is the `ZZ32` 7 (climb batch 22, rung E, `explorations/coordinator/tools/old-fortress.sh`)."
- **Row 816:** unchanged; question 1 holds it.
- **New rows:** none.
- **Row 533, for the gather** (added by the skeptic; the row has no room for a note: 1,508 characters with it, notes 1,033): its claim names `RR64`'s `opr ^(self, b:RR64)`, which the api no longer declares (`Library/FortressLibrary.fsi:367` is `b:Number`, the component's header, `Library/FortressLibrary.fss:485`), and its tie does not reproduce at the base: the distance stage's driver (`DistanceMulti -order check -setting any`) checks a component of `10.0^(-5)` and `10.0^(-8)` against the interpreter's library with no error, on `64386618b`'s library and on this rung's (`explorations/compile-ladder/rung-export-last/SKEPTIC.md`, section 3). Its whole new line, or its close, is the gather's.

## Sentences made false, for the gather

- In `Specification/`: none. `Specification/basic/expressions/if.tex:53` and `while.tex:29` stay true, and Part IV (`Specification/library/default-libraries.tex:25-27`) is the api rendered.
- F-282: 'the `FortressLibrary` export error names 15 traits and objects', and its list.
- P-68 (`explorations/coordinator/POSITIONS.md:74`): 'and `round` and `truncate` are `ZZ64`, `ZZ` or `RR64` by declaration'. No float `truncate` is declared `RR64` now (`Library/FortressLibrary.fss:501`). The curator's to rewrite.
- Row 330's notes (above).
- F-63: '`Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:933`': it is now at `:934`.
- Row 533's claim, '`RR64`'s `opr ^(self, b:RR64)`': the api's is now `opr ^(self, b:Number)` (`Library/FortressLibrary.fsi:367`) (added by the skeptic).

## Handover line

Climb batch 22, rung E (the api's last export entries) is on `wip/rung-export-last` at `94179a74a`.
- What it did: rung-E.patch as it stands; the export error goes from 15 entries to 1 (`String`'s, rung T's).
- The stages: the distance 5 and the count 3, as landed, with no site come.
- Walk: 679 interpreter tests and the specification's 130 examples green; the guard `ExportAlignedMembersWalk` passes on the base and after.
- The specification: no sentence made false. Part IV loses six subscripts, four getters and three other lines, gains seven, and renames four parameters.
- The ledger: row 330 rewritten; notes on rows 188 and 283.

## Revival change

**The change.**
- **The team's api** (`Library/FortressLibrary.fsi` at `a874948ac`) declared members that its component defines at other headers, or never defines:
  - `TotalComparison`'s `opr =(self, other:Comparison)` (:123). The component has `=` at `TotalComparison` and at `Unordered` (`Library/FortressLibrary.fss:164-165` at `a874948ac`).
  - `RR64`'s `opr ^(self, b:RR64)` (:318). The component's takes `b:Number` (fss:402).
  - `Condition` extending `SequentialGenerator` alone, with `indices` a `CompactFullRange[\ZZ32\]`, and `indexValuePairs` and `ivmap` answering `Generator` (:767, :774-775, :787). The component's `Condition` extends `ZeroIndexed` too (fss:1200). The api's `Maybe` extended `ZeroIndexed[\T\]` (:830).
  - `Just`'s and `Nothing`'s `opr[r:Range[\ZZ32\]]` (:844, :868). The component moved them to `Condition` in 2008 (`28ecf5f0d`).
  - `Just`'s `SQCAP` and `SQCUP` over `UniqueItem` (:852-853). The component's are over `NotUnique`, `Just` and `Nothing` (fss:1333, :1335).
  - The four arrays' `opr[_:OpenRange[\ZZ32\]]` (:1414, :1445, :1550, :1675), which no component defines.
  - `ActualReduction`'s distributes over a `Reduction[\R\]` answering a `Maybe` of a pair (:1724 on).
  - `BigReduction(r)` and `Comprehension(u, r, singleton)`, with getters `reduction`, `body` and `unwrap` (:1789-1799). The component names the parameters `reduction`, and `unwrap`, `reduction`, `body` (fss:2973, :2978).
- **The team's component** answered at other types than its api:
  - `RR64`'s brackets answered `ZZ` and its `truncate` `RR64` (fss:415, :418), where the api and `Float` answer `ZZ64`;
  - `DelegatedIndexed`'s `generator` answered `Indexed[\E,I\]` (fss:1767), where the api has `Generator[\E\]` (fsi:1215);
  - the arrays' `bounds` and `zeroIndices` answered `CompactFullRange2D` and `CompactFullRange3D` (fss:2295, :2387, :2670, :2752), where the api has the `CompactFullRange` types.
- **What the tree now does.**
  - The api states the component's headers for the first group, and leaves out the subscripts that no component defines (`Library/FortressLibrary.fsi:125-126`, `:367`, `:934-955`, `:998`, `:1015-1027`, `:1903-1909`, `:1962-1975`).
  - The component states the api's types for the second group (`Library/FortressLibrary.fss:498-501`, `:2102`, `:2657`, `:2745`, `:3065`, `:3147`), and `DelegatedIndexed` states the `size` it inherits from `Indexed` (`:2101`).
  - Part IV, the api rendered, changes with it: six subscripts and four getters leave, and four parameters are renamed.
  - The tests: the compiled checker's export check, run over the interpreter's library, no longer names the 14 traits and objects. Walk's values for these members are the same before and after (`ProjectFortress/tests/ExportAlignedMembersWalk.fss`).
- **The reason.**
  - `Specification/basic/components/apis.tex:252-256`: "The header and type of $d'$ must be the same as the header and type of $d$."
  - The export check refused each pair, e.g. '(TraitDecl TotalComparison at FortressLibrary.fsi:122.1, due to different method = @ FortressLibrary.fsi:125:5-42)' and '(TraitDecl RR64 at FortressLibrary.fsi:297.1, due to different method ^ @ FortressLibrary.fsi:366:5-28)'.
  - Where the component moved instead: `Float`'s natives answer `ZZ64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191`). The api at the component's `ZZ` and `RR64` is refused, as in 'For truncate, the return type of Float->ZZ64 @ FortressBuiltin.fss:190:5-191:81 should be a subtype of the return type of (RR64 & {Float, FloatLiteral})->RR64'. The api cannot name `RangeInternals`' types, which import it. `FlatString` overrides `generator` at `Generator[\Char\]` (`Library/FlatString.fss:45`). Without the api's `size` line, the checker reports four abstract-method errors in `RangeInternals`' 2D and 3D ranges.

**Provenance.**
- The items: F-282's export entries, all but `String`'s, in climb batch 22's rung E.
- The answers and defaults followed:
  - P-27, the library's own practice;
  - the coordinator's call of way A+ for `Condition` (the batch record's "Defaults already taken", 2);
  - fork 3 in place of the rounding call (default 3);
  - forks 4 to 12;
  - P-90's reading (the bare `Nothing` only);
  - P-68 for the float rounding's later `ZZ`.
- The record's sentences this makes false: F-282's 15 entries and its list; P-68's 'or `RR64` by declaration' for `truncate`; row 330's notes on `truncate`; F-63's line `fsi:933`.
