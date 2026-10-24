<!-- This is the evidence map for the phase-3-exit review of the curator's decisions, for the Fable judge who rules on it; the coordinator commits it at `explorations/reviews/phase3-exit/decisions-evidence.md`. Written 2026-10-24 by an Opus evidence worker, reading only: no build, no run, no edit, nothing measured. Read from `main` at `9ddf068fd`, whose code (`Library/`, `ProjectFortress/`, `Specification/`, `build.xml`, `bin/`) is climb batch 22's landing `2bff2fe23` (`git diff --stat 2bff2fe23 9ddf068fd` over those paths is empty). It maps every POSITIONS entry on the language, the library, the specification and the implementation: the earlier reviews' verdicts and what was done with them, what changed since, his words, what landed, the designers' word, the library's way and the other ways. It also maps the defaults landed in his stead since 2026-10-23, the review queue's consequential items, the new tensions, and the open points that a decision now settles. It holds evidence, not verdicts. It recommends nothing beyond what the cited evidence states. -->

# The curator's decisions at phase 3's exit: the evidence

## 0. How to read this

### 0.1 The question

- His message of 2026-10-24T11:36:23Z (verbatim via `explorations/coordinator/curator-profile/show.py`), the part this map serves: "what I worry about next is that we made decisions that are stored as my positions that bends the library or the repo against the original intentions by the designer ... So before we go to next phase, maybe it would make sense to reevaluate again and maybe correct some decisions that I did ... I think that has a higher priority than starting the climb of batch 23." His "Yes." of 13:56:43Z approved this map and its Fable judgement (`explorations/coordinator/BOOT.md`, "Running").
- His earlier message, which opened the 10-23 review (2026-10-23T08:08:00Z): "I was just like going by vibes of what I saw in other languages ... I suspect I did some unoptimal decision bending the original designer's intent".
- Why now: a change today reaches only walk and the checker. At the switch-over the compiled tests, the code generator and microGPT's compiled build start to read the one library (P-37; PLAN, phase 4).

### 0.2 The standards

- **The three principles** (`.claude/skills/coordinator/SKILL.md`, "The curator's role and decisions"): the team's later word (P-26); the library as the team wrote it (P-27); and what peer languages do. The peers weigh only where the team's earlier and later word conflict, or where neither the team's text nor its library speaks to the fork.
- **Consequential** (the same section): a decision that reverses, bends or reads anew a decision of his; touches microGPT's lines, speed or readability; chooses among ways the record does not settle, where the principles split or are silent; or cannot be undone.

### 0.3 What this map does not redo

- For an entry that has not changed since 2026-10-23, the 10-23 evidence map holds his words and the designers' word in full. Here such an entry has a short status line with a pointer.
- Another worker audits the distance's zero at the same time: what the checker counts, and every library change made to clear a checker error. Where a fork below is such a change, this map cites the record and not that audit.

### 0.4 Abbreviations

- **J0929**, **E0929**, **R0929**: `explorations/reviews/decisions-review/judgement.md`, `evidence.md` and `popl-recheck.md`.
- **J1023**, **E1023**: `explorations/reviews/type-decisions-review/judgement.md` and `evidence.md`.
- **CB21**, **CB22**, **CB23**: `explorations/coordinator/CLIMB-BATCH-21.md`, `-22.md` and `-23.md`.
- **R21**, **R21b**, **R22**: `explorations/reviews/batch-21-review.md`, `batch-21b-review.md` and `batch-22-review.md`.
- **PLAN:N**: line N of `explorations/coordinator/PLAN.md` at `9ddf068fd`.
- **rq N**: item N of `explorations/coordinator/review-queue.md`.
- **row N**: a row of `explorations/fortress-gap-ledger.md`.
- **App I**: `Specification/appendices/changes.tex`.
- **WD**: the Working Draft, `Specification-1.0-frozen/`.
- **Types**: `Documentation/Specification/Prose/Language/types.tick`.
- **`a874948ac`**: the team's last commit.
- His words are cited by UTC time. Each one quoted here that is not in E1023 was read verbatim with `show.py`.

### 0.5 The marks

- **[reason: P-n]**: the entry's stated reason is another decision.
- **[reason: peers]**: the stated reason, or his reason, came from peer languages.
- **[not followed]**: the record shows that he did not follow the question when he answered, or later did not recall the decision.

Section 10 gathers the marks.

## 1. What changed since 2026-10-23

