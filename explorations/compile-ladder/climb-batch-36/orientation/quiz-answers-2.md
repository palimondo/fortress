# Quiz answers, reader 2

Cases: 3, 18, 32. Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, every part under `references/` except `revival-changes.md` and `sources.md`, and `explorations/compile-ladder/climb-batch-36/orientation/orientation.md` (cited below as "orientation").

## 3. `describe[\T extends Shape\](b: Box[\T\])` beside `describe(b: Box[\Circle\])`

**Decision.** I keep the pair. My memory is of the Working Draft. In this tree overloads may differ in their static parameters (P-45). That is a rule of the tree, not a conflict, so I do not explore. Before I cite it as a decision I would print it with `explorations/coordinator/tools/facts-extract.sh 'P-45'`.

- **Validity.** The rules apply to declared domains. The generic's domain is every `Box[\T\]` with `T extends Shape`, so it includes `Box[\Shape\]` and `Box[\Circle\]`. The plain declaration's domain is `Box[\Circle\]` alone. Generics are invariant, so that domain lies strictly inside the generic's.
  - The pair is not a duplicate.
  - The Meet Rule holds, because the domains nest.
  - The Return Type Rule holds at every instance: `String` is a subtype of `String`.
  - I write both return types. That avoids the walk gap for a plain declaration with no return type written (row 1044).
- **Which declaration runs.** For an argument of type `Box[\Circle\]`, `describe(b: Box[\Circle\])` runs on both paths. Under walk, the more specific declared domain wins. On the compiled path, the checker picks the most specific applicable declaration, and the dispatch method tests from the most specific declaration down.
- **Order of writing.** It does not matter on either path. The checker's sort only breaks a tie between two generic candidates that fit a call equally (rows 499, 1046, 1047). This pair is one generic and one plain declaration, nested strictly, so there is no tie.
- **Steps.**
  1. Before I edit the library file, run `python3 explorations/coordinator/tools/ledger.py find --cites <file>` and read the rows it lists.
  2. Write the test first: a walk test in `ProjectFortress/tests/` that asserts `describe` of a `Box[\Circle\]` gives the plain declaration's string. Through `harness-one.sh`, on the base, it fails, because the generic body answers. Echo the `Expected failure:` line first.
  3. Add the declaration and see the test pass. Run with `COLD_CACHE=1`: walk checks overloads against the library only when it analyses the library, not from a filled cache (row 342). A new overload can stop every program at load.
  4. **Checker side.** If `describe` is in the `FortressLibrary` component, run the count stage, which must stay at total 0. If it is in another of the fourteen components, run the distance stage and `ant testOneLibrary`.
  5. Run the demo driver once after my last library edit.
  6. Do not add the declaration to the compiler's prelude.

**Path and scope.**
- **Walk:** loads and runs it. A generic beside a plain declaration is one of the pairs that walk checks by the overloading rules on declared domains. The pair passes all three rules, and no departure listed under "What walk checks" covers this shape: rows 416, 539 and 788 are about other shapes.
- **Compiled checker against the interpreter's library** (count or distance stage): accepts it (P-45).
- **Compiled programs before the switch-over:** they use the compiler's prelude, so they cannot call it.
- **With `FORTRESS_LIBRARY=one`, and after the switch-over:** it compiles. The generic is compiled as a template, the name gets a dispatch method, and the same declaration runs.

