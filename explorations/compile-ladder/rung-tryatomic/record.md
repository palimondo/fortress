# Rung B: record lines for the gather

Finished prose, ready to paste. Nothing here was written into the coordinator's files.

## FACTS.md

Two lines. The first is the rung; the second is a property of the gate that this rung had
to measure before it could place its expected-failure test, and that every later rung with
a run-time defect will need.

- **The rung's edit did change one thing besides the name's availability, which this record first
  said it did not.** `TryAtomicFailure` is now an unusable spelling for a user declaration in any
  compiled component: `probes/skeptic/skepshadow.txt:3-8` shows
  `Type name may refer to: TryAtomicFailure, CompilerLibrary.TryAtomicFailure` and rc=255 where the
  same component compiled before this rung. It is sanctioned — `Specification/basic/declarations.tex:528-533`,
  "No other shadowing is permitted in a Fortress program" — `walk` has always behaved this way against
  `FortressLibrary` (`skepshadow.txt:40-50`, the same message naming `FortressLibrary.TryAtomicFailure`),
  ledger row 262 is the existing authority, and no file in any corpus declares such an object
  (`grep -rln 'object TryAtomicFailure'` over the six corpora finds nothing). Every later rung
  reviving a name from that dormant block pays the same price, and that is why the clause is in the
  FACTS line and not only here.
- `TryAtomicFailure` is live in the compiler world as of rung B: `Library/CompilerLibrary.fsi:105`
  declares `object TryAtomicFailure extends CheckedException end` and `.fss:253-255` gives it
  `getter asString(): String = "Try/atomic failure"`, the team's own three lines moved out of
  the comment block at `.fss:257-291`, which still holds eight more exception objects that
  nothing on the ladder asks for. `tests/tryatomicTest.fss` and `nestedTransactions3.fss` now
  reach codegen and stop at `Can't compile TryAtomicExpr` (`CodeGen.java` has no
  `forTryAtomicExpr`); `tests/abortTest.fss` reaches typecheck and stops on `abort` and
  `printThreadInfo`. Gated by `library_tests/TryAtomicRungB`
  (`explorations/compile-ladder/rung-tryatomic/REPORT.md`).
- The `XXX` expected-failure mechanism can express a **compile-stage** failure only. `shouldFail`
  comes from the `.test` file name (`FileTests.java:932`) and the same flag reaches every stage
  the file drives (`:1052-1059`, `:1063-1069`), so an `XXX` file that carries `link` (or
  `compile`) demands that the compile fail (`:384-404`, message at `:402`); and a `TestTest`
  fails on an unsatisfied `run_out_*` verdict whatever `shouldFail` says (`:534-539`, `:583-585`),
  with `pass`/`PASS` demanded by default when no check is set (`:276-282`). Of the 224
  `XXX*.test` files in `compiler_tests/`, 223 drive `compile`, one drives `link`, none drives
  `run`. A compiles-but-crashes defect is therefore gated as two `.test` files over one
  component — a plain-named one driving `link`, an `XXX`-named one driving `run` with a marker
  the failing run does print — which is what rung B did and showed going red on a deliberate
  fix (`explorations/compile-ladder/rung-tryatomic/raw/junit-xxx-expected.txt`,
  `explorations/compile-ladder/rung-tryatomic/raw/junit-xxx-goes-red.txt`).

## Gap ledger

**Folded 2026-09-20 as row 351**, the manifest order (X, W, B) having given 343-344 to rung X
and 345-350 to rung W. Two further rows came from this rung's skeptic and are folded beside it:
**352**, the throws-clause static check performed on neither path (`Specification/basic/exceptions.tex:77-87`
requires it; `probes/skeptic/SkepThrowsClause.fss`), and **353**, the compiled path having no
`forTryAtomicExpr` at all, which is now the only thing `tests/tryatomicTest.fss` and
`nestedTransactions3.fss` wait on (`probes/skeptic/SkepTryAtomicVal.fss`, `SkepTryAtomicState.fss`).
A narrowing was appended to existing **row 79** rather than opened as a row of its own: the
compiled `typecase` is sound for every runtime kind but the integer literal
(`probes/skeptic/SkepTypecaseKinds.fss`, `SkepTypecaseBind.fss`). Every `CodeGen.java` line
number below, and in `REPORT.md` and the probes, reads **lower than the landed tree**, by
**one** above `CodeGen.java:5951` and by **sixteen** below it — rung X inserted in two
places, one `import` line at `:52-53` and the fifteen lines of `importedVarIsMutable` at
`:5954-5968`. So `:2034`, `:2041`, `:2056`, `:2111-2145`, `:2848-2850` and `:3940-3943`
below are each one lower than the landed file, and `forVarRef`'s `:5953-5974`, `:5956` and
`:5967` are sixteen lower (landed `:5969-5990`, `:5972`, `:5983`). The ledger rows are
re-anchored; this text is not. (The uniform "one lower" this paragraph first claimed was
wrong for the `forVarRef` numbers; corrected by the merged-diff review of 2026-09-20,
which corrected the same sentence in ledger row 351.)

