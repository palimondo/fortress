# c44 questions

No row of this chunk is sent to the prober. The three rows whose reproducer ran (210, 242, 244) stopped at load, `Could not find an implementation for API AplCore`, because the probes need `FORTRESS_SOURCE_PATH` with `explorations/apl/base` (row 190); and each tracked probe holds the working form, not the failure, so its run could not confirm the claim either way. The rows are rewritten with reproducer `none` and the failing outputs pinned to the parent of 1ee3b0bc5. Their mechanisms (`ComposingSyntaxDefTranslator.java`, `Spacing.rats`, `Identifier.rats`) are unchanged since the rows were found: no commit touches `syntax_abstractions/` or `parser/*.rats` after 2026-08-21 except d2fe4e1d9 (node hash codes).

An optional confirmation, if the prober has room: restore `explorations/apl/v1-probes/q11_nlform.fss` and `q11_g.fsi`/`.fss` from `1ee3b0bc5^` into a scratch folder and run it under walk with `FORTRESS_SOURCE_PATH=".:$FORTRESS_HOME/explorations/apl/base:$FORTRESS_HOME/ProjectFortress/LibraryBuiltin:$FORTRESS_HOME/Library:$FORTRESS_HOME/ProjectFortress/test_library"`; `c1` printing `1 2 3 4` keeps row 210 as written.

`XXX` tests believed to pass now: none (no row of this chunk has one).
