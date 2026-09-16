# Can the compiler just use `FortressLibrary`?

Pavol's question, verbatim:

> I still don't get why the library needs to be rewritten for the compiler,
> other than your guess that the interpreter's standard library would not pass
> the type checker. What's specific to bytecode generation in there? Couldn't
> the path forward be just to use the FortressLibrary for the compiler as
> well? What breaks and when?

Answered by trying it. Every command and its full output is in this directory;
`run-all.sh` lists them in order. Host: JDK 25.0.3, `source experiment/env.sh`
(`FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`), tree at HEAD, caches wiped and the
compiler library chain rebuilt from scratch first (106 s, `01-library-chain.out`).
Nothing outside this directory was modified.

**The short answer.** Almost nothing in `FortressLibrary.fss` is about bytecode
generation. 4.7% of it (211 of 4,518 lines) is native bindings, and those are
the *only* genuinely codegen-specific thing in the file. What actually stops
"use FortressLibrary for the compiler too" is not codegen at all: it is that
`compile` turns the type checker **on** and `walk` leaves it **off**, and the
interpreter's library has never been through the type checker. When you make
`FortressLibrary` the compiler's prelude, disambiguation passes with **zero**
errors, and then the type checker reports **92 errors** in the library's own
apis and **crashes outright** — `java.lang.Error: Not yet implemented` — on the
`nat`-kinded static parameters the library is built out of. Desugar and codegen
are never reached, in any run, by any variant. So the port is not 108 native
bindings plus a few checker fixes: it is (a) 108 native bindings, (b) a library
type hierarchy that violates the exclusion rules the checker enforces, and
(c) an unimplemented piece of the type checker itself.

---

## 1. Feeding the interpreter prelude to the compiler as it is

The tool did **not** refuse the file, so no renaming was needed
(`02-fortresslibrary-asis.out`):

```
./bin/fortress compile Library/FortressLibrary.fss
File FortressLibrary.fss has 1417 errors.          (exit 255, 2 s)
```

**Phase: DISAMBIGUATE, and only DISAMBIGUATE.** `./bin/fortress disambiguate
Library/FortressLibrary.fss` — which runs the truncated
`PhaseOrder.disambiguatePhaseOrder`, stopping before TYPECHECK — produces
output **byte-identical** to the full compile (`03-disambiguate-only.out`).
Every one of the 1,417 messages comes from
`compiler/disambiguator/TypeDisambiguator.java` (lines 304, 363, 384). The type
checker, the desugarer and the code generator never ran.

**Every error is raised in an `.fsi`, not in the 4,518-line `.fss`.** The
component was never looked at:

| file where the error is raised | errors |
|---|---|
| `Library/FortressLibrary.fsi` | 1,126 |
| `Library/RangeInternals.fsi` | 276 |
| `Library/List.fsi` | 10 |
| `ProjectFortress/LibraryBuiltin/NativeArray.fsi` | 2 |
| `Library/FlatString.fsi` | 2 |
| `Library/Stream.fsi` | 1 |

**The 1,417 grouped by kind** (first twenty distinct kinds; the full census is
in `02-fortresslibrary-asis.out`):

| kind | count |
|---|---|
| `Type name may refer to: FortressLibrary.X, CompilerBuiltin.X` / `…, CompilerLibrary.X` | **1,110** |
| `X is undefined.` | **289** |
| `Incorrect number of static arguments for type 'CompilerLibrary.Range': provided 1, expected 0` | **18** |

The 1,110 by colliding name: `ZZ32` 274, `Number` 155, `String` 103,
`Generator` 77, `RR64` 63, `ZZ64` 61, `Range` 51, `TotalComparison` 41,
`Comparison` 41, `NN64` 40, `Matrix` 39, `Reduction` 32, `UncheckedException`
22, `Condition` 21, `ZZ` 15, `CheckedException` 12, `SequentialGenerator` 9,
`LessThan` 9, `GreaterThan` 7, `Unordered` 6, `EqualTo` 6, then 15 more with
≤5 each.

