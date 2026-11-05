# Rung T, climb batch 26: the string family onto helpers (items 310 and 340; row 846)

- problem: 161 of the one library's 449 live native bindings name walk's glue classes, which the compiled path cannot run (F-32), the string family's 20 among them; the five over `String` read a rope's type name (row 846; `explorations/reviews/string-natives-2026-11-05.md`, section 2.3), and `FlatString`'s methods could not name a helper, since walk carried no `self` for a type named `FlatString` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:88` at 4d27fbcc5)
- spec: none; `grep -rn builtinPrimitive Specification --include=*.tex` prints only `Specification/appendices/changes.tex`; the library chapter only includes the api `FortressBuiltin` (`Specification/library/default-libraries.tex:37-39`)
- precedent: the team's pair of a native over `FlatString` beside an overload over `String`, `Library/Writer.fss:33-35`, `:45-49`, `Library/File.fss:20-22`; the flattening `typecase` of `Library/FlatString.fss:137-140` and `Library/String.fss:84-87`; the loader's way 1 of `explorations/perf-probes/loader-declaring-type/shadow.patch:1-145`
- deviation: FlatString's line separator binds `stringOps.lineSeparator` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:72`), not a helper of `systemOps` as the record's fork 22 placed it, since the checker cannot read `systemOps` against the interpreter's prelude (NEW-T-1); the loader's refusal of a helper parameter declared `String` (`StaticNativeApp.java:70`) is beyond the probe's patch; the comment of `javaForSelf(String)` is worded anew (`StaticNativeApp.java:96-102`)
- historical: ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java, ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java, ProjectFortress/src/com/sun/fortress/nativeHelpers/simplePrintln.java, ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java, Library/FlatString.fss, Library/FortressLibrary.fss, Library/FortressLibrary.fsi, Library/System.fss, Library/System.fsi

## What changed and why

Commits on `wip/rung-string-natives`: `15d81c1c1` (the tests, before the change), `19e9dbda5` (the change), `8b6fca9b5` (the line separator onto `stringOps`).

