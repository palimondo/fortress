# Climb batch 22, rung E (`rung-export-last`): the api's last export entries

- problem: the distance stage's export error at climb batch 21b's landed gate, one site of 15 entries (`explorations/compile-ladder/gate/distance-sites.tsv:2`; `explorations/compile-ladder/climb-batch-21b/gate/distance.txt:11`, '#kind export 1')
- spec: `Specification/basic/components/apis.tex:252-256`, "A matching definition of a declaration $d$ ... The header and type of $d'$ must be the same as the header and type of $d$."
- precedent: the api at the component's own header, as climb batch 21b's follow-on wrote `OpenRange`'s `shiftLeft(amount: I): OpenRange[\I\]` (`Library/FortressLibrary.fsi:2231`, by `031c38bbc`; the component's `Library/FortressLibrary.fss:4061`), under P-27; for api lines with no component text, climb batch 20's fork 5 (`Library/FortressLibrary.fsi:1530-1533`)
- deviation: the four arrays' `opr[_:OpenRange[\ZZ32\]]` are deleted, where climb batch 20 put `immutableArray`'s ranks in a comment (`Library/FortressLibrary.fsi:1530-1533`), since the component holds no text of them to mirror, at the base or at `a874948ac` (its only open-range subscripts are the `TrivialOpenRange` forms, `Library/FortressLibrary.fss:2402`, `:2460`, `:2696`, `:3122`); and seven component lines take the api's types where the precedent moves the api: `RR64`'s brackets and `truncate` at `ZZ64` (`Library/FortressLibrary.fss:498`, `:500`, `:501`), `DelegatedIndexed`'s `generator` at `Generator[\E\]` (`:2102`), `Array2`'s and `Array3`'s `bounds` and `zeroIndices` at the api's `CompactFullRange` types (`:2657`, `:2745`, `:3065`, `:3147`); and one component line restates a body the trait inherits, `DelegatedIndexed`'s `getter size(): ZZ32 = |self|` (`:2101`; `Indexed`'s at `:1976`); from the specification's spelling: none
- historical: `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`

## 1. What changed and why

The planner's `explorations/compile-ladder/plan-22/probes/rung-E.patch`, taken as it is: `python3 -I explorations/compile-ladder/plan-22/probes/last5-edits.py /home/user/fortress-exportlast totalcmp rr64pow rr64comp condA maybeA2 justsq openrange distrib bigops delegsizeB deleggen arrbounds` printed 'applied totalcmp rr64pow rr64comp condA maybeA2 justsq openrange distrib bigops delegsizeB deleggen arrbounds', and the tree's diff, its `index` lines left out, equals the patch (`diff` printed nothing). 24 api lines out or rewritten and 18 written; 8 component lines rewritten and one added (`git diff --numstat 64386618b HEAD -- Library`: '18 24 Library/FortressLibrary.fsi', '9 8 Library/FortressLibrary.fss'). Commits on `wip/rung-export-last`: `e9bd01280` (the guard, ahead of the edit), `94179a74a` (the library).

Each edit, by the export entry it clears:

| Entry | The edit | Lines now |
|---|---|---|
| `TotalComparison` | the api's `=(self, other:Comparison)` becomes the component's two, at `TotalComparison` and at `Unordered` | `Library/FortressLibrary.fsi:125-126`; the component's `Library/FortressLibrary.fss:165-166` |
| `RR64` | the api's `^` takes the component's exponent `Number`; the component's `\|\self/\|`, `\|/self\\|` and `truncate` answer the api's `ZZ64`, as `Float`'s natives do (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191`), whose bodies the three call through `asFloat` | fsi:367; fss:498, :500, :501 |
| `Condition` | way A+: extends `{ ZeroIndexed[\E\], SequentialGenerator[\E\] }`; `indices` answers `Generator[\ZZ32\]`, `indexValuePairs` `Condition[\(ZZ32,E)\]`, `ivmap` `Condition[\G\]`; and the component's range subscript `opr [r:Range[\ZZ32\]]: Condition[\E\]` shown after `[i]` | fsi:934, :941-942, :945, :955; the component's fss:1519-1533, :1546 |
| `Maybe` | its api header drops `ZeroIndexed[\T\]`, as the component's (fss:1627-1628) | fsi:998 |
| `Just`, `Nothing` | way A++: the 1.0 range subscripts `opr[r:Range[\ZZ32\]]:Maybe[\T\]` and `opr[r:Range[\ZZ32\]]: Nothing[\T\]` leave the api; the component has had none since the team's `28ecf5f0d` (2008) moved them to `Condition`. `Just`'s `SQCAP` and `SQCUP` take the component's headers over `NotUnique`, `Just` and `Nothing` in place of the two over `UniqueItem` | fsi:1022-1027; fss:1660-1664 |
| `ImmutableArray1`, `Array1`, `Array2`, `Array3` | the unbuilt `opr[_:OpenRange[\ZZ32\]]` out of the api; `Array2`'s and `Array3`'s `bounds` and `zeroIndices` in the component at the api's `CompactFullRange[\(ZZ32,ZZ32)\]` and `CompactFullRange[\(ZZ32,ZZ32,ZZ32)\]`, which `RangeInternals`' `CompactFullRange2D` and `3D` extend (`Library/RangeInternals.fsi:520-521`) | fss:2657, :2745, :3065, :3147 |
| `ActualReduction` | `leftDistribute`, `rightDistribute` and `distribute` at the component's `[\K\](r: ActualReduction[\R,K\]): PossibleReductionPair[\K\]` | fsi:1903, :1906, :1909; fss:3252-3261 |
| `BigReduction`, `Comprehension` | the api's parameters named as the component names them (`reduction`; `unwrap`, `reduction`, `body`), and the four getters that restated them out; `BigOperator`'s abstract getters (fsi:1962-1966) are met by the fields | fsi:1968-1975; fss:3364-3371 |
| `DelegatedIndexed` | the component states `getter size(): ZZ32 = \|self\|`, the body it inherits from `Indexed` (fss:1976), and its `generator` at the api's `Generator[\E\]` | fss:2101-2103; the api's fsi:1395-1396 unchanged |

Why: the export check matches an api member with a component member of the same name and header and reads `abstract` (F-282). P-27 makes the library's own practice the standard, and that practice is the api stating the component's members at their headers. Where the component's header could not be written in the api, or where the api's type is the contract that callers rely on, the component moved instead (forks 3, 10, 11). The first case is the `RangeInternals` types, which import the api. The second is `Float`'s `ZZ64`, and `FlatString`'s `generator` at `Generator[\Char\]` (`Library/FlatString.fss:45`). Where an api line had no component text, it left (forks 4, 6): the `OpenRange` subscripts and the 1.0 range subscripts.

## 2. The test: the stages, and the walk guard

**Its before** is the landed table, not measured again: `explorations/compile-ladder/climb-batch-21b/gate/distance.txt` ('#total 5', '#kind typecheck 4', '#kind export 1', '#crash none') and `explorations/compile-ladder/gate/distance-sites.tsv`. That list holds the export error's 15 entries at `FortressLibrary.fss:12`, `BIG MIN` at `:4395` and `:4401`, the fused arm at `:1466`, and `List.fss:146`. No stage ran on the unchanged base.

**The distance stage, after**, once, on `94179a74a`'s code: `explorations/coordinator/tools/distance/run.sh tmp/rung-export-last/distance-postedit.txt tmp/rung-export-last/dist-post`:

    #total	5
    #kind	typecheck	4
    #kind	export	1
    #crash	none
    #seconds	226	FortressLibrary 169

`explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21b/gate/distance.txt <table>` printed 'DISTANCE SAME   5', and no `#kind` or `#class` row moved. `python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv <scratch>/errors.tsv`:

    landed 5 now 5
    export 'does not define all declarations': landed 0 entries, now 0
    export 'are not matched by the declarations': landed 15 entries, now 1
      entry GONE   (ObjectDecl BigReduction at FortressLibrary.fsi:L, due to missing members of the trait/object in the component)
      entry GONE   (TraitDecl TotalComparison at FortressLibrary.fsi:L, due to different method = @ FortressLibrary.fsi:L)

