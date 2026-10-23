<!-- Which of the team's demos in ProjectFortress/demos run under walk on today's tree, with each failing demo's repair tried on a copy and a ledger row drafted for each failure that no row holds, for climb batch 21's preparation (P-79; brief: compile-ladder/plan-21/evidence/briefs/probe-team-demos.md). Written 2026-10-23 by an Opus worker. Decides nothing and files nothing. Base: main at 23878af0e, whose Library/, ProjectFortress/, build.xml and bin/ equal the brief's 0c7e7be18, climb batch 20's landed code. Meant for explorations/perf-probes/team-demos/REPORT.md, beside demos-repairs.patch on branch wip/probe-team-demos; the Write tool refused that path, so it was written to the scratchpad. -->

# Which of the team's demos run under walk

## In short

- The team's own demo test, `DemoTests`, runs 52 of the `.fss` files in `ProjectFortress/demos/` (section 1).
- On the base under walk, with a limit of 600 s each, **30 run to their end, 22 fail, and none hits the limit** (section 2).
- Ledger rows already hold 8 of the 22 by their first stop:

  | row | demos |
  |---|---|
  | 670 | BirdCount1z, BirdCount2a, npbft |
  | 791 | BiCGSTAB, BiCGSTAB2 |
  | 449 | HeapShakedown |
  | 464 | mg |
  | 468 | DemoGenerator22D |

  No row holds the other 14.
- **Most of the failures are the same timing line.**
  - Under walk, `nanoTime()` answers a `ZZ64` (row 75).
  - A `ZZ64` becomes an `RR64` only through `asFloat` (P-74).
  - So a timing line that divides a `ZZ64` time by a float, or binds it to an `RR64`, fails. That is the first stop of 9 demos and a later stop of 5 more.
  - Row 791's repair, `asFloat(t)`, clears all 14.
- **With the repairs in `demos-repairs.patch` applied, all 52 demos ran to their end** (section 3.2). The patch:
  - changes 22 demo files. One of them, `Satisfiability.fss`, matters only when SatEx is given a real query;
  - changes one library file, `Library/Generator22D.fss`. This is row 468's own fix;
  - adds one api file, `GenomeUtil2d.fsi`, which the team never committed.
- Section 5 drafts nine ledger rows, one for each kind of failure that no row holds. Each draft passes `ledger.py add` against a copy of the ledger. None is filed.
- Some demos need input that the team's test does not give them (section 4):
  - SatEx stops on a real query (draft I).
  - The two tic-tac-toe demos play whole games.

## 1. How it was run

- **Tree.**
  - Worktree `/home/user/fortress-probe-team-demos`, on branch `wip/probe-team-demos`, cut from `main` at 23878af0e.
  - Seeded by `seed-worktree.sh` from the main tree, which is built at that commit (decision 1).
  - `git diff --name-only 0c7e7be18 23878af0e -- ProjectFortress Library build.xml bin` prints nothing.
  - Each call used the `fortress-repo` skill's setup lines: JDK 25, `FORTRESS_THREADS=1`, `JAVA_FLAGS="-Xmx4g -Xss64m"`.
- **Which demos.**
  - The team's harness runs every `.fss` in the folder except `Syntax`, `DynamicSemantics`, `Satisfiability` and the seven `GenomeUtil*` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:934-935`, called from `DemoTests.java:43-52`). Those ten are components that the other demos import.
  - That leaves 52 programs, and all 52 were run.
