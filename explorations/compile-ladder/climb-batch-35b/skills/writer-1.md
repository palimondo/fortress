I brought the `fortress-repo` skill in line with climb batch 35b's landing in two commits. Both pass the lint with no hits. Nothing is pushed.

## Commits
- `71d9fba7fe`: "fortress-repo: climb batch 35b's landing, the orientation's install". It changes `revival-changes.md` and adds its lines to `sources.md`.
- `abd58e52a0`: "fortress-repo: climb batch 35b's landing, the sentences it made false". It changes `revival-changes.md`, `interpreter.md`, `compiler.md` and `worktrees.md`, and adds their lines to `sources.md`.

## Sections installed from the orientation
The judge said "install" for three lines of "Traits and objects" and for "Reductions and comprehensions". I copied them word for word. `revival-changes.md` went from 34,761 to 34,787 bytes, which is the judge's figure.

- **The `≡` sentence, under the `SEQV` rule.** Before: the library declared `≡` for no type, walk stopped on it, and you wrote `a <-> b` instead. That is wrong now, because row 184 is fixed (F-403). Now: "The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only, so on other values each is a type error."
- **The last sentence of the same rule.** Before: it did not say what the prelude's `≣` is declared over. Now: "Its `≣`, declared as `===` over `Any`, follows `SEQV` but compares strings and `ZZ32`, `ZZ64`, `RR32` and `RR64` by `=`, …"
- **The `Index` sentence.** The condition "that runs under walk or is checked against the interpreter's library" moved into the instruction. The closing clause that repeated it is gone. The meaning is the same.
- **"Reductions and comprehensions".** "A generic one fails at its first join" replaces "stops". "Stops" could be read as the reduction ending early, but it is an error.
- **Held:** the judge held the cuts at lines 41 and 43 of "Traits and objects", so those lines keep their old text.

## Sentences changed
- **`revival-changes.md`, "Dispatch and overloading", walk's choice.** Before: walk "never" chose by the order of the declarations. That is false for row 1125. Now, after "Otherwise it compares the instances that the call makes.", it says: "In a departure, of two generic dotted methods of one name that differ only in their bounds, it keeps the first that it meets (row 1125)." Grounds: row 1125, F-253, F-26.
- **`interpreter.md`, walk's departures on numbers.** Before: a numeral type in a `comprises` clause loads and runs (row 981). Walk now refuses that at load, so row 981 is fixed. Now: "A numeral type written as a return type, a variable's or a field's type loads. Walk refuses it only where a numeral meets it, so `never(x: ZZ32): NaturalNumeral[\1, 10, 3\] = never(x)` runs (ledger row 1124). The rules refuse it, as the compiled checker does, and as walk does at load in an `extends` or `comprises` clause or as a static argument: …" Grounds: row 1124, and `checkNumeralTypesWritten` in `BuildEnvironments.java`, which I checked.
- **`interpreter.md`, walk's load check.** I deleted two items whose rows are fixed:
  - the tuple result beside a plain declaration (row 1058);
  - two generic dotted methods with different numbers of parameters (row 1057).
- **`compiler.md`, the calls that die with `NoSuchMethodError`.** I deleted two items whose rows are fixed:
  - the call of a functional method on a comprised object (row 815);
  - the assignment to a `var` field of a value below its type (row 1053).

  Row 839's case is the only one left, so I turned the list into one sentence: "A read of an exported object's value parameter, from a component that imports the api, dies at run time with `NoSuchMethodError` where the exporting component names the parameter otherwise than the api." `compiler.md` went from 47,450 to 46,792 bytes.
- **`worktrees.md`, line 36.** Before: a seeded worktree runs walk and the compiled path right away. That is false with the one library. Now: "runs walk and the compiled path on the compiler's prelude right away". I checked the code: `seed-worktree.sh` copies neither `build-one` nor `caches-one`, but `build.xml:470` includes `build-one` in the build's stamp (F-404).
- **`worktrees.md`, line 45.** I cut "Without the warning, `ant compileAll` keeps the seeded caches." It is false under F-404. `worktrees.md` went from 6,297 to 6,260 bytes.
- **The changed decision (P-174, which now names row 1124 instead of row 981).** The only sentence that rested on row 981 was the `interpreter.md` sentence above.

## Lines already true, or not placed
None. Every line in the data was false and is now changed. `revival-changes.md:57` (row 184) was fixed by the install.

## Choices and decisions not taken
- **Row 1125 in `revival-changes.md`.** I stated it as a departure with its row and no workaround. The alternative was to soften "never" in the bold rule. I kept the rule and added the departure.
- **`worktrees.md:45`.** I cut the false sentence, as the record suggested. The alternative was to keep it with a `build-one` exception, which would teach a workaround for a defect.
- **`worktrees.md:36`.** I narrowed the sentence to "on the compiler's prelude" and did not add a note about F-404. Since the script does not copy `caches-one` either, a one-library run in a seeded tree never worked right away.

## For the coordinator
- **Fix F-404 in the script.** `seed-worktree.sh` should copy `ProjectFortress/build-one`, and maybe `caches-one`. Until it does, the first `ant` target in a seeded tree whose base has `build-one` rebuilds the Scala and empties the caches.
- **Row 1125 is a new trap with only a departure sentence.** I added no workaround (P-180). Its fix needs planning.
- **The regression key is not committed.** The judgement asks that `key.md` and `questions.md` be committed with the install, because case 39 quotes the new line 57. They are not my paths, so I left them modified in the working tree.
- **Stale comment in the original tree.** `Library/CompilerLibrary.fsi:42-43` says that `===` on `Any` is reference identity. The code compares a value object field by field. Row 1119, the prelude's `≢` over `Any`, also sits next to line 57's new clause.
- **The held cuts at lines 41 and 43.** These are the same cuts that batches 33b and 35 held. Per the judgement, they need key cases 21 and 35 run before they can go.
- **Other skills.** No other skill has a sentence that the landing made false.
---
session ac0f516a-a029-4bef-ba49-49959c5ca56d turns 54 cache writes 74439 reads 3238738 output 21106 labels {'ephemeral_1h_input_tokens': 74361, 'ephemeral_5m_input_tokens': 0}
