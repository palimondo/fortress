# Cold read: c-run3-probe

Read with only `CLAUDE.md`, the `fortress-repo` skill's core and its references (not `revival-changes.md`, not `sources.md`). One general gap: the meanings of the status words are in the ledger's row template, which a cold reader may not read; `records.md` says only that `RETIRED`, `FIXED` and `DUPLICATE` close a row. So `NEGATIVE-VERIFIED` reads here as "an open gap whose failure was seen", and `CONTESTED` as "an open question", from the words alone. "in the parent of HASH" reads as "the probe file is in commit `HASH^`" (so `git show HASH^:PATH`), which no reference states. "full text: history, row N" points to `explorations/fortress-gap-ledger-history.md` (`records.md`).

## Row 77

- **Defect:** The compiled checker refuses a dotted call `t.tsum()` on a value of static type `Tree`, where `Tree comprises { Leaf, Node }` and only `Leaf` and `Node` declare `tsum()`. It says `No such method Tree.tsum.` and the compile exits 255. Walk runs the same program and prints `p20 3.0`. The row's argument: the traits chapter says every value of a closed trait has a listed type, so the call should be accepted.
- **Where:** the compiled path, the checker; a dotted method call on a value whose static type is a closed (`comprises`) trait. No source file of the checker is named.
- **Reproduce:** get `explorations/compiler-probes/p20.fss` from the parent of `c69cb2064`, then run `bin/fortress compile p20.fss` and look for the message, exit 255; `bin/fortress p20.fss` prints `p20 3.0`. The probe has `t: Tree = Node(Leaf(1.0), Leaf(2.0))`, then `t.tsum()`. Workaround: declare `tsum()` abstract in `Tree`.
- **Status:** open and seen; a checker fix to build, with a test first. It has a sibling, row 78, the same gap for top-level overloads.
- **Could not resolve:**
  - "at each of the three calls": the row shows one call, so I do not know what the other two are. Unclear wording.
  - `NEGATIVE-VERIFIED`: defined only in the template I may not read. Missing term.
  - "in the parent of `c69cb2064`": I read it as `git show c69cb2064^:explorations/compiler-probes/p20.fss`, but it could also mean "run in the tree at that parent". Unclear wording.
  - The row does not say whether the fix belongs in the checker's method lookup or somewhere else. That is fine for a row.

## Row 78

- **Defect:** The same gap as row 77 for top-level overloads. With `tsum(t: Leaf)` and `tsum(t: Node)` and no `tsum(t: Tree)`, the compiled checker refuses `tsum(t)` for `t: Tree`. It says 'Could not check call to function tsum', then `Leaf->RR64 is not applicable to an argument of type Tree.` and the same for `Node`, exit 255. Walk dispatches at run time and prints `p10 3.0`.
- **Where:** the compiled path, the checker, overload resolution of a call whose argument has a closed trait as its static type. No checker file is named.
- **Reproduce:** `explorations/compiler-probes/p10.fss` from the parent of `c69cb2064`; compile it and run it under walk.
- **Status:** open and seen; a checker fix to build. No workaround is given, unlike row 77. I would guess an abstract `tsum(t: Tree)` or a functional method, but the row does not say.
- **Could not resolve:**
  - "at each of the three calls": as in row 77, I do not know what the three calls are. Unclear wording.
  - It is not clear whether this gap is near `compiler.md`'s `NoSuchMethodError` case through a `comprises` clause (ledger row 815) or unrelated. The row does not say, and I cannot tell.

## Row 83

