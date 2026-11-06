# Cold read: c-run3/c14 (rows 304, 624, 701, 867, 25, 307, 764, 352, 781)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the skill's `references/` only (not `revival-changes.md` or `sources.md`).

Terms shared by every row:

- `NEGATIVE-VERIFIED`: `records.md` lists it among the seven status words and says that "the row template (below) defines each", but the template lives in the ledger, which a cold reader may not open. I read it as "confirmed as an open gap", so a worker may build a fix. Unclear wording in the skill: the word is not defined anywhere a worker can read without the ledger.
- `siblings: N, M`: read as "related rows". Nothing says how they relate (same construct, same cause, same fix?), and many siblings are not among the rows here (604, 650, 865, 150, 761, 763, 118). Unclear wording.
- `full text: history, row N`: read as "the row's earlier text is in `explorations/fortress-gap-ledger-history.md`" (`records.md`). Resolvable.
- The "Found by" cells (`kernels probe`, `climb batch 10 rung C and its first skeptic`, `territory map`, `merged-diff review's repair`) are provenance only. A worker needs none of it to act, so I do not count them as blockers.

## Row 304

- **Defect:** the code generator compiles local functions as closures, but refuses three forms that the specification allows: a local function with its own static parameters, two local functions of one name in one block (overloading), and a local function with the `atomic` modifier. The checker accepts each program first.
- **Where:** the compiled path only, in `CodeGen.forLetFn` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3588-3592` at `d96242f0a`). Walk runs all three. `compiler.md`, "What the compiled path cannot compile yet", says the same.
- **Reproduce:** run `ProjectFortress/compiler_tests/XXXLocalFunctionGenericCompiled.test`, `XXXLocalFunctionOverloadedCompiled.test` and `XXXLocalFunctionAtomicCompiled.test` through the harness. Each is a code-generator wall test that expects one of the three quoted messages.
- **Status:** open; build a fix in `forLetFn`, and promote the three `XXX` tests. Until then, lift the function to component level or rename each overload. The related refusals (varargs, row 624; helper binding, row 865; contract, row 701) are separate rows.
- **Could not resolve:** "a helper binding (row 865)": `compiler.md` line 81 explains it (a local function whose body is `builtinPrimitive(...)`), so resolvable. Otherwise clear.

## Row 624

- **Defect:** the code generator cannot compile a function or method that has a varargs parameter (`x: T...`). A top-level function stops with "Can't compile VarArgs yet"; a trait method stops with `OptionUnwrapException`. A call of a varargs function also stops the compile of the caller.
- **Where:** the compiled path. `NamingCzar` throws the message (`NamingCzar.java:1308`, `:1318`, `:1458`, `:1569` at `c124c6b65`); `CodeGen.forLetFn` throws it for a local function (`CodeGen.java:3597`); for a method, `NamingCzar.jvmSignatureFor` unwraps each parameter's type (`NamingCzar.java:945`). For a caller, `CodeGen.resolveMethodAndSignature`. Walk runs it, binding the parameter to an `ImmutableArray1`.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXVarargsCodeGeneration.test` for a top-level function; `XXXVarargsMethodCodeGeneration` for the method (`trait Tagger`'s `tag(x: String, rest: ZZ32...)`, which walk runs and prints `abc`). For the caller: compiling `test stringifyChars()` in `Library/String.fss:337`.
- **Status:** open; build a fix in `NamingCzar` and the code generator. It matters for the switch-over, since the one library has such a caller.
- **Could not resolve:**
  - "`XXXVarargsMethodCodeGeneration`" has no `.test` suffix and no folder: I cannot tell if it is a gated test file, a component, or a probe. Unclear wording.
  - "A varargs call stops its caller too: ... `test stringifyChars()` ... calling `assert`, from `CodeGen.resolveMethodAndSignature`": I read it as "`assert` is a varargs function, and the compile of `stringifyChars` stops in `resolveMethodAndSignature`", but the row does not say that `assert` is varargs, nor what the caller's failure message is. Unclear wording.
  - Sibling 604 is not explained. Unclear wording.

## Row 701

- **Defect:** the code generator refuses a function or method declaration that has a contract (`requires`, `ensures`, `invariant`), with "Don't know how to compile this kind of FnDecl". Walk evaluates the contract; a failed `requires` raises `CallerViolation`.
- **Where:** compiled path, `CodeGen.forFnDecl`, by the guard `header.getContract().isNone()` (`CodeGen.java:3023` at `c124c6b65`). The object and trait guards (`:4384`, `:5303`) are never reached, because the disambiguator drops those contracts (row 781).
- **Reproduce:** `ProjectFortress/compiler_tests/XXXFunctionContractCodeGeneration.test` through the harness, a wall test.
- **Status:** open; build a fix in `forFnDecl` (compile the contract checks). Fixing the object and trait cases waits on row 781 first.
- **Could not resolve:**
  - The `where`-clause sentence: "A declaration whose own header carries a `where` clause compiles, and nothing is emitted for its constraints, the checker's (...)". "the checker's" has no noun: I read it as "the constraints are enforced only by the checker", but it could also mean the checker's tests are named in the parentheses. Unclear wording. It also seems off-topic for a contract row; it reads as a note that `where` clauses are not part of this refusal.
  - "F-181": a FACTS entry, whose content a cold reader cannot see. Unclear wording (no title words quoted, as `records.md` asks).
  - The specification cell drops the `Specification/` prefix (`basic/functions.tex`), unlike rows 304 and 624. Resolvable, minor.

## Row 867

- **Defect:** on the compiled path, a call of a function or method whose own `where` clause introduces a new static variable (here `[\nat n\]`) compiles and links, but dies at run time with `NoClassDefFoundError` ("wrong name"). Example: `g(O, P)` for `g[\U, V\](u: U, v: V): String where [\nat n\]{U extends {X[\n\]}, V extends {Y[\n\]}}`.
- **Where:** compiled path, the code generator and the class loader. The call names the instance by all the checker's static arguments (`O`, `P` and the inferred `n` = `1`); the template class carries only the declaration's own static parameters (`FnNameInfo.java:99` at `c124c6b65`), so the loader makes a class named at `O`, `P` only, and the names disagree. A method, `Q.m(O)` in `object Q`, fails the same way.
- **Reproduce:** the run-time pair `ProjectFortress/compiler_tests/WhereVariableCallCompiledLink.test` then `XXXWhereVariableCallCompiled.test`, in one `junit.sh` call (`tests-writing.md`). `compiler.md` also points to it.
- **Status:** open, no workaround; build a fix (either drop the `where` variables from the instance name or carry them in the template).
- **Could not resolve:**
  - "Walk runs the function, 'OP'; the method, row 868.": I read it as "walk prints `OP` for the function; what walk does with the method is row 868", which suggests walk fails on the method, but the row does not say so. Unclear wording.
  - "names the class it makes at `O` and `P`": understood only after reading twice ("names the class after `O` and `P`"). Clear enough.

## Row 25

- **Defect:** this row records a limit of the design, not a bug: a `nat` static argument must be static, so it cannot be a run-time value. `vector[\RR64,n\](1.0)` with `n` a variable reports `n is undefined.`, because a static argument is looked up among types, not variables. The intended escape is `reflect(n)`, which gives a `NatParam` whose `N[\n\]` binds `n` when it is passed to a generic's `N[\n\]` parameter, as `array[\E\](x) = __arr1(__thrower[\E\], reflect(x))` does (`Library/FortressLibrary.fss:2259`).
- **Where:** the specification (`trait-parameters.tex`, "Nat and Int Parameters"); `ProjectFortress/LibraryBuiltin/NatReflect.fsi:22-31` and `NatReflect.fss`. On the compiled path the `reflect` pattern type checks (`compiler_tests/NatOpenChecker`) but does not run (row 307).
- **Reproduce:** no reproducer. The probes `explorations/libvector-probes/p09_runtime_size.fss` and `p22_runtime_sized.fss` are gone; they can be printed from the parent of `e879b6a44` (`git show e879b6a44^:...`).
- **Status:** leave it: the specification makes it so. Use `reflect`. Work on the compiled run belongs to row 307.
- **Could not resolve:**
  - Which path prints `n is undefined.` (walk, the compiled checker, or both) is not said. Unclear wording.
  - "`__refl'` is top-level, generic local functions being incomplete (`NatReflect.fss:33-35`); `:38-40` ask to build it in.": I read it as "the team wrote the helper `__refl'` at top level because generic local functions were not finished (row 304), and a comment at lines 38-40 asks to make it a built-in". "build it in" could also mean "inline it into `reflect`". Unclear wording.
  - Class "design limit (specification)" with status `NEGATIVE-VERIFIED`: I cannot tell from the skill whether a design-limit row is ever meant to be fixed. Unclear wording (the status words are undefined to a cold reader).

## Row 307

- **Defect:** two defects in one row. (a) The compiled checker refuses outright to infer a static parameter of kind `bool`, `dim` or `unit` at a call; `nat` and `int` ones are inferred. It throws at the declaration's parameter, not at the call, and the throw hides the component's other errors. (b) A size made from a run-time number (the `reflect` pattern of row 25) does not run compiled: `ProjectFortress/tests/NatReflectTest.fss` stops at class load with 'Unable to read serialized data for NatReflect$N??'.
- **Where:** (a) the compiled checker, `makeInferenceArg` in `STypesUtil.scala:585-606` at `63e420a33`. (b) the compiled run time's class loader (at `a1a75716a`). Also: a trait whose `comprises` clause binds a `where`-clause size compiles, but a call that "opens" a value to that size fails the JVM's verification (`VerifyError`).
- **Reproduce:** (a) `ProjectFortress/compiler_tests/XXXNatBoolChecker.test`. (b) compile and run `NatReflectTest.fss`; the `VerifyError` case is the pair `NatOpenRunLink.test` then `XXXNatOpenRun.test` in one `junit.sh` call.
- **Status:** open; build fixes, (a) in the checker's inference, (b) in the class loader and the code generator.
- **Could not resolve:**
  - The class says `implementation gap (checker)`, but part (b) and the `VerifyError` are failures of the class loader and code generator. Unclear wording: a worker may not know if (b) is meant to be fixed under this row.
  - "Walk does not unify a `bool` one": I cannot tell what walk then does (the call fails? the parameter takes its bound, or `Bottom`?). Unclear wording.
  - "a call that opens its value to the size": the meaning of "open" (bind the `where` size to a fresh size at the call, as `compiler.md` line 120 describes) I could only infer. Language concept that the skill names only indirectly.
  - `dim` and `unit` parameters: the skill says dimensions and units are not built, so I cannot tell if inferring them is in scope. Unclear wording.

## Row 764

- **Defect:** the compiled checker crashes, 'ClassCastException: TraitType cannot be cast to BoolExpr', on a call that writes a method's own `bool` static argument: `O.unflag[\true\](Flag[\true\](7))` for `unflag[\bool b\](f: Flag[\b\])` in `object O`. The same written argument on a generic top-level function passes (row 763).
- **Where:** compiled path, the checker. `Functionals.checkExprFunctionals` (`scala_src/typechecker/impls/Functionals.scala:1152`) calls `FnNameInfo.normalizedSchema` (`FnNameInfo.java:185-206` at `c124c6b65`), which replaces each static parameter by what `boundsFor` returns; for a `bool` parameter that is a type (`FnNameInfo.java:168-182`), so the `BoolRef` `b` in `Flag[\b\]` becomes a `TraitType` (`StaticTypeReplacer.java:121-131`), and the cast fails.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXBoolStaticArgMethodWritten.test` through the harness.
- **Status:** open; build a fix in `boundsFor` / `normalizedSchema` so a `bool` parameter is replaced by a `bool` value.
- **Could not resolve:**
  - "F-36": a FACTS entry with no title words quoted. Unclear wording.
  - What walk does with this program is not said (`SKILL.md` asks each row to say which paths show the defect). Unclear wording.
  - "a type argument for a `bool` parameter": read as "`boundsFor` gives a type argument even for a `bool` parameter". Resolvable on a second read.

## Row 352

- **Defect:** neither path checks `throws` clauses statically. A function that throws a checked exception not listed in its `throws` clause, and a caller that neither lists nor catches it, are both accepted, on walk and compiled.
- **Where:** the check is missing from the compiled checker (`scala_src/typechecker`), where the row says it belongs. The code generator's `canCompile` has the clause test commented out since 2011 (`CodeGen.java:3022` at `c124c6b65`); its object and trait tests (`:4383`, `:5302`) are unreachable because the disambiguator drops those clauses (row 781).
- **Reproduce:** no reproducer: the harness cannot express "a static error that should appear and does not" as an expected failure. The probe `SkepThrowsClause.fss` (an `undeclaredThrower(): ZZ32 = throw TryAtomicFailure` beside a declared one, callers undeclared) compiled with rc=0 and printed `CAUGHT` on both paths; it is gone.
- **Status:** open; build the check in the checker. The test would be a plain (non-`XXX`) test written with the fix, since no expected-failure form exists.
- **Could not resolve:**
  - "gone": the probe is deleted, but unlike row 25 the row gives no commit to print it from. Unclear wording.
  - Whether the checked/unchecked split of exceptions is built (which exceptions count as "checked"): a language concept that the skill does not cover; the specification section is cited.
  - "both" in the claim ("are accepted by both"): read as "both paths". Resolvable.

## Row 781

- **Defect:** the disambiguator, which both paths run, throws away every trait's and object's `throws` clause and contract. So neither path checks or evaluates them: for `object V(x: ZZ32) requires { x > 0 }`, `V(-1)` is made under walk and compiled, and an ill-typed `requires { 1 + "a" }` type checks. A function keeps both.
- **Where:** both paths, the shared disambiguator: `ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:112-113` and `:137-138` at `53ee5dc29` rebuild the header with `Option.<List<Type>>none()` and `Option.<Contract>none()`, as the team's code did (`a874948ac`, `:100-101`, `:125-126`). Consequences: the checker's contract check in `Decls.scala:139-142` never runs, and row 701's code-generator refusal of an object or trait contract is never reached.
- **Reproduce:** no reproducer file, but the notes give commands: `fortress disambiguate` of `object V(x: String) requires { x.nothere() }` unparses with no contract; `fortress typecheck` of it exits 0; the same for `throws { NoSuchThing }`; `v = V(-1); println("made")` prints `made` under walk and compiled.
- **Status:** open; build a fix in `TypeDisambiguator` (keep the clauses). A fix exposes rows 701 and 352 on objects and traits, so expect the code generator to refuse a contract until row 701 is fixed.
- **Could not resolve:**
  - Sibling 118 is not explained. Unclear wording.
  - The team's own code dropped the clauses too, yet the class is `implementation gap`: I read that as "the specification wins over the team's code", but the row does not say that no curator decision covers it. Unclear wording, minor.
  - "Reproducer: none" although the notes give runnable commands: a worker can reproduce it, but has no test to promote; the fix must write one. Clear enough.
