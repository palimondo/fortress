# The probe merge, 2026-09-16

What this merge entered into `explorations/fortress-gap-ledger.md` from five probe reports, how the numbers were assigned, what was folded rather than entered, what was checked before each row went in, and what is flagged for a decision.
Companion to the ledger's own closing section ("The probe merge (2026-09-16)"), and the sequel to `../apl-merge/MERGE.md` (the APL ladder and Run C4) and `../apl-merge/MERGE-feasibility.md` (the feasibility study).

## What was entered

23 rows, **288-310**, continuing from row 287.
Two claims folded into rows this merge itself entered.
No new section: the rows went into the sections their subject belongs to, which is how every merge before this one placed them.

The five sources, in the order the numbering rule names them:

| source | candidates as drafted | entered as |
|---|---|---|
| `perf-probes/grammar-compile/REPORT.md` §7 | 288, 289, 290, 291 | **288, 289, 290, 291** — unchanged |
| `run-c4/probes/vocabulary/REPORT.md` §C | 284, 285, 286, 287, 288, 289, 290, 291, 292, 293 | **292, 293, 294, 295, 296, 297, 298, 299, 300, 301** |
| `perf-probes/boxing/REPORT.md` §5 | 288 | **302** |
| `perf-probes/kernels/REPORT.md` §5 | 289, 290, 291, 292 | **303, 304, 305, 306** |
| `perf-probes/prelude/REPORT.md` | none — the report has no candidate table | **307, 308, 309, 310**, written here from its findings |

**Why grammar-compile keeps its numbers.** Its four candidates were drafted as 288-291 and two documents written the next day already cite them: `reviews/template-checking-plan.md:146-147, 154, 174` cites rows 288, 290 and 291, and `explorations/coordinator/FACTS.md:37` cites "Candidate rows 288-291 in the report".
(`reviews/nat-checking-plan.md` cites no ledger row by number; the brief expected it to cite these, and it does not.)
Every other report's candidates were therefore numbered from 292 upward in the order vocabulary, boxing, kernels, prelude, and each report now carries a line at the top of its candidate section giving the ledger's final numbers.

**The vocabulary report's collision.** Its candidates were drafted as 284-293, and 284-287 were taken by the APL rung 4b before it was written; `reviews/fortress-characterized.md:240-259` already warns of exactly this ("candidate rows 284, 287 of `vocabulary/REPORT.md:74-89`" — "ledger rows 284 and 287 are rung 4b's"). Those two candidates are now rows **292** and **295**, and the ledger's own note under "What the recount changed" says so.

Where the 23 rows went, by section:

| section | rows |
|---|---|
| 1. Grammar and lexing | 301 |
| 3. Type system and inference | 300 |
| 4. Overloading and operators | 295, 296, 297 |
| 6. Arrays, vectors, matrices, slicing | 292, 293, 294 |
| 10. Bytecode-compiler path | 288, 289, 304, 305, 307, 308, 309, 310 |
| 15. Program shape and cost | 298, 299, 302, 303, 306 |
| 16. Syntax extension | 290, 291 |

## Folded rather than entered

Both folds are findings of `perf-probes/prelude/REPORT.md`, the one report with no candidate table of its own, and both were folded into rows this merge entered from another report rather than into an older row.

| folded | into row | why |
|---|---|---|
| prelude §1: `fortress compile Library/FortressLibrary.fss` as an ordinary component gives **1417** disambiguation errors, 78 % of them `FortressLibrary` against `CompilerBuiltin`/`CompilerLibrary`, byte-identical under `fortress disambiguate` | 288 | the same two-prelude collision the grammar-compile probe met from the other direction, and the prelude report itself calls its count "an artifact, not a finding" |
| prelude §4 first half: `fortress compile explorations/run-c4/src/FlatArrays.fss` in the compiler's world gives the same **77** errors, `Array is undefined.` 60, `Array3` 11, `Vector` 6, all in DISAMBIGUATE | 305 | the kernels probe's row is the same fact; the prelude probe adds the message census and the finding that a minimal `Array`/`Vector` shim is not possible, both now in row 305's notes |

Nothing else folded.
Every other candidate was checked against the ledger by its key identifiers before it was entered, and the near misses are recorded as cross-references in the new rows rather than as folds:

- 292 against 246 (there is no rank-3 analogue of `Vector`/`Matrix`) — 246 is a positive capability about rank dispatch, 292 is the absence of an algebraic trait; 292 cites it.
- 293 against 109 (`Matrix` has no elementwise product) — 109 records the absence, 293 is its cause plus two new facts (the exclusion is not checked at declaration, and the inherited `+` dies with a `** bug!`); 293 cites it.
- 295 against 161 (one declaration generic in the **index** type) and 53 (the tower's `Number` self-typing); 295 is the element-generic form and the spec's own bound failing on `RR64`.
- 296 against 159 (two generic `opr` declarations of one operator are rejected without an excluding pair) — 159 is within one component, 296 is a user declaration against an imported one, which is not checked.
- 297 against 97 and 214 (the Meet Rule, and rank dispatch through `Vector`/`Matrix`).
- 298 and 299 against 54, 226 and 154 — those rows say the library's row view loses the algebra and that cost tracks multiply-adds; 298 and 299 price the two views.
- 300 against 131, 176 (untyped lambdas) and 156 (the `nat`-generic function that is *not* a value).
- 301 against 144 and 158 — it is the workaround those two rows lacked.
- 303 against 302 — the kernels probe corrects the boxing probe rather than repeating it, and both rows say so in each other's notes.
- 304 against 81 (`Can't compile Label`) — the same `sayWhat`, a different construct.
- 305 against 72 (G2, no generic `array[\T\]`) — **row 72 was sharpened in place**: its own entry is untouched, but worklist item 2 now says that what is missing is the array *types*, not only the constructor, and cites row 305.

## Kind assignments, and the ones that are arguable

The ledger's kind is derived from the **first-named class** in the class cell: `implementation gap`, `library bug`, `typesetter` → defect (A); `design limit`, `deliberate`, `packaging` → limit (B); `library gap vs spec` → never built (C); no class → capability (D).
The 23 rows are 9 A, 6 B, 2 C, 6 D.
Four assignments are arguable and are flagged rather than decided:

1. **Row 288's class order was changed.** The report wrote "design limit (the two worlds …) + implementation gap (no compiler-world `FortressAst`/`FortressSyntax`)"; the row names the implementation gap first, so that it buckets as a defect the revival could fix, which is what the report's own "what it would take" paragraph describes. The row still names both.
2. **Row 293 is entered as a design limit with an implementation gap beside it**, as the report wrote it. Its fixable half — the exclusion that is not checked at declaration, and the `** bug!` dead `+` — is added to the ledger's "Rows no item closes, deliberately" paragraph beside rows 8, 30, 91 and 165, on the same reasoning: fixing the diagnostic moves a symptom, not the limit.
3. **Row 308 is entered as a `library bug`.** The evidence is that the library's comparison and numeric tower violates the `comprises`/exclusion rules the spec states and the checker enforces, and that it was never checked because `walk` leaves the checker off. It could instead be read as the checker being stricter than the language means to be — the report itself calls it "a language-design conversation about `comprises` and exclusion, not a typo hunt" — in which case the class is `design limit` or `spec divergence` and the row moves from kind A to kind B. The row's notes carry that sentence so the reading is not lost.
4. **Row 309 is entered as a `design limit`** (the two worlds' two native conventions), not as an implementation gap: nothing is broken, the compiled path simply has another convention and `builtinPrimitive` is inert data in it. Its positive half — 4.7 % of the file, and about 79 of the 108 bindings already answered by a `nativeHelpers/` method — is what makes the row worth having.

**A performance section was not created, and that is flagged.**
The brief allowed one; the conservative reading is that section 15, "Program shape and cost", already holds every cost measurement in the ledger (139, 154, 163, 245, 256), so the five new ones went there and the section now holds ten rows.
Splitting them out is a change to the ledger's shape, which is not this merge's to make; the ledger's closing section says so in place.

One further placement is a judgment call rather than a kind: **rows 290 and 291 went into section 16 (the mechanism) and 288 and 289 into section 10 (the compile path)**, though all four come from one probe and cite each other. The ledger places rows by subject, so the two template-checking rows sit with the other template rows.

## Counts

Before: 286 rows, numbering 1-287 with 148 vacant.
After: **309 rows, numbering 1-310 with 148 vacant.**

| | before | after |
|---|---|---|
| POSITIVE-VERIFIED | 102 (+30 both marks) | **110 (+35 both marks)** |
| NEGATIVE-VERIFIED | 145 (+30 both marks) | **155 (+35 both marks)** |
| NEGATIVE-BOUNDED | 5 | 5 |
| CONTESTED | 1 | 1 |
| RETIRED | 3 | 3 |
| A. defects the revival could fix | 88 (+1 contested) | **97 (+1 contested)** |
| B. design limits no fix changes | 74 | **80** |
| C. never-built parts of the design | 20 | **22** |
| D. verified capabilities | 103 | **109** |

The kind table reproduces exactly under a script over the table's class cells, before and after.
The status table does not: derived over the 286 rows as they stood, the split is 101 / 146, not the 102 / 145 the previous merge left.
The cause is rows 284 and 286, entered after that count was written: both are negative, and only the totals were carried forward.
This merge writes the derived figures (110 / 155) and the ledger says so in place, rather than carrying the discrepancy forward.

The by-class paragraph was re-derived too, counting **every** class a row names rather than mixing the two methods: implementation gap 92, design limit 75, library gap vs spec 21, library bug 10, deliberate 5, typesetter 3, packaging 5, spec divergence 1, no class 108.
The figures it replaces (78 / 64 / 18 / 9 / 3 / 3 / 5 / 1 / 97) were written when the ledger stopped at 283.

## The worklist

Four items were **appended as 43-46 rather than interleaved**.
The list is ordered by rows closed, and re-sorting it would renumber items that other documents cite (`fortress-characterized.md:230-239`, `gap-cross-run.md:354-356`, and item 20 inside the ledger itself), so the new items sit after 42 with their own counts and the ledger says why.

| item | fix | rows closed |
|---|---|---|
| 43 | a user grammar on the compile path: a compiler-world `FortressAst`/`FortressSyntax` plus the six names `List.fsi` needs; then `isParenthesized` through the template translator; then template ASTs in the type checker (`reviews/template-checking-plan.md`) | 288, 290, 291 |
| 44 | the compiled path's per-iteration waste, then its representation: the `inATransaction` debug string (`BaseTask.java:248`), the `FFloatLiteral` decimal round-trip, then unboxing and `double[]` (`performance-roadmap.md` A1/A2) | 302, 303, 306 |
| 45 | the compile path's type checker: `nat`/`int`/`bool` static parameters (`reviews/nat-checking-plan.md`), then the 92 tower errors | 307, 308 |
| 46 | give rank 3 the algebra rank 1 and 2 have | 292 |

Item **2** (compiler-path library parity) gained rows **304** and **305**, and now says that what is missing is the array *types*, not only row 72's constructor, and that `LetFn` joins `Label` in codegen.
No item lost a row and no item was renumbered.
Rows 289, 294, 295, 296, 297, 298, 299, 300, 301, 309 and 310 close no item, by the ledger's own rule: capabilities and design limits are not worklist material.

## What was re-run, and what was not

The brief forbade re-running the long benchmarks and the test suite, so **five rows stand on the `.out` files committed beside their probes** — 298, 299 (the vocabulary review's timed probes), 302, 303 and 306 (the boxing and kernels benchmarks, three timed runs per form on a rebuilt bytecode cache).
Each of those five rows says so in its notes, and the ledger's header comment names them, so the file no longer claims that every row in it was re-run.

Re-run here, all cheap, all from the repository root with `source experiment/env.sh` (JDK 25, `FORTRESS_THREADS=1`, `-Xmx4g -Xss64m`):

```bash
cd $FORTRESS_HOME/explorations/run-c4/probes/vocabulary
export FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/run-c4/src:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library"
$FORTRESS_HOME/bin/fortress v17_calldot.fss        # row 301
$FORTRESS_HOME/bin/fortress v04b_groupbound.fss    # row 295, the negative half
$FORTRESS_HOME/bin/fortress v09_mapfn.fss          # row 300

cd $FORTRESS_HOME/explorations/perf-probes/prelude  # default source path
$FORTRESS_HOME/bin/fortress pNat1.fss ; $FORTRESS_HOME/bin/fortress pNat2.fss ; $FORTRESS_HOME/bin/fortress pNat3.fss   # row 307, the interpreter half
```

Output: `rerun-vocabulary.out` and `rerun-nat-interpreter.out` in this directory.
All six agreed with their committed `.out` line for line (the three `pNat` probes print `7` each, as `13-nat-interpreter.out` records; the three vocabulary probes are byte-identical to `v17_calldot.out`, `v04b_groupbound.out.0` and `v09_mapfn.out` once the runner's own `exit N (M s)` line is removed).
Nothing was re-run that would have written into a probe directory: the vocabulary runner appends `.out.N` files, so the probes were run by hand with the output collected here.

Every file-and-line citation the 23 rows carry was checked against the tree, and **two needed repair**, both in the vocabulary report and both into `Library/FortressLibrary.fss`: `:2497-2551` for `Matrix.mul` is `:2506-2547` (`:2497` is the `trait Matrix` line, and the `res = matrix[\T,s0,s2\]()` the row quotes is `:2507`), `:2553-2571` for `TransposedMatrix` is `:2571-2589` (`:2553` is the end of `rmul`, and `rmul`/`lmul` are `:2549-2553` and `:2554-2570`), and the same report's `:2503-2540` for `mul` under the diagonal row is the same `:2506-2547`.
The ledger rows carry the repaired numbers; `run-c4/probes/vocabulary/REPORT.md` is left as it stands but for its renumbering.
Everything else held: `Library/FortressLibrary.fsi:1652-1655` (`Array3`, which also extends `Indexed1`/`2`/`3` — the row says so, where the report named only two supertraits), `:1460-1462`, `:1578-1580`, `:273-276`, `:1072-1078`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:531` and `:550`; `Library/CompilerLibrary.fss:512` and `:340-348`; `Library/CompilerLibrary.fsi:194-202`; `Library/FortressAst.fsi:6`; `Library/FortressSyntax.fsi:14`; `compiler/WellKnownNames.java:113-126`; `compiler/phases/PhaseOrder.java:137-147`; `compiler/codegen/CodeGen.java:1552`; `runtimeSystem/BaseTask.java:248`; `scala_src/useful/STypesUtil.scala:546-559` and `:1938-1948`; `scala_src/typechecker/impls/Operators.scala:237`; `scala_src/typechecker/TypeWellFormedChecker.scala:95`; `Specification/basic/expressions/blocks.tex:40-44` (the row widens the report's `:43` by one line so the sentence is whole) and `basic/expressions/aggregate.tex:152-170`.

## Files this merge changed

- `explorations/fortress-gap-ledger.md` — 23 rows, two folds written into rows 288 and 305, the header comment's sources and its re-run claim, the counts by status, by class and by kind, worklist item 2 and the new items 43-46, the two paragraphs under the worklist, and a new closing section.
- `explorations/gap-cross-run.md` — the 23 rows (ten marked `run-c4`, thirteen `ours`), the header's 286 → 309, the source comment, the `run-c4` paragraph, and a closing section for the probe merge.
- `explorations/run-c4/probes/vocabulary/REPORT.md` — the candidate table renumbered 284-293 → 292-301, one internal cross-reference (its "row 288" is row 296), and a note at the top of §C.
- `explorations/perf-probes/boxing/REPORT.md` — its candidate renumbered 288 → 302, and a note above the table.
- `explorations/perf-probes/kernels/REPORT.md` — its candidates renumbered 289-292 → 303-306, its "Refines row 288" now row 302, and a note above the table.
- `explorations/perf-probes/grammar-compile/REPORT.md` — a note above the table saying the numbers are final and why, and where the four rows sit.
- `explorations/perf-probes/prelude/REPORT.md` — a new short section listing rows 307-310 and the two folds.
- `explorations/coordinator/FACTS.md` — **numbers only**, where a citation would otherwise point at the wrong row: "candidate row 291" → row 305, "candidate row 290" → row 304, "Candidate ledger row 288 in the report" → row 302, "(rows 284; …)" → row 292, "(rows 64, 109, 285)" → rows 64, 109, 293 (285 is a different, existing ledger row, so this one was a live misdirection), and "(its candidate row, unmerged)" → (row 295). No fact was rewritten.
- This file, `rerun-vocabulary.out` and `rerun-nat-interpreter.out`.

Nothing outside `explorations/` was modified.
`explorations/perf-probes/template-check/` was not touched and no row was entered for it.

## Note on the two `.out` files in this directory

`*.out` is gitignored at the repository root (`.gitignore:46`) and `gap-ledger-probes/` has no un-ignoring `.gitignore` of its own, so `rerun-vocabulary.out` and `rerun-nat-interpreter.out` need `git add -f` to be committed.
Both are short and both agree with committed output that is already in the tree, so nothing is lost if they are not.
