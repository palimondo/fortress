<!-- The clarity check of chunk p7 of POSITIONS (P-79, P-80, P-84, P-85, P-87, P-88, P-89, P-90, P-91): each rewritten entry against the record's text and the audit's evidence, and the cold reader's answers against the source meaning, with each failure classed and a wording proposed. -->

# The clarity check, chunk p7

Read: `proposals.md`, `clean.txt`, `cold-read.md`, `concepts.md` and `proposals.apply` in this folder; `entries.py` for the nine entries; the scout reports, judgements, corrections and takeaways of chunks c6 and c7 and of the trial; his messages through `show.py` (block at the end); the coordinator's texts of 2026-09-19T18:24:23.475Z, 2026-09-21T21:53:45.883Z and 2026-10-20T11:57:46.972Z from the transcript parts; gap-ledger rows 299, 321, 331, 363, 670, 710, 731 and 791; F-11, F-21 and F-67; PLAN (phase 3 item 19, phase 4, phase 5, "Pavol's answers" item 13, "Off the path, parked"); review-queue items 30, 112, 167 and 229; `reviews/default-rendering-judgement.md` section 5; `reviews/spec-refused-examples-judgement.md` section 8; `Specification/basic-lib/numbers.tex:57-72`; `Specification/advanced-lib/numbers-advanced.tex`; `Library/FortressLibrary.fsi` (the array traits, `check`, `check_star`, `fill`, `tabulate`); `Library/FortressLibrary.fss` (the scalar-extension block); `explorations/run-c4/src/FlatArrays.fss` (`Diag`); `ProjectFortress/tests/TabulateRungA.fss:44-47`; `git show 5ad4a9957`.

Summary. One entry passes (P-89). Two have a fidelity failure: P-79 broadens row 731 beyond its condition, and P-91's marker sentence, made concrete, lets a reader put the Java class name into `asDebugString`, which no source decides. P-79 also carries an open question that neither the writer nor the audit asked: on which path a demo must run. The other six keep their meaning and fail on wording, and on a few concepts the reader lacked that belong to every worker.

## P-79

**Fidelity.**
- "and the reductions with no written static argument, which get no instance under P-48's bound rule, so the compiled checker refuses them (row 731)". Row 731 is narrower: the compiled checker fixes a generic big operator's static parameter "by its bound or the expected type only, never from the clauses: one whose bound names the parameter, as `SUM`'s, `PROD`'s and `BIG MIN`'s do, has no instance, and the reduction is refused". Its notes say that a plain-bounded one does get its instance since climb batch 14's rung A (`InferBigOperatorExpectedType`). The rewrite drops the condition "whose bound names the parameter" and so claims every reduction without a written static argument is refused. The writer's own source line has the condition ("a big operator whose bound names its parameter no instance"); the entry lost it. The record's text, "the static arguments a reduction needs under P-48 (row 731)", made no such claim.
- "Every team demo is kept running" with the list: his words are "maintain them all in running state as we are making changes in the unsealed tree" (11:52:00.829Z) and name no path. The list mixes walk's failures (rows 670, 791) with the compiled checker's (rows 710, 731), and row 710 says that walk "loads and runs" `trips.fss`. The coordinator told him of `trips.fss` at 11:57:46.972Z without saying that only the checker refuses it; he did not contest it. So a reader can conclude that a demo must also pass the compiled checker, which his words do not show. The record's text has the same list, so this is inherited, but the rewrite now spells out the checker for two rows, and the takeaway already noted that "Which path the demos run on is context the reader lacks". The writer wrote "Questions for the curator: none."
- The rest holds. The example matches `5ad4a9957` (its message: "the demos BiCGSTAB, BiCGSTAB2 and npbft write a float base, 10.0^(-k)"), and P-153 is what made `10^(-4)` raise. The feature clause is his "But if we arrived at a point where we needed that for the switchover, built it and can now demo work again, we should." Rows 670 and 791 are rendered fairly. "Candidates for the next batch" is what PLAN item 19 holds ("Batch 21, not drafted. Its candidates"), though it goes stale when batch 21 is drafted without them.

**Comprehension.** The reader took the rule, the same-batch rewrite, the feature clause and the work still owed correctly, and took the list as owed, not done, which fixes the takeaway's drift. It could not tell which path "running" means (above). It read "each demo that fails today is to be respelled where the way is known: [list]" two ways, as the failures with a known way or all of today's failures; the source is PLAN item 19: a measurement first, then a rung "for those with a known way", and the list is what is known today. It did not know the self-type rule, nor what "get no instance" means.

