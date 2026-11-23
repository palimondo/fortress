# Sources mapping: climb batch 35b, update

One sentence changed. It is in "Traits and objects", under the rule "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)".

- Old: "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`."
- New: "The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only."
- Source: F-403 (climb batch 35b, rung E, `e5cf04d474`); `Library/FortressLibrary.fsi:2793-2794`; `ProjectFortress/tests/BooleanEquivalenceWalk.fss`. Gap-ledger row 184 is fixed. The sentence cites no P-N, because the top-level form is a default of the batch's plan.
- The change replaces the old clause's source in `references/sources.md:1129` (row 184, and `<->` from `Library/FortressLibrary.fss:4768`).
- The sentence does not say that compiled code runs the operators. The one-library test, `OneLibraryBooleanEquivalence.test`, only compiles.

## Fix round

- The same sentence ends with "so on other values each is a type error". Source: `preserve.md`, note 1; F-403's two messages (walk's 'Unification error', the checker's 'Could not check call to operator EQV').
- "Traits and objects", the `SEQV` rule's last sentence: "Its `≣`, declared as `===` over `Any`, follows `SEQV` but compares strings and `ZZ32`, `ZZ64`, `RR32` and `RR64` by `=`, not by bits or identity (row 908)." Source: `quiz-grade-1.md`, case 39; `Library/CompilerLibrary.fsi:30` and `.fss:63-68`; `compiler.md`, the `ValueObjectMark` sentence.
- "Traits and objects", the self-typed trait: the list of compiled shapes that run is cut; the sentence now opens "One shape of a compiled body of `T` that returns `self` at `X` fails". Source: `cold-read.md`, section 3, line 41.
- "Traits and objects", the paragraph on `self` in the overloading rules: "such a pair" is gone. The sentence now reads "Walk reads `self` in the same way, in the library and in a program's own component." Source: `cold-read.md`, 2.5 and section 3, line 43.
- "Traits and objects", `Index`: the scope "that runs under walk or is checked against the interpreter's library" moves to the instruction, and the closing clause that withdrew it goes. Source: `cold-read.md`, 2.9.
- "Reductions and comprehensions": "A generic one stops at its first join" becomes "fails". Source: `cold-read.md`, 2.14.
