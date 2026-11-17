# Cold read: climb batch 31b, record landing (`clean.txt`)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and the skill's `references/` `compiler.md`, `interpreter.md`, `records.md`, `gate.md`, `tests-writing.md` and `library.md`. 21 entries: 16 facts, 5 positions, in the file's order. Where an entry cites another entry that is in this file, I used it. I could not read any other entry.

## 1. F-34

**Established:** On the source of commit `832f7d0d91`, once a patch is applied, the code generator refuses 24 declarations and emits 745, across the fourteen library components that the distance stage checks. The compiled checker accepts all 24, and no component fails as a whole. Without the patch, the code generator stops three components (`FortressLibrary`, `FortressBuiltin`, `FlatString`) whole, at the wrappers that it makes for their helper classes (row 874). So the measure needs a patched scratch tree. The patch adds naming tables and converters for the one library's built-in types, a search of the trait table over two prelude apis (row 942), and `NN32`'s two getters typed at `NN32` (row 993). The 24, each counted at the first wall that it meets: varargs 8 (row 624); `label` 4 (row 81, fixed since); a type variable missing from the kind environment 4 (rows 822, 812); the range operators over pairs and triples 4 (row 819, fixed since); a closure class written twice 2 (row 315); an intersection type as a receiver 1 (row 540); `atomic` as an expression 1 (row 875, fixed since). Some declarations have a second wall behind the first: behind `SubString`'s `label` is the partial type assumption (row 818). On `7858d0e97b`, where rows 81 and 875 are fixed, the count was 21: varargs 10 (two of them are declarations that met `label` or `atomic` first), the kind environment 4, the range operators 4, the closure class 2, the intersection 1.

**Conditions:** Two commits only: `832f7d0d91`, measured twice with the same result, and `7858d0e97b`, measured once. No count was taken on later code. Row 819 has been fixed since, and so have rows 81 and 875, so today's count is lower by an amount that nobody has measured. The measure skips dispatch methods. It cannot see a class that is emitted and then fails when it loads. The four such walls on that code (rows 990, 991, 992, 732) are fixed since. No emitted class is run, so "emitted" does not mean "runs". The counting setting is the distance stage's (F-53).

**Consequence:** The switch-over alone does not take the library to bytecode: the code generator still refuses declarations of these kinds, varargs most of all. No test or gate stage watches this count, because the gate's distance stage runs no code generation, so a regression would not be seen. To measure it, run `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>` in a scratch worktree.

**Evidence:** That script, run twice on `832f7d0d91` and once on `7858d0e97b`. Detail: `plan-31/PROBES.md` section 3, `switch-rehearsal.md` section 3, `batch-31b-review.md` section 3.

**Could not resolve:**
- "in 8 kinds" (title): the body lists seven kinds, and they sum to the 24 (8+4+4+4+2+1+1). Rows 822 and 812 may count as two kinds, but the body gives them one count. This is unclear wording or a miscount.
- "the checker's failures caught per declaration, and the bound `Any`": I cannot tell what "the bound `Any`" sets. It may be the bound given to an unbounded type parameter, or an option of the checker. Unclear wording; I do not have F-53.
- "the count can be taken only on a patched tree": this is stated in the present tense, but the entry shows it only for `832f7d0d91`. It does not say whether rows 874, 942 and 993 are still open, so I cannot tell whether the patch is still needed today. Unclear wording.
- "naming tables and converters", "the trait table's search over its two prelude apis", "`NN32`'s two getters at `NN32`": I cannot tell which tables, whose two prelude apis, or which getters. The skill names `NamingCzar` but has no "naming tables". Unclear wording.
- "after the switch-over the code generator still stands between the library and bytecode": SKILL.md says the switch-over waits for natives only. The entry does not say whether any later step waits on these 24 walls. Unclear wording.

## 2. F-229

**Established:** The library factories `array1` and `array2` give a `Vector` or a `Matrix` only when the element type is exactly one of the eight number types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64`). At any other element type, `Number` and `AnyIntegral` included, they give a plain array. The choice is a `typecase` with one branch for each number type, over a "witness" of the result type. Each branch builds the array at its type and returns it through `cast`, as `additiveIdentity` does. `Array1` and `Array2` are invariant, so a branch matches only its own type exactly. `Number` and `AnyIntegral` cannot get a vector, because `Vector[\Number,n\]` is ill-formed under the element bound of `Vector` and `Matrix` (F-151). The specification's section "Array Expressions" says that an array of `Number` elements is a vector. That disagreement is row 729, contested. Under walk, a type parameter inferred from a `ZZ32`, `ZZ64` or `RR64` value is that type, so such a call gets a vector.

**Conditions:** Gated under walk only. On the compiled path, the distance stage measures only whether the checker accepts the code; it reports and does not turn the gate red. The conflict with the specification (row 729) is open.

**Consequence:** Do not expect a vector at an abstract element type or at a program's own number type. A program that needs vector operations must use one of the eight types. Changing what `Number` arrays give waits for the curator, because row 729 is contested. The witness is of the result type and not the element type for a reason: a witness of the element type failed when walk's `ZZ32` values were of the native object `Int` (row 722). `Int` is gone (F-379), but the entry does not say whether a witness of the element type would work now.

**Evidence:** `tests/ArrayFactoryNumberTypes`, `ArrayFactoryAbstractNumber`, `ArrayInferredElementVectorWalk`. Detail: `rung-library-factories/REPORT.md` sections 1, 3 and 4.

**Could not resolve:**
- "a witness of their result type": the skill does not define "witness". From "`() -> Int` matched the `ZZ32` branch", I take a witness to be a function value typed at the type under test. This is a library concept that I lack.
- "in `additiveIdentity`'s shape": a library idiom that I cannot see from here. Unclear wording.
- "a type parameter inferred from a `ZZ32`, `ZZ64` or `RR64` value is that type": the entry does not say why only these three of the eight. Either walk infers otherwise for the other five, or the test covers only these three. Two readings.
- "(row 722, the same cast in `openRange`)": this can mean that `openRange` failed the same way, or that it uses the same cast today. Unclear wording.
- "The distance stage measures the compiled checker's acceptance": I take it to mean acceptance of the factories' declarations, but the entry does not name the object. Unclear wording.

## 3. F-299

**Established:** Walk can load a `builtinPrimitive` binding whose string names a static helper under `nativeHelpers/`, as well as one that names a glue class. Of the one library's 401 live native bindings, 373 name a helper. The other 28, `Reflect`'s, name glue classes. The loader (`StaticNativeApp.java`) does four things:
- It calls the Java overload whose Java types carry the declared types, `self` first.
- When a helper raises `fortress.<Api>$<Name>`, it raises the library's `<Name>` instead.
- It refuses at load a string that names no helper or fits none.
- It refuses at load a declared type that no Java type carries, `self`'s included (it reads `self`'s type from the declaring type).

For 15 names, walk loads no helper and runs its own operation instead: 8 through the table `OWN_OPERATIONS` (`stringOps.typeName`, `equality.sEquiv`, and `runtime`'s six), and `arrayOps`' 7 by one rule. The library's own `FlatString` carries `self` in a Java `String`. A program's own type named `FlatString` or `JavaString` carries none. The entry breaks the 373 down by type. The breakdown sums to 373 only if `fromRawBits` is counted apart from `RR64`'s 61.

**Conditions:** Walk only; F-298 gives the compiled half. The 15 names that use walk's own operations are counted among the 373 that "name a helper", but walk does not call a helper for them. The loader's departures from the rules are rows 864, 551 and 846 (`interpreter.md`, "Natives").

**Consequence:** It builds P-58 ("Every native binding is a ..."). A new native is a helper, which both paths run. A binding that names a missing or ill-fitting helper stops every program at load. Only the 28 glue bindings of `Reflect` remain. After a change of bindings, run the listed walk tests and the refusal tests.

**Evidence:** `tests/NativeHelperBindingWalk`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusal tests (`NativeHelperMisspeltWalk` and others). Detail: four reports.

**Could not resolve:**
- "live bindings": the skill does not define "live". I read it as bindings still in the library, as against deleted ones, but it could mean bindings that some program reaches. Unclear wording.
- "eight by the table `OWN_OPERATIONS` …, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335), and `arrayOps`' seven": this reads either as 8 = 2 + 6 (15 in all) or as 8 + 2 + 6 + 7 (23 in all). Only the stated 15 settles it. Unclear wording.
- "`RR64` 61 and the top-level `fromRawBits`": the text does not say whether `fromRawBits` is inside the 61 or extra. Only the sum to 373 settles it: extra. Unclear wording.
- The title says that walk "loads" a string that names a helper, but for 15 of the 373 it loads none. A small inconsistency in wording.
- `printThreadInfo`: here it is a native over `FlatString` beside an overload over `String`. P-162 counts it among the bindings over `AnyIntegral` or `Number`, and P-165 says it is declared at `RR64`. I cannot reconcile the three. Unclear wording across entries.

## 4. F-327

**Established:** For `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, the public `LSHIFT`, `RSHIFT` and `^` that take an `AnyIntegral` count or exponent, and `ZZ`'s `shift`, are plain Fortress. Each converts its count or exponent and then calls a public "bare" `builtinPrimitive` binding that the api declares at a narrow header:
- a `ZZ32` shift count for `ZZ32`, `NN32` and `ZZ`;
- a `ZZ64` shift count for `ZZ64` and `NN64`;
- a `ZZ32` exponent.

