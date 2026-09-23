# Judge, rung C (`rung-library-comments`): ruling on the first skeptic's refusal

At the gather (2026-09-22) the provisional row 354 this text cites became ledger row 359: rung L, earlier in manifest order, took 354 to 358.

**Decision: repair.** The skeptic's refusal ground holds: comment 2's words "a number or"
(`Library/FortressLibrary.fss:2672`, `.fsi:1662`) claim what neither the design record nor the
measurements support, and they go. Everything else the skeptic asked for is a report-only or
record-only correction, and each is right, with one framing the repair round must not copy: the
skeptic's explanation of *why* the number case loads without the clause is wrong at the language
level and unverified at the interpreter's, so the record carries the measurement and not the
mechanism. The rung stays comment-only; the repair changes eleven words in one six-line comment,
mirrored in both files, and re-runs the rung's own checks.

I read the net change (`git diff d610695c0...HEAD`), the four milestones, REPORT.md, record.md,
SKEPTIC.md, the skeptic's captures `probes/skeptic/SkArray3Exclusion.txt` and
`scratch-libraries.txt`, the probe programs, every specification passage both cite with ten lines
either side, the library precedents at the cited lines, the explainer and POSITIONS lines, and the
interpreter code the skeptic cites. I ran nothing but one `grep` over `Specification/` (section 4)
and `sed`.

## 1. The refusal ground (F1): the skeptic is right, the words go

**What the comment says.** `.fss:2671-2673` / `.fsi:1661-1663`: "An operator between an Array3
and a number or a lower-rank array, such as a matrix added to every plane, can be declared without
colliding with AdditiveGroup's +(self, other: T)".

**What the comment was to record.** The batch record, `explorations/coordinator/CLIMB-BATCH-3.md:108`:
"a user operator between a rank-3 array and something on the numeric side (C4's plane-wise `+`)".
The explainer it points at, `explorations/coordinator/postmortem-2026-09-19/library-findings-explained.md:201-203`:
"For C4: today the plane-wise `+` loads even without the clause … The clause is what makes it legal
rather than lucky". And the design that put the clause there, ledger row 341's settled note
(`explorations/fortress-gap-ledger.md:352`): "scalar extension in the block's place; `Matrix + Array3`
and `Array3 Array3` as nat-typed top-level operators beside the sized products … legal under the
`Array3` exclusion". In every one of these the operator the clause licenses is the plane-wise `+`
between a `Matrix` and an `Array3`, and the (number, array) case is the scalar block's. "A number"
is the worker's addition; no cited source says it.

**What is measured** (`probes/skeptic/SkArray3Exclusion.txt`, all cold caches unless marked):
- A1/A2: the plane-wise `+` (`ProjectFortress/test_library/ArrayOperatorVocabulary.fsi:6-7`) loads
  with the clause and is refused without it, against `AdditiveGroup`'s `+(self, other: T)`
  (`Library/FortressLibrary.fss:333`). The lower-rank half of the sentence is true and the clause
  is load-bearing for it.
- B1: with the clause, a user `+` between an `RR64` and an `Array3` (`probes/skeptic/SkA3NumVocab.fsi:3-4`)
  is refused, against the library's own scalar block, `opr +[\T extends Number, I\](x: Array[\T,I\], y: T)`
  (`.fss:4509`). B3: without the clause, the same refusal. B5/B6: with the block's two `+`
  declarations removed, the pair loads with and without the clause.
- So in this library the (number, `Array3`) slot is already the block's: `Array3` extends
  `StandardMutableArrayType` (`.fss:2666-2669`), which extends `Array[\E,I\]` (`.fss:1991-1992`),
  and the block serves it (`probes/skeptic/SkNothingLost.txt`: `10.0 - t` is an `Array3`). A user
  who takes the comment at its word and declares the number case is refused, and not against
  `AdditiveGroup`'s `+`. The sentence "can be declared" is false for "a number".

