<!-- Climb batch 31's orientation judgement (update mode, run 1): for the whole text and for each section of orientation.md, whether its change is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason, the report line it rests on, one correction to the row-1052 workaround, and the size before and after. -->

# Climb batch 31: judgement of the orientation update

Judged: `orientation.md` in this folder, the second writer's text (31,942 bytes). I compared it with `.claude/skills/fortress-repo/references/revival-changes.md` on `main` at `9317123078` (31,052 bytes; last changed at `220916891d`). Standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance". Reports read: `admission.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `sources-mapping.md` and both writers' logs. Also read: the regression key's case 35 (`explorations/coordinator/tools/orientation/regression/key.md:454-466`, modified in the working tree) and its question (`questions.md:114-118`).

## Verdict

**Whole text: install, with one correction in "Traits and objects". No section is held.**

Two sections change. `diff` finds two places, old lines 13 and 41.
- "Traits and objects" changes at line 41, from the two admitted entries (F-377 and F-225). The old sentence there is false: row 695 is FIXED.
- "Dispatch and overloading" changes at line 13. The first cold read asked for this wording (its item 12).

The opening and the other four sections are the skill's text, byte for byte.

## What the reports cover, and what I checked myself

`preserve.md` was written after the first round, and found two failures, both on row 1052. No preservation report covers the fix round. So I read the `diff` of the final text against the skill's and checked each claim that the fix round changed or added against its source. I built nothing and ran nothing, except the lint on a scratch copy (see the correction below).