Private converters keep the old glue's behaviour: `shiftCount32`, `shiftCount64` and `powerCount32` (`Library/FortressLibrary.fss:800-845`), and `countNN32` and `exponentNN32` (`LibraryBuiltin/FortressBuiltin.fss:234-260`). They keep the shift count's saturation and the exponent's sign and parity. A `ZZ` count or exponent is clamped within `ZZ` and then read by `.asZZ32`. Ten of the helpers are new and five existed before. The 16 bindings (5 types × 3 operators, plus `ZZ`'s `shift`) are among F-299's 373.

**Conditions:** The shifts and powers of these five integer types, at these declarations, on both paths.

**Consequence:** A `ZZ32` count or exponent reaches its bare binding with no conversion. P-69 (a fixed-width shift never goes through `ZZ`) and P-153 (an integer power answers its base's type) hold here on both paths; I read both meanings in P-162. To change this behaviour, edit the Fortress converters, not a glue class.

**Evidence:** `tests/NativeHelperShiftPowerWalk`, `compiler_tests/NativeHelperFamilyShiftPowerCompiled`. Detail: `rung-natives-shift-power/REPORT.md`.

**Could not resolve:**
- "bare binding": the skill does not define it. From P-162, I read it as a declaration whose body is only `builtinPrimitive("…")`, at the narrow header that the compiler's prelude declares. A term that I lack.
- "keep `ZZ32.shiftCount`'s saturation and `ZZ32.powCount`'s sign and parity": I guess that these are methods of walk's old `ZZ32` glue class, that a count out of range saturates, and that a large exponent is reduced to its sign and parity. The entry states neither rule. Unclear wording.
- "every value of the walk guard is the glue's": the skill does not define "walk guard". I read the sentence as "the walk test's expected values are those that the old glue classes gave", but "guard" could be a check at run time. Unclear wording.
- "at a `ZZ32` count (…) or a `ZZ64` count (…) and a `ZZ32` exponent": I take the exponent to be `ZZ32` for all five types, `ZZ64` and `NN64` included. The "and" allows a second reading. Unclear wording.

## 5. F-32

**Established:** The compiled path cannot call walk's glue classes, because they take walk's boxed values. Of the one library's 401 live native bindings, 28 still name glue classes. All 28 are `Reflect`'s, which microGPT does not use.

The rest is the history of how the bindings moved. At `a1f8c4b8b`, before any binding moved, there were 449 bindings:
- 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature; only the string had to change (P-58).
- 59 whose helper exists, but which no binding names under that name and signature. 23 of them are under a name that the prelude gives to another helper, such as the 12 wrapping operators (row 348).
- 158 that needed a new helper.
- 78 that needed more: 36 methods of native I/O objects, and 42 with no compiled analogue.

29 of the 449 belonged to the object `IntLiteral` and left the library with it (F-79). Where some went:
- `println` writes through `stdOut`, a Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330).
- `nanoTime` and `System`'s `args` name helpers (F-314, F-337).
- Of the 42: `NativeArray`'s 7 name `arrayOps` helpers (F-333); `Thread`'s four, `abort` and `printTaskTrace` name `runtime` helpers (F-335); `getProgramArgsPrim` is deleted (P-170); `Reflect`'s 28 still name glue classes.

**Conditions:** The breakdown of the 449 is as of `a1f8c4b8b`. The 401 and the 28 are today's figures.

**Consequence:** Only `Reflect`'s 28 bindings are still on glue. Write a new native as a helper, never as a glue class (`library.md`).

**Evidence:** Report pointers only: `climb-batch-28/RECORD.md`, `natives-shape.md` section 2, `CLIMB-BATCH-23.md` section 4. No test is named.

