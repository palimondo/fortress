<!-- Rung N of explorations/coordinator/CLIMB-BATCH-1.md: the named integral operators MOD, REM, GCD, LCM, LSHIFT and RSHIFT on ZZ32 and ZZ64 in the compiler prelude, test-first.  Written 2026-09-19 by the worker that landed it.  One line per paragraph. -->

# Rung N: the named integral operators on `ZZ32` and `ZZ64`

problem: the target program applies `MOD` to `ZZ32` indices 32 times and the compiler prelude declares none of the six names on either integer trait — `explorations/apl/mg/AplMg.fss:14`
spec: `REM` is the remainder of the truncating division `÷` and `MOD` the remainder of the floor division that "rounds inexact results towards negative infinity", both throwing on a zero divisor, with a worked table of all four sign combinations of `±8` and `±3` and three algebraic properties — `Specification/basic-lib/basic-integers.tex:438-490`
spec: `GCD` and `LCM` are each "always nonnegative", `GCD` of zero and another argument is that argument, and `LCM` is zero if either argument is zero — `Specification/basic-lib/basic-integers.tex:520-529`
spec: no prose chapter names `LSHIFT` or `RSHIFT`; `grep -rn "LSHIFT\|RSHIFT" Specification/` matches no file in the whole specification tree, so their meaning is a precedent question and then a decision — none
precedent: the interpreter declares the six in `trait Integral[\I\]` and binds them per type to `Int$Rem`, `Int$Mod`, `Int$Gcd`, `Int$Lcm`, `Int$LShift`, `Int$RShift` — `Library/FortressLibrary.fss:624-634`
precedent: `MOD`'s four-branch sign correction over `REM` is the interpreter's own `mod` helper, transcribed — `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:307-318`
precedent: the `do` / `var` / `while` shape `GCD`'s Euclid loop is written in is `trait ZZ`'s own `CHOOSE`, twenty lines up in the file being edited — `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:539-552`
deviation: the prelude names the zero-divisor exception `DivisionByZero` where the specification writes `IntegerDivisionByZero`, and declares no `throws` clause on `DIV`; `REM` and `MOD` inherit both from the `DIV` they are written over rather than introducing a second spelling — `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:716`
deviation: the six are declared flat on `trait ZZ32` and `trait ZZ64` and not on an `Integral` trait, because the compiler prelude is a different design from the interpreter's tower — `explorations/coordinator/map/spec-to-implementation.md:418`
deviation: the six are deliberately **not** declared on `trait IntLiteral`, where the interpreter has no equivalent question, because a declaration there wins over coercion and there is no way back into `IntLiteral` for a quotient — `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:844`
deviation: `LSHIFT` and `RSHIFT` take one shift-count overload at the trait's own type where `<<` and `>>` take four and the interpreter takes `AnyIntegral` — `Library/FortressLibrary.fss:633-634`
deviation: `LSHIFT` and `RSHIFT` mask the shift count modulo the width, because they are written over `<<` and `>>`, where the interpreter's `Int$LShift` and `Int$RShift` saturate outside `0..31` — `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:173-183`
deviation: `GCD` normalizes to nonnegative at the end instead of taking `|self|` and `|other|` first as the interpreter's `gcd` helper does, because `|0|` throws `IntegerOverflow` on this path — `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:90`
deviation: `LCM` is nonnegative as the prose requires, where the interpreter's `Int$Lcm` returns `(u/g)*v` with no normalization and so answers `-12` for `-4 LCM 6` — `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:136-141`
deviation: `NN32` and `NN64` are left out, although the interpreter declares the six on them too, because their `library_tests` files are dark and no gate would cover the addition — `explorations/coordinator/map/test-coverage.md:114`

