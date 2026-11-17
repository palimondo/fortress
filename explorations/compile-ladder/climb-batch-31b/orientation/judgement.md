<!-- Climb batch 31b's orientation judgement (update mode, run 2 of climb batch 31): for the whole text and for each section of orientation.md, whether its change is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason and the report line it rests on, two corrections that keep old words where the fix round lost them and one layout correction, and the size before and after. -->

# Climb batch 31b: judgement of the orientation update

Judged: `orientation.md` in this folder, the fix round's text (32,844 bytes). I compared it with `.claude/skills/fortress-repo/references/revival-changes.md` on `main` at `5a84f56cec` (32,123 bytes; last changed at `e64da5d944`; nothing under `.claude/` is modified in the working tree). Standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance". Reports read: `admission.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `sources-mapping.md` and both writers' logs. Also read: the regression key's cases 27 and 36 (`explorations/coordinator/tools/orientation/regression/key.md:331-341`, `:468-520`, modified in the working tree).

## Verdict

**Whole text: install, with three corrections, two in "Numbers" and one in the opening. No section is held.**

`diff` finds ten places. Five sections change:
- the opening, at line 7;
- "Dispatch and overloading", at line 24;
- "Traits and objects", at lines 32, 34, 44 and 70;
- "Static parameters, `where` clauses and sizes", at line 91;
- "Numbers", at lines 95, 97 (a new rule), 99, 118 and 120.

The changes in "Numbers" at lines 95, 97 and 118 carry the one admitted finding, F-379. The fix round made all the others, from `preserve.md`, `cold-read.md` and `quiz-grade-1.md`. "Reductions and comprehensions" and "Implementation limits" are the skill's text, byte for byte.

## What the reports cover, and what I checked myself

`preserve.md` was written after the first round, when only "Numbers" had changed. It found three failures there. No preservation report covers the fix round, which changed four more sections. So I read the `diff` of the final text against the skill's, and checked each claim that the fix round changed, added or cut against its source. I built nothing and ran no program. I ran the lint on a scratch copy (see "Size").

