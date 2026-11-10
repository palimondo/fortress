<!-- The combined post-batch review of climb batch 29b, the repair batch of coordinator/CLIMB-BATCH-29b.md that builds the curator's static numerals after climb batch 29's field numerals (two rungs planned and landed, A and T; run wf_ab289a6d-124, base b5b0f82c139f07f5bc8f57903dbae6f471941655; the Workflow call at 20:44:55.9 UTC on 2026-11-09, its first agent's first record at 20:44:58.391, its commit stage's last commit a2be3e9e1d at 00:38:49 on 2026-11-10; 9 agent transcripts, each with its meta file; no restart, no resume, no judge, no repair round; landed on main as A a26e74f5c8, T fcfd0aeb31, the closes c6ef2f0b80, the gather's record 17e93a7da8, the review's corrections eb8a592455 and the gate's tables a2be3e9e1d; pushed by the commit stage to main and two refs), owed at the landing by the coordinator skill's references/batch.md, "The landing", step 3, in the form of reviews/batch-29-review.md, by a review worker reading only, against main at a2be3e9e1d (the tree at 9fb5ab231f, whose two commits after it are the coordinator's boot note and a post-landing test change). Its sources for the design are only P-174, P-176, P-37, P-40, P-173 with history:P-174, and the design snapshot's sections 3, 4 and 11. The measures are batch-measures.py's and transcript-study/skill-load.py's on this run, spend.py's over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev29b/ (spans29b.py and mainw.py written new; tx.py, brief.py, parts.py, calls_mod.py and runs3.py copied from rev29). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, record.py check, ledger.py check and landing-check, facts-extract.sh, grep, sed, diff, df and git, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. A container restart at 01:09 UTC stopped it once; it went on from its transcript. -->

# Climb batch 29b: two of two rungs, the static numerals built on both paths and in the specification, the count and the distance still 0; a run of 3.25M, 23 % under its estimate, after a preparation span of 5.51M seen, four fifths of it the post-mortem of the field numerals, and a landing of climb batch 29 of 6.61M

## What came up in this run

### 1. Fidelity: the static numerals, path by path, against his design

**The standard.** P-174, P-176, P-37, P-40 and P-173, and the design snapshot's sections 3, 4 and 11 (`coordinator/postmortem-2026-11-09-numerals/design-snapshot.md`), which rule where they and an entry differ. In short: a numeral's type exists only at compile time, `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]` below `Numeral`; every number type, the library's and a program's, takes a numeral through a coercion generic over the four numbers, which the compiler instantiates and folds; there is no separate way in the compiler for the library's types; there is one value per place, made once; a numeral has no sign; no numeral value exists at run time; the prelude carries the same until the switch-over; walk does the same at the first evaluation of each place. Snapshot section 4 says what it is not: a value object with getters, `asFloat`, `asString` and `=` pairs; a coercion called at run time on such an object; `IntLiteral` or `FloatLiteral`; walk building a numeral object at a site.

**Verdict: the landed tree builds the static numerals on both paths in all the main points. The field numerals are gone from every live behaviour. Their code stays in walk in eight places, dead or inert, and in one test. The library's types still take three ways of their own: two are planned (forks A1 and A3), one is not.** By path:

- **The one library: in the letter.**
  - The five traits are at `Library/FortressLibrary.fsi:457-465` and `.fss:666-669`.
  - Each number type has a coercion generic over the four numbers: `RR64` (`.fss:389-390`), `QQ` (`:563-564`), `AnyIntegral` (`:672`, a `do` block that picks `ZZ32`, `ZZ64` or `ZZ`), `ZZ32` (`:778`), `ZZ64` (`:882`), `NN64` (`:990`) and `ZZ` (`:1098`). `RR32` and `NN32` are in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:214-215` and `:428`.
  - No getter, `asFloat`, `asString` or `=` pair on a numeral type is left. `git grep` for an operator with a numeral-typed parameter prints nothing.
  - No native binding changed: 0 `builtinPrimitive` lines in the diff of the four library files.
- **The prelude: in the spirit, with one gap that works against P-37's own reason.**
  - The same five traits are at `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:886-890`. `IntLiteral` and `FloatLiteral` are gone.
  - The coercions generic over the four numbers are at `ZZ` (`:517`), `ZZ64` (`:578`), `ZZ32` (`:663`), `NN32` (`:754`) and `NN64` (`:819`). `RR64` (`:894`) and `RR32` (`:955`) take only `RadixPointNumeral`.
  - So the prelude's `RR64` and `RR32` take no integer numeral. On the compiled path `r: RR64 = 3` is refused, "Right-hand side has type NaturalNumeral[\1,10,3\], but declared type is RR64." (the gather, row 442). Under walk the one library's `coerce` at `FortressLibrary.fss:389` binds `3.0`.
  - P-37's exception has the prelude carry P-174's design "so that both paths treat a numeral alike". Rung A read P-37's general rule instead: its decision 11 wrote `16777217.0` where the record's step 2 asked for `16777217` (`library_tests/NumeralFoldFloats.fss:11`), and its defect 8 names row 442. Findings, 2.
  - Planned and named: no `QQ` in the prelude (the record's section 4, A, "Tests").
- **The checker: in the letter.**
  - A numeral's type carries its four numbers, with `v` at any size.
  - The written-only rule refuses a numeral type outside a parameter's type (`XXXLiteralTypeUnwritable`, `XXXNumeralTypeExtendedRefused`).
  - A numeral where nothing fixes a type converts into its default through the default type's own coercion: `defaultNumeral` and `numeralInto` call `buildCoercion` (`scala_src/typechecker/impls/Functionals.scala:1016-1028`).
  - `-3` at a program's type is the type's `-` on the coercion of `3`, through the negator (`STypeChecker.scala:161-180`).
  - The range refusal by the exact value is `NumeralConversion.outOfRange`. The skeptic's `outOfRangeAt` (`CoercionOracle.scala:584-601`) extends it to a join's result positions.
- **The code generator and the run time: in the spirit.**
  - A numeral as written at a library type goes through that type's own coercion. The fold evaluates the coercion's body and knows only the built-in types' representations (`compiler/codegen/NumeralCoercionFold.java:57-80`). The class file holds the result where it is an `int`, `long`, `float` or `double`, boxed by the place type's own `make` (`CodeGen.java:7434-7446`).
  - Every other result is one method per coercion, `coerce_T№natural` or `coerce_T№point`, of the four numbers as `ZZ` values (`CodeGen.java:7326-7432`). Each place calls it once, into a static final (`:7271-7313`). The type's `-` runs with it (`:7254-7266`, `:5330-5340`).
  - The compiled literal classes are deleted (`9af764850d`): `FIntLiteral`, `FFloatLiteral`, `simpleIntLiteralArith`, `RemoveLiteralCoercions`, the literal names of `NamingCzar` and `Naming`, and the stub's interfaces.
  - Two departures of P-176's "one value per place, made once ... filled when the class loads" stay, both open: row 957's second case and row 971. Row 971 now reaches far more coercion bodies than its claim says (findings, 1).
- **Walk: in the spirit.**
  - At a typed place, walk runs the type's own coercion body once for each site and type. It binds the four numbers as `ZZ` values and binds the parameter to `()`, since no numeral value exists (`interpreter/evaluator/values/Numerals.java:440-484`, and `numeralCoercion` at `:362-383`).
  - A `where` clause over the four numbers refuses at the place's first run (`whereHolds`, `:422-438`).
  - `-3` at a program's type is the type's `prefix -` on the result (`:470-482`).
  - A numeral still evaluates to its default value, which carries its site (`IntNumeral`, `LongNumeral`, `BigNumeral`, `FloatNumeral`; `:182-227`). That is how walk meets a numeral at run time, as P-176 has it: "Walk fixes the coercion's static arguments from the numeral's four numbers and keeps the result for the place". The value's type is its default (`x = 3` is a `ZZ32` in `NumeralStaticDesignWalk`).
- **The specification: in the letter.** No sentence of `literals.tex` or of the boxes states the field numerals (the review's check 4, re-read here by `grep`). Appendix I's `revival-numerals` keeps the field numerals only as history. The Effect states the prelude's gap: coercions "from `NaturalNumeral` at its five integer types and from `RadixPointNumeral` at RR64 and RR32" (`Specification/appendices/changes.tex:5247-5250`).

**Every place where the landed tree still holds the field numerals, live or dead:**
1. `Numerals.object` (`Numerals.java:301-316`) and the `Site.object` field it fills: dead. It calls the library's `NaturalNumeral` or `RadixPointNumeral` constructor, which no longer exists (review.1).
2. `Coercions.withNumeralObjects` (`Coercions.java:409-431`): live but inert. `bestMatchForNumerals` calls it at each call of an overloaded function with a numeral argument (`OverloadedFunction.java:2306-2309`). It marks no argument, since `numeralType` answers `null` (`Numerals.java:288-293`). Its `objects` path in `CoercedCall.convert` (`Coercions.java:466-468`) is dead.
3. `Numerals.isNumeralObject`, `fieldValue`, `field`, `intField`, `sameValue` and `fractionDigits` (`Numerals.java:596-638`): live but inert. They test for the field numerals' objects by their fields `digits`, `fractionDigits`, `radix` and `digitValue`.
4. `FOrdinaryObject.seqv`'s numeral case (`FOrdinaryObject.java:47-49`): live at every `SEQV` of an ordinary object, and always false. Its comment states P-168's old exception, "two numeral values are strictly equivalent by their values, reduced", which P-168 no longer holds.
5. The class comment of `Numerals` (`Numerals.java:46-57`) still describes the field numerals: a numeral converts "into a numeral type as the library's NaturalNumeral or RadixPointNumeral object, and into any other type through that type's coercion from the numeral type, called with that object". It is not on review.1.
6. `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss:5-6`, row 960's reproducer. It declares `parts(x: RadixPointNumeral)` and reads `x.digits`, `x.fractionDigits`, `x.radix` and `x.digitValue`. By reading, it now fails because the parameter type is bare and the getters are gone, not because of row 960. So it is an expected failure that can never turn green when row 960 is repaired. Rung A rewrote row 960 ("the digit count, not a getter") but not its test. It is on no list (findings; Part 4).
7. The prelude's own form, dead text only: the comments at `Library/CompilerLibrary.fsi:38-44` and `CompilerLibrary.fss:91-96`, which justify `assert` by "the IntLiteral coercion" (review.1); `CodeGen.java:6482`, "replaces CONST.Nat.<size> by the IntLiteral of the instantiated number", whereas the probe made it `FZZ32.make`.
8. The record and the skill: P-172, P-76, P-173, P-174 and P-176, F-180, two maps, and `revival-changes.md`'s "Numbers" (Part 3 and Part 4).

Not field numerals but the team's run-time numeral values, left by plan:
- walk's `interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java` (unused; fork N11, fork A8);
- `interpreter/evaluator/values/FIntLiteral.java` and `FFloatLiteral.java`. `BaseEnv.java:630` binds a size through `FIntLiteral.make`, which gives an `FInt`, an `FLong` or an `FBigNum` except below `Long.MIN_VALUE`.

**The probe's report and the Fable review both say that `Numerals.object` is gone** (`plan-30/probes/draft-numerals.md:93`, `:293`; `coordinator/climb-batch-29b-review.md`, section 1, "walk binds the coercion's parameter to `()` and `Numerals.object` is gone"). The patch only cut its last caller's path. At the base it was at `Numerals.java:293`, and the patch has no `-` line for it. So the Fable review's fidelity verdict repeated a probe claim that it did not check against the patch. Rung A's report (section 13) and the merged-diff review (review.1) found it.

**Every place where the library's types still take a way of their own:**
1. **Compiled: a folded constant at a library type.** `CoercionDesugarer.foldsTo` (`compiler/desugarer/CoercionDesugarer.scala:28-60`) types it at the target by the type's name and range. `CodeGen.forIntLiteralExpr` and `forFloatLiteralExpr` then emit it by that name (`numeralTarget`, `CodeGen.java:4252`; `:2058-2080`, `:4301-4341`). **Planned: fork A3**, which the record put on his list as "the one conversion that no Fortress coercion performs".
2. **Compiled: the range refusal at a library type,** by name and range (`NumeralConversion.integerRanges`, `outOfRange`, `outOfRangeAt`; `CoercionOracle.scala:508-601`). **Planned: fork A1**, "a static constraint of the checker".
3. **Compiled: a fallback that emits an untyped numeral as its default by its bit length** (`CodeGen.java:4342-4360`), or as an `RR64` (`:2081-2085`), with no coercion. The checker's default goes through the default type's coercion (above), so only a numeral for which the checker built no coercion reaches the fallback. No record names this way, and none says which numerals reach it. F-118 states it as fact ("A numeral that no place types becomes its default by its exact bit length"). **Not planned. Its reach is not measured.**
4. **Walk: a folded constant at a library type** converts by `exactAt` (`Numerals.java:486-526`), by type name. **Planned: fork A3**; rung A's decision 7.
5. **Walk: the range check by name** (`inRange`, `:318-334`; `NUMBER_TYPES`, `:349-355`), refusing when the place runs. **Planned in kind:** fork A1's constraint, at run time by P-12 and P-176.
6. **Walk: a numeral where nothing fixes a type** is made by walk's own Java (`FInt.make`, `FLong.make`, `FBigNum.make`, `simpleDoubleArith.numeralToDouble`; `:182-227`), not by the default type's coercion, which the compiled path runs. **Not planned. The values are equal**, so no program can see the difference.
7. Allowed by fork A1, and not a way of its own: the fold's table of representations (`NumeralCoercionFold.java:57-80`) and the box by the place type's own `make`.

### 2. The two paths on a numeral, against his aim of 19:0x

His words of 19:0x UTC on 2026-11-09: "my word on reviving the original specification design on the numerals is implemented in both interpreter and compiled path".

**Where the two paths now agree**, each with a test on each path:
- the design's own cases of snapshot section 3, point 8: `CC64` from `3 + 4 i`, `-3 - 4 i` and `-3.5`; `Dec(3.14159)` as 314159 and 5; `BF16` rounding `1.00390625000000000001` once to `0x3F81`; the round trip `C.8_16`; `Tally`'s minus on the coercion of `3`; `-2147483648` at `ZZ32`; `-0.0` with `1/r` negative; one object per place at `Gen[\RR64\]` and two at two places; the byte type's `where { v < 256 }`; `0.1_2 SEQV 0.5`; `NOT (0.1 = 0.1_16)`; `x = 3` a `ZZ32`; `Cell(3)` a `Cell[\ZZ32\]` (`compiler_tests/NumeralStaticDesignCompiled.fss:80-118`; `tests/NumeralStaticDesignWalk.fss`);
- a coercion of another component (`NumeralAcrossComponent`);
- the minus run once with its coercion (`NumeralMinusOnceCompiled`);
- the library types' bounds (`NumeralFoldIntegers`, `NumeralFoldFloats`; `NumeralTypesWalk`).

**Where they still answer differently, planned:**
1. **Row 973 (CONTESTED), item 77, the record's point for him:** `u = 0`, `0 = u` and `f = 0` for a zero `NN32`, `NN64` or `RR32` are `false` under walk and `true` compiled. The compiled answer comes only from the prelude having no `=` over `Any`, so it flips to `false` at the switch-over. Its kin `h = 0.5` for `h: QQ = 1/2` is `false` under walk (review.2); the compiled path has no `QQ`, so nothing compiled answers it.
2. **Row 966, beside Q1:** `u =/= 0` is `true` under walk and `false` compiled. Item 470.
3. **Row 957's second case (fork A5 not built):** at a place whose type names a type variable, compiled gives two objects at one instance's type. By reading, walk gives one, since it keeps one value for each site and type (`Numerals.java:336-347`).
4. **Row 971 (fork A6 not built):** compiled, a coercion that spawns a task fails its class's load. Walk runs it at the place's first evaluation, inside the program. The fork's premise failed (findings, 1).
5. **No `QQ` on the compiled path** until the switch-over: the interval and the `QQ` cases are walk's only. No row; named in the record.
6. **Static on one path, at run time on the other** (P-12, P-176): an integer numeral out of range, a numeral at a type with no coercion from it, and a `where` clause that fails are refused statically compiled and when the place runs under walk. No row needed.
7. **A program's coercion that raises** stops the compiled program while its class loads, before `run()`. Under walk it raises at the place's first evaluation. This follows from P-176's two clauses. No row.

**Where they still answer differently, not planned, each with its row or none:**
8. **Row 442: an integer numeral at `RR64` or `RR32`** is refused compiled and converts under walk (section 1). The row is old; the batch record, its Fable review and the merged-diff review did not name it as a difference. Findings, 2.
9. **Row 974:** under walk, `object O extends NaturalNumeral[\1, 10, 3\]` and `Wrap[\NaturalNumeral[\1, 10, 3\]\](3)` load and run. Compiled refuses both (gather.2). Unlike item 6, walk never refuses them.
10. **Row 963** (item 462): `typecase 7 of ZZ32 => ...` is refused compiled as unreachable, since the selector keeps `NaturalNumeral[\1,10,7\]`. Walk takes the arm.
11. **Row 967:** a numeral that rounds to an infinity is a static error compiled and `Infinity` under walk.
12. **Row 958:** `2.5 + a` for an `RR32` `a` runs `RR64`'s `+` under walk and `RR32`'s compiled.
13. **Row 962 (CONTESTED):** a size of 2^31 or more read as a value raises `java.lang.Error` compiled and is a `ZZ64` under walk. A numeral coercion's four numbers are outside it now (they are `ZZ` values).
14. **Row 446:** `ee(5)` dies compiled with `NumberFormatException` and under walk with 'undefined variable [n]'.
15. **Row 694**, compiled only: with `NN32` parameters, `B.f(3, 4)` is refused, 'Ambiguous coercion' (gather.3). Walk's answer is not measured.

**One against the text on both paths alike, not a difference:** rows 956, 959 and 960.

**Of climb batch 29's nine unplanned differences (PLAN's item 76):** 961, 968 and 362 are closed, and 957 is narrowed to its second case. 958, 962, 963, 966, 967 and 446 stand. The batch adds 973 (planned), 974 and 442 (now visible), and widens 971.

So his aim is met for every case that the design's own tests put on both paths. It is not met yet in six ways:
- the most common numeral line of a float program, `x: RR64 = 3`, still answers differently (row 442);
- a program's coercion whose body calls two of its own functions in one expression fails on the compiled path alone (row 971);
- walk accepts a numeral type where the text forbids it (row 974);
- `u = 0` waits on his word (row 973);
- the inherited rows 958, 962, 963, 966, 967 and 446 stand;
- the mechanism is not the same everywhere, though the values are: walk makes the default by its own Java (section 1, way 6).

### 3. The count 0, and the distance 0 with no crash, against climb batch 29's tables

**What the record expected** (`coordinator/CLIMB-BATCH-29b.md`, section 6, "The gate, and what it should show"):
- `testSystem` about 819 and A's walk guards;
- the compiler track about 1,515 and about 6 more;
- the library track 86, and the misc track with A's unit test class;
- the atomic runs unchanged, and no ladder move;
- the count 0 ("a site is to be traced to one of A's edits"), and the distance 0 with `#crash none`;
- the 52 demos at the gather, and microGPT's quick pair 7 of 7.

The gate (`a974fcf8`) ran once, on `17e93a7da8`, and was green. The review's `eb8a592455` and the commit stage's `a2be3e9e1d` touch only `explorations/`.

**The count's table** (`climb-batch-29b/gate/checker-count.txt` against `climb-batch-29/gate/checker-count.txt`):
- `diff` prints nothing: 14 api rows, all 0, `#total 0`, `#locations 0`, `#crash none`, the shadow matching;
- 'COUNT SAME   0, declared none'.
- **No row is new and no row rose, at the gate or inside the batch, so no row needs a rung edit to explain it.**
- Rung A's count on its final tree `dde414aba4` read '#total 0 / #locations 0 / #crash none'. Skeptic A's runs on the base build and on A's head read the same, with tables equal.
- The skeptic's own checker fix `0923b029e0` came after those runs, so the gate's table is its only count: 0.
- Rung T ran neither stage (`STAGE_BLIND`).

**The distance's table:** `#total 0`, every `#kind` 0, `#crash none`, the shadow matching; 'DISTANCE SAME   0'. Only `#seconds` and `#machine` differ from climb batch 29's. The per-site list is its header alone.

**The summary's other rows** (`diff` of the two `summary.txt`):
- `CompilerJUTest` 1,506 to 1,525, against the record's about 1,521;
- a new misc suite, `NumeralCoercionFoldJUTest`, with 8;
- `LibraryJUTest` 86 (fork A7 held it);
- `testFast` 2,314 to 2,341;
- `testSystem` 813 to 822, over shards 205, 208, 203 and 206;
- `testSpecData` 130;
- 42 of 42 atomic runs `PASS`;
- no `COUNT DOWN`, no `SUITE GONE`.

**The ladder:** no move. All 85 files reach pass, and the 18 microGPT components are at disambiguate, as in the baseline.

### 4. The stages' times against climb batch 29's gate

The machine: nproc 4, Intel Xeon @ 2.10GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` (`distance.txt`, `#machine`).
- **The count stage: about 104 s**, by the gate log's file times (00:33:02 to 00:34:46), against 125 s. It ran alone: the suites, the atomic runs and the ladder had ended, and the review's last probe was at 00:27:12.
- **This session's count times on this code and the base show no slowdown** (P-148's smoke test):
  - the probe: base 1m44.733s; the patch 1m43.621s and 1m40.981s;
  - rung A: 1m48.479s;
  - skeptic A: base 1m56.329s, head 1m47.169s.
- **The distance stage: 190 s (`FortressLibrary` 117 s) at a start load of 0.26**, against 224 s (141 s) at 0.07. It started at 00:12:52, and `testFast` started beside it at 00:13:09, as at climb batch 29. So the start load understates the stage's load again.
- **The suites:** `testFast` 8 min 5 s against 8 min 42 s; `testSystem` 4 min 3 s against 4 min 20 s; `testSpecData` 56 s against 63 s.
- **The gate:** about 23 minutes (00:12:15 to the summary at 00:35:13), against 25.2.
- **F-240** now gives this gate's figures (the commit stage).

### 5. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 3.25M over 9 transcripts for 9 launches, in 3 h 55 min** (20:44:58 to 00:39:58 UTC; `tx.py`; `batch-measures.py` gives the same 3.25M). No agent was retried, killed, judged or repaired. Two agents ran at a time from 20:45 to 21:48, then one.

By role (writes, then share):
- Rung workers (2): 1.19M, 36.8 %.
- Skeptics (2): 890K, 27.4 %.
- Gather: 439K, 13.5 %.
- Merged-diff review: 410K, 12.6 %.
- Gate: 132K, 4.1 %.
- Commit: 121K, 3.7 %.
- The disk check: 63K, 1.9 %.
- Per landed rung, all roles: 1.62M. The fixed roles, 1.16M, are 36 % of the run, since there are only two rungs.

Against the batches before (B26, B27, B28, B29, B29b):
- Rung workers: 990K (4); 2.26M (10); 2.77M (7); 3.03M (6); 1.19M (2).
- Skeptics: 707K; 1.33M; 2.50M; 2.43M; 890K.
- Judges and repairs on a rung: 0; 231K; 164K; 314K; 0.
- Gather: 333K; 390K; 444K; 548K; 439K.
- Review: 204K; 271K; 401K; 467K; 410K. Its judge and repair: 0; 368K; 0; 415K; 0.
- Gate: 204K; 213K; 149K; 137K; 132K. Commit: 113K; 118K; 158K; 131K; 121K.
- Total: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M.
- Span: 2 h 27; 5 h 22; 6 h 16; 7 h 27; 3 h 55.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M.

**Against the record:** "About 4.2M tokens written, from 3.4M to 5.6M; about 6 hours 30 minutes at two agents at a time" (`CLIMB-BATCH-29b.md`, section 2, "Cost").
- **3.25M, 23 % under the estimate and under its range.**
- The workers wrote 1.19M against 1.55M: A 719.5K against 1.1M, T 474.7K against 0.45M.
- The skeptics wrote 890K against 0.95M: A 497.4K against 0.6M, T 392.8K against 0.35M.
- The fixed roles wrote 1.16M against 1.23M: the disk check 62.7K, the gather 438.7K, the review 409.7K, the gate 131.7K and the commit 120.6K.
- No judge or repair ran, against the 0.5M reserved.
- **The time:** 3 h 55 min against 6 h 30 min. A ran 108.5 minutes against 210, T 42.1 against 75. The critical path was 235 minutes: A, skeptic A 43.7, the gather 54.9, the review 24.5 and the commit 3.2.

**The order of the run.**
- The disk check at 20:44:58; A and T at 20:45.
- T returned at 21:27, and its skeptic ran from 21:27:15 to 21:48:25. From then to 22:33, only A ran.
- A returned at 22:33, and its skeptic ran from 22:33:40 to 23:17:21.
- The gather ran from 23:17:21 to 00:12:15; its demos took 23:42 to 00:11.
- The gate and the review ran from 00:12:15. The commit stage ran from 00:36:43 to 00:39:58.

**The cost in three spans, each on its own** (the `coordinator` skill's `references/batch.md`, "The landing", step 3).
- Each span is `spend.py <start>` less `spend.py <end>`, over the same folders:
  - the session's agents (`…/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/`);
  - the workflow folders `wf_110667e0-c4a` (climb batch 29's run), `wf_450f4ab6-51d` (its record-landing) and `wf_ab289a6d-124` (this run);
  - the project folder of headless sessions (`/root/.claude/projects/-home-user-fortress/`), and the landing worktrees' folders `-home-user-fortress-landing-29` and `-landing-28`.
- `find` shows no other folder with a transcript changed since 08:49 on 11-09.
- The coordinating session's own transcript is left out, as `spend.py` does. A transcript counts in the span where it last changed.
- `spend.py` printed:
  - 15.74M from 1794214158 (08:49:18 on 11-09);
  - 9.13M from 1794228808 (12:53:28);
  - 3.62M from 1794257090 and from 1794257098.391 (20:44:58.391, the first agent's first record; the Workflow call was at 20:44:55.938, and no transcript last changed between these times);
  - 0.49M from 1794271129 (00:38:49). This holds the run's commit agent (120.6K, last changed 00:39:58), the coordinator's round-trip test agent (131.7K) and this review (239.6K at 00:45, more since), all after the run's end.

- **Span 1, the landing work of climb batch 29:** from `7daf51fe8a` (08:49:18) to the end of its record-landing workflow, whose journal last changed at 12:53:28. **6.61M over 35 transcripts.**
- **Span 2, the preparation of climb batch 29b:** from 12:53:28 to 20:44:58.391. **5.51M over 19 transcripts seen.**
- **Span 3, the run:** from 20:44:58.391 to `a2be3e9e1d` (00:38:49). **3.13M over 8 transcripts**: the run's 9 less its commit agent.

- **Span 1, 6.61M:**
  - Climb batch 29's record-landing run, 26 agents, 4.55M (Opus 3.87M over 17, Sonnet 0.67M over 9). The largest agents: sort 561K, page 415K, check 413K, admission 347K, quiz author 287K, quiz reader 1 272K, judges 261K and 222K, quiz reader 2 83.5K and again 193.4K. A container restart at about 11:58 stopped it, and it was resumed at 11:59:48, so quiz reader 2 ran twice. Its last agent, the revival-page publish (93.7K), last changed in the same second as the journal, 0.586 s after the integer boundary, so by the rule it counts in span 2.
  - Its four headless skill-writer sessions, 963K: two in the `landing-29` folder, 10:02 to 10:48, 695K; two on `main`, 11:19 to 11:53 (104K) and 12:19 to 12:35 (165K).
  - The record-landing run with its writers: 5.60M, against climb batch 28's 4.58M.
  - Climb batch 29's post-batch review, 569K.
  - The first three Sonnet scouts of his fidelity inquiry, 09:23 to 09:27, 399K. These are the post-mortem's first work, but they last changed in span 1.
  - Climb batch 29's commit agent, 131K, last changed at 08:50:36.
- **Span 2, 5.51M seen.** Every commit in it is the coordinator's or its agents', not the run's.
  - **The record-landing's tail, 94K:** the revival-page publish agent (above).
  - **The post-mortem of the field numerals, 12:54 to 19:53, 15 agents, 4.53M:**
    - **Fable 1.29M:** the fidelity review, 1,265K (`3bab3569dc`), of which 631K is one write of its whole context at 13:18:55 after 10 min 42 s of silence, a cache refill; the snapshot writer, 22K (`721af941ac`).
    - **Opus 2.93M:** two rechecks, 197K and 217K; judges 1 and 2, 288K and 281K; the recovery scout, 458K (`24a49044ba`); the record writers, 443K (`cac54a1bf1`) and 99K (`51b048ea1c`); the static numerals probe, 952K (`96e1ad671c`, 17:53 to 19:53).
    - **Sonnet 0.31M:** five scouts.
  - **Climb batch 29b's own preparation, 19:56 to 20:44, 885K:** the planner, 408K (`c94e8eb070`); the Fable review, 296K (`287d6586cd`); the manifest generator, 181K (`05e3e6ae5d`). The rerun `b5b0f82c13` was the coordinator's own, in its session.
  - **Fable's share of span 2, seen: 2.29M.** Agents: 1.58M (the fidelity review 1.26M, the snapshot 0.02M, the batch review 0.30M). The coordinating session's own Fable writes: 0.71M (below). So the post-mortem's Fable writes are 2.00M and the preparation's 0.30M.
- **Span 3, 3.13M:** the run's 8 transcripts that last changed by 00:38:49. No agent of the coordinator's ran beside the run.

So the landing of climb batch 29 wrote twice what this run wrote. Of the preparation span, about 82 % of what `spend.py` sees is the post-mortem and 16 % is the batch's own preparation. With the session's own writes, the post-mortem is 5.70M and the preparation 0.95M. The spans of climb batch 29's review were 6.14M, 6.28M seen and 7.41M.

**What the count could and could not see.**
- It saw every transcript of the live folders since 08:49 on 11-09, by its mtime. The container restarts at about 11:58 on 11-09 and at 01:09 on 11-10 kept the disk.
- **The coordinating session's own writes**, which `spend.py` leaves out by design, come from its transcript, by each message's time and model (`mainw.py`):
  - span 1: 262K, Opus;
  - span 2: 1,240K. Opus 251K from 12:53 to 13:51; Fable 709K from 13:55:10 to 18:58:03; Opus 214K from 19:00 to 19:54, which includes 157K, its whole context, written at the switch to Opus at 19:00:38; Opus 67K from 19:54 to 20:44:58, the preparation's;
  - span 3: 51K (the check-ins, and the round-trip test's validation at 21:34 to 21:37).
- `spend.py` shows no model; the transcripts do. Every agent of the run ran on Opus (each meta file's "model": "opus").
- A transcript counts where it last changed. So three cross a boundary: climb batch 29's commit agent (span 1), the record-landing's publish agent (span 2), and the run's commit agent (after span 3).
- Reads from the cache are not counted.

**The briefing's use and cost:**
- **4 of 4 briefed agents read their briefing, 100 %: the two workers and the two skeptics. None read it in its first turn.** The disk check, the gather, the review, the gate and the commit stage have no briefing by design.
  - Rung A read it at call 21 (message 21), 97 s after its start; rung T at call 12, 56 s.
  - Skeptic A read it at call 17, 70 s; skeptic T at call 12 (message 8), 41 s.
- **Each agent read every part** (`parts.py`: each ends 'end of part N of N, the last'). A and T had three parts, skeptic A three, skeptic T two. A wrote part 1 to a file and read it. **No key failed:** no 'not found' and no 'Exit code 1' in any briefing call, so climb batch 29's process finding 3 held.
- **Its results came to about 89K tokens, 2.7 % of writes**, at 0.40 tokens a character plus 110 a call: A 22.7K, T 25.1K, skeptic A 25.5K, skeptic T 15.5K.
- Against the batches before (briefed, read, at calls, seconds, share):
  - B26: 8, 8, 5 to 13, 21 to 89, 5.2 %.
  - B27: 15 of 19 launched, 15, 4 to 16, 16 to 78, 6.2 %.
  - B28: 15, 15, 3 to 21, 14 to 95, 3.1 %.
  - B29: 15, 15, 4 to 20, 15 to 105, about 3.6 %.
  - B29b: 4, 4, 12 to 21, 41 to 97, 2.7 %.

**Other measures.**
- **First calls:** 630K (19.4 %), 8 cold (`batch-measures.py`): every agent but rung T. At climb batch 29: 1.12M and 10 cold.
- **Cache refills: 0.** **Refusal cycles: 0.** **Rulings and repairs on the merged tree: 0.**
- **The skill's load** (`skill-load.py`, 9 agents): 345K, 10.6 %. Load text 69K (2.1 %) and 276K over 74 part reads (8.5 %), against 12.9 % at climb batch 29.
  - 8 agents loaded `fortress-repo`; the disk check did not.
  - `revival-changes.md` was read 6 times (68K): by both rungs, both skeptics, the gather and the review. The gate and the commit stage did not read it (climb batch 28's process finding 8, now held).
  - `sources.md`, which `SKILL.md` says not to load for a task, was read in 4 calls by rung T, skeptic T (twice) and the review (3K).
- **Builds** (`batch-measures.py`; `runs3.py`):
  - Rung A: 6 `ant compileAll` and 6 library orders, each after an edit of code.
  - Skeptic A: 1, after its fix. The gather: 1, on the merged tree, from empty caches.
  - The gate's build took 2 s with the caches kept.
  - The specification was built 6 times on 6 texts: T four times, skeptic T once, the gather once. The commit stage built none (climb batch 29's process finding 4, held).
- **Rows:**
  - 2 opened: 973 (A's NEW-A-1) and 974 (the gather).
  - 8 closed in `c6ef2f0b80`: 969, 970, 961, 968, 318, 362 and 972 as planned, and 328 beyond the plan (`--test none`). Row 957 was not closed; it is rewritten to its second case.
  - Rewritten: 957, 962, 963, 960, 966, 513 and 971 (A); 82, 314, 316, 442, 514, 652, 691, 769, 959, 694 and 581 (the gather); 893 (T); 80 (the landing check); 973 (the review).
  - `ledger.py landing-check b5b0f82c139f07f5bc8f57903dbae6f471941655`: 'b5b0f82c1..HEAD: no finding'.
  - `ledger.py check`: 'fortress-gap-ledger.md, 973 rows, 0 fail the template'.
  - `record.py check --base b5b0f82c13`: '0 failures', FACTS 279 entries, POSITIONS 102.
- **The disk:** 20,109,068 KB available at the launch (the disk check, `df -P`), against the floor of 7G for two rungs. 19,462,660 KB at this review, after the commit stage removed both worktrees.

Per agent, in order of start (UTC; ids are the transcripts' `agent-<id>.jsonl`; messages are distinct message ids):
- Disk `a3e93190`: 63K; first call 61K, cold; 2 messages; 0.1 min; 20:44.
- Rung A `a8154565`: 720K; 78K, cold; 315; 108.5; 20:45 to 22:33.
- Rung T `ac4391cf`: 475K; 22K; 182; 42.1; 20:45 to 21:27.
- Skeptic T `a82df7aa`: 393K; 79K, cold; 126; 21.2; 21:27 to 21:48.
- Skeptic A `ae096cc1`: 497K; 87K, cold; 175; 43.7; 22:33 to 23:17.
- Gather `a919330d`: 439K; 81K, cold; 199; 54.9; 23:17 to 00:12.
- Gate `a974fcf8`: 132K; 69K, cold; 47; 23.6; 00:12 to 00:35.
- Review `af8029eb`: 410K; 78K, cold; 187; 24.5; 00:12 to 00:36.
- Commit `ab743bd7`: 121K; 74K, cold; 29; 3.2; 00:36 to 00:39.

### 6. The tail

- **Skeptic T** (393K, 21.2 minutes): approved.
  - Fix `05b264bf5c`, a defect of the text: two Effect sentences of `revival-numerals` were narrowed. The top-level `=` now applies only where the number type declares no `=` with the numeral's default (`changes.tex:5278-5281`), and row 962 lies outside the four numbers (`:5304-5307`).
  - Correction `b7a8a42492`: five moved citations.
  - One call read rung A's worktree's git log while A ran (call 30).
- **Skeptic A** (497K, 43.7 minutes): approved.
  - Fix `0923b029e0`, a defect: the checker refuses a numeral out of range in a join's result position (`CoercionOracle.scala:584-601`), with `XXXNumeralJoinBeyondRange`. The test was red on A's head: 'UNEXPECTED exception / java.lang.Error: Desugarer found no case clauses ...'.
  - Corrections: `b7de2fece9` (row 971's `XXX` pair), `403c849b8d` (the unit test's constructor typed), `0ca6f3feb7` and `7d13b8a378` (the record).
  - Its count runs are in section 4. It read from A's transcript that each test failed first, on `8ec860f0b7` or the base.
  - One built-in safety refusal: an `rm -rf *` in its scratch folder.
- **The gather** (439K, 54.9 minutes):
  - It applied A, then T, with no conflict, and built once ('Total time: 49 seconds').
  - Batch tests on `fcfd0aeb31`: walk 'OK (14 tests)'; compiled 'OK (49 tests)' and library 'OK (4 tests)'; the two unit classes '8' and '9', 0 failures.
  - It measured again the eleven open rows whose messages named `IntLiteral`, and filed row 974 with the gated `XXXNumeralTypeWrittenWalk`.
  - The demos: 'demos: 52 run, 52 reached their end'. The specification: 715 pages, 0 warnings.
  - It closed the eight rows, and cleared row 80 in the landing check.
  - It rewrote F-79, F-342 and F-345, and moved the citations of F-168, F-169, F-173, F-175 and F-272.
  - Items gather.1 to gather.3.
- **The merged-diff review** (410K, 24.5 minutes, beside the gate): **approved**, with no blocking finding.
  - Its corrections are in `eb8a592455`: eight FACTS entries (F-57, F-112, F-118, F-262, F-340, F-341, F-342, F-346); row 973 gained the `QQ` case; item 77 and PLAN `:761-764`.
  - Items review.1 to review.3, review-routed.1 and .2.
  - Its walk probes used a private caches folder (`tmp/review-29b/caches`), from 00:23:34 to 00:27:12, between the gate's distance stage and its count stage (climb batch 29's process finding 5, held).
- **The gate** (132K, 23.6 minutes): green, as section 3 gives.
- **The commit** (121K, 3.2 minutes):
  - It ran the microGPT walk check, then made `a2be3e9e1d` with the tables, F-53's title and F-240's figures.
  - It pushed `main`, `claude/worker-brief-fable-vnnuv8` and `blinded-fable` on the first try.
  - It removed both worktrees without `--force`.

### 7. The microGPT walk check

Its verdict lines (`climb-batch-29b/gate/summary.txt`, `# microgpt-walk`), started at 00:37:12: "MicroGptAplQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" (rc=0) and "MicroGptFlatQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" (rc=0). So both programs pass 7 of 7. By the ruling of 2026-10-23 the seconds are not compared. No model line changed: `git diff --stat b5b0f82c13 a2be3e9e1d -- explorations/run-c4/src explorations/apl/mg` prints nothing.

### 8. The natives and the code generator after climb batch 29b

- **The bindings:** unchanged. 374 of the one library's 402 live bindings name a helper, and `Reflect`'s 28 name glue classes (F-32, F-299). The batch changed no `builtinPrimitive` line.
- **The compiled path has no numeral value at run time.** Section 1 gives:
  - the fold, `NumeralCoercionFold.java`, 479 lines, which reads the declaring component from the analyzed cache and, where the entry is stale or missing, does not fold (A's decision 1, not fork A1's `GraphRepository.getComponent`);
  - the one method per numeral coercion;
  - the static final filled on its first read (`numeral$init$k`);
  - the minus with its coercion.
- **The prelude's coercions fold to JVM constants** at `ZZ32`, `NN32`, `ZZ64`, `NN64`, `RR64` and `RR32`, and `ZZ`'s takes a static final (A's REPORT, section 1, the table; `javap -c` lines such as 'ldc #54 // int 2147483647 / invokestatic FZZ32.make:(I)').
- F-34's 38 refusals in 10 kinds are still not measured on today's code.

### 9. The points the coordinator asked for

**1. The share of briefed agents that read the briefing: 4 of 4**, none in its first turn, every part read (section 5).

**2. Re-measuring: no stage ran a build, a suite or a measurement on a code state that another stage ran, beyond the manual's exception and the stages' design. But with one code rung, three pairs came close.**
- **The base's count stage ran twice for one code:** the probe on `dd00743d9e` with the patch's base (1m44.733s), and skeptic A on the base build (1m56.329s). Skeptic A's head count also ran on A's code state `dde414aba4`, which A had counted. Both are the manual's one exception ("Skeptic").
- **The compiled tests ran three times on one code state.** Skeptic A's `ant testQuick` ran at 23:06 on its fixed tree (compiler 'Tests run: 1525, Failures: 0'). The gather ran the batch's 41 compiled tests at 23:38, and the gate's `testFast` ran at 00:13 (compiler 1,525). The merged code is the skeptic's code, since T adds none and `git diff 1b2a7c75b2 a26e74f5c8` outside `explorations/` is empty. The unit class `NumeralCoercionFoldJUTest` ran on that state in skeptic A, the gather and the gate. Each run follows the stage's own brief, but with one code rung the skeptic's last suite and the gate are one code state (process finding 3).
- **The 52 demos ran twice:** rung A ran them at 21:56 to 22:27 on `dde414aba4`, and the gather at 23:42 to 00:11 on `fcfd0aeb31`. The two code states differ only by the skeptic's checker fix, which walk does not run. A's section asked for no demos; A ran them by `tests-running.md`, "Outside the gate" (climb batch 29's process finding 9, not taken up). About 30 minutes of machine time each.
- **microGPT's quick checks ran twice:** rung A ran them on `dde414aba4` (mg-run, 'rc=0 secs=49' and 'secs=58'), and the commit stage on the merged code. The same holds as for the demos.
- **The gather's build** of the merged tree from empty caches built the code state that skeptic A had built in its worktree. The main tree needs its own build, so this is by design.
- The specification: six builds on six texts, no repeat.

**3. The checker count's new or risen rows: none,** at the gate or inside the batch (section 3).

**4. What the cost count could and could not see:** section 5. The coordinating session's own writes are given apart, by model.

**5. The coordinator's commits and runs during the run.**
- Five boot-note commits, `f213ee7bf9` to `033d4be7d7` (20:45:12 to 21:45:57), each changing only `BOOT.md`, all before the gather started. None was made from the gather's start to the push. No `.claude/` path changed.
- **The coordinator ran JVM programs itself during the run:** from 21:34:46 to 21:36:42 it seeded `/home/user/fortress-rt-check` from the base build, applied the probe's patch, and ran the round-trip programs under walk and compiled. That was beside rung A's work. No timed stage of A ran then (A's chain started at 21:37:46), and the worktree is gone (climb batch 28's finding 2, in a new form).

**6. The clone: not shallow** (`git rev-parse --is-shallow-repository`: false).

**7. The coordinator's finding of after the landing, on row 971:** findings, 1, and Part 4. I read its evidence: commit `9fb5ab231f`'s message, and its run's output ('Caused by: java.lang.ClassCastException: class java.lang.Thread cannot be cast to class com.sun.fortress.runtimeSystem.FortressTaskRunner', from 'RoundtripCompiled.coerce_RoundtripNumeral?point', 'run1=1' and 'run4=1').

## Part 1. Conformance

### Method

As in `reviews/batch-29-review.md`. For each rung I read:
- its commit on `main`, and its diff against the base;
- its section of `CLIMB-BATCH-29b.md` (sections 1 and 4) and the forks (section 3);
- the Fable review of the record, the probe's report and its patch;
- the gather's `RECORD.md`, both rungs' `REPORT.md` and `SKEPTIC.md`, and the run's result;
- the code and the specification on `main`.

Three standards, kept apart:
- the specification and the Working Draft;
- the library's own way (P-27), and for compiler and interpreter code the team's code beside it;
- the decisions on record: P-174, P-176, P-37, P-40 and P-173, with the snapshot's sections 3, 4 and 11 ruling where they differ, and P-12, P-148, P-165, P-168, P-96. With them, his standing go of 19:0x UTC on 2026-11-09, under which the Fable review's recommended defaults landed.

Where the batch's record and the tree disagree, the tree rules. I ran nothing of the tree; what is "by reading" is marked.

### The verdicts

- **Rung A, the static numerals on both paths (P-174, P-176, P-173, P-37): in the spirit,** with splits 1 to 6. Section 1 gives it path by path.
- **Rung T, the specification (P-174, P-176, P-173, P-40, P-96): in the letter.** Its Effect states the merged tree, the prelude's gap included. Its own list of sentences without a ground in the decisions is gather-checked and minor (split 7).
- **Rulings:** none. Both skeptics approved, each with one fix of a defect.

### Where the text, the brief or the principles split

**1. Fork A2 widened row 971, and fork A6's premise failed (rung A; row 971).**
- Fork A6 left row 971 to the switch-over's start-up work, on the premise that "a rung of its own would need a reproducer outside the numerals, which no probe has shown" (`CLIMB-BATCH-29b.md`, fork A6).
- Fork A2's one method per coercion keeps the parallelism analyzer's spawns, which the probe's inlined copy, "made of new nodes, did not". Those are A's words, in `063495022b`.
- The analyzer spawns an operator's operands, or a call's argument tuple, when two of them are compute-intensive. Every call of a function that the program names counts so (`compiler/codegen/ParallelismAnalyzer.java:44`, `ARG_THRESHOLD = 2`; `:158-164`, `:186-212`; `:214-219` marks every named function).
- The method runs in the class's static initializer, before `MainWrapper` starts the pool (`runtimeSystem/MainWrapper.java:61-64`, whose team comment wants "a task pool before any user code is run").
- So the patch's own `Written` coercion failed, and A changed that test to bind its operands first (`063495022b`). A named a fix, "the coercion's method compiled without parallelism", and did not take it (decision 10). A named the widened reach as defect 6.
- The coordinator measured the same failure after the landing, at 1 and at 4 threads.
- Nothing routed the weight for P-176 to him. Row 971's claim still names only `Cell(part(1) || part(2))`. Findings, 1.

**2. P-37's exception read narrowly at `RR64` and `RR32` (rung A; row 442).** A's decision 11 reads P-37's rule that no declaration is added to the prelude, and leaves out `RR64`'s and `RR32`'s coercions from `NaturalNumeral`. P-37's exception is that "until the switch-over the prelude carries the design of P-174 and P-176, so that both paths treat a numeral alike". The record's own test value `16777217` became `16777217.0`. Findings, 2.

**3. Fork A1's text against the code (rung A).** The fold reads the declaring component from the analyzed cache, not `GraphRepository.getComponent` (decision 1). It runs an `OpExpr` through the operator's declaration, not `IntegerLiteralFoldingVisitor`'s operators (the skeptic: "the same fragment in effect"). Both are told. Both stay within the fork's reason, since the fold knows only representations. Default: as landed.

**4. Fork A5 not built (rung A; row 957's second case).** A class-loader template has no per-instance static field. The row is rewritten to that case, with an `XXX` pair. Default: as landed.

**5. Walk's default and walk's folded constant by walk's own Java (rung A).** Section 1, ways 4 and 6. Way 4 is fork A3. Way 6 is unplanned and equal in value.

**6. The field numerals' code that the patch only unhooked (rung A).** Section 1, items 1 to 6. A named items 1 to 4 (REPORT, section 13), and the review routed them (review.1). Items 5 and 6 are on no list. The probe's report and the Fable review said `Numerals.object` was gone.

**7. Rung T's sentences without a direct ground (T's own list).** The power with a numeral exponent (`changes.tex:3805-3812`, from the patch); the two `Any` traits in the normative text; the probe's exclusion-rule reason for `Numeral` without static parameters (`:5144-5149`); the binary decline's clause; what `roundDown` and `roundUp` compute; row 960 on both paths. The gather checked each against A's code. Default: as landed. T.worker.2 and T.skeptic.2 put the hierarchy (question 4) on his list.

### The rungs, briefly

**Rung A, `a26e74f5c8`.**
- What it did:
  - the probe's patch, unchanged, as its first commit (`8ec860f0b7`, 90 paths, one whitespace warning);
  - the prelude's `NN64` coercion repaired (`9f33376ad4`; the patch's body raised `IntegerOverflow` at `v` of 2^63 or more);
  - the fold, the one method per coercion with the probe's inlining removed, the fill on demand, and the minus in the static final;
  - `foldsTo` kept for folded constants only, and walk's `exactAt`;
  - fork A8's deletions;
  - the library track held at 86 by two new tests;
  - row 957's second case as an `XXX` pair;
  - both suites, the count, the distance, microGPT and the demos on `dde414aba4`.
- Standard 1: the Working Draft's numeral types and "Libraries define coercions from numerals" (`Specification-1.0-frozen/basic/expressions/literals.tex:83-148`).
- Standard 2: the code generator's way of compiling a generic declaration once. The team's comment in `MainWrapper` points against fork A6's deferral.
- Standard 3: P-174, P-176, P-173, P-40 and P-37's exception. Rows 969, 970, 961, 968, 318, 362, 972 and 328 are closed. Splits 1 to 6.

**Rung T, `fcfd0aeb31`.**
- What it did:
  - the literals chapter's numeral types as static parameters, the coercion generic over the four numbers, the fold, the one value per place, the sign rule and the written-only rule;
  - the types, numbers, coercion, inference, trait-parameters, constant and binary chapters' boxes;
  - `revival-numerals` rewritten in place (fork T1), and five entries revised;
  - both builds clean.
- Standard 3: P-174, P-176, P-173, P-40, P-165, in the revision form (P-96); forks T1 to T3.

### The decisions consequential for him, and the readings he has not confirmed

The record put no question to him before the launch: his standing go of 19:0x covered it, and the Fable review's defaults landed. Its one consequential fork, Q1, `u = 0`, landed at its default, the probe's state (item 77). Every other fork landed at its default, except A5 and A6, which were not built by their defaults, and the departures of splits 1 to 3.

The results that stand on a reading he has not confirmed:
- **A folded constant at a library type converts outside any coercion** (fork A3). It is on his list, and the record says so.
- **The checker's range refusal as a static constraint, not a `where` clause on each library coercion** (fork A1). On his list.
- **A folded static expression reaches a program's type through its default's type** (question 3). On his list.
- **The hierarchy of five traits without `comprises`** (fork A4; T.worker.2).
- **P-37's exception, read as not covering `RR64`'s and `RR32`'s natural-numeral coercions** (split 2). Not on his list.
- **Fork A6's deferral of row 971, now with a reproducer in the numerals** (split 1). Not on his list.
- **Walk makes a default numeral by its own Java, not by the default type's coercion** (section 1, way 6). Not on his list.
- **The dates of the decisions in the text** (T.skeptic.3).

### The global questions

- **Promised against landed.** Both rungs landed. Of fork A's steps, 1 to 4, 6, 7 and 9 were built, 5 as guards, and 8 (A5) was not. 7 of the 8 planned closes landed (957 was rewritten), and 328 was closed beyond the plan. Rows 973 and 974 were filed.
- **The record's premises that failed:**
  - fork A6's "no reproducer" (split 1);
  - "the prelude carries the same" at `RR64` and `RR32`, which the record, its Fable review and the merged-diff review read as built (split 2);
  - `Numerals.object` "gone" (split 6);
  - the cost and the time, 23 % and 40 % over the measured.
- **Built twice: nothing.** A and T share no file.
- **The library's way: yes for each**, with split 2 against P-37's exception.
- **Together.** T's text matches A's code clause by clause (the gather's and the review's checks), except row 974, which the Effect names (`changes.tex:5294`).

### Findings

Sorted by what each needs.

**Findings that would change a decision of his, each with its options:**

1. **Row 971 now reaches every numeral coercion whose body puts two calls of the program's own functions in one operator or one argument list, so P-176's "filled when the class loads" fails there on the compiled path.**
   - The evidence:
     - A's `063495022b` and its REPORT, section 11, defect 6;
     - the coordinator's run after the landing: `w: ZZ32 = small(n) - small(m)` fails the class's load at 1 and at 4 threads, and the same program passed on the probe's patch, which inlined the body;
     - `9fb5ab231f`'s message.
   - By reading, not run: P-174's own example, `Interval(roundDown(v, r, m), roundUp(v, r, m))`, passes two such calls as a constructor's arguments, so a compiled program of that form would fail as well.
   - Walk runs all of these, so the two paths differ.
   - Fork A6's reason for waiting, "no reproducer outside the numerals", no longer holds: the reproducer is the design's own form. The skill names no such trap today, so a worker who writes a coercion meets it blind.
   - Options:
     - (a) Build fork A6's own default next: start the task pool before the program's classes load (`MainWrapper.java:61-64`, as its team comment intends). This keeps P-176 as written and changes every compiled program's start-up.
     - (b) Compile each numeral coercion's method without the analyzer's spawns (A's decision 10, the way not taken). This is the smallest change, in the code generator only, and it keeps P-176. A coercion's body is then sequential.
     - (c) Leave it to the switch-over's start-up work, as landed, with the workaround (bind the operands first) put in the skill and row 971's claim widened.
   - Recommended: (a), the fork's own default for when it is built, in the next batch that touches numerals, since the design's own example meets it.
2. **The prelude's `RR64` and `RR32` take no integer numeral, so `x: RR64 = 3` is refused compiled and binds `3.0` under walk (row 442).**
   - This is the most common numeral line of a float program.
   - P-37's exception exists "so that both paths treat a numeral alike" before the switch-over, and P-174 has "every number type" take a numeral through its coercion.
   - Options:
     - (a) Add `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])` to the prelude's `RR64` and `RR32` under P-37's exception, in the next batch that touches numerals, and restore `NumeralFoldFloats`'s `16777217`. The numeral half of row 442 then closes. It adds two declarations to the prelude, which only the exception allows: his to confirm that a natural-numeral coercion is "the numerals".
     - (b) Leave it to the switch-over, as landed and as the text says (`conversions-coercions.tex:91-93`; Appendix I's Effect).
   - Recommended: (a).
3. **His aim of 19:0x is met where both paths can show it today, but differences stand.**
   - Section 2 gives them: 958, 962, 963, 966, 967 and 446 from climb batch 29; 974 new; 442 and 971 above; 973, his already.
   - PLAN's item 76 (review-queue item 449) asks when to repair climb batch 29's list. It still stands, re-scoped.
   - Options:
     - (a) One small numerals batch next: findings 1 and 2, row 974, rows 963, 967 and 958, and Q1 with row 966 if he answers item 77 first. Each can be tested on both paths today.
     - (b) All with the names batch.
     - (c) Each at its row.
   - Recommended: (a), before the remaining built-in functions, since findings 1 and 2 meet every program that uses the design.

**Already his, on his list, with nothing new here but one kin:** Q1, item 77 (rows 973 and 966). The landed answer stands until his word. Review.2's `h = 0.5` for `QQ` is its kin under walk. The compiled `true` flips at the switch-over.

**Corrections, reasons in the record that the landing made false** (home: the record-landing workflow, by `record.py` and `ledger.py`; each is in Part 4):
- A. POSITIONS (his text; the record writer under his rule of 2026-10-31, named to him):
  - P-173's "or is a numeral type" (the record's own item);
  - P-174's last sentence and P-176's last sentence, which name rows 969 and 970, now closed; P-176's departures are now rows 957 (second case) and 971;
  - **P-76**: "the name that the compiler's prelude and the interpreter's library give the type" is false now that neither gives `IntLiteral`;
  - **P-172**: "as the compiler's prelude declares its `FloatLiteral` (`LibraryBuiltin/CompilerBuiltin.fss:996`)" names a type that is gone, and "which holds the numeral's exact value" reads as the field numerals, where P-174 puts the value in static parameters;
  - P-165's citation `numbers.tex:56-73`, now `:58-75`, and P-171's `constant.tex:118-122`, now `:129-133` (T's record).
  - Neither P-76 nor P-172 is on the gather's or the review's list.
- B. FACTS:
  - **F-180**'s example `CompilerBuiltin$IntLiteral`, a class now deleted;
  - review.3's 58 citations in 26 entries (`PLAN.md:762`);
  - F-118's sentence on the bit-length default stands as fact, but its reach is unmeasured (section 1, way 3).
- C. The ledger:
  - row 971's note and wider claim (finding 1);
  - **row 960's reproducer**, `XXXRadixPointLeadingZerosWalk.fss`, which reads the deleted getters and so cannot tell the row's repair. It owes a new reproducer: a program coercion over `RadixPointNumeral[\n, m, r, v\]` that returns `n` for `00.5`, asserting 3;
  - row 442's note (finding 2).
- D. PLAN, the review queue, the maps and the skills: Part 4 and Part 3.

**Corrections of an entry's ground that change no decision, for the entries' histories:**
- F-240's distance figure, 190 s, was taken beside `testFast` from its start (section 4).
- The Fable review of the record (`climb-batch-29b-review.md`, section 1) says that `Numerals.object` is gone. The patch left it.

**Confirmations:**
- The count's table equals climb batch 29's; the distance reads 0 with no crash.
- microGPT's quick pair: 7 of 7 on both programs. The 52 demos reached their end on the merged tree.
- `ledger.py landing-check` and `record.py check`: no finding, 0 failures.
- The suites: 2,341 fast, 822 walk, 130 specification examples, 0 failures; 42 of 42 atomic runs.
- The prelude's diff changes only numeral declarations and the bodies listed in Part 4 (no other declaration added; P-37).
- Every commit since the base ends with the plain footer and names no model. Each of the three outside `explorations/` carries a `historical:` line.

## Part 2. Did the practice hold

### The skeptics' fixes

From `RECORD.md`, "Each rung", and the review's `fixesChecked`: 7 commits, 2 of them defects, none contested.
- A: `0923b029e0` (the join range refusal), a **defect**; `b7de2fece9`, `403c849b8d`, `0ca6f3feb7` and `7d13b8a378`, corrections.
- T: `05b264bf5c` (two Effect sentences too wide), a **defect**; `b7a8a42492`, a correction.

Each code test failed first through the harness, by skeptic A's reading of A's transcript:
- the unit test, 'BUILD FAILED', since its class did not exist;
- `NumeralAcrossComponent`, 'NoClassDefFoundError: NumeralAcrossComponentApi$v';
- `NumeralMinusOnceCompiled`, 'Tests run: 4, Failures: 2'.

T edits prose only.

### The merged-diff review

- **Approved**, with nothing blocking and no repair round.
- It found what the gather missed: eight FACTS entries false of the merged tree, `h = 0.5` under walk (review.2), the field numerals' code in walk (review.1), the stale citations (review.3), and two tests to split or add.
- It did not name:
  - row 960's vacuous reproducer;
  - the class comment of `Numerals` and the live-but-inert calls (section 1, items 2 to 5);
  - row 442 as a two-path difference;
  - row 971's weight;
  - P-76, P-172 and F-180.
- It wrote nothing outside `explorations/`.

### Builds and runs, repeated or not

Section 9, point 2.

### Refusals by the harness and the tools

- One built-in safety refusal: skeptic A's `rm -rf *` in its scratch folder.
- No schema refusal (climb batch 29's process finding 7, held). No `sleep` refused.
- Two `ledger.py note` refusals by size in the gather (rows 694 and 581). It rewrote both rows instead.
- 22 error results in all: 11 a `wait_for` cap of 240 s, the 3 above, and the rest a probe or a `grep` failing as its caller expected.

### The commit stage's fold of FACTS

It changed F-53's title to climb batch 29b's and kept its totals. It wrote F-240's figures: the count stage about 105 s by file times, and the distance 190 s (117 s) at a start load of 0.26, against climb batch 29's 224 s (141 s) at 0.07.

### The practice's measures, batches 26 to 29b

(B26; B27; B28; B29; B29b.)
- Written: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M.
- Launches lost to restarts or the disk: 0; 8 and a gate, 0.42M; 0; 0; 0.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M.
- First calls: 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold; 1.12M, 10 cold; 0.63M, 8 cold.
- Cache refills: 1, 94K; 0; 1, 204K; 0; 0.
- Refusal cycles: 0; 3 rungs, 231K; 1 rung, 164K; 2 rungs, 314K; 0.
- Rulings and repairs on the merged tree: 0; 368K; 0; 415K; 0.
- Skeptic fix commits (defects): 2 (0); 9 (1); 16 (1); 25 (10); 7 (2).
- Distance: 0 every time; 374 of 402 helper bindings at B29 and B29b.
- Count stage at the gate: 180 s; 80 s; 99 s; 125 s; 104 s.
- Distance stage at the gate: 246 s; 144 s; 205 s at load 3.42; 224 s at 0.07 beside `testFast`; 190 s at 0.26 beside `testFast`.
- Skill's load: 13.9 %; 16.0 %; 16.5 %; 12.9 %; 10.6 %.
- Briefing, estimated: 5.2 %; 6.2 %; 3.1 %; about 3.6 %; 2.7 %.
- microGPT quick pair: 7 of 7 both, each time.

### Climb batch 29's findings, a batch later

1. Repair 3 outside POSITIONS: **taken up**. P-174 holds the sign rule, and fork C6's departure is closed (rows 961, 968).
2. A fork that one rung cannot build alone: **taken up**. One code rung carried the whole state.
3. Briefing keys on removed lines: **held**; no key failed.
4. The specification built again by the commit stage: **held**.
5. The review's programs beside the gate's timed stages: **held**, with a private caches folder. The gate's machine block still gives only the start load: **not taken up**.
6. Sibling worktrees read: **held, mostly**; one call by skeptic T.
7. The skeptic's fix kinds: **held**.
8. Suites on superseded states: **held**; each suite ran once per agent, on its final state.
9. The demos split between rung and gather: **not taken up**; A and the gather both ran them.
10. A batch rule against a rung's test list: not met.
11. The revival page's stage: **held**. Climb batch 29's landing published it (`f6f60eeb51`).
12. Climb batch 28's 10 (`spend.py`'s header names no landing folder) and 11 (`File`, `Reader`, `System` outside the distance): not taken up.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **A worker's workaround of a widened defect, and the fix it did not take, reached no one.** Rung A met row 971 in the patch's own test, changed the test to bind its operands, named a fix it did not take, and called the reach widened. The skeptic added an `XXX` pair, and the gather and the review routed nothing, since the row was "left by fork A6". Proposed (mine): the rung's points to report ask for "each test changed to work around a defect, with its row, and each fix named and not taken", and the gather routes each as an item for him when it bears on a fork's premise. Home: the manual's "Preparing a batch record"; the gather's brief.
2. **A probe's claims taken as built.** The probe's report said that `Numerals.object` was gone, and the Fable review repeated it in its fidelity verdict. Proposed (mine): a review that cites a probe's "gone" or "deleted" checks it against the patch's `-` lines. Home: the Fable review's brief (`references/batch.md`, "The go").
3. **With one code rung, the skeptic's last suite, the gather's batch tests and the gate run one code state.** Proposed (mine): where one code rung lands and its skeptic's tree is the merged code, the gather cites the skeptic's runs for the batch's tests and keeps only its build, the specification and the demos; and the rung's section says that the demos and the microGPT checks are the gather's and the commit stage's (climb batch 29's finding 9 again). Home: the manual's "Gather" and "Rung worker".
4. **A row rewritten without its reproducer.** Row 960's rewrite kept a test that reads the deleted getters. Proposed (mine): `landing-check` flags an `XXX` reproducer of an open row that names a declaration the batch deleted, or the rung that rewrites a row reads its reproducer. Home: `tools/ledger.py`; the gather's brief.
5. **P-37's exception read narrowly, and no one checked the prelude type by type.** The record asked for an integer numeral at `RR32`, and the worker changed the value. Proposed (mine): the planner lists each number type of the prelude with its two numeral coercions before the launch, and a changed test value goes on the review list. Home: the manual's "Preparing a batch record".
6. **The estimate.** 4.2M and 6 h 30 against 3.25M and 3 h 55. A wrote 0.72M against 1.1M, and no judge or repair ran against 0.5M. Proposed (mine): for one code rung that starts from a measured patch, take climb batch 29's per-rung figures, not more. Home: the planner's cost section.
7. **The coordinator ran JVM programs during the run** (21:34 to 21:37, its own worktree). No timed stage ran then. Proposed (mine): the coordinator's own runs wait for a quiet moment, as its agents' do. Home: the `coordinator` skill.
8. **Carried over:** climb batch 29's finding 5 (the gate's load at a stage's end), and climb batch 28's findings 10 and 11.

### Misses, by kind

Numbered on from `batch-29-review.md`'s 1031.

Found inside the batch:
- **The planner's or the probe's text wrong, caught before landing:**
  - 1032, fork A6's premise, no reproducer outside the numerals (split 1);
  - 1033, fork A1's read through `GraphRepository.getComponent` (split 3);
  - 1034, fork A1's fold operators (split 3);
  - 1035, step 2's `16777217` at `RR32` (split 2);
  - 1036, `Numerals.object` "gone" in the probe's report and the Fable review (split 6).
- **A defect of the patch or of a change, caught before landing:**
  - 1037, the patch's `NN64` coercion overflow (A);
  - 1038, the static initializer's source order (A's own build);
  - 1039, the unit test in empty caches (A);
  - 1040, the range refusal in a join (skeptic A);
  - 1041, two Effect sentences too wide (skeptic T).
- **A defect of the merged tree, caught at the gather or the review:**
  - 1042, walk loading a written numeral type (gather.2, row 974);
  - 1043, `h = 0.5` under walk (review.2, row 973);
  - 1044, eleven rows' messages and rows 581 and 694 no longer reproducing (the gather);
  - 1045, row 80's deleted reproducer (the landing check).
- **A test that reached too little:** 1046, `XXXNumeralTypeWrittenWalk` holds two forms (review-routed.1); 1047, row 973's `QQ` case without a test (review-routed.2).
- **Sentences made wrong, caught:** 1048, eight FACTS entries (the review); review.3's 58 citations.
- **Process:**
  - 1049, three runs on one code state, and the demos and microGPT twice (section 9, point 2);
  - 1050, one safety refusal;
  - 1051, `sources.md` read in 4 calls.

Found by this review:
- 1052, row 960's reproducer reads the deleted getters;
- 1053, walk's field-numeral code beyond review.1: the class comment, `withNumeralObjects` live at each call with a numeral argument, and `FOrdinaryObject.seqv`'s numeral case live at every `SEQV`;
- 1054, row 442 as a two-path difference under P-37's exception, on no list;
- 1055, row 971's widened reach not routed, and P-174's interval example by reading (with the coordinator's measurement after the landing);
- 1056, P-76 and P-172 made false, on no list;
- 1057, F-180's example names a deleted class;
- 1058, PLAN's item 76 now partly answered, and its lines 72 to 74 and item 75 answered, on no list of the run's;
- 1059, nine lines of the prelude respelled, five of them the team's at `a874948ac`, not listed for his sight (item 444's default; Part 4);
- 1060, the compiled bit-length fallback, unplanned and unmeasured, and `CodeGen.java:6482`'s stale comment.

**Against the earlier notes.** 20 misses were found inside the batch (1032 to 1051), against climb batch 29's 29, for two rungs against six. No departure from a decision of his landed. Two premises of the record failed in ways that bear on his decisions (findings 1 and 2), and neither reached him.

## Part 3. For the skill writer

The sentences of the skills that the batch made false or incomplete, read on `main` at `a2be3e9e1d`. The proposed wording is mine; the writer keeps the skill's form.

**False, on the batch record's list (section 6, "For the skill writer") and the gather's:**
1. **`SKILL.md:133`**, "a `nat` or `int` parameter used as a value is a `ZZ32`". Ground: P-40, P-174. Proposed: add "and a numeral coercion's four numbers, read in its body, are `ZZ` values".
2. **`references/revival-changes.md:89`**, "A numeral converts where it stands":
   - "Both lie below `Numeral` ... and hold the numeral's exact value";
   - "Until the switch-over, the compiler's prelude names them `IntLiteral` and `FloatLiteral`";
   - "A place fixes a type when its declared type is a numeral type, or";
   - "`(h = 0.5)` is `true` for `h: QQ = 1/2`" (the review's addition; row 973);
   - "A `nat` or `int` parameter used as a value is a `ZZ32`".
   Ground: P-174, P-176, P-37, P-173; rows 973, 442.
3. **`revival-changes.md:91`**: the getters `digits`, `fractionDigits`, `radix` and `digitValue`, `coerce(x: NaturalNumeral)`, and "a compiled program writes `coerce(x: IntLiteral)`". Ground: P-174. Proposed: "`coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])`, whose body reads `n`, `r` and `v` as `ZZ` values, on both paths".
4. **`revival-changes.md:99`**, "and the two numeral types, declares its own `asFloat`". Ground: P-165.
5. **`references/interpreter.md:21`** (the `digits` getter), **`:23`** ("Write `NOT (u = 0)`", since `u = 0` is `false` too; row 973), and **`:25`** (the sign; row 968 is closed).
6. **`references/compiler.md:65`** (once for each place "except at a generic type"), **`:108`** (row 957, now only a type variable at the place), **`:109`** (row 961, closed), and **`:111`** (`IntLiteral` at a `typecase` selector, now `NaturalNumeral[\…\]`; row 963).

**Incomplete, on no list:**
7. **`compiler.md`, "Traps of the compiled path", has no line for row 971.** A numeral coercion whose body puts two calls of the program's own functions in one operator or one argument list fails its class's load. Bind them to locals first. Ground: row 971 as rewritten (Part 4).
8. **`compiler.md` has no line for row 442's numeral half.** An integer numeral at `RR64` or `RR32` is refused on the compiled path until the switch-over: write `3.0`. Ground: row 442; `conversions-coercions.tex:91-93`. If he takes finding 2's option (a), this item is moot.

**Sentences that hold, met by the batch:**
- `committing.md`'s footer: held on every commit.
- `compiler.md:183`, "about 80 to 180 seconds" for the count: 104 s at the gate, 108 s to 116 s in the batch's runs.
- `gate.md:3`, "in about 25 minutes": about 23.
- `session.md`'s wait cap of 240 s: held; 11 caps hit.
- `library.md:23`, "`ZZ32` and numerals convert into `RR64` implicitly": true of the one library.

## Part 4. Routing

Checked against `main` at `a2be3e9e1d` (the tree at `9fb5ab231f`): the gather's PLAN entries (`17e93a7da8`), the review's (`eb8a592455`), the review queue, POSITIONS, INDEX and the ledger. The push is done, so the hashes are final. POSITIONS, the review queue and INDEX are unchanged since the base. FACTS and PLAN changed: the commit, the gather and the review (`git diff --stat`).

**Step by step** (the manual, "After the landing: the coordinator's routing"):
1. The landing report: owed now.
2. The routing: owed; the list below.
3. FACTS: the commit stage folded F-53 and F-240, and the gather and the review the rest. Owed: correction B.
4. The skills: the record-landing workflow's skill update, with Part 3 and `RECORD.md`'s "Revival changes, for the skill writer" (A and T). Then the orientation update on F-347 and the rewritten entries: F-53, F-57, F-79, F-112, F-118, F-168, F-169, F-173, F-175, F-240, F-262, F-272, F-340, F-341, F-342, F-345, F-346.
5. The next batch, after step 4.
6. This review: committed by the coordinator as `explorations/reviews/batch-29b-review.md`, with its INDEX line.

### The list for the record-landing workflow, one line each with its home

**The row 971 finding of after the landing, as the coordinator asked:**
- **Row 971, a note and a wider claim** (`ledger.py note 971`, or `rewrite` if the note does not fit):
  - The trigger is not limited to `||`. Any operator whose operands are two calls of the program's own functions, or any call whose argument list holds two, is spawned by the parallelism analyzer (`compiler/codegen/ParallelismAnalyzer.java:44`, `:158-212`). The one method per numeral coercion (fork A2) keeps those spawns, where the probe's inlined copy did not.
  - On the landed code, `w: ZZ32 = small(n) - small(m)` in a program's numeral coercion fails its class's load, 'ClassCastException: class java.lang.Thread cannot be cast to class com.sun.fortress.runtimeSystem.FortressTaskRunner', at 1 and at 4 threads, where the probe's patch passed the same program.
  - The workaround stands: bind the operands first (`063495022b`; `9fb5ab231f`).
  - By reading, P-174's own example `Interval(roundDown(v, r, m), roundUp(v, r, m))` meets it on the compiled path.
- **Its weight for P-176's "filled when the class loads":** on the landed code that clause holds only for coercion bodies with at most one such call in each operator and argument list. Fork A6's reason for waiting no longer holds. It goes to him as finding 1, with a PLAN line under "His answers needed before the next batch". Its fix is fork A6's default, the pool before the classes load (`MainWrapper.java:61-64`), or A's decision 10's way.

**The gather's and the review's items, all in PLAN:**
- A.worker.1, A.skeptic.1, T.worker.1, T.skeptic.1 and review.2 (Q1; rows 973, 966): item 77 (`PLAN.md:146`). It needs a review-queue entry, as item 75 has item 448, and its place in `PLAN.md:89`'s list.
- T.worker.2 and T.skeptic.2 (the hierarchy): `:757`. T.skeptic.3 (the dates): `:758`.
- gather.1 (row 581): `:756`. gather.2 (row 974): `:759`. gather.3 (row 694): `:760`.
- review.1 (walk's leftovers): `:761`. It should also name the class comment of `Numerals` (`:46-57`) and that `withNumeralObjects` and `FOrdinaryObject.seqv`'s numeral case run on every call and every `SEQV` (finding 1053).
- review.3 (58 citations): `:762`.
- review-routed.1 and review-routed.2: `:763`, `:764`.

**Rows the batch filed or rewrote, open:**
- 973: item 77. 974: `:759`, `:763`.
- 957 (second case): review-queue items 449 and 450, reworded.
- 971: above, and a new PLAN line.
- **960: a note.** Its reproducer `XXXRadixPointLeadingZerosWalk.fss` reads the deleted getters and cannot show the repair. A new reproducer is owed, for the next batch that edits walk's numerals or the parser's float text: a program coercion over `RadixPointNumeral[\n, m, r, v\]` returning `n` for `00.5`, asserting 3.
- **442: a note.** Its numeral half (an integer numeral at `RR64` or `RR32`) is now a two-path difference under P-37's exception, and `NumeralFoldFloats` writes `16777217.0` for it. Finding 2.
- 962 (CONTESTED, no default), 963 (item 462), 966 (item 470), 513, 581 (gather.1), 694 (gather.3): as filed.
- 82, 314, 316, 514, 652, 691, 769 and 959: messages only, no routing.

**Rows closed** (8, by `c6ef2f0b80`): each PLAN mention goes to `PLAN-history.md`. Among them is item 75 (`PLAN.md:138`, fork C6, rows 961 and 968), now answered by the sign rule.

**Record defaults the batch took, each to a review-queue entry** (`review-queue.md` holds none of this batch's forks):
- Forks A1 to A8 and T1 to T3 (`CLIMB-BATCH-29b.md`, section 3), default as landed, with the departures named: A1 read from the analyzed cache and with the operator's declaration; A5 and A6 not built; A8 with none left.
- The three readings the record put on his list: fork A3, the range refusal as the checker's constraint, and question 3's path.
- Split 2's P-37 reading and split 5's walk default by Java.
- **The team's lines this batch changed, for his sight** (item 444's default):
  - the twelve tests of `compiler_tests/` that the record lists;
  - nine lines of the prelude that the patch respelled: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:558`, `:561`, `:562`, `:566`, `:567`, where `(1).asZZ` and `(0).asZZ` became `jMakeZZfromZZ32(1)` and `jMakeZZfromZZ32(0)` (the team's at `a874948ac:536-545`); and `:746`, `:748`, `:811`, `:813`, where `ZZ32`'s and `NN32`'s `floorAverage` and `ceilingAverage` bind `one` first.
  - A reported "Team test lines changed beyond the probe's list: none". That holds for tests, not for the prelude.

**The review queue:**
- 448: decided, now built (rows 961 and 968 closed).
- 449: rows 961 and 968 are closed and 957 is narrowed; the rest is finding 3.
- 450: now the per-instance place of row 957's second case.
- 462: the selector keeps `NaturalNumeral[\…\]`, not `IntLiteral`.
- 470: beside item 77.
- 473: `Literal[\v\]` not built (fork A4, T's text).
- 477: `Numeral` below `Number`; the getters half answered by P-174.
- 444: the lines above.

**PLAN lines the batch built or made stale:**
- "Where we stand" (`PLAN.md:9-12`): climb batch 29b's gate as the last landed (`a2be3e9e1d`), and "Landed" and "Next".
- Phase 4 has no line for climb batch 29b: one line, landed at `a2be3e9e1d`, with this review.
- Lines 72 to 74, forks F5, F6 and F7 of climb batch 29: answered by rung A (the compiled four numbers are built; no pairs; a numeral at `QQ` folds as at every number type once the prelude has `QQ`, and no numeral value exists to compare). To history.
- Line 75, fork N11: stands (walk's glue classes stay).
- Item 75: answered. Item 76: re-scoped to finding 3.
- **New lines owed:**
  - the compiled fold of the one library's own coercions, checked when the compiled path first reads them, `AnyIntegral`'s `do` block among them (fork A1; the record's "Left out");
  - row 971 and fork A6, with finding 1's weight;
  - finding 2's prelude coercions, if he takes option (a).

**POSITIONS** (his text; the record writer under his rule of 2026-10-31, named to him): P-173's "or is a numeral type"; P-174's and P-176's row sentences; P-76; P-172; P-165's and P-171's citations (correction A); P-37 only on his word (finding 2).

**FACTS:** correction B.

**The maps:** `explorations/coordinator/map/spec-to-implementation.md:166`, `:288`, `:378`, `:382` and `:414` name the prelude's `IntLiteral` and `FloatLiteral`. `map/dormant-code.md:350`, `:483` and `:357` cite moved lines (T's record).

**The skill sentences:** Part 3, through the record-landing workflow's skill update.

**The manual and the script:** process findings 1 to 8, between batches; findings 1, 3 and 4 first.

### The steps due before the next batch

1. **His answers to findings 1, 2 and 3, and to item 77**, since all four bear on what the next batch holds.
2. **The record-landing workflow** (`tools/record-landing/README.md`; `args: { batch: '29b', base: 'b5b0f82c13', landing: 'a2be3e9e1d' }`). It routes the list above, lands, pushes, and runs the orientation update and the skill update.
3. **FACTS and POSITIONS:** corrections A and B.
4. **The script, between batches:** process findings 1 to 8.
5. **The next batch:** by finding 3's option (a) if he takes it; else by PLAN's phase 4.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no file of the tree and committed nothing.
- I read the run's transcripts through scripts (`batch-measures.py`, `skill-load.py`, `spend.py`, and the scratch scripts of the header), the run's journal, and the coordinating session's transcript for the launch's time and its own writes by model. For the preparation I read only the transcripts' labels, times, models and writes, and the commits.
- I ran `record.py check --base b5b0f82c13`, `ledger.py check`, `ledger.py landing-check b5b0f82c139f07f5bc8f57903dbae6f471941655`, `facts-extract.sh`, `grep`, `sed`, `diff`, `df` and `git`, which write nothing.
- These are by reading, not run:
  - P-174's interval example failing compiled (finding 1);
  - walk's one object at row 957's second case (section 2, item 3);
  - the vacuity of `XXXRadixPointLeadingZerosWalk` (section 1, item 6);
  - which numerals reach the compiled bit-length fallback (section 1, way 3).
- The row 971 measurement of after the landing is the coordinator's run, not mine.
- I did not write the review's INDEX line, which the coordinator owes with its commit.

## For the curator

Climb batch 29b ran on 9 November and was pushed at 00:38 UTC on 10 November. Both tasks landed.
- A numeral's type now exists only when the program is compiled. It is `NaturalNumeral` or `RadixPointNumeral`, with its four numbers as static parameters, as the Working Draft gives it. When the program runs, no numeral value exists.
- Every number type, the library's and yours, takes a numeral through a coercion that is generic over the four numbers. The compiler works out that coercion's body when it compiles the program. A plain `ZZ32` or `RR64` numeral becomes a constant in the class file. Any other value is made once for each place, when the class loads. `-3` at your own type is your type's minus applied to the coercion of `3`.
- The interpreter does the same thing at the first run of each place.
- The run-time numeral objects of batch 29, with their getters and `=` pairs, are gone from all behaviour, and so are the compiled path's old literal classes. The specification states the new design.
- All tests passed, the 52 team demos ran to their end, the quick microGPT check passed 7 of 7 on both programs, and the checker count and the distance stay at 0.

Your aim, that your design is built in both the interpreter and the compiled path, is met for every case of your design's own tests. Some differences remain:
- Some leftover code of the old objects stays in the interpreter. It is dead or has no effect.
- One old test still asks for the deleted getters.

Three points need your word:
- **A compiled coercion can fail when its class loads.** On the compiled path, a coercion whose body calls two of your program's functions in one expression fails before the program starts. An example is `small(n) - small(m)`, and by reading your interval example too. The interpreter runs these. The batch's record expected no such case. I recommend that the compiled runtime start its task pool before it loads the program's classes, as the original team's comment intends.
- **`x: RR64 = 3` answers differently on the two paths.** The compiler's temporary library gives `RR64` and `RR32` no coercion from a whole-number numeral, so the compiler refuses that line and the interpreter accepts it. Your exception to P-37 lets that library carry the numerals so that both paths agree. I recommend that the two coercions be added now.
- **When to repair the other differences.** Some date from batch 29 and some are new, each recorded as a gap. I recommend one small numerals batch next, with the two points above.

Your question on `u = 0` for a zero `NN32` is still open. The interpreter answers false and the compiler answers true.

The run wrote 3.25 million tokens in 3 h 55 min, against the plan's 4.2 million and 6 h 30 min. The landing work of batch 29 wrote 6.6 million. The span before this run wrote 5.5 million that the count can see. Four fifths of that was the post-mortem of batch 29's numeral design, the probe among it, and the coordinating session wrote 1.2 million more of its own, 0.7 million of it on Fable. The batch's own preparation wrote 0.9 million.