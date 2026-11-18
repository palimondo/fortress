<!-- Climb batch 33b's orientation judgement (update mode, run 2 of climb batch 33): for the whole text and for each section of orientation.md, whether its change is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason, the report line it rests on, and the size before and after. -->

# Climb batch 33b: judgement of the orientation update

Judged: `orientation.md` in this folder (the writer's text after the fix round, 33,082 bytes) against `.claude/skills/fortress-repo/references/revival-changes.md` on `main` (33,294 bytes, last changed `8952ab6296`; `main` is now `cb05cc7c6f`, and no commit since the admission's base `ff42b70e15` touches `.claude/`). Standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance". Reports read: `admission.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `sources-mapping.md`, `writer-1.log` and `writer-2.log`; the regression key's cases 26, 35 and 36 (`explorations/coordinator/tools/orientation/regression/key.md`, as modified in the working tree); climb batch 33's `orientation/judgement.md` for the findings it carried. Nothing was built or run.

## Verdict

**Whole text: install, except "Traits and objects", which is held.**

`diff` of the two files changes five lines in three sections:

- The opening, `:7`: the sentences on plain and `XXX` tests (fix round, `cold-read.md` item 1).
- "Traits and objects", `:41`: the list of compiled shapes that run is cut from the self-typed rule (fix round, `cold-read.md` part 3, item 1); `:48`: the limit of `I extends Index` moved into the sentence that gives it (fix round, `cold-read.md` item 11).
- "Numbers", `:89`: the rule "The number types are flat siblings (P-43)", the admitted change (F-388), with the fix round's repair of `preserve.md` failure 1; `:112`: the `QQ` example of the P-165 rule scoped to walk (fix round, `cold-read.md` item 9).

Installed: the opening and "Numbers". Held: "Traits and objects" (both its changes: the skill keeps its `:41` and `:48`). The other four sections are byte for byte the skill's text, and the section headings are unchanged.

Holding "Numbers" would keep in the skill the sentences that the landing made false: that the compiler's prelude declares the seven number types as traits that a type can extend, and that the checker accepts an object below one and the object dies when its class loads (rows 1003 and 866, FIXED at `75f9f2fbf4`). The regression key now grades that answer wrong (`key.md:520`, `:528`).

## What the reports cover, and what I checked myself

`preserve.md` was written on the first writer's text and covers `:89` alone, with one failure. No preservation report and no quiz case covers the fix round's other four changes. I read the `diff` of the final text against the skill's, and checked each of those changes against its source:

| Change in the final text | Source read | Result |
|---|---|---|
| `:89`, failure 1 of `preserve.md`: the compiled message was stated for every object. Now "Both paths refuse an object declaration below one of the seven ... The compiled checker refuses it: 'Invalid type in extends clause: ZZ32'." | `TypeHierarchyChecker.scala:212` (the extends clause of a declared trait or object); `scala_src/typechecker/impls/Misc.scala:366` ('Objects can only extend traits.' for an object expression); `compiler_tests/XXX6bx.test` (both messages for `Compiled6.bx`) | repaired as `preserve.md` proposed: the message is scoped to a declaration |
| `:7`: "Either can change. Where the rules decide the case, assert their answer in an `XXX` test. Where they do not, assert today's behaviour in a plain test, one without the `XXX` prefix, and cite the row." The old "so do not assert it as correct in a plain test" is gone. | `tests-writing.md:86-87`, "How a defect is recorded", items 2 and 3 | preserved. The case split gives each case its one test, so the old prohibition holds without its own sentence, and the contradiction that climb batch 33's judge carried (`cold-read-2.md` 2.1 there) is gone. "Cite the row" for "beside the row" agrees with item 3 (a test and a ledger row). |
| `:112`: "Under walk, `h = 0.5` is `true` for `h: QQ = 1/2`", where the skill says "on both paths". | `:89` and `:116` (the prelude declares no `QQ`); `key.md:323`, case 26's **Scope** ("no `QQ`, so `ratio = 0.5` compiles only after the switch-over") | preserved, and the old "both paths" was false for the compiled path today |
| `:41`: "A compiled body of `T` that returns `self` at `X` runs, also from an arm of a conditional or a `case` expression, a function expression or a local function" is cut; the sentence now opens with the one shape that fails (row 1070). | `key.md:476`, case 35's **Skill**, which names the cut sentence and says that no area part names rows 1050 to 1052 or 1070, "so the orientation is the reader's only source for them"; `key.md:458`, the worker failure on record (climb batch 31's gather.1, a conditional with `self` in one arm, `VerifyError`); `key.md:473`, case 35's **Wrong**, "(a), (b) or (c) said to fail when a class loads"; `sources.md:1420`, climb batch 33's install of the sentence (F-377; rows 1050 and 1051, fixed) | **preservation failure.** The sentence passes the admission test (an agent acts differently without it, and the failure is on record), and its finding has no other home in the skill. The new text leaves "the conditional runs" to an inference from "in one shape", and its wording of that shape, "`self` in one arm and another value in the other", is the wording of row 1051's old conditional. Case 35 was not run on the cut (`quiz-cases.txt`: 36). |
| `:48`: "Write `I extends Index` in the library, and in your own generic over such a type that runs under walk or is checked against the interpreter's library", with the walk and checker sentences moved after the prelude's limit. | the skill's `:48`; `CompilerBuiltin.fsi` (no `Index`: `grep` finds only `lastIndexOf`) | preserved: the same claims, in a new order |

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | install | One change, `:7`, which removes a contradiction that two judges carried, with the rule unchanged (above). The second cold read restates the new rule as intended: "For a row sentence where the rules decide the case, I would assert the rule's answer in an `XXX` test. Where the rules do not decide it, I would assert today's behaviour in a plain test and cite the row." Its items on `:7` are low (2.18), or are on `:5` and on unmarked sentences elsewhere, which this update leaves as they were (2.2 to 2.5). | `cold-read-2.md`, part 1, "Preamble", and 2.18; `tests-writing.md:86-87` |
| Dispatch and overloading | no change | The skill's text. | `diff` |
| Traits and objects | **hold** | The cut at `:41` loses the sentence that is the skill's only statement of rows 1050 and 1051's fix, which case 35 names as its passage, and case 35 was not run on the cut: a preservation failure left, and an affected quiz case not shown to pass. The `:48` change preserves its claims, and goes back with the section. The second cold read's high item on `:48` (2.1, `I extends Index` in a program that both paths run today) is in the skill's text too; it is no reason to hold, and holding does not remove it. | my check of `:41` above; `key.md:476`, `:458`, `:473`; `quiz-cases.txt`; `cold-read-2.md` 2.1 |
| Static parameters, `where` clauses and sizes | no change | The skill's text. | `diff` |
| Numbers | install | F-388 is in the text: both libraries declare the seven as value objects (P-178), the prelude declares no `QQ`, and both paths refuse an object declaration below one, each with its message. Rows 1003 and 866 are dropped, as the admission asked. `preserve.md`'s one failure is repaired (above). Both quiz rounds answered case 36 right, with nothing counted against the orientation; round 2 read the final text and placed the compiled refusal in the checker, on both paths, before and after the switch-over. The `:112` change is right (above). The second cold read's one item on the new text (2.4, `:89`) does not send a worker wrong (below). | `preserve.md`, "Failures" and "Checked and kept"; `quiz-grade-1.md` and `quiz-grade-2.md`, case 36, "Failed cases: None"; `cold-read-2.md` 2.4 |
| Reductions and comprehensions | no change | The skill's text. | `diff` |
| Implementation limits | no change | The skill's text. | `diff` |

### The second cold read on the installed new text, and why none of it holds a section

