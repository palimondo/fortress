# Judgement of chunk c12 (c-run4, base c124c6b65)

Applied 9 (8 rewrites, 1 keep), held 3. No duplicates, closes or pairs proposed or upheld.

- **650: apply (rewrite, corrected).** Check failed on two passages, both corrected exactly from its sources: the draft note now cites `traits.tex:15-16` beside the rule `:673-683`; the dispatch sentence names "the inherited declaration that the `override` overrides".
- **653: apply (rewrite, corrected).** Rule citation `traits.tex:670-671` (the partial-overriding note) corrected to `traits.tex:680-683`, the static-error sentence, verified at c124c6b65.
- **694: hold (measure).** No prober ran the question in `questions.md`; the row keeps its line. Queued.
- **391: apply (rewrite, corrected).** ", no longer in the tree" replaced by ", removed by `ab067d9b6`" so the probe can be read from history (notes 695 of 700).
- **392: apply (rewrite, corrected).** Same correction for `SkAscribe.fss`, which defines `Wide`, `Narrow`, `NarrowOf`, `WideOf`, `big`.
- **100: hold (measure).** No prober ran the g22 question; the row keeps its line (status kept beside `silent`, item 265). Queued.
- **221: hold (measure).** No prober ran the reproducer with the APL base on `FORTRESS_SOURCE_PATH`; the evidence's run stops at "Could not find an implementation for API AplCore". The row keeps its line. Queued.
- **665: apply (keep).** Check passes; cited lines unchanged at the pin; the XXX walk test green in gate a12ab5c60. No line change.
- **693: apply (rewrite, corrected).** "Object shape:" corrected to "The where-clause shape:" for `XXXOverrideNothingConditionalExtensionWalk`.
- **725: apply (rewrite, corrected).** The ambiguous sentence now reads that the object is refused too, wrongly, where bodies without static parameters cover and another body has its own static parameter (`coveredByParts`, `case _ => return false`).
- **728: apply (rewrite, corrected).** "and also the two-parameter shape" gives the second half its verb.
- **639: apply (rewrite).** Check passes.

`final.silent`: both lines of `silent.txt` upheld (100 defect, 639 choice).
