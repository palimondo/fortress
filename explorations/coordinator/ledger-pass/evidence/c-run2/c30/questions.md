# c30: questions for the prober

## Row 23: does walk still refuse an array argument at `T[n]` with a `nat` parameter?

Question: under walk at the base, does `f[\nat n\](a: RR64[n])` called with an array built by `array[\RR64\](3).fill(1.5)` still fail with "Cannot unify ... with ArrayType", where `g(a: RR64[3])` answers 3? The row's only run is from before the walk batches that changed unification (`FType.java`, last touched by 153887360 and 369982d85), and its probe is gone.

Program (the row's probe, `explorations/fable-review-probes/RvwNatArray.fss` in the parent of `e879b6a44`), whole; write it as `tmp/ledger-pass/probes/RvwNatArray.fss`:

```
component RvwNatArray
export Executable
f[\nat n\](a: RR64[n]): ZZ32 = n
g(a: RR64[3]): ZZ32 = 3
run(): () = do
  a = array[\RR64\](3).fill(1.5)
  println("literal size: " g(a))
  println("nat param:    " f(a))
end
end
```

Path: walk (the claim is walk's). Command, from the main tree: `cd tmp/ledger-pass/probes && /home/user/fortress/bin/fortress walk RvwNatArray.fss`.

Outcomes:
- `literal size: 3` then a "Cannot unify" error naming `ArrayType`: the gap stands. Rewrite the row with the run's message quoted, the mechanism pinned at the unification error, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:576` at c124c6b65 (the `Cannot unify` of `unify`), and the probe's path as above; FACTS F-20 already agrees.
- both lines print, `nat param: 3`: fixed. Close it with the commit that made it pass (bisect over `ae4f8e38a..c124c6b65` on `FType.java` and `FTypeGeneric.java`), test `none` with the reason "no test asserts it; the probe's run is the evidence", or better a gated test added later; and F-20's sentence "does not unify with such an array ... (row 23)" goes to the record's maintainer.
- another error (a different message, a dispatch failure): rewrite the claim to that message, with its first lines quoted in the notes.

## Row 393: is a cycle of coercions still accepted, on each path?

Question: at the base, does the compiled checker accept two traits each declaring a coercion from the other, and does each path then print 1 and 2? The row's run is from climb batch 4 (2026-09-26); the checker's coercion code changed in many later batches, though a grep of `scala_src/typechecker/` at c124c6b65 finds no cycle check.

Program (the row's probe, `explorations/compile-ladder/rung-interp-coercion/probes/skeptic/SkCycle.fss` in the parent of `ab067d9b6`), whole; write it as `tmp/ledger-pass/probes/SkCycle.fss`:

```
component SkCycle
export Executable

trait P excludes { Q }
  coerce(x: Q) = POf(x.q)
  getter p(): ZZ32
end
trait Q excludes { P }
  coerce(x: P) = QOf(x.p)
  getter q(): ZZ32
end
object POf(a: ZZ32) extends P
  getter p(): ZZ32 = a
end
object QOf(a: ZZ32) extends Q
  getter q(): ZZ32 = a
end

fp(x: P): ZZ32 = x.p
fq(x: Q): ZZ32 = x.q

run(): () = do
  println("fp(QOf(1)) = " fp(QOf(1)))
  println("fq(POf(2)) = " fq(POf(2)))
end
end
```

Paths: both. Commands, from the main tree: `cd tmp/ledger-pass/probes && /home/user/fortress/bin/fortress compile SkCycle.fss && /home/user/fortress/bin/fortress run SkCycle`, and `cd tmp/ledger-pass/probes && /home/user/fortress/bin/fortress walk SkCycle.fss`.

Outcomes:
- compiled compiles and prints `fp(QOf(1)) = 1` and `fq(POf(2)) = 2`: the checker gap stands. Rewrite the row: reproducer `none` with the probe's path above, no "walk refused it before rung C" story, and the sentence "no test can gate it" replaced by the test it owes: an `XXX` compile test with `compile_err_contains` (`tests-writing.md`, "Writing an `XXX` test"). Walk's acceptance is the walk-has-no-checker limit, stated once.
- the compile refuses the program with a message about the cycle: fixed. Close it with the commit (bisect over `ae4f8e38a..c124c6b65` on `scala_src/typechecker/`), test `none` unless a compiled test refuses a coercion cycle.
- the compile refuses it for another reason (an ambiguity, an overloading rule): rewrite the claim to that refusal, quoted, and say whether the cycle itself is still unchecked.

## `XXX` tests believed to pass now

None. The `XXX` tests of this chunk's rows (`XXXCoercionReturnRungC`, `XXXNatValueNN32RungK`) are walk tests that the newest gate, a12ab5c60, ran green as expected failures at the base; the compiled ones (`XXXVecCtorLoad`, `XXXNatTwoParamArmChecker`, `XXXNatArithInferFromSum`) were not run here, and the code they name holds at the base (`FZZ32Vector.java:79`, `Formula.scala:137`, `TypeAnalyzer.scala:402-409`).
