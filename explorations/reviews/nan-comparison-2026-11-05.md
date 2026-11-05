<!-- The design for the curator's decision on what a float compared with a NaN does: whether `<`, `<=`, `>`, `>=` and `CMP` on `RR64` and `RR32` answer `false` and `Unordered`, as both paths do today, or raise `FloatingComparisonError`, as one sentence of the specification's overview of operators says (ledger row 672, with its siblings 440 and 634, and review-queue item 24), written 2026-11-05 by an Opus worker, reading only, with probe runs on walk and on the compiled path in a worktree seeded at `65e8553f6`. -->

# A float compared with NaN: the design for the curator's decision

The tree is `main` at `65e8553f6`. Every Fortress run below took place in a worktree seeded from the base build `/home/user/fortress-base-ncl` at that commit; the Java and Python runs took place beside it. The probe programs are scratch, so each reference quotes the lines that matter and the output.

## 1. The question, and a primer

**The question.** When a program compares a float with a NaN by `<`, `<=`, `>` or `>=`, or by `CMP`, does the comparison give an answer (`false`, or `Unordered` for `CMP`), as both paths do today, or does it raise `FloatingComparisonError`, as one sentence of the specification says?

**The words.**

- A *float* is a value of `RR64` or `RR32`. Walk carries an `RR64` in a Java `double`, a 64-bit IEEE 754 binary floating-point number, and an `RR32` in a Java `float`, the 32-bit one [1].
- A *NaN* ("not a number") is a float value that the arithmetic gives where no number is the answer, as for `0.0/0.0` or infinity minus infinity [2]. An arithmetic operation with a NaN operand gives a NaN again. So a NaN spreads through all later arithmetic [3].
- An *ordering comparison* is one of `<`, `<=`, `>` and `>=`. It answers a `Boolean`.
- `CMP` compares two values. It answers one of the four values of the library's type `Comparison`: `LessThan`, `EqualTo`, `GreaterThan` or `Unordered`. `Unordered` means that no order holds between the two values [4].
- A NaN is not less than, not equal to and not greater than any value, itself included. IEEE 754, the standard for floating-point arithmetic, calls such a pair *unordered* [5].
- To *raise* is to throw an exception. `FloatingComparisonError` is an unchecked exception of the library: a function need not declare it, and a `catch` can take it. If no `catch` takes it, the run stops there [6].
- The two *paths* are walk, the interpreter, and the compiled path, which compiles a program to JVM bytecode. Until the *switch-over*, the compiled path uses its own small library, the *compiler's prelude*. At the switch-over it moves onto the interpreter's library, the *one library* [7].

**An example.** This program compares a float with a NaN:

    nan: RR64 = 0.0/0.0
    if nan < 1.0 then println("less") else println("not less") end

Both paths answer `false` today, so the program prints "not less" [8]. If the comparison raised, neither arm would run. The run would stop at `nan < 1.0` with `FloatingComparisonError`, unless a `try` around the comparison caught it.

**Why a language may raise.** With a NaN, "not less" does not mean "greater or equal": `1.0 < nan` and `1.0 >= nan` are both `false` [9]. A program that assumes that one of `<`, `=` and `>` always holds then takes a wrong branch, and nothing tells it so. A raise turns that silent wrong branch into a stop. The price of a raise is a test for NaN at each comparison, and a stop where the run could have gone on.

References for section 1

1. `.claude/skills/fortress-repo/references/interpreter.md`, "Natives": "`RR64` and `Float` ... in `double`; `RR32` in `float`". The Java Language Specification, SE 21, §4.2.3, for `float` and `double` as the IEEE 754 32-bit and 64-bit formats.
2. `Specification/basic/operators/opr-overview.tex:167-168`: "For floating-point results, division by zero produces a NaN value according to the rules of IEEE 754". Probe `NanWalk.fss` (section 2, reference 6) makes its NaN as `0.0/0.0`.
3. `ProjectFortress/compiler_tests/NativeHelperFamilyFloatCompiled.fss:117`, `:123`, `:131`, `:144`: `dAdd`, `dSub`, `dMul` and `dDiv` of NaN and 1 are NaN.
4. `Library/FortressLibrary.fss:132-134` (`trait Comparison ... comprises { Unordered, TotalComparison }`) and `:149-151` ("Unordered is the outcome of a CMP b when a and b are partially ordered and no ordering relationship exists between them").
5. Wikipedia, "NaN", section "Comparison with NaN", which cites IEEE 754-2019 §5.11: the predicates "return false on an unordered relation". Julia's manual, "Numeric Comparisons": "`NaN` is not equal to, not less than, and not greater than anything, including itself."
6. `Library/FortressLibrary.fsi:1187`: `object FloatingComparisonError extends UncheckedException`. `Specification/basic/exceptions.tex:76-87`: a `throws` clause lists only the checked exceptions. Section 5, reference 4, shows how walk reports an uncaught one.
7. `.claude/skills/fortress-repo/SKILL.md`, "How a program runs"; `references/compiler.md`, "The compiler's prelude, until the switch-over".
8. Probe `NanExample.fss`, the two lines above in a `run()`. `bin/fortress NanExample.fss` printed `not less`, exit 0. `bin/fortress compile` then `bin/fortress run NanExample` printed `not less`, exit 0.
9. Probe `NanWalk.fss` (section 2, reference 6): `RR64: 1.0 < nan false, 1.0 >= nan false`. The Java Language Specification, §4.2.3, says the same of Java: "`(x<y) == !(x>=y)` will be `false` if `x` or `y` is NaN."

## 2. Where the comparisons are built today

### 2.1 The one library, which walk runs

`RR64` is a trait of the library. Its comparisons forward to `Float`, the library's object for a float at run time, which binds Java helpers. A *helper* is a public static Java method of a class under `nativeHelpers/`, which both paths can run. A *glue class* is a Java class under `interpreter/glue/prim/`, which only walk can run [1].

- `<`, `<=`, `>`, `>=` on `RR64`: `Library/FortressLibrary.fss:442-445`, each `asFloat(self) OP asFloat(b)` (api `Library/FortressLibrary.fsi:328-331`). `Float`'s four operators bind the helpers `simpleDoubleArith.doubleLT`, `doubleLE`, `doubleGT` and `doubleGE` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:85-92`). Each helper is Java's own comparison, as `return a < b;` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:44-58`) [2].
- `CMP` on `RR64`: `Library/FortressLibrary.fss:446-451`, written in Fortress, with no native: `if self<b then LessThan elif self>b then GreaterThan elif self=b then EqualTo else Unordered end` (api `.fsi:332`).
- `MIN` and `MAX` on `RR64`: `Library/FortressLibrary.fss:454-455` forward to `Float`'s `MIN` and `MAX` (`FortressBuiltin.fss:95-98`), which bind the helpers `doubleMin` and `doubleMax`. These are Java's `Math.min` and `Math.max` (`simpleDoubleArith.java:164-170`), which give a NaN if either argument is a NaN. The team's comment above them: "In case of NaN, %MIN% and %MAX% return a NaN, otherwise it respects the total order." (`FortressLibrary.fss:452-453`, `.fsi:333-334`).
- `MAXNUM` and `MINNUM` on `RR64`: `Library/FortressLibrary.fss:506-525`, in Fortress: `r = self MIN b`, and if `r.isNaN`, the argument that is a number. No comparison operator takes part (api `.fsi:383-387`).
- `RR32` is a value object of `FortressBuiltin` (`FortressBuiltin.fss:205`, api `FortressBuiltin.fsi:47`). Its `<` to `>=` bind `simpleFloatArith.floatLT` to `floatGE` (`FortressBuiltin.fss:250-257`; `simpleFloatArith.java:47-61`). Its `CMP` has the same Fortress body as `RR64`'s (`FortressBuiltin.fss:258-263`). Its `MIN` and `MAX` bind `floatMin` and `floatMax`, Java's `Math.min` and `Math.max` (`FortressBuiltin.fss:266-269`; `simpleFloatArith.java:63-69`). Its `MINNUM` and `MAXNUM` have the same form as `RR64`'s (`FortressBuiltin.fss:347-366`). The api declares them at `FortressBuiltin.fsi:72-81` and `:121-122`.
- No glue class takes part. The team's glue classes `Float$Less` to `Float$Max` (`interpreter/glue/prim/Float.java:256-290`) and `RR32$Less` to `RR32$Max` are no longer named by any binding [3]. The revival moved `Float`'s bindings onto helpers on 2026-10-31 (`5ecb7a841`, F-303) and `RR32`'s on 2026-11-03 (`43f130022`). Both moves kept Java's answer, which the team's glue gave too: `return x < y;` (`a874948ac:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR32.java:258-261`).

### 2.2 The compiled path, until the switch-over

The compiled path uses the compiler's prelude, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`.

