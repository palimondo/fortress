# Climb batch 16, rung S (rung-solver-speed): the skeptic's verdict

Judged: the worker's head `6e6192747` on `wip/rung-solver-speed`, cut from `528438ac5`. The worker's
REPORT.md and record.md were written from the run's journal and committed alone (`924d62cf7`).

**Verdict: approved.** The change is right: three memos of the compiled checker whose keys hold
every input their answers read, the audits' 0 differences, equal tables and whole outputs on the
count stage, and the time down by about four fifths, which my own pair reproduces. My two fixes are
corrections, each settled, none contested: the four new test files carried more than one comment line
(`498f79454`), and the record set the distance stage's time against the wrong base and said more than
the profiles measured (`ffc295e6b`).

## 1. The count stage: my own pair, against the worker's

compiler.md, "The checker's time", for a reviewer. Machine: nproc 4, Intel Xeon @ 2.10 GHz, openjdk
25.0.4.1, `FORTRESS_THREADS=1`. I waited from 14:49 UTC for the other trees' JVMs (rung K's two
distance stages and its testQuick, a probe's JUnit run); at 15:19 none was left, and I started the
pair (`tmp/rung-solver-speed/skeptic/timed-pair.sh`: the base build, then this tree, one after the
other, fresh scratch folders).

| run | tree, code | start (UTC) | load at start | seconds |
|---|---|---|---|---|
| base | `/home/user/fortress-base16`, `528438ac5` | 15:19:20 | 0.85 | 392 |
| head | this tree, `6e6192747`'s code (built 12:24) | 15:25:52 | 3.58 | 83 |

    explorations/coordinator/tools/checker-count/run.sh .../skeptic/count/base.txt .../skeptic/count/base   (from the base build)
        seconds 392 rc=0
    explorations/coordinator/tools/checker-count/run.sh .../skeptic/count/head.txt .../skeptic/count/head   (from this tree)
        seconds 83 rc=0

- The machine was not idle through the pair: a JVM of rung K's tree and one of a probe's started in
  the base run's second minute (load 4.7 at 15:21), and the probe's ran through the head run.
- The head took 21 % of the base's time (83 / 392); the worker's pass took 22 % of its base (97 / 437,
  REPORT.md section 7). The two gains agree within one point, inside the 6 % compiler.md allows.
- Results, against the worker's change run (`615ecff76`'s code, before its second pass), each diff
  printing nothing:

      diff skeptic/count/base.txt count/change.txt          -> equal
      diff skeptic/count/head.txt count/change.txt          -> equal
      diff <(sed 's|/home/user/fortress-base16|TREE|g' skeptic/count/base/run.txt) <(sed 's|/home/user/fortress-solverspeed|TREE|g' count/change/run.txt)   -> equal
      diff <(sed 's|/home/user/fortress-solverspeed|TREE|g' skeptic/count/head/run.txt) <(sed 's|/home/user/fortress-solverspeed|TREE|g' count/change/run.txt)   -> equal

  `#total 39`, `#locations 38`, `#crash none`; 178 lines of output, row 488's `:130` present. No
  line moved, not even in order.
- I read the worker's own files too: `tmp/count/base2.log` "seconds 437 rc=0", `change.log`
  "seconds 149 rc=0", the pass's "seconds 97"; its loads 5.60, 6.55 and 3.59; its three tables equal
  and equal to climb batch 15b's gate table (`explorations/compile-ladder/climb-batch-15b/gate/checker-count.txt`).

## 2. Test first, in the worker's transcripts

- `ReductionMemoJUTest`: red at 10:50:51 to 10:51:31 UTC (call `DPtZfT`), `git status` showing only
  the two new test files untracked, so on the base's code; "Tests run: 3, Failures: 1 ...
  the second reduction is the first's answer". The change was written into the tree at 10:53:12
  (`TEzv2K`) and first built at 10:53:25 (`1fEi6A`).
- `MethodSizeJUTest`: green on the base (10:51:47), red once with `Misc.checkExprMisc` dropped
  (10:52:02, `SxVZoS`), restored with `cmp` (10:52:45).
- `ExclusionMemoJUTest` and `TraitTableMemoJUTest`: red at 11:41:50 to 11:42:55 (`9jDLKW`, `LFGmbW`)
  on the change's code, before the pass was written (11:43:38, `Wxiop7`) and built (12:24:20,
  `mqVJYE`). The rule asks for the base's code. I ran the three Scala tests on the base's classes
  (compiled against `/home/user/fortress-base16/ProjectFortress/build` into my scratch folder, run by
  JUnit's text runner with a private caches folder):

      ReductionMemoJUTest   Tests run: 3,  Failures: 1   the second reduction is the first's answer
      ExclusionMemoJUTest   Tests run: 4,  Failures: 2   ...is not computed again expected:<1> but was:<2>; ...without computing it expected:<0> but was:<1>
      TraitTableMemoJUTest  Tests run: 2,  Failures: 2   the second lookup of Mm is the first's answer; ...does not search the table again expected:<1> but was:<2>

  The context tests are green on the base, as the brief asks. The base build stayed clean.
- The worker's last passing run is after its last change of code: 12:25:16 to 12:26:43 (`v84sCQ`,
  `Yov1TF`) on the 12:24 build, eleven classes green; `ant testQuick` on `6e6192747` "BUILD
  SUCCESSFUL", compiler 1212/0, library 86/0, othercompiler 263/0 (`ZrJVov`).