Landed. Twelve declarations in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` and twelve bodies in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, all inside `trait ZZ32` and `trait ZZ64`; no `.java`, no `.scala`, no `ant compileAll`. The new gated test goes from 84 typecheck errors to a clean compile and `PASS`, and the harness from `Tests run: 2, Failures: 2` to `OK (2 tests)`. On the ladder subset `chain0.fss` goes from nine errors to a clean compile, a clean run and 22 `PASS` lines with no `FAIL`; `rshiftbug.fss` clears typecheck and stops at the codegen wall; `intPrim.fss` goes from 15 errors to 7 and `simpleSum.fss` from 7 to 6. Nothing moved down.

## What I inherited

Nothing. `git log --oneline cb242a2d8..HEAD` was empty, `git status --short` clean and `tmp/` empty at the start, so this is a first attempt and everything below was done in this session.

## Where this belongs

`explorations/coordinator/map/spec-to-implementation.md:276` puts operator declarations in the prelude — "the prelude declares its own" — and `:418` says plainly that the compiler prelude is "a flat list of numeric traits each carrying its own operators, with no algebraic abstraction between them", which settles that the six go into the bodies of `trait ZZ32` and `trait ZZ64` and not into a shared `Integral`.

The error that blocks the ladder files is the disambiguator's, not the type checker's: `Operator MOD is not defined.` is raised at `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:500`, and `DISAMBIGUATE` runs before `INTEGERLITERALFOLDING` and `TYPECHECK` (`ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java:138-144`), so a name has to be *declared* before the folding phase can be reached at all. That is the reason this is a declaration rung and not a folding one, and it is the opposite of rung 7's mistake: I checked the phase order before deciding, and the folder is upstream of nothing here.

No native helper is needed and none is added: `simpleIntArith.java` and `simpleLongArith.java` have no `rem`, `mod`, `gcd` or `lcm`, and every one of the six is writable over operators the traits already have. That also keeps batch rule 3 — rung F holds this batch's one `.java` slot.

## Precedent search: what the team already did here, and in how many ways

**The declarations.** One way, in the interpreter: `trait Integral[\I\]` declares `REM`, `MOD`, `GCD`, `LCM` at `Library/FortressLibrary.fss:624-627` and `LSHIFT`, `RSHIFT` at `:633-634` (the two shifts taking `b:AnyIntegral`), and each concrete type binds them to a native — `ZZ32` at `:668-675` and `:684-687`, `ZZ64` at `:736-742`. The compiler world has nothing: `trait ZZ32` (`CompilerBuiltin.fsi:208-267` after this edit, `:202-256` before) and `trait ZZ64` (`:147-206` after, `:147-201` before) carry `DIV`, `<<`, `>>`, `<<<`, `BITAND`, `BITOR`, `BITXOR`, `CHOOSE`, `MIN`, `MAX` and none of the six.

**The bodies.** Three shapes exist in the tree and I copied from all three rather than inventing one. `MOD`'s branch structure is `Int.java:307-318`'s `mod` helper, transcribed into Fortress: remainder zero, then the two sign cases of the divisor with the two sign cases of the dividend inside them. `GCD`'s loop is the `do` / `var` / `while` / final-expression shape of `opr CHOOSE(self, other: ZZ)` at `CompilerBuiltin.fss:539-552`, which is the only loop in a compiler-prelude trait method and which compiles today; I preferred it to a self-recursive method, for which the file has no precedent. `REM` is the specification's own defining property `m REM n = m - n(m ÷ n)` (`basic-integers.tex:484`) written out; a probe was needed to show that the juxtaposition of a variable with a parenthesised expression, which is the specification's spelling and which no corpus file uses, parses as a product and not as a call (`probes/JuxtParen.fss`, `probes/JuxtParen.run.out`: `a - b (a DIV b) = 2`).

**The competing declarations.** `grep`ping `ProjectFortress/tests/` and every `*_tests/` directory plus `compiler_regressions/` and `linker_tests/` for `opr MOD` and the other five finds exactly one file, `ProjectFortress/not_working_static_tests/BuiltinTest.fss:44-62`, which declares all six on its own trait `SweetZZ32`; no gate target references that directory (`grep -n not_working_static_tests ProjectFortress/build.xml` is empty, and `explorations/coordinator/map/test-coverage.md:20-32` lists the gated corpora without it). This is the check rung 1 lost a cycle to, and it costs seconds.

**The expected diagnostics.** `grep`ping every `.test` file in every corpus for the six names finds none, so no `compile_err_equals` fixture holds a message that says one of them is undefined — which is the failure mode `test-coverage.md:138` warns about, since 222 of 281 `compiler_tests` files pin their diagnostic verbatim.

## The measurements that fixed the shape

Six probes, all compiled and run, outputs kept beside them in `probes/`.

**Which overload a literal reaches.** `probes/LitResolve.fss` shows `i DIV 3` and `7 DIV j` with `i`, `j` at `ZZ32` both answer `2`, so a `ZZ32` operand with a literal resolves to the `ZZ32` overload by coercing the literal; and `i >> 1` answers `3`, so a bare literal shift count resolves despite the four overloads of `>>` — which means the `(1).asZZ32` at `CompilerBuiltin.fss:826` is defensive rather than required, and `rshiftbug.fss`'s `e RSHIFT 1` needs no extra overload.

**Whether two literals resolve, and to what.** The folding phase folds a binary operator whose two arguments are `IntLiteralExpr` only for the operators it lists, and returns the node untouched for every other (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:105-106`); `MOD`, `REM`, `GCD`, `LCM`, `<<` and `>>` are all absent from that list. `probes/LitResolve2.fss` shows `3 << 4` answering `48` and `3 >> 1` answering `1`, so two literals under an operator declared on four numeric traits and not on `IntLiteral` resolve by coercion and are not ambiguous. `probes/LitTarget.fss` then shows that the expected type at the call site picks the trait: `t(3 << 4, 48)` with `t(x:ZZ32, y:ZZ32)` prints `PASS` and `u(3 << 4, 48)` with `u(x:ZZ64, y:ZZ64)` prints `PASS64`, and `v: ZZ32 = 3 << 4` and `w: ZZ64 = 3 << 4` both bind. That is exactly the shape `chain0.fss:28` writes, and it is why declaring on `ZZ32` and `ZZ64` is enough.

