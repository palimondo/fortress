<!-- Repair R2 of the repair batch of 2026-09-18, the integer-literal wrap in the code
generator.  Ledger row 317; the verdict was established before the rung began, in
coordinator/REPAIR-BATCH.md section R2.  One line per paragraph. -->

# R2: the integer literal wrap in the code generator

## What was wrong

`CodeGen.forIntLiteralExpr` chose the representation for a numeral's value by
`BigInteger.bitLength()` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3859-3893`
before the repair, under the author's own comment "This might not work"), sending
`bitLength() <= 32` through `BigInteger.intValue()` and `bitLength() <= 64` through
`BigInteger.longValue()`.

`bitLength()` counts no sign bit, so those two bounds are each one bit too wide: a
non-negative numeral of bit length exactly 32 or exactly 64 was truncated into a
signed slot and arrived wrapped negative, and `4294967295` and `18446744073709551615`
both became `-1`.

## Where the fix belongs, answered before the edit

`map/spec-to-implementation.md:166` gives numerals their row: parser `Literal.rats:53`
`NumericLiteralExpr`, checker `Misc.scala:460-481`, interpreter
`Evaluator.forIntLiteralExpr:1506`, codegen `CodeGen.forIntLiteralExpr:3859`, prelude
`CompilerBuiltin.fsi:369` `trait IntLiteral`.

It is not in the parser or the AST: the node carries the value as a `BigInteger`
(`x.getIntVal()`), and the interpreter reads the same node and prints the true value
(`probes/r2a.walk.before`).

It is not in the folding phase, which is wired before `TYPECHECK` on the compile path
only (`compiler/phases/PhaseOrder.java:57,142`) and computes in `BigInteger` on
`getIntVal()` (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:31,60-61`, arithmetic
at `:38-54`): it is exact, and measurably so — before the repair the folded expression
`4294967295 + 1` already printed `4294967296` (`probes/r2e.compiled.before`, first line).

It is not in the checker: the compiler world's `IntLiteral` is flat
(`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:369-375`, six abstract getters and no
static parameter), so nothing in the static types carries the value the checker would have
to range-check.  The specification's numeral types do carry it —
`Specification/basic/expressions/literals.tex:83-86` gives a digits-only numeral the types
`NaturalNumeral[n,10,v]` and `Literal[v]` — which is why this diagnostic can only be a
run-time one here; that gap is recorded below, not repaired.

It is not in the prelude: the five coercions that read a numeral
(`CompilerBuiltin.fss:501` `ZZ`, `:562` `ZZ64`, `:620` `ZZ32`, `:684` `NN32`, `:747` `NN64`)
all run after the value has already been wrapped, which is what row 317 says and what
`probes/r2a.compiled.before` shows.

So the fix belongs at the code generator's own site, and in the runtime value it
constructs, `compiler/runtimeValues/FIntLiteral`, whose two unsigned getters decoded the
wrap.

## Precedent search: the same decision, three times in this tree

The question "which representation carries a numeral's `BigInteger` value" is decided in
three places, and two of them are right.

`interpreter/evaluator/values/FIntLiteral.make(BigInteger)`
(`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-55`)
compares against `INT_MIN`/`INT_MAX` and `LONG_MIN`/`LONG_MAX` declared at `:21-27`, which
is exact for both signs.

`nativeHelpers/simpleIntLiteralArith.fromBigInteger`
(`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.java:30-33`),
written by rung 7 three weeks ago, uses `bitLength() < 64` for the long slot and the
decimal string above it, which is exact for both signs and numerically the same boundary.

`CodeGen.forIntLiteralExpr` used `<= 32` and `<= 64`, which is the wrong one, and the
comment above it records that its author was unsure.

The fourth precedent is inside the runtime value itself: `FIntLiteral.asZZ64` (`:74-77`)
tests `largerVal == null` before narrowing, and `asRR64`/`asRR32` (`:96-105`) read
`largerVal` when it is present.  That is the shape `asNN64` now takes.

