<!-- The orientation's update for climb batch 33's landing (run 1): for each changed passage of revival-changes.md, the old text it replaces and the entries that it rests on. -->

# Sources mapping: climb batch 33, run 1

The orientation was copied from `.claude/skills/fortress-repo/references/revival-changes.md` as it stands (33,285 bytes). After the update it is 33,082 bytes, and 33,263 after the fix round. No section was added. Three passages changed.

## "Traits and objects", the rule "In a self-typed trait the checker types `self` as the trait met with the implementing type"

- Replaces: the last sentence of the paragraph at the old `:41`, "A compiled body of `T` that returns `self` at `X` runs. Three shapes fail when the class loads:", the three bullets at the old `:43-45`, and the paragraph of workarounds at the old `:47`. The advice to declare your own `MIN` and `MAX` is deleted and not replaced.
- New text: one paragraph, from "A compiled body of `T` that returns `self` at `X` runs, also from ..." to "... it may fail when the class loads (row 1052)."
- Rests on: F-377 (rows 1050 and 1051, fixed; row 1070, open; the cast at a `case` arm and at a function expression's and a local function's result); F-385 (row 1052, fixed; the limit for a generic object, by reading, from row 1052's note); F-225 for the checker's half, unchanged. Tests: `compiler_tests/SelfTypeArmRun`, `SelfTypeFromClosureRun`, `SelfTypeParameterReceiverRun`, `XXXComprisesValueAtTypecaseArmRun`.
- Fix round (`cold-read.md`, item 10): "Its test returns `self` at the type that a `comprises` clause lists (row 1070)." became "(row 1070). The row's test returns `self` at `R`, the type that its trait's `comprises { R }` lists." This defines `R` before the workaround uses it.
- Scope kept to the evidence: row 1070's shape is stated as measured at a type that a `comprises` clause lists, not at `X`. No claim is made that the library's `MIN` and `MAX` run compiled.

## The same rule, its last paragraph

- Changes: "its load check refuses the valid pair:" becomes "its load check refuses the valid pair (row 999):".
- Rests on: F-318 (`1e9b2cf9c4`).

## "Numbers", the rule "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist"

- Replaces: "As a `typecase` arm, each takes every value, without a message (row 959). So an arm at `Int`, copied from a team test or an old note, also takes an `RR64` and a string."
- New text: "A `typecase` arm at such a name, or at any name that names no type in scope, gets the same message. Write an arm over every value as `x: Any =>`, not as the team's `x =>`. An undefined name in a tuple arm still binds on both paths, with no message (row 1064). So under walk `(NoSuchType, ZZ32) =>` takes `("s", 3)`. Compiled, with an `Any` selector, the checker refuses that arm: 'The typecase clause, Pattern at ..., is unreachable.'" The fix round added "undefined", "on both paths, with no message" and the compiled sentence (`preserve.md`, failures 1 and 2; `quiz-grade-1.md`, case 37); the compiled sentence rests on row 1064's notes and the key's run, case 37.
- Rests on: F-382 (row 959, fixed; the tuple arm's binding, row 1064); F-379. Tests: `tests/TypecaseUndefinedArmWalk.fss`, `tests/TypecaseTupleArmUndefinedNameBindsWalk.fss`, `compiler_tests/XXXTypecaseUndefinedArmCompiled`.
- The refusal is stated as built, with no P-N: review-queue item 592 is open between 1a, 1b and 1c.
