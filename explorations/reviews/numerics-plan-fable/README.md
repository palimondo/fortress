<!-- The probes, scripts and captures behind explorations/reviews/numerics-plan-fable.md, run 2026-09-27 on main at 219cd7038 by the Fable planner, with private caches under tmp/fable/ (gitignored), no ant, no tracked file changed. Machine on every capture's first line: nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz, OpenJDK 25.0.4, FORTRESS_THREADS=1, load 0.2 to 3 (the box had just restarted; nothing else ran). No timing here is a comparison. -->

# Probes for the numerics plan

## `probes/one-shape/`: one shape on both paths

One shape, tried the same way under walk (the one library, flat) and compiled (the compiler's own library): a static parameter that must be inferred while a coercion is in play (a numeral into a number type, a narrow type into a wide one).

- `walk/*.fss`, one case per file (so that a walk failure, which ends the run, hides no other case); captured to `*.walk.txt` by `probes/run-walk-cases.sh`.
- `comp/*.fss`, the compiled cases, one per file (the checker refuses a whole component at its first errors); captured to `*.comp.txt` by `probes/run-comp-cases.sh`, which seeds a private cache from `tmp/fable/libcache` (the five prelude components compiled in library order by `compile-ladder/plan-6.5/libcache.sh`).
- `comp2/`, `comp3/`, `comp4/`: the isolation of a compiled crash found on the way (two plain arms, `ee(x: ZZ32)` beside `ee(x: Any)`, die at run with `NoSuchMethodError`); `comp4/EeMin.fss` is the smallest form.

The results are in the plan's section 3 (the audit) and section 7 (measured and inferred).

## `probes/microgpt-distance/`: microGPT's own distance to the switch-over

`probes/microgpt-distance.sh` points the distance measurement's one-JVM driver (`perf-probes/prelude/switch-over-distance-flat/DistanceMulti.java`, built by `perf-probes/prelude/distance-triage/run.sh <work-dir> build`) at microGPT's own components instead of the prelude's: the compiled checker over the programs against the one library, every stage and every declaration, under the switch-over's default setting (`any`: the implicit bound `Any`, compiled-expression desugaring on).

- `mg-c4-any.*`: the four components of `explorations/run-c4/src` on today's library (`FlatArrays`, `FlatData`, `MicroGptFlat`, `MicroGptFlatCheck`). 46 errors: 24 at C4's own lines (`own-errors.txt`), 22 at library lines seen through C4's objects (`library-errors-through-own-objects.txt`: the `fill` diamond and `shift`'s declared type).
- `mg-apl-any.*`: the six components of `explorations/apl/mg`. 53 errors: 35 own, 18 the library's.
- `mg-c4-A0-any.*` and `mg-apl-A0-any.*`: the two programs against the numeral-switch library copy A0 of `perf-probes/prelude/distance-triage/variants.py` (the compiler library's `IntLiteral`, a sibling under `Number` with coercions, in the one library), made by `run.sh <work-dir> lib A0` with the programs' sources copied beside it so that the copy shadows the tree's library. `c4-L0-vs-A0.diff` and `apl-L0-vs-A0.diff` are the differences: every range that starts with a numeral is refused at `#` (13 declarations in C4, 11 in the APL program), and nothing else changes.
- `*.stages.txt` hold every `@@SC STAGE` line (errors per stage per unit) and the run's header; `*.tally.txt` are `errors.py`'s tallies over the whole run, the library's errors included.

## Not run

The gate; anything under `ant`; a walk run of a respelled library; the "ranges over `ZZ32` only" shadow (section 7 of the plan says what it would measure).
