<!-- Climb batch 32's orientation judgement (update mode): for the whole text and for each section of orientation.md, whether its change is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason, the report line it rests on, and the size before and after. -->

# Climb batch 32: judgement of the orientation update

Judged: `orientation.md` in this folder (the second writer's text, 30,647 bytes) against `.claude/skills/fortress-repo/references/revival-changes.md` on `main` (29,382 bytes). Standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance". Reports read: `admission.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `sources-mapping.md` and `writer-2.log`.

## Verdict

**Whole text: install. No section is held.**

Three sections change: "Numbers" and "Reductions and comprehensions" by the two admitted findings (F-366, F-364), and "Static parameters, `where` clauses and sizes" by two clauses that the first cold read asked for. The opening and the other three sections are byte-for-byte the skill's text (`diff`: five places differ, old lines 68, 81, 101, 105 and 115).

## What the reports cover, and what I checked myself

- `preserve.md` was written after the first writer's round and found four failures. No preservation report covers the fix round. I read the `diff` of the final text against the skill's and checked each of the four repairs, and each sentence that the fix round added, against its source. Nothing was built or run.

| Changed claim | Source read | Result |
|---|---|---|
| Failure 1: the four places where the paths differ, without a parameter; "As a call's argument, a reduction sums in its body's type on both paths" | ledger row 1008 ("a method's return, a field, a top-level variable or an assigned variable"); `preserve.md`, failure 1, its quote of F-364 | repaired as proposed |
| Failure 2: "Where a reduction's bound names its parameter, as for ..."; "A reduction with a plain bound" | `preserve.md`, failure 2, its quote of F-59 | repaired as proposed |
| Failure 3: "`h = 0.5` is `true` for `h: QQ = 1/2`" | `admission.md`, F-366's row; `preserve.md`, failure 3 (`tests/NumeralEqualsNumberWalk.fss:15-16`) | repaired as proposed |
| Failure 4: "(the rule above)" is now "(P-46)" | `preserve.md`, failure 4 | repaired as proposed |
| Row 1007, `BIG MIN_MAX` | ledger row 1007 | supported |
| Rows 1016 and 1017, the two departures, each with its path | ledger rows 1016, 1017 | supported |
| "apply a conditional extension without its condition (row 774)" | ledger row 774 ("Walk reads the extension without its clause") | supported |
| "in an object whose `T` stayed open, `pick((1, 2))` runs `pick(x: Any)` beside `pick(x: (T,T))` (row 663)" | ledger row 663 | supported; the row is `CONTESTED`, and the sentence cites it |

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | no change | The skill's text. | `diff` |
| Dispatch and overloading | no change | The skill's text. | `diff` |
| Traits and objects | no change | The skill's text. | `diff` |
| Static parameters, `where` clauses and sizes | install | Two clauses, each supported by its row, neither admitted by `admission.md`. Each repairs a passage that the first cold reader could not turn into an action. The second cold read finds nothing on line 81; on line 68 it says "The example rescues it" (2.10, medium, on the unchanged words "passes" and "admits"). Neither clause is the one that climb batch 30's judge held the section for (see below). | `writer-2.log`, "What changed", last two items; `cold-read-2.md` 2.10; ledger rows 663, 774 |
| Numbers | install | F-366 is in the text with its conditions: the order as built with no P-N on it, the tie, both departures with their rows. Preservation failures 3 and 4 are repaired. Both quiz readers answered cases 16, 26 and 34 right, with nothing against the orientation. The second cold reader restates the section correctly; its one item on new text, 2.15 (low), asks which declaration should run in row 1017's case, and both quiz readers named that case a departure and gave a way round it. | `preserve.md`, failures 3 and 4, and "No failure found", F-366; `quiz-grade-1.md`, "Failed cases: None"; `quiz-grade-2.md`, "Nothing counts against the orientation"; `cold-read-2.md` 2.15 |
| Reductions and comprehensions | install | F-364 is in the text: the checker's order, walk's places, row 1008 at its four places with the instruction, row 1007. Preservation failures 1 and 2 are repaired. Both quiz readers answered case 9 right, with the path named. The second cold reader's restatement names the four places and no parameter, the mistake the first one made. Its item 2.16 (medium) is on sentences that the skill already has, apart from the two words "plain bound". | `preserve.md`, failures 1 and 2, and "No failure found", F-364; `quiz-grade-1.md` and `quiz-grade-2.md`, case 9; `cold-read-2.md`, part 1, "Reductions and comprehensions", and 2.16 |
| Implementation limits | no change | The skill's text. | `diff` |

### The two clauses beyond the admission, and review-queue item 526

Item 526 is open: climb batch 30's rewrite of "Static parameters, `where` clauses and sizes" was held because it told a worker to write the static arguments in all three `Bottom` cases, which row 591 does not support. That item's "other way" lists what the rewrite would also bring, among them "the `pick` example's object and row 663" and the wording for row 774. This update brings those two alone, in this round's words. It does not bring the instruction that the section was held for, the `N[\nat n\]` gloss or the cut of the size's descriptor. Item 526's question stays open for the rest; its list of what the rewrite also brings is two entries shorter, which is the coordinator's to note in the item.

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main`) | 29,382 | 29,376 |
| After (`orientation.md`, installed whole) | 30,647 | 30,641 |

**Size exception.** The update adds 1,265 bytes and cuts nothing to pay for them, against the standard's "New content must compete for space through consolidation". The text was already about 29K against the workflow's budget of 8K to 12K characters. I accept the growth for this update: about 1,000 bytes replace three passages that the landing made false, and the rest are clauses that the preservation check and the cold read asked for. The writer names candidates for a cut in rules that this landing does not touch (`writer-2.log`, "Decisions not taken"); each needs a source check and is a consolidation run's work.

## Carried, not caused by this update

These findings of the second cold read are on sentences that the update leaves as the skill has them. Holding a section would not remove them, so they are no reason to hold. They are listed for the next orientation round.

- 2.1 (high): a departure of walk or the checker stated with neither a P-N nor a row, which the opening lets a reader take as settled.
- 2.2 (high): whether a generic in a program for both paths writes `I extends Index`.
- 2.3 (high): `QQ` examples said to hold "on both paths", with the compiler's library's lack of `QQ` stated only at the section's end; and whether a compiled `lr: RR64 = 1/1000` converts or is a static error. This update adds one more such example, `h: QQ = 1/2`; both quiz readers scoped it to walk and to after the switch-over.
- 2.5 (high that it is opaque): the P-152 and P-157 sentences.
- 2.4, 2.6 to 2.14, 2.16 to 2.21, and part 3's candidates for a cut.

Outside the orientation, false since this landing and the cause of a hedge in three of the four quiz cases for each reader (`quiz-grade-1.md`, notes; `quiz-grade-2.md`, "Stale area parts"; `admission.md`, last section):

- `interpreter.md:22`: `u = 0` is `false` under walk (rows 973 and 966, FIXED).
- `library.md:25`: the checker refuses an unwritten reduction (row 731, FIXED).
- `SKILL.md:134`: "A conversion never changes which declaration runs when one already fits", with no exception for a numeral.
- `compiler.md`, the prelude's "one exception", short of P-37's second; and rows 1005 to 1031, which no area part holds, row 1015 among them.
- The regression key's cases 9, 16 and 26 quote the rewritten sentences (the key and the questions are modified in the working tree, uncommitted).
