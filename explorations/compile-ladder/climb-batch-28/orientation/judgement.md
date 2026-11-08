<!-- The orientation workflow's judgement of climb batch 28's update, update mode: install or no change for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz. Two sections install: "Numbers" (P-161's rule that an integer converts by a checked getter or by a low-bits function) and "Dispatch and overloading" (the fix round's "because" in the Meet Rule paragraph); no section is held. Also: the lint hit at line 93 and how the install clears it; the sizes and the size exception; what the install needs; findings on unchanged text, for the next update. Read on `main` at `f5aa647de`, where `revival-changes.md` is the admission's base text (last changed at `4ccaeaaf5`), and orientation.md is the fix round's text of 11:05 UTC. -->

# Climb batch 28's update of the orientation: the judgement

Mode: update.

**What I read.**
- In this folder: `orientation.md` (the final text), `admission.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `quiz-cases.txt` (cases 6, 16, 17 and 30) and both writer logs.
- The current part, `.claude/skills/fortress-repo/references/revival-changes.md`, and its `diff` against `orientation.md`: two hunks, at lines 24 and 93 of the new text.
- P-160, P-161, P-168 and F-331 (`facts-extract.sh`); ledger rows 349, 908 and 918.
- The uncommitted changes to `tools/orientation/regression/key.md` and `questions.md`.
- Primary sources for the new sentences:
  - `Library/FortressLibrary.fsi:495-505` and `:553-557` (`NN64`), `:560-573` and `:626-631` (`ZZ32`), `:634-649` and `:702-706` (`ZZ64`), `:709-723` and `:772` (`ZZ`, `big` its only low-bits function);
  - `LibraryBuiltin/FortressBuiltin.fsi:133-140` and `:188-193` (`NN32`);
  - `LibraryBuiltin/CompilerBuiltin.fsi:103-145` (the prelude's `ZZ`, no conversion out), `:147-152`, `:206-207`, `:210-214`, `:269-270`, `:273-277`, `:328-329`, `:332-337` and `:386-387` (the prelude's 8 getters, `bitsAs…` getters and low-bits functions), and its coercions;
  - `Specification/basic/types-vals-vars.tex:283-288` (object trait types), for the fix round's "because".

The standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance".

**What I ran.** Reads, `grep`, `diff`, `wc` and `git show`, and `skills-lint.py` on a scratch copy of `orientation.md` laid out as the part (below). No build, test or probe. The tree is unchanged.

**Which text each check read.**
- The first text, of 24,919 characters: `preserve.md` (10:48), `cold-read.md` (10:49) and `quiz-grade-1.md`.
- The final text, of 25,121 characters: `cold-read-2.md` (11:12) and `quiz-grade-2.md`, whose reader quotes the fix round's sentences.

No check after the fix round compared the final text with its sources. I did that for the fix round's changes, below.

Line numbers below are those of the final text.

## Verdicts

| Part | Lines | What changed | Verdict | Rests on |
|---|---|---|---|---|
| The opening | 1-7 | nothing | no change | none |
| Dispatch and overloading | 9-24 | line 24: "but no other type can extend it" becomes "because no other type can extend it" (`cold-read.md` item 2.19) | install | the specification's own reason, `types-vals-vars.tex:285-288`: "an object trait type cannot be extended. Thus, an object trait type excludes any type that is not its supertype"; `cold-read-2.md` finds nothing on the clause |
| Traits and objects | 26-62 | nothing | no change | none |
| Static parameters, `where` clauses and sizes | 64-83 | nothing | no change | none |
| Numbers | 85-99 | line 93, a new rule (P-161, F-331; F-132, F-172 and F-307 folded in): an integer converts to another integer type by a checked getter, which keeps the value or raises `IntegerOverflow`, or by a low-bits function, which never raises; `ZZ` has only `big`; the prelude's limits until the switch-over | install | `preserve.md` failures 1 and 2 fixed in the final text, checked against the tree; case 6 right without its compiled half in round 1 because a rule was missing, and all four cases right in round 2 (`quiz-grade-2.md`: "The fix round's new sentence in the P-161 rule worked"); `cold-read-2.md` section 1, "Numbers", read right |
| Reductions and comprehensions | 101-111 | nothing | no change | none |
| Implementation limits | 113-117 | nothing | no change | none |

The whole text installs: the current part with the two hunks above, and the lint fix below. No section is held, so `queue.md` files no item.

### Numbers: install

**The rule against its sources.** I checked each sentence of line 93 against the record and the tree:
- The five getters keep the value or raise `IntegerOverflow` (P-161, F-331). All 25 are declared, at the lines above.
- `narrow`, `widen`, `signed`, `unsigned` and `big` keep the low bits and never raise (P-161, F-331, F-132).
- "Under walk, each fixed-width type has all five, and one that keeps the type returns the value, as `widen` of a `ZZ64`." Each of the four fixed widths declares all five (`FortressLibrary.fsi:553-557`, `:626-631`, `:702-706`; `FortressBuiltin.fsi:188-193`). F-331: "on a value that already has its result type, as `widen` of a `ZZ64`, each returns the value".
- "Of the five, `ZZ` has only `big`, so `narrow(z)` finds no declaration." This holds under walk (`FortressLibrary.fsi:772`; F-331). It holds compiled too: the prelude's `ZZ` declares no conversion out, and no coercion leads out of `ZZ` (`CompilerBuiltin.fsi:103-145`; row 349). So the fix round was right to drop "under walk" (`cold-read.md` item 2.12).
- The `bitsAs…` getters give the bits at the other sign. Each fixed width has one, on both paths (`FortressLibrary.fsi:505`, `:573`, `:649`; `FortressBuiltin.fsi:140`; `CompilerBuiltin.fsi:152`, `:214`, `:277`, `:337`). So the rule rightly gives them no path qualifier.
- "Until the switch-over, the compiler's prelude has 8 of the 25 getters, `ZZ64`'s `asZZ32` among them, none on `ZZ`, and no `big`." This matches row 349's list of the 8 and `CompilerBuiltin.fsi:150`.
- "Of the low-bits functions it has only those that change the type, as `narrow` of a `ZZ64` (row 349)." The prelude declares exactly eight: `narrow` and `unsigned` on `ZZ64`, `widen` and `unsigned` on `ZZ32`, `widen` and `signed` on `NN32`, `narrow` and `signed` on `NN64`. Each changes the type, and they are every type-changing low-bits function except `big`, which the sentence before excludes. Row 349 says the same: "no `narrow`, `widen`, `signed` or `unsigned` that returns its argument".
  - The sentence says nothing of a call that reaches a wider type's function by coercion. Row 349's notes: "`narrow` of a `ZZ32` 43 compiles by coercion through `ZZ64`'s `coerce(x: ZZ32)` ... and gives 43". A reader of the sentence expects such a call to be refused. It compiles and gives the same value, so no value is wrong.

**The checks.**
- **Preservation.** Both failures are fixed in the final text. Failure 1, the compiled half of row 349, is fixed by "Under walk" and the new sentence on the prelude's low-bits functions. Failure 2, the wrap example, is fixed by "outside `ZZ32`'s range". No sentence says more than its source.
- **Quiz.** Round 1's case 6 counted against the orientation, because a rule was missing: the prelude's `narrow` (`quiz-grade-1.md`). The fix round wrote that rule from the prelude's declarations and row 349. It did not cite row 346, which is closed, and it gave its reason (writer 2's log). Round 2: four of four right. Reader 2 quotes the fix round's two sentences on the prelude, in case 6 and in cases 17 and 30.
- **Second cold read.** Section 1 reads the rule right: "I would convert with `asZZ32` and the other getters when a value must be kept, and use `narrow` only where wrapping is meant. On `ZZ` I would write `z.asZZ32`. In compiled code, I would check which of the 8 getters the prelude has." Its points on line 93 do not send a worker wrong:
  - **Item 2.13** (40%) asks whether "all five" means the getters. Read either way, the sentence is true: under walk each fixed width has all five getters too. "Under walk" is narrower than it need be, since the checker reads the same library, but no action changes.
  - **Item 2.1** (70%, over several passages) notes that the second limit sentence continues an "Until the switch-over" sentence without opening with it. Its subject, "it", is the prelude that the sentence before names. Its row, 349, says: "Closes at the switch-over (P-37)". The two markers lead to one action: do not fix it in the prelude, and do not assert it as correct in a test. The batch 27 judge read line 62's `===` sentence the same way. Item 2.2 is the same convention, and it is listed below.
  - **Section 3** calls "8 of the 25 getters, `ZZ64`'s `asZZ32` among them" a partial count. It is not wrong. The clause on `ZZ64`'s `asZZ32` settled the lookups that reader 1 left open in cases 17 and 30 (`quiz-grade-2.md`), so it earns its place.
- **The admission's mistakes.** The text prevents both. `narrow` where a checked conversion was meant: the rule's first two sentences say which form keeps the value. `narrow` or `widen` on a `ZZ`: "`ZZ` has only `big` ... write `z.asZZ32`". Cases 17 and 30, which test each mistake, were right in both rounds.

**The lint hit at line 93.** `skills-lint.py` flags "8 of the 25 getters" in its stale set, the pattern `\b\d+ of the \d+\b`. Neither writer could run the lint (both logs). The current part lints clean.
- **Why it does not hold the section.** The lint is not one of the three install conditions. The count does not move: the prelude is not to be fixed (line 7), and the sentence goes when the prelude goes.
- **The fix at the install, the default.** Write "has only 8 of the getters". The rule's own sentences give the 25, five getters on each of five types. A scratch copy with this wording lints clean (exit 0). This is the lint fix that `coordinator/references/skill-rewrite.md:22` gives to the skill writer at a landing: one item that shows the fix alone, with no second cold read.
- **The other way.** Add an `ALLOW` entry to `skills-lint.py` for `fortress-repo/references/revival-changes.md`, set `stale`, substring "8 of the 25 getters", as a hit that was read and passed. The text then stays as checked, but a coordinator tool changes.

### Dispatch and overloading: install

The first cold read (item 2.19, low) read "an object excludes every trait that it does not extend, but no other type can extend it" as a limitation. The fix round wrote "because". The specification gives this reason, `types-vals-vars.tex:285-288`: "an object trait type cannot be extended. Thus, an object trait type excludes any type that is not its supertype".
- The old "but" could also be read as naming the remedy's cost: an object cannot be extended. The new sentence still states that fact, so nothing is lost.
- Writer 2's log says that the meaning does not change. Strictly, a possible caveat becomes the reason. Both readings are true.
- The preservation check ran before this change. I checked it against the specification instead. The second cold read's items 2.4 and 2.5 are on the paragraph's other sentences, which this update did not change. No case of this quiz reaches the paragraph.

## Size

- **Before:** 24,152 characters (`revival-changes.md` at `4ccaeaaf5`).
- **After:** 25,121 characters, +969:
  - "Numbers" +965: the new rule, 963 characters, and its blank line;
  - "Dispatch and overloading" +4: "because" for "but".

  The admission asked for about 600 characters. The first text added 767. The fix round added 202, each change in answer to a failure of the checks: preservation failure 1, and the quiz's case 6 with `cold-read.md` item 3.2.
- **Since the last judgement.** The batch 27 judge installed 22,974 characters. Three commits to the part after that install added 1,178, outside this workflow (`044e3fb29`, `e9f828f30`, `4ccaeaaf5`).
- **Size exception: accepted for this install. The conflict is exposed again.**
  - **The budget.** It is 8,000 to 12,000 characters (`tools/orientation/README.md`; the synthesis, "Choose a provisional budget"). The part is now 13,121 characters over its top, more than twice the top.
  - **Why it was accepted.** The rule is an admitted correction with recorded worker failures: `widen` on a `ZZ` at `QuickCheck.fss:322`, and the consolidation's quiz reader's `narrow(hi - lo)` (`admission.md`, P-161's row). Nothing in the rule could be cut without reopening a failure of the checks. The candidates are "as Java's `(int)` does", about 25 characters, and the `bitsAs…` sentence, about 95 characters, which the admission asked for.
  - **The conflict.** This is the fourth update in a row to bypass the budget: climb batches 24, 26, 27 and 28. No update has cut anything to make room. The standard says that new content "must compete for space through consolidation; it must not bypass the budget merely because it is new". The batch 27 judge asked the coordinator to settle the conflict before the next update added to the part. I find no settlement in PLAN, the review queue, the held list or the boot note. The held list records the curator's word of 2026-11-02, 06:51: a consolidation pass of the skills, "minimal and declarative", is "overdue, after the plan's consolidation", and "the orientation workflow and the cold reads are the processes for it".
  - **Ways to settle it.** A consolidation run of this workflow. Its candidates are listed in both cold reads' section 3, in batch 27's judgement ("Findings on unchanged text") and below. The other way is a new budget.
  - **Who decides.** The coordinator, with the curator's word above, before the next update adds to the part. Per the standard, the conflict is exposed here and is not met by compressing the prose.

## The install

1. Copy `orientation.md` over `.claude/skills/fortress-repo/references/revival-changes.md`. At line 93, make the lint fix: "has only 8 of the getters" (the default), or add the `ALLOW` entry (the other way). Run `skills-lint.py` on the installed part.
2. In the same commit, add `sources-mapping.md` to `references/sources.md` as a dated entry. It holds every item that the admission routes to `sources.md` (`preserve.md`, "Checked and kept"). For the "because", it cites only the cold read's item 2.19. Add `Specification/basic/types-vals-vars.tex:285-288` as the source of that clause.
3. The skill update after this landing takes the area-part sentences that this landing made false or incomplete: the admission's "Elsewhere" list, in `interpreter.md`, `compiler.md`, `library.md` and `SKILL.md:123`. Add one item that both quiz gradings found and that is in no part: until the switch-over, the prelude's `DOTPLUS` saturates and its `BOXPLUS` wraps, and it declares no `DOTTIMES` (row 348). It goes in `library.md`'s wrapping bullet or `compiler.md`'s section on the prelude. A port of a sum alone would find the prelude's `DOTPLUS` and take it for wrapping (`quiz-grade-2.md`, case 6).
4. **The quiz.** The changes to `regression/key.md` and `regression/questions.md` are uncommitted in the working tree, and go with this folder. They read cases 6, 16 and 17 again, add case 30, and remove case 6's **Open**.

## Findings on unchanged text, for the next update

None is an item, because no section is held, and a hold would keep the same sentences.

1. **The opening's conventions** (`cold-read-2.md` items 2.1 to 2.3; `cold-read.md` items 2.6 to 2.8). These are batch 27's findings 1, 2 and 5, still open:
   - whether a marker covers a sentence or its paragraph;
   - two markers in one passage;
   - "compiler's library" against "compiler's prelude";
   - bold sentences that describe one path (lines 15, 72, 89, 105 and 115).

   The new rule's second limit sentence is one more case of the first point. Cheap fixes are to join it to the "Until the switch-over" sentence with a semicolon, or to state the conventions per paragraph.
2. **The `SEQV` paragraph** (`cold-read-2.md` items 2.8, high at 80%, 2.9 and 2.10; `cold-read.md` items 2.1, 2.2 and 2.16):
   - Line 55's "`SEQV` follows the specification on both paths" restates P-168's title. Its exception until the switch-over, the prelude's `===` (row 908), comes at the paragraph's end, line 62.
   - "Both false answers" does not name the two.
   - Walk's `FloatLiteral` against `x = 0.5`, batch 27's step 4, is still not in the orientation.
3. **A program's own `+` on a self-typed trait, line 24 against line 43** (`cold-read-2.md` item 2.5; `cold-read.md` item 2.3). Writer 2 names it a decision not taken.
4. **Departures that cite no row** (`cold-read-2.md` items 2.6 and 2.17; `cold-read.md` item 2.8). These are the findings of the batch 26 and 27 judges, still open.
5. **`override` widens, line 32** (`cold-read.md` item 2.10), against row 650. This is the batch 26 judge's finding 1, still open.
6. **`IntLiteral`'s arithmetic under walk, line 89, row 578** (`cold-read.md` item 2.4). This is the batch 26 judge's finding 4, still open.
7. **Coercion between excluding siblings, line 91** (`quiz-grade-2.md`, case 30, not counted). "Where several declarations apply only by coercion and none is more specific" does not say that a coercion can make one sibling more specific: `ZZ64` beside `ZZ` on a `ZZ32` argument (`conversions-coercions.tex:502-540`, by the grader's reading). This was not measured. Reader 2 renamed an overload to avoid a tie that may not exist.
8. **A getter on a numeral needs parentheses** (`key.md`, case 16, **Scope**): `3.asNN32` stops at parse, so write `(3).asNN32`. The new rule says "write a getter" and does not say this. The parser's message names the cause, so the failure is loud. A home in `tests-writing.md`, beside `unsigned(5)`, is enough.
9. **History and detail to cut in a consolidation** (`cold-read-2.md` section 3, 13 items; `cold-read.md` section 3, 7 items). Among them: route C (line 87); line 43's justification of the library's pairs; the second `NatReflect` reason (line 83); the core's repeat at line 115; the base-0 power crash (line 97).
10. **Low** (`cold-read-2.md` items 2.4, 2.7, 2.11, 2.12, 2.14 to 2.16 and 2.18 to 2.20; `cold-read.md` items 2.5, 2.9, 2.11, 2.13 to 2.15, 2.17, 2.18 and 2.20 to 2.24). Among them: "counts for it" (line 24), the `pick` example (line 66), the empty `BIG MAX` (line 111), `(1.0 s) / n` compiled (line 99), and the part's name against the core's.
