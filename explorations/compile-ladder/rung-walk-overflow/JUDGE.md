# Rung O (rung-walk-overflow): the judge's ruling

**Decision: stop. The count goes to Pavol, and no continuation is written.**

Everything below was read at the branch head `bd2106038`. Nothing was built or run for this ruling.

## 1. The ruling

- **The stop is the reserved one.**
  - Pavol's decision on row 379 asks for "the count of interpreter tests whose output changes measured first and brought to him if not zero" (`explorations/coordinator/POSITIONS.md:88`).
  - The batch record says the same, and says it binds a judge: "Not zero: the rung stops and reports; that decision is Pavol's (`POSITIONS.md:88`), not a judge's ... if a judge's continuation resumes it, it stops again on the same ground" (`explorations/coordinator/CLIMB-BATCH-4.md:145`).
  - The batch brief repeats it: "O's nonzero count is his and not a judge's."
  - So the decision is stop, and the instructions are empty.
- **This is not a silent specification.**
  - The specification settles row 379: "For integer results, overflow throws an `IntegerOverflow`" (`Specification/basic/operators/opr-overview.tex:154-155`, `:195-196`).
  - It gives code that means to wrap its own operators: ∔ and ∸ for addition and subtraction, and wraparound multiplication `\dottimes` (`:172-176`, `:205-209`). Those "do not overflow".
  - The open question is how much of the 2012 tree changes to follow the specification. That is the question `POSITIONS.md:88` reserved.
- **Both of the rung's stop conditions hold** (`CLIMB-BATCH-4.md:157`).
  - *The count is 11.* 9 of the 376 stable files changed (`count-compare.txt:96`). Two of the 17 unstable files, `HeapTest` and `QuickCheckTest`, went from exit 0 to exit 1 only with the edit (`count-compare.txt:9`, `:20`). The logging pass finds the same 11 files, and no other, meeting an overflow (`probes/overflow-probe-summary.txt:18`). Its exit codes equal base A's (`:19-20`).
  - *The fix needs other files.* It needs four library files and five test files outside `Int.java` and `Long.java`.

## 2. What was checked, by reading

