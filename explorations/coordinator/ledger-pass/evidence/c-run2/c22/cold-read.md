# Cold read, c22

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its references `records.md`, `tests-writing.md`, `interpreter.md`, `compiler.md` (term lookups only).

## Row 570

- **Defect:** The compiled checker's overloading check runs its per-provider rule (the Meet Rule for functional methods, checked once for each type that brings a set of methods together) only over the component's named traits and objects. An object expression is never visited. So `object extends { A, B } end`, where `A` and `B` each declare `pick(self)`, has two `pick` methods whose meet `A AND B` no declaration covers, and the checker accepts it.
- **Where:** compiled path, the static checker: `scala_src/typechecker/OverloadingChecker.scala:361-362` (`typeConses`). Walk is right: it refuses the pair at load ("Invalid overloading of pick"), as `tests/FunctionalMethodMeetObjectExpressionWalk` shows.
- **Reproduce:** run the `XXX` compile test `compiler_tests/XXXFunctionalMethodMeetObjectExpression` (its `.test` keys assert that code generation stops with `CompilerError: emitDesc of type AND(A,B) failed`). So no compiled program ever runs with the ambiguity; the checker's silence is visible only by that later crash.
- **Status:** open defect, verified. A fix in the checker can be built (check object expressions per provider, or lift them to named objects first, as the team planned at `AbstractMethodChecker.scala:217`). Its test cannot become a run test until row 375 (code generation of object expressions) is fixed.
- **Could not resolve:**
  - "per provider": not defined in the skill; I read it as "for each trait or object that provides the methods", from the code reference. Unclear wording, a checker concept I lack.
  - "pick(self)": whether the two declarations are abstract or have bodies is not said; the claim needs them to be the pair the object expression inherits. Minor unclear wording.
  - The reproducer cell names the `.fss`; "the reproducer's keys" live in a `.test` file the row does not name. Minor.

## Row 416

- **Defect:** Walk's load-time overloading check has no rule that two instantiations of one generic type exclude each other (no type may extend both, by the exclusion rule in `SKILL.md`). It refuses `g(b: Tg[\3\])` beside `g(b: Tg[\4\])` with "first parameters ... are unrelated", and likewise for type static arguments and for overloads on two traits that extend `Tg[\3\]` and `Tg[\4\]`. The compiled path accepts the pair and prints 3 and 4.
- **Where:** walk: `interpreter/evaluator/values/OverloadedFunction.java:589-604` raises it; `FType.excludesOther` (`FType.java:197-210`) lacks a case for two instances of one generic type. `interpreter.md` lists the departure too.
- **Reproduce:** `tests/XXXNatSizeExclusionWalk.fss` under walk. Library sign of it: `Library/RangeInternals.fss:125-172` names its bounds checks `checkSelection`, `checkSelection2D`, `checkSelection3D` instead of overloading one name over `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]`.
- **Status:** open, verified; build a fix in `FType.excludesOther`. Once fixed, the library's three names could be merged.
- **Could not resolve:**
  - "the type twin": I guess it means the same pair with a type static argument instead of a size, but it could also mean a twin test file. Unclear wording.
  - The bold markup inside the claim cell: no meaning I could find.
  - "Generic declarations that differ only in an element type fail the Meet Rule instead (F-155). So the library's bounds check is named by rank": the "So" makes the library naming follow from F-155, yet the next clause attributes it to this row. Which defect forced the three names, and on which path F-155's failure occurs, is unclear. Unclear wording; F-155 needs a lookup.
  - "by rank": I read it as the number of dimensions. Unclear but resolvable.

## Row 697

- **Defect:** Walk's parameter-by-parameter check counts two parameter lists as excluding whenever every position where they differ holds an object type, even if one object extends the other's type. So `f(x: B): C` beside `f(x: C): B`, `object C extends B`, loads: `f(x: C)` is more specific, its return type `B` does not fit `C`, and the Return Type (Subtype) Rule should refuse it, but walk skips that check. The checker refuses it.
- **Where:** walk: `interpreter/evaluator/values/OverloadedFunction.java:511`, `distinct |= unequal && (allObjInstance1 || allObjInstance2)`; the exception for instances of one generic object at `:439-444`.
- **Reproduce:** `tests/XXXReturnRuleObjectParamWalk.fss` under walk; walk prints `C`. A second example is slide 4 of the POPL 2019 talk, `m1(x: C, y: C): B` beside `m1(x: C, y: B): C`. With `trait C` and an object extending it, walk refuses as it should.
- **Status:** open, verified; build a fix, but not by removing the shortcut alone: that makes walk refuse library pairs whose more specific declaration has no written return type (row 785). Fix 785 first or together.
- **Could not resolve:**
  - "Walk prints `C`": which call, and whether `C` is the object's printed value or a label, is not said. Unclear wording.
  - "Reproducer: the talk's slide 4 (`reviews/popl2019-examples.md`)": a second reproducer inside the notes, and the path has no root (top-level `reviews/` or under `explorations/`?). Unclear wording.
  - "not for instances of one generic object that may coincide, `:439-444`": I read it as "the shortcut does not apply to those", but it could also say the code at `:439-444` handles them separately. Two readings.
  - Specification cell `advanced/overloading.tex` lacks the `Specification/` prefix; resolvable.

