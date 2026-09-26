# Rung Z (sizes at run time): the judge's ruling on the first refusal

Climb batch 5, 2026-09-26. The rung's head is 57dac1278, and the skeptic's probes are 2492fca0b on
`wip/rung-size-runtime`. The judge read the net diff against 6030e4b36, the worker's structured
result, the skeptic's structured verdict and the passages below. The judge ran no build and no test.

## Decision: repair

The skeptic is right on its refusal ground. Two defects measured in this rung have no home, and the
brief's three-homes rule requires one for every defect that anyone in the rung measures. Both defects
lie in the rung's own value-position piece, or in the site that piece depends on. The specification
settles both, and both are small enough to repair here. So the repair round repairs both (home 1),
gates each with assertions, and corrects the report and the record to state what then holds.

## What the specification settles

- `Specification/basic/trait-parameters.tex:82-90` (read :68-100) says a nat parameter "may be used
  to instantiate other nat parameters, or to appear in any context that a variable of type ℕ32 can
  appear". A `for` body, a comprehension body and a `fn` body are all such contexts, so a size read,
  captured or used to instantiate there must behave as it does outside them. This settles F1 against
  the compiled run. It is rule 4's first outcome: repair.
- `Specification/basic/expressions/literals.tex:83-85` gives a numeral of digits the value `v`, read
  in radix ten, with nothing bounding it. The same sentence instantiates a nat parameter with that
  unbounded value: `NaturalNumeral⟦n,10,v⟧`. `trait-parameters.tex:84-85` names ℕ32 as the context in
  which a size appears. The committed prose never states the range of a size's value. The interpreter
  library's NN32 is unsigned 32-bit, so 3000000000 is an ℕ32 value on any reading. F2 is therefore
  settled against the compiled run whatever the range question's answer is.

**Decision under a silent specification** (reported to Pavol). The question is what a size read in
value position yields when its value is at or above 2^63.

- The worker's decision 5 types the read as `IntLiteral`, following the checker (`KindEnv.scala:64-70`).
- An `IntLiteral` carries a numeral of any size. `CodeGen.forIntLiteralExpr` (`CodeGen.java:3875-3910`)
  has an int branch, a long branch and a String branch for that reason.
- Type position already accepts a size of any magnitude, because `RTTIsize` is keyed on the text
  (`RTTIsize.java:24-33`).

The ruling is that value position reads back exactly the numeral the size was instantiated with, at
any magnitude, by the same three branches, chosen at load time. Two alternatives were rejected:

- The skeptic's `()J` with `make(long)`. It repairs 3000000000, but a size at or above 2^63 would
  still die at load while type position accepts it.
- A static refusal of a size outside ℕ32 or ℤ32. That is a checker rule without a specification
  sentence behind it, and it contradicts `literals.tex:83-84`'s own use of an unbounded nat.

## Which claims were right

### The skeptic

- **F1 is right**, and the evidence was checked. `CodeGen.forFnExpr` makes a closure generic over
  `fvt.freeVarTypes(x)` only (`CodeGen.java:3449`, `:3469-3475`), and `FreeVarTypes` collects `VarType`
  nodes only (`FreeVarTypes.java:98-100`). The captures show this: `probes/skeptic/differential-3.txt`
  has ZsVLa, ZsVLc and ZsVLe failing with `NoClassDefFoundError: CONST`, ZsVLf failing with
  `NoSuchMethodError <init>(Box⟦3⟧)` and ZsVLg failing with `NoClassDefFoundError: k$RTTIc`. The type
  twins ZsVLfT and ZsVLgT run, and walk runs all five at both thread counts.
- **F1 is the eighth site** of the "static arguments are types only" defect. The worker's precedent
  count of seven (six throwing sites plus `isSymbolic`) missed it.
- **F2 is right.** `CodeGen.java:6004` emits `CONST.Nat` as `()I`, and `MethodInstantiater.java:224-227`
  calls `Integer.parseInt`. `probes/skeptic/differential-1.txt:2-34` shows `NumberFormatException:
  For input string: "3000000000"` at both thread counts. `FIntLiteral.make(long)` and `make(String)`
  exist (`FIntLiteral.java:44`, `:48`).
