<!-- Grading of quiz-answers-2.md (cases 5, 12, 16, 21, 26, 27, 28, 29) against explorations/coordinator/tools/orientation/regression/key.md, read on main at 0549157f4, 2026-11-07. The reader worked from the orientation as revised by the second writer round (writer-2.log). -->

# Quiz grading 2

Cases graded: 8 (5, 12, 16, 21, 26, 27, 28, 29). Right: 7. Right without its qualification: 1 (case 29). Wrong: 0.

The case 29 partial does not count against the orientation. No orientation passage misled the reader there, and the rule it missed is in an area part that the reader read (`tests-writing.md`, "Promoting an `XXX` test").

Case 28, which reader 1 got wrong because of the orientation, is now right. The second round's rewrite of the `SEQV` paragraph (row 923 no longer cited) worked.

## Case 5: a `long` into a `double`

**Grade: right.**

- The line is the key's: `seconds: RR64 = asFloat(elapsed) / 1.0E9`, with `1000000000.0` allowed.
- Both wrong forms are refused, each for the key's reason:
  - `elapsed / 1000000000` gives a `QQ`;
  - `elapsed / 1.0E9` fails because a `ZZ64` does not convert into `RR64` implicitly, so no `/` fits.
- The `(1.0 elapsed)` form, which is on the key's Wrong list, is not used.
- The `ZZ32` case is answered both ways:
  - `asFloat` still works, because each number type declares its own (P-165);
  - plain `elapsed / 1.0E9` works too, because `ZZ32` converts implicitly.
- The compiled-path note goes beyond the key and points the right way. Before the switch-over the prelude has no `QQ` and declares `/` only at `RR64`, and the reader would grep the prelude for a `ZZ64` `asFloat` before using the line there. The key says the prelude has none.

## Case 12: a user type for `SUM`

**Grade: right.**

- `Money` extends `AdditiveGroup[\Money\]`, at the type itself, for the key's reason: the extender rule of the self-typed algebra (row 893).
- It declares `opr +`. For the other members, the reader names where it looks (`trait AdditiveGroup` in `Library/FortressLibrary.fsi`) and what it does with what it finds: each abstract member gets a body at the `.fsi`'s header, the zero as `Money(0)`, and the negation or subtraction. That meets the key's rule for "look it up first".
- The sum is `SUM[\Money\][m <- ms] m`, with the static argument written (row 731).
- The empty sum is answered as the key requires:
  - the specification's identity, `Money(0)`, is kept apart from today's result;
  - under walk today the result is `CastError` (row 436);
  - neither `CastError` nor `0` is to be asserted as correct, and an existing row-436 test is checked before a new `XXX` one is added.
- Scope: before the switch-over, the prelude's reductions give only a `ZZ32` or a `String`.
- None of the key's Wrong answers appears: no `Monoid[\T, ⊕\]`, no `excludes` on the object, and the empty sum is not said to give `zero`.
- Two extras agree with the record: `value object` for `SEQV` field by field (P-168), and no `override`.

## Case 16: a numeral at an `NN32` binding

**Grade: right.**

- Under walk the binding is refused (row 454), so the reader writes `unsigned(3)`.
- On the compiled path `n: NN32 = 3` works: the checker types the numeral `IntLiteral` (P-76). The reader would confirm it with one compile.
- Both paths are answered, and neither answer is on the key's Wrong list.
- The extras are sound:
  - walk's refusal is a departure, not to be asserted as correct;
  - the reader checks row 454's reproducer before it writes an `XXX` test;
  - it checks the prelude for `unsigned` before using the binding in a test for both paths.

## Case 21: the self type in the overloading check's exclusion test

**Grade: right.**

- The library's pairs are a valid overloading, and the library is left unchanged, by P-157 and P-152 (`self` read as `AdditiveGroup[\X\]` met with `X` in the exclusion test). The count stage is named as the confirmation.
- The reader's own program:
  - it loads under walk, as a plain test, not an `XXX` one;
  - walk's two remaining refusals are named, and the program is built clear of both, which the key allows;
  - it compiles, and the checker accepts it (P-157).
- The spelling with `+`, which the key leaves **Open**, is handled the way the key accepts. The program's trait with its own `+` and its number trait both exclude `Number`, and the reader says why: otherwise the library's `+` between an array and a number meets them (P-160, row 918).
- None of the key's Wrong answers appears: the pairs are not called invalid, the program is not said to be refused at load, and row 804 is not called open.
- Contingency: if the checker refused the pair, the reader would record an `XXX` compile test with `compile_err_contains`. That is `tests-writing.md`'s form for a refusal at compile time.
- The other extras are correct: the cold cache (row 342), and the compiled traps (rows 695 and 650).

## Case 26: numbers of two types compared, and a float from generic code over `Number`

**Grade: right.**

- (a) The condition is `asFloat(count) = limit`. `count = limit` gives `false` with no error, because no coercion joins `ZZ64` and `RR64`, so `=` is `SEQV`.
  - `ZZ32`: a bare `=` gives `true` by the implicit coercion, and the `asFloat` line still works.
  - `QQ`: a bare `=` is `false`, as `1/2 = 0.5` is, so the reader keeps `asFloat`.
  - All three sub-answers are the key's.
