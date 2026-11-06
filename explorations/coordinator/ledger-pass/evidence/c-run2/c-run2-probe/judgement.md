# Judgement, c-run2-probe

Base c124c6b65; inputs: assessment.md, rows.rewrite, closes.txt, check.md (6 pass, 2 fail), mech.md (8 lines, 0 failing), cold-read.md, runs.md and probe/logs/. Applied 8, held 0.

- Row 850 (rewrite, CONTESTED kept): apply. Check passes; the outputs in `probe/logs/850.compile`, `850g.run` back the claim; the cold read's items do not stop a worker.
- Row 465 (rewrite): apply. Check passes; `465.walk` prints `2`, `a!`; `FortressLibrary.fsi:1729-1730` declares the former library cases.
- Row 789 (rewrite): apply. Check passes; `789.compile` holds the refusal, `789c.run` prints `2`.
- Row 341 (close by c41c3d2b0, test none): apply. Check passes; the three shapes run cold and warm (`341*.cold`); the note states the commit is identified by reading, not bisected. Not CONTESTED, so no SETTLED field. Hand-over for the record's maintainer: F-269's sentence on C4's former `MAX` refusal is false at the base.
- Row 390 (rewrite): apply with the check's correction. Correction made: the passage "The checker's ranking is `typedApplication` (...:650); the specification drops ..." replaced by "The specification drops the candidates applicable only with coercion; where the pair is kept is not located: the checker's `typedApplication` (`scala_src/typechecker/impls/Functionals.scala:650`) tries coercion-free fits first." (source: `typedApplication`'s doc comment, `Functionals.scala:606-630`, read again here), and the dispatcher name shortened to `\=p{...}(fortress.AnyType$Any)` to make room. Line 1174 characters.
- Row 23 (rewrite): apply. Check passes; `23.walk` and `FType.java:576` back the notes.
- Row 393 (rewrite): apply. Check passes; `393.compile`, `393.run`, `393.walk`.
- Row 852 (rewrite): apply with the check's correction. Correction made: status cell back to `CONTESTED` (check.md's rule: a `CONTESTED` row keeps its status unless closed with what settled it; writer.md:15 says the same), and notes appended " Contested: the run answers the row's question; the status waits on the curator." Line 1085 characters. The run (both paths load both programs) is in the notes for the curator.

Duplicates, silent lines, pairs: none in the inputs (`dups.txt`, `silent.txt`, `pairs.txt` empty), so the final files are empty.