- **Defect:** Claimed: a function generic in a `nat` static parameter, called through an exported api, unifies the size wrongly at its second instantiation. No run has shown it. A test of the case (`vsum[\nat n\](a: Array1[\RR64, 0, n\]): RR64` declared in an api and called from another component at sizes 3, 5, 3) prints the right sums under walk at `c124c6b65`. Compiled, it fails earlier with `Array1 is undefined.`, because the compiler's prelude has no array types (`compiler.md`).
- **Where:** walk (the class), calls across a component and api boundary of `nat`-generic functions. No file is named.
- **Reproduce:** none. The only evidence is a transcript time (`17:29`, "the `src/MicroGPT.fsi` attempt"). The probes that failed to reproduce it are named: run-b2's `apix` probes (rows 132, 133), `explorations/run-c/probes/api/` in the parent of `4ebf80aec` (row 151), and the `vsum` test above.
- **Status:** `CONTESTED`. The notes say every case named has been tried, and that whether the row is retired is the curator's call. A worker should leave it and wait on the curator, building nothing.
- **Could not resolve:**
  - "mis-unify": the claim does not say what wrong result appears (a wrong size, a refused call or a wrong value). Unclear wording, and the core of the claim.
  - "blinded", "run-b2", "Run C": batch or agent names that the skill does not define. The row numbers make them mostly harmless. Missing context.
  - "a transcript timestamp (`17:29` ...)": I cannot tell which transcript or which date. Unclear wording.
  - "Every case named is tried": named where? Perhaps in the history text. Unclear wording.
  - Specification cell `basic/trait-parameters.tex`: it has no `Specification/` or `Specification-1.0-frozen/` prefix, so it can be read two ways. Unclear wording.
  - It is not clear why the class is walk when walk passes every probe. Unclear.

## Row 184