- `RR64` is a trait at `:931` that extends `{ Number, Equality[\RR64\] }`, not `StandardPartialOrder`. It declares no `CMP`. A compiled `nan CMP 1.0` is a static error [4].
- `<`, `<=`, `>`, `>=`: `:940-943`, as `jDoubleLT(self,other)` and so on, which `:207-210` import from the same helpers `doubleLT` to `doubleGE`.
- `isNaN`: `:935`, `NOT (self = self)`.
- `MIN`, `MAX`, `MINNUM`, `MAXNUM`: `:948-951`, written with `<=`, `>=` and `isNaN`. For example `MIN` is `if self <= other then self elif other <= self then other elif self.isNaN then self else other end`. These bodies reach their `isNaN` arm only because `<=` answers `false` at a NaN.
- `RR32` (`:992-994`) declares only a coercion. The prelude has no comparison of two `RR32` values.
- After the switch-over, the compiled path runs the one library's bindings. Its compile rewrites each `builtinPrimitive` body that names a helper into a call of that helper, so it runs the same Java as walk [5].

### 2.3 What the runs give

On walk, every ordering comparison with a NaN answers `false`, `CMP` answers `Unordered`, `MAX` and `MIN` give a NaN, and `MAXNUM` and `MINNUM` give the number. Nothing raises [6]:

    RR64: nan < 1.0 false, nan <= 1.0 false, nan > 1.0 false, nan >= 1.0 false
    RR64: 1.0 < nan false, 1.0 >= nan false, nan = nan false, nan =/= nan true
    RR64: nan CMP 1.0 Unordered, 1.0 CMP nan Unordered, nan CMP nan Unordered
    RR64: nan MAX 1.0 NaN, 1.0 MAX nan NaN, nan MIN 1.0 NaN, 1.0 MIN nan NaN
    RR64: nan MAXNUM 1.0 1.0, 1.0 MAXNUM nan 1.0, nan MINNUM 1.0 1.0, 1.0 MINNUM nan 1.0
    RR32: nan < 1 false, nan <= 1 false, nan > 1 false, nan >= 1 false, nan = nan false
    RR32: nan CMP 1 Unordered, nan MAX 1 NaN, 1 MIN nan NaN, nan MAXNUM 1 1.0, 1 MINNUM nan 1.0

The reductions and the array `MAX` keep the NaN [6]:

    BIG MAX over [1.0, nan, 1.0] NaN, BIG MIN NaN, BIG MAXNUM 1.0
    0.0 MAX [1.0, nan, 1.0] 1.0 NaN 1.0

On the compiled path, the prelude gives the same answers, and so do the helpers that the one library binds [7]:

    prelude RR64: nan < 1.0 false, nan <= 1.0 false, nan > 1.0 false, nan >= 1.0 false
    prelude RR64: nan MAX 1.0 NaN, 1.0 MAX nan NaN, nan MIN 1.0 NaN, 1.0 MIN nan NaN
    prelude RR64: nan MAXNUM 1.0 1.0, 1.0 MAXNUM nan 1.0, nan MINNUM 1.0 1.0, 1.0 MINNUM nan 1.0
    one-library helpers: doubleLT(nan,1) false, doubleLE false, doubleGT false, doubleGE false
    one-library helpers: floatLT(nan,1) false, floatGE false, floatMax(nan,1) NaN

Two side findings, not about NaN, but met on the way:

- The compiled prelude's `MIN` and `MAX` order the signed zeros by the order of their arguments: `0.0 MIN (-0.0)` is `0.0` and `(-0.0) MAX 0.0` is `-0.0`. Walk gives `-0.0` and `0.0` in each order. The specification says that for these operators "-0 is considered to be smaller than +0" (`opr-overview.tex:250-252`) [6][7]. No ledger row holds this: `facts-extract.sh 'ledger-find:-0.0'` and `'ledger-find:signed zero*'` list none. It ends at the switch-over, because the one library binds Java's `Math.min` and `Math.max`.
- Walk stops on a list of floats that holds a NaN where it decides: `<|onef, nan|> < <|onef, onef|>` ends in "Unification error: Closure/Constructor for join param 2 (b:TotalComparison) got arg Unordered of type Unordered" [8]. `LexicographicReduction`'s `join` takes only a `TotalComparison` (`FortressLibrary.fss:116-121`). One-element lists answer (`false`, and `Unordered` for `CMP`) [6]. Row 774 holds that walk gives every list an order, but not this stop.

### 2.4 `CMP`, the tuples, the lists and `StandardPartialOrder`

- `CMP` answers `Unordered` at a NaN, on walk, in every order (above). That is the specification's `Unordered`: "When the comparison operator CMP is applied to values belonging to a partial order, rather than a total order, it typically returns a value of type Comparison, which includes ... also a fourth value, Unordered" (`Specification/advanced-lib/comparison.tex:119-124`).
- `StandardPartialOrder` is the library's trait for a partial order. The team's comment says: "This is primarily for floating-point values" (`FortressLibrary.fss:219-221`, `.fsi:174-175`). `RR64` and `RR32` extend it (`FortressLibrary.fss:410`, `FortressBuiltin.fss:205`). Its default `<` is `LessThan = (self CMP other)` (`FortressLibrary.fss:230`): it answers `false` where `CMP` answers `Unordered`.
- The pairs and triples (`FortressLibrary.fss:4662-4770`) bound each element type by `StandardPartialOrder` and decide by the elements' `CMP` (F-92). Each of the eight `typecase` blocks has an arm `Unordered => false` (`:4669`, `:4680`, `:4691`, `:4702`, `:4726`, `:4738`, `:4750`, `:4762`). Their `CMP` combines the elements' `CMP` by `LEXICO`. Climb batch 13's rung O built them for row 634's tuple half and chose `false` because `RR64`'s own `<` answers `false` (`explorations/compile-ladder/rung-tuple-orders/REPORT.md:22-25`; row 672 notes). Where the earlier elements are `EqualTo`, each tuple operator calls the last element's own operator, as `b1 < b2` (`:4667`, `:4678`, `:4689`, `:4700`; triples `:4724`, `:4736`, `:4748`, `:4760`). Walk gives `(nan,1) < (1.0,1)` `false`, `(1,nan) < (1,1.0)` `false` and `(nan,1) CMP (1.0,1)` `Unordered` [6]. `ProjectFortress/tests/TupleOrderBounds.fss:11-19` and `:28-33` assert these values, and its `:19` pins `nan < 1.0` as `false` with the message "today's value".
- Lists: on the compiled checker, a list is ordered only where its element type extends `StandardTotalOrder`. A list of floats has no `<` and no `CMP` there; its `=` stays (P-154). P-154's reason names NaN: "Floats and `QQ` are only partially ordered, since NaN, and `QQ`'s 0/0, compare with nothing." Walk still orders every list (row 774), with the stop above.
- Row 440, the rational sibling: the specification makes `QQ`'s 0/0 unordered with itself "for compatibility with floating-point arithmetic", so that its five comparisons answer `false` and its `CMP` `Unordered`. Walk answers `0/0 = 0/0` with `true` and `0/0 CMP 0/0` with `EqualTo` (row 440). The other rational answers already follow the chapter: `-1/0 < 2 true, 2 < 1/0 true, 0/0 < 2 false, 2 >= 0/0 false, 0/0 CMP 2 Unordered` [9].

