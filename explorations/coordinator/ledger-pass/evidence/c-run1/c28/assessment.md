# Chunk c28 assessment (run c-run1, base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read `Library/FortressLibrary.fsi` and `.fss` at the cited declarations (unchanged between the base and HEAD: `git diff --stat c124c6b65 HEAD -- Library` is empty), PLAN L.worker.1, FACTS F-20, F-151, F-154, `explorations/apl/rung-6/w01_dot.fss`, `ProjectFortress/tests/RangeSubscriptPositions.fss`, walk's `EvalType.forMatrixType` and `FTypeMatrix`, the checker's `TypeNormalizer.forMatrixTypeOnly`, and `git blame` of `fsi:1645`, `:1757`, `:1824-1834`.

## 24: measure
- scope pass; present meaning FAIL: the claim says `T^n` "denotes the Number-only library Vector/Matrix", but walk turns `T^n` into its own `FTypeMatrix` (`interpreter/evaluator/EvalType.java:594-601`), not the library's traits, and the checker desugars only a two-extent `T^(n BY m)` to `Matrix` (`compiler/typechecker/TypeNormalizer.java:144-160`); evidence FAIL: the probe is gone and no run is on record beyond the one message; comprehension FAIL: no mechanism; ownership pass; consistency pass (FACTS.md:230 agrees).
- Only a run says what a `T^n` parameter accepts: `questions.md`.

## 721: rewrite
- scope, present meaning pass; evidence pass (`XXX` test, gate a12ab5c60 holds); comprehension FAIL: pins "`:2455`, `:2834` at 787bf3588", a commit not in the base's history, and the lines moved (now `fss:2597-2608`, `:2984-2995`, typecase of `array1` and `array2`); ownership pass; consistency pass (FACTS.md:237). Notes FAIL also on "The base gave an ill-formed `Vector[\Int,3\]` whose `+` ran.", a story of the old code.
- Dropped: that sentence; home: the history. Added sibling 729, which names this row.