- (b) The reader refuses `asFloat(a)` over `T extends Number`, for the key's reason: `Number` declares nothing (P-165), so the checker and the count stage refuse the call, and walk runs it only because it checks no static types.
  - It declares `near` at each of the eight number types, each with that type's own `asFloat`, in both the `.fsi` and the `.fss`. The key accepts this as one of its two right forms.
  - It puts no `asFloat` back on `Number` and adds no new trait.
- The reader says no `IntLiteral` overload is needed: when tied overloads differ only at the numeral's position, the checker reads the numeral as `ZZ32`. That is the orientation's rule ("Arguments convert by declared coercions").
- Scope: (a) is placed on walk and on the one library after the switch-over. The note that the compiled library before the switch-over has no `=` over `Any` and no `QQ` is correct. The key says the prelude declares no `asFloat` at all, and the reader would check the prelude before using the line there. The key does not require this point.

## Case 27: a program's trait with its own `+`, beside the library's `+` between an array and a number

**Grade: right.**

- Under walk the program does not load: "fails the Meet Rule", because `Number` is open and `excludes { String }` does not keep `Wide` apart from the numbers or the arrays (P-160).
- The checker accepts the program across the import. The reader calls this row 918's gap, not the verdict.
- The change is `excludes { String, Number }`, or a clause that excludes the arrays. After it the assertion passes. The reader also says that `-`, `MIN` and `MAX` need the same clause.
- The warm-cache point matches the key's **Open**: a direct run or a warm-cache run that loads the program proves nothing, so the reader shows the refusal with `COLD_CACHE=1`.
- The aside on the getter name `big` is an unneeded hedge, as in grading 1. The reader expects no refusal, and the measured `tests/NumberOpenTraitPlusBesideArrayWalk.fss:7` declares the same getter.

## Case 28: `=` on value objects and long tuples that hold strings

**Grade: right.**

- `Point` passes, because two value objects are `SEQV` field by field.
- `Run` fails, because a string built apart is not `SEQV` to the literal.
- The 4-tuple fails, because the library declares `=` on pairs and triples only, so a 4-tuple falls back to `SEQV`.
- Both failures are called the rule's answer, not a defect, and are to be asserted as correct. That is the point reader 1 missed.
- The kept checks are the key's:
  - for `Run`: the parts compared (`r.name = "abc"`, `r.steps`), or `Run`'s own `=` with `Equality[\Run\]` or `assert(x = y, msg)` (row 807);
  - for the 4-tuple: the string compared alone, and the numeric elements, all literals, comparable as a triple.
- None of the key's Wrong answers appears, including `Point` failing by identity. The `tests-writing.md:32` trap did not reach this reader either.
- Scope: walk; before the switch-over the compiled library has no `=` over `Any` and none on tuples, so the assertions do not carry over to a compiled test.

## Case 29: which instance walk made (follow the pointer)

**Grade: right without its qualification (the key's Partial).**

What matches the key:

- `Cell(z).asString` gives `Cell[\ZZ32\]` today, while the instance is a `Cell[\Int\]`. The reader says that printing cannot show the instance and refuses an `asString` assertion.
- The check is by dispatch, `isCellZZ32(c: Cell[\ZZ32\])` beside `isCellZZ32(c: Any)`, with `assert(isCellZZ32(Cell(z)), true, ...)`. This is the key's dispatch form. It fails today, because a `Cell[\Int\]` dispatches to `Any`, and it passes after the fix.
- The record is searched first: row 364 with `facts-extract.sh`, and a `ledger-find`.
- None of the key's Wrong answers appears: no printed check, no `Int` expected in output, and row 364 not called fixed.

What is missing:

- The reader reads row 364 but does not say what it does with the row's reproducers. The key names them, and the fix promotes one:
  - `tests/XXXInferredStaticArgRungS.fss`, in the row's reproducer cell;
  - `tests/XXXInferredIntBindingRungT.fss`, in its notes. This one is this case: a `BoxT[\ZZ32\]` binding of `BoxT(z)` for `z: ZZ32`.
- Instead the reader writes a new plain-named test, `CellInstanceAtDeclaredType`. That test duplicates `XXXInferredIntBindingRungT` and leaves it with its prefix, so the fix would turn it red. The reader's planned `ant testSystem` would show this, but only after the fix.
- The key's "How to use it" applies: an answer that says "look it up first" is right only if it also says what it does with each result that the key names.

**Cause: the reader's slip, not the orientation.**

- The orientation's numeral sentence points to row 364, which is all the key asks of it.
- The rule is in `tests-writing.md`, "Promoting an `XXX` test": find the `XXX` test through the row's reproducer, then promote it rather than add one. The reader read that part.
- The reader applied the same rule in cases 12 and 16, where it checked rows 436 and 454 for an existing test.
- In this case the reader followed `tests-writing.md`, "The order", step 1 ("Write the test, with a plain name"), and cites that section. Step 1 does not point to "Promoting an `XXX` test" for a defect that already has an `XXX` test. That is a possible tightening of the area part, not of the orientation.
