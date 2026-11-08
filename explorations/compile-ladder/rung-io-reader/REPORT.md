# Rung R, climb batch 28: the reader objects over a Java-backed `JavaBufferedReader`, and `File` and `Reader` plain components (P-164)

- problem: every file a program reads goes through `FileReadStream`, an object of the native component `File` whose 10 methods name glue classes that only walk can call (base `Library/File.fss:12-63`), as microGPT's data does (`explorations/run-c4/src/FlatData.fss:69-86`); `Reader` and `stdIn` the same, 10 more (base `Library/Reader.fss:12-61`); `FileWriteStream`'s 5 stayed on glue, a rope stops it and it has no `flush` (rows 926, 900, 901); a missing file stops the run with an error that no `catch` sees (row 902; `explorations/reviews/io-objects-carrier-2026-11-06.md:111-162`).
- spec: none; `grep -rn 'FileReadStream\|FileWriteStream\|JavaBufferedReader\|stdIn' Specification/` prints nothing, and `JavaBufferedWriter` only in Appendix I's natives effect (`Specification/appendices/changes.tex:4647`).
- precedent: rung W's writer objects over a field (`Library/Writer.fss:17-36`) and its native object below the trait (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:788-791`, `interpreter/glue/prim/JavaBufferedWriterObject.java`); the team's later `FileReadStream` over a Java reader in a field (`ProjectFortress/BirdyLib/File.fss:20-34`); the prelude's reader trait (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:592-601`).
- deviation: the trait's methods have no `throws` clause, as `JavaBufferedWriter`'s (`Library/FortressLibrary.fsi:1270-1279`); `read()` answers `Char` for the prelude's `Character`, and the streams' `uncheckedReadChar` maps the end's 0 to -1 by `eof` (`Library/File.fss:37-40`, `Library/Reader.fss:37-40`); `FileWriteStream` keeps the team's `write(x:String) = x.writeOn(self)`, `writes`, `print` and `println`, where `Writer` flattens and flushes (`Library/File.fss:56-67`, `Library/Writer.fss:32-35`); the api headers drop the explicit `getter fileName()`, now the value parameter (`Library/File.fsi:19`, `:101`, `Library/Reader.fsi:19`); `File` imports `Stream.{ WriteStream }` by name (`Library/File.fss:15`); the compiled guard leaves the raise after `consume` to an expected failure (NEW-R-1; `ProjectFortress/compiler_tests/XXXFileOpsRaiseCaughtCompiled.fss`).
- historical: Library/File.fss, Library/File.fsi, Library/Reader.fss, Library/Reader.fsi, Library/FortressLibrary.fss, Library/FortressLibrary.fsi, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java (`interpreter/glue/StaticNativeApp.java` is the revival's; `interpreter/glue/prim/JavaBufferedReaderObject.java` is new).

## What changed and why

Commits on `wip/rung-io-reader`: `f27f6013` (the two tests, failing on the base), `14be0d36` (the change, the compiled guard's final form and the expected failure `XXXFileOpsRaiseCaughtCompiled`), then this report.

- `Library/FortressLibrary.fss:1959-1968`, `.fsi:1265-1279`: `trait JavaBufferedReader` gains the prelude's eight methods, each a public native in P-58's form on its `fileOps` helper; `.fss:1976-1979`, `.fsi:1284-1285`: `makeJavaBufferedReader(name: FlatString)` on `jbrOpen` and `makeJavaBufferedStdIn()` on the new `jbrStdIn`, after `makeJavaBufferedStdErr` (fork R4). The api's comment says what the reader answers at the end and after `consume`.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java:96-99`, beside `jbwStdErr`: `public static FortressBufferedReader jbrStdIn()`, a `FortressBufferedReader` named `<stdin>` over a `java.io.BufferedReader` over an `InputStreamReader` of `System.in` in UTF-8, made at each call, as the glue's `inputReader` reads `System.in` in UTF-8 (`interpreter/glue/prim/Reader.java:268-272`, `:57`).
- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:793-796`, right after `JavaBufferedWriterObject`: `private object JavaBufferedReaderObject extends JavaBufferedReader end`. Its native constructor is the new `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/JavaBufferedReaderObject.java`, rung W's `JavaBufferedWriterObject.java` with the reader's names: it registers itself in its Java constructor, and its nested `Value` holds a `FortressBufferedReader`; the singleton that walk makes holds none and no helper is passed it.
- `ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java`, four methods: `javaFor` carries `JavaBufferedReader` by name in `FortressBufferedReader` (`:71`, its comment `:55-58`), `carried` admits that class (`:104`), `unbox` takes the reader out of a `JavaBufferedReaderObject.Value` (`:300-303`), `box` makes one (`:327`); two imports (`:4`, `:13`). `javaForSelf(String)` falls through to `javaFor`, unchanged.
- `Library/File.fss` and `.fsi`: `component File`, no longer native, and without the glue's `language` and `package`. `object FileReadStream(fileName: String, under: JavaBufferedReader) extends { ReadStream, FileStream }` (`.fss:23-45`): `asString` is the glue's text, `"<Read handle to \"" || fileName || "\">"` (fork R5); `eof`, `ready`, `whenUnconsumed`, `consume`, `uncheckedReadLine`, `uncheckedRead(k)` and `close` call `under`; `uncheckedReadChar` reads `under.read()` and answers -1 where `under.eof()` is then set, else the character's `codePoint` (fork R1), so `ReadStream`'s `eofCheckedReadChar` and `characters` keep the -1 (`Library/FileSupport.fss:64-67`, `:113-118`). Its factory `FileReadStream(filename: String)` (`.fss:18-21`) flattens the name by a `typecase` on `asFlatString` and calls `makeJavaBufferedReader`, as `Writer(fileName)` does (`Library/Writer.fss:20-23`). `object FileWriteStream(fileName: String, under: JavaBufferedWriter) extends { FileStream, WriteStream }` (`.fss:52-70`): its two primitive writes, a new `flush` and `close` call `under`; the team's `write(x:String) = x.writeOn(self)`, `write(x:Any)`, `writes`, `print` and `println` stay as they were; a rope now writes itself on it, since it is a `WriteStream` (rows 900, 901; fork R2). Its factory likewise. `File` imports `Stream.{ WriteStream }`, by name, since `FileSupport` and `Stream` both declare `Closeable`, `FileStream` and `Consumable` (`Library/FileSupport.fsi:18-29`, `Library/Stream.fsi:19-32`).
- `Library/Reader.fss` and `.fsi`: `component Reader`, no longer native, and without its exported `language` and `package` variables. `stdIn: Reader = Reader("<stdin>", makeJavaBufferedStdIn())` (`.fss:17`); the factory `Reader(fileName: String): Reader` (`.fss:19-22`, `.fsi:17`); `object Reader(fileName: String, under: JavaBufferedReader)` (`.fss:24-45`), still outside `ReadStream` as the team left it, with `asString` "Reader on " and the name's `asExprString`, `isReady` on `under.ready()`, and the same `uncheckedReadChar`.
- 25 glue bindings go, all of `File.fss` and `Reader.fss`; 10 helper bindings come, all in `FortressLibrary.fss`. By `tmp/rung-io-reader/count/countbind.py` (comments stripped, the compiler's four files left out): the base build 'helper 341 glue 102 total 443', the edit 'helper 351 glue 77 total 428'. With rung W's 11, P-164's 36 glue bindings are gone. The glue classes stay in the tree, named by no string (fork R3).

### The bindings moved, with their helpers

| binding | before | after | Java signature |
|---|---|---|---|
| a file's reader | the glue constructor `FileReadStream`, `Reader` | `makeJavaBufferedReader(name: FlatString)` | `static FortressBufferedReader jbrOpen(String) throws FException` |
| `stdIn`'s reader | `Reader$inputReader` | `makeJavaBufferedStdIn()` | `static FortressBufferedReader jbrStdIn()` (new) |
| `read(): Char` | `FileReadStream$readChar`, `Reader$readChar` | `JavaBufferedReader.read()` | `static int jbrRead(FortressBufferedReader) throws FException` |
| `readLine(): String` | `…$readLine` | `JavaBufferedReader.readLine()` | `static String jbrReadLine(FortressBufferedReader) throws FException` |
| `readk(k: ZZ32): String` | `…$readk` | `JavaBufferedReader.readk(k)` | `static String jbrReadk(FortressBufferedReader, int) throws FException` |
| `eof(): Boolean` | `…$eof` | `JavaBufferedReader.eof()` | `static boolean jbrEof(FortressBufferedReader)` |
| `ready(): Boolean` | `…$ready` | `JavaBufferedReader.ready()` | `static boolean jbrReady(FortressBufferedReader) throws FException` |
| `close(): ()` | `…$close` | `JavaBufferedReader.close()` | `static void jbrClose(FortressBufferedReader) throws FException` |
| `whenUnconsumed(): ()` | `…$whenUnconsumed` | `JavaBufferedReader.whenUnconsumed()` | `static void jbrWhenUnconsumed(FortressBufferedReader) throws FException` |
| `consume(): ()` | `…$consume` | `JavaBufferedReader.consume()` | `static void jbrConsume(FortressBufferedReader) throws FException` |
| `fileName` (3 objects) | `FileReadStream$fileName`, `FileWriteStream$fileName`, `Reader$fileName` | the value parameter | none |
| `asString` (2 objects) | `FileReadStream$toString`, `FileWriteStream$toString` | Fortress text over `fileName` | none |
| `FileWriteStream`'s `write` twice, `close` | `FileWriteStream$write`, `$close` | `under.write(s)`, `under.write(c)`, `under.close()` on rung W's `jbwWriteString`, `jbwWriteChar`, `jbwClose` | (rung W's) |
| `FileWriteStream.flush()` | none (row 901) | `under.flush()` on `jbwFlush` | (rung W's) |

The methods that became Fortress text: `FileReadStream`'s and `Reader`'s nine each (`asString` of `FileReadStream`, and of both `eof`, `ready`/`isReady`, `whenUnconsumed`, `consume`, `uncheckedReadLine`, `uncheckedReadChar`, `uncheckedRead`, `close`), `FileWriteStream`'s `asString`, two `write`s, `flush` and `close`, the three factories and `stdIn`.

### The api headers, before and after

| file | before | after |
|---|---|---|
| `Library/File.fsi:19` | `object FileReadStream(filename:String) extends { FileStream, ReadStream }` with `getter fileName():String` | `object FileReadStream(fileName: String, under: JavaBufferedReader) extends { FileStream, ReadStream }` |
| `Library/File.fsi:101` | `object FileWriteStream(fileName:FlatString) extends { FileStream }` with `getter fileName(): String` | `object FileWriteStream(fileName: String, under: JavaBufferedWriter) extends { FileStream, WriteStream }` |
| `Library/File.fsi:15` | (none) | `import Stream.{ WriteStream }` |
| `Library/File.fsi:17`, `:99` | `FileReadStream(filename: String): FileReadStream`, `FileWriteStream(fileName:String): FileWriteStream` | unchanged |
| `Library/Reader.fsi:17` | (none) | `Reader(fileName: String): Reader` |
| `Library/Reader.fsi:19` | `object Reader(fileName: String) (* extends ReadStream *)` with `getter fileName(): String` | `object Reader(fileName: String, under: JavaBufferedReader) (* extends ReadStream *)` |

## Tests: the failing runs and the passing runs

`ProjectFortress/tests/NativeHelperReaderWalk.fss` writes a file through `FileWriteStream` (a flat string, two characters, a rope past 32 characters, a `flush`, then a read of the first line before the close), reads it back through `FileReadStream` (`readLine`, `readChar`, `read(5)`, `eof`, `ready`, each object's `asString` and `fileName`, `readLine` `""`, `uncheckedReadChar` -1, `readChar` `char(0)` and `read(4)` `""` at the end, `eof` after `close`), counts `lines()` and `characters()`, catches `IOFailure` on a read after `consume`, reads it through a `Reader` (`isReady`, `uncheckedReadChar` 97, `uncheckedReadLine`, `uncheckedRead(4)`, `IOFailure` after `consume`, -1 and `""` at the end), asserts `stdIn`'s `fileName` and `asString`, and catches `FileNotFoundException` at a missing file through each of the three objects. On the base, through the harness, before any edit (03:33:25 UTC):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-io-reader/h-base ProjectFortress/tests/NativeHelperReaderWalk.fss
    com.sun.fortress.exceptions.ProgramError: com.sun.fortress.exceptions.ProgramError: Library/File.fss:79:26-38:
    Unification error: Closure/Constructor for writeOn param 1 (stream:WriteStream) got arg <Write handle to "NativeHelperReaderWalk.out"> of type FileWriteStream
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

A run stops at its first walk error, so three copies of the test, each with the earlier stop's line changed (`tmp/rung-io-reader/variants/v1` to `v3`: the rope written as `rope.asFlatString`; then without the `flush` and the early read; then without the two asserts after `consume`), show the later stops through the harness on the base (03:33:56, 03:34:07, 03:34:19 UTC):

    harness-one.sh $PWD/tmp/rung-io-reader/h-base-v1 tmp/rung-io-reader/variants/v1/NativeHelperReaderWalk.fss
    Cannot find definition for method flush given receiver <Write handle to "NativeHelperReaderWalk.out">
    harness-one.sh $PWD/tmp/rung-io-reader/h-base-v2 tmp/rung-io-reader/variants/v2/NativeHelperReaderWalk.fss
    Performed operation on consumed FileReadStream NativeHelperReaderWalk.out
    harness-one.sh $PWD/tmp/rung-io-reader/h-base-v3 tmp/rung-io-reader/variants/v3/NativeHelperReaderWalk.fss
    FileNotFound: no-such-dir-NativeHelperReaderWalk/missing.txt

The third copy passed every other assert on the base, the reads, the -1 at the end, the counts, `Reader`'s and `stdIn`'s among them: the values the test asserts are the glue's. On the edit, after its last change of code (the harness at 03:45:15 UTC, `14be0d36`), with the guards:

    harness-one.sh $PWD/tmp/rung-io-reader/h-guards ProjectFortress/tests/NativeHelperReaderWalk.fss ProjectFortress/tests/NativeHelperWriterWalk.fss ProjectFortress/tests/FileReadWrite.fss ProjectFortress/tests/WordCountSmall.fss ProjectFortress/tests/FileConversion.fss ProjectFortress/tests/LongStringTests.fss
    . interpret tmp/rung-io-reader/h-guards/tests/NativeHelperReaderWalk
    the reader side read its file back
     OK (time = 636ms)
    OK (6 tests)

`ProjectFortress/compiler_tests/NativeHelperFamilyReaderCompiled.fss` and `.test` bind `jbrOpen`, `jbrStdIn`, `jbrAsString`, `jbrRead`, `jbrReadLine`, `jbrReadk`, `jbrEof`, `jbrReady`, `jbrClose`, `jbrWhenUnconsumed` and `jbrConsume` in the program's own declarations over the prelude's `JavaBufferedReader`, on a file that the prelude's writer writes: `jbrRead` answers 98, then 0 at the end with `eof` set, `readk` 3 and 0 (the rest), `readLine` and `readk` `""` at the end, a `consume` and a read after it, `eof` after `close`, and `jbrStdIn`'s name. On the base through `junit.sh` (03:34:38 UTC), and in its final form on the old code through `old-fortress.sh … junit` (03:42:29 UTC):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyReaderCompiled.test
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.fileOps.jbrStdIn
    Failed to satisfy run_out_contains; expected
    Tests run: 2,  Failures: 2,  Errors: 0

Its first form also asserted the refusal after `consume`, which a `catch` was to see as `IOFailure`. On the edit that run died: 'com.sun.fortress.compiler.runtimeValues.FortressImplementationError: fortress.CompilerBuiltin$IOFailure.<init>(java.lang.String)' (`tmp/rung-io-reader/junit-new1.txt`). That is a defect of the compiled run time on the base too (NEW-R-1, below), so the guard asserts the read after `consume` and the refusal went to the expected failure `XXXFileOpsRaiseCaughtCompiled` (its `.fss`, `XXXFileOpsRaiseCaughtCompiled.test` with `run` and `run_out_contains=REACHED`, `FileOpsRaiseCaughtCompiledLink.test` with `link`). On the edit, after the last change of code (03:41:52 UTC):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh new2 ProjectFortress/compiler_tests NativeHelperFamilyReaderCompiled.test NativeHelperFamilyWriterCompiled.test FileOpsRaiseCaughtCompiledLink.test XXXFileOpsRaiseCaughtCompiled.test
    . run ProjectFortress/compiler_tests/XXXFileOpsRaiseCaughtCompiled (246ms) REACHED
    com.sun.fortress.compiler.runtimeValues.FortressImplementationError: fortress.CompilerBuiltin$IOFailure.<init>(java.lang.String)
    Saw expected failure (Exit code != 0)
    OK (6 tests)

The expected failure, red on a deliberate change for one run (the `rConsume(r)` line removed and the assert negated, then the file restored; `cmp` with the kept copy prints nothing):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh red ProjectFortress/compiler_tests FileOpsRaiseCaughtCompiledLink.test XXXFileOpsRaiseCaughtCompiled.test
    . run ProjectFortress/compiler_tests/XXXFileOpsRaiseCaughtCompiled (314ms) REACHED
    Did not see expected failure
    Tests run: 2,  Failures: 1,  Errors: 0

The old code gives the same expected failure (`old-fortress.sh … junit`, 03:42:29 UTC: 'Saw expected failure (Exit code != 0)').

The guards. `FileReadWrite`, `WordCountSmall`, `FileConversion`, `LongStringTests` and `NativeHelperWriterWalk` pass on the edit (above); they passed in climb batch 27's gate (`explorations/compile-ladder/climb-batch-27/gate/summary.txt:57-60`). `NativeHelperFamilyWriterCompiled` passes on the edit (above). `ProjectFortress/tests/printing/ConcurrentPrinting.fss` at `FORTRESS_THREADS=4`, run from `ProjectFortress/` on the old code (`old-fortress.sh`) and on the edit: rc=0 each, and `cmp` of each output with `tests/printing/test_oracle.txt` prints nothing ('old = oracle', 'new = oracle'). At one thread, run directly from `ProjectFortress/` (`FORTRESS_THREADS=1 ../bin/fortress tests/X.fss`), `NativeHelperReaderWalk`, `FileReadWrite` and `WordCountSmall` exit 0 with no 'fail' in their output; the harness and the suites ran them at four.

The suites, once each on `14be0d36`, after the last change of code:

    ant testSystem    BUILD SUCCESSFUL, Total time: 4 minutes 20 seconds; shards 197, 190, 197, 195 = 779, 0 failures
    ant testQuick     BUILD SUCCESSFUL, Total time: 6 minutes 45 seconds; compiler 1451, library 86, othercompiler 263, 0 failures

Against climb batch 27's gate (`summary.txt:2-3`, `:55`, `:57-60`): system 778 to 779 (`NativeHelperReaderWalk`), compiler 1447 to 1451 (the guard's link and run, the expected failure's link and run), library and othercompiler the same. No test's verdict changed.

MicroGPT's quick pair (`explorations/coordinator/tools/mg-run.sh tmp/rung-io-reader/mg quick`): 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', rc=0 secs=40 for the flat program and 45 for the APL, the flat program's loader and corpus lines 'diff 0.0 PASS'. Run on the old code too (`old-fortress.sh` from each program's folder), every printed line is the same but the timings and, for the APL, the paths of the parser directories: no printed line of the quick check changes.

The team demos, by the driver of `explorations/compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out" (`bash tmp/run-demos.sh tmp/rung-io-reader/demos`, on `14be0d36`, from about 04:00 to 04:27:37 UTC): 'demos: 52 run, 52 reached their end'. 25 of them import `File` or `Reader` or name `stdIn`, `FileReadStream` or `FileWriteStream`, the `BirdCount` series, `wordcount`, `wordcount2`, `tennisRanking`, `tictactoe` and `newtictactoe` (each a `FileReadStream` on `/dev/stdin`, at its end, since the driver gives `/dev/null`) among them. `tennisRanking` writes the file named by its second argument; written again by the old code (`old-fortress.sh`, the second argument a file under `tmp/`), its 52 lines differ from the new run's only in line 6, which names that argument.

## Old against new

28 probes under walk, one operation each, on the old code (`old-fortress.sh`) and on the edit (`tmp/rung-io-reader/probes/run.sh old|new`, each answer in `old.tsv`, `new.tsv`), over a file holding `alpha` and `beta`:

| case | old | new |
|---|---|---|
| at the end, `FileReadStream` | `readLine=""`, `readChar=0`, `uncheckedReadChar=-1`, `read(3)=""`, `eof=true`, `ready=false` | the same |
| at the end, `Reader` | `uncheckedReadLine=""`, `uncheckedReadChar=-1`, `uncheckedRead(3)=""`, `eof=true`, `isReady=false` | the same |
| after `consume`: `readLine`, `readChar`, `read(3)`, `consume` again (`FileReadStream`); `whenUnconsumed`, `consume` again (`Reader`) | stops: 'Performed operation on consumed FileReadStream …' | raises `IOFailure`; uncaught, the run stops printing 'IOFailure' |
| after `consume`: `uncheckedReadLine` (both) | `"alpha"` | `"alpha"` |
| after `close`: `readLine`, `read(3)` (`FileReadStream`); `uncheckedReadLine`, `uncheckedRead(3)` (`Reader`) | stops: 'Read IOException on <…>', '<…>.read(3) IO error.' | `""` |
| after `close`: `readChar`; `uncheckedReadChar` (both) | stops: 'Read IOException on <…>' | `char(0)`; -1 |
| after `close`: `ready`, `isReady` | stops: 'Ready IOException on <…>', 'Read IOException on <…>' | raises `IOFailure` |
| after `close`: `eof`; `close` again | `true`; quiet | the same |
| a missing file: `FileReadStream`, `Reader`, `FileWriteStream` | stops: 'FileNotFound: …' | raises `FileNotFoundException`; uncaught, prints 'FileNotFoundException' |
| `FileWriteStream` after `close`: `write("x")`, `write('c')` | stops: 'Write IOException on <Write handle to …>' | raises `IOFailure` |
| `FileWriteStream` after `close`: `close` again | quiet | quiet |

The printed texts that change are these stops' messages: walk's 'FileNotFound: NAME', 'Performed operation on consumed FileReadStream NAME', 'Read IOException on <…>', 'Ready IOException on <…>', '<…>.read(k) IO error.' and 'Write IOException on <…>' become the exception's name, `FileNotFoundException` or `IOFailure`, with no message (item 384's default). The objects' `asString` texts are the glue's (`NativeHelperReaderWalk`).

A program's own object below the reader trait, `object Fake extends JavaBufferedReader end` with `Fake.readLine()` (`tmp/rung-io-reader/fake/FakeReaderProbe.fss`): 'No Java FortressBufferedReader carries Fake', rc=1, as row 928 has it for the writer trait.

## Where the fix belongs, and the precedent search

The map (`explorations/coordinator/map/modules-and-phases.md:441-456`, "B.12 Native code and Java interop") puts walk's binding of a helper in `StaticNativeApp`, which is where a declared type gets its Java carrier (F-299); P-58 gives the binding's form; P-164 gives the shape. The precedent is rung W's writer side, which repaired the same kind of site in `Writer.fss`, both of its objects (`Writer`, `BufferedWriter`); its file has no other site. The sites of the same kind left in the one library: in `File.fss` two (`FileReadStream`, `FileWriteStream`) and in `Reader.fss` one (`Reader`, with `stdIn`), all three repaired here; after this change no I/O object names a glue class, and the native components left are `FlatString`, `Reflect`, `AnyType`, `FortressBuiltin` and `NativeArray` (`grep -ln '^native component' Library/*.fss ProjectFortress/LibraryBuiltin/*.fss`).

The ways the language and the library offer, and the choice:

- A Java-backed value in a field of a plain object, as P-164 takes: chosen, as `Writer` and the team's `BirdyLib` `FileReadStream` do.
- The object keeps one value parameter and fills a field from the name, as `BirdyLib` does (`jbr: JavaBufferedReader = makeJavaBufferedReader(filename)`): then `stdIn` would need an object of its own, since its reader is not opened by a name (fork W2's reasoning in rung W; R7 takes the two-parameter header).
- Each method a `builtinPrimitive` in the object itself, over a helper that takes the object: not taken, since no Java type carries a program object (`interpreter.md`, "Natives") and P-164 puts the natives on the trait.
- The end's -1 by a fourth new helper beside `jbrRead`: not taken (fork R1); by `read(): ZZ32`: not taken, it leaves the prelude's method.
- `FileWriteStream`'s `write(s: String)` as `Writer`'s, `under.write(s)` then `under.flush()`, or inheriting `WriteStream`'s `writes`, `print` and `println`, which flush after each: not taken; the team's own text of `FileWriteStream` already writes through `writeOn` and only lacked `WriteStream` and `flush` (rows 900, 901), so the change keeps its lines and their buffering.

## The checker count and the distance

Both ran once, on `14be0d36`, the final code, after its build; no change of code followed either (the later commit adds this report and `record.md` only, which neither stage reads). Their befores are climb batch 27's gate tables.

- Count (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-io-reader/checker-count-postedit.txt tmp/rung-io-reader/cc-post`, 04:29:30 to 04:31:18 UTC, 108 s): `diff` with `explorations/compile-ladder/climb-batch-27/gate/checker-count.txt` prints nothing: `#total 0`, `#locations 0`, `#crash none`, each of its 14 apis 0. It checked the reader trait's ten new bindings against `fileOps`: the api it built for the helpers, `cc-post/caches/analyzed_cache/com.sun.fortress.nativeHelpers-d13bcf6.tfi`, holds `jbrStdIn` beside the other `jbr` helpers, with no error. Its apis do not include `File` or `Reader`.
- Distance (`explorations/coordinator/tools/distance/run.sh tmp/rung-io-reader/distance-postedit.txt tmp/rung-io-reader/dist-post`, 04:31:31 to 04:34:30 UTC, `#seconds 167`): `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-27/gate/distance.txt tmp/rung-io-reader/distance-postedit.txt` prints `DISTANCE SAME   0`; `#total 0`, every kind 0. `dist-post/errors.tsv` holds its header only, as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site came or went.
- The crash rows: the distance's two, the same as the gate's, both in value object `Char` (row 929's), which this change does not touch (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:661-773`; the new native object is at `:793-796`):

      #crash	decl	ObjectDecl FortressBuiltin.fss:661:1-773:2	IllegalArgumentException	Comparison method violates its general contract!
      #crash	stage	component FortressBuiltin leftover	InterpreterBug	** bug! Result of typechecking still contains intermediate nodes. Component at FortressBuiltin.fss:12.1

  The count has none (`#crash none`). I declare none.

The ladder subset: the microGPT phase alone (decision 11), its drivers copied under `tmp/rung-io-reader/ladder/` as `gate.md`, "The ladder regression", gives them, with a copy of the tree's caches: its 18 components' phases and first errors equal those of `explorations/compile-ladder/climb-batch-27/gate/ladder/microgpt-phase.md` (a `diff` of the table's file, phase and first-error columns prints nothing); `FlatData.fss` and `FlatData2.fss`, which import `File`, stop where they did, 'Char is undefined.'.

## What the specification settles

Nothing of the I/O objects: the specification names none of them (the grep above). NEW-R-1 is settled by `basic/expressions/try.tex`, "Try Expressions": an expression of the `try` block that completes abruptly by throwing an exception has its value bound and matched against the `catch` clause; the helper's code throws `IOFailure` (`compiler/runtimeValues/FortressBufferedReader.java:119-121`), and the compiled run instead ends in a Java error.

## Sentences made false

- `Specification/appendices/changes.tex:4625`, "341 of the 443 bindings of \library\ name a helper": 351 of 428; the list after it (`:4626-4651`) names `JavaBufferedWriter`'s four methods and three factories (`:4646-4648`) and not `JavaBufferedReader`'s eight and two; `:4658`, "The other 102 still name a glue class": 77. The gather writes the merged count (fork 5).
- F-330 (`explorations/coordinator/FACTS.md:153`): "`FileWriteStream` stays on its glue: under walk no object of a native component holds a field." It now holds its writer in a field; and its citation `interpreter/glue/StaticNativeApp.java:67` is now `:70`.
- F-299 (`FACTS.md:134`): "341 of the one library's 443 live bindings name one", "`JavaBufferedWriter`'s 7 (F-330)" and "the other 102 name glue classes": 351 of 428, the reader trait's 10 with them, and 77.
- F-32 (`FACTS.md:30`): "102 of the one library's 443 live native bindings still name" a glue class: 77 of 428.
- P-164 (`explorations/coordinator/POSITIONS.md:73`): "The writer side, with `stdOut`, moves before the reader side." as a statement of what is to come: both sides have moved; "Their 36 glue bindings go" is now done.
- PLAN's N4 reader line (`explorations/coordinator/PLAN.md:54`), as a step to come: done, with the guard's refusal after `consume` moved to NEW-R-1's expected failure.
- The `fortress-repo` skill's `references/interpreter.md:98`, "Natives", its list of carriers: `JavaBufferedReader`, the library's reader trait, is carried in `compiler/runtimeValues/FortressBufferedReader`, which the checker reads back as `JavaBufferedReader`, beside `JavaBufferedWriter`. Its part on how walk raises a helper's exception (`interpreter.md`, "Natives", the last paragraph) holds under walk; on the compiled path a helper's raise with a message is NEW-R-1.
- Rows 926, 900, 901, 902 (closed here); row 928 (rewritten); row 927's citation `fileOps.java:100` (now `:105`, a note).
- PROBES.md's probe 5 (`explorations/compile-ladder/plan-28/PROBES.md:126-132`), "a read after `consume` raises in both, … the helper `IOFailure`", by reading: on the compiled path the helper's raise is a `FortressImplementationError` that no `catch` sees (NEW-R-1).

## Points to report

- Methods changed in `StaticNativeApp`: `javaFor` (`:71`, comment `:55-58`), `carried` (`:104`), `unbox` (`:300-303`), `box` (`:327`), and two imports; the class added under `interpreter/`: `interpreter/glue/prim/JavaBufferedReaderObject.java` with its nested `Value`; the new helper `public static FortressBufferedReader jbrStdIn()` (`nativeHelpers/fileOps.java:96-99`).
- The bindings moved with their helpers, and the methods that became Fortress text: the tables above.
- `File.fsi` and `Reader.fsi` as changed, each header before and after: the table above.
- The answers at the end, after `consume`, after `close` and at a missing file, old against new, and each printed text that changes: "Old against new".
- The tests before and after through the harness and `junit.sh`, the guards, and `ConcurrentPrinting` at four threads on the old code and the new: "Tests".
- The count and the distance tables on the final tree, `14be0d36`: both equal to climb batch 27's gate (count `#total 0`, `#crash none`; distance `DISTANCE SAME   0`); no site came; the distance's two crash rows in value object `Char` stay where they were.
- No test's verdict changed in `ant testSystem` or `ant testQuick`.
- Every sentence made false: the list above; rows 900, 901, 902 and 926 closed, row 928 rewritten (`record.md`).
- Files edited beyond those named: the compiled expected failure's three files (`ProjectFortress/compiler_tests/XXXFileOpsRaiseCaughtCompiled.fss`, `.test`, `FileOpsRaiseCaughtCompiledLink.test`), tests of a defect that the guard met; no edit of the prelude, of the run-time classes (`compiler/runtimeValues/`), of `NamingCzar.java`, of the glue classes or of the writer side's text (`Library/Writer.fss`, `Writer.fsi` and `FortressLibrary`'s `JavaBufferedWriter` unchanged).
- A defect of the run time found and not repaired, since an edit of a run-time class is reserved: NEW-R-1.

## Decisions

1. **`FileWriteStream` keeps the team's `write(x:String) = x.writeOn(self)`, `write(x:Any)`, `writes`, `print` and `println`; only its primitive writes, `close` and the new `flush` call `under`.** Not taken: `Writer`'s `write(s: String)`, which flattens and flushes (`Library/Writer.fss:32-35`); dropping the object's own `writes`, `print` and `println` for `WriteStream`'s, which flush after each call (`Library/Stream.fss`, `print` and `println`). Evidence: rows 900 and 901 need only `WriteStream` and `flush`; the team's text already writes a rope through `writeOn` (`Library/String.fss:163`, `:493-498`); the brief's "its writes, flush and close over `under`" holds for the primitive writes. No decision of the curator covers the rest; I read fork R2 as asking for `WriteStream` and `flush`.
2. **`File` imports `Stream.{ WriteStream }` by name, in the component and the api.** Not taken: `import Stream.{...}`, which would make `Closeable`, `FileStream` and `Consumable` ambiguous, since `FileSupport` declares its own (`Library/FileSupport.fsi:18-29`, `Library/Stream.fsi:19-32`); `import Stream.{...} except {...}`. Evidence: the declarations named.
3. **The compiled guard asserts no refusal after `consume`; an expected failure pair holds it (NEW-R-1, home 2).** Not taken: repairing `Utility.makeFortressException` (`compiler/runtimeValues/Utility.java:28-43`), a run-time class, which the brief reserves; keeping the assert in the guard, which would be red; home 3, a ledger row only, since `try.tex` settles that a thrown exception is caught. Evidence: the junit runs above, `javap` of the prelude's `IOFailure`.
4. **The api headers drop the explicit `getter fileName()` of the three objects, now their value parameter.** Not taken: a getter beside a value parameter of another name, as `BirdyLib` does (`filename` with `getter fileName`), which R7's headers do not take. Evidence: `Library/Writer.fsi:18-21` (rung W's form); walk takes the value parameter for `FileStream`'s abstract getter (`NativeHelperReaderWalk`'s `r.fileName`, `w.fileName`).
5. **The factories flatten by a `typecase` on `asFlatString` and call the trait's factory, as `Writer(fileName)` does.** Not taken: the old factories' `FileReadStream(filename.asFlatString)`, whose argument's static type is `String`, not the `FlatString` that `makeJavaBufferedReader` takes. Evidence: `Library/Writer.fss:20-23`; `Library/FortressLibrary.fsi:1284`.
6. **`jbrStdIn` stands beside `jbwStdErr`, as the brief places it.** Not taken: beside `jbrOpen`, the reader's own helpers. Evidence: the brief, "beside `jbwStdErr` (:91-94)".
7. **The trait's methods have no `throws` clause.** Not taken: the prelude's `throws IOException` (`CompilerBuiltin.fsi:593-600`); the one library declares no `IOException` trait and `IOFailure` is an object, and `JavaBufferedWriter`'s methods have none (`Library/FortressLibrary.fsi:1257-1263`).
8. **The base's three later stops are shown by three copies of the test through the harness, each with the earlier stop's line changed.** Not taken: one test per defect, three more gated files for one change; showing only the first stop. Evidence: a walk error stops the run, so one run shows one stop.
9. **`StaticNativeApp`'s `javaForSelf(String)` comment is left as it was, though it names only `JavaBufferedWriter`.** Not taken: naming the reader there too, an edit of a fifth method, which the brief's "the four methods, only" leaves out. The comment stays true.
10. **The demo driver ran on this rung's tree, though the gather runs the demos on the merged tree.** Not taken: leaving them to the gather. Evidence: `tests-running.md`, "Outside the gate", asks a change of walk and of the library to run it; 25 of the 52 demos import `File` or `Reader` or name `stdIn`, `FileReadStream` or `FileWriteStream`.
11. **The ladder subset is the microGPT phase only.** Not taken: an empty subset by the rule's letter, since no file's first error names what the change touched; the 85 programs, none of which imports `File`, `Reader`, `FileSupport`, `Stream` or `Writer`. Evidence: no first error in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`, its `raw/`, or `climb-batch-27/gate/ladder/ladder.tsv` names `fileOps`, `JavaBuffered`, `FileReadStream`, `FileWriteStream`, `Reader`, `stdIn` or `FileSupport` (`grep -i -E` over them prints nothing), and no program of `pass-list.txt` imports the edited apis; `FlatData.fss` and `FlatData2.fss` of the microGPT phase import `File`.
12. Forks R1 to R7 at their defaults: R1 `read(): Char` on `jbrRead` with the -1 in Fortress; R2 `FileWriteStream` a `WriteStream` with `flush`; R3 the glue classes stay; R4 the factories' names, `stdIn` over `makeJavaBufferedStdIn()`; R5 the texts kept; R6 the library's exceptions; R7 the headers, with `FileReadStream(filename: String)`.

## Defects and their homes

- Rows 900, 901, 902 and 926: home 1, repaired; asserted in `ProjectFortress/tests/NativeHelperReaderWalk.fss` (the rope, the `flush` and the read after it, the three missing files; `File` not native).
- NEW-R-1, on the compiled path no `catch` sees a `fileOps` raise of `IOFailure` or `FileNotFoundException`: home 2, deferred, the specification settles it (`try.tex`); the expected failure pair `compiler_tests/XXXFileOpsRaiseCaughtCompiled.fss`, `XXXFileOpsRaiseCaughtCompiled.test`, `FileOpsRaiseCaughtCompiledLink.test`, and a new row (`record.md`). Its repair is a run-time edit, reserved here.
- Row 928's sibling for the reader trait: the same design limit, measured by the probe above; home 3, the row rewritten to hold both traits (`record.md`).
- The answers after `close` change from a stop to the end's values (above): no defect of the specification's, which is silent; it is the team's compiled reader's behaviour, and the "Revival change" of `record.md` holds it.

## Commands

- `tmp/rung-io-reader/count/countbind.py ROOT`: counts the one library's `builtinPrimitive` bindings by kind, comments stripped (the line comment `(*)` read to its line's end), the four compiler files left out; it gives F-299's 341, 102 and 443 on the base build.
- `tmp/rung-io-reader/probes/gen.py`, `run.sh old|new`, `cmp.py`: the 28 one-operation probes, run under walk on the old code by `old-fortress.sh` and on the edit, and their comparison.

## The relayed request

The run's relayed request is "Boot light.", which concerns the coordinating session's boot; this rung's work does not reach it, and I made no edit for it.
