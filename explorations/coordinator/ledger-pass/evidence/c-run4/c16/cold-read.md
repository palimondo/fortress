# Cold read: c-run4/c16

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and lookups in `references/` (`records.md`, `compiler.md`, `interpreter.md`, `tests-writing.md`, `build-and-caches.md`, `library.md`). The row template that defines the seven status words is in the ledger, which I may not read; I take `NEGATIVE-VERIFIED` as "the gap is confirmed" and `CONTESTED` as "two sources disagree and no decision settles it" (`records.md`, `SKILL.md` "When to explore").

## Row 365

- **Defect:** A function without a declared return type, whose body is an `if` whose branches give two different object types, compiles, but its class fails JVM verification at load (`VerifyError: Bad return type`). The method descriptor says it returns the union class `Union⟦Pt,Box⟧`, while the code returns the joined value as a plain `java/lang/Object` with no cast.
- **Where:** compiled path only (walk runs it). The code generator: the descriptor comes from `NamingCzar.jvmTypeDesc` / `forUnionType` (`NamingCzar.java:1444-1447`); the place that emits the uncast `areturn` is not located.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXUnionReturnRungS.test`, or `pick(b: Boolean) = if b then Box(1) else Pt(2) end`. Declaring `: Object` makes it print `Box`, `Pt`. Probes `SkUnionReturn.fss` / `SkUnionReturnDeclared.fss` are recoverable with `git show ab067d9b6^:explorations/compile-ladder/rung-default-rendering/probes/skeptic/<name>` (the form `library.md` shows).
- **Status:** a confirmed gap, deferred with an `XXX` test; a worker may build a fix in the code generator (first find where the return is emitted), and promote the `XXX` test.
- **Could not resolve:** "siblings: 367, 695" names related rows without saying how they relate (read them with `ledger:`). "full text: history, row 365" I read as "the earlier text is in `fortress-gap-ledger-history.md`"; wording. "climb batch 3 rung S's skeptic" is provenance only. Otherwise clear.

## Row 732

- **Defect:** An object that extends two traits, where the second (not first) is a trait of an imported api that declares a method whose body is given in that api's component, gets no forwarding method for the inherited body. Calling the method on the object dies with `AbstractMethodError` ('Receiver class ...$O does not define or inherit an implementation of ... pick?0()'). With the api's trait first in `extends`, it works.
- **Where:** compiled path only (walk runs both orders). Code generator, `CodeGen.dumpMethodChaining` (`CodeGen.java:968`), which forwards only declarations that have a body; the api's declaration of the method has none.
- **Reproduce:** no test. Write the probe from the notes: api `Q1ApiB` with `trait B pick(self): String end`, its component giving the body `"b"`; a program with `trait C other(self): String = "c" end`, `object O extends { C, B } end`, calling `pick(O)`; compile and run. Swap to `extends { B, C }` to see `b`.
- **Status:** confirmed gap; build a fix (first write the `XXX` run-time pair, `tests-writing.md`).
- **Could not resolve:** "forwarder" is a code-generator term the skill does not define; I read it as a method generated in the object's class that calls the trait's default body. "an api's declarations have none in its index": "index" could mean the compiler's api index structure or something else; wording. Why order matters (first trait gets it, others not) is not said, so the fix's shape is left to the worker; that is a missing explanation, not a blocker.

## Row 849

- **Defect:** In a compile, a declaration with a varargs parameter whose body is `builtinPrimitive("…nativeHelpers…")` is not rewritten into a helper call, so the compile stops with 'Variable builtinPrimitive is not defined.' (e.g. `sumOf(a:ZZ32...):ZZ32` bound to `simpleIntArith.intOverflowingAdd`). In the count and distance stages over the one library, the body instead stays an unchecked call of `builtinPrimitive` (matches `compiler.md`, "Natives").
- **Where:** compiled path. `BuiltinPrimitiveRewriter.fn` (`BuiltinPrimitiveRewriter.java:117`), whose class comment (`:30-31`) says it leaves such declarations alone; against `LibraryBuiltin/FortressBuiltin.fsi:14-29`, whose comment says every such body is rewritten. Class says "checker", code is the rewriter.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXNativeHelperVarargsCompiled.test`.
- **Status:** CONTESTED: the two comments disagree. Fix is one of two (rewrite the varargs body, or refuse it with a clear message), so a worker should not build either; wait on the curator's decision. Nothing in the one library binds a varargs declaration, so it blocks nothing now.
- **Could not resolve:** "as P-58 does": P-58 is a POSITIONS entry, i.e. a curator decision, that the row says agrees with the revised comment; yet the row then says "no decision says which holds". These read two ways (P-58 settles it for rewriting, or P-58 is too general to cover varargs); unclear wording, and it decides whether the row is still contested. "the revised comment": revised by whom (team or revival) is not said. Class "deliberate (checker)": "deliberate" fits the rewriter's comment, but the area "checker" does not match the cited rewriter, which `compiler.md` places at the parse (row 865 calls the same rewriter "parser"); unclear wording.

## Row 865