**Failures.**
1. Fidelity, a dropped condition (row 731). Wording: "and the reductions that write no static argument for a big operator whose bound names its own parameter, such as `SUM`, which the compiled checker gives no instance and so refuses (row 731); the repair writes the argument." This also removes "under P-48's bound rule", which the reader could not parse.
2. Uncertain fidelity: the path. Only he can settle it. Question for the curator: "P-79 keeps every team demo running. Does that mean running under walk, or also accepted by the compiled checker? `trips.fss` runs under walk and only the checker refuses it (row 710); row 731's reductions are a checker refusal too." Until he answers, wording that shows each row's path without deciding: "`trips.fss`, which walk runs but the compiled checker refuses, since its `generator` object extends `StandardTotalOrder[\trip\]` without being a `trip` (row 710)". This also replaces "the compiled checker's self-type rule", a concept the reader lacked that only this entry uses.
3. Wording: "So the demos known to fail today are to be respelled where the way is known: ..." in place of "each demo that fails today", since the measurement is still owed (PLAN item 19).
4. Wording (optional, length allowing): name the five, "`GenomeUtil1z.fss`, `GenomeUtil2a.fss`, the two `BirdCount` demos that import them, and `npbft.fss`" (row 670), and give the timing line, "`t / 1000000000.0` with `t` a `ZZ64`" (row 791).

## P-80

**Fidelity.** Holds. The title and the kept chapter are his "Option 1, agreed. But let's make sure we clearly record uh, the original design" (2026-09-26T11:38:29.550Z) to the 11:21:27.012Z ask. What the types are, and `NN32`/`NN64` set apart, come from that ask, which he took. The getters are right: `check` gives `Just(x)` for a finite value, `check_star` for a value that is not a NaN (`numbers.tex:69-72`; `FortressLibrary.fsi:313-316`). The return is P-62's last sentence ("a rung tries to bring back"). A precision note that needs no change: the 18 rational types refine ℚ, ℚ* and ℚ# by sign (`numbers-advanced.tex:65-82`), so "subtypes by sign, such as positive ℚ" is fair, under "such as".

**Comprehension.** The reader took the decision, the run-time tests, the kept chapter and the machine types right. It could not tell whether their return is decided or only an attempt, read "Their return is P-62's" two ways, and asked what "Built." covers.

**Failures.**
1. Wording: "an attempt brings them back" reads as a return that succeeds; his word is "when we get to covariant that we try this". Proposed: "Their possible return is P-62's: once the `covariant` keyword is built, a rung tries to bring them back as covariant static parameters."
2. Wording (optional): "Built: the chapters' rewrite and the callout (F-168)." The getters were the library's already (P-80's scout, section 2).
3. Concept, covariance: the core says that generics are invariant, and nowhere that the team's `covariant` keyword is future work. Define it in the `fortress-repo` core, "Static parameters": "the team's 2012 `covariant` keyword is future work (P-62)". The reader of P-80 needs only that much; how a sign subset becomes a covariant parameter belongs to P-62.

## P-84

**Fidelity.** Holds. The narrowing to `RR64` is the question he answered, "Storage: boxed objects or Java `double[]`? Default `double[]`." (the coordinator's 18:24:23.475Z, question 1, beside question 2's "the float storage"); his reason stays general after "Why:", "If this should have been high performance language, it cannot be boxed." "One design" and "not put off behind a first store" render the rejected layered default of question 4 ("sizes as fields in the storage now, sized `Vector` and `Matrix` types over it when the `nat` fork lands"), as the judgement reads it. The state lines are the judgement's: F-67 for the checker, P-85 and F-11 for the store.

**Comprehension.** The reader took the storage, the sizes in the types and the rejected layer right. It could not tell whether size checking is built or only the parameters; read "a first store" two ways; and, across P-84 and P-85, could not tell whether decision A decides how `double[]` is reached or whether it is reached.

**Failures.**
1. Wording: "Built: the compiled checker checks `nat` static parameters (F-67)." F-67's title says exactly that.
2. Wording: "The sizes do not wait while a first version of the store carries them only as run-time fields; that layered plan was rejected." in place of "put off behind a first store".
3. Wording, in P-84 and P-85 alike: "decision A is what puts `double[]` under a float vector" can read as the decision whether to. The record's text says "how". Proposed in P-84: "among them decision A, the way the `double[]` store goes under a float vector (P-85)"; in P-85: "Decision A is how the `double[]` store goes under a float vector".

## P-85

