# Questions for the prober, chunk c28

## Row 24: what does `T^n` denote under walk?

Question: under walk, does a parameter typed `RR64^3` accept a library vector, and does one typed `V^3`, for a user `V` that is not a `Number`, accept anything?

Program (`T24.fss`, run under walk):

    component T24
    export Executable
    trait V extends AdditiveGroup[\V\] end
    f(a: RR64^3): ZZ32 = |a|
    g(a: V^3): ZZ32 = |a|
    run(): () = do
        v = vector[\RR64,3\](1.0)
        println("f vector: " f(v))
        a = array1[\V,3\]()
        println("g array: " g(a))
    end
    end

Command, from the main tree: `bin/fortress walk T24.fss` (write the file under `tmp/`).

Outcomes:
- `f vector: 3` and `g` refused with `Closure/Constructor for g param 1 (a:Matrix [\V\]^(3))`: the row holds; rewrite its notes with the mechanism, walk's own aggregate type `FTypeMatrix` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:594-601`, subtyping at `interpreter/evaluator/types/FTypeMatrix.java:42-53`), and the run as reproducer output.
- `f` refused too: the claim is wrong in another way: `T^n` under walk is its own type, not the library's `Vector`; rewrite the claim to "a `T^n` parameter accepts no library array under walk", the same notes.
- Both accepted: the defect is gone under walk; close with `none` and this run as the reason, after the compiled path is checked (`TypeNormalizer.java:144` desugars only a two-extent `T^(n BY m)` to `Matrix`).

## Row 53: a user ring element type under the bound `{ Number, MultiplicativeRing[\T\] }`

The row was measured before `Vector`, `Matrix` and their operators were bounded by `T extends { Number, MultiplicativeRing[\T\] }` (`Library/FortressLibrary.fsi:1645`, `:1757`, `:1686`; F-151), and `Vector.dot` is now `SUM[\T\]` (`Library/FortressLibrary.fss:2555-2556`), not a `cast[\Number\]`. Question: under walk, with a user element type extending `MultiplicativeRing` and not `Number`, which of `+`, `scale`, `pmul`, `.t()`, `dot`, `DOT`, `mul`, `rmul` and `lmul` run, and how does the first refusal read?

Program (`T53.fss`, under walk): declare `object R(x: RR64) extends MultiplicativeRing[\R\]` with `zero`, `one`, `+`, `-` (both), `TIMES` and juxtaposition; build `v = vector[\R,2\](R(1.0))` and `m = matrix[\R,2,2\](R(1.0))` (if either refuses, print the message and stop); then print each of `v + v`, `v.scale(R(2.0))`, `v.pmul(v)`, `v.dot(v)`, `v DOT v`, `m.t()`, `m.mul(m)`, `m.rmul(v)`, `m.lmul(v)`, each in its own `try`/`catch e Exception`.

Command: `bin/fortress walk T53.fss`.

Outcomes:
- The factories refuse `R` (the bound is checked): rewrite the claim to "a user element type that is not a `Number` cannot instantiate `Vector` or `Matrix` at all", with the message, pins `fsi:1645`, `:1757`.
- They build, and the list of working operations differs from `+ - scale pmul .t()`: rewrite the claim with the measured list and first failure.
- The same list as the row: rewrite only the notes' pins (`[\T extends { Number, MultiplicativeRing[\T\] }\]` at `fsi:1686-1701`, `:1786-1812`; `dot` at `fss:2555`).
- Every operation runs: close with `none` and the run as reason.

## Row 254: does a mismatched `DOT` still escape `catch`?

The reproducer `explorations/apl/rung-6/w01_dot.fss` stops at load from its folder ("Could not find an implementation for API AplCore"), and its mismatch case is only a comment; the outputs it cites are gone. Question: under walk, is `m DOT n`, of a 2x3 by a 2x3 runtime-built matrix, still `Failed to find any matching overload` that `catch e Exception` does not take?

Program (`T254.fss`, under walk):

    component T254
    export Executable
    run(): () = do
        m = matrix[\RR64,2,3\](1.0)
        n = matrix[\RR64,2,3\](1.0)
        try
            println(m DOT n)
        catch e
            Exception => println("caught: " e)
        end
        println("after")
    end
    end

Command: `bin/fortress walk T254.fss`.

Outcomes:
- The run stops with "Failed to find any matching overload" and prints no "caught" or "after": the row holds; rewrite with reproducer `none`, this program and its output in the notes, the pins `Library/FortressLibrary.fsi:1686-1701` (vector forms), `:1786-1812` (matrix forms), `Vector.dot` at `:1653`, and the cited `.out` files dropped.
- "caught:" is printed: the error is now catchable; close with `none` and the run as reason (the half "DOT works in all four rank pairs" is row 249/256's, POSITIVE).
- Another failure: rewrite the claim to the measured message.

## `XXX` tests that I believe now pass

None. `XXXArrayInferredElementVectorWalk.fss` (row 721) ran green as an expected failure in the gate a12ab5c60, which holds for the base.
