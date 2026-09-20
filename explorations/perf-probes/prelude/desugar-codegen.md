<!-- What the compile path's DESUGAR and CODEGEN phases do with the interpreter's own library, measured 2026-09-20 by a delegated worker. The checker crashes on `nat` before desugaring, so it is stepped around, not fixed; §2 says which of the two ways worked and what its caveat is. Every number comes from a capture named in the Artifacts table; the driver, the shadow generator and the classifier are beside them under `desugar-codegen/`. Nothing tracked was modified; the runs used a private cache outside the repository and `ant` was not run. -->

# Desugaring and code generation on the interpreter's library

Nobody had ever run the compile path's later phases on `Library/FortressLibrary.fss`
and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`: the type checker stops
them first, with 93 errors and then a hard crash on the `nat`-kinded static
parameters the library is built out of (`coordinator/two-libraries.md` §3,
`perf-probes/prelude/REPORT.md` §2). This is the hole list from the other side of
that wall, classified, and nothing else. It recommends nothing.

**The short answer.** DESUGAR and OVERLOADREWRITE accept the whole 4,507-line
library with zero diagnostics. Code generation then refuses 313 declarations and
emits 275. Of the 313, **5 are on a declaration the checker had checked without
complaint**: four are the same `nat` gap, now on the code generator's side rather
than the checker's, and one is a method call on an intersection-typed receiver.
The other 308 are downstream of the checker — 112 on declarations it crashed on,
96 on declarations it reported errors on, 100 on the overload dispatch
declarations a later phase synthesizes. The code generator refuses nothing by
`canCompile` in this library, and `builtinPrimitive` produces no code-generation
failure at all.

---

## 1. Setup

Tree at `92d97379c`; the commits since `6af77573a` are documents only, no file
under `Library/` or `ProjectFortress/` changed. JDK 25.0.3,
`source experiment/env.sh` (`FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`),
`-XX:-OmitStackTraceInFastThrow` so that a `ClassCastException` carries its
frames, and `-Dfortress.caches` pointing at a scratch directory outside the
repository, wiped before every run (`ProjectProperties.java:283`).
`default_repository/` was not touched, `ant` was not run, and no tracked file was
modified. Every command is in `desugar-codegen/run-all.sh`.

The driver, `desugar-codegen/PhaseProbe.java`, is built only from public `Shell`
entry points, exactly as the earlier probe's `WorldFlip.java` is: it sets the
interpreter's prelude (`Shell.useInterpreterLibraries()`), then puts the compile
path's own desugaring settings back on top of it —
`setExtendsObjectPreDesugaring(true)` and `setCompiledExprDesugaring(true)`,
which `useInterpreterLibraries()` turns off (`Shell.java:371-386`) — and then
chooses a phase order. Running with the interpreter's desugaring settings instead
is a flag (`-interpdesugar`), and so is running the compiler's own prelude
(`-compilerlib`), which is the control.

## 2. The two methods, and which one produced the list

### 2.1 Method (1): leave TYPECHECK out of the phase order

`PhaseOrder` is a public enum and `Shell.setPhaseOrder` takes any array of it, so
the compiler's order minus TYPECHECK is one line in the driver.

Through PRETYPECHECKDESUGAR and INTEGERLITERALFOLDING the library passes with
`rc=0` and no diagnostics. **DESUGAR then refuses to run at all, and not for want
of type annotations**: `DesugarPhase.execute` reads `previous.typeCheckers()`
(`phases/DesugarPhase.java:43`), and `AnalyzeResult.typeCheckers()` throws
*"A compiler pass is trying to get access to the type chekcers when it should
not"* when that map is null, which it is unless `TypeCheckPhase` built it
(`AnalyzeResult.java:93`; capture `02-nocheck-desugar-refused.out`). The map is
passed on for exactly one thing, `CaseExprDesugarer` (`Desugarer.java:120-123`).
With a shadow `DesugarPhase` that hands it an empty map, **DESUGAR and
OVERLOADREWRITE both pass the whole library with zero errors**, `rc=0` in 15 s
(`03-nocheck-through-overloadrewrite.out`).

CODEGEN then fails.

### 2.2 The control that settles method (1)

`Library/CompilerLibrary.fss` — the compiler's *own* prelude, which compiles
green — was put through the same two orders.

| run | order | result |
|---|---|---|
| `04-control-compilerlib-full.out` | compiler's order, unchanged | 162 declarations emitted, component OK, `rc=0`, 40 s |
| `05-control-compilerlib-nocheck.out` | same, TYPECHECK removed | dies at `CompilerLibrary.fss:176:33`, `Can't compile Juxt`, `CodeGen.defaultCase:1670`, 4 s |

