# Cold read of the climb batch 27 record landing

File read: `explorations/compile-ladder/climb-batch-27/record-landing/clean.txt`, 27 entries (21 facts, 6 positions).
Context used: `CLAUDE.md`; the `fortress-repo` skill's `SKILL.md`; its `references/` compiler.md, interpreter.md, library.md, records.md, gate.md, specification.md, tests-writing.md, tests-running.md and session.md, for terms only. Nothing else.

Terms that several entries use and that the allowed context does not define (each entry below repeats one only where it blocks that entry):

- "rung": not defined anywhere in the skill (library.md uses it once, "When a rung needs it"). Read as a unit of work within a batch.
- "climb batch N": session.md defines a batch as a run of agents that build and test at once; "climb" is not defined. Read as the Nth batch of the compile ladder, which ends in a gate.
- "stage": used both for the gate's count and distance stages and for the checker's steps inside a stage (compiler.md calls the latter "steps").
- "guard", "walk guard": not defined; read from F-308 as a family test that asserts each value against the old glue class's.
- "bare" binding: not defined; read from P-167 ("a bare `builtinPrimitive(\"…\")`") as a declaration whose body is only the `builtinPrimitive` call.
- Entries cited only by number (P-39, P-44, P-58, P-69, P-74, P-75, P-76, P-79, P-85, P-91, P-96, P-146, P-152, P-153, P-157, F-66, F-79, F-233, F-245, F-287, F-298, F-324, F-326, F-328 ...): their content is not in this file. Flagged only where an entry's meaning rests on one.

---

## 1. F-53 (fact): the distance and the count at the last landed gate

- **Established:** At climb batch 27's gate, the last that landed, both numbers are 0. The distance to the switch-over counts the compiled checker's distinct errors over the interpreter's library, running all of the checker's steps on each unit whatever the earlier ones found. The checker count covers only the `FortressLibrary` component and the apis it imports, and stops each unit at its first failing step. The distance's 0 does not cover the body of `value object Char`, whose check crashed (row 929). Climb batch 22 cleared the distance's last five errors: one export mismatch, by editing the api, and four body errors (three sites of row 731 and one in `__bigOperator2`, row 632), by editing library text. The checker gap behind row 731 stays open for user programs and the team demos.
- **Conditions:** The code of climb batch 27's gate. The distance covers fourteen components (since 22c it includes `List`'s imports `CovariantCollection` and `OneShotFlag`). The count's run ends clean and nothing crashes in it. A rise in either number is reported but does not turn a gate red by itself. The count stage can still turn it red on the faults F-66 lists, such as a crash that no rung listed (P-39).
- **Consequence:** A rung that measures either number starts from the last landed gate's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and from `compile-ladder/gate/distance-sites.tsv`, which is empty now. Do not claim the 0 covers `Char`'s body. A user program still meets row 731: the library text was fixed, the checker was not.
- **Evidence:** The gate's tables. `tools/checker-count/run.sh` reads a clean end as 0 since `36ec68cab`. F-54, F-233, F-282, F-285, F-286, F-288, P-39, and the `coordinator` skill's `references/batch.md`.
- **Could not resolve:**
  - "its twelve apis and their twelve components", then "fourteen components in all": does it check 12 apis and 14 components, or 14 of each? F-288 says `CovariantCollection` has an api. Unclear wording.
  - "running every stage of each" and "each unit stops at its first failing stage": "stage" means the checker's steps here, but the same entry also uses it for the gate's stages. Does "unit" mean a component or an api? Unclear wording.
  - "the fused arm of `__bigOperator2`": neither the arm nor what fused means is in the skill. library.md only says that no desugaring calls `__bigOperator2`. A library concept I lack.
  - "by the api's lines": read as "the api's lines were changed". library.md tells a worker to change the component's header to the api's, so which side changed is not certain. Unclear wording.
  - "a crash that no rung listed (P-39)", "the faults that F-66 names": "rung" is undefined, and F-66's list is not given. I cannot tell which faults turn the gate red. Missing referent.

## 2. F-240 (fact): the count and distance stages' times

- **Established:** At climb batch 27's gate, the count stage took about 80 s and the distance stage 144 s, 90 s of that on `FortressLibrary`, at a start load of 0.28. At 15b they took 325 s and 1,075 s; the solver's memos (F-235), not load, explain most of that drop. Between 21b and 22, the count stage rose from about 90 s, because the `FortressLibrary` check began running past its cleared type errors into the export check. It then stayed at 150 to 180 s through 26. Checking every symbolic operator (F-281) added 15 to 25 % to the count stage. At 26, the distance stage took 246 s at load 0.34. At 27 both stages roughly halved, and nothing measured why.
- **Conditions:** One run of each stage per gate. The count's time comes from the gate log's file times, since its table records no seconds. Load can more than double a time: the same code took 217 s at load 3.3 and 574 s at 4.6 to 5.3.
- **Consequence:** Compare a stage's time only with one taken at a like load. Do not credit the halving to the emptied `Number` (F-324) or to the `Char` crash (F-54). Plan on about 80 s and 144 s. compiler.md still says "about 150 seconds" for the count stage, so the skill and this entry now differ.
- **Evidence:** The gate log's file times and `compile-ladder/climb-batch-27/gate/distance.txt`. The batch reviews 16 to 27, by section.
- **Could not resolve:**
  - "Its rise from about 90 s at climb batch 21b's gate": "its" is probably the count stage, but the sentence follows the present 80 s, and 90 s to 80 s is no rise. I read it as the past rise to 150 to 180 s. Unclear wording (tense).
  - "(182 s)" after "246 s": read as `FortressLibrary`'s share, by analogy with "(`FortressLibrary` 90 s)". Not stated.
  - "rung runs that stopped at those errors took 91 s and 99 s": which rung, on which code? Non-blocking.
  - "the file times of the gate's log": read as the modification times of the log files. Wording.