| Changed claim | Source read | Result |
|---|---|---|
| `:95` "and still calls the number types "the tower", though they do not nest" | `preserve.md` failure 1; P-43 | repaired, in the words that the failure proposed |
| `:95` "Walk refuses an object below one of the seven at load" | `preserve.md` failure 2; P-178 | repaired, as proposed. The prohibition before it, "No type of a program extends a number type", is P-178's own sentence. Whether it covers `QQ` is a question on P-178, which `preserve.md` and the writer leave to the coordinator (`queue.md`) |
| `:95` "The compiler's prelude declares no `QQ`, and still declares the other seven as traits that a type can extend (row 1003)" | `preserve.md` failure 3 | repaired, as proposed |
| `:95` "Such a type runs on both paths." | the key's case 36, Evidence (`key.md:507-519`): `value object Meters(v: ZZ32) extends Number` with its own `+` and `<` passed under walk, and compiled and printed `PASS` | supported. One run, for an object below `Number`. A trait with its own functional `+` still meets the Meet Rule of `:24` |
| `:99` "The compiler's prelude follows the same design (P-37)." ("Until the switch-over" removed) | P-37: "There are two exceptions, each so that both paths do the same before the switch-over, and each copy goes with the prelude: the numerals, … and the built-in number types" | supported. The sentence states no limit, so the marker of `:7` does not fit it |
| `:120` the cut of "Its `ZZ32` power gives 0 at a negative exponent for other bases. At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523)." | rows 441 and 523 (both `NEGATIVE-VERIFIED`, close at the switch-over); `grep` of the skill: no other part names either row or the compiled power's 0 | **not confirmed**: correction 2 below |
| `:120`-`:121` no blank line between the power rule and the `/` rule | the skill's text has one (`revival-changes.md:119`) | **layout fault**: correction 3 below |
| `:7` "do not assert it in a plain test. Where the rules decide the case, an `XXX` test asserts their answer" (was "do not assert it as correct in a plain test, one without the `XXX` prefix") | `tests-writing.md`, "How a defect is recorded", cases 2 and 3; row 923 and its test | the added sentence is supported (case 2). The dropped "as correct" is **a lost condition**: correction 1 below |
| `:24` "or, for a number type below `Number`, `excludes { HasRank }`, the trait that arrays extend" (was "or make it exclude arrays, `excludes { HasRank }`") | `Library/FortressLibrary.fsi:1341` (`trait HasRank … excludes { Number, AnyMaybe }`), `:1537-1538` (`ReadableArray` extends `HasRank`); the key's case 27, Scope ("Excluding the arrays, by `HasRank`, is by reading") | "the trait that arrays extend" is true. The clause gives a valid program. By `HasRank`'s own `excludes { Number }`, a type below `Number` already excludes the arrays, so the clause may be redundant there. No run settles it. Carried (`queue.md`) |
| `:32` "The checker refuses such a redeclaration where …" | row 1037: `B` "declaring `m(o: T)` again" at the same parameter types | supported |
| `:34` "at the same limits, which `interpreter.md` … gives" | the old sentence, "Walk and the checker stop the search for a cover at the limits that `interpreter.md` … gives"; `interpreter.md:89` | same meaning |
| `:44` "`StandardTotalOrder`'s `MIN` and `MAX` in the interpreter's library have this shape. So declare your own `MIN` and `MAX` in a type that extends `StandardTotalOrder` and must run compiled, as the integer types do" | `Library/FortressLibrary.fss:291-292` (each body a conditional with `self` in one arm); the integer types' own `MIN` and `MAX` (`FortressLibrary.fsi:532-533`, `:600-601`, `:672-673`, `:739-740`; `FortressBuiltin.fsi:124-125`); the prelude's `StandardTotalOrder` declares none (`Library/CompilerAlgebra.fss:17-23`) | supported. `QQ` and `RR64` left the list: they extend `StandardMinMax`, not `StandardTotalOrder` (`FortressLibrary.fsi:292`, `:394`). The instruction holds today and after the switch-over: today the prelude gives a compiled type no `MIN` or `MAX`, and after it the inherited ones fail (row 1051) |
| `:70` "falls back to `SEQV` and is `false` (row 923)" | row 923: "design limit (library)", specification "silent"; its claim is the `false` | supported. The `false` is now marked unsettled, as the row says |
| `:91` "Such a call runs only under walk, also after the switch-over." | the old sentences, "Until the switch-over, compiled programs do not link `NatReflect`. After it, the call still fails." | same action; the cause is cut |

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | **install, with correction 1** | One sentence is added and is supported. The fix round also dropped "as correct" and the gloss of "plain test". Without "as correct" the sentence forbids what `tests-writing.md` case 3 asks for. Correction 1 puts the old words back and keeps the new sentence. The second reader restates the new sentence right. | `cold-read.md` item 2.3; `cold-read-2.md` part 1, "Preamble", second point; `cold-read-2.md` item 2.19 ("plain test"); `tests-writing.md` cases 2 and 3 |
| Dispatch and overloading | install | One clause, true of the library. It gives a valid program. The second reader restates it right: "If the trait is itself a number type below `Number`, it gets `excludes { HasRank }`". Part 2 of that read has no item on the clause; items 2.7 and 2.8 are on old text. | `cold-read.md` items 2.8 and 2.21; `cold-read-2.md` part 1, "Dispatch and overloading" |
| Traits and objects | install | Four changes, each supported (table above). The second read's item on the new text, 2.4 (medium, `:44`, "whether this applies today"), leads to no wrong action: the instruction holds in both periods. Item 2.3 (`:32`) asks for a route past row 1037's refusal; the row gives none, and the sentence cites the row. | `cold-read.md` items 2.2, 2.5, 2.6, 2.9, 2.10; `cold-read-2.md` items 2.3, 2.4 |
| Static parameters, `where` clauses and sizes | install | One sentence, same action. The second reader restates it right: "Use `reflect` and `NatParam` only under walk, including after the switch-over." Part 2 has no item on it. | `cold-read.md` items 2.19, 3.1; `cold-read-2.md` part 1, "Static parameters" |
| Numbers | **install, with corrections 2 and 3** | F-379 is in the text with its conditions, and the three preservation failures are repaired (table above). Both quiz rounds were right on cases 29 and 36, with nothing against the orientation. The fix round's "Such a type runs on both paths" settled reader 1's hedge. The cut of rows 441 and 523 is not confirmed (correction 2), and the missing blank line is restored (correction 3). | `preserve.md` failures 1 to 3; `quiz-grade-1.md` and `quiz-grade-2.md`, "Counts"; `quiz-grade-2.md`, case 36, "(c), the reader's `Meters`"; `cold-read-2.md` items 2.6, 2.16, 2.20 |
| Reductions and comprehensions | no change | The skill's text. | `diff` |
| Implementation limits | no change | The skill's text. | `diff` |

### Numbers: the three checks