The 289 by missing name: `Integral` 129, `AnyIntegral` 42, `Just` 28, `Char`
14, `Maybe` 10, `OpenRange` 7, `RightRange`/`LeftRange`/`ExtentRange` 6 each,
`BoundedRange` 5, `Indexed` 4, then 19 more with ≤3 each, including `HasRank`,
`Comprehension`, `BigReduction`, `MonoidReduction`, `Array1`,
`ImmutableArray1`, `LexicographicOrder`.

**This number is an artifact, not a finding.** 78% of it is
`FortressLibrary` colliding with `CompilerBuiltin`, because in this run *both*
preludes are in scope: the compiler implicitly imports `CompilerBuiltin` and
`CompilerLibrary` into every compilation unit, and `FortressLibrary` declares
`ZZ32`, `Number`, `String`, `Generator`, … itself. That is what happens when
you compile the interpreter prelude as an *ordinary component*. It is not what
Pavol proposed.

## 2. Pavol's actual proposal: make `FortressLibrary` the prelude

`Shell.useInterpreterLibraries()`, `Shell.setTypeChecking(true)` and
`Shell.setPhaseOrder()` are all public, so the switch `Shell.subMain` flips per
subcommand (`Shell.java:404` vs `421`) can be flipped from outside without
touching a tracked file. `WorldFlip.java` (in this directory) does exactly
that: the **compiler's** phase order — DISAMBIGUATE, TYPECHECK, DESUGAR,
OVERLOADREWRITE, CODEGEN — with the **interpreter's** prelude
(`FortressLibrary` / `FortressBuiltin` / `AnyType`) as the implicit library.

### DISAMBIGUATE: clean

```
java … WorldFlip -stop disambiguate Library/FortressLibrary.fss
### rc=0                                            (05-worldflip-disambiguate.out)
```

Zero errors. All 1,417 disambiguation errors of §1 vanish. The interpreter's
library, its api, and the whole api graph it drags in (`RangeInternals`,
`List`, `NativeArray`, `FlatString`, `Stream`, `String`, `Writer`, `TypeProxy`,
`NatReflect`, `FortressBuiltin`, `AnyType`) resolve names correctly under the
compiler's own disambiguator. **Name resolution is not the problem.**

### TYPECHECK: 92 errors, plus a crash

The full run dies with an uncaught `java.lang.Error: Not yet implemented` from
`STypesUtil.makeInferenceArg` (`04-worldflip-full.out`). To see past the first
casualty, this probe compiles a copy of `compiler/StaticChecker.java` into
`shadow-src/`, prints the name of each compilation unit as it is checked, and
catches the crash instead of letting it abort the pass. The copy is placed
first on the classpath; the tracked file is untouched.

Per-api results (`06-worldflip-instrumented.out`) — note these are the **apis**;
`checkApis` runs before `checkComponents`:

| api | own type errors |
|---|---|
| `TypeProxy`, `NatReflect`, `Stream`, `AnyType`, `Writer` | 0 |
| `NativeArray` | 0 — **but crashes the overloading checker** |
| `List` | 2 |
| `FlatString` | 4 |
| `String` | 12 |
| `FortressBuiltin` | 18 |
| `RangeInternals` | **104** |
| `FortressLibrary` | **108** |

Deduplicated and reported: **92 errors at 95 source locations**, in four files —
`FortressLibrary.fsi` 59, `RangeInternals.fsi` 26, `FortressBuiltin.fsi` 9,
`List.fsi` 1. By family:

| family | count |
|---|---|
| `Type X excludes Y but it extends Y.` | 36 |
| `Types A and B exclude each other.  C must not extend them.` | 26 |
| `Ill-formed type: T` + `The static argument I does not satisfy the corresponding bound Integral[\I\].` | 26 |
| `There are multiple declarations of split / splitWithOffsets with the same parameter type: ()` | 2 |
| `Invalid comprises clause: a trait with a comprises …, such as FortressLibrary.QQ, should not be extended.` | 1 |
| `… the return type of […] should be a subtype of the return type of […]` | 1 |

The first ten, with `file:line` (`06b-typecheck-errors-only.txt`):

