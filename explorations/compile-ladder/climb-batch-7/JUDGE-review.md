# Climb batch 7: the judge's ruling on the merged-diff review

Written 2026-09-28 on `main` at `4c92ea034`. The merged-diff review refused approval with two blocking findings (`explorations/compile-ladder/climb-batch-7/RECORD.md:348-349`, "For the judge"). This ruling reads the merged tree, the review and the rungs' records. It builds nothing and runs no test; the only commands run were reads, `git log`, `git show`, `git blame` and two `git merge-tree` simulations, which write no ref and touch no working tree. Every line number is at `4c92ea034` unless it says otherwise.

**Decision: repair, in `explorations/` only.** Finding 1 stands as landed: nothing is rewritten. Finding 2 is not upheld as a missing `XXX` test. The specification's text for the binding form `typecase x = e of` is unfinished, since the section's own note marks it for revision and the implementers replaced the form. So the defect's home is 3, the probes and row 460 that already exist. What is owed is the record saying so: four places call the binding form "settled", and the typecase question goes to Pavol as `judge-review.1`. No path outside `explorations/` changes, so this repair does not by itself call for another gate run.

## What was read

- The batch's commits: `de22fd928` (B), `952892a00` (H), `f3b62bc83` (A) and `4c92ea034` (the review's corrections). Their messages and stats, and the test-message hunks of `f3b62bc83` and `952892a00`. `origin/main` is at `4a2b9385c`, so all four commits are local.
- The batch record: the gather's decision on "provisional" (`RECORD.md:230`), the merged-tests captures (`:272-280`), the tracked-path check (`:301`) and the review (`:325-356`).
- The ledger at `952892a00` (`git show 952892a00:explorations/fortress-gap-ledger.md`, `:466-479`), and row 460 at `4c92ea034` (`explorations/fortress-gap-ledger.md:471`).
- Rung H's `REPORT.md` sections 15 to 17 (`:136-166`), its `SKEPTIC.md:86`, `FACTS.md:65` and `:75`, and `PLAN.md:160-185`.
- The typecase section, `Specification/basic/expressions/typecase.tex:12-160`, and its Working Draft copy, `Specification-1.0-frozen/basic/expressions/typecase.tex:15`, `:55-62`.
- The grammar copies: `Specification-1.0-frozen/appendices/grammars/rats/DelimitedExpr.rats:29`, `:65-68`, and `Specification/appendices/grammars/concrete-syntax.tex:1019`, `:1058`.
- The note and the release switch: `Specification/fortress/fortress.tex:24-36` and `:58`, and `Specification/fortress/build.xml`, which has no "release".
- `Specification/appendices/future.tex:95-145`, on the pattern-matching proposals.
- The parser, `ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:30-45`, `:118-140`, `:230-252`, and its history: `fd00b4351` (2009-02-19), and `26718e298`, the conversion's root commit of 2011-12-06.
- The AST, `ProjectFortress/astgen/Fortress.ast:594-607` and `:1659-1664`. The compiled checker's typecase, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:322-341` and `:644-666`.
- The team's typecase code: `Library/CompilerLibrary.fss:40-49`; `ProjectFortress/compiler_tests/Compiled5.bi.fss:21-24`, `Compiled6.av.fss:16-19` and `Compiled5.t.fss:18-21`.
- Pavol's decisions: `POSITIONS.md:34` (2026-09-19, the XXX obligation), `:58` (2026-09-23, how the exclusion fork is weighed), `:120` (2026-09-27, the stops a batch record reserves) and `:127` (2026-09-27, a numeral's type). The numeral note, `Specification/basic/expressions/literals.tex:87-96`.
- The precedent: batch 6's judge on a like finding, `explorations/compile-ladder/climb-batch-6/JUDGE-review.md:21-31`. Rung tryatomic's reading of the same section, `explorations/compile-ladder/rung-tryatomic/REPORT.md:266-271`, `:405-417`.
- The briefing slices for H, A and B, as the brief lists them. A's key `code:Library/FortressLibrary.fss#T,nat s0, nat s1, nat s2..(f:(ZZ32,ZZ32)->T)` is not found on the merged tree, because rung A renamed that form. This is expected.

## Finding 1: A's commit carries H's "(provisional)" fix

**Ruling: it stands.** Nothing in `952892a00` or `f3b62bc83` is rewritten. The finding is not blocking.

- **The facts are as the review states.** `f3b62bc83` removes "(provisional)" from five messages of `ProjectFortress/tests/ExclusionRemainderRungH.fss` (`:24-25`, `:29-30`, `:55`) and two of `XXXLexicoUnorderedRungH.fss` (`:8-9`). Nothing A moves causes it.
- **At `952892a00` the citations are right. Only a word is stale.** At that commit the ledger's rows 456 and 457 are H's own two rows (`git show 952892a00:explorations/fortress-gap-ledger.md`, `:467-468`). The seven messages name the right rows, and "(provisional)" is the only thing wrong. Batch 6's judge left a commit standing for its cited lines (`climb-batch-6/JUDGE-review.md:27`). Here no line is wrong.
- **The carry is declared, not hidden.** A's message says '"(provisional)" dropped from rung H's test messages'. Its `historical:` line names "ExclusionRemainderRungH.fss and XXXLexicoUnorderedRungH.fss (assert messages only)". The gather's record gives the reason (`RECORD.md:230`).
- **Moving the lines does not make the rungs independently revertible.** Simulated with `git merge-tree --write-tree --merge-base=<commit> 4c92ea034 <commit's parent>`:
  - A revert of H alone conflicts in five record files: `RECORD.md`, `FACTS.md`, `PLAN.md`, the ledger and the handover. It also hits a modify/delete conflict on H's two tests.
  - A revert of A alone conflicts in three record files.
  - After the move, a revert of H would still conflict in the same five files. Reverting one rung of this batch is a hand merge either way, and the two tests' conflict resolves only one way.
- **The move has a cost.** Rebuilding `952892a00` and `f3b62bc83` orphans both hashes. Ten committed lines in eight files cite them:
  - `RECORD.md:301`, `:327` and `:348`;
  - the four `climb-batch-7/merged-tests/*-threads1.txt:1`;
  - `rung-tabulate/probes/build/gather-genSource.txt:1`, `gather-tex.txt:1` and `gather-vs-base-pdftotext-diff.txt:1`.

  Seven of these are capture headers that record where a run was made. Rewriting a capture after the fact is worse than the defect, and once `main` is pushed, a header that is left alone cites a commit no one can fetch.
- **Where the review is right.** On the principle: a correction to one rung's own fold belongs in that rung's commit, as the gather itself wrote (`RECORD.md:230`). The gather could have had it for free. It found the word on the merged-tree run, made while H's commit was still `HEAD` ("on main at 952892a00 with rungs B, H and A applied", `climb-batch-7/merged-tests/ExclusionRemainderRungH-threads1.txt:1`), so an amend of H's commit before staging A's would have cost nothing. That is the lesson for the next gather: a fix to an earlier rung's files, found before the next rung's commit, is amended into the earlier commit while it is still `HEAD` and unpushed.

## Finding 2: the binding form's home

**Ruling: the binding form's defect has home 3, not home 2. No `XXX` test is written. Row 460's shorthand narrowing stays settled, as the review noted.** This is a decision under a specification that is unfinished on the point. It is reported to Pavol as `judge-review.1`.

**What was measured.** Both paths refuse `typecase rp = p of` and `typecase (rp, rq) = (p, q) of` with "Variable rp is not defined" (`explorations/compile-ladder/rung-exclusion-remainder/probes/typecase/typecase-forms.txt:94-136`; `TcBind.fss`, `TcTuple.fss`). All are tracked.

