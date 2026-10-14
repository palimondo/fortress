<!-- The skeptic's review of fix.patch (the generated walker split into eight methods, with WalkerJUTest), by reading the patch and the code on main at 558ae0a10, rebuilding it in a worktree of its own, and timing one run of the count stage with row 680's repair on an idle machine. -->

# Skeptic's review: the generated walker split in order

## Verdict

**Approved.** No fixes, so there is no `fix-2.patch`.

- By reading, the split cannot change a result.
- The build regenerates the patch's file byte for byte.
- The test fails on main and passes with the fix.
- One idle run of the count stage, with the fix and row 680's repair, took **333 s**. Its whole output is identical to the idle run without the fix (959 s).

## 1. The results stay the same, by reading

- **The generated file only gains lines.** `git diff --numstat` on `FortressAst.scala` gives 37 lines added and 1 removed. The removed line is `def walk(node:Any):Any = {`. The added lines are:
  - `walk` delegating to `walkCases0`, at patched 1590-1591;
  - seven boundaries of 5 lines each, at 1653-1657, 1718-1722, 1783-1787, 1848-1852, 1913-1917, 1978-1982 and 2043-2047. Each boundary is `case _ => walkCases<k+1>(node)`, then the closing of one method and the opening of the next.
- **Every case keeps its pattern, its body and its place.** A diff made only of insertions cannot move or change a line.
  - The sizes are 30 class cases in each of `walkCases0` to `walkCases6`, and 3 in `walkCases7`, which is 213.
  - `walkCases7` then keeps `List`, `Option` and `case _ => node`, in their old order.
- **The generator** (`ScalaAstGenerator.java`, patched 625-670) builds the same `cases` list in the same order as before: `cList` reversed, ignored and abstract classes skipped.
  - The chunk loop never emits an empty method. When the count is a multiple of 30, the last full method gets the closing cases. With zero cases, `walkCases0` gets them.
  - The only `case _` before the last method is each method's own last case, which hands the value on to the next method.
- **No guards.** None of the 216 cases has an `if`.
- **Scala reads the patterns the same way in every method.** Each method has the same scope as the old `walk`, inside the same trait: `S*` stable identifiers and extractors at package level, and lower-case binders.
- **The order among class cases cannot matter at all.** I checked this with reflection over the built classes:
  - No case's class is a supertype of another's (0 pairs).
  - None of the 213 is abstract, and all 213 implement `Node`.
  - So at most one class case matches any value.
  - The 15 stable-identifier cases (`case SKindOp =>`, `FortressAst.scala:807-812`) compare by the extractor object's default `equals`, so they match no node.
  - Only "class cases before List, Option and the default" is order-sensitive, and that is kept.
- **Subclasses.** About 45 Scala subclasses extend `Walker`, per the grep. Many override `walk` and call `super.walk`. `walk` keeps its name and signature, and the case bodies still call the virtual `walk`.
  - No source defines a `walkCases*` member: grep over the whole repository, `tmp/` aside.
  - Scala would refuse an override without `override` anyway.
  - No user of `Walker` exists outside `ProjectFortress/src`.
  - No code or test inspects `Walker` stack frames. `FileTests.java:873` looks only for `Driver.evalComponent`.
- **Stack.** The old `walk` had `max_locals` 1,079. The new methods have 82 to 180 each, 1,107 summed over the whole chain. So an interpreted walk of a List, Option or String needs about the old frame's room plus small forwarder frames, and earlier node classes need far less.

## 2. The build makes the patch's file

**Setup.** No base build existed, since the probe's at 473ab6a30 was gone. So I built one at main's head 558ae0a10: `ant compileAll`, the library order and the BooleanOps walk run, then `git status` clean. I seeded `/home/user/fortress-sk16` from it.

**What I did.**
1. Applied `fix.patch` with `git apply`, which was clean.
2. Saved the patched `FortressAst.scala`, then put main's version back, so that the build had to regenerate it.
3. Ran `ant compileAll`: BUILD SUCCESSFUL, 40 s.
   - It printed `Processing .../Fortress.ast`.
   - `makeAST` ran because the generator's source was newer than `Library/FortressAst.fsi` (`build.xml:644-646`).

**What I found.**
- The regenerated `FortressAst.scala` is byte-identical to the patch's (`cmp`).
- The tree's whole diff, with the test file added, equals `fix.patch` except for its `index` lines.
- No other generated file changed: not `nodes/`, not `Library/FortressAst.fs*`.
- The base build also ran `makeAST` with the unedited generator and stayed clean. So the old generator reproduces main's file.

## 3. The test

**Fails on main.** I compiled `WalkerJUTest` against the base build's classes. `junit.textui.TestRunner` gave "Tests run: 4, Failures: 1": `testEveryMethodCompilable` fails with "Walker.walk is 31704 bytes of bytecode, more than 8000".

**Passes with the fix.** `ant testOnly -DtestPattern=WalkerJUTest` gives "Tests run: 4, Failures: 0, Errors: 0", BUILD SUCCESSFUL.

**It runs in the misc track.** The track includes `**/*JUTest.class` (`build.xml:1200`). On a clean build:
- scalac runs first and parses the Java sources for their signatures (`build.xml:753-783`);
- javac then compiles the test against the built `Walker` (`build.xml:785` onward).