## 674: rewrite
- scope, present meaning, evidence pass (plain gated test asserts today's `(5#3)[0#2]`); comprehension FAIL: pins moved (advice now `fsi:1336`, `fss:2022`; the narrowToRange uses now `fss:2398`, `:2456`, `:2691`, `:3117`, `:3799`; the old `:1405` etc. hold other text); notes FAIL: "Rung G's `SimpleIndexValuePairs` followed the advice ... the skeptic's fix narrows with `narrowToRange` (`compile-ladder/rung-generator-size/SKEPTIC.md`)" is a repair story; ownership, consistency pass.
- Dropped: the rung G and skeptic story and the SKEPTIC.md pointer; home: the history. Kept the fact that `SimpleIndexValuePairs` narrows (pinned `:3799`) and added the workaround. Silent: `silent.txt`.

## 53: measure
- scope pass; present meaning FAIL: "The top-level operators carry `[\T extends Number\]`" and "`Vector.dot` is a `SUM` ... and dies at `cast[\Number\]`" are false now: the bound is `T extends { Number, MultiplicativeRing[\T\] }` on `Vector`, `Matrix` and every operator (`fsi:1645`, `:1757`, `:1686-1812`, by 749ec523e, F-151), and `dot` is `SUM[\T\]` (`fss:2555-2556`); evidence FAIL: the probe is gone and was measured before the bound changed; comprehension FAIL: pins moved; ownership pass; consistency: F-151 implies the trait itself now refuses a non-`Number` element, which the claim does not say.
- Which operations still run on a user ring element is a run's question: `questions.md`.

## 54: rewrite
- scope, present meaning pass (views still extend only `Array1`/`Array2`: `fss:2506`, `:2811`, `:2833`, `:2844`); evidence pass (probe gone, its old path and output in the notes); comprehension FAIL: no pinned mechanism; ownership, consistency pass.
- Added the pins; dropped nothing.

## 56: rewrite
- scope, present meaning pass (blocks still commented out); evidence as 54; comprehension FAIL: pins `:2544-2560`, `:2563-2569` now hold other text; the blocks are at `fss:2701-2717`, `:2720-2722`, `:2724-2726` in `Array2` (`:2653`); ownership, consistency pass.
- Repinned, and named the live `m[:, j]`, `m[i, :]` forms (`:2719`, `:2723`); dropped nothing.

## 109: rewrite
- scope, present meaning pass (`Matrix`, `fsi:1757-1770`, has no `pmul`; `Vector.pmul` at `:1652`); evidence as 54; comprehension FAIL: pins `:1720-1731`, `:1609` moved; ownership pass; consistency pass (FACTS.md:230).
- Repinned, `siblings: 293` first. Dropped "a design gap rather than a broken promise" (a judgement; the silent question is item 265's: `silent.txt`); the fact that the overview promises no Hadamard product stays.

## 169: rewrite
- scope, present meaning pass (no `_[_,_]:=` with an index and a range: the assignments are `fss:2127`, `:2226`, `:2228`, `:2689`, `:3115`); evidence as 54; comprehension FAIL: pins `:1983`, `:2081`, `:2083`, `:2532`, `:2544-2560`, `:2563-2569` all moved; ownership, consistency pass.
- Repinned; dropped nothing.

## 254: measure
- scope pass; present meaning: plausibly holds (F-20, F-154 restate it), but evidence FAIL: the reproducer `explorations/apl/rung-6/w01_dot.fss` stops at load in the evidence's run ("Could not find an implementation for API AplCore"), the mismatch case in it is only a comment (`w01_dot.fss:30-36`), and the cited outputs are gone; comprehension FAIL: pins `fsi:1650-1651`, `:1754-1773`, `:1610` moved (now `:1686-1701`, `:1786-1812`, `dot` at `:1653`); ownership pass; consistency pass.
- A run of the mismatch is needed before the line can name a reproducer: `questions.md`, which gives the line for each outcome. Silent: `silent.txt`.

## 292: rewrite
- scope, present meaning pass (`Array3` at `fsi:1824-1834` excludes `AnyAdditiveGroup`, extends nothing algebraic); evidence as 54; comprehension FAIL: pin `:1794-1804` now holds the matrix products; ownership, consistency pass (FACTS.md:230).
- Repinned, naming the declaration's comment that gives the trade; probe paths written whole. Dropped, for the notes limit: Jan's margin note `two or more -- Jan: I continue to disbelieve` (home: the spec citation, `aggregate.tex:153`, and the history) and "unary `-`" from `AdditiveGroup`'s list (home: `fsi:1650`, `:1762`).

## 293: rewrite
- scope pass; present meaning pass; evidence as 54; comprehension FAIL: exclusion pins `fsi:1602-1604`, `:1720-1722` moved to `:1647`, `:1759`; ownership: the walk half (unchecked `excludes`, dead `+`) is row 371's defect, written to `pairs.txt`; consistency pass.
- Repinned; probe paths written whole; the unchecked exclusion now points to row 371; "compiled checker" shortened to "checker" and the instantiation clause condensed, for the notes limit. Nothing dropped.

## 729: rewrite
- scope pass; present meaning pass (CONTESTED, PLAN L.worker.1 unsettled, so the status stays); evidence pass (plain gated test pins today's plain array); comprehension FAIL: pins `fsi:1613`, `fss:2572-2586`, `:2953-2965` moved (now `fsi:1645`, `:1757`; `fss:2597-2608`, `:2984-2995`); notes FAIL: "Since a0f839ad7 ... the base built an ill-formed `Vector[\Number,2\]`" tells the change; ownership, consistency pass (FACTS.md:237, F-151).
- Dropped: the base's ill-formed vector; home: the history. Stated the `else` branch instead.

## Duplicates, closes
None in this chunk. 109 and 293 are siblings (cause and effect), both kept. No `XXX` test would now pass.

## mech.py
Last line: `MECH: 9 lines, 0 failing, every check passes.`
