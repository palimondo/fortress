# Cold read: c-run4/c27

Read with `CLAUDE.md`, `fortress-repo/SKILL.md`, and look-ups in `references/records.md`, `library.md`, `tests-writing.md`, `specification.md`, `compiler.md`. The row template's definitions of the status words are in the ledger, not in the skill, so I read `NEGATIVE-VERIFIED` as "the gap is confirmed and open" and `CONTESTED` as "the question of what is right is open (closing needs `--settled`, records.md)".

## Row 20

- **Defect:** Under walk, a list display such as `<|1.0, 1.0|>` gets its element type from the join of its elements' run-time classes. A float numeral's run-time class is `FloatLiteral`, so the display is a `List[\FloatLiteral\]`. Because `List` is invariant, a binding or parameter declared `List[\RR64\]` refuses it. A declared type does not direct the display. You have to write the static argument: `<|[\RR64\] 1.0, 1.0|>`. Objects join to their common trait, so displays of objects work.
- **Where:** walk only. The construct is the list display, `opr <|[\E\] xs: E... |>` at `Library/List.fsi:114`. `FloatLiteral` is declared at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44`.
- **Reproduce:** There is no test (reproducer `none`). A worker would write `xs: List[\RR64\] = <|1.0, 1.0|>`, or pass the display to a `List[\RR64\]` parameter, run it under walk and see the refusal. The notes name a probe, `explorations/spec-probes/p2_ascribe.fss`, "parent of `e879b6a44`". They do not give the command or the error text that tests-writing.md item 3 asks a `none` row to carry.
- **Status:** NEGATIVE-VERIFIED, so this is an open walk gap and a fix can be built. The notes tie it to rows 511 and 510 (a declared type does not fix the static argument), so a fix probably shares their mechanism, and row 510 waits on P-12.
- **Could not resolve:**
  - "Found by: ours, blinded": I do not know what "blinded" means. Unclear wording or a project term.
  - "parent of `e879b6a44`" / "parent of `ed6dafb52`": this reads either as the file existing only at that commit's parent (deleted since) or as a version pin. Unclear wording.
  - Specification cell, "the element type is the union of the element types": the row does not say what the union of `1.0, 1.0` is under the specification (`RR64` or `FloatLiteral`). So I cannot tell how walk departs from the specification. Unclear wording.
  - "an integer's `Int` (F-74)": `Int` is presumably walk's run-time class of an integer numeral. It is not in the skill. Language/implementation concept that I lack.

## Row 510

- **Defect:** Under walk, a typed binding does not drive the inference of a call's static arguments. `a: BoxK[\ZZ64\] = wrapK(3)` infers `T = Int` from the argument and is then refused: "RHS expression type BoxK[\Int\] is not assignable to LHS type BoxK[\ZZ64\]". A method call `a: BoxT[\ZZ64\] = Fac.mk()` gets `BoxT[\Any\]`, the bound. The binding's declared type is read only after the call has run, when it coerces or refuses the value. A plain value can be coerced (`i: ZZ64 = idK(3)` works), but there is no coercion for `BoxK[\Int\]`. The compiled checker gets this right (`T = ZZ64`).
- **Where:** walk only. The code is `interpreter/evaluator/LHSEvaluator.java:218` at c124c6b65, and the call's inference is in `BuildEnvironments`. The construct is a typed local binding, an assignment, or a field declaration whose right side is a generic call.
- **Reproduce:** Run `ProjectFortress/tests/XXXInferExpectedTypeRungK.fss` under walk. It is an XXX test, so it is green while the defect holds. `XXXExpectedTypeFixRungT` covers the method form, an assignment and a field declaration.
- **Status:** NEGATIVE-VERIFIED, but "When walk gets it is the curator's (P-12)". So do not build a fix until P-12 allows it. Read P-12 first. The workaround is `wrapK[\ZZ64\](3)`.
- **Could not resolve:**
  - "a static argument that only a call's result mentions": `wrapK(3)` seems to fix `T` from its argument `3`, so `T` is not mentioned only by the result. Either the phrase means "that only the result type would fix correctly", or `wrapK` has a different signature. The row does not give the signatures of `wrapK`, `idK`, `BoxK`, `BoxT` or `Fac.mk`. Unclear wording.
  - "A clause form takes the binding's declared type (F-228)": I take "clause form" to mean a comprehension or big operator with generator clauses, but the skill does not define it. Project term that I lack.
  - "full text: history, row 510": I read this as the earlier text being in `explorations/fortress-gap-ledger-history.md` (records.md). Resolved.

## Row 705

- **Defect:** Under walk, a generic call that is itself an argument of another call gets no expected type from the parameter. A static parameter that only its result type mentions therefore takes its bound. `takesBox64(mk())`, with `mk[\T\](): BoxT[\T\]`, builds a `BoxT[\Any\]` and fails dispatch at run time: "Unification error: ... takesBox64 param 1 (b:BoxT[\ZZ64\]) got arg BoxT[\Any\]". `takesBox64(wrapT(3))` gets `BoxT[\Int\]` in the same way. When some other overload accepts the bound-typed value, walk silently runs that overload instead: `f(mk())` picks `f(x: Any)` over `f(b: BoxT[\ZZ64\])`. The compiled checker handles this (row 455, fixed).
- **Where:** walk only. The construct is a generic call in argument position. Walk infers static arguments at dispatch from the run-time types of the arguments. The checker's fix is `impls/Functionals.scala`, `retypedApplication`.
- **Reproduce:** Run `ProjectFortress/tests/XXXInferCallArgumentWalk.fss` under walk. It fails at line 15 with the message above.
- **Status:** NEGATIVE-VERIFIED, an open walk gap. A fix could be built, but its sibling row 510 waits on the curator (P-12), and the row does not say whether P-12 covers this case too. The workaround is `mk[\ZZ64\]()`.
- **Could not resolve:**
  - Whether P-12 also gates this row. Unclear wording, by omission.
  - The wrong-overload case `s: String = f(mk())` has no test named for it. Minor.

## Row 717

- **Defect:** Under walk, a comprehension nested inside a big operator gets no type from the declaration that fixes the outer one. In `zs: List[\ZZ32\] = BIG CONCAT[ys <- xss] <| 2 y | y <- ys |>`, the declared type instantiates `BIG CONCAT` at `ZZ32`. The inner comprehension is built at its elements' run-time class, as `ArrayList[\Int\]`, and the outer body's parameter `List[\ZZ32\]` refuses it because `List` is invariant: "Unification error: Closure/Constructor for body param 1 (i:List[\ZZ32\]) got arg ArrayList[\Int\]". The specification gives the inner comprehension the type `List[\ZZ32\]`.
- **Where:** walk only. The construct is a comprehension without a static argument, used as the body of a reduction or comprehension whose instance a declared type fixes.
- **Reproduce:** Run `ProjectFortress/tests/XXXNestedComprehensionDeclaredTypeWalk.fss` under walk, with `xss = <|<|1, 2|>, <|3|>|>`.
- **Status:** NEGATIVE-VERIFIED, an open walk gap to fix, presumably together with rows 20, 510 and 705. The workaround is `<|[\ZZ32\] 2 y | y <- ys |>`.
- **Could not resolve:**
  - "the body of another clause form whose instance a declared type fixes": "clause form" and "instance" are undefined. The example makes the meaning clear. Project term.
  - "row 20's list face": I do not know what a "list face" is (the part of row 20 about lists, or a display-shaped answer). Unclear wording.
  - "built at its elements' run-time class `Int`": the elements are `2 y`. If `ys` were a `List[\ZZ32\]`, I would expect `ZZ32`. That the run-time class of an integer is `Int` is not in the skill. Concept that I lack.

## Row 731

- **Defect:** The compiled checker infers a big operator's static parameter, when none is written, only from its bound or the expected type, never from the generators or the body. If the parameter is F-bounded (its bound names the parameter, as for `SUM`, `PROD` and `BIG MIN`), no instance exists, and the reduction is refused: "... is not applicable to an argument of type ().", rc 255. If it is plainly bounded, the checker uses the expected type only when the type at the bound does not fit. So a list comprehension under a declared `List[\E\]` keeps the bound `Any`, which the declared type then refuses. `library.md` confirms that the checker refuses `SUM` without an element type.
- **Where:** the compiled path's static checker. The construct is a big operator or comprehension with no static argument written. The interpreter's library writes the argument at `Library/FortressLibrary.fss:4410`, `:4416` and `Library/List.fss:151`.
- **Reproduce:** There is no test (reproducer `none`). The notes point to `explorations/compile-ladder/rung-argument-context/REPORT.md:115` for an F-bounded `BIG LAST`. A worker would compile, say, `s = SUM[j <- 0#3] j` and look for the "not applicable" message. `InferBigOperatorExpectedType` and `InferBigOperatorUnwritten` seem to be tests that pin the plain-bounded behaviour, but no path or suite is given.
- **Status:** NEGATIVE-VERIFIED, an open checker gap to fix. Until it is fixed, user programs write the static argument, as library.md prescribes.
- **Could not resolve:**
  - "an unwritten clause form": probably "a reduction or comprehension whose static argument is not written". Project term, see also rows 510 and 717.
  - "has no instance": I read this as "no static argument satisfies the bound under the checker's inference". Unclear wording.
  - `InferBigOperatorExpectedType` / `InferBigOperatorUnwritten`: test names or checker code? Their folder is not given. Unclear wording.
  - Why a `none` reproducer, when the defect can be observed by a compile? tests-writing.md item 3 allows `none` only when no gated test can pass while the defect shows. Unclear.

## Row 825

- **Defect:** Under walk, a list comprehension written at a self-bounded type parameter that nothing has fixed (so the parameter stays open, as the skill says) fails with `CastError` at `upward`'s `cast[\CovariantCollection[\R\]\](s)`, `Library/CovariantCollection.fss:17`. `List`'s range subscript with a stride other than 1, on a list of such an open element type, fails the same way, because it is that kind of comprehension (`<|[\E\] self[i] | i <- r |>`, `Library/List.fss:151`). Stride 1 goes through `drop`/`take` and works.
- **Where:** walk. The library files are `Library/CovariantCollection.fss` and `Library/List.fss`. The construct is a comprehension at an open type parameter.
- **Reproduce:** Run `ProjectFortress/tests/OpenParameterListComprehensionWalk.fss` under walk. It is not an XXX test, so it asserts today's behaviour. The setup is `emptyOf[\T extends SelfBound[\T\]\](): List[\T\] = <|[\T\] |>`, `xs = emptyOf().addRight(Leaf)`, then `<|[\T\] x | x <- xs |>`.
- **Status:** CONTESTED. Wait on the question; build no fix. The open question is whether walk's open-parameter rule, which admits every value checked against the open type (the `revival-inference` callout in `basic/inference.tex`), also covers a generic type that holds the open type, such as `CovariantCollection[\OPEN\]`. The checker refuses the call that leaves the parameter open (F-59). The workaround is `emptyOf[\Leaf\]()`.
- **Could not resolve:**
  - `OPEN` in `CovariantCollection[\OPEN\]`: I take it as notation for the open parameter, not a Fortress type, but the skill does not define it. Concept that I lack.
  - The class cell says "implementation gap (walk)" while the specification cell says "silent" and the status is CONTESTED. It is unclear whether the gap is in walk or in the specification. Unclear wording.
  - `SelfBound`, `Leaf`: types of the test program. They are not defined in the row, but the test resolves them.

## Row 663

- **Defect:** Under walk, in a `Holder` whose self-bounded type parameter is open, overload selection does not treat a tuple of values as a subtype of a tuple type over that parameter. With `pick(x: Any)` and `pick(x: (T,T))` both declared, `pick((1, 2))` runs the `Any` one. A lone `one(x: (T,T))` accepts the same tuple. So the open parameter admits values in a single check, but not when overloads are compared by specificity.
- **Where:** walk's dispatch, at a tuple type over an open type parameter. No library code has such a pair (`AssociativeReduction`'s `simpleJoin` is typed at `R`, F-144).
- **Reproduce:** Run `ProjectFortress/tests/OpenTupleDispatchWalk.fss` under walk. It is not XXX, so it asserts today's behaviour. More detail is in `compile-ladder/rung-walk-open-param/REPORT.md`, section 5.
- **Status:** CONTESTED. Wait. The `revival-inference` callout covers a value checked against the open type, but says nothing of a tuple or generic type that holds it. F-143 records the rule. The workaround is to write the static argument.
- **Could not resolve:**
  - `Holder[\OPEN\]`: the same `OPEN` notation as row 825. Concept that I lack.
  - "is not below": I read it as "is not a subtype of". Plain enough.
  - "A probe with `sj` measured it": I do not know what `sj` is (a function in the probe?). Unclear wording.
  - `compile-ladder/rung-walk-open-param/REPORT.md` has no `explorations/` prefix, so the path is ambiguous. Unclear wording.

