<!-- Zero errors and zero crashes from the compiler's checker over the interpreter's library, measured 2026-09-22 by a delegated worker on Pavol's
ask.  Nothing tracked was modified: three classpath shadows stack -- nat/shadow.patch's eight Scala sources (the eighth,
TypeHierarchyChecker.scala, and the checkP switch in TypeAnalyzer.scala are this probe's and OFF by default, so REPORT.md's and followup.md's
captures reproduce unchanged), java/java-shadow.patch's two, and zero/java-shadow-add.patch's one; library edits are made on copies in a
scratch directory via Shell.sourcePath (Shell.java:1175-1188), every run with its own caches outside the repository.  Commands:
zero/run-all.sh.  Captures: zero/. -->

# Zero

| | before | after | capture |
|---|---|---|---|
| whole-unit errors (the apis: the record's 93, followup's 115) | 115 | **173**, or **44** without § 3 | `zero/04-wf-counts.txt` |
| declarations that crash the checker | 5 of 446 | **0 of 447** | `zero/07-fates-5x-perdecl-ZALL3.txt` |

**The short answer.** The crashes are four checker defects that hit any user program; the library routes around them for seven written tokens,
and `Character` needs three lines of Java. The errors do not reach zero, for a structural reason: the checker's low counts come of *stopping
early* — `StaticChecker.checkCompilationUnit` returns before the overloading checker whenever an earlier error exists
(`compiler/StaticChecker.java:268-272`). Batch 3's five library fixes unmask 43 errors by themselves, and the last hierarchy error,
`FortressLibrary.fsi:2526`, gates the `FortressLibrary` api's overloading check outright: repair it, as § 3 does, and that api goes from 2 errors
to 260.

## 1. The five crashes

| site | the checker's throw | the library's shape |
|---|---|---|
| `.fss:1121` `__bigOperator` | `NodeUtil.getParamType` (`nodes_util/NodeUtil.java:339`, `bug`) from `STypesUtil.makeArrowFromFunctional` (`useful/STypesUtil.scala:157-161`) | `body(i): L = …` at `:1123` |
| `.fss:2292` `Array2`, `:2665` `Array3` | `STypeEnv.extractNodeBindings` (`typechecker/staticenv/STypeEnv.scala:189-191`, `throw TypeError.make`) from `extend` (`:56`) | `row(i) =` at `:2301`; `row(i,k) =`, `plane(k) =` at `:2678`, `:2683` |
| `.fss:4176` `strToInt`, `:4195` `strToFloat` | `TypeAnalyzer.typeCons` (`types/TypeAnalyzer.scala:710`, `throw`) from the normalizer's `walkTraitTypeInner` (`:552-558`) | a character literal, typed `FortressBuiltin.Character` |

**The untyped parameter is a checker defect the tree already had for any user program.** Three one-declaration probes in the compiler's *own*
world (`zero/01-untyped-params.out`): a top-level `g(i) = i` gives `Missing parameter type for i`, a local `g(i): ZZ32 = i` gives `.fss:1121`'s
own `** bug! … Type is not inferred.`, a local `g(i) = i` `** bug! Result of typechecking still contains intermediate nodes.` A plain binding
with no declared type is ordinary Fortress (`Specification/basic/functions.tex:136`; local declarations use the same syntax, `:563-565`) and the
chapter that would say what it means is a stub (`basic/inference.tex:15`). The honest checker fix is inference, not five lines — `getParamType`
runs while the function index is built, before any environment exists, and `extractNodeBindings` has no error log. **The fix measured is the
library's**: `body(i:I)`, `row(i:ZZ32)`, `row(i:ZZ32,k:ZZ32)`, `plane(k:ZZ32)`.

**Writing them is not quite enough; the residue is a fourth checker defect.** `Array3` then crashes anew with `** bug! TryChecker returned an
untyped expr: FnExpr … fn (k) => do … plane(k) end` at `typechecker/STypeChecker.scala:602` from `inferFnExprParams`
(`impls/Functionals.scala:337-352`), on the lambda `for k <- seq(1#(s2-1))` desugars to. Leaving `plane`'s parameter untyped does not avoid it
(`zero/07-fates-5x-perdecl-ZALL2.txt`); a declared return type `: ()` on the three local functions does.

