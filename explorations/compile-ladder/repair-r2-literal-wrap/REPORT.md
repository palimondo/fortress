<!-- Repair R2 of the repair batch of 2026-09-18, the integer-literal wrap in the code
generator.  Ledger row 317; the verdict was established before the rung began, in
coordinator/REPAIR-BATCH.md section R2.  One line per paragraph. -->

# R2: the integer literal wrap in the code generator

## What was inherited, and what was re-verified

The batch's first container died at 23:22 UTC on 2026-09-18, 25 minutes in.  One commit
was on the branch, `7e666704`: the failing test, the four probes `r2a`, `r2b`, `r2c`,
`r2e`, and `probes/junit-before.out`.  The worktree also held the uncommitted edit to
`CodeGen.java` and `FIntLiteral.java`, a draft of this report, and `tmp/` logs whose last
line showed `library_tests/Integer.test` starting and never finishing.

Everything was re-run rather than read off those logs: the rung's own test (`OK (2 tests)`,
`probes/junit-after.out`, re-taken 23:33), every probe both ways (the `.after` files; phase
B had never reached them), and `Integer.test`, which is the run that had been cut off.  The
built classes were checked against the sources before trusting them:
`javap -c` on `build/.../codegen/CodeGen.class` shows `bipush 31` and `bipush 63` at the
two branch tests, and on `build/.../runtimeValues/FIntLiteral.class` shows `asNN64` reading
`largerVal` through `BigInteger`.

Five probes are new in this session: `r2d`, `r2f` (two diagnostics the repair restores),
`r2g`, `r2h` (what the interpreter does with the idiom the repair uncovers) and `r2i` (the
legal spelling of the two values that idiom was reaching for).

## What was wrong

