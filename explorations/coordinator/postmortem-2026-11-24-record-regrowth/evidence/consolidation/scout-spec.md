<!-- Scout evidence for chunk `spec` (section "The specification and the repository's lineage", 23 entries) of the FACTS consolidation of 2026-11-24; gathered with facts-extract.sh, grep and ls, no build, suite or test run; evidence of the run, not a note. Abbreviations: "all found" = every file, test and report path the entry names exists (ls), and every cited report heading resolves (facts-extract.sh --check 'doc:PATH#HEADING'); the .tex and .java line numbers were not re-read. R = .claude/skills/fortress-repo/references. History blocks: 1st = "numbered" at a74f5a2b7 (renumbering, not the content's origin). Ledger rows listed with status now. -->

## F-162
1. Sources: none (no report section). Cites Specification/library/structure.tex:25-31 (found; text "largely automatically generated from the API code" is there, lines 25-31).
2. Commit: 1st a74f5a2b7; cut to form 49738c3cc (from reviews/rung-conformance-5-8.md, conformance-1-4.md).
3. Cited by: no FACTS/POSITIONS/skills entry.
4. Exists: structure.tex found. R/specification.md named in entry: found.
5. Said elsewhere: R/specification.md:13 "The api listings of the library part are generated from the library's `.fsi` files when the specification is built (`Specification/library/apis/`, not ..." (same rule).
6. Curator: none.

## F-163
1. Sources: reviews/spec-change-form.md sections 5 and 7 (found; headings resolve, :212-249, :350-383).
2. Commit: 1st a74f5a2b7; F-164 merged in 8ab10d9de.
3. Cited by: P-96, F-166.
4. Exists: `git diff --quiet 2f8b4331a:Specification c02fa44d0:Specification-1.0-frozen` exits 0 (both commits exist; repo not shallow). Specification-1.0-frozen/fortress.1.0.pdf and Specification/fortress.pdf found.
5. Said elsewhere: R/specification.md:6 "`Specification-1.0-frozen/` is the unrevised copy. Cite it as 'the Working Draft of February 2011'. Only `fortress.1.0.pdf` in it is the 1.0 release."; :7 restart.
6. Curator: none.

## F-165
1. Sources: coordinator/lineage.md "The facts" (:5-12) and "Verification against Pavol's recollection (the same worker, re-briefed)" (:29-37; items "Working code" :34 and "Verdict" :37) all found.
2. Commit: 1st a74f5a2b7; cut to form 66b27d810.
3. Cited by: P-19.
4. Exists: commits 8fe1daa8f, a874948ac, 8332bd34f exist; branch clean-ladder exists (git branch -a | grep -c clean-ladder gives 1). The FTypeArrayList.java claim not re-checked in the tree.
5. Said elsewhere: R/records.md:113 "The repository is a 2018 fork of `sirinath/fortress`, a git conversion of ..."; :119 "Commit `8fe1daa8f` copied a third-party port of the tree to Java 9 onto the team's last commit, `a874948ac`."
6. Curator: none.

## F-166
1. Sources: coordinator/spec-lineage.md section 6 (:228-252, :254-279) and "Coordinator's check (2026-09-26)" (:254-279), found.
2. Commit: 1st a74f5a2b7; rewritten 6d431bba2; F-271 split off 2026-10-22.
3. Cited by: F-163, F-271, P-25.
4. Exists: Documentation/Specification found; Prose/Language/ dir not separately checked.
5. Said elsewhere: R/specification.md:7 "`Documentation/Specification/` is the team's later restart, which they did not finish. If its Types chapter, ..."; F-44 and F-47 (FACTS.md:49, :52) mention "multiple instantiation exclusion".
6. Curator: none quoted (history blocks quote only older entry text).

## F-167
1. Sources: compile-ladder/rung-spec-route-a/decision-record.md sections 2, 3, 4.2 (:50-59, :61-483, :491-501), found.
2. Commit: 1st a74f5a2b7; rewritten 3924e7ec3.
3. Cited by: F-21, F-47.
4. Exists: ledger 331 NEGATIVE-VERIFIED (prelude `Nothing[\T\]`; agrees); 406 NEGATIVE-VERIFIED (bool args, agrees); 414 NEGATIVE-VERIFIED (agrees).
5. Said elsewhere: R/specification.md:39 "If the revision refuses an example, keep the example in the text, marked 'Not allowed', as the specification itself does."; R/revival-changes.md:28 "The compiled checker applies the exclusion rule (P-43, P-97)."; F-47 (FACTS.md:52).
6. Curator: none.

## F-168
1. Sources: compile-ladder/rung-spec-numbers/decision-record.md section 3 (:19-72), also "2. The one reading everything rational rests on" (:11-17), found.
2. Commit: 1st a74f5a2b7; rewritten d9c415395.
3. Cited by: none.
4. Exists: Specification/basic-lib/numbers.tex, Specification/advanced-lib/numbers-advanced.tex found. No ledger row named. Cites F-131, F-172, P-74, P-80 (entries not checked).
5. Said elsewhere: F-172 (FACTS.md:335) gives the integer chapter's rules; F-52 (FACTS.md:57) on RationalQuantity. No sentence in R/ on the QQ trait list found (grep NaN|0/0 in R/revival-changes.md, R/library.md: no hit).
6. Curator: none.

## F-169
1. Sources: reviews/numerics-plan-coordinator/evidence-B.md sections 1 and 2 (found, headings resolve).
2. Commit: 1st a74f5a2b7; rewritten 7a401f074; rewritten again 2026-11-08, 11-09 (x2) (no commit named in those blocks).
3. Cited by: F-371.
4. Exists: Specification-1.0-frozen/basic/expressions/literals.tex and Specification/basic/expressions/literals.tex found. Cites F-170, F-173, P-174.
5. Said elsewhere: R/revival-changes.md:93 "A numeral's own type is `NaturalNumeral[\n, r, v\]`, or `RadixPointNumeral[\n, m, r, v\]` with a radix point (P-174)."; F-345 (FACTS.md:346).
6. Curator: none.

## F-170
1. Sources: compile-ladder/rung-spec-ranges/decision-record.md sections 2 and 3 (found: "## 2. What the revision states..." :16, "## 3. Per passage" :26).
2. Commit: 1st a74f5a2b7; rewritten 17c6052bb.
3. Cited by: F-169.
4. Exists: Specification/basic/expressions/ranges.tex found; `testSpecData` target found at build.xml:1457. Row 485 FIXED (agrees: entry says "fixed").
5. Said elsewhere: grep 'a#n|range of ZZ32|ranges over' in R/revival-changes.md, R/library.md: no hit. F-114 named by entry (not checked).
6. Curator: none.

## F-171
1. Sources: compile-ladder/rung-spec-comprises/decision-record.md section 2 (:11-20), found.
2. Commit: 1st a74f5a2b7; rewritten d8e0cd28e.
3. Cited by: F-62.
4. Exists: Specification/basic/traits.tex found. Rows 407, 487, 489, 490 all NEGATIVE-VERIFIED (agree: departures/open). F-121 named (not checked).
5. Said elsewhere: R/revival-changes.md:30 "**A `comprises` clause speaks of values (P-60).** Every value of the trait that declares it is a value of a listed type. So a generic trait need not be listed if every type below it is below a listed type, ..."; F-175 (FACTS.md:338).
6. Curator: none.

## F-172
1. Sources: compile-ladder/rung-spec-integer-rules/decision-record.md section 2 (:9-24), found.
2. Commit: 1st a74f5a2b7; rewritten 581356f32.
3. Cited by: F-168; R/sources.md:1137 (maintenance file) names it.
4. Exists: Specification/basic-lib/basic-integers.tex, Specification/basic/operators/opr-overview.tex found. Cites F-263 (not checked). No ledger row named.
5. Said elsewhere: R/revival-changes.md:110 "**An integer converts to another integer type by a checked getter or by a low-bits function (P-161).** To convert a value, write a getter, as `x.asZZ32`: `asZZ32`, `asZZ64`, `asNN32`, `asNN64` or `asZZ`. It ..."
6. Curator: none.

## F-173
1. Sources: compile-ladder/rung-instance-bound/REPORT.md (found, :1-192); Specification/basic/inference.tex (found).
2. Commit: 1st a74f5a2b7; rewritten f54ffac90; later rewrites 7daf51fe8, 567c36dad, 7858d0e97 (2026-11-17).
3. Cited by: F-169, F-273.
4. Exists: ProjectFortress/compiler_tests/XXXInferPromoteNN32.{fss,test}, InferLoneBound*.fss/.test (compiler_tests), tests/InferLone{BoundMentionsParamWalk,BoundWalk,UnboundedWalk}.fss: all found. Row 442 NEGATIVE-VERIFIED (prelude lacks NN32 to ZZ64; agrees); row 587 NEGATIVE-VERIFIED (BottomType for function expression; agrees). P-46, P-48, P-49 named.
5. Said elsewhere: R/revival-changes.md:68 "**A type parameter that a call does not fix takes its bound, not Scala's `Nothing` (P-48).** The checker takes the intersection of its upper bounds, ..."; F-141 (FACTS.md:237).
6. Curator: none.

## F-174
1. Sources: compile-ladder/rung-spec-overloading/decision-record.md sections 3 and 4 (:76-84, :86-91), found; Specification/advanced/overloading.tex found.
2. Commit: 1st a74f5a2b7; rewritten 576b4c287; later 7858d0e97, 61b50cd34 (2026-11-24 08:12Z).
3. Cited by: F-50; R/sources.md:792, :1652 (maintenance file).
4. Exists: OverloadingChecker.scala (checkBoundAny) found at ProjectFortress/src/com/sun/fortress/scala_src/typechecker/. Rows: 398 FIXED, 534 FIXED (agree: "fixed", "since row 534's fix"); 1048, 537, 539, 779, 780 NEGATIVE-VERIFIED (agree).
5. Said elsewhere: R/revival-changes.md:13 "Where a declaration has static parameters, exclusion is read over the whole tuple of parameter types (P-152)."; F-27 (FACTS.md:21) walk load check.
6. Curator: none.

## F-175
1. Sources: compile-ladder/rung-spec-overloading/decision-record.md sections 8 and 9 (:118-138; :140-145), found; Specification/appendices/changes.tex found (lines :3486-3681 not re-read).
2. Commit: 1st a74f5a2b7; rewritten 576b4c287; many later rewrites, commits f56d6516c, 7daf51fe8, d89fc0fda, 567c36dad, 7858d0e97.
3. Cited by: none in FACTS/POSITIONS; R/sources.md:793 (maintenance file).
4. Exists: rows 487 NEGATIVE-VERIFIED (agrees); 546 NEGATIVE-VERIFIED (agrees); 547 CONTESTED (entry states it as a departure without saying contested). P-60 named.
5. Said elsewhere: R/revival-changes.md:30 (P-60) "A `comprises` clause speaks of values"; F-171 (FACTS.md:334).
6. Curator: none.

## F-176
1. Sources: none (no report holds it; history says Appendix I's entry "When two sizes are the same" is the source). Specification/basic/types-vals-vars.tex and Specification/appendices/grammars/concrete-syntax.tex found.
2. Commit: 1st a74f5a2b7; cut to form c01b3bf30.
3. Cited by: none; R/sources.md:794 (maintenance file).
4. Exists: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/IntNat.java found; `unifyStaticArg` at :127 (cited :126-147; the method ends near :146). Row 767 NEGATIVE-VERIFIED (agrees). F-146, F-222 named (F-146 at FACTS.md:242).
5. Said elsewhere: R/revival-changes.md:83 "**Sizes are compared by their written form (P-55).** The checker checks sizes against their kind, ... Two sizes are equal when they are written alike after ..."; F-146.
6. Curator: none.

## F-223
1. Sources: compile-ladder/rung-popl-examples/REPORT.md section 4 (:107-145) and SKEPTIC.md section 2 (:40-87); rung-duplicates-coverage/REPORT.md sections 1, 8 (:18-62, :233-251); rung-checker-abstract-callsite/REPORT.md section 1 (:14-33), all found.
2. Commit: 1st block "added" 2026-10-14 04:44Z, no commit named; 3ba2d005f at the 06:09Z rewrite; 6 more rewrites to 2026-10-23.
3. Cited by: none; R/sources.md:792 (maintenance file).
4. Exists: compiler_tests XXXNoDuplicatesRule{,SelfPositions,SelfPositionsPlain,Abstract,AbstractSelfPositions,SelfPositionsOperator}.{fss,test}; tests NoDuplicatesRuleWalk, GenericBesidePlainSameDomain, GenericBesideGenericSameDomain (.fss/.test): all found. No ledger row named. P-26, F-281 named.
5. Said elsewhere: grep 'No Duplicates' in R/revival-changes.md: no hit; F-27 (FACTS.md:21), F-80 (FACTS.md:85) on related overload checks.
6. Curator: none.

## F-271
1. Sources: research/extracts/ParkPOPL2019-extract.md sections 6 and 8 (:175-230, :385-480); reviews/decisions-review/popl-recheck.md, found.
2. Commit: added 2026-10-22 12:13Z (clarity pass, no commit in block), split from F-166.
3. Cited by: F-166.
4. Exists: files found. P-48 named.
5. Said elsewhere: F-228, F-141 (FACTS.md:246, :237) on F-bounded instantiation under walk; R/exploring.md:22 lists the paper's extract.
6. Curator: none.

## F-272
1. Sources: compile-ladder/rung-spec-integer-rules/decision-record.md section 4 decision 6 (:37-51), found; Specification/basic/conversions-coercions.tex found (lines :558-574, :641 not re-read; history says lines moved 2026-11-09).
2. Commit: added 2026-10-22 12:13Z (split from F-172); rewritten 7daf51fe8 (2026-11-09).
3. Cited by: none.
4. Exists: ProjectFortress/tests/CoercionMostSpecificRungC.fss found (no .test file listed by ls tests/CoercionMostSpecificRungC*). Row 394 FIXED (agrees: "fixed").
5. Said elsewhere: none found (grep ZZ128|CoercionMostSpecific in FACTS and R/revival-changes.md: only F-272).
6. Curator: none.

## F-273
1. Sources: compile-ladder/rung-spec-overloading/decision-record.md sections 5 and 6 (:93-101, :103-111), found; Specification/basic/overloading.tex found (:312-349 not re-read).
2. Commit: added 2026-10-22 12:13Z (clarity pass, split from F-175).
3. Cited by: none.
4. Exists: compiler_tests/XXXGenericInstanceUnfixed.{fss,test} found. Rows 538, 496 NEGATIVE-VERIFIED (agree).
5. Said elsewhere: F-173 (FACTS.md:336) states the first half of the rule (declaration the static call selected); P-48.
6. Curator: none.

## F-300
1. Sources: Papers/Variance/README.md "Permission and licence" (:43-60), found.
2. Commit: added 2026-10-30 09:39Z, b8ae2a702.
3. Cited by: none.
4. Exists: Papers/Variance/{3290324-popl19w.pdf, 3290324-popl19-TR.pdf, paper.tex, acmart.cls, ACM-Reference-Format.bst, README.md}: all found.
5. Said elsewhere: grep 'Papers/Variance' in R/ and FACTS/POSITIONS: only this entry.
6. Curator: history says "at his word of 09:27:52 UTC on 2026-10-30" (the move into Papers/Variance/), no quote text; Sukyoung Ryu's permission of 2026-10-29 is quoted in the history, not the curator's.

## F-319
1. Sources: compile-ladder/rung-spec-nan-comparison/REPORT.md sections 1, 2, 7 (:12-23, :25-76, :98-106), found.
2. Commit: added 2026-11-05 21:37Z; d7a03f34f (2026-11-06); rewritten again 2026-11-23.
3. Cited by: P-159.
4. Exists: tests/ComparisonAtNaNWalk.fss (no .test by ls); compiler_tests/NativeHelperFamilyFloatCompiled and NativeHelperFamilyRR32Compiled (.fss/.test) found; Documentation/Specification/Prose/Language/Operators/operator-overview.tick found. Row 440 NEGATIVE-VERIFIED (agrees: walk departs at 0/0). Specification/basic/operators/opr-overview.tex found.
5. Said elsewhere: grep 'NaN|0/0' in R/revival-changes.md, R/library.md: no hit; F-52, F-90 mention NaN in other contexts.
6. Curator: none.

## F-345
1. Sources: compile-ladder/rung-static-numerals-spec/REPORT.md "What changed and why" (:13-34), found; history also cites postmortem-2026-11-09-numerals/design-snapshot.md "3. The design, as reflected back to him and confirmed" (not checked).
2. Commit: added 2026-11-09 07:23Z; rewrites a2be3e9e1 (2026-11-10), 0a83a7049 (2026-11-23).
3. Cited by: none; R/sources.md:1238 (maintenance file).
4. Exists: Specification/basic/expressions/literals.tex, constant.tex, basic-lib/numbers.tex found; Specification/appendices/changes.tex found (entries revival-numerals etc. not grepped). No ledger row numbers named. `ant genSource` / `ant tex` not run.
5. Said elsewhere: R/revival-changes.md:93, :95, :97 (numeral converts where it stands; "A place fixes a type when its declared type has a coercion from the numeral type"); F-169.
6. Curator: history of 2026-11-09 17:40Z says the design was "reflected back to him and confirmed" (P-174, P-176); no quote with time beyond that.

## F-359
1. Sources: reviews/carriers-ways-2026-11-13.md "What the team's texts say, by provenance" (:313-373), found.
2. Commit: added 2026-11-13 23:38Z, no commit in block.
3. Cited by: none.
4. Exists: commits b2880c05c2, 76c267f987, 6896886fbc exist; ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss, Papers/Implementation/TypeMapping.tex, ProjectFortress/src/com/sun/fortress/compiler/optimization/Unbox.java found. The dated claims and the git -S command not re-run.
5. Said elsewhere: grep 'traits to nest|FZZ32|special cases' in FACTS, R/library.md, R/compiler.md: no hit for this claim (F-301 FACTS.md:26 and F-37 only share terms).
6. Curator: none.

## F-371
1. Sources: reviews/omitted-types-intent-2026-11-16.md "What the designers' texts and code say" (:284-322) and "The team's own examples that leave types out" (:235-282), found.
2. Commit: added 2026-11-16 12:29Z, a55274470.
3. Cited by: none.
4. Exists: row 405 NEGATIVE-VERIFIED (agrees: gap named). F-169 named.
5. Said elsewhere: F-370 (FACTS.md:175) "The compiled checker takes each type that a component's declaration leaves out from the exported api's declaration of it."; F-266 (FACTS.md:122).
6. Curator: none.