## 3. The diff, against the section and P-148

The edit touches only the three files the section names, and four new test files.

- **The reduction memo** (`TypeAnalyzer.scala:591-609`, `Formula.scala:358-363`). A reduction asks
  only the analyzer's public questions (`meet`, `join`, `subtype`, `excludes`, `lteq`,
  `definitelyExcludes`, `TypeAnalyzer.scala:77-86`, `:399-406`), each from `Set()`, and
  `reduceOnce` has no history in scope; the kind environment is immutable (`KindEnv` is a sealed
  class with no mutable state) and fixed for the analyzer; so the formula is the whole key on the
  analyzer. The opened-sizes counter is the one global state it moves, and such a reduction is not
  kept. A hit on a marked answer counts a context read, so the ground memo still never shares a
  computation that read the context. `reduceOnce`'s `return False` returns from `reduceOnce`, so the
  memo sees `False` as before.
- **The exclusion memo** (`:408-439`, `:985-1015`). Kept from an empty history only; the answer is a
  Boolean, the renaming is a bijection over type inference variables in walk order (the generated
  walker reaches every field, `STypeInfo` included, `scala_src/nodes/FortressAst.scala:1629`, `:1875`),
  and a question with a size or operator inference variable is not kept. The renamed variables are
  singletons whose id hashes by its number, so they never escape into an answer and ask no identity
  hash. Every read of the environment and the history goes through `traits.readContext()`
  (`TypeAnalyzer.scala:174`, `:202`, `:239`, `:293`, `:499`, `:919`, `:948`), so an answer shared through
  the table read neither, which is the ground memo's rule (`TraitTable.scala:134-148`).
- **The table's lookups** (`TraitTable.scala:34-68`). `typeCons` reads the name's api and text, the
  unit's map of types (`CollectUtil.immutable`, `compiler/index/CompilationUnitIndex.java:41`) and
  the global environment's apis; `declaredTypeCons` keeps `pSubInner`'s search by text alone, as the
  team's code did, over `iterator` (`TraitTable.scala:162-172`), a fresh set of the same indices each
  time, so its first match is the same each time. A lookup that throws is not kept.
- The decisions it rests on: P-148 ("This pass must not change the checker's results") and the
  coordinator's call on Q2. The section's correctness rule is stated as the section states it.

The audit copies return the memo's answer after comparing it with the answer computed again
(`tmp/rung-solver-speed/audit2/src/TypeAnalyzer.scala`, `auditExclusion` and the `reduced` hit), so
an audited run sees the same answers as a plain one; only the recomputations' side effects differ.

## 4. Precedent

The worker found the tree's four memo devices and followed them: the normalize memos' marks for
both analyzer memos, the ground memo's sharing rule, and the clause memos' `ConcurrentHashMap` with
`putIfAbsent` for the table's lookups (REPORT.md section 3). The renaming is new; the checker's one
renaming device, `alphaRenameTypeSchema` (`types/TypeSchemaAnalyzer.scala:116` and its callers),
gives a schema's type parameters fresh names, the opposite of a canonical renaming, so it does not
serve. The sibling `Formula.reduce(e: EFormula)` is not memoized; no profile the worker took names it.

## 5. The tests' form: a correction