- **The precedent was copied in part.** The worker cited forIntLiteralExpr's int branch
  (`CodeGen.java:3886-3890`), and the method has three branches (`:3875-3910`). That is the rule-2
  miss the skeptic names.
- **F3 is right, and it is not the rung's defect.**
  - `InstantiatingClassloader.loadClass` adds the name to `history` before it defines the class
    (`InstantiatingClassloader.java:204`).
  - A second thread then gets `findLoadedClass`'s null (`:182-186`).
  - `RTHelpers.loadClosureClass` calls `newInstance` on that null (`RTHelpers.java:133-138`).
  - The type-generic twin fails the same way (`probes/skeptic/threads-repeat.txt`), and the
    literal-leaf control is right 5 of 5 (`threads-repeat-lit.txt`), so the rung's table holds.
  - The skeptic is also right that no gated XXX test can hold F3. The gate runs at
    `FORTRESS_THREADS=1` (`explorations/experiment/env.sh:6`), and the harness gives a test no
    environment of its own; it sets only `FORTRESS_HOME` (`FileTests.java:493-495`, `:617-619`). An
    XXX test would pass at one thread and turn the suite red (`FileTests.java:922`, `:577`, `:644`).
- **F4 is right as home 3.** `Specification/basic/operators/juxtameaning.tex:102-105` mentions String
  only to state a static error and says nothing of spacing. The difference is between two library
  bodies: `CompilerBuiltin.fss:406` and `FortressLibrary.fss:4062`.
- **F5 is right.** Walk's check is `EvalType.java:251-256`, and it prints `-1294967296` for
  3000000000.
- **F6** is a note on row 21. **The overclaims in the record** (item 12 of the verdict) are real:
  "loads, dispatches and runs compiled" and "value-position size compile and run" hold only outside
  closures and below 2^31.
- **Everything else the skeptic confirmed** stands as confirmed: the provenance block, the recorded
  failures, the gated verdicts, the checker count of 125, and the absence of any stop.

### The worker

- **Everything checked holds.** The pieces it landed do what it says; the diff was read line by line
  against its list. Decisions 1 to 10 are reasoned and stand.
- **The stop the worker flagged for the gather is not met.** The stop names a checker rule that
  accepts a program rung S's text refuses. D4's program (`object O[\nat n\] extends { Vec[\n\],
  Vec[\3\] }`) is accepted by the base checker, not by a rule this rung adds, and its type twin is
  accepted too (`probes/differential.txt:622-654`, `:730-756`). The narrowed `cP` case
  (`TypeAnalyzer.scala:463`) adds no acceptance, as the skeptic confirmed with ZsDupSize and
  ZsExclAncBad. D4's home 2 (XXXNatExtendsTwice) is the right home.
- **Wrong:** the precedent count of seven sites (FreeVarTypes is the eighth); the citation of one of
  forIntLiteralExpr's three branches as the precedent; the FACTS entry's and row 307's claims
  without the closure and magnitude limits; and the entry's "Open:" list, which lacks F3 and F5.

## Where the repairs belong (rule 1) and their precedents (rule 2)

- **F2 belongs at load.** The size is not known until the loader substitutes it, so the width must be
  chosen where the text is known. That is `MethodInstantiater.visitMethodInsn`'s `CONST` operation
  (`MethodInstantiater.java:211-231`). Codegen then emits one call typed as returning the IntLiteral
  (`CodeGen.java:5998-6010`). The precedent is the three branches of `CodeGen.java:3875-3910`, moved to
  the one place where the value is known. Every instantiating writer computes max stack
  (`InstantiatingClassloader.java:400`, the only `Instantiater` construction at `:405`), so the
  loader may emit a two-slot constant where codegen counted one.
- **F1 belongs in `FreeVarTypes`.** That analysis decides which static parameters a closure is
  generic over, and `forFnExpr` needs no change once it answers correctly.
  - Precedents: `forVarType` (`FreeVarTypes.java:98-100`), and the rung's own turning of a size symbol
    into a `VarType` for the dispatcher (`OverloadSet.java:1221-1224`).
  - A size read as a value is a `VarRef`, not an `IntRef`. `FreeVarTypes` has no scope, and an
    unannotated local such as `q = 9` is also typed `IntLiteral` (ZsFieldLit2). So the `VarRef` case
    must be gated on the name being a nat or int parameter of an enclosing declaration, or every
    closure that captures an IntLiteral local would become generic.
  - The loader distinguishes only operator kinds among static parameters (`Naming.java:94-109`,
    `InstantiatingClassloader.java:398`), so the `XL_TYPE` tag that `forFnExpr` gives each entry is
    harmless for a size.
  - The task path computes `fvts` and ignores it (`CodeGen.java:1633-1634`), so it is unaffected.
