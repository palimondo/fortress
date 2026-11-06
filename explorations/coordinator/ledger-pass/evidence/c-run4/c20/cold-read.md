# Cold read: c-run4/c20 (rows 540, 543, 559, 612)

Read with only `CLAUDE.md`, `SKILL.md` and the allowed `references/` files. The row template, which defines the status words, is in the ledger and was not read, so `NEGATIVE-VERIFIED` is read here as "a confirmed open gap" (records.md lists it as one of the four words that do not close a row). None of P-60, F-76 or the sibling rows could be looked up.

## Row 540

- **Defect:** `fortress compile` crashes with `ClassCastException` (`IntersectionType` to `NamedType`) when a method is called on the result of an overloaded call that the checker types by the intersection of its candidates' return types, e.g. `choose(m).left()` typed `LeftResult ∩ RightResult`. The checker accepts the program; the code generator assumes the receiver's static type is a named type.
- **Where:** compiled path, code generator: `CodeGen.forMethodInvocation`, `CodeGen.java:6515` at c124c6b65. Constructs that crash: dotted method call on the call (`.left()`, `.right()`), a method call on a variable bound to the call, a getter. Constructs that work: passing the result to a function of either type, an `if` expression, a tuple binding.
- **Reproduce:** compile `ProjectFortress/compiler_tests/XXXCoverageReturnMethodCall.test` (family from the notes: `choose` over `S`, `T`, `V` with `S comprises {U, V}`, `T comprises {V, W}`, `U excludes W`, `m: M`, `M` extending `S` and `T`).
- **Status:** build a fix in the code generator: find the method's owner among the intersection's conjuncts instead of casting. Do not change the checker's typing ("The typing stays (P-60)").
- **Could not resolve:**
  - The row does not say whether walk was run, though the skill asks a row to name the paths that show a defect; walk has no static types, so it likely does not show it, but the row does not say so (unclear wording, omission).
  - "P-60": a POSITIONS entry I cannot read; I take it as the curator's decision that the intersection typing is right (record reference, not explained).
  - "`M` below `S` and `T`": whether `M` is a trait or an object is not said (minor, unclear wording).
  - "siblings: 559", "climb batch 7b rung C, its skeptic": provenance; not needed to act.

## Row 543

- **Defect:** for the row-540 family plus a generic declaration `choose[\X\](b: Box[\X\]): BothResult` (which cannot apply to an `M`), the compiled checker no longer types `choose(m)` by the intersection of return types. It picks one return type, so of `left: LeftResult = choose(m)` and `right: RightResult = choose(m)` one is refused ("... but declared type is RightResult" or the reverse), and which one changes from run to run.
- **Where:** compiled checker (Scala): `groundFamily`, `Functionals.scala:718` at c124c6b65, which allows intersection typing only when no declaration of the family has static parameters.
- **Reproduce:** compile `ProjectFortress/compiler_tests/XXXCoverageReturnGenericFamily.test`; expect a type error on one of the two bindings.
- **Status:** read as leave it: class `deliberate`, "the typing kept is sound by the Return Type Rule; the narrower scope is a default (F-76)". But the status is `NEGATIVE-VERIFIED`, and the note that P-60 "excludes only a generic declaration whose instance dispatch must choose at run time" suggests the decision allows a wider scope than `groundFamily` gives. I cannot tell whether a worker may widen the scope to P-60's line or must wait for the curator.
- **Could not resolve:**
  - "typed by the head of a sort": a sort of what (the candidates by specificity? the return types?) and why the head changes between runs. Unclear wording; the varying result looks like nondeterminism, which the row does not call a defect.
  - "closed traits": read as traits with a `comprises` clause; not a term in the skill (language concept, probably).
  - `deliberate` together with `NEGATIVE-VERIFIED`: deliberate default, or an open gap? Read two ways.
  - "F-76", "P-60": record references I cannot read; the row leans on them for the status.
  - "whose instance dispatch must choose at run time": which generic declarations this covers is not explained (unclear wording).

## Row 559

- **Defect:** on the compiled path, when a generic function is instantiated with an intersection type as its static argument, the run time dies loading the instance class: 'Unable to read serialized data for Intersection??' (or 'AbstractIntersection??'), because the run time has no class for an intersection type. The checker produces such instances in three ways: (1) a bare type parameter fixed by an argument of intersection type, `pass[\X\](x: X): X` on `choose(m)`; (2) an unfixed parameter whose bound and expected type are unrelated traits, taking their meet, `mk[\T extends A\](): T` with `g(): B = mk()`; (3) an overloaded function passed where `[\X extends Any\]` is inferred.
- **Where:** compiled run time, class loader: `InstantiatingClassloader.java:2519` at c124c6b65, reached through `xlationForGeneric`. Walk runs routes 1 and 2.
- **Reproduce:** link `CoverageReturnInferred.test` then run `XXXCoverageReturnInferred.test` (route 1) in one `junit.sh` call; route 2 is `XXXInferBoundMeetsExpectedTrait.test`. Route 3 has no named test.
- **Status:** build a fix in the run time (give intersection static arguments a representation the class loader can instantiate). compiler.md also says to read this row before investigating any class-load failure.
- **Could not resolve:**
  - Route 3, "an overloaded function given to `[\X extends Any\]`": what program this is (an overloaded name passed as an argument to a generic function? whose type is the intersection of the overloads' arrow types?) and its reproducer. Unclear wording.
  - "the checker gives such an instance": read as "infers such a static argument" (unclear wording).
  - "gates the link": read as the plain Link test of the pair; fits tests-writing.md.
  - "Walk runs 1 and 2": whether walk runs route 3 or was not tried is not said.
  - "siblings: 448, 616": not described; cannot tell if they share the fix.

## Row 612

- **Defect:** under walk, a static parameter that an argument bounds only from above, and whose declared bound names another static parameter, is inferred as `Bottom` instead of from its bound. `coS[\S, T extends S\](g: T -> ZZ32, s: S)` given `fn (x: ZZ32): ZZ32 => x` and a `ZZ32` gives `BoxU[\BOTTOM\]` (the function argument bounds `T` from above at `ZZ32`, since an arrow's domain is contravariant).
- **Where:** walk, inference in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`: `instanceOf` at `:375` skips the bound for a parameter in `rechecks`, and its last loop (`:397-399`) does not meet `boundAtInstances` with the interval's upper end.
- **Reproduce:** run `ProjectFortress/tests/XXXInferAboveBoundMentionsParamWalk.fss` under walk. Workaround: write `coS[\ZZ32, ZZ32\]`.
- **Status:** build a fix in walk.
- **Could not resolve:**
  - The return type of `coS` is cut from the claim; `BoxU[\BOTTOM\]` implies it returns `BoxU[\T\]` (or a box of `T`), which I infer (unclear wording).
  - The expected answer is not stated: `T = ZZ32` is implied by the workaround, but `S`'s value too? (unclear wording, minor).
  - "`rechecks`", "`boundAtInstances`", "the interval's upper end": internal names of walk's inference, not in the skill; a worker learns them from the file (implementation term, acceptable).
  - Whether the compiled path was run on the program is not said, though the skill asks for it (omission).
  - "siblings: 591": not described.
