# Rung G of climb batch 13: the skeptic's verdict

Rung `rung-generator-size`, branch `wip/rung-generator-size`, base `a1a75716a`. The worker left the head `9a89985af`. The skeptic's commits: the worker's report from the run's journal `889c4a9a8`; the fix `a61ecbc55`; the corrections `218048958`, `8e5ee323f`, `fc4e8e6ad` and `a5fcb174a`; this file last.

Verdict: **contested**. The rung is right with one fix, and that fix is contested because it changes an answer walk gives, a point to report (section 4).

## 1. What was checked

- **The stage as the test.** `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt tmp/rung-generator-size/distance-postedit.txt` prints `DISTANCE DOWN   153 -> 143 (-10)` and `unit component FortressLibrary    143 -> 133    (-10)`, as REPORT section 3 says. `diff` of batch 12's `checker-count.txt` with the worker's `checker-count-postedit.txt` prints nothing. In the worker's `dist-post/errors.tsv` no site names `|_|`, `size`, `Indexed[\(I`, the new object (`fss:3624-3637`), the new `cond` (`fss:4670-4687`) or `fsi:1288`. The export error's 44 declarations are the same set before and after, read from the worker's `exp-before.txt` and `exp-after.txt` with the positions masked and the parts sorted. The nine rows of the per-site list (`explorations/compile-ladder/gate/distance-sites.tsv:81-85`, `:94`, `:108`, `:132`, `:133`) are gone, and the tenth, `:131` (`BIG LEXICO`, row 488), is within the checker's run-to-run variation. The worker ran the count at 19:24:54Z and the distance from 19:27:53Z. Its last library edit was at 19:22:32Z.
- **Test first.** This is read in the worker's transcript, by call id.
  - `9gSSZe`, at 19:20:12Z, is a harness run on `a1a75716a` with `git status --porcelain Library` empty. It prints `GeneratorSize.fss:28:12-19: Failed to find any matching overload, args = (SimpleFilterGenerator[\ZZ32\])`, `FAIL: Index of dimension 1 out of bounds; got 2 which is not in 5#4` and `Tests run: 3,  Failures: 3`. The first library edit came later, at 19:21:40Z (`srUtCi`).
  - `TVm6WD`, at 19:21:02Z, is `IndexValuePairsDefault` after its own syntax error was fixed, with the passing-before half of `GeneratorSize`: `OK (2 tests)`.
  - `LDk9ZZ`, at 19:22:38Z, is after the last edit (19:22:32Z): `OK (3 tests)`. The library was committed unchanged at 19:49:37Z as `af2127f5d`.
  - The interpreter suite, `ant testSystem`, started at 19:49:30Z on that code (`6ca5q2`, `xuFuvf`): `BUILD SUCCESSFUL`, `Total time: 2 minutes 25 seconds`.
- **The diff, line by line.** Each line was read against the section and the judgement (`explorations/reviews/generator-size-judgement.md`, section 4).
  - The api line and its comment follow `opr IN`'s.
  - The default's body is the section's, word for word.
  - `cond` is one `generate` with a `MapReduceReduction` over `(Boolean, Maybe[\E\], Maybe[\E\])`. Its join is associative, and `(true, Nothing, Nothing)` is its identity on both sides.
  - The new object takes its `bounds`, `indices` and `|self|` from `g`, with `opr[i] = (i, g[i])`, as the section says.
  - The worker's change from the section's example `opr[r] = SimpleIndexValuePairs(g[r])` is right for bounds that start at 0. The section's form would give a slice of `"abcd"`'s pairs the elements `(0,b),(1,c)`, which are not pairs of `"abcd"`. The api says a range subscript's results are 0-based and are the elements at the narrowed indices (`Library/FortressLibrary.fsi:1292-1301`). For a value whose bounds start above 0, the worker's form was wrong: see section 3, finding 1.
