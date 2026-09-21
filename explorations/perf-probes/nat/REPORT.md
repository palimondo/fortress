<!-- The nat shadow prototype: the minimal design of explorations/reviews/nat-checking-plan.md
(c) built beside the tree and measured, 2026-09-21, by a delegated worker on Pavol's approval
(POSITIONS.md, 2026-09-21).  Nothing tracked was modified: the design lives in classpath
shadows of seven Scala sources, compiled with the build's own scalac entry point and put first
on the classpath, the technique of perf-probes/prelude/run-all.sh:33-35 and
perf-probes/prelude/exclusion-trace/run-all.sh.  Every run had its own -Dfortress.caches or
FORTRESS_CACHES outside the repository; default_repository/ was never written.  Commands:
run-all.sh.  Captures: the .out files beside it.  The diff against the tree: shadow.patch.
Every claim carries a file:line or a capture. -->

# The nat shadow

> **Followed up the same day: `followup.md`.** The two `subarray` errors of § 5a/§ 5c and § 11
> were the *rule's*, not the library's, and are fixed in `shadow.patch` (the library goes 117 →
> 115, and the equality rule then causes no library error at all); the § 5b slowdown was the
> tree's unmemoized `TypeAnalyzer.parents`/`excludesClause`, not the nat track, and with a memo
> the per-declaration run finishes — 446 of 446 in 307 s. Numbers below are the pre-followup
> ones and are left as they were measured.

## 0. What was built, and the short answer

Built: the minimal design of `explorations/reviews/nat-checking-plan.md` § c — nats as symbols
and literals, unification by equality, a literal binds a symbol, no arithmetic — with Pavol's
two rulings built in: decision **E2** (an unknown size after inference is an error only when it
reaches a type, a name or a value, and nothing otherwise) and **option B** for the inference
variable (an `IntRef` with a reserved name, `$nat$<n>`, because option A's new AST node cannot
live in a classpath shadow). The `checkP` relaxation of
`perf-probes/prelude/exclusion-trace.md` is deliberately **not** in this shadow, so the
exclusion errors stay and the counts are comparable.

Five things came out of it.

1. **It works on the shape the specification's own example has.** `pNat1.fss` (the nat inferred
   from an argument type), `pNat2.fss` (written out), `pNatVec.fss` (the spec's `makeVector`,
   one symbol in the parameter list and the return type, plus the size in value position) all
   pass the checker and reach code generation; a deliberate mismatch and arithmetic in a type
   are both refused with an error that names the reason; a `bool` parameter gets a checker error
   naming the kind instead of `NI.nyi()`. The five nat compiler tests are byte-identical.
2. **Bug (i) of the plan is two bugs, and the second one is in Java.** The crash the plan could
   not locate by reading is `AbstractMethodChecker.scala:83` — Scala, and one line to fix. But
   behind it sits the *same* mistake in
   `compiler/codegen/FnNameInfo.java:162-173, 195-196`, which every checked *method invocation*
   on a nat-parameterized receiver reaches. **Decision F's first stop condition is met**: the
   plan's "no Java file" (§ d) is void.
3. **Decision F's second stop condition is met too.** A nat-parameterized object compiles and
   the class loader then asks for the RTTI class of the size: `NoClassDefFoundError: 3$RTTIc`.
   A nat argument does need a new run-time kind in `runtimeSystem/`.
4. **The library's crash is gone and nothing that was reported before disappeared.** 93 errors
   → 117, all 24 new ones in the one api whose overloading check used to crash. 22 of the 24 the
   new rule only makes *reachable*; **2 it causes, and those two look wrong** — the return-type
   rule on the two `subarray` overrides, whose subtyping the api declares outright. That is the
   one thing here that has to be understood before the real edit lands, and the obvious guess
   about it was tested and refuted (§ 5c).
5. **The real edit is bigger than the plan said**: 7 Scala files, about 225 lines of code added
   and 79 rewritten, 38 functions — and a Java file besides. And it has a cost the plan
   does not mention: the 112 library declarations that used to abort are now really checked, and
   the biggest of them take minutes each (§ 5b).

## 0b. The measurements, in one table

| # | measurement | result | capture |
|---|---|---|---|
| 1 | `pNat1.fss` (nat inferred) through `fortress compile` | **no error**; `fortress run` then fails in the class loader, `NoClassDefFoundError: 3$RTTIc` | `01-probes-shadow.out`, `01b-pNat1-run-stack.out` |
| 1 | `pNat2.fss` (nat written out) | **no error**; same run-time failure. Bug (i) found: `AbstractMethodChecker.scala:83`, **Scala** — and a second site of the same mistake in **Java**, `FnNameInfo.java:162-196` | `01-probes-shadow.out`, `06-natextends1.out` |
| 1 | `pNat3.fss` (type-parameter control) | unchanged: compiles, runs, prints `7` | `01-probes-shadow.out` |
| 1 | `unbox[\4\](Box[\3\](7))` (`pNat4.fss`) | **refused**: `[\4\]Box[\4\]->ZZ32 is not applicable to an argument of type Box[\3\]` | `01-probes-shadow.out` |
| 1 | `Box[\k+1\]` (`pNat5.fss`) | **refused as ill-formed**, with the reason named. The interpreter refuses it too | `01-probes-shadow.out`, `07-interpreter-arithmetic.out` |
| 1 | `Box[\2+1\]` at a use site (`pNat6.fss`) | **refused**, but as "not applicable", not as ill-formed — the well-formedness check is on the type, not on the static argument (§ 3). The interpreter runs it and prints `7` | `01-probes-shadow.out`, `07-interpreter-arithmetic.out` |
| 1 | the specification's `makeVector` shape (`pNatVec.fss`) | **compiles with no error**; fails at load like `pNat1` | `01-probes-shadow.out` |
| 1 | a `bool` parameter (`pNatBool.fss`) | a checker error naming the kind, not `NI.nyi()` | `01-probes-shadow.out` |
| 2 | `Compiled1.ah`, `.av`, `Compiled6.af`, `Compiled1.p`, `Compiled5.z` | **byte-identical** stock and shadow, all five as their `.test` files demand | `02-compiler-tests.out` |
| 2 | `Compiled12.invariantInference` (added) | compiles, links, runs, prints the expected twelve lines | `08-inference-regression.out` |
| 3a | `WorldFlip Library/FortressLibrary.fss`, whole units | the `makeInferenceArg` crash **gone**; **93 → 117** errors; nothing that was reported disappeared; the 24 new ones are all in `NativeArray`, the api that used to crash | `03a-lib-worldflip-*.out` |
| 3b | the same, per top-level declaration | before: 446 declarations, 236 clean / 98 with errors / **112 crashed**. After: **stopped after 767 s at 46 of the 446** — of the four of the 112 it reached, two are clean and two report ordinary errors, none crashes; `trait Number` alone took about seven minutes (§ 5b) | `03b-lib-perdecl-{before,after}.out`, `03b-lib-perdecl-fates.txt` |
| 3c | the same with the equality rule switched back off | **115** — so 22 of the 24 are only *reachable* now, and **2 the rule causes**, and those two look wrong (§ 5c) | `03c-lib-argsalwaysequal.out` |
| 3f | the same with `imp`'s nat conjunct dropped, to explain those two | **117** — unchanged, so that guess is wrong (§ 5c) | `03f-imp-{on,off}.out` |
| 4 | `FlatArrays.fss` (C4) and `FlatArrays2.fss` (APL) under `WorldFlip` | the crash **gone** in both; **66 → 68** errors each; **no nat-related error left in either library's own declarations** | `04-flatarrays*-{before,after}.out` |
| 5 | the export checker on a dead size (F question 2) | with `equalIntExprs` repaired, the dead-size declaration is reported — by the parameter-list comparison, not by `equalIntExprs`; without the repair, every signature carrying a size is reported too | `05-exportchecker.out` |
| 6 | `NatExtends1` (F question 3) | the **checker** dies in Java (`FnNameInfo.java:196`). Without a declared method (`NatExtends2`), **codegen refuses**: `Only emitting RTTI for types right now`, `CodeGen.java:5793`. The loader never sees it | `06-natextends1.out`, `06b-natextends2.out` |