## 3. F-283 (fact): the team demos under walk

- **Established:** All 52 programs that `DemoTests` lists reach their end under walk. Each runs alone from `ProjectFortress/demos`, on an empty input, within 600 s, exits 0 and prints no "fail". `wordcount2` runs from the tree's root, and `tennisRanking` gets the three files that `FileTests.java:806-815` names. The compiled checker still refuses `trips.fss` (row 817).
- **Conditions:** Walk only, measured once on the code of `4445d848b`. `Generator2Demo` draws random arrays, so one stop of it in a run is not a regression.
- **Consequence:** No suite runs the demos. A batch that changes walk or its library must run them again with the driver (P-79) and expect 'demos: 52 run, 52 reached their end'.
- **Evidence:** The driver in `compile-ladder/rung-team-demos/REPORT.md` section 13 and its one recorded output. No gated test.
- **Could not resolve:**
  - "one stop of it in a run is not a regression": "stop" is read as failing to reach its end. Is a stop in two reruns a regression? The entry gives no limit. Wording.
  - "a batch that changes walk or its library": tests-running.md asks this of each change, not each batch. Minor.

## 4. F-323 (fact): the float natives over `Number` and `AnyIntegral`

- **Established:** These natives no longer take `Number` or `AnyIntegral` directly:
  - `random`, `Float`'s `atan2`, `printThreadInfo`, and the `RR64` trait's `^` and `atan2` are declared at `RR64`. Coercion reaches `RR64` from a `ZZ32`, an `RR32` or a numeral; any other number type must write `asFloat(x)`.
  - `Float`'s `^` with an `AnyIntegral` exponent is Fortress code. It uses each type's own `asFloat` and a public bare `^` at a `ZZ32` exponent, bound to `simpleDoubleArith.doublePowInt`.
  - Six bindings name new one-line helpers that compute what their glue did: `Float`'s and `RR32`'s mixed powers, `Float`'s floor and ceiling brackets, and `FlatString`'s `=` and `flatConcat` at a `Char`. `flatConcat` past U+FFFF keeps only the low 16 bits (row 872).
  - `printThreadInfo` of a numeral prints it as a float, `3.0`.
- **Conditions:** Both paths. These are the float family's bindings; F-299 and F-32 give the library's counts.
- **Consequence:** Pass these natives an `RR64` or a type that coerces to it, and write `asFloat` for the rest. Row 872's truncation is kept on purpose.
- **Evidence:** `tests/NativeHelperFloatMixedWalk` and `NativeHelperRationalArgumentWalk`, and `compiler_tests/NativeHelperFamilyFloatMixedCompiled`. The report's sections 1, 5 and 6.
- **Could not resolve:**
  - "group 3's six": no group numbering appears in the entry or the skill. I took the six to be the list in the third sentence, by count. Unclear wording.
  - "converts its exponent by each type's own `asFloat` around a public bare `^` at `ZZ32`": if the exponent becomes an `RR64`, why call a binding at a `ZZ32` exponent? Two readings: a `ZZ32` exponent goes to `doublePowInt` and the others are converted; or every exponent is converted and then narrowed. Unclear wording.

## 5. F-325 (fact): the code generator and type assumptions

- **Established:** The code generator compiles `e asif T` in three places:
  - As a receiver, `(e asif T).m(args)` calls the body of `m` that `T` gives, as a static method of the trait's `DefaultTraitMethods` class, `self` first.
  - In a call whose every dispatched argument is an assumption, it calls the declaration the checker resolved, with no dispatch.
  - Anywhere else, the assumption is the value at type `T`.

  It refuses three forms, each with its own message: a dispatched call that mixes assumed and unassumed arguments ('Can't compile a dispatched call whose arguments are not all type assumptions'), a generic method on an assumed receiver, and an overloaded generic function under an assumption. Walk has its own defects here: the assumption stays on a bound value (row 919), a tuple under one cannot be taken apart (row 920), and a generic method on an assumed receiver stops (row 922). An overloaded method on one runs.
- **Conditions:** Compiled path for the forms above. Walk's three defects stay open.
- **Consequence:** In a compiled program, put `asif` on all dispatched arguments of a call or on none, and keep generic methods and overloaded generic functions out from under `asif`. The `XXX` tests record the refusals.
- **Evidence:** `compiler/codegen/CodeGen.java`, `forAsIfExpr`, `assumedReceiverCall` and `assumedArgumentsCall`. Five tests. The report.
- **Could not resolve:**
  - `asif`, "type assumption": not in the skill. The entry lets me read it as a static ascription that steers which declaration a call picks, but its exact meaning in the specification is a language concept I lack.
  - "dispatched argument": probably an argument at a position where the overloads differ, which dispatch therefore tests. An implementation concept not in the skill.
  - "the assumption stays on a bound value (row 919)": after `x = e asif T`, does `x` wrongly keep the assumed type, or is it kept when the value is bound to a parameter? Which behaviour is the defect is unclear.
  - "an overloaded one runs": read as an overloaded generic method, from the test name `AsIfOverloadedMethodWalk`, not an overloaded generic function. Wording.

## 6. F-327 (fact): the integers' shifts and powers over `AnyIntegral`

- **Established:** For `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, `LSHIFT`, `RSHIFT` and `^` over `AnyIntegral` (and `ZZ`'s `shift`) are plain Fortress. Each converts its count or exponent and calls a public bare `builtinPrimitive` binding that the api declares. The count is a `ZZ32` for `ZZ32`, `NN32` and `ZZ`, and a `ZZ64` for `ZZ64` and `NN64`; the exponent is always a `ZZ32`. Five private functions do the conversion, at `FortressLibrary.fss:714-761` and `FortressBuiltin.fss:392-420`. They keep the old glue's rules: `Int.shiftCount`'s saturation and `Int.powCount`'s handling of sign and parity. A `ZZ` count or exponent is clamped in `ZZ` and then narrowed. Ten helpers are new and five already existed. Under walk, every value matches the old glue's.
- **Conditions:** These five types and these operators.
- **Consequence:** A `ZZ32` count or exponent reaches its bare binding with no conversion. These bindings are part of F-299's helper-binding count. P-69 and P-153 hold on both paths at these declarations.
- **Evidence:** `tests/NativeHelperShiftPowerWalk` and `compiler_tests/NativeHelperFamilyShiftPowerCompiled`. The report's "What changed and why".
- **Could not resolve:**
  - "the 16 count among F-299's helper bindings": read as 16 of F-299's 341. But the entry lists 15 helpers (10 new, 5 existing), and F-299's per-type figures show no 16. Unclear wording.
  - "P-69 and P-153 hold": their content is not given, so I cannot tell what the "Meaning" sentence promises. Missing referent.
  - "saturation", "sign and parity": the rules themselves are not given. Non-blocking.

## 7. F-329 (fact): `Char`'s `asExprString` on both paths

- **Established:** Both paths bind `Char`'s `asExprString` to `nativeHelpers/simpleChar.charToExprString` and write the same text. The parser reads that text back at every code point. The forms:
  - `'\"'` and `'\\'`, and the five escapes;
  - the code alone for the other controls, U+201C, U+201D, U+2028, U+2029, the surrogates and every code point past U+FFFF;
  - for everything else, the character, a space and its code: `'é 00e9'`.

  The parser accepts codes of four to six hex digits (`parser/Literal.rats:460-466`). A character past U+FFFF written as itself does not parse (row 924).
- **Conditions:** Every code point, both paths.
- **Consequence:** Do not write a supplementary character literally in a `Char` literal; use its code. `tests/XXXCharLiteralSupplementary` holds row 924.
- **Evidence:** `tests/NativeHelperFamilyCharWalk`, `compiler_tests/NativeHelperFamilyCharCompiled` and `tests/CharExprStringReadBack`. The report.
- **Could not resolve:**
  - "the five escapes": the entry does not name them. I would guess `\b \t \n \f \r`, by analogy with Java. Wording.
  - "codes of four to six digits in either case": upper- and lower-case hex digits, or both of the two forms (the code alone, and the character with its code)? Two readings. Wording.

## 8. F-54 (fact): the classes of the distance and the crash rows

- **Established:** `explorations/coordinator/tools/distance/classify.py` gives each distance error a root-cause class: X1 for an export error, BR for a big operator's body, and OT for the other body errors, one-off library slips and checker limits. No `distance.txt` from climb batch 24's gate to 27's has `#class` rows. Batch 27's `distance.txt` has two `#crash` rows. The check of `value object Char` crashes in the checker's sort of its candidates, and after that the `FortressBuiltin` component's leftover stage fails (row 929). `FortressLibrary`'s check runs to its end without a crash.
- **Conditions:** Batch 27's gate. The classes are examples ("such as"), not the full list.
- **Consequence:** A reader of `distance.txt` must read its `#crash` rows as well as `#total`. The crash is in `FortressBuiltin`, not `FortressLibrary`.
- **Evidence:** `perf-probes/prelude/distance-triage.md` section 2; `reviews/batch-27-review.md`, section 7, point 6.
- **Could not resolve:**
  - "the checker's sort of its candidates": candidates for what (overload resolution, or a work list)? An implementation concept not in the skill.
  - "the `FortressBuiltin` component's leftover stage": not defined anywhere. Missing concept or unclear wording.
  - "no gate's `distance.txt` ... holds `#class` rows": read as "there were no errors to class", not as "the classifier did not run". Not stated.

## 9. F-281 (fact): the checker checks every operator's overloading

- **Established:** The compiled checker checks the overloading of every operator, symbolic ones included. Its three loops (over the top-level set, a trait's provided methods, and their overriding return types) all read `isCheckedName`, which admits every operator (`OverloadingChecker.scala:766-773`). The export check reads every operator too. With these checks on, the distance and the count are both 0, the distance with two crash rows (row 929). Imports:
  - An on-demand import adds an api's declarations once and leaves out the names its `except` lists.
  - The check still reads an on-demand api's declaration of a name that the component imports by name from another api (row 813).
  - An `except` that lists an operator leaves it imported, on both paths (row 814).

  Outside its trait, a self type whose `comprises` lists types at a `where`-clause variable is read as the trait type (`TypeAnalyzer.selfComprised`), so `AnyList`'s `||` is checked. Such a program still stops in the code generator where a listed generic type gives a member's body (row 812).
- **Conditions:** The interpreter's library under the count and distance stages, and compiled programs.
- **Consequence:** The distance stage is "the full check of F-245". A new symbolic-operator overload in the library is now checked and can raise either number.
- **Evidence:** Five `compiler_tests` and the two stages' outputs ('#total 0' with two `#crash` rows; '#total 0', '#crash none'). The report.
- **Could not resolve:**
  - "each under its declared name only (F-287)": as opposed to which other name? Perhaps an operator's other spelling, ASCII or Unicode. Unclear wording.
  - "the full check of F-245": F-245 is not given, so I cannot tell what "full" adds. Missing referent.
  - The title puts both crash rows "in `value object Char`", but F-54 puts one in `Char` and the other in `FortressBuiltin`'s leftover stage. The entries disagree in wording.

## 10. F-288 (fact): the distance's fourteen components are closed under import

- **Established:** `List` imports `CovariantCollection` and `OneShotFlag` (`List.fss:13`, `:15`). Both are in the distance stage's list (`tools/distance/run.sh:87-90`), and neither imports anything, so the fourteen components are closed under import. Over them the stage reads '#total 0', with two `#crash` rows in `FortressBuiltin`. `CovariantCollection`'s api matches its component, and its `upward` takes its target type from its first argument. The export check matches an object's value parameter by its type and its modifiers other than `var`, not by its name (row 839). Every `ArrayList` holds `OneShot` fields, and every list comprehension goes through `covariantCompr`.
- **Conditions:** The checker only. The distance does not measure the code generator.
- **Consequence:** After the switch-over, `List` compiles only if both imports compile through the code generator too. A component added to the distance's list should bring its imports with it.
- **Evidence:** The distance stage, `compiler_tests/ExportVarObjectParameter`, and `tests/CovariantCollectionArmsWalk.fss` for walk's values. The report's sections 1 to 3.
- **Could not resolve:**
  - What `upward` is, and why its target type matters here: not explained. Non-blocking.
  - "Arms" in the test name `CovariantCollectionArmsWalk`, like F-53's "fused arm": not defined. Wording.

## 11. F-32 (fact): the compiled path cannot reuse walk's glue classes

- **Established:** Of the one library's 443 live native bindings, 102 still name a glue class. A glue class takes walk's boxed values, so the compiled path cannot use it. The other 341 name a static helper of `nativeHelpers/`, which both paths call (F-299).
  - At `a1f8c4b8b`, before any binding moved, there were 449 bindings: 154 whose helper the compiler's prelude already binds at the same owner and signature, so only the string changes (P-58); 59 whose helper exists but under another name or signature, 23 of them under a name the prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more (36 methods of native I/O objects and 42 with no compiled analogue).
  - 29 of the 449 belong to object `IntLiteral` (4 of the 154, 25 of the 158). None can move yet: their helpers take and answer the compiled `IntLiteral`, which no walk value can be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76, row 578).
  - `println` writes through `stdOut`, a Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330).
  - MicroGPT needs `nanoTime`, which names a helper (F-314), and also `getProgramArgsPrim`, which `System` calls as it loads, and `NativeArray`. Those last two have no compiled analogue.
