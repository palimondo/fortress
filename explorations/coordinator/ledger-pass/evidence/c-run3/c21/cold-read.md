# Cold read: c-run3/c21

Read with `CLAUDE.md`, `fortress-repo/SKILL.md`, and `references/records.md`, `tests-writing.md` and `compiler.md` only. A term common to all rows: the status word `NEGATIVE-VERIFIED` is listed in `records.md` but defined only in the ledger's row template, which a cold reader may not open. I read it as "the gap is confirmed and open", so a worker may build a fix. "full text: history, row N" I read as `explorations/fortress-gap-ledger-history.md`. "in the parent of `<commit>`" I read as "the probe was deleted in that commit; read it with `git show <commit>^:PATH`".

## Row 496

- **Defect:** A generic function and a plain function share a name, and the plain one takes `Any`. If the call's argument has static type `Any`, the checker resolves the call to the plain declaration. At run time the dispatcher should run the generic one, as the specification and walk do, but the compiled run dies. There are two shapes: `peek[\X\](t: Tag[\X\])` beside `peek(a: Any)`, and `grab[\X\](t: Tag[\X\]): Marker[\X\]` beside `grab(a: Any)`, which dies on a cast to `Marker⟦X⟧`. A third shape: `k(x: ZZ64): ZZ64` beside `k[\T\](x: T): T`, called at `ZZ32`, fails at class load with `VerifyError: Bad return type`. Walk refuses that third set.
- **Where:** The compiled path only, in the code generator. `OverloadSet.java:2048` at c124c6b65: the dispatch method is not a template, so a top-level call's dispatch never reaches the generic arm with static arguments, and it is not given the call's static return type.
- **Reproduce:** Run `compiler_tests/XXXGenericBesidePlainZZ32.test` through the harness. Also `XXXGenericBesidePlainStatic`. For the third shape, use the probe `S2CtxConvWinsZ.fss` from the parent of `ab067d9b6`.
- **Status:** A confirmed gap. A fix is to build, but the notes tie it to "PLAN phase 5". That suggests waiting for that phase or doing the work inside it.
- **Could not resolve:**
  - "on the `ZZ32` spelling" (unclear wording): it could mean the argument is a `ZZ32`, or that one test is written with `ZZ32` types.
  - `Marker⟦X⟧` beside `Marker[\X\]` (notation the skill lacks): I took `⟦⟧` to be the name of a run-time instantiated class, possibly not yet instantiated, but the skill never defines it.
  - "dies compiled" (unclear wording): for `peek` the notes give no exception and no message.
  - "PLAN phase 5" (a record term the skill does not name): which file, and what does the phase hold?
  - "the mie-probes scope note" and "climb batch 6.5 rung G" (history terms): harmless.
  - "How a call resolved to the plain declaration reaches the generic one is not traced" (unclear wording): it seems to contradict "does not reach it" two sentences earlier.
  - "walk refuses that set" (unclear wording): refused at load, or at the call?

## Row 499

- **Defect:** Two generic overloads, `f[\T\](x: T)` and `f[\U\](x: Box[\U\])`, are reached through `viaT[\T\](x: T) = f(x)` with a `Box`. The compiled run picks `f[\T\]`, where the more specific `f[\U\]` should run. It looks as though the dispatcher matches the arms' static parameters by position against the template's own, without checking their kinds or shapes, so it answers from the call's instantiation `T`, not from the value. A second program, `XXXGenericPositionalFixed`, answers `tag` where `fixed` is expected. A direct call `f(b)` answers `box` or `any` depending on which JVM compiled it, because the checker keeps the first item of a sort when two overloads tie (`Functionals.scala:824-832`).
- **Where:** The compiled path. The dispatcher is in `OverloadSet.java:1342-1353`, and the tie in the checker is in `scala_src/typechecker/impls/Functionals.scala:824-832`, both at c124c6b65.
- **Reproduce:** `compiler_tests/XXXGenericPositionalBox.test`, and `XXXGenericPositionalFixed` beside it.
- **Status:** A confirmed gap, but the class is "design limit (checker)". So I cannot tell whether a worker should fix it or leave it as a limit of the design. The notes also point at the dispatcher in the code generator, not at the checker.
- **Could not resolve:**
  - The claim's "accepts generic overloads in the more-specific relation that do not agree position by position" (unclear wording): I could not say what "agree position by position" means, which overloads they are, or whether accepting them is wrong.
  - "answers at the call's instantiation" (unclear wording).
  - "Answer 9's rule as `e2f1aa7e8` builds it compares return types" (a record term): what Answer 9 is, and why it matters that both return `String`.
  - "row 159's fix" (a reference without content): walk's answer is unmeasured, so it is unknown which path is right today.
  - "answers `tag` for `fixed`" (unclear wording): I read it as "prints tag where fixed is expected".
  - The class "design limit (checker)" against notes whose cause is in `OverloadSet` (wording and class disagree).