## Row 785

- **Defect:** Walk's load check refuses a valid pair when the more specific declaration has no written return type: `f(x: C) = 1` beside `f(x: B): ZZ32 = 2`, `trait C extends B`, fails with 'the second result is not a subtype of the first'. Walk reads the unwritten result as `BOTTOM`. With `object C` the pair loads only because row 697's shortcut skips the check.
- **Where:** walk: `interpreter/evaluator/values/OverloadedFunction.java:519-527` (the Subtype Rule branch of `completeOverloadingCheck`), message at `:654`. The checker infers the body's type and accepts.
- **Reproduce:** no reproducer file; write the two-line program above with `trait C extends B` and load it under walk. Library pairs that would be refused once 697's shortcut is removed: `opr =` of `Nothing` and `NotUnique` (`Library/FortressLibrary.fss:1690`, `:1737`), `BOXPLUS` in `Library/Pairs.fss:85-91`, `OPLUS` in `tests/FileConversion.fss:76`.
- **Status:** open, verified; build a fix (read the inferred or the body's type instead of `BOTTOM`). It must land before or with the fix of row 697. Workaround: write the return type.
- **Could not resolve:**
  - "reads as `BOTTOM`" yet "finds it no subtype of the other's": `Bottom` is a subtype of every type, so as written the explanation contradicts itself. Either walk's `BOTTOM` here is not the bottom type, or the comparison is reversed. Unclear wording, possibly a concept I lack.
  - `coordinator/CLIMB-BATCH-19.md` section 4: the path has no root (likely `explorations/coordinator/`). Unclear.
  - Sibling 587: what it shares with this row is not said.

## Row 788

- **Defect:** Walk's load check treats an object type over a static parameter, `Box[\T\]`, as excluding `Box[\ZZ32\]`, though `Box[\T\]` is `Box[\ZZ32\]` at `T = ZZ32`. So `g[\T\](x: Box[\T\], y: ZZ32)` beside `g(x: Box[\ZZ32\], y: Any)`, `Box` an object, loads, and `g(Box[\ZZ32\], 3)` runs the generic one, though the two domains meet with no declaration covering the meet. The checker refuses it ('Invalid overloading of g').
- **Where:** walk: `interpreter/evaluator/types/FType.java:214` (`excludesOtherSimply`: two object types exclude) and `:236-245` (an object excludes every type not among its written supertypes); `OverloadedFunction.java:441`, `:470`, whose coincidence test and withdrawal cover only a pair of two generic declarations, not a generic beside a plain one. `interpreter.md` lists it.
- **Reproduce:** `tests/XXXGenericObjectInstanceBesidePlainWalk.fss` under walk. A variant through a bound is `XXXGenericBoundObjectOverlapWalk`, which the compiled checker refuses with 'Invalid overloading of h'.
- **Status:** open, verified; build a fix in walk (extend the coincidence test to a generic beside a plain declaration).
- **Could not resolve:**
  - "a pair of two own generics": I read it as two declarations each with its own static parameters. Unclear wording.
  - "Through a bound: `XXXGenericBoundObjectOverlapWalk`, 'Invalid overloading of h' compiled": no folder or extension, and "compiled" could mean the checker refuses it or that it compiles. I read the first. Two readings.

## Row 522

- **Defect:** Under walk, building a strided range raises `IntegerOverflow` when a difference of its bounds leaves `ZZ32`, though all its elements fit: `MAX:MIN:1` (empty), `MIN:MAX:3`, `0:MIN:MIN` (two elements). Fixed-width overflow must raise (a curator decision), so the library must avoid the overflowing intermediate.
- **Where:** the library, `Library/RangeInternals.fss`: `imposeStride` computes `dist = r-l` before testing the stride's sign (`:1045-1055`, `:1048`); `ScalarRange.check()` computes `(l-r) MOD str` (`:195-202`, `:199`), reached by `fullScalarRange` (`:1713-1719`) for every stride; and, by reading only, `StridedFullScalarRange.size` (`:1458-1460`).
- **Reproduce:** `tests/XXXStridedSpanWalk.fss` under walk.
- **Status:** open, verified; build the fix the notes give: test the sign before the distance, test divisibility without `l-r` (stride `MIN` included), split the size at zero, all within `ZZ32` and with the checked operators.
- **Could not resolve:**
  - `MAX` and `MIN`: I take them as the `ZZ32` bounds, but the row does not say how a program spells them. Unclear wording.
  - Whether the compiled path has the same defect: the claim says "under walk" only. Unclear scope.
  - "the checked operators": I read it as the operators that raise on overflow, against wrapping ones (`library.md`). Resolvable.

## Row 127

- **Defect:** The fields of an object expression are registered as top-level variables, so two object expressions that declare the same field name collide ('Top-level variable data is already declared.'), and so does such a field with a top-level variable of that name. The specification makes the field local to the object expression.
- **Where:** the disambiguator, `scala_src/disambiguator/ExprDisambiguator.scala`: the `SVarDecl` case (`:308-313`) adds to `topVars` any variable not inside a trait or object, and the `SObjectExpr` case (`:329-348`), unlike `SObjectDecl` (`:185-190`), never sets `inTraitOrObject`.
- **Reproduce:** no reproducer in the tree. Probes in the parent of `22ea0cd90`: `git show 22ea0cd90^:explorations/run-b2/probes/g4b_two_same.fss` (two object expressions, same field), `g4b_pollute.fss` (field against a top-level variable), `g4b_one.fss` (one alone works).
- **Status:** open, verified; build a fix (set `inTraitOrObject` in `SObjectExpr`). Workaround: distinct field names.
- **Could not resolve:**
  - Class "implementation gap (checker)", but the code is the disambiguator, which `compiler.md` says both paths run. Whether walk shows it too is not said. Unclear scope.
  - "Found by: run-b2": provenance only; no effect.

## Row 128

- **Defect:** A `getter` declared in an object expression that sits inside a `do` block is refused as a local function: 'getter cannot modify a local function, data'.
- **Where:** the parser's syntax checker, `parser_util/SyntaxChecker.java`: it sets `inBlock` for any `Block` (`:340-344`) and then refuses, on every `FnDecl`, modifiers outside `LocalFnMod` (`:285-288`), without reading its `inObject` flag.
- **Reproduce:** no reproducer in the tree. Probes in the parent of `22ea0cd90`: `explorations/run-b2/probes/g4b_capture.fss` fails; `g4b_capture2.fss` and `g4b_methodonly.fss` work.
- **Status:** open, verified; build a fix (consult `inObject` before the local-function check). Workaround: no `do` block, or plain methods.
- **Could not resolve:**
  - Which path: the parser runs for both, so I assume both; the row does not say. Minor.

## Row 375

- **Defect:** The code generator cannot compile an object expression: `o: Shape = object extends Shape end` stops `fortress compile` with `CompilerError: Can't compile ObjectExpr at file:line`. Walk runs the same program. Over two traits it stops earlier with `emitDesc of type AND(A,B) failed` (row 570).
- **Where:** compiled path, code generator: `compiler/codegen/CodeGen.java:1675-1677`, `defaultCase` (`throw sayWhat(x)`); `CodeGen` has no `forObjectExpr`. The desugaring that would lift object expressions into declarations runs only under `fortress desugar` (`Shell.getObjExprDesugaring()`, `Shell.java:262-264`, set at `:446`). `compiler.md` lists object expressions among the walls.
- **Reproduce:** `compiler_tests/XXXObjExprRungS.test` (a compile test asserting the exception).
- **Status:** open, verified; build a fix (a `forObjectExpr`, or run the lifting desugaring on the compile path). Its fix unblocks row 570's test. Rows 127 and 128 are separate object-expression defects in the disambiguator and the syntax checker.
- **Could not resolve:** nothing.

## Row 353

- **Defect:** The code generator cannot compile a `tryatomic` expression: `fortress compile` dies with `CompilerError: Can't compile TryAtomicExpr` (rc=1). Walk runs it: `tryatomic do 1 + 1 end` yields 2, and `tryatomic do n += 1 end` inside a `try` commits (`n=1`) at 1 and 4 threads.
- **Where:** compiled path, code generator: `CodeGen.java` has no `forTryAtomicExpr`, so the node falls through `NodeAbstractVisitor_void.forTryAtomicExpr` to `CodeGen.defaultCase` (`compiler/codegen/CodeGen.java:1675-1677`).
- **Reproduce:** `compiler_tests/XXXTryAtomicCodegenRungB.test`. Walk probes: `git show ab067d9b6^:explorations/compile-ladder/rung-tryatomic/probes/skeptic/SkepTryAtomicVal.fss` and `.../SkepTryAtomicState.fss`.
- **Status:** open, verified; build a fix (a `forTryAtomicExpr`). It is the only thing the team tests `tests/tryatomicTest.fss` and `tests/nestedTransactions3.fss` need to compile.
- **Could not resolve:**
  - "It is all ... wait on": I read it as "this is the only defect those two tests are blocked by on the compiled path", but it could mean they wait on it under walk too. Unclear wording, minor.
