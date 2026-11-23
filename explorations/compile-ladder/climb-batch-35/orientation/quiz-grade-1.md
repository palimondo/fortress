# Quiz grading, round 1 (cases 5, 13, 26 and 32)

The answers: `quiz-answers-1.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 5, 13, 26 and 32, as climb batch 35's update reads them (on `main` at `9322330fa8`). The orientation graded: `orientation.md` in this folder. Each case is graded on its decision and scope, by the key's **Expected**, **Wrong** and **Partial** lists.

## Counts

- Right: 3 (cases 5, 26 and 32).
- Right without its path or scope qualification: 1 (case 13).
- Wrong: 0.
- Wrong and counted against the orientation: 0.

## Case 5: right

- The line is the key's: `seconds: RR64 = asFloat(elapsed) / 1000000000.0`.
- The new trap of climb batch 35 does not catch the reader. The reader calls `x.asRR64` the rule's getter and writes `asFloat(x)` because the tree departs (F-324). So the reader neither takes `asFloat` for the decided name nor writes `elapsed.asRR64` as a line that runs today.
- None of the key's **Wrong** forms is given as the answer:
  - `elapsed / 1000000000` is called an exact `QQ`.
  - `(1.0 elapsed) / ...` is refused for the `ZZ64`, because no coercion carries a `ZZ64` into `RR64`. The reader does not say what that line answers (the key: the same exact `QQ`), but does not call it a float either.
  - The reader does not claim that the unconverted line gives a float. The key's **Skill** says that no passage of the skill states the rational, so this is enough.
- The `ZZ32` question is answered as the key answers it:
  - The `asFloat` line holds unchanged.
  - `(1.0 elapsed) / 1000000000.0` would also give an `RR64`, since a `ZZ32` converts implicitly.
- The reader cites `library.md`'s "`ZZ64` converts into `RR64` only explicitly, by `asFloat`" (`library.md:23`, P-165's old name). The reader was not misled by it, because the getter is named as the decided form in the same answer.
- Scope: the prelude has no `asFloat`, declares `/` only at `RR64`, and a `ZZ32` there converts by `i.asRR64`. The walk line applies on the compiled path after the switch-over. This matches the key's **Scope**. The reader says the prelude's `RR64` coerces "from `RR32` and numerals", where the key says from a radix-point numeral and `RR32`. The key does not need that point.
- Not graded: the aside that `10.0^9` folds to the same divisor.

## Case 13: right without its path or scope qualification

- The decision is the key's: keep `area(): RR64 = s s` without `override`. The reason is the key's too: the parameter types are equal, so the `override` overrides nothing. The reader also keeps the api header without `override` and writes the walk test first.
- Walk: right. The program is refused at load, and an `override` like this in the library stops every program.
- Compiled checker: right. It refuses the `override` statically, and the count stage shows the error (F-400).
- Code generator: wrong. The reader says that the code generator "would still refuse" the `override`, because it refuses every method modifier except `getter`, `setter`, `io`, `private`, `abstract` and `test` (row 650). The reader places that refusal at the one-library compiles today and at every component after the switch-over. Rung O of climb batch 35 fixed row 650 (F-400, `d56eb8a882`): the code generator now compiles the modifier, and a valid `override` compiles and runs, with bridges. This is the old text of row 650 that the key's **Partial** names. So the decision is right and the account of the compiled path is wrong in its code-generator half.
- Source of the error: `compiler.md:89`, "What the compiled path cannot compile yet", which the reader quotes: "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, such as `override` (ledger row 650)." F-400 made that sentence false. It is climb batch 35's `orientation/admission.md`, "Outside the orientation", item 4, and the key's **Skill** puts the failure against `compiler.md`.
- Not the orientation: the orientation's rule "`override` widens" (`orientation.md:32`) says only that walk refuses at load and the checker statically. It says nothing of the code generator, and the reader's checker half follows it correctly. The orientation does not state that the code generator now compiles `override`, but the key assigns that half to `compiler.md`, and the case is partial, not wrong.

## Case 26: right

- (a), `count: ZZ64`: the condition is `asFloat(count) = limit`. `count = limit` gives `false` for 3 and 3.0, silently: no coercion joins the two types, so `=` falls to `SEQV`, and values of different types are never equivalent. This is the key's answer and reason.
- (a), `count: ZZ32`: the same condition holds. `count = limit` is `true` by value, because `RR64` coerces from `ZZ32` and the library declares `=` for the pair. This is the key's answer.
- (a), `count: QQ`: the condition is `asFloat(count) = limit`.
  - The reader is unsure whether a coercion joins `QQ` and `RR64`. The reader says that without one `count = limit` is `SEQV`-false, and that the `asFloat` condition does not depend on it. The key: none joins them, and `count = limit` is `false`. The condition is right either way.
  - The planned lookup, `QQ`'s `asFloat` in `Library/FortressLibrary.fsi`, names where to look. `QQ` declares it there (`:415`, abstract).
- (a), `ratio`: `ratio = 0.5` is `true` for 1/2, because the numeral reaches `QQ`'s own `=` by its coercion (P-46) and converts exactly. This is the key's answer and reason. The reader does not fall into the old trap that it is `false` and needs `asFloat`.
- The reader does not call `asFloat` the curator's decided conversion. Case 5 names the getter `x.asRR64` as the rule's, and here `asFloat` is cited as the tree's form (F-324).
- (b): the reader refuses the generic `near[\T extends Number\]`, because `Number` declares nothing, `asFloat` included (P-165). The reader then declares `near` once for each of the eight number types, with each body by that type's own `asFloat`. This is the key's second accepted form ("Or declare it at each number type ... Either is right").
  - The bodies are valid at `9322330fa8`. `asFloat(self): RR64` is declared for `RR64`, `QQ`, `NN64`, `ZZ32`, `ZZ64` and `ZZ` in `FortressLibrary.fsi`, and for `RR32` and `NN32` in `LibraryBuiltin/FortressBuiltin.fsi:66` and `:132`.
  - The overload set is valid: sibling value objects, and the trait `QQ`, which none of them extends.
  - The reader proposes no `Number` bound or new trait.
- Scope: walk and the count stage today; the compiled path after the switch-over; the prelude has no `asFloat` and no `QQ`. This matches the key.
- Not graded: the spelling of absolute value, the numeral argument `near(3, 3.0)` going to the `ZZ32` declaration, and the test plan.

## Case 32: right

- The decision meets the key's **Expected**: "`Byte(v)` as the decided declaration, with the departure named and either a form that runs today or the rule's `XXX` test."
  - The reader writes the generic coercion `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 }`.
  - The reader says that "the rule's body is `Byte(v)`", and that walk and the checker depart by reading `v` as a `ZZ` and refuse `Byte(v)` (F-342).
  - As the form that runs today, the reader writes `Byte(v.asZZ32)`, the library's own form. Under walk it binds 255 (climb batch 35's probe).
  - The reader does not give `Byte(v.asZZ32)` as the design, and does not say that the `ZZ` reading is by design. So the key's new **Wrong** entry does not apply.
  - The stale core line, `SKILL.md:135`, did not mislead the reader.
- `300`, compiled: the checker refuses it statically, with the key's message. A compiled refusal test with `compile_err_contains` is named.
- `300`, walk: walk refuses the binding when it runs. At the top level that is the load, counted by `load_exception_contains`; inside `run()` it is the binding. This matches the key. The reader says the walk message is not in the sources and plans to read it from a run before pinning it.
- `z: Byte = 2 + 3`: it does not bind. `2 + 3` folds before the checker into a `ZZ32` 5, and `Byte` has no coercion from `ZZ32`, since coercions do not chain. It is refused statically and by walk when it runs. Write `z: Byte = 5`. This is the key's answer.
- The reader also offers `coerce(x: ZZ32)` "only if the program truly needs computed constants", and warns that it takes any `ZZ32` with no static range check. The key accepts that form only if it is bounded. The reader names the problem but does not bound the coercion. This is an aside beside the right answer, so it does not change the grade.
- `extends Number` on `Byte` follows the orientation's P-160 sentence. It is not in the question and not in the key, and it is not graded.
- Scope:
  - The reader says the prelude carries the same numeral design (P-37), and that the coercion runs once per place, in the static initializer when compiled. This matches the key.
  - The reader puts the `v.asZZ32` body on "walk and the compiled path both, today". On the compiled path that is not so: the prelude's `ZZ` has no `asZZ32` (row 349, climb batch 35's probe). The reader flags this and plans to grep the prelude's own numeral coercions and copy their spelling. That lookup would find the helper form of `compiler_tests/NumeralStaticDesignCompiled.fss`.
  - The key's **Scope** says none of these points is needed for a right answer, so the claim is not graded.
