<!-- The FACTS clarity pass, chunk f15, 2026-10-22, second round: each entry's change of meaning, the source of each sentence and the questions left open, for F-159, F-229, F-162, F-163, F-165, F-166, F-167, F-168, F-169, F-170, F-171, F-172 and the entries split from F-166 (F-?1) and F-172 (F-?2). -->

# Chunk f15: proposals

The clean text of each entry is in `clean.txt` and `proposals.apply`, word for word. This file gives, for each entry, its change of meaning, its sources and its questions. The assessment's base is `main` at `8c99c2413`. The second round fixes every point of `check.md` and the cold reader's ambiguities.

## F-159

**Meaning:** narrowed to the measurement, as the assessment asks. The old title stated a probe result as a property of the library's array traits on both paths. The probes used their own trait, wrote the static argument, and ran the compiled side in the compiler's world, on 2026-09-29. The entry says so and names its kind of evidence. The second round corrects three points. Walk refused the plain factory beside the generic one at load; only F-27's later check was not run on that pair. The result-type witness belongs to `array1` and `array2` only, not to every factory. The `cast` wraps the branch's result, not the whole `typecase`. The entry does not claim that the probes' device throws at an inferred element type: nobody measured that.

**Sources:**
- Title, the store and the witness: `reviews/array-design-ways.md` sections 0 and 3.
- The probes: `WayANoCast.compile.txt` (the refusal), `WayACast.run.txt` and `.walk.txt` (the outputs "RR64 DStore 1.5" and "ZZ32 BStore 7"), `WayASpec.walk.txt` (walk's refusal of the pair), all at `84aef6a4f^`.
- F-27's check: landed at `8f7e183d4`, after the probes' base `6bc21c364`; the note's A2.
- `array1` and `array2`: F-229; `Library/FortressLibrary.fss:2247`, `:2284` (the others).
- Decision A: P-85.

## F-229

**Meaning:** unchanged. The long sentence is split into its three claims. The second round corrects three points. Walk's `Int` is `ZZ32`'s one listed type, not the type of every integer value, and row 721 is back on walk's plain array. The clause on the element witness was inverted: `() -> Int` matches the `ZZ32` branch. The distance stage reports and does not gate.

**Sources:**
- The factories: `compile-ladder/rung-library-factories/REPORT.md` sections 1, 3 and 4; `Library/FortressLibrary.fss:2582-2596`, `:2970-2983`.
- `Int`: `Library/FortressLibrary.fsi:532-534`; `FortressBuiltin.fsi:125`; rows 364 and 721.
- The element bound: F-151.
- The witness: the report's section 4; row 722.
- The distance stage: the coordinator skill's `references/batch.md:50`; `tools/distance/run.sh`, its header.

## F-162

**Meaning:** unchanged; two referents made plain. The check passed it.

**Sources:** `Specification/library/structure.tex:25-31`; `Specification/fortress/build.xml:128-156`; the skill's `references/specification.md:13`.

## F-163

**Meaning:** narrowed in two places. The title compares the two copies, which is what its evidence compares; the restart is named as a third text (P-25, F-166). The stub Appendix I is placed in the frozen copy. The second round names `2f8b4331a` as the team's commit, as the check offered.

**Sources:** `git diff --quiet 2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen`; `Specification-1.0-frozen/appendices/changes.tex` (16 lines); `Specification/appendices/changes.tex`; P-96; `Specification/fortress/fortress.tex:24-36`; `reviews/spec-change-form.md` sections 5 and 7.

## F-165

**Meaning:** restored to the source. The consolidated entry said that the `FTypeArrayList` fix stays and that `lineage.md` lists "the rest" for removal. `lineage.md`'s verdict lists the fix as removable too, replaced by `clean-ladder`'s two lines, as the earlier text said (`FACTS-history.md:1435`). The cleaner pass is PLAN's parked housekeeping.

**Sources:** `coordinator/lineage.md`, "The facts" and the verdict of "Verification against Pavol's recollection"; PLAN, "Off the path, parked"; the assessment's ancestry checks.

## F-166

**Meaning:** narrowed, and the paper split out to F-?1. The title covers the restart's topics, not types in general. The second round bounds "static parameters" and "traits", which the restart touches in part, and adds P-25 for which text governs.

**Sources:** `coordinator/spec-lineage.md` section 6 and its "Coordinator's check (2026-09-26)" (`types.tick:320-339`, `:353-376`); P-25; P-62.

**Pointer to repoint:** P-26 cites F-166 for the POPL 2019 paper; it should cite F-?1. P-25 cites F-166 for the restart and keeps the pointer. Both are outside this chunk.

## F-?1, new: the POPL 2019 paper's scope

**Meaning:** unchanged; split from F-166. The extract's wording is kept for the upper bound. The second limit is from the same extract. P-48's rule is now said in words.

**Sources:** `research/extracts/ParkPOPL2019-extract.md` sections 6 and 8 (pp. 11:3, 11:11, 11:19, 11:25); `reviews/decisions-review/popl-recheck.md`; P-48.

## F-167

**Meaning:** corrected to the source. The first round said that each refused example stands beside the library's shape. The subtrait of every instantiation has no shape: it stays as the counterexample that introduces the rule. The internal appendix's refused examples get a callout each. Row 414 has its example.

**Sources:** `compile-ladder/rung-spec-route-a/decision-record.md` sections 1 (item 2), 2, 3.3 to 3.8 and 4.2; `types-vals-vars.tex:242`; `traits.tex:381`; `trait-parameters.tex:397-398`, `:460-491`; rows 331, 406 and 414.

**Note:** P-97, the curator's decision, is worded as broadly as the old entry. This entry is a fact about the text, so it follows the text. P-97 is outside this chunk.

## F-168

**Meaning:** two corrections, from the first round.
- The sentence on the negative integer power was true when the rung landed. It is false since `5ad4a9957`. The corrected rule moved to F-172.
- "The chapters state P-78" was dropped. No number chapter names `SUM` or `PROD`, and the reductions callout is outside the number chapters.

The second round names the superseded chapter's callout and ℚ's four traits.

**Sources:** `compile-ladder/rung-spec-numbers/decision-record.md` section 3; `Specification/basic-lib/numbers.tex:27-56`, `:224-229`; `Specification/advanced-lib/numbers-advanced.tex:14`; `Library/FortressLibrary.fsi:395-396`; P-74, P-80; F-131.

## F-169

**Meaning:** narrowed, as the assessment asks. The second round corrects the first round's added sentence: the Working Draft did relate numerals to the number types, through the libraries' coercions. What it left undescribed is the numeral types' hierarchy, and it named no type that a library gives a numeral.

**Sources:** `reviews/numerics-plan-coordinator/evidence-B.md` sections 1.1, 1.2, 1.4 and 2; `Specification-1.0-frozen/basic/expressions/literals.tex:87-96`, `:132-148`; `Specification/basic/expressions/literals.tex:154-156`; P-76.

## F-170

**Meaning:** unchanged. "A range's ℤ32 components" is now the operands of an explicit range, since "component" is also a unit of Fortress code.

**Sources:** `Specification/basic/expressions/ranges.tex:42-58`, `:88-109`; row 485; F-114.

**Pointer to consider:** F-140 says that walk reads a size used as a value as a `ZZ32`, but not that an `NN32` binding then refuses it. If that consequence should stay in an entry, it belongs in F-140, with row 486. F-140 is outside this chunk.

## F-171

**Meaning:** unchanged. The second round adds the text's first exception, a trait with a `comprises` clause of its own, which the old entry also left out.

**Sources:** `Specification/basic/traits.tex:235-258` (`:247-255` the exceptions); `compile-ladder/rung-spec-comprises/decision-record.md` section 2; rows 407, 487, 489 and 490; F-121.

## F-172

**Meaning:** narrowed in one sentence. "A fixed-size result that the type cannot hold throws `IntegerOverflow`" is now the `GCD` and `LCM` rule, as the decision record's table gives it; the same chapter says that `narrow` and `LSHIFT` throw nothing. The old entry had the same broad sentence. The integer rules are said in words, and F-263's pointer says what it holds.

**Sources:** `compile-ladder/rung-spec-integer-rules/decision-record.md` section 2; `Specification/basic-lib/basic-integers.tex:39-62`, `:530-542`; `Specification/basic/operators/opr-overview.tex:262-268`; F-263.

## F-?2, new: the coercion example

**Meaning:** narrowed in one sentence. The first round called the walk test a gate of the example. It is row 394's reproducer of the example's shape, with each trait excluding both others, the spelling that decision 6 rejected. No gated test runs the printed example. Rejection and "no less specific" are defined here, since no other entry names them. The probe's renamed traits are said, so `S32Of` has a referent. Decision 6 is in section 4.

**Sources:** the decision record's section 4, decision 6, and its probes `probes/examples/SpecZZExcl.*` at `9269f7bd2^`; `Specification/basic/conversions-coercions.tex:500-516`, `:580` onward; row 394; `tests/CoercionMostSpecificRungC.fss:6-15`.

**Decision not taken:** keep the coercion example in F-172 rather than split it. The assessment allowed either. I split it, because the example changes apart from the integer rules.