- **Conditions:** The one library today. The four-way split is from `a1f8c4b8b`.
- **Consequence:** The switch-over waits on these 102. Of the 42 with no analogue, `NativeArray` waits for the array decision on the `double[]` store (P-85), and `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path. `IntLiteral`'s bindings stay on glue.
- **Evidence:** `compile-ladder/climb-batch-27/RECORD.md`, "The count of the bindings"; `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md` section 4.
- **Could not resolve:**
  - "live" native bindings: live as opposed to what (not commented out, or reachable)? Undefined.
  - 449 then and 443 now: the six missing bindings are not explained, and the entry does not say how the 154/59/158/78 split maps onto the 102 left on glue. Missing figure.
  - `getProgramArgsPrim` is on microGPT's path and has no analogue, but the closing sentence on the 42 gives no plan for it. Unclear what is to be built.
  - "waits for the array decision ... (P-85)": is P-85 already decided, with the store's form left open, or is the decision itself pending? Two readings.

## 12. F-299 (fact): walk loads helper bindings beside glue classes

- **Established:** Walk's loader (`interpreter/glue/StaticNativeApp.java`) runs a `builtinPrimitive` string that names a `nativeHelpers/` static method. It picks the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. At load it refuses a string that names no helper or fits none, and a declared type that no Java type carries (`self`'s included, read from the declaring type). For `stringOps.typeName` and `equality.sEquiv` it runs walk's own operations instead, from a table in `NativeApp.java` (F-328). The library's own `FlatString` carries `self` in a Java `String`; a program's own type named `FlatString` or `JavaString` carries none. A helper parameter declared `String` is refused at load.
  - Departures: a generic owner's dotted method is checked only when an instance is made (row 864); the declaring type is read, not the value's (row 551); a non-flat string reaches a glue class over `String` as its type name (row 846).
  - The 341 helper bindings, by type, sum to 341, which I checked. The other 102 name glue classes.
- **Conditions:** Walk, at load. This is P-58's walk half; F-298 is its compiled half.
- **Consequence:** Bind over `FlatString`, with a `String` overload that flattens. Expect a load refusal for a misspelt or misfitting helper. Test such a binding with a program that makes an instance.
- **Evidence:** About fifteen walk tests and refusal tests, and one compiled test. Four reports.
- **Could not resolve:**
  - "`NN32` 30, `NN64` 27": F-308 gives `NN32`'s 27 and `NN64`'s 24. I can reconcile the two only by guessing that F-327 added three shift and power bindings to each, which neither entry says. The counts disagree as written.
  - "It builds P-58, 'Every native binding is a ...'": the title is cut off, and P-167 is the only other place that hints at its content. Missing referent, but not blocking.

## 13. F-57 (fact): a numeral's type, and generic code

- **Established:** A numeral's type depends on the path and on the library in scope. The checker types a numeral as `IntLiteral` or `FloatLiteral` by its form (F-79). Walk types an integer numeral by its size, as `ZZ32`, `ZZ64` or `ZZ`, and prints those names (F-328). In generic code, only `x.zero`, `x.one` and the witness `typecase` give a `T` on both paths. A witness `typecase` is a `typecase` over a `() -> T` function, with one clause per number type (P-78).
  - Under `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: a coercion from a numeral into such a `T` cannot be declared, because a generic coercion is refused as a cyclic hierarchy.
  - A numeral bound to `NN32` or `NN64` fails under walk, and `1.5` bound to `RR32` fails on both paths (row 454).
  - No path refuses an out-of-range numeral statically. The compiled run raises `Not in range for ZZ32`, and walk refuses it at the typed binding it does not fit (row 325).
  - Against the specification, walk refuses a numeral beyond `ZZ32`'s range bound to `RR64` (row 443).
