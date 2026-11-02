<!-- A probe of the self-type idiom on the flat library, written 2026-11-02 by an Opus worker for the curator's decision on P-146 under the rule of the team's later word (P-26; `reviews/walk-leaning-decisions.md`, section 1): `comprises T` on the seven self-typed traits of the one library with their F-bounds kept, walk's row 407 repair beside it, measured by the checker's count and distance stages with their times, walk's suite, the specification's examples, the quick microGPT check, the team demos and walk's exclusion verdicts at load. The patch is `self-type-idiom.patch` beside this file; nothing else of the tree or the record was changed. -->

# The self-type idiom on the flat library

## In short

**The question.** The curator asked what the self-type idiom costs and what it changes on the flat library as it stands. The self-type idiom is the team's later form of a self type: a trait lists its own type parameter in its `comprises` clause, as `trait StandardTotalOrder[\T\] ... comprises T` in the compiler's prelude (`Library/CompilerAlgebra.fsi:16`). A `comprises` clause says that every value of the trait is a value of a listed type. The one library is walk's library, which both paths use after the switch-over. Walk is the interpreter. The flat library is that library with its number types as siblings (P-43).

**The answer, in three lines.**

1. Under walk the idiom costs one walk repair and changes nothing measured: without row 407's repair every program overflows its stack at load; with it, walk's suite, the specification's examples, the quick microGPT check, the 52 team demos and every exclusion verdict at load are as before.
2. Under the compiled checker the idiom costs 33 errors from one cause: under a `comprises` clause the checker types `self` as `C[\X\] & X` in the method signatures too, not only in the bodies as P-146 says, so `StandardTotalOrder`'s `CMP` ties with `StandardPartialOrder`'s and the Return Type Rule and call resolution refuse the library; there is no overflow and no stall.
3. The checker's reading of `self` in the seven traits' bodies does not change (`C[\X\] & X` from the clause, as from the F-bound); its reading in their signatures does, against P-146; so the idiom cannot be taken clean without a checker change, which this probe did not make.

**The measurements, before and after.** "Before" is the base, climb batch 24's code (`dc571c1f3`, the base build `/home/user/fortress-base25`); "after" is the same code with the patch. The machine for every run: nproc 4, Intel Xeon Processor @ 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`, nothing else of mine running beside a timed run.

