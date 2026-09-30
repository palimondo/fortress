# Skeptic: rung C, the return-type rule and the positional rule (climb batch 7b), second judgement

*Gather's note (climb batch 7b): the provisional ledger rows 534 to 541 are cited by their final numbers, 536 to 543, as the gather assigned them in manifest order.*

**Verdict: approved, with three required corrections.** The repair round did what the judge's ruling asked. D1, the refusal ground, is repaired: a kept static parameter's bound is now read with the forced parameters' solutions (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:107-110`), and `OverloadBoundNamesForced` fails on the pre-repair head with the kind-environment error and passes at the head. D4 is repaired by one case in `listed` (`:215`), and `ComprisesMeetFunctionalMethod` fails on the pre-repair head with "Invalid overloading of tag" and prints `tag(s) =  3` at the head, its control still refused. D2, D3, D5 and D6 each have an `XXX` compile test that the harness counts as an expected failure, and each goes red on a stand-in where its defect's shape no longer fails. The whole of `compiler_tests/` (913) and `library_tests/` (86) pass at the head, and the count (77) and distance (626) tables are the first build's, site for site. My own probes of the two repaired constructs found no wrong answer. The corrections are a miscount in the sibling count, a citation off by one line, and one sentence of scope for functional methods that rung S's text must match. None is a reason to refuse.

This page is the second judgement. The first, which refused once on D1, follows it unchanged.

## What I inherited and what I ran

The branch at `e7c5dab6f`: the first pass's commits, my first judgement (`6545e19c4`), the judge's ruling (`43740c8fb`), the repair round's tests alone (`e2e4d2f32`), its edit and home-2 tests (`8341b87f5`), and three record commits. The worktree was clean; `tmp/rung-return-type-rule/skeptic2/` was empty. Nothing of this round was taken from the worker's logs; every result below is from my own runs, `FORTRESS_THREADS=1`.

Two builds, each `ant compileAll` and then the library cache rebuilt from empty in library order:
- **pre-repair**: `OverloadingOracle.scala` checked out from `43740c8fb` (the only source file the repair changed, `git diff --stat 43740c8fb e7c5dab6f -- ProjectFortress/src`), compileAll 22 s, AnyType 15 s, CompilerBuiltin 67 s, CompilerLibrary 26 s, CompilerAlgebra 2 s, CompilerSystem 1 s, each exit 0; the rebuilt `OverloadingOracle` classes do not call `replaceStaticParam`.
- **head**: the file restored from HEAD, compileAll 21 s, then 16 s, 68 s, 28 s, 1 s, 2 s, each exit 0; `OverloadingOracle$$anonfun$4.class` calls `replaceStaticParam`.

## Check 1: the briefing

Read whole, four parts, as in the first judgement; with it the rung's section of `explorations/coordinator/CLIMB-BATCH-7.md` (decisions, files, stops), `Specification/advanced/overloading.tex:247-275` and `:360-447` (the Meet Rules for functions, dotted methods and functional methods, and the mixed-family sentence), and the ruling in `JUDGE.md`.

## Check 2: the provenance block

Every line opened at the head (`OverloadingOracle.scala` read from `git show HEAD:`, since my pre-repair build had the file checked out):
- `problem:` `explorations/compile-ladder/rung-nat-checker/probes/SubOvSwapTRun.fss:9` is `sub[\U, V\](m: ZZ32): Dn[\V, U\] = Dn[\V, U\](x + m)`. Right.
- `spec:` `Specification/basic/overloading.tex:100-107` is the sentence answer 9 removes ("it is an error for their static parameters to differ"). Right.
- `precedent:` `OverloadingOracle.scala:92-100 at 811053f15` is rung N's `escaped` block and `nsp1` there. Right; the first judgement's correction 7 is made.
- `deviation:` `OverloadingOracle.scala:133-152` is `forcedArgs`; `:161-175` is `satisfiesPositionalRule`; `OverloadingChecker.scala:552-555` is the positional rule's error; `OverloadingOracle.scala:177-239` is the comment and `coversOverlap`; `TypeAnalyzer.scala:645-655` is `normConjunct`; `Functionals.scala:686-693` is `tieType` and `callType`. Each says what the line says. Four deviation lines where the format asks for one, kept by the judge.
- `historical:` the three files of the 2012 tree the diff edits. Complete.

## Check 3: the failure, seen by me

Pre-repair build, the repair round's seven tests, `ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic2-pre ProjectFortress/compiler_tests OverloadBoundNamesForced.test ComprisesMeetFunctionalMethod.test XXXComprisesMeetFunctionalMethodUncovered.test XXXCoverageReturnMethodCall.test XXXCoverageReturnInferred.test XXXOverloadReturnObjectDomain.test XXXCoverageReturnGenericFamily.test`:

    . compile ProjectFortress/compiler_tests/OverloadBoundNamesForced ProjectFortress/compiler_tests/OverloadBoundNamesForced.fss:10:6-7:
    X$7 is not in the kind env [Y$8 -> KindBinding(Y$8,Y$8 extends Box[\X$7\])][][]
        Invalid overloading of tag in component ComprisesMeetFunctionalMethod:
     OK Saw expected exception
    Tests run: 11,  Failures: 6,  Errors: 0

The six failures are the compile, link and run of the two home-1 tests; the control and the four home-2 tests are counted as expected failures (`Saw expected failure` four times, `OK Saw expected exception` once). As the report quotes.

Head build, the rung's 36 `.test` files in one JVM (`ONE_JVM=1 ... junit.sh skeptic2-head36 ProjectFortress/compiler_tests <the 36>`):

    . run ProjectFortress/compiler_tests/ComprisesMeetFunctionalMethod (289ms) tag(s) =  3
    . run ProjectFortress/compiler_tests/OverloadBoundNamesForced (473ms) plain
    OK (56 tests)

Head build, all 486 `.test` files of `compiler_tests/` in one JVM, then all 23 of `library_tests/`: `OK (913 tests)` (`Time: 325.316`) and `OK (86 tests)`.

The first pass's failure on the base (`Tests run: 45,  Failures: 18`) I saw in the first judgement; this round's two home-1 tests are the ones owed a failing run, and I saw it.