- **Conditions:** Both paths, each with its own library.
- **Consequence:** In generic numeric code, write `x.zero`, `x.one` or the witness `typecase`, never a bare numeral.
- **Evidence:** `distance-triage.md` section 2.3 and `evidence-B.md` sections 3.1, 4.1 and 6.2, measured before the numeral switch (F-79). The `x.zero` claim comes from reading, not from a run.
- **Could not resolve:**
  - "measured before the numeral switch (F-79)": the numeral switch is not defined. It matters, because the measurements predate it, and the entry does not say which of them still hold. The evidence is weaker than the title.
  - The getter claim, central to the title, is not measured.
  - "fails under walk" for `NN32` and `NN64`: at load, or at run time? Not said.
  - `Integral[\T\]`: not in the skill; read as the integer algebra trait. Non-blocking.

## 14. F-308 (fact): bindings over `NN32`, `NN64` and `Char` on the compiled path

- **Established:** Where a binding's declaration says `NN32`, `NN64` or `Char`, or an argument is `UnsignedLong`, and the helper has an `int` or a `long` there, the rewrite wraps the value in the matching transfer helper, as the compiler's prelude does. Walk needs no transfer. No transfer is added for a helper overloaded at its arity (row 885) or for `self` in a generic owner. The declared type is read by its simple name (row 886).
  - The transfers are identities, so the checker accepts any helper, signed ones included: `NN32` bound to `intLT` compiles and answers `true` for 2^31 < 1. Only the family tests catch a wrong choice.
  - `NN32`'s 27, `NN64`'s 24, `UnsignedLong`'s 3 and `Char`'s 40 bindings, 94 in all, name helpers; `Char`'s `asExprString` names `charToExprString`. Under walk, 93 of them keep the glue's values, but `NN32`'s and `NN64`'s `DIV`, `REM` and `MOD` by zero now throw `DivisionByZero`.
- **Conditions:** Both stages and compiles. These four types.
- **Consequence:** When binding these types, test at values where signed and unsigned readings differ, on both paths, because the checker cannot catch a signed helper.
- **Evidence:** `NativeHelperTransferCompiled`, the family tests on both paths, and two division-by-zero tests. Two reports.
- **Could not resolve:**
  - "those 93": read as the 94 without `Char`'s `asExprString`, whose text P-163 changed. Not stated.
  - The `NN32` and `NN64` counts disagree with F-299's, as noted there.
  - "walk's object of `NN64`" for `UnsignedLong`: compiler.md calls it the one library's object. Minor.

## 15. F-131 (fact): the flat number tower

