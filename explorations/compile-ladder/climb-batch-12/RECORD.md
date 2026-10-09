# Climb batch 12: the gather's record

Written at the gather stage of climb batch 12 (2026-10-09), the run of `explorations/coordinator/CLIMB-BATCH-12.md` (rungs W, C, R, G and S), on `main` from the base `7fa767d482d33377c858dd2be75f6077a759e2cf`. `main` was at `c3c842fac` when the gather began, three coordinator commits above the base (boot notes in `explorations/coordinator/postmortem-2026-09-19/held-list.md`), which touch no file a rung touches. All five rungs were approved, W and C after their judges' rulings, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`, and each branch stays as it is.

**Preconditions.** `git status --porcelain` was empty, and `7fa767d48` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0).

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff 7fa767d48...<branch>`. Two trees were seeded outside the main tree from the batch's base build, `/home/user/fortress-base12`, with `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base12 <tree> - 7fa767d48`, and nothing was built or run in the main tree or in the base build:
- `/home/user/fortress-gather12`: the five patches applied, then `ant compileAll` ("BUILD SUCCESSFUL", "Total time: 40 seconds", the caches started again) and the library order (five compiles, each exit 0, five jars). After the last rung's commit it was moved to `fdd377ead` with `git checkout -f --detach`, its code files unchanged (`git diff --cached fdd377ead -- ProjectFortress Library build.xml` printed nothing), and the closing tests ran there.
- `/home/user/fortress-gather12b`: the same code with one switch added to `Constructor.checkForDef` that turns off rung W's allowance for a body at narrower types, to measure what still needs it (gather.1, below). Its probes are scratch.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | C, `rung-checker-contexts` | `wip/rung-checker-contexts` at `35b9758e5` | `054c4bcfd` |
| 2 | S, `rung-library-slips` | `wip/rung-library-slips` at `f50c71bcc` | `74b28e9d4` |
| 3 | G, `rung-reduction-types` | `wip/rung-reduction-types` at `a184eb803` | `aadd02f23` |
| 4 | R, `rung-range-kinds` | `wip/rung-range-kinds` at `510a49bdf` | `abe8b0342` |
| 5 | W, `rung-walk-load-checks` | `wip/rung-walk-load-checks` at `8541c5286` | `fdd377ead` |
| | the rows' closes | | `85e8863b5` |

## The order the rungs were applied in

C, then S, then G, then R, then W, read from `git diff -U0 7fa767d48...<branch>`.
- The shared files are three: `Library/FortressLibrary.fss` (R, G and S), `Library/FortressLibrary.fsi` (R, G and S) and `Specification/appendices/changes.tex` (C and S). W shares no file with another rung.
- The lowest edited line of each rung in those files: S `FortressLibrary.fss:646` (`.fsi:1624`, `changes.tex`: an insertion after `:3024`); G `FortressLibrary.fsi:1904` (`.fss:3062`); C `changes.tex:1997`; R `FortressLibrary.fsi:2180` (`.fss:2255`); W none.
- Taken as one number per rung, the rule gives S, G, C, R, W. Those numbers compare lines of different files, though, and the rule's purpose is that a later rung's hunk not shift a landed record's lines. Read file by file, `changes.tex` puts C (`:1997`) before S (`:3024`), and both library files put S first. Taken literally, C's 41 added lines above S's entry would have moved S's landed Appendix I entry. So the gather took C first, then S, and the literal order for the rest: G (`.fsi:1904`) before R (`.fsi:2180`). `FortressLibrary.fss` alone would put R (`:2255`) before G (`:3062`), but neither shifts the other's lines: every hunk of G keeps its line count, and R's line-shifting hunks lie below G's (from `.fss:3839`, `.fsi:2211`). W, with no shared line, went last.
- Every patch applied with `git apply --3way --index` and no conflict ("Applied patch to ... cleanly" for each file, after git's fallback to direct application). Each rung's own files on `main` matched its branch byte for byte before the gather's edits (`git diff --cached --stat <branch> -- <the rung's files but the shared ones>` printed nothing at each step), and in each shared file `git diff --cached <branch>` showed only the earlier rungs' hunks.

Lines that an earlier rung's hunk moved, re-anchored by symbol in the folded records:
- S's hunks above `FortressLibrary.fss:2716-2743` add 15 lines net (one removed at `:2381`, four added at each of four `Matrix` operators). So G's `:3061-3164` is `:3076-3179` in G's FACTS entry, its `:3269` (`SUM`) is `:3284` in the `NotationGenericBigSum` entry of `PLAN.md`, and its row 433 and row 405 notes' `:3248-3265`, `:3291`, `:3300` were rewritten `:3263-3280`, `:3306`, `:3315` (both notes were then refused, below). R's `:2534`, `:2586`, `:2929` are `:2533`, `:2585`, `:2944` in R's FACTS entry, and its `:3872-3883`, `:4110`, `:4115` are `:3887-3898`, `:4125`, `:4130` in item 49's added sentence. R's row 664 cites `:2257` and `:2315` "at 7425daa51", unmoved.
- C's hunks in `changes.tex` move S's entry "The rounding of an infinite or indefinite rational" from S's `:3025` to `:3066`, and the gather's one-line-longer correction for G (below) moves it to `:3069`; S's `SKEPTIC.md` cites S's tree. The same correction moves C's entry "The contexts that give a call an expected type" from `:1984` to `:1985`, its `row~660` to `:2081`; C's files cite C's tree.
- C's hunk in `STypesUtil.scala` moves the line W's question Q2 cites (`:1663` at the base) to `:1668-1669`, cited so in `PLAN.md`.
- S lands before R, so R's hunks below `:3839` move S's `String` lines (`FortressLibrary.fss:4155-4156` on S's tree, `:4160-4161` now) and its `opr :` declaration (`.fsi:2391` on S's tree, `:2393` now). S's folded records cite neither by line (its row 661 cites `.fsi:2391` "at 7fa767d48", and its `PLAN.md` entry cites the declaration by its text).

