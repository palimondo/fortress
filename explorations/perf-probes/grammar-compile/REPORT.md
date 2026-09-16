# Does `fortress compile` run a user grammar?

Nobody had tried. Walk interpreter and bytecode compiler share one phase list
with `GRAMMAR` in it (`compiler/phases/PhaseOrder.java:137-147`), so the
question is whether that shared list is the whole story. Every command this
probe ran is in `run-all.sh`; its transcript is the numbered `.out` file beside
it, failures kept. Host: JDK 25.0.3, `source experiment/env.sh`
(`FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`), tree at HEAD, nothing outside this
directory touched, nothing rebuilt, no test suite run.

## The answer

**No — as shipped, a program that imports a user grammar does not reach the
GRAMMAR phase on the compile path. It stops at DISAMBIGUATE, and the reason has
nothing to do with syntax abstraction.** Every grammar api must
`import FortressSyntax.{Expression}` to extend `Expr`; `Library/FortressSyntax.fsi:14`
imports `FortressAst.{...}`; and `Library/FortressAst.fsi:6` is
`import FortressLibrary.{...} except ExtentRange` — the **interpreter's**
prelude. The compiler implicitly imports `CompilerLibrary`, `CompilerBuiltin`
and `AnyType` into every compilation unit
(`compiler/WellKnownNames.java:113-126`), so the two preludes collide and
`fortress compile` of the grammar api's stub component reports **1342
disambiguation errors**, not one of them in any file this probe wrote:
1126 in `Library/FortressLibrary.fsi`, 203 in `Library/FortressAst.fsi` (all of
them the single name `String`), 10 in `Library/List.fsi`, 2 in `FlatString.fsi`,
1 in `Stream.fsi`. `fortress disambiguate` — the truncated phase order that
stops *before* GRAMMAR — produces byte-identical output, so the type checker,
the desugarer and the code generator never ran; the syntax and presyntax caches
stay empty and Rats! is never invoked. Compiling only the using program with the
api on the source path gives the same 1342 errors. Two controls settle that this
is the api graph and not the mechanism: a component that merely writes
`import FortressSyntax.{Expression}` with **no grammar and no macro call** gives
the identical 1342, and so does one that writes `import FortressAst.{...}`,
while the same arithmetic without any import compiles, runs and prints the same
numbers. So the compile path does not *lack* the GRAMMAR wiring — the wiring is
there and world-neutral (`GraphRepository.syntaxExpand` calls
`Parser.macroParse` for both worlds, `GraphRepository.java:815-823`) — what is
missing is a compiler-world spelling of `FortressAst`/`FortressSyntax`. Behind
two probe-only shims that supply one (§4), a user grammar does go all the way:
`twicep⦇ 21 ⦈` compiles to a 1,121-byte `a02p_twice.class` and `fortress run`
prints `42` and `6`. What it costs to get there is one rule the interpreter
never enforces (§5: every template must parenthesize itself) and two
mechanisms that do not survive at all (§6: a template naming a use-site
function, and a typed lambda written in a template).

---

## 1. The files

`TwiceC.fsi` is `explorations/apl-probes/a02_twice_g.fsi` under a fresh name,
with the rule verbatim; `TwiceC.fss` is its stub component (a grammar may only
be declared in an api — ledger row 269); `a02c_twice.fss` is the using program,
`ZZ32` arithmetic and `println` only, so that the compiler's prelude has
everything the expansion needs.

```fortress
api TwiceC
import FortressSyntax.{Expression}
grammar TwiceG extends { Expression }
    Expr |:= twicec⦇ a:Expr ⦈ => <[ (a) + (a) ]>
end
end
```

`UseFnC.fsi` + `a03c_usefn.fss` are step 4's second grammar: three rules, one
for ledger row 270 (a template naming a function declared in the **using**
component) and two for ledger row 285 (a typed lambda written whole inside one
template, applied, and passed as a function value to a use-site function whose
parameter is arrow-typed).

## 2. The interpreter first

Both print their numbers (`02-interpreter-twice.out`, `02b-interpreter-usefn.out`):

