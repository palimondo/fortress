<!-- The orientation workflow's judgement of climb batch 29b's update, update mode: install or no change for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz. Two sections install: "Static parameters, `where` clauses and sizes" (the `reflect` paragraph shortened) and "Numbers" (the static numerals: P-174's numeral types and generic coercion, no `=` with a number type, the fold's constant at a program's own type); no section is held. "Numbers" installs with two corrections (line 91's false sentence that the checker does not refuse a numeral outside a coercion's `where` clause, the one cause of a non-right quiz grade in round 2; line 93's fold sentence, which leaves out P-174's exception for a negated numeral) and in the same push as the area-part corrections that the landing's data gives the skill writer. Also: the sizes and the size exception; what the install needs; findings for the next update. Read on `main` at `5f35b1d058`, where `revival-changes.md` is the admission's base text (last changed at `a41378d7a2`), and orientation.md is the fix round's text of 03:11 UTC. -->

# Climb batch 29b's update of the orientation: the judgement

Mode: update.

**What I read.**
- In this folder: `orientation.md` (the final text), `admission.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `quiz-cases.txt` (cases 5, 16, 26, 31 and 32) and both writer logs.
- The current part, `.claude/skills/fortress-repo/references/revival-changes.md` at `a41378d7a2`, and its `diff` against `orientation.md`: hunks at lines 83, 87, 89, 91, 93 and 99 of the new text.
- P-37, P-173 and P-174; F-339, F-340, F-341 and F-346 (`facts-extract.sh`); ledger rows 442 and 973.
- For line 91's `where` sentence: `ProjectFortress/compiler_tests/XXXNumeralWhereRefusedCompiled.test` and its `NumeralWhereRefusedCompiled.fss`; `tests/NumeralWhereRefusedWalk.fss` and its `.test`; `scala_src/typechecker/CoercionOracle.scala:221`; `tests-writing.md:73-77` and `:101-111`; `climb-batch-29b/RECORD.md:143`; `plan-30/probes/draft-numerals.md:124`; the gate's `summary.txt` (`testSystem`, every suite 0 failures).
- For the prelude sentence: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:394-403`, `:443-444`, and a `grep` for `QQ` (none).
- The regression key's case 32, and the uncommitted changes to `tools/orientation/regression/key.md` and `questions.md`.
- The area parts that the admission's "Elsewhere" names: `interpreter.md:19-25`, `compiler.md:34`, `:65`, `:106-112`, `SKILL.md:133`, `library.md:23`, `tests-writing.md:30-36`; and `record-landing/owed.md`, "For the coordinator".
- For "route C": P-95, P-96, F-46 and `specification.md:16-37`.
- For the budget: `coordinator/BOOT.md`, `HELD.md:217`, and the batch 29 judgement's "Size".

The standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance".

**What I ran.** Reads, `grep`, `diff`, `git diff`, `git log` and character counts. `skills-lint.py` on two scratch copies laid out as the part: the final text, and the final text with this judgement's two corrections. Both lint clean (exit 0). Neither writer could lint, so these are the text's only lints. No build, test or probe. The tree is unchanged.

**Which text each check read.**
- The first text, of 28,887 bytes: `preserve.md` (02:50), `cold-read.md` (02:53) and `quiz-grade-1.md` (its reader's answers, 03:06).
- The final text, of 29,294 bytes: `cold-read-2.md` (03:16) and `quiz-grade-2.md` (its reader's answers, 03:16).

No check after the fix round compared the final text with its sources. I did that for the fix round's changes, below. Line numbers below are those of the final text.

## Verdicts

| Part | Lines | What changed | Verdict | Rests on |
|---|---|---|---|---|
| The opening | 1-7 | nothing | no change | none |
| Dispatch and overloading | 9-24 | nothing | no change | none |
| Traits and objects | 26-62 | nothing | no change | none |
| Static parameters, `where` clauses and sizes | 64-83 | line 83: the narration of why `reflect` fails compiled shortened (`cold-read.md` section 3, item 3) | install | checked here against the old text: every rule kept; `cold-read-2.md` section 1, "Static parameters": "I would not use `NatReflect` in compiled code, before or after the switch-over"; no item of `cold-read-2.md` section 2 is on line 83; no quiz case reaches it |
| Numbers | 85-103 | line 87: the route C sentence cut; line 89 (P-174, P-173, P-40, P-37): the numeral types with their four numbers, no numeral value at run time, the prelude sentence, a size's `nat` a `ZZ32`; line 91 (P-174, P-176): the generic coercion with its `where` clause, its numbers read as `ZZ`; line 93 (P-174): the fold's constant at a program's own type; line 99 (P-165, P-174, row 973): no `asFloat` on the numeral types, the binding form for a comparison with a numeral, walk's answer | install, with two corrections, in the same push as the area-part corrections | `preserve.md` failures 1 to 5 fixed in the final text, checked against their sources; 4 of 5 cases right in both rounds, case 32 partial in round 2 against line 91's sentence "The checker does not refuse it yet" (`quiz-grade-2.md`, "Cause"), which correction 1 replaces; `cold-read-2.md` section 1, "Numbers", reads every new rule right; its item J is cured by correction 2 |
| Reductions and comprehensions | 105-115 | nothing | no change | none |
| Implementation limits | 117-121 | nothing | no change | none |

The whole text installs: the current part with the hunks above, the two corrections in "Numbers", and, in the same push, the area-part corrections listed under "The install". No section is held, so `queue.md` files no item.

### Static parameters, `where` clauses and sizes: install

**Line 83.** The old paragraph gave the compiled failure three times: "does not run compiled yet", "do not link `NatReflect`, which is part of the interpreter's library", "after the switch-over, such a call still fails, for a second reason". The new one: "Such a call runs only under walk. Until the switch-over, compiled programs do not link `NatReflect`. After it, the call still fails. `NatParam` is declared ..., which lists a type at a `where`-clause size." The row-307 sentences after it are unchanged, and give the second reason.
- **Preservation.** `preserve.md` read the first text, which did not hold this cut. I checked it: the action (no `reflect` on the compiled path, before or after the switch-over) and the row-307 rule for a program's own trait are kept. "Which is part of the interpreter's library" goes. The core's "one library" and line 7's "Until the switch-over" carry it.
- **Second cold read.** Section 1 reads the action right. Its section 2 has no item on line 83.
- **Quiz.** No case reaches it.

### Numbers: install, with two corrections, in the same push as the area-part corrections

**The fix round's sentences against their sources.**
- "the digits read as one integer in that radix": P-174, "the digits read as one integer in that radix `v`" (`preserve.md` failure 4).
- "Until the switch-over, the compiler's prelude follows the same design (P-37), but it has no `QQ`, and its `RR64` and `RR32` take only a radix-point numeral: write `3.0`, not `3` (row 442)": P-37, "the prelude carries the design of P-174 and P-176"; `CompilerBuiltin.fsi` declares no `QQ`; its `RR64` coerces from `RadixPointNumeral` and `RR32` only (`:401-403`), its `RR32` from `RadixPointNumeral` only (`:443-444`); row 442's notes, "compiled, `r: RR64 = 3` is refused" (`preserve.md` failure 5).
- "The body reads the numbers as `ZZ` values of any size, not as `ZZ32` values as it reads a size": P-174, "the four are naturals of any size, and read as values in a coercion's body they are exact integers, `ZZ`; this implementation's `NN32` bound (P-40) is for sizes"; P-173, "a `ZZ32` where it is a size (P-40), and a `ZZ` where it is one of a numeral type's four numbers" (`cold-read.md` item 2.4).
- The `where { v < 256 }` clause in the `Byte` example: `tests/NumeralWhereRefusedWalk.fss` and `compiler_tests/NumeralWhereRefusedCompiled.fss` declare it so. "The `where` clause bounds the numerals that the type takes. The rule refuses statically a numeral that breaks it": the specification as rung T wrote it, "a `where` clause over the four numbers refuses a numeral statically" (`RECORD.md:143`). Walk "refuses it when the binding runs": F-341, "outside its coercion's `where` clause is refused there when it runs". The next sentence is false: correction 1 below.
- Line 99, rewritten: "To compare a typed value with a numeral, bind the numeral at the value's type first, as `z: NN32 = 0`, then `u = z`": row 973's workaround. "Under walk, the numeral at `=` takes its default. So `u = 0` is `false` for a zero `u: NN32`, and `h = 0.5` for `h: QQ = 1/2`, but `r = 3` is `true` for `r: RR64` (row 973)": F-346 and row 973 for `NN32` and `QQ`; F-341, "the library's `=` over `Any` fitting the numeral at its default"; `r = 3` is the admission's probe at `5f35b1d058` (`r = 3 ... true`), and follows from line 99's own rule, since `RR64` coerces from `ZZ32`. The sentence cites the row, so line 7 reads walk's answer as a departure, not the rule (`preserve.md` failure 2). "Until the switch-over, the compiled `u = 0` is `true`": row 973, "Compiled: `true`, the prelude has no `=` over `Any`" (`preserve.md` failures 1 and 3).
- Line 87, the route C sentence cut (`cold-read.md` section 3, item 1; the batch 29 judgement's finding 7). P-95 defines route C where the record uses it. `specification.md`, which asks an Appendix I entry for the way back, words it as "the alternative not taken" and does not use the name. No action is lost.

**Correction 1: line 91's false sentence.** The final text says: "The rule refuses statically a numeral that breaks it, as `300` here. The checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`), and walk refuses it when the binding runs, with 'Type mismatch binding'."
- **What the tree holds.** The checker refuses the numeral statically.
  - The test is a compile test, `compile` with `compile_err_contains=The numeral 300 does not meet the where clause of the coercion to Byte.`. In a compiled folder, the `XXX` prefix of a `.test` file marks that each of its commands must fail, and "for a refusal at compile time, write one `XXX` compile test, with `compile` and `compile_err_contains=`" (`tests-writing.md:73`, `:105`). Such a test whose program compiles is red, "Saw wrong failure" (`:76`).
  - The message is the checker's: `CoercionOracle.scala:221`, "The numeral %s does not meet the where clause of the coercion to %s.".
  - The gate's `testSystem` passed, every suite with 0 failures (`gate/summary.txt`). Climb batch 29b's record lists the test among "the tests that show the tree doing so" (`RECORD.md:143`). The design draft lists it under "Refusals at compile time" (`plan-30/probes/draft-numerals.md:124`).
  - So the sentence reads the `XXX` prefix as an expected failure. The admission's quiz note said the same, "the compiled checker does not refuse it yet" (`admission.md:200`), and the writer took it from there. The key's case 32, "Since earlier keys", names the error.
- **Walk's message.** 'Type mismatch binding 300' is walk's message at a top-level binding, at load (`NumeralWhereRefusedWalk.test`). Inside a function, the key's probe at `5f35b1d058` gave 'RHS expression type ZZ32 is not assignable to LHS type Byte'. The correction leaves walk's message out. A test that needs it copies it from its own run.
- **What it cost.** Round 2's reader quoted the sentence and said a compiled `y: Byte = 300` "is not refused at all" (`quiz-grade-2.md`, case 32, "Cause"). That is the round's only non-right grade. Cold-read 2 item A lists the same sentence among the untagged path statements.
- **The correction.** Replace the two sentences with: "The checker refuses statically a numeral that breaks it, as `300` here: 'The numeral 300 does not meet the where clause of the coercion to Byte.' Walk refuses it when the binding runs." It is 48 characters shorter, and lints clean.

**Correction 2: line 93 leaves out P-174's exception for a negated numeral.** The final text says: "A program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174)." Line 91 says: "A negative constant, as `-3`, reaches the type as the type's prefix `-` on the coercion's result for `3`."
- **The source.** P-174: "at a program's type `-3` is the type's own prefix `-` applied to the coercion's result for `3`, and a type without `-` refuses it; *any other* expression of numerals alone folds first (P-173) and reaches such a type only through its coercion from the folded value's type". Line 93 drops "any other".
- **What it can cost.** Line 93's fold covers "the arithmetic operators", and F-339 names prefix `-` among them. So read literally, `-3` folds into a `ZZ32` constant that needs `coerce(x: ZZ32)` at a program's own type, against line 91 (`cold-read-2.md` item J, 0.6). A worker who reads it so declares a coercion from `ZZ32`, which converts every `ZZ32` implicitly, and no prefix `-`. Round 2's quiz reader read `-3` right in case 32, and so did the second cold reader in its section 1. Round 1's reader quoted line 91's rule but followed the stale area parts (rows 968 and 961). So the misreading is not yet observed.
- **The correction.** "A program's own type takes the constant only through ..." becomes "Except for a negated numeral, as `-3` above, a program's own type takes the constant only through ...". It is 45 characters longer, and lints clean.

**Why the section is not held.** A hold keeps the old text, and the old text fails the same case 32 worse. It gives `coerce(x: NaturalNumeral)` with the getters `digits`, `fractionDigits`, `radix` and `digitValue`, and the compiled `coerce(x: IntLiteral)`. Each now stops: 'Type requires static arguments', 'Non-object receiver (): ()', 'IntLiteral is undefined.' (`admission.md`, P-174's and P-37's rows). It also says that `(h = 0.5)` is `true` for `h: QQ = 1/2`, which is `false` under walk (F-341, row 973). The two corrections replace the only sentences that a check found false or two-way, each from its primary source. Neither correction has had a cold read or a quiz round. The install's cold read of the installed part (`tools/orientation/README.md`, "Installing its result") reads them.

**The checks.**
- **Preservation.** `preserve.md` failures 1 to 5 are fixed in the final text, as checked above. Failures 1 to 3 (F-346, row 973) were the consequential ones: line 99 now gives walk's condition, the `QQ` case, the `RR64` case and the compiled scope.
- **Quiz.** 4 of 5 right in both rounds (`quiz-grade-1.md`, `quiz-grade-2.md`, "Counts").
  - Case 16, `n: NN32 = 3` with its check: right in both rounds, with `three: NN32 = 3` and `assert(n = three, msg)`, row 973's workaround.
  - Case 26, `=` across number types: right in both rounds. Neither reader called `q = 0.5` `true`.
  - Cases 5 and 31: right in both rounds.
  - Case 32, a program's own number type: partial in round 1, against a missing rule, the coercion's `where` clause. The fix round added it, and round 2's reader used it. Partial in round 2, against line 91's false sentence: correction 1.
  - Both rounds' readers hedged in case 32 on the stale `interpreter.md:25` (row 968) and `compiler.md:109` (row 961), both closed. The grade did not change. The area-part corrections remove them.
- **Second cold read.** Section 1, "Numbers", reads every new rule right. Its items on the changed text:
  - **Item A, in part (0.7).** Line 91's "The checker does not refuse it yet": correction 1. Its other sentences are on unchanged text.
  - **Item J (0.6).** Correction 2. Its second half, whether `2 + 3` reaches a numeral coercion, line 93 answers: "a numeral coercion is not enough".
  - **Item M (0.5).** Line 99 does not give the rule's own answer for `u = 0`. The record does not settle it: row 973 is `CONTESTED`, and the curator's question (a) to (c) is open (review-queue item 487, default "as landed"). The text gives what each path does, cites the row, and leads with the binding form that is right on both paths. Not a condition.
  - **Item H (0.5).** "A numeral type has no getters, no `asFloat`, no `asString`" could be read as refusing `asFloat(3)`. A worker who reads it so writes `3.0`, which is right. Finding 3 below.
  - **Item T (0.35).** Whether the `ZZ` reading holds in an operator over a numeral type too. P-173 says it holds wherever the parameter is one of a numeral type's numbers. Finding 4 below.
  - **Items K and L (0.6, 0.55).** The default of a folded quotient with a radix point, and a folded quotient at a compiled `RR64`. Both are on the clause "A quotient that is not whole stays `n / d` ... and defaults to a `QQ`", which edit 3 split off its sentence without changing it, and on line 101 and line 103, unchanged. Findings 1 and 2 below.
  - Items B to G, I, N to S, U and V are on sentences or conventions that this update did not change.

**Path behaviours in the language part.** By the curator's comment of 2026-11-08 (`6ec749a8eb`), a behaviour of one path goes in that path's part with its row. The admission routed this landing's walk mechanism at `=` to `interpreter.md`, and the text keeps only the sentence "Under walk, the numeral at `=` takes its default", with its row. Line 7 reads it as a departure. The compiled `u = 0` and the prelude's `RR64` and `RR32` are limits of the compiler's library, under "Until the switch-over". Neither is one of the three install conditions.

## Size

- **Before:** 28,023 characters, 28,031 bytes (`revival-changes.md` at `a41378d7a2`).
- **After:** 29,286 characters, 29,294 bytes, +1,263. With the two corrections, 29,283 characters, 29,291 bytes, +1,260.
  - "Numbers": +1,366 with the corrections, from 8,356 to 9,722 characters.
  - "Static parameters, `where` clauses and sizes": −106, from 3,699 to 3,593.
  - The other five parts: unchanged.
- **Against the admission's target.** The admission asked the three edits to add nothing net (`admission.md`, "For the writer"). Writer 1 reached +856 and named the cut that would go further, the route A and route C paragraph (`writer-1.log`). The fix round added the `where` clause (quiz case 32), the rewritten comparison rule (`preserve.md` failures 1 to 3), the `ZZ` against `ZZ32` contrast (`cold-read.md` item 2.4), "in that radix" and "no `QQ`", and cut the route C sentence and the `reflect` narration (`writer-2.log`; `sources-mapping.md`, "Fix round"). Each addition answers a failure of the checks.
- **Size exception: accepted for this install. The conflict is exposed again.**
  - **The budget.** It is 8,000 to 12,000 characters (`tools/orientation/README.md`). The part is 17,283 characters over its top, about 2.4 times the top.
  - **Why it was accepted.** The landing made most of the old numeral sentences false (`admission.md`, its opening), and a worker who follows them writes forms that stop under walk or do not compile. The new rules are admitted corrections with recorded failures: rung A rewrote eight of the batch's own tests from the old forms; the patch's own `NN64` coercion read `v` at a fixed width and stopped a program's load (`admission.md`, P-174's and P-173's rows). Holding them to keep the size keeps false text.
  - **The conflict.** This is the sixth update in a row to bypass the budget: climb batches 24, 26, 27, 28, 29 and 29b. This one cut about 200 characters. The standard says that new content "must compete for space through consolidation; it must not bypass the budget merely because it is new". The batch 27, 28 and 29 judges asked the coordinator to settle the conflict before the next update added to the part. I found no settlement in the record (`BOOT.md`; `HELD.md`). The curator's word of 2026-11-02, 06:51, calls a consolidation pass of the skills "overdue, after the plan's consolidation", with the orientation workflow and the cold reads as its processes (`HELD.md:217`).
  - **Ways to settle it.** A consolidation run of this workflow, or a new budget. The first cuts a consolidation would weigh: line 89's clauses on rows 967 and 962, which `interpreter.md:22`, `:24` and `compiler.md:110` already hold (the batch 29 judgement's finding 1); `cold-read-2.md` section 3 (line 81's corner limits, line 34's pointer, line 99's P-160 sentence, line 119's plan, line 115's mechanism, line 109's inference chain, the Working Draft sentences at lines 11 and 48); `cold-read.md` section 3, items 2, 4 and 5.
  - **Who decides.** The coordinator, with the curator's word above, before the next update adds to the part. Per the standard, the conflict is exposed here and is not met by compressing the prose.

## The install

1. **Copy the text.** Copy "Static parameters, `where` clauses and sizes" and "Numbers" from `orientation.md` over their sections of `.claude/skills/fortress-repo/references/revival-changes.md`, word for word, with these two corrections in "Numbers". The other five parts are identical in both files.
   - Correction 1, line 91: "The rule refuses statically a numeral that breaks it, as `300` here. The checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`), and walk refuses it when the binding runs, with 'Type mismatch binding'." becomes "The checker refuses statically a numeral that breaks it, as `300` here: 'The numeral 300 does not meet the where clause of the coercion to Byte.' Walk refuses it when the binding runs."
   - Correction 2, line 93: "A program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174)." becomes "Except for a negated numeral, as `-3` above, a program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174)."
   - Run `skills-lint.py` on the installed part. A scratch copy with both corrections lints clean.
2. **Sources.** Add `sources-mapping.md` to `references/sources.md` as a dated entry, in the same commit. Add to it:
   - correction 1: `compiler_tests/XXXNumeralWhereRefusedCompiled.test` and `NumeralWhereRefusedCompiled.fss`, a refusal test (`tests-writing.md:105`); `scala_src/typechecker/CoercionOracle.scala:221`; `RECORD.md:143`; `tests/NumeralWhereRefusedWalk.fss` and `.test`; F-341. Walk's message left out, because it differs between a top-level binding ('Type mismatch binding 300') and one inside a function ('RHS expression type ZZ32 is not assignable to LHS type Byte', the regression key's case 32 probe at `5f35b1d058`);
   - correction 2: P-174, "any other expression of numerals alone folds first";
   - the route C cut: P-95 and P-96 hold the term; `specification.md` does not use it.
3. **In the same push: the area-part corrections.** The landing's data gives the skill writer the stale sentences (`record-landing/owed.md`, "For the coordinator"): `SKILL.md:133`, `interpreter.md:21`, `:23`, `:25`, `compiler.md:65`, `:108`, `:109`, `:111`, and `compiler.md`'s "Traps of the compiled path" for rows 971 and 442. The admission adds three (`admission.md`, "Elsewhere"): `compiler.md:34` (P-37's numerals exception beside "Do not add a declaration to the three prelude files"), `library.md:23` (an integer numeral does not convert into `RR64` on the compiled path until the switch-over, row 442), and row 974 in `interpreter.md`. Two of them conflict with this text and cost the quiz:
   - `interpreter.md:23` says "Write `NOT (u = 0)`" for row 966. Now `u = 0` is `false` for a zero `u: NN32` (row 973), so `NOT (u = 0)` is `true` there, a silent wrong answer, against line 99's binding form.
   - `interpreter.md:25` (row 968) and `compiler.md:109` (row 961) still say that a negative constant reaches the coercion with its sign. Both rows are `FIXED`. They caused a hedge in case 32 in both rounds.

   The skill task's commits go in one push. If the writer's update cannot carry them, the orientation's commit is not pushed without them. The coordinator then lands them next, before any worker reads the skill.
4. **The quiz.** The changes to `regression/key.md` and `regression/questions.md` are uncommitted in the working tree, and go with this folder. They change cases 5, 16, 26 and 31 and add case 32. Three of the key's lines are stale against the installed text; the quiz author's next update corrects them:
   - case 32, "Skill": "The orientation does not state the coercion's `where` clause". It does now, and its example carries `where { v < 256 }`. The same line's list of stale area parts leaves out `compiler.md:109` (row 961), which misled both rounds (`quiz-grade-1.md`, `quiz-grade-2.md`, "Notes").
   - case 16, "Skill" (`key.md:197`): it quotes writer 1's "So for a zero `u: NN32`, `u = 0` ...", which the fix round rewrote.

## Findings for the next update

None is an item, because no section is held.

1. **The default of a folded quotient** (`cold-read-2.md` item K, 0.6). Line 93's "A quotient that is not whole stays `n / d` in lowest terms and defaults to a `QQ`" does not say what a quotient with a radix point gives, as `x = 1.0/3`. F-339 names `p.0 / d` as a result form beside `n / d`. P-173 says a folded constant defaults "as a `QQ` for a quotient, or as an `RR64` with a radix point". Line 101's `2.0^(-1)` meets the same question. Measure `x = 1.0/3` and `x = 2.0^(-1)` under walk first; then "a quotient of integer numerals" may be the exact wording.
2. **A folded quotient at a compiled `RR64`** (`cold-read-2.md` item L, 0.55). Line 89 says the prelude's `RR64` takes only a radix-point numeral. F-340 says a folded constant at a compiled `RR64` place is the type's constant, rounded once. Neither the text nor this check says whether `lr: RR64 = 1/1000` compiles. A worker who thinks it does not writes `0.001`, which is right.
3. **"No getters, no `asFloat`"** (`cold-read-2.md` item H, 0.5). The sentence is about a coercion's numeral parameter. "So a coercion's body reads only the four numbers" would close the other reading.
4. **An operator over a numeral type** (`cold-read.md` item 2.20; `cold-read-2.md` item T). Line 91 lets a numeral type be an operator's parameter type, and no sentence says what such an operator can do. Writer 2 found no source in the admission or the tree.
5. **The `Byte` example on the compiled path.** `Byte(v.asZZ32)` does not compile until the switch-over: the prelude's `ZZ` has no `asZZ32` (row 349; line 97 says so for the prelude's getters). `compiler_tests/NumeralStaticDesignCompiled.fss` reads `v` through a native helper. Both quiz readers found it from line 97. The error names the getter.
6. **The opening's conventions and other unchanged text** (`cold-read-2.md` items B to G, I, N to S, U and V; `cold-read.md` items 2.1, 2.2, 2.5 to 2.19 and 2.21 to 2.24). These are the earlier judges' findings, still open: a sentence that both opens "Until the switch-over" and cites a row, departures that cite no row, "compiler's library" against "compiler's prelude", the `pick` example, `Index` on both paths, line 24 against line 43, `override` against row 650. Writer 2 left them for a clarity pass of the whole orientation.
7. **History and detail to cut in a consolidation** (`cold-read-2.md` section 3; `cold-read.md` section 3, items 2, 4 and 5), with line 89's rows 967 and 962: see "Size", "Ways to settle it".