- **How each ran.**
  - One at a time, under `timeout -k 15 600`, so the limit was **600 s**.
  - From `ProjectFortress/demos`, as row 670's reproducer runs: `../../bin/fortress X.fss < /dev/null`.
  - `bin/fortress` puts the program's folder first on the source path, so the demos find the `GenomeUtil*` and `Satisfiability` components they import.
  - A run reached its end if it exited 0 and printed no "fail" (the team's own criterion, `FileTests.java:383-418`).
- **Arguments and input.**
  - `tennisRanking` got `tennis050307 tennis051707 tennisGames`, as `FileTests.java:806-815` gives them. The middle file is the one it writes.
  - `wordcount2` reads `ProjectFortress/demos/hamlet` by a path relative to the tree root (`wordcount2.fss:130-132`), so it ran from the root. Run from the demos folder, it stops at once: 'FileNotFound: ProjectFortress/demos/hamlet'.
  - `SatEx` reads `/dev/stdin` when it has no argument (`SatEx.fss:13`). `tictactoe` and `newtictactoe` read `/dev/stdin` at every move (`tictactoe.fss:213-216`). All three got an empty input, which matches what the team's test gives them. Section 4 gives them real input.
  - `trips` with no argument does its default run (`trips.fss:29`). `mg` defaults to class A (`mg.fss:120-121`) and `IntegrationStats` to a `logTol` of 9 (`:57`).
  - `BirdCount*`, `Lambda`, `aStar` and `wordcount` find their data under the tree through `FORTRESS_HOME` or `fortress.autohome`.
- **Not measured.**
  - The compiled checker and the compiled path were not run.
  - So row 710 (`trips` under the checker) and row 731's demo half (big-operator arguments left out, which the checker refuses) stand as the ledger states them.
  - Under walk, no demo stopped at a reduction for the reason row 731 records.

## 2. The base run

Each demo ran as `cd ProjectFortress/demos && timeout -k 15 600 ../../bin/fortress X.fss < /dev/null`, with the arguments of section 1.

**Run to their end (30):** BirdCount1p, 1q, 1r, 1s, 1t, 1u, 1v, 1w, 1y, 2b, 2c, Cfa, FeatherweightJava, Generator2Demo, Lambda, LogFib, Words, conjGrad, fact64, lutx, mm, mm64, mm64x, newtictactoe, posFeedback, prebuffons, sudoku, tennisRanking, tictactoe, turnersParaffins0.

**Fail (22).** Each demo's first stop, with its row:

| demo | where it stops | message (quoted) | row |
|---|---|---|---|
| BiCGSTAB | `BiCGSTAB.fss:177` | 'Failed to find any matching overload, args = (…: ZZ64,1.0E9)' | 791 |
| BiCGSTAB2 | `BiCGSTAB2.fss:163` | the same | 791 |
| ArrayListLong | `ArrayListLong.fss:159`, `(ms/1000.0)` | 'Failed to find any matching overload, args = (17923: ZZ64,1000.0)' | none: draft A |
| PureListLong | `PureListLong.fss:153` | 'args = (22479: ZZ64,1000.0)' | none: A |
| Integrate2 | `Integrate2.fss:48` | 'args = (3972479379: ZZ64,1.0E9:RR64)' | none: A |
| IntegrationStats | `IntegrationStats.fss:100`, calling `elapsedSec(init:RR64, final:RR64)` (`:90`) | 'Unification error: Closure/Constructor for elapsedSec param 1 (init:RR64) got arg 5606213761377: ZZ64 of type Long' | none: A |
| SatEx | `SatEx.fss:18` | 'args = (16251474: ZZ64,1.0E9:RR64)' | none: A |
| buffons | `buffons.fss:24`, `time:RR64 = nanoTime()` | 'RHS expression type Long is not assignable to LHS type RR64' | none: A |
| wordcount | `wordcount.fss:84` | 'args = (32833038492: ZZ64,1000000.0:RR64)' | none: A |
| wordcount2 (run from the root) | `Library/FortressLibrary.fss:1376:25-39`, inside its first `BIG OPLUS` (`wordcount2.fss:75`, by the repair) | 'CastError' | none: H |
| BirdCount1m, 1n, 1o | `BirdCount1m.fss:28` (in `1n` and `1o`, `:27`), in `stringToFloat` | 'Failed to find any matching overload, args = (1.0,Ratio)' | none: B |
| HeapShakedown | `HeapShakedown.fss:128` | 'Type of expression, Ratio, not a subtype of RR64.' | 449 |
| DemoGenerator22D | `Library/Generator22D.fss:146` | 'Failed to find any matching overload, args = (Ratio,Ratio)' | 468 |
| BirdCount1z, 2a | at load: `GenomeUtil1z.fss:72-111`, `GenomeUtil2a.fss:78-117` | 'Object FileBasedReadList does not define an abstract method declared in type ReadList' | 670 |
| npbft | at load: `npbft.fss:36-52` | 'Object Complex does not define an abstract method declared in type Number' | 670 |
| trips | at the call `trips.fss:266:59` | 'Overloading of MAX(self:… ZZ32 …) … (`FortressLibrary.fss:751`) and MAX(a:ZZ32,b:ZZ32) … (`trips.fss:68`) fails because their parameter lists have the same types' | none: C |
| mg | `mg.fss:20` | 'Unification error: Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr' | 464 |
| aStar | at parse: `aStar.fss:38:28` | 'Syntax Error' | none: D |
| BirdCount2d | at load: `BirdCount2d.fss:17` | 'Could not find an implementation for API GenomeUtil2d' | none: E |

The table has 19 lines for 22 demos: the BirdCount1m line covers three demos and the BirdCount1z line covers two. Every one of the 22 stopped long before the limit.

## 3. The repairs, and what each demo did then

- Each repair was tried in the worktree, on its copy of the file. No file on `main` was changed.
- Where a repair exposed a later stop, that stop was repaired next, and the table shows each step.
- `demos-repairs.patch` holds every repair. `git apply --check` accepts it on 23878af0e, and the worktree was reset to the base after the patch was written.

### 3.1 Demo by demo

| demo | repair | then |
|---|---|---|
| BiCGSTAB, BiCGSTAB2 | `ss = asFloat(t) / 1000000000.0` (row 791's repair, one line of the team's) | run to their end: 29 residuals, then 'elapsed time … ns' |
| ArrayListLong, PureListLong | `(asFloat(ms)/1000.0)` | run to their end |
| Integrate2 | `asFloat(final - init) / (10.0^9)` | runs to its end |
| IntegrationStats | `elapsedSec(init:ZZ64, final:ZZ64): RR64 = asFloat(final - init) / (10.0^9)`, declaring the parameters as Integrate2's own `elapsedSec` does | runs to its end, 'Done' |
| SatEx | `asFloat(fin-start)` at `:18` and `:22` | runs to its end on empty input, 's SATISFIABLE'. A real query stops it later (section 4, draft I) |
| buffons | `time = nanoTime()`, and `asFloat(nanoTime() - time) / 1000000000.0` at `:46` | runs to its end, 'estimated Pi = 3.1447…' |
| wordcount | `(asFloat(f-s)/10.0^6)` | runs to its end, its word counts and timing lines |
| wordcount2 | `embiggen[\WordState\](…)` at `:75`, writing the static argument as the demo's two other `embiggen` calls do (`:96`, `:103`), and `asFloat(f-s)` at `:106` | runs to its end. With only the `asFloat` repair it stopped at the same 'CastError' |
| BirdCount1m, 1n, 1o | `asFloat((SUM[…] …)/(10^(\|frac\|)))` in place of `1.0 (SUM[…] …)/(10^(\|frac\|))` | run to their end |
| HeapShakedown | (a) `asFloat((fin-start) / 10^6)` at `:108`, row 449's fix. It then stops at `:169-175`: 'Unification error: Closure/Constructor for init param 2 (v:List[\RR64\]) got arg ArrayList[\Number\]' (draft F). (b) `<\|[\RR64\] 1.0 s, s lg s \|>` at `:170` | runs to its end and prints its nine tables |
| DemoGenerator22D | (a) `DIV` in place of `/` at `Library/Generator22D.fss:144`, `:145` and `:150`, row 468's fix. It then stops at `DemoGenerator22D.fss:67`, 'args = (429813040: ZZ64,1.0E9)' (draft A). (b) `asFloat(t)` there | runs to its end, '(the answer is 21)' |
| BirdCount1z, 2a | delete `nextRange(): ()` from `trait ReadList` (`GenomeUtil1z.fss:68`, `GenomeUtil2a.fss:74`). The trait's object renamed that method `getNextRange` (`GenomeUtil1z.fss:76`) and nothing calls `nextRange`. The team's next version leaves it out of the trait (`GenomeUtil2b.fss:80-82`) | run to their end |
| npbft | (a) `object Complex(r:RR64, i:RR64)` without `extends Number`. The library declares `Number comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }` (`Library/FortressLibrary.fss:380-381`). (b) `asFloat(last) / base` at `:31`, the run-time stop that row 670 notes. It then stops at its checksum, a `SUM` of `Complex` (`:110-111`): 'Failed to find any matching overload, args = (Complex,Complex)' at `Library/FortressLibrary.fss:3434`, which is `SumReduction`'s `join` (draft G). (c) `object Complex(r:RR64, i:RR64) extends AdditiveGroup[\Complex\]` | runs to its end, 'Checksum 1 : 570.4182371381474+385.43365014877793i' |
| trips | delete `opr MIN(a:ZZ32,b:ZZ32)` and `opr MAX(a:ZZ32,b:ZZ32)` (`trips.fss:67-68`). The library's own `MIN` and `MAX` on `ZZ32` (`Library/FortressLibrary.fss:750-751`) answer the same | runs to its end, 'The 16 trips under 100 in canonical order' |
| mg | (a) row 464's fix at `:20`: `typecase I of (ZZ32, ZZ32, ZZ32) -> RR64 => array[\RR64\](x, y, z).tabulate(I) else => array[\RR64\](x, y, z).fill(I) end`. It then stops at the first iteration's timing line, `mg.fss:162` after the edit (`:159` before it): 'args = (20891480916: ZZ64,1.0E9)', the later stop that row 464 notes. (b) `asFloat(…)` there and in the total at `:170` (`:167` before) | runs to its end: four iterations, then 'L2 Norm is 0.0' |
| aStar | (a) rename the static parameter `Self` to `Inst` at its four sites (`:38`, `:40`, `:59`, `:63`). It then stops at `aStar.fss:343:25`, 'args = (464394407: ZZ64,1000000.0:RR64)' (draft A). (b) `asFloat(i)` in `NanoInterval`'s four getters (`:342-345`) | runs to its end, 'Final result: 1234567894569782…' |
| BirdCount2d | add `ProjectFortress/demos/GenomeUtil2d.fsi`: `GenomeUtil2c.fsi` with `api GenomeUtil2d` | runs to its end, and its output equals `BirdCount2c`'s line for line (`diff` prints nothing) |
| SatEx, with a query | `<\|[\List[\ZZ32\]\] …\|>` at `Satisfiability.fss:89` | section 4 |

Two notes on these outputs:

- mg's 'L2 Norm is 0.0' is what its own `norm` computes: it sums the grid's values without squaring them (`mg.fss:28`). It is the demo's own result, not a fault.
- BirdCount2c's and BirdCount2d's outputs differ from the team's saved `BirdCount2c-output.txt` and `BirdCount2d-output.txt` in 105 lines, where a value prints `3.0` and the team's file has `3`. No test reads these saved files.

### 3.2 The patched tree, every demo

This run used the same driver with the whole patch applied: the 52 demos one at a time, each with the 600 s limit, from `ProjectFortress/demos` except `wordcount2`, which ran from the tree root. **All 52 exited 0, and `grep -il fail` over their 52 logs matches none.** Some of the last lines:

- `wordcount2`: '<|The|>: 1104 times', among its counts
- `SatEx`: 'v'
- `tictactoe`: 'Bye'
- `newtictactoe`: 'Bye!'

## 4. Demos given input

**SatEx on real queries.** This run had the timing repair applied and ran from `ProjectFortress/demos`. It got two DIMACS files:

- the first holds `p cnf 3 3`, `1 -2 0`, `2 3 0`, `-1 -3 0`;
- the second holds `p cnf 1 2`, `1 0`, `-1 0`.

It stopped on the first file:

    Satisfiability.fss:89:41-74:
    Unification error: Closure/Constructor for body param 1 (i:ZZ32) got arg PureList[\ZZ32\] of type PureList[\ZZ32\]

The cause is that `fUnitPropagation` builds its clauses as `<|[\ZZ32\] g.filter(…) | g <- … |>`, but each element is a list. With `<|[\List[\ZZ32\]\] …|>` the demo prints 's SATISFIABLE' and 'v 3 -1 -2', which is a model of the first query, then 's UNSATISFIABLE'. It exits 0. `Satisfiability.fss` is one of the files that `DemoTests` skips, and SatEx with no query never reaches this line (draft I).

**tictactoe and newtictactoe, played.**

- Each `readLine` opens `/dev/stdin` again. So the moves went through a pipe, one line every 4 s after an 8 s start.
- `newtictactoe` got 'Bob', '3', '5', '1', '2', 'no'. It played a whole game to 'You lose!', took 'no', printed 'Bye!', and exited 0.
- `tictactoe` played a whole game to 'You win!', and it answered an occupied square with 'You cannot move there. Choose again.'
- Both runs of `tictactoe` then stopped at 'FAIL: strToInt(no,10): non-digit o'. The script had fed 'no' where a move was due. The computer's moves differ from run to run, so the script could not know when the game would end. This stop comes from the script's input, not from the demo.

## 5. Defects, and the draft ledger rows

The nine drafts are below, each one line of the row template, with `?` as its number.

- Each was checked with `python3 explorations/coordinator/tools/ledger.py add ROW --section TITLE --ledger COPY --history COPY` against copies of the ledger and its history, and each was accepted.
- Their target sections, in order, are 7, 7, 4, 1, 3, 2, 8, 8 and 8 (row template titles: "7. Numerals, floats and comparisons", "4. Operators and overloading under walk", "1. Syntax: lexing, expressions and declarations", "3. Traits, objects and components", "2. Types: generics, static parameters, inference and coercion", "8. Generators, reductions and ranges").
- Draft A gathers the timing sites of ten demos into one row (decision 6).

A, timing (section 7):

    | ? | seven more team demos stop under walk at a timing line where a `ZZ64` from `nanoTime()` meets an `RR64`: `ArrayListLong`, `PureListLong`, `Integrate2`, `IntegrationStats`, `SatEx`, `buffons` and `wordcount`; `wordcount2`, `aStar` and `DemoGenerator22D` stop so past their first stops | NEGATIVE-VERIFIED | library bug (tests) | `basic-lib/numbers.tex`, "Rational Numbers" | `ProjectFortress/demos/ArrayListLong.fss` | batch 21 probe team-demos | siblings: 791, 75. Walk's `nanoTime()` answers a `ZZ64` (row 75), which converts to `RR64` only by `asFloat` (P-74). At 23878af0e, 'Failed to find any matching overload, args = (17923: ZZ64,1000.0)' at `ArrayListLong.fss:159`, so too `PureListLong.fss:153`, `Integrate2.fss:48`, `SatEx.fss:18`, `:22`, `wordcount.fss:84`, `wordcount2.fss:106`, `aStar.fss:342-345`, `DemoGenerator22D.fss:67`; `IntegrationStats.fss:90` takes `init:RR64`, `buffons.fss:24` binds `time:RR64 = nanoTime()`. Repair: `asFloat` of the `ZZ64`, row 791's; with it each demo runs to its end (`perf-probes/team-demos/REPORT.md`). |

B, stringToFloat (section 7):

    | ? | the team demos `BirdCount1m`, `BirdCount1n` and `BirdCount1o` stop under walk in their `stringToFloat`, which juxtaposes `1.0` with a quotient of two integers, a `QQ`: 'Failed to find any matching overload, args = (1.0,Ratio)' (`ProjectFortress/demos/BirdCount1m.fss:28`) | NEGATIVE-VERIFIED | library bug (tests) | `basic/operators/opr-overview.tex`, "Multiplication, Division, Modulo, and Remainder Operators" | `ProjectFortress/demos/BirdCount1m.fss` | batch 21 probe team-demos | siblings: 449. The `SUM` is a `ZZ32` and `/` on integers answers a `QQ` (`Library/FortressLibrary.fss:692` at 23878af0e), which converts to `RR64` only by `asFloat`. Sites: `BirdCount1m.fss:28`, `BirdCount1n.fss:27`, `BirdCount1o.fss:27`. From `BirdCount1p` on, the team calls the library's `strToFloat` (`BirdCount1p.fss:46-47`). Repair: `asFloat((SUM[...] ...)/(10^(\|frac\|)))`; with it each runs to its end (`perf-probes/team-demos/REPORT.md`). |

C, trips (section 4):

    | ? | walk stops the team demo `trips.fss` at its first `MAX`: its top-level `opr MAX(a:ZZ32,b:ZZ32)` and `opr MIN` (`ProjectFortress/demos/trips.fss:67-68`) duplicate `ZZ32`'s own functional `MAX` and `MIN`, 'fails because their parameter lists have the same types' | NEGATIVE-VERIFIED | library bug (tests) | `advanced/overloading.tex`, "Principles of Overloading" | `ProjectFortress/demos/trips.fss` | batch 21 probe team-demos | siblings: 710. Since 2770550c3 each integer type declares its own `MIN`, `MAX` and `MINMAX` (`Library/FortressLibrary.fss:750-751` at 23878af0e); row 710's 'walk loads and runs the demo' is older. The stop is at the call `trips.fss:266:59`. Repair: delete the demo's two declarations, which the library's do the same as; with it the demo runs to its end, 'The 16 trips under 100 in canonical order' (`perf-probes/team-demos/REPORT.md`). |

D, aStar (section 1):

    | ? | the team demo `aStar.fss` names a static parameter `Self` (`ProjectFortress/demos/aStar.fss:38`), a word the grammar reserves (`parser/Keyword.rats:28`, `:130`), so walk stops at its parse: 'aStar.fss:38:28: Syntax Error' | NEGATIVE-VERIFIED | library bug (tests) | `basic/lexical-structure.tex`, "Reserved Words" | `ProjectFortress/demos/aStar.fss` | batch 21 probe team-demos | `Self` is a keyword in `ProjectFortress/src/com/sun/fortress/parser/Keyword.rats` since the conversion's cut 5a68404fd; the demo dates from 2008 (a150950eb). A probe `trait T[\Self extends T[\Self,Cost\], Cost\]` stops the same way at `extends`, and parses with `S`. Repair: rename the parameter, at its four sites (`:38`, `:40`, `:59`, `:63`); the demo then stops at its timing getters (`:342-345`), and with `asFloat` there runs to its end, 'Final result:' (`perf-probes/team-demos/REPORT.md`). |

E, BirdCount2d (section 3):

    | ? | the team demo `BirdCount2d.fss` imports the api `GenomeUtil2d`, which has no `.fsi` file in the tree, so walk stops at load: 'Could not find an implementation for API GenomeUtil2d' (`ProjectFortress/demos/BirdCount2d.fss:17`) | NEGATIVE-VERIFIED | packaging (tests) | `basic/components/apis.tex`, "Component and API Identity" | `ProjectFortress/demos/BirdCount2d.fss` | batch 21 probe team-demos | No commit adds `ProjectFortress/demos/GenomeUtil2d.fsi` (`git log --all -- ProjectFortress/demos/GenomeUtil2d.fsi` prints nothing). `GenomeUtil2d.fss` is `GenomeUtil2c.fss` with comments added, its code the same but for its name, and `BirdCount2d.fss` is `BirdCount2c.fss` so; `BirdCount2d-output.txt` beside them shows a run. Repair: `GenomeUtil2c.fsi` with `api GenomeUtil2d`; the demo then runs to its end and prints what `BirdCount2c` prints (`perf-probes/team-demos/REPORT.md`). |

F, HeapShakedown (section 2):

    | ? | past row 449's stop, the team demo `HeapShakedown.fss` stops under walk at `:169-175`: its list `<\| 1.0 s, s lg s \|>` (`:170`), an argument without a static argument, is built at `Number`: 'Closure/Constructor for init param 2 (v:List[\RR64\]) got arg ArrayList[\Number\]' | NEGATIVE-VERIFIED | library bug (tests) | `basic/inference.tex`, "The Static Arguments of a Call" | `ProjectFortress/demos/HeapShakedown.fss` | batch 21 probe team-demos | siblings: 449, 705. Under walk a list without a static argument or declared type is built at the join of its elements' run-time types, `RR64` and `ZZ32` joining at `Number`, and an argument gets no expected type (row 705). Seen with row 449's repair applied, at 23878af0e. Repair: `<\|[\RR64\] 1.0 s, s lg s \|>`; with both, the demo prints its tables and exits 0 (`perf-probes/team-demos/REPORT.md`). |

G, npbft (section 8):

    | ? | past row 670's refusal, the team demo `npbft.fss` stops under walk at its checksum, a `SUM` of `Complex` values (`ProjectFortress/demos/npbft.fss:110-111`): `SumReduction`'s `join` finds no `+` at '(Complex,Complex)' (`Library/FortressLibrary.fss:3434`), `Complex` extending no `AdditiveGroup` | NEGATIVE-VERIFIED | library bug (tests) | `basic/expressions/reductions.tex`, "Summations and Other Reduction Expressions" | `ProjectFortress/demos/npbft.fss` | batch 21 probe team-demos | siblings: 670, 596. The demo's `opr +(self, b:Complex)` (`:43`) is in no trait that the library's `+` reaches; `SumReduction[\T extends AdditiveGroup[\T\]\]` (`:3430` at 23878af0e) is the bound. Seen with row 670's repair (no `extends Number`, a type that `Number`'s `comprises` at `:381` does not list) and `asFloat(last) / base` at `:31`, the stop row 670 notes. Repair: `object Complex(r:RR64, i:RR64) extends AdditiveGroup[\Complex\]`; the demo then prints 'Checksum 1 : 570.4182371381474+385.43365014877793i' and exits 0. |

