# Climb batch 22, rung E (`rung-export-last`): the skeptic's check

The head judged is `94179a74a`, the worker's last commit on `wip/rung-export-last`. My commits after it:
- `1623254e8`: the worker's `REPORT.md` and `record.md`, written from the run's journal by `explorations/coordinator/tools/journal-text.py`. The first try exited 1 and wrote nothing, because `explorations/compile-ladder/rung-export-last/` did not exist on the branch ("FileNotFoundError: ... 'explorations/compile-ladder/rung-export-last/REPORT.md'"). I made the folder and ran the same two lines again: "wrote ... REPORT.md, 27479 bytes" and "wrote ... record.md, 14857 bytes".
- `8526d727d` and `2e83f38d1`: two corrections (section 4).
- This file, last.

Verdict: **approved**. The change is the planner's `rung-E.patch`, byte for byte. Its stage moved what the report says. Walk's values hold in every valid program I wrote, under the old code and the new. Two corrections were needed: the guard's comments and one citation, and the report's provenance block and some line numbers. I also handed row 533 to the gather. No fix is contested.

## 1. The test: the stages, read from the worker's runs

The before is climb batch 21b's landed gate. The code did not change between it and the base: `git log 32242b80d..64386618b -- Library ProjectFortress/src ProjectFortress/LibraryBuiltin explorations/coordinator/tools/distance explorations/coordinator/tools/checker-count` lists only `36ec68cab`, the count stage's reading of a clean check. The base build `/home/user/fortress-base22` is at `08c95c708`. `git diff --name-only 08c95c708 64386618b` names only `explorations/` and skill files, so its code is the base's.

The worker's distance stage ran at 02:12:38, after the library edit at 02:09:23 (call `atrpAG`) and its commit `94179a74a` at 02:10:22. Nothing was edited after it. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21b/gate/distance.txt tmp/rung-export-last/distance-postedit.txt` printed:

    DISTANCE SAME   5

`python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/rung-export-last/dist-post/errors.tsv`:

    landed 5 now 5
    export 'are not matched by the declarations': landed 15 entries, now 1
      entry GONE   (ObjectDecl BigReduction at FortressLibrary.fsi:L, due to missing members of the trait/object in the component)
      entry GONE   (TraitDecl TotalComparison at FortressLibrary.fsi:L, due to different method = @ FortressLibrary.fsi:L)

There are 14 `entry GONE` lines in all, those the report names, and nothing came. The other four sites in `errors.tsv` are `BIG MIN` at `FortressLibrary.fss:4396` and `:4402`, the fused arm at `:1466`, and `List.fss:146`: the landed sites, two of them one line lower.

The count stage ran from 02:10:33 to 02:12:12, about 99 s by its log's last write. `diff explorations/compile-ladder/climb-batch-21b/gate/checker-count.txt tmp/rung-export-last/checker-count-postedit.txt` printed nothing; its rows include '#total 3' and '#crash none'. No checker code changed (`git diff --name-only 64386618b 94179a74a` lists two library files and the guard), so no count was needed on the base build and no speed pass.

