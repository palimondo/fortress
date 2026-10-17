# Climb batch 17, rung C: the skeptic's verdict

The rung: `wip/rung-checker-four-rows`, judged at the worker's head 9697e3838 (its last code commit; the branch carried no report). My commits: ca4bc4d88 (the worker's REPORT.md and record.md, written from the run's journal by `journal-text.py`, which exited 0 for both), 32033edf8 and 073a28aaf (corrections, section 6), and this file. No commit of mine changes code, so no build and no suite ran for them.

Verdict: **approved**. The four repairs do what the section asks, as small as their tests need, and the record is true but for one citation. My programs found no defect of the change. They measured three defects that the base has too, outside the change, each now with an `XXX` test and a row, and one face of row 675 that row 681's repair reaches.

## 1. The count stage, timed again (P-148)

Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, FORTRESS_THREADS=1. Base run in a call set up for `/home/user/fortress-base17`, head run in one set up for the rung's tree with the worker's build, one after the other, each `time explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`:

| run | code | real | load at start |
|---|---|---|---|
| base | 3aea3da53 | 1m16.926s | 0.22 |
| head | 9697e3838 | 1m24.899s | 1.02 |

The worker's were 74 s and 81 s (`REPORT.md` section 5): the same order of size, no slowdown of the kind the smoke test catches.

`diff base.txt head.txt`:

    14,15c14,15
    < #total	39
    < #locations	38
    ---
    > #total	38
    > #locations	37

The two `run.txt` files, each tree's path replaced by `TREE`, differ by `:130` alone:

    27,28d26
    < TREE/Library/FortressLibrary.fss:130:5-105:
    <     Function body has type TotalComparison, but declared return type is BigReduction[\TotalComparison,TotalComparison\].
    177c175
    < File FortressLibrary.fss has 39 errors.

That is the change, not row 737's flicker: the error is the one row 737's repair removes, and it is absent from every change run, mine and the worker's three. My base table and normalised `run.txt` equal the worker's `count/base` ones by `diff`, and my head's equal the worker's `count/change3` ones ("BASE-TABLE-SAME", "HEAD-TABLE-SAME", "BASE-RUN-SAME", "HEAD-RUN-SAME"). The worker's pass made no edit, so `change3` is the run before its pass and the head's results are its results.

The distance, read from the worker's files: `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-16/gate/distance.txt <tree>/tmp/rung-checker-four-rows/distance-postedit.txt` prints 'DISTANCE DOWN   49 -> 48 (-1)', 'kind typecheck 40 -> 39', '#crash none'. Its per-site list against `explorations/compile-ladder/gate/distance-sites.tsv` (kind, location, message) differs by one line, `< typecheck	FortressLibrary.fss:130	Function body has type TotalComparison, ...`. No site comes.

## 2. Test first, in the worker's transcript

Transcript `agent-a793b626c36d61527.jsonl` of the run's directory. The tests were written at 14:30:57 to 14:31:21 and rekeyed at 14:31:21 (call `KqUuYS`). The failing run is call `mx74ZM`, 14:31:33 to 14:31:37, on the seeded build (`implementation.stamp` 13:27), before the first edit of code at 14:35:34 (`398kfs`) and the first build at 14:36:16 (`ERRWao`). Its output holds the lines `recordedFailure` quotes: 'Function body has type IntLiteral, but declared return type is String.', '- [\int i\]IBox[\i\]->ZZ32 is not applicable to an argument of type IBox[\i-1\].', 'Saw wrong failure. compile' for the new `XXX` test and for the three rekeyed ones, 'Tests run: 11,  Failures: 8,  Errors: 0'. The method case: `djeYxz`/`iDTqxq`, 14:33:30, red on the base. The guards: `qpebVs` at 14:54:41 on 68b58b237's build, 'There are multiple declarations of num with the same parameter type: (Q & {R})'; `dSt1eR` at 15:06:10 on b3d52f1de's build (the fix of 15:05:34 was not built until `FdAeJh` at 15:06:24), 'T is not in the kind env [][]'; both 'OK (2 tests)' on the old code (`WxHHWC`).

The passing run is `K8WqTX`, 15:07:40, after the last change of code (`FdAeJh`, 15:06:24, built 'BUILD SUCCESSFUL' at 15:07:33): 'OK (16 tests)'. `ant testQuick` ran on that code, its log 'Tests run: 1235, Failures: 0', 'BUILD SUCCESSFUL', 'Total time: 10 minutes 6 seconds'. The first `XXX` test was shown red with its defect removed (`gG4QnM`, 14:38:34).

## 3. The diff against the section and the text

