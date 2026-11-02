# Cold read of `record-landing/clean.txt`

What I read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these parts of its `references/`: `interpreter.md` ("Natives", "Running a program", "The model program"), `compiler.md` (whole), `library.md` (whole), `gate.md` (whole), `records.md` (whole) and `tests-writing.md` (lines 15-90). I also grepped the other allowed references for terms. I did not read `revival-changes.md`, `sources.md`, the record, git or any report. Entry numbers that an entry cites but does not explain (P-25, P-42, P-56, P-58, P-72, P-76, P-85, F-53, F-125, F-130, F-180, F-228, F-235, F-242, F-245, F-255, F-287, F-301) are outside what I could read. I list them only where the entry depends on them.

---

## F-24 (fact)

**Established:** Under walk, a native can raise a Fortress exception that a Fortress `catch` handles. A glue class does this by throwing a Java `FortressError` that wraps the exception object, as `Int.overflow()` does for `IntegerOverflow`. A helper under `nativeHelpers/` throws the compiled prelude's exception class, such as `fortress.CompilerBuiltin$DivisionByZero`. Walk replaces that class with the one library's own exception object, so a `catch` sees it. This is how `DIV` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raises a catchable `DivisionByZero`. Walk turns any other Java exception that escapes a native into a `ProgramError`. No `catch` handles a `ProgramError`, so the program stops. `REM` and `MOD` by zero on the same five types stop the program in this way.

**Conditions:** Walk only. Walk replaces only an exception that a helper throws as a compiled-prelude class. The entry does not say that the one library must declare an object of the same name; `interpreter.md`, "Natives", adds that condition. The `REM`/`MOD` behaviour holds while those operations still name glue classes (F-306 says so; this entry does not).

**Consequence:** To make a native raise an exception that a `catch` can see, there are two ways. A glue class throws a `FortressError` that holds the exception's object. A helper throws the prelude class of an exception that both libraries declare. A test cannot catch `REM` or `MOD` by zero on these types, because that ends the run.

**Evidence:** The `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`; `tests/NativeHelperRaiseWalk.fss`; one `tests/<T>DivisionByZeroWalk.fss` for each of the five types; rows 347 (fixed), 336 and 848; `compile-ladder/rung-int-semantics-walk/REPORT.md` section 4.1.

**Could not resolve:**
- `ProgramError`: the skill does not define it. From context I read it as walk's wrapper for a Java exception that no `catch` can handle. This is an implementation concept that I lack, but the context is enough.
- "raises the library's own exception where the helper raises a class of the compiled prelude": I read "where" as "when". The phrase does not say the exception must have the same name; `interpreter.md` supplies that. Unclear wording, minor.
- The entry does not say why `REM` and `MOD` throw a plain Java exception: they still name glue classes, which F-306 states. Unclear wording, minor.

## F-32 (fact)

**Established:** The compiled path cannot call glue classes, because a glue class works on walk's boxed values. A helper under `nativeHelpers/` works on plain Java values, and both paths can call it. The one library has 449 live `builtinPrimitive` bindings. 276 still name a glue class and 173 name a helper.

By declaring type, the 173 are: `ZZ32` 20, `ZZ64` 21, `ZZ` 16, `NN64` 18, `NN32` 21, `Char` 40, `Float` 30, `Int` 2, `Long` 2, `BigNum` 2, and the function `char` 1. These sum to 173.

Before any binding moved, a survey sorted the 449 into four kinds:

| Kind | Count | What it needs |
|---|---|---|
| The prelude already binds the operation to a helper with the same owner and signature (P-58) | 154 | Only the string changes |
| A helper exists, but not with that name and signature | 59 | 23 of these have a name that the prelude gives to another helper, such as the 12 wrapping operators (row 348) |
| No helper exists | 158 | A new helper |
| More than a helper | 78 | 36 are methods of native I/O objects; 42 have no compiled analogue |

The four kinds sum to 449. The 276 still on glue classes are the 158, the 78 and 40 of the first two kinds. So 173 = 154 + 59 − 40.

24 bindings of `IntLiteral` cannot move yet: its five conversions and 19 operators, 4 of them among the 154 and 20 among the 158. Their helpers work on the compiled path's `IntLiteral`, which walk's values cannot be. Walk also never reaches an `IntLiteral` native, because under walk a numeral is an `Int`.

Every program's output needs `Writer`'s natives, which are among the 36, because `println` writes through a native `Writer`. MicroGPT also needs three more:
- `nanoTime`, which needs a new helper because the compiled one returns `RR64`;
- `getProgramArgsPrim`, which `System` calls as it loads;
- `NativeArray`.

The last two have no compiled analogue. `NativeArray` waits on the array decision (P-85). The rest of the 42, such as `Thread`, `Reflect` and `printTaskTrace`, are off microGPT's path.

**Conditions:** The 449 / 276 / 173 counts describe the present. The four-way sort describes the bindings before any binding moved.

**Consequence:** Before the switch-over, the 276 glue bindings need helpers or another route. For the 154, only the string changes. For the 59, the binding is renamed or the signature fitted. The 158 need new helpers. The 78 need more design. `IntLiteral`'s 24 are blocked (P-76, row 578). For microGPT the order of need is `Writer`, `nanoTime`, `getProgramArgsPrim` and `NativeArray`. The rest of the 42 can wait.