**Passages relied on.**
- orientation, "Dispatch and overloading": "Overloads may differ in their static parameters (P-45) … The Working Draft forbids such pairs. A declaration's declared domain is the set of argument types … The more specific declaration's return type must be a subtype of the other's at every instance"; "Walk chooses by declared parameter types, never by the order of the declarations. It compares declared domains where one lies strictly inside the other."
- orientation, "Dispatch and overloading": "Walk's load check is not the verdict of these rules … find the case in `interpreter.md`, 'What walk checks'."
- `interpreter.md`, "What walk checks": "For every pair of functions of which at least one is generic, it checks the overloading rules … on their declared domains"; the list of departures; "So a library edit can stop every program at load, if it does one of these: adds an overload"; row 342 (cache).
- `SKILL.md`, "The compiled runtime": "one dispatch method for each overloaded name. It tests the run-time types of all the arguments, from the most specific declaration to the least specific." `SKILL.md`, "Fortress as a language": "Generics are invariant."
- `compiler.md`, "The checker's gaps": the tie rows 499, 1046 and 1047, which do not apply here.
- `library.md`, "Designing a change": "A new overload can make walk refuse every program at load", and the check steps for the count stage, the distance stage and `ant testOneLibrary`.
- `compiler.md`, "The compiler's prelude, until the switch-over": "Do not add a declaration to the three prelude files."
- `tests-writing.md`, "The order"; `tests-running.md`, "Outside the gate" (the demo driver after an edit of the interpreter's library).

## 18. `checkFits` over `Range[\ZZ32\]` beside `checkFits` over `Range[\(ZZ32,ZZ32)\]`, and walk refuses every program

**Decision.** I do not land the edit as written. Walk loads the interpreter's library for every program, and microGPT runs under walk, so a library edit that stops every program at load cannot land. I also do not take walk's refusal as the verdict.

1. **Identify the refusal.** Both declarations have no static parameters, so walk applies the team's parameter-by-parameter check. Its message is "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present".
   - This is a known departure of walk, row 416. Walk refuses overloads on two instantiations of one generic type, because it does not read them as excluding.
   - By the rules, the pair is valid. Under the exclusion rule (P-43, P-97), a value has at most one instance of `Range`, so `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]` exclude each other.
   - I read the row with `$T 'ledger:416'`, after `$T 'ledger-find:instantiations'` and `ledger.py find --cites Library/RangeInternals.fss`.
   - I do not pin or compare the order in which the message names the two declarations: it varies.
2. **Recheck the checker side.** The count stage's silence is not evidence here. The count stage checks only the `FortressLibrary` component and the apis it imports, and `RangeInternals.fss` is a component of its own.
   - Find out whether `RangeInternals` is one of the fourteen components that `one_library_tests/OneLibraryComponents.test` names in its `tests` key.
   - If it is, check the edit with the distance stage (the brief gives its command) and `ant testOneLibrary`.
   - If it is not, nothing checks it until the switch-over.
3. **Rework the library change, inside the library area, so that walk loads it.**
   - First, see how `RangeInternals.fss` already declares its helpers for the other ranks: distinct names, a generic declaration, or a dotted method on the range type. Follow that way (`library.md`, "If a rule … refuses the way that you want, find how the library writes that kind of thing").
   - If the library shows no way, give the new helper its own name, such as `checkFits1`.
   - This is my choice: it changes one area, changes no model line and no decision of the curator, and can be undone. I report it as a decision. The alternatives:
     - (a) a separate name (chosen);
     - (b) fix walk's row 416 first. That is an interpreter task, test first, which would then let the overload stand. It is outside a library brief, so it is a decision not taken for the curator or a later brief.
     - (c) a dotted method in place of a top-level overload.
4. **Record.** The departure is already in the ledger, row 416. The rules decide the case, so its test is an `XXX` walk test.
   - Check row 416's reproducer, and `git grep` the `XXX` tests, for a pair over two type arguments rather than two sizes (`Tg[\3\]`/`Tg[\4\]`).
   - If no test covers that pair, add the case to the existing `XXX` test of its kind, or else write `ProjectFortress/tests/XXX<Name>.fss`. Its program declares the pair over two instantiations and asserts which declaration each call runs. It is green while walk refuses it at load.
   - If the brief allows ledger edits, add a note to the row with `$L note 416 …`, saying that it blocks a library helper over `Range` instantiations. Otherwise, put the note in my report.
5. **Verify.**
   - Test first for the helper's own behaviour.
   - Run a walk test with `harness-one.sh` and `COLD_CACHE=1`, so that walk's load check over the library actually runs (row 342).
   - Run the demo driver once after my last library edit.
   - Check microGPT only if the brief asks.

**Path and scope.**
- **Walk:** refuses the pair at load, a departure (row 416) that holds today, before and after the switch-over, until walk is fixed.
- **Compiled checker:** accepts the pair (exclusion rule). After the switch-over the compiled path uses this same library, so the reworked form must satisfy both paths.

**Passages relied on.**
- orientation, "Traits and objects": "The compiled checker applies the exclusion rule (P-43, P-97) … Walk does not apply the rule: it runs such a type, and refuses overloads on two instantiations, as `g(b: Tg[\3\])` beside `g(b: Tg[\4\])`, because it does not read them as excluding (row 416)."
- orientation, "Dispatch and overloading": "Where a declaration has static parameters, exclusion is read over the whole tuple … a value has at most one instance of a given generic type."
- orientation, "Dispatch and overloading": "Walk's load check is not the verdict … a case that cites a ledger row is a departure of walk."
- orientation, opening: "Where the rules decide the case, assert their answer in an `XXX` test."
- `interpreter.md`, "What walk checks":
  - the team's check and its message "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present";
  - "It refuses overloads on two instantiations of one generic type … (ledger row 416)";
  - "So a library edit can stop every program at load, if it does one of these: adds an overload";
  - row 342, the cache;
  - the varying order of the message.
- `compiler.md`, top: the count stage is "on the `FortressLibrary` component and the apis that it imports". `library.md`, "Designing a change": the check steps for the other thirteen components, and "find how the library writes that kind of thing, and do the same".
- `exploring.md`, "The choices that are yours".
- `tests-writing.md`, "How a defect is recorded" (item 2) and "How `XXX` works"; `records.md`, "Reading the record" and "Writing to the record" (`ledger.py note`).
- `tests-running.md`, "Outside the gate" (demo driver).

## 32. `value object Byte(b: ZZ32)` that takes numerals 0 to 255

**Decision.** The declaration:

    value object Byte(b: ZZ32) extends Number
        coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)
    end

