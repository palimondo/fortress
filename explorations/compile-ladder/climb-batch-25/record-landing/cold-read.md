# Cold read: climb batch 25 record landing (clean.txt)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and `references/compiler.md` and `references/interpreter.md` (their "Natives" sections, the count and distance stage definitions, the prelude section). Nothing else.

## F-24

- **Established:** Under walk, a native can raise a Fortress exception that Fortress code can `catch`, by throwing a `FortressError` that wraps the exception object (as `Int.overflow()` does for `IntegerOverflow`). A native that is a `nativeHelpers/` helper throws the compiled prelude's class (e.g. `fortress.CompilerBuiltin$DivisionByZero`), and walk turns that into the one library's own exception of the same name. So `DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64` raise a catchable `DivisionByZero`. Any other Java exception from a native becomes a `ProgramError`, which no `catch` sees.
- **Conditions:** Walk only. The helper route works only for an exception class the compiled prelude declares (the skill adds: one both libraries declare as an object).
- **Consequence:** A native that must raise a catchable exception either throws a `FortressError` (glue class) or throws the prelude class by name (helper); anything else ends the run.
- **Evidence:** `overflows(...)` assertions in `tests/IntSemanticsRungI.fss`; `tests/NativeHelperRaiseWalk.fss`; `tests/<type>DivisionByZeroWalk.fss` and `tests/<type>RemainderByZeroWalk.fss` for the five types. Ledger row 347 (fixed). Detail in `compile-ladder/rung-int-semantics-walk/REPORT.md` 4.1.
- **Could not resolve:** `ProgramError` is not in the skill; I read it as walk's fatal-error wrapper (wording/concept gap, minor). Otherwise clear.

## F-32

- **Established:** The compiled path cannot call walk's glue classes (they take walk's boxed values). Of the one library's 449 live native bindings, 161 still name glue classes and 288 name `nativeHelpers/` helpers. A classification made at `a1f8c4b8b`, before any binding moved, sorted the 449 into: 154 where the compiler's prelude already binds the same operation to a helper at the same owner and signature (only the string changes, P-58); 59 where a helper exists but nothing binds it under that name and signature (23 of them under a name the prelude gives to a different helper, e.g. the 12 wrapping operators, row 348); 158 that need a new helper; 78 that need more (36 methods of native I/O objects, 42 with no compiled analogue). 29 of the 449 are object `IntLiteral`'s (4 in the 154, 25 in the 158), and none can move yet: their helpers use the compiled path's `IntLiteral`, which no walk value can be, and walk never reaches an `IntLiteral` native while its numerals are `Int` (P-76, row 578). Every program needs `Writer`'s natives (among the 36 I/O methods) because `println` writes through a native `Writer`. MicroGPT needs `nanoTime` (now a helper, F-314), `getProgramArgsPrim` (called as `System` loads) and `NativeArray`; the last two have no compiled analogue. `NativeArray` waits on the array decision about a float vector's `double[]` store (P-85); `Thread`, `Reflect` and `printTaskTrace` are off microGPT's path.
- **Conditions:** The four-way split is as of `a1f8c4b8b`; the 161/288 split is current. The `IntLiteral` block holds while walk's numerals are `Int`.
- **Consequence:** Before the switch-over, every one of the 161 glue bindings that microGPT or `println` reaches needs a compiled-path binding; the `IntLiteral` 29 and `NativeArray` are blocked on P-76 and P-85.
- **Evidence:** `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md` section 4 (named subsections). F-298, F-299 for the helper count.
- **Could not resolve:**
  - "live" native bindings: live as opposed to what (dead code, commented out)? Unclear wording.
  - The four categories (154+59+158+78 = 449) are counted at the old commit, while "161 ... still name" is current; the entry does not say how many of the 161 fall in each category now. A reader cannot tell what is left in each bucket. Unclear wording.
  - "at the same owner": owner of what, the declaring trait/object, or the Java class? Unclear wording.
  - "23 of them under a name that the compiler's prelude gives to another helper": I read it as a name clash between the one library's operation and a differently-behaving prelude helper, but it could mean the helper exists under a different name. Unclear wording.
  - `getProgramArgsPrim` is said to have no compiled analogue, but the list of the 42 that follows names only `NativeArray`, `Thread`, `Reflect` and `printTaskTrace`; what waits on `getProgramArgsPrim`, and on `Writer`, is not said. Unclear wording.
  - The sentence "its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call" parses two ways at first ("which both paths call" attaches to the helper); resolvable with the skill.

