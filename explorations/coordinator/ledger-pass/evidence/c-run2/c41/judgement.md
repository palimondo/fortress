# Judgement, chunk c41 (run c-run2), base c124c6b65

Applied 3 (1 rewrite, 2 keeps), held 1 (852, a measure with no prober run). No closes, duplicates, pairs or silent rows. Keeps that the check passes need no line in `final.rewrite`; they stand as they are.

- **359 (keep): apply (no change).** The check passes it: `Fortress.rats:145-157` (`createSpan`, the trim over spaces only at :147) holds at the base, FACTS.md:17 agrees, and the NEGATIVE-BOUNDED bound is stated.
- **376 (rewrite): apply, corrected.** The check fails the cold read only; its correction, from `ProjectFortress/src/com/sun/fortress/parser/MayNewlineHeader.rats:347-363` at c124c6b65, made exactly in the notes: `` `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:222` `` -> `` `parser/Symbol.rats:222` ``; "but not a parenthesized domain (`:360-363`)" -> "but not a parenthesized domain, which `BoolPrimaryFront` takes as `( BoolExpr )` (`:360-363`)". The line passes `ledger.py check --rows`.
- **852 (CONTESTED, measure): hold.** The check passes the question, but no prober in this run ran the two programs (no `runs.md` for it), so the row keeps its present line. The question goes to `queue.md`.
- **898 (keep): apply (no change).** The check passes it: `Literal.rats:460-464` holds the ordered choice as the row says, the notes carry the command and its output, and `lexical-structure.tex`, "Character Literals", allows four or more digits, so the row is not silent.