- **The coercion.** It is generic over the numeral's numbers, as the orientation's own example of `Byte` is. `v` is the numeral's value.
  - In the body, `v` converts where it stands, at `Byte`'s parameter `b: ZZ32`, so the body is `Byte(v)`.
  - The `where` clause bounds the numerals that `Byte` takes.
  - `NaturalNumeral` is written only as the coercion's parameter type, as the rules require.
- **`extends Number`.** It follows P-160: a program's own number type goes below `Number`, never below a number type. It is not what makes numerals bind; the coercion is.
- **Syntax check.** Before I commit to the exact syntax, I would grep the tests for an existing numeral coercion (`git grep -n 'NaturalNumeral' ProjectFortress/*tests/`) and copy its form.
- **`x: Byte = 255`** binds the byte 255 on both paths.
- **Where and when `y: Byte = 300` is refused:**
  - **Compiled path:** the checker refuses it statically, at `fortress compile`: 'The numeral 300 does not meet the where clause of the coercion to Byte.' The program does not compile, so nothing runs. This holds today under the compiler's prelude, whose numeral types and coercions follow these rules (P-37), and after the switch-over.
  - **Walk:** no static check, so the program loads. Walk refuses `300` when the binding runs: it computes the coercion at the place's first run (P-176).
    - At the top level, that is while the top-level variables are initialised, before `run()`. A walk `.test` with `load_exception_contains` counts that as a refusal.
    - Inside `run()`, it is when that line runs, after the lines before it.
  - Walk does not reuse a cached choice across numerals here: its dispatch cache skips choices that asked a program's own type for its numeral coercion, so `255` and `300` are judged separately.
  - My sources do not give walk's exact message for a program's own coercion. I would run the program directly (`bin/fortress P.fss`) to read it, not guess.
- **When `255` is converted:** the compiled code runs the coercion once for that place, in the component class's static initializer, before `run()` (a coercion that raised there would stop the program before `run()`). Walk computes it at the place's first run and reuses it on later runs of that place (P-176).
- **Does `z: Byte = 2 + 3` bind?** No, on either path.
  - `2 + 3` is an expression of numerals alone. It folds before the checker into the constant `5`, whose default type is `ZZ32`.
  - A program's own type takes a folded constant only through a coercion from that default type, because coercions do not chain (P-174). `Byte` has only a numeral coercion, so the checker refuses the binding statically, and walk refuses it when the binding runs.
  - I write the numeral itself: `z: Byte = 5`. That goes through the numeral coercion and its `where` check.
  - I do not add `coerce(x: ZZ32)`. It would make every `ZZ32` value convert into `Byte` implicitly, by value at run time under walk, with no static bound, so `2 + 298` would then bind.
  - If I need a constructed value without the coercion, `Byte(2 + 3)` constructs it directly, but it skips the 0 to 255 check.

**Path and scope.**
- **Both paths, before and after the switch-over:** `255` binds, and `2 + 3` is refused.
- **`300`:** refused statically by the checker on the compiled path. Under walk it is refused at run time, when the binding first runs.
- The compiler's prelude already follows the numeral design (P-37), so nothing waits for the switch-over.

**Passages relied on.**
- orientation, "Numbers", paragraph on a program's own number type:
  - "A program's own number type takes a numeral through a coercion generic over its numbers, which its body declares, as `value object Byte(b: ZZ32)` declares `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 }` … So `Byte`'s body is `Byte(v)`";
  - "The checker refuses statically a numeral that breaks it, as `300` here: 'The numeral 300 does not meet the where clause of the coercion to Byte.' Walk refuses it when the binding runs";
  - "walk computes it at the place's first run, the compiled path when the class loads, before `run()` … (P-176)";
  - "Write a numeral type only as the parameter type of a coercion or an operator";
  - the `-3` sentence: `Byte` has no `-`, so `-3` is refused.
- orientation, "Numbers", fold paragraph: "An expression of numerals alone folds exactly before the checker, on both paths (P-173) … a program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174). So `h: Half = 10/20` needs `coerce(q: QQ)`; a numeral coercion is not enough."
- orientation, "The number types are flat siblings (P-43)": "Do not extend a number type in a program. Declare a program's own number type below `Number` (P-160). Such a type runs on both paths."
- orientation, "A numeral converts where it stands (P-173)": "The compiler's prelude follows the same design (P-37)." `compiler.md`, "The compiler's prelude, until the switch-over": the P-37 exception for numeral types and coercions.
- orientation, "Arguments convert by declared coercions": "Walk converts a value other than a numeral at a call, a typed binding and an assignment, and chooses the coercion by the run-time value." This is why I do not add `coerce(x: ZZ32)`.
- `compiler.md`, "What the code generator does": "It runs a program's own `coerce` from a numeral once for each place where the numeral is written, in the component class's static initializer … A coercion that raises stops the program before `run()`."
- `interpreter.md`, "Where a fix of walk belongs": "Walk keeps each choice of a declaration in a dispatch cache, except a choice that asked a program's own type for its numeral coercion: that coercion's `where` clause can take one numeral and refuse another."
- `tests-writing.md`, "Where a test goes, and how it passes": "A failure while the top-level variables are initialised … counts as a refusal."
