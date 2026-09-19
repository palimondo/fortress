<!-- Skeptic's judgement of rung T of climb batch 1, written 2026-09-19 by the skeptic session.
     First judgement of this rung.  One line per paragraph. -->

# Skeptic: rung T, `recordTime` and `printTime`

**Verdict: approved, with four required corrections.** All four are to the record, not to the code. The code is right, minimal and gated; the recorded failure is genuine; the ladder claim survives an independent re-run. Two of the four corrections are load-bearing: one on a decision the coordinator will put in front of Pavol, one on the wording of an append to a ledger row that thirty-five reports cite.

## What I verified, and how

### The provenance block

Every `file:line` in it opens and says what the block says.

`problem:` — `ProjectFortress/tests/nestedTransactions1.fss:34` is `recordTime(6.0)` and `:36` is `printTime(6.0)`; `nestedTransactions2.fss:46,48` and `nestedTransactions4.fss:30,32` likewise; `explorations/compile-ladder/ladder.tsv:305,306,308` are the three `disambiguate` rows with first error `Variable recordTime is not defined.` Exact.

`spec:` — `none`. I reran the grep myself: `grep -rn "recordTime\|printTime\|nanoTime" Specification/ Specification-1.0-frozen/ | wc -l` returns `0`. Nothing is cited from `Specification/library/apis/`, so rule 3 of the shared prefix is not engaged; the two clauses the report does lean on are from `Specification/basic/`, which is the right part of the tree.

`precedent:` — `Library/FortressLibrary.fss:4111-4118` is the interpreter's `__globalTimeInformation: ZZ64 := 0` followed by both bodies; `Library/FortressLibrary.fsi:2393-2394` declares the two functions and no variable. Exact.

`deviation:` — `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:23` is `nanoTime(): RR64`; `Library/FortressLibrary.fss:4117` is `secs: ZZ64 = (e+500000) DIV 1000000`; `Library/CompilerLibrary.fss:95-96` is the file's own comment that the messages are built with `||` "rather than with juxtaposition, which inserts a space on the compiled path"; `CompilerBuiltin.fsi:414-415` are `coerce(x: FloatLiteral)` and `coerce(x: RR32)` and there is no `coerce(x: IntLiteral)` in `trait RR64`. Exact.

### The recorded failure

