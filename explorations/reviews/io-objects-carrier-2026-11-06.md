<!-- The design for the curator's decision on how the I/O objects' 36 native bindings (`Writer`, `BufferedWriter`, `FileWriteStream`, `FileReadStream` and `Reader`, with `stdOut`, `stdErr` and `stdIn`; the record's family N4) move from walk's glue classes to helpers that both paths call: which Java type carries each object to a helper, and which Fortress type the compiled checker reads for that Java type, written 2026-11-06 by an Opus worker, reading only, with runs of walk and of the compiled path from the main tree's build. -->

# The I/O objects' carrier and Java type: the design for the curator's decision

The tree is `main` at `8ff1c78ad`. Its code is that of `b88d26f52`: `git diff --stat b88d26f52 8ff1c78ad` over `Library/`, `ProjectFortress/`, `Specification/`, `bin/` and `build.xml` is empty. Every Fortress run below used the main tree's build on JDK 25.0.4.1, with a private caches folder under `tmp/review-io/` (`FORTRESS_CACHES` and `-Dfortress.caches` both set to it), at `FORTRESS_THREADS=1` unless the text says otherwise. The compiled runs used a private copy of the main tree's caches, `tmp/review-io/ccaches`. The probe programs are scratch under `tmp/review-io/` and are not committed; each point quotes what a program does and its output. A walk run is `bin/fortress tmp/review-io/progs/P.fss`; a compiled run is `bin/fortress compile tmp/review-io/cprogs/P.fss` and then `bin/fortress run P`. A Java path without a prefix is under `ProjectFortress/src/com/sun/fortress/`. Apart from these two, commits named by hash are the team's. The machine's locale is unset, so the JVM writes its standard output in ASCII (section 2, point 17).

## 1. The question, and a primer

**The question.** When the I/O objects' 36 bindings leave walk's glue classes, which Java type carries each I/O object to a helper, and which Fortress type does the compiled checker read for that Java type?

**The words.**

1. *Walk* is Fortress's interpreter. The *compiled path* checks a program's types with the *checker*, compiles it to JVM bytecode and runs it. Until the *switch-over*, the compiled path uses its own small library, the *prelude* (`CompilerBuiltin` and two other files). After it, both paths use the interpreter's library, the *one library* [1].
2. A *native binding* is a library declaration whose body is `builtinPrimitive("…")`. The string names Java code that does the work. It names a *glue class*, Java over walk's own run-time values, which only walk can call, or a *helper*, a public static Java method over plain Java values in `nativeHelpers/`, which both paths call. P-58, a decision of the curator, says that every binding is to name a helper. F-32 counts 143 of the 449 live bindings that still name glue classes; the I/O objects hold 36 of them [2].
3. A *carrier* is the Java type in which walk passes a declared Fortress type, or `self`, to a helper. Walk's loader of helpers, `interpreter/glue/StaticNativeApp.java`, has a fixed list of them. For example, a `ZZ32` goes to Java as an `int`, a `FlatString` as a `String`. Walk refuses at load a binding whose parameter type or `self` has no carrier [3].
4. The *foreign-type table* is the checker's map the other way: from a helper's Java type to the Fortress type that the checker reads. It is in `compiler/NamingCzar.java`. One part serves the compiler's world, with the prelude's types. Another part, which the revival added, serves walk's world, with the one library's types. A Java type that the second part lacks falls back to the first part's reading [4].
5. *N4* and *N5* are steps of the record's plan for the natives. N4 is this family, the I/O objects. N5 is the names work of the switch-over day: the foreign-type table, the helpers' exception names, and the run-time classes that name the prelude [5].
6. A *rung* is one change, built by one worker and checked by a second, and landed with its tests in a *batch*. The *count stage* and the *distance stage* run the checker on the one library at every batch's gate: the count on the main component `FortressLibrary`, the distance on 14 core components, `Writer` and `Stream` among them [6].

**How a Fortress program writes and reads.**

7. This program ran under walk [7]:

        component IoPrimer
        import Writer.{...}
        import File.{...}
        export Executable
        run(): () = do
            println("hello, through println")
            stdOut.write("hello, through stdOut.write\n")
            stdOut.flush()
            out = FileWriteStream("tmp/review-io/notes.txt")
            out.write("one line in a file\n")
            out.close()
            f = FileReadStream("tmp/review-io/notes.txt")
            line = f.readLine()
            f.close()
            println("read back: " line)
          end
        end

    It printed:

        hello, through println
        hello, through stdOut.write
        read back: one line in a file

8. `println` is a function of the one library's main component: `println(a: String): () = do stdOut.write(a || newline); stdOut.flush() end`. `print`, `errorPrint` and `errorPrintln` have the same form over `stdOut` and `stdErr`. A value of another type is first made a string, `println(a:Any):() = println("" a)` [8].
9. `stdOut` and `stdErr` are top-level values of type `Writer`, in the component `Writer`. A program must import `Writer` to name them. Without the import, the same program stops: "Variable stdOut is not defined." `println` reaches them without an import, because the one library's main component imports `Writer` [9].
10. `Writer` is an object: `object Writer(fileName: String) extends { WriteStream }`. `WriteStream` is a trait of the component `Stream`. It declares `write(s: String)`, `write(c: Char)`, `flush()` and `close()` abstract, and builds `print`, `println` and `writes` on them [10].
11. A string is one of two forms. A *flat string*, the object `FlatString`, holds one Java string. A *rope*, the object `CatString`, joins two strings without copying them; `||` makes one when the result is longer than 32 characters. `Writer` has a native `write(s: FlatString)`, and a `write(s: String)` for every other string. That method makes a `BufferedWriter` of the string's size, lets the rope write its pieces into it, and flushes it, so the whole line reaches the stream in one write. The team wrote a test that ten lines printed in parallel do not mix (section 3, point 6) [11].
12. `BufferedWriter(under, size)` is that buffer, an object of the same component [12].
13. `FileWriteStream(name)` and `FileReadStream(name)` are in the component `File`. The read methods `readLine`, `readChar` and `read(k)` and the generators `lines`, `characters` and `chunks` come from the trait `ReadStream` of the component `FileSupport`. They are built on five natives of each stream: `uncheckedReadLine`, `uncheckedReadChar`, `uncheckedRead(k)`, `whenUnconsumed` and `consume`. A generator *consumes* the stream: after it, a further read stops the program [13].
14. `Reader` and `stdIn` are in the component `Reader`. `Reader` has the same natives as `FileReadStream`, over a file or the standard input. It does not extend `ReadStream`: the team commented its `extends` clause out. So it has `uncheckedReadLine` but no `readLine` [14].

**What stands behind each object under walk.**

15. The three components are declared `native component`, with `package="com.sun.fortress.interpreter.glue.prim"`. In such a component, walk builds each object that has value parameters through a Java class of the same name in that package, a *native constructor*. The value it builds is a *native object*: a Java subclass of walk's `FNativeObject` that holds a Java stream [15]:
    - `stdOut`, `stdErr` and `Writer(name)`: `Writer.PrimWriter`, which holds a `java.io.OutputStreamWriter` in UTF-8 over `System.out`, `System.err` or the file;
    - `BufferedWriter`: `BufferedWriter.BuffWriter`, which holds a `java.io.BufferedWriter` over a `Writer`'s Java writer; its constructor takes only a `Writer`;
    - `FileWriteStream`: its own `PrimWriter`, which holds a `java.io.BufferedWriter` in UTF-8;
    - `FileReadStream`: its own `PrimReader`, which holds a `java.io.BufferedReader` in UTF-8 and two flags, `eof` and `consumed`;
    - `Reader` and `stdIn`: `Reader.PrimReader`, the same over a file or `System.in`.

**A native binding over such an object.**

16. An example is `Writer`'s `flush():() = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Writer$flush")`. Walk calls the glue class `Writer$flush`, which casts `self` to `PrimWriter` and flushes its Java writer. The compiled path cannot call it: a compile refuses a string that names a glue class (section 2, point 15) [16].

**What a carrier is here, and why these objects need one.**

17. A helper exists for that operation: `fileOps.jbwFlush(FortressBufferedWriter w)`. To name it, the binding's `self`, a `Writer`, must reach Java as a `FortressBufferedWriter`. That needs two things [17]:
    - On walk, a carrier. The loader must know that a `Writer` goes to Java as a `FortressBufferedWriter`, and it must take that Java object out of walk's value. Today it has no such carrier: its carriers hold only numbers, booleans, strings and `BigInteger`. A program's own binding `flushThrough(w: Writer): () = builtinPrimitive("com.sun.fortress.nativeHelpers.fileOps.jbwFlush")` stops at load: "Native helper com.sun.fortress.nativeHelpers.fileOps.jbwFlush: no Java type carries the declared type of parameter w."
    - On the compiled path, a Fortress type for the Java type. The checker reads the helper's parameter through the foreign-type table, and the compiled code must hand the helper that Java object at the call.
18. The loader tells `self`'s type by its name, with one exception. Since rung T of climb batch 26, it tells the library's `FlatString` by the component that declares it, the *declaring-component device*. It needs that device because a program may declare its own type named `FlatString` (F-299; row 877). A program may also declare its own `Writer` and `FileReadStream`: one program declared both, used them, and printed through the library's `println` beside them. So a carrier read by the name `Writer` alone would reach a program's own type too. A type of the one library's two main components, `FortressLibrary` and `FortressBuiltin`, is different: a program that declares its own `RR32` stops, "Type name may refer to: RR32, FortressBuiltin.RR32". The loader's comment relies on this for the types that it reads by name [18].

**References**

1. `.claude/skills/fortress-repo/SKILL.md`, the words *walk*, *compiled path* and *one library*, and "How a program runs".
2. P-58 (`explorations/coordinator/POSITIONS.md:55`); F-32 (`FACTS.md:30`); F-299 (`FACTS.md:134`); `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-21`, the comment of `builtinPrimitive`.
3. `interpreter/glue/StaticNativeApp.java:51-62` (`javaFor`), `:90-93` (`carried`), `:103-111` (`javaForSelf`), `:163-211` (`find`); `.claude/skills/fortress-repo/references/interpreter.md`, "Natives".
4. `compiler/NamingCzar.java:368-389` (the reading, walk's world first at `:369-372`, the fallback at `:389`), `:440-456` (the compiler's world), `:464-490` (walk's world, with its comment at `:464-468`).
5. `explorations/perf-probes/prelude/natives-shape.md`, section 3, steps 5 and 6; `explorations/coordinator/PLAN.md:53-54`.
6. `.claude/skills/fortress-repo/SKILL.md`, the word *rung*; P-39; `explorations/coordinator/tools/distance/run.sh:87-90`.
7. `tmp/review-io/progs/IoPrimer.fss`, run as above; `rc=0`.
8. `Library/FortressLibrary.fss:4543-4549`; `newline` is `lineSeparator`, `Library/String.fss:578`.
9. `Library/Writer.fss:20-21`; the same program without `import Writer.{...}`, `IoPrimerNoImport.fss:7:5-9: Variable stdOut is not defined.`, `rc=255`; `Library/FortressLibrary.fss:19`; `Library/FortressLibrary.fsi:14` imports only `Stream.{WriteStream}`.
10. `Library/Writer.fss:28`; `Library/Stream.fss:33-78`; `Library/Stream.fsi:32-69`.
11. `explorations/reviews/string-natives-2026-11-05.md`, section 1, points 8 to 10; `Library/Writer.fss:33-35`, `:45-49`; `Library/String.fss:163-166`, the rope's `writeOn`.
12. `Library/Writer.fss:52-67`.
13. `Library/File.fss:20-94`; `Library/FileSupport.fss:32-133`, `readLine` at `:46`, `lines` at `:100-108`.
14. `Library/Reader.fss:20-61`, the comment at `:25`; `Library/Reader.fsi:17`.
15. `Library/Writer.fss:12-18`, `Library/File.fss:12-18`, `Library/Reader.fss:12-18`; `interpreter/evaluator/BuildNativeEnvironment.java:41-56`, `:119-128`; `interpreter/glue/prim/Writer.java:36-41`, `:47-55`, `:157-191`; `BufferedWriter.java:34-47`; `FileWriteStream.java:36-52`; `FileReadStream.java:36-60`; `Reader.java:37-62`, `:268-271`.
16. `Library/Writer.fss:39-41`; `interpreter/glue/prim/Writer.java:106-119`, `:135-140`.
17. `nativeHelpers/fileOps.java:102-104`; `StaticNativeApp.java:90-93`, `:276-286`; `tmp/review-io/progs/IoUncarriedWalk.fss`, whose line 4 is the binding above; output 'InterpreterBug: …IoUncarriedWalk.fss:4:1-97: Native helper com.sun.fortress.nativeHelpers.fileOps.jbwFlush: no Java type carries the declared type of parameter w.', `rc=1`.
18. `StaticNativeApp.java:96-147`; `explorations/compile-ladder/rung-string-natives/REPORT.md`, "What changed and why"; `tmp/review-io/progs/IoOwnWriterWalk.fss`, which declares `object Writer(n: ZZ32)` and `object FileReadStream(k: ZZ32)` and prints "the program's own Writer 7", "the program's own FileReadStream 8", "and println still writes through the library's stdOut", `rc=0`; `tmp/review-io/progs/IoOwnBuiltinNameWalk.fss`, which declares `object RR32(n: ZZ32)`: ':3:8-10: Type name may refer to: RR32, FortressBuiltin.RR32', `rc=255`.

## 2. Where the I/O bindings are built today, on each path

### 2.1 The 36, by object

1. `Writer`'s component, 11 [1]:
    - `OutWriter()` and `ErrWriter()`, the private factories of `stdOut` and `stdErr`, name `Writer$outputWriter` and `Writer$errorWriter`. They take nothing and make a `Writer.PrimWriter` over `System.out` or `System.err`.
    - `Writer`'s `fileName`, `write(s:FlatString)`, `write(c:Char)`, `flush` and `close` name `Writer$fileName`, `Writer$write` (both `write`s), `Writer$flush` and `Writer$close`. Each receives a `Writer.PrimWriter` as `self`, and a walk string (`FString`) or character (`FChar`) as the argument.
    - `BufferedWriter`'s `write(s:FlatString)`, `write(c:Char)`, `flush` and `close` name `BufferedWriter$write` (both), `$flush` and `$close`. Each receives a `BufferedWriter.BuffWriter`.
2. `File`'s component, 15 [2]:
    - `FileReadStream`'s 10: `fileName`, `asString`, `eof`, `ready`, `whenUnconsumed`, `consume`, `uncheckedReadLine`, `uncheckedReadChar`, `uncheckedRead(k)` and `close` name `FileReadStream$fileName`, `$toString`, `$eof`, `$ready`, `$whenUnconsumed`, `$consume`, `$readLine`, `$readChar`, `$readk` and `$close`. Each receives its `PrimReader`.
    - `FileWriteStream`'s 5: `fileName`, `asString`, `write(s:FlatString)`, `write(c:Char)` and `close` name `FileWriteStream$fileName`, `$toString`, `$write` (both) and `$close`. Each receives its `PrimWriter`.
3. `Reader`'s component, 10 [3]: `InReader()`, the private factory of `stdIn`, names `Reader$inputReader` and makes a `Reader.PrimReader` over `System.in`. `Reader`'s 9 methods, `fileName`, `eof`, `isReady`, `whenUnconsumed`, `consume`, `uncheckedReadLine`, `uncheckedReadChar`, `uncheckedRead(k)` and `close`, name `Reader$fileName` to `Reader$close`. Each receives a `Reader.PrimReader`.
4. So 11 + 15 + 10 = 36, each over a glue class. The five glue files hold 1.0K lines of Java. The objects' constructors are glue too, but no `builtinPrimitive` string names them: walk reaches them through the native component (section 1, point 15). So F-32's count does not hold them, and every option below must also say how each object is made [4].

### 2.2 The bindings at work under walk

5. `Writer`, `stdOut`, `stdErr` and `BufferedWriter`. The program `IoWriterWalk.fss` calls `println`; `stdOut.write` on a flat string, on two characters and on a rope; `stdOut.asString` and `fileName`; `stdErr.write`; a `Writer` on a file with `write`, `flush` and `fileName`; a `BufferedWriter` of size 8 over that `Writer`; and `println` on a line with characters outside ASCII. Its standard output [5]:

        1 println of a literal
        2 stdOut.write of a flat string
        3
        4 a rope: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
        5 stdOut.asString = Writer on "<stdout>"; fileName = <stdout>
        7 a file Writer: Writer on "tmp/review-io/writer-out.txt"; fileName = tmp/review-io/writer-out.txt
        8 the BufferedWriter wrote through to the file
        9 non-ASCII through println: héllo λ → ∑

    Its error stream held `6 stdErr.write, on the error stream`, and the file held `line one`, `x` and `buffered through a BufferedWriter of size 8`.
6. In the first version of that program, line 8 printed `b.asString`. Walk stopped there: "Missing value: $under in environment", at `Library/Writer.fss:53:54-57`. `BufferedWriter`'s `asString` reads its value parameter `under`, and a native object binds no value parameter as a field. This is a defect, and the gap ledger holds no row on any I/O object [6].
7. `FileWriteStream` and `FileReadStream`. The program `IoFileWalk.fss` writes a file through `write` on two flat strings and two characters and through `println`, then reads it back, one call to a line [7]:

        1 FileWriteStream: asString = <Write handle to "tmp/review-io/file-out.txt">; fileName = tmp/review-io/file-out.txt
        2 FileReadStream: asString = <Read handle to "tmp/review-io/file-out.txt">; fileName = tmp/review-io/file-out.txt
        3 eof = false, ready = true
        4 readLine = [alpha]
        5 readChar = [b]
        6 readLine = []
        7 read(5) = [gamma]
        8 readLine = [, flat]
        9 readLine = [delta4epsilon]
        10 at the end: readLine = [], then eof = true
        11 uncheckedReadChar at the end = -1
        12 lines() counted 4 lines
        13 characters() counted 34 characters

    Line 11 matters below: at the end of the file, walk's `uncheckedReadChar` answers -1.
8. Three more gaps of the file streams, each shown by a small program [8]:
    - A rope written to a `FileWriteStream` stops the program: "Unification error: Closure/Constructor for writeOn param 1 (stream:WriteStream) got arg <Write handle to …> of type FileWriteStream", at `Library/File.fss:79`. `FileWriteStream` extends only `FileStream`, not `WriteStream`, so the rope cannot write itself on it.
    - `FileWriteStream`'s `flush()` is declared in its api and absent from its component: "Cannot find definition for method flush given receiver <Write handle to …>". Walk does not check a component against its api (row 841).
    - A missing file stops the run inside a `try` whose `catch` names `IOFailure`: "FileNotFound: tmp/review-io/no-such-file.txt". The glue raises a walk error, which no `catch` sees.

    A read after `lines()` stops as designed: "Performed operation on consumed FileReadStream tmp/review-io/file-out.txt".
9. `Reader` and `stdIn`. The program `IoReaderWalk.fss`, with one line on its standard input, printed [9]:

        1 stdIn: asString = Reader on "<stdin>"; fileName = <stdin>
        2 stdIn.uncheckedReadLine = [a line from standard input]
        3 a file Reader: asString = Reader on "tmp/review-io/file-out.txt"; fileName = tmp/review-io/file-out.txt
        4 eof = false, isReady = true
        5 uncheckedReadChar = 97
        6 uncheckedReadLine = [lpha]
        7 uncheckedRead(4) = [b
        ga]
        8 consumed
        9 closed, eof = true

10. The team's test of printing in parallel, `ProjectFortress/tests/printing/ConcurrentPrinting.fss`, prints a long rope ten times from a parallel `for`. At four threads under walk, its output equals the team's oracle file. No target of `build.xml` runs it [10].

### 2.3 What the compiled prelude does for the same operations

11. `println`. The prelude's `println(x:Object):() = jPrintln(x.asString.asJavaString)` calls `simplePrintln.nativePrintln(String s)`, which is `System.out.println(s)`. The prelude has no `stdOut` and no `Writer`: a compiled program that writes `stdOut.write(…)` stops, "Variable stdOut is not defined." [11].
12. Files. The prelude declares two *Java-backed traits*, traits whose values hold a Java object:
    - `trait JavaBufferedWriter` with `write(c: Character)`, `write(s: String)`, `newLine()`, `flush()` and `close()`, made by `makeJavaBufferedWriter(s: String)`;
    - `trait JavaBufferedReader` with `read()`, `readLine()`, `readk(k)`, `eof()`, `ready()`, `close()`, `whenUnconsumed()` and `consume()`, made by `makeJavaBufferedReader(s: String)`.

    Each method calls a helper of `fileOps` through an `import java`. The helpers take `FortressBufferedWriter` or `FortressBufferedReader`, two Java classes of the compiled run time. A `FortressBufferedWriter` holds a name and a `java.io.BufferedWriter`. A `FortressBufferedReader` holds a name, a `java.io.BufferedReader` and the flags `eof` and `consumed` [12].
13. The compiled path joins three pieces for each trait [13]:
    - the Java type: the checker reads `FortressBufferedWriter` as the prelude's `JavaBufferedWriter`, through the foreign-type table;
    - the Fortress type: the trait itself;
    - the *run-time class*: the code generator represents a value of the trait by `FJavaBufferedWriter`, a hand-written Java class that implements the trait and holds the `FortressBufferedWriter`. The *boxed-type table* names it, in two places. The wrapper of a helper takes a helper's argument out of that class by its `getValue()`, and boxes a helper's result by its `make`.
14. A compiled program used both traits. It printed through `println`, wrote a file through `makeJavaBufferedWriter`, and read it back. Its output [14]:

        1 println of a literal
        42
        3 a long string, past thirty-two characters: abcdefghijklmnopqrstuvwxyz
        4 non-ASCII through println: h?llo ? ? ?
        6 read back: [ 5 through the prelude's JavaBufferedWriter ]; then eof =  false

    Line 4: the compiled `println` writes `?` for each character outside ASCII, where walk's `println` writes the characters (point 5, line 9).
15. A compile refuses a string that names a glue class. A compiled program whose own declaration is `flushOut(): () = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Writer$flush")` stops: "Variable builtinPrimitive is not defined." So on the one library, every compiled `println` needs `Writer`'s factory and methods on helpers first [15].
16. The same operations, matched [16]:
    - `write` of a flat string and of a character, `flush` and `close`, on `Writer`, `BufferedWriter` and `FileWriteStream`: `jbwWriteString`, `jbwWriteChar`, `jbwFlush`, `jbwClose`;
    - `eof`, `ready` (`isReady`), `whenUnconsumed`, `consume`, `uncheckedReadLine`, `uncheckedReadChar`, `uncheckedRead(k)` and `close`, on `FileReadStream` and `Reader`: `jbrEof`, `jbrReady`, `jbrWhenUnconsumed`, `jbrConsume`, `jbrReadLine`, `jbrRead`, `jbrReadk`, `jbrClose`;
    - `asString` of the two file streams: `jbrAsString`, `jbwAsString`;
    - no helper: the four `fileName`s, `OutWriter`, `ErrWriter` and `InReader`. `fileOps` has no name accessor, `FortressBufferedWriter`'s name is a protected field with no getter, and no helper reads `System.in`.

    So 29 of the 36 have a helper for the same operation, and 7 need a new one.
17. Where a helper exists, four values differ from the glue's [17]:
    - At the end of a file, the helper's read of a character answers 0. A compiled read of a two-character file printed "read:  97 ,  98 , then at the end  0". Walk's glue answers -1 (point 7, line 11). The library's `characters()` stops on -1, and its `readChar` turns -1 into the character 0.
    - `asString`: walk prints `<Read handle to "…">`; the helpers answer `[buffered reader [Buffered reader …]]`.
    - Failure: the glue stops the run with a walk error that no `catch` sees (point 8). The helpers raise `fortress.CompilerBuiltin$IOFailure` or `fortress.CompilerBuiltin$FileNotFoundException`. Walk turns such a raise into the one library's object of the same name. The one library declares `IOFailure`, as a singleton, and no `FileNotFoundException`.
    - Encoding: walk's `stdOut` writes UTF-8, a choice of the team (section 3, point 4). `System.out` writes in the JVM's `stdout.encoding`, here `ANSI_X3.4-1968`, which is ASCII, while `file.encoding` is UTF-8. Under walk, the string family's helper `printlnWithThread`, which writes to `System.out`, printed " Thread 26: 2 printlnWithThread, through simplePrintln: h?llo ? ? ?", between two `println` lines that printed "héllo λ → ∑".

**References**

1. `Library/Writer.fss:23-26`, `:30-44`, `:55-66`; `interpreter/glue/prim/Writer.java:121-147`, `:157-191`; `BufferedWriter.java:109-135`.
2. `Library/File.fss:24-61`, `:67-93`; `interpreter/glue/prim/FileReadStream.java:118-219`; `FileWriteStream.java:118-151`.
3. `Library/Reader.fss:22-60`; `interpreter/glue/prim/Reader.java:160-271`.
4. `git grep -c builtinPrimitive -- Library/Writer.fss Library/File.fss Library/Reader.fss` gives 11, 15 and 10; `wc -l` of `interpreter/glue/prim/{Writer,BufferedWriter,Reader,FileReadStream,FileWriteStream}.java` gives 1002 in all; `explorations/coordinator/CLIMB-BATCH-26.md`, section 4, "The 161 by home".
5. `tmp/review-io/progs/IoWriterWalk.fss`; stdout as quoted, stderr and file as quoted, `rc=0`.
6. The first version of `IoWriterWalk.fss`, `rc=1`; `Library/Writer.fss:52-53`; `grep -n -i 'BufferedWriter\|FileReadStream\|FileWriteStream\|stdOut\|Writer\.fss\|File\.fss\|Reader\.fss\|fileOps' explorations/fortress-gap-ledger.md` prints nothing.
7. `tmp/review-io/progs/IoFileWalk.fss`, `rc=0`; the file was 34 bytes.
8. The first version of `IoFileWalk.fss` (`File.fss:79:26-38`, `rc=1`); `Library/File.fss:66`, `:79`; `Library/File.fsi:102`, `:131`; `tmp/review-io/progs/IoFlushWalk.fss` (`:7:5-12`, `rc=1`), `IoMissingWalk.fss` (`:6:13-59`, `rc=1`), `IoConsumedWalk.fss` (`Library/FileSupport.fss:46:28-42`, `rc=1`); `interpreter/glue/prim/FileReadStream.java:43-44`, `:67-72`; `.claude/skills/fortress-repo/references/interpreter.md`, "What walk checks", on row 841, and "Natives", on a `catch`.
9. `echo "a line from standard input" | bin/fortress tmp/review-io/progs/IoReaderWalk.fss`, `rc=0`.
10. `FORTRESS_THREADS=4 bin/fortress ProjectFortress/tests/printing/ConcurrentPrinting.fss`; `cmp` with `ProjectFortress/tests/printing/test_oracle.txt` prints nothing; `grep -n printing build.xml` prints only `:347`, a `delete` of its output file.
11. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:13-16`, `:460`; `nativeHelpers/simplePrintln.java:24-26`; `tmp/review-io/cprogs/IoStdOutCompiled.fss`: ':4:5-9: Variable stdOut is not defined.', `rc=255`.
12. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:592-613`; `CompilerBuiltin.fss:288-304`, `:1161-1184`; `nativeHelpers/fileOps.java:33-108`; `compiler/runtimeValues/FortressBufferedWriter.java:23-35`; `FortressBufferedReader.java:23-32`.
13. `compiler/NamingCzar.java:453-454`, `:589-590`; `runtimeSystem/Naming.java:297-298`; `compiler/runtimeValues/FJavaBufferedWriter.java:16-28`; `compiler/nativeInterface/FortressMethodAdapter.java:150-153`.
14. `tmp/review-io/cprogs/IoPrintlnCompiled.fss`, compile `rc=0`, run `rc=0`; the file held "5 through the prelude's JavaBufferedWriter".
15. `tmp/review-io/cprogs/IoGlueStringCompiled.fss`: ':3:18-32: Variable builtinPrimitive is not defined.', `rc=255`; F-298.
16. `nativeHelpers/fileOps.java:33-108`; `compiler/runtimeValues/FortressBufferedWriter.java:25`, the protected `name`; `grep -rn 'System.in\b' ProjectFortress/src/com/sun/fortress/nativeHelpers/` prints nothing.
17. `tmp/review-io/cprogs/IoEofCompiled.fss`, run `rc=0`; `compiler/runtimeValues/FortressBufferedReader.java:55-69`; `Library/FileSupport.fss:64-67`, `:112-119`; `nativeHelpers/fileOps.java:41-43`, `FortressBufferedReader.java:34-36`; `fileOps.java:37`, `:82`, `FortressBufferedReader.java:50`; `interpreter/glue/StaticNativeApp.java:265-274`; `Library/FortressLibrary.fsi:1201`; `grep -rn 'FileNotFoundException' Library/*.fsi ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` prints nothing; `java -Dfile.encoding=UTF-8 -XshowSettings:properties -version` prints `stdout.encoding = ANSI_X3.4-1968` and `file.encoding = UTF-8`; `tmp/review-io/progs/IoHelperPrintWalk.fss`, `rc=0`; `nativeHelpers/simplePrintln.java:48-50`.

## 3. The team's sources and which way they point

Three principles settle a fork: the library as the team wrote it, the team's later word (P-26), and the peers. The peers weigh only where the team's texts conflict or are silent. A team text also weighs by who wrote it and whether its author called it provisional [0].

### 3.1 Who wrote the library's I/O, and when

1. Jan-Willem Maessen wrote the file streams: the glue of `FileReadStream` on 2007-10-26, "Fully-working version of File library (cleaned up the imports and made the Generators work). Try it, you'll like it!"; `File.fss` in `Library/` on 2008-03-24; the glue of `FileWriteStream` on 2008-04-11 [1].
2. The committer `black`, whom the authorship notes take, unconfirmed, for Andrew P. Black on a visit of one semester in the autumn of 2008, wrote the rest [2]:
    - 2008-11-08, `File`'s factories over `String` beside its objects over the flat type: "Added factories for fileStreams, to make wordcount work when FlatStringInfo.maxSize is small."
    - 2008-11-18, `Writer`, `BufferedWriter` and their glue: "implemented BufferedWriter as a primitive type. Needs more tests!"
    - 2008-12-11, `Reader`, `Stream`, and `println` through `stdOut`: "The new world of printing".
    - 2008-12-12, the test of printing in parallel, and in the same commit `BufferedWriter`'s `under` widened from `Writer` to `WriteStream`. The glue still casts `under` to a `Writer`.
3. Before 2008-12-11, walk's `println` was a native over the flat string, `javaPrintln(a: JavaString) = builtinPrimitive("…StringPrim$Println")`, whose glue was `System.out.println(x)`. The trait `String` flattened first: `println(self) = println(self.asJavaString)`. `black` replaced it with the path through `stdOut` [3].
4. Maessen changed `Writer`'s glue on 2009-01-16: "Reverted to using System.out and System.err in Writer so that we can test silently." `black`'s version wrote UTF-8 to the file descriptors; Maessen kept UTF-8 and wrote the comment that explains it (point 7). On 2009-01-05 he had renamed `JavaString` to `FlatString` [4].
5. The later changes to these files are not recorded. `Reader`'s `extends { ReadStream }` is commented out from the tree of 2011-03-19 on, and `File.fss` carries the year 2010. After 2009-01-05, every commit that git shows for these files is a cut of the conversion, a commit with no parent, so git records no author of any later change. No recorded commit of Guy Steele or David Chase changes them [5].

### 3.2 The team's comments

6. On `WriteStream`'s `writes`: "To avoid interleaving with concurrent output to the same stream, this append step is done monolithically." The parallel test's rope reads: "This is a longish string that reads as a sentence when other strings are not interleaved." It passes today at four threads (section 2, point 10) [6].
7. On `Writer`'s standard streams: "We only *write* to the underlying PrintStream, which according to the Java 1.6 docs will bypass the system encoding. This means we can force UTF-8 here and it will actually mean something (rather than resulting in bogus double-encoded nonsense)." [7]
8. On the compiled run-time classes `FJavaBufferedReader` and `FJavaBufferedWriter`: "This is a temporary hack until we get a full-blown theory of automatically importing all Java libraries. We need to have some basic file I/O in order to implement the BirdCount benchmark." [8]

### 3.3 The compiler era's Java types

9. `fileOps.java` and the classes `FortressBufferedReader`, `FortressBufferedWriter`, `FJavaBufferedReader` and `FJavaBufferedWriter` first appear in the tree of `91306f1fb`, 2011-07-13, and not in `4841281a0` of the same day. Both commits are cuts of the conversion, so git does not record who wrote them. `fileOps.java` carries the year 2011 [9].
10. `FortressBufferedReader` repeats walk's glue `FileReadStream.PrimReader`: the same four fields (`name`, `reader`, `eof`, `consumed`), the same default of 64K characters for `readk`, and the same refusal after `consume`. It adds two things: a read at the end answers 0, not -1, and an I/O error raises `IOFailure`, which a `catch` sees [10].
11. The prelude's traits `JavaBufferedReader` and `JavaBufferedWriter` are in the tree of 2011-12-06 and absent from the prelude of 2009-02-19, the last recorded one before the cut [11].
12. The team also rebuilt the library's `FileReadStream` for the compiled path, in `ProjectFortress/BirdyLib/File.fss`: `object FileReadStream(filename: JavaString) extends ReadStream`, whose field `jbr: JavaBufferedReader = makeJavaBufferedReader(filename)` holds the Java-backed value, and 9 of whose 10 methods call `jbr`; `fileName` reads the value parameter. It first appears in the tree of 2012-05-14, a cut; the folder's recorded commits of the following days are Tristan King's work on BirdCount, the benchmark that point 8 names. It does not compile today: its own `Maybe` clashes with the prelude's, "Type name may refer to: Maybe.Maybe, CompilerLibrary.Maybe" [12].

### 3.4 How the team pairs a public declaration with a narrower native

13. The team's library and prelude declare the public operation at the wide type and put the native at a narrower one, with the conversion written in Fortress [13]:
    - `Writer`'s native `write(s:FlatString)` beside `write(s: String)`, which walks the rope; `BufferedWriter`'s the same;
    - `File`'s factories over `String` beside its objects over the flat type;
    - the prelude's `println(x:Object)`, which converts to a `JavaString` and calls the native;
    - the prelude's `JavaBufferedWriter.write(s: String)`, which converts and calls `jbwWriteString(self, s.asJavaString)`;
    - `BirdyLib`'s `FileReadStream`: the public object over `JavaString`, the natives on the narrower Java-backed trait in its field.

### 3.5 Which way they point

14. The library as the team wrote it, in 2008 and 2009: `stdOut` is a `Writer`; `println` writes through it; a printed rope reaches the stream in one write; the standard streams write UTF-8, a choice made twice; each I/O object is a native object over a Java stream. Its authors were a visitor of one semester and Maessen, a co-author of the specification, who kept the visitor's design [14].
15. The team's later word, in 2011 and 2012: `println` goes straight to `System.out` through a helper; a file goes through one Java-backed trait in each direction, whose run-time class holds a `FortressBufferedReader` or `FortressBufferedWriter`; and the library's own `FileReadStream` becomes a plain object whose field holds that trait. P-26 weighs code that its author called a stub as serving only the implementation, and the run-time classes' author called them "a temporary hack". The "full-blown theory" that would replace them is a foreign-function interface, which the language does not have; P-58 chose helpers named by `builtinPrimitive` in its place. So the hack is the only form of a Java object in a Fortress value that the team built, and it lies on P-58's road [15].
16. The two agree on the Java types: the compiled `FortressBufferedReader` is walk's glue state with two repairs (point 10). They agree on the shape of a file stream as an object over a Java-backed value, which the later word writes as a field. They differ on `println`: the library writes through `stdOut` in UTF-8; the prelude writes to `System.out` in the platform's encoding, as walk itself did until 2008-12-11 (point 3) [16].
17. The specification and the papers are silent: neither names `stdOut`, `Writer`, `WriteStream`, `FileReadStream` or `JavaBufferedWriter` [17].
18. So, where the team speaks, it points to a Java-backed type held in a field for the file streams. On `println`, its earlier and later word differ, and section 4 weighs the peers. Neither principle speaks to the carrier device, which is a question of walk's implementation [18].

**References**

0. `.claude/skills/coordinator/SKILL.md:95-97`; P-26 (`explorations/coordinator/POSITIONS.md:24`).
1. `git log --all --diff-filter=A --format='%h %ad %an | %s' --date=short` on the glue and library files: `3bdb5a110` (2007-10-26, `jmaessen`), `1d2680d4d` (2008-03-24, `jmaessen`, "Massive library reorganization"), `2b98c8fb9` (2008-04-11, `jmaessen`, "Arg, missed checkin of this file.").
2. `research/authorship.md:59`; `git show --stat` of `a39129809` (2008-11-08), `dbebaec90` (2008-11-18), `9afe5fb39` (2008-12-11), `600c46dfb` (2008-12-12, whose `Library/Writer.fss` hunk is `BufferedWriter(under: Writer, …)` to `BufferedWriter(under: WriteStream, …)`); `interpreter/glue/prim/BufferedWriter.java:35`.
3. `git show 9afe5fb39^:Library/JavaString.fss`, `:91-94`, `:151-152`; `git show 9afe5fb39^:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java`, `:39-41`; `git show 9afe5fb39^:Library/FortressLibrary.fss`, `:3579`; `git show 9afe5fb39:Library/FortressLibrary.fss`, `:3613-3614`.
4. `git show 664522522` (2009-01-16, `jmaessen`), its hunk of `interpreter/glue/prim/Writer.java`, which replaces `FileDescriptor.out` by `System.out` and keeps `Charset.forName("UTF-8")`; `git show -s 5335ab745` (2009-01-05, `jmaessen`).
5. `git log --all --since=2008-12-01 --until=2011-12-31` on the eight library files prints commits up to `5335ab745` (2009-01-05) and then only `26718e298` (2011-12-06), a commit with no parent; every team commit that `git log --all --since=2011-12-01` lists for them, and for `Writer.java` and `fileOps.java`, has no parent; the first commit with no parent whose `Library/Reader.fss` holds `(* extends { ReadStream } *)` is `3d113107d` (2011-03-19); `Library/File.fss:2`; `.claude/skills/fortress-repo/references/records.md`, "The repository's history".
6. `Library/Stream.fss:49-54`; `ProjectFortress/tests/printing/ConcurrentPrinting.fss:25-32`.
7. `interpreter/glue/prim/Writer.java:149-156`.
8. `compiler/runtimeValues/FJavaBufferedReader.java:17-18`; `FJavaBufferedWriter.java:17-18`.
9. `git cat-file -e 91306f1fb:ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java` succeeds and fails for `4841281a0`, the commit with no parent just before it; `nativeHelpers/fileOps.java:2`.
10. `interpreter/glue/prim/FileReadStream.java:48-73`, `:151-166`; `compiler/runtimeValues/FortressBufferedReader.java:23-32`, `:55-69`, `:72-90`, `:118-131`.
11. A loop over the 16 commits that touch `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` (`git log --all`), counting `JavaBufferedReader` in each: 4 from `26718e298` (2011-12-06) on, 0 at `f8de53a7a` (2009-02-19) and before.
12. `ProjectFortress/BirdyLib/File.fss:20-32`; the first commit with no parent whose tree holds it is `67f402576` (2012-05-14), and `e3a5358b6` (2012-05-09) holds none; `git log --all -- ProjectFortress/BirdyLib/` lists `c3e72fd62` (2012-05-21), `db1c4352f`, `883dd5c99`, `c7472cfe8` and `9ec264e2f` (2012-05-23, "Synchronized with new CompilerBuiltin"), Tristan King's; `research/authorship.md:53`; `cd ProjectFortress/BirdyLib && ../../bin/fortress compile File.fss`: 'FileSupport.fsi:117:49-52: Type name may refer to: Maybe.Maybe, CompilerLibrary.Maybe', `rc=255`.
13. `Library/Writer.fss:33-35`, `:45-49`, `:54-57`; `Library/File.fss:20-22`, `:64-66`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:460`, `:1178`; `ProjectFortress/BirdyLib/File.fss:20-32`; the strings review, section 3.3, point 7.
14. Points 2 to 4, 6 and 7; section 1, point 15; `research/authorship.md:45`, `:59`.
15. Points 8 to 12; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:460`; P-26; P-58, its "Why".
16. Points 3 and 10; section 2, points 14 and 17.
17. `git grep -l -i 'FileReadStream\|WriteStream\|stdOut\|JavaBufferedWriter' -- Papers Specification Specification-1.0-frozen` prints nothing; `println` stands in the specification only in an example, `Specification/basic/variables.tex:169`, and in Appendix I, `Specification/appendices/changes.tex:3118`, `:4492`.
18. Points 14 to 17.

## 4. The peers, as context

1. **Java.** `java.io.Writer` is an abstract class with abstract `write(char[], int, int)`, `flush()` and `close()`. `OutputStreamWriter` holds its encoder in a private field over an `OutputStream` and takes a `Charset`. `BufferedWriter` holds `private Writer out` and a buffer `char[] cb`. `FileWriter` extends `OutputStreamWriter`. `System.out` is a `PrintStream`, which holds a `BufferedWriter` and an `OutputStreamWriter`, and writes in `stdout.encoding`, ASCII on this machine. So a library type over a host stream is a class whose private field holds the stream below it [1].
2. **Scala.** `scala.io.BufferedSource`, which `Source.fromFile` and `Source.fromInputStream` answer, holds `private final java.io.InputStream inputStream`. For output Scala uses Java's own streams: `scala.Console` keeps the standard output in `outVar`, a dynamic variable over a `java.io.PrintStream`, and `withOut` binds another stream for a block; `println(Object)` writes to it. So the standard output is a stream of the same type as a file's [2].
3. **Swift.** `TextOutputStream` is a protocol whose one requirement is `mutating func write(_ string: String)`. `print(_:separator:terminator:)` makes an internal `_Stdout()` and writes to it under a lock (`_lock` and `_unlock` call `flockfile` and `funlockfile`); `_Stdout.write` passes the string's UTF-8 bytes to `fwrite`, whatever the locale. `print(_:to:)` takes any `TextOutputStream`. Foundation's `FileHandle` is a class with `private var _fd: Int32`, a class property `standardOutput`, `init(fileDescriptor:closeOnDealloc:)`, `write(contentsOf:)` and `readToEnd()` [3].
4. What they say to this question [4]:
    - All three keep the standard output as a stream object of the kind that a file also is: the library's `stdOut: Writer` is that design.
    - In all three, a library type over a host stream holds the host stream in a field of its own.
    - Swift's `print` writes UTF-8 whatever the locale, and locks so that one call's output does not mix with another's. Java's `System.out` follows the locale. The team's `Writer` chose Swift's way (section 3, points 6 and 7).

**References**

1. `javap -p java.io.OutputStreamWriter`: `private final sun.nio.cs.StreamEncoder se;`, `public java.io.OutputStreamWriter(java.io.OutputStream, java.nio.charset.Charset);`; `javap -p java.io.BufferedWriter`: `private java.io.Writer out;`, `private char[] cb;`; `javap -p java.io.Writer`: the three abstract methods; `javap -p java.io.FileWriter`: `extends java.io.OutputStreamWriter`; `javap -p java.io.PrintStream`: `private java.io.BufferedWriter textOut;`, `private java.io.OutputStreamWriter charOut;`; section 2, reference 17, the encodings.
2. `javap -p -cp ProjectFortress/third_party/scala/scala-library-2.13.18.jar scala.io.BufferedSource`: `private final java.io.InputStream inputStream;`; `'scala.io.Source$'`: `fromFile(java.lang.String, java.lang.String)`, `fromInputStream(java.io.InputStream, scala.io.Codec)`; `'scala.Console$'`: `private static final scala.util.DynamicVariable<java.io.PrintStream> outVar;`, `withOut(java.io.PrintStream, scala.Function0<T>)`, `println(java.lang.Object)`.
3. `https://raw.githubusercontent.com/swiftlang/swift/main/stdlib/public/core/OutputStream.swift`: "public protocol TextOutputStream", "mutating func write(_ string: String)", "internal struct _Stdout: TextOutputStream", "_swift_stdlib_fwrite_stdout(utf8.baseAddress!, 1, utf8.count)", "_swift_stdlib_flockfile_stdout()"; `…/stdlib/public/core/Print.swift`: "var output = _Stdout()", "public func print<Target: TextOutputStream>("; `https://raw.githubusercontent.com/swiftlang/swift-corelibs-foundation/main/Sources/Foundation/FileHandle.swift`: "open class FileHandle : NSObject", "private var _fd: Int32", "public class var standardOutput: FileHandle", "public init(fileDescriptor fd: Int32, closeOnDealloc closeopt: Bool)", "public func write<T: DataProtocol>(contentsOf data: T) throws", "public func readToEnd() throws -> Data?". Read on 2026-11-06.
4. Points 1 to 3.

## 5. The model program's exposure

1. **Output.** Each of microGPT's two programs prints one header line and one line for each of its 5 steps, 6 lines in a run, through `println` with juxtaposed strings and numbers. Each line is longer than 32 characters, so it is a rope, and it goes through `Writer.write(s: String)` and its `BufferedWriter` (section 1, point 11). Each line is ASCII [1].
2. **Input.** Both programs read the corpus and the weights through `File`: `FileReadStream(path)`, `readLine()` and `close()`, in `FlatData.fss` and `FlatData2.fss`. `readLines` opens each file twice, once to count its lines and once to fill an array. The corpus holds 2K lines, and the 9 weight files hold 214 lines in all. So a run makes about 4.4K calls of `readLine`, each two natives (`whenUnconsumed` and `uncheckedReadLine`), about 8.8K native calls in all, and 20 opens and closes. All of them happen at load, before the first step [2].
3. **Lines.** No option below changes a line of either program: each keeps `println` over a `String`, the factory `FileReadStream(path: String)`, `readLine()` and `close()` [3].
4. **Speed.** Under walk no timing is taken (the skill forbids it). Under every option that moves the bindings, each of the 8.8K native calls becomes a call by Java reflection in walk's loader, and under (b) also one more Fortress method call, for the delegation to the field. These calls happen once at load. A training step makes only the few native calls of its one printed line. On the compiled path after the switch-over, a helper is called directly, through the rewrite of F-298. No option touches the work inside a training step [4].
5. **Guards.** The commit stage's quick check of microGPT reads the same files through `FileReadStream`, so it guards each option's reader rung [5].

**References**

1. `explorations/run-c4/src/MicroGptFlat.fss:86`, `:91-96`; `explorations/apl/mg/MicroGptApl.fss:115`, `:120-125`.
2. `explorations/run-c4/src/FlatData.fss:11`, `:69-87`, `:93-99`, `:119-121`; `explorations/apl/mg/FlatData2.fss:14`, `:72-90`; `MicroGptFlat.fss:19`, `:48`, `:88`; `wc -l explorations/apl/reference/dzaima/docs.txt` gives 2000, `wc -l explorations/apl/reference/dzaima/w/*.txt` gives 214 in all over 9 files; `Library/FileSupport.fss:46`.
3. Section 6, the point "Model" of each option.
4. `.claude/skills/fortress-repo/references/interpreter.md`, "Running a program"; `interpreter/glue/StaticNativeApp.java:245-261`; F-298.
5. `explorations/coordinator/CLIMB-BATCH-26.md:87`; `.claude/skills/fortress-repo/references/interpreter.md`, "The model program".

## 6. The options

Each option says what it is, the bindings that it moves, the files and lines on each path, the tests that change, its size in rungs and its effect on the model program. "By reading" marks a claim that no run here measured.

### (a) Rung T's device extended to the five I/O types

1. **What it is.** Walk's loader learns five more types by their declaring component: `Writer` and `BufferedWriter` of the component `Writer`, `FileWriteStream` and `FileReadStream` of `File`, and `Reader` of `Reader`. It carries the three writers as `FortressBufferedWriter` and the two readers as `FortressBufferedReader`, the Java types that the prelude's helpers already take. The five native objects keep their native constructors, but each holds a `FortressBuffered…` in place of its Java stream; over `System.out` it is a `java.io.BufferedWriter` over the UTF-8 writer of today. The loader takes the Java object out of the native object when it calls a helper. The bindings name `fileOps` [1].
2. **Bindings moved.** 29 onto existing helpers (section 2, point 16). The four `fileName`s need two new helpers and a name accessor on each `FortressBuffered…` class. The three factories, `OutWriter`, `ErrWriter` and `InReader`, answer a library object, so the loader must also build a native object from a Java value, through the constructor's registration; or the three stay on glue. So 33 or 36.
3. **Values that move**, unless the rung writes new helpers for them: the read of a character at the end (-1 becomes 0, so `characters()` would not stop at the end; section 2, point 17), the two `asString` texts, and failures, which become `IOFailure` that a `catch` sees.
4. **Files and lines, walk.** `interpreter/glue/StaticNativeApp.java`: `javaForSelf(FType)` and `declaringComponent` (`:114-147`), `carried` (`:90-93`), `unbox` and `box` (`:276-307`). The five glue files, which keep their constructors and lose their method classes: `Writer.java:47-75`, `BufferedWriter.java:34-63`, `FileWriteStream.java:36-61`, `FileReadStream.java:36-75`, `Reader.java:37-83`. `nativeHelpers/fileOps.java`, two to five new helpers. The 36 strings of `Library/Writer.fss`, `File.fss` and `Reader.fss` [4].
5. **Files and lines, compiled path, before the switch-over.** The distance stage reads `Writer.fss`; neither stage reads `File` or `Reader`, so their moved bindings stay unchecked until the switch-over. By reading, the checker reads `FortressBufferedWriter` in walk's world through the fallback, as `FortressBuiltin.JavaBufferedWriter`, which the one library does not declare; F-321's case shows that such a type stops the whole component, "… is undefined." An entry in the walk-world table names one Fortress type for each Java type. Five library types share two Java types: an entry for `Writer` makes `BufferedWriter`'s and `FileWriteStream`'s `self` fail; an entry for the supertype `WriteStream` fits `Writer` and `BufferedWriter` but not `FileWriteStream`, which does not extend it, nor a factory whose result is a `Writer` [5].
6. **Files and lines, compiled path, after the switch-over.** By reading, the compiled code must hand the helper a `FortressBufferedWriter` from a compiled `Writer`. The code generator makes its own class for each object, and the call takes the Java object out of a value of a run-time class such as `FJavaBufferedWriter`. A compiled `Writer` is not one. So (a)'s compiled half needs a way to back a library object that has value parameters by a hand-written run-time class. That is the open question of the compiled carrier of the one library's `FlatString`, of which the record holds no design, five times over, with mutable Java state. It is not designed and not sized [6].
7. **Tests that change.** A new walk test of the 33 or 36 at today's values, with the writer and reader probes of section 2 as its asserts; a compiled guard that binds the `fileOps` helpers in a compiled test's own declarations, over the prelude's traits, as `NativeHelperBindingCompiled` does; the team's tests `FileReadWrite`, `LongStringTests`, `WordCountSmall` and `FileConversion` as guards; `ConcurrentPrinting` at four threads by hand. By reading, the distance stage would report `Writer` as stopped [7].
8. **Size.** Two walk rungs, the writers and then the readers. The compiled half is not sized.
9. **Model.** No line. Its reads become helper calls (section 5, point 4).

### (b) A Java-backed type in each direction, held in a field: PLAN's line

10. **What it is.** The one library declares two Java-backed traits, by the prelude's names and methods: `JavaBufferedWriter` and `JavaBufferedReader`. Each method is a public native whose body is exactly `builtinPrimitive("com.sun.fortress.nativeHelpers.fileOps.…")`, as P-58 asks. Factories make their values: one over a file name, and one for each standard stream. The five I/O objects become plain Fortress objects, no longer in a native component. Each holds a Java-backed value in a field and calls it, as the team's `BirdyLib` `FileReadStream` does [10]. A sketch:

        trait JavaBufferedWriter                                  (* FortressLibrary *)
            write(s: FlatString): () = builtinPrimitive("com.sun.fortress.nativeHelpers.fileOps.jbwWriteString")
            write(c: Char): () = builtinPrimitive("com.sun.fortress.nativeHelpers.fileOps.jbwWriteChar")
            flush(): () = builtinPrimitive("com.sun.fortress.nativeHelpers.fileOps.jbwFlush")
            close(): () = builtinPrimitive("com.sun.fortress.nativeHelpers.fileOps.jbwClose")
        end
        javaFileWriter(name: FlatString): JavaBufferedWriter = builtinPrimitive("com.sun.fortress.nativeHelpers.fileOps.jbwOpen")
        javaStdOut(): JavaBufferedWriter = builtinPrimitive("com.sun.fortress.nativeHelpers.fileOps.jbwStdOut")

        object Writer(fileName: String, under: JavaBufferedWriter) extends { WriteStream }      (* Writer *)
            write(s: FlatString): () = under.write(s)
            write(c: Char): () = under.write(c)
            ...
        end
        Writer(fileName: String): Writer = Writer(fileName, javaFileWriter(fileName.asFlatString))
        stdOut: Writer = Writer("<stdout>", javaStdOut())

11. **Where the types are declared.** In `FortressLibrary`, whose api already imports `FlatString`. A program cannot declare a type of that name (section 1, point 18), so the loader carries the two traits by name, with no declaring-component device. The other place, the I/O components themselves, would need the device and would leave the names free for programs [11].
12. **What carries them on walk.** The loader carries `JavaBufferedWriter` as `FortressBufferedWriter` and `JavaBufferedReader` as `FortressBufferedReader`. Walk's native objects have the type of an object, since a native constructor takes an object type, so a walk value of a trait needs an object below it: a private native object in `FortressBuiltin` that extends the trait and holds the Java object, as walk's `value object Int extends ZZ32` holds an `int` below the trait `ZZ32`. Its native constructor registers it, as `FlatString`'s glue registers walk's string class, so that the loader can box a factory's result. No `builtinPrimitive` string names that constructor, so it is not a binding [12].
13. **What it changes in `Writer` and in programs.** `Writer`, `BufferedWriter`, `FileWriteStream`, `FileReadStream` and `Reader` keep their names, methods and texts, written in Fortress over the field: `fileName` becomes the value parameter, and `asString` keeps today's text. `Writer` gains a value parameter for its Java writer, and the one-argument form stays a factory function, as `File`'s factories already stand beside their objects; `Writer.fsi:18` changes. The other way keeps `object Writer(fileName: String)` and fills the field from the name, as `BirdyLib` does, and then the standard streams need an object of their own, so that `stdOut` is no longer a `Writer`. Programs keep `println`, `stdOut.write`, `Writer(name)`, `FileReadStream(name)` and the read methods. Programs lose two names, `JavaBufferedWriter` and `JavaBufferedReader`, as they cannot declare `RR32` today [13].
14. **Bindings moved.** The 36 glue bindings go, and 17 helper bindings come, on the two traits. The writer side has 7: its four methods and `jbwOpen` on existing helpers, and two new helpers for standard output and standard error. The reader side has 10: its eight methods and `jbrOpen` on existing helpers, and one new helper for standard input. So 14 bindings name existing helpers and 3 name new ones. F-32's 143 becomes 107 [14].
15. **Values.** None needs to move. The read of a character at the end keeps -1 by Fortress code over `read()` and `eof()`, since the helper sets `eof` there; `asString` keeps its text. Failures become catchable: an I/O error raises `IOFailure`, which the one library declares. For a missing file, the helpers raise `FileNotFoundException`, and walk raises the library's object of that name, so the one library must declare it; the prelude declares it with a message argument, and walk takes a singleton, as `IOFailure` is. The other way is open helpers that raise `IOFailure`. The three new standard-stream helpers write and read UTF-8, as the glue does; the probes of section 2 show what a helper over `System.out` would print otherwise [15].
16. **Defects that the rewrite reaches.** As plain objects, `BufferedWriter`'s `asString` reads its field, and `BufferedWriter` can take any `WriteStream`, as its api says. `FileWriteStream` can extend `WriteStream`, which its methods already follow, and so take a rope and gain the `flush` that its api declares; this changes `File.fsi:102` and is a step the rung may leave out [16].
17. **Files and lines, walk.** `StaticNativeApp.java`: `javaFor` and `javaForSelf(String)` (`:51-62`, `:103-111`), `carried` (`:90-93`), `unbox` and `box` (`:276-307`); two walk value classes and their constructors under `interpreter/`, about 0.1K lines by reading; `nativeHelpers/fileOps.java`, three new helpers; `FortressBufferedWriter` and `FortressBufferedReader` unchanged. The five glue files are no longer named by any string [17].
18. **Files and lines, library.** `Library/FortressLibrary.fsi` and `.fss`, the two traits and their factories, beside `IOFailure` (`FortressLibrary.fsi:1201`); `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, the two private native objects; `Library/Writer.fss` and `.fsi`, `Library/File.fss` (and `.fsi` with the step of point 16), `Library/Reader.fss`, whose components stop being native [18].
19. **Files and lines, compiled path, before the switch-over.** The walk-world part of the foreign-type table gains two entries, `FortressBufferedWriter` and `FortressBufferedReader` to the one library's traits (`NamingCzar.java:476-490`). The compiler's world never reads that part (its comment, `:464-468`), so the entries can land with the first rung. Both must come in the first rung, with both traits declared: the checker reads the whole helper class, and `fileOps` takes both Java types (F-321). The count stage then checks all 17 bindings against `fileOps`, from the step that moves them, as P-58 asks; the distance stage checks `Writer.fss`, then plain Fortress. Both by reading; the rung's count and distance runs measure them [19].
20. **Files and lines, compiled path, at the switch-over (N5).** The two run-time classes, `FJavaBufferedReader` and `FJavaBufferedWriter`, implement the one library's traits in place of the prelude's; both are already among the 21 run-time classes that N5 renames. The boxed-type table's two entries name the one library's traits (`NamingCzar.java:589-590`; `runtimeSystem/Naming.java:297-298`). The raise strings of `fileOps` and of `FortressBuffered…` name the one library's exceptions. The compiled code for the five objects is ordinary object code with a field [20].
21. **Tests that change.** First rung: a walk test of the writer side at today's values, with section 2's writer probe as its asserts, the line outside ASCII among them, the file's contents, and `BufferedWriter`'s `asString`; a compiled guard that binds the `jbw` helpers in a compiled test's own declarations, over the prelude's `JavaBufferedWriter`; the refusal tests of F-299 unchanged; `LongStringTests`, the demos and nearly every walk test, all of which print, as guards; `ConcurrentPrinting` at four threads by hand. Second rung: a walk test of the reader side, with section 2's file and reader probes, the -1 at the end and the refusal after `consume`; a compiled guard over `JavaBufferedReader`; `FileReadWrite`, `WordCountSmall`, `FileConversion` and `LongStringTests` as guards; the quick check of microGPT. A row for each defect of section 2 closes where the rung repairs it [21].
22. **Size.** Two rungs, the writer side with `stdOut` first and then the reader side, as the record's plan sizes N4. Each is Java of walk and library text [22].
23. **Model.** No line. Its 6 lines go through `stdOut`'s new helper in UTF-8, and its reads through `JavaBufferedReader` (section 5).

### (c) The glue kept for the 36 until the switch-over

24. **What it is.** The 36 stay on their glue classes. Until the switch-over, the compiled path's `println` stays the prelude's, straight to `System.out` [24].
25. **What it costs at the switch-over.** The one library's `println` writes through `stdOut`, whose factory names a glue class, and a compile refuses a glue string (section 2, point 15). So on that day no program that prints compiles until N4 is done. N4 then lands inside the names batch, (b)'s two rungs or (a)'s, beside N5 and row 874, on one gate. The work is the same; it is all on the day with the most change [25].
26. **Bindings moved now:** none. **Tests now:** none. **Size now:** none; two rungs on the switch-over day.
27. **Model.** No line, and nothing changes before the switch-over.

### (d) `println` over a helper first, the 36 later

28. **What it is.** `print`, `println`, `errorPrint` and `errorPrintln` become natives over `FlatString`, each beside an overload over `String` that flattens, rung T's pair as `printlnWithThread` already is. They name `simplePrintln`'s `nativePrint`, `nativePrintln`, `nativeErrorPrint` and `nativeErrorPrintln`, which the prelude binds for the same operations. `stdOut` and the 36 stay on glue, for (b) later. This is the prelude's later form, and walk's own form until 2008-12-11 [28].
29. **What it costs.** Those helpers write to `System.out` in the platform's encoding: under walk, the helper behind `printlnWithThread` printed `h?llo ? ? ?` where `println` printed `héllo λ → ∑` (section 2, point 17). So (d) needs new helpers that write UTF-8, as the glue's writer does, or every walk program that prints a character outside ASCII changes its output. Two Java writers then share the standard output, `stdOut`'s and `System.out`; their lines stay in order only while each print flushes, as the library's prints do [29].
30. **Bindings moved:** none of the 36; 4 new pairs on helpers. **Tests:** a walk test of the four at a rope and outside ASCII; a compiled guard. **Size:** one small rung, then (b)'s two: three in all.
31. **Model.** No line. Its 6 lines are ASCII, so they print the same.

**References**

1. `interpreter/glue/StaticNativeApp.java:114-147`; `explorations/perf-probes/loader-declaring-type/REPORT.md`, section 3; `explorations/coordinator/CLIMB-BATCH-26.md`, section 4, "The I/O objects' carrier and Java type"; `interpreter/glue/prim/Writer.java:157-166`.
4. The lines cited; section 2, points 1 to 3 and 16.
5. `explorations/coordinator/tools/distance/run.sh:87-90`; `compiler/NamingCzar.java:368-389`, `:453-454`; F-321 (`FACTS.md:147`); `Library/File.fss:66`; `Library/Writer.fss:20-26`.
6. `.claude/skills/fortress-repo/SKILL.md`, "The compiled run time"; `compiler/runtimeValues/FJavaBufferedWriter.java:16-28`; `compiler/nativeInterface/FortressMethodAdapter.java:150-153`; `explorations/coordinator/PLAN.md:54`, the compiled carrier of the one library's `FlatString`.
7. `ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss`; `ProjectFortress/tests/FileReadWrite.fss`, `LongStringTests.fss`, `WordCountSmall.fss`, `FileConversion.fss`.
10. `explorations/coordinator/PLAN.md:53`; `explorations/perf-probes/prelude/natives-shape.md`, section 2, "The classes", D1; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:592-613`; `ProjectFortress/BirdyLib/File.fss:20-32`; P-58. The sketch is not run.
11. `Library/FortressLibrary.fsi:15`; section 1, point 18; `StaticNativeApp.java:96-111`.
12. `interpreter/glue/prim/Writer.java:30`, the constructor's `FTypeObject selfType`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:369`; `Library/FortressLibrary.fsi:536`; F-299, the carrier of `Int`; `interpreter/glue/prim/FlatString.java:25-40`; `interpreter/evaluator/values/FString.java:45-58`; `StaticNativeApp.java:304`.
13. `Library/Writer.fsi:15-23`; `Library/File.fss:20-22`, `:64-66`; `ProjectFortress/BirdyLib/File.fss:21`; section 1, point 18.
14. Section 2, point 16; F-32.
15. `compiler/runtimeValues/FortressBufferedReader.java:55-69`; `Library/FortressLibrary.fsi:1201`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:756-766`; `StaticNativeApp.java:265-274`; `interpreter/glue/prim/Writer.java:157-166`; section 2, point 17.
16. Section 2, points 6 and 8; `Library/Writer.fsi:22`; `Library/File.fsi:102`, `:131`.
17. The lines cited; `nativeHelpers/fileOps.java`.
18. The files cited.
19. `compiler/NamingCzar.java:464-490`; F-321; P-58; P-39; `explorations/coordinator/tools/distance/run.sh:87-90`.
20. `explorations/perf-probes/prelude/natives-shape.md`, section 2, "The names", the 21 run-time class files (`grep -l CompilerBuiltin ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/*.java` lists 21, `FJavaBufferedReader.java` and `FJavaBufferedWriter.java` among them); `compiler/NamingCzar.java:589-590`; `runtimeSystem/Naming.java:297-298`; `nativeHelpers/fileOps.java:37`, `:82`.
21. The tests cited; `git grep -l` of the I/O objects' names over `ProjectFortress/tests/*.fss` lists `CovCollTest`, `FileConversion`, `FileReadWrite`, `LongStringTests`, `WordCountSmall` and `XXXnonBooleanCond`.
22. `explorations/perf-probes/prelude/natives-shape.md`, section 3, step 5.
24. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:460`.
25. `Library/FortressLibrary.fss:4543-4546`; `Library/Writer.fss:20-26`; `explorations/coordinator/PLAN.md:54`.
28. `Library/FortressLibrary.fss:4640-4644`; `nativeHelpers/simplePrintln.java:16-62`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:13-16`, `:452-460`; section 3, point 3.
29. Section 2, point 17; `interpreter/glue/prim/Writer.java:157-166`; `Library/FortressLibrary.fss:4543-4546`.

## 7. How the options weigh against each other

1. **The team's sources.** (b) is the team's later shape for a file stream, an object over a Java-backed value in a field, with the team's Java types, and it keeps the library's `stdOut` as a `Writer` and its UTF-8. (a) keeps the 2008 shape on walk, but no source of the team gives it a compiled half. (d) is the prelude's later `println`, but it loses the library's UTF-8 unless its helpers are new. (c) decides nothing now [1].
2. **The library's way.** (b) follows the library's pattern for a type that both paths name and that holds a Java value: a trait of the main component, a native object of walk below it, a run-time class of the compiled path that implements it, as `ZZ32`, `Int` and `FZZ32` stand. (a) puts a Java value inside five objects with value parameters. In the prelude, each type that holds a Java value is a trait that a hand-written run-time class implements, as `ZZ32`, `JavaString` and `JavaBufferedWriter` are [2].
3. **Walk's carrier.** (b) needs no declaring-component device, because the two traits are types of the main component. (a) extends the device from one type to five, and leaves the compiled half open [3].
4. **The checker's table.** (b) maps one Java type to one Fortress type to one run-time class, as the prelude does. (a) maps two Java types to five Fortress types, which the table cannot hold [4].
5. **What each needs from N5.** [5]
    - (a): a design, not yet made, for the compiled carrier of five library objects with value parameters and mutable Java state, beside the one that `FlatString` already needs; and a way out of the table's one-to-one form.
    - (b): only what N5 already holds: two of its 21 run-time classes, two boxed-type entries, and the raise strings, with a `FileNotFoundException` in the one library. Its walk-world table entries land with its first rung.
    - (c): all of N4, inside the names batch.
    - (d): nothing for `println`; the 36 then need (b) and its N5 part.
6. **Risk and order.** (b)'s first rung lies on every program's output, so the whole walk suite tests it, and `ConcurrentPrinting` checks that a line stays whole. It changes five library objects from native to plain Fortress, and one api header, `Writer`'s. (a) changes less library text, but its compiled half has no design, so the 36 still cannot compile after it. (d) is the smallest first step, but it splits the standard output between two writers and costs a third rung [6].
7. **The model.** No option changes a line of microGPT or its time inside a step (section 5) [7].

**References**

1. Section 3, points 14 to 18.
2. `Library/FortressLibrary.fsi:536`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:369`; `compiler/runtimeValues/FZZ32.java:14-15`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:52`, `:210`, `:605`; `compiler/runtimeValues/FJavaBufferedWriter.java:16`; section 6, points 6 and 12.
3. Section 6, points 1, 6 and 11.
4. Section 2, point 13; section 6, points 5 and 19.
5. Section 6, points 6, 20, 25 and 28; `explorations/coordinator/PLAN.md:54`.
6. Section 2, point 10; section 6, points 13, 21, 29 and 30.
7. Section 5.

## 8. Recommendation

Option (b): declare `JavaBufferedWriter` and `JavaBufferedReader` in `FortressLibrary`, carried by name in `FortressBufferedWriter` and `FortressBufferedReader`, with their two walk-world table entries, and rebuild `Writer`, `BufferedWriter`, `FileWriteStream`, `FileReadStream` and `Reader` as plain objects over a field of those types, in two rungs, the writer side with a UTF-8 `stdOut` first.
