<!-- The design for the curator's decision on how walk's native bindings over strings move from the glue classes to the helpers of `nativeHelpers/`, which both paths call: whether walk's loader flattens a rope before it calls a helper, or each such binding is declared over `FlatString` and the library's callers flatten, and how the loader tells the library's own `FlatString` (review-queue items 310 and 340; ledger row 846 with its siblings 864, 877 and 878), written 2026-11-05 by an Opus worker, reading only, with probe runs on walk and on the compiled path in a worktree seeded from the base build at `dc571c1f3`. -->

# Strings at the natives: the design for the curator's decision

The tree is `main` at `4259eeba1`. Every Fortress run below took place in the worktree `/home/user/fortress-strrev`, seeded from the base build `/home/user/fortress-base25` at `dc571c1f3`. The files that this review cites are the same at both commits, with two exceptions that move no cited line: a two-line change of the `NN64` transfer at `compiler/BuiltinPrimitiveRewriter.java:189-190`, and line-for-line edits of the number bindings in `Library/FortressLibrary.fss` (`git diff dc571c1f3 4259eeba1` over the cited files). The probe programs are scratch, under the worktree's `tmp/`. Each reference quotes the lines that matter and the output. A Java path without a prefix is under `ProjectFortress/src/com/sun/fortress/`.

## 1. The question, and a primer

**The question.** When walk's native bindings over strings move from glue classes to helpers, who makes a long string flat before a helper reads it: walk's loader, once, for every helper, or the library, by declaring each such binding over `FlatString` and flattening the string at its callers?

**The words.**

1. *Walk* is Fortress's interpreter. The *compiled path* compiles a program to JVM bytecode and runs that. A *native binding* is a library declaration whose body is `builtinPrimitive("…")`. The string in it names Java code that does the work [1].
2. A *glue class* is a Java class under `interpreter/glue/prim/` that takes walk's own run-time values. Only walk can run it. A *helper* is a public static Java method under `nativeHelpers/` that takes plain Java values, such as a `java.lang.String`. Both paths can call a helper [2].
3. *Walk's loader* is the Java code that reads a binding's string, finds the helper that it names, and, at each call, turns walk's values into Java values: `interpreter/glue/StaticNativeApp.java` [3].
4. The *one library* is the interpreter's library, `Library/` and most of `ProjectFortress/LibraryBuiltin/`. The compiled path moves onto it at the *switch-over*. Until then the compiled path has its own small library, the *prelude* [4].
5. P-58 decided that every native binding is to name a helper. Of the one library's 449 live bindings, 288 name a helper and 161 still name glue classes. Twenty of the 161 are the *string family*, which waits on items 310 and 340 [5]. P-58 is an entry of POSITIONS, the curator's decisions. The *record*, the project's memory under `explorations/`, also holds FACTS (entries F-N), the gap ledger (its rows, one for each known gap) and the review queue (its items, the curator's open questions).

**How a string lives in Fortress.**

6. `String` is a trait, not a class. A trait declares members, and objects implement them. A string literal has the type `String` [6].
7. The one library implements `String` with four objects: `FlatString`, `CatString`, `SubString` and `EmptyString` [7].
8. `FlatString` is the *flat leaf*: one piece of text held in one Java string. Under walk its value is the Java class `FString`, a box around one `java.lang.String`. Its component is declared `native component`, so walk builds its objects through the glue class `FlatString` [8].
9. `CatString(first, second)` is the *rope node*. It holds two strings and copies neither. Its size and its depth are fields. A *rope* is a tree of such nodes whose leaves are flat strings. `SubString(baseString, range)` is a view of a part of another string. `EmptyString` is the empty string as an object [9].
10. When a rope arises:
    - `a || b` on two flat strings copies them into one new flat string while their sizes add up to at most `maxLeafSize`. Above that, `||` builds a `CatString` and copies nothing [10].
    - `maxLeafSize` is a variable of the `String` api, 32 by default. Its comment says "Clients may assign to this variable" [10].
    - Juxtaposition of two strings, as `"a" "b"`, is `||` [10].
    - A slice of a rope that crosses its two halves is a `SubString` [10].
    - When a rope becomes much deeper than its size needs, `||` rebalances it. The test compares the size with a Fibonacci number of the depth [10].
11. What each operation does with either form [11]:
    - size: a native of `FlatString`; a field of `CatString`;
    - one character, `s[i]`: a native of `FlatString`; a `CatString` goes down into the half that holds position `i`;
    - comparison: a native of `FlatString`; a `CatString` compares piece by piece;
    - printing: each form writes itself on a stream; a `CatString` writes its two halves, and each flat leaf goes out through the writer's native;
    - `s.asFlatString`, *flattening*: a `FlatString` answers itself; a `CatString` flattens its two halves and copies them into one new flat string; a `SubString` copies its part; `EmptyString` answers `""`.
12. An example, run under walk [12]:

        short = "hello" || " world"
        long = "abcdefghijklmnopqrstuvwxyz" || "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        edge32 = "abcdefghijklmnop" || "qrstuvwxyzABCDEF"
        edge33 = "abcdefghijklmnop" || "qrstuvwxyzABCDEFG"
        path = "../../apl/reference/dzaima/w" "/" "attn_wq" ".txt"

    prints, through a `typecase` that names each value's object:

        1 literal: FlatString size 5
        2 short concat: FlatString size 11
        3 two 26-char halves: CatString size 52 depth 1
        4 16+16=32: FlatString size 32
        5 16+17=33: CatString size 33
        6 the model's weight path: CatString size 40 depth 1
        7 asFlatString of 3: FlatString size 52
        8 index and slice of 3: E SubString yzAB
        9 empty: FlatString and EmptyString
        10 printed whole: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ

    So the program never sees which form it holds: size, indexing, slicing and printing give the same answers. Only a native that reads the Java string inside sees the form.
13. A *native binding over a string* is a native binding with a parameter, or a `self`, of a string type. Two examples [13]:
    - `getter size() : ZZ32 = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.FlatString$Size")`, a method of `FlatString`, whose `self` is a `FlatString`;
    - `printlnWithThread(a:String):() = builtinPrimitive("com.sun.fortress.interpreter.glue.prim.StringPrim$PrintlnWithThread")`, whose parameter can be any `String`.
14. The declared type decides which values reach the native. Fortress chooses among the declarations of one name by the run-time types of all the arguments, which is called *dispatch*. So only a flat string reaches a native declared over `FlatString`: a rope there stops the call with an error. Every form reaches a native declared over `String` [14].
15. A helper wants a Java string. A flat string holds one. A rope holds none: it must first be flattened. This review asks where that flattening is written [15].