**Could not resolve:**
- Whether the 28 glue bindings of `Reflect` block the switch-over. SKILL.md says that the switch-over waits until every function bound with `builtinPrimitive` has a binding that the compiled path runs. "Off microGPT's path" suggests that they are exempt, but the entry does not say so. Unclear wording, and this is the consequence that a worker most needs.
- The counts do not reconcile: 449 − 29 (`IntLiteral`) − 1 (`getProgramArgsPrim`) = 419, not 401. The entry does not account for the other 18. Likewise, the 36 I/O methods do not match F-299's 7 + 10 for the writer and the reader. Deletions that the entry does not state.
- No test and no command is named. `records.md` asks a fact without a test to give its command and output. Evidence missing.
- "F-299 holds the 373 that name one, and the 28 by type": F-299 does not break the 28 down by type; it only says that they are `Reflect`'s. Mild.

## 6. F-361

**Established:** This is a one-off experiment on `832f7d0d91`'s code, in a scratch tree that landed nothing. It merged the five number traits (`ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`) with their objects, making each a value object. The merge touched 12 files: the library's text and 78 lines of walk's Java. It touched no checker or code-generator file and no model line. Results:
- The checker count and the distance stayed 0.
- MicroGPT's quick checks passed.
- Of the 830 tests of `ant testSystem`, 829 passed. `XXXGenericBesidePlainReturnParam` passed where a failure was expected, so it was red, and for a wrong reason: walk's load check lost a refusal (row 998).

The merge widened three gaps to all five types:
- row 998;
- row 997, a type parameter bounded by a value type through a trait's generic method (one line of walk fixed it in the scratch tree);
- row 542, the checker's refusal of a valid generic-beside-plain pair over an object domain. This one was established by reading the code, not by a run.

It also found that a `typecase` arm that names a removed object, such as `Int`, matches every value without a message (row 959). On `main` the merge has since landed (F-379), and rows 998, 997, 542 and 550 are fixed.

**Conditions:** Measured once, on `832f7d0d91` only. The compiled tests and `ant testFast` were not run. No test holds the result.

**Consequence:** This is the history of a merge that has landed since; F-379 gives the present state. A worker can take from it that the merge needs no checker, code-generator or model change. Row 959 is not said to be fixed here, and F-379 says that it still holds.

**Evidence:** `plan-31/probes/number-object-merge.md`, "Measurements" and "Obstacles, in the order met".

**Could not resolve:**
- "widens three gaps ... to the five types": I read it as "a gap that showed at some of the types now shows at all five". From "the other two gaps", I take the three to be rows 998, 997 and 542. Rows 550 and 959 are also named, so the count of three is not certain. Unclear wording.
- What this entry is for today, now that F-379 holds the present state: it gives no consequence in the present tense. An unclear purpose, not a missing language concept.

## 7. F-375

**Established:** Walk's load check now judges a generic declaration beside a plain one by the Return Type Rule on their declared domains (`OverloadedFunction.returnRuleAtObjectArguments`). This applies where the plain declaration's domain lies inside the generic one's declared domain and the two parameter lists differ only at object types. Before, the team's shortcut took two different object types to exclude each other. Now such a pair loads if the plain declaration's result lies below the generic one's by one of three readings, which the report gives. If none of the three holds, the pair is refused in the rule's name (row 998, fixed). These are left out:
- A plain declaration that writes no return type is not judged (row 1044).
- No `comprises` clause is read. Row 550's pair at `ZZ64` is fixed only because `ZZ64` is now an object.
- Two plain lists keep the team's shortcut (row 697).

Separately, `FTraitOrObject.enforceValueness` refuses a declared type that is not a value type when it lies below a value type, and it passes the symbolic type of a type parameter (row 997, fixed). With the five number types merged (P-178, F-379), every generic-beside-plain pair over them is read on its declared domains. Walk's suite loads every pair that it loaded before. No expected-failure test moves between a refusal at load and a failure at run time.

**Conditions:** Walk only, at load. None of these choices is the curator's decision. The coordinator chose to read no `comprises` clause and to leave a declaration without a return type unjudged. A worker chose the three readings and the check of value types.

**Consequence:** These choices are not settled rules. If a worker finds evidence against one, SKILL.md's "When to explore" applies: explore and take it to the curator. Walk does not check a library pair whose plain declaration has no written return type, so write the return type. After a change here, run the six walk tests that the entry names.

**Evidence:** `GenericBesidePlainObjectReturnRuleWalk`, `GenericBesidePlainObjectValidWalk`, `GenericBesidePlainEveryInstanceWalk`, `TraitGenericMethodValueBoundWalk`, `OverloadedGenericValueBoundWalk`, `NonValueBelowValueTypeWalk`. Two reports, which run every pair whose verdict changed on the old and the new code.

**Could not resolve:**
- "an own generic's declared domain": I cannot tell what "own" means here: a generic declaration of the same name, or one with static parameters of its own. Unclear wording.
- "by one of three readings that the report gives": the entry does not state the readings, so a worker cannot predict which pairs load without opening the report. Missing content.
- "The coordinator chose": the skill defines no coordinator role; it names only the curator and workers. I take it to mean the coordinating session. Unclear wording.
- Conflict with the skill: `interpreter.md`, "What walk checks", still lists row 550 as an open departure, with `pickFirst` over `ZZ64` refused because `ZZ64` comprises the object `Long`. This entry says that row 550 is fixed. I took the entry as the newer of the two.

## 8. F-378

**Established:** The code generator's calling convention for method parameters:
- A parameter whose declared type is a tuple type becomes one JVM parameter for each element.
- A parameter whose declared type names a type parameter is one boxed JVM parameter at every instance, even an instance that makes it a tuple.

Two bridges join the two shapes:
1. The code generator writes a method with the boxed signature, which takes the tuple apart and calls the body that takes the elements.
2. In an instantiated class, the class loader writes a method that takes the elements, beside the method whose template parameter the instance makes a tuple.

A dotted call passes the tuple boxed where the receiver's type holds only such declarations. So the shape of the one library's arrays of rank 2 and 3 compiles and runs against the prelude. That shape is a generic trait's methods over its index parameter, given bodies at a pair or a triple. The one library's own arrays run compiled only after the switch-over.

**Conditions:** Compiled path. Three shapes still fail: an object's method overloaded at a pair (row 1054), an object with one pair as its value parameter (row 1055), and a generic operator applied to a pair (row 1056).

**Consequence:** A compiled program can rely on index methods at pairs and triples in this shape. Avoid the three failing shapes, or record them as `XXX` tests.

**Evidence:** `compiler_tests/TupleIndexMethodCompiled.test`. Detail: `rung-tuple-parameter/REPORT.md`, which names the bridges' members and lines.

**Could not resolve:**
- "and the class loader, in an instantiated class, a method of the elements beside one whose template's parameter the instance makes a tuple": the verb ("writes") is left out, and "one" could be a method or a class. I reached my reading above only after several passes. Unclear wording.
- "where the receiver's type holds only such declarations": "such" can mean the declarations with a boxed type-parameter parameter or the ones with a tuple-typed parameter. Unclear wording.
- "compiles and runs against the prelude": the prelude has no array types (`compiler.md`), so I take it that a test program rebuilds the shape itself. Unclear wording.