## Row 716

- **Defect:** Under walk, a reduction or comprehension that is empty, has no static argument and has no declared type to direct it is instantiated at the big operator's bound, not at its body's type. `e = SUM[j <- 0#0] (j / 2.0)` gives `0 : Int`, not `0.0 : RR64`. `<| 2 k | k <- 0#0 |>` gives `List[\Any\]`, not `List[\ZZ32\]`. With no element to join, `SUM`'s F-bounded `T` stays open, and `additiveIdentity`'s typecase takes its first clause, `() -> ZZ32` (`Library/FortressLibrary.fss:3395` at c124c6b65). This matches library.md ("An empty `SUM` ... gives the integer 0").
- **Where:** walk. The library code is `Library/FortressLibrary.fss` (`additiveIdentity`). The construct is an empty reduction or comprehension.
- **Reproduce:** Run `ProjectFortress/tests/XXXUnwrittenEmptyFloatSumUntypedWalk.fss` under walk (XXX). `UnwrittenComprehensionElementsWalk` asserts the `List[\Any\]` result as walk's current answer.
- **Status:** NEGATIVE-VERIFIED, an open walk gap. The notes say walk has no static type for the body there, so a fix needs a static type that walk lacks. The workaround is to write the static argument or declare the value's type, and that is what a worker should do now.
- **Could not resolve:**
  - "The desugaring by the type `N`": I do not know what `N` is. It is probably the specification's desugaring's name for the body's static type. Concept that I lack.
  - "pins the list face": "list face" again, as in row 717. Probably "the comprehension half of this row". Unclear wording.

