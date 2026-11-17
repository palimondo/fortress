<!-- The orientation update's mapping for climb batch 31b (run 2 of climb batch 31): the changed passages of "Numbers" and their sources. -->

# Sources mapping: climb batch 31b, run 2 of climb batch 31 (update)

Two passages of "Numbers" changed. One bold rule was added; no heading was added or removed. The file grew from 32,123 to 33,012 bytes.

## "Numbers", the rule "The number types are flat siblings (P-43)"

Replaced: "The record calls this choice route A. It still calls the number and order traits "the tower", which does not mean that they nest." (`.claude/skills/fortress-repo/references/revival-changes.md:95`).

| New text | Source |
|---|---|
| Seven are value objects (P-178): `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64`. | F-379; P-178; `Library/FortressLibrary.fsi:292`, `:511`, `:572`, `:642`, `:713`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:41`, `:123`, checked. The seven are named, so the reader need not count from five (admission, points for the writer; `record-landing/cold-read.md:203`). |
| `QQ` is a trait, and its values are the value object `Ratio` (P-166). | F-379; P-166; `Library/FortressLibrary.fsi:394`, checked. |
| No type of a program extends a number type. Declare a program's own number type below `Number` (P-160). | P-178's rule, stated without a run for a trait below a number type (admission, "What has been run"). P-160 moved here from the last sentence of "`Number` declares nothing", which is cut, so the fact is stated once. |
| Walk refuses an object below a number type at load: 'Attempt to extend object type ZZ32'. | F-379; `ProjectFortress/tests/NumberTypeExtendRefusedWalk.fss` and `.test` (`load_exception_contains`), checked. |
| The compiler's prelude still declares the number types as traits that a type can extend (row 1003). The checker accepts such an object, and it dies when its class loads (row 866). | F-379; rows 1003 and 866 (`compiler_tests/XXXObjectExtendsZZ32Compiled.test`). Not opened with "Until the switch-over", since P-178 has the prelude take the same form before the switch-over (admission, points for the writer). |
| The record calls this design route A, and calls the number and order traits "the tower": they do not nest. | The old two sentences, merged. "Traits" kept: the order traits and `Number` are traits. |

## "Numbers", the new rule "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist"

Added after the rule above. No section owned the removed names.

| New text | Source |
|---|---|
| No library declares them. As a type, each is undefined: 'Float is undefined.' | F-379; F-303; `git grep` of `Library/` and `ProjectFortress/LibraryBuiltin/` for their declarations: none, the compiler's prelude included. |
| As a `typecase` arm, each takes every value, without a message (row 959). An arm at `Int` also takes an `RR64` and a string. | Row 959; rung O's skeptic run (arms `Int`, `Float`, `else` on `3`, `1.5`, `"s"`: `3 Int; 1.5 Int; s Int`), `batch-31b-review.md`, section 2, O4. Run under walk only; the sentence names no path, and cites the row. |
| In their place, write `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`, in that order. | The removed declarations at the base, `06cd094706~1:ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:126`, `:129`, `:41`, `:196`, `:193` (`Int extends ZZ32`, `Long extends ZZ64`, `Float extends RR64`, `BigNum extends ZZ`, `UnsignedLong extends NN64`), checked. |

## "Numbers", the rule "`Number` declares nothing (P-165)"

Cut: its last sentence, "A program may also declare its own number type below `Number` (P-160)." The fact now stands in "The number types are flat siblings".

## Fix round (from `preserve.md`, `cold-read.md` and `quiz-grade-1.md`)

The file went from 33,012 to 32,844 bytes. No heading changed.

| Place | New text | Source |
|---|---|---|
| Preamble, the ledger-row paragraph | "do not assert it in a plain test. Where the rules decide the case, an `XXX` test asserts their answer" | cold read, point 2.3; `tests-writing.md`, "How `XXX` works", case 2 |
| "Dispatch and overloading", the Meet Rule paragraph | "or, for a number type below `Number`, `excludes { HasRank }`, the trait that arrays extend" | cold read, points 2.8 and 2.21; `Library/FortressLibrary.fsi:1341` (`HasRank excludes { Number, AnyMaybe }`) |
| "`override` widens" | "The checker refuses such a redeclaration where …" | cold read, point 2.9; row 1037 (the method declared again at the same parameter types) |
| The cover rule | "at the same limits, which `interpreter.md` … gives" | cold read, point 2.10; meaning kept |
| Self-typed trait, second shape | "`StandardTotalOrder`'s `MIN` and `MAX` in the interpreter's library have this shape. So declare your own `MIN` and `MAX` in a type that extends `StandardTotalOrder` and must run compiled, as the integer types do" | cold read, points 2.5, 2.6 and 3.8; `Library/FortressLibrary.fsi:292`, `:394`: `RR64` and `QQ` extend `StandardMinMax`, not `StandardTotalOrder`; `FortressLibrary.fss:291-292` |
| `SEQV` paragraph | "falls back to `SEQV` and is `false` (row 923)" | cold read, point 2.2; row 923 states the `false` |
| `NatReflect` rule | "Such a call runs only under walk, also after the switch-over." | cold read, points 3.1 and 2.19; meaning kept |
| "Numbers", flat siblings | "Such a type runs on both paths." | quiz grade 1, note 2; the regression key's case 36 (c), the run of `Meters` below `Number` on both paths by climb batch 31b's update |
| "Numbers", flat siblings | "Walk refuses an object below one of the seven at load" | `preserve.md`, failure 2; `DesugarerVisitor.java:1398`, `:1435-1436` |
| "Numbers", flat siblings | "The compiler's prelude declares no `QQ`, and still declares the other seven as traits that a type can extend (row 1003)" | `preserve.md`, failure 3; `CompilerBuiltin.fsi:273`, `:444` |
| "Numbers", flat siblings | "and still calls the number types "the tower", though they do not nest" | `preserve.md`, failure 1; P-43 |
| Numeral rule | "The compiler's prelude follows the same design (P-37)." | cold read, point 2.19: the marker stated no limit; meaning kept |
| Integer power rule | cut: the prelude's `ZZ32` power at a negative exponent (rows 441, 523) | cold read, point 3.3: the action is already in the rule |