## 9. F-379

**Established:** In the one library and in walk, `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` are each one `value object` (`Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`). Walk builds their native values from a glue class that it finds by a table of the five names (`BuildEnvironments.java:459-470`). The library no longer declares the old objects `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong`, and walk's Java does not use them. What follows from this:
- `asif` at one of the five is the identity.
- A program's `object Mine extends ZZ32` is refused at load: 'Attempt to extend object type ZZ32'.
- A `typecase` arm that names one of the old objects matches every value (row 959).

Walk's load check reads a pair over the five as a pair over object types. So a valid generic-beside-plain pair at `ZZ64` loads (row 550, fixed). Two kinds of invalid pair load too: a plain declaration with no written return type beside a generic one (row 1044), and two plain lists that break "the Subtype Rule" (row 697). Seven of the eight number types are objects; `QQ` is a trait. The compiler's prelude keeps its open traits (row 1003).

**Conditions:** The one library and walk. The compiler's prelude keeps its traits until the switch-over. Rows 959, 1044, 697 and 1003 are open.

**Consequence:** Do not write `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` in a program or in the library: a `typecase` arm at those names silently matches everything. A program cannot extend the five. This entry builds the one-library half of P-178.

**Evidence:** `tests/NumberTypesAreObjectsWalk.fss`, `tests/NumberTypeExtendRefusedWalk.fss`. Detail: `rung-number-objects/REPORT.md`.

**Could not resolve:**
- "the Subtype Rule": the skill does not name this rule; it names the Return Type, Meet and No Duplicates Rules. From the example (`f(x: Number): ZZ32` beside `f(x: ZZ64): String`), it looks like the Return Type Rule. A term that I lack, or unclear wording.
- "the glue class of the type's name": this can mean a glue class named `ZZ32` and so on, or the old `Int.java` and others found through a table of names. The skill's `interpreter.md` and `compiler.md` still name `interpreter/glue/prim/Int.java` and `Long.java`. Two readings.
- Conflict with the skill:
  - `interpreter.md`, "Natives", carries `self` "by the library's objects that extend number types … `Int` (`ZZ32`), `Long` (`ZZ64`) and `UnsignedLong` (`NN64`), `BigNum` (`ZZ`)", and carries `Float` in `double`.
  - `compiler.md` calls `UnsignedLong` "the one library's object that extends `NN64`".
  - `library.md` cites `Float`'s natives.
  - This entry says that the library declares none of them.

  A cold reader cannot tell which is current. I took the entry as the newer source.
- "Seven of the eight number types are objects": the entry names five. I infer that `NN32` and `RR32` were objects already, but the entry does not say so.

## 10. F-380

**Established:** On the compiled path, the checker now converts two kinds of numeral where a declared type fixes the target: a numeral that ends a block after a local declaration, and each numeral element of a tuple. The places that fix a type are a return type, a typed binding, a parameter, and the other branch of an `if`. The checker converts the numeral by the target type's own coercion, so the code generator folds it into a constant. A numeral outside the type's range is refused statically. Where no type is fixed, a block that ends in a numeral after a local declaration keeps the numeral's own type, and a later conversion of "the variable" dies at run time (row 1060).

**Conditions:** Compiled path only. Row 1060 is open.

**Consequence:** A compiled program can now end a typed body in a numeral after a local declaration, or in a tuple with numeral elements. Where no type is fixed, bind the numeral to a typed variable first.

**Evidence:** `compiler_tests/NumeralEndsBlockAfterDeclarationCompiled`, `BlockEndsInTupleOfNumeralCompiled`, `TupleBindingIfBranchesCompiled`, `NumeralJoinBeyondRange.fss` with `XXXNumeralJoinBeyondRange.test`, and `XXXNumeralEndsUntypedBlockCompiled`. Detail: `rung-numeral-block-end/REPORT.md` and `SKEPTIC.md`.

**Could not resolve:**
- "a later conversion of the variable dies": the entry names no variable before this. I take it to be a variable bound to the block's value. Unclear wording.
- Conflict with the skill: `compiler.md`, "Traps of the compiled path", says that a body block with a declared return type dies with `NoClassDefFoundError: fortress/CompilerBuiltin$v` when it ends in a numeral after a local declaration or in a tuple with a numeral element (rows 1014, 1030). It tells a worker to bind the numeral first. This entry says that these cases now convert. I took the entry as newer, but neither source says that rows 1014 and 1030 are closed.

## 11. F-257

**Established:** Under walk, when the load check refuses an overload pair after reading it on its declared domains, its message names the rule that the pair breaks. The three messages:
- "fails the Return Type Rule:";
- "fails the Meet Rule:";
- for the No Duplicates Rule, walk's own "fails because their parameter lists have the same types".

The check reads a pair on its declared domains in three cases:
- The parameter-by-parameter check refuses the pair, and either both declarations have static parameters of their own, or one has them and the other is a plain declaration or a generic trait's functional method with none of its own (F-252, F-27, F-318).
- That check finds a plain declaration inside an own generic's declared domain, excluding it only at object types (F-375).
- The check orders the pair only for the No Duplicates Rule (F-274).

The Return Type and Meet messages contain the words "not found", because walk's reading is narrower than the rules: rows 539, 779 and 1058 are valid pairs that walk refuses. Every other pair keeps the parameter check's message, such as "with generic type, at least one pair of parameters must have excluding types". These are the pairs with a varargs parameter, parameter lists of different lengths, or an error while their instances are read. They are also the pairs of no kind above, such as two functional methods of generic traits, and the pair of instances that an explicit instantiation such as `f[\A, B\]` makes (`XXXGenericOverload2`). The message does not decide which pairs load.

**Conditions:** Walk, at load. This entry concerns the message only, not the verdict.

**Consequence:** A test can match these messages with `load_exception_contains`. A refusal whose message contains "not found" may be a false refusal (rows 539, 779, 1058).