- **Blast radius.** The only nat-generic declaration in the compiled library is the empty
  `trait Matrix[\T, nat s0, nat s1\]` (`Library/CompilerLibrary.fss:638`), so no library closure
  changes shape. The repair worker confirms this.

## The homes after the repair round

- **F1:** home 1, asserted by a new `compiler_tests/NatRtClosure`. No new ledger row: the rung's
  capability never reached main, as with D1 and D2. It enters row 307's note.
- **F2:** home 1, asserted by a new `compiler_tests/NatRtBigSize`. No new row, for the same reason.
- **F3:** a ledger row, with the probes and captures already committed.
  - Not home 3's silence: the specification settles it. It gets a row because the gate's single
    thread leaves no gated form.
  - Not repaired here: it is the team's class loader, reached by every compiled program. A lock
    around `loadClass` must be shown free of class-initialisation deadlocks, which is its own rung.
  - This gap in the three-homes rule is reported to Pavol.
- **F4:** home 3, a row citing ZsJuxt; the gather first checks that no row already records it.
- **F5:** a row against the interpreter. Its home 2, an XXX walk test in `ProjectFortress/tests/`, is
  owed, and cannot be written in this batch because rung D owns that directory. It is carried like the
  worker's provisional row 413.
- **F6:** a note on row 21.
- **A size of 2^63 or more that fails before value position is reached** (a checker refusal, a crash
  or a type-position failure): if the repair round measures one, it gets home 2 (an XXX test citing
  `literals.tex:83-85`) and a row.

## Repair instructions

These are the numbered steps of the structured result, repeated here so the file stands alone.

1. Set up the shell as the shared prefix gives it, in `/home/user/fortress-size`.
   - `git log --oneline 6030e4b36..HEAD` must show this ruling's commit on top of 2492fca0b.
   - `ant compileAll`, then wipe `default_repository/caches/*` (including `nativewrapper_cache`), then
     rebuild the library cache in library order (five compiles).
   - Do not run `ant testFast` or `ant testSystem`.
2. Write the F1 test before any source edit:
   `ProjectFortress/compiler_tests/NatRtClosure.fss` and `.test` (`compile`, `link`, `run`,
   `run_out_contains=PASS`), one comment line pointing at REPORT.md.
   - Build its body from the skeptic's probes, which walk runs: ZsVLa (`SUM[i <- 0#k] i` gives 10 for
     `Box[\5\]`), ZsVLc (a `for` body reading `k`, 21), ZsVLe (`(fn () => k)()`, 3), ZsVLf (a `fn`
     capturing a `Box[\k\]`, 10) and ZsVLg (`Box[\k\]` built in a `for` body and typecased, three and
     four).
   - Add a closure nested in a closure that reads `k` (for example a `for` inside a `for`).
   - Add a method of an `object Holder[\nat k\]` whose loop body reads `k`.
   - Check each with the compiled library's `assert(x: ZZ32, y: ZZ32, failMsg: String)` or its String
     form (`Library/CompilerLibrary.fss:102-115`). Every message carries
     `trait-parameters.tex:82-90` and nothing else. Then `println "PASS"`.
3. Write the F2 test before any source edit:
   `ProjectFortress/compiler_tests/NatRtBigSize.fss` and `.test` (same form).
   - A size read as a value must equal the same numeral written as a value:
     - as ZZ64 for 2147483647, 2147483648, 3000000000, 4294967295 and 9223372036854775807;
     - as ZZ for 9223372036854775808 and 18446744073709551615 (ZZ from a numeral of that size works
       compiled: `IntLiteralWrapRepairR2.fss:30-38`).
   - Keep one type-position guard: `Box[\3000000000\]` taking its literal arm, the ZsBigNatType shape.
   - Messages carry `trait-parameters.tex:82-90` or `literals.tex:83-85`.
