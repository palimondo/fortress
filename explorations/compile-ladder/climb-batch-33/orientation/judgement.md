<!-- Climb batch 33's orientation judgement (update mode, run 1): for the whole text and for each section of orientation.md, whether its change is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason, the report line it rests on, and the size before and after. -->

# Climb batch 33: judgement of the orientation update

Judged: `orientation.md` in this folder (the writer's text after the fix round, 33,263 bytes) against `.claude/skills/fortress-repo/references/revival-changes.md` on `main` (33,285 bytes, last changed `efcb7f924f`). Standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance". Reports read: `admission.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `sources-mapping.md`, `writer-1.log` and `writer-2.log`; the regression key's cases 35 to 37 (`explorations/coordinator/tools/orientation/regression/key.md`, as modified in the working tree).

## Verdict

**Whole text: install. No section is held.**

Two sections change, at three places (`diff` of the two files: old `:41-49` against new `:41`, old `:49` against new `:43`, old `:97` against new `:91`):

- "Traits and objects": the compiled half of the rule "In a self-typed trait the checker types `self` as the trait met with the implementing type" (F-377, F-385), and the citation "(row 999)" in the rule's last paragraph (F-318).
- "Numbers": the rule "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist", its sentences on a `typecase` arm (F-382).

The opening and the other four sections are byte for byte the skill's text. The section headings are unchanged.

Holding either section would keep sentences that the landing made false in the skill: that an arm at `Int` takes every value without a message (row 959, FIXED), and that three compiled shapes fail when the class loads, with their workarounds and the advice to declare your own `MIN` and `MAX` (rows 1050, 1051 and 1052, FIXED). No other part of the skill names rows 1052, 1064 or 1070 (`grep` over `.claude/skills/fortress-repo/`, `sources.md` excluded), so the orientation is a worker's only source for them.

## What the reports cover, and what I checked myself

`preserve.md` was written on the first writer's text (33,082 bytes) and found two failures, both in F-382's sentence. No preservation report covers the fix round. I read the `diff` of the final text against the skill's, and checked each repair and each sentence that the fix round added against its source (F-377, F-382 and F-385 with `facts-extract.sh`; ledger rows 1052, 1064 and 1070; the key's runs for cases 35 and 37). Nothing was built or run.

| Claim in the final text | Source read | Result |
|---|---|---|
| Failure 1: row 1064's compiled half lost. Now: "Compiled, with an `Any` selector, the checker refuses that arm: 'The typecase clause, Pattern at ..., is unreachable.'" | row 1064's notes; key case 37 (c) and its run ('… QzShapeAny.fss:4.5, is unreachable.') | repaired as `preserve.md` proposed |
| Failure 2: the tuple arm's condition dropped. Now: "An undefined name in a tuple arm still binds" | row 1064's claim ("each element whose name no declaration defines"); F-382 | repaired as `preserve.md` proposed |
| "still binds on both paths, with no message (row 1064)" (fix round) | row 1064's notes: the disambiguator, which both paths run, spares the element and rewrites the arm into a binding pattern; key case 37 (a): the compile stops with 'x is undefined.' alone | supported; see the wording point under 2.10 below |
| "The row's test returns `self` at `R`, the type that its trait's `comprises { R }` lists." (fix round, `cold-read.md` item 10) | row 1070's claim and reproducer: `typecase x of s: String => self else => R(0, 0) end` at `R` in `trait Q comprises { R }` | supported; it states the measured scope, as the admission asked |
| "One shape fails the JVM's verification ... (row 1070)", in the self-typed rule | F-377 ("A typecase with `self` in one arm and another value in the other gets no cast (row 1070)", for both readings of `self`); key case 35 (d)'s run at the self-type parameter ('VerifyError: Bad return type') | supported |
| "bind `self` at the returned type, as `do r: R = self; r end`" | row 1070's workaround ("at the listed type"); key case 35 (d)'s run of `do r: T = self; r end` at `T` | supported |
| "For a generic object that lists `T` first ..., no test runs such a body, and it may fail when the class loads (row 1052)" | F-385 ("by reading, neither measured nor held by a test"); row 1052's note | supported. The key's own run of `GLate[\U\]` compiled and ran; the record holds no run, so "may" is the measured scope |

