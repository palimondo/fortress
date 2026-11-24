<!-- Whether the reports that FACTS entries cite already name the tests that the entries name, and in what form, measured by script over all 339 entries of FACTS.md at `23d4c2eed7` on 2026-11-24, as evidence for the curator's comments of 13:17 and 13:43 UTC. -->

# Test names in FACTS entries and in the reports they cite

Evidence only. It gives no recommendation.
FACTS.md was read at `23d4c2eed7`. It has 339 entries and 427,301 characters.
Every count below comes from the scripts named in "How the scripts count", unless it says otherwise.

## Summary

- 210 entries name at least one test. 10 entries say that no test checks the fact. 3 entries have a test sentence that names no test file. 116 entries have no test sentence.
- The test sentences take 32,123 characters, 7.5% of FACTS.
- Of the 210 entries that name tests, 49 have every test named in the cited section itself (class A). 97 have every test named in the cited report, but outside the cited section (class B). 58 have one or more tests that no cited report names (class C). 2 cite a section that does not exist in the report (class D). 4 cite no report (class E).
- If a test's earlier name counts, that is the same name with or without the `XXX` prefix, class C falls from 58 to 49 entries, and class A rises from 49 to 54.
- Where all the tests are named in the reports (147 entries), 128 entries have them in one leaf section, and 19 have them in two.
- The section that holds the tests has a median of 1,352 characters. The test sentence of the same entries has a median of 115 characters.
- 213 distinct reports are cited by entries that name tests. 80 of them already hold all their tests in one section with "test" in its heading.
- All 672 test names (603 distinct) match a file in the tree.

## How the scripts count

The scripts are scratch, kept in `/home/user/fortress/tmp/test-names-in-reports/`. They are not committed.

- `split.py` reads each line of FACTS that starts with `- F-`. It splits the line into sentences at a full stop followed by a space and a capital, a digit, a backtick or a quote. It does not split inside backticks or double quotes, or after "e.g.", "i.e.", "cf.", "vs.", "al." or "No.".
- `measure.py` classifies each entry and writes `out.json`.
- `analyze.py` prints the counts in this file into `analysis.txt`.
- `table.py` prints the list by entry.

Run them from the repository root: `python3 tmp/test-names-in-reports/measure.py > tmp/test-names-in-reports/out.json`, then `python3 tmp/test-names-in-reports/analyze.py`.

### The test sentence

A test sentence is a sentence, other than the title, that starts with one of these: "Gated", "Test:", "Tests:", "Tests ", "No test", "No gated test", "Plain tests gate", "The test that checks" or "The ties are gated".
Its size is its length in characters, plus one for the space before it.
An entry whose test sentence starts "No test" or "No gated test" and names no test says that no test checks the fact.

### A test name

The script reads only the backticked words of a test sentence.

- It drops a leading `ProjectFortress/`, a trailing `.fss`, `.test`, `.java` or `.sh`, and a trailing line range such as `:12-14`.
- A word of the form `FOLDER/NAME`, where FOLDER is a test folder, is a test name. It also sets the folder for the bare words after it in the same sentence. The test folders are `tests`, `compiler_tests`, `other_compiler_tests`, `one_library_tests`, `compiler_regressions`, `library_tests`, `parser_tests`, `linker_tests`, `syntax_abstraction_tests`, `test_library` and the `not_working_*` and `not_passing_yet` folders, all under `ProjectFortress/`.
- A bare word is a test name if it holds a capital and a small letter, is at least six characters long, and either matches a file of the current folder or of any test folder, or follows a folder word in the sentence and starts with a capital.
- A JUnit test is a class whose file under `ProjectFortress/src/` is named `*Test*.java` or `*JUTest*.scala`. A `Class.method` reference counts as its class.
- `*` in a name is a pattern. `<type>` in a name, as in F-24's `tests/<type>DivisionByZeroWalk.fss`, is read as `*`. A pattern matches every file stem of the folder that fits it.
- One Python test of a tool, `explorations/coordinator/tools/distance/test_classify.py`, counts as a test name.

### The cited reports and sections

The cited reports are read from the sentences that start "Detail:".

- Each backticked path that ends in `.md`, `.tex`, `.txt`, `.tsv` or `.tick` is a cited report. It is looked up at the repository root, then under `explorations/`, then beside the report cited just before it, which covers "its `SKEPTIC.md`".
- After each path, a quoted heading cites the section whose heading equals it, or else holds it. This is the rule of `facts-extract.sh 'doc:PATH#HEADING'`.
- "section 5", "sections 1, 3 and 5", "sections 1 to 3", "A.1", "B.1 to B.3" each cite the section whose heading starts with that number, "Part N" or "Section N".
- A path with no section after it cites the whole report.
- A section runs from its heading to the next heading of the same or a higher level, as in `facts-extract.sh`. A leaf section runs from its heading to the next heading of any level.
- Check: the sizes of four sections from the script matched `facts-extract.sh --check` within one character, which is the byte-against-character difference. The seven headings that the script did not find, `facts-extract.sh` did not find either.

### Named in a report

A test is named in a text if its name occurs as a whole word, not as part of a longer name. For example, `Foo` is not found inside `XXXFoo` or `FooBar`.
A pattern is named if the text holds the same pattern, or names every file that the pattern matches.
The alias count also accepts the name with its `XXX` prefix added or removed.

### The classes of point 2

These apply to an entry that names tests.

- **A**: every test is named in the cited sections, taken together.
- **B**: every test is named in the cited reports, and at least one is named only outside the cited sections.
- **C**: at least one test is named in none of the cited reports.
- **D**: a cited report or section does not exist.
- **E**: the entry cites no report.

The script reads all the reports cited by an entry together. If an entry cites three reports, each test needs to be named in only one of them.

## Point 1: entries and test sentences

