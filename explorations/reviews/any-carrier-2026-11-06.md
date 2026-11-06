<!-- The design for the curator's decision on how the three native bindings over `Any` and `Object`, `Object`'s getters `asString` and `ilkName` and `opr SEQV`, leave walk's glue classes so that both paths run them, and on what `SEQV` means (P-162's open design; `reviews/hard-set-natives-2026-11-06.md`, section 7, point 9): a Java `Object` carrier with one helper that reads both representations, one helper behind each path's adapter, the operations answered by each path's run time under one binding, a wait for P-12, or fewer natives in the library; written 2026-11-06 by an Opus worker, reading only, with walk and compiled runs and three scratch prototypes from the main tree's build at `16dfc29b7` in private caches folders. -->

# The carrier of `Any`: the design for the curator's decision

The tree is `main` at `16dfc29b7`. Its build is current: `ProjectFortress/build/implementation.stamp` and `default_repository/caches/implementation.stamp` both read `180a6844e44e…`. No source, library, test, specification or model file changed between the hard-set review's base `fc9b9293c` and this tree. Every Fortress run below used that build with a private caches folder, copied from the warm caches, or empty for the model's checks. The programs are scratch files and are not committed; each point quotes the lines that matter and the output. Three kinds of scratch code were put ahead of the build on the class path: a counter (section 5), and two prototypes, A and C, each a copy of one or two classes of the tree with a few lines changed (section 6). A prototype's library change was made in copies of `FortressBuiltin.fss` and `FortressLibrary.fss` in a scratch folder, which walk reads before the library because it searches the current folder first. Nothing in the tree changed. A Java path without a prefix is under `ProjectFortress/src/com/sun/fortress/`.

## 1. The question, and a primer

**The question.** How do `Object`'s getters `ilkName` and `asString` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:38-41`) and `opr SEQV(a: Any, b: Any): Boolean` (`Library/FortressLibrary.fss:4650-4651`) leave walk's glue classes, so that both paths run them? And what does `SEQV` mean? P-162 left the three on glue "until a carrier of `Any` for both paths is designed", and said that the design also settles `SEQV`'s meaning [1].

**The words.**

1. *Walk* is Fortress's interpreter. The *compiled path* compiles a program to JVM bytecode and runs that. Each path has its own library today. At the *switch-over* the compiled path moves onto walk's library, the *one library*, and the compiler's own small library, the *prelude*, is deleted. The switch-over waits until every native binding of the one library has a binding that the compiled path runs [2].
2. A *native binding* is a library declaration whose body is `builtinPrimitive("…")`. The string names the Java code that does the work [3].
3. A *glue class* is a Java class under `interpreter/glue/prim/` that takes walk's own run-time values. Only walk can run it. A compile refuses a glue string: 'Variable builtinPrimitive is not defined.' [4]
4. A *helper* is a public static Java method under `nativeHelpers/`. Both paths can call it. Walk calls it through its *loader*, `interpreter/glue/StaticNativeApp.java`, by reflection. The compiled path *rewrites* the body at the parse into a call of the helper, and the checker checks the declaration against the helper's Java signature [5].
5. P-58, a decision of the curator, says that every native binding names a helper and keeps the form `builtinPrimitive("…")`, and that walk loads the named helper. A *bare* binding is one whose body is exactly that call with a helper's name [6].
6. A *carrier* is the Java type in which walk's loader passes a value of a declared Fortress type to a helper: `ZZ32` in `int`, `RR64` in `double`, `FlatString` in `String`, and so on. Walk's loader reads a declared type by its name and refuses a binding with a declared type that no carrier names. No carrier names `Any` or `Object` [7].
7. A *transfer* is an identity helper that the compiled path puts around an argument or a result, so that the checker reads a Java `int` as `NN32` or `Char`. Transfers are not needed for these three [8].
8. A *representation* is the Java class of a run-time value. Walk's values are subclasses of `FValue` (`interpreter/evaluator/values/`): `FInt`, `FFloat`, `FString`, `FTuple`, `FOrdinaryObject` and others. The compiled path's values are classes that implement `fortress.AnyType.Any`: `FZZ32`, `FRR64` (`compiler/runtimeValues/`) and the classes that the code generator writes. Neither path's values are the other's [9].
9. `SEQV` is *object equivalence*, also written `===` and U+2263. The parser reads both spellings as one operator: under walk, where the library declares only `opr SEQV`, `three === three` and `3 === 3.0` both run, `12 ===: true true`; compiled, where the prelude declares only `opr ===`, `x SEQV y` runs, `8 SEQV spelling:  true` [10].
10. A *rung* is one task that one agent builds and lands with its tests. A *batch* is a set of rungs built at once [11].

**The example.**

11. One program, run on both paths [12]:

        object Pt(x: ZZ32, y: ZZ32) end
        ...
          p = Pt(1, 2); q = Pt(1, 2); x: ZZ32 = 3; y: ZZ32 = 3; r: RR64 = 3.0
          println(p.asString)
          println("SEQV: " (p SEQV p) " " (p SEQV q) " " (x SEQV y) " " (x SEQV r) " " ((x, y) SEQV (x, y)))

        walk:      Pt
                   SEQV: true false true true true
        compiled:  Pt
                   SEQV:  true   false   true   false   false

    Both paths print the object's type name, and both find a reference object equivalent only to itself. They differ on a `ZZ32` 3 beside an `RR64` 3.0, and on two equal tuples. (The compiled spaces around each value are row 76, the prelude's juxtaposition.)

**Why the three have no bare helper.**

12. The compiled path already has a helper for each: `stringOps.typeName` for `ilkName`, `stringOps.defaultAsString` for `asString`, and `equality.sEquiv` for `SEQV`, each over `fortress.AnyType.Any`. A program's own bindings of the three, at `Any`, compile and run: `1 typeName, defaultAsString:  Pt   Pt   ZZ32   3   Qt`, where `Qt` is the `self` of a program's trait. Under walk the same program stops at load: 'Native helper com.sun.fortress.nativeHelpers.stringOps.typeName: no Java type carries the declared type of parameter x.' Walk's values are not `fortress.AnyType.Any`, and its loader has no carrier for `Any` [13].

**References**