- **The precedents.**
  - `opr IN` is at `fss:1238` and `fsi:826-828` at the base.
  - Generator2's fused relational reduction is at `Library/Generator2.fss:207-229`.
  - `StringJoinReduction.join` is at `fss:4290-4300` at the base.
  - `SimpleMappedIndexed` is at `fss:3600-3618`.
  - All four were opened at the base, and each says what the report says.
  - The device the worker kept from the api, `(bounds())[r]`, is not what the library does: its range subscripts narrow with `narrowToRange` (`Library/FortressLibrary.fss:1405`, `:2257`, `:2537`, `:2948`, `:4211`). This is section 3, finding 1.
- **The report's provenance lines.** Each cited line was opened with `sed -n` at the base or at the head, as cited. Each says what it is cited for.
- **The specification.** `grep -rn -i generator Specification --include=*.tex | grep -i 'size\||self|\|count'` finds only `changes.tex:1222`, which is about `BlockedRange`, and `defining-generators.tex:301`, a heading. No sentence is made false.
- **Competing declarations.** `SimpleIndexValuePairs` is declared once, in `Library/FortressLibrary.fss`, searched over `.fss`, `.fsi`, `.java` and `.scala` of the whole tree. The test types that declare their own `opr |self|` on a `Generator` keep their verdicts (`naiveSeq`, `treeTest`, `setMakerTest0`, `spuriousSelf`; run below).
- **The ledger.** `ledger.py find` was run for "if Boolean", "Condition if", "relational", "indexValuePairs", "generator size", "narrowToRange", "positional" and "range subscript". No row but 629 is about the rung's sites. No row holds row 673 or row 674.
- **The tests' form.** `RelationalPredicateTargets` and `IndexValuePairsDefault` carry one comment line. `GeneratorSize` carried four, so three were removed (`8e5ee323f`). No message cites the specification.

## 2. The differential: the skeptic's programs

The programs are under `tmp/rung-generator-size/skeptic/`. Walk on the new code is `bin/fortress P.fss` in this tree. Walk on the old code is `/home/user/fortress-base13/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base13 /home/user/fortress-gensize/tmp/old-caches P.fss`. Each case of `SkSizes`, `SkRel` and `SkPairs` ran on the old code as a program of its own (`cases/`, `cases2/`), because a stop under walk ends the program.

- **`SkSizes`** computes `|·|` of 25 values. On the new code all 25 answer, and they agree at one thread and at four (`sizes-new.txt`, `sizes-new-t4.txt`). The answers include `sevens filter: 143`, `cross filter x range: 286`, `Up(17): 17` and `Holey pairs: 4`. On the old code, 13 stop. One example is `SkSizesC06`: `ProgramError: .../FortressLibrary.fss:3720:25-33`. The other 12 answer the same as on the new code (`set: 3`, `string: 5`, `array2: 12`, `zip: 2`).
- **`SkRel`** applies relational predicates to 20 targets. The answers agree at one and four threads (`diff rel-new-t1.txt rel-new-t4.txt` prints nothing).
  - On the old code, four targets stop: a filter (`:4654`), a 2-D array (`SkRelC16`: `FortressLibrary.fss:4658:78-82`, `Failed to find any matching overload, args = (5: ZZ32)`), a mapped map, and a list of generators.
  - One answer changes: `SkRelC07` prints `inc reversed range: holds` on the old code and `inc reversed range: fails` on the new.
  - The other 15 agree. Among them are arrays of 600 with the break at the first, middle and last pair, a predicate of two relations joined with `AND` in a program's own object, and comprehension filters.
