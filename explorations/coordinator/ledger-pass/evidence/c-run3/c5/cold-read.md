# Cold read: c-run3/c5 (12 rows)

Read with `CLAUDE.md`, `fortress-repo/SKILL.md`, and lookups in `references/records.md`, `tests-writing.md`, `interpreter.md`, `compiler.md`, `specification.md`. The file holds no duplicate rows.

A point common to every row: all 12 rows are `NEGATIVE-VERIFIED`. `records.md` says only that "the row template ... defines each" status, and the template is in the ledger, which a cold reader may not open. From the word alone I read it as "a defect, confirmed, still open", but nothing I may read says whether it means "fix it now" or "known, leave it". So for each row I infer what to do from its Notes, and I list the status word under Could not resolve only where the Notes do not settle it.

## Row 434
- **Defect:** `Number`'s `opr =` compares a float with an exact number after converting both with `asFloat`. Unequal values therefore compare equal, as with `1/3 = asFloat(1/3)`, and equality stops being transitive: a large exact integer equals its rounded float.
- **Where:** the library, `Library/FortressLibrary.fss:386-392` (doc comment at `:383-385`), at c124c6b65. Both paths use this library after the switch-over. The row does not say which path shows it today.
- **Reproduce:** no reproducer. Evaluate the two expressions in the Claim and see `true`. The skeptic's probe expressions are at `sk-exprs-equality.txt:19-26`, a file that exists only in the parent commit of ab067d9b6 (`git show ab067d9b6^:...`).
- **Status:** a design limit, and the specification is silent. A transitive fix needs a float-to-rational conversion that the library lacks. My reading is to leave it unless the curator asks for that conversion.
- **Could not resolve:** "the curator's choice" (unclear wording). It could mean the curator chose not to add the conversion, which would make this a settled decision, or that the choice is open and waits on the curator. `widen` (a language or library function that the skill does not define; I guess it widens to `ZZ64` or `ZZ`). "`Number`'s one `opr =`" is clear.

## Row 371
- **Defect:** walk does not check `excludes` against `extends`. An object that extends two traits that exclude each other runs. So do the generic form, the size form and the `Any excludes Object` form. The compiled checker refuses all of them.
- **Where:** walk only. Walk skips `TypeHierarchyChecker` (`compiler/StaticChecker.java:166-190`). The checker's messages are at `TypeHierarchyChecker.scala:298-300` and `:307-308` (d4d454f9d). The suggested fix site is `FTraitOrObject.java:236-251`.
- **Reproduce:** no reproducer, and the probes are "gone". Write `trait A excludes { B } end`, `trait B end`, `object Both extends { A, B } end`, run it under walk and see it run. Compile it and see 'Types A and B exclude each other'.
- **Status:** an implementation gap with a named fix and a specification citation, so build the fix: run the exclusion check under walk, or check exclusion where walk orders the extends.
- **Could not resolve:** "the size forms" with "`Vec[\3\]`, `Vec[\4\]`" (unclear wording): the row does not say which declaration excludes or extends which, so I could not rebuild that probe. "`trait Tx extends Any excludes { Object }`, whose object is an `Object`" (unclear wording): I guess an object that extends `Tx` is still an `Object`, which contradicts `Tx`'s exclusion, but "whose object" reads two ways. "gone" (unclear): deleted for good, or recoverable from git like the probes of the next rows? Commit d4d454f9d here against c124c6b65 elsewhere: is the mixed base deliberate?

## Row 372
- **Defect:** walk does not diagnose a cyclic trait hierarchy (`X extends Y`, `Y extends X`). It dies with `StackOverflowError` and gives no source location. The compiled checker refuses it with 'Cyclic type hierarchy'.
- **Where:** walk, in the topological sort over `getExtends()`, `interpreter/evaluator/types/FTraitOrObject.java:245-247` (c124c6b65). The fix site is `visitTrait`, `:236-251`.
- **Reproduce:** run the two-trait program in the Claim under walk. The probes `SkWalkCyclePlain.fss` and `SkSelfExtBound.fss` are in the parent of ab067d9b6.
- **Status:** build the fix: a visiting mark in `visitTrait`. Its sibling is row 407.
- **Could not resolve:** in "`trait T[\X extends N\] extends T[\N\]`", what is `N`? I guess another trait, but unclear wording.

## Row 407
- **Defect:** walk overflows the stack on a trait that `comprises` its own type parameter (`trait BinPred[\T, opr OP\] comprises T`) when an extender instantiates it at itself. The self-typed idiom `Integral[\I extends Integral[\I\]\] ... comprises I` also overflows.
- **Where:** walk's exclusion test: `FType.excludesOther` (`FType.java:209`), `SymbolicType.excludesOtherInner` (`SymbolicType.java:80`), and the loop over comprised types (`FType.java:288-294`). The idiom is the compiler library's (`Library/CompilerAlgebra.fsi:16`, `:24`).
- **Reproduce:** no reproducer, and the probes are "gone". Run the three declarations in the Claim under walk. Without `comprises T`, the program runs.
- **Status:** a fix exists as an unapplied patch (`explorations/perf-probes/self-type-idiom/self-type-idiom.patch`). But the specification is silent, and whether a bare type variable may be listed in `comprises` is "unsaid (F-171)". So I am unsure whether a worker builds the fix now or waits on F-171.
- **Could not resolve:** what to do (the status, given F-171): build the patch, or wait on the question? F-171 is a FACTS number that I could look up, but the row does not say whether F-171 records an open question for the curator. `SQCAP` (a language concept; I take it to be an operator name passed as the `opr` parameter, but the skill does not list it). "stop the exclusion test at a clause's type variable" is clear enough.