`preserve.md`'s "Checked and kept" covers the rest of the three passages (F-377's cast places, F-385's fix, the deleted `MIN`/`MAX` advice with no claim that the library's run compiled, F-318's citation, the refusal stated with no P-N while review-queue item 592 is open). The fix round did not touch those sentences.

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | no change | The skill's text. | `diff` |
| Dispatch and overloading | no change | The skill's text. | `diff` |
| Traits and objects | install | F-377 and F-385 are in the text with their scope: the cast places, the one shape left (row 1070) with its measured scope and workaround, the body on a value of type `X`, and the generic object's limit by reading (row 1052). No preservation failure was found in it. Both quiz readers answered case 35 right, with nothing against the orientation; round 2's reader gave (d)'s passing form and the full `XXX` run-time pair. The second cold read's items on the new text (2.7, 2.8; part 3, 3.1 and 3.2) are wording and scope points; its own restatement of the rule gives the right actions (below). | `preserve.md`, "Checked and kept", F-377 and F-385; `quiz-grade-1.md` and `quiz-grade-2.md`, case 35; `cold-read-2.md`, part 1, "Traits and objects", and 2.7, 2.8 |
| Static parameters, `where` clauses and sizes | no change | The skill's text. | `diff` |
| Numbers | install | F-382 is in the text: the refusal of an arm at an undefined name on both paths, stated as built with no P-N (item 592 open), `x: Any =>`, and row 1064 with both paths' behaviour. Both preservation failures are repaired (above). Round 1's quiz failed case 37 against the orientation, on the missing compiled half; round 2's reader, on the repaired text, answered cases 36 and 37 right on both paths. The second cold read's item on the new text, 2.10, is a wording point; its restatement gives the right action. | `preserve.md`, failures 1 and 2; `quiz-grade-1.md`, case 37, "Counts against the orientation: yes"; `quiz-grade-2.md`, "Failed cases: None"; `cold-read-2.md`, part 1, "Numbers", and 2.10 |
| Reductions and comprehensions | no change | The skill's text. | `diff` |
| Implementation limits | no change | The skill's text. | `diff` |

### The second cold read on the new text, and why none of it holds a section