**Evidence:** `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk`, `GenericBesidePlainReturnRuleWalk`, `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk`, `GenericBesidePlainNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk`. Detail: `rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

**Could not resolve:**
- "The first two contain the words 'not found'": the entry does not say where those words sit in the message, or how they show that walk's reading is narrow. I guess something like "no covering declaration found". The report gives the messages whole. Unclear wording.
- "an own generic's declared domain": as in F-375, I cannot tell what "own" means. Unclear wording.
- "parameter lists of different lengths": `interpreter.md` says that walk checks lists of different lengths only where one of them has a varargs parameter. This entry lists them as a separate kind. Mild.

## 12. F-240

**Established:** At the last landed gate, climb batch 31b's, the count stage took about 85 s and the distance stage about 150 s (`FortressLibrary`'s share of it was 96 s). The history of these times:
- At climb batch 15b's gate the two stages took 325 s and 1,075 s. The solver's memos (F-235) explain most of the drop since.
- One of the stages (the count stage, by my reading) rose from about 90 s at climb batch 21b's gate to between about 150 s and 180 s from climb batch 22 to 26. The cause was the `FortressLibrary` component's check, which now runs to its end, past its cleared type errors into the export check. Rung runs that stopped at those errors took 91 s and 99 s; runs that went past them took 149 s and 151 s.
- Since climb batch 21b, the checker checks every symbolic operator (F-281). This costs the count stage about 15 to 25 %.
- Both stages about halved at climb batch 27's gate. No run measured why.

At 31b, the distance stage started at a load average of 0.31 and then ran beside the first minutes of `testFast`. At climb batch 31 it took 143 s (86 s for `FortressLibrary`) at a load of 0.08. Load can more than double a time: climb batch 16's code took 217 s at a load of 3.3 and 574 s at 4.6 to 5.3.

**Conditions:** One run of each stage at each gate. The count stage's time comes from the file times of the gate's log, because its table records no seconds. A time compares only with one taken under a like load.

**Consequence:** Do not call a difference in time a regression without a comparison under a like load. Expect the count stage to take about 85 s (`compiler.md` gives 80 to 180 s), and run it in the background.

**Evidence:** The file times of the gate's log, and `climb-batch-31b/gate/distance.txt`. Detail: twelve batch reviews.

**Could not resolve:**
- "Its rise from about 90 s at climb batch 21b's gate": "Its" can be either stage, since the sentence before names both. The same holds for "it stayed between about 150 s and 180 s". Only working through the numbers (85 s now, and a halving at 27 from 150 to 180 s) points to the count stage. The reason that the entry gives (the `FortressLibrary` component's check running to its end) fits either stage. Unclear wording.
- "the distance's check stopped at `Char` (F-54)": I cannot tell what stopping at `Char` means. Unclear wording; I do not have F-54.
- "(`FortressLibrary` 96 s)", "143 s (86 s)": I read each parenthesis as `FortressLibrary`'s share of the time. Probably right.

## 13. F-285

**Established:** The interpreter's library writes the static argument explicitly in two kinds of place:
- every "clause form" of a big operator whose bound names its own parameter, such as `SUM` or `BIG MIN`;
- every list comprehension.

This holds in "the twelve components the distance checks". It follows P-78. The sites are:
- `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4665`, `:4671`);
- `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`);
- the arguments that were already written: `SUM[\T\]` at `:2804`, `:3190`, `:3195`, `SUM[\ZZ32\]` at `:4849`, `:4866`, and the team's `transpose` (`List.fss:504`).

Some clause forms stay unwritten: those of big operators with a plain bound (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, and those of `BIG LEXICO`, which has no static parameter. `__bigOperator2`'s "fused arm" (`:1670`) casts its result to `O0` with the library's cast device, because the `typecase` cannot show that arm's type (F-264). `__builtinFactory1`'s `N[\0\]` arm (`:2824`) does the same. So the distance reports no error at an unwritten argument or at the fused arm. The checker now infers such an argument itself (F-364), but the library's sites stay written. Under walk, the written comprehension makes `List`'s strided subscript return a `List[\E\]`. `PureList`'s strided subscript (`Library/PureList.fss:73`) returns a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824).

**Conditions:** The library's components that the distance checks. Under walk, row 824 is open for `PureList`.

**Consequence:** In library code, write the static argument of a big operator whose bound names its parameter, and of a list comprehension (P-78; `library.md` says the same for `SUM`). Do not remove the written ones, even though the checker can now infer them. Use the cast device for a `typecase` arm whose type cannot be shown, as the fused arm does.

**Evidence:** The distance stage (`explorations/coordinator/tools/distance/run.sh`, whose count of the typecheck kind is 0), `tests/WrittenReductionArgumentsWalk`, `tests/NestedReductionFusion`, `tests/PureListStridedSubscriptWalk`. Detail: `rung-body-arguments/REPORT.md` sections 3, 5, 7 and 9.

**Could not resolve:**
- "clause form": the skill does not define it. I read it as a big operator applied over generator clauses, `BIG OP[gens] body`, as against some other form, but I cannot tell what that other form is. A language concept that I lack.
- "the twelve components the distance checks": `compiler.md` says that the distance checks fourteen. This may mean the twelve of the fourteen that hold such forms, or it may be a stale count. Unclear wording.
- "fused arm" and `O0`: `library.md` says that no desugaring calls `__bigOperator2`. The entry does not say what calls it, or when the fused arm runs. `NestedReductionFusion` suggests nested reductions. I read `O0` as a static parameter of `__bigOperator2`. A library concept that I lack.
- "answers a list of objects at their elements' run-time types": "objects" can mean a program's object values or any values. The entry also does not say whether `PureList`'s comprehension is the unwritten one. Unclear wording.
- "cast device": I read it as the library's `cast` function, as in F-229. Mild.

## 14. F-75

**Established:** The compiled checker checks two overloading rules:
1. The Return Type Rule, over every instance of the pair, with one exception. Where the less specific declaration has a type parameter as a whole parameter type, and the more specific one has an object type in that place, the rule leaves out the instances of the less specific declaration whose domain cannot meet the other's.
2. A positional rule. When two generic declarations, one more specific than the other, declare the same number of static parameters of their own, those parameters must agree in kind, position by position. The more specific return type must be a subtype of the other's, once the other's static parameters are read as its own by position.

So `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, where `Circle` is an object, is accepted and runs (row 542, fixed; F-376). At a tuple of object types the rule still compares the instances that cannot meet, so it wrongly refuses `ident(x: (Circle, Circle)): (Circle, Circle)` (row 1048). In the interpreter's library, with the number types merged with their objects (P-178, F-379), neither rule refuses a pair: the distance holds no return-type or overloading error (F-53). This builds P-45.