```
Library/FortressLibrary.fsi:121:19-27  Type TotalComparison excludes FortressLibrary.Comparison but it extends FortressLibrary.Comparison.
Library/FortressLibrary.fsi:121:19-27  Types Comparison and StandardTotalOrder[\TotalComparison\] exclude each other.  TotalComparison must not extend them.
Library/FortressLibrary.fsi:121:31-65  Types StandardTotalOrder[\TotalComparison\] and Comparison exclude each other.  TotalComparison must not extend them.
Library/FortressLibrary.fsi:121:31-66  Type TotalComparison excludes FortressLibrary.StandardTotalOrder but it extends FortressLibrary.StandardTotalOrder.
Library/FortressLibrary.fsi:132:25-39  Type LessThan excludes FortressLibrary.TotalComparison but it extends FortressLibrary.TotalComparison.
Library/FortressLibrary.fsi:143:28-42  Type GreaterThan excludes FortressLibrary.TotalComparison but it extends FortressLibrary.TotalComparison.
Library/FortressLibrary.fsi:153:24-38  Type EqualTo excludes FortressLibrary.TotalComparison but it extends FortressLibrary.TotalComparison.
Library/FortressLibrary.fsi:370:20-22  Type QQ excludes FortressLibrary.RR64 but it extends FortressLibrary.RR64.
Library/FortressLibrary.fsi:370:20-22  Types RR64 and StandardPartialOrder[\QQ\] exclude each other.  QQ must not extend them.
Library/FortressLibrary.fsi:370:26-49  Types StandardPartialOrder[\QQ\] and RR64 exclude each other.  QQ must not extend them.
```

These are not incidental. They are the library's numeric tower:

```fortress
trait Comparison      extends { StandardPartialOrder[\Comparison\] }  comprises { Unordered, TotalComparison }
trait TotalComparison extends { Comparison, StandardTotalOrder[\TotalComparison\] } comprises { LessThan, EqualTo, GreaterThan }
trait QQ              extends { RR64, StandardPartialOrder[\QQ\] }    comprises { ... }
trait AnyIntegral     extends { QQ }
trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], AnyIntegral }
```

`comprises` implies exclusion between the listed alternatives, and two
instantiations of the same generic trait exclude each other; the checker then
finds `TotalComparison` extending two types that exclude each other, and `QQ`
extending an `RR64` that excludes it. `AnyIntegral extends QQ` where `QQ
comprises { ... }` is an open-comprises trait is an outright rule violation.
This hierarchy was written for an evaluator that never checked it.

### The crash: `nat` static parameters are not implemented

```
java.lang.Error: Not yet implemented
  at com.sun.fortress.useful.NI.nyi(NI.java:52)
  at …STypesUtil$.makeInferenceArg(STypesUtil.scala:557)
  at …STypesUtil$.inferStaticParamsHelper(STypesUtil.scala:966)
  …
  at …OverloadingChecker.checkMethodOverloading(OverloadingChecker.scala:346)
```

`STypesUtil.makeInferenceArg` (`STypesUtil.scala:546-559`) can manufacture an
inference variable for a `KindType` or a `KindOp` static parameter. For
`KindInt`, `KindBool`, `KindDim`, `KindUnit` and **`KindNat`** it calls
`NI.nyi()`.

This is not an artefact of the library. A six-line program in the **compiler's
own world**, with `CompilerLibrary` as the prelude and nothing imported,
reproduces it (`11-nat-inference-probe.out`):

| probe | `fortress compile` (compiler world) | `fortress <file>` (interpreter) |
|---|---|---|
| `pNat3.fss` — `unbox[\T\](b: Box[\T\])`, type param inferred | **compiles, runs, prints `7`** | `7` |
| `pNat1.fss` — `unbox[\nat k\](b: Box[\k\])`, nat param inferred | **`Error: Not yet implemented`** at `makeInferenceArg` | `7` |
| `pNat2.fss` — the same with the static argument written out, `unbox[\3\](…)` | **`ClassCastException: VarType cannot be cast to IntExpr`** at `NodeUpdateVisitor.forIntArg`, via `StaticTypeReplacer.replaceIn` ← `STypesUtil.gatherMethods` | `7` |

