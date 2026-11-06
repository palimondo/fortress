# Questions for the prober, chunk c1

## Row 772: what does the compiled path infer for a trait's generic method on a `ZZ32` and an `RR64`, since `1bc0a9083`?

The row says `Box[\Object\]`, with the `ZZ32` unconverted, measured at `5dd54b64b`. Since then `1bc0a9083` (2026-10-30) bounds a type parameter declared without a bound by `Any` under `fortress compile`. `wrap[\T\]` has no bound, so the inferred instance may now be `Box[\Any\]`, or something else; the row's exact value may be stale. The program of the row's probe (`CompRowProbe.fss`) was never committed, so this one rebuilds it from `ProjectFortress/tests/TraitGenericMethodInference.fss` and `explorations/perf-probes/trait-generic-method-inference/REPORT.md`, section 7.

Program, `tmp/probe772/TraitWrapCompiled.fss` (the compiled path):

```
component TraitWrapCompiled
export Executable

object Box[\T\](v: T) end

boxKind(b: Any): String = typecase b of
    Box[\RR64\] => "Box[RR64]"
    Box[\Object\] => "Box[Object]"
    Box[\Any\] => "Box[Any]"
    Box[\Number\] => "Box[Number]"
    else => "other"
  end

valueKind(v: Any): String = typecase v of
    RR64 => "RR64"
    ZZ32 => "ZZ32"
    else => "other"
  end

trait Makes
    wrap[\T\](a: T, b: T): Box[\T\] = Box[\T\](a)
end
object Maker extends Makes end

top[\T\](a: T, b: T): Box[\T\] = Box[\T\](a)

run(): () = do
    z: ZZ32 = 3
    r: RR64 = 2.5
    println("trait wrap z r: " boxKind(Maker.wrap(z, r)) " v=" valueKind(Maker.wrap(z, r).v))
    println("top wrap z r: " boxKind(top(z, r)) " v=" valueKind(top(z, r).v))
  end

end
```

Command, from the main tree: `cd tmp/probe772 && ../../bin/fortress compile TraitWrapCompiled.fss && ../../bin/fortress run TraitWrapCompiled`; then, as a control, `../../bin/fortress TraitWrapCompiled.fss` (walk: `Box[RR64] v=RR64` expected on both lines, as `TraitGenericMethodInference` asserts for the trait line).

Outcomes:
- compile refused (a type error at `wrap` or `top`): the row's claim changes to that refusal; rewrite the claim with the message, keep `NEGATIVE-VERIFIED`.
- `trait wrap z r: Box[Object] v=ZZ32`: the row holds; keep, and the notes take "at c124c6b65" for the measurement, the reproducer `none` with this command and output (the `REPORT.md` in the reproducer cell is no program).
- `Box[Any] v=ZZ32` (or `other v=ZZ32`): rewrite the claim to the new value, "gives `Box[\Any\]`, where walk gives `Box[\RR64\]`", and note that `1bc0a9083` moved it from `Object`.
- `Box[RR64] v=RR64`: the defect is gone; close against the commit that moved it (bisect between `5dd54b64b` and the base), test `none` with this run as the reason, unless a compiled test asserts it.
- The `top` line, either way: if it differs from the trait line, the row's "Measured on a trait's generic method only" becomes the result for a top-level function; if it shows the same defect, the claim widens to "a generic function or a trait's generic method".

## `XXX` tests I believe now pass

None. (Rows 188 and 283 carry no `XXX` test; their functional-form values are asserted by `ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss:240` and `NativeHelperFamilyIntegersWalk.fss:71`, both plain tests.)
