# Cold read: c-run2/c7

Read with `CLAUDE.md`, `fortress-repo/SKILL.md` and `references/records.md` (for status words, F-numbers and the history file). The row template that defines each status word is in the ledger itself, which a cold reader may not open, so `NEGATIVE-VERIFIED` is read here as "a defect, confirmed, still open" from its context in `records.md` (it is not one of the three closing words).

## Row 328

- **Defect:** On the compiled path, comparing an integer literal with another value converts both sides to `ZZ64` first. A literal too large for `ZZ64` (for example 2^64-1) makes the comparison throw `Not in range for ZZ64` instead of answering. Walk answers `false` for the example.
- **Where:** Compiled path only. `trait IntLiteral` in the prelude, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:912-917`; the throw is in `FIntLiteral.asZZ64`, `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java:74-77`.
- **Reproduce:** No test. Write `a = 18446744073709551615` then `a < 5`, run compiled (throws) and under walk (prints `false`). An old probe `p37.fss` and its two outputs exist only in old commits ("in the parent of c69cb2064" / "of ab067d9b6"), so a worker must `git show <commit>^:<path>` to see them.
- **Status:** Open and confirmed: build a fix (compare without narrowing to `ZZ64`) and add the missing test, since "No test pins it".
- **Could not resolve:**
  - "carried as a decimal string": wording plus run-time concept; I infer `FIntLiteral` stores a numeral too big for a machine integer as a string, but the skill does not say so. Unclear but guessable.
  - "(F-118)": a FACTS entry; the skill says how to print it (`$T 'F-118'`) but the row gives no title words, so its content is unknown cold. Minor.
  - "full text: history, row 328": resolved via `records.md` (`explorations/fortress-gap-ledger-history.md`). Inconsistent capitalisation with "Full text" in row 440, harmless.

## Row 440

- **Defect:** Under walk, the rational 0/0 compared with itself answers `true` for `=`, `<=`, `>=` and `EqualTo` for `CMP`. The specification makes 0/0 unordered with itself: all five comparisons should be false and `CMP` should answer `Unordered`. (0/0 `<` 0/0 is already `false`.)
- **Where:** Walk only (the prelude has no `QQ`, so there is no compiled half). `QQ`'s `opr =` in `Library/FortressLibrary.fss:597-598`, which `<=`, `>=` (`:605`, `:607`) and `StandardPartialOrder`'s `CMP` (`:224-229`) build on; `MIN`, `MAX`, `MINMAX`, `MINNUM`, `MAXNUM` (`:610-619`, `:658-661`) also use `=` and are affected.
- **Reproduce:** Run the expected-failure test `ProjectFortress/tests/XXXRationalUnorderedRungP.fss` under walk.
- **Status:** Open and confirmed: build a fix in `QQ`'s `=`. The fix goes against the team's own comment at `:596` ("0/0 = 0/0 is supposed to be true"), which the row records but does not weigh; a worker may wonder whether this needs a decision first rather than a fix. The row's status says fix, so I read it as: fix, spec wins.
- **Could not resolve:**
  - "five comparisons": the claim lists `=`, `<=`, `>=` and `CMP`, plus `<` in the notes; which five (`=`, `<`, `<=`, `>`, `>=`?) is implied, not stated. Unclear wording, minor.
  - "gated by ... ComparisonAtNaNWalk.fss (F-319)": "gated" read as "already tested, must keep passing"; reasonable.
  - Whether the five min/max functions are part of this defect (to fix too) or just consequences: read as consequences that a fix of `=` changes. Two readings possible.

## Row 456

- **Defect:** Under walk, `LessThan CMP x` for a total comparison `x` always answers `GreaterThan`, and `GreaterThan CMP x` answers `LessThan`: the reverse of what their own `<` says (`LessThan < EqualTo` is `true` but `LessThan CMP EqualTo` is `GreaterThan`).
- **Where:** Walk's library, `Library/FortressLibrary.fss:187` and `:199`. The compiled prelude answers correctly (`CompilerBuiltin.fss:1551`, `:1571`).
- **Reproduce:** `ProjectFortress/tests/ExclusionRemainderRungH.fss:24-30` under walk. That test asserts today's wrong values, so it passes now.
- **Status:** Open and confirmed: build a fix (swap the two bodies) and update the five assertions in the test that encode today's values.
- **Could not resolve:**
  - "siblings: 457, 462": presumably related rows on the same comparison tables; the skill does not define "siblings", and row 457 is not in this file. Unclear wording, minor.
  - "a fix changes five of them": the cited lines are `:24-30` and `:55`; which five assertions is not said. Findable by reading the test.
  - The claim's "the converse" is wrong in a strict sense? `LessThan CMP EqualTo` should be `LessThan`; the body answers `GreaterThan` for every argument, including `LessThan CMP LessThan` (should be `EqualTo`). The row only speaks of "another total comparison", so whether the equal case is also wrong, and whether the fix is a swap or a three-way body, is left for the worker. Unclear scope.

## Row 462

- **Defect:** The two paths disagree on a total comparison against `Unordered`. Walk: `LessThan < Unordered` is `false`, `LessThan CMP Unordered` is `Unordered`. Compiled: `true` and `LessThan` (every total comparison ranks below `Unordered`).
- **Where:** Both, as a disagreement. Walk's `TotalComparison` in `Library/FortressLibrary.fss:167-168`; the prelude's `CMP` and `<` in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1530`, `:1537`.
- **Reproduce:** No reproducer cell. Walk's half is asserted by `ExclusionRemainderRungH.fss:45`, `:51`; the compiled half has no test, so write `LessThan < Unordered` and `LessThan CMP Unordered` and run compiled. Old probe `SkCmpTable.fss` is only in the parent of ab067d9b6.
- **Status:** Open and confirmed, but the row does not say which side is right. Specification "silent", class "library bug" with no area naming a side; by SKILL.md the compiled path moves onto walk's library at the switch-over, so walk's answer probably wins and the prelude's lines would be deleted anyway. A worker cannot tell whether to fix the prelude now, or leave it to the switch-over.
- **Could not resolve:**
  - Which answer is correct, and so what to build: missing from the row (not a concept gap).
  - "siblings": as in row 456.
  - "puts every total comparison below `Unordered`": clear.

