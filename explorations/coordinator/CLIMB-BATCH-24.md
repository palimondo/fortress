<!-- The record of climb batch 24, the second batch of the plan's phase 4, the switch-over, and the second of its natives (PLAN, phase 4, "Climb batch 24" and the natives line's sub-line on N1 and N2; P-33; P-58; `reviews/batch-23-review.md`, "The steps due before the next batch", item 6), for the coordinating session, the curator and the batch's workers. Drafted 2026-10-31 by an Opus planning worker against `main` at `1f5c49b4f`, whose `Library/`, `ProjectFortress/`, `Specification/`, `build.xml` and `bin/` are those of `df71bc585`, climb batch 23's landing (`git diff --stat df71bc585 1f5c49b4f` over them is empty); `main` moved on to `70e335bf1` while it was drafted, by the held list, POSITIONS brought to the tree, the review queue, the `widen` evidence and the helper-calls probe with its FACTS, no code: so climb batch 23's landed tables describe the base, and the planner's measurements hold on it. The scope is the curator's, settled with the coordinator on 2026-10-31 at about 08:3x UTC, with three additions of his words of 08:4x UTC (a compiled guard per family, `CHOOSE` on its probe's finding, row 701's rung if it fits); the go for the batch is pre-approved after the scope is discussed (`coordinator/HELD.md`, "Held in chat (2026-10-31)", 08:2x). Its Fable review comes before the launch. -->
<!-- Sources: PLAN.md, phase 4's lines, the natives line and its sub-lines, and "Climb batch 23, listed for his review"; CLIMB-BATCH-23.md whole; its post-batch review `reviews/batch-23-review.md`; POSITIONS P-58, P-37, P-153, P-29, P-30, P-68, P-151 and the others cited by number, as `a58b0a2c4` left them; FACTS F-32, F-298, F-299, F-181 and the others cited by number; the ledger rows 307, 330, 336, 502, 521, 672, 701, 812, 846, 847, 848 and 849; the review queue at `40f08d22e` (item 310 kept, asked again before a binding over String moves); the code at the sites; the specification's sections cited; the `fortress-repo` skill's `references/compiler.md` and `references/interpreter.md`, "Natives". -->
<!-- The planner's probes (section 4, "The planner's probes"): one worktree, `/home/user/fortress-p24`, seeded detached at `1f5c49b4f` from the base build `/home/user/fortress-base23` once its marker `tmp/BUILT` read 08:35:14 UTC, and removed after; nothing was built or run in the base build but `old-fortress.sh` runs with a private caches folder in the probe worktree. (1) F-32's classes counted again on the base, with the natives probe's scripts and one step added for the 21 moved bindings. (2) The families: the 83 bindings that name their helper as a bare string and still name a glue class, sorted. (3) A walk sample of the floating-point family, refused at load. (4) The three families moved, with walk's carry of `Float`, their values under walk on the old code and on the text. (5) The count stage and the distance stage on all 83 moved, and a control. (6) A compiled sample of the families' helpers bound by a program's own declarations. (7) A prototype of the walk rung, with the three families: the helper tests, walk's suite and the specification's examples. (8) Row 701's three guards dropped in a probe copy of the code generator, four programs compiled and run. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for the stages and the direct runs; the CHOOSE probe, the hard-set probe and the helper-calls probe shared the machine, the load rising from 1.7 to 34, so no time here is one to compare; walk was not timed. Patches, scripts and tables are under `compile-ladder/plan-24/probes/`, and its `NOTES.md` says how to run them again. One line per paragraph. -->

# Climb batch 24

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode with the **code generator**. Until the **switch-over** the compiled path uses its own small library, the **prelude**; after it, the interpreter's library, the **one library**.
- A **native binding** is a library declaration whose body is `builtinPrimitive("…")`, Java code in place of Fortress. Its string names a **glue class**, Java over walk's own values, which only walk can call, or a **helper**, a static Java method over plain Java values in `nativeHelpers/`, which both paths call (P-58).
- To **move** a binding is to change its string from a glue class to a helper. A **family** is a set of bindings moved together. A binding **fits** when its helper's Java types, read as the checker reads them, match the declaration, so the string alone changes.
- **The count** and **the distance** are the checker's errors on the one library: the count on its main component, the distance on its fourteen core components. Both are 0. They are also the check of each moved binding against its helper: the count reads the main component's bindings, and only the distance reads `FortressBuiltin`'s, where the floating-point family sits (P-39).
- A **rung** is one change, built by one worker and checked by a second, the skeptic; a **batch** is a few rungs landed together after the **gate**. A **guard** is a test that passes before the change and after it; an **`XXX` test** records a known defect and turns red when the defect is fixed.

### Where the natives stand

- **449 live bindings on the base, the same as climb batch 23's count, binding for binding and line for line:** 154 that the prelude binds the same way, 59 with an unused helper, 158 that need a new helper, 36 methods of the I/O objects, 42 with no compiled analogue (F-32). 21 name helpers since climb batch 23; 428 still name glue classes.
- **104 fit their helper as a bare string; 83 of them still name glue classes.** By owner: `Float` 30, `ZZ64` 21, `ZZ` 16, `FlatString` 5, `Long` 2, `BigNum` 2, 3 at top level, and one each of `ZZ32` (its `CHOOSE`), `NN32`, `NN64` and `Char` (section 4, "The count").
- **The other 109 cannot be moved by their string alone** (mostly `Char`, `NN32` and `NN64`, which the checker reads as plain integers). A probe of them runs now; its result has a place kept in this record and nothing planned yet (section 3, "The place kept for the hard set").

### The batch: one run, six rungs

Three rungs move natives, one checks them under walk, one fixes `CHOOSE` if its probe allows, and one is in the code generator.

- **F, the floating-point family: `Float`'s 30.** Comparison, arithmetic, square root, powers, the trigonometric and exponential functions, rounding, and the two string getters. Walk refuses these moves as they stand: its loader does not know that a `Float` parameter is carried as a Java `double`, so one moved string stops every program at load. F adds that one line to the loader. With it, the 30 give the same values under walk as before, on 719 printed results, edge values among them.
- **Z, the 64-bit and big integers: `ZZ64`'s 20 and `ZZ`'s 16.** `ZZ64`'s `CHOOSE` is left to K. Their values under walk are the same as before on 871 printed results. One thing changes: a division by zero on `ZZ64` and on `ZZ` now raises `DivisionByZero`, which a program can catch, where today it ends the program. That is how climb batch 23 fixed `ZZ32`'s (row 336). The remainders by zero still end the program; Z records them as known defects with `XXX` tests (rows 336 and 848).
- **S, the small rest: 8 bindings.** `Long`'s and `BigNum`'s string getters, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the function `char`. Same values on every printed result.
- **K, the `CHOOSE` fix, only if its probe allows.** The compiled `CHOOSE` helpers of `ZZ32` and `ZZ64` crash past a table where they should raise `IntegerOverflow` (row 521). By the planner's reading the fix is one line in each helper; the probe's patch, already on disk, also gives the `ZZ32` helper's scratch array one copy a call, since calls running in parallel share it today. The probe's note (`plan-24/probes/choose.md`) is still to come. If it finds the fix decided and small, K makes the fix and moves the `CHOOSE`s it covers; if not, K is dropped and `CHOOSE` waits, as before.
- **W, walk's check of `self`.** Today walk loads a helper bound in a method of a program's own object and passes the object to it as if it were a number or a string (row 847). W tells the loader which type declares the method, and refuses such a binding when the program loads. Measured with the three families: the library's 95 helper bindings all still load, and walk's suite fails only the `XXX` test that W promotes.
- **G, the code generator's `where` clauses (row 701).** The code generator refuses any function, method, object or trait whose own header has a `where` clause, and five such declarations in the core library will stop it after the switch-over. In the planner's probe, with the three tests of that refusal dropped, the three forms the library uses compiled and ran. One test then meets a second, known wall at run time (row 307), which G records. G stays clear of contracts, the other half of row 701.

Each rung that moves bindings has your two guards, both passing before the move and after it: a walk program that calls every binding it moves on chosen values, edge cases among them, and asserts each result; and a compiled program that binds the same helpers through its own declarations and asserts the same values, so that the code generator's call of each moved helper is tested now, before the switch-over. Each defect a rung meets gets an `XXX` test, promoted when its fix lands.

**Measured together on the base** (section 4): the count 0 and the distance 0 with all 83 moved, both tables equal to climb batch 23's; a control showed that the distance checks a moved `Float` binding against its helper. With F, Z, S and the W prototype together: walk's suite 694 tests, one failure, the `XXX` test that W promotes; the specification's 130 examples, no failure. The compiled sample of 18 of the families' helpers passed.

### The question for you, and what each answer costs

**Question 1, consequential: the two top-level bindings declared over `String`** (`printlnWithThread` and `getProperty`).
- Your scope names the small rest as `Long` 2, `BigNum` 2, "top level 3" and the singletons, and leaves out "the bindings over `String`" (row 846; review-queue item 310). Two of the three top-level bindings are declared over `String`, the very two that row 846 names.
- **Default: out, with the bindings over `String`.** S moves `char` only. Row 846 names these two, and the review queue asks item 310 again before a binding over `String` moves (`40f08d22e`).
- The other way: S moves them too, two more strings, with item 310 asked again first. A moved binding over `String` keeps row 846's defect as its glue class has it.

### What the batch leaves out (section 4, "Left out, each with its home")