```
$ fortress a02c_twice.fss          $ fortress a03c_usefn.fss
42                                 42
6                                  15
                                   103
```

Two Rats! parser generations per run, as always.

## 3. The compile path as shipped

Cache wiped (`03-cache-wipe.out`), compiler world rebuilt in library order —
`AnyType` 1 s, `CompilerBuiltin` 98 s, `CompilerLibrary` 16 s, `CompilerAlgebra`
1 s, `CompilerSystem` 1 s, all `rc=0`, no 0-byte jars
(`04-library-chain.out`, `05-bytecode-cache-after-chain.out`).

| # | command | result |
|---|---|---|
| `06` | `fortress compile TwiceC.fss` (the grammar api's stub) | `File TwiceC.fss has 1342 errors.` `rc=255`, 3 s |
| `07` | `fortress disambiguate TwiceC.fss` (stops before GRAMMAR) | **byte-identical** error text |
| `08` | `fortress compile a02c_twice.fss` (using program, api on source path) | `File a02c_twice.fss has 1342 errors.` `rc=255`, 3 s |
| `09` | `fortress compile c01_plain.fss` + `fortress run c01_plain` — same arithmetic, no grammar | `rc=0`; prints `42` `6` |
| `09` | `fortress compile c02_importsyntax.fss` — `import FortressSyntax.{Expression}`, **no grammar, no macro** | `1342 errors`, `rc=255` |
| `09` | `fortress compile c03_importast.fss` — `import FortressAst.{...}`, **no grammar, no macro** | `1342 errors`, `rc=255` |

**Phase: DISAMBIGUATE, and only DISAMBIGUATE.** `default_repository/caches/syntax_cache`
and `presyntax_cache` are still empty afterwards and no Rats! banner appears, so
no parser was generated for the grammar and no expansion was attempted.

Where the 1342 are raised, and what they say (`06b-stub-error-census.txt`):

| file where raised | errors |
|---|---|
| `Library/FortressLibrary.fsi` | 1126 |
| `Library/FortressAst.fsi` | 203 |
| `Library/List.fsi` | 10 |
| `Library/FlatString.fsi` | 2 |
| `Library/Stream.fsi` | 1 |

| kind | count |
|---|---|
| `Type name may refer to: CompilerBuiltin.X, FortressLibrary.X` (or `CompilerLibrary.X`) | 1313 |
| `X is undefined.` | 29 |

The 1313 by colliding name: `String` 306, `ZZ32` 274, `Number` 155, `Generator`
77, `RR64` 63, `ZZ64` 61, `Range` 51, `TotalComparison` 41, `Comparison` 41,
`NN64` 40, `Matrix` 39, `Reduction` 32, then 13 more with ≤22 each. The 29
undefined: `Char` 14, `Maybe` 4, `HasRank` 2, and one each of `UnsignedLong`,
`MonoidReduction`, `Long`, `LexicographicOrder`, `Int`, `Float`,
`Comprehension`, `BigReduction`, `BigNum`.

This is the same shape as `perf-probes/prelude/REPORT.md` §1 — two preludes in
scope at once — reached here from the other direction, and it is why the
`Compiler*` apis are `Compiler*`-prefixed in the first place
(`explorations/repo-internals.md`, "The two worlds").

## 4. How deep the wall is

`.` is first on `fortress.source.path`, so a file in the working directory
shadows `Library/`. `shim/` holds two **probe-only** shims and a copy of the
probe sources; running the compiler from `shim/` shadows
`Library/FortressLibrary` and `Library/List`. They are not a proposal — they are
a measuring instrument, and the apis they shadow are not the ones the
interpreter uses.

| step | shim | result |
|---|---|---|
| `10` | `FortressLibrary` → an api declaring only `ExtentRange` (the name `FortressAst.fsi:6` excepts) | **1342 → 10 errors**, all in `Library/List.fsi`: `Maybe` ×4, `HasRank` ×2, `LexicographicOrder`, `Comprehension`, `BigReduction`, `MonoidReduction` |
| `11` | `List` also → `trait List[\E\]` + `emptyList` + `opr <\|…\|>` | **0 errors, `rc=0`, 22 s, and the Rats! banner appears** |

So 1332 of the 1342 are the two preludes colliding and vanish with the collision;
the genuine residue is **six names** that `Library/List.fsi` needs and the
compiler's prelude does not have (`List.fsi` has no imports at all, so they can
only reach it through the implicit prelude; `Maybe` *is* written in
`Library/CompilerLibrary.fsi:194-202` but every line of it is commented out).