**The export error, entry by entry.**
- Gone, 14, each by the edit of its row in section 1 (14 'entry GONE' lines): `BigReduction`, `Comprehension`, `Just`, `Nothing`, `ActualReduction`, `Array1`, `Array2`, `Array3`, `Condition`, `DelegatedIndexed`, `ImmutableArray1`, `Maybe`, `RR64`, `TotalComparison`.
- Stays, 1: `String`, rung T's. Its text is the landed one at moved lines: '(TraitDecl String at FortressLibrary.fsi:2447.1, due to different method size @ FortressLibrary.fsi:2449:5-24, due to different method size @ FortressLibrary.fsi:2449:5-24, Asbtract method size @ FortressLibrary.fss:4338:5-24 is not declared in the API, different excludes clauses for traits)'.
- Come: none.

**The other four sites, by row** (`<scratch>/errors.tsv` against the per-site list):
- `BIG MIN` at `FortressLibrary.fss:4396` and `:4402`, with the same message. These are the landed `:4395` and `:4401`, one line down because of the `size` line added at `:2101`.
- The fused arm at `:1466`: 'Function body has type OR(I0,O0), but declared return type is O0.'
- `List.fss:146`: 'Function body has type OR(List.List[\Any\],List.List[\E\]), but declared return type is List.List[\E\].'

No site came, in `FortressLibrary` or in any other component: '#unit component FortressLibrary 4' and '#unit component List 1', as landed.

**The count stage, after**, once: `explorations/coordinator/tools/checker-count/run.sh tmp/rung-export-last/checker-count-postedit.txt tmp/rung-export-last/cc-post` printed '#total 3', '#locations 3', '#crash none', every api 0, '#shadow matches the tracked StaticChecker'. `diff explorations/compile-ladder/climb-batch-21b/gate/checker-count.txt <table>` printed nothing.
- Its three errors are the component's type errors: the fused arm at `fss:1466`, and `BIG MIN` at `:4396` and `:4402` ('File FortressLibrary.fss has 3 errors.', '### rc=-1'). It never reaches the export check (`compile-ladder/rung-export-align/REPORT.md`, section 5).
- It took about 99 s, from 02:10:33Z to its log's last write at 02:12:12Z. The distance stage's own '#seconds' line reads 226.
- The machine: nproc=4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Load at the count's start was 1.76 0.92 0.64, and at the distance's 10.22 4.44 1.96 (the batch's other agents).
- No checker code changed, so no speed pass.

**The walk guard**, `ProjectFortress/tests/ExportAlignedMembersWalk.fss`, has 77 assertions; its `boundsAt` runs twice, at bases (1,2,3) and (4,1,2). It checks:
- `RR64`'s brackets, `truncate` and `^` on a literal and on a computed float;
- `TotalComparison`'s `=` at a `TotalComparison` and at `Unordered`;
- `Condition`'s `indices`, `indexValuePairs`, `ivmap` and range subscript on `Just` and `Nothing`;
- `Just`'s `SQCAP` and `SQCUP` against `Just`, `Nothing` and `NotUnique`;
- the distributes of `SumReduction` and `ProdReduction`;
- `BigReduction`'s and `Comprehension`'s `reduction`, `body` and `unwrap`;
- `size`, `|self|` and `generator` of a flat string, a `SubString`, a zip, and the rank-2 and rank-3 ranges. The zip is a `DefaultZip`, which takes `DelegatedIndexed`'s `generator`; the ranges take `DelegatedIndexed`'s new `size`;
- `bounds`, `zeroIndices` and `[:]` of `Array1`, `Array2` and `Array3` based above zero.

It is a guard, so it passes on the base and after:
- On the base, before the edit: `explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-exportlast/tmp/rung-export-last/h1 ProjectFortress/tests/ExportAlignedMembersWalk.fss` printed '# harness-one 2026-10-24T02:08:28Z; tree 64386618b', 'PASS', 'OK (1 test)'.
- After: the same command at 02:09:59Z printed 'PASS', 'OK (1 test)'. Inside `ant testSystem` on `94179a74a` (section 3): 'interpret /home/user/fortress-exportlast/ProjectFortress/tests/ExportAlignedMembersWalk  OK (time = 1283ms)'.

## 3. Suites and the ladder

- `ant testSystem`, once, on `94179a74a`: 'Tests run: 168', '174', '171', '166, Failures: 0, Errors: 0' over the four shards, 679 in all. That is the landed 678 (`explorations/compile-ladder/climb-batch-21b/gate/summary.txt:57-60`) and the guard. 'BUILD SUCCESSFUL', 'Total time: 4 minutes 17 seconds'. No test's verdict changed.
- `ant testSpecData`, once (P-124: the component changes): 'Tests run: 130, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL', 'Total time: 1 minute 7 seconds'.
- Both builds printed 'Caches /home/user/fortress-exportlast/default_repository/caches kept': no Java or Scala changed.
- Not run: `ant testFast` or `ant testQuick`. The edit changes no Java or Scala, and the compiled tracks compile against the compiler's prelude, which never reads `FortressLibrary` (`tests-running.md`, "When to run a whole suite"); the gate runs them.
- Not run: the 52 demos. They are the gather's, on the merged tree (the batch record's fork 20), in place of the skill's run after a library edit.

