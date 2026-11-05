# Skeptic of rung T, climb batch 26 (rung-string-natives)

Head judged: `72db389ca` (the worker's last commit). The branch already carried `REPORT.md` and `record.md`, so the journal step wrote nothing. My commit: `4eebb9a45` (a correction). This file is the last commit.

## What I checked

1. **The count and distance tables**, read from the worker's files. `tmp/rung-string-natives/checker-count-postedit.txt` equals climb batch 25's `compile-ladder/climb-batch-25/gate/checker-count.txt` once the cache, shadow and comment lines are left out, with `#total 0`. `tmp/rung-string-natives/distance-postedit.txt` gives `#total 0`, `#crash none` and `#seconds 206 FortressLibrary 150`. The count stage's 152 s is `count-start.txt`'s 1793911660 against the end stamp 1793911812. The first distance run on `19e9dbda5` (`tmp/rung-string-natives/first/distance-postedit.txt`) gives `#total none: 1 target(s) stopped with errors the stage does not count: Library/FlatString.fss rc=-1`, and its `run.txt:839` gives `FortressBuiltin.StringVector is undefined.`, as the report says. These are the tables of the worker's head. I ran neither stage, since my commit changes no code.
2. **Test first, in the worker's transcript.** At 20:22:48 (call `VsEEyg`), on the base's code, the harness gave `NativeHelperStringRopeWalk`: `FAIL: J1/0:? =/= J262/0:...; getEnvironment at a rope name`, `Tests run: 1,  Failures: 1`. At 20:24:21 (`tYsQwZ`) `NativeHelperNonFlatStringWalk` printed `9` and ` Missing expected refusal at load`. At 20:25:16 (`iT3rYu`) `junit.sh base` gave `NativeHelperFamilyStringCompiled`: `builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.stringOps.asExprString`, `Tests run: 2,  Failures: 2`. At 20:23:52 (`ivcKfJ`) `NativeHelperCarriedSelfFlatStringWalk` passed on the glue, `OK (2 tests)`. All four runs came before the first build at 20:27:05 (`DqGRP1`). At 20:28:10 (`LBG5Sp`), with the strings moved and the loader not yet changed, the harness gave `no Java type carries FlatString, the type of self.` The last runs were at 20:50:46 and 20:50:51 (`S48vVR`), after `8b6fca9b5`'s build at 20:42:39 (`Ew8jLc`) and with no edit of code after it: `OK (6 tests)` and `OK (2 tests)`. `ant testSystem` ran at 20:51:27 (`zMhtPQ`) and gave four shards of 181, 187, 186 and 189, `Failures: 0, Errors: 0`, `BUILD SUCCESSFUL`. The order holds.
3. **The diff, line by line**, against the section, P-58, F-299, row 846, the strings review's options (b) and (c), and the probe's `shadow.patch`. The loader takes the patch's Java and adds `javaForParameter` (`StaticNativeApp.java:64-72`, `:178`), which is the section's last step. The 18 strings name helpers at the Java signatures that REPORT.md's table gives. Each new helper's name is unique in its class: I counted the `public static` names of `stringOps`, `simplePrintln` and `systemOps`. Each native's body is exactly `builtinPrimitive("…")`. Each overload over `String` is a `typecase` on `asFlatString` with `fail` in its `String` arm, the form of `Library/FlatString.fss:137-140` and `Library/String.fss:84-87`. The glue classes, the checker and the compiler are untouched. One line goes beyond the files named: `NativeHelperBindingWalk.fss:3`'s import, which the worker reports. So does the line separator's helper in `stringOps.java`, not `systemOps.java`, which the worker reports with its evidence (below).
4. **Sibling sites.** A scan of every tracked `.fss` for a helper binding with a parameter declared `String` (`tmp/rung-string-natives/skeptic/scan2.py`, and the same scan over all of the tree) finds only `ProjectFortress/tests/NativeHelperNonFlatStringWalk.fss:5`. Among the library's bindings, glue or helper, over `String`, it finds only the commented `ThrowError` (`Library/FortressLibrary.fss:4647`). So the step stops no library component or demo at load.
5. **Competing declarations.** `javaForParameter`, `declaringComponent` and `FLAT_STRING_COMPONENT` are declared once in `ProjectFortress/src/com/sun/fortress/`. No test in either corpus declares its own `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment`, `getProperty` or `match`.
6. **The provenance lines and the citations.** I opened each cited line with `sed -n`: `StaticNativeApp.java:88` at the base, `:64-72`, `:96-102`, `:103`, `:122`, `:136`, `:163`, `:178-180`; `stringOps.java:44-72`; `simplePrintln.java:40-50`; `systemOps.java:24-29`; `NamingCzar.java:339-340`, `:488`; `Useful.java:974-982`; the glue's `FlatString.java:180-184`; `BuiltinPrimitiveRewriter.java:186-188`; `Library/FortressLibrary.fsi:2454`, `:2633-2639`; `Library/System.fsi:14`, `:34-41`; `Library/File.fss:20-22`; `Library/CompilerSystem.fss:20`; `Specification/library/default-libraries.tex:37-39`; `Specification/appendices/changes.tex:4499-4507`; the skill's `interpreter.md:95`, `:99`, `:102`, `:107`, `:116`; `PLAN.md:10`, `:46`, `:47`. Each says what the report claims.

## My programs, old code against new (walk; then compiled)

All are under `tmp/rung-string-natives/skeptic/p/`. Walk ran through `run2.sh`: `old-fortress.sh /home/user/fortress-base26 <tree>/tmp/old-caches P.fss`, then the tree's `bin/fortress P.fss` with a private copy of its caches. I ran at `FORTRESS_THREADS=1` only, since the diff writes no mutable variable, field or library state.

- `SkVals.fss`, every moved method and the five at flat strings and at ropes. Its outputs are the same except for these lines (`diff vals-old.txt vals-new.txt`):

      < indexOf bigs Just(1) size 3 in true
      < indexOf low16 Just(1) Just(1)
      > indexOf bigs Nothing size 3 in false
      > indexOf low16 Just(1) Nothing
      < env rope ? CatString
      > env rope /root /root
      <  Thread 26: CatString
      >  Thread 26: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

  `asExprString` of `"a\"b\\c\nd\te"` and of `"été"`, `cmp`, `cicmp`, subscripts, `match`, `javaRegExpMatches`, `javaRegExpSplit` (past the last piece included), `|lineSeparator|` and `getProperty` give the same values on both.
- `SkErr1`-`SkErr5.fss`: `javaSubstr(2, 9)`, `javaSubstr(3, 1)`, `get(7)`, a bad pattern in `javaRegExpMatches` and in `match`. Old and new end alike, e.g. `Caused by: java.lang.StringIndexOutOfBoundsException: Range [2, 9) out of bounds for length 5`, `old rc=1` / `new rc=1`. No loud failure became a quiet value.
- `SkOwnA`-`SkOwnF.fss`, a program's own types. A program's own `object FlatString` (a method, and a getter `size` bound like the library's) and its own `object JavaString` are refused on both, `no Java type carries FlatString, the type of self.` A program's own `trait FlatString` is refused on the new code with the same message. Row 877's program (`SkOwnE`) prints `10` on both, so row 877 does not move. A program's glue binding over `String` (`SkOwnC`) prints ` Thread 26: CatString` on both: row 846 as narrowed.
- Compiled, `c/SkComp.fss`: `stringOps.indexOf` bound over `JavaString` and a `ZZ32` code point, on a string built with `simpleChar.charToString(128512)`. Old and new print `big len  3  idx  -1  idx low  1`. So walk's new `javaIndexOf` past U+FFFF, `-1`, is the compiled path's answer. Before the change, walk's glue answered `1`.
- Compiled, `c/SkComp2.fss` (new helpers, so the new code only): `expr  "a\"b\\c\nd"`, the same text as walk; `env  /root   dflt`; `sub  el`; and out of range, `java.lang.StringIndexOutOfBoundsException`, as under walk.

## Findings

1. **Row 846 as narrowed had no test that shows it.** record.md's row named `NativeHelperNonFlatStringWalk.fss` as the reproducer, but that test is now a refusal test of a helper binding. It cannot show a program's glue binding over `String` reading `CatString`. That is home 3 (`.claude/skills/fortress-repo/references/tests-writing.md:85`: "a test that asserts today's behaviour, and a row in the gap ledger"). This is a correction, fixed below.
2. **`NativeHelperStringRopeWalk.fss` carried two comment lines**, its header and `(* a name that is set, flat, as a rope and as a SubString *)`. This is a correction, fixed below.
3. **Two sentences made false were not listed.** F-307 (`explorations/coordinator/FACTS.md:137`): "The top-level `printlnWithThread` and `getProperty`, declared over `String`, stay on their glue class (row 846)." And `explorations/coordinator/PLAN.md:49`: the families over `String` and `FlatString`'s five as waiting. This is a correction: added to REPORT.md's list.
4. **The value that moves, `javaIndexOf` past U+FFFF**, agrees with the compiled path (above). After the change, `c ∈ c.asString` is false for such a `c` under walk, as it already was compiled. The cause is row 872's `asString`, not the new search. This is no defect of the rung. The worker's note to row 872 stands.
5. **Where I differ from the worker's account.** REPORT.md's "Defects, with their homes" gives `NativeHelperNonFlatStringWalk` as the test of row 846 as narrowed. That test shows the helper refusal. The narrowed row's test is now `NativeGlueNonFlatStringWalk`. I left the worker's text as it is and corrected the row in record.md.

## Fixes

- `4eebb9a45`, "Skeptic's correction: row 846's home-3 guard, the rope test's one comment line, two sentences made false". Kind: correction, settled by `tests-writing.md:85`. Paths: the new `ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss`, `ProjectFortress/tests/NativeHelperStringRopeWalk.fss` (one comment line removed), and `REPORT.md` and `record.md` (row 846's reproducer, its claim's program, its note). The new test is a guard of today's behaviour with no fix in it, so it passes on both codes. The removed comment changes nothing that runs, so the rope test still fails on the base.
  - On the old code (`FORTRESS_HOME=/home/user/fortress-base26 /home/user/fortress-base26/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-string-natives/skeptic/old-harness <tree>/ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss <tree>/ProjectFortress/tests/NativeHelperStringRopeWalk.fss`, 21:23:46 UTC):

        . interpret .../NativeGlueNonFlatStringWalk
         OK (time = 9501ms)
        FAIL: J1/0:? =/= J262/0:...; getEnvironment at a rope name
        Tests run: 2,  Failures: 1,  Errors: 0

  - On the head (`harness-one.sh <tree>/tmp/rung-string-natives/skeptic/new-harness ...`, the same two files, 21:23:56 UTC): `OK (2 tests)`.
  - No code changed, so no build and no suite.

## Contested

None.

## Verdict

Approved. The loader change is the probe's way 1 plus the section's last step. The 18 bindings compute as their glue did, except `javaIndexOf` past U+FFFF, which now gives the compiled path's answer. The five over `String` read a rope's characters. The tests were seen failing first and passing last. With my correction, the record's rows and lists are true.
