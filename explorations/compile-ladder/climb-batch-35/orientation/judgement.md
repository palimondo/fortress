<!-- Climb batch 35's orientation judgement (update mode, run 1 of CLIMB-BATCH-35.md): for the whole text and for each section of orientation.md, whether its change is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason, the report line it rests on, and the size before and after. Installed: the opening, F-400 in "Traits and objects" (:32), and "Numbers" (P-165 and P-174). Held: three cuts of the fix round, :41 and :43 in "Traits and objects" and :134 in "Implementation limits". -->

# Climb batch 35: judgement of the orientation update

**What was judged.** `orientation.md` in this folder: the writer's text after the fix round (`writer-2.log`), 34,073 bytes.

**Against what.** `.claude/skills/fortress-repo/references/revival-changes.md` on `main`, 34,077 bytes. That file last changed at `91dde58f83`. `main` is still at the admission's base, `9322330fa8`, and `.claude/` has no change in the working tree (`git status`).

**The standard.** `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance".

**The reports read.**

- `admission.md`, `preserve.md`, `cold-read.md` and `cold-read-2.md`.
- `quiz-grade-1.md`, `quiz-grade-2.md` and `quiz-cases.txt` (cases 5, 13, 26 and 32).
- `sources-mapping.md`, `writer-1.log` and `writer-2.log`.
- These parts of the regression key (`explorations/coordinator/tools/orientation/regression/key.md`): cases 13, 21, 32 and 35, and the **Skill** lines at `:171`, `:262`, `:423` and `:479`. The key is modified in the working tree and is not committed.
- `climb-batch-33b/orientation/judgement.md` and `climb-batch-34/orientation/judgement.md`, for the same cuts judged before.
- The skill's `references/sources.md:1041-1042`.
- The entries P-12, P-165, P-174, P-176, P-180, F-324, F-341, F-342, F-347 and F-400, and ledger rows 1106 to 1109.

Nothing was built or run.

## Verdict

**Whole text: install, except three cuts of the fix round, which are held.**

A `diff` of the two files changes nine lines in four sections:

- **The opening, `:7`.** One sentence: a departure that cites a FACTS entry in place of a row is read as one that cites a row. This is from the fix round (`cold-read.md` item 3).
- **"Traits and objects":**
  - `:32`: admitted change 1 (F-400).
  - `:41`: the fix round cut the list of shapes in which a compiled `self` return runs.
  - `:43`: the fix round cut the sentence that the library's array `+` and `-` are valid, and that walk loads such a pair in the library and in a program's own component.
- **"Numbers":**
  - `:89`: the fix round cut "route A".
  - `:99`: admitted change 3 (P-174), with the fix round's repairs.
  - `:112`: admitted change 2 (P-165), with the fix round's repairs.
  - `:116` is the skill's text again. The fix round restored "the one library's `asFloat`".
- **"Implementation limits", `:134`:** the fix round cut "Walk will run the checker only after the switch-over", and moved P-12 onto the bold rule.

**Installed:**

- the opening;
- `:32` of "Traits and objects";
- "Numbers", whole.

**Held** (the skill keeps its text):

- `:41` and `:43` of "Traits and objects";
- "Implementation limits", whole: its one change is `:134`.

The other three sections are the skill's text, byte for byte. The headings are unchanged.

**Why "Traits and objects" is split.** If the whole section were held, the skill would keep at `:32` the "Two departures" sentence: the checker accepts an `override` that overrides nothing (row 653), and the code generator refuses every `override` (row 650). F-400 made both clauses false, and rows 650 and 653 are `FIXED` (`d56eb8a882`, `8dc97a08df`). The key now grades that answer as the old text (case 13, `key.md:171`, `:173`). The `:32` change passes all three tests. `:41` and `:43` are separate lines, and neither depends on `:32`. In update mode, the held change is the one that is not made, so I hold the two cuts and install `:32`.

## What the reports cover, and what I checked myself

The reports were written on different texts:

- `preserve.md` (16:25) and `quiz-grade-1.md` were written on the first writer's text.
- `cold-read-2.md` (16:48) and `quiz-grade-2.md` were written on the final text (`orientation.md`, 16:41). `cold-read-2.md` quotes the final wording.

So no preservation report covers the fix round. I read each line that the fix round changed against its source:

| Line in the final text | Source read | Result |
|---|---|---|
| `:99`, `preserve.md` failure 1: "The body computes from them and invokes no method", and "walk computes it at the place's first run, the compiled path at compile time or when the class loads. Each run of that place reuses it (P-176)." | P-174 ("a computation at compile time, with no method invocation"); P-176 (walk at the first evaluation; a constant, or a `static final` filled when the class loads); F-347 | repaired. The text no longer says that the body runs at compile time on both paths. |
| `:99`, failure 2: "The four static arguments are naturals of any size, without the `NN32` bound of a size." | P-174 ("the four are naturals of any size; this implementation's `NN32` bound (P-40) is for sizes") | repaired |
| `:99`, failure 3: "and is refused statically where it does not fit" | P-174, the same words | repaired |
| `:99`, failure 7: "walk, the checker and the code generator read each as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347)" | F-341 (walk binds the four "as values of type `ZZ`"); F-342 (the checker: "a `ZZ` where it is one of a numeral coercion's four numbers ... (no row)"); F-347 (the method "of the four numbers as `ZZ` values"); walk's refusal measured in key case 32 at `5f35b1d058` | repaired. Only walk's refusal is stated as observed. The checker's refusal is inferred, and the text does not state it. |
| `:99`: "Under walk, write `Byte(v.asZZ32)` today, as the one library does." | P-174's last sentence; `Library/FortressLibrary.fss:847`; the quiz gradings, case 32 (binds 255 under walk) | true, and scoped to walk. On the compiled path, the prelude's `ZZ` has no `asZZ32` (row 349, `quiz-grade-1.md` case 32). The text does not claim it there. |
| `:112`, failures 4 and 5: "Each of the eight number types converts into `RR64` by its own getter, `x.asRR64`. The one library departs: each declares `asFloat(self): RR64` instead, so write `asFloat(x)` (F-324)." | P-165 (the eight, the getter); F-324 ("for P-165's name ... (no row)"); `Library/FortressLibrary.fsi:321` to `:727` (`preserve.md`, "What holds") | repaired. The departure is the one library's, and a program's own number type is outside the rule. |
| `:112`: "write `asFloat(x) = y` for an `RR64` `y`" | F-324 ("a written `asFloat(x) = y`"); the same paragraph's `SEQV` rule | true. This answers `cold-read.md` item 16. |
| `:116`: the skill's text again | `diff` | failure 5 is repaired |
| `:32`, the minor note: "So under walk a Java-style `override` in the library stops every program" | `preserve.md`, "Minor, not counted" | repaired |
| `:7`: "A departure that cites a FACTS entry (F-N) in place of a row has no row yet: treat it as one that cites a row." | `grep` of the final text: the only F-N citations are `:99` and `:112`, and both are departures. The admission, "Points for the writer", P-174's third bullet, says that a departure from a decided rule is asserted in an `XXX` test with the rule's answer. | true. The sentence covers exactly the text's F-cited sentences. |
| `:89`: "The record calls the number types 'the tower'", where the skill says "The record calls this design route A, and still calls ..." | P-43's own heading ends "(route A)", and the rule cites P-43; no key case names "route A" (`grep`) | no finding is lost. The name stays in P-43, which this rule cites. |
| `:41`: the cut of "also from an arm of a conditional or a `case` expression, a function expression or a local function" | key case 35's **Skill** (`key.md:479`); `climb-batch-33b/orientation/judgement.md`, which held the same cut | **preservation failure** (below) |
| `:43`: the cut of the library-validity sentence and of "so it loads such a pair in the library and in a program's own component" | key case 21's **Skill** (`key.md:262`); `sources.md:1041` (F-318, row 804 fixed); `climb-batch-34/orientation/judgement.md`, "Carried" | **preservation failure** (below) |
| `:134`: "**Walk has no static types (P-12).**", where the skill says "**Walk has no static types.** Walk will run the checker only after the switch-over (P-12)." | P-12; `sources.md:1042` (climb batch 26's cold-read fix: "walk's plan to run the checker after the switch-over stated as a plan, P-12") | **scope lost** (below) |

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | **install** | **Preservation:** the one new sentence is true of the text (above).<br>**Quiz:** no case reads it. Both rounds treat the two F-cited departures as the tree's, not the rule: `asFloat` is the tree's form and `x.asRR64` is the getter; `Byte(v)` is the rule and `v.asZZ32` is the tree's form.<br>**Second cold read:** it restates the sentence as intended: "cites a ledger row or an F-N: unsettled behaviour that can change". Its items on the opening (A, and B and C in part) are on sentences that this update leaves as they are. | my check above; `quiz-grade-2.md`, cases 5 and 32; `cold-read-2.md`, part 1, "Opening", and part 2, A to C |
| Dispatch and overloading | no change | The skill's text. | `diff` |
| Traits and objects | **install `:32`; hold `:41` and `:43`** | **`:32`, preservation:** F-400's main rule holds, and the minor note is repaired. Failure 6 (rows 1106 and 1108) is decided below: keep the sentence, and send the two rows to `compiler.md`.<br>**`:32`, quiz:** both rounds answer case 13 "right without its path or scope qualification". Its walk and checker halves follow `:32`. Its wrong code-generator half comes from `compiler.md:89`, and the key puts that half on `compiler.md`. Nothing is counted against the orientation.<br>**`:32`, second cold read:** it reads the sentence as intended ("A Java-style `override` in the library stops every walk program"). Its item R (0.3) is on row 1037 and row 1094, which this update does not change.<br>**`:41`, preservation failure left; its quiz case was not run:** the cut removes the sentence that key case 35's **Skill** names, "`self` returned at `X` runs, also from an arm of a conditional or a `case` expression, a function expression or a local function". The key says that "the orientation is the reader's only source" for rows 1050 to 1052 and 1070. Case 35 was not run (`quiz-cases.txt`: 5, 13, 26, 32). Climb batch 33b held the same cut for the same reasons.<br>**`:43`, preservation failure left; its quiz case was not run; the second cold read flags the new wording:**<br>- The cut removes "its sentence that walk loads the pair in a program's own component", which key case 21's **Skill** names. That sentence is the orientation's statement of F-318 (`sources.md:1041`).<br>- Climb batch 34's judge recorded that both readers of case 21 based their right answer on the library-validity sentence, so a cut needs case 21 run again. It was not run.<br>- The new "Walk reads `self` in the same way" now follows the row 1094 sentence. `cold-read-2.md` H (0.55) reads "the same way" as that departure. | `preserve.md`, "What holds" and failure 6; `quiz-grade-1.md` and `quiz-grade-2.md`, case 13; `cold-read-2.md`, part 1, "Traits and objects", and H; `key.md:171`, `:262`, `:479`; `quiz-cases.txt`; climb batch 33b's and 34's `judgement.md` |
| Static parameters, `where` clauses and sizes | no change | The skill's text. | `diff` |
| Numbers | **install** | **Preservation:** P-165 and P-174 are in the text with the conditions that `preserve.md` asked for. Failures 1 to 5 and 7 are repaired (above). The `:89` cut loses no finding (above).<br>**Quiz:** both rounds answer cases 5, 26 and 32 right, and round 2 read the final text. No reader takes `asFloat` or `Byte(v.asZZ32)` as the decided design, and no reader says that `x.asRR64` or `Byte(v)` runs today. This is the trap of `HELD.md:10` and of the key's new **Wrong** entries.<br>**Second cold read:** nothing would send a worker wrong (below). | `preserve.md`, "Failures" and "What holds", with my check above; `quiz-grade-1.md` and `quiz-grade-2.md`, "Counts" and cases 5, 26 and 32; `cold-read-2.md`, part 1, "Numbers", and E, F, G, N and Q |
| Reductions and comprehensions | no change | The skill's text. | `diff` |
| Implementation limits | **hold** | **Scope lost.** The skill's sentence ties P-12 to a plan: walk runs the checker after the switch-over. It came in on purpose, as climb batch 26's cold-read fix (`sources.md:1042`). The new text cites P-12 on the bold rule "Walk has no static types". By the opening's key, a bold sentence with a P-N reads as the curator's decision. But P-12 decides that walk gains the checker's static types after the switch-over. So the time scope is lost, which the standard asks to keep, and the citation now supports the opposite of P-12's plan.<br>No quiz case and no cold read covers the new text. The cut saves 54 bytes. | P-12; `sources.md:1042`; the standard, "the scope distinctions survive"; `quiz-cases.txt`; `cold-read-2.md`, part 1, "Implementation limits" |

### The second cold read on the installed new text, and why none of it holds a section

- **E (0.65 and 0.5), `:99`.**
  - "The body computes from them and invokes no method": the reader asks whether this is a rule or a description, beside `Byte(v.asZZ32)`. The sentence is in the group that cites P-174. The next sentences name the tree's departure and the form that runs today. The reader's own part 1 gives the intended action: "Today, under walk, I write `Byte(v.asZZ32)`, not `Byte(v)`".
  - The reader asks whether a compiled `Byte(v)` works today. The text says that the checker and the code generator read each number as a `ZZ`. Round 2's reader of case 32 placed the compiled path right from this text.
  - Quiz case 32 tests exactly this paragraph, and both rounds answered it right.
  - A point for the wording, not a misdirection.
- **F (0.55), `:99` against the core.** `SKILL.md:135` states the departure as the rule. This is the core's sentence, item 2 of the admission's "Outside the orientation". The orientation is right. The core must be fixed at the same install (below).
- **G (0.5), "the `NN32` bound of a size".** The core does not give this term. The claim, that the four numbers have no bound, is P-174's, and it is what `preserve.md` failure 2 asked for. The term does not change what a worker does. A point for the wording: "without a size's bound (P-40)".
- **N (0.4), `:112` and `:116`.** No compiled form of the conversion into `RR64` today. The skill's text had the same gap. `compiler.md:149` gives `i.asRR64` for a `ZZ32`, and both readers of case 5 found it there. Carried.
- **Q (0.35), `:89`.** "Such a type runs on both paths" is the skill's sentence, unchanged. The new `:99` departure qualifies it in the same section. Carried.

## Decisions the writer left open

1. **`preserve.md` failure 6: rows 1106 and 1108 at `:32`.** Keep the sentence as it is.
   - The admission asked for no sentence on rows 1106 to 1109, under P-180 and `403a0e60cb`. The ledger holds each row.
   - The sentence is the rule, and it is true outside row 1108's object expression. The skill's sentence was wrong for every program.
   - Neither quiz reader of case 13 went wrong on the checker.
   - The condition still needs a home in the skill. When the skill writer corrects `compiler.md:89` (`override` is now compiled), the correction should carry row 1106 ("wherever no static parameter is involved", F-400). Row 1108 should go to `compiler.md`, "The checker's gaps", or to the coordinator under P-180.
2. **`Byte(v.asZZ32)` at `:99`, against P-180.** Keep it.
   - The admission left the clause to the writer.
   - The key's **Expected** for case 32 accepts "a form that runs today".
   - The text labels the form as the tree's: "Under walk ... today, as the one library does", after "The tree departs".
   - Both quiz readers kept the rule and the form apart.
   - The clause and the departure sentence go together when P-174's rung lands (`BOOT.md:15`). Dropping the clause alone would leave a walk program with no form that runs.
3. **"No type declares `asRR64`" (`writer-1.log`).** It is not needed. "The one library departs: each declares `asFloat(self): RR64` instead" says it. Both readers of case 5 said that `x.asRR64` does not run today.

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main`) | 34,077 | 34,071 |
| `orientation.md`, whole | 34,073 | 34,067 |
| After (installed: `orientation.md` with the skill's `:41`, `:43` and `:134`) | 34,527 | 34,521 |

By line, before and after, in bytes. Every changed line is ASCII, so the characters are the same.

| Line | Before | `orientation.md` | Installed |
|---|---|---|---|
| `:7` | 922 | 1,033 | 1,033 |
| `:32` | 882 | 749 | 749 |
| `:41` | 871 | 774 | 871 (held) |
| `:43` | 1,276 | 973 | 1,276 (held) |
| `:89` | 770 | 733 | 733 |
| `:99` | 1,562 | 1,955 | 1,955 |
| `:112` | 958 | 1,074 | 1,074 |
| `:134` | 287 | 233 | 287 (held) |

The installed update adds 450 bytes:

- `:99`: 393 bytes;
- `:112`: 116 bytes;
- `:7`: 111 bytes;
- `:32`: 133 bytes fewer;
- `:89`: 37 bytes fewer.

**Size exceptions.**

1. **Carried.** The text is about 34K characters, against the workflow's budget of 8K to 12K (`explorations/coordinator/tools/orientation/README.md`). This update makes it larger.
2. **New, and a conflict.** The admission asked to keep each change to the sentence that it corrects. `:99` and `:112` grew because the fix round repaired `preserve.md` failures 1 to 5 and 7, and cutting any of those repairs would bring a failure back.
   - The writer paid for the growth with four cuts elsewhere. Three of them lose findings that the key or the record holds (above), so I held them.
   - So this update cannot stay at the old size without losing essential meaning. I expose the conflict, as the standard asks, and do not compress further.
   - Each cut candidate in the cold reads' part 3 needs a check against the key's **Skill** lines first, and the quiz cases that name it must be run. That is a consolidation run's work.

## Carried, not caused by this update

These findings are on sentences that the update leaves as the skill has them, or that a hold returns to the skill's text. Holding a section would not remove them, so they are no reason to hold. `writer-2.log` left most of them as "What I could not place". The higher confidence comes first:

- `cold-read-2.md` B (0.7) and `cold-read.md` item 6: the bold divergence at `:122` (row 1008). Which path's answer should an `XXX` test assert?
- `cold-read-2.md` D (0.65) and `cold-read.md` item 2: "`SEQV` follows the specification on both paths" (`:57`) against row 908 (`:64`).
- `cold-read-2.md` A (0.6) and `cold-read.md` item 5: what a worker cites when building on an unmarked sentence.
- `cold-read-2.md` C (0.5) and `cold-read.md` items 4 and 13: "compiler's library" and "compiler's prelude" used as one name; `:89`'s prelude sentence without "Until the switch-over".
- `cold-read-2.md` I (0.5) and `cold-read.md` item 8: the tuple `typecase` arm at `:91`.
- `cold-read-2.md` K and `cold-read.md` item 11: `I extends Index` in a program that both paths run before the switch-over (`:48`). Climb batches 32 to 34 carried this.
- The rest of `cold-read-2.md` part 2: J, L, M, O, P, R to W.
- The rest of `cold-read.md` items 7, 9, 10, 12, 14 and 15.
- Part 3 of each cold read. Three of its candidates are the cuts that this judgement holds. The others need the check against the key that the size section describes.

## For the install and the coordinator

- **Install.** The skill writer installs `orientation.md` with the skill's own `:41`, `:43` and `:134` (34,527 bytes).
- **`sources-mapping.md`.** Add it to `references/sources.md` beside the text (`README.md`, "Installing its result"). Leave out what was held:
  - In its "Fix round" table, the row "Self-typed traits; 'Walk has no static types'; 'The number types are flat siblings'" keeps only the cut of "route A" (`cold-read.md` part 3, item 6).
  - The cuts of the `self` return list, the array `+` and `-` justification, and P-12's plan are not installed.
- **The core, in the same install.** `SKILL.md:135` ("but a `ZZ` where it is one of a numeral type's numbers") states P-174's old words as the rule. The installed `:99` calls that reading the tree's departure. If the core is not fixed with the install, a worker reads two rules (`cold-read-2.md` F). The fix is the admission's "Outside the orientation", item 2. The other false sentences that list names are not this workflow's to change:
  - `SKILL.md:126` (F-401);
  - `library.md:23` (P-165's name);
  - `compiler.md:58`, `:89` (with rows 1106 and 1108, above) and `:157`;
  - `interpreter.md:26` and `:35`;
  - `tests-writing.md:34`.
- **The regression key.** It is modified in the working tree and is not committed. When it is committed, align case 32's **Skill** (`key.md:423`) with the installed wording. Today it quotes the first writer's departure sentence ("walk and the checker refuse `Byte(v)`, and the library's coercions write `v.asZZ32`"). The installed text reads "walk, the checker and the code generator read each as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347). Under walk, write `Byte(v.asZZ32)` today, as the one library does." Case 13's **Skill** (`key.md:171`) already matches `:32`.
- **The held cuts.** `queue.md` gives them. A later run may cut `:41` or `:43` only after it runs cases 35 or 21 on the cut.
