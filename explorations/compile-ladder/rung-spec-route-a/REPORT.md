# Rung S: the specification revised for route A

problem: `Specification/basic/trait-parameters.tex:339-340` at `6030e4b36` states the opposite of the rule ("Trait declarations are allowed to extend other instantiations of themselves"), while the compiled checker refuses a type below two different instantiations of one parameterized trait, "Types Parent[\ZZ32\] and Parent[\String\] exclude each other.  Child must not extend them." (`explorations/compile-ladder/rung-spec-route-a/probes/examples/SpecDeclRule.compile.txt:2`; the judgement's `explorations/reviews/spec-refused-examples/captures/DoubleInstance.compile.txt:2`); the example printed at `:339-351` itself stops at name resolution on both paths, "T is undefined" (`explorations/reviews/spec-refused-examples/captures/SpecCovariant.compile.txt:2`, `SpecCovariant.walk.txt:2`)
spec: Specification/basic/types-vals-vars.tex:185-189 at 6030e4b36 (the relations are "the smallest ones that satisfy all the properties given", and no property makes two instantiations exclude each other); beside it, Documentation/Specification/Prose/Language/types.tick:353-377.
precedent: Specification/basic/traits.tex:286-292 (the Not allowed form); explorations/reviews/spec-change-form.md:480-493 (layered form, S1 option 1); the revival's mdframed draft-note box, the callout's shape (Specification/fortress/fortress.tex:46-62).
deviation: new \revision macro, blue, in both builds (Specification/fortress/fortress.tex:76-92); new typeset blocks are from today's fortify.el, which writes \KWD{kw}\: where the 2009 blocks have a plain space (Specification/basic/trait-parameters.tex:470); the new Empty[\T\] bodies are typed and throw NotFound so that it runs (Specification/basic/trait-parameters.tex:463-468); the rule uses the spec's words "parameterized trait" and "the same type" (Specification/basic/types-vals-vars.tex:218-224); the calculi are named as not yet revised, the stop (Specification/appendices/changes.tex:378-386).
historical: `Specification/basic/types-vals-vars.tex`, `Specification/basic/traits.tex`, `Specification/basic/trait-parameters.tex`, `Specification/basic/exceptions.tex`, `Specification/basic-lib/convenience.tex`, `Specification/basic-lib/exception.tex`, `Specification/basic-lib/objects.tex`, `Specification/appendices/internal-document.tex`, `Specification/appendices/changes.tex`, `Specification/fortress/preamble.tex`, `Specification/fortress/fortress.tex`, `Specification/fortress.pdf`; the rule that asks for this line, with the PDF among S's files, is `explorations/coordinator/CLIMB-BATCH-5.md:269`

## 0. How this report was written

The subagent harness refused the worker's write of this file ("Subagents should return findings as text"); `record.md` and `decision-record.md` were written and committed on the branch. This report was composed at the gather of climb batch 5 (2026-09-26) from the worker's structured result (run `wf_88172730-ebe`, `rung:S` at `2b29c077c`), with the skeptic's four required corrections made (`SKEPTIC.md`; the batch record, rung S). The provenance block is the worker's, carried in its result's precedent field, with the `problem:` and `historical:` lines made exact as the skeptic's fourth correction asks. Line citations of the three files the gather edited for the first correction are re-anchored to the landed text (`types-vals-vars.tex`'s callout `:238-250`, `changes.tex:18-416`, `preamble.tex:54-64`). What the gather changed is in section 13. The full account of each passage, its original text, its reason and route C is the decision record, `explorations/compile-ladder/rung-spec-route-a/decision-record.md`.

## 1. What changed

Rung S revised Specification/ for route A in the team's layered form, on wip/rung-spec-route-a (b2b19ff38 list first, dcfc12f2d edits+PDF, 173c0e99a and 2b29c077c record); nothing was inherited, the branch was empty at 6030e4b36.

Instantiation exclusion is stated once in Luchangco's two parts, over every static argument except operator arguments: types-vals-vars.tex:218-250 and traits.tex:299-324. A where-clause variable may not appear as a static argument in an extends clause (trait-parameters.tex:339-349). Luchangco's notes are answered at traits.tex:181-185.

E1, E2, E3, Nothing and Object's algebraic clause are kept as "Not allowed", each with the library's shape beside it: widen[\T, S extends T\], Empty[\T\], value object Nothing[\T\] with the defaults Nothing[\String\] and Nothing[\Exception\], and trait Object extends Any. Tuple follows Object. The internal appendix gets one callout each at E8, E9 and E10.

16 \revision callouts print in both builds (fortress.tex:76-92). Appendix I gets a revival section with the original from the Working Draft of February 2011 and route C for every change (changes.tex:18-416). The front matter gets one paragraph (preamble.tex:54-64) and the title page one line (fortress.tex:136). The decision record is explorations/compile-ladder/rung-spec-route-a/decision-record.md.

Both builds pass. At 6030e4b36, genSource took 49 s and tex 40 s, 600 pages; after the edit, 54 s and 38 s, 610 pages, with no undefined reference. No tracked file changed. The base-vs-edit pdftotext diff has 29 hunks, each a revised passage, a callout, the appendix, the front matter or the title. The committed PDF differs from the base build only in Part IV, which is rendered from 15 later .fsi commits. Specification/fortress.pdf is the edited build's output.

I ran the new examples both ways. The widening function, Empty[\T\] and the Nothing[\T\] shape run on both paths. The rule's Child example is refused compiled and runs under walk. The library's Nothing[\String\] is refused compiled (row 331).

Stop met, per passage: Appendix A's three calculi admit what the rule refuses (Where Core, ACFFD, Basic Core). No inventory had them, and neither the rule nor the verdicts settle their text. I report them to Pavol with three candidates, and Appendix I names them as not yet revised. By the batch rule this holds the commit stage's push until he chooses. The rest lands, as rung C did in batch 4.

The three number chapters and Specification-1.0-frozen/ are untouched.

REPORT.md was refused by the harness ("Subagents should return findings as text"); its content is carried in these fields. record.md and decision-record.md were written.

One defect found on the way goes to home 3: an untyped parameter in a method implementing an abstract one is refused by both paths (walk InterpreterBug), and the specification is silent. It is row 405 (its provisional number, kept as final).

The checker count is 125 and was not run; this rung touches neither the checker nor Library/.

Files:

- Specification/basic/types-vals-vars.tex:218-250 (instantiation exclusion and its callout)
- Specification/basic/traits.tex:181-185 (callout answering Luchangco's notes at :174-180, :195-197 base), :299-324 (the rule on declarations, Child example Not allowed, callout)
- Specification/basic/trait-parameters.tex:339-485 (the where-clause sentence :339-349; E1 kept Not allowed, invariance, widening function, covariant callout :351-397; E2 Not allowed with closing sentence :400-437; E3 Not allowed with Empty[\T\] :440-485)
- Specification/basic/exceptions.tex:111-137 (defaults Nothing[\String\], Nothing[\Exception\], callout)
- Specification/basic-lib/convenience.tex:34-79 (value object Nothing[\T\], Maybe comprises {Nothing[\T\], Just[\T\]}, original Not allowed, callout)
- Specification/basic-lib/exception.tex:21-29 (defaults, callout)
- Specification/basic-lib/objects.tex:83-88, :127-172, :174-194 (Object and Tuple extend Any alone; Object original Not allowed; three callouts)
- Specification/appendices/internal-document.tex:361-366, :421-426, :522-527 (one callout each at E8, E9, E10)
- Specification/appendices/changes.tex:18-416 (Appendix I section: 8 entries I.1.1-I.1.8, not-yet-revised I.1.9, route C I.1.10)
- Specification/fortress/fortress.tex:76-92 (\revision macro), :136 (title-page line)
- Specification/fortress/preamble.tex:54-64 (front-matter paragraph)
- Specification/fortress.pdf (re-rendered, 610 pages)
- new: explorations/compile-ladder/rung-spec-route-a/decision-record.md, record.md
- new: explorations/compile-ladder/rung-spec-route-a/probes/build/{base,edit}-{genSource,tex}.txt, base-vs-edit-pdftotext-diff.txt, committed-vs-base-pdftotext-diff.txt, norm.sh
- new: explorations/compile-ladder/rung-spec-route-a/probes/scan/{dupinst.py,dupinst.txt,extends-where.txt,instantiation-prose.txt,texfiles.txt}
- new: explorations/compile-ladder/rung-spec-route-a/probes/examples/{run.sh, SpecDeclRule, SpecWiden, SpecEmptyTyped, SpecEmptyUntyped, SpecNothingT, SpecNothingLib}.fss with .walk.txt/.compile.txt/.run.txt

At the gather, the skeptic's first correction added three statements of the checker's coverage and re-rendered the PDF (section 13).

## 2. Where it belongs, and the precedent search

Where it belongs (rule 1): the prose chapters. The map's rows are exclusion (map/spec-to-implementation.md:194), static parameters (:37), and where clauses at basic/trait-parameters.tex:284 plus Appendix A calculi/where/ (:237). The last one names the calculi, which no inventory reached.

Precedent search (rule 2): the spec revises a refused example one way only, keeping it marked (* Not allowed! *) beside the allowed form (traits.tex:269-275, :286-292, twice), and every kept original follows it. The team's change machinery (Appendix I, changes.tex:12-16, empty; the front-matter figure, preamble.tex:12-52) is used as S1 decided. New typeset blocks were regenerated from their % source with fortify (Fortify/fortify-doc.txt:146-172, via a batch driver that stayed in tmp/). Kept originals were not regenerated: the Not allowed line was added by hand and their typeset lines are byte for byte the team's. The Exception block was edited by hand so that the % source's typo Maybe[\Exception)\] is not regenerated into the correct typeset line.

## 3. The specification and the decisions it rests on

- Specification/basic/types-vals-vars.tex:185-189, :208-216 (base): the relations are the smallest satisfying the properties given; the trait-type exclusion properties the rule is placed beside
- Specification/basic/trait-parameters.tex:339-351, :354-380, :383-399 (base): E1, E2, E3, stating the opposite; frozen copy same lines
- Specification/basic/trait-parameters.tex:223-228: an operator argument names the operator a subtrait inherits (why operator arguments do not count)
- Specification/basic/trait-parameters.tex:82-86: nat/int parameters instantiated at runtime with numeric values (sizes count)
- Specification/basic/trait-parameters.tex:15-17: the chapter's examples are not tested nor run
- Specification/basic/traits.tex:174-180, :195-197: Luchangco's notes on self-extension through hidden type variables
- Specification/basic/traits.tex:218-222, :286-292 (base): exclusive traits, no trait can extend them both; the Not allowed form
- Specification/basic/traits.tex:509-514 (base): an object must define inherited abstract methods; abstract declarations may not omit parameter types (row 405's silence)
- Specification/basic/functions.tex:134-143: a parameter may be written without a declared type
- Specification/basic/objects.tex:84-86 and types-vals-vars.tex:221-224 (base): objects have no excludes clause; an object trait type excludes every non-supertype
- Specification/basic-lib/convenience.tex:34-53, basic/exceptions.tex:111-130, basic-lib/exception.tex:21-24 (base): the refused Nothing and its bare uses
- Specification/basic-lib/objects.tex:80-84, :127-141, :144-158 (base; frozen :78-82, :125-139, :142-156): Object and Tuple's algebraic clauses
- Specification/advanced-lib/algebraic-constraints.tex:666-667, :1378-1380, :1580-1584: Commutative extends EquivalenceRelation[\T,=\] (why Object's clause is refused)
- Specification/appendices/internal-document.tex:305-360, :363-414, :483-509: E8, E9, E10
- Specification/appendices/calculi/where/syntax.tex:82-91, where/static.tex:328-342; acffd/static.tex:46-87; basic/calculus.tex:16-19, basic/static.tex:263-272: the calculi (reported)
- Documentation/Specification/Prose/Language/types.tick:353-377 (instantiation exclusion in two parts), :320-339 (covariant modifier), :357-360, :191-195
- Papers/Types/exclusion.tick:141-152; Papers/Types/paper.tick:213-221 (the rule's name and paper)
- explorations/coordinator/POSITIONS.md:85, :92, :109-:132, :145-:147 (the decisions)
- explorations/reviews/spec-refused-examples-judgement.md sections 3.1-3.5, 4, 5, 7 (the verdicts)

## 4. Decisions

- Callout macro \revision (blue bar, pale blue ground, small-caps head 'Revised by the 2026 revival / see Section I.1.n'), defined outside \ifrelease so it prints in both builds; rejected: the draft notes' rust style with another label, because the two must be told apart
- Title-page line 'with the changes of the 2026 revival, listed in Appendix I' added after the date so it prints in both builds; rejected: rewriting the draft-only date line
- Front-matter paragraph wording (preamble.tex:54-64) is the rung's
- Originals kept in the body as Not allowed only for refused declarations (E1, E2, E3, Nothing, Object); the exception defaults, Tuple (not refused) and prose sentences are rewritten in place and quoted in Appendix I and the record; rejected: every original in the body (the Exception trait printed twice, a Tuple marked Not allowed that the rule does not refuse)
- Kept originals' typeset lines left byte for byte, with the Not allowed line added by hand; new blocks generated by fortify; rejected: regenerating the originals, which would change their rendering
- Luchangco's two notes kept and answered by one callout; rejected: replacing them
- Where-clause section order kept (E1, E2, E3) with the rule's sentence at its head naming E2 as the reason; rejected: moving E2 first
- The new Empty[\T\] printed typed, with throw NotFound (declared in both libraries) and Cons[\T\](x, self), so it runs on both paths; rejected: the draft's untyped bodies and throw Error under the new header, which both paths refuse (SpecEmptyUntyped)
- The size case's status stated by ledger row 402, so the text is true whether or not rung Z lands; rejected: saying the checker does or does not compare sizes
- Appendix A's calculi named in Appendix I as not yet revised, pending Pavol; rejected: silence until he decides (a discrepancy left silent in the PDF)
- The rest of the rung lands with the calculi stop met, per passage (the stop's text: 'reports it and does not choose'; precedent rung C, batch 4); rejected: reporting the whole rung stopped
- The Appendix I section is set \sloppy and paths use \nolinkurl; rejected: \texttt, which ran past the margin
- Did not write REPORT.md under another name after the harness refused it; its content is carried in this result

## 5. The recorded failure and the recorded pass

Recorded failure: explorations/compile-ladder/rung-spec-route-a/probes/build/base-vs-edit-pdftotext-diff.txt:50. This is the base build's text (6030e4b36, 600 pages, logs base-genSource.txt and base-tex.txt, both BUILD SUCCESSFUL): "< Trait declarations are allowed to extend other instantiations of themselves. For example, we can write:" (and :68, "< trait declaration is legal:"). The compiled checker refuses that shape: explorations/compile-ladder/rung-spec-route-a/probes/examples/SpecDeclRule.compile.txt:2, "Types Parent[\ZZ32\] and Parent[\String\] exclude each other.  Child must not extend them." Under walk it runs: SpecDeclRule.walk.txt:1, "f took a Parent[String]". No test can go red for a prose edit (precedent: CLIMB-BATCH-3.md:114).

Recorded pass: explorations/compile-ladder/rung-spec-route-a/probes/build/edit-tex.txt:11362 "[exec] Output written on fortress.pdf (610 pages, 2017812 bytes)." and :11365 "BUILD SUCCESSFUL" (edit-genSource.txt:211 BUILD SUCCESSFUL; the edited log's fortress.log has 0 'LaTeX Warning: Reference|multiply defined'). The text diff is explorations/compile-ladder/rung-spec-route-a/probes/build/base-vs-edit-pdftotext-diff.txt, 29 hunks, all revisions, callouts, the appendix, TOC lines, front matter or title. The new examples run on both paths: SpecWiden (.walk/.run 'dog'), SpecEmptyTyped ('2','0' both), SpecNothingT ('true','false' both).

At the gather, after correction 1: `explorations/compile-ladder/rung-spec-route-a/probes/build/gather-genSource.txt` and `gather-tex.txt`, both `BUILD SUCCESSFUL`, 610 pages, no `LaTeX Warning: Reference` in the log; `Specification/fortress.pdf` is that build's output, and `probes/build/base-vs-edit-pdftotext-diff.txt` is regenerated against it (29 hunks, the base build unchanged). Against the worker's edited build the gather's differs in the three corrected passages only (the front matter, the callout of the rule, and Appendix I's entry on the rule).

## 6. The examples run both ways

- SpecDeclRule (the rule's Child extends {Parent[\ZZ32\], Parent[\String\]}): walk runs it ('f took a Parent[String]'), compiled refuses it. The specification as revised favours the compiled side; walk not checking the rule is the known walk gap (FACTS, the exclusion entry)
- SpecNothingLib (the library's Nothing[\String\] as a Maybe[\String\]): walk prints 'false', compiled refuses it with 'Unexpected type for a singleton object reference'. The revised specification (and row 331's decision) favours walk / the one library; the compiled prelude's marker Nothing is row 331 and closes at the switch-over
- SpecEmptyUntyped: both paths refuse, differently (compiled static error vs walk run-time InterpreterBug). The specification is silent (row 405)
- SpecWiden, SpecEmptyTyped, SpecNothingT: both paths agree

## 7. Defect homes

- Appendix A's calculi (Where Core types where-clause variables in supertypes; ACFFD admits a self-extension at the bound; Basic Core claims all its programs are valid Fortress) contradict the rule. Not an implementation defect: a passage of the standard whose new text neither the rule nor the verdicts settle, so it is reported to Pavol under the brief's stop with three candidates (decision-record.md section 4.2). Not one of the three homes; the stop holds the push
- An untyped parameter in a method implementing an abstract one is refused by both paths: compiled 'Missing parameter type for x', walk InterpreterBug 'MethodClosure cons(_:T):List[\T\] ... has neither body nor def instanceof Method'. Home 3, because the specification is silent: functions.tex:134-143 permits untyped parameters and traits.tex:509-514 requires the object to define the abstract method, but nothing says the untyped parameter takes its type. Probe at explorations/compile-ladder/rung-spec-route-a/probes/examples/SpecEmptyUntyped.fss with .walk.txt and .compile.txt; ledger row 405, whose provisional number is its final one (record.md)

At the gather, row 405 is widened to the scope the skeptic measured (its second correction): the compiled path refuses every untyped value parameter, and `walk` fails only on a method that implements an abstract declaration (`decision-record.md` section 3.10; the ledger row).

## 8. The stop: the calculi of Appendix A

Appendix A's three calculi admit what the rule refuses: the calculus with `where` clauses types a `where`-clause variable in a supertype, the calculus with an acyclic hierarchy admits a self-extension at the parameter's bound, and the basic calculus claims that all its valid programs are valid Fortress. No inventory had them, and neither the rule nor the judgement's verdicts settle their new text, which is the brief's stop "A passage whose new text neither the rule nor the judgement's verdicts settle". The rung reports them with three candidates and does not choose (`decision-record.md` section 4.2): (1) a callout at each calculus with the rules untouched, the rung's reading; (2) new premises in the rules, which reopen the soundness claims (`Specification/appendices/calculi/where/static.tex:478-480`, `Specification/appendices/calculi/acffd/static.tex:370-373`); (3) nothing beyond the Appendix I paragraph that names them as not yet revised (`Specification/appendices/changes.tex:378-386`). The stop is per passage, so the rest lands, as rung C did in batch 4; the skeptic confirmed that the Appendix I paragraph is common to all three candidates and that the stop holds the push.

## 9. What was not done

- The stop is met, not lifted: Appendix A's three calculi are not revised. Pavol's candidates are (1) a callout at each calculus with the rules untouched (the rung's reading), (2) new premises in the rules, which reopen the soundness claims at where/static.tex:478-480 and acffd/static.tex:370-373, (3) nothing beyond the Appendix I line. This holds the batch's push per the batch rule
- REPORT.md is not written: the harness refused it. Its content is in this result (the provenance block in precedentSearch; builds, diffs, probes and decisions in the other fields), and the decision record's section 8 carries the checks
- The three number chapters are deferred to the flattening rung (POSITIONS.md:132), listed in Appendix I.1.9
- The stray \tracingcommands line at Specification/basic-lib/objects.tex:17 stays (the brief), which makes the build's fortress.log about 377 MB; the log is not kept
- Not traced: where either path would take an untyped implementing parameter's type from (row 405)
- Row 404's expected-failure tests are not written (not this batch's, CLIMB-BATCH-5.md section 5)
- Checker count not run (125 by construction); the gate is the coordinator's

## 10. The tracked-path check

Ran the brief's check over REPORT.md (absent, refused by the harness) and record.md. The only line is 'MISSING explorations/compile-ladder/climb-batch-5/RECORD.md', which record.md names as the gather's file to write; it is not a capture. No UNTRACKED line. A wider check resolved every backticked path in record.md and decision-record.md. The remaining unresolved names are Specification/-relative names in section headings and the ledger's basic/... convention. I rewrote the calculi and route-c paths in full (2b29c077c). git status is clean apart from the ignored tmp/; HEAD = origin/wip/rung-spec-route-a = 2b29c077c.

At the gather the check was run over this file, `record.md` and `decision-record.md` (the batch record, "After the last commit").

## 11. Machine and timings

Every build log opens with its machine line: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`, and the load average at the start. `./ant genSource`: 49 s at the base (load 2.67), 54 s after the edit (7.47), 44 s at the gather (0.75); `./ant tex`: 40 s (1.87), 38 s (8.18), 44 s (0.97) (`probes/build/base-*.txt`, `edit-*.txt`, `gather-*.txt`).

## 12. What comes back to Pavol

1. The calculi of Appendix A (section 8): his choice among the three candidates; the stop holds the batch's push until he chooses.
2. The revision's form choices, each reported as a decision (section 4): the `\revision` callout's look and name, the front-matter paragraph and the title-page line.
3. Row 405, found on the way: an untyped value parameter is refused compiled wherever it appears, and the specification's own `Cons` fails on both paths; home 3, because the specification says the type is inferred and gives no rule.
4. Row 406, from the skeptic: the checker does not compare boolean arguments, which the revised text counts; a `bool` case in `cP` and its expected-failure test are owed in a later rung. The test was added at the merged-diff review's repair: `ProjectFortress/compiler_tests/XXXBoolExtendsTwice` (`compile-ladder/climb-batch-5/JUDGE-review.md`, finding 2).

## 13. At the gather

- This report was composed (section 0).
- Correction 1, the checker's coverage stated as measured: Appendix I's entry on the rule now says the checker does not compare `bool` arguments, though it accepts boolean parameters written out (row 406), and cites `\secref{boolparams}` beside `\secref{natparams}` (`Specification/appendices/changes.tex:82-91`); the callout at the rule says the checker enforces it "for type arguments" and points at that entry (`Specification/basic/types-vals-vars.tex:247-248`); the front-matter paragraph says "for type arguments" (`Specification/fortress/preamble.tex:57-60`). The specification was rebuilt with `./ant genSource` and `./ant tex`, the PDF copied to `Specification/fortress.pdf`, and `probes/build/base-vs-edit-pdftotext-diff.txt` regenerated. `record.md`'s note on row 402 says that `checkP` accepts boolean pairs and that rung Z's size case leaves them open, and the decision record's section 3.1 no longer says booleans "follow once the checker supports boolean parameters".
- Correction 2: row 405 in `record.md` and the ledger, and the decision record's section 3.10, give each half its measured scope, show the grep (`probes/untyped-param-grep.txt`), and engage `Specification/preliminaries/overview.tex:75-76`, `Specification/basic/components/type-inference.tex:44-45` and the specification's own `Cons` at `Specification/basic/objects.tex:224-226`.
- Correction 3: the `FACTS.md` line gives the machine for its build timings and names the moved margin note beside Part IV.
- Correction 4: the provenance block's `problem:` and `historical:` lines, above.
- The line citations of the decision record, `record.md` and this report that the gather's three edits moved are re-anchored: `types-vals-vars.tex` callout `:238-249` to `:238-250` and `:254-257` to `:255-258`, `changes.tex:18-414` to `:18-416`, `:363-374` to `:365-376`, `:376-384` to `:378-386`, `preamble.tex:54-63` to `:54-64`. The skeptic's `SKEPTIC.md` keeps its author's line numbers and ends with a note giving the moved ones.
