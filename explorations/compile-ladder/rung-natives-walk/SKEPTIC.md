<!-- Climb batch 23, rung W (rung-natives-walk): the skeptic's check of walk's half of P-58 and the first family, its programs, its two corrections, and its verdict. -->

# Rung W: the skeptic's verdict

Judged: `wip/rung-natives-walk` at `188ed7834`, the worker's head. My commits: `af7880964` and `a285a6ae5`, both corrections; this file last. Verdict: **approved**. The change does what the section and forks 6 to 15 ask. Its tests failed first on the base's code and pass on the head. I contest nothing. I made two corrections and add two ledger rows (NEW-W-2, NEW-W-3).

The worker's `REPORT.md` and `record.md` were already on the branch. The journal step wrote nothing to the tree. `journal-text.py` run into `tmp/` gives the same texts, apart from a final newline.

## What I checked

1. **The tables.** The diff edits `Library/` and `ProjectFortress/LibraryBuiltin/`, so both stages had to run. Both did, on the head's code. `tmp/rung-natives-walk/checker-count-postedit.txt` reads '#total 0', '#locations 0', '#crash none'. `diff` against `explorations/compile-ladder/climb-batch-22c/gate/checker-count.txt` prints nothing. The run took 161 s, 04:43:32Z to 04:46:14Z. `tmp/rung-natives-walk/distance-postedit.txt` reads '#total 0', every `#kind` 0, '#crash none'. Against climb batch 22c's table it differs only in its `#seconds` and `#machine` rows. `dist-post/errors.tsv` holds only its header. The diff does not touch the checker, so I ran no stage. The tables in the report are those of the worker's head.
2. **The tests ran first, by the worker's transcripts.**
   - The first launch (`agent-a1bb732d9586a1e88`), call `y9HEUb`, 04:03:47Z, ran the patch's five tests through the harness on tree `3cd653815`. This was before any code edit: the patch's code was applied at 04:07:50Z (`qfWG5e`) and first built at 04:08:08Z (`zfUUAL`). Result: 'Tests run: 5,  Failures: 4,  Errors: 0'. The guard was 'OK'.
   - Call `VHJZFh`, 04:07:36Z, ran Misfit and Uncarried on `9e93b85e0`: 'Tests run: 2,  Failures: 2'.
   - The second launch (`agent-af24f980e3604f841`), call `6z5JnH`/`rSkKUt`, 04:19:08Z, ran the base build's harness on all seven: 'Tests run: 7,  Failures: 6'. These are the lines that recordedFailure quotes.
   - The last code edit was the restore of the improved loader, at 04:22:37Z (`Gjp5LG`). It was rebuilt in `u2cQmN`. The last library-source edit was the `.fsi` comment, at 04:34:13Z (`B9RtZ3`).
   - The last harness run, `GWtkYH`/`XHux6C`, 04:34:39Z, gave 'OK (8 tests)'. Nothing under `ProjectFortress/src`, `Library/` or `LibraryBuiltin/` changed after it.
   - `ant testSystem` ran 04:35:47Z to 04:41:21Z: 'Tests run: 176', '169', '178', '170', each 'Failures: 0', 'BUILD SUCCESSFUL'. `ant testSpecData` gave 'Tests run: 130, Failures: 0'. Both ran on the code of the head: `git diff --stat e74428c71 HEAD` touches no code.