- **`SkGG`** runs Generator2's `inits`, `tails` and `segs` of an array, of a list and of a filter, filtered by two relational predicates. The old code and the new give the same six lines, for example `segs array: 16600 640 148 13`, at one and four threads.
- **`SkPairs`** has 39 cases over default index-value pairs, comparing the old code with the worker's head.
  - These are the same: every slice of `"abcd"`'s pairs (`p[1:]`, `p[#2]`, `p[:1]`, `p[1#2]` printed `mapped((1,b),(2,c))`, `p[1#2][1]`), `p.map`, `p.ivmap`, `p.indexOf`, `toArray`, the pairs of pairs, and a 302-character string's pairs and slice.
  - These changed: `p` printed, which the worker listed, and `p.reverse[0]` and `|p.filter(...)|`, which stopped and now answer, added to REPORT section 6 by the skeptic.
  - These changed and are not listed: the pairs of `Shifted`, an `Indexed` whose bounds are `5#3`. `shifted bounds: [0,1,2]` became `[5,6,7]`. `shifted q[0]: (5,50)` became `(0,0)`. `shifted indexOf: Just(1)` became `Just(6)`. `q[5]` stopped with `IndexOutOfBounds` and now answers `(5,50)`. `q[5#2]` stops on both, with `[5,6] right outside bounds [0,1,2]`.
- **`SkRange`** shows what the library itself does with an array indexed from 5. `a pairs bounds: [0,1,2]` and `a pairs [0]: (5,50)`: `ReadableArray`'s own pairs are positional. `a[5#2]: [0#2][ 50 60 ]`: its range subscript takes indices. `(5#3)[0]: 5`.
- **`nr/NR01`-`NR12`** compare `narrowToRange` with a range's subscript.
  - For bounds `0#4` the two agree on every range tried: `2#5` (both `[2,3,4,5,6] right outside bounds [0,1,2,3]`), `1:` (`[1,2,3]`), `#2` and `:1` (`[0,1]`), `0:3:2` (`[0,2]`) and `4#0` (`[]`).
  - For bounds `5#3` they differ: `(5#3).narrowToRange(5#2)` is `[5,6]`, while `(5#3)[5#2]` stops.
- **`ifp/IF01`-`IF05`**: walk takes the `else` branch silently for `if 3 then` and `if "s" then`. It stops with `If clause did not return boolean` for `()`, a tuple and a function.
- **The compiled path.** `comp/SkComp.fss` was compiled and run with the old code and with this tree. The compiled path links its own library, which the rung does not touch. `|0#5|` is refused the same way on both (`ZZ32->ZZ32 is not applicable to an argument of type Range.`). With that line replaced, both print `size of 0#5:  5` and `sum:  10`.
- **Threads.** The rung's diff has no mutable variable, field or `atomic` block. `SkSizes`, `SkRel` and `SkGG` were still run at one thread and at four, with the same output.

## 3. Findings

1. **A defect of the change: the default pairs' range subscript read positions while their bounds are the value's own.** For a value indexed from 5, `pairs.bounds` is `[5,6,7]` and `pairs[6]` is `(6,60)`. Yet `pairs[6#2]` stopped with `[6,7] right outside bounds [0,1,2]`, and `pairs[0#2]` answered `(5,50),(6,60)`. The cause is `self.g.bounds[r]`: a range subscripted by a range reads positions counted from 0 (row 674). The fix is in section 4.
2. **A changed answer the report did not list: `cond` on a reversed indexed value.** The base read `x[0]` to `x[n-1]`, and `SimpleReversedIndexed` keeps each index's element (`r[0]: 0`) while generating in reverse (`9,8,...,0`). So `increasing((0#10).reverse)` held on the base, and fails now. The new answer follows the natural order, as Generator2's fused relational path does (`Library/Generator2.fss:207-229`), and as `RelationalPredicateTargets`' comment line states. A correction asserts it: `218048958`.
3. **A changed answer the report did not list: the default pairs of a value indexed above 0.** They are now indexed as the value is: `bounds`, `pairs[i]` and `indexOf`, before and after in section 2. This follows the section's "`opr[i] = (i, g[i])` ... bounds ... from `g`". `ReadableArray`'s own pairs stay positional (`Library/FortressLibrary.fss:2004-2005`; `SkRange`), so the library now has two conventions for this getter. That is a question for the curator. No library type reaches the default with such bounds: the arrays declare their own pairs, and strings, zips and the reflection types start at 0.
4. **The report's point 1 was false.** It said "No element and no answer that walk gave changes". It is corrected in `a5fcb174a`, together with section 6, section 1.3 and section 10.
5. **Row 673 had no home.** The specification settles it ("Otherwise, the generator clause must be an expression of type Boolean", `Specification/basic/expressions/if.tex`, section "If Expressions"), so its home is an `XXX` test. The skeptic wrote `XXXIfClauseObjectWalk` (`fc4e8e6ad`).
6. **Row 674, a new row.** The api's advice for writing a range subscript, `(bounds())[r]` "in order to narrow and bounds check the range r" (`Library/FortressLibrary.fsi:1292-1301`), reads `r` as positions when the bounds start above 0. The arrays, `String` and `Condition` narrow with `narrowToRange`. Its home 3 is `RangeSubscriptPositions`, which asserts today's behaviour. The row is in `record.md`.
7. **`GeneratorSize` carried four comment lines.** Three were removed (`8e5ee323f`).
8. **A failure mode, reported.** Where `|g|` stopped walk at once on a generator with no size, it now counts by running the generator. On an endless generator it never returns, and a consumable one is consumed. The judgement names this (section 4, "Which walk values change"), and so does the report (section 6). No specification sentence speaks of it.