**The language side, so that the repair does not over-claim the other way.** The refusal in B1/B3 is
row 341's check, `OverloadedFunction.java:498-500` ("non-ground types need exclusion") with the
message at `:520-528`. Read at the instantiation `T = RR64, I = (ZZ32,ZZ32,ZZ32)`, the user's pair is a
more specific overloading of the block's by the Subtype Rule
(`Specification/advanced/overloading.tex:161-166`); read by the static-parameter sentence
(`Specification/basic/overloading.tex:100-104`, "it is an error for their static parameters to
differ"), it is an error, and so is the plane-wise `+` against `AdditiveGroup`'s `+`. The batch
record lists that sentence as Pavol's (`CLIMB-BATCH-3.md:164`). The comment therefore describes
what the clause buys under the check the tree runs, which is what the explainer's "legal rather
than lucky" (`:203`) meant; the repair must not add a language-level claim about the number case in
either direction, and the record must say the language's verdict waits on that sentence.

**The skeptic's mechanism is not adopted.** SKEPTIC.md:177-182 explains B6 by "RR64 already excludes
AdditiveGroup" via `FType.java:281-297`. At the language level that is false: `trait Number extends
{ …, AdditiveGroup[\Number\], … } comprises { RR64 }` (`Library/FortressLibrary.fss:352-355`), so
`RR64` is a subtype of `AdditiveGroup[\Number\]`, and a type does not exclude its own supertype
(`Specification/basic/types-vals-vars.tex:159-164`: exclusion is an empty intersection; a type meets
its supertype in itself). Which path the interpreter takes to load B6 is untraced; it is not
load-bearing for the refusal, since B1 alone makes the sentence false. The repair round carries the
measurements B1-B6 into the report and the record and not the mechanism.

**The repair.** Drop "a number or" and re-wrap so the comment keeps six lines, identical in both
files, which keeps every line number in REPORT.md section 8 and record.md valid. The exact text is
in instruction 1. I considered instead rewording to point at the scalar block ("an Array3 and a
number is the scalar block's below"); that adds a claim that needs its own measurement on the
compiled path one day and a cross-reference that line shifts will not maintain, so the minimal drop
is the decision. The specification is silent on rank-3 algebra (the worker's section 4 item 2 and
the skeptic's F5 agree), so this wording choice is taken under silence and is reported to Pavol.

**Its home.** A false sentence in the rung's deliverable, repaired in the round: no assertion is
owed, because it is not an implementation defect. What the corrected sentence claims is pinned by
`ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss:23-24`, on a cold cache (A4 against A5).

## 2. F2, REPORT.md:121-123: the skeptic is right, with the precise reason

The worker wrote that the interpreter "does not check a user declaration's overloading against the
library's". The explainer's sentence it came from says a *single* user declaration
(`library-findings-explained.md:201-203`), and row 341's own trigger is "two or more declarations of
one name with a trait-typed operand in the non-self position" (`fortress-gap-ledger.md:352`). The
fixture declares two (`ArrayOperatorVocabulary.fsi:6-7`), so the check runs: A2 and A4 refuse it
cold without the clause, A3 and A5 pass it warm. The worker's own gated run
(`probes/gated-tests-postedit.txt:16-26`) followed other post-edit walks on the worktree's caches,
so it met a warm cache and said nothing about the clause. The worker's sentence was wrong as
written; the repair replaces it with the measured behaviour and adds a cold run of the gated file
on the branch's own library (instruction 3), so the report's claim about the fixture rests on the
fixture itself rather than on the skeptic's `SkA3Mat.fss`.

## 3. F4, the provenance block (REPORT.md:3-4) and :124-125: the skeptic is right

- `library-findings-explained.md:193` is option B ("keep it on `Array3` as committed, add only the
  comment"); A is at `:189` with "(default)", and `:199` is "Default: A". POSITIONS.md:44 approves the
  clause "as landed", which is B, and `CLIMB-BATCH-3.md:108` says so. The block's "the explainer's
  defaults for them at …:193" is wrong for `Array3` and right for the scalar block's `:249-255` and
  `:272-283`.
- `Specification/basic/operators/opr-overview.tex:143-147`: "Multiplication of a vector or matrix
  by a scalar is done with juxtaposition … Division of a matrix or vector by a scalar may be
  expressed using `/`." Vectors and matrices are arrays
  (`Specification/basic/expressions/aggregate.tex:150-166`), so the worker's "no hit on arrays" is
  false and REPORT.md:124-125's "no array-scalar arithmetic at all" with it. The silence is on `+`,
  `-`, `MIN` and `MAX` between an array and a scalar, and on their result types; comment 4's claim
  that the juxtaposition pairs commute is consistent with the passage.

## 4. D1's grep (REPORT.md section 6): the skeptic is right, and I reproduced it

`grep -rn -i -w 'span\|spans\|source location\|source locations' Specification/basic Specification/basic-lib Specification/advanced`
prints exactly `basic/components/source-code.tex:39` (the concatenation sentence) and
`basic/operators/opr-overview.tex:234-236` (spans of real numbers, intervals). Home 3 for row 354
stands; the report shows the grep.

## 5. record.md FACTS line 1 and the suites decision

The worker's decision 1 (REPORT.md:255-260) stands: the shared prefix that ran this rung forbids the
suites and gates the batch once after the merge, and for a comment-only diff the evidence given
(re-lexed token streams identical, parse trees identical up to positions but for D1's three span
ends, the checker's 253 lines identical after remapping) is stronger than a suite run. But the
batch record's obligation is the suites (`CLIMB-BATCH-3.md:112`), and a record line that says "by
the batch's rule" names the wrong one. FACTS line 1 names both, and follows comment 2's new text.

## 6. The skeptic's two row-341 appends: adopted, the second reframed

Both are measured, both captures are committed `.txt` files, and the specification says nothing
about caches; they are home 3 as notes on the row that owns the check. The first (F3, the clause
pinned only on a cold cache) goes in as the skeptic drafted it. The second (the number pair refused
against the block) goes in with section 1's framing: the refusal is row 341's check, the pair's
language-level standing waits on the static-parameter sentence, and the note does not say the
number case "cannot be declared" in the language. Finished text is in instruction 6.

## 7. F8, `ProjectFortress/library_tests/TryAtomicRungB.fss:42`: the coordinator's, as both say

The rung's obligation is "a diff that contains no non-comment line" (`CLIMB-BATCH-3.md:112`); the
string change is a non-comment line. record.md:32 already carries the note. Nothing for the repair
round.

## 8. The homes, ruled

- F1: repaired in the round; no assertion (section 1).
- F3: home 3, row-341 append 1.
- The number pair against the block: home 3, row-341 append 2.
- D1: home 3, row 354, with the grep now shown.
- D2 (row 49 in argument position): the specification settles it
  (`aggregate.tex:129-137`), so home 2 is owed and no XXX file exists. Both agree why: an XXX file in
  `ProjectFortress/tests/` breaks this rung's byte-identical obligation and rung R's declared 385
  (`CLIMB-BATCH-3.md:158`). It is the gather's to place, and it reaches Pavol.

## 9. Notes that are not corrections, and what reaches Pavol

- F5: the margin notes at `aggregate.tex:152-162` ("An array of two [or more] dimensions … is a
  matrix", `Matrix` types with `k > 1`, an editor's dissent) lean toward the future the clause
  forecloses; they are suppressed draft text, not the standard. Pavol decided the clause without
  them on the record. Reported.
- F6: the static-parameter sentence would refuse the fixture's plane-wise `+` whatever the exclusion;
  already Pavol's (`CLIMB-BATCH-3.md:164`). The comment is right to say nothing of it.
- F7: "no Array3 can be an additive group" is the language's rule (`traits.tex:218-222`), unchecked
  by the interpreter at declaration (row 293). No change.
- The one walk/compiled divergence the skeptic found, `SkVecScalarRevC.fss`: the compiled prelude's
  `ZZ32Vector` block has one operand order (`Library/CompilerLibrary.fsi:186-190`) where the library
  has both. The specification is silent (section 3). The skeptic recommends no row because the
  prelude goes at the switch-over (POSITIONS 2026-09-21); I concur, and it is reported to Pavol as
  a divergence that lands unrepaired.

## 10. Instructions for the repair worker

Line numbers are this branch's at `832e09d5c`; nothing in the repair moves a line.

1. **Comment 2, both files.** Replace `Library/FortressLibrary.fss:2671-2676` and
   `Library/FortressLibrary.fsi:1661-1666` with these six lines, indentation as now (four spaces
   before `(*`, seven before each continuation):
   ```
       (* Excluding AnyAdditiveGroup picks one of two uses of rank 3.  An operator
          between an Array3 and a lower-rank array, such as a matrix added to every
          plane, can be declared without colliding with AdditiveGroup's
          +(self, other: T); in exchange no Array3 can be an additive group, a rank-3
          counterpart of Vector and Matrix.  Array1 and Array2 cannot exclude it:
          Vector and Matrix extend them and are additive groups. *)
   ```
   Check: `git diff --stat d610695c0 -- Library/` still reads 15 and 16 insertions, 31 in all, and
   `diff <(sed -n 2671,2676p Library/FortressLibrary.fss) <(sed -n 1661,1666p Library/FortressLibrary.fsi)`
   is empty.
2. **Re-run the rung's checks and recommit their captures**, each by the usage in its header
   (REPORT.md:286-287): `comment-only-check.py` on both files, base against branch, to
   `probes/comment-only-check.txt` (section (d) must again read comment-only, and the three mutation
   sections must still read FAIL); `parse-compare.sh` to `probes/parse-compare.txt` (expected
   identical to the present capture: the same three span ends and nothing else); the checker-count
   stage `explorations/coordinator/tools/checker-count/run.sh` to `probes/checker-count-postedit.txt`
   and `-run.txt`, then `remap-lines.py` against `checker-count-preedit-run.txt` into
   `probes/post-edit-comparisons.txt` (expected 93, 52, the same 253 lines); and `walk` on
   `probes/CommentedDecls.fss` to `probes/CommentedDecls-postedit.txt` (expected identical). Run the
   long ones with `run_bg`/`wait_for`. Commit and push.
3. **One cold run of the gated fixture on the branch's own library.** With an empty directory
   `tmp/cold-gated` created for the run and `JAVA_FLAGS="$JAVA_FLAGS -Dfortress.caches=$PWD/tmp/cold-gated"`
   (the property is `ProjectProperties.java:283`; the skeptic's method, `SkArray3Exclusion.txt:2-3`),
   run `bin/fortress ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss` from the worktree root and
   capture stdout, stderr and `rc=` to `probes/gated-cold-postrepair.txt`. Expected: the nine lines of
   `gated-tests-postedit.txt:17-25` and `rc=0`. This is the report's evidence that the fixture
   loads with the clause on a cold cache; A1 was the skeptic's own program.
4. **REPORT.md.**
   a. `:3`, the problem line: replace "on the explainer's defaults for them at …:193, :249-255,
      :272-283" with: the `Array3` clause as landed is the explainer's option B at
      `library-findings-explained.md:193` (its default was A, `:189` and `:199`; Pavol's approval as
      landed chose B), and the scalar block is on its defaults 3a-A and 3b-A at `:249-255` and
      `:272-283`.
   b. `:4`, the spec line: replace "none for the scalar block (no prose on array-scalar arithmetic
      …)" with: `Specification/basic/operators/opr-overview.tex:143-147` for juxtaposition and `/`
      between a vector or matrix and a scalar, and none for `+`, `-`, `MIN`, `MAX` between an array
      and a scalar or for their result types; re-run the grep and state which of its hits concern
      arrays rather than claiming none.
   c. Section 1 item 2 (`:27-36`): the quoted comment becomes the text of instruction 1.
   d. Section 4 item 2 (`:118-123`): replace the last two sentences ("That is the interpreter,
      which does not check … was not measured") with, in this order: the fixture declares two `+`
      (`ArrayOperatorVocabulary.fsi:6-7`), which is row 341's trigger, so the interpreter checks the
      pair against the library's on a cold cache and refuses it without the clause
      (`probes/skeptic/SkArray3Exclusion.txt` A2, A4) while a warm cache passes it (A3, A5); the
      rung's earlier gated run (`probes/gated-tests-postedit.txt:16-26`) met a warm cache, and the
      cold run of instruction 3 is the branch's own evidence; the static checker reports nothing
      either way (`probes/skeptic/SkA3Concrete-checker.txt`); and the number case: the scalar block
      holds the (number, `Array`) slot for every `Array3` (`.fss:2666-2669`, `:1991-1992`), a user
      pair for it is refused with or without the clause against `.fss:4509` (B1, B3) and loads
      either way once the block's `+` is removed (B5, B6), which is why the comment now names the
      lower-rank case only. Add one sentence: the static-parameter sentence
      (`Specification/basic/overloading.tex:100-104`) would refuse both the fixture's `+` and the
      number pair whatever the exclusion, and is Pavol's (`CLIMB-BATCH-3.md:164`); the comment says
      nothing of it. Do not reproduce SKEPTIC.md:177-182's mechanism.
   e. Section 4 item 3/4 (`:124-125`): replace "has no array-scalar arithmetic at all (the grep in
      the provenance block)" with the narrowed silence and the citation of instruction 4b.
   f. Section 6, D1 (`:185-199`): after "The specification defines no spans", insert the grep of
      section 4 above and its two hits.
   g. Section 7: add the re-runs of instruction 2 and the cold run of instruction 3, each with its
      capture.
   h. Section 9: add decision 7: comment 2's "a number or" was removed on the skeptic's B1-B6; the
      alternative was a rewording that points at the scalar block, not taken because it adds a claim
      and a cross-reference; six lines were kept so no citation moves. Add decision 8: the skeptic's
      mechanism for B6 was not adopted, with the reason in JUDGE.md section 1.
5. **record.md, FACTS line 1 (`:10`).** Change "`Array3`'s `excludes AnyAdditiveGroup` says which of
   two rank-3 futures it takes" to "`Array3`'s `excludes AnyAdditiveGroup` says which of two rank-3
   futures it takes: a user operator between an `Array3` and a lower-rank array, pinned on a cold
   cache by `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss:23-24`, against a rank-3 additive
   group; the (number, `Array3`) case is the scalar block's own". Change "The suites were not run in
   the rung, by the batch's rule" to "The suites were not run in the rung: the shared prefix forbids
   them and gates the batch once after the merge, against the batch record's obligation of both
   suites byte-identical (`CLIMB-BATCH-3.md:112`)". Add `probes/gated-cold-postrepair.txt` beside the
   `walk` evidence.
6. **record.md, gap ledger: two appends to row 341**, under a heading "**Row 341** — append to the
   notes, do not renumber", after the row 49 note:
   > Rung C of climb batch 3 (2026-09-22, its skeptic) measured that the same warm-cache mask hides the removal of `Array3`'s `excludes AnyAdditiveGroup` from the gated `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss`: with `AnyAdditiveGroup` deleted from the clause in both library files, a cold cache rejects the fixture's plane-wise `+` (`test_library/ArrayOperatorVocabulary.fss:9-10`) against `AdditiveGroup`'s `+(self, other: T)` (`Library/FortressLibrary.fss:333`), and the same run repeated on that cache passes; so the gate pins the clause only when this test meets a cold library cache, which was not measured for `ant testSystem`. Probe: `compile-ladder/rung-library-comments/probes/skeptic/SkArray3Exclusion.txt` A2-A5, scratch libraries in `scratch-libraries.txt`.

   > The same rung measured the (number, `Array3`) slot. The generic scalar block (`02d09a39f`; `Library/FortressLibrary.fss:4509-4516` on rung C's branch) holds it for every `Array3`, since `Array3` is an `Array` (`:2666-2669`, `:1991-1992`), and a user pair `opr +[\nat a,nat b,nat d\](y: RR64, t: Array3[\RR64,0,a,0,b,0,d\])` with its mirror is refused on a cold cache by this row's check (`OverloadedFunction.java:498-500`) against the block's `opr +[\T extends Number, I\](x: Array[\T,I\], y: T)` (`:4509`), with or without `Array3`'s `AnyAdditiveGroup` exclusion; it loads once the block's two `+` declarations are removed, again with or without the exclusion, and passes on a warm cache. Read at the instantiation `T = RR64, I = (ZZ32,ZZ32,ZZ32)` the pair is a more specific overloading of the block's by the Subtype Rule (`advanced/overloading.tex:161-166`); read by the static-parameter sentence (`basic/overloading.tex:100-104`) it is an error, as is every generic user operator against the library's; that sentence is Pavol's (`CLIMB-BATCH-3.md:164`), and the row's own over-strictness is what refuses the pair here. This is why rung C's comment on the `Array3` clause names the lower-rank case only. Probe: `SkArray3Exclusion.txt` B1-B6 (`SkA3Num.fss`, `SkA3NumVocab.fsi`/`.fss`).
7. **record.md, handover line (`:28`).** After "the reason for `Array3`'s `excludes AnyAdditiveGroup`"
   add "(the lower-rank case; its 'a number' was removed on the skeptic's measurement)", and after
   "appended the argument-position form to row 49" add "and two cold-cache notes to row 341".
8. **The tracked-paths check** of the shared prefix over REPORT.md and record.md, and over JUDGE.md
   and SKEPTIC.md as well; fix or explain every line.
9. **Commit and push** after instructions 1-3 and again after 4-8, on `wip/rung-library-comments`
   only, with the footer the shared prefix gives. Do not edit SKEPTIC.md or JUDGE.md.

## 11. What reaches Pavol

- The wording decision of section 1, taken under a silent specification, with its alternative.
- The clause's language-level standing: under the check the tree runs it licenses the plane-wise
  `+`; under the static-parameter sentence nothing generic is licensed; under the Subtype Rule read
  at an instantiation the number pair is a legal refinement the interpreter refuses (row 341). The
  sentence is already his (`CLIMB-BATCH-3.md:164`); the comment describes the checked design.
- F5's margin notes, which lean the other way and were not on the record when the clause was decided.
- D2: a specification-settled defect (row 49 in argument position) with no XXX file, deferred by
  this rung's byte-identical obligation and rung R's declared 385; the gather places it.
- The unrepaired divergence of section 9 (`CompilerLibrary.fsi:186-190`), no row by the library route.
- The suites were not run in C, by the prefix against the batch record; the gate confirms the
  counts and summaries unchanged.
