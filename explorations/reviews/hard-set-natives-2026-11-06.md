<!-- The design for the curator's decision on the native bindings that no bare helper reaches, the 28 of climb batch 26's count and FlatString's two (review-queue items 331, 332 and 361, with 363 beside them): whether each is written as a public declaration that converts around a bare binding, given a new helper, given a new carrier in walk's loader, or left on its glue class until N5; written 2026-11-06 by an Opus worker, reading only, with walk and compiled runs from the main tree's build at `fc9b9293c` in private caches folders. -->

# The natives that no bare helper reaches: the design for the curator's decision

The tree is `main` at `fc9b9293c`. Its build is current: `ProjectFortress/build/implementation.stamp` and `default_repository/caches/implementation.stamp` both read `180a6844e44e…`. Every Fortress run below used that build with a private caches folder, copied from the warm caches. The programs are scratch files and are not committed; each point quotes the lines that matter and the output. One probe used a shadow: two evaluator classes copied to a scratch folder, with a counter added, compiled ahead of the build on the class path (section 2, point 1). Nothing in the tree changed. A Java path without a prefix is under `ProjectFortress/src/com/sun/fortress/`.

## 1. The question, and a primer

**The question.** For the 30 native bindings that no bare helper reaches, where is the conversion written: in the library around a bare binding, in new helpers, in new carriers of walk's loader, or nowhere yet, with the glue class kept? (Item 331. Items 332 and 361 follow from its answer.)

**The words.**

1. *Walk* is Fortress's interpreter. The *compiled path* compiles a program to JVM bytecode and runs that. Each path has its own library today. At the *switch-over* the compiled path moves onto walk's library, the *one library*, and the compiler's own small library, the *prelude*, is deleted [1].
2. A *native binding* is a library declaration whose body is `builtinPrimitive("…")`. The string names the Java code that does the work [2].
3. A *glue class* is a Java class under `interpreter/glue/prim/` that takes walk's own run-time values, such as `FInt` for a `ZZ32`. Only walk can run it. A compile refuses a glue string: 'Variable builtinPrimitive is not defined.' [3]
4. A *helper* is a public static Java method under `nativeHelpers/` that takes and answers plain Java values, such as `int`. Both paths can call it. Walk calls it through its *loader*, `interpreter/glue/StaticNativeApp.java`. The compiled path rewrites the body into a call of the helper at the parse, before the type checker, and the checker then checks the declaration against the helper's Java signature [4].
5. P-58, a decision of the curator, says that every native binding names a helper and keeps the form `builtinPrimitive("…")`. A *bare* binding is one whose body is exactly that call with a helper's name. Today 306 of the one library's 449 live bindings are bare, and 143 still name glue classes [5].
6. A *carrier* is the Java type in which walk's loader passes a value of a declared Fortress type to a helper: `ZZ32`, `NN32` and `Char` in `int`; `ZZ64` and `NN64` in `long`; `RR64` and `Float` in `double`; `RR32` in `float`; `Boolean` in `boolean`; `FlatString` in `String`, and `String` too, but only as a result; `ZZ` in `BigInteger`. A method's `self` is carried by the type that declares it. Climb batch 26's rung T added the library's own `FlatString` as a `self`, told by the component that declares it. The loader refuses at load a binding with a declared type that no carrier names [6].
7. A *transfer* is an identity helper that the compiled path puts around an argument or a result. The checker reads a Java `int` as `ZZ32`; so where a binding declares `NN32`, `NN64` or `Char` at an `int` or `long`, the rewrite wraps the value in the matching transfer, as the prelude does by hand [7].
8. A *converting declaration* is a declaration whose body converts its arguments and then calls another declaration that is a native binding. A *pair* is a bare native binding at the narrow type beside a public declaration at the wide type that converts and calls it, as rung T wrote the five natives over `String` [8].
9. A *rung* is one task that one agent builds and lands with its tests. A *batch* is a set of rungs built at once. N3 is the natives' step of new helpers. N5 is the names work of the switch-over day: the compiled path's table of Java types names the one library's types, and the helpers' raises name its exceptions [9].

**Why a binding has no bare helper.**

10. A helper takes plain Java values. So a bare binding needs a carrier at each declared position. Three kinds of binding do not meet that:
    - A declared type that no carrier names. `AnyIntegral` holds five types, `ZZ` among them, and no one Java type carries them all. `Number` holds every number, a rational `QQ` and a program's own number included. `Any` and the trait `Object` hold every value. A type parameter would be the same: the loader reads a declared type by its name, and no list names it. None of the 30 is over a type parameter; `Any` takes that place [10].
    - Carried types, but no existing helper with those Java types. `FlatString`'s `=` would name `stringOps.compareTo`, which answers an `int` for a `Boolean` [10].
    - One binding fits an existing helper and has not moved: `ZZ32`'s `big` [10].
11. **The example: `ZZ32`'s left shift.** The declaration, its api line and its glue class [11]:

        opr LSHIFT(self,b:AnyIntegral):ZZ32 =
            builtinPrimitive("com.sun.fortress.interpreter.glue.prim.Int$LShift")

        abstract opr LSHIFT(self,b:AnyIntegral):I         (trait Integral, in the api)

        static private abstract class ZL2Z extends NativeMeth1 {
            protected abstract int f(int x, long y);
            public final FValue applyMethod(FObject x, FValue y) {
                return FInt.make(f(x.getInt(), shiftCount(y)));
            }
        }

    The glue class reads the count `y` through `shiftCount`, which turns a count of any of the five types into a Java `long`: a `ZZ` beyond 64 bits becomes `Long.MAX_VALUE` or `Long.MIN_VALUE`, an `NN64` at or above 2^63 becomes `Long.MAX_VALUE`. Then `LShift` shifts the `int`. The conversion sits inside the glue class. A helper of the right Java types exists: `simpleIntArith.intBitLeftShift(int a, int b)`. But named bare, walk refuses it at load: 'Native helper com.sun.fortress.nativeHelpers.simpleIntArith.intBitLeftShift: no Java type carries the declared type of parameter b.' The checker refuses it too: 'Could not check call to function builtinPrimitive_simpleIntArith_intBitLeftShift - (ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type ((ZZ32 & {Int}), AnyIntegral).' [11]
12. At work under walk, `5 LSHIFT 3` with the count as each of the five types, and at two edge counts [12]:

        1 ZZ32 5 LSHIFT by ZZ32, ZZ64, NN32, NN64, ZZ 3: 40 40 40 40 40
        2 ZZ32 5 LSHIFT by 2^70 (a ZZ): 0; RSHIFT by -2 (reverses): 20

**The 30.**

13. Climb batch 26's record counts 28 that no bare string reaches: climb batch 25's 17 of the hard set and N3's 11 over `AnyIntegral` or `Number`. Item 331 also holds `FlatString`'s `=` and `flatConcat(self, b:Char)`, which rung T left on glue for it (item 363). So this review covers 30. Item 331's own text counts 25 at an earlier landing: its 25 less `get` and `javaIndexOf`, which rung T moved, less `IntLiteral`'s 4, which wait for N5, plus N3's 11, give the 30 [13].

**References**

1. `.claude/skills/fortress-repo/SKILL.md`, the words *walk*, *compiled path* and *one library*, and "The phases"; `references/compiler.md`, "The compiler's prelude, until the switch-over".
2. P-58 (`explorations/coordinator/POSITIONS.md:55`); `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:34-35`, `builtinPrimitive`'s own declaration.
3. F-32 (`explorations/coordinator/FACTS.md:30`); `interpreter/glue/prim/Int.java:90-95`; `references/compiler.md`, "Natives", the first case list.
4. F-298 (`FACTS.md:133`); F-299 (`FACTS.md:134`); `interpreter/glue/StaticNativeApp.java:25-35`.
5. P-58; F-299, "306 of the one library's 449 live bindings"; F-32, "143 of the one library's 449".
6. `StaticNativeApp.java:51-62` (`javaFor`), `:70-72` (`javaForParameter`), `:103-127` (`javaForSelf`), `:136-146` (`declaringComponent`), `:178-180` and `:184-186` (the refusals); `references/interpreter.md`, "Natives"; F-299; `93884be8d` (rung T).
7. F-308 (`FACTS.md:138`); `references/compiler.md`, "Natives", the transfer helpers; `compiler/NamingCzar.java:373-384`.
8. `Library/FortressLibrary.fss:4627-4632`, a pair of rung T; review-queue item 361 (`explorations/coordinator/review-queue.md:420`).
9. `explorations/coordinator/PLAN.md:52` (N3) and `:54` (N5); `explorations/reviews/string-natives-2026-11-05.md`, section 6, the word *rung*.
10. `Library/FortressLibrary.fss:677`, `trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }`; `StaticNativeApp.java:51-62`, `:74-78` (`typeName` reads a name); `nativeHelpers/stringOps.java:23` (`int compareTo(String s, String t)`); `explorations/coordinator/CLIMB-BATCH-25.md:410` (`big`).
11. `Library/FortressLibrary.fss:796-797`; `Library/FortressLibrary.fsi:473`; `interpreter/glue/prim/Int.java:90-95`, `:182-187`, `:295-306`; `nativeHelpers/simpleIntArith.java:368-372`; `explorations/compile-ladder/plan-24/probes/hard-set.md`, section 4.4 and section 5, run A.
12. A scratch program `HsIntegral.fss` with `three: ZZ32 = 3`, `c64: ZZ64 = 3`, `cNN32 = unsigned(three)`, `cNN64 = unsigned(c64)`, `cZZ: ZZ = big(three)` and `println(… (x LSHIFT three) " " (x LSHIFT c64) …)`, run under walk; its lines 1 and 2, `rc=0`.
13. `explorations/coordinator/CLIMB-BATCH-26.md:24` and `:314-316`, "The 161 by home"; `CLIMB-BATCH-25.md:409-410`; review-queue items 331 (`review-queue.md:162`) and 363 (`:577`); `CLIMB-BATCH-26.md:398`.

