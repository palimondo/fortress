# c29 questions for the prober

## Row 184: does applying `≡` to a user object with no definition of it still stop walk with an InterpreterBug?

The row was verified only on the retired first APL library (a worktree of `0ff5eae27~1`), inside an `apl⦇ … ⦈` expansion; nothing has run it on the present tree, and its probes are gone (`git show 1ee3b0bc5^:explorations/apl/v1-probes/p06_cross.fss`). The bug site still exists (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:896`, `getOp`, which calls `bug` when an operator reference is not at top level). The present library declares `opr EQV` only on `Boolean` (`CompilerBuiltin.fsi:500` on the compiled side); the interpreter's library has `SEQV(a:Any, b:Any)` but no `≡` on `Any`.

Program, whole, under walk (save as `tmp/ledger-pass/c-run3/probe/EqvUser.fss`):

```
component EqvUser
export Executable

object Pt(x: ZZ32) end

run(): () = do
  a = Pt(1)
  b = Pt(1)
  println("before")
  println(a ≡ b)
  println("after")
end

end
```

Command from the main tree: `cd tmp/ledger-pass/c-run3/probe && /home/user/fortress/bin/fortress EqvUser.fss; echo "exit $?"`

Outcomes:
- `** bug! Expect all oprefs to be top level EQV` (or another `** bug!`): the gap stands on the present library; rewrite row 184's notes to drop "Verified on the retired first library only…", pin `Evaluator.java:896`, and make this program the reproducer (as a probe, or an `XXX` test under `ProjectFortress/tests/` with `run_err_contains=bug!`).
- A plain dispatch or type error naming `≡`/`EQV` and `Pt` (no `** bug!`): the internal-bug report is gone for a plain call; the row closes only by a commit that names it, so write the line with the claim narrowed to the DSL-expanded call (`apl⦇ a ≡ b ⦈` style, where the operator reference is not top level), and ask for a second run with the operator written inside a nested local function, e.g. `f() = a ≡ b` inside `run()`, to see whether depth alone triggers it.
- Prints `true`/`false`: a `≡` on `Any` now exists; the defect as stated no longer reproduces; the row would be RETIRED or closed by whichever commit added it (find it with `git log -S'opr ≡' -- Library`).

## XXX tests believed to pass now

None. The `XXX` tests of rows 396 (`XXXTupleLocalVarCompiledRungC`), 506 (`XXXInferComboCap`) and 507 (`XXXInferLambdaArg`) assert the failures as stated, and the code they reach is unchanged at the base: `VarCodeGen.java:547` and `NamingCzar.java:1454-1466` (396), `Functionals.scala:370` (506), `Functionals.scala:305` (507).
