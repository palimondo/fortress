<!-- A probe of way D of the review `explorations/reviews/carriers-ways-2026-11-13.md`, run 2026-11-13 by a Fable worker: in a scratch worktree, `/home/user/fortress-merge`, seeded from the base build `/home/user/fortress-base32` (`832f7d0d91`), each of the five number traits `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` of the interpreter's library is merged with its one native object (`Int`, `Long`, `BigNum`, `UnsignedLong`, `Float`), and this note gives what ran under walk, the compiled checker's count and the distance after the merge, what had to change by file, every obstacle in the order met, what a Fortress programmer sees differently, and an estimate in rungs; nothing here lands, and the scratch tree's whole diff is `number-object-merge.patch` beside this report. -->

# The five number traits merged with their objects: a probe of way D

## Result

The merge works for all five types, in one session. After it:

| Measure | Landed tree (F-53) | Merged tree |
|---|---|---|
| Checker count (`FortressLibrary` and its apis) | 0 | 0, no crash |
| Distance to the switch-over (fourteen components) | 0 | 0, no crash |
| microGPT quick check, flat and APL | pass | 7 of 7 and 7 of 7 |
| Walk's suite, `ant testSystem`, 830 tests | pass | 829 pass; the 830th is an `XXX` test that now passes (row 550) |

The names `Int`, `Long`, `BigNum`, `UnsignedLong` and `Float` are gone from the library. The diff is 12 files, 258 lines added and 308 deleted. No model line changed.

The merge has a cost that the review did not name: it widens three existing gaps, which today touch only `NN32`, `RR32`, `Boolean` and `Char`, to the five types that every program uses ("Obstacles", 5 to 7). One of them is a refusal that walk's load check loses.

The review's claim that the bodies of `trait RR64` through `asFloat(self)` can never run is false in one construct, `asif RR64` ("The bodies of `trait RR64`").

## What was built

The scratch tree is `/home/user/fortress-merge`, detached at `832f7d0d91`, seeded with `seed-worktree.sh`. Its diff is `number-object-merge.patch`.

**Decision: the five objects stay in `FortressLibrary`, and walk learns that these five have native values.** The review gives two places: move them into `FortressBuiltin`, or teach walk one more place. I took the second. The bodies of the five call six private functions of `FortressLibrary` (`shiftCount32`, `shiftCount64`, `powerCount32` with `highExponent32` and `lowExponent32`, `numeralRR64`; `Library/FortressLibrary.fss:662`, `:729-773`), which nothing else calls. A move takes them along, about 620 lines of objects and 50 of helpers, and moves the five types from the api `FortressLibrary` to the api `FortressBuiltin`. Staying put changes 126 lines net of library text. No decision of the curator covers the place. The cost of staying is a table of five names in walk's Java.

By file, against `832f7d0d91` (`git diff 832f7d0d91 --numstat`):

| File | Added | Deleted | What |
|---|---|---|---|
| `Library/FortressLibrary.fss` | 171 | 88 | five `trait X ... excludes ... comprises { O }` become `value object X`; each takes its object's members; in `RR64`, 56 bodies through `asFloat(self)` and 5 other overridden members go |
| `Library/FortressLibrary.fsi` | 5 | 15 | the same five headers |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` | 1 | 186 | the five objects deleted; `RR32`'s `opr ^(self, b:Float)` names `RR64` |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` | 1 | 15 | the same |
| `interpreter/evaluator/BuildEnvironments.java` | 22 | 1 | the five objects of `FortressLibrary` get a native constructor, registered when it is made |
| `interpreter/evaluator/BuildNativeEnvironment.java` | 7 | 1 | `nativeConstructorOfClass`, split from `nativeConstructor` |
| `interpreter/evaluator/types/FTraitOrObject.java` | 1 | 0 | a type parameter bounded by a value type is not refused (obstacle 5) |
| `interpreter/glue/prim/ZZ64.java`, `NN64.java`, `ZZ.java`, `RR64.java` | 48 | 0 | four constructor classes of 12 lines, each a subclass of the old one; `glue/prim/ZZ32.java` already existed |
| `tests/NativeHelperFloatCarriedWalk.fss` | 2 | 2 | its two bindings declared `Float` name `RR64` |

The library's text is 178 lines added and 304 deleted. Walk's Java is 78 added and 2 deleted. No Scala, no code generator, no checker file changed.

