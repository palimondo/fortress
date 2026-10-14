# Climb batch 15, rung L (`rung-library-factories`): the skeptic's verdict

Head judged: `b92180717`, the worker's last commit on `wip/rung-library-factories`. My commits: `22cb62296` (the worker's REPORT.md and record.md, written byte for byte from the run's journal by `explorations/coordinator/tools/journal-text.py`, both calls exit 0), `9d91a922d` and `0e383f368` (two corrections, below), and this file.

Verdict: **approved**. The change does what the rung's section asks, in the library's way, test first; the stages move exactly row 685's four sites; my two corrections are of a test's form and of the record, none contested. One correction is left for the gather (section 6).

The report's count and distance tables are those of the worker's head: my commits change no code a stage reads (two test files lose comment lines, and the record changes), so I ran no stage and no suite after them.

## 1. The stages

- **The count.** `diff explorations/compile-ladder/climb-batch-14/gate/checker-count.txt <worker's checker-count-postedit.txt>` prints nothing: `#total 1`, `body(i)` at `:1314`, as landed.
- **The distance.** `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-14/gate/distance.txt <worker's distance-postedit.txt>`:

      DISTANCE DOWN   54 -> 50 (-4)
          kind wellformed               8 -> 4      (-4)
          class V1                      2 -> 0      (-2)  arrays: element type bounded by Number, which declares no arithmetic
          class OT                     15 -> 13     (-2)  other body errors (one-off library slips and checker limits)

  The crash "gone" and "new" are row 680's `Array3` `TraitDecl`, moved 16 lines (`2886` to `2902`).