## Row 538

- **Defect:** A generic declaration is reached only by run-time dispatch, from a call that resolved statically to the plain declaration beside it. The compiled path instantiates the generic declaration at the value's own type. The specification instead fixes the parameter at its bound, under the call's static return type. Example: `wrap[\T extends Number\](x: T, k: Key): Box[\T\]` sits beside `wrap(x: Any, k: Any): Any`. The call is `wrap(z, k)`, with `z: ZZ32` and `k: Any` holding a `Key`. The run builds `Box⟦ZZ32⟧` and dies casting it to `Box⟦T⟧`, where the specification gives `Box[\Number\]`.
- **Where:** The compiled path, in the code generator. `OverloadSet.java:1484` reads the static arguments from the value's descriptor, and `:2048` gets no static return type, both at c124c6b65. The static checker already builds the paper's rule (`Formula.solveToBounds`, file not given).
- **Reproduce:** `compiler_tests/XXXGenericInstanceUnfixed.test`.
- **Status:** A confirmed gap, to be fixed with PLAN phase 5 (as in rows 496 and 699). The specification's rule is settled in `appendices/changes.tex`.
- **Could not resolve:**
  - "Where the value fixes the parameter at an invariant position (rows 496, 499) the two rules agree" (unclear wording): if the two rules agree there, it is unclear why rows 496 and 499 still fail. I take it that they fail for other reasons.
  - `Box⟦T⟧` (notation): the same as in row 496.
  - "the paper's rule" (unclear wording): which paper is not named.
  - "PLAN phase 5": as in row 496.

## Row 699

- **Defect:** This is the paper's `sort`/`merge` example, made invariant. `sort[\P\](x: Ltwo): Sorted[\P\]` sits beside `sort(x: Lst): Sorted[\A\]`. The generic one is reached only by dispatch, and its parameter `P` appears only in the return type. The call is `merge(sort(l1), sort(l2))`, with `l2: Lst` holding an `Ltwo`. It compiles, but the main class fails verification at load (`VerifyError: Bad return type`) before `run` prints. The dispatch method `sort(Lst)` returns the arm's uninstantiated `Sorted?P?` where its signature promises `Sorted[\A\]`.
- **Where:** The compiled path, in the code generator, at the dispatcher in `OverloadSet.java:2048` at c124c6b65 (the same cause as row 538).
- **Reproduce:** The pair `GenericInstanceReturnOnlyLink.test`, then `XXXGenericInstanceReturnOnly.test`, in one `junit.sh` call. The `XXX` file presumably checks `run_out_does_not_contain=REACHED`. Background is in `explorations/reviews/popl2019-examples.md`.
- **Status:** A confirmed gap, with the same fix as row 538.
- **Could not resolve:**
  - `Ltwo`, `Lst`, `A` (unclear wording): they are not defined. I guess `Ltwo` is a subtype of `Lst`, but whether `A` is a trait or a type parameter is not given.
  - "the bound `Any` under the call's static type" (unclear wording): the text gives `Sorted[\A\]`, so it is unclear how the bound `Any` relates to `A`.
  - `Sorted?P?` (notation the skill lacks): I read it as the template's placeholder name.
  - "POPL 2019 examples sorting" (unclear wording): I take it as a review of a paper under `Papers/`, page 11:7.

## Row 813