**Evidence:** `perf-probes/prelude/natives-shape.md` section 2; `reviews/batch-24-review.md`, "6. The natives after phase 4's second batch".

**Could not resolve:**
- "live bindings": the entry does not say what makes a binding not live. One guess is a binding in `Library/incomplete/`, which is not on the source path. Unclear wording.
- The per-type counts do not match the counts in other entries without arithmetic:

  | Type | F-32 | Other entry | Difference made up by |
  |---|---|---|---|
  | `ZZ64` | 21 | F-306: 20 | F-305's `CHOOSE` |
  | `NN32` | 21 | F-308: 20 | F-307's `signed` |
  | `NN64` | 18 | F-308: 17 | F-307's `signed` |
  | `Char` | 40 | F-308: 39 | F-307's `codePoint` |

  No entry states these sums. The other 19 of `ZZ32`'s 20 and `Int`'s 2 are traced by no entry here. Unclear wording: a reader can misread these as conflicts.
- "their helpers take and answer the compiled path's `IntLiteral`": 20 of the 24 are among the 158 that need a new helper, so they have no helper yet. "Their helpers" reads as the prelude's helpers for the 4 and the helpers that would be needed for the 20. Unclear wording.
- "while its numeral is an `Int`": this reads two ways. It may be a permanent property of walk, or a state that P-76 may change. P-76 is not in hand.
- "since the compiled one returns `RR64`": the entry does not say what the one library's `nanoTime` declares (`ZZ64`?). Unclear wording.
- "The last two have no compiled analogue": only `NativeArray`'s blocker is given. What `getProgramArgsPrim` waits on is not said. Unclear wording.
- "waits for the array decision on how a float vector's `double[]` store goes (P-85)": this reads two ways. P-85 may be a decision already taken whose build is pending, or the decision itself may still be open. "goes" is vague. Unclear wording.
- "the 12 wrapping operators": I guess 3 operators × 4 fixed widths. Not stated; minor.

## F-34 (fact)

**Established:** The measurement was taken once, on climb batch 22's tree. It compiled the one library through the code generator as it will be compiled after the switch-over. The checker's failures were caught per declaration, under the distance stage's setting. The code generator refused 52 declarations, and the checker accepts every one of them. By component: `FortressLibrary` 28, `RangeInternals` 11, `List` 5, `String` 5, `FlatString` 1, `Stream` 1, `NatReflect` 1. Each declaration counts once, at the first code-generator wall it hit. No emitted class was run. For four of the 52, the first wall was a `where` clause in their own header. The code generator now compiles that form (F-181), so the present count is unknown. Each kind of wall has a ledger row: local function 304, varargs 624, `asif` 818, "Not in the trait table" 733. Separately, on climb batch 21b's base, the dispatch generator refused none of `FortressLibrary`'s 178 overload sets.

**Conditions:** One measurement on an old tree. Only first walls are counted, so later walls are hidden. Failures at run time are not counted. The present count is not known.

**Consequence:** The switch-over needs these walls cleared. A worker cannot cite 52 as the present count; it must be measured again. Nothing in the gate notices a change, because the distance stage runs no code generation.

**Evidence:** No test. `reviews/phase3-exit/zero-audit.md`, "Part C ...", item 4; `perf-probes/codegen-distance/REPORT.md` sections 2 to 6.

**Could not resolve:**
- "the library's twelve components": the distance stage covers fourteen components (`compiler.md`; F-240). The entry does not say which twelve, or why two are left out. Only seven are named, so five presumably had 0. Unclear wording.
- "and the bound `Any`": it is unclear which bound is set to `Any`. It may be the default bound of an unbounded type parameter, or a run option of the stage. It reads either way. Unclear wording.
- "under the switch-over's setting": I read it as compiling the one library as the compiled path would after the switch-over. How to reproduce that setting is not given. Unclear wording.
- `asif`: a Fortress construct that is not in the skill. A language concept I lack.
- The 52 come from climb batch 22's code, but the overload-set result comes from climb batch 21b's base. The entry does not say why the trees differ. Minor.

## F-132 (fact)

**Established:** Under walk, arithmetic on the four fixed widths (`ZZ32`, `ZZ64`, `NN32`, `NN64`) raises `IntegerOverflow` whenever the true result does not fit the type, as the specification says. This includes `^`, `CHOOSE` and `LCM`, and a program can catch the exception. It implements P-73. Three kinds of operation never raise:
- the wrapping operators (F-130);
- `narrow`, the written conversion from `ZZ64` to `ZZ32` or from `NN64` to `NN32` (P-72); it keeps the low bits;
- the shifts `LSHIFT` and `RSHIFT`, which drop the bits shifted out (F-125).

**Conditions:** Walk only; the compiled path is outside this fact. The compiled path's `CHOOSE` does raise `IntegerOverflow` (F-305). The compiled path has two known gaps. First, the compiler prelude's ranges raise `IntegerOverflow` when their bounds sum past `ZZ32` (row 453). Second, `^` saturates, throws an uncatchable Java exception, or adds (rows 523-525).

**Consequence:** On walk, a worker can rely on `IntegerOverflow` from every fixed-width operation except those three kinds. A worker must not use this fact to reason about the compiled path.