References for section 2

1. `.claude/skills/fortress-repo/references/interpreter.md`, "Natives".
2. `simpleDoubleArith.java:44-46`: `public static boolean doubleLT(double a, double b) { return a < b; }`, and the same form at `:48`, `:52`, `:56`. These four are the team's (`a874948ac:ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:44-56`). `doubleMin` and `doubleMax` are the revival's (`17b9f6b58`, 2026-11-03).
3. `grep -rn 'Float\$Less\|Float\$Greater\|Float\$Min\|Float\$Max\|RR32\$Less\|RR32\$Min' Library ProjectFortress/LibraryBuiltin` printed nothing.
4. Probe `NanCmpCompiled.fss`, with `c = nan CMP 1.0` in `run()`: `bin/fortress compile` printed "... is not applicable to an argument of type (RR64, FloatLiteral)." and "File NanCmpCompiled.fss has 1 error.", exit 255.
5. `.claude/skills/fortress-repo/references/compiler.md`, "Natives" (`compiler/BuiltinPrimitiveRewriter.java`).
6. Probe `NanWalk.fss`, run by `bin/fortress NanWalk.fss`, exit 0, last line "done, nothing raised". Its lines: `nan: RR64 = 0.0/0.0`, `one: RR64 = 1.0`, `n32: RR32 = z / z` with `z: RR32 = narrow(0.0)`, and one `println` per line of output above, as `println "RR64: nan < 1.0 " (nan < one) ...`. The lists are built from `onef: RR64 = 2.0 - 1.0`, because walk keeps `one` a `FloatLiteral` and then refuses a list of it beside a list of `Float` (the row 364 effect). Signed zeros: `(-0.0) MIN 0.0 -0.0, 0.0 MIN (-0.0) -0.0, 0.0 MAX (-0.0) 0.0`.
7. Probe `NanCompiled.fss`, compiled by `bin/fortress compile` (exit 0) and run by `bin/fortress run NanCompiled` (exit 0, last line "done, nothing raised"). It binds the helpers in its own declarations, as `dLT(a:RR64, b:RR64):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleLT")`, the form of `compiler_tests/NativeHelperFamilyFloatCompiled.fss:8-11`. Signed zeros: `(-0.0) MIN 0.0 -0.0, 0.0 MIN (-0.0) 0.0, 0.0 MAX (-0.0) 0.0, (-0.0) MAX 0.0 -0.0`.
8. Probe `NanWalkList2.fss`: `println "..." (<|onef,nan|> < <|onef,onef|>)`, exit 1, with the message quoted above at `Library/RangeInternals.fss:1320:21-58`.
9. Probe `QqTwin.fss`: `inf: QQ = 1/0`, `ninf: QQ = -1/0`, `ind: QQ = 0/0`, `two: QQ = 2`; output `QQ: -1/0 < 2 true, 2 < 1/0 true, 0/0 < 2 false, 2 >= 0/0 false, 0/0 CMP 2 Unordered, 1/0 MAX 2 1/0`, exit 0.

## 3. The team's sources, and which way they point

### 3.1 The two passages

- The overview of operators, `Specification/basic/operators/opr-overview.tex:281-288`: "The operators <, ≤, ≥, and > are used for numerical comparisons and are supported by integer, rational, and floating-point types. Comparison of rational values throws RationalComparisonError if either argument is the rational infinity 1/0 or the rational indefinite 0/0. Comparison of floating-point values throws FloatingComparisonError if either argument is a NaN." The float sentence has a twin for the rationals in the same paragraph.
- The rationals chapter, `Specification/basic-lib/numbers.tex:369-378`: "The rational values are totally ordered except for 0/0, which is unordered with respect to all other rational values; moreover, for compatibility with floating-point arithmetic, 0/0 is unordered with respect to itself, and therefore these five comparison operators always return false if either argument is 0/0. The value −∞ is less than any finite rational value, and +∞ is greater than any finite rational value." The first clause, up to "except for 0/0", is the revival's (`d9c415395`); the rest is the team's [1].
- So the chapter contradicts the overview twice. It gives the rationals `false` at 0/0 and an order at the infinities, where the overview raises at both. And its reason, "for compatibility with floating-point arithmetic", says that floats answer `false` at a NaN.
- Two other passages agree with the chapter. The overview's own `MAX` and `MIN` passage gives floats a NaN result and `MAXNUM` and `MINNUM` the number (`opr-overview.tex:241-252`). The comparison chapter gives a partial order's `CMP` the fourth value `Unordered` (`advanced-lib/comparison.tex:119-124`).

### 3.2 Their history

- `git log --follow` on each file lists the conversion's 146 parentless snapshots, and `git blame` credits every team line to `^5a68404fd` (David Chase, 2012-07-19), a seam of the conversion. Neither shows who wrote the lines [2].
- The real commits, with parents: Sukyoung Ryu added the overview's file on 2009-10-29 (`7e6e40458`, "[spec] Added some sections in the Expressions chapter."). Its comparison sentences entered on 2009-11-06 (`0f49d8698`, "[spec] Added the entire spec files. The next task is to integrate the technical decisions since 1.0."). She added the rationals chapter on 2009-11-03 (`6d53c0fc4`, "[spec] Added libraries."). Christine Flood updated the copyright notices of both on 2011-02-02 (`2f8b4331a`). No other team commit with a parent touched either file [3].
- Neither sentence changed after its import. The passages at `0f49d8698` and `6d53c0fc4` read as at the team's last commit `a874948ac` [4].
- Neither sentence is in the 1.0 release of 2008-03-31 (`Specification-1.0-frozen/fortress.1.0.pdf`). That release already lists `FloatingComparisonError` among the library's exceptions, and `StandardPartialOrder` as "primarily for floating-point values" [5].
- So both sentences were written between March 2008 and November 2009, outside this repository. Git cannot say which of the two is later, nor who wrote either of them. It shows only that Ryu committed both, three days apart.
- The 2012 restart, a new specification that the team began and left unfinished, copied the overview's paragraph word for word: `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:270-277`. It came in Guy Steele's merge `2c7f634c7` of 2012-05-28, of his commit `91e71e62e`: "(1) Spec has new directory Language/Operators with many files". The restart has no library chapters: `Prose/Libraries/libraries.tick` is a stub of 19 lines whose inputs are commented out. So it has no rationals passage. P-25 gives the restart standing beside `Specification/` for its Types chapter only [6].

### 3.3 The library as the team wrote it

