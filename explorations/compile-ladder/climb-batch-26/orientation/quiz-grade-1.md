<!-- Grading of quiz-answers-1.md (case 21) against explorations/coordinator/tools/orientation/regression/key.md, read on main at d7a03f34f, 2026-11-06. -->

# Quiz grading 1

Cases graded: 1 (case 21). Right: 0. Right without its path or scope qualification: 1. Wrong: 0.

## Case 21: the self type in the overloading check's exclusion test

**Grade: right without its qualification (the key's Partial: "the program said to compile, with ... walk's loading only guessed").**

What matches the key:

- The pairs are called a valid overloading, and the library changes nothing (no edit of `Library/FortressLibrary.fsi`, none of the prelude, so `Vector` and `Matrix` stay in `AdditiveGroup`, the scalar `+` and `-` stay, no meet is added). The reader grounds it in P-157 (the self type read as an intersection in the exclusion test) and P-146.
- The program of the reader's own is said to compile, because the checker accepts the shape (P-157).
- The scope point the key rests on is present: the test's generic operators bound `T` by a number trait that the array trait excludes. The reader also names walk's two remaining refusals (self-typed only through another trait; static parameters of the operator's own) and avoids both, which the key allows.
- Nothing on the key's Wrong list is asserted outright: the pairs are not called invalid, row 804 is not called open, and the walk test is not planned as an `XXX` expected failure.

What falls short:

- On walk the reader does not decide. The answer sets the orientation's sentence (walk loads the pair in a program's own component, F-318) against `interpreter.md`, "What walk checks" (`:53`), which still states row 804's refusal, and leaves walk's verdict to a run. The key expects the decision that the program loads under walk and each call runs the declaration its arguments select, with a walk test that is a plain passing test (`tests/ExclusionVectorScalarWalk.fss`). The answer also keeps open "if the run shows that refusal, row 804 is a departure", although the reader planned to look up row 804 with the `records.md` queries; the ledger (`explorations/fortress-gap-ledger.md:414`) shows it FIXED at `c41c3d2b0`, which would have settled the conflict without the run.
- The test plan asserts values but does not say that each call is to run the declaration that its arguments select on both paths; minor, and not graded on its own.

**Cause, and whether it counts against the orientation.** It does not count against the orientation. The orientation's passage the reader quotes is correct and matches the key. The reader was misled by a stale area part: `.claude/skills/fortress-repo/references/interpreter.md:53` still says walk refuses this shape in a program's own component (row 804), as the key's Skill line foresees ("a reader misled there fails the case against that area part, not against the orientation"; PLAN's gather.1 of climb batch 26 assigns its correction). Fixing that line, and the reader's own step of reading row 804's status in the ledger, would have given the full answer.
