# Assessment, c-run4's probe

The questions came from c8 (377), c12 (100, 221, 694), c20 (547, 555), c27 (432, 817) and c31 (691, 751); c4, c16, c24, c34, c39 and c44 asked none, and c34 (255) and c44 (210) offered an optional run, which this probe made. No chunk believed an `XXX` test passes now, and no run here ran one. Each block gives the question, the output's lines that matter (whole in `runs.md`) and the disposition. The six marks are the writers'; a run changes only what it measured.

## Row 377 (c8): rewrite
- Question: does `Sk2OldNew.fss` still stop the code generator at the base, and which of the last five values is the first that fails?
- Output: `Error trying to close method scope.`, thrown at `CodeGen.java:2874`, caused by `ArrayIndexOutOfBoundsException: Index -1 out of bounds for length 0` in `CodeGenMethodVisitor.visitMaxs` (`:99`); compile exit 1. Each of the five variants that drops one of `()`, tuple, function, `Nothing`, `None` still stops.
- Disposition: rewrite (the question's first outcome). The claim stands; the throw is pinned at `compiler/codegen/CodeGen.java:2874` at c124c6b65 with its cause; "Not narrowed: ... the candidates" becomes "none alone is the cause"; the command is in the notes.
- Dropped and their homes: the list of the fifteen value types after `ZZ32` (the program in history, `ab067d9b6^`, and the history's row 377); `CodeGen.java:2817-2822` at 052a7c3fe (history); "the dump ends at the first `||`" (history).

## Row 100 (c12): rewrite
- Question: does the carrier still load, and does `z[0#2]` still stop with "has neither body nor def instanceof Method"?
- Output: refused at load, `Object Z does not define an abstract method declared in type ZeroIndexed: .../FortressLibrary.fss:2055:5-43: _[_](Range[\ZZ32\]):ZeroIndexed[\RR64\]`; exit 1; `z[1]` never prints.
- Disposition: rewrite (the question's second outcome): the silent wrong dispatch is gone; the gap is now the undocumented obligation and the refusal at load. Status kept (`silent` cell, review-queue item 265; `silent.txt`: defect).
- Dropped and their homes: the old message `** bug! MethodClosure ... has neither body nor def instanceof Method` and the pin `Library/FortressLibrary.fss:1912` at 052a7c3fe (history, row 100).

## Row 221 (c12): rewrite
- Question: does `r13_generator.fss` show the trap with the APL base on the source path?
- Output: it stops at load, `AplCore.fss:52:56-78: Unification error: Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr`, exit 1. Narrowed one change at a time: `aplVec` alone gives the same; the function form of `fill` is `tabulate` since f3b62bc83 (`Library/FortressLibrary.fss:2247`); with that renamed in a scratch copy of the base, the program prints `|v| = 5` and stops at `AplCore.fss:42`, `Failed to find any matching overload, args = (1.0,4: ZZ64)`.
- Disposition: rewrite (the question's third outcome): reproducer `none`; notes give the failure, the cause, and pin `Array2` at `Library/FortressLibrary.fss:2653-2655` at c124c6b65. The claim is not re-measured: the matrix figures are the earlier run's, said so.
- Dropped and their homes: the vector results other than `SUM`'s and the mentions of rows 47 and 218 (history, row 221); `aplSumFirst`, `aplMaxLast`, `aplProdLast` (in `AplCore.fss` itself, beside the named `aplSumLast`).
- Beyond the row: the APL base itself no longer loads under walk (`queue.md`).

## Row 694 (c12): rewrite
- Question: does `typecheck` still refuse `B.f(3, 4)` as an ambiguous coercion?
- Output: `Ambiguous coercion in method invocation B.f: ... (ZZ32, ZZ32)->String; (Number, ZZ32)->String.`, exit 255; walk prints `B`, exit 0.
- Disposition: rewrite (the question's first outcome): the measurement is at c124c6b65, and the false note "Row 650 stops the compile, so no compiled test can show it" becomes "A `typecheck` test needs no code generator". The reproducer stays `none` (the `XXX` typecheck test is a change of the tree).
- Dropped: "on a1a75716a" (history).

## Row 547 (c20): close supported, commit not named; written in `queue.md`
- Question: does the verdict on `SkFnBetween` still depend on what the JVM compiled before it?
- Output: alone, `Invalid overloading of choose in trait M`; after `CoverageReturnGood` (compile OK, link OK) in one JVM, the same refusal.
- Disposition: the run shows the order dependence gone at c124c6b65 (the question's second outcome), but the close needs a commit in the base's history, which only builds of earlier trees can name; a probe builds nothing. Not written in `closes.txt`; the bisect is `queue.md`'s first item. The line is unchanged until then.

## Row 555 (c20): rewrite
- Question: what does walk do now with the F-bounded form?
- Output: `Cannot unify Any(class ...FTypeTop) with Cmp[\T\](class ...TraitType) abm=T=(Any,Any)`, exit 1; no refusal at load of `Apple`'s two instantiations of `Cmp`.
- Disposition: rewrite (the question's second outcome, with its caveat): the gap stands at c124c6b65; the fixed half is dropped from the notes; the notes say the program is ill-formed and walk does not refuse it, so a legal form is still owed. Reproducer `none`, the program described in the notes and whole in `probe/r555/`.
- Dropped and their homes: the fixed half, 669b77d03 and `ProjectFortress/tests/InferTwoCommonParentsWalk.fss` (history, row 555; that test is in the tree).

## Row 432 (c27): rewrite
- Question: does a bare big operator over a list display of numerals still fail under walk, after F-228 (20474c144)?
- Output: with `import List.{...}` (the question's programs lacked it: `Operator <|_|> is not defined.`, exit 255), all five stop `Failed to find any matching overload, args = (ArrayList[\Int\])`, `SUM <|1.5, 2.5|>` with `ArrayList[\FloatLiteral\]`; exit 1 each.
- Disposition: rewrite (the question's second outcome): the claim keeps; the notes drop "Rung K's rule ..." and say F-228's join does not apply, with the run at c124c6b65. FACTS F-131's sentence on row 432 stays true. `silent.txt`: defect, as c27 wrote.
- Dropped and their homes: "No library spelling repairs it." (history, row 432), cut for the notes' 700.

## Row 817 (c27): rewrite
- Question: what does the checker's driver report on `trips.fss` at the base?
- Output: `acyclic errors=0`, `typecheck errors=18`, the same errors as the row lists (seven `generator`, eight `__generate`, `seq` at `:303`, `AnyMaybe` at `:82`, `approx` at `:76`, three 'Missing parameter type for', 'TryChecker returned an untyped expr' at `:286`), the `OptionUnwrapException` at `OverloadingChecker.scala:129`; driver rc=0, 56 s. Shadow classes reused from the newest gate's distance stage (no source change since).
- Disposition: rewrite (the question's second outcome): "past row 710" out, the pin c124c6b65, siblings 710 and 621 (both FIXED) dropped, 731 kept.
- Dropped and their homes: 3cd33d0b0 and rows 710, 621 (history, row 817; both rows are FIXED in the ledger).

## Row 691 (c31): keep
- Question: does the compiled path still drop a generic call's extra arguments under the bound `Any`?
- Output: compile exit 0, run prints `1011`.
- Disposition: keep (the question's first outcome): the row stands as written. Its reproducer, an `XXX` compile test asserting the refusal, is a change of the tree.

## Row 751 (c31): keep
- Question: does the checker still accept `apply2(g)` after 396e4ed8d and 372b9bf6a?
- Output: `typecheck` prints nothing, exit 0; walk stops 'Cannot unify ZZ32->NatParamT ... with ZZ32->Nt[\n\]', exit 1, as the row says.
- Disposition: keep (the question's first outcome).

## Row 255 (c34, optional): no line from this probe
- Output: `w02_lib.fss` stops at load: `BY(a: RR64, b: RR64)` at `AplCore.fss:1209` and the library's `BY` on `RR64` (`FortressLibrary.fss:462`) 'fails because their parameter lists have the same types', exit 1.
- Disposition: the run supports c34's rewrite, reproducer `none`: the probe does not run at the base. No line here; c34's stands.

## Row 210 (c44, optional): no line from this probe
- Output: `c2. aply 1 2 / 3 4 on two lines -> 1 2 3 4`, exit 0 (`q11_nlform.fss` from `1ee3b0bc5^`).
- Disposition: the claim is confirmed at the base; c44's rewrite stands. No line here.