- **POSITIONS.** Four entries changed, all on 2026-10-23, each by the coordinator (POSITIONS-history, lines 3044-3086):
  - P-156 was added at 07:10Z, then rewritten at 12:38Z (CB21's question 2) and at 12:46Z (question 1).
  - P-157 was added at 07:10Z and rewritten at 13:05Z, which reversed it.
  - P-155 was rewritten at 07:10Z and at 13:05Z, as pointers only.
  - P-146 was rewritten at 13:05Z.
  - No block is dated later. `git diff 28b6e27a0 9ddf068fd -- explorations/coordinator/POSITIONS.md` changes those four lines only (`28b6e27a0` is J1023's commit).
- **Three batches landed**, with the distance from 5 to 0 and the count from 3 to 0, '#crash none', every operator checked (F-53, F-281):
  - climb batch 21 (rungs S, X, B, N), `c53063bbd`;
  - climb batch 21b (C, E, D), `32242b80d`;
  - climb batch 22 (E, R, T), `2bff2fe23`.
- **New FACTS:** F-277 to F-286.
- **New probes:**
  - `perf-probes/self-type-exclusion/` (A1, for P-157);
  - `perf-probes/condition-zeroindexed/`;
  - `perf-probes/codegen-distance/`;
  - `perf-probes/export-abstract-codegen/` (row 816).
- **Waiting on him** (BOOT.md, "Waiting on him"):
  - the go for phase 4's first batch, with phase 3's end at its default;
  - CB22's question 1 (row 816);
  - the distance in phase 4's gates;
  - the code-generation probe's question;
  - P-154's row-774 wait;
  - "the type-decisions items (P-75 withdrawn, P-154's reason, the `AnyIntegral comprises ... where` probe for row 487, row 701 as a PLAN line, P-156's "Why")".
- **Batch 23** is held at his word of 2026-10-24T11:36Z. Its record is drafted and Fable-reviewed (CB23; BOOT.md, "The go").

## 2. The earlier reviews' verdicts, and whether each was acted on

### 2.1 2026-09-29 (J0929 section 6; R0929 section 3)

1. **Row 330, `floor` on a float.** Acted: P-68, his words at 2026-09-29T15:18:44Z (E1023, P-68). Not built: row 330, a rung after the switch-over.
2. **Row 447, the written `extends Object` bound.** Replaced by R0929 section 1.8, the bound and never `Bottom`. Acted: P-48, F-78, F-84 (E1023 section 3.1, tension 7).
3. **The implicit bound `Any`.** Acted: P-42.
4. **Row 508, the checker's attempt order.** Acted: P-49. Two of the four attempts are an agent's (F-78; rq 2, before the switch-over).
5. **Size the switch-over and probe the natives.** Acted: `perf-probes/prelude/natives-shape.md` and `natives-binding-probe.md` (PLAN, phase 4, first line). PLAN's phase 4 still says "Not yet designed as briefs" (PLAN, phase 4, last paragraph). CB23 drafts its first batch.
6. **The array questions in parallel.** In part: `reviews/array-design-ways.md` section 8. Forks 2 and 3 were built at defaults (F-151, F-270; rq 31, rq 30). The width, decision D and decision A wait for phase 5 (P-85; rq 37).
7. **Walk's choice of coercions.** Acted: P-59.
8. **The `IntLiteral` warning.** Acted (E1023 section 3.1, tension 12).
9. **`NN32` into `RR64`.** Decided as P-75 (2026-09-29T14:10:36Z) and not built. J1023 V7 reverses this recommendation. Not acted on (section 2.2, change 6).
10. **The team's demos.** Acted: P-79; climb batch 21b's rung D runs all 52 under walk (F-283). Left: row 817 and row 731's demo half.
11. **The goal's wording.** Acted: P-7 names "the team's Working Draft of February 2011".
- **R0929's three cheap changes** (the instance rule, the `Bottom` binding, row 516's union): landed or recorded (J1023 section 8).

### 2.2 2026-10-23 (J1023 section 2 and section 4)

1. **Change 1: P-146's signature half read anew.** The exclusion test reads `self` as `C[\X\] & X`, and the reduction reads the bounds.
   - Acted: probe A1, then climb batch 21's rung X (`64fa505c4`; F-277); P-146 and P-157 rewritten at 13:05Z; App I rewritten (`changes.tex:4047-4055`).
   - Not acted: the two reasons that J1023 V1 says do not carry the signature half stand in P-146 and App I as the reasons that specificity and the Return Type Rule keep the plain type. They are the POPL 2019 matching assumption and the "18 errors of the Return Type Rule that the declarations do not make" (`changes.tex:4039-4046`; J1023 V1, point 4).
2. **Change 2: P-157 withdrawn if change 1 clears the 8.** Acted: his answer of 13:03:22Z and the rewrite at 13:05Z.
   - Probe A1 found the judgement's split wrong: "(i) alone clears 0 of the 8", not 4.
   - Its conclusion held: "(i) and (ii) together clear all 8" and "Nothing else moves" (`perf-probes/self-type-exclusion/REPORT.md`, "In short", "Against the judgement").
3. **Change 3: P-156 lands with three changes.**
   - (a) The checker's exclusion side made consistent: acted (CB21 fork 7; rung B).
   - (b) The tuple rule recorded as the revival's departure: acted in App I (`changes.tex:4124-4200`, its "Rationale"). Not acted in P-156's own "Why" (R21 Part 1, split 1, "Was he told? Not yet"; BOOT.md).
   - (c) `atMost` on his word: acted (CB21 question 2).
4. **Change 4: row 774's walk half waits, and the `Equality` line and the `=/=` row land.** Acted:
   - CB21 "Defaults already taken", 6;
   - rung N, `ff19305cc`;
   - F-280;
   - row 807.

   P-154's text was not updated to name the wait (PLAN:560: "P-154 is his text, so the wait goes to him as an ask").
5. **Change 5: P-154's reason corrected.** Not acted: P-154 is unchanged (BOOT.md).
6. **Change 6: P-75 withdrawn.** Not acted: P-75 stands, and rq 21 is needed before the switch-over (BOOT.md).
7. **Change 7: probe the team's `AnyIntegral comprises Integral[\I\] where [\I\]`.**
   - Not acted: no such probe is under `explorations/perf-probes/`, and F-121 is unchanged.
   - Its precondition, the `AnyList` crash, is repaired (row 809, climb batch 21b's rung C, `108ab82d6`).
8. **Change 8: row 701 is a prerequisite of the switch-over.**
   - Not acted. PLAN's `where`-clause line still places row 701 "after the switch-over" (PLAN:242), and BOOT.md lists "row 701 as a PLAN line" as an ask.
   - R22 section 6 calls row 701 "the first wall `fortress compile` meets in `FortressLibrary`".
   - CB21's question 2 added a declaration behind it (section 3, P-156).
- **J1023 section 7, "what would settle it":**
  - item 1 done (A1);
  - item 2 done (fork 7, measured in CB21 section 4);
  - item 3 not done (change 7);
  - items 4 and 5 wait (phase 5; row 364).

## 3. The entries made or rewritten since 2026-10-23, and the newest type entries

### P-155 **The compiled checker checks the overloads of symbolic operators before the switch-over.**

- **Decides:** the overloading check reads `+`, `^`, `||`, the subscripts and every symbolic operator before the distance can count zero. Each design the check needs comes to him first (POSITIONS P-155).
- **Earlier verdict:** J1023 V9 and section 6: "Finishes in substance; its ordering is his." Its consequence: two array-family designs decided before the array design. No change was advised.
- **His words:** 2026-10-20T11:52:00Z, "I'm leaning to option 2 before the switchover. Otherwise, we are just sweeping problems under the rug", against the ask's option 1, after the switch-over (E1023, P-155).
- **Since 10-23:**
  - The two rewrites only point to P-156 and P-157 (POSITIONS-history, 07:10Z and 13:05Z).
  - Built by climb batch 21b's rung C (`108ab82d6`; F-281; row 584 closed). With climb batch 22 the distance is 0 with every operator checked (F-53).
  - Its second sentence, "Today its overloading check reads an operator only if its name is a word of capitals ...", has been false since rung C. This is C.skeptic.1 (PLAN:571); the default: the sentence says the check is built. His text.
  - The export check still reads `isDeclaredName` (CB21 fork 13; `ExportChecker.scala:275`; row 782). So an api's top-level symbolic operators are not compared with the component. The zero rests on that skip (R22 section 6; PLAN:586).
- **Designers:**
  - WD `appendices/future.tex:198`: "The above overloaded declarations are not really a valid overloading."
  - The team's checker skipped symbolic names (row 584).
  - The team's comments on the export check's matching call it a "Heisenbug" (row 782, citing `ExportChecker.scala:289-310`).
- **Other ways:** the ask's option 1, the check after the switch-over (E1023, P-155).
- **Marks:** [reason: P-37], the zero that the switch-over needs.

### P-156 **A collection's index type extends `Index`, a trait that the ranges exclude, and a tuple of indices is an `Index`.**

- **Decides:**
  - Every index parameter is bounded by `I extends Index`; `ZZ32` extends `Index`, and `Range` excludes it.
  - A tuple of `Index` types is an `Index` "on both paths and in the specification".
  - S5 was weighed and not taken.
  - `Index` is declared `trait Index extends Any`, outside `Object`.
  - `BoundedRange` keeps its narrowed `atMost` under `where { I extends Index }`, which "after the switch-over the code generator's refusal ... stops it too" (row 701).
  - "Why: it is the team's own fix for this pair ..., its "magic" read as subtyping" (POSITIONS P-156).
- **Earlier verdict:** J1023 V2 and section 2, item 1: the bound finishes the team's wish; the tuple rule "is a departure from the designers' type text". It stands with three changes; section 2.2 above gives what was done.
- **His words:**
  - 06:37:29Z, on S5.
  - 06:46:53Z: "What is this magic? I need to understand ... now is a good time to teach me".
  - 06:49:32Z: "Option one is OK next question".
  - 06:57:47Z, whether `atMost` can stay (E1023, P-156).
  - Question 2, 12:36:55Z: "at most agreed with recommendation option 2."
  - Question 1, 12:46:05Z: "This is so much outside of my wheelhouse. I have no way how to compare the options, so I agree with your default. Let's go."
  - The history blocks of 12:38Z and 12:46Z record both.
- **Landed:** rung B, `153887360` (F-278).
  - The 124 subscript errors are gone and none came.
  - `trait Index extends Any end` (`Library/FortressLibrary.fsi:1269`). Only `ZZ32` extends it (fork 8). The library's `Index` is read by its qualified name (fork 6). The exclusion side is the dual of the subtype rule (fork 7; B.worker.4, PLAN:552).
  - A type that extends only `Index` is made an `Object` by the desugarer (B.worker.2, PLAN:551).
  - The checker refuses a tuple expression at a parameter of type `Index` (row 805; B.worker.1, PLAN:550). Walk loads a function over `Index` beside one over a tuple whose elements neither lie below nor exclude `Index` (row 806). A numeral is no `Index` to the checker (F-278).
  - App I's "The index type of a subscript" (`changes.tex:4124-4200`) states the tuple rule as "the revival's departure from the designers' text on tuple types". It quotes Types `:341` and `:424` and the team's "magic to convert".
- **microGPT:** PLAN item 61. The model's vocabulary is generic over an unbounded index parameter, which the checker refuses under the bound. The default: `[\I\]` to `[\I extends Index\]` in the vocabulary's declarations, in the first batch in which the checker reads microGPT, shown as a diff. The sites: `explorations/run-c4/src/FlatArrays.fsi:15-21`, `explorations/apl/mg/FlatArrays2.fsi:68-73`, `:126`, `AplMg.fsi:41`.
- **Designers:**
  - The wish: "We want to say that the type variable I extends a type, say, Index which either excludes Range[I] or is a supertype of Range[I]. However, we cannot say that because ... the arguments are passed as a tuple ... we need a magic to convert that tuple argument expression to something of type Index" (WD `appendices/future.tex:198-207`, read).
  - Tuple types: WD `basic/types-vals-vars.tex:214-215`, `:265`, `:272-273`; Types `:341`, `:424` (E1023 N1).
  - The specification's library declares `trait Tuple extends Any excludes { Object }` (`Specification/basic-lib/objects.tex:180-186`; CB21 question 1).
  - "The team never wrote `Index`" (CB21 question 1).
  - The team's library declares the narrowed `atMost` (`a874948ac`; CB21 question 2).
- **Library's way:**
  - "No trait of the library is outside `Object` but `Any` itself" (`FortressBuiltin.fsi:32`; CB21 question 1).
  - Method conditions where a member applies at some instances: `SumReduction`'s `distribute`s (`FortressLibrary.fss:3435-3437`; CB21 question 2).
- **Other ways:**
  - S5, `where { I excludes Range[\I\] }`: the team's open question "Type variables in `excludes` clauses" (`future.tex:209-212`), stopped by row 701.
  - W3, subscripts by a range only at fixed index types.
  - S2 and S4 (E1023 N1).
  - Question 1's options 2 to 4 and question 2's options 1 and 3 (CB21 section 2).
- **Marks:**
  - [reason: P-155], the check needs it.
  - [reason: P-56, P-77] for `BoundedRange`.
  - [reason: P-42] for `Index` outside `Object`.
  - [not followed]: the primer at 06:46:53Z, then "Option one is OK" three minutes later (E1023 section 2.4); question 1 at 12:46:05Z.

### P-157 **`Vector` and `Matrix` stay additive groups, and the overloading check's exclusion test reads the self type and the static parameters' bounds.**

- **Decides:**
  - The team's `Vector` and `Matrix` extend `AdditiveGroup`, and the revival's generic scalar block (P-88) stays beside them.
  - The exclusion test reads a self-typed `self` as `C[\X\] & X`, "the fact that P-146's extender rule guarantees", and its existential reduction reads the bounds (P-152). Specificity and the Return Type Rule keep the plain signatures.
  - "Why: it keeps both the team's library as written and the revival's block, and it was his first stance; taking vectors out of `AdditiveGroup` would have bent the team's design for a gap of the checker. Reading bounds is the POPL 2019 paper's own reduction" (POSITIONS P-157).
- **Earlier verdict:** J1023 V1 and section 6: "Bends: overrules the team's library for a checker gap"; section 4, change 2: withdraw it if A1 clears the 8. Acted (section 2.2).
- **His words:**
  - 07:09:03Z: "So you are saying that one of my extensions in the revival is a problem, and if I just revert that one, will be good ... If so, then agreed." This answer was on a misread premise, corrected at 07:11:16Z (E1023, P-157).
  - 13:03:22Z: "Yes, of course, option one. That was my original stance, so you talked me out of it this morning and the reason prevailed. Hooray. Go."
- **Landed:** rung X, `64fa505c4` (F-277).
  - The 8 pairs cleared with no library line (191 to 183 under the full check).
  - Fork 30: the bounds are read in the exclusion test's reduction only. A1's `global` variant also gave 183.
  - Fork 31: the solver's recursion on a parameter kept beside its F-bound is filed as row 803.
  - Fork 32: `tint` stays refused, row 786 `CONTESTED`.
  - Two side effects:
    - Row 713's pair is now accepted and runs on the compiled path, while walk refuses it (`CONTESTED`). PLAN:431 asks whether the refusal is restored.
    - Walk refuses a program's own vector-and-scalar pairs (row 804, `NEGATIVE-VERIFIED`, X.skeptic.3, PLAN:548). The library's own pairs load under walk only because walk's meet check skips symbolic operators (row 611; R21 Part 1, split 3).
- **Designers:**
  - The team's library: `trait Vector[\T extends Number, nat s0\]` at `a874948ac:Library/FortressLibrary.fsi:1459`, extending `AdditiveGroup` (J1023 V1, point 2). The current api keeps it (`fsi:1645-1646`, `:1757-1758`).
  - The team's scalar block was at `ZZ32` only (`a874948ac`, `fsi:2537-2540`, read). The generic block is the revival's (`02d09a39f`; F-156).
  - The 2011 paper's reduction: "The second premise binds C' to exactly the inference type variables and bounds denoted by the existential's type parameters" (`Papers/Types/exc-reduction.tick`, read).
  - The team's compiled self type, `comprises T` (`Library/CompilerAlgebra.fsi:16`, `:24`; `XXX10k.test`; J1023 V1, point 3).
- **Library's way:** the team's vectors as written. P-88's block is an extension with a precedent, `scale(t: T)` on `Vector` (J1023 section 6, P-27).
- **Other ways:** A2, vectors out of `AdditiveGroup`, the 07:10Z decision; A3, the scalar `+` and `-` dropped, which stops microGPT at `MicroGptFlat.fss:28` and `MicroGptApl.fss:42`; A4, not written (`perf-probes/symbolic-operators-2/REPORT.md` section 3.2).
- **Marks:** [reason: P-146] (the extender rule) and [reason: P-152] (the reduction).

### P-146 **In a self-typed trait, the compiled checker types `self` in the method bodies as also being the implementing type.**

- **Decides:** as before, plus "Only the overloading check's exclusion test reads `self` in a signature as `C[\X\] & X` (P-157)". The signatures keep the plain trait type "because the proofs of the POPL 2019 paper ... assume that no declared type holds a type parameter inside an intersection". "Why: ... by one rule that peer languages share" (POSITIONS P-146).
- **Earlier verdict:** J1023 V1 and section 6: the body half and the extender rule finish. The signature half "departs from the team's compiled idiom on a silence and an artifact". Acted in part (section 2.2, change 1).
- **His words:** 2026-10-13T23:32:10Z, "I'm still unclear on what the consequences are, but am hearing that option 1 is more in line with weak signal from repo and has precedent in other languages as well"; 23:37:34Z, "1." (E1023, P-146). The 13:05Z rewrite is the coordinator's, from P-157's answer.
- **Since 10-23:**
  - Climb batch 21b's rung C repaired the `AnyList` crash by reading, outside its trait, a self type whose `comprises` clause lists types at a `where`-clause variable as the trait type alone (`TypeAnalyzer.selfComprised`; F-281; row 809). R21b Part 1, split 3: "No decision names this reading. It is on no list." The rung justified it by P-60.
  - Climb batch 21b's rung D changed the team demo `trips.fss`. Its `generator` now extends `StandardTotalOrder[\generator\]` (CB21 fork 27; row 710 closed): team code changed to meet P-146's extender rule. The checker still refuses `trips.fss` for other reasons (row 817).
  - rq 212, the `Containment` widening, is needed before the switch-over (section 7.1).
- **Designers and peers:** E1023, P-146. App I cites the Scala Language Specification 2.13, section 5.1, and Naden, "only in bounds" (`justificationOfRTR.tex:626-630`; `changes.tex:4030-4038`).
- **Marks:** [reason: peers] ("one rule that peer languages share"; "Scala has the same rule"); [reason: P-44]; [not followed] (2026-10-13T23:32:10Z; and rq 212's widening, which at 2026-10-14T00:07Z he did not recall wording).

### P-152 **Walk and the compiled checker read the exclusion of two generic declarations over their whole parameter types, by existential reduction.**

- **Earlier verdict:** J1023 V10: it finishes (`Papers/Types/exc-reduction.tick`; POPL 2019 Fig. 6). Row 786 is where the checker fell short of the paper's reduction.
- **His words:** 2026-10-17T11:36:44Z, "Agreed. Only one option makes sense. The option one.", to an ask by the Haiku model. The reason was replaced unreviewed (rq 228; E1023, P-152).
- **Since 10-23:**
  - No text change.
  - The checker's reduction now reads the bounds in its exclusion test (F-277, under P-157). Walk's reading does not. So the two paths that P-152 says read alike now part at rows 713 and 804.
  - `tint` stays refused: `Box[\Bottom\]` is an instance of both domains (F-277; row 786).
- **Marks:** [reason: P-45, P-26]. The reason first put to him was the revival's own specification text (rq 228).

### P-153 **The integer power splits on the base.**

- **Earlier verdict:** J1023 V10 and section 6: it finishes the prelude's rule (`CompilerBuiltin.fsi:267`, `:326`, `:385`). "The record lacks his word on the premise", a record question. No action is recorded.
- **His words:** 2026-10-20T00:44:34Z, "Yes."; 05:56:19Z, "This is not how I recall the resolution to the power question" (E1023, P-153).
- **Since 10-23:** no text change.
  - Climb batch 22's rung E wrote the api's `RR64` power at `^(self, b:Number)` (`fsi:367`; rq 29).
  - Row 533's tie does not reproduce against the one library (E.worker.2, PLAN:592).
  - The compiled half waits for phase 4's natives (rq 214, routine, before the switch-over).
- **Marks:** [reason: P-43, P-76, P-80, P-26]; [not followed] (05:56:19Z).

### P-154 **A list is ordered only where its element type is totally ordered.**

- **Earlier verdict:** J1023 V4: it stands; "its recorded reason is wrong" (the incomplete traits are of 2007-2008, the live `List` of 2012). Change 5, correct the reason: not acted. V3: walk's half waits: acted as a default (section 2.2, change 4).
- **His words:** 2026-10-20T06:18:00Z, "Agreed. We are not designing a new trait at this point. It's nowhere on the critical path to compiling microGPT" (E1023, P-154).
- **Since 10-23:**
  - The text is unchanged. Its "Row 774: walk's half, since walk still gives every list an order" names no wait.
  - Landed: `List extends Equality[\List[\E\]\]` (F-280) and row 807 (rung N); revision notes at `algebraic-constraints.tex:519-522` and `opr-overview.tex:293-295` naming walk's departure (CB21 fork 11; R21's table).
  - The wait reads P-12 and P-59 (stated for coercion) as covering conditional extension: J1023 V3's reading, which the coordinator took as a default (CB21 "Defaults already taken", 6).
- **Designers:** split (J1023 V4).
  - The live `List` ordered every list (`a874948ac:Library/List.fsi:67`).
  - `LexicographicOrder`'s body needs ordered elements (`a874948ac:Library/FortressLibrary.fss:1735-1741`).
  - The incomplete traits bound the element by a total order (`Library/incomplete/advanced/Fortress.PartialTotalOrders.fss:117-140`).
  - The wind-down post wished for "conditional inheritance via where clauses" (`research/extracts/fortress-websites-wayback.md:124-126`).
- **Marks:** [reason: P-151, P-26]; the wait [reason: P-12, P-59], read by the judgement, not by him.

## 4. The non-type entries not judged since 2026-09-29

- **P-52 (`narrowToRange` corner by corner; 2026-10-09, item 50, row 657).**
  - Never judged. Taken as recommended (POSITIONS-history, P-52, line 564).
  - Specification: silent (row 657).
  - The team's `checkSelection` compared corners with `>` and `<` (`a874948ac:Library/RangeInternals.fss:127-139`), the tuples' lexicographic order. Its own `PCMP` is defined just above.
  - Built (F-91). Walk's printed values changed (R12's "Values walk prints that change", `reviews/batch-12-review.md:158`).
- **P-53 (`String`'s `left` and `right` answer `Just(c)`; 2026-10-09, item 42, row 606).**
  - Never judged. Taken as recommended (POSITIONS-history, P-53, line 570).
  - Specification: silent (row 606).
  - The library's way: its declared `Maybe[\Char\]` and the ranges' and lists' `left` and `right`.
- **P-58 (every native binding a `builtinPrimitive` naming a static helper; 2026-10-10, item 35).**
  - Never judged.
  - His words: 2026-10-10T05:27:34Z, "Item 35, agreed with recommendation, option 1." Later, 2026-10-22T22:02:17Z: "I don't recall my decision asking for static methods so I am unable to make fully informed decision from this fragment ... none of these were decisions of mine that must be turned into gospel."
  - Designers: the specification prints `builtinPrimitive`'s declaration and has no `import java` (`reviews/item35-natives-binding.md:16`, `:93`; `FortressBuiltin.fsi:14-29`). The team built `import java` for the compiler in 2008-2009 and "never moved the library's bindings off `builtinPrimitive`. Nothing says which they meant to keep" (`:86-87`).
  - Library's way: `builtinPrimitive` in every binding (`:92`).
  - Not built. Phase 4's first batch, which builds it, waits for his go (PLAN:588; CB23; rows 796, 309).
  - Bears on the switch-over: it is its first step (P-33).
  - **Marks:** [not followed] (10-22).
- **P-79 (every team demo kept running; 2026-09-29, 2026-10-20).**
  - Never judged as a decision.
  - His words: 2026-10-20T11:52Z, "I would prefer we maintain them all in running state as we are making changes in the unsealed tree" (rq 247).
  - Since 10-23: climb batch 21b's rung D ran all 52 under walk (F-283; rows 670, 710, 791, 449, 464, 468 closed), and it changed team demo code to fit revival rules:
    - `npbft`'s `Complex` leaves `Number` (fork 26);
    - `trips.fss`'s `generator` re-based (fork 27), and its own `MIN` and `MAX` removed, whose team comment "The following definitions work around problems that arose when I tried the typechecker." now names nothing (`trips.fss:64-65`; R21b split 8);
    - `aStar`'s `Self` renamed;
    - `GenomeUtil2d.fsi` added.
  - The entry's list is stale (PLAN:577). The compiled half is rq 247, row 817 and row 731's demo half.
- **P-124 (the specification's examples a gate step, all to pass; 2026-10-04).**
  - Never judged.
  - His words: "Yep. Option one." (2026-10-04T20:27:30Z; POSITIONS-history, P-124, line 2116).
  - F-114: 130 examples pass; five pass only because walk leaves an F-bounded parameter open (F-143).
- **P-91 (an object with no `asString` prints its bare type name).** J0929 D29: "a call, fine, with a stack overflow waiting at the switch-over". Unchanged. Row 321 stays open: once the compiled path reads the one library, every object inherits `Object`'s `getter toString` and overflows (P-91; PLAN, phase 4, "From the reviews"). Bears on the switch-over.
- **P-38 (the prelude's defects not repaired).**
  - The title is the 2026-10-13 consolidation's; rq 217 and rq 238 ask whether it is his rule.
  - Since 10-23, two prelude edits landed:
    - CB21 fork 15, rung C (`108ab82d6`): `GeneratorZZ32` extends `Equality`, excludes more types, and loses its always-false `=` in `Library/CompilerLibrary.fsi` and `.fss`;
    - rung E (`031c38bbc`): `CompilerBuiltin.fss:1170` `consume` gains `throws IOException`.

    CB21 fork 15 says "The prelude takes no new declaration".
- **P-67, P-69 to P-73 (the integer value rules).**
  - J0929 verdicts: D6, faithful (P-67); D8 and D10, a call and faithful (P-69); D7, faithful (P-70, P-71), a call (P-72); D9 and D11, faithful (P-73), with the saturating operators "with no plan line".
  - Since: row 797 holds the saturating operators (P-73). The compiled halves come with the names: `GCD` and `LCM` on `ZZ` (PLAN, phase 4); shifts (rows 381, 383, 442; P-38).
  - No change since 10-23. rq 20 (`widen`) is the same principle's open case (section 7.1).
- **P-95, P-96 (the revision form).**
  - J0929 D12: "a call, in the team's own layered form".
  - Since: App I's `revival-index` entry and the self-type rewrite.
  - Climb batch 21's gather corrected main-text sentences without the entry's Change and Original. The review blocked, the judge upheld, the repair wrote both (`6e8d7deab`; R21 split 6).
  - R.skeptic.1: App I's "the library does not route round a gap of the type checker" (`changes.tex:2470-2473`) is false at its general reading since rung R (PLAN:594, no default).
- **P-97:** J0929 D12; J1023 V5, finishes. Unchanged.
- **P-17 (unboxed doubles required):** J0929 D2, faithful. Unchanged; phase 6, decision B.
- **P-9, P-10, P-11 (the model's readability, the APL side quest, the 2D notation):** never judged as decisions. P-9's limit on model lines is P-87's. No change since.

## 5. The other type entries, judged 2026-10-23: status since

Verdicts are J1023 section 6's; words and the designers' word are in E1023 Part 1.

- **P-7, P-8:** finish. Unchanged.
- **P-25:** finishes. Its tuple sentences (Types `:341`, `:424`) are now quoted in App I's `revival-index`.
- **P-26:**
  - A call.
  - The sentence "The implementers' later word also outweighs unfinished text" is the coordinator's (rq 215).
  - It was "applied backwards" in P-154 (V4).
  - Unchanged.
- **P-27:** a call, narrowed by his later words (rq 216, 237, 50). Since:
  - CB22 fork 13 (`abstract` on nine of `String`'s api members) departs from the worker skill's rule (`.claude/skills/fortress-repo/references/library.md:44`; R22 split 1).
  - Rung R's written static arguments cite the library's own practice (R22 verdict on rung R).
- **P-28:** a wish. P-157's reversal keeps the only algebra the array traits have (J1023 section 4, change 2; F-152).
- **P-37:** finishes. The zero is reached (F-53).
  - The code generator refuses 58 declarations of the twelve components, 50 that the checker passes (F-34; R22 section 6).
  - Row 701 is the first wall (R22 section 6).
- **P-40, P-41, P-55:** finish. rq 30, 35 and 36 are needed before the switch-over (section 7.1).
- **P-42:** finishes. Since: CB21's question 1 puts `Index` beside `Any`, outside `Object`; a type that extends only `Index` is an `Object` (B.worker.2); rq 190, the specification's own `Tuple`.
- **P-43, P-97:** finish. rq 219, 220 and 241 are record questions on P-43's reason.
- **P-44:** finishes. Its comment is the clause that would close row 487 (V8). Not probed (change 7).
- **P-45:** finishes. "Walk and the checker must accept the same pairs" is "aspirational" (N5). Since, new divergences:
  - rows 804, 805 and 806;
  - row 713, which the checker now accepts;
  - the symbolic Meet Rule pair that the checker refuses and walk loads (row 611; R21b split 5).
- **P-46, P-49, P-50, P-51:** calls in the inference gap. rq 2 is needed before the switch-over.
- **P-47, P-98, P-57:** the library's own devices. Unchanged.
- **P-48:** finishes. Walk's rows 587, 591 and 612. New: row 825, an open type inside a generic type under walk (R.skeptic.2, PLAN:595; default today's behaviour).
- **P-54, P-68:** settled in his words. Since:
  - P-68's account "`round` and `truncate` are `ZZ64`, `ZZ` or `RR64` by declaration" is false for `RR64` (E.worker.1, PLAN:591; no default, his text).
  - CB22 fork 3 moved the component's `RR64` brackets from `ZZ` (P-68's target) to `ZZ64`, and `truncate` from `RR64` to `ZZ64` (`Library/FortressLibrary.fss:498`, `:500`, `:501`), until P-68's own rung (row 330).
- **P-56:** forced by P-77 with P-42. Since: question 2 keeps `BoundedRange`'s `atMost` under its condition.
- **P-59, P-12:** finish. J1023 V3 applies P-59's logic to row 774; N.worker.2 defers row 807's way to walk's static types, P-12 (PLAN:554). rq 232 asks what walk refuses after the switch-over.
- **P-60:** departs, recorded (V6). Since: rung C's row-809 reading rests on it (R21b split 3).
- **P-62, P-80:** finish. Unchanged.
- **P-66, P-74:** calls. Unchanged.
- **P-75:** contradicts P-74 (V7); withdrawal advised, not acted. rq 21 is needed before the switch-over.
- **P-76:** finishes. rq 245 (`RR32`).
- **P-77:** a call. Fork 8, only `ZZ32` an `Index`, follows it.
- **P-78:** a call. Since:
  - Rung R writes the static argument at the library's three sites (CB22 fork 17; F-285).
  - Row 731's checker gap stays for user programs and the demos (R.worker.1, PLAN:593).
  - rq 51 moved to the demos' probe.
- **P-84, P-85, P-87, P-88, P-89:** stand. rq 30, 31, 37, 229, 230 and 223. PLAN item 61 bears on P-87: the vocabulary's declarations, not model lines.
- **P-90:** finishes; its gate may never open (rq 224). Since: CB22 fork 4 removed `Just`'s and `Nothing`'s range subscripts from the api. The export probe had filed them under P-90, "which speaks of the bare `Nothing` only" (CB22 fork 4).
- **P-147, P-149:** finish. Unchanged.
- **P-151:** finishes. Row 701 is mandatory before the switch-over (V8; not acted). Since:
  - the `AnyList` crash repaired (row 809);
  - row 812: the code generator crashes before row 701's refusal on such a trait;
  - question 2 adds a method condition behind row 701;
  - rq 188 still acts against his option 3.

## 6. The defaults that landed in his stead since 2026-10-23

The zero audit holds each library edit's effect on the count. Here each default is listed as a decision taken in his stead, with what it touches.

### 6.1 Climb batch 21, run 1 (CB21 section 2; PLAN:544-565)

- **Question 1, `Index` outside `Object`.** Answered with the default, which he said he could not compare (12:46:05Z). Its cost, CB21: "a third exception to a rule of the language, by name".
- **Question 2, `atMost` under `where { I extends Index }`.** His recommendation-taking answer (12:36:55Z). Its cost: a declaration behind row 701.
- **Defaults already taken:**
  1. `|_|` repaired by `String`'s api header, which extends `DelegatedIndexed`.
  2. The `AnyList` crash repaired in run 2.
  3. `Float`'s `^` given its meet.
  4. The export probe's rounding question: first "settled by P-68, the coordinator's call", then replaced by CB22 fork 3 (PLAN:564).
  5. `Condition` against `Maybe`: way A+, the coordinator's call (PLAN:565).
  6. Row 774 out; `Equality` and the `=/=` row in.
- **Forks taken, grouped by what they touch:**
  - **A language or type rule:**
    - fork 5: under walk a program's own trait with a functional `||`, `|||`, `//` or `///` must now exclude `String`. Walk's verdict depends on the cache (row 342; R21 split 4).
    - forks 6 to 9: `Index` by qualified name; the dual exclusion; only `ZZ32`; the tuple rule recorded as a departure, against P-156's "Why" (R21 split 1).
    - forks 30 to 33: the bounds in the exclusion test only; row 803 filed; `tint` refused; `XXX` compile tests.
  - **Team library lines changed:**
    - fork 4: `String`'s four concatenation families made top-level operators, the library's device for juxtaposition (`FortressLibrary.fss:4476-4478`), avoiding the mixed family of rq 11 and row 545;
    - the api's six vector and matrix operators that the component lacks, removed;
    - `Float`'s `|self|`;
    - the index parameters of the generic indexed types;
    - `Array2`'s and `Array3`'s `subarray`, `Array3`'s `[:]`, `List`'s header (CB21 "Points the batch lists").
  - **Specification text:**
    - fork 9 (App I);
    - fork 11 (two revision notes);
    - gather.2: main-text sentences on `self` in signatures (`var-ref.tex:77-81`, `traits.tex:610-615`) and on `Index` beside `Any` and `Object` (`objects.tex:21-26`, `:163-164`; `overview.tex:1061-1065`), corrected under P-146, P-156 and P-157 (PLAN:556; default as landed).
  - **Process:** forks 1 to 3, 12, 21, 28, 29 and 34.
- **PLAN entries with a default:**
  - X.skeptic.3: row 804 filed as a walk gap rather than `CONTESTED` (PLAN:548).
  - B.worker.1: row 805 recorded, not repaired (PLAN:550).
  - B.worker.2: a type extending only `Index` is an `Object` (PLAN:551).
  - B.worker.4: the dual (PLAN:552).
  - N.worker.1: row 808's one-line fix waits for a later batch (PLAN:553).
  - N.worker.2: row 807's way waits for walk's static types (PLAN:554).
  - Item 46: the fused arm by `cast[\O0\]` (PLAN:563).

### 6.2 Climb batch 21b, run 2 (CB21 section 2; PLAN:567-580)

- **Forks 13 to 20, 22 to 27, 29, 34**, grouped:
  - **Rules:**
    - fork 13: `isDeclaredName` kept for the export check, row 782 latent;
    - fork 14: the double count fixed, row 810;
    - fork 16: compiled tests judged by the rules;
    - fork 17: walk's meet check left skipping symbolic operators, row 611;
    - fork 18: row 726 closed;
    - fork 20: 4i, an api member written `abstract` needs no matching definition, row 816.
  - **Library and prelude text:**
    - fork 15: the prelude's `GeneratorZZ32`;
    - fork 19: the 4h api text, 66 members written `abstract`;
    - fork 22: `Array2`'s subscripts in the api.
  - **Team demos:** forks 23 to 27.
- **Readings on no list** (R21b Part 1):
  - split 2: an abstract api field, `apis.tex:255` against `source-code.tex:381-383`, decided by rung E's decision 4;
  - split 3: the row-809 reading of a self type outside its trait;
  - split 4: C's speed pass against P-148's letter.
- **PLAN entries:**
  - C.skeptic.1: P-155's text (PLAN:571).
  - E.skeptic.1: row 816, which became CB22's question 1 (PLAN:572).
  - E.worker.1: a getter or setter satisfying an api field, a set of methods satisfying a method (`source-code.tex:393-403`). Default: as built, no probe, no row (PLAN:573).
  - D.worker.1: `trips.fss` under the checker waits as row 817 (PLAN:574).
  - P-79's stale list (PLAN:577).

### 6.3 Climb batch 22 (CB22 section 2; PLAN:582-600)

- **Question 1, row 816: taken at its default overnight, the reading as landed.**
  - **The fork:** may a component's trait leave out a member that its api writes `abstract`?
    - Reading (1), as landed: yes, no member is needed.
    - Reading (2): a member of the same header is needed, abstract or concrete, through the team's `ignoreAbstract` (`ExportChecker.scala:614-615`).
  - **The team's text splits:**
    - `apis.tex:252-256`: "a definition $d'$ with the same name as $d$ that includes definitions for all declarations other than the methods or fields declared abstract in $d$" (read). This reads as (1).
    - `source-code.tex:384-385`: "When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration" (read). This reads as still declaring, (2).
    - `apis.tex:250-251`: "A component must include, for every API A it exports, matching definitions for all the declarations in A" (read).
  - **The team's library:** `String`'s api wrote `abstract splitWithOffsets()` and `abstract split()` with no component member (`a874948ac:Library/FortressLibrary.fsi:2308-2309`, read; R22 split 1). That library was never compiled by the team's compiled path, which read the prelude (P-37; CB22 section 1, "The words this record uses").
  - **The worker skill's rule** goes the other way: "So declare each such member in the component too, at the api's header: a call of a missing one dies with `NoSuchMethodError`" (`.claude/skills/fortress-repo/references/library.md:44`; `references/compiler.md:74`).
  - **Measured by the planner on batch 22's text:**
    - under (2), the distance 1, an export error of 5 entries (`ReadableArray`, `ActualReduction`, `Range`, `String`, `AnyMaybe`) over 12 members, which the count would read too;
    - its zero needs a checker rung and 12 bodyless component declarations, not written (CB22 section 4, "Question 1's two readings").
  - **Measured by the probe** (`perf-probes/export-abstract-codegen/REPORT.md`, "In short", sections 1 and 5):
    - Under (1), a compiled client's call dies with `NoSuchMethodError` even where every object defines the member. The client's `invokeinterface` names the component's interface, which declares only the component's trait's members (`CodeGen.java:5089`, `:6799-6841`).
    - Of the library's 12 such members, 9 would die once compiled: `String`'s 7, `Range`'s `isEmpty` and `ReadableArray`'s `opr[_:TrivialOpenRange]`. Three resolve through a parent at the same descriptor.
    - A third way, a code-generator change of about 30 lines, closes 5 of 9 shapes. It leaves the bridge, the functional method and the absent member, "up to 4 rungs".
    - The probe's default: reading (2). The coordinator's draft ask recommends (2) (BOOT.md, "Waiting on him").
    - Walk is indifferent: it finds the method on the object (`DottedMethodApplication.java:61-64`).
  - **The zero of phase 3 holds only under (1)** (R22 section 6). Needed before phase 3's end is called and before the names batch (PLAN:587).
  - **No peer comparison** for this fork is on record.
- **Defaults already taken:**
  1. The fused arm's cast (row 632 closed).
  2. `Condition` by way A+, built as A++.
  3. The rounding call replaced by fork 3.
- **Forks 1 to 22**, grouped:
  - **Api lines removed or rewritten** (team lines; Part IV, the api rendered in the specification, loses six subscripts and four getters and renames four parameters):
    - fork 4: `Just`'s and `Nothing`'s range subscripts out, which the component moved to `Condition` in `28ecf5f0d`;
    - fork 6: the arrays' `opr[_:OpenRange[\ZZ32\]]` out, which "the component never defined; the team's api had them";
    - forks 5, 7, 8, 12: the api at the component's headers.
  - **The component at the api's type:**
    - fork 3: `RR64`'s rounding at `ZZ64`;
    - forks 9 to 11: `DelegatedIndexed`'s `size` and `generator`; the arrays' `bounds` and `zeroIndices`.
  - **Fork 13:** `String`'s nine written `abstract`, against the skill's rule (question 1).
  - **Fork 14:** one `excludes` text.
  - **Fork 15:** four bodies.
  - **Fork 17:** row 731's sites by the written argument. The zero is reached "with that checker gap open".
  - **Process:** forks 1, 2, 16 and 18 to 22.
- **Effects that no decision covers** (R22 Part 1):
  - split 4: two walk values moved, rows 824 and 825;
  - split 5: fork 9 moves a walk value in a program the checker refuses (row 735);
  - split 6: the checker's verdicts on clients move (`x^q` checks; `j[r]`, `Condition`'s `indices`, `j SQCAP u` refused).
- **PLAN entries:**
  - phase 3's end, default "done at this landing, with the three named beside it" (PLAN:586);
  - the go for phase 4, no default (PLAN:588);
  - the distance kept in phase 4's gates (PLAN:589; P-39);
  - the model's imports outside the distance (PLAN:590). CB23 measured them since: "31 errors, `System` 2, `File` 4, `FileSupport` 24, `FortressAst` 1, `FortressSyntax` 0" (CB23:44, :254-260);
  - P-68's text (PLAN:591);
  - rows 188, 283 and 533 not reproduced (PLAN:592);
  - R.worker.1 (PLAN:593);
  - R.skeptic.1 (PLAN:594);
  - row 825 (PLAN:595);
  - `PureList` (PLAN:596);
  - `rangeContains` out of bounds, no contract (PLAN:597).

### 6.4 FACTS entries that say a choice is a default

- **Since 10-23:**
  - F-282: the export check "asks no definition for an api member written `abstract`", "a zero that rests on the reading of `abstract` above (row 816)".
  - F-278: "a type that extends only `Index` is an `Object`" (B.worker.2).
  - F-281: `TypeAnalyzer.selfComprised` (row 809), a reading no decision names.
  - F-285: the written arguments (fork 17).
- **Before 10-23, still standing:**
  - F-73: the numeral tie reading "is a default".
  - F-76: coverage's narrower scope than P-60's "is a default".
  - F-78: two of the four attempts are "an agent's choice" (rq 2).
  - F-141: walk's instance rule "is the coordinator's call", with D3 and D5 "defaults of the walk-instance rung".
  - F-151: the arrays' bound, "the default that `reviews/array-fork2-judgement.md` recommended" (rq 31).
  - F-225: the `Containment` mixins, "a default of the coordinator's" (rq 212).
  - F-228: walk's join (rq 210).
  - F-239: walk's `Maybe` as an `if` condition, "a default, the coordinator's call at climb batch 16".
  - F-270: way 4a (rq 30).

## 7. The review queue (76 consequential items of 256)

The queue's counts are in `review-queue.md`, "When each item is needed".

### 7.1 Needed before the switch-over

Ten consequential items, and three routine items that touch the switch-over:

- **rq 2, the checker's second and fourth attempts at a call.**
  - Asks: keep the two attempts an agent added to P-49's two. Default: as landed (four).
  - Evidence: F-78; `Functionals.scala:733-737`. The designers' inference chapter is a stub (F-169). The coercion chapter's order is "first determine whether there exists a declaration that is applicable without coercion" (WD `conversions-coercions.tex:454-462`; J0929 D25).
  - The other way refuses calls whose untyped function argument only the expected type fixes (row 507).
- **rq 20, `widen` of a `ZZ` too large for `ZZ64`.**
  - Asks: keep the low 64 bits, as walk does, or raise `IntegerOverflow` by the general sentence (WD `opr-overview.tex:154-155`). No default on record.
  - P-72's precedent keeps the low bits for `narrow`, from the team's `UnsignedTest.fss`. The natives bind `widen` (row 502).
- **rq 21, `NN32` into `RR64` against P-74.**
  - Asks: build P-75 one of three ways, each changing a decided behaviour (row 575). Default: not built.
  - J1023 V7 advises withdrawing P-75. Designers: the WD's general sentence (`conversions-coercions.tex:64-66`) against the prelude's none (J0929 D16).
- **rq 30, way 4a, a size known only at run time.**
  - Asks: it "reads his decision on sizes anew". Default: as built (F-270).
  - Ten library calls hang on it, and row 682. The POPL check finds the judgement stands (`reviews/array-judgements-popl-check.md` sections 3 and 7).
- **rq 35, row 446, a call above a sized declaration's domain.**
  - No default. The compiled run dies with a Java exception where the declaration reads its size.
- **rq 36, the dead sizes, row 41 (the linker) and walk's unknown size.**
  - The other 9 dead sizes and row 41 come with the switch-over's design.
  - P-40: the 17 operators' fix "finishes the team's own fix of 2008, which removed those sizes from the component only".
- **rq 39, a generator's size (PLAN item 45).**
  - Default: the judgement's ways, a counted `|self|` on `Generator`, a new api declaration (F-93).
  - Designers: in 2007-09-13 (`98d4cda94`) Maessen moved `size` from `Generator` to `Indexed`. The judgement reads this as removing "an obligation on every generator, not the idea that a generator can be counted" (`reviews/generator-size-judgement.md` section 2.1).
  - The other way deletes three size bodies of the library.
- **rq 212, `Containment` mixins and P-146's reach.**
  - Default: the coordinator's widening, built (`1c32ccffd`).
  - Under P-146's text the team's 2009 mixins (`Library/Containment.fss:42`, `:57`, `:66`) would be refused at the switch-over.
  - The other ways: (a) refuse them; (b) edit two team lines.
  - [not followed]: 2026-10-14T00:07Z.
- **rq 229 and rq 230, P-85: does the third question wait, and what "the whole prep for the arrays" covers.**
  - Defaults: it waits; "plain explainers".
  - His words: 2026-09-22T05:21:45Z, "I think we should do the whole prep for the arrays".
- **rq 108 (routine).** The one library's strided `:` returns a range, which is no generator (rows 661, 514). The switch-over meets it.
- **rq 194 (routine, "kind: ... consequential").** The APL port's first compile error since climb batch 19's rung S. Its other way changes a line of microGPT's APL program.
- **rq 214 (routine).** The compiled integer powers follow P-153 only when phase 4's natives bind `^`. It was "not put to him" (rq 214's text).

### 7.2 The other consequential items that bend the library or the language, or read a decision anew

Grouped by theme. Each gives what it asks, its default, its evidence and its point.

- **The checker's typing:**
  - **rq 3:** a statically chosen declaration keeps its inferred instance, against POPL's rule. Default: the sentence; before microGPT compiles.
  - **rq 175 to 178:** conditional extension's condition and members. Defaults: as ruled and repaired; the scoping later. Peers: "Swift, Rust and Haskell scope such members" (rq 178). Before row 773's rung.
  - **rq 4, rq 5:** joint solving; `try` and `atomic` contexts. Never.
- **Overloading:**
  - **rq 6:** the closed-trait Meet case for generic families. The text has it; the checker refuses it. Before microGPT compiles.
  - **rq 9 with rq 192:** `tint` and exclusion through a bound. The checker reads bounds since P-157 and still refuses `tint`. Appendix I says "not settled".
  - **rq 13:** the approved `comprises` check decides by names.
  - **rq 228:** P-152's reason.
  - **rq 7, 8, 10, 11:** never.
- **Walk:**
  - **rq 15:** which `comprises` clauses walk checks.
  - **rq 232:** what walk refuses after the switch-over (P-12); before Q-walk.
  - **rq 18, 19, 210:** walk's choices. rq 210 "reads past the letter" of P-48.
- **Numbers:**
  - **rq 22:** `Number` keeps one `=`, against route A's "no catch-all operators" (P-43). Before microGPT runs fast.
  - **rq 23:** may a program extend `Number`? The team's test says "We ought to be able to extend the builtin type Number" (`tests/extendNumber.fss:15`). The library closed it.
  - **rq 24:** NaN. Two specification passages disagree (`opr-overview.tex:287-288` against `numbers.tex:372-376`).
  - **rq 25:** ℚ's infinities.
  - **rq 27, 28:** numeral exactness.
  - **rq 29, rq 277:** the model's numeral powers. Row 533 no longer reproduces.
  - **rq 219, 220, 241:** P-43's reason, not his words.
  - **rq 245:** `RR32` from `IntLiteral`.
- **Sizes and arrays:**
  - **rq 31:** the arrays' element bound `Number & MultiplicativeRing`. Astra's reason (b) is live: a copying function such as C4's `gather` needs only `Number`. Before microGPT compiles.
  - **rq 37:** the width, decision D, decision A.
  - **rq 32, 34:** size equality; where an oversized size is refused.
- **The library:**
  - **rq 188:** `AnyList`'s bodies kept, against his option 3 of P-151. "The skill brings [it] to him at once as a hold".
  - **rq 213:** the tuple comparisons, whose yes "did not see its costs".
  - **rq 216, 237, 50:** P-27's breadth. Before microGPT compiles.
  - **rq 224, 246:** the bare `Nothing`. Before row 774's walk rung.
- **The specification:**
  - **rq 41:** a `where` variable in `extends`.
  - **rq 190:** `extends Any` read as `Object`, against the specification's own `Tuple`. The other way: "as the team's code did and Scala's universal traits do" [peers]. Since question 1 this bears on `Index` (section 8, T6).
  - **rq 215:** P-26's sentence.
- **Demos:** **rq 247:** "kept running", under walk or also compiled.
- **Code generation:**
  - **rq 44:** `override` in the code generator.
  - **rq 217, 238:** P-38's title, which climb batch 21b's two prelude edits bear on.
- **Record questions on applied defaults:** rq 268 to 276. These are POSITIONS text that was "applied ... without his review of each change" (rq 268 to 276), among them P-49's attempts moved to F-78 (rq 273), way 4a moved to F-270 (rq 274) and P-60's coverage condition made a requirement (rq 276).
- **rq 223:** P-87's diff rule, not his words. Before microGPT compiles.

### 7.3 Left out, as how the work is run

rq 45 to 49.

## 8. The tensions

### 8.1 The 10-23 list (E1023 section 3.2), now

- **N1, the tuple rule:** landed as a recorded departure in App I. P-156's "Why" is unchanged (T1).
- **N2, P-157:** resolved by the reversal. Its walk residue is T5.
- **N3, the POPL boundary:** kept for specificity and the Return Type Rule. The exclusion test reads the intersection (T8).
- **N4, the `where` forms:**
  - the `AnyList` crash repaired (row 809); row 812 found;
  - question 2 adds a method condition (T7);
  - rows 773 and 774, and rq 188, still open.
- **N5, walk against the checker:** wider: rows 804, 805, 806 and 713; the symbolic meet pair (R21b split 5); row 825.
- **N6, `BoundedRange`:** `atMost` kept under its condition (T7).
- **N7, P-75 against P-74:** unchanged.
- **N8, root reasons not his:** unchanged (rq 215 to 220, rq 223).
- **N9, the two `NOT YET` clauses:** the `AnyIntegral` probe is not run. Its precondition is met.
- **N10, P-60's uniqueness against POPL's Theorem 4.1:** unchanged.
- **N11, P-153's premise:** unchanged.
- **N12, P-48 run by neither path where it differs:** unchanged, plus row 825.

### 8.2 New since 2026-10-23

- **T1. P-156's reason against Appendix I and the designers' tuple text.**
  - P-156: "it is the team's own fix ..., its "magic" read as subtyping".
  - App I `revival-index`: "The tuple rule is the revival's departure from the designers' text on tuple types"; "They asked for a conversion".
  - WD `types-vals-vars.tex:214-215`, `:265`, `:272-273` and Types `:341`, `:424` forbid it.
  - R21 Part 1, split 1: the landed text "is the better reading of the team's sources; the decision's sentence is his". Not yet put to him.
- **T2. Row 816's reading against a compiled client's run, and against the worker skill.**
  - Reading (1) is F-282, CB21 fork 20 and CB22's question 1 at default, and the zero of phase 3 holds only under it (R22 section 6).
  - Against it: the probe's 9 of 12 library members that die once compiled; `library.md:44`; `compiler.md:74`; `source-code.tex:384-385`.
  - With P-37: after the switch-over the compiled path reads this library.
  - With P-27: the team's own `String` api wrote two such members, in a library the team never compiled.
- **T3. P-155's reason against the export check's skip.**
  - P-155: "A zero with them unchecked would hide known errors".
  - The export check still reads `isDeclaredName` (`ExportChecker.scala:275`; CB21 fork 13). Admitting the symbolic names grew 'Missing declarations' to 165 entries "of names spelled alike: a defect of the check" (row 782; R22 section 6). The zero rests on the skip.
- **T4. Rung R's written arguments against Appendix I's stated principle.**
  - Fork 17 writes `BIG MIN[\ZZ32\]` and `<|[\E\] ... |>` where the checker cannot infer them (F-285).
  - App I's "the library's own practice is the standard, and the library does not route round a gap of the type checker" (`changes.tex:2470-2473`) is false at its general reading (R.skeptic.1).
  - For fork 17: P-78's workaround and the team's own `transpose` (`List.fss:504`).
  - Row 731's gap stays for user programs and the demos, which P-79 and rq 247 owe.
- **T5. P-157 on the checker against P-45 and P-152 on both paths.**
  - The checker accepts the vector-and-scalar shape and row 713's pair. Walk refuses both (rows 804, 713).
  - The library's own pairs load under walk only because walk's meet check skips symbolic operators (row 611). CB21 fork 17 kept that skip.
  - P-45: "Walk and the checker must accept the same pairs". P-152: "Both paths read such a pair as excluding".
- **T6. `Index` outside `Object` against the traits rule as built.**
  - Climb batch 19's rung S made a type that extends `Any` alone an `Object` on both paths (row 743; CB19 `:135`), the default of rq 190.
  - CB21's question 1 excepts `Index` by its qualified name, while a type that extends only `Index` is an `Object` (B.worker.2).
  - The specification's `Tuple extends Any excludes { Object }` is not excepted (rq 190).
  - The team's code read `extends Any` as written (rq 190's other way).
- **T7. Methods with a `where` clause against row 701's place.**
  - Question 2 (`atMost` under a method condition) and P-151's `distribute`s and `AnyList` header are three declarations the code generator refuses (CB21 question 2; row 701).
  - PLAN places row 701 "after the switch-over" (PLAN:242). J1023 change 8 and R22 section 6 call it the switch-over's first wall.
- **T8. P-146's stated reasons against P-157's exclusion test.**
  - P-146 and App I keep the POPL matching assumption and the 18 errors as reasons for plain signatures (`changes.tex:4039-4046`).
  - J1023 V1 found that neither reason carries the signature half.
  - App I now limits both reasons to specificity and the Return Type Rule (`:4047-4055`).
- **T9. P-154's text against the coordinator's wait.** The wait for row 774, "until walk runs the checker (P-12) or row 364 is fixed", is a reading of P-59. P-154 names no wait (PLAN:560).
- **T10. P-38 and P-37 against two prelude edits.**
  - Climb batch 21b changed `CompilerLibrary`'s `GeneratorZZ32` (fork 15) and `CompilerBuiltin.fss:1170` (rung E).
  - P-38's title: "The compiler prelude's defects are not repaired". P-37: "no declaration is added to the compiler's prelude".
  - rq 217 asks whether the title is his.
- **T11. P-68's target against CB22 fork 3.** The component's `RR64` brackets moved from `ZZ` (P-68's target) to `ZZ64` until row 330's rung (`fss:498`, `:500`). P-68's account of today is false (E.worker.1).
- **T12. P-79 against team code changed and the compiled half.**
  - Demos were rewritten to fit P-146's extender rule (`trips`, fork 27) and route A's closed `Number` (`npbft`, fork 26).
  - `trips.fss` is still refused by the checker (row 817).
  - P-79's list is stale (PLAN:577).
- **T13. P-33's phase-3 exit against the distance's scope.**
  - P-33: "the compiled checker reports no error on the interpreter's whole library". F-53 covers twelve components.
  - CB23's report-only run found 31 errors in the library components that microGPT imports outside the twelve (CB23:44, :254-260).
  - This is the zero audit's ground; the record is cited here only.
- **T14. The api as the contract against forks 4 and 6.**
  - `apis.tex:250-251` makes the component match the api.
  - CB22 forks 4 and 6 removed api declarations that the component never built, and Part IV loses them. R22's verdict on rung E: "in the spirit of `apis.tex`'s rule and P-27".
- **T15. Rung C's row-809 reading against P-146's signature rule.** Outside its trait, a self type with a `where`-clause `comprises` is read as the trait type alone, justified by P-60. No decision names it (R21b split 3).

## 9. Points the designers left open that a decision now settles

This continues E1023 Part 4, whose items 1 to 22 stand. Item 13 there is now partly settled by P-157, and item 11 by P-156.

23. **Where `Index` stands against `Object`.** The team never wrote `Index`; the specification's `Tuple` stands outside `Object`. Settled by CB21's question 1, at the default.
24. **Whether `BoundedRange`'s narrowed `atMost` survives the bound.** No team text on it. Settled by question 2.
25. **How an api member written `abstract` is matched.** `apis.tex:252-256` against `source-code.tex:384-385`. Settled by CB22's question 1 at its default; row 816 is `CONTESTED` with `design limit (specification)`.
26. **An abstract field in an api.** `apis.tex:255` against `source-code.tex:381-383`. Settled by rung E's decision 4 (R21b split 2).
27. **A getter, setter or set of methods satisfying an api member.** `source-code.tex:393-403`. Settled as built, no probe (PLAN:573).
28. **Exclusion through a static parameter's bounds in the checker.** Settled by P-157 and F-277: row 713 is accepted, `tint` is not. App I's "Passages not yet revised" was rewritten (R21 split 2).
29. **The self type in the overloading exclusion test.** Settled by P-157 (E1023 Part 4, item 2).
30. **A self type read outside its trait.** Settled by row 809's reading.
31. **Which of `Condition` and `Maybe` extends `ZeroIndexed`.** The team's api and component disagree. The team's later commits (`28ecf5f0d`, `2f26aeded`, 2008) are on the component's side. Settled by way A+ (PLAN:565).
32. **`RR64`'s rounding types where the team's api, component and `Float` differ.** Settled by CB22 fork 3, pending P-68.
33. **`rangeContains` on a range outside the receiver.** The text is silent. Default none (PLAN:597).
34. **An open type inside a generic type under walk.** The text is silent. Settled as today's behaviour (row 825, PLAN:595).
35. **A tuple expression at a parameter of type `Index`.** Recorded, not repaired (row 805).

## 10. The marks, gathered

- **The stated reason is another decision:**
  - P-155 (P-37);
  - P-156 (P-155; P-56 and P-77; P-42);
  - P-157 (P-146, P-152);
  - P-146 (P-44);
  - P-152 (P-45, P-26);
  - P-153 (P-43, P-76, P-80);
  - P-154 (P-151; the wait, P-12 and P-59);
  - from E1023 section 2.2: P-56 (P-77), P-75 (P-74), P-47 (P-46, P-43), P-49 and P-51 (P-46), P-50 (batch 11's ruling), P-57 (P-37's zero), P-90 (P-43), P-147 (P-60);
  - the defaults: question 2 (P-151's method condition); CB22 fork 3 (P-68's account); fork 17 (P-78's workaround); rung C's row-809 reading (P-60).
- **The reason came from the peers:**
  - P-146 ("one rule that peer languages share"; Scala);
  - P-66 (Swift, Rust, Julia, X10);
  - P-89 (`fill`);
  - P-54 (Python's and Julia's `floor`);
  - P-151 ("all the peers do it", 2026-10-16T12:35:52Z);
  - P-69 ("as in every peer language", "as Swift's and Julia's shifts do");
  - P-74's promotion (Julia's rule, J0929 D16);
  - rq 178 (Swift, Rust, Haskell);
  - rq 190's other way (Scala's universal traits);
  - P-149 states the other way ("We are not bending Fortress the Scala way").
  - The coordinator skill widened P-149's rule on peers (E1023 N3).
- **The record shows he did not follow, or later did not recall:**
  - New: P-156 (06:46:53Z primer, then 06:49:32Z; question 1 at 12:46:05Z); P-157's first answer (07:09:03Z, misread premise, since reversed); P-58 (2026-10-22T22:02:17Z).
  - From E1023 section 2.4: P-44, P-45's walk clause, P-46, P-48, P-50, P-56, P-57, P-60, P-98, P-146, P-147, P-153.
  - The applied defaults of rq 268 to 276, of which he said at 2026-10-22T22:02:17Z "none of these were decisions of mine that must be turned into gospel".
  - rq 212 (2026-10-14T00:07Z).

## 11. Counts

- **POSITIONS:** 83 entries. Mapped here: 72.
  - 7 in depth (section 3);
  - 17 in section 4;
  - the rest in section 5.
- **Left out as how the work is run:** P-19, P-29, P-30, P-32, P-33 (cited only for its exit wording), P-39, P-102, P-103, P-125, P-148 and P-150.
- **Changed since 2026-10-23:** P-146, P-155, P-156, P-157.
- **The earlier reviews' advice:**
  - 2026-09-29: 11 items. Acted 8; in part 2 (items 5 and 6); not acted 1 (item 9, which the 10-23 judgement reversed).
  - 2026-10-23, section 4's 8 changes: acted 4 (1 in part, 2, 3 in part, 4); not acted 4 (5, 6, 7, 8).
- **Defaults since 10-23:**
  - CB21: 2 questions answered (one at the default he could not weigh), 6 defaults already taken, 34 forks.
  - CB22: 1 question at its default, 3 defaults, 22 forks.
  - PLAN's three review lists: 50 entries.
  - FACTS: 4 new entries that state a default, and 9 older ones.
- **The review queue:** 76 consequential items. 10 are needed before the switch-over, plus 3 routine ones mapped there; 5 are process, left out.
- **Tensions:** the 12 of 10-23 re-read, and 15 new (T1 to T15). **Open points settled:** 13 new (items 23 to 35).