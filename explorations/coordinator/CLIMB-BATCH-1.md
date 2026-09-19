<!-- The decision record for batch 1 of the compile-path climb, written 2026-09-19 by the coordinating session on Pavol's go ("we should do the next climb using the new pipelining script we used for the repair ... launch that climb") after the repair batch landed. Written to be executed by a session that was not present: everything needed to run it is here or cited from here. One line per paragraph. -->

# Climb batch 1

## Why this batch, and why these four

Pavol's instruction on 2026-09-19: take the next climb targets and go through them with the batched machinery, unless the ten ledger rows the repair batch opened (319-328) reveal a higher-priority target to put at the front. The coordinator was to take that decision and launch.

The decision: none of rows 319-328 is on the target program's path, so none goes to the front. The two target programs (`explorations/apl/mg/`, `explorations/run-c4/src/`) use no `atomic`, no `throw`, no `asString`, no `NN32`/`NN64`, and no numeral near a 32- or 64-bit boundary (a grep of every `.fss` in both, 2026-09-19; the counts are in `FACTS.md`, ladder section). Row 320 (a top-level variable exported through an api does not link) is the one that will bite the path — both programs export `corpus: Corpus` from their api (`apl/mg/MicroGptApl.fsi:18`, `run-c4/src/MicroGptFlat.fsi:16`) — but it is a codegen (`.java`) rung and the batch's one `.java` slot has a higher-value use; it is first in line for the next batch's slot. Rows 319, 322 and 324 (fields, `also` arms and exceptions inside `atomic`) are conformance defects of the compiled `atomic` the program never exercises; 321 waits on Pavol's rendering decision; 323 is the interpreter's; 325-328 are numeral edge cases the program's small numerals never reach.

What did change the queue is the ranking criterion. `next-climb/candidates.md` §4 drew its first batch by ladder file counts; `PLAN.md` measures by one program. Counting the candidate names in the two target programs: `MOD` 32 uses, `exp` 8, `log` 7, `round` 3; `nanoTime` 16 and `SQRT` 14 (both already in the compiler prelude); `seq` 22 (present for `ZZ32` ranges, `CompilerLibrary.fsi:111`); and zero of `recordTime`, `printTime`, `TryAtomicFailure`, `printThreadInfo`, `ceiling`, `floor`, `Maybe`, `Char`. So the named integral operators and the `RR64` functions, which candidates.md ranked third and seventh by files, are first and second by the program; `Maybe` stays for its cascade value (59 of 139 disambiguate files, the prerequisite of every collection rung and of the library route); and `recordTime`/`printTime` keeps its place as the ladder's best pass candidates and the first library use of R1's transactional cell. `TryAtomicFailure` and `printThreadInfo`/`printTaskTrace` drop out: no path value, and the second would have spent the `.java` slot on diagnostics.

## The four rungs

### F. The functional methods of `trait RR64`: `exp`, `log`, `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`, `floor`, `ceiling`, `round`, `truncate`

