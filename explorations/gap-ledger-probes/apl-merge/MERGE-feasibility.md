# The APL feasibility merge, 2026-09-15

What this merge entered into `explorations/fortress-gap-ledger.md` from the
closing table of `explorations/apl-probes/REPORT.md`, how every reproducer was
re-run before its row was entered, what differed, and what was found wrong in
the source table. Companion to the ledger's closing section ("The APL feasibility
merge (2026-09-15)") and the sequel to `MERGE.md` (the APL ladder and Run C4,
2026-09-14), whose item 3 under "What was found wrong in the source tables"
named this table as the obvious next merge.

## What was entered

18 rows, **266-283**, continuing from row 265. **None folded.**

The source is the table headed "New ledger rows" at the end of
`apl-probes/REPORT.md` — the feasibility study that preceded the APL ladder
(same directory's probes, run 2026-09-10/11), never merged, and already cited by
four ledger rows as if it had been (180, 185, 188, 197).

The map, in the source table's order:

| # | claim, short | section |
|---|---|---|
| 266 | the syntax-abstraction mechanism runs on this tree | 16 |
| 267 | the spec's `syntax OpenExpander Id CloseExpander = Expr` is unimplemented | 16 |
| 268 | the `transformer/` examples use a dead spelling; the build never runs them | 16 |
| 269 | a grammar may be declared only in an api | 16 |
| 270 | template free names resolve at the use site | 16 |
| 271 | an api declaring nonterminals must `import FortressAst.{...}` | 16 |
| 272 | `*`/`+` repetition splices with `**` into a **typed** list literal only | 16 |
| 273 | a `*`-bound gap without `**` is a raw Java cast error | 16 |
| 274 | a bound `?` gap is `not supported now` | 16 |
| 275 | `case … of` knows only `Cons`/`Empty` | 16 |
| 276 | sub-grammar terminals and character classes may be any characters | 16 |
| 277 | `⦇` U+2987 / `⦈` U+2988 are free; no pair is privileged | 16 |
| 278 | U+2336-U+237A is not an operator character set, by spec too | 1 |
| 279 | monadic and dyadic of one shared glyph coexist | 4 |
| 280 | `⌈ ⌉ ⌊ ⌋` are enclosers; the bracketing declaration works | 4 |
| 281 | a complete APL array library runs on the walk interpreter | 6 |
| 282 | a right-to-left APL sub-language as a user grammar | 16 |
| 283 | no working `RR64 → ZZ32` conversion (`narrow`) | 2 |

**Why nothing folded.** Every existing row was checked against each of the
eighteen. No ledger row carried any of these claims: the ladder's rows (179-265)
all presuppose that the mechanism works and none of them states it, the three
unimplemented corners (273, 274, 275) are cited by ladder rows but were never
entered, and the host-level glyph rows (278, 279, 280) are the *premises* of rows
185, 216 and 233 rather than the same claim. Row 283 came closest to a fold, into
row 188 — but 188 is a different failure (`RR64.truncate()` on the retired first
library) that its own notes call a sharpening of this one, so the brief's rule
applies: a feasibility row later sharpened by a rung row is entered with the
cross-reference, not dropped.

The cross-references entered for that reason, from the new row to the rung row
that sharpened it: 270 → 204, 243; 272 → 197 (and → 20, an older row whose
mechanism it meets); 274 → 180, 197; 276 → 232, 181; 278 → 185, 216, 233;
279 → 216, 233; 280 → 216; 281 → 192, 7; 282 → the whole ladder, 179-265;
283 → 188. Downward references were added where the new row is the premise:
266 → 67, 269 → 190, 275 → 282, 277 → 181, 250, 281 → 280, 282.

## The four citations that treated the table as merged

Repaired in place, now naming the rows this merge entered:

| ledger row | was | now |
|---|---|---|
| 180 | "the feasibility table at the end of `apl-probes/REPORT.md`, which this ledger has never merged" | "row 274; … written while that feasibility table was still unmerged — it is rows 266-283 here" |
| 185 | "(apl-probes' row on the U+2336-U+237A block)" | "(row 278)" |
| 188 | "Sharpens the apl-probes row on `narrow`" | "Sharpens row 283 (the feasibility row on `narrow`)" |
| 197 | "the negative half is the apl-probes row on `b07b_optvar` (…`ComposingSyntaxDefTranslator.java:509`)" | "the negative half is row 274 (`b07b_optvar`, …`:508-509`)" |

## How every reproducer was re-run

Environment for all runs:

```bash
source /home/user/fortress/experiment/env.sh     # JDK 25, FORTRESS_THREADS=1, -Xmx4g -Xss64m
```

**The feasibility probes** (rows 266-270, 272-283), 21 components, run from
their own directory with the **default** source path, as `apl-probes/REPORT.md`
prescribes ("tree as built, nothing rebuilt, nothing outside this directory
touched"):

```bash
cd $FORTRESS_HOME/explorations/apl-probes && $FORTRESS_HOME/bin/fortress <probe>.fss
```

for `<probe>` in `a02_twice b05_hygiene b06a_repeat b06b_repeat b06c_repeat
b07a_option b07b_optvar b08_caseof b09a_glyph b09b_charclass
b11_gram_in_component b12_spec_syntax_form c10_opr_iota c11_opr_ceiling_prefix
c12_opr_ceiling_bracket c12b_opr_ceiling_bracket c13_shared_glyphs
c16_glyph_identifier d20_apl d21_narrow e30_apl`. Driver: `rerun_probes.sh` in
this merge's scratch directory, one probe at a time, output captured with an
appended `EXIT=` line. Exit status matched the committed `.out` in all 21 cases,
and so did every line of output.

**The shipped tests** behind rows 266 and 268, run in place:

```bash
cd $FORTRESS_HOME/ProjectFortress/syntax_abstraction_tests && $FORTRESS_HOME/bin/fortress <T>Use.fss
cd $FORTRESS_HOME/ProjectFortress/syntax_abstraction_tests/transformer && $FORTRESS_HOME/bin/fortress <T>Use.fss
```

— the 21 non-`SXX` `*Use.fss` of the top directory plus the three `SXX` ones
(rc 0 for all 21, and 255/1/255 for the three, exactly as committed), then all
**nine** `*Use.fss` of `transformer/` (rc 255, `Syntax Error` in each one's api,
exactly as the eight committed `b_Syntax*.out` and, for the ninth, newly).
Driver: `rerun_existing.sh`.

**The new probe for row 271**, in this directory, default source path:

```bash
cd $FORTRESS_HOME/explorations/gap-ledger-probes/apl-merge && $FORTRESS_HOME/bin/fortress f01_noast.fss
```

**Comparison.** A re-run counts as agreeing with its committed `.out` when they
differ only in: the Rats! temporary directory and the generated
`TemplateParserNN` number; the presence or absence of a Rats! regeneration
banner (it depends on the parser cache, not on the program); and the runner's
own trailing `EXIT=` line. Everything else was inspected by hand.

## Re-runs that differed, and what was kept

None of the 21 feasibility probes differed. Three files are kept beside the
probes anyway, all from the shipped-test set:

| file | ledger row | why |
|---|---|---|
| `apl-probes/existing-tests/ImportEmptyApiWhichImportsNonEmptyApiUse.rerun.out` | 266 | the committed file carries no program output at all; the re-run prints `42` and exits 0 |
| `apl-probes/existing-tests/ImportApiEmptyApiWhichImportsNonEmptyApiUse.rerun.out` | 266 | the same, `42` |
| `apl-probes/existing-tests/b_SyntaxTestUse.rerun.out` | 268 | the ninth `transformer/` example, which the source table counted as eight and left without an `.out`: `SyntaxTest.fsi:20:13:` `Syntax Error`, rc 255 |

The reason for the first two is not the interpreter. **The committed
`existing-tests/*.out` are damaged**: the original runner appended *two* runs
into each file and wrote the `EXIT=` line twice, the second write partly
overwriting the first (`IT=0`, `=0`, `T=0`, `NNote:` fragments survive in
`GrammarCompositionUseB/D`, `LabelUse`, `RegexUse1`, `SyntaxNodesUse` and
others; `CatchUse.out` and `XmlUse.out` are cleanly doubled). In the two
`Import…NonEmptyApiUse` files the damage swallowed the program's only line. Every
other file's program output matches the re-run line for line. Nothing committed
was overwritten.

## Reproducers that could not be run

None — but one row's reproducer as committed no longer exhibits its claim. Row
271 ("an api that declares its own nonterminals must `import FortressAst.{...}`")
was met by the source report on a first spelling that was then fixed: every
committed `_g.fsi` in `apl-probes/` carries the import. The failing spelling was
rebuilt here as `f01_noast_g.fsi` + `f01_noast_g.fss` + `f01_noast.fss` —
`apl-probes/b06c_repeat_g.fsi` with that one import line removed and nothing else
changed — and it reproduces:

```
/home/user/fortress/explorations/gap-ledger-probes/apl-merge/f01_noast_g.fsi:8:11-13:
    Expr is undefined.
/home/user/fortress/explorations/gap-ledger-probes/apl-merge/f01_noast_g.fsi:9:12-14:
    Expr is undefined.
EXIT=255
```

against the control `b06c_repeat` (the same grammar *with* the import), which
re-ran green in this merge: `10`, `7`. Nothing was skipped for time: the longest
single run in this merge was 23 s.

## What was found wrong in the source table

1. **The `Syntax.rats` line numbers run about ten lines short throughout.** The
   report's `:139-143` for `SyntaxDef ::= SyntaxSymbols => PreTransformerDecl` is
   `:148-153`; its `:175-188` for `PreTransformer` is `:186-199`; its `:406-410`
   for the macro language's special characters is `:395-397` (with the character
   literals at `:408-416`); its `:390-404` for `ItemText` is `:386-397`; its
   `:364-370` for `CharacterInterval` is `:369-375`. Its `:85-90` for
   `NonterminalExtensionDef` is `:85-92`. The ledger rows carry the repaired
   numbers; `apl-probes/REPORT.md` is left as it stands but for the one line this
   merge added, which says so.
2. **The `transformer/` family is nine files, not eight.** The report says "all
   eight of them fail to parse" and keeps eight `b_Syntax*.out`; the directory
   also has `SyntaxTestUse.fss`, which the report's own §B cites as
   "`existing-tests/b_SyntaxTestUse.out` family" — a file that does not exist.
   Run here: it fails the same way, and is kept as `b_SyntaxTestUse.rerun.out`.
   Row 268 says nine.
3. **`SyntaxAbstractionJUTestAll.java:38`** (the report's citation for the
   `*Use.fss` glob) is the closing brace of the anonymous `FilenameFilter`. The
   glob is `:36` (`name.endsWith("Use.fss")`) and the non-recursive listing is
   `:39` (`new File(STATIC_TESTS_DIR).list(fssFilter)`, with the directory at
   `:30`). Row 268 cites all three.
4. **"about twenty rows"** — the table has exactly eighteen. The ledger's closing
   section, the four repaired citations and `gap-cross-run.md` all say eighteen.
5. One span was widened rather than corrected:
   `advanced/domain-specific-languages.tex:15-16` → `:12-16`, so that the
   `\chapter` line the row calls a stub is inside the citation. Every other spec
   citation in the table checked out verbatim, `appendices/operators.tex:52-71`
   (the section header is `:52`, the four bracket glyphs `:67-70`) included, and
   so did the source-file citations and counts: `Operators.java` 3303 lines, `operators.txt` 1093 lines,
   `Syntax.rats` 434 lines, the four `\u23xx` escapes, the absence of any
   `ExternalSyntax` production or node under `ProjectFortress/src/`, and the
   absence of U+2987/U+2988 from `src`, `Library/`, the shipped syntax tests and
   `Specification/`.

## Counts after this merge

`fortress-gap-ledger.md`: **282 rows**, numbering 1-283 with 148 still missing.
By status: POSITIVE-VERIFIED 101, NEGATIVE-VERIFIED 144, both marks 28 (row 280
is the new one), NEGATIVE-BOUNDED 5, CONTESTED 1, RETIRED 3. By class:
implementation gap 78, design limit 64, library gap vs spec 18, library bug 9,
deliberate 3, typesetter 3, packaging 5, spec divergence 1, capability (no class)
97, retired/contested 4.

`gap-cross-run.md`: the `apl` column is now **122 hits** — the 105 rows the quest
contributed (179-256, the microGPT rung's 257-265, and the feasibility study's
266-283) and the 17 existing rows its tables cite or that a folded APL row was
merged into. The header's "264 gaps" is now 282.

## Files this merge wrote

In this directory: `MERGE-feasibility.md` (this file); `f01_noast_g.fsi`,
`f01_noast_g.fss`, `f01_noast.fss`, `f01_noast.out` (the rebuilt probe for row
271).

Beside the probes: `apl-probes/existing-tests/ImportEmptyApiWhichImportsNonEmptyApiUse.rerun.out`,
`ImportApiEmptyApiWhichImportsNonEmptyApiUse.rerun.out`, `b_SyntaxTestUse.rerun.out`.

Edited: `fortress-gap-ledger.md` (18 rows, the four citation repairs, the header
comment, the counts and a new closing section), `gap-cross-run.md` (18 rows, the
`apl` column's counts in the header and in its closing section, the source
comment), and one line at the top of `apl-probes/REPORT.md`'s "New ledger rows"
table giving the map. Nothing outside `explorations/` was modified, and neither
`apl/base/` nor `apl/microgpt/`.

## Note on `f01_noast.out`

`*.out` is gitignored at the repository root (`.gitignore:46`) and
`gap-ledger-probes/` has no un-ignoring `.gitignore` of its own, so
`f01_noast.out` needs `git add -f` to be committed; its contents are quoted
above so that nothing is lost if it is not. (`explorations/apl-probes/.gitignore`
does un-ignore `**/*.out`, so the three `.rerun.out` files there are tracked
normally.)
