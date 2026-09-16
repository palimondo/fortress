# The template-checking fix, prototyped under a classpath shadow

The design is `explorations/reviews/template-checking-plan.md` section (c): four edits, in `TypeWellFormedChecker.scala`, `STypesUtil.scala`, `ExprFactory.java` and `Transform.java`, so that the api checkers do not descend into a parsed template body and the parenthesized flag survives the parser's and the expander's handling of gaps and macro invocations.
Nothing was designed here. This probe copied those four files into `shadow-src/`, made exactly the edits the plan names, compiled them into `shadow-classes/`, and put that directory first on the classpath, the way `perf-probes/prelude/` shadowed `StaticChecker` and `perf-probes/grammar-compile/` shadowed the prelude apis.
Every command is in `run-all.sh` (with `matrix.sh`, `nocache.sh` and `extra.sh` as its bodies); the transcripts are the numbered `.out` files beside it, failures kept.
Host: JDK 25, `source experiment/env.sh` (`FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`), tree at HEAD, no tracked file modified at any point, nothing rebuilt by `ant`.
The measurements run from `perf-probes/grammar-compile/shim/`, so the probe-only `FortressLibrary`/`List` shims of ledger row 288 are in force throughout; the shims are a measuring instrument, not a proposal.

## The answer

**The four edits do what the plan says they do, and they are not sufficient for ledger row 270.**

Row 285 becomes true on the compile path: `u_lamp`, `u_app`, `u_lamq`, `u_appq` compile and print `31` and `24`, the same numbers the interpreter prints for the same files.
The parenthesization rule of ledger row 290 disappears: all seven cases of the `m01`-`m07` matrix compile and run, and each prints what the interpreter prints, including the four that a template's own parentheses used to be needed for.
The api-side crash of row 291 disappears: `G_dblp`, `G_lamp`, `G_app`, `UseFnP` and the `q` variants all compile with `rc=0`, the `ClassCastException: BoxedUnit cannot be cast to AbstractNode` never occurs again in any run, and the assertion at `StaticChecker.java:264` reports nothing in any of them.
Row 270 stops short of green for a fifth reason, in a fifth file the plan does not name: **the api cache does not round-trip a template gap's `ExprInfo`**, so the flag edit 3 sets is present when the api is analysed in the same process and absent when the api is read back from `analyzed_cache`.
With the api analysed in-process, `u_dblp` and `u_dblq` compile and print `42` (`24-shadow-dblp-uncached.out`). With the api read back from the cache, they fail with `Argument to function must be parenthesized.` pointing at the substituted argument (`22-`, `23-`).
The gate is clean: `ant testFast` 1,377 tests and `ant testSystem` 382 tests, both zero failures under the overlaid classes, and `SyntaxAbstractionJUTestAll` identical before and after.

---

## 1. The four edits, as made

`diffs/` holds `diff -u` of each shadow file against its original.

| # | file, function | edit |
|---|---|---|
| 1 | `scala_src/typechecker/TypeWellFormedChecker.scala`, `walk` (`:51-166`) | `case _:NodeTransformer =>` before the default case at `:166`, so the well-formedness walk does not descend into a parsed template body |
| 2 | `scala_src/useful/STypesUtil.scala`, `assertAfterTypeChecking` (`:1938-1948`) | the same skip in `outFinder.walk`, and `node` rather than Unit returned after `result = true`, so a genuine find is reported through `StaticChecker.java:264-266` instead of dying in the generated `Walker` |
| 3 | `nodes_util/ExprFactory.java`, `makeInParentheses` (`:1779-1992`) | `forTemplateGapExpr` builds its copy with `makeExprInfo(span, true)`; `for_SyntaxTransformationExpr` returns a copy with a parenthesized `ExprInfo` instead of its argument unchanged |
| 4 | `syntax_abstractions/phases/Transform.java`, `forTemplateGapOnly` (`:541`) and `defaultTransformationNodeCase` (`:613`) | both return `carryParentheses(that, result)`: a substituted node inherits the parenthesization of the gap or invocation it replaces |