- **The exception.** The interpreter's library has declared it since before the record began. The root commit `72ae6881b` (2007-01-04, `jm143038`, Jan-Willem Maessen) declares `FloatingComparisonException` (`ProjectFortress/FortressLibrary.fss:143` there). Sukyoung Ryu renamed it `FloatingComparisonError` on 2007-10-11 (`0810cf5c9`, "Renamed some exception names to drop Exception in their names."). The compiler's library declares it since Eric Allen's `e7f37cb55` (2009-06-09, `CompilerLibrary.fss`) and Guy Steele's `9aa75a5a2` (2011-06-14, `CompilerLibrary.fsi`). So the declarations date from 2007, 2009 and 2011, not 2012. At the team's last commit, the name occurs only in five declarations and in three copies of the overview's sentence: the specification, its frozen copy of 2012-01-04 and the 2012 restart. No body, test or comment raises it [7].
- **The order design.** Maessen's commit "Equality, partial ordering, and total ordering" (`91ab8926a`, 2007-12-06) wrote `StandardPartialOrder`, "primarily for floating-point values", and `Unordered`, "the outcome of a CMP b when a and b are partially ordered and no ordering relationship exists between them" (now `FortressLibrary.fss:149-150`, `:219-221`). His "Slightly better treatment of IEEE FP, and better treatment of MIN and MAX" (`cfe16b43b`, 2008-05-06) wrote that for floats "NaN counts as a bottom that is less than anything else but doesn't actually participate in the standard total ordering" (now `:237-243`), and the `MINNUM` and `MAXNUM` comment: "MINNUM and MAX form a lattice with NaN at the top" (now `:503-505`) [8]. A partial order whose `CMP` answers `Unordered`, and whose `<` derives from that `CMP`, answers; it does not raise.
- **Steele on NaN and equality.** His `QQ` comment, "Note that 0/0 = 0/0 is supposed to be true (//unlike// the behavior of floating-point NaN)" (`dc41d5000`, 2008-07-21; now `FortressLibrary.fss:596`), takes the float rule to be IEEE's.
- **Walk's natives.** The team's glue gave Java's answers: `Float$Less` is `return x < y;` and `Float$Min` is `Math.min(x, y)` (`interpreter/glue/prim/Float.java:256-290`, unchanged at these lines since `a874948ac`), and the same for `RR32` (section 2.1).
- **The compiled prelude.** Guy Steele's `da5291587` (2011-07-22, "Added ZZ32 and ZZ64 operators, ... MIN, MAX, MINMAX, ... and method isNaN") wrote `isNaN` as `NOT (self = self)` and the NaN-aware `MIN`, `MAX`, `MINNUM` and `MAXNUM` of `CompilerBuiltin.fss:935` and `:948-951`. Their bodies need `<=` and `>=` to answer `false` at a NaN. This is the latest team work on the point that this review found. It is later than the Working Draft, whose last edit of content is of 2010-12-09 and which P-7 dates 2011-02-02. And the team built the `false` alike for both float types, on both paths. P-26 counts code built alike for all its types as a decision [9].
- **The team's tests.** `ProjectFortress/tests/realArith.fss` (in the root commit, 2007) and `testRR32.fss` (Sukyoung Ryu, `9a842ffca`, 2008-07-09, "Implemented RR32 with Guy") assert that `x MIN NaN` and `x MAX NaN` are NaN, that `x MINNUM NaN` and `x MAXNUM NaN` are `x`, and that `NaN.check` is `Nothing` (`realArith.fss:31-32`, `:87-98`; `testRR32.fss:42-43`, `:87-98`). No team test compares a float with a NaN by `<`, `<=`, `>`, `>=` or `CMP` [10]. Steele's `RationalTest.fss` (`dc41d5000`) asserts `MAX`, `MIN`, `MAXNUM` and `MINNUM` at 1/0, -1/0 and 0/0 (`:444-602`), which the team's `QQ` computes with `<` and `>`. So the team's own test contradicts the overview's rational twin.
- **The team's programs.** `ProjectFortress/demos/aStar.fss:23`: "Example instantiations for Cost are ZZ32 and RR64 (disallowing NaN)." `demos/BiCGSTAB.fss:253` and `BiCGSTAB2.fss:231`: "Thus, we need to avoid NaN." The programmers kept the NaN out of their programs. They did not rely on a raise.

### 3.4 Which way they point

- **The library as the team wrote it points to `false`.** Its four operators, its `CMP` design with `Unordered`, its trait comments, the 2011 prelude's `MIN` and `MAX` bodies and its tests all assume that a comparison with a NaN answers. The one trace the other way is the declaration of `FloatingComparisonError`, which nothing raises.
- **The team's texts conflict.** The overview raises. The rationals chapter, the comparison chapter and the overview's own `MAX` passage answer. By git, neither of the two main passages is later than the other.
- **The team's later word points to `false`, with one doubt.** The latest team work on the point is the 2011 prelude code, which needs `false`. The 2012 restart's copy of the overview's sentence is later in date, but it is a copy into a new folder, not work on the point. P-26 dates "later" by "the team's work on the point at issue". Whether a word-for-word copy counts as such work is the curator's reading. If it counts, the later word splits.
- Because the texts conflict, the peers weigh too (section 4).

References for section 3

1. `git blame -w -L 368,378 Specification/basic-lib/numbers.tex`: line 372 `d9c4153953 (Claude 2026-09-27)`, lines 373-378 `^5a68404fd (David Chase 2012-07-19)`.
2. `git log --follow --format='%h %ad %an %s' -- Specification/basic/operators/opr-overview.tex` lists 2012 commits such as "Added odd random longs to MagicNumbers"; `git log --full-history --format='%h %p' HEAD -- <file> | awk 'NF==1' | wc -l` printed 146 for each file; `git blame -w -L 280,290` credits every line to `^5a68404fd`. `research/authorship.md:14-22` describes the cut.
3. `git log --full-history --format='%h %p|%ad %an | %s' HEAD -- <file>`, keeping commits with a parent: for the overview `7e6e40458` (2009-10-29), `0f49d8698`, `2f8b4331a` and two revival commits; for the chapter `6d53c0fc4`, `2f8b4331a` and revival commits. `git log -S'FloatingComparisonError}' --full-history a874948ac` and `git log -S'for compatibility with floating-point arithmetic' --full-history a874948ac`, keeping commits with a parent, give `0f49d8698` and `6d53c0fc4`, and the 2012 merge `f85e96424` for the restart's copy.
4. `git show 0f49d8698:Specification/basic/operators/opr-overview.tex`, lines 280-284, and `git show 6d53c0fc4:Specification/basic-lib/numbers.tex`, lines 381-386, read word for word as `a874948ac`'s lines 274-278 and 375-380.
5. `pdftotext Specification-1.0-frozen/fortress.1.0.pdf` (creation date 2008-03-31): no match for "throws Floating", "respect to itself" or "indefinite"; line 7479 `object FloatingComparisonError extends UncheckedException`; line 7256 "StandardPartialOrder is partial ordering using <, >, ≤, ≥, =, and CMP. This is primarily for floating-point values."
6. `operator-overview.tick:276-277`: "Comparison of floating-point values throws \TYP{FloatingComparisonError} if either argument is a \TYP{NaN}." `git show --stat 2c7f634c7` (parents `91e71e62e 35da9064a`); `Documentation/Specification/Prose/Libraries/libraries.tick` (19 lines, `%\input{\librariesdir/xxx}`). P-25.
7. `git show 72ae6881b:ProjectFortress/FortressLibrary.fss` lines 140 and 143; `git show 0810cf5c9` (`-object FloatingComparisonException`, `+object FloatingComparisonError`); `git show e7f37cb55` and `git show 9aa75a5a2`, one added declaration each; `git grep -n FloatingComparison a874948ac`: five declarations (`CompilerLibrary/FortressLibrary.fsi:1027`, `Library/CompilerLibrary.fsi:79`, `Library/CompilerLibrary.fss:206`, `Library/FortressLibrary.fsi:1014`, `Library/FortressLibrary.fss:1524`) and three sentences (`Specification/basic/operators/opr-overview.tex:277`, `Specification-1.0-frozen/basic/operators/opr-overview.tex:277`, `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:277`). The frozen copy is Guy Steele's "Cloned Specification directory into Specification-1.0-frozen" (`c02fa44d0`, 2012-01-04).
8. `git log -S'<phrase>' --full-history a874948ac`, keeping commits with a parent, gives the oldest commit for each phrase: `91ab8926a` for "This is primarily for floating-point values" and "Unordered is the outcome of a CMP b"; `cfe16b43b` for "NaN counts as a bottom" and "form a lattice with NaN at the top"; `dc41d5000` for "unlike// the behavior of floating-point NaN". `git grep -F` at `a874948ac` finds each in the team's library.
9. `da5291587` is one of the parentless snapshots, but the file's commit before it, `f06d6e893` (David Chase, 2011-07-21), has no `isNaN` in `CompilerBuiltin.fss`, and `da5291587` has it at `:308-323`. The Working Draft's dates: `explorations/reviews/later-word-ask.md:20` and P-7. P-26: "Code is a decision where the team ... built it alike for all its types".
10. `git grep -n -E '0\.0 ?/ ?0\.0|isNaN|MAXNUM|MINNUM|FloatingComparison|\bNaN\b' a874948ac -- '*.fss'` outside the libraries: only `realArith.fss`, `testRR32.fss`, `RationalTest.fss` (`MAXNUM` and `MINNUM` lines) and the three demo comments.