So the compiler front end cannot type-check a `nat`-kinded static parameter at
all — neither inferred nor explicit — while the interpreter runs all three.

How much of the library is built on that:

| file | lines | declarations carrying a `nat`/`int`/`bool` static parameter |
|---|---|---|
| `Library/FortressLibrary.fss` | 4,518 | **81** |
| `Library/FortressLibrary.fsi` | 2,543 | **58** |
| `ProjectFortress/LibraryBuiltin/NativeArray.fss` | 54 | 3 |
| `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` | 1,547 | **0** |
| `Library/CompilerLibrary.fss` | 592 | **1** |

That single occurrence in the compiler's library is
`Library/CompilerLibrary.fss:512`:

```fortress
trait Matrix[\T, nat s0, nat s1\] extends Object end
```

— declared, and deliberately **empty**. The compiler's library is not a
smaller library because someone ran out of time on the arithmetic; it is a
library written to stay inside what the checker can do.

### DESUGAR and CODEGEN: never reached

`checkApis` fails, so `checkComponents` never runs. Forcing the api errors to
be discarded (`-Dprobe.dropApiErrors`, a probe-only flag in the shadow
`StaticChecker`) pushes the pipeline on to the component, and the 4,518-line
`FortressLibrary.fss` dies immediately at the **same** `makeInferenceArg`
`nyi`, now from the component type checker's call-site static-argument
inference (`12-fortresslibrary-dropapi.out`). **In no run did any library code
reach the desugarer or the code generator, so this probe produced zero
`sayWhat` / `Can't compile …` failures.** Whatever codegen would or would not
do with this library is untested, because the type checker stops everything
first.

## 3. What is actually specific to bytecode generation: the native bindings

`FortressLibrary.fss` binds 108 declarations with
`builtinPrimitive("com.sun.fortress.interpreter.glue.prim.…")`, naming 99
distinct glue classes in 9 families: `Long` 26, `UnsignedLong` 24, `Int` 23,
`BigNum` 23, `StringPrim` 7, `Float` 2, `ZZ32` 1, `Char` 1, `AnyPrim` 1.
Counting each binding's signature line and its `builtinPrimitive` line, they
occupy **211 of the 4,518 lines — 4.7%. The other 95.3% is plain Fortress.**
(For scale, the whole interpreter library binds 427 primitives:
`FortressBuiltin.fss` 231, `FortressLibrary.fss` 108, `Reflect.fss` 28,
`File.fss` 15, `FlatString.fss` 14, `Writer.fss` 11, `Reader.fss` 10,
`NativeArray.fss` 7, `System.fss` 3.)

### The two calling conventions, side by side

Interpreter, `ZZ32 <` (`Library/FortressLibrary.fss:651-652`):

```fortress
opr <(self, b:ZZ32):Boolean =
    builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Int$Less")
```

```java
// interpreter/glue/prim/Int.java:197
public static final class Less extends ZZ2B {
    protected boolean f(int x, int y) { return x < y; }
}
// Int.java:38 — the boxing layer
static private abstract class ZZ2B extends NativeMeth1 {
    protected abstract boolean f(int x, int y);
    public final FValue applyMethod(FObject x, FValue y) {
        return FBool.make(f(x.getInt(), y.getInt()));
    }
}
```

