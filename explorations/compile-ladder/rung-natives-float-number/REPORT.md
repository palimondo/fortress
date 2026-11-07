# Rung F of climb batch 27: the floats' natives over Number and AnyIntegral, and group 3's six, onto helpers

- problem: the review of the hard-set natives found ten bindings of the floats and of FlatString on glue classes that the compiled path cannot call, three of them ending a run or printing a type name at a rational (explorations/reviews/hard-set-natives-2026-11-06.md:107-144)
- spec: none; `grep -rn 'atan2\|random\b\|printThreadInfo\|flatConcat' Specification/basic-lib Specification/basic` prints nothing
- precedent: the bare helper binding at a narrow header beside a converting declaration, as climb batch 26's printThreadInfo pair over FlatString and String (Library/FortressLibrary.fss:4628-4632); RR32's own bracket helpers simpleFloatArith.floatIFloor and floatICeiling (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleFloatArith.java:179-185)
- deviation: Float's power over AnyIntegral converts by a typecase in Fortress, not by a native (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162-168); printThreadInfo at RR64 is plain Fortress through asString, with no native of its own (Library/FortressLibrary.fss:4633); the doc comment "Shouldn't need this extra declaration." above Float's power over AnyIntegral is gone with the declaration over Number it spoke of (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:162)
- historical: Library/FlatString.fss, Library/FortressLibrary.fss, Library/FortressLibrary.fsi, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, ProjectFortress/src/com/sun/fortress/nativeHelpers/LocalRandom.java, simpleConcatenate.java, simpleDoubleArith.java, simpleFloatArith.java, stringOps.java

## 1. What changed and why

P-162 takes the bindings over `AnyIntegral` or `Number` to converting declarations around public bare bindings at narrow headers, and gives the six over carried types one-line helpers; P-165 declares `Float`'s power at a `Number` exponent, `random`, `atan2` and `printThreadInfo` at `RR64`, with the `RR64` trait's `^` and `atan2` over `Number` narrowed with them. The worktree is `/home/user/fortress-natives-float-number`, seeded from the base build (seed-worktree.sh exited 0), branch `wip/rung-natives-float-number`. Commits: `acd085aaa` (the tests), `cc792329c` (the edit).

Each binding, as written now, with its helper's Java signature:

| declaration (file:line now) | before | now |
|---|---|---|
| `Float`'s `opr ^(self, b:RR32):RR64` (FortressBuiltin.fss:156-157) | glue `Float$Pow` | new `simpleDoubleArith.doublePowFloat(double, float): double` |
| `Float`'s `opr ^(self, b:ZZ32):RR64` (:160-161), new public bare binding | none | new `simpleDoubleArith.doublePowInt(double, int): double` |
| `Float`'s `opr ^(self, b:AnyIntegral):RR64` (:162-168) | glue `Float$Pow` | `typecase b of c:ZZ32 ⇒ self^(asFloat(c)); c:ZZ64 ⇒ …; c:NN32 ⇒ …; c:NN64 ⇒ …; c:ZZ ⇒ … end`, each arm `self^(asFloat(c))`, reaching `Float`'s `^` at `RR64` (:158-159), `doublePow` |
| `Float`'s `opr ^(self, b:Number):RR64 = self^(asFloat(b))` | Fortress | deleted |
| `Float`'s `atan2(self, x:RR64):RR64` (:181-182), was `x:Number` | glue `Float$ATan2` | existing `simpleDoubleArith.doubleATan2(double, double): double` |
| `Float`'s `opr |\self/| : ZZ64` (:189-190) | glue `Float$IFloor` | new `simpleDoubleArith.doubleIFloor(double): long` |
| `Float`'s `opr |/self\| : ZZ64` (:193-194) | glue `Float$ICeiling` | new `simpleDoubleArith.doubleICeiling(double): long` |
| `RR32`'s `opr ^(self, b:Float):RR64` (:333-334) | glue `Float$Pow` | new `simpleFloatArith.floatPowDouble(float, double): double` |
| `random(a:RR64):RR64` (FortressLibrary.fss:4537, .fsi:2573), was `a:Number` | glue `Float$Random` | new `LocalRandom.scaledRandomDouble(double): double`, `scale * Math.random()` |
| `printThreadInfo(a:RR64):() = printThreadInfo(a.asString)` (FortressLibrary.fss:4633, .fsi:2635), was `a:Number` | glue `StringPrim$PrintThreadInfo` | no native: the overload over `String` (:4629-4632) |
| the `RR64` trait's `opr ^(self, b:RR64):RR64 = (asFloat(self))^b` (FortressLibrary.fss:485, .fsi:367), was `b:Number` | Fortress | same body |
| the `RR64` trait's `atan2(self, x:RR64):RR64 = atan2(asFloat(self), x)` (FortressLibrary.fss:494, .fsi:375), was `x:Number`, `asFloat(x)` | Fortress | converts `self` only |
| `FlatString`'s `opr =(self, other: FlatString): Boolean` (FlatString.fss:70-71) | glue `FlatString$Eq` | new `stringOps.stringEquals(String, String): boolean`, right after `compareTo` |
| `FlatString`'s `flatConcat(self, b:Char):String` (FlatString.fss:96-97) | glue `FlatString$Concat` | new `simpleConcatenate.nativeConcatenateChar(String, int): String`, `s + String.valueOf((char) c)`, right after `nativeConcatenate` |

