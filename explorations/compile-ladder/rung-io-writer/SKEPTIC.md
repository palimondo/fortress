# Rung W, climb batch 27: the skeptic's verdict

Head judged: `af5953d00` (the worker's last commit). My one commit before this file: `1f34e66e3`, corrections of the report and the record. No fix of the change itself. Verdict: approved.

## What I checked

1. The stages. Both ran once on `3b3e83d59`, the last code state; the later commits add a test and prose only. Count: the worker's `tmp/rung-io-writer/checker-count-postedit.txt` equals `climb-batch-26/gate/checker-count.txt` by `diff` ('COUNT-SAME', `#total 0`, `#crash none`), started 07:29:51 UTC (call `7tcFLQ`), file written 07:31:43, 112 s. Distance: `compare.sh` printed 'DISTANCE SAME   0', `#seconds 153`. The tables in REPORT.md are those of the worker's head. The diff changes no Scala of the checker, so I ran no count stage.
2. Test first. `harness-one.sh` on `tests/NativeHelperWriterWalk.fss` at 07:14:33 UTC (call `uACzcX`) printed 'FileNotFoundException is undefined.', before the first library or Java edit (07:15:45, `fileOps.java`); `junit.sh base` on the compiled test at 07:15:20 (`ogeEkK`) printed 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.fileOps.jbwStdOut', 'Tests run: 2,  Failures: 2'. Passing: the harness at 07:19:37 (`dcF63w`), after the last code edit (07:18:56, `JavaBufferedWriterObject.java`) and its build, 'OK (1 test)'; `junit.sh new` at 07:20:41 (`aswQJw`), 'OK (2 tests)'. `Library/File.fss` was edited for a probe at 07:19:56 and restored byte for byte; `git diff ed8652dc0 -- Library/File.fss` prints nothing. The base failure of the walk test is at load, so the two stops that the brief names are shown only by the worker's two copies (07:14:00, 07:14:18), which the report quotes.
3. The diff, line by line, against P-164, P-58, F-299, F-321 and the review's (b): it does what the report says. `FileWriteStream` stays on its glue (5 bindings), against the section's plan; I read `NativeConstructor.initializeSelfEnv` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/NativeConstructor.java:71-93`): it evaluates an object's fields once per constructor, in an environment without the object, so the worker's probe stop ('undefined variable [$self]') follows, and the step needs walk's code outside the rung's files or the reader rung. A question for the curator, as the worker put it.
4. Precedent: the carrier follows `value object Int extends ZZ32` and the glue's own registration (`interpreter/glue/prim/Writer.java:30-33`); the `String` overload that flattens follows `printThreadInfo` (`Library/FortressLibrary.fss:4653-4656`). The trait's four methods are the section's four; the prelude's `newLine` is not among them (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:605-611`), as the section and P-164's 7 writer bindings give.
5. The tests: one comment line each; `XXXWriterCharSupplementaryWalk` cites `basic/lexical-structure.tex`, "Character Literals", a section that exists (`:797`).
6. Citations of REPORT.md: two cited `FortressLibrary.fss` at the base's lines, corrected (below). The others I opened say what they claim: `CompilerBuiltin.fsi:605-611`, `CompilerBuiltin.fss:1184`, `FortressBuiltin.fss:369-376`, `File.fss:20`, `:64`, `BuiltinPrimitiveRewriter.java:106`, `Writer.java:30-33`.
7. Competing declarations: no test of either corpus and no Java class under `ProjectFortress/src/com/sun/fortress/` declares `FileNotFoundException`, `JavaBufferedWriter`, `JavaBufferedReader`, `JavaBufferedWriterObject` or the three factories, outside the library and the prelude; nothing in the Java code but the glue itself names the glue `Writer`'s classes.
8. The ledger: `ledger.py find` for "BufferedWriter", "stdOut", "carries", "No Java", "JavaBufferedWriter" gives rows 899 and 904 and nothing for a program's object below a carried trait; hence row 928.
9. The relayed request names a sentence on deleting a branch from a cloud container; `grep -rn "cannot delete a branch"` over the worktree's `.claude/` and `explorations/` prints nothing, so no file of this rung holds it.