**`Character` is the checker's, fix three lines.** `Types.CHARACTER` is `static final` and names `Character` in whichever api `fortressBuiltin()`
held at class initialisation (`compiler/Types.java:65`); `trait Character` exists only in the compiler's prelude
(`LibraryBuiltin/CompilerBuiltin.fss:1059`), the interpreter's is `value object Char` (`LibraryBuiltin/FortressBuiltin.fsi:151`), and
`Types.useFortressLibraries()` (`:83-88`) re-points `STRING`, `JAVASTRING`, `EXCEPTION`, `CHECKED_EXCEPTION` and not this one. Dropping `final`
and one line in each switch is `zero/java-shadow-add.patch`: `zChar.fss`, `println('x'.codePoint)` in the interpreter world, goes from **1 error
to 0** (`zero/02-char-ab.out`) and the library's crashes go **5 → 3** (`zero/07-fates-50-perdecl-charfix.txt`).

## 2. The closure's accommodation

**The five-line relaxation** is one disjunct in `isEligibleToExtend` (`typechecker/TypeHierarchyChecker.scala:254-266`): a generic immediate
subtrait is accepted. On the tracked library **115 → 114**, the error sets differing in exactly one entry, the `Invalid comprises clause: …
AnyIntegral … its immediate subtype Integral is not eligible to extend it` at `FortressLibrary.fsi:411`; with `checkP` relaxed too, **55 → 54**,
the same one entry (`zero/04b-elig-diff.txt`). **What it now accepts and should not:** `zElig.fss` — `trait S comprises { A }`, `trait A extends
S`, `trait B[\X\] extends S` — whose list is plainly false, a `B[\ZZ32\]` being an `S` and no `A`; the stock checker reports it, the broad
relaxation does not (`zero/03-elig-probe.out`).

**How narrow it can be.** Not "every instantiation of the generic subtrait is below a listed type": *no* instantiation of `Integral[\I\]` is a
subtype of `ZZ`, so that refuses the library too. What holds is one level lower — every trait the table knows that immediately extends `Integral`
(`ZZ`, `ZZ32`, `ZZ64`, `NN64`, `NN32`) is below `ZZ` — and decidable. As `everyKnownSubtypeListed` over `TypeAnalyzer.traits` (14 lines, behind
`-Dprobe.zero.eligibleNarrow=true`) it gives a count and an error list **byte-identical** to the broad relaxation's, **still catches**
`zElig.fss`, and accepts `zElig2.fss`, where the list is true of every value: the rule to land.

## 3. The `Condition[\()\]` site

`trait RelationalPredicateCondition[\E\] extends { Condition[\()\] } excludes Condition[\()\]` (`FortressLibrary.fsi:2526`, `.fss:4444`) is what
makes the two `ANDCOND` declarations a legal overloading for the interpreter: `opr ANDCOND[\I\](p1:I->Condition[\()\], …)` (`.fss:1248`,
`.fsi:801`) against `opr ANDCOND[\E\](p: Generator[\E\]->RelationalPredicateCondition[\E\], …)` (`.fss:4467`, not in the api). Two *generic*
declarations are legal only when one parameter pair excludes (`OverloadedFunction.java:434-437`, `:492-498`) and arrow exclusion is range
exclusion alone (`FTypeArrow.java:92-96`), so the only pair available is `Condition[\()\]` against its own subtype.

**The repair.** Make the second declaration a plain function `andRelCond`, no longer an overload, and choose between the two by typecase — as
`Library/Generator2.fss:88-93` already recognises a relational predicate — inside a private `andCondCombine` used at the two call sites whose
domain is a `Generator` (`.fss:4425`, `:4427`): one renamed declaration, one ten-line function, two call sites, two dropped words, `.fss` only.
Both halves measured (`zero/05-interp-piece3.out`): the interpreter loads the library, `Generator2Test.fss` and `ArrayScalarExtension.fss`
cold-run byte-identical to the control, a `println` in each branch shows `andCondCombine` taking the relational branch exactly once in
`Generator2Test`'s third block, and the checker stops reporting `:2526` (115 → 114); dropping the clause alone makes the interpreter refuse the
library.