- **The net change.** `git diff --stat 47437c65f...HEAD` shows 41 files, all under `explorations/compile-ladder/rung-walk-overflow/`. No source, library or test file differs from the base. The rename of row 379's test was made and undone (`218aea3dd`, `1225cff20`, `a68f137d9`), and `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss` is unchanged.
- **The library sites**, each at the cited line:
  - `Library/RangeInternals.fss:1031` and `:1201`, which were measured, and `:1046`, `:1221` and `:1242`, found by reading. These are `split-1` after `split = partitionL((lo BITXOR hi)+1)`.
  - `Library/Random.fss:235` (measured) and `:241` (by reading): `mult widen(state) + add`.
  - `Library/ChunkedSparseArray.fss:76`: `mask-1`.
  - `Library/IntMap.fss:676`: `(-p)`.
  - The native behind `partitionL` is `Integer.highestOneBit(u - 1)` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:212-216`).
- **The tests.**
  - `ProjectFortress/tests/intPrim.fss:21-22` and `longPrim.fss:21-22` assert `a.minimum - 1 = a.maximum` and `a.maximum + 1 = a.minimum`.
  - `HeapTest.fss:98` is `c1 n + c2` with `c1: ZZ32 = -761155213`.
  - `QuickCheckTest.fss:89-90` checks "associativity of `+` operator over `ZZ32` domain: should pass".
  - `ReflectiveQuickCheckTest.fss:16-17` has the same property.
- **The specification.** `opr-overview.tex:140-215` was read whole, and `Specification/basic/types-vals-vars.tex:500-525` as well. The integers chapter, `Specification/basic-lib/basic-integers.tex:13-60`, is about `ZZ`. Grepping all of `Specification/basic/` and `basic-lib/` finds no sentence on fixed-width wrapping except the two in `opr-overview.tex`.
- **The precedent.** `natives.patch` has the same text as batch 3.5's deliberate fix. That fix was shown to turn the expected failure red (`explorations/compile-ladder/climb-batch-3.5/repair/overflow-xxx-harness.txt:125-144`). `Int.overflow()` is at `Int.java:256-259`.
- **The tracked-path check** from the batch brief prints nothing.

## 3. The worker's claims: right and wrong

No skeptic ran before the stop, so there is no skeptic report to rule on.

**Right:**
- **The count and its method.** Three passes, the edit between two base passes, and a fourth pass that logs each overflow and still wraps. That fourth pass is what makes the 15 unstable files trustworthy. Going beyond the brief there was a good decision.
- **The attribution.** 8 of the 11 are library code relying on wrapping: `IntMapTest`, `QuickCheckTest`, `RandomTest`, `RangePrototype`, `ReflectiveQuickCheckTest`, `setSum`, `simpleSum` and `zeno`. The other 3 are the tests' own reliance: `HeapTest`, `intPrim` and `longPrim`. Two more depend on it but are hidden behind `Random.fss:235`: `QuickCheckTest.fss:90` and `ReflectiveQuickCheckTest.fss:17`.
- **Row 146.** Its shape reaches only `longPrim` (`probes/Row146Width.txt`, and the 32-bit first probe of `longPrim` in `probes/overflow-probe-summary.txt`).
- **Undoing the rename on the stop.** A plain test that fails today would turn the merged gate red. The `XXX` file remains row 379's correct gated check.
- **The reading that the specification settles every one of those bodies against wrapping,** because each uses `+`, `-`, unary `-` or multiplication where the specification throws.

**Wrong or incomplete:**
1. **Candidate (b)'s cost, "Nothing else moves" (`REPORT.md` section 8), leaves out the switch-over.**
   - The compiled path already throws on these operations (`explorations/coordinator/FACTS.md:76`; row 379 itself: "The compiled path throws `IntegerOverflow` for every one", `explorations/fortress-gap-ledger.md:390`).
   - At the switch-over the compiled path checks and compiles this same library, the interpreter's (`POSITIONS.md:46`; rows 381 and 383 close "when the compiled path reads this library", `:89-90`).
   - So under (b), `RangeInternals`, `Random`, `ChunkedSparseArray` and `IntMap` raise `IntegerOverflow` on the compiled path at the switch-over. Keeping `walk` wrapping postpones the library repair to then; it does not avoid it.
2. **The glyph.** The specification's wraparound multiplication is `\dottimes`, defined as a times sign with a dot above (`Specification/latex-common/macros/macros.tex:188`). That is ⨰, U+2A30, whose ASCII spelling is `DOTTIMES` (`ProjectFortress/src/com/sun/fortress/parser/Literal.rats:263`). It is not "⊙̇" as `REPORT.md` section 6 and `record.md` write it. ∔ is `DOTPLUS` (U+2214) and ∸ is `DOTMINUS` (U+2238) (`Literal.rats:270-271`).
3. **A precedent was missed for how code says "wrap" in this tree.** The team's 2011 flattened prelude declares a wrapping set and a saturating set on every integer type, with wrapping natives:
   - `ZZ` at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:524-538`, where the wrapping forms are plain arithmetic;
   - `ZZ64` at `:586-599`, `ZZ32` at `:671-684`, and `NN32` and `NN64` (row 348).

   The spellings there are reversed against the specification (row 348), but the shape is there: `jIntWrappingAdd`, `jLongWrappingMul` and so on, one operator per type beside the throwing one. This is the team's answer to the question candidate (a) raises, and it is what the one library would carry.
4. **The home of the library's reliance on wrapping.** Recording it in row 379's note was defensible, but it survives every candidate: by point 1 it becomes a compiled-path failure at the switch-over even if `walk` keeps wrapping. So it is a defect of the one library against `opr-overview.tex:154-155` and `:195-196` in its own right, and it should be its own ledger row. That row cannot be an expected-failure test: no observable output fails on either path today. Its measurement is `probes/overflow-probe-summary.txt`, and the 11 plain tests guard it. This is a recommendation for the fold (section 6), not a repair of the rung.
5. **Further sites by reading, for whoever repairs.** None of these was measured.
   - `Library/IntMap.fss:675`, `((mn-1) BITXOR mx)+1`: `mn-1` overflows when the smaller key is the `ZZ64` minimum.
   - In `RangeInternals.fss:1201`, `:1221` and `:1242`, `... - lo - 1` overflows in the middle of the computation when `lo` is the minimum and `mid` is 0, although the final value fits.

