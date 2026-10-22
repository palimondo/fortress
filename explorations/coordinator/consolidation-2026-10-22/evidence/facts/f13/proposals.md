<!-- The FACTS clarity pass, chunk f13, 2026-10-22: each entry's change of meaning, the source of each sentence and the questions left open, for F-143, F-144, F-145, F-146, F-147, F-228, F-238, F-239, F-248 and the entry split from F-146 (F-?1). -->

# Chunk f13: proposals

The clean text of each entry is in `clean.txt` and `proposals.apply`, word for word. This file gives, for each entry, its change of meaning, its sources and its questions. The assessment's base is `main` at `a898e1baf`. Abbreviations: WE is `compile-ladder/rung-walk-elements/REPORT.md`, OI is `compile-ladder/rung-walk-overload-if/REPORT.md`.

## F-143

**Meaning:** one sentence corrected to the present tree, as the assessment asks. The old text said that an unwritten reduction runs on its elements' types through the open parameter. Since F-228, the declared type and the elements' join come first (WE section 1, item 3; section 5.2). The open parameter now reaches only an empty clause form with no declared type, and a generic call such as `mk()`. The gate moved from `UnwrittenReductionWalk`, whose forms F-228 fixes first, to the two tests that still exercise the open type. The most-specific claim is now named as a probe's observation. Fix round, three narrowings that the check found against the record's own conditions:
- The tuple clause holds where overloads are compared, as row 663 says; a lone `one(x: (T,T))` takes `(1, 2)`, as the entry's own gate asserts.
- The empty case is `SUM` or `PROD` (row 716). An empty identity-less reduction raises `EmptyReduction`.
- The case of a declared type or join that does not fit the bound is added (WE section 10, decision 6).

**Sources:**
- Title, sentence 3: the old text; `rung-walk-open-param/REPORT.md` section 1.
- Sentence 2 (the example): `tests/InferUnfixedFBoundedWalk.fss:13`.
- Sentences 4 and 5: WE section 1, item 3; row 716's cell (an empty `SUM` with no declared type is `0 : Int`).
- Sentence 6 (`mk()`): `InferUnfixedFBoundedWalk.fss:27-28`.
- Sentence 7 (tuples): the old text; row 663.
- Sentence 8 (most specific): `rung-walk-open-param/SKEPTIC.md` section 3, finding 3 (`SkOpenDispatch`).

## F-144

**Meaning:** the stale clause replaced. "The plain-bounded monoid operators stop (F-141)" was decision D2's state, which climb batch 15's rung B lifted. WE section 7 measured `BIG SQCUP`, `BIG SQCAP` and the nested `BIG CONCAT` running. The entry now says which were measured and which were not, as the assessment asks. The refusal at `Any` gets its gate. Fix round, one correction: `List`'s `BIG CONCAT` with no static argument is gated, by `tests/UnwrittenComprehensionElementsWalk.fss:14-17`, which rung B landed. The assessment and the first round said that no gated test holds any of the five. "Walk refuses `AnyMaybe`" is now "the program stops", since the source reports a stop under walk, not a refusal at load.

**Sources:**
- Title, sentences 1 to 4: the old text; `rung-reduction-types/REPORT.md` section 1.
- Sentence 5: WE section 7's table (`ESqCupCap`, `ENestedFused`); `rung-reduction-types/REPORT.md` section 8 names the five operators; the assessment found no gated test for them.
- Gate: `tests/ReductionSimpleJoinAtAnyWalk.test` (`load_exception_contains=does not define an abstract method declared in type AssociativeReduction`).

## F-145

**Meaning:** unchanged; the title narrowed to the body's one subject. The `override` refusal is F-147's, and the meet refusal is F-142's. Both were already handed over in the old body. Fix round: the hand-over no longer claims that these are walk's only other checks. The checker's behaviour at row 725 and row 728's class, a defect of walk, are said from the rows.

**Sources:**
- Sentences 1 to 5: the old text; `rung-duplicates-coverage/REPORT.md` section 1 (the unsettled search, the bounds); rows 665, 725 and 728.
- Detail line: the assessment's note that `rung-walk-coverage/REPORT.md` sections 1 and 6 still say that an unsettled search does not refuse.