- **2.7 (0.7), row 1070 and `comprises { R }`.** The reader cannot tell whether the failure belongs to self-typed traits, to traits with a `comprises` clause, or to both, since the section's definition of a self-typed trait excludes a `comprises` clause. The record puts it at both: F-377 states the missing cast for both readings of `self`, row 1070 measures it at a listed type, and the key's run measures it at the self-type parameter. Either reading leads to the same action, which the reader states: avoid the shape in compiled code, or bind `self` at the returned type. "In that arm" is the arm that holds `self`, the only one where `self` can be bound. Not a misdirection.
- **2.8 (0.6), row 1052.** "Can call" reads as "may" or as "works"; both readings give the same action. The generic object's limit gives no action, but it states the record's scope (by reading, no test), as the admission asked. A worker who meets the failure is pointed at row 1052. Not a misdirection.
- **2.10 (0.6), the tuple arm.** "Binds" is not glossed, and "with no message" sits before a sentence that gives the compiled checker's refusal message. Read together, the two sentences say what the key says: no 'is undefined' message on either path, and, compiled with an `Any` selector, a refusal as unreachable. The reader's action, never write an undefined name in a tuple arm, is right, and round 2's quiz reader answered case 37 right from these sentences. A wording point for the next consolidation: "with no message" means no 'X is undefined.' message.
- **3.1 and 3.2 (0.75, 0.6)**, the row's test and the generic object's coverage, as detail that changes no action. Both state the measured scope that `admission.md`, "Points for the writer", asked to keep. `writer-2.log` kept 3.2 for that reason. A cut is a consolidation's choice, not a reason to hold.

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main`) | 33,285 | 33,279 |
| After (`orientation.md`, installed whole) | 33,263 | 33,257 |

The update is 22 bytes shorter. The first round cut 203 bytes: one paragraph replaces the three failing shapes, their two workarounds and the `MIN`/`MAX` advice. The fix round added 181 bytes to the same two rules.

**Size exception, carried.** The text stays about 33K characters against the workflow's budget of 8K to 12K (`explorations/coordinator/tools/orientation/README.md`). This update does not grow it, so it adds nothing to the exception, and it does not reduce it. The second cold read's part 3 names candidates for a cut in rules this landing does not touch (3.3 to 3.11, and the repeats of the core at `:68`, `:89` and `:122`). Each needs a source check, and that is a consolidation run's work.

## Carried, not caused by this update

These findings of the two cold reads are on sentences that the update leaves as the skill has them. Holding a section would not remove them, so they are no reason to hold. `writer-2.log` left them as decisions not taken. They are listed for the next consolidation, the higher confidence first:

- `cold-read-2.md` 2.1 (0.8) and `cold-read.md` item 5: the opening's "do not assert it as correct in a plain test" against "a plain test asserts today's behaviour beside the row", and no way to tell from a row sentence which kind it is.
- `cold-read.md` item 1 (high): `SEQV` said to follow the specification "on both paths", while the compiled `===` compares strings by `=` (row 908). A compiled test written from the first sentence is wrong today.
- `cold-read-2.md` 2.12 (0.7) and `cold-read.md` item 6: the default type of a folded constant that is not whole (`0.1 + 0.2`, `0.01 / 4`), and the stated cause of the compiled `7 / 2` error. This bears on the model program's constants. Climb batch 32's judge carried a related question, a compiled `lr: RR64 = 1/1000` (its 2.3).
- `cold-read-2.md` 2.9 and `cold-read.md` item 14: `I extends Index` for a program that runs on both paths. Climb batch 32's judge carried it too (its 2.2, high).
- `cold-read.md` item 2 (medium-high): a self-typed program trait with its own `+`, between "Dispatch and overloading" (`excludes { Number }`) and the self-typed rule's last paragraph (the pair is valid).
- `cold-read-2.md` 2.2, 2.3, 2.6, 2.11, 2.13 to 2.23; `cold-read.md` items 3, 4, 7 to 9, 11 to 18; and part 3 of each.

Outside the orientation, for the skill writer and the quiz author (`admission.md`, "Outside the orientation"; none is this workflow's to change):

- `compiler.md:117` (row 1060, false since F-380; rows 1074 and 1075 in its place) and `:150` (row 812, false since F-384); `compiler.md`, the prelude's section and "The `fortress` commands", short of the selector (F-381, F-9, F-293; rows 1062, 1063).
- `interpreter.md:57` and `library.md:33`: true by default only (F-9).
- `tests-writing.md:34`: `x[5]^2` now compiles (F-387; row 1005 fixed), and still fails under walk (row 1). F-383's counting of a phase's static error as a refusal at load is not stated.
- Rows opened by the landing that no part holds: 1062, 1063, 1065, 1067, 1068, 1069, 1071 to 1075.
- The getter-before-method rule ('Field/getter/setter declarations should come before method declarations.'), which the key's run of case 35 (c) met and no part of the skill states (`quiz-grade-1.md`, case 35). An area part's, if anywhere.
- The regression key and questions are modified in the working tree, uncommitted (`git status`: `regression/key.md`, `regression/questions.md`). Case 37's **Skill** line words the orientation as "still binds, under walk (row 1064)"; the installed text says "on both paths" and adds the compiled refusal. The key's expected answers already match the installed text. The key's case 1 is true by default only since F-381 and F-9.

At install, `sources-mapping.md` goes into the skill's `references/sources.md` beside the text (`README.md`, "Installing its result").