**References**

1. `.claude/skills/fortress-repo/SKILL.md`, the words *walk* and *compiled path*; P-58 (`explorations/coordinator/POSITIONS.md:55`); the comment of `builtinPrimitive`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`.
2. F-32 (`FACTS.md:30`); a glue class, `interpreter/glue/prim/StringPrim.java:64-110`; a helper, `nativeHelpers/simpleConcatenate.java:26-28`.
3. `interpreter/glue/StaticNativeApp.java:21-31` (its comment), `:194-212` (the call), `:225-234` (`unbox`).
4. `.claude/skills/fortress-repo/references/library.md:3-11`; `references/compiler.md`, "The compiler's prelude, until the switch-over".
5. P-58; F-299 (`FACTS.md:134`); F-32; `explorations/coordinator/CLIMB-BATCH-25.md:409`, "The string family"; `.claude/skills/fortress-repo/SKILL.md`, "The record".
6. `Library/FortressLibrary.fsi:2447-2460`; `Specification/basic/expressions/literals.tex:57`: "A string literal has type \TYP{String}."
7. `Library/FlatString.fss:34`; `Library/String.fss:75`, `:282`, `:353`.
8. `interpreter/evaluator/values/FString.java:17-29`; `Library/FlatString.fss:12`, `:20-21`; `interpreter/glue/prim/FlatString.java:25-35`.
9. `Library/String.fss:75-79`, `:353-357`, `:282-290`.
10. `Library/FlatString.fss:121-129`, `:131-142`; `Library/String.fsi:52-55`; `Library/String.fss:576`; `Library/FortressLibrary.fsi:2547-2549`; `Library/FortressLibrary.fss:4513`; `Library/String.fss:148-161`, and point 12, line 8 of the output; `Library/String.fss:18-27` (the Fibonacci table), `:41-45` (the tests), `:53-59` (`concatAndBalanceIfNecessary`), `:171-180` (`balanced`).
11. Size: `Library/FlatString.fss:35-36`, `Library/String.fss:76-78`. Character: `FlatString.fss:83-84`, `String.fss:125-126`. Comparison: `FlatString.fss:70-76`, `:85-86`, `String.fss:96-111`. Printing: `FlatString.fss:154`, `String.fss:163-166`, `Library/Writer.fss:45-49`, `:54-57`. Flattening: `FlatString.fss:39`, `String.fss:83-87`, `:357`, `:288`.
12. `/home/user/fortress-strrev/tmp/probe/StringForms.fss`, run from that folder as `../../bin/fortress StringForms.fss`; the output above, `rc=0`.
13. `Library/FlatString.fss:35-36`; `Library/FortressLibrary.fss:4632`.
14. `.claude/skills/fortress-repo/SKILL.md`, "Fortress as a language", "Dispatch is on every argument, at run time"; the run of section 2, point 8, the last call.
15. `nativeHelpers/simpleConcatenate.java:26-28` (`nativeStrlen(String s1)`).

## 2. Where the string bindings are built today

### 2.1 Walk and the one library

1. Five bindings take a parameter declared `String`, and each names a glue class of `StringPrim` [1]:
    - `printThreadInfo(a:String)`, `printWithThread(a:String)` and `printlnWithThread(a:String)`, under the comment "These are useful temporary hacks for debugging multi-threaded programs";
    - `getEnvironment(name:String, defaultValue:String):String` and `getProperty(name:String, defaultValue:String):String`, in the component `System`.

    A sixth, `throwError(a:String)`, is commented out: "time to get rid of this". Row 846 of the gap ledger records the fault of these bindings (section 2.3). Its notes name four of the five and leave out `getEnvironment`. Climb batch 25's record names all five.
2. The rest of the string family is declared over `FlatString` [2]:
    - the 13 methods of `FlatString`, whose `self` is a `FlatString`. Five of them, `cmp`, `cicmp`, `flatConcat` at a `FlatString`, `javaRegExpMatches` and `javaRegExpSplit`, also take a `FlatString` parameter. All 13 name glue classes of `FlatString`;
    - `match(regex:FlatString, some:FlatString)`, on `StringPrim$Match`;
    - `natLineSeparator()`, which takes nothing and answers a string.
3. Outside the family, the I/O objects take the flat type too: the `write(s:FlatString)` of `Writer`, of `BufferedWriter` and of `FileWriteStream`, and the objects `FileReadStream(filename: FlatString)` and `FileWriteStream(fileName:FlatString)`. They belong to N4, the 36 methods of the native I/O objects [3].
4. A native's string result is never a rope. The loader boxes a Java string result as a new `FString`, and so do the glue classes [4].

### 2.2 What walk hands the native

5. A glue class receives walk's value itself. The glue classes over `String`, `Util.S2V`, `Util.SS2S` and their kin, read it with `getString()`. An `FString` answers its characters. Every other object answers the name of its type [5].
6. The glue classes of `FlatString` first cast the value to the flat box, as `((FString) self).getString()`. They can, because dispatch lets only a `FlatString` reach them [6].
7. A helper receives a Java value that the loader makes. For a Java `String` parameter, the loader also calls `getString()`. It carries the declared types `String`, `FlatString` and `JavaString` in a Java `String`, chosen by the type's name. For `self` it carries no `FlatString` and no `JavaString`, because a program may give its own type either name. That gap is item 340 [7].

### 2.3 Where it fails: row 846

8. A small program, run under walk [8]:

        slen(a: String): ZZ32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleConcatenate.nativeStrlen")
        ...
          s = "abcdefghijklmnopqrstuvwxyz" || "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          t = s[24#4]
          println("A |s| = " |s| ", slen(s) = " slen(s) ", slen(s.asFlatString) = " slen(s.asFlatString))
          println("B |t| = " |t| ", slen(t) = " slen(t) ", slen(t.asFlatString) = " slen(t.asFlatString))
          println("C slen(EmptyString) = " slen(EmptyString))
          printlnWithThread(s)
          printlnWithThread(s.asFlatString)
          println("D getProperty(s, dflt) = " getProperty(s, "dflt"))
          println("E the native over FlatString, match, on a flat string: " match("abc.*", s.asFlatString))
          println("F the native over FlatString on the rope:")
          println(match("abc.*", s))

    Its output:

        A |s| = 52, slen(s) = 9, slen(s.asFlatString) = 52
        B |t| = 4, slen(t) = 9, slen(t.asFlatString) = 4
        C slen(EmptyString) = 11
         Thread 26: CatString
         Thread 26: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
        D getProperty(s, dflt) = dflt
        E the native over FlatString, match, on a flat string: true
        F the native over FlatString on the rope:
        com.sun.fortress.exceptions.ProgramError: .../RopeAtNative.fss:21:11-26:
        Closure/Constructor for match parameter 2 (some:FlatString) got type CatString

9. What the output shows:
    - A helper over `String` reads a rope as the name of its type: 9 is the length of "CatString" and of "SubString", and 11 the length of "EmptyString".
    - The glue binding `printlnWithThread` prints the word `CatString`.
    - `getProperty` looks up a property named "CatString", finds none, and answers the default.
    - The native over `FlatString`, `match`, never reads a rope wrongly. The call stops, and the message names the parameter and the rope's type.
    - Every native gives the right answer when the caller passes `s.asFlatString`.
10. Row 846 records the first of these. Its test, `NativeHelperNonFlatStringWalk`, asserts the 9 of today. Its siblings [10]:
    - row 877: a helper binding with a parameter declared at a program's own type named `FlatString` passes that type's name, and answers 10;
    - row 878: a program component named `FlatString` crashes walk's linker with a `NullPointerException`;
    - row 864: a helper binding in a dotted method of a generic trait or object is checked only when an instance is made.

### 2.4 The compiled path today

11. The prelude has a trait `String` and one trait below it with bodies, `JavaString`. At run time every compiled string is an `FJavaString`, a box around one `java.lang.String`. Its `||` copies both sides into a new Java string. So the compiled path has no rope [11].
12. The prelude binds its string natives by `import java` of helpers: `nativeStrlen`, `nativeConcatenate`, `compareTo`, `substring`, `charAt`, `indexOf`, the print helpers and `systemOps.getProperty`. The *checker* is the compiled path's static type checker. In the *compiler's world*, where it checks a program against the prelude, it reads a helper's Java `String` as `JavaString`. The generated wrapper takes the box and calls its `getValue()`. So every compiled string native takes the flat type [12].
13. The prelude's callers flatten first, by `asJavaString`: `print(x:Object):() = jPrint(x.asString.asJavaString)`, and `getProperty(what:String, ifMissing:String) = jGetProperty(what.asJavaString, ifMissing.asJavaString)` [13].
14. Three compiled programs show the rule [14]:
    - `CStrFlat`, a binding over `JavaString` called with `s.asJavaString`, compiles and prints `|s| = 52`, `slenJ(s.asJavaString) = 52`, `slenJ(t.asJavaString) = 52` and `t is a JavaString at run time`.
    - `CStrRefused`, the same binding called with the result of `||`, whose static type is `String`, does not compile: "Could not check call to function slenJ - JavaString->ZZ32 is not applicable to an argument of type String."
    - `CStrOverString`, a binding declared over `String`, does not compile: "Could not check call to function builtinPrimitive_simpleConcatenate_nativeStrlen - JavaString->ZZ32 is not applicable to an argument of type String."
15. In *walk's world*, where the checker checks the one library itself, it reads a helper's Java `String` as the one library's `String`. The *count stage* and the *distance stage*, two stages of the gate that lands each batch, run the checker in that world. So a binding over `String` would pass those stages, by this reading; no binding over `String` names a helper yet. After the switch-over, the compiled code needs a Java string out of the one library's values. The record does not yet say how the compiled path will carry the one library's `FlatString`: no entry of FACTS or POSITIONS but F-299 names `FlatString`. That need is the same under every option below [15].

**References**

1. `Library/FortressLibrary.fss:4627-4632`, `:4634-4636`; `Library/System.fss:40`, `:45`; `interpreter/glue/prim/StringPrim.java:64-110`; row 846's notes (`explorations/coordinator/tools/facts-extract.sh 'ledger:846'`); `CLIMB-BATCH-25.md:409`.
2. `Library/FlatString.fss:35-101`, `:25-26`; `Library/FortressLibrary.fss:4615`.
3. `Library/Writer.fss:33-35`, `:55-57`; `Library/File.fss:22`, `:66`, `:73-75`; F-32.
4. `StaticNativeApp.java:253`; `interpreter/glue/prim/Util.java:246`; `interpreter/glue/prim/FlatString.java:47`.
5. `interpreter/glue/prim/Util.java:234-289` (`getString()` at `:238`, `:246`, `:254`, `:262`, `:270`, `:278`, `:286`); `interpreter/evaluator/values/FString.java:27-29`; `interpreter/evaluator/values/FObject.java:33-35`: `return type().toString();`.
6. `interpreter/glue/prim/FlatString.java:56`, `:65`, `:74`, `:83`, `:101`, `:110`, `:119`.
7. `StaticNativeApp.java:47-58` (`javaFor`, `String`, `FlatString` and `JavaString` at `:54`), `:81-95` (`javaForSelf`, `:88`), `:231` (`unbox`); review-queue item 340 (`explorations/coordinator/review-queue.md:23`, `:192`).
8. `/home/user/fortress-strrev/tmp/probe/RopeAtNative.fss`, run from that folder as `../../bin/fortress RopeAtNative.fss`; the output above, `rc=1`.
9. The output of point 8; `interpreter/evaluator/values/FObject.java:33-35`.
10. Row 846; `ProjectFortress/tests/NativeHelperNonFlatStringWalk.fss:11`; rows 877, 878 and 864 (`facts-extract.sh 'ledger:877' 'ledger:878' 'ledger:864'`).
11. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:389-417`, `:421-449`, `:432`; `compiler/runtimeValues/FJavaString.java` (`final String val`, `getValue()`).
12. `CompilerBuiltin.fss:13-19`, `:281-287`; `Library/CompilerSystem.fss:13-14`; `compiler/NamingCzar.java:452`; `compiler/nativeInterface/FortressMethodAdapter.java:147-148`.
13. `CompilerBuiltin.fss:452`, `:460`; `Library/CompilerSystem.fss:20`.
14. `/home/user/fortress-strrev/tmp/cprobe/CStrFlat.fss`, `CStrRefused.fss` and `CStrOverString.fss`, compiled from `ProjectFortress/` as `../bin/fortress compile ../tmp/cprobe/<P>.fss`, then `../bin/fortress run CStrFlat`; the outputs above, `rc=0`, `rc=255`, `rc=255`.
15. `compiler/NamingCzar.java:488`; F-298 (`FACTS.md:133`); `.claude/skills/fortress-repo/references/compiler.md`, the words *count stage* and *distance stage*; `grep -n FlatString explorations/coordinator/FACTS.md explorations/coordinator/POSITIONS.md` prints only `FACTS.md:134`.

