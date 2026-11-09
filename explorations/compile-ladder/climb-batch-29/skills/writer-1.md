The skill now matches the landing, in two commits. I did not push. Before you push, note one thing: `compiler.md` is now 31,002 characters, over the 30,000 that earlier writers kept it under.

## Commits
- `523a69054b`: the orientation update, installed in `revival-changes.md`, with its lines in `sources.md`.
- `dfcb7eb18f`: the other parts brought in line, with their lines in `sources.md`.

All changed files lint clean.

## Sections installed from the orientation
I copied three sections from `orientation.md` word for word: "Traits and objects", "Numbers" and "Reductions and comprehensions". The judgement held no section. I made the judgement's two corrections in "Numbers":
- I took rows 964 and 965 out of the list of compiled departures, because neither concerns numerals.
- "read the numeral at its default" became "read the numeral as its default", to clear a lint hit. The meaning is the same.

The part went from 25,337 to 27,692 characters. The judge accepted this size.

## Each sentence changed, with its reason
- **`SKILL.md`, "The phases".** The list did not show the fold. It now has a new step 4: "Fold each expression of numerals alone into one exact numeral". Walk and the compiled path both run this phase, before the checker (F-339; `PhaseOrder.java:125-148`).
- **`SKILL.md`, the paragraph on `fortress compile`.** It said that only the compile folds integer literals. I cut that sentence, because step 4 now states the fold for both paths.
- **`SKILL.md`, "Static parameters".** It said "`nat` is an `NN32` value". It now says: "a `nat` or `int` parameter used as a value is a `ZZ32`" (P-173, F-342).
- **`SKILL.md`, "Numbers are siblings".** It said only that overflow raises `IntegerOverflow`. Now, after "Overflow raises `IntegerOverflow`", it adds: "but an expression of numerals alone folds exactly", with a pointer to "Numbers" (F-339).
- **`interpreter.md`, "How walk evaluates a program".**
  - It listed six closed rows (943, 944, 945, 364, 721, 578) as open departures. That list included the false claim that each string literal makes a new object.
  - It now lists walk's open departures, each with its workaround from its row: rows 958, 960, 962, 966, 967, 968 and 387.
  - Row 962 says that which answer is right is open, so a test asserts none.
- **`interpreter.md`, "Natives".** It said nothing about a `||` of two literals. It now adds: "A `||` of literals folds into one flat literal, so a test that needs a `CatString` joins a literal with a variable" (F-343).
- **`compiler.md`, "Traps of the compiled path".**
  - The false bullet that a string literal makes a new object (row 945, fixed) is gone.
  - In its place are the numeral's compiled departures: rows 957, 961, 962 (open) and 963.
  - The `typecase` crash on an untyped binder (row 964) is a new bullet.
  - The prelude's `||` that takes the string first only (row 965) is one new sentence in the bullet on the prelude's `print`, `println` and `||`.
- **`compiler.md`, "What the code generator does".** A new bullet: a program's coercion from a numeral runs once per site, in the component class's static initializer, so a coercion that raises stops the program before `run()` (F-340).
- **`tests-writing.md`, "A test program".** It said that walk refuses `a: NN32 = 5` (row 454, now fixed). It now says that a test of run-time arithmetic or concatenation needs a typed operand, because an expression of literals alone folds (F-339, F-343).
- **`tests-writing.md`, "Where a test goes".** It did not name the new harness key. It now adds: "With `run_exits_nonzero=true`, the run must exit non-zero instead, as a program whose class fails to load does". I checked this against `FileTests.java:595-606`.
- **`library.md`, "Designing a change".** It gave `IntLiteral`'s bindings as the example of glue classes, but `IntLiteral` has left the library. The example is now `Reflect`'s bindings (P-169, F-32, F-299).

## Lines of the data already true or with nothing to place
- The `revival-changes.md` lines in the data (`:48`, `:62`, `:89`, `:95`, `:108`, "Numbers", "Arguments convert") were all made true by the install.
- None of the changed decisions (P-165, P-171, P-76, P-172, P-173, P-169, P-154, P-166, P-163, P-175) has a sentence in the skill that rests on the old words. I changed nothing for them.
- `diff.md`'s line on the skill is only a pointer to `owed.md`.

## Decisions not taken
- **`compiler.md` is now 31,002 characters, over its 30,000.** The departures that the judgement asks for added about 1,000 characters. I found no cut of that size that keeps every rule's meaning. The ways to settle it:
  - cut elsewhere in a consolidation pass;
  - set a new size budget for the part;
  - move the numeral departures into a part of their own.
- **I added the open departure rows, which `owed.md` does not list.** The judgement's install, step 3, asks for them. Without them, the installed sentence "`interpreter.md` and `compiler.md` describe them" would be false. The other way was to leave them out and hold the push, as the judgement allows.

## Points for the coordinator
- `PLAN.md:73` is now stale. It says that the skill's sentence on a new string at each evaluation will change, and that sentence is now gone.
- The judgement's first finding for the next update is now ready. Line 89's clauses on rows 967 and 962 and line 91's list of rows now repeat the area parts, and cutting them saves about 400 characters. Under the curator's comment of 2026-11-08, they belong in the area parts only.
- `revival-changes.md` is about 27,700 characters, against a budget of 8,000 to 12,000. This is the fifth update in a row that went past the budget, and the judge again asks you to settle it.
- The quiz files `regression/key.md` and `questions.md`, and the batch's `orientation/` and `skills/` folders, are still uncommitted. I did not touch them, because they are not mine to commit.
- No other skill holds a sentence that the landing made false. I searched for `IntLiteral`, `FloatLiteral` and "fold" and found none.
---
session 2283395a-ba7c-432c-8c0b-0f0db1404cf3 turns 76 cache writes 127098 reads 5223221 output 28085 labels {'ephemeral_1h_input_tokens': 126998, 'ephemeral_5m_input_tokens': 0}