**The ladder subset** ran after the edit only, with the drivers copied under `tmp/rung-export-last/ladder/` as `gate.md`, "The ladder regression", says. Its files are those whose recorded first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names a member this rung touched:
- `Generator2Test.fss`: 'ActualReduction is undefined.'
- `IntMapTest.fss`: 'Comprehension is undefined.'
- `XXXextendBoolean.fss`: 'The inherited abstract method abstract getter isEmpty:Boolean from the trait Condition[\()\]'

None is on the gate's pass list, so they are compared with the baseline: each stops at the same phase as before, `disambiguate`, `disambiguate` and `typecheck`. `Generator2Test` and `XXXextendBoolean` give the same first error. `IntMapTest`'s first error now reads 'ImmutableArray is undefined.', from `Library/CovariantCollection.fsi:23`. `Library/IntMap.fsi:13` imports that api, which changed after the baseline (`2b1cd8e63`, `20474c144`). Its compile output names no `FortressLibrary` file, and the compiled path compiles against the compiler's prelude. So no move. For the eighteen microGPT components, `diff <(mg_phases explorations/compile-ladder/climb-batch-21b/gate/ladder/microgpt-phase.md) <(mg_phases tmp/rung-export-last/ladder/microgpt-phase.md)` printed nothing.

## 4. Where the fix belongs, and the precedent

The export check's verdict is the specification's rule (`apis.tex:252-256`): an api declaration's matching definition has the same header and type. The check is in the checker (`explorations/coordinator/map/spec-to-implementation.md:156`, "export, linking"), which the batch does not change (its forks 21 and 22). P-27 makes the library's own practice the standard, so the fix is library text.

That practice, in this api: each member stated at its component's header. `031c38bbc` wrote 19 follow-on lines this way (the export probe's section 4.3), e.g. `OpenRange`'s `shiftLeft` (fsi:2231, fss:4061). Of the 15 entries landed, this rung's 14 are the remaining sites of that defect in `Library/FortressLibrary.fsi`. The 15th, String's, is rung T's.

The ways the language and the library offer, by kind of entry:
- **An api member at another header than the component's.**
  - (a) The api at the component's header. Taken for `TotalComparison`, `^`, `Condition`, `Maybe`, `Just`'s meets and joins, the distributes and the parameters.
  - (b) The component at the api's header. Taken where the api's type is the contract callers use, or the only one the api can name: `RR64`'s rounding, `generator`, the arrays' `bounds` and `zeroIndices`.
  - (c) A check rule that reads past the header, for an inherited body or for a field that meets a getter. This is a checker change, not this batch's.
- **An api member with no component text.**
  - (a) Out. Taken for the `OpenRange` and 1.0 range subscripts.
  - (b) In a comment, as climb batch 20's fork 5.
  - (c) `abstract` in the api, which the export check accepts (F-282). Not taken: these are concrete operators that a caller would expect to find, and no object defines them.