## My programs, the differential

Under `tmp/rung-io-writer/skeptic/`, walk on the old code by `old-fortress.sh /home/user/fortress-base27 /home/user/fortress-io-writer/tmp/old-caches P.fss`, walk on the new code by `FORTRESS_CACHES=.../skeptic/caches bin/fortress P.fss`, at `FORTRESS_THREADS=1` unless said.

- `SkWriterDiff2.fss` (a file `Writer` with a character past ASCII, a `BufferedWriter` over a program's own `WriteStream`, `print` in a loop). Old: 'A1 print 3 things', 'A2 file [firsté]', then 'java.lang.ClassCastException', rc=1, at the `BufferedWriter` over a non-`Writer`. New: 'A2 file [firsté]', 'A4 collected [abcd]', 'A5 BufferedWriter on Collect', 'A6.1 A6.2 A6.3', rc=0. The review's point 16 asks that `BufferedWriter` take any `WriteStream`: a crash became the value the api names.
- `SkWriterEnd.fss`: 'A6.1 A6.2 A6.3' on both, and on both the last unflushed `stdOut.write` and `stdErr.write` are lost; same bytes.
- `SkWriterPar.fss`, 40 `println`s from a parallel `for`, at 1 and 4 threads: 41 lines each, no line split, the sorted outputs equal (md5 `cae7ca47` all four); the order at 4 threads differs between runs, as a parallel loop's may.
- `SkClosedWrite.fss`, a write after `close`, uncaught. Old: 'Write IOException on <Writer on "SkClosedWrite.out">' at the program's line 7, rc=1. New: 'Library/Writer.fss:27:30-42:', 'IOFailure', rc=1. Caught (`SkWriterDiff.fss`): new 'A3 after close: IOFailure'; old stops, since no `catch` sees the glue's error.
- `SkMissingFile.fss`, `Writer` on a missing file, uncaught. Old: 'FileNotFound: no-such-dir-SkMissingFile/x.txt' at the program's line 5. New: 'Library/Writer.fss:21:37-60:', 'FileNotFoundException', rc=1. The printed error loses the file's name and points into the library: a printed line that changes (decision 10 of the report gives why the message is not filled).
- `SkOwnFnf.fss`, a program's own `object FileNotFoundException`: old 'K1 caught mine'; new 'Type name may refer to: FileNotFoundException, FortressLibrary.FileNotFoundException', rc=255. A name programs lose, which record.md's revival change did not list (corrected).
- `SkOwnJbw.fss`, `object Fake extends JavaBufferedWriter end` and `Fake.write("x")`: old 'JavaBufferedWriter is undefined.'; new 'K2 made a Fake', then 'No Java FortressBufferedWriter carries Fake', rc=1. row 928.
- `SkWriterComp.fss`, compiled, binding `jbwOpen`, `jbwWriteString`, `jbwClose` over the prelude's trait: old and new both 'C1 h?llo ? ? ?' and 'C2 [ h?llo ? ]' (row 904's `?`); the rung changes nothing the compiled path runs but the two new helpers, which the worker's compiled test runs.

The failure-mode question: no loud failure becomes a quiet value. Two walk errors that no `catch` saw become the library's `IOFailure` and `FileNotFoundException`, still loud when uncaught; a `ClassCastException` becomes the write that the api names.

## Corrections, commit `1f34e66e3`

- REPORT.md's problem and precedent lines cited `Library/FortressLibrary.fss:4543-4546` and `:4628-4644`, the base's lines; the head's are `:4568-4571` and `:4653-4669`.
- record.md's revival change: programs also lose the type name `FileNotFoundException` (`SkOwnFnf.fss` above).
- record.md: row 928, a program's object below `JavaBufferedWriter`, home 3 (the specification is silent on what such an object's inherited natives do), linted alone: 'number: the # cell is not a number: row 928' (now row 928) only.

## Where I differ from the worker

Nowhere on the change. The worker's "No printed line changed in my tests or programs" holds for its programs; mine show the uncaught I/O errors' texts changing, listed above for the curator.
