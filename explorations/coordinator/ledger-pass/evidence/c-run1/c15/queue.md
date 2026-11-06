# Queue items from chunk c15, run c-run1

No row of this chunk is held, and no `XXX` test is believed to pass.

- **Row 342, question to measure: does `explorations/apl/rung-5/v04_lib.fss` still show walk's cold/warm split?** The applied line names it as row 98's case (refused cold against `AdditiveGroup.+`, ran warm) with reproducer `none`; no prober ran it in this pass.
   - Landed: the row's line in `tmp/ledger-pass/c-run1/c15/final.rewrite`. Default: that line, reproducer `none`.
   - The other way: run it under walk with a fresh private caches folder, then again warm; refused cold and run warm makes that path the row's reproducer.
   - Its cost: two walk runs of one probe, a few minutes.
   - Home: `tmp/ledger-pass/c-run1/c15/questions.md`, "For the prober"; `check.md`, row 342.
   - Needed by: the ledger's repair of row 342.