> **351. A `catch` or `typecase` clause binding cannot be read in the clause body on the
> compiled path.** `CodeGen.forTry` takes the catch name at `CodeGen.java:2041`
> (`Id name = _catch.getName();`) and never uses it; the clause body is compiled at `:2056`
> with nothing added to the local environment, and the team's comment at `:2034` says why —
> "We really should have desugared this into typecase, but for now…". A reference to the name
> reaches `forVarRef` (`:5953-5974`), where `getLocalVarOrNull` returns null at `:5956` and
> `:5967` builds the class name with `NamingCzar.jvmClassForToplevelDecl`, so the run asks for
> the singleton class of a top-level variable that nobody emits. `forTypecase` (`:2111-2145`)
> is the second site: it never reads `c.getName()`, although `TypecaseClause` carries it
> (`ProjectFortress/astgen/Fortress.ast:1659`, example at `:1656-1657`). Two sites, one cause.
> Measured both ways: `explorations/compile-ladder/rung-tryatomic/probes/catch-binding.txt`
> (compile exit 0, run exit 1, `NoClassDefFoundError: CatchBindingRef$e`; under walk exit 0 and
> `caught: Try/atomic failure`) and
> `explorations/compile-ladder/rung-tryatomic/probes/typecase-binding.txt` (the same on `$x`;
> under walk `typecase: 7`). The specification settles the catch site against the compiled run:
> `Specification/basic/expressions/try.tex:56-60`, "the exception value is bound to the
> identifier specified in the `catch` clause", with the grammar at `:22`; for the typecase site
> the 1.0 prose covers only the `typecase x of` spelling
> (`Specification/basic/expressions/typecase.tex:55-62`, `:88-98`, note at `:15`), so the
> per-clause `Id :` form is silent-specification territory and the interpreter plus the AST's
> own example are the evidence. The fix: give the clause binding a local for the duration of the
> clause body, the shape `CodeGen` already uses at `:2848-2850` and `:3940-3943`
> (`new VarCodeGen.LocalVar(name, type, this)` then `addLocalVar`), at both sites. Not repaired
> in rung B because `CodeGen.java` is rung X's file this batch
> (`explorations/coordinator/CLIMB-BATCH-2.md:77`). Gated as an expected failure at the catch
> site by `ProjectFortress/library_tests/XXXClauseBindingRungB.fss` with
> `XXXClauseBindingRungB.test` and `ClauseBindingRungBLink.test`; nothing in either corpus
> referenced a clause binding before this rung, which is why 5,397 commits and three campaigns
> had not seen it.

**One existing row appended to**, on the skeptic's recommendation: row 79, as above. Rows 319,
322 and 324 (`atomic` conformance) and row 320 (the exported variable) were not touched.

## Handover state line

- Rung B landed: `TryAtomicFailure` live in `CompilerLibrary` (`.fsi:105`, `.fss:253-255`),
  three ladder files off disambiguate (two at codegen on `TryAtomicExpr`, `abortTest` at
  typecheck on `abort`/`printThreadInfo`), gated by `library_tests/TryAtomicRungB` (`OK (2 tests)`,
  `PASS`). One new ledger row, the clause-binding defect of `CodeGen.forTry` and `forTypecase`,
  gated as an expected failure by `library_tests/XXXClauseBindingRungB` plus
  `ClauseBindingRungBLink.test`. Next on this thread: `forTryAtomicExpr` in `CodeGen.java`
  (the only thing `tryatomicTest` and `nestedTransactions3` now wait on), and `abort` and
  `printThreadInfo` for `abortTest`.

## The assembled tree, checked at the gather stage

Not a gate — the gate is `ant testFast` and `ant testSystem`, the coordinator's, once, after
these three commits. But the nine `.test` files the batch adds were run together on the
assembled tree (X + W + B applied, `ant compileAll`, the library cache rebuilt in order) at
one thread and at four: twelve JUnit tests, all `OK`, with the four `XXX` files each seeing
its expected failure. Capture:
`explorations/compile-ladder/rung-tryatomic/probes/gather/gather-assembled-gate.txt`.

## Two map corrections — applied at the gather stage, 2026-09-20

Verified and applied in this rung's own commit; the rung was right not to touch the map while
parallel rungs were running.

- `explorations/coordinator/map/dormant-code.md:32` calls the `CompilerLibrary.fss` block "ten
  checked/unchecked exception objects" and then names nine; it held nine, and holds eight after
  this rung. Its line range `220-258` was stale before this rung (the block was at `253-291`);
  it is now at `257-291`.
- `explorations/coordinator/map/test-coverage.md:104` and
  `explorations/coordinator/map/dormant-code.md:188` cite `FileTests.java:997` for the
  `fortress.unittests.noopt` read; in this tree it is `FileTests.java:1007`. The property itself
  is at `default_repository/configuration:51`, as both say.