**Evidence:** `tests/FixedWidthOverflowRungB.fss` covers `+`, `-`, `·`, `DIV`, negation and absolute value on the four widths. `tests/PowChooseLcmRungE.fss` covers `^`, `CHOOSE` and `LCM`. Reports: `rung-overflow-natives/REPORT.md` §13 and `rung-size-range/REPORT.md` §12.

**Could not resolve:**
- "`^` saturates, throws an uncatchable Java exception or adds (rows 523 to 525)": the entry does not say which inputs or types give which of the three. "adds" is unclear: it may mean that the operation computes a sum instead of a power. Unclear wording.
- "where their bounds sum beyond `ZZ32`": I read this as a false overflow when lower plus upper exceeds `ZZ32`, even though the range itself fits. The entry does not say whether this is a defect or correct behaviour; it lists it among "known gaps", so I take it as a defect.

## F-181 (fact)

**Established:** The code generator compiles a function, method, object or trait declaration whose own header has a `where` clause, and emits no code for the clause. Only the checker enforces the clause's constraints, and nothing checks them at run time.

Three forms still fail:

| Form | What happens | Row |
|---|---|---|
| A trait whose `comprises` clause lists a type at a `where`-clause size (`NatParam`'s shape) | Compiles, but a call that "opens its value to the size" fails JVM verification | 307 |
| A generic type that a `comprises` clause lists at a `where`-clause variable gives the body of a member | The code generator crashes | 812 |
| A function's or method's own clause introduces a `where`-clause variable | Compiles, but the call dies with `NoClassDefFoundError` | 867 |

The code generator also still refuses a function or method that has a contract (row 701); walk checks such a contract and raises `CallerViolation`. The disambiguator drops a trait's or object's contract (row 781). F-255 covers a `where` clause on an `extends` entry (row 774). `compiler.md` lists the constructs the code generator has no case for, including a local function (row 304). An array comprehension has no case either.

**Conditions:** The clause must be on the declaration's own header; the `extends` case is in F-255. The three forms above, contracts, and constructs with no case still fail.

**Consequence:** A worker can put a header `where` clause in compiled code, but must not rely on it at run time. The worker must avoid the three forms or write them as `XXX` tests, and must not use contracts in compiled code.

**Evidence:** Plain tests: `compiler_tests/WhereBound{Function,Method,Object,TraitMethod}Compiled`, `ComprisesWhereFunctionalMethodCompiled`. `XXX` tests: `XXXFunctionContractCodeGeneration`, the `XXXNatOpenRun` pair, the `XXXWhereVariableCallCompiled` pair. Report: `rung-codegen-where/REPORT.md` §§1, 2, 5.

**Could not resolve:**
- "a call that opens its value to the size": I could not parse "opens". `compiler.md` suggests it means passing a value of such a trait where a listed type is expected. Unclear wording.
- "The clause's constraints are the checker's": I read it as "only the checker enforces them". It could also be read as "the checker owns them". Minor.

## F-220 (fact)

**Established:** In `Library/FortressLibrary.fss`, the local function `body` inside `__bigOperator` declares its parameter's type, `body(i: I): L`. The compiled checker accepts the line: neither the distance stage nor the count stage reports an error there (F-53). How walk runs it is in F-228: a reduction or comprehension with no written static argument takes its value's declared type, else the join of its elements, else its bound.

**Conditions:** This describes the current library line.

**Consequence:** Not stated. The entry does not say what a worker should conclude, for example to keep the annotation, or that writing it caused no error.

**Evidence:** No test is named beyond the stages (F-53). Report: `compile-ladder/rung-walk-elements/REPORT.md` section 6.

**Could not resolve:**
- Why the fact matters, and what it replaced or guards: unclear wording. The entry states a fact with no consequence for work.
- What `I` and `L` stand for in `__bigOperator`: not given. Minor.
- "else its bound": `SKILL.md` says some uninstantiated cases still get `Bottom` under walk. It is unclear whether "its bound" covers those cases. Minor.

## F-240 (fact)

**Established:** At the last landed gate (climb batch 24's), the count stage took about 150 s and the distance stage 198 s. The count stage's history explains its times:

| When | Count stage | Distance stage | Cause given |
|---|---|---|---|
| Climb batch 15b's gate | 325 s | 1,075 s | Before the solver's memos (F-235); the memos explain most of the drop, not load |
| Climb batch 21b's gate | about 90 s | | |
| After 21b | about 150 s | | Two causes: `FortressLibrary`'s check now runs past its cleared type errors into the export check (runs that stopped early took 91 s and 99 s, runs past them 149 s and 151 s); and checking every symbolic operator (F-281) costs 15-25 % |
| Gates 22 to 24 | 150-170 s | | Noise: 163-179 s in six runs on 22c's base at load 0.15-1.37; 130-161 s on 23's trees at load up to 7.6 |

The count table records no seconds, so its time comes from the timestamps of the gate's log. The distance stage covers fourteen components. At batch 24 it took 198 s at load 1.84, of which `FortressLibrary` took 152 s. At batch 23 it took 240 s (174 s) at load 1.54.

Load can more than double a stage's time. At batch 16 the distance stage took 217 s at load 3.3, and nearly the same code took 574 s at load 4.6-5.3. So a time can be compared only with one taken under a similar load.

**Conditions:** Single runs on this container's machine. The numbers are sensitive to load.

**Consequence:** A worker should expect about 150 s for the count stage and about 200 s for the distance stage. The worker should compare a timing only with one taken under a similar load, and must not read a difference of about 150-170 s as a finding.

**Evidence:** The timestamps of the gate's log and `compile-ladder/climb-batch-24/gate/distance.txt`. Reviews: batch-23 §2, batch-22c §2, batch-22 §2, batch-21b §2, batch-17 §1, batch-16 §2.

**Could not resolve:**
- "Its rise from about 90 s": the sentence before names both stages. The numbers (90 to 150) point to the count stage. Unclear wording.
- "it stayed between about 150 s and 170 s ... on climb batch 22c's base the stage took 163 to 179 s ... on climb batch 23's trees 130 to 161 s": the runs quoted fall outside the band. I read the band as the gates' own times and the runs as the noise, but it reads two ways. Unclear wording.
- "240 s (174 s)": I read this as total (`FortressLibrary`), by analogy with "(`FortressLibrary` 152 s)". Minor.
- The distance stage fell from 240 s to 198 s between batches 23 and 24, at a higher load. The entry does not say whether a change caused this. Not blocking.

## F-281 (fact)

**Established:** The compiled checker now checks the overloading of every operator, symbolic ones included. With them checked, the count stage and the distance stage both report 0 errors, and the count stage reports no crash (F-53). Its three loops read `isCheckedName` in `OverloadingChecker.scala`, which accepts every operator. The loops cover the top-level set, a trait's provided methods, and their overriding return types. The export check also reads every operator, each under its declared name only (F-287).

An on-demand import adds an api's declarations once and leaves out the names its `except` clause lists, with two gaps:
- The check still reads an on-demand api's declaration of a name that the component imports by name from another api (row 813).
- An `except` that lists an operator leaves the operator imported, on both paths (row 814).

Seen from outside its trait, a self type whose `comprises` clause lists types at a `where`-clause variable is read as the trait type (`TypeAnalyzer.selfComprised`). So `AnyList`'s `||` is checked. Such a program still stops in the code generator when a listed generic type gives a member's body (row 812). With all this, the distance stage is the full check of F-245.

**Conditions:** The zero counts hold on the present library. Rows 812, 813 and 814 remain.

**Consequence:** Operator overloads in the one library are checked like any other name. A new operator overload that breaks the rules makes the count non-zero. A worker must use `except` for an operator carefully, and avoid row 813's import pattern.

**Evidence:** `compiler_tests/XXXSymbolicOperatorOverloadUnrelated`, `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `OperatorPrefixInfixImport`, `ImportExceptOverload`, and the stages' tables. Report: `rung-symbolic-check/REPORT.md` §§1, 3, 5.

**Could not resolve:**
- "each under its declared name only (F-287)": unclear. It may mean that an operator with several spellings is matched only under the spelling declared. Unclear wording.
- "an `except` that lists an operator leaves it imported on both paths (row 814)": this conflicts with `compiler.md`, "The checker's gaps". That section says the compiled path fails to leave out an infix operator listed in `except`, and that walk runs the component's own `-`. That reads as a gap on the compiled path only. One of the two texts is wrong, or "imported" means something different in each.
- "Outside its trait, a self type whose `comprises` clause lists ...": I could not parse "a self type". It may mean the type of `self` in such a trait as seen from outside, or a self-typed trait. Unclear wording.
- "So the distance stage is the full check of F-245": F-245 is not in hand, so I cannot say what "full check" means.
- "by the stages ('#total 0', '#crash none'; '#total 0')": I read the first pair as the count stage and the second as the distance stage. It reads either way.

## F-298 (fact)

**Established:** On the compiled path, a body that is exactly `builtinPrimitive("com.sun.fortress.nativeHelpers.Class.method")`, naming a public static method, compiles as a direct call of that helper. At the parse it is rewritten into a call through a generated `import java`, with `self` first in a method. The checker then checks the declaration against the helper's Java signature (P-58).

The cases:

| Case | Result |
|---|---|
| Body in a component's top-level declaration, or a member of its traits and objects | Rewritten |
| Body in a local function or an object expression's method | Not rewritten: the compile stops with 'Variable builtinPrimitive is not defined.', though walk runs it (row 865) |
| String in that package that names no public static method | Static error: 'builtinPrimitive names no static helper: …' |
| Any other string, glue classes included, and any declaration with a varargs parameter (row 849) | Stays a call of `builtinPrimitive[\T\](javaClass:String):T`, typed at the declared return type, not checked against any Java signature |

When the one library is checked ("walk's world"), the checker reads the helper's Java types as the one library's: `int` as `ZZ32`, `String` as `String` (F-180, row 845). Where a declaration has `NN32`, `NN64` or `Char` at a position the checker reads as `ZZ32` or `ZZ64`, the rewrite wraps the argument or the call in a transfer helper (F-308). The result compiles to the same bytecode as a written `import java` alias call (F-301).

**Conditions:** The rewrite is at the parse and does not run on walk. It reaches only top-level declarations and trait or object members.

**Consequence:** To give the compiled path a native, bind a public static helper under `nativeHelpers/` from a top-level or member declaration. A worker must not put such a binding in a local function or an object expression's method, must not use varargs, and must expect the checker to hold the declaration to the helper's signature.

**Evidence:** `compiler_tests/NativeHelperBindingCompiled` with the `XXXNativeHelperMisfit`, `Misspelt` and `OutsidePackage` tests; `NamingCzarJUTest.testForeignOneLibrary`. Report: `rung-natives-compiled/REPORT.md`, "What changed and why".

**Could not resolve:**
- "on every repository but walk's": the skill does not define "repository" in this sense. I read it as "on every run except walk's", meaning a compile and the two stages. Unclear wording.
- "In walk's world": not defined. I read it as the count and distance stages, which check the one library. Unclear wording.
- Glue-class strings: the entry says they stay a typed call of `builtinPrimitive`. `compiler.md`, "Natives", says that in a compile such a string stops with 'Variable builtinPrimitive is not defined.', and that only the stages type it at the declared result. Read alone, F-298 suggests a glue-class binding compiles in a compiled program. The entry does not say which world it describes. Unclear wording.

## F-299 (fact)

**Established:** Walk loads a `builtinPrimitive` string that names a helper, alongside the glue classes. The loader is `interpreter/glue/StaticNativeApp.java`. It picks the helper overload whose Java parameter and result types carry the declared types, with `self` first, and passes each value at its declared type.

The loader refuses a binding at load in these cases:
- The string is in the package but names no static method.
- The string fits no overload.
- A declared parameter or result type has no carrying Java type.
- In a method, the declaring type has no carrier. The message is 'no Java type carries Holder, the type of self.' The loader also accepts only an overload whose first parameter is the declaring type's carrier.

The loader reads the declaring type by name, for fifteen library types whose names no program can reuse; `FlatString` and `JavaString` are not among them. It has two gaps:
- A dotted method of a generic trait or object is refused only when an instance is made (row 864).
- The check uses the declaring type, not `self`'s run-time type. So a program's object that extends a carried trait in violation of its `comprises` clause loads (row 551), and then reaches the helper with a value no Java type carries.

Walk raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>` (F-24). A native over `String`, helper or glue class alike, receives a non-flat string's type name instead of its text (row 846). F-32 counts these bindings.

**Conditions:** Walk only.

**Consequence:** A worker can bind a helper under walk if its Java types carry the declared types. To bind it in a method, the method's owner must be one of the fifteen carried types. A worker must test a generic owner's binding with a program that makes an instance, and must pass `asFlatString` where a `String` native could receive a concatenated string.

**Evidence:** `tests/NativeHelperBindingWalk.fss` with the `Family`, `Raise`, `Misspelt`, `Misfit` and `Uncarried` siblings, and `NativeHelperUncarriedSelfWalk` with six `UncarriedSelf*` siblings. Reports: `rung-natives-walk` and `rung-natives-self`, "What changed and why".

**Could not resolve:**
- "against its `comprises` clause": I read it as "in violation of". `interpreter.md`'s row-551 paragraph supports this reading.
- Nothing else. The fifteen types match the list in `interpreter.md`. Clear.

## F-303 (fact)

**Established:** Walk carries a declared `Float` in a Java `double`, as it carries `RR64`; `javaFor` in `StaticNativeApp.java` lists `Float` next to `RR64`. So a helper binding with a `Float` parameter or result loads. 30 of `Float`'s bindings fit a helper and now name `simpleDoubleArith`'s helpers, and every value they return under walk is what the glue classes returned. The other 32 have no fitting helper and still name glue classes: `isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, the 18 directed roundings, `^` at `RR32` and at `AnyIntegral`, `atan2`, and the floor and ceiling brackets. These sum to 32.

**Conditions:** Walk carrying, plus the bindings' present state.

**Consequence:** `Float` can be a helper binding's declared type on walk. The 32 still need helpers before they can move.

**Evidence:** `tests/NativeHelperFloatCarriedWalk.fss`, `tests/NativeHelperFamilyFloatWalk.fss`, `compiler_tests/NativeHelperFamilyFloatCompiled`. Report: `rung-natives-float/REPORT.md`.

**Could not resolve:**
- "the 18 directed roundings": the skill does not define this term. I guess the operators that round in a fixed direction. A language concept I lack; minor.
- Otherwise clear.

## F-304 (fact)

**Established:** On the compiled path, a numeral with a radix point becomes an `RR64` through two or three roundings instead of one, so a numeral of 16-17 significant digits can land on a neighbouring double. `CodeGen.forFloatLiteralExpr` adds the integer part's double to the numerator's double divided by a power of the base. For example, compiled `0.9999999999999999` is `1.0`. Walk rounds once, with `Double.valueOf` on the text. The specification asks for at most one rounding error, so the compiled path is the defective one (row 862).

**Conditions:** Compiled path only. The error can appear for 16-17 significant digits, or for a non-zero integer part. A numeral with a zero integer part and at most 15 digits after the point is safe.

**Consequence:** Compiled tests should avoid numerals that can hit this, or compare by string.

**Evidence:** `compiler_tests/XXXFloatNumeralOneRounding`. Report: `rung-natives-float/REPORT.md`, "Defects, each with its home".

**Could not resolve:**
- "the numerator's double": I read the numerator as the digits after the point taken as an integer. Unclear wording.
- "two or three roundings": the entry does not say when three. Minor.
- "A compiled test compares such a double by its string": it is unclear how comparing by string protects a test, since a neighbouring double prints differently too. The sentence may instead mean building the expected value from a string. It is also unclear whether the sentence is a rule ("must") or a description. Unclear wording.

## F-305 (fact)

**Established:** `CHOOSE` on `ZZ32` and on `ZZ64` names a helper on both paths: `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose`, which the compiler's prelude also binds. The helpers compute the exact binomial coefficient and raise `IntegerOverflow` when it does not fit. Each slow-path call has its own scratch array, so calls running in parallel do not corrupt each other. The prelude's `NN32` `CHOOSE` uses the `ZZ64` helper; the one library's `NN32` `CHOOSE` still names its glue class. Past their safe-bound tables every coefficient overflows: from `34 CHOOSE 17` on `ZZ32` and from `68 CHOOSE 34` on `ZZ64`. The helpers raise `IntegerOverflow` there. A sweep of 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs found the helpers equal to the exact value and to walk's glue classes. This implements P-73.

**Conditions:** `ZZ32` and `ZZ64` only. `NN32` in the one library is not covered.

**Consequence:** A worker can rely on exact, overflow-raising, thread-safe `CHOOSE` on these two types, on both paths.

**Evidence:** `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `ChooseHelperZZ64Compiled`, `ChooseTableCompiledRungE`; the guards `tests/ChooseZZ32Walk.fss` and `tests/ChooseZZ64Walk.fss`. Report: `rung-natives-choose/REPORT.md` §§1, 2, 5.

**Could not resolve:**
- "Past their safe-bound tables every coefficient overflows, from `34 CHOOSE 17` on `ZZ32` ...": the entry does not say what the tables index. "Every coefficient" cannot mean every larger `n`, since `100 CHOOSE 1` fits. I read "from `34 CHOOSE 17`" as the first central coefficient that overflows. Unclear wording.

## F-306 (fact)

**Established:** Under walk, 20 bindings of trait `ZZ64` and 16 of trait `ZZ` now name helpers, and every value they give is unchanged from the glue classes. The 36 bindings name 28 helpers, the ones the prelude binds for the same operations. The helpers are in `simpleLongArith`, `simpleIntArith`, `simpleUnsignedLongArith` and `simpleArbitraryPrecisionArith`. `ZZ64`'s four wrapping bindings name the wrapping helpers that the prelude binds under its `BOX` spellings (row 348). `longOverflowingDiv` and `div` raise the library's `DivisionByZero` (F-24). `REM` and `MOD` still name glue classes and end the run on a zero divisor (row 336 for `ZZ64`, row 848 for `ZZ`). A `ZZ` helper accepts only a `BigNum`, because the loader unboxes it with `getBigInteger`. Walk's coercions convert other integer operands to `ZZ` first.

**Conditions:** Walk only. `REM` and `MOD` are excluded.

**Consequence:** `ZZ64` and `ZZ` arithmetic other than `REM` and `MOD` runs on shared helpers. A worker must not expect a catchable exception from `REM` or `MOD` by zero.

**Evidence:** `tests/NativeHelperFamilyIntegersWalk.fss`, `ZZ64DivisionByZeroWalk.fss`, `ZZDivisionByZeroWalk.fss`, `compiler_tests/NativeHelperFamilyIntegersCompiled`. Report: `rung-natives-integers/REPORT.md`.

**Could not resolve:**
- "trait `ZZ64`'s 20 ... native bindings name helpers": this reads as if `ZZ64` has 20 bindings in all, yet `REM` and `MOD` are still on glue classes, and F-32 counts 21 helper bindings on `ZZ64`. I read "20 of `ZZ64`'s bindings", with F-305's `CHOOSE` as the 21st. Unclear wording.
- "under its `BOX` spellings (row 348)": the skill does not define this. Via P-73, I read it as: the prelude binds the wrapping helpers to the names of the specification's saturating operators (⊞ `BOXPLUS` and the others). The entry implies, but does not state, that this is the defect of row 348. Unclear wording.

## F-307 (fact)

**Established:** Eight remaining bindings now name helpers, with walk's values unchanged: `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint`, and the top-level `char`. Four of them, over `NN32`, `NN64` and `Char`, name the specially named helpers that the checker reads at those types. `signed` wraps above the signed half, and `char` accepts a code point outside 0-1114111, as the glue classes did (rows 856, 857). The top-level `printlnWithThread` and `getProperty`, declared over `String`, stay on their glue class (row 846).

**Conditions:** Walk values unchanged. The two wrap and range behaviours of rows 856 and 857 are kept.

**Consequence:** These eight are done. `printlnWithThread` and `getProperty` wait on row 846.

**Evidence:** `tests/NativeHelperFamilySmallWalk.fss`, `compiler_tests/NativeHelperFamilySmallCompiled`. Report: `rung-natives-small/REPORT.md`.

**Could not resolve:**
- "The small rest": the entry does not explain this name for the group. Unclear wording, minor.
- "the special names that the checker reads at those types": I read these as the six transfer helpers of `compiler.md` and F-308, which these four bind directly. Inferred, not stated.

## F-308 (fact)

**Established:** On the compiled path, a binding over `NN32`, `NN64` or `Char` whose helper has a Java `int` or `long` compiles through six transfer helpers. 20 of `NN32`'s bindings, 17 of `NN64`'s and 39 of `Char`'s now name their helpers.

At the parse, the rewrite (F-298) reads each position's declared type. For `self` it uses the owner, when the owner is not generic. Where the checker reads the helper's `int` or `long` as `ZZ32` or `ZZ64` but the declaration says `NN32`, `NN64` or `Char`, the rewrite wraps that argument or the call in the matching transfer. The transfers are `makeZZ32FromNN32…`, `makeNN32FromZZ32…`, `charCodePoint…`, `charMakeCharacter…`, `makeZZ64FromNN64…` and `makeNN64FromZZ64…`, composed as the prelude composes them.

Two cases get no transfer:
- a helper overloaded at its number of parameters;
- `self` in a generic owner. The binding's other positions still get theirs.

Walk needs no change. The transfers are identities, so the checker accepts any helper. For example, `NN32` bound to the signed `simpleIntArith.intLT` compiles and answers `true` for 2^31 < 1, as walk does. Only the walk and compiled guard tests check that each of the 76 bindings names the unsigned helper. Under walk, `NN32`'s and `NN64`'s `DIV` by zero raise `DivisionByZero`, and nothing else changed. Six of the 82 bindings over these types stay on glue classes: `NN32`'s `asFloat` and `CHOOSE`, and four behind rows 326, 860 and 861.

**Conditions:** The rewrite runs on the compiled path and in the stages, not on walk. There are the two no-transfer cases above.

**Consequence:** The checker cannot catch a binding to the wrong (signed) helper. When moving a binding over these types, a worker must test both paths at values where signed and unsigned readings differ. The worker must avoid helpers overloaded at the same number of parameters.

**Evidence:** `compiler_tests/NativeHelperTransferCompiled` and `NativeHelperFamily{NN32,NN64,Char}Compiled`; under walk `tests/NativeHelperFamily{NN32,NN64,Char}Walk` and `{NN32,NN64}DivisionByZeroWalk`. Reports: `rung-natives-hard/REPORT.md` §1 and `SKEPTIC.md`.

**Could not resolve:**
- "`self` by its non-generic owner": I read this as "`self` is typed by its owner, when the owner is not generic". Unclear wording, minor.
- "every other position of such a binding still gets its transfer": "such a binding" reads two ways. It could be the generic-owner case only, or also the overloaded-arity case. `compiler.md` says the overloaded case gets no transfer at all, so I read it as the generic-owner case only. Unclear wording.
- "Six of the 82 bindings over these types": 82 = 76 + 6. That leaves out F-307's three bindings over these types (`signed` ×2, `codePoint`), which F-32 counts. So the total over these types is 82 or 85, depending on the reading. Unclear wording.

## P-73 (position)

**Decided:** Under walk, fixed-width integer arithmetic raises `IntegerOverflow` when the result does not fit, on the unsigned `NN32` and `NN64` too. This covers every operation whose result can leave its type, including `^`, `CHOOSE` and `LCM`. So `NN32` subtraction below 0 raises. Code that means to wrap uses ∔ `DOTPLUS`, ∸ `DOTMINUS` and ⨰ `DOTTIMES`, fully parenthesised. The specification's saturating operators, such as ⊞ `BOXPLUS`, are not in the interpreter's library and come in a later step (row 797). The reasons: it is the specification's rule, and the compiled path already raised for `+`, `-`, `*`, `/`, negation and absolute value on `ZZ32` and `ZZ64`.

**Applies:** Walk. The position itself is about walk. On the compiled path the same rule holds through P-25 (the specification is the standard), and the compiled path departs from it at `^` (rows 523-525).

**Requires:**
- A worker must make walk raise on overflow and must not make walk wrap silently.
- A program that needs wrapping must write the wrapping operators, fully parenthesised.
- A worker must not use or add saturating operators until row 797's step.

**Unfinished:** The saturating operators (row 797). Compiled `^` (rows 523-525). Compiled overflow on `NN32` and `NN64` is not mentioned; the "Why" names only `ZZ32` and `ZZ64` there.

**Could not resolve:**
- The exceptions: P-73 names only the wrapping operators. It does not name `narrow` (P-72) or the shifts, which F-132 lists as never raising. Read alone, "every operation whose result can leave its type" would cover `LSHIFT` and `narrow`. Unclear wording.
- "The decision is walk's. On the compiled path the rule holds as the specification's (P-25 ...)": this reads two ways. Either the compiled path is outside this position, or it is bound to the same rule by another route. I read the second. Unclear wording.

## P-151 (position)

**Decided:** Only three `where`-clause forms, the ones the team wrote down, are built:
- conditional extension: a type that extends another under a condition has that supertype only where the condition holds, and its members are checked with the condition holding;
- a function's or method's condition on its own static parameters;
- `AnyList`'s `comprises` clause, `AnyList comprises List[\E\] where [\E\]`. Making it live clears `AnyList`'s `||` type error, and moves `addLeft` and `addRight` into `List` (row 799).

A `where` clause may introduce its own static variables, as `where [\E\]` does. `SUM`'s fusion with `MAX` and `MIN`, the library's fast path for the maximum or minimum of sums, stays. A method's `where` condition clears four of the fusion's six type errors. For the other two, the fix measured is the team's commented-out generic `distribute`, which as written only moves them (F-242). The reason: a feature with little support in the team's work bends the language beyond what the curator can review. Such a feature is built only where the team left enough design intent, or where it is on the critical path to running fast compiled.

**Applies:** Any work on `where` clauses, in the checker, walk or the library.

**Requires:**
- A worker must not build other `where` forms unless the team left design intent for them or they are on the critical path.
- A worker must keep the `SUM`/`MAX`/`MIN` fusion.
- A worker must use a method condition where a member applies at only some instances.

**Unfinished:**
- Row 773: scope members to the condition, because a member checked under the condition can still be called where it fails.
- Row 774: walk's half of conditional extension.
- The fusion's last two type errors (see below).

**Could not resolve:**
- "for the other two, the team's commented-out generic `distribute` is the fix measured (F-242 ...: as the team wrote it, it only moves them)": this reads two ways. Either `distribute` is the chosen fix that still needs adapting, or it was tried and is not the answer. The entry does not say what clears the last two errors. F-281 reports count and distance 0, so something cleared them, and this position does not say what. Unclear wording.
- "`AnyList`'s `comprises` clause": this reads two ways. It could mean only that clause, or the general form of a `comprises` clause listing a type at a `where`-clause variable. F-181 and `compiler.md` treat the general form, for example `NatParam`. Unclear wording.
- "move into `List` (row 799)": the entry does not say whether this is done or still to do. Unclear wording.
- A trait's or object's own `where` constraint is not among the three forms, yet `compiler.md` says the checker checks it at the type's use. The entry does not say whether it counts as built. Unclear wording.
- "Row 773: ...; Row 774: ...": terse. I read both as unfinished items.

## P-156 (position)

**Decided:** Every index parameter of the library's generic indexed types is bounded `I extends Index`. `ZZ32` extends `Index`, and `Range` excludes `Index`. So a one-index subscript and a range subscript never apply to the same value, and the pair is a valid overload at every instance. A tuple type whose elements are all `Index` types is itself an `Index`, on both paths and in the specification. This typing rule changes no value: `m[i, j]` still passes the tuple `(i, j)`. `Index` is declared `trait Index extends Any`, outside `Object`, so a tuple of indices is an `Index` but never an `Object`. P-42's tuples stay outside `Object`, as the specification's `trait Tuple extends Any excludes { Object }` keeps them. `BoundedRange` cannot take the bound, because the open range `(:)` is a range over `Any` (P-56). So it keeps `atMost(n: I): FullRange[\I\]` under the method condition `where { I extends Index }`. The reasons:
- The bound is the team's own wish for this subscript pair (`Specification/appendices/future.tex:186-207`).
- The tuple rule is the revival's own rule, chosen over the team's suggested conversion, which would change every index value.
- A `where` constraint `I excludes Range[\I\]` was weighed and not taken, because the team left that kind of constraint as an open question.

**Applies:** The library's generic indexed types, their subscripts and range types, on both paths and in the specification.

**Requires:**
- A worker must bound new index parameters `I extends Index`, and must not use `I excludes Range[\I\]`.
- A worker must treat tuples of indices as `Index` and not as `Object`.
- For a member that applies at only some instances, a worker must use a method condition, as `atMost` does.

**Unfinished:** Possibly row 783 (see below).

**Could not resolve:**
- "`ZZ32` extends `Index`, and `Range` excludes it": "it" may be `Index`, which the title says, or `ZZ32`. I read `Index`. Unclear wording, minor.
- "Row 783: the subscript pair": the entry does not say whether this is the row the position settles or open work. Unclear wording.
- "the traits chapter names as an exception": this reads two ways. It could be the team's text, or a revival edit (Appendix I). "in the specification" for the tuple rule suggests a revival edit. Unclear wording, minor.

## F-?1 (fact, unnumbered)

**Established:** `ForeignJava` (`repository/ForeignJava.java`) builds the Fortress api of a Java class named in an `import java`. It reads all the public methods of a helper class once per JVM, at the first import of any of them, and keeps that reading. Every compile that builds the foreign api writes the class's wrapper in `nativewrapper_cache/` again, from that compile's reading. So a helper's Fortress type must not depend on which binding names it. Otherwise, the first component whose import reaches the class decides the type, and compiled code that shares the wrapper breaks. The present tree has no such defect: every reader reads a helper the same way. The hazard was seen with a prototype that read a helper at each binding's declared types. The reading changed with the order of the imports, and `javap` showed the next compile rewriting the wrapper.

**Conditions:** It holds while `ForeignJava` caches its reading per JVM and rewrites the wrapper per compile. It bites only if a helper's Fortress type depends on the binding.

**Consequence:** A worker must give every helper one Fortress type, the same for every binding, and must not read a helper at a binding's declared types. This explains why F-308 composes transfer helpers instead.

**Evidence:** No test checks it. It was observed in a probe: `compile-ladder/plan-24/probes/hard-set.md` §4.2, "2a".

**Could not resolve:**
- The entry has no number yet: "F-?1" is a placeholder.
- "every public method" conflicts with `compiler.md`, "Natives", which says the wrapper generator wraps "every method of a class that it is given, the private methods too". The two texts may describe different steps (reading versus wrapping), but neither says so. Unclear wording.
- "once per JVM" next to "each compile": it is unclear whether "a compile" is one `fortress compile` run (one JVM) or one component's compile inside a JVM. That decides when the hazard bites: only when several components are compiled in one JVM, or across runs too. Unclear wording.
- "No test checks it": `records.md` says such an entry gives the command and its output. This entry gives a narrative of a probe instead. The reader cannot reproduce the observation from the entry.