- **Preservation.** `preserve.md` checked 24 items and found three failures, all in `:95`. Each is repaired in the words that the report proposed. The fix round's three other changes to "Numbers" are checked above: the added sentence "Such a type runs on both paths" is supported, the marker dropped from `:99` did not fit it, and the cut at `:120` is not confirmed.
- **Quiz.** Cases 29 and 36 were right in both rounds, 2 of 2 each time (`quiz-grade-1.md:7`, `quiz-grade-2.md:7`). Both readers met `interpreter.md:121`, `:127` and `:141`, which still name the removed objects, and both chose the orientation. Those lines are the area part's to fix (`admission.md`, "Outside the orientation").
- **Second cold read.** Part 1 restates the new rules right: never extend a number type; declare one's own below `Number`; replace `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` by `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`, "above all in `typecase` arms, where the old names take every value silently". Its items on the changed text:
  - 2.6 (medium-low) says that `:95` and `:99` state prelude limits without "Until the switch-over", so a worker may fix them in the prelude. P-37 makes the built-in number types and the numerals its two exceptions: the prelude is to take P-178's form before the switch-over (review-queue item 577). So the marker's absence is right, and the reading sends no worker wrong.
  - 2.16 (high, formatting): correction 3.
  - 2.20 (low): "in that order" reads as a list of pairs. It is one.

## The corrections

Each one is a replacement in `orientation.md`, applied at the install. The first two keep the skill's own words where the fix round dropped them without a source. They are not new text. I applied all three to a scratch copy laid out as `.claude/skills/fortress-repo/references/revival-changes.md` and linted it (see "Size").

### Correction 1, the opening (`:7`): keep "as correct"

**The final text:** "Either can change, so do not assert it in a plain test. Where the rules decide the case, an `XXX` test asserts their answer (`tests-writing.md`)."

**What it loses.** The skill's text says "do not assert it as correct in a plain test, one without the `XXX` prefix". `tests-writing.md`, "How a defect is recorded", case 3: for a defect where "the specification is silent or a conflict leaves it open", write "a test that asserts today's behaviour, and a row in the gap ledger". That test is plain. Row 923 is such a case: its `tests/StrictEquivalenceRuleWalk.fss` asserts the 4-tuple `false` in a plain test, and `:70` now cites the row. Without "as correct", the sentence forbids that test. With it, case 3 asserts today's behaviour beside its row, not as correct. The gloss also answers `cold-read-2.md` item 2.19, which lists "plain test" as a term the core does not give.

**The correction.** Replace that sentence with:

> Either can change, so do not assert it as correct in a plain test, one without the `XXX` prefix. Where the rules decide the case, an `XXX` test asserts their answer (`tests-writing.md`).

### Correction 2, "Numbers" (`:120`): do not cut the compiled `ZZ32` power

**The final text** ends the power rule at "its `RR64` power takes an `RR64` or a `ZZ32` exponent, a negative one included." The fix round cut the two sentences after it, from `cold-read.md` item 3.3 (low-medium: "the action … is already given"). The writer asked for this cut to be confirmed (`writer-2.log`, "Cuts and rewordings").

**Why it is not confirmed.**
- The two sentences are the skill's only statement of a difference between the paths: compiled, `2^(-1)` at `ZZ32` answers 0 with no error, and `0^(-1)` throws a Java exception that no `catch` sees (rows 441 and 523, both `NEGATIVE-VERIFIED`). Under walk, the same calls raise `IntegerOverflow` and `DivisionByZero`, as the rule says. No other part of the skill names either row (`grep` of `.claude/skills/fortress-repo/`, `sources.md` aside).
- The standard asks that essential path differences stay in the orientation, and that no unique finding is lost without a destination. A silent wrong value on the compiled path is such a difference. The opening's "fixed-width arithmetic does not wrap" leads a worker to expect a raise there.
- The rule's advice, `2.0^(-1)`, prevents writing the form. It does not tell a worker who writes a test for both paths, or who reads a compiled 0, what the compiled path does.

**The correction.** After "its `RR64` power takes an `RR64` or a `ZZ32` exponent, a negative one included." put back the skill's own two sentences:

> Its `ZZ32` power gives 0 at a negative exponent for other bases. At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523).

With this, the power rule is the skill's text, byte for byte. If `compiler.md`, "Traps of the compiled path", takes the two rows, a later consolidation can cut them here.

### Correction 3, "Numbers" (`:120`-`:121`): the blank line

The fix round moved the power rule and left no blank line between it and "**`/` on two integers answers a `QQ`.**". In Markdown the two rules then make one paragraph, and the second bold rule no longer opens one (`cold-read-2.md` item 2.16). Put one blank line between them, as the skill's text has.

## At the install, in `sources-mapping.md`