## 3. The team's sources, and which way they point

Three principles settle a fork: the team's later word (P-26), the library as the team wrote it, and the peers, which weigh only where the team's earlier and later word conflict, or where neither speaks. A fork is settled where the principles that speak to it point the same way (`.claude/skills/coordinator/SKILL.md:95`). This section reads the first two; section 4 reads the peers.

### 3.1 Who wrote the rope, and when

1. The committer `black`, whom the authorship notes take, unconfirmed, for Andrew P. Black, made `String` a trait on 2008-08-13: "The great restructuring of the world consequent on turning String into a trait and making the old flat string objects "JavaString"s" [1].
2. The rope came two days later, as `CordedString`, on 2008-08-15, also by `black`. It was renamed `Strings` on 2008-10-16. Its balancing was written on 2008-10-28 and tested on 2008-10-30. `maxLeafSize` came on 2008-11-17, in a commit that also says "The plan is to eliminate SubString in the next release" [2].
3. On 2009-01-05 Jan-Willem Maessen renamed `JavaString` to `FlatString`: "This will hopefully mitigate confusion a teensy bit when java.lang.String is wrapped differently than it is now." The compiler's prelude later gave the freed name `JavaString` to its own box of a Java string (section 3.4) [3].

### 3.2 The team's comments

4. The team's comments on the two forms [4]:
    - on `maxLeafSize`: "The maximum size to which we grow a leaf node (by copying) before switching to a CatString of the pieces. Clients may assign to this variable";
    - in `FlatString`'s `uncheckedSubstring`: "We could build a subString node here, but not until everything is working, because that will introduce SubString objects into code that may still expect FlatStrings. As written, this method always answers a FlatString";
    - over `CatString`'s `asFlatString`: "if this were to be used heavily, we should collect the result in a StringBuffer";
    - a debugging line that the rope's author left in `CatString`: `printlnWithThread ("CatString.uncheckedSubstring " self "[" r0 "]").asFlatString`. He flattened the string before he passed it to the native over `String`;
    - over the three debugging prints: "These are useful temporary hacks for debugging multi-threaded programs".