| Measure | Before | After |
|---|---|---|
| Count stage: `#total`, `#locations` | 0, 0 | 10, 2 |
| Count stage: wall time | 156.5 s, load at start 0.28 | 56.4 s, load at start 1.19 (stops at the apis, so not comparable) |
| Distance stage: `#total` | 0 | 33: 17 return-type, 16 typecheck |
| Distance stage: `#seconds` | 182 (FortressLibrary 139), load at start 1.12 | 201 (FortressLibrary 150), load at start 1.12 |
| Either stage: `#crash` | none | none |
| `ant testSystem` | 723 tests, 0 failures (batch 24) | 724 tests, 0 failures (the 723 and the patch's new test) |
| `ant testSpecData` | 130 tests, 0 failures | 130 tests, 0 failures |
| Quick microGPT check | both ALL PASS (batch 24) | both "7 PASS, 0 FAIL of 7 -- ALL PASS", rc=0 |
| Walk's exclusion verdicts at the library's load | 4,855 distinct pairs | 4,855 distinct pairs, none moved |
| Team demos under walk | 52 reach their end (P-79) | 52 run, 52 reached their end |
| Walk without the repair, after the clauses | (not applicable) | `StackOverflowError` at load of every program |

**The cost.** The library change is one clause on each of seven trait headers, in `Library/FortressLibrary.fsi` and `.fss` (14 lines). The walk repair is three lines of code and three of comment in `BuildEnvironments.finishTrait`, with one new test. The checker, unchanged, then reports 33 errors on the distance, all from the `CMP` tie; bringing them to 0 needs a checker change, of two kinds named in section 7, neither measured here. The distance stage's time rose by 19 s (10 percent), which is a small difference between two single runs and not a finding by the smoke-test reading of the checker's time (`.claude/skills/fortress-repo/references/compiler.md`, "The checker's time").

## Words

- The **count stage** runs the compiled checker over the `FortressLibrary` component and the apis that it imports, and stops at the first of the checker's steps that finds errors; its total is the checker count (`explorations/coordinator/tools/checker-count/run.sh`).
- The **distance stage** runs the checker over fourteen components of the one library and runs every step whatever the earlier steps found; its total is the distance to the switch-over (`explorations/coordinator/tools/distance/run.sh`).
- An **F-bound** is a bound on a type parameter that names the parameter itself, as `T extends StandardTotalOrder[\T\]`.
- A **self-typed trait** is a trait with an F-bounded parameter whose methods treat `self` as that parameter. P-146 has the checker type `self` in such a trait's bodies as `C[\X\] & X`, the trait met with the parameter, and keep the plain trait type `C[\X\]` in the methods' signatures, save in the overloading check's exclusion test (P-157).
- A **signature** is a declaration's header: its parameter types and return type. Overloading, the Return Type Rule and the choice of a declaration at a call read it.
- The **Return Type Rule**: where one overloaded declaration is more specific than another, its return type must be a subtype of the other's.
- **Row 407** is the gap-ledger row: walk overflows its stack on a trait that lists its own type parameter in its `comprises` clause.
- The **symbolic instance** of a generic trait is the one type through which walk checks all its instances at load, with a symbolic type for each static parameter (`BuildEnvironments.symbolicInstance`).

## 1. The change

The patch is `explorations/perf-probes/self-type-idiom/self-type-idiom.patch`, 184 lines, to apply with `git apply` from the tree's root on `main` at `432749a69` or on `dc571c1f3`, whose code is the same (`git diff --name-only dc571c1f3 432749a69 -- ProjectFortress Library build.xml Specification SpecData bin` prints nothing). It holds three things, which I built and measured one at a time, in this order. In the commands, `W` is my worktree, `/home/user/fortress-selftype-idiom`, and each call was set up as `.claude/skills/fortress-repo/references/build-and-caches.md` says.

1. **The test.** `ProjectFortress/tests/ComprisesOwnTypeParameter.fss` declares `trait Selfish[\T extends Selfish[\T\]\] comprises T`, a subtrait and an object, an overload of `kind` over an instance of `Selfish` beside one over `String`, and a generic `pair[\T extends Selfish[\T\]\](x: T, y: ZZ32)` beside `pair(x: String, y: String)`, which exclude each other at the second parameter. It asserts each call's answer. On the old code it fails through the harness:

       FORTRESS_HOME=/home/user/fortress-base25 /home/user/fortress-base25/explorations/compile-ladder/rung-inference-walk/harness-one.sh \
           $W/tmp/old-harness $W/ProjectFortress/tests/ComprisesOwnTypeParameter.fss
        UNEXPECTED exception
       java.lang.StackOverflowError
       Tests run: 1,  Failures: 1,  Errors: 0

   A first form of the test, without the generic pair, passed on the old code, so the overflow needs an exclusion question that the clause cannot settle, here the type parameter against `String`. A second form, with `name[\T extends Selfish[\T\]\](x: T)` beside `name(x: String)`, overflowed on the old code but is refused rightly with the repair ("fails the Meet Rule": a type can extend both `String` and an instance of `Selfish`), so it could not be a passing test.

2. **Walk's repair of row 407** (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:922-930` after the patch). In `finishTrait`, a type variable listed in a trait's `comprises` clause, which is a `SymbolicType` in the generic's symbolic instance, is left out of the clause that walk records, and no clause is recorded where only type variables were listed. A concrete instance, such as `Integral[\ZZ32\]`, still records `comprises { ZZ32 }`, the idiom's reading. This is the six-line edit of `reviews/anyintegral-comprises-ways.md`, way 3 (`shadow-walk407.py`, from `2be6254a7`), written into the tree. After `ant compileAll` (BUILD SUCCESSFUL, 48 s), the test passes through the harness:

       explorations/compile-ladder/rung-inference-walk/harness-one.sh $W/tmp/h1 ProjectFortress/tests/ComprisesOwnTypeParameter.fss
        OK (time = 3874ms)
       OK (1 test)

3. **The seven clauses**, applied after walk's suites had run on the repair alone. Each of `StandardPartialOrder`, `StandardTotalOrder`, `LexicographicOrder`, `AdditiveGroup`, `MultiplicativeRing` and `StandardMutableArrayType` gains `comprises T`, and `Integral` gains `comprises I`, at the end of its `extends` clause, in the api and the component. The F-bounds stay. `Equality`, also F-bounded, gets no clause: the brief names seven traits, as `reviews/self-typed-bodies-ways.md`, way 5, form (b) does; the prelude has `Equality[\T\] comprises T` too (`Library/CompilerAlgebra.fsi:24`).

The checker is unchanged. The brief allowed a checker change only if the idiom could not be measured without it, and it could.

## 2. The measurements

### 2.1 The count stage

Both runs used the stage's own command, with a scratch folder and the JVM's temporary directory in my worktree's `tmp/`; the base ran from the base build, which `git status --porcelain` shows clean afterwards.

    export W=/home/user/fortress-selftype-idiom N=base      # in a call set up for /home/user/fortress-base25
    time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N

Before, the table equals climb batch 24's landed table (`explorations/compile-ladder/climb-batch-24/gate/checker-count.txt`; `diff` prints nothing): `#total 0`, `#locations 0`, `#crash none`, 2 min 36.5 s.

After, from my worktree with the same command and `N=idiom`:

    FlatString	2
    FortressBuiltin	14
    FortressLibrary	16
    String	10
    #total	10
    #locations	2
    #crash	none

The 10 distinct errors are one pair at two places, `FortressLibrary.fsi:179` (`StandardPartialOrder`'s `CMP`) and `:234` (`StandardTotalOrder`'s), at ten static arguments: `Boolean`, `Char`, `I`, `NN32`, `NN64`, `String`, `T`, `ZZ32`, `ZZ64` and `ZZ`. One of them:

    For CMP,
    the return type of ((StandardPartialOrder[\String\] & {String}), String)->Comparison @ Library/FortressLibrary.fsi:179:5-38 should be a subtype of the
        return type of ((StandardTotalOrder[\String\] & {String}), String)->TotalComparison @ Library/FortressLibrary.fsi:234:5-235:1

Since the apis have errors, the checker never reached the `FortressLibrary` component, so the stage took 56.4 s and its time does not compare with the base's.

### 2.2 The distance stage

    time explorations/coordinator/tools/distance/run.sh $W/tmp/dist/$N.txt $W/tmp/dist/$N

Before, the table equals climb batch 24's apart from its `#seconds` and `#machine` rows: `#total 0`, `#crash none`, `#seconds 182 FortressLibrary 139`, load at start 1.12 0.84 0.54. After (`explorations/coordinator/tools/distance/compare.sh` on the two tables):

    DISTANCE UP   0 -> 33 (+33)
        kind return-type              0 -> 17     (+17)
        kind typecheck                0 -> 16     (+16)
        class R2                      0 -> 17     (+17)  return type: the comparisons' CMP
        class OT                      0 -> 16     (+16)  other body errors (one-off library slips and checker limits)

with `#crash none`, `#seconds 201 FortressLibrary 150`, load at start 1.12 2.49 2.56. Every other kind is 0: exclusion, comprises, overloading, abstract-method, bound-Object, wellformed and export.

- The 17 return-type errors are the `CMP` pair of section 2.1: the 10 of the count stage at the api pair (`FortressLibrary.fsi:179`, `:234`), and 7 at the component pair (`FortressLibrary.fss:224`, `:283`), at `I`, `NN64`, `String`, `T`, `ZZ32`, `ZZ64` and `ZZ`.
- The 16 typecheck errors are bodies in which a `CMP` call on two values of a total order now resolves to `StandardPartialOrder`'s declaration and so types as `Comparison`: 13 "Function body has type Comparison, but declared return type is TotalComparison." (`FortressLibrary.fss:1013`, `:2073`, `:2075`; `FlatString.fss:76`, `:77`, `:79`; `FortressBuiltin.fss:514`; `String.fss:98`, `:116`, `:301`, `:303`, `:380`, `:404`) and 3 "Could not check function application - TotalComparison->TotalComparison is not applicable to an argument of type Comparison" (`FortressLibrary.fss:4369`, the `BIG LEXICO` of `String`'s `CMP`; `String.fss:383`, `:392`).