## 4. The peers, as context

- **IEEE 754.** NaN is unordered with every value, itself included. The standard's predicates `<`, `≤`, `≥` and `>` are *signaling*: they signal the invalid-operation exception when an operand is a NaN. `=` and `≠` are *quiet*: they never signal. The standard also has a quiet version of each ordering predicate. By default, a signaled exception does not stop the program. The comparison delivers `false` and sets the invalid-operation status flag, which a program can test later. A trap, which stops the program, is an optional handling that the standard recommends but does not require [1]. The JVM offers neither the flag nor the trap: its floating-point instructions do not "signal the IEEE 754 exceptional conditions", and it "does not support IEEE 754 signaling floating-point comparisons" [2]. So neither path can build IEEE's default exactly. Today's `false` is IEEE's default without the flag. A raise is IEEE's signaling comparison with the trap on, built in software.
- **Java.** "The numerical comparison operators `<`, `<=`, `>`, and `>=` return `false` if either or both operands are NaN" [2]. `nan < 1.0` and `nan >= 1.0` are `false`, `nan == nan` is `false`. `Math.max` and `Math.min` give NaN. `Double.compare` is a total order: it puts NaN above all numbers and equal to itself, and `Arrays.sort` puts NaN last. Nothing raises [3].
- **Swift.** `<` calls `isLess(than:)`: "If either this value or `other` is NaN, the result of this method is `false`." `isTotallyOrdered(belowOrEqualTo:)` gives a total order "including signed zeros and NaNs". `minimum` and `maximum` give "whichever is a number if the other is NaN". No comparison is documented to trap [4].
- **Python.** For `float`, `nan < 1.0` is `False` and nothing raises. `max(nan, 1.0)` is `nan` but `max(1.0, nan)` is `1.0`: the answer depends on the order of the arguments. `sorted([3.0, nan, 1.0, 2.0])` gives `[3.0, nan, 1.0, 2.0]`, an unsorted list, without any warning. Python's decimal type raises: `Decimal('NaN') < 1` raises `InvalidOperation` in the default context, while `==` and `!=` stay quiet, and `Decimal('NaN').compare(1)` answers `NaN`, a fourth value like `Unordered`. With the trap off, `<` answers `False` and sets the flag. This is the one peer here that raises by default, and it raises exactly where option (b) of section 6 would: at the four ordering operators, not at equality, and not at its three-way comparison [5].
- **Julia.** "`NaN` is not equal to, not less than, and not greater than anything, including itself." `<` "implements a partial order". `isless` orders NaN after all numbers, for sorting, and `isunordered` tests for NaN. `max` and `min` on floats give NaN if either argument is NaN. No comparison raises. Julia raises earlier instead, at some operations that would make a NaN: its math library has a helper "for converting NaN return to DomainError" [6].
- **Haskell (GHC).** `<`, `<=`, `>` and `>=` on `Double` answer `False` at a NaN; GHC's source cites IEEE 754-2008 §5.11 for it. `compare` answers `GT` for a NaN on either side, which GHC's comment says "violates the IEEE standard and does not define a total order". `min` and `max` depend on the order of the arguments: "'min' NaN 1 is 1, but 'min' 1 NaN is NaN". Nothing raises [7].
- **In short.** All five languages answer `false` for `<` on a binary float, and none raises by default. IEEE signals at the four ordering predicates, by default only through a flag. Python's decimal type traps that signal by default, so its `<` raises.

References for section 4

1. Wikipedia, "NaN", section "Comparison with NaN" (fetched 2026-11-05), which cites IEEE 754-2019 §5.11: the equality and inequality predicates are non-signaling; the other standard comparison predicates "are all signaling if they receive a NaN operand", and the signaling versions "signal the invalid-operation exception"; by default this "just sets the corresponding status flag". Wikipedia, "IEEE 754", section on exception handling: each exception "returns a default value and has a corresponding status flag"; "The traps and other exception mechanisms remain optional, as they were in IEEE 754-1985." The standard's own text is not in the repository; these points rest on those summaries.
2. The Java Virtual Machine Specification, SE 21, §2.8: "The floating-point instructions of the Java Virtual Machine do not throw exceptions, trap, or otherwise signal the IEEE 754 exceptional conditions of invalid operation, division by zero, overflow, underflow, or inexact." and "The Java Virtual Machine does not support IEEE 754 signaling floating-point comparisons, and has no signaling NaN value." The Java Language Specification, SE 21, §4.2.3, for the comparison operators; §4.2.4 lists no exception of a floating-point operator other than for unboxing and boxing (both fetched 2026-11-05).
3. `NanJava.java`, run by `java NanJava.java` on OpenJDK 25.0.4.1: `Java: nan < 1.0 false, nan >= 1.0 false, nan == nan false`; `Math.max(nan, 1.0) NaN, Math.min(1.0, nan) NaN`; `Double.compare(nan, 1.0) 1, Double.compare(nan, nan) 0, Double.valueOf(nan).equals(nan) true`; `Arrays.sort -> [1.0, 2.0, 3.0, NaN]`.
4. `https://raw.githubusercontent.com/swiftlang/swift/main/stdlib/public/core/FloatingPoint.swift`, the doc comments of `isLess(than:)`, `isTotallyOrdered(belowOrEqualTo:)`, `minimum(_:_:)` and `maximum(_:_:)` (fetched 2026-11-05). Swift is not installed here, so this is documentation, not a run.
5. `python3 -I` (Python 3.13.16): `float: nan < 1.0 False | nan >= 1.0 False | nan == nan False`; `max(nan, 1.0) nan | max(1.0, nan) 1.0`; `sorted([3.0, nan, 1.0, 2.0]) [3.0, nan, 1.0, 2.0]`; `Decimal: NaN < 1 raises InvalidOperation`; `Decimal: NaN == 1 -> False | NaN != NaN -> True`; `Decimal('NaN').compare(1) -> NaN`; with `traps[InvalidOperation] = False`: `NaN < 1 -> False | flag set: True`.
6. Julia's manual, "Mathematical Operations", "Numeric Comparisons"; the docstrings of `<`, `isless` and `isunordered` in `https://raw.githubusercontent.com/JuliaLang/julia/master/base/operators.jl`; `min` and `max` for `AbstractFloat` and the comment on `nan_dom_err` in `base/math.jl` (all fetched 2026-11-05). For `Float64`, `max` delegates to `max_float`, whose NaN rule this review did not read. Julia is not installed here.
7. `https://raw.githubusercontent.com/ghc/ghc/master/libraries/ghc-internal/src/GHC/Internal/Classes.hs`, `instance Ord Double` and its comment (fetched 2026-11-05). GHC is not installed here.