With that, the grammar api's stub compiles, GRAMMAR runs, and Rats! generates a
template parser — on the **compile** path.

## 5. Past DISAMBIGUATE: what the type checker does with an expansion

`12-shim2-using.out` — the using program now parses with the generated parser
(Rats! banner), and fails one phase later:

```
$ fortress compile a02c_twice.fss
.../shim/TwiceC.fsi:1:3-27:
    Argument to function must be parenthesized.
File a02c_twice.fss has 1 error.
```

`scala_src/typechecker/impls/Operators.scala:237` — **TYPECHECK**, in
juxtaposition resolution. The span is the grammar api's line 1, the placeholder
ledger row 243 already noted for template-originated errors.

A four-rule matrix pins it down (`13-shim2-matrix.out`, `14-shim2-position.out`);
every use site is `println(…)` except where noted:

| rule | template | compile | run |
|---|---|---|---|
| `m1` | `<[ 42 ]>` | `Argument to function must be parenthesized.` | — |
| `m2` | `<[ (a) ]>` | same | — |
| `m3` | `<[ ((a) + (a)) ]>` | **`rc=0`** | **`42`** |
| `m4` | `<[ (a) + (a) ]>` | same error | — |
| `m6` | `m1`'s template, bound: `x: ZZ32 = m1⦇ ⦈` | **`rc=0`** | **`42`** |
| `m7` | `m1`'s template, parenthesized at the **use site**: `println((m1⦇ ⦈))` | same error | — |

The rule: **an expansion arrives unparenthesized unless the template text itself
supplies the parentheses, and the compiler's type checker requires a function's
argument to be syntactically parenthesized.** Parenthesizing the macro bracket
at the use site does not help (`m7`); only the template's own parentheses do
(`m3`). Outside argument position there is no problem (`m6`). The interpreter
never notices because `walk` leaves type checking off
(`explorations/repo-internals.md`, "The pipeline, phase by phase").

Applying that one rule to the `twice` grammar — `<[ ((a) + (a)) ]>` — gives the
one unambiguous positive of this probe (`15-shim2-step4.out`, re-verified from
wiped analysis caches and with both jars deleted, `18-verify-positive.out`):

```
$ fortress compile TwiceP.fss      ### rc=0
$ fortress compile a02p_twice.fss  ### rc=0
$ fortress run a02p_twice
42
6
### rc=0
$ unzip -l default_repository/caches/bytecode_cache/a02p_twice.jar
     1121  2026-09-16 05:04   a02p_twice.class
```

PARSE → GRAMMAR → DISAMBIGUATE → PRETYPECHECKDESUGAR → INTEGERLITERALFOLDING →
TYPECHECK → DESUGAR → OVERLOADREWRITE → CODEGEN → run. A user grammar's
expansion in real bytecode.

## 6. Step 4: rows 270 and 285 do **not** survive the compile path

Both mechanisms were re-cut in `ZZ32` and split one rule per grammar so the
failures cannot mask each other (`16-shim2-rules-split.out`); templates already
carry the parentheses §5 requires.

| rule | template | ledger row | compile |
|---|---|---|---|
| `dblp` | `<[ (mydoublec(a)) ]>`, `mydoublec` declared only in the using component | 270 | **hard crash**: `java.lang.ClassCastException: class scala.runtime.BoxedUnit cannot be cast to class com.sun.fortress.nodes.AbstractNode` |
| `lamp` | `<[ ((fn (w: ZZ32): ZZ32 => (a) + w)(10)) ]>` | 285 | `Unbound type: ZZ32` ×2 |
| `app` | `<[ (applytoc(fn (w: ZZ32): ZZ32 => (a) + w, 3)) ]>` | 285 | `Unbound type: ZZ32` ×2 |