- **By row**, my own reading: the landed `explorations/compile-ladder/gate/distance-sites.tsv` (54 rows), each `FortressLibrary.fss` line mapped through the edit (+9 for the base's 2457 to 2822, +16 from 2829) and every number in the messages masked, against the run's `errors.tsv` (50 rows). Gone: exactly the four `wellformed` rows at the base's `:2464` (`Vector[\T,s0\]`, against `Number` and `MultiplicativeRing[\T\]`) and `:2837` (`Matrix[\T,s0,s1\]`, both bounds). New: none. So no site comes or goes beyond row 685's four.
- **The runs that wrote them** (the worker's transcript): the library edit at 12:44:55 and 12:45:00 UTC, its commit `787bf3588` at 12:47:58; the count started 12:54:27 and the distance 13:00:46, with only `Specification/` modified in the tree (`git status --short` in the count's call prints ` M Specification/appendices/changes.tex` and ` M Specification/appendices/future.tex`). The later commits change tests and text only.

## 2. Test first

From the worker's transcript, by time and call id:

- Tests written 12:42:02 to 12:42:37 (`IntMapUplusSingleton.fss` modified before the run). The failing run, call `JLQQWk`, 12:42:45 to 12:43:20, on the base's library (`git diff --stat -- Library` empty in the same call):

      FAIL: a Boolean: true =/= a Boolean: false; array1 at Number gives a plain array (trait-parameters.tex, section "Type Parameters")
      FAIL: a Boolean: false =/= a Boolean: true; a map comprehension whose key 0 repeats last with a different value throws KeyOverlap (comprehensions.tex, section "Comprehensions")
      FAIL: J12/0:no exception =/= J36/0:IntMap.KeyOverlap: 1 |-> 1 and |-> 9; a many-entry map UPLUS a one-entry map holding its key throws KeyOverlap
      Tests run: 6,  Failures: 5,  Errors: 0

  The first library edit came after it: `git apply` of the probe's patch at 12:43:50 (call `nFD6F6`), undone and replaced at 12:44:55 (call `L4keeL`). The probe programs before 12:42 ran against a copy of the library in a scratch folder, not the tracked file.
- The passing run, call `iUCDrS`, 12:45:44, after the last library edit: `OK (10 tests)` (the six files and the team's and the revival's four `IntMap` tests), with `XXXArrayInferredElementVectorWalk` "OK Saw expected exception". Its red demonstration (call `iH8ue8`) was made once, as the skill asks of the first expected failure.
- The guard's assertion added at 12:45:10 was run on the old code (call `9kXKcH`): `OK (1 test)`.

## 3. The diff, the precedent and the specification

- **`array1` and `array2`** (`Library/FortressLibrary.fss:2451-2465`, `:2832-2844`): eight arms over `__thrower[\Array1[\T,0,s0\]\]` (and `Array2`), each `cast` of the vector or matrix built at that type, the `else` arms the team's. The probe's patch tested `__thrower[\T\]`. I agree with the worker's change of witness: `additiveIdentity`'s witness is also of its result type, which there is `T` (`:3245-3246`), so a witness of `Array1[\T,0,s0\]` is the same rule for a container; a witness of `T` matches a class below a number type and then fails the `cast`, as `openRange` does today (my run below). At `T = Int`, `Vector[\Int,n\]` is not well-formed (`Int` extends `ZZ32` only, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`), so a plain array is the only well-formed result of `array1[\Int,3\]()`; the probe's patch threw `CastError` for that well-formed call.
- **No other site.** `vector[\` and `matrix[\` are called elsewhere only inside declarations bounded as the family (`:2475`, `:2477`, `:2724`, `:2785`, `:2790`); no other `typecase` in the library tests `() -> Number`; `array3` has no vector arm. The compiled path's library declares none of these: `fortress compile` of my array program refuses "Array is undefined." on the old and the new code alike.
- **`IntMap`** (`Library/IntMap.fss:520`): `self.addNew(other)`, the singleton's own way (`:339-340`) and the comment's promise (`:517-518`). `fromCC` (`:727-730`) and `BIG UPLUS` (`:744-748`) are its only other users in the library; no other component imports `IntMap` (`grep -rl 'import IntMap'` names tests and two probes only).
- **The text.** The box (`Specification/appendices/future.tex:257-268`) and the entry's Change (`Specification/appendices/changes.tex:2402-2409`) and Original text (`:2567-2571`) say what the library now does; the quoted old clause matches the base's box word for word. `\library` is "the Fortress standard libraries" (`Specification/latex-common/macros/macros.tex:78`), so the unbuilt rewording "the factory of \library\ gives" reads as a sentence. The sentences made false that the worker lists (`Specification/basic/expressions/aggregate.tex:152-155`, `:165-166`; F-151's row 685 sentence) are the ones I find in the text; no Effect or `\note` names `IntMap` or the factory.
- **The tests.** Each is named by its topic and cites a section that exists (`trait-parameters.tex`, "Type Parameters", line 39; `inference.tex`, "The Static Arguments of a Call", line 47; `comprehensions.tex`, "Comprehensions"). Two carried more than one comment line: corrected (section 5).
- **Competing names.** The rung adds no library name. The six new components and their helpers (`fill3`, `filled`, `openAt`, `overlap`, `sharedKey`) occur in no other file of the test folders, `Library`, `ProjectFortress/LibraryBuiltin` or `ProjectFortress/src/com/sun/fortress`, and in no test of rungs B, C or O (B adds `IntMapComprehensionTypedWalk`, whose keys are distinct).

## 4. My programs, old code against new

All under walk at `FORTRESS_THREADS=1` unless said, each run with `/home/user/fortress-base15/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base15 /home/user/fortress-factories/tmp/old-caches P.fss` (old) and `/home/user/fortress-factories/bin/fortress P.fss` (new), from my scratch folder; the compiled path with the same tools' `compile`.

- **SkArr** (a `typecase` printing vector, matrix or plain): the same on both for `v.map[\ZZ32\]`, `v.copy()`, `v.replica[\ZZ32\]()`, `v + v`, `array[\RR64\](2,2)`, `matrix[\ZZ32,2,2\](1)`, `tabulatedArray1` at a function's declared `ZZ32`, `array1[\Any,2\]()`, and a microGPT-shaped `grid[\T extends Number, nat r, nat c\](m: Matrix[\T,r,c\]) = array[\T\](nr, nc).tabulate(...)`, whose `T` comes from the matrix's type argument: "grid at matrix's T: matrix" and `grid + grid` on both. The diff, old against new:

      < filled ZZ32 value: vector      > filled ZZ32 value: plain
      < filled RR64 value: vector      > filled RR64 value: plain
      < filled ZZ64 value: vector      > filled ZZ64 value: plain
      < pair ZZ32 value: vector        > pair ZZ32 value: plain
      < array1 Int written: vector     > array1 Int written: plain
      < array2 Number: matrix          > array2 Number: plain

  So the run-time-class case is not `Int` alone: an array built at a `T` that walk infers from a `ZZ64` or an `RR64` value is plain too (row NEW-L-2 says so).
- **SkLit** (array literals with a declared type): `r: RR64[3] = [1.0 2.0 3.0]` is a vector, `r + r` is `[0#3][ 2.0 4.0 6.0 ]`, `r DOT r` is `14.0`, `z: ZZ32[3]` and `m: RR64[2,2]` keep their vector and matrix and `m m`, identical on both. The section's "the array literal ... is unaffected" holds.
- **SkUserNum** (`object Value(data: RR64) extends Number` with its own `+`): `array[\Value\](3)` "is a vector: true" on the old code, "false" on the new; `a + a` fails on both, inside the library's `Vector` on the old code ("Failed to find any matching overload, args = (Value,Value)") and at the call on the new ("args = (PrimitiveArray[\Value,3\],PrimitiveArray[\Value,3\])"). A user type below `Number` joins `Number` and `AnyIntegral` among the element types that now get a plain array.
- **SkMap** (`IntMap`, each shape wrapped to print its value or its `KeyOverlap`), at 1 and at 4 threads, identical at both on each tree:

      old: a UPLUS b: value { 0 |-> 0, 1 |-> 1, 2 |-> 2, 3 |-> 3, 4 |-> 40, 5 |-> 50, 6 |-> 60 }
      new: a UPLUS b: IntMap.KeyOverlap: 3 |-> 3 and |-> 30
      old: BIG UPLUS overlap: value { 0 |-> 0, 1 |-> 1, 2 |-> 2 }
      new: BIG UPLUS overlap: IntMap.KeyOverlap: 0 |-> 0 and |-> 3
      old: same-value repeat expr: value { 1 |-> 7, 2 |-> 8 }
      new: same-value repeat expr: IntMap.KeyOverlap: 1 |-> 7 and |-> 7

  `UNION` in both orders, `UPLUS` on disjoint keys, the empty map's `UPLUS` and `BIG UPLUS` over disjoint maps are unchanged. `BIG UPLUS[\ZZ32\] [i <- 0#4] {[\ZZ32\] widen(i MOD 3) |-> i}`, a reduction and not a comprehension, now throws where it kept a value: a walk value that changes which no test asserts.
- **SkOpen** (`openAt[\I\](x: I) = openRange[\I\]()`): "CastError" at `Library/FortressLibrary.fss:36:13-27` via `:4077:23-58` on both trees; `openAt[\ZZ32\](z)` is a `ZZ32` open range on both. Present on the base, as the worker says.
- **The compiled path.** `fortress compile` refuses each program on both trees alike: SkMap "Comprehension is undefined." at `Library/IntMap.fsi:86:23-34` and `:90:25-36`, SkArr "Array is undefined.". The rung's code is walk's library only.
- **The cost of the eight arms.** SkAlloc, 20,000 iterations of `array[\RR64\](4).fill(1.0)` and then of `array[\ZZ32\](4).fill(1)`, run twice each, old and new alternating (`nproc` 4, Intel Xeon @ 2.10GHz, load 0.98 at start, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`):

      old: RR64 allocs ms: 1800  ZZ32 allocs ms: 1234
      new: RR64 allocs ms: 2165  ZZ32 allocs ms: 1308
      old: RR64 allocs ms: 1755  ZZ32 allocs ms: 1085
      new: RR64 allocs ms: 2515  ZZ32 allocs ms: 1251

  An `RR64` array, the last arm, costs about 18 to 38 microseconds more to make under walk (20 to 40 percent of this loop); `ZZ32`, the first, about 4 to 8. Not a defect of the specification; a measurement for whoever times microGPT under walk.

## 5. Corrections

- **`9d91a922d`: two tests carried more than one comment line** (`ProjectFortress/tests/IntMapComprehensionRepeatedKey.fss:17`, `:21` and `ProjectFortress/tests/IntMapUplusManyEntry.fss:16` at `b92180717`), where the skill's `tests-writing.md` gives a test one comment line. The in-body comments are removed; no assertion changes, and REPORT.md's citations of the two files' lines follow the shift. Through the harness on the head (`explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> ProjectFortress/tests/IntMapComprehensionRepeatedKey.fss ProjectFortress/tests/IntMapUplusManyEntry.fss`): `OK (2 tests)`. On the old code (`FORTRESS_HOME=/home/user/fortress-base15 /home/user/fortress-base15/explorations/compile-ladder/rung-inference-walk/harness-one.sh <scratch> <the two files>`):

      FAIL: a Boolean: false =/= a Boolean: true; a map comprehension whose key 0 repeats last with a different value throws KeyOverlap (comprehensions.tex, section "Comprehensions")
      FAIL: a Boolean: false =/= a Boolean: true; keys 2 to 7 UPLUS keys 0, 3, ..., 15 throws KeyOverlap on a shared key
      Tests run: 2,  Failures: 2,  Errors: 0

  Settled by the brief's check 5 ("the file carries at most one comment line") and `tests-writing.md`, "Names, comments, citations".
- **`0e383f368`: record.md asked the gather to append notes that the ledger refuses.** Row 364 is at 1,190 of its 1,200 characters and row 678's notes at 685 of their 700; on a copy of the ledger, `ledger.py note 364 <the record's note>` prints "row-length: 1588 characters; at most 1200" and `note 678` prints "notes-length: 914 characters; at most 700". Row 364's two consequences in the library, each with its gated expected failure, get rows of their own, NEW-L-2 (the factories at walk's run-time class, `XXXArrayInferredElementVectorWalk`) and NEW-L-3 (`openRange`'s `CastError`, `XXXOpenRangeInferredIndexWalk`), both passing `ledger.py check --rows` but for the placeholder number; row 678's line move needs no note. Settled by the row template's limits (`explorations/fortress-gap-ledger.md`, "The row template") and the skill's `records.md` ("A defect also gets its ledger row"). The record's two closes run clean on a copy of the ledger (`ledger.py close 685 ... --claim ... --class 'library bug (library)' --note ...`, `close 704 ... --note ...`: "row 685: FIXED by 787bf3588", "row 704: FIXED by 787bf3588").

Where I differ from the worker's account: REPORT.md sections 9 (decision 6) and 10 give the two expected failures "a note on row 364"; with the correction they have rows NEW-L-2 and NEW-L-3, siblings of 364. I left the worker's decisions as written.

## 6. Left for the gather

- **`additiveIdentity`'s doc comment is false now**: "the typecase over a %() -> T% witness that %array1% uses" (`Library/FortressLibrary.fss:3242-3243`); `array1` now uses a witness of its result type. A respelling on the same lines keeps every line number, for example "the typecase over a %() -> T% witness, the witness of its result type, as %array1% takes one of its own." The section confines the rung's edits of this file to `array1` and `array2`, so I did not make it.

## 7. Points to report the rung reaches

The worker's list stands, with these added or widened:

- A walk value that changes: besides `Number`, `AnyIntegral` and `Int`, an array built at a `T` walk infers from a `ZZ64` or `RR64` value, and at a user type that extends `Number`, is plain where it was a `Vector` (section 4).
- A walk value that changes, with no test: `BIG UPLUS` of `IntMap`s that share a key throws `KeyOverlap` where it kept a value; a map expression whose key repeats with the same value throws (section 4).
- Sentences made false: `additiveIdentity`'s doc comment (section 6), a library comment, not the specification.
- A site that comes or goes beyond row 685's four: none, by row (section 1).

## 8. The failure-mode question

- **Arrays.** Against the base, the rung turns a working but ill-formed `Vector` (at an abstract number type, a user number type, or walk's run-time class) into a plain array, a quiet value; the loud failure moves to the next vector operation ("Failed to find any matching overload", section 4). Against the probe's patch, it turns a `CastError` at walk's run-time class into that plain array. The specification gives a plain array for `array1[\Number,2\]()` and `array1[\Int,3\]()` (no `Vector` of either is well-formed), and a vector at an inferred `ZZ32`, which walk's inference misses (NEW-L-2).
- **`IntMap`.** The other way: a quiet kept value becomes a loud `KeyOverlap`, as the library's comment and, for a key repeated with a different value, the specification's map comprehension say.

## 9. For the curator

The worker's two questions stand (the vector and matrix sentences of "Array Expressions"; a key repeated with the same value). I add none.