- **Established:** `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and `IntLiteral` are siblings under `Number`; none is a subtype of another. `IntLiteral` is the library's type for an integer numeral: the checker gives a numeral that type, and walk gives it `ZZ32`, or `ZZ64` or `ZZ` when it does not fit. Conversions:
  - each wider integer type converts from each narrower one;
  - `RR64` converts from `ZZ32`, `IntLiteral` and `RR32`; a `ZZ64` goes into `RR64` only when the conversion is written (P-74);
  - `QQ` converts from the five integer types and `IntLiteral`;
  - `NN32` does not yet convert into `RR64`, which P-75 decides it will.

  `Number` declares no `=`; each type declares one at each type it coerces from or into. Under walk, `SUM <|1, 2, 3|>` finds no overload (row 432), and an empty `SUM` over an additive group that is not a number dies (row 436).
- **Conditions:** The one library, both paths for the types; walk for the two defects.
- **Consequence:** Never rely on subtyping between number types; write the conversion where none is declared. The `NN32` into `RR64` conversion is still to build.
- **Evidence:** `tests/FlatTowerRungF.fss` gates every type but `RR32` and `IntLiteral`; F-139 and F-79 gate those two. The report.
- **Could not resolve:**
  - "Each wider integer type converts from each narrower one": the order of width between signed and unsigned types (`NN32` against `ZZ32`, `NN32` against `ZZ64`) is not given, so I cannot list the coercions that exist. Missing table.
  - "converts": read as an implicit coercion, following P-74 as library.md states it. Not said.

## 16. F-151 (fact): the element bound of `Vector` and `Matrix`

- **Established:** In the interpreter's library, `Vector`, `Matrix`, their factories and their operators bound the element type by `T extends { Number, MultiplicativeRing[\T\] }`. `Number` declares no arithmetic, so the checker accepts the bodies' arithmetic only through the ring. `Number` stays in the bound although it has lost its `comprises` clause.
  - The four juxtapositions of a vector or matrix with a scalar, in either order, stand beside the library's juxtapositions with a `String`, and the checker finds no error. No report says what now makes them exclude each other.
  - The norm is declared at each of the eight number types.
  - `Number` and `IntLiteral` do not meet the bound, so `Vector[\Number,n\]` is ill-formed. `array1` and `array2` called at `Number` give a plain array, not a vector or matrix (F-229).
  - The checker accepts a call whose argument type is built from the caller's own parameter under the same bound, as in `squaredNorm(me)` (F-227).
  - The scalar extension, eight array-scalar operators, has its own bounds, also with `Number` (F-119).
- **Conditions:** The interpreter's library, both paths for the bound. The gating test runs under walk only.
- **Consequence:** An element type must be a number type that is a ring at itself. Expect a plain array from the factories at `Number`. Why the juxtapositions exclude is an open question.
- **Evidence:** `tests/ArrayElementAlgebra.fss`. `reviews/array-fork2-judgement.md`, which recommended the bound as a default; it landed on the curator's word.
- **Could not resolve:**
  - "It landed when the curator said to land it": is the bound now a decision of the curator, binding on workers, or a worker's default that the curator only allowed to land? It is a fact entry, and there is no P- number. Two readings.
  - "no report says what now makes them exclude": is this a suspected checker gap that a worker should report, or only an unexplained observation? Unclear consequence.
  - "the eight number types": read as `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`. Not listed here.

## 17. F-311 (fact): five types' `asFloat` answers `RR64` through helpers

- **Established:** `Int`, `RR32`, `NN32`, `Long` and `BigNum` declare `asFloat` to answer `RR64`, as each type's api says. They name `intToDouble`, `floatToDouble`, `unsignedIntToDouble`, `longToDouble` and `toDouble`, in that order. Walk's values are unchanged.
  - The team declared the result as `Float`, and there the checker refused the move to a helper ('Function body has type RR64, but declared return type is Float.'). Walk carries both `Float` and `RR64` in a `double` and answers the same `Float` object (F-303).
  - `longToDouble` (`(double) a`) and `toDouble` (`a.doubleValue()`) are new.
- **Conditions:** Both paths.
- **Consequence:** Expect `asFloat` to answer `RR64`, not `Float`.
- **Evidence:** `tests/NativeHelperFamilyAsFloatWalk` and `compiler_tests/NativeHelperFamilyAsFloatCompiled`. The report. The specification, `numbers.tex:49`.
- **Could not resolve:**
  - "The specification: `numbers.tex:49`": what that line says is not quoted. I read it as giving `RR64` as `asFloat`'s result. Wording.
  - "the move": read as moving the binding from glue to a helper. Wording.

## 18. F-318 (fact): walk reads a generic beside a generic trait's functional method on their domains

- **Established:** Walk's load check used to refuse, parameter by parameter, a generic function with its own static parameters beside a functional method of a generic trait that has none of its own. Now it treats the pair as two such generics (`genericPairValid`), with the trait's static parameters standing for the method's own. When it tests whether two domains exclude, the `self` of a directly self-typed trait counts as `C[\X\] & X`: it excludes a type that `C[\X\]` or `X` excludes. "Directly self-typed" means `X` is bounded by the trait at `X`, and the trait has no `comprises` clause or one that lists only `...`.
  - So a program's generic array-number operators load and run beside a self-typed group's own operators, as on the compiled path. In a scratch copy without `Number`'s `comprises`, walk ran `BooleanOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary` and `extendNumber`.
- **Conditions:** Walk at load. A trait self-typed through another self-typed trait, or a method with static parameters of its own, keeps the old refusal. Walk applies no extender rule of P-146, so an object that extends a self-typed trait at a type it is not a subtype of loads and runs one of two fitting declarations (row 893). The checker refuses a generic function more specific than such a method, which walk loads (row 894).
- **Consequence:** This made P-160's removal of the clause possible. Make each extender of `T[\A\]` an `A`.
- **Evidence:** Four gated tests that load and dispatch, and two refusal tests. The report's sections 1, 2 and 4. The code is in `OverloadedFunction.java`.
- **Could not resolve:**
  - "own generic": read as a function with its own static parameters, as opposed to a method that uses its trait's. Not defined. Wording.
  - The four programs ran in a scratch copy "before F-324 removed it from the library". Whether they were run again on the library as landed is not said; the gated tests may cover them. Evidence scope.

## 19. F-34 (fact): the code generator's refusals under the switch-over's setting

- **Established:** Under the switch-over's setting, the code generator refuses 38 declarations of the distance's fourteen components, in 10 kinds, all of which the checker passes. The setting is the distance stage's: the checker's failures caught per declaration, and the bound `Any`. Each declaration is counted at its first wall, and no emitted class was run.
  - Before local functions compiled, the same probe found 47 in 11 kinds. The kinds F-315 removes and the local function no longer occur.
  - Each remaining kind has a ledger row or a plan line: varargs (row 624), the type assumption (row 818, now only the mixed call of F-325), "Not in the trait table" (row 733), and others.
  - On 21b's base, the dispatch generator refused none of `FortressLibrary`'s 178 overload sets.
- **Conditions:** Measured once, on `dbf4825e0`'s code, by `plan-25/probes/codegen.sh`, with its 288 helper strings put back on glue classes. The count on today's code, with F-325's forms compiled, is not measured.
- **Consequence:** After the switch-over, the code generator still stands between the library and bytecode, and 38 is an upper bound that is out of date. No test checks it.
- **Evidence:** The probe's single run. Four reports.
- **Could not resolve:**
  - "and the bound `Any`": what is bound at `Any`: unbounded static parameters, or a generic trait's static argument as compiler.md describes? Two readings. Missing definition.
  - "with its 288 helper strings put back on their glue classes": why the probe did this, and whether it changes the count, is not said. Unclear.
  - 47 in 11 kinds became 38 in 10, which the local function alone explains. Were F-315's three kinds already gone at 47? Unclear.

## 20. F-29 (fact): walk refuses an unlisted extender of the main component's closed trait

- **Established:** Under walk, the load check refuses a trait or object that extends a closed trait, one with a `comprises` clause, of the program's main component when the clause does not allow it. Every trait and object of every component, the library's included, counts as a possible extender. An extender is allowed in three cases:
  - it lies below a listed type;
  - it is a trait whose own clause lists only allowed types;
  - it is a generic trait whose every extender lies below a listed type.
- **Conditions:** Clauses of the main component only. Clauses outside it are not read (row 551), nor an object expression's `extends` (row 597). Nothing checks that each listed type extends the trait at every instantiation (row 598).
- **Consequence:** A check of the library's clauses would refuse every program that imports `Reflect` (row 595), and three team tests and two demos whose objects extend `Exception` directly (row 596). Their repairs must come first and are for the curator to decide.
- **Evidence:** `tests/ComprisesUnlistedExtender` and `ComprisesGenericChildUnlistedExtender`, and the `XXX` tests of rows 487, 551, 597 and 598, which stay green while walk loads their programs. The report's section 5. The specification's "Trait Declarations".
- **Could not resolve:** Nothing blocking. "are the curator's" is read as "are the curator's to decide".

## 21. F-123 (fact): a compiled object's default rendering

- **Established:** A compiled object with no `asString` of its own prints its bare type name, as walk does. A value whose run-time Java class declares `toString`, such as a compiled `RR32`, prints by that method. Open on the compiled path:
  - Through the prelude's `Object`, an object that declares or inherits a zero-argument member named `toString` overflows the stack when printed (row 321). This does not happen through the one library's `Object`, whose `asString` is `self.ilkName`.
  - `asDebugString` and `asExprString` print differently from walk's, and the specification is silent (row 363).

  For a string static argument, walk is wrong: `Cell("s")` prints `Cell[\FlatString\]`, where the specification wants the compiled `Cell[\String\]` (row 364). For a numeral argument, neither path gives the specification's type.
- **Conditions:** The compiled path with the prelude, until the switch-over.
- **Consequence:** In a compiled test, do not name a member `toString`. Do not assert walk's static-argument rendering for strings.
- **Evidence:** `compiler_tests/DefaultRenderRungS`. The report's "Defects and their homes".
- **Could not resolve:**
  - "bare type name": without static arguments, or without field values? The `Cell` example prints static arguments, so I read "bare" as no fields. Two readings.
  - "For a numeral argument neither path gives the specification's type": the specification's type is not named (`IntLiteral`? `ZZ32`?). Missing.

## 22. P-160 (position): the one library's `Number` opens

- **Decided:** The one library's `Number` has no `comprises` clause, so a program may declare its own number type below `Number`. This matches the team's prelude, the specification and the team's `tests/extendNumber.fss`. It was done in two steps. First, walk was made to read the library's array-number `+` and `-` beside `AdditiveGroup`'s own operator, as the checker does (P-152, F-318, row 804). Then the clause was removed (F-324), and with it:
  - QuickCheck got a way to generate a `Number`;
  - `=` and `asFloat` left `Number` (P-165), so a program's number compares by its own `=` or by the library's fallback `=` through `SEQV`;
  - the tests that relied on the clause were repaired.

  `AnyIntegral` keeps its clause (P-44). The reasons: the clause does no work for the checker, which reports 0 errors with or without it, and a vector or matrix of a program's own complex numbers needs it gone.
- **Applies:** The one library, on both paths.
- **Requires:** Do not add a `comprises` clause to `Number`, or rely on one for exclusion or coverage. Keep `AnyIntegral`'s clause.
- **Unfinished:** As written, both steps have landed and nothing is left. The motive, a vector of a program's own complex numbers, rests on complex numbers, which the skill lists as specified but not built. Whether that is a goal of this position is not said.
- **Could not resolve:**
  - "the library's fallback `=` through `SEQV`": where it is declared and at which type (`Any`?) is not given. Not in the skill.
  - "the reflective QuickCheck generator": an unknown component. Non-blocking.
  - F-151 says no report explains what now makes the vector-scalar and `String` juxtapositions exclude, so this position may have left that question open. The two entries are not tied together.

## 23. P-163 (position): `Char`'s `asExprString` reads back at every code point

- **Decided:** For every code point, `Char`'s `asExprString` writes text that the parser reads back as the same character, in the compiled helper's form, completed. `"` and `\` become `'\"'` and `'\\'`. A printable character is written as itself, a space and its code (`'é 00e9'`), Steele's 2011 form. The code alone is used where the parser cannot read the character: the controls, U+201C, U+201D, U+2028, U+2029 and the surrogates. Walk's binding names the same helper (`FortressBuiltin.fss:665`). The parser tries its longer runs of hex digits first, so a six-digit code reads back. The specification's list of character-literal forms is revised, in the revision form (P-96) with an Appendix I entry, to name the redundant form. The reasons: the library's contract "will equal self"; this is the team's later word, from Steele's helper and his parser rule; and other systems write a printable character as itself.
- **Applies:** Both paths, every code point.
- **Requires:** Keep both paths on `simpleChar.charToExprString`; change the form only by a new decision. The specification change follows the revision form.
- **Unfinished:** None stated; F-329 reports the change built. Whether row 924 (a literal character past U+FFFF does not parse) is to be fixed is not said.
- **Could not resolve:**
  - The code-alone list here leaves out the code points past U+FFFF that F-329 includes. Is writing those as the code alone part of the decision, perhaps the "completed" of the title? Unclear.
  - "the peers": other languages? Wording.
  - "with his own two escape cases reached": unclear wording.
  - "about 2K code points": approximate but clear.

