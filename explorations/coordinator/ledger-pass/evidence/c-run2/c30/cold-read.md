# Cold read: c-run2/c30

Read with CLAUDE.md and the fortress-repo skill core plus `references/records.md`, `interpreter.md`, `tests-writing.md`, `library.md` (term lookups only). The status words other than the three closing ones are defined only in the row template, which a cold reader may not read; I read `NEGATIVE-VERIFIED` as "the gap is confirmed, open, to be fixed" and `CONTESTED` as "an open question the record does not settle". `full text: history, row N` resolves through `records.md` to `explorations/fortress-gap-ledger-history.md`; "in the parent of `H`" resolves to `git show H^:PATH` (the form `library.md` uses); `P-NN` resolves to `$T 'P-NN'`.

## Row 27

- **Defect:** A dimension declared without a `default` clause (`dim Length`) is rejected at parse with "null is not a valid unit name.", though the grammar makes the clause optional. The parser's `dim` rule treats the absent clause (`a3`, `null`) as a bad unit name and also builds a bogus default unit where none is wanted.
- **Where:** The parser, so both paths: the `dim` rule in `ProjectFortress/src/com/sun/fortress/parser/OtherDecl.rats:75-83`.
- **Reproduce:** No test. Print the probe with `git show e879b6a44^:explorations/alias-units-probes/q3_bare_dim.fss` (it holds `dim Length`) and run it under walk; the parse refusal appears.
- **Status:** Open, confirmed: build a parser fix (accept `null` for the absent clause, make no default unit). The note "dimensions are not built past the parser" says a fix only removes the parse error; it does not make dimensions work. A worker may wonder whether the fix is worth doing alone, but the row does not say to wait.
- **Could not resolve:** "dimensions are not built past the parser": clear in words, but whether it means "fix anyway" or "low value, leave" is not said (unclear wording, mild). Nothing else.

## Row 387

- **Defect:** Under walk, a function whose return type is declared does not coerce its result to that type. `r(): Wide = NarrowOf(3)` returns the `NarrowOf` value, so `r().big` fails "Cannot find definition for method"; the compiled path coerces and answers `3`. Cause: the interpreter's return check is switched off (`if (true || t.typeMatch(x)) return x;`). Walk does coerce at bindings, fields, elements and arguments, just not at return. Other symptoms: `retR64(x: RR32): RR64 = x` gives an `RR32`; a `ZZ64` return of `2147483647` plus 1 wraps to `-2147483648`; an array `fill` with an `RR64`-returning function stores `ZZ32`s (row 153).
- **Where:** Walk only: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java:45`, shared with function expressions.
- **Reproduce:** Run `ProjectFortress/tests/XXXCoercionReturnRungC.fss` (an expected-failure test) under walk.
- **Status:** Open, confirmed: build a fix in walk's return check. Workaround until then: write the value at the declared type.
- **Could not resolve:** "`1.0 headDim`" in the workaround: `headDim` is a name from some program (microGPT, I guess) that the row does not introduce; the meaning, "write a literal of the declared type", is still clear (unclear wording, mild). "shared by function expressions": I read it as "the same code path also serves anonymous `fn` expressions, so they also do not convert", not certain (unclear wording).

## Row 486

- **Defect:** Under walk, a `nat` static parameter used as a value has run-time type `Int` (the value object of `ZZ32`), and `NN32` declares no coercion from it, so `u: NN32 = n` with `nat n = 3` is refused "RHS expression type Int is not assignable to LHS type NN32", while `u: ZZ32 = n` works. The compiled path accepts both. The specification says a `nat` parameter may appear wherever a `NN32` variable can.
- **Where:** Walk: the typed binding's coercion, `Coercions.coerce` in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:218-226`.
- **Reproduce:** Run `ProjectFortress/tests/XXXNatValueNN32RungK.fss` under walk.
- **Status:** Open, confirmed: build a fix in walk (give a `nat` value a run-time type `NN32` accepts, or let the binding convert it). Workaround: bind at `ZZ32`.
- **Could not resolve:** "unlike row 454's numeral, the compiled run accepts it": I take it that row 454 has the same mechanism for a numeral, refused on both paths, while this case only fails under walk; to be sure a worker must read row 454 (unclear wording, mild). The test's name says "RungK" but "Found by" says "rung U": harmless, but looks inconsistent.

