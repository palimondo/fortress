<!-- Quiz reader's answers to regression questions 28 and 39, from CLAUDE.md, the fortress-repo skill's core and area parts, and climb-batch-35b/orientation/orientation.md only. -->

# Quiz answers: cases 28 and 39

Abbreviations: "orientation" is `explorations/compile-ladder/climb-batch-35b/orientation/orientation.md`, and `$T` is `explorations/coordinator/tools/facts-extract.sh`.

## 28. `Point`, `Run` and a four-tuple compared with `assert`

### Decision

Under walk, the two-value `assert(x, y, msg)` calls a type's own `=` only if the type extends a `FortressLibrary` trait that declares `=`, such as `Equality` (row 807). Otherwise it compares by `SEQV`. Neither `Point` nor `Run` declares `=` or extends such a trait, so all three assertions compare by strict equivalence.

- **"point": passes.** `Point` is a value object, so it is equivalent field by field, and a `ZZ32` field is compared by its value: 1 with 1, 2 with 2. The result is `true`.
- **"run": fails.** `Run` is a value object, so it is compared field by field. Its `name` field holds a `String`, which is a reference object, equivalent only to itself. `s` is built at run time: `t || "c"` has a variable operand, so it does not fold into a literal. It is therefore a different object from the literal `"abc"`. Two literals of one text are one object (P-171), but `s` is not a literal. So `Run(s, 3) SEQV Run("abc", 3)` is `false`, the assertion throws, and the harness reports the test red.
  - **This is not a defect.** It is the rule (P-168). The orientation gives this exact case: "`V(s) = V(t)` is `false` where `s` and `t` are equal strings made by two computations". I record nothing.
  - **The check I keep** compares the parts. A string's `=` compares text:

        r = Run(s, 3)
        assert(r.name = "abc", "run name")
        assert(r.steps, 3, "run steps")

    The alternative is to give `Run` its own `opr =` and make it extend `Equality[\Run\]`, so that the two-value `assert` calls it (`tests-writing.md`). I would choose this only if several tests need `Run` equality. I would first read `Equality`'s declaration in `Library/FortressLibrary.fsi`, to follow its form.
- **"four": fails.** The interpreter's library declares `=` on pairs and triples only, so a four-tuple falls back to `SEQV`. `SEQV` compares a tuple element by element. Its fourth elements are the computed `s` and the literal `"abc"`, two distinct reference objects, so the result is `false` and the test is red.
  - **This is not a new defect.** The orientation states this behaviour and cites row 923 for it. A sentence that cites a row describes a known behaviour that is not settled yet: it is either a departure from a rule or a case that the rules do not decide. Either way, it can change. Before I wrote anything about it, I would print the row with `$T 'ledger:923'` to see which of the two it is. If it is a departure, the rule's answer belongs only in an `XXX` test. If it is undecided, a plain test of today's behaviour must cite the row. My test is not about tuple equality, so it should assert neither, and I add no ledger row.
  - **The check I keep** compares the one element that is computed, by `=`:

        assert(s = "abc", "four: text")

    The numerals 1, 2 and 3 are the same constants on both sides, so there is nothing to check in them. If the tuple's shape matters to the test, I would compare each element with `=`, not the whole tuple.

### Path and scope

- **Walk, today, with the interpreter's library.** By P-168, `SEQV` follows the specification on both paths once the compiled path uses that library, so after the switch-over the verdicts are the same compiled.
- **Before the switch-over, the compiled path could not take this test as written.** The compiler's library declares the two-value `assert` only for `ZZ32`, `String` and `Character`. It declares no `=` over `Any` and none on tuples. Its `===` compares strings by `=`, not by identity (row 908).

### Passages relied on

- Orientation, "Traits and objects", the bold rule "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)", with its bullets on value objects, tuples and reference objects, and the paragraph after them: computed strings, literals (P-171), and four-tuples (row 923).
- Orientation, "Numbers", the last paragraph: `||` of literals folds, and a test of run-time concatenation needs a variable operand, as `t || "c"`.
- Orientation, the opening section: what a sentence that cites a ledger row means for a test.
- `references/tests-writing.md`, "A test program": the two-value `assert` under walk and row 807, and "To compare by content, give the value object an `=` … make `P` extend `Equality[\P\]`, or write `assert(x = y, msg)`". Also "Where a test goes, and how it passes": a test that throws is red.

