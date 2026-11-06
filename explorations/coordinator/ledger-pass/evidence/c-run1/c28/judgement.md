# Judgement, chunk c28, run c-run1

Applied 9 (721, 729, 674, 54, 56, 169, 109, 292, 293); held 3 (24, 53, 254). No duplicates, no closes.

- **24: held.** A measure row; no prober ran `questions.md`'s program in this pass, and the check also corrected the question (the file under `tmp/`, the third outcome's compiled step). Present line kept; queued.
- **721: applied, corrected.** Check's correction made: "`Int`, `ZZ32`'s one listed type (row 364)" -> "`Int`, the run-time class walk gives a `ZZ32` value (row 364)".
- **674: applied** as written; check passed.
- **53: held.** A measure row; the question passed the check but no prober ran it. Queued.
- **54: applied** as written; check passed.
- **56: applied** as written; check passed.
- **109: applied, corrected.** "a user `ODOT` (⊙) on the carrier" -> "a top-level `ODOT` (⊙, row 161)".
- **169: applied, corrected.** "(`:2701-2717`, `:2720-2726`)" -> "(`:2701-2717`, `:2720-2722`, `:2724-2726`)": `fss:2723` is live (read at HEAD).
- **254: held.** A measure row; no prober ran it, and the check corrected the program to build the matrices at run-time sizes (`array[\RR64\](r, c).fill(1.0)`). Queued.
- **292: applied, corrected.** The spec sentence now reads "..., and its margin notes ask for two or more dimensions (`aggregate.tex:153`, `:158-161`)." (verified at `Specification-1.0-frozen/basic/expressions/aggregate.tex:152-161`); the C4 clause shortened to "Every rank-3 elementwise operator is a user declaration (rows 161, 295)." for the notes limit.
- **293: applied** as written; check passed.
- **729: applied** as written; CONTESTED kept (PLAN L.worker.1 unsettled); check passed.

`final.silent`: the three lines of `silent.txt` kept (674, 109, 254); 254's line stands while the row stays open, since no outcome of its question makes the specification speak. `final.pairs`: 293/371 upheld by the check and the evidence.