## Row 509

- **Defect:** A capability difference recorded as deliberate: when a value's static type is wider than its run-time type, walk and the compiled path pick different instances of a generic body. With `n: Number` holding a `ZZ32` and `m: Number` a `ZZ64`, `op(n, m)` runs `op` at `[ZZ32, ZZ64]` compiled and at `[ZZ64, ZZ64]` under walk, because walk promotes from run-time types (P-59). With concrete static types, as in microGPT, the two agree. For an argument typed `Any`, compiled picks the "plain arm" and walk the generic one, because the compiled dispatcher joins two run-time types only when one is a subtype of the other.
- **Where:** Both paths' dispatch: walk's promotion by run-time type; compiled `joinStackNoUnion` in `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1887-1906`.
- **Reproduce:** No test. `git show 84aef6a4f^:explorations/reviews/option-2-soundness/O2Wide.fss` (and `O2Lone`, presumably `O2Lone.fss`, in the same folder), run on both paths and compare.
- **Status:** Deliberate: leave it. The specification resolves coercion statically and is silent on walk; P-59 is the decision behind walk's behaviour.
- **Could not resolve:** "the plain arm" and "the generic one": I guess `op` has a non-generic overload and a generic overload, but the row never shows the declarations, so I cannot tell what "plain arm" is (unclear wording). "`O2Lone` beside it": file extension not given (unclear wording, mild). For the `Any` case it does not say which path is right or whether that case is also deliberate (unclear wording).

## Row 527