## 2. The 30 today, grouped by why each is hard

Every program below ran under walk from the main tree's build, with a private caches folder. To show which declaration ran, the programs and the model's two quick checks also ran once under a shadow: copies of `interpreter/evaluator/values/FunctionClosure.java` and `MethodClosure.java` that count each call of a glue class, keyed by the declaration's source span, at the two places where walk calls a native (`FunctionClosure.java:188-192`, `MethodClosure.java:85-86`). The shadow was compiled into a scratch folder ahead of the build on the class path. Each program printed the same lines with and without it, and both quick checks still printed 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' [1].

### 2.1 Group 1: a count or an exponent over `AnyIntegral`, 17 bindings

2. **The declarations** [2]:
    - `ZZ32`: `LSHIFT` and `RSHIFT` (`Library/FortressLibrary.fss:796-799`), `^` (`:802-803`);
    - `ZZ64`: `LSHIFT`, `RSHIFT` (`:889-892`), `^` (`:895-896`);
    - `NN64`: `LSHIFT`, `RSHIFT` (`:972-975`), `^` (`:978-979`);
    - `ZZ`: `LSHIFT`, `RSHIFT`, `shift` (`:1069-1074`), `^` (`:1077-1078`);
    - `NN32`: `LSHIFT`, `RSHIFT` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:456-459`), `^` (`:462-463`);
    - `Float`: `opr ^(self, b:AnyIntegral):RR64` (`FortressBuiltin.fss:162-163`), under the team's comment "Shouldn't need this extra declaration."
3. **The glue classes.** Each integer shift reads its count through `Int.shiftCount`, which makes a `long` of any of the five types and saturates a wider count. Each integer power reads its exponent through `Int.powCount`, which keeps the exponent's sign and parity beyond 64 bits. At a negative exponent, `Int.negativePow` and its unsigned twin give the powers of 1 and -1, raise `DivisionByZero` at a base of 0 and `IntegerOverflow` at any other base. These conversions are the revival's, for P-69 and P-153. `Float$Pow` is `Math.pow(x, y)` with the exponent read as a `double` [3].
4. **What the decisions require.** P-69: "The count may have any integer type, and the shift works at the width of the value shifted. … On the compiled path, a shift of a fixed-width value works on the JVM's `int` or `long`, never through `ZZ`." P-153: "Each integer type's `^` returns its own type at every exponent." So the api keeps `AnyIntegral` as the count's and the exponent's type (`Library/FortressLibrary.fsi:473-476`) [4].
5. **The compiled path today.** The prelude declares each of these at a narrow type, never at `AnyIntegral` [5]:
    - `LSHIFT` and `RSHIFT` at the receiver's own width only: `ZZ32` at a `ZZ32` count (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:736-737`), `ZZ64` at a `ZZ64` count (`:647-648`). A `ZZ64` count on a `ZZ32` takes `ZZ64`'s pair by widening the receiver, and a `ZZ`, `NN32` or `NN64` count is refused (row 381). It has no `LSHIFT` or `RSHIFT` on `NN32` or `NN64` (row 442) and no `shift` on `ZZ` (row 383).
    - The power at the base's own type: `ZZ32` (`:744`, over `intExp`), `NN32` (`:809`) and `NN64` (`:878`) through the transfers; none on `ZZ64` or `ZZ`. `RR64`'s power at a `ZZ32` exponent is Fortress code, by repeated squaring (`:955-972`), and at an `RR64` exponent the helper `doublePow` (`:954`).
    - Guy Steele's shift `<<<` of 2012 takes four count types, each in its own overload that converts the count in Fortress and calls one helper over `int`, as `opr <<<(self, other:ZZ64): ZZ32 = jIntShift(self,jLongLowHalfToInt(-32 MAX (other MIN 32)))` (`:732-735`; on `ZZ64` `:643-646`, `NN32` `:799-802`, `NN64` `:865-868`).
6. **A compiled run of the prelude's own declarations**, compiled and run in a private caches folder [6]:

        1 ZZ32 5 LSHIFT 3:  40 ; 5 LSHIFT 40:  0 ; 5 RSHIFT (-2):  20
        2 ZZ32 2^10:  1024
        3 RR64 0.85^3:  0.6141249999999999 ; 10.0^(-5):  1.0E-5 ; 2.0^0.5:  1.4142135623730951

7. **At work under walk** [7]:

        1 ZZ32 5 LSHIFT by ZZ32, ZZ64, NN32, NN64, ZZ 3: 40 40 40 40 40
        2 ZZ32 5 LSHIFT by 2^70 (a ZZ): 0; RSHIFT by -2 (reverses): 20
        3 ZZ64 5 LSHIFT 40 by ZZ: 5497558138880; NN64 3 LSHIFT 63: 9223372036854775808
        4 NN32 3 RSHIFT 1 by NN64: 1; ZZ 5 LSHIFT 100: 6338253001141147007483516026880; ZZ shift(5, -1): 2
        4b the rest: ZZ64 -40 RSHIFT 3: -5; NN64 3 RSHIFT 1: 1; NN64 3^5: 243; ZZ 5 RSHIFT 1: 2; NN32 3 LSHIFT 31: 2147483648
        5 powers: ZZ32 2^10 by ZZ 1024; ZZ64 5^20 95367431640625; NN32 3^NN64 3 27; ZZ 2^100 1267650600228229401496703205376
        6 negative exponent: ZZ32 1^(-3) 1; 2^(-1) IntegerOverflow; 0^(-1) DivisionByZero; ZZ32 2^31 IntegerOverflow
        7 Float 10.0^(-5) 1.0E-5; 2.0^ZZ 10 1024.0; 2.0^NN32 3 8.0; 0.85^3 0.6141249999999999

    The shadow counted a call at each of the 17 declarations, as 'GLUE-CALLS Int$LShift Library/FortressLibrary.fss:796:5-797:77 6' and 'GLUE-CALLS UnsignedLong$Pow Library/FortressLibrary.fss:978:5-979:83 1'.

### 2.2 Group 2: a parameter over `Number`, 3 bindings

8. **The declarations**: `random(a:Number):RR64` (`Library/FortressLibrary.fss:4537`); `printThreadInfo(a:Number):()` (`:4633`), beside rung T's pair over `FlatString` and `String` (`:4627-4631`); `Float`'s `atan2(self,x:Number):RR64` (`FortressBuiltin.fss:176-177`) [8].
9. **The glue classes**: `Float$Random` answers `scale * Math.random()`; `StringPrim$PrintThreadInfo` prints the argument's `getString()`; `Float$ATan2` is `Math.atan2(y, x)` with `x` read as a `double`. Each reads a Java value from a walk value of a built-in class [9].
10. **The compiled path today**: `random(i:RR64): RR64` over `LocalRandom.localRandomDouble` (`CompilerBuiltin.fss:1629`) and `atan2(self, x:RR64)` over `doubleATan2` (`:981`), both at `RR64`; no `printThreadInfo`. The compiled run printed '4 atan2(1.0, 1.0):  0.7853981633974483' and '6 random(2.5) in range:  true' [10].
11. **At work under walk** [11]:

        1 random over ZZ32 10, RR64 2.5, ZZ 10, each in range: true true true
        2 atan2(1.0, x) at x a ZZ32, an RR64, a ZZ: 0.7853981633974483 0.7853981633974483 0.7853981633974483; atan2(0.0, -1): 3.141592653589793
         Thread ForkJoinPool-1-worker-1 operating on value 42
         Thread ForkJoinPool-1-worker-1 operating on value 10
         Thread ForkJoinPool-1-worker-1 operating on value 2.5

