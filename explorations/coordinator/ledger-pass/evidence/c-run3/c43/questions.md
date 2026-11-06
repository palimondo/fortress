# Questions, chunk c43

No row of this chunk is given `measure`.

A note for the prober, not a measure: every probe reproducer of this chunk's rows (213, 229, 235, 236, 239, 250) failed in the evidence's run at its `import AplCore` line ("Could not find an implementation for API AplCore"), because the run's source path lacked `explorations/apl/base`. The rung reports' "How to run" sections (`explorations/apl/rung-2/REPORT.md`, `rung-3`, `rung-4`, `rung-5`) set `FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library"`. A later probe can confirm, under walk, with that path:
- `cd explorations/apl/rung-2 && bin/fortress s07_chain.fss`: expect `Variable apl is not defined.` at 8:51-59 (row 229 holds; otherwise row 229 needs a rewrite or close by what it prints).
- `cd explorations/apl/rung-3 && bin/fortress t02_gram.fss`: expect a line `TA gaps: 5 5 5` (row 235 holds; any other output means its notes need a rewrite from that run).

No `XXX` test is named by this chunk's rows.