H, wordcount2 (section 8):

    | ? | the team demo `wordcount2.fss` stops under walk with 'CastError' in the library's `__replay` (`Library/FortressLibrary.fss:1376`): its `BIG OPLUS` calls `embiggen` without a static argument (`ProjectFortress/demos/wordcount2.fss:75`), and the reduction's instance does not hold its `Segment` elements | NEGATIVE-VERIFIED | library bug (tests) | `basic/inference.tex`, "The Static Arguments of a Call" | `ProjectFortress/demos/wordcount2.fss` | batch 21 probe team-demos | siblings: 587, 705. Run from the tree root, since its data path `ProjectFortress/demos/hamlet` (`:132`) is relative; from `ProjectFortress/demos` it stops first, 'FileNotFound'. By reading, walk infers `embiggen`'s `T` from `Chunk("")` and an untyped function (row 587), so `typecase e'.v of x: I` fails at a `Segment`. The demo's other two `embiggen` calls write their argument (`:96`, `:103`). Repair: `embiggen[\WordState\]`, then the timing row's `asFloat` at `:106`; with both it runs to its end (`perf-probes/team-demos/REPORT.md`). |

I, Satisfiability (section 8):

    | ? | the team demo `SatEx.fss` stops under walk on a non-empty query, in `ProjectFortress/demos/Satisfiability.fss:89`: `fUnitPropagation` builds its clauses as `<\|[\ZZ32\] ...\|>`, whose elements are lists: 'Closure/Constructor for body param 1 (i:ZZ32) got arg PureList[\ZZ32\]' | NEGATIVE-VERIFIED | library bug (tests) | `basic/expressions/comprehensions.tex`, "Comprehensions" | `ProjectFortress/demos/SatEx.fss` | batch 21 probe team-demos | Seen at 23878af0e with the timing row's repair at `SatEx.fss:18`, `:22`. With no argument the demo reads an empty `/dev/stdin` and prints 's SATISFIABLE', as the team's `DemoTests` runs it; given a file holding `p cnf 3 3`, `1 -2 0`, `2 3 0`, `-1 -3 0`, it stops at `:89`. Repair: `<\|[\List[\ZZ32\]\] ...\|>`; with it the demo prints 's SATISFIABLE', 'v 3 -1 -2', and for a file holding `1 0`, `-1 0` 's UNSATISFIABLE', and exits 0 (`perf-probes/team-demos/REPORT.md`). |

**The failures that existing rows hold.** Row 670 holds BirdCount1z, BirdCount2a and npbft, which walk refuses at load. Row 791 holds BiCGSTAB and BiCGSTAB2, row 449 HeapShakedown's first stop, row 464 mg, and row 468 DemoGenerator22D's stop in `Generator22D`.

- **Repairs.** Rows 791, 449, 464 and 468 each state a repair, and each repair worked. Row 670 states none. Section 3 gives one, which could go into its notes.
- **Row 710 is out of date.** It says "walk loads and runs the demo". Since `2770550c3`, walk stops `trips` at its first `MAX` (draft C).
- **Row 670's run-time stop.** The stop at npbft's `:31`, which row 670 notes, clears with `asFloat(last)`. A later stop then follows (draft G).

## 6. Decisions

1. **The base build is the main tree.**
   - It is at the brief's base, 23878af0e.
   - Its implementation stamp equals its caches' stamp (`1f7ed858…`), and no Java, Scala or `.ast` source is newer than that stamp.
   - `seed-worktree.sh` accepted it. The script checks only `ProjectFortress`, `Library` and `default_repository`, and those are clean.
   - The skill's own check is stricter: `git status --porcelain` must print nothing. Here it printed untracked `*.done` markers under `explorations/coordinator/consolidation-2026-10-22/`.
   - The alternative was to build a base of my own, which needs a second worktree. The launch message's limit of one seeded worktree, on a disk with 2 GB free, ruled that out.
2. **The set is `DemoTests`'s 52 programs, not all 62 `.fss` files.** The other ten are components with no `run`, which the team's harness skips (`FileTests.java:934-935`).
3. **The demos ran from `ProjectFortress/demos`.** The exception is `wordcount2`, whose data path is relative to the tree root. The alternative was to run all of them from the root. Every other demo's file paths are absolute (`homeDir`, `fortress.autohome`), so the starting folder changes nothing else.
4. **The limit is 600 s.** Every demo of the base run ended well inside it. No timing of walk is recorded here (the `fortress-repo` skill's rule).
5. **Each repair follows a form that the record or the team's own later code already uses.** The choices, with the alternatives not taken:

   | demo | repair chosen | alternative |
   |---|---|---|
   | timing lines, `QQ` values | `asFloat` (rows 791 and 449, P-74) | — |
   | BirdCount1m, 1n, 1o (`stringToFloat`) | keep the team's algorithm and change one expression | the library's `strToFloat`, which the team adopted from BirdCount1p on (`BirdCount1p.fss:46-47`) |
   | BirdCount1z, 2a (`ReadList`) | delete the unused abstract, as `GenomeUtil2b` does | a body `nextRange(): () = getNextRange()` |
   | npbft | drop `extends Number`, because `Number`'s `comprises` does not list `Complex`; add `AdditiveGroup[\Complex\]`, which is `SumReduction`'s bound (`Library/FortressLibrary.fss:3430`) | keep `Number` and write an `asFloat` body. That body means nothing for a complex number, and `SUM` would still fail, because `Number` extends only `AnyAdditiveGroup` |
   | trips | delete the demo's duplicate declarations | rename them |
   | aStar | rename `Self` to `Inst`; any name that is not reserved works | — |
   | mg | row 464's `typecase` | row 464's two constructors |
   | BirdCount2d | copy `GenomeUtil2c`'s api file | point `BirdCount2d` at `GenomeUtil2c` |
6. **Draft A gathers ten demos' timing sites into one row**, because they share one mechanism. The alternatives are one row per demo, or a rewrite of row 791 that covers them all.
7. **The patch includes row 468's library edit** (`Library/Generator22D.fss`), because DemoGenerator22D cannot run without it. No other demo or test imports `Generator22D`: `grep -rl Generator22D ProjectFortress/demos ProjectFortress/tests Library` lists only `DemoGenerator22D.fss` and the component's own two files.

## 7. For FACTS

- **The fact.** Under walk at 23878af0e (the code of 0c7e7be18), 30 of the 52 demos that the team's `DemoTests` runs reach their end and 22 stop. With `perf-probes/team-demos/demos-repairs.patch` applied, all 52 reach their end.
- **What it means.** The patch is P-79's backlog of demo repairs: 22 demo files changed, one library file changed, one api file added. Row 791's repair alone clears 9 first stops and 5 later ones.
- **Numbers.**
  - Of the 22 demos that stop, rows hold 8: row 670 holds 3, row 791 holds 2, and rows 449, 464 and 468 hold 1 each.
  - The other 14 have no row: draft A covers 7, draft B 3, and drafts C, D, E and H 1 each.
  - Drafts F, G and I are later stops of demos already counted.
- **Test.** None. The demos run in no suite. Each run is `cd ProjectFortress/demos && ../../bin/fortress X.fss < /dev/null`, with the arguments of section 1. Sections 2 and 3 quote the outputs.
- **Detail.** Sections 2 and 3 of this report.

## 8. Commands

- **To check a draft row without filing it:** `python3 explorations/coordinator/tools/ledger.py add ROW --section TITLE --ledger COPY --history COPY`, where `COPY` is a copy of `explorations/fortress-gap-ledger.md` and of its history, made under `tmp/`. The row is added only to the copies.
- **To give scripted input to a demo that reads `/dev/stdin` once per line:** use a slow pipe, as in `feed () { sleep 8; for l in "$@"; do echo "$l"; sleep 4; done; }; feed Bob 3 5 1 2 no | ../../bin/fortress newtictactoe.fss`. A file redirect does not work, because each new `FileReadStream("/dev/stdin")` reopens the file at its start.

## 9. Questions for the curator (decisions not taken)

1. **Does the patch land as P-79's rewrite of the demos?** P-79 asks for these repairs. But the patch also edits the original tree's library, in `Library/Generator22D.fss`. By the skill's rules that edit lands only with a test first, a reproduction of row 468. The demo edits need no test, because the demos are in no suite.
2. **Should `GenomeUtil2d.fsi` be added?** It would be a new file in the team's folder, written from the team's own `GenomeUtil2c.fsi`. The alternative is to leave BirdCount2d failing, with draft E as its row.
3. **Is draft A one new row, or a rewrite of row 791?** See section 6, item 6.
4. **Is the npbft repair the right shape?** Complex numbers are specified but not built. The repair makes `Complex` an `AdditiveGroup` and no longer a `Number`. The alternative is for npbft to wait for a complex type.

## 10. What I could not settle

- **Draft H's mechanism is a reading.** That walk infers `embiggen`'s `T` as `Chunk` was not traced. The measured part is that writing `[\WordState\]` clears the stop.
- **tictactoe was not played through to 'Bye'.** Its computer's moves vary from run to run, so one scripted input could not end a game (section 4).
- **The compiled path was not run.** Row 710 and row 731's demo half stand as the ledger states them.