`CodeGen.forIntLiteralExpr` chose the representation for a numeral's value by
`BigInteger.bitLength()`
(`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3859-3893`, under the
author's own comment "This might not work"), sending `bitLength() <= 32` through
`BigInteger.intValue()` and `bitLength() <= 64` through `BigInteger.longValue()`.

`bitLength()` counts no sign bit, so those two bounds are each one bit too wide: a
non-negative numeral of bit length exactly 32 or exactly 64 was truncated into a signed
slot and arrived wrapped negative, and `4294967295` and `18446744073709551615` both became
`-1` (`probes/r2a.compiled.before`).

## The specification, read rather than quoted from the ledger

`Specification/basic/expressions/literals.tex:83-86`: "A numeral containing only digits
(let $n$ be the number of digits) has type `NaturalNumeral[[n,10,v]]` where $v$ is the
value of the numeral interpreted in radix ten."  Nothing bounds $v$.

`literals.tex:104-108` says the same of a radix numeral: digits "then an underscore, then a
radix indicator (let $r$ be the radix) has type `NaturalNumeralWithExplicitRadix[[n,r,v]]`
where $v$ is the value of the $n$-digit numeral interpreted in radix $r$."  A radix-16
numeral is a natural number, not a bit pattern; this is the clause that decides the second
half of this rung.

`Specification/basic-lib/basic-integers.tex:368-370` and `:398-401`: "The wrapping and
saturating addition operators $\boxplus$ and $\dotplus$ do exactly the same thing, because
operations on type $\mathbb{Z}$ never need to wrap or saturate", and the same sentence for
subtraction.  Wrapping has its own spelling; it is not what an ordinary operation or an
ordinary coercion does.

## Where the fix belongs, answered before the edit

`map/spec-to-implementation.md:166` gives numerals their row: parser `Literal.rats:53`
`NumericLiteralExpr`, checker `Misc.scala:460-481`, interpreter
`Evaluator.forIntLiteralExpr:1506`, codegen `CodeGen.forIntLiteralExpr:3859`, prelude
`CompilerBuiltin.fsi:369` `trait IntLiteral`.

It is not in the parser or the AST: the node carries the value as a `BigInteger`
(`x.getIntVal()`), and the interpreter reads the same node and prints the true value
(`probes/r2a.walk.before`).

It is not in the folding phase, which is wired before `TYPECHECK` on the compile path only
(`compiler/phases/PhaseOrder.java:57,142-143`) and computes in `BigInteger` on
`getIntVal()` (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:31,60-61`, arithmetic
from `:63`): it is exact, and measurably so — before the repair the folded expression
`4294967295 + 1` already printed `4294967296` while the same arithmetic through two
bindings printed `0` (`probes/r2e.compiled.before`).

It is not in the checker: every numeral gets the one flat type `Types.INT_LITERAL`
(`scala_src/typechecker/impls/Misc.scala:467-468`) and the compiler world's `IntLiteral`
trait has six abstract getters and no static parameter
(`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:370-376`), so nothing in the static
types carries the value a checker would have to range-check.  The specification's numeral
types do carry it (`literals.tex:83-86`), which is why on this path the diagnostic can only
be a run-time one; that gap is recorded below, not repaired.

It is not in the prelude's coercions: the five that read a numeral
(`CompilerBuiltin.fss:501` `ZZ`, `:562` `ZZ64`, `:620` `ZZ32`, `:684` `NN32`, `:747` `NN64`)
all run after the value has already been wrapped.

So the fix belongs at the code generator's own site, and in the runtime value it
constructs, `compiler/runtimeValues/FIntLiteral`, whose two unsigned getters decoded the
wrap.

## Precedent search: the same decision, three times in this tree

The question "which representation carries a numeral's `BigInteger` value" is decided in
three places, and two of them are right.

`interpreter/evaluator/values/FIntLiteral.make(BigInteger)`
(`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`)
compares against `INT_MIN`/`INT_MAX` and `LONG_MIN`/`LONG_MAX` declared at `:21-27`, which
is exact for both signs.

`nativeHelpers/simpleIntLiteralArith.fromBigInteger`
(`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.java:30-33`),
written by rung 7, uses `bitLength() < 64` for the long slot and the decimal string above
it, which is exact for both signs and numerically the same boundary as `<= 63`.

`CodeGen.forIntLiteralExpr` used `<= 32` and `<= 64`, which is the wrong one, and the
comment above it recorded that its author was unsure.

A fourth precedent is inside the runtime value itself: `FIntLiteral.asZZ64` (`:74-77`) tests
`largerVal == null` before narrowing, and `asRR64`/`asRR32` (`:101-110`) read `largerVal`
when it is present.  That is the shape `asNN64` now takes.

For the second half of the rung — how to write a bounded type's extreme value — the
precedent is `Library/FortressLibrary.fss:703-704`: `getter minimum(): ZZ64 =
-9223372036854775807 - 1` and `maximum(): ZZ64 = 9223372036854775807`, a numeral in range
and then one subtraction.  `library_tests/Integer3.fss:49-50` uses the same shape
(`maxValue: ZZ32 = 7FFFFFFF_16`, `minValue: ZZ32 = -maxValue - 1`) three lines below the
declaration this rung had to repair.

## The edit, part one: the code generator and the runtime value

`CodeGen.java:3865` `l <= 32` becomes `l <= 31` and `:3875` `l <= 64` becomes `l <= 63`;
the author's "This might not work" is replaced by the invariant that makes the bounds
readable, that `bitLength()` counts no sign bit.

`FIntLiteral.asNN64` (`:85-95`) learns to read `largerVal`: a numeral of bit length exactly
64 now keeps its decimal string, and its unsigned value is in range for `NN64`.  It reads
the string as a `BigInteger`, accepts it when `signum() >= 0 && bitLength() <= 64`, and
returns `FNN64.make(v.longValue())`, whose low 64 bits are the unsigned pattern `FNN64`
stores (`runtimeValues/FNN64.java:17-22`).  This half is forced, and the coupling was
measured: with the code generator repaired and `FIntLiteral` left as the team wrote it, the
rung's own test fails with `Not in range for NN64: 18446744073709551615` thrown from
`asNN64` (`probes/junit-codegen-only.out`, `probes/r2b.compiled.codegen-only`).

`FIntLiteral.asNN32` (`:79-83`) becomes `largerVal == null && 0 <= smallerVal && smallerVal
<= 0x00000000FFFFFFFFL`.  **This half was not forced, and calling it forced would have been
wrong.**  The guard it replaces —
`0 <= (smallerVal & 0xFFFFFFFFL) && (smallerVal & 0xFFFFFFFFL) <= 0xFFFFFFFFL` — is
vacuous: masking a `long` to its low 32 bits always lands in `[0, 0xFFFFFFFF]`.  So it
accepted every value and could not throw, before the repair or after it; what it did was
truncate.  `probes/r2d` records what that cost: `n: NN32 = 4294967296`, a numeral one above
the largest `NN32`, was silently `0`, and now raises `Not in range for NN32: 4294967296`.
The same vacuity accepted the `BOGUS` sentinel `0xdeadbeefcafebabe` that a string-carried
literal leaves in `smallerVal` (`:25,37`).

## What part one uncovered, and the second half of the rung

`library_tests/Integer.test` is the corpus file the change reaches.  Before the repair it
was green, 27 tests (`probes/integer-test-before.out`).  After part one it had four
failures (`probes/integer-test-after.out`), and all four are one thing:

| test | thrown | site |
|---|---|---|
| `AverageTest` | `Not in range for ZZ32: 2147483648` | the **prelude**, `fortress.CompilerLibrary$ZZ32_MIN.<clinit>`, `Library/CompilerLibrary.fss:569` |
| `Integer3` | `Not in range for ZZ32: 2684354560` | `library_tests/Integer3.fss:46` |
| `Integer4` | `Not in range for ZZ64: 11529215046068469760` | `library_tests/Integer4.fss:46` |
| `IntegerChoose2` | `Not in range for ZZ32: 3037000500` | `library_tests/IntegerChoose2.fss:114` |

The first three are one idiom: a radix-16 numeral whose value is outside the annotated
signed type, written to mean the two's-complement bit pattern.  `ZZ32_MIN: ZZ32 =
8000'0000_16` means the `ZZ32` whose pattern is `0x80000000`; `twiceHuge: ZZ32 =
A0000000_16` means the `ZZ32` whose pattern is `0xA0000000`.  `literals.tex:104-108` gives
those numerals the values $2^{31}$ and $2684354560$, and the language has no bit-pattern
reading of a numeral.

`probes/r2g` and `probes/r2h` settle it: the interpreter has always refused the idiom —
`a: ZZ32 = 8000'0000_16` is "RHS expression type Long is not assignable to LHS type ZZ32",
and `a: ZZ64 = 8000'0000'0000'0000_16` is the same for `BigNum`.  So these are not correct
programs the repair broke.  They are programs the language does not accept, which the
compile path accepted only because the wrap turned them into something else, and on which
the two paths now **agree**.  The repair reduces the divergence between `walk` and the
compiled run; it does not create any.

The complete blast radius was measured rather than guessed: every numeral in the corpora
and the libraries whose value has bit length exactly 32 or exactly 64 was enumerated by
value, in every radix (`probes/boundary-numerals.txt`).  Eighteen of those lines are on the
compile path.  Twelve are in range for their annotated type (`CompilerLibrary.fss:574,576`
`NN32_MAX` and `NN64_MAX`, `ShiftTest.fss:32,33`, `NN32.fss:43,46`, `NN64.fss:45,46,48`,
`ZZ.fss:44`, `AverageTest.fss:118`, `ShiftTest2.fss:194`) and are now correct where they had
been right only by the wrap's accident.  Six are out of range: the five repaired here
(`CompilerLibrary.fss:569,571`, `Integer3.fss:46`, `Integer4.fss:46`,
`IntegerChoose2.fss:114`) and `library_tests/ChooseTest3.fss:125`, which is in no `.test`
file (`LibraryJUTest.java:36` sweeps `.test` files only), so it is not gated and is left for
the record rather than edited unverified.  The remaining lines the enumeration shows are in
the interpreter-only libraries `Library/QuickCheck.fss` and `Library/Random.fss`, which are
not part of the compile-path prelude, in `ProjectFortress/tests/`, whose two hits are
untyped comparisons of the same numeral to itself (`NumeralTest.fss:44-45`) and numerals
inside string literals, and in this rung's own test.

### The four repairs, and why each is the smallest faithful one

`Library/CompilerLibrary.fss:569,571` — `ZZ32_MIN` and `ZZ64_MIN` rewritten as
`-7FFF'FFFF_16 - 1` and `-7FFF'FFFF'FFFF'FFFF_16 - 1`, the spelling of
`FortressLibrary.fss:703`.  `ZZ32_MAX`, `NN32_MIN`, `NN32_MAX`, `NN64_MIN` and `NN64_MAX`
beside them are all in range and untouched.  `probes/r2i` confirms both values on both
paths: `-2147483648` and `-9223372036854775808`, identical in `walk` and compiled.

`library_tests/Integer3.fss:46` — `twiceHuge: ZZ32 = A0000000_16` becomes `-60000000_16`,
and `Integer4.fss:46` — `A000000000000000_16` becomes `-6000000000000000_16`.  These are
**value-preserving**: `0xA0000000` read as a signed 32-bit value is `-0x60000000 =
-1610612736`, and `0xA000000000000000` as signed 64-bit is `-0x6000000000000000 =
-6917529027641081856` (`probes/r2i`, third and fourth lines).  The assertions these feed —
`(huge BOXPLUS huge) = twiceHuge` at `Integer3.fss:99`, `(huge BOXMINUS minusHuge) =
twiceHuge` at `:106`, and the two in `Integer4` at `:99,106` — continue to assert exactly
what they asserted: that wrapping addition of `0x50000000 + 0x50000000` yields the `ZZ32`
whose pattern is `0xA0000000`.  Nothing is weakened and no assertion is removed.

`library_tests/IntegerChoose2.fss` — `3037000500` is bound at `ZZ64` before the loop
(`fastSlowBoundary: ZZ64 = 3037000500`, added among the file's own twenty-one `ZZ64`
constant bindings at `:35-55`) and the call at `:115` reads that binding.  The numeral was
being coerced at `ZZ32` because the loop variable `j` is a `ZZ32`, and `3037000500` is
outside `ZZ32`.  This one is not only an illegal program: under the wrap the test was
exercising `i = -1257966796`, not the $\sqrt{2^{63}}$ boundary its own comment at `:111-112`
names, so the assertion it makes was never the assertion it claims.  Binding the constant
at `ZZ64` is the file's own established idiom — it is why `zero: ZZ64 = 0` through
`eightyone: ZZ64 = 81` exist — and it makes the test exercise what it says.

## The stop condition, tested and not met

`REPAIR-BATCH.md` §R2 and the brief name one stop: if the repair forces a choice of which
number type an untyped literal's arithmetic happens at, that is Pavol's call.

**It does not force that choice, and the reason is structural.**  All three branches of
`forIntLiteralExpr` call `FIntLiteral.make` and all three produce an `FIntLiteral`; the
branch selects an overload (`int`, `long`, `String`), never a type.  The static type of the
expression is `Types.INT_LITERAL` in every case (`Misc.scala:467-468`).  So the repair
changes what value the literal carries and nothing about where its arithmetic happens.

Measured, not only argued: `probes/r2e` and rung 7's `p39` run the two mechanisms side by
side.  Before the repair, `println (4294967295 + 1)` folded to `4294967296` while `a =
4294967295; b = 1; println (a + b)` gave `0`.  After it, both give `4294967296`, which is
what `walk` gives.  The arithmetic still happens at `IntLiteral`, through rung 7's helpers,
exactly as before; it now starts from the right operand.

The fork `REPAIR-BATCH.md` describes — which number type an untyped numeral's arithmetic
happens at, where the compiler folds exactly before typecheck and the interpreter computes
at the narrowest applicable type — is untouched and still open.

## Decisions taken inside the rung

**Repairing the prelude and three corpus files rather than stopping.**  The alternative was
to report part one's four red tests to Pavol and land nothing.  It was rejected because
`PLAN.md:47` is explicit that "any source in the tree may be edited under the rule above;
which file it is in is not a decision", because none of that clause's stops fires here (no
design fork; the change of semantics is *toward* the specification, not against it; no test
is deleted; this is the first repair, not a gate red twice), and because the prelude half is
forced in any case: with `CompilerLibrary.fss:569` as written, `ZZ32_MIN`'s class
initialiser throws and nothing on the compile path that touches the number properties runs
at all.  The decision is recorded here because it widens the rung past the two files the
brief named.

**Value-preserving rewrites in the corpus, not moves to `not_working_library_tests/`.**
Moving `Integer3` and `Integer4` was the alternative.  It was rejected because a faithful
rewrite exists and is exact, and because those two files are the only tests of the
`BOXPLUS`/`BOXMINUS`/`BOXDOT`/`DOTPLUS` wrapping and saturating operators at `ZZ32` and
`ZZ64` (`Integer3.fss:97-126`), which is coverage the corpus would not get back.

**`asNN32` repaired although nothing forced it.**  The alternative was to leave a vacuous
range check in place beside a repaired `asNN64`.  It was rejected because the check is
three lines from the comment that asks for this rung — "This is a cheap fix. Problem in
codeGen.forIntLiteral" (`FIntLiteral.java:79` before the repair) — and because leaving it
would keep a silent truncation (`probes/r2d`) in the one getter the rung was already
rewriting.  The report says plainly that this is a decision and that the brief's premise
about it, that `asNN32` "currently depends on the wrap" and would "begin throwing", is true
of `asNN64` and not of `asNN32`.

**Three branches kept, not collapsed to `simpleIntLiteralArith`'s two.**
`FIntLiteral.make(int)` and `make(long)` both store a `long`, so the int branch buys nothing
at run time and the two-branch form would have been a smaller edit.  It is kept because the
bytecode optimizer matches on it: `RemoveLiteralCoercions.removeIntLiterals`
(`compiler/asmbytecodeoptimizer/RemoveLiteralCoercions.java:33-53`) replaces
`FIntLiteral.make(I)` followed by `coerce_ZZ32` with `FZZ32.make(I)`, and collapsing the int
branch would switch that substitution off for every small literal.  The repair also makes
that substitution sound: it elides `asZZ32`'s range check, which is safe exactly when the
int branch is the `ZZ32`-representable range — true under `l <= 31`, false under `l <= 32`.
This argument is about dormant code and is not claimed as live behaviour: the optimizer is
reached only from `ByteCodeOptimizer.main` (`ByteCodeOptimizer.java:130,146`), nothing in
`Shell` or the compiler driver calls it, and its 226 tests are switched off at
`default_repository/configuration:50-51` (`map/dormant-code.md:188`).

**`asZZ32` left alone.**  For a string-carried numeral it is correct only by accident:
`smallerVal` holds `BOGUS`, which falls outside `int` range, so the check refuses it.
Adding `largerVal == null` would change no behaviour today and was left out to keep the
diff to what the tests need; the dependency on the sentinel's value is recorded here.

**The test's expected values are computed, not written twice.**  Every expectation in
`compiler_tests/IntLiteralWrapRepairR2.fss` is built at run time from numerals of bit length
16, 17, 31, 33 and 63, none of which any branch of the split ever mis-read, following
`library_tests/IntLiteralArithRung7.fss:39-43`.  A literal `4294967295` on the expected side
would have wrapped identically and the test would have passed before the repair.

**The test is in `compiler_tests/`, not `library_tests/`.**  `PLAN.md` step 1 of the order of
work puts codegen rungs there, and `CompilerJUTest.java:36,42` sweeps that directory in
`testFast` (`build.xml:965`).

## Divergences between `walk` and the compiled run

| probe | before | after | what the specification says |
|---|---|---|---|
| `r2a` boundary numerals at `ZZ`, `ZZ64` | walk `4294967295` / `18446744073709551615`; compiled `-1` / `-1` | identical both ways | `literals.tex:83-86`: against the compiled run; repaired |
| `r2e`, `p39` literal arithmetic through bindings | walk `4294967296`; compiled `0` | identical both ways | `literals.tex:83-86` with `basic-integers.tex:368-370`: against the compiled run; repaired |
| `r2g`, `r2h` bit-pattern numeral at a signed type | walk refuses; compiled silently `-1` | both refuse | `literals.tex:104-108`: against the compiled run; repaired, and the four sites that relied on it repaired with it |
| `r2b` `NN32`/`NN64` rendering | walk refuses the coercion; compiled prints `-1` for both | unchanged | not settled by this rung's reading; a ledger row is owed, see below |
| `r2c`, `r2d`, `r2f` out-of-range coercions | walk refuses; compiled silently truncates | walk refuses; compiled raises `Not in range for ...` | the paths now agree in outcome and differ only in whether the diagnostic is static or dynamic; recorded, not repaired |

`r2b` is the one divergence this rung leaves: the compiled `NN32` and `NN64` hold the right
value — `IntLiteralWrapRepairR2.fss:64,69` assert `n32 = h32u + h32u + one32u` and `n64 =
h64u + h64u + one64u` and both pass — but render it signed, because `FNN32.toString` and
`FNN64.toString` are `String.valueOf(val)` over a signed `int` and `long`
(`runtimeValues/FNN32.java:19-20`, `FNN64.java:20`).  That is a rendering defect in the
unsigned runtime values, independent of this rung, and the record below opens it.

## The ladder subset: there is none, and why

`explorations/compile-ladder/results.tsv` records, for every file of the ladder corpus, the
`fortress compile` return code and then the `fortress run` return code
(`run-ladder.sh:106-108`).  Every file of that corpus holding a numeral of bit length 32 or
64 — `NumeralTest.fss`, `NumberPrintTest.fss`, `formatTest.fss`, `sequivTest.fss`,
`BitTwiddle.fss`, `UnsignedTest.fss`, `BigNum.fss`, `simpleExp.fss`, `realArith.fss` — has
compile return code `255` and an empty run column: each fails in one or two seconds, before
code generation.  So no ladder row can move either way, and the driver was not run, which
also avoids its shared default root (`run-ladder.sh:22`) and its `experiment/env.sh` sweep
of `/tmp/fortress*rats` while the other rung is live.

## Recorded failure and recorded pass

Failure, before any edit existed: `probes/junit-before.out` — `. run
compiler_tests/IntLiteralWrapRepairR2 (271ms) FAIL: ZZ from the 32-bit numeral: -1 should be
4294967295`, `Tests run: 2, Failures: 1`.

The intermediate state, part one only: `probes/junit-codegen-only.out` — `Not in range for
NN64: 18446744073709551615` from `FIntLiteral.asNN64`, which is the coupling the brief
predicted, measured.

Pass: `probes/junit-after.out` (part one), `probes/junit-repaired.out` (after the four
further repairs) and `probes/junit-final.out` (the tree as it is left) — `. run
compiler_tests/IntLiteralWrapRepairR2 (430ms) PASS`, `OK (2 tests)`.

The corpus differential: `probes/integer-test-before.out` (`OK (27 tests)`),
`probes/integer-test-after.out` (part one only: four failures), `probes/integer-test-repaired.out`
(after the four repairs).

## Not done

`library_tests/ChooseTest3.fss:125` carries the same out-of-range numeral as
`IntegerChoose2.fss:114` and is in no `.test` file, so no gate covers it and no measurement
of a repair to it would be available here.  It is named in `record.md` for the ledger.

The static diagnostic.  `literals.tex:83-86` gives a numeral a type carrying its value, so
`a: ZZ32 = 4294967295` should be a static error; on this path it is a run-time one, because
the checker gives every numeral the same flat `Types.INT_LITERAL`
(`Misc.scala:467-468`) and `CompilerBuiltin.fsi:370-376` has no static parameter on
`IntLiteral`.  Recorded in `record.md`, not repaired: it is a checker and prelude rung.

`FNN32.toString` and `FNN64.toString` render an unsigned value signed.  Recorded in
`record.md`, not repaired.