`carryParentheses` is one private helper of six lines shared by the two call sites, because the plan asks for the same test in both.
It takes its first argument as `Object`, because `TemplateGap` and `_SyntaxTransformation` are interfaces that do not extend `Node`.

Why the flag is what matters: the type checker builds the `MathItem`s of a tight juxtaposition itself, from `NU.isParenthesized(exp)` (`scala_src/typechecker/impls/Operators.scala:76-85`), and then requires a function's argument to be a `ParenthesisDelimitedMI` (`:225-237`).
So the flag has to be on the expression node at the moment TYPECHECK sees it, which is after the parser and after the expander.

## 2. The baseline: the grammar-compile matrix re-run without the shadow

`10-base-matrix.out`, `11-base-step4.out`, `12-base-rules-split.out` and `13-base-vocab.out` reproduce the committed `grammar-compile/13-`, `15-`, `16-` and `17-` exactly: the same return codes, the same error texts, the same spans, the same stack.
`02-interpreter-reference.out` is the interpreter's answer for the same programs, run from `interp/`, where the real `Library/` applies rather than the shims.

## 3. The matrix, before and after

`fortress compile` from `grammar-compile/shim/`, then `fortress run`. The analysis caches and this probe's own jars are wiped before each leg; the compiler library chain is kept.

| case | interpreter | before (stock build) | after (shadow first) |
|---|---|---|---|
| `m01` `<[ 42 ]>` | `42` | `rc=255` `Argument to function must be parenthesized.` @ `MatrixC.fsi:1:1` | **`rc=0`, `42`** |
| `m02` `<[ (a) ]>` | `21` | `rc=255` same error @ `m02.fss:4:24` | **`rc=0`, `21`** |
| `m03` `<[ ((a) + (a)) ]>` | `42` | `rc=0`, `42` | `rc=0`, `42` |
| `m04` `<[ (a) + (a) ]>` | `42` | `rc=255` same error @ `MatrixC.fsi:1:3-27` | **`rc=0`, `42`** |
| `m05` bound, use-site parens, `m4` bound | `42` `42` `42` | `rc=255` same error @ `MatrixC.fsi:1:1` | **`rc=0`, `42` `42` `42`** |
| `m06` `m1` bound to a variable | `42` | `rc=0`, `42` | `rc=0`, `42` |
| `m07` `println((m1⦇ ⦈))` | `42` | `rc=255` same error @ `MatrixC.fsi:1:1` | **`rc=0`, `42`** |
| `TwiceP` + `a02p_twice` | `42` `6` | `rc=0`, `42` `6` | `rc=0`, `42` `6` |
| `UseFnP` (three rules in one api) | — | `rc=255`, `Unbound type: ZZ32` x4 | **`rc=0`** |
| `a03p_usefn` | `42` `15` `103` | `rc=255`, `Unbound type: ZZ32` x4 | `rc=255`, one `Argument to function must be parenthesized.` @ `a03p_usefn.fss:10:19` |
| `G_dblp` | — | `rc=1`, `ClassCastException: BoxedUnit` | **`rc=0`** |
| `u_dblp` | `42` | `rc=1`, same crash | `rc=255`, `Argument to function must be parenthesized.` @ `u_dblp.fss:6:26` |
| `G_lamp` | — | `rc=255`, `Unbound type: ZZ32` x2 | **`rc=0`** |
| `u_lamp` | `31` | `rc=255`, same | **`rc=0`, `31`** |
| `G_app` | — | `rc=255`, `Unbound type: ZZ32` x2 | **`rc=0`** |
| `u_app` | `24` | `rc=255`, same | **`rc=0`, `24`** |
| `VocabC` | — | `rc=0` | `rc=0` |
| `G_dblq` / `u_dblq` | `42` | `rc=1`, `ClassCastException: BoxedUnit` | **`rc=0`** / `rc=255` @ `u_dblq.fss:5:26` |
| `G_lamq` / `u_lamq` | `31` | `rc=255`, `Unbound type: ZZ32` x2 | **`rc=0`** / **`rc=0`, `31`** |
| `G_appq` / `u_appq` | `24` | `rc=255`, `Unbound type: ZZ32` x2 | **`rc=0`** / **`rc=0`, `24`** |

Before: `10-` to `13-`. After: `20-` to `23-`.
`Argument to function must be parenthesized.` is `Operators.scala:237`; `Unbound type: ZZ32` is `TypeWellFormedChecker.scala:95`; the crash is `STypesUtil.assertAfterTypeChecking` reached from `StaticChecker.checkCompilationUnit:264`.
No run under the shadow produced `Result of typechecking still contains intermediate nodes` and none produced a `BoxedUnit` cast, so the assertion of edit 2 reports nothing and never dies.

## 4. The one residue, and where it lives

The three cases that still fail after the four edits are `u_dblp`, `u_dblq` and `a03p_usefn`, and they are one fact: the template `<[ (mydoublec(a)) ]>` writes a juxtaposition of its own, and the gap sits in its argument position.

An instrumented copy of the shadow `Transform` (a temporary print in `carryParentheses`, not kept) says it plainly.
Compiling `u_dblp.fss` with no cached api: `replaced=TemplateGapExpr paren=true result=IntLiteralExpr resultParen=false`, the wrap fires, `rc=0`.
Compiling `G_dblp.fss` first and then `u_dblp.fss`: `replaced=TemplateGapExpr paren=false`, the wrap does not fire, and the error is raised at the substituted argument's span.

The cause is in the api cache, not in any of the four files.
`nodes_util/NodeReflection.getPrintableFields` (`:218-244`) walks the superclass chain for an ordinary node, which is how `_info` is printed and read back, but for a node implementing `TemplateGap` (and for `_Ellipses`) it takes `cl.getDeclaredFields()` only.
A template gap's declared fields are `_id` and `_templateParams`; its `_info` is inherited, so it is never written.
The cached api shows exactly that: `(TemplateGapExpr @1:13~37 _id=(Id ... _text="a"))` with no `_info`, while the `NodeTransformer` and the `Juxt` around it do carry `_parenthesized=true` (`default_repository/caches/analyzed_cache/G_dblp-*.tfi`).
On read-back the gap gets a default `ExprInfo`, whose `parenthesized` is false.

`24-shadow-dblp-uncached.out` is the same two rules with the using program compiled first, so that the api is analysed in the same process: `u_dblp` and `u_dblq` both compile `rc=0` and both print `42`.

`25-extra-nodereflection.out` measures what closes it: a **fifth** shadowed file, `extra-src/.../NodeReflection.java`, which lets a template gap's inherited fields be printed and read like any other node's.
With that fifth file in front of the four, and the api compiled first so that it does go through the cache, `u_dblp` prints `42`, `u_lamp` prints `31`, `u_app` prints `24`, and all seven of `m01`-`m07` compile and print what the interpreter prints.
This is a measurement, not a proposal, and it is not covered by the gate below.
**Whether the fix belongs there, or in the gaps' own serialization, or somewhere else, is a decision for Pavol, not for this probe.**

## 5. Discrepancies between the plan and the code

- Plan (c) edit 4 cites `forTemplateGapOnly` at `:541-555` and `defaultTransformationNodeCase` at `:612-653`. The methods are at `:541` and `:613`; the bodies are as described.
- Plan (c) edit 3 says `for_SyntaxTransformationExpr` should keep `getVariables()`, `getSyntaxParameters()` and `getSyntaxTransformer()`, constructor order as at `Transform.java:598-601`. That order is `(ExprInfo, variables, syntaxParameters, syntaxTransformer)` and the shadow uses it.
- Plan (b) explains the parenthesization failures by the flag being dropped in three places. That is right, but the reason the flag matters is one step further on than the plan states: for a tight juxtaposition the `MathItem`s are not built by the parser, they are built by the type checker from `NU.isParenthesized` (`Operators.scala:76-85`). The plan's edits are exactly the ones that make that test true.
- Plan (c) does not mention the api cache. The fourth site where the flag is lost is `NodeReflection.getPrintableFields`, and it is the one that keeps row 270 red. Recorded, not fixed in the four-file shadow.
- Plan (e) expects `m01`-`m07` all `rc=0` printing `42`. Six of them print `42`; `m02` prints `21`, which is what the interpreter prints for `m2⦇ 21 ⦈` under the template `<[ (a) ]>`, and `m05` prints `42` three times. The counts and values agree with the interpreter in every case.
- Plan (e) expects the shipped `SyntaxAbstractionJUTestAll` "on the interpreter path as today". As today is not green: 17 run, 14 failures, before any change (section 6).
- Plan (f) proposes running the shadow by hand from the shim directory. `ant testsyntax`, the target that would run the syntax-abstraction suite, depends on `compileAll` and would rebuild over an overlay; the suite was therefore invoked directly through `junit.textui.TestRunner`, with the cache and tmpdir properties the `fastTrack` macro sets (`build.xml:942-945`).

## 6. The gate

The four shadow class files were overlaid into `ProjectFortress/build` (50 class files of the four compilation units backed up first, 28 of them replaced), the suites were run, and the originals were restored byte for byte, verified by `md5sum` (`35-restore-check.out`).
`ProjectFortress/build` is gitignored, so `git status --porcelain` under the overlay showed no tracked file changed (`31-git-status-overlaid.out`).
Neither `testFast` nor `testSystem` depends on a compile target, so nothing was rebuilt and the overlay stood for the whole run.

| leg | before | under the overlay |
|---|---|---|
| `SyntaxAbstractionJUTestAll` (interpreter phase order) | 17 run, 14 failures, 0 errors | 17 run, 14 failures, 0 errors, **the same 14 test names** |
| `ant testFast` | — | 47 suites, **1,377 tests, 0 failures, 0 errors**, BUILD SUCCESSFUL, 7 min 37 s |
| `ant testSystem` | — | 4 shards, **382 tests, 0 failures, 0 errors, 0 skipped**, BUILD SUCCESSFUL, 2 min 33 s |

`30-syntaxabstraction-before.out` and `32-syntaxabstraction-after.out` hold the two runs.
The 14 failures are the shipped state of that suite, which `testFast` excludes (`build.xml:987`); each is an `OptionUnwrapException` in `CaseExprDesugarer.forCaseClauses` or an interpreter-path assertion, and the set of failing test names is identical before and after.
The compile-path leg of plan (e) is this probe's own matrix (section 3), as (e) says it must be until row 288 is closed.

## 7. Rows 270 and 285

- **Row 285** (a typed lambda written whole inside one template, applied, and passed as a function value): **true on the compile path** behind the prelude shims. Evidence: `22-shadow-rules-split.out` (`G_lamp` `rc=0`, `u_lamp` `rc=0`, `fortress run u_lamp` prints `31`; `G_app` `rc=0`, `u_app` `rc=0`, prints `24`) and `23-shadow-vocab.out` for the `q` variants, against `02-interpreter-reference.out` (`31`, `24`) and the baselines `12-` and `13-` (`Unbound type: ZZ32` x2 in each case).
- **Row 270** (a template naming a function declared in the using component): **not yet true through the api cache, true without it.** Evidence: `22-shadow-rules-split.out` and `23-shadow-vocab.out` (`G_dblp`/`G_dblq` now `rc=0`, the crash gone, but `u_dblp`/`u_dblq` `rc=255` with one parenthesization error) against `24-shadow-dblp-uncached.out` (`rc=0`, `42`, for both, with the api analysed in-process) and `25-extra-nodereflection.out` (`rc=0`, `42`, through the cache, under the fifth file).

## 8. Candidate ledger rows