### 3.3 How the team's glue classes took a string argument

5. The glue base classes over `String` read `getString()`. They are older than the rope: `Util.S2V` is in the tree at 2008-08-13, two days before the rope. When they were written, every string was flat [5].
6. The glue of the flat leaf casts its arguments to the flat box. So it relies on its declarations over the flat type [6].
7. Where the team met a rope at a native, it declared the native over the flat type and flattened at the caller, or walked the rope [7]:
    - `File`, 2008-11-08, `black`: "Added factories for fileStreams, to make wordcount work when FlatStringInfo.maxSize is small." The factory `FileReadStream(filename: String): FileReadStream = FileReadStream(filename.asFlatString)` stands beside `object FileReadStream(filename: FlatString)`, and the same for `FileWriteStream`. The message gives the reason: with a small leaf size, a file name became a rope, and the object over the flat type could not take it.
    - `Writer`, 2008-12-11, `black`, "The new world of printing": the native `write(s:FlatString)` stands beside `write(s: String)`, which walks the rope by `writeOn`. `BufferedWriter` has the same pair.
    - `FlatString`'s own `opr ||(self, b:String)`, at the team's last commit: `flatConcat(self, b.asFlatString)`. The revival rewrote it in 2026 as a `typecase`, so that the compiled checker types it.
8. The five bindings over `String` do not follow that way. The three debugging prints are `black`'s of 2008-08-27, twelve days after the rope, and their comment calls them hacks. His own later debugging call flattened first (point 4). `getEnvironment` and `getProperty` are Maessen's, of 2009-03-13 and 2009-04-23. They take the names of configuration settings, in practice literals, which are flat. Each of the five reads `getString()`, so each reads a rope wrongly. This review found no commit of the team that repairs or names that [8].

### 3.4 The compiler's prelude

9. The prelude's string design is Guy Steele's refactoring of strings. It first appears in his commit of 2011-11-17, and David Chase adapted the compiler to it the next day: "Changes for Guy's refactoring of strings". In the tree just before it, the prelude's `String` is one trait with no `JavaString`. After it, `trait JavaString extends String` holds the string methods' natives, and the top-level callers of the natives, such as `print`, flatten by `asJavaString` [9].
10. The compiled `getProperty` is in David Chase's commit of 2012-06-13, "Added ability to get system properties (and environment vars, etc)". It is declared over `String` and flattens both arguments by `asJavaString` before the native. It stands so in the team's last tree. Walk's `getProperty`, of 2009, does not flatten. (The conversion cut that commit's parent link, so git shows the whole tree, not its diff; the message names the change.) [10]
11. So the prelude did both: it declared its string natives over the flat type, and its callers flattened [11].

### 3.5 Which way they point

12. The library as the team wrote it does not speak with one voice. Where the team met a rope at a native, at a file name, it declared the native over the flat type and flattened at the caller, and it wrote its printing to walk the rope (`File`, `Writer`). The five over `String` read a rope wrongly: three are called hacks, and two take configuration names. So the library leans to (b), with five early exceptions [12].
13. The team's later word settles the split. P-26: "The team's later decision wins over its earlier one". It counts code as a decision "where the team built it alike for all its types, or stated its rule in a commit message, a comment or the checker", and it says that code that its author called a stub serves only the implementation. The prelude of 2011 and 2012 is the work of the *type group*, the part of the team that built the checker and the compiler, and it builds the rule alike for every string native. In 2012 the team wrote `getProperty` itself again, over `String`, flattening before the native: the later word on one of the very five. The debugging prints are called hacks [13].
14. So the later word decides where the library is split. Since the early and the later word differ on the five, the peers weigh too, and section 4 shows that they point the same way. The specification is silent: it gives a literal the type `String`, and it names none of the four objects [14].
15. Neither principle speaks to item 340's question, how walk's loader tells the library's own `FlatString` from a program's object of that name. That is a question of walk's implementation. The probe answers it from the specification's rule that every component has a unique name [15].

**References**