1. P-162 (`explorations/coordinator/tools/facts-extract.sh 'P-162'`); `explorations/reviews/hard-set-natives-2026-11-06.md`, section 2.5 and section 7, point 9.
2. `.claude/skills/fortress-repo/SKILL.md`, the words *walk*, *compiled path* and *one library*, and "The phases", the paragraph on the switch-over; `references/compiler.md`, "The compiler's prelude, until the switch-over".
3. P-58 (`explorations/coordinator/POSITIONS.md:55`); `FortressBuiltin.fss:34-35`, `builtinPrimitive`'s own declaration.
4. F-32 (`explorations/coordinator/FACTS.md:30`); `interpreter/glue/prim/ObjectPrims.java:21-41`; `interpreter/glue/prim/AnyPrim.java:21-34`; `references/compiler.md`, "Natives".
5. F-298 (`FACTS.md:133`); F-299 (`FACTS.md:134`); `interpreter/glue/NativeApp.java:200-205`; `compiler/BuiltinPrimitiveRewriter.java`.
6. P-58.
7. `interpreter/glue/StaticNativeApp.java:51-62` (`javaFor`), `:74-78` (`typeName`, which reads a `NamedType`'s name only), `:90-93` (`carried`), `:276-286` (`unbox`); `references/interpreter.md`, "Natives".
8. F-308 (`FACTS.md:138`); `compiler/NamingCzar.java:369-384`.
9. `interpreter/evaluator/values/FValue.java:85-88`; `compiler/NamingCzar.java:304-315` (`jvmTypeExtendsAny`), `:333-336`.
10. `parser/Literal.rats:303` (`"SEQV"` read as U+2263); `parser/Symbol.rats:140` (`"==="`); a scratch program `AcWalkSpell.fss`, `println("12 ===: " (three === three) " " (3 === 3.0))`, under walk, `rc=0`; a scratch program `AcComp.fss`, its line 8, compiled and run, `compile rc=0`, `run rc=0`.
11. `hard-set-natives-2026-11-06.md`, section 1, point 9.
12. A scratch program `AcPrimer.fss` with the lines quoted; under walk `rc=0`; `java … com.sun.fortress.Shell compile AcPrimer.fss` ('compile rc=0') and `bin/fortress run AcPrimer` ('run rc=0'), both with `FORTRESS_CACHES` and `-Dfortress.caches` at a private copy of the warm caches; row 76 (`facts-extract.sh 'ledger:76'`).
13. `nativeHelpers/stringOps.java:82-85`, `:108-118`; `nativeHelpers/equality.java:14-19`; a scratch program `AcBind.fss` with `myIlk(x: Any): String = builtinPrimitive("com.sun.fortress.nativeHelpers.stringOps.typeName")`, `myStr` on `defaultAsString`, `mySeqv(a: Any, b: Any): Boolean` on `equality.sEquiv`, and `trait Named getter ilk(): String = builtinPrimitive("…stringOps.typeName") end`; compiled 'compile rc=0', run 'run rc=0'; under walk 'rc=1' with the message quoted.

## 2. The three today on each path

### 2.1 The declarations and walk's glue

1. **The declarations.** `trait Object extends Any` declares `getter ilkName(): String` on `ObjectPrims$ClassName` and `getter asString(): String` on `ObjectPrims$ToString`. Beside them, in Fortress, `asDebugString` is an article, `ilkName`, `": "` and `asString`; `asExprString` is `"no expression for "` and `asString`; the deprecated `toString` is `self.asString`. `opr SEQV(a: Any, b: Any): Boolean` is bound to `AnyPrim$SEquiv`, and its api line is `FortressLibrary.fsi:2645` [1].
2. **The glue.** `ToString` answers `o.toString()` and `ClassName` answers `o.type().toString()`. For a walk object, `FObject.toString()` is `getString()`, which is `type().toString()`, unless the value's class overrides `getString`. So both getters answer the type's name for every ordinary object. `AnyPrim.sequiv(x, y)` answers `true` if `x == y`, and otherwise `x.seqv(y)`: each value class of walk answers `SEQV` by its own method [2].
3. **Which values reach `Object`'s two getters.** Walk's classes that override `getString` are its number, `Boolean`, `Char` and string classes. Each of their library types declares its own `asString`: `Float`, `FloatLiteral`, `RR32`, `Int`, `Long`, `NN32`, `UnsignedLong`, `IntLiteral`, `BigNum`, `Boolean`, `Char` and `FlatString`. So only values whose type declares no `asString` reach `Object`'s, and for each of them `asString` and `ilkName` give one text. The counter of section 5, run on the program of section 2.2, met `ObjectPrims$ToString` only on `FOrdinaryObject` values: `Blank`, `Box[\ZZ32\]`, `Circ`, `Pt` and `VPlain` [3].

### 2.2 Walk's answers

4. **At work under walk**, with `object Pt(x: ZZ32, y: ZZ32)`, `object Blank`, `object Box[\T\](v: T)`, `value object VPlain(a: ZZ32, b: ZZ32) end`, `value object VField(a, b)` with a body field, `object Circ(r) extends Shape`, `object Named(n)` with its own `asString`, and `inc(x: ZZ32): ZZ32` [4]:

        1 ilkName: Pt Blank Box[\ZZ32\] Box[\FlatString\] VPlain Circ Int FlatString Boolean Char FloatLiteral BigNum
        2 asString: Pt Blank Box[\ZZ32\] VPlain Circ Named x
        3 asString = ilkName: true true true
        4 asDebugString: a Pt: Pt; a Named: Named x; a Int: 3
        5 numbers: 3,3 true; ZZ32,ZZ64 true; ZZ32,RR64 true; ZZ32,NN32 false; ZZ,ZZ apart true; ZZ32,ZZ false; 0.0,-0.0 false; NaN,NaN true; 0.0 = -0.0 true
        6 tuples: true true true false true
        7 strings: true true false true CatString FlatString
        8 chars, booleans: true true false
        9 objects: true false true true false true false true
        10 functions: true true false
        11 default =: false true true

5. **What the lines show.**
    - Line 1: `ilkName` names walk's own class of a number, `Int`, `FloatLiteral`, `BigNum`, not `ZZ32`, `RR64` or `ZZ`; an inferred static argument is the run-time class, `Box[\FlatString\]` (row 364).
    - Line 5: a `ZZ32` 3 is equivalent to a `ZZ64` 3 and to an `RR64` 3.0, but not to an `NN32` 3 or a `ZZ` 3. Two `ZZ` 3s built apart are equivalent. Floats compare by their bits: `0.0` and `-0.0` are not equivalent, though `=` holds; a NaN is equivalent to itself.
    - Line 6: `(1,2)` and `(1,2)`, `(1,2)` and `(1,2.0)`, and `()` and `()` are equivalent; tuples of two equal `Pt`s are not.
    - Line 7: two flat strings of one text are equivalent; two equal strings longer than 32 characters are ropes, `CatString` objects, and are not.
    - Line 9: `p SEQV p` true, `p SEQV q` false, `Blank SEQV Blank` true; `VPlain(1,2) SEQV VPlain(1,3)` true and `Just(1) SEQV Just(2)` true, row 113's defect; `VField(1,2) SEQV VField(1,3)` false; two `Box[\ZZ32\](1)` false.
    - Line 10: a function value is equivalent to itself; two equal lambdas are not.
    - Line 11: `p = q` is `false` and `VPlain(1,2) = VPlain(1,3)` `true`, because the library's `=` at `Any` is `a SEQV b` [5].

### 2.3 The compiled path's answers

6. **The prelude.** `Object`'s `asString` is `jDefaultAsString(self)`, over `stringOps.defaultAsString`: the value's own Java `toString` if its class declares one, else its Fortress type name. `asDebugString` is `self.asString`; the team's article form, which reads `ilkName`, is commented out, and the prelude declares no `ilkName`. `SEQV` is the family `opr ===` under the comment "This is incomplete": at `Any` over `equality.sEquiv`, which answers `a == b`, and at `ZZ64`, `ZZ32`, `RR64`, `RR32` and `String` by `=`, at `Boolean` by `<->`. A commented `opr SEQV(a:Any, b:Any) = jSEQV(a,b)` names an alias that no import gives [6].
7. **At work compiled** [7]:

        1 asString:  Pt   Blank   Box[\ZZ32\]
        2 asDebugString:  Pt
        3 numbers: ZZ32,ZZ32  true ; ZZ32,ZZ64  false ; ZZ32,RR64  false ; 0.0,-0.0  true ; NaN,NaN  false
        4 objects:  true   false   true
        5 strings, booleans:  true   true   true
        6 tuples:  false
        7 at Any: ZZ32,ZZ32  true ; ZZ32,RR64  false
        8 SEQV spelling:  true

    Numbers of one type, strings and booleans compare by `=`, so `0.0 === -0.0` is true and a NaN is not equivalent to itself. Mixed types and tuples fall to `Any`, where two boxes are compared as references. At line 7 the static types are `Any` and the dispatch method chooses by run-time type, so two `ZZ32` 3s still reach the `ZZ32` declaration.
8. **`ilkName` compiled.** `println(Pt(1, 2).ilkName)` is refused: 'Pt has no getter called ilkName', 'compile rc=255' [8].
9. **The helper alone.** Bound bare at `Any`, `equality.sEquiv` gives `2 sEquiv:  true   false   false   false` for `p,p`, `p,q`, two `ZZ32` 3s and two equal tuples. So the helper gives `false` for two equal numbers; the prelude's family, not the helper, makes `3 === 3` true [9].

### 2.4 What `SEQV` means: the specification, walk and the compiled path

10. **The specification's rule.** The trait `Any` declares `SEQV`. "This operator is automatically defined for all objects; it is a static error for the programmer to override it." Arguments of different dynamic types, "including the instantiations of all static parameters", are never equivalent. Value objects of one type are equivalent when their fields are, "in particular, two binary words are strictly equivalent if and only if they contain the same bit pattern". Two references are equivalent when they refer to one object. Two functions are equivalent only if they behave alike, and an implementation may answer `false` even then. The Working Draft has the same text [10].
11. **Which values are value objects.** A function object has an arrow type; a reference object has an object trait type not declared `value`; every other value is a value object, tuples and `()` among them. "booleans, numeric literals, IEEE floating-point numbers, and integers are value objects"; "Reference objects include arbitrary-precision numbers and aggregates such as arrays, lists and sets". The chapter opens "Value objects and properties are not yet supported." The library declares `value object Int`, `Boolean`, `Char` and `BigNum`, and `object FlatString` without `value` [11].
12. **The three side by side.** "Spec" applies points 10 and 11; "walk" and "compiled" are the runs of points 4 and 7 [12]:

    | Values | Spec | Walk | Compiled |
    |---|---|---|---|
    | two `ZZ32` 3s | true | true | true |
    | `ZZ32` 3, `ZZ64` 3 | false, types differ | true | false |
    | `ZZ32` 3, `RR64` 3.0 | false, types differ | true | false |
    | `ZZ32` 3, `NN32` 3 | false, types differ | false | not run |
    | two `ZZ` 3s built apart | false by the list, true by `value object BigNum` | true | no `ZZ` in the prelude |
    | `0.0`, `-0.0` | false, bits differ | false | true |
    | a NaN, itself | true, same bits | true | false |
    | two `(1,2)` | true, fields | true | false |
    | `(1,2)`, `(1,2.0)` | false, types differ | true | not run |
    | two flat strings of one text | false by `object FlatString`; strings not named | true | true |
    | two equal ropes | as the row above | false | not run |
    | two `Pt(1,2)`; a `Pt` with itself | false; true | false; true | false; true |
    | `VPlain(1,2)`, `VPlain(1,3)` | false, fields differ | true, row 113 | the `value` modifier has no effect |
    | two equal lambdas | may be false | false | not run |

13. **Where they differ.** Walk departs from the rule at numbers of different types and at tuples of them, and at row 113's value objects. The compiled path departs at floats (it uses `=`, not the bit pattern) and at tuples (it compares references). The rule itself is split on two kinds: strings, which it does not name and which the library declares as a reference object, and `ZZ`, which its list names as a reference object and the library declares `value`. Both paths compare flat strings by their text [13].

**References**

1. `FortressBuiltin.fss:37-52`; `Library/FortressLibrary.fss:4650-4651`; `Library/FortressLibrary.fsi:2645`.
2. `ObjectPrims.java:31-41`; `interpreter/evaluator/values/FObject.java:33-39`; `AnyPrim.java:23-32`; `FValue.java:85-88`.
3. `grep -ln 'public String getString()' interpreter/evaluator/values/*.java`, of which the `FObject` kinds are `FAsIf`, `FBigNum`, `FBool`, `FChar`, `FFloat`, `FFloatLiteral`, `FInt`, `FIntLiteral`, `FLong`, `FNN32`, `FNN64`, `FRR32` and `FString`; `grep -n 'getter asString' FortressBuiltin.fss` (`:55`, `:197`, `:209`, `:370`, `:379`, `:391`, `:478`, `:499`, `:566`, `:579`, `:612`); `Library/FlatString.fss:40`; the counter's lines 'GLUE3 ObjectPrims$ToString FOrdinaryObject …' (section 5, reference 3).
4. A scratch program `AcWalk.fss` with the objects named and lines 1 to 11 as quoted, under walk, `rc=0`.
5. Its lines; row 364 (`facts-extract.sh 'ledger:364'`); row 113 and row 114 (`'ledger:113' 'ledger:114'`); `interpreter/evaluator/values/FInt.java:53-61`, `FFloat.java:42-50`, `FNN32.java:55-63`, `FBigNum.java:60-65`, `FString.java:35-38`, `FTupleLike.java:71-81`, `FOrdinaryObject.java:46-57`, `FunctionClosure.java:131-140`; `Library/FortressLibrary.fss:96`.
6. `CompilerBuiltin.fss:287`, `:354-357`, `:358-386`; `nativeHelpers/stringOps.java:107-118`; `Library/CompilerLibrary.fss:19`, `:62-71`, `:293-295`; `nativeHelpers/equality.java:14-19`.
7. `AcComp.fss`: `object Pt`, `object Blank`, `object Box[\T\](v: T)`, `x: ZZ32 = 3`, `y: ZZ32 = 3`, `z: ZZ64 = 3`, `r: RR64 = 3.0`, `nan: RR64 = zero / zero`, `a: Any = x`, `b: Any = y`, `c: Any = r`; compiled 'compile rc=0', run 'run rc=0'; `.claude/skills/fortress-repo/SKILL.md`, "The compiled run time", on the dispatch method.
8. A scratch program `AcCompIlk.fss`; its compile.
9. `AcBind.fss`, its line 2.
10. `Specification/basic/objects.tex:424-445`; `Specification-1.0-frozen/basic/objects.tex:432`; `Specification/basic-lib/objects.tex:44-61`, `:81-94`.
11. `Specification/basic/objects.tex:15`, `:22-58`; `FortressBuiltin.fss:369`, `:565`, `:575`, `:611`; `Library/FlatString.fss:34`.
12. Points 4, 7, 10 and 11; `.claude/skills/fortress-repo/references/compiler.md`, "What the code generator does", on `value`.
13. Points 10 to 12.

## 3. The team's sources, and which way they point

Three principles settle a fork: the team's later word (P-26), the library as the team wrote it, and the peers, which weigh only where the team's texts conflict or are silent. A fork is settled where the principles that speak to it point the same way. This section reads the first two and the specification; section 4 reads the peers [1].

### 3.1 Walk and its library as the team wrote them

1. **The first `SEQV`.** On 2008-03-04 Jan-Willem Maessen bound `opr SEQUIV(a:Any, b:Any)` to `AnyPrim$SEquiv`: "Preliminary (unsatisfactory) implementation of SEQUIV … Still to do: correct handling of value objects and closures." Its body already compared an integer with a float by value, `x.getFloat()==y.getFloat()` [2].
2. **The team's test.** Two days later he added `tests/sequivTest.fss`, "a shakedown test for SEQV (whose spelling has been corrected to match the spec); still don't check field matching for value types, or environment matching for closures." It asserts that a `ZZ32` 45 is equivalent to an `RR64` 45.0 and to a `ZZ64` 45: six of its lines assert numbers of different types equivalent. `ant testSystem` runs every program in `tests/`, so the test is gated today [3].
3. **Each value class answers `SEQV`.** On 2008-03-12 Maessen wrote: "SEQV now handles value objects correctly, traversing their fields when the types match. Re-factored seqv into a method of FValue in order to make sure that future primitive objects remember to implement it correctly." So walk's run time answers `SEQV` in each value class, and the glue only calls it [4].
4. **`Object`'s getters.** On 2008-07-29 Maessen added the type `Object`, whose "only method (concrete, built-in magic by default) is toString()". On 2008-08-27 the committer `black`, whom the authorship notes take, unconfirmed, for Andrew P. Black, "Added various printing functions and ilkName, for use in debugging." Both getters are walk's own rendering of a value's type [5].

### 3.2 The team's later word: the type group's compiled path, 2009 and 2010

5. **A helper over Java `Object`, 2009.** On 2009-06-09 Eric Allen wrote the first compiled helper, `equality.SEQV(Object a, Object b)`, `return a.equals(b)`, with "TODO Change this to call .SEQV methods, once they become available". Its prelude line was written commented out [6].
6. **`SEQV` is the language's own, 2009.** On 2009-06-30 Sukyoung Ryu made the checker refuse a `SEQV` declared in a trait or object, 'The object equivalence operator, SEQV, should not be overridden.', with the comment "TODO: check there is no top-level operator definition for SEQV when we have a better magic" [7].
7. **The prelude's family, 2010.** On 2010-05-05 David Chase "Added definition of === for popular types": the family of section 2.3, point 6, under "(* This is incomplete *)", and `equality.sEquiv`, `return a == b`, with "Eventually need to deal with tuples, value types, etc.". Two days later he moved its widest member from `Object` to `Any` [8].
8. **`asString` in the prelude, 2011 and 2012.** At the team's last commit `Object`'s `asString` was `jAsString(self)`, over `stringOps.asString`, `a.toString()`, the compiled run time's own Java text of a value, with the comments "this can't be right! DRC" and "I think this is better CHF". `ilkName` stays commented out inside `asDebugString`. The revival replaced `jAsString` by `defaultAsString` on 2026-09-23 (`6bec1b004`), for P-91 [9].

### 3.3 The specification

9. The rule of section 2.4, point 10: `SEQV` is "automatically defined for all objects", and overriding it is a static error. The sentence came with the 1.0 text, imported on 2009-11-06, and stands in the Working Draft [10].
10. The trait `Any` declares `toString(): String`, whose "general contract … is that it returns a string that 'textually represents' this object". The library's name for it is `asString`; its `toString` is `self.asString`, "deprecated". The specification names no `ilkName` [11].

### 3.4 Which way they point

11. **Where `SEQV` lives.** The specification defines it for every value and forbids a program to override it. Walk's design answers it in each value class (point 3). Allen's TODO wants the same on the compiled path, ".SEQV methods" (point 5). Ryu's TODO wants no top-level definition at all, "when we have a better magic" (point 6). The library as the team wrote it declares `SEQV` once, at `Any`, on a native. Chase's family is code that its author called incomplete, which serves the implementation only (P-26). So both principles point to one declaration at `Any`, answered by each path's run time in each value class. That settles where the operation lives. It rules out a family of overloads in the library, and does not choose how a binding reaches each run time's operation [12].
12. **What `SEQV` means.** The Working Draft (2011) and Chase's family (2010) agree that values of different types are not equivalent and that numbers of one type compare by value. Walk's code and test of 2008 say otherwise, and are earlier. By P-26 the later word wins: a `ZZ32` 3 and an `RR64` 3.0 are not equivalent. The specification states the bit pattern for floats and fields for value objects, tuples among them. Chase's `=` for floats and references for tuples are in the code that he called incomplete, and `equality.java` names tuples as still to do. So the rule stands there too. Two kinds stay split: strings and `ZZ` (section 2.4, point 13). The team's texts do not settle them [13].
13. **`asString` and `ilkName`.** The team's word gives both to the run time: walk's `type().toString()`, and on the compiled path a value's Java `toString`. P-91 fixed the text: an object with no `asString` of its own prints its bare type name, walk's spelling, on both paths. That is the text that `ilkName` gives (section 2.2, line 3). The team's texts do not say whether `asString` is a native or Fortress over `ilkName`. So the peers weigh there [14].

**References**

1. `.claude/skills/coordinator/SKILL.md:95`; P-26 (`facts-extract.sh 'P-26'`).
2. `git show -s d56a402b4` (2008-03-04, `jmaessen`); `git show d56a402b4`, its `AnyPrim.java` lines `if (x instanceof HasIntValue) { if (y instanceof FFloatLiteral || y instanceof FFloat) { return x.getFloat()==y.getFloat(); }`; `research/authorship.md:45` for `jmaessen`.
3. `git log --follow -- ProjectFortress/tests/sequivTest.fss`, its oldest entry `21946c933` (2008-03-06, `jmaessen`); `ProjectFortress/tests/sequivTest.fss:49-51`, `:59`, `:66`, `:113`; `.claude/skills/fortress-repo/references/tests-running.md:21`.
4. `git show -s cd41f90eb` (2008-03-12, `jmaessen`).
5. `git show -s 2e3e67f18` (2008-07-29, `jmaessen`); `git show -s 855a4699d` (2008-08-27, `black`); `research/authorship.md:59`.
6. `git show e7f37cb55` (2009-06-09, `EricAllen`), its new `nativeHelpers/equality.java` and its `Library/CompilerLibrary.fss` lines `(*) import java com.sun.fortress.nativeHelpers.equality.SEQV => jSEQV` and `(*) opr SEQV(a:Any, b:Any) = jSEQV(a,b)`.
7. `git show -s 2621dad2e` (2009-06-30, `sukyoungryu`); `parser_util/SyntaxChecker.java:253-256`.
8. `git show 64e5f04db -- Library/CompilerLibrary.fss` (2010-05-05, `dr2chase`); `git log -S'Eventually need to deal with tuples'`, its oldest entry `64e5f04db`; `git show c643b2f3b -- Library/CompilerLibrary.fss` (2010-05-07), `opr ===(a:Object, b:Object)` to `opr ===(a:Any, b:Any)`; `nativeHelpers/equality.java:15-18`.
9. `git show a874948ac:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, its `:270` and `:332-338`; `nativeHelpers/stringOps.java:76-79`; `git log -S'defaultAsString' -- ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java`; P-91; F-123.
10. `Specification/basic/objects.tex:424-445`; `git log -S'have different dynamic types'`, its oldest entry `0f49d8698` (2009-11-06, `sukyoungryu`, "[spec] Added the entire spec files."); `Specification-1.0-frozen/basic/objects.tex:432`.
11. `Specification/basic-lib/objects.tex:51`, `:125-130`; `FortressBuiltin.fss:51`.
12. Points 3, 5, 6, 9; P-26, "Code that its author called a stub, and code that works around a limit of the JVM or of the checker, serve only the implementation".
13. Points 1 to 3, 7, 9; section 2.4.
14. Points 4, 8; P-91; section 2.2, point 4.

## 4. The peers, as context

1. **Java.** Identity is a JVM instruction: `Objects.equals` begins `aload_0`, `aload_1`, `if_acmpeq`. `getClass()` and `hashCode()` are `native`. `Object.toString()` is bytecode over them: `getClass`, `Class.getName`, `"@"`, `hashCode`. So the default text is library code over two operations of the run time [1].
2. **Scala.** `eq` is identity. `==` at `Any` calls `BoxesRunTime.equals2`, which compares numbers across types. A Scala program printed `1 == : 3,3.0 true; 3,3L true; BigInt apart true` and `2 eq : R apart false; R same true; case class == true; case class eq false`. So Scala's `==` is walk's `SEQV`, and its `eq` is the specification's rule for references [2].
3. **Swift.** `===` takes only class references and compares their `ObjectIdentifier`, or `Builtin.bridgeToRawPointer` in the embedded build: "This operator tests whether two instances have the same identity, not the same value." A value type has no `===`. The default text, `String(describing:)`, is the standard library's `_print_unlocked`, which falls back to reflection and writes `_typeName(mirror.subjectType)` for a class: library code over the run time's type name, as P-91's rule is [3].
4. **Julia.** `===` is in `Core`, the built-ins: "Determine whether x and y are identical, in the sense that no program could distinguish them." The types are compared first; mutable objects by address, immutable objects such as numbers by their contents at the bit level. This is the specification's rule for `SEQV`. `typeof` is in `Core` too [4].
5. **Together.** In all four, a value's identity and type are the run time's own operations. The default text is library code over the type's name in Java and Swift. Equivalence by contents, for immutable values, is built in where a language has it, Julia [5].

**References**

1. `javap -c java.util.Objects`, `equals(java.lang.Object, java.lang.Object)`: `aload_0`, `aload_1`, `if_acmpeq`; `javap -p -v java.lang.Object`: `public final native java.lang.Class<?> getClass();`, `public native int hashCode();`; `javap -c java.lang.Object`, `toString()`: `invokevirtual … getClass`, `invokevirtual … java/lang/Class.getName`, `ldc … String @`, `invokevirtual … hashCode` (OpenJDK 25); `hard-set-natives-2026-11-06.md`, section 4, point 5, for `IntrinsicCandidate`.
2. `javap -c -cp ProjectFortress/third_party/scala/scala-library-2.13.18.jar scala.runtime.BoxesRunTime`, `equals2`: `instanceof … java/lang/Number`, `invokestatic … equalsNumObject`; a scratch program `Peer.scala` with `val i: Any = 3; val d: Any = 3.0; val l: Any = 3L`, `BigInt(3)` twice, `class R(val x: Int)` and `case class P(x: Int)`, compiled with the tree's Scala 2.13.18 (`scala.tools.nsc.Main`) and run; its lines 1 and 2.
3. `stdlib/public/core/Equatable.swift`, `public func === (lhs: AnyObject?, rhs: AnyObject?) -> Bool`, and `stdlib/public/core/OutputStream.swift`, `_print_unlocked` and `_adHocPrint_unlocked`, read at `raw.githubusercontent.com/swiftlang/swift/main` on 2026-11-06; not run here.
4. `docs.julialang.org/en/v1/base/base/`, the docstrings of `Core.:(===)` and `Core.typeof`, read on 2026-11-06; not run here.
5. Points 1 to 4.

## 5. The model program's exposure

1. **The model's own lines.** `grep -n 'SEQV\|===\|ilkName\|asDebugString\|asExprString\|\.asString'` over the model's files in `explorations/run-c4/src/` and `explorations/apl/mg/` prints nothing [1].
2. **The library's routes.** A call reaches `SEQV` through `=` at `Any` (`FortressLibrary.fss:96`), `Equality`'s `=` (`:101`), `Region`'s (`:77`), `AnyMaybe`'s (`:1615`), `=/=` through `=` (`:98`), and the identity tests of `Avl`, `Map` and `Set` (`Library/Avl.fss:177`, `Library/Map.fss:448`, `Library/Set.fss:353-367`). A call reaches `Object`'s `asString` through `||` with an object (`:4488`) and `println` at `Any` (`:4549`), for a value whose type declares no `asString` [2].
3. **Measured: none.** A counter, copies of `ObjectPrims.java` and `AnyPrim.java` that count each call by the arguments' run-time classes and print the counts at exit, ran both quick checks under walk, each from its own folder with an empty private cache. Both passed, 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS', 'EXIT=0', and printed no count: neither program called any of the three. On the program of section 2.2 the same counter printed 42 keys, as 'GLUE3 AnyPrim$SEquiv FInt/FFloatLiteral Int/FloatLiteral 1' and 'GLUE3 ObjectPrims$ToString FOrdinaryObject Pt 3', so it was in effect [3].
4. **Why.** The model's `=/=`, on six lines, compare `Char` and `ZZ32` values, whose own `=` answers before `=` at `Any`. It prints numbers and strings, whose types declare `asString` [4].
5. **The compiled path.** The model does not run compiled yet. After the switch-over the compiled path reads the same library, so by reading the model reaches none of the three there either [5].
6. **Lines, values and speed.** No option of section 6 changes a model line. None changes a value that the model computes. Nothing here is timed [6].

**References**

1. The command quoted, over `explorations/run-c4/src/*.fs?` and `explorations/apl/mg/*.fs?`.
2. The lines cited.
3. The counter's two classes differ from the tree's by a call `GlueCount3.note(…)` in `SEquiv.applyToArgs`, `ToString.f` and `ClassName.f`, and a class `GlueCount3` that prints 'GLUE3 <key> <count>' from a shutdown hook, loaded at its first call; compiled with `javac -nowarn -cp "$(bin/fortress_classpath | tail -1)"`; run as `java -Xmx4g -Xss64m -Dfile.encoding=UTF-8 -Dfortress.caches=<empty private folder> -cp "<counter classes>:<class path>" com.sun.fortress.Shell MicroGptFlatQuick.fss` from `explorations/run-c4/src/`, and the same for `MicroGptAplQuick.fss` from `explorations/apl/mg/`, both at once, `FORTRESS_THREADS=1`; `grep -c GLUE3` on each output prints 0; the control on `AcWalk.fss` printed 'GLUE3 total-keys 42', `rc=0`.
4. `explorations/run-c4/src/FlatData.fss:22`, `:53`, `:99`; `explorations/apl/mg/FlatData2.fss:25`, `:56`, `:102`.
5. `.claude/skills/fortress-repo/references/interpreter.md`, "The model program"; `SKILL.md`, "The phases".
6. Section 6.

## 6. The options

Each option says how the three leave glue and what it does to `SEQV`'s meaning. Options (a) to (d) are the four ways that this review was asked to weigh; (e) cuts the number of natives, and combines with (a), (b) or (c).

### (a) A Java `Object` carrier in walk's loader, and one helper that reads both representations

1. **What it is.** Walk's loader carries `Any` and `Object` in a Java `Object` and passes walk's value itself. One helper per operation takes `Object` parameters and asks which representation it holds: a `fortress.AnyType.Any` takes the compiled operation, an `FValue` walk's. The three bindings name these helpers, bare [1].
2. **Measured, prototype A.** Walk's half is four lines in a copy of the loader: `javaFor` reads `Any` and `Object`; `typeName` reads `Any`, which the tree holds as an `AnyType` node, not a `NamedType`; `carried` admits `Object`; `unbox` passes the value. The helper class is 22 lines. A program bound to it ran under walk: `1 ilkName, asString: Pt Pt Box[\ZZ32\] Int`, `2 SEQV: p,p true; p,q false; 3,3 true; 3,3.0 true; tuples true`. With the three library bindings moved onto it, in copies of the two library files, the program of section 2.2 printed what the plain build prints, line for line; a control on the plain build stopped at the copy's binding, 'Native helper class com.sun.fortress.nativeHelpers.anyProbe not found.' [2]
3. **The compiled half needs one more change.** `NamingCzar` reads a Java `Object` as `Any`, but the wrapper generator converts each foreign parameter through a table that has no entry for `Any`. The first compile stopped: 'Can't generate header for method sEquiv with jvm desc =Ljava/lang/Object; stripped = AnyType$Any'. With two lines in a copy of `FortressMethodAdapter.java` that pass an `Object` parameter unconverted, it compiled and ran: `1 ilkName, asString:  Pt   Pt   Box[\ZZ32\]   ZZ32`, `2 SEQV: p,p  true ; p,q  false ; 3,3  false ; 3,3.0  false ; tuples  false`. This corrects the hard-set review's reading that "no design reads both": one does, with that converter [3].
4. **Its limits.** The helper class can hold no method over `FValue`, a private one included: the wrapper generator reads every method of the class, and a compile stopped, 'No Fortress type (yet) for foreign Java type descriptor 'Lcom/sun/fortress/interpreter/evaluator/values/FValue;''. F-321 says the same for the checker. So walk's reading sits inline in each public method, or in another class. No class under `nativeHelpers/` depends on walk's classes today, 0 of 26; this one would. And the one string runs two bodies: walk's answers stayed walk's and the compiled ones compiled (point 3), so the meaning stays split until both bodies are changed [4].
5. **Files and lines.** Walk: `interpreter/glue/StaticNativeApp.java:51-62`, `:74-78`, `:90-93`, `:276-286`. Compiled: `compiler/nativeInterface/FortressMethodAdapter.java:250-270`. Both: a new helper class under `nativeHelpers/`; the library's `FortressBuiltin.fss:38-41` and `FortressLibrary.fss:4650-4651`. **Tests**: a walk test of the three through the library, asserting the values of section 2.2; a compiled test whose own declarations bind the helpers at `Any` and at a trait's `self`, as `compiler_tests/NativeHelperBindingCompiled.fss` does; the refusal tests `tests/NativeHelperUncarried*Walk` bind over `AnyIntegral` and program types, not `Any`, so none changes. **Size**: one rung, and the meaning's rung (section 7, point 9). **The model**: none of its calls [5].
6. **P-58.** Kept as written: each binding is bare, names a helper, and walk loads that helper [6].

### (b) One helper over a neutral view, reached through each path's adapter

7. **What it is.** The helper takes a small Java interface, a view of a value: its type's name, whether it is a reference, a value object or a function, its parts, and its identity. Each path supplies an adapter that presents its representation as the view: walk's loader carries `Any` in walk's adapter, and the compiled wrapper wraps a `fortress.AnyType.Any` in the compiled one. The binding names one string, and the rule of `SEQV` is written once, in the helper, over the view [7].
8. **Files and lines.** Walk: the loader lines of (a), with the adapter in `interpreter/glue/`. Compiled: an entry in `NamingCzar`'s two foreign-type tables that reads the interface as `Any` (`compiler/NamingCzar.java:333-336`, `:476-491`), a converter in `FortressMethodAdapter.java:136-155`, and the adapter in `runtimeSystem/` or `compiler/runtimeValues/`. Both: the interface and the helper under `nativeHelpers/`. **Tests**: those of (a), and tests of the rule through each adapter. **Size**: two rungs, the views and then the bindings; the meaning is written in the second. **The model**: none of its calls. Not prototyped; its two changes to the paths are the two measured in (a) [8].
9. **P-58.** Kept as written [9].

### (c) The operations answered by each path's run time, under one binding

10. **What it is.** The library keeps each declaration with a bare body that names the compiled path's existing helper: `ilkName` on `stringOps.typeName`, `asString` on `stringOps.defaultAsString`, `SEQV` on `equality.sEquiv`. The compiled path calls the helper, as it does today. Walk's loader holds a table of these names and answers each with walk's own operation, the glue classes of today, which call `FValue.seqv` and `type()`. This is how a JVM treats an intrinsic: the method has a Java body, and the virtual machine runs its own code for it [10].
11. **Measured, prototype C.** Walk's half is eight lines in a copy of `NativeApp.java`: a map of three names and a look-up before the loader reads the string. With the three library bindings naming the helpers, in copies of the two library files, the program of section 2.2 printed what the plain build prints, line for line; a control on the plain build stopped at the copy's binding, 'Native helper com.sun.fortress.nativeHelpers.equality.sEquiv: no Java type carries the declared type of parameter a.' The compiled half needs no change: the same strings compile and run today (section 1, point 12). No class of `nativeHelpers/` gains a dependency, and every method of `stringOps` and `equality` already maps to Fortress (F-321) [11].
12. **What P-58's form then means.** The library's text keeps P-58's form: each body is exactly `builtinPrimitive("…")` naming a static helper, and the checker checks it against the helper's Java signature (F-298). Walk's half departs: for these names walk's loader runs its own operation and does not load the named helper. The helper is the definition of the operation, and walk's operation must answer as it does. Today they do not (section 2.4), so this option needs the meaning first, with a test on both paths that holds them together [12].
13. **Its limits.** Two implementations stay, one in each run time, as the team built them. The compiled helper alone gives `false` for two equal numbers (section 2.3, point 9), so `equality.sEquiv` must answer the meaning for numbers, tuples and strings before the compiled path reads the one library [13].
14. **Files and lines.** Walk: `interpreter/glue/NativeApp.java:196-205`, a table, and the glue classes `ObjectPrims.java` and `AnyPrim.java`, kept as walk's operations. Compiled: none for the move; `nativeHelpers/equality.java:15-18` for the meaning. Both: the three strings. **Tests**: as for (a), and a walk test that each table name runs walk's operation. **Size**: one rung, and the meaning's rung. **The model**: none of its calls [14].
15. **The mirror form.** The bindings could keep their glue strings, with the compiled path mapping each glue name to its helper. That keeps a glue class's name in the library's text, against P-58's form, so it is weaker than (c) [15].

### (d) The three left on glue until walk runs the checker (P-12)

16. **What it is.** Nothing moves now [16].
17. **Where it ends.** P-12 puts walk's run of the checker after the switch-over, and the switch-over waits until every binding has one that the compiled path runs. So the three would hold the switch-over behind a step that comes after it. P-12 also gives walk the checker's static types and coercions, not the compiled representation: walk's values stay `FValue`, so no carrier comes with it [17].
18. **Files, tests, size, model**: none now. Row 113 and the two meanings stay [18].

### (e) Fewer natives, in the library

19. **(e1) `asString` over `ilkName`.** Write `Object`'s `getter asString(): String = self.ilkName` in Fortress. It is P-91's rule as text: an object with no `asString` of its own prints its type name. Under walk it gives the same text for every value that reaches it (section 2.1, point 3; section 2.2, line 3). On the compiled path it avoids row 321's recursion. A compiled program with two traits, each with a `toString` member beside its `asString`, printed `1 asString over typeName, with a toString member:  A1` and then ended in `java.lang.StackOverflowError` for the trait whose `asString` is `defaultAsString`. The one library's `Object` declares `getter toString(): String = self.asString`, so every object would meet that recursion through `defaultAsString`, as P-91 notes; over `ilkName` it does not. Java's and Swift's default texts are written so: library code over the type's name (section 4). It leaves two natives, `ilkName` and `SEQV`, for (a), (b) or (c) [19].
20. **(e2) `SEQV` as library overloads.** Write `SEQV` in the library as Chase's family: one declaration at each number type by its bits, at `Boolean`, `Char` and strings, at tuples of each arity element by element, as `String`'s `||` is written for tuples, and the native at `Any` for references and walk's value objects. The rule is then text that both paths read. But the team called the family incomplete, and Ryu's TODO wants no top-level definition at all (section 3.2). The native at `Any` still needs (a), (b) or (c). **Size**: one rung. **The model**: none of its calls; each `=` at `Any` dispatches among about a dozen declarations [20].
21. **Files and lines.** (e1): `FortressBuiltin.fss:40-41`, and a test on each path. (e2): `FortressLibrary.fss:4650-4651` and its api line `FortressLibrary.fsi:2645` [21].

**References**

1. `hard-set-natives-2026-11-06.md`, section 6 (c), point 21.
2. The prototype's copy of `StaticNativeApp.java` differs from the tree's by `if (t.equals("Any") || t.equals("Object")) return Object.class;` after `:60`, `if (t instanceof AnyType) return "Any";` after `:76`, `|| c == Object.class` at `:92`, and `if (c == Object.class) return v;` after `:283`; the helper `nativeHelpers.anyProbe`, with `sEquiv(Object, Object)`, `ilkName(Object)` and `asString(Object)`, each `if (a instanceof fortress.AnyType.Any)` the compiled helper, else walk's `AnyPrim.sequiv`, `type().toString()` or `toString()`; a scratch program `AcProtoA.fss` with `pIlk(x: Any): String`, `pStr` and `pSeqv(a: Any, b: Any): Boolean` bound to it, under walk with the copies first on the class path, `rc=0`; the copies of `FortressBuiltin.fss:38-41` and `FortressLibrary.fss:4650-4651` naming `anyProbe`, `AcWalk.fss` from their folder, `diff` against the plain build's output printing nothing, the control 'rc=1'.
3. `compiler/NamingCzar.java:487`; `compiler/nativeInterface/FortressMethodAdapter.java:136-155`, `:250-270`; the first compile with `-debug stacktrace`, at `FortressMethodAdapter.toImplFFFF(FortressMethodAdapter.java:267)`, 'compile rc=255'; the copy differs by `if (converter == null && !isResultType && jvmArgType.equals("Ljava/lang/Object;")) return new SignatureAndConverter(fortressArgType, emptyConverter.ONLY);` before `:266`; compile 'compile rc=0', `MORE_PATH=<copies> bin/fortress run AcProtoA` 'run rc=0', with a fresh copy of the caches; `hard-set-natives-2026-11-06.md`, section 6 (c), point 21.
4. A helper class `anyProbeBad` with `private static String walkName(FValue a)`; a scratch program `AcProtoBad.fss` binding its `ilkName`; its compile, 'compile rc=255'; `.claude/skills/fortress-repo/references/compiler.md`, "Natives", on the wrapper generator; F-321 (`FACTS.md:147`); `grep -ln 'interpreter\.' nativeHelpers/*.java` prints nothing, of 26 files.
5. The lines cited; `ls ProjectFortress/tests/NativeHelperUncarried*Walk.fss` and their `builtinPrimitive` lines; section 5.
6. P-58.
7. Section 2.1, point 2; section 2.4.
8. The lines cited; points 2 and 3.
9. P-58.
10. Section 1, point 12; `ObjectPrims.java:31-41`; `AnyPrim.java:23-32`; section 4, point 1.
11. The prototype's copy of `NativeApp.java` differs from the tree's by a `static final java.util.Map<String, String> INTRINSICS` of six lines after `:39`, mapping `com.sun.fortress.nativeHelpers.equality.sEquiv` to `…glue.prim.AnyPrim$SEquiv`, `…stringOps.typeName` to `…ObjectPrims$ClassName` and `…stringOps.defaultAsString` to `…ObjectPrims$ToString`, and two lines before `:200`, `String intrinsic = INTRINSICS.get(str); if (intrinsic != null) str = intrinsic;`; the copies of the two library files naming the three helpers; `AcWalk.fss` from their folder with the copy first on the class path, `rc=0`, `diff` against the plain build's output printing nothing; the control 'rc=1'; F-321; F-299, on `FlatString`'s bindings to `stringOps`.
12. P-58; F-298; F-299.
13. Section 2.3, point 9; section 2.4.
14. The lines cited.
15. P-58; F-32.
16. P-162.
17. P-12 (`facts-extract.sh 'P-12'`); `.claude/skills/fortress-repo/SKILL.md`, "The phases", the paragraph on the switch-over; `explorations/coordinator/PLAN.md:10`, "the natives first (P-33)".
18. Section 2.4.
19. `FortressBuiltin.fss:42-51`; P-91; F-123; row 321 (`facts-extract.sh 'ledger:321'`), its test `ProjectFortress/compiler_tests/XXXFortToStringRungS.test`; a scratch program `AcRow321.fss` with `trait ByName getter asString(): String = tName(self) getter toString(): String = self.asString end`, `trait ByDefault` the same over `dStr(self)`, `tName` and `dStr` bound bare to `stringOps.typeName` and `stringOps.defaultAsString`, `object A1 extends ByName`, `object A2 extends ByDefault`; compiled 'compile rc=0', run 'run rc=1', its first line and 'java.lang.StackOverflowError'.
20. `Library/CompilerLibrary.fss:62-71`; `Library/FortressLibrary.fss:4425-4433`, `String`'s `||` over tuples (row 369); section 3.2, points 6 and 7.
21. The lines cited.

## 7. How the options weigh against each other

1. **The team's sources.** They give `SEQV` to each path's run time, in each value class, under one declaration at `Any` (section 3.4, point 11). (a) and (c) keep that: each path's operation stays the one it has today, reached through a helper that tests the representation (a) or through the loader's table (c). The team never wrote a helper that reads walk's values; Allen's helper over `Object` of 2009 read only the compiled values. (b) moves the rule out of the value classes into one helper over a view. (e2) is the shape that its author called incomplete. So the principles rule out (e2) and (d), weigh against (b), and do not choose between (a) and (c); P-58 and the paths' code do (points 2 and 4). For `asString`, the team's texts are silent, P-91 fixes the text, and the peers write the default text over the type's name, which is (e1) [1].
2. **P-58.** (a) and (b) keep it as written. (c) keeps the library's form and departs in walk's loader, which answers named helpers with its own code. (e1) removes one binding. (d) keeps glue strings, against the form, and has no end [2].
3. **One meaning on both paths.** No way of moving the bindings makes the meaning one by itself. Prototype A kept walk's answers on walk and the compiled answers compiled; prototype C did the same. (b) writes the rule once, in Java; (e2) writes most of it once, in Fortress; (a) and (c) keep two implementations, held together by tests on both paths [3].
4. **The paths' code.** (a) gives `nativeHelpers/` its first dependency on walk's classes, and the compiled wrapper a converter for `Object`. (b) adds an interface to `NamingCzar`'s tables and the wrapper's converters. (c) adds a table of names to walk's loader and nothing to the compiled path [4].
5. **Size.** (a): one rung, about 4 loader lines, 2 wrapper lines and a 22-line helper, measured. (b): two rungs. (c): one rung, about 8 loader lines, measured. (d): none now, and it holds the switch-over. (e1): one library line and a test on each path. (e2): one rung, and still one native. Each way also needs the meaning's rung [5].
6. **Safety.** (e1) removes row 321's recursion from the one library's `Object` on the compiled path, by the probe. Row 113, walk's value objects, stays under every way until the meaning's rung repairs it. The meaning's rung changes six lines of the team's `sequivTest.fss`, a test that the team wrote [6].
7. **The model.** It reaches none of the three on walk, measured, and none on the compiled path by reading. No way changes a model line or value [7].
8. **Undoing.** Each way is undone in one commit; (e1) is one line [8].
9. **What none of them settles: the meaning.** A decision not taken, with its parts:
    - values of different types, a `ZZ32` 3 and an `RR64` 3.0, or tuples of them: not equivalent, by the Working Draft and the type group's family (section 3.4, point 12), or equivalent, as walk and the team's test of 2008 say;
    - floats by their bits, as the specification and walk say, or by `=`, as the incomplete family says;
    - two equal tuples: element by element, as the specification and walk say, or by reference, as the compiled path does today;
    - strings: by their text, as both paths do, or by reference, as the specification's definition reads with the library's `object FlatString`;
    - `ZZ`: by value, as the library's `value object BigNum` and walk say, or by reference, as the specification's list says;
    - value objects: by every field, the repair of row 113 [9].

**References**

1. Section 3.4; section 4; section 6, points 1, 7, 10, 19 and 20.
2. P-58; section 6, points 6, 9, 12, 17 and 19.
3. Section 6, points 3, 4, 7, 11 and 20.
4. Section 6, points 4, 8 and 11.
5. Section 6, points 2, 3, 5, 8, 11, 14, 18, 19 and 20.
6. Section 6, point 19; row 113; section 3.1, point 2.
7. Section 5.
8. Section 6.
9. Section 2.4; section 3.4, point 12.

## 8. Recommendation

Take (e1) with (c): write `Object`'s `asString` in the library as `self.ilkName`, P-91's rule as text, which leaves two natives and keeps the one library's `Object` clear of row 321's recursion on the compiled path; bind `ilkName` and `SEQV` bare to the compiled path's existing helpers `stringOps.typeName` and `equality.sEquiv`, and let walk's loader answer those two names with walk's own operations, as the specification makes `SEQV` the language's own, as walk and the type group each answer it in their run time, and as Java, Swift and Julia answer identity and a value's type; this move keeps every value of walk, as prototype C showed, changes nothing on the compiled path, which runs those helpers today, and needs no carrier of `Any` at all. It takes two decisions not taken: whether P-58's walk half admits a loader that answers a named helper with its own operation, and, before the compiled path reads the one library, what `SEQV` means, where the review proposes the specification's rule (values of different types never equivalent, floats by their bits, tuples element by element, references by identity), which the Working Draft states, whose first part the type group's family shares, and from which walk's earlier code of 2008 departs, with strings and `ZZ` for the curator, and with `equality.sEquiv` and walk's value classes each brought to that meaning under one test on both paths, six lines of the team's `sequivTest.fss` changing with it. If the curator keeps P-58's walk half as written, take (a) instead, measured in prototype A at about 28 lines with the wrapper's converter for `Object`.