- **Defect:** Under walk, `a ≡ b` on two objects of a user type that has no `≡` raises an internal error, `** bug! Expect all oprefs to be top level EQV`, exit 1. It should be a type error: a failed dispatch, since walk finds type errors at run time. Once `≡` is declared for the type, the expression works.
- **Where:** walk, `getOp` in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:896` (at `c124c6b65`); the operator `≡` (`EQV`) applied where the library declares no `≡` for the argument types.
- **Reproduce:** `object Pt(x: ZZ32) end`, then `a = Pt(1)`, `b = Pt(1)`, and `a ≡ b` in `run()`, under walk. It imports no DSL grammar. The probes are `explorations/apl/v1-probes/p06_cross.fss` and `p10_eqv.fss` in the parent of `1ee3b0bc5`. Workaround: declare the operator.
- **Status:** open and seen, with the specification silent. The fix is to turn the internal error into a proper failed-dispatch error in walk. Per `tests-writing.md` item 3 (silent specification), a worker writes a test of today's behaviour if one can pass. Here walk crashes, so the reproducer is rightly `none`.
- **Could not resolve:**
  - "host-known operator": I read it as an operator the interpreter treats natively (by its name `EQV`), but the term is not in the skill. Missing term.
  - "(retired first library)": I can read it as "the APL experiment's first library, now retired" or as "the first library, which was then retired". Either way, I do not know if the `AplArr` result still holds. Unclear wording.
  - "not at top level": the row does not say why a library operator reference would not be at top level here. That is a detail for the fixer.

## Row 30

- **Defect:** Under walk, an `opr +` declared at top level in a user component is visible in that component but not inside library generic code. So `SUM` over a user type `W` whose `+` is top-level fails in the library's reduction, 'Failed to find any matching overload, args = (W,W)', exit 1, while `W(1.0) + W(2.0)` in the component prints `W(3.0)`.
- **Where:** walk; `SumReduction`'s `join(a: T, b: T): T = a + b` at `Library/FortressLibrary.fss:3448` (at `c124c6b65`), whose `+` candidates are the library's only. The construct is the scope of a top-level operator declaration across components.
- **Reproduce:** `explorations/gap-ledger-probes/g10.fss` from the parent of `e879b6a44`, under walk.
- **Status:** a design limit, so not a fix to build. Use the workaround: declare the operator as a functional method of `W` (row 31; the skill's "Functional methods" explains why that crosses the boundary). Row 132 holds the api counterpart, and row 215 says a user call site does see an api's top-level `opr`.
- **Could not resolve:**
  - "Walk takes `SUM` at `W` though `W` does not extend `AdditiveGroup[\W\]`, the reduction's bound": this looks like a second defect, a bound that is not checked. I cannot tell whether it is part of this row, recorded elsewhere, or only context. Unclear wording.
  - "a user `Number` `W`": does `W` extend `Number`, or is it only number-like? Unclear wording.
  - "design limit (walk)" with an Import Statements citation: I cannot tell whether the specification makes the scoping intended or whether the limit is walk's alone. That decides whether the compiled path should behave the same. Unclear.

## Row 145

- **Defect:** A capability, recorded as deliberate. `AND` and `OR` are strict: they evaluate both operands. The forms `AND:` and `OR:` short-circuit. So `(i < |s|) AND (s[i] = 'e')` with `i = |s|` raises `IndexOutOfBounds`. A bare `a AND b` takes the overload `opr AND(a: Boolean, b: Boolean)` over `opr AND(a: Boolean, b: () -> Boolean)`.
- **Where:** the library, `Library/FortressLibrary.fsi:2648-2651` (at `c124c6b65`); the conditional operators. Under walk (the probe); the compiled path is not stated.
- **Reproduce:** `explorations/apl/rung-3/t03_and.fss`, with `explorations/apl/base` on `FORTRESS_SOURCE_PATH`. In its part (a), `false AND bump()` runs `bump` once, the thunk form zero times, and `true OR bump()` once. There is also the probe `explorations/run-c/probes/g145_and.fss` in the parent of `4ebf80aec`.
- **Status:** deliberate, so leave it. In programs (microGPT, the APL code), write `AND:` or pass a thunk in loop guards such as `while (i < n) AND (s[i] ...)`.
- **Could not resolve:**
  - The row does not say what `conditionalops.tex:13-27` states. "deliberate" suggests the specification makes `AND` strict and `AND:` the short-circuit form, but I cannot confirm that from the row. Unclear wording.
  - `NEGATIVE-VERIFIED` on a deliberate behaviour: it is unclear whether "negative" means "a trap for workers" here or "a gap". Missing term.
  - `FORTRESS_SOURCE_PATH`: not in the skill. I read it as the search path for components and apis. Missing term, but inferable.

## Row 164

- **Defect:** Under walk, two overloads that differ only in the arrow type of a function parameter are told apart by a lambda with types, but not by an untyped lambda. `apply(fn (x) => SUM x, v)` silently takes the first declared overload, here the one with a vector result, and prints `3.0` with no diagnostic. By reading the code: an untyped lambda's unwritten return type is `BottomType` (`FunctionClosure.java:257` at `c124c6b65`), so its arrow fits both overloads. With a second parameter that differs, the call resolves.
- **Where:** walk, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java:257`; overload resolution on a function-typed parameter. The compiled path is not stated.
- **Reproduce:** `explorations/run-c3/probes/g158_untyped_overload/G158.fss` from the parent of `a0a0c7c99`, with `fill` written `tabulate`. Its output line `(3)` shows the wrong choice, and `(1)` and `(2)` show the right ones. Workaround: give the lambda types.
- **Status:** open and seen; a walk fix to build. Row 171 is the positive half, and row 131 says walk accepts an untyped parameter.
- **Could not resolve:**
  - "with `fill` written `tabulate`": I can read it as "rename `fill` to `tabulate` in the probe before running it" or as "the probe already says `tabulate` where it once said `fill`". Unclear wording, and it matters for reproducing.
  - The right behaviour is not stated: should walk pick the correct overload (by inferring the lambda's result type) or report an ambiguity? The specification lines are cited, but what they say is not. Unclear.
  - "by reading": I read it as "found by reading the code, not by a run". Inferable.

## Row 444

- **Defect:** Under walk, an overloading of a dotted method across inheritance that the Meet Rule refuses is accepted and dispatched. `m(x: ZZ32)` is in `trait Tm` and `m(x: Any)` in `object Om extends Tm`. Neither `(Om, Any)` nor `(Tm, ZZ32)` is below the other, and `Om` provides no `m` for their meet `(Om, ZZ32)`. Walk loads the program and prints `1` and `2`. The compiled checker refuses it, 'Invalid overloading of m in trait Om'. The same holds with a size parameter on the trait's declaration, `m[\nat n\](x: ZZ32)`.
- **Where:** walk's checks at load (`interpreter.md`); by reading, the `OverloadedMethod` in `interpreter/evaluator/values/Constructor.java:383-388` compares an object's inherited `m` with its own `m` without the receiver.
- **Reproduce:** `compile-ladder/rung-unknown-size-arm/probes/skeptic/Sk2InheritedPlain.fss` and `Sk2Inherited` beside it, from the parent of `ab067d9b6`, under walk with cold caches. `interpreter.md` says walk's checks at load run only when the library is analysed, so a warm cache would hide a refusal.
- **Status:** open and seen; a walk fix to build (walk should refuse at load). Its siblings are 544 and 735.
- **Could not resolve:**
  - `compile-ladder/...` paths: no `explorations/` prefix, so I cannot tell whether they sit under `explorations/` or at the top. Unclear wording.
  - "the trait's arm": "arm" is not in the skill. I read it as "one declaration of the overloaded name". Missing term.
  - "cold": I read it as "with empty caches" (`interpreter.md`). Inferable.
  - "`compile-ladder/rung-walk-overload-if/REPORT.md` §11": a report that a worker may read. Fine.

## Row 258

- **Defect:** Walk accepts a tuple returned from a function declared to return `Object`. The specification makes a tuple type a subtype of `Any` alone, and the skill agrees that `Any` holds tuples while `Object` does not. In the APL base, `aplTup` declares `Object` and returns a tuple (`explorations/apl/base/AplCore.fss:1726-1731`). `aplEach` (APL's `¨`) uses it when every cell is a matrix of unequal shape (`:1743`), giving a tuple of arity 2, 3 or 9 that a "nine-name destructuring rule" then binds.
- **Where:** walk; the check of a declared return type against a tuple; the APL experiment's base library.
- **Reproduce:** `explorations/apl/microgpt/probes/x03_lib.fss` and `x04_gram.fss` from the parent of `1ee3b0bc5`, under walk (the APL code needs `explorations/apl/base` on the source path, per row 145).
- **Status:** `CONTESTED`. No POSITIONS entry chooses between the specification and the APL base's reliance on walk. Wait on the curator; do not make walk refuse it. The notes add that an `Any` result now dispatches (row 240), so the APL base could declare `Any` instead.
- **Could not resolve:**
  - "the nine-name destructuring rule": an APL-base or DSL construct that the skill does not define. Missing term.
  - "row 252's strand-as-tuple": APL vocabulary ("strand"). Missing term.
  - "other lengths refused catchably": refused by what, and as which exception? Unclear wording.
  - "A vector cell's nested array result stays a `CallerViolation` (... check Y20)": I cannot tell whether this is a second defect in the row or a limit of the workaround. `CallerViolation` is not in the skill. Unclear wording and missing term.
  - Once `Object is not forced` holds, it is not clear what keeps the row contested rather than simply a walk defect that the APL base should stop using. Unclear.

## Row 307

- **Defect:** Three failures, in one row:
  1. The compiled checker refuses by name to infer a `bool`, `dim` or `unit` static parameter. `makeInferenceArg` throws '... bool static parameter b is not supported by the type checker.' at the declaration's parameter, not at the call, which hides the component's other errors. `nat` and `int` parameters are inferred.
  2. A size built from a number known only at run time does not run compiled: `ProjectFortress/tests/NatReflectTest.fss` stops in the class loader with 'Unable to read serialized data for NatReflect$N??', exit 1.
  3. A trait whose `comprises` clause binds a `where`-clause size compiles, but a call that opens its value to the size fails JVM verification (`VerifyError`; `compiler.md` describes this case).

  The row also says that walk does not unify a `bool` parameter.
- **Where:** the compiled path: the checker, at `scala_src/.../STypesUtil.scala:585-606` (at `63e420a33`), and the run time's class loader.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXNatBoolChecker.test` (the gated expected failure); `NatReflectTest.fss` compiled and run; `compiler_tests/XXXNatOpenRun.test` with `NatOpenRunLink.test`.
- **Status:** open and seen; checker and run-time fixes to build. A fix turns each `XXX` test red, to be promoted (`tests-writing.md`). Its siblings are 25, 761, 763, 764 and 867.
- **Could not resolve:**
  - `dim` and `unit`: the skill says dimensions and units are not built, so I do not know whether part 1 asks for their inference or only for `bool`. Unclear.
  - "opens its value to the size": `compiler.md`'s fresh size helps, but "opens" is not defined. Missing term.
  - "Walk does not unify a `bool` one": a separate walk gap inside a checker row? Unclear wording.
  - The checker line is cited at `63e420a33` and the other facts at `c124c6b65`, so the line may have moved. Minor.
  - Three defects in one row: a worker cannot tell which one the `XXX` reproducer covers beyond part 1, or which one to fix first. Unclear.

## Row 499

- **Defect:** The compiled checker accepts generic overloads in the more-specific relation that do not agree position by position. The compiled dispatcher then answers at the call's instantiation. Through `viaT[\T\](x: T) = f(x)`, a `Box` argument runs `f[\T\](x: T)`, not the more specific `f[\U\](x: Box[\U\])`. Site: the dispatcher reads an overload with as many static parameters as the template, by position, without checking their kinds (`OverloadSet.java:1342-1353` at `c124c6b65`). Second case, `XXXGenericPositionalFixed`: `grab` on `Tag[\X\]` and on `Fixed[\Y\] extends Tag[\Blue\]` answers `tag` for a `fixed` compiled, while walk answers `fixed`. The direct call `f(b)` answers `box` or `any` depending on the JVM that compiled it, because the checker keeps the head of a sort on a tie (`Functionals.scala:824-832`).
- **Where:** the compiled path: the checker's overload checks and the code generator's dispatch (`OverloadSet.java`), for generic overloads; `scala_src/typechecker/impls/Functionals.scala`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXGenericPositionalBox.test`, and `XXXGenericPositionalFixed`.
- **Status:** a "design limit (checker)", yet with gated `XXX` tests. `tests-writing.md` says that pairing means a deferred defect whose answer the specification settles. So a worker should read it as a known limit, not to be fixed without a brief, whose fix would promote the tests. That reading is my guess. Its sibling is 538.
- **Could not resolve:**
  - "F-75's positional rule": a FACTS entry that the row cites but does not state. A worker can print it (`$T 'F-75'`), but the row does not stand on its own. Missing context.
  - "agree position by position" and "answers at the call's instantiation": I read the second as "dispatch decides using the static type `T` at `viaT`'s call rather than the run-time type", but it could also mean the instantiation's class loaded by the class loader. Unclear wording.
  - "by the compiling JVM": a result that varies with the JVM's version or its sort order? Unclear wording.
  - "arm": as in row 444, not defined. Missing term.
  - "design limit" with `XXX` tests: whether to fix it or leave it is unclear. Unclear.

## Row 235

- **Defect:** In a DSL grammar (`build-and-caches.md`, "DSL grammar"), a gap, read here as a pattern variable such as `a:AplE`, is greedy even inside a delimited rule. `( a:AplE SPACE , SPACE b:AplE ) ⍴ r` never matches once the grammar also has a catenate rule: the first gap takes `a , b` as one catenation, and the PEG parser does not retry it shorter. The closing delimiter does not stop the gap.
- **Where:** the parser, DSL grammar expansion (Rats!/PEG); `explorations/apl/rung-3/T02Syn.fsi:30` (`TExp` gaps) above `:32` (`TAtom` gaps).
- **Reproduce:** `explorations/apl/rung-3/t02_gram.fss` printed `TA gaps: 5 5 5`, the atom rule firing. At `c124c6b65` it no longer runs: it stops at load because `opr ×(a: RR64, b: RR64)` in `explorations/apl/base/AplCore.fss:1209` and the library's `TIMES` (`Library/FortressLibrary.fss:462`) 'have the same types'.
- **Status:** a design limit of PEG, so leave it. Use atom gaps, as `explorations/apl/base/AplSyntax.fsi:212` does, which handles `(n,NE)⍴x` (the microGPT spelling) but not `(2+1,3)⍴x`. Siblings: 183, 287.
- **Could not resolve:**
  - "gap": not defined in the skill for grammars. I read it as a syntax rule's pattern variable. Missing term.
  - "delimited rule" and "stands above": I read these as "a rule with literal brackets" and "listed earlier, so tried first under PEG's ordered choice". Unclear wording.
  - The reproducer no longer runs at `c124c6b65`, and the row gives no way to see the gap today. It is also unclear whether the `×`/`TIMES` clash is a defect with a row of its own, and so whether a worker should fix it or remove the APL `opr ×`. Unclear.
  - `SPACE`: a grammar token of the APL syntax, not defined. Inferable.