So all 33 have one cause (section 3.2). Errors of the same cause, 18 return-type errors and 3 bodies, were measured once before, on climb batch 12's code, under the revival's first form of P-146's rule, "rule (a) alone", which typed the signatures with the intersection too; the confinement to bodies cleared them (`reviews/self-typed-bodies-judgement.md`, "Rule (a) alone" and "Rule (a) confined to bodies").

### 2.3 The checker's time

| Run | Wall time | Load at start (1, 5, 15 min) |
|---|---|---|
| Count stage, before | 156.5 s | 0.28 0.40 0.34 |
| Count stage, after | 56.4 s (stopped at the apis) | 1.19 2.79 2.65 |
| Distance stage, before | 185.0 s; table 182 s, FortressLibrary 139 s | 1.12 0.84 0.54 |
| Distance stage, after | 204.4 s; table 201 s, FortressLibrary 150 s | 1.12 2.49 2.56 |

The four runs were one at a time, with nothing else of mine running beside them; the higher 5- and 15-minute averages of the later runs carry the walk runs that ended just before them. The batch 24 gate's own distance run took 198 s (FortressLibrary 152) at load 1.84. The checker did not stall and did not overflow, unlike on the nested number tower, where eight such clauses overflowed it in `Formula.tImplies`/`primImp` (F-46).

### 2.4 Walk's suite and the specification's examples