**Why `IntLiteral` must be left alone.** The same probe shows `3 BITAND 4` throwing `CompilerFailureDetectedAtRunTime` from `CompilerBuiltin$IntLiteral$DefaultTraitMethods.BITAND` — `BITAND` is not folded either, but `trait IntLiteral` declares it (`CompilerBuiltin.fss:844`, one of rung 7's remaining stubs), and its own overload beats a coerced numeric one. So an `IntLiteral` declaration of `MOD` would capture every literal-literal `MOD`; and it could only be a stub, because the compiler world has getters out of `IntLiteral` and a way in only for `+`, `-`, unary `-` and multiplication (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.java`), with no division primitive — which is exactly why rung 7 left `opr DIV(self, other:IntLiteral)` throwing at `CompilerBuiltin.fss:818`. Declaring the six on `IntLiteral` would therefore have made `chain0.fss` fail at run time instead of at typecheck, which is worse.

**The failure modes of `DIV`, which are the precedent for `MOD` and `REM`.** `probes/DivFail.fss` shows `7 DIV 0` throwing `fortress.CompilerBuiltin$DivisionByZero` with the message `Division by zero`, raised at `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:79`; `probes/DivOverflow.fss` shows the most negative `ZZ32` divided by `-1` throwing `fortress.CompilerBuiltin$IntegerOverflow` from `:80`. Both operands are computed by a function call in each probe so the folding phase cannot reach them. Because `REM` and `MOD` are written over `DIV`, they inherit both, which is the specification's requirement for the first (`basic-integers.tex:459`) and the trait's own overflowing-family convention for the second.

**Whether the throw can be caught, and so pinned.** `library_tests/Integer3.fss:26-33` declares `shouldDivideByZero` and its five uses at `:87-91` are commented out with no explanation; `explorations/coordinator/map/dormant-code.md:314` records them as dormant with the reason "no comment" and the status "unknown". `probes/CatchDivZero.fss` prints `CAUGHT DivisionByZero`, so the catch works and the status resolves to "works": the division-by-zero behaviour of `REM` and `MOD` is pinned in the gated test rather than only in a probe. Uncommenting `Integer3.fss:87-91` is not this rung's edit and is left for the coordinator.

## The edit

`REM` is the specification's identity, in the specification's spelling:

    opr REM(self, other:ZZ32): ZZ32 = self - other (self DIV other)

`MOD` is `REM` with the interpreter's sign correction, in a `do` block so `REM` is evaluated once:

    opr MOD(self, other:ZZ32): ZZ32 = do
        r = self REM other
        if r = 0 then 0
        elif other > 0 then (if self >= 0 then r else r + other end)
        else (if self >= 0 then r + other else r end)
        end
      end

The addition in the two correcting branches cannot overflow: `r` and `other` have opposite signs there and `|r| < |other|`, so `|r + other| < |other|`.

`GCD` is Euclid over `REM`, normalized at the end:

    opr GCD(self, other:ZZ32): ZZ32 = do
        var a: ZZ32 := self
        var b: ZZ32 := other
        var r: ZZ32 := 0
        while b =/= 0 do
            r := a REM b
            a := b
            b := r
        end
        if a < 0 then -a else a end
      end

`LCM` is over `GCD` and `DIV`, with the zero cases the prose names taken first so the division is never by zero and the two absolute values never see a zero:

    opr LCM(self, other:ZZ32): ZZ32 =
        if (self = 0) OR (other = 0) then 0
        else (|self| DIV (self GCD other)) DOT |other|
        end

`LSHIFT` and `RSHIFT` are names:

    opr LSHIFT(self, other:ZZ32): ZZ32 = self << other
    opr RSHIFT(self, other:ZZ32): ZZ32 = self >> other

The `ZZ64` twelve are the same text with `ZZ64` throughout. The four arithmetic operators are inserted directly after `DIV` and the two shifts after the `<<<` block, which is the interpreter's own order (`FortressLibrary.fss:623-634`) and keeps the diff to two contiguous blocks per trait, disjoint from rung F's `trait RR64` and rung M's new declarations.

## The decisions, and what the alternatives cost

**1. `GCD` normalizes at the end, not at the start.** The first version wrote `var a: ZZ32 := |self|` and `var b: ZZ32 := |other|`, following the interpreter's `gcd` helper, which negates negative arguments before the loop (`Int.java:252-259`). It compiled and then died on the test's `0 GCD 0` with `IntegerOverflow`, because `|0|` throws: the guard in all four of `intOverflowingNeg`, `intOverflowingAbs`, `longOverflowingNeg` and `longOverflowingAbs` is `a == (-a)` (`simpleIntArith.java:85`, `:90`; `simpleLongArith.java:94`, `:99`), which is true for zero as well as for the most negative value it is there to catch. The alternatives were to repair the native — refused, because rung F holds this batch's `.java` slot — or to special-case zero in `GCD`. Normalizing at the end does better than either: it is one conditional instead of two calls, it never evaluates an absolute value of zero, and it makes `GCD` overflow only when its true result is not representable. `GCD(ZZ32.MIN, 2)` is `2` under the end-normalizing version and throws under the start-normalizing one; `GCD(ZZ32.MIN, 0)` is `2^31`, which no `ZZ32` holds, and throws under both — correctly. The `|0|` defect itself is real, verified on both types and for both operators (`probes/AbsZero.fss`, `probes/AbsZero.run.out`: four `yes` lines), and is a ledger row this rung opens rather than repairs.

**2. `LCM` keeps `| |` where `GCD` does not.** Its guard takes the zero cases first, so neither absolute value can see a zero; and `|ZZ32.MIN|` throwing there is right, because `|LCM(m, n)| >= |m|`, so an `LCM` whose operand is the most negative value has no representable answer except in the zero case the guard already took. The alternative — the same conditional spelling in both, for uniformity — was rejected because it would work around a defect at a site that cannot reach it, and `| |` says "nonnegative" where a conditional only implements it.

**3. The specification's nonnegativity for `GCD` and `LCM`, against the interpreter.** The rendered declarations say `: ZZ` (`basic-integers.tex:520-521`) but the suppressed source lines two above them say `: NN` (`:518-519`), and the prose says "The result is always nonnegative" twice (`:524`, `:528`). Where the prose then says "if either argment is `0`, the result equals the other argument" (`:524-525`) and the other argument is negative, the two sentences conflict; nonnegativity is the invariant and the `NN` in the suppressed source confirms which way to read it, so `0 GCD -4` is `4`. The lattice property `(m GCD n) · (m LCM n) = m · n` at `:544` then holds only up to the sign of the product, which is why the test checks it against `|a b|`. The alternative — follow the interpreter — is what the differential below rejects.

**4. `LSHIFT` and `RSHIFT` mean `<<` and `>>`, with the specification silent.** Nothing anywhere in `Specification/` names either operator, so this is rule 4's third case and had to be decided. Three candidates. *(a)* Names for the trait's own `<<` and `>>`, which mask the shift count modulo the width (`simpleIntArith.java:337-351` is four one-line Java shifts). *(b)* The interpreter's semantics, which saturate: out of range, `Int$LShift` gives `0` and `Int$RShift` gives the sign bit (`Int.java:173-183`); this costs a range guard on each of the four bodies. *(c)* Names for `<<<`, the arithmetic shift the specification's `shift` describes at `basic-integers.tex:696-702`. I chose (a). The space of shift meanings on this path is already partitioned — `<<` and `>>` mask, `<<<` shifts arithmetically by a signed amount — so a third, differently-behaving shift under a fourth and fifth name would make the prelude self-inconsistent, and a reader who knows `<<` would be wrong about `LSHIFT`. (c) is refused by measurement as well as by meaning: `probes/ShiftRange.fss` shows `3 <<< 33` throwing `IntegerOverflow` from `intShift` (`simpleIntArith.java:360`), where the interpreter's `LSHIFT` gives `0`, so `<<<` is not even a closer approximation of (b) than `<<` is. (b)'s only argument is agreement with the interpreter, and it buys that agreement by introducing a second shift semantics for the same bit pattern; what it would actually protect is a program that shifts by 32 or more, which the specification does not describe and which no corpus file and neither target program does. The cost of (a) is one recorded divergence, measured both ways below.

**5. Only one shift-count overload each.** `<<` and `>>` each have four (`ZZ32`, `ZZ64`, `NN32`, `NN64`); `LSHIFT` and `RSHIFT` get one, at the trait's own type. The narrower set is unambiguous for a literal count, which is what the ladder needs (`rshiftbug.fss:18`, `:23`), and widens later without breaking anything. The alternative — mirror all four — would add sixteen declarations for no measured use; on `ZZ64` the `ZZ32` case is already reached by `ZZ64.coerce(x: ZZ32)`.

**6. `NN32` and `NN64` are left out.** The brief allows them "only if it costs nothing". It is not nothing: their `DIV` is unsigned, their `-` cannot go below zero, `MOD` and `REM` coincide there and would need their own argument, and `library_tests/NN32.fss` and `NN64.fss` are both dark (`explorations/coordinator/map/test-coverage.md:114`), so nothing a gate runs would cover the addition. Neither target program uses either type (`explorations/coordinator/CLIMB-BATCH-1.md:9`, the grep of every `.fss` in both). So: not in this rung, and named here so the next one can pick it up cheaply.

## The failing test, and the pass

`ProjectFortress/library_tests/IntegralOpsRungN.fss` and `IntegralOpsRungN.test`, the latter in the shape of `library_tests/Boolean.test` but with `run_out_contains=PASS`: `run_out_WIcontains`, which `Boolean.test` writes, is not among the keys `FileTests.java:147-190` checks, so it falls through to the default.

Written before the edit existed. Recorded failure, `raw/IntegralOpsRungN.compile.before`: 84 errors, every one `Operator <name> is not defined` — `REM` 21, `MOD` 21, `GCD` 15, `LCM` 14, `RSHIFT` 7, `LSHIFT` 6 — with the summary line `File IntegralOpsRungN.fss has 84 errors.`; and `raw/IntegralOpsRungN.junit.before`, `FAILURES!!!` / `Tests run: 2,  Failures: 2,  Errors: 0`.

Recorded pass, `raw/IntegralOpsRungN.compile.after` (empty, exit 0), `raw/IntegralOpsRungN.run.after` (`PASS`) and `raw/IntegralOpsRungN.junit.after` (`OK (2 tests)`).

What the test pins: all four sign combinations of `REM` and of `MOD` on `±8` and `±3` against the specification's table (`:465-468`); the four `MOD` rows of `chain0.fss:28-31` on `±3` and `±4` and their `REM` partners; all four sign combinations of an exact division, where both must be zero; the three properties at `:488-490` as relations between run-time values rather than against constants; `DivisionByZero` from `DIV`, `REM` and `MOD`; nine `GCD` cases and nine `LCM` cases including every case the prose at `:523-529` settles; the lattice property on four pairs; both shifts against both the constant and the `<<`/`>>` of the same trait, including a negative operand so the sign extension is pinned; and sixteen `ZZ64` cases on values beyond `ZZ32` — `±10^10 REM/MOD ±7`, `GCD` on `10^10` and `7.5·10^9`, `LCM` giving `3·10^9`, and shifts by 40. Every operand is a typed binding, which is how `Integer3.fss:36-50` does it and which keeps the folding phase away from them; the `ZZ64` comparisons go through `assert(x: String, y: String, failMsg: String)` because rung 4's comparing forms stop at `ZZ32` (`Library/CompilerLibrary.fsi:45-49`).

## The differential: walk against the compiled path

`probes/WalkIntegral.fss` runs the same operators under the interpreter (`probes/WalkIntegral.walk.out`); the compiled answers are the test's, plus `probes/ShiftRange.run.out` for the out-of-range shifts and `probes/AbsZero.run.out` for `|0|`.

**They agree** on every `REM` and `MOD` sign combination, on `0 GCD 0`, `-4 GCD 0`, `-4 GCD 6`, `60 GCD 48`, `0 LCM 5`, `3 LCM 4`, `6 LCM 15`, and on every in-range shift (`3 LSHIFT 4` = 48, `48 RSHIFT 4` = 3, `-16 RSHIFT 2` = -4, `-16 LSHIFT 1` = -32). Since the specification's table and `chain0.fss`'s expectations are the same numbers, that is three-way agreement on the part of the semantics the target program uses.

**Three cases where the specification settles it against the interpreter.** `0 GCD -4` is `-4` under walk and `4` compiled; `1 LCM -5` is `-5` under walk and `5` compiled; `-4 LCM 6` is `-12` under walk and `12` compiled. `basic-integers.tex:524` and `:528` both say "The result is always nonnegative", so the compiled side is right and the interpreter owes a ledger row. The causes are exact: `Int.java:253`'s `if (u == 0) return v;` returns the second argument without normalizing its sign, which is why only the first-argument-zero case is wrong (`-4 GCD 0` goes through `:257`, by which point `u` has been negated at `:254`); and `Int.java:136-141`'s `Lcm` returns `(u / g) * v` with no normalization at all.

**Three cases where the specification is silent and this rung decided.** `3 LSHIFT 33` is `0` under walk and `6` compiled; `3 RSHIFT 33` is `0` under walk and `1` compiled; `-16 RSHIFT 33` is `-1` under walk and `-8` compiled. Decision 4 above is the reasoning; the divergence is confined to shift counts outside `0..31` on `ZZ32` and `0..63` on `ZZ64`, and the compiled answers are exactly those of `<<` and `>>`, which already disagreed with the interpreter's `LSHIFT`/`RSHIFT` there before this rung existed.

**Two cases where the specification settles it against the compiled path**, and the repair is outside this rung. `|0|` and `-0` are `0` under walk and throw `IntegerOverflow` compiled, on `ZZ32` and on `ZZ64`. There is no reading of the specification on which the absolute value or the negation of zero overflows; `basic-integers.tex:228` declares unary `-` on ℤ returning ℤ, `:621` declares `opr |self| : NN` and `:623-624` says it "returns the negative of this integer if the argument is less than zero, and otherwise returns the argument" — so `|0|` is `0` — and `:401` says operations on ℤ "never need to wrap or saturate". The fix is one comparison in each of four Java methods — `a == (-a)` should be a test against the type's minimum — and it is a `.java` change, which rung F holds this batch's slot for. Ledger row, below.

## The ladder subset

`run-subset.sh` and `subset.txt`, copied from `explorations/compile-ladder/repair-r1-atomic-static/` with the output directory and the ladder root made private to this worktree and settable, run before and after with separate roots so each builds its own library from the sources as they stood. The four files are the two `CLIMB-BATCH-1.md` names for this rung plus the two whose recorded first error in `explorations/compile-ladder/after/raw/` names one of these operators — `intPrim.fss:28` (`REM`) and `simpleSum.fss:30` (`MOD`).

| file | before | after |
|---|---|---|
| `tests/chain0.fss` | 9 errors, all `MOD`/`GCD`/`LCM` | compiles, runs, 22 `PASS`, no `FAIL` — **a new ladder pass** |
| `tests/rshiftbug.fss` | 2 errors, both `RSHIFT` | typecheck clean; stops at `Can't compile AsIfExpr` (`CodeGen.java:1552`, `:34`) |
| `tests/intPrim.fss` | 15 errors | 7 errors, all `Operator ? is not defined` |
| `tests/simpleSum.fss` | 7 errors | 6 errors: `Operator ?`, `BIG juxtaposition`, `BIG MIN` |

`chain0.fss`'s 22 `PASS` lines are an independent check of `MOD` in all four sign combinations and of `GCD` and `LCM` against values the team wrote in 2008, and they agree with the specification's table and with this rung's test. `rshiftbug.fss` is now blocked on `asif`, which is a codegen gap and not a name.

## The one gated check that was run

The batch is gated once after the merge and this rung did not run `ant testFast` or `ant testSystem`. One targeted check was worth its two minutes: `library_tests/Integer.test` is the gated suite over exactly the two traits this rung edits — `Integer1`-`Integer4`, `IntegerChoose1`, `IntegerChoose2`, `ShiftTest`, `ShiftTest2` and `AverageTest`, covering `ZZ32` and `ZZ64` arithmetic, the shifts, `CHOOSE` and the averages. It gives `OK (27 tests)` (`raw/Integer.junit.after`). The subset driver's own sanity step, which compiles and runs `library_tests/Integer1` before the ladder starts, also passed on the post-edit tree.

## What this rung did not do

No native helper, no `NN32`/`NN64`, no `DIVREM` or `DIVMOD` (declared beside `REM` and `MOD` at `basic-integers.tex:441-442`, returning tuples, named by no ladder file and neither target program), no `DIVIDES`, no `shift`, and no repair of the two defects it found. It did not uncomment `Integer3.fss:87-91`, although its probe shows they would pass, because that is an edit to a gated test file and belongs to whoever takes the row.
