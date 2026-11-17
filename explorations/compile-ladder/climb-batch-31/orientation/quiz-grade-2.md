<!-- The grading of quiz reader 2's answers (quiz-answers-2.md: questions 8 and 35) against the regression key, for climb batch 31's orientation after the writer's fix round. -->

# Quiz grade 2 (cases 8 and 35)

Compared `quiz-answers-2.md` with `explorations/coordinator/tools/orientation/regression/key.md`, read on 2026-11-17 (its update for climb batch 31's landing, run 1). The reader read the orientation as revised by the fix round (`orientation.md`, written after `quiz-grade-1.md`).

Counts: 2 right, 0 wrong, 0 right without its path or scope qualification. Nothing counts against the orientation.

| case | grade | against the orientation |
|---|---|---|
| 8 | right | no |
| 35 | right | no |

## Case 8: right

- The function is said to be wrong: the `for` loop is parallel, and `acc := acc + a[i]` with no `atomic` is a race; the direct run's right sum proves nothing.
- Threads: the direct run had one (`FORTRESS_THREADS=1` from the setup lines), and the suites and `harness-one.sh` force four, so the race can show there, on some runs only ("flaky"). The key's Partial (no word on the threads) does not apply. The reader adds, from `tests-writing.md:141`, that under walk a parallel range of sixteen elements or fewer runs in index order, so a short test array passes regardless; that is consistent with the key and sharpens it.
- The kept form is the key's reduction, `SUM[\RR64\][i <- a.indices()] a[i]`. The sequential loop over `seq(...)` and the `atomic` update are given as race-free alternatives; the latter is declined for its run-to-run order of float additions, which does not contradict the key's "correct but slower". No `+=` reduction variable.
- Scope, beyond what the key needs: the race holds on both paths, and before the switch-over the compiler's prelude has no array types, so the test is a walk test. The reader does not repeat `compiler.md`'s stale sentence that `atomic` cannot compile as an expression (the key's scope note).
- Not graded: `a.indices()` where the library declares `getter indices()` (the reader says it would check the spelling first); the test's `asFloat(i)` in a function expression typed `RR64`, explained by the orientation's sentence that walk does not convert at a declared return type (row 387), which is the orientation's rule read correctly; the test's 40 values sum exactly in any order.

## Case 35: right

- (a) A plain compiled test that passes today, unchanged by the switch-over: as the key. The `.test` file is `tests=`, `link`, `run`, `run_out_WIcontains=PASS`, without the key's `compile` line. That is the form of `tests-writing.md:131` (with the whitespace-collapsing check that `tests-writing.md:62` and `:69` give and `FileTests.java:155` reads), so it is no fault.
- (b) As written: compiles and links, the run fails the JVM's verification when the class loads (row 1051), unchanged by the switch-over, since the wall is in the generated classes. Recorded as the `XXX` run-time pair in the skill's form: `SelfTypedLargerCompiledLink.test` (`tests=XXX...`, `link`) and `XXXSelfTypedLargerCompiled.test` (`run`, `run_out_contains=REACHED`, no `link`), run in one `junit.sh` call with the link file first, and the run-twice check (expected failure, then red with the conditional removed). The passing form is the key's, `s: T = self`, then `if lt(other, s) then s else other end`, kept as a plain test beside the pair, with the reader noting that the orientation says it has run only under a `comprises` clause and running it before keeping it. The key counts that as right. Not a swapped-arms form (the key's Wrong). The reader also hedges that row 1052 "may apply as well", since the body calls `lt` on `other: T`; the key's runs show it does not (the bound form, with the same call, passes), but the reader's expected result is the `VerifyError` and the hedge is settled by its own run, so it is no fault.
- (c) As written: compiles and links, the run fails with `ClassCircularityError` at class load (row 1052), unchanged by the switch-over; the same `XXX` pair. The reader keys it `run_out_contains=REACHED` subject to one hand run, where the tree's pair uses `run_out_does_not_contain=REACHED`; the key does not grade the key choice. The reader rejects the orientation's "declare the method in the object" as a plain test, since it would no longer test the trait's default body, and offers an untried form (another trait listed before `Ord[\Late\]`), kept only if a run gives 2. Neither is the key's Wrong form (the trait's body kept and `keyOf` declared again in `Late`, kept as a passing test). For (c), no passing form is no fault.
- The pair forms have their link files, no `link` in the `XXX` files, and no `run_out_contains=PASS` in them, so the key's Partial does not apply.

## On the orientation

No case failed. Two observations on the revised "Traits and objects" paragraph, neither counted, since neither changed a decision here:

- Its sentence "For the third shape, declare the method in the object" (`orientation.md:47`) does not say that the trait's default body must go. The key's run shows that declaring `keyOf` again in `Late` with the trait's body kept still dies, `ClassCircularityError` (the key's Wrong for (c)). This reader wrote "That gives 2" for the form without saying whether the trait's body stays, and avoided the trap only because it declined the form for another reason. A reader who keeps the form as a plain test would fail (c) on this passage.
- The bullet on row 1052, "a default body that calls a method on a value of type `X`" (`orientation.md:45`), does not say whether a functional-method call such as `lt(other, self)` counts, which left this reader unsure whether (b) is also the third shape. The key's runs say it is not.
