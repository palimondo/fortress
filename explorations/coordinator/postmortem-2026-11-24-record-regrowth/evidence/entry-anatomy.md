<!-- What the characters of FACTS entries are made of at `b67abe3d2` (2026-10-13) and at `9de4c69bc8` (2026-11-24): sentence classes, counts per entry, 24 entries side by side, their history blocks, and INDEX line lengths; evidence for the writer of the record-regrowth report, 2026-11-24. -->

# Entry anatomy: what FACTS entries are made of, then and now

Evidence only. Nothing here judges a sentence. FACTS.md was read only with `git show COMMIT:explorations/coordinator/FACTS.md`.

Scripts (all in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/record-regrowth/`): `fa.py` (parser, sentence splitter, tests), `p12.py` (points 1 and 2), `p34.py` (points 3 and 4), `p5.py` (point 5), `p6.py` (point 6). Run `python3 p12.py` there to repeat the counts.

## 0. Method, stated so that the count can be repeated

**Entries.** An entry is a line `- F-N text`. `b67abe3d2`: 157 entries, 90,179 characters (file; `git show` gives 90,218 bytes). `9de4c69bc8`: 339 entries, 427,378 characters (427,531 bytes). Characters are Python `len` of the text. Sections are the `##` headings.

**Sentences.** The text after `- F-N ` is split into the bold title (`**...**`, the first match of `^\*\*(.+?)\*\*`) and the rest. The rest is split into sentences at `.`, `!` or `?` (with optional closing `)`, `]`, `"`, `'`) followed by whitespace and then an upper-case letter, a backtick, a digit, `(`, `[`, a quote or `*`. Backtick spans are masked first, so a dot inside code never splits. No split after `e.g`, `i.e`, `vs`, `cf`, `approx`. A sentence's length is its stripped text; the spaces between sentences are counted apart.

**Raw tests** (a sentence may meet several):
- tests: starts `Gated by`, `Tests:` or `Test:`; or holds two or more distinct test names.
- detail: starts `Detail:`.
- codecite: holds a backticked span that holds `[A-Za-z0-9_./-]+\.[A-Za-z]+:\d+`.
- row: matches `\brows? \d+` (case-insensitive).
- pointer: matches `\b[FP]-\d+`.
- hash: matches a run of 7 to 12 hex characters with at least one digit and at least one letter a to f, not inside a longer alphanumeric word.
- date: matches `\b20\d\d-\d\d-\d\d\b`, `climb batch`, `\brung`, or `\bbatch \d` (case-insensitive).
- repair: matches `\b(fixed|since|now|no longer|until)\b` (case-insensitive).
- A test name = a backticked span that (a) ends `.test`, or (b) is a path under a folder named `tests`, `test` or `*_tests` (not ending `.java .scala .tex .md .py .sh .js .csv .xml .rats .ast .fsi`), or (c) only inside a sentence that starts `Gated by`, `Test:` or `Tests:`: a bare name matching `^(XXX)?[A-Z*][A-Za-z0-9<>*]*(\.fss|\.test)?$`, longer than 3 characters and not `XXX`. (Spans in such sentences that fail the rule are not counted, for example `overflows(...)`, `ant testFast`, `run`, and names with a `*` after a lower-case start: 39 such spans in `Tests:`/`Gated by` sentences at `9de4c69bc8` in an earlier run of the rule; the count of test names is therefore a floor.)

**Class order** (a sentence is counted once, in the first class it meets): 1 bold title; 2 list of tests; 3 pointer to the detail; 4 cites code by file:line; 5 ledger row; 6 points to F-/P-; 7 holds a commit hash; 8 holds a date, climb batch or rung; 9 tells a repair or change; 10 the rest. No class was added: "the rest" is 25.9% and 26.8% of the file's characters, 252 and 874 sentences (many fit none).

**Remainder rows of each table.** "entry prefix" = the characters of `- F-N `; "spaces between the sentences" = entry-line length minus prefix minus the sentence lengths; "lines that are not entries" = the file's comment line, headings, blank lines and newlines. The rows sum to the file's character count.

**Quartiles.** `statistics.quantiles(n=4, method="inclusive")`; the median is `statistics.median`.

**Counts per entry (point 2)** use the whole entry line (`- F-N ...`), so the F-/P- count includes the entry's own number once.

**"First held" commit (points 3, 4).** The 265 first-parent commits in `b67abe3d2..9de4c69bc8` that touch FACTS.md were each read with `git show`. A sentence's first commit is the first of them whose whole FACTS.md contains the sentence as an exact string. This is a scan, not `git log -S`; the last of the 265 (`61b50cd34a`) has FACTS.md text identical to `9de4c69bc8`'s. A sentence marked "[absent again in a later commit]" left the file and came back. A sentence that is a reworded form of an old one is listed as added. The commit message is the subject line cut to 100 characters.

## What "What an entry is" says an entry holds

From `.claude/skills/coordinator/references/record.md`, "What an entry is", at `9de4c69bc8` (the section at `b67abe3d2` differs; quoted lines below say which):

- At `9de4c69bc8`: "A FACTS entry holds, after its number and a bold title that states the fact: what is established now, and under which conditions; what it means for the work, such as what it blocks or which row or decision it bears on; its evidence: the test that gates it, or its source, and whether it was observed, read in the code or inferred; the decision it builds, by number and subject; and the report section that holds the detail."
- At `b67abe3d2`: "A FACTS entry holds, after its number and a bold title that states the fact: the fact as it stands now; what it means for the work, such as what it blocks or which row or decision it bears on; the test that gates it, or its source; the decision it builds, by number; and the report section that holds the detail."
- Both commits: "Keep an entry near 600 characters. This is a check, not a cap" (`9de4c69bc8` adds: ", and no reason to split: an entry may pass it if a question below keeps a sentence.").
- At `9de4c69bc8` only (not in the `b67abe3d2` text of this section): "A pointer that stays in an entry carries a few words on what it holds, such as a ledger row's subject. A bare list of numbers goes to the history." and "If the tree does not yet do what a decision or the team's design asks, the missing part is a row of the gap ledger. The entry may name it as "row N", with a few words on what the row holds. In an entry, "row N" always names a row of the gap ledger."
- The six questions, same at both: "3. Does it tell how the fact came about: a date, a batch, a correction? Move it to the history." and "4. Is it detail needed only while doing the work: a line number, a list of sites, a timing? Leave it in the report, and name the section." (checked by `diff` of the section: only the lines listed above differ).

## 1. The parts, by script


### Commit b67abe3d2: file 90179 characters, 157 entries, 913 sentences (title counted as one)

| class | chars | share of file | sentences | entries holding one |
|---|---|---|---|---|
| bold title | 22120 | 24.5% | 157 | 157 |
| list of tests | 3825 | 4.2% | 70 | 70 |
| pointer to the detail ("Detail:") | 10167 | 11.3% | 144 | 144 |
| cites code by file:line | 741 | 0.8% | 8 | 7 |
| ledger row ("row N") | 18098 | 20.1% | 156 | 104 |
| points to F-/P- | 7060 | 7.8% | 108 | 82 |
| holds a commit hash | 194 | 0.2% | 2 | 2 |
| holds a date / climb batch / rung | 577 | 0.6% | 5 | 4 |
| tells a repair or change | 1310 | 1.5% | 12 | 12 |
| the rest | 23243 | 25.8% | 251 | 134 |
| entry prefix `- F-N ` | 1172 | 1.3% | | |
| spaces between the sentences of an entry | 756 | 0.8% | | |
| lines that are not entries (comment, headings, blank lines, newlines) | 916 | 1.0% | | |
| sum | 90179 | | 913 | |

Raw counts (sentences that meet each test, whatever their class):

| test | sentences | entries |
|---|---|---|
| list of tests | 70 | 70 |
| pointer to the detail ("Detail:") | 144 | 144 |
| cites code by file:line | 9 | 8 |
| ledger row ("row N") | 161 | 107 |
| points to F-/P- | 122 | 88 |
| holds a commit hash | 3 | 2 |
| holds a date / climb batch / rung | 94 | 90 |
| tells a repair or change | 28 | 27 |

### Commit 9de4c69bc8: file 427378 characters, 339 entries, 2718 sentences (title counted as one)

| class | chars | share of file | sentences | entries holding one |
|---|---|---|---|---|
| bold title | 61585 | 14.4% | 339 | 339 |
| list of tests | 31910 | 7.5% | 213 | 208 |
| pointer to the detail ("Detail:") | 33184 | 7.8% | 317 | 317 |
| cites code by file:line | 41482 | 9.7% | 160 | 116 |
| ledger row ("row N") | 66033 | 15.5% | 341 | 200 |
| points to F-/P- | 57403 | 13.4% | 381 | 217 |
| holds a commit hash | 2814 | 0.7% | 21 | 18 |
| holds a date / climb batch / rung | 7193 | 1.7% | 39 | 34 |
| tells a repair or change | 5580 | 1.3% | 36 | 34 |
| the rest | 114089 | 26.7% | 871 | 291 |
| entry prefix `- F-N ` | 2628 | 0.6% | | |
| spaces between the sentences of an entry | 2379 | 0.6% | | |
| lines that are not entries (comment, headings, blank lines, newlines) | 1098 | 0.3% | | |
| sum | 427378 | | 2718 | |

Raw counts (sentences that meet each test, whatever their class):

| test | sentences | entries |
|---|---|---|
| list of tests | 213 | 208 |
| pointer to the detail ("Detail:") | 317 | 317 |
| cites code by file:line | 173 | 126 |
| ledger row ("row N") | 389 | 211 |
| points to F-/P- | 518 | 242 |
| holds a commit hash | 35 | 28 |
| holds a date / climb batch / rung | 325 | 267 |
| tells a repair or change | 175 | 120 |

### Per section of FACTS at 9de4c69bc8


**Execution model**: 29 entries, 35876 characters in entry lines, 250 sentences. Share is of the section's entry-line characters.

| class | chars | share | sentences | entries |
|---|---|---|---|---|
| bold title | 5425 | 15.1% | 29 | 29 |
| list of tests | 1347 | 3.8% | 10 | 10 |
| pointer to the detail ("Detail:") | 2048 | 5.7% | 25 | 25 |
| cites code by file:line | 4412 | 12.3% | 19 | 13 |
| ledger row ("row N") | 3793 | 10.6% | 24 | 17 |
| points to F-/P- | 3990 | 11.1% | 22 | 16 |
| holds a commit hash | 182 | 0.5% | 1 | 1 |
| holds a date / climb batch / rung | 263 | 0.7% | 2 | 2 |
| tells a repair or change | 593 | 1.7% | 3 | 3 |
| the rest | 13389 | 37.3% | 115 | 27 |

**The checker and the one library**: 148 entries, 186737 characters in entry lines, 1138 sentences. Share is of the section's entry-line characters.

| class | chars | share | sentences | entries |
|---|---|---|---|---|
| bold title | 29990 | 16.1% | 148 | 148 |
| list of tests | 15363 | 8.2% | 102 | 100 |
| pointer to the detail ("Detail:") | 14894 | 8.0% | 143 | 143 |
| cites code by file:line | 20643 | 11.1% | 77 | 57 |
| ledger row ("row N") | 28439 | 15.2% | 144 | 87 |
| points to F-/P- | 29910 | 16.0% | 195 | 106 |
| holds a commit hash | 940 | 0.5% | 6 | 5 |
| holds a date / climb batch / rung | 3757 | 2.0% | 19 | 15 |
| tells a repair or change | 2070 | 1.1% | 13 | 13 |
| the rest | 38619 | 20.7% | 291 | 115 |

**The harness and the gate**: 24 entries, 19985 characters in entry lines, 155 sentences. Share is of the section's entry-line characters.

| class | chars | share | sentences | entries |
|---|---|---|---|---|
| bold title | 3751 | 18.8% | 24 | 24 |
| list of tests | 121 | 0.6% | 2 | 2 |
| pointer to the detail ("Detail:") | 1255 | 6.3% | 15 | 15 |
| cites code by file:line | 2511 | 12.6% | 10 | 8 |
| ledger row ("row N") | 969 | 4.8% | 8 | 7 |
| points to F-/P- | 1134 | 5.7% | 9 | 7 |
| holds a commit hash | 561 | 2.8% | 5 | 5 |
| holds a date / climb batch / rung | 1468 | 7.3% | 8 | 7 |
| tells a repair or change | 402 | 2.0% | 2 | 2 |
| the rest | 7493 | 37.5% | 72 | 20 |

**Landed semantics**: 92 entries, 130875 characters in entry lines, 792 sentences. Share is of the section's entry-line characters.

| class | chars | share | sentences | entries |
|---|---|---|---|---|
| bold title | 14838 | 11.3% | 92 | 92 |
| list of tests | 13534 | 10.3% | 89 | 86 |
| pointer to the detail ("Detail:") | 9687 | 7.4% | 92 | 92 |
| cites code by file:line | 10810 | 8.3% | 40 | 27 |
| ledger row ("row N") | 24645 | 18.8% | 115 | 64 |
| points to F-/P- | 16124 | 12.3% | 104 | 59 |
| holds a commit hash | 0 | 0.0% | 0 | 0 |
| holds a date / climb batch / rung | 961 | 0.7% | 6 | 6 |
| tells a repair or change | 1681 | 1.3% | 10 | 9 |
| the rest | 37159 | 28.4% | 244 | 86 |

**The library's arrays and algebra**: 16 entries, 18454 characters in entry lines, 136 sentences. Share is of the section's entry-line characters.

| class | chars | share | sentences | entries |
|---|---|---|---|---|
| bold title | 2694 | 14.6% | 16 | 16 |
| list of tests | 391 | 2.1% | 5 | 5 |
| pointer to the detail ("Detail:") | 1632 | 8.8% | 16 | 16 |
| cites code by file:line | 842 | 4.6% | 4 | 4 |
| ledger row ("row N") | 3487 | 18.9% | 21 | 10 |
| points to F-/P- | 2602 | 14.1% | 17 | 9 |
| holds a commit hash | 365 | 2.0% | 4 | 4 |
| holds a date / climb batch / rung | 143 | 0.8% | 1 | 1 |
| tells a repair or change | 213 | 1.2% | 2 | 2 |
| the rest | 5837 | 31.6% | 50 | 14 |

**The specification and the repository's lineage**: 23 entries, 27182 characters in entry lines, 195 sentences. Share is of the section's entry-line characters.

| class | chars | share | sentences | entries |
|---|---|---|---|---|
| bold title | 3765 | 13.9% | 23 | 23 |
| list of tests | 868 | 3.2% | 4 | 4 |
| pointer to the detail ("Detail:") | 3007 | 11.1% | 20 | 20 |
| cites code by file:line | 1658 | 6.1% | 8 | 5 |
| ledger row ("row N") | 3441 | 12.7% | 20 | 10 |
| points to F-/P- | 2649 | 9.7% | 29 | 18 |
| holds a commit hash | 766 | 2.8% | 5 | 3 |
| holds a date / climb batch / rung | 601 | 2.2% | 3 | 3 |
| tells a repair or change | 532 | 2.0% | 5 | 4 |
| the rest | 9539 | 35.1% | 78 | 23 |

**The territory map**: 7 entries, 7171 characters in entry lines, 52 sentences. Share is of the section's entry-line characters.

| class | chars | share | sentences | entries |
|---|---|---|---|---|
| bold title | 1122 | 15.6% | 7 | 7 |
| list of tests | 286 | 4.0% | 1 | 1 |
| pointer to the detail ("Detail:") | 661 | 9.2% | 6 | 6 |
| cites code by file:line | 606 | 8.5% | 2 | 2 |
| ledger row ("row N") | 1259 | 17.6% | 9 | 5 |
| points to F-/P- | 994 | 13.9% | 5 | 2 |
| holds a commit hash | 0 | 0.0% | 0 | 0 |
| holds a date / climb batch / rung | 0 | 0.0% | 0 | 0 |
| tells a repair or change | 89 | 1.2% | 1 | 1 |
| the rest | 2053 | 28.6% | 21 | 6 |
## 2. Counts per entry at each commit


Quartiles use `statistics.quantiles(n=4, method="inclusive")`; median is the second. All entries counted, zeros included. "sentences" excludes the title. Test names = distinct backticked spans that pass `is_testname` in fa.py. file:line citations = occurrences of a backticked span holding `path.ext:digits`. "row N" = occurrences of `rows? \d+` (case-insensitive; "rows 3, 4" counts once). F-/P- = occurrences of `\b[FP]-\d+` in the entry line (own number included in the title? the line starts "- F-N", which is counted: so the count includes the entry's own number once; subtract 1 for pointers). Detail paths = backticked spans inside sentences that start "Detail:".

| commit | measure | min | Q1 | median | Q3 | max | mean | entries with >=1 |
|---|---|---|---|---|---|---|---|---|
| b67abe3d2 | entry length (chars) | 274 | 518.0 | 576 | 600.0 | 976 | 568.6 | 157 of 157 |
| b67abe3d2 | sentences | 2 | 4.0 | 5 | 6.0 | 8 | 4.8 | 157 of 157 |
| b67abe3d2 | test names | 0 | 0.0 | 1 | 1.0 | 3 | 0.7 | 84 of 157 |
| b67abe3d2 | file:line citations | 0 | 0.0 | 0 | 0.0 | 2 | 0.1 | 8 of 157 |
| b67abe3d2 | "row N" pointers | 0 | 0.0 | 1 | 2.0 | 5 | 1.3 | 107 of 157 |
| b67abe3d2 | F-/P- pointers (incl. own number) | 1 | 1.0 | 2 | 3.0 | 5 | 1.9 | 157 of 157 |
| b67abe3d2 | report paths after "Detail:" | 0 | 1.0 | 1 | 1.0 | 3 | 1.0 | 144 of 157 |
| 9de4c69bc8 | entry length (chars) | 282 | 833.5 | 1198 | 1537.5 | 4330 | 1257.5 | 339 of 339 |
| 9de4c69bc8 | sentences | 2 | 5.0 | 6 | 8.0 | 23 | 7.0 | 339 of 339 |
| 9de4c69bc8 | test names | 0 | 0.0 | 2 | 3.0 | 19 | 2.2 | 231 of 339 |
| 9de4c69bc8 | file:line citations | 0 | 0.0 | 0 | 1.0 | 6 | 0.7 | 126 of 339 |
| 9de4c69bc8 | "row N" pointers | 0 | 0.0 | 1 | 2.0 | 17 | 1.5 | 211 of 339 |
| 9de4c69bc8 | F-/P- pointers (incl. own number) | 1 | 1.0 | 2 | 4.0 | 32 | 3.0 | 339 of 339 |
| 9de4c69bc8 | report paths after "Detail:" | 0 | 1.0 | 1 | 1.0 | 12 | 1.3 | 315 of 339 |

## 3. Twelve entries that exist at both commits

Entries at both commits: 157. Growth = characters of the entry line at `9de4c69bc8` minus at `b67abe3d2`.

Group A, the six that grew most: F-180 (+1757), F-19 (+1605), F-58 (+1590), F-174 (+1580), F-75 (+1423), F-26 (+1400).

Group B, rule: list the common entries by number; take the 10th, 20th, 30th, ... (1-based position in that list); skip any already in group A; take the first six: F-22, F-35, F-45, F-55, F-65, F-85.

"First held" = the first of the 265 first-parent commits in `b67abe3d2..9de4c69bc8` that touch FACTS.md whose FACTS.md text contains the sentence as a whole string (found by a Python scan of `git show`, not by `git log -S`); a sentence is the unit of `fa.py split_sentences`; the bold title counts as a sentence. "Added" = not an exact string among the old entry's sentences, so a reworded sentence is listed as added. The commit message is the subject line cut to 100 characters.

### F-180 (group A): 580 chars at `b67abe3d2`, 2337 at `9de4c69bc8`, section "The territory map"

Text at `b67abe3d2`:

~~~~
- F-180 **`import java` is wired on walk through `ForeignComponentWrapper` and `ClosureMaker`, but five gaps stop it and no test uses it.** Six small patches close them in a probe. P-58 binds the natives by `builtinPrimitive` instead; both halves of that way ran as probes. Two findings bear on any binding text that both paths share. A helper that raises a Fortress exception names a compiled-prelude class, which walk ends as a `FortressImplementationError`. A helper over compiled-world types cannot take walk's values. Detail: `perf-probes/prelude/natives-shape.md` section 1.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-180 **`import java` is wired on walk through `ForeignComponentWrapper` and `ClosureMaker`, but four gaps stop it and no test uses it.** In a probe, six small Java patches closed the five gaps the tree then had, two of them for gap 4. A component with two declarations bound through `import java` then printed on walk what the compiled path prints. Gap 1, the type table, is closed on the tree: in walk's world the three-argument `NamingCzar.fortressTypeForForeignJavaType`, which walk's repository reaches for a written `import java` (`repository/GraphRepository.java:957`), reads a Java type as the one library's (`compiler/NamingCzar.java:367-370`; F-298), so a component with one such import now stops at gap 3, 'Non-top-level reference to imported …' (row 845). P-58 chose another way: a `builtinPrimitive("…")` body whose string names a static Java method in `nativeHelpers/`. Its compiled half is built, the rewrite of such a body into a call before the type checker (F-298); so is walk's half, a loader of such a method beside the glue classes (F-299). Two findings bear on any binding that both paths share. First, a helper raises a Fortress exception by naming a class of the compiled prelude, such as `fortress.CompilerBuiltin$IntegerOverflow`. Walk has no such class: its loader of a `builtinPrimitive` helper translates the raise into the library's exception (F-299), but through a written `import java` walk ends the run with a `FortressImplementationError`, unless the probe's patch for gap 5 (`gap5-helper-raise.patch`) translates the raise. Second, by reading, a helper whose parameters or results are compiled-path classes, such as `FZZ32Vector`, cannot take walk's values. The probe's closure converts only Java's numbers, booleans, strings and `BigInteger`, and the helper classes had 50 such parameters or results when read once with `javap`, before `nativeHelpers/simpleIntLiteralArith.java` was deleted; walk's loader refuses at load a binding whose declared type no Java type carries (F-299). Detail: `perf-probes/prelude/natives-shape.md` section 1 (the gaps and walk's half); `perf-probes/prelude/natives-binding-probe.md` section 1 (the compiled half; its section 2 measures the `import java` form, which P-58 did not take); `compile-ladder/rung-natives-compiled/SKEPTIC.md`, "My programs, old against new".
~~~~

Sentences in the new text and not in the old: 12 of 12, 2318 chars.

- (131 chars) `98b04d371e` 2026-10-30 "The compiled path reads a builtinPrimitive body naming a helper of nativeHelpers as a call of that h"
  - text: **`import java` is wired on walk through `ForeignComponentWrapper` and `ClosureMaker`, but four gaps stop it and no test uses it.**
- (97 chars) `98b04d371e` 2026-10-30 "The compiled path reads a builtinPrimitive body naming a helper of nativeHelpers as a call of that h"
  - text: In a probe, six small Java patches closed the five gaps the tree then had, two of them for gap 4.
- (113 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: A component with two declarations bound through `import java` then printed on walk what the compiled path prints.
- (417 chars) `17b55bcc72` 2026-11-18 "Fold the review's corrections"
  - text: Gap 1, the type table, is closed on the tree: in walk's world the three-argument `NamingCzar.fortressTypeForForeignJavaType`, which walk's repository reaches for a written `import java` (`repository/GraphRepository.java:957`), reads a Java type as the one library's (`compiler/NamingCzar.java:367-370`; F-298), so a component with one such import now stops at gap 3, 'Non-top-level reference to imported …' (row 845).
- (115 chars) `98b04d371e` 2026-10-30 "The compiled path reads a builtinPrimitive body naming a helper of nativeHelpers as a call of that h"
  - text: P-58 chose another way: a `builtinPrimitive("…")` body whose string names a static Java method in `nativeHelpers/`.
- (177 chars) `640acb4a17` 2026-10-30 "Walk loads a builtinPrimitive string that names a static helper of nativeHelpers, and ZZ32's first f"
  - text: Its compiled half is built, the rewrite of such a body into a call before the type checker (F-298); so is walk's half, a loader of such a method beside the glue classes (F-299).
- (55 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Two findings bear on any binding that both paths share.
- (138 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: First, a helper raises a Fortress exception by naming a class of the compiled prelude, such as `fortress.CompilerBuiltin$IntegerOverflow`.
- (301 chars) `640acb4a17` 2026-10-30 "Walk loads a builtinPrimitive string that names a static helper of nativeHelpers, and ZZ32's first f"
  - text: Walk has no such class: its loader of a `builtinPrimitive` helper translates the raise into the library's exception (F-299), but through a written `import java` walk ends the run with a `FortressImplementationError`, unless the probe's patch for gap 5 (`gap5-helper-raise.patch`) translates the raise.
- (133 chars) `36e60805e6` 2026-11-10 "Record landing of climb batch 29b: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: Second, by reading, a helper whose parameters or results are compiled-path classes, such as `FZZ32Vector`, cannot take walk's values.
- (324 chars) `36e60805e6` 2026-11-10 "Record landing of climb batch 29b: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: The probe's closure converts only Java's numbers, booleans, strings and `BigInteger`, and the helper classes had 50 such parameters or results when read once with `javap`, before `nativeHelpers/simpleIntLiteralArith.java` was deleted; walk's loader refuses at load a binding whose declared type no Java type carries (F-299).
- (317 chars) `36e60805e6` 2026-11-10 "Record landing of climb batch 29b: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: Detail: `perf-probes/prelude/natives-shape.md` section 1 (the gaps and walk's half); `perf-probes/prelude/natives-binding-probe.md` section 1 (the compiled half; its section 2 measures the `import java` form, which P-58 did not take); `compile-ladder/rung-natives-compiled/SKEPTIC.md`, "My programs, old against new".

### F-19 (group A): 423 chars at `b67abe3d2`, 2028 at `9de4c69bc8`, section "Execution model"

Text at `b67abe3d2`:

~~~~
- F-19 **Implicit parallelism: a `for` loop is parallel unless every generator is `seq`, and a tuple's elements and an operator's operands are evaluated in parallel.** `FORTRESS_THREADS` sizes the work-stealing pool (the `fortress-repo` skill, "Parallelism and mutable state"). No program under `explorations/` writes `spawn` or `also`. Source: `Specification/basic/expressions/tuple-expr.tex:23-24`, `operator-app.tex:59`.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-19 **By the specification, the iterations of a `for` loop, the elements of a tuple, and the arguments of a call or an operator may run in parallel, and a program must assume that they do.** A `for` loop is sequential only if every generator is, as `seq(g)` or `sequential(g)` makes it. An implementation may also run them one after another (`evaluation/parallelism.tex:88-90`), so a program cannot count on parallel runs either. For the elements of a tuple and the operands of an operator, each path starts a task only where it judges it worth it: walk by `TupleTask.worthSpawning`, which also governs a call's arguments, and the code generator by `ParallelismAnalyzer`. Compiled, the arguments of a function call and of a dotted method call fork where the analyzer marked the argument tuple (`CodeGen.evalArg`; joins: F-350); it counts no call in the prelude's files (row 982) or of a function declared later in the file (row 987). A `for` loop over a range without `seq` runs by splitting the range into `do … also do … end` blocks. Under walk, every such block is a task, and walk's library splits a `ZZ32` range into chunks of at most 16 elements (F-350), and a range with a stride down to single elements (`Library/RangeInternals.fss:1498-1585`). Compiled, the first block runs in place, and each other block forks only where `BaseTask.forkIfProfitable` judges it worth it, as tuple elements do; the compiler prelude's `parloop` splits down to `FORTRESS_LOOP_CHUNK` elements, 1 by default. `FORTRESS_THREADS` sizes the pool of worker threads (the `fortress-repo` skill, "Parallelism and mutable state"). By grep, no program under `explorations/`, the model programs and the probes, writes `spawn`, which starts an explicit thread, or an `also do` block, so their parallelism comes only from loops, tuples and arguments. The revival's tests under `ProjectFortress/` write both. Source: `Specification/basic/expressions/for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:58-59`, `evaluation/parallelism.tex:50-80`.
~~~~

Sentences in the new text and not in the old: 12 of 12, 2010 chars.

- (186 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: **By the specification, the iterations of a `for` loop, the elements of a tuple, and the arguments of a call or an operator may run in parallel, and a program must assume that they do.**
- (95 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: A `for` loop is sequential only if every generator is, as `seq(g)` or `sequential(g)` makes it.
- (142 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: An implementation may also run them one after another (`evaluation/parallelism.tex:88-90`), so a program cannot count on parallel runs either.
- (241 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: For the elements of a tuple and the operands of an operator, each path starts a task only where it judges it worth it: walk by `TupleTask.worthSpawning`, which also governs a call's arguments, and the code generator by `ParallelismAnalyzer`.
- (261 chars) `f78da2650a` 2026-11-10 "Record landing of climb batch 30: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: Compiled, the arguments of a function call and of a dotted method call fork where the analyzer marked the argument tuple (`CodeGen.evalArg`; joins: F-350); it counts no call in the prelude's files (row 982) or of a function declared later in the file (row 987).
- (101 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: A `for` loop over a range without `seq` runs by splitting the range into `do … also do … end` blocks.
- (216 chars) `f78da2650a` 2026-11-10 "Record landing of climb batch 30: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: Under walk, every such block is a task, and walk's library splits a `ZZ32` range into chunks of at most 16 elements (F-350), and a range with a stride down to single elements (`Library/RangeInternals.fss:1498-1585`).
- (242 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: Compiled, the first block runs in place, and each other block forks only where `BaseTask.forkIfProfitable` judges it worth it, as tuple elements do; the compiler prelude's `parloop` splits down to `FORTRESS_LOOP_CHUNK` elements, 1 by default.
- (113 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: `FORTRESS_THREADS` sizes the pool of worker threads (the `fortress-repo` skill, "Parallelism and mutable state").
- (215 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: By grep, no program under `explorations/`, the model programs and the probes, writes `spawn`, which starts an explicit thread, or an `also do` block, so their parallelism comes only from loops, tuples and arguments.
- (56 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: The revival's tests under `ProjectFortress/` write both.
- (142 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: Source: `Specification/basic/expressions/for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:58-59`, `evaluation/parallelism.tex:50-80`.

### F-58 (group A): 811 chars at `b67abe3d2`, 2401 at `9de4c69bc8`, section "The checker and the one library"

Text at `b67abe3d2`:

~~~~
- F-58 **MicroGPT's flat program, C4, has 26 errors of its own under the compiled checker, and none comes from a numeral's type.** 15 are arrays without sizes: `Array[\RR64,ZZ32\]` where the library wants `Vector`, `Matrix` or `Array3`. 5 are numeral powers such as `10.0^(-5)`, refused as ambiguous because two declarations of `^` each need the integer converted (row 533). 6 are small slips. With decision D's diff, which sizes the model's arrays, 14 remain: the 5 powers, 3 `DOT` calls that fail on the api's unused sizes (F-35), 1 bridge that passes arrays sized only at run time, and 5 small slips. Each count is a floor, since the checker stops a block at its first failing statement (row 474). The counts come from one measurement, on an earlier library. Detail: `reviews/array-design-ways.md` section 2.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-58 **Under the compiled checker against today's one library, microGPT's flat program, C4, has 42 distinct error sites of its own, 23 of them the index bound that its helpers do not write; each count is a floor.** By the distance stage's driver on `c0c35b4f9e`, after climb batch 32: `FlatArrays` 31, `FlatData` 3, `MicroGptFlat` 8, `MicroGptFlatQuick` none. The model's four later diffs (`^T` declared in the helper file's api, `^T` after a parenthesised call, the sum without its static argument, `∑` for `SUM`) add no site and remove none; the line numbers here are the model's after them. In `FlatArrays`, 23 are 'The static argument I does not satisfy the corresponding bound Index' in seven generic declarations (P-156); `model-closure-check.md` lists the other 8. `MicroGptFlat`'s 8 are `DOT` on unsized arrays at lines 22, 26 and 29, `view` at line 40, `gather` twice at line 52, and at line 72 `beta1 m` and `(1 - beta1) g`, a scalar beside an unsized array, which the typed names of the tuple bindings of lines 17 to 19 uncovered (F-369). The numeral powers pass; line 77's `1.0 s` and `MicroGptFlatQuick.fss:40`, a float numeral beside a `ZZ32` value, check at `RR64`'s product (F-366); `matShape`'s `if` of pairs is no site; and line 38's sum is no site with or without its static argument (F-364). In `step` the checker reports nothing after line 52: lines 53 to 65 apply `^T` to unsized arrays, which it refuses in a small program for the same cause (P-87), and none of them is a site. So each count is a floor. The APL program's four files held 54 sites on `832f7d0d91`, where its grammar's api crashed the checker; no run has counted them since. In a scratch tree of before climb batch 32 whose compile command selects the one library (F-352), with `I extends Index` written in the helpers and `gather`'s bound widened in a copy, the compile command reported 17, 15 of them the model's static types, its arrays without sizes (P-87). Measured once each; no test checks it. Command: `compile-ladder/plan-31/probes/model-closure/run.sh check`. Detail: `compile-ladder/plan-32/probes/model-diffs.md`, "2. The states", "3. What the checker's count does and does not show" and "5. The counts for F-58, on the landed tree `c0c35b4f9e`"; `compile-ladder/plan-31/probes/model-closure-check.md`, "1. The counts"; `compile-ladder/plan-31/probes/switch-rehearsal.md`, "microGPT's flat program".
~~~~

Sentences in the new text and not in the old: 17 of 17, 2378 chars.

- (209 chars) `5064f7f80b` 2026-11-13 "FACTS: the probes of 2026-11-10 to 2026-11-13 filed: F-34's measure on today's code, F-18 and F-58 c"
  - text: **Under the compiled checker against today's one library, microGPT's flat program, C4, has 42 distinct error sites of its own, 23 of them the index bound that its helpers do not write; each count is a floor.**
- (144 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: By the distance stage's driver on `c0c35b4f9e`, after climb batch 32: `FlatArrays` 31, `FlatData` 3, `MicroGptFlat` 8, `MicroGptFlatQuick` none.
- (233 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: The model's four later diffs (`^T` declared in the helper file's api, `^T` after a parenthesised call, the sum without its static argument, `∑` for `SUM`) add no site and remove none; the line numbers here are the model's after them.
- (177 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: In `FlatArrays`, 23 are 'The static argument I does not satisfy the corresponding bound Index' in seven generic declarations (P-156); `model-closure-check.md` lists the other 8.
- (277 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: `MicroGptFlat`'s 8 are `DOT` on unsized arrays at lines 22, 26 and 29, `view` at line 40, `gather` twice at line 52, and at line 72 `beta1 m` and `(1 - beta1) g`, a scalar beside an unsized array, which the typed names of the tuple bindings of lines 17 to 19 uncovered (F-369).
- (261 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: The numeral powers pass; line 77's `1.0 s` and `MicroGptFlatQuick.fss:40`, a float numeral beside a `ZZ32` value, check at `RR64`'s product (F-366); `matShape`'s `if` of pairs is no site; and line 38's sum is no site with or without its static argument (F-364).
- (188 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: In `step` the checker reports nothing after line 52: lines 53 to 65 apply `^T` to unsized arrays, which it refuses in a small program for the same cause (P-87), and none of them is a site.
- (25 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: So each count is a floor.
- (135 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: The APL program's four files held 54 sites on `832f7d0d91`, where its grammar's api crashed the checker; no run has counted them since.
- (286 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: In a scratch tree of before climb batch 32 whose compile command selects the one library (F-352), with `I extends Index` written in the helpers and `gather`'s bound widened in a copy, the compile command reported 17, 15 of them the model's static types, its arrays without sizes (P-87).
- (38 chars) `5064f7f80b` 2026-11-13 "FACTS: the probes of 2026-11-10 to 2026-11-13 filed: F-34's measure on today's code, F-18 and F-58 c"
  - text: Measured once each; no test checks it.
- (68 chars) `5064f7f80b` 2026-11-13 "FACTS: the probes of 2026-11-10 to 2026-11-13 filed: F-34's measure on today's code, F-18 and F-58 c"
  - text: Command: `compile-ladder/plan-31/probes/model-closure/run.sh check`.
- (59 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: Detail: `compile-ladder/plan-32/probes/model-diffs.md`, "2.
- (16 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: The states", "3.
- (56 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: What the checker's count does and does not show" and "5.
- (114 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: The counts for F-58, on the landed tree `c0c35b4f9e`"; `compile-ladder/plan-31/probes/model-closure-check.md`, "1.
- (92 chars) `5064f7f80b` 2026-11-13 "FACTS: the probes of 2026-11-10 to 2026-11-13 filed: F-34's measure on today's code, F-18 and F-58 c" [absent again in a later commit]
  - text: The counts"; `compile-ladder/plan-31/probes/switch-rehearsal.md`, "microGPT's flat program".

### F-174 (group A): 599 chars at `b67abe3d2`, 2179 at `9de4c69bc8`, section "The specification and the repository's lineage"

Text at `b67abe3d2`:

~~~~
- F-174 **The specification states the type group's 2011 overloading model: declarations of one name may differ in their static parameters, and a declaration with static parameters is read over its instances.** It states P-45 and P-42. A new section states the OOPSLA 2011 paper's three rules, with the positional rule as the compiled path's restriction. The naked-`Any` rule is against a written `Any` (row 534). Each path fails some sets that the rules accept, and Appendix I names them (rows 159, 537, 539, 542). Detail: `compile-ladder/rung-spec-overloading/decision-record.md` sections 3 and 4.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-174 **The specification states the type group's 2011 overloading model: declarations of one name may differ in their static parameters, and a declaration with static parameters is read as one declaration over all its instances within its bounds.** It states P-45 and P-42. The section "Declarations with Static Parameters" states the OOPSLA 2011 paper's three rules: No Duplicates, Return Type and Meet. It gives one more restriction as the compiled path's, not the language's. Where one generic declaration is more specific than another with as many static parameters, the two must declare them of the same kinds, position by position. Also, the more specific one's return type must be a subtype of the other's when their static parameters are matched by position, so the checker refuses an override whose return type reorders its static parameters (row 398, fixed). The section "Principles of Overloading" forbids overloading a functional whose single parameter's type is a type parameter with the bound `Any` written, as `T extends Any`. A type parameter with no `extends` clause, whose bound is also `Any`, is exempt. Both paths refuse such an overload: the checker in `OverloadingChecker.checkBoundAny`, and walk since row 534's fix. Neither path runs every set that the rules allow. Appendix I's entry "Overloading with static parameters" names the sets that each path fails. In row 1048, the checker refuses a generic declaration beside a plain one over a tuple of object types, as `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)`. In row 537, the code generator fails on two generic declarations whose bounds differ. In row 539, walk refuses at load the 2019 paper's valid set over an array list and a list. In rows 779 and 780, walk fails on two generic functional methods one of whose declared domains lies inside the other's: in a trait or object without static parameters it refuses them at load, and in a trait with static parameters it loads them, but a call to which both apply fails. Detail: `Specification/advanced/overloading.tex:134-150` and `:531-674`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 3 and 4.
~~~~

Sentences in the new text and not in the old: 15 of 16, 2132 chars.

- (243 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: **The specification states the type group's 2011 overloading model: declarations of one name may differ in their static parameters, and a declaration with static parameters is read as one declaration over all its instances within its bounds.**
- (130 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: The section "Declarations with Static Parameters" states the OOPSLA 2011 paper's three rules: No Duplicates, Return Type and Meet.
- (73 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: It gives one more restriction as the compiled path's, not the language's.
- (158 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Where one generic declaration is more specific than another with as many static parameters, the two must declare them of the same kinds, position by position.
- (230 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Also, the more specific one's return type must be a subtype of the other's when their static parameters are matched by position, so the checker refuses an override whose return type reorders its static parameters (row 398, fixed).
- (172 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: The section "Principles of Overloading" forbids overloading a functional whose single parameter's type is a type parameter with the bound `Any` written, as `T extends Any`.
- (80 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: A type parameter with no `extends` clause, whose bound is also `Any`, is exempt.
- (116 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Both paths refuse such an overload: the checker in `OverloadingChecker.checkBoundAny`, and walk since row 534's fix.
- (49 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Neither path runs every set that the rules allow.
- (92 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Appendix I's entry "Overloading with static parameters" names the sets that each path fails.
- (183 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: In row 1048, the checker refuses a generic declaration beside a plain one over a tuple of object types, as `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)`.
- (85 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: In row 537, the code generator fails on two generic declarations whose bounds differ.
- (90 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: In row 539, walk refuses at load the 2019 paper's valid set over an array list and a list.
- (283 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: In rows 779 and 780, walk fails on two generic functional methods one of whose declared domains lies inside the other's: in a trait or object without static parameters it refuses them at load, and in a trait with static parameters it loads them, but a call to which both apply fails.
- (148 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Detail: `Specification/advanced/overloading.tex:134-150` and `:531-674`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 3 and 4.

### F-75 (group A): 576 chars at `b67abe3d2`, 1999 at `9de4c69bc8`, section "The checker and the one library"

Text at `b67abe3d2`:

~~~~
- F-75 **The compiled checker checks the Return Type Rule over every instance and answer 9's positional rule: two generic declarations in the more-specific relation agree on their static parameters by position.** It builds P-45. It also refuses a generic declaration beside a plain one on an object domain, which the paper accepts (row 542, for the curator's review). In the one library the two rules refuse only `distribute`'s two pairs (row 433). Gated by `compiler_tests/OverloadGeneric*`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-75 **The compiled checker checks the Return Type Rule over every instance, save those whose domain cannot meet an object type, and a positional rule: when two generic declarations in the more-specific relation declare as many static parameters of their own, those parameters agree in kind by position, and the more specific return type is a subtype of the other once the other's parameters are read as its own by position.** The equal-count scope and the comparison of kinds are the rung's choices. It builds P-45. The Return Type Rule leaves out the instances of the less specific declaration whose domain cannot meet the other's only where the less specific declaration has a type parameter as a whole parameter type and the more specific one has an object type there; a worker chose that width, and the curator has not decided it. The type group's 2011 paper (`Papers/Types/`) sets aside every instance whose domain is `Bottom`. So the rule accepts `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, `Circle` an object, and the pair runs (row 542, fixed; F-376). At a tuple of object types the rule still compares the instances that cannot meet, and wrongly refuses `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)` (row 1048). In the interpreter's library, with the built-in number types merged with their objects (P-178, F-379), the two rules refuse no pair: the distance holds no return-type or overloading error (F-53). Gated by `compiler_tests/OverloadGeneric*`, `OverloadBoundNamesForced` and `OverloadReturnObjectDomain`, which accept; `XXXOverloadReturnEveryInstance`, `XXXOverloadReturnObjectDomainOtherType`, `XXXOverloadGenericObjectDomainByPosition` and `XXXOverloadPermutedStaticParams`, which pin the two rules' right refusals; and `XXXOverloadReturnTupleDomain`, which pins row 1048's. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2; `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".
~~~~

Sentences in the new text and not in the old: 9 of 10, 1968 chars.

- (421 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: **The compiled checker checks the Return Type Rule over every instance, save those whose domain cannot meet an object type, and a positional rule: when two generic declarations in the more-specific relation declare as many static parameters of their own, those parameters agree in kind by position, and the more specific return type is a subtype of the other once the other's parameters are read as its own by position.**
- (73 chars) `3822898328` 2026-10-22 "POSITIONS and FACTS: the scrape, at his word of 2026-10-22: state words, PLAN and review-queue point"
  - text: The equal-count scope and the comparison of kinds are the rung's choices.
- (318 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: The Return Type Rule leaves out the instances of the less specific declaration whose domain cannot meet the other's only where the less specific declaration has a type parameter as a whole parameter type and the more specific one has an object type there; a worker chose that width, and the curator has not decided it.
- (97 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: The type group's 2011 paper (`Papers/Types/`) sets aside every instance whose domain is `Bottom`.
- (139 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: So the rule accepts `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, `Circle` an object, and the pair runs (row 542, fixed; F-376).
- (190 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: At a tuple of object types the rule still compares the instances that cannot meet, and wrongly refuses `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)` (row 1048).
- (195 chars) `b95570a644` 2026-11-17 "Record: FACTS and POSITIONS in line with climb batch 31b's landing, run 2 of climb batch 31"
  - text: In the interpreter's library, with the built-in number types merged with their objects (P-178, F-379), the two rules refuse no pair: the distance holds no return-type or overloading error (F-53).
- (376 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: Gated by `compiler_tests/OverloadGeneric*`, `OverloadBoundNamesForced` and `OverloadReturnObjectDomain`, which accept; `XXXOverloadReturnEveryInstance`, `XXXOverloadReturnObjectDomainOtherType`, `XXXOverloadGenericObjectDomainByPosition` and `XXXOverloadPermutedStaticParams`, which pin the two rules' right refusals; and `XXXOverloadReturnTupleDomain`, which pins row 1048's.
- (159 chars) `1ce04203c5` 2026-11-17 "The checker's Return Type Rule counts only the instances whose domain meets an object type"
  - text: Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2; `compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why".

### F-26 (group A): 597 chars at `b67abe3d2`, 1997 at `9de4c69bc8`, section "Execution model"

Text at `b67abe3d2`:

~~~~
- F-26 **Walk chooses between a generic declaration and another on their declared domains, not by the order they are written in.** It builds P-45 under walk. A generic trait's functional method and a generic dotted method are still compared by their instances. A generic instance chosen by converting an argument dispatches again, except for overloaded methods. The symbolic instance reads the static parameters' kinds and bounds, not a `where` clause. Gated by `tests/DispatchDeclaredDomain.fss` and `DispatchConvertedAgain.fss`. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` section 5.1.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-26 **Under walk, when one of two applicable declarations has static parameters of its own, the call chooses on their declared domains where exactly one lies inside the other, not by the order in which they are written.** It builds P-45, the choice among overloads by declared parameter types, under walk. A declaration has static parameters of its own if it is a generic function or constructor, or a functional method with static parameters in a trait or object without any. Its declared domain, walk's symbolic instance, is its parameter types with each type parameter standing for itself under its bounds. Where neither declared domain lies inside the other, where each lies inside the other, or where neither declaration has static parameters of its own, walk compares the domains of the instances that the call makes. So a functional method of a generic trait or object is compared on its instance, and a generic dotted method is chosen by F-253 (a generic method at a dotted call, also chosen on declared domains), except two whose bounds differ only in the api of a type of one simple name, of which the object's is kept (row 1134). If the chosen declaration is generic and its instance takes an argument only by a conversion, walk converts the argument and dispatches the converted arguments again, so the most specific declaration for the converted values runs. In two cases walk keeps the chosen instance, with no second dispatch: an overloaded dotted method, and a position whose conversion `Coercions.coercionFor` does not find, such as a tuple converted element by element. Two generic overloads whose static parameters agree in name, kind and bounds share one symbolic instance, even if their `where` clauses differ; no test or library declaration has such a pair (row 478). Gated by `tests/DispatchDeclaredDomain.fss` and `DispatchConvertedAgain.fss`. Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.1, 5.2 (the second dispatch) and 5.5 (the symbolic instance).
~~~~

Sentences in the new text and not in the old: 10 of 11, 1903 chars.

- (217 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: **Under walk, when one of two applicable declarations has static parameters of its own, the call chooses on their declared domains where exactly one lies inside the other, not by the order in which they are written.**
- (83 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: It builds P-45, the choice among overloads by declared parameter types, under walk.
- (170 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: A declaration has static parameters of its own if it is a generic function or constructor, or a functional method with static parameters in a trait or object without any.
- (132 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Its declared domain, walk's symbolic instance, is its parameter types with each type parameter standing for itself under its bounds.
- (213 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Where neither declared domain lies inside the other, where each lies inside the other, or where neither declaration has static parameters of its own, walk compares the domains of the instances that the call makes.
- (316 chars) `df5948e7b8` 2026-11-24 "Walk keys generic dotted methods by their bounds, reads a tuple result by element at every instance,"
  - text: So a functional method of a generic trait or object is compared on its instance, and a generic dotted method is chosen by F-253 (a generic method at a dotted call, also chosen on declared domains), except two whose bounds differ only in the api of a type of one simple name, of which the object's is kept (row 1134).
- (230 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: If the chosen declaration is generic and its instance takes an argument only by a conversion, walk converts the argument and dispatches the converted arguments again, so the most specific declaration for the converted values runs.
- (215 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: In two cases walk keeps the chosen instance, with no second dispatch: an overloaded dotted method, and a position whose conversion `Coercions.coercionFor` does not find, such as a tuple converted element by element.
- (201 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Two generic overloads whose static parameters agree in name, kind and bounds share one symbolic instance, even if their `where` clauses differ; no test or library declaration has such a pair (row 478).
- (126 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Detail: `compile-ladder/rung-walk-dispatch/REPORT.md` sections 5.1, 5.2 (the second dispatch) and 5.5 (the symbolic instance).

### F-22 (group B): 599 chars at `b67abe3d2`, 1482 at `9de4c69bc8`, section "Execution model"

Text at `b67abe3d2`:

~~~~
- F-22 **An exported function fails exactly as an exported variable does when a component's name differs from the api it exports, and the failure is the repository's, not codegen's.** Both paths look for an api's component under the api's own name, where the specification takes any component that exports it (row 320). `fortress link` and walk print "Could not find an implementation for API … on path", and a compiled run dies with `NoClassDefFoundError`. Name the api after its component. Gated by `compiler_tests/XXXExportVarRungXLinked.test`. Detail: `compile-ladder/rung-export-var/REPORT.md`.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-22 **When a component's name differs from the api that it exports, neither path finds the component, for an exported function or variable alike.** The specification resolves an imported api to any component that exports it (`Specification/basic/components/overview.tex`). The tree looks only under the api's name, unless a user maps the api to its component by hand with `LinkShell`'s `alink` or `clink`. The linker's component repository looks this way (`Linker.whoIsImplementingMyAPI`), so `fortress link` and walk print "Could not find an implementation for API … on path" before any code is generated. The code generator names a reference to an exported declaration after the api, and the declaring class after the component. The link step rewrites such a reference to the component only when the repository names it, so files compiled one by one, without `fortress link`, die with `NoClassDefFoundError`. The missing step is the repository's: finding the component that exports the api. The report names two repairs, neither built: the repository could search the source path for that component, or the code generator could emit api-named forwarders, for which three comments in `CodeGen.java` leave a place. Walk and `fortress link` need the first. Workaround: name the api after its component. Gated by the expected failure `compiler_tests/XXXExportVarRungXLinked.test` (row 320). Detail: `compile-ladder/rung-export-var/REPORT.md`, "The measurement that separates them".
~~~~

Sentences in the new text and not in the old: 12 of 12, 1464 chars.

- (143 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: **When a component's name differs from the api that it exports, neither path finds the component, for an exported function or variable alike.**
- (124 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The specification resolves an imported api to any component that exports it (`Specification/basic/components/overview.tex`).
- (132 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The tree looks only under the api's name, unless a user maps the api to its component by hand with `LinkShell`'s `alink` or `clink`.
- (200 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The linker's component repository looks this way (`Linker.whoIsImplementingMyAPI`), so `fortress link` and walk print "Could not find an implementation for API … on path" before any code is generated.
- (123 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The code generator names a reference to an exported declaration after the api, and the declaring class after the component.
- (179 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The link step rewrites such a reference to the component only when the repository names it, so files compiled one by one, without `fortress link`, die with `NoClassDefFoundError`.
- (81 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The missing step is the repository's: finding the component that exports the api.
- (221 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The report names two repairs, neither built: the repository could search the source path for that component, or the code generator could emit api-named forwarders, for which three comments in `CodeGen.java` leave a place.
- (40 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Walk and `fortress link` need the first.
- (45 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Workaround: name the api after its component.
- (86 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Gated by the expected failure `compiler_tests/XXXExportVarRungXLinked.test` (row 320).
- (90 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Detail: `compile-ladder/rung-export-var/REPORT.md`, "The measurement that separates them".

### F-35 (group B): 611 chars at `b67abe3d2`, 1166 at `9de4c69bc8`, section "The checker and the one library"

Text at `b67abe3d2`:

~~~~
- F-35 **The `FortressLibrary` api has 25 declarations with a dead size, a size parameter that occurs in no parameter type, return type or body.** They check clean (P-40). Where the component omits the dead size, the export checker reports the api's declaration missing. Six vector `DOT` and juxtaposition operators have this shape, `[\T, nat n, nat m, nat p\]` in the api and `[\T, nat n\]` in the component, and give one of the distance's export errors (F-53). P-40 lets the dead sizes go only by a diff shown to the curator with the switch-over's design. Detail: `perf-probes/nat/REPORT.md` sections 2 and 7.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-35 **The `FortressLibrary` api has 9 declarations with a dead size: a size parameter that occurs in none of the api declaration's parameter types or return type.** They are the three one-dimensional `subarray` methods, with `nat o`; the two-dimensional `subarray`, with `nat o0` and `nat o1`, and the three-dimensional one, with `nat o0` to `nat o2`; and the traits `Rank`, `Indexed1`, `Indexed2` and `Indexed3`, whose `nat n` occurs in no member's type but tells `Rank[\1\]` from `Rank[\2\]`, as `Rank1 extends Rank[\1\]` does (`FortressLibrary.fsi:1355`). The component's `subarray` bodies read their offsets as values. The api declarations check clean, since a size that reaches no type, name or value is no error (P-40). The census of 2026-09-21 found 25 and missed the three-dimensional `subarray`; the 17 vector and matrix operators have lost their sizes since (P-40). Where a component declares a function without the api's dead size, the export checker reports the api's declaration as missing, since it compares static-parameter lists by length, name and kind. Detail: `perf-probes/nat/REPORT.md` sections 2 (the 25, by line) and 7 (the export checker).
~~~~

Sentences in the new text and not in the old: 7 of 7, 1153 chars.

- (160 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: **The `FortressLibrary` api has 9 declarations with a dead size: a size parameter that occurs in none of the api declaration's parameter types or return type.**
- (393 chars) `bec01c5788` 2026-11-08 "Record landing of climb batch 28: FACTS, POSITIONS and the ledger brought in line with the landing" [absent again in a later commit]
  - text: They are the three one-dimensional `subarray` methods, with `nat o`; the two-dimensional `subarray`, with `nat o0` and `nat o1`, and the three-dimensional one, with `nat o0` to `nat o2`; and the traits `Rank`, `Indexed1`, `Indexed2` and `Indexed3`, whose `nat n` occurs in no member's type but tells `Rank[\1\]` from `Rank[\2\]`, as `Rank1 extends Rank[\1\]` does (`FortressLibrary.fsi:1355`).
- (63 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The component's `subarray` bodies read their offsets as values.
- (102 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The api declarations check clean, since a size that reaches no type, name or value is no error (P-40).
- (149 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The census of 2026-09-21 found 25 and missed the three-dimensional `subarray`; the 17 vector and matrix operators have lost their sizes since (P-40).
- (194 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Where a component declares a function without the api's dead size, the export checker reports the api's declaration as missing, since it compares static-parameter lists by length, name and kind.
- (92 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Detail: `perf-probes/nat/REPORT.md` sections 2 (the 25, by line) and 7 (the export checker).

### F-45 (group B): 623 chars at `b67abe3d2`, 1591 at `9de4c69bc8`, section "The checker and the one library"

Text at `b67abe3d2`:

~~~~
- F-45 **Without the exclusion rule, every dispatcher must call its generic arms at its own static arguments, and no published work resolves double membership under run-time dispatch.** These prices decided P-43. F-136 builds that call for template dispatchers; generic dotted methods, other dispatchers, and `opr` and `nat` arguments lack it (rows 495, 496). The 2012 patents' forest rule lets a self-typed generic stand at several instantiations along a chain, but alone it leaves the specialisation hole open; F-46 closes it. Detail: `reviews/mie-probes/scope-call-site-dispatch.md` section 3; `literature.md` beside it.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-45 **Without the exclusion rule, every dispatcher would have to call its generic arms at the call site's static arguments, and no published work resolves a value that is in two instantiations of one generic under run-time dispatch.** The loader already gives a generic dispatcher the call site's static arguments; without the rule, its arms would have to use them instead of arguments read from the value (`reviews/mie-probes/scope-call-site-dispatch.md` section 3). The call at the dispatcher's static arguments is built for template dispatchers (F-136), and, by reading, not for one with an `opr` or `nat` static parameter (`compile-ladder/rung-generic-runtime/REPORT.md` section 9). The team's 2012 patents allow a self-typed generic, one that comprises exactly its parameter, at several instantiations along a chain of subtypes: the forest rule (`reviews/mie-probes/patents-forest-rule.md` section 1). Alone, the forest rule leaves the specialisation hole open: a specialised declaration, more specific than the generic one, runs for a value at a narrower level of the chain, a subtype, and returns a type that a caller typed at that narrower level does not expect. Compiled under a shadow checker with the forest rule, a patched copy of the checker that never landed, such a run dies with `IncompatibleClassChangeError`; the tree's checker refuses such a program (the same note, section 3). Route C adds a return-type rule that closes the hole (F-46). Detail: `scope-call-site-dispatch.md` section 3; `reviews/mie-probes/literature.md`, "What the field settled and what it did not".
~~~~

Sentences in the new text and not in the old: 8 of 8, 1577 chars.

- (230 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: **Without the exclusion rule, every dispatcher would have to call its generic arms at the call site's static arguments, and no published work resolves a value that is in two instantiations of one generic under run-time dispatch.**
- (232 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The loader already gives a generic dispatcher the call site's static arguments; without the rule, its arms would have to use them instead of arguments read from the value (`reviews/mie-probes/scope-call-site-dispatch.md` section 3).
- (218 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The call at the dispatcher's static arguments is built for template dispatchers (F-136), and, by reading, not for one with an `opr` or `nat` static parameter (`compile-ladder/rung-generic-runtime/REPORT.md` section 9).
- (219 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: The team's 2012 patents allow a self-typed generic, one that comprises exactly its parameter, at several instantiations along a chain of subtypes: the forest rule (`reviews/mie-probes/patents-forest-rule.md` section 1).
- (263 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Alone, the forest rule leaves the specialisation hole open: a specialised declaration, more specific than the generic one, runs for a value at a narrower level of the chain, a subtype, and returns a type that a caller typed at that narrower level does not expect.
- (225 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Compiled under a shadow checker with the forest rule, a patched copy of the checker that never landed, such a run dies with `IncompatibleClassChangeError`; the tree's checker refuses such a program (the same note, section 3).
- (60 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Route C adds a return-type rule that closes the hole (F-46).
- (130 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Detail: `scope-call-site-dispatch.md` section 3; `reviews/mie-probes/literature.md`, "What the field settled and what it did not".

### F-55 (group B): 714 chars at `b67abe3d2`, 956 at `9de4c69bc8`, section "The checker and the one library"

Text at `b67abe3d2`:

~~~~
- F-55 **Static arguments are inferred with coercion on both paths: the compiled checker from the arguments' static types and the expected type, walk from their run-time types.** A mixed-width call takes the narrowest type its arguments convert into, as P-74 decides. The checker keeps the expected type at a typed binding and at `f(x)` (F-56), not at another call's argument (row 455). The compile path bounds an empty `extends` clause by `Object` (row 412). Walk converts a call's result to a typed binding's type after the call, but cannot fix a static argument that only the result names (row 510). Gated by `InferCoercion*`. Detail: `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.2, 3.4 and 4.2.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-55 **Static arguments are inferred with coercion on both paths: the compiled checker from the arguments' static types and the expected type, walk from their run-time types.** So a mixed-width call takes the narrowest type into which its arguments convert, as P-74 decides. F-73 gives the checker's rule and F-137 walk's; F-87 lists where the checker has an expected type. Under walk, a typed binding converts a call's result after the call and does not fix the call's static arguments: `a: BoxK[\ZZ64\] = wrapK(3)` infers `T` from `3` as `ZZ32` and is refused, since no coercion converts a `BoxK[\ZZ32\]` (row 510). A parameter with no written bound is bounded by `Any` on both paths, so a parameter that nothing fixes takes `Any` (F-78). Gated by `compiler_tests/InferCoercionShapes` and `tests/InferCoercionRungK`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2; `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.
~~~~

Sentences in the new text and not in the old: 6 of 7, 772 chars.

- (97 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: So a mixed-width call takes the narrowest type into which its arguments convert, as P-74 decides.
- (98 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: F-73 gives the checker's rule and F-137 walk's; F-87 lists where the checker has an expected type.
- (243 chars) `12292add28` 2026-11-09 "Read a number or string value at its trait in walk's inference and messages"
  - text: Under walk, a typed binding converts a call's result after the call and does not fix the call's static arguments: `a: BoxK[\ZZ64\] = wrapK(3)` infers `T` from `3` as `ZZ32` and is refused, since no coercion converts a `BoxK[\ZZ32\]` (row 510).
- (122 chars) `1bc0a9083f` 2026-10-30 "fortress compile bounds a type parameter declared without a bound by Any, as walk does, and the dist"
  - text: A parameter with no written bound is bounded by `Any` on both paths, so a parameter that nothing fixes takes `Any` (F-78).
- (77 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Gated by `compiler_tests/InferCoercionShapes` and `tests/InferCoercionRungK`.
- (135 chars) `bb39dbee3c` 2026-10-22 "FACTS: clarity chunks f1 to f4 applied as judged (F-268 split out in f3; one f1 entry held)"
  - text: Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2; `compile-ladder/rung-inference-walk/REPORT.md` sections 2 and 9.

### F-65 (group B): 489 chars at `b67abe3d2`, 786 at `9de4c69bc8`, section "The checker and the one library"

Text at `b67abe3d2`:

~~~~
- F-65 **The checker memoizes `TypeAnalyzer.parents` and `excludesClause` per trait table, and the memo changes no answer.** `FORTRESS_ANALYZER_CLAUSES_CACHE=false` turns it off. Off, both gate stages give the same errors, so it does not cause row 488's moves. Off, the count stage ran past its 900-second limit when measured, so turning it off is no control for anything. Detail: `compile-ladder/rung-analyzer-memo/REPORT.md`, "Why the memo changes no answer"; `reviews/row-488-probe.md`.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-65 **The checker memoizes `TypeAnalyzer.parents` and `excludesClause` per trait table, and the memo changes no answer.** `FORTRESS_ANALYZER_CLAUSES_CACHE=false` turns it off. By reading, both functions depend only on the table and the type. One differential on climb batch 7C's tree gave the same errors at the same sites with the memo off and on: 626 at the distance stage and 75 at the count stage. With the memo off, the count stage's 900-second limit stopped it; a copy with the limit raised took 1,149 s, against 112 s with the memo on. F-240 gives the stage's time today, with the memo on; its time with the memo off has not been measured since. Detail: `compile-ladder/rung-analyzer-memo/REPORT.md`, "Why the memo changes no answer"; `reviews/row-488-probe.md`, "The answer".
~~~~

Sentences in the new text and not in the old: 5 of 7, 603 chars.

- (65 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: By reading, both functions depend only on the table and the type.
- (159 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: One differential on climb batch 7C's tree gave the same errors at the same sites with the memo off and on: 626 at the distance stage and 75 at the count stage.
- (140 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: With the memo off, the count stage's 900-second limit stopped it; a copy with the limit raised took 1,149 s, against 112 s with the memo on.
- (109 chars) `04b009628a` 2026-10-23 "Climb batch 21's routing, run 1: item 19 landed, 21b being prepared; items 38 and 59 to PLAN-history"
  - text: F-240 gives the stage's time today, with the memo on; its time with the memo off has not been measured since.
- (130 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: Detail: `compile-ladder/rung-analyzer-memo/REPORT.md`, "Why the memo changes no answer"; `reviews/row-488-probe.md`, "The answer".

### F-85 (group B): 578 chars at `b67abe3d2`, 1353 at `9de4c69bc8`, section "The checker and the one library"

Text at `b67abe3d2`:

~~~~
- F-85 **The one library's generator, condition, reduction and nested-generator slips are repaired in its own spelling, and three sites of the distance are left there.** They are the identities' numeral fallback (row 436), `embiggen` (row 631) and `__bigOperator2`'s fused arm (row 632). `Condition`'s `cond` calls write their result type as static argument. F-93 holds a generator's size and index (row 629), and F-144 the reductions' `Any` devices (row 628). Gated by `tests/GeneratorDeclarations.fss`. Detail: `compile-ladder/rung-generator-slips/REPORT.md` sections 5 and 8.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-85 **In the interpreter's library, the rung's repairs of the generator, condition, reduction and nested-generator declarations that the compiled checker refused are in forms that the library already uses. `__bigOperator2`'s fused branch passes its result through `cast[\O0\]`.** That branch, the `typecase` branch that runs a nested big operator through `generate2`, casts its result to `O0` (`Library/FortressLibrary.fss:1670`), the library's device for an arm whose type the `typecase` cannot show (F-264), so the checker no longer types its body `OR(I0,O0)` where `O0` is declared (row 632) and no site of these declarations is on the distance (F-53). Each method body of `Condition` that calls `cond` writes the call's result type as its static argument, such as `cond[\Maybe[\G\]\]`. The sites that the rung left were cleared by other work: F-250 holds the identity functions' `cast` and the typed `embiggen`, F-93 how library code reads a generator's size and index (row 629), and F-144 how the reductions without an identity are typed at their element type (row 628). Gated by `tests/GeneratorDeclarations.fss` and `tests/NestedReductionFusion.fss`, which run the arm fused, and the cast by the distance stage. Detail: `compile-ladder/rung-generator-slips/REPORT.md` sections 5 and 8; `compile-ladder/rung-body-arguments/REPORT.md` section 9.
~~~~

Sentences in the new text and not in the old: 6 of 6, 1341 chars.

- (275 chars) `bd00ad997d` 2026-10-24 "Row 731's three library sites write their static argument, and __bigOperator2's fused arm casts its "
  - text: **In the interpreter's library, the rung's repairs of the generator, condition, reduction and nested-generator declarations that the compiled checker refused are in forms that the library already uses. `__bigOperator2`'s fused branch passes its result through `cast[\O0\]`.**
- (375 chars) `caa5363d72` 2026-11-17 "Fold the review's corrections"
  - text: That branch, the `typecase` branch that runs a nested big operator through `generate2`, casts its result to `O0` (`Library/FortressLibrary.fss:1670`), the library's device for an arm whose type the `typecase` cannot show (F-264), so the checker no longer types its body `OR(I0,O0)` where `O0` is declared (row 632) and no site of these declarations is on the distance (F-53).
- (133 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: Each method body of `Condition` that calls `cond` writes the call's result type as its static argument, such as `cond[\Maybe[\G\]\]`.
- (285 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: The sites that the rung left were cleared by other work: F-250 holds the identity functions' `cast` and the typed `embiggen`, F-93 how library code reads a generator's size and index (row 629), and F-144 how the reductions without an identity are typed at their element type (row 628).
- (142 chars) `bd00ad997d` 2026-10-24 "Row 731's three library sites write their static argument, and __bigOperator2's fused arm casts its "
  - text: Gated by `tests/GeneratorDeclarations.fss` and `tests/NestedReductionFusion.fss`, which run the arm fused, and the cast by the distance stage.
- (131 chars) `bd00ad997d` 2026-10-24 "Row 731's three library sites write their static argument, and __bigOperator2's fused arm casts its "
  - text: Detail: `compile-ladder/rung-generator-slips/REPORT.md` sections 5 and 8; `compile-ladder/rung-body-arguments/REPORT.md` section 9.


## 4. Twelve entries born after `b67abe3d2`

Entries at `9de4c69bc8` whose number is not at `b67abe3d2`: 182.

Group A, the six largest of them: F-252 (4330), F-299 (3232), F-377 (3197), F-225 (3019), F-341 (2941), F-366 (2941).

Group B, rule: list them by number; take the 10th, 20th, 30th, ... (1-based); skip any in group A; first six: F-230 (768), F-242 (1056), F-254 (1099), F-265 (1269), F-275 (1811), F-285 (1683).

The adding commit = the first first-parent commit (of the 265 touching FACTS.md) whose text holds a line `- F-N `. Added since = sentences of the present entry that are not exact strings among the sentences of the born text.

### F-252 (group A): born 3018 chars, now 4330, section "Landed semantics"

Added by `6d187d0697`, 2026-10-17, message: "Walk's load check reads every pair of generic declarations on its declared domains by the checker's "

Text in that commit:

~~~~
- F-252 **Under walk, two functions with static parameters that no pair of parameter types excludes are read on their declared domains, each over its own instances, by the No Duplicates, Return Type and Meet Rules, and a pair whose declared domains are equal is refused even where the parameter check orders it.** Walk's parameter-by-parameter check passes a pair it finds excluding; a pair of two own generics it refuses is read by `genericPairValid` (`interpreter/evaluator/values/OverloadedFunction.java:766`), whether or not an exclusion was withdrawn; a pair it passes by order, one at least an own generic and the other an own generic or plain, whose declared domains each lie inside the other is refused, "fails because their parameter lists have the same types" (`:533-540`, `sameDeclaredDomains` `:806`), since the check reads a type parameter as strictly below its bound. Limits: the Meet Rule's search matches the two domains only where their parameter types are, position by position, instances of one generic type or static parameters (row 539); a pair whose parameter types exclude only together is refused (row 740); instances of one generic type at different ground arguments do not exclude in the check (row 416); a generic functional method or dotted method is compared on the instance a call makes. Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk`, `GenericPairNestedBoundsWalk` (load and dispatch), `GenericBesideGenericSameDomain`, `GenericBesidePlainSameDomain` (refused), `XXXOverloadExistentialMeetWalk` and `XXXGenericPairExcludesTogetherWalk`. Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5. The Return Type Rule, where one of two own generics lies inside the other, is read at the instance of the outer one that holds the inner one's declared domain only where that instance stands for every instance applicable to an argument of the inner one (`returnRuleAtEveryInstance`, `OverloadedFunction.java` at 36afa7eb1): each static parameter the outer one's return type names is fixed by a static argument of one of its parameter types, or the outer one returns that type parameter and the inner one returns a type parameter of its own that is the type of no other parameters, or has there an object type below which its return type lies; otherwise the pair is refused, "at least one pair of parameters must have excluding types", as `f[\T extends Shape\](x: T, y: T): T` beside `f[\U extends Round\](x: U, y: Round): Round` and `f[\T extends Shape\](x: T): Box[\T\]` beside `f[\U extends Round\](x: U): Box[\U\]` are, which the compiled checker refuses too. Gated by `tests/GenericReturnRuleOuterParamWalk`, `GenericReturnRuleInvariantWalk` (refused) and `GenericReturnRuleHoldsWalk` (load and dispatch). Detail: `compile-ladder/rung-walk-generic-pairs/SKEPTIC.md` section 2. A type parameter bounded by `Any` counts: `g[\T\](a: T)` beside `g(a: Any)` is refused as equal declared domains, which the compiled checker accepts (row 759).
~~~~

Text at `9de4c69bc8`:

~~~~
- F-252 **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own, or one beside a generic trait's functional method that declares none of its own, the load check reads the pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules.** A declaration with static parameters of its own is a generic function, a generic object's constructor, or a functional method that declares static parameters in a trait or object that has none. Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads, except a plain declaration inside an own generic's declared domain where the two lists differ only at object types, which it reads on the declared domains (F-375). It reads two generic functions of one name and one list of static parameters at one shared symbolic instantiation, and two instances of one generic object as two object types that cannot be extended, so they exclude. So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `trait P[\T\] excludes { Q[\T\] }`, excludes at one `T`, though a type that extends `P[\ZZ32\]` and `Q[\String\]` has both. Walk then reads such an exclusion again over the instances of each, and withdraws it where their instances do not exclude. Instances of one generic type exclude only where their static arguments cannot be equal. Any other exclusion stands where the two still exclude with their static parameters renamed apart. Or, read at the shared instantiation, it stands where every generic type that both extend forces their static arguments to be equal, since no type extends two instances of one generic trait: so `Array` and `ImmutableArray` exclude at every pair of instances through `ReadableArray`. A pair whose exclusion is withdrawn is read on its declared domains as a refused pair is. It reads a refused pair of two such declarations again, each over all its own instances, and loads the pair if it meets the three rules. An own generic beside such a functional method is read as two own generics, the trait's static parameters standing for the method's (F-318). A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274). F-275 holds the Return Type Rule. The parameter check does not find two instances of one generic type at different ground static arguments excluding, such as `Tg[\3\]` and `Tg[\4\]`, so two plain declarations so typed are refused (row 416). Two declarations with static parameters of their own so typed load where the reading of the whole parameter type finds the instances apart, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` loads and runs (F-155, F-258). For the Meet Rule, walk looks for a third declaration that covers the overlap only where, at each position, the two parameter types are equal, or one of them is a static parameter, or both are instances of one generic type whose static arguments match in the same way (row 539). This search reads a bound that names its own parameter from the declarations, so two such bounds meet, and unifies a symbolic size with a size parameter. A pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (F-258; row 787). A pair with a varargs parameter is not read again and keeps the parameter check's refusal (F-257). At a call, walk compares a functional method of a generic trait or object on the instance that the call makes. F-253 gives the case of a generic dotted method, where one of the two declared domains can lie inside the other. Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk` and `GenericPairNestedBoundsWalk` (load and dispatch), and the expected failure `XXXOverloadExistentialMeetWalk` (row 539); for the withdrawal, as refusals at load, by `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` and `GenericOverloadInstancesApartWalk`, and as programs that load, by `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest` and `GenericPairExcludesTogetherWalk`. Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", and section 9.
~~~~

Sentences added since: 24 of 24, 4299 chars.

- (308 chars) `410c84ed94` 2026-11-06 "Record landing of climb batch 26: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own, or one beside a generic trait's functional method that declares none of its own, the load check reads the pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules.**
- (193 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: A declaration with static parameters of its own is a generic function, a generic object's constructor, or a functional method that declares static parameters in a trait or object that has none.
- (276 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads, except a plain declaration inside an own generic's declared domain where the two lists differ only at object types, which it reads on the declared domains (F-375).
- (216 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: It reads two generic functions of one name and one list of static parameters at one shared symbolic instantiation, and two instances of one generic object as two object types that cannot be extended, so they exclude.
- (179 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `trait P[\T\] excludes { Q[\T\] }`, excludes at one `T`, though a type that extends `P[\ZZ32\]` and `Q[\String\]` has both.
- (122 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: Walk then reads such an exclusion again over the instances of each, and withdraws it where their instances do not exclude.
- (88 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Instances of one generic type exclude only where their static arguments cannot be equal.
- (98 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Any other exclusion stands where the two still exclude with their static parameters renamed apart.
- (282 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: Or, read at the shared instantiation, it stands where every generic type that both extend forces their static arguments to be equal, since no type extends two instances of one generic trait: so `Array` and `ImmutableArray` exclude at every pair of instances through `ReadableArray`.
- (89 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: A pair whose exclusion is withdrawn is read on its declared domains as a refused pair is.
- (136 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: It reads a refused pair of two such declarations again, each over all its own instances, and loads the pair if it meets the three rules.
- (140 chars) `c41c3d2b06` 2026-11-05 "Walk's load check reads a program's generic operators between an array and a number beside a self-ty"
  - text: An own generic beside such a functional method is read as two own generics, the trait's static parameters standing for the method's (F-318).
- (93 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274).
- (33 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: F-275 holds the Return Type Rule.
- (206 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: The parameter check does not find two instances of one generic type at different ground static arguments excluding, such as `Tg[\3\]` and `Tg[\4\]`, so two plain declarations so typed are refused (row 416).
- (238 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: Two declarations with static parameters of their own so typed load where the reading of the whole parameter type finds the instances apart, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` loads and runs (F-155, F-258).
- (278 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: For the Meet Rule, walk looks for a third declaration that covers the overlap only where, at each position, the two parameter types are equal, or one of them is a static parameter, or both are instances of one generic type whose static arguments match in the same way (row 539).
- (153 chars) `410c84ed94` 2026-11-06 "Record landing of climb batch 26: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: This search reads a bound that names its own parameter from the declarations, so two such bounds meet, and unifies a symbolic size with a size parameter.
- (132 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: A pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (F-258; row 787).
- (98 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: A pair with a varargs parameter is not read again and keeps the parameter check's refusal (F-257).
- (110 chars) `e06bd068e7` 2026-10-22 "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "
  - text: At a call, walk compares a functional method of a generic trait or object on the instance that the call makes.
- (112 chars) `410c84ed94` 2026-11-06 "Record landing of climb batch 26: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: F-253 gives the case of a generic dotted method, where one of the two declared domains can lie inside the other.
- (557 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk` and `GenericPairNestedBoundsWalk` (load and dispatch), and the expected failure `XXXOverloadExistentialMeetWalk` (row 539); for the withdrawal, as refusals at load, by `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` and `GenericOverloadInstancesApartWalk`, and as programs that load, by `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest` and `GenericPairExcludesTogetherWalk`.
- (162 chars) `f2251f9372` 2026-11-05 "FACTS and POSITIONS: the coordinator's line fixes from the queue cleanup of 2026-11-05"
  - text: Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", and section 9.

### F-299 (group A): born 1620 chars, now 3232, section "The checker and the one library"

Added by `640acb4a17`, 2026-10-30, message: "Walk loads a builtinPrimitive string that names a static helper of nativeHelpers, and ZZ32's first f"

Text in that commit:

~~~~
- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 21 of the one library's 449 live bindings name one.** The loader (`interpreter/glue/StaticNativeApp.java`, reached from `NativeApp.checkAndLoadNative`, `interpreter/glue/NativeApp.java:194-201`) takes the helper's overload whose Java parameter and result types carry the declared types, `self` first, carries each value at its declared type, and refuses at load a string under `com.sun.fortress.nativeHelpers.` that names no static method, fits no overload, or has a declared parameter or result type that no Java type carries. It reads a method's `self` only by the helper's Java type, so a binding in a method of a program's own type loads (row 847). It raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. The 21: 19 of trait `ZZ32`'s operators and functions (`Library/FortressLibrary.fss:741-810`) and `Int`'s `asString` and `asExprString` (`LibraryBuiltin/FortressBuiltin.fss:371`, `:373`); the other 428 still name glue classes, `ZZ32`'s `CHOOSE` among them (row 521). With F-298 the compiled checker reads the 21 against their helpers' Java signatures from this step on (P-58). A native over `String`, helper or glue class alike, receives a non-flat string's type name (row 846). Test: `tests/NativeHelperBindingWalk.fss`, with `NativeHelperFamilyZZ32Walk`, `NativeHelperRaiseWalk`, `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk` and `ZZ32DivisionByZeroWalk`. Detail: `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why".
~~~~

Text at `9de4c69bc8`:

~~~~
- F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 373 of the one library's 401 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. For 15 names it runs walk's own operations instead and loads no helper: eight by the table `OWN_OPERATIONS` of `interpreter/glue/NativeApp.java`, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335), and `arrayOps`' seven by one rule (F-333). The library's own `FlatString`, identified by the component that declares it, carries `self` in a Java `String`; a program's own type named `FlatString` or `JavaString` carries none. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers, the messages, the refusal of a helper parameter declared `String`, and the loader's departures (rows 864, 551 and 846). The 373 by type: `ZZ32` 32, `ZZ64` 31 and `ZZ` 28 (F-306, F-327, F-331; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314), `RR64` 61 and the top-level `fromRawBits` (F-303, F-323), `RR32` 51 (F-310, its `asFloat` F-311), the `asFloat`s of `ZZ64` and `ZZ` 2 (F-311), the small rest 8 (F-307), the two that round a numeral once into `RR64` and `RR32` (F-79), and `NN32` 30, `NN64` 31 (its 32nd binding, `signed`, counted with the small rest) and `Char` 40 (F-308, F-313, F-327, F-331), the top-level `nanoTime` (F-314) and `random` (F-323), `Object`'s `ilkName` and `SEQV` over `Any` (F-328), `JavaBufferedWriter`'s 7 (F-330), `JavaBufferedReader`'s 10 (F-332), the array stores' 7 (F-333), `runtime`'s 6 (F-335), `System`'s `args` 2 (F-337), and the string family's 20: `FlatString`'s 13 methods; `natLineSeparator`; `match`; and `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment` and `getProperty`, each a native over `FlatString` beside an overload over `String` that flattens in a `typecase`. The other 28 name glue classes, `Reflect`'s (F-32). Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`; the entries of the other families name their own tests. Detail: `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why", for the count of 373 of 401; `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".
~~~~

Sentences added since: 11 of 11, 3214 chars.

- (171 chars) `f6e24650e7` 2026-11-17 "The five number types ZZ32, ZZ64, ZZ, NN64 and RR64 as value objects in the one library and walk, ea"
  - text: **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 373 of the one library's 401 live bindings name one.**
- (81 chars) `be3b07aacc` 2026-10-31 "FACTS and POSITIONS after climb batch 24's landing: the entries that the post-batch review found fal"
  - text: It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives.
- (201 chars) `be3b07aacc` 2026-10-31 "FACTS and POSITIONS after climb batch 24's landing: the entries that the post-batch review found fal"
  - text: The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`.
- (160 chars) `be3b07aacc` 2026-10-31 "FACTS and POSITIONS after climb batch 24's landing: the entries that the post-batch review found fal"
  - text: It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type.
- (268 chars) `bec01c5788` 2026-11-08 "Record landing of climb batch 28: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: For 15 names it runs walk's own operations instead and loads no helper: eight by the table `OWN_OPERATIONS` of `interpreter/glue/NativeApp.java`, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335), and `arrayOps`' seven by one rule (F-333).
- (182 chars) `410c84ed94` 2026-11-06 "Record landing of climb batch 26: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: The library's own `FlatString`, identified by the component that declares it, carries `self` in a Java `String`; a program's own type named `FlatString` or `JavaString` carries none.
- (207 chars) `bec01c5788` 2026-11-08 "Record landing of climb batch 28: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers, the messages, the refusal of a helper parameter declared `String`, and the loader's departures (rows 864, 551 and 846).
- (1030 chars) `b95570a644` 2026-11-17 "Record: FACTS and POSITIONS in line with climb batch 31b's landing, run 2 of climb batch 31"
  - text: The 373 by type: `ZZ32` 32, `ZZ64` 31 and `ZZ` 28 (F-306, F-327, F-331; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314), `RR64` 61 and the top-level `fromRawBits` (F-303, F-323), `RR32` 51 (F-310, its `asFloat` F-311), the `asFloat`s of `ZZ64` and `ZZ` 2 (F-311), the small rest 8 (F-307), the two that round a numeral once into `RR64` and `RR32` (F-79), and `NN32` 30, `NN64` 31 (its 32nd binding, `signed`, counted with the small rest) and `Char` 40 (F-308, F-313, F-327, F-331), the top-level `nanoTime` (F-314) and `random` (F-323), `Object`'s `ilkName` and `SEQV` over `Any` (F-328), `JavaBufferedWriter`'s 7 (F-330), `JavaBufferedReader`'s 10 (F-332), the array stores' 7 (F-333), `runtime`'s 6 (F-335), `System`'s `args` 2 (F-337), and the string family's 20: `FlatString`'s 13 methods; `natLineSeparator`; `match`; and `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment` and `getProperty`, each a native over `FlatString` beside an overload over `String` that flattens in a `typecase`.
- (51 chars) `3de571bac7` 2026-11-09 "Give numerals the types NaturalNumeral and RadixPointNumeral, and convert them where walk's places f"
  - text: The other 28 name glue classes, `Reflect`'s (F-32).
- (471 chars) `410c84ed94` 2026-11-06 "Record landing of climb batch 26: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`; the entries of the other families name their own tests.
- (392 chars) `b95570a644` 2026-11-17 "Record: FACTS and POSITIONS in line with climb batch 31b's landing, run 2 of climb batch 31"
  - text: Detail: `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why", for the count of 373 of 401; `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

### F-377 (group A): born 1786 chars, now 3197, section "Landed semantics"

Added by `6df780a7d0`, 2026-11-17, message: "The compiled code casts self where it stands at a type below its trait"

Text in that commit:

~~~~
- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait, at a single argument of a function, a method or a constructor (`evalArg`), at a typed binding and an assignment (`forExprsSerial`) and at a method's returned value (`generateActualMethodCode`), also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }` and `twin(self): S = self` in a self-typed trait verify and run (rows 991 and 695, fixed), as the one library's `QQ comprises { Ratio }` needs. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A closure's returned value and a conditional's arms get no cast (rows 1050 and 1051), and a trait that lists a type at a `where`-clause variable gets none (row 307). No cast is added where the value's type is a subtype of the declared type by `extends`; one is added, where the base emitted none and the class verified, at a declared trait type strictly below self's trait, since the verifier does not check an interface type. A later cast site gates on the expression's type before it compares types: asking the type analyzer at every argument stopped a link over a `bool` static argument. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `compiler_tests/SelfTypeReturnSelfRun`, `compiler_tests/SelfTypeReturnSelfAtTraitRun`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why".
~~~~

Text at `9de4c69bc8`:

~~~~
- F-377 **The compiled code casts `self` where the checker reads it as a listed type or as the self-type parameter.** `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait. It casts at the argument of a call with one argument (a call with several arguments casts each already), also where the declaration that the call chooses takes `self` at a listed type, as a call on `self` in `QQ comprises { Ratio }` that takes `Ratio`'s declaration (F-408), at a typed binding and an assignment, at a method's returned value, at each arm of a conditional or a `case` expression, at the conditional's type, and at a function expression's and a local function's result, also where the value is a typecase whose arms each have self's type. So `den(self)` for `den(r: R)` in `trait Q comprises { R }`, `twin(self): S = self` and `mx(self, other: T): T = if lt(other, self) then self else other end` in a self-typed trait verify and run (rows 991, 695, 1050 and 1051, fixed), as the one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN` and `MAX` need. A conditional or typecase whose arms are pairs that hold `self`, `MINMAX`'s shape, verifies and runs with no cast, since the declared tuple type is a JVM interface and the caller converts the result; a typecase whose arms are all `self` has a one-element union, which is cast. Only `self` gets the reading: the checker refuses a variable declared at the trait where a listed type is expected. A typecase with `self` in one arm and another value in the other gets no cast (row 1070), and a trait that lists a type at a `where`-clause variable gets none (row 307). An assignment from outside an object to its `var` field passes the value at the field's type, `self` at a listed type cast to it (`VarFieldAssignedSubtypeRun`; F-406). No cast is added where the value's type is a subtype of the declared type by `extends`. Two casts are added where the verifier, which checks no interface type, needs none: at a declared trait type strictly below self's trait, a planner's default; and at an arm that is `self` where the conditional stands at a trait type, as `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`, a worker's choice beyond the plan. The curator has decided neither. Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeReturnSelfRun`, `SelfTypeReturnSelfAtTraitRun`, `SelfTypeArmRun`, `SelfTypeFromClosureRun`, `VarFieldAssignedSubtypeRun`, `ComprisesSelfListedTypeCompiled`, `ComprisesSelfAbstractFunctionalMethodCall`. Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; `compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why"; the pairs and the all-`self` typecase: `reviews/model-comparison/probe-2026-11-18.md`, "Point 1" and "Point 2"; the call at a listed type's declaration: `compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why".
~~~~

Sentences added since: 12 of 14, 2952 chars.

- (267 chars) `fdd4a2cdd1` 2026-11-18 "Record after climb batch 33's landing, run 1: 23 FACTS entries, P-12 and row 1052"
  - text: `CodeGen.castToTypeBelow` casts a value that has self's type (the checker's `TraitSelfType` with a non-empty list: a trait whose `comprises` clause lists types, or a trait with a self-type parameter) to a declared trait type or type variable strictly below its trait.
- (553 chars) `da5f707779` 2026-11-24 "The checker chooses among a call's declarations by their signatures as declared, in the order of the"
  - text: It casts at the argument of a call with one argument (a call with several arguments casts each already), also where the declaration that the call chooses takes `self` at a listed type, as a call on `self` in `QQ comprises { Ratio }` that takes `Ratio`'s declaration (F-408), at a typed binding and an assignment, at a method's returned value, at each arm of a conditional or a `case` expression, at the conditional's type, and at a function expression's and a local function's result, also where the value is a typecase whose arms each have self's type.
- (328 chars) `069df3a2a4` 2026-11-18 "F-377: a conditional whose arms are pairs holding self needs no cast, and an all-self typecase is ca"
  - text: So `den(self)` for `den(r: R)` in `trait Q comprises { R }`, `twin(self): S = self` and `mx(self, other: T): T = if lt(other, self) then self else other end` in a self-typed trait verify and run (rows 991, 695, 1050 and 1051, fixed), as the one library's `QQ comprises { Ratio }` and `StandardTotalOrder`'s `MIN` and `MAX` need.
- (276 chars) `069df3a2a4` 2026-11-18 "F-377: a conditional whose arms are pairs holding self needs no cast, and an all-self typecase is ca"
  - text: A conditional or typecase whose arms are pairs that hold `self`, `MINMAX`'s shape, verifies and runs with no cast, since the declared tuple type is a JVM interface and the caller converts the result; a typecase whose arms are all `self` has a one-element union, which is cast.
- (169 chars) `1f6c166b0d` 2026-11-17 "The compiled code casts self at a conditional's arm and a closure's result, and loads no class to ch"
  - text: A typecase with `self` in one arm and another value in the other gets no cast (row 1070), and a trait that lists a type at a `where`-clause variable gets none (row 307).
- (167 chars) `08860c527f` 2026-11-23 "Compiled calls name methods that the class holds: a setter at the field's type, and an overload meth"
  - text: An assignment from outside an object to its `var` field passes the value at the field's type, `self` at a listed type cast to it (`VarFieldAssignedSubtypeRun`; F-406).
- (87 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: No cast is added where the value's type is a subtype of the declared type by `extends`.
- (347 chars) `fdd4a2cdd1` 2026-11-18 "Record after climb batch 33's landing, run 1: 23 FACTS entries, P-12 and row 1052"
  - text: Two casts are added where the verifier, which checks no interface type, needs none: at a declared trait type strictly below self's trait, a planner's default; and at an arm that is `self` where the conditional stands at a trait type, as `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`, a worker's choice beyond the plan.
- (32 chars) `fdd4a2cdd1` 2026-11-18 "Record after climb batch 33's landing, run 1: 23 FACTS entries, P-12 and row 1052"
  - text: The curator has decided neither.
- (339 chars) `da5f707779` 2026-11-24 "The checker chooses among a call's declarations by their signatures as declared, in the order of the"
  - text: Tests: `compiler_tests/ComprisesValueAtListedTypeCompiled`, `ComprisesValueAtConditionalArmRun`, `ComprisesValueFromClosureRun`, `SelfTypeReturnSelfRun`, `SelfTypeReturnSelfAtTraitRun`, `SelfTypeArmRun`, `SelfTypeFromClosureRun`, `VarFieldAssignedSubtypeRun`, `ComprisesSelfListedTypeCompiled`, `ComprisesSelfAbstractFunctionalMethodCall`.
- (133 chars) `1f6c166b0d` 2026-11-17 "The compiled code casts self at a conditional's arm and a closure's result, and loads no class to ch"
  - text: Detail: `compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why"; `compile-ladder/rung-self-arm-closure/REPORT.md`, "1.
- (254 chars) `da5f707779` 2026-11-24 "The checker chooses among a call's declarations by their signatures as declared, in the order of the"
  - text: What changed and why"; the pairs and the all-`self` typecase: `reviews/model-comparison/probe-2026-11-18.md`, "Point 1" and "Point 2"; the call at a listed type's declaration: `compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why".

### F-225 (group A): born 1824 chars, now 3019, section "The checker and the one library"

Added by `1c32ccffdb`, 2026-10-14, message: "The compiled checker reads a self-typed trait's self as the implementing type from its F-bound, keep"

Text in that commit:

~~~~
- F-225 **The compiled checker reads a self-typed trait's `self` as the implementing type, from its F-bound, keeps the signatures plain, and refuses an extender at another type.** In a trait with no `comprises` clause, or one that lists only `...`, a type parameter `X` bounded by the trait at its own parameters, or by a self-typed trait that the trait extends at `X`, is the trait's self parameter: `self` in its dotted and functional method bodies is `C[\X\] & X` (`SelfParamDisambiguator.selfParam`), while each functional method's signature keeps `C[\X\]` (`FunctionalMethod.parameters`), so overloading, the Return Type Rule and call resolution see no intersection. A trait or object declaration, or an object expression, that extends `C[\A\]` must be a subtype of `A` at the self position, "D extends C[\A\], whose self parameter is A, but D is not a subtype of A." (`TypeHierarchyChecker.checkDeclSelfParams`, `checkObjectExprSelfParams`); an object has no self parameter. What it means: the library's 29 self-typed bodies check, and the distance is 55 on the rung's own tree (85 before, `FortressLibrary.fss:130` gone too); walk is unchanged and loads what the rule refuses; a compiled body returning `self` fails verification when the parameter is an object type (row 695); the rule refuses `ProjectFortress/demos/trips.fss:97-98` (row 710) and `Library/PureList.fsi:41` (row 355) and accepts the `Containment` mixins and `Relation`. Tests: `compiler_tests/SelfTypeFromBound`, `SelfTypeMixinBound`, `SelfTypeExtenderThroughOwn`, `XXXSelfTypeExtenderWrong`, `XXXSelfTypeObjectExprWrong`, `XXXSelfTypeMixinExtenderWrong`, `XXXSelfTypeMixinObject`, and through an api `SelfTypeMixinApi`, `SelfTypeMixinImported`, `XXXSelfTypeMixinImportedWrong`. Detail: `compile-ladder/rung-self-type/REPORT.md`, sections 1, 4 and 7.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-225 **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277) and in the Return Type check of a dotted method redeclared below the trait (row 1094), and the checker refuses an extender at another type.** It builds P-146. A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`. The Return Type check reads `self` as `C[\X\] & X` in the trait's signature where an object's dotted method redeclares the trait's method at the same parameter types, so it refuses a narrower return type; a getter so redeclared reads the plain type and compiles (F-394). That reading of a dotted method departs from P-146 and P-157, which keep the plain signatures for the Return Type Rule (row 1094). The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's. In a trait whose `comprises` clause lists types, `self` in the bodies is instead the trait met with the union of those types, and, as in a self-typed trait, the signatures keep `self` at the plain trait type and the exclusion test reads the meet (F-408). For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`. The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146). Walk has no such rule and loads what it refuses. A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]` (row 695, fixed). F-377 gives the cast that does it, also at a conditional's arm (`StandardTotalOrder`'s `MIN` and `MAX`) and at a closure's result (rows 1051 and 1050, fixed). A default body that calls a method on a value of the self-type parameter runs, also where the object lists the trait first (row 1052, fixed); F-385 gives how, and the generic object for which it may not hold. The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355). The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound. Gated by `compiler_tests/SelfType*` and `XXXSelfType*`. Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.
~~~~

Sentences added since: 17 of 17, 2995 chars.

- (493 chars) `5a70c03deb` 2026-11-20 "Record after climb batch 34's landing: F-34, F-225, F-325 and F-392 to F-394, notes on F-240 and P-1"
  - text: **In a self-typed trait with no `comprises` clause, or one that lists only `...`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, the trait met with the implementing type, read from the trait's F-bound; the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277) and in the Return Type check of a dotted method redeclared below the trait (row 1094), and the checker refuses an extender at another type.**
- (16 chars) `15a6d4365a` 2026-10-14 "FACTS: the record pass after climb batch 14, the twelve entries cut to the form and F-224 merged int"
  - text: It builds P-146.
- (76 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`.
- (270 chars) `5a70c03deb` 2026-11-20 "Record after climb batch 34's landing: F-34, F-225, F-325 and F-392 to F-394, notes on F-240 and P-1"
  - text: The Return Type check reads `self` as `C[\X\] & X` in the trait's signature where an object's dotted method redeclares the trait's method at the same parameter types, so it refuses a narrower return type; a getter so redeclared reads the plain type and compiles (F-394).
- (130 chars) `5a70c03deb` 2026-11-20 "Record after climb batch 34's landing: F-34, F-225, F-325 and F-392 to F-394, notes on F-240 and P-1"
  - text: That reading of a dotted method departs from P-146 and P-157, which keep the plain signatures for the Return Type Rule (row 1094).
- (178 chars) `3822898328` 2026-10-22 "POSITIONS and FACTS: the scrape, at his word of 2026-10-22: state words, PLAN and review-queue point"
  - text: The checker also takes a parameter bounded by a self-typed trait that the trait extends at that parameter, as the team's `Containment` mixins are: a default of the coordinator's.
- (254 chars) `da5f707779` 2026-11-24 "The checker chooses among a call's declarations by their signatures as declared, in the order of the"
  - text: In a trait whose `comprises` clause lists types, `self` in the bodies is instead the trait met with the union of those types, and, as in a self-typed trait, the signatures keep `self` at the plain trait type and the exclusion test reads the meet (F-408).
- (91 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: For example, `object Bad extends Integral[\ZZ32\]` is refused, since `Bad` is not a `ZZ32`.
- (133 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: The rule accepts every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead (P-146).
- (48 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: Walk has no such rule and loads what it refuses.
- (179 chars) `255179ba3a` 2026-11-17 "Record: FACTS and the ledger in line with climb batch 31's landing, run 1"
  - text: A compiled default body that returns `self` at the self-type parameter runs, also where the parameter is an object type, as in `object Pt(…) extends Shape[\Pt\]` (row 695, fixed).
- (158 chars) `fdd4a2cdd1` 2026-11-18 "Record after climb batch 33's landing, run 1: 23 FACTS entries, P-12 and row 1052"
  - text: F-377 gives the cast that does it, also at a conditional's arm (`StandardTotalOrder`'s `MIN` and `MAX`) and at a closure's result (rows 1051 and 1050, fixed).
- (208 chars) `fdd4a2cdd1` 2026-11-18 "Record after climb batch 33's landing, run 1: 23 FACTS entries, P-12 and row 1052"
  - text: A default body that calls a method on a value of the self-type parameter runs, also where the object lists the trait first (row 1052, fixed); F-385 gives how, and the generic object for which it may not hold.
- (77 chars) `5a70c03deb` 2026-11-20 "Record after climb batch 34's landing: F-34, F-225, F-325 and F-392 to F-394, notes on F-240 and P-1"
  - text: The rule refuses, rightly, a team declaration, `PureList`'s `List` (row 355).
- (493 chars) `5a70c03deb` 2026-11-20 "Record after climb batch 34's landing: F-34, F-225, F-325 and F-392 to F-394, notes on F-240 and P-1"
  - text: The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (`Library/CompilerAlgebra.fsi:16`, `:24`), and that spelling does not bind the one library, since Naden's last text puts the self-type idiom in bounds only, not as a first-class type (`Papers/Types/journal/justificationOfRTR.tex:626-630`), and Steele's own message on `655e65d53` gives the self type as the trait met with the `comprises` clause, which this rule reads from the F-bound.
- (55 chars) `15a6d4365a` 2026-10-14 "FACTS: the record pass after climb batch 14, the twelve entries cut to the form and F-224 merged int"
  - text: Gated by `compiler_tests/SelfType*` and `XXXSelfType*`.
- (136 chars) `04b009628a` 2026-10-23 "Climb batch 21's routing, run 1: item 19 landed, 21b being prepared; items 38 and 59 to PLAN-history"
  - text: Detail: `compile-ladder/rung-self-type/REPORT.md` sections 1, 2, 4 and 7; `compile-ladder/rung-self-type-exclusion/REPORT.md` section 1.

### F-341 (group A): born 1233 chars, now 2941, section "Landed semantics"

Added by `3de571bac7`, 2026-11-09, message: "Give numerals the types NaturalNumeral and RadixPointNumeral, and convert them where walk's places f"

Text in that commit:

~~~~
- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, called with the numeral object, one result per site and type; a numeral out of the type's range, or at a type with no coercion from it, is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its own type or its default, then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10, `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `1/2 = 0.5` is `true`. Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".
~~~~

Text at `9de4c69bc8`:

~~~~
- F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as numbers that convert where they stand, a `ZZ` where nothing fixes a type (F-407), one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone. Dispatch fits it at its default, unless its own coercion reaches a declaration strictly below, which then runs (F-366), else by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`, by `QQ`'s `=`, which the numeral reaches by its own coercion, not the library's `=` over `Any` (F-366; `tests/NumeralEqualsNumberWalk`). At load walk refuses a numeral type written as a type that a trait or an object extends, as a type that a trait's `comprises` clause lists, or as a static argument, or in a return type, a variable's or a field's type, an object's value parameters among the fields; one written as a static parameter's bound or a `typecase` arm's type loads (row 1135). Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`, `NumeralTypeComprisedWalk.fss`, `NumeralTypeReturnTypeWalk.fss`, `NumeralTypeVariableTypeWalk.fss`, `NumeralTypeFieldTypeWalk.fss`, `NumeralTypeObjectParameterWalk.fss`, `NumeralTypeNoValueWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why"; `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 981: a numeral type in a comprises clause (fork L3)"; `compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why".
~~~~

Sentences added since: 9 of 11, 2620 chars.

- (665 chars) `2a969fed6e` 2026-11-24 "A numeral coercion's four numbers convert where they stand, on both paths, and the coercions carry n"
  - text: At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers bound as numbers that convert where they stand, a `ZZ` where nothing fixes a type (F-407), one result per site and type; a folded constant at a library number type converts from its exact value, outside the coercion; a numeral out of the type's range, one that rounds to an infinity at `RR32` or `RR64`, one at a type with no coercion from it, or one outside its coercion's `where` clause is refused there when it runs; a store keeps its default alone.
- (279 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: Dispatch fits it at its default, unless its own coercion reaches a declaration strictly below, which then runs (F-366), else by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all.
- (250 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: So `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`, by `QQ`'s `=`, which the numeral reaches by its own coercion, not the library's `=` over `Any` (F-366; `tests/NumeralEqualsNumberWalk`).
- (351 chars) `df5948e7b8` 2026-11-24 "Walk keys generic dotted methods by their bounds, reads a tuple result by element at every instance,"
  - text: At load walk refuses a numeral type written as a type that a trait or an object extends, as a type that a trait's `comprises` clause lists, or as a static argument, or in a return type, a variable's or a field's type, an object's value parameters among the fields; one written as a static parameter's bound or a `typecase` arm's type loads (row 1135).
- (631 chars) `df5948e7b8` 2026-11-24 "Walk keys generic dotted methods by their bounds, reads a tuple result by element at every instance,"
  - text: Tests: `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`, `NumeralRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityWalk.fss`, `NumeralPointRoundsToInfinityAtParameterWalk.fss`, `NumeralFoldedRoundsToInfinityWalk.fss`, `NumeralTypeExtendedWalk.fss`, `NumeralTypeStaticArgumentWalk.fss`, `NumeralTypeComprisedWalk.fss`, `NumeralTypeReturnTypeWalk.fss`, `NumeralTypeVariableTypeWalk.fss`, `NumeralTypeFieldTypeWalk.fss`, `NumeralTypeObjectParameterWalk.fss`, `NumeralTypeNoValueWalk.fss`.
- (131 chars) `eb8a592455` 2026-11-10 "Fold the review's corrections"
  - text: Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why"; `compile-ladder/rung-static-numerals/REPORT.md`, "1.
- (77 chars) `f78da2650a` 2026-11-10 "Record landing of climb batch 30: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: What changed and why"; `compile-ladder/rung-numeral-leftovers/REPORT.md`, "1.
- (214 chars) `df5948e7b8` 2026-11-24 "Walk keys generic dotted methods by their bounds, reads a tuple result by element at every instance,"
  - text: What changed and why"; `compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "Row 981: a numeral type in a comprises clause (fork L3)"; `compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1.
- (22 chars) `98b04d371e` 2026-10-30 "The compiled path reads a builtinPrimitive body naming a helper of nativeHelpers as a call of that h"
  - text: What changed and why".

### F-366 (group A): born 2890 chars, now 2941, section "Landed semantics"

Added by `b190b8eb25`, 2026-11-16, message: "A numeral at a call goes to the most specific declaration that takes it, on both paths"

Text in that commit:

~~~~
- F-366 **A numeral at a call goes to the most specific declaration that takes it, on both paths: a declaration that only the numeral's own coercion reaches runs in place of the one that fits the numeral at its default where its declared parameter types lie strictly below, by subtyping; otherwise the one that the default fits runs.** It builds P-46. So `u = 0` and `0 = u` are `true`, and `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64` or `RR32`; `h = 0.5` is `true` for `h: QQ = 1/2`; `k(5)` runs `k(x: NN32)` beside `k(x: Any)`; a `case` clause `0` matches a zero `NN32`; and a program's own number type with a numeral coercion compares with a numeral by its own `=`. `Equality[\T\]` declares `opr =/=(self, other:T)` as the negation of the type's `=` (`Library/FortressLibrary.fss:102`), which a type that extends `Equality` reaches before the `=/=` over `Any` (`:98`). The order between the two kinds of declaration is subtyping on the declared parameter types, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration, and `x^2` for an `RR64` keeps its integer power. A value's coercion is not ranked so. Of two declarations reached only by coercion and not ordered, the one that the numeral's default fits runs, whether they differ at the numeral alone or elsewhere too, so `1.0 s` for `s: ZZ32` checks against the one library at `RR64`'s juxtaposition. So a model line may compare a number of any type with a numeral, and write a float numeral beside an integer value, on both paths. The checker does the comparison only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, so a call such as `i + 1` costs nothing more; walk keeps each choice in its dispatch cache, except one that asked a type of a program's own for its numeral coercion, whose `where` clause the cache's key does not hold. The key tells a negative constant from a numeral of the same default, since no unsigned type takes the first (`Numerals.rangeKey`). Two departures: under walk a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016), and on both paths a numeral at a bare type parameter's declaration does not go to a more specific one (row 1017). Source: `numeralAttempt` and `numeralTie` in `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:980-1021`, `:1066`, `:1117`; `bestMatchForNumerals` and `belowByNumerals` in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2325-2428`. Tests: `compiler_tests/NumeralMostSpecificCompiled`, `compiler_tests/NumeralTieDefaultCompiled`, `tests/NumeralMostSpecificWalk`, `tests/NumeralEqualsNumberWalk`, `tests/NotEqualNumeral`. Detail: `compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" and "5. Points to report".
~~~~

Text at `9de4c69bc8`:

~~~~
- F-366 **On both paths a numeral at a call leaves the declaration that fits it at its default only for one that its own coercion reaches and whose declared parameter types lie strictly below, by subtyping.** It builds P-46's rule for a numeral at a call. P-46 does not word the order: the worker that built the rule chose subtyping, and the curator has read that choice as landed and let it stand, without wording a decision of his own. So `u = 0` and `0 = u` are `true`, and `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64` or `RR32`, but on the compiled path until the switch-over the checker refuses `u =/= 0` at `RR32` and `RR64` (row 1059) and `u = 0` at `RR32` overflows the stack (row 528); `h = 0.5` is `true` for `h: QQ = 1/2`; `k(5)` runs `k(x: NN32)` beside `k(x: Any)`; a `case` clause `0` matches a zero `NN32`; and a program's own number type with a numeral coercion compares with a numeral by its own `=`. `Equality[\T\]` declares `opr =/=(self, other:T)` as the negation of the type's `=` (`Library/FortressLibrary.fss:102`), which a type that extends `Equality` reaches before the `=/=` over `Any` (`:98`). The order between the declaration that the default fits and one that the coercion reaches is subtyping on the declared parameter types, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration, and `x^2` for an `RR64` keeps its integer power. A value's coercion is not ranked so. Where a call reaches two declarations only by coercion and they are not ordered, the one whose parameter the numeral's default fits as it is runs, whether they differ at the numeral alone or elsewhere too, so `1.0 s` for `s: ZZ32` checks against the one library at `RR64`'s juxtaposition. So a model line may compare a number of any type with a numeral, and write a float numeral beside an integer value, on both paths. The checker compares only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, so a call such as `i + 1` costs nothing more; the report says which choices walk keeps in its dispatch cache. Two departures: under walk a numeral beside a value typed `Any` is converted by the value's run-time type (row 1016), and on both paths a numeral at a bare type parameter's declaration does not go to a more specific one (row 1017). Source: `numeralAttempt` and `numeralTie` in `scala_src/typechecker/impls/Functionals.scala:980-1021`, `:1066`, `:1143`; `bestMatchForNumerals` and `belowByNumerals` in `interpreter/evaluator/values/OverloadedFunction.java:2422-2525`. Tests: `compiler_tests/NumeralMostSpecificCompiled`, `compiler_tests/NumeralEqualsNumberCompiled`, `compiler_tests/NumeralTieDefaultCompiled`, `tests/NumeralMostSpecificWalk`, `tests/NumeralEqualsNumberWalk`, `tests/NotEqualNumeral`. Detail: `compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" and "5. Points to report".
~~~~

Sentences added since: 9 of 16, 2206 chars.

- (200 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: **On both paths a numeral at a call leaves the declaration that fits it at its default only for one that its own coercion reaches and whose declared parameter types lie strictly below, by subtyping.**
- (46 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: It builds P-46's rule for a numeral at a call.
- (181 chars) `25c0d1cb0b` 2026-11-16 "Record: F-58 rewritten from the count on the landed tree, F-366 after the curator's review, and the "
  - text: P-46 does not word the order: the worker that built the rule chose subtyping, and the curator has read that choice as landed and let it stand, without wording a decision of his own.
- (489 chars) `d3095ca77f` 2026-11-17 "A numeral that ends a block after a local declaration, or stands in a tuple, converts where it stand"
  - text: So `u = 0` and `0 = u` are `true`, and `u =/= 0` is `false`, for a zero `u` of `NN32`, `NN64` or `RR32`, but on the compiled path until the switch-over the checker refuses `u =/= 0` at `RR32` and `RR64` (row 1059) and `u = 0` at `RR32` overflows the stack (row 528); `h = 0.5` is `true` for `h: QQ = 1/2`; `k(5)` runs `k(x: NN32)` beside `k(x: Any)`; a `case` clause `0` matches a zero `NN32`; and a program's own number type with a numeral coercion compares with a numeral by its own `=`.
- (296 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: The order between the declaration that the default fits and one that the coercion reaches is subtyping on the declared parameter types, not the coercion chapter's relation: `f(1.5)` beside `f(x: RR32)` and `f(x: RR64)` runs the `RR64` declaration, and `x^2` for an `RR64` keeps its integer power.
- (288 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: Where a call reaches two declarations only by coercion and they are not ordered, the one whose parameter the numeral's default fits as it is runs, whether they differ at the numeral alone or elsewhere too, so `1.0 s` for `s: ZZ32` checks against the one library at `RR64`'s juxtaposition.
- (239 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: The checker compares only where the declaration that fits has a numeral at a parameter that is not of the numeral's default type, so a call such as `i + 1` costs nothing more; the report says which choices walk keeps in its dispatch cache.
- (234 chars) `2af3ec103d` 2026-11-23 "Record after climb batch 35's landing: P-174, P-40 and P-173 in line with P-174's rewrite; F-396, th"
  - text: Source: `numeralAttempt` and `numeralTie` in `scala_src/typechecker/impls/Functionals.scala:980-1021`, `:1066`, `:1143`; `bestMatchForNumerals` and `belowByNumerals` in `interpreter/evaluator/values/OverloadedFunction.java:2422-2525`.
- (233 chars) `d3095ca77f` 2026-11-17 "A numeral that ends a block after a local declaration, or stands in a tuple, converts where it stand"
  - text: Tests: `compiler_tests/NumeralMostSpecificCompiled`, `compiler_tests/NumeralEqualsNumberCompiled`, `compiler_tests/NumeralTieDefaultCompiled`, `tests/NumeralMostSpecificWalk`, `tests/NumeralEqualsNumberWalk`, `tests/NotEqualNumeral`.

### F-230 (group B): born 768 chars, now 768, section "Landed semantics"

Added by `a0f839ad7e`, 2026-10-14, message: "array1 and array2 build a vector or a matrix per number type by a typecase over a witness of their r"

Text in that commit:

~~~~
- F-230 **`IntMap`'s `UPLUS` throws `KeyOverlap` on any shared key in either order, so every `IntMap` comprehension and map expression with a repeated key throws.** `NodeIM`'s `UPLUS` with a `SingletonIM` is `self.addNew(other)` (`Library/IntMap.fss:520`), the line two many-entry maps also reach through `nodeNode`, and `fromCC` builds every comprehension by `UPLUS` (`:727-730`). A key repeated with the same value throws too, as in `Map`'s comprehension (`Library/Map.fss:161-168`); the specification names only a different value (`basic/expressions/comprehensions.tex`, "Comprehensions"). Gated by `tests/IntMapUplusSingleton`, `IntMapUplusManyEntry` and `IntMapComprehensionRepeatedKey`. Detail: `compile-ladder/rung-library-factories/REPORT.md` sections 1 and 6.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-230 **`IntMap`'s `UPLUS` throws `KeyOverlap` on any shared key in either order, so every `IntMap` comprehension and map expression with a repeated key throws.** `NodeIM`'s `UPLUS` with a `SingletonIM` is `self.addNew(other)` (`Library/IntMap.fss:520`), the line two many-entry maps also reach through `nodeNode`, and `fromCC` builds every comprehension by `UPLUS` (`:727-730`). A key repeated with the same value throws too, as in `Map`'s comprehension (`Library/Map.fss:161-168`); the specification names only a different value (`basic/expressions/comprehensions.tex`, "Comprehensions"). Gated by `tests/IntMapUplusSingleton`, `IntMapUplusManyEntry` and `IntMapComprehensionRepeatedKey`. Detail: `compile-ladder/rung-library-factories/REPORT.md` sections 1 and 6.
~~~~

Sentences added since: 0 of 5, 0 chars.



### F-242 (group B): born 595 chars, now 1056, section "The checker and the one library"

Added by `7a58250bfe`, 2026-10-16, message: "FACTS and POSITIONS after climb batch 16's landing and the probes of 2026-10-16"

Text in that commit:

~~~~
- F-242 **`SUM`'s fusion pairs with `MAX` and `MIN` hold six sites of the distance: four unmet bounds, which a method `where` condition clears, and two results only the team's generic `distribute` over its own `K` clears.** The two are `distribute` overloads answering a pair over `Maybe[\T\]` where the inherited one answers one over `T`, refused by the return-type rule (F-75). With both, 49 falls to 42; the team's literal `PossibleReductionPair[\R\]` only moves the two. Row 433. Detail: `perf-probes/where-clauses/REPORT.md` A.1; `perf-probes/generic-distribute/REPORT.md` sections 3 and 4.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-242 **`SUM`'s fusion pairs with `MAX` and `MIN` hold no site of the distance: a `where` condition on each of `SumReduction`'s two `distribute` overloads clears their four unmet bounds, and `ActualReduction`'s generic `distribute`, which `SumReduction` inherits, with its result over its own `K`, clears their two return-type errors.** The fusion pairs are `MaxSumReductionPair`, `MinSumReductionPair` and those two overloads, through which the team's `Generator2` computes the maximum or the minimum of sums in one pass. The two errors were at the two overloads, which answer a pair over `Maybe[\T\]` beside the inherited `distribute`. With the inherited one answering `PossibleReductionPair[\K\]`, they pass the return-type rule (F-75). The team's commented text, which answers `PossibleReductionPair[\R\]`, only moves the two errors to the generic. The fusion stays (P-151). Row 433, fixed; F-250 gives the landing and its test. Detail: `perf-probes/where-clauses/REPORT.md` A.1 and A.2.1; `perf-probes/generic-distribute/REPORT.md` sections 3 and 4.
~~~~

Sentences added since: 8 of 8, 1041 chars.

- (330 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: **`SUM`'s fusion pairs with `MAX` and `MIN` hold no site of the distance: a `where` condition on each of `SumReduction`'s two `distribute` overloads clears their four unmet bounds, and `ActualReduction`'s generic `distribute`, which `SumReduction` inherits, with its result over its own `K`, clears their two return-type errors.**
- (185 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: The fusion pairs are `MaxSumReductionPair`, `MinSumReductionPair` and those two overloads, through which the team's `Generator2` computes the maximum or the minimum of sums in one pass.
- (114 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: The two errors were at the two overloads, which answer a pair over `Maybe[\T\]` beside the inherited `distribute`.
- (101 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: With the inherited one answering `PossibleReductionPair[\K\]`, they pass the return-type rule (F-75).
- (112 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: The team's commented text, which answers `PossibleReductionPair[\R\]`, only moves the two errors to the generic.
- (25 chars) `7fd287cec1` 2026-10-17 "FACTS: climb batch 17's landing review routed, 13 entries rewritten"
  - text: The fusion stays (P-151).
- (53 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: Row 433, fixed; F-250 gives the landing and its test.
- (121 chars) `0ae072be72` 2026-10-22 "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"
  - text: Detail: `perf-probes/where-clauses/REPORT.md` A.1 and A.2.1; `perf-probes/generic-distribute/REPORT.md` sections 3 and 4.

### F-254 (group B): born 929 chars, now 1099, section "The checker and the one library"

Added by `091ec54dfd`, 2026-10-17, message: "The compiled checker takes a left-out return type from the api declaration of the function's own par"

Text in that commit:

~~~~
- F-254 **A function or method that leaves out its return type takes it from the exported api's declaration of its own parameter types.** `ApiTypeExtractor.isExported` compares parameter types as the export check does (`ExportChecker.equalTypes`) and takes the one api declaration of the name that has the function's; a parameter the function leaves untyped matches any. With none or several, it takes none, and the declaration keeps its elisions (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ApiTypeExtractor.scala:77-126`, `:193-209`). So no output of the count or distance stage is known to move with the JVM's identity-hash order any more: `Library/FortressLibrary.fss:130` is out of both, and the JFR-instrumented runs of both stages print the plain runs' tables. Tests: `OmittedReturnTypeFromApi`, `OmittedMethodReturnTypeFromApi`. Detail: `compile-ladder/rung-checker-four-rows/REPORT.md`, sections 1 and 5.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-254 **In the compiled checker, a function or method that leaves out its return type takes it from the one declaration of the exported api whose parameter types are the function's own.** `ApiTypeExtractor` compares the parameter types as the export check does (`ExportChecker.equalTypes`), and a parameter that the function leaves untyped matches any type. It takes the return type only if exactly one api declaration of the name matches. With none or several, it takes none, and the declaration is left as written. So the choice does not depend on the JVM's identity-hash order of the declarations, and no output of the count or distance stage is known to move with that order (F-232): the error at `Library/FortressLibrary.fss:131` (`BIG LEXICO`'s omitted return type), which came and went with that order, is gone from both stages. Evidence: read in `scala_src/typechecker/ApiTypeExtractor.scala:77-126` and `:193-209`. Tests: `compiler_tests/OmittedReturnTypeFromApi`, `OmittedMethodReturnTypeFromApi`. Detail: `explorations/compile-ladder/rung-checker-four-rows/REPORT.md`, sections 1 and 5.
~~~~

Sentences added since: 8 of 8, 1084 chars.

- (181 chars) `16bbe6072d` 2026-10-22 "FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held)"
  - text: **In the compiled checker, a function or method that leaves out its return type takes it from the one declaration of the exported api whose parameter types are the function's own.**
- (169 chars) `16bbe6072d` 2026-10-22 "FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held)"
  - text: `ApiTypeExtractor` compares the parameter types as the export check does (`ExportChecker.equalTypes`), and a parameter that the function leaves untyped matches any type.
- (81 chars) `16bbe6072d` 2026-10-22 "FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held)"
  - text: It takes the return type only if exactly one api declaration of the name matches.
- (76 chars) `16bbe6072d` 2026-10-22 "FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held)"
  - text: With none or several, it takes none, and the declaration is left as written.
- (318 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: So the choice does not depend on the JVM's identity-hash order of the declarations, and no output of the count or distance stage is known to move with that order (F-232): the error at `Library/FortressLibrary.fss:131` (`BIG LEXICO`'s omitted return type), which came and went with that order, is gone from both stages.
- (87 chars) `16bbe6072d` 2026-10-22 "FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held)"
  - text: Evidence: read in `scala_src/typechecker/ApiTypeExtractor.scala:77-126` and `:193-209`.
- (83 chars) `16bbe6072d` 2026-10-22 "FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held)"
  - text: Tests: `compiler_tests/OmittedReturnTypeFromApi`, `OmittedMethodReturnTypeFromApi`.
- (89 chars) `16bbe6072d` 2026-10-22 "FACTS: clarity chunks f9 to f12 applied as judged (f10 before f9 for F-203; three entries held)"
  - text: Detail: `explorations/compile-ladder/rung-checker-four-rows/REPORT.md`, sections 1 and 5.

### F-265 (group B): born 1269 chars, now 1269, section "The checker and the one library"

Added by `0ae072be72`, 2026-10-22, message: "FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259)"

Text in that commit:

~~~~
- F-265 **No static parameter of the interpreter's library is bounded by `Object`, so no library declaration meets walk's stop on that bound: under walk, an argument whose type is a tuple, `()` or an arrow, at a parameter whose type is a type variable bounded by `Object`, stops the program with an `InterpreterBug`, not a type error (row 471, open).** The stop needs a bound written `Object`, since walk installs a written bound before it unifies the arguments (row 471). The library's result-only parameters are unbounded, as P-48 decides (F-84). Six functions of `FortressLibrary` write the bound `extends Any`, which admits tuples, `()` and arrows: `cast`, `instanceOf`, `identity`, `shared`, `localize` and `copy` (`Library/FortressLibrary.fss:33-72`; its api declares the first five so, and holds `copy` in a comment). The specification's examples and the compiler tests write `extends Object` (`SpecData/examples/basic/Fun.Decl.fss:19`, `ProjectFortress/other_compiler_tests/Go1a.fss:15`). Row 471 has no test. Evidence: `git grep -nE '\[\\[^\\]*extends +Object' -- Library ProjectFortress/LibraryBuiltin` prints nothing; walk's stop is from the probe that row 471 records, no longer in the tree. Detail: `compile-ladder/rung-result-bounds/REPORT.md` section 10.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-265 **No static parameter of the interpreter's library is bounded by `Object`, so no library declaration meets walk's stop on that bound: under walk, an argument whose type is a tuple, `()` or an arrow, at a parameter whose type is a type variable bounded by `Object`, stops the program with an `InterpreterBug`, not a type error (row 471, open).** The stop needs a bound written `Object`, since walk installs a written bound before it unifies the arguments (row 471). The library's result-only parameters are unbounded, as P-48 decides (F-84). Six functions of `FortressLibrary` write the bound `extends Any`, which admits tuples, `()` and arrows: `cast`, `instanceOf`, `identity`, `shared`, `localize` and `copy` (`Library/FortressLibrary.fss:33-72`; its api declares the first five so, and holds `copy` in a comment). The specification's examples and the compiler tests write `extends Object` (`SpecData/examples/basic/Fun.Decl.fss:19`, `ProjectFortress/other_compiler_tests/Go1a.fss:15`). Row 471 has no test. Evidence: `git grep -nE '\[\\[^\\]*extends +Object' -- Library ProjectFortress/LibraryBuiltin` prints nothing; walk's stop is from the probe that row 471 records, no longer in the tree. Detail: `compile-ladder/rung-result-bounds/REPORT.md` section 10.
~~~~

Sentences added since: 0 of 8, 0 chars.



### F-275 (group B): born 1811 chars, now 1811, section "Landed semantics"

Added by `e06bd068e7`, 2026-10-22, message: "FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comment cleared "

Text in that commit:

~~~~
- F-275 **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own and one lies inside the other, the load check reads the Return Type Rule at one instance of the outer one, and refuses the pair unless that instance stands for every instance that applies.** The instance is the one that walk's inference finds for the outer one at the inner one's parameter types. A check at that instance alone would load pairs that the rule refuses, since an argument of the inner one can select a smaller instance of the outer one. The instance stands for every applicable instance in two cases. In the first, each static parameter that the outer one's return type names is fixed by a static argument of one of its parameter types. In the second, the outer one returns one of its own type parameters, and the inner one meets one of two conditions. Either it returns a type parameter of its own that is the whole type of at least one of its parameters and appears in no other parameter type than those at positions where the outer one's parameter type is that returned type parameter; or, at such a position, it has an object type below which its return type lies. Otherwise walk refuses the pair, "fails the Return Type Rule" (F-257). With `trait Shape`, `trait Round extends Shape` and `object Circle extends Round`, it refuses `f[\T extends Shape\](x: T, y: T): T` beside `f[\U extends Round\](x: U, y: Round): Round`, and `f[\T extends Shape\](x: T): Box[\T\]` beside `f[\U extends Round\](x: U): Box[\U\]`; the compiled checker refuses both too. Gated by `tests/GenericReturnRuleOuterParamWalk` and `GenericReturnRuleInvariantWalk` (refused) and `GenericReturnRuleHoldsWalk` (load and dispatch). Detail: `compile-ladder/rung-walk-generic-pairs/SKEPTIC.md` section 2.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-275 **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own and one lies inside the other, the load check reads the Return Type Rule at one instance of the outer one, and refuses the pair unless that instance stands for every instance that applies.** The instance is the one that walk's inference finds for the outer one at the inner one's parameter types. A check at that instance alone would load pairs that the rule refuses, since an argument of the inner one can select a smaller instance of the outer one. The instance stands for every applicable instance in two cases. In the first, each static parameter that the outer one's return type names is fixed by a static argument of one of its parameter types. In the second, the outer one returns one of its own type parameters, and the inner one meets one of two conditions. Either it returns a type parameter of its own that is the whole type of at least one of its parameters and appears in no other parameter type than those at positions where the outer one's parameter type is that returned type parameter; or, at such a position, it has an object type below which its return type lies. Otherwise walk refuses the pair, "fails the Return Type Rule" (F-257). With `trait Shape`, `trait Round extends Shape` and `object Circle extends Round`, it refuses `f[\T extends Shape\](x: T, y: T): T` beside `f[\U extends Round\](x: U, y: Round): Round`, and `f[\T extends Shape\](x: T): Box[\T\]` beside `f[\U extends Round\](x: U): Box[\U\]`; the compiled checker refuses both too. Gated by `tests/GenericReturnRuleOuterParamWalk` and `GenericReturnRuleInvariantWalk` (refused) and `GenericReturnRuleHoldsWalk` (load and dispatch). Detail: `compile-ladder/rung-walk-generic-pairs/SKEPTIC.md` section 2.
~~~~

Sentences added since: 0 of 11, 0 chars.



### F-285 (group B): born 1622 chars, now 1683, section "The checker and the one library"

Added by `bd00ad997d`, 2026-10-24, message: "Row 731's three library sites write their static argument, and __bigOperator2's fused arm casts its "

Text in that commit:

~~~~
- F-285 **The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.** The library follows P-78's workaround for row 731: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4396`, `:4402`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2554`, `:2933`, `:2938`, `SUM[\ZZ32\]` at `:4580`, `:4596`, and the team's `transpose` (`List.fss:504`). The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The fused arm (`:1476`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2574`). So the distance holds no site of rows 731 and 632, while row 731's checker gap stays for user programs and the team demos. Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`, where it answered a list of its elements' run-time class; `PureList`'s, at `Library/PureList.fss:73`, still does (row 824). Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/XXXPureListStridedSubscriptWalk`. Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7 and 9.
~~~~

Text at `9de4c69bc8`:

~~~~
- F-285 **The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the twelve components the distance checks; `__bigOperator2`'s fused arm casts its result to `O0`.** It follows P-78: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4665`, `:4671`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2804`, `:3190`, `:3195`, `SUM[\ZZ32\]` at `:4849`, `:4866`, and the team's `transpose` (`List.fss:504`). The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The fused arm (`:1670`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2824`). So the distance holds no site of an unwritten argument or of the fused arm. The checker now infers such an unwritten argument itself (F-364); the library's sites stay written. Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`; `PureList`'s, at `Library/PureList.fss:73`, answers a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824). Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/PureListStridedSubscriptWalk`. Detail: `compile-ladder/rung-body-arguments/REPORT.md`, sections 3, 5, 7 and 9.
~~~~

Sentences added since: 6 of 9, 1139 chars.

- (331 chars) `b95570a644` 2026-11-17 "Record: FACTS and POSITIONS in line with climb batch 31b's landing, run 2 of climb batch 31"
  - text: It follows P-78: `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond` (`Library/FortressLibrary.fss:4665`, `:4671`), and `<|[\E\] self[i] | i <- r |>` in `List`'s range subscript (`Library/List.fss:151`), beside `SUM[\T\]` at `:2804`, `:3190`, `:3195`, `SUM[\ZZ32\]` at `:4849`, `:4866`, and the team's `transpose` (`List.fss:504`).
- (166 chars) `b95570a644` 2026-11-17 "Record: FACTS and POSITIONS in line with climb batch 31b's landing, run 2 of climb batch 31"
  - text: The fused arm (`:1670`) uses the library's cast device for an arm whose type the `typecase` cannot show (F-264), as `__builtinFactory1`'s `N[\0\]` arm does (`:2824`).
- (75 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: So the distance holds no site of an unwritten argument or of the fused arm.
- (99 chars) `9683fef678` 2026-11-16 "Record: FACTS and POSITIONS in line with climb batch 32's landing"
  - text: The checker now infers such an unwritten argument itself (F-364); the library's sites stay written.
- (261 chars) `2db5619187` 2026-11-09 "Record landing of climb batch 29: FACTS, POSITIONS and the ledger brought in line with the landing"
  - text: Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`; `PureList`'s, at `Library/PureList.fss:73`, answers a list of objects at their elements' run-time types, and a list of `ZZ32` or `String` at its element type (row 824).
- (207 chars) `12292add28` 2026-11-09 "Read a number or string value at its trait in walk's inference and messages"
  - text: Tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0); `tests/WrittenReductionArgumentsWalk`; `tests/NestedReductionFusion`; `tests/PureListStridedSubscriptWalk`.
## 5. FACTS-history.md at `9de4c69bc8`

Blocks (`### F-n` headings): 1783; entries with at least one block: 385. Kind of change = the second field of the provenance line, fields split on " · " (line form: `date · kind · from ... · commit ... · by ...`).

| kind | blocks |
|---|---|
| rewritten | 1324 |
| numbered | 195 |
| added | 190 |
| removed | 27 |
| noted | 11 |
| merged into F-12 | 3 |
| merged into F-263 | 2 |
| merged into F-34 | 1 |
| F-33 merged in, rewritten | 1 |
| merged into F-125 | 1 |
| F-127 merged in, rewritten | 1 |
| merged into F-152 | 1 |
| F-153 merged in, rewritten | 1 |
| merged into F-163 | 1 |
| F-164 merged in, rewritten | 1 |
| merged into F-7 | 1 |
| F-8 merged in, rewritten | 1 |
| merged into F-11 | 1 |
| F-10 merged in, rewritten | 1 |
| F-13 merged in, F-14 merged in, F-15 merged in, rewritten | 1 |
| merged into F-100 | 1 |
| F-16 merged in, rewritten | 1 |
| merged into F-103 | 1 |
| F-110 merged in, rewritten | 1 |
| moved to "The harness and the gate", rewritten | 1 |
| merged into F-145 | 1 |
| F-224 merged in, rewritten | 1 |
| merged into F-264 | 1 |
| F-260 merged in, rewritten | 1 |
| F-241 merged in, F-247 merged in, rewritten | 1 |
| merged into F-259 | 1 |
| F-246 merged in | 1 |
| merged into F-252 | 1 |
| F-238 merged in, rewritten | 1 |
| merged into F-366 | 1 |
| F-346 merged in | 1 |
| merged into F-379 | 1 |
| F-360 merged in, rewritten | 1 |
| total | 1783 |

Same, with the merge and move kinds grouped (rule: kind starts "merged into" -> merged into another entry; kind contains "merged in" -> another entry merged in; starts "moved to" -> moved):

| kind | blocks |
|---|---|
| rewritten | 1324 |
| numbered | 195 |
| added | 190 |
| removed | 27 |
| merged into another entry | 19 |
| another entry merged in (with rewritten) | 16 |
| noted | 11 |
| moved to a section (with rewritten) | 1 |

### The 24 entries of points 3 and 4

| entry | group | blocks | kinds (count) | first block | last block |
|---|---|---|---|---|---|
| F-180 | 3A | 8 | rewritten 7, numbered 1 | 2026-10-13 17:58Z | 2026-11-18 06:23Z |
| F-19 | 3A | 5 | rewritten 4, numbered 1 | 2026-10-13 17:58Z | 2026-11-10 13:49Z |
| F-58 | 3A | 13 | rewritten 12, numbered 1 | 2026-10-13 17:58Z | 2026-11-16 07:45Z |
| F-174 | 3A | 4 | rewritten 3, numbered 1 | 2026-10-13 17:58Z | 2026-11-17 07:11Z |
| F-75 | 3A | 8 | rewritten 7, numbered 1 | 2026-10-13 17:58Z | 2026-11-17 11:49Z |
| F-26 | 3A | 6 | rewritten 5, numbered 1 | 2026-10-13 17:58Z | 2026-11-24 05:38Z |
| F-22 | 3B | 3 | rewritten 2, numbered 1 | 2026-10-13 17:58Z | 2026-10-22 12:03Z |
| F-35 | 3B | 15 | rewritten 14, numbered 1 | 2026-10-13 17:58Z | 2026-11-17 10:04Z |
| F-45 | 3B | 3 | rewritten 2, numbered 1 | 2026-10-13 17:58Z | 2026-10-22 12:03Z |
| F-55 | 3B | 7 | rewritten 6, numbered 1 | 2026-10-13 17:58Z | 2026-11-09 07:14Z |
| F-65 | 3B | 4 | rewritten 3, numbered 1 | 2026-10-13 17:58Z | 2026-10-23 19:46Z |
| F-85 | 3B | 10 | rewritten 9, numbered 1 | 2026-10-13 17:58Z | 2026-11-17 10:04Z |
| F-252 | 4A | 11 | rewritten 9, added 1, F-238 merged in, rewritten 1 | 2026-10-17 17:40Z | 2026-11-17 07:11Z |
| F-299 | 4A | 23 | rewritten 22, added 1 | 2026-10-30 05:58Z | 2026-11-17 11:49Z |
| F-377 | 4A | 7 | rewritten 6, added 1 | 2026-11-17 02:54Z | 2026-11-24 05:41Z |
| F-225 | 4A | 15 | rewritten 14, added 1 | 2026-10-14 04:47Z | 2026-11-24 05:41Z |
| F-341 | 4A | 10 | rewritten 9, added 1 | 2026-11-09 07:05Z | 2026-11-24 05:38Z |
| F-366 | 4A | 7 | rewritten 5, added 1, F-346 merged in 1 | 2026-11-16 04:32Z | 2026-11-23 16:08Z |
| F-230 | 4B | 1 | added 1 | 2026-10-14 15:02Z | 2026-10-14 15:02Z |
| F-242 | 4B | 3 | rewritten 2, added 1 | 2026-10-16 19:13Z | 2026-10-22 11:56Z |
| F-254 | 4B | 3 | rewritten 2, added 1 | 2026-10-17 17:45Z | 2026-11-16 06:44Z |
| F-265 | 4B | 1 | added 1 | 2026-10-22 11:56Z | 2026-10-22 11:56Z |
| F-275 | 4B | 1 | added 1 | 2026-10-22 12:13Z | 2026-10-22 12:13Z |
| F-285 | 4B | 10 | rewritten 9, added 1 | 2026-10-24 03:41Z | 2026-11-17 11:49Z |

Sum over the 24 entries: 178 blocks: rewritten 152, numbered 12, added 12, F-238 merged in, rewritten 1, F-346 merged in 1.

Blocks per entry over the whole file: 
(entries of `9de4c69bc8`, zeros included) min 1, Q1 3.0, median 4, Q3 6.0, max 46.

Provenance lines of the 24 entries, in order (first 260 characters each), for the record of what each block names:

**F-180** (3A)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 180 of FACTS.md at that commit; former titles: "`import java` works on the interpreter path through `ForeignComponentWrapper` + `ClosureMaker`, as `map/modules-and-phases.md:451` (B.
- 2026-10-13 18:57Z · rewritten · from `explorations/perf-probes/prelude/natives-shape.md`, "1. The shape probe" · from `explorations/perf-probes/prelude/natives-binding-probe.md`, "1. Way 1's compiled half" · from `explorations/perf-probes/prelude/natives-bindi
- 2026-10-22 12:13Z · rewritten · by the clarity pass: reworded (consolidation-2026-10-22/evidence/facts/f16/proposals.md, "F-180"); the two halves named, and P-58's way marked not built; the raise's patch named by its file, the sixth of six (natives-shape.md se
- 2026-10-30 05:42Z · rewritten · from `explorations/compile-ladder/rung-natives-compiled/SKEPTIC.md`, "My programs, old against new" · by climb batch 23's gather: rung C's record, its sentences made false: the compiled half built, and gap 1 closed for walk by t
- 2026-10-30 05:58Z · rewritten · from `explorations/compile-ladder/rung-natives-walk/REPORT.md`, "Sentences made false" · by climb batch 23's gather: rung W's record, its sentences made false: walk's half built, its raise translation for a builtinPrimitive help
- 2026-11-08 10:30Z · rewritten · from `explorations/reviews/batch-28-review.md`, "Findings" · commit `f56d6516c` · by climb batch 28 landing workflow (Opus): re-anchored (finding C), read at d3cd65a81: the walk-world branch of the three-argument fortressTypeFor
- 2026-11-10 02:26Z · rewritten · from `explorations/reviews/batch-29b-review.md`, "Findings" · commit `a2be3e9e1` · by climb batch 29b landing workflow (Opus): correction B of the review: the example CompilerBuiltin$IntLiteral names a class that 9af764850d dele
- 2026-11-18 06:23Z · rewritten · by the merged-diff review of climb batch 33b: climb batch 33b's merged-diff review: a line citation that climb batch 33b's hunks moved, re-anchored by content

**F-19** (3A)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 19 of FACTS.md at that commit; earlier texts in its FACTS-history.md, line 2824
- 2026-10-13 19:03Z · rewritten · commit `8ab10d9de` · by consolidation chunk F1: a bold title added, from the entry's own opening words. Row 265, a race of the APL experiment's frame stack under this parallelism, left to the ledger; the pool to the fortress-rep
- 2026-11-05 15:26Z · rewritten · by the coordinator's record worker: review-queue item 250 of 40826f355, the coordinator's work of 2026-11-05 (coordinator-work-2026-11-05.md): the clarity pass's text (consolidation-2026-10-22/evidence/facts/f1/proposals.apply) 
- 2026-11-10 11:40Z · rewritten · from `explorations/compile-ladder/rung-forked-arguments/REPORT.md`, "What changed and why" · by climb batch 30's gather: a call's arguments fork on the compiled path, and the parallel range stops at a grain (climb batch 30, rung
- 2026-11-10 13:49Z · rewritten · from `explorations/compile-ladder/rung-forked-arguments/REPORT.md`, "What changed and why" · from `explorations/compile-ladder/rung-forked-arguments/REPORT.md`, "Points to report reached" · commit `d89fc0fda` · by climb batch 30

**F-58** (3A)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 58 of FACTS.md at that commit; former titles: "MicroGPT's own programs through the compiled checker against the one library: 46 and 53 errors, none a numeral, the model's unsized arr
- 2026-10-13 18:16Z · rewritten · from `explorations/reviews/array-design-ways.md`, "2. Question 1, decision D: the model's own sized types" · from `explorations/reviews/numerics-plan-fable.md`, "3.6 What stops microGPT itself, measured" · from `explorations/rev
- 2026-10-20 08:40Z · rewritten · from `explorations/compile-ladder/rung-array-sites/REPORT.md`, "7. What the specification settles, and the sentences made false" · by climb batch 20's gather: rung A's skeptic's leftForGather: the sentence made false by rung A
- 2026-10-22 12:03Z · rewritten · by the clarity pass: scoped to its measurement (consolidation-2026-10-22/evidence/facts/f4/proposals.md, "F-58"); the title bounded; "gone since climb batch 20's rung A" made a reading from F-35 (rung-array-sites/REPORT.md secti
- 2026-10-22 12:37Z · rewritten · by the scrape: status and planning references deleted, at the curator's word of 2026-10-22
- 2026-10-23 23:34Z · rewritten · from `explorations/compile-ladder/rung-export-align/REPORT.md`, "6. The declarations that join or change in the api, and so in Part IV" · commit `031c38bbc` · by climb batch 21b's merged-diff review: the api lines it cites re-an
- 2026-10-24 03:37Z · rewritten · from `explorations/compile-ladder/rung-export-last/SKEPTIC.md`, "3. My programs, old against new" · by climb batch 22's gather: rung E's api writes RR64's power at the component's b:Number, which makes the entry's b:RR64 false, 
- 2026-11-09 11:00Z · rewritten · commit `7daf51fe8` · by climb batch 29 landing workflow (Opus): FortressLibrary.fsi:367-368 at b430f9f42 now :369-370, moved by 3de571bac7's hunks
- 2026-11-10 02:26Z · rewritten · from `explorations/reviews/batch-29b-review.md`, "Findings" · commit `a2be3e9e1` · by climb batch 29b landing workflow (Opus): a line citation re-anchored on the landed tree: RR64's two ^ declarations are at FortressLibrary.fsi:
- 2026-11-13 23:38Z · rewritten · from `explorations/compile-ladder/plan-31/probes/model-closure-check.md`, "1. The counts" · by record writer: the count on today's one library, 42 by the driver and 17 under the scratch compile command, replaces the 26 of an ear
- 2026-11-16 04:41Z · rewritten · from `explorations/compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" · by climb batch 32 gather: rows 988, 474 and 989 are closed by rungs D and N of climb batch 32; the counts are not measured again here
- 2026-11-16 06:44Z · rewritten · from `explorations/compile-ladder/rung-tuple-binding/REPORT.md`, "Programs run old against new" · from `explorations/reviews/batch-32-review.md`, "Corrections owed in the record" · commit `567c36dad` · by climb batch 32 landing 
- 2026-11-16 07:45Z · rewritten · from `explorations/compile-ladder/plan-32/probes/model-diffs.md`, "5. The counts for F-58, on the landed tree `c0c35b4f9e`" · commit `b7a00e569` · by record writer after climb batch 32: rewritten whole from the count on the land

**F-174** (3A)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 174 of FACTS.md at that commit; earlier texts in its FACTS-history.md, lines 1581, 1797, 2976
- 2026-10-13 18:57Z · rewritten · from `explorations/compile-ladder/rung-spec-overloading/decision-record.md`, "3. The model the text states (answer 9, POSITIONS 2026-09-26)" · from `explorations/compile-ladder/rung-spec-overloading/decision-record.md`, "4. The 
- 2026-10-22 12:13Z · rewritten · by the clarity pass: reworded (consolidation-2026-10-22/evidence/facts/f16/proposals.md, "F-174"); Appendix I's rows brought to its current text (changes.tex:2856-2879): row 159, fixed at 6d187d069 and no longer named there, dro
- 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the pass at climb batch 31's landing: row 542 fixed by rung X of climb batch 31, 

**F-75** (3A)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 75 of FACTS.md at that commit; earlier texts in its FACTS-history.md, lines 1551, 1657, 2661
- 2026-10-13 18:39Z · rewritten · from `explorations/compile-ladder/rung-return-type-rule/decision-record.md`, "1. The Return Type Rule over every instance" · from `explorations/compile-ladder/rung-return-type-rule/decision-record.md`, "2. The positional rule" ·
- 2026-10-17 19:33Z · rewritten · from `explorations/reviews/batch-17-review.md`, "6. Routing missing, by home" · commit `2b1cd8e63` · by coordinator: the generic distribute over K cleared distribute's two pairs, row 433 closed
- 2026-10-22 11:56Z · rewritten · by the clarity pass: rewritten (consolidation-2026-10-22/evidence/facts/f5/proposals.md, "F-75"); the handle "answer 9" dropped; the condition of equal counts of own static parameters, and the kinds and return type compared, fro
- 2026-10-22 12:37Z · rewritten · by the scrape: status and planning references deleted, at the curator's word of 2026-10-22
- 2026-11-17 02:52Z · rewritten · from `explorations/compile-ladder/rung-return-rule-object/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung X of climb batch 31: the rule at an object type, row 542 fixed, the tuple pair of row 1048
- 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · from `explorations/reviews/batch-31-review.md`, "What I did not do" · from `explorations/compile-ladder/rung-return-rule-object/REPORT
- 2026-11-17 11:49Z · rewritten · from `explorations/reviews/batch-31b-review.md`, "4. The gate, the count and the distance" · commit `00dd16a89` · by climb batch 31b landing workflow (Opus): the clause that the merge of the number types brings no refusal, bound

**F-26** (3A)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 26 of FACTS.md at that commit; earlier texts in its FACTS-history.md, lines 1531, 1610, 1875, 2845
- 2026-10-13 19:03Z · rewritten · from `explorations/compile-ladder/rung-walk-dispatch/REPORT.md`, "5.1 Dispatch on declared domains (answer 9; defect 1)" · commit `8f7e183d4` · by consolidation chunk F1: "so the order they are written in no longer decides" in t
- 2026-10-17 17:43Z · rewritten · from `explorations/compile-ladder/rung-walk-method-sargs/REPORT.md`, "7. What the specification settles" · by climb batch 17's gather: rung W's record, its corrections: a generic dotted method is now compared on its declared dom
- 2026-10-22 12:03Z · rewritten · by the clarity pass: scoped and reorganized (consolidation-2026-10-22/evidence/facts/f2/proposals.md, "F-26"); the title bounded to a declaration with static parameters of its own and to pairs where exactly one declared domain l
- 2026-11-23 21:55Z · rewritten · from `explorations/reviews/batch-35b-review.md`, "Findings for the record, with no decision of his changed" · commit `1caac80b3` · by climb batch 35b landing workflow (Opus): short since rung L of climb batch 35b (`5c31f2b68a`) 
- 2026-11-24 05:38Z · rewritten · from `explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why" · by gather of climb batch 36: rung G's record.md, folded

**F-22** (3B)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 22 of FACTS.md at that commit; earlier texts in its FACTS-history.md, lines 1095, 1598, 2833
- 2026-10-13 19:03Z · rewritten · from `explorations/compile-ladder/rung-export-var/REPORT.md`, "The measurement that separates them" · commit `4e4b80253` · by consolidation chunk F1: cut to the form. `Linker.whoIsImplementingMyAPI`'s fallback to the api's own n
- 2026-10-22 12:03Z · rewritten · by the clarity pass: reworded (consolidation-2026-10-22/evidence/facts/f1/proposals.md, "F-22"); the rung's comparison of functions and variables made the current property; "the repository" named as the linker's component reposi

**F-35** (3B)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 35 of FACTS.md at that commit; earlier texts in its FACTS-history.md, line 2540
- 2026-10-13 18:38Z · rewritten · from `explorations/perf-probes/nat/REPORT.md`, "2. The rules as built" · from `explorations/perf-probes/nat/REPORT.md`, "7. The export checker, and decision F question 2" · from `explorations/coordinator/CLIMB-BATCH-13.md`, "4. 
- 2026-10-20 05:38Z · rewritten · commit `32153798d` · by coordinator: the dead sizes' origin, read in git: 72ae6881b (2007-01-04) and 32153798d (2008-04-27), for the curator's question on ask 3
- 2026-10-20 08:40Z · rewritten · from `explorations/compile-ladder/rung-array-sites/REPORT.md`, "7. What the specification settles, and the sentences made false" · by climb batch 20's gather: rung A's skeptic's leftForGather: E3 built, 25 dead sizes to 8, the s
- 2026-10-20 12:51Z · rewritten · from `explorations/compile-ladder/climb-batch-20/RECORD.md`, "FACTS and POSITIONS left for the coordinator" · commit `e487cec2d` · by climb batch 20's routing: consolidated with F-264: the six operators' shape and their export e
- 2026-10-22 12:03Z · rewritten · by the clarity pass: reorganized (consolidation-2026-10-22/evidence/facts/f2/proposals.md, "F-35"); the 9 named from the report's section 2 and FortressLibrary.fsi:1214-1239, :1552, :1574, :1604, :1717, :1850-1852; the count cor
- 2026-10-22 12:37Z · rewritten · by the scrape: status and planning references deleted, at the curator's word of 2026-10-22
- 2026-10-23 17:27Z · rewritten · by climb batch 21's merged-diff review: line citations re-anchored to main's lines, which climb batch 21's hunks moved (S's and B's in the library, B's in TypeAnalyzer.scala, N's and B's in the specification)
- 2026-10-23 22:43Z · rewritten · from `explorations/compile-ladder/rung-export-align/REPORT.md`, "9. Sentences made false" · by climb batch 21b's gather: rung E's api lines move Rank1 from fsi:1225 to :1243 (its report, section 9)
- 2026-10-24 03:37Z · rewritten · by climb batch 22's gather: line citations re-anchored by symbol past climb batch 22 rung E's api and component lines (Library/FortressLibrary.fsi +1 after :125, +1 after :943, +2 at :1023, -1 at :1014, :1039, the arrays' four s
- 2026-11-08 10:30Z · rewritten · from `explorations/reviews/batch-28-review.md`, "Findings" · commit `f56d6516c` · by climb batch 28 landing workflow (Opus): re-anchored (finding C): Rank1's declaration, FortressLibrary.fsi:1245, is at :1355 at d3cd65a81
- 2026-11-09 11:00Z · rewritten · commit `7daf51fe8` · by climb batch 29 landing workflow (Opus): FortressLibrary.fsi:1355 at b430f9f42 now :1400, moved by 3de571bac7's Numeral declarations
- 2026-11-10 02:26Z · rewritten · from `explorations/reviews/batch-29b-review.md`, "Findings" · commit `a2be3e9e1` · by climb batch 29b landing workflow (Opus): a line citation that climb batch 29b's hunks moved, re-anchored (the review's correction B; PLAN.md:7
- 2026-11-16 06:44Z · rewritten · from `explorations/reviews/batch-32-review.md`, "Corrections owed in the record" · commit `567c36dad` · by climb batch 32 landing workflow (Opus): line citations repointed to the lines of the tree after the landing, which moved 
- 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

**F-45** (3B)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 45 of FACTS.md at that commit; earlier texts in its FACTS-history.md, lines 451, 601, 640, 701, 872, 973, 1157, 2510
- 2026-10-13 18:38Z · rewritten · from `explorations/reviews/mie-probes/scope-call-site-dispatch.md`, "3. The size, measured" · from `explorations/reviews/mie-probes/patents-forest-rule.md`, "1. The rule, verbatim and explained" · from `explorations/reviews/mie-
- 2026-10-22 12:03Z · rewritten · by the clarity pass: reorganized (consolidation-2026-10-22/evidence/facts/f3/proposals.md, "F-45"); the specialisation hole defined once, here, from patents-forest-rule.md section 3, and its run placed under a shadow checker wit

**F-55** (3B)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 55 of FACTS.md at that commit; earlier texts in its FACTS-history.md, line 2904
- 2026-10-13 18:16Z · rewritten · from `explorations/reviews/numerics-plan-coordinator/evidence-B.md`, "3.2 How a static argument is inferred [read, measured]" · from `explorations/reviews/numerics-plan-coordinator/evidence-B.md`, "3.4 Whether a coercion is cons
- 2026-10-14 04:41Z · rewritten · from `explorations/compile-ladder/rung-argument-context/REPORT.md`, "1. What changed, and why" · by climb batch 14 gather: rung A's record.md: the retry at another call's argument is built (row 455 fixed)
- 2026-10-14 06:09Z · rewritten · from `explorations/reviews/numerics-plan-coordinator/evidence-B.md`, "3.2 How a static argument is inferred [read, measured]" · by record pass after climb batch 14: the contexts of the expected type, another call's argument amon
- 2026-10-22 12:03Z · rewritten · by the clarity pass: reorganized as the summary across the two paths (consolidation-2026-10-22/evidence/facts/f4/proposals.md, "F-55"); F-73 and F-137 named for each path's rule; the detail repointed from reviews/numerics-plan-c
- 2026-10-30 01:25Z · rewritten · from `explorations/compile-ladder/rung-bound-any/REPORT.md`, "5. Programs run old against new" · by climb batch 22c's gather: rung B's record: the compile command's bound is Any
- 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather

**F-65** (3B)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 65 of FACTS.md at that commit; earlier texts in its FACTS-history.md, lines 753, 1226, 1627
- 2026-10-13 18:16Z · rewritten · from `explorations/compile-ladder/rung-analyzer-memo/REPORT.md`, "Why the memo changes no answer" · from `explorations/reviews/row-488-probe.md`, "The answer" · commit `2f105225a` · by consolidation chunk F2b: a bold title added
- 2026-10-22 11:56Z · rewritten · by the clarity pass: rewritten for a reader without the batch (consolidation-2026-10-22/evidence/facts/f5/proposals.md, "F-65"); the timing bounded to its one measurement on climb batch 7C's tree (reviews/row-488-probe.md, "The 
- 2026-10-23 19:46Z · rewritten · from `explorations/reviews/batch-21-review.md`, "2. The stages' times against batch 20's gate" · commit `c53063bbd` · by climb batch 21's routing: its copy of F-240's count-stage time (about 63 s) made a pointer to F-240, which 

**F-85** (3B)

- 2026-10-13 17:58Z · numbered · commit `a74f5a2b7` · by record-number.py: line 85 of FACTS.md at that commit; former titles: "The one library's generator, condition, reduction and generator-of-generators slips are repaired in the library's own spelling; the sit
- 2026-10-13 18:39Z · rewritten · from `explorations/compile-ladder/rung-generator-slips/REPORT.md`, "5. The repairs, each with its precedent and the way not taken" · from `explorations/compile-ladder/rung-generator-slips/REPORT.md`, "8. The sites left, each wit
- 2026-10-17 18:17Z · rewritten · from `explorations/compile-ladder/rung-library-distribute/SKEPTIC.md`, "7. The report and the record" · by climb batch 17 review: two of its three sites are gone with the identities cast and the typed embiggen; the batch record 
- 2026-10-22 11:56Z · rewritten · by the clarity pass: reorganized (consolidation-2026-10-22/evidence/facts/f6/proposals.md, "F-85"); the fused arm named as a typecase branch (rung-generator-slips/REPORT.md section 5; row 632); moved to F-250, which owns them: t
- 2026-10-24 03:41Z · rewritten · from `explorations/compile-ladder/rung-body-arguments/REPORT.md`, "12. Sentences made false" · by climb batch 22's gather: rung R's record, "Entries the gather changes": the fused branch's site becomes the cast at :1476
- 2026-11-08 10:30Z · rewritten · from `explorations/reviews/batch-28-review.md`, "Findings" · commit `f56d6516c` · by climb batch 28 landing workflow (Opus): re-anchored (finding C), read at d3cd65a81: the fused arm's cast[\O0\], FortressLibrary.fss:1476, at :1
- 2026-11-09 11:00Z · rewritten · commit `7daf51fe8` · by climb batch 29 landing workflow (Opus): FortressLibrary.fss:1581 at b430f9f42 now :1644, moved by 3de571bac7's hunks
- 2026-11-10 02:26Z · rewritten · from `explorations/reviews/batch-29b-review.md`, "Findings" · commit `a2be3e9e1` · by climb batch 29b landing workflow (Opus): a line citation that climb batch 29b's hunks moved, re-anchored (the review's correction B; PLAN.md:7
- 2026-11-16 06:44Z · rewritten · from `explorations/reviews/batch-32-review.md`, "Corrections owed in the record" · commit `567c36dad` · by climb batch 32 landing workflow (Opus): line citations repointed to the lines of the tree after the landing, which moved 
- 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)

**F-252** (4A)

- 2026-10-17 17:40Z · added · from `explorations/compile-ladder/rung-walk-generic-pairs/REPORT.md`, "1. What changed and why" · from `explorations/compile-ladder/rung-walk-generic-pairs/SKEPTIC.md`, "2. The fix: the Return Type Rule at one instance (a defect of 
- 2026-10-17 17:43Z · rewritten · from `explorations/compile-ladder/rung-walk-method-sargs/REPORT.md`, "7. What the specification settles" · by climb batch 17's gather: rung W's change, which lands after rung G's: a generic dotted method is compared on its decla
- 2026-10-17 19:33Z · rewritten · from `explorations/reviews/batch-17-review.md`, "6. Routing missing, by home" · commit `6d187d069` · by coordinator: the limit narrowed to the code, judge-review.3 of climb batch 17 (OverloadedFunction.java:2240-2241), F-26's wo
- 2026-10-18 04:56Z · rewritten · from `explorations/compile-ladder/climb-batch-18/RECORD.md`, "FACTS and POSITIONS left for the coordinator" · commit `5262a2412` · by climb batch 18's routing: walk's refusal now names the rule it breaks
- 2026-10-20 02:44Z · rewritten · from `explorations/compile-ladder/rung-existential-reduction/REPORT.md`, "8. Sentences made false" · by climb batch 19's gather: row 740's limit gone with rung P; its expected failure promoted
- 2026-10-20 03:11Z · rewritten · from `explorations/compile-ladder/rung-existential-reduction/SKEPTIC.md`, "5. Defects and their homes" · by climb batch 19 merged-diff review: the whole-type reading reads no where clause, row 787
- 2026-10-22 12:13Z · rewritten · by the clarity pass: reorganized (consolidation-2026-10-22/evidence/facts/f14/proposals.md, "F-252"); split into this entry, F-274 (equal declared domains, No Duplicates) and F-275 (the Return Type Rule at every instance), which
- 2026-11-05 15:26Z · F-238 merged in, rewritten · by the coordinator's record worker: review-queue items 256 and 260 of 40826f355, the coordinator's work of 2026-11-05 (coordinator-work-2026-11-05.md): F-238's withdrawal of an exclusion read at a symbolic insta
- 2026-11-05 21:35Z · rewritten · from `explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md`, "8. Sentences made false" · by climb batch 26 gather
- 2026-11-06 00:14Z · rewritten · from `explorations/compile-ladder/rung-walk-vector-scalar/REPORT.md`, "8. Sentences made false" · commit `a12ab5c60` · by climb batch 26 landing workflow (Opus): the pass on the gather's rewrite, for the entry past 600 character
- 2026-11-17 07:11Z · rewritten · from `explorations/compile-ladder/rung-walk-value-bound/REPORT.md`, "What changed and why" · from `explorations/compile-ladder/rung-walk-value-bound/REPORT.md`, "Programs run old against new" · commit `7858d0e97` · by climb batc

**F-299** (4A)

- 2026-10-30 05:58Z · added · from `explorations/compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why" · by climb batch 23's gather: rung W's record, its For FACTS entry, with the skeptic's narrowing for a method's self (row 847)
- 2026-10-31 15:12Z · rewritten · from `explorations/compile-ladder/rung-natives-float/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung F's 30
- 2026-10-31 15:15Z · rewritten · from `explorations/compile-ladder/rung-natives-choose/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: the count with rung K's two CHOOSE bindings; row 521 fixed by rung K
- 2026-10-31 15:16Z · rewritten · from `explorations/compile-ladder/rung-natives-integers/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung Z's 36
- 2026-10-31 15:16Z · rewritten · by climb batch 24 gather: a comma lost in the previous rewrite put back
- 2026-10-31 15:18Z · rewritten · from `explorations/compile-ladder/rung-natives-small/REPORT.md`, "Sentences made false" · by climb batch 24 gather: the count with rung S's eight
- 2026-10-31 15:19Z · rewritten · from `explorations/compile-ladder/rung-natives-self/REPORT.md`, "What changed and why" · by climb batch 24 gather: rung W record.md, FACTS: the row-847 sentence replaced by the check of self; row 847 fixed by rung W
- 2026-10-31 15:25Z · rewritten · from `explorations/compile-ladder/rung-natives-hard/REPORT.md`, "8. Sentences made false" · by climb batch 24 gather: the count with rung H's 76, the merged tree's
- 2026-10-31 17:09Z · rewritten · from `explorations/reviews/batch-24-review.md`, "Findings" · from `explorations/reviews/batch-24-review.md`, "Answered, stale or overlong in the record" · commit `25238e60c` · by climb batch 24's record writer (Opus): the pass o
- 2026-11-03 02:34Z · rewritten · from `explorations/compile-ladder/rung-natives-float-bits/REPORT.md`, "For FACTS" · by climb batch 25 gather
- 2026-11-03 02:36Z · rewritten · from `explorations/compile-ladder/rung-natives-rr32/REPORT.md`, "For FACTS" · by climb batch 25 gather
- 2026-11-03 02:38Z · rewritten · from `explorations/compile-ladder/rung-natives-asfloat/REPORT.md`, "What changed and why" · by climb batch 25 gather
- 2026-11-03 02:40Z · rewritten · from `explorations/compile-ladder/rung-natives-remainders/REPORT.md`, "What changed and why" · by climb batch 25 gather
- 2026-11-03 02:43Z · rewritten · from `explorations/compile-ladder/rung-natives-unsigned/REPORT.md`, "1. What changed and why" · by climb batch 25 gather
- 2026-11-03 02:45Z · rewritten · from `explorations/compile-ladder/rung-natives-divisors/REPORT.md`, "1. What changed and why" · by climb batch 25 gather
- 2026-11-05 21:41Z · rewritten · from `explorations/compile-ladder/rung-string-natives/REPORT.md`, "What changed and why" · by climb batch 26 gather
- 2026-11-05 22:24Z · rewritten · by climb batch 26 merged-diff review: The 288 by type made 306, the count the entry states after climb batch 26 rung T
- 2026-11-06 00:14Z · rewritten · from `explorations/reviews/batch-26-review.md`, "Where the text, the brief or the principles split" · from `explorations/compile-ladder/rung-string-natives/REPORT.md`, "What changed and why" · commit `a12ab5c60` · by climb batch
- 2026-11-07 15:12Z · rewritten · from `explorations/compile-ladder/climb-batch-27/RECORD.md`, "The count of the bindings" · from `explorations/compile-ladder/rung-natives-shift-power/REPORT.md`, "What changed and why" · from `explorations/compile-ladder/rung-na
- 2026-11-08 10:30Z · rewritten · from `explorations/compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings" · from `explorations/reviews/batch-28-review.md`, "6. The natives and the code generator after phase 4's sixth batch" · commit `f56d6516c` 
- 2026-11-09 07:05Z · rewritten · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "Sentences of the specification made false" · by climb batch 29 gather
- 2026-11-17 09:18Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "Sentences of the specification" · by climb batch 31b gather: rung O of climb batch 31b: the count is 373 of 401, by the objects' names (changes.tex's Effect)
- 2026-11-17 11:49Z · rewritten · from `explorations/compile-ladder/climb-batch-31b/RECORD.md`, "FACTS entries" · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · commit `00dd16a89` · by climb batch 31b landing workflow 

**F-377** (4A)

- 2026-11-17 02:54Z · added · from `explorations/compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung K of climb batch 31, folded from its record lines
- 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "2. The decisions that landed at a default" · from `explorations/reviews/batch-31-review.md`, "Part 4. Routing" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): th
- 2026-11-17 21:34Z · rewritten · from `explorations/compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why" · by climb batch 33 gather: rows 1051 and 1050 fixed by rung Q; the record's text
- 2026-11-18 00:16Z · rewritten · from `explorations/compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why" · from `explorations/reviews/batch-33-review.md`, "2. The decisions that landed at a default" · commit `d3747846c` · by climb batch 33
- 2026-11-18 15:26Z · rewritten · from `explorations/reviews/model-comparison/probe-2026-11-18.md`, "Point 2: a conditional whose arms are tuples that hold `self`" · commit `d0f94cc60` · by the coordinator (Opus): the probe of the blind pilot's two points: MINMA
- 2026-11-23 20:08Z · rewritten · from `explorations/compile-ladder/rung-compiled-missing-methods/REPORT.md`, "6. Sentences of the specification made false" · by climb batch 35b gather: rung M of climb batch 35b closes row 1053
- 2026-11-24 05:41Z · rewritten · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung K's record.md, folded

**F-225** (4A)

- 2026-10-14 04:47Z · added · from `explorations/compile-ladder/rung-self-type/REPORT.md`, "1. What changed and why" · by climb batch 14 gather: rung S's record.md, folded
- 2026-10-14 06:09Z · rewritten · from `explorations/compile-ladder/rung-self-type/REPORT.md`, "1. What changed and why" · from `explorations/compile-ladder/rung-self-type/REPORT.md`, "2. The tests: failing on the base, passing after" · from `explorations/compil
- 2026-10-22 11:56Z · rewritten · by the clarity pass: rewritten (consolidation-2026-10-22/evidence/facts/f7/proposals.md, "F-225"); the comprises condition restored, as the text of 2026-10-14 06:09Z had it (SelfParamDisambiguator.scala:77-83, :101-103); the 29 
- 2026-10-22 12:37Z · rewritten · by the scrape: status and planning references deleted, at the curator's word of 2026-10-22
- 2026-10-23 16:46Z · rewritten · from `explorations/compile-ladder/rung-self-type-exclusion/REPORT.md`, "8. Sentences made false" · by climb batch 21 gather: the exclusion test reads C[\X\] & X
- 2026-10-23 19:46Z · rewritten · from `explorations/compile-ladder/rung-self-type-exclusion/REPORT.md`, "1. What changed and why" · from `explorations/compile-ladder/rung-self-type-exclusion/REPORT.md`, "8. Sentences made false" · commit `64fa505c4` · by climb 
- 2026-10-23 22:46Z · rewritten · from `explorations/compile-ladder/rung-team-demos/REPORT.md`, "4. Row 710: the checker's driver on `trips.fss`, before and after" · by climb batch 21b's gather: the gather's grep: rung D repairs row 710's declaration, so it is n
- 2026-10-26 08:53Z · rewritten · from `explorations/reviews/foundations/prelude-lens.md`, "2.2 The changes where the prelude has a counterpart" · from `explorations/reviews/foundations/judgement.md`, "3. The prelude question: when a design of the compiler's pre
- 2026-11-17 02:54Z · rewritten · from `explorations/compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why" · by climb batch 31 gather: rung K of climb batch 31: the default body that returns self runs; rows 1050 and 1052 named
- 2026-11-17 03:30Z · rewritten · from `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The gather's own point" · by climb batch 31 merged-diff review: row 1051 named beside row 1050: the conditional arm at a self-type parameter still fails on the merged
- 2026-11-17 07:11Z · rewritten · from `explorations/compile-ladder/rung-comprises-cast/REPORT.md`, "What changed and why" · from `explorations/compile-ladder/climb-batch-31/RECORD.md`, "The gather's own point" · commit `7858d0e97` · by climb batch 31 landing wo
- 2026-11-17 21:34Z · rewritten · from `explorations/compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why" · by climb batch 33 gather: rows 1051, 1050 and 1052 fixed by rung Q; the record's text, the entry on the class loader named by number
- 2026-11-18 00:16Z · rewritten · from `explorations/compile-ladder/rung-self-arm-closure/REPORT.md`, "1. What changed and why" · from `explorations/reviews/batch-33-review.md`, "2. The decisions that landed at a default" · commit `d3747846c` · by climb batch 33
- 2026-11-20 20:48Z · rewritten · from `explorations/reviews/batch-34-review.md`, "Findings for the record, with no decision of his changed" · commit `285efad80` · by climb batch 34 landing workflow (Opus): brought in line with the tree at row 1094, opened by ru
- 2026-11-24 05:41Z · rewritten · from `explorations/compile-ladder/rung-checker-most-specific/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung K's record.md, folded

**F-341** (4A)

- 2026-11-09 07:05Z · added · from `explorations/compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why" · by climb batch 29 gather
- 2026-11-09 11:00Z · rewritten · from `explorations/reviews/batch-29-review.md`, "Where the text, the brief or the principles split" · commit `7daf51fe8` · by climb batch 29 landing workflow (Opus): the pass of climb batch 29's landing: the example '1/2 = 0.5 i
- 2026-11-10 00:31Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · by climb batch 29b's merged-diff review: made true of climb batch 29b's merged tree at 17e93a7da8, where the static numerals removed 
- 2026-11-10 02:26Z · rewritten · from `explorations/compile-ladder/rung-static-numerals/REPORT.md`, "1. What changed and why" · commit `a2be3e9e1` · by climb batch 29b landing workflow (Opus): the pass after climb batch 29b's landing: the batch moved here: a wa
- 2026-11-10 13:49Z · rewritten · from `explorations/compile-ladder/rung-numeral-leftovers/REPORT.md`, "1. What changed and why" · commit `d89fc0fda` · by climb batch 30 landing workflow (Opus): climb batch 30's landing left the entry stale. Rung N (f36a651243) 
- 2026-11-16 04:41Z · rewritten · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" · by climb batch 32 gather: row 973 is closed by rung N of climb batch 32
- 2026-11-16 06:44Z · rewritten · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" · commit `567c36dad` · by climb batch 32 landing workflow (Opus): the dispatch sentence and the sentence on h = 0.5 state the rul
- 2026-11-23 20:07Z · rewritten · from `explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md`, "What changed and why" · by climb batch 35b gather: rung L of climb batch 35b closes rows 1058 and 981 and opens rows 1122 and 1124
- 2026-11-24 05:35Z · rewritten · from `explorations/compile-ladder/rung-numeral-coercion-body/REPORT.md`, "What changed and why" · by gather of climb batch 36: rung N's record.md, folded
- 2026-11-24 05:38Z · rewritten · from `explorations/compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md`, "1. What changed and why" · by gather of climb batch 36: rung G's record.md, folded

**F-366** (4A)

- 2026-11-16 04:32Z · added · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "1. What changed and why" · by climb batch 32 gather
- 2026-11-16 04:33Z · F-346 merged in · from `explorations/compile-ladder/rung-numeral-most-specific/REPORT.md`, "2. The failing runs and the passing runs" · by climb batch 32 gather: F-346 stated that under walk u = 0 is false; rung N of climb batch 32 made it 
- 2026-11-16 06:44Z · rewritten · from `explorations/reviews/batch-32-review.md`, "Findings that would change a decision of the curator's" · commit `567c36dad` · by climb batch 32 landing workflow (Opus): the gather's draft of climb batch 32 read to the record's
- 2026-11-16 07:45Z · rewritten · by record writer after climb batch 32: The curator reviewed the choice of subtyping at 06:5x UTC on 2026-11-16 (coordinator/HELD.md, "Held in chat (2026-11-16)"). To point 2 of the coordinator's landing report, "A numeral leaves
- 2026-11-17 07:11Z · rewritten · from `explorations/reviews/batch-31-review.md`, "Corrections owed in the record" · commit `7858d0e97` · by climb batch 31 landing workflow (Opus): the line citation of OverloadedFunction.java moved by climb batch 31's landing, c
- 2026-11-17 09:20Z · rewritten · from `explorations/compile-ladder/rung-numeral-block-end/REPORT.md`, "Points to report" · by climb batch 31b gather: rung E of climb batch 31b: the compiled test of u = 0 at NN32, NN64 and RR32 against the prelude, rows 1059 and
- 2026-11-23 16:08Z · rewritten · commit `0a83a7049` · by climb batch 35 landing workflow (Opus): `numeralAttempt.flatMap(resolved(_, true)).orElse(resolved(es, false))` re-anchored from `:1117` to `:1143` at the landing: the gate repair of climb batch 35 (`b7b5

**F-230** (4B)

- 2026-10-14 15:02Z · added · from `explorations/compile-ladder/rung-library-factories/REPORT.md`, "1. What changed, and why" · by climb batch 15 gather

**F-242** (4B)

- 2026-10-16 19:13Z · added · from `explorations/perf-probes/where-clauses/REPORT.md`, "A.8 Decisions, defects, hand-overs (Part A)" · from `explorations/perf-probes/generic-distribute/REPORT.md`, "10. For FACTS" · by record worker after the where-clauses and ge
- 2026-10-17 19:33Z · rewritten · from `explorations/reviews/batch-17-review.md`, "6. Routing missing, by home" · commit `2b1cd8e63` · by coordinator: the six sites cleared by rung L's method condition and generic distribute, row 433 closed
- 2026-10-22 11:56Z · rewritten · by the clarity pass: rewritten for a reader without the probe (consolidation-2026-10-22/evidence/facts/f8/proposals.md, "F-242"); "their two results" said as the two return-type errors, at the overloads; "over its own K" said ag

**F-254** (4B)

- 2026-10-17 17:45Z · added · from `explorations/compile-ladder/rung-checker-four-rows/REPORT.md`, "1. What changed and why" · by climb batch 17's gather: rung C's record, its FACTS entry
- 2026-10-22 12:06Z · rewritten · by the clarity pass: rewritten for a reader without the batch (consolidation-2026-10-22/evidence/facts/f9/proposals.md, "F-254"); the compiled checker named in the title; the JFR-instrumented runs' equal tables left to REPORT.md
- 2026-11-16 06:44Z · rewritten · from `explorations/reviews/batch-32-review.md`, "Corrections owed in the record" · commit `567c36dad` · by climb batch 32 landing workflow (Opus): line citations repointed to the lines of the tree after the landing, which moved 

**F-265** (4B)

- 2026-10-22 11:56Z · added · by the clarity pass: split from F-70 (consolidation-2026-10-22/evidence/facts/f5/proposals.md, "F-70"), which held these claims beside the checker's check by call form; "six, cast among them" named as FortressLibrary's six functions

**F-275** (4B)

- 2026-10-22 12:13Z · added · from `explorations/compile-ladder/rung-walk-generic-pairs/SKEPTIC.md`, "2. The fix: the Return Type Rule at one instance (a defect of the change)" · by the clarity pass: split from F-252 (consolidation-2026-10-22/evidence/facts/f14/

**F-285** (4B)

- 2026-10-24 03:41Z · added · from `explorations/compile-ladder/rung-body-arguments/REPORT.md`, "16. For FACTS" · by climb batch 22's gather: rung R's record, "For FACTS", its lines re-anchored past rung E's line at Library/FortressLibrary.fss:2101 (4395, 4401, 
- 2026-10-30 01:32Z · rewritten · by climb batch 22c's gather: re-anchored by symbol past rung A's lines in Library/FortressLibrary.fss, by climb batch 22c's gather
- 2026-11-08 10:30Z · rewritten · from `explorations/reviews/batch-28-review.md`, "Findings" · commit `f56d6516c` · by climb batch 28 landing workflow (Opus): re-anchored (finding C), each FortressLibrary.fss line read at d3cd65a81: BIG MIN[\ZZ32\] :4410, :4416 
- 2026-11-09 07:14Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · by climb batch 29 gather
- 2026-11-09 11:00Z · rewritten · from `explorations/compile-ladder/rung-walk-language-types/REPORT.md`, "What changed and why" · commit `7daf51fe8` · by climb batch 29 landing workflow (Opus): the pass of climb batch 29's landing: 'PureList's ... still does (ro
- 2026-11-10 02:26Z · rewritten · from `explorations/reviews/batch-29b-review.md`, "Findings" · commit `a2be3e9e1` · by climb batch 29b landing workflow (Opus): line citations of Library/FortressLibrary.fss that climb batch 29b's hunks moved, re-anchored (the re
- 2026-11-16 04:41Z · rewritten · from `explorations/compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction" · by climb batch 32 gather: row 731 is closed by rung C of climb batch 32
- 2026-11-16 06:44Z · rewritten · from `explorations/reviews/batch-32-review.md`, "Corrections owed in the record" · commit `567c36dad` · by climb batch 32 landing workflow (Opus): rows 731 (d159b71975, rung C of climb batch 32) and 632 are FIXED and leave the b
- 2026-11-17 10:04Z · rewritten · by climb batch 31b merged-diff review: lines re-anchored by content after climb batch 31b's hunks (base eabcd484dd to 4fdabc2ae8)
- 2026-11-17 11:49Z · rewritten · from `explorations/compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" · commit `00dd16a89` · by climb batch 31b landing workflow (Opus): rung O of climb batch 31b moved seven more citations of `Library/Fortres


## 6. INDEX

Lines = `text.split("\n")` of `git show COMMIT:explorations/coordinator/INDEX.md`, the final empty piece after the last newline dropped; length in characters; quartiles by `statistics.quantiles(n=4, method="inclusive")`.

| commit | file chars | lines | non-empty lines | min | Q1 | median | Q3 | max | lines over 600 | lines over 1,500 |
|---|---|---|---|---|---|---|---|---|---|---|
| b67abe3d2 | 199766 | 411 | 407 | 31 | 289.0 | 418 | 650.5 | 1568 | 118 | 1 |
| 9de4c69bc8 | 392481 | 695 | 691 | 31 | 345.0 | 517 | 730.5 | 2576 | 269 | 8 |

(Quartiles and extremes are over the non-empty lines; the count of lines over 600 and 1,500 is the same over all lines.)

Five longest lines at `9de4c69bc8` (1-based line number, length, first 300 characters):

- line 536, 2576 chars: `- `explorations/coordinator/CLIMB-BATCH-27.md`: The record of climb batch 27, phase 4's fifth batch, by three Opus planning workers on 2026-11-06 and 2026-11-07, measured on the base build `/home/user/fortress-base27` at `551b02858` (climb batch 26's code, `a12ab5c60`): ten rungs, in the manifest's `
- line 625, 1680 chars: `- `explorations/reviews/batch-31b-review.md`: The combined post-batch review of climb batch 31, run 2, which the record calls climb batch 31b, of `coordinator/CLIMB-BATCH-31.md`: the method whose one parameter is a tuple, the merge of the five number types with their objects in the one library and w`
- line 628, 1655 chars: `- `explorations/reviews/batch-34-review.md`: The combined post-batch review of climb batch 34, run 1 of `coordinator/CLIMB-BATCH-34.md`: a generic method called on a receiver typed by a type variable, a call with a type assumption at some of its dispatched arguments, a local variable's binding kept `
- line 624, 1596 chars: `- `explorations/reviews/batch-31-review.md`: The combined post-batch review of climb batch 31, run 1 of `coordinator/CLIMB-BATCH-31.md`, four walls of the compiled path and the two repairs before the merge of the number types (six rungs, M, K, L, A, V and X, landed at `7858d0e97b` on 2026-11-17 on t`
- line 348, 1568 chars: `- `explorations/coordinator/CLIMB-BATCH-11.md`: The content of climb batch 11, drafted 2026-10-08 by a planning worker from batch 10's landed table and review and P1's judgement, with no manifest and no workflow mechanics since the batch workflow is being redesigned: the 253 by what each group waits`

Header comment at `b67abe3d2` (line 1):

~~~~
<!-- One line per standalone note under explorations/*.md and explorations/reviews/*.md, generated 2026-09-15 and kept by hand afterwards: the first sentence of each file's header comment or first paragraph. Search here before calling a fact absent. -->
~~~~

Header comment at `9de4c69bc8` (line 1):

~~~~
<!-- One line per standalone note under explorations/*.md and explorations/reviews/*.md, generated 2026-09-15 and kept by hand afterwards: the first sentence of each file's header comment or first paragraph. Search here before calling a fact absent. -->
~~~~

What the INDEX header comment says a line holds, quoted exactly (same at both commits): "One line per standalone note under explorations/*.md and explorations/reviews/*.md, generated 2026-09-15 and kept by hand afterwards: the first sentence of each file's header comment or first paragraph. Search here before calling a fact absent."

What `record.md`, "INDEX and the gap ledger", says (at `9de4c69bc8`, lines 112-115): "Give each new note under `explorations/` one line in INDEX, from its header comment's first sentence." and "Put a run's working files in an `evidence/` folder beside its results file: its briefs, chunks and checks, and the worker reports that the results draw on. Move them there with `git mv` once the results are judged. Only the results file gets an INDEX line. `check-index.sh` skips evidence folders. Do not add a folder's name to its list to let the folder pass." At `b67abe3d2` the section holds the first of these and, besides the ledger lines, not the evidence-folder line.