**Fidelity.** Holds. "Open, with no default" is his "Row 40: close as no decision taken." (2026-09-25T23:36:16.868Z); the return after the switch-over and the preparation are his 2026-09-22T05:21:45.608Z, "like I am fine with delaying the array work after the switchover to the library. But at the same time, like I think we should do the whole prep for the arrays." The exception follows the takeaway's fix and review-queue item 30 ("Way 4a lets the checker read such an argument as a size fixed for that call"); PLAN calls 4a "the judgement's default", built "while his answer is pending". His 2026-10-09T15:10:56.122Z ("So I don't know what we do with the array fork two and three. Whether that can go into the next batch.") is why fork 3 was taken up; the way is not his, so "It is not the curator's answer" is right. The audit's two questions stand (review-queue item 229 holds the first). "The compiled path's design for arrays" matches `array-design.md`'s header, "the array representation on the compile path".

**Comprehension.** The reader took the three questions, the rule on preparation and the exception right. It could not tell how the three questions relate to A, B and D; what the preparation covers (the audit's question 2, which only he can settle); whether way 4a is in the tree; and what "the unsized `Array`" is.

**Failures.**
1. Wording, the pointer: PLAN numbers its items per section, and phase 3 has its own item 13 ("Batch 15"). Proposed: "(PLAN, "Pavol's answers, in the order they are needed", item 13: the array forks)", and "that item's fork 3" below.
2. Wording: say that the questions are not the decisions: "These three questions are apart from decisions A, B and D: ..." PLAN item 13 holds A as fork 6 and D as fork 5, and B only in phase 6.
3. Uncertain fidelity, "the whole preparation": settled only by him; the audit's question 2 stands. No change.
4. Concept, the record's state words: "built" (in the landed tree), "Still to build:", and a default that an agent landed and that waits for the curator's review. P-79, P-84, P-85, P-88 and P-91 use them, and the skill defines none. Define them in the `fortress-repo` core, "The record", beside the review queue that `concepts.md` already proposes.
5. Concept, the library's array traits: the unsized `Array[\T,I\]`, the sized `Array1` to `Array3`, `Vector` and `Matrix`, and `ReadableArray1` above `Array1` and `ImmutableArray1`. P-84, P-85 and P-88 use them; `references/library.md` names none of them. Define them there.

## P-87

**Fidelity.** Holds. The operator rule and its example are his 2026-09-19T18:13:00.524Z, "NO. NO! NOOOOO! That’s not Fortress!", to the `planeSum(mask, ...)` rewrite of the mask line. The diff rule keeps its wording, and its seed is his "And if we found a minimal fix for the C4, like just show it to me." (18:02:13.648Z); the audit's question 1 stands. Decision D and phase 5 are his "Yes. Agree with recommendation." (2026-09-27T19:34:10.747Z). What D gives follows `decision-d-diff.md`, section 1, and the patch's place is `84aef6a4f`'s removal of `reviews/decision-d-diff/`.

**Comprehension.** The reader took the notation rule, the ban and the diff rule right. It read "Nothing of it" two ways (decision D, or any model-line repair); could not tell whether decision D is approved; and could not tell whether phase 5 comes after the switch-over.

**Failures.**
1. Wording: "Nothing of decision D is applied before PLAN's phase 5, where microGPT compiles, after the switch-over."
2. Wording: give D's state, which P-85 and PLAN item 13's fork 5 hold: "Decision D, still open and returning after the switch-over (P-85), is such a diff: ..."
3. Concept, PLAN's phases: `concepts.md` already proposes PLAN for the `fortress-repo` core with its phases. Its definition should also say that PLAN numbers items per section, so a pointer names the section (P-85, failure 1).

## P-88

**Fidelity.** Holds. The six operators and `Diag` are his "Okay, agreed. That is the plan." (2026-09-24T18:30:37.463Z) to the 18:25:56.634Z ask; the shape is his 18:13:14.832Z, "there is this promise that with these strong types, you can define like a diagonal matrix with is a type of matrix." The `ReadableArray2` sentence stays by his page comment of 2026-10-21, 23:29 UTC (`positions-audit/evidence/curator-comments-2026-10-21.md`: "I read it as a recording of my additional position that we wish to write readable array to. So like a read-only matrix. So I would not delete it."), which supports "is wanted". "Which `Array2` would extend as `Array1` extends `ReadableArray1`" is what "under `Array2`" meant: `Array1` extends `ReadableArray1` (`FortressLibrary.fsi:1591-1593`). The writer's question on the shape is grounded: `perf-probes/immutable-arrays/REPORT.md:140` proposes a standalone `ImmutableArray2`, "not a `ReadableArray2`/`ReadableArray3` above both kinds".

**Comprehension.** The reader took the six operators and the diagonal right. It asked "13 to 54 times as high as what?"; whether `ReadableArray2` is decided and who files its row; why `ReadableArray2` is in this entry; and whether the first two parts are built.

**Failures.**
1. Wording: "Gap-ledger row 299 records what the general product costs on a diagonal: 13 to 54 times as much as scaling the rows." (row 299: "same numbers at 13-54× the cost of a row-scaling" product).
2. Wording: the link to the diagonal is his own reason, "Because our diagonal is basically read-only" (18:25:08.391Z): "Since the diagonal is read-only, a read-only matrix trait, `ReadableArray2`, ..., is wanted".
3. Wording: the state of the first two parts, which the record's text never gave: "Built: the six operators left to the library, and `Diag`'s `mul`." The override landed after the probe passed (`405a31b0e`, for the note line), row 299 names it as its workaround, and the vocabulary files declare none of the six (P-88's scout, section 2).
4. Wording (minor): one name for the block, "the library's scalar-extension block", in the title and the body; the block's own comment is "Scalar extension".

## P-89

**Fidelity.** Holds. His "Agreed, tabulate." (2026-09-26T12:17:35.442Z) took an ask that gave the reason, so "Why:" is fair. `fill(v)` filling with a function value is `TabulateRungA.fss:44-47` (`array[\ZZ32->ZZ32\](2).fill(fn ...)`); `tabulate(f:I->E)` and `fill(v:E)` are at `FortressLibrary.fsi:1443-1444`. "On the library's arrays" scopes "Built." to the one library; the compiled prelude's `ZZ32Vector` still declares `fill(f)` (`CompilerBuiltin.fsi:577-579`), and the prelude goes at the switch-over, so no change.

**Comprehension.** Matches; the reader found nothing unclear.

**Failures.** None. Pass.

## P-90

**Fidelity.** Holds, and the gate keeps its meaning while the audit's question 1 stands. The title is his "Maybe’s empty case, keep team’s paramedic speaking. Document the future work gate on where clause availability." (2026-09-21T21:20:29.106Z), with the specification from his S2 yes. "Neither path implements" is F-21. The proposal's gloss is `spec-refused-examples-judgement.md`, section 8.

**Comprehension.** The reader took the spelling, the future work and the parked proposal right. It could not tell what "before then" points to; set "neither path implements" against `references/compiler.md`'s "It compiles a declaration whose `extends` entry has a `where` clause"; and was unsure of "gate".

**Failures.**
1. Wording, without touching the gate's meaning: "and it is not tried before such a clause is built." His "gate on where clause availability" fixes the antecedent.
2. Wording and concept: the entry's `where` form is not the conditional `extends` entry that `compiler.md` says the code generator compiles. Name it by F-21's example: "it needs a `where` clause that binds a type variable of its `extends` clause, as in the specification's `object Nothing extends Maybe[\T\] where {T extends Object}`, which neither path implements (F-21)". The concept, the two `where` forms, is for `references/compiler.md` at that sentence, since P-151 and P-154 meet it too.
3. Wording: the entry defines the bare `Nothing` as "one object with no static argument", then calls the inference proposal a gate for "the bare form", but that proposal keeps the generic object and only lets a program leave out the static argument (section 8: "so that `= Nothing` where a `Maybe[\String\]` is expected means `Nothing[\String\]`"). Proposed: "A proposal to reach the bare spelling by inference instead, so that `Nothing` written where a `Maybe[\String\]` is expected means `Nothing[\String\]`, is parked (...)."

## P-91

**Fidelity.**
- "A debug marker, such as the Java class name that the curator first leaned to, goes in `asDebugString` instead." The sources make the marker's place conditional and leave its content open. The coordinator's ask he took: "The debug marker you had in mind has a home already: Fortress has a separate `asDebugString`, which the interpreter prints as "a Box: Box". That is where a fallback marker belongs, not in the user-facing rendering." The judgement: "If a marker is still wanted, put it in `asDebugString` on both paths rather than in `asString`", and it restores walk's article `asDebugString` on the compiled path. Naming the Java class name as the marker that goes there, with no "if still wanted", lets a reader put `<class ...$Box>` into `asDebugString`, against the "Still to build" line, which says `asDebugString` prints as walk's does. The cold reader saw exactly that conflict. The record's text ("The debug marker he had in mind goes in `asDebugString`") was vaguer, so the rewrite made the conflict visible rather than creating it; but it states more than the sources decide.
- The rest holds: the title and examples are his yes of 2026-09-22T04:45:52.849Z to the judgement's default ("`Box`, `Box[\ZZ32\]`, `Pt`; no marker, no identity hash"); the lean is his "Leaning 2, as these are debug messages in my mind" (21:26:46.253Z); rows 363 and 321 and the PLAN line are rendered from their texts.

**Comprehension.** The reader took the printed form, both paths, and the two compiled-path items right. It read the marker sentence against the `asDebugString` item two ways (above); could not attach "where it reaches every object..." or tell why every object would meet the overflow; and asked whether walk's side is built.

**Failures.**
1. Fidelity, a dropped condition, settled by the coordinator's ask and the judgement. Wording: "A debug marker, such as the Java class name that the curator first leaned to, belongs in `asDebugString` if one is still wanted, never in the printed form; walk's `asDebugString` prints `a Box: Box`."
2. Wording: give row 321's reason for the reach: "...which overflows the stack (row 321). Once the compiled path reads the one library, whose `trait Object` declares a `getter toString`, every object with no `asString` meets it (PLAN, phase 4, "From the reviews")." Row 321: "Blocks adopting walk's `trait Object`, which declares `getter toString`".
3. Wording (optional): "Built: the printed form on both paths (F-123)." before "Still to build", if the record's form allows it; the audit moved "Built" out only because it left out row 363.

## Concepts beyond `concepts.md`

| Term | Entries | Where to define it |
|---|---|---|
| The record's state words: "Built." (in the landed tree), "Still to build:", a default an agent landed that waits for the curator's review | P-79, P-84, P-85, P-88, P-91 | `fortress-repo` core, "The record", beside the review queue |
| The library's array traits: `Array[\T,I\]` unsized, `Array1` to `Array3`, `Vector`, `Matrix`, `ReadableArray1` above `Array1` and `ImmutableArray1` | P-84, P-85, P-88 | `references/library.md` |
| The two `where` forms: a clause that binds a type variable of an `extends` clause (refused on both paths, F-21) and a conditional `extends` entry (compiled) | P-90 (and P-151, P-154) | `references/compiler.md`, at "It compiles a declaration whose `extends` entry has a `where` clause" |
| The `covariant` keyword as future work | P-80 (and P-62) | `fortress-repo` core, "Static parameters", after "Generics are invariant" |
| PLAN numbers items per section | P-79, P-85, P-87 | the PLAN row of `concepts.md` |

## His quotes

HIS 2026-10-20T11:52:00.829Z | Yes. Rewrite these demos to make them work, since we know how.
HIS 2026-10-20T11:52:00.829Z | Now generally I would prefer we maintain them all in running state as we are making changes in the unsealed tree.
HIS 2026-10-20T11:52:00.829Z | But if we arrived at a point where we needed that for the switchover, built it and can now demo work again, we should.
HIS 2026-09-26T11:38:29.550Z | Option 1, agreed. But let's make sure we clearly record uh, the original design and can when when we reintro when we get to covariant that we try this. Let me try to resurrect this.
HIS 2026-09-19T18:32:48.384Z | I don't know we can sidestep the net NAT uh, issue. That is a central design point that they are using.
HIS 2026-09-19T18:32:48.384Z | If this should have been high performance language, it cannot be boxed.
HIS 2026-09-25T23:36:16.868Z | Row 40: close as no decision taken.
HIS 2026-09-22T05:21:45.608Z | like I am fine with delaying the array work after the switchover to the library. But at the same time, like I think we should do the whole prep for the arrays.
HIS 2026-10-09T15:10:56.122Z | So I don't know what we do with the array fork two and three.
HIS 2026-09-19T18:13:00.524Z | NO. NO! NOOOOO! That’s not Fortress!
HIS 2026-09-19T18:02:13.648Z | And if we found a minimal fix for the C4, like just show it to me.
HIS 2026-09-27T19:34:10.747Z | Yes. Agree with recommendation.
HIS 2026-09-24T18:30:37.463Z | Okay, agreed. That is the plan.
HIS 2026-09-24T18:25:08.391Z | is there immutable version of the matrix? Because our diagonal is basically read-only.
HIS 2026-09-24T18:13:14.832Z | there is this promise that with these strong types, you can define like a diagonal matrix with is a type of matrix.
HIS 2026-09-26T12:17:35.442Z | Agreed, tabulate.
HIS 2026-09-21T21:20:29.106Z | Maybe’s empty case, keep team’s paramedic speaking. Document the future work gate on where clause availability.
HIS 2026-09-22T04:45:52.849Z | yes,  row 27 close per default-rendering-judgement recommendation.
HIS 2026-09-21T21:26:46.253Z | Leaning 2, as these are debug messages in my mind