1. `git show -s 725b9791a` (2008-08-13, `black`); `research/authorship.md:59`.
2. `git log --all --diff-filter=A -- Library/CordedString.fss` gives `08ea5915d` (2008-08-15, `black`); `cf5627135` (2008-10-16, "Renamed cordedStrings to Strings"); `6f95a4303` (2008-10-28), `365149aae` (2008-10-30, "Balancing routines written tested"); `083bc5c86` (2008-11-17): `git show 083bc5c86:Library/String.fss` holds `var maxLeafSize: ZZ32 := 32` at `:547`, and `d3bf13292`, the commit before, holds none.
3. `git show -s 5335ab745` (2009-01-05, `jmaessen`); `research/authorship.md:45`.
4. `Library/String.fsi:52-55`; `Library/FlatString.fss:58-62`; `Library/String.fss:82`, `:149`; `Library/FortressLibrary.fss:4627`.
5. `interpreter/glue/prim/Util.java:282-289`; `git show 725b9791a:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Util.java | grep -c 'class S2V'` prints 1.
6. `interpreter/glue/prim/FlatString.java:42-121`.
7. `git show a39129809` (2008-11-08, `black`), which adds `File.fss`'s factories; `Library/File.fss:20-22`, `:64-66`. `git show 9afe5fb39:Library/Writer.fss` (2008-12-11, `black`), its `:39` and `:51-61`; `Library/Writer.fss:33-35`, `:45-49`, `:54-57`. `git show a874948ac:Library/FlatString.fss`, `opr ||(self, b:String)`; `git diff a874948ac -- Library/FlatString.fss`; `1e176516c` (2026-10-03).
8. `git show 855a4699d:Library/FortressLibrary.fss | grep -n 'printWithThread\|printlnWithThread\|printThreadInfo'` gives `:3874-3878` (2008-08-27, `black`, "Added various printing functions and ilkName, for use in debugging."), and its parent holds none; `96f547cea` (2009-03-13), whose `Library/System.fss:46` holds `getEnvironment`; `ebb285918` (2009-04-23), the first to hold `getProperty`; `research/authorship.md:45`.
9. `2eb54ef20` (2011-11-17, Guy Steele), whose `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:244-276` holds `asJavaString`, `trait JavaString extends String` and `print(x:Object):() = jPrint(x.asString.asJavaString)`; `cfbffa7a5` (2011-11-18, David Chase); `git show 21c788b71:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`, `:25-31`, a `trait String` and no `JavaString`; today `CompilerBuiltin.fss:389-460`.
10. `git show 30ca1d8c7:ProjectFortress/LibraryBuiltin/System.fss`, `:13-16` (2012-06-13, David Chase, "Added ability to get system properties (and environment vars, etc)"); `git show a874948ac:ProjectFortress/LibraryBuiltin/System.fss`, the same line; today `Library/CompilerSystem.fss:20`; walk's, `Library/System.fss:45`; `.claude/skills/fortress-repo/references/records.md`, "The repository's history", on the cut parent links.
11. Points 9 and 10; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:421-460`.
12. Points 4 to 8.
13. P-26 (`facts-extract.sh 'P-26'`); points 4, 8, 9 and 10.
14. `.claude/skills/coordinator/SKILL.md:95`; section 4, point 5; `Specification/basic/expressions/literals.tex:57`; `grep -rn -i 'FlatString\|CatString\|maxLeafSize' Specification/ --include=*.tex` prints nothing; row 846's specification cell, "silent".
15. `explorations/perf-probes/loader-declaring-type/REPORT.md`, section 2, way 1; `Specification/basic/components/apis.tex:191-192`, `:210-211`.

## 4. The peers, as context

1. Java has one flat string type. `java.lang.String` is a final class, so nothing extends it. The interface `CharSequence` lets an API take a string or a buffer. A method over `String` does not take a buffer: `javac` refuses `len(b)` for a `StringBuilder b`, "incompatible types: StringBuilder cannot be converted to String", and takes `len(b.toString())`, which prints 6. The JDK holds no class named `Rope` [1].
2. In Scala, `String` is `java.lang.String`. A run prints "Scala's String is java.lang.String; a 52-char concatenation is a java.lang.String", and a `StringBuilder`'s `toString` gives a `java.lang.String` [2].
3. Clojure: "Clojure strings are Java Strings." [3]
4. Ropes exist as libraries: the ropes of Boehm, Atkinson and Plass (Software: Practice and Experience, December 1995), the SGI C++ rope, Abseil's `Cord`, the C cords of the Boehm collector, and Ropes for Java. The Scala library has no rope class either [4].
5. What it means for a native: on the JVM, a native that wants a Java string receives a flat string. A rope library makes its rope flat at its own edge, by its own code, and the conversion stands in the caller's source, as `toString()`. Java's compiler does not make the conversion by itself (point 1). That is the shape of option (b) below. So the peers point the same way as the team's later word (section 3.5).

**References**

1. `/home/user/fortress-strrev/tmp/javapeer/Peer.java`, compiled by `javac` (OpenJDK 25) before and after the `toString()`; `javap java.lang.String | head -2` prints "public final class java.lang.String implements java.io.Serializable, java.lang.Comparable<java.lang.String>, java.lang.CharSequence, ..."; `javap java.lang.CharSequence` prints "public interface java.lang.CharSequence"; `jimage list $JAVA_HOME/lib/modules | grep -c -E '(^|/)Rope[A-Za-z$]*\.class'` prints 0 (OpenJDK 25).
2. `/home/user/fortress-strrev/tmp/scalaprobe/StrPeer.scala`, compiled and run with `ProjectFortress/third_party/scala/scala-library-2.13.18.jar`; its two printed lines.
3. clojure.org, "Data Structures", section "Strings" (`https://clojure.org/reference/data_structures`, read 2026-11-05).
4. Wikipedia, "Rope (data structure)", its references and external links (read 2026-11-05); `unzip -l ProjectFortress/third_party/scala/scala-library-2.13.18.jar | grep -c -E '/Rope[A-Za-z$]*\.class'` prints 0.
5. Points 1 to 4; section 2.4, point 12; section 3.5.

## 5. The model program's exposure

1. Where microGPT uses strings [1]:
    - literals: the corpus path and the weights folder, and the nine matrix names of `matName`;
    - printing: one heading line, and one line per training step, built by juxtaposition and printed by `println`;
    - loading: `readLines` opens each file by `FileReadStream(path)`, reads it line by line, and `parseFloat` and `parseRow` read each line by `s[i]` and by slices `line[i # (j - i)]`; the corpus loader reads each name by `names[d][j]`;
    - the weight paths: `dir "/" name(i) ".txt"`;
    - the check programs, not the model: `getProperty("fortress.threads", "?")`, in the four quick and full checks.

    The APL program has the same uses, through its own loader `FlatData2`.
