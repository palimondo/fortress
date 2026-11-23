# Quiz grading, round 1 (cases 28 and 39)

The answers: `quiz-answers-1.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 28 and 39, as climb batch 35b's update reads them (the working tree on `main` at `ddfa65d880`, with the update not yet committed). The orientation graded: `orientation.md` in this folder. Each case is graded on its decision and scope, by the key's **Expected**, **Wrong** and **Partial** lists.

## Counts

- Right: 2 (cases 28 and 39).
- Right without its path or scope qualification: 0.
- Wrong: 0.
- Wrong and counted against the orientation: 0.

Two side claims are false, one in each case. Neither is in the key's **Wrong** list, and neither changes a verdict or a kept check, so neither changes a grade. The one in case 39 follows from a sentence of the orientation, so it is reported below for the orientation's next update.

## Case 28: right

- The three verdicts are the key's:
  - `Point` passes. With no `=` of its own, the comparison is `SEQV`, field by field, and the integers compare by value.
  - `Run` fails. `s` is joined at run time from the variable `t`, so it is a different string object from the literal `"abc"`, and a string is `SEQV` only to itself. The reader calls this the rule (P-168), not a defect.
  - The 4-tuple fails. The interpreter's library declares `=` on pairs and triples only, so the 4-tuple compares by `SEQV`, and `s` is not `SEQV` `"abc"`. The reader calls this a known limit on record (row 923), not a new defect, and files no row.
- The reader avoids the fold trap. The reader says that with `s` spelled `"ab" || "c"` the two literals fold into one object (P-171) and both assertions would pass, and that this is why the question uses a variable. The key accepts this.
- The kept checks are right:
  - For `Run`, the parts are compared by `String`'s and `ZZ32`'s `=`, as `assert(r.name = "abc", ...)` and `assert(r.steps = 3, ...)`. The key gives `assert(r.name, "abc", ...)`. The reader's Boolean form reaches `String`'s `=` as well.
  - As the alternative, the reader gives `Run` its own `=` and makes it extend `Equality[\Run\]`. This is the full form that the key's **Partial** asks for, not an own `=` alone.
  - For the 4-tuple, each element is compared alone after a destructuring bind. This is a finer form of the key's "the string compared alone and the rest as a triple". It is a remedy, so **Partial**'s "no remedy for the 4-tuple" does not apply.
- Scope: a walk test. Before the switch-over, the compiler's library declares the two-value `assert` only at `ZZ32`, `String` and `Character`, and no `=` over `Any` or on tuples. This matches the key's **Scope**.
- The key's **Wrong** answers are absent. The reader does not say that `Point` fails by identity. The key's warning about `tests-writing.md:32` does not apply: the line now reads "Otherwise they compare by `SEQV`", and the reader quotes it.
- A false side claim: "Even a pair or a triple, under the two-value `assert`, goes through the row-807 path, because a tuple extends no `Equality`. To reach the pair or triple `=`, I would write `assert(x = y, msg)`."
  - The pair and triple `=` are top-level declarations of `FortressLibrary` (`Library/FortressLibrary.fss:4931`, `:4987`). The three-argument `assert` reaches them through `=/=`.
  - The key's **Evidence** gives climb batch 29's run: the triple `(1, 2, s)` against `(1, 2, "abc")` passed.
  - This is why the key's second keep for the 4-tuple, "the tuple nested into pairs or triples", works under the three-argument `assert`.
  - Cause: the reader extends `tests-writing.md`'s sentence on a type's own `=` (row 807) to the `=` that the library declares for tuples. The orientation does not say this. Its sentence "The interpreter's library declares `=` on pairs and triples only" implies the opposite.
  - The claim does not affect a verdict or a kept check, and the key does not require the point.
- Not graded:
  - The plan to print row 923 before writing about it.
  - The expectation that the run stops at the first failing assertion.
  - The remark that `SEQV` keeps these answers after the switch-over.

## Case 39: right

- The boolean check: it passes under walk, because `≡` is logical equivalence on two booleans and `true ≡ true` is `true`. This is the key's answer. The reader does not say that walk stops on it, and does not require `<->`. So the reader does not fall into default (2), the orientation's text before this update (row 184, now fixed).
  - The reader calls the pass "by luck", meaning that the writer's misreading happens to give the right answer on booleans. This is a remark on intent, not a wrong verdict.
- The point check is the key's answer:
  - No `≡` takes two `Pt` values, so walk finds this only when the call runs, as a failed dispatch, and the run stops there. The key's message is 'Unification error: Closure/Constructor for EQV param 1 (a:Boolean) got arg Pt of type Pt'. The reader plans one `harness-one.sh` run to quote the exact message, and claims no wording.
  - It is "no defect … by design": no new row, no change to walk.
  - The reader does not declare an own `opr ≡` over `Pt`, which would keep the misreading.
- The compile is the key's answer. The program does not compile: the checker finds no applicable declaration at `(Pt, Pt)`, and the type error stops the compile. The reader says this against the one library, since `≡` is declared for booleans only, and against the prelude. For the prelude, the reader plans a grep of `CompilerBuiltin.fsi`, `CompilerLibrary.fsi` and `CompilerAlgebra.fsi` first, and gives no claim beyond what that grep would show. This is more than **Partial** asks: the point check is said to be refused on both.
- The kept checks are the key's: `assert(small, "small")` and `assert(p SEQV q, "same point")`.
  - The reader adds that `≣` and `===` spell the same operator.
  - Under walk, `assert(p = q, ...)` and `assert(p, q, ...)` would give the same answer, because `Pt` has no `=`. The key accepts both.
  - Both kept checks pass under walk (this key's run).
- Scope: a walk test in `ProjectFortress/tests/`, and the program refused on the compiled path. This is the qualification the case needs.
- A false side claim on the compiled path: "My kept version also does not suit the compiled path before the switch-over. The compiler's `===` is declared to compare strings and `ZZ32`, `ZZ64`, `RR32` and `RR64` by `=` (row 908), not a program's own value object."
  - The key's **Scope** and its runs on `ddfa65d880` show that the kept `SEQV`, `===` or `≣` on two `Pt` values compiles and prints `PASS` before the switch-over.
  - `Library/CompilerLibrary.fsi:30` declares `opr ===(a:Any, b:Any):Boolean`.
  - The reader's framing "After the switch-over, `SEQV` follows the specification on both paths" is wrong in the same way. The orientation says that `SEQV` follows it on both paths now.
  - The reader hedges: "I would confirm with the grep above before saying so in a report". But the grep named, `'EQV\|≡'`, matches `NEQV` and not `===`, so it would not have settled the point.
  - The key says "None of these points is needed for a right answer", so the grade stands.
- Cause of the side claim: an orientation passage. The last sentence of the `SEQV` rule (`orientation.md:64`) reads: "Its own `≣`, declared as `===`, compares strings and `ZZ32`, `ZZ64`, `RR32` and `RR64` by `=`, not by bits or identity (row 908)."
  - It lists types without saying that the declaration is over `Any`, or what it does at other types. The reader took the list as the declaration's domain.
  - The rule's opening, "`SEQV` follows the specification on both paths", says otherwise. The reader read the row-908 sentence as narrowing it.
  - This does not count against the orientation, because the case is right. For the next update: say that the prelude's `===` is declared over `Any`, and that a value object compiles to field by field.
- Not graded: the reader's preference for ASCII `SEQV` over the glyph, and the citation of `compiler.md`'s `ValueObjectMark` sentence.

## Failed cases

None.