3. **The diff, line by line.**
   - `StaticNativeApp.java` is the patch's text, improved. It refuses at load a declared parameter or result type that no Java type carries (`:97-111`). It collects the methods of the helper's name before it reads the types.
   - The hook in `NativeApp.java:194-201` is the patch's 8 lines.
   - The 21 strings match `rung-W.patch` exactly. A `git grep` count of glue strings gives 413 at the base and 392 at the head. 21 strings name helpers.
   - `CHOOSE` (`Library/FortressLibrary.fss:789`) and `asFloat` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:375`) stay on their glue classes, as fork 12 says.
   - I compared each replaced glue class with its helper: `Int.java:98-242`, `:436-440`, `ZZ32.java:213-217`, and `simpleIntArith.java:19-96`, `:224-243`, `:297-315`. They compute the same values. Overflow and `MIN DIV -1` raise in both.
4. **Precedents.**
   - The raise uses `Int.overflow()`'s form (`interpreter/glue/prim/Int.java:258-266`).
   - A refusal goes through `bug(defn, …)`, as for a missing glue class (`NativeApp.java:210-211`).
   - The message of `FortressImplementationError(Throwable)` is the missing class's name (`compiler/runtimeValues/FortressImplementationError.java`; `Utility.java:45-50`). That is why `RAISE` matches it. `ProjectFortress/build/fortress/` holds no `CompilerBuiltin$IntegerOverflow`.
   - No device was invented where the library has one.
5. **The tests themselves.**
   - Each test is named by its topic.
   - `ZZ32DivisionByZeroWalk`'s message cites `opr-overview.tex`, section "Multiplication, Division, Modulo, and Remainder Operators". That section holds the sentence the message states (`:113`, `:165`).
   - `NativeHelperBindingWalk.fss` carried a second comment line, `(* two Java overloads of one name, … *)`. I removed it (correction 1).
6. **My programs** (below): the family at edge values, old against new and at 1 and 4 threads; the raise kinds; the loader's corner cases; the compiled path.
7. **The defects' homes.** These hold as the worker gives them: row 796 (home 1), row 336's `ZZ32` `DIV` (home 1), the patch text's wildcard (home 1), NEW-W-1 (home 3). Two defects that my programs measured had no home. They are NEW-W-2 and NEW-W-3 (correction 2).
8. **The ledger and sibling sites.**
   - `ledger-find` on `builtinPrimitive`, `nativeHelpers`, `glue class*`, `DivisionByZero walk`, `getString`, `CatString native*`, `flat string*`, `InterpreterBug native*` and `getInt` finds rows 309, 796, 336, 521, 348, 350, 318, 435 and 385. None duplicates a finding of the rung or of mine.
   - In the sibling types and widths, `NN32` and `NN64` `DIV`/`REM`/`MOD` and `ZZ` `REM`/`MOD` by zero also end the run. Row 336 does not list them (NEW-W-3).
   - On the other path, the compiled prelude's helpers raise `DivisionByZero` (below).
9. **The report.**
   - I opened each of the five provenance lines: `natives-shape.md:38-40`, `NativeApp.java:196-203` at `3cd653815`, `opr-overview.tex:164-165`, `default-libraries.tex:37-39`, `Int.java:258-261`, `NativeApp.java:210-211`, `StaticNativeApp.java:97-111`, `Coercions.java:1`, `FortressBuiltin.fsi:26`. Each says what it is cited for.
   - The worker's list of sentences made false missed F-24 (`explorations/coordinator/FACTS.md:18`): "Any other Java exception of a native becomes a `ProgramError`, which no `catch` takes, so a division by zero ends the run (row 336)." I added it to `REPORT.md` and to `record.md`'s hand-over.
   - record.md's finding 2 said: "Meaning: a helper never sees a value that its Java type cannot carry." That is false for a method's `self` (NEW-W-2). I narrowed it to declared parameters. The FACTS hand-over is narrowed the same way.
   - The worker's three specification builds end 'BUILD SUCCESSFUL' (`tmp/rung-natives-walk/spec{,2,3}.txt`).
10. **Competing declarations.** `git grep -l -w` over `ProjectFortress` and `Library` for each test component, `StaticNativeApp`, `isHelperString` and my `XXXNativeHelperUncarriedSelfWalk` finds each name only in its own file. For the two Java names, it also finds `NativeApp.java`. Rung C's compiled tests are named `…Compiled`.
11. **Failure modes.**
   - On the base, a helper string fails loud: walk refuses it at load ('Native class … not found.'). The rung turns two such cases into quiet values.
   - A non-flat `String` argument gives 9 for a 52-character string (NEW-W-1, the worker's).
   - A helper bound in a method of a program's own type passes the object's type name: `Holder.len()` is 2 (NEW-W-2).
   - `ZZ32`'s `DIV` by zero turns a run-ending Java exception into the specification's `DivisionByZero`. It is loud unless caught.
   - Neither quiet case is reached by a library binding.

## My programs and their output

The programs are in `tmp/rung-natives-walk/skeptic/`. New code: `FORTRESS_CACHES=$S/new-caches /home/user/fortress-natives-walk/bin/fortress P.fss`. Old code: `/home/user/fortress-base23/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 /home/user/fortress-natives-walk/tmp/old-caches P.fss`.

- **`SkFamilyEdge.fss`**: the 21 operations at their edge values, at the minimum, the maximum, 0 and -1. It also covers chained `<`, `CMP`, `MAX`, `MIN`, `|x|`, `SUM`, `PROD`, `BIG MAX`, a `ZZ32` plus a `ZZ64`, and a `ZZ32` plus an `RR64`.
  - New code, one thread:

        neg IntegerOverflow -2147483647 0 -2147483648 -2147483647 2147483647 1 IntegerOverflow
        div 3 -3 -3 3 0 -2147483648 -2147483647 IntegerOverflow DivisionByZero DivisionByZero
        unsigned 2147483648 4294967295 0 true
        sum 500500 3628800 25 IntegerOverflow

  - Old code: the run ends at `z DIV z`, 'Caused by: java.lang.ArithmeticException: / by zero' at `Int$Div.f(Int.java:126)`, rc=1.
  - `SkFamilyEdgeNZ.fss`, the same program with the two zero divisors written as their names: `diff` of old and new prints nothing, at one thread and at four. The new program's output at 1 and 4 threads is the same.
- **`SkParallel.fss`**, at `FORTRESS_THREADS=1` and `=4`: a parallel `for` over `1#2000`, with an `atomic` accumulator, a caught `DivisionByZero` and a caught `IntegerOverflow` in each iteration. New code at both thread counts: 'acc 2001000 cnt 2000 ovf 2000 sum 333833500 str 1234567891011121314151617181920', rc=0. `SkParallelNZ.fss` (divisor 1) gives the same lines old and new, at both thread counts. An uncaught `IntegerOverflow` gives the same output on both codes, paths aside, and rc=1 (`old-parnz-ovf-t1.txt`, `new-parnz-ovf-t1.txt`).
- **`SkRaiseKinds.fss`**, new code:

        ovf Unchecked Integer Overflow; Exception Integer Overflow; IntegerOverflow
        dbz Unchecked Division by zero; Exception Division by zero
        DivisionByZero

  A helper's raise is caught as `UncheckedException` and as `Exception`. A `catch` of `IntegerOverflow` alone does not take it. Uncaught, it ends the run with the Fortress message, rc=1. The overflow line is the same on the old code (`SkRaiseKindsOvf.fss`, `diff` empty).
