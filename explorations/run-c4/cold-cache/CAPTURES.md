Captures for the C4 cold-cache overload investigation (2026-09-19).
All runs used a private, freshly created cache directory
(FORTRESS_CACHES=<dir> and -Dfortress.caches=<dir>) and a private java.io.tmpdir.
Nothing in the repository was modified.

Drivers
  repro.sh    the three cold-cache experiments on the committed C4 / apl programs
  p3.sh p45.sh p2.sh mini.sh   the minimisation ladder
  ablate.sh (Run C4) ablate4.sh ablate4b.sh (minimal reproducer)   cache ablations

Experiment 1 -- explorations/run-c4/src/MicroGptFlatCheck.fss, cold cache
  exp1-run1.txt                  the ProgramError (rc=1, 22 s)
  exp1-cache-after-run1.txt      interpreter_cache after the FAILED run
  exp1-run2.txt                  the same command again: 40 PASS, 0 FAIL, 877 s (rc=0)

Experiment 2 -- explorations/run-c4/src/MicroGptFlat.fss (the model), cold cache
  exp2-run1.txt  rc=1, the same error, this time StandardMax.MAX (FortressLibrary.fss:247)
                 against FlatArrays.fss:32
  exp2-run2.txt  rc=0, the model runs

Experiment 3 -- explorations/apl/mg/MicroGptAplCheck.fss, cold cache
  exp3-run1.txt  rc=1, FlatArrays2.fss:40 against FortressLibrary.fss:280, same message
  exp3-run2.txt  green: the check header and passing check lines (capped at 300 s, rc=124)

Minimisation (each on its own empty cache)
  mini/MaxProbe.fss  + m-run*.txt        one declaration, one component, MAX never called -- green
  p1/MaxProbe2.fss   + run1,2.txt        one declaration, one component, MAX called      -- green
  p2/ (MaxLib.fsi/.fss, MaxUser.fss)     one declaration behind an api + importer        -- green
  p5/                                    p2 plus a BIG MAX reduction                     -- green
  p4/ (MaxLib4.fsi/.fss, MaxUser4.fss)   TWO declarations behind an api + importer       -- FAILS cold, green after
  p3/ (MaxLib3, MaxUser3)                p4 plus the BIG MAX reduction                   -- FAILS cold, green after

Cache ablations, each from a copy of the cache a failing run left
  p4/ablate-A-interpreter_cache-deleted.txt        component entries in interpreter_cache        -- green
  p4/ablate-B-parsed_cache-deleted.txt             component entries in interpreter_parsed_cache -- green
  p4/ablate-D-whole-interpreter_cache-deleted.txt  every .tfs in interpreter_cache               -- green
  p4/ablate-C-FortressLibrary-entries-deleted.txt  FortressLibrary* in BOTH caches               -- FAILS
  ablate-A-interpreter_cache-FlatArrays-deleted.txt  (Run C4) FlatArrays in interpreter_cache    -- green
  ablate-B-parsed_cache-FlatArrays-deleted.txt       (Run C4) FlatArrays in parsed cache         -- green
  => C minus D isolates the suppressor to interpreter_parsed_cache/FortressLibrary*

Draft ledger rows: DRAFT-ROWS.md