The eight new helpers are the glue's own one-line computations: `Math.pow(a, b)` with the exponent widened to a `double` as `Float$Pow`'s `RR2R` reads it (`interpreter/glue/prim/Float.java:292-296`), `(long) Math.floor(x)` and `(long) Math.ceil(x)` as `IFloor` and `ICeiling` (`:364-374`), `scale * Math.random()` as `Random` (`:418-422`), `self.equals(other)` as `FlatString$Eq` (`interpreter/glue/prim/FlatString.java:131-136`), and `x + y` with the `Char` read as `FChar`'s text, its low 16 bits, as `FlatString$Concat` (`:173-178`; row 872). None holds state (fork 6). The glue classes stay (brief, "Files").

The counts this tree moves: 10 bindings leave glue classes and 9 name helpers (`git diff ed8652dc0 HEAD -- Library ProjectFortress/LibraryBuiltin | grep -c '^-.*glue\.prim'` prints 10, `grep -c '^+.*nativeHelpers'` prints 9); the live bindings fall by one, `Float`'s power over `AnyIntegral` and `printThreadInfo` over `Number` leaving and `Float`'s bare power at `ZZ32` coming. On this tree alone F-299's 306 of 449 become 315 of 448 and F-32's 143 become 133; `Float` 57 becomes 62, `RR32` 50 becomes 51, `FlatString`'s 11 of 13 becomes 13 of 13, and `random` joins the top-level helpers.

## 2. The tests, failing and passing

- `ProjectFortress/tests/NativeHelperRationalArgumentWalk.fss`: a guard, the conversions written at `third: QQ = 1/3`. On the base:

      explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-float-number/h1 ProjectFortress/tests/NativeHelperRationalArgumentWalk.fss ProjectFortress/tests/NativeHelperFloatMixedWalk.fss
      # harness-one 2026-11-07T07:05:01Z; tree ed8652dc0; ... cache empty
      . interpret tmp/rung-natives-float-number/h1/tests/NativeHelperRationalArgumentWalk
       Thread ForkJoinPool-1-worker-1 operating on value 0.3333333333333333
       Thread ForkJoinPool-1-worker-1 operating on value 3
       OK (time = 1979ms)

- `ProjectFortress/tests/NativeHelperFloatMixedWalk.fss`: a guard of every other value at today's glue answer. Its first base runs were refused for the test's own spelling (a loose `=` beside `||`, `flatConcat` not imported, `asFloat(10.0)^300` and `big(2)^65` read as juxtapositions), each corrected; the last base run, before any edit of code:

      explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-float-number/h1 ProjectFortress/tests/NativeHelperFloatMixedWalk.fss
      # harness-one 2026-11-07T07:05:52Z; tree ed8652dc0; ... cache filled
      . interpret tmp/rung-natives-float-number/h1/tests/NativeHelperFloatMixedWalk
       OK (time = 3000ms)
      OK (1 test)

- `ProjectFortress/compiler_tests/NativeHelperFamilyFloatMixedCompiled.fss` with its `.test` (`tests=`, `link`, `run`, `run_out_contains=PASS`): the eight helpers bound in the program's own declarations, a string as a `JavaString` and a `Char` in a `ZZ32`. Failing on the base, at 2026-11-07T07:06:03Z, before the edit was first built:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyFloatMixedCompiled.test
      . link ProjectFortress/compiler_tests/NativeHelperFamilyFloatMixedCompiled ProjectFortress/compiler_tests/NativeHelperFamilyFloatMixedCompiled.fss:5:51-113:
          builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleDoubleArith.doublePowFloat
      FAILURES!!!
      Tests run: 2,  Failures: 2,  Errors: 0

