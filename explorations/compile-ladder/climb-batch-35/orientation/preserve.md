<!-- The orientation workflow's preservation check, update mode, for climb batch 35: the new orientation.md against the skill's revival-changes.md at 9322330fa8 and the three changes that admission.md admits (F-400; P-165 with F-324; P-174 with P-173, P-40 and F-342). Seven failures, most severe first, then what holds and the count. -->

# Preservation check: climb batch 35, update mode

**Inputs.** The old part: `.claude/skills/fortress-repo/references/revival-changes.md` at `main` `9322330fa8` (34,077 bytes). The new text: `orientation.md` in this folder (34,074 bytes). `diff` of the two changes four lines only: `:32`, `:99`, `:112` and `:116`. Each was read against the entries that `admission.md` admits, each read with `facts-extract.sh`, against `sources.md`, and against the code where a sentence names it. Nothing was run.

## Failures

### 1. "The body runs at compile time" says more than P-174 and P-176, and loses walk's path

- **Old (`:99`):** no sentence on when the body runs.
- **New (`:99`):** "The body runs at compile time and invokes no method."
- **Sources:**
  - P-174: "A coercion's body is a computation at compile time, with no method invocation". This is a property of the body, not a time at which each path runs it.
  - P-176: "the compiler folds the coercion instantiated for it (P-174), and walk runs that coercion at the place's first evaluation". It also says: "otherwise, as at `QQ` or a program's own type, the constructor call on the constants runs once per place, into a `static final` field filled when the class loads".
  - F-341: walk runs the coercion "with the four numbers bound as values of type `ZZ`", and refuses a numeral outside the `where` clause "there when it runs".
  - F-347: on the compiled path, the place is "a JVM constant where the fold ... ends in an `int`, `long`, `float` or `double`, else a static final filled once by the coercion's method".
  - The new paragraph contradicts its own sentence: "Walk refuses it when the binding runs", and "each run of that place reuses it (P-176)".
- **Consequence for a worker:** For `Byte`, the paragraph's own example (a program's own type), neither path runs the body at compile time. A worker who believes it would:
  - expect a static refusal from a coercion body that raises;
  - write a test that asserts one.

  In fact walk fails at the place's first evaluation, and the compiled program stops when the class loads, before `run()` (`compiler_tests/NumeralCoercionRaisesCompiled.test`, in the regression key's case 32, "Scope").
- **Fix:** "The body is a computation from the four numbers that invokes no method (P-174): the compiler folds it, and walk runs it once at the place's first evaluation (P-176)."

### 2. The four numbers' lack of a bound is lost

- **Old (`:99`):** "The coercion's body reads `n`, `r` and `v` as `ZZ` values without a bound, since a numeral's digits fit no fixed width (P-173, P-40)."
- **New (`:99`):** "Each number converts where it stands, into the type that its place fixes, and is a `ZZ` only where nothing fixes a type (P-174, P-173, P-40)." No sentence of the new text says that the four numbers are unbounded (`grep` for "any size", "bound" and "fixed width").
- **Sources:**
  - P-174: "the four are naturals of any size; this implementation's `NN32` bound (P-40) is for sizes".
  - P-40: "a numeral type's four static parameters have none".
- **Consequence for a worker:**
  - A worker who reads the four numbers as sizes applies the `NN32` bound of a size (F-140), or reads `v` at a fixed width.
  - That failure is on record, in the regression key's case 32 trap: the static-numerals patch's `NN64` coercion read `v` through `ZZ64`. It raised `IntegerOverflow` for a `v` of 2^63 or more and stopped a program's load (`compile-ladder/rung-static-numerals/REPORT.md`, section 11, defect 2).
  - Nothing else in the orientation now guards against this. The new text's `:97` excepts "a numeral type's number" from the `ZZ32` of a size, but gives no bound in its place.
- **Fix:** add "The four numbers are naturals of any size, without the `NN32` bound of a size (P-174, P-40)."

### 3. P-174's "refused statically where it does not fit" is lost

- **Old (`:99`):** "So `v.asZZ32` is `ZZ`'s getter, which raises `IntegerOverflow` outside `ZZ32`'s range". This is the outcome, under the old rule, for a number that the place cannot hold.
- **New (`:99`):** "Each number converts where it stands, into the type that its place fixes, and is a `ZZ` only where nothing fixes a type". It gives no outcome for a number that does not fit.
- **Source:** P-174: a number "converts where it stands, as a numeral does (P-173), into the type that its place fixes, and is refused statically where it does not fit".
- **Consequence for a worker:** A worker who writes a coercion without a `where` clause, for example at a `ZZ32` field, has no decided outcome for a `v` beyond the field's range. The worker carries over the old `IntegerOverflow`, which the old text taught, into a test or a checker change, where the rule refuses statically.
- **Fix:** append ", and is refused statically where it does not fit" to the sentence.

