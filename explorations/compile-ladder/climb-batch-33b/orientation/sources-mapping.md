<!-- What the update for climb batch 33b's landing changed in the orientation, and the source of each change. -->

# Sources mapping: climb batch 33b

One paragraph changed: "Numbers", the rule "The number types are flat siblings (P-43)". The bold rule and its other sentences stand.

| Old text | New text | Source |
|---|---|---|
| "In the interpreter's library, seven are value objects (P-178)" | "In both libraries, seven are value objects (P-178)" | F-379 (the interpreter's library), F-388 (the compiler's prelude, built at `75f9f2fbf4`; `CompilerBuiltin.fsi:210` and the six others) |
| "`QQ` is a trait, and its values are the value object `Ratio` (P-166)." | "In the interpreter's library, `QQ` is a trait, ... (P-166). The compiler's prelude declares no `QQ`." | The first half of the old prelude sentence, still true (F-388 names seven types) |
| "Walk refuses an object below one of the seven at load, as `object Mine extends ZZ32`: 'Attempt to extend object type ZZ32'." | "Both paths refuse an object below one of the seven, as `object Mine extends ZZ32`. Walk refuses it at load: 'Attempt to extend object type ZZ32'." | F-379, F-388 |
| "... and still declares the other seven as traits that a type can extend (row 1003). So the checker accepts such an object, and the object dies when its class loads (row 866)." | "The compiled checker refuses it: 'Invalid type in extends clause: ZZ32'." | F-388; rows 1003 and 866 fixed at `75f9f2fbf4`; `TypeHierarchyChecker.scala:212`; `compiler_tests/XXXNumberTypeExtendRefusedCompiled.test` |

## Fix round

| Place | Change | Source |
|---|---|---|
| "Numbers", P-43 rule | "an object below one of the seven" becomes "an object declaration below one of the seven". An object expression gets another compiled message, 'Objects can only extend traits.' | `preserve.md`, failure 1; `scala_src/typechecker/impls/Misc.scala:366`; `compiler_tests/XXX6bx.test` |
| Preamble, ledger rows | The three sentences on plain and `XXX` tests become two instructions with no contradiction. The rule is unchanged. | `cold-read.md`, section 2, item 1 |
| "Traits and objects", P-156 rule | The limit to walk and the interpreter's library moves into the sentence that tells you to write `I extends Index`. | `cold-read.md`, section 2, item 11 |
| "Traits and objects", self-typed traits | The list of shapes that run is cut; the one failing shape (row 1070) stays. | `cold-read.md`, section 3, item 1 |
| "Numbers", P-165 rule | The `QQ` example is scoped to walk, since the compiler's prelude declares no `QQ`. | `cold-read.md`, section 2, item 9 |

The compiled refusal is stated for an object only, the measured scope (`NumberTypeExtendRefusedCompiled.fss`, `object MyNum extends ZZ32 end`). No run on the landed code shows the compiled refusal of a program's trait below a number type.