12. **Three defects at a rational.** A `QQ` is a library object that no glue class knows. At `third: QQ = 1/3` [12]:
    - `printThreadInfo(third)` prints ' Thread ForkJoinPool-1-worker-1 operating on value Ratio': the object's type name, not `1/3`, as row 846 gives for a rope.
    - `random(third)` ends the run: 'getFloat not implemented for FOrdinaryObject', an `InterpreterBug`.
    - `atan2(one, third)`, with `one = 0.5 + 0.5` a `Float`, ends the run in the same way. With a float literal as `self`, the call goes to the `RR64` trait's `atan2(self,x:Number):RR64 = atan2(asFloat(self), asFloat(x))` (`FortressLibrary.fss:494`) and prints '1.2490457723982544'.

    No ledger row holds these three: `ledger-find` for 'getFloat', 'printThreadInfo' and 'Ratio' names none of them. The same Fortress-side conversion that the `RR64` trait writes repairs each, as the program's own `pti(a: Number): () = printThreadInfo(a.asString)` shows: ' Thread ForkJoinPool-1-worker-1 operating on value 1/3'.

### 2.3 Group 3: carried types, but no fitting helper, 6 bindings

13. **The declarations and their glue** [13]:
    - `Float`'s `opr ^(self, b:RR32):RR64` (`FortressBuiltin.fss:156-157`) and `RR32`'s `opr ^(self, b:Float):RR64` (`:328-329`), both `Float$Pow`. The existing helpers are `doublePow(double, double)` and `floatPow(float, float)`; none takes a `double` and a `float`.
    - `Float`'s floor and ceiling brackets, `opr |\self/| : ZZ64` and `opr |/self\| : ZZ64` (`:184-189`), `Float$IFloor` and `Float$ICeiling`, `(long) Math.floor(x)` and `(long) Math.ceil(x)`. The existing helpers `doubleFloor` and `doubleCeiling` answer a `double`.
    - `FlatString`'s `opr =(self, other: FlatString): Boolean` (`Library/FlatString.fss:70-71`), `FlatString$Eq`, `self.equals(other)`. The existing helper `compareTo` answers an `int`.
    - `FlatString`'s `flatConcat(self, b:Char):String` (`FlatString.fss:96-97`), `FlatString$Concat`, `x + y`, which reads the `Char` as its text. The existing helper `nativeConcatenate` takes two `String`s.
14. **The compiled path today**: the prelude's brackets answer `RR64`, not `ZZ64` (`CompilerBuiltin.fss:973-974`); its string `=` is `opr =(self, b: JavaString): Boolean = (jCompareTo(self, b) = 0)` and its `||` with any object is `jConcatenate(self, b.asString.asJavaString)` (`:428`, `:432`); its `RR32` has no power (`:992-1008`). The compiled run printed '5 floor bracket of 2.5:  2.0 ; truncate(2.5):  2' and '7 string =:  true   false' [14].
15. **At work under walk** [15]:

        1 Float 2.0^RR32 0.5: 1.4142135623730951; Float 2.0^RR32 3.0: 8.0
        2 RR32 3.0^Float 2.0: 9.0; RR32 0.5^Float 0.5: 0.7071067811865476
        4 floor and ceiling brackets: |\2.5/| 2 |/2.5\| 3 |\-2.5/| -3 |/-2.5\| -2
        5 at 10.0^300: 9223372036854775807; at NaN: 0 0
        2 FlatString =: "abc" = ("ab" || "c") true; "abc" = "abd" false
        3 FlatString || Char: abc; size 3

    Line 5 shows that the brackets saturate at `Long.MAX_VALUE` and give 0 at NaN, with no error. A new helper must give the same, or the rung records the difference.

### 2.4 Group 4: one binding that fits an existing helper

16. `ZZ32`'s `big(self):ZZ` (`FortressLibrary.fss:812-813`) names `Long$ToBigNum`, `BigInteger.valueOf(x)`. The helper `simpleArbitraryPrecisionArith.makeZZfromZZ32(int)` exists, and the prelude's `ZZ32` `asZZ` binds it (`CompilerBuiltin.fss:667`). Bound bare in a program's own declaration, `bigz(a: ZZ32): ZZ = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleArbitraryPrecisionArith.makeZZfromZZ32")`, walk loads it and gives the glue's values: '2 big glue: 2147483647 -2147483648; bare makeZZfromZZ32: 2147483647 -2147483648' [16].

### 2.5 Group 5: `Any` and `Object`, 3 bindings

17. **The declarations**: `Object`'s getters `ilkName` and `asString` (`FortressBuiltin.fss:38-41`), and `opr SEQV(a:Any, b:Any):Boolean` (`Library/FortressLibrary.fss:4650-4651`) [17].
18. **The glue classes**: `ObjectPrims$ClassName` answers `o.type().toString()` and `ObjectPrims$ToString` answers `o.toString()`, both on walk's own object; `AnyPrim$SEquiv` answers `x == y` or `x.seqv(y)`, walk's comparison of two of its values [18].
19. **The compiled path today**: `Object`'s `asString` is `jDefaultAsString(self)` over `stringOps.defaultAsString(fortress.AnyType.Any a)` (`CompilerBuiltin.fss:355`; `nativeHelpers/stringOps.java:108`); its `ilkName` is commented out (`CompilerBuiltin.fss:359`); its `SEQV` is commented out (`Library/CompilerLibrary.fss:293-295`), and its helper `equality.sEquiv` answers `a == b`, with the comment "Eventually need to deal with tuples, value types, etc." (`nativeHelpers/equality.java:15-18`). These helpers take the compiled run time's class `fortress.AnyType.Any`. Walk's values are not of that class [19].
20. **At work under walk** [20]:

        1 ilkName: Pt Blank Int FlatString
        2 asString: Pt Blank
        3 SEQV: 3 SEQV 3 true; 3 SEQV 3.0 true; p SEQV p true; p SEQV q false; (1,2) SEQV (1,2) true; "ab" SEQV "ab" true

    So walk's `SEQV` compares numbers and tuples by value, where the compiled helper compares references.

**References**