| What the count counts | Count |
|---|---|
| Entries in FACTS | 339 |
| Entries whose test sentence names one or more tests | 210 |
| Entries whose test sentence says no test checks the fact, and names none | 10 |
| Entries with a test sentence that names no test file | 3 (F-289, F-292, F-345) |
| Entries with no test sentence | 116 |
| ... of them, entries that name a test file inside another sentence | 16 |
| ... of them, entries that say inside another sentence that no test checks a part | 12 |
| Characters of all test sentences | 32,123, which is 7.5% of 427,301 |
| ... of them, in the 210 entries that name tests | 31,195 |
| ... of them, in the 10 "no test" entries | 715 |
| Test names, counted per entry | 672 |
| Distinct test names | 603 |
| Patterns among the 672 | 41 |
| Test names by folder | `compiler_tests` 349, `tests` 281, `one_library_tests` 22, JUnit 13, `library_tests` 6, tool test 1 |
| Test names per naming entry | median 2, range 1 to 14 |
| Test sentence characters per naming entry | median 125, range 30 to 558 |

The 10 "no test" entries are F-159, F-261, F-272, F-283, F-290, F-291, F-309, F-321, F-355 and F-404.
5 of the 210 naming entries also hold a "No test" sentence for another part of the fact: F-70, F-112, F-183, F-362 and F-370.
The 16 entries that name a test file outside a test sentence are F-25, F-39, F-52, F-60, F-64, F-82, F-90, F-99, F-109, F-117, F-234, F-250, F-262, F-264, F-265 and F-273.

## Point 2: do the cited reports name the tests?

| Class, over the 210 entries that name tests | Exact name | Name or its `XXX` form |
|---|---|---|
| A: every test named in a cited section | 49 | 54 |
| B: every test named in a cited report, some outside the cited sections | 97 | 101 |
| C: some test named in no cited report | 58 | 49 |
| D: a cited report or section does not exist | 2 | 2 |
| E: no report cited | 4 | 4 |

- The two D entries are F-146 and F-270. Each cites a quoted heading that `rung-size-expressions/REPORT.md` does not have ("Item 15, 15a with its part (b)" and "Fork 3, way 4a, under Q13.3"). The script found the entries' other cited sections. Over those sections, F-270 would be A, and F-146 would be C, or A with the `XXX` form.
- The four E entries are F-37, F-112, F-266 and F-151. F-151's detail sentence names "that judgement", a report named earlier in the entry, which the script does not follow.
- Across the C entries, 93 test names (exact) or 79 (with the `XXX` form) are missing from the cited reports. In 14 C entries, the cited reports name none of the entry's tests.
- 14 names are found only under their other `XXX` form, in 11 entries: F-68, F-128, F-133, F-146, F-223, F-232, F-252, F-285, F-304, F-332 and F-380. In each, the report names the test as an expected failure (`XXXName`), and the entry names it after its promotion, or the other way round.
- Per pair of an entry and one of its cited reports, there are 281 pairs. In 136 pairs the report names all of the entry's tests, in 103 some of them, and in 41 none.

The list by entry is at the end of this file.

## Point 3: one section or scattered, and under which headings

These counts cover the 147 entries whose tests are all named in their cited reports (A, B, and the A part of D).

| What the count counts | Count |
|---|---|
| Entries whose tests all sit in one leaf section | 128 |
| Entries whose tests sit in two leaf sections | 19 |
| Entries whose tests need three or more leaf sections | 0 |
| Entries whose tests all sit in one section of level 2 or 3, subsections included | 128 (123 at level 2, 5 at level 3) |

The leaf sections were counted by a greedy cover. It takes the section that holds most of the remaining tests, and on a tie the smallest.

A test name is often named in several sections of one report. The table below counts, for each heading, the number of distinct reports in which a section under that heading names at least one test of an entry that cites the report. It counts 197 reports and the entries of classes A to D. Numbers such as "12." and "Part 1." are dropped from the headings, and case is ignored.

| Reports | Heading |
|---|---|
| 87 | Defects and their homes |
| 78 | Decisions |
| 61 | Points to report |
| 35 | What changed and why |
| 30 | Defects, each with its home |
| 26 | Programs run old against new |
| 19 | For FACTS |
| 18 | Old against new |
| 13 | The tests |
| 13 | The failing run and the passing run |
| 12 | The failing runs and the passing runs |
| 12 | The tests, failing and passing |
| 10 | Points to report reached |
| 10 | The tests: failing on the base, passing after |
| 9 | What I checked |
| 8 | Every defect measured, and its home |
| 6 | Every measured defect and its home |
| 6 | The tests: the failing run and the passing run |
| 6 | The failing runs and the passing run |
| 5 | The tests, the recorded failure and the recorded pass |
| 4 | The tests, first |
| 4 | Tests |

- 140 of the 197 reports have a heading with the word "test" in it that names at least one of the tests. The wording of such headings varies: the table above alone holds seven forms of it.
- For the 128 entries whose tests sit in one leaf section, the heading of that section is most often "Defects and their homes" (33). Next come "For FACTS" (9), "Defects, each with its home" (6) and "Points to report" (4). Headings that hold the word "test" include "The tests: failing on the base, passing after" (3), "The tests" (3), "Tests" (2) and others.

## Point 4: what a reader pays to get the tests from the report

These counts cover the same 147 entries.

| What the count measures, in characters | Median | Range | Quartiles |
|---|---|---|---|
| The entry's test sentence | 115 | 30 to 472 | 78 to 172 |
| The smallest section of level 2 or more that holds all the tests (128 entries) | 1,352 | 145 to 34,068 | 939 to 2,594 |
| The leaf sections that hold the tests, summed (147 entries) | 1,549 | 145 to 14,394 | 963 to 3,182 |
| That section over the test sentence, as a ratio (128 entries) | 14 | 1 to 218 | 8 to 28 |
| Those leaf sections over the test sentence, as a ratio (147 entries) | 15 | 1 to 107 | 8 to 28 |
| The cited reports whole, summed per entry | 34,664 | 17,708 to 169,466 | 26,670 to 55,278 |

