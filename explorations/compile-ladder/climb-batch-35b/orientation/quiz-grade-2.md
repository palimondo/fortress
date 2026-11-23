# Quiz grading, round 2 (cases 28 and 39)

The answers: `quiz-answers-2.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 28 and 39, as climb batch 35b's update reads them (the working tree on `main` at `ddfa65d880`, with the update not yet committed). The orientation graded: `orientation.md` in this folder, after the writer's fix round. Each case is graded on its decision and scope, by the key's **Expected**, **Scope**, **Wrong** and **Partial** lists.

## Counts

- Right: 2 (cases 28 and 39).
- Right without its path or scope qualification: 0.
- Wrong: 0.
- Wrong and counted against the orientation: 0.

No side claim is false. Round 1's false claim in case 39, that the prelude's `===` covers only strings and four number types, does not recur. The orientation's sentence now says "declared as `===` over `Any`" (`orientation.md:64`), and this reader states the prelude's `≣` over `Any` correctly.

## Case 28: right

- The three verdicts match the key:
  - `Point` passes. It declares no `=`, so the two-value `assert` compares by `SEQV`, field by field, and the `ZZ32` fields compare by value.
  - `Run` fails, and the reader says this is the rule, not a defect (P-168). `s` is joined at run time from the variable `t`, so it does not fold (P-171 and "Numbers"). It is a different string object from the literal `"abc"`, and a string is `SEQV` only to itself. The reader records nothing.
  - The 4-tuple fails. The interpreter's library declares `=` on pairs and triples only, so the 4-tuple falls back to `SEQV`, and the computed `s` is not `SEQV` `"abc"`. The reader calls this "not a new defect", adds no ledger row, and does not change `SEQV` or `=`.
- The kept checks are right:
  - For `Run`, the reader compares the parts: `assert(r.name = "abc", ...)` and `assert(r.steps, 3, ...)`. The key gives `assert(r.name, "abc", ...)`. The reader's Boolean form reaches `String`'s `=` as well.
  - As the alternative, the reader gives `Run` its own `opr =` and makes it extend `Equality[\Run\]`. This is the full form the key asks for, so **Partial**'s "an own `=` alone" does not apply.
  - For the 4-tuple, the reader keeps `assert(s = "abc", ...)` and says that the constant elements 1, 2 and 3 need no check. If the tuple's shape matters, the reader would compare each element by `=`. This is the key's "the string compared alone and the rest as a triple", with the constant triple left out. It is a remedy, so **Partial**'s "no remedy for the 4-tuple" does not apply.
- Scope matches the key's **Scope**:
  - The program is a walk test.
  - Before the switch-over, the compiled path cannot take it. The compiler's library declares the two-value `assert` only for `ZZ32`, `String` and `Character`, and has no `=` over `Any` or on tuples. Its `===` compares strings by `=` (row 908).
  - After the switch-over, the verdicts are the same when compiled. The reader's wording "`SEQV` follows the specification on both paths once the compiled path uses that library" is narrower than the orientation's "on both paths". But it is not false: before the switch-over, the program does not compile, so there is no compiled verdict.
- None of the key's **Wrong** answers appears:
  - The reader does not take `s` as folded into the literal.
  - The reader does not say that `Point` fails by identity, and quotes `tests-writing.md`'s current "Otherwise they compare by `SEQV`".
  - The reader reports no defect and files no row.
- Not graded: the reader's hedge on row 923.
  - The reader applies the orientation's opening rule (`orientation.md:7`): a sentence that cites a row states a behaviour that is not settled, either a departure from a rule or a case that the rules do not decide. So the reader plans to print row 923 with `facts-extract.sh` before writing about it, and to put any rule's answer only in an `XXX` test.
  - The key calls row 923 "a design limit of the library, on record", which is no defect of walk.
  - The reader's test asserts no tuple equality, so the hedge changes neither the verdict nor the kept check.
  - For a later update, the orientation's row-923 sentence could say that the limit is the library's design. Then a reader would not need to ask whether it is a departure.

## Case 39: right

- The boolean check: it passes under walk. `≡` is logical equivalence on booleans, which the interpreter's library declares for booleans only, and `true ≡ true` is `true`. This is the key's answer. The reader does not say that walk stops on it, and does not require `<->`, so the reader avoids default (2).
- The point check is the key's answer:
  - No `≡` takes two `Pt` values. Walk finds this only at run time, as a failed dispatch at that line, and the run stops there. The test is red.
  - The reader calls it no defect of the tree: "the test misreads the operator". The reader files no row and declares no own `opr ≡` over `Pt`.
  - The reader plans one `harness-one.sh` run to quote the message, and makes no claim about its wording.
- The compile is the key's answer: the program does not compile.
  - Against the one library, the checker refuses `p ≡ q` and accepts `small ≡ true`.
  - Against the compiler's prelude, the reader says that the orientation does not say whether `≡` is declared. The reader names a grep of `CompilerBuiltin.fsi`, `CompilerLibrary.fsi` and `CompilerAlgebra.fsi`, and says what follows from each result. If the prelude declares no `≡`, both checks are refused. If it declares `≡` on booleans, only the point check is refused. Either way, the program does not compile.
  - The key's run gives the second result: `opr EQV(self, other:Boolean)` at `CompilerBuiltin.fsi:466`, which the named grep finds. **Partial** accepts a look-up of the prelude provided the reader says that the point check is refused, and the reader says so.
  - Not graded: the reader's two branches leave out a third, a prelude `≡` over `Any`. That is the form of the prelude's `≢` (`CompilerLibrary.fsi:31`, row 1119). The grep would rule it out for `≡`, and the key needs none of row 1119.
- The kept checks match the key:
  - The reader keeps `assert(small, "small")` and `assert(p SEQV q, "same point")`, and notes `===` and `≣` as other spellings.
  - The reader says these hold on both paths, before and after the switch-over. The key's runs confirm this: `SEQV`, `===` and `≣` on two `Pt` values compile and print `PASS` before the switch-over.
  - The reader rejects `assert(p = q, ...)` and `assert(p, q, ...)` because they work only under walk. Before the switch-over, the prelude has no `=` over `Any`, and its two-value `assert` does not take `Pt`. This matches the key's **Scope**, which accepts both forms under walk and has the compile refuse `p = q`.
- Scope: walk today, with the boolean check passing and the point check stopping the run; the compiled path, before and after the switch-over, refusing the program; the kept checks on both paths. This is the qualification that the case needs.
- None of the key's **Wrong** answers appears.
- Not graded: the reader's remark that `small ≡ true` is a roundabout `small`, and the citation of `compiler.md`'s `ValueObjectMark` sentence.

## Failed cases

None.