## 5. The model program's exposure

### 5.1 Where a float comparison or a reduction can meet a NaN

The flat program, `explorations/run-c4/src/MicroGptFlat.fss`:

- `:28`, the softmax `sm`: `exp(z - (BIG MAX z))`. `BIG MAX` reduces by `MAX` (`Library/FortressLibrary.fss:3484-3491`), which on floats is Java's `Math.max`. A NaN in `z` gives a NaN [1]. No comparison operator takes part. `sm` runs on each row of the attention scores and of the output logits (`:59`, `:61`).
- `:60`, the ReLU: `mr = 0.0 MAX m0`, the library's `MAX` of a scalar and an array (`FortressLibrary.fss:4952`), element by element. A NaN element stays a NaN [2].
- `:64`, the ReLU's gradient: `dM0 = (dX4 f2) × (m0 > 0.0)`. The vocabulary's `opr >` (`explorations/run-c4/src/FlatArrays.fss:29`) compares each element with `e > s`, which is `RR64`'s `>` (`FortressLibrary.fss:444`), so `Float`'s `>` and the helper `doubleGT`. This is the program's only float comparison operator. Today a NaN element gives the mask value `0.0` [2].
- `:29`, the causal mask, compares integers (`j > i`). `FlatData.fss` compares only integers, as at `:22`, `:31`, `:38-39` (`e10`, from `strToInt`), `:49`, `:53`, `:73` and `:117`.
- The program has no float `<`, `<=`, `>=`, `CMP` or `MIN`, and no comparison of tuples or lists of floats.

The APL program, `explorations/apl/mg/MicroGptApl.fss`, has the same three:

- `:42`, `sm`, the same line as the flat program's.
- `:87`, `Mr←0⌈M0`, which the APL grammar expands to `0.0 MAX (r)` (`explorations/apl/mg/AplMgSyntax.fsi:224-225`).
- `:90`, `dM0←(dX4+.×f2)×M0>0`, which expands to `(l) × ((m) > 0.0)` (`AplMgSyntax.fsi:221-222`), the `opr >` of `explorations/apl/mg/FlatArrays2.fss:36`, again `e > s`.
- `:43` (`∘.≥`) and `:82` (`∘.>`) compare integers: the outer products `outerGt`, `outerGe` and `outerLt` take `ZZ32` vectors (`explorations/apl/mg/AplMg.fss:25-30`).

The four check programs compare each result with its reference value: `ok = diff <= tol` (`MicroGptFlatQuick.fss:25`, `MicroGptFlatCheck.fss:23`, `MicroGptAplQuick.fss:27`, `MicroGptAplCheck.fss:25`). `diff` is a `BIG MAX` of absolute differences (`MicroGptFlatQuick.fss:29`), so it is a NaN if any value is a NaN. Today such a `diff <= tol` answers `false`, and the check counts a FAIL [2].

### 5.2 How many comparisons

- At batch 1, `m0` is `x3 f1^T`: 16 rows (one per position, `blockSize` 16) by 64 columns (`4 nEmbd`) (`MicroGptFlat.fss:17`, `:40-41`, `:60`). So each training step makes 1K float comparisons, all at `:64`.
- The same step makes about 64K multiply-adds forward: the three projections 12K, the attention scores and their product with the values 8K, the output projection 4K, the two MLP products 32K and the logits 7K. The backward pass makes about twice as many. So a step makes about 0.2M multiply-adds. This is an estimate from the shapes, not a count of a run.
- So the comparisons are about 0.5% of a step's float operations.

### 5.3 What `false` does now, and what a raise would do

Today's runs make no NaN. The quick pair passed every check at a tolerance of 10^-12, and the loss of each step equals the reference to the last digit or two [3].

If a NaN reached `m0` at some step, today's `false` would let the run go on:

- In the forward pass, `0.0 MAX m0` keeps the NaN, so a row of `x4` becomes NaN, `sm` gives a NaN row of probabilities, and the loss becomes NaN [2].
- In the backward pass, the mask gives `0.0` at the NaN element, but `dX4 f2` is already NaN in that row, and NaN times `0.0` is NaN [2]. So the gradients become NaN, Adam writes the NaN into the parameters, and the later losses are NaN.
- These three points are traced from the program's lines and the probes, not from a run of the model with a NaN.
- The run goes to its end. It prints `loss NaN` at each later step (`MicroGptFlat.fss:95`). A check program prints FAIL for each check, then its VERDICT line, then stops with `fail(...)` (`MicroGptFlatQuick.fss:57-58`).

Under a raise (option (b) or (c)), the same NaN would stop the run:

- The run stops in the backward pass of the first step whose `m0` holds a NaN, at `e > s` in `FlatArrays.fss:29`, with `FloatingComparisonError` and walk's `Context:` lines. That step prints no loss line. Walk's report has this form [4]:

      step 1 loss 3.29
      .../NanRaise.fss:5:3-31:
      FloatingComparisonError
      Context:

- A check program stops at its first `diff <= tol` with a NaN `diff`, before its VERDICT line. `mg-run.sh` then finds no VERDICT line, only a nonzero exit.
- A NaN that reaches no comparison changes nothing. For example, a NaN loss from `0 × log 0` at a padded position (`vm` is 0 there, `:61`) meets no comparison, because the gradient `dL` uses the probabilities, not their logarithm (`:63`). Both options then print the same NaN loss and go on.

So a raise would end a training run that goes wrong at the first NaN that meets the ReLU's mask, near its cause. It is no general detector: a NaN that meets no comparison passes under either option. The explicit tests are `isNaN`, and `check` and `check*`, which the specification gives for this purpose (`Specification/basic-lib/numbers.tex:58-72`).

References for section 5

