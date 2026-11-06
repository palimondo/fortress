# Questions for the prober, chunk c26

## Row 390: does the compiled run still die with `NoSuchMethodError`?

Since the row was written, `checkApplication` was rewritten (`Functionals.scala:579-631` at c124c6b65, now `typedApplication`): an attempt by subtyping "counts only the candidates that fit without a coercion the call needs", so the checker may now choose `p(Any)` alone, and the XXX test may fail at another place (the assert, or a different link error) or pass. The gate holding for the base says only that the XXX test still fails, not how.

- Program: `ProjectFortress/compiler_tests/XXXCoercionAnyOverloadRungC.fss`, whole (component of 25 lines: `trait Wide` with `coerce(x: Narrow)`, `p(x: Wide)`, `p(x: Any)`, `run` prints REACHED, asserts `p(NarrowOf(1)) = "p(Any)"`, prints PASS). Path: compiled.
- Command, from the main tree: `cd ProjectFortress && ../bin/fortress junit compiler_tests/XXXCoercionAnyOverloadRungC.test`, and for the raw output `cd ProjectFortress/compiler_tests && ../../bin/fortress compile XXXCoercionAnyOverloadRungC.fss && ../../bin/fortress run XXXCoercionAnyOverloadRungC`; also `javap` the jar's dispatch methods for `p`.
- Outcomes:
  - REACHED then `NoSuchMethodError` naming `=p{...}(Any)`: the claim stands; rewrite the notes only (drop "rung I (`8dc1a74d9`) kept that ranking", re-pin `checkApplication` at `Functionals.scala:631` at c124c6b65, keep the numeral faces `g1(5)` and `h(Circle, 3)`).
  - REACHED then the assert fails with `p(Wide)`: the checker now picks the coercing declaration; rewrite the claim to "the compiled path chooses `p(Wide)`, a declaration applicable only by coercion, over `p(Any)`, applicable without".
  - PASS: fixed; the XXX test is to be promoted (a change of the tree, not this pass), then close with the commit that fixed it (find with `git log -S` over `Functionals.scala` since ae4f8e38a; 0856f3e6a and 396e4ed8d are candidates).
  - Also run the numeral faces (`g1(5)` beside `g1(y: Object)`/`g1(y: ZZ32)`; `h(Circle, 3)`) compiled; a face that now runs drops from the notes.

## XXX tests believed to pass now

- none. Every XXX reproducer of this chunk (513, 754, 755, 777, 778, 868, 869 under walk; 390 compiled) is gated, and the newest gate a12ab5c60 holds for the base, so each still fails as it asserts.