## 4. The fix, and why it is contested

**`a61ecbc55`, "Skeptic's fix: the default index-value pairs narrow a range subscript by index".** `SimpleIndexValuePairs.opr[r]` changes from `self.g.bounds[r].map(...)` to `self.g.bounds.narrowToRange(r).map(...)` (`Library/FortressLibrary.fss:3631-3632`). It types: the component's `FullRange` declares `narrowToRange(other: Range[\I\]): FullRange[\I\]` (`fss:3985`), a `FullRange` is an `Indexed[\I,I\]`, and its `map` answers `Indexed[\(I,E),I\]`.

The test is `IndexValuePairsDefault`'s four new assertions on `FromFive`, a value indexed from 5. They were run through `explorations/compile-ladder/rung-inference-walk/harness-one.sh`:

- On the worker's head's code, at 21:05:14Z (`tree 889c4a9a8`, library unedited), the run printed `[6,7] right outside bounds [0,1,2]` and `Tests run: 4,  Failures: 1`. `q`, `q.bounds` and `q[6]` passed and `q[6#2]` failed.
- On the base, with the base build's `harness-one.sh` and `FORTRESS_HOME=/home/user/fortress-base13`, at 21:05:41Z, the run printed `FAIL: J7/0:[0,1,2] =/= J7/0:[5,6,7]; the pairs of a value indexed from 5 have its bounds`.
- After the fix, at 21:07:09Z, the run printed `OK (4 tests)`, over `GeneratorSize`, `RelationalPredicateTargets`, `IndexValuePairsDefault` and `XXXIfClauseObjectWalk`.

The fix's other runs:

- **The kept tests.** At 21:07:47Z, 34 tests ran: the worker's 29 kept-verdict tests and `CovCollTest`, `TransactionalArrayShakedown`, `naiveSeq`, `treeTest` and `setMakerTest0`. The run printed `OK (34 tests)`.
- **The slices.** The 0-based slices of `SkPairs` print the same on the old code, on the worker's head and after the fix (`cases2/*.old`, `*.new`, `*.fix`), for example `p[1#2] printed: mapped((1,b),(2,c))`.
- **The whole suite.** None was run. The fix edits the library, not the Java or Scala of the checker, of walk or of a shared phase (`tests-running.md`, "When to run a whole suite"). The interpreter suite runs in the gate.
- **The count and the distance.** Neither was run after the fix, as the brief says. The tables of REPORT section 3 are those of the worker's head, `af2127f5d`'s code. The gate's tables on the merged tree are the record. Whether the checker types the new line is measured there.