It exists and it is genuine. `probes/junit-before.txt` was taken with the library reverted to the batch base (`tmp/recapture2.sh` runs `git checkout -- Library/CompilerLibrary.fsi Library/CompilerLibrary.fss`, deletes this test's own cache entries, rebuilds the three components, then runs the test), and it records seven `Variable recordTime/printTime is not defined.` errors, `File TimingRungT.fss has 7 errors.`, `Failed to satisfy run_out_contains; expected PASS`, and `Tests run: 2,  Failures: 2,  Errors: 0`.

I checked the claim the worker did not evidence — that the before-capture ran the *same test text* as the pass. It did, and the proof is in the line numbers. `junit-before.txt` names errors at `:54`, `:60`, `:65`, `:71`, `:77`, `:78`, `:79`. In the test text committed at `2ad2d3ec5` (the failing-test commit) the seven calls are at `:47`, `:53`, `:58`, `:64`, `:70`, `:71`, `:72`; in the text at `HEAD` they are at exactly `:54`, `:60`, `:65`, `:71`, `:77`, `:78`, `:79`. So the capture ran the final text, from the dirty worktree, not the older committed one. The `dirty:` header of the capture says `M ProjectFortress/library_tests/TimingRungT.fss`, consistent with that.

### The diff

22 added lines in the two library files and nothing else outside `explorations/`: `Library/CompilerLibrary.fsi:250-255` (a `Timing` section, `recordTime(dummy: Any): ()` and `printTime(dummy: Any): ()`) and `Library/CompilerLibrary.fss:545-558` (`__globalTimeInformation: RR64 := 0.0` at `:549`, `recordTime` at `:551`, `printTime` at `:553-558`). The reported line numbers are exact. No `.java`, no `.scala`, nothing under `compiler/` or `runtimeSystem/`. It is as small as the test needs.

### The test is actually in the gate

`ProjectFortress/src/com/sun/fortress/tests/unit_tests/LibraryJUTest.java:36` sweeps `ProjectFortress/library_tests` for `.test` files, and `build.xml:968` includes `**/LibraryJUTest.class` in a `testFast` track. So `TimingRungT` will be run by the batch gate, which is what a gated test has to mean.

### The test exercises the defect, in both shapes the tail requires

A measurable interval: `countDown(thousand())` between the pair, measured at `581.822329ms` and `138.007975ms` in `probes/junit-after.txt`. A call pair around an atomic block: `TimingRungT.fss:65-71`, `recordTime(0)` then `atomic do for i <- one() # five() do atomic do ... end end end` then `printTime(0)`, which is the shape of `nestedTransactions1.fss`. Both present. The third pair pins the re-record.

### The competing-declaration grep

Reproduced independently over the whole tree. The only declarations of the three names anywhere are the interpreter's (`Library/FortressLibrary.fsi:2393-2394`, `.fss:4111-4113`), the dead stub's (`CompilerLibrary/FortressLibrary.fsi:2384-2385`, in the top-level directory that is on no source path), and this rung's. Every other hit is a use: the four `nestedTransactions` files, five `demos/`, `Fortify/example/buffons.fss`. Nothing anywhere else uses the name `TimingRungT`. The worker's `probes/name-grep.txt` is accurate.

### The ladder claim

Re-run by me, on the shared cache rather than the worker's private ladder root, in `probes/skeptic/ladder-recheck.txt`: `nestedTransactions1`, `2` and `4` each compile with exit 0 and run with exit 0, printing `Starting test` and one `Operation took ...ms` line, no `fail`/`FAIL`. That is `classify.py:21-22`'s criterion for `pass`. The claim holds.

### The ledger append

Row 320 exists at `explorations/fortress-gap-ledger.md:331`, is `NEGATIVE-VERIFIED`, and says what the append says it says, including the closing sentence the append corrects. The three code sites the append derives its mechanism from all say what is claimed: `CodeGen.java:5877-5879` picks `descFortressMutableFValueInternal` for a mutable top-level variable and the declared type's descriptor otherwise; `addTopLevelVarBinding`'s branch at `:5945-5950` picks `MutableStaticBinding` when `lv.isMutable()`; `forVarRef`'s fresh-import path `:5966-5970` always builds a plain `StaticBinding` with `NamingCzar.jvmTypeDesc(ty, thisApi())` and never looks at mutability. The two-part fix the append derives follows from those three sites and is correct. The append cites an existing row, renumbers nothing, and reserves no new number.

## My own differentials

Five programs the worker did not write, each run under `bin/fortress FILE.fss` and under `bin/fortress compile` + `bin/fortress run`. Sources in `probes/skeptic/`, outputs in `probes/skeptic/walk.txt` and `probes/skeptic/compiled.txt`.

| probe | walk | compiled |
|---|---|---|
| `SkepticNoRecord` — `printTime` with no preceding `recordTime` | `Operation took 10147559ms` | `Operation took 1.0174680816587E7ms` |
| `SkepticShortInterval` — eight back-to-back `recordTime`/`printTime` pairs | eight × `Operation took 0ms` | `4.882033`, `0.007399`, `0.001975`, `0.001346`, `0.001338`, `0.001424`, `0.001387`, `0.001339` ms |
| `SkepticArgTypes` — the dummy as `String`, `Boolean`, `ZZ32` | accepted, `ARGS OK` | accepted, `ARGS OK` |
| `SkepticNested` — a report inside a timed region | inner `0ms`, outer `4ms` | inner `0.043817ms`, outer `1.140911ms` |
| `SkepticAtomic` — the pair **inside** an `atomic` block | `Operation took 1ms`, `ATOMIC OK` | `Operation took 8.541542ms`, `ATOMIC OK` |

Three of the five answer questions the rung's own test does not reach. `SkepticAtomic` is the one I most wanted: the rung's test brackets an atomic block from outside, so it never writes the new top-level mutable variable from *within* a transaction, which is the whole point of its being the first library use of R1's cell. It works, on both paths, and the value it reports is sane. `SkepticArgTypes` confirms the `Any` parameter takes the kinds the corpus does not pass. `SkepticNested` confirms the two paths agree on the structure the single global forces: a report inside a timed region resets the clock, so the enclosing report measures from the inner one, identically in both worlds.

`SkepticNoRecord` and `SkepticShortInterval` are where the two paths part, and they are the basis of corrections 1 and 2 below.

## The failure-mode question, answered

Yes: this rung turns a loud failure into a quiet value. Before it, `recordTime` and `printTime` were a compile-time disambiguation refusal that stopped the program dead — seven of them in the rung's own test, `File TimingRungT.fss has 7 errors.` After it, they compile and print a number.

The quiet value worth naming is `printTime` called with no preceding `recordTime`, which the worker listed under "what was not done" and predicted without probing. I probed it. The value is the machine's `nanoTime` origin in milliseconds, printed with no indication that nothing was recorded: `Operation took 1.0174680816587E7ms` compiled, `Operation took 10147559ms` under walk. The worker's prediction was right in substance.

Against the specification: it is silent on all three names, and I reproduced the grep that establishes that. The interpreter has printed exactly this nonsense since 2012, so the rung is faithful to the only precedent there is, and the diagnosability cost is not created here — it is now simply carried on both paths. It does not stand in the way of landing. It is established, and it belongs in the record, which correction 1 asks for.

## Required corrections

These four must be closed by the commit stage. They are not preferences.

### 1. Record the scientific-notation regime, and stop citing it against only the rejected alternative

REPORT.md decision 1 rejects alternative (d), string surgery, *because* `Double.toString` produces scientific notation — and does not record that the alternative it took has exactly the same exposure in its own output. Measured on this worktree's JDK (`probes/skeptic/double-boundary.txt`, source `DoubleToStringBoundary.java`): `Double.toString` renders scientifically at `>= 1.0e7` and at non-zero `< 1.0e-3`, and prints `0.0` for exactly zero. So `printTime` prints `1.0174680816587E7ms` for any interval at or above 2.78 hours — measured, `probes/skeptic/compiled.txt` — and would print `9.99E-4ms` for any non-zero interval below 1000 ns. That lower bound is not theoretical: the shortest interval my eight-pair probe measured was 1338 ns, 1.34× above it, and the worker's own test measured 1982 ns.

Add the measured regime and both boundaries to decision 1 in REPORT.md and to the rendering paragraph of record.md. What must change is that the rendering the rung chose is recorded as having a scientific-notation regime of its own, with the two boundaries and the two measurements, rather than scientific notation being recorded only as a cost of the option that was not taken.

### 2. Correct the stated cost of changing the rendering — it is wrong at merge time

record.md tells Pavol: "If Pavol would rather the two paths' timing lines read alike, the cost is a rounding helper in `simpleDoubleArith.java` and a `.java` slot in a later batch." REPORT.md decision 1(c) says the same, that `trait RR64` has no conversion out to an integer and that adding one "would make this a `.java` rung, which batch rule 3 reserves to rung F".

That is true of the batch base and false of the merge. Rung F of **this** batch is chartered to add `round` and `truncate` to `trait RR64` (`explorations/coordinator/CLIMB-BATCH-1.md`, section F names both in its title), and the precedent that section cites returns integers: `truncate(self):ZZ64` at `Library/FortressLibrary.fsi:333` and `round(self):ZZ64` at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:189-190`. If F lands them with `ZZ64` returns, the compiler world has an `RR64`-to-integer conversion the moment the four branches merge, and matching the interpreter's rendering becomes a one-line library edit with no `.java` slot at all.

The decision itself stands — batch rule 2 forbids rung T from using rung F's names, and the rung was right not to. What must change is the cost statement, in both REPORT.md decision 1(c) and the record.md paragraph the coordinator will read to Pavol: say that the conversion is absent at the batch base, that rung F of this batch is chartered to add `round`/`truncate` on `RR64`, and that if F lands them with `ZZ64` returns the rendering becomes a pure-library change after the merge. Otherwise Pavol is asked to weigh a `.java` slot that the same batch may have already spent.

### 3. Name the revival's own rendering precedent, which the search missed

The precedent search is thorough for *declarations* of the two names and I reproduced it. But the decision actually taken was a **rendering** decision, and for that there is a second body of precedent the search never looked at: the revival's own target programs render an elapsed `nanoTime` as whole milliseconds by integer division, at eight sites — `explorations/apl/mg/MicroGptApl.fss:124`, `MicroGptAplCheck.fss:61`, `:67`, `:97`, `explorations/run-c4/src/MicroGptFlat.fss:95`, `MicroGptFlatCheck.fss:59`, `:65`, `:95`, all of the form `((nanoTime() - t0) DIV 1000000) " ms"` (and `DIV 1000000000` for seconds). That is the house convention, and it agrees with the interpreter and not with this rung.

It does not overturn the decision: those eight sites run on the interpreter, where `nanoTime` is `ZZ64` and `DIV` applies, and `trait RR64` in the compiler world has no `DIV` at all (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:413-442`). But it must be in the record, for two reasons. It is the closest thing to a house style for the question the rung decided, and a decision record that does not weigh it is incomplete. And it surfaces a fact the coordinator needs independently of this rung: those eight sites, as written, will not compile on the compiled path, for the same `RR64`/`ZZ64` split this rung met and recorded.