| Code state | `ant testSystem` | `ant testSpecData` |
|---|---|---|
| Before (climb batch 24's gate) | 176 + 185 + 181 + 181 = 723 tests, 0 failures | 130 tests, 0 failures |
| The repair and the test | 180 + 178 + 184 + 182 = 724 tests, 0 failures; BUILD SUCCESSFUL, 4 min 19 s | 130, 0 failures; BUILD SUCCESSFUL, 1 min 6 s |
| The repair, the test and the clauses | 180 + 178 + 184 + 182 = 724 tests, 0 failures; BUILD SUCCESSFUL, 3 min 51 s | 130, 0 failures; BUILD SUCCESSFUL, 1 min 9 s |

The extra test is the patch's. The shards differ from batch 24's because an added file moves the later files to other shards; the sum is the count. No `XXX` test turned red, so no expected failure of walk was mended by the idiom.

### 2.5 The quick microGPT check

    explorations/coordinator/tools/mg-run.sh $PWD/tmp/mg idiom

    MicroGptAplQuick.txt: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS rc=0 secs=54
    MicroGptFlatQuick.txt: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS rc=0 secs=43

Before, climb batch 24's landed summary has the same verdicts for both (rc=0, 53 s and 46 s).

### 2.6 The team demos

The team demos are the programs of `ProjectFortress/demos/`, which no suite runs and which P-79 keeps reaching their end. I ran them once, after my last edit of code, with the demo driver of `explorations/compile-ladder/rung-team-demos/REPORT.md`, section 13, saved as `tmp/run-demos.sh`, from the tree's root (`bash tmp/run-demos.sh tmp/demos`). Its last line:

    demos: 52 run, 52 reached their end

A demo reaches its end if it exits 0 and its output holds no "fail". There is no landed run of the base to compare with; P-79 asks that all 52 reach their end, and they do.

### 2.7 Walk's exclusion verdicts at load

To see whether a verdict moved, I logged every exclusion question that walk answers. I made copies of walk's five classes that define `excludesOther` (`FType`, `FTypeTuple`, `FTypeArrow`, `FTypeTop`, `FTypeVoid`, in `interpreter/evaluator/types/`), in which the method wraps the original and writes the two types and the answer to a file for each call made at the top, not inside another such call. The copies were compiled into a scratch folder ahead of the build on the class path; nothing in the tree changed.

- **The library's load.** A program whose `run` only prints, from an empty private cache, so that walk analyses and checks the whole library: 59,345 questions both before (the repair alone, which acts on no clause of the library without the seven: only the prelude, which walk does not load, and the new test list a type variable) and after (the repair and the clauses). Read as unordered pairs, 4,855 distinct pairs before and after, with the same answer each: none moved, none new, none gone. Read as ordered pairs, two runs of the same code already differ in about ten pairs, by the order in which a pair is asked, so the comparison is of unordered pairs.
- **Fifteen programs.** The fifteen tests of `ProjectFortress/tests/` that name one of the seven traits, each run on a cache warmed by that program, on the base build (before) and on my worktree (after): `BitTwiddle`, `ComprisesEligibleExtenders`, `InferCoercionRungK`, `MethodStaticArgCases`, `OpenTupleDispatchWalk`, `RR32SiblingRungV`, `VectorMatrixCastsWalk`, `XXXComprisesGenericChildAcrossComponents`, `XXXEmptyGroupSumRungF`, `XXXWhereVariableScopeWalk`, `overloadTest7`, `overloadTest8`, `parametricListCompr`, `parametricManiaCompr` and `simpleBig`. Each run's log holds the library's questions, the program's own and those of its dispatch at run time: from 4,855 to 5,776 distinct pairs per program, the same before and after, with no answer moved. Every run's exit code and output are the same before and after.

So no exclusion verdict moves under walk, at the library's load or in these programs. The reason is in the logs. With the repair, the symbolic instances of the seven traits, through which walk checks the library's generic declarations, record no clause, so their questions are answered as before. Only the concrete instances read the clause, as `Integral[\ZZ32\]` reads `comprises { ZZ32 }` by the code of `finishTrait`, and the library's load asks only four questions of a concrete instance of the seven, each of a subtype of it (`EqualTo`, `GreaterThan`, `LessThan` and `TotalComparison` against `StandardPartialOrder[\Comparison\]`, all "no exclusion"), which walk settles before it reads a clause. Walk also checks extenders only against the clauses of a program's main component (row 551), so the library's clauses add no check of a program's types.

Without the repair, the idiom stops every program. Walk's own `BuildEnvironments` classes from the base build, put ahead of my build on the class path, with the clauses in the library:

    Exception in thread "main" java.lang.StackOverflowError
    	at com.sun.fortress.interpreter.evaluator.types.FType.excludesOther(FType.java:209)
    	at com.sun.fortress.interpreter.evaluator.types.FType.excludesOtherInner(FType.java:291)
    	at com.sun.fortress.interpreter.evaluator.types.FType.excludesOther(FType.java:209)
    	at com.sun.fortress.interpreter.evaluator.types.SymbolicType.excludesOtherInner(SymbolicType.java:70)

Of the 1,039 frames printed, 1,019 are these three methods in this cycle, `FType.java:291` being the loop over comprised types and `SymbolicType.java:70` the loop over two symbolic types' bounds.

### 2.8 The checker's reading of `self` against P-146's rule

P-146 has four parts. The clause changes two of them.

- **In the bodies: unchanged.** With a `comprises` clause that lists types, the disambiguator types `self` as the trait met with the listed types (`scala_src/disambiguator/SelfParamDisambiguator.scala:77-78`); with `comprises T` that is `C[\T\] & T`, the type it reads from the F-bound without a clause (`:79-81`). The messages print it as before, `(StandardPartialOrder[\String\] & {String})`. No error of the distance is at one of the 29 self-typed bodies that P-146's rule cleared (`reviews/self-typed-bodies-judgement.md`, "Rule (a) alone"); the 16 body errors are `CMP` calls.
- **In the signatures: changed, against P-146.** P-146 keeps the plain trait type in the signatures. The revival builds that by giving the self parameter the plain trait type in the index entry that overloading, the Return Type Rule and call resolution read, but only where the self type was read from the F-bound: `FunctionalMethod.selfFromBound` is false for a trait with a `comprises` clause (`compiler/index/FunctionalMethod.java:48-53`, `:155`). Under the clause, every rule reads the intersection, and the 33 errors follow (section 3.2).
- **The extender rule: replaced.** P-146's rule refuses a type that extends `C[\A\]` and is not an `A`; the checker finds the self parameter for it only in a trait without a clause (`SelfParamDisambiguator.selfParamPosition`, `:259-262`; `TypeHierarchyChecker.scala:171-181`). Under the clause the clause's own check takes its place: an extender must be below a listed type (`TypeHierarchyChecker.checkDeclComprises`, `isEligibleToExtend`, `:333`, `:386`). The distance's comprises kind is 0, so every extender of the seven in the fourteen components passes it.
- **The exclusion test: the same reading, by another route.** P-157 has the exclusion test read `self` as `C[\X\] & X`. Without a clause the checker makes a second arrow for it from the declaration's own parameters; under the clause the signature already holds the intersection, so no second arrow is made (`scala_src/typechecker/OverloadingChecker.scala:540-556`). The exclusion kind stays 0, so the 8 pairs of P-157 stay clear.

## 3. The defects met

### 3.1 Row 407, walk: met on the library, repaired in the patch

Walk overflows its stack at load on a trait that lists its own type parameter in its `comprises` clause, as row 407 says. On the library with the seven clauses it stops every program (section 2.7). The patch's repair mends it, and its test, `ProjectFortress/tests/ComprisesOwnTypeParameter.fss`, fails on the old code and passes on the repair (section 1); landed together they are way 1 of "How a defect is recorded" (`.claude/skills/fortress-repo/references/tests-writing.md`), an assertion in a plain gated test. Two details of the row are stale: its frames name `SymbolicType.java:80` at `d4d454f9d`, and at `432749a69` the loop runs through `SymbolicType.java:70`, the branch for two symbolic types; and its fix, "stop the exclusion test at a clause's type variable", is here made at the clause's recording, in `finishTrait`, not in the exclusion test. The repair also mends a program's own clause of this form, as the patch's test shows.

### 3.2 New, the checker: under a clause, the signatures read the intersection, and `StandardTotalOrder`'s `CMP` ties with `StandardPartialOrder`'s

Under `comprises T`, the checker gives the self parameter of each functional method of the seven traits the type `C[\T\] & T` in the signature (section 2.8). At any `X` below `StandardTotalOrder[\X\]`, the types `StandardPartialOrder[\X\] & X` and `StandardTotalOrder[\X\] & X` are both `X`, so the two `CMP` declarations, `opr CMP(self, other: T): Comparison` and `opr CMP(self, other: T): TotalComparison`, have equal domains. The Return Type Rule check reads both domains with the intersection (`scala_src/overloading/OverloadingOracle.scala:77-90`, `satisfiesReturnTypeRule`, through `makeArrowFromFunctional`) and asks for `Comparison` below `TotalComparison`, which fails: 17 errors. Call resolution meets the same tie, and the call types as `Comparison`: 16 errors. Specificity does not tie, because it adds the declaring trait to each domain (`OverloadingOracle.scala:55-66`, `lteq`, through `STypesUtil.makeSpecialArrowFromFunctionalMethod`, `scala_src/useful/STypesUtil.scala:146-149`), Steele's change in `655e65d53` (2012-06-05), whose message gives the reason, "Using just the self type does not do the job, because it may be an intersection of the declaring trait and the comprises clause" (`reviews/walk-leaning-decisions.md`, section 1). So the team's checker reads the declaring trait for specificity and the intersection for the Return Type Rule and for calls. The team's prelude never met the tie, because its `StandardTotalOrder` has no supertrait that declares `CMP` (`Library/CompilerAlgebra.fsi:16-27`).

It is a departure of the checker, deferred, on which the specification is silent: the specification types `self` under a clause as `T ∩ (U1 ∪ … ∪ Un)` (`Specification/basic/expressions/var-ref.tex:63-69`, the Working Draft's text) without saying whether a signature reads it, while a functional method's `self` parameter "implicitly has the type of the enclosing trait or object" (`Specification/basic/traits.tex:605-607`). So it is way 3 of "How a defect is recorded": a test that asserts today's behaviour, and a ledger row.

A small program reproduces it on the compiled path, against the compiler's prelude, in seconds. Two traits in the library's shape, the subtrait narrowing a method's return type, with `comprises T`:

    component SelfCmpTieClause
    export Executable
    trait Res end
    trait TRes extends Res end
    object Tr extends TRes end
    trait PartOrd[\T extends PartOrd[\T\]\] comprises T
      cmp(self, other: T): Res
    end
    trait TotOrd[\T extends TotOrd[\T\]\] extends PartOrd[\T\] comprises T
      cmp(self, other: T): TRes
    end
    object A extends TotOrd[\A\]
      cmp(self, other: A): TRes = Tr
    end
    use(x: A): TRes = cmp(x, x)
    run(): () = println("PASS")
    end

`fortress typecheck` on it, from a private caches folder, refuses it with 2 errors, the library's error in small, at `A` and at `T`:

    For cmp,
    the return type of ((PartOrd[\A\] & {A}), A)->Res @ .../SelfCmpTieClause.fss:7:3-8:1 should be a subtype of the
        return type of ((TotOrd[\A\] & {A}), A)->TRes @ .../SelfCmpTieClause.fss:10:3-11:1
    File SelfCmpTieClause.fss has 2 errors.

The same program without the two clauses, the F-bounds alone, typechecks clean (rc=0). The program is not committed, because the brief commits only this report and the patch; landed, it would be the test of way 3, a compiled test that asserts the refusal. The row, checked with `python3 explorations/coordinator/tools/ledger.py check --rows FILE`, which names no rule but the `?` of its number:

    | ? | the compiled checker reads `self` as `C[\X\] & X` in the signatures of a trait whose `comprises` clause lists its own type parameter, so a subtrait's method that narrows the return type ties with its supertrait's: the Return Type Rule and calls refuse the library's `CMP` under `comprises T` | CONTESTED | implementation gap (checker) | basic/expressions/var-ref.tex, "Identifier References" | explorations/perf-probes/self-type-idiom/self-type-idiom.patch | self-type idiom probe | siblings: 407. Signatures read the plain trait only for a self type from the F-bound (`compiler/index/FunctionalMethod.java`, `selfFromBound`, at 432749a69); `satisfiesReturnTypeRule` reads the intersection (`scala_src/overloading/OverloadingOracle.scala:77-90`), specificity the declaring trait (`lteq`, `:55-66`, `655e65d53`). Library distance 0 to 33; the 17-line `SelfCmpTieClause` of the probe's REPORT.md, section 3.2, gives 2 errors under `fortress typecheck`, 0 without the clause. Open: plain trait (P-146) or intersection. |

## 4. What the idiom would change in the record

If the library took the idiom, these entries would be rewritten. I edited none of them.

- **P-146.** "The library's text gains no self type and no `comprises` clause, and walk is unchanged" would be false: the library gains seven clauses, and walk gains row 407's repair. Its body rule would hold as before, now read from the clause. Its signature rule, "The method signatures keep the plain trait type", would hold only with a checker change (section 7); as the checker stands, the signatures read the intersection. Its extender rule would become the clause's own check. Its "Why" would cite the team's idiom (the Working Draft's paragraph, Ryu's tests of 2009, Steele's prelude of 2012) in place of "the checker reads the library as the team wrote it".
- **F-225.** Its rule covers a self-typed trait with no `comprises` clause, so it would cover only `Equality` among the library's traits, and programs' own traits. Its sentence on a clause, "the exclusion test reads its signatures plain", is ambiguous against what this probe read in the code: under a clause the signatures themselves hold the intersection, so every rule, the exclusion test included, reads the intersection, and no second arrow is made (section 2.8). If "plain" there means the plain trait type, as in F-277's "every other rule of overloading keeps the plain signatures", the sentence is wrong; it wants checking whichever way the curator decides. Its sentence that the prelude's `comprises T` "does not bind the one library" would be reversed.
- **F-277 and P-157.** The exclusion reading would come from the clause, not from a second arrow; the measured result, the 8 pairs clear, is the same.
- **F-46.** Its "it overflows the checker's stack" holds of the nested tower; on the flat library the seven clauses do not overflow the checker (section 2.3). A fact for that (section 9) would sit beside it.
- **F-171.** It records that the specification does not say whether a bare type variable may be listed in a clause. The idiom needs it to say so.
- **Row 407.** It would close with the repair and its test.
- **The new row of section 3.2** would be added.
- `revival-changes.md`'s definition of a self-typed trait ("`T` has no `comprises` clause, or one that lists only `...`") would no longer describe the library's seven.

## 5. What the idiom would change in the specification

These sentences of `Specification/` would be made false, or would no longer cover the library, if the library took the idiom:

- `Specification/basic/traits.tex:163-165`: "A trait reference listed in the \KWD{comprises} clause is a declared trait identifier (within the same component or an API imported by the component)." A type variable is not one. The sentence would have to admit a static parameter of the trait, the point that F-171 records as unsaid and that the revival's `comprises` rung left shut on purpose (`compile-ladder/rung-spec-comprises/decision-record.md:48`, by `reviews/self-typed-bodies-ways.md`, way 5).
- `Specification/basic/expressions/var-ref.tex:66`: "`\EXP{U_1}', ... are the traits mentioned in the \KWD{comprises} clause". With `comprises T` the listed type is a type variable, not a trait.
- `Specification/basic/expressions/var-ref.tex:84-86`, in the `revival-self-type` box: "a method body that returns \KWD{self} where the self-type parameter is declared, as the default bodies of the orders and of \TYP{Integral} in \library\ do". A trait with a clause has no self-type parameter in the specification's sense (`Specification/basic/traits.tex:296-297`), so the library's orders and `Integral` would no longer be its example.
- `Specification/appendices/changes.tex:4053-4054`, the rationale of the same entry: "the revival reads the self type from the bound, which \library\ already write". For the seven traits the self type would be read from the clause.

The signature question of section 3.2 also lies between two passages that stand today: the idiom's paragraph (`var-ref.tex:63-69`), which types `self` under a clause without a word on signatures, and the functional-method paragraph (`traits.tex:605-607`), whose `revival-self-type` box (`:610-614`) keeps the plain type in signatures only for a self-type parameter. The specification would need a sentence on which one a clause's signatures read.

## 6. My decisions

- **The branch's start.** I seeded the worktree from the base build and cut `wip/probe-self-type-idiom` from `main` at `432749a69`, not from the base build's `dc571c1f3`, so that the branch carries the review that it answers. Their code is the same (section 1). The alternative was the script's default start, the base build's commit.
- **The repair's form.** I wrote the review's six-line edit in `finishTrait`, which the brief names, not row 407's suggested fix in the exclusion test. The edit leaves the variable out where the clause is recorded, so the generic's symbolic instance has no clause, and it changed no measured verdict.
- **The test.** I added a walk test of row 407 to the patch, as every edit of the tree's code wants one. It adds one test to `ant testSystem`, 723 to 724.
- **The seven, not eight.** I left `Equality` without a clause, as the brief and way 5 (b) do, though the prelude gives it one.
- **No checker change.** The idiom measured without one, so I made none, and I did not measure the two checker changes of section 7.
- **The measure of walk's verdicts.** No tool of the record measures exclusion verdicts, so I logged them from instrumented copies of walk's classes and compared unordered pairs, since two runs of one code already differ in the order of about ten pairs.
- **The base's timings run again.** Climb batch 24's tables are the before for the counts; I ran the base's two stages again only to have the before and the after timed on one machine under a like load, as a pair of timings needs. Their tables equal batch 24's.
- **The demos.** The brief did not list them; the skill asks for them after an edit of walk or of the library, so I ran them once, after my last edit.

## 7. The decision for the curator

**The question.** Does the one library take the team's self-type idiom, `comprises T` on its seven self-typed traits, in place of P-146's reading of the self type from the F-bound alone? This is a decision not taken.

**The sources, with their dates.** The idiom is in the Working Draft's text (`Specification-1.0-frozen/basic/expressions/var-ref.tex:63-69`), in the team's checker with Ryu's tests of 2009-10-25 (`e0add930c`; `compiler_tests/Compiled10.k.fss:14-20`, `XXX10k.test:13-29`), and in Steele's prelude of 2012-06-05 and 2012-06-06 (`655e65d53`, `59fdeff62`; `Library/CompilerAlgebra.fsi:16`, `:24`), where `655e65d53` also made specificity read the declaring trait. Naden's account of 2012-08-31 says the idiom "is realized with the comprises clause" and asks for "a separate construct ... only in bounds" (`Papers/Types/journal/justificationOfRTR.tex:580`, `:627-632`). Walk's library's F-bounds are Maessen's of 2008 (`1d2680d4d`, `dc0f919ce`). Of the type group's late positions (`.claude/skills/fortress-repo/references/exploring.md`, "Weighing the sources"), the 2012 write-up on the Return Type Rule is Naden's account; the POPL 2019 paper has no self types and no `comprises` clauses (`reviews/walk-leaning-decisions.md`, section 1). The review rates the idiom the team's later decision under P-26.

**The solutions.**

1. **Keep the library as it is.** P-146 stays as built; only its "Why" is restated on the team's later ground, with the plain signatures resting on Steele's specificity change, as the review proposes "either way". Nothing in the tree changes. It keeps the current behaviour.
2. **Take the idiom, with the checker reading a clause that lists the trait's own parameter as it reads an F-bound.** `FunctionalMethod.selfFromBound` and `SelfParamDisambiguator.selfParamPosition` would also accept such a clause, so the signatures stay plain (P-146's signature rule) and the exclusion test keeps its second arrow. The library's text then says the self type the team's way, and the checker keeps P-146's reading. Unmeasured; the confinement it extends cleared errors of the same cause, 18 return-type errors and 3 bodies, on batch 12's code (`reviews/self-typed-bodies-judgement.md`, "Rule (a) confined to bodies").
3. **Take the idiom, with Steele's route.** The Return Type Rule and call resolution read the declaring trait, as specificity already does (`OverloadingOracle.lteq`). This follows the team's own 2012 change further than the team did. Unmeasured. Solutions 2 and 3 both reach a program's own trait with such a clause too, as the small program of section 3.2.
4. **Take the idiom with the checker as it is.** The distance goes from 0 to 33 until the library stops narrowing `CMP`'s return type in `StandardTotalOrder`, which bends the team's order traits. Measured here.

