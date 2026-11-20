# Quiz grading, round 1 (cases 21 and 38)

The answers: `quiz-answers-1.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 21 and 38, as climb batch 34's update reads them (on `main` at `b802d2e6fd`). The orientation graded: `orientation.md` in this folder. Each case is graded on its decision and scope, by the key's **Expected**, **Wrong** and **Partial** lists.

## Counts

- Right: 2 (cases 21 and 38).
- Right without its path or scope qualification: 0.
- Wrong: 0.
- Wrong and counted against the orientation: 0.

## Case 21: right

- The library pairs: valid, and the library changes nothing. The reader adds no `excludes` clause, no rename and no meet. That keeps `Vector` and `Matrix` in `AdditiveGroup` and keeps the scalar `+` and `-`. The reason is the key's: `self` is read as `AdditiveGroup[\T\]` met with `T` in the exclusion test (P-157), the parameter's bound is put in its place, and exclusion is read over the whole tuple (P-152). None of the key's **Wrong** answers for the pairs applies: the pairs are not called invalid, no type is taken out of the group, no operator is dropped, and no meet is added.
- Row 1094's new sentence did not mislead the reader. The key's **Skill** warns that a reader might reason from the orientation's new sentence on row 1094 to the pairs being invalid, or to the program being refused. This reader does neither, and cites the orientation's "With the reading of the exclusion test" sentence for the verdict.
- The reader's own program: it loads under walk and it compiles, on both paths, today. The walk test is a plain `tests/Name.fss`, not an `XXX` test, and the compiled test sits beside it. This is the key's **Expected**.
  - The reader keeps the trait self-typed directly and its `+` without static parameters of its own, the two cases where walk still refuses (row 999 in the orientation; F-318 in the key). The key says that a reader who names them is not wrong.
  - The reader plans an `XXX` walk test only for a form that falls into one of those two cases. So the question's shape is not written as an expected failure.
  - Row 804 is not called open.
- The spelling with `+`: the reader keeps `+` and puts `excludes { Number }` on the program's group trait. The reason given is the Meet Rule refusal at load against the library's array-and-number `+` (P-160, row 918). The reader also says why the clause is not `excludes { HasRank }`: the compiler's prelude has no array types. The key accepts this answer with its reason ("makes the program's traits exclude `Number`, and says why, is right"). `Number` is declared in the compiler's prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:96`), so the clause compiles before the switch-over.
- Scope: the reader places the library pairs on walk today, and on the compiled path at the count stage and the distance stage, and after the switch-over. Before the switch-over they do not exist on the compiled path, since the prelude has no arrays. The reader's program runs on both paths today, and its `excludes { Number }` keeps it valid after the switch-over. This is right, and more than the key requires.
  - Not graded: the extender point (row 893), which the key says the question's program does not need, and the traps that the program avoids (rows 650, 1037 and 573).
  - Not graded: the two-value `assert` at `ZZ32` on the compiled path, and the lookups through `facts-extract.sh`, each of which says what it is used for.

## Case 38: right

- (a): the reader's behaviour on each path is the key's.
  - Walk runs the program as written and prints `PASS`.
  - The compile refuses it. The checker reads `self` as the trait met with `Box` where an object redeclares a dotted method at the same parameter types, and so refuses the narrower `ZZ32` against `Number`.
  - The reader calls this the departure on record (row 1094), not a new defect and not a defect of the program, and plans no repair of the checker.
- (a), the test: the reader writes the form as written as a deferred defect, the key's second accepted form. It is `compiler_tests/XXXSelfTypedNarrowReturnCompiled.fss`, with `component XXXSelfTypedNarrowReturnCompiled`, and `XXXSelfTypedNarrowReturnCompiled.test`, with `tests=`, `compile` and `compile_err_contains=`.
  - The key word is to be copied from a reproducing compile. The key's **Partial** says this is right, since the orientation does not quote the message.
  - The reader first prints `ledger:1094` and says that if its reproducer already names such an `XXX` test, he cites it and adds none. The key says that citing the tree's `XXXSelfTypedMethodNarrowedReturn` and adding no second test is right.
  - Expected result: `Saw expected failure`. The check run, with `: Number` in `Box`, reports "Saw wrong failure", as `tests-writing.md:78` says.
- (a), scope: the switch-over changes nothing, because the refusal is the checker's and not the prelude's. A fix of the checker promotes the test. This is the key's **Scope**.
- (b): the reader writes the key's first form, word for word in substance.
  - The declarations are `getter size(): Number` in the trait and `getter size(): ZZ32 = n` in `Box`.
  - The lines of `run()` are `assert(Box(4).size, 4, "size of Box(4)")`, then `println("PASS")`.
  - It compiles and prints `PASS` on both paths today, and stays green at the switch-over.
  - The reader also rejects the key's **Wrong** form for (b), `size(): Number = n` with an `assert` on the `Number` result, for the key's reason: the compiler's library has the two-value `assert` only at `ZZ32`, `String` and `Character`. The reader names the `typecase` that the method form would need, which the key accepts as a second form.
  - The `.test` file is `link`, `run` and `run_out_WIcontains=PASS`. The tree's `SelfTypedGetterNarrowedReturn.test` adds `compile` and uses `run_out_contains`. Both are valid by `tests-writing.md`, "A test program": `link` compiles, then links, and `WIcontains` is a check that the skill lists, with this file's lines as its example. The difference is one of wording.
- Not graded:
  - The `junit.sh` command line, under a placeholder `climb-batch-N`.
  - The count `OK (3 tests)`.
  - The planned `git grep` of `compiler_tests/`.
  - None of these changes the decision.