Not done in the scratch tree, and part of a proper change:

- The five old constructor classes, `glue/prim/Int.java`, `Long.java`, `Float.java`, `BigNum.java` and `UnsignedLong.java` (2,041 lines), are kept, and the new four extend them. No `builtinPrimitive` string of the library names a number glue class any more (a grep of `glue\.prim\.` in the library finds only `Reflect*` and `StringPrim`), so their nested native classes are dead today already. Only the constructor of each, about 15 lines, is live. A proper change renames the five and can delete the rest.
- What becomes needless in walk and stays in the scratch tree: the five number entries of `LanguageTypes.OBJECTS` and `numberTraitName` (`interpreter/evaluator/types/LanguageTypes.java:33-37`, `:52-55`), with its one caller in `glue/prim/ObjectPrims.java:55` (F-328's ilk names); the four lines for `Int`, `Long`, `UnsignedLong`, `Float` and `BigNum` in `StaticNativeApp.javaForSelf` (`interpreter/glue/StaticNativeApp.java:117-120`) and `"Float"` in `javaFor` (`:64`); and, in the compiler, the `UnsignedLong` clause of `BuiltinPrimitiveRewriter.java:189-190`. The reading at the trait of F-344 (`LanguageTypes.traitOf`, three reads in `EvaluatorBase`) stays for the four string objects.
- Comments and assertion messages that name the objects, in 12 walk tests and 5 compiled tests, and `Library/ReflectiveQuickCheck.fss:234-237`, whose comment explains a workaround for `Float` against `RR64`.

## Measurements

Each command starts with the setup lines of `references/build-and-caches.md`, in the scratch tree.

**Walk, my own programs.** Small programs of mine, run on the merged tree with `bin/fortress P.fss` and on the old code with `old-fortress.sh /home/user/fortress-base32 <caches> P.fss`. One of them prints, on both, line for line the same:

    ZZ32 RR64 ZZ64 ZZ NN64 ZZ64 QQ            (typecase arms ZZ32, ZZ64, NN32, NN64, ZZ, RR64, RR32, QQ)
    ZZ32 RR64 ZZ64 ZZ NN64                    (ilkName of a value of each)
    Cell[\ZZ32\] Cell[\RR64\]                 (ilkName of Cell(3), Cell(1.5))
    18.5                                      ((b asif RR64) + 17)
    ArrayList[\ZZ32\]                         (<|1, 2, 3|>.ilkName)
    5050                                      (SUM[i <- 1#100] i)

**microGPT.** `explorations/coordinator/tools/mg-run.sh tmp/mg2 merge2`, after the last edit of Java:

    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS      (MicroGptFlatQuick, rc=0)
    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS      (MicroGptAplQuick, rc=0)

**Walk's suite.** `ant testSystem`, twice. The first run, on the merge alone, has three failures of 830: `NativeHelperFloatCarriedWalk` ('Float is undefined.'), `TraitGenericMethodInference` (obstacle 5) and `XXXGenericBesidePlainReturnParam` (obstacle 6). The second run, after the one-line fix of obstacle 5 and the test's two lines:

    Tests run: 207, Failures: 0   Tests run: 211, Failures: 0   Tests run: 202, Failures: 0
    Tests run: 210, Failures: 1   (XXXGenericBesidePlainReturnParam: "Expected failure or exception, saw none")

I did not run `ant testFast`, the demos or the full microGPT pair. The compiled tests compile against the compiler's prelude, which the merge does not touch.

**The checker count.** `explorations/coordinator/tools/checker-count/run.sh tmp/count1.txt tmp/count1`:

    FortressBuiltin	0
    FortressLibrary	0
    #total	0
    #locations	0
    #crash	none

**The distance.** `explorations/coordinator/tools/distance/run.sh tmp/dist1.txt tmp/dist1`:

    #total	0
    #kind	exclusion	0 ... #kind	export	0        (all nine kinds 0)
    #crash	none
    #shadow	every shadow edit matched the tracked sources

The count stage now checks the 62 bindings that were `Float`'s and the 12 of the other four objects, since they are in the `FortressLibrary` component (`references/compiler.md`, "Natives": the count stage checks only that component's bindings). Both stages ran before the one-line walk fix, which no checker code reads.

## The bodies of `trait RR64` that go through `asFloat(self)`

`trait RR64` has 57 lines with `asFloat(self)` (`Library/FortressLibrary.fss:383-505` at `832f7d0d91`): the abstract declaration and 56 bodies.

**Before the merge.** I gave each of the 56 bodies a first statement that calls `fail` with the body's line, and ran walk's suite.

    [junit] FAIL: RR64-TRAIT-BODY line 436          (opr +(self,b:RR64):RR64 = asFloat(self) + asFloat(b))
    Tests run: 202, Failures: 1                     (the other three shards: 0 failures)

The one test is `ProjectFortress/tests/asifTest.fss:102`, `z = (3.0 asif RR64) + 17`. A type assumption at the trait sends the call to the trait's declaration, so the body runs. So the claim "by the dispatch rule these bodies never run" holds for every call without `asif`: 829 tests and a program of mine over each operator and function of `RR64`, with operands of `RR64`, `ZZ32`, `RR32` and numerals, reached none. With `asif RR64` any of the 56 can run. Each computes what the object's own body computes, since it calls that body on `asFloat(self)`, which is `self`. A second way is outside the rules: a program's own object that extends `RR64` loads under walk, since walk does not check the library's `comprises` clause (row 551).

**After the merge.** None of the 56 survives. `x asif RR64` is the value's own type, so nothing else can be asked for. Eleven other bodies of the trait survive, because the object had no body at their parameter types: the four `coerce`, `zero`, `one`, `isNumber`, `isFinite`, `check`, `check_star`, `=` at `ZZ32` and at `RR32`, `CMP`, `MINNUM` and `MAXNUM`. Five more of the trait's go as overridden: `isNaN` and `isInfinite` (both `false`), `signBit`, `round`, and `Float`'s `^` at `Float`, which repeats its `^` at `RR64`.

## Obstacles, in the order met

1. **An object's getters come before its methods.** The parser refuses the merged `ZZ32`: 'Field/getter/setter declarations should come before method declarations.' The trait's abstract `asFloat(self)` stands among the methods, and the object's `asString` and `asExprString` are getters. Rule: the syntax of an object's body. Passed by putting the object's getters at the trait's first getter.
2. **Walk gives native values only to an object of a native component.** `BuildNativeEnvironment` builds every object of a `native component` from the class `<package>.<name>`, and `CUWrapper.java:122` chooses it by the component (`interpreter/evaluator/BuildNativeEnvironment.java:42-57`). `FortressLibrary` is not native, and its other objects are plain. Passed by a table of the five names in `BuildEnvironments.forObjectDecl1`, read only in the component `FortressLibrary`.
3. **A native object's values need its constructor before its singleton is first read.** The first run stopped in `FNativeObject.type`: 'the return value of getConstructor() is null'. `FInt.con` is set when the singleton `Int` is forced, and `FortressBuiltin` was populated before the library's top-level variables ran. In `FortressLibrary` a top-level variable makes a `ZZ32` before the object `ZZ32` is forced. Passed by applying the constructor once when it is made.
4. **The static numerals' `coerce` on the merged type: no obstacle.** `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])` stands in a `value object` as it does in `NN32`. Walk binds `a: ZZ32 = 7`, `c: ZZ64 = 7`, `d: ZZ = 7`, `e: NN64 = 7`, `b: RR64 = 1.5`, and the checker reports nothing.
5. **A type parameter bounded by a value type, through a trait's generic method, is refused by walk.** `tests/TraitGenericMethodInference.fss:62`, `Holder[\ZZ64\]().held()` with `held[\T extends S\]()` in `Holds[\S\]`, stops: 'T@...: non-value subtype of value type ZZ64'. Walk makes `T` a symbolic trait type that extends its bound, and `FTraitOrObject.enforceValueness` (`interpreter/evaluator/types/FTraitOrObject.java:97-104`) refuses a type that is not a value type below one that is. The old code does the same today at `RR32` and `NN32`: `Holder[\RR32\]().held()` stops with the same message. The traits were not value types; the objects were. A function's own `T extends ZZ32` and an object's `T extends RR64` run on both trees. Passed by one line that skips the check for a symbolic type. Drafted row 1.
6. **Walk's load check reads a type parameter beside an object type as excluding, so it loses a refusal.** On the old code, `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): String` is refused at load, 'fails the Return Type Rule', as the rule asks. On the merged tree it loads and prints `plain`. The team's parameter-by-parameter check calls two lists excluding where they differ at an object type (row 697's line, `OverloadedFunction.java:511`), and the reading on declared domains runs only for a pair that this check refuses (`validOnDeclaredDomains`, `OverloadedFunction.java:772`, and the comment above it). On the old code the same invalid pair at `NN32` loads today. The same cause makes row 550's valid pair load, so `XXXGenericBesidePlainReturnParam` passes for the wrong reason. Drafted row 2.
7. **The compiled checker's row 542 reaches the five types.** The checker refuses a generic declaration beside a plain one whose domain is an object type, a valid pair (row 542, `XXXOverloadReturnObjectDomain`). With `ZZ64` an object, row 550's pair `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64` is such a pair. By reading the row; I did not run the checker on a program against the merged library. The library holds no such pair, since both measures are 0.
8. **A `typecase` arm that names a removed object matches every value, with no message.** `typecase x of Int => ...` takes the arm for the string `"s"` on the merged tree, and the `else` arm on the old code. Row 959 holds the cause: an arm that names no declared type matches all, on both paths. One test is hit: `tests/NumberPrintTest.fss:31`, `BigNum => println "BigNum"`, the first arm of its `yelp`, now prints `BigNum` for a `ZZ64`. The test asserts nothing there and passes. Any other use of a removed name stops at load: 'Float is undefined.'
9. **The excluded types, a bound, an `extends` and a `comprises` clause: no obstacle.** The five `excludes` clauses go, since an object excludes each type that it does not extend, and the checker's overloading check over fourteen components reports nothing. `AnyIntegral comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` now lists five objects. Nothing in the library, the tests or the model extends one of the five. A program's `object Mine extends ZZ32` loads on the old code (row 551) and is refused on the merged tree: 'Attempt to extend object type ZZ32'.
10. **`round` of an `RR64` has two declared types.** The trait declares `round(self): ZZ` and `Float` declares `round(self): ZZ64` over a helper that answers `long` (`FortressBuiltin.fss:204` at `832f7d0d91`); the api declares no `round` for `RR64`. `Float`'s runs today, and `round(b)` is a `ZZ64` on both trees. The merge must keep one. Decision below. Drafted row 3.

## What a Fortress programmer sees differently

- **A printed type.** Nothing changes for a value: `ilkName`, `Cell(3)`, a list's type and a tuple's type print `ZZ32` and `RR64` on both trees, since walk already prints the object by its trait (F-344, F-328).
- **A message.** Three differences. The list of overloads in 'Failed to find any matching overload' for `7 + "s"` has 21 entries, not 22: the old one has two that read `(RR64,RR64)->RR64`, and the trait's shows the object's name, `+(self:(FortressLibrary.RR64 & {FortressBuiltin.Float}),b:FortressLibrary.RR64)`. That line is the one place where I saw `Float` in a message today; it goes. The positions in such a list name `FortressLibrary.fss`, not `FortressBuiltin.fss`. And `object Mine extends ZZ32` gets a message where it had none. 'Cannot find definition for method foo given receiver 7: ZZ32', 'RHS expression type RR64 is not assignable to LHS type String' and 'got arg "a" of type String' are the same.
- **A `typecase`.** An arm `ZZ32`, `ZZ64`, `ZZ`, `NN64` or `RR64` matches as before. An arm `Int`, `Long`, `BigNum`, `UnsignedLong` or `Float` matched the type's values and now matches every value, silently (obstacle 8). As a parameter's type, a bound or a variable's type, the five names are undefined.
- **An overloading.** Under walk, some invalid pairs at one of the five types load where they were refused (obstacle 6), and row 550's valid pair loads. Under the checker, against the one library, row 542's refusal reaches the five types (obstacle 7).
- **`asif RR64`** on an `RR64` value is the identity, as `asif NN32` is today.
- **A generic method bounded by its trait's static parameter** stops at an instance at one of the five types, unless obstacle 5 is repaired first.

## Estimate in rungs, tests first, on both paths

Two rungs for the merge itself, and two that it should wait for.

1. **Walk: a type parameter bounded by a value type** (drafted row 1). A test at `RR32` fails today. One line of walk.
2. **Walk: a type parameter beside an object type in the load check** (drafted row 2, sibling of row 697). A test at `NN32` fails today. Without it, the merge makes walk load invalid pairs at the types that programs use most.
3. **The merge.** Tests first: a walk test that each of the five is one object (an `asif` at it is the identity, `object extends ZZ32` is refused, the overload list of `+` has no second `RR64` entry); `NumberPrintTest`'s two arms and `NativeHelperFloatCarriedWalk` changed with it. Then the library's text, walk's place for the five, the five constructor classes renamed and their dead natives deleted, the needless lines of `LanguageTypes`, `StaticNativeApp` and `BuiltinPrimitiveRewriter` removed, the comments in 17 tests and one library file, the Appendix I sentence. The count stage and the distance stage run before and after. This probe's patch is most of its code.
4. **The checker: row 542**, before the switch-over, since after the merge it refuses a valid pair at `ZZ64` or `RR64` in a program.

The compiled path needs nothing else for the merge before the switch-over: it does not link this library, and its checker's two measures stay 0. What the code generator makes of `value object ZZ32` at the switch-over is the carriers' question, which this probe did not build.

## Defects

Found, none repaired in the original tree. Drafted rows, not written to the ledger:

1. `? | under walk a generic method of a trait whose bound names the trait's static parameter stops at an instance at a value object: 'T@...: non-value subtype of value type RR32' | NEGATIVE-VERIFIED | implementation gap (walk) | Specification/basic/traits.tex, "Trait Declarations" | (no test yet; reproducer: trait Holds[\S extends Number\] with held[\T extends S\](): Empty[\T\], Holder[\RR32\]().held()) | probe number-object-merge | FTraitOrObject.enforceValueness (interpreter/evaluator/types/FTraitOrObject.java:97) reads the symbolic type of T as a type that is not a value type below RR32. Runs at ZZ64 today (tests/TraitGenericMethodInference.fss:62), since ZZ64 is a trait. Walk only: the compiled path has no symbolic type.`
2. `? | walk's load check loads a generic declaration beside a plain one over an object type whose return type breaks the Return Type Rule: pickFirst[\T extends Number\](a: T, b: T): T beside pickFirst(a: NN32, b: NN32): String loads and prints 'plain'; at ZZ64, a trait, walk refuses it | NEGATIVE-VERIFIED | implementation gap (walk) | Specification/advanced/overloading.tex, "Declarations with Static Parameters" | (no test yet) | probe number-object-merge | siblings: 697, 788, 550. The parameter-by-parameter check calls the lists excluding at an object type (OverloadedFunction.java:511), so the reading on declared domains never runs. Not run on the compiled path.` It may be a note on row 697 instead of a row.
3. `? | trait RR64 declares round(self): ZZ and its object Float declares round(self): ZZ64; Float's runs, so round of an RR64 is a ZZ64, and the checker reports nothing for the pair | NEGATIVE-BOUNDED | library gap | Specification numbers.tex, "Rational Numbers", methods floor, ceiling, truncate and round | tests/RoundHalfEvenRungR.fss asserts the values, not the type | probe number-object-merge | By reading Library/FortressLibrary.fss:479 and FortressBuiltin.fss:204 at 832f7d0d91, and round(1.5) printed as a ZZ64 under walk. Whether the checker should refuse an object's functional method whose return type is not below the trait's was not investigated.`

Rows that the merge touches: 550 (its `XXX` test passes, for the wrong reason), 551 (an extender of the five is refused), 542 and 959 (reach the five types), 697.

## Sentences of the specification made false

One passage, an effect in Appendix I, `Specification/appendices/changes.tex:4687-4693`: "twenty-nine bindings of the trait ℕ64, its getter asNN32 among them, and of the interpreter's objects thirty-one of ℕ32, three of UnsignedLong, forty-one of Char, sixty-two of Float and fifty-one of ℝ32; the getters asString, asExprString and asFloat of the interpreter's objects Int, Long and BigNum". Also `:4682-4683`, "these three traits, of the trait ℕ64 and of the interpreter's object ℕ32", and `:4724-4726`, "or UnsignedLong, the interpreter's object of ℕ64, at an argument". The library chapter prints the api (`Specification/library/default-libraries.tex:27`), so it follows the api's five headers. No other sentence names the five objects.

## Decisions

- The five objects stay in `FortressLibrary` ("What was built"). Alternative: move them and six private functions into `FortressBuiltin`. No decision of the curator covers it.
- The merged `RR64` keeps `Float`'s `round(self): ZZ64`, the body that runs today, and drops the trait's `round(self): ZZ`. Alternative: keep `ZZ` and widen the result, which changes the type that `round` answers under walk. No decision covers it; I kept today's behaviour.
- The merged `RR64` keeps one `^` at `RR64`, bound to `doublePow`, where `Float` had two with the same helper.
- Four new constructor classes extend the old ones, to keep the probe's diff small. A proper change renames.
- I repaired obstacle 5 in the scratch tree by one line, to see the suite to its end. It is walk's Java, with no test first, and it does not land.
- I read "walk's fast suite" as `ant testSystem`, the suite of the interpreter's tests.

## Points to report

- The library's text changed: the table above. The team wrote the split (`fca589bbb0`, by the review).
- Walk's Java: 78 lines added, 2 deleted, in seven files, four of them new.
- Tests that name the objects as types: `tests/NativeHelperFloatCarriedWalk.fss:5-6` (changed) and `tests/NumberPrintTest.fss:31`, `:35` (not changed; passes with another output). `compiler_tests/XXXNativeHelperOwnUnsignedLongCompiled.fss` declares its own `UnsignedLong` against the prelude and is not touched. `tests/LanguageTypeInstancesWalk` and `tests/FlatTowerRungF`, which the review expected to change, name no object and pass unchanged.
- No model line names one of the five, and none changed.

## For FACTS

- **A type assumption at a number trait runs the trait's body.** `(3.0 asif RR64) + 17` runs `trait RR64`'s `opr +(self, b:RR64)`, not `Float`'s; without `asif`, no test of walk's suite and no operator of `RR64` reaches one of the trait's 56 bodies through `asFloat(self)`. It means that these bodies are live only through `asif`, and that they compute the object's result. Test: `tests/asifTest.fss:102` fails if the trait's `+` fails. Detail: "The bodies of `trait RR64`".
- **With the five number traits merged with their objects in a scratch tree, the checker count and the distance stay 0 and 0, microGPT's quick check passes, and walk's suite differs in one `XXX` test.** It means that the merge is open as a way, at 12 files. The numbers: 0 and 0; 830 tests, 1 unexpected pass (row 550). Commands and output: "Measurements". No test holds it, since nothing landed.

## Commands worked out

- A run of the old code from an empty cache, to see walk's load check on a program (row 342): `mkdir C; printf '\0\0\0\0' > C/global.map; FORTRESS_HOME=/home/user/fortress-base32 FORTRESS_CACHES=$PWD/C /home/user/fortress-base32/bin/fortress P.fss`, with `C` outside the base build. `old-fortress.sh` starts from a filled cache, where the check does not run.
- The instrumentation of the trait's bodies: a Python script that rewrites each line of `Library/FortressLibrary.fss:383-505` matching `^(.*?:\s*\(?[A-Za-z0-9,\s]+\)?\s*)= (.*asFloat\(self\).*)$` to `\1= do rr64TraitBodyRan("<line>"); \2 end`, with `rr64TraitBodyRan(s: String): () = fail("RR64-TRAIT-BODY line " s)` before the trait. The body of `opr =` needs parentheses.

## Questions for the curator

1. **Where do the five objects live?** In `FortressLibrary`, with walk told which five have native values (this probe), or in `FortressBuiltin` beside `NN32` and `RR32`, with six private functions and the five types' api moved. The first changes less text and adds a table of names to walk. The second keeps walk's one rule, that a native component's objects are native.
2. **Do the two walk repairs come first?** Obstacle 6 makes the merge lose a refusal at load for the five types; obstacle 5 stops a valid program. Both exist today at `NN32` and `RR32`. Alternatives: repair both before the merge (my estimate), or merge and record them.
3. **What does `round` of an `RR64` answer?** `ZZ64`, as it runs today and as `truncate` and the brackets do, or `ZZ`, as the trait declares.
4. **Is a `typecase` arm at a removed name acceptable until row 959 is repaired?** A program that names `Int` in an arm keeps loading and takes that arm for every value. Alternative: repair row 959 first, so that the arm is refused.
5. **Is row 542 a condition of the merge, or of the switch-over only?** After the merge the checker's refusal of a valid generic-beside-plain pair reaches `ZZ32`, `ZZ64` and `RR64` in programs checked against the one library.