One rung, not two, by batch rule 1: `floor`/`ceiling` (candidates.md's C) and the transcendentals (its §2 tail) both go into the body of `trait RR64`, and no two rungs may change the same trait body.

**The program.** `exp(z - (BIG MAX[t <- z] t))` in the softmax (`apl/mg/MicroGptApl.fss:42`, `run-c4/src/MicroGptFlat.fss:28`); `log(pick(pr, tg))` in the loss (`MicroGptFlat.fss:61`); `exp` and `log` passed as function values to `Array.map` (`apl/mg/FlatArrays2.fss:44-45`), which is why they must be functional methods (declared with an explicit `self`), callable as `exp(x)` and nameable as `exp`, the shape of `opr SQRT(self): RR64` at `CompilerBuiltin.fss:900`.

**The specification.** `basic-lib/numbers.tex:464-476` defines `floor`, `ceiling`, `round` (an exact half to the even integer) and `truncate` (toward zero) on ℚ, returning ℤ; the "Real" numbers section of that chapter is commented out (`numbers.tex:920`), and no prose chapter names `exp`, `log` or a trigonometric function (`grep -rn` over `basic/`, `basic-lib/`, `advanced-lib/numbers-advanced.tex` finds nothing). So the return types on `RR64` and the transcendentals are precedent questions, and the precedent is the interpreter: `Library/FortressLibrary.fsi:319-332` declares `sin`..`exp` and `floor`/`ceiling` returning `RR64`, `truncate` returning `ZZ64`; `FortressBuiltin.fss:162-190` binds them to `Float$Exp` and the rest, with `round(self): ZZ64` at `:189`. The compiler world has `ceiling(self):RR64` and `floor(self):RR64` commented out at `CompilerBuiltin.fsi:439-440` with their natives already bound (`simpleDoubleArith.doubleFloor => jDoubleFloor`, `doubleCeiling => jDoubleCeiling`, `CompilerBuiltin.fss:212-213`) and used by the enclosing operators at `.fss:898-899`. The deviations to argue: the spec's ℚ methods return ℤ where the interpreter's `RR64` versions return `RR64` or `ZZ64`; and Java's `Math.round` rounds a half up where `numbers.tex:470-472` says to the even integer.

**The natives.** `simpleDoubleArith.java` has `doublePow`, `doubleSQRT`, `doubleFloor`, `doubleCeiling` (`:68-88`) and none of the rest; the missing ones are one static method each over `java.lang.Math`, in that file or in a new one beside it (rung 7 made a new file, `simpleIntLiteralArith.java`; either is a precedent). They deal in `double`, so no `NamingCzar` clause is needed (rung 7 needed one only because its helper dealt in a Fortress type, `NamingCzar.java:341-343`). This is the batch's one `.java` rung; `ant compileAll` is required.

**What it clears on the ladder.** `buffons.fss` (floor, ceiling), `roundBug.fss` (round, truncate), `juxtTwice.fss` and `oprTests.fss` (the transcendentals); `realArith.fss` and `testRR32.fss` want them among twenty other names each.

### M. `Maybe`, `Just`, `Nothing` for the compiler world

**The program.** Not named by it. Chosen for the cascade: it is in 59 of the 139 files at the disambiguate wall and every later collection rung is smaller for it (`candidates.md` §2); `ImmutableArray`'s 26 files and `LexicographicOrder`'s 20 name it inside `Library/List.fsi` and `Set.fsi`, which is the library route's own wall.

**The specification.** The prose chapters use it as a given: `basic/exceptions.tex:62-69` declares `settable message: Maybe[\String\]` and `:114-117` writes the default `= Nothing` — an unparameterised `Nothing` as a value of `Maybe[\String\]`. That is a fact for the naming decision, not a listing to copy. `library/default-libraries.tex` is an api rendering and does not count.

**The precedent, twice, and they disagree.** The interpreter: `value trait Maybe[\T\]` at `Library/FortressLibrary.fss:1306`, `value object Just[\T\](x:T)` at `:1312`, `value object Nothing[\T\]` at `:1342` (api at `.fsi:829-859`); every corpus test writes `Nothing[\ZZ32\]`. The team's own draft for the compiler world, commented out at `Library/CompilerLibrary.fsi:217-229`: `Maybe[\T\] comprises { Just[\T\], NothingObject[\T\] }` with `coerce(x: Nothing)` and a separate unparameterised `object Nothing` — which is exactly what makes the spec's `= Nothing` type-check, since the compiler world has coercion and the interpreter does not (FACTS, the map: coercion is the one mechanism the compiler path has and the interpreter lacks). The compiler world already implements the protocol under other names: `value trait Option[\E19\] extends Condition[\E19\] comprises { NoneObject[\E19\], Some[\E19\] }` with `coerce(_: None)` and `value object None`, `CompilerBuiltin.fsi:648-660`, bodies at `.fss:1309-1367`; nothing in `compiler/` or `runtimeSystem/` names `Option`, `Some` or `None`, so this is a pure library rung.

**The decision inside the rung.** Which spelling of the empty case: the team's draft (`NothingObject[\T\]` plus `object Nothing` and a coercion, the spec's `= Nothing` then works) or the corpus (`Nothing[\T\]`, the spec's `= Nothing` then does not). Both cannot coexist. Argue it from `exceptions.tex:114`, from the draft, and from what the corpus files at the wall actually write; say in REPORT.md that it was a decision and what the alternative costs. Do not delete or rename `Option`, `Some`, `NoneObject` or `None`: gated tests use them, and deleting a test is a reserved fork. Whether `Maybe` is built over `Option` (a subtype or a wrapper) or beside it as a second copy is part of the same decision.

**What it clears.** `ExceptionScoping.fss` (`Nothing[\ZZ32\].get`) and `oddJuxt.fss` alone; 57 more files lose one name.

### N. The named integral operators `MOD`, `REM`, `GCD`, `LCM`, `LSHIFT`, `RSHIFT` on `ZZ32` and `ZZ64`

**The program.** `MOD` 32 times, on `ZZ32` indices: `m[i DIV nc, i MOD nc]` (`apl/mg/AplMg.fss:14`), `v[i MOD |v|]` (`:33`), the strided views' `get`/`put` (`apl/mg/FlatArrays2.fss:77-89`).

**The specification.** `basic-lib/basic-integers.tex:439-456`: `REM` is the remainder of the truncating division `÷`, `MOD` the remainder of floor division ("rounds inexact results towards negative infinity"), both `throws IntegerDivisionByZero`; `GCD` and `LCM` at `:247-248`. So `MOD` is not Java's `%` (which is `REM`): `(-7) MOD 3` is `2`, `(-7) REM 3` is `-1`. The skeptic's differential must include negative operands.

**The precedent.** The interpreter declares them in `trait Integral[\I\]` (`Library/FortressLibrary.fss:622-636`) and binds them per type to `Int$Rem`, `Int$Mod`, `Int$Gcd`, `Int$Lcm` (`:666-676` for `ZZ32`, `:736-742` for `ZZ64`). The compiler prelude's `trait ZZ32` (`CompilerBuiltin.fsi:202-256`) and `trait ZZ64` (`:147-201`) have `DIV`, `<<`, `>>`, `<<<`, `BITAND`, `MIN`, `MAX` and none of the six; `simpleIntArith.java` has no native for them. None is needed: `REM` and `MOD` are writable over `DIV`, `-` and juxtaposition, `GCD` over `REM`, `LCM` over `GCD` and `DIV`, and `LSHIFT`/`RSHIFT` are names for `<<`/`>>`. Pure Fortress, inside the compiler world's flat design, never naming `Integral`. Division by zero: what `DIV` does today on this path is the precedent for what `MOD` and `REM` do; establish it and record it (the failure-mode question).

**What it clears.** `chain0.fss` (`GCD`, `LCM`, `MOD`) and `rshiftbug.fss` (`RSHIFT`); `intPrim`, `longPrim`, `UnsignedTest`, `NumberPrintTest`, `simpleSum` each need it plus `widen`/`narrow`.

### T. `recordTime` and `printTime`

**The program.** Not named by it (it calls `nanoTime()` directly, 16 times). Chosen because `nestedTransactions1.fss`, `2` and `4` name these two and nothing else at the wall and the rest of each file is supported, so they are the ladder's likeliest passes; and because the body needs a top-level mutable variable, which is the first use of R1's transactional cell by library code.

**The specification.** Silent: no prose chapter names `recordTime`, `printTime` or `nanoTime`. Precedent governs.

**The precedent.** `Library/FortressLibrary.fss:4109-4118`: `nanoTime(): ZZ64`, `__globalTimeInformation: ZZ64 := 0`, `recordTime(dummy: Any)` stores it, `printTime(dummy: Any)` prints the elapsed milliseconds. The compiler world's `nanoTime(): RR64` is at `CompilerBuiltin.fsi:23`, bound at `.fss:335` to `simpleDoubleArith.doubleNanoTime`; the type differs (`RR64`, not `ZZ64`) and that is a deviation to record, not to repair. The variable goes in `CompilerLibrary.fss` as rung 3 and R1 made possible; a top-level variable exported through an api does not link (row 320), so it must not be exported.

**What it clears.** `nestedTransactions1`, `2`, `4`, plausibly to `pass`.

## How it is run

`coordinator/climb-batch-workflow.js`, the repair batch's script generalised: four rungs on `wip/<slug>` branches, each judged by its own skeptic, one repair round, a judge on the session's model only on a refusal, a stop or a red gate; gather, review, one full gate, commit. Launch: the four worktrees created from the commit `main` is at (recipe in `remote-container.md`), then `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<that commit>'}})`.

**The batch rules hold**: rule 1, four disjoint sets of declarations (F in `trait RR64`, N in `trait ZZ32` and `trait ZZ64`, M new declarations, T new declarations in `CompilerLibrary`); rule 2, no rung needs another's names; rule 3, one `.java` rung (F); rule 4, k = 4. The harness runs two agents at a time, so the batch is two waves.

**The gate is the full pair.** F is `.java`, so clause 1 of the `testSystem` drop rule (`next-climb.md` §5) fails; the drop would have saved 127 s of a 739 s gate and is not worth a first use here. `FORTRESS_THREADS` stays at 1 from `experiment/env.sh`, as it was; the thread-count question is open with Pavol and is not decided by this batch.

**Two things the briefs carry that the repair batch's did not**, from `next-climb.md` §4: a four-line provenance block under the title of every REPORT.md (`problem:`, `spec:`, `precedent:`, `deviation:`, each ending in a `file:line` or the literal `none`, an `(api listing)` citation labelled and not sufficient alone), which the skeptic opens line by line and refuses the rung on if a line is missing or does not say what the block says; and the map rows and the precedent lines pasted into each tail rather than pointed at. The `.test` line is `run_out_contains=PASS`: `run_out_WIcontains`, which `PLAN.md` and `library_tests/Boolean.test` write, is not implemented by the harness (FACTS, R1's finding; `FileTests.java:147`). Not adopted from §4: copying a semantic deviation into the source as a comment, which `protocol.md` §2 forbids; the deviation lives in REPORT.md and record.md.

