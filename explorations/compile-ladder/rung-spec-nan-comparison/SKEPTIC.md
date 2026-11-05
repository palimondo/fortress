<!-- Skeptic's verdict on rung S of climb batch 26 (rung-spec-nan-comparison): the overview's comparison sentences revised to false at a NaN and at 0/0 (P-159, row 672). -->

# Skeptic: rung S, rung-spec-nan-comparison

Head judged: `a53d55bcc`, the worker's. Verdict: approved, with no fix. The report's count and distance tables are none: neither stage ran, and none was owed (below).

## The journal step

`REPORT.md` and `record.md` were already on the branch, in the worker's commit `a53d55bcc`, so the guarded `journal-text.py` lines wrote nothing and no journal commit was made.

## What I checked

1. **Stages.** `git diff --name-only 4d27fbcc5571f0157b3dfda3977b63430c66d701...HEAD` lists nine paths. All are under `Specification/`, `ProjectFortress/tests/`, `ProjectFortress/compiler_tests/` or `explorations/`. No checker code, Scala or generated code changed, so neither stage was owed (F-111). `git diff --quiet 4d27fbcc5 HEAD -- Library` is empty.
2. **Test first.** This rung edits prose and adds guards. The worker's transcript, call `gfTVqH` at 21:06:17, ran `harness-one.sh` on the base's code (`# harness-one 2026-11-05T21:06:17Z; tree 4d27fbcc5`) and printed `. interpret .../ComparisonAtNaNWalk` / `PASS` / ` OK (time = 596ms)` / `OK (3 tests)`. Its last run, call `ZL9YLQ` at 21:11, came after the last change and printed `OK (6 tests)`, with the three `TupleOrder*Refused` tests each `OK Saw expected refusal at load`, `XXXRationalUnorderedRungP` `OK Saw expected exception`, and `TupleOrderBounds` ` OK (time = 632ms)`. `tmp/rung-spec-nan-comparison/junit-nan.txt` holds `OK (4 tests)` for the two compiled helper tests, linked and run in one JVM. The guards pass on both sides, as a guard should. No failure is owed (P-102; the brief's fork 6).
3. **The diff against P-159, P-96 and the section.**
   - The two sentences at `opr-overview.tex:284-291` state P-159's rule for floats: the four operators answer false, and `CMP` answers Unordered. For rationals they state the chapter's reading at `numbers.tex:372-378`: false at 0/0, and the infinities ordered. They cite `\secref{basic-rationals}`, the label at `numbers.tex:17`. The rule is stated no broader than the decision: `CMP` is named for floats only, as fork 5 gives it.
   - The callout at `:292-300` has the form of the revival-conditional callout (`:308`, base `:296`) and names row 440.
   - The Appendix I entry at `changes.tex:4550-4622` has all eight parts: affected section, change, rationale, effect with row 440 (`=`, `<=`, `>=`, and `EqualTo` for `CMP`), original text, route C, reversal and decision.
   - The original is quoted correctly: `Specification-1.0-frozen/basic/operators/opr-overview.tex:274-278`, by `grep -n` at `:274` and `:278`.
   - The citations hold, each opened:
     - `comparison.tex:119-124`, the fourth value `Unordered`;
     - `opr-overview.tex:246`, where MAX and MIN give a NaN;
     - `perf-probes/nan-check-cost/REPORT.md:95`, '15 to 20 percent';
     - `FortressLibrary.fsi:1184`, `:1187` and `CompilerLibrary.fsi:97`, `:99`;
     - `CompilerBuiltin.fsi:35`, `:231`, the only `CMP` at a number type.
   - The preamble, `preamble.tex:54-62`, speaks of revisions in general and stays true.
4. **Precedent.** The callout follows the subsection's own callout. The entry follows "The rounding of an infinite or indefinite rational" (`changes.tex:3872`). No other sentence of `Specification/` names either error type: `grep -rn ComparisonError Specification --include=*.tex` finds only the callout's quotation.
5. **The test.**
   - `ComparisonAtNaNWalk.fss` has one comment line, which cites files and sections, not lines.
   - It asserts every value that its messages state.
   - It leaves out 0/0 against itself, as the brief asks.
   - Its name is unique in `ProjectFortress/`. Its functions are local to its component.
6. **Differential.** My programs are under `tmp/rung-spec-nan-comparison/skeptic/`. They have no mutable state, so I ran them at one thread count. Walk on the old code (`old-fortress.sh /home/user/fortress-base26 .../tmp/old-caches SkNanWalk.fss`) printed:

       QQ ind=ind true ind<ind false ind<=ind true ind>ind false ind>=ind true CMP EqualTo
       QQ ind<inf false ind<=inf false inf>=ind false ninf<=ind false ind CMP inf Unordered
       RR64 nan=nan false nan<pinf false pinf>=nan false nan CMP pinf Unordered
       mixed ZZ32<nan false nan>=ZZ32 false
       RR32 f=f false f<=f false f CMP f Unordered

   Walk on the rung's tree, `bin/fortress SkNanWalk.fss`, printed the same lines, by `diff`. The rung changed no code. The compiled path on the old code (`old-fortress.sh ... compile SkNanComp.fss` and then `run SkNanComp`) printed:

       C nan<one  false  nan<=one  false  nan>one  false  nan>=one  false
       C one<nan  false  one<=nan  false  one>nan  false  one>=nan  false
       C nan<=nan  false  nan>=nan  false  nan=nan  false

   Every value matches the new text. The one departure is 0/0 against itself, true for `=`, `<=` and `>=` and `EqualTo` for `CMP`, which is row 440 as the Effect and the callout name it. The other pairs I ran beyond the worker's also agree: 0/0 against an infinity, a `ZZ32` against a NaN, and an RR32 NaN against itself.
7. **Homes.** Row 672 is home 1, repaired by the text, and its test is `ComparisonAtNaNWalk`. Row 440 is home 2. Its `XXX` test stands, and its rewritten line passes `ledger.py check --rows`: '1 rows, 0 fail the template', on my extract of the line. No new defect.
8. **Ledger and siblings.** `ledger.py find NaN` gives 330, 440, 672 and 863. None of them bears on these sentences beyond 440 and 672.
9. **Report.**
   - The provenance lines' citations open to what they claim.
   - Sentences made false: the later restart, `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:274-278`, which `grep -n` confirms. This is the worker's question for the curator, and I keep it.
   - PLAN.md:388 is already closed in the review queue.
   - The spec build is logged: `tmp/rung-spec-nan-comparison/spec.txt:209` and `:19746` read 'BUILD SUCCESSFUL'. Call `qjsZ2W` ran the skill's warnings grep on `fortress.log`, which printed 0, as the report gives. Grepping the ant output in `spec.txt` instead finds early-pass reference warnings, which the final log resolves.
   - record.md's line citations into `FortressLibrary.fss` (`:596-607`, `:224-229`, `:610-619`, `:658-661`) hold at the base.
10. **Competing declarations.** None: the rung adds one component name, which is unique.
11. **Failure mode.** No loud failure became quiet. Both paths already answered false. The text changes from a raise to the answers that the code gives, as P-159 decides.

## Where I differ from the worker

- I do not differ on substance.
- I take "One junit.sh run serves as both" to be right: the code and the helpers are the base's.

## Fixes

None.
