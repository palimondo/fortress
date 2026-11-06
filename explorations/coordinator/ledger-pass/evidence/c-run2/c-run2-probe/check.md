# Check of c-run2-probe, base c124c6b65

`mech.py` ran: 8 lines, 0 failing; the chunk applies on copies of the ledger and both `ledger.py check` runs exit 0. The probes ran on the main tree at `ba03acb76`, a descendant of the base whose diff from it touches only record files (`git diff --stat c124c6b65 ba03acb76`). Each output quoted below was read in `probe/logs/`. Result: 6 pass, 2 fail (390, 852).

## Row 850 (rewrite, CONTESTED kept): pass

- Fidelity: `probe/logs/850.compile` holds 'Types C[\Dog\] and C[\Animal\] exclude each other.  D must not extend them.' and 'File P850.fss has 4 errors.', rc 255; `850g.compile` rc 0, `850g.run` prints `1` (`P850g.fss`: `f(x: C[\Dog\]) = 1`, `f(x: C[\Cat\]) = 2`, `object DogCatC extends C[\DogCat\]`). `TypeAnalyzer.scala:541-555` holds `checkP` and `:547-551` the `pEqv` per argument at the base (mech, evidence). `DC` was refused only as an object name (`850f.compile`), so the rename is not a change of the claim.
- Nothing lost: `:274-280` (the subtype test reads the variance) and `explorations/reviews/popl2019-rules-map.md`: home history. `covariant`, `contravariant`: kept in sense ("variance is future work (P-62)", P-62 names both). `C[\Dog\]`, `C[\Cat\]`: still in the claim. `object DC extends C[\DogCat\]`: replaced by `DogCatC`, the probe's valid name.
- Present, status, form: pass. CONTESTED keeps its status and its notes say why (P-62).
- Cold read: matches. Its items (whether `covariant` parses, the body that prints 1) do not stop a worker: the compile output shows the keyword parses, and the pair's acceptance, not the body, is the defect.

## Row 465 (rewrite): pass

- Fidelity: `465.walk` prints `2`, `a!`, rc 0, from `q465/` as the notes describe. `Library/FortressLibrary.fsi:1729-1730` holds `opr[_:TrivialOpenRange, i1:ZZ32]` and `opr[i0:ZZ32, _:TrivialOpenRange]` at the base. `ComponentOnly.fss` was deleted by `9269f7bd2` (`git log -1 --diff-filter=D`), as the notes say.
- Nothing lost: `FortressLibrary.fss:2707`, `:2711`, `FortressLibrary.fsi:1695-1732`, `VectorMatrixCastsWalk(.fss:158-165)`, the two `opr[...]` tokens: false as the defect's site now (the api declares them), home history; the operators stay named in the notes by `m[:, j]`, `m[i, :]`.
- Cold read: matches. "What prints 2" does not stop a worker: `f("a")` printing `a!` is the defect.

## Row 789 (rewrite): pass

- Fidelity: `789.compile` holds 'P789.fss:8:19:', 'V is not in the kind env [][][]', 'File P789.fss has 1 error.', rc 255; `789c.run` prints `2`.
- Nothing lost: `h(BoxOb, Ob[\ZZ32\])` is in the new line as `run(): () = println(h(BoxOb, Ob[\ZZ32\]))`; `h[\T\](x: Box[\T\], y: ZZ32)`, the control not rerun: home history.
- Cold read: matches ("in place of 'Invalid overloading'" names the verdict a fix owes).

## Row 341 (close by c41c3d2b0, test none): pass

- `c41c3d2b0` is in the base's history (`git merge-base --is-ancestor`). Its change to `OverloadedFunction.java`'s `validOnDeclaredDomains` reads an own generic beside a functional method of a generic trait without static parameters of its own (`traitMethod`, `traitMethodPairValid`); before it such a pair did not reach `genericPairValid`. The library's `MAX(self, other:T)` of `StandardMinMax` (`FortressLibrary.fss:272` at the base) is that kind of method, so the commit covers the row's `MAX` pair and its sized `+` pair on walk, the one path the row names. The runs agree: `341.cold`, `341b.cold`, `341c.cold` print and exit 0 on new empty caches.
- Test `none`: the close's note gives the reason and the runs. The caveat (identified by reading, not bisected) is stated in the note.
- The cache half (a hit skips the check) has its home in row 342, NEGATIVE-VERIFIED at the base. The assessment names row 98, which is a DUPLICATE of 342; the close's note names neither, so nothing in the ledger is wrong. The F-269 hand-over goes to the record's maintainer.

