<!-- Grading of quiz-answers-2.md (case 21) against explorations/coordinator/tools/orientation/regression/key.md, read on main at d7a03f34f, 2026-11-06. -->

# Quiz grading 2

Cases graded: 1 (case 21). Right: 1. Right without its path or scope qualification: 0. Wrong: 0.

## Case 21: the self type in the overloading check's exclusion test

**Grade: right.**

What matches the key:

- The pairs are a valid overloading, and the library changes nothing (`Library/FortressLibrary.fsi` unchanged, so no group membership is removed, no scalar operator is dropped and no meet is added: "nothing is needed to cover a meet"). The reader grounds the decision in P-157 (`self` read as `T[\X\]` ∩ `X` in the exclusion test) and the bound-meet clause of "Dispatch and overloading", with P-152's whole-tuple reading.
- The program of the reader's own is decided on both paths: it compiles (the checker accepts the shape) and it loads under walk, because walk reads `self` the same way in a program's own component (F-318). This is the key's Expected, not a guess.
- The scope point the key rests on is present: the operators' static parameter is bounded by the number trait (`E extends MyNum[\E\]`), and the array trait excludes it, so position 2 excludes with the parameter read at its bound. The reader names walk's two remaining refusals (self-typed only through another self-typed trait; static parameters of the operator's own) and keeps the program clear of both, which the key allows.
- Nothing on the key's Wrong list is asserted: the pairs are not called invalid, walk is not said to refuse the program, no `XXX` walk test is planned (the test is placed in both paths' tests as an ordinary test), and row 804 is not called open.
- The reader resolves the conflict between the orientation and `references/interpreter.md`, "What walk checks" (`:53`, row 804's refusal) in the right direction, and flags that line as stale.

Minor shortfalls, not graded on their own:

- The answer does not say in so many words that each call runs the declaration its arguments select on both paths; it says the program loads and compiles.
- The reader settled the conflict by taking the orientation as the newer part rather than by reading row 804's status in the ledger (`explorations/fortress-gap-ledger.md:414`, FIXED at `c41c3d2b0`), which would have confirmed it.

**Cause, and whether it counts against the orientation.** No failure. The orientation's passages carried the reader to the full answer. The stale area part foreseen by the key's Skill line, `.claude/skills/fortress-repo/references/interpreter.md:53`, is still present at `d7a03f34f` and is the same conflict that reader 1 left undecided (quiz-grade-1.md); it remains for PLAN's gather.1 of climb batch 26 to correct.