## F-34

- **Established:** In the switch-over's setting (the distance stage's: checker failures caught per declaration, and the bound `Any`, F-53), the code generator refuses 47 declarations across the fourteen distance-stage components, in 11 kinds, all of which the checker passes. The base's code generator gave 50 in 14 kinds in the same session; the three kinds F-315 removed (`Any` in `extends`, `forbid`, `test` modifier) are gone. Each remaining kind has a ledger row or plan line (e.g. local function row 304, varargs row 624, `asif` row 818, "Not in the trait table" row 733). So the code generator still blocks the library from reaching bytecode after the switch-over. Separately, at `aa5c67d48` the dispatch generator refused none of `FortressLibrary`'s 178 overload sets.
- **Conditions:** One measurement, on `97a416b18`, with the 173 helper strings put back on glue classes; each declaration counted only at its first wall; no emitted class was run. The dispatch result is from an older base.
- **Consequence:** A worker cannot rely on the library compiling to bytecode after the switch-over; the 11 kinds are open work. No test guards the count, since the gate's distance stage runs no code generation.
- **Evidence:** `compile-ladder/plan-25/probes/codegen.sh`; `rung-codegen-walls/REPORT.md` section 5; `reviews/phase3-exit/zero-audit.md` Part C item 4; `perf-probes/codegen-distance/REPORT.md` sections 2-6.
- **Could not resolve:**
  - "the bound `Any`": which bound is set to `Any` (unbounded type parameters? the checker's bound for something?) is not said. Language/tool concept I lack, and the entry defers to F-53.
  - "the 173 helper strings put back on their glue classes": why 173, when F-32 says 288 bindings name helpers, and why put back at all (presumably because the compiled run cannot read walk-only helper bindings?). Unclear wording.
  - Only 4 of the 11 kinds are named; the rest are not listed. Not a blocker, but the entry cannot be acted on alone.

## F-118

- **Established:** The code generator carries a numeral as an `int`, a `long` or a decimal string, by its bit length, so large values such as `4294967295` and `18446744073709551615` keep their values on the compiled path (walk keeps them at `ZZ` and `ZZ64`, and refuses such numerals bound to `NN32`/`NN64`, F-57). The compiled path prints `NN32`/`NN64` values above the signed half as unsigned (F-313). But it compares two `IntLiteral`s at `ZZ64`, so comparing a numeral beyond `ZZ64` (e.g. `a = 18446744073709551615; a < 5`) fails with `Not in range for ZZ64` (row 328). An `IntLiteral` arithmetic result of 64 bits or more keeps its value compiled; walk raises `IntegerOverflow` at the same addition (F-132).
- **Conditions:** Compiled path. The comparison failure and the large-result arithmetic are not pinned by any test (one observed in a probe).
- **Consequence:** Do not compare literals beyond `ZZ64` on the compiled path; the two paths differ on large literal arithmetic, so a test asserting either is not backed by the record.
- **Evidence:** `compiler_tests/IntLiteralWrapRepairR2` (numerals at the four types); `compiler_tests/UnsignedPrintingCompiled`; `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".
- **Could not resolve:**
  - "by its exact bit length": signed or unsigned bit length? `4294967295` fits 32 bits unsigned but not signed; which carrier it gets is unclear. Unclear wording.
  - "Walk stops the same program at `x + x`": no program with `x` is shown in the entry; "the same program" refers to the report's probe. Unclear wording.
  - "walk refuses a numeral bound to `NN32` or `NN64`": every such numeral, or only large ones? Read as large ones; ambiguous.

## F-125

- **Established:** Under walk, `LSHIFT` and `RSHIFT` on the four fixed widths give 0 (or the sign fill) when the count is at or beyond the width, and shift the other way on a negative count; `ZZ`'s `shift` is exact. This builds P-69. `GCD` and `LCM` are nonnegative, `0 LCM 0` is 0 (row 385), which is why `RangePrototype.fss` uses `GCD` for its signed stride. `CHOOSE` on fixed widths gives 0 for `k < 0` or `k > n`; on `ZZ` it gives 1 there, against the specification's 0 (row 887). Overflow raises (F-132). The compiler prelude has no `shift` (row 383).
- **Conditions:** Walk; fixed widths are presumably `ZZ32`, `ZZ64`, `NN32`, `NN64`.
- **Consequence:** Rely on these walk semantics; `ZZ`'s `CHOOSE` outside the range is a known departure from the specification, not to be asserted as correct; compiled code cannot use `shift`.
- **Evidence:** `tests/IntSemanticsRungI.fss`; `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4 and 7.
- **Could not resolve:**
  - "give 0 or the sign": "the sign" read as all sign bits (-1 for a negative value under `RSHIFT`), but it could mean 1/-1. Unclear wording.
  - "So the team's test `RangePrototype.fss` computes its signed stride with `GCD`": the causal "So" is unclear; is the test's use a consequence of the nonnegative result, or evidence for it? Unclear wording.
  - "It builds P-69": P-69's content is not given, so what was decided is not visible. Not a blocker.

## F-240

- **Established:** At climb batch 25's gate, the checker's count stage took about 160 s and the distance stage 271 s (with `FortressLibrary` 205 s of it). At batch 15b the two took 325 s and 1,075 s; the solver's memos (F-235), not load, explain most of the drop. The count stage's rise from about 90 s at batch 21b comes from the `FortressLibrary` check now running to its end, through the export check, past errors it used to stop at (stopped runs 91 s and 99 s; full runs 149 s and 151 s). Checking every symbolic operator since 21b (F-281) costs the count stage about 15-25 %. From batch 22 to 24 the count stage stayed at about 150-170 s. The distance stage rose from 198 s (152 s for `FortressLibrary`) at batch 24 to 271 s, with no measured cause; load can more than double a stage's time (217 s at load 3.3 vs 574 s at 4.6-5.3 for near-identical code at batch 16).
- **Conditions:** One run per gate; count-stage time read from the gate log's file times; times compare only under like load.
- **Consequence:** Do not attribute a stage's time change to code without comparable load; the distance-stage rise at batch 25 is unexplained.
- **Evidence:** gate log file times; `compile-ladder/climb-batch-25/gate/distance.txt`; `reviews/batch-*-review.md` section 2 (and 17's section 1) for batches 16 to 25.
- **Could not resolve:**
  - "ran at a load of 0.59, against 198 s (152 s) at 1.84": I read 0.59 and 1.84 as load averages and the parenthesis as `FortressLibrary`'s share at batch 24, but that is inferred. Unclear wording.
  - The entry says batch 25 ran at a lower load (0.59) yet overlapped more with `testFast`'s four JVMs (started 9 s before, against 53 s); when the load was sampled, and so whether load explains the rise, is unclear. Unclear wording.
  - "Its rise": "its" is the count stage, after a headline naming both stages; first reading was ambiguous.

## F-268

- **Established:** The code generator compiles `Any` as a static argument in an `extends` clause (emitting `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY`), but crashes with a null-pointer error on a tuple static argument containing `Any`, such as `Holder[\(Any, ZZ32)\]` (row 889).
- **Conditions:** Compiled path, code generator; the crash case is the tuple-holding-`Any` argument.
- **Consequence:** A worker can rely on `extends G[\Any\]` compiling; the tuple case is a known wall, recorded as an expected failure.
- **Evidence:** `CodeGen.java:5845-5851`; `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `compiler_tests/XXXExtendsGenericAtTupleOfAny.test`; `rung-codegen-walls/REPORT.md` sections 1 and 5.
- **Could not resolve:** Nothing; clear. (Whether the crash case is an `extends` clause too is implied, not stated.)

## F-303

- **Established:** Walk carries a declared `Float` in a Java `double`, as it does `RR64` (`StaticNativeApp.java:51`), so a helper binding with a `Float` parameter or result now loads (before, walk refused it at load). 57 of `Float`'s 62 bindings, and the top-level `fromRawBits`, name `simpleDoubleArith` helpers: 30 over existing helpers (arithmetic, comparisons, elementary functions, rounding to integer) and 27 over new one-line helpers (`isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, 18 directed roundings), plus a 28th new helper for `fromRawBits`. Walk's values are unchanged. The other 5 (`^` at `RR32` and `AnyIntegral`, `atan2`, the floor and ceiling brackets) still name glue classes.
- **Conditions:** Walk carrying rule; the 5 remain glue-bound for lack of a fitting helper.
- **Consequence:** `Float` bindings can name `double` helpers; the 5 listed still need helpers before the switch-over.
- **Evidence:** `FortressBuiltin.fss:55-193`, `:156-189`; `FortressLibrary.fss:4535`; `simpleDoubleArith.java:136-246`; tests `tests/NativeHelperFloatCarriedWalk.fss`, `NativeHelperFamilyFloatWalk.fss`, `NativeHelperFamilyFloatBitsWalk.fss`, `compiler_tests/NativeHelperFamilyFloatCompiled`, `NativeHelperFamilyFloatBitsCompiled`; the two rung reports. (I checked the arithmetic: the listed names count to 57, and 57 + 5 = 62.)
- **Could not resolve:**
  - `narrow` and "the 18 directed roundings": which operations these are (e.g. rounding-mode variants of `+`, `-`, `TIMES`, `/`, `SQRT`?) is not in the skill. Language concept I lack; not a blocker.
  - "every value they give under walk is the glue classes'": read as "the same values the glue classes gave". Minor wording.

## F-308

- **Established:** A binding over `NN32`, `NN64` or `Char` whose helper uses a Java `int` or `long` compiles on the compiled path through the six transfer helpers; `NN32`'s 27, `NN64`'s 24, `UnsignedLong`'s 3 and `Char`'s 39 bindings (93) now name helpers. Where the declaration uses those types (or an argument is `UnsignedLong`, walk's `NN64` object), the F-298 rewrite wraps the argument or call in the matching transfer, as the prelude does; walk needs none. No transfer is added for a helper overloaded at its arity (row 885) or for `self` in a generic owner; the declared type is matched by simple name (row 886). Since transfers are identities, the checker accepts any helper, even a signed one (e.g. `intLT` for `NN32` answers `true` for 2^31 < 1, as walk does); only the guard tests check that each of the 93 names the unsigned helper. Under walk the 93 keep the glue values, except that `NN32`/`NN64` `DIV`, `REM`, `MOD` by zero now throw `DivisionByZero`. Of the 94 bindings over these types, only `Char`'s `asExprString` stays on a glue class (row 861).
- **Conditions:** The rewrite's limits (overloaded helper, generic owner, simple-name match).
- **Consequence:** When moving such a binding, test at values where signed and unsigned readings differ, on both paths; the checker will not catch a wrong (signed) helper.
- **Evidence:** `compiler_tests/NativeHelperTransferCompiled`; guard tests `NativeHelperFamily{NN32,NN64,Char,AsFloat,Unsigned}Compiled` and `tests/NativeHelperFamily{NN32,Unsigned,NN64,Char}Walk`; `tests/NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`; `references/compiler.md` "Natives"; `rung-natives-hard/REPORT.md` and `SKEPTIC.md`.
- **Could not resolve:**
  - "nor does `self` in a generic owner": "owner" is not defined; the skill says `self` gets a transfer only in a method of `NN32`, `NN64` or `Char` itself, so I read "generic owner" as a generic trait declaring the method. Unclear wording.
  - "the declared type is read by its simple name (row 886)": the consequence (a different type also named `NN32` would get a transfer?) is not said. Unclear wording.
  - "answers `true` for 2^31 < 1, as walk does": does walk also answer wrongly, i.e. is that the hypothetical wrong binding on both paths? Read that way; ambiguous.
  - "an argument `UnsignedLong`" vs the declaration naming `NN32`/`NN64`/`Char`: whether `UnsignedLong` triggers transfer only as an argument (not `self`, not a result) is unclear.

## F-310

- **Established:** 50 of value object `RR32`'s 51 native bindings name helpers. 49 name the 46 helpers of `simpleFloatArith` over a Java `float` (`asString`/`asExprString` share `floatToString`; `DOT`, `TIMES`, juxtaposition share `floatMul`). Walk carries `RR32` in a `float` and the checker reads `float` as `RR32`, so each binding fits as a plain string (no transfer), and the distance stage checks it. The 50th, `asFloat`, names `simpleDoubleArith.floatToDouble` at `RR64` (F-311). The 51st, `^` at a `Float` exponent, still names a glue class. No prelude file imports `simpleFloatArith`. Walk's values are unchanged.
- **Conditions:** As stated; one binding remains glue-bound.
- **Consequence:** `RR32` is ready except `^` at `Float`; since the prelude never uses `simpleFloatArith`, its helpers are exercised on the compiled path only by tests' own bindings.
- **Evidence:** `StaticNativeApp.java:52`; `tests/NativeHelperFamilyRR32Walk.fss`; `compiler_tests/NativeHelperFamilyRR32Compiled`; `rung-natives-rr32/REPORT.md`. (49 - 1 - 2 = 46 checks.)
- **Could not resolve:**
  - "No file of the compiler's prelude imports `simpleFloatArith`": why this matters (no prelude behaviour moves with these helpers, cf. P-38? or no compiled coverage?) is not said. Unclear wording.
  - "the distance stage checks it", where only the distance stage (not the count stage) checks it: implies the bindings are in `FortressBuiltin`, not `FortressLibrary`, but the file is not named. Minor.

## F-311

- **Established:** `asFloat` on `Int`, `RR32`, `NN32`, `Long` and `BigNum` now answers `RR64`, as `Number`'s abstract `asFloat` declares, and names the helpers `intToDouble`, `floatToDouble`, `unsignedIntToDouble`, `longToDouble` (new, `(double) a`) and `toDouble` (new, `a.doubleValue()`). The team declared these results as `Float`; at `Float` the checker refused the move ("Function body has type RR64, but declared return type is Float."). Walk carries both in a `double` and gives the same `Float` object, so walk's values are unchanged.
- **Conditions:** These five owners only.
- **Consequence:** These `asFloat` bindings declare `RR64`; a worker should not restore `Float` on them.
- **Evidence:** `FortressBuiltin.fss:241`, `:374`, `:383`, `:396`, `:570`; `FortressLibrary.fsi:291`; specification `numbers.tex:49`; `tests/NativeHelperFamilyAsFloatWalk`, `compiler_tests/NativeHelperFamilyAsFloatCompiled`; `rung-natives-asfloat/REPORT.md`.
- **Could not resolve:** What `numbers.tex:49` says (that `asFloat` answers `RR64`?) is not stated, so whether the change follows the specification or departs from the team's text with the specification's support is inferred. Unclear wording, minor.

## F-312

- **Established:** `REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` (ten bindings) name `nativeHelpers/` helpers on both paths: `intRem`/`intMod`, `longRem`/`longMod`, `unsignedIntRem`/`unsignedIntMod`, `unsignedLongRem`/`unsignedLongMod` (through F-308's transfers), and `rem`/`mod`. `REM` is the remainder of truncating division; `MOD` of floor division, with the divisor's sign; on the naturals `MOD` equals `REM`. Each throws `fortress.CompilerBuiltin$DivisionByZero` at a zero divisor, which walk raises as the library's `DivisionByZero` (F-24). Values are the glue classes' (626 operand pairs compared).
- **Conditions:** The five integer types.
- **Consequence:** Rely on these semantics on both paths; a zero divisor is catchable as `DivisionByZero`.
- **Evidence:** `FortressLibrary.fss:780-783`, `:873-876`, `:956-959`, `:1053-1056`; `FortressBuiltin.fss:440-443`; tests `tests/{ZZ32,ZZ64,NN32,NN64,ZZ}RemainderByZeroWalk`, `NativeHelperFamilyRemainderWalk`, `compiler_tests/NativeHelperFamilyRemainderCompiled`; `rung-natives-remainders/REPORT.md`.
- **Could not resolve:** Nothing; clear. ("626 operand pairs print the old code's values": which program printed them is not said, but the meaning is clear.)

## F-314

- **Established:** Under walk, `GCD`, `LCM` and `partitionL` on the five integer types, `CHOOSE` on `NN64` and `ZZ`, `ZZ`'s `cmp`, and `nanoTime` now name 18 new helpers at the ends of the five `simple*Arith` classes; values are the glue classes', and the helpers keep no shared state. The fixed widths' helpers share one unsigned Euclid's algorithm (`unsignedLongGcd`). `nanoTime` answers `ZZ64` through a `long` (row 75). `ZZ`'s `CHOOSE` keeps `BigNum`'s 1 outside `0 <= k <= n`, against the specification's 0 (row 887). Builds P-58, P-70, P-73.
- **Conditions:** Stated "under walk", though a compiled test is listed too.
- **Consequence:** These operations, and microGPT's `nanoTime`, no longer block the switch-over on the helper side; `ZZ`'s `CHOOSE` departure stays known, not to be pinned as correct.
- **Evidence:** `tests/NativeHelperFamilyDivisorsWalk.fss`, `compiler_tests/NativeHelperFamilyDivisorsCompiled`; `rung-natives-divisors/REPORT.md` sections 1 (table) and 5.
- **Could not resolve:**
  - Count: 3 x 5 + 2 + 1 + 1 = 19 bindings against "18 new helpers"; the entry does not say which binding shares a helper or reuses an old one. Unclear wording.
  - `partitionL`: what operation it is is not in the skill. Language/library concept I lack.
  - "Under walk" in the headline while a compiled test is cited: is the compiled path also covered, or only the helper itself? Unclear wording.
  - `CHOOSE` on `ZZ32`, `ZZ64`, `NN32` (F-125 says the fixed widths answer 0): what they name now is not said.

## F-315

- **Established:** The code generator now compiles a trait or object extending a generic trait at `Any`, a `try` with a `forbid` clause, and a function or method declared `test`. A `forbid` clause rethrows an exception of a listed type that no `catch` took, as a `ForbiddenException` (built by the library's constructor) chained to it. It does so before the `finally` clause runs, and so does the compiled `try` when an exception escapes uncaught (row 890). The modifier guard, shared by functions and methods, admits `test`; a `test` method compiled and ran in one probe, ungated. Still refused: `Bottom`, `Self` or an abbreviated type as that static argument, a tuple holding `Any` (row 889), and `override` (row 650).
- **Conditions:** Code generator, compiled path.
- **Consequence:** These three constructs no longer stop codegen; but on the compiled path `finally` runs after (or is skipped by?) an escaping exception, a known defect with an expected-failure test.
- **Evidence:** `CodeGen.java:2947-2949`; `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`, `XXXFinallyOnEscape.test`; `rung-codegen-walls/REPORT.md` sections 1, 2, 5; `reviews/batch-25-review.md`.
- **Could not resolve:**
  - "throws on, as a `ForbiddenException` chained to it, an exception ... by the library's own constructor": the sentence is hard to parse; I read "throws on" as "rethrows onward", but it took several readings. Unclear wording.
  - "It throws before the `finally` clause runs": does `finally` then never run, or run in the wrong order? The defect behind row 890 is not stated. Unclear wording.
  - "an abbreviated type": not in the skill (an array shorthand like `ZZ32[3]`? a type alias?). Language concept I lack.

## P-38

- **Decided:** The compiler prelude's own text will not be repaired; its defects are deleted with it at the switch-over. If a shared `nativeHelpers/` helper is fixed for the one library, the prelude's behaviour changes with it and that is accepted (F-313).
- **Applies:** Until the prelude is deleted at the switch-over. Its `Maybe` block and its `REM` guard `if other = -1 then 0` stay as they are, and their tests stay.
- **Requires:** Do not edit the prelude to fix defects; do not drop its tests. At the switch-over: respell the compiled tests' uses of the prelude's reversed wrapping and saturating operators (row 348); close `ZZ64`'s compiled shift (row 381); bring the specification's `shift` to the compiled path (row 383); promote `XXXShiftDeclRungI`; and find the compiler tests that bind `shift`, which becomes a reserved name.
- **Unfinished:** All the switch-over steps above.
- **Could not resolve:**
  - "Its `Maybe` block": what defect it has is not said. Unclear wording (the worker only needs to leave it alone, so not a blocker).
  - "`ZZ64`'s compiled shift closes (row 381)": "closes" read as "its ledger row closes", but it could mean the behaviour is fixed by the switch-over itself. Unclear wording.
  - "the switch-over batch finds the compiler tests that bind `shift`": what it must do with them (rename the binding? delete the test?) is not said. Unclear wording.
  - "the compiled tests respell": whether the test text changes (the operator names) or only the meaning changes is inferred. Minor.
