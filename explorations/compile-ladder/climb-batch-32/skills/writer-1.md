# Report: the `fortress-repo` skill after climb batch 32's landing

The skill is in line with the landing, in two commits. Nothing is pushed.

## Commits

- `3a9bf9f868`: the orientation's sections in `revival-changes.md`, with their lines in `sources.md`.
- `5e8b33fd3b`: the other parts, with their lines in `sources.md`.

## Sections installed from the orientation

The judge installs the whole text and holds no section. `revival-changes.md` went from 29,382 to 30,647 bytes. The judge accepted this growth.

- **"Numbers"** said that a tie between declarations goes to the numeral's default only where they differ at the numeral. It now says that the declaration that takes the numerals at their default runs. A new rule says that only a numeral's own coercion changes which declaration runs, with two departures (rows 1016 and 1017). The part said that `u = 0` is `false` under walk. It now says that it is `true` on both paths.
- **"Reductions and comprehensions"** said that only walk infers the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`. It now says that the checker takes the expected type, or else the body's type. It names the four places where the two paths sum in different types (row 1008), and `BIG MIN_MAX` (row 1007).
- **"Static parameters, `where` clauses and sizes"** got two clauses: a conditional extension is applied "without its condition" (row 774), and the `pick((1, 2))` example names its object and row 663.
- The opening and the other three sections are unchanged.

One lint hit stays in this file, at line 103. The word "default" there is the numeral's default type, a term of the rule. The text is installed word for word.

## Sentences changed in the other parts

- **`SKILL.md`, "Fortress as a language", the numbers.** It said that a conversion never changes which declaration runs. A numeral's own conversion now does (F-366). New text: "Only a numeral's conversion changes which declaration runs when one already fits."
- **`library.md`, "The curator's decisions on the library".** It said that the checker refuses a `SUM` without its element type, and told the reader to write the type everywhere. Row 731 is fixed (F-364, F-59). New text: "Where generators stand in brackets, the element type is written as in `SUM[\ZZ32\][j <- 0#n] f(j)`, and the library writes it at its own sites. For a call without it, the checker takes the reduction's expected type, or else its body's type (`revival-changes.md`, "Reductions and comprehensions")."
- **`interpreter.md`, walk's departures on numbers.** The bullet said that `u = 0` is `false` under walk. Rows 973 and 966 are fixed. The bullet now gives row 1016: "A numeral beside a value whose static type is `Any` converts by the value's run-time type, not to its default. So `a = 0` is `true` for `a: Any` that holds a zero `NN32` (ledger row 1016). To compare as the rules do, bind the numeral first, as `z = 0`, then write `a = z`."
- **`interpreter.md`, "How walk evaluates a program", new paragraph.** The part had nothing on a generic function passed as a value. It now says that the value takes its instance from the arrow type that receives it, and stays generic where none does (row 1021). It gives three departures:
  - an immutable top-level variable keeps the generic value (row 1019);
  - `appT(half, v)` is refused, so write `appT(half[\3\], v)` (row 1018);
  - a generic function declared in a block stops with 'Missing type T' (row 1020).
- **`interpreter.md`, new list "Walk also departs from the rules at these bindings".** Each bullet has its workaround from its row:
  - a top-level tuple binding runs its right side once for each name and once more (row 1026);
  - a `var` bound to an array literal in a block is immutable (row 1024);
  - an array literal assigned to a variable is not built into an array (row 1025).
- **`interpreter.md`, "Where a fix of walk belongs".** New: walk keeps each choice of a declaration in a dispatch cache, except a choice that asked a program's own type for its numeral coercion. The cache's key tells a numeral from a value of its default type and from a negative constant. I checked this against `OverloadedFunction.java` and `Numerals.Keys`.
- **`compiler.md`, "Traps of the compiled path".** Three new bullets:
  - a block that ends in a numeral after a declaration, or in a tuple with a numeral, dies with `NoClassDefFoundError` (rows 1014, 1030);
  - a generic function passed where the type is not an arrow type compiles and dies when it runs, so write the static argument (row 1012);
  - an assignment made by a top-level initialiser is not seen before that variable's first use (row 1011).
- **`compiler.md`, "The checker's gaps".** New: a type error in the body of a `SUM` without its static argument is reported as the big operator's refusal (row 1015).
- **`tests-writing.md`, "A test program".** New: "A superscript can follow a dotted access: `p.wq^T` is `(p.wq)^T`. After a call or a subscript, parenthesise first, as `(f(x))^T` and `(x[5])^2`: `f(x)^T` is a static error, and `x[5]^2` fails on both paths (ledger rows 1 and 1005)."
- **`gate.md`, step 4.** New: "In `ant testSystem`, `tests/XXXAtomicNestedReadsKeptWalk` can print `PASS` and fail with 'Missing expected failure': its expected failure depends on a race (ledger row 1004)."

Sizes, before and after, in bytes:

| File | Before | After |
|---|---|---|
| `SKILL.md` | 22,742 | 22,751 |
| `library.md` | 9,874 | 9,960 |
| `interpreter.md` | 21,749 | 23,783 |
| `compiler.md` | 32,779 | 33,972 |
| `tests-writing.md` | 12,552 | 12,786 |
| `gate.md` | 9,933 | 10,108 |

## Already true, or not placed

- **`SKILL.md`, the static parameters:** the sentence "Walk instantiates a reduction or a comprehension…" is already true. I did not change it.
- **`compiler.md`, a top-level tuple binding compiles:** the part has no sentence that says it does not. I changed nothing.
- **The signs `∑` and `∏`:** they now read as `SUM` and `PROD`. No worker falls into a trap there, so I added nothing.
- **The citation `FortressLibrary.fss:648`:** the skill's parts do not hold it.
- **The four changed decisions:** only the two sentences in `library.md` and `interpreter.md` rested on the old words. Both are fixed above.

## Choices that the record left, and decisions not taken

1. **`library.md`, the instruction on the element type.** The old text told a writer of library code to write it everywhere. I state the library's practice as a fact and give no instruction. The alternative is to keep the instruction, for the four places where the paths differ.
2. **`gate.md`, row 1004.** I state the fact only. The row gives no action. The alternatives: run the test again alone before the gate counts as red, or leave the gate red.
3. **The syntax sentence.** No part holds syntax, so I put it in `tests-writing.md`, where a worker writes Fortress. The alternative is `SKILL.md`, in the bullet on juxtaposition.
4. **Row 1015.** The orientation's judgement and sources name it, not the landing's list. I added it because its message misleads a worker.
5. **Rows not added.** The data does not name rows 1006, 1009, 1010, 1013, 1022, 1023, 1027, 1028, 1029 and 1031, so no part has them. Several are traps of the same kind. The alternative is one sentence each.
6. **The `B.data^T.v` form.** A selector after a superscript is a syntax error. I left it out to keep the bullet to one rule.

## For the coordinator

- **`compiler.md`, "The compiler's prelude":** it says "The one exception is the numerals". P-37 names two exceptions, the second being the built-in number types (P-178). This landing's lists do not ground the change, so I left it.
- **The regression key and questions:** both files under `explorations/coordinator/tools/orientation/regression/` are modified and uncommitted. The judgement says that cases 9, 16 and 26 quote the rewritten sentences. They are not mine.
- **Review-queue item 526:** the judgement says that its list of what the held rewrite would bring is two entries shorter now.
- **No other skill:** no sentence of another skill names rows 731, 973 or 966.
---
session 58bd5ee7-17e5-4617-85f5-fc1048a55eab turns 54 cache writes 137456 reads 2606765 output 29718 labels {'ephemeral_1h_input_tokens': 137406, 'ephemeral_5m_input_tokens': 0}