2. Which forms reach the natives, run with the model's own expressions [2]:

        corpus path: FlatString size 35
        weights path 0: CatString size 36; first line read: FlatString size 338
        ...
        weights path 8: CatString size 40; first line read: FlatString size 1319

    The nine weight paths are ropes, 36 to 40 characters. `FileReadStream(p)` accepts each one, because the team's factory over `String` flattens it before the object over `FlatString` (section 3.3, point 7). Every line that the loader reads is a flat string, since a glue result is flat (section 2.1, point 4).
3. The five bindings over `String`: no model line calls one. The check programs call `getProperty` with two literals, which are flat. So every option below gives them the same value as today [3].
4. `FlatString`'s 13 methods serve every string operation of the loaders: size, `get`, `javaSubstr` under the slices, and comparison. Option (c) lets them move onto helpers. Each helper computes what its glue class computes, except one: `stringOps.substring` clamps an index out of range where the glue throws. The model's slices stay in range, since the scan stops at the line's end [4].
5. Speed: the corpus is 14K characters in 2K lines, and the weights are 89K characters in 214 lines. All string work happens while the model loads, before the training loop. The loop prints one line per step. No option adds work to a training step. MicroGPT does not compile yet, and on the compiled path its strings stay outside the step. No timing was taken: the skill forbids walk timings [5].
6. So no option changes a model line, a value that the model prints, or the model's speed.

**References**

1. `explorations/run-c4/src/MicroGptFlat.fss:19`, `:37-39`, `:86`, `:95`; `explorations/run-c4/src/FlatData.fss:14-42`, `:45-59`, `:69-81`, `:97`, `:119-123`; `explorations/run-c4/src/MicroGptFlatQuick.fss:32`, `MicroGptFlatCheck.fss:30`, `explorations/apl/mg/MicroGptAplQuick.fss:34`, `MicroGptAplCheck.fss:32`; `explorations/apl/mg/MicroGptApl.fss:54-55`, `:115`, `:124`.
2. `/home/user/fortress-strrev/tmp/probe/ModelPaths.fss`, run from the worktree's `explorations/run-c4/src` as `../../../bin/fortress ../../../tmp/probe/ModelPaths.fss`; nine weight lines, `rc=0`; `Library/File.fss:20`.
3. `grep -rn --include=*.fss -E 'printlnWithThread|printWithThread|printThreadInfo|getProperty|getEnvironment' explorations/run-c4/src explorations/apl/mg`: the four check lines above, and one probe, `mismatch_probe.fss:30`.
4. `explorations/perf-probes/loader-declaring-type/REPORT.md`, section 7, decision 3 (`useful/Useful.java:974-982`; `interpreter/glue/prim/FlatString.java:152-157`); `explorations/run-c4/src/FlatData.fss:50-54`.
5. `wc -lc explorations/apl/reference/dzaima/docs.txt` prints "2000 14349"; `cat explorations/apl/reference/dzaima/w/*.txt | wc -lc` prints "214 88936"; `MicroGptFlat.fss:91-96`; `.claude/skills/fortress-repo/references/interpreter.md`, "Running a program".
6. Points 1 to 5.

## 6. The options

Options (a) and (b) answer item 310: where a rope is flattened before a helper over a string. Option (c) answers item 340: how walk's loader carries `self` of the library's `FlatString`. So (c) is not a third answer to item 310. Under (a) and under (b) alike, `FlatString`'s 13 methods need (c), or another way to tell the library's `FlatString`, before they can move. One such other way is (a)'s type test, `v instanceof FString`, applied to `self` at each call: it would refuse a program's own `object FlatString` at the call, where the probe's way refuses it at load. It was not run.

A *rung* is one task that one agent builds and lands with its tests, in a batch.

### (a) The loader flattens every string argument, once, in one place

1. **What it is.** In `StaticNativeApp.unbox`, a Java `String` parameter takes the characters of an `FString` as today. For any other value, the loader calls the value's own `asFlatString`, through walk's ordinary method call, and takes the characters of the flat string that it answers. A value with no `asFlatString` stops the call with an error [1].
2. **Can the loader tell a rope from a flat string cheaply?** Yes, by one Java type test, `v instanceof FString`. Under walk every flat string is an `FString`, whose constructor is private, which only `FString.make` and `FString.EMPTY` make, and which no class extends. Every rope, `SubString` and `EmptyString` is another object [2].
3. **What a rope costs there.** The loader runs the library's own `asFlatString`. Each `CatString` flattens its two halves, and then its glue copies them into one new Java string. So a rope copies each character once for each level above it: about its size times its depth. The balancer rebuilds a rope deeper than 30 levels unless it is balanced, and a balanced rope that deep holds more than 1M characters (`fib[31]` is 1.3M). So a string under 1M characters is copied at most about 30 times. For the model's paths the depth is 1: one copy of at most 40 characters. This is the same work that a caller does when it writes `s.asFlatString`. Option (a) moves where the work is written; it does not change the work [3].
4. **Measured on a shadow.** The change above, 10 lines, was compiled into a scratch class folder ahead of the build, not into the tree. With it, the program of section 2.3 prints [4]:

        A |s| = 52, slen(s) = 52, slen(s.asFlatString) = 52
        B |t| = 4, slen(t) = 4, slen(t.asFlatString) = 4
        C slen(EmptyString) = 0
         Thread 26: CatString

    The helper binding now reads the characters. The glue binding `printlnWithThread` still prints `CatString`: the loader does not reach a glue class. Row 877's program, a parameter at a program's own `object FlatString`, now stops at the call ("Cannot find definition for method asFlatString given receiver FlatString") where today it answers 10.
5. **Files and lines, walk.** `StaticNativeApp.java:231` and a new method of about 10 lines. The five bindings' strings, `Library/FortressLibrary.fss:4628`, `:4631`, `:4632` and `Library/System.fss:40`, `:45`, must name helpers, since the loader does not reach glue. `systemOps.getProperty` computes as the glue does. `simplePrintln.nativePrintlnWithThreadInfo` prints another form than the glue, so the three prints and `getEnvironment` need four new one-line helpers [5].
6. **Files and lines, compiled path.** At the switch-over the compiled path must flatten too, since it has no walk loader. The compiled rewrite already wraps each argument declared `NN32`, `NN64` or `Char` in a transfer call, and a flattening of a parameter declared `String` would go in the same place. It is neither designed nor probed. So "one place" becomes two places, one in each path's Java [6].
7. **Bindings moved:** the five over `String`.
8. **Tests that change:** `NativeHelperNonFlatStringWalk.fss:11` asserts 52 in place of 9, and its comment line changes; a new walk test checks each of the five at a rope, a `SubString` and `EmptyString`; a compiled guard binds the new helpers over `JavaString`, as `NativeHelperBindingCompiled` does; row 846 closes; row 877 becomes an error at the call, not at load [8].
9. **Size:** one walk rung, the loader and the five; and one compiled rung at the switch-over, not sized.
10. **Model:** no line, no value (section 5).