- **Defect:** A component imports `A` on demand (`import A.{...}`) and imports `pick` by name from `B` (`import B.{ pick }`), and both apis declare `pick(x: P)`. The compiled checker refuses it with "There are multiple declarations of pick". Only `B`'s `pick` should be visible, because the explicit import hides the on-demand one. Walk runs it and prints 3.
- **Where:** The compiled path. The checker's overloading check, `OverloadingChecker.scala:252-255` (`importsOnDemand`), at c124c6b65, removes only the names in `except`, not the names imported explicitly. Patching that alone moves the failure to the code generator ("apparently malformed overload set not rejected"), because the code generator's set still holds both. So the name binding (disambiguator) also needs the fix.
- **Reproduce:** `compiler_tests/XXXImportExplicitHidesOnDemand.test` (a compile refusal).
- **Status:** A confirmed gap, so build a fix. It spans the checker and the name binding, not the checker alone, which the class names.
- **Could not resolve:**
  - The claim's "reads a name imported by name from one api also on demand from another" (wording): clear after the example, but not alone.
  - `P` (wording): the parameter type is not defined. I assume one type, shared by both apis.

## Row 814

- **Defect:** `except` does not exclude an infix operator. With `import A.{...} except { opr - }`, `Pm1 - Pm1` still runs `A`'s `-`. If the component declares its own `-` at `A`'s parameter types, the checker accepts the component but the code generator stops with "apparently malformed overload set not rejected". An identifier listed in `except` is excluded correctly on both paths. `except { opr BIG + }` also works (row 41).
- **Where:** The checker's `importsOnDemand` (`OverloadingChecker.scala:252-255`) drops the operator by its text. The disambiguator (`TopLevelEnv.java:726-733`, `:956-958`) drops a listed name by node equality, which an operator apparently fails. The claim says both paths are affected.
- **Reproduce:** `compiler_tests/XXXImportExceptOperator.test`.
- **Status:** A confirmed gap, so build a fix, probably in the disambiguator's comparison.
- **Could not resolve:**
  - "on both paths" against "Walk runs the component with its own `-`, 2" (the wording contradicts itself): if walk runs the component's own `-`, then walk seems to honour the `except`. So I cannot tell what fails on walk.
  - "leaves the listed `-` out by its text" (unclear wording): if the checker leaves it out, why does the code generator's set hold both? I read it as "the checker drops it, but the disambiguator does not". The row does not say which comparison fails for an operator.
  - `Pm1` (wording): the type is not defined.

## Row 42

- **Defect:** In an import's `except` clause, `opr SUM` is a syntax error and `opr ∑` parses, but only `opr BIG +` actually excludes the big operator. The grammar's import names take `opr (BIG)? (Encloser / Op)`, with no `SUM` alternative, though declarations accept `SUM` as `BIG +`.
- **Where:** The parser, shared by both paths: `Identifier.rats:95-104` at c124c6b65, against `Parameter.rats:129`.
- **Reproduce:** There is no test. Use the probes `explorations/sum-probes/p20_except_spelling_sum.fss` and `explorations/fable-review-probes/RvwExceptSigma.fss` from the parent of `e879b6a44`.
- **Status:** A confirmed gap. A fix in the grammar is to build, and the workaround is `except { opr BIG + }`.
- **Could not resolve:**
  - "`except { opr ∑ }` parses" (unclear wording): does it then exclude the operator, fail later, or do nothing? "Only `BIG +` actually works" implies it does nothing, but the row does not say so.
  - "Found by: ours, astra, blinded, review" (history terms): harmless.
  - The specification is cited from `Specification-1.0-frozen/` by line, section "Components". The skill explains this (a macro section).

## Row 13

- **Defect:** Import aliasing does not work. The specification's form `import A.{x as y}` fails to parse ("Missing comma."). The grammar's own form `x => y` parses, but the alias is not bound: after `import SkVarApi.{counter => ctr}`, a read or an assignment of `ctr` fails on both paths with "Variable ctr is not defined.", at 1 and at 4 threads.
- **Where:** The parser, `Compilation.rats:308-336` (`AliasedSimpleName`) at c124c6b65, which takes `=>` instead of `as`. The binding fails on both paths.
- **Reproduce:** There is no test. Use the probes `explorations/alias-units-probes/p10_import_as.fss` and `p12_import_arrow.fss`, and `explorations/compile-ladder/rung-export-var/probes/skeptic/SkAlias.fss` with its saved output, from the parent of `e879b6a44`.
- **Status:** A confirmed gap, so build a fix: the `as` spelling in the parser, and the binding.
- **Could not resolve:**
  - "the `=>` form with `Seq is undefined.`" (unclear wording): this error does not match "binds nothing" or the later "Variable ctr is not defined". It may be specific to the probe, or a third failure.
  - "its capture beside it" (wording): I read it as the probe's saved output file.
  - The class is "implementation gap (parser)", but the binding failure is past the parser, so the area is unclear.
