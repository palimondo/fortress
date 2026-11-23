The `fortress-repo` skill now matches climb batch 35's landing. There are two commits on `main`. Neither is pushed. The lint found nothing in any changed file.

## Commits

- `ac72aee37d`: "fortress-repo: climb batch 35's landing, the orientation update installed". It changes `revival-changes.md` and `sources.md`.
- `0cb867d174`: "fortress-repo: climb batch 35's landing, the parts in line with it". It changes `SKILL.md`, `interpreter.md`, `tests-writing.md`, `compiler.md` and `sources.md`.

## Sections installed from the orientation, and sections held

`revival-changes.md` grew from 34,077 to 34,527 bytes, the size that the judge gave. A diff against `orientation.md` now differs only at the three held lines.

Installed word for word:
- **The opening.** One new sentence says that a departure that cites a FACTS entry in place of a ledger row has no row yet, and that the reader treats it as one that cites a row.
- **"`override` widens".** The old text said that the checker accepts an `override` that overrides nothing and that the code generator refuses every `override`. Both claims became false when rows 650 and 653 were fixed. The text now says that walk and the checker both refuse such an `override` (F-400).
- **"Numbers", whole.** The old text said that a coercion's numbers are `ZZ` values and that `v.asZZ32` is `ZZ`'s getter. The new text says:
  - `Byte`'s body is `Byte(v)`.
  - Each of the four numbers converts where it stands.
  - The tree departs from this rule, so `Byte(v.asZZ32)` is the form that runs under walk today (P-174).
  - The conversion into `RR64` is the getter `x.asRR64`. The one library still has `asFloat` (P-165, F-324).
  - The name "route A" is cut.

Held, as the judge ruled (the skill keeps its old text):
- The list of the forms in which a compiled `self` return runs ("Traits and objects").
- The sentence that the library's array `+` and `-` are valid ("Traits and objects").
- "Walk will run the checker only after the switch-over (P-12)" ("Implementation limits").

## Sentences changed in the other parts

| File and section | What was wrong | New text | Grounds |
|---|---|---|---|
| `SKILL.md`, "Parallelism and mutable state" | It said that an `exit` out of an `atomic` block loses the block's writes. | Sentence deleted. The writes are now kept on both paths. | F-401; row 1039, fixed |
| `SKILL.md`, "Fortress as a language", static parameters | It said that a `nat` or `int` parameter that is one of a numeral type's numbers is a `ZZ`. | "…is a `ZZ32`, but converts where it stands, as a numeral does, where it is one of a numeral type's numbers" | P-173 and P-174 as rewritten |
| `interpreter.md`, walk's departures on numbers | It said that a radix-point numeral loses its leading zeros. | Bullet deleted. | Row 960, fixed |
| `interpreter.md`, walk's departures at bindings | It said that a top-level tuple binding runs its right side once for each name and once more. | Bullet deleted. | Row 1026, fixed |
| `tests-writing.md`, the form of a program | It said that `x[5]^2` needs parentheses, because walk fails on it. | "After a call, parenthesise first, as `(f(x))^T`: `f(x)^T` is a static error." | Row 1, fixed; `tests/SubscriptThenSuperscriptWalk.fss` |
| `compiler.md`, "What the compiled path cannot compile yet" | It said to compile `FortressLibrary` first when several compiles share one JVM. | Paragraph deleted. The compile order no longer matters. | Row 1100's fix, `b7b5b0c02b` |
| `compiler.md`, the same section | It said that the code generator refuses `override`. | "…`abstract`, `test` and `override`, and an `override` where a static parameter is involved (ledger row 1106)." | F-400; `CodeGen.java:3462-3465`, which I checked |
| `compiler.md`, "Traps of the compiled path" | It said that a compiled call of an object's overloads with `self` not first dies or runs the wrong declaration. | Bullet deleted. | Rows 573 and 1038, fixed |

## Lines already true or left short

- `revival-changes.md:99`, "So `v.asZZ32` is `ZZ`'s getter": the install rewrote it.
- `revival-changes.md:32`, the false half on rows 650 and 653: the install rewrote it.
- `interpreter.md:33`, `tests-running.md:14` and `:117-118`, and `library.md:54` hold, as the data says.
- Three lines are short of a new row, and I added no sentence for any of them:
  - `compiler.md:156` and row 1041: an exit after its label block has completed now commits the `atomic` blocks that it leaves.
  - `revival-changes.md:32` and rows 1106 to 1109.
  - `interpreter.md:93-103` and row 1109.

  The judge kept the `:32` sentence. Row 1106 now appears in `compiler.md`. Rows 1107 and 1108 (gaps of the checker), 1109 (walk hides inherited overloads) and 1041's new commit go to the coordinator, who plans their fixes.

## Choices and decisions not taken

- **The `override` sentence in `compiler.md`.** I added the clause on row 1106 because, without it, "`override` compiles" would be false wherever a static parameter is involved. The judge also recommended it. The other ways were:
  - Delete only "such as `override` (ledger row 650)", which would leave the claim false.
  - Leave row 1106 out and name it here for the coordinator.
- **`library.md:23`, "`ZZ64` converts into `RR64` only explicitly, by `asFloat`".** The judge lists it as false under P-165, but the data does not name it. It is true of today's tree, so I left it. If the coordinator wants it changed, it can name the rule (`x.asRR64`) and the one library's departure, or point to "`Number` declares nothing".

## Points for the coordinator

- Rows 1107, 1108, 1109 and 1041's new commit need their fixes planned. Rows 1107, 1108 and 1109 are left open in the record, and the skill teaches no workaround for them.
- The regression key's case 32 **Skill** (`key.md:423`) still quotes the first writer's wording of the departure. The judge asks for it to match the installed text when the key is committed. The key is not committed.
- No other skill holds a sentence that rests on the changed decisions or on the fixed rows.
---
session bed16152-b613-456d-aa0b-3825f2bde4c1 turns 47 cache writes 95069 reads 2444530 output 17222 labels {'ephemeral_1h_input_tokens': 95013, 'ephemeral_5m_input_tokens': 0}