4. Run both new tests on the unchanged build, through the rung's driver (`run-subset.sh` with a subset
   file) or the skeptic's `probes/skeptic/sk-junit.sh`.
   - Capture the output to `explorations/compile-ladder/rung-size-runtime/probes/junit-before-closure.txt`
     and `junit-before-bigsize.txt`. They must fail as the skeptic's captures do.
   - If any 2^63-or-larger case fails before reaching value position, apply the fallback in the last
     bullet of "The homes after the repair round" now: move those cases into
     `XXXNatRtBigSize.fss/.test` and record them.
   - Commit and push.
5. **F2, the edit.**
   - In `ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java`, beside `:154-155`, add a
     constant for the IntLiteral class, `RT_VALUES_PKG + "FIntLiteral"`. This is what
     `NamingCzar.makeFortressInternal("IntLiteral")` yields (`NamingCzar.java:188`, `:407-408`).
   - In `CodeGen.forVarRef`'s size branch (`CodeGen.java:5998-6010`), emit one
     `INVOKESTATIC CONST.Nat⟦k⟧` with descriptor `"()" + NamingCzar.descFortressIntLiteral`, and drop
     the `make(int)` call. Correct the comment at `:6000-6001`.
   - In `MethodInstantiater.java:224-227`, parse the text between the oxfords as a `BigInteger` and
     emit `CodeGen.java:3875-3910`'s three branches against the new constant:
     - `bitLength() <= 31`: LDC Integer, then `make(I)`;
     - `<= 63`: LDC Long, then `make(J)`;
     - else: LDC String, then `make(Ljava/lang/String;)`.
6. **F1, the edit**, in `ProjectFortress/src/com/sun/fortress/compiler/codegen/FreeVarTypes.java`.
   - (a) Keep a stack of the nat and int static-parameter names of enclosing declarations. Override
     `forFnDecl` (`getHeader().getStaticParams()`), `forObjectDecl` and `forTraitDecl`
     (`getHeader().getStaticParams()`). Each pushes the names whose `getKind()` is `KindNat` or
     `KindInt` (the test `OverloadSet.java:1460-1461` uses), calls super, and pops in a `finally`.
   - (b) Add `forIntRef(IntRef i)` returning `set(NodeFactory.makeVarType(NodeUtil.getSpan(i),
     i.getName()))`. It is the twin of `forVarType` (`:98-100`) and of `OverloadSet.java:1224`.
   - (c) Add `forVarRef(VarRef v)`. It takes super's result, and when the id has no api name, the ref
     has no static arguments and the name is on the stack, it returns a copy made with `set()` plus
     that `VarType`. The comparator must stay `varTypeComparer`, which `recur` checks at `:83-85`.
   - Change nothing in `CodeGen.forFnExpr`.
7. Rebuild.
   - `ant compileAll`, wipe the caches, rebuild in library order.
   - `grep` the compiled library (`LibraryBuiltin/CompilerBuiltin.fss`, `Library/Compiler*.fss`) for
     nat and int static parameters. Record that only the empty `Matrix` trait (`CompilerLibrary.fss:638`)
     has any, so no library closure changes.
8. Record the passes.
   - NatRtClosure and NatRtBigSize pass: `probes/junit-after-closure.txt` and
     `junit-after-bigsize.txt`.
   - Re-run the skeptic's `probes/skeptic/sk-diff.sh` over ZsVLa ZsVLb ZsVLc ZsVLd ZsVLe ZsVLf
     ZsVLfT ZsVLg ZsVLgT ZsBigNat ZsBigNatType ZsValArith ZsValField ZsFieldLit2, and the rung's
     differential over NatRtClosure, at `FORTRESS_THREADS=1` and `4`. Capture to
     `probes/differential-repair.txt`, with the machine line (nproc, CPU model and MHz, load
     average, JDK, FORTRESS_THREADS).
   - Expected: compiled equals walk on every ZsVL* program and on NatRtClosure at both counts. ZsBigNat
     compiled prints both sizes; walk's failure there is F5.
   - Re-run `run-subset.sh` over the rung's full regression set (`probes/junit-repair.txt`): every
     verdict as in `probes/junit-final.txt`. Also re-run RTTIsizeJUTest (6 OK), `ladder-compare.sh`
     (85/85 unmoved), the checker count (125, crash none) and the natreflect run.