### 4. Fix the mechanism sentence in the row-320 append

The append says the class name comes from "`NamingCzar.jvmClassForToplevelDecl(id, packageAndClassName)` on the importing component's package name". That is not what that function does, and the append's whole point turns on it. `jvmClassForToplevelDecl` (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:1653-1656`) first calls `repairedApiName(x, api)` (`:1673-1679`), which *replaces* the passed-in default with the `Id`'s **own** api name whenever it has one. That is why row 320's probe fails on `P8Api$shared` — the api's name, not the importing component's — and why this rung's probe fails on `fortress.CompilerLibrary$__globalTimeInformation`.

Rewrite that sentence in record.md so that it says the class name is the *api's*, via `repairedApiName` at `NamingCzar.java:1673-1679`, and that it names an existing class exactly when the api and the declaring component share a name, which is every prelude pair's case. The append is a correction to row 320 and will be read by whoever takes row 320 in the next batch; the sentence that explains why the failure moves must be right. Row 320 itself carries the same loose phrasing and the worker inherited it — the correction is to the append text, not to the row, which is the coordinator's and must not be renumbered or reworded here.

## What I did not find

No fabricated citation, in the provenance block, the report, the record or the ledger append. No missing recorded failure. No edit beyond what the test needs. No competing declaration. No renamed or removed declaration, and no change to a declared type the prelude already has, so neither of `CLIMB-BATCH-1.md`'s two stops is engaged. Nothing under `explorations/coordinator/` is touched by the branch, and `git diff cb242a2d8...HEAD --stat` confirms the whole change is the two library files, the two test files and the rung's own directory.

I did not run `ant testFast` or `ant testSystem`, as the brief directs.
