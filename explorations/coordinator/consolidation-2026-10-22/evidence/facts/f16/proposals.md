<!-- The FACTS clarity pass, chunk f16, 2026-10-22: each entry's change of meaning, the source of each sentence and the questions left open, for F-173, F-174, F-175, F-176, F-223, F-180, F-181, F-182, F-183 and the entry split from F-175 (F-?1). -->

# Chunk f16: proposals

The clean text of each entry is in `clean.txt` and `proposals.apply`, word for word. This file gives, for each entry, its change of meaning, its sources and its questions. The assessment's base is `main` at `8c99c2413`.

## F-173

**Meaning:** widened to the evidence. The old text said that the checker departs "only" at row 442. The chapter's callouts name a second compiled departure: an unwritten bound is `Object` on the compiled path (row 412; P-42). The bare list of walk's rows read as complete, but the callouts name more. It is now one example and a pointer to the callouts. The route moved, because `rung-spec-inference/decision-record.md` section 3.1 states the rule that the bound rule replaced.

**Sources:**
- Title, sentences 1 to 3: `Specification/basic/inference.tex:47-124` (`:77-98` for the parameter that is a parameter's whole type, `:99-118` for the unfixed one); `compile-ladder/rung-instance-bound/REPORT.md`.
- Sentence 4: `inference.tex:37-40`, `:356-363`; rows 442 and 412; P-42.
- Sentence 5: `inference.tex:292-295`, `:402-425`; row 587.
- Gates: the old text; the tests exist.

**Question for the curator:** none. The assessment notes that `compiler_tests/InferLoneUnbounded.fss` writes `T extends Any`, so no plain test shows the unwritten bound on the compiled path. Row 412 records that path's behaviour.

## F-174

**Meaning:** corrected to the current Appendix I. Row 159 is fixed and no longer named there. Rows 779 and 780 are named and were missing. The naked-`Any` rule and the positional restriction are now said in words.

**Sources:**
- Sentences 1 and 2: `Specification/advanced/overloading.tex:531-674`.
- Sentence 3 (the compiled restriction): `overloading.tex:644-652`.
- Sentence 4 (written `Any`): `overloading.tex:134-150`; row 534's cell.
- Sentences 5 and 6: `Specification/appendices/changes.tex:2856-2879`; each row's cell.

## F-175

**Meaning:** unchanged; split. F-175 keeps the reading of `comprises` at the level of values, which P-60's "Built: F-175" names, so P-60 needs no change. The dispatched instance (P-48) is now F-?1. Each of the five rows has its subject.

**Sources:**
- Title, sentences 1 and 2: `changes.tex:3185-3240`.
- Sentence 3: `changes.tex:1605`, `:3454-3459`, `:3535` (the assessment's reading); the cells of rows 487, 540, 543, 546 and 547.

## F-?1, new: the dispatched instance

**Meaning:** unchanged; split from F-175. The rule's bound and the second example are said from rows 538 and 496.

**Sources:** `Specification/basic/overloading.tex:312-332` (the rule) and `:333-349` (the callout); rows 538 and 496, their cells.

## F-176

**Meaning:** unchanged; the title corrected in its terms. A size is a static argument, not a type. The text says that two size arguments written alike, once numerals are computed, are identical, and so the two types are identical. The forms now cite the grammar. The walk sentence is now scoped to inference at a call, and its evidence is named.

**Sources:**
- Title, sentences 3 and 4: `Specification/basic/types-vals-vars.tex:49-62`.
- Sentence 2: `Specification/appendices/grammars/concrete-syntax.tex:533-547`.
- Sentence 6: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java:126-147` (the assessment's reading); row 767's cell.

## F-223

**Meaning:** widened by one exception, which F-252 and row 759 already state: the checker accepts `g[\T\](a: T)` beside `g(a: Any)`. Walk's half is left to F-252 and F-257, which own it and gate it with the same tests.

**Sources:**
- Title and sentences 1 and 2: `Specification/advanced/overloading.tex:547-549`, `:561-569`; `OverloadingChecker.scala:458-471`.
- Sentence 3: rows 584 and 726.
- Sentence 4: row 759's cell ("with a bound below `Any` such a pair is refused").
- Gates: the five `compiler_tests/XXXNoDuplicatesRule*` refusals and the operator test, which the assessment found with the quoted messages.

**Pointer note:** chunk f14 proposes to split F-252, with equal declared domains in a new entry. F-223's pointer to F-252 stays right, since F-252 then points to that entry. The coordinator may repoint it to the new entry instead.

## F-180

**Meaning:** unchanged. The two halves of P-58's way are named, and the compiled half's source is restored. "Compiled-world types" is said with two examples and the count, 6 + 13 + 17 + 14 = 50 (`natives-shape.md`, "Limits, by reading"). The raise finding now says that the probe's fifth patch fixes it.

**Sources:**
- Title, sentence 1: `perf-probes/prelude/natives-shape.md` section 1, "The answers" and "What each gap does to it".
- Sentences 2 and 3: P-58; `natives-shape.md`, "The library's own construct, walk's half"; `natives-binding-probe.md` sections 1 and 2.
- Sentence 5: `natives-shape.md` section 1, gap 5.
- Sentence 6: `natives-shape.md`, "Limits, by reading".

## F-181

**Meaning:** unchanged. The `NatParam` result is now marked as a measurement on a scratch copy, not as the tree's behaviour. Rows 774 and 781 are left to F-255, which holds both.

**Sources:**
- Title: row 701; `CodeGen.java:2967-2971`, `:4107-4109`, `:5027-5029` (the assessment's reading).
- Sentence 2: F-255; rows 774 and 781.
- Sentences 3 and 4: the skill's `references/compiler.md`, "What the compiled path cannot compile yet"; the old text.
- Sentence 5: `perf-probes/where-clauses/REPORT.md` A.7; `ProjectFortress/LibraryBuiltin/NatReflect.fsi:23`; row 307.

## F-182

**Meaning:** narrowed to the declaration form, and the `test` modifier set apart, which runs (row 120). The evidence moved from the map, whose row says "interp works" for tests, to the observed rows.

**Sources:** `IndexBuilder.scala:187-189`; `repository/CacheBasedRepository.java:78`, `:97`; `GraphRepository.java:757`; rows 18, 121, 122 and 120, their cells; `Specification/basic/tests.tex:87-91` (the form).

**Question for the curator:** none. `coordinator/map/spec-to-implementation.md:303` says "interp works" for `test` declarations, and so disagrees with rows 121 and 122. The map is not an entry; it is a fix for whoever keeps the map.

## F-183

**Meaning:** narrowed to the evidence. "No gated test makes or indexes one" now covers `ZZ32Vector` only. The gated tests do make and write a `StringVector`. "Either type" fails at load, as the probe measured for both.

**Sources:** `compiler-probes/vectors/vectors.md` section 1 (the classes), section 3, step 9 (both fail at load), section 6 (the tests), section 7 (the helper's array); row 408.