## 4. The fork for Pavol

**The question.** Row 379's fix, as decided on 09-24, turns 11 passing interpreter tests into uncaught `IntegerOverflow`s. The reason is that four library files and five of the team's 2012 tests wrap around on purpose. How should the code that means to wrap be changed, and may the five tests be edited? Editing them restates assertions and deletes none.

**(1) The specification's own spelling. Recommended.**
- *What happens.* Declare ∔, ∸ and ⨰ (`DOTPLUS`, `DOTMINUS`, `DOTTIMES`) in the one library, bound to wrapping natives, which are today's unchecked bodies under new names. Then change each site that means to wrap to use them:
  - `Random.fss:235` and `:241`, `ChunkedSparseArray.fss:76`, `IntMap.fss:675-676`, and the `RangeInternals.fss` splits;
  - `HeapTest.fss:98`, `QuickCheckTest.fss:90`, `ReflectiveQuickCheckTest.fss:17`, and `intPrim.fss:21-22` and `longPrim.fss:21-22`.

  Every such edit computes the same value as today, so the 11 tests print what they print today, and each test keeps its meaning: the hash stays a wrapping hash, and the associativity property is a true property of ∔. After that, rung O lands as decided, with its count re-measured.
- *What it costs.*
  - Two rungs in sequence. First a library rung that changes nothing observable: about 30 api and implementation lines in `Library/FortressLibrary.fsi` and `.fss`, six small native classes in `Int.java` and `Long.java`, about 15 expression edits in four library files, 9 lines in five test files, and one new gated test of the three operators. Then rung O itself.
  - It adds members to declared types of the prelude, which is a batch stop reserved to him.
  - `FortressLibrary` is rung K's file in this batch and the flattening's in the next (`CLIMB-BATCH-4.md:30`). So the library rung runs after K lands and not beside the flattening's edits of the same traits (batch rule 1).
  - It also gives `walk` the specification's spellings, which it lacks today (row 348's interpreter half).
- *The one sub-choice.* `RangeInternals`' split is generic over `I extends Integral[\I\]` (`RangeInternals.fss:1013`, `:1183`), so the operators must also be reachable from `trait Integral` (`Library/FortressLibrary.fsi:412-436`). There are two ways:
  - **(1b), recommended.** Declare them in `Integral` and on every integer type, as the 2011 prelude does: on `ZZ` they are plain arithmetic, and on `NN32` and `NN64` today's natives, which already wrap.
  - **(1a).** Declare them on `ZZ32` and `ZZ64` only, and rewrite the split so it cannot overflow. When the range straddles zero the boundary is zero. That needs a new derivation at five sites instead of a spelling change.

**(2) Rewrite the code so nothing overflows, with no new operators.**
- *What it costs.* No prelude change, and it can run beside rung K and the flattening. But:
  - the generic range split needs a fresh overflow-free derivation at five sites;
  - the random generator needs a split multiply or unbounded `ZZ`, which is slower for QuickCheck;
  - the five tests change meaning. `intPrim` and `longPrim` would assert the throw, duplicating row 379's own test. `HeapTest`'s hash values would change. The two associativity properties would be restricted to inputs that do not overflow.
  - `walk` still has no ∔, ∸ or ⨰.

**(3) Keep `walk` wrapping, the 09-24 decision reversed.**
- *What it costs.* Nothing moves now, and row 379 stays open with its expected failure. But `walk` keeps disagreeing with the specification and with the compiled path. By point 1 of section 3, the same library bodies throw on the compiled path at the switch-over, so the work of (1) or (2) comes back then, found on the compiled path instead.