- **The loader's corner cases**, new code:
  - `SkZZParam.fss`: a helper over `BigInteger` at `ZZ`. 'zneg(big) = -12345678901234567890', 'zneg(5) = -5'. A small `ZZ` arrives as an `FBigNum`.
  - `SkSelfString.fss`: `object Ob  len(): ZZ32 = builtinPrimitive("…simpleConcatenate.nativeStrlen") end`. It prints 'Ob.len() = 2', rc=0: the object's type name went to the helper. This is NEW-W-2.
  - `SkSelfInt.fss`: the same method over `simpleIntArith.intOverflowingNeg`. The call ends 'getInt not implemented for FOrdinaryObject', an `InterpreterBug`.
  - `SkArityPlus.fss`: `f(a:ZZ32):ZZ32` over `intOverflowingAdd(int,int)`. It loads, and the call ends 'Native public static int com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAdd(int,int) given 1 arguments'. Fork 9 tells a dotted method from a top-level function by the helper's arity, so this is the fork's rule. The error is loud. It is not a defect of the change.
- **`sib/SkSib1.fss` to `SkSib8.fss`**: one division by zero each, in a `try` catching `DivisionByZero`. The divisions are `NN32` `DIV`/`REM`/`MOD`, `NN64` `DIV`/`REM`/`MOD`, and `ZZ` `REM`/`MOD`. Each run ends with 'Caused by: java.lang.ArithmeticException' and rc=1, at `NN32$Div.f(NN32.java:133)`, `$Rem` `:139`, `$Mod` `:167`, `UnsignedLong$Div` `:134`, `$Rem` `:140`, `$Mod` `:167`, `BigNum$Rem` `:166` and `BigNum$Mod` `:205`. The old code gives the same for `SkSib1`, `SkSib4` and `SkSib7`. This is NEW-W-3.
- **The compiled path, old code only** (`old-fortress.sh … compile SkCompiledFamily.fss` and `… run SkCompiledFamily`):

        div  3   -3   DivisionByZero   DivisionByZero
        bits  8   14   6   -13

  Walk on the new code gives 'div 3 -3 DivisionByZero DivisionByZero'. The paths now agree on `ZZ32`'s `DIV` by zero, which is the specification's answer.
  - The wrapping operators differ: compiled `DOTMINUS mn` gives 2147483647 and `mx DOTPLUS 1` gives 2147483647, against walk's -2147483648 on both codes. That is row 348, the prelude's saturating spellings.
  - A literal `12 BITAND 10` fails compiled with `CompilerFailureDetectedAtRunTime` (row 318).
  - I did not run the compiled path on the new code. The rung's tree holds no library jars (`default_repository/caches/bytecode_cache/` is empty), and filling it is a library compile, which this check does not start. The diff touches no file that the compiled path reads: no `compiler/`, `codegen/`, `runtimeSystem/` or `Compiler*` file. So the compiled answers of the new code are those of the old.

## Findings, and the home of each