**New ledger rows** are numbered provisionally from 329 in each rung's record.md; the gather assigns final numbers in manifest order (F, M, N, T).

Landed 2026-09-19 at 11:35 UTC as `b70ed4590..261fedd71` off `cb242a2d8`, run `wf_3b5a273c-a80`
(relaunched at 08:24 after the 07:15 launch was cut at 07:46): all four rungs in, the gate green
in 830 s, one refusal and one judge ruling on rung N, no gather conflict, the ladder's pass
count 81 → 85, and ledger rows 329-336 opened in manifest order.

## What is NOT in this batch

The two reserved forks, untouched: the array representation (`next-climb.md` §3a, the sketch that would let Pavol decide it is still unwritten) and the library route. `nat` checking (PLAN step 4), the one piece larger than a batch that no fork blocks. Rows 319-328, for the reasons above; row 320 is the next batch's `.java` candidate. `TryAtomicFailure` (one uncomment, three files to the codegen wall), `printThreadInfo`/`printTaskTrace`, `Char`, `widen`/`narrow`/`unsigned`/`signed`: the fork-free tail, for a later fill. The `asString` rendering (row 321) and the gate thread count: Pavol's.

## What may surface

A rung that concludes its right shape changes a declared type the prelude already has, or renames or removes a declaration a gated test uses, stops: that is a change of api or a deleted test, both reserved. M is the rung most likely to meet it. A silent specification elsewhere is rule 4 of the prefix: think harder, decide, write it down; the coordinator reports every such decision to Pavol at landing.