The crash's stack is unambiguous about the phase:

```
at com.sun.fortress.scala_src.useful.STypesUtil$.assertAfterTypeChecking(STypesUtil.scala:1946)
at com.sun.fortress.compiler.StaticChecker.checkCompilationUnit(StaticChecker.java:264)
at com.sun.fortress.compiler.StaticChecker.checkApis(StaticChecker.java:126)
at com.sun.fortress.compiler.phases.TypeCheckPhase.execute(TypeCheckPhase.java:43)
```

`assertAfterTypeChecking` (`STypesUtil.scala:1938-1948`) walks the checked tree
looking for `OutAfterTypeChecking` nodes — `Juxt`, `MathPrimary`,
`AmbiguousMultifixOpExpr`, `_InferenceVarType` and friends, the intermediate
forms the checker is supposed to have eliminated. A `<[ … ]>` template is stored
in the api unchecked, so its interior still holds them; the generated `Walker`
then meets a `BoxedUnit` where it expects an `AbstractNode` and the assertion
dies rather than reporting. `Unbound type: ZZ32` is the same fact seen through
`TypeWellFormedChecker.scala:95` — a type written inside a template is never
disambiguated, so it is still a bare `VarType` when the well-formedness checker
asks the environment for it. There is **no `TemplateGap` or
`_SyntaxTransformation` case anywhere under `scala_src/typechecker/`.**

Moving the vocabulary into an api the **grammar api itself imports**
(`VocabC`, `17-shim2-vocab-in-api.out`) changes nothing — same crash, same two
`Unbound type: ZZ32` — so this is not a scope problem that an import can fix: the
type checker has no rules for template ASTs at all. Both mechanisms run fine on
the interpreter (§2: `42` / `15` / `103`), which never type-checks.

## 7. Candidate gap-ledger rows

In the ledger's eight-column format
(`| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |`).
The first is the row this probe was sent to get; the other three are what it
found behind the first and are offered separately so the headline row stays
about the headline fact.
The numbers below are the ledger's final numbers: the merge of 2026-09-16
(`explorations/gap-ledger-probes/probes-merge/MERGE.md`) kept 288-291 as drafted here,
because `reviews/template-checking-plan.md` and the handover already cite them, and
numbered the other four reports' candidates from 292. Rows 288 and 289 are in the
ledger's section 10 (the compile path), 290 and 291 in section 16 (the mechanism);
row 288's class was written there as an implementation gap first, so that it buckets
as a defect the revival could fix.