Compiler, `ZZ32 <` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:636`,
with the alias from the `import java` block at lines 25-…):

```fortress
import java com.sun.fortress.nativeHelpers.{ … simpleIntArith.intLT => jIntLT … }
opr <(self, other:ZZ32): Boolean = jIntLT(self, other)
```

```java
// nativeHelpers/simpleIntArith.java
public static boolean intLT(int a, int b) { return a < b; }
```

In plain words. The interpreter's native is an **object** — a subclass of
`NativeApp` that the evaluator substitutes for the Fortress body when it builds
the closure (`interpreter/evaluator/values/FunctionClosure.java:47-66` calls
`NativeApp.checkAndLoadNative`, which pattern-matches the body for the literal
call `builtinPrimitive("…")` and `Class.forName`s the string). It receives the
evaluator's **boxed values** — `FObject`, `FValue` — unwraps them with
`.getInt()`, and returns a boxed `FBool.make(…)`. The compiler's native is a
**plain static Java method over plain Java types**, which the compiler links
through a generated wrapper (`nativewrapper_cache`) and calls with
`invokestatic`; where a Fortress value is needed it is the *generated runtime
class*, e.g. `equality.sEquiv(fortress.AnyType.Any a, fortress.AnyType.Any b)`.

`builtinPrimitive` is recognized in exactly one place in the tree —
`glue/NativeApp.java:164-215`, called only from the interpreter's
`FunctionClosure`. There is no reference to it anywhere in `compiler/` or
`codegen/`. Verified two ways (`07-builtinprimitive-probe.out`):

* `fortress compile` of a component whose body is the interpreter idiom:
  `pPrim.fss:5:25-39: Variable builtinPrimitive is not defined.` — because
  `builtinPrimitive[\T\](javaClass:String):T` is declared in
  `FortressBuiltin.fsi:30` and is **not** declared by `CompilerBuiltin.fsi` or
  `CompilerLibrary.fsi`.
* Give `builtinPrimitive` a local Fortress body so the front end accepts it
  (`pPrim2.fss`): the program compiles, and at run time the generated code
  calls **that body**, not the glue class — the class-name string is inert
  data. The code generator has no path for it.

**Is a mechanical translation possible?** In shape, yes: both ends are "a Java
method that does the arithmetic", and the Fortress-side edit is mechanical
(`builtinPrimitive("…X$Op")` → `jOp(self, other)` plus one `import java`
alias). The Java side cannot be reused as-is — the glue classes are written
against `FValue`/`FObject`/`FBool.make`, which do not exist on the compiled
path — but most of the work is already done: `nativeHelpers/` already ships
**355 public static methods** in 24 classes, covering the same ground
(`simpleIntArith` 53, `simpleChar` 46, `simpleUnsignedLongArith` 44,
`simpleUnsignedIntArith` 44, `simpleLongArith` 43,
`simpleArbitraryPrecisionArith` 24, `simpleDoubleArith` 19, `fileOps` 17, …).
Checked against the 108 bindings, the operation families with **no** existing
counterpart under any spelling are: `REM`, `MOD`, `GCD`, `LCM`, `PARTITION`,
`BigNum$Cmp`, `Char$Chr`, `Float$FromRawBits`, `StringPrim$Match`,
`StringPrim$ThrowError`, `StringPrim$PrintTaskTrace` — on the order of 29 of
the 108. The rest map onto methods that already exist under a different name
(`Int$Less` → `intLT`, `Int$Negate` → `intNeg`, `Int$LShift` →
`intLeftShiftByIntMod32`, `AnyPrim$SEquiv` → `equality.sEquiv`, …).

**So the native bindings are the easy part**, and they are the only part of the
library that is about bytecode generation at all.

## 4. The other direction: plain Fortress library code, no natives

C4's `FlatArrays` (`explorations/run-c4/src/`, 189 + 63 lines) is library-style
Fortress with zero natives.

**In the compiler's world, as shipped** (`08-flatarrays-compilerworld.out`):

```
./bin/fortress compile explorations/run-c4/src/FlatArrays.fss
File FlatArrays.fss has 77 errors.
```

All 77 are raised in `FlatArrays.fsi`, all in DISAMBIGUATE, three distinct
messages: `Array is undefined.` 60, `Array3 is undefined.` 11, `Vector is
undefined.` 6. This reproduces `explorations/perf-probes/kernels/REPORT.md`
exactly.

**A minimal `Array`/`Vector` shim is not possible, and that is the finding.**
`FlatArrays.fss` does not merely mention the names; it *extends* the library's
array hierarchy and uses its protocol — `array[\T\](n).fill(f)`,
`array[\T\](r,c)`, `a.map[\RR64\]`, `a.ivmap[\RR64\]`, `m.t()`,
`object PView[\nat s, nat r, nat c\](…) extends Matrix[\RR64,r,c\]` overriding
`get` / `put` / `init0` / `replica[\U\]() = array2[\U,r,c\]()`, plus
`import NatReflect.{...}`. Reproducing that is reproducing `NativeArray.fss`
and the ~1,000 lines of `FortressLibrary` above it — not a shim.

**With the interpreter prelude in scope**, where `Array`, `Array1..3`,
`Vector`, `Matrix` and `NatReflect` all exist (`09-flatarrays-worldflip.out`):

```
@@PROBE checkApi FlatArrays -> errors=0
```

**`FlatArrays.fsi` type-checks with zero errors of its own.** The 65 errors the
run reports are all the prelude's (`String` 12, `FlatString` 4,
`FortressBuiltin` 18, `FortressLibrary` 108, deduplicated). The one thing
`FlatArrays` does hit on its own is the *same* `makeInferenceArg` `nyi` in the
overloading checker — because its own declarations are `nat`-parameterized: 20
of its 63 api lines and 30 of its 189 component lines carry a `nat` static
parameter (`rows[\nat r, nat c\]`, `heads[\nat br, nat bc\]`,
`Diag[\nat s\]`, …).

Forcing past the api errors (`10-flatarrays-dropapi.out`), the component
reaches the type checker and dies at the same place — call-site inference of a
`nat` static argument. It never reaches DESUGAR or CODEGEN either.

So: plain-Fortress library code **does** pass the checker's name resolution and
its type rules — as long as it stays away from `nat` static parameters, which
neither this library nor the interpreter's can do.

## 5. The answer

Nothing in `FortressLibrary.fss` is written for the interpreter's *evaluation*
strategy. 95.3% of it is plain Fortress that the bytecode compiler would be
happy to compile. What is specific to bytecode generation is the 4.7% of native
bindings — and even those are mostly already ported, on the Java side, in
`nativeHelpers/`.

What breaks, and when:

1. **Nothing at DISAMBIGUATE**, once `FortressLibrary` is the prelude rather
   than a component competing with `CompilerBuiltin`. (Compiled as an ordinary
   component it produces 1,417 disambiguation errors, 78% of them the two
   preludes colliding — a red herring.)
2. **92 errors at TYPECHECK**, in the library's *apis*, before the component is
   opened: 62 of them the `comprises`/exclusion rules rejecting the numeric and
   comparison tower (`TotalComparison`, `QQ`, `AnyIntegral`, `Integral[\I\]`,
   `ZZ`/`ZZ32`/`ZZ64`/`NN64`, `AnyMaybe`), 26 of them `Integral[\I\]` bounds
   that the range library does not satisfy. The 2012 team never saw these
   because `walk` sets `fortress.compile.typecheck` false and `StaticChecker`
   returns the tree untouched.
3. **A hard crash at TYPECHECK**, `java.lang.Error: Not yet implemented`,
   whenever a `nat`-kinded static parameter has to be inferred — and a
   different crash (`ClassCastException: VarType cannot be cast to IntExpr`)
   when one is given explicitly. Reproduced in six lines with the compiler's
   own prelude. 81 declarations in `FortressLibrary.fss` and 58 in its api
   carry such a parameter; `CompilerBuiltin.fss` carries none and
   `CompilerLibrary.fss` carries one, declared empty.
4. **DESUGAR and CODEGEN: untested.** Nothing got that far.

Therefore "use `FortressLibrary` for the compiler too" is **not** a port of 108
native bindings plus a handful of checker complaints. It is three things, in
this order:

* implement `nat`/`int` static parameters in the Scala type checker
  (`STypesUtil.makeInferenceArg` and the `StaticTypeReplacer` path behind
  `pNat2`) — or rewrite the library to avoid them, which means giving up
  `Vector[\T,nat s\]`, `Matrix[\T,nat r,nat c\]` and `Array1..3`, i.e. the
  array vocabulary the whole exercise wants;
* fix, or relax, 92 type errors in a hierarchy that has never been checked —
  a language-design conversation about `comprises` and exclusion, not a typo
  hunt;
* then port the 108 native bindings, ~79 of which already have a Java
  counterpart in `nativeHelpers/`.

And only then would we learn what DESUGAR and CODEGEN make of it.


## Candidate gap-ledger rows

This report carried no candidate table; the merge of 2026-09-16 wrote four rows from its findings and entered them with these, the ledger's final, numbers (`explorations/gap-ledger-probes/probes-merge/MERGE.md` has the wording and the classes).

| row | the finding it carries | from |
|---|---|---|
| 307 | the compile path's type checker does not implement `nat`-kinded static parameters at all — `nyi` when inferred, `ClassCastException` when written out — while the interpreter runs all three spellings; 81 declarations of `FortressLibrary.fss` and 58 of its api depend on them, `CompilerLibrary.fss` on one, declared empty | §2's crash, `11-nat-inference-probe.out`, `13-nat-interpreter.out` |
| 308 | with the interpreter's prelude made the compiler's, DISAMBIGUATE passes with zero errors and TYPECHECK reports 92 errors at 95 locations in the library's own apis, the comparison and numeric tower under the `comprises`/exclusion rules | §2, `05-`, `06-`, `06b-` |
| 309 | `builtinPrimitive` is an interpreter mechanism with no compiled-path counterpart and is the only genuinely codegen-specific thing in the file — 211 of 4,518 lines, 4.7 %, with about 79 of the 108 bindings already answered by a `nativeHelpers/` method under another name | §3, `07-builtinprimitive-probe.out` |
| 310 | plain-Fortress library code passes the compile path's name resolution and type rules as long as it stays away from `nat` parameters: `FlatArrays.fsi` checks with zero errors of its own | §4, `09-flatarrays-worldflip.out`, `10-flatarrays-dropapi.out` |

Two findings of this report were **folded into other rows rather than entered**: §1's 1,417 disambiguation errors (both preludes in scope, which the report itself calls an artifact) into row 288, the same collision reached by `perf-probes/grammar-compile/`; and §4's `FlatArrays` in the compiler's world, 77 errors, into row 305, the kernels probe's row for the same fact.

---

## Artifacts

| file | what |
|---|---|
| `run-all.sh` | every command, in order |
| `00-setup.out`, `01-library-chain.out` | cache wipe, JDK, disk; compiler library chain rebuilt (14 + 77 + 12 + 1 + 2 s) |
| `02-fortresslibrary-asis.out` | `fortress compile Library/FortressLibrary.fss` — 1,417 errors |
| `03-disambiguate-only.out` | the same, `disambiguate` phase order — identical output |
| `04-worldflip-full.out` | interpreter prelude + compiler phases — uncaught `nyi` |
| `05-worldflip-disambiguate.out` | interpreter prelude, disambiguate only — `rc=0` |
| `06-worldflip-instrumented.out`, `06b-typecheck-errors-only.txt` | per-api counts, 92 type errors |
| `07-builtinprimitive-probe.out` | `builtinPrimitive` in both worlds |
| `08-…`, `09-…`, `10-flatarrays-*.out` | `FlatArrays` in the compiler's world, flipped, and forced past the apis |
| `11-nat-inference-probe.out`, `13-nat-interpreter.out` | `pNat1/2/3` compiled and interpreted |
| `12-fortresslibrary-dropapi.out` | the 4,518-line component at the type checker |
| `WorldFlip.java` | the world switch, using only public `Shell` entry points |
| `shadow-src/…/StaticChecker.java` | instrumented copy (names each unit, survives the crash, `-Dprobe.dropApiErrors`); the tracked file is untouched |
| `pPrim.fss`, `pPrim2.fss`, `pNat1-3.fss` | the minimal probes |

Caches: this probe left `default_repository/caches/bytecode_cache/` holding the
compiler library chain plus `pPrim2.jar` and `pNat3.jar`; the analysis caches
were wiped before each measurement and should be wiped again
(`rm -rf default_repository/caches/*_cache`) before any interpreter work, since
several runs analysed `FortressLibrary` under the compiler's phase order. No
0-byte jars were left behind (checked).
