# Quiz grading, round 2 (cases 21 and 38)

The answers: `quiz-answers-2.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 21 and 38, as climb batch 34's update reads them (working tree on `main` at `b802d2e6fd`). The orientation graded: `orientation.md` in this folder, after the writer's fix round (`writer-2.log`). Each case is graded on its decision and scope, by the key's **Expected**, **Scope**, **Wrong** and **Partial** lists.

## Counts

- Right: 2 (cases 21 and 38).
- Right without its path or scope qualification: 0.
- Wrong: 0.
- Wrong and counted against the orientation: 0.

## Case 21: right

- The library's pairs: valid, and the library changes nothing. The reader keeps the generic `+` and `-` with the number on either side beside the `+` and `-` that `Vector` and `Matrix` inherit from `AdditiveGroup`, and adds no `excludes` clause and no cover. So `Vector` and `Matrix` stay in the group, the scalar operators stay, and no meet is added.
  - The reason is the key's. `self` is read as the trait met with `X` in the exclusion test (P-157). A whole-parameter static parameter is read at the meet of its bounds (P-157). Exclusion is read over the whole tuple (P-152). A value of both domains forces `X` to the array's instance, and the other position then excludes.
  - None of the key's **Wrong** answers for the pairs applies.
- Row 1094's sentence did not mislead the reader. This is the risk that the key's **Skill** names for this update. The reader cites the orientation's "With the reading of the exclusion test" sentence for the verdict. He does not reason from the Return Type departure to the pairs or to his program.
- The reader's own program: it loads under walk and it compiles, today. This is the key's **Expected**.
  - The gated walk test is a plain `ProjectFortress/tests/<Name>.fss`, not an `XXX` test, and a compiled copy sits beside it.
  - The reader keeps the trait self-typed by its own bound and its `+` without static parameters of its own. Those are walk's two remaining refusals (row 999 in the orientation; F-318 in the key). The key says that naming them is not wrong. The reader plans an `XXX` walk test only for those two shapes, which the question's shape is not.
  - Row 804 is not called open.
- The spelling with `+`: the reader keeps `+`, and declares both the group trait and the number trait `excludes { Number }`. The reason given is walk's Meet Rule refusal at load against the library's generic `+` between an array and a number (P-160), and the checker's acceptance of that overlap (row 918). He also names the orientation's other fixes, `excludes { HasRank }` and the `+` in an object. The key's **Scope** accepts a reader who "makes the program's traits exclude `Number`, and says why".
- Scope: right, and more than the key requires.
  - The library's pairs: valid for the checker, at the count stage today and on the compiled path after the switch-over; walk loads them today.
  - The program: walk loads it today. It compiles today against the compiler's prelude, which has no array types, and the switch-over does not change that.
- Not graded: the lookups through `facts-extract.sh` and the count stage, each of which says what it is for; the two-value `assert` at `ZZ32` in the compiled copy; the shape's body (`Vec`'s `+`, the `run()` asserts).

## Case 38: right

- (a), behaviour: the key's on each path.
  - Walk loads and runs the program as written and prints `PASS`. The reader notes that `Box` redeclares `size()` without `override`.
  - The compile refuses `Box`'s `size(): ZZ32`. The checker reads `self` as the intersection, `Box`'s own type, where an object redeclares an abstract dotted method of a self-typed trait at the same parameter types. It then checks each return type against the other, and `Number` is not a subtype of `ZZ32`.
  - The reader calls this the checker's departure on record (row 1094). He does not call it a new defect or a defect of his program, and he plans no repair of the checker.
- (a), the tests: the reader gives both of the key's accepted forms.
  - The passing form: the getter pair, `getter size(): Number` in the trait and `getter size(): ZZ32 = n` in `Box`, in `compiler_tests/MeasuredGetterCompiled.fss`, with `run()` printing `PASS`.
    - The `.test` file holds `tests=`, `link`, `run` and `run_out_WIcontains=PASS`. The key's example adds `compile` and uses `run_out_contains`. Both are valid by `tests-writing.md`: `link` compiles, then links, and `WIcontains` is a listed check, with these lines as its example.
    - He names the other passing form, `size(): Number = n`, and says why he takes the getters.
    - Expected: green through `junit.sh`. This is the key's.
  - The form as written, as a deferred defect: `compiler_tests/XXXMeasuredNarrowReturn.fss` and `.test`, with `tests=`, `compile` and `compile_err_contains=`.
    - The text is to be copied from a direct compile. The key's **Partial** calls that right, since the orientation does not quote the message.
    - The reader first prints `ledger:1094`, and adds no test if the row already names one. The key calls citing the tree's `XXXSelfTypedMethodNarrowedReturn` and adding no second one right.
    - Expected: "Saw expected failure". The check run, with `size(): Number = n`, gives "Saw wrong failure", as `tests-writing.md:78` says.
- (a), scope: the refusal is the checker's, not the prelude's, so the switch-over does not end it. This is the key's **Scope**.
- (b): the key's first form.
  - The declarations are the getter pair.
  - The lines of `run()` are `assert(Box(4).size, 4, "size of Box(4)")`, then `println("PASS")`.
  - Walk runs it and passes. It compiles, links, runs and prints `PASS` on the compiled path today, because the getter has the static type `ZZ32`, which the prelude's two-value `assert` takes.
  - The reader rejects the key's **Wrong** forms for (b): the narrowed dotted method, refused by row 1094, and `size(): Number = n` with a two-value `assert`, since no such `assert` takes a `Number` (`tests-writing.md:32`).
- One side claim is too strong, and is not graded. In "Why not the dotted form", the reader says that with `size(): Number` "nothing compiled can compare the size with 4". The key's second accepted form for (b) does so: a `typecase` that narrows the value to `ZZ32` before the `assert` compiles and prints `PASS` on both paths. That rests on the key's own run, not on the record. The claim is the reader's reason against an alternative that he does not take, and his decision is right. No passage misled him: the orientation's sentences that he cites (`Number` declares nothing, P-165; the compiler's library has no `=` over `Any` until the switch-over) are true, and they do not mention narrowing by `typecase`.
- Not graded:
  - The `junit.sh` command line, under a placeholder `climb-batch-N`.
  - The planned `git grep` of `compiler_tests/`.
  - The two test files of the getter pair, one for (a) that prints `PASS` and one for (b) that asserts. The question asks for two tests.