- **A member the component's trait inherits.**
  - (a) The component states it. Taken, for `size`.
  - (b) The api's line out. The planner measured it to bring 4 abstract-method errors in `RangeInternals`' 2D and 3D ranges (the batch record's fork 9).

## 5. What the specification settles

`apis.tex:252-256` settles the rule. It does not choose between the api's header and the component's. The library's practice does that (P-27), with the decisions on record:
- the coordinator's call of way A+ for `Condition` (the batch record's section 2, "Defaults already taken", 2);
- fork 3 for `RR64`'s rounding, in place of the call that brought 3 errors ("Defaults already taken", 3);
- P-90's reading: it speaks of the bare `Nothing` only;
- P-68: the float brackets, `round` and `truncate` become `ZZ` in row 330's own rung, after the switch-over. Today they are `ZZ64` under walk, which these lines now say.

## 6. Old against new

- `ProjectFortress/tests/ExportAlignedMembersWalk.fss` through the harness: 'OK (1 test)' on the base (02:08:28Z) and on the edit (02:09:59Z).
- A probe of `RR64`'s rounding under walk on the base, before the edit: `bin/fortress ProbeRounding.fss` in my tree at `64386618b` (scratch). It printed 'floor-bracket lit 2 ZZ64', 'ceil-bracket lit 3 ZZ64', 'truncate lit 2 ZZ64', 'truncate float 2 ZZ64'. So before the edit, walk already answered `ZZ64` from the literal's `RR64` methods, though they declared `ZZ` and `RR64`. The edit's `ZZ64` states what walk answered.
- Rows 188 and 283 on the old code: `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base22 /home/user/fortress-exportlast/tmp/old-caches ProbeNarrow.fss` printed 'narrow floor-bracket 7 ZZ32' and 'truncate 7.0 7 ZZ64'. Neither row's failure reproduces at the base: 'Cannot find definition for method truncate given receiver 7.0' for row 188, and '... narrow given receiver 3: ZZ64' for row 283.

## 7. Sentences made false

**In `Specification/`: none.**
- Part IV renders the api (`Specification/library/default-libraries.tex:25-27`), so its listing changes when built (section 8). It needs no edit.
- I grepped for a sentence that states any of these: `Condition`'s or `Maybe`'s supertypes, a range subscript of `Just` or `Nothing`, the parameters of `BigReduction` or `Comprehension`, the signatures of the distributes, `TotalComparison`'s `=`, or `RR64`'s rounding at a float type. What it found:
  - `Specification/basic/expressions/if.tex:53` and `while.tex:29`, 'A \TYP{Condition} is a generator that generates 0 or 1 element.', which stay true;
  - `Specification/basic/inference.tex:410` and `Specification/appendices/changes.tex:1291`, which name `BigReduction` and `Comprehension` but not their parameters;
  - `changes.tex:3885-3887`, which leaves the floating-point rounding to row 330, still so;
  - `Specification/advanced-lib/comparison.tex:25-39`, which shows no `=`.
- No Appendix I Effect and no note on walk or the compiled path is made false.

**In the record, for the gather:**
- F-282's 'the `FortressLibrary` export error names 15 traits and objects' and its list: now one, `String`.
- P-68's 'and `round` and `truncate` are `ZZ64`, `ZZ` or `RR64` by declaration'. No float `truncate` is declared `RR64` now: `fss:501` is `ZZ64`. `round` stays `ZZ` at `fss:502`, and `ZZ64` in `Float` (`FortressBuiltin.fss:192`).
- Row 330's notes: '`truncate` is `RR64` in `trait RR64`'s body (`Library/FortressLibrary.fss:498`)'.
- F-63's '`Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:933`': it is now at `:934`, still a sequential generator, and now a `ZeroIndexed` in the api too.
- Row 533's claim (added by the skeptic): '`10.0^(-5)` ... ties `RR64`'s `opr ^(self, b:RR64)` with `MultiplicativeRing`'s `opr ^(self, other:ZZ64)`'. The api's `RR64` power now takes `b:Number` (`Library/FortressLibrary.fsi:367`), and the tie does not reproduce at the base either (`SKEPTIC.md`, section 3).

## 8. Points to report

