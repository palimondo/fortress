<!-- The grading of quiz reader 1's answers (quiz-answers-1.md: questions 8 and 35) against the regression key, for climb batch 31's orientation. -->

# Quiz grade 1 (cases 8 and 35)

Compared `quiz-answers-1.md` with `explorations/coordinator/tools/orientation/regression/key.md`, read on 2026-11-17 (its update for climb batch 31's landing, run 1).

Counts: 2 right, 0 wrong, 0 right without its path or scope qualification. Nothing counts against the orientation.

| case | grade | against the orientation |
|---|---|---|
| 8 | right | no |
| 35 | right | no |

## Case 8: right

- The function is said to be wrong: the `for` loop is parallel, and `acc := acc + a[i]` with no `atomic` is a race, though the direct run printed the right sum.
- The direct run's one thread (`FORTRESS_THREADS=1` from the setup lines) and the suites' four (`harness-one.sh`, `junit.sh`, the suites) are both named, with "a passing run does not prove that there is none". So the key's Partial (no word on the threads) does not apply.
- The kept form is the key's reduction, `SUM[\RR64\][i <- a.indices()] a[i]`; the sequential loop over `seq(...)` and the `atomic` update are given as correct alternatives, the latter not chosen. No `+=` reduction variable.
- Scope, beyond what the key needs: the race holds on both paths, and before the switch-over the compiler's prelude has no array types, so the test is a walk test. The reader does not repeat `compiler.md`'s stale sentence that `atomic` cannot compile as an expression (the key's scope note).
- Wording, not graded: the reader writes `a.indices()`, where the key writes `a.indices` and `Library/FortressLibrary.fsi:1025` declares `getter indices()`. The reader says to check the spelling in the library before writing.

## Case 35: right

- (a) A plain compiled test that passes today, unchanged by the switch-over: as the key. The `.test` file is `tests=`, `link`, `run`, `run_out_contains=PASS`, without the key's `compile` line; that is the form of `tests-writing.md` (line 131) and of the tree's own `compiler_tests/SelfTypeReturnSelfRun.test`, so it is no fault.
- (b) As written: compiles and links, the run fails the JVM's verification when the class loads (row 1051), unchanged by the switch-over, since the wall is the code generator's. Recorded as the `XXX` run-time pair in the skill's form: `OrdLargerSelfArmCompiledLink.test` (`tests=XXX...`, `link`) and `XXXOrdLargerSelfArmCompiled.test` (`run`, `run_out_contains=REACHED`, no `link`), run in one call with the link file first, the run shown twice (expected failure, then red with the failing call removed). A passing form is given: `self` bound at the type first, `r: T = self`, and `r` in the arm, with the reader noting that the orientation says this is tested only at a listed type and running it before keeping it. The key counts that as right. The reader keeps `self` in the condition, `lt(other, self)`, where the key's run used the bound name there too; the original program's failure is at the return, so the call is not the shape of row 1051. Not a swapped-arms form (the key's Wrong).
- (c) As written: compiles and links, the run fails with `ClassCircularityError` at class load (row 1052), unchanged by the switch-over; the same `XXX` pair. The reader keys it `run_out_contains=REACHED` subject to one hand run, where the tree's pair uses `run_out_does_not_contain=REACHED`; the key does not grade the key choice. The reader's passing form, a program-local empty trait listed before `Ord[\Late\]` in `Late`'s `extends` clause, is not the key's (the trait's body moved into `Late`) and is measured by no run, but it is not the key's Wrong form (the trait's body kept and `keyOf` declared again), and the reader keeps it only if it passes. For (c), no passing form is no fault.
- The pair forms have their link files, no `link` in the `XXX` files, and no `run_out_contains=PASS` in them, so the key's Partial does not apply.

## On the orientation

No case failed. Case 35's three behaviours and its workaround caveat were taken from the orientation's "Traits and objects" paragraph (rows 1050 to 1052), as the key's Skill line says they must be, and read correctly. The orientation gives no workaround for row 1052; the reader filled that gap with an untested form of its own and made keeping it conditional on a run, which is the behaviour the gap calls for.
