<!-- The orientation workflow's preservation check, update mode, for climb batch 32: whether the new orientation.md keeps each clause of the two admitted findings (F-364, F-366) and each passage of the old part that it removes; four failures, the first two of scope. -->

# Preservation check: climb batch 32

Checked: `orientation.md` in this folder against `.claude/skills/fortress-repo/references/revival-changes.md` on `main` (by `diff`: three old lines changed, `:101`, `:105`, `:115`; nothing else differs), against `admission.md`, and against F-364, F-366, P-46 and ledger rows 1007, 1008, 1015, 1016 and 1017. Nothing was built or run. Nothing is changed but this file.

## Failures

### 1. At a parameter, the new paragraph lets a reader conclude that the two paths sum in different types. The source says they sum alike.

- Source, row 1008: "is not instantiated by the declared type of a method's return, a field, a top-level variable or an assigned variable ... A call's argument is summed in the body's type on both." F-364: "A call's argument has no expected type where the call is accepted without one (P-51), so a reduction there runs at its body's type."
- New, "Reductions and comprehensions": "A method's return type, a field, a top-level variable, a parameter and an assignment do not direct it." Then: "Where the checker reads a declared type that does not direct walk, the two paths sum in different types (row 1008) ... Write the argument there in a program for both paths."
- The second sentence points back to a list of five places. The source's list has four: it has no parameter. "Numbers" names a parameter among the places that fix a type, so a reader takes the checker to read it. No sentence gives the checker's half for a call's argument (the writer's "Not placed", second item).
- Consequence: for `f(x: RR64)`, a worker expects compiled `f(SUM[j <- 0#4] huge(j))` to sum in `RR64` and walk to overflow. Both sum in `ZZ32`, so both raise `IntegerOverflow`. The worker asserts a compiled result that does not hold, or writes an `XXX` walk test for a difference that does not exist.
- Repair, within the rule: name the four places in the new paragraph, and add that a reduction written as a call's argument is summed in its body's type on both paths.

### 2. The criterion that sets these four reductions apart is gone: their bound names the parameter.

- Old, `:115`: "The checker does not, because their bound names the parameter (row 731)."
- New: no sentence says it. The rule names `SUM`, `PROD`, `BIG MAX` and `BIG MIN` only, then: "Other reductions take their bound, or the expected type where the bound does not fit."
- Source, F-59: "For a generic big operator whose bound names its parameter, such as `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, an unwritten static argument has no instance at its bound; the compiled checker then writes it as the reduction's expected type, else as the type of its body (F-364). A plain-bounded big operator takes its bound".
- The reason for the old sentence is false now, but the class it named is not. The four are examples of a class; a program's own big operator with such a bound belongs to it (`compiler_tests/InferBigOperatorSelfBound` declares `BIG LAST[\T extends Equality[\T\]\]`).
- Consequence: a worker who declares such a big operator reads "Other reductions take their bound" and predicts an instance at the bound, which does not exist. The worker cannot tell which of the two rules holds for it, and so cannot tell where row 1008's difference of the paths reaches it.
- Repair: "whose bound names the parameter" in the bold rule's first sentence, and "A reduction with a plain bound" for "Other reductions".

### 3. The numeral at `=` is stated at `NN32` only. The admitted correction names `NN64`, `RR32` and a float numeral against a `QQ`.

- Admission, F-366's row: "`u = 0` and `0 = u` are `true` and `u =/= 0` is `false` for a zero `NN32`, `NN64` or `RR32`, `h = 0.5` is `true` for `h: QQ = 1/2`". Its evidence is the regression quiz's case 26, whose partial answer is `q = 0.5` for a `QQ`.
- New, "`Number` declares nothing": "A numeral reaches a number type's own `=` by its coercion (the rule above). So on both paths `u = 0` and `0 = u` are `true` and `u =/= 0` is `false` for a zero `u: NN32`."
- The general sentence covers the other types, and the writer lists the examples as not placed. But the same rule says two sentences earlier that a `ZZ64` against an equal `RR64` is `false`, and the `QQ` case differs from it only in that one operand is a numeral. Case 26's key records the same gap from climb batch 29b ("they give no `QQ` example (climb batch 29b's `orientation/preserve.md`, failure 1)").
- Consequence: a worker carries "`QQ` against `RR64` is `false`" to `q = 0.5` and writes `asFloat(q) = 0.5`, or an `XXX` test, for a comparison that is `true` on walk (`tests/NumeralEqualsNumberWalk.fss:15-16`).
- Repair: one clause, "and `h = 0.5` is `true` for `h: QQ = 1/2`".

### 4. "(the rule above)" points to the wrong rule.

- New, "`Number` declares nothing": "A numeral reaches a number type's own `=` by its coercion (the rule above)."
- The rule directly above is "An integer converts to another integer type by a checked getter or by a low-bits function (P-161)". The rule meant, "Only a numeral's own coercion changes which declaration runs (P-46)", stands two rules up.
- Consequence: a reader who follows the pointer finds the getters, which say nothing of a numeral at `=`, and may conclude that the conversion is to be written.
- Repair: name the rule, or write "by its coercion (P-46)".

## Kept, with a remark

- **The library and the model keep their written arguments** (F-364's row, last sentence of the correction). It is not in the new text. `library.md:25` holds the instruction, "Write the element type wherever generators stand in brackets", with a reason that is now false: "The checker refuses a call without it (ledger row 731)." The rule is kept in its destination; the orientation and that line now disagree on what the checker does. The admission lists it as outside this workflow.
- **Rows 1016 and 1017** stand in the new text only: no area part holds either (`grep`), so the admission's "not both" is met. `interpreter.md:22` still states the old departure of rows 973 and 966, `u = 0` is `false`, which the new text contradicts.
- **`SKILL.md:134`**, "A conversion never changes which declaration runs when one already fits", disagrees with the new bold rule until the core gets the numeral's exception.
- **Row 1015** is in neither the new text nor `compiler.md`. The admission does not admit it; the writer names its home.

## No failure found

- F-364: the checker's order, the expected type and then the body's type; the example at `x: RR64`; walk's places, unchanged; row 1008 with `meth(): RR64` and "under walk only"; row 1007 for `BIG MIN_MAX` (`Library/FortressLibrary.fsi:2189-2191`, two static parameters; walk runs it, the checker refuses).
- F-366: the order as built, strict subtyping on the declared parameter types, with no P-N on that sentence; `k(5)` and `f(1.5)` (`tests/NumeralMostSpecificWalk`, `compiler_tests/NumeralMostSpecificCompiled`); the tie sentence, which no longer limits the tie to the numerals' positions, with `1.0 s`; "Only a numeral's own coercion" for a value's coercion; both departures, each with its row and its path.
- The three passages that the landing made false (`:101`, `:105`, `:115`) are each replaced.
- Removed and held elsewhere: "No `=` ties a numeral type to a number type (P-174)" is in "A numeral converts where it stands" ("no `=` with a number type"). Removed as false: walk's `false`, the workaround `z: NN32 = 0`, "Write it in every clause form of these four".
- No new sentence says more than F-364, F-366 or its row, apart from failure 1.

## Count

Two admitted findings, in 16 clauses (F-364: 7, F-366: 9); the three passages of "What the landing makes false"; six removed passages of the old part. Four failures: two of scope (1, 2), one of an example the admission names (3), one of a pointer (4).