**Conditions:** The compiled checker. Three choices are not the curator's decisions: the scope of equal counts and the comparison of kinds (the rung's choices), and the width of the exception (a worker's). The type group's 2011 paper sets aside every instance whose domain is `Bottom`.

**Consequence:** A program can declare a generic beside a plain declaration at an object type. Avoid a domain that is a tuple of object types (row 1048). The three choices above are open to new evidence, which is a reason to explore.

**Evidence:** `compiler_tests/OverloadGeneric*`, `OverloadBoundNamesForced`, `OverloadReturnObjectDomain`; the `XXX` tests that pin the right refusals and row 1048's wrong one. Detail: `rung-return-type-rule/decision-record.md` sections 1 and 2, `rung-return-rule-object/REPORT.md`.

**Could not resolve:**
- "the rung's choices": the skill does not define "rung". The compile ladder in `gate.md` records phases, not rungs. I read a rung as the unit of work that made the change, so its choices are not the curator's. Unclear wording.
- The title says "save those whose domain cannot meet an object type", but the body gives a narrower condition: only where the less specific declaration has a type parameter as a whole parameter type. The title alone would mislead a reader. Unclear wording.
- "The type group's 2011 paper (`Papers/Types/`) sets aside every instance whose domain is `Bottom`": the entry does not say whether this agrees with the narrower exception that is built. The paper's rule looks broader, and it would set aside row 1048's tuple case. The entry does not say whether this is a conflict for the curator. Unclear wording.
- "`XXX…` which pin the two rules' right refusals": `tests-writing.md` defines an `XXX` test as one that asserts the specification's answer and fails today. Here the `XXX` prefix marks a refusal that is correct. I read the prefix as "the compile must fail". The skill does not explain this convention.

## 15. F-139

**Established:** `RR32` is a sibling of `RR64` under `Number`, and `RR64` converts from `RR32` by coercion. Nothing converts into `RR32`. Under walk, an operation on two `RR32`s gives an `RR32`. An `RR32` with an `RR64`, a float numeral or a `ZZ32` gives an `RR64`. A typed binding converts an `RR32`, but a declared return type does not (row 387). On the compiled path, `=` at the prelude's `RR32` overflows the stack (row 528), and an operation on two `RR32`s gives an `RR64` (row 529).

**Conditions:** Walk's results are with the one library. The compiled results are with the compiler's prelude, which stays until the switch-over. Rows 387, 528 and 529 are open.

**Consequence:** Do not compare `RR32` values with `=` on the compiled path. Under walk, convert an `RR32` explicitly at a return. Expect an `RR64` when `RR32` is mixed with another type.

**Evidence:** `tests/RR32SiblingRungV.fss` (walk). Detail: `rung-rr32-sibling/REPORT.md` sections 1 and 11. No test is named for the compiled rows 528 and 529.

**Could not resolve:**
- "Nothing converts into `RR32`": a numeral does convert into `RR32` (`compiler.md`: "`RR32` only a numeral"). So "nothing" must mean "no other number type". Unclear wording.
- "answer": I read "two `RR32`s answer an `RR32`" as "an arithmetic operation on two `RR32`s gives an `RR32`". The entry does not say which operators. Unclear wording.
- "A typed binding converts an `RR32`": the entry does not give the target type. I take it to be a binding typed `RR64`. Unclear wording.
- The entry does not say whether rows 528 and 529, which are at the prelude's `RR32`, end with the switch-over.

## 16. F-140

**Established:** A size is a static parameter of kind `nat` or `int`. A size beyond its kind's range is refused:
- by the compiled checker, when the size is a literal or folded from literals. The ranges are 0 to 4294967295 for `nat`, and `ZZ32`'s range for `int`;
- by walk, at run time, when it binds the size to a static parameter.

Walk reads and computes sizes exactly, with no wrap. A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above. The checker types such a value `ZZ32` (P-173, F-342). The compiled class loader checks no size that it computes at instantiation: `next[\nat k\]()`, which builds a `Box[\k + 1\]`, gives 4294967296 at `k = 4294967295` (row 675; F-222). This builds P-40.

**Conditions:** The checker refuses only sizes that are literals or folded from literals. Two gaps are open:
- Under walk, an array of a static size from 2^31 to 2^32-1 stops at its store's factory with an error that no `catch` sees (row 527).
- Row 962, contested: a `nat` or `int` size of 2^31 or more, read as a value, raises a `java.lang.Error` on the compiled path that no `catch` sees. Under walk it is a `ZZ64`, although P-173 makes it a `ZZ32`. No decision says where such a size is refused. Under walk, a return declared `ZZ32` passes such a size on as a `ZZ64`.

**Consequence:** Assert no value for a size of 2^31 or more (`compiler.md` and `interpreter.md` say the same). Do not rely on the class loader to check a size that it computes. Row 962 is contested, so it waits for the curator.

**Evidence:** `tests/NatBigSizeWalk` for walk's reading. The refusals are gated by `compiler_tests/XXXNatRangeChecker`, `XXXNatArithRangeChecker` and `NatRtBigSize`, and by `tests/XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk` and `XXXNatArithSumWalk`. Each `XXX` test passes because its program is refused. Detail: `rung-size-range/REPORT.md` sections 6 and 12.

**Could not resolve:**
- "`NatRtBigSize`" is listed among the refusals, but it has no `XXX` prefix, and the body names no compiled refusal at run time; it says that the class loader checks nothing. I cannot tell what this test refuses or checks. Unclear wording.
- "each `XXX` test passes because its program is refused": the prefix marks a correct refusal here, not a defect. That is not the skill's definition of an `XXX` test, the same question as in F-75. The convention is unclear from the skill.
- "and is a `ZZ64` under walk, where P-173 makes it a `ZZ32`": I read "where" as "whereas". Then P-173 types the value `ZZ32`, which cannot hold it, and so the place of refusal is undecided. Unclear wording, which I resolved by reading it twice.

## 17. P-68

**Decided:** On the float types, `floor` and `ceiling` return the same float type. The brackets ⌊x⌋ and ⌈x⌉, `round` and `truncate` return `ZZ`, the unbounded integer. So `floor(2.5)` is the `RR64` value 2.0, and ⌊2.5⌋ is to be the `ZZ` value 2.

**Applies:** The library's declarations of these operations on the float types, on both paths, once the switch-over has happened.

**Requires:** The change is one library rung, held by row 330, after the switch-over. The rung first counts the interpreter tests whose output changes. Then it makes the brackets, `round` and `truncate` return `ZZ` in each of the library's declarations of them. I infer that a worker must not change these return types before the switch-over, but the position does not say so directly.

**Unfinished:** All of it. Today `truncate` is `ZZ64` on both paths, the brackets are `ZZ64` under walk and `RR64` on the compiled path, and `round` is `ZZ64`.

**Could not resolve:**
- "one library rung after the switch-over": the skill does not define "rung". I read it as one unit of library work, scheduled after the switch-over. The position does not state whether earlier work is forbidden or only not planned. Unclear wording.
- "`round` is `ZZ64`": the position does not say on which path, or whether on both. Two readings.
- "On the float types": it does not say whether this means `RR32` and `RR64`, or `RR64` alone. Its examples are all `RR64`.
- The position does not say whether `floor` and `ceiling` already return the float type today; its "today" list leaves them out.
- P-162 gives `RR64`'s floor and ceiling brackets a new helper. This position does not say whether that helper answers `ZZ64` now and `ZZ` later.

## 18. P-166

**Decided:** The values of `ZZ` and of `QQ` are value objects. The library already declares `value object ZZ` (`Library/FortressLibrary.fss:1170`) and `QQ`'s object `Ratio` as a `value object` (`:719`). By the specification's rule, two value objects of one type are strictly equivalent when their fields are. So two `ZZ` values built apart are `SEQV` when their integers are equal; `SEQV` converts each into its bits and compares those. Two equal rationals built apart are `SEQV` in the same way. The specification's list in `Specification/basic/objects.tex` ("Reference objects include arbitrary-precision numbers") is to name these numbers among the value objects instead. Why: the library's `value` declaration is the deliberate word, and the curator's rule brings the specification's example in line with the code.

**Applies:** `ZZ`, `QQ`'s `Ratio`, `SEQV` on them, and that sentence of the specification.

**Requires:** Revise the specification's sentence in the revision form (P-96), with one Appendix I entry. Treat `ZZ` and `QQ` values as having value semantics, with no identity of their own.

**Unfinished:** The position does not say whether the revision of the specification is done. It also does not say whether `SEQV` compares `ZZ` and `QQ` values by value on both paths today. P-162 says that walk compares numbers by value and the compiled helper compares references, and that P-168 settles what `SEQV` means.

**Could not resolve:**
- "is revised": this can mean already revised or to be revised. Two readings.
- "`SEQV` converting each into its bits and comparing those": I cannot tell how an unbounded integer or a rational converts "into its bits", or whether this describes today's `SEQV` or the intended one. Unclear wording.
- "the curator's rule": the position does not say which rule. P-165 states a different rule. Unclear wording.
- On the compiled path: `compiler.md` says that the compiled `SEQV` reads the mark that `value` adds, but the compiler's prelude keeps its number traits until the switch-over (F-379, row 1003). I cannot tell whether this position holds on the compiled path before then.

## 19. P-162

**Decided:** 30 native bindings cannot reach a bare helper. They are handled in four ways:
1. The 20 over `AnyIntegral` or `Number`: the shifts and powers of the five integer types (16), `RR64`'s power, `random`, `atan2` and `printThreadInfo`. Each keeps its public header, converts its argument in Fortress, and calls a public bare `builtinPrimitive` binding (P-58) at the narrow header that the compiler's prelude declares. This is "the team's pair". The bare half is private where a stage refuses a pair. Such a pair keeps P-58's form, and climb batch 26's five pairs over `FlatString` (F-299) follow this pattern.
2. The 6 over carried types with no fitting helper: `RR64`'s floor and ceiling brackets, the mixed powers of `RR64` and `RR32`, and `FlatString`'s `=` and `flatConcat(self, b: Char)`. Each gets a new one-line Java helper.
3. `ZZ32`'s `big` names the existing helper `makeZZfromZZ32`.
4. `Object`'s `asString` and `ilkName`, and `SEQV` over `Any`, leave their glue classes by P-167's way. P-168 settles what `SEQV` means.

The counts add up: 20 + 6 + 1 + 3 = 30. A shift count keeps any integer type, a fixed-width shift never goes through `ZZ` (P-69), and each integer power answers its base's type (P-153). Why:
- The team moved this conversion into Fortress in 2008.
- The prelude of 2011 and 2012 converts around narrow helpers and never binds a native at `AnyIntegral` or `Number`.
- The model's power calls, all at a `ZZ32` exponent, reach a bare binding with no extra call.
- For the six, a helper is one call that the JIT inlines whole, where a composition in Fortress is two or three calls and a temporary box (F-301, F-302).

**Applies:** These 30 bindings of the one library, on both paths.

**Requires:** Never bind a native at `AnyIntegral` or `Number`. Convert in Fortress around a bare binding at the prelude's narrow header. Write a one-line helper for each of the six. Keep P-58's form, and P-69 and P-153.

**Unfinished:** The position does not say what is done. From other entries: the 16 shifts and powers are done (F-327), and `random`, `ilkName` and `SEQV` over `Any` name helpers (F-299). I cannot tell the status of `asString`, `atan2`, `RR64`'s power, the six helpers and `ZZ32`'s `big`.

**Could not resolve:**
- "no bare helper reaches" and "bare binding": the skill does not define "bare"; see F-327. A term that I lack.
- "with the bare half private where a stage refuses a pair": I cannot tell which stage (the count stage, the distance stage, or walk's load check) or why it refuses. So I cannot tell when the bare half is public and when private. Unclear wording.
- "the defect that group 2 still shows at a rational": nothing defines "group 2". Unclear wording.
- `printThreadInfo` is "over `AnyIntegral` or `Number`" here. F-299 calls it a native over `FlatString` beside an overload over `String`, and P-165 declares it at `RR64`. I cannot reconcile the three.
- P-165 declares `RR64`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` at `RR64`, with coercion carrying narrower types to them. Here those four "keep their public headers" and convert in Fortress. I cannot tell whether P-165 refines this position or replaces it for those four. A conflict between the positions as I read them.
- "the mixed powers of `RR64` and `RR32`": the position does not give the signatures. Unclear wording.

## 20. P-165

**Decided:** `asFloat`, and the `=` built on it, leave `trait Number`. Each of the eight built-in number types keeps its own `asFloat`, so `asFloat(x)` into `RR64` is unchanged at every concrete type. The numeral types declare none, since no numeral value exists when a program runs (P-174). Two numbers of different types compare by `=` only where a coercion carries one into the other (P-74). Otherwise the program writes the conversion, as `asFloat(x) = y`. The vector norm takes a bound that promises a float. Its form is the default of a fork on "his review list": the norm at each of the eight number types, each by its own `asFloat` (F-324). `RR64`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` are declared at `RR64`, and coercion carries `ZZ32`, `RR32` and numerals to them. The specification's sentence (`Specification/basic-lib/numbers.tex:58-75`) follows this. P-74's rule still stands: an exact conversion is implicit, and a lossy one is written. Why:
- The team's compiler prelude declares `Number` with nothing in it (`CompilerBuiltin.fss:509`).
- The specification does not ground the method: its sentence that names `asFloat` on `Number` is the revival's own revision.
- The curator's rule for such a case: an early idea of the interpreter's library goes where the specification does not ground it and the later prelude eliminated it.
- With `Number` open (P-160), an abstract `asFloat` would force a program's own number type, such as a complex number, to invent a float, and `Number`'s `=` would then compare two different complex numbers by it.

**Applies:** `trait Number`, the eight number types, the numeral types, the vector norm, and the four functions declared at `RR64`.

**Requires:**
- Declare no `asFloat` or `=` on `Number`, and give no numeral type an `asFloat`.
- Compare numbers of different types only through a coercion or a written conversion.
- Declare those four functions at `RR64`, not at `Number`.

**Unfinished:** The norm's form is a default that waits for review. The position does not say whether the specification's sentence is already revised. F-240's "the emptied `Number` (F-324)" suggests that the removal itself is done.

**Could not resolve:**
- "his review list": the position does not say whose list. I guess the curator's, but the record names no one elsewhere. Unclear wording.
- "The vector norm takes a bound that promises a float; its form is the default of a fork …: the norm at each of the eight number types": this describes two forms, one generic over a bound that promises a float and one overloaded at each of the eight types. I cannot tell which one is decided. Unclear wording.
- "the default of a fork": I read it as an open choice whose default holds until review. Unclear wording.
- "`RR64`'s `^` at a `Number` exponent … declared at `RR64`": I read it as the exponent parameter becoming `RR64`. Then a `ZZ64` exponent needs a written `asFloat` (`library.md`: `ZZ64` converts into `RR64` only explicitly). The position does not say so.
- `printThreadInfo` declared at `RR64`: this does not fit its name or F-299, where it is a native over `FlatString`. Unclear.
- "goes" in the curator's rule: I read it as "is removed". An idiom.
- "The specification's sentence follows": this can mean already revised or to be revised. Two readings.

## 21. P-163

**Decided:** `Char`'s `asExprString` writes, for every code point, a text that reads back as the same character. The form is that of the compiled helper `nativeHelpers/simpleChar.charToExprString`, completed:
- It escapes `"` and `\` as `'\"'` and `'\\'`.
- It writes a printable character as itself followed by its code, the redundant form `'é 00e9'` that Steele built in 2011.
- It writes the code alone where the parser cannot read the character: the controls, U+201C, U+201D, U+2028, U+2029 and the surrogates.

Walk's binding (`LibraryBuiltin/FortressBuiltin.fss:409`) names that helper, as P-58 asks of every native binding, so both paths write the same text. The parser tries its longer choices of hexadecimal digits first (`parser/Literal.rats:460-466`), so a six-digit code reads back. The specification's list of character-literal forms (`Specification/basic/lexical-structure.tex:860-891`) is revised in the revision form (P-96) to name the redundant form, which the parser has read since 2011, with an Appendix I entry. Why:
- The library's contract, the team's comment "will equal self", holds at every code point only with the code alone or with this form.
- This form is the team's later word: Steele's helper, and the parser rule that he wrote with it in one commit.
- The peers write a printable character as itself, where the code alone would hide it.

The compiled path's text changes at about 2K code points, and walk's at every code point outside printable ASCII. No library code, suite test or model line calls a `Char`'s `asExprString`.

**Applies:** `Char`'s `asExprString`, on both paths; the helper; the parser's rule for hexadecimal digits; and the specification's list of character-literal forms.

**Requires:**
- Make the helper write the three cases above.
- Bind walk's `asExprString` to that helper.
- Make the parser try its longer choices of hexadecimal digits first.
- Revise the specification's list in the revision form, with one Appendix I entry.

**Unfinished:** The position does not say what is done. "Changes at about 2K code points" suggests a change still to come. The citations of `FortressBuiltin.fss:409` and `Literal.rats:460-466` read as if some of it has landed.

**Could not resolve:**
- "the compiled helper's form, completed": I cannot tell which parts the helper already has and which parts complete it. "With his own two escape cases reached" suggests that the escapes for `"` and `\` existed but could not be reached. Unclear wording.
- "his own two escape cases reached": I read "reached" as "made reachable", but the position does not say what blocked them. Unclear wording.
- "the code alone": the position does not give the exact text of this form (for example `'00e9'`, or `'é'`). A language concept that I lack; the lexical-structure chapter would give it.
- "the peers": I read this as other programming languages. Unclear wording.
- Status: the same two readings, done or to do, as in P-166 and P-165.

## Summary

| Entry | Verdict |
|---|---|
| F-34 | Blocked in part. The title says 8 kinds, but the body lists 7 that sum to 24; "the bound `Any`" is opaque; I cannot tell whether the patch is still needed today. |
| F-229 | Mostly clear. "Witness" is undefined; it does not say why only `ZZ32`, `ZZ64` and `RR64` infer to a vector. |
| F-299 | Mostly clear. The grouping of the 15 own-operation names and the place of `fromRawBits` resolve only by arithmetic; "live" is undefined; `printThreadInfo` conflicts with P-162 and P-165. |
| F-327 | Mostly clear. "Bare binding" and "walk guard" are undefined; the saturation and the sign-and-parity rules are not stated. |
| F-32 | Blocked in part. It does not say whether `Reflect`'s 28 glue bindings hold up the switch-over; 449 does not reconcile with 401; no test or command is given. |
| F-361 | Clear as history. Which three gaps are meant is unsure; it states no present-day consequence. |
| F-375 | Blocked in part. The "three readings" are not stated; "own generic" and "coordinator" are unclear; it conflicts with the skill's `interpreter.md` on row 550. |
| F-378 | Clear after rereading. The sentence on the second bridge has an elided verb and an ambiguous "one"; "such declarations" is ambiguous. |
| F-379 | Clear, but conflicts with the skill (`interpreter.md`, `compiler.md` and `library.md` still name `Int`, `Long`, `UnsignedLong`, `BigNum` and `Float`). "The Subtype Rule" is undefined; "glue class of the type's name" has two readings. |
| F-380 | Clear, but conflicts with `compiler.md`'s trap for rows 1014 and 1030. "The variable" has no antecedent. |
| F-257 | Mostly clear. The place of "not found" in the messages is unclear. |
| F-240 | Blocked in part. "Its" and "it" can mean either stage, resolved only by arithmetic; the "check stopped at `Char`" is opaque. |
| F-285 | Blocked in part. "Clause form", the "fused arm" and `O0` are undefined; "twelve components" conflicts with the distance's fourteen. |
| F-75 | Mostly clear. The title's exception is wider than the body's; "rung" is undefined; it does not say whether the paper's `Bottom` rule conflicts with the build; the meaning of the `XXX` prefix differs from the skill's. |
| F-139 | Mostly clear. "Nothing converts into `RR32`" ignores numerals; "answer" and its operators are unstated. |
| F-140 | Mostly clear. What `NatRtBigSize` checks is unclear; the `XXX` prefix marks a correct refusal. |
| P-68 | Mostly clear. "Rung" is undefined; the path of `round`'s `ZZ64` and today's `floor` and `ceiling` are not stated. |
| P-166 | Blocked in part. Done or to do is unclear; "`SEQV` converting each into its bits" is opaque; the compiled path is not covered. |
| P-162 | Blocked in part. "Bare" and "group 2" are undefined; it does not say which stage refuses a pair; it conflicts with P-165 over four functions and with F-299 over `printThreadInfo`; its status is unstated. |
| P-165 | Blocked in part. The norm's decided form is ambiguous ("his review list", "fork"); `printThreadInfo` at `RR64` is unexplained; done or to do is unclear. |
| P-163 | Mostly clear. Which parts are new ("completed", "reached") and what is done are unclear; the "code alone" form is not given. |