- **2.4, the `:89` bullet (medium).** "The compiler's prelude declares no `QQ`" cites no row and does not open "Until the switch-over", so the reader fears that a worker may add `QQ` to the prelude. The same section states the limit in the opening's form at `:116`: "Until the switch-over, the compiler's library has no `QQ`", which brings the opening's "do not fix it in the compiler's prelude". The skill's sentence was no better: its row (1003) was for the seven traits, not for `QQ`. Not a misdirection. A wording point for the next consolidation: open the `:89` sentence "Until the switch-over".
- **2.13 (low), `:93` against `:112`.** "No `=` with a number type" is said of a numeral type at `:93`, an unchanged line; `:112` gives a numeral reaching a number type's own `=` by its coercion. The two agree; the reader asks for a pointer.
- **2.18 (low), `:7`.** The plain test is told to cite the row, the `XXX` test is not. The skill's `:7` tied only the plain test to the row too, and `tests-writing.md` gives each test's form.
- **Part 3, items 1 and 9.** "Route A" and the two quoted messages at `:89`. "Route A" is the skill's text, kept as the admission asked (its "Points for the writer", second item). The messages let a worker recognise each path's refusal; both quiz readers used them, and `cold-read.md` part 3, item 7 says to keep them.

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main`) | 33,294 | 33,288 |
| `orientation.md`, whole | 33,082 | 33,076 |
| After (installed: `orientation.md` with the skill's `:41` and `:48`) | 33,216 | 33,210 |

The installed update is 78 bytes shorter than the skill: `:7` by 41 bytes, `:89` by 45 (815 to 770; the first round's 758 in `preserve.md`, then the repair's "declaration"), and `:112` 8 bytes longer. The held changes would have cut 103 bytes at `:41` and 31 at `:48`.

**Size exception, carried.** The text stays about 33K characters against the workflow's budget of 8K to 12K (`explorations/coordinator/tools/orientation/README.md`). This update does not grow it and does not reduce it materially. The cold reads' part 3 name candidates for a cut; each needs a source check against the quiz key first, as the `:41` cut shows, and that is a consolidation run's work.

## Carried, not caused by this update

These findings of the two cold reads are on sentences that the update leaves as the skill has them, or that a hold returns to the skill's text. Holding would not remove them, so they are no reason to hold. `writer-2.log` left most of them as "What I could not place". The higher confidence first:

- `cold-read-2.md` 2.1 (high) and `cold-read.md` item 11: `I extends Index` in a program that both paths run before the switch-over. Climb batch 32's judge (its 2.2) and climb batch 33's carried it too. The held `:48` change moves the limit into the instruction but still does not say what such a program writes. Queued with the held section (`queue.md`).
- `cold-read-2.md` 2.8 and `cold-read.md` items 4 and 10: the default type of a folded constant that is not whole, a compiled `lr: RR64 = 1/1000`, and a compiled `s / n` on `ZZ32` values. Carried by climb batches 32 and 33 too; it bears on the model program's constants.
- `cold-read-2.md` 2.6: a self-typed program trait with its own `+`, between `:24` (`excludes { Number }`) and `:43`. Climb batch 33's judge carried it from its own cold read.
- `cold-read-2.md` 2.4's other bullets (`:81`, `:114`) and `cold-read.md` item 2: departures that carry no row.
- `cold-read-2.md` 2.2, 2.3, 2.5, 2.7, 2.9 to 2.12, 2.14 to 2.17, 2.19 to 2.21; `cold-read.md` items 3, 5 to 8, 12 to 17; and part 3 of each, except the `:41` list, which this judgement keeps.

Outside the orientation, for the skill writer and the quiz author: `admission.md`, "Outside the orientation", lists the landing's points for `SKILL.md:94`, `compiler.md` (`:21`, `:34`, "What the compiled path cannot compile yet", "Traps of the compiled path", `:208`) and `interpreter.md`; none is this workflow's to change. The regression key is modified in the working tree, uncommitted (`git status`); its case 36 already gives the compiled refusal that the installed "Numbers" text states (`key.md:509`, `:528`), and its case 35's **Skill** (`key.md:476`) names the `:41` sentence that the hold keeps.

At install, `sources-mapping.md` goes into the skill's `references/sources.md` beside the text (`README.md`, "Installing its result"), without the two rows of its "Fix round" table for "Traits and objects" (the P-156 rule and the self-typed traits), which were not installed.