The home-2 keys going red. The batch's first `XXX` test keyed on an exception, and the three keyed on messages, each run through the harness on a stand-in where its defect's shape no longer fails: `XXXCoverageReturnMethodCall` with the methods called through `takeLeft`/`takeRight` (the worker's stand-in), `XXXCoverageReturnInferred` with `y = choose(m)` in place of `pass(choose(m))`, `XXXOverloadReturnObjectDomain` without the generic `ident`, `XXXCoverageReturnGenericFamily` without the generic `choose`. `ONE_JVM=1 ... junit.sh skeptic2-standin tmp/rung-return-type-rule/skeptic2/standin <the four>`:

     Saw failure, but did not satisfy compile_exception_contains; expected
     Saw failure, but did not satisfy compile_err_contains; expected
    Tests run: 4,  Failures: 4,  Errors: 0

The last stand-in compiling also shows that the generic member alone keeps `XXXCoverageReturnGenericFamily`'s family out of the intersection typing, as D6 says.

## Check 4: the diff

The repair round changed one source file, `OverloadingOracle.scala`, 7 lines in and 4 out:
- D1: `str` is built from the forced parameters first, and `kept` is `forced.collect { case ((p, _), false) => str.replaceStaticParam(p) }` (`:107-110`). With `replaceStaticParams` false (`ProjectFortress/src/com/sun/fortress/compiler/typechecker/StaticTypeReplacer.java:65`), `replaceStaticParam` (`:117-119`) visits `NodeUpdateVisitor.forStaticParam` (`ProjectFortress/src/com/sun/fortress/nodes/NodeUpdateVisitor.java:5532-5540`), which rebuilds the extends clause through the replacer and keeps the name, which is not in the replacer's map. The escaped sizes still read `staticParamToArg(p)` of the original parameter, whose name the copy keeps. Nothing else in the function moved.
- D4: `case ts: TraitSelfType => listed(ts.getNamed)` (`:215`) and a comment. A value of `S & {U, V}` is a value of `S`, so cutting it by `S`'s clause gives parts that hold every value of the overlap; `empty` and `covered` are unchanged, and `coverageRule` still reaches `coversOverlap` only after the Subtype, Meet and exclusion tests fail (`OverloadingChecker.scala:475-479`).

As small as the two tests need, and what the report says. No shared analyzer file, no `TypeHierarchyChecker.scala`, no `StaticChecker.java`, no file outside `scala_src/` but tests and records.

## Check 5: the precedent search

For D1 the team's own call is `STypesUtil.fullyReplacedMethodDomain` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1547-1550`), which maps a method's static parameters through `str.replaceStaticParam`; the repair copies it. For D4, `TypeAnalyzer.removeSelf` reads a self type as its named trait. Right precedents.

The sibling count is miscounted. The report (section 14) lists 12 sites where an analyzer is extended with static parameters (`OverloadingOracle.scala:45`, `:84`, `:85`, `:112`, `:134`, `:136`, `:166`, `:167`, `:170`, `:375` twice, `OverloadingChecker.scala:288`), calls them 13, and calls the ones other than `:112` and `:170` "the other eleven", which are ten; `grep -n '\.extend(' ` over the three files at the head gives the same 12 live sites (the rest are comments, and `Functionals.scala:1140`, `:1145` extend value parameters). The conclusion stands: the shape occurs at `:112`, repaired, and at `:170`, where a lifted parameter's bound cannot name a method parameter. Required correction 1.

## Check 6: the tests

Each of the seven new files exercises its defect (check 3), carries one comment line in plain words, and its messages cite no specification line, row or record entry. The two `XXX` tests keyed on "but declared type is" match whichever conjunct the head of the sort gives, and it does vary on one build: `XXXCoverageReturnInferred` was refused at line 28 ("RightResult, but declared type is LeftResult") in the 36-file run and at line 29 ("LeftResult, but declared type is RightResult") in the 486-file run, and `XXXCoverageReturnGenericFamily` likewise at lines 27 and 28. The rows say the choice varies from run to run; the keys hold either way.

## Check 7: competing declarations

`grep -rlw` of each of the seven new component names across `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `ProjectFortress/src/com/sun/fortress` and `Library`, the test's own two files excluded: 0 files each. No definition added by the repair round; `coversOverlap` still has one caller.

## Check 8: record.md

The repair's corrections are made: the first FACTS entry says how a kept bound is read and that the rule is stricter than the paper on object domains (row 542); the second says functional methods are covered through the self type's trait, that the ground-family scope is narrower than Astra's boundary (row 543), and names rows 540 and 541; rows 540 to 543 are in the ledger's format, with the base's behaviour as I measured it. Two points:
- Row 541 cites `Specification/basic/inference.tex:82-88 at 811053f15`. At `811053f15` line 82 ends the previous item ("expected type as well."); the whole-type rule is `:83-89`. Required correction 2.
- For functional methods the checker judges coverage in each trait or object that provides the two declarations, over the declarations that type provides: `coverageRule` reads the `signatures` of the type being checked (`OverloadingChecker.scala:527-538`). My probe `SkFnBetween` (the acceptance program's family written as functional methods, `choose(self)` in `S`, `T` and `V`, with `M extends { S, T } comprises { V }` declaring none) is accepted in the component and refused in `M`, "Invalid overloading of choose in trait M", where the functions' form of the same family (`CoverageReturnGood`) is accepted. That follows the Meet Rule for functional methods as written ("a declaration f(P ∩ Q) provided by C", `Specification/advanced/overloading.tex:396-411`), and it is not a defect under today's text. But the record states the scope as "functional methods declared in the closed traits themselves and in the type both clauses list", and REPORT.md section 12 hands rung S "the coverage case to ground functions and functional methods": a text of S's that let declarations below the providing trait cover it would state a rule the checker does not run, and no test of C's shows the gather the difference. Required correction 3.

## Check 9: the three homes

- D1: home 1, `OverloadBoundNamesForced`, failing on the pre-repair head and passing at the head, run by me.
- D4: home 1, `ComprisesMeetFunctionalMethod` (`tag(s) =  3`), with its control `XXXComprisesMeetFunctionalMethodUncovered` refused, run by me.
- D2, D3, D5, D6: home 2, each an `XXX` compile test, each counted an expected failure at the head and red on its stand-in.
- The first pass's homes stand as the first judgement checked them.
- Measured by me this round, none the rung's to repair, each in recommendedRows: walk running a functional-method family with no covering declaration (`SkFnObjNoClause`, `SkFnUncoveredWalk`); a family mixing a function with functional methods refused by both paths (`SkFnMixedTop`); a generic closed trait's functional methods refused by the compiled checker and run by walk (`SkFnGenericTrait`, the record's stated scope, no row yet); and `SkD1Nat`, which reaches row 413's code-generation crash.

## Check 10: the count table

`tmp/rung-return-type-rule/repair/count/checker-count.txt`: `#total 77`, `#crash none`, `#shadow matches the tracked StaticChecker`. REPORT.md, record.md and the structured report say 77. The manifest's expectedCheckerCount, a prediction: 77. Against the gate's table (`explorations/compile-ladder/climb-batch-6.5b/gate/checker-count.txt`, still the newest gate; `git log e3214cbf1..811053f15 -- Library/ ProjectFortress/` prints nothing) the only lines that differ are `FortressLibrary 132 → 138`, `#total 75 → 77`, `#locations 62 → 65`. The distance table `tmp/rung-return-type-rule/repair/distance/distance.txt`: `#total 626`, overloading 148 as on the gate's; its per-site list `scratch/errors.tsv` is identical to the first build's (`diff` of the sorted lists, exit 0).

## Check 11: the ledger and the sibling sites

Rows read: 413 (the code-generation crash `SkD1Nat` reaches), 98 and 342 (walk's load check fires once per cold cache; my walk probes were first runs), 487, 491, 492. No row holds the four points of recommendedRows. The sibling sites of the repair: the other extend sites (check 5); `normConjunct` in the shared normalizer, which cuts only a `TraitType` too (`TypeAnalyzer.scala:646`), is a stop for this rung and needs no change, since the local coverage check now covers the self type.

## Check 12: the decisions

The repair keeps within answer 9 (the rule over every instance, now without an internal error on valid pairs) and item 26 (coverage local to overload checking, a refusal where it cannot settle, `SkBetweenAssign` still refused at the head, "Right-hand side has type G[\ZZ32\], but declared type is V"). D5 and D6 are stated for Pavol as the decisions leave them. The functional-method scope is within the Meet Rule for functional methods as written; whether item 26's closed-trait case for functional methods reads coverage per providing type is new text for S and a point for Pavol (below).

## The differentials

One thread: the repair touches no mutable state, field, atomic block or library write. Walk is `bin/fortress P.fss`; compiled is `bin/fortress compile P.fss` then `bin/fortress run P`; "pre-repair" and "head" are the two builds above. All programs are mine, under `tmp/rung-return-type-rule/skeptic2/p/`.

| program | walk | compiled, pre-repair | compiled, head | outcome |
|---|---|---|---|---|
| `SkD1RetDep` (`g[\X, Y extends Box[\X\]\](...): Tag[\X\]` beside `g(Box[\ZZ32\], SubBox): Tag[\ZZ32\]`) | `generic generic`, FAIL | "X$5 is not in the kind env" | `plain   generic`, PASS | compiled right; walk's defect 1, rung W's |
| `SkD1RetBad` (the same, plain returning `Tag[\ZZ64\]`) | runs, prints its FAIL line | kind env | refused, "the return type of (Box[\ZZ32\], SubBox)->Tag[\ZZ64\] ... should be a subtype of ..." | compiled right (the paper refuses) |
| `SkD1Forward` (`g[\Y extends Box[\X\], X\]`, the bound before its parameter) | `generic generic`, FAIL | kind env | `plain   generic`, PASS | compiled right |
| `SkD1TwoForced` (two forced parameters in one bound, `Y extends Box[\Pair[\A, B\]\]`) | `generic generic`, FAIL | "A$7 is not in the kind env" | `plain   generic`, PASS | compiled right |
| `SkD1Nat` (`g[\nat n, Y extends Arr[\n\]\]` beside `g(Arr[\3\], Sub3)`) | `generic generic`, FAIL | code generation stops, "Expecting a TypeArg when checking genericity" | the same | row 413's site; a note |
| `SkFnSelfSecond` (the self parameter second, `tag(n: ZZ32, self)`) | `13 13 11`, PASS | "Invalid overloading of tag" | `13 13 11`, PASS | agree at the head |
| `SkFnObjCover` (the covering method in `object Vo`, `V comprises { Vo }`) | `3 3`, PASS | refused | `3 3`, PASS | agree at the head |
| `SkFnObjClause` (closed traits listing objects, `Vo extends { S, T }` covering) | `3 3 1 2`, PASS | — | `3 3 1 2`, PASS | agree |
| `SkFnObjNoClause` (as `SkFnObjCover` with no clause on `V`) | `tag(s) = 3`, PASS | refused | refused, "Invalid overloading of tag" in the component and in trait `V` | compiled right by the Meet Rule for functional methods; walk accepts |
| `SkFnUncoveredWalk` (the rung's control program) | `tag(s) = 1`, PASS | refused | refused, in the component, `V` and `Vo` | compiled right; walk accepts |
| `SkFnBetween` (the acceptance family as functional methods, `M` between declaring none) | PASS | refused | refused, "Invalid overloading of choose in trait M" | the text as written refuses; S's restatement decides; correction 3 |
| `SkFnBetweenBad` (the same with `V` returning `LeftResult`) | runs, prints its FAIL line | refused | refused on the Return Type Rule | compiled right |
| `SkFnMixedTop` (a function `tag(s: S)` beside functional methods in `T` and `V`) | refused at load, "first parameters s:[S] and self:[T] are unrelated" | refused | refused, "Invalid overloading of tag in component" | both refuse; the text judges a mixed pair by the Meet Rule for functions; a row |
| `SkFnGenericTrait` (the same family over `S[\X\]`, `T[\X\]`, `V[\X\]`) | `tag(s) = 3`, PASS | — | refused, "Invalid overloading of tag in component" | the record's scope (no static parameters); a row |
| `SkBetweenAssign` (row 491's guard) | — | — | refused, "Right-hand side has type G[\ZZ32\], but declared type is V" | unchanged, as the section requires |

Where walk and the compiled run disagree: the four `SkD1*` programs with calls, walk's defect 1 (rung W's) against the compiled answer the most-specific rule gives; `SkFnObjNoClause` and `SkFnUncoveredWalk`, where the Meet Rule for functional methods settles it against walk (a row owed against the interpreter); `SkFnBetween`, where today's text refuses and item 26's restatement for functional methods is not yet written (the rung's refusal is the conservative reading); `SkFnGenericTrait`, where the compiled refusal is the stated scope and generic coverage is left to later work by the proof addendum.

## The failure-mode question

D1 turns an internal error on valid pairs ("X is not in the kind env") into acceptance, and each call then runs the declaration the most-specific rule gives (`plain`, `generic`), in four shapes of my own besides the rung's; an invalid pair of the same shape is refused on the Return Type Rule, with its message. D4 turns a refusal into acceptance with the answer the specification gives (`tag(s) = 3`, `13 13 11`, `3 3`). No loud failure becomes a quiet wrong value in what I ran.

## Required corrections

1. REPORT.md section 14, "The sibling count (rule 2)": 12 extend sites, not 13, and "The other ten", not "The other eleven"; the list itself is right. The same numbers in the structured report's summary and decisions, where the commit stage carries them.
2. record.md, row 541's spec citation: `Specification/basic/inference.tex:83-89` at `811053f15`, not `:82-88`.
3. The scope of the functional-method case, in record.md's second FACTS entry, `decision-record.md` section 3 and REPORT.md sections 10 and 12: for functional methods coverage is judged in each trait or object that provides the two declarations, over the declarations that type provides, as the Meet Rule for functional methods is worded (`Specification/advanced/overloading.tex:396-411`; `coverageRule`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:527-538`); so a trait between the two closed traits that provides both and declares no covering method is refused, "Invalid overloading of choose in trait M", though the functions' form of the same family is accepted. Section 12 names this as a point S's text must match.

## Recommended rows

Each measured by me this round on the head build; none is this rung's to repair.
- **Walk runs a trait that inherits two overlapping functional methods and provides no declaration covering them.** `SkFnObjNoClause` (`S comprises { U, V }` and `T comprises { V, W }` with `tag(self)`, `V extends { S, T }` declaring none, `object Vo extends V` declaring `tag(self) = 3`): walk prints `tag(s) = 3` and `PASS`; the rung's control program under another name (`SkFnUncoveredWalk`) prints `tag(s) = 1` and `PASS`. The compiled checker refuses both, "Invalid overloading of tag" in trait `V`. The Meet Rule for functional methods asks a type that provides both to provide their meet (`Specification/advanced/overloading.tex:396-411`), so the specification settles it against walk: an interpreter row, for rung W or later. Both runs were walk's first on those components (rows 98 and 342).
- **A family mixing a function with functional methods is refused by both paths.** `SkFnMixedTop` (`tag(s: S)` a top-level function, `tag(self)` in `T` and in `V`): compiled "Invalid overloading of tag in component SkFnMixedTop: (T & {V, W})->ZZ32 ... and S->ZZ32", before the repair and after; walk "first parameters s:[S] and self:[T] are unrelated". The checker requires the pair and the declarations that resolve it at one self position (`OverloadingChecker.scala:509-513`, `:534-536`), as the base's Meet Rule did. The chapter judges a function beside a functional method by the Meet Rule for functions (`Specification/advanced/overloading.tex:443-447`), which item 26 gives the closed-trait case, and two declarations whose self positions differ by the Subtype or Incompatibility Rule (`:437-441`); which governs here is not settled. A sibling of row 492, home 3 with this program as its reproducer until rung S's text settles it.
- **The closed-trait case for families with static parameters.** `SkFnGenericTrait` (the same family over `S[\X\]`, `T[\X\]`, `V[\X\]`, `object Vo extends V[\ZZ32\]`): walk `tag(s) = 3`, `PASS`; compiled "Invalid overloading of tag in component SkFnGenericTrait: [\X extends Object\](S[\X\] & {U[\X\], V[\X\]})->ZZ32 ... and [\X extends Object\](T[\X\] & {V[\X\], W[\X\]})->ZZ32". The record states the scope (no declaration with static parameters, `OverloadingOracle.scala:189-190`) and the proof addendum leaves generic coverage to later work; home 3, a row naming the open question and this program.
- **A note on row 413.** `SkD1Nat` (`g[\nat n, Y extends Arr[\n\]\](x: Arr[\n\], y: Y)` beside `g(x: Arr[\3\], y: Sub3)`): the checker accepts it, before the repair and after, and code generation stops, "Expecting a TypeArg when checking genericity" at `OverloadSet.isGeneric` (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1873`), row 413's site, which `XXXNatBoundDisp` gates; walk runs it with the generic declaration (defect 1). The base was not run.
- **A pin for the functional-method case between two closed traits.** `SkFnBetween`'s refusal in `M` (correction 3), as an `XXX` compile test keyed on "Invalid overloading of choose in trait M", so that the gather sees the rule the checker runs when it reads S's text; home 3 until S's text settles it.

## For Pavol

- Whether item 26's closed-trait case for functional methods reads coverage in each type that provides the two declarations, over the declarations it provides (the checker, `OverloadingChecker.scala:527-538`, and the Meet Rule for functional methods as written, `Specification/advanced/overloading.tex:396-411`), or over the declarations of the types below it, as the value reading would allow: `SkFnBetween` is refused compiled, "Invalid overloading of choose in trait M", and runs under walk, `PASS`. New text for rung S either way.
- D5, D6, the coercion tie and the positional rule's scope stand as the report's sections 11 and 14 and the ruling put them.

## Stops

None met. The repair edits `OverloadingOracle.scala` alone; no library declaration is newly refused (the count's list is the first build's); no existing test's verdict moved (913 and 86); `SkBetweenAssign` refused and `BetweenTwoClosed` passing as before; `CoverageReturnBad` refused and `CoverageReturnGood` passing in both orders (the 36-file run); no shared analyzer, normalizer or `TypeHierarchyChecker.scala` change; the intersection typing not extended; no checker change for the paper's set or the instance rule; no stack overflow; no ladder file can move (the repair only accepts pairs that were refused or raised an internal error); no walk edit.

---

## The first judgement (refused once), as committed at `6545e19c4`

**Verdict: refused, once.** The one thing that must change: `OverloadingOracle.satisfiesReturnTypeRule` extends the analyzer with the less specific declaration's kept static parameters without substituting the forced parameters' solutions into their bounds (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:105-111`), so a valid pair whose kept parameter is bounded by a forced one is refused with an internal error, where the base compiles and runs it. The repair substitutes the solutions into the kept parameters' bounds and gates the shape as a plain test (home 1). The rest of the rung holds up: the failure on the base is real, the 45 harness tests of the rung pass at the head, all 902 compiler tests and 86 library tests pass, the coverage check is local and its accepted programs answer as the specification says. Five sibling defects that my probes measured have no home yet; they are required corrections below.

### What I inherited and what I ran

The branch carries the worker's three commits (`0d002d8c8` tests, `4ada6fa29` and `f065994f6` the edit) and its record commits; the worktree was clean. An earlier skeptic session in this worktree stopped before writing anything; I re-ran everything I cite. `REPORT.md` is not on the branch (the harness refused the worker's write); I read its text from the worker's structured result, and the gather writes it from there.

Builds, all in `/home/user/fortress-rtr`, `FORTRESS_THREADS=1`: the base's three Scala files checked out from `811053f15` (`git checkout 811053f15 -- <the three files>`), `ant compileAll`, the library cache rebuilt from empty in library order (AnyType 17 s, CompilerBuiltin 69 s, CompilerLibrary 26 s, each exit 0); then the head's files restored, the same rebuild. Every compiled run below names the build it ran on.

### Check 1: the briefing

Read whole (`explorations/coordinator/tools/facts-extract.sh`, four parts): answer 9, the conversion decisions, item 26 with Astra's boundary, item 30 and the paper's instance rule, rows 398, 487, 491, 492, 499 and 516, the judgement's section 3.5, P1's answers, the paper's rules and theorem, the base's `satisfiesReturnTypeRule`, the addendum's sections, and the rung's section of the batch record.

### Check 2: the provenance block

Read from the worker's report text. Every line opened:
- `problem: explorations/compile-ladder/rung-nat-checker/probes/SubOvSwapTRun.fss:9` is `sub[\U, V\](m: ZZ32): Dn[\V, U\] = Dn[\V, U\](x + m)`. Right.
- `spec: Specification/basic/overloading.tex:100-107` is the sentence answer 9 removes. Right.
- `precedent: ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:92-100`: at `811053f15` these lines are rung N's `escaped` block, as the report means; at the head `:92-96` is the rung's own new comment. The line must say "at 811053f15" (required correction 7).
- The four `deviation:` lines (`OverloadingOracle.scala:132-151`, `:160-174`, `OverloadingChecker.scala:552-555`, `OverloadingOracle.scala:185-236`, `TypeAnalyzer.scala:645-655`, `Functionals.scala:686-693`) each say what the line says. The block has four deviation lines where the format asks for one; not a correction.
- `historical:` names the three files of the 2012 tree the diff edits (`OverloadingOracle.scala`, `OverloadingChecker.scala`, `Functionals.scala`). Complete.

### Check 3: the failure, seen by me

Base (the three Scala files of `811053f15`, head's tests), `ONE_JVM=1 bash explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic-base ProjectFortress/compiler_tests <the rung's 29 .test files>`:

    . compile ProjectFortress/compiler_tests/CoverageReturnGood ProjectFortress/compiler_tests/CoverageReturnGood.fss:24:24-28:
        Right-hand side has type RightResult, but declared type is LeftResult.
    . compile ProjectFortress/compiler_tests/XXXOverloadReturnEveryInstance
     Saw failure, but did not satisfy compile_err_contains; expected
    Tests run: 45,  Failures: 18,  Errors: 0

The 18 are the ones the report names: compile, link and run of `ComprisesBetweenTwoClosed`, `ComprisesMeetCompiled`, `CoverageReturnExpected`, `CoverageReturnGood`, `CoverageReturnGoodReversed`, and the wrong failures of `XXXCoverageReturnBad`, `XXXOverloadPermutedStaticParams`, `XXXOverloadReturnEveryInstance`. The base's flip of the sort's head within one JVM is there too: `CoverageReturnGood`'s compile says "RightResult, but declared type is LeftResult" (line 24), its link "LeftResult, but declared type is RightResult" (line 25).

Head, the same command and list: `OK (45 tests)`. The whole of `compiler_tests/` (479 `.test` files) and `library_tests/` (23), one JVM each, at the head: `OK (902 tests)` and `OK (86 tests)`.

The expected-failure mechanism, shown through the harness on two stand-ins of my own (`XXXGenericPositionalFixed` asserting today's `tag`, with its link test; `XXXComprisesMeetNoCover` with `f(v: V)` added), `ONE_JVM=1 ... junit.sh skeptic-standin <dir> GenericPositionalFixedLink.test XXXGenericPositionalFixed.test XXXComprisesMeetNoCover.test`:

    Did not see expected failure
    Tests run: 3,  Failures: 2,  Errors: 0

### Check 4: the diff

Three Scala files, as the report says; `TypeAnalyzer.scala`, `TypeHierarchyChecker.scala` and `compiler/StaticChecker.java` are not in `git diff --name-only 811053f15...HEAD`.
- `satisfiesReturnTypeRule` (`OverloadingOracle.scala:83-126`): P1's `forced` construction, with one change beside it: the special arrow's domain is `meet(d1, str.replaceIn(d2))` where the base met `d1` with the solved `newgd`, which for a dotted method carries the receiver (`TypeSchemaAnalyzer.scala:55-59`); P1's shadow made the same change (`explorations/compile-ladder/plan-7b/probes/P1/shadow.patch:59`). **Defect D1**: `kept` (`:106`) keeps each unforced parameter with its declared bound, and `nta = ta.extend(nsp1, None)` (`:111`) extends the analyzer with it while the forced parameters are gone from `nsp1`. A kept parameter bounded by a forced one names a parameter the environment does not hold. Probe `SkRtrDangling3` (declarations only):

      trait Box[\X\] end
      object SubBox extends Box[\ZZ32\] end
      g[\X, Y extends Box[\X\]\](x: Box[\X\], y: Y): String = "generic"
      g(x: Box[\ZZ32\], y: SubBox): String = "plain"

  head, `bin/fortress compile SkRtrDangling3.fss`:

      SkRtrDangling3.fss:8:6-7:
      X$7 is not in the kind env [Y$8 -> KindBinding(Y$8,Y$8 extends Box[\X$7\])][][]

  The same pair with calls (`SkRtrDangling2`, asserting `plain` for `(PlainBox[\ZZ32\], SubBox)` and `generic` for `(PlainBox[\ZZ32\], PlainBox[\ZZ32\])`) on the base, `bin/fortress compile` then `bin/fortress run`: `plain   generic`, `PASS`; at the head, the same internal error. Both declarations return `String`, so the Return Type Rule holds for every instance; the program is valid by the rules answer 9 adopts. Neither the library nor the corpora has the shape (no such error in the rung's count and distance outputs; the suites are green), which is why nothing caught it.
- `satisfiesPositionalRule` (`:160-174`): as the decision record says. Probes `SkPosLifted` and `SkPosLiftedSub` (lifted trait parameters) and `SkPosOverrideSameCount` (a renamed parameter) compile and run at the head.
- `coversOverlap` (`:185-236`) and `coverageRule` (`OverloadingChecker.scala:527-538`): the cut is sound as I read it: a closed conjunct is replaced by each listed type, so each part is a superset of the overlap's values it stands for; a part is dropped only on `definitelyExcludes`; a part is covered only when `lteq` puts it below a declaration that `coverageRule` has checked is below both. Cycle detection on the path and a 1,000-cut cap, excess refused. One caller. **Defect D4**: `listed` (`:206-214`) reads only a `TraitType`; a functional method's self parameter is a `TraitSelfType` (`S & {U, V}` in the messages), so a family of functional methods declared in the closed traits themselves is never cut and stays refused, while the report, the decision record (section 3) and the FACTS line say coverage covers "functions and functional methods".
- `typedApplication` (`Functionals.scala:632-794`): the call type reaches the four sites and `kept`; `groundFamily` (`:683`) is the whole family.

### Check 5: the precedent search

The worker followed rung N's `escaped` for the rule, `normConjunct`'s one-clause rule (`TypeAnalyzer.scala:645-655`) for the cut, rung I's ambiguity check for the typing, and rung G's two-file form for the run-time defects; it counted the four sites that typed a call by `bestArrow.getRange` and the fifth caller that types no expression (`Functionals.scala:1194`). Right precedents. `escaped` kept only sizes, which have no bounds naming other parameters; the generalisation to type parameters is where D1 enters, and the precedent could not have shown it.

### Check 6: the tests

Each new test exercises its defect (seen above). Each carries at most one comment line; the acceptance programs carry none, as the addendum wrote them. `ComprisesMeetCompiled` keeps its old message citing row 492 and `Specification/advanced/overloading.tex:282-307`, since its program is unchanged by the brief; the gather re-anchors it if rung S moves those lines. `XXXInferLoneUnbounded` writes `[\T extends Any\]` because the compile path's implicit bound is `Object` (row 412); a decision, recorded.

### Check 7: competing declarations

`grep -rn "satisfiesPositionalRule\|coversOverlap\|forcedArgs\|typedApplication\|coverageRule\|satisfiesReturnTypeRule" ProjectFortress/src/com/sun/fortress/`: one definition each; `satisfiesReturnTypeRule` has a second caller, the export checker's `coveredBy` (`OverloadingChecker.scala:656`), which the report names; the count's export kind is 10 before and after. `scala_src/overloading/OverloadingChecker.scala` has its own `meetRule` returning `List()` (`:119`) and is not the checker `StaticChecker.java:275` runs. No new declaration in `compiler_tests/` collides with an existing component name.

### Check 8: record.md

The FACTS lines are true as far as they go, with three exceptions to fix (required corrections 4, 5 and 6): the first entry must say that the rule is stricter than the paper where the more specific declaration's domain is an object type (D5), and, after the repair, how kept parameters' bounds are read; the second must narrow "functional methods" (D4) and say that a family with any generic member keeps the sort's head (D6). The ledger notes cite existing rows (398, 487, 488, 491, 492, 494, 496, 499, 516) and renumber nothing; the new rows are 536 to 539. The harness entry is right: the run step is a separate `bin/fortress run` (`FileTests.java:479-482`), whose class path reads `FORTRESS_CACHES` (`bin/run_classpath:25`).

### Check 9: the three homes

Worker's defects: home 1 for defect 2 (`XXXOverloadReturnEveryInstance`), row 398 (`XXXOverloadPermutedStaticParams`), row 492's checker half and the base's head-of-sort typing (`ComprisesMeetCompiled`, `ComprisesBetweenTwoClosed`, `CoverageReturnGood`, `CoverageReturnGoodReversed`, `CoverageReturnExpected`), each run by me and passing at the head; home 2 for defect 3, rows 496, 499, the paper's instance and the `ArrayList`/`List` set and row 516's unbounded case, each an `XXX` file the harness counted as expected (`Saw expected failure` at the head); home 3 for row 488's moves, a ledger note. Walk's refusal of the paper's set (539) is owed in `ProjectFortress/tests/`, which this rung may not edit; the row carries it to W or the gather.

Mine, none with a home yet:
- **D1** (this refusal): home 1 once repaired.
- **D2**, a method call on the intersection-typed result of a call between two closed traits crashes code generation. `CoverageReturnGood`'s family with `LeftResult` declaring `left(): String`, `m: M = Vo`, and `a: String = choose(m).left()` (`SkBMa`); head, `bin/fortress compile SkBMa.fss`:

      Exception in thread "main" java.lang.ClassCastException: class com.sun.fortress.nodes.IntersectionType cannot be cast to class com.sun.fortress.nodes.NamedType
      	at com.sun.fortress.compiler.codegen.CodeGen.forMethodInvocation(CodeGen.java:6236)

  The same for `choose(m).right()`, `x = choose(m); x.left()` and a getter; `takeLeft(choose(m))` runs (`left`). On the base the family was refused. The specification settles it (the call's type is `LeftResult ∩ RightResult`, which has `left()`): home 2.
- **D3**, generic inference on an intersection-typed argument keeps one conjunct, by declaration order: `pass[\X\](x: X): X`, `y = pass(choose(m))`, `l: LeftResult = y`, `r: RightResult = y`; head, `SkBtGeneric` "Right-hand side has type LeftResult, but declared type is RightResult", `SkBtGenericRev` (the two broad declarations swapped) "Right-hand side has type RightResult, but declared type is LeftResult". `if true then choose(m) else BothResult end` and a tuple binding keep the intersection (`SkBtIf`, `SkBtTuple`, `PASS`). The inference chapter gives `X` the argument's type: home 2.
- **D4**, functional methods declared in the closed traits: `trait S comprises {U, V}` with `tag(self): ZZ32 = 1`, `T` with `= 2`, `V` with `= 3` (`SkFnMethodCover`); base and head, "Invalid overloading of tag in component SkFnMethodCover: (S & {U, V})->ZZ32 ... and (T & {V, W})->ZZ32"; walk, `bin/fortress SkFnMethodCover.fss`: `tag(s) = 3`, `PASS`. With the closed traits at a non-self parameter (`SkFnMethodCoverArg`) the head accepts and prints `pick(H, s) =  3`. Home 1 if `listed` reads a `TraitSelfType`'s named trait, else home 2.
- **D5**, the Return Type Rule as built is stricter than the paper where the more specific declaration's domain is an object: `ident[\T\](x: T): T` beside `ident(x: Circle): Circle` with `object Circle` (`SkRtrLeaf`), and `f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]` with `object Box[\U\]` (`SkPosIdiom`). Head: "the return type of Circle->Circle ... should be a subtype of the return type of [\T extends Object\]T->T". The paper's rule quantifies over types `T ≢ Bottom` to which the more specific declaration applies (`Papers/Types/rules.tick:174-180`); below an object type there is only the object, and every applicable instance of the generic returns a supertype of it, so the rule holds. The construction keeps `T` quantified and checks instances whose domain meet is empty. On the base both compile and die, `VerifyError: Bad return type`; walk runs them with the generic declaration (defect 1). Home 2, and a point for Pavol.
- **D6**, in a family the checker now accepts by coverage, a between call is typed by the sort's head, and so by declaration order, when any member is generic: `CoverageReturnGood`'s family plus `choose[\X\](b: Box[\X\]): BothResult` with `object Box[\X\]` (`SkBetweenGenericFamily`), head "Right-hand side has type LeftResult, but declared type is RightResult"; its reversal, "Right-hand side has type RightResult, but declared type is LeftResult". The generic member cannot run for a value of `M`, so Astra's boundary ("ground declarations, the more specific declarations that may run included") does not exclude the call; the worker's scope, the whole family ground (`Functionals.scala:683`), does. Home 2, or a narrower scope with home 1.

### Check 10: the count table

`tmp/rung-return-type-rule/count/checker-count.txt` and `checker-count-2.txt`: `#total 77`, crash `none`, shadow matching. The report, record.md and the structured summary say 77. The manifest's expectedCheckerCount, a prediction: 77. The before, climb batch 6.5b's gate table: `#total 75`; `git log e3214cbf1..811053f15 -- Library/ ProjectFortress/` prints nothing. The distance tables (`tmp/rung-return-type-rule/distance/distance.txt`, `distance2/`): 626 both, against the gate's 624, return type 29 → 31, R3 27 → 29; no positional or kind-environment error in either stage's output.

### Check 11: the ledger and the sibling sites

Rows read beside the briefing's: 412 (the implicit bound `Object`, which forced `XXXInferLoneUnbounded`'s spelling), 413 and 448 (code-generation neighbours), 311 (a kind-environment error of another cause, fixed), 515 and 518 (inference on non-named arguments; D3 is their neighbour on intersections). No row holds D1 to D6. Sibling sites: the two other callers of the tie's typing, walk (rung W's) and the export checker's use of the rule (count unchanged); the typing's four sites are all changed.

### Check 12: the decisions

- Answer 9: the rule over every instance is built, stricter than the paper on object domains (D5). The positional rule compares declarations with as many static parameters of their own; the decision says "two generic arms ... agree on their static parameters position by position (Java's overriding rule)", and Java's overriding rule compares methods of as many type parameters; the team's `Compiled12.invariantInference` makes the wider reading refuse a correct test. I read the scope as within the decision; the worker put it to Pavol.
- Item 26: Cover-Meet local to overload checking, refusal on an unsettled case, cycle detection, row 487 named and not claimed, coercion ties under batch N's rule, `SkBetweenAssign` refused, `CoverageReturnBad` refused on the Return Type Rule, the acceptance pair in both orders. The scope "functions and functional methods" is stated broader than built (D4); the ground-family scope is narrower than Astra's boundary requires (D6).
- Item 30 and the paper's instance rule: the pair `XXXGenericInstanceUnfixed` asserts `Box[\Number\]`, the declared bound under the call's static return type `Any`, not the value's `ZZ32`; the `ArrayList`/`List` set is the paper's three declarations in the program's own names, accepted, with no checker change; `InferLoneBound` asserts only the written bound. As decided.
- Rungs re-running measurements: the gate's tables were the before, the stages ran once after (the distance twice, the second to test the BR moves' determinism, said why).