- **The bindings over strings:** the two above, and `FlatString`'s 5, which your scope does not list. They are declared over `FlatString`, which row 846 does not reach, so they can join any later batch.
- **`CHOOSE`,** if its probe finds the fix not decided or not small: as before, with row 521's fix.
- **`widen` (row 502):** the one library's `widen` on `ZZ` has no helper yet, so no rung of this batch meets it; it waits for your decision, with the evidence written today (`reviews/widen-evidence.md`).
- **The `asFloat`s** (climb batch 23's fork 12), and the 109 that cannot move by their string alone.
- **The remainders and moduli by zero,** which need new helpers (rows 336 and 848), and row 701's other half, contracts.
- **Two silent conversions found by the planner,** the same on the old code and the new: `signed` of an unsigned value above the signed range wraps to a negative number, and `char` accepts a code point that is no character. The specification says nothing of either. The guards leave them out; the first is the same question as `widen`'s.

### Before the batch runs

- **Your go:** pre-approved after the scope is discussed (`coordinator/HELD.md`, 08:2x UTC on 2026-10-31). Question 1 is the one question; the record's other forks are taken at their defaults.
- **The two probes that run now:** `CHOOSE`'s decides whether K stands; the hard set's may bring a seventh rung, which the record and its generator have a place for.
- **A Fable review of this record** before the launch.
- The gather runs the 52 team demos on the merged tree, since four rungs change what walk runs.

### Cost

- **About 5.1M tokens written:** from 4.4M if no fix is contested and K drops, to 6.5M with a judge and a repair round on two rungs or a restart. Workers about 2.4M (F 0.45M, Z 0.45M, S 0.3M, K 0.35M, W 0.45M, G 0.4M), skeptics about 1.5M, the fixed roles about 1.2M. About 5 h 15 min, at two agents at a time, the 52 demos in the gather's time.
- Climb batch 23 wrote 3.20M over 11 agents for two rungs of Java in 2 h 57 min, of which 2.44M by the launches that finished; climb batch 22c 4.61M for four rungs in 4 h 37 min (`reviews/batch-23-review.md`, section 3).

## 2. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of his; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### Question 1, consequential: the two top-level bindings declared over `String`

**The question.** His scope of 2026-10-31 names the small rest "`Long` 2, `BigNum` 2, top level 3, and the singletons that fit", and leaves out "the bindings over `String` (row 846; review-queue item 310, his default 'neither yet')". The three top-level bindings that fit are `char(a:ZZ32):Char` (`Library/FortressLibrary.fss:4540`), `printlnWithThread(a:String):()` (`:4632`) and `getProperty(name:String, defaultValue:String):String` (`Library/System.fss:45`). The last two are declared over `String`, and row 846 names them both: "The library's natives over strings take `FlatString`, but `printThreadInfo`, `printWithThread`, `printlnWithThread` (`Library/FortressLibrary.fss:4628-4632`) and `getProperty` (`Library/System.fss:45`)".

**What stands.** Review-queue item 310 (PLAN item 62) keeps its default, neither, and is asked again before a binding over `String` moves (`40f08d22e`, "310 kept with its default, asked again before a binding over String moves"). F-299: "A native over `String`, helper or glue class alike, receives a non-flat string's type name (row 846)."

**Options.**
1. **Out, with the bindings over `String`.** S moves `char` and the seven others, 8 in all. Cost: none now; the two move with the string family, after item 310 is asked again.
2. **In.** S moves 10; item 310 is asked again before S's launch. Cost: one more question to him before the launch; the two keep row 846's defect, as their glue classes have it (row 846), and `getProperty` sits in `System`, outside the fourteen, so neither stage checks it: the count does not read `System`, nor the distance.

**Default: option 1.** Consequential because his two sentences split on these two bindings. Option 2 changes S's section and its manifest's blurb, and its guards gain two calls.

### Forks the batch takes, none consequential

Each default can be undone, and none reverses a decision of his or touches a line of microGPT.

1. **Six rungs, F, Z, S, K, W and G; none lands only with another; the gather applies them in that order.** Default: so. No rung builds on another: each one's tests pass on its own tree. F, Z and S share two library files, at different declarations; F and W share `StaticNativeApp.java`, at different declarations (fork 4); K shares `Library/FortressLibrary.fss` with Z and S, at the two `CHOOSE` declarations. W is applied after the families since its check of `self` meets every moved binding on the merged tree.
2. **K stands on the CHOOSE probe.** Default: K stays in the manifest if `plan-24/probes/choose.md` finds row 521's fix decided and small, as the coordinator's addition of 08:4x UTC asks; otherwise the coordinator generates the block `--without K`, and `CHOOSE` keeps its home (section 4). A rung of its own, not a part of Z: K edits two helpers that both paths run, so it runs both paths' suites, and Z stays library text with its tests; and K drops out alone. The planner's reading is in section 4, "CHOOSE".
3. **F carries walk's carry of `Float`, one line of `StaticNativeApp.javaFor`.** Default: so. Walk's loader carries a declared parameter type only by name, and `Float` is not among its names (`interpreter/glue/StaticNativeApp.java:47-58`), so the planner's sample move of `Float`'s `+` alone stopped every program at load: 'Native helper com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleAdd: no Java type carries the declared type of parameter b.' Twelve of the 30 have a parameter declared `Float`. The ways not taken: the declarations rewritten at `RR64`, which changes `Float`'s headers and its overloads; the carry put in W, on which F's tests would then build.
4. **W's check of `self`: the closure tells the loader the type that declares the method, and the loader takes that type's Java carrier from its own table.** Default: `MethodClosure` passes its `definer` and `FunctionalMethod` its self type through `NativeApp.checkAndLoadNative` to `StaticNativeApp.find`, which refuses at load a method whose declaring type no Java type carries, 'Native helper ...: no Java type carries Holder, the type of self.', and takes only an overload whose first Java parameter is that carrier; a top-level function is told no type and is loaded as today. The table, `javaForSelf`, is `javaFor`'s names plus the value objects `Int`, `Long`, `UnsignedLong`, `Float` and `BigNum`, so W carries `Float` for `self` without F's line, and the two rungs change different declarations. The ways not taken: a refusal at the call, where row 847 asks for one at load; the declaring type read from the syntax tree, which has no parent links; one table shared with F's parameter carry, which two rungs would then both change.
5. **Two guards per family rung, the walk guard and the compiled guard.** Default: the walk guard in `ProjectFortress/tests/`, `NativeHelperFamily<Name>Walk.fss`, calls every binding the rung moves on chosen values, edge cases among them, asserts each result with the harness's own checks, and passes on the base's code and after; the compiled guard in `ProjectFortress/compiler_tests/`, `NativeHelperFamily<Name>Compiled.fss` with its `.test` (link and run), binds the same helpers through its own top-level declarations, one per helper, the helper's Java signature read as the compile reads it (`self` as the first parameter, `JavaString` for `String`, `Character` for `Char`), asserts the same values, and passes on the base and after, since climb batch 23's rewrite already compiles such a declaration (F-298; the planner's sample, section 4). The compiled guard cannot declare a method on the prelude's number types, so it binds functions; it tests the code generator's call of each helper, which no compiled program can reach through the library until the switch-over. Neither guard asserts a value that a ledger row names as a departure or that the specification leaves open: a float compared with a NaN (row 672), the rounding of a NaN or an infinity (row 330), `signed` above the signed range and `char` outside the code points (section 4).
6. **Z's divisions by zero, as climb batch 23's `ZZ32` one.** Default: two tests, `ZZ64DivisionByZeroWalk` and `ZZDivisionByZeroWalk`, each a `DIV` by zero in a `try` that catches `DivisionByZero`, failing on the base ('java.lang.ArithmeticException: / by zero' and 'BigInteger divide by zero' in the planner's runs) and passing after; row 336 rewritten to what stays, `REM` and `MOD` by zero on `ZZ32` and `ZZ64`; and the two `XXX` tests that the post-batch review's finding 7 owes the batch that edits row 336 (PLAN, "Climb batch 23, listed for his review"): `XXXZZ64RemainderByZeroWalk` for row 336, `widen(8) REM widen(0)` in a `try` that catches `DivisionByZero`, and `XXXNN32DivisionByZeroWalk` for row 848, `unsigned(7) DIV unsigned(0)` likewise, each seen red through the harness on the base and each set as its row's reproducer.
7. **The Appendix I entry's Effect is the gather's.** Default: no rung edits `Specification/appendices/changes.tex`. Its entry "A native binding that names a static helper" states the count of moved bindings, `CHOOSE`'s state, the divisions by zero that end the run, and row 847 (`changes.tex:4466-4502`), so F, Z, S, K and W each make a sentence of it false; one declaration changed by five rungs breaks the batch's rule. Each rung lists its sentences made false; the gather rewrites the Effect once on the merged tree, builds the specification once, and the commit stage takes that build if no later commit changes `Specification/` (the post-batch review's finding 4). `builtinPrimitive`'s printed comment (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`) holds no count and stays true; W makes its "%self% first" true for `self` too.
8. **The 52 team demos run by the gather** on the merged tree (F-283; P-79), as climb batch 23's fork 19. No rung runs them.
9. **The suites each rung runs, once, after its last change of code.** Default: F and W, which edit walk's Java, `ant testSystem` and `ant testSpecData`; K, which edits helpers that a library string names and both paths run, `ant testQuick` and `ant testSystem`; Z and S, which edit library text only, their own tests through the harness; G, which edits the code generator, its own tests, the tracks left to the gate (the `fortress-repo` skill's `references/tests-running.md`, "When to run a whole suite").
10. **The stages.** Default: F, Z, S and K run the count stage and the distance stage once each on their final trees, the check of their moved bindings (P-58; P-39); W and G run neither, since neither changes what the checker reads; the gather runs neither, since no row of this batch closes on a stage (the post-batch review's finding 4); the gate runs both.
11. **`truncate` and `round` move now, at `ZZ64`.** Default: so. Both fit today (`doubleTruncate` and `doubleRound` answer a Java `long`); P-68's rung after the switch-over gives them `ZZ` and meets their helpers then.
12. **G takes row 701's `where` half only.** Default: G drops the header `where`-clause condition at the three guards (`compiler/codegen/CodeGen.java:2967`, `:4107`, `:5027`), and keeps the contract condition beside it; row 701 is rewritten to its contract half; row 812, a crash before the guard, stays (it holds nothing of this rung's tests). The exit judgement's default places the rung before the names batch, the coordinator's call (`reviews/phase3-exit/judgement.md`, item 9: "Not consequential (an ordering within decided ground); the coordinator takes it."); P-151 decides which forms exist, and a condition on static parameters, checked by the checker, emits no code.
13. **G's tests.** Default: `XXXWhereBoundChecker` promoted (a function with a `where` bound, which ran and printed 'O' in the planner's probe); two new run tests in `compiler_tests/`, a method whose `where` clause bounds its object's static parameter (`SumReduction`'s `distribute` and `BoundedRange.atMost` have that form) and a trait whose `comprises` clause lists a type at a `where`-clause variable (`AnyList`'s form); and `XXXNatOpenRun`, whose compile no longer fails, turned into a run pair, `NatOpenRunLink.test` and `XXXNatOpenRun.test` with `REACHED`, for row 307's wall behind it: the call that reads a size off its argument ended in a `VerifyError` in the probe. Row 307 gains a note.
14. **No speed pass.** No rung changes the checker's code: G changes the code generator, which the stages do not run.
15. **No rung declares a checker count, a crash or a ladder move.** All 85 ladder programs pass at climb batch 23's gate, so none can move.
16. **Rows.** Default: W closes 847, K closes 521; Z rewrites 336 and sets the reproducers of 336 and 848; G rewrites 701 and notes 307. Rows opened by plan: none; a defect a rung meets gets its row through its `record.md`, as the manual gives it.
17. **`FlatString`'s 5 left out.** Default: so, by his scope, which does not list them; they are declared over `FlatString`, so row 846 does not reach them, and the string family's batch can take them with or before item 310 (section 4).

### Points the batch lists for him, not questions

- **Team lines changed:** F, 30 strings of `value object Float` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:54-194`); Z, 36 strings of `trait ZZ64` and `trait ZZ` (`Library/FortressLibrary.fss:818-909`, `:991-1085`); S, 8 strings in both files; K, the two `CHOOSE` strings and one line in each of `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose`; W, the team's `FunctionClosure`, `MethodClosure`, `FunctionalMethod` and `NativeApp.checkAndLoadNative`; G, three lines of the team's `CodeGen`. `StaticNativeApp` is the revival's.
- **What walk does differently:** `ZZ64`'s and `ZZ`'s `DIV` by zero raise `DivisionByZero`, where the run ended (row 336); a helper bound in a method of a type that no Java type carries is refused at load (row 847); with K, `CHOOSE` past the helper's table raises `IntegerOverflow`, as its glue class does today. No other value moves, by the planner's runs.
- **What the compiled path does differently:** a header `where` clause compiles (G); with K, the compiled `CHOOSE` past its table raises `IntegerOverflow` (row 521).
- **Walk's float arithmetic runs through reflection after F,** where its glue classes were compiled calls: the operations of microGPT's two programs. Walk's speed is no measure (P-29); the commit stage's quick microGPT check is where it shows, against P-30's minute. The planner did not time it, by the ruling of 2026-10-23 (PLAN, "Where we stand").

## 3. The rungs

Line numbers are those of the base, 1f5c49b4f, whose Library/, ProjectFortress/ and Specification/ are those of df71bc585, climb batch 23's landing. Each rung's tests come first: written, run through the harness on the base and seen failing, or for a guard seen passing, and committed before the edit or with it. A value that matters is asserted inside the test (P-103). The planner's texts are in explorations/compile-ladder/plan-24/probes/: rung-F.patch, rung-Z.patch, rung-S.patch and rung-W.patch, each applying to the base alone and the four together (git apply --check on the index); families-base.tsv lists every moved binding with its line, its glue class and its helper; NOTES.md says how to run each probe again. The texts are prototypes: in climb batch 23 two of the planner's patches broke on cases the planner had not run, and the workers found it (reviews/batch-23-review.md, misses 810 to 812); test the text, and improve it where it needs it. Every family rung writes two guards, both passing on the base and after (fork 5): a walk guard in ProjectFortress/tests/ that calls every binding it moves on chosen values, edge cases among them, and asserts each result; and a compiled guard in ProjectFortress/compiler_tests/ whose own top-level declarations bind the same helpers and assert the same values. Each defect a rung meets gets an XXX test asserting the specification's answer, promoted when its fix lands, or, where the specification is silent, a row and a test of today's behaviour (the fortress-repo skill's tests-writing.md, "How a defect is recorded").

### F. The floating-point family: Float's 30 (P-58; F-299)

**The answers this rung follows.** P-58: each binding's string is to name a static helper of nativeHelpers, the bindings move step by step, and from the step that moves a binding the compiled checker checks it against the helper's Java signature. F-299: walk's loader takes the helper's overload whose Java types carry the declared types, and refuses a declared type that no Java type carries. F-298: the compiled rewrite reads the moved strings, and in the gate's stages the checker reads the helper's double as RR64. P-29: walk's speed is irrelevant. This record's section 2, forks 1, 3, 5, 7 to 11 and 14 to 16, give the defaults you build.

**What you build.**
- The tests first (below).
- The planner's rung-F.patch: git apply explorations/compile-ladder/plan-24/probes/rung-F.patch in your tree. Take the text, or improve it and say why. It holds:
  - one line of walk's loader, interpreter/glue/StaticNativeApp.java, javaFor (:47-58): a declared Float is carried in a double, as RR64 is (fork 3). Without it walk refuses the family at load: the planner's sample, Float's + alone, stopped every program, 'Native helper com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleAdd: no Java type carries the declared type of parameter b.' at FortressBuiltin.fss:103.
  - the 30 strings of value object Float in ProjectFortress/LibraryBuiltin/FortressBuiltin.fss (:54-194), each naming the helper that the prelude binds or that computes it: asString and asExprString (doubleToString); the bracket |self| (doubleAbs); =, <, <=, >, >= (doubleEQ, doubleLT, doubleLE, doubleGT, doubleGE); the unary - (doubleNeg); +, -, DOT, TIMES, juxtaposition, / (doubleAdd, doubleSub, doubleMul three times, doubleDiv); SQRT (doubleSQRT); ^ at a Float and at an RR64 exponent (doublePow); sin, cos, tan, asin, acos, atan, log, exp (doubleSin to doubleExp); floor, ceiling (doubleFloor, doubleCeiling); truncate, round (doubleTruncate, doubleRound, at ZZ64, fork 11). families-base.tsv gives each line.
- Not yours: every other binding of Float, the brackets |\self/| and |/self\|, whose helpers answer RR64, ^ at an RR32 or AnyIntegral exponent, atan2 over Number, narrow, the directed roundings, MIN, MAX and the rest (no helper fits); the asFloats; walk's check of self (rung W); the Appendix I entry (the gather, fork 7).

**Rows.** None opened by plan. A defect you meet gets its XXX test or its row in your record.md.

**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0 over the fourteen components (explorations/compile-ladder/climb-batch-23/gate/). Only the distance stage reads FortressBuiltin's bindings (P-39): by the planner's run of all 83 bindings moved, both 0, '#crash none', both tables equal to climb batch 23's but for their seconds and machine rows; and a control, Float's < naming doubleAdd for one run, gave the distance 1 at its line (section 4). Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.

**Files.**
- ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java: javaFor, only.
- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object Float's 30 strings, only.
- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.
- Not: StaticNativeApp.find or any other declaration of it (rung W); FunctionClosure, MethodClosure, FunctionalMethod, NativeApp; Library/; nativeHelpers/; Specification/; the tools.

**Tests, first.**
- The walk guard, ProjectFortress/tests/NativeHelperFamilyFloatWalk.fss, in the form of climb batch 23's NativeHelperFamilyZZ32Walk: each of the 30 at ordinary values and at 0.0, -0.0, a large value and the infinities, and at a not-a-number value where no row names its result as a departure; asString of several forms ('2.5', '0.1', '1.0E21' by the planner's runs). Not asserted: a comparison with a not-a-number value (row 672, contested), the rounding of a not-a-number value or an infinity (row 330). Passing on the base and on your text.
- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss with NativeHelperFamilyFloatCompiled.test (tests=, link, run, run_out_contains=PASS): one top-level declaration per helper of the 30, over RR64, Boolean, JavaString and ZZ64, each bound by its builtinPrimitive string, the same values asserted with assert(flag, message); passing on the base and after. The planner's sample of 18 helpers of the three families, in this form, linked and ran: 'OK (2 tests)'.
- Keep their verdicts: walk's suite, 694 tests at climb batch 23's gate; ant testSpecData's 130; climb batch 23's helper tests (NativeHelperBindingWalk and its siblings). By the planner's run of F, Z, S and the W prototype together: 694 tests, one failure, XXXNativeHelperUncarriedSelfWalk, which W promotes; 130 and no failure.
- After the change: ant testSystem once and ant testSpecData once (fork 9).

**Specification.** None of yours: the Appendix I entry "A native binding that names a static helper" (Specification/appendices/changes.tex:4423), whose Effect counts the moved bindings, is the gather's (fork 7). List every sentence made false: that Effect's count, F-32's and F-299's counts, and any sentence of the fortress-repo skill on which declared types walk's loader carries (interpreter.md, "Natives").

**Overlaps by file.** StaticNativeApp.java with rung W, at another declaration: you change javaFor, W changes find and adds a table of its own. FortressBuiltin.fss with rung S, which changes Long's, NN32's, BigNum's and Char's strings. The gather applies you first.

### Z. The 64-bit and big integers: ZZ64's 20 and ZZ's 16 (P-58; rows 336 and 848)

**The answers this rung follows.** P-58: each binding's string is to name a static helper, step by step, checked from the step that moves it. F-299: walk raises a helper's DivisionByZero or IntegerOverflow as the library's own. Row 336: walk's divisions by zero on ZZ64 and ZZ end the run, where the helpers raise DivisionByZero (simpleLongArith.longOverflowingDiv, simpleArbitraryPrecisionArith.div). Row 848: the unsigned divisions and ZZ's remainders by zero, its sibling. The specification: "For integer results, division by zero throws a DivisionByZero." (Specification/basic/operators/opr-overview.tex, section "Multiplication, Division, Modulo, and Remainder Operators"); narrow keeps the low 32 bits, and no IntegerOverflow is thrown (Specification/basic-lib/basic-integers.tex, section "Integers"). This record's section 2, forks 1, 5, 6, 10 and 14 to 16, give the defaults you build.

**What you build.**
- The tests first (below).
- The planner's rung-Z.patch: git apply explorations/compile-ladder/plan-24/probes/rung-Z.patch in your tree. Take the text, or improve it and say why. It holds 36 strings in Library/FortressLibrary.fss:
  - trait ZZ64 (:818-909), 20: =, < (longEQ, longLT); the unary - and DOTMINUS (longOverflowingNeg, longWrappingNeg); +, DOTPLUS, the binary - and DOTMINUS (longOverflowingAdd, longWrappingAdd, longOverflowingSub, longWrappingSub); DOT, TIMES, juxtaposition, DOTTIMES (longOverflowingMul three times, longWrappingMul); DIV (longOverflowingDiv); BITAND, BITOR, BITXOR, BITNOT; narrow (simpleIntArith.longWrappingToInt); unsigned (the special name answering NN64); big (simpleArbitraryPrecisionArith.makeZZfromZZ64).
  - trait ZZ (:991-1085), 16: =; the unary - and DOTMINUS (neg); +, DOTPLUS (add); the binary - and DOTMINUS (sub); DOT, juxtaposition, TIMES, DOTTIMES (mul); DIV (div); BITAND, BITOR (oor), BITXOR, BITNOT; all of simpleArbitraryPrecisionArith.
- Not yours: ZZ64's CHOOSE (rung K, or its home); the shifts over AnyIntegral; ZZ's widen (row 502), narrow, CHOOSE, REM, MOD and the rest, which need new helpers; the Appendix I entry (the gather, fork 7).

**Rows.**
- Row 336: rewritten by the gather from your record.md: ZZ64's and ZZ's DIV by zero raise DivisionByZero since your commit, tests ZZ64DivisionByZeroWalk and ZZDivisionByZeroWalk; REM and MOD by zero on ZZ32 and ZZ64 still end the run; its reproducer XXXZZ64RemainderByZeroWalk (fork 6).
- Row 848: its reproducer set to XXXNN32DivisionByZeroWalk (fork 6); its claim unchanged.

**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0. Your 36 sit in the FortressLibrary component, which both stages read: by the planner's run of all 83 moved, both 0, '#crash none', the count's table the same 15 api rows as climb batch 23's. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.

**Files.**
- Library/FortressLibrary.fss: trait ZZ64's 20 strings and trait ZZ's 16, only.
- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.
- Not: the CHOOSE declarations (:788, :881); trait NN64 and the top-level functions (rung S); ProjectFortress/src/; nativeHelpers/; Specification/; the tools.

**Tests, first.**
- Two division tests in ProjectFortress/tests/, each failing on the base through the harness: ZZ64DivisionByZeroWalk and ZZDivisionByZeroWalk, in the form of ZZ32DivisionByZeroWalk, a DIV by zero in a try that catches DivisionByZero (the base: 'java.lang.ArithmeticException: / by zero' and 'java.lang.ArithmeticException: BigInteger divide by zero' in the planner's runs; the text: 'DivisionByZero').
- Two XXX tests in ProjectFortress/tests/, red through the harness on the base and on your text alike, the review's finding 7 (fork 6): XXXZZ64RemainderByZeroWalk for row 336 and XXXNN32DivisionByZeroWalk for row 848, each asserting the specification's answer, DivisionByZero.
- The walk guard, ProjectFortress/tests/NativeHelperFamilyIntegersWalk.fss: each of the 36 at ordinary values and at the bounds, each overflow raising IntegerOverflow, each wrapping operator's wrap, narrow at a value past ZZ32's range (the specification says it wraps), unsigned and big; no division by zero (the two tests above hold it). Passing on the base and on your text.
- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilyIntegersCompiled.fss with its .test: one top-level declaration per helper of the 36, over ZZ64, ZZ, ZZ32 and NN64 (the special name), the same values asserted, and the divisions by zero raising DivisionByZero there, as they do compiled on the base. The planner's sample, in this form, raised DivisionByZero from longOverflowingDiv and from div and passed.
- Keep their verdicts: walk's suite; the compiled tracks, which your text does not reach.
- After the change: your tests through the harness and junit.sh; no whole suite (fork 9).

**Specification.** None of yours: the Appendix I entry's Effect names ZZ64's and ZZ's DIV among the divisions that end the run (changes.tex:4480-4488), a sentence you make false, which the gather rewrites (fork 7). opr-overview.tex's "For integer results, division by zero throws a DivisionByZero." becomes true for ZZ64's and ZZ's DIV. List every sentence made false: that Effect sentence, row 336's claim, F-32's and F-299's counts.

**Overlaps by file.** Library/FortressLibrary.fss with rung S (trait NN64's signed and the top-level char) and rung K (the two CHOOSE declarations), at other declarations.

### S. The small rest: 8 bindings (P-58; Question 1)

**The answers this rung follows.** P-58: each binding's string is to name a static helper, step by step, checked from the step that moves it. F-299: walk carries NN32 and Char in an int and NN64 in a long, by the declaration, and answers each by the declared result. Row 846 and review-queue item 310: a binding over String moves only after item 310 is asked again, so the two top-level bindings over String stay (Question 1, its default). This record's section 2, Question 1 and forks 1, 5, 10 and 14 to 16, give the defaults you build.

**What you build.**
- The tests first (below).
- The planner's rung-S.patch: git apply explorations/compile-ladder/plan-24/probes/rung-S.patch in your tree. Take the text, or improve it and say why. It holds 8 strings:
  - ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: value object Long's asString and asExprString (:379, :381; simpleLongArith.longToString); value object NN32's signed (:469; the special name makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType); value object BigNum's asString and asExprString (:566, :568; simpleArbitraryPrecisionArith.toString); value object Char's codePoint (:616; charCodePointWithSpecialCompilerHackForCharacterArgumentType).
  - Library/FortressLibrary.fss: trait NN64's signed (:985; makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType); the top-level char (:4540; charMakeCharacterWithSpecialCompilerHackForCharacterResultType).
- Not yours: printlnWithThread and getProperty, declared over String (Question 1); FlatString's 5 (fork 17); every other binding of these types; the Appendix I entry (the gather, fork 7).

**Rows.** None opened by plan.

**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0. Six of your 8 sit in FortressBuiltin, which only the distance stage reads; trait NN64's signed and char sit in FortressLibrary. By the planner's run of all 83 moved, both 0, '#crash none'. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.

**Files.**
- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss: the 6 strings of Long, NN32, BigNum and Char, only.
- Library/FortressLibrary.fss: trait NN64's signed and the top-level char, only.
- ProjectFortress/tests/ and ProjectFortress/compiler_tests/: your tests.
- Not: value object Float (rung F); traits ZZ64 and ZZ (rung Z); ProjectFortress/src/; nativeHelpers/; Specification/; the tools.

**Tests, first.**
- The walk guard, ProjectFortress/tests/NativeHelperFamilySmallWalk.fss: each of the 8 at ordinary values and at the bounds: Long's getters at the ZZ64 bounds and 0, BigNum's at a value past ZZ64 and a negative one, signed at 0, 7 and the top of the signed range, codePoint and char at 'A', 0 and a character past U+FFFF. Not asserted: signed of a value above the signed range, and char of a negative code point or one past U+10FFFF, which wrap or pass silently on the old code and the new alike and on which the specification is silent (section 4). Passing on the base and on your text.
- The compiled guard, ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled.fss with its .test: one top-level declaration per helper of the 8, the special names over NN32, NN64 and Character, longToString and toString answering JavaString, the same values asserted.
- Keep their verdicts: walk's suite; the compiled tracks, which your text does not reach.
- After the change: your tests through the harness and junit.sh; no whole suite (fork 9).

**Specification.** None of yours: the gather rewrites the Appendix I entry's count (fork 7). List every sentence made false: that count, F-32's and F-299's.

**Overlaps by file.** FortressBuiltin.fss with rung F (Float's 30); FortressLibrary.fss with rungs Z and K; each at other declarations.

### K. The CHOOSE fix and its two bindings, if its probe allows (P-58; row 521)

**The answers this rung follows.** This rung stands only if the CHOOSE probe, explorations/compile-ladder/plan-24/probes/choose.md, finds row 521's fix decided and small (fork 2); otherwise the coordinator leaves it out of the manifest. Row 521: the compiled CHOOSE on ZZ32 and ZZ64 dies with a raw ArrayIndexOutOfBoundsException past its helper's safe-bound table, 34 CHOOSE 17 on ZZ32 and 68 CHOOSE 34 on ZZ64; its fix, as the row gives it, is to throw IntegerOverflow past the table. The specification: "For integer results, overflow throws an IntegerOverflow." (opr-overview.tex, section "Multiplication, Division, Modulo, and Remainder Operators"). P-58: from the step that moves a binding, the compiled checker checks it. This record's section 2, forks 1, 2, 5, 9, 10 and 14 to 16, give the defaults you build.

**What you build.**
- The tests first (below).
- The fix, as the CHOOSE probe's note and its patch give it: explorations/compile-ladder/plan-24/probes/choose.patch, on disk at the planner's last look, its note choose.md not yet. The patch fixes simpleIntArith.intOverflowingChoose (nativeHelpers/simpleIntArith.java:203-220): its test k > maxIntChooseN, 33, becomes k - 2 >= maxIntChooseSafeN.length, the table's 15 entries, since every n CHOOSE k past the table exceeds the ZZ32 range; and its slow path's scratch array, one static array that calls running in parallel share (:121), becomes one array a call; with a compiled test and two walk tests of its own. The same two faults are in simpleLongArith.longOverflowingChoose (nativeHelpers/simpleLongArith.java:177-194; its bound 66 against 32 entries, and its static tempLongChooseArray, :105): take the fix there too if the note does, and if it does not, ZZ64's CHOOSE stays on its glue class and your rung moves ZZ32's alone.
- The two strings: trait ZZ32's CHOOSE (Library/FortressLibrary.fss:788) naming simpleIntArith.intOverflowingChoose, and trait ZZ64's (:881) naming simpleLongArith.longOverflowingChoose, the second only with its helper's fix.
- Not yours: NN32's CHOOSE, whose binding does not fit as a bare string; every other binding; the Appendix I entry, whose CHOOSE sentence the gather rewrites (fork 7).

**Rows.** Row 521: the gather closes it with your commit, its test the promoted ChooseTableCompiledRungE.

**Distance sites.** Run the count stage and the distance stage once each on your final tree; their before is climb batch 23's landed tables, 0 and 0. By the planner's run of all 83 moved, the two CHOOSE among them, both 0, '#crash none'. Any site that comes is a point to report. You change no checker code: report the count stage's seconds, and make no speed pass.

**Files.**
- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java and simpleLongArith.java: the two CHOOSE helpers, only.
- Library/FortressLibrary.fss: the two CHOOSE strings, only.
- ProjectFortress/compiler_tests/: the promoted pair; ProjectFortress/tests/: your walk guard.
- Not: the other strings of traits ZZ32 and ZZ64 (rung Z owns ZZ64's); interpreter/; Specification/; the tools.

**Tests, first.**
- Promote the compiled XXX pair (the fortress-repo skill's tests-writing.md, "Promoting an XXX test"): XXXChooseTableCompiledRungE.fss and .test, with ChooseTableCompiledRungELink.test beside them, renamed without XXX and seen failing on the base through junit.sh, then passing.
- The walk guard, ProjectFortress/tests/NativeHelperFamilyChooseWalk.fss: CHOOSE on ZZ32 and ZZ64 at the edges of each table and past them, each value asserted and each overflow raising IntegerOverflow, as PowChooseLcmRungE has some of them; passing on the base, where the glue classes answer, and on your text. On the base's helper, moved without the fix, walk ended 34 CHOOSE 17 with 'Index 15 out of bounds for length 15' (climb batch 23's record, section 4).
- Keep their verdicts: PowChooseLcmRungE; the compiled tracks; walk's suite.
- After the change: ant testQuick once and ant testSystem once, since your helpers run on both paths and a library string names them (fork 9).

**Specification.** None of yours: the gather rewrites the Appendix I entry's CHOOSE sentence (changes.tex:4474-4477), which your rung makes false (fork 7). List every sentence made false: that sentence, row 521's claim, F-299's "ZZ32's CHOOSE among them".

**Overlaps by file.** Library/FortressLibrary.fss with rungs Z and S, at other declarations; trait ZZ64's other strings are Z's.

### W. Walk's check of self: the loader told the declaring type (P-58; row 847)

**The answers this rung follows.** P-58: walk is to load the helper that a builtinPrimitive string names. F-299: the loader takes the helper's overload whose Java parameter and result types carry the declared types, self first, and refuses a declared type that no Java type carries; but it reads a method's self only by the helper's Java type, so a binding in a method of a program's own type loads (row 847). Row 847's fix: tell the loader the declaring type, and refuse such a binding at load. builtinPrimitive's printed comment says the interpreter takes "the one whose Java parameter and result types carry the declared types, %self% first" (ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:19), which your rung makes true of self. This record's section 2, forks 1, 4, 7 to 10 and 14 to 16, give the defaults you build.

**What you build.**
- The tests first (below).
- The planner's rung-W.patch: git apply explorations/compile-ladder/plan-24/probes/rung-W.patch in your tree. Take the text, or improve it and say why. It holds, 41 lines added and 5 changed:
  - interpreter/evaluator/values/FunctionClosure.java: two constructors that take the declaring type and pass it to the loader.
  - MethodClosure.java: its two constructors pass their definer; FunctionalMethod.java: its two pass their self type (fork 4).
  - interpreter/glue/NativeApp.java: checkAndLoadNative with a third argument, the declaring type, the two-argument form passing none, and the type's name handed to StaticNativeApp.find.
  - interpreter/glue/StaticNativeApp.java: javaForSelf, the Java carrier of a declaring type by its name (javaFor's names, and Int, Long, UnsignedLong, Float and BigNum); find with the declaring type, refusing at load a type that no Java type carries, 'Native helper ...: no Java type carries Holder, the type of self.', and taking only an overload whose first Java parameter is the carrier; a top-level function, told no type, is loaded as today.
- Not yours: javaFor, the parameter carry (rung F changes it); every library string; the helpers; the Appendix I entry, whose row-847 sentence the gather rewrites (fork 7).

**Rows.** Row 847: the gather closes it with your commit, its test the promoted NativeHelperUncarriedSelfWalk.

**Distance sites.** Neither the count stage nor the distance stage reads walk's loader, so you run neither (fork 10); the gate runs both. You change no checker code, and make no speed pass.

**Files.**
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java, MethodClosure.java and FunctionalMethod.java: the constructors named above, only.
- ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java: checkAndLoadNative, only; StaticNativeApp.java: find and the new javaForSelf, only.
- ProjectFortress/tests/: your tests.
- Not: StaticNativeApp.javaFor (rung F); Library/; ProjectFortress/LibraryBuiltin/; nativeHelpers/; compiler/; Specification/; the tools.

**Tests, first.**
- Promote XXXNativeHelperUncarriedSelfWalk (the fortress-repo skill's tests-writing.md, "Promoting an XXX test"): renamed NativeHelperUncarriedSelfWalk.fss with its .test, load_exception_contains naming the helper, seen failing on the base through the harness and passing after. With the prototype the harness gave 'Refused at load as its keys name' for the XXX file, 'Tests run: 9, Failures: 1', the other 8 of climb batch 23's helper tests 'OK'.
- A test of a helper bound in a method of a program's own trait, refused at load, beside the promoted object case, with its .test; seen failing on the base.
- The guard: climb batch 23's NativeHelperFamilyZZ32Walk and NativeHelperBindingWalk, unchanged, passing on the base and after; they reach the trait ZZ32's functional methods and Int's dotted getters through your check. Your rung moves no binding, so it writes no family guard; the family rungs' guards meet your check on the merged tree.
- Keep their verdicts: walk's suite, 694 tests at climb batch 23's gate; ant testSpecData's 130. By the planner's run of your prototype with F, Z and S: 694, one failure, the XXX you promote; 130, no failure; the library's 95 helper bindings, over trait ZZ32, Int, Float, trait ZZ64, trait ZZ, Long, BigNum, NN32, trait NN64 and Char, all loading.
- After the change: ant testSystem once and ant testSpecData once (fork 9).

**Specification.** None of yours: the Appendix I entry's sentence on row 847 (changes.tex:4493-4498) becomes false, and the gather rewrites it (fork 7). List every sentence made false: that one, F-299's "It reads a method's self only by the helper's Java type, so a binding in a method of a program's own type loads (row 847).", and the fortress-repo skill's interpreter.md, "Natives", "Walk does not check self." and the sentences after it.

**Overlaps by file.** StaticNativeApp.java with rung F, at javaFor; you change find and add javaForSelf. The gather applies you after the family rungs, so that your check meets every moved binding there.

### G. The code generator's header where clauses (P-151; rows 701 and 307)

**The answers this rung follows.** P-151: only the where-clause forms that the team wrote down are built: conditional extension, a function's or a method's condition, and AnyList's comprises clause; a where condition on a function's or a method's own static parameters bounds them. F-181 and row 701: the code generator refuses every function, method, object and trait declaration that carries a where clause in its own header, and every function or method with a contract. The phase 3 exit judgement, item 9: five such walls in the twelve, SumReduction's distribute (Library/FortressLibrary.fss:3449, with its sibling), BoundedRange.atMost (:4114), AnyList's and NatParam's comprises clauses, and a test modifier (row 823); the default, a named code-generator rung before the names batch, which the coordinator takes. Row 307: a call that reads a size off its argument does not run compiled. This record's section 2, forks 1, 12 to 16, give the defaults you build.

**What you build.**
- The tests first (below).
- Drop the header where-clause condition from the three guards of compiler/codegen/CodeGen.java: forFnDecl (:2967), forObjectDeclPrePass (:4107) and forTraitDecl (:5027), keeping each guard's contract condition; the where clause's conditions are the checker's, and nothing is emitted for them (fork 12). The planner dropped the three conditions in a probe copy of CodeGen and compiled four programs with it ahead of the build on the class path: a function whose where clause bounds its type parameter (XXXWhereBoundChecker), compiled and printed 'O'; a method whose where clause bounds its object's static parameter, compiled and printed 'PASS'; a trait whose comprises clause lists Box[\E\] at a where-clause variable E, compiled and printed 'PASS'; and XXXNatOpenRun, a trait listing Nt[\n\] at a where-clause size, compiled and then failed at run with 'java.lang.VerifyError: Bad type on operand stack', at the call that opens the size (row 307). On the base each compile stopped at its guard.
- Not yours: contracts (row 701's other half); row 812, a crash before the guard on a trait listing a type at a where-clause variable whose generic member gives a body; the size read off a value at a call (row 307); the library's own declarations, which no compiled program reaches until the switch-over.

**Rows.**
- Row 701: rewritten by the gather from your record.md to its contract half, its reproducer a contract test, since its where half is fixed by your commit.
- Row 307: a note, the VerifyError of XXXNatOpenRun's run once its trait compiles, its reproducer pair named.

**Distance sites.** The count stage and the distance stage run the checker, not the code generator, so you run neither (fork 10); the gate runs both. You change no checker code, and make no speed pass.

**Files.**
- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java: the three guards, only, and anything the emission of a where-clause declaration needs there, named in your report.
- ProjectFortress/compiler_tests/: your tests.
- Not: the checker's Scala; interpreter/; Library/; ProjectFortress/LibraryBuiltin/; Specification/; the tools.

**Tests, first.**
- Promote XXXWhereBoundChecker to a plain-named compile, link and run test of the same program, seen failing on the base through junit.sh ('Don't know how to compile this kind of FnDecl.'), passing after.
- Two new run tests in ProjectFortress/compiler_tests/, each with its .test (link, run, run_out_contains=PASS), seen failing on the base: a method of a generic object or trait whose where clause bounds the type's static parameter, in the form of SumReduction's distribute and BoundedRange's atMost, the method called and its value asserted; and a trait whose comprises clause lists a generic object at a where-clause type variable, in AnyList's form, a functional method of the trait called through a value of the trait's type.
- XXXNatOpenRun, whose compile now succeeds: turned into a run pair, NatOpenRunLink.test (link) and XXXNatOpenRun.test (run, run_out_contains=REACHED), the program printing REACHED before the call that fails, run in one junit.sh call with the link test first (the fortress-repo skill's tests-writing.md, "Writing an XXX test"); its old .test red on your text before you change it, which shows the guard gone.
- Keep their verdicts: the compiler track, the where-clause checker tests among them (CondExtendChecker, ComprisesWhereFunctionalMethodChecker, OpenTypeWhereConstraintChecker and their siblings), which only the checker reads.
- After the change: your tests through junit.sh, in one JVM; the tracks to the gate (fork 9).

**Specification.** None of the specification's sentences describe the code generator. List every sentence made false: F-181's "refuses every function, method, object and trait declaration that carries a where clause in its own header", P-151's "Row 701: the code generator's half." and P-156's "the code generator refuses a where clause in a declaration's header", the fortress-repo skill's "The code generator refuses a declaration with a where clause of its own (row 701)" in its part on the revival's changes and "It also refuses a function, method, object or trait declaration with a where clause of its own" in its compiler part, row 701's claim.

**Overlaps by file.** None: no other rung edits compiler/ or compiler_tests/' where tests. You meet the others only in the gate's compiled track.

### The place kept for the hard set

The 109 bindings that cannot name their helper as a bare string (section 4, "The count") are probed now by another worker, whose note is to land as explorations/compile-ladder/plan-24/probes/hard-set.md. This record plans nothing for them. If the probe recommends a rung, and the curator takes it or does not answer within half an hour of the recommendation (coordinator/HELD.md, 08:2x UTC on 2026-10-31), its section is written here as "### H." with the same parts as the rungs above, its block under section 5's "The manifest, rung by rung" as "#### H", and its keys in lists24.py's H_BRIEFING and H_CHECKS; gen24.py and check24.js take it from there, with no other change (section 5, "The generator"). Its rules are those above: two guards per family it moves, an XXX test for each defect it meets, no declaration that another rung changes, and the Appendix I entry left to the gather.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung (PLAN, "The principle for the batches"): each rung's tests pass on its own tree. None lands only with another.
- The declarations each rung changes. F: StaticNativeApp.javaFor, Float's 30 strings. Z: ZZ64's 20 strings and ZZ's 16. S: the 8 strings of Long, NN32, BigNum, Char, NN64 and char. K: the two CHOOSE helpers and the two CHOOSE strings. W: StaticNativeApp.find and the new javaForSelf, NativeApp.checkAndLoadNative, the constructors of FunctionClosure, MethodClosure and FunctionalMethod. G: CodeGen's three guards. The Appendix I entry's Effect: the gather.
- Files two rungs share: StaticNativeApp.java (F, W); ProjectFortress/LibraryBuiltin/FortressBuiltin.fss (F, S); Library/FortressLibrary.fss (Z, S, K). The gather applies F, Z, S, K, W, G.
- They meet on the merged tree: W's check of self meets every moved binding, which the planner measured with F, Z and S (walk's suite 694, the one failure W's own XXX); the stages read all moved bindings, which the planner measured at 0 and 0 with all 83 moved; the family guards and climb batch 23's run together in walk's suite and the compiler track.

## 4. The candidates, and what the batch leaves out

### What the record owes, from the review's steps

- **The 83 bare-string bindings sorted into families, and the 109 into their ways** (the post-batch review's step 6): the 83 below, "The families"; the 109 in the hard-set probe, which runs now (section 3, "The place kept for the hard set").
- **Row 846 for a binding over String:** two of the 83 (Question 1); item 310 asked again before either moves.
- **Row 521 for CHOOSE:** rung K, on its probe's finding.
- **The stand-in table for NN32, NN64 and Char:** the three singletons that fit through the special names move in S; the rest are the hard set's.
- **The distance stage as the only stage that reads FortressBuiltin's bindings:** F's 30 and 6 of S's 8; a control showed it checks them (below).
- **The review's finding 7,** XXX tests for rows 336 and 848: rung Z (fork 6).
- **The review's finding 4,** stages and the specification built once: forks 7 and 10.
- **The review's finding 2,** a resumed agent told its earlier launch: built in the batch script (`40302280c`).
- **Climb batch 23's lessons in the planner's texts:** the patches are measured prototypes, which the workers test (misses 810 to 812); the gate's forecasts count the planner's tests and each rung's own may add more (miss 825).

### The planner's probes

The planner's runs: one worktree, `/home/user/fortress-p24`, seeded detached at `1f5c49b4f` from the base build `/home/user/fortress-base23` at 08:35 UTC, after its marker `tmp/BUILT`, and removed after. The old code is the base build's, through `tools/old-fortress.sh` with a private caches folder in the probe worktree; nothing else ran in the base build. The stages are the gate's own (`tools/distance/run.sh`, `tools/checker-count/run.sh`). The files are in `compile-ladder/plan-24/probes/`, and `NOTES.md` says how to run each again.

**The count.** `count.sh` (made from climb batch 23's; its added step, `remap.py`, gives each binding that names a helper already the glue class it named on climb batch 23's base, so that the natives probe's classifier sorts it as there) on the probe worktree: the same 369 public static helpers in 25 classes; 'all A=154 B= 59 C=158 D1= 36 D2= 42 total=449'; 'moved bindings remapped to their old glue: 21'. Against climb batch 23's `classified-base.tsv`, binding by binding: no binding only in one, no class, line or helper different. The bare-string fit (plan-23's `movable.py`, unchanged): 104, A 80 and B 24; 21 of them name their helper (`moved-base.tsv`), 83 a glue class. `classified-base.tsv`, `movable-base.tsv` (with a column `now`, helper or glue) and `moved-base.tsv` are this run.

**The families** (`families.py`, `families-base.tsv`, one line a binding with its line, owner, header, class, glue class and helper): F 30, Z 36 (ZZ64's 20 and ZZ's 16), S 8; left out, 9: the two `CHOOSE`s (rung K, or row 521's home), the two top-level bindings over `String` (Question 1), and `FlatString`'s 5 (fork 17).

**The floating-point sample under walk.** `Float`'s `+` alone moved on the base's code: every program stopped at load, 'com.sun.fortress.exceptions.InterpreterBug: …/FortressBuiltin.fss:103:5-104:86: Native helper com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleAdd: no Java type carries the declared type of parameter b.' (fork 3).

**The families' values under walk.** Three programs printing every moved binding's result at chosen values: `ValF`, the 30 over 0.0, -0.0, 2.5, -0.75, a large value, the infinities and a NaN, each pair for the binary operators; `ValZ`, the 36 over the ZZ64 bounds, -1, 0, 7 and -12 and five ZZ values, every pair, each overflow caught; `ValS`, the 8 at their edges. Each run on the old code and on the text with walk's `Float` carry, their output compared with `diff`: 719, 871 and 19 lines, `diff` printing nothing for each; again with the W prototype added, the same. Two programs, a `DIV` by zero on `ZZ64` and on `ZZ` in a `try` catching `DivisionByZero`: the old code ended the run, 'Caused by: java.lang.ArithmeticException: / by zero' and '… BigInteger divide by zero', exit 1; the text printed 'ZZ64 DIV by zero: DivisionByZero' and 'ZZ DIV by zero: DivisionByZero'. Among the printed results, the same on both codes: `signed(unsigned(-1))` is -1 and `signed` of the NN32 2^31 is -2147483648; `char(-1).codePoint` is -1 and `char(1114112).codePoint` is 1114112; `truncate` and `round` of a NaN are 0.

**The stages, all 83 moved** (with walk's `Float` carry, which they do not read): the distance '#total 0', every `#kind` 0, '#crash none', '#seconds 183 FortressLibrary 141' at load 1.72, its table equal to climb batch 23's but for the `#seconds` and `#machine` rows; the count '#total 0', '#locations 0', '#crash none', its 15 api rows, `com.sun.fortress.nativeHelpers 0` among them, equal to climb batch 23's but for those rows. So the checker reads the 83 against their helpers' signatures, `CHOOSE` and `FlatString`'s among them, and finds no error. `getProperty` sits in `System`, which neither stage reads.

**The control.** On the same tree with the batch's 74 moved, `Float`'s `<` naming `simpleDoubleArith.doubleAdd` for one run, then restored: the distance stage '#total 1', 'typecheck 1', '#unit component FortressBuiltin 1', `FortressBuiltin.fss:86:9-85`: 'Function body has type RR64, but declared return type is Boolean.' (at load 32.9, so its 298 s are no measure). So the distance reads a moved `Float` binding as a call of its helper and checks it against the helper's signature, as climb batch 23's control showed for `ZZ32`'s `<` in the count.

**The compiled sample.** A program in the compiled guard's form, `NativeHelperFamilySampleCompiled`, binding 18 of the families' helpers by its own top-level declarations (`doubleAdd`, `doubleLT`, `doubleToString`, `doubleTruncate`, `doubleSQRT`, `longOverflowingDiv`, `longOverflowingAdd`, `longWrappingToInt`, `longToString`, `makeZZfromZZ64`, the ZZ `add`, `div`, `eq` and `toString`, the two `Char` and two `NN64` special names), its values asserted and its divisions by zero and overflow caught, through `junit.sh` after the library order: '. link … OK (time = 7625ms)', '. run … (679ms) PASS', 'OK (2 tests)'.

**The walk prototype with the families** (`rung-W.patch` with F, Z and S applied, built): climb batch 23's nine helper tests through `harness-one.sh`, 'Tests run: 9, Failures: 1', the one `XXXNativeHelperUncarriedSelfWalk`, 'Refused at load as its keys name', with 'Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen: no Java type carries Holder, the type of self.', the other eight 'OK'; `ant testSystem` 'BUILD FAILED', 'Tests run: 181, Failures: 1', '169, Failures: 0', '174, Failures: 0', '170, Failures: 0', 694 tests, the one failure that `XXX` test (`TEST-…SystemJUTest.txt` of shard 0: 'Refused at load as its keys name, in an XXX test.'); `ant testSpecData` 'Tests run: 130, Failures: 0, Errors: 0'. So the library's 95 helper bindings load under the check of `self`. The compiled tracks were not run: none of the four texts reaches the compiled path.

**Row 701's guards dropped** (G): the three `header.getWhereClause().isNone() &&` conditions taken out of a copy of `CodeGen.java`, compiled into a scratch folder ahead of the build on the class path, each program compiled with a fresh copy of the caches and run with `bin/fortress run`. On the base's code: `XXXWhereBoundChecker` 'Don't know how to compile this kind of FnDecl. node = g[\U\](u:U):String'; a method `lbl(): String where { T extends Named }` of `object Holder[\T\](v: T)`, the same at its method; `trait AnyBox comprises { Box[\E\] } where [\E\]`, 'Can't compile TraitDecl AnyBox'; `XXXNatOpenRun`, 'Can't compile TraitDecl NatParamT'. With the conditions dropped: the first three compiled (rc 0) and ran, 'O', 'PASS' and 'PASS'; `XXXNatOpenRun` compiled and its run ended 'java.lang.VerifyError: Bad type on operand stack … Type 'XXXNatOpenRun$NatParamT' (current frame, stack[1]) is not assignable to …', at `size(mk())`, where the checker opens the size (row 307). Not probed: an object's own `where` clause, a contract, row 812's member.

**CHOOSE, by reading.** `simpleIntArith.intOverflowingChoose` throws `IntegerOverflow` only for `k > maxIntChooseN`, 33 (`nativeHelpers/simpleIntArith.java:209-210`), and then indexes `maxIntChooseSafeN[k-2]`, a table of 15 entries (`:126-127`), so after its reduction to `k <= n/2` a `k` from 17 to 33 with `n` above 33 indexes past it, where `n CHOOSE k` is at least `34 CHOOSE 17`, 2,333,606,220, past the ZZ32 range: an `IntegerOverflow` there is the specification's answer. `simpleLongArith.longOverflowingChoose` alike: 32 entries (`simpleLongArith.java:110-112`), the bound 66 (`:182-183`), and `67 CHOOSE 34` past the ZZ64 range. So one condition in each. Both helpers also keep their slow path's scratch array in one static field (`simpleIntArith.java:121`, `simpleLongArith.java:105`), which calls running in parallel share, as walk's loops do. The CHOOSE probe's patch (`plan-24/probes/choose.patch`, on disk at the planner's last look, its note `choose.md` not yet) fixes both faults in `simpleIntArith` and not in `simpleLongArith`; its note decides K (fork 2). The planner did not move the strings with the fix.

**Not run:** the compiled tracks, which none of F, Z, S and W reaches; the 52 demos, the gather's; microGPT's quick check, the commit stage's; any timing.

### Left out, each with its home

- **The two top-level bindings over `String`,** `printlnWithThread` and `getProperty`: Question 1's default; home, the string family's batch, after item 310 is asked again (review-queue item 310; PLAN item 62).
- **`FlatString`'s 5** (`size`, `|self|`, `cmp`, `javaSubstr`, `flatConcat`), which fit and which the stages pass (above): outside his scope for this batch; declared over `FlatString`, so row 846 does not reach them. Home: PLAN's natives line, the string family, which may take them before item 310's answer.
- **`CHOOSE`,** if its probe does not find the fix decided and small: PLAN's natives line, "The families that wait on a known obstacle", as before, with row 521's fix and `XXXChooseTableCompiledRungE`.
- **`widen` on `ZZ` (row 502):** class C, its binding names `BigNum$ToZZ64` and no helper computes it, so no rung of this batch meets it; home, N3 after his decision (PLAN item 31; review-queue item 20; `reviews/widen-evidence.md`).
- **The `asFloat`s** of `Int`, `RR32` and `NN32`, answering `Float` (climb batch 23's fork 12): their family's rung, as PLAN gives it.
- **The 109 that cannot name their helper as a bare string:** the hard-set probe, then section 3's kept place or a later batch.
- **The remainders and moduli by zero** (rows 336 and 848): class C, new helpers, N3; this batch gives each row its `XXX` test (fork 6).
- **Row 701's contract half, row 812 and row 307's call:** G's rows, left with their homes; row 812 and the contract half to the code-generator rungs that PLAN's phase 4 sizes from the 52 refusals (F-34), row 307 with the size read at a call, after the switch-over (revival-changes.md, "A size known only at run time").
- **Found by the planner, with no row:** `signed` of an `NN32` or `NN64` above the signed range wraps to a negative value, and `char` takes a negative code point or one past U+10FFFF and answers a `Char` that holds it, on the old code and the new alike (above). The specification is silent on both (`Specification/basic-lib/basic-integers.tex` names `narrow` and the shifts only); the library's api says of `char` "we don't presently deal gracefully with `Char`s outside the 16-bit plane" (`Library/FortressLibrary.fsi:2578-2580`). The first is the same question as row 502's for `widen`: keep the low bits, or raise `IntegerOverflow`. Home: the coordinator, two rows by `ledger.py add` (the planner's report hands them over), the first beside row 502; the guards assert neither.
- **Rung C's limits and review-routed.1** (PLAN, "Climb batch 23, listed for his review"): for the next rung that edits the natives' rewrite; no rung of this batch does.
- **The curator's question on the natives' form:** the helper-calls probe, landed while this record was drafted, found that the library's form and the prelude's compile alike and that phase 6 needs no change to the form (`999a1f6d2`; F-301, F-302); this record moves bindings in P-58's form as it stands.
- **FACTS made stale by the landing:** F-32's count, F-299's count and its row-847 sentence, F-181's `where` half: the commit stage's fold and the routing. The `fortress-repo` skill's `interpreter.md`, "Natives", on `self` and on the declared types walk carries, and `compiler.md` and `revival-changes.md` on the code generator's `where` refusal: the skill writer, from the batch's sentences made false.

## 5. How it is run

The batch runs on the workflow of climb batches 22 and 23: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Section 3 is each worker's brief word for word; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-24/manifest/gen24.py` reads with the briefings of `lists24.py` beside it, and `check24.js` checks.

### The generator

`plan-24/manifest/` is committed with this record: `gen24.py`, `lists24.py` and `check24.js`, made from `plan-23/manifest/`. Changed from climb batch 23's: the batch's values (`BATCH` `24`, its folder `compile-ladder/climb-batch-24/`, the output `manifest24.js`, `OUT24`); the rungs taken from `lists24.IDS`, in the order F, Z, S, K, W, G, as the gather applies them; no rung landing only with another, which `gen24.py` asserts and `check24.js` checks; `--without` taking any rung, as `--without K` should the CHOOSE probe drop K; H, the place kept for the hard set, joining once its section, its manifest block and its keys exist, since `lists24.IDS` names a rung only while its briefing list holds keys; K's briefing gaining the CHOOSE probe's note once the note is on disk; every section naming the count stage and the distance stage, saying it makes no speed pass and naming no P-148, since no rung changes the checker. Its runs on `main` with this record are in "Before the launch" below.

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. No rung's test is the stage: each has its tests first. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because the last landed summary has it. No rung declares a checker count: it is reported, never red. The expected minutes order the scatter only. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands; only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### F
- **slug:** `rung-natives-float`
- **worktree:** `/home/user/fortress-natives-float`
- **expected minutes:** 70
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the floating-point family: Float's 30 bindings moved onto their simpleDoubleArith helpers, with the one line of walk's loader that carries a declared Float in a double; a walk guard and a compiled guard of the 30, both passing before and after; no value moves under walk.
- **points to report:**
  - Whether you took rung-F.patch as it is or changed it, and why; each binding moved, and any left on its glue class.
  - Your two guards on the base and on your text, through the harness and junit.sh.
  - The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.
  - Each walk value that moves, and each test whose verdict changes in ant testSystem and ant testSpecData.
  - Each defect met, with its XXX test or its row.
  - Every sentence made false.
  - A file edited beyond those named, or any edit of StaticNativeApp beyond javaFor.

#### Z
- **slug:** `rung-natives-integers`
- **worktree:** `/home/user/fortress-natives-integers`
- **expected minutes:** 80
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the 64-bit and big integers: ZZ64's 20 and ZZ's 16 bindings moved onto their helpers, so that ZZ64's and ZZ's DIV by zero raise DivisionByZero under walk; two division tests failing before; XXX tests for rows 336 and 848; a walk guard and a compiled guard of the 36; row 336 rewritten.
- **points to report:**
  - Whether you took rung-Z.patch as it is or changed it, and why; each binding moved, and any left on its glue class.
  - Your division tests and XXX tests before and after through the harness, and your two guards on the base and on your text.
  - The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.
  - Each walk value that moves beyond the two divisions by zero.
  - Row 336's rewritten line and the reproducers of rows 336 and 848.
  - Every sentence made false.
  - A file edited beyond those named.

#### S
- **slug:** `rung-natives-small`
- **worktree:** `/home/user/fortress-natives-small`
- **expected minutes:** 50
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** the small rest: Long's and BigNum's string getters, NN32's and NN64's signed, Char's codePoint and the top-level char moved onto their helpers, the two top-level bindings over String left out; a walk guard and a compiled guard of the 8; no value moves under walk.
- **points to report:**
  - Whether you took rung-S.patch as it is or changed it, and why; each binding moved, and any left on its glue class.
  - Your two guards on the base and on your text, through the harness and junit.sh.
  - The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.
  - Each walk value that moves.
  - Each defect met, with its XXX test or its row.
  - Every sentence made false.
  - A file edited beyond those named.

#### K
- **slug:** `rung-natives-choose`
- **worktree:** `/home/user/fortress-natives-choose`
- **expected minutes:** 60
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** row 521: the ZZ32 and ZZ64 CHOOSE helpers raise IntegerOverflow past their safe-bound tables, and the two CHOOSE bindings move onto them; the compiled XXX pair promoted; a walk guard of CHOOSE passing before and after; both paths' suites; row 521 closed.
- **points to report:**
  - Whether you took the CHOOSE probe's patch as it is or changed it, and why.
  - The promoted pair before and after through junit.sh, and your walk guard on the base and on your text.
  - The distance table and the count table on your final tree, and any site that comes; the count stage's seconds.
  - The verdicts of ant testQuick and ant testSystem on your final tree, and each test whose verdict changes.
  - Each walk or compiled value that moves beyond CHOOSE past the table.
  - Every sentence made false.
  - A file edited beyond those named.

#### W
- **slug:** `rung-natives-self`
- **worktree:** `/home/user/fortress-natives-self`
- **expected minutes:** 70
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** row 847: walk's loader is told the type that declares a method, and refuses at load a helper bound in a method of a type that no Java type carries; the XXX test promoted, with a trait case beside it; walk's suite and the specification's examples; row 847 closed.
- **points to report:**
  - Whether you took rung-W.patch as it is or changed it, and why.
  - Your tests before and after through the harness.
  - The verdicts of ant testSystem and ant testSpecData on your final tree, and each test whose verdict changes.
  - Each declaring type your table carries, and any library binding it would refuse.
  - Every sentence made false.
  - A file edited beyond those named, or any edit of StaticNativeApp.javaFor.

#### G
- **slug:** `rung-codegen-where`
- **worktree:** `/home/user/fortress-codegen-where`
- **expected minutes:** 70
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **lands only with:** none
- **blurb:** row 701's where half: the code generator compiles a function, method, object or trait whose own header carries a where clause, its contract refusal kept; XXXWhereBoundChecker promoted, two run tests of the library's forms, XXXNatOpenRun turned into a run pair for row 307; row 701 rewritten.
- **points to report:**
  - Each guard changed, and anything else in CodeGen the emission needed.
  - Your tests before and after through junit.sh, and the run pair's two runs.
  - Each compiled test whose verdict changes in the compiler track, if you ran it.
  - Row 701's rewritten line and row 307's note.
  - Every sentence made false.
  - A file edited beyond those named, or any edit of the checker's Scala.

### What every agent reads first

This run is climb batch 24, the second batch of the plan's phase 4, the switch-over, and the second of its natives: each library binding builtinPrimitive("...") is to name a static Java helper of nativeHelpers that both paths call, in place of a glue class of walk's, which the compiled path cannot use (P-58; F-32). Climb batch 23 built the mechanism and moved 21 bindings; the count and the distance stand at 0 with them (compile-ladder/climb-batch-23/gate/; F-53). Of the 449 live bindings, 83 more can name their helper as a bare string. Its rungs: F, Float's 30, with the one line of walk's loader that carries a declared Float; Z, ZZ64's 20 and ZZ's 16, so that their DIV by zero raises DivisionByZero under walk; S, the small rest, 8; K, if its probe allows, the CHOOSE helpers' fix past their tables and the two CHOOSE bindings; W, walk's loader told the type that declares a method, refusing a helper bound in a method of a type that no Java type carries; G, the code generator compiling a declaration whose own header carries a where clause. Every rung that moves bindings writes two guards, a walk program and a compiled program over the same helpers, both passing before and after, and an XXX test for each defect it meets. The planner measured F, Z and S with W's prototype together on this base: walk's suite 694 tests and one failure, the XXX test W promotes; the specification's examples 130 and no failure; the stages 0 and 0 with all 83 moved. No rung changes the checker's code, so none makes a speed pass. No rung builds on another, and none lands only with another; the gather applies F, Z, S, K, W, G, rewrites the Appendix I entry's Effect once, and runs the 52 team demos on the merged tree; ant testSpecData runs in the gate because the landed summary has it.

### Before the launch

The coordinator:
1. The curator's go: pre-approved after the scope is discussed (`coordinator/HELD.md`, 08:2x UTC on 2026-10-31), with Question 1 put to him and taken at its default unless he answers; the record's other forks at their defaults (the `coordinator` skill's `references/batch.md`, "The go"). The Fable review of this record before the launch.
2. The CHOOSE probe's note, `plan-24/probes/choose.md`: K stays if it finds row 521's fix decided and small; otherwise every step below runs with `--without K`, and section 1's K paragraph and fork 2 say so.
3. The hard-set probe's note, `plan-24/probes/hard-set.md`: nothing, unless its rung is taken (section 3, "The place kept for the hard set").
4. The briefings checked on the base: `python3 -B explorations/compile-ladder/plan-24/manifest/lists24.py`, every key matching one place. The block generated and spliced: `python3 -B explorations/compile-ladder/plan-24/manifest/gen24.py`, then `node explorations/compile-ladder/plan-24/manifest/check24.js`, which splices it into a scratch copy and checks it; then `check24.js --write`, `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. The base is `main`'s head after that commit, its full hash, passed as `args.base`. At the planner's run on `main` with this record, the CHOOSE probe's patch on disk and its note not yet: `lists24.py` 'bad lists 0'; `gen24.py` 'wrote … manifest24.js 414 lines', its block checked by `check24.js` on a scratch splice, 'problems: 0'; and `workflow-scenarios.js` on that splice, 'problems: 0'. With `--without K`, the same, 'problems: 0' from both checkers. The scenario checker's first run on the splice printed 39 problems, each of a word in F's and G's texts that it refuses in a brief, 'NaN' (it watches for JavaScript's value) and a path of the skill's part on the revival's changes; the texts were reworded, and none of the problems was the script's.
5. The base build: `/home/user/fortress-base23`, at `1f5c49b4f`, serves if the base differs from it only in record and tool files (`git diff --stat 1f5c49b4f <base> -- Library ProjectFortress Specification build.xml bin` empty); otherwise a new one at the base, as the manual's "Before the launch" steps 2 and 3 give it.
6. `df -h /` against six seeded worktrees (about 206 MB each), the base build and the stages' scratch folders; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`, and the gather the demo driver.
7. Check-ins armed for the run's length, about 5 h 15 min, 45 minutes apart; a run stopped by the session's process stop or a VM restart is resumed with `resumeFromRunId`, as climb batch 23's twice was.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 4>', baseBuild: '/home/user/fortress-base23'}})`. The arguments are kept byte for byte in the session's scratchpad, as `batch24/launch-args.json`, since a resume needs them.

### The briefings, rung by rung

Each key is a `facts-extract.sh` key, read whole by the worker first; a key marked (check) is also read by the skeptic, a judge and a repair round. The reasons are in `lists24.py` and rendered at the end of the worker's brief. P24 is this record's probe folder, `compile-ladder/plan-24/probes/`, under `explorations/`; REC this record; the two guard models are climb batch 23's `tests/NativeHelperFamilyZZ32Walk.fss` and `compiler_tests/NativeHelperBindingCompiled.fss`.

- **F**, 15 keys, 6 checks: P-58 (check), F-299 (check), F-298, P-29, P-30, P-68; ledger 672 (check), 330; P24 `rung-F.patch` (check); REC "The planner's probes" (check) and "Forks the batch takes, none consequential"; the code of `StaticNativeApp.javaFor` (check) and `value object Float`; the two guard models.
- **Z**, 14 keys, 6 checks: P-58 (check), F-299, F-32; ledger 336 (check), 848 (check); P24 `rung-Z.patch` (check); REC "The planner's probes" (check) and the forks; the code of `trait ZZ64` (check) and `trait ZZ`; `tests/ZZ32DivisionByZeroWalk.fss`; `opr-overview.tex` "Multiplication, Division, Modulo, and Remainder Operators"; the two guard models.
- **S**, 12 keys, 4 checks: P-58 (check), F-299 (check); ledger 846, 502; P24 `rung-S.patch` (check); REC "The planner's probes" (check) and the forks; the code of `StaticNativeApp.box`, `value object Long` and `value object BigNum`; the two guard models.
- **K**, 9 keys and 4 checks with the CHOOSE probe's patch on disk, 10 and 5 once its note is: P-58 (check); ledger 521 (check); the probe's note (check) and its patch `choose.patch` (check); the code of `intOverflowingChoose` (check) and `longOverflowingChoose`; `compiler_tests/XXXChooseTableCompiledRungE.fss`; REC "The planner's probes" and the forks; the walk guard model.
- **W**, 11 keys, 5 checks: P-58 (check), F-299; ledger 847 (check); P24 `rung-W.patch` (check); REC "The planner's probes" (check) and the forks; the code of `StaticNativeApp.find` (check), `NativeApp.checkAndLoadNative`, `MethodClosure`'s and `FunctionalMethod`'s constructors; `tests/XXXNativeHelperUncarriedSelfWalk.fss`.
- **G**, 10 keys, 5 checks: P-151 (check), F-181; ledger 701 (check), 307 (check), 812; REC "The planner's probes" (check) and the forks; the code of `CodeGen.forFnDecl` (check); `compiler_tests/XXXWhereBoundChecker.fss` and `XXXNatOpenRun.fss`.

### The gate, and what it should show

The comparands are climb batch 23's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, over the fourteen, setting compile), in `compile-ladder/climb-batch-23/gate/`.
- `testSystem`: 694, the comparand's sum (181, 169, 174 and 170), plus the planner's named walk tests: F 1, Z 5, S 1, K 1, W 1 (the trait case; the promotion renames), so about 703 (702 without K), and any more that the rungs add (climb batch 23's forecast counted only the planner's, and its gate had 4 more).
- `testFast`: the compiler track 1,338 plus F's, Z's and S's compiled guards (a link and a run each, 6) and G's (the promotion's link and run, 2; two run tests, 4; the run pair, 1 more), so about 1,351, and any more that the rungs add; the library track 86, the other-compiler track 263 and the misc track 440, as landed.
- `testSpecData`: 130 green.
- The four-thread atomic runs, 42 lines: unchanged; no rung touches the run time's tasks or transactions.
- The ladder: 85 programs at `pass`; no rung declares a move.
- The checker count: 0, reported, not declared, its 15 api rows as the comparand's; on the merged tree it reads Z's 36, S's 2 and K's 2 in the main component.
- The distance, reported and never red (P-39): 0 over the fourteen, `#crash none`; on the merged tree it reads all 74, or 76 with K; `compare.sh` prints 'DISTANCE SAME   0' and no setting line.
- The 52 team demos at the gather, each reaching its end (F-283).
- microGPT's quick pair at the commit stage, both programs `ALL PASS`, 7 of 7 each (P-30): the first landing at which walk's float arithmetic runs through helpers.

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather; until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>`. Rows opened by plan: none. Rows closed: 847 (W), 521 (K). Rewritten: 336 (Z), 701 (G). Reproducers set: 336 and 848 (Z). Notes: 307 (G). Where `ledger.py` refuses a note for length, the gather writes it by a rewrite, as climb batch 23's did for row 521.

### After the landing

The landing report; the routing of every item for the curator into PLAN, Question 1 and this record's forks and points among them (the post-batch review's finding 1); FACTS: F-32 (the 449, 95 or 97 moved), F-299 (its count and its row-847 sentence), F-181 (the `where` half), F-53 unchanged; the two rows the planner hands over (section 4); the skill writer's task with the batch's sentences made false; the post-batch review. The next batch is the hard set's or the string family's, by the hard-set probe and item 310.

## 6. Files cited, with their links

- Records: [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [CLIMB-BATCH-23.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-23.md), [climb batch 23's post-batch review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-23-review.md), [climb batch 23's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-23/gate/summary.txt), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [the phase 3 exit judgement](https://github.com/palimondo/fortress/blob/main/explorations/reviews/phase3-exit/judgement.md), [the widen evidence](https://github.com/palimondo/fortress/blob/main/explorations/reviews/widen-evidence.md).
- Probes: the planner's [NOTES.md](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-24/probes/NOTES.md), [count.sh](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-24/probes/count.sh), [families.py](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-24/probes/families.py), [families-base.tsv](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-24/probes/families-base.tsv), [rung-F.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-24/probes/rung-F.patch), [rung-Z.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-24/probes/rung-Z.patch), [rung-S.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-24/probes/rung-S.patch), [rung-W.patch](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-24/probes/rung-W.patch).
- Code: [StaticNativeApp.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java), [NativeApp.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java), [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [simpleIntArith.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java), [simpleLongArith.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java), [FortressBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss), [FortressLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/FortressLibrary.fss).
- Specification: [opr-overview.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/operators/opr-overview.tex), [basic-integers.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic-lib/basic-integers.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex).