| # | claim | status | class | spec citation | reproducer | found by | notes / workaround |
|---|---|---|---|---|---|---|---|
| 288 | a program that **imports a user grammar cannot be `fortress compile`d**: the compile path's phase list contains GRAMMAR and its parse-time expander is world-neutral, but every grammar api must `import FortressSyntax`, whose api graph reaches the **interpreter's** prelude, so the compilation unit dies at DISAMBIGUATE with 1342 errors — 1126 in `FortressLibrary.fsi`, 203 in `FortressAst.fsi`, 13 in `List`/`FlatString`/`Stream` — before GRAMMAR is ever entered | NEGATIVE-VERIFIED | design limit (the two worlds, ledger's "two worlds" fact) + implementation gap (no compiler-world `FortressAst`/`FortressSyntax`) | — (the spec's only normative DSL form is not implemented at all, row 267; `grammar … end` is specified nowhere but `Syntax.rats`) | `perf-probes/grammar-compile/TwiceC.fsi` + `TwiceC.fss` + `a02c_twice.fss`; `06-compile-stub.out` (stub), `07-disambiguate-stub.out` (byte-identical, so the phase is DISAMBIGUATE), `08-compile-using.out` (using program), `09-controls.out` (the three controls) | grammar-compile probe | Chain: `Library/FortressSyntax.fsi:14` `import FortressAst.{...}` → `Library/FortressAst.fsi:6` `import FortressLibrary.{...} except ExtentRange`, against the compiler's implicit `{CompilerLibrary, CompilerBuiltin, AnyType}` (`compiler/WellKnownNames.java:113-126`). The mechanism is **not** missing: `GraphRepository.syntaxExpand` calls `Parser.macroParse` on both paths (`GraphRepository.java:815-823`) and `GRAMMAR` is in `compilerPhaseOrder` (`PhaseOrder.java:137-147`). Controls: `import FortressSyntax.{Expression}` alone, with no grammar and no macro call, gives the identical 1342 (`c02_importsyntax.fss`), as does `import FortressAst.{...}` (`c03_importast.fss`), while the same arithmetic without the import compiles and runs (`c01_plain.fss` → `42` `6`). `syntax_cache`/`presyntax_cache` stay empty and Rats! never runs. Workaround: none at the shipped tree; what it would take is §4's measurement — a compiler-world `FortressAst`/`FortressSyntax` plus six names (`Maybe`, `HasRank`, `LexicographicOrder`, `Comprehension`, `BigReduction`, `MonoidReduction`) that `Library/List.fsi` needs and `CompilerLibrary` does not declare (`Maybe` is present at `CompilerLibrary.fsi:194-202` but wholly commented out) |
| 289 | with that api graph supplied, **a user grammar does compile to bytecode and run**: the stub compiles, Rats! generates a template parser under `fortress compile`, and the using program becomes a 1,121-byte class that `fortress run` executes | POSITIVE-VERIFIED (behind probe-only shims) | — | — | `perf-probes/grammar-compile/shim/TwiceP.fsi` + `TwiceP.fss` + `a02p_twice.fss`; `11-shim2-stub.out`, `15-shim2-step4.out`, `18-verify-positive.out` (re-verified from wiped analysis caches with both jars deleted) | grammar-compile probe | `twicep⦇ 21 ⦈` → `42`, `twicep⦇ 1 + 2 ⦈` → `6`, `rc=0`, through PARSE → GRAMMAR → DISAMBIGUATE → PRETYPECHECKDESUGAR → INTEGERLITERALFOLDING → TYPECHECK → DESUGAR → OVERLOADREWRITE → CODEGEN. The shims (`shim/FortressLibrary.fsi`, `shim/List.fsi`) shadow `Library/` via `.`-first on `fortress.source.path` and are a measuring instrument, not a proposal: they are near-empty and the apis they displace are not the ones the interpreter uses. Row 288 is why they are needed; rows 290-291 are what still fails behind them |
| 290 | **an expansion arrives unparenthesized unless the template text itself writes the parentheses**, and the compiler's type checker requires a function's argument to be parenthesized, so `println(m⦇ … ⦈)` is `Argument to function must be parenthesized.` for every template that does not wrap itself; parenthesizing the macro bracket at the **use site** does not help, and outside argument position there is no problem | NEGATIVE-VERIFIED | implementation gap (the template translator loses `isParenthesized`) | — | `perf-probes/grammar-compile/shim/MatrixC.fsi` with `m01`-`m07`; `13-shim2-matrix.out`, `14-shim2-position.out` | grammar-compile probe | `<[ 42 ]>`, `<[ (a) ]>` and `<[ (a) + (a) ]>` all fail; `<[ ((a) + (a)) ]>` compiles and prints `42`; the same unwrapped template bound to a variable (`x: ZZ32 = m1⦇ ⦈`) compiles and prints `42`; `println((m1⦇ ⦈))` fails. Raised at `scala_src/typechecker/impls/Operators.scala:237`, reported against the grammar api's line 1 (row 243's placeholder span). Invisible to the interpreter, which never type-checks (`walk` leaves `fortress.compile.typecheck` false). Rule for a sub-language that wants to compile: **every template wraps itself in parentheses** |
| 291 | **the type checker has no rules for template ASTs**, so the two mechanisms the APL base is built on do not survive `fortress compile`: a template naming a function (row 270's use-site free identifier) crashes the post-typecheck assertion with `ClassCastException: scala.runtime.BoxedUnit cannot be cast to AbstractNode`, and a typed lambda written inside a template (row 285) is `Unbound type: ZZ32` ×2 because a type inside a template is never disambiguated | NEGATIVE-VERIFIED | implementation gap | — | `perf-probes/grammar-compile/shim/G_dblp.fsi` / `G_lamp.fsi` / `G_app.fsi` + `u_*.fss`, `16-shim2-rules-split.out`; the same three with the vocabulary imported into the grammar api (`VocabC`, `G_dblq/lamq/appq`), `17-shim2-vocab-in-api.out` | grammar-compile probe | Crash at `STypesUtil.assertAfterTypeChecking` (`STypesUtil.scala:1938-1948`) ← `StaticChecker.checkCompilationUnit:264` ← `checkApis:126` ← `TypeCheckPhase.execute:43`: the assertion hunts `OutAfterTypeChecking` nodes (`Juxt`, `MathPrimary`, `AmbiguousMultifixOpExpr`, `_InferenceVarType`) and a `<[ … ]>` body still holds them, whereupon the generated `Walker` meets a `BoxedUnit` and dies instead of reporting. `Unbound type` is `TypeWellFormedChecker.scala:95`, a bare `SVarType` the disambiguator never entered. No `TemplateGap` or `_SyntaxTransformation` case exists anywhere under `scala_src/typechecker/`. Moving the vocabulary into an api the grammar api itself imports changes nothing, so no import fixes it. Both run on the interpreter (`02b-interpreter-usefn.out`: `42` `15` `103`). Consequence: rows 270, 282 and 285 — i.e. the whole APL ladder's division of labour — are interpreter-only facts |

## Artifacts

| file | what |
|---|---|
| `run-all.sh` | every command, in order |
| `TwiceC.fsi`/`.fss`, `a02c_twice.fss` | the `twice` grammar, stub and using program |
| `UseFnC.fsi`/`.fss`, `a03c_usefn.fss` | step 4's two mechanisms (rows 270, 285) |
| `c01_plain.fss`, `c02_importsyntax.fss`, `c03_importast.fss` | the three controls |
| `02-…`, `02b-…` | both grammars on the walk interpreter |
| `03-…`, `04-…`, `05-…` | cache wipe, compiler library chain, bytecode cache |
| `06-…`, `06b-…`, `07-…`, `08-…` | the compile path as shipped, the phase proof, the error census |
| `09-controls.out` | the three controls |
| `shim/FortressLibrary.fsi`/`.fss`, `shim/List.fsi`/`.fss` | the two probe-only shims |
| `10-…`, `11-…`, `12-…` | 1342 → 10 → 0, and the first run past DISAMBIGUATE |
| `shim/MatrixC.fsi`, `shim/m0*.fss` | the parenthesization matrix |
| `13-…`, `14-…` | that matrix |
| `shim/TwiceP.fsi`/`.fss`, `shim/a02p_twice.fss` | the one that compiles and runs |
| `shim/UseFnP.fsi`, `shim/G_*.fsi`, `shim/u_*.fss`, `shim/VocabC.fsi` | step 4 split one rule per grammar, and with the vocabulary in the api |
| `15-…`, `16-…`, `17-…`, `18-…` | step 4, the split, the import attempt, the re-verification |

Caches: this probe left `default_repository/caches/bytecode_cache/` holding the
compiler library chain plus `c01_plain`, `MatrixC`, `m03`, `m06`, `TwiceC`,
`TwiceP`, `VocabC` and `a02p_twice`; no 0-byte jars (checked). The analysis
caches were wiped before each measurement and should be wiped again
(`rm -rf default_repository/caches/*_cache default_repository/caches/logs`)
before any interpreter work, since several runs analysed the shipped apis under
the compiler's phase order and two of them did so with `FortressLibrary` and
`List` shadowed.
