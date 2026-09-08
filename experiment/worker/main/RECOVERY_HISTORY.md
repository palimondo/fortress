# Astra continuation — recovery entry updated 2026-09-08

## Latest completed evidence (read before the older milestone below)

The previous Astra lead explicitly stopped on a usage-limit error; no worker
handles remained live at recovery. All independent worker files remain saved.
Latest completed integrated run:
`experiment/evidence/20260907T203818.638869Z-microgpt-integrated-03/`.
It exited 1 after printing the full three-position forward trace and loss
1.147958783149666. Backpropagation then failed at MicroGPT.fss:48:31 with
`Expect all oprefs to be top level prefix =`. Inspect current source and that
log first; the earlier statement below that run 01 was pending is superseded.
Full-model gradients, Adam and generation have NOT passed validation yet.

Immediate next action: preserve current MicroGPT source, diagnose that failure,
then run the strict reference TSV-to-JSON comparison across all fixture fields.
Keep model-core/driver includes consistent with the assembled source.
The existing AD and notation workers completed; recover their files/RESUME notes
rather than assigning their investigations again. No article exists yet.

Read `experiment/RESUMING.md`. The recorder now snapshots explicit worker .fss
and .tic inputs before execution. Update this note at meaningful milestones
before reporting to the parent, including the next exact unresolved action.

## Previous milestone (2026-09-07 20:37 UTC)
Boundary retained: no fortress/, fortress-transcripts/, experiment/coordinator access or indirect retrieval. Runtime restored by parent; source experiment/env.sh and render-env.sh; no rebuild.
ForwardProbe FIXED chained rows[i][j] using row local. Recorded 20260907T203154.764676Z-forward-index-fix passes 3.236 s; 9 logits + loss match fixture max error 5.55e-17, loss 1.147958783149666.
Candidate-a.png independently viewed; candidate B extracted executed ForwardProbe source to candidate-b.tic, rendered render-b/candidate-b.png and inspected BY EYE. Tight division gives stacked fractions/radicals. Python captions clip, so split final figures. x x inner-product ambiguity resolved by successful DOT alternative (notation worker).
Notation worker COMPLETE: ordinary AD SUM works with `import FortressLibrary.{...} except { opr BIG + }` plus local zeroarg SUM Comprehension; actual ∑ stacked bounds rendered and viewed. Numeric BIG MAXNUM and vector DOT work, all evidence in notation/NOTES.md and RESUME.md. Earlier overload-limit interpretation superseded as namespace issue.
AD worker COMPLETE core but available: autodiff/AutodiffGraphProbe.fss tested immutable construction graph + mutable seen/adjoints only during sequential backward, O(nodes+edges), repeated gradients clear state. Stress 8191 nodes / 30-level shared diamond passes at -Xss32m. Main integrated copied scalar code; full model/driver assembled in MicroGPT.fss from model-core.fss.inc and fixture-driver.fss.inc. Integrated run microgpt-integrated-01 pending inspection. If failure, preserve snapshot then fix main file/incs consistently.
Next: full strict TSV->JSON fixture validation including all 228 gradients/Adam values, attention and generation. Then source-extracted smaller Fortify figures, by-eye checks, concise educational article teaching GPT and notation together. Parent /root gets substantive updates; no commit/push.
