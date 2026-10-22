<!-- The FACTS clarity pass, chunk f16, 2026-10-22, second round: each entry's change of meaning, the source of each sentence and the questions left open, for F-173, F-174, F-175, F-176, F-223, F-180, F-181, F-182, F-183 and the entry split from F-175 (F-?1). -->

# Chunk f16: proposals

The clean text of each entry is in `clean.txt` and `proposals.apply`, word for word. This file gives, for each entry, its change of meaning, its sources and its questions. The assessment's base is `main` at `8c99c2413`; the check read `main` at `34fbf49d4`. The second round fixes every point of `check.md` and the cold reader's ambiguities.

## F-173

**Meaning:** corrected and widened to the evidence. The old text said that the checker departs "only at `ZZ32` with `NN32`". The callouts name another compiled departure: an unwritten bound is `Object` on the compiled path (row 412; P-42). Row 442 is the missing coercion of `NN32` into `ZZ64`, so that the pair gives `ZZ`; no callout names it. The text now says "among others", since the callouts give more (rows 425/731, the refusal to infer `bool`, `dim` or `unit`). What fixes a type parameter, the bounds and the expected type are now said in the chapter's terms. The route moved, because `rung-spec-inference/decision-record.md` section 3.1 states the rule that the bound rule replaced.

**Sources:**
- Title and the inference rule: `Specification/basic/inference.tex:47-124` (`:69-72` fixing by a type that mentions the parameter; `:77-98` the whole-type parameter, its bounds and the example `ZZ64`; `:99-118` the unfixed one and `BottomType`); `compile-ladder/rung-instance-bound/REPORT.md`.
- Row 412: `inference.tex:37-40`, `:356-363`; P-42.
- Row 442: its ledger cell; `compiler_tests/XXXInferPromoteNN32.fss`; F-138.
- Walk's callouts: `inference.tex:236-298`, `:364-425`; row 587.
- Tests: `compiler_tests/InferLoneUnbounded.fss`, `InferLoneBound*.fss`, `tests/InferLone*Walk.fss`.

**Question for the curator:** none.

## F-174

**Meaning:** corrected to the current Appendix I. Row 159 is fixed and no longer named there. Rows 779 and 780 are named and were missing. The positional restriction now has both its conditions, and row 398 is on the return-type condition, as the callout and the row say. The naked-`Any` rule is said as the language's rule, and as applied by both paths; the old record named `OverloadingChecker.checkBoundAny`.

**Sources:**
- Title and sentences 1 to 2: `Specification/advanced/overloading.tex:531-538`.
- The compiled restriction: `overloading.tex:644-652`; row 398; `changes.tex:2856-2857`.
- The naked-`Any` rule: `overloading.tex:134-150`; `OverloadingChecker.scala:475-477`, `checkBoundAny`; row 534's cell.
- The failing sets: `Specification/appendices/changes.tex:2858-2879`; each row's cell.

## F-175

**Meaning:** unchanged; split. F-175 keeps the reading of `comprises` at the level of values, which P-60's "Built: F-175" names, so P-60 needs no change. The dispatched instance (P-48) is now F-?1. The call typed by the intersection is now said, so "such a call" has its antecedent. Row 540 is the code generator's, as Appendix I and the ledger say; the first round credited it to the checker. Row 543 is marked deliberate, as its ledger class says.

**Sources:**
- Title and sentence 2: `changes.tex:3185-3240`; P-60.
- The call and its type: `changes.tex:3446-3451`.
- Rows 487, 540, 543, 546, 547: `changes.tex:1597-1606`, `:3452-3459`, `:3533-3535`; their ledger cells.

## F-?1, new: the dispatched instance

**Meaning:** unchanged; split from F-175. The rule now applies only to a declaration that the static call did not select, as the source says. Row 538 is tied to the compiled path, and walk's choice to P-48; the old F-175 tied row 538 to both paths.

**Sources:** `Specification/basic/overloading.tex:312-332` (the rule; `:316-318` the selected declaration; `:322-329` the fixed and unfixed cases) and `:333-349` (the callout); P-48; rows 538 and 496, their cells; `:390-400` (the second example).

## F-176

**Meaning:** unchanged. The size rule uses the source's words and example. The type rule now has its name condition. The "known to differ" rule has its full form and its reason.