- **Defect:** Under walk, an array whose static size lies between 2^31 and 2^32-1 dies with a raw `java.lang.NegativeArraySizeException` (e.g. `-1294967296` for `array1[\ZZ32, 3000000000\](7)`) from `AtomicArray.<init>`, with no Fortress source location. Such a size is a `ZZ64` value (row 418), and walk's array glue reads it with `getInt()`, which truncates (`(int) val`).
- **Where:** Walk: `PrimitiveArray.java:40`, `PrimImmutableArray.java:43`, `PrimImmutableRR64Array.java:36` in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`, and `FLong.java:23-26`.
- **Reproduce:** No test, because no gated test can tell a raw exception from a proper refusal. `git show ab067d9b6^:explorations/compile-ladder/rung-size-range/probes/skeptic/SkArraySize.fss`, run under walk.
- **Status:** Open, confirmed, and the fix is named: read `s0` as a `long` in the three `oneTimeInit` methods and raise a Fortress error naming a size above 2147483647, which is the refusal P-40 places with the array design. Build it.
- **Could not resolve:** `s0`: I read it as the first static size argument as the glue names it, but the row does not say (unclear wording, mild). "the refusal P-40 places with the array design": whether P-40 requires refusing sizes above 2^31-1 or only says where the refusal belongs needs `$T 'P-40'` (unclear wording; resolvable by lookup). Without a test, how a fix is shown done is left to the worker.

## Row 575

- **Defect:** A design conflict in the library: adding `RR64`'s `coerce(x: NN32)`, which P-75 decides on and the tree lacks, conflicts with P-74's rule. With it, every operator declared by both `RR64` and `ZZ64` becomes ambiguous for an `NN32` with a `ZZ32`, on both paths, since neither `ZZ64` nor `RR64` coerces into the other and a non-numeral tie is a static error; P-74 would give `ZZ64`. Measured on a library copy: 5 of the 18 interpreter tests using `NN32` fail under walk (`UnsignedTest.fss:51`, `fib13.fss:17`, `IntegerMinMaxRungM.fss:59`, `InferCoercionRungK`, `IntegerOrderNumerals`), and the checker refuses `z + u` and `u MAX z`.
- **Where:** Library's numeric coercions (`RR64`, `ZZ64`, `NN32`); effects on both paths.
- **Reproduce:** No test. Add the coercion on a copy of the library and run those tests; detail in `explorations/compile-ladder/rung-numeral-library/REPORT.md`, section 8.
- **Status:** Contested: wait on the curator. The ways to build it and their costs are in that report section; "the choice is the curator's (P-75)". Do not add the coercion on one's own.
- **Could not resolve:** P-75 appears twice in conflicting roles: "which P-75 decides" reads as a decision already taken to add the coercion, but "the choice is the curator's (P-75)" reads as still open. I cannot tell whether P-75 decided *that* the coercion comes and only *how* is open, or whether the whole question is open (unclear wording). "P-74's rule" and "where P-74 gives `ZZ64`": content of P-74 not stated; needs lookup. "The specification still says the conversion is explicit": unclear whether this argues against P-75 or is a pending spec edit (unclear wording). "A Numeral Whose Conversions Tie" in `basic/inference.tex` is not under `Specification-1.0-frozen/`, so I am not sure which specification tree holds it (unclear wording). Two test names lack `.fss` and line numbers.

## Row 683

- **Defect:** The compiled checker treats two different `nat` static parameters as necessarily different sizes. In `two[\nat a, nat b\]()`, `typecase Nt[\a\] of Nt[\b\]` is refused "The typecase clause, Nt[\b\], is unreachable.", while walk runs `two[\3, 3\]()` into that clause. Cause: `Formula.nDiffer` says two size references differ when they are written differently and neither is an "opened size".
- **Where:** Compiled checker: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:137`.
- **Reproduce:** Run `ProjectFortress/compiler_tests/XXXNatTwoParamArmChecker.test`.
- **Status:** Contested: wait on the curator. The spec's "Types" settles numeral-vs-numeral and parameter-vs-numeral but not parameter-vs-parameter; the team's Q&A in `Specification/appendices/internal-document.tex` ("Overloaded operators") reads a parameter as possibly equal to what it may be instantiated at, which would favour walk. "The reading is the curator's to choose." Related: row 767.
- **Could not resolve:** "an opened size": a checker concept (I guess a size from an opened existential or a size bound by unpacking) that I lack and could not find in the skill (language/checker concept). Whether the class "implementation gap (checker)" presumes the answer while the status says it is open: mild inconsistency (unclear wording).

## Row 767

- **Defect:** Neither path infers a static parameter that appears inside an arithmetic expression in a parameter type. `getp[\int i\](b: IBox[\i + 1\])` called with an `IBox[\3\]` is refused by the checker ("is not applicable to an argument of type IBox[\3\]") and fails under walk ("Cannot unify IBox[\3\]"), though `i = 2` fits since `IBox[\2 + 1\]` is `IBox[\3\]`. Compiled: `TypeAnalyzer.pEqv` binds an inference variable only when it stands alone, and there is no solver for size arithmetic. Walk: `IntNat.unifyStaticArg` binds only a numeral or a bare parameter.
- **Where:** Both: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:402-409` (compiled) and `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java:133-146` (walk).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXNatArithInferFromSum.test` (checker) and `ProjectFortress/tests/XXXNatArithInferFromSumWalk.fss` (walk).
- **Status:** Open, confirmed: build a fix (on both paths, by the row). Workaround: give the argument explicitly, `getp[\2\]`, which prints 2 on both paths. Related: row 683.
- **Could not resolve:** "Appendix I, 'When two sizes are the same'": which document's Appendix I (the specification under `Specification/`, the frozen one, or a paper) is not said (unclear wording). The class says "(checker)" though the claim and notes put the gap on both paths, walk included (unclear wording). `$i+1`: I read `$i` as the checker's printed form of an inference variable for `i` (notation not in the skill, guessable). The row does not say how much solving is wanted (only `i + k`, or general arithmetic), which matters for scope (unclear wording).