- **NEW-W-2: a helper string bound in a method of a type that no Java type carries.**
  - Under walk, such a binding loads. Its call passes the object as the helper's Java type reads it: 'Ob.len() = 2', or 'getInt not implemented for FOrdinaryObject'.
  - Cause: `StaticNativeApp.find` checks a `self` slot's Java type only for being one it carries (`StaticNativeApp.java:119-121`). The loader is not told the type that declares the method (fork 9; `interpreter/evaluator/values/FunctionClosure.java:47-66`).
  - The comment as the rung revised it takes "the one whose Java parameter and result types carry the declared types, `self` first", and makes a string that names no such method an error. Fork 10 refuses such a string at load.
  - Home 2: `ProjectFortress/tests/XXXNativeHelperUncarriedSelfWalk.fss` with its `.test`, and row NEW-W-2. The Appendix I entry's effect names the departure.
  - Not fixed here, for three reasons. A refusal at load needs the declaring type passed through `FunctionClosure` and `MethodClosure`, paths the section does not give the rung. Every library binding's `self` is carried. Walk's glue classes behave the same under such a binding.
  - `explorations/coordinator/CLIMB-BATCH-23.md:89` says: "A user program cannot reach them, since a helper takes Java values and a program's `self` is an object of its own." It is false as a statement of what loads: a program's own object reaches the dotted path. It is the planner's sentence, so the gather should know it is false.
- **NEW-W-3: division by zero on the sibling widths.**
  - Under walk, `DIV`, `REM` and `MOD` by zero on `NN32` and `NN64`, and `REM` and `MOD` by zero on `ZZ`, end the run, on old and new code alike. Row 336, as rewritten by fork 13, does not list them.
  - Ledger row only, reproducer `none`. Walk crashes on the program (the skill's tests-writing.md, "How a defect is recorded", home 3's last case, as row 336's precedent).
  - The entry's effect names it with the row.
- **NEW-W-1** (the worker's) stands as the worker records it.
- **The second comment line** of `NativeHelperBindingWalk.fss` is removed (correction 1).

## My corrections

1. `af7880964`, "Skeptic's correction: NativeHelperBindingWalk keeps one comment line". Kind: test. Path: `ProjectFortress/tests/NativeHelperBindingWalk.fss`, the comment that stood at `:16`. Settled by the skill's tests-writing.md, "Names, comments, citations": "Give it one comment line that says what it checks". The brief's check 5 says the same: "the file carries at most one comment line". The assertions are unchanged.
2. `a285a6ae5`, "Skeptic's corrections: rows NEW-W-2 and NEW-W-3, …". Kind: record, report, test (home 2). Paths:
   - `ProjectFortress/tests/XXXNativeHelperUncarriedSelfWalk.fss` and `.test`, with `load_exception_contains=Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen`;
   - `record.md`: findings 7 and 8, the two rows, finding 2's meaning, the FACTS hand-over and F-24;
   - `REPORT.md`: F-24;
   - `Specification/appendices/changes.tex`: two sentences in the entry's effect.

   The XXX test's runs:
   - Old code, via `FORTRESS_HOME=/home/user/fortress-base23 /home/user/fortress-base23/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-natives-walk/skeptic/h-old <tree>/ProjectFortress/tests/XXXNativeHelperUncarriedSelfWalk.{fss,test}`, 05:22:32Z, tree `a1f8c4b8b`: 'Refused at load, but did not satisfy load_exception_contains', 'Native class com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen not found.', 'Tests run: 1,  Failures: 1'.
   - Head, via `explorations/compile-ladder/rung-inference-walk/harness-one.sh …/h-new …`, 05:22:48Z, tree `188ed7834`: ' Saw expected failure: loaded and ran, not refused at load', 'OK (1 test)'.
   - The same with the string misspelt `nativeStrlenX` for one run, then restored (`cmp` equal): ' Refused at load as its keys name', 'Tests run: 1,  Failures: 1'.
   - With every test of the rung, on the head, 05:23:43Z: 'OK (9 tests)'.

   The specification after the edit: `cd Specification/fortress && ./ant genSource && ./ant tex` gave 'BUILD SUCCESSFUL' twice, and the warning count was 0. In the PDF, entry I.1.44 prints 'row NEW-W-2' and 'row NEW-W-3'. The build's files were removed (`git clean -fXq -- Specification`).

I changed no Java, Scala or library source. So my corrections need no whole-suite run, and I ran none. The gate's `ant testSystem` will count one test more than the worker's 693, my `XXX` file.

## Where I differ from the worker's account

- The worker's decision 3 gives NEW-W-1 home 3, with the row's specification cell 'silent'. The revised comment now says the interpreter "carries each value at its declared type". But the worker's question 1 to the curator offers two fixes with different answers: flatten, which gives 52, or bind over `FlatString`. So home 3 holds until he answers. The row could cite the comment once he does.
- The worker's REPORT.md, "Defects and their homes", lists neither NEW-W-2 nor NEW-W-3. This file and `record.md` hold them.

## For the gather

- Number NEW-W-1, NEW-W-2 and NEW-W-3. Replace "row~NEW-W-n" in `Specification/appendices/changes.tex`: NEW-W-3 at `:4488`, NEW-W-1 at `:4492`, NEW-W-2 at `:4497`.
- The test count in the gate's `ant testSystem` rises by 9 over 685: the worker's 8, and my 1.