## The edit

`CodeGen.java:3864` `l <= 32` becomes `l <= 31` and `:3874` `l <= 64` becomes `l <= 63`;
the author's "This might not work" is replaced by the invariant that makes the bounds
readable, that `bitLength()` counts no sign bit.

`FIntLiteral.asNN32` (`:80-84`) becomes `largerVal == null && 0 <= smallerVal && smallerVal
<= 0x00000000FFFFFFFFL`.  The guard it replaces —
`0 <= (smallerVal & 0xFFFFFFFFL) && (smallerVal & 0xFFFFFFFFL) <= 0xFFFFFFFFL` — is
vacuous: masking a `long` to its low 32 bits always lands in `[0, 0xFFFFFFFF]`, so it
accepted every value, including the `BOGUS` sentinel `0xdeadbeefcafebabe` that a
string-carried literal leaves in `smallerVal` (`:25,37`), whose low half is `0xcafebabe`.

`FIntLiteral.asNN64` (`:86-90`) learns to read `largerVal`: a numeral of bit length exactly
64 now keeps its decimal string, and its unsigned value is in range for `NN64`.  It reads
the string as a `BigInteger`, accepts it when `signum() >= 0 && bitLength() <= 64`, and
returns `FNN64.make(v.longValue())`, whose low 64 bits are the unsigned pattern `FNN64`
stores (`runtimeValues/FNN64.java:17-22`).  It also now refuses a negative `smallerVal`,
which before the repair was how an unsigned value above the signed half arrived.

The team's own comment on `asNN32`, "This is a cheap fix. Problem in
codeGen.forIntLiteral" (`FIntLiteral.java:79` before the repair), is removed: it points at
the problem this rung fixed.

## Decisions taken inside the rung

**Three branches kept, not collapsed to rung 7's two.**  `FIntLiteral.make(int)` and
`make(long)` both store a `long`, so the int branch buys nothing at run time and the
two-branch form of `simpleIntLiteralArith` would have been a smaller edit.  It is kept
because the bytecode optimizer matches on it: `RemoveLiteralCoercions.removeIntLiterals`
(`ProjectFortress/src/com/sun/fortress/compiler/asmbytecodeoptimizer/RemoveLiteralCoercions.java:33-53`)
replaces `FIntLiteral.make(I)` followed by `coerce_ZZ32` with `FZZ32.make(I)`, and
collapsing the int branch would switch that substitution off for every small literal in the
program silently.  The repair also makes that substitution sound: it elides the `ZZ32`
range check, which is safe exactly when the int branch is the `ZZ32`-representable range —
true under `l <= 31`, false under `l <= 32`.

**`asZZ32` left alone.**  For a string-carried numeral it is correct only by accident:
`smallerVal` holds `BOGUS`, which falls outside `int` range, so the check refuses it.
Adding `largerVal == null` to it would change no behaviour today and was left out to keep
the diff to what the test needs; the dependency on the sentinel's value is recorded here
instead.

**The new test's expected values are computed, not written twice.**  Every expectation is
built at run time from numerals of bit length 16, 17, 31, 33 and 63, none of which any
branch of the split ever mis-read, following `library_tests/IntLiteralArithRung7.fss:39-43`.
A literal `4294967295` on the expected side would have wrapped identically and the test
would have passed before the repair.

**The test carries the corpus's Oracle header.**  `library_tests/LineConcatRung5.fss:1-10`
and `IntLiteralArithRung7.fss:1-10`, the two files most recently added to these corpora,
both carry it; the alternative was to leave a revival-era file unheaded among 780 headed
ones.

**The test is in `compiler_tests/`, not `library_tests/`.**  `PLAN.md:7` puts codegen
rungs there, and `CompilerJUTest.java:36,42` sweeps that directory in `testFast`
(`build.xml:965`).