## 24. P-165 (position): `asFloat` and `=` leave `Number`

- **Decided:** `trait Number` declares neither `asFloat` nor the `=` built on it. Each of the nine built-in number types, `IntLiteral` included, declares its own `asFloat` into `RR64`, so `asFloat(x)` is unchanged at every concrete type. Two numbers of different types compare by `=` only where a coercion carries one into the other (P-74); otherwise the program writes `asFloat(x) = y`. `Float`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` are declared at `RR64`, and coercion carries `ZZ32`, `RR32` and numerals to them. P-74 stands: an exact conversion is implicit, a lossy one is written. The reasons: the team's prelude declares `Number` empty (`CompilerBuiltin.fss:510`), and the specification's sentence that puts the method on `Number` is the revival's own revision. The curator's rule removes an early idea of the interpreter's library when the specification does not ground it and the later prelude dropped it. And an abstract `asFloat` would force a program's complex number to invent a float.
- **Applies:** The one library, both paths.
- **Requires:** Do not put `asFloat` or `=` back on `Number`. Write the conversion when comparing across types without a coercion. Declare such natives at `RR64`.
- **Unfinished:** The vector norm's form "landed at a worker's default", the norm at each of the eight types. That suggests the curator has not fixed the form.
- **Could not resolve:**
  - "The vector norm takes a bound that promises a float; its form landed at a worker's default": two readings. Either the decision requires a float-promising bound and the per-type declarations stand in until one is built, or the per-type declarations are the decided form. What remains to build is unclear.
  - "`Float`'s `^` at a `Number` exponent ... declared at `RR64`" beside F-323's `^` over `AnyIntegral`, which converts its exponent: one operator or two? Unclear.

## 25. P-166 (position): `ZZ` and `QQ` values are value objects

- **Decided:** Every `ZZ` value (`value object BigNum extends ZZ`) and every `QQ` value (`value object Ratio`) is a value object. The specification's list in `objects.tex` that names arbitrary-precision numbers among the reference objects is revised, in the revision form with one Appendix I entry, to name them among the value objects. By the specification's rule, two `ZZ` values built apart are then `SEQV` when their integers are equal, and so are two equal rationals. The reason: the library's `value` is the deliberate word, and the curator's rule brings the specification's example in line with the code.
- **Applies:** The one library and the specification.
- **Requires:** Keep `value` on `BigNum` and `Ratio`, and treat both as value objects in `SEQV`.
- **Unfinished:** The compiled path's `SEQV` rule for value objects is P-168's work (rows 906 and 907), and its status is not given here. "is revised" does not say whether the specification change is done.
- **Could not resolve:**
  - "`SEQV` converting each into its bits and comparing those": what the "bits" of a `BigNum` are is not said. This looks like a special case for `ZZ`, which P-168 rules out ("no special case for any type"). Unclear.
  - "two equal rationals built apart": equal by value, or by fields? If `Ratio` is not normalised, 1/2 and 2/4 differ in their fields, so the rule would not make them `SEQV`. Two readings.
  - "every `ZZ` value is a value object": this holds only if `BigNum` is the only object below `ZZ`, which is not stated. Unclear.

## 26. P-167 (position): the three natives over `Any`

- **Decided:** `ilkName` and `SEQV` stay bare `builtinPrimitive("…")` bindings, in P-58's form, naming `stringOps.typeName` and `equality.sEquiv`. On the compiled path the helper runs, and its answer defines the operation. Walk's loader holds a table of these two names and answers each with walk's own operation, sharing no implementation; for these two, P-58's walk half bends. One test runs on both paths to keep them in agreement. `Object`'s `asString` becomes the Fortress text `self.ilkName` (P-91's rule). That removes one native and, once the compiled path reads the one library, row 321's stack overflow. The ilk is the trait's name on both paths, such as `ZZ32` and never walk's `Int`, so no program sees or prints walk's native objects. P-168 defines what `SEQV` answers. The reason: the compiled answer is the definition, and walk is brought in line, as in the curator's "do it the way the compiler path does it".
- **Applies:** These three operations, on both paths.
- **Requires:** Keep walk's table to these two names. Keep `asString` as Fortress, not as a native. Never let a walk native object's name show.
- **Unfinished:** Row 321 goes only at the switch-over. F-299 and F-328 suggest the rest is built.
- **Could not resolve:**
  - "ilk": not in the skill, and read as the type name a value reports. "the trait's name": for a program's own object such as `Cell`, is the ilk the object's own name or a trait above it? F-123's "bare type name" suggests the object's name. Two readings.
  - "one test runs on both paths": the test is not named. Missing.
  - "P-91's rule": its content is not given. Missing referent, but not blocking.
  - "the three are the runtime's own operations, not calls into Java helpers" sits beside "name the compiled path's helpers". I read it as intrinsics that a helper implements on the compiled path. Mild contradiction in wording.

## 27. P-168 (position): what `SEQV` means

- **Decided:** `SEQV` follows the specification's rule with no special case for any type (`objects.tex`, "Object Equivalence" and "Value Objects"):
  - values of different types are never strictly equivalent;
  - two value objects of one type are, when their fields are;
  - tuples compare element by element, and floats by their bit patterns;
  - two reference objects are only when they are one object.

  Both paths read the `value` modifier. Strings are reference objects, since `FlatString`, `CatString` and `SubString` lack `value`. So two strings are `SEQV` only when they are one object, and text equality is the strings' own `=`. This overrules the team's code on both paths, walk's `seqv` and the prelude's `===` over `String`. The specification is silent on strings. The reason: the specification's rule read as written, over code its authors called preliminary.
- **Applies:** Both paths, every type.
- **Requires:**
  - Walk drops its equivalence across types (row 909) and its `true` for value objects whose body declares no field (row 113).
  - The compiled `equality.sEquiv` gains the rules for value objects, tuples and floats (rows 906 and 907).
  - The prelude's `===` keeps row 908 until the switch-over.
  - A program with a `value object CC64` tests the rule on both paths, beside the review's 14 cases (F-326).
- **Unfinished:** Whether rows 909, 113, 906 and 907 are already fixed is not said; "Each path changes its own code" reads as either a task or a description. Row 908 waits for the switch-over.
- **Could not resolve:**
  - "Values of different types": the run-time type with its static arguments? Are `Box[\ZZ32\]` and `Box[\ZZ64\]` values of different types? Unclear, and a language concept I lack.
  - Row 113: by the stated rule, two fieldless value objects of one type are `SEQV`, since all of their fields (none) are. So what walk does wrong is unclear. Perhaps walk ignores value parameters, which are fields but are not declared in the body, or perhaps it answers `true` across types. Two readings.
  - "the review's 14 cases": which review is not said. Wording.
  - Whether fields compare by `SEQV` recursively: presumably, but not stated.
