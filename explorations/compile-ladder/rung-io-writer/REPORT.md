# Rung W, climb batch 27: the writer objects over a Java-backed `JavaBufferedWriter` (P-164)

- problem: every program's `println` writes through `stdOut`, a native object of glue classes that only walk can make (`Library/FortressLibrary.fss:4543-4546`; base `Library/Writer.fss:20-26`); the review's probes found `BufferedWriter`'s `asString` stopping and a missing file that no `catch` sees (`explorations/reviews/io-objects-carrier-2026-11-06.md:111-162`; rows 899, 902, 903).
- spec: none; `grep -rln "FileWriteStream\|WriteStream\|BufferedWriter\|stdOut" Specification/` prints nothing.
- precedent: the walk native object below a library trait, `value object Int extends ZZ32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:369-376`); the glue's own registration of its constructor (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Writer.java:30-33`); the prelude's trait (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:605-611`); the native over `FlatString` beside an overload over `String` that flattens (`Library/FortressLibrary.fss:4628-4644`); File's factories beside their objects (`Library/File.fss:20`, `:64`).
- deviation: `FileWriteStream` stays on its glue, since an object of a native component cannot hold a field under walk (row NEW-W-1; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java:99-150`); `BufferedWriter` passes each write to `under` and buffers nothing of its own (`Library/Writer.fss:38-44`); the trait's excludes clause names `Char` for the prelude's `Character` (`Library/FortressLibrary.fss:1878`); the factories take the prelude's name `makeJavaBufferedWriter` and two new names (`Library/FortressLibrary.fsi:1222-1224`); the trait gains `write(s: String)`, which flattens (`Library/FortressLibrary.fss:1880-1883`); no `throws` clause (`Library/FortressLibrary.fsi:1210-1216`).
- historical: Library/FortressLibrary.fsi, Library/FortressLibrary.fss, Library/Writer.fsi, Library/Writer.fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java, ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java` is the revival's).

## What changed and why

Commits on `wip/rung-io-writer`: `3b3e83d59` (the change and its two tests), `85236bf98` (an expected failure for a defect measured on the way).

- `Library/FortressLibrary.fsi:1204-1224`, `.fss:1874-1897`, beside `IOFailure`: `object FileNotFoundException extends CheckedException`, with `asString` "File not found" (fork W4); `trait JavaBufferedWriter excludes { String, Number, Boolean, Char, JavaBufferedReader }` with `write(s: FlatString)`, `write(c: Char)`, `flush()` and `close()` as public natives on `fileOps.jbwWriteString`, `jbwWriteChar`, `jbwFlush` and `jbwClose`, and `write(s: String)`, which flattens by a `typecase` on `asFlatString` and calls the native, as `printlnWithThread` does; `trait JavaBufferedReader`, with the mirror excludes clause and no methods (fork W1); the factories `makeJavaBufferedWriter(name: FlatString)` on `jbwOpen`, and `makeJavaBufferedStdOut()` and `makeJavaBufferedStdErr()` on the new helpers.
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:738-741` (the object at :740), at the component's end: `private object JavaBufferedWriterObject extends JavaBufferedWriter end`. Its native constructor, the new `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/JavaBufferedWriterObject.java`, registers itself in its Java constructor, as the glue's `Writer` does, so that it is ready when the environment is built; its nested class `Value` is walk's value of the trait and holds a `FortressBufferedWriter`. Walk makes the object's own singleton as it initialises the component (the first run of my test stopped at `FortressBuiltin.fss:740:1-741:2` while `makeNativeObject` raised an error), so `makeNativeObject` answers a `Value` that holds no writer, which no helper is passed. No `builtinPrimitive` string names the constructor.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`: `javaFor` carries `JavaBufferedWriter` by name in `FortressBufferedWriter` (:51-69); `carried` admits that class (:97-101); `unbox` takes the writer out of a `JavaBufferedWriterObject.Value` (:292-295) and `box` makes one from a helper's result (:318). `javaForSelf(String)` already falls through to `javaFor`; only its comment names the trait (:106). A program cannot declare a type of the name, since `FortressLibrary` declares it (`interpreter.md`, "What walk checks").
- `ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:490-491`: the walk-world table maps `FortressBufferedReader` to `FortressLibrary`'s `JavaBufferedReader` and `FortressBufferedWriter` to its `JavaBufferedWriter`; the comment at :464-468 names them. The compiler's world does not read that table.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java:86-94`: `jbwStdOut()` and `jbwStdErr()`, each a `FortressBufferedWriter` over a `java.io.BufferedWriter` over an `OutputStreamWriter` of `System.out` or `System.err` in UTF-8, named `<stdout>` and `<stderr>`, made at each call, as the glue's `outputWriter` and `errorWriter` (`interpreter/glue/prim/Writer.java:157-191`). They hold no state of their own (fork 6).
- `Library/Writer.fss` is no longer a native component. `stdOut` and `stdErr` are `Writer`s over the two new factories. `object Writer(fileName: String, under: JavaBufferedWriter)` keeps its `asString` text, and its `fileName` is its value parameter; its one-argument form is the factory `Writer(fileName: String): Writer`, which flattens the name and calls `makeJavaBufferedWriter` (fork W2). `Writer`'s `write(s: String)` writes a string that is not flat in one write and then flushes, as the team's `BufferedWriter(self, |s|)` did, so a rope from parallel tasks does not interleave. `BufferedWriter(under: WriteStream, size: ZZ32)` is a plain object whose `asString` reads its field and whose methods pass to `under`. `Library/Writer.fsi:18-21`: the factory, and the object's new header without the explicit getter.
- 11 glue bindings go, all of `Writer.fss`: `Writer$outputWriter`, `Writer$errorWriter`, `Writer$fileName`, `Writer$write` twice, `Writer$flush`, `Writer$close`, `BufferedWriter$write` twice, `BufferedWriter$flush`, `BufferedWriter$close`. 7 helper bindings come. By `tmp/rung-io-writer/countbind.py` (comments stripped, the compiler's files left out), the base has 142 glue and 305 helper bindings, the tree 131 and 312; the record's 143 (F-32) thus becomes 132. `FileWriteStream`'s 5 stay (below).

### The bindings moved, with their helpers

| binding | before | after | Java signature |
|---|---|---|---|
| `stdOut`'s writer | `Writer$outputWriter` | `makeJavaBufferedStdOut()` | `static FortressBufferedWriter jbwStdOut()` (new) |
| `stdErr`'s writer | `Writer$errorWriter` | `makeJavaBufferedStdErr()` | `static FortressBufferedWriter jbwStdErr()` (new) |
| a file `Writer` | the glue constructor | `makeJavaBufferedWriter(name: FlatString)` | `static FortressBufferedWriter jbwOpen(String) throws FException` |
| `write(s: FlatString)` | `Writer$write` | `JavaBufferedWriter.write(s: FlatString)` | `static void jbwWriteString(FortressBufferedWriter, String) throws FException` |
| `write(c: Char)` | `Writer$write` | `JavaBufferedWriter.write(c: Char)` | `static void jbwWriteChar(FortressBufferedWriter, int) throws FException` |
| `flush()` | `Writer$flush` | `JavaBufferedWriter.flush()` | `static void jbwFlush(FortressBufferedWriter) throws FException` |
| `close()` | `Writer$close` | `JavaBufferedWriter.close()` | `static void jbwClose(FortressBufferedWriter) throws FException` |
| `fileName` | `Writer$fileName` | `Writer`'s value parameter | none |
| `BufferedWriter`'s four | `BufferedWriter$write`, `$flush`, `$close` | Fortress over `under` | none |

## Tests: the failing runs and the passing runs

`ProjectFortress/tests/NativeHelperWriterWalk.fss` asserts what the writer side gives: `stdOut`'s and `stdErr`'s `asString` and `fileName`, a file `Writer`'s, a `BufferedWriter` of size 8's `asString`, the file's contents read back after writes of flat strings, characters and a rope through the `Writer` and the `BufferedWriter`, and a missing file caught as `FileNotFoundException`; it prints six lines, the line outside ASCII among them. On the base, through the harness, before any edit was built (07:14:33 UTC):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/NativeHelperWriterWalk.fss
    . interpret tmp/h1/tests/NativeHelperWriterWalk
     UNEXPECTED exception
    tmp/h1/tests/NativeHelperWriterWalk.fss:58:5-24:
        FileNotFoundException is undefined.
    Tests run: 1,  Failures: 1,  Errors: 0

Two copies of it on the base, which catch `CheckedException` in place of the undeclared name, show the review's two stops (07:14:00 and 07:14:18 UTC; the copies are under `tmp/rung-io-writer/basevar/`):

    harness-one.sh $PWD/tmp/h2 .../WriterBaseAsString.fss .../WriterBaseMissing.fss
    com.sun.fortress.exceptions.ProgramError: ... Library/Writer.fss:53:54-57:
    Missing value: $under in environment:
    harness-one.sh $PWD/tmp/h2 .../WriterBaseMissing.fss      (without the asString line)
    com.sun.fortress.exceptions.ProgramError: ... WriterBaseMissing.fss:54:9-63:
    FileNotFound: no-such-dir-NativeHelperWriterWalk/missing.txt

The first copy run also gave today's file contents, `[line one][x][a rope in a file: abcdefghijklmnopqrstuvwxyz0123456789][buffered through a BufferedWriter of size 8][y][]`, which the test asserts. After the edit (07:19:37 UTC, the last change of code before it at 07:19, `JavaBufferedWriterObject.java`):

    harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/NativeHelperWriterWalk.fss
    OK (1 test)

The printed lines under walk, the same on the base copies and on the edit (standard error's line among them in the harness's capture):

    1 println of a literal
    2 non-ASCII through println: héllo λ → ∑
    3 stdOut.write of a flat string!
    4 a rope: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
    5 stdErr.write, on the error stream
    6 the writer side wrote and named itself       (the edit only: the base stopped before it)

`ProjectFortress/compiler_tests/NativeHelperFamilyWriterCompiled.fss` and `.test` bind `jbwOpen`, `jbwStdOut`, `jbwStdErr`, `jbwWriteString`, `jbwWriteChar`, `jbwFlush` and `jbwClose` in the program's own declarations over the prelude's `JavaBufferedWriter`, write, flush and close a file, read it back with the prelude's reader, and write a line on each standard stream, which `run_out_contains` and `run_err_contains` check. On the base (07:15:20 UTC):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyWriterCompiled.test
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.fileOps.jbwStdOut
    Failed to satisfy run_out_contains; expected
    Tests run: 2,  Failures: 2,  Errors: 0

After the edit and the library order (07:20:41 UTC): `OK (2 tests)`, with 'PASS through jbwStdOut' and 'written through jbwStdErr' printed.

`ProjectFortress/tests/XXXWriterCharSupplementaryWalk.fss`, the expected failure of row NEW-W-2, through the harness as it is and with `w.write("😀")` in place of the character (`tmp/rung-io-writer/XXXWriterCharSupplementaryWalkRed.fss`), in one call at 07:33:12 UTC:

    . interpret tmp/h3/tests/XXXWriterCharSupplementaryWalkRed
     Missing expected failure
    . interpret tmp/h3/tests/XXXWriterCharSupplementaryWalk
    FAIL: J1/0: =/= J2/0:😀; the character U+1F600 read back
     OK Saw expected exception

`ProjectFortress/tests/printing/ConcurrentPrinting.fss` at `FORTRESS_THREADS=4`, by hand: on the old code (`old-fortress.sh`) once and on the edit three times, each output equal to `test_oracle.txt` by `cmp`, 900 bytes, rc 0, nothing on standard error.

Suites, once each after the last change of code, at `3b3e83d59`:

    ant testSystem    BUILD SUCCESSFUL, Total time: 2 minutes 56 seconds; shards 190 + 188 + 191 + 188 = 757 run, 0 failures (the landed gate's 756, and my walk test)
    ant testQuick     BUILD SUCCESSFUL, Total time: 4 minutes 23 seconds; compiler 1434 (the gate's 1432 and my two cases), othercompiler 263, library 86, 0 failures

No test's verdict changed in either; F-299's refusal tests, `LongStringTests`, `FileReadWrite`, `WordCountSmall` and `FileConversion` are among those that passed. The expected failure came after both suites; its run is above.

## Old against new

`tmp/rung-io-writer/probe/WriterOldNew.fss`, under walk on the old code (`old-fortress.sh`) and on the edit: `println`, `stdOut.write` of `'é'` and of `char(119070)`, a write with no flush before a `println`, `stdErr.write` and `errorPrintln`, a file `Writer` with a character past U+FFFF read back, `print` without a newline, and a last write that nothing flushes. Standard output, standard error and the file are equal by `cmp`. Both drop the unflushed last lines and both write `char(119070)` as U+D11E (bytes `ed 84 9e`): row NEW-W-2.

## Where the fix belongs, and the precedent search

The map's section 7 (`explorations/coordinator/map/compile-path-walkthrough.md:585-641`) gives the two bindings; P-58 gives the form; walk's loader is where a declared type gets its Java carrier (F-299). The library's way for a type that both paths name and that holds a Java value is a trait of the main component with walk's native object below it (`FortressBuiltin.fss:369-376`); the existing native objects register their constructors either in `makeNativeObject` (`Int`, `FlatString`) or in their Java constructor (`Writer`, `BufferedWriter`), among the five glue classes I read, `FileWriteStream` the fifth; the second fits an object that no program makes. The ways the language and library offer, and the one taken, are in the decisions.

## The checker count and the distance

Both ran once, on `3b3e83d59`, after the last change of code was built; the later commit `85236bf98` adds a test only, which neither stage reads.

- Count (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-io-writer/checker-count-postedit.txt tmp/rung-io-writer/cc-post`): `diff` with `explorations/compile-ladder/climb-batch-26/gate/checker-count.txt` prints nothing: `#total 0`, `#locations 0`, `#crash none`. It ran from 07:29:51 to 07:31:43 UTC, 112 s. It read `fileOps` whole for the first time: the api it built, `cc-post/caches/analyzed_cache/com.sun.fortress.nativeHelpers-d13bcf6.tfi`, holds all 19 methods of `fileOps`, the ten `jbr` helpers over `FortressBufferedReader` among them, with no error.
- Distance (`explorations/coordinator/tools/distance/run.sh tmp/rung-io-writer/distance-postedit.txt tmp/rung-io-writer/dist-post`): `compare.sh` against `climb-batch-26/gate/distance.txt` prints `DISTANCE SAME   0`; `#total 0`, `#crash none`, `#seconds 153`. It read `Writer` as plain Fortress (`@@SC STAGE	api Writer	hierarchy	errors=0`, ...). `dist-post/errors.tsv` holds its header only, and `explorations/compile-ladder/gate/distance-sites.tsv` none: no site came or went.

The ladder subset of this change is empty: no file's first error in `explorations/compile-ladder/baseline-2026-09-19/raw/` or in its `ladder.tsv`, nor in `climb-batch-26/gate/ladder/ladder.tsv`, names `fileOps`, `JavaBuffered`, `FortressBuffered`, `stdOut`, `FileNotFound`, `jbw` or `Writer` (`grep -iE` over them prints nothing).

## What the specification settles

Nothing of the I/O objects: the specification names none of them (the grep above). Row NEW-W-2's character is settled by `basic/lexical-structure.tex`, "Character Literals", as row 915 reads it.

## Sentences made false

- `Specification/appendices/changes.tex:4495`, "The other 143 still name a glue class": 132; the list before it (`:4470-4494`) lacks the writer's seven bindings.
- F-32's 143 (`explorations/coordinator/FACTS.md:30`): 132; F-299's "306 of the one library's 449 live bindings" (`FACTS.md:134`): 7 more helper bindings, 11 fewer glue bindings, and its carriers lack `JavaBufferedWriter`.
- The `fortress-repo` skill's `references/interpreter.md:93-96`, "Natives": the list of carriers lacks `JavaBufferedWriter` in `FortressBufferedWriter`.
- PLAN's N4 writer line (`explorations/coordinator/PLAN.md:57`): `FileWriteStream` did not become a plain object (NEW-W-1).
- Rows 899 and 903 (fixed here); row 902's notes (a note below).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`'s comment on `builtinPrimitive` stays true.

## Points to report

- Methods changed in `StaticNativeApp`: `javaFor`, `carried`, `unbox`, `box`, and the comment of `javaForSelf(String)`; the class added, `interpreter/glue/prim/JavaBufferedWriterObject.java` with its nested `Value`; the two table entries, `NamingCzar.java:490-491`.
- The bindings moved and the two new helpers: the table above.
- `Writer.fsi` as changed (`Library/Writer.fsi:18-21`); `File.fsi` and `File.fss` unchanged; the last step, `FileWriteStream` as a `WriteStream`, not taken, and `FileWriteStream` left on its glue with its 5 bindings (NEW-W-1).
- The tests before and after, the printed lines and `ConcurrentPrinting`: above.
- The count and the distance tables: both equal to the landed gate's; `fileOps` read whole for the first time, no site came.
- No printed line changed in my tests or programs; no test's verdict changed in `ant testSystem` or `ant testQuick`.
- The review's section 2 defects: `BufferedWriter`'s `asString` repaired (row 899); the missing file through `Writer` repaired, and `FileNotFoundException` declared (row 903); a rope to `FileWriteStream` (row 900), its missing `flush` (row 901) and its missing file (row 902's note) stay, filed.
- No file edited beyond those named; no edit of the reader side, of the prelude or of the run-time classes. `Library/File.fss` was edited for one probe and restored; `git diff ed8652dc0 -- Library/File.fss` prints nothing.

## Decisions

1. `FileWriteStream` stays on its glue in this rung. Evidence: a probe `FileWriteStream` with the field `under: JavaBufferedWriter = makeJavaBufferedWriter(fileName)` inside `File` stopped, 'File.fss:67:56-62: undefined variable [$self]', since walk builds each object of a native component through a glue class and evaluates its fields once per constructor (NEW-W-1). Ways not taken: change `BuildNativeEnvironment` to build some objects of a native component as plain objects, an edit of walk outside the rung's files with no rule to tell them apart, since `Int` too has only helper bindings; move `FileWriteStream` into another component, which breaks `File`'s api; end `File`'s nativeness now, which needs `FileReadStream` off its glue, the reader rung's work (fork W3).
2. The last step, `FileWriteStream` as a `WriteStream` with its `flush` (fork W5), not taken: it needs the object plain, or one more glue binding for `flush`. Rows 900 and 901 stay.
3. The factories are `makeJavaBufferedWriter(name: FlatString)`, the prelude's name (`CompilerBuiltin.fss:1184`), and `makeJavaBufferedStdOut()` and `makeJavaBufferedStdErr()`. Not taken: the review's sketch's `javaFileWriter` and `javaStdOut`, names that no source of the team uses.
4. The native object is a private singleton, `JavaBufferedWriterObject`, whose constructor registers itself in its Java constructor, as the glue's `Writer` does. Not taken: registration in `makeNativeObject`, as `Int` and `FlatString` do, which waits for the singleton's evaluation; an object with value parameters that nothing passes. Its singleton holds no writer, since walk evaluates it at load (my first run's stop at `FortressBuiltin.fss:740`).
5. The value class is nested in the constructor's file under `interpreter/glue/prim/`. Not taken: a class of its own under `interpreter/evaluator/values/`, beside `FString`, a second file for one use.
6. The trait has `write(s: String)` in Fortress beside the native over `FlatString`, flattening in a `typecase`, F-299's pattern. Not taken: flattening in `Writer` only, which leaves the trait's own `write` of a rope to dispatch failure.
7. `Writer`'s `write(s: String)` writes the flattened string once, then flushes. Not taken: the team's `s.writeOn(BufferedWriter(self, |s|))`, which over a `BufferedWriter` that passes each write through would split a rope into its leaves, so parallel `println`s could interleave (`ConcurrentPrinting`).
8. `BufferedWriter` buffers nothing of its own: each write goes to `under`, `flush` and `close` too. Not taken: a buffer in a `var` field, which needs an `atomic` block around I/O. The glue's buffer was a `java.io.BufferedWriter` over the `Writer`'s own buffered stream; every program I ran prints and writes the same bytes. `size` stays its field.
9. `Writer`'s api drops `getter fileName()`: the value parameter gives the getter. Not taken: both, a getter and a value parameter of one name in a plain object.
10. `FileNotFoundException` is a singleton below `CheckedException` with `asString` "File not found", as `IOFailure` is (fork W4). Not taken: the prelude's form with a message, which walk's raise by name cannot fill.
11. The excludes clause names `Char` where the prelude names `Character`, the one library's name for the type. Not taken: no clause.
12. No `throws` clause on the trait's methods, as the library raises `IOFailure` and `CastError` without one. Not taken: the prelude's `throws IOException`, a type the one library lacks.
13. `Writer(fileName: String)` flattens the name by a `typecase` and fails on a string that `asFlatString` leaves not flat, the library's form. Not taken: a factory over `String` in `FortressLibrary`, which adds a public name.
14. The defect of a character past U+FFFF goes to home 2, an `XXX` walk test, since `lexical-structure.tex` settles what a `Char` is (row 915's citation). Not taken: home 3, a row only.

## Defects and their homes

- `BufferedWriter`'s `asString` stops (row 899): home 1, `NativeHelperWriterWalk`'s assert of `b.asString`.
- No `FileNotFoundException` in the one library, and a missing file through `Writer` that no `catch` sees (row 903; row 902's `Writer` half): home 1, the test's `catch`.
- `FileWriteStream` cannot become a plain object while `File` is native (NEW-W-1): home 3, a row only, since no program shows it but an edit of the library.
- A rope written to a `FileWriteStream`, and its missing `flush` (rows 900, 901): home 3, rows on record; the walk run stops, so no gated test can pass while they show. Row 901 takes a note.
- A missing file through `FileWriteStream` (row 902's sibling): home 3, a note on row 902.
- A `Char` past U+FFFF written through a `Writer` (NEW-W-2): home 2, `XXXWriterCharSupplementaryWalk`, and a row.

## The relayed request

The run's relayed request corrects a sentence on deleting a branch from a cloud container. No file this rung edits holds it; I made no edit for it.