**What the specification says, and how much weight it carries here.**
- **The rendered text gives the form.** The grammar reads `typecase TypecaseBindings of`, where `TypecaseBindings ::= TypecaseVars (= Expr)?` (`Specification/basic/expressions/typecase.tex:53-62`). The prose gives its meaning (`:77-93`). The grammar appendix repeats it (`Specification/appendices/grammars/concrete-syntax.tex:1019`, `:1058`).
- **The same section is flagged for revision, and has been since the Working Draft.** The note reads "This section should be revised according to the changes in the pattern matching proposal." It is at `typecase.tex:15` and, with the same text and the same grammar, at `Specification-1.0-frozen/basic/expressions/typecase.tex:15` and `:55-62`. The proposals it means are named in the future-work appendix. They extend the left-hand side of a typecase clause into a binding place (`Specification/appendices/future.tex:108-114`).
- **The implementers then replaced the binding form.**
  - The parser still took `typecase TypecaseBindings (of / do / in)` on 2009-02-19 (`fd00b4351`). So did the Working Draft's grammar copy (`Specification-1.0-frozen/appendices/grammars/rats/DelimitedExpr.rats:29`, `:65-68`).
  - By 2011-12-06 (`26718e298`, the root commit the conversion gives that date) the parser took an expression, as it does now: `typecase w a1:Expr w a2:(of / do / in)` (`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:122`, comment `:43`). It also takes a per-clause `(Id :)? TypeOrPattern` (`:237-251`).
  - The AST node documents `typecase Expr of TypecaseClauses` and keeps no bound identifiers (`ProjectFortress/astgen/Fortress.ast:594-607`). Its clause node carries the name (`:1659-1664`).
  - The compiled checker adds to a clause's environment only the clause's name and its pattern variables (`Misc.scala:322-341`).
  - Under this grammar, `typecase x = e of` is not a missing form. It is a typecase on the equality `x = e`, and that is exactly what both paths report.
  - The one trace of the old form is a stale error message at `DelimitedExpr.rats:138` ("Use a binding such as 'x = self' instead"), which rung tryatomic already noted (`rung-tryatomic/REPORT.md:414-417`).
- **Pavol's weighting settles this kind of conflict.**
  - On 2026-09-23 he ruled that the late, implementation-informed positions outweigh the specification's earlier text where they conflict (`POSITIONS.md:58`).
  - On 2026-09-27 he applied the same principle to a numeral's type, "the implementers' later word weighing more than the unfinished text" (`POSITIONS.md:127`). There, the unfinished state was shown by a `\note`, "We need to describe the Numeral type hierarchy" (`Specification/basic/expressions/literals.tex:87-96`).
  - Typecase's binding form is the same case. It is Working Draft text under a note that marks it for revision, and the implementers' grammar gives the same spelling a different meaning.
- **The review's counter-argument does not hold for this document.** It argued that "a `\note` is not rendered in a release" (`Specification/fortress/fortress.tex:35-36`).
  - The committed specification is not a release build. `\ifrelease` is set only when `\release` is defined (`fortress.tex:24-29`). The line that would force it is commented out (`:33`), and `Specification/fortress/build.xml` defines nothing of the kind. So the draft renders its notes (`:58`), and the committed `Specification/fortress.pdf` does too.
  - The batch's other use of that argument is a different case. `FACTS.md:65`, on `traits.tex:241-246`, discounts a note that would add a refusal the rendered text lacks. A note may not add a rule. This note adds none; it says the text around it is pending revision.