**What it catches.**
- A later `Fortress.ast` change makes the build regenerate the walker. The size test reads the built `Walker.class` and fails on any method of `Walker` over 8,000 bytes, naming the method and its size.
- The margin is wide. The largest method is 4,474 bytes (about 149 bytes per case). A 30-case chunk would need about 267 bytes per case to pass the limit.
- It also catches a generator that goes back to one method.
- The behaviour tests catch a broken chain anywhere in `walkCases0` to `walkCases6`. List and Option sit in the last method, so with a broken chain `testOverrideReachesNestedNodes` would get them back unwalked.

**What it misses.**
1. Methods over the limit outside `Walker` (section 5).
2. A JIT bail-out on a method under the limit. Size is necessary for compilation, not sufficient.
3. A single dropped case of a node class that the tests do not sample. Only a handful of type nodes and `TypeArg` are walked.
4. Speculation churn. I ran `-XX:+PrintCompilation` for 150 s on the same stage:
   - All eight methods compiled at tiers 2, 3 and 4, with no `COMPILE SKIPPED`.
   - There were 80 "made not entrant: uncommon trap" recompiles. The last of them came at 88 s.

It guards the right thing for this defect.

## 4. The time and the results, measured once

**Tree.** The fix plus row 680's line (`Decls.scala:414`, `makeTryChecker(this)` to `makeTryChecker(newChecker)`), built with `ant compileAll`: 26 s, scalac recompiled everything.

**Stage.** A copy of `run.sh` in my `tmp/`, whose only change is `timeout -k 10 900` to `3000`.

**Machine.**
- nproc 4, Xeon at 2.10 GHz.
- Before the start: no java process. I waited until the 1-minute load was under 1.0.
- During the run: only the stage's java process and its `timeout` wrapper.
- Load sampled each minute: 0.98 at the start, then 1.14, 1.31, 1.11, 1.04, 1.05, and 1.02 at the end.

**Run.** 23:29:57 to 23:35:30 UTC: **333 s**, the whole `run.sh`, its javac included.

| run | seconds |
|---|---|
| this run (fix and repair) | 333 |
| probe's F1 (fix and repair) | 352 |
| probe's F0 (repair, no fix) | 911 |
| idle measure without the fix, at 994dc944c | 959 |

994dc944c has the same code as 558ae0a10: `git diff` of `ProjectFortress`, `Library`, `build.xml`, `bin` and the stage is empty. This run is well inside the 690 s rule of `CLIMB-BATCH-15.md:154`.

**Results.**
- The table equals `measure-680-run1-table.txt`: `#total 39`, `#locations 38`, `#crash none`, every api 0, `#shadow` matching.
- The whole checker output, 178 lines, equals `measure-680-run1-full-output.txt` once `/home/user/fortress-m680` and `/home/user/fortress-sk16` are masked. That includes the last line `### rc=-1`. The output holds no time lines.
- So under P-148 the checker accepts and refuses the same programs, with the same errors at the same places.

## 5. What else the landing must carry

**Must carry:**
- `fix.patch` as it stands. It applies cleanly to 558ae0a10.
- Row 680's line, with its own test changes (`e75bb538b`).
- The gate's suites, both of them: the walker is used by phases of both paths.
- The ledger row and the FACTS entries that the probe proposes (`REPORT.md` §11).

**Other generated walkers.** No method generated from `Fortress.ast` is near the limit after the fix. I scanned `ProjectFortress/build` with `java.lang.classfile` for methods of 5,000 bytes or more. The in-repo generators' Java visitors have one small method per class.

**Methods over or near the limit.** None needs to be in this landing. The probe measured them at 9 of 14,819 samples after the fix. They are candidates for a later pass:
- `NodeReader.readNode`, 14,026 bytes: a chain of 938 string comparisons that ASTGen's own serializer generates (`astgen.jar`, `generateSerializers yes`). It runs on every AST cache read (`ASTIO.java:150`).
- `Misc.checkExprMisc`, 12,893.
- `HygienicRenamer.walk`, 11,599.
- `ExprDisambiguator.walk`, 8,518: 6.5 % over, and both paths' disambiguation runs it.
- The Rats! parsers' `pCharLiteralContent$1`, 23,717, three copies.
- The parsers' `pidrest`, 7,617, four copies: 95 % of the limit.

## Fixes

None.

## For the curator

1. **Land it.** The stage with both the fix and the repair took 352 s (F1) and 333 s (this run), against 959 s without the fix, with identical output.
2. **Q1 of the report** (with the repair or ahead of it) is still yours. Nothing here prefers one or the other: the split changes no result either way.
3. **A wider guard is a decision not taken.** One test could scan the whole build for methods over 8,000 bytes, with an allow-list of today's six. It would catch the hand-written ones and any new one. It is not needed for this landing.
4. **A nit, not fixed.** The generator joins each case's two lines with a literal `"\n"` inside a `println` (patched `ScalaAstGenerator.java:646-647`, `:654`). The output is identical on Linux. Only a Windows build would mix line endings.
5. **Scratch.** The outputs of this review are in `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/sk16/`:
   - `skeptic-run-full-output.txt`, `skeptic-run-table.txt`, `skeptic-run-log.txt` and `skeptic-run-load.txt`;
   - `skeptic-printcompilation-walker.txt`;
   - `sizes-base.txt`;
   - the checking programs `MethodSizes.java` and `SubCheck.java`.

   Both worktrees (`/home/user/fortress-skb`, `/home/user/fortress-sk16`) are removed. Nothing is committed or pushed.