Each of 2, 3 and 4 lands the patch's library lines and walk's repair, rewrites P-146, F-225 and F-171 (section 4) and revises the specification's four sentences (section 5). Row 407's repair with its test can land in any of the four, since it mends walk for a program's own clause whatever the library does.

**Default.** Solution 1 now, with row 407's repair and its test landed on their own as a walk fix, and one more probe before the curator chooses: solutions 2 and 3 built as two shadows of the checker, one change each, on this patch, tried first on the small program of section 3.2 and then measured by the distance stage. If either gives 0 with no other change, the idiom costs one walk fix and one checker rule, and the curator can then take it with the specification's four sentences revised.

## 8. Commands worked out

- **Walk's exclusion log.** A script (kept in my scratch folder, not committed) copies the five classes from `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/`, renames each `public boolean excludesOther(FType other) {` to `excludesOther__`, and gives `FType` this wrapper and a small `ExclLog` class that appends `a<TAB>b<TAB>result` to the file named by `-Dexcl.log`:

      public boolean excludesOther(FType other) {
          int[] d = ExclLog.DEPTH.get(); d[0]++; boolean r = false; boolean ok = false;
          try { r = excludesOther__(other); ok = true; return r; }
          finally { d[0]--; if (d[0] == 0) ExclLog.log(this, other, r, ok); }
      }

  Compile with `javac -cp "$(bin/fortress_classpath | tail -1)" -d $X/classes ...`, run walk with `java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches=<empty folder> -Dexcl.log=<log> -cp "$X/classes:$CP" com.sun.fortress.Shell P.fss`, and compare two logs by unordered pair after replacing each tree's path with one word.
