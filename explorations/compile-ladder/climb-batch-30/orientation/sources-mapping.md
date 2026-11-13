# Climb batch 30: what changed in the orientation, and its sources

The orientation is `.claude/skills/fortress-repo/references/revival-changes.md` as it stands on `main` after `f78da2650a`, 29,117 bytes. The new text is `orientation.md` in this folder, 29,069 bytes. The line number below is the old file's.

## "Numbers", `:89`: "A numeral converts where it stands" (one edit)

- Deletes the sentence "Walk gives `Infinity` for the second (row 967)."
- Keeps the sentence before it unchanged. That sentence now holds for both cases: "A numeral outside the type's range, or that rounds to an infinity there, is refused: by the checker statically, by walk when the binding runs, with 'Type mismatch binding' and the numeral."
- Sources: F-341, with F-57 for the same correction; P-173. The admission is `admission.md` in this folder, 2026-11-10.
- Ledger: row 967, `FIXED` at `f36a65124` (rung N of climb batch 30).
- Code: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:354-355` (`Numerals.roundsToInfinityAsItIs`, then 'Type mismatch binding').
- Tests: `tests/NumeralRoundsToInfinityWalk`, `tests/NumeralPointRoundsToInfinityWalk` and `tests/NumeralFoldedRoundsToInfinityWalk`, each with `load_exception_contains=Type mismatch binding`.
- Report: `explorations/compile-ladder/climb-batch-30/RECORD.md`, "Revival changes, for the skill writer", rung N, item 3, and "Left for the coordinator and the skill writer", fourth item.
- History, for `sources.md` only: from climb batch 29 to `f36a65124`, walk bound such a numeral as `Infinity` (`tests/XXXNumeralRoundsToInfinityWalk.fss`, now without the prefix).

## Not placed

- At a parameter, walk refuses the numeral with another message: "got arg" (`interpreter/evaluator/values/NonPrimitive.java:266`; `tests/NumeralPointRoundsToInfinityAtParameterWalk.test`). The kept sentence gives the message of a binding only, as it did before this edit.
- Row 980, `CONTESTED`: where nothing fixes a type, a numeral with a radix point that rounds to an infinity is the `RR64` infinity on both paths. The orientation has no sentence on it.

## Fix round, 2026-11-13

`orientation.md` is now 29,237 bytes. The headings are unchanged. Each line gives the place, the change and its source.

- "Numbers", "A numeral converts where it stands": walk refuses "when the place runs", and its message depends on the place. Sources: `preserve.md`, failures 1 and 2; `quiz-grade-1.md`, third note; `Coercions.java:355`, `Numerals.java:577`, `NonPrimitive.java:266`, `LHSEvaluator.java:102` and `:226`.
- The same rule, new: how to get an infinity, and `isInfinite`. Sources: `quiz-grade-1.md`, first note; the regression key, case 33 (its probe under walk); `Library/FortressLibrary.fsi:304`.
- The same rule: the paragraph is split in three, and the numeral's numbers are named `n`, `m`, `r`, `v`. Source: `cold-read.md`, 2.17 and 2.20.
- "`Number` declares nothing": `u = 0` is the rule, `false` under walk is the departure, the binding is the workaround. Source: `cold-read.md`, 2.1; ledger row 973; `interpreter.md`. `asFloat` is named as a functional method: `cold-read.md`, 2.19; `FortressLibrary.fsi:322`.
- Opening: a sentence with a ledger row states a departure or an open question, not asserted in a plain test. Source: `cold-read.md`, 2.12; rows 663, 713, 923 and 973 are open questions.
- "Dispatch and overloading": the instance of the Return Type Rule (P-45); the equalities of P-152 in two sentences; row 780 "at each call, not at load" (`interpreter.md`, "What walk checks"); the abstract functional method as an overload. Source: `cold-read.md`, 2.6, 2.7, 2.13, 2.14.
- "Traits and objects": the joint cover of a meet (P-60); `override` and a compiled program (row 650); the two cases where walk refuses a valid self-typed pair (F-318); the indexed type's definition; the prelude's limit moved up beside the instruction to write the bound; row 511 as walk's departure. Source: `cold-read.md`, 2.2, 2.5, 2.10, 2.11, 2.15, 2.21.
- "Static parameters": the `OPEN` example's object (F-143, row 663); the action for the `Bottom` cases (rows 587 and 612 give it; row 591 gives none); row 774 as "ignore the condition"; `N[\nat n\]` named (`ProjectFortress/LibraryBuiltin/NatReflect.fsi:27`). Source: `cold-read.md`, 2.3, 2.4, 2.9, 2.16.
- "Reductions": the bold sentence is now a rule, and "every clause form" is limited to the four reductions. Source: `cold-read.md`, 2.8.
- Cut, as `cold-read.md`, part 3, items 1, 2, 4, 6, 10 and 12 name: the size's descriptor; "So walk runs programs that the checker refuses"; the `||` chain over character literals; the `bitsAs…` getters; and two pointers ("Read the part whole", "The compiled path's own limits are in `compiler.md`").