- **rung-E.patch, taken as it is.** The tree's diff equals it (section 1). No improvement was needed: the stage cleared the 14 entries it was measured to clear, and nothing came.
- **The distance and the export error, before and after.** The distance is 5 before and 5 after. The export error goes from 15 entries to 1: the 14 are gone, `String`'s stays, and none came. No site came in any component (section 2). The count stage's table reads 3, equal to the landed one.
- **The count stage's seconds:** about 99 (section 2).
- **Declarations that join, leave or change in the api, and so in Part IV:**
  - join, 7 lines: `TotalComparison`'s `opr =(self, other:TotalComparison): Boolean` and `opr =(self, other:Unordered): Boolean` (fsi:125-126); `Condition`'s `opr [r:Range[\ZZ32\]]: Condition[\E\]` (fsi:945); `Just`'s `opr SQCAP(self, o:NotUnique[\T\]): Just[\T\]`, `opr SQCAP(self, o:Just[\T\]): Maybe[\T\]`, `opr SQCUP(self, o:Nothing[\T\]): Just[\T\]` and `opr SQCUP(self, o:Just[\T\]): UniqueItem[\T\]` (fsi:1024-1027);
  - leave, 13 lines: `TotalComparison`'s `opr =(self, other:Comparison): Boolean`; `Just`'s `opr SQCAP(self, o:UniqueItem[\T\]): Maybe[\T\]` and `opr SQCUP(self, o:UniqueItem[\T\]): UniqueItem[\T\]`; the six subscripts, which are `Just`'s `opr[r:Range[\ZZ32\]]:Maybe[\T\]`, `Nothing`'s `opr[r:Range[\ZZ32\]]: Nothing[\T\]`, and the `opr[_:OpenRange[\ZZ32\]]` of `ImmutableArray1`, `Array1`, `Array2` and `Array3`; `BigReduction`'s `getter reduction()`; `Comprehension`'s `getter reduction()`, `getter body()` and `getter unwrap()`;
  - change, 11 lines: `RR64`'s `opr ^(self, b:RR64)`, whose exponent becomes `Number` (fsi:367); `Condition`'s `extends` clause, `indices`, `indexValuePairs` and `ivmap` (fsi:934, :941-942, :955); `Maybe`'s `extends` clause (fsi:998); `ActualReduction`'s three distributes (fsi:1903, :1906, :1909); `BigReduction`'s parameter `r`, renamed `reduction` (fsi:1968); `Comprehension`'s `u`, `r` and `singleton`, renamed `unwrap`, `reduction` and `body` (fsi:1973);
  - the renamed parameters are those two objects' four. None of the six subscripts that leave has a renamed parameter.
- **Walk values that move, and verdicts that change: none measured.** The guard's assertions hold on the base and after. `ant testSystem` ran 679 tests and `ant testSpecData` 130, with no failure (section 3). The component lines that walk now runs differently:
  - the declared result types of `RR64`'s three: walk answered `ZZ64` before (section 6);
  - the declared result types of `generator` and of the arrays' `bounds` and `zeroIndices`: wider types, the same values;
  - `DelegatedIndexed`'s `size`: the same body it inherited.
- **Sentences made false:** none in the specification (section 7); four in the record, for the gather.
- **Files edited beyond those named, and edits of String, the checker or walk's Java:** none. The edit is `Library/FortressLibrary.fsi` and `Library/FortressLibrary.fss` at the lines the brief names, plus the guard in `ProjectFortress/tests/`.
- **A template check of row 330's new line** by `explorations/coordinator/tools/ledger.py rewrite 330 <line> --ledger <scratch copy> --history <scratch copy>`, once, on scratch copies under `tmp/`. It refused for length ('notes-length: 724 characters; at most 700') and wrote nothing tracked. The ledger and its history are untouched; later length checks were by my own count.

## 9. Decisions