1. The shadow's two files differ from the tree's by a call `GlueCount.note(def)` before each native call and a class `GlueCount` that prints 'GLUE-CALLS <class> <span> <count>' at exit; compiled with `javac -nowarn -cp "$(bin/fortress_classpath | tail -1)"`; run as `java -Xmx4g -Xss64m -Dfortress.caches=<private folder> -cp "<scratch classes>:<class path>" com.sun.fortress.Shell <program>`; the two quick checks from their own folders, `explorations/run-c4/src/` and `explorations/apl/mg/`, each 'rc=0'.
2. The lines cited; `CLIMB-BATCH-26.md:316`.
3. `interpreter/glue/prim/Int.java:182-194` (`LShift`, `RShift`), `:220-230` (`Pow`), `:271-286` (`powCount`), `:288-293` (`negativePow`), `:295-306` (`shiftCount`); `Long.java:108`, `NN32.java:99`, `UnsignedLong.java:100`, `BigNum.java:106` (each reads `Int.shiftCount`); `Long.java:235-237`, `NN32.java:230-232`, `UnsignedLong.java:230-232`, `:340`, `BigNum.java:114` (each reads `Int.powCount`); `Float.java:292-296`; `git log` of `Int.java` gives `d6faad28f` ("The interpreter's shifts reverse on a negative count, ZZ shifts are exact, …") and `5ad4a9957` ("Every integer power answers its base's own type, …"); `git show a874948ac:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java`, its `:86-92`, where `ZL2Z` read `y.getLong()`.
4. P-69 (`facts-extract.sh 'positions:bit operators'`); P-153 (`facts-extract.sh 'P-153'`); `Library/FortressLibrary.fsi:473-476`.
5. The lines cited; rows 381, 383 and 442 (`facts-extract.sh 'ledger:381' 'ledger:383' 'ledger:442'`); row 441, the `ZZ32` power's contract; `git show -s 4180a0dac` (2012-05-18, Guy Steele, "Shift operators << and >> and <<<; …"), a commit whose parent link the conversion cut, so it shows the whole tree and its message names the change.
6. A scratch program `HsPrelude.fss`, compiled with `java … com.sun.fortress.Shell compile HsPrelude.fss` ('compile rc=0') and run with `bin/fortress run HsPrelude` ('run rc=0'), both with `FORTRESS_CACHES` and `-Dfortress.caches` at a private copy of the warm caches.
7. `HsIntegral.fss`, as section 1, reference 12, with lines 3 to 7 added; the shadow's lines for the same program.
8. The lines cited.
9. `Float.java:418-422`, `:334-338`; `StringPrim.java:64-68`; `interpreter/glue/prim/Util.java:282-289` (`S2V` reads `x.getString()`).
10. The lines cited; `nativeHelpers/LocalRandom.java:21-23`; the compiled run of reference 6, its lines 4 and 6.
11. A scratch program `HsNumber.fss`: `random(ten)`, `random(2.5)`, `random(big(ten))`, `atan2(1.0, one)` and the rest; its first five lines, `rc=0`; the shadow's lines 'Float$Random Library/FortressLibrary.fss:4537:1-95 3', 'Float$ATan2 ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:176:5-177:78 4', 'StringPrim$PrintThreadInfo Library/FortressLibrary.fss:4633:1-117 4'.
12. Scratch programs `HsRational.fss` and `HsRational2.fss`, their outputs as quoted; `HsConvert.fss`'s `pti`; row 846; `facts-extract.sh 'ledger-find:getFloat'` prints row 361 only, `'ledger-find:printThreadInfo'` none, and `'ledger-find:Ratio'` rows 449, 635, 739 and 770; none of them is on these natives.
13. The lines cited; `Float.java:364-374`; `interpreter/glue/prim/FlatString.java:131-136`, `:173-178`; `nativeHelpers/simpleDoubleArith.java:68`, `:84`; `nativeHelpers/simpleConcatenate.java:16`; `nativeHelpers/stringOps.java:23`.
14. The lines cited; the compiled run of reference 6, its lines 5 and 7.
15. Scratch programs `HsFloatWidths.fss` (an `RR32` by `narrow(0.5)`, a `Float` by `1.0 + 1.0`) and `HsCarried.fss`; their lines as quoted, `rc=0`; the shadow's lines at `FortressBuiltin.fss:156:5-157:76`, `:328:5-329:76`, `:184:5-185:79`, `:188:5-189:81`, `Library/FlatString.fss:70:5-71:80` and `:96:5-97:84`.
16. `Long.java:256-260`; `nativeHelpers/simpleArbitraryPrecisionArith.java:130`; a scratch program `HsConvert.fss`, its line 2; `CLIMB-BATCH-25.md:410`.
17. The lines cited.
18. `interpreter/glue/prim/ObjectPrims.java:31-41`; `AnyPrim.java:23-32`.
19. The lines cited.
20. A scratch program `HsAny.fss` with `object Pt(x: ZZ32, y: ZZ32) end` and `object Blank end`; its lines 1 to 3, `rc=0`; row 113 (`SEQV` on value objects).

## 3. The team's sources, and which way they point

Three principles settle a fork: the team's later word (P-26), the library as the team wrote it, and the peers, which weigh only where the team's texts conflict or are silent. A fork is settled where the principles that speak to it point the same way. This section reads the first two; section 4 reads the peers [1].

### 3.1 The library as the team wrote it

1. **The conversion moved into Fortress for this very reason.** On 2008-09-30 Jan-Willem Maessen wrote: "Fix of Victor's bug: if we add a Ratio and an RR64, we got an error because Ratio isn't built in and consequently doesn't support the Java-level getFloat method. We need to do the coercion explicitly on the Fortress side using the `asFloat()` functional method. This requires cloning all the primitive methods on Number and RR64 and moving the originals down to Float". The commit adds 35 declarations whose body begins by converting `self`, as `opr IEEE_SLASH_DOWN(self,b:Number):RR64 = asFloat(self) IEEE_SLASH_DOWN asFloat(b)`, where its parent has none, and others that convert their arguments, as `atan2(self,x:Number):RR64 = atan2(asFloat(self), asFloat(x))`. The natives went down to `Float`, at the narrow type. The 35 stand today in the `RR64` trait (`Library/FortressLibrary.fss:434-487`), with `atan2` at `:494`. This is the team's own repair of group 2's defect (section 2, point 12): a glue class cannot read a number it does not know, so the library converts first [2].
2. **The same author, the same way, for the power.** On 2008-12-15 Maessen added, beside the natives at `Float` and `RR32`, `opr ^(self, b:Number):RR64 = self^(asFloat(b))`: "Fixed exponentiation bug #314". It stands at `FortressBuiltin.fss:160`. In the same file, the comment over the `AnyIntegral` power, "Shouldn't need this extra declaration.", is his of 2008-09-30 [3].
3. **Converting declarations beside a native of the same object.** At the team's last commit `FlatString`'s `<`, `<=`, `>`, `>=` and `CMP` are `self.cmp(other) < 0` and the like, over the native `cmp`, while `=` is a native of its own [4].
4. **Pairs, the narrow native public.** The committer `black`, whom the authorship notes take, unconfirmed, for Andrew P. Black, wrote `Writer`'s native `write(s:FlatString)` beside `write(s: String)` (2008-12-11) and `File`'s factory `FileReadStream(filename: String) = FileReadStream(filename.asFlatString)` beside the object over `FlatString` (2008-11-08). The strings review reads both [5].
5. **Private natives behind public names.** At the team's last commit `Writer`, `Reader` and `FlatString` bind `OutWriter`, `ErrWriter`, `InReader` and `natLineSeparator` as private natives, and give the public `stdOut`, `stdErr`, `stdIn` and `lineSeparator` from them [6].
6. **What the team wrote for these 30.** Group 1's shifts at `ZZ64`, `NN64` and `ZZ` and `Integral`'s abstract shifts are at `AnyIntegral` at the team's last commit; its `ZZ32` shift took a `ZZ64` count, and its integer powers answered `RR64`. The glue read the count by `y.getLong()`. The revival widened `ZZ32`'s count (`57600bc27`), made each power answer its base's type (`5ad4a9957`, P-153) and wrote the conversions `shiftCount` and `powCount` into the glue (section 2, point 3). The team's `random(a:Number)`, `printThreadInfo(a:Number)`, `SEQV`, `Object`'s two getters, `Float`'s brackets and its `atan2` over `Number` are as today. `black` added `printThreadInfo` and `ilkName` on 2008-08-27, "for use in debugging" [7].

### 3.2 The team's later word: the compiler's prelude, 2011 and 2012

7. The prelude is the work of the type group, which built the checker and the compiler. It writes each native as an `import java` alias of a helper over plain Java values, and every operation over a type that the helper does not read is a declaration that converts around the alias [8]:
    - Steele's transfers for `Character` (2011-06-24), copied by Jean-Baptiste Tristan for `NN32` and `NN64` (2011-11-23, 2012-01-03): every operation composed through them, 295 calls on 154 lines at the team's last commit. Steele hoped "that optimizations downstream will open-code the transfer methods".
    - Tristan's `ZZ` operations (2012-01-04): `opr +(self, other:ZZ): ZZ = BItoZZ(jAPAdd(ZZtoBI(self),ZZtoBI(other)))`, where `ZZtoBI` and `BItoZZ` are identities on a `BigInteger` (`nativeHelpers/simpleArbitraryPrecisionArith.java:122-128`).
    - The string `=` over `compareTo` and `||` with any object over `concatenate` (`CompilerBuiltin.fss:428`, `:432`), in the tree of 2011-11-17.
    - David Chase's `getProperty` of 2012-06-13, over `String`, flattening before the native.
    - Steele's `<<<` of 2012-05-18, one overload per count type, each converting the count in Fortress (section 2, point 5).
8. The prelude's headers are narrow: `LSHIFT` at the receiver's width, `^` at the base's type or `ZZ32`, `atan2` and `random` at `RR64`, the brackets answering `RR64`. It never binds a native at `AnyIntegral` or `Number` [9].

### 3.3 The text on which P-58 was taken

9. P-58 came from item 35, which asked whether a native binds by `builtinPrimitive("…")` or by `import java`. Its write-up states this limit of the bare form, in the way that the curator took: "the body must be exactly the call. So the 21 bindings whose parameters are not Java values (such as `AnyIntegral`, `Type`, `Any` or a function; B 10, C 11) each need a second, private declaration that converts first; under way 2 the body converts inline." Its recommendation lists the cost: "21 two-part bindings". The curator's answer was "Item 35, agreed with recommendation, option 1." [10]
10. P-58's own reason is "the language has no foreign-function interface, only a planned one, so the library's own practice decides the binding's form", and the form it rejects is "`import java` declarations written in the library itself" [11].
11. The revival has written converting declarations beside natives too: `opr ^(self, b:IntLiteral):ZZ32 = self^(b.asZZ32)` beside each integer power (`5ad4a9957`), `RR32`'s `opr ^(self, b:AnyIntegral):RR32 = narrow((asFloat(self))^b)` (`e455ccd98`), and rung T's five pairs (`93884be8d`) [12].

