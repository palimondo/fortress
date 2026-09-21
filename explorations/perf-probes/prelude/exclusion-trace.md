<!-- Step 2(a) of explorations/coordinator/library-route-judgement.md §2: which of the type
checker's four exclusion clauses fires at each of the 27 exclusion sites of the interpreter's
library, and what follows.  Written 2026-09-21 by a delegated worker on Pavol's ask.  Measured,
not read: shadow copies of the checker's TypeAnalyzer.scala and TypeHierarchyChecker.scala,
compiled with the build's own scalac entry point, print the clause that establishes each
exclusion and name the declaration site of every family A/B/E error; the library variants are
copies in a private scratch directory.  Every run had its own -Dfortress.caches outside the
repository; default_repository/ was never written; no tracked file was modified.  Commands:
exclusion-trace/run-all.sh.  Captures: exclusion-trace/. -->

# The exclusion trace

Terms. **Exclusion**: the relation "these two types share no value", which lets the checker
refuse a trait that extends both. **The four clauses**: the checker builds exclusion between
two trait types out of four disjuncts at `scala_src/types/TypeAnalyzer.scala:423-457` —
`checkEC` an explicit `excludes` clause (`:425-428`), `checkCC` a `comprises` clause
(`:429-435`), `checkO` object-ness (`:436-442`), `checkP` two distinct instantiations of one
generic ancestor (`:443-456`) — and takes their disjunction at `:457`. **Family A**: the error
`Type X excludes Y but it extends Y` (`scala_src/typechecker/TypeHierarchyChecker.scala:187-190`).
**Family B**: `Types A and B exclude each other.  C must not extend them` (`:178-182`).
**Family E**: the two `Invalid comprises clause` errors (`:206-208`, `:210-212`). The 93 errors at 48 sites
and these families are `coordinator/two-libraries.md` §3 and its appendix.

**The answer in one line.** `checkP` fires at 61 of the 62 family A/B errors and is the only
clause that causes any of them: `checkEC` fires once, `checkO` never, and `checkCC` — which
fires alongside `checkP` at 29 of them — establishes nothing on its own, measured. Relaxing
`checkP` to the specification's rule takes one line in one function and takes the 93 to 33
(`02-dropP.out`). What is left after that is not an exclusion question at all.

## 1. Method

`TypeAnalyzer.scala` and `TypeHierarchyChecker.scala` were copied into
`exclusion-trace/shadow-src/` and three things were added to the copies; nothing else changed.

1. The four clause bodies were lifted out of `pExcInner` into four methods, verbatim, so each
   can be evaluated on its own; `pExcInner` binds the four results and takes the same
   disjunction (`shadow-src/…/TypeAnalyzer.scala:434-447`, the lifted bodies at `:519-554`).
2. Every established exclusion prints `@@EXC <clauses> | <x> | <y>`, and each family A/B/E
   error site prints `@@SITE <family> | <file:line:col> | decl= | x= | y= | clause= | witnessP=`
   (`shadow-src/…/TypeHierarchyChecker.scala:189-193, 204-208, 227-230, 235-238, 263-266`). A clause is
   named when its formula is `True`; a clause that was neither `True` nor `False` would be
   named with a trailing `?`, and no site produced one. `witnessP` names, for a pair `checkP`
   separates, every common generic ancestor it found at two different instantiations
   (`shadow-src/…/TypeAnalyzer.scala:581-607`).
3. Two switches that drop a clause **in the positive direction only** — when `negate` is
   false, the direction `definitelyExcludes` asks (`:515-517, 523-524, 538-539`). The negative
   direction is deliberately left alone, because there it is a different question: `notExcludes`
   (`TypeAnalyzer.scala:367-370`) uses the same clause to emit the equality constraints that
   static-argument inference runs on, as the team's own comment at `:361-365` says ("if we have
   `x=List[\$i\]` and `y=List[\$k\]` then x and y exclude one another unless `$i=$j`"). A third
   switch, `probe.exclusion.hierarchyOnly`, raises the same drop dynamically around only the
   two `definitelyExcludes` calls in `TypeHierarchyChecker` (`shadow-src/…:54-56`, `ProbeSwitch`
   at `shadow-src/…/TypeAnalyzer.scala:60-68`).

The copies were compiled with the build's own compiler entry point —
`java -cp "$CP" scala.tools.nsc.Main -d shadow-classes -classpath "$CP" -encoding UTF-8 …`,
which is what `build.xml:557-567` runs — and put ahead of `ProjectFortress/build` on the
classpath: the technique of `perf-probes/prelude/run-all.sh:33-35` and
`reviews/nat-checking-plan.md` §f. The driver is the prelude probe's `WorldFlip.java`
(`Shell.useInterpreterLibraries()` plus `PhaseOrder.compilerPhaseOrder`) with that directory's
instrumented `StaticChecker` copy, which names each compilation unit and survives the
`OverloadingChecker` crash on `NativeArray`. A library variant is selected without touching the
tree: `Shell.sourcePath(file, name)` (`Shell.java:1175-1188`) prepends the given file's own
directory to the source path, so a copy of `FortressLibrary.{fss,fsi}` shadows `Library/`'s
while every other api still comes from the tree — the mechanism of
`reviews/library-scalar-extension-review-probes.md`.

