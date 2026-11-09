<!-- The orientation workflow's judgement of climb batch 29's update, update mode: install or no change for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz. Three sections install: "Traits and objects" (a numeral at `Index` takes its default; the closed rows 943 and 945 dropped from the `SEQV` paragraph), "Numbers" (P-173's rule that a numeral converts where it stands, and the new rule that an expression of numerals alone folds exactly, on both paths), "Reductions and comprehensions" (row 20 dropped); no section is held. "Numbers" installs with two corrections (a lint hit at line 95; rows 964 and 965, which are not departures from the numeral rules, out of line 91's list) and in the same push as the area-part corrections that the landing's data already gives the skill writer, without which line 91's pointer stays false. Also: the sizes and the size exception; what the install needs; findings for the next update. Read on `main` at `5febd82a78`, where `revival-changes.md` is the admission's base text (last changed at `6d7a9b1ad6`), and orientation.md is the fix round's text of 11:52 UTC. -->

# Climb batch 29's update of the orientation: the judgement

Mode: update.

**What I read.**
- In this folder: `orientation.md` (the final text), `admission.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `quiz-cases.txt` (cases 5, 16, 22, 26, 28, 29 and 31) and both writer logs.
- The current part, `.claude/skills/fortress-repo/references/revival-changes.md`, and its `diff` against `orientation.md`: hunks at lines 48, 62, 89, 91-95 (new), 99, 103 and 112 of the new text.
- P-173, P-174, F-79, F-128, F-140, F-74, F-339, F-340, F-341, F-342, F-343 and F-344 (`facts-extract.sh`). Ledger rows 20, 364, 387, 454, 506, 717, 721, 943, 944, 945, 957, 958, 960, 961, 962, 963, 964, 965, 966, 967 and 968.
- The area parts that line 91 points to: `interpreter.md:14-26` and `compiler.md:104-107`, and a `grep` of both for the open rows. Also `tests-writing.md:32-35` and `SKILL.md`.
- The landing's data for the skill writer: `record-landing/owed.md`, "For the coordinator", and `tools/record-landing/skill-task.md`.
- Primary sources for the fix round's sentences: `Library/FortressLibrary.fsi:290-298` (`RR64`'s coercions: from `ZZ32`, `RR32` and the two numeral types, none from `ZZ64`); `ProjectFortress/compiler_tests/NumeralCoercionOnceCompiled.fss:6` (`coerce(x: IntLiteral)`).
- The record on the budget and on path behaviours: `coordinator/BOOT.md`, "Next, in order", items 3 and 4; `HELD.md:206`; `.claude/skills/fortress-repo/references/sources.md:1166-1176`.
- The uncommitted changes to `tools/orientation/regression/key.md` and `questions.md`.

The standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance".

**What I ran.** Reads, `grep`, `git grep`, `diff`, `git show` and character counts. `skills-lint.py` on a scratch copy of `orientation.md` laid out as the part: one hit, at line 95 (below). Neither writer could lint, so this is the text's only lint. No build, test or probe. The tree is unchanged.

**Which text each check read.**
- The first text, of 26,991 bytes: `preserve.md` (11:28), `cold-read.md` (11:28) and `quiz-grade-1.md` (its reader's answers, 11:47).
- The final text, of 27,702 bytes: `cold-read-2.md` (11:58) and `quiz-grade-2.md` (its reader's answers, 12:06).

No check after the fix round compared the final text with its sources. I did that for the fix round's changes, below. Line numbers below are those of the final text.

## Verdicts

| Part | Lines | What changed | Verdict | Rests on |
|---|---|---|---|---|
| The opening | 1-7 | nothing | no change | none |
| Dispatch and overloading | 9-24 | nothing | no change | none |
| Traits and objects | 26-62 | line 48 (F-278): a numeral at `Index` takes its default, a `ZZ32`, so `f(3)` is valid for `f(x: Index)`; line 62 (F-343, F-344): the sentence on rows 943 and 945 deleted, the `||` fold pointed to "Numbers", and the example "a computed `RR64` 0.5" | install | `preserve.md`, "Not failures": edits 3 and 4 checked and kept; rows 364, 943 and 945 `FIXED`; cases 22 and 28 right in both rounds; `cold-read-2.md` section 1, "Traits and objects", read right, and none of its items is on a changed sentence |
| Static parameters, `where` clauses and sizes | 64-83 | nothing | no change | none |
| Numbers | 85-103 | line 89 (P-173, P-174, F-341, F-342, F-79): "A numeral converts where it stands"; line 91: the written-only rule, a program's own coercion, the departures pointer; line 93, new (P-173, F-339, F-343): "An expression of numerals alone folds exactly before the checker, on both paths"; line 95: walk converts a value other than a numeral not at a declared return (row 387), and a tie at the numerals reads the default on both paths; line 99: "the two numeral types"; line 103: the reason for `asFloat` | install, with two corrections, in the same push as the area-part corrections | `preserve.md` failures 2 to 9 fixed in the final text, checked against their sources; failure 1 fixed in this part, and its other half is the area parts' (below); 6 of 7 cases right in both rounds, case 29 wrong in both against `interpreter.md:23` by the key's own rule (`quiz-grade-2.md`, "Cause"); `cold-read-2.md` section 1, "Numbers", read right; its item 9 is the core's stale `SKILL.md:132` |
| Reductions and comprehensions | 105-115 | line 112 (F-228): "(rows 20, 717)" becomes "(row 717)" | install | `preserve.md`, "Not failures": "Row 20 is dropped at `:112`, as F-228 asks"; row 20 `FIXED` (`12292add2`); no quiz case reaches it; `cold-read-2.md` items 16 and 22 are on unchanged sentences |
| Implementation limits | 117-121 | nothing | no change | none |

The whole text installs: the current part with the hunks above, the two corrections in "Numbers", and, in the same push, the area-part corrections listed under "The install". No section is held, so `queue.md` files no item.

### Traits and objects: install

**Line 48, edit 3.** F-278: a numeral at `Index` takes its default, a `ZZ32`, on both paths (`Specification/appendices/changes.tex:4442-4446`). The sentence replaces the old one, which said that the checker refuses `f(3)` and that walk takes it (row 364, now `FIXED`). It cites no P-entry, as the admission asks.

**Line 62, edit 4 and the fix round.**
- The deleted sentence cited rows 943 and 945. Both are `FIXED` (`3de571bac7`, `e53480fc6e`).
- The `||` sentence now says the fold is in "Numbers", where line 93 states it with F-343's condition on characters.
- The example "`y: RR64 = 0.5` is `SEQV` a computed `RR64` 0.5" is F-341's own: "`y: RR64 = 0.5` is `SEQV` a computed 0.5". The first text's `p + p` from `p: RR64 = 0.25` was right too. The fix round shortened it at `cold-read.md` item 3.4.

**The checks.**
- **Preservation.** Both edits are checked and kept (`preserve.md`, "Not failures").
- **Quiz.** Case 22, on `Index` and the Meet Rule, and case 28, on `SEQV`, were right in both rounds. In round 2, case 28's reader added a false side claim, that each evaluation of a string literal makes a new object (row 945). It took the claim from the stale `interpreter.md:22`, against line 62's "`V("ab") = V("ab")` [is] `true`" (`quiz-grade-2.md`, case 28). The claim changed no verdict. The area-part correction removes its source.
- **Second cold read.** Its points on this section are on sentences that this update did not change:
  - item 12 (line 48: what a test meant for both paths does about `Index`): the sentence "write the bound only in code that runs under walk or is checked against the interpreter's library" is batch 27's;
  - item 5 (row 923 and row 908 at line 62);
  - item 21 (where equality sits);
  - section 3, item 4: line 62's float example "restates 'Numbers'". It shows `SEQV` at a numeral bound to `RR64`, the case that row 943 used to contradict. It costs one clause.

### Numbers: install, with two corrections, in the same push as the area-part corrections

**The fix round's sentences against their sources.** No check read them after the fix round, so I did:
- A place fixes a type "when its declared type is a numeral type, or has a coercion from the numeral type": P-173. `Object` among the places that take the default: P-173 and F-342. `Index` among them: F-278. (`preserve.md` failure 4.)
- "A numeral outside the type's range, or that rounds to an infinity there, is refused": F-342 for the checker. Walk refuses one out of range when it runs (F-341), and gives `Infinity` for one that rounds to an infinity (row 967, `NEGATIVE-VERIFIED`). Whether such a numeral is "outside the type's range" is review-queue item 459, open. The text states the landed text, and cites the row for walk's departure.
- "A size of 2^31 or more, used as a value, is a `ZZ64` under walk and raises compiled (row 962)": row 962 (`CONTESTED`) gives both halves, and F-140 and F-74 give walk's. The row says "Open: whether such a read is refused where the class loads, raises `IntegerOverflow`, or is not a `ZZ32`." So the text cannot name the right answer, and by line 7 a sentence that cites a row is a departure, not asserted.
- "(P-173, P-40)" on the `nat` sentence: P-173 cites P-40 for it (`preserve.md` failure 8).
- "Until the switch-over, a compiled program writes `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)`": F-79, and `NumeralCoercionOnceCompiled.fss:6` (`preserve.md` failure 3).
- "The coercion gives one value for each place where the numeral is written, and each run of that place reuses it": F-340 (compiled, a static field per site), F-341 (walk, "one result per site and type"). Row 957, the compiled generic type, is named among the departures.
- Line 93: "a result that can be `-0.0`" (F-339, "a possible `-0.0`"); "A folded comparison is a boolean" (F-339); "a quotient of integer numerals defaults to a `QQ`" (P-173, "as a `QQ` for a quotient"); "under walk `lr = 1/1000` is a `QQ`", since line 103 gives the compiled path no `QQ` until the switch-over; the `||` fold cites P-171 for strings only, with F-343's condition for characters, "with a string among the first two" (`preserve.md` failures 2, 5, 6 and 7).
- Line 95: "Walk converts a value other than a numeral at a call, a typed binding and an assignment, but not at a declared return type (row 387)": F-128. "both paths read the numeral at its default": F-341, "reads a tie at the default", and P-173, "a float numeral whose conversions into `QQ` and `RR64` tie reads `RR64`" (`preserve.md` failure 9; `cold-read.md` items 2.4 and 2.21).
- Line 103: "No coercion carries a `ZZ64` into `RR64`": `RR64` declares `coerce` from `ZZ32`, `RR32`, `NaturalNumeral` and `RadixPointNumeral` only (`FortressLibrary.fsi:290-298`).

**One sentence says more than its source: correction 1.** Line 91: "Other departures from these rules are rows 958, 960, 966 and 968 under walk, and rows 957, 961, 963, 964 and 965 compiled."
- Row 964 is the code generator's crash on a `typecase` tuple pattern with an untyped binder, `typecase p of (x, y: ZZ32)`. It has nothing to do with numerals.
- Row 965 is the prelude's `||`, declared with the string first only, so `c || s` for a `Character` value `c` is refused. It is a limit of the prelude, not of the numeral rules or the fold. Its own notes say that two literals, `'a' || "bc"`, compile, because they fold.
- The fix round took the list from the admission's "Elsewhere", which lists the batch's new compiled rows for `compiler.md`, not departures from these rules.
- Consequence: low. A worker looks the two rows up for nothing: round 2's quiz reader planned to, in case 16 (`quiz-answers-2.md:34`).
- The correction: "and rows 957, 961 and 963 compiled". Both rows go to `compiler.md` with the area-part corrections.

**`preserve.md` failure 1: this part's half is fixed, and the other half is the area parts'.**
- **This part.** The fix round states rows 967 and 962 at the rules they depart from, row 387 at the argument rule, and names the other open rows at line 91.
- **The destination.** Line 91 ends "`interpreter.md` and `compiler.md` describe them". Neither part cites any of rows 387 or 957 to 968 (`grep`). `interpreter.md:16-25` still lists only closed rows (943, 944, 945, 364, 721; 578 went with `IntLiteral`). It tells a worker to assert the rules' answer for each as an `XXX` test, and its row-364 bullet says "write the static argument, as `Cell[\ZZ32\](3)`". `compiler.md:106` still says that each evaluation of a string literal makes a new object (row 945).
- **What it cost.** In both quiz rounds, case 29 failed on `interpreter.md:23` alone. Both rounds' readers took two false side claims each from `interpreter.md:18-22`: round 1 in cases 26 and 31, round 2 in cases 28 and 31, against the orientation's opposite sentences. So readers follow the area part over this text.
- **Why it does not hold the section.** A hold would not cure it. The old `:89` points to the same list ("`interpreter.md`, 'How walk evaluates a program', lists where walk departs from these rules (rows 364, 721, 943, 944)") and agrees with its stale bullets, and both are false. The old text also says "The checker types an integer numeral as `IntLiteral`", which leads a reader to case 16's old answer, now wrong (`admission.md`, P-173's row). The cure is the area-part correction, as the batch 26 judge found for `interpreter.md:53`.
- **The condition.** The landing's data already gives the skill writer each stale sentence (`record-landing/owed.md`, "For the coordinator": `interpreter.md:20-23`, `:25`, `:126`, `compiler.md:106`, `SKILL.md:77`, `:65-73`, `:132`, `tests-writing.md:34`, `library.md:56`). That list does not ask for the open rows that line 91 points to. So the install asks for them too: see "The install", step 3.

**The checks.**
- **Preservation.** Failures 2 to 9 are fixed in the final text, as checked above. Failure 1 is closed in this part, and closes in the area parts with step 3. My check found one more, the rows 964 and 965, cured by correction 1.
- **Quiz.** 6 of 7 right in both rounds (`quiz-grade-1.md`, `quiz-grade-2.md`, "Counts": "Against the orientation: 0").
  - Case 16, `n: NN32 = 3`: right in both rounds, from line 89's `u: NN32 = 5`. The stale `tests-writing.md:34` caused a hedge. Round 2's reader used the fix round's list at line 91 to settle it, and looked up rows 964 and 965 "to see whether any of them concerns a numeral at `NN32`" (`quiz-answers-2.md:34`).
  - Case 31, which tests edits 1 and 2 directly (the untyped `ZZ64` into `RR64`, the overflow test, the rounding test): right in both rounds.
  - Cases 5 and 26, `/` and `=` across number types: right in both rounds.
  - Case 29: wrong in both rounds, by `interpreter.md:23`, quoted word for word. The key counts it against that part. Both graders suggest one clause from F-344 beside `Cell(0.5)`. Writer 2 left it out for the budget. With step 3, the stale bullet goes, and the clause is not needed.
- **Second cold read.** Section 1, "Numbers", reads every new rule right. Its points on the changed text:
  - **Item 9, first half (high).** Line 89's "A `nat` or `int` parameter used as a value is a `ZZ32`" contradicts the core's "`nat` is an `NN32` value" (`SKILL.md:132`). `cold-read.md` item 2.1 (75 %) found the same. Line 89 is the record's rule (P-173, F-342; `tests/NatValueZZ32Walk.fss`, `compiler_tests/XXXNatValueNN32Refused.test`), and the core's line is stale (`admission.md`, "Elsewhere"; `owed.md`). It is cured by `SKILL.md:132`'s correction in the same push. A hold would make it worse: the old text says nothing of a size's value, so a reader follows the core and writes `u: NN32 = n`, which is refused. The same holds for `cold-read.md` item 2.9, the core's "Before the checker, it folds integer literals" (`SKILL.md:77`) against line 93.
  - **Item 9, second half (medium).** Line 89 does not say which half of row 962 is the departure. The row is contested, and its open question is which answer is right (above). Line 7 reads the sentence as a departure, so a worker asserts neither half.
  - **Item 14 (low).** The compiled result of a folded `1/1000` is "left to inference". Line 103 answers it: until the switch-over the compiled path has no `QQ`, and a compiled `7 / 2` is a static error.
  - **Item 20 (low).** "The five integer types" is not defined. The core lists the eight number types, and line 89 names `QQ`, `RR64` and `RR32` apart.
  - **Section 3, item 1 (medium).** Line 91's bare list of rows changes no action. It is the fix round's answer to `preserve.md` failure 1 while the area parts lack the rows. See "Findings for the next update", 1.
  - Items 5, 6, 15 and 19 are on sentences or conventions that this update did not change.

**Correction 2: the lint hit at line 95.** `skills-lint.py` flags "both paths read the numeral at its default" in its status set, the pattern `\bat (its|the) default\b`. It means the numeral's default type, not a decision's default. The lint is not one of the three install conditions.
- The correction: "both paths read the numeral as its default." A scratch copy with this wording lints clean (exit 0). The meaning does not change.
- The other way: an `ALLOW` entry in `skills-lint.py` for `fortress-repo/references/revival-changes.md`, set `status`, substring "read the numeral at its default".

**Path behaviours in the language part.** The curator's comment of 2026-11-08 says that a behaviour of one path that the language does not give is "noted only in that path's part with its ledger row" (`sources.md:1166-1168`). The admission routed this landing's departures to `interpreter.md` and `compiler.md` by it. The fix round put three of them in line 89 and line 95 (rows 967, 962 and 387) and named the rest at line 91, because the area parts did not hold them (`preserve.md` failure 1). This is not one of the three install conditions: each sentence cites its row, so line 7 reads it as a departure, never asserted. Once step 3 lands, the three clauses and the list repeat the area parts. Their cut is finding 1 below, not a condition of this install.

### Reductions and comprehensions: install

Row 20 is `FIXED` (`12292add2`, F-228). Row 717 still holds the bullet. `preserve.md`: "Row 20 is dropped at `:112`, as F-228 asks." No quiz case reaches the line. The second cold read's items 16 and 22 are on sentences that this update did not change.

## Size

- **Before:** 25,337 characters, 25,345 bytes (`revival-changes.md` at `6d7a9b1ad6`).
- **After:** 27,694 characters, 27,702 bytes, +2,357. With correction 1, 27,684 characters, +2,347. Correction 2 changes no length.
  - "Numbers": +2,734, from 5,318 to 8,052 characters.
  - "Traits and objects": −372, the closed rows and the shorter example.
  - "Reductions and comprehensions": −5.
- **Against the admission's targets.** The admission asked to keep edit 1 near the old `:89`'s 954 characters and edit 2 near 550. The first text made edit 1 about 1,900 and edit 2 about 800 (writer 1's log), +1,646 in all. Writer 1 kept each point because it prevents a mistake on record, and named the cuts that would reach the target: the list of places that take the default, and the narrowest default. The fix round added 711, each change in answer to a failure of the checks (`sources-mapping.md`, "Fix round").
- **Since the last judgement.** The batch 28 judge installed 25,113 characters (`1baf511202`). Three commits outside this workflow brought the part to 25,337: `623d6912dd` (+333), the de-mixing `6ec749a8eb` (−463) and `6d7a9b1ad6` (+354).
- **Size exception: accepted for this install. The conflict is exposed again.**
  - **The budget.** It is 8,000 to 12,000 characters (`tools/orientation/README.md`). The part is 15,684 characters over its top, more than twice the top.
  - **Why it was accepted.** The landing made the old numeral text false in most of its sentences (`admission.md`, its opening), and a worker who follows it fails case 16 and writes `IntLiteral` where no such type exists. The new rules are admitted corrections with recorded failures: seven tests respelled after the fold, three false greens of the string fold, the team's `IntLiteral` as a variable's type. Holding them to keep the size keeps false text.
  - **The conflict.** This is the fifth update in a row to bypass the budget: climb batches 24, 26, 27, 28 and 29. This one cut only the closed rows' sentences, about 400 characters. The standard says that new content "must compete for space through consolidation; it must not bypass the budget merely because it is new". The batch 27 and 28 judges asked the coordinator to settle the conflict before the next update added to the part. The record shows no settlement: the boot note lists "`fortress-repo`'s size budgets (`revival-changes.md` 25K against 8K to 12K ...)" among the skill fixes for the coordinator's own writer, not done ("Next, in order", item 4). The curator's word of 2026-11-02, 06:51, calls a consolidation pass of the skills "overdue, after the plan's consolidation", with the orientation workflow and the cold reads as its processes (`HELD.md:206`).
  - **Ways to settle it.** A consolidation run of this workflow. Its first candidates are finding 1 below (about 400 characters once step 3 lands) and both cold reads' section 3. The other way is a new budget.
  - **Who decides.** The coordinator, with the curator's word above, before the next update adds to the part. Per the standard, the conflict is exposed here and is not met by compressing the prose.

## The install

1. **Copy the text.** Copy "Traits and objects", "Numbers" and "Reductions and comprehensions" from `orientation.md` over their sections of `.claude/skills/fortress-repo/references/revival-changes.md`, word for word, with these two corrections in "Numbers". The other four parts are identical in both files.
   - Correction 1, line 91: "and rows 957, 961, 963, 964 and 965 compiled." becomes "and rows 957, 961 and 963 compiled."
   - Correction 2, line 95: "both paths read the numeral at its default." becomes "both paths read the numeral as its default." (or the `ALLOW` entry, the other way). Run `skills-lint.py` on the installed part.
2. **Sources.** Add `sources-mapping.md` to `references/sources.md` as a dated entry, in the same commit. Add to it: correction 1, rows 964 and 965 left out because neither is a departure from the numeral rules; correction 2, a lint wording; and F-278 as the ground for `Index` among the places that take the default (line 89).
3. **In the same push: the area-part corrections.** These close `preserve.md` failure 1 and the cause of case 29's failure in both quiz rounds. The skill writer's data names the stale sentences (`owed.md`, "For the coordinator"). Line 91's pointer needs, beyond those, the open rows in the parts it names (`admission.md`, "Elsewhere"):
   - `interpreter.md:16-25`: replace the closed rows' bullets, and the paragraph on `3 + 4` at `ZZ32` (row 578), with walk's departures from the new rules, each with its row: 958 (a float numeral to the left of an `RR32`), 960 (leading zeros), 962 (walk's half, a size of 2^31 or more read as a `ZZ64`), 966 (`=/=` at a numeral, workaround `NOT (u = 0)`), 967 (a numeral that rounds to an infinity gives `Infinity`), 968 (a negative constant at a program's own type), and 387 (no conversion of a value other than a numeral at a declared return), where F-128's routing puts it.
   - `interpreter.md:126`: a `||` of two literals is one flat literal (F-343).
   - `compiler.md:106`: delete the bullet (row 945 `FIXED`). Add the compiled departures with their rows: 957, 961, 962 (contested), 963, 964 and 965. Add F-340's static initializer: a program's coercion from a numeral runs once per site, before `run()`.
   - `SKILL.md:65-73` and `:77` (the fold on both paths, F-339), `:132` (a size used as a value is a `ZZ32`), and a pointer from `:133` to the fold rule.
   - `tests-writing.md:34` (row 454 `FIXED`), and the typed-operand rule or a pointer to line 93.
   - `library.md:56`.

   The skill task's two commits go in one push (`record-landing/skill-task.md`, "Committing"). If the writer's update cannot carry the departures lists, the orientation's commit is not pushed without them. The coordinator then lands them next, before any worker reads the skill.
4. **The quiz.** The changes to `regression/key.md` and `regression/questions.md` are uncommitted in the working tree, and go with this folder. They change cases 16, 28 and 29 and add case 31.

## Findings for the next update

None is an item, because no section is held.

1. **Path departures in the language part** (above). Once step 3 lands, line 89's clauses on rows 967 and 962, and line 91's list of rows, repeat `interpreter.md` and `compiler.md`. The curator's rule of 2026-11-08 puts them there only. Cutting them saves about 400 characters. Line 91 then ends with the admission's pointer: "`interpreter.md` and `compiler.md` give each path's departures from these rules, with their rows." `cold-read-2.md` section 3, item 1 asks the same. Line 95's row 387 clause narrows a sentence that this part already held, and can stay.
2. **F-344 under walk** (`quiz-grade-1.md` and `quiz-grade-2.md`, "Notes"). No sentence here says that walk reads a number value at its trait where it infers a static argument. After step 3, nothing contradicts it, and the clause is not needed. If case 29 still fails after step 3, add it beside `Cell(0.5)`.
3. **A `ZZ64` divided by a float numeral under walk** (`quiz-grade-1.md`, case 5). No passage says that `elapsed / 1000000000.0` for a `ZZ64` gives an exact `QQ`, not a stop. The key accepts either expectation, and a `QQ` at an `RR64` place is refused loudly.
4. **Row 966, `=/=` at a numeral.** It gives a silent wrong answer. The text cites only the row. Step 3 puts it, with its workaround, in `interpreter.md`.
5. **Row 506** (`preserve.md` failure 9, F-73's routing to `compiler.md`). It is in no part. It is the checker's own limit of 64 combinations, and a numeral-fixed parameter counts as one choice.
6. **The opening's conventions and other unchanged text** (`cold-read-2.md` items 1 to 8, 10 to 13 and 15 to 22; `cold-read.md` items 2.2, 2.3, 2.5, 2.8, 2.10 to 2.14, 2.16 to 2.19, 2.22 and 2.23). These are the earlier judges' findings, still open: whether a marker covers a sentence or its paragraph, departures that cite no row, "compiler's library" against "compiler's prelude", the `pick` example, `Index` on both paths, line 24 against line 43, and `override` against row 650. Writer 2 left them for a clarity pass of the whole orientation.
7. **History and detail to cut in a consolidation** (`cold-read-2.md` section 3, items 2 to 7; `cold-read.md` section 3). Among them: route C (line 87), line 43's justification of the library's pairs, the second `NatReflect` reason (line 83), the core's repeats at lines 66, 109 and 119, and P-12's plan at line 119.