## At landing, 2026-09-19: what the run corrected in this record

Kept as written above, corrected here (the rung records and `FACTS.md` carry the sources): §M's "clears `ExceptionScoping.fss` and `oddJuxt.fss` alone" did not happen, because the spelling the rung chose (the specification's non-parametric `Nothing`, ledger row 331) makes the corpus's `Nothing[\T\]` a static error, so `oddJuxt` goes from two errors to one and `ExceptionScoping` stays at one. §F cites `numbers.tex:920` for a commented-out "Real" section; the file has 566 lines and no such section, and the conclusion (no prose defines `exp`, `log` or the trigonometric functions) holds by the grep the rung re-ran. §N cites `basic-integers.tex:247-248` for `GCD`/`LCM`; that is the declaration listing, and the governing prose is `:518-529`. The `(api listing)` convention points at `Specification/library/apis/`, which is not in the tree (`FACTS.md`, specification section). "The harness runs two agents at a time, so the batch is two waves" was four waves, because a freed slot goes to the next rung's worker and not to the finished rung's skeptic (`FACTS.md`, ladder section, the scheduling bullet). The gate estimate "127 s of a 739 s gate" was 154 s of 830 s. The four-line provenance block was eight lines for F and eighteen for N, both splitting `deviation:` and saying so, and M's `problem:` and `deviation:` lines end in prose rather than a `file:line` or `none`; the skeptics accepted all three. Rows 329 and 330 were filed in ledger section 10 with the rest of the batch, and rung F's record argues for section 2; rows never move, and rows 337 and 338 were filed the same way for consistency; whether later interpreter defects found by compiled-path probes go to a feature section is Pavol's call.