## F-146

**Meaning:** unchanged; split. F-146 keeps the arithmetic, which builds P-55, the curator's ruling. F-?1 takes the opening of `where`-clause sizes, which is a default under review. The title's second half is P-55's rule, which F-146 builds. The rows now carry their subjects. Fix round: the comparison's third answer, "not known to differ", is stated, as `pEqv` gives it.

**Sources:**
- Title and sentence 2: `rung-size-expressions/REPORT.md` section 1, "Item 15, 15a with its part (b)" (`foldSize`, `nEq`, `nDiffer`); P-55.
- Sentence 3: row 683's cell.
- Sentence 4: row 767's cell.
- Sentence 5: row 675's cell.

## F-?1, new: opened `where`-clause sizes

**Meaning:** unchanged; split from F-146. "With array fork 3 at its default" is now said in words: way 4a of PLAN item 13's fork 3, landed by an agent, which waits for the curator's review (P-85; review-queue item 30). The two walk tests are added as gates. Fix round: "walk reads such a size as any size" is bounded to walk's `comprises` check at load; at a call, walk binds the argument's own size (section 1, the walk point). The failing stage of row 307 is named, the code generator (`compiler_tests/XXXNatOpenRun`).

**Sources:**
- Title, sentences 1 and 2: `rung-size-expressions/REPORT.md` section 1, "Fork 3, way 4a, under Q13.3" (`openWhereSizes`, `pSubInner`; "An opened size is not known to differ from any size").
- Sentence 3 (walk): the same section, the walk point (`processWhereClauses`).
- Sentence 4 (the default): P-85's last sentences; review-queue item 30.
- Sentences 5 and 6: rows 307 and 682, their cells.
- Sentence 7: F-251's title.

## F-147