**Stop conditions (decision F).** The first — "the crash's fix is in a Java front-end class" —
**is met** (`FnNameInfo.java`). The second — "a nat argument needs a new run-time kind in
`runtimeSystem/`" — **is met** (`3$RTTIc`; `Naming.isOprKind` is the only kind predicate the run
time has). Neither was fixed here; both threads stop and come back to Pavol with the capture.

## 1. Method

Seven tracked Scala sources were copied into `shadow-src/`, edited, compiled with the build's
own compiler entry point — `java -cp "$CP" scala.tools.nsc.Main -d shadow-classes -classpath
"$CP" -encoding UTF-8 …`, which is what `build.xml:557-568` runs — and put ahead of
`ProjectFortress/build` on the classpath. The tracked files are untouched. `shadow.patch`
beside this report is the unified diff; the copies themselves and the classes compiled from
them are **not** committed and were removed after the run, so `run-all.sh` rebuilds both — it
copies the seven tracked sources into `shadow-src/`, applies `shadow.patch` to the copies, and
compiles them into `shadow-classes/`.

The five files of the plan's § f, plus two the plan did not name:

| file | why it is in |
|---|---|
| `scala_src/typechecker/Formula.scala` | the third constraint track (plan § c) |
| `scala_src/types/TypeAnalyzer.scala` | `pEqv(StaticArg, StaticArg)`, the cast guard in `pSub` |
| `scala_src/useful/STypesUtil.scala` | `makeInferenceArg`, `hasInferenceVars`, the result args |
| `scala_src/typechecker/ExportChecker.scala` | `equalIntExprs` |
| `scala_src/typechecker/TypeWellFormedChecker.scala` | refuse arithmetic inside a type's static arguments |
| **`scala_src/types/TypeSchemaAnalyzer.scala`** | **not in the plan.** `reduceED` destructures `Formula.unifyWithDebug`'s result as a triple (`:404`) and calls `cMap(ub, ts, os)` (`:410-411`); with the nat track those become a quadruple and a four-argument call. Without this file every run died with `ClassCastException: scala.Tuple4 cannot be cast to scala.Tuple3` at `TypeSchemaAnalyzer.scala:404`. The plan's own note — "callers of `Formula.solve`/`unify` that destructure the pair must be updated … `grep -rn "solve(\|unify("`" — misses it because the call is `unifyWithDebug(`. |
| **`scala_src/typechecker/AbstractMethodChecker.scala`** | **not in the plan.** This is bug (i); § 8 below. |

Two decisions inside the shadow are worth naming because they are not in the plan.

**The nat inference variable's key is a `String`, not the node.** The generated AST `equals`
compares the `ASTNodeInfo` — `IntBase.java`'s own `equals` compares `getInfo()` before
`getIntVal()`, and `IntRef.java`'s compares `getInfo()`, `getName()` and `getLexicalDepth()` —
so two literal `3`s written at different source positions are *not* equal as nodes, and neither
are two `IntRef`s for the same parameter with different spans. A node used as a map key would
therefore be unreliable. `And`'s third map is keyed by the reserved name
(`Formula.scala`, `case class And(… ns: Map[String, NPrimitive])`), and all comparison of
sizes goes through one function, `Formula.nEq`, which ignores spans: two `IntRef`s are equal
when their identifiers match, two `IntBase`s when their `BigInteger` values match, and an
`IntBinaryOp` is equal to nothing.

**`makeSub` could not be reused.** `Formula.makeSub` separates inference variables from terms by
runtime class (`m.erasure.isInstance`), which works for types and ops because
`_InferenceVarType` and `_InferenceVarOp` are their own classes. Under option B a nat variable
*is* an `IntRef`, so the partition has to be by predicate; `un` gained a six-line hand-written
twin. This is a cost of option B that the plan did not price, and it disappears under option A.

## 2. The rules as built

`pEqv(IntArg, IntArg)` in `TypeAnalyzer.scala` is the plan's table, unchanged:

| left | right | result |
|---|---|---|
| inference variable `$nat$k` | the same variable | true |
| inference variable | anything else `e` | the equality constraint `$nat$k = e` |
| `IntRef n` | `IntRef n` | true |
| `IntRef n` | `IntRef m`, `IntBase 3` | false |
| `IntBase 3` | `IntBase 3` | true; different literals false |
| anything containing `IntBinaryOp` | anything | false; and a *type* that contains arithmetic is refused as ill-formed before that (but see § 3 for where the well-formedness check does not reach) |

The equality track is solved exactly as the op track is: cliques from `getEquality`, unified in
`un`, with a clique that holds two different sizes, or anything that is not a symbol or a
literal, having no unifier. `reduce`'s nat twin refuses a variable constrained to two different
sizes, and `neg` has a nat branch so that negation stays total.

**Decision E2, concretely.** There is no `killNatIvars` and no default to 0. An unsolved nat
variable is simply left in place; `hasInferenceVars` was extended to find one, so an unknown
size that reaches a **type** is reported by the existing "not enough context" path
(`impls/Functionals.scala:248-250`), and one that reaches nothing is never looked at. That is
why the api's dead sizes pass: their parameters occur in no domain, no range and no body, so no
constraint about them is ever generated and no entry for them ever enters the solver.

The plan says six such declarations at `Library/FortressLibrary.fsi:1508-1523`. Measured, the
api has **25** declarations with at least one dead size, and the six with a dead `nat m, nat p`
are at `:1511, :1514, :1517, :1520, :1523, :1526` — the plan's line range is three lines early
and stops one short. The others: a dead `nat o` in the three `subarray` methods (`:1401`,
`:1423`, `:1451`) and two dead offsets in the 2-D one (`:1562`); a dead `nat m` in three vector
operators (`:1499-1505`); a dead `nat p` in eight matrix operators (`:1624-1646`); and a dead
`nat n` in four traits whose parameter is part of their identity (`:1068, :1089, :1091, :1093`).
Under E1 (default to 0) or E3 (delete them) the library edit would be 25 declarations, not six.

**What is deliberately not in.** The `checkP` relaxation of
`perf-probes/prelude/exclusion-trace.md` § 5 (landed 2026-09-21) is not here, so the library's
exclusion errors stay and the before/after counts are comparable. Exclusion between two nat
literals is also untouched (`TypeAnalyzer.scala:447-451`, "Todo: Handle int, nat, bool args"):
an overload set distinguished only by two sizes is still rejected as ambiguous, the
conservative side, and the team wanted it allowed (`internal-document.tex:183-198`). `bool`,
`dim` and `unit` get a named checker error, not rules. `where`-clause `NatConstraint`s and
`requires` contracts are untouched.

## 3. The probes (§ e step 2)

All in the **compiler's own world** — `CompilerLibrary` as the prelude — compiled into a private
cache that the shadow built from scratch in library order. Capture: `01-probes-shadow.out`;
`pNat1`'s run-time failure in full: `01b-pNat1-run-stack.out`.

| probe | what it is | `fortress compile` | `fortress run` |
|---|---|---|---|
| `pNat1.fss` (prelude probe) | `unbox[\nat k\](b: Box[\k\])`, the nat **inferred** from the argument type | **exit=0**, no error | `NoClassDefFoundError: 3$RTTIc` |
| `pNat2.fss` (prelude probe) | the same with `unbox[\3\](…)` written out | **exit=0**, no error | `NoClassDefFoundError: 3$RTTIc` |
| `pNat3.fss` (prelude probe) | the type-parameter control | exit=0 | `7` |
| `pNat4.fss` | the deliberate mismatch `unbox[\4\](Box[\3\](7))` | **1 error**: `[\4\]Box[\4\]->ZZ32 is not applicable to an argument of type Box[\3\]` | — |
| `pNat5.fss` | arithmetic in a declared type, `b: Box[\k + 1\]` | **2 errors**: `Ill-formed type: Box[\k+1\] / Arithmetic on nat static arguments is not checked; use a nat parameter or a literal.`, and the call then does not apply | — |
| `pNat6.fss` | arithmetic in a static argument at the use site, `Box[\2 + 1\](7)` | **1 error**, but a different one: `[\3\]Box[\3\]->ZZ32 is not applicable to an argument of type Box[\2+1\]` | — |
| `pNatVec.fss` | the specification's `makeVector` shape: one nat in the parameter list and the return type, explicit instantiation, the size inferred at a call, the size in value position | **exit=0**, no error | `NoClassDefFoundError: 3$RTTIc` |
| `pNatBool.fss` | a `bool` static parameter | **1 error**: `Static argument inference for the bool static parameter b is not supported by the type checker.` | — |

So the checker half of § e step 2 is green on every line of it, including the two refusals, and
including the case the plan expected to need bug (i) found (`pNat2`) — which it did.

Three notes.

**The specification's own example could not be run as it stands.** `SpecData/examples/basic/StatParam.Nat.fss`
is `makeVector[\T extends Number, nat s0\]():Vector[\T,s0\] = vector[\T,s0\]`, and `Vector`,
`vector` and `Number` are all the *interpreter* library's; the compiler's prelude has none of
them (its one nat-parameterized declaration is the deliberately empty
`trait Matrix[\T, nat s0, nat s1\]` at `Library/CompilerLibrary.fss:512`). `pNatVec.fss`
reproduces the shape over a local carrier and says so in a comment.

**Where the two paths really differ is narrower than the plan says.** The plan expects the
refusal of arithmetic to be the one place the compiled and interpreted paths diverge. Measured
on the interpreter (`07-interpreter-arithmetic.out`), `pNat5` — arithmetic in a *declared*
parameter type — is refused by the **interpreter too**:
`Unification error: Cannot unify Box[\4\] … with Box[\k+1\]`, because
`IntNat.unifyStaticArg` (`interpreter/evaluator/types/IntNat.java:127-147`) does a literal
comparison, a symbol binding, or an error, and an `IntBinaryOp` is none of those. The
divergence is `pNat6`: arithmetic in a static argument written at the *use* site, `Box[\2 + 1\]`,
which `EvalType.forIntArg` (`interpreter/evaluator/EvalType.java:431-464`) evaluates to the
type `Box[\nat 3\]` — the interpreter prints `7`, and the shadow refuses it. So the minimal
design costs exactly one shape: a computed static argument at a use site, which no program in
the census writes.

It refuses it, though, with the wrong message, and that is a gap in the shadow worth naming.
The well-formedness check on arithmetic lives in `TypeWellFormedChecker`'s `STraitType` case,
so it fires on a *type* that contains arithmetic (`pNat5`, `Ill-formed type: Box[\k+1\]`) but
not on a static argument written on a *reference* (`pNat6`, whose `IntArg(2+1)` hangs off an
`SFunctionalRef`, `TypeWellFormedChecker.scala:134-142`). There the refusal comes from the
equality rule instead — `IntBase 3` is not `IntBinaryOp`, so nothing applies — and the message
says "not applicable" rather than "arithmetic is not checked". The real edit should put the
check on the `StaticArg` rather than on the `TraitType`.

**`pNat1` compiles but does not run, and that is the run-time gap.** The loader builds the
generic instantiation `pNat1.Box?3` and then asks for the RTTI class of each static argument:
`MethodInstantiater.rttiReference` recurses over every argument at `:124-126` after filtering
out only the `opr` ones (`:117-120`, `Naming.XlationData.isOprKind`, `Naming.java:103`), so the
literal `3` reaches `:138` and the JVM is asked for `3$RTTIc`, which nothing emits. The kind tag
exists — `Naming.XL_INTNAT = "intnat"` (`Naming.java:213`) — and the `.xlation` side file
records it (`staticParameterKinds()`, `Naming.java:87-93`), but `isOprKind` is the only
predicate the run time has and there is no RTTI representation for a size. § 8.

**The `bool` error is a thrown `StaticError`, not a logged one.** `makeInferenceArg` has no error
log, so the shadow throws `TypeError.make(…)`, which `Shell.java:493` catches and reports as an
ordinary compile error with a span and a count. It ends the compile at the first such parameter
rather than collecting them. Naming the kind was the requirement; collecting them would need an
error log threaded into `STypesUtil`.

## 4. The five nat compiler tests (§ e step 1, narrowed)

`ant testFast` was not run: the shadow is not on its classpath. The five tests were run the way
their `.test` files drive them — `Compiled1.ah`, `Compiled1.av` and `Compiled6.af` are
`typecheck` tests (`compiler_tests/AfterTypeChecking.test`), `Compiled1.p` and `Compiled5.z` are
`compile` tests with an exact expected error (`compiler_tests/XXX1p.test`,
`XXX5z.test`) — once with the stock build and once with the shadow first on the classpath.

**The two halves of `02-compiler-tests.out` are byte-identical** apart from the word `stock` /
`shadow`: three clean typechecks (`exit=0`), `Compiled1.p` with exactly
`Compiled1.p.fss:21:31: m is undefined.` and `Compiled5.z` with exactly
`Compiled5.z.fss:15:1-38: Singleton object O must not have a contract.`, both `1 error`,
`exit=255` — which is what `compile_err_equals` in the two `.test` files demands. None of the
five regresses.

### 4b. One more regression check, because the five nat tests are a narrow net

`compiler_tests/Compiled12.invariantInference.test` is a `compile`/`link`/`run` test with an
exact expected output, and it is about *type*-argument inference with variance — the machinery
the nat track shares (`Formula.solve`, `unify`, `cMap`). Under the shadow, in the private cache,
`Compiled12.invariantInference2.fss` and `Compiled12.invariantInference.fss` both compile with
`exit=0` and the program prints the twelve lines the test's `run_out_equals` lists, in order,
ending `Wsub Inv` (`08-inference-regression.out`).

## 5. The interpreter's library, before and after

Two runs each way, both with the interpreter's library as the prelude and the compiler's phase
order — Pavol's `WorldFlip` (`perf-probes/prelude/WorldFlip.java`).

### 5a. The whole-unit run

`WorldFlip Library/FortressLibrary.fss` with the prelude probe's instrumented `StaticChecker`,
which names each compilation unit and survives a crash. Captures:
`03a-lib-worldflip-before.out`, `03a-lib-worldflip-after.out`.

| | before | after |
|---|---|---|
| `makeInferenceArg` crash | **yes**, `OverloadingChecker` on `NativeArray` | **gone**; no crash anywhere in the run |
| `TypeProxy` / `NatReflect` / `Stream` / `AnyType` / `Writer` | 0 each | 0 each |
| `List` / `FlatString` / `String` / `FortressBuiltin` | 2 / 4 / 12 / 18 | 2 / 4 / 12 / 18 |
| `FortressLibrary` api | 110 | 110 |
| `RangeInternals` api | 104 | 104 |
| `NativeArray` api | 0 (it crashed) | **48** |
| **reported, deduplicated** | **93** | **117** |
| elapsed | 21 s | 32 s |

The before-run reproduces the current baseline of 93
(`perf-probes/prelude/exclusion-trace/01-baseline-trace.out`; the prelude `REPORT.md`'s 92 is
older than the tree).

**No error that was reported before disappeared.** A line-by-line diff of the two captures has
exactly one deletion — the count line — and 24 new errors, all of them in the one api whose
overloading check used to crash and now runs:

| new error | count |
|---|---|
| `Invalid overloading of fill in trait PrimitiveArray` / `PrimImmutableArray` | 22 |
| `For subarray, the return type of … should be a subtype of the return type of …` | 2 |

### 5b. Per top-level declaration — and the one measurement that did not finish

The instrument is the per-declaration method of `perf-probes/prelude/desugar-codegen.md` § 2.3:
that probe's shadow `StaticChecker` checks the component one top-level declaration at a time and
catches what each one throws, so every declaration gets a `@@TC DECL-OK` or `@@TC DECL-CRASH`
line. Its shadow classes and the nat shadow's do not overlap, so they stack on one classpath.
`PhaseProbe -order typecheck -Dprobe.tolerant=true`, the nat shadow in front or not.

**Before**, in 554 s: 446 declarations, **236 clean, 98 with errors of their own, 112 crashed**
— the same 112 the earlier census found, by the same four sites: 81 `NI.nyi` at
`STypesUtil.makeInferenceArg`, 29 `ClassCastException` at `NodeUpdateVisitor.forIntArg:5310`, 1
`RuntimeException` at `TypeAnalyzer.typeCons`, 1 `InterpreterBug`.

**After**: the run was **stopped by hand after 767 s, having reached 46 of the 446
declarations.** It was not stuck — it was checking. The 45th declaration is `trait Number`
(`Library/FortressLibrary.fss:352:1-423:2`), the root of the numeric tower with
`comprises { RR64 }` and the library's arithmetic overload set below it; the tree crashes on it
in milliseconds at the first `nat` it meets, and the shadow spent something like seven minutes
on it and then passed it **clean**. The next two, `trait RR64` (`:425`, 14 errors, the same 14
as before) and `simplestRationalBetween` (`:474`, 10 errors, a crash before), followed in the
remaining time.

**That is the cost, and it is the report's least comfortable number.** The nat track does not
make the checker slower at what it already did — the whole-unit api run went 21 s → 32 s
(§ 5a), the five compiler tests are unchanged, the invariant-inference test compiles and runs
(§ 4b) — it makes 112 declarations *checkable that used to abort*, and checking them means
resolving every call in their bodies against the library's overload sets, inside the hierarchy
that produces the 93 exclusion errors. § 5c separates the new *errors* the equality rule causes
from the ones it only makes reachable; the *time* was not separated the same way, and § 11 says
so.

What the partial run does establish, for the declarations it reached:

| | before | after (46 declarations in) |
|---|---|---|
| clean | 236 of 446 | 36 of 46 |
| errors of its own | 98 | 10 |
| **crashed** | **112** | **0** |

Of the 112, **four** were reached, and all four had crashed at `NI.nyi`: two are now **clean**
(`:54`, `fail[\T\]`, and `:352`, `trait Number`) and two report **ordinary errors**
(`:331`, `trait AdditiveGroup`, two errors; `:474`, `simplestRationalBetween`, ten). **None of the declarations reached still crashes.** One
declaration went the other way — `:129` was clean before and reports one error now
(`03b-lib-perdecl-fates.txt` names it: `opr BIG LEXICO(g: Generator[\TotalComparison\])`,
which has no nat in it). That is the only such case in the 46, and § 5d says what it is.

And what can be said about the 112 without the run, from the sites:

* The **81 `NI.nyi`** are gone by construction. `makeInferenceArg` now only throws for `bool`,
  `dim` and `unit`, and the interpreter's prelude declares **no** `bool`, `dim` or `unit` static
  parameter at all — grep over `Library/FortressLibrary.fss`/`.fsi` and
  `ProjectFortress/LibraryBuiltin/*.fss`/`.fsi` finds none. So all 81 were `nat` or `int`.
  No crash of that kind appears anywhere in the two 03a runs either.
* The **29 `ClassCastException`s** split by which of the two sites of § 9 they come from, and the
  Java one is not fixed. `Library/FortressLibrary.fss:2145`, one of the 29, is
  `__subarray[\T, nat b0, nat s0, nat b, nat s, nat o\](…) = it.subarray[\b,s,o\](m)` — a method
  invocation with explicit static arguments on a nat-parameterized receiver, which is exactly
  the `impls/Functionals.scala:606` → `FnNameInfo.normalizedSchema` path that `NatExtends1`
  dies on (§ 8). Declarations of that shape still crash; declarations that crashed through
  `AbstractMethodChecker` do not. Counting which is which needs the run.
* The **2 others** (`TypeAnalyzer.typeCons`, `InterpreterBug: Type is not inferred` at
  `FortressLibrary.fss:1123`) have nothing to do with sizes and are untouched.

### 5c. Which of the new errors the new rule causes, and which it only makes reachable

`-Dprobe.nat.argsAlwaysEqual=true` keeps the whole shadow but restores the tree's answer that
any two `IntArg`s are equal (`TypeAnalyzer.scala:332`). So the crash is still gone and the same
declarations are still checked, but nothing is refused *because* two sizes differ. Same
`WorldFlip` run, same cache discipline: `03c-lib-argsalwaysequal.out` and, for C4's arrays,
`04c-flatarrays-argsalwaysequal.out`.

| run | `NativeArray` api | total, deduplicated |
|---|---|---|
| before (the tree's checker) | 0, it crashed | 93 |
| the shadow | 48 | **117** |
| the shadow, `argsAlwaysEqual` | 44 | **115** |

So of the 24 new library errors, **22 are only made reachable** by the crash being gone — the
`Invalid overloading of fill in trait PrimitiveArray` / `PrimImmutableArray` set, which the
overloading checker would have found in 2012 if it had got that far — and **2 are caused by the
new equality rule**. The two are the same error on two declarations, both measured against the
same third:

```
For subarray,
the return type of [\nat b, nat s, nat o\](ImmutableArray1[\T,0,s0\], ZZ32)->ImmutableArray1[\T,b,s\]
  @ FortressLibrary.fsi:1423:5-1427:5   should be a subtype of the
the return type of [\nat b, nat s, nat o\]((ReadableArray1[\T,0,s0\] & {…}), ZZ32)->ReadableArray1[\T,b,s\]
  @ FortressLibrary.fsi:1401:5-1404:36
```

and the same for `Array1`'s `subarray` at `:1451` against the same `:1401`.

**Those two are almost certainly wrong, and they are the shadow's own doing.** The api declares
`trait ImmutableArray1[\T, nat b0, nat s0\] extends { … ReadableArray1[\T,b0,s0\] }`
(`Library/FortressLibrary.fsi:1411-1413`), so `ImmutableArray1[\T,b,s\]` *is* a
`ReadableArray1[\T,b,s\]` by declaration, whatever `b` and `s` are — the return-type rule is
satisfied and the checker says it is not. The three `subarray` declarations are also the only
ones in that family with a dead size (`nat o`, § 2), which is suggestive but does not by itself
explain it: with `argsAlwaysEqual` the `o` is just as dead and the check passes. Reading did not
find the mechanism, and it is not fixed here. **This is the one thing in this report that must
be understood before the real edit lands**: the checker denies a subtyping the api declares
outright, which is a wrong answer and not a missing feature, and the shape it denies —
`X[\T,b,s\] <: Y[\T,b,s\]` where `X extends Y[\T,b0,s0\]` — is `Vector`'s, `Matrix`'s and
C4's.

On C4's arrays the rule causes nothing: `FlatArrays.fss` reports **68 errors either way**
(`04c-flatarrays-argsalwaysequal.out` against `04-flatarrays-after.out`), its api 4 either way.


**One guess at the mechanism, tested and refuted.** `TypeSchemaAnalyzer.reduceED` decides a schema
subtyping by `impliesWithDebug(and(nub, nieNotBottom), nc, debug)` (`:417`), where `nc` is what
survives unification and `nieNotBottom` is `negate(ta.equivalent(ie, BOTTOM))` (`:398`).
`Formula.negate` turns a nat equality into a nat *dis*equality (`nNotEquivalent`), and
unification cannot discharge one, so `nc` can keep an `ns` entry that `nub` does not have — and
`imp`'s nat conjunct, `forall(ms, qs, nImplies, nUnit)`, is then false, so `reduceED` returns
`None` and the pair is declared not a subtype. A third switch,
`-Dprobe.nat.impliesIgnoresNats=true`, drops that conjunct and nothing else:

| run | `NativeArray` api | total |
|---|---|---|
| the shadow | 48 | 117 |
| the shadow, `impliesIgnoresNats` | 48 | **117** |

**The hypothesis is wrong.** Dropping the nat conjunct of `imp` changes nothing: the two
`subarray` errors are still there (`03f-imp-on.out` against `03f-imp-off.out`, the control).
So whatever refuses the return type is not `imp`'s nat map — it is upstream, in `pSub`'s trait
case, in `pEqv(IntArg, IntArg)`'s own answer on these arguments, or in what
`TypeSchemaAnalyzer` feeds it. Naming it needs the constraint printed at that one comparison,
which is a print in a shadow and a run, and was not done. Recording the refuted guess is worth
the two lines it takes: it saves the next person the same experiment.

### 5d. The one declaration that gained an error

`opr BIG LEXICO(g: Generator[\TotalComparison\])` (`Library/FortressLibrary.fss:129-130`) is
clean before and reports one error after. It has no nat in it, so it is the only place in the
46 declarations reached where the shadow could be blamed for a new error rather than for making
one reachable. **Its message was not captured, and the attempt is on the record as a failure.** The
per-declaration probe counts errors per declaration; the error *texts* it prints under
`-Dprobe.dumpErrors=true` come from one place, the end-of-component summary the shadow
`StaticChecker` writes after the whole component has been checked
(`desugar-codegen/shadow-patch.py:67-74`, `@@TC COMPERR`). Both sides were re-run with the flag
under a 180 s bound; the before run reached 47 declarations, the after run 43, and **neither
printed a single `@@TC COMPERR`**, because a run that is cut off mid-component never reaches the
summary (`03e-lib-firstdecls-errors.txt`). Those two numbers are worth keeping: in 180 s the
shadow gets through 43 declarations, three short of where the 767 s run stopped, which locates
the whole difference in the one declaration after them. Getting this one message therefore needs the whole
after run — hours, § 5b — or a probe that prints per declaration, which is a change to another
probe's generator and was not made.

What can be said: the declaration is
`opr BIG LEXICO(g: Generator[\TotalComparison\]) = __bigOperatorSugar[\TotalComparison,…\](BIG LEXICO(), g)`,
a call to a four-type-parameter generic with no size anywhere in it, and the delta is exactly
one error. Its most likely relative is § 5c — a subtype or applicability check that the
equality rule turns from true into false — and it should be looked at in the same sitting.

## 6. The two array libraries (§ e step 5)

`WorldFlip` on `explorations/run-c4/src/FlatArrays.fss` (C4's array layer, 19 nat-parameterized
lines in its api) and `explorations/apl/mg/FlatArrays2.fss` (the APL rung's, 24). Captures:
`04-flatarrays-before.out` / `-after.out`, `04-flatarrays2-before.out` / `-after.out`.

| | `FlatArrays` before | after | `FlatArrays2` before | after |
|---|---|---|---|---|
| `makeInferenceArg` crash | **yes**, `OverloadingChecker` on the api | **gone** | **yes** | **gone** |
| the api's own errors | 0 (it crashed, so it reported none) | **4** | 0 (it crashed) | **4** |
| reported, deduplicated | **66** | **68** | **66** | **68** |
| elapsed | 16 s | 23 s | 17 s | 26 s |
| what the two new ones are | — | `Invalid overloading of fill in trait Diag` ×2 | — | the same two |

**No nat-related error is left in either library's own declarations.** Before, the
`OverloadingChecker` crashed on the api and so reported nothing about it; after, the api is
checked and the errors it gets are not about sizes — they are `Invalid overloading of fill in
trait Diag`, the *library's* `fill` overload set inherited through
`object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\]`
(`explorations/run-c4/src/FlatArrays.fsi:23`), the same family as the 22 new library errors of
§ 5a. The rest of each total is inherited from the interpreter library's own apis
(`FortressLibrary` 110, `FortressBuiltin` 18, `String` 12, `FlatString` 4), unchanged.

So the answer to § e step 5, for the checker: the nat gap in these two libraries is closed, and
what remains in front of them is the library's own hierarchy and overload sets — the separate
problem of `perf-probes/prelude/exclusion-trace.md`. Neither library reached DESUGAR or CODEGEN,
because the api errors stop the pipeline; what those phases would say is still untested.

Worth noting for the array work: `FlatArrays.fsi:30` declares
`transpose[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): Array3[\RR64,0,a,0,c,0,b\]` —
six sizes in one type, three of them symbols in permuted positions — and the equality track
handles it without a complaint of its own. That is the widest nat shape in the corpus and it is
covered.

## 7. The export checker, and decision F question 2

`ExportChecker.equalIntExprs` is `= false` with the comment "Not implemented!" in the tree
(`scala_src/typechecker/ExportChecker.scala:645-648`), so *every* exported signature whose types
carry a nat static argument fails the export check — the api and the component are declared
identically and the checker says they differ. The probes never reached that far before, because
the checker crashed first.

`pNatExp.fsi` / `pNatExp.fss` is the library's shape in miniature: `mk` and `len` declared
identically in api and component, their types carrying a nat static argument (`Vec[\T,s\]`), and
`opr DOT[\T, nat n, nat m\]` in the api against `opr DOT[\T, nat n\]` in the component — the
shape of `Library/FortressLibrary.fsi:1511-1527` against `.fss:2264-2280`. The A/B is one build:
`-Dprobe.nat.exportAsTree=true` puts the tree's answer back. Capture: `05-exportchecker.out`.

| `equalIntExprs` | what the export checker reports |
|---|---|
| `false` (the tree) | **3** missing declarations: `mk[\T,nat s\](x:T):Vec[\T,s\]`, `len[\T,nat s\](v:Vec[\T,s\]):ZZ32`, `DOT[\T,nat n,nat m\](…)` |
| structural (`Formula.nEq`) | **1** missing declaration: `DOT[\T extends Object,nat n,nat m\](a:Vec[\T,n\],b:Vec[\T,n\]):ZZ32` |

**Decision F question 2, answered.** Under E2 the export checker reports the dead-size
declaration, and it reports it as *the api declares something the component does not define* —
not through `equalIntExprs` at all, but through `equalListStaticParams`
(`ExportChecker.scala:613-627`), which compares the parameter lists by length, name and kind, so
`[\T, nat n, nat m\]` and `[\T, nat n\]` differ before any type is looked at. The message names
the api's declaration and its line. The six operators of the library (and the eight matrix ones,
and the four `subarray` methods) will each produce one such line — an *ordinary error at the
api*, not a crash, and not silence. E3 (delete the dead parameters) is what makes it go away;
E2 in the checker does not, and was never meant to.

## 8. `NatExtends1`, the code generator and the loader: decision F question 3

Two probes, because the first one does not get far enough to answer the question.

**`NatExtends1.fss`** — `trait Sized[\nat s\]` with a declared method `len()`, and
`object Buf[\nat s\](x: ZZ32) extends Sized[\s\]` implementing it. It dies **in the type
checker**, in Java: `ClassCastException: TraitType cannot be cast to IntExpr` at the generated
`NodeUpdateVisitor.forIntArg:5310`, through
`StaticTypeReplacer.replaceIn:102` ← `FnNameInfo.normalizedSchema(FnNameInfo.java:196)` ←
`impls/Functionals.scala:606`. `FnNameInfo.boundsFor` (`FnNameInfo.java:162-173`) returns a
**`TypeArg`** for every static parameter whatever its kind — for a `nat s` with no extends
clause, `TypeArg(TraitType FortressLibrary.Object)` — and `normalizedSchema` (`:179-197`) builds
a `StaticTypeReplacer` out of those, which rewrites the `IntRef s` inside `Sized[\s\]` into a
`TraitType`. Capture: `06-natextends1.out`. **This is the same mistake as bug (i) and it is in
Java**; § 9.

**`NatExtends2.fss`** — the same object with *no* declared method, so the Java bug is not in the
way. The checker passes it, and **code generation refuses it**:
`CompilerError: Only emitting RTTI for types right now` at
`CodeGen.generateTypeReference(CodeGen.java:5793)` ← `RttiClassAndInterface:5446` ←
`forObjectDeclPrePass:4424`. `CodeGen.java:5784` is the empty `else if (sta instanceof IntArg)`
branch that falls through to that throw. Capture: `06b-natextends2.out`. The plan cited
`:5752-5776` and the review `:5784-5792`; the throw itself is at `:5793`.

So, for F question 3: **codegen does not accept it; the loader never sees it; it does not run.**
And one step weaker — a nat-parameterized object with *no* `extends` at all, `pNat1` and
`pNatVec` — codegen *does* accept, and then the **loader** cannot stamp it, because it asks for
the size's RTTI class (`3$RTTIc`, § 3). Three separate pieces of work, in this order: the
checker's Java site, codegen's `IntArg`-in-`extends` branch, and a run-time representation for a
size.

## 9. Decision F's questions, and the stop conditions

**Question 1 — where does the `VarType`/`IntExpr` crash come from?** From **two** places, one
Scala and one Java, and the plan's bug (i) is only the first.

*Scala.* `AbstractMethodChecker.scala:83`:

```scala
val fakeArgs = tth.getStaticParams.map(p => NF.makeTypeArg(NU.getSpan(p), p.asInstanceOf[StaticParam].getName.getText).asInstanceOf[StaticArg])
```

A `TypeArg` for every static parameter, whatever its kind — the variable is even called
`fakeArgs`. For `object Box[\nat k\]` that is `TypeArg(VarType k)`, which
`STypesUtil.gatherMethods:1536` turns into a `StaticTypeReplacer` mapping `k`, and the replacer
then rewrites the `IntRef k` inside the declared methods' types into a `VarType`, whereupon the
generated `NodeUpdateVisitor.forIntArg:5310` casts it to `IntExpr` and throws. The full stack of
the tree's `pNat2` run confirms the caller: `NodeUpdateVisitor.forIntArg:5310` ←
`StaticTypeReplacer.replaceIn:102` ← `STypesUtil.gatherMethods:1547-1548` ←
`AbstractMethodChecker.checkObjectDeclaration:84`. The fix is one line: `STypesUtil.staticParamToArg`
(`:333-345`) already makes the kind-correct argument for every kind, and
`staticParamsToArgs` (`:365-366`) maps it over a list. Nine lines of the shadow, seven of them
comment.

*Java.* `compiler/codegen/FnNameInfo.java`: `boundsFor` (`:162-173`) returns a `TypeArg` for
every static parameter — the same mistake — and `normalizedSchema` (`:175-198`) builds a
`StaticTypeReplacer` out of the results. It is reached from the **type checker**, at
`impls/Functionals.scala:606`, which every checked method invocation on a generic receiver goes
through. `NatExtends1.fss` dies there (§ 8). Whether it is also the site of the library's 29
`TraitType cannot be cast to IntExpr` crashes (`perf-probes/prelude/desugar-codegen.md` § 5.1)
is **not settled**: the per-declaration capture keeps only the top six stack frames, which are
the same for both sites, and the after run did not reach any of the 29 (§ 5b). What is
established is the shape. One of the 29 is `Library/FortressLibrary.fss:2145`,
`__subarray[\T, nat b0, nat s0, nat b, nat s, nat o\](…) = it.subarray[\b,s,o\](m)` — a method
invocation with explicit static arguments on a nat-parameterized receiver, which is exactly
what goes through `Functionals.scala:606`.

**Decision F's first stop condition is met.** "The crash's fix is in a Java front-end class, so
the plan's 'no Java' and its size are void." It is not fixed here, per the brief. Everything
below `NatExtends1` was measured with it in place.

**Question 2 — what does the export checker report on the dead sizes under E2?** § 7: one
"missing declaration" line per api declaration whose parameter list the component does not
match, reported by `equalListStaticParams`, not by `equalIntExprs`. With `equalIntExprs`
repaired, that is the *only* export error left on the probe; without it, every signature
carrying a size is reported too.

**Question 3 — can a generic object with a nat argument in `extends` be stamped and run?** No,
at three separate points: the checker (Java, `FnNameInfo`), code generation
(`CodeGen.java:5793`) and the loader (`3$RTTIc`). § 8.

**Decision F's second stop condition is met.** "A nat argument needs a new RTTI kind in
`runtimeSystem/`." Measured: `MethodInstantiater.rttiReference:124-138` asks for the RTTI class
of every non-`opr` static argument, the tag `intnat` exists (`Naming.java:213`) and is recorded
in the `.xlation` side file, and `isOprKind` (`Naming.java:103`) is the only kind predicate the
run time has. That thread is stopped here.

Questions 4 and 5 (a typed route to a `double[]` store; the loader choosing a representation)
were out of scope: they wait on decision A.

## 10. The real edit, re-estimated from what was actually changed

`shadow.patch`: **332 lines added, 79 removed, in 7 files**, in 38 hunks. 100 of the added lines
are comment and 8 are the three probe switches, so the code is about **225 added and 79
rewritten, ~300 lines changed**. Functions touched:

| file | +/− | functions | of which new |
|---|---|---|---|
| `Formula.scala` | +229 / −59 | 22 | 14 (`nEq`, `nUnit`, `nEmptySub`, `natRef`, `natVarName`, `isNatIvar`, `isNatTerm`, `nSubstitution`, `insertNats`, `nMerge`, `nImplies`, `definitelyNotEqualNat`, `nEquivalent`, `nNotEquivalent`, `solveN`) |
| `TypeAnalyzer.scala` | +38 / −7 | 6 | 4 (`pEqv(IntExpr,IntExpr)`, `equivalentNat`, `notEquivalentNat`, `pNatEquivalent`) |
| `STypesUtil.scala` | +26 / −6 | 5 | 2 (`makeNatInferenceArg`, `unsupportedKind`) |
| `TypeWellFormedChecker.scala` | +15 / −0 | 2 | 1 (`hasArithmetic`) |
| `AbstractMethodChecker.scala` | +9 / −2 | 1 | 0 |
| `TypeSchemaAnalyzer.scala` | +8 / −3 | 1 | 0 |
| `ExportChecker.scala` | +7 / −2 | 1 | 0 |
| **total** | **+332 / −79** | **38** | **21** |

Against the plan's § d — "about 24 [functions], in 5 Scala files … No Java file … Roughly
200-300 lines": the line estimate holds, the file count is **7 not 5**, the function count is
**38 not 24**, and **"no Java file" is false** — `FnNameInfo.java` has to be fixed before any
method on a nat-parameterized receiver can be checked. Under option A (a real
`_InferenceVarInt` AST node) `Formula.scala` loses the hand-written `makeSub` twin and the
`String` keying, perhaps 25 lines, and gains one `Fortress.ast` line plus the regenerated
`nodes/` sources — generated-source churn that has to be read (`protocol.md` § 4).

A separate batch, in this order, for what the shadow proves is needed after the checker:
`FnNameInfo.java` (Java, small, in the checker's path); `CodeGen.java`'s
`IntArg`-in-`extends` branch; a run-time kind for a size in `runtimeSystem/`. That is the
review's Serious 6 count confirmed by measurement, and it is three pieces, not one.

## 11. What this does not settle

**The gate was not run.** `ant testFast` (~1,400 tests) and `ant testSystem` (382) were not
run, because the shadow is not on their classpath: `build.xml` builds the test classpath from
`ProjectFortress/build`, and getting the shadow in front of it means either editing `build.xml`
or landing the change. § e step 1 is therefore open, and so is § e step 3 (the not-working
catalogues re-run). What stands in for them here: the five nat tests byte-identical (§ 4), the
invariant-inference test compiled and run to its expected output (§ 4b), the type-parameter
control `pNat3` unchanged, and — the strongest signal — the interpreter's library and its
eleven apis type-checked before and after with **not one error text different** outside the api
that used to crash (§ 5a). One counter-example is on the record: in the per-declaration run,
`FortressLibrary.fss:129` gained an error (§ 5d). That is a lot of generic type-checking
exercised with one thing to explain, and it is not the gate.

**The shadow is not the change.** Option B (a reserved `IntRef` name) is a prototype device; the
real edit should use option A, and that regenerates every visitor class. `$nat$` names can also
leak: nothing in the shadow prevents an unsolved `$nat$k` from reaching `NamingCzar`'s
`XL_INTNAT` mangling for a *dead* size, because E2 only looks at types
(`hasInferenceVars`), not at the recorded static-argument list. The library's 25 dead sizes are
exactly the case, and the compiled path will meet it as soon as it gets that far. The "reaches a
name or a value" halves of E2 are not implemented.

**Two things the minimal design leaves conservative, on purpose, and their cost is unmeasured.**
Exclusion between two nat literals still does not hold (`TypeAnalyzer.scala:447-451`), so an
overload set separated only by two sizes is still ambiguous — the team wanted it allowed
(`internal-document.tex:183-198`), and no probe here shows what that costs the array libraries.
And `where`-clause `NatConstraint`s are still ignored (`STypesUtil.scala:625`, "ToDo: Handle
where clauses"), which is what a checked `subarray[\nat b, nat s, nat o\]` would need to be safe
rather than merely well-typed.

**Why the rule refuses `subarray`'s return type is not understood.** § 5c: two of the library's
new errors are caused by the equality rule and they contradict a declared `extends` clause. One
guess was tested and refuted (it is not `imp`'s nat conjunct). Until it is explained the rule
cannot be trusted on `Vector`, `Matrix` or C4's arrays, whose shape is the same — even though
C4's arrays happen not to trip it (68 errors either way). This is the first thing to do.

**The time the checker now spends was not attributed.** § 5c separates the new errors the
equality rule causes from the ones it only makes reachable, but nothing here says how much of
the per-declaration slowdown is the rule and how much is simply checking the 112 declarations
that used to abort. The instrument exists — the same run with
`-Dprobe.nat.argsAlwaysEqual=true` and the same bound, counting declarations reached — and it
was not run. Before the real edit lands, it should be, because if the answer is "the rule", the
constraint solver needs a look before anything else does.

**The three pieces after the checker are only characterized, not costed.** `FnNameInfo.java`,
`CodeGen.java:5793` and a run-time kind for a size each have a located symptom and no estimate.
In particular, nothing here says what a size's RTTI object should *be* — a singleton per value
(one class per size, which is what the mangled name already implies) or a boxed `int` the
container carries — and that is a design question, not a repair.

**No *program* over the wide array shapes was checked.** The api declarations are: `FlatArrays`
and `FlatArrays2` carry `Array2[\T,b0,s0,b1,s1\]` and
`Array3[\RR64,0,a,0,b,0,c\]` — six sizes in one type, permuted between domain and range — and
the checker passes them with no complaint of its own (§ 6). But every *probe program* here has
one nat parameter, or two in the same position. What a call site that has to solve four or six
sizes at once does is untested, and that is the shape microGPT's kernels are made of.

**The `bool`/`dim`/`unit` error ends the compile.** It is a thrown `StaticError`, not a logged
one (§ 3), so a program with two such parameters reports only the first.

**Two defects of the prototype that option A removes for free.** `Formula.freshNatIvarName` is a
plain `var` counter and is not thread-safe, where `NodeFactory.make_InferenceVarType` mints
identity with `new Object()` (`NodeFactory.java:1166-1168`); and `$nat$` is a name, so nothing
stops a program from colliding with it (nothing a Fortress programmer can write begins with
`$`, but the shadow does not check). A real `_InferenceVarInt(Object id)` node has neither
problem.