1. **rung-E.patch as it stands**, over editing it. Evidence: its 14 entries are gone and nothing came (section 2); the guard and both walk suites are green (sections 2 and 3).
2. **The `OpenRange` subscripts deleted, not put in a comment** (fork 6's default).
   - Not taken: a comment, as climb batch 20's fork 5 did for `immutableArray`'s ranks (`fsi:1530-1533`), whose component held them in a comment; `abstract` in the api.
   - Evidence: the component has no text of them, now or at `a874948ac`, so there is nothing to mirror; the brief names them out.
3. **`RR64`'s rounding: the component at `ZZ64`** (fork 3).
   - Not taken: the api at the component's `ZZ` and `RR64`, the call, which brought 3 return-type errors at `Float`'s three; `Float`'s results changed now, which is P-68's own rung (row 330).
   - Evidence: walk already answered `ZZ64` (section 6), which is what the api and `Float` declare.
4. **`DelegatedIndexed`'s `size` stated in the component** (fork 9).
   - Not taken: the api's line out (4 abstract-method errors, measured by the planner); a check rule that counts inherited bodies (a checker change).
   - Evidence: the guard's `size` of the rank-2 and rank-3 ranges and of the zip, which take this body, holds on both trees.
5. **The component at the api's types for `generator` and the arrays' `bounds` and `zeroIndices`** (forks 10 and 11).
   - Not taken: the api at the component's `Indexed[\E,I\]` and `RangeInternals` types.
   - Evidence: the api cannot name `RangeInternals`' types, which import it; `FlatString` overrides `generator` at `Generator[\Char\]`; the component's bodies call only `Generator` methods on it.
6. **Way A+ and A++ for `Condition`, `Maybe`, `Just` and `Nothing`** (the coordinator's call, and fork 4).
   - Not taken: ways A, R, B, B+, C, D, D+ and E (`explorations/perf-probes/condition-zeroindexed/REPORT.md`, sections 3 and 4).
7. **The api at the component's headers for `TotalComparison`'s `=`, `^`, `Just`'s meets and joins, the distributes and the big operators' parameters** (forks 5, 7, 8 and 12).
   - Not taken: the component at the api's headers, since the api's distributes are built nowhere and the component's `TotalComparison` forms avoid the ambiguity its comment names; a check rule that lets a value parameter meet an api getter (a checker change no text asks for).
8. **Row 330 given by its whole new line**, where the brief names a note.
   - Not taken: the note alone.
   - Evidence: the row's notes say '`truncate` is `RR64` in `trait RR64`'s body', which the edit makes false, so a note beside them would contradict the row. The brief's note text is folded into the new line (record.md).
9. **Notes for rows 188 and 283**, which the brief does not name. Evidence: section 6.
10. **The ladder subset of three files** whose first error names a touched member, with the eighteen microGPT components.
    - Not taken: running none, on the ground that no ladder file compiles against the interpreter's library.
    - Evidence: the baseline's `ladder.tsv` rows.
11. **The demos left to the gather** (fork 20), where the skill asks a library edit to run them: the brief holds.

No decision of the curator's is acted against, and no step was taken that cannot be undone.

## 10. Defects, each with its home

- **The 14 export entries (F-282):** home 1, repaired by this change. The test is the distance stage's per-site list (`explorations/compile-ladder/gate/distance-sites.tsv` before; the merged gate's list after). The walk guard `ExportAlignedMembersWalk` keeps the members' values.
- **Rows 188 and 283:** they no longer reproduce at the base (section 6). This is the absence of a defect, not a defect measured. record.md has a note for each row; the gather can close or retire them.
- No other defect was found, and no new row is opened.

## 11. For FACTS

F-282, rewritten after this rung:
- The fact: the `FortressLibrary` export error names one trait, `String` (rung T's). The 14 others are gone: the api states its component's members at the component's headers, and seven component lines take the api's types.
- What it means: with T, the export error's site leaves the distance. The zero rests on the landed reading of `abstract` (question 1, row 816).
- Its test: the distance stage's per-site list; walk's values by `ProjectFortress/tests/ExportAlignedMembersWalk.fss`.
- Detail: this report, sections 1 and 2.

## 12. Commands worked out

- The ladder subset's `subset.txt`: the rows of the baseline's `ladder.tsv` whose `first_error` names a member the rung touched, read with a short `csv` filter over its columns; it gave three files.
- `ProbeRounding.fss` and `ProbeNarrow.fss` (scratch): a `typecase` over `ZZ32`, `ZZ64`, `ZZ` and `RR64` prints the run-time type of a rounding's result under walk.