**Two cheaper candidates, refused by measurement.** Narrowing the first `ANDCOND` to `I->Boolean` separates the two (a value object excludes what
it does not extend, `FType.java:229-245`) and passes both tests, but `zFilter.fss`, two chained `Maybe[\()\]` filters, dies with `Failed to find
any matching overload` at `.fss:3442`; deleting the second `ANDCOND` passes both tests too, but `zRel.fss` shows `relational(p1 ANDCOND p2)`
turning `true` → `false`, the fusion silently gone.

**What the repair costs the checker.** That family A error was the last one in the `FortressLibrary` api and it gated the api's *own* overloading
check. With it, `checkApi FortressLibrary -> errors=2` and the count is **44**; without it the check runs for the first time, the api reports
**260** and the count is **173** (`zero/06c-wf-ZALL3-relaxed.out` against `zero/06b-wf-ZLP-relaxed.out`, which differ by this one edit). The
repair meets both of the brief's conditions and moves the count the wrong way.

## 4. Everything applied

Both switches, `Types.CHARACTER`, batch 3's five plain defects (`RangeInternals.fsi`'s 42 `AnyIntegral` bounds and two unbounded declarations,
`trait String`'s duplicated pair, `List.fsi:99`, `FortressLibrary.fsi:789`, `.fsi:373`'s `comprises { ... }`), § 1's seven tokens and § 3's
repair: `make-lib.py`'s variant `ZALL3`.

| library | switches | errors | by kind |
|---|---|---|---|
| tracked | — | 115 | 36 A, 26 B, 26 C, 2 D, 2 E, 1 F, 22 `fill` overloading (`.fsi:1297-1369`, the nat shadow's own) |
| batch 3's five | — | 124 | −31 of the above, +40 overloading, +3 covariance |
| + § 1's tokens (`ZLP`) | `dropP`+`eligibleNarrow` | **44** | 40 overloading, 3 covariance, 1 × `:2526` |
| + § 3's repair (`ZALL3`) | `dropP`+`eligibleNarrow` | **173** | 149 overloading, 24 covariance |

Per declaration, `ZALL3` takes the component from 287 clean / 154 with errors of their own / 5 crashed to **304 / 143 / 0** (447 declarations, §
3's repair adding one). **Errors after: 173, or 44 without § 3. Crashes after: 0.** In the way of zero: (1) **the overloading and return-type
rules have never run on this library** — both behind that early return, and reached they answer 149 and 24, 71 of the 149 under `fill`
(`.fsi:1297-1369`), 19 `FORWARD_CMP`, 12 `CAP`; (2) **batch 3's L rung is not −30 but −31 +43**, so its "count after the batch: 2" is not
reachable as written and the batch lands at 44; (3) **`NativeArray`'s 44 and `RangeInternals`'s 42** stay separate api rows, not in the headline.

## 5. What this does not settle

* **The suite.** `build.xml` builds the test classpath from `ProjectFortress/build`, so no shadow is on it; the interpreter evidence is two
  tests and three probes, cold, not `ant testSystem`; and the count with `checkP` relaxed alone is 55 (`zero/04-wf-counts.txt`).
* **The 173 were not triaged** — library defects, checker defects, or the `checkP` relaxation weakening the Incompatibility Rule's certificate
  (`exclusion-trace.md` § 8's open question). The *narrow placement* of that relaxation, at the two `TypeHierarchyChecker` call sites, is batch
  3's own recommendation, leaves overload checking the strong rule, and is the first thing to try against them.
* **No checker defect of § 1 was fixed in the checker**, only routed around; the library edits stand in for the L rung's (`Condition.map`'s
  return type is that rung's call, and mine costs 2 of the 40 new errors); and `andCondCombine` was measured on one relational pair, a mixed pair
  taking the plain branch untested.