- **Defect:** In a compile, a `builtinPrimitive` helper binding in a local function (declared inside a block) or in a method of an object expression is not rewritten into a helper call, so the compile stops 'Variable builtinPrimitive is not defined.'. Walk runs it (`g(4)` gives -4); declared at top level, the same `g` compiles and prints -4.
- **Where:** compiled path. `BuiltinPrimitiveRewriter.rewrite` (`BuiltinPrimitiveRewriter.java:59`) and `decl` (`:75-87`) visit only a component's declarations and its traits' and objects' members, never declarations local to a body.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXNativeHelperLocalFunctionCompiled.test`: `g(x: ZZ32): ZZ32` bound to `simpleIntArith.intNeg` inside a block. The object-expression case has no test named.
- **Status:** confirmed gap, with a clear fix: make the rewriter descend into bodies. No library binding is local, so it does not block the switch-over. Build the fix; promote the `XXX` test.
- **Could not resolve:** "siblings: 849, 884" (how 884 relates is not said). Otherwise clear.

## Row 886

- **Defect:** In a compile, the rewriter chooses a transfer helper by a type's simple name only, so a program that declares its own trait `Char` gets the library's character transfer, and its own trait `UnsignedLong` gets the `NN64` argument transfer; the checker then refuses the binding ('Character->ZZ32 is not applicable to an argument of type Char.'; 'NN64->ZZ64 is not applicable ...').
- **Where:** compiled path. `BuiltinPrimitiveRewriter.simpleName` (`:169-173`) and `transfer` (`:186-188` for `Char`/`Character`, `:189-190` for `UnsignedLong`); the transfer helpers are those of `compiler.md`, "Natives".
- **Reproduce:** `ProjectFortress/compiler_tests/XXXNativeHelperOwnCharCompiled.test` (`code(c: Char): ZZ32` at `simpleIntArith.intNeg`) and `XXXNativeHelperOwnUnsignedLongCompiled.test` (`code(u: UnsignedLong): ZZ64` at `simpleLongArith.longNeg`).
- **Status:** unclear. The status says a confirmed gap, but the notes say "A refusal is right: no Java type carries the program's type." So the binding should be refused anyway; the gap seems to be only that the refusal comes through the wrong transfer and so a misleading message. Whether to build a fix (match the type's full name, refuse with a correct message) or leave it is not said.
- **Could not resolve:** "the checker refuses the binding by the transfer": I read it as "because of the inserted transfer helper"; wording. What the defect to fix is, given that the refusal is right (unclear wording, see Status). "A program cannot name its own `NN32` on the compiled path, nor `Char` under walk": a further limit, or the reason for this row? Not said whether those are separate gaps or tracked elsewhere; unclear wording. "siblings: 885" unexplained.

## Row 288

- **Defect:** A program that imports a DSL grammar cannot be compiled. A grammar api must `import FortressSyntax`, which imports `FortressAst`, which imports `FortressLibrary` (the interpreter's library), not the compiler's prelude; so the compile stops at DISAMBIGUATE with 1342 errors before the GRAMMAR phase runs. The grammar machinery itself exists on both paths (`GraphRepository.java:815-823`, `PhaseOrder.java:137-147`).
- **Where:** compiled path; `Library/FortressSyntax.fsi:14`, `Library/FortressAst.fsi:6`; the prelude list in `WellKnownNames.java:116-129`.
- **Reproduce:** no test. Compile any program that imports a grammar; `import FortressSyntax.{Expression}` alone gives the same 1342 errors. Probes in `explorations/perf-probes/grammar-compile/`, recoverable from `fc89ee7a5^`.
- **Status:** confirmed gap, no workaround. A fix needs compiler-world versions of `FortressAst`/`FortressSyntax`, and the names of `Library/List.fsi` that the prelude lacks (row 71), so it is large and depends on row 71. Leave it unless a brief takes it on.
- **Could not resolve:** "the interpreter's prelude": the skill calls this the interpreter's library (or the one library), and "prelude" is the compiler's three files; I read it as `FortressLibrary`; wording. Whether the switch-over (compiled path moving onto the one library) would close this row by itself is not said; that changes whether to fix now or wait. "a compiler-world `FortressAst`": I read it as copies written over the compiler's prelude, the "shims" of row 290; wording. "siblings: 71, 290, 884".

## Row 290

- **Defect:** A grammar template's expansion is not marked parenthesized unless the template text itself writes the outer parentheses, so under `fortress compile` a template used as a function argument, `println(m⦇ … ⦈)`, fails 'Argument to function must be parenthesized.'. `<[ 42 ]>`, `<[ (a) ]>`, `<[ (a) + (a) ]>` fail; `<[ ((a) + (a)) ]>` works and prints 42; extra parentheses at the use site do not help; binding the expansion to a variable compiles.
- **Where:** compiled path (walk does not type-check, so it does not see it). The template translator (file not named) loses `isParenthesized`; the checker raises it at `scala_src/typechecker/impls/Operators.scala:243`, reported at line 1 of the grammar api (row 213).
- **Reproduce:** no test, and only reachable behind row 288's shims: probe `explorations/perf-probes/grammar-compile/shim/MatrixC.fsi` from `fc89ee7a5^`. Workaround: every template wraps itself in parentheses.
- **Status:** confirmed gap; a fix belongs in the template translator, but it cannot be tested in the tree until row 288 is fixed. Wait on row 288.
- **Could not resolve:** "template" here means a grammar template (the `<[ … ]>` text a DSL rule expands to), not the generic template class of `SKILL.md`; two readings, resolved by context only; the `<[ ]>` and `m⦇ ⦈` syntax is a language concept the skill does not cover. "row 288's shims": not defined in row 288 itself; I read it as the probe's compiler-world `FortressAst`/`FortressSyntax`; wording. "The template translator": which class is not named; wording. "against the grammar api's line 1 (row 213)": I read it as a wrong error position tracked by row 213; wording.