**Why it is contested.** The fix changes two answers walk gives, for a value indexed from 5: `pairs[5#2]` stopped on the base and on the worker's head, and now answers. `pairs[0#2]` answered `(5,50),(6,60)` on the base and on the worker's head (`SkFiveLow`, old code: `shifted q[0#2]: (5,50),(6,60),`), and now stops with `[0,1] left outside bounds [5,6,7]`. That is a point to report, and the brief marks a fix that reaches one as contested.

- **The worker's argument** (REPORT decision 1, `Library/FortressLibrary.fss:3631-3632`) is that the pairs' range subscript "maps the narrowed bounds, `self.g.bounds[r].map(...)`", keeping each pair's index as the base's mapped range did. It cites the api's own way, "`(bounds())[r]`" (`Library/FortressLibrary.fsi:1291-1297` at the base).
- **The skeptic's argument.** The rung made the pairs' bounds and single subscript the value's own: `bounds` from `g`, and `opr[i] = (i, g[i])`, as in the section. The api says that a range subscript narrows and bounds-checks `r` against `bounds()` (`fsi:1292-1301`). For bounds `5#3`, `(bounds())[r]` checks `r` against the positions `[0,1,2]` instead, so the pairs refused a range inside their own bounds and accepted one outside them. `narrowToRange` is what the library's range subscripts call (`fss:1405`, `:2257`, `:2537`, `:2948`, `:4211`). For bounds that start at 0 every slice is unchanged, measured in section 2. The worker's decision considered only bounds that start at 0.

## 5. The corrections, each settled

| commit | what | settled by |
|---|---|---|
| `218048958` | `RelationalPredicateTargets` asserts `increasing((0#4).reverse)` is `fails`. Its failing run on the base, 21:05:41Z: `FAIL: J5/0:holds =/= J5/0:fails; the range 0#4 reversed generates 3, 2, 1, 0, which is not increasing`; passing on the head, 21:07:09Z, `OK (4 tests)` | the section: `cond` "becomes one generate ... in the shape of `Library/Generator2.fss:207-229`", which reads the natural order; the test's comment line |
| `8e5ee323f` | `GeneratorSize`'s three extra comment lines removed; its assertions unchanged, `OK` at 21:07:09Z | `tests-writing.md`, "Names, comments, citations": "Give it one comment line that says what it checks" |
| `fc4e8e6ad` | `XXXIfClauseObjectWalk` with `load_exception_contains=If clause did not return boolean`. Green as an expected failure on the base (21:05:41Z) and on the head (21:07:09Z): `Saw expected failure: loaded and ran, not refused at load`. Red with `O` changed to `()` for one run, 21:06:10Z: `Refused at load as its keys name`, `Tests run: 1,  Failures: 1`; restored | `Specification/basic/expressions/if.tex`, section "If Expressions": "Otherwise, the generator clause must be an expression of type Boolean." |
| `fc4e8e6ad` | `RangeSubscriptPositions`, row 674's home 3, asserting today's behaviour: `OK (1 test)` on the head (21:11:17Z) and on the base (21:11:37Z) | `tests-writing.md`, "How a defect is recorded", home 3 |
| `fc4e8e6ad` | `record.md`: the FACTS entry, row 629's note and the revival-change entry name the two changed answers; row 673's reproducer is its test, and its notes say which values stop walk; row 674 added; the handover line | the measurements of section 2 |
| `a5fcb174a` | REPORT sections 1.3, 6, 8 (point 1), 10 and 12, marked "Skeptic's correction" | the same |

## 6. Where the skeptic differs from the worker's account

- Decision 1 is right for bounds that start at 0, and wrong for bounds that start above 0. The fix is in section 4.
- Decision 8: the brief's three test files did not bar the home that row 673 needs. The skeptic wrote it.
- REPORT section 8, point 1, said no answer changes. Two do (section 3, findings 2 and 3).