### 3.4 Which way they point

12. **Groups 1 and 2.** The library as the team wrote it converts on the Fortress side where a native's machinery cannot read the wide type, and puts the native at the narrow type (points 1 to 4). The later word does the same everywhere (point 7), with the narrow headers public (point 8). P-58 was taken on a text that names this two-part binding as the bare form's answer for `AnyIntegral` and `Any` (point 9). So both principles point to a converting declaration around a bare binding, and the fork is settled for these 20. The team's texts do not settle whether the bare half is public or private: both occur (points 4 and 5) [13].
13. **Group 3 and `big`.** The library as written binds each at its declared types, one native each. The later word converts for `=` and `||` (point 7), and has no `RR32` power and no bracket at `ZZ64`. So the principles agree that the six can be bound at their own types, by a new helper or by composing natives that exist; neither form departs from the team. `big` needs only its string [14].
14. **Group 5.** Both are silent on walk's side. The prelude's helpers take the compiled run time's `Any`, which walk's values are not (section 2, point 19), and the team's library has only glue. So the peers weigh here (section 4) [15].

**References**

1. `.claude/skills/coordinator/SKILL.md:95`; P-26 (`facts-extract.sh 'P-26'`).
2. `git show -s e109c9812` (2008-09-30, `jmaessen`); `git show e109c9812^:Library/FortressLibrary.fss | grep -c '= *(\?asFloat(self)'` prints 0, `git show e109c9812:Library/FortressLibrary.fss | grep -c …` 35, and the same on today's file 35; `git show e109c9812 | grep '^+.*atan2'`; `research/authorship.md:45` for `jmaessen`.
3. `git show 062c3b73b` (2008-12-15, `jmaessen`), its four added lines; `git show e109c9812 -- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, the comment over `opr ^(self, b:AnyIntegral):RR64`.
4. `git show a874948ac:Library/FlatString.fss`, its `:68-74`.
5. `explorations/reviews/string-natives-2026-11-05.md`, section 3.3, point 7, and its references 7 (`a39129809`, `9afe5fb39`); `Library/Writer.fss:33-35`, `:45-49`; `Library/File.fss:20-22`; `research/authorship.md:59`.
6. `git show a874948ac:Library/Writer.fss`, its `:20-26`; `git show a874948ac:Library/Reader.fss`, its `:20-23`; `git show a874948ac:Library/FlatString.fss`, its `:23-31`.
7. `git show a874948ac:Library/FortressLibrary.fss`, its `:633-636`, `:684-691`, `:752-758`, `:806-812`, `:877-883`, `:4123`, `:4215`, `:4224`; `git show a874948ac:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, its `:39-41`, `:174`, `:183-187`; `git log -S` on `Library/FortressLibrary.fss` for `opr LSHIFT(self,b:AnyIntegral):ZZ32` (`57600bc27`, 2026-09-26) and for `opr ^(self, b:AnyIntegral):ZZ32` (`5ad4a9957`, 2026-10-20); the strings review, section 3.3, reference 8 (`855a4699d`, 2008-08-27).
8. `explorations/compile-ladder/plan-24/probes/hard-set.md`, section 3 (`c2c769094`, `25f7cf913`, `b22c4ac56`, the 295 calls); `git show 4305f45d9` (2012-01-04, Jean-Baptiste Tristan, "NN64 test suite"), whose added lines include `simpleArbitraryPrecisionArith.ZZtoBI => ZZtoBI,` and `opr |self| : ZZ = BItoZZ(jAPAbs(ZZtoBI(self)))`; `git show 21c788b71:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, its `:246-247`, `opr =(self, b: String) = (jCompareTo(self, b) = 0)` (2011-11-17); the strings review, section 3.4, point 10 (`30ca1d8c7`); section 2, reference 5.
9. Section 2, points 5, 10 and 14.
10. `explorations/reviews/item35-natives-binding.md:105` and `:116`; `explorations/coordinator/POSITIONS-history.md:1630`, the block that quotes his words of 2026-10-10T05:27:34Z.
11. P-58 (`POSITIONS.md:55`).
12. `Library/FortressLibrary.fss:804`, `:897`, `:980`, `:1079`; `FortressBuiltin.fss:330`, `:464`; `git log -S` on each; `Library/FortressLibrary.fss:4627-4632`; `Library/System.fss:41-56`.
13. Points 1 to 9.
14. Points 3, 6 and 7; section 2, points 13 and 16.
15. Section 2, points 18 and 19.

## 4. The peers, as context

1. **Java puts a public typed method over a hidden primitive-typed one.** `AtomicInteger.getAndAdd(int)` is one call of `jdk.internal.misc.Unsafe.getAndAddInt(Object, long, int)`. That method lives in a package that the JDK does not export, and it carries the annotation `IntrinsicCandidate`: the JIT replaces its body with machine code. `BigInteger.shiftLeft(int)` is public; beside it stand `private static int[] shiftLeft(int[], int)` and `shiftLeftImplWorker`, over plain arrays [1].
2. **Java converts in library code where a type is not the primitive's.** Java has no unsigned `int`. `Integer.compareUnsigned(int, int)` adds `Integer.MIN_VALUE` to both arguments and calls `compare(int, int)`: the conversion is written in the library, around the primitive operation, as the prelude's transfers are [2].
3. **Scala wraps the Java call and converts on both sides.** `scala.math.BigInt.<<(Int)` reads the `java.math.BigInteger` inside, calls its `shiftLeft(int)`, and wraps the result by `BigInt.apply` [3].
4. **Shift counts and exponents are `int`.** `BigInteger.shiftLeft(int)`, `shiftRight(int)` and `pow(int)`, `Long.rotateLeft(long, int)`, and Scala's `BigInt.<<(Int)`, `>>(Int)` and `pow(Int)` all take an `int`. No standard library of the two takes a count of any integer type; the caller narrows. P-69 keeps Fortress's count of any integer type, so the narrowing must be written somewhere in Fortress's library or machinery [4].
5. **A value's type name and identity are the run time's own.** `Object.getClass()` and `Object.hashCode()` are `native` methods with `IntrinsicCandidate`: the virtual machine answers them. No library code computes them. Fortress's `ilkName`, `asString` of an object and `SEQV` are of that kind [5].
6. **What a public wrapper costs a call.** By its default flags, HotSpot's C2 inlines a method of at most 35 bytes of bytecode at a call that it compiles, and one of at most 325 bytes at a hot call (`MaxInlineSize`, `FreqInlineSize`). A wrapper that converts and calls is small. On the compiled path F-301 measured that C2 inlines a helper's whole path once the loop is hot, so the call costs nothing of its own; F-302 gives the limit, about four inlined frames above an operator before its temporary boxes stay. Under walk each wrapper is one more dispatch and one more call; walk is not timed here, as the skill forbids [6].
7. **What it costs a reader.** Two declarations stand where one stood. The conversion, hidden today inside a glue class (`Int.shiftCount`), stands in the library's text beside the call, where both paths run it and a reader sees it [7].

**References**

1. `javap -c java.util.concurrent.atomic.AtomicInteger`: `getAndAdd(int)` is `getstatic … Field U:Ljdk/internal/misc/Unsafe;`, `invokevirtual … Method jdk/internal/misc/Unsafe.getAndAddInt:(Ljava/lang/Object;JI)I`, `ireturn`; `javap -p -v --module java.base jdk.internal.misc.Unsafe` shows `public final int getAndAddInt(java.lang.Object, long, int);` with `RuntimeVisibleAnnotations: jdk.internal.vm.annotation.IntrinsicCandidate`; `javap -p java.math.BigInteger | grep shiftLeft` prints `public java.math.BigInteger shiftLeft(int);`, `private static int[] shiftLeft(int[], int);`, `private static void shiftLeftImplWorker(int[], int[], int, int, int);` (OpenJDK 25).
2. `javap -c java.lang.Integer`: `compareUnsigned(int, int)` is `iload_0`, `ldc int -2147483648`, `iadd`, `iload_1`, `ldc int -2147483648`, `iadd`, `invokestatic … Method compare:(II)I`, `ireturn`.
3. `javap -c -cp ProjectFortress/third_party/scala/scala-library-2.13.18.jar scala.math.BigInt`: `$less$less(int)` calls `bigInteger:()Ljava/math/BigInteger;`, `java/math/BigInteger.shiftLeft:(I)Ljava/math/BigInteger;` and `scala/math/BigInt$.apply:(Ljava/math/BigInteger;)Lscala/math/BigInt;`.
4. `javap java.math.BigInteger | grep -E 'shiftLeft|shiftRight| pow\('`; `javap java.lang.Long | grep rotateLeft`; `javap -cp … scala.math.BigInt | grep -E 'less\$less|greater\$greater| pow\('`, which print `$less$less(int)`, `$greater$greater(int)`, `pow(int)`; P-69.
5. `javap -p -v java.lang.Object`: `public final native java.lang.Class<?> getClass();` and `public native int hashCode();`, each with `jdk.internal.vm.annotation.IntrinsicCandidate`.
6. `java -XX:+PrintFlagsFinal -version | grep -E ' (MaxInlineSize|FreqInlineSize) '` prints `FreqInlineSize = 325` and `MaxInlineSize = 35` (OpenJDK 25.0.4.1); F-301 (`FACTS.md`, "On the compiled path a native helper is called through a generated wrapper …"); F-302; `.claude/skills/fortress-repo/references/interpreter.md`, "Running a program": "Do not take or record a timing of walk."
7. `interpreter/glue/prim/Int.java:295-306`; section 2, point 3.

## 5. The model program's exposure

1. **Which of the 30 it reaches.** The shadow of section 2 ran both quick checks. Of the 30, each program calls two, and no other [1]:

        flat Float$Pow ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162:5-163:76 17487
        flat Int$Pow Library/FortressLibrary.fss:802:5-803:74 492
        apl Float$Pow ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162:5-163:76 17368
        apl Int$Pow Library/FortressLibrary.fss:802:5-803:74 492

    So the model reaches `Float`'s `^` at an `AnyIntegral` exponent, 17.5K calls in the flat check and 17.4K in the APL check, and `ZZ32`'s `^` at an `AnyIntegral` exponent, 492 calls in each.
2. **Where the calls come from.** Every exponent is a `ZZ32` [2]:
    - the number parser of each program, `10.0^e10` and its two siblings (`explorations/run-c4/src/FlatData.fss:38-40`, `explorations/apl/mg/FlatData2.fss:41-43`). Each program reads 17.1K lines in its check (the shadow's 'FileReadStream$readLine … 17052'), so these calls come with the data, once per run;
    - the parser's `strToInt` (`FlatData.fss:34`, `FlatData2.fss:37`), whose `d radix^(n-i)` is `ZZ32`'s power (`Library/FortressLibrary.fss:4595`): the 492;
    - the constants `10.0^(-5)`, `10.0^(-8)` and `10.0^10` (`MicroGptFlat.fss:18`, `:29`; `MicroGptApl.fss:27`), once;
    - Adam's `beta1^t` and `beta2^t`, two calls a step (`MicroGptFlat.fss:79`; the APL program's `B1*t` and `B2*t`, `MicroGptApl.fss:106`, through `AplMg.fss:37`, `pow(b: RR64, e: ZZ32): RR64 = b^e`).
3. **Against the rest of the run.** The same flat check made 1.4M calls of `PrimitiveArray$get`, 462K of `PrimitiveArray$put` and 389K of `FloatLiteral$AsFloat`. The two powers are under 1% of its 2.5M glue calls, and they come almost all at load. `FloatLiteral$AsFloat` is one of the literals' 3, whose home is N5, not this item [3].
4. **Lines.** No option of section 6 touches a model line: each changes library declarations and helpers only [4].
5. **Values.** Every option keeps walk's values where its helpers and conversions keep the glue's. For the two that the model reaches, the new power helper must keep `Int.powCount`'s and `Int.negativePow`'s results (P-153), and `Float`'s power must stay `Math.pow` of the exponent as a `double`; section 2, point 7, line 7, and section 6 (a) give the forms that do. The model's quick check (`explorations/coordinator/tools/mg-run.sh`) is the rung's check of it [5].
6. **Speed.** Under walk, an option adds at most one dispatch and one call to each of these calls, at about 18K calls a check, almost all at load. On the compiled path the model does not run yet. Nothing here is timed [6].

**References**

1. Section 2, reference 1; the shadow's output for both programs, read with `awk '/^== /{s=$2} /GLUE-CALLS/{print s, $2, $3, $4}'`, of which the four lines quoted are the only ones at the 30's spans; each check 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS'.
2. The lines cited; `explorations/apl/mg/AplMgSyntax.fsi:227-234` (a square is a product, a half power `SQRT`, any other power `pow`); the shadow's 'flat FileReadStream$readLine … 17052' and 'apl FileReadStream$readLine … 17052'.
3. The shadow's lines 'flat PrimitiveArray$get … 1421281', 'flat PrimitiveArray$put … 462087', 'flat FloatLiteral$AsFloat … 388955'; `CLIMB-BATCH-26.md:28` and `:319` (the literals, N5).
4. Section 6.
5. P-153; section 2, points 3 and 7; `.claude/skills/fortress-repo/references/interpreter.md`, "The model program".
6. Points 1 to 3; F-301; `references/interpreter.md`, "Running a program".

## 6. The options

Each option says which of the five groups it reaches. Options (a) to (d) are the four ways that item 331 names; (e) mixes them by group.

### (a) A public converting declaration around a bare binding: the team's pair pattern

1. **What it is.** The declaration keeps its public header over `AnyIntegral` or `Number`. Its body converts the argument in Fortress and calls a bare binding at a carried type. The bare half has two spellings [1]:
    - private, the probe's way 3:

            private zz32ShiftLeft(a: ZZ32, n: ZZ32): ZZ32 =
                builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intBitLeftShift")
            opr LSHIFT(self, b:AnyIntegral):ZZ32 = zz32ShiftLeft(self, shiftCount32(b))

    - public, the form of rung T's pairs, under the narrow header that the prelude declares:

            opr LSHIFT(self, b:ZZ32):ZZ32 =
                builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intBitLeftShift")
            opr LSHIFT(self, b:AnyIntegral):ZZ32 = self LSHIFT shiftCount32(b)

    Here `shiftCount32(b: AnyIntegral): ZZ32` is a private function that keeps `Int.shiftCount`'s results: a `typecase` over the five types, or one overload per count type, as Steele's `<<<` does. The rung chooses the spelling of the conversion.
2. **Measured.** The probe measured way 3 for `ZZ32`'s `LSHIFT`: the distance stage at 0 errors, walk's suite of 695 tests with no failure, and its ten edge cases. Here, written as a program's own code, the conversion through a `typecase` and the bare `intBitLeftShift` give the glue's value at seven counts of the five types [2]:

            1 glue LSHIFT:      40 -2147483648 0 0 0 0 0
            1 converting shl:   40 -2147483648 0 0 0 0 0

    The public spelling is not measured for these bindings.
3. **Group 1, 17 bindings.** Each integer declaration converts its count into the receiver's width, or its exponent into a `ZZ32` with its sign and parity kept, and calls a bare binding [3]:
    - helpers that exist and, by reading, saturate and reverse as the glue does: `ZZ32`'s shifts (`nativeHelpers/simpleIntArith.java:368-377`) and `ZZ64`'s (`simpleLongArith.java:342-351`); `ZZ`'s `shiftLeft(BigInteger, int)` (`simpleArbitraryPrecisionArith.java:111`), whose values the rung checks against `BigNum`'s glue;
    - new helpers: the shifts of `NN32` and `NN64` (4; the prelude has none, row 442) and the five powers (5; the existing `intExp` uses `Math.pow` and throws a Java `RuntimeException`, `simpleIntArith.java:415-421`, row 441);
    - `Float`'s power: `opr ^(self, b:AnyIntegral):RR64 = self^(asFloat(b))`, the team's own text for `Number` (`FortressBuiltin.fss:160`), over the bare power at `Float`; or, in the public spelling, a bare power at a `ZZ32` exponent over a new one-line helper with `Math.pow`.
4. **Group 2, 3 bindings** [4]:
    - `random(a:Number):RR64 = random(asFloat(a))` around a bare `random(a:RR64)`, the prelude's header. Its helper must be new: the prelude's `LocalRandom.localRandomDouble` refuses a bound that is not positive ('java.lang.IllegalArgumentException: bound must be finite and positive'), where walk answers 'random(0): 0.0; random(-1) in (-1, 0]: true'.
    - `atan2`: `Float`'s declaration takes `x:RR64`, the prelude's header, bare over `doubleATan2`. The `RR64` trait's own `atan2(self,x:Number)` (`Library/FortressLibrary.fss:494`), which `Float` inherits, already converts both arguments and calls it. `Float`'s members are not in its api (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:41-42`), so the api does not change.
    - `printThreadInfo(a:Number):() = printThreadInfo(a.asString)`, which calls rung T's pair: no native of its own.

    All three then take a rational (section 2, point 12).