**Also, for any of these.**
- After the natives raise, a `ZZ64` variable set from a small numeral holds a `ZZ32` under `walk` (row 146). Its arithmetic then throws at the 32-bit bound, where today it wraps there. Both answers are wrong against the specification.
- In the tests this reaches only `longPrim`. It goes away when the flattening's coercion widens such a variable (`CLIMB-BATCH-4.md:25`).
- It is not a reason to reorder: running the natives after the flattening only makes the effect disappear sooner.

## 5. If he takes (1b): what the two rungs do

This is for the coordinator's next briefs, not a continuation of this rung.

**The library rung** runs after rung K has landed, and not in the same batch as a rung that edits the `ZZ32`, `ZZ64` or `Integral` declarations.
1. Declare `DOTPLUS`, `DOTMINUS` and `DOTTIMES` with the shape `opr DOTPLUS(self, b:I): I`:
   - as abstract members of `trait Integral` in `Library/FortressLibrary.fsi:412-436`;
   - with bodies on the `ZZ32` and `ZZ64` traits of `Library/FortressLibrary.fss:646-773` and their api lines;
   - and on `NN64`, `NN32` and `ZZ`.

   They follow the layout of `+` in each trait. The spellings follow `opr-overview.tex:172-176` and `:205-209`, not the compiler prelude (row 348).
2. Add wrapping native classes beside today's in `Int.java` and `Long.java`, with today's bodies (`Int.java:104-120`, `Long.java:118-134`). Bind the new operators to them. Leave `+`, `-` and multiplication on the existing classes, unchanged in this rung.
3. Change the sites listed in section 4 (1), plus those of section 3 point 5, to the new operators. Each change must leave the value unchanged.
4. Add one gated test that checks the three operators wrap at the minimum and maximum of both widths, citing `opr-overview.tex:172-176` and `:205-209`.
5. Show that the rung changes nothing observable, in two measurements:
   - the 11 tests print what base A prints on the stock natives;
   - a logging pass over the 393 files with `probes/overflow-probe.patch` shows zero files meeting an overflow. Extend that pass to `ProjectFortress/demos/*.fss` and `explorations/microgpt*.fss`, which were not measured. By reading, microGPT uses the Java `random` native and nonnegative ranges.
6. Declare the checker count.

**Rung O again.** Apply `natives.patch`, turn `XXXFixedWidthOverflowRungB.fss` into the plain test as `CLIMB-BATCH-4.md` section O says, and re-measure the count. Step 5 of the library rung predicts zero. A nonzero count stops it again.

## 6. For the fold

- The branch changes nothing outside this directory, so the directory can be folded as the record of a stopped rung. The checker count is 103, unchanged.
- In `record.md`, before pasting:
  - replace "⊙̇" with "⨰ (`DOTTIMES`)";
  - add to row 379's note that candidate (b) only postpones the library repair to the switch-over (section 3, point 1).
- Open a new ledger row for the library's reliance on wrapping (section 3, point 4) instead of leaving it only in row 379's note. Its evidence is `probes/overflow-probe-summary.txt`; its sites are those of `REPORT.md` section 4 and section 3 point 5 here; its repair route waits on Pavol's answer. The row number is the coordinator's to assign.

## 7. Decisions taken here under a silent specification

These are reported to Pavol out of the loop.
- **Recommending (1b) over (1a).** The specification speaks of wraparound on "fixed-size integers" only (`opr-overview.tex:172-173`, `:205-206`). It says nothing about ∔ on the unbounded `ZZ`, and nothing about a generic interface carrying the operators. (1b) follows the team's 2011 prelude, which gives `ZZ` the operators as plain arithmetic (`CompilerBuiltin.fss:526-538`). The alternative is (1a): fewer prelude lines, and a hand-derived rewrite of the generic range split.
- **Recommending two rungs over one.** The library rung is shown to change nothing observable before the natives change, so rung O lands in exactly the shape Pavol decided. The alternative is one combined rung, which is cheaper by one worker but changes the scope he approved for O.

*At the gather of climb batch 4: the `FACTS.md` line numbers cited in this file are those of the base `47437c65f`; rung N's three bullets, landed first, moved the entry on the compiled path's integer rules from `:76` to `:79`.*