## Row 390 (rewrite): fail

- Passage: "The checker's ranking is `typedApplication` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:650`); the specification drops the candidates applicable only with coercion."
- Source: at the base, `typedApplication`'s doc comment (`Functionals.scala:606-630`) says "An attempt by subtyping counts only the candidates that fit without a coercion the call needs", and the attempt by subtyping comes first. So the ranking is not shown to keep the coercing `p(Wide)`; the run shows only that the call names a dispatcher over both declarations (`390.run`, `390.junit`). The passage, read as "the ranking is where it goes wrong" (the cold read reads it so, "the checker's overload ranking"), claims a cause that the evidence does not show. The old mechanism (`checkApplication` keeping the coercing candidates) is no longer what the code says.
- Correction (the line then has 1174 characters, notes 688): replace the passage with "The specification drops the candidates applicable only with coercion; where the pair is kept is not located: the checker's `typedApplication` (`scala_src/typechecker/impls/Functionals.scala:650`) tries coercion-free fits first.", and, to make room, replace `\=p{...fss\!20\!1-30,...fss\!21\!1-29}(fortress.AnyType$Any)` with `\=p{...}(fortress.AnyType$Any)`.
- Otherwise: the reproducer still fails as it asserts (`390.junit`: REACHED, the `NoSuchMethodError`, 'Saw expected failure'); both numeral faces die the same way (`390f1.run`, `390f2.run`). Nothing lost: `8dc1a74d9` (a story) and `checkApplication`, `:430-453` (no longer the site): home history; `IntLiteral`, `CompilerBuiltin.fss:883` still holds at the base (`trait IntLiteral` at :883), home history; `ZZ32` is still in the line.

## Row 23 (rewrite): pass

- Fidelity: `23.walk` prints `literal size: 3`, then 'Cannot unify __DefaultVector[\RR64,3\](class com.sun.fortress.interpreter.evaluator.types.FTypeObjectInstance)' 'with ArrayType', at `RvwNatArray.fss:3:15-20`. `FType.java:576` holds `unificationError(val, env, errorMsg("Cannot unify ", ...` at the base. The probe was deleted by `e879b6a44`.
- Nothing lost: the old quoted message is kept, with the class name that the run prints inside it.
- The line names walk only and claims walk only; it claims no more than the run.

## Row 393 (rewrite): pass

- Fidelity: `393.compile` rc 0, `393.run` prints `fp(QOf(1)) =  1`, `fq(POf(2)) =  2`; `393.walk` prints the same values (with one space before them, so "prints the same" holds for the values). The probe was deleted by `ab067d9b6`. Nothing dropped. "It owes an `XXX` compile test with `compile_err_contains`" replaces the false "no test can gate it".
- Cold read: matches; the refusal's message is the fixer's to choose.

## Row 852 (rewrite, CONTESTED to NEGATIVE-VERIFIED): fail

- Passage: the status cell `NEGATIVE-VERIFIED`.
- Source: the checker's brief: "A `CONTESTED` row keeps its status unless it is closed with what settled it." The row is rewritten, not closed; the assessment itself offers the `CONTESTED` line as the alternative.
- Correction: status cell `CONTESTED`, and append to the notes " Contested: the run answers the row's question; the status waits on the curator." (the line then has 1085 characters, notes 677).
- Otherwise pass. Fidelity: `852a.walk`, `852a.run` print `2`; `852b.walk`, `852b.run` print `3`, all rc 0, both compiles rc 0. `ExprDisambiguator.scala:837-841` is `extractParamNames` building a `Set[Id]`; `Id.java:54-72` is `equals`, which compares `getInfo()` (the span is in it); `:776-777` loop `i <- 0 until vars.size - 2`, `j <- i + 1 until vars.size -1`. Nothing lost: the rules map's citation, home history; `f(x: ZZ32, x: ZZ32)` and `g[\T, T\](x: T)` are kept, with their bodies, in the claim.