- **Row 737.** `satisfied` (`ApiTypeExtractor.scala:79-83`) takes the one api declaration whose parameter types `sameParamTypes` (`:196-209`) finds equal by `ExportChecker.equalTypes`, the export check's own comparison, an untyped parameter matching any; none or several give none. Order-free: a filter of a set, then exactly one. The three first picks of `isExported` are the three sites of one defect; repairing all three is what the section's site, `:68-132`, holds. "Type Inference for Components" (`type-inference.tex:29`) settles the pick. One reading is narrower than the text, and nothing observes it today: a declaration that takes part in a set satisfying an exported one (`components/source-code.tex`, "Export Statements") corresponds to that declaration, but has other parameter types, so the repair gives it no return type. The export check refuses such a set anyway (row 769, section 4). The rule is the section's, "choose the api declaration whose parameter types are the component function's", so I made no change; the question is in `forCurator`.
- **Row 738.** `OverloadingChecker.scala:370` tests `traitOrObject`; the four other files whose key says 'in trait' name traits (`M`, `Join`, `D`) or hold the words in a comment (`XXX6b`).
- **Row 739.** The top-level set of a component now reads every functional method (`:125-126`). The `implemented` filter (`:135-160`) leaves out an abstract one that a strict subtype's declaration implements with an equivalent arrow, as the per-provider precedent does (`:166-185`). It finds the subtype by the declarers' ancestors where the precedent uses `lteq` on instantiated types, because the top level has no instance (the second version's crash is the evidence). Ancestors are compared by index identity: my program of the library's own shape inside an exported api (`SkApiComprises`) shows no false refusal from the component side. Its refusal comes from the api's check, on both codes (row 770). The filter runs only for a component (`:137`), as the section asks.
- **Row 681.** `isNatTerm` (`Formula.scala:158-162`) now holds a size with no inference variable in it. `reduce`'s `nContradiction` (`:437-446`) no longer counts `$i = i-1` as a contradiction; a variable equal to a size with a variable in it, or to two sizes not written alike, still is one. The unifier (`:776-777`) binds it, and `slv` (`:593`) still refuses a size equality left over. `TypeAnalyzer.reduced` (`types/TypeAnalyzer.scala:597-609`) keys a reduction on its formula, in one analyzer of one run, so it keeps no answer of the old rule. As the report says.
- `changes.tex:3611-3623`: the effect now says the checker infers `get` at `i-1` and names row 767. True by `NatArithInferChecker` and by my `SkNatOps` (section 4). The entry "Overloading with static parameters" (rung G's) says nothing of the top-level set (`changes.tex:2620-2632`): no sentence there is made false. The worker's list of sentences made false outside the text (F-53, F-232, `compiler.md:130` and `:132`, `revival-changes.md:96`) is complete by my grep of `.claude/skills`, FACTS, POSITIONS and PLAN for `fss:130`, row 737, 738, 739 and 681.
- Precedent and siblings: `equalTypes` is the library's comparison, and K's filter is the precedent; the worker found and followed both. `getFunctionalMethods` and `getDeclaredFunctions` already pass `onlyConcrete = false`. The api's top-level set is the one sibling site left (row 770, recorded, not repaired: the section gives the rung the component's set only).
- Competing names: every new component and Scala name occurs once in `ProjectFortress` and `Library` (`git grep -w`), the two local `implemented`s in two methods.
- The report's provenance lines, each opened with `sed -n`: all say what they claim but the problem line's `batch-16-review.md:21`. The sentence it quotes is at `:25` (corrected, 32033edf8). The record's team-line citations (`ApiTypeExtractor.scala:91`, `:98`, `:117`, `OverloadingChecker.scala:120`, `:284` at a874948ac; `isNatTerm` from 3f297441c) are right. The row 767 row fits the template, 1,121 characters.

## 4. My programs, old against new

Under `tmp/rung-checker-four-rows/skeptic/p/`, run with `run-diff.sh` there: old code by `old-fortress.sh /home/user/fortress-base17 <tree>/tmp/old-caches` (compile, run, walk), new code by the rung's `bin/fortress` with a private copy of its caches, all at FORTRESS_THREADS=1. The rung writes no program state, so no four-thread column. Walk's code is the same in both trees, and its answers are.

| program | old compiled | new compiled | walk |
|---|---|---|---|
| `SkGenArrow`: one generic, two arities of `app(g: ZZ32->ZZ32)`, a size parameter, a size numeral, return types left out | crash, 'ClassCastException: class com.sun.fortress.nodes.ArrowType cannot be cast to class com.sun.fortress.nodes.TupleType' | `PASS` | not run |
| `SkBoolOne`, `SkBoolOneTyped`: `f(x: Flag[\true\])` exported, return type left out and written | 'does not define all declarations', both | the same, both | `PASS` |
| `SkUnionSat`, `SkUnionSatTyped`: `pick(q: Q)` exported, met by `pick(r: R1)` and `pick(r: R2)` | 'does not define all declarations', both | the same, both | `PASS` |
| `SkPrivNoRet`: an unexported function, return type left out | `PASS` | `PASS` | not run |
| `SkNatOps`: `get(IBox[\2 + 1\])`, `[\i + 1\]`, `[\2 i\]`, `[\i - 1 - 1\]` at 5 | 3 errors, 'not applicable to an argument of type IBox[\i+1\]', '[\2 i\]', '[\i-1-1\]' | 'lit 3', 'succ 6', 'dbl 10', 'twice 3' | the same four values |
| `SkNatNat`: `getn[\nat n\](NBox[\i - 1\])` inferred, at 5 and 0 | 'not applicable to an argument of type NBox[\i-1\]' | 'predn5 4', 'predn0 -1' | 'predn5 4', then 'Negative nats are unNATural: -1' |
| `SkNatNatWritten`: the same with `getn[\i - 1\]` written | 'predn5 4', 'predn0 -1' | the same | the same refusal |
| `SkTwoTraits`, `SkTwoTraitsConc`: `f(self)` abstract (or concrete) in two unrelated traits | `PASS` | `PASS` | `PASS` |
| `SkSubtypeTop`: abstract `h(self)` in `S`, top-level `h(x: S2)` with `S2 extends S` | 'Overload violation: the declaration of top-level function h ... is more specific than the declaration of the functional method h' | the same | `PASS` |
| `SkComprisesTwo`, `SkSubTraitRedecl`, `SkWhereComprises`, `SkTwoLevel`, `SkGenComprises`: abstract functional methods of comprising, re-declaring and generic traits | `PASS` | `PASS` | `PASS` |
| `SkGenTop`: abstract `gm(self)` in `G[\T\]` beside top-level `gm(x: String)` | `PASS` | 'Invalid overloading of gm in component SkGenTop: String->ZZ32 ... and [\T extends Object\]G[\T\]->ZZ32' | 'at least one pair of parameters must have excluding types' |
| `SkGenTopConc`: its concrete twin | 'Invalid overloading of gm ...' | the same | the same refusal |
| `SkApiComprises`: the `QQ`/`Ratio` shape, also declared in the exported api | 'There are multiple declarations of num with the same parameter type: (SkApiComprises.Q & {SkApiComprises.R})' | the same | not run |

Read against the text:

- Every change the rung makes is to the specification's answer: `SkGenArrow`'s crash becomes the right compile, `SkNatOps` and `SkNatNat`'s 5 agree with walk, `SkGenTop` is refused as its concrete twin and walk refuse it (`overloading.tex`, "Meet Rule"), and no shape of a comprising or re-declaring trait is newly refused.
- **The failure mode.** Row 681's repair turns one refusal into a quiet value: `predn[\0\]()` gives a `nat` the value -1 compiled, where walk stops. A `nat` parameter takes a natural number (`basic/trait-parameters.tex`, "Nat and Int Parameters"), so -1 is wrong. It is row 675's mechanism, no kind check of a size computed when a class loads, and the written form gives the same -1 on the base. A note for row 675 is in `record.md`; the effect of "When two sizes are the same" already names that departure (`changes.tex:3624-3630`).
- Three defects that are the same on both codes, outside the change, each now recorded with an `XXX` test and a row (home 2: the text settles each). Each test is an expected failure on the old code, `old-fortress.sh ... junit <tree>/ProjectFortress/compiler_tests/XXXExportBoolStaticArg.test ...` (16:34:24Z): 'Saw expected failure' three times, 'OK (3 tests)'. On the head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ...` (16:34:33Z): the same, 'OK (3 tests)'. The first is red with its defect removed (`Flag` made a plain object for one run, then restored, `junit.sh skdemo`, 16:34:45Z): 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'.
  - Row 768, `XXXExportBoolStaticArg`: the export check matches no declaration whose parameter type has a `bool` static argument (`ExportChecker.scala:636-643`; the team's header, `:73-78`).
  - Row 769, `XXXExportSetOfDeclarations`: the export check refuses an exported function that a set of declarations satisfies (`ExportChecker.scala:431-437`).
  - Row 770, `XXXApiFunctionalMethodOfComprisedObject`: an api's top-level set refuses an object's declaration of the abstract functional method of the trait comprising it, the shape the rung's filter accepts in a component (`OverloadingChecker.scala:137`).

## 5. Homes

The worker's: rows 737, 738, 739 and 681, home 1 (their tests); the rung's two intermediate defects, home 1 (the two guards); row 767, home 2 (`XXXNatArithInferFromSum`, `XXXNatArithInferFromSumWalk`). Mine: row 768, row 769 and row 770, home 2; the `nat` below 0, row 675's (home 3 there, `NatArithBeyondRun`), a note.

## 6. Corrections

- 32033edf8: `REPORT.md`'s problem line, `batch-16-review.md:21` to `:25`.
- 073a28aaf: the three `XXX` tests (nine files in `ProjectFortress/compiler_tests/`), the rows 768 to 770 in `record.md`, checked against the row template by `ledger.py add` on a scratch copy of the ledger, and the note for row 675.

No fix of the change itself, so nothing is contested, and no count or distance stage ran after my commits: the report's tables are those of the worker's head, which my count runs reproduce.

## 7. Where I differ from the worker's account

Nowhere on its decisions. Its decision 3, none where several api declarations fit, and row 767 are for the curator, as it says. To them I add a third question: whether row 737's rule of equal parameter types holds once the export check accepts a set of declarations (row 769).