**The home.** A deferred defect goes to home 2 only when the specification settles it (`POSITIONS.md:34`, 2026-09-19; the shared prefix's three homes). Here the text is unfinished, so the home is 3: a probe with a committed `.txt` capture, and a ledger row that cites it, "the record saying the silence is the reason" (`explorations/coordinator/climb-batch-workflow.md:33`). The probes and row 460 exist. What is missing is the record giving that reason. Rung H's `REPORT.md:145` and `:164` call the binding form "settled", and so do `FACTS.md:75` and row 460's specification cell.

**Candidates weighed.**
- **(a) Home 2 now**, an `XXX` walk test with the binding form, as the review asked. It would add a source path and a `testSystem` file (424). It would gate a form the implementers removed. If the section is revised to the implemented grammar, which is what its note asks for, the test must be deleted, and deleting a test is a standing stop for Pavol. The first-`XXX` demonstration the prefix requires would also need a local parser change to go red.
- **(b) Home 3 now, and the question to Pavol.** It needs no source change. If he keeps the binding form, the reversal is one file.
- **(c) Close the binding half of row 460 as "not a defect".** This would go ahead of Pavol, since the rendered text still states the form.

(b) is executed. It is the reversible choice, and it follows his weighting.

**The shorthand narrowing.** "Within that clause, the static type of the variable is the intersection of its original type and the guarding type" (`typecase.tex:126-133`). No implementers' text conflicts with it: the grammar accepts `typecase x of`, and neither the parser nor the AST documents a bare scrutinee left unnarrowed. It stays settled, and the review's note on row 460 about its compiled `XXX` test stands. One piece of evidence goes to the rung that will own `ProjectFortress/compiler_tests/`, to weigh before it writes that test. Where narrowing would do, the team's compiled tests bind per clause: `obj':B =>` (`Compiled5.bi.fss:21-24`) and `a':String => a'` (`Compiled6.av.fss:16-19`). So does the compiler library: `y: T => y` (`Library/CompilerLibrary.fss:40-43`). Pavol's answer to `judge-review.1` may bear on it.

## Who was right

- **The review.** Right on the facts of both findings. Right that the "(provisional)" fix belonged in H's commit. Wrong that the carry blocks, or that a history rewrite pays for itself now. On finding 2: right that the binding form had no stated home, and wrong about which home. Its release argument does not apply to this draft. It named the implementers' grammar only as "the other reading" and did not weigh it against `POSITIONS.md:58` and `:127`.
- **The gather.** Right to record why the fix sat in A's commit (`RECORD.md:230`). Wrong to leave it there when H's commit was still `HEAD` and an amend was free.
- **Rung H's worker and skeptic.** Right on the measurements, on the narrowing's settlement and on the row. Wrong to call the binding form settled: `REPORT.md:145` and `:164`, and `SKEPTIC.md:86`, "the fourth case". Neither weighed the note at `typecase.tex:15` against the implementers' grammar. Rung tryatomic had already read that note as deferring the section (`rung-tryatomic/REPORT.md:266-271`).

## The repair

In `/home/user/fortress` on `main`, in `explorations/` only. The steps are the ones in the structured result, in order. In short:
1. Append the ruling to row 460's notes cell.
2. Correct H's `REPORT.md:145` and `:164` by appended sentences.
3. Correct `FACTS.md:75`'s sentence on the binding form.
4. Put `judge-review.1` into `PLAN.md` under "Off the path, parked".
5. Add "## Repair after the judge's ruling" to the batch record.
6. Run the tracked-path check.
7. Commit locally, with the protocol's footer. Do not push.

No test is added, no source file is touched, and nothing is rewritten.

## For Pavol (`judge-review.1`)

**Typecase's binding syntax.**
- **What the specification says.** The typecase section gives `typecase x = e of` and `typecase (x, y) = e of`, with clauses of types only (`Specification/basic/expressions/typecase.tex:53-93`). Since the Working Draft it has carried a note saying that it "should be revised according to the changes in the pattern matching proposal" (`:15`).
- **What the implementers built.** Between February 2009 and December 2011 they replaced the form with `typecase Expr of` and a per-clause `x: T =>` (`DelimitedExpr.rats:122`, `:237-251`; `Fortress.ast:594-607`). The library and the team's tests write the per-clause form (`Library/FortressLibrary.fss:33-37`, `Library/CompilerLibrary.fss:40-43`, `ProjectFortress/compiler_tests/Compiled6.av.fss:16-19`). Both paths refuse the binding form (row 460).
- **What the judge decided.** Under his weighting of 2026-09-23 and 2026-09-27, the judge of climb batch 7 recorded the binding form's defect with a probe and a ledger row, and did not add a gated expected-failure test.
- **Candidates:**
  - **(a) Keep that** (the default). When a specification rung next revises expressions, revise the section to the implemented grammar in the S1 form: the per-clause binding, the Working Draft's text quoted in Appendix I. This needs no code.
  - **(b) The specification's form is the standard.** An `XXX` walk test now, and later a parser, AST and name-resolution repair. `typecase x = e of` then has to be told apart from a typecase on an equality.
  - **(c) Both forms.** The same parser work as (b).
- **The shorthand form's narrowing** (`:126-133`) conflicts with no implementers' text and stays as the specification states it, unless his answer says otherwise.

Nothing waits on the answer.
