<!-- Grading of quiz-answers-1.md (cases 5, 12, 16, 21, 26, 27, 28, 29) against explorations/coordinator/tools/orientation/regression/key.md, read on main at 0549157f4, 2026-11-07. -->

# Quiz grading 1

Cases graded: 8 (5, 12, 16, 21, 26, 27, 28, 29). Right: 7. Right without its path or scope qualification: 0. Wrong: 1 (case 28), and it counts against the orientation.

## Case 5: a `long` into a `double`

**Grade: right.**

- The line is the key's: `seconds: RR64 = asFloat(elapsed) / 1.0E9`, with `1000000000.0` allowed.
- Both wrong forms are named and refused, each for the key's reason: `elapsed / 1000000000` (a `QQ`) and `elapsed / 1.0E9` (no implicit `ZZ64` into `RR64`).
- The `ZZ32` case is answered: `asFloat` still works because each type declares its own (P-165), and plain `elapsed / 1.0E9` works too because `ZZ32` converts implicitly.
- The `(1.0 elapsed)` form, on the key's Wrong list, is not used.
- The compiled-path note (no `QQ`; `/` only at `RR64`; the reader would check the prelude for a `ZZ64` `asFloat`) goes beyond what the key requires. It points the right way: the prelude declares no such conversion.

## Case 12: a user type for `SUM`

**Grade: right.**

- `Money` extends `AdditiveGroup[\Money\]`, at the type itself, for the key's reason (the self-typed algebra's extender rule).
- It declares `opr +`. For the rest the reader names where to look (`Library/FortressLibrary.fsi`) and what it expects to find (`zero`, the `-` operators).
- The sum is written `SUM[\Money\][j <- 0#n] fee(j)`, with the static argument.
- The empty sum is said to end in `CastError` under walk (row 436), not to give `zero`. The reader keeps the specification's `zero` apart from today's result and says not to assert the result as correct.
- Scope: the prelude's reductions give only `ZZ32` or `String` before the switch-over. The reader also says why P-160 does not reach `Money` (an object excludes the arrays and `Number`), which is the key's own note.
- It writes no `excludes` clause on the object and no `Monoid[\T, ⊕\]`.
- The advice to make `Money` a `value object`, or give it `Equality`, is extra and agrees with P-168.

## Case 16: a numeral at an `NN32` binding

**Grade: right.**

- Under walk the binding is refused (row 454); write `unsigned(3)`.
- On the compiled path `n: NN32 = 3` works by P-76, with a compile proposed to confirm it.
- Both paths are answered, and neither answer is on the key's Wrong list.

## Case 21: the self type in the overloading check's exclusion test

**Grade: right.**

- The library's pairs are a valid overloading and the library changes nothing, by P-157 (`self` read as `AdditiveGroup[\X\] & X` in the exclusion test, with the bounds' meet). The count stage is named as the confirmation.
- The reader's own program loads under walk and compiles. The reader names walk's two remaining refusals and designs the trait clear of both, as the key allows.
- The reader also sees the spelling issue that the key leaves **Open**: a `+` spelled as the library's meets the library's `+` between an array and a number unless the program's number trait excludes `Number` (P-160). The key accepts this answer.
- Nothing on the Wrong list appears: no `XXX` walk test, no refusal at load claimed for the directly self-typed shape, and row 804 not called open.
- The cold-cache run (row 342) and the extender rule (row 893) are correct additions.
- The aside on a body that returns `self` (row 695) restates the orientation. It is harmless: the reader keeps no such body.

## Case 26: numbers of two types compared, and a float from generic code over `Number`

**Grade: right.**

- (a) The condition is `asFloat(count) = limit`. `count = limit` gives `false` with no error, because `=` falls to `SEQV` across types.
  - For `ZZ32`, plain `=` compares by value.
  - For `QQ`, plain `=` is `false` (`1/2 = 0.5`), so `asFloat` is needed.
  - All three sub-answers are the key's.
- (b) The reader refuses `asFloat(a)` over `T extends Number`. The reason is the key's: `Number` declares nothing; walk would run it, but the count stage counts the error.
  - The answer declares `near` at each of the eight number types, each through its own `asFloat`, with headers in the api. The key lists this as one of the two right forms.
  - No `asFloat` is put back on `Number`, and no new trait is added.