| Changed claim | Source read | Result |
|---|---|---|
| `:13` "Both paths refuse a pair whose exclusion needs a static parameter that the equalities leave free" (was "a pair where the equalities leave a static parameter free") | P-152; the sentence before it, "or where some position excludes at the instance that they force" | supported. The old wording also refused a pair that excludes at another position. The example is still refused: `U` stays free. |
| `:45` "calls a method on a value of type `X`" | F-225 ("a value of the self-type parameter"); ledger row 1052 | repaired, as `preserve.md` failure 1 proposed |
| `:47` "For the third shape, declare the method in the object." | row 1052's notes, "Workaround: declare the method in the object" | repaired, as `preserve.md` failure 2 proposed. Its unconditioned reading is measured to fail: correction below |
| `:44` "The integer types, `QQ` and `RR64` declare their own" | P-47: the five integer types declare their own, and "`QQ`, `RR64` and the compiler's prelude declare all three" | supported. It is beside the point for `QQ` and `RR64` (cold read 2's item 2.9, below). |
| `:47` "bind `self` to a variable of type `X` first, as `s: X = self` ... has run only in a trait with a `comprises` clause ... so run it before you keep it" | probe W, `rung-comprises-cast/REPORT.md:97`; the admission's first point for the writer | supported: no run on record at `X`, and the sentence says so. The key's runs have since run `s: T = self` at the self-type parameter (`key.md:466`). |

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | no change | The skill's text. | `diff` |
| Dispatch and overloading | install | One sentence, made narrower, and supported (table above). Cold read 2's section 1 restates it right: "I would refuse a pair whose exclusion needs a parameter that nothing ties (P-152)". Its section 2 has no item on line 13. No quiz case reaches it. | `cold-read.md` item 12; `cold-read-2.md` part 1, "Dispatch and overloading"; P-152 |
| Traits and objects | **install, with one correction** | F-377 and F-225 are in the text with their conditions. The false sentence of row 695 is gone. Preservation failures 1 and 2 are repaired. Both readers got case 35 right in both rounds. One sentence, the workaround for row 1052, can send a worker wrong. A run shows this, and the correction below replaces the sentence. | `preserve.md` failures 1 and 2; `quiz-grade-1.md` and `quiz-grade-2.md`, "Counts"; `quiz-grade-2.md`, "On the orientation", first point; `key.md:466` |
| Static parameters, `where` clauses and sizes | no change | The skill's text. | `diff` |
| Numbers | no change | The skill's text. | `diff` |
| Reductions and comprehensions | no change | The skill's text. | `diff` |
| Implementation limits | no change | The skill's text. | `diff` |

### Traits and objects: the three checks

- **Preservation.** No failure is left (table above). The fix round added two sentences, on `MIN` and `MAX` and on `s: X = self`. Both are supported.
- **Quiz.** Case 35 was right in both rounds, and so was case 8. Nothing counts against the orientation (`quiz-grade-1.md:7`, `quiz-grade-2.md:7`). Both readers took case 35's three behaviours and the workaround's caveat from this paragraph. It is their only source: no area part names rows 1050 to 1052 (`admission.md`, "Outside the orientation").
- **Second cold read.**
  - Section 1 restates the self-typed rule right: no cast; three compiled shapes to avoid; `s: X = self`, tested before it is kept.
  - It has two items on the new text, and neither leads to a wrong action:
    - 2.6 (medium) says that the workaround's evidence is at a listed type, not at `X`. The reader's own action is the one that the text asks for: "use `s: X = self` and test it, since it is not yet proven".
    - 2.9 (medium-low) asks four questions on `:44`. I checked them:
      - `QQ` and `RR64` extend `StandardPartialOrder` and `StandardMinMax`, not `StandardTotalOrder` (`Library/FortressLibrary.fsi:292`, `:396`). So "declare their own" is true (P-47) but beside the shape.
      - `String` extends `StandardTotalOrder` and declares no `MIN` or `MAX` of its own (`Library/FortressLibrary.fsi:2593-2668`).
      - The compiler's prelude's `StandardTotalOrder` declares no `MIN` or `MAX` (`Library/CompilerAlgebra.fss:17-23`). So the shape is the one library's, and it applies after the switch-over.
    - None of these makes a worker write a wrong test today: on the compiled path, a compiled `MIN` on a program's own `StandardTotalOrder` reaches no such body before the switch-over. These points are carried (below).

### The correction: the workaround for row 1052

**The final text** (`orientation.md:47`): "For the third shape, declare the method in the object."

**What a run shows.** The regression key's runs, on `main` at `9317123078` (`key.md:466`, "Evidence"):
- With `keyOf` declared without a body in the trait and with its body in `Late`, the program printed 'REACHED' and 'PASS'.
- With the trait's body kept and `keyOf` declared again in `Late`, it died with 'ClassCircularityError: QzKeyOfAgain$Late'.

The key marks the second form Wrong for case 35 (c) (`key.md:462`). Its "Open" line records that row 1052's notes give the workaround "with no run and without the condition that the trait's body goes" (`key.md:464`). I did not run it again. My brief cites the key's runs, through `quiz-grade-2.md`.

**What it costs.** A reader from Scala or Java takes "declare the method in the object" to mean an override, with the trait's default body kept. That is the form that dies.
- `quiz-grade-2.md`, "On the orientation", first point: "A reader who keeps the form as a plain test would fail (c) on this passage." That reader avoided the trap only because it declined the form for another reason.
- The second cold reader's own action repeats the sentence without the condition: "For the third I would declare the method in the object" (`cold-read-2.md:43`).
- The grader did not count it, because neither quiz reader kept the form.

**The correction.** Replace that sentence with:

> For the third shape, declare the method in `T` without a body, and give the body in the object. Declaring it again in the object while `T` keeps its body still fails.

- **Its sources:** row 1052's notes, with the condition from the key's two runs above.
- **Size and lint:** it is 112 bytes longer. I ran `explorations/coordinator/tools/skills-lint.py` on a scratch copy of the text with the correction in place, laid out as `.claude/skills/fortress-repo/references/revival-changes.md`: exit 0, no hit.
- **Its checks:** it has had no cold read and no quiz round. The install's cold read of the installed part reads it (`tools/orientation/README.md`, "Installing its result"). This follows climb batch 29b's judgement, which installed "Numbers" with two corrections in the same way.
- **At the install, in `sources-mapping.md`:**
  - Its row for this sentence (`:21`) cites row 1052 and the key's runs (`key.md:466`).
  - Its line 5, "One passage changed", becomes two passages: it already maps the second, line 13.

**Why the section is not held.** Holding it would keep the old line 41, "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695)". That sentence is false since `6df780a7d0`: row 695 is FIXED, and `compiler_tests/SelfTypeReturnSelfRun` runs. The key's case 35 counts it Wrong for (a) (`key.md:462`). A hold would also leave the skill with no account of rows 1050, 1051 and 1052. The correction replaces the one sentence that a check found to have a failing reading, and it is taken from the row and from a run.

**Not corrected.** `:45` says "a value of type `X`". It does not say whether a call of a functional method on that value, such as `lt(other, self)`, is the third shape (`quiz-grade-2.md`, "On the orientation", second point). The key's passing form for (b) calls `lt(other, s)` and runs. That shows one such call that is not the shape, not that no such call is. F-225 and row 1052 say "a value", and `preserve.md` failure 1 asked for that wording. Carried.

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main`) | 31,052 | 31,046 |
| `orientation.md` as written | 31,942 | 31,936 |
| After, as judged (with the correction) | 32,054 | 32,048 |

**Size exception.** The update adds 1,002 bytes and cuts nothing to pay for them. The standard says "New content must compete for space through consolidation".
- The text was already 31K, against the workflow's budget of 8K to 12K characters (`tools/orientation/README.md`). It is now 2.7 times the budget's top.
- I accept the growth for this update. About 870 bytes replace one false sentence with the skill's only account of three failing compiled shapes and their workarounds. Line 13's rewording adds 20 bytes, and the correction adds 112.
- The second cold reader names cuts in passages that this landing does not touch (`cold-read-2.md` part 3: 3.1, 3.2, 3.5 to 3.9). Two more are in the new text: 3.3, the file and line of `MIN` and `MAX`, and 3.4, the workaround's example. Each needs a source check, and making them is the work of a consolidation run.
- The conflict stays exposed. The text has been above 29K since before climb batch 30's update (that judgement's size table: 29,117 bytes before it), and only a consolidation can bring it within the budget.

## Carried, not caused by this update

**On sentences that the update leaves as the skill has them.** Holding a section would not remove these, so they are no reason to hold. They are listed for the next orientation round.
- 2.2 (high): `:63` says "`SEQV` follows the specification on both paths", against `:70`, where the compiler's `===` compares by `=` until the switch-over (row 908).
- 2.3 and 2.4 (medium): the "Until the switch-over" convention of `:7`. `:91` and `:97` do not fit it, and the text says both "compiler's library" and "compiler's prelude".
- 2.5 (medium): `I extends Index` is given before the compiled restriction (`:54`).
- 2.1, 2.7, 2.8 and 2.10 to 2.23, at medium or lower.
- The first cold read's items that the writer did not place (`writer-2.log`, "Not placed": `cold-read.md` items 2 to 11 and 13 to 20, and part 3).

**On the new text, not leading to a wrong action.**
- 2.6 and 3.4: the workaround's example at a listed type. Once the key's run of `s: T = self` at the self-type parameter is on record, "run it before you keep it" can go.
- 2.9 and 3.3: the scope and the list of `:44`, with the facts checked above.
- Quiz grade 2's second point: functional-method calls and row 1052.

## Outside the orientation, for the coordinator

These are from `admission.md`, "Outside the orientation", and from this judgement. None of them is this workflow's to change.
- Ledger row 1052's notes: "Workaround: declare the method in the object" lacks the condition that the trait's body goes. The key's runs (`key.md:466`) give it. Once the row holds it, `sources.md` can cite the row alone.
- The key's case 35, "Skill" (`key.md:465`), describes the first round's draft ("gives none for row 1052"). After the install it should describe the installed text. The key and the questions are modified in the working tree, uncommitted. Case 8's scope note is already repaired there (`key.md:108`).
- The area parts that the landing made false or incomplete: `compiler.md:40` (`label`, `exit` and `atomic` as an expression now compile); `gate.md:47` (twenty-four atomic runs, not twenty-two); `SKILL.md:124` and `compiler.md:75` (a `var` field's cell); rows 1037 to 1053, which no area part holds; `interpreter.md:18` and `:63-79` (F-375).
- `SKILL.md:101` quotes the first line of an `interpreter_cache/` entry with `Library/FlatString.fss` in it. Loading the skill put that file's whole text into this judge's context too, as the admission reports for its own run.