### (b) The bindings over strings are declared over `FlatString`, and the library's callers flatten

11. **What it is.** Each of the five keeps its public header over `String`, and gains a native over `FlatString` beside it. The overload over `String` flattens and calls the native. This is the team's own pair: `Writer`'s two `write`, `File`'s factory, and the prelude's `getProperty` (section 3.3, point 7; section 3.4, point 10) [11]. For example:

        printlnWithThread(a: FlatString): () = builtinPrimitive("com.sun.fortress.nativeHelpers.<Class>.<method>")
        printlnWithThread(a: String): () = printlnWithThread(a.asFlatString)

12. **Why the overload stays.** A literal has the type `String`. So a header over `FlatString` alone would make the checker refuse every call with a literal, `getProperty("fortress.threads", "?")` among them, by the rule that refused `CStrRefused`'s call in section 2.4. This was not run against the one library [12].
13. **Measured as program code.** The pair, written in a program's own component, gives the characters on both paths [13]:
    - under walk: `rope 52, substring 4, EmptyString 0, literal 5`;
    - compiled, over `JavaString`, with a static `String` argument: `static String 52, literal 5`. The compiled dispatch picks the native over the flat type at run time.
14. **Its spelling.** `asFlatString` is declared to answer `String`. So the inner call relies on dispatch at run time, which both runs show. The components that the distance stage checks spell the same step as a `typecase` on `asFlatString`. The rung chooses the spelling. The distance stage checks `String`, `FlatString` and `Writer`, but not `System` [14].
15. **P-58's form.** Each native stays a public binding whose body is exactly `builtinPrimitive("…")`, as `Writer`'s `write(s:FlatString)` is. The overload over `String` is ordinary library code. If the curator reads item 332, a converting declaration around a bare binding, as covering such a pair, then (b) needs that item's yes too [15].
16. **Files and lines, walk and library.** `Library/FortressLibrary.fss:4628-4632`: three natives over `FlatString` and three overloads over `String`, with their api lines at `Library/FortressLibrary.fsi:2633-2636`, which already imports `FlatString`. `Library/System.fss:40`, `:45` and `Library/System.fsi:32`, `:37`: two of each, and an import of `FlatString` in both files, which have none. The same helpers as in (a): `systemOps.getProperty` and four new one-line helpers. The loader is not changed [16].
17. **Files and lines, compiled path.** None of its own. After the switch-over the overload over `String` is library text, so both paths run the same flattening. The native over `FlatString` needs only the carrier of the one library's `FlatString` as a Java string, which `FlatString`'s 13 methods need under every option (section 2.4, point 15) [17].
18. **An optional step.** The loader could stop carrying a parameter declared `String`, as it refuses every type that no Java type carries: "no Java type carries the declared type of parameter a". Then row 846 cannot come back in a program's own binding: it is refused at load. `NativeHelperNonFlatStringWalk` would become a refusal test. This step was not run [18].
19. **Bindings moved:** the five over `String`, each now a native over `FlatString` beside an overload.
20. **Tests that change:** a new walk test checks each of the five at a rope, a `SubString` and `EmptyString`; a compiled guard binds the new helpers over `JavaString`; `NativeHelperNonFlatStringWalk` stays as it is, since a program's own binding over `String` still reads the type name, unless the optional step is taken. Row 846 then narrows to programs' own bindings, or closes with the optional step [20].
21. **Size:** part of the string family's rung. No Java of walk beyond the helpers.
22. **Model:** no line, no value. The checks' `getProperty` with two literals goes straight to the native over `FlatString`.

### (c) Item 340's probe's way, with item 310's default of neither

23. **What it is.** Walk's loader tells the library's `FlatString` by its declaring component, read from the top level of the type's environment. The linker gives one component to a name, so a program's own `object FlatString` stays refused at load. The five over `String` stay on their glue classes, as item 310's default says, until the string family moves [23].
24. **Measured by the probe.** 44 lines added and 4 changed in `StaticNativeApp.java`, 1 line changed in `NativeApp.java`, with `FlatString`'s `size` moved onto `simpleConcatenate.nativeStrlen`. The 25 walk tests that the probe ran as its gate pass (the native-helper tests and three string tests), `ant testSystem` passes 724 tests, and the 52 team demos reach their end. Without the loader change, the same move stops 20 of the 25 tests at load: "no Java type carries FlatString, the type of self." [24]
25. **Bindings moved:** `FlatString`'s 13 methods can move. Five fit existing helpers: `size` and `|self|` onto `nativeStrlen`, `cmp` onto `stringOps.compareTo`, `javaSubstr` onto `stringOps.substring` (which clamps), and `flatConcat` at a `FlatString` onto `nativeConcatenate`. The other eight need new helpers. `match` and `natLineSeparator` need nothing of item 340, since the loader carries a `FlatString` parameter by its name and `natLineSeparator` has none [25].
26. **Files and lines.** `interpreter/glue/StaticNativeApp.java`, `interpreter/glue/NativeApp.java:201`, `Library/FlatString.fss:35-101`. The probe's new test `NativeHelperCarriedSelfFlatStringWalk`, and `NativeHelperUncarriedSelfFlatStringWalk`, whose binding should name a helper that no library binding uses (the probe's defect 3). F-299 and two sentences of the skill's `interpreter.md` become false [26].
27. **What it leaves undone.** The five over `String` stay on `StringPrim`'s glue, which the compiled path cannot run, so the switch-over still waits on item 310. Row 846 stays open. Row 877 stays open; the probe's solution 4, the same reading for parameters, would close it, at a cost not measured [27].
28. **Size:** one walk rung, built in the probe as `shadow.patch`, and the 13 inside the string family's rung.
29. **Model:** no line. The loaders' string operations run on helpers, with the same values (section 5, point 4).

**References**