- **Walk without a repair, on a changed library.** Copy the base build's `ProjectFortress/build/com/sun/fortress/interpreter/evaluator/BuildEnvironments*.class` into a scratch folder and put it ahead of the build on the class path of the same `java` line.
- **The checker on a small program, without the tree's caches.** `java $JAVA_FLAGS -Dfile.encoding=UTF-8 -Dfortress.caches=<empty folder> -cp "$(bin/fortress_classpath | tail -1)" com.sun.fortress.Shell typecheck P.fss`, which is `bin/fortress typecheck P.fss` with a private caches folder; it needs no library order.
- **The base's stages, timed from the base build without writing in it.** Set the call up for the base build, but with `TMPDIR` and `-Djava.io.tmpdir` in your own tree's `tmp/`, and give both stages scratch folders there.

## 9. For FACTS

- **The fact.** On the flat library, `comprises T` on the seven self-typed traits, with their F-bounds kept and walk's row 407 repair, changes nothing that walk's suite, the specification's examples, the quick microGPT check or walk's exclusion verdicts at load measure, and costs the compiled checker 33 errors on the distance (0 at climb batch 24's code), all from one cause: under a clause the checker types `self` in the signatures as `C[\X\] & X`, so `StandardTotalOrder`'s `CMP` ties with `StandardPartialOrder`'s in the Return Type Rule and at calls; the checker neither overflows nor stalls.
- **What it means for the work.** The idiom can be taken only with a checker rule that keeps the signatures plain under such a clause (section 7, solutions 2 and 3), or by bending the library's `CMP`; walk needs row 407's repair first.
- **The number.** 33 distinct errors on the distance stage: 17 return-type (class R2) and 16 typecheck (class OT); the count stage 10 at 2 locations, stopped at the apis.
- **The command and its output.** `git apply explorations/perf-probes/self-type-idiom/self-type-idiom.patch`, `ant compileAll`, then `explorations/coordinator/tools/distance/run.sh <out> <scratch>`: `#total 33`, `#kind return-type 17`, `#kind typecheck 16`, `#crash none` (section 2.2).
- **The test that fails if it stops holding.** None is in the tree. The small program of section 3.2 shows the cause in seconds: `fortress typecheck` gives 2 Return Type Rule errors with the clauses and none without them.
- **Detail.** This report, sections 2 and 3.2.

A second, smaller fact: on the flat library, walk without row 407's repair overflows its stack at the load of every program once the seven clauses are in the library (section 2.7); with the repair, the 4,855 distinct exclusion questions of the library's load have the same answers as without the clauses.

## Files

- `explorations/perf-probes/self-type-idiom/self-type-idiom.patch`: the patch of section 1.
- The worktree `/home/user/fortress-selftype-idiom` was removed after the push.