## Rows opened

Numbered by `ledger.py add` in the order the rungs were applied, each rung's rows in the order of their placeholders. Each placeholder was replaced by its number in the rung's `REPORT.md` and `SKEPTIC.md`, with a sentence naming the numbers added to an existing line at the head of `SKEPTIC.md` (no line moves), and in the specification (C's `row~NEW-C-1`, now `row~660`), before the rung's commit. No test cited a placeholder.

| Row | Placeholder | Rung | Section | Claim, in short |
|---|---|---|---|---|
| 660 | NEW-C-1 | C (its skeptic) | 2 | the compiled checker gives no expected type to a tight juxtaposition of items none of which is a function |
| 661 | NEW-S-1 | S | 8 | against the one library a strided range `a:b:c` is declared `Range[\ZZ32\]`, no generator, so the checker refuses `seq(a:b:c)` |
| 662 | NEW-G-1 | G | 8 | under walk, `Set`'s unwritten `BIG UNION` and `BIG INTERSECTION` stop at `Set[\OPEN\]` |
| 663 | NEW-G-2 | G (its skeptic) | 8 | under walk, a tuple of values is not below a tuple type over an open self-bounded parameter (`CONTESTED`, the specification silent) |
| 664 | NEW-R-1 | R | 9 | the range subscripts of `ImmutableArray1` and `Array1` pass `reflect`'s `NatParam` sizes where `N[\s\]` is taken |
| 665 | NEW-W-1 | W | 3 | walk's abstract-method and `override` load checks skip generic objects, object expressions in generic functions and generic traits |
| 666 | NEW-W-2 | W | 3 | walk accepts an object that defines an inherited abstract method only at narrower parameter types |
| 667 | NEW-W-3 | W | 3 | `IntMap`'s objects define no body for `genComb` |
| 668 | NEW-W-4 | W | 3 | `SeededRandomGenWithDistribution` defines no body for `seedSize` and `reseed` |
| 669 | NEW-W-5 | W | 3 | the QuickCheck generators define `AnyGen`'s `perturb` only at their element type |
| 670 | NEW-W-6 | W | 3 | the team's demos leave inherited abstract methods without a body, now refused at load |

Row 666's notes differ from W's record in one clause, by the merged tree: W's tree needed the allowance for `NewlineReduction`'s `simpleJoin` under the abstract one at `Any` (row 628); rung G typed that abstract `simpleJoin` at `R`, so the row says that `NewlineReduction` needed it at `7fa767d48` and that `Pairs`'s `SingleRange` (`Library/Pairs.fss:78-87`) and rows 668 and 669 still need it (gather.1). `python3 explorations/coordinator/tools/ledger.py check --base 7fa767d48` reports "gone none; new 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670" and, beside the base's eight `spec-path` and one `spec-section` failures, one new failure: row 642's `reproducer-path` (gather.2).

## Rows closed

Each by `ledger.py close N --commit <the rung's commit on main> --test <the test>`, after its test passed on the merged tree as the rung last ran it, in `85e8863b5`:
- Rung W, `fdd377ead`: 647 (`FunctionalMethodMeetGenericProviderWalk`); 648 (`ObjectExpressionTopLevelVariableWalk`, with the record's note on the singleton field and the importing component, `c17cff594`); 649 (`AbstractMethodUndefinedWalk`). Row 653 stays open: W fixed walk's half, and its claim covers the checker too; its note went in condensed.
- Rung C, `054c4bcfd`: 644 (`InferRepeatedOperatorContext`); 651 (`MethodStaticArgsBoundNamesOther`). Not closed: 642, fixed under Q48(a) and gated by `InferResultOnlyLabelBody`, because it is `CONTESTED` and `ledger.py close` refuses such a row ("row 642 is CONTESTED, which is not a defect to close"), and no note can be added to it since its reproducer was renamed (gather.2).
- Rung R, `abe8b0342`: 655 (`RangeNarrowKinds`); 657 (`RangeKindBodies`); 654 (`RangeNarrowKinds`); 656 (`TrivialOpenRangeTruncLStop`, under Q49's default way (a)); 658 (`PrefixSetIndices`); 608 (`ImmutableArrayRangeSubscript`, after its record's note).
- Rung G, `aadd02f23`: 628 (`ProjectFortress/tests/UnwrittenBigOperatorsWalk.fss`); 473 (`ProjectFortress/tests/UnwrittenBigMinMaxWalk.fss`).
- Rung S, `74b28e9d4`: 606 (`StringPieces`); 635 (`NumberOrderListDeclarations`).

The tests, on the merged tree `fdd377ead`, from `/home/user/fortress-gather12`:
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1` with the batch's 40 interpreter programs, W's, R's, G's and S's, plain and expected failures, with their `.test` files, and the gather's `IntegerOrderNumerals.fss`:
  `# harness-one 2026-10-09T14:00:03Z; tree fdd377ead; nproc=4; load 0.02 0.39 0.71; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled`
  `OK (40 tests)`
  A first run on the same code, before the commits, named `XXXComprisesLibraryTraitUnlistedExtender.fss` without its unchanged `.test` file and read 'Tests run: 39,  Failures: 1' ("Missing expected failure"); with the file named, it is green.
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh merged ProjectFortress/compiler_tests` with C's six compiled `.test` files:
  `# junit.sh merged 2026-10-09T14:00:29Z; nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 1.80 0.78 0.83; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; tree fdd377ead; ...`
  `OK (12 tests)`

`python3 explorations/coordinator/tools/ledger.py check` after the closes: "669 rows, 9 fail the template; rows (or places) failing each rule: spec-path 8, reproducer-path 1, spec-section 1".

## Each rung

### C (`rung-checker-contexts`), landed first as `054c4bcfd`

**From the branch.** `REPORT.md`, `SKEPTIC.md` and `JUDGE.md` land; `record.md` was folded and does not. The skeptic's `e6deb7947` wrote the worker's `REPORT.md` and `record.md` from the run's journal on the branch; no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes.** `eb02ed48c` (corrections): the repeated operator's test asserts the outer application's instance; the tight juxtaposition of non-function items recorded with `XXXInferTightJuxtContext` and row 660; the label's type a union, not a join, in `REPORT.md`; the note on row 470. `b73143297` (defect, contested): an atomic body's checker refuses a `spawn` with or without an expected type; the judge upheld it (`35b9758e5`): "The fix overrides checkExpr(e, expected), the overloading every check goes through (STypeChecker.scala:478, :511). That is the cause", no revert.

**Folded.** The FACTS entry "The compiled checker gives a call its expected type in a clause of an `if` without `else` (`()`) ..." rewritten in place, its sub-items joined into one line, under its old title, which still holds (the record proposed a new title; FACTS keeps a title verbatim while it holds), its earlier text in `FACTS-history.md`. Row 660. The notes on rows 644 and 651 went into their closes condensed; the notes on 642, 455 and 470 were refused, and those on 560 and 627, closed rows, too (below). The handover line. The record gives no entry for the skill's part ("Revival change: none").

**Corrections.** The skeptic's item: `changes.tex`'s `row~NEW-C-1` is `row~660` (now `:2081`). The report's three sentences made false are amended by the rung itself.

### S (`rung-library-slips`), landed second as `74b28e9d4`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded. The skeptic's `b935a89b8` wrote the worker's `REPORT.md` and `record.md` from the journal; the gather wrote none.

**Skeptic's fixes**, both corrections, none contested: `8a23293b3` (the rounding pin's citation moved from a second comment line into an assertion's message); `b5868fe34` (the new Appendix I entry's Effect leaves the float types' rounding to row 330). No ruling.

**Folded.** The FACTS entry "The one library's storing objects, immutable factory and subarray, matrix product and transpose, `SUFFIX_SUM`, `String`'s `left` and `right`, and `QQ`'s `ceiling` and `truncate` answer their declared types" at the end of "The checker and the one library" (the brief's rule puts it last). Row 661. The notes on rows 514 and 577 went in; row 336's was refused (below). Rows 606 and 635 closed. The handover line. Both entries for the skill's part: "Rounding a rational at an infinity" at the end of "Numbers are siblings, not a tower"; "A string's `left` and `right`", which the record left to the gather, under "Traits and objects, no classes", the point the rung named as nearest, no point of `SKILL.md` fitting it. One line in `sources.md`.

**Corrections.** The skeptic's two items: `ProjectFortress/tests/IntegerOrderNumerals.fss:61`'s message no longer says "a strided range" and names the reversed range `SUFFIX_SUM` now loops over (the value asserted unchanged; green on the merged tree); row 336's note could not be written, the row's notes being at their limit (gather.2). The report lists no sentence left false.

### G (`rung-reduction-types`), landed third as `aadd02f23`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded. The skeptic's `0b177549a` wrote the worker's `REPORT.md` and `record.md` from the journal; the gather wrote none.

**Skeptic's fixes**, both corrections, none contested: `17e5c14d9` (the team's lines by their authors, Jan-Willem Maessen's, and `NotationGenericBigSum.fss` measured: it stops at load on the base and the rung alike); `dca01ad7e` (row 473's old witness of the open tuple's dispatch, gated as `OpenTupleDispatchWalk.fss` with row 663). No ruling.

**Folded.** The FACTS entry "The identity-less reductions are typed at their element type ..." at the end of "Landed semantics", its lines re-anchored (above); the three corrections of "Under `walk`, a type parameter whose bound mentions itself ..." (row 473's open half fixed, the residues, the witness row 663), the earlier text in `FACTS-history.md`. Rows 662 and 663. The note on row 646 went in; those on rows 433 and 405 were refused (below). Rows 628 and 473 closed, their notes condensed into the closes. The handover line. The entry for the skill's part under a new heading "Loops and reductions are library code", between "Numbers are siblings, not a tower" and "Specified, but not built", as in `SKILL.md`; one line in `sources.md`.

**Corrections.** The skeptic's three items: the three sentences of the specification that said `BIG MINMAX` stops (`Specification/basic/inference.tex:319-322`, `Specification/appendices/changes.tex:1069-1071`, `:1921-1924` now) say what the code does, that the library's set reductions `\bigcup` and `\bigcap` still stop at their first element (row 662; `XXXUnwrittenSetBigOperatorsWalk` on the merged tree: 'Library/FortressLibrary.fss:1304:18-34' and "Saw expected exception"), each an Effect or a note on walk; the skill's two sentences (`.claude/skills/fortress-repo/references/library.md:25`, `revival-changes.md`'s "A type parameter whose bound names itself, under walk") say the same; FACTS and the ledger as above.

### R (`rung-range-kinds`), landed fourth as `abe8b0342`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded. The skeptic's `12de8f4a2` wrote the worker's `REPORT.md` and `record.md` from the journal; the gather wrote none.

**Skeptic's fixes**, both corrections, none contested: `1a3fa193f` (`ArrayRangeCornerBounds.fss` pins the arrays' subscripts and subarrays of rank 2 and 3 that Q50 makes raise); `dc880ca13` (the report's and the record's citations, the tests' count, the arrays' raises in the record's entries). No ruling.

**Folded.** The FACTS entry "The one library's `narrowToRange` and its bounds check are declared at the range kinds over `ZZ32` of rank 1 to 3" at the end of "The checker and the one library" (the record asked for a place after the range entry; the brief's rule puts it last), lines re-anchored; the two amendments, of "The one library's range types provide a declaration on the meet ..." and "The one library's scalar ranges are over `ZZ32` alone", in place, the earlier texts in `FACTS-history.md`. Row 664. The notes on rows 608, 659 and 416 went in; those on 634, 488 and 577 were refused, and those on 600 and 599, closed rows, too (below). Rows 654 to 658 and 608 closed. The handover line. Both entries for the skill's part after "Bounded ranges of rank 2 and 3"; one line in `sources.md`. Item 49 of `PLAN.md` gained a sentence on what was built at its default.

**Corrections.** None owed: the skeptic left none, and the report lists no sentence made false.

### W (`rung-walk-load-checks`), landed last as `fdd377ead`

**From the branch.** `REPORT.md`, `SKEPTIC.md` and `JUDGE.md` land; `record.md` was folded. The skeptic's `ffd2792be` wrote the worker's `REPORT.md` and `record.md` byte for byte from the journal (the harness had refused the worker's write); the gather wrote none.

**Skeptic's fixes.** `ffd2792be` (correction): the report and the record from the journal. `a5f72a93a` (correction): the singleton field, the generic trait's override, the object expression in a generic function and the dotted diamond gated (`ObjectExpressionSingletonFieldWalk`, `XXXOverrideNothingGenericTraitWalk`, `XXXAbstractMethodUndefinedGenericObjectExpressionWalk`, `XXXDottedMethodMeetInheritedWalk`). `c17cff594` (defect, contested): walk binds every component's object expressions before any component's top-level variables; the judge upheld it (`8541c5286`): "The fix is one more per-component stage of Driver.evalComponent's loops (Driver.java:224-249). That is walk code, which no other rung edits", no revert, and the commit's `historical:` line names `ProjectFortress/src/com/sun/fortress/interpreter/Driver.java`, as the judge asks. `a9b7323ef` (corrections): the report's provenance lines and the record's entries.

**Folded.** The FACTS entry "Walk refuses at load an object that leaves an inherited abstract method without a body, ..." at the end of "Landed semantics" (the record asked for a place after the open-parameter entry; the brief's rule puts it last), its last sentence written for the merged tree: the record said the library needs the narrower-body allowance "until rows 628, NEW-W-4 and NEW-W-5 are repaired"; rung G repaired row 628, and on the merged code `FortressLibrary` loads without the allowance while `Pairs` does not (gather.1), so the entry names `Pairs`'s `SingleRange` and rows 668 and 669. The record's corrections of "Walk applies at load the Meet Rule for Functional Methods per providing type ..." and of "Under `walk`, a type parameter whose bound mentions itself ..." in place, earlier texts in `FACTS-history.md`. Rows 665 to 670, row 666's note as above. The note on row 444 went in; row 653's went in condensed. Rows 647, 648 and 649 closed. The handover line. The record's two entries for the skill's part: the amended Resolution of "A trait's `override`, and object expressions, under walk", and the new entry "An abstract method without a body, and an `override` that overrides nothing, under walk" after it, its Reason naming `Pairs`'s `SingleRange` where the record named `NewlineReduction`, for the same reason. The record's two refusals for `interpreter.md`, "What walk checks", with the list's lead sentence widened to name them. Lines in `sources.md`, under `revival-changes.md` and `interpreter.md`.

**Corrections.** The skeptic left none. W lands after G, and on the merged code walk refuses at load a reduction without static parameters whose `simpleJoin` is at `Any` or untyped, which G's records described as stopping at its first join (gather.3); in W's commit the gather rewrote that clause of G's FACTS entry, its earlier text in `FACTS-history.md`, and of G's entry in the skill's part. The report lists no sentence of the specification made false.

## The rungs that did not land

None: every rung of the batch was approved.

## The skill's part on the revival's changes

`.claude/skills/fortress-repo/references/revival-changes.md` exists, and each record's entry was put into it in its form:
- C: none, as its record says.
- S: "Rounding a rational at an infinity" (end of "Numbers are siblings, not a tower"); "A string's `left` and `right`" (end of "Traits and objects, no classes").
- G: "The lifted type of a reduction without an identity" under the new heading "Loops and reductions are library code"; its Resolution's sentence on a reduction at `Any` rewritten in W's commit for the merged code.
- R: "Checking a range of rank 2 or 3 against bounds" and "The trivial open range `(:)`", after "Bounded ranges of rank 2 and 3".
- W: the amended Resolution of "A trait's `override`, and object expressions, under walk"; "An abstract method without a body, and an `override` that overrides nothing, under walk" after it.

`sources.md`, section "revival-changes.md", has one line for each of S, G, R and W naming its `REPORT.md`, and section "interpreter.md" one for W.

## Ledger notes not written, and notes written condensed

`ledger.py note` refuses a note that would take a row past 700 characters of notes or 1,200 of line, and a note on a closed row (`explorations/coordinator/tools/ledger.py:115`, `:778-793`). The notes below, in the records' words with the rows' numbers put in, are the ones the ledger does not hold in full (gather.2).

- Row 455 (C): "Climb batch 12 rung C gives the expected type to a label body and its exits and to a repeated operator, not to an argument. Q48(b) is unanswered, and `XXXInferContextDrops` keeps both argument faces ('Saw expected failure' in the rung's `ant testQuick`)."
- Row 470 (C): "A dotted method invocation does check a written static argument against its bound (`staticArgsMatchStaticParamsForApp`, `STypesUtil.scala:771-800`), since climb batch 12 rung C with the other written arguments put in: `O.m[\Cell[\ZZ32\]\](Cell[\ZZ32\]())` for `m[\Q extends Cell[\String\]\](q: Q)` is refused, 'No such method O.m.', on 7fa767d48 and on d4697808b. A call of a top-level function does not: `f[\Cell[\ZZ32\]\](Cell[\ZZ32\]())` for `f[\Q extends Cell[\String\]\](q: Q)`, and `gen[\String, Cell[\ZZ32\]\](Cell[\ZZ32\]())` for `gen[\R, Q extends Cell[\R\]\](q: Q)`, compile and print 1 on both, and walk prints 1 (rung C's skeptic)."
- Row 642 (C; the row could not be closed, and its reproducer path is gone): "This follows the curator's answer to Q48(a) (POSITIONS, 'A `label` body takes the expected type of the whole `label`'). The body and each exit's `with` value take the label's expected type (`impls/Misc.scala:704-739` at d4697808b). `Library/String.fss:431` clears, and the distance goes from 207 to 206. The test is a `typecheck` test, because a compiled label stops at the code generator: 'Can't compile Label'." Its close is owed: `--commit 054c4bcfd --test InferResultOnlyLabelBody`.
- Row 560 (C, closed): "Item 36's thirteenth site, `Library/String.fss:431`, clears with row 642's repair (climb batch 12 rung C, d4697808b). The site is gone from the per-site list (`distance-sites.tsv:117`)."
- Row 627 (C, closed): "Row 651's second shape, which this renaming exposed, is repaired by climb batch 12 rung C (d4697808b) and gated by `MethodStaticArgsBoundNamesOtherSameName`. The renaming stays."
- Row 644 (C, written condensed in its close; the full text): "The multifix application, where a declaration accepts the operands, had the same defect. `y: BoxV[\ZZ64\] = 1 OTIMES 2 OTIMES 3`, with only `opr OTIMES[\T\](a: ZZ32, b: ZZ32, c: ZZ32): BoxV[\T\]` declared, was refused on 7fa767d48: 'Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].' The same change repairs it, and the same test asserts it (climb batch 12 rung C)."
- Row 651 (C, written condensed in its close; the full text): "Both shapes are repaired by climb batch 12 rung C: `staticArgsMatchStaticParamsForApp` puts the written arguments into the bounds (`STypesUtil.scala:771-800` at d4697808b). Compiled, `MethodStaticArgsBoundNamesOther` asserts 1 and `MethodStaticArgsBoundNamesOtherSameName` asserts 11. An argument that misses its substituted bound is refused: 'No such method O.gen.'"
- Row 336 (S): "The unbounded `ZZ` too: `big(1) DIV big(0)` ends the run, 'BigInteger divide by zero' (`BigNum.java:158-160` at 7fa767d48; batch 12 rung S)."
- Row 433 (G): "After climb batch 12 rung G (`1410a62de`), `MaxSumReductionPair` and `MinSumReductionPair` extend `ReductionPair[\T,Maybe[\T\]\]`, and the two `distribute` declare `PossibleReductionPair[\Maybe[\T\]\]` (`Library/FortressLibrary.fss:3263-3280`). The two return-type sites stay, and their message now names `Maybe[\T\]`; the four wellformed sites are unchanged."
- Row 405 (G): "In the library, `MinReduction`'s and `MaxReduction`'s `simpleJoin(a, b)` were a case of this, harmless while the abstract declaration took `Any`. Climb batch 12 rung G (`1410a62de`) typed them at `T`, as the api declares them (`Library/FortressLibrary.fss:3306`, `:3315`)."
- Row 628 (G, written condensed in its close; the full text): "Fixed by climb batch 12 rung G (`1410a62de`): `simpleJoin(a:R, b:R): R`, every `lift(r: R)`, and the lifted type `Maybe[\R\]` in the two traits, `LiftedCommutativeMonoidReduction`, the identity-less big operators and `Set`'s `BIG INTERSECTION`. With them, `ActualReduction`'s abstract `lift` at `R`, `Just[\R\]` in the lifted bodies, and `MinReduction`'s and `MaxReduction`'s `simpleJoin` at `T`, as the api declares them. The distance stage's 13 sites are gone (207 to 194 on the rung's tree)."
- Row 473 (G, written condensed in its close; the full text): "Open half fixed by climb batch 12 rung G (`1410a62de`): with `AssociativeReduction`'s `simpleJoin` at `R`, `MinMaxReduction`'s `simpleJoin` implements it, and `BIG MINMAX[i <- 0#4] i` unwritten is `(0, 3)`; `XXXUnwrittenBigMinMaxWalk.fss` promoted to `UnwrittenBigMinMaxWalk.fss` (`17dfc355b`). The four tuple forms answer too (`UnwrittenTupleMinMaxWalk.fss`)."
- Row 634 (R): "Under Q50, `narrowToRange` of rank 2 and 3 compares with `PCMP` (`Library/RangeInternals.fss:140-172`) and no longer reaches the tuples' `<` and `>`; the 18 sites are unchanged (batch 12 rung R)."
- Row 488 (R): "again: batch 12 rung R's distance run lost the site at `BIG LEXICO`'s body (`Library/FortressLibrary.fss:130`), which the rung does not touch."
- Row 577 (R; S's note went in first): "again: rung-range-kinds, section 3"
- Row 600 (R, closed): "Its last sites, rows 654 to 656, fixed by climb batch 12's rung R."
- Row 599 (R, closed): "Its last site, row 654, fixed by climb batch 12's rung R."
- Row 653 (W, written condensed; the full text): "Walk's half fixed 8803d2f45: walk refuses it at load, '... has the modifier override and does not override any inherited declaration' (`tests/OverrideNothingWalk.fss`); a generic object's is not refused (665)." Its reproducer, `ProjectFortress/tests/OverrideNothingWalk.fss` for walk's half, cannot be set with `ledger.py`, as `CLIMB-BATCH-12.md`, "The ledger", foresaw; listed here for the coordinator.

## Points to report

None holds the push: every point below is reversible, and no step taken cannot be undone or acts against a decision on record. Where the worker and the skeptic listed one point twice, it is listed once.

Rung W:
- A library type, a team test or a demo that walk now refuses at load: the demos `BirdCount1z.fss` and `BirdCount2a.fss`, which ran with exit 0, and `GenomeUtil1z.fss` and `GenomeUtil2a.fss`, because `FileBasedReadList` does not define `ReadList`'s `nextRange()` (`ProjectFortress/demos/GenomeUtil1z.fss:68`, `:72-111`; `GenomeUtil2a.fss:74`, `:78-117`), refused by `Constructor.checkForDef` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:429`); from `ProjectFortress/demos`, `../../bin/fortress BirdCount1z.fss` on `8803d2f45`: 'Object FileBasedReadList does not define an abstract method declared in type ReadList: .../GenomeUtil1z.fss:68:3-17: nextRange():()'. Row 670.
- The same: the demo `npbft.fss`, whose `Complex` extends `Number` with no `asFloat` (`ProjectFortress/demos/npbft.fss:36-52`; `Library/FortressLibrary.fss:379`); new 'Object Complex does not define an abstract method declared in type Number', old 'Failed to find any matching overload' at `npbft.fss:31:5-7`.
- The same: the team test `XXXUnimplementedMethod.fss`, whose object `O` leaves `T`'s abstract `a(Sub2, Sub1)` undefined (`ProjectFortress/tests/XXXUnimplementedMethod.fss:31-33`); its verdict stays green, now a refusal at load where it failed at run time.
- An interpreter test whose verdict changes other than by the rung's intent: the revival's `XXXComprisesLibraryTraitUnlistedExtender.fss` turned red under the new check and was respelled with `asFloat(self): RR64 = 0.0` in `Value`, so it still measures row 22 (`ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss:6-8`); green on the merged tree with its `.test` file.
- A load check that instantiates a generic type to read it: the Meet Rule's symbolic stand-in for each generic trait, object and object expression, 146 per load of the one library, none refused (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1032-1055`, `:1278-1280`; `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:186`).

Rung C:
- A program the text allows that the checker now refuses, outside rows 642, 644 and 651, from the contested fix `b73143297`, not from the worker's change: `k(): Any = atomic do g = fn (): Any => spawn 3; g end` crashed on the base and on the worker's head ('Not in the trait table: CompilerBuiltin.Thread') and is now refused at 6:23-29, "A 'spawn' expression must not occur inside an 'atomic' do block." (`bin/fortress typecheck SkAtomicSpawnFn.fss`; `Specification/basic/expressions/spawn.tex:28-31`).

Rung R:
- Values walk prints that change: Q50's four raises (`ProjectFortress/tests/RangeKindBodies.fss:94-97`; `Library/RangeInternals.fss:140-172`): `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` was `CompactFullRange2D(2,0, 5,5)`, and three like cases answered; now each raises `IndexOutOfBounds`.
- Values walk prints that change: the arrays' range subscripts and subarrays of rank 2 and 3 with a corner outside on one axis (`ProjectFortress/tests/ArrayRangeCornerBounds.fss:10-14`; `Library/FortressLibrary.fss:2533`, `:2585`, `:2944` now): `a[(1,-1):(2,2)]` on a 3-by-3 array was `[0#2,0#3]`, `a.subarray[\0,1,0,4,0,0\](1,1)` read `a`'s `(1,0)` as its `(0,3)`; now each raises.
- Values walk prints that change: Q49's five stops (`Library/FortressLibrary.fss:3887-3898` now; `ProjectFortress/tests/TrivialOpenRange{TruncL,TruncR,Every,ImposeStride,AtMost}Stop.test`): `(:).truncL(3)` was `LeftScalarRange(3,1)` and so on; now each ends the run, 'FAIL: <method> of the trivial open range (:), whose index type is Any'.
- Values walk prints that change, any other: `(:):3` and `(:)#3` now stop through `imposeStride` and `atMost`; `f[2:8:3]` on a frozen `ImmutableArray1` stopped and is `[0#3](immutable)[ 20 50 80 ]`; a prefix set's `indexValuePairs.indices` stopped and is `[0,1]` (`Library/FortressLibrary.fss:4125`, `:4130`, `:2255`; `Library/PrefixSet.fss:478`).
- A library caller of the open range's five methods, found by reading: `opr :[\I\](r: Range[\I\], stride:I) = r.imposeStride(stride)` and `opr #[\I\](r: PartialRange[\I\], size:I) = r.atMost(size)` (`Library/FortressLibrary.fss:4125`, `:4130`); no stop in the interpreter suite.
- A new api declaration beyond the moved bodies: `checkSelection2D` and `checkSelection3D`, `checkSelection` narrowed to `ZZ32`, twelve meets `narrowToRange(other: OpenRange[...])` at the kinds and open kinds, and `TrivialOpenRange`'s two `narrowToRange` (`Library/RangeInternals.fsi:42-46`, `:58`, `:82`, `:116`, `:147`, `:164`, `:180`, `:256`, `:270`, `:280`, `:426`, `:452`, `:474`; `Library/FortressLibrary.fsi:2212-2213`); no team declaration removed.

Rung G:
- Values walk prints that change: `BIG MINMAX[i <- 0#4] i` unwritten, a stop before, `(0, 3)` after; the four tuple forms over `(i MOD 2, i)`, stops before, `(0,0)`, `(0,2)`, `(1,1)`, `(1,3)` after; the stops that remain moved to the typed `lift` (`Library/FortressLibrary.fss:1304`); a program's own reduction in the old spelling printed 'oldcat 0-1-2' and stopped at `generate` on G's tree, and on the merged tree is refused at load when it has no static parameters (gather.3) (`ProjectFortress/tests/UnwrittenBigMinMaxWalk.fss:7`, `UnwrittenTupleMinMaxWalk.fss:7-19`).
- Row 473's expected failure moving: `XXXUnwrittenBigMinMaxWalk.fss` promoted to `UnwrittenBigMinMaxWalk.fss` (`17dfc355b`); row 433's two `distribute` sites keep their site and kind, their message now naming `PossibleReductionPair[\Maybe[\T\]\]` (`Library/FortressLibrary.fss:3278`, `:3280` now).
- Team test lines changed, each keeping its value: `ProjectFortress/tests/HeapTest.fss:80` (Jan-Willem Maessen, `a9556395f`); `ProjectFortress/tests/RangePrototype.fss:213`, `:336-337` (his, `ec62365b1`); the demo `ProjectFortress/demos/HeapShakedown.fss:99` (his, `28cb348b8`); and the revival's `ProjectFortress/tests/GeneratorDeclarations.fss:14`.
- An api declaration changed beyond the lifted type: `AssociativeReduction`'s abstract `simpleJoin(a:Any, b:Any): Any` is `simpleJoin(a:R, b:R): R` (`Library/FortressLibrary.fsi:1907`).
- Big operators whose unwritten clause form stops under walk after the typing, none newly: `Set`'s `BIG UNION` and `BIG INTERSECTION` (`R extends StandardTotalOrder[\R\]`, 'lift param 1 (r:Set[\OPEN\]) got arg NodeSet[\ZZ32\]', row 662); `BIG SQCAP` and `BIG SQCUP` (`T`, at `UniqueItem[\BOTTOM\]`); `List`'s and `PureList`'s `BIG CONCAT` (`T`, at `List[\BOTTOM\]`); `PrefixSet`'s `BIG UNION`, and, the skeptic adds, its `BIG INTERSECTION` and `BIG SYMDIFF` ('lift param 1 (r:PrefixSet[\OPEN,BOTTOM\]) got arg fastPrefixSet[\ZZ32,List[\ZZ32\]\]', where the base stopped at `join`); each stopped on the base too (`Library/FortressLibrary.fss:1304`; `explorations/compile-ladder/rung-reduction-types/SKEPTIC.md`, section 2).

Rung S:
- Values walk prints that change: `String`'s `left` and `right` (the character before, `Just` of it after); `QQ`'s `ceiling`, `truncate`, `floor` and the two brackets at 1/0, -1/0 and 0/0 (the argument before, `DivisionByZero` after); `round` at those values (a walk stop before, `DivisionByZero` after); `TransposedMatrix`'s `add`, `subtract` and `negate` (a walk stop before, values after) (`Library/FortressLibrary.fss:4160-4161` now, `:644-652`, `:2797-2799`).
- An array site that needs an answer to the array forks, touched: `__immutableFactory1`'s own body site stays, its message now naming `ImmutableArray1` (`Library/FortressLibrary.fss:2431`, base `:2432`).
- A team declaration removed: `__ImmutableSubArray1`'s `put` (`Library/FortressLibrary.fss:2381` at `7fa767d48`, `put(i:ZZ32,v:T): () = arr.put(index(i),v)`).
- A change to which declaration walk runs for a set it loads today: `put` on an immutable subarray found the object's `put`, which then stopped inside, and now finds none and stops at the call (old 'Library/FortressLibrary.fss:2381:27-44: Cannot find definition for method put given receiver PrimImmutableArray[\ZZ32,3\]'; new 'Cannot find definition for method put given receiver __ImmutableSubArray1[\ZZ32,0,2,0,3\]'). A transposed matrix's operators are unchanged.

## Items for the curator, and where each is in `PLAN.md`

Under "Pavol's answers, in the order they are needed", "Before the switch-over, raised by climb batch 11":
- R.worker.1, R.skeptic.1, Q49 still open: item 49 ("`TrivialOpenRange`'s five methods `truncL`, `truncR`, `every`, `imposeStride` and `atMost` ..."), which gained a sentence on what rung R built at its default, what (b) and (c) undo, and the two operators that reach two of the methods.

Under "Off the path, parked":
- G.worker.1, G.skeptic.1, row 662 and D2's case: D2's entry under "Climb batch 9, listed for his review" ("Decision D2 of climb batch 9's rung W, and its stop ..."), a sentence added.
- Under the new subsection "Climb batch 12, listed for his review":
  - C.worker.1, C.skeptic.2: "Do a `try` block and its `catch` clauses, and the body of an `atomic` or `tryatomic` expression, take the expected type of the whole ...".
  - C.skeptic.1: "Should the inference chapter's list of contexts ... gain an expression that is not the last element of a block ...".
  - C.judge.1: "A program the text may allow is now refused where the checker crashed, from the skeptic's fix `b73143297` ...".
  - S.worker.1: "`TransposedMatrix`'s `add`, `subtract` and `negate` ... have bodies that type-check since climb batch 12's rung S ...".
  - S.worker.2: "Row 661: the one library declares its strided `:` as ...".
  - G.worker.2: "`explorations/astra/worker/notation/NotationGenericBigSum.fss:9-20`, an earlier exploration's program ...", with the skeptic's measurement that it stops at load on the base too.
  - W.worker.1, W.skeptic.1 and gather.1: "Q1 of climb batch 12's rung W, carried by its skeptic, with the gather's gather.1 ...".
  - W.worker.2, W.skeptic.2: "Q2 of climb batch 12's rung W, carried by its skeptic ...".
  - W.judge.1: "The scope of a skeptic's fix, from climb batch 12's rung W's judge ...".
  - gather.2: "gather.2, from climb batch 12's gather, beside climb batch 11's gather.1 above ...".
  - gather.3: "gather.3, from climb batch 12's gather: rungs W and G meet at load on the merged tree ...".

The gather's own points:
- gather.1: on the batch's merged code, with rung W's allowance for a body at narrower types switched off in a scratch build, a program importing only the default library loads, since rung G typed `simpleJoin` at `R`, and one importing `Pairs` is refused: 'Object SingleRange does not define an abstract method declared in type RunRanges: /home/user/fortress-gather12b/Library/Pairs.fss:80:3-81:1: ?(RunRanges):RunRanges'. `SingleRange` defines `BOXPLUS` only at the two types `RunRanges comprises` (`Library/Pairs.fss:78-87`), Q1's shape in the library. So row 666's allowance now serves `Pairs` (and, by reading, rows 668 and 669), not `NewlineReduction`, and rung W's records were folded so.
- gather.2: the gap ledger's tool has no route for row 642's close or note, for row 653's reproducer, or for the notes above at their limit.
- gather.3: rungs W and G meet at load on the merged code: a program's own reduction without static parameters whose `simpleJoin` is at `Any` or untyped is refused at load ('Object CatRed does not define an abstract method declared in type AssociativeReduction', a scratch probe), one with static parameters stops at its first join; the gather wrote this into G's FACTS entry and skill entry in W's commit.

No text mismatch between one rung's specification text and another rung's code was found: C's lists and Appendix I entry speak of the compiled checker, S's paragraph and entry of `QQ`'s rounding, and no other rung's code changes either; the gather's corrections for G changed only the sentences that said `BIG MINMAX` stops.