After the edit (`ant compileAll` 'BUILD SUCCESSFUL' at 07:07, then the library order, exit 0, five jars), on `cc792329c`'s code:

      explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-float-number/h2 ProjectFortress/tests/NativeHelperRationalArgumentWalk.fss ProjectFortress/tests/NativeHelperFloatMixedWalk.fss
       Thread ForkJoinPool-1-worker-1 operating on value 0.3333333333333333
       Thread ForkJoinPool-1-worker-1 operating on value 3.0
      OK (2 tests)

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after ProjectFortress/compiler_tests NativeHelperFamilyFloatMixedCompiled.test NativeHelperFamilyFloatCompiled.test NativeHelperFamilyRR32Compiled.test
      . run ProjectFortress/compiler_tests/NativeHelperFamilyFloatMixedCompiled (235ms) PASS
      OK (6 tests)

No code changed after these runs.

The whole suites, once each on `cc792329c`'s code (fork 2): `ant testSystem`, 'BUILD SUCCESSFUL', 'Total time: 2 minutes 38 seconds', shards 192, 183, 195 and 188, 758 tests, 0 failures (the landed 756 and the two new ones); `ant testQuick`, 'BUILD SUCCESSFUL', 'Total time: 4 minutes 27 seconds', 'Tests run: 1434, Failures: 0' (compiler, the landed 1432 and the new link and run), 'Tests run: 86, Failures: 0' (library), 'Tests run: 263, Failures: 0' (othercompiler). So every guard the brief names keeps its verdict: `NativeHelperFamilyFloatWalk`, `NativeHelperFamilyRR32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `realArith`, the library's string tests, and the compiled `NativeHelperFamilyFloatCompiled` and `NativeHelperFamilyRR32Compiled`. No test's verdict changed in either suite.

## 3. Where the fix belongs, and the precedent

The bindings are the library's (`Library/`, `ProjectFortress/LibraryBuiltin/`) and their helpers `nativeHelpers/`, the classes both paths call (the skill's `library.md`, "Designing a change": a new native is a public static method under `nativeHelpers/`). The precedent search: climb batch 26's five pairs over `FlatString` and `String` are P-162's pattern (F-299); of the eight sites in `FortressLibrary.fss` that declare a native beside a converting overload (`printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment`, `getProperty`, `match` and their neighbours, :4615-4651), each puts the native at the narrow header and converts in Fortress, as `random` and `Float`'s `^` now do. The brackets follow `RR32`'s own `floatIFloor` and `floatICeiling` (`simpleFloatArith.java:179-185`), the only bracket helpers of the classes, which answer a `long` at a cast, as the new `doubleIFloor` and `doubleICeiling` do. The typecase over `AnyIntegral` follows `FlatString`'s own `typecase b.asFlatString of` (`Library/FlatString.fss:137-140`) and the review's scratch `count32` (its reference 2).

## 4. What the specification settles

Nothing: neither the basic chapters nor the library chapters name `random`, `atan2`, `printThreadInfo` or `flatConcat` (the grep above). The conversion `asFloat(x)` that a caller of another type writes is P-165's and the library decision that `ZZ64` converts into `RR64` only explicitly (the skill's `library.md`, "The curator's decisions on the library").

## 5. Programs run old against new

The before of every rational case is the review's run on this base (its section 2.2, point 12; the planner's probe 2: no code change from the review's commit to the base), not run again here. After, on `cc792329c`'s code, scratch programs under `tmp/`, each `FORTRESS_CACHES=… bin/fortress P.fss`:

| program | before (the review) | after |
|---|---|---|
| `random(third)` | 'getFloat not implemented for FOrdinaryObject', an InterpreterBug | 'Closure/Constructor for random parameter 1 (a:RR64) got type Ratio', rc=1 |
| `atan2(one, third)`, `one = 0.5 + 0.5` | the same InterpreterBug | 'Failed to find any matching overload, args = (1.0:RR64,Ratio)', rc=1 |
| `printThreadInfo(third)` | ' Thread ForkJoinPool-1-worker-1 operating on value Ratio' | 'Failed to find any matching overload, args = (Ratio)', rc=1 |
| `one^third` | 1.0, through `Float`'s `^` at `Number` | 'Failed to find any matching overload, args = (1.0:RR64,Ratio)', rc=1 |
| `random(z)`, `z: ZZ = big(10)` | in range (the review's line 1) | 'Closure/Constructor for random parameter 1 (a:RR64) got type BigNum', rc=1 |
| `atan2(one, w)`, `w: ZZ64 = 1` | 0.7853981633974483 (the review's line 2, at a ZZ) | 'Failed to find any matching overload, args = (1.0:RR64,1: ZZ64)', rc=1 |
| `printThreadInfo(3)` | ' … operating on value 3' (the base harness run above) | ' … operating on value 3.0' |
| `printThreadInfo(2.5)`, `printThreadInfo(x)`, `x: ZZ32 = 7` | not run | ' … value 2.5', ' … value 7.0' |

Each refusal is P-165's: "a QQ, ZZ64, NN32, NN64 or ZZ caller writes asFloat(x)", and the guard writes it. Every other value of the review's sections 2.2 and 2.3 is asserted in `NativeHelperFloatMixedWalk` at the glue's answer and passes on both codes, `flatConcat` past U+FFFF among them (fork F4: it keeps the glue's answer, the low 16 bits).

## 6. The stages

Both on `cc792329c`, the final code, after its build; no code changed after either started.

- The count, `explorations/coordinator/tools/checker-count/run.sh`, rc=0: '#total 0', '#locations 0', '#crash none'. `diff explorations/compile-ladder/climb-batch-26/gate/checker-count.txt` against it prints nothing.
- The distance, `explorations/coordinator/tools/distance/run.sh`, rc=0, '#seconds 162 FortressLibrary 121':

      explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-26/gate/distance.txt tmp/rung-natives-float-number/distance-postedit.txt
      DISTANCE SAME   0

  `dist-post/errors.tsv` holds its header only, and `explorations/compile-ladder/gate/distance-sites.tsv` holds its header only: no site moved or came. So the checker accepts each moved binding against its helper's Java signature, `FlatString`'s two and `FortressBuiltin`'s seven in the distance stage, `random` in both.

The ladder subset: the newest landed ladder (`climb-batch-26/gate/ladder/ladder.tsv`) has no row whose first error names anything this change touched; the baseline's `ladder.tsv` has four, each naming `printThreadInfo` or `^` (`grep -iE 'atan|random|printThread|flatConcat|\^|Float\$|FlatString\$|IFloor|ICeil|Number'`): `tests/abortBlock.fss`, `atomic5.fss`, `expTest.fss` and `transposition.fss`, none in the gate's pass list. Run after the edit only, with the gate's drivers copied under `tmp/rung-natives-float-number/ladder/` (`run-subset.sh`, then `classify.py`), against the baseline's rows:

      tests	abortBlock.fss	disambiguate	Variable printThreadInfo is not defined.      (baseline: the same)
      tests	atomic5.fss	disambiguate	Variable printThreadInfo is not defined.      (baseline: the same)
      tests	expTest.fss	disambiguate	Variable asFloat is not defined.              (baseline: typecheck, Could not check call to operator ^)
      tests	transposition.fss	typecheck	Could not check call to operator ^       (baseline: the same)

`expTest`'s move is not this change's: the ladder compiles against the compiler's prelude, which this change does not edit (`git diff --stat ed8652dc0 HEAD -- ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss Library/CompilerLibrary.fss` prints nothing), and the test's `asFloat` calls (`tests/expTest.fss:25`, `:27`) came in `d846e3644` of 2026-09-27, after the baseline of 2026-09-19; the prelude has no `asFloat`. `ant testQuick` above shows that the prelude's imports of `LocalRandom`, `simpleDoubleArith`, `stringOps` and `simpleConcatenate` still wrap with the new methods.

Not run: the model (P-30: the commit stage's quick check is the batch's); the demos (fork 5: the gather's).

## 7. Sentences made false

- `Specification/appendices/changes.tex:4475`, "306 of the 449 bindings of \library\ name a helper": on this tree 315 of 448.
- `changes.tex:4486`, "fifty-seven of \TYP{Float} and fifty of \EXP{\mathbb{R}32}": 62 and 51.
- `changes.tex:4489`, "eleven methods of the object \TYP{FlatString}": all thirteen; and `random` is a new top-level function on a helper, which the list at `:4490-4494` does not name.
- `changes.tex:4495`, "The other 143 still name a glue class": 133 on this tree.
- FACTS.md, F-32's "143 of the one library's 449 live native bindings" and F-299's "306 of the one library's 449", its "`Float` 57", "`RR32` 50", "11 of `FlatString`'s 13 methods, all but `=` and the `flatConcat` overload over a `Char`" and "the other 143". F-299's "`printThreadInfo` … each a native over `FlatString` beside an overload over `String`" stays true: the native over `FlatString` is unchanged and the declaration at `RR64` is plain Fortress.
- PLAN.md:48, "`FlatString`'s `=` and `flatConcat` at a `Char` stay on glue until the floats' rung below", and PLAN.md:52, the floats' rung, both done on this tree.

The gather corrects these on the merged tree (fork 7); this rung edits none.

## 8. Points to report

- Each binding moved and each declaration that now converts: section 1's table.
- Each declaration over `Number` narrowed or deleted: `Float`'s `^` at `Number` deleted (FortressBuiltin.fss, was :160); `Float`'s `atan2` (:181), `random` (FortressLibrary.fss:4537, .fsi:2573), `printThreadInfo` (:4633, .fsi:2635), the `RR64` trait's `^` (:485, .fsi:367) and `atan2` (:494, .fsi:375) narrowed to `RR64`. No caller in the library, the tests or the demos needed a written conversion: `git grep -nE '(^|[^.A-Za-z_])random\('` names only `ZZ32`, `RR64` and numeral arguments (`Library/Avl.fss:422`, `Shuffle.fss:24`, `Random.fss:195`, `SkipList.fss:78`, `tests/buffons.fss`, `quicksortTest.fss:28`, `sparseMatrix.fss:27`, `:29`, `:42`, `demos/DemoGenerator22D.fss:61`), `atan2`'s callers pass `RR64`s (`tests/realArith.fss:62`, `library_tests/RR64FunctionsRungF.fss:66-69`), `printThreadInfo`'s pass strings, and `ant testSystem` and `ant testQuick` pass whole.
- The rational cases with their written conversions, before and after: section 5, printThreadInfo's line among them: ' … operating on value Ratio' before, a refused call after, and `printThreadInfo(asFloat(third))` printing ' … operating on value 0.3333333333333333' on both codes.
- The tests before and after through the harness and junit.sh: section 2.
- The count and distance tables on the final tree: section 6, 0 and 0, no site.
- Each value that moves: `printThreadInfo` at a numeral or a `ZZ32` prints the float's text, `3.0` for `3` (fork F5); a `QQ`, `ZZ64`, `NN32`, `NN64` or `ZZ` argument of `random`, `atan2` and `Float`'s `^` at a non-integer exponent is refused at the call where the base answered (P-165), section 5; `one^third` gave 1.0 on the base. No test's verdict changed in `ant testSystem` or `ant testQuick`. `flatConcat` at a `Char` past U+FFFF keeps the glue's answer (fork F4), asserted on both codes.
- Every sentence made false: section 7.
- No file edited beyond those the brief names; no edit of `Object`'s or `SEQV`'s bindings, the checker or the compiler.

## 9. Decisions

1. **Helper names and places.** `doublePowFloat`, `doublePowInt`, `doubleIFloor` and `doubleICeiling` in `simpleDoubleArith`, beside `doublePow` and `doubleCeiling`; `floatPowDouble` in `simpleFloatArith` beside `floatPow`; `stringEquals` in `stringOps` right after `compareTo`; `nativeConcatenateChar` in `simpleConcatenate` right after `nativeConcatenate`; `scaledRandomDouble` in `LocalRandom` (fork F3). Each name is new in the tree (`grep -rn` over `ProjectFortress/src`, both test corpora and the libraries prints only the new lines and the compiled guard). Ways not taken: overloading `doublePow` or `nativeConcatenate` at the new Java types, which walk's loader refuses when several methods of a name fit ('overloads that fit') and which on the compiled path takes no `Char` transfer where a class has two methods of the helper's name and arity (F-308; the skill's `compiler.md`, "Natives"); a static `equals(String, String)`, beside the inherited `equals(Object)`; the brackets at the end of the class, where I3 puts rung I's, against the class's own grouping of `doubleFloor` and `doubleCeiling`.
2. **`random`'s helper computes `scale * Math.random()`, in `LocalRandom`.** Ways not taken: `LocalRandom.localRandomDouble`, which refuses a bound that is not positive where the glue answers `random(0)` with 0.0 (fork F2; the review, section 6, (a), point 4); `DeterministicRandom`, which is seeded and answers other values. The guard asserts `random(0)` and `random(-1)` on both codes.
3. **Every arm of `Float`'s typecase over `AnyIntegral` converts by `asFloat`, the `ZZ32` arm too.** No call reaches the `ZZ32` arm, since `Float`'s `^` at `ZZ32` is more specific on both paths; the arm keeps the typecase complete. Way not taken: `c:ZZ32 ⇒ self^c`, the bare binding, which the brief's "each by its own asFloat" does not name and which no call can observe.
4. **The doc comment "(** Shouldn't need this extra declaration. **)" above `Float`'s `^` over `AnyIntegral` goes** (FortressBuiltin.fss, was :161): it spoke of the declaration over `Number` that P-165 strikes, and with it gone the declaration over `AnyIntegral` is needed. The `RR64` trait's like comment (FortressLibrary.fss:486) stays, since that trait keeps its `^` over `AnyIntegral` beside the `^` at `RR64`, and the brief names :485 only. Way not taken: keeping both comments.
5. **The walk tests assert floats and the brackets' `ZZ64`s by their `asString`, and strings by `=` only between strings.** So no assertion compares numbers of two types by `=` or `SEQV`, which rungs N and E change (the brief's two rules for every rung's tests). Way not taken: `assert(x, 1.4142135623730951, …)`, a `Float` against a `FloatLiteral`.
6. **`NativeHelperRationalArgumentWalk` also asserts `2.0^(asFloat(third))`**, at Math.pow's 1.2599210498948732, beside the brief's `one^(asFloat(third))`, whose value 1.0 does not depend on the exponent. Way not taken: the brief's case alone.
7. **The ladder subset is the four baseline files whose first error names `printThreadInfo` or `^`** (section 6), though the ladder runs against the prelude, which this change does not touch. Way not taken: an empty subset, reading "touched" as the prelude's declarations only.

## 10. Defects and their homes

- The three defects of `random`, `atan2` and `printThreadInfo` at a rational (the review, section 2.2, point 12): home 1, repaired by this change. None of the three takes a `QQ` now; the call is refused at dispatch and the program writes the conversion, which `tests/NativeHelperRationalArgumentWalk.fss` asserts. No row by plan.
- `flatConcat(self, b:Char)` past U+FFFF appends the `Char`'s low 16 bits, a sibling site of row 872: home 3, the existing row, its note in `record.md`; `tests/NativeHelperFloatMixedWalk.fss` pins today's answer with a message naming row 872, and `compiler_tests/NativeHelperFamilyFloatMixedCompiled.fss` pins the helper's on the compiled path. The specification is silent (row 872's spec cell).
- No other defect was measured.

## 11. Revival change

**The change.** The team's interpreter library declared `random(a:Number):RR64` and `printThreadInfo(a:Number):()` (`git show a874948ac:Library/FortressLibrary.fss`, lines 4123 and 4215), the `RR64` trait's `opr ^(self, b:Number):RR64` and `atan2(self,x:Number):RR64` (lines 402 and 411), and `Float`'s `atan2(self,x:Number)` and `opr ^(self, b:Number)` (`git show a874948ac:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, lines 158 and 174), each taking any number. The tree declares each at `RR64` (`Library/FortressLibrary.fss:485`, `:494`, `:4537`, `:4633`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:181`; `Float`'s `^` at `Number` is gone), so a `ZZ32`, an `RR32` or a numeral reaches them by coercion, and a `QQ`, `ZZ64`, `NN32`, `NN64` or `ZZ` argument is refused at the call and is written `asFloat(x)` (`tests/NativeHelperRationalArgumentWalk.fss`); `printThreadInfo` of a numeral prints the float's text, `3.0` for `3`. Reason: the team's glue reads its argument as a Java value that a library object has none of, so under the team's walk, at `third: QQ = 1/3`, `random(third)` and `atan2(one, third)` ended the run with 'getFloat not implemented for FOrdinaryObject', an InterpreterBug, and `printThreadInfo(third)` printed ' Thread ForkJoinPool-1-worker-1 operating on value Ratio' (measured on the base of this change); the team's compiler prelude declares `random(i:RR64)` and `atan2(self, x:RR64)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1629`, `:981`) and declares `Number` with nothing in it (`:510`).

**Provenance.** P-165, the decision that `asFloat` leaves `Number` and that these four are declared at `RR64`; P-162, option (e) of the hard-set review; climb batch 27, rung F, forks F2, F5 and F6.