A juxtaposition is what the type checker resolves into a function application or
a method invocation; `CodeGen` has no `forJuxt`. So without the checker every
juxtaposition in any program is a code-generation hole, and a hole list taken
that way is a list of the checker's absence. Measured on the interpreter's
library with the code generator made tolerant per declaration
(`07-nocheck-codegen.out`): **482 failures**, of which 335 are missing type
annotations and 124 are a node the code generator has no visitor for, 120 of
them `Juxt`; **161 are on declarations that the checker, when it is allowed to
run, checks without complaint.**

Method (1) therefore produced no usable list. It is reported because it settles
the question the brief put first, and because the DESUGAR result above — the
whole library through desugaring and overload rewriting with zero diagnostics —
is only visible this way.

### 2.3 Method (2): TYPECHECK in the order, its failures caught per declaration

This produced the list. Five shadow classes, generated from the tracked sources
by a textual patch (`desugar-codegen/shadow-patch.py`) and put first on the
classpath; the tracked files are untouched. All the probe behaviour is behind
`-Dprobe.tolerant=true`, so the same classes behave like the originals without
it.

* `StaticChecker` checks the component **one top-level declaration at a time**.
  This is the same traversal split up: the `SComponent` case of
  `impls/Decls.scala:77-81` maps `check` over the declarations with no added
  environment, and `STypeChecker.typeCheck` takes any `Node`
  (`STypeChecker.scala:430`). A declaration whose check throws is reported and
  **kept unchecked** rather than dropped — an earlier variant that dropped them
  punched a hole in the trait table and moved the failure to
  `Not in the trait table: FortressLibrary.Number`.
* `TypeCheckPhase` reports the error count instead of raising
  `MultipleStaticError`, so the partly annotated component travels on to DESUGAR,
  OVERLOADREWRITE and CODEGEN.