The baseline reproduces the record exactly: **93 errors**, the same per-api counts (`Stream` 0,
`String` 12, `Writer` 0, `FlatString` 4, `FortressBuiltin` 18, `NatReflect` 0, `AnyType` 0,
`TypeProxy` 0, `RangeInternals` 104, `List` 2, `FortressLibrary` 110, `NativeArray` 0 with the
`Not yet implemented` crash at `STypesUtil.scala:557`), and **64 site lines — 36 family A + 26
family B at 27 declaration sites, plus the 2 family E errors** (`01-baseline-trace.out`). The 64
match the appendix of `two-libraries.md` site by site and count by count. Per-error attribution:
`sites.tsv`.

## 2. The table

One row per site. "Errors" gives the family counts of that row and the types the messages name.
"Clause" is what the shadow printed. Full text of every message: the tail of
`01-baseline-trace.out`; per-error rows including the `checkP` witness: `sites.tsv`.

| site | the declaration, as it reads today | errors, and between which types | clause | the spec on that clause | bucket |
|---|---|---|---|---|---|
| `Library/FortressLibrary.fsi:121` | `extends { Comparison, StandardTotalOrder[\TotalCompari` | A×2 B×2: `Comparison` / `StandardTotalOrder[\TotalComparison\]` / `TotalComparison` (via `Equality` and 1 more at two instantiations) | `CC+P`×4 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work) | 2 · CC co-attributed 3 |
| `Library/FortressLibrary.fsi:132` | `object LessThan extends TotalComparison` | A: `LessThan` / `TotalComparison` (via `Equality` and 1 more at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:143` | `object GreaterThan extends TotalComparison` | A: `GreaterThan` / `TotalComparison` (via `Equality` and 1 more at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:153` | `object EqualTo extends TotalComparison` | A: `EqualTo` / `TotalComparison` (via `Equality` and 1 more at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:373` | `trait QQ extends { RR64, StandardPartialOrder[\QQ\] } ` | A×2 B×2: `RR64` / `StandardPartialOrder[\QQ\]` / `QQ` (via `Equality` and 1 more at two instantiations) | `CC+P`×2 + `P`×2 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work) | 2 · CC co-attributed 3 |
| `Library/FortressLibrary.fsi:409` | `trait AnyIntegral extends { QQ } comprises { ZZ } end` | A E: `AnyIntegral` / `QQ` (via `Equality` and 1 more at two instantiations)<br>E: `FortressLibrary.QQ` has `comprises ...` and is extended inside the api | `CC+P`×1 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work); E: `traits.tex:231-241`, a `\note{}` | 2 · CC co-attributed 3 · E: **1** |
| `Library/FortressLibrary.fsi:411` | `trait Integral[\I extends Integral[\I\]\] extends { St` | A×2 B×2 E: `StandardTotalOrder[\I\]` / `AnyIntegral` / `Integral[\I\]` (via `Equality` and 4 more at two instantiations)<br>E: `FortressLibrary.AnyIntegral` has a `comprises` clause, `Integral` not eligible to extend it | `CC+P`×3 + `P`×1 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work); E: `traits.tex:231-241`, a `\note{}` | 2 · CC co-attributed 3 · E: **1** |
| `Library/FortressLibrary.fsi:437` | `trait NN64 extends { ZZ, Integral[\NN64\] } comprises ` | A×2 B×2: `ZZ` / `Integral[\NN64\]` / `NN64` (via `Integral` and 6 more at two instantiations) | `CC+P`×4 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work) | 2 · CC co-attributed 3 |
| `Library/FortressLibrary.fsi:464` | `trait ZZ32 extends { ZZ64, Integral[\ZZ32\] } comprise` | A×2 B×2: `ZZ64` / `Integral[\ZZ32\]` / `ZZ32` (via `Integral` and 6 more at two instantiations) | `CC+P`×4 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work) | 2 · CC co-attributed 3 |
| `Library/FortressLibrary.fsi:498` | `trait ZZ64 extends { ZZ, Integral[\ZZ64\] } comprises ` | A×2 B×2: `ZZ` / `Integral[\ZZ64\]` / `ZZ64` (via `Integral` and 6 more at two instantiations) | `CC+P`×4 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work) | 2 · CC co-attributed 3 |
| `Library/FortressLibrary.fsi:536` | `trait ZZ extends { Integral[\ZZ\] } comprises { BigNum` | A: `ZZ` / `Integral[\ZZ\]` (via `Equality` and 4 more at two instantiations) | `CC+P`×1 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work) | 2 · CC co-attributed 3 |
| `Library/FortressLibrary.fsi:816` | `value trait AnyMaybe extends { Equality[\AnyMaybe\], A` | A×2 B×2: `Equality[\AnyMaybe\]` / `AnyUniqueItem` / `AnyMaybe` (via `Equality` at two instantiations) | `P`×4 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:833` | `extends { AnyMaybe, Condition[\T\], ZeroIndexed[\T\], ` | A×2 B×2: `AnyMaybe` / `UniqueItem[\T\]` / `Maybe[\T\]` (via `Equality` at two instantiations) | `CC+P`×4 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work) | 2 · CC co-attributed 3 |
| `Library/FortressLibrary.fsi:838` | `value object Just[\T\](x:T) extends Maybe[\T\]` | A: `Just[\T\]` / `Maybe[\T\]` (via `Equality` at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:862` | `value object Nothing[\T\] extends Maybe[\T\]` | A: `Nothing[\T\]` / `Maybe[\T\]` (via `Equality` at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:1817` | `DistributesOver[\MaxReductionN\],` | A B: `DistributesOver[\MaxReductionN\]` / `DistributesOver[\MinReductionN\]` / `SumReduction` (via `DistributesOver` at two instantiations) | `P`×2 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:1818` | `DistributesOver[\MinReductionN\] }` | A B: `DistributesOver[\MinReductionN\]` / `DistributesOver[\MaxReductionN\]` / `SumReduction` (via `DistributesOver` at two instantiations) | `P`×2 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:1828` | `DistributesOver[\SumReduction\],` | A B×2: `DistributesOver[\SumReduction\]` / `DistributesOver[\MinReductionN\]` / `DistributesOver[\MaxReductionN\]` / `ProdReduction` (via `DistributesOver` at two instantiations) | `P`×3 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:1829` | `DistributesOver[\MinReductionN\],  (* actually, we nee` | A B×2: `DistributesOver[\MinReductionN\]` / `DistributesOver[\SumReduction\]` / `DistributesOver[\MaxReductionN\]` / `ProdReduction` (via `DistributesOver` at two instantiations) | `P`×3 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:1830` | `DistributesOver[\MaxReductionN\]` | A B×2: `DistributesOver[\MaxReductionN\]` / `DistributesOver[\SumReduction\]` / `DistributesOver[\MinReductionN\]` / `ProdReduction` (via `DistributesOver` at two instantiations) | `P`×3 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `Library/FortressLibrary.fsi:2526` | `trait RelationalPredicateCondition[\E\] extends { Cond` | A: `RelationalPredicateCondition[\E\]` / `Condition[\()\]` | `EC`×1 | **states it**: `types-vals-vars.tex:212-214`; `traits.tex:218-224` forbids extending what you exclude | 1 |
| `LibraryBuiltin/FortressBuiltin.fsi:76` | `value object Int extends ZZ32` | A: `Int` / `ZZ32` (via `Integral` and 6 more at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `LibraryBuiltin/FortressBuiltin.fsi:79` | `value object Long extends ZZ64` | A: `Long` / `ZZ64` (via `Integral` and 6 more at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `LibraryBuiltin/FortressBuiltin.fsi:82` | `value object NN32 extends { StandardTotalOrder[\NN32\]` | A×2 B×2: `StandardTotalOrder[\NN32\]` / `NN64` / `NN32` (via `Integral` and 6 more at two instantiations) | `CC+P`×2 + `P`×2 | P: **contradicted**, `trait-parameters.tex:339-345`. CC: **nowhere** (`future.tex:269`, future work) | 2 · CC co-attributed 3 |
| `LibraryBuiltin/FortressBuiltin.fsi:110` | `value object UnsignedLong extends NN64` | A: `UnsignedLong` / `NN64` (via `Integral` and 6 more at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `LibraryBuiltin/FortressBuiltin.fsi:113` | `object IntLiteral extends { ZZ32 }` | A: `IntLiteral` / `ZZ32` (via `Integral` and 6 more at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |
| `LibraryBuiltin/FortressBuiltin.fsi:145` | `object BigNum extends ZZ end` | A: `BigNum` / `ZZ` (via `Equality` and 4 more at two instantiations) | `P`×1 | **contradicts it**: `trait-parameters.tex:339-345` | 2 |

Totals over the 64 errors: **`checkEC` 1, `checkCC` 29 (never alone), `checkO` 0,
`checkP` 61**. The 2 family E errors are not exclusion at all: they are the
comprises-clause well-formedness checks at `TypeHierarchyChecker.scala:203-208` and
`:209-212`, and they are in the table because the record counts them among these sites.

## 3. What fires, and why it is always the same thing

Across the whole run the shadow established **267 distinct exclusion facts**
(`exc-clauses.txt`, deduplicated): `checkP` appears in 254 of them, `checkO` in 106, `checkCC`
in 101, `checkEC` in 9. `checkO` does its work below the extends clauses — it is what makes an
object exclude a type that is not its supertype (`cO` is `pSub(s,t)` negated,
`TypeAnalyzer.scala:437-441`) — and at these 27 sites it never fires: at a family A site the
object *is* a subtype of the type it extends, and at a family B site neither of the two
supertypes is an object (`sites.tsv`). That is why the clause the specification states most
plainly (`types-vals-vars.tex:222-224`) accounts for none of the 62 errors.

The reason `checkP` fires everywhere is one property of the library's design, visible in the
`witnessP` column of `sites.tsv`: the algebra traits are parameterised by their own subject
type — `Equality[\T\]`, `StandardPartialOrder[\T\]`, `StandardMinMax[\T\]`, `StandardTotalOrder[\T\]`,
`Integral[\I\]`, `DistributesOver[\R\]`. So a **nested** tower necessarily inherits one of them
at two instantiations: `ZZ32 extends ZZ64` puts `Equality[\ZZ32\]` and `Equality[\ZZ64\]`,
`Integral[\ZZ32\]` and `Integral[\ZZ64\]`, and five more such generics among `ZZ32`'s ancestors
(`sites.tsv`: `Equality`, `Integral`, `StandardMax`, `StandardMin`, `StandardMinMax`,
`StandardPartialOrder`, `StandardTotalOrder`), and
`checkP` then declares `ZZ32` and `ZZ64` to share no value. `Equality` is the witness at 48 of
the 62 errors, `StandardPartialOrder` at 38, `Integral` at 17, `DistributesOver` at 13. Nothing
about the library's `comprises` or `excludes` clauses is needed for this: it follows from
extending a self-parameterised trait twice on one path.

Two minimal reproductions, both in the compiler's own world, no library variant involved:

* `MinP.fss` — `trait G[\X\] end`, `trait A extends G[\ZZ32\] end`,
  `trait B extends { A, G[\Boolean\] } end`. No `excludes` clause and no `comprises` clause
  anywhere in the file. **4 errors**, two family A and two family B, every one attributed
  `clause=P` (`17-MinP-stock.out`). With `checkP` relaxed: **0 errors, rc=0**
  (`17-MinP-dropP.out`). This is the tower's shape stripped to three traits.
* `SpecSelfInst.fss` / `SelfInst2.fss` — the specification's own example at
  `trait-parameters.tex:339-345` ("Trait declarations are allowed to extend other
  instantiations of themselves", `trait C[\S\] extends C[\T\] where {S extends T, T extends Object}`).
  The front end cannot even express it, for two reasons that are not `checkP`: as printed it
  gives `T is undefined` twice, because a where-clause variable is not in scope in an extends
  clause and the accepted spelling needs the explicit list the spec's grammar at `:290-293`
  does not have (`09a-spec-selfinst-asprinted.out`, `09-spec-self-instantiation.out`); and
  written with two static parameters instead, `trait C[\S,T\] extends C[\T,T\] end`, it is
  refused earlier still, as `Cyclic type hierarchy: Type C transitively extends itself`
  (the acyclicity checks, `TypeHierarchyChecker.scala:76-101` and `:103-135`), with or without `checkP`
  (`17-SelfInst2-stock.out`, `17-SelfInst2-dropP.out`). So the contradiction between `checkP`
  and that passage is real but cannot be demonstrated *on the spec's own example*: the example
  is unreachable in this front end. It is demonstrated instead on `MinP.fss`, the shape the
  library actually has, where the specification offers no rule that makes the two types
  exclusive at all — the exclusion sources it lists are an `excludes` clause
  (`types-vals-vars.tex:212-214`), object-ness (`:222-224`), propagation to subtypes
  (`:163-164`), and arrow, tuple, `()` and `BottomType` (`:215-216`). Two instantiations of a
  generic are not among them.

**One more thing the compiler's own prelude says.** `CompilerBuiltin.fss:1483` and `:1521` carry
the interpreter library's extends clauses **commented out** —
`(*) extends { Equality[\Comparison\] }` and
`(*) extends { Comparison, StandardTotalOrder[\TotalComparison\] }`, replaced by
`extends { Comparison }` — while keeping the two `comprises` clauses that
`FortressLibrary.fsi:102` and `:122` also have. Those are four of the 27 sites
(`.fsi:121` and the three objects at `:132`, `:143`, `:153`), and the compiler prelude passes
the checker with 0 errors (`09a-spec-selfinst-asprinted.out`, `checkApi CompilerBuiltin ->
errors=0`). So the compiler world does not avoid this by dropping `comprises` — it keeps both
clauses — but by **flattening the tower** so that no self-parameterised trait is inherited
twice. `MinP.fss` is the counterfactual: put a second instantiation back into a hierarchy in
that same world and the four errors appear. The lines are present in the
tree at the parentless import root `5a68404fd` (2012-07-19) and no commit message in the
available history explains them.

## 4. Bucket 1 — a rule the specification states fires, so the library is wrong

**3 errors at 3 sites.** One is the `excludes` clause; two are the comprises-clause
well-formedness checks, whose rule the specification states in a `\note{}`
(`traits.tex:231-241`) rather than in its body.

| site | error | the rule | the one-line fix | measured |
|---|---|---|---|---|
| `FortressLibrary.fsi:373` (reported at `:409`) | E: `QQ` has `comprises ...` and `AnyIntegral`, declared in the same api, extends it | `traits.tex:236-241`: with `comprises ...` in an api, other traits may extend it "but these traits may not be declared or imported by the API" | `.fsi:373` `comprises { ... }` → `comprises { AnyIntegral }` | **93 → 92**, and the interpreter is unaffected: `ArrayScalarExtension.fss` and `Generator2Test.fss` both cold-run byte-identically to the control (`18-lib-L1b.out`, `20-interp-L1b-*.out` against `15-interp-L0-*.out`) |
| `FortressLibrary.fsi:2526` / `.fss:4444` | A: `RelationalPredicateCondition[\E\]` excludes `Condition[\()\]` but extends it, `clause=EC` | `traits.tex:222`: if T excludes U, "neither can extend the other" | drop ` excludes Condition[\()\]` | the checker error goes (**92 → 91** with the row above, `04-lib-L1a.out`) **but the interpreter then refuses to load the library**: the two `ANDCOND` declarations at `.fss:1247` and `.fss:4467` become an illegal overloading, "are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present" (`16-interp-L1a-*.out`) |
| `FortressLibrary.fsi:411` | E: `AnyIntegral` has a `comprises` clause but its immediate subtype `Integral` is not eligible to extend it | `traits.tex:231-235`: the listed traits "are exactly the traits that immediately extend T" | drop ` comprises { ZZ }` from `AnyIntegral` (`.fss:612` / `.fsi:409`), the 2026-09-19 commit `02d09a39f` reverted | **91 → 90** (`05-lib-L1.out`) **but the interpreter then refuses to load the library**: the generic scalar block at `.fss:4503` against `StandardTotalOrder.MAX` at `.fss:280` loses its only excluding pair (`14-interp-L1-*.out`) — the known cost, item 14 |

**So bucket 1 is one free fix, not three.** Only the api's ellipsis is a one-line library edit
with no other consequence: **93 → 92**, both interpreter tests green. The other two errors are
each load-bearing for the *interpreter's* overload check, which never validates what it relies
on (`interpreter/evaluator/BuildEnvironments.java:887-890` stores a `comprises` clause and checks nothing;
`FTypeTrait.java:50-78` the same). This corrects the record, which treats `:2526` as "a defect on
anybody's reading" (`two-libraries.md` §3) and step 1 of the judgement budgets it as a rung
beside families C, D and F. Measured, removing it costs `Generator2Test.fss`, which `ant testSystem` runs
(`ProjectFortress/TEST-RESULTS/system-0/TEST-com.sun.fortress.tests.unit_tests.SystemJUTest.txt`
names it), so the rung has to re-shape the `ANDCOND` pair (rename one, or give it a
parameter type that the Subtype or Meet rule separates) rather than delete one clause.
`:411` is item 14's decision, already costed on 2026-09-20 and unchanged by this trace.

## 5. Bucket 2 — the clause the specification contradicts fires, so the checker is wrong

**61 errors at 26 sites** — every family A/B error except the one at `:2526`. `checkP` fires at
all 61; at 29 of them `checkCC` fires too (see bucket 3, which shows that it is never the cause).

**What relaxing it takes.** One line, in one function: the fourth disjunct of `pExcInner`'s
trait/trait case (`scala_src/types/TypeAnalyzer.scala:443-456`) must not contribute when the
question is "do these two definitely exclude". The shadow does it by returning `pFalse()` from
`checkP` when `negate` is false (`shadow-src/…/TypeAnalyzer.scala:538-539`). Deleting `checkP`
outright is not available: under `negate = true` the same clause is what `notExcludes`
(`:367-370`) uses to emit the equality constraints static-argument inference depends on, in the
team's own words at `:361-365`.

**Measured.**

| library | clauses | errors | capture |
|---|---|---|---|
| tracked | as shipped | 93 | `01-baseline-trace.out` |
| tracked | `checkP` relaxed | **33** | `02-dropP.out` |
| tracked | `checkP` relaxed at the two `TypeHierarchyChecker` call sites only | **33**, same three residual sites | `12-hierarchyOnly.out` |
| bucket 1's free fix | `checkP` relaxed | **32** | `19-lib-L1b-dropP.out` |
| all three bucket-1 edits | `checkP` relaxed | **30** | `06-lib-L1-dropP.out` |

**Two consequences the relaxation has, both measured.**

1. It brings the checker's relation into line with the interpreter's. The interpreter's
   exclusion (`FType.java:196-297`) is: both types non-extensible; an explicit `excludes`,
   transitively closed; non-extensible and not a supertype; an excluded supertype; and, last,
   every pair of transitive `comprises` leaves excluding (`:281-297` with
   `FTypeTrait.computeTransitiveComprises:68-78`). There is **no instantiation clause** — the
   designers' survey says the same ("two instantiations of `Array` are neither ordered nor
   excluding", `run-c4/cold-cache/operators/D/SURVEY.md`). `checkP` is exactly the clause the
   checker has and the interpreter does not.
2. It **unmasks one real library defect**, which the spurious exclusions were hiding:
   `FortressLibrary.fsi:789` declares `Condition[\E\].map[\G\](f: E->G): Generator[\G\]` while
   the `SequentialGenerator[\E\].map` it overrides (`:762`, `Condition` extends it at `:770`)
   returns `SequentialGenerator[\G\]`. That error is absent from the 93 and present in every
   relaxation capture; it is the same covariance violation as family F's `List.fsi:99`. So the
   93 is not a floor. How the exclusion masked it was not traced; the plausible route is
   `normConjunct`, which drops comprised members the checker holds to be excluded
   (`TypeAnalyzer.scala:632-639`).

A rung would also have to decide where the relaxation goes, because the narrow and the broad
placements differ in what else they touch, even though they agree on this library's count.
`definitelyExcludes` is called from the two hierarchy checks (`TypeHierarchyChecker.scala:178,
187`), from `CoercionOracle.scala:78,82` and from `Formula.scala:189,191,295,304,307`, and
`excludes` from `OverloadingChecker.scala:478,491` — the Incompatibility Rule's certificate. A
relaxation inside `pExcInner` weakens that certificate too, which is the direction the
interpreter already takes; a relaxation at the two hierarchy call sites leaves overload
checking with the strong rule and so keeps the checker accepting overloadings the interpreter
refuses. Both give 33 here (`02-dropP.out`, `12-hierarchyOnly.out`).

## 6. Bucket 3 — the comprises-derived clause fires, where the specification is silent

**29 errors at 10 sites** (`.fsi:121, 373, 409, 411, 437, 464, 498, 536, 833` and
`FortressBuiltin.fsi:82`), and at **every one of them `checkP` fires as well**. The
specification states no rule that derives exclusion from a `comprises` clause; the nearest text
is `appendices/future.tex:269-284`, which lists "identifying the intersection of any two types
with `comprises` clauses with the union of their common subtypes" as **future work** and whose
own commented example has `trait V extends {S, T}` where both `S` and `T` carry `comprises`
clauses, with no error implied.

**The measurement that decides how much this decision is worth.** `checkCC` causes none of the
93.

| variant | errors | capture |
|---|---|---|
| `checkP` relaxed | 33 | `02-dropP.out` |
| `checkP` **and** `checkCC` relaxed | 33, error list byte-identical | `03-dropP-dropCC.out` |
| every `comprises` clause removed from the library (31 clauses, 16 declarations) | **91** — only the 2 family E errors go; all 62 family A/B site lines still fire, 61 `clause=P` and 1 `clause=EC` | `07-lib-L2-nocomprises.out` |
| the same library, `checkP` relaxed | 31 | `08-lib-L2-dropP.out` |

So `checkCC`'s contribution is an artefact of its own recursion: `cCC` asks `pExc` of the
leaves (`TypeAnalyzer.scala:432`), and that inner question is itself answered by `checkP`.
**Bucket 3 is not on the critical path for the 93.** The decision it is a live decision for is
the library's own derivation, on the interpreter side, and that is what the two options cost.

**(i) Keep deriving exclusion from the `comprises` lists.** What it takes, in the brief's terms
— "the checker must accept what the interpreter accepts":

* Nothing for the exclusion relation. The checker already derives it (`checkCC`,
  `TypeAnalyzer.scala:429-435`), and once `checkP` is relaxed the two relations have the same
  ingredients (bucket 2, consequence 1) — an explicit `excludes` transitively closed,
  object-ness, and `comprises`-leaf pairing whose leaves are objects. This does not prove the two
  relations equal; what is measured is that `checkP` is the one ingredient the checker has and the interpreter
  has not.
* Two comprises-clause *shapes* the checker refuses and the interpreter accepts, the two family
  E errors: **1 api line** for the ellipsis (measured free, bucket 1), and the closure at
  `:411`, for which **no spelling exists** — measured on 2026-09-20: put the clause on
  `AnyIntegral` and `Integral` is not eligible; put it on `Integral[\I\]` instead and the
  upward check moves the error to `ZZ` at `.fsi:536`, count unchanged at 93
  (`reviews/library-scalar-extension-review-probes.md`, `checker-diagnostics-diff.txt`). The
  honest version of the clause is `comprises { Integral[\I\] where [\I\] }`, a form the grammar
  does not have; the library says so three times in the team's voice (`FortressLibrary.fss:1296,
  :1373, :1588-1589`, "NOT YET: comprises … where …"). So option (i) costs **1 api line plus
  either a relaxation of `isEligibleToExtend` (`TypeHierarchyChecker.scala:254-266`, one clause:
  accept a generic immediate subtrait whose own bound makes it a subtype of a listed type) or a
  `comprises … where` form in the grammar and the AST**. Sites touched in the library: 1.
* Cost in lines: 1 library line + 0 checker lines (relation) + ~5 checker lines
  (`isEligibleToExtend`) or a grammar change. Sites: 1 library declaration, 1 checker function.

**(ii) Stop relying on derived exclusion; write explicit `excludes` clauses, the compiler
prelude's style.** Measured, this does not work, and the reason is not a detail.

* Declarations touched: **31 `comprises` clauses on 16 declarations** — 16 clauses in
  `FortressLibrary.fss` (`Comparison`, `TotalComparison`, `Number`, `RR64`, `QQ`, `AnyIntegral`,
  `ZZ32`, `ZZ64`, `NN64`, `ZZ`, `Maybe`, `UniqueItem`, `Exception`, `ReadableArray1`,
  `PossibleReductionPair`, `PairGenerator`) and the same 15 minus `PairGenerator` in
  `FortressLibrary.fsi`. `FortressBuiltin` has none. For comparison, the compiler prelude's
  style is 20 `excludes` clauses in `CompilerBuiltin.fss` and 20 in its api, on a flat tower
  (the numeric ones at `:512, 573, 658, 749, 814, 878, 926, 987` — `trait ZZ32 extends
  { Number, … } excludes { ZZ64, RR32, RR64 }`, which is only writable because its `ZZ32` does
  not extend its `ZZ64`).
* **Does the interpreter still load the generic scalar block? No.** With the 31 clauses removed
  and nothing else changed, `ProjectFortress/tests/ArrayScalarExtension.fss` fails from a cold
  cache in 14 s with a `ProgramError`: `MAX[\T extends Number,I\](x:Array[\T,I\],y:T)`
  (the copy's `:4494`, the tree's `FortressLibrary.fss:4503`) against
  `StandardTotalOrder[\T\].MAX(self,other:T)` (the copy's `:278`, the tree's `:280`)
  "have parameters with generic type, at least one pair of parameters must have excluding
  types" (`10-interp-L2-ArrayScalarExtension.out`; `OverloadedFunction.java:492-498, :527`).
  The control, the same shadowing with the tree's own library, prints its 24 checks and exits 0
  in 12 s (`11-interp-L0-control.out`).
* **And no `excludes` clause can replace it.** The fact the block needs is between the *bound*
  `Number` of its own type parameter and the symbolic instantiation `StandardTotalOrder[\T'\]`
  of the method's — `future.tex:264-265`'s open question, as
  `postmortem-2026-09-19/library-findings-explained.md` §4 sets out. `Number` extends
  `StandardMinMax[\Number\]` and `StandardPartialOrder[\Number\]` (`FortressLibrary.fsi:276-277`),
  so `Number excludes` any of those traits is false, and stating it would be caught by
  `checkEC` as a family A error — the very error this trace attributes to `:2526`. Option (ii)
  therefore does not reduce to writing clauses: it requires flattening the tower, which is the
  compiler prelude's design and, in the review's words, "far less expressive"
  (`reviews/library-scalar-extension-review.md` §6 of change 3).

## 7. Buckets 1 and 2 together, on one library copy

Bucket 1's free fix plus bucket 2's one line: **93 → 32** (`19-lib-L1b-dropP.out`). The 32 are
**26 family C** (the `RangeInternals.fsi` static-parameter bounds), **2 family D** (`String`'s
doubled `split`/`splitWithOffsets`), **2 family F** — `List.fsi:99` and the newly unmasked
`FortressLibrary.fsi:789` — and **2 that bucket 1 named but cannot fix for free**: the
`excludes Condition[\()\]` at `:2526` and the closure at `:411`. Not one of the 32 is an
exclusion question. With all three bucket-1 edits applied instead, **30**
(`06-lib-L1-dropP.out`), at the price of a library the interpreter will not load.

Against the judgement's step 1 forecast ("93 → 63 at 23 sites" after families C, D, F and
`:2526`): the exclusion families are 61 of the 93, not 27 sites' worth of separate work, and one
checker line moves more of the count than every library edit in the plan.

## 8. What this does not settle

* **Whether the relaxed checker is still sound.** Dropping `checkP` in the positive direction
  only makes `excludes` and `notExcludes` no longer complementary: `definitelyExcludes(List[\ZZ32\],
  List[\Boolean\])` becomes false while `notExcludes` still emits `$i=$j`. Nothing here measures
  what the inference path does with that. The gate for the rung is the full suite, which this
  session did not run.
* **Whether the overload checker then accepts the library.** It never got that far: it crashes
  on `NativeArray` at `STypesUtil.scala:557` for want of `nat` parameters, in every capture. So
  "the checker accepts what the interpreter accepts" is shown here only for the exclusion
  relation, not for the Incompatibility Rule the generic scalar block actually needs.
* **How the spurious exclusions masked `FortressLibrary.fsi:789`.** Measured, not traced.
* **The narrow-versus-broad placement of the relaxation.** Both give 33 on this library; what
  they do to coercion (`CoercionOracle.scala:78,82`), to constraint solving
  (`Formula.scala:189-307`) and to overload checking (`OverloadingChecker.scala:478,491`) is not
  measured.
* **`checkP` under `int`, `nat` and `bool` arguments.** `cP` compares `STypeArg`s only and
  returns `pFalse()` for every other kind (`TypeAnalyzer.scala:448-452`, the team's own
  "Todo: Handle int, nat, bool args"), so nothing here says how it will behave once PLAN step 4
  lands. The 27 sites are all type arguments.
* **The specification's own example.** It cannot be put through this front end at all
  (§3), so `trait-parameters.tex:339-345` is cited here as text, not as a passing test.
* **Bucket 1's third fix, and bucket 3's option (ii), beyond two tests.** The interpreter
  failures were measured with `ArrayScalarExtension.fss` and `Generator2Test.fss` from cold
  caches, not with `ant testSystem`; a rung needs the suite.
* **Whether `:2526`'s repair is small.** The trace shows the clause is load-bearing and names
  the pair it serves (`.fss:1247` against `:4467`); it does not design the replacement.

## 9. The captures

`exclusion-trace/run-all.sh` runs everything below in order; `make-variants.py` builds the
library copies; the shadow sources are in `shadow-src/`, and the shadow classes are build
products, not committed — `run-all.sh` compiles them. The captures have had their `@@EXC` lines
stripped after the fact and the scratch directory rewritten as `<probe>`, so they stay small;
`exc-clauses.txt` holds the deduplicated `@@EXC` set from run 01, and `sites.tsv` the `@@SITE`
lines with the long `witnessP` field reduced to the set of generic names.

| capture | what it is |
|---|---|
| `01-baseline-trace.out` | the tracked library, clauses as shipped: 93 errors, 64 site lines |
| `sites.tsv` | one row per family A/B/E error: family, site, types, clause, and the generics `checkP` found at two instantiations |
| `exc-clauses.txt` | the 267 distinct exclusions the baseline run establishes, with their clauses |
| `02-dropP.out`, `03-dropP-dropCC.out` | `checkP`, then `checkP`+`checkCC`, relaxed: 33 and 33 |
| `12-hierarchyOnly.out` | the relaxation confined to the two `TypeHierarchyChecker` call sites: 33 |
| `18-lib-L1b.out`, `19-lib-L1b-dropP.out` | bucket 1's free fix: 92, and with bucket 2: 32 |
| `04-lib-L1a.out`, `05-lib-L1.out`, `06-lib-L1-dropP.out` | plus `:2526`: 91; plus the closure: 90; with bucket 2: 30 |
| `07-lib-L2-nocomprises.out`, `08-lib-L2-dropP.out` | every `comprises` clause removed: 91, and 31 |
| `10-interp-L2-…`, `11-interp-L0-control.out` | the interpreter under option (ii) and the control |
| `14-interp-L1-*.out`, `16-interp-L1a-*.out`, `20-interp-L1b-*.out`, `15-interp-L0-*.out` | the interpreter under each bucket-1 variant, and the control |
| `17-MinP-*.out`, `MinP.fss` | the three-trait reproduction of `checkP`: 4 errors, 0 relaxed |
| `09-spec-self-instantiation.out`, `09a-…`, `SpecSelfInst.fss`, `17-SelfInst2-*.out`, `SelfInst2.fss` | the specification's own example, twice refused, and by what |

One run is missing: `13-lib-L1-hierarchyOnly.out` did not finish inside 900 s and was dropped.
The hierarchy-only variant needs `-Dfortress.analyzer.excludes.cache=false`, because its switch
is dynamic, and that made the run too slow on that variant; the same variant on the tracked
library did finish (`12-hierarchyOnly.out`).
