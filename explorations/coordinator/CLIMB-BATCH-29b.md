<!-- The record of climb batch 29b, the repair batch after climb batch 29, for the coordinating session, the curator and the batch's workers: the static numerals on walk and on the compiled path, and the field numerals deleted. Drafted 2026-11-09 by an Opus planning worker against `main` at `bbebc267e1`, whose code is the base build's `dd00743d9e` (`git diff --stat dd00743d9e main -- . ':!explorations'` prints nothing), so climb batch 29's gate tables (`compile-ladder/climb-batch-29/gate/`) describe the base. It starts from the static numerals probe's patch, which built them on both paths in a worktree of `dd00743d9e` (`compile-ladder/plan-30/probes/draft-numerals.md` and `.patch`), and takes the coordinator's sort of the probe's open points (the planner's brief, `<scratchpad>/batch29b/planner-brief.md`, "The probe's open points"). It proposes two rungs, A and T, eleven forks with defaults (section 3), one point for the curator in the morning, and no question that holds the launch; no default bends a decision on record. Reviewed before the launch by `climb-batch-29b-review.md`, whose changes are in place. -->
<!-- Sources, the design's and the only ones: POSITIONS P-174, P-176, P-37, P-40 and P-173 and their histories; `coordinator/postmortem-2026-11-09-numerals/design-snapshot.md`, sections 2, 3, 4, 6 and 11 (where it and an entry differ, it rules); the Working Draft, `Specification-1.0-frozen/basic/expressions/literals.tex:83-175`. For what batch 29 built, the record's measured facts and the form only: `CLIMB-BATCH-29.md`, `reviews/batch-29-review.md`, the gap ledger. Also cited: P-12, P-26, P-49, P-74, P-96, P-148, P-165; F-79, F-140, F-169, F-342, F-345; the ledger rows 291, 318, 362, 513, 956, 957, 958, 960, 961, 962, 963, 966, 967, 968, 969, 970, 971, 972; the probe's report whole and its brief (`postmortem-2026-11-09-numerals/probe-brief.md`); the manual `climb-batch-workflow.md`, "Preparing a batch record", "Before the launch", "Gather" and "Gate"; the `coordinator` skill's `references/batch.md` and `SKILL.md`, "The curator's role and decisions"; the code at the sites; the specification's sections cited. -->
<!-- The planner's probes: `compile-ladder/plan-29b/PROBES.md`, in a worktree of the planner's own, `/home/user/fortress-p29b`, seeded from the base build and removed after; no build, suite or stage was run, since the probe measured the patch's code (its section 8). -->

# Climb batch 29b

## 1. The manifest, rung by rung

The batch's generator writes the workflow's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. The rungs are in the manifest's order, A, T. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-29b.md#`, PROBE for `doc:explorations/compile-ladder/plan-30/probes/draft-numerals.md#`, SNAP for `doc:explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md#`, and SRC for `ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read.

| id | slug | title | expected minutes |
|---|---|---|---|
| A | `rung-static-numerals` | The static numerals on both paths: the probe's build, the library's types through their own generic coercion folded from its body, one method per numeral coercion, the minus with the coercion, and the field numerals deleted | 210 |
| T | `rung-static-numerals-spec` | The specification: the static numerals in the literals chapter, its sibling chapters and Appendix I, the field numerals' text replaced | 75 |

Fields common to the two rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-static-numerals`; **branch:** `wip/<slug>`.
- **writes state:** no. **its test is the stage:** no. **joins the gate:** none, but T's specification build at the gather. **expected moves:** none.
- **lands only with:** T lands only with A; A lands on its own (section 4, "The rule the rungs keep").
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 29's gate left them and as the probe measured the patch's code (PROBE `8. The gate`: "#total 0 / #locations 0 / #crash none", "#total 0 / #crash none"). **expected checker crash:** none.

### A
- **slug:** `rung-static-numerals`
- **worktree:** `/home/user/fortress-static-numerals`
- **section:** `A. The static numerals on both paths: the probe's build, the library's types through their own generic coercion folded from its body, one method per numeral coercion, the minus with the coercion, and the field numerals deleted (P-174, P-176, P-173, P-37)`
- **blurb:** P-174 and P-176 on both paths, from the static numerals probe's patch applied as the rung's first commit: the one library's and the prelude's NaturalNumeral over n, r and v and RadixPointNumeral over n, m, r and v below Numeral, each number type's coercion generic over the four numbers, IntLiteral and FloatLiteral gone from the prelude, the checker's numeral types with v at any size and the where-clause refusal, walk's places converted once from the four numbers, the field numerals' objects, getters and pairs gone; then what the probe did not build: a numeral as written at a library type through the type's own coercion, its body folded to the JVM constant with no knowledge of the target type; every numeral coercion compiled once as one method of the four numbers as ZZ values, called once per place, from its own component or another; a folded constant at a library type converted from its exact value on both paths, so that no numeral coercion sees a sign; a program type's minus run once with its coercion; the library track's two deleted tests replaced; rows 969, 970, 961, 968, 957, 318, 362 and 972 close.
- **points to report:**
  - The patch as applied: its commit, any hunk that did not apply, and every later change to a file of the patch, by file and reason.
  - The fold (fork A1): the fragment as built, construct by construct; each of the prelude's coercions with the constant it folds to at your test numerals, or why it does not fold; what the fold knows of each built-in type; any line that names a target type.
  - The range refusal at a library type (fork A1): where it runs against the fold, for a numeral as written and for a folded constant, and its guard.
  - The one method per numeral coercion (fork A2): its JVM name and descriptor rule, its declaring and calling sides, a generic type's coercion; the probe's inlining removed, or why kept.
  - Folded constants at a library type (fork A3): each path's way, walk's change from the probe's state, and the guards' values.
  - The minus with the coercion: where it runs, and its test's output.
  - Row 957's second case (fork A5): built or not, and why.
  - Each test of the patch that you changed, and each new test, with its failing run (on the base or on the patch's commit, as its step says) and its passing run; each guard named as one.
  - Every team test line changed beyond the probe's list (PROBE `8. The gate`, "Team tests that change"), with its before and after.
  - The library track's count on your final tree, and the tests that hold it (fork A7).
  - The count and distance tables on your final tree, the commit they ran on, and their seconds; whether you edited the checker beyond the patch, and if so P-148's runs.
  - Each class of fork A8 deleted or left, with its row.
  - Every sentence made false that rung T's section does not name: the Appendix I Effects on the compiled path for the fold, the method and rows 957 and 971; F-79, F-342, F-345; the skill's parts on numbers, on walk and on the compiled path.
  - A file edited beyond those named; any step that would change P-173's default where nothing fixes a type, or walk's rule that a declaration that fits a numeral as it is runs before one that converts it.
- **briefing** (30 keys, 19 checks):
  - P-174 (check): the decision you build: the numeral types with the four numbers as static parameters, every number type's generic coercion, no numeral value at run time, the sign rule.
  - P-176 (check): one value per place, a JVM constant or a static final filled at load with the type's minus, walk at the first evaluation, the prelude carrying it.
  - P-173 (check): where a numeral converts, the default, the range refusal by the exact value, and the fold of a static expression first.
  - P-37 (check): the prelude's exception for the numerals, under which your prelude edits fall.
  - P-40: the bound on a size, which the four numbers do not take; read as values they are ZZ.
  - P-165: no asFloat on a numeral type, which the patch removes.
  - P-148 (check): the checker's timing, if your edits reach the checker beyond the patch.
  - P-12: walk refuses a numeral only when its place runs, until it runs the checker.
  - P-74: promotion, which a numeral at a generic call still drives.
  - ledger:969 (check): the field numerals in the one library and walk, which close.
  - ledger:970 (check): the compiled path's IntLiteral without the four numbers, which closes.
  - ledger:961 (check): the compiled sign at a program's type, which closes by the sign rule.
  - ledger:968 (check): walk's sign at a program's type, which closes by the sign rule.
  - ledger:957 (check): a numeral at a program's generic type, the first case the patch's, the second yours if it fits.
  - ledger:971: a spawning coercion at a place, which stays (fork A6).
  - ledger:972: the cache tables' class, fixed in the patch, which closes.
  - SNAP `3. The design` (check): the design in the curator's confirmed words, and his addition on the library's own types.
  - SNAP `4. What it is not` (check): the field numerals, which you delete.
  - SNAP `11. Consequences` (check): the library's types by the same coercion, the sign, walk, the static expressions.
  - PROBE `1. Where the snapshot`: where the probe followed the snapshot over an entry.
  - PROBE `5. Step 4` (check): the code generator, the runtime and the prelude as the patch builds them, and what stood in the way.
  - PROBE `6. Step 5`: walk as the patch builds it, including the signed value handed to a library coercion, which fork A3 changes.
  - PROBE `7. Step 6` (check): the patch's tests and their failing runs on the base, your before for them.
  - PROBE `8. The gate` (check): the patch's suites and stages, which you cite, and the team tests it changes.
  - PROBE `10. What was not built` (check): your work beyond the patch.
  - PROBE `12. Decisions`: the probe's decisions; decision 3 goes for a numeral as written, decision 4 is replaced.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala#def foldsTo` (check): batch 29's fold by the target type, kept only for a folded constant.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private String numeralCoercionSiteDesc`: the site rule at the base, whose exclusion of the library's apis goes.
  - `code:ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java#public ComponentIndex getComponent(APIName name)`: where the fold reads a declaring component's analyzed tree.
  - REC `Forks the batch takes` (check): the defaults you build, each with the ways not taken.

### T
- **slug:** `rung-static-numerals-spec`
- **worktree:** `/home/user/fortress-static-numerals-spec`
- **section:** `T. The specification: the static numerals in the literals chapter, its sibling chapters and Appendix I, the field numerals' text replaced (P-174, P-176, P-173, P-40, P-96)`
- **lands only with:** A.
- **blurb:** the static numerals in the specification's revision form: the literals chapter's numeral types as NaturalNumeral over n, r and v and RadixPointNumeral over n, m, r and v below Numeral, types that exist only at compile time, every number type's coercion generic over the four numbers, a type of a program's own receiving a numeral as written with its minus on the coercion's result, one value per place; the field numerals' sentences and boxes of climb batch 29 rewritten in the literals, types, numbers, coercion, inference, trait-parameters, constant and binary chapters; Appendix I's revival-numerals entry rewritten in place and the entries that name a numeral type's getters, asFloat, pairs or IntLiteral revised; both PDF builds.
- **points to report:**
  - Each passage and box rewritten, before and after, with the Appendix I entry it names.
  - The revival-numerals entry's Change, Rationale, Effect and Original text as written; each other entry revised, before and after.
  - Each Effect that names a row, with the row, and each row the text treats as closed by rung A.
  - Each sentence of the Working Draft that the design contradicts or changes in form, quoted, with its file and line.
  - The specification's build: both BUILD SUCCESSFUL lines and the warnings count.
  - Any sentence you wrote that the decisions, the snapshot or rung A's section do not support; a file edited beyond those named.
- **briefing** (17 keys, 11 checks):
  - P-174 (check): the numeral types, the coercion generic over the four numbers, no numeral value at run time, the sign rule, the binary chapter left out.
  - P-176 (check): one value per place, folded or made once, on both paths.
  - P-173 (check): the conversion, the default, the fold of a static expression, and the Draft's text it contradicts, for Appendix I.
  - P-40 (check): the bound for sizes only; a numeral type's four numbers read as values are ZZ.
  - P-37: the prelude's exception for the numerals until the switch-over.
  - P-165: the numeral types declare no asFloat.
  - P-96 (check): the revision form.
  - P-26: the bend that P-173 weighs.
  - F-345 (check): the specification's text today, the field numerals, which you replace.
  - SNAP `2. The Working` (check): the Draft's words at the source.
  - SNAP `3. The design` (check): the design in his confirmed words.
  - SNAP `11. Consequences` (check): the consequences he confirmed, which the text states.
  - PROBE `12. Decisions`: the hierarchy built, decision 1, and what the Draft leaves out.
  - PROBE `14. Where the Draft`: where the Draft is silent and what was chosen.
  - PROBE `18. Sentences` (check): the sentences the patch makes false.
  - REC `A. The static numerals on both paths` (check): what rung A builds, which the Effects describe.
  - REC `Forks the batch takes`: the defaults the text states.

## 2. For the curator

### The words this record uses

- **The static numerals** are his design, which this batch builds: a numeral's type exists only at compile time, the Working Draft's `NaturalNumeral` and `RadixPointNumeral` below `Numeral`, with the four numbers as static parameters; every number type, the library's and a program's, takes a numeral through a coercion generic over the four numbers, which the compiler instantiates and folds, and walk runs once at the first evaluation of each place. No numeral value exists at run time (P-174, P-176).
- **The field numerals** are what climb batch 29 built (`7daf51fe8a`): run-time value objects with the four numbers as fields and getters, `asFloat`, `asString`, the `=` pairs between a numeral type and a number type; walk building a numeral object at each site; the compiled path still on the prelude's `IntLiteral` and `FloatLiteral`; the fold handing a coercion a signed value (rows 969, 970, 961, 968). This batch deletes them.
- The **four numbers** are the Draft's `n`, `m`, `r` and `v`: the digit count, the digits after the radix point, the radix, and the digits read as one integer. A **numeral coercion** is a coercion whose parameter type is a numeral type, generic over its four numbers. A **place** is where a numeral is written.
- A **numeral as written** is one the fold left alone; a **folded constant** is one the fold made from an expression of numerals alone: a negative constant, as `-3`; a computed one, as `2 + 3`; a quotient, as `1/2` (P-173).
- **Walk** is the interpreter. The **compiled path** checks types with the **checker**, then makes JVM bytecode with the **code generator**. Until the **switch-over** it uses its own small library, the **prelude**, which carries the static numerals by P-37's exception; after it, the **one library**.
- **The count** and **the distance** are the checker's errors on the one library: 0 and 0 at climb batch 29's gate.
- A **rung** is one change, built by one worker and checked by a skeptic; the **gather** composes the rungs; a **guard** is a test that passes before the change and after it. **Appendix I** is the specification's appendix of changes.
- **microGPT** is the model program. No rung of this batch changes a line of it, and its quick checks under walk stay 7 of 7 (the probe measured 7 of 7 on the patch's code, PROBE `8. The gate`).

### The scope: two rungs

- **A**, the static numerals on both paths, from the probe's patch, and what the probe did not build.
- **T**, the specification. It lands only with A.

The reasons:

1. **The probe's patch is one state, so it is one rung.** Its library alone crashes the base's checker (the count printed no total, PROBE `3. Step 2`), and its checker, code generator, prelude and walk all read that library. A rung of the library and a rung of the checker would each fail on its own tree. And the gather applies each rung's whole change from the base (`git diff BASE...<branch>`, then `git apply --3way`; the manual's "Gather", "Each rung"), so two rungs that each carried the patch would conflict wherever one of them changed the patch's lines further.
2. **What the probe did not build lies in the patch's own files**: the code generator's site machinery, the coercion desugarer and walk's numerals. No rung beside A could build on the patch without carrying it.
3. **T is prose**, builds on no code, runs beside A, and lands only with A, as climb batch 29's T landed only with the rungs whose code it described.
4. **Two rungs fit the week's limit**: about 4.2M tokens written (Cost), against climb batch 29's 7.54M for six rungs (`reviews/batch-29-review.md`, section 3).

### The point for him in the morning

**Question 1 of the probe: `u = 0` for a zero `u: NN32`, and its kin (`w = 0` for an `NN64`, `0 = u`).** With the `=` pairs between the numeral types and the number types deleted ("It was a wrong choice and it gets deleted", SNAP `11. Consequences`), `u = 0` meets two declarations: the library's `=` over `Any`, which the numeral fits at its default `ZZ32` (P-173: at `Any` a numeral takes its default), answering `u SEQV 0`, `false`; and `NN32`'s own `=`, which the numeral reaches only by its conversion. The snapshot's section 11 gives `true`, "the checker fixes `0` at `NN32` from the other operand and folds it". The tree's rule that a declaration applicable without a coercion runs before one that needs it gives `false` (P-173's `gg(5, w)` by P-49; walk's `OverloadedFunction.bestMatchForNumeralsInternal`, PROBE `13. Questions`). The ways (PROBE `13. Questions`, question 1): (a) a numeral reaches a declaration by its conversion before one it fits only at its default, where that declaration is more specific, which changes the tree's rule and walk's dispatch; (b) `false`, strict equivalence of an `NN32` and a `ZZ32`; (c) the pairs kept, against his word. **Landed, not built further:** the probe's state. Under walk `u = 0` is `false`: the eight assertions of it and its kin move into `tests/XXXNumeralEqualsNumberWalk.fss`, which asserts the snapshot's `true` and expects its failure (PROBE `7. Step 6`), with a new ledger row; on the compiled path it is `true`, since the prelude declares no `=` over `Any` (PROBE `10. What was not built`). **Consequential:** each way reads P-173 or the snapshot anew.

Beside it, for the record and not for a decision: P-173 still says that a place fixes a type when its declared type "is a numeral type", which P-174 rules out, since a numeral type is written only as a parameter type; the patch refuses a binding at a numeral type on both paths (PROBE `1. Where the snapshot`). The record-landing workflow brings P-173 in line (section 6).

### The forks he may want to see

None of section 3's forks is consequential by the `coordinator` skill's rule, and none bends a decision of his; each lands with its default and goes on the review list. Three that a reader of his words may want first:

- **Fork A1, how the library's coercion is folded.** The compiler evaluates the coercion's own body at the numeral's four numbers, over a closed fragment whose only knowledge of the built-in types is their JVM representations; it knows no target type. The prelude's coercions at `ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32` and `RR64` fold to JVM constants; `ZZ`'s, and every constructor call, take the static final, as at a program's type. This replaces the probe's fold by the target type, the hole his words name.
- **Fork A2, a coercion declared in another component: the probe's way (a), one method per coercion of the four numbers as `ZZ` values, called once per place**, for every numeral coercion, in its own component or another. Way (c), inlining from the analyzed cache, fails on a name private to the declaring component, as the Draft's interval example's `roundDown` would be.
- **Fork A3, a folded constant at a library type converts from its exact value on both paths**, so that no numeral coercion sees a sign: the probe's walk hands the library's coercion a negative `v`, which his "that one is just a natural" rules out, and `-2147483648` at `ZZ32` must fold exactly first (P-173). This is the one conversion that no Fortress coercion performs: at a library type a folded constant converts by the checker's and walk's own exact conversion, as his consequence of 16:xx on `-2147483648` has it (SNAP `11. Consequences`, third bullet).
- **The range refusal at a library type** (fork A1's last sentences): the checker refuses a numeral outside a library type's range by the exact value, before the fold, as it did at climb batch 29, for a numeral as written and a folded constant alike. The common mechanism, his "no separate way", is read of the conversion: the refusal is a static constraint of the checker (SNAP `11. Consequences`, "Static constraints"), not a `where` clause on each library coercion, since one rule must serve a folded constant too, which no coercion sees.
- **Question 3 of the probe, a folded static expression at a program's type**, is built as P-174 states it, through the type's coercion from the folded value's default type, `ZZ32`, `ZZ64` or `ZZ` by its value and `QQ` for a quotient: your words of 15:xx to 16:3x name `ZZ32` in one bullet and `ZZ` in another (SNAP `11. Consequences`), and the record writer's P-174 took P-173's defaults; the batch builds that reading, on your review list.

### The team's lines this batch changes

Twelve team tests of `compiler_tests/`, each a pin of a checker message that named `IntLiteral`, respelled in the patch, each still expecting its failure, by the line of its `.test` file at `dd00743d9e` (PROBE `8. The gate`, "Team tests that change"): `XXX3u` 16 and `XXX6bi` 16, a candidate line deleted; `XXX5an` 17, 19, 21; `XXX5be` 15; `XXX6at` 18-25, 35; `XXX9ad` 20; `XXX9af` 20; `XXX9h` 15; `XXX9q` 15, 17, 19, 21, 23, 25, 27, 29-30, two lines added; `XXX10a` 15, 17, 19; `XXX10c` 19; `XXXApplicationErrors` 19, 21, 24-25. In each, `IntLiteral` becomes the numeral's own type, as `NaturalNumeral[\1,10,3\]`, or the prelude's candidate `(IntLiteral, IntLiteral)->IntLiteral` goes. No team test of `tests/` or `library_tests/` changes; the two library tests deleted are the revival's (fork A7). A's report lists any line beyond these (section 1, its points to report), so that each changed line can be shown to you after the landing, as review-queue item 444's default asks.

### What the batch leaves out

- The parallelism review's repairs, P-171's strings (built and kept), and every item that is not about numerals.
- Row 971, a numeral coercion that spawns a task at a place (fork A6): not built; its default stays P-176's "filled when the class loads".
- The compiled fold of the one library's own coercions, which fall within fork A1's fragment by their text: it is first checked when the compiled path reads the one library (a PLAN line for the switch-over).
- Walk's own `IntLiteral` and `FloatLiteral` classes (fork A8), which climb batch 29's fork N11 left to the names batch.
- `u = 0` (above).

### Before the batch runs

- **The Fable review of this record**, on his standing go of 19:0x UTC on 2026-11-09 for "the plan, its Fable review, then the launch": its recommended defaults stand; its changes are in place and named in `coordinator/climb-batch-29b-review.md`, section 1.
- **The manifest's generator,** `compile-ladder/plan-29b/manifest/`, made by the coordinator from `plan-29/manifest/` with this record's values (section 6).
- **The base build:** `/home/user/fortress-base30` at `dd00743d9e`, built, clean and kept by the probe. The batch's base will be `main`'s head at the launch; while `main` changes only under `explorations/`, its code is the base build's, and the trial seed proves it (the manual's "Before the launch", step 3).
- **The disk.** The script stops under 1.5 G a rung plus 4 G (`climb-batch-workflow.js`, `DISK_FLOOR_G`): 7 G for two rungs. Free at 20:2x UTC on 2026-11-09, the planner's worktree removed: 20,138,508 KB by `df -P`, about 19.2 G (PROBES, probe 7). Climb batch 28 used about 1.1 G a rung (`reviews/batch-28-review.md`, section 3); A, with two whole suites and two builds, may use 1.5 G; so about 6 G for the batch.
- The gather runs the 52 team demos on the merged tree (F-283): A changes every numeral that walk and the compiled path meet.

### Cost

- **About 4.2M tokens written, from 3.4M to 5.6M; about 6 hours 30 minutes at two agents at a time.**
- **Workers, about 1.55M:** A 1.1M, T 0.45M.
- **Skeptics, about 0.95M:** A 0.6M (it reads a diff of about 2,000 lines and runs the count stage itself, on the base build and on the worker's commits, since the patch changes the checker), T 0.35M.
- **The fixed roles, about 1.2M:** the disk check 0.06M; the gather 0.45M with two rungs, one `landsOnlyWith` order, the ledger's closings and rewrites, the demos and one specification build; the merged-diff review 0.45M; the gate 0.14M; the commit stage 0.13M.
- **A judge and a repair round, about 0.5M**, against climb batch 29's 729K for two rung judges, a merged-tree judge and a repair (`reviews/batch-29-review.md`, section 3).
- **The evidence.** Climb batch 29 wrote 7.54M over 21 transcripts for six rungs: its workers 354K to 658K (F 658K, N 648K), its skeptics 259K to 512K, the gather 548K, the review 467K, the gate 137K, the commit 131K (`reviews/batch-29-review.md`, section 3).
- **The figures.** A is the largest worker yet: it applies a patch of 87 files, 1,434 insertions and 735 deletions, builds it, and adds about 400 to 600 lines: the fold's evaluator, the one method per numeral coercion with the probe's inlining removed, walk's exact conversion of a folded constant, the minus in the static final, the dead classes, and some ten test files, then both whole suites and both stages. T is climb batch 29's T again in size, about seven chapters' boxes and five Appendix I entries (its 438K).
- **Minutes, for the scatter:** A 210, T 75. The critical path: A's worker 210, its skeptic about 70, the gather about 40, the review beside the gate about 55, the commit stage about 15.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of his; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential fork

**Q1, `u = 0` for a zero `u: NN32`:** the probe's question 1, his in the morning (section 2, "The point for him in the morning"). Default for this batch: the probe's state, as landed; walk `false`, pinned in `tests/XXXNumeralEqualsNumberWalk.fss`; the compiled path `true`. Rung A builds nothing further on it.

### Forks the batch takes

The coordinator's sort of the probe's open points settles questions 2, 3 and 6 and section 10's minus as built in this batch, makes question 4, question 5 and row 957's second case free choices on the review list, and leaves question 1 to the curator. Question 3, a folded static expression at a program's type, is built as the probe built it: through the type's coercion from the folded value's default type (P-174, "its coercion from the folded value's type, such as `QQ` for `1/2`", read with P-173's defaults); it goes on the review list, since the snapshot's two bullets name `ZZ32` and `ZZ` (section 2, "The forks he may want to see"). None of the forks below is consequential: each builds within a decision on record, or chooses where the decisions and the coordinator's sort leave an implementation open, and each can be undone.

1. **A1. A numeral as written at a library type goes through the type's own numeral coercion, whose body the compiler folds over a closed fragment.** At a place of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `RR32` or `RR64`, and of `QQ` once the compiled path reads the one library, a numeral as written takes the type's coercion generic over the four numbers, which the checker already finds (PROBE `4. Step 3`), by the same site rule as a program's type: the code generator's site rule stops excluding the library's apis (`numeralCoercionSiteDesc`), and `CoercionDesugarer.foldsTo` stops retyping a numeral as written at its target. The fold reads the coercion's declaration in the component that declares it, the prelude before the switch-over, through the repository (`GraphRepository.getComponent`), and evaluates the body with the four numbers bound to their exact values. The fragment it evaluates has four kinds of expression:
   - an integer, float or boolean constant;
   - one of the four numbers;
   - one of the fold's exact operators on constants (`IntegerLiteralFoldingVisitor`'s arithmetic and comparisons);
   - a call whose callee is a native binding over the built-in number types, a prelude `import java` function or a one-library function whose body is one `builtinPrimitive` naming a helper of `nativeHelpers/`, run at compile time through its Java method on constant arguments; or a function or method, getter included, of the declaring component whose body is itself in the fragment, to a depth of a few calls, as the prelude's `getter asZZ32(): ZZ32 = jLongOverflowingToInt(self)` of `ZZ64`.
   What the fold knows of the built-in types is their representations, for the natives' arguments and results: `ZZ32` and `NN32` a JVM `int`, `ZZ64` and `NN64` a `long`, `RR32` a `float`, `RR64` a `double`, `ZZ` a `BigInteger`, `Boolean` a `boolean`. It runs no native whose parameter or result type is outside them, so a body that prints is never run at compile time. It knows no target type and no method by its name. Where the evaluation ends in an `int`, `long`, `float` or `double`, the class file holds that constant at the place (P-176); where it ends otherwise, at `ZZ`, `QQ` or a constructor call, or meets a construct outside the fragment, the place takes the static final of fork A2's call, as at a program's type (P-176). The same rule applies to a program's coercion, whose constructor call never folds. The range refusal at a library type stays the checker's, by the exact value, before the fold, for a numeral as written and a folded constant alike (`NumeralConversion.outOfRange`, batch 29's, kept by the patch: PROBE `12. Decisions`, decision 6): so the fold never evaluates a coercion at a numeral outside the type's range, and a body that wraps there, as the prelude's `NN32` coercion does through `narrow` (the patch's `CompilerBuiltin.fss`), never answers one; `compiler_tests/XXXNumeralBeyondZZ32Range.test` is its guard. A `where` clause on each library coercion is a way not taken: it cannot see a folded constant's sign, which fork A3 converts outside the coercion, nor a float that rounds to an infinity (row 967's compiled half), so one rule of the checker serves both. **Default: so.** Ways not taken: (i) the probe's fold by the target type (its decision 3), which the coordinator's sort removes: "a separate way in the compiler for the shipped numerics is a hole in the design" (SNAP `11. Consequences`); (ii) a wider fragment that also takes `if`, comparisons on a receiver and `throw`, as `ZZ64`'s `asNN64` has (`Library/FortressLibrary.fss:945`), which no numeral coercion of the prelude needs, and of the one library's only `AnyIntegral`'s, whose `do` block picks `ZZ32`, `ZZ64` or `ZZ` by `v` (the patch's `trait AnyIntegral` in `Library/FortressLibrary.fss`) and whose result is no one JVM primitive, so it takes the static final as `ZZ`'s does; the eight types' coercions reach their natives through getters alone, as `ZZ`'s `asZZ32`, `self.asZZ64.asZZ32`, two natives (`:1159-1161`, `:940-941`); (iii) running the compiled coercion at compile time, which loads the library's classes and their static initializers into the compiler. The reason: the coordinator's sort settles that the body is folded "with the compiler's knowledge limited to the representation of the built-in types' primitive operations"; this is the smallest evaluator that knows only that, and it can be widened.

2. **A2. A numeral coercion is compiled once, as one method of the four numbers as `ZZ` values, and each place calls it once, in its own component or in another (the probe's way (a)).** The declaring component compiles each coercion whose one parameter type is a numeral type as one method whose value parameters are the numeral's numbers as `ZZ` values, keeping the type's own static parameters: the coercion of `Gen[\T\]` stays generic in `T` alone, so the class loader makes one class per type argument and none per numeral. Each place calls it with the constants once, in its component class's static initializer, into its static final; the call is the same whether the coercion's component is the place's or another, the prelude's included. So the four numbers are never static arguments at run time, and `RTTIsize.of`'s `int` (PROBE `10. What was not built`) never meets a 20-digit `v`. The probe's inlining at the site (`inlinedNumeralCoercion`, `numeralCoercionDecl`) goes, so that one form serves both. **Default: so, built as a lowering after the checker, where the code's way puts it.** Ways not taken: (c) inlining across components from the analyzed cache, which puts the declaring component's body into the place's class, where a name private to the declaring component does not resolve: a helper function it does not export, as the Draft's interval example calls `roundDown` and `roundUp` (P-174), or an `import java` alias, as every prelude coercion calls; and the place's copy goes stale when the body changes and the api does not; (b) the class loader's instantiation per numeral, one class per numeral, which P-176 rules out. The reason: a coercion's body compiles where its names resolve and its access is checked, and the place depends only on the api's declaration. Fork A1's fold reads the body too, but evaluates it in its own component, so no name of it reaches the place's class.

3. **A3. A folded constant at a library type converts from its exact value, on both paths; only a numeral as written reaches a numeral coercion.** At a library type a folded constant, a negative constant among them, converts from its exact value (P-173): exactly into an integer type and `QQ`, with one rounding into `RR64` and `RR32`, out of range refused statically, `-0.0` IEEE's negative zero as the probe's tests assert. On the compiled path this is batch 29's conversion as the probe keeps it: `CoercionDesugarer.foldsTo` for a folded constant only, the checker's `NumeralConversion`. Under walk the probe hands a negative constant to the library type's numeral coercion as its signed value (PROBE `6. Step 5`); that changes: walk converts a folded constant at a library type from its exact value, outside the numeral coercion. At a program's type nothing changes from the probe: `-3` is the type's own `-` on the coercion's result for `3`, and any other folded constant reaches the type through its coercion from its default's type (P-174). **Default: so.** Ways not taken: (i) the probe's walk, a signed `v` in a coercion over `NaturalNumeral`, whose `v` is a natural (P-174, "the four are naturals of any size"; his addition of 16:02 UTC on 2026-11-09, that a negative constant reaching the numeral type with its sign "is wrong, because that one is just a natural", P-174's history, block of 2026-11-09 17:40Z); (ii) the sign rule at a library type, the type's `-` on the coercion of the magnitude, which cannot give `-2147483648` at `ZZ32`, where P-173 folds it exactly first. The reason: P-173 states it, and the coordinator's sort keeps it: "a negative constant at a library type stays folded exactly first (P-173, P-174's sign rule is at a program's type)". Walk's change moves no value at any library type, so its tests are guards.

4. **A4. The numeral type hierarchy: the probe's five traits, with no `comprises` clause; a program's type that extends one is refused by P-174's rule that a numeral type is written only as a parameter type.** The five: `Numeral extends Number`, `AnyNaturalNumeral` and `AnyRadixPointNumeral`, which exclude each other, and `NaturalNumeral[\nat n, nat r, nat v\]` and `RadixPointNumeral[\nat n, nat m, nat r, nat v\]` below them, at the Draft's arities (PROBE `12. Decisions`, decision 1); the prelude's `Numeral` also excludes its number types. **Default: so, with a compiled test that `object O extends NaturalNumeral[\1, 10, 3\]` is refused.** Way not taken: `comprises` clauses, which can close only the three traits above the generic leaves, since the parser refuses an empty `comprises` (`parser/NoNewlineHeader.rats:104-108`, "Comprises clauses should not be empty."; PROBES, probe 4). The reason: the written-only rule already closes all five against a program, and the probe's five traits passed the count, the distance and both suites without one (PROBE `8. The gate`).

5. **A5. Row 957's second case, a place whose type names a type variable, as `m(): Gen[\T\] = 3` in `object Box[\T\]`: one static final in each instantiation's class, built if it fits.** The place's value depends on `T`, so it is one value per place and instance, made when that instance's class loads; fork A2's call takes `T` as a static argument. **Default: built after A's steps 1 to 7 are green; else row 957 is rewritten to that case alone.** Way not taken: the coercion at each evaluation, as today. The reason: P-176's one value per place, read where a place has one value for each instance.

6. **A6. Row 971, a numeral coercion that spawns a task at a place: not built in this batch.** Its default, for when it is built, stays the probe's way (a), the task pool started before the program's classes load, which keeps P-176's "filled when the class loads"; the team's comment beside the load already intends it ("so that there is a task pool before any user code is run", `runtimeSystem/MainWrapper.java:62-64`). **Default: left as the row, with its workaround: bind the operands first.** The reason: the change is to every compiled program's start-up, not to the numerals, and A is already the batch's critical path; a rung of its own would need a reproducer outside the numerals, which no probe has shown.

7. **A7. The library track keeps its count: the patch's two deleted tests are replaced by two library tests of the prelude's folded coercions.** The patch deletes `library_tests/IntLiteralRung6` and `IntLiteralArithRung7`, revival tests of the prelude's run-time `IntLiteral`, and its library track ran 82 tests (PROBE `8. The gate`) against climb batch 29's landed 86; the gate reads a fall as `COUNT DOWN`, red, and nothing declares one (`tools/gate-functions.sh`, `gate_compare`; PROBES, probe 5). **Default: `library_tests/NumeralFoldIntegers.fss` and `NumeralFoldFloats.fss` with their `.test` files, the track at 86 or more.** Way not taken: the two old tests respelled under names that no longer say what they test.

8. **A8. The compiled path's classes that served only the prelude's `IntLiteral` and `FloatLiteral` are deleted where nothing reaches them.** After the patch these remain (PROBES, probe 2): `compiler/runtimeValues/FIntLiteral.java` and `FFloatLiteral.java`, `nativeHelpers/simpleIntLiteralArith.java`, the literal rules of `compiler/asmbytecodeoptimizer/RemoveLiteralCoercions.java`, and the literal names of `compiler/NamingCzar.java` and `runtimeSystem/Naming.java`. **Default: each deleted where `ant compileAll` and the suites show that nothing reaches it; each one left goes in one new row.** Walk's (`interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java`, `interpreter/evaluator/values/FIntLiteral.java` and `FFloatLiteral.java`) stay: `evaluator/BaseEnv.java:630` still binds a size's value as an `FIntLiteral`, and climb batch 29's fork N11 left walk's glue classes to the names batch. Way not taken: every class left, for the switch-over's deletion of the prelude. The reason: P-37's exception has the prelude carry the static numerals now, so its two types are gone now, and their run-time classes with them.

9. **T1. Appendix I's `revival-numerals` is rewritten in place to the static numerals, and no box names the field numerals' text.** The entry and the nineteen boxes that cite it (`grep -rn 'revision{revival-numerals}' Specification`) state the field numerals, which the record traces to the coordinator, not to a decision of his (P-174's history, block of 2026-11-09 17:40Z, noted). They are rewritten under the same label, to the decisions as they stand. **Default: so.** Way not taken: a new entry with the field numerals' text kept as the text it replaced, the form of `revival-numeral-type`, which keeps a decision the revival took and later changed. The reason: Appendix I keeps the Working Draft's text and the revival's earlier decisions; the field numerals were the specification's text for one day (`7daf51fe8a`) and no decision.

10. **T2. The binary chapter's eight boxes give P-174's reason for leaving out its numeral coercion and `||`, not "a field cannot give a static size".** With the four numbers static parameters, a static width from a numeral's digit count can be declared; P-174 leaves the binary chapter's coercion and `opr ||` out by his word (`Specification-1.0-frozen/advanced-lib/binary.tex:1620-1662`). **Default: so.**

11. **T3. The constant chapter states the fold as built: a folded constant converts at a library type from its exact value, and reaches a program's type through its coercion from its default's type; only a numeral as written meets a numeral coercion.** It follows fork A3 and P-174. **Default: so.**

## 4. The rungs

Each rung's section is its worker's brief. The `fortress-repo` skill's part on how revived Fortress differs gives the rules of revived Fortress, but its "Numbers" describes the field numerals, which this batch deletes: where it and this section differ, this section holds. The briefing keys of section 1 give the decisions, rows and code the rung rests on. A line citation is the base's, `dd00743d9e`, unless it names the patch; the record's forks are section 3's.

### A. The static numerals on both paths: the probe's build, the library's types through their own generic coercion folded from its body, one method per numeral coercion, the minus with the coercion, and the field numerals deleted (P-174, P-176, P-173, P-37)

**The mission.** Climb batch 29 built the field numerals (`7daf51fe8a`). The one library's `NaturalNumeral` and `RadixPointNumeral` are value objects with the four numbers as fields, getters, `asFloat`, `asString` and `=` pairs with the number types (`Library/FortressLibrary.fsi:454-494`); walk builds one at each site and calls the place type's coercion with it (`interpreter/evaluator/values/Numerals.java`); the compiled path still types a numeral by the prelude's `IntLiteral` and `FloatLiteral`, whose value carries no four numbers (rows 969, 970); the fold hands a program's coercion a negative constant with its sign (rows 961, 968). The decisions on record build the static numerals instead: a numeral's type exists only at compile time, the four numbers its static parameters; every number type, the library's too, takes a numeral through a coercion generic over them, which the compiler instantiates and folds and walk runs once per place; no numeral value exists at run time (P-174, P-176). An Opus probe built them on both paths in a worktree of the base and measured each step (`explorations/compile-ladder/plan-30/probes/draft-numerals.md`; its patch beside it, `draft-numerals.patch`). You start from that patch and build what it did not.

**The decisions this rung builds.** P-174; P-176; P-173, where a numeral converts and the fold first; P-37's exception, the prelude carrying the static numerals until the switch-over; P-40, the bound for sizes, the four numbers `ZZ` as values; P-165, no `asFloat` on a numeral type; P-12, walk refusing when the place runs. The snapshot's sections 3, 4 and 11 give his words; where an entry and the snapshot differ, the snapshot rules. Section 3 of this record, forks A1 to A8, gives the defaults you build. The probe's question 1, `u = 0` for a zero `u: NN32`, is the curator's and is not built: the patch's state lands, walk's answer pinned in `tests/XXXNumeralEqualsNumberWalk.fss` (section 3, Q1).

**What you build, in order.**
1. **The probe's build, as your first commit.** From your worktree's root: `git apply explorations/compile-ladder/plan-30/probes/draft-numerals.patch` (it applies to the base's code with one whitespace warning, 90 paths: PROBES, probe 1), `git add` its new files, and commit it alone, titled as the static numerals probe's build, with its `historical:` line. Build it as the skill's `build-and-caches.md` gives for an edit of the library, the prelude, Java and Scala. The patch's tests were seen failing on the base by the probe (PROBE `7. Step 6`: walk, 7 files, "Tests run: 7, Failures: 7"; compiled, 14 files, "Tests run: 18, Failures: 17"), and its suites and stages on that code are PROBE `8. The gate`: they are your before and its measurements; cite them, and run nothing again on this commit but what step 2 onwards needs. Every later change to a file of the patch is yours, in a commit of its own, with its reason in `REPORT.md`.
2. **A numeral as written at a library type, through the type's own coercion, folded from its body** (fork A1). The site rule admits the library's types; `foldsTo` keeps only folded constants; the fold reads the declaring component's coercion and evaluates its body over fork A1's fragment; an `int`, `long`, `float` or `double` result is the place's constant, any other result or a stop takes step 3's call into a static final. The checker's range refusal at a library type (`NumeralConversion.outOfRange`) stays as the patch keeps it and runs before the fold, for a numeral as written too, so that the fold never meets a numeral outside the type's range; `XXXNumeralBeyondZZ32Range.test` is its guard, and your report says where it runs. Put the evaluator in a class of its own, in `compiler/codegen/` or `compiler/desugarer/`. Tests first:
   - a unit test of the evaluator beside `compiler/desugarer/NumeralFoldJUTest.java`, run by `ant testOnly -DtestPattern=<its class>`: each of the prelude's numeral coercions (at `ZZ`, `ZZ32`, `ZZ64`, `NN32`, `NN64`, `RR32` and `RR64`, the natural and the radix-point one where the type has both) evaluated at numerals that include each type's bounds, and at `ZZ`, `RR32` and `RR64` a numeral of more than 20 digits, to the constant that walk gives; a body with a constructor call, a `do` block or a native over a non-number type not folded. It fails first: the class does not exist.
   - fork A7's library tests, `ProjectFortress/library_tests/NumeralFoldIntegers.fss` and `NumeralFoldFloats.fss` with their `.test` files (`link`, `run`), asserting the values at each prelude type, compiled: `2147483647` at `ZZ32`, `4294967295` at `NN32`, `9223372036854775807` at `ZZ64`, `18446744073709551615` at `NN64`, a 30-digit numeral at `ZZ`, `0.1` at `RR64` and at `RR32` by their bits, `16777217` at `RR32`, `0.1_2` at `RR64`. They pass on the patch's commit, whose fold by the target type gives the same values: they are guards, and say so; walk's values of the same numerals are `tests/NumeralTypesWalk.fss`'s.
3. **One method per numeral coercion** (fork A2). The lowering of each numeral coercion's declaration, the call at each place, a generic type's coercion keeping its type parameters; the probe's inlining removed. Tests first: an api and its component in `ProjectFortress/compiler_tests/`, in the form of `ApiTraitOverloadApi.fsi` and `.fss`, declaring a program's number type whose numeral coercion calls a function that its component does not export, and a test component that imports it and checks one object per place, two places two objects, and the value of a numeral of more than 20 digits; seen failing on the patch's commit, where the call stays at its place and the class loader instantiates the coercion per numeral (PROBE `10. What was not built`). The patch's same-component tests (`NumeralStaticDesignCompiled`, `NumeralCoercionOnceCompiled`, `NumeralCoercionGenericTypeCompiled`) are the one form's guards.
4. **The minus with the coercion** (P-176; PROBE `10. What was not built`, third bullet). At a program's type, the static final holds the type's own `-` applied to the coercion's result. Test first: compiled, a reference type whose coercion and whose `-` each print a word, one place of `-3` evaluated twice: each word printed once, before the run starts, in the form of `NumeralCoercionOnceCompiled.test`'s `run_out_equals`, and the two evaluations one object; seen failing on the patch's commit, where the `-` runs at each evaluation. Walk makes the whole constant once already (PROBE `6. Step 5`): the same cases under walk are its guard.
5. **Folded constants at a library type, on both paths** (fork A3). Walk converts a folded constant at a library type from its exact value, outside the numeral coercion (`interpreter/evaluator/values/Numerals.java` and `Coercions.java` as the patch leaves them); the compiled half is the patch's. Its tests are guards under walk, passing before and after, and say so: `-2147483648` at `ZZ32`, `-3000000000` at `ZZ64` and at `RR64`, `-0.5` at `RR32`, `-0.0` at `RR64` with `1/r` negative and infinite, `2 + 3` at `ZZ64`, `-3` at `ZZ`, `-0.1` at `QQ` as `-1/10`.
6. **The hierarchy** (fork A4). A compiled refusal test, its `.test` name carrying `XXX` as the tree's refusal tests do (PROBE `7. Step 6`): `object O extends NaturalNumeral[\1, 10, 3\]` refused. If the patch's checker refuses it already, it is a guard; if not, the written-only rule reaches an `extends` clause, test first.
7. **The dead classes** (fork A8), each deleted only once `ant compileAll` passes without it, the rest in one new row.
8. **Row 957's second case, if it fits** (fork A5), test first: compiled, `object Box[\T\]` with `m(): Gen[\T\] = 3`, two calls on one instance's type one object, two instances' types two; seen failing on your tree before the change.
9. **The suites and the stages,** once each on your final tree: `ant testFast` and `ant testSystem` (the skill's `tests-running.md`, "When to run a whole suite"), the library track at 86 or more; the count stage and the distance stage as the skill's `compiler.md` gives them, against climb batch 29's gate (`explorations/compile-ladder/climb-batch-29/gate/`), 0 and 0 with `#crash none` as the probe measured. If you edit `scala_src/` beyond the patch, P-148's change run of the count stage on your final tree, beside the probe's (PROBE `8. The gate`: the base 1m44.733s; the patch 1m43.621s and 1m40.981s), and the skill's second pass.

**Tests, first.** The patch's tests are in your first commit (PROBE `7. Step 6` lists them): among them the cases of the snapshot's section 3, point 8, and of the probe's brief, step 6 (`postmortem-2026-11-09-numerals/probe-brief.md`): `CC64` from `3 + 4 i` with `i` a constant of the type, the Draft's interval at `3.1415926535897932384`, `Dec` receiving `3.14159` as 314159 and 5, `BF16` rounding `1.00390625000000000001` once, the round trip printing `C.8_16` from the four constants, a byte type refusing `300` by `where { v < 256 }`, `-3` at a type with `-` and without one, `c: CC64 = -3 - 4 i`, `-2147483648` at `ZZ32`, `-0.0`, `Gen[\RR64\]` one object per place, `10/20` at a type with and without a coercion from `QQ`, `0.1_2 SEQV 0.5`, `NOT (0.1 = 0.1_16)`, `q: QQ = 0.1`, `r: RR64 = 0.1`, `z: ZZ32 = 3000000000` refused, `x = 3` a `ZZ32`, `Cell(3)` a `Cell[\ZZ32\]`, no numeral type as a variable's type and none from `typeOf`; batch 29's own-type tests rewritten to the generic coercion over `n, m, r, v` (`NumeralOwnTypeWalk.fss`, `NumeralGenericOwnTypeWalk.fss`, `NumeralAtReturnWalk.fss`, the compiled `Numeral*` and `LiteralDefault*`). The interval and the `QQ` cases are walk's until the switch-over, since the prelude has no `QQ`. Your own tests are steps 2 to 6 and 8, each seen failing through the harness first, on the patch's commit or the base as its step says, then passing; a guard passes on both, and your report says which are guards.

**The stages.** Step 9.

**Rows.** Read each with `ledger.py show N` first. Close with your commits, each with its test: 969 (`tests/NumeralOwnTypeWalk.fss`), 970 (`compiler_tests/NumeralCoercionOnceCompiled.test`), 961 (`compiler_tests/NegativeNumeralOwnType.test`), 968 (`tests/NumeralStaticDesignWalk.fss`), 957 (`compiler_tests/NumeralCoercionGenericTypeCompiled.test`, whole if step 8 lands, else rewritten to its second case), 318 (`compiler_tests/NumeralDivByZeroCompiled.test`), 362 (`compiler_tests/FloatLiteralValuePrint.test`), 972 (`compiler_tests/NumeralStaticDesignCompiled.test`, whose run passes the prelude's static initializer). New rows in `record.md`, `NEW-A-<n>`: `u = 0` and its kin under walk, the `XXX` test of Q1; each class of fork A8 left; any prelude coercion that fork A1's fragment does not fold. Whole new lines, each within `ledger.py`'s limits and linted with `ledger.py check --rows` (PROBES, probe 6): 962, whose notes cite `FIntLiteral.asZZ32`, which the patch replaces; 963, the selector keeping the numeral's own type, now `NaturalNumeral[\…\]`, not `IntLiteral`; 960, the digit count, not a getter; 966, `u = 0` now `false` under walk too; 513, its numeral case now built under walk; 971, the place's call now fork A2's.

**Specification.** Not yours: T's. List each sentence your change makes false that T's section does not name, as the Effects on the compiled path for the fold, the method and rows 957 and 971, and the skill's sentences that section 6 does not list.

**Files.**
- The patch's 90 paths.
- Beyond them: the evaluator's class and its unit test; `compiler/codegen/CodeGen.java`'s numeral sites and the lowering, or a desugarer of its own; `compiler/desugarer/CoercionDesugarer.scala`, `foldsTo`; `interpreter/evaluator/values/Numerals.java` and `Coercions.java` for step 5; the classes of fork A8; your tests.
- Not: `Specification/`; `runtimeSystem/MainWrapper.java` (fork A6); the parser and `astgen/Fortress.ast`; `compiler/phases/PhaseOrder.java`; microGPT.

**Reserved points.** A model line: none. A step that would change P-173's default where nothing fixes a type, or walk's rule that a declaration that fits a numeral as it is runs before one that converts it (Q1's ways (a) and (c)).

**Overlaps by file.** None: T edits only `Specification/`.

### T. The specification: the static numerals in the literals chapter, its sibling chapters and Appendix I, the field numerals' text replaced (P-174, P-176, P-173, P-40, P-96)

**The mission.** Climb batch 29's rung T wrote the field numerals into the specification in the revision form (F-345). The literals chapter says that the value of a numeral holds the four numbers as the getters `digits`, `fractionDigits`, `radix` and `digitValue`, "fields of the numeral's value, not static parameters of its type" (`Specification/basic/expressions/literals.tex:109-113`); that a place whose type "is a numeral type itself" fixes a type (`:177-181`); and that inside a coercion two numeral values compare by their value (`:227-229`). Its boxes and Appendix I's `revival-numerals` say the revival decided so on 8 November 2026 (`literals.tex:139-152`, `:230-245`; `appendices/changes.tex:4995-5230`). The decisions on record are the static numerals (P-174, P-176), which the text is to state, in the revision form (P-96).

**The decisions this rung builds.** P-174, P-176, P-173, P-40, P-37's exception, P-165, P-96, and P-26, whose bend P-173 weighs. The snapshot's sections 2, 3 and 11 give his words. Rung A's section and section 3's forks A1 to A8 and T1 to T3 say what the implementations do.

**What you build.**
- `Specification/basic/expressions/literals.tex`:
  - the numeral types (`:97-117`): `Numeral` below `Number`; `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]` at the Draft's arities, the four numbers static parameters, naturals of any size, so `3.125` is a `RadixPointNumeral[\4, 3, 10, 3125\]`; the types exist only at compile time, and no numeral value exists when a program runs; the Draft's explicit-radix types and `Literal[\v\]` not built, the radix in `r` (PROBE `12. Decisions`, decision 1; `14. Where the Draft`); the team's two notes kept; the radix paragraph (`:133-137`);
  - the box at `:139-152` (fork T1);
  - the conversion paragraph (`:155-175`): each number type of the library declares a coercion generic over the four numbers, whose body computes the type's value from them; the compiler instantiates it at the numeral and folds it, so a value the JVM holds as an `int`, `long`, `float` or `double` is a constant, and any other one value per place, made once (P-176);
  - the paragraph on a place that fixes a type (`:177-181`), without "or is a numeral type itself" (P-174's written-only rule; PROBE `1. Where the snapshot`);
  - the paragraph on a type of a program's own (`:207-229`): its coercion generic over the four numbers, the Draft's interval as P-174 gives it; the numeral as written; `-3` as the type's `-` on the coercion's result for `3`, refused at a type without `-`; any other static expression through the type's coercion from its default's type, `QQ` for `1/2` (fork T3); one value per place on both paths, the minus with it; a `where` clause over the four numbers refusing statically, as a byte type refuses `300`; a numeral type written only as a parameter type, never in an `extends` clause (fork A4); the sentence on two numeral values inside a coercion's body removed;
  - the boxes at `:230-245` and `:268`.
- `Specification/basic/types-vals-vars.tex:576-583`: `Numeral` and the numeral types' static parameters, in place of values that carry the four numbers.
- `Specification/basic-lib/numbers.tex:40-70`: the coercions generic over the four numbers; no `=` pairs; no `asFloat` on a numeral type (P-165); its box.
- `Specification/basic/conversions-coercions.tex:84` and its box at `:119`.
- `Specification/basic/inference.tex:188`, and the section "A Numeral Whose Conversions Tie" (`:302-345`), where they name the numeral types; their boxes.
- `Specification/basic/trait-parameters.tex:105`: the box gains that a numeral type's four numbers, read as values in a coercion's body, are `ZZ`, the bound being for sizes (P-40, P-174).
- `Specification/basic/expressions/constant.tex`, the boxes at `:106` and `:133` (fork T3).
- `Specification/advanced-lib/binary.tex`, the eight boxes at `:925`, `:1146`, `:1752`, `:1781`, `:1907`, `:2143`, `:2172` and `:2348` (fork T2).
- `Specification/basic/expressions/comprehensions.tex` and `appendices/grammars/concrete-syntax.tex`, where they name a numeral type.
- `Specification/appendices/changes.tex`: `revival-numerals` (`:4995`), its Affected sections, Change, Rationale, Effect and Original text; `revival-asfloat` (`:2753`), its list naming the two numeral types and its eleven coercions with their pairs (`:2775-2792`); `revival-numeral-type` (`:3745`), where it says what replaced it; `revival-inference` (`:1935-1990`, `:2231-2261`); `revival-object-kinds` (`:4030`, `:4068`); `revival-int-float` (`:1141`), where it names a numeral type. In the Effects: the rows that rung A closes (969, 970, 961, 968, 957's first case, 318, 362) leave; the rows that stay (956, 958, 960, 962, 963, 966, 967, A's new row for `u = 0` under walk) stand as they will after A; write row 971 and row 957's second case as open, as fork A5 and fork A6 leave them, and the gather corrects them to what lands (the manual's "Gather", "Corrections still owed").
- The build, `ant genSource` then `ant tex` in `Specification/fortress/`, as the skill's `specification.md` gives it.

**Tests.** None: an edit of the specification has no test (`fortress-repo`, `SKILL.md`). The build is your check.

**The stages.** None. List your files (`STAGE_BLIND`).

**Files.** `Specification/` only, the chapters and entries named.

**Reserved points.** A sentence that the decisions, the snapshot or rung A's section do not support; P-173's "is a numeral type", which you do not write (section 6, "For the record-landing workflow"). A model line: none.

**Overlaps by file.** None.

### The rule the rungs keep, and how they meet

- A and T share no file. T lands only with A; A lands on its own.
- The declarations each rung changes: A, the patch's, and beyond it the evaluator, the numeral sites and their lowering, `foldsTo`, walk's conversion of a folded constant, the classes of fork A8, its tests; T, the chapters and entries named.
- They meet on the merged tree: walk's suite, the compiled, library and misc tracks, the atomic runs, the ladder and the two stages read A's tree; the specification's build reads T's text; the gather's 52 demos and the commit stage's microGPT quick checks see every numeral.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief, piece by piece, with its home here:

- **The one library's numeral types and each number type's generic coercion; the prelude carrying the same, `IntLiteral` and `FloatLiteral` gone, the compiled tests that write them rewritten (P-37's exception):** the patch, A's step 1; the library's types through their own coercion, folded from its body, A's step 2 (fork A1).
- **The checker: a numeral's type with its four static arguments, `v` past 32 bits, inference of a coercion's static arguments, the range refusal as a static error, P-173's default kept:** the patch (PROBE `4. Step 3`).
- **The code generator and the runtime: the fold to a JVM constant at a built-in type, one `static final` per place at a program's type, no class per numeral, the type's `-` after the coercion:** A's steps 2, 3 and 4 (forks A1, A2); the patch's `FZZ32` size value and row 972's fix.
- **Walk: the same values at the first evaluation of each place, no run-time numeral object, row 486's way as the probe found it:** the patch (PROBE `6. Step 5`; row 486 was fixed and about the checker, walk's obstacle its `long` sizes, passed by binding the four numbers as values); A's step 5 (fork A3).
- **The tests of the snapshot's section 3, point 8, and of the probe's brief, step 6, seen failing on the base and passing after, batch 29's own-type tests rewritten:** the patch's, failing on the base in the probe's runs (PROBE `7. Step 6`); A's own, steps 2 to 6 and 8.
- **The specification's revised text and its Appendix I effects:** T.
- **The ledger:** rows 969 and 970 by A; 961 and 968 by the sign rule, in the patch; the probe's rows: 972 by the patch, 971 left (fork A6); row 291's second trigger goes with the patch's checker, so nothing is filed for it.
- **The skill's sentences made false:** section 6, "For the skill writer".
- **Question 1:** section 2.

### The planner's probes

`compile-ladder/plan-29b/PROBES.md` holds each with its commands and output. In short:

1. **The patch applies to the base:** `git apply --check` passes on a worktree seeded at `dd00743d9e`; 90 paths; one whitespace warning on a line of `CompilerBuiltin.fsi` that the base already has.
2. **What still names the prelude's two types after the patch:** the compiled path's `FIntLiteral`, `FFloatLiteral`, `simpleIntLiteralArith`, `RemoveLiteralCoercions`' literal rules and the literal names of `NamingCzar` and `Naming` (fork A8); walk's, with `BaseEnv.java:630` live.
3. **The ladder:** none of the 85 files of the pass list writes a numeral type, a coercion or a getter that the change removes.
4. **An empty `comprises` clause is a parse error** (fork A4).
5. **The gate reads the library track's fall from 86 to 82 as `COUNT DOWN`** (fork A7); the compiled track and walk's suite rise.
6. **The rows to rewrite against `ledger.py`'s limits:** 962's notes hold 666 of 700 characters and 513's 689.
7. **The disk:** about 19.2 G free; the floor for two rungs is 7 G.

**Not run:** a build, a suite, a stage or a timing: the probe measured the patch's code (PROBE `8. The gate`), and no fork needed a number that its report does not give.

### Rows filed by plan

None. A's new rows go in its `record.md` as `NEW-A-<n>`.

### Left out, each with its home

- **The parallelism review's repairs** (P-175): their own batches. **P-171's strings:** built and kept.
- **Row 971** (fork A6): its row, and a PLAN line beside the switch-over's start-up work.
- **The compiled fold of the one library's own coercions** (fork A1): a PLAN line for the switch-over, when the compiled path first reads them.
- **Walk's `IntLiteral` and `FloatLiteral` classes** (fork A8): the names batch, as climb batch 29's fork N11 left them.
- **`u = 0`** (Q1): his.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 29: `coordinator/climb-batch-workflow.js` and its manual `coordinator/climb-batch-workflow.md`. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest, which the batch's generator reads.

### The generator

`compile-ladder/plan-29b/manifest/` (`gen29b.py`, `lists29b.py`, `check29b.js`) is the coordinator's, made from `plan-29/manifest/`. It changes from climb batch 29's in these ways:

- the batch's values: `BATCH` `29b`, its folder `compile-ladder/climb-batch-29b/`, the output `manifest29b.js`;
- the rungs from `lists29b.IDS` in the manifest's order A, T;
- T's `landsOnlyWith` `['A']`;
- the briefings and checks of section 1, with their reasons; no key holds a backslash, a backtick or a double quote, and each matched one place by `facts-extract.sh --check` on `main` at the commit of this record, the REC keys against this record as written;
- no rung declaring a count, a crash or a move;
- A's section naming the count stage and the distance stage as stages it runs once on its final tree, and P-148's change run if it edits the checker beyond the patch; T's naming neither.

### What every agent reads first

This run is climb batch 29b, the repair batch after climb batch 29: the static numerals on walk and on the compiled path, and the field numerals deleted (P-174, P-176, P-173, P-37). The static numerals: a numeral's type exists only at compile time, the Working Draft's NaturalNumeral and RadixPointNumeral below Numeral, with the four numbers (the digit count n, the digits after the point m, the radix r, the digits as one integer v) as static parameters; every number type, the library's and a program's, takes a numeral through a coercion generic over the four numbers, which the compiler instantiates and folds and walk runs once at the first evaluation of each place; no numeral value exists at run time. The field numerals: what climb batch 29 built (7daf51fe8a), run-time value objects with the four numbers as fields and getters, asFloat, asString and = pairs, walk building one at each site, the compiled path on the prelude's IntLiteral and FloatLiteral; this batch deletes them. The skill's part on how revived Fortress differs still describes the field numerals in its "Numbers": where it and your section differ, your section holds. Its rungs:

- A, the static numerals on both paths: an Opus probe's patch, which built them in a worktree of this base (explorations/compile-ladder/plan-30/probes/draft-numerals.md and .patch), applied as the rung's first commit; then a numeral as written at a library type through that type's own coercion, its body folded to the JVM constant with no knowledge of the target type; every numeral coercion compiled once as one method of the four numbers, called once per place, from its own component or another; a folded constant at a library type converted from its exact value on both paths; a program type's minus run once with its coercion; the compiled path's classes of the prelude's two types deleted where nothing reaches them;
- T, the specification in the revision form: climb batch 29's text of the field numerals rewritten to the static numerals, with Appendix I; it lands only with A.

A has tests that fail on the base or on the patch's commit and pass after, and guards that pass on both. A changes what the stages read, so it runs the count stage and the distance stage once on its final tree, against climb batch 29's landed 0 and 0. T edits only Specification/. Whether u = 0 holds for a zero u: NN32 is the curator's question: the probe's state lands, walk's answer pinned in an XXX test. microGPT changes no line, and its quick checks under walk stay 7 of 7. The gather applies A, then T, builds the specification once for T's text, and runs the 52 team demos on the merged tree. `ant testSpecData` runs in the gate as landed.

### Before the launch

The coordinator:

1. **The Fable review of this record** (`references/batch.md`, "The go"), its changes in place; his go is in advance (19:0x UTC on 2026-11-09).
2. **The generator,** made as "The generator" above gives it, and committed; its checks run on this record as reviewed: `python3 -B explorations/compile-ladder/plan-29b/manifest/lists29b.py`, every key matching one place on the base; `gen29b.py`; `check29b.js` on a scratch splice; `check29b.js --write`; `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script; the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`.
3. **The base build:** `/home/user/fortress-base30` at `dd00743d9e`, kept from the probe, if `git diff --stat dd00743d9e <base> -- . ':!explorations'` prints nothing; else a new one at the base by the manual's "Before the launch", step 2. Its trial seed and the old code's run, step 3.
4. **The disk:** `df -P /home/user`, its Available column at or above the script's floor, 7 G for two rungs (section 2, "Before the batch runs"); before the launch, the main tree's old `tmp/gate-batch-*` and `tmp/gather/` scratch cleared. `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`, and the gather the demo driver.
5. **Check-ins** armed for the run's length, about 6 hours 30 minutes, 45 minutes apart (the night's twelve, `<scratchpad>/batch29b/checkins.txt`).

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 2>', baseBuild: '/home/user/fortress-base30'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch29b/launch-args.json`, since a resume needs them.

### The gate, and what it should show

The comparands are climb batch 29's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, `#crash none`), in `compile-ladder/climb-batch-29/gate/`.

- `testSystem`: 813, the comparand's (203, 203, 201, 206), to about 819 with the patch's walk tests (the probe's 207, 205, 202, 205), and A's walk guards.
- `testFast`: the compiler track 1,506 to about 1,515 with the patch (PROBE `8. The gate`), and A's compiled tests, about 6 more; the library track 86 with fork A7's two tests in place of the patch's two deletions; the other-compiler track 263; the misc track as landed plus A's unit test class, `NumeralFoldJUTest` at 9 with the patch's nine assertions rewritten.
- `testSpecData`: as landed; T adds no example.
- The four-thread atomic runs: unchanged; no rung changes a program's start-up (fork A6).
- The ladder: no rung declares a move; none of its 85 files writes a numeral type or a coercion (PROBES, probe 3), and the eighteen microGPT components compile as before.
- The checker count: 0, reported, not declared; the distance: 0, `#crash none`, reported and never red (P-39). A changes what both read, so a site is to be traced to one of A's edits.
- The 52 team demos at the gather, each reaching its end (F-283).
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30), as the probe measured on the patch's code.

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`.

- **Filed by plan:** none.
- **Closed (A):** 969, 970, 961, 968, 318, 362, 972, and 957 if fork A5 lands. Each with its test, the commit in `HEAD` first.
- **Rewritten, each row's whole new line in A's `record.md`:** 957 if fork A5 does not land, 960, 962, 963, 966, 513, 971.
- **New (A):** `u = 0` and its kin under walk (Q1); the classes of fork A8 left, if any; a prelude coercion that fork A1's fragment does not fold, if any.

### After the landing

- **The landing report**, and the routing of every item for the curator into PLAN.
- **PLAN:** the three lines on climb batch 29's forks F5, F6 and F7 for the names batch (`coordinator/PLAN.md:72-74` at `bbebc267e1`) answered by A: the compiled four numbers before the switch-over, no pairs, a numeral at `QQ` folded as at every number type once the compiled path has `QQ`; item 75 (fork C6, a negative numeral at a program's type) answered by the sign rule; new lines: Q1 under "Pavol's answers, in the order they are needed"; the compiled fold of the one library's own coercions, which fall within fork A1's fragment by their text, checked at the switch-over; row 971 beside the switch-over's start-up work.
- **The review queue:** items 449 (rows 957, 961 and 968 with the rebuild), 450 (the class of a place at a program's generic type), 462 (a numeral as a `typecase`'s selector, which keeps its own type, now `NaturalNumeral[\…\]`), 470 (`=/=` over `Any`, beside Q1), 473 (`Literal[\v\]`, not built, fork A4 and T's text) and 477 (fork N3, `Numeral` below `Number`) answered or reworded at the landing; this record's forks A1 to A8 and T1 to T3 as new items, by the `coordinator` skill's "The go".
- **FACTS:** see "For the record-landing workflow".
- **The skill writer's task** with the sentences below.
- **The post-batch review.**

### For the record-landing workflow

- **P-173** says that a place fixes a type when its declared type has a coercion from the numeral type, "or is a numeral type"; P-174 rules the second out, since a numeral type is written only as a coercion's or an operator's parameter type, and the patch refuses a binding at a numeral type on both paths (PROBE `1. Where the snapshot`). The record writer brings P-173 in line; the batch edits no POSITIONS entry.
- **P-174's** last sentence, "Rows 969 and 970 hold the tree's run-time numeral with its four numbers as fields", and **P-176's**, "Rows 969 and 970 hold where the tree departs", once the two rows close.
- **FACTS made false:** F-79 (the numeral types as value objects whose fields are the four numbers, with `=` pairs); F-342 (`IntLiteral` and `FloatLiteral` written only as a parameter's type, and a `nat` read as a value a `ZZ32` with no word of a numeral type's four numbers, which are `ZZ`); F-345 (the specification states the field numerals, which T replaces); F-169's last sentence, where it names `IntLiteral` in the revised text; F-57, F-73 and F-74 where they name `IntLiteral` on the compiled path; and the facts A hands over.

### For the skill writer: the sentences of `fortress-repo` this batch makes false

The batch writes no skill text. After the landing, the record-landing workflow's skill writer brings these in line (each at `bbebc267e1`):

- `SKILL.md`, "Fortress as a language", "Static parameters": "a `nat` or `int` parameter used as a value is a `ZZ32`": a numeral type's four numbers, read as values in a coercion's body, are `ZZ` (P-40, P-174).
- `references/revival-changes.md`, "Numbers", "A numeral converts where it stands":
  - "Both lie below `Numeral`, a sibling of the number types under `Number`, and hold the numeral's exact value.": the types hold no value; the four numbers are their static parameters, and no numeral value exists when a program runs.
  - "Until the switch-over, the compiler's prelude names them `IntLiteral` and `FloatLiteral`.": the prelude declares the same `NaturalNumeral` and `RadixPointNumeral` (P-37's exception).
  - "A place fixes a type when its declared type is a numeral type, or has a coercion from the numeral type": a numeral type fixes nothing; it is written only as a parameter type.
  - "A `nat` or `int` parameter used as a value is a `ZZ32`, so `u: NN32 = n` is refused (P-173, P-40).": the four numbers of a numeral coercion are `ZZ`.
- The same section, the paragraph "Write a numeral type only as the parameter type of a coercion or an operator.":
  - "A program's own number type receives a numeral through its own `coerce(x: NaturalNumeral)` or `coerce(x: RadixPointNumeral)`. Its body reads the numeral's getters `digits`, `fractionDigits`, `radix` and `digitValue`.": the coercion is generic over the four numbers, `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])`, and its body reads `n`, `r` and `v` as `ZZ` values; there are no getters.
  - "Until the switch-over, a compiled program writes `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)`.": a compiled program writes the same generic coercion.
  - "The coercion gives one value for each place where the numeral is written, and each run of that place reuses it.": true; the type's `-` on a negative constant runs with it, and a place at a program's generic type is one value too.
- The same part, "`Number` declares nothing (P-165)": "Each of the eight number types, and the two numeral types, declares its own `asFloat` into `RR64`.": the numeral types declare none.
- `references/interpreter.md`, walk's departures from "Numbers": "A numeral with a radix point keeps only one of its leading zeros, so its `digits` getter gives 2 for `00.5`" (no getter; row 960's digit count); "`u =/= 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32` ... Write `NOT (u = 0)`." (with the pairs gone, `u = 0` is `false` under walk too, Q1); "A negative constant, as `-3` or `5 - 8`, at a program's own number type reaches its `coerce(x: NaturalNumeral)` with its sign" (row 968 closes).
- `references/compiler.md`: "It runs a program's own `coerce` from a numeral once for each place ..., except at a generic type (below)." (a generic type without a type variable at the place is one value too, and the coercion may be another component's); "At a program's own generic type, a numeral's coercion runs at each evaluation (ledger row 957)." (closes, or narrows to a place at a type variable, fork A5); "A negative constant at a program's own number type reaches its coercion with its sign, as -3 (ledger row 961)." (closes); "As a `typecase`'s selector, a numeral keeps the type `IntLiteral`" (its own numeral type now, row 963).

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [POSITIONS-history.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS-history.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [CLIMB-BATCH-29.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-29.md), [climb batch 29's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-29-review.md), [climb batch 29's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-29/gate/summary.txt), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-29b/PROBES.md).
- The design and the probe: [the design snapshot](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md), [the probe's brief](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/postmortem-2026-11-09-numerals/probe-brief.md), [the probe's report](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-30/probes/draft-numerals.md), [its patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-30/probes/draft-numerals.patch), [the Working Draft's literals.tex](https://github.com/palimondo/fortress/blob/main/Specification-1.0-frozen/basic/expressions/literals.tex).
- Code: [FortressLibrary.fsi](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fsi), [CompilerBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss), [CoercionDesugarer.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala), [IntegerLiteralFoldingVisitor.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java), [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [GraphRepository.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java), [MainWrapper.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java), [Numerals.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java), [NoNewlineHeader.rats](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/parser/NoNewlineHeader.rats), [gate-functions.sh](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/tools/gate-functions.sh).
- Specification: [literals.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/literals.tex), [constant.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/constant.tex), [numbers.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic-lib/numbers.tex), [binary.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced-lib/binary.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