### The differentials

One thread (`FORTRESS_THREADS=1`): the rung touches no mutable state, field, atomic block or library write. Walk is `bin/fortress P.fss`; compiled is `bin/fortress compile P.fss` then `bin/fortress run P`; "base" is the build of `811053f15`'s three files, "head" the rung's.

| program | walk | compiled, head | compiled, base | outcome |
|---|---|---|---|---|
| `SkRtrDangling2` (D1) | `generic generic`, FAIL (defect 1) | refused, "X$5 is not in the kind env" | `plain   generic`, PASS | the rung's change is wrong; refusal |
| `SkRtrLeafRun`, `SkRtrLeaf` (D5) | `generic generic generic`, FAIL | refused on the Return Type Rule | compiles; `VerifyError: Bad return type` | the paper accepts; home 2, Pavol |
| `SkPosIdiom` (D5) | `f(b).v = 1` (the text gives 2) | refused on the Return Type Rule | compiles; `VerifyError` | the same |
| `SkRtrFree` (`h[\T extends Shape\](x: T, y: T): T` beside `h(Round, Round): Round`, `Round` a trait) | refused at load | refused on the Return Type Rule | — | the paths agree; the paper refuses |
| `SkRtrLeafTrait` (`ident[\T\](x: T): T` beside `ident(x: Round): Round`, `Round` a trait) | — | refused on the Return Type Rule | compiles; `VerifyError: Bad return type` | the paper refuses; the base's crash becomes a refusal |
| `SkPosKinds` (`q[\nat n\]` overridden by `q[\T\]`) | "Got nat n instead of type for param T" | refused, kinds by position | `u.q =  2` | the paths agree; the rung's decision |
| `SkRtrForced` | `g(Box[ZZ32]) = 1` (defect 1) | `2` | `2` | compiled right; W's |
| `SkRtrBoundForced`, `SkPosLifted`, `SkPosLiftedSub` | — | PASS | PASS | unchanged |
| `SkFnMethodCover` (D4) | `tag(s) = 3`, PASS | refused, "Invalid overloading of tag" | the same | walk right; home owed |
| `SkFnMethodCoverArg` | refused at load (row 492's walk half) | `pick(H, s) =  3` | — | compiled right |
| `SkTupleCover`, `SkTupleSplit`, `SkGenericClosed` | refused at load | `3 3 1 2`; `3 3`; `f(s) =  3` | refused, "Invalid overloading" | compiled right; W's half |
| `SkGenericClosedWrong`, `SkMNoCover`, `SkNoMNoCover`, `SkDottedCover` | — | refused | — | controls hold |
| `SkBetweenOp` (an operator between) | refused at load | PASS | — | compiled right |
| `SkBMa`, `SkBMb`, `SkBMf`, `SkBMx`, `SkBtGetter` (D2) | refused at load (`SkBMx`) | compiler dies, `CodeGen.java:6236` | refused: `SkBMa` "Invalid overloading of choose", `SkBMx` "No such method RightResult.left" | home 2 |
| `SkBtGeneric`, `SkBtGenericRev` (D3) | refused at load | refused, by order | refused, by order | home 2 |
| `SkBetweenGenericFamily`, `...Rev` (D6) | refused at load | refused, by order | refused | home 2 |
| `SkBetweenCoerced` (`choose(S, ZZ64)`... called with a `ZZ32`) | refused at load | "Ambiguous coercion in call to function choose" | the same | batch N's rule; Pavol |
| `BetweenTwoClosed`, `MeetViaExclusion`, `SkBetweenAssign` | — | `f(g) =  3`; PASS; refused "Right-hand side has type G[\ZZ32\], but declared type is V" | —; PASS; the same refusal | as the section requires |

Where walk and the compiled run disagree: `SkRtrDangling2`, `SkRtrLeafRun`, `SkPosIdiom` and `SkRtrForced`, walk's defect 1 (rung W's repair) on one side and D1 or D5 on the other; the comprises shapes, walk's half of row 492 (rung W's); `SkFnMethodCover`, the compiled checker wrong by item 26's decision (D4).