The ledger is being merged separately; nothing here was written into it. In the ledger's eight-column format.

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| — | **the template-checking plan's four edits make an expansion type-check as written code**: an api's template bodies are skipped by `TypeWellFormedChecker` and by `assertAfterTypeChecking`, and the parenthesized flag survives the parser and the expander, so `Unbound type: ZZ32`, the `BoxedUnit` `ClassCastException` and `Argument to function must be parenthesized.` all disappear, and row 285's two mechanisms compile and print the interpreter's numbers | POSITIVE-VERIFIED (behind probe-only shims and a classpath shadow) | — | — | `perf-probes/template-check/shadow-src/` (four files) and `diffs/`; `20-shadow-matrix.out`, `21-shadow-step4.out`, `22-shadow-rules-split.out`, `23-shadow-vocab.out` against the baselines `10-` to `13-` | template-check probe | `u_lamp` -> `31`, `u_app` -> `24`, `u_lamq` -> `31`, `u_appq` -> `24`, `m01`-`m07` all `rc=0` with the interpreter's values; `G_lamp`, `G_app`, `G_dblp`, `UseFnP` and the `q` variants all compile `rc=0`. Gated: `ant testFast` 1,377 tests and `ant testSystem` 382 tests, zero failures with the four class files overlaid into `ProjectFortress/build`, and `SyntaxAbstractionJUTestAll` unchanged (17 run, 14 failures, same names, before and after) |
| — | **the api cache does not round-trip a template gap's `ExprInfo`**: `NodeReflection.getPrintableFields` takes only `cl.getDeclaredFields()` for a node implementing `TemplateGap`, so the inherited `_info` is never written to the `.tfi` and comes back as a default on read; a gap written parenthesized in a template therefore arrives unparenthesized whenever the grammar api is read from `analyzed_cache` rather than analysed in the same process | NEGATIVE-VERIFIED | implementation gap | — | `perf-probes/template-check/22-shadow-rules-split.out` and `23-shadow-vocab.out` (api compiled first: `u_dblp`, `u_dblq` fail) against `24-shadow-dblp-uncached.out` (api analysed in-process: both `rc=0`, both print `42`); the cached tree itself, `(TemplateGapExpr @1:13~37 _id=(Id ... "a"))` with no `_info`, beside `_parenthesized=true` on the enclosing `Juxt` | template-check probe | `nodes_util/NodeReflection.java:218-244`, the `else` branch for `isTemplateGap`/`isEllipses`. This is what keeps ledger row 270 red on the compile path after the plan's four edits, and it is the only thing that does. `25-extra-nodereflection.out` measures a fifth shadowed file that lets a gap's inherited fields be printed and read like any other node's: with it the api goes through the cache and `u_dblp` prints `42`, `u_lamp` `31`, `u_app` `24`, `m01`-`m07` all green. Not gated, offered as a measurement only |

Rows 290 and 291 are both answered by the first row above and would be restated, not replaced, by whoever merges.
Row 282 is untouched: it needs row 288's prelude and `nat` checking, which this change does not supply.

## Artifacts

| file | what |
|---|---|
| `run-all.sh` | every command, in order |
| `matrix.sh`, `nocache.sh`, `extra.sh` | its three bodies |
| `shadow-src/`, `shadow-classes/` | the four edited files and their classes |
| `diffs/` | `diff -u` of each shadow file against its original, and of the fifth file |
| `extra-src/`, `extra-classes/` | the fifth file, measurement only |
| `interp/` | the same `G_*`, `u_*` and `m*` sources outside `shim/`, for the interpreter reference |
| `02-interpreter-reference.out` | what the interpreter prints for each program |
| `10-` to `13-` | the baseline matrix, stock build |
| `20-` to `23-` | the same matrix, shadow first on the classpath |
| `24-shadow-dblp-uncached.out` | the two row-270 rules with the api analysed in-process |
| `25-extra-nodereflection.out` | the same rules and the `m` matrix under the fifth file |
| `30-`, `32-` | `SyntaxAbstractionJUTestAll` before and under the overlay |
| `31-`, `35-` | `git status` under the overlay, and the byte-for-byte restore check |
| `33-testfast.out`, `34-testsystem.out` | the gate |

Caches: this probe left `default_repository/caches/bytecode_cache/` holding the compiler library chain plus its own jars, and `ProjectFortress/test-caches/syntaxall/` from the two syntax-abstraction runs.
Wipe `default_repository/caches/*_cache` before any interpreter work, since several runs analysed the shipped apis under the compiler's phase order with `FortressLibrary` and `List` shadowed.