* `CodeGen` and `CodeGenerationPhase` catch per declaration in each of the four
  places code generation can fail before the next declaration is reached:
  `CodeGen`'s constructor (which computes inherited methods for every trait in
  the component, `CodeGen.java:481`), overload dispatch generation
  (`generateTopLevelOverloads`), the object/variable pre-pass
  (`forComponent`'s second loop), and the top-level declaration loop. After a
  catch the probe puts back the state that `forTraitDecl`/`forObjectDecl` set on
  the way in and clear on the way out — `inATrait`, `inAnObject`,
  `currentTraitObjectDecl`, `traitOrObjectName`, `mv` — because there is no
  `try`/`finally` around them (`CodeGen.java:4034-4037`, `:4276-4417`,
  `:5040-5140`) and a caught failure would otherwise make every later top-level
  function take the method path with a null `currentTraitObjectDecl`. Without
  that reset the run reported 119 extra failures that were the probe's own.

### 2.4 What method (2) is validated against

The same tolerant run on the compiler's own library is **identical to the
ordinary compile**: 162 declarations checked with zero errors, 162 emitted,
component OK, `rc=0`, 40 s (`06-control-compilerlib-tolerant.out` against
`04-control-compilerlib-full.out`). The machinery does not change a compile that
works.

## 3. Caveats

1. **112 of 446 declarations reach code generation with no annotations**, because
   the checker crashed on them. Their failures are not evidence about code
   generation, and the tables below separate them.
2. **97 more reach it annotated by a checker that reported errors on them.** The
   checker signals an error and leaves the subtree it could not finish untyped;
   those failures would go away if the library type-checked cleanly, and are also
   separated below.
3. **Overload dispatch generation had to be switched off** (`-Dprobe.skipOverloads`).
   With it on, `CodeGen.generateTopLevelOverloads` → `OverloadSet.split` →
   `OverloadingOracle.lteq` → `TypeAnalyzer.pExc`/`excludesClause` ran **1,046 s
   without emitting a single declaration** and was stopped by hand
   (`12-overloads-not-skipped.out`; the compiler's own library compiles end to
   end in 40 s). Seven overload sets had failed by then — `denominator`,
   `narrow`, `numerator`, `partitionL`, `round`, `unsigned`, `widen` — all with
   the same message, the one under class **O** below. With the switch on,
   `topLevelOverloadedNamesAndSigs` is empty, which changes naming decisions at
   `CodeGen.java:3332` and `:3513`; the 100 failures on synthesized
   `_RewriteFnOverloadDecl`s below are therefore a floor, not a measurement of
   what overload dispatch generation would do.
4. **The compile path's desugaring settings are on** (§1), which is what "through
   the compile path's phases" means, and they are not free: see §4.3.
5. The list is a first pass. `CodeGen` writes into one class writer as it goes,
   and although the probe restores the declaration-level state (§2.3) it cannot
   undo a half-written method. The classes and their proportions are the finding;
   an individual row after the first failure in its class is not certified.
6. The banner line of `08-tolerant-codegen.out` and `12-overloads-not-skipped.out`
   predates a cosmetic rename in the driver's print; the phases and settings it
   prints are the same as the others'.

## 4. What each phase did

### 4.1 Before the checker

DISAMBIGUATE: zero errors, as already on record. PRETYPECHECKDESUGAR and
INTEGERLITERALFOLDING: zero errors. This includes the compile path's own
pre-desugarings — the `extends Object` rewrite of unbounded static parameters and
the compound/tuple-assignment and subscript rewrite
(`AssignmentAndSubscriptDesugarer`, compile path only, `Shell.java:268-270`).

### 4.2 DESUGAR and OVERLOADREWRITE

**Zero diagnostics on the whole library, in both methods.** Coercion desugaring,
getter/setter desugaring, typecase desugaring, type-ascription desugaring and the
bodyless-`FnDecl`-to-abstract marking all run (the last three only because the
driver turns `compiled_expr_desugaring` on), and none of them complains. The
answer to "what does the compile path's desugaring make of the interpreter's
library" is: nothing to report. `Desugarer.desugarApi` is a no-op by construction
(`Desugarer.java:82-85`); the component goes through untroubled.

### 4.3 What the compile path's desugaring costs the *checker*

This is where the difference between the two worlds' desugaring settings shows,
and it shows one phase earlier than DESUGAR. The same library, same checker, the
two settings (`10-typecheck-compilerdesugar.census.txt`,
`11-typecheck-interpdesugar.census.txt`):

| | compile path's desugaring | interpreter's |
|---|---|---|
| errors raised in the twelve prelude apis | **960** | **250** |
| of those, distinct | 257 | **93** |
| of those, `does not satisfy the corresponding bound Object` | **712** | **0** |
| errors raised in the 4,507-line component | **1,204** | **658** |
| of those, `… bound Object` | **618** | **0** |
| declarations the checker crashed on | 112 | 113 |

The 250 reproduce the record exactly: `FortressLibrary` 110, `RangeInternals`
104, `FortressBuiltin` 18, `String` 12, `List` 2, `FlatString` 4, the rest 0, and
they deduplicate to **93 distinct lines** — the number `two-libraries.md` §3
reports. The extra 712 come from one switch:
`setExtendsObjectPreDesugaring(true)` makes
`PreDisambiguationDesugaringVisitor.forStaticParam` (`:134-148`) give every
unbounded static parameter an `extends Object` bound, and the checker then
rejects every instantiation of such a parameter at a **tuple type** —
`Ill-formed type: Condition[\()\]`, `Comprehension[\(T,U)\]`, `Just[\(I,J)\]`,
`Generator[\(T,U)\]`, `ZeroIndexed[\(E,F)\]`, `Range[\(I,J,K)\]` and so on. A
tuple type is not a subtype of `Object` in this checker, and the interpreter's
library instantiates generics at tuple types everywhere.

So of the desugarings the compile path applies and the interpreter does not,
this one is the largest single thing standing between one library text and the
compile path — larger than the 93 tower errors already on record. It costs no
code-generation failure, because it never gets that far.

### 4.4 CODEGEN

Reached, and completed, for both files.

## 5. The counts

### 5.1 `Library/FortressLibrary.fss`, method (2) — `08-tolerant-codegen.out`

4,507 lines, **446 top-level declarations** (243 `FnDecl`, 103 `ObjectDecl`,
98 `TraitDecl`, 2 `VarDecl`). 703 s.

**TYPECHECK**, per declaration:

| | count |
|---|---|
| checked, no error of its own | 237 |
| checked, errors reported on it | 97 |
| **crashed the checker** | **112** |

The 112 crashes, by where they threw: 81 `NI.nyi` at
`STypesUtil.makeInferenceArg` (`STypesUtil.scala:557` — the `nat`/`int`/`bool`
kinds, reached through `inferStaticParamsHelper` and `inferLiftedStaticParams`),
29 `ClassCastException: TraitType cannot be cast to IntExpr` at
`NodeUpdateVisitor.forIntArg:5310` (a `nat` static argument written out), 1
`InterpreterBug: Type is not inferred` (`FortressLibrary.fss:1123`,
`__bigOperator`), 1 `Not in the trait table: FortressBuiltin.Character`. All 112
travel on unchecked.

**CODEGEN**, in the four places it can fail:

| stage | emitted | refused |
|---|---|---|
| `CodeGen`'s constructor, inherited methods per trait (`CodeGen.java:481`) | — | **1** |
| overload dispatch generation | — | switched off, caveat 3 |
| the object/variable pre-pass (`forComponent`, second loop) | — | **41** |
| the top-level declaration loop | **275** | **271** |
| **total** | **275** | **313** |

**The 313 by class:**

| class | count | where it shows |
|---|---|---|
| **T** a type annotation missing | **227** | `OptionUnwrapException` at `Null.unwrap:58`; `Missing type information for …`; `Variable being bound lacks type information!`; `Return type is not inferred.`; `None.get` |
| **V** no visitor in the code generator | **55** | `CodeGen.defaultCase` → `sayWhat:1563`: `Juxt` 53, `Label` 1, `AmbiguousMultifixOpExpr` 1 |
| **N** a `nat` static argument, in the code generator | **14** | `ClassCastException: TraitType cannot be cast to IntExpr`, `NodeUpdateVisitor.forIntArg:5310` |
| **O** a malformed overload set | **7** | `OverloadSet.split:402`, *"apparently malformed overload set not rejected … Probable cause is a functional method and top level function with same signature"* |
| **R** type reference / RTTI | **6** | `generateTypeReference`: *"Only emitting RTTI for types right now"*, *"Only handling some static args of generic types in extends clause"*; `NamingCzar.forTupleType`: *"Can't compile VarArgs yet"* |
| **K** kind environment / trait table | **2** | `I is not in the kind env [][]` (`TypeAnalyzer.scala:766`); `Not in the trait table: IntLiteral` |
| **X** other | **2** | forbid clause NYI (`forTry:2093`); `IntersectionType cannot be cast to NamedType` (`forMethodInvocation:6241`) |
| **C** a construct `canCompile` refuses | **0** | — |
| a native binding with no static helper | **0** | — |
| a desugaring the compile path applies and the interpreter did not | **0** at CODEGEN | §4.3 measures it at TYPECHECK instead |

**The 313 by provenance** — this is the column that matters:

| the declaration it failed on | count |
|---|---|
| the checker crashed on it | **112** |
| the checker reported errors on it | **96** |
| a `_RewriteFnOverloadDecl` synthesized by OVERLOADREWRITE | **100** |
| **the checker checked it clean** | **5** |

Class against provenance, the 313:

| class | crashed | errors reported | synthesized | **checked clean** |
|---|---|---|---|---|
| T annotation missing | 68 | 67 | 92 | 0 |
| V no visitor | 31 | 24 | 0 | 0 |
| N `nat` static argument | 13 | 0 | 0 | **1** |
| O malformed overload set | 0 | 0 | 7 | 0 |
| R type reference / RTTI | 0 | 3 | 0 | **3** |
| K kind env / trait table | 0 | 1 | 1 | 0 |
| X other | 0 | 1 | 0 | **1** |

**The five.** Every code-generation failure on a declaration the checker checked
without complaint, in full:

| declaration | file:line | class | diagnostic |
|---|---|---|---|
| `object __DefaultVector[\T, nat s0\]() extends Vector[\T,s0\]` | `FortressLibrary.fss:2207` | N | `TraitType cannot be cast to IntExpr`, `NodeUpdateVisitor.forIntArg:5310` |
| `trait Rank1 extends { Rank[\1\] } excludes { … }` | `FortressLibrary.fss:1602` | R | `Only emitting RTTI for types right now`, `generateTypeReference:5859` |
| `trait Rank2 extends { Rank[\2\] } excludes { … }` | `FortressLibrary.fss:1605` | R | the same |
| `trait Rank3 extends { Rank[\3\] } excludes { … }` | `FortressLibrary.fss:1608` | R | the same |
| `__filter[\E\](g:Generator[\E\], p:E->Condition[\()\]): Generator[\E\]` | `FortressLibrary.fss:1101` | X | `IntersectionType cannot be cast to NamedType`, `forMethodInvocation:6241` |

Four of the five are a static argument that is a number rather than a type —
`nat s0` in a parameter position, `Rank[\1\]` in an extends clause — which is the
same gap as the checker's, on the other side of the pipeline. The fifth is a
method call whose receiver's static type is an intersection.

### 5.2 `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` — `09-tolerant-builtin.out`

701 lines, 18 top-level declarations. 50 s. TYPECHECK: 13 checked (3 with errors
of their own), 5 crashed — 3 `NI.nyi`, 2 `Not in the trait table`. CODEGEN: 16
emitted, 26 refused (20 in the declaration loop, 6 in the pre-pass) — 20 class T,
5 class V (`Juxt`), 1 class K. **None on a declaration the checker checked
clean**: 5 are on the 5 it crashed on, 3 on ones it reported errors on, and 18
are synthesized `_RewriteFnOverloadDecl`s. The file's own first declaration,
`builtinPrimitive[\T\](javaClass:String):T`, is among the checker's casualties,
which is why its `Juxt` survives.

### 5.3 The native bindings

`builtinPrimitive` appears in **no code-generation diagnostic in any capture**.
The two `builtinPrimitive` bindings that are top-level functions in
`FortressLibrary.fss` — `nanoTime()` (`:4111`) and `printTaskTrace()` (`:4112`) —
**code-generate without complaint**. The code generator emits an ordinary call to
a generic function whose body it does not have, which is the same thing the
earlier probe found by hand with `pPrim2.fss`: the class-name string is inert
data, and the failure is at run time, not at compile time
(`prelude/REPORT.md` §3). The 108 native bindings of this file are a run-time
hole and a porting job; they are not a code-generation hole.

### 5.4 Method (1) beside method (2), on the same file

| | method (1), no TYPECHECK | method (2), TYPECHECK caught per declaration |
|---|---|---|
| declarations reaching the declaration loop | 558 | 546 |
| emitted | 147 | **275** |
| refused (all three stages) | **482** | **313** |
| class T, annotation missing | 335 | 227 |
| class V, no visitor (120 and 53 of them `Juxt`) | 124 | 55 |
| refusals on a declaration the checker checks clean | **161** | **5** |

## 6. The distance

Of the 446 top-level declarations of the interpreter's library, the compile
path's checker gets through 334 and crashes on 112; desugaring and overload
rewriting then accept every one of them without a word; and of the 546
declarations that reach the code generator, 275 are emitted and 271 refused —
but only **5 refusals are on a declaration that type-checked cleanly**, four of
them the same `nat`-as-static-argument gap the checker has and one a method call
on an intersection-typed receiver, so the distance from here to code generation
for this library is not a list of missing visitors or refused constructs (there
are none of the latter and the `Juxt` failures are the checker's shadow, not the
code generator's) but the checker itself, plus the 712 tuple-at-`Object` errors
that the compile path's own `extends Object` pre-desugaring adds before it, plus
an overload dispatch generator that does not terminate on this library's
exclusion graph.

---

## Artifacts

| file | what |
|---|---|
| `desugar-codegen/run-all.sh` | every command, in order; takes a scratch work directory |
| `desugar-codegen/PhaseProbe.java` | the driver: prelude, desugaring settings, phase order, all through public `Shell` entry points |
| `desugar-codegen/shadow-patch.py`, `make-shadows.sh` | generate and compile the five shadow classes from the tracked sources by textual patch |
| `desugar-codegen/classify.py` | turns a capture into the tables of §5 and the row-per-failure appendix |
| `01-reference-full.out` | the compile path as it is on `FortressLibrary`: `Not yet implemented`, 16 s |
| `02-nocheck-desugar-refused.out` | DESUGAR without TYPECHECK, no shadow: `AnalyzeResult.typeCheckers()` throws |
| `03-nocheck-through-overloadrewrite.out` | with the shadow: DESUGAR + OVERLOADREWRITE, `rc=0`, zero errors |
| `04-`, `05-`, `06-control-compilerlib-*.out` | the compiler's own library: green, green-minus-TYPECHECK, green-under-the-tolerant-checker |
| `07-nocheck-codegen.out`, `.classified.txt` | method (1)'s list: 482 failures, 161 of them on declarations the checker checks clean |
| `08-tolerant-codegen.out`, `.classified.txt` | **method (2)'s list**: the 313 failures, one row each, with class, provenance, span, exception, site and source line |
| `09-tolerant-builtin.out`, `.classified.txt` | the same for `FortressBuiltin.fss` |
| `10-`, `11-typecheck-*.census.txt` | the checker's errors under the two desugaring settings, every distinct message with its multiplicity |
| `12-overloads-not-skipped.out` | overload dispatch generation left on: 7 failures, then 1,046 s with no declaration emitted, stopped by hand |

Caches: every run used `-Dfortress.caches` under the work directory and wiped it
first. `default_repository/caches/` was neither read for analysis nor written.