### The failure-mode question

No loud failure becomes a quiet wrong value in what I ran. The Meet Rule's refusal becomes acceptance with the specification's answers (`f(g) =  3`, `PASS`, `3 3 1 2`). The base's run-time `VerifyError` and `ClassCastException` become compile-time refusals (`GenPlainRTR`'s shapes, row 398, `SkRtrLeafTrait`, and D5's valid programs). Two changes stay loud but move: a program the base compiled and ran becomes an internal checker error (D1), and a method call on the new intersection type becomes a compiler crash where the base refused the family (D2).

### Required corrections

1. D1, the refusal: substitute the forced solutions into the kept parameters' bounds (and any where clause) before `ta.extend` (`OverloadingOracle.scala:105-111`); a plain compile, link and run test of `SkRtrDangling2`'s shape asserting `plain` and `generic`, seen failing on the rung's current head and passing after; `XXXOverloadReturnEveryInstance`, `XXXOverloadPermutedStaticParams` and the prelude unchanged.
2. D2: an `XXX` compile test, `CoverageReturnGood`'s family with a method call on `choose(m)`, pinned by the crash (for instance `compile_err_contains=IntersectionType cannot be cast`), and a provisional ledger row (code generation, `CodeGen.java:6236`).
3. D3: an `XXX` compile test, `pass(choose(m))` assigned to both result types, pinned by a fragment both orders print ("but declared type is"), and a provisional ledger row.
4. D4: either `listed` reads a `TraitSelfType` at the self position and `SkFnMethodCover`'s shape is a plain test printing `tag(s) = 3` (home 1), or an `XXX` compile test pinned by "Invalid overloading of tag" (home 2); and in either case record.md's FACTS entry, the decision record's section 3 and the report say which functional methods the check covers.
5. D5: an `XXX` compile test on `SkRtrLeaf`'s shape pinned by the Return Type Rule's refusal, a provisional ledger row, and the first FACTS entry saying the rule is stricter than the paper on object domains.
6. D6: an `XXX` compile test on `SkBetweenGenericFamily`'s shape pinned by "but declared type is" (or a scope narrowed to the declarations that can apply to the argument's static type, with a plain test), a provisional ledger row, and the second FACTS entry saying so.
7. The provenance block's precedent line cites `OverloadingOracle.scala:92-100` "at 811053f15".
8. `REPORT.md` is written from the worker's report text at landing, with the repair's sections added; record.md and the decision record cite it.

### Stops

None met. No stop file is edited; the only newly refused library declarations are the `cond` pair assigned to rung L; no existing test's verdict moved (902 and 86 green); `SkBetweenAssign` and `BetweenTwoClosed` as the section requires; `CoverageReturnBad` refused and `CoverageReturnGood` passing in both orders; no shared analyzer function changed; the intersection typing applied to ground families only; no checker change for the paper's set or the instance rule; no stack overflow; no walk edit. The ladder was not re-run by me.