The section sizes are the sizes of the sections that the script found to hold the tests. They are not always the sections that the entry cites: in class B the tests sit outside the cited sections.

## Point 5: the reports

| What the count counts | Count |
|---|---|
| Citations of a report in "Detail:" sentences, all entries | 434 |
| Citations whose path the script could not find (`size-cost.md` in F-40, `scope-call-site-dispatch.md` in F-45, `worktrees.md` in F-113) | 3 |
| Distinct reports cited by all entries | 310 |
| Distinct reports cited by the 210 entries that name tests | 213 |

For each of the 213 reports, the script collects the tests of the entries that cite it. A test counts for a report if the report names it, with the `XXX` form allowed. A test that none of the entry's cited reports names counts as missing for each of them.

| State of the report | Reports |
|---|---|
| All its tests sit in one section (level 2 or more) whose heading holds "test" | 80 |
| All its tests sit in one leaf section whose heading does not hold "test" | 44 |
| It has a section whose heading holds "test", but its tests are not all in it | 11 |
| Its tests are spread over several sections, none headed with "test" | 3 |
| It misses a test that no cited report of the entry names | 66 |
| It names none of the entry's tests, which another cited report names | 8 |
| It is not Markdown (the tool's `test_classify.py` is cited) | 1 |

So 80 of the 213 reports already hold one section, headed with "test", that lists all the tests that their entries name. 124 have the tests missing, outside such a section, or under another heading (44 + 11 + 3 + 66). 8 hold none of the tests, because the entry's tests are in another cited report. 1 is not a report.

## Point 6: do the named tests exist?

- 0 of the 672 test names (603 distinct) match no file. Each name, or each pattern, matches at least one file of its folder, or a JUnit class.
- 212 names are written with an extension, `.fss` or `.test`. Each of those files exists with that extension.
- Each of the 41 patterns matches between 2 and 36 files. `compiler_tests/*Comprises*` in F-76 matches 36.

## Ten examples, from one clean section to tests missing

Each example quotes the test sentence. The section sizes come from `measure.py`. The sizes for F-306, F-335 and F-363 were also checked with `facts-extract.sh --check`.

1. **F-83, class A, one section headed "The test".** The test sentence reads: "Gated by `tests/StringPieces.fss`, which pins row 607's two wrong `false` answers." It has 83 characters. `compile-ladder/rung-string-slips/REPORT.md` names the test in its cited sections 4 and 8. It also names it in "7. The test", which has 1,135 characters.
2. **F-235, class A, JUnit tests under "Defects and their homes".** The test sentence reads: "Gated by `ReductionMemoJUTest`, `ExclusionMemoJUTest` and `TraitTableMemoJUTest`." It has 82 characters. `compile-ladder/rung-solver-speed/REPORT.md` names all three. The smallest section that holds them is "14. Defects and their homes", with 827 characters. The report has no section headed with "test" that holds them.
3. **F-363, class B, the tests under "The tests", but the entry cites other sections.** The entry has six tests and a test sentence of 315 characters. It cites "Each form on the base and after (points to report)" and "The trees (points to report)" of `compile-ladder/rung-superscript-after/REPORT.md`. All six tests are in "The tests", with 1,501 characters (`facts-extract.sh --check` gives `REPORT.md:61-66 [1500 bytes]`).
4. **F-335, class B.** The test sentence has 88 characters and names two tests. The entry cites "1. What changed and why" of `compile-ladder/rung-runtime-threads/REPORT.md`. The tests are in "2. The tests", with 5,082 characters (`REPORT.md:60-110 [5083 bytes]`).
5. **F-306, class B.** The test sentence has 173 characters and names four tests. The entry cites "What changed and why" of `compile-ladder/rung-natives-integers/REPORT.md`. The tests are in "The tests, failing and passing", with 4,586 characters (`REPORT.md:28-75 [4585 bytes]`).
6. **F-299, class B, spread over five cited reports.** The test sentence has 472 characters and names 12 tests. The entry cites "What changed and why" in four reports and "The count of the bindings" in `climb-batch-28/RECORD.md`. The tests are found in two leaf sections of two reports: "The tests, before and after" of `rung-natives-self/REPORT.md` (5,889 characters) and "Where the fix belongs, and the precedent search" of `rung-string-natives/REPORT.md` (1,283 characters).
7. **F-304, class C exactly, class A with the `XXX` form.** The test sentence reads: "Test: `compiler_tests/FloatNumeralOneRounding.test`." `compile-ladder/rung-natives-float/REPORT.md` names only `XXXFloatNumeralOneRounding`, the test before its promotion. The report also names `FloatNumeralOneRoundingLink.test`.
8. **F-76, class C, patterns.** The test sentence reads: "Gated by `compiler_tests/*Comprises*` and `*CoverageReturn*`." The two patterns match 36 and 9 files. `compile-ladder/rung-return-type-rule/decision-record.md` names some of these files under "7. The tests' shapes", with 2,094 characters. It does not name them all, and it does not write the patterns.
9. **F-38, class C, no test named in the report.** The test sentence reads: "Gated by `compiler_tests/NatRtDisp`, `NatRtDispSize` and `NatRtDispTrait`." `perf-probes/nat/size-probes.md` does not hold any of the three names (`grep -c NatRtDisp` prints 0). It is a probe note, and the entry cites its "2. Probe 1: a dispatched arm generic in a size".
10. **F-270, class D.** The entry cites `compile-ladder/rung-size-expressions/REPORT.md`, "Fork 3, way 4a, under Q13.3". The report has no such heading, and `facts-extract.sh --check` prints "NOT FOUND" for it. The entry's three tests are all in its other cited section, "12. Defects and their homes", with 2,229 characters.

## Limits of the measurement

- The sentence splitter is a heuristic. It could split wrongly at an abbreviation that is not on its list, or inside unbalanced quotes. Three entries have two test sentences, and none has a test sentence that runs into its "Detail:" sentence.
- A test sentence is found by its first words. 16 entries name a test file in another sentence, and 12 say inside another sentence that no test checks a part. These are not counted as naming tests or as "no test".
- The characters of a test sentence include whatever else the sentence says, such as what the test checks or a row number. They are an upper bound on what a list of names alone would take.
- Only backticked words are read as test names. A bare word that matches no file is counted only after a folder word in the same sentence. So point 6 can miss a deleted test written as a bare name with no folder before it. Of the backticked words in test sentences that the script rejected, none looked like a test name on reading (for example `overflows(...)`, `RR64`, `ant testFast`).
- Some named items are not gating tests: F-112's `compiler_tests/IntLiteralWrapRepairR2.fss:12-14` is a cited line, and F-34's `OneLibraryJUTest.java:44` is a cited line of the runner. Both are counted as test names.
- A test counts as named in a report if its name occurs anywhere in the text, also in a sentence that does not say the test gates the fact, such as a run log or a list of defects. The count says that a reader can find the name, not that the report states what the test checks.
- A pattern counts as named only if every file that it matches today is named, or the pattern is written. Tests added after the report under the same pattern make a report fail this rule.
- The `XXX` alias is the only rename that the script follows. A test renamed in another way counts as missing.
- Sections cited by number are matched by the number at the start of the heading. A report whose headings carry no numbers does not match "section 5". Such a citation would count as a missing section, and only seven were found, all of them quoted headings.
- The "Detail:" sentence is the only source of cited reports. Paths in other sentences, and "that judgement" in F-151, are not followed. The three paths the script could not find (F-40, F-45, F-113) were not looked for further.
- Point 5's "one section headed with test" requires the word "test" in the heading. A section such as "For FACTS" or "Defects and their homes" that already lists all the tests is counted separately (44 reports), not as standard.
- The heading counts of point 3 count each report once per heading, across all sections that name any test. A heading such as "Decisions" can name a test in passing.
- Reports cited only by entries that name no test (97 of the 310) were not examined.
- FACTS was read at `23d4c2eed7`, and the tree's test folders on the same checkout. Nothing was built or run.

## The list by entry

Classes as defined above. "Named in cited reports" counts the entry's tests named exactly; "With XXX form" counts them with the `XXX` alias. "Where the tests sit" gives the smallest section of level 2 or more that holds all of them, or else the leaf sections that hold the named ones, with their sizes in characters.

| Entry | Class | Tests named | Named in cited reports | With XXX form | Test sentence chars | Where the tests sit |
|---|---|---|---|---|---|---|
| F-22 | B | 1 | 1 | 1 | 87 | one section: "Step 6: competing declarations", 963 chars |
| F-24 | C | 4 | 1 | 1 | 242 | named part in 1 section(s): "6.2 The ZZ natives read an NN64 of 2^63 " 1039 |
| F-26 | B | 2 | 2 | 2 | 78 | one section: "6. The passing run", 1205 chars |
| F-27 | C | 2 | 1 | 1 | 84 | named part in 1 section(s): "13. Stops" 644 |
| F-28 | B | 1 | 1 | 1 | 42 | one section: "6. The passing run", 1205 chars |
| F-29 | B | 2 | 2 | 2 | 288 | one section: "13. Homes of the measured defects", 2151 chars |
| F-34 | B | 2 | 2 | 2 | 275 | one section: "The fourteen compiles in the track (a point to report)", 1856 chars |
| F-37 | E | 2 |  |  | 125 |  |
| F-38 | C | 3 | 0 | 0 | 75 |  |
| F-41 | C | 1 | 0 | 0 | 67 |  |
| F-48 | C | 1 | 0 | 0 | 86 |  |
| F-51 | C | 2 | 0 | 0 | 78 |  |
| F-55 | B | 2 | 2 | 2 | 78 | 2 section(s): "10.2 The new tests, before and after" 1604; "9. Every measured defect's home" 3278 |
| F-56 | C | 1 | 0 | 0 | 47 |  |
| F-59 | C | 3 | 0 | 0 | 219 |  |
| F-67 | B | 5 | 5 | 5 | 135 | one section: "6. The tests, the recorded failure and the recorded pass", 14394 chars |
| F-68 | C | 2 | 1 | 2 | 73 | named part in 1 section(s): "13. Failure modes" 3868 |
| F-69 | B | 2 | 2 | 2 | 185 | one section: "14. Files", 1582 chars |
| F-70 | B | 1 | 1 | 1 | 258 | one section: "9. Defects, each with its home", 1190 chars |
| F-72 | B | 1 | 1 | 1 | 52 | one section: "11. Every measured defect and its home", 2134 chars |
| F-73 | B | 4 | 4 | 4 | 161 | one section: "6.1 The compiler tests' diagnostics", 2276 chars |
| F-75 | C | 8 | 6 | 6 | 377 | named part in 2 section(s): "The failing run and the passing run" 2750; "7. The tests' shapes" 2094 |
| F-76 | C | 2 | 0 | 0 | 62 | named part in 1 section(s): "7. The tests' shapes" 2094 |
| F-77 | B | 1 | 1 | 1 | 46 | one section: "5. The test, first, and its failure and pass", 1250 chars |
| F-78 | C | 2 | 1 | 1 | 71 | named part in 1 section(s): "2. The tests: failing on the base, passi" 4308 |
| F-79 | C | 3 | 2 | 2 | 135 | named part in 1 section(s): "12. Rows" 749 |
| F-80 | C | 4 | 2 | 2 | 238 | named part in 2 section(s): "10. Defects and their homes" 958; "14. Names grepped" 1193 |
| F-81 | A | 1 | 1 | 1 | 157 | one section: "5. Left, each with its row", 2850 chars |
| F-83 | A | 1 | 1 | 1 | 83 | one section: "7. The test", 1135 chars |
| F-84 | A | 1 | 1 | 1 | 61 | one section: "8. The three homes", 2347 chars |
| F-85 | B | 2 | 2 | 2 | 143 | one section: "2. The failing run and the passing run", 1806 chars |
| F-86 | B | 2 | 2 | 2 | 73 | one section: "9. Every defect measured, and its home", 4269 chars |
| F-87 | C | 3 | 1 | 1 | 123 | named part in 1 section(s): "9. Defects, each with its home" 1190 |
| F-88 | C | 1 | 0 | 0 | 37 | named part in 1 section(s): "12. Defects, and where each is recorded" 1809 |
| F-89 | B | 1 | 1 | 1 | 38 | one section: "5. What the specification settles", 656 chars |
| F-91 | A | 1 | 1 | 1 | 39 | one section: "1.4 Row 654: a full range narrowed to an open one (1 site)", 665 chars |
| F-92 | B | 1 | 1 | 1 | 30 | 1 section(s): "10. Defects and their homes" 1789 |
| F-93 | A | 1 | 1 | 1 | 36 | one section: "12. Questions for the curator", 764 chars |
| F-94 | C | 2 | 1 | 1 | 80 | named part in 1 section(s): "3. Whole suites" 1298 |
| F-112 | E | 1 |  |  | 328 |  |
| F-118 | B | 1 | 1 | 1 | 104 | one section: "Recorded failure and recorded pass", 883 chars |
| F-119 | C | 2 | 1 | 1 | 87 | named part in 1 section(s): "Correction, 2026-09-20" 576 |
| F-120 | B | 2 | 2 | 2 | 125 | one section: "The three homes of every defect measured here", 5820 chars |
| F-122 | B | 2 | 2 | 2 | 211 | one section: "The test, first", 2536 chars |
| F-123 | A | 1 | 1 | 1 | 46 | one section: "What the gate should expect", 1054 chars |
| F-124 | C | 2 | 1 | 1 | 126 | named part in 1 section(s): "12. At the gather" 1522 |
| F-125 | A | 1 | 1 | 1 | 40 | one section: "6.2 The ZZ natives read an NN64 of 2^63 or more as negative", 1039 chars |
| F-128 | C | 1 | 0 | 1 | 37 | named part in 1 section(s): "9. Defect homes and the rows" 1199 |
| F-129 | B | 1 | 1 | 1 | 34 | one section: "14. At the gather", 1862 chars |
| F-130 | A | 1 | 1 | 1 | 41 | one section: "6. The recorded failure and the recorded pass", 804 chars |
| F-131 | A | 1 | 1 | 1 | 142 | one section: "7. The reductions (answer 7)", 1236 chars |
| F-132 | A | 2 | 2 | 2 | 192 | 2 section(s): "11. The checker count, the ladder, compe" 808; "5. The tests, first, and the recorded fa" 3538 |
| F-133 | C | 4 | 1 | 4 | 133 | named part in 1 section(s): "9. Grep for competing names" 551 |
| F-134 | A | 3 | 3 | 3 | 101 | one section: "14. For the gate", 1065 chars |
| F-135 | A | 2 | 2 | 2 | 57 | one section: "14. For the gate", 1065 chars |
| F-136 | B | 1 | 1 | 1 | 45 | one section: "10. Every measured defect and its home", 3182 chars |
| F-137 | A | 1 | 1 | 1 | 41 | one section: "9. Every measured defect's home", 3278 chars |
| F-138 | C | 2 | 1 | 1 | 71 | named part in 1 section(s): "13. The files and the tracked-path check" 948 |
| F-139 | A | 1 | 1 | 1 | 39 | one section: "2. The recorded failure and the recorded pass", 1305 chars |
| F-140 | A | 1 | 1 | 1 | 52 | one section: "7. The recorded pass", 2594 chars |
| F-141 | C | 1 | 0 | 0 | 33 | named part in 1 section(s): "5.4 A bound that mentions another parame" 444 |
| F-142 | C | 1 | 0 | 0 | 40 | named part in 1 section(s): "5.1 On f0cef8d83, the first edit" 1734 |
| F-143 | A | 3 | 3 | 3 | 121 | 2 section(s): "3. Finding, and what I did with it" 3765; "11. Defects, each with its home" 962 |
| F-144 | C | 5 | 4 | 4 | 218 | named part in 1 section(s): "2. The tests: their failing runs and the" 5381 |
| F-145 | B | 3 | 3 | 3 | 134 | one section: "2. The tests: the failing run, and the pass", 5745 chars |
| F-146 | D (C over the cited parts that exist) | 1 | 0 | 1 | 37 | named part in 1 section(s): "7. Programs run old against new" 1005 |
| F-147 | C | 2 | 1 | 1 | 72 | named part in 1 section(s): "2. The tests, their failing run and thei" 3255 |
| F-148 | A | 2 | 2 | 2 | 83 | one section: "1. What I checked", 6645 chars |
| F-151 | E | 1 |  |  | 53 |  |
| F-158 | A | 1 | 1 | 1 | 36 | one section: "15. The three homes", 1906 chars |
| F-173 | C | 2 | 0 | 0 | 206 | named part in 1 section(s): "3. The one whole-suite run, and the inst" 2880 |
| F-181 | C | 8 | 7 | 7 | 287 | named part in 1 section(s): "10. Defects, and their homes" 1127 |
| F-183 | B | 2 | 2 | 2 | 243 | one section: "6. Tests", 2885 chars |
| F-221 | A | 2 | 2 | 2 | 81 | one section: "Finding 1 (a defect of the change): a call that writes its s", 3417 chars |
| F-222 | A | 2 | 2 | 2 | 56 | one section: "6. Old against new", 2247 chars |
| F-223 | C | 9 | 6 | 8 | 427 | named part in 2 section(s): "2. The test before the fix, and after" 3262; "2. The tests: the failing run, and the p" 5745 |
| F-225 | B | 2 | 2 | 2 | 56 | one section: "6. Old against new", 1864 chars |
| F-226 | B | 3 | 3 | 3 | 144 | 2 section(s): "9. Every defect measured, and its home" 1985; "14. Names grepped" 1193 |
| F-227 | C | 2 | 1 | 1 | 84 | named part in 1 section(s): "10. Defects, each with its home" 2175 |
| F-228 | B | 7 | 7 | 7 | 247 | 2 section(s): "11. Defects, each with its home" 1783; "10. Defects and their homes" 756 |
| F-229 | A | 2 | 2 | 2 | 86 | one section: "1. What changed, and why", 3319 chars |
| F-230 | A | 3 | 3 | 3 | 100 | one section: "10. Defects, each with its home", 1342 chars |
| F-231 | B | 1 | 1 | 1 | 119 | one section: "10. What a landing would carry (item 5)", 1011 chars |
| F-232 | C | 2 | 1 | 2 | 79 | named part in 1 section(s): "6. Old against new" 790 |
| F-233 | B | 3 | 3 | 3 | 127 | one section: "2. The tests: the failing run and the passing run", 4207 chars |
| F-235 | A | 3 | 3 | 3 | 82 | one section: "14. Defects and their homes", 827 chars |
| F-237 | C | 6 | 5 | 5 | 258 | named part in 2 section(s): "9. Defects and their homes" 797; "10. Defects and their homes" 958 |
| F-239 | B | 5 | 5 | 5 | 113 | one section: "10. Defects and their homes", 756 chars |
| F-249 | B | 1 | 1 | 1 | 54 | one section: "7. Programs run old against new", 754 chars |
| F-251 | A | 6 | 6 | 6 | 183 | one section: "The test first, then the fix", 4738 chars |
| F-252 | C | 14 | 13 | 14 | 558 | named part in 1 section(s): "2. The tests, failing and passing" 4067 |
| F-253 | B | 6 | 6 | 6 | 243 | 2 section(s): "11. For FACTS" 891; "11. Defects and their homes" 2182 |
| F-254 | B | 2 | 2 | 2 | 84 | one section: "10. Defects, each with its home", 937 chars |
| F-255 | C | 9 | 3 | 3 | 452 | named part in 1 section(s): "14. Defects, each with its home" 1290 |
| F-256 | B | 8 | 8 | 8 | 315 | 2 section(s): "10. Defects and their homes" 974; "6. The three homes" 622 |
| F-257 | C | 9 | 8 | 8 | 348 | named part in 2 section(s): "3. The tests keyed on the old message, a" 4097; "11. Defects and their homes" 2182 |
| F-258 | C | 7 | 5 | 5 | 407 | named part in 1 section(s): "2. The tests, their failing and passing " 3579 |
| F-259 | B | 3 | 3 | 3 | 138 | one section: "12. For FACTS", 562 chars |
| F-263 | A | 3 | 3 | 3 | 172 | one section: "11. Defects and their homes", 1514 chars |
| F-266 | E | 2 |  |  | 97 |  |
| F-268 | B | 2 | 2 | 2 | 95 | one section: "10. Defects, and their homes", 1061 chars |
| F-270 | D (A over the cited parts that exist) | 3 | 3 | 3 | 111 | one section: "12. Defects and their homes", 2229 chars |
| F-274 | B | 4 | 4 | 4 | 146 | one section: "2. The tests, failing and passing", 4067 chars |
| F-275 | A | 3 | 3 | 3 | 150 | one section: "5. Defects and their homes", 963 chars |
| F-276 | B | 2 | 2 | 2 | 154 | one section: "7. Programs run old against new", 754 chars |
| F-277 | A | 3 | 3 | 3 | 99 | one section: "12. For FACTS", 1112 chars |
| F-278 | C | 2 | 1 | 1 | 201 | named part in 1 section(s): "10. Defects measured, each with its home" 680 |
| F-279 | B | 3 | 3 | 3 | 88 | one section: "10. Defects, each with its home", 690 chars |
| F-280 | A | 2 | 2 | 2 | 60 | one section: "2. The tests, their failing and passing runs", 4214 chars |
| F-281 | B | 5 | 5 | 5 | 256 | one section: "2. The tests: their failing runs and their passing run", 5260 chars |
| F-282 | C | 9 | 8 | 8 | 343 | named part in 1 section(s): "2. The tests" 3940 |
| F-284 | A | 1 | 1 | 1 | 40 | one section: "8. Old against new", 452 chars |
| F-285 | C | 3 | 2 | 3 | 208 | named part in 1 section(s): "2. The failing run and the passing run" 1806 |
| F-286 | A | 1 | 1 | 1 | 106 | one section: "12. Greps for competing declarations", 452 chars |
| F-287 | A | 2 | 2 | 2 | 113 | one section: "7. Old against new", 532 chars |
| F-288 | A | 2 | 2 | 2 | 129 | one section: "13. Defects and their homes", 1009 chars |
| F-295 | A | 1 | 1 | 1 | 78 | one section: "13. Defects and their homes", 1009 chars |
| F-296 | B | 1 | 1 | 1 | 41 | one section: "1. What changed, and why", 1962 chars |
| F-297 | B | 5 | 5 | 5 | 233 | 2 section(s): "11. Defects, each with its home" 823; "1. The ruling: eee518f60, upheld" 4017 |
| F-298 | C | 6 | 5 | 5 | 290 | named part in 2 section(s): "For FACTS" 706; "The suites" 1935 |
| F-299 | B | 12 | 12 | 12 | 472 | 2 section(s): "The tests, before and after" 5889; "Where the fix belongs, and the precedent" 1283 |
| F-303 | A | 5 | 5 | 5 | 246 | one section: "Tests", 2738 chars |
| F-304 | C | 1 | 0 | 1 | 53 |  |
| F-305 | A | 7 | 7 | 7 | 265 | one section: "12. For FACTS", 1198 chars |
| F-306 | B | 4 | 4 | 4 | 173 | one section: "The tests, failing and passing", 4586 chars |
| F-307 | B | 2 | 2 | 2 | 100 | one section: "The runs", 4283 chars |
| F-308 | C | 12 | 8 | 8 | 432 | named part in 2 section(s): "2. The tests: the failing runs and the p" 5917; "C (rung-char-expr-string, fc860b655)" 2040 |
| F-310 | A | 2 | 2 | 2 | 100 | one section: "For FACTS", 145 chars |
| F-311 | B | 2 | 2 | 2 | 98 | one section: "The tests, their failing and passing runs", 3297 chars |
| F-312 | B | 7 | 7 | 7 | 234 | one section: "The tests: failing on the base, passing after", 5329 chars |
| F-313 | B | 5 | 5 | 5 | 203 | one section: "11. Defects and their homes", 1122 chars |
| F-314 | B | 2 | 2 | 2 | 103 | one section: "2. The tests, first", 4516 chars |
| F-315 | A | 4 | 4 | 4 | 156 | one section: "Part 1. Conformance", 34068 chars |
| F-316 | C | 2 | 1 | 1 | 154 | named part in 1 section(s): "6.2 The ZZ natives read an NN64 of 2^63 " 1039 |
| F-318 | C | 6 | 4 | 4 | 275 | named part in 2 section(s): "7. Old against new" 314; "11. Defects and their homes" 940 |
| F-319 | A | 3 | 3 | 3 | 145 | one section: "3. The stages and the ladder", 968 chars |
| F-320 | B | 9 | 9 | 9 | 346 | one section: "2. The tests: the failing run and the passing run", 5122 chars |
| F-323 | B | 3 | 3 | 3 | 139 | one section: "10. Defects and their homes", 849 chars |
| F-324 | A | 7 | 7 | 7 | 237 | one section: "The tests: failing on the base, passing after", 2120 chars |
| F-325 | B | 4 | 4 | 4 | 124 | 2 section(s): "The tests: failing on the base, passing " 4319; "6. The stages" 738 |
| F-326 | A | 3 | 3 | 3 | 131 | one section: "Defects and their homes", 942 chars |
| F-327 | B | 2 | 2 | 2 | 97 | one section: "Defects and their homes", 675 chars |
| F-328 | A | 2 | 2 | 2 | 86 | one section: "Defects and their homes", 713 chars |
| F-329 | B | 4 | 4 | 4 | 160 | one section: "Defects and their homes", 487 chars |
| F-330 | B | 2 | 2 | 2 | 89 | one section: "Tests: the failing runs and the passing runs", 4742 chars |
| F-331 | B | 3 | 3 | 3 | 125 | one section: "The failing run and the passing run", 5514 chars |
| F-332 | C | 3 | 2 | 3 | 135 | named part in 1 section(s): "Tests: the failing runs and the passing " 8762 |
| F-333 | B | 5 | 5 | 5 | 141 | one section: "Defects and their homes", 1716 chars |
| F-334 | B | 3 | 3 | 3 | 145 | one section: "13. Defects and their homes", 2014 chars |
| F-335 | B | 2 | 2 | 2 | 88 | one section: "2. The tests", 5082 chars |
| F-336 | B | 2 | 2 | 2 | 106 | 2 section(s): "8. Programs run old against new" 415; "Defects, each with its home" 1271 |
| F-337 | C | 2 | 1 | 1 | 219 | named part in 1 section(s): "Names" 660 |
| F-338 | B | 1 | 1 | 1 | 36 | one section: "3. The tests", 3404 chars |
| F-339 | A | 3 | 3 | 3 | 132 | one section: "Points to report", 2208 chars |
| F-340 | B | 4 | 4 | 4 | 168 | 2 section(s): "The failing runs and the passing runs" 5458; "14. For FACTS" 1208 |
| F-341 | C | 11 | 7 | 7 | 409 | named part in 3 section(s): "The last run" 1202; "12. Defects, each with its home" 1409; "7. Points to report" 3501 |
| F-342 | C | 9 | 4 | 4 | 333 | named part in 1 section(s): "2. The tests, and the runs" 5125 |
| F-343 | B | 2 | 2 | 2 | 99 | one section: "13. Defects, and their homes", 730 chars |
| F-344 | B | 1 | 1 | 1 | 41 | one section: "For FACTS", 1164 chars |
| F-347 | B | 6 | 6 | 6 | 213 | one section: "14. For FACTS", 1208 chars |
| F-348 | B | 2 | 2 | 2 | 86 | one section: "7. Each program run old against new", 1361 chars |
| F-349 | B | 1 | 1 | 1 | 37 | one section: "12. Defects, each with its home", 1409 chars |
| F-350 | B | 3 | 3 | 3 | 108 | one section: "Defects, each with its home", 1674 chars |
| F-351 | B | 9 | 9 | 9 | 278 | 2 section(s): "The failing runs and the passing runs" 5851; "What a read records, and what a nested c" 1315 |
| F-362 | B | 4 | 4 | 4 | 284 | one section: "Defects and their homes", 752 chars |
| F-363 | B | 6 | 6 | 6 | 315 | one section: "The tests", 1501 chars |
| F-364 | B | 3 | 3 | 3 | 137 | one section: "2. The failing runs and the passing run", 2377 chars |
| F-365 | C | 4 | 3 | 3 | 183 | named part in 1 section(s): "11. Defects and their homes" 1375 |
| F-366 | C | 6 | 5 | 5 | 234 | named part in 1 section(s): "2. The failing runs and the passing runs" 2833 |
| F-367 | C | 3 | 2 | 2 | 116 | named part in 1 section(s): "Defects measured, each with its home" 1448 |
| F-368 | B | 4 | 4 | 4 | 145 | one section: "The stages", 1527 chars |
| F-369 | B | 4 | 4 | 4 | 169 | 2 section(s): "The tests" 1238; "Added by the skeptic" 1638 |
| F-370 | B | 1 | 1 | 1 | 90 | one section: "For FACTS", 1045 chars |
| F-372 | B | 4 | 4 | 4 | 181 | one section: "Defects and their homes", 1713 chars |
| F-373 | A | 1 | 1 | 1 | 115 | one section: "Each form tested (compiler_tests/LabelExitCompiled.fss, and ", 1602 chars |
| F-374 | B | 3 | 3 | 3 | 125 | one section: "Competing declarations", 420 chars |
| F-375 | C | 7 | 5 | 5 | 313 | named part in 2 section(s): "The tests, failing and passing" 3704; "Tests" 928 |
| F-376 | B | 1 | 1 | 1 | 305 | one section: "Points to report", 1727 chars |
| F-377 | C | 10 | 9 | 9 | 340 | named part in 3 section(s): "8. Points to report" 2390; "The failing runs on the base's code, and" 2938; "The tests" 5088 |
| F-378 | B | 1 | 1 | 1 | 54 | one section: "For FACTS", 331 chars |
| F-379 | A | 2 | 2 | 2 | 87 | one section: "Defects and their homes", 1490 chars |
| F-380 | C | 6 | 5 | 6 | 240 | named part in 2 section(s): "Findings and fixes" 5398; "For FACTS" 870 |
| F-381 | A | 4 | 4 | 4 | 201 | 2 section(s): "The tests: the failing run on the base, " 2278; "Defects, each with its home" 1271 |
| F-382 | B | 6 | 6 | 6 | 246 | one section: "2. The tests: failing on the base, passing after", 4813 chars |
| F-383 | B | 1 | 1 | 1 | 45 | one section: "11. Defects and their homes", 1255 chars |
| F-384 | B | 3 | 3 | 3 | 130 | one section: "Defects and their homes", 1297 chars |
| F-385 | B | 1 | 1 | 1 | 53 | one section: "8. Points to report", 2390 chars |
| F-386 | B | 2 | 2 | 2 | 103 | one section: "10. Defects and their homes", 668 chars |
| F-387 | B | 1 | 1 | 1 | 62 | one section: "Names added", 708 chars |
| F-388 | B | 3 | 3 | 3 | 159 | one section: "Defects and their homes", 1282 chars |
| F-389 | C | 3 | 2 | 2 | 167 | named part in 1 section(s): "13. Defects and their homes" 692 |
| F-390 | B | 4 | 4 | 4 | 199 | 2 section(s): "Points to report" 2025; "The prelude's two expected failures (G4)" 1067 |
| F-391 | B | 6 | 6 | 6 | 238 | 2 section(s): "Defects and their homes" 1320; "Points to report" 2565 |
| F-392 | B | 1 | 1 | 1 | 58 | one section: "For FACTS", 939 chars |
| F-393 | B | 1 | 1 | 1 | 50 | one section: "The stages, the shadow patch and STAGE_BLIND", 736 chars |
| F-394 | B | 3 | 3 | 3 | 158 | one section: "Corrections", 3776 chars |
| F-395 | B | 1 | 1 | 1 | 64 | one section: "12. Defects and their homes", 449 chars |
| F-396 | B | 7 | 7 | 7 | 243 | 2 section(s): "The tests: the failing runs and the pass" 8657; "Defects, each with its home" 1271 |
| F-397 | A | 2 | 2 | 2 | 101 | one section: "Defects and their homes", 830 chars |
| F-398 | C | 4 | 3 | 3 | 172 | named part in 1 section(s): "The tests" 649 |
| F-399 | B | 4 | 4 | 4 | 181 | one section: "Defects and their homes", 738 chars |
| F-400 | B | 3 | 3 | 3 | 113 | one section: "Defects and their homes", 1071 chars |
| F-401 | A | 2 | 2 | 2 | 82 | one section: "Defects and their homes", 1509 chars |
| F-402 | C | 3 | 2 | 2 | 100 | named part in 1 section(s): "F. The fold: numerals alone folded exact" 5762 |
| F-403 | A | 2 | 2 | 2 | 98 | one section: "Points to report", 1139 chars |
| F-405 | C | 4 | 3 | 3 | 239 | named part in 2 section(s): "Tests" 928; "10. Defects and their homes" 1536 |
| F-406 | B | 4 | 4 | 4 | 160 | one section: "9. Defects and their homes", 860 chars |
| F-407 | B | 5 | 5 | 5 | 213 | one section: "Defects and their homes", 763 chars |
| F-408 | B | 5 | 5 | 5 | 196 | one section: "Defects and their homes", 1549 chars |
| F-409 | A | 5 | 5 | 5 | 184 | one section: "What I checked", 4965 chars |

- Entries that say no test checks the fact (10): F-159, F-261, F-272, F-283, F-290, F-291, F-309, F-321, F-355, F-404
- Entries with a test sentence that names no test file (3): F-289, F-292, F-345
- Entries with no test sentence (116): F-7, F-9, F-11, F-12, F-17, F-18, F-19, F-20, F-21, F-23, F-25, F-32, F-35, F-36, F-39, F-40, F-42, F-43, F-44, F-45, F-46, F-47, F-49, F-50, F-52, F-53, F-54, F-57, F-58, F-60, F-61, F-62, F-63, F-64, F-65, F-66, F-71, F-74, F-82, F-90, F-97, F-98, F-99, F-100, F-101, F-102, F-103, F-104, F-105, F-106, F-107, F-108, F-109, F-111, F-113, F-114, F-117, F-121, F-126, F-152, F-154, F-155, F-156, F-157, F-162, F-163, F-165, F-166, F-167, F-168, F-169, F-170, F-171, F-172, F-174, F-175, F-176, F-179, F-180, F-182, F-184, F-185, F-203, F-220, F-234, F-236, F-240, F-242, F-243, F-244, F-245, F-248, F-250, F-262, F-264, F-265, F-267, F-269, F-271, F-273, F-293, F-294, F-300, F-301, F-302, F-317, F-322, F-352, F-353, F-354, F-356, F-357, F-358, F-359, F-361, F-371