- Scope: (a) is placed on walk, with the checker's static choice of coercion; (b) holds on both. The prelude point (no `asFloat` before the switch-over) is missing. The key does not require it.

## Case 27: a program's trait with its own `+`, beside the library's `+` between an array and a number

**Grade: right.**

- Under walk the program is refused at load with "fails the Meet Rule", because `Number` is open and `excludes { String }` does not help (P-160).
- The checker's acceptance across the import is named as row 918's gap and refused as proof.
- The change is `excludes { String, Number }`, or excluding the arrays. After it the assertion passes.
- The warm-cache point matches the key's **Open**: a run that loads proves nothing, so run it cold through `harness-one.sh`.
- The aside on `big`, a functional-method name of the library, is a needless hedge. The reader correctly expects no refusal for a getter: the measured `tests/NumberOpenTraitPlusBesideArrayWalk.fss:7` declares the same `getter big()`.

## Case 28: `=` on value objects and long tuples that hold strings

**Grade: wrong.**

What matches the key:

- `Point` passes, by `SEQV` field by field.
- `Run` fails, and the reader calls it the rule, not a defect. The kept checks are right: the parts compared, or an own `=` with `Equality[\Run\]`.
- The 4-tuple fails, and the kept check (the triple compared and the string compared alone) is the key's.

What fails, from the key's Wrong list ("either failure reported as a defect of walk or of the library"):

- The reader calls the 4-tuple's failure "a known defect: the library declares `=` on pairs and triples only (row 923)".
- It says "Do not assert today's `false` as correct".
- It proposes an `XXX` test, if row 923 has none, that expects the opposite of the rule.

The key, and row 923 itself, class this as a design limit of the library (`explorations/fortress-gap-ledger.md:429`, "design limit (library)"). Its test, `tests/StrictEquivalenceRuleWalk.fss`, asserts the 4-tuple `false` as the rule's answer.

**Cause: an orientation passage misled the reader.** Two sentences combine, and the reader quotes both:

- The introduction, third paragraph: "A sentence that cites a ledger row states a known departure of one path from a bold rule. A fix can change it, so do not assert it as correct in a test."
- "Traits and objects", the rule "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)": "Nor is a tuple of four or more elements, because the library declares `=` on pairs and triples only (row 923)."

Row 923 is not a departure of a path from the bold rule. It follows from the rule and the library's design. Under the introduction's convention, citing it marks the 4-tuple's `false` as a departure.

Fix in the orientation, either way:

- say in the `SEQV` paragraph that row 923 is a design limit of the library, and that the 4-tuple's `false` is the rule's answer, to assert as correct; or
- cite row 923 there without the parenthesis, or narrow the introduction's convention to rows that record a path's gap.

The case's other trap, `tests-writing.md:32` ("compare by identity"), did not reach the reader: it answered `Point` right.

## Case 29: which instance walk made (follow the pointer)

**Grade: right.**

- `Cell(z).asString` gives `Cell[\ZZ32\]` today while the instance is a `Cell[\Int\]` (row 364). The reader says printing cannot show the instance.
- The record is searched first: row 364 is read with `facts-extract.sh`, and the `XXX` files are listed with `git ls-files`. The answer says to promote an existing reproducer instead of adding a test. The key names that reproducer, `tests/XXXInferredIntBindingRungT.fss`, and the reader names where it would be found.
- The check is by type, a `typecase` on `Cell[\ZZ32\]` that gives `false` today. The key accepts a check by type. Its own examples are a typed binding or dispatch, and the reader's probe reports back if the premise fails.
- The assertion fails before the fix and passes after.
- Nothing on the Wrong list appears: no printed check, no `Int` expected in output, and row 364 not called fixed.

Minor, not graded on its own: the answer then names a new file, `CellInstanceZZ32.fss`, as "the test". Read with the step before it, that is the fallback for when no reproducer exists. The key's case is the one where `XXXInferredIntBindingRungT` exists and is promoted.