**Sources:**
- Title, the example and the identity rules: `Specification/basic/types-vals-vars.tex:49-62`.
- The forms: `Specification/appendices/grammars/concrete-syntax.tex:533-547`.
- The walk sentence: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java:126-147`; row 767's cell.

**Question for the curator:** none. The cold reader asked whether brackets are dropped before two sizes are compared. The source does not say, and the entry does not either.

## F-223

**Meaning:** widened by one exception, which F-252 and row 759 already state: the checker accepts `g[\T\](a: T)` beside `g(a: Any)`. Walk's half is left to F-252 and F-257, which own it. "Non-strict" is now defined, and the rule is said as "both applicable to exactly the same calls". The gate now stands before row 759, which has no gated test.

**Sources:**
- Title, the rule and "non-strict": `Specification/advanced/overloading.tex:547-549`, `:561-569`.
- The refusal and its message: `OverloadingChecker.scala:458-471`.
- The operator: rows 584 and 726; `compiler_tests/XXXNoDuplicatesRuleSelfPositionsOperator`.
- Row 759: its cell ("with a bound below `Any` such a pair is refused"; "No gated test passes while it shows").

**Pointer note:** chunk f14 proposes to split F-252, with equal declared domains in a new entry. F-223's pointer to F-252 stays right, since F-252 then points to that entry. The coordinator may repoint it to the new entry instead.

## F-180

**Meaning:** unchanged. P-58's way is marked not built. The raise's patch is named by its file; the first round called it the fifth, and it is the sixth. The count of 50 is marked as by reading, with the conversions that cause it. The route gives `natives-binding-probe.md` section 1 as the compiled half, and says that section 2 measures the other form.

**Sources:**
- Title, sentences 1 and 2: `perf-probes/prelude/natives-shape.md` section 1, "The answers" and "What each gap does to it".
- P-58's way and its two halves: P-58; `natives-shape.md`, "The library's own construct, walk's half"; `natives-binding-probe.md` "Terms" and section 1.
- The raise: `natives-shape.md` section 1, gap 5.
- The compiled-path classes: `natives-shape.md`, "Limits, by reading".

## F-181

**Meaning:** widened in one word. "Function" is now "function, method", as the guard reads (`where-clauses/REPORT.md` A.7, line 209) and as the skill's `references/compiler.md` says; row 701 has the narrower words. The probe result is corrected: the probe compiled a component of `NatParam`'s shape, not the library's trait, and the verification failure came from `compiler_tests/XXXNatOpenRun`.

**Sources:**
- Title: row 701; `CodeGen.java:2967-2971`, `:4107-4109`, `:5027-5029` (the assessment's reading); `where-clauses/REPORT.md:209`.
- Sentence 2: F-255; rows 774 and 781.
- Sentences 3 and 4: the skill's `references/compiler.md`, "What the compiled path cannot compile yet"; the old text.
- The probe: `perf-probes/where-clauses/REPORT.md:213-226` (A.7); `tmp/probe/np/NatParamWhere.fss`; `ProjectFortress/LibraryBuiltin/NatReflect.fsi:23`; row 307; B.5 for what reading the size at a call is.

## F-182

**Meaning:** narrowed to the evidence. The message holds at top level only. A `property` declaration inside an object stops with an uncaught `java.lang.Error`, and a `test` declaration there does not parse. The compiled path is observed for the type alias, and by reading for the other two forms.

**Sources:** `IndexBuilder.scala:187-189`; `repository/CacheBasedRepository.java:78`, `:97`; `GraphRepository.java:757`; rows 18, 121, 122 and 120, their cells; `explorations/aliases-units-report.md:98-101`, `:461`; `Specification/basic/tests.tex:87-91` (the form).

**Question for the curator:** none. One `bin/fortress compile` each of run-b2's `g1c_testdecl_plain.fss` and `g1c_property.fss` would turn "by reading" into an observation. `coordinator/map/spec-to-implementation.md:303` says "interp works" for `test` declarations, and so disagrees with rows 121 and 122; that is a fix for whoever keeps the map.

## F-183

**Meaning:** narrowed to the evidence. "No gated test makes or indexes one" covers `ZZ32Vector` only. "Either type" fails at load, as the probe measured, but row 408 and its gate hold it for `ZZ32Vector` only.

**Sources:** `compiler-probes/vectors/vectors.md` section 1 (the classes), section 3, step 9 (both fail at load), section 6 (the tests), section 7 (the helper's array); row 408's cell; `SignatureParser.unsayable` and `FortressMethodAdapter.java:220-222` (the skip).