**Meaning:** narrowed, as the assessment asks. The row 693 clause now covers only inherited types that differ from the `override`'s, as row 693 and the skill say. At equal types the `override` is still refused. The rule is stated in the title, and the two cases in which walk does not read the bounds are named. Fix round: the title's "only" is dropped, since at an instance of a generic trait that an object extends, equal types still count as overridden (`OverrideGenericInstanceEqualTypesWalk`, which the entry's own glob holds).

**Sources:**
- Title and sentence 1: `rung-walk-override/REPORT.md` section 1, "The strict relation"; `Specification/basic/traits.tex:585-589`.
- Sentence 2: the same section, "The generic declarations".
- Sentence 3: the old text; rows 614 and 649.
- Sentences 4 and 5: `references/interpreter.md`, "What walk checks"; row 693's cell.
- Gate: `AbstractOverrideUndefinedWalk` (row 649), named by the assessment.

## F-228

**Meaning:** the third step corrected, as the assessment asks. "Else at its bound" now has both cases: a plain bound, and an F-bounded parameter that stays open (WE section 1, item 3). The title's "declared type of its value" is now bounded by the list of the contexts that are reached and that are not reached (WE section 5.3). "So each body runs once" is from WE section 1, item 2. Fix round:
- The fallback of a declared type or join that does not fit is added (WE section 1; section 10, decision 6).
- The typed `body(i: I)` again follows from the instantiation, not from row 718's repair, which the first round had put before it.
- "Left open" is renamed, with what goes wrong in each row, so that it does not read as F-143's open type.

**Sources:**
- Title, sentences 1 and 2: WE section 1, items 1 to 3; section 5.3.
- Sentence 3: WE section 1, item 2.
- Sentence 4: WE section 1, item 3.
- Sentence 5: OI section 1, "Row 718".
- "Left open" and gates: the old text.

## F-238

**Meaning:** unchanged; cut to its own claim. The old text told the reading before and after the change in the past tense, though the shared reading still runs first today. The new text states the withdrawal and its `ReadableArray` exception in the present. It points to F-252 and F-257 for what follows. F-258 owns the whole-type reading and its row 787 exception; F-252 points there. Fix round:
- The title covers both old readings that the change withdraws from: the shared instantiation, and a generic object's instances as two object types. The first round's "shared" kept only one.
- The alternative that an exclusion read with the static parameters renamed apart stands is restored, since the first round's added "only" denied it (OI section 1).

**Sources:**
- Title and sentences 1 to 5: OI section 1, "Row 373", its first two points and the first point after "Now".
- Sentence 6: OI section 1, last point; F-252; F-257.
- Gates: the old text.

**Decision not taken:** fold into F-252 the two details that F-252 does not state: F-bounds meet in the Meet Rule's search, and a symbolic size unifies with a size parameter (OI section 1, `meetParams`). Alternatives: add them to F-252 in the coordinator's reconciliation of chunks f13 and f14; or leave them in the report, where they are now. I left them in the report, since they are detail of the search.

## F-239

**Meaning:** one addition. The refused values are now listed in the present tense. Fix round: the entry now says that walk's reading of `if` is a default, which the record left unmarked. It is the coordinator's call 6 at climb batch 16, which waits for the curator's review (row 746, "deliberate (walk)"; PLAN, "Climb batch 16, listed for his review", default as built). The writer brief's point 9 asks for this.

**Sources:** OI section 1, "Row 673"; row 746; `explorations/coordinator/CLIMB-BATCH-16.md` section 2; the three `IfClause*Walk` tests (`load_exception_contains=If clause did not return boolean`); `Specification/basic/expressions/if.tex:54`; `interpreter/glue/Glue.java:70-83` (the names only).

## F-248

**Meaning:** the present state is stated first, with two corrections. Both changes that the old text assumed are in the tree: the generic `distribute` (`Library/FortressLibrary.fss:3242-3251`), and walk's inference of a method's static arguments (row 21, fixed; F-253). The explicit form is now named as the team's commented line, which the library does not run. Fix round:
- Authorship. The result written over `K` is the probe's variant L4. The team's commented line returned `PossibleReductionPair[\R\]` (`git show a874948ac:Library/FortressLibrary.fss`, line 2868). The first round's full signature attributed the change to the team.
- The fused path. The record stated it in the present, but the probe traced it before F-253. It is now stated as that measurement, and the title no longer claims the path.

`NestedReductionFusion`'s five pairs are all named.

**Question for the curator** (it needs a run): do `MAX` and `MIN` over `SUM`, and `SUM` over `PROD`, still take the fused path on today's tree? A run of `GeneratorDeclarations` and `NestedReductionFusion` with the team's trace lines in `generate2` made live would settle it. No later trace exists.

**Sources:**
- Sentence 1 (what "fused" means): `perf-probes/generic-distribute/REPORT.md` section 5, first paragraph (`generate2` takes `efficientImpl` exactly when `distributes(q, r)` holds).
- Sentences 2 and 3: the probe's section 1, "Walk answers"; section 6 (microGPT).
- Sentences 4 and 5: the probe's section 1, "What walk loses"; `tests/NestedReductionFusion.fss:37-40`; F-253's gates.
- Sentence 6: the probe's section 1, G1; row 744.

## Questions and pointers outside this chunk

- **F-114**: it says that five specification examples pass "only because walk leaves that parameter open (F-143)". Since F-228, they may pass by the declared type or the join first. Reading the five examples settles it. F-114 is outside this chunk.
- **F-142**: "a generic one through a stand-in (F-145)" names material that F-145 has not held since 14 October. The stand-in is in `compile-ladder/rung-walk-override/REPORT.md` section 1, "The generic declarations", and `rung-walk-load-checks/REPORT.md` section 1. F-142's pointer needs a new target.
- **Row 665**: its cell and notes still say that the `override` check skips generic declarations, and name `XXXOverrideNothingGeneric*` tests. That half is fixed (F-147), and the tests are gated without `XXX`.
- **F-121**: it cites "(F-146, F-251)" for the compiled checker's opening of `where`-clause variables. The size half is now F-?1, so that pointer should move to F-?1.
- **Chunk f14**: F-238 now points to F-252 for the reading on declared domains. Chunk f14 proposes to split F-252, with the Return Type Rule at every instance in a new entry. F-238 no longer names that rule, so its pointer stays right after the split.