### 4. `Number` rule: "the eight" is lost, so the decided getter and the departure read as true of a program's own number type

- **Old (`:112`):** "Each of the eight number types declares its own functional method `asFloat(self): RR64`."
- **New (`:112`):** "Each number type converts into `RR64` by its own getter, `x.asRR64`. The tree departs: each declares `asFloat(self): RR64` instead, so write `asFloat(x)` (F-324)."
- **Sources:**
  - P-165: "`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64` each declare the getter `asRR64`". Its reason: an abstract conversion "would force a program's own number, such as a complex number, to invent a float".
  - F-324 gates `tests/NumberOwnTypeNoAsFloatWalk`, a program's own number type with no `asFloat`.
  - The orientation calls such a type "a program's own number type" (`:89`, P-160).
- **Consequence for a worker:**
  - A worker who declares a program's own number type below `Number` reads "Each number type converts into `RR64` by its own getter". The worker then gives the type an `asRR64`, or an `asFloat` today. That is the invented float that P-165 was decided to spare.
  - "each declares `asFloat`" is false of such a type.
- **Fix:** "Each of the eight number types converts into `RR64` by its own getter".

### 5. The `/` rule loses "the one library's", a scope that an earlier check put in on purpose

- **Old (`:116`):** "convert each `ZZ64` operand with the one library's `asFloat`, as `asFloat(s) / asFloat(n)`".
- **New (`:116`):** "convert each `ZZ64` operand into `RR64`, as `asFloat(s) / asFloat(n)`".
- **Sources:**
  - `sources.md:1557`: "`asFloat` named as the one library's. `CompilerBuiltin.fsi`, which declares no `asFloat` and `asRR64` only on `ZZ32` and `NN32`."
  - The code bears this out. `asFloat(self): RR64` is declared at `Library/FortressLibrary.fsi:321`, `:415`, `:522`, `:589`, `:661` and `:727`, and at `LibraryBuiltin/FortressBuiltin.fsi:66` and `:132`. `CompilerBuiltin.fsi` has no `asFloat`, and a dotted `asRR64(): RR64` at `:268` (`ZZ32`) and `:327` (`NN32`).
  - The new `:112` departure, "The tree departs: each declares `asFloat(self): RR64` instead", cites F-324. F-324 is about "The one library's `Number`", but the new sentence does not say so either. So the orientation no longer names the library anywhere.
- **Consequence for a worker:** The same rule's next sentence turns to the compiled path ("Until the switch-over, the compiler's prelude declares `/` only at `RR64`"). A worker who compiles without `FORTRESS_LIBRARY=one` writes `asFloat(s)` as the orientation says, and gets an undefined name.
  - `compiler.md:149` holds the prelude's side: "Write `i.asRR64` for a `ZZ32` value `i`. The prelude has no `asFloat`".
  - The orientation no longer says that its form is one library's.
- **Fix:** restore "with the one library's `asFloat`" at `:116`, or begin the `:112` departure "The one library departs".

### 6. F-400: the checker's refusal is stated without row 1108, and the code generator's static-parameter condition reaches no part of the skill

- **Old (`:32`):** "Walk refuses at load an `override` that, by this rule, overrides nothing, ... Two departures: the checker accepts such an `override` (row 653), and the code generator refuses every `override` modifier, so a program that writes one does not compile (row 650)."
- **New (`:32`):** "Walk refuses at load, and the checker refuses statically, an `override` that, by this rule, overrides nothing." It says nothing of the code generator.
- **Source (F-400):**
  - The checker "does not check an override in an object expression (row 1108)". Row 1108 says that such an `override` "passes `fortress typecheck`, where walk refuses it at load".
  - "Two forms stay code-generator walls: an override of or by a method with static parameters of its own, and one in a generic type whose parameter types name a static parameter (row 1106) ... So a program may write `override` on the compiled path wherever no static parameter is involved."
- **Destination:**
  - The admission's "Points for the writer" ask for exactly the new sentence, and add no sentence for rows 1106 to 1109 (P-180, `403a0e60cb`). Rows 1106 to 1109 are named "for the coordinator". The ledger holds them (rows 1106 to 1109, checked).
  - Inside the skill, the condition has no destination. The admission's item 4 for the skill writer says only "`references/compiler.md:89`: `override` is now compiled". `compiler.md:89` today says that the code generator refuses `override` (row 650). If it is corrected as item 4 words it, "wherever no static parameter is involved" is in no part.
