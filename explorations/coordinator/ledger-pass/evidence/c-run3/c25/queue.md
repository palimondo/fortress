# c25 queue

1. **Row 77: does the compiled checker still refuse a method call on a closed trait whose method is declared only in the listed types?** The checker's reading of self types, where clauses and `comprises` changed after the row (1c32ccffd, 64fa505c4, 396e4ed8d, 24db899fa); the row's probe was never re-run, and no prober ran it in this pass.
   - Landed: the row's present line: `| 77 | the compiled checker refuses a call, on a value of a closed trait, of a method declared only in the trait's listed types: ... | NEGATIVE-VERIFIED | implementation gap (checker) | ... Probe `explorations/compiler-probes/p20.fss` (...), no longer in the tree. full text: history, row 77 |`. Default: that line.
   - The other way: run `git show c69cb2064^:explorations/compiler-probes/p20.fss` on both paths (command and outcomes in `tmp/ledger-pass/c-run3/c25/questions.md`, "Row 77"): still `No such method Tree.tsum.` rewrites the probe sentence to "in the parent of `c69cb2064`"; `p20 3.0` closes it by the bisected commit; another refusal rewrites the claim.
   - Its cost: one compile and one walk run.
   - Home: `tmp/ledger-pass/c-run3/c25/questions.md`, `check.md` ("Row 77"), `judgement.md`.
   - Needed by: the next ledger pass; the row may be stale since the checker changed.

2. **Row 78: does the compiled checker still refuse `tsum(t)` with `t: Tree` and overloads only for `Leaf` and `Node`?** As item 1, probe `c69cb2064^:explorations/compiler-probes/p10.fss`.
   - Landed: the row's present line: `| 78 | the compiled checker refuses a call on a value of a closed trait whose overloads are declared only for the trait's listed types: ... | NEGATIVE-VERIFIED | implementation gap (checker) | ... Probe `explorations/compiler-probes/p10.fss` (...), no longer in the tree. |`. Default: that line.
   - The other way: the run of `questions.md`, "Row 78": `Leaf->RR64 is not applicable to an argument of type Tree.` keeps it with the probe located; `p10 3.0` closes it; another message rewrites the claim.
   - Its cost: one compile and one walk run.
   - Home: `tmp/ledger-pass/c-run3/c25/questions.md`, `check.md` ("Row 78").
   - Needed by: the next ledger pass.

3. **Row 83 (CONTESTED): does a `nat`-generic function declared in an API's own signature mis-unify on its second instantiation?** The row's one untested case; the check passed the three-file program (expected sums 3.0, 10.0, 3.0), but no prober ran it.
   - Landed: the row's present line: `| 83 | `nat`-generic functions mis-unify on a second instantiation when called through an exported API | CONTESTED | implementation gap (walk) | ... Run C's `explorations/run-c/probes/api/` pair (row 151) ... full text: history, row 83 |`. Default: that line.
   - The other way: run `questions.md`, "Row 83", under walk and compiled: correct sums make the row `RETIRED` (the curator's word, as for any `CONTESTED` row); a wrong sum or dispatch failure makes it `NEGATIVE-VERIFIED`, implementation gap (walk), with the program as probe. Either way `explorations/run-c/probes/api/` should read "in the parent of `4ebf80aec`".
   - Its cost: one walk run and one compiled run of three small files.
   - Home: `tmp/ledger-pass/c-run3/c25/questions.md`, `check.md` ("Row 83").
   - Needed by: the next ledger pass; a status change of a `CONTESTED` row is the curator's.