1. Probe `NanWalk.fss` (section 2, reference 6): `BIG MAX over [1.0, nan, 1.0] NaN`.
2. Probe `NanMask.fss`, which copies `FlatArrays.fss:29`'s `opr >` and sets `m0` to `[1.0, nan, -1.0]`; `bin/fortress NanMask.fss`, exit 0: `m0 > 0.0 (the ReLU mask) = 1.0 0.0 0.0`; `0.0 MAX m0 (the ReLU) = 1.0 NaN 0.0`; `NaN times the mask's 0.0 = NaN`; `the check's diff <= tol at a NaN diff = false`.
3. `explorations/coordinator/tools/mg-run.sh tmp/mg nanrev` in the seeded worktree, exit 0: `MicroGptFlatQuick.txt`: `batch 1 step 1 loss 3.3659669475848513 vs 3.365966947584851 (8528 ms): diff 4.440892098500626E-16 PASS`, `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0 secs=70`; `MicroGptAplQuick.txt`: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0 secs=77`.
4. Probe `NanRaise.fss`: `println "step 1 loss 3.29"` then `throw FloatingComparisonError`; `bin/fortress NanRaise.fss`, exit 1, output as quoted, then `toplevel:`. This shows the form of the stop; no path raises the exception from a comparison today.

## 6. The options

A *rung* is one task of a batch, which an agent builds and which lands with the batch (P-30). Each option below is about one rung.

### (a) Keep `false`, as landed, and revise the overview's sentence to the rationals chapter's reading

What a program sees: no change. `<`, `<=`, `>` and `>=` answer `false` when either side is a NaN, `CMP` answers `Unordered`, `=` answers `false`, `MAX` and `MIN` give the NaN, and `MAXNUM` and `MINNUM` give the number.

- **Specification.** `opr-overview.tex:287-288` would say, for example, "Comparison of floating-point values by these four operators returns false if either argument is a NaN, and CMP returns Unordered." Beside it goes a `\revision` callout, and in the revival section of Appendix I (`Specification/appendices/changes.tex`) an entry. The entry quotes the original text (`Specification-1.0-frozen/basic/operators/opr-overview.tex:277-278`), gives the rationale, the effect (none on programs), what a return to the raise would need (option (b)) and the curator's decision. Then the preamble's paragraph is checked, and the reasoning goes into a `decision-record.md` [1].
- **A choice inside (a): the rational twin.** The sentence before it (`:284-286`) is false today in the same way. The chapter gives 0/0 `false` and orders the infinities (`numbers.tex:372-378`); walk answers so (section 2.4); the team's `QQ` and `RationalTest.fss` agree. One Appendix I entry can revise both sentences, or the twin can wait for its own decision.
- **Library, natives, helpers, glue classes.** No change on either path. `FloatingComparisonError` stays declared in both libraries, unused, as the team left it.
- **Tests.** `TupleOrderBounds.fss:19` keeps its value; only its message, "today's value", becomes the rule. A new walk test asserts the rule at `RR64` and `RR32`: the four operators with a NaN on each side, and `CMP`. Asserts of the helpers at a NaN go into `compiler_tests/NativeHelperFamilyFloatCompiled.fss` and `NativeHelperFamilyRR32Compiled.fss`, which test no NaN comparison today (they bind `doubleLT` to `doubleGE` at `:8-11`, and `floatLT` to `floatGE` at `:14-17`). Row 672 closes.
- **Size.** One small rung: the specification and tests, no Java or Scala, so no build of the implementation.
- **Speed.** None.

### (b) Raise from `<`, `<=`, `>` and `>=` on both paths when either side is a NaN; `CMP` still answers `Unordered`; `MAX` and `MIN` as the specification says

What a program sees: `nan < 1.0` raises `FloatingComparisonError`. `CMP` answers `Unordered`. `=` answers `false`. `MAX`, `MIN`, `MAXNUM` and `MINNUM` keep today's answers.

- **Natives (both paths).** Eight new helpers: four in `simpleDoubleArith.java`, beside `:44-58`, and four in `simpleFloatArith.java`, beside `:47-61`. Each would read, for `<`: `if (a < b) return true; if (a >= b) return false; throw Utility.makeFortressException("fortress.CompilerLibrary$FloatingComparisonError");`.
  - This is the library's way for a helper to raise (`compiler/runtimeValues/Utility.java:45-60`), which `DIV` by zero uses for `DivisionByZero` (`simpleIntArith.java:43`). The way needs an exception that both libraries declare as an object (`references/interpreter.md`, "Natives"). `FloatingComparisonError` is one (`CompilerLibrary.fsi:99`, `FortressLibrary.fsi:1187`). The compiled class exists, with the same public constructor as `DivisionByZero`'s [2]. Under walk, `StaticNativeApp.raised` maps the name to the one library's object (`interpreter/glue/StaticNativeApp.java:214-223`). Only a test can show that the raise reaches a `catch` on both paths.
  - Why new helpers, and not an edit of `doubleLT` to `doubleGE`: the compiler's prelude binds those (`CompilerBuiltin.fss:207-210`, `:940-943`), and its `MIN`, `MAX`, `MINNUM` and `MAXNUM` (`:948-951`) reach their `isNaN` arm only because `<=` and `>=` answer `false`. A raising `doubleLE` would make the compiled `nan MIN 1.0` raise until the switch-over, against `opr-overview.tex:246-250`. The prelude's text is not to be edited (`references/compiler.md`, "The compiler's prelude, until the switch-over"). The compiled test `NativeHelperFamilyFloatCompiled.fss:8-11` also binds the old helpers.
  - So compiled programs keep `false` until the switch-over, and raise once they run on the one library. A compiled test that binds the new helpers shows the raise on the compiled path now.
- **Bindings.** `FortressBuiltin.fss:85-92` (`Float`) and `:250-257` (`RR32`) name the new helpers. The apis do not change. `RR64`'s own four operators (`FortressLibrary.fss:442-445`) forward to `Float`'s and need no change.
- **`CMP`.** `FortressLibrary.fss:446-451` and `FortressBuiltin.fss:258-263` are written with `<` and `>`, so they would raise too. Each must test for a NaN first, as `if self.isNaN OR b.isNaN then Unordered elif ...`. Two bodies.
- **`MAX`, `MIN`, `MAXNUM`, `MINNUM`.** No change in the one library: they use no ordering operator (section 2.1).
- **Tuples: a choice inside (b).** The pairs and triples decide by `CMP`, so `(nan,1) < (1.0,1)` stays `false`. But where the earlier elements are `EqualTo`, they call the last element's own operator (`FortressLibrary.fss:4667`, `:4678`, `:4689`, `:4700`, `:4724`, `:4736`, `:4748`, `:4760`). So `(1,nan) < (1,1.0)` would raise, while `(nan,1) < (1.0,1)` answers `false`. Either the tuples keep that split (b1), or those eight arms go through `CMP` too, so that a tuple never raises (b2).
- **Other library code.** Each library body that compares floats becomes a place that can raise at a NaN. This review did not count them.
- **Specification.** The overview's float sentence then holds. The rationals chapter's reason "for compatibility with floating-point arithmetic" (`numbers.tex:374`) no longer fits, because 0/0 would answer `false` where a float raises. It needs a revision too, or `QQ` would follow the floats and raise at 0/0, against the rest of that chapter and against row 440's reading. One Appendix I entry either way.
- **Tests.** `TupleOrderBounds.fss:19` changes from `false` to a raise, caught in a `try`. Nothing else in it changes under (b1) or (b2), because none of its asserts reaches an `EqualTo` arm with a NaN. New: a walk test of the four operators raising at `RR64` and `RR32` with `CMP` answering `Unordered`, and a compiled test that binds the new helpers. `realArith.fss`, `testRR32.fss` and `NativeHelperFamilyRR32Walk.fss:229-240` stay, because they meet a NaN only through `MIN`, `MAX`, `MINNUM` and `MAXNUM`.
- **Size.** One rung: Java on both paths with a build of the implementation (2 to 3 minutes for each edit, `references/build-and-caches.md`, "Building"), 8 bindings, 2 `CMP` bodies, 0 or 8 tuple arms, an Appendix I entry and about three tests.
- **Speed.** See "The speed of a NaN test" below.

### (c) Raise from every comparison, `CMP` included

What a program sees: as (b), and `nan CMP 1.0` raises too. `=` still answers `false`, because the prelude's `isNaN` is `NOT (self = self)` (`CompilerBuiltin.fss:935`).

- **Natives and bindings.** As (b).
- **`CMP`.** No rewrite: with (b)'s helpers, the bodies at `FortressLibrary.fss:446-451` and `FortressBuiltin.fss:258-263` raise by themselves at `self<b`.
- **Tuples.** They then raise wherever a NaN element is compared, because they decide by `CMP`. The `Unordered => false` arms are no longer reached for floats.
- **The library's design.** No float ever answers `Unordered`. The team's comments that `StandardPartialOrder` is "primarily for floating-point values" (`FortressLibrary.fss:219-221`, `.fsi:174-175`) and that `Unordered` is the result for partially ordered values (`:149-150`) no longer describe any float. `RR64` still cannot become a total order, because `nan = nan` is `false` (section 2.3). The comparison chapter's sentence on `Unordered` (`advanced-lib/comparison.tex:119-124`) then fits `QQ` only.
- **Tests.** In `TupleOrderBounds.fss`, 13 asserts change from an answer to a raise: `:13-19` and `:28-33`. `:12` stays `LessThan`, because the lazy `LEXICO` does not compare the second elements when the first decide (`ProjectFortress/tests/ComparisonLazyLexico.fss`). New walk and compiled tests as in (b).
- **Specification.** As (b), and a sentence on floats beside the comparison chapter's `Unordered`.
- **Size.** One rung, like (b), with fewer library lines and more test and comment changes.
- **Speed.** As (b): the model program calls no `CMP`.

### The speed of a NaN test, for (b) and (c)

- **How it would be built.** The JVM has no signaling comparison (section 4, reference 2), so the test is code inside the four helpers, as above. It adds one branch after the comparison, which a run that meets no NaN never takes. On x86 an unordered result sets a flag of its own, so the JVM's compiler may fold the test into the same compare instruction. This review did not look at the machine code.
- **Today's compiled code.** The code generator boxes every number, and boxing is the main cost of microGPT-shaped code (F-11). A branch beside it is noise.
- **A Java model of the ReLU mask**, `r[i] = a[i] > s ? 1.0 : 0.0` over a `double[]`, against the same loop with the NaN test, at the model's 1K elements. Two runs on a machine of 4 CPUs (Intel Xeon at 2.10 GHz), OpenJDK 25.0.4.1, load average 2.4 and 2.1 at start, because other work shared the machine [3]:
  - run 1: 904 ns without the test, 997 ns with it, and 6.9 µs for the product `m0 = x3 f1^T` alone (16K multiply-adds);
  - run 2: 1.5 µs and 1.6 µs, and 7.3 µs for the product.
  - So the test adds about 0.1 µs to each step, under 1.5% of that one product, and well under 1% of a step's products (section 5.2).
  - A test of the whole array before a quiet loop cost more: 1.4 µs and 2.0 µs.
- **What only a measurement can settle.** The effect on compiled microGPT, which does not run yet. After the arrays store unboxed doubles (P-84), the JVM may turn the quiet mask loop into vector instructions, and a loop that can throw may block that. The model's quiet loop ran at about 1 ns per element here, which suggests that it was not vectorised in this model either. This review cannot settle it.

References for section 6

1. `.claude/skills/fortress-repo/references/specification.md`, "Changing the text: the revision form".
2. `unzip -l default_repository/caches/bytecode_cache/fortress.CompilerLibrary.jar` lists `fortress/CompilerLibrary$FloatingComparisonError.class`. `javap` of it and of `fortress.CompilerBuiltin$DivisionByZero`: both `public final class ... extends fortress.CompilerBuiltin$UncheckedException$DefaultTraitMethods implements fortress.CompilerBuiltin$UncheckedException`, both with a public constructor with no parameters and a static field `ONLY`.
3. `NanMaskBench.java`, run twice by `java -Xmx1g NanMaskBench.java`, the best of 7 timed rounds after 3 warm-up rounds: `n=1024: quiet 904 ns, with a NaN test per compare 997 ns, with a NaN pre-pass 1402 ns` and `the m0 product alone (16x16 times 16x64, 16K multiply-adds): 6949 ns`; second run `n=1024: quiet 1505 ns, with a NaN test per compare 1614 ns, with a NaN pre-pass 1981 ns` and `7347 ns`. At 1M elements: `5663583 ns` and `5935634 ns`, then `5641094 ns` and `5940399 ns`. `nproc` 4; `Intel(R) Xeon(R) Processor @ 2.10GHz`; `FORTRESS_THREADS` does not apply to a Java model.

## 7. How the options weigh against each other

- **The library as the team wrote it.** It favours (a). Its operators, its partial-order design with `Unordered`, Steele's 2011 prelude bodies and the team's tests all answer. (b) keeps the library's `CMP` design but changes the four operators against their bodies. (c) changes both, and leaves the team's partial-order traits with no float to serve.
- **The team's later word.** It favours (a), unless the curator counts the 2012 restart's word-for-word copy of the overview's sentence as work on the point. Then it splits between the copy (raise) and Steele's 2011 code (`false`).
- **The peers.** They weigh here, because the team's texts conflict. They lean to (a): every language here answers `false` for `<` on binary floats, and none raises by default. They also show that (b) is a known design: IEEE marks exactly these four predicates as signaling, and Python's decimal type raises at exactly these four. No peer here raises from its three-way comparison, as (c) would.
- **The goal: microGPT compiled, and fast (P-8).** (a) costs nothing. (b) and (c) cost a branch per comparison, about 0.1 µs a step in a Java model. Their cost after unboxed arrays is open. For the model's runs, a raise is a debugging aid: it stops a training run that goes wrong at the first NaN that meets the ReLU's mask. But it misses a NaN that meets no comparison, so it does not replace `isNaN` and `check*`.
- **Consistency across the language.** (a) agrees with the rationals chapter, the comparison chapter, the `MAX` and `MIN` passage, the tuples as built, P-154's reason and row 440's reading. (b) gives two families: the four operators raise, while `CMP` and the tuples answer. It also asks for a revision of the rationals chapter's reason, or for `QQ` to raise as well. (c) is consistent in itself, but it removes `Unordered` from floats.
- **Reversal and cost.** Each option can be undone. (a) is a small rung with no Java. (b) and (c) are each a rung of Java, library, specification and tests on both paths.
- **What (b) and (c) would gain.** A program that assumes that one of `<`, `=` and `>` always holds would fail at its first NaN comparison, not take a wrong branch silently. Python's `sorted` above shows the silent failure. Under (a), the safety stays with the programmer, as the team's demos kept it (`aStar.fss:23`, `BiCGSTAB.fss:253`).
- **The rational twin.** The overview's sentence on rationals (`opr-overview.tex:284-286`) is false today in the same way, and the same chapter, the team's `QQ` and the team's `RationalTest.fss` contradict it (sections 2.4 and 3.3). Review-queue item 25 closed with `QQ`'s chapter and library as they are: "No other way was chosen; today's chapter and library stand." (`explorations/coordinator/review-queue-learning-2026-11-05.md:131`). So a revision of the twin in the same entry changes no program and leaves no false sentence in the paragraph. A separate decision on it would matter only if `QQ` were to raise.
- **What decides it.** Two facts weigh most. First, the team built `false` and the `Unordered` design everywhere, from 2007 to its last prelude code in 2011, and declared but never raised the exception. Second, the team's own texts conflict, and the rationals chapter gives the reason "for compatibility with floating-point arithmetic" for the same `false`.

References for section 7

The sections above hold each point's source: the library and the 2011 prelude in sections 2.1, 2.2 and 3.3; the texts and their dates in sections 3.1 and 3.2; the peers in section 4; the model and the timings in sections 5 and 6. The three principles: `.claude/skills/coordinator/SKILL.md:92`. P-26 and P-25 for the later word; P-8 for the goal.

## 8. Recommendation

Option (a): keep `false` and `Unordered` on both paths, and revise the overview's float sentence, with its rational twin, to the rationals chapter's reading.