## Row 484

- **Defect:** Under walk, an operator on an `NN32` value and a numeral (`u + 1`, `u MAX 1`, `u MAXNUM 1`) answers a `ZZ64` instead of the `NN32` that coercion resolution in the specification gives. Same for `NN64` with a numeral, which answers a `ZZ`.
- **Where:** Walk only. The cause: walk's numeral is a `ZZ32` value, and `ZZ64` declares coercions from both `ZZ32` and `NN32` (`Library/FortressLibrary.fss:821-822`), so `ZZ64`'s operator is the one both arguments fit.
- **Reproduce:** Run the expected-failure test `ProjectFortress/tests/XXXNumeralWithNN32.fss` under walk.
- **Status:** Open, but wait: the notes say "Open until walk's numeral switch (Q-walk, PLAN)", so a worker should not build a local fix; the change to how walk represents numerals is a planned question elsewhere. Leave it.
- **Could not resolve:**
  - "walk's numeral switch" and "Q-walk, PLAN": a planned change and a question label; neither the skill nor `records.md` defines a `Q-` numbering or what PLAN is, so a worker cannot look up what the switch is or who decides. Unclear wording / missing reference.
  - "so `ZZ64` with a numeral answers": reads as "a `ZZ64` operand with a numeral works correctly (answers `ZZ64`)", i.e. a contrast case; the sentence is truncated-looking and could be read as part of the defect. Two readings; minor.
  - "(F-74)", "(F-138)": FACTS entries cited by number without title words; printable with `$T`, so findable.