`ReductionMemoJUTest` carried five comment lines, `ExclusionMemoJUTest` four, `TraitTableMemoJUTest`
two and `MethodSizeJUTest` thirteen; a test carries one (`.claude/skills/fortress-repo/references/tests-writing.md:134`;
the brief's check 5). I removed the extra ones; the two messages of the type-variable case in
`ReductionMemoJUTest` take what its comment said. The guard's list kept what runs each method in
comments; the brief asks it of each entry ("each entry with its size and what runs it"), so it is now
data, `listed(method, size, runBy)`, and a stale entry's failure names both
(`ProjectFortress/src/com/sun/fortress/tests/unit_tests/MethodSizeJUTest.java:35-58`). No assertion
changed. Commit `498f79454`.

    ant testOnly -DtestPattern=MethodSizeJUTest      (for that run only: Misc.checkExprMisc dropped, a method not in the build listed)
        [junit] Tests run: 2, Failures: 2, Errors: 0, Skipped: 0, Time elapsed: 0.706 sec
        [junit] junit.framework.AssertionFailedError: com.sun.fortress.scala_src.typechecker.impls.Misc.checkExprMisc is 12893 bytes of bytecode, more than 8000
        [junit] junit.framework.AssertionFailedError: com.sun.fortress.useful.Gone.method (listed at 9000 bytes, run by nothing: a method that is not in the build) is not in the build
    restored, cmp equal; then each class through ant testOnly on this code (tmp/rung-solver-speed/unit-tests.sh):
        ReductionMemoJUTest   Tests run: 3, Failures: 0, Errors: 0
        ExclusionMemoJUTest   Tests run: 4, Failures: 0, Errors: 0
        TraitTableMemoJUTest  Tests run: 2, Failures: 0, Errors: 0
        MethodSizeJUTest      Tests run: 2, Failures: 0, Errors: 0

The guard keys a method by class and name (the worker's decision 6), so a second overload of a listed
name that passes the limit would not fail it; no listed name has such an overload today.

## 6. My programs, old against new

Under `tmp/rung-solver-speed/skeptic/`. The new code ran with a private caches folder copied from the
worker's testQuick compiler-track caches (the library compiled by `6e6192747`'s code); the old code
through `old-fortress.sh` with `tmp/old-caches`.

| program | what it exercises | compiled, old | compiled, new | walk, old and new |
|---|---|---|---|---|
| `SkSolverOk` | one overload pair chosen under two bounds of one name (`h[\T extends Aa\]`, `k[\T extends Bb\]`), inference with fresh variables at fourteen calls, `Mm[\Aa\]` against `Mm[\Bb\]` | compiles; `PASS` | compiles; `PASS`; all 55 class files byte for byte equal to the old ones | both refuse at load, "first parameters x:[Mm[\Bb\]] and x:[Mm[\Aa\]] are unrelated" |
| `SkSolverOkWalk` | the same without the generic trait pair | | | both `PASS`, outputs equal |
| `SkSolverRefused` | eight refusals the solver decides: a bound that does not fit, `Mm[\Cc\]` against both instances, a join of excluding types, a bound broken at a call | 8 errors | the same 8 errors, text and places equal (`diff` prints nothing) | both refuse at load, equal |
| `SkSolverGen` | generic overloads told apart by excluding bounds | "Invalid overloading of sel" | the same | |
| `SkSolverGen2` | the same without `sel` | code generation stops, "duplicate entry ... $f..." (row 537's known face, both type parameters named `T`) | the same | both `PASS`, equal |
| `SkSolverOkT4`, `SkSolverRefusedT4` | the first and third at `FORTRESS_THREADS=4` | compile and refusals equal; run `PASS` | the same; run `PASS` | |

The rung adds fields (the memos), so I ran at one thread and at four: the same results. Walk shares
none of the edited code, and its outputs are equal. `SkMeetPair` (`skeptic/meet/`) checked that the
compiled checker's silence on `SkSolverRefused`'s `q(Aa)` beside `q(Cc)` is its stop after the type
errors, not a missed Meet Rule: alone, the pair is refused, "Invalid overloading of q".

## 7. Defects and their homes; the ledger; siblings

- The worker's three defects are repaired with home 1 and recorded in NEW-S-1 (record.md). My
  programs measured no new defect: `SkSolverGen2`'s stop is row 537's, and walk's refusal of the
  generic pair is rung W's row 373 territory, both on the old code too.
- Ledger finds (`memo*`, `solver`, `count stage`, `huge method`, `8,000`, `Meet Rule`) give rows 370,
  488, 547, 562, 688 and 730 as bearing on the rung. Row 547 (a verdict that depends on the units
  compiled before it in one JVM): the new memos live on an analyzer or a table, both per unit, and the
  only JVM-wide state added is the list of renamed variables, which never reaches an answer.
- The guard on the other rungs: the worker's scan of each rung's present build finds the same twelve
  methods at the same sizes (`java tmp/rung-solver-speed/scan/Scan.java <tree>/ProjectFortress/build 8000`
  over `fortress-asthashes` at `5bb043630`, `fortress-abstractsite` at `a79a51661` and
  `fortress-walkovl` at `3f28cbfee`), so `MethodSizeJUTest` holds on each rung's build alone.

## 8. The report and the record

- The five provenance lines: each cited line opened with `sed -n` says what it claims (the base's
  `Formula.scala:356` `def reduce`, `TypeAnalyzer.scala:721` the pair test, `TraitTable.scala:104-115`
  the ground memo, `TypeAnalyzer.scala:569-573` the normalize memos' marks; the head's deviation and
  historical lines). The precedent's other citations hold at the head within a line or two.
- No sentence of the specification is made false; the grep in the provenance line prints nothing.
  The skill's `compiler.md:125` (about 6 minutes) is; `compiler.md:134` stays true as written (it says
  what `WalkerJUTest` checks), and the section around it reads as if `WalkerJUTest` were the guard,
  which the record lists.
- The worker's ladder: the seven files that moved since the baseline, `tmp/rung-solver-speed/ladder/old/`
  against `raw/`, equal once paths and "Operation took" are masked (a file read).
- **Corrected (`ffc295e6b`).** record.md set the distance stage's 574 s "against 26 to 29 minutes
  before", climb batch 14's times before the walker split; this rung's base is climb batch 15b's gate,
  `#seconds 1075` (`explorations/compile-ladder/climb-batch-15b/gate/distance.txt:26`). The revival
  change's "not about half an hour" is now "not about 18 (1,075 s)". The F-231 correction said that
  after this rung `pExc` and `dExc` hold 62 to 65 % of the profile; that is the change's profile
  (REPORT.md section 5), and the final code was not profiled, so it says so. The revival change's
  "the same errors at the same places" now names the one site the distance stage moved. The FACTS entry
  carries my pair beside the worker's. REPORT.md section 8 cites the guard's list where it now is.
- The commit footer of `aaac79b84` names a tier with its version, not the skill's footer; no model
  identifier is in any file or message. The branch cannot be rewritten (left for the gather).

## 9. Competing names; the failure mode

- Every name the rung adds (`reduced`, `reduceOnce`, `openedSizeCount`, `renamedApart`, `Renamed`,
  `renamedVar`, `exclusionMemo`, `reduceMemo`, `typeConsMemo`, `declaredMemo`, `declaredTypeCons`,
  `findDeclared`, `lookUpTypeCons`, `sharedExclusion(s)`, `shareExclusion`, the three switches and the
  four test classes) occurs only where the rung declares and uses it, in `ProjectFortress/src/com/sun/fortress/`
  and the test corpora; `ExportChecker.scala:106`'s `declaredTypeConses` is another name.
- No loud failure turns quiet: a computation that throws is kept by none of the memos, so the
  exception comes again as before (`TypeAnalyzer.typeCons`'s "Not in the trait table" included).

## 10. Where I differ from the worker

- **The `:130` move.** The worker reads it as F-232's identity-hash move. The audit argument holds:
  the audit copy returns the memo's own answers, so a reused answer is not what loses the site.
  But the change's audit also counted 116,461 reductions whose memo answer equals the recomputed one
  as a formula and lists its members in another order (REPORT.md section 6, `text-mismatches`): the
  change also hands later questions sets in another order, a second way, besides identity hashes, in
  which it moves "what the checker queried earlier" (row 488's claim). The conclusion stands: no answer
  is wrong, and the site is row 488's.
- **The second pass's tests** were seen red on the change's code, not on the base's; they are red on
  the base's code too (section 2).
- **"Idle".** Neither the worker's pair nor mine ran on an idle machine; both gains are far past 6 %.

## 11. Fixes

| commit | finding | kind | settled by |
|---|---|---|---|
| `924d62cf7` | REPORT.md and record.md were not on the branch (the harness refused the worker's write) | correction (report) | the brief's first step |
| `498f79454` | the four new test files carried 5, 4, 2 and 13 comment lines | correction (test) | `tests-writing.md:134`, "Give it one comment line that says what it checks"; the brief: "each entry with its size and what runs it" |
| `ffc295e6b` | the record's distance time against the wrong base, the F-231 correction's profile, the revival change's "same errors at the same places", the guard's citation | correction (record) | `climb-batch-15b/gate/distance.txt:26` "#seconds 1075"; REPORT.md section 5 "I took no JFR of the final code as built"; REPORT.md section 10, the one site gone |

No fix changes the checker, walk or a shared phase, so no whole suite was owed; the four test classes
ran through `ant testOnly` after my last edit (section 5). As the brief asks, the report's tables are
those of the worker's head; I ran no count or distance stage after a fix.

## 12. Points to report, and questions

- Points: each count run's seconds and load (the worker's three, my two); the ways weighed and the
  keys (REPORT.md sections 4 and 3 above); the audit (7,147,587 reductions, 153,930 exclusions,
  156,462,352 lookups, 183,577 searches, 0 differences on the count stage; 428M, 0 on the distance
  stage); no difference in a table or whole output on the count stage, `:130` gone on the distance
  stage with the audit beside it; the guard's list (`MethodSizeJUTest.java:35-58`); no checker file
  beyond the three, no library, walk or AST edit. None holds the push.
- For the curator: the worker's two questions stand (the guard's entries no checked path runs; how the
  gate reads `:130`). On the second: `compare.sh:16-18` reads a move of 2 to 4 errors as variation,
  and `:130` is one.
