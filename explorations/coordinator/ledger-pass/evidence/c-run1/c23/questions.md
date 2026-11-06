# Questions for the prober, chunk c23

## Row 853 (CONTESTED): does the compiled checker accept a pair nested only at a `Bottom` instance?

Question: does `fortress compile` accept, as a valid overload set, `f(g: Blue -> ZZ32)` beside `f[\T extends Red\](g: T -> ZZ32)` with `Red` and `Blue` objects, a pair that neither nests (except at `T = Bottom`) nor excludes, and that has no meet declaration?

Program, compiled path, `BottomSpec.fss` in a scratch folder:

```
component BottomSpec
export Executable

object Red end
object Blue end

f(g: Blue -> ZZ32): ZZ32 = 1
f[\T extends Red\](g: T -> ZZ32): ZZ32 = 2

run(): () = do
  println("f = " f(fn (b: Blue): ZZ32 => 7))
end

end
```

Command, from the main tree: `bin/fortress compile SCRATCH/BottomSpec.fss && bin/fortress run BottomSpec` (and, for comparison, `bin/fortress walk SCRATCH/BottomSpec.fss`).

Outcomes:
- The compile succeeds (no 'Invalid overloading of f'): the claim holds. The row becomes NEGATIVE-VERIFIED, with this program as an `XXX` compiled test (`compile_err_contains=Invalid overloading`), notes pinning `TypeSchemaAnalyzer.scala:194` and `STypesUtil.scala:1068` at c124c6b65 and the run's output. The library question (whether a pair of the one library turns on it) stays in the notes as unmeasured.
- The compile refuses 'Invalid overloading of f': the specificity test does not hold at `Bottom` here, or another check catches the pair. The row is RETIRED (the reading falsified by this run), or rewritten if the refusal names another rule than specificity.

## `XXX` tests believed to pass now

None. Row 871 notes that the `where` pair it describes runs compiled; no `XXX` test exists for it.