## 39. `≡` on a boolean and on a value object

### Decision

`≡` (IDENTICAL TO, written `EQV` or `EQUIV`) is not strict equivalence. It is logical equivalence on booleans. Strict equivalence is `≣`, written `SEQV` or `===` in ASCII. The interpreter's library declares `≡` and `≢` for booleans only, so on any other value each is a type error.

- **`assert(small ≡ true, "small")` passes under walk.** `small` is `p.x < 2`, which is `true`, and `true ≡ true` is `true`. The line works, but it is a roundabout way of writing `small`.
- **`assert(p ≡ q, "same point")` stops the run under walk.** No declaration of `≡` takes two `Pt` values. Walk has no static types, so it finds this type error only at run time, as a failed dispatch at that line. The run ends with an error, and the harness reports the test red.
  - This is not a defect of the tree: the test misreads the operator.
  - I would see the failure through `harness-one.sh` before I described it, and I would quote its message rather than guess it.
- **The program does not compile.** A type error stops the compile, and `p ≡ q` is one:
  - **Against the one library** (`FORTRESS_LIBRARY=one`, and the compiled path after the switch-over), `≡` exists only on booleans. The checker refuses `p ≡ q` and accepts `small ≡ true`.
  - **Against the compiler's prelude** (the default today), the orientation does not say whether `≡` is declared. I would look it up with `grep -n '≡\|EQV' ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi Library/CompilerLibrary.fsi Library/CompilerAlgebra.fsi`. If the prelude declares no `≡`, both lines are refused. If it declares `≡` on booleans, only `p ≡ q` is refused. Either way, the program does not compile.
- **The checks I keep:**

      assert(small, "small")
      assert(p SEQV q, "same point")

  `p SEQV q` can also be written `p === q` or `p ≣ q`. `Pt` is a value object without its own `=`, so it is strictly equivalent field by field, and `x` is the `ZZ32` 1 on both sides, so the result is `true`. Both checks hold on both paths:
  - The compiler's prelude declares `≣` as `===` over `Any`, and it follows `SEQV` (row 908 differs only on strings and numbers, and compares `ZZ32` by `=`, which also gives `true` here).
  - The `value` modifier adds `ValueObjectMark`, which the compiled `SEQV` reads.
  - The compiler's library has `assert(flag, msg)` for any `Boolean`.

  Two other forms work under walk only, so I do not choose them:
  - `assert(p, q, "same point")`: walk's two-value `assert` falls back to `SEQV`, but the compiler's prelude has that `assert` only for `ZZ32`, `String` and `Character`.
  - `assert(p = q, "same point")`: walk's `=` over `Any` answers `SEQV`, but the compiler's prelude has no `=` over `Any` until the switch-over.

### Path and scope

- **Walk, today:** the run behaviour above, with the first check passing and the second stopping the run.
- **Compiled path, before and after the switch-over:** the checker refuses the program.
- **The kept checks** hold on both paths, before and after the switch-over.

### Passages relied on

- Orientation, "Traits and objects", the bold rule "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)": the sentences that tell `≣` (`SEQV`, `===`) from `≡` (`EQV`, `EQUIV`), and "The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only, so on other values each is a type error". Also its bullet that a value object is equivalent field by field, and its last sentence on the compiler's library's `===` (row 908).
- `SKILL.md`, "How a program runs": "The tree has no static types, so walk finds a type error only at run time, as a failed dispatch", and, for `fortress compile`, "A type error stops the compile".
- `references/tests-writing.md`, "A test program": walk's two-value `assert` and `SEQV` (row 807), and the compiler's library declaring the two-value `assert` only for `ZZ32`, `String` and `Character`, while its `assert(flag, msg)` takes any `Boolean`.
- `references/compiler.md`, "What the code generator does": the `value` modifier adds `ValueObjectMark`, which the compiled `SEQV` reads.
- `references/compiler.md`, "Traps of the compiled path": the compiler's prelude, until the switch-over.