- **Walk's loader.** `NativeApp.java:201` passes `StaticNativeApp.find` the declaring type, not its name. `find(String, Applicable, FType)` (`StaticNativeApp.java:163`) reads `self`'s carrier through the new `javaForSelf(FType)` (`:122`): the object `FlatString` that the component `FlatString` declares at its top level, told by `declaringComponent` (`:136`) from the top level of the type's environment, carries `self` in a Java `String`; every other type is read by its name by `javaForSelf(String)` (`:103`), unchanged, so a program's own type named `FlatString` or `JavaString` still carries none. This is the probe's Java, hunk for hunk; the comment of `javaForSelf(String)` is reworded to say what the code does.
- **The last step, taken.** The new `javaForParameter` (`StaticNativeApp.java:70`) carries a parameter's declared type as `javaFor` does, except `String`: the loader refuses a helper parameter declared `String` at load, 'no Java type carries the declared type of parameter a.' (`:178-180`). A parameter declared `FlatString` or `JavaString`, and a result declared `String`, are still carried in a Java `String`.
- **`FlatString`'s methods**, 11 of 13 (`Library/FlatString.fss:35-101`), name helpers; `=` and `flatConcat(self, b:Char)` stay on `FlatString$Eq` and `FlatString$Concat` (item 331). `natLineSeparator` (`:25-26`) and `match` (`Library/FortressLibrary.fss:4615`) name helpers.
- **The five over `String` as pairs.** `printThreadInfo`, `printWithThread`, `printlnWithThread` (`Library/FortressLibrary.fss:4628-4644`, api `Library/FortressLibrary.fsi:2633-2639`) and `getEnvironment`, `getProperty` (`Library/System.fss:41-56`, api `Library/System.fsi:34-41`, with `import FlatString.{FlatString}` at `System.fss:14` and `System.fsi:14`) are each a public native over `FlatString` whose body is exactly `builtinPrimitive("...")`, beside an overload over `String` that flattens in the library's `typecase` and stops with `fail` in its `String` arm. `printThreadInfo(a:Number)` stays on `StringPrim$PrintThreadInfo`.
- **Helpers.** New, public and static, no state: in `stringOps.java` `asExprString` (`:44`, quoting through `Unprinter.enQuote` as `FString.toString` does, `interpreter/evaluator/values/FString.java:31-33`), `compareToIgnoreCase` (`:48`), `javaSubstr` (`:53`, Java's `substring`, which raises out of range), `javaRegExpMatches` (`:57`), `javaRegExpSplit` (`:62`), `match` (`:67`), `lineSeparator` (`:72`); in `simplePrintln.java` `printThreadInfo`, `printWithThread`, `printlnWithThread` (`:40-50`), each the glue's text (`StringPrim.java:64-81`); in `systemOps.java` `getEnvironment` (`:24-27`). No existing method changed; no new class.

### Each binding moved, with its helper's Java signature

| binding | helper | Java signature | helper |
|---|---|---|---|
| `FlatString.size` (`FlatString.fss:35-36`) | `simpleConcatenate.nativeStrlen` | `int (String)` | existing |
| `opr \|self\|` (`:54-55`) | `simpleConcatenate.nativeStrlen` | `int (String)` | existing |
| `asExprString` (`:37-38`) | `stringOps.asExprString` | `String (String)` | new |
| `get(i:ZZ32):Char` (`:83-84`) | `stringOps.charAt` | `int (String, int)` | existing |
| `cmp` (`:85-86`) | `stringOps.compareTo` | `int (String, String)` | existing |
| `cicmp` (`:87-88`) | `stringOps.compareToIgnoreCase` | `int (String, String)` | new |
| `javaSubstr(lo, hi)` (`:89-90`) | `stringOps.javaSubstr` | `String (String, int, int)` | new |
| `javaIndexOf(c:Char)` (`:92-93`) | `stringOps.indexOf` | `int (String, int)` | existing |
| `flatConcat(self, b:FlatString)` (`:94-95`) | `simpleConcatenate.nativeConcatenate` | `String (String, String)` | existing |
| `javaRegExpMatches` (`:98-99`) | `stringOps.javaRegExpMatches` | `boolean (String, String)` | new |
| `javaRegExpSplit` (`:100-101`) | `stringOps.javaRegExpSplit` | `String (String, String, int)` | new |
| `natLineSeparator` (`:25-26`) | `stringOps.lineSeparator` | `String ()` | new |
| `match` (`FortressLibrary.fss:4615`) | `stringOps.match` | `boolean (String, String)` | new |
| `printThreadInfo(a:FlatString)` (`:4628`) | `simplePrintln.printThreadInfo` | `void (String)` | new |
| `printWithThread(a:FlatString)` (`:4635`) | `simplePrintln.printWithThread` | `void (String)` | new |
| `printlnWithThread(a:FlatString)` (`:4640`) | `simplePrintln.printlnWithThread` | `void (String)` | new |
| `getEnvironment(FlatString, FlatString)` (`System.fss:41`) | `systemOps.getEnvironment` | `String (String, String)` | new |
| `getProperty(FlatString, FlatString)` (`System.fss:51`) | `systemOps.getProperty` | `String (String, String)` | existing |

18 bindings, 7 onto 6 existing helpers and 11 onto new ones. So F-32's 161 become 143 and F-299's 288 of 449 become 306 of 449. The helper classes that the one library names for the first time: `simpleConcatenate`, `stringOps`, `simplePrintln`, `systemOps` (`git grep 'nativeHelpers\.\(stringOps\|simpleConcatenate\|systemOps\|simplePrintln\)' -- Library ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` printed nothing on the base). Each helper's name is the only method of that name in its class, so the compiled rewrite adds its `Char` transfer helpers to `get` and `javaIndexOf` (`compiler/BuiltinPrimitiveRewriter.java:186-188`).

### StaticNativeApp and NativeApp against the probe's shadow.patch

- `NativeApp.java:201`: `find(str, defn, declarer)`, as the patch.
- `StaticNativeApp`: the imports, `FLAT_STRING_COMPONENT`, `javaForSelf(FType)`, `declaringComponent`, `find(String, Applicable, FType)` and its message `declarer.getName()`, as the patch. Different from the patch: the comment of `javaForSelf(String)` (`:96-102`), worded anew; and the step, `javaForParameter` (`:64-72`) and its call in `find` (`:178`), which the patch does not have. The patch's hunk of `Library/FlatString.fss` was not taken; the file was written as above.

## The tests: failing runs, then passing runs

All failing runs below ended before the first build of the edit (`ant compileAll` began at about 20:26 UTC); the base's code ran in the tree.

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-string-natives/h1 ProjectFortress/tests/NativeHelperStringRopeWalk.fss    (20:22:48 UTC, base)
    FAIL: J1/0:? =/= J262/0:/usr/lib/jvm/java-25-openjdk-amd64/bin:...; getEnvironment at a rope name
    FortressException: FailCalled
    Tests run: 1,  Failures: 1,  Errors: 0

    harness-one.sh ... NativeHelperBindingWalk.fss NativeHelperNonFlatStringWalk.fss .test NativeHelperUncarriedSelfFlatStringWalk.fss .test    (20:24:21 UTC, base)
    . interpret .../NativeHelperUncarriedSelfFlatStringWalk
     OK Saw expected refusal at load
    . interpret .../NativeHelperNonFlatStringWalk
    9
     Missing expected refusal at load

(`NativeHelperBindingWalk` failed in that run on its missing import, 'FlatString is undefined.'; with `import FlatString.{FlatString}` added it passed on the base, 20:24:32 UTC, `OK (1 test)`.)

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyStringCompiled.test    (20:25:16 UTC, base)
    . link ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled ...NativeHelperFamilyStringCompiled.fss:10:51-103:
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.stringOps.asExprString
    Tests run: 2,  Failures: 2,  Errors: 0

The guards on the base, on the glue:

    harness-one.sh ... NativeHelperCarriedSelfFlatStringWalk.fss NativeHelperUncarriedSelfJavaStringWalk.fss .test    (20:23:52 UTC, base)
    FlatString sizes: 0 5 5 40
     OK (time = 3709ms)
     OK Saw expected refusal at load
    OK (2 tests)

With the helpers built and `FlatString`'s strings moved, before the loader's change:

    harness-one.sh ... NativeHelperCarriedSelfFlatStringWalk.fss    (20:28:10 UTC)
    Caused by: com.sun.fortress.exceptions.InterpreterBug: Library/FlatString.fss:94:5-95:94:
    Native helper com.sun.fortress.nativeHelpers.simpleConcatenate.nativeConcatenate: no Java type carries FlatString, the type of self.
    Tests run: 1,  Failures: 1,  Errors: 0

The last runs, after the last change of code (`8b6fca9b5`'s build):

    harness-one.sh ... the six walk tests    (20:50:46 UTC)
    . interpret .../NativeHelperNonFlatStringWalk   OK Saw expected refusal at load
    . interpret .../NativeHelperStringRopeWalk   OK (time = 1246ms)
    OK (6 tests)

    ONE_JVM=1 .../junit.sh final ProjectFortress/compiler_tests NativeHelperFamilyStringCompiled.test    (20:50:51 UTC)
    . link ProjectFortress/compiler_tests/NativeHelperFamilyStringCompiled  OK (time = 4185ms)
    PASS
    OK (2 tests)

Also, after the change, `junit.sh after ... NativeHelperFamilyStringCompiled.test NativeHelperBindingCompiled.test NativeHelperFamilyCharCompiled.test NativeHelperTransferCompiled.test` printed `OK (8 tests)` (20:34:44 UTC).

    ant testSystem    (after 8b6fca9b5)
    [junit] Tests run: 181, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 210.337 sec
    [junit] Tests run: 187, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 219.519 sec
    [junit] Tests run: 186, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 220.344 sec
    [junit] Tests run: 189, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 231.483 sec
    BUILD SUCCESSFUL / Total time: 3 minutes 54 seconds

743 tests: climb batch 25's gate's 741 and the two new walk tests. No verdict changed but `NativeHelperNonFlatStringWalk`'s, which is now a refusal test, and its run checks the new refusal.

### The prints under walk

The rope test's prints, after (`final-walk` run; the harness checks no printed text but 'fail'):

     Thread ForkJoinPool-1-worker-1 operating on value abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
     Thread ForkJoinPool-1-worker-1 operating on value PATH
     Thread ForkJoinPool-1-worker-1 operating on value 
     Thread 26: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
     Thread 26: PATH
     Thread 26: 

The same calls on the base, run by `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base26 <tree>/tmp/old-caches StringProbe.fss` (a scratch program of the test's calls), and on the tree by `bin/fortress StringProbe.fss`; `diff` of the two outputs:

    <  Thread ForkJoinPool-1-worker-1 operating on value CatString
    <  Thread 26: SubString
    <  Thread 26: EmptyString
    >  Thread ForkJoinPool-1-worker-1 operating on value abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
    >  Thread 26: PATH

and for the two lookups: `env rope default: CatString` against `env rope default: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`, `prop rope name: ?` against `prop rope name: 25.0.4.1`, `env empty default: [EmptyString]` against `env empty default: []`. Compiled, the guard printed ` Thread ForkJoinPool-2-worker-1 operating on value hello` and ` Thread 23: hello`.

## Values that move

- **The five over `String` at a string that is not flat**: the characters, where the base passed the type's name (`CatString`, `SubString`, `EmptyString`), above.
- **`javaIndexOf` at a character past U+FFFF.** `w = "a" || char(128512).asString || "b"`, whose middle character is U+F600 by row 872: `w.javaIndexOf(char(128512))` answers 1 on the base and -1 on the tree (the probe above: `supplementary: size 3 javaIndexOf(sup) 1 javaIndexOf('b') 2` against `... javaIndexOf(sup) -1 ...`). The glue searched for `(char) c`, the low 16 bits (`interpreter/glue/prim/FlatString.java:180-184`); `stringOps.indexOf` searches for the code point (`stringOps.java:35-37`). `javaIndexOf(char(62976))` answers 1 on both. Below U+FFFF the answers agree.
- **`getProperty` at an `EmptyString` name** now raises `java.lang.IllegalArgumentException: key can't be empty`, as a flat `""` name does on the base and on the tree (`EmptyProp.fss`, `getProperty("", "?")`, the same line from `old-fortress.sh` and `bin/fortress`); on the base the `EmptyString` name was read as the key `EmptyString` and answered its default. The rope test leaves this call out.

## Where the fix belongs, and the precedent search

- The loader is walk's (`explorations/coordinator/map/modules-and-phases.md`: `interpreter/glue/` is walk only); the helpers run on both paths, so each is tested on both (`NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`; `NativeHelperFamilyStringCompiled`).
- The pair: the team's `Writer.write(s:FlatString)` native beside `write(s:String)` (`Library/Writer.fss:33-35`, `:45-49`), `File`'s factory (`Library/File.fss:20-22`), and the compiler's `getProperty` (`Library/CompilerSystem.fss:20`). The flattening spelling: `Library/FlatString.fss:137-140` and `Library/String.fss:84-87`, the two `typecase` sites on `asFlatString` in the components the distance stage checks; the direct call `f(a.asFlatString)` has no site in those components.
- The loader: climb batch 25's carrier of `self` by the declaring type's name, and the probe's way 1 (`explorations/perf-probes/loader-declaring-type/REPORT.md`, section 3).
- Ways the language and the library offer for item 310 (the strings review, section 6): (a) the loader flattens every string argument; (b) the pairs, taken; a private native beside a public overload (item 332's form), not taken. For item 340: way 1, taken; ways 2 to 8 of the probe, not taken.

## What the specification settles

Nothing: no chapter names `builtinPrimitive`, `FlatString` or these five functions. The decisions are P-58 and the record's forks 18 to 23.

## The count and the distance

Both ran once on the final tree after its build (`8b6fca9b5`), in the background, each started alone. An earlier run of each on `19e9dbda5` is reported under "A site that came".

    diff explorations/compile-ladder/climb-batch-25/gate/checker-count.txt tmp/rung-string-natives/checker-count-postedit.txt
    (no output)
    #total	0
    #crash	none

The count stage took 152 s (20:47:40 to 20:50:12 UTC; load 1.09 at start; nproc 4, Intel Xeon @ 2.10GHz, OpenJDK 25.0.4.1).

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-25/gate/distance.txt tmp/rung-string-natives/distance-postedit.txt
    DISTANCE SAME   0
    #seconds	206	FortressLibrary 150

`tmp/rung-string-natives/dist-post/errors.tsv` holds its header only, as `explorations/compile-ladder/gate/distance-sites.tsv` does: no site moved. The `FlatString` target checked `api com.sun.fortress.nativeHelpers` and the object `FlatString` with errors=0 (`### done Library/FlatString.fss rc=0`).

### A site that came, and went

The first distance run, on `19e9dbda5`, where `natLineSeparator` named `systemOps.lineSeparator`:

    ### target Library/FlatString.fss componentOnly=true
    Internally generated library name, in source code NamingCzar.:0:0:
        FortressBuiltin.StringVector is undefined.
    File FlatString.fss has 1 error.
    #total	none: 1 target(s) stopped with errors the stage does not count: Library/FlatString.fss rc=-1 (File FlatString.fss has 1 error.)

Traced to its binding: the checker reads the whole class that a binding names, and `systemOps.getArgs` answers an `FStringVector` (`nativeHelpers/systemOps.java:29`), which `NamingCzar` maps to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:339-340`), a type that the interpreter's prelude does not declare. The line separator moved to `stringOps` (`8b6fca9b5`), and the stage came back to 0. The count stage, which reads only `FortressLibrary`, gave 0 on both code states. `System`'s two natives name `systemOps` still, and neither stage reads `System` (NEW-T-1).

## The ladder subset

Files whose first error in `explorations/compile-ladder/ladder.tsv` names what the change touched: `tests/abortBlock.fss` and `tests/atomic5.fss`, 'Variable printThreadInfo is not defined.' Run by the copied `run-subset.sh` and `classify.py` under `tmp/rung-string-natives/ladder/`, after the edit: both `disambiguate`, 'Variable printThreadInfo is not defined.', as in `ladder.tsv` (the compiled path reads its own prelude until the switch-over). Neither is in the gate's 85.

## Sentences made false

- `Specification/appendices/changes.tex:4499-4502`: "The interpreter passes a helper declared over \TYP{String}, as its glue classes do, the name of the value's type in place of its characters where the value is not a flat string, as a \TYP{String} made by concatenating two long strings (row~846 of the revival's gap ledger)." The loader now refuses a helper parameter declared `String`; only a glue class over `String` still receives the type's name.
- `Specification/appendices/changes.tex:4503-4507`: "... and takes only an overload whose first Java parameter carries that type, which it reads by the type's name, for the types of \library\ whose names no program can give its own types." The library's `FlatString` is now read by its declaring component.
- `explorations/coordinator/FACTS.md:134`, F-299: "288 of the one library's 449 live bindings" (now 306); "`FlatString` and `JavaString` carry no `self`, since a program can name its own types so; a helper binding of a `FlatString` method would stop every program at load."; "a native over `String` receives a non-flat string's type name (row 846)" (now: a glue class over `String`); "the other 161 name glue classes" (now 143).
- `explorations/coordinator/FACTS.md:30`, F-32: "161 of the one library's 449 live native bindings" (now 143).
- `.claude/skills/fortress-repo/references/interpreter.md:95` ("`String`, `FlatString` and `JavaString` in `String`": for a parameter, `String` is refused), `:99` ("except `FlatString`, `JavaString` and `()`"), `:102` ("So a binding in a method of the library's `FlatString` cannot name a helper yet: every program would stop at load."), `:116` ("A native declared over `String`, glue class or helper alike, receives the wrong text for a `CatString`"); the refusal list at `:107` gains a parameter declared `String`.
- `explorations/coordinator/PLAN.md:10` and `:46`, "288 ... and 161 still name glue classes"; `:47`, "the 7 left wait on review-queue items 327 ... and 310 (over `String`, row 846) and review-queue item 340 (`FlatString`'s five)".
- Row 846's claim, which record.md rewrites.

## Points to report

1. Each method changed in `StaticNativeApp` and `NativeApp`, and how it differs from the probe's patch: section "StaticNativeApp and NativeApp against the probe's shadow.patch".
2. Each binding moved with its helper and Java signature, and the four helper classes the one library names for the first time: the table above.
3. The tests before and after, the test of `FlatString`'s methods stopped at load with the strings moved before the loader's change, the compiled guard through `junit.sh`, the prints: section "The tests".
4. The count table and the distance table on the final tree, 0 and 0, the count stage 152 s; a site that came on the first run, `FlatString`'s, traced to `natLineSeparator`'s `systemOps`, and gone after the helper moved to `stringOps`.
5. The last step taken: `StaticNativeApp.java:64-72`, `:178`; it changed `NativeHelperNonFlatStringWalk.fss` and its new `.test`, and `NativeHelperBindingWalk.fss:10-11`, `:17` (`cat`, `len`, `bazS` over `FlatString`) with an added `import FlatString.{FlatString}` at `:3`, asserts kept.
6. Values that move: section "Values that move"; in `ant testSystem` only `NativeHelperNonFlatStringWalk`'s verdict changes in kind (refusal test).
7. Row 846 narrowed (record.md); rows 877 and 878 do not move: the step reads a parameter's type by its name as before, and refuses only the name `String`, so row 877's `slen(x: FlatString)` beside `object FlatString` still loads; the linker is untouched.
8. Every sentence made false: section above.
9. Files beyond those named: `ProjectFortress/tests/NativeHelperBindingWalk.fss:3` gains an import line, outside "its three bindings over String"; and the line separator's helper is in `stringOps.java`, not `systemOps.java`. No glue class, no checker code, no compiler code is edited.

## Decisions

1. **The overload over `String` is a `typecase` on `asFlatString` with a `fail` in its `String` arm** (fork 19). Not taken: the direct call `f(a.asFlatString)`, which would recurse without bound at a program's `String` whose `asFlatString` answers a string that is not flat (`Library/FortressLibrary.fsi:2454` declares `String`); a private native beside a public overload (item 332's form).
2. **The last step taken** (fork 21): every other part passed first (20:30:57 UTC). Not taken: leaving it out, which keeps row 846 open for a program's helper binding. The judge's note stands: the checker reads a helper's Java `String` as `String` (`compiler/NamingCzar.java:488`), so the stages accept a parameter that walk refuses.
3. **The line separator on `stringOps.lineSeparator`, not on `systemOps`** (a departure from fork 22's placement). Evidence: the first distance run above. Not taken: `systemOps`, which the checker cannot read; `simplePrintln`, a class of output; leaving `natLineSeparator` on `Writer$LineSeparator`, which leaves 17 of the 18; changing `systemOps.getArgs`, an existing method (fork 17 forbids); a new class (fork 22 forbids).
4. **`javaSubstr` on a new helper over Java's `substring`** (fork 22), not `stringOps.substring`, which clamps (`useful/Useful.java:974-982`).
5. **`asExprString` calls `Unprinter.enQuote`**, the method that `FString.toString` calls, so the quoting is the glue's by construction. Not taken: a quoting of its own in the helper.
6. **Each new helper takes a name no other method of its class has**, so walk's loader finds one overload and the rewrite adds its transfer helpers. The names follow the Fortress names (`javaSubstr`, `javaRegExpMatches`, `match`) or Java's (`compareToIgnoreCase`).
7. **The rope test's names**: `getEnvironment` at `PATH` and `getProperty` at `java.version`, both set in every run of the harness; no name that is set is longer than `maxLeafSize`, so the name's rope is `CatString("PA", "TH")` and its `SubString` a subscript of a `CatString` across both halves, and the long rope made by `||` is passed as the default at an unset name. Not taken: assigning `maxLeafSize`, a library variable that every test of a shard shares.
8. **`getProperty` at an `EmptyString` name is left out of the rope test**, since it raises as a flat empty name does.
9. **`NativeHelperUncarriedSelfFlatStringWalk` keeps `len(): ZZ32`** with its string on `nativeSmartConcatenate`: the refusal of `self` comes before the fit check. Not taken: a declaration that fits the helper, which with the step would need a parameter that is refused first.
10. **The compiled guard binds over `JavaString`**, as the other families' guards (fork 23).

## Defects, with their homes

- The five over `String` at a string that is not flat (row 846, the library's part): home 1, `NativeHelperStringRopeWalk`.
- A program's helper binding with a parameter declared `String` (row 846, the helper part): home 1, `NativeHelperNonFlatStringWalk`, a refusal test.
- A program's glue binding over `String` (row 846 as narrowed): home 3, the row stays open; its test is `NativeHelperNonFlatStringWalk`, as the record's section gives it, and the glue case was measured by `tmp` program `GlueOverString.fss`: ' Thread 26: CatString'.
- The checker cannot read a binding of a helper of `systemOps` against the interpreter's prelude (NEW-T-1): home 3, specification silent, no gated test can show it (the compiled tests check against the compiler's prelude, which declares `StringVector`); the row's notes give the stage's output.
- `javaIndexOf` past U+FFFF moves with row 872's low 16 bits: no new defect; a note to row 872 in record.md.

## Commands worked out

- The ladder subset: `cp explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh explorations/compile-ladder/baseline-2026-09-19/classify.py $D/`, the two `sed` lines of `gate.md`, a two-line `subset.txt`, a copy of the tree's caches to `$D/root/ladder-caches` and `$D/root/pristine`, then `bash $D/run-subset.sh && python3 $D/classify.py`; it writes `$D/ladder.tsv`.