5. **Group 3, 6 bindings.** These can move with no new helper, by composing natives that exist: the brackets as `truncate(floor(self))`, the two mixed powers through `asFloat`, `=` as `(self.cmp(other) = 0)`, as the team's `<` and the prelude's `=` are written, and `flatConcat(self, b:Char)` through `b.asString` in a `typecase`, as rung T spells a flattening. As a program's own code, each gives the glue's values [5]:

            5 floor bracket glue: 2 -3 9223372036854775807 0; truncate(floor(x)): 2 -3 9223372036854775807 0
            6 Float^RR32 glue: 1.4142135623730951; 2.0^asFloat(h): 1.4142135623730951; RR32^Float glue: 0.25; asFloat(h)^two: 0.25
            3 = glue: true false; converting over compareTo: true false
            4 || Char glue: abc; converting over nativeConcatenate: abc

6. **Groups 4 and 5.** `big` needs only its string. No conversion written in Fortress gives a value's type name or its identity, so (a) does not reach group 5 [6].
7. **Files and lines, walk and the library**: `Library/FortressLibrary.fss:796-803`, `:889-896`, `:972-979`, `:1069-1078`, `:4537`, `:4633`; `FortressBuiltin.fss:162-163`, `:176-177`, `:456-463`. In the public spelling also the api gains one line for each narrow header: `Library/FortressLibrary.fsi:525-528`, `:579-582`, `:638-641`, `:692-700`, `:2573`, and `FortressBuiltin.fsi:164-168`. In the private spelling the api does not change. About 11 new one-line helpers under `nativeHelpers/`. Walk's loader does not change [7].
8. **Files and lines, the compiled path**: none. Its rewrite reads each bare binding (F-298) and puts the transfers at `NN32` and `NN64` (F-308). The conversions are library text, which the compiled path compiles after the switch-over; until then the distance stage checks them (P-39), as it checked way 3 at 0 errors [8].
9. **Tests that change.** New walk guards for each type, at the counts and exponents where a conversion bites: each of the five types, negative, at and beyond the width, beyond 64 bits; `NN32` at 2^31 and above and `NN64` at 2^63 and above, as the skill asks for these types. Compiled guards that bind the new helpers by their own declarations. Walk tests of the three rational cases, which fail today. The value tests that exist stay as they are and guard the values: `tests/IntSemanticsRungI.fss`, with 53 lines of shifts, `IntegerPowerContractWalk`, the `NatPower…Walk` tests. F-32's and F-299's counts change [9].
10. **Size**: two rungs in one batch: the integers, 16 bindings and 9 helpers; floats and `Number`, 4 bindings and 2 helpers, with group 3 beside them [10].
11. **The model**: no line; values kept (section 5). In the private spelling each of the model's 18K power calls a check gains one dispatch, and `Float`'s also an `asFloat` call. In the public spelling each goes straight to its bare binding, one native call as today [11].
12. **Item 332.** The bare half keeps P-58's form exactly; the public half is ordinary library code. The text on which P-58 was taken names this two-part binding as the bare form's answer for `AnyIntegral` and `Any`, and the form that P-58 rejects is a written `import java` (section 3.3). So by that text the answer is yes. The probe read "it keeps that form" as: each declaration that is a native binding today stays one. By that reading the answer is no [12].
13. **Item 361.** Rung T's pairs are this pattern in its public spelling: a public bare native at the narrow type beside a public declaration at the wide type that converts and calls it. The record read them as outside item 332 because the native is public. The two spellings differ only in the bare half's visibility, so one answer to item 332 covers both [13].

### (b) New helpers that take the Java types walk carries

14. **What it is.** A new helper whose Java types are the declaration's carriers. The binding stays one bare body at its declared types [14].
15. **Group 3 and `big`.** Six one-line helpers: `(double, float)` and `(float, double)` to `double`; `double` to `long` for the floor and the ceiling; `(String, String)` to `boolean`; `(String, int)` to `String` for the `Char`, through the `Char` transfer on the compiled path (F-308). `big` takes its existing helper [15].
16. **Group 1.** Only by changing the declared type, since `AnyIntegral` has no carrier [16]:
    - (b1) five overloads per operator, one for each type that `AnyIntegral` comprises, each bare: 85 declarations where 17 stand, about 60 new helpers, five api lines for each. Together the five cover `Integral`'s abstract over `AnyIntegral` through its `comprises` clause (P-147).
    - (b2) the count declared `ZZ` and carried in a `BigInteger`: every fixed-width shift then passes through `ZZ`, which P-69 forbids on the compiled path, and a declaration at `ZZ` alone does not cover `Integral`'s abstract, since the five types are siblings.
17. **Group 2.** Only by narrowing the parameter to `RR64`, which changes the api: a `ZZ64` converts into `RR64` only by `asFloat`, by the curator's decision on the library, so `random` of a `ZZ64` would stop. `printThreadInfo` cannot take a text and a number in one carrier. **Group 5**: no Java type carries it [17].
18. **Files and lines**: `nativeHelpers/`; `FortressBuiltin.fss:156-157`, `:184-189`, `:328-329`; `Library/FlatString.fss:70-71`, `:96-97`; `Library/FortressLibrary.fss:812-813`. The compiled path: none. **Tests**: walk and compiled guards for the six, at NaN, the infinities and 10^300 for the brackets, and at a `Char` above U+FFFF for `flatConcat`. **Size**: a part of one rung for group 3; two to three rungs for (b1). **The model**: none of group 3 is on its path; under (b1) its power calls go straight to a bare binding [18].

### (c) New carriers in walk's loader

19. **What it is.** As rung T gave the library's `FlatString` a carrier as `self`, give `AnyIntegral`, `Number` and `Any` carriers: `AnyIntegral` in a `long`, clamped with its sign and parity kept, `Int.powCount`'s rule, which also serves the shifts; `Number` in a `double`, by `asFloat`; `Any` as walk's value itself, a Java `Object`. Walk's loader changes at `javaFor`, `javaForParameter` and `unbox` [19].
20. **The compiled half.** In the one library's world the compiled checker reads no Java type as `AnyIntegral` or `Number`. So the rewrite (`compiler/BuiltinPrimitiveRewriter.java`) must wrap each such argument in a conversion, as it wraps an `NN32` in a transfer. Until N5's table names the one library's types, that conversion cannot be a helper over them. So it is Fortress code in the library: the text of (a), called by the compiler in place of the library's own declaration [20].
21. **Its limits.** One carrier for a type gives one conversion. `printThreadInfo` wants the number's text, and `random` a `double`; so `printThreadInfo` still takes (a). For `Any`, the checker already reads a Java `Object` as `Any`, but one helper over `Object` would then receive walk's `FValue` on walk and a `fortress.AnyType.Any` on the compiled path; no design reads both, and the two paths' `SEQV` already differ (section 2, point 20). So (c) reaches group 1 and two of group 2, 19 bindings. Its `Number` carrier must call `asFloat` through walk, or it repeats the glue's failure at a rational, which the team left in 2008 (section 3.1, point 1) [21].
22. **Files and lines**: `interpreter/glue/StaticNativeApp.java:51-62`, `:70-72`, `:276-285`; `compiler/BuiltinPrimitiveRewriter.java`; the library's conversion functions; the same new helpers as (a). **Tests**: `tests/NativeHelperUncarriedWalk.fss:5` binds over `AnyIntegral` to show the refusal 'no Java type carries the declared type of parameter a'; under (c) that binding loads, so the test takes another type; a test of each carrier on both paths. **Size**: three rungs: walk's carriers, the rewrite, the bindings. **The model**: walk's loader converts at each of its power calls, as the glue does today [22].
23. **P-58.** Every binding stays one bare body, so item 332 is not needed. But each conversion rule is written twice, in walk's Java and in the library's Fortress: the drift that the strings review weighed against its own loader option [23].

### (d) The glue kept until N5

24. **What it is.** Nothing moves now [24].
25. **Where it ends.** The compiled path cannot run a glue string, so the 30 hold the switch-over, which waits for every binding to name a helper. N5 gives the compiled path's table the one library's types. It gives walk no carrier: a helper over the compiled run time's class for `AnyIntegral` or `Any` cannot take walk's values. So for groups 1 to 4, (d) is a wait with no way at its end. For group 5 it is the only position that the record supports today [25].
26. **Files, tests, size, model**: none now. The three defects at a rational stay [26].

### (e) The mix by group