9. Re-measure row 400: SkDeadVal and DeadValWritten, as in `probes/row400-after.txt`, into
   `probes/row400-repair.txt`. The loader's `Nat` operation now parses a `BigInteger`, so the
   exception's text and line change. Update the row-400 note to the new shape.
10. The fallback. If a ZsVL shape or a NatRtClosure case still fails after step 6, for a cause outside
    `FreeVarTypes`:
    - move that case into `compiler_tests/XXXNatRtClosure.fss/.test`, asserting walk's answer and
      citing `trait-parameters.tex:82-90`, and open a ledger row naming the site;
    - show it red on a deliberate local fix, or say in the report why no fix was available to show it;
    - keep every passing case in the plain test.
    Do the same for NatRtBigSize. Anything else that fails is a regression to repair, not a new home.
11. F3 is not repaired. If NatRtClosure at `FORTRESS_THREADS=4` ever shows the loader race, record it
    under F3's row rather than weakening the test.
12. Correct the report content (the structured result's fields, or REPORT.md if the harness allows
    the write).
    - precedentSearch: name `FreeVarTypes.java:98-100` as the eighth "static arguments are types
      only" site, repaired, and `CodeGen.java:3875-3910`'s three branches as value position's
      precedent.
    - historical: add `FreeVarTypes.java`.
    - Add decisions:
      - (11) the three branches at load, taken under the silence on a size's range, with both
        rejected alternatives;
      - (12) `FreeVarTypes`' `VarRef` case gated by the enclosing-parameter stack, because an
        IntLiteral local is otherwise indistinguishable;
      - (13) the `XL_TYPE` tag kept for a size, the alternative being a separate size kind carried
        beside `fvts`.
    - defectHomes: F1 and F2 home 1 with their tests; F3, F4 and F5 rows; F6 a note on row 21.
    - Say that the three-homes rule has no gated home for a thread-count-only defect.
13. Correct the record lines.
    - The FACTS entry: a size is read as a value, captured, or used to instantiate, in a loop body,
      a comprehension or a `fn` expression as elsewhere (NatRtClosure), and reads back at any
      magnitude (NatRtBigSize). Add F3's and F5's rows to its "Open:" list.
    - Row 307's note: add the same two clauses and the two tests.
    - New rows, cells as the skeptic's `recommendedRows` give them:
      - F3, the closure-class loader race, found by rung Z's skeptic;
      - F5, walk reads a nat as signed 32-bit, home 2 owed in `tests/`;
      - F4, String juxtaposition spacing, home 3.
    - A note on row 21 for F6.
    - Keep every other record line as the worker wrote it.
14. Write REPORT.md and record.md under `explorations/compile-ladder/rung-size-runtime/`. If the
    harness refuses, say so and carry the full text in the structured result as before. The gather
    composes SKEPTIC.md from the skeptic's verdict; this JUDGE.md is already committed.
15. Run the shared prefix's tracked-path check over every `explorations/compile-ladder` path you cite,
    and fix every MISSING or UNTRACKED line. Commit the tests, sources and captures by explicit file
    list with the footer, and push to `wip/rung-size-runtime` only.

## For Pavol

1. **A decision under a silent specification: the value of a size of 2^63 or more.** The committed
   prose never states a size's range. `trait-parameters.tex:84-85` names ℕ32 as the context in which
   a size appears; `literals.tex:83-84` instantiates a nat parameter with a numeral's unbounded value.
   This ruling has value position read back exactly the numeral at any magnitude, by
   forIntLiteralExpr's three branches chosen at load. This matches the checker's `IntLiteral` typing
   and type position, which already accepts any magnitude. Rejected: `make(long)` only, which still
   fails at load at or above 2^63; and a static refusal outside ℕ32 or ℤ32, which has no sentence
   behind it.
2. **A gap in the three-homes rule.** F3, the class loader's first-load race, shows only at more than
   one thread. The gate runs at one, and the harness gives no test its own environment, so no gated
   test can hold it, as either an XXX test or a plain one. It lands as a ledger row with probes,
   although the specification settles it. A four-thread gate track, or a JUnit test that drives
   `InstantiatingClassloader` from two threads, would give such defects a gated home.
3. **One more 2012-tree file.** The F1 repair edits `compiler/codegen/FreeVarTypes.java`, which is not
   in the brief's file list. It is neither a stop file nor another rung's file.
