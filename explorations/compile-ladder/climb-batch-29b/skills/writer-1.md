I've brought the `fortress-repo` skill in line with climb batch 29b's landing, in two commits. Lint is clean on every changed file, and nothing is pushed.

## Commits
- `27cb304a2a`: "fortress-repo: climb batch 29b landing, the orientation update installed". It changes `references/revival-changes.md` and `references/sources.md`.
- `1bcb6fac1c`: "fortress-repo: climb batch 29b landing, the area parts brought in line". It changes `SKILL.md`, `compiler.md`, `interpreter.md`, `library.md` and `sources.md`.

## Sections installed from the orientation
The judge marked two sections "install" and held none. Neither commit touched the other five parts, which are identical in both files.

- **"Static parameters, `where` clauses and sizes"**: the paragraph on `reflect` is shorter, and every rule in it stays.
- **"Numbers"**: the old text gave numeral forms that now fail, such as the getters, `coerce(x: IntLiteral)` and `asFloat` on a numeral type. It also said that `(h = 0.5)` is `true`, which is now `false` under walk.
  - It now gives the numeral types with their four numbers as static arguments, and the coercion that is generic over those numbers, with its `where` clause.
  - It now says that `RR64` and `RR32` on the compiled path take only `3.0`, not `3`.
  - It now gives the binding form for comparing a typed value with a numeral, and the fold's rule for a program's own type.
  - I applied the judge's two corrections. First, the checker *does* refuse a numeral that breaks the `where` clause, with 'The numeral 300 does not meet the where clause of the coercion to Byte.' I checked this against `CoercionOracle.scala:221` and the test. Second, a negated numeral is excepted from the fold sentence.
- **Size**: the file goes from 28,031 to 29,291 bytes, as the judge predicted. The judge accepted the size exception, and reports the budget conflict to the coordinator.

## Sentences changed (commit `1bcb6fac1c`)
- **`SKILL.md`, "Static parameters"**: it said that any `nat` or `int` parameter used as a value is a `ZZ32`. It now says "a `nat` or `int` parameter that is a size, used as a value, is a `ZZ32`". The reason is that a coercion reads a numeral's four numbers as `ZZ` (P-173, P-174, F-342).
- **`interpreter.md`, walk's departures**:
  - Row 960 named the deleted `digits` getter. It now says "so a coercion reads the digit count of `00.5` as 2, not 3".
  - Row 966's workaround was `NOT (u = 0)`. That gives a silent wrong `true`, because `u = 0` is now `false` (row 973). It now says "Bind the numeral at the type first, as `z: NN32 = 0`, then write `u =/= z`." This is the row's own workaround.
  - The bullet on row 968 is deleted, because the row is fixed (`a26e74f5c`).
  - A new bullet for row 974: a numeral type written as a static argument, or as a type that an object or a trait extends, loads and runs under walk. The compiled checker refuses both forms.
- **`compiler.md`, "The compiler's prelude"**: it now adds "The one exception is the numerals: until the switch-over, the prelude carries their design (P-37)."
- **`compiler.md`, "What the code generator does"**: it said "except at a generic type". It now says "except where the place's type names a type parameter". This follows row 957 and `CodeGen.java`, `numeralCoercionSiteDesc`.
- **`compiler.md`, "Traps of the compiled path"**:
  - Row 957 is restated: "At a place whose type names a type parameter of its generic declaration … Bind the value once, at a top-level variable of an instance type."
  - The bullet on row 961 is deleted, because the row is fixed.
  - Row 963 said that the selector keeps the type `IntLiteral`. It now says it keeps "its own type, as `NaturalNumeral[\1,10,7\]`".
  - New trap for row 971: a numeral coercion that spawns a task fails the class's load. Bind the two calls to locals first.
  - New trap for row 442's numeral half: `r: RR64 = 3` is refused. Write `3.0`. I checked this against `CompilerBuiltin.fsi:401-403` and `:444`.
- **`library.md`, line 23**: it now adds that until the switch-over, the compiled path converts into `RR64` only a numeral with a radix point and an `RR32` (row 442).

## Already true, or nothing to change
- **The changed decisions (POSITIONS)**: no sentence of the skill rests on any of their old words. I searched with `git grep` and changed nothing.
- **Row 962 in `compiler.md`**: still true.
- **The three points marked "not taken"** (F-58's `^`, F-79's prelude clause, F-169's "four numbers"): I left them as they are.

## Choices and decisions not taken
- **The two corrections**: the task said to copy "word for word", and the judge's install said to apply the two corrections. I followed the judge. The other way was to install the text as written, which keeps a false sentence.
- **Row 442 is now stated twice**: once in `revival-changes.md` and once as a trap in `compiler.md`. The data asked for the trap. The other way is to keep it only in "Numbers".
- **No separate bullet for row 973 in `interpreter.md`**: "Numbers" already states walk's answer, with the row. Adding a bullet would duplicate it.

## For the coordinator
- **`SKILL.md:71`**: it still says that the fold gives "a numeral, a quotient of two numerals or a boolean". The orientation now says "one exact constant". No list named this line, so I left it.
- **`compiler.md` is over its 30,000-character mark**: it went from 31,219 to 31,700 bytes. It was already over before this landing.
- **Uncommitted files**: `regression/key.md`, `regression/questions.md` and the orientation folder are not committed. They are not mine. The judge also notes that three lines of the key are stale against the installed text.
- **Not yet checked**: no cold read or quiz has run on the two corrections. The cold read of the installed part is due.
- **Other skills**: no other skill holds a sentence that this landing made false.
- **Shell**: the shell would not run commands that hold a variable, or a Python script from the scratchpad, without approval. So I made every edit with the Edit tool.
---
session 4102ea12-db27-4f70-8b6f-9219b0164904 turns 56 cache writes 101648 reads 2809601 output 23201 labels {'ephemeral_1h_input_tokens': 101584, 'ephemeral_5m_input_tokens': 0}