27. **What it is.** (a) in the public spelling for groups 1 and 2, 20 bindings, with the private spelling where a stage refuses a pair; (b) for group 3, 6 bindings; `big` by its existing helper; (d) for group 5, 3 bindings, with a question of its own on a carrier of `Any`. So 27 move and 3 stay on glue [27].
28. **Why the public spelling.** The prelude declares these narrow headers publicly, the team's `Float` and `RR64` and rung T's pairs put the native public, and the model's power calls, all at a `ZZ32` exponent, then go straight to a bare binding. The private spelling keeps the api as it is; it is the choice if the curator wants no new public overload [28].
29. **Size**: two rungs in one batch, about 17 new helpers. Item 363 then takes its other way, new helpers for `FlatString`'s two [29].

**References**

1. `explorations/compile-ladder/plan-24/probes/hard-set.md`, section 4.3; `Library/FortressLibrary.fss:4627-4632`; `CompilerBuiltin.fss:732-737`.
2. `hard-set.md`, section 4.3 and section 5, runs 3-1 to 3-4; a scratch program `HsConvert.fss` with `intShl(a: ZZ32, n: ZZ32): ZZ32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intBitLeftShift")`, `count32(b: AnyIntegral): ZZ32 = typecase b of c: ZZ32 => c; c: ZZ64 => narrow((c MAX (-33)) MIN 33); …` and `shl(a: ZZ32, b: AnyIntegral): ZZ32 = intShl(a, count32(b))`, at the counts `3`, `widen(31)`, `unsigned(32)`, `unsigned(widen(40))`, `big(-3)`, `-40` and `(big(2))^70`; its line 1, `rc=0`.
3. The lines cited; rows 441 and 442; section 2, points 3 and 5.
4. `nativeHelpers/LocalRandom.java:21-23`; a scratch Java program calling `ThreadLocalRandom.current().nextDouble(0.0)`, its output as quoted; a scratch program `HsRandom.fss`, its output, `rc=0`; `CompilerBuiltin.fss:981`, `:1629`; `HsConvert.fss`'s `pti` and `HsRational.fss` (section 2, reference 12).
5. `HsConvert.fss`, its lines 3 to 6, with `cmpz(a: FlatString, b: FlatString): ZZ32` bound bare to `stringOps.compareTo`, `cat2` to `simpleConcatenate.nativeConcatenate`, and `iFloor(x: RR64): ZZ64 = truncate(floor(x))`; `git show a874948ac:Library/FlatString.fss`, `:70-74`; `CompilerBuiltin.fss:428`; `Library/FlatString.fss:137-140`.
6. Section 2, points 16 and 18.
7. The lines cited.
8. F-298; F-308; P-39; `hard-set.md`, section 5, run 3-1.
9. `.claude/skills/fortress-repo/references/compiler.md`, "Natives", on `NN32` and `NN64` guards; `grep -c 'LSHIFT\|RSHIFT' ProjectFortress/tests/IntSemanticsRungI.fss` prints 53; `ls ProjectFortress/tests | grep -i pow`; F-32; F-299.
10. Points 3 and 4.
11. Section 5, points 1 and 6.
12. P-58; section 3.3, points 9 and 10; `hard-set.md`, section 4.3, "against P-58's …", and section 8, Q3.
13. Review-queue item 361 (`review-queue.md:420-425`); `CLIMB-BATCH-26.md`, section 2, fork 19.
14. `.claude/skills/fortress-repo/references/library.md`, "Designing a change", on new natives.
15. `nativeHelpers/simpleDoubleArith.java:128-130` (`doubleTruncate`, `(long) a`); F-308.
16. `Library/FortressLibrary.fsi:444`, `:473-476`; P-147 (`facts-extract.sh 'P-147'`); P-69.
17. `.claude/skills/fortress-repo/references/library.md`, "The curator's decisions on the library", the second point.
18. The lines cited.
19. `StaticNativeApp.java:51-62`, `:70-72`, `:276-285`; `Int.java:271-286`; `93884be8d`.
20. `compiler/NamingCzar.java:369-372`, `:476-491`, a table with no entry for `AnyIntegral` or `Number`; F-298; F-308; `PLAN.md:54`.
21. `compiler/NamingCzar.java:487`, `o(Type.getType(Object.class), anyLib, "Any")`; section 2, points 12 and 20; section 3.1, point 1.
22. `ProjectFortress/tests/NativeHelperUncarriedWalk.fss:5` and its `.test`, `load_exception_contains=no Java type carries the declared type of parameter a`.
23. `explorations/reviews/string-natives-2026-11-05.md`, section 6 (a), point 6, and section 7, point 2.
24. Review-queue item 331, "Landed".
25. `.claude/skills/fortress-repo/SKILL.md`, "The phases", the paragraph on the switch-over; F-32; F-180, its second finding; `PLAN.md:54`.
26. Section 2, point 12.
27. Points 1 to 26.
28. Section 3.2, point 8; section 3.1, points 1 and 4; section 5, point 2.
29. Points 3, 4 and 15; review-queue item 363 (`review-queue.md:577-582`).

## 7. How the options weigh against each other

1. **The team's sources.** For groups 1 and 2, (a) is the team's way: Maessen moved the conversion from the glue's `getFloat` into Fortress in 2008 for the very defect that group 2 shows today, and the prelude of 2011 and 2012 converts around a narrow helper wherever the types differ. (c) brings back the Java-side conversion that the team left. (b) for these groups changes the api that the team and the decisions wrote (`AnyIntegral` counts, P-69; `Number` parameters). For group 3 the library as written points to (b), one native at the declared types, and (a) departs from no text either. For group 5 the team's texts are silent on walk's side, and the peers answer such operations in the run time itself, not in library code: that is (d) now, and a carrier later [1].
2. **P-58 and the record.** (a) needs item 332's yes by the strict reading; by the text that P-58 was taken on, it is that text's own answer. (b) and (d) need nothing. (c) needs no answer to item 332, but changes F-299's list of carriers and walk's refusal test, and it puts the compiler in the place of library text [2].
3. **Two paths, one rule.** Under (a) and (b) every conversion is library text or a helper that both paths run. Under (c) each rule is written twice, in walk's Java and in the Fortress that the rewrite calls. Under (d) the rule stays in walk's Java only [3].
4. **The rules that refuse.** P-69 refuses a fixed-width shift through `ZZ` on the compiled path, so it refuses (b2) and a `ZZ` carrier for (c); it permits (a) and (b1). P-153 binds every option to the same values at a negative exponent [4].
5. **Safety.** (a) repairs the three defects at a rational, since `asFloat` and `asString` are library methods that every number has. (b) does not reach group 2. (c) repairs them only if its `Number` carrier calls `asFloat` through walk. (d) keeps them [5].
6. **Size.** (a): two rungs for groups 1 and 2. (b): part of a rung for group 3; two to three rungs and 85 declarations if (b1) takes group 1. (c): three rungs, and it still leaves `printThreadInfo` and group 5. (d): none now, but it holds the switch-over. (e): two rungs in one batch, about 17 new helpers [6].
7. **The model.** No option changes a model line or value. Of the 30 the model reaches two powers, about 18K calls a quick check, almost all at load. (a) in the public spelling, (b1) and (d) add no call; (a) in the private spelling adds one dispatch and, for `Float`, one `asFloat` to each; (c) converts in the loader on each, as the glue does now [7].
8. **Undoing.** Each option is undone in one commit. A public narrow overload is an api line that programs may come to call, so the public spelling of (a) is harder to take back than the private one [8].
9. **What none of them settles.** A carrier of `Any` that both paths share: walk's `SEQV` compares numbers and tuples by value, and the compiled helper compares references, so the design must also choose the operation's meaning. This is a decision not taken, for a later item [9].

**References**

1. Section 3, points 1, 7, 12 to 14; section 4, point 5; section 6 (b), points 16 and 17.
2. Section 3.3; section 6 (a), point 12, and (c), points 22 and 23.
3. Section 6 (c), point 23; the strings review, section 7, point 2.
4. P-69; P-153; section 6 (b), point 16.
5. Section 2, point 12; section 6 (a), point 4, and (c), point 21.
6. Section 6, points 10, 18, 22, 26 and 29.
7. Section 5; section 6, points 11, 18 and 22.
8. Section 6 (a), point 7.
9. Section 2, points 19 and 20; section 6 (c), point 21.

## 8. Recommendation

Take (e): the 20 bindings over `AnyIntegral` or `Number` as public converting declarations around bare bindings at the prelude's narrow headers (option (a), the team's pair), the six over carried types by new helpers (option (b)), `ZZ32`'s `big` by its existing helper, and `Object`'s two getters and `SEQV` left on glue (option (d)) until a carrier of `Any` is designed; this answers item 332 yes, a public declaration that converts around a bare binding keeps P-58's form, as the item 35 write-up on which P-58 was taken states, and item 361 yes, rung T's five pairs are the same pattern with the bare half public, so that yes covers them and they stand as landed.