## Row 824

- **Defect:** Under walk, `PureList`'s range subscript with a stride other than 1 returns a list typed by its elements' run-time class. For `l = <|[\ZZ32\] 10, 11, 12, 13, 14, 15 |>`, `l[0:4:2]` is a `PureList[\Int\]`, which a binding declared `List[\ZZ32\]` refuses. The cause is `Library/PureList.fss:73`, `<| self[i] | i <- r |>`, which writes no static argument. Under walk a method's return type does not direct a comprehension (F-228), so walk uses the join of the run-time classes. `List`'s subscript writes `[\E\]` (`Library/List.fss:151`) and is correct (`WrittenReductionArgumentsWalk`). Stride 1 goes through `drop`/`take` and works.
- **Where:** walk, in the library: `Library/PureList.fss:73`.
- **Reproduce:** Run `ProjectFortress/tests/XXXPureListStridedSubscriptWalk.fss` under walk (XXX).
- **Status:** NEGATIVE-VERIFIED, a library bug. The fix is a library edit: write `<|[\E\] self[i] | i <- r |>` at `PureList.fss:73`, test first.
- **Could not resolve:**
  - Nothing that blocks. As in rows 20 and 717, I lack the fact that an integer's run-time class is `Int` even when the display writes `[\ZZ32\]`, but the row states the outcome.

## Summary

- Row 20: unclear. "blinded", "parent of" a commit, and what the specification's "union" gives for float numerals. The reproducer is `none` with no command or output.
- Row 510: mostly clear. "only a call's result mentions" does not fit the `wrapK(3)` example, and "clause form" is undefined.
- Row 705: clear. Whether P-12 also gates it is unstated.
- Row 717: clear from the example. "clause form" and "row 20's list face" are undefined.
- Row 731: mostly clear. "unwritten clause form" and "has no instance" are terse, the two `InferBigOperator*` names have no location, and the `none` reproducer is unexplained.
- Row 825: clear. `OPEN` notation, and a walk class cell against CONTESTED and "silent".
- Row 663: mostly clear. `OPEN`, the probe "with `sj`", and a report path without `explorations/`.
- Row 716: clear. "the type `N`" and "list face" are undefined.
- Row 824: clear.
