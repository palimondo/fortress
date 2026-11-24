# Quiz answers: cases 3, 18, 32

Read before answering: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, every part under `references/` except `revival-changes.md` and `sources.md`, and the orientation `explorations/compile-ladder/climb-batch-36/orientation/orientation.md` (cited below as "orientation"). No other file was opened.

---

## 3. `describe[\T extends Shape\](b: Box[\T\])` beside `describe(b: Box[\Circle\])`

**Decision.** Keep the pair. My memory is of the Working Draft's rule, and this tree changed it: overloads may differ in their static parameters (P-45). The Working Draft's text survives in Appendix I. My recollection is not new evidence against a curator's decision, so I do not explore it.

Why the pair is valid by the overloading rules applied to declared domains:
- The generic's declared domain is every `Box[\T\]` with `T` within `Shape`: `Box[\Shape\]`, `Box[\Circle\]`, and a `Box` of any other extender. The plain one's domain is `Box[\Circle\]` alone. So the second domain lies strictly inside the first. The plain declaration is strictly more specific, and no meet is needed.
- The Return Type Rule: `String` is a subtype of `String` at every instance the argument types allow.
- No Duplicates: the domains are not equal.

**Which runs, and order.** For an argument of type `Box[\Circle\]`, the plain `describe(b: Box[\Circle\])` runs. The order in which the two are written does not matter on either path:
- Walk chooses by declared parameter types, never by the order of declarations. It compares declared domains where one lies strictly inside the other, as here.
- The compiled dispatch method tests the arguments' run-time types from the most specific declaration to the least specific.

**Steps, as a library change:**
1. Before acting, look up:
   - `explorations/coordinator/tools/facts-extract.sh 'P-45'`, to cite the decision;
   - `ledger-find:` for overloads on static parameters, and `python3 explorations/coordinator/tools/ledger.py find --cites Library/<file>` for the file I edit;
   - `ledger:416`, `ledger:788` and `ledger:786`, to confirm that none of walk's or the checker's departures cover this shape. Row 416 is two instantiations, both plain. Row 788 is a two-parameter pair that the Meet Rule refuses. Row 786 is two generics with different bounds.
   - Also study how the library already writes an overload of this kind.
2. Write a walk test first, in `ProjectFortress/tests/`. It asserts that `describe` on a `Box[\Circle\]` gives the plain body's string, and on a `Box` of another `Shape` gives the generic's. See it fail through `harness-one.sh` before the edit: today the generic answers.
3. Add the declaration to the component and to its `.fsi`, at the same header.
4. Rerun the test with `COLD_CACHE=1`. A new overload can make walk refuse every program at load, and walk checks the library only when it analyses it.
5. If the declaration is in `FortressLibrary`, run the count stage (`explorations/coordinator/tools/checker-count/run.sh`), which must report no new error. If it is in another of the fourteen components, the distance stage or `ant testOneLibrary` checks it.
6. Run the demo driver once, after the last edit, because the change edits the interpreter's library.

**Path and scope.**
- **Walk:** loads the pair. It is a generic declaration beside a plain one, so walk checks it on declared domains: No Duplicates, Meet and Return Type, and it passes. A `Box[\Circle\]` argument runs the plain one.
- **Compiled checker:** accepts it under P-45, when it checks the interpreter's library (count stage or distance stage).
- **Compiled programs before the switch-over:** they do not link this library, so no compiled program calls the pair. They do with `FORTRESS_LIBRARY=one`, and after the switch-over.
- **Compiled dispatch:** a `Box[\Circle\]` argument runs the plain one; textual order is irrelevant.
- **Not to do:** add nothing to the compiler's prelude.