## Row 487
- **Defect:** the compiled checker checks a `comprises` clause only against the closed trait's immediate subtypes that are known when the trait's unit is checked. So in another component, a type below a generic subtrait of a closed trait compiles even though no listed type is above it. Example: `trait MyIntegral extends Integral[\MyIntegral\] end`.
- **Where:** the compiled checker, `everyKnownSubtypeListed`, `TypeHierarchyChecker.scala:405-415` (c124c6b65). The sound place for the check is at object declarations.
- **Reproduce:** the named reproducer is `ProjectFortress/tests/XXXComprisesGenericChildAcrossComponents.fss`, a walk test, which the row calls "walk's half (row 551)". So no compiled reproducer exists. A worker would compile the `MyIntegral` program in a second component and see it accepted.
- **Status:** build a fix at object declarations. The last sentence ties part of it to a library clause that is "not live on `main`", and to P-60.
- **Could not resolve:** "the comprises ways note" (unclear: which note? No path given). The whole last sentence is unclear wording: "Under the team's clause with its bound ..., not live on `main`, the program is valid and coverage by the five integer types is refused: it would discharge P-60's proof assumption for the library only; open for programs' own closed traits". I cannot tell what "it" refers to (the fix? the team's clause?), what "coverage ... is refused" means, or which five integer types are meant. The cited path `perf-probes/anyintegral-comprises-where/REPORT.md` lacks its `explorations/` prefix. The reproducer is a walk test on a checker row (unclear whether the test would turn green when the checker is fixed).

## Row 489
- **Defect:** the compiled checker reads a generic subtrait's `comprises` rule in the subtrait's own type-variable names. It does not substitute the extender's arguments. So renaming a type variable changes the verdict. `Paired[\S\]` is refused, and the same declaration spelled `Paired[\T\]` is accepted. Walk runs both.
- **Where:** the compiled checker, `TypeHierarchyChecker.scala:333` against `subst_comprises` (`:327`), at c124c6b65.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXComprisesGenericRenamed.test`. Its message is 'immediate subtype Marked is not eligible'.
- **Status:** a repair is written up in `explorations/compile-ladder/rung-comprises-checker/SKEPTIC.md`. It changes approved code (POSITIONS, "`AnyIntegral`'s closure and how the checker reads `comprises`."), so I read this as: the repair waits on the curator. A worker must not build it on their own.
- **Could not resolve:** "It also hides a false clause in row 414's gap" (unclear wording, and row 414 is not given). The status, inferred from "changes approved code": is the fix blocked, or allowed with a revision of the position?

## Row 490
- **Defect:** to find the extenders of a generic subtrait, the compiled checker compares the simple text of names, over the unit and every api in its environment. So an unrelated trait with the same name lends its extenders. The checker then accepts a false clause, and it can also refuse a true one.
- **Where:** the compiled checker, `st.getName.getText.equals(tt.getName.getText)` at `TypeHierarchyChecker.scala:410` (c124c6b65).
- **Reproduce:** no reproducer, and the probes are "gone". Rebuild them from the Notes: api `SkNameD` holds `Closed comprises { Listed }`; api `SkNameA` holds `G[\X\] extends Closed` and imports `SkNameB.{K}`; `SkNameB` holds another `G[\X\]` and `K extends { Listed, G[\ZZ32\] }`. With the import, the checker accepts `SkNameA`. Without it, the checker refuses it.
- **Status:** build the fix: compare declarations, not names.
- **Could not resolve:** nothing that blocks. "`SkNameA` ... imports `SkNameB.{K}`": it is plausible that an api imports another api; clear.

## Row 551
- **Defect:** walk's load check skips a `comprises` clause whose trait another component declares. A type below none of the listed types then loads, and a call can dispatch to whichever of two incomparable overloads was written first. With the set in the Notes, `f(Z)` prints `f(S)`.
- **Where:** walk, `ComprisesCheck.check`, which skips the clause at `BuildEnvironments.java:1303` (c124c6b65). The main component's clauses are checked since `7ed2a8387`. This agrees with `interpreter.md`: "Walk does not yet check the library's clauses, another component's clauses or an object expression's clauses."
- **Reproduce:** `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss`, and `SkNonMain551` in `explorations/compile-ladder/rung-walk-load-check/SKEPTIC.md` section 3.
- **Status:** build the fix, and revise the Appendix I entry "The traits that extend a closed trait" with it. Rows 595 and 596 must be repaired first, because the check would refuse the library's own `Reflect` and team tests. That order is my inference from those rows.
- **Could not resolve:** "Row 22's `object Value extends Number` loads; compiled it prints `Value`" (unclear: row 22 is not shown, and the subject of "prints" is not named; I take it to be the program). The sentence's purpose is also unclear: is it a second instance of the defect, or evidence that the paths differ because the prelude's `Number` is open?

## Row 595
- **Defect:** the library's own `Reflect` component breaks `Type`'s `comprises` clause. `object Reflect[\T\]() extends Type` (`Library/Reflect.fss:305`) is below none of the six types that `Type` lists (`Reflect.fss:21-23`, `Reflect.fsi:9-11`).
- **Where:** the library, `Library/Reflect.fss` and `.fsi`. Walk loads it (row 551). A walk check that read each component's clauses would refuse, at load, every program that imports `Reflect`: `tests/ReflectTest.fss`, `ReflectiveNumberTypes.fss`, `ReflectiveQuickCheckTest.fss`.
- **Reproduce:** no reproducer. The measurement is in `explorations/compile-ladder/rung-walk-load-check/REPORT.md` section 5, line 'BREACH same Reflect.Reflect extends Reflect.Type', with the expected message quoted in the Notes. It is the only breach among the 41 library apis that walk imports.
- **Status:** wait on the curator. The repair is the curator's: move `Reflect[\T\]` below a listed type, or revise `Type`'s clause. It must land before the check of row 551 reads the library.
- **Could not resolve:** "BREACH same" against "BREACH cross" in row 596 (unclear: I guess the extender is in the same component as the trait against a different one, but the row does not define these tags).

## Row 596
- **Defect:** four team tests and two demos declare objects that extend the library's `Number` or `Exception` directly, below none of their listed types: `tests/extendNumber.fss:17`, `extendException.fss:17`, `atomicList.fss:24`, `typeTests.fss:15`, `demos/tictactoe.fss:29`, `newtictactoe.fss:26`.
- **Where:** the team's tests and demos, against `Library/FortressLibrary.fss:380-381`, which closes `Number`. The compiled prelude leaves it open (`CompilerBuiltin.fss:510`). Walk loads them. The compiled checker over the one library refuses them.
- **Reproduce:** no reproducer. The 'BREACH cross' lines are in `explorations/compile-ladder/rung-walk-load-check/REPORT.md` section 5.
- **Status:** wait on the curator: the repair is an edit of team tests. The suggested repair is to extend `UncheckedException`, and for `extendNumber` a listed numeric type. That test's comment says it should be able to extend `Number`, so the choice may also be to reopen `Number`. This also gates row 551's fix.
- **Could not resolve:** "library bug (tests)" (unclear class: the defect is in the tests, so why "library bug"?). Paths: `tests/` and `demos/` relative to what? I guess `ProjectFortress/`.

## Row 597
- **Defect:** walk does not check an object expression against a `comprises` clause. With row 551's declarations, `z = object extends { S, T } end` loads, and `f(z)` prints `f(S)`. With only `S comprises { U, V }`, a typecase on such a value takes neither listed arm. The compiled checker refuses it.
- **Where:** walk, `ComprisesCheck.check` at `BuildEnvironments.java:1299-1313` (c124c6b65), which reads declared traits and objects only. The compiled side was fixed in `aa07efb31` (`checkObjectExprComprises`, `TypeHierarchyChecker.scala:64`, `:73`), with `compiler_tests/XXXObjectExpressionUnlistedExtender.test` and the guard `ObjectExpressionListedExtender.test`.
- **Reproduce:** `ProjectFortress/tests/XXXComprisesObjectExpressionUnlisted.fss` under walk.
- **Status:** build a walk fix. The specification is cited, and the compiled path already refuses.
- **Could not resolve:** the compiled test is named `XXX...` though the checker "refuses" (unclear: does `XXX` here mark the expected refusal, as a compile test with `compile_err_contains`? `tests-writing.md` suggests a refusal can be asserted by a plain test, so the prefix reads two ways). "takes neither listed arm": what happens then, an error or the `else` arm? (unclear wording).

## Row 598
- **Defect:** walk's load check does not check the other half of a `comprises` clause: that each listed type extends the trait at every instantiation. `Expr[\T\] comprises { IntE, BoolE }`, with `IntE extends Expr[\ZZ32\]` and `BoolE extends Expr[\Boolean\]`, loads. The compiled checker refuses it: 'IntE does not extend Expr[\T\]'.
- **Where:** walk, `ComprisesCheck.check`, `BuildEnvironments.java:1299-1313` (c124c6b65).
- **Reproduce:** `ProjectFortress/tests/XXXComprisesListedTypeExtendsEachInstance.fss` under walk. The checker's message is in `rung-walk-load-check/SKEPTIC.md` section 3.
- **Status:** unclear. The row has a reproducer and a specification citation, which suggests "build". But its report argues that walk's soundness does not need this half, which suggests "leave", or "wait on the curator".
- **Could not resolve:** what to do (the status): the last sentence reports an argument but no decision. "a listed type outside `T` only widens the overlap walk must cover" (a language concept that I lack: which overlap, and why does walk's dispatch cover it?).