1. `StaticNativeApp.java:225-234`; `interpreter/evaluator/values/DottedMethodApplication.java:120-123`; the shadow, `/home/user/fortress-strrev/tmp/shadowA/src/StaticNativeApp.java`.
2. `interpreter/evaluator/values/FString.java:18`, `:22`, `:40-42`; `grep -rn 'extends FString\b' --include=*.java ProjectFortress/src/com/sun/fortress/interpreter` prints nothing.
3. `Library/String.fss:83-87`; `interpreter/glue/prim/FlatString.java:173-177` (`return x + y;`); `Library/String.fss:44`, `:53-59`; section 5, point 2.
4. The shadow compiled by `javac -nowarn -cp "$CP" -d tmp/shadowA/classes tmp/shadowA/src/StaticNativeApp.java`, and the programs run as `java $JAVA_FLAGS -Dfortress.caches=tmp/shadowA/caches -cp "tmp/shadowA/classes:$CP" com.sun.fortress.Shell RopeAtNative.fss` and `OwnFlatParam.fss` from `tmp/probe/`, with a fresh copy of the caches (the skill's `references/compiler.md`, "Testing an edit here"); row 877.
5. `nativeHelpers/systemOps.java:20-22` against `interpreter/glue/prim/StringPrim.java:96-100`; `nativeHelpers/simplePrintln.java:32-34` against `StringPrim.java:77-81`.
6. `compiler/BuiltinPrimitiveRewriter.java:133-152`; F-308.
8. `ProjectFortress/tests/NativeHelperNonFlatStringWalk.fss:1`, `:11`; `ProjectFortress/compiler_tests/NativeHelperBindingCompiled.fss`.
11. Section 3.3, point 7; section 3.4, point 10; `Library/Writer.fss:33-35`, `:45-49`; `Library/File.fss:20-22`; `Library/CompilerSystem.fss:20`.
12. `Specification/basic/expressions/literals.tex:57`; `scala_src/typechecker/impls/Misc.scala:462`; section 2.4, point 14.
13. `/home/user/fortress-strrev/tmp/probe/OverloadPair.fss`, run under walk, `rc=0`; `/home/user/fortress-strrev/tmp/cprobe/COverloadPair.fss`, compiled and run, `rc=0`; `.claude/skills/fortress-repo/SKILL.md`, "The compiled run time", the dispatch method.
14. `Library/FortressLibrary.fsi:2454`; `Library/FlatString.fss:137-140`; `Library/String.fss:83-87`; `explorations/coordinator/tools/distance/run.sh:87-90`.
15. P-58; review-queue item 332 (`review-queue.md:153`); `Library/Writer.fss:33-35`.
16. `Library/FortressLibrary.fsi:15`, `:2633-2636`; `Library/System.fsi:12-37`, with no `import`; section (a), point 5.
17. Section 2.4, point 15; `compiler/NamingCzar.java:488`; `Library/FlatString.fss:34`, `object FlatString extends { String, ... }`.
18. `StaticNativeApp.java:54`, `:127-129`.
20. `ProjectFortress/tests/NativeHelperNonFlatStringWalk.fss:5`, `:11`; row 846.
23. `explorations/perf-probes/loader-declaring-type/REPORT.md`, sections 2 and 3; review-queue items 310 and 340 (`review-queue.md:22-23`, `:192-198`, `:368-375`).
24. The same report, sections 3 and 5.1 to 5.4; `explorations/perf-probes/loader-declaring-type/shadow.patch`.
25. The same report, section 7, decision 3; `StaticNativeApp.java:54`; `Library/FlatString.fss:25-26`; `CLIMB-BATCH-25.md:409`.
26. The same report, sections 6 (defect 3) and 8.
27. F-32; rows 846 and 877; the same report, section 11, solution 4.

## 7. How the options weigh against each other

1. **The team's sources.** Option (b) is the team's way where it met a rope at a native, and its later word in the prelude of 2011 and 2012, which wrote `getProperty` so (section 3). Option (a) is in no text of the team: no glue class and no part of the prelude flattens a string inside the native's machinery. Option (c) is neutral on item 310, and it is needed with either (a) or (b) for `FlatString`'s 13 methods.
2. **The two paths.** P-58's aim is one binding that both paths run. Under (b) the flattening is library text, so after the switch-over both paths run the same Fortress code. Under (a) the flattening is Java, once in walk's loader and once more in the compiled rewrite, and the second is not designed. Two copies of one rule can drift apart, as walk's glue `PrintlnWithThread` and the helper `nativePrintlnWithThreadInfo` already print one operation in two forms (section 6, point 5).
3. **Safety.** Option (a) closes row 846 for every helper binding, a program's own included, and turns row 877 into an error at the call. Option (b) closes it for the library's bindings; with its optional step it also refuses a program's binding over `String` at load, which is earlier and clearer than an error at the call.
4. **Cost.** The work for a rope is the same under both: one flattening by the library's `asFlatString`. Option (b) shows the copy in the source, at the call. Option (a) hides it in the loader, where no reader of the library sees it. The team's comment over `CatString`'s `asFlatString` notes that the copy needs a better form "if this were to be used heavily".
5. **The glue classes.** Neither option reaches a binding that still names a glue class (measured for (a)). So under both, the five move onto helpers in the same rung.
6. **Size.** Option (a): one walk rung, and one compiled rung at the switch-over that nobody has sized. Option (b): a part of the string family's rung, with no Java of walk beyond the helpers. Option (c): one walk rung, already built as the probe's shadow.
7. **The model program.** No option touches its lines, its values or its speed (section 5).
8. **Undoing.** Each option can be undone in one commit. None changes a decision on record, except that (b) may need item 332's yes.

**References**

1. Sections 3.3 to 3.5; `Library/CompilerSystem.fss:20`; `interpreter/glue/prim/Util.java:234-289`; section 6, the first paragraph.
2. P-58; section 6, points 5, 6 and 17; `nativeHelpers/simplePrintln.java:32-34` against `interpreter/glue/prim/StringPrim.java:77-81`.
3. Section 6, points 4, 8 and 18; rows 846 and 877.
4. Section 6, point 3; `Library/String.fss:82`.
5. Section 6, point 4.
6. Section 6, points 9, 21 and 28; `explorations/perf-probes/loader-declaring-type/shadow.patch`.
7. Section 5.
8. P-58; review-queue item 332 (`review-queue.md:153`).

## 8. Recommendation

Take (b) for the five bindings over `String`, each a native over `FlatString` beside an overload over `String` that flattens, as the team's `Writer`, `File` and compiled `getProperty` do, together with (c), item 340's default, for `FlatString`'s 13 methods.
