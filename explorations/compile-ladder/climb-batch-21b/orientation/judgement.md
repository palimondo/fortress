<!-- The orientation workflow's judgement of climb batch 21b's update, update mode: install or no change for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz; the four changed parts install (the opening, Dispatch and overloading, Traits and objects, Numbers) and the one row move in Reductions and comprehensions installs, and no section is held; the sizes and the size exception; what the install needs; findings on unchanged text and on the compiled path, for the next update. Read at `ce9357fc4`, where the skill is unchanged since the admission's base `aff478ca5` and orientation.md is the fix round's text of 00:14. -->

# Climb batch 21b's update of the orientation: the judgement

Mode: update.

**What I read.**
- In this folder: `orientation.md` (the final text), `admission.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, and the two writer logs.
- The current part, `.claude/skills/fortress-repo/references/revival-changes.md`. It is unchanged since `aff478ca5`: `git log aff478ca5..HEAD -- .claude/skills/fortress-repo/` prints nothing. I also read its `diff` against `orientation.md`, which has twelve hunks, and `SKILL.md`.
- `exploring.md:14-27`; `compiler.md:1-4`; `library.md:23`; `interpreter.md`, "What walk checks" (13 row citations, and the Meet Rule bullet at `:57`).
- POSITIONS P-26, P-43 and P-97, and FACTS F-166 and F-271 (`facts-extract.sh`). The ledger rows 364, 416, 551 and 731 (`ledger.py show`).
- `Library/FortressLibrary.fsi:488`, `:535`, `:592`, `:650` and `:1267`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:131`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:266-270` and `:433-450`; `ProjectFortress/compiler_tests/XXXFunctionalMethodMeetTopLevelAbstract.fss` and its `.test`.
- `grep`s of the skill, FACTS and POSITIONS for `IncompatibleClassChangeError` and "route C".

**What I ran.** Only reads, greps, `ledger.py`, `facts-extract.sh`, and `skills-lint.py`. I ran the lint on a scratch copy of `orientation.md` laid out as the part. It prints no hit and exits 0, as the current part does. The writer's lint did not run (`writer-2.log`), so this is the text's only lint.

**Which text each check read.** The preservation check read the first text (18,427 characters), which held change A alone. So I read its one failure against the final text. I also read each sentence that the fix round changed against its source, because no other check did.

Line numbers are those of the final `orientation.md`.

## Verdicts

| Part | Lines | What changed | Verdict | Rests on |
|---|---|---|---|---|
| The opening | 1-7 | line 5: "the team's later type papers (`Papers/`)"; line 7: new sentence on "Until the switch-over" | install | `cold-read.md` 2.4 and 2.19; `cold-read-2.md` section 1, "Preamble", fourth bullet; its 2g weighed below |
| Dispatch and overloading | 9-24 | line 17: "the ledger row that it cites"; the `h(self)` case moved from the duplicates list to a Meet Rule sentence (line 24) | install | `cold-read.md` 2.6 and 2.7; climb batch 21's judgement, "Findings on unchanged text", 1; the test `XXXFunctionalMethodMeetTopLevelAbstract` |
| Traits and objects | 26-50 | line 28: one sentence cut, row 416 moved; line 30: row 551; line 32: "by this rule"; line 45: five wording fixes in the `Index` rule | install | `cold-read.md` 2.2, 2.3, 2.5, 2.8, 2.11, 2.13 and section 3; ledger rows 416 and 551; `cold-read-2.md` 2a and 2b weighed below |
| Static parameters, `where` clauses and sizes | 52-71 | nothing | no change | none |
| Numbers | 73-83 | change A (line 83); line 75: "route C" cut; line 81: "For a result that is not an integer" | install | `preserve.md` failure 1, fixed; cases 5, 7 and 23 right in both rounds; `quiz-grade-2.md`'s first observation weighed below |
| Reductions and comprehensions | 85-95 | line 89: row 731 moved from the instruction to the checker's sentence | install | `cold-read.md` 2.2; ledger row 731 |
| Implementation limits | 97-101 | nothing | no change | none |

The whole text installs. It is the current part with the changes of the five parts above. No section is held, so `queue.md` files no item.

The second cold read finds two passages, rated high, that could send a worker wrong (2a and 2b). Both are in the `Index` paragraph, in sentences that this update leaves unchanged or only gives a pointer. A hold would keep the old text, which has the same passages, so a hold cannot fix them. 2b is met by the fix round's pointer to `compiler.md`. 2a goes to "Findings", item 2, for the next update. Both are weighed under "Traits and objects".

### The opening: install

**The changes.**
- Line 7 now says that a sentence that opens "Until the switch-over" states a limit of the compiler's library, which ends at the switch-over. This closes `cold-read.md` 2.4 (high): the reading scheme gave no class to these sentences.
- Line 5's "the type group's later papers" is now "the team's later type papers (`Papers/`)". This closes 2.19: the core does not name the type group.

**Against the sources.**
- **The new sentence holds on every sentence that it classifies.** The text has three sentences that open "Until the switch-over": line 45 (no `Index` in the prelude), line 81 (the prelude's powers) and line 83 (no `QQ` in the prelude). Each states a limit of the compiler's library. The end that the sentence gives is the core's own definition of the switch-over (`SKILL.md`, "The phases", last paragraph). The second cold reader read the sentence as it is meant (`cold-read-2.md` section 1, "Preamble", fourth bullet).
- **The pointer `(`Papers/`)` is narrower than P-26.** P-26 counts the type group's POPL 2019 paper among the "later word" (F-166, F-271). That paper is in `research/extracts/ParkPOPL2019-extract.md`, outside `Papers/` (`exploring.md:22`, `:26`). This is not a hold:
  - The sentence is provenance. A builder takes the rules as given, so no building action depends on it.
  - The same parenthesis names P-26 and `exploring.md`, and both of them name the 2019 paper and give its place. So an explorer who follows the sentence is not sent wrong.
  - It goes to "Findings", item 6.

**The second cold read, on the changed text.**
- **2g (medium, 0.5): the edges of the new marker.**
  - Line 71, "runs compiled only after the switch-over", states a limit without the opening words.
  - Line 81's last two sentences sit in an "Until" paragraph but cite rows 441 and 523.
  - No wrong action follows from either. Line 71 states its limit plainly. Line 81's two sentences cite rows, so by line 7 they are departures. A worker who reads them either way does not assert them in a test and expects them to change.
- **2c to 2f** are on old sentences of the opening: the citation rule, P-26's two readings, departures without a row, and what to assert instead. They are unchanged by this update. Items 1 and 3 of "Findings" hold them.

### Dispatch and overloading: install

**The changes.**
- **The `h(self)` case.** It left the duplicates list. It is now its own sentence (line 24): an abstract functional method counts for the Meet Rule, and the checker refuses `h(self): ZZ32` in a trait `S` beside a top-level `h(x: String): ZZ32`, because `S` and `String` neither exclude each other nor nest, and nothing covers their meet. This is the fix that climb batch 21's judgement asked for ("Findings on unchanged text", 1), after both of that update's cold reads flagged the old bullet as sending a worker wrong.
- **Line 17.** "the case and its row" is now "the case, and the ledger row that it cites" (`cold-read.md` 2.6).

**Against the sources.**
- The test bears the new sentence out word for word:
  - `ProjectFortress/compiler_tests/XXXFunctionalMethodMeetTopLevelAbstract.fss` declares `trait S` with an abstract `h(self): ZZ32`, an object that implements it, and a top-level `h(x: String): ZZ32`, with no third declaration.
  - Its `.test` reads `compile_err_contains=Invalid overloading of h`.
  - The sentence, like the bullet that it replaces, claims nothing about walk.
- `interpreter.md`, "What walk checks", cites 13 ledger rows, so "the ledger row that it cites" has a referent.

**The second cold read, on the changed text.**
- It read the new sentence right: "So `h(self)` in trait `S`, beside a top-level `h(x: String)`, needs a declaration that covers their meet" (section 1, "Dispatch and overloading", last bullet).
- **2l (medium, 0.5): the core never names the Meet Rule.** The core states the rule ("a third covers their meet", `SKILL.md`, "Fortress as a language", first bullet), and `interpreter.md:57` names it ("the Meet Rule for Functional Methods"). The reader inferred the rule rightly, so no wrong action follows.
- **2q (low)** is on line 19, which is unchanged.

### Traits and objects: install

**The changes, each against its source.**
- **Line 28.** "Without the rule, such programs die with `IncompatibleClassChangeError`" is cut (`cold-read.md` section 3, first item).
  - It is the reason for P-43 and P-97, not an action: the checker now refuses such a type, so no worker meets the error.
  - The fact stays in the record (F-44, F-45; `FACTS.md:38-39`) and in `sources.md:419`. So the cut loses nothing.
  - Walk's sentence now ends with row 416. The row's claim covers its refusal of overloads at `Tg[\3\]` and `Tg[\4\]`, and the old text already said "So it runs such a type".
- **Line 30.** Walk's check of the main component's clauses now cites row 551. The row's claim is the sentence: "the load check does not check a `comprises` clause declared outside the main component". So the sentence is now marked as a departure, as the opening asks (`cold-read.md` 2.3).
- **Line 32.** "overrides nothing by this rule" (2.8) adds no claim.
- **Line 45, the `Index` rule.**
  - "as the count stage does (`compiler.md`)": `compiler.md:3-4` defines the count stage.
  - "Of the integer types, only `ZZ32` extends `Index`": `ZZ32` declares `Index` (`FortressLibrary.fsi:535`). `NN64` (`:488`), `ZZ64` (`:592`), `ZZ` (`:650`) and `NN32` (`FortressBuiltin.fsi:131`) do not.
  - `f(3)`'s rule and walk's departure are now two sentences, and row 364 is on walk's.
  - "an array indexed by `ZZ32`" (2.11).

**The second cold read, on this section.**
- **2a (high, 0.75): line 45's order "write `I extends Index`" comes nine sentences before its compiled limit.**
  - The sentence is unchanged. Climb batch 21's judgement weighed the same pair ("contradictory as written") and found no wrong action. Both statements are true. A worker who follows both writes the bound and does not compile the program to check it.
  - This reader also stated the limit in its own reading ("Limit: until the switch-over, a compiled program cannot name `Index` at all", section 1, "Traits and objects").
  - Moving the limit next to the order is a small fix for the next update ("Findings", item 2).
- **2b (high, 0.9): "count stage" is not in the core.** The fix round added the pointer `(`compiler.md`)`, and `compiler.md:3-4` defines the stage. The cold reader read only the core and the orientation, so it could not follow the pointer. A worker can. The action is the same either way: write the bound.
- **2k, 2m, 2n, 2p, 2r, 2z and 2aa** are on sentences that this update did not change.

### Numbers: install

**The changes.**
- **Change A (line 83), F-284 generalised.** `/` on two integers answers a `QQ`. Truncate with `DIV`, on both paths. For a float, make one operand a float, and give a `ZZ64` `asFloat` first. Until the switch-over, the compiler's library has no `QQ` and declares `/` only at `RR64`.
- **Line 75.** "and calls the nested tower that was not chosen route C" is cut (`cold-read.md` section 3, third item).
- **Line 81.** "For a fraction" is now "For a result that is not an integer" (2.19).

**Preservation.**
- **Failure 1 is fixed.** Line 83 now reads "For a float, make one operand a float, as `(1.0 s) / n`; a `ZZ64` needs `asFloat` first". This is `preserve.md`'s repair, in its words. Quiz reader 2 quoted the clause in case 5 and needed no lookup (`quiz-grade-2.md`, case 5).
- **The fix round's other clause holds.** "Truncate with `DIV` on both paths" comes from `quiz-grade-1.md`'s second observation and the admission's **Scope**. The prelude declares `DIV` at each integer type (`CompilerBuiltin.fsi:131` to `:420`, as `preserve.md` read them).
- **The other clauses** are those that `preserve.md` checked and kept.
- **The route C cut loses nothing.** The record defines the term where it uses it: F-46's own title opens "Route C, the patents' forest rule ...", and P-43 points to F-46.
- **"For a result that is not an integer"** is true of both of the line's examples: `2.0^(-1)` gives a float, and `(2/3)^(-1)` gives the `QQ` `3/2`.

**Quiz.** Cases 5, 7 and 23 are right in both rounds, with their path and scope qualifications (`quiz-grade-1.md` and `quiz-grade-2.md`, "Counts": 3 right, 0 right without qualification, 0 wrong). Case 23 is the case that the admission asked for, and it tests change A. Neither reader wrote `(lo + hi) / 2` or `1 / 10^k`.

**Weighed, and not a hold: the compiled float line.**
- **The finding.** Quiz reader 2 claimed that `(1.0 done) / total`, for `ZZ32`s, compiles before the switch-over (`quiz-grade-2.md`, first observation). By reading, it does not:
  - the prelude's `RR64` coerces only from `FloatLiteral` and `RR32` (`CompilerBuiltin.fsi:434-435`);
  - it declares juxtaposition and `/` only with another `RR64` (`:446`, `:448`);
  - a `ZZ32` reaches `RR64` only by the dotted `asRR64()` (`:268`).

  I read these lines and they are as the grader quotes them.
- **Why it is not a hold.**
  - No case fails: the key marks the point "not needed".
  - Line 83 claims nothing about compiled float division, as the admission's **Scope** asks.
  - The reader's chain ran through `library.md:23` and the core's "A wider type declares a `coerce` from each narrower one". Both are unchanged, and both state the interpreter's library.
  - A hold would remove the `/` rule, whose failures are on record (rows 174, 449 and 468). The old text has the same gap, so a hold would not close it.
  - A wrong compiled spelling stops at the checker with a static error. It does not give a wrong value.
- **Where it goes.** "Findings", item 7.

**The second cold read** read the new rule right (section 1, "Numbers", the `/` bullet). Its 2h and 2t are on old sentences of lines 77 and 81.

### Reductions and comprehensions: install

**The change.** Row 731 moved from "Write it in every clause form" to the sentence before it, "The checker does not infer it ... whose bound names the parameter" (`cold-read.md` 2.2).

**Against the source.** Row 731's claim is that checker gap: "the compiled checker fixes a generic big operator's static parameter in an unwritten clause form by its bound or the expected type only ... one whose bound names the parameter ... has no instance". So the row now marks the departure, and the instruction no longer reads as one.

**The second cold read** read it right ("The checker needs it (row 731)"). Its 2j and 2u are on line 95, which is unchanged.

### The unchanged parts

Nothing changed in "Static parameters, `where` clauses and sizes" or "Implementation limits". Their text in the part stays as it is.

## Size

- **Before:** the current part, 18,155 characters.
- **After:** `orientation.md`, 18,749 characters, 594 more:
  - the opening, 1,425 to 1,596 (+171): the marker sentence, and 6 for the rename;
  - "Dispatch and overloading", 3,074 to 3,230 (+156): the `h(self)` sentence with its reason, and line 17's words;
  - "Traits and objects", 5,531 to 5,526 (−5): the cut of 73 characters pays for the row, the pointer and the four wordings;
  - "Numbers", 2,528 to 2,800 (+272): change A's paragraph is 313 characters, the route C cut saves 64, and line 81's wording costs 21;
  - the other three parts are unchanged.
- **Budget:** 8,000 to 12,000 characters (the workflow's README). The part was 6,155 over before this update and is 6,749 over after it.

**Size exception: accepted for this install, and the conflict is exposed again.**
- **Why it is accepted.** Every added clause does one of four things:
  - states the one admitted correction, whose mistakes are on record: rows 174, 449 and 468 (`admission.md`, change A);
  - repairs the preservation failure: the `ZZ64` clause;
  - closes a quiz gap: "on both paths";
  - closes a finding that a cold read rated high, or that climb batch 21's judgement found would send a worker wrong: the marker sentence (`cold-read.md` 2.4) and the `h(self)` sentence.

  Cutting any of them would bring back a failure of the reports (synthesis, "Acceptance and maintenance").
- **The competition for space was applied.** The admission admitted one change from 21 entries. The writer paid for part of the growth with two cuts that change no action (137 characters).
- **What overran.**
  - Change A is 313 characters against the admission's "about 300". Its two repairs (the `ZZ64` clause and "on both paths") came after that limit was set.
  - The fix round's cold-read repairs cost 322 characters net. The admission's limit did not cover them.
- **The conflict.**
  - This is the second update in a row whose judge accepts an exception: climb batch 21 grew the part from 15,792 to 17,410 characters, and this update grows it from 18,155 to 18,749. Between them, the install and its cold-read fixes (`f6f7de70c`, `2d5820c89`) added another 745.
  - An update rewrites only the sections that it touches, so it cannot recover the overrun.
  - About 6,750 characters must leave the part to reach 12,000. Climb batch 21's judgement named the ways: a consolidation that moves path departures to `interpreter.md` and `compiler.md`, or a new budget. The coordinator decides which, and when.

## The install

For the coordinator and the skill writer:

1. **The part.** Install `orientation.md` whole as `references/revival-changes.md`. Every changed part installs, and the unchanged parts are identical to the current part.
2. **The sources.** Add `sources-mapping.md` to `references/sources.md` as a dated entry (synthesis, "Sources audit and provenance during consolidation", step 3). It maps all twelve hunks of the `diff`.
3. **The cold read.** Then the cold read of the installed part (the workflow's README).
4. **The regression key.** `explorations/coordinator/tools/orientation/regression/key.md` and `questions.md` are changed in the working tree and not committed: case 23 is new, and cases 5, 7 and 21 are revised. Commit them with the install. Case 5's "Note for the grader" (`key.md:78`) describes the first text, which had no `ZZ64` condition. After the fix round it is stale: drop it, or put it in the past tense.

No verdict here depends on an edit of an area part. The admission names homes for the twenty entries that it did not admit (`admission.md`, "Notes for the coordinator", the area-part homes): `interpreter.md` (row 611), `compiler.md` (rows 812 to 814, the self-type reading outside the trait, and row 816 once the curator decides), `library.md` (an api's `abstract` members) and `tests-running.md` (the team demos, P-79). They are the coordinator's to route. The admission found that this landing makes no sentence of the skill false.

## Findings on unchanged text and on the compiled path, for the next update

None of these is a hold. The first five are on text that this update did not change, so a hold would keep the same text. The last three are on new text, and none sends a worker wrong (weighed above).

1. **The opening's reading scheme.** Some sentences about one path cite no row, so a worker can take them for rules (`cold-read.md` 2.3; `cold-read-2.md` 2e; climb batch 21's judgement, item 2). This update gave rows to three of them (rows 416, 551 and 364) and a class to the "Until the switch-over" sentences. The writer found no row for these (`writer-2.log`, "Departures with no row found"):
   - line 67, the checker's silent unconditional reading of another `where`;
   - line 54, the `OPEN` comparison;
   - line 69, walk's refusal of a negative size exponent;
   - line 89, the forms that do not direct a reduction's type;
   - line 24, the `h` pair under walk.

   Each needs a row from the ledger, or a statement that it is the intended rule.
2. **Line 45, the order to write `I extends Index` and its compiled limit** (`cold-read-2.md` 2a, high; `cold-read.md` 2.4, second half). Put the limit beside the order, for example: "write `I extends Index`; until the switch-over, such a program does not compile". The writer took this for a decision (`writer-2.log`). It is not one: both statements are true, and only their placement is at fault.
3. **What to cite for a bold rule without a P-N** (`cold-read.md` 2.1; `cold-read-2.md` 2c). The core's citation rule names the brief, the record and primary sources, and the skill is none of them. The writer left this to the coordinator, since the fix is a change to the core's rule (`writer-2.log`).
4. **Line 54, the `pick` example.** It names neither `pick`'s static parameter nor its bound that names itself (`cold-read-2.md` 2i). This is the third read that flags it.
5. **Line 41, row 695's condition**, "where `X` is an object type". Climb batch 21's judgement, item 4, asked for it, and it is still absent.
6. **Line 5's `(`Papers/`)`.** The POPL 2019 paper that P-26 counts is in `research/extracts/` (`exploring.md:22`, `:26`). Drop the folder, or name both places.
7. **The compiled float line** (`quiz-grade-1.md`, third observation; `quiz-grade-2.md`, first observation). Before the switch-over, the prelude's `RR64` coerces only from float literals and `RR32`. A `ZZ32` reaches it only by `asRR64()`, and the prelude declares no `asFloat` (`CompilerBuiltin.fsi:268`, `:434-435`, `:446`, `:448`). The text that a worker reads (`library.md:23`, and the core's coercion sentence) states only the interpreter's library.
   - The home is `compiler.md`, "Traps of the compiled path", by reading, or after a compiled probe.
   - Alternatively, a clause on line 83's scope sentence: "...declares `/` only at `RR64`, which coerces there only from float literals and `RR32`".
8. **The rounding direction of `DIV`** (`quiz-grade-2.md`, second observation). The orientation does not say which way `DIV` rounds. "`DIV` truncates toward zero" would settle it, from `Specification/basic/operators/opr-overview.tex:129`. The key requires no rule here, so this is optional and costs about 30 characters.