**Passages relied on:**
- orientation, "Dispatch and overloading": "Overloads may differ in their static parameters (P-45) ... The Working Draft forbids such pairs ... declared domain ..."; "Walk chooses by declared parameter types, never by the order of the declarations. It compares declared domains where one lies strictly inside the other"; "Walk's load check is not the verdict of these rules ...".
- orientation, opening paragraph: "Question a rule only on new evidence"; "Where a rule changed the specification, Appendix I keeps the original text".
- `SKILL.md`, "Fortress as a language" (dispatch, the checker's overloading rules, the Return Type Rule), and "When to explore" ("Your own view of the evidence that it used is not new evidence").
- `SKILL.md`, "The compiled runtime": the dispatch method "tests the run-time types of all the arguments, from the most specific declaration to the least specific".
- `references/interpreter.md`, "What walk checks": "For every pair of functions of which at least one is generic, it checks the overloading rules ... on their declared domains". Its departure list holds rows 416 and 788, and "So a library edit can stop every program at load, if it ... adds an overload". Also row 342 and `COLD_CACHE=1`.
- `references/compiler.md`, "The checker's gaps" (row 786), and "The compiler's prelude, until the switch-over" ("Do not add a declaration to the three prelude files").
- `references/library.md`, "Designing a change": api headers, the export check, and "A new overload can make walk refuse every program at load".
- `references/build-and-caches.md`, "After an edit of the library": any other file of `Library/` is walk's library, and compiled programs do not link it yet.
- `references/tests-running.md`, "Outside the gate": the demo driver after an edit of the interpreter's library.

---

## 18. `checkFits` on `Range[\ZZ32\]` beside `Range[\(ZZ32,ZZ32)\]`; walk refuses every program

**Decision.**
1. **Do not read walk's refusal as a verdict on the pair.** The pair is valid. The two parameter types are two instantiations of one generic type, `Range`. By the exclusion rule (P-43, P-97), no value has two instances of one generic type, so the domains exclude each other. The compiled checker applies that rule, and the count stage's silence agrees.
   - Walk does not apply the rule. It refuses overloads on two instantiations, as `g(b: Tg[\3\])` beside `g(b: Tg[\4\])`, because it does not read them as excluding.
   - This is a known departure of walk, ledger row 416, not a defect of my declaration.
   - Both declarations are plain, so walk uses the team's check. I expect the message "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present".
2. **Confirm before acting:**
   - read `$T 'ledger:416'` (with `T=explorations/coordinator/tools/facts-extract.sh`), and `$T 'ledger-find:instantiations'` for related rows;
   - reproduce the refusal through `harness-one.sh` with `COLD_CACHE=1` on a small test, and check that its message names the two `checkFits` declarations;
   - run `python3 explorations/coordinator/tools/ledger.py find --cites Library/RangeInternals.fss`.
3. **Do not land a library that stops every program under walk.** The repair of row 416 is a change to walk (`interpreter/`), another area. A library task builds in one area, and a choice is mine only if it changes one area. So I do not fix walk inside this task. In the library, I take the form that walk loads:
   - First study how `RangeInternals.fss` already separates its `ZZ32` and pair-range code (the library's own way).
   - Follow that way, for example by giving the new declaration a name of its own, so that it is no overload beside the pair declaration.
   - Rerun my test and a cold-cache walk run, so that programs load again. Rerun the count stage for the changed declaration.
4. **Report:**
   - as a decision: the separate name, with the overload as the alternative, and the evidence that the pair is valid (P-43/P-97) and that walk refuses it (row 416, with my reproducer's output);
   - as a decision not taken for the curator: whether to fix row 416 in walk first and then restore the overload. That fix starts from row 416's reproducer test, promoted if it is an `XXX` test.
   - If my brief lets me edit the ledger, add a note to row 416 that the library meets it here, with `ledger.py note 416 ... --check` first. Otherwise give the note in my report.

**Path and scope.**
- **Walk only:** the refusal at load, today, until row 416 is fixed.
- **Compiled checker:** accepts the pair (exclusion rule). This holds for the count stage against the interpreter's library, and for compiled programs after the switch-over or with `FORTRESS_LIBRARY=one`.
- **Compiled programs before the switch-over:** they do not link `RangeInternals` at all.

**Passages relied on:**
- orientation, "Traits and objects": "The compiled checker applies the exclusion rule (P-43, P-97) ... Walk does not apply the rule: it runs such a type, and refuses overloads on two instantiations, as `g(b: Tg[\3\])` beside `g(b: Tg[\4\])`, because it does not read them as excluding (row 416)".
- orientation, "Dispatch and overloading": "Walk's load check is not the verdict of these rules ... Before you change code to pass walk's check ... find the case in `interpreter.md`, 'What walk checks': a case that cites a ledger row is a departure of walk."
- `SKILL.md`, "Fortress as a language": "No type may extend two instantiations of one generic trait".
- `references/interpreter.md`, "What walk checks":
  - the team's check and its message for a pair of two plain declarations;
  - departure "It refuses overloads on two instantiations of one generic type ... (ledger row 416)";
  - "So a library edit can stop every program at load, if it ... adds an overload";
  - row 342 and `COLD_CACHE=1`.
- `SKILL.md`, "You work with three things ... Building happens in one area at a time"; `references/exploring.md`, "The choices that are yours" (one area, can be undone) and the procedure, items 10 and 11.
- `references/library.md`, "Designing a change": "If a rule of the language or the checker refuses the way that you want, find how the library writes that kind of thing, and do the same", and "A new overload can make walk refuse every program at load".
- `references/records.md`, "Reading the record" and "The gap ledger" (`ledger.py note`); `references/tests-writing.md`, "Promoting an `XXX` test".

---

## 32. A `Byte` type that takes numerals up to 255

**Declarations.**

    value object Byte(b: ZZ32) extends Number
        coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)
    end

- A program's own number type is declared below `Number` (P-160). `Number` declares nothing (P-165), so `extends Number` changes no behaviour here. The coercion is what makes numerals bind.
- The coercion is generic over the numeral's numbers. In the body, `v` converts where it stands: at the `ZZ32` parameter of `Byte`. So `x: Byte = 255` binds `Byte(255)`: `v` is 255 and the clause `v < 256` holds.
- Without such a coercion, the type refuses every numeral.

**Where and when `y: Byte = 300` is refused.**
- **Compiled path, before and after the switch-over:** the checker refuses it statically, at compile: 'The numeral 300 does not meet the where clause of the coercion to Byte.' The program never compiles, so it never runs. The prelude's numeral types and coercions follow these rules (P-37).
- **Walk:** refuses it when the binding runs.
  - At the top level, that is while the top-level variables are initialised, which the harness counts as a refusal at load (`load_exception_contains`).
  - Inside `run()`, it is when execution reaches the binding.
  - I would take the exact message from a run, since the parts do not give it for a `where`-clause refusal.

**When `255` converts.** A numeral's coercion gives one value per written place. Walk computes it at the place's first run. The compiled code computes it in the component class's static initializer, before `run()`. Each later run of the place reuses it (P-176). Walk's dispatch cache does not cache a choice that asked a program's own type for its numeral coercion, so 255 and 300 at different places are judged separately.

**`z: Byte = 2 + 3`:** does not bind as written.
- `2 + 3` is an expression of numerals alone, so it folds, before the checker and on both paths, into the exact constant 5.
- Apart from a negated numeral, a program's own type takes such a constant only through a coercion from its default type, `ZZ32`. Coercions do not chain, so the numeral coercion is not enough.
- So it is refused: by the checker statically, and by walk when the binding runs.

Write the numeral instead, `z: Byte = 5`, which the `where` clause checks. Other options are:
- construct directly, as `z: Byte = Byte(2 + 3)`. The folded 5 converts at the `ZZ32` parameter, but nothing checks the bound 256.
- add `coerce(x: ZZ32)` to `Byte`. This lets every `ZZ32` value convert into `Byte` implicitly, and checks no bound statically, so I would not add it for this.

**Tests.**
- Walk tests go in `ProjectFortress/tests/`: one asserts `x.b` is 255. For the refusal of `300`, a test with a `.test` file and `load_exception_contains=` holds a top-level binding.
- A compiled refusal test has `compile` and `compile_err_contains=The numeral 300 does not meet the where clause of the coercion to Byte`.

**Path and scope.**
- **Both paths:** the declarations and the binding of 255 (P-173, P-174, P-37).
- **Refusal of 300:** compiled at compile time, statically; walk at the binding's run.
- **`2 + 3`:** refused on both paths, because the fold is shared (P-173, P-174).

**Passages relied on:**
- orientation, "Numbers":
  - "Write a numeral type only as the parameter type of a coercion or an operator ... as `value object Byte(b: ZZ32)` declares `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 }` ... So `Byte`'s body is `Byte(v)`. The `where` clause bounds the numerals that the type takes. The checker refuses statically a numeral that breaks it, as `300` here: 'The numeral 300 does not meet the where clause of the coercion to Byte.' Walk refuses it when the binding runs."
  - "The coercion gives one value for each place where the numeral is written ... (P-176)"; "Without such a coercion, the type refuses a numeral."
  - "An expression of numerals alone folds exactly before the checker, on both paths (P-173) ... Except for a negated numeral ... a program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174). So `h: Half = 10/20` needs `coerce(q: QQ)`; a numeral coercion is not enough."
  - "The number types are flat siblings (P-43) ... Declare a program's own number type below `Number` (P-160)"; "`Number` declares nothing (P-165)".
- `references/compiler.md`, "What the code generator does": the coercion runs in the component class's static initializer, before `run()`. Also "The compiler's prelude, until the switch-over": its numeral types and coercions follow the rules (P-37).
- `references/interpreter.md`, "Where a fix of walk belongs": the dispatch cache does not cache a choice that asked a program's own type for its numeral coercion.
- `references/tests-writing.md`, "Where a test goes, and how it passes": `load_exception_contains`, and a failure while top-level variables are initialised counts as a refusal. Also "A test program": "A test of run-time arithmetic ... needs a variable operand".