Walk's suites, from the worker's logs (`ant testSystem` at 02:16:55 and `ant testSpecData` at 02:21:29, both on `94179a74a`'s code):

    [junit] Tests run: 168, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 225.463 sec
    [junit] Tests run: 174, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 245.366 sec
    [junit] Tests run: 171, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 246.057 sec
    [junit] Tests run: 166, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 248.889 sec
    BUILD SUCCESSFUL

The four shards sum to 679, the landed 678 (`explorations/compile-ladder/climb-batch-21b/gate/summary.txt:57-60`) plus the guard. `ant testSpecData` printed 'Tests run: 130, Failures: 0, Errors: 0' and 'BUILD SUCCESSFUL'. Both builds printed 'Caches ... kept'.

**Test first.**
- The rung's test is the distance stage. Its failing state is the landed table, as the brief says, and the transcript shows no run of the stage on the base.
- The walk guard guards values that hold today, so it has no failing run (tests-writing.md, "The order"). Its first run on the base, at 02:08:02 (call `LgoGng`), failed on the test's own arithmetic: 'FAIL: a Int: 672 =/= a Int: 678; the indices of a rank-3 array's bounds index each of its elements once'. The worker corrected the expected sum to 672, the true sum of `100 i + 10 j + k` over the 2 by 2 by 3 array. The guard then passed on the base at 02:08:28 ('OK (1 test)', call `CqKXfb`), before the edit at 02:09:23, and after it at 02:09:58 (call `MUGMq4`).
- So `failureWasRecorded` is false: no harness run failed on the base's code. That is the form the brief gives this rung, not a defect.

## 2. The diff, against the section and the decisions

`git diff 64386618b 94179a74a -- Library`, with its `index` lines left out, equals `explorations/compile-ladder/plan-22/probes/rung-E.patch`: `diff` printed nothing. Each of its twelve edits is the one the brief and forks 3 to 12 of `explorations/coordinator/CLIMB-BATCH-22.md` name (`:95-104`), and no other line is touched.
- The api lines are TotalComparison's two `=` (`Library/FortressLibrary.fsi:125-126`), RR64's `^` (`:367`), Condition by way A+ (`:934`, `:941-942`, `:945`, `:955`) and Maybe's header (`:998`).
- In Just and Nothing, the range subscripts leave and Just's four `SQCAP`/`SQCUP` come in (`:1024-1027`). The four `OpenRange` subscripts leave.
- ActualReduction's three distributes change (`:1903`, `:1906`, `:1909`), and BigReduction's and Comprehension's parameters (`:1968`, `:1973`), with their four getters out.
- In the component: RR64's three rounding lines (`Library/FortressLibrary.fss:498`, `:500`, `:501`), DelegatedIndexed's `size` and `generator` (`:2101-2102`), and Array2's and Array3's `bounds` and `zeroIndices` (`:2657`, `:2745`, `:3065`, `:3147`).

Each component change is settled by a fork. The device is the library's own:
- `DefaultZip` restates `getter size(): ZZ32 = |self|` (`Library/FortressLibrary.fss:2060`), and so does `ArrayList` (`Library/List.fss:256`).
- `Float`'s natives answer `ZZ64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191`).
- `FlatString`'s `generator` answers `Generator[\Char\]` (`Library/FlatString.fss:45`).

Way A+ and A++ follow the Condition probe's table (`explorations/perf-probes/condition-zeroindexed/REPORT.md`, section 3). The api's `Condition[\X\]` now extends `ZeroIndexed[\X\]`, so `indexValuePairs: Condition[\(ZZ32,E)\]` is an `Indexed[\(ZZ32,E),ZZ32\]`. And `Maybe`, through `Condition`, stays a `ZeroIndexed`, which `String.fss` and `FlatString.fss:149` rely on.

The record's cited lines hold:
- the team's tree at `a874948ac` (fsi:123, :318, :767, :774-775, :787, :830, :844, :868, :852-853, :1724, :1789, :1215; fss:164-165, :402, :1200, :1333, :1335, :2973, :2978, :415, :418, :1767, :2295, :2387, :2670, :2752);
- `28ecf5f0d` (2008-04-08, jmaessen), which introduced `Condition`;
- `031c38bbc`, which added `shiftLeft(amount: I): OpenRange[\I\]` to the api.

Row 330's new line passes the template on scratch copies: `python3 explorations/coordinator/tools/ledger.py rewrite 330 <the line> --ledger <copy> --history <copy>` printed 'row 330: rewritten (1048 characters)'. The notes for rows 188 and 283 fit too: 'row 188: note added (869 characters)', 'row 283: note added (828 characters)'. The ledger itself is untouched. Its cited lines in the head hold: `Library/FortressLibrary.fsi:378-382`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:182-191`, `Library/FortressLibrary.fss:497-502`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:457-458`, `:468-469`.

## 3. My programs, old against new

All are under `tmp/rung-export-last/skeptic/`, at `FORTRESS_THREADS=1`. The diff has no mutable variable, field, `atomic` block or write into a library's state, so I ran no four-thread run.
- Walk, old code: `/home/user/fortress-base22/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base22 /home/user/fortress-exportlast/tmp/old-caches P.fss`.
- Walk, new code: `/home/user/fortress-exportlast/bin/fortress P.fss`.
- In every case `diff` of the two outputs printed nothing, except the two noted.

**`SkRound`, walk.** Literal and computed floats, their brackets, `truncate`, `round`, NaN, 10^20, and `^` at a `QQ`, `ZZ64`, float and negative exponent. Same old and new:

    kind 7.25 = 7.25 : FloatLiteral
    floorb 7.25 = 7 : ZZ64
    trunc -7.75 = -7 : ZZ64
    round 7.5 = 8 : ZZ64
    trunc 1e20 = 9223372036854775807 : ZZ64

So under walk the literal runs `trait RR64`'s bodies and answered `ZZ64` before the edit too. `round`, declared `ZZ` there, answers `ZZ64`: walk holds no result to its declared type (P-12). It also prints 'narrow floorb = 9 : ZZ32' and 'trunc 7.25 = 7 : ZZ64' on the old code, so rows 188 and 283 do not reproduce at the base, as the worker found.

**`SkRoundC`, compiled.** `old-fortress.sh ... compile SkRoundC.fss` then `... run SkRoundC`, and the same with the head's `bin/fortress`. The output is the same, 'floorb  7.0', 'trunc  7', 'pow  52.5625', 'PASS'. The compiled path links the compiler's prelude, which this rung does not touch. Its `7.0` beside walk's `7` is row 330's known departure.

**`SkCond`, walk.** `Just`, `Nothing` and `NotUnique`: `indices`, `indexValuePairs`, `ivmap`, `bounds`, range subscripts in and out of bounds, the integer subscript, all sixteen meets and joins among the three, typed `Maybe`/`UniqueItem` operands, `BIG SQCAP` and `BIG SQCUP`, `unique`, `IN`, a loop, `SUM`, and `Boolean` as a `Condition[\()\]`. Same old and new. Some of its lines:

    j[0#1] -> Just(42)
    j[0#2] threw IndexOutOfBounds[\ZZ32\]
    meet jj Just(42) jk Nothing jn Nothing ju Just(42)
    join jj Just(42) jk NotUnique jn Just(42) ju NotUnique
    bool cond holds true size 1 ivp <(0,());> indices <0;>

**`SkArrB` and `SkArrOpen`, walk.** Arrays of ranks 1 to 3 based above zero: `bounds` and `zeroIndices` with their run-time classes, their generators, `lower`/`upper`/`extent`, `indexValuePairs`, `[:]`, `[::2]`, `[6:]`, `[6#2]`, a matrix and its transpose. Same old and new: 'a2 bounds ([3,4] BY [7,8,9]) kind CompactFullRange2D', 'a1[::2] -> [0#2][ 1 3 ]'.

`SkArrOpen`'s `a2[::1]`, a rank-2 array subscripted by one `OpenRange[\ZZ32\]`, the form the api declared and the component never built, stops the same way on both trees: 'Failed to find any matching overload, args = (OpenScalarRange)'. Only the list's order and line numbers differ.

**`SkDeleg`, walk.** User `DelegatedIndexed` carriers: by indices, by pairs, one with its own `size`, and an empty one. Their `size`, `|self|`, `generator`, `seq`, loops, `SUM` and `reduce`. Also a list, a `CaseInsensitiveString`, a flat string, a `CatString`'s substring, ranks 2 and 3 ranges, and a zip. Same old and new: 'a size 4 |a| 4 gen <0;3;6;9;> kind SimpleMappedIndexed[\ZZ32,ZZ32,ZZ32\]', 'o size 1000 |o| 3 gen <0;1;2;>', 'r2 size 6 |r2| 6 ... kind CompactFullRange2D'.

**`SkMix`, walk.** `BigReduction`'s and `Comprehension`'s fields from a client, `__bigOperator` over a `BigReduction`, the reductions and comprehensions, the distributes, and `TotalComparison`'s `=`, `>=`, `CMP`, `LEXICO` and `INVERSE` against `Unordered` and typed `Comparison`/`TotalComparison` variables. Same old and new: 'br reduction SumReduction[\ZZ32\] body 4 unwrap 5', 'cmp eq true false false false true', 'cmp var true true false false false'.

**`SkMix2`, walk: the one value that moves.** It declares:

    trait Sized getter size(): ZZ32 = 77 end
    object Both(n: ZZ32) extends { DelegatedIndexed[\ZZ32, ZZ32\], Sized } ... end

`diff` printed:

    < both size 77 |bo| 3
    ---
    > both size 3 |bo| 3

`Both` inherits two `size` bodies of one signature from sibling traits. Before the edit, `DelegatedIndexed` declared none: it inherited `Indexed`'s, and walk took `Sized`'s. Now `DelegatedIndexed` declares one (`Library/FortressLibrary.fss:2101`), and walk keeps the first trait's in the extends clause. That is ledger row 735's walk departure, whose notes say the compiled checker refuses such an object ('Invalid overloading of m in trait O'). The program is not valid Fortress, and the specification lets run-time dispatch choose an arbitrary one among declarations of which none is more specific (`Specification/basic/overloading.tex`, "Overloading Resolution"). With `Sized` first, and with `ZeroIndexed` beside `DelegatedIndexed`, nothing moves. No library type is in this case: each extender of `DelegatedIndexed` either declares its own `size` or has no other concrete `size` above it. `DefaultZip` (`:2060`), `ArrayList` (`List.fss:256`), `SubString` (`String.fss:345`), `ReflectTuple`, `CaseInsensitiveString` and `ReadableArray1` (`:2354`) declare one; the 2D and 3D ranges and `GeneratorSize.fss`'s `EvenIndices` take `DelegatedIndexed`'s. Row 735's notes are full (a note would make them 906 characters), so this instance is here and in my result, not in the ledger.

**`SkPow`, `SkWhich2` and `SkClient`: the checker against the interpreter's library.** The api lines matter only to the checker. I ran the distance stage's driver on one component at a time, with the shadow classes of the worker's distance run:

    java -Xmx4g -Xss64m -Djava.io.tmpdir=<K>/jt -Dfortress.caches=<K>/caches -Dprobe.tolerant=true -Dprobe.all=true \
         -Dfortress.analyzer.overload.cache=false -cp "tmp/rung-export-last/dist-post/shadow-classes:tmp/rung-export-last/dist-post/classes:$CP" \
         DistanceMulti -order check -setting any <K>/P.fss

- For the old library, the run's working directory was a scratch folder holding the base's `FortressLibrary.fsi` and `.fss` (`git show 64386618b:...`), which the source path searches first.
- The Java is the same on both trees. `SkWhich2` shows the old run read the old library: its two discriminating functions give no error there, and on the head 'Function body has type Condition[\ZZ32\], but declared return type is Maybe[\ZZ32\]' and 'Function body has type Generator[\ZZ32\], but declared return type is CompactFullRange[\ZZ32\]'.

What clients see:
- `10.0^(-5)` and `10.0^(-8)` check with no error on both libraries. So row 533's tie, which names the api's `opr ^(self, b:RR64)`, now `b:Number`, does not reproduce at the base either.
- `SkClient`, with 6 errors on the head and 15 on the base, lists the api's static changes for a client:
  - Accepted now: `x^q` for `q: QQ`, which the base refused ('Could not check call to operator ^ ... not applicable to an argument of type (RR64, QQ)'); a `Condition` as a `ZeroIndexed`; `c.indexValuePairs` as a `Condition`; `j SQCUP n` as a `Just`.
  - Refused now: `j[r]` on a `Just` typed `Maybe` (it is a `Condition`); a `Condition`'s `indices` typed `CompactFullRange` (it is a `Generator`); and `j SQCAP u`, with `u: UniqueItem[\ZZ32\]`, typed `Maybe`. The last now resolves to `UniqueItem`'s own `SQCAP` and answers `UniqueItem[\ZZ32\]` ('Function body has type UniqueItem[\ZZ32\], but declared return type is Maybe[\ZZ32\].').
  - All of these are the forks' api at the component's headers. Under walk each still answers the same value.

## 4. Fixes

Both are corrections, settled.

1. **`8526d727d`, the guard.**
   - `ProjectFortress/tests/ExportAlignedMembersWalk.fss` carried eight section comments beside its header line. A test carries one comment line (the skill's `tests-writing.md`, "Names, comments, citations": "Give it one comment line that says what it checks"), so the eight are out.
   - Its first message cited `ranges.tex`, section "Ranges", for "that array based at 0". The section says only that an implicit range used as a subscript "is treated as" the axis's whole range (`Specification/basic/expressions/ranges.tex`, implicit ranges). The base 0 is the api's `opr[_:TrivialOpenRange] : Array1[\T,0,s0\]`.
   - So that message now cites `Library/FortressLibrary.fsi, trait Array1, opr [_:TrivialOpenRange]`, and the next, on the elements in order, cites `ranges.tex` for the whole axis. No assertion or value changed; 77 assertions still.
   - Head: `explorations/compile-ladder/rung-inference-walk/harness-one.sh .../tmp/rung-export-last/skeptic/h1 ProjectFortress/tests/ExportAlignedMembersWalk.fss` printed 'PASS', 'OK (1 test)'.
   - Base: `FORTRESS_HOME=/home/user/fortress-base22 /home/user/fortress-base22/explorations/compile-ladder/rung-inference-walk/harness-one.sh .../tmp/rung-export-last/skeptic/old-harness .../ProjectFortress/tests/ExportAlignedMembersWalk.fss` printed 'OK (1 test)'.
2. **`2e83f38d1`, the report and the record.**
   - `REPORT.md` opens with five provenance lines (`explorations/coordinator/climb-batch-workflow.md:98`), and its two deviation lines are now one.
   - The `TrivialOpenRange` subscripts it cited at `fss:2401` and `:2459` are at `:2402` and `:2460` on the head (`:2696` and `:3122` were the head's already). `Condition`'s component trait starts at `fss:1519`, not `:1518`, and `DelegatedIndexed`'s api lines are `fsi:1395-1396`, not `:1393-1394`.
   - Row 533's claim is made false in its declaration, and the row has no room for a note (ledger.py: 'row-length: 1508 characters; at most 1200', 'notes-length: 1033 characters; at most 700'). So `record.md`'s Ledger and its sentences made false, and the report's section 7, hand it to the gather, marked as mine.

No suite was needed. These change a test's comments and one message, and prose; no checker, walk or shared-phase code.

## 5. Where I differ from the worker's account

- Its decision 4 gives as evidence for `DelegatedIndexed`'s `size` "the guard's `size` of the rank-2 and rank-3 ranges and of the zip, which take this body". The zip does not take it: `DefaultZip` declares its own (`Library/FortressLibrary.fss:2060`). Neither does the `SubString` (`Library/String.fss:345`). Of the guard's carriers, the two ranges take it; `SkDeleg`'s `ByIndices`, `ByPairs` and the empty one take it too. The report's section 2 says so correctly.
- "Walk moved no value" holds for every valid program measured. `SkMix2` moves one value in a program the checker refuses (row 735), as section 3 says.
- Its recordedFailure leaves out the guard's first run on the base, which failed on the test's own expected sum before it was corrected (section 1). Not a defect: the correction preceded the edit.

## 6. The rest of the checks

- **Competing names.** `ExportAlignedMembersWalk` and `boundsAt` appear nowhere else in the test corpora, `Library/`, `ProjectFortress/LibraryBuiltin/` or `ProjectFortress/src/com/sun/fortress/`. `inOrder` is a top-level function of seven other walk tests, each its own component, and a local function in `Library/PrefixMap.fss:230`, so there is no clash. Walk's Java names `BigReduction` and `Comprehension` only by type (`interpreter/evaluator/EvaluatorBase.java:286`, `:312`), never by a parameter's name.
- **Sentences of the specification made false: none.** `if.tex:53` and `while.tex:29` stay true. `basic-lib/numbers.tex:191-196` and `:449-454` give the brackets and `truncate` at ZZ for `QQ` ("Rational Numbers"), not for `RR64`. Part IV is the api rendered (`Specification/library/default-libraries.tex:25-27`).
- **The failure-mode question.** No loud failure becomes a quiet value under walk: `a2[::1]` stops the same way before and after. On the compiled path after the switch-over, `a1[::2]` on a rank-1 array would have bound statically to the api's `OpenRange` subscript, which no component defines, and died as row 816's `NoSuchMethodError` does. It now binds to the range subscript and answers `[0#2][ 1 3 ]`, the implicit range `::2` read as the axis's whole range by stride 2 (`ranges.tex`, implicit ranges). That value is the specification's.
- **The three homes.** The 14 entries: home 1, by the stage's list, with the guard keeping walk's values. Rows 188 and 283: no defect at the base; the worker's notes are for the gather. Row 735's instance: an existing row, home 3. Row 533: not reproduced, for the gather.
