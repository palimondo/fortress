# Quiz grading, round 2 (cases 5, 13, 26 and 32)

The answers: `quiz-answers-2.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, cases 5, 13, 26 and 32, as climb batch 35's update reads them (on `main` at `9322330fa8`). The orientation graded: `orientation.md` in this folder. Each case is graded on its decision and scope, by the key's **Expected**, **Wrong** and **Partial** lists.

## Counts

- Right: 3 (cases 5, 26 and 32).
- Right without its path or scope qualification: 1 (case 13).
- Wrong: 0.
- Wrong and counted against the orientation: 0.

## Case 5: right

- The line is the key's: `seconds: RR64 = asFloat(elapsed) / 1000000000.0`.
- The new trap of climb batch 35 does not catch the reader:
  - The reader does not write `elapsed.asRR64` as a line that runs today: "the one library declares `asFloat` in its place (F-324)".
  - The reader does not call `asFloat` the curator's decided conversion. "In its place" reads `asRR64` as the name that `asFloat` stands in for, as the orientation's `Number` rule says (`orientation.md:112`).
- None of the key's **Wrong** forms is given as the answer:
  - `elapsed / 1000000000` is called the exact rational, a `QQ`.
  - The implicit form `(1.0 elapsed) / ...` is called "wrong for `ZZ64`". The reader does not say what it answers (the key: the same exact `QQ`), but does not call it a float either.
  - The reader does not say what `elapsed / 1000000000.0` gives without the conversion. The key's **Skill** says that no passage of the skill states that rational, and the reader does not expect a float from it.
- The `ZZ32` question is answered as the key answers it:
  - The `asFloat` line holds unchanged, since each number type declares its own `asFloat`.
  - `(1.0 elapsed) / 1000000000.0` would also give an `RR64`, since a `ZZ32` converts implicitly.
- The reader cites `library.md`'s "`ZZ64` converts into `RR64` only explicitly, by `asFloat`" (`library.md:23`, P-165's old name). It did not mislead the reader, who treats `asFloat` as the tree's form.
- Scope: walk with the one library, and the compiled path after the switch-over. Before it, the prelude has no `asFloat`, its `RR64` converts only an `RR32` and a numeral (row 442), a `ZZ32` converts by `elapsed.asRR64` (the prelude's method, `compiler.md`'s `i.asRR64`), `/` is declared only at `RR64`, and no prelude conversion takes a `ZZ64` into `RR64`. This matches the key's **Scope**.
- Not graded: avoiding `1e9` (the key accepts `1.0E9`, but avoiding it is not wrong), and the aside that `10.0^9` folds to the same divisor.

## Case 13: right without its path or scope qualification

- The decision is the key's: keep `area(): RR64 = s s` without `override`. The reason is the key's too: an `override` at the inherited declaration's own (empty) parameter list overrides nothing. The reader also writes the api header without `override` and the walk test first.
- Walk: right. The program is refused at load, and such an `override` in the library stops every program.
- Compiled checker: right. It refuses the `override` statically, in the count stage, the distance stage and a one-library compile (F-400).
- Code generator: wrong. The reader says that it "refuses any function or method with the modifier `override` (ledger row 650)", and puts that refusal on one-library compiles. Rung O of climb batch 35 fixed row 650 (F-400; the ledger reads `FIXED`, `d56eb8a88`): the code generator now compiles the modifier, and a valid `override` compiles and runs, with bridges. This is the old text of row 650 that the key's **Partial** names. So the decision is right and the code-generator half of the compiled account is wrong.
  - The reader's framing, "a code-generator wall, reached only if the checker let the declaration through", does not change the grade. For this declaration the checker refuses first, but the general claim is false.
  - The reader's step 1, `facts-extract.sh 'ledger:650'`, would have shown the row `FIXED`. The answer as written still states the old text.
- Source of the error: `compiler.md:89`, "What the compiled path cannot compile yet", which the reader quotes: "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, such as `override` (ledger row 650)." F-400 made that sentence false. It is climb batch 35's `orientation/admission.md`, "Outside the orientation", item 4, and the key's **Skill** puts this failure against `compiler.md`.
- Not the orientation: its rule "`override` widens" (`orientation.md:32`) says only that walk refuses at load and the checker statically, and the reader's walk and checker halves follow it correctly. The orientation says nothing of the code generator. The key assigns that half to `compiler.md`, and the case is partial, not wrong.

## Case 26: right

- (a), `count: ZZ64`: the condition is `asFloat(count) = limit`. `count = limit` gives `false` for 3 and 3.0, with no error: no coercion joins the two types, so `=` falls to `SEQV`, and values of different types are never equivalent. This is the key's answer and reason.
- (a), `count: ZZ32`: the same condition holds. `count = limit` is `true` by value, because a coercion carries `ZZ32` into `RR64` and the library declares `=` for the pair. This is the key's answer.
- (a), `count: QQ`: the condition is `asFloat(count) = limit`, and `count = limit` is `SEQV`-false. The reader knows of no coercion from `RR64` into `QQ` and plans a walk run to confirm it, but the condition does not depend on it. This is the key's answer.
- (a), `ratio`: `ratio = 0.5` is `true` for 1/2, because the numeral reaches `QQ`'s own `=` by its coercion (P-46) and converts exactly. This is the key's answer and reason. The reader does not fall into the old trap that it is `false` and needs `asFloat`.
  - The reader adds that binding the numeral first, `half = 0.5`, makes `ratio = half` `false`, since `half` keeps its default `RR64`. This matches the key's `q = lim` being `false` for `lim: RR64 = 0.5`.
- The reader does not call `asFloat` the curator's decided conversion, here or in (b).
- (b): the reader refuses the generic `near[\T extends Number\]`, because the checker allows on a `T extends Number` no method that the number types declare, `asFloat` among them. Walk would run it, which the reader does not take as proof. The reader then declares `near` once for each of the eight number types, the `RR64` one with the body and the other seven by `near(asFloat(a), b)`. This is the key's second accepted form ("Or declare it at each number type ... Either is right").
  - The bodies are valid at `9322330fa8`: each of the eight types declares `asFloat(self): RR64` (round 1's grading checked the two in `LibraryBuiltin/FortressBuiltin.fsi`).
  - The overload set is valid: seven sibling value objects, and the trait `QQ`, which none of them extends.
  - The reader proposes no `Number` bound and no new trait.
- Scope: (a) on walk and on the compiled path after the switch-over, and not for a compiled program before it (the prelude has no `QQ` and no `asFloat`); (b) on walk and the count stage today, every compiled program after the switch-over. This matches the key.
- Not graded: the spelling of absolute value, the tolerance numeral, the numeral argument `near(3, 3.0)` going to the `ZZ32` declaration, and the test plan.

## Case 32: right

- The decision meets the key's **Expected**: "`Byte(v)` as the decided declaration, with the departure named and either a form that runs today or the rule's `XXX` test."
  - The reader writes the generic coercion `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 }`.
  - The reader says that "the rule's body is `Byte(v)`", and that walk, the checker and the code generator depart by reading `v` as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347).
  - As the form that runs today under walk, the reader writes `Byte(v.asZZ32)`, the one library's own form. Under walk it binds 255 (climb batch 35's probe).
  - The answer's code block shows the `v.asZZ32` body, but the text says which form is the rule and which is the tree's. The reader does not give `Byte(v.asZZ32)` as the design, and does not say that the `ZZ` reading is by design. So the key's new **Wrong** entry does not apply.
  - The stale core line, `SKILL.md:135`, did not mislead the reader.
- `300`, compiled: the checker refuses it statically, with the key's message.
- `300`, walk: refused when the binding runs. At the top level that is while the top-level variables are initialised, which the harness counts as a refusal at load (`load_exception_contains`); inside `run()` it is the binding. This matches the key. The reader does not claim walk's message, and plans to read it from a run before pinning it (the key: 'Type mismatch binding 300' at the top level).
- `z: Byte = 2 + 3`: it does not bind. `2 + 3` folds before the checker into a `ZZ32` 5, and `Byte` has no coercion from `ZZ32`, since coercions do not chain (P-174). It is refused statically, and by walk when it runs. Write `z: Byte = 5`. This is the key's answer.
- The reader declines `coerce(i: ZZ32)` because it would convert every `ZZ32` implicitly. This agrees with the key's caution (P-74).
- `extends Number` on `Byte` follows the orientation's P-160 sentence, and the reader notes the coercion works without it. It is not in the question or the key, and is not graded.
- Scope:
  - The reader says that the compiled checker also reads `v` as a `ZZ`, and that the prelude's `ZZ` has no `asZZ32` before the switch-over (row 349), so the walk body may not compile there. This matches the key's **Scope** (climb batch 35's probe: 'ZZ has no getter called asZZ32'). The reader plans to read F-341, F-342 and F-347 for a compiled form, and does not give the helper form of `compiler_tests/NumeralStaticDesignCompiled.fss`. The key does not need it.
  - The coercion runs once per place (P-176), in the component class's static initializer when compiled. This matches the key.