- **Consequence for a worker:**
  - (a) A worker takes `fortress typecheck` passing an object expression's Java-style `override` as proof that it overrides something, though walk refuses that program at load.
  - (b) A worker writes `override f[\U\](x: U)`, or an `override` in a generic trait at a static parameter, for the compiled path, expecting it to compile. It is refused (row 1106).
- **For the judge:** The writer followed the admission's wording, so this failure is the admission's call against F-400's exceptions. The two choices are these:
  - qualify the sentence with "except in an object expression (row 1108)";
  - or keep the sentence, and have the coordinator send rows 1106 and 1108 into `compiler.md:89`'s correction.

### 7. The departure sentence cites F-342 for walk's half and for the library's form, which F-342 does not hold

- **New (`:99`):** "The tree departs: walk and the checker read each number as a `ZZ`, so they refuse `Byte(v)`, and the library's coercions write `v.asZZ32` (F-342)."
- **Sources:**
  - F-342 is the compiled checker's alone: "A `nat` or `int` parameter read as a value is a `ZZ32`, but a `ZZ` where it is one of a numeral coercion's four numbers ... but not P-174's four numbers, which P-174 converts where they stand (no row)". It names neither walk nor the library's coercions.
  - Walk's half is F-341: the coercion is "run with the four numbers bound as values of type `ZZ`". Walk's refusal of `Byte(v)` was measured only in the regression key's case 32 (`key.md:415`, at `5f35b1d058`).
  - The checker's refusal is "by reading; F-342" (`key.md:415`; `admission.md`, the P-174 row).
  - The library's `v.asZZ32` is P-174's last sentence, and `Library/FortressLibrary.fss:847`.
- **Consequence for a worker:**
  - A worker who follows the citation finds no walk fact in F-342.
  - A worker may take the checker's refusal as tested, though it is inferred.
  - The code generator reads the four numbers as `ZZ` too (F-347), so "walk and the checker" names two of the three readers.

  Each consequence is low.
- **Fix:** cite "(P-174; F-341, F-342)".

### Minor, not counted

- `:32`: "So a Java-style `override` in the library stops every program."
  - In the old text, this followed from walk's refusal at load alone (`sources.md:372`, `:436`, `:440`). Now it follows a sentence that names both paths.
  - No source says that a checker refusal in the one library stops every compiled program. Before the switch-over, the compiled path reads the one library only with `FORTRESS_LIBRARY=one`.
  - A worker would act the same either way. "Under walk, so ..." would keep the scope.

## What holds

- **F-400, the main rule.** Rows 650 and 653 are FIXED in the ledger (`:1010`, `:527`), so deleting "Two departures" is right.
  - The checker's refusal matches F-400's message and its "equal parameter types included" (the rule's "strictly narrower").
  - Walk's own exceptions stay in `interpreter.md:93-97`, which this batch leaves unchanged.
- **P-165.** These are kept, word for word or nearly:
  - The decision, `x.asRR64`.
  - The departure, `asFloat(x)` today with F-324.
  - "can call on a `T` no method or operator ..., this conversion among them".
  - `=` only where a coercion joins two types, `SEQV` otherwise, P-46's numeral at `=`, and `asFloat(x) = y`.

  The text does not cite the prelude's dotted `asRR64()` as P-165's getter, as the admission asked.
- **P-174, P-173 and P-40.** These are kept:
  - `Byte(v)`, "invokes no method", and "converts where it stands ... a `ZZ` only where nothing fixes a type".
  - The departure stated, with no row, as the admission allows.
  - The `where` clause, the refusal of `300` (the checker's statically, walk's when the binding runs), the minus sign, one value for each place (P-176), and the refusal without a coercion.
  - `array1` and `array2`, and the pointer to `interpreter.md` and `compiler.md`.
- **The other passages.** The admission's "checked and still hold" passages (`:93`, `:97`, `:101`, `:105-108`) are unchanged in the `diff`.
- **`sources-mapping.md`.** Its four rows match the `diff`. Its line citations check out: `FortressLibrary.fss:847` is `ZZ32`'s `= v.asZZ32`, and `FortressLibrary.fsi:321` to `:727` are `asFloat(self): RR64`.

## Count

- **Changes:** three admitted changes, carrying seven entries (F-400; P-165 and F-324; P-174, P-173, P-40 and F-342). Each was checked against the four changed passages (`:32`, `:99`, `:112`, `:116`).
- **Entries read for conditions:** F-341, F-347, F-292, F-88, F-323, F-345, P-176, P-180 and P-37 were read too.
- **Lines:** all 136 lines were compared by `diff`. No other line changed.
- **Failures:** seven. Three are in the coercion paragraph (`:99`): 1, 2 and 3. Two are in the conversion into `RR64` (`:112`, `:116`): 4 and 5. One is in `override` (`:32`): 6. One is a citation (`:99`): 7. There is one minor note.