- Its fix-round row "Integer power rule | cut: the prelude's `ZZ32` power …" goes: the cut is not made.
- Its fix-round row for the opening gives the final words: "as correct" and the gloss are kept, and the one sentence on `XXX` is added (correction 1; `tests-writing.md` cases 2 and 3).
- Its first table ("Numbers", the rule "The number types are flat siblings") maps the first round's words. Three of its rows give words that the fix round replaced: "Walk refuses an object below a number type", "the compiler's prelude still declares the number types as traits", and "calls the number and order traits "the tower": they do not nest". The fix-round table maps the final words. The install keeps the final words' rows only, or marks the three as replaced.
- Its line 5 gives the size after the first round (33,012 bytes). The size after the install is 33,031 bytes (below).

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main` at `5a84f56cec`) | 32,123 | 32,117 |
| `orientation.md` as written (after the fix round) | 32,844 | 32,838 |
| After, as judged (with the three corrections) | 33,031 | 33,025 |

**Lint.** `explorations/coordinator/tools/skills-lint.py` on the scratch copy with the three corrections, laid out as `.claude/skills/fortress-repo/references/revival-changes.md`: exit 0, no hit. Neither writer could run it (`writer-1.log`, `writer-2.log`).

**Size exception.** The update adds 908 bytes, net. The standard says "New content must compete for space through consolidation".
- The text was already 32K, against the workflow's budget of 8K to 12K characters (`tools/orientation/README.md`). It is now 2.75 times the budget's top.
- I accept the growth for this update. The two rules on the built-in number types and the removed names (F-379, with the fix round's repairs) add about 950 bytes, net of the sentence moved out of "`Number` declares nothing". They are the skill's only account of these types that is not false: the area parts still name the removed objects as current (`admission.md`, "Outside the orientation"), and both quiz readers met them. The fix round's edits in the other places cut about 225 bytes, net; 145 of them are the two sentences that correction 2 puts back. Correction 1 adds 41 bytes, and correction 3 adds 1.
- The cold readers name cuts in passages that this landing does not touch (`cold-read.md` part 3; `cold-read-2.md` part 3). Each needs a source check, and making them is the work of a consolidation run.
- The conflict stays exposed. The text has been above 29K since before climb batch 30's update, and only a consolidation can bring it within the budget.

## Carried, not caused by this update

**On sentences that the update leaves as the skill has them.** Holding a section would not remove these, so they are no reason to hold. They are listed for the next orientation round.
- `cold-read-2.md` items 2.1 (medium-high: walk's two refusals at `:49-52` cite no row), 2.2, 2.5, 2.7 to 2.15, 2.17, 2.18 and 2.21. Item 2.3's forward reference to "self-typed trait" at `:32` is old text too.
- `cold-read.md` item 2.7 (medium): whether a folded expression of radix-point numerals, as `1.0 / 2.0`, keeps `RR64` or defaults to `QQ`. The writer could not check it (`writer-2.log`, "Questions left open"). It touches microGPT's untyped float constants. P-173 or a probe settles it.
- `cold-read.md` items 2.11 and 2.12 (reordering for row 1052; the `Index` bound for code that must compile today and pass the count stage), which the writer left open.
- `:70`'s last sentence: the prelude's `===` at `RR32` calls `=`, which overflows the stack (row 528). Older than this landing; the coordinator's (`admission.md`, "Outside the orientation").

**On the new text, not leading to a wrong action.**
- `:24`: `excludes { HasRank }` for a number type below `Number` may be redundant by `HasRank`'s own clause (table above).
- `:95`: "No type of a program extends a number type" at `QQ` (`queue.md`).
- `:44`: the period in which the advice applies (`cold-read-2.md` item 2.4). It applies in both.
- `:97`: "in that order" (`cold-read-2.md` item 2.20).

## Outside the orientation, for the coordinator

These are from `admission.md`, "Outside the orientation", and from this judgement. None of them is this workflow's to change.
- The area parts that the landing made false or incomplete: `interpreter.md:81`, `:121`, `:127`, `:141`, `:147`; `compiler.md:22`, `:99`, `:112`; `library.md:39`; `interpreter.md`, "What walk checks" (rows 697, 1044, 1058, 1057 and 959); `compiler.md`, "Traps of the compiled path" (rows 1054 to 1056, 1059, 528 and 1060, and F-378's convention). Both quiz readers met `interpreter.md:121`, `:127` and `:141` in both cases.
- `compiler.md`, "Traps of the compiled path", is the place for rows 441 and 523 (correction 2). Once they are there, a consolidation can cut them from the orientation.
- The core's "Numbers are siblings, not a tower" (`SKILL.md`) can say "seven of them value objects", so that it agrees with "Numbers".
- The regression key and its questions are modified in the working tree, uncommitted. Case 36's **Open** line already holds the question on `QQ`, and its **Skill** line fits the installed text.
