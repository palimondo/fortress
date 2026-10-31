<!-- Probe for climb batch 24: what ZZ32's CHOOSE answers by the specification, by walk's glue class and by the compiled helper `simpleIntArith.intOverflowingChoose`, the helper's two defects (row 521's raw exception past its table, and a scratch array shared by parallel calls), and the helper's fix with its tests, kept as `choose.patch` beside this file. -->

# `CHOOSE` on `ZZ32`: the helper, its table, and a correct helper

Base: `main` at `40f08d22e`; the worktree was seeded from the base build `/home/user/fortress-base23` (`1f5c49b4f`, the same code: `git diff --stat 1f5c49b4f main -- ProjectFortress Library bin build.xml` prints nothing). The fix and its tests are `explorations/compile-ladder/plan-24/probes/choose.patch`; nothing is applied to `main` (`git apply --check` on `main` passes).

## 1. Findings in short

- **The specification**: `m CHOOSE n` is the binomial coefficient m!/(n!(m-n)!), 0 where n<0 or n>m (section 2). On a fixed-size type, a result that does not fit throws `IntegerOverflow`. P-73 names `CHOOSE` under that rule, on both paths.
- **Walk's glue class** (`Int$Choose`) is exact over all of `ZZ32`. It raises a catchable `IntegerOverflow` exactly where the coefficient does not fit (section 3).
- **The compiled helper** (`simpleIntArith.intOverflowingChoose`) gives the exact value or `IntegerOverflow` for every argument pair in one thread, except one region. Where `n ≥ 34` and `17 ≤ min(k, n−k) ≤ 33`, it indexes past its 15-entry safe-bound table and throws a raw `ArrayIndexOutOfBoundsException`. Every coefficient in that region overflows `ZZ32`, so the defect is the kind of exception, not a value (row 521) (section 4).
- **A second defect, new to the record.** The helper's slow path keeps its scratch array in a static field that all calls share. Called in parallel, it gives wrong values, raises `IntegerOverflow` on coefficients that fit, or ends with a raw `UnknownError`. This was measured on the compiled path today, and under walk through a binding of the helper. `simpleLongArith`, the helper for `ZZ64` and `NN32`, has the same field and the same race (section 4.3).
- **The fix**: past the table, raise `IntegerOverflow`; give each call its own scratch array. It is five lines in `simpleIntArith.java` (section 5). Afterwards the helper agrees with the exact value and with walk's glue on all 6,023,925 argument pairs swept, and on 1,593,120 calls from four threads at once.
- **With the fix and the binding moved**, in a measurement that was reverted afterwards: `PowChooseLcmRungE`, the walk test that failed when climb batch 23 tried the move, passes. The 17 team demos that call `CHOOSE` reach their end (section 7.5).
- **The record decides the fix** (section 8). P-153 is the decision on the power `^` and is not needed for it.

**Recommendation (mine):** `CHOOSE` enters climb batch 24, with this patch's helper fix landed in the same rung as the binding's move. Without the fix it does not.

## 2. What the specification says

- `Specification/basic-lib/basic-integers.tex`, section "Integers", the method entry `opr CHOOSE(self, other: ZZ): ZZ` (`:606-616`): "The \OPR{CHOOSE} operator is defined only for natural number types; it computes the binomial coefficient \EXP{m \OPR{CHOOSE} n = m!/(n! (m-n)!)}. If \EXP{n<0} or \EXP{n>m}, the result is \EXP{0}." It also gives the property `FORALL (m,n: ZZ) (m CHOOSE n) + (m CHOOSE (n+1)) = ((m+1) CHOOSE (n+1))`. The result type was `NN` in the Working Draft of February 2011 and is `ZZ` here (`\revision{revival-integers}`, `:298-303`; Appendix I, "The integer trait").
- `Specification/basic/operators/opr-overview.tex`, subsection "GCD, LCM, and CHOOSE Operators" (`:254-266`): "The operator \OPR{CHOOSE} computes binomial coefficients: \EXP{n \OPR{CHOOSE} k = \binom{n}{k} = { n! \over k!(n-k)! }}." Then: "On a fixed-size integer type, by the rule for integer results above, a result that the type cannot hold throws an \TYP{IntegerOverflow}". The rule above is in subsection "Multiplication, Division, Modulo, and Remainder Operators" (`:155`): "For integer results, overflow throws an \TYP{IntegerOverflow}."
- So on `ZZ32`, `CHOOSE` answers the exact coefficient where it fits in 32 bits and throws `IntegerOverflow` where it does not. P-73 applies this rule to `CHOOSE` by name: "The rule covers every operation whose result can leave its type, `^`, `CHOOSE` and `LCM` included". On the compiled path the rule holds as the specification's, "and the compiled path departs from it at `^` (rows 523 to 525) and at `CHOOSE` (row 521)".
- The specification says nothing about parallel calls of `CHOOSE`. The value it gives is the value at every call. Loops run in parallel by default (`Specification/basic/expressions/for.tex`, "For Loops"; the skill's "Parallelism and mutable state").

A side finding about the text, outside the helper: the property is false at `m = n = -1` under the entry's own zero rule. `(-1) CHOOSE (-1)` is 0 (n<0) and `(-1) CHOOSE 0` is 0 (n>m), but `0 CHOOSE 0` is 1. It holds at every other pair, including every `m ≥ 0`. Both paths give the zero rule's values: walk's glue and the helper both return 0 where `k < 0` or `k > n` (`Int.java:361`, `simpleIntArith.java:205`), so `(-1) CHOOSE (-1)` and `(-1) CHOOSE 0` are 0 on both. The Working Draft has the same text (`Specification-1.0-frozen/basic-lib/basic-integers.tex:567-574`). The words "defined only for natural number types" seem to mean the property for `m ≥ 0`. Section 9 lists this as a question; it does not bear on batch 24.

## 3. What walk's glue class computes

`ZZ32`'s `CHOOSE` binds `Int$Choose` (`Library/FortressLibrary.fss:788-789`). That class is `rc(choose(u, v))` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:152-156`):

- `choose(long n, long k)` (`:360-386`) answers 0 where `k < 0 || k > n`. It folds `k` to `n − k` above `n/2`, and answers 1 or `n` at `k` 0 or 1. Otherwise it multiplies up `C(n−k+j, j)` for `j = 1..k`, in 64 bits: `accum = Math.multiplyExact(accum / g, m / (j / g))` with `g = gcd(accum, j)`. Each step is exact, because `j/g` divides `m`. The steps rise to `C(n, k)`, so the 64-bit product overflows only where the coefficient itself is past 64 bits. That overflow is caught and thrown as `overflow()`.
- `rc` (`:250-256`) throws `overflow()` where the 64-bit result is not an `int`. `overflow()` (`:258-261`) is the library's `IntegerOverflow` object in a `FortressError`, which a `catch` sees.
- So, over the whole `ZZ32` domain of both arguments, walk answers the exact coefficient where it fits and raises a catchable `IntegerOverflow` everywhere else. It keeps no state between calls. The sweep in section 7.1 measured it equal to the exact value at every pair.

## 4. What the compiled helper computes

The compiled prelude binds `ZZ32`'s `CHOOSE` to the same helper that the one library's binding would name: `opr CHOOSE(self, other:ZZ32): ZZ32 = jIntOverflowingChoose(self,other)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:741`, imported at `:44`). The helper is `simpleIntArith.intOverflowingChoose` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:203-220`), the team's code, unchanged by the revival (`git diff a874948ac` touches other methods only).

### 4.1 Its tables and its four regions

After the zero cases (`k < 0 || k > n` gives 0), it folds `k` to `n − k` above `n/2`. Then it answers 1 or `n` at `k` 0 or 1, and otherwise takes the first of these that applies:

1. `n ≤ 33` (`maxIntChooseN`, `:120`): a lookup in `intChooseTable`, half of Pascal's triangle up to row 33. The static initializer builds it by addition (`:122`, `:134-143`). Every `C(n, k)` with `n ≤ 33` fits: the largest is `33 CHOOSE 16` = 1166803110.
2. `k > 33`: `IntegerOverflow` (`:209-210`).
3. `n` above the safe-bound table `maxIntChooseSafeN[k−2]` (`:126-127`, 15 entries for `k` = 2 to 16): the slow path `intSlowCautiousChoose` (`:157-200`). It writes the factors `n, n−1, …, n−k+1` into an array and divides each prime factor of `2..k` out of some element. It then multiplies the elements with a check, giving −1 on overflow, which becomes `IntegerOverflow` (`:212-214`).
4. Otherwise the fast loop `r = r·(n−j)/(j+1)` (`:217-219`), which the table makes safe from intermediate overflow.

I checked the safe-bound table against the exact arithmetic. For each `k`, the largest `n` at which every intermediate `C(n, j)·(n−j)` of the fast loop fits an `int` is the team's entry: 46341, 1626, 338, 140, 82, 58, 46, 39, 35, 33, 31, 30, 30. For `k` = 15 and 16, no `n ≥ 2k` is safe, and every `n > 33` takes the slow path there anyway. This came from a Python scratch probe, `math.comb` against the fast loop:

    k= 2 team= 46341 computed_safe=46341 largest_n_fitting=65536
    k= 3 team=  1626 computed_safe=1626 largest_n_fitting=2345
    k=14 team=    30 computed_safe=30 largest_n_fitting=34
    k=16 team=    29 computed_safe=None largest_n_fitting=33

### 4.2 Where it raises: row 521's region

Region 2 tests `k > 33`, but the table that region 3 indexes ends at `k = 16`. So for `n ≥ 34` and a folded `k` from 17 to 33, `maxIntChooseSafeN[k−2]` (`:211`) throws `java.lang.ArrayIndexOutOfBoundsException`. No `catch` sees it, and it ends the run on both paths. Every coefficient in that region overflows `ZZ32`: the smallest is `34 CHOOSE 17` = 2333606220 > 2147483647. So the helper raises on no coefficient that fits; it raises the wrong exception on some that do not. This is row 521, as the row states it. In one thread there is no other departure: the sweep of section 7.1 found no wrong value and no raise on a coefficient that fits.

### 4.3 Where it raises or lies on coefficients that fit: the shared scratch array (new)

`tempIntChooseArray` is a static field (`:121`, `new int[maxIntChooseN/2]`). Every call of the slow path writes it (`:163`), divides it (`:181-183`) and multiplies it (`:194-196`). Two calls that run at once corrupt each other's factors. Region 3 is wide, so this matters: `46342 ≤ n ≤ 65536` at `k = 2`, `1627 ≤ n ≤ 2345` at `k = 3`, and the rest of the table. Fortress loops are parallel by default. The measured results, all on the unfixed helper at four threads, for `n CHOOSE 2` with `n` from 46342 to 65536 (section 7.3):

- wrong values, as `48930 CHOOSE 2` → 721741965 (exact 1197047985);
- a false `IntegerOverflow` on a coefficient that fits, as `1691 CHOOSE 3`, from a Java scratch probe;
- a raw `java.lang.UnknownError: THIS SHOULDN'T HAPPEN in intSlowCautiousChoose`, which no `catch` sees. The helper prints stray numbers to standard output before it throws (`:187-189`).

This defect is on the compiled path today, through the prelude's `CHOOSE`. Walk does not show it today, because walk's `CHOOSE` names `Int$Choose`, which shares nothing. Walk would show it from the moment the binding names the helper. `simpleLongArith.longSlowCautiousChoose` has the same static `tempLongChooseArray` (`simpleLongArith.java:105`), and through it `ZZ64` and `NN32` (`simpleUnsignedIntArith.java:80-82`) have the same race (section 7.3). The record does not hold this defect: grep finds `tempIntChooseArray`, `tempLongChooseArray` and `SlowCautious` in no note, and `ledger.py find --cites` on the file lists rows 350, 441, 521 and 523 only. Section 9 gives its row.

## 5. A correct helper, and the fix

The helper's job is the specification's: the exact coefficient, or `IntegerOverflow` only where the coefficient does not fit. It raises the way the other `simpleIntArith` helpers raise, with `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")`. That is the string that `intOverflowingAdd`, `intOverflowingMul` and `longOverflowingToInt` use (`:62-97`). Walk's loader raises the library's `IntegerOverflow` in its place (`interpreter.md`, "Natives"; F-299). It must also hold no state that two calls share.

The fix keeps the team's algorithm, both tables and every public signature, and changes two things in `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java`:

- `intOverflowingChoose` now tests `k - 2 >= maxIntChooseSafeN.length` instead of `k > maxIntChooseN`. Region 2 thus starts where the table ends: at `n > 33` and a folded `k ≥ 17`, where every coefficient overflows (section 4.2). This is row 521's named fix: "throw `IntegerOverflow` when `k-2` is past the table's end".
- `intSlowCautiousChoose` allocates its array per call, `int[] tempIntChooseArray = new int[k]` (at most 16 entries, since `k ≤ 16` there), and the static field is removed.

The diff of the helper, from the patch:

    -    private final static int[] tempIntChooseArray = new int[maxIntChooseN/2];
    ...
    +	// Each call has its own array, since calls can run in parallel.
    +	int[] tempIntChooseArray = new int[k];
     	for (int j = 0; j < k; j++) tempIntChooseArray[j] = n - j;
    ...
    -	if (k > maxIntChooseN)
    +	// Here n > maxIntChooseN, so `n CHOOSE k` for a k past the end of maxIntChooseSafeN
    +	// is at least `34 CHOOSE 17`, which no int holds.
    +	if (k - 2 >= maxIntChooseSafeN.length)
     	    throw Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow");

`intSlowCautiousChoose` keeps its public signature. The team's compiled test `library_tests/IntegerChoose1.fss` imports it with `import java` (`:13`), and the import still wraps (section 7.4). The patch does not touch `simpleLongArith`. Its two halves of row 521, `ZZ64` and `NN32`, and its race need the same two changes, at `simpleLongArith.java:105`, `:137` and `:182`. They are for the rung that moves `ZZ64`'s `CHOOSE`.

## 6. The tests

All four files are in the patch.

- `ProjectFortress/tests/ChooseHelperWalk.fss`: walk, with the helper bound by the test's own `builtinPrimitive` declaration. It pins 20 values across the four regions and their bounds, including the zero cases and `MAX`. It pins 12 overflows, `34 CHOOSE 17` among them. A parallel `for n <- 46342:65536` asserts `n CHOOSE 2` against `n(n−1)/2`, computed in `ZZ32` without overflow.
- `ProjectFortress/compiler_tests/ChooseHelperCompiled.fss` and `.test` (`link`, `run`, `run_out_contains=PASS`): the same assertions on the compiled path, through the test's own binding, as `compiler.md`, "Natives", asks.
- `ProjectFortress/tests/ChooseZZ32Walk.fss`, the guard: the same values, overflows and parallel loop on the library's own `ZZ32` `CHOOSE`. Today that is `Int$Choose`, so the guard passes before and after the fix; it has no failing run. After batch 24's move it pins the moved binding to walk's values.

Before the fix (harness on the base code, four threads):

    $ harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/ChooseHelperWalk.fss ProjectFortress/tests/ChooseZZ32Walk.fss
    Wrapped exception java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15
    F. interpret tmp/h1/tests/ChooseZZ32Walk
     OK (time = 5717ms)
    Tests run: 2,  Failures: 1,  Errors: 0

    $ ONE_JVM=1 .../climb-batch-N/merged-tests/junit.sh before ProjectFortress/compiler_tests ChooseHelperCompiled.test
    . link ProjectFortress/compiler_tests/ChooseHelperCompiled  OK (time = 15899ms)
    . run ProjectFortress/compiler_tests/ChooseHelperCompiled (1048ms) java.lang.ArrayIndexOutOfBoundsException
    Tests run: 2,  Failures: 1,  Errors: 0

After the fix (`ant compileAll` and the library order; the last code state):

    $ harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/ChooseHelperWalk.fss ProjectFortress/tests/ChooseZZ32Walk.fss
    . interpret tmp/h1/tests/ChooseZZ32Walk
     OK (time = 26517ms)
    . interpret tmp/h1/tests/ChooseHelperWalk
     OK (time = 3552ms)
    OK (2 tests)

    $ ONE_JVM=1 .../climb-batch-N/merged-tests/junit.sh after ProjectFortress/compiler_tests ChooseHelperCompiled.test
    . run ProjectFortress/compiler_tests/ChooseHelperCompiled (1333ms) PASS
    OK (2 tests)

The tests' race part, shown red separately: in the runs above, the first failure stops at `34 CHOOSE 17` before the loop. So I copied each test into a scratch folder with only its loop left, and ran each copy three times through the same harness:

    before the fix: walk run 1/2/3: FAILURES!!! 53069 / 51942 / 53411 CHOOSE 2 in a parallel loop
                    compiled run 1/2: Tests run: 2,  Failures: 1 (n CHOOSE 2 in a parallel loop); run 3: OK (2 tests)
    after the fix:  walk run 1/2/3: OK (1 test);  compiled run 1/2/3: OK (2 tests)

The loop is a guard against reintroducing shared state. Before the fix it fails often, but not always. After the fix it cannot fail, since the helper keeps no shared state. A passing run does not prove the absence of a race in other code (`SKILL.md`, "Parallelism and mutable state").

## 7. Measurements

Machine: `nproc` 4, Intel Xeon Processor @ 2.10GHz (2100 MHz), OpenJDK 25.0.4.1. Other agents ran beside this probe: load 3 at start, 16 to 27 during the runs. No timing is kept; walk is not timed.

### 7.1 Both implementations against the exact value, every region

A Java scratch probe, compiled against `bin/fortress_classpath`, calls `simpleIntArith.intOverflowingChoose` and walk's `Int.choose` with `rc`'s range check. It compares each with the `BigInteger` coefficient. The pairs: every `k` for `n ≤ 200`; for `−3 ≤ n ≤ 70000`, the 43 values of `k` at each end of the row and beyond it; and edge pairs at `MAX` and `MIN`. This covers every pair whose coefficient fits: one with `2 ≤ min(k, n−k)` fits only for `n ≤ 65536` and `min(k, n−k) ≤ 16`. The command was `java -cp tmp/probe/classes:$CP ChooseSweep sweep 70000`.

    before: calls 6023925 for -3 <= n <= 70000
            helper: {BAD-on-overflow(EXC=2378317, ok-overflow=2947915, ok-value=697682}
              helper first BAD-on-overflow(EXC: 34 CHOOSE 17 -> ...ArrayIndexOutOfBoundsException:Index 15 out of bounds for length 15
            walk:   {ok-overflow=5326232, ok-value=697682}
    after:  helper: {ok-overflow=5326232, ok-value=697682}
            walk:   {ok-overflow=5326232, ok-value=697682}

So, before the fix, the helper gave all 697,682 coefficients that fit exactly, in one thread. It threw the raw exception at 2,378,317 pairs, every one of them an overflow. After the fix, it matches walk pair for pair.

### 7.2 Both paths on values near the bounds and past them

Fortress probes print the library's `CHOOSE` beside the helper bound by the program. Under walk, the library's is `Int$Choose`; compiled, the prelude's is the helper. Before the fix, at one thread, both paths print the same lines (walk shown; the compiled probe's 21 lines are identical):

    $ bin/fortress WalkChooseProbe.fss
    33 CHOOSE 16: library 1166803110, helper 1166803110
    34 CHOOSE 16: library IntegerOverflow, helper IntegerOverflow
    46342 CHOOSE 2: library 1073767311, helper 1073767311
    65536 CHOOSE 2: library 2147450880, helper 2147450880
    65537 CHOOSE 2: library IntegerOverflow, helper IntegerOverflow

Also identical: `2345`/`2346 CHOOSE 3`, `68 CHOOSE 34`, `MAX CHOOSE 1`, `MAX CHOOSE (MAX−1)`, `MAX CHOOSE 2` and the four zero cases. Then `34 CHOOSE 17` ends both runs. Walk prints 'Wrapped exception java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15'. Compiled prints 'Caused by: java.lang.ArrayIndexOutOfBoundsException: Index 15 out of bounds for length 15 / at com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingChoose(simpleIntArith.java:211) / ... fortress.CompilerBuiltin$ZZ32$DefaultTraitMethods.CHOOSE?0(.../CompilerBuiltin.fss:741)'. After the fix, the Java probe's `show` prints `IntegerOverflow` for `34 CHOOSE 17`, `35 CHOOSE 17`, `40 CHOOSE 20`, `50 CHOOSE 17`, `66 CHOOSE 33` and `67 CHOOSE 33`, as walk does.

### 7.3 The race

Each run below asserted or compared `n CHOOSE 2` for `46342 ≤ n ≤ 65536` in a parallel loop, at `FORTRESS_THREADS=4`, before the fix:

    walk, helper bound by the program, library CHOOSE as oracle (FORTRESS_THREADS=4 bin/fortress WalkChooseProbe.fss):
      run 1 mismatches=2   MISMATCH 47104 CHOOSE 2: helper 1210049415, library 1109369856
      run 2 mismatches=0
      run 3 mismatches=2   Wrapped error java.lang.UnknownError: THIS SHOULDN'T HAPPEN in intSlowCautiousChoose
    compiled, prelude CHOOSE (FORTRESS_THREADS=4 bin/fortress run CompChooseProbe):
      run 1 mismatches=11  MISMATCH 48930 CHOOSE 2: 721741965, exact 1197047985   (then UnknownError)
      run 2 mismatches=1   run 3 mismatches=3

The Java probe called the helper's slow path (`k = 2`, `46342..65536`; `k = 3`, `1627..2345`) from a thread pool (`ChooseSweep race T 20`):

    before: threads 1, calls 398280, wrong values 0, exceptions 0
            threads 2, calls 796560, wrong values 8, exceptions 3
            threads 4, calls 1593120, wrong values 20, exceptions 11
              first exc ...IntegerOverflow: 1691 CHOOSE 3 -> ...IntegerOverflow
    after:  threads 1/2/4: wrong values 0, exceptions 0

The `ZZ64` helper, unchanged by the patch, on its slow path at `k = 2` from `n = 3037000501` (`LongChooseRace T`): 'threads 1, calls 200000, wrong values 0, exceptions 0' and 'threads 4, calls 800000, wrong values 15, exceptions 5'.

### 7.4 Compiled tests that reach the changed methods

    $ ONE_JVM=1 nice -n 19 .../junit.sh lib ProjectFortress/library_tests Integer.test
    . run ProjectFortress/library_tests/IntegerChoose1 (1530ms) PASS
    . run ProjectFortress/library_tests/IntegerChoose2 (1877ms) PASS
    OK (27 tests)
    $ ONE_JVM=1 nice -n 19 .../junit.sh xxx ProjectFortress/compiler_tests ChooseTableCompiledRungELink.test XXXChooseTableCompiledRungE.test
    . run ProjectFortress/compiler_tests/XXXChooseTableCompiledRungE (1176ms) REACHED
    Caused by: java.lang.ArrayIndexOutOfBoundsException: Index 32 out of bounds for length 32
    Saw expected failure (Exit code != 0)

`XXXChooseTableCompiledRungE` asserts `ZZ32`'s `34 CHOOSE 17` first, then `ZZ64`'s `68 CHOOSE 34`. With the patch, the `ZZ32` assertion passes. The run then dies in `simpleLongArith`'s 32-entry table, so the test stays an expected failure until the `ZZ64` half is fixed. The patch leaves it as it is.

### 7.5 The binding moved onto the fixed helper (measured, then reverted)

To show what batch 24's move will meet, I changed `Library/FortressLibrary.fss:789` to `builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingChoose")`, on top of the fix, and ran these two checks. Then I reverted the line with `git checkout`; it is not in the patch.

    $ harness-one.sh $PWD/tmp/h3 ProjectFortress/tests/PowChooseLcmRungE.fss ProjectFortress/tests/ChooseZZ32Walk.fss ProjectFortress/tests/ChooseHelperWalk.fss
    . interpret tmp/h3/tests/PowChooseLcmRungE
     OK (time = 40339ms)
    OK (3 tests)

    $ bash tmp/run-demos-choose.sh tmp/demos-moved      # the demo driver, limited to the demos that call CHOOSE, FORTRESS_THREADS=1
    BirdCount1m	END	rc=0	clean	-------
    BirdCount2d	END	rc=0	clean	Merged Events:
    demos: 17 run, 17 reached their end

The 17 are `BirdCount1m` to `1z` and `2a` to `2d`, which call `cov CHOOSE j` inside `SUM` (`ProjectFortress/demos/BirdCount1z.fss:82`, `:89`).

Climb batch 23 measured the same move without the fix: `PowChooseLcmRungE` red, 'UNEXPECTED exception', `java.lang.ArrayIndexOutOfBoundsException` from `simpleIntArith.intOverflowingChoose` (`coordinator/CLIMB-BATCH-23.md:264`, `:273`). The checker's reading of the moved binding was not run here. The record counts `CHOOSE` among the bindings that fit as a bare string (PLAN, the natives line, N1 and N2).

### 7.6 The interpreter's suite, on the patch's code state

`ant testSystem` (under `nice -n 19`) on the fix with its tests, the binding not moved, after the last edit of code. 'Caches /home/user/fortress-choose24/default_repository/caches kept', then:

    [junit] Tests run: 182, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 583.064 sec
    [junit] Tests run: 170, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 595.802 sec
    [junit] Tests run: 170, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 603.919 sec
    [junit] Tests run: 174, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 609.348 sec
    BUILD SUCCESSFUL

That is 696 tests, with no failure. I ran the interpreter's suite part, as the brief asks. `tests-running.md`, "When to run a whole suite", also names `ant testQuick` for an edit of such a helper class. I did not run it. The compiled tests that reach the two changed methods ran instead (section 7.4), and the whole tracks are left to the batch's gate. I also did not run the full demo driver on the patch: no binding of walk's library names either changed method (grep of `Library/` and `LibraryBuiltin/` outside the compiler's files finds none), so walk's runs do not reach them. Section 7.5 ran the demos that call `CHOOSE` with the move.

## 8. Decided by the record, or the curator's word?

The record decides the fix, and it needs no new word from the curator:

- **What the helper must answer**: the specification's exact coefficient, and `IntegerOverflow` where the coefficient does not fit (section 2). P-73 names `CHOOSE` under that rule, and on the compiled path holds it "as the specification's (P-25)", naming row 521 as the departure. F-132 is walk's half, as built. Row 521 names the fix: "throw `IntegerOverflow` when `k-2` is past the table's end". P-58 says the binding moves onto the helper. Climb batch 23's fork 12, at its default, kept `CHOOSE` on its glue class until that fix (`coordinator/CLIMB-BATCH-23.md:43`, `:112`). The fork's other way named both helpers, `simpleIntArith` and `simpleLongArith`, so `XXXChooseTableCompiledRungE` is promoted only when the `ZZ64` half is fixed too (section 7.4).
- **P-153** is the decision on the integer power `^`: its negative exponent and its overflow. It says nothing about `CHOOSE`, and the fix needs nothing from it. The fix matches P-153's helpers only in raising `IntegerOverflow` from the helper, by the one string that both paths read.
- **The race fix** changes no behaviour that the specification or a decision allows. A shared scratch array gives values that the specification forbids, so a per-call array is an implementation repair. It needs no decision.
- **How the helper is fixed** was my choice (section 9, "Decisions").

## 9. For the report's reader

**Defects.**

- Row 521, `ZZ32` half: the helper throws a raw `ArrayIndexOutOfBoundsException` at `n ≥ 34`, `17 ≤ min(k, n−k) ≤ 33`. Every result there overflows. The patch repairs it, recorded by way 1 (`tests-writing.md`, "How a defect is recorded"): the assertions `overflows(34, 17)`, `(34, 18)`, `(50, 17)`, `(66, 33)` and `(67, 33)` in `ChooseHelperWalk` and `ChooseHelperCompiled`. The `ZZ64` and `NN32` halves (`simpleLongArith`) stay open, with `XXXChooseTableCompiledRungE` as their reproducer. A note for row 521, for whoever writes the ledger: "The `ZZ32` half's fix with its tests: `explorations/compile-ladder/plan-24/probes/choose.patch` (probe `plan-24/probes/choose.md`); with it, `XXXChooseTableCompiledRungE` fails only at its `ZZ64` assertion."
- **New**: the shared static scratch array of `intSlowCautiousChoose` and `longSlowCautiousChoose` (section 4.3). The patch repairs the `ZZ32` half, by way 1: the parallel loop in the three tests. The `ZZ64` half is deferred, and the specification settles it, so it is way 2, an `XXX` test, for the rung that fixes `simpleLongArith`. Until the patch lands, the row below records it. It passes `ledger.py check --rows`, except for the `?` in its number cell:

      | ? | the compiled `ZZ32` `CHOOSE` helper and its `ZZ64` sibling share one static scratch array across calls, so calls in parallel corrupt each other: in a parallel loop, `n CHOOSE 2` for `n` from 46342 to 65536 gives wrong values, a false `IntegerOverflow` or a raw `UnknownError` | NEGATIVE-VERIFIED | implementation gap (runtime) | `Specification/basic-lib/basic-integers.tex`, "Integers"; `Specification/basic/expressions/for.tex`, "For Loops" | none | plan-24 CHOOSE probe | siblings: 521. `simpleIntArith.intSlowCautiousChoose` fills and divides the static `tempIntChooseArray` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:121`, `:163`, `:183`, at 40f08d22e); `intOverflowingChoose` calls it for every `n` above its safe-bound table (`:211-212`); `simpleLongArith.tempLongChooseArray` (`:105`) likewise serves `ZZ64` and `NN32`. Compiled at four threads, `for n <- 46342:65536` asserting `n CHOOSE 2` failed in 2 of 3 runs; walk with the helper bound by the program, 3 of 3. Walk's `CHOOSE` names `Int$Choose`, which shares nothing. Fix: a per-call array (`explorations/compile-ladder/plan-24/probes/choose.patch`, `ZZ32` only). |

- The specification's `CHOOSE` property, false at `m = n = −1` (section 2): a defect of the text, not of either path. No program of the tree states the property, so there is no reproducer. It is way 3 if the curator wants it recorded: a ledger row, `CONTESTED` until the question below is answered.

**Sentences of the specification made false.** None. The patch makes the compiled path's `ZZ32` `CHOOSE` meet the specification's sentences.

**Decisions.**

- *How the helper is fixed.* I kept the team's algorithm and tables, with the guard where the table ends and a per-call array. The other way: replace the helper's body with walk's computation, 64-bit products with a `gcd` and a range check (`Int.java:360-386`, `:250-256`). That gives one algorithm on both paths, but drops the team's table and fast loop. Both are exact and raise only on overflow (section 7.1). My choice is the smaller change. It keeps `intSlowCautiousChoose`, which the team's test imports, and it changes one area and can be undone. No decision of the curator covers the choice.
- *Tests.* One test per path, through the test's own binding (`compiler.md`, "Natives"), plus a guard on the library's operator. I did not move the binding in the patch: batch 24 moves it (brief).
- *Scope.* `ZZ32` only, as the brief asks. `simpleLongArith`'s same two defects are measured and reported, not fixed.

**Points to report** (the brief's):

- The specification's answer: section 2.
- Walk's glue, its range, and what it does past `ZZ32`: section 3.
- The helper, its table, and where it raises on a result that fits: section 4. In one thread, nowhere. With parallel calls, anywhere in its slow path.
- A correct helper and the fix: section 5 and `choose.patch`.
- The tests: section 6. The measurements: section 7.
- Decided by the record: section 8.
- The recommendation (mine): `CHOOSE` enters climb batch 24, with the patch's helper fix landed in the same rung as the binding's move.

**For FACTS.**

- The fact: in one thread, the compiled `ZZ32` `CHOOSE` helper gives every coefficient that fits exactly. Its departures are a raw `ArrayIndexOutOfBoundsException` where `n ≥ 34` and `17 ≤ min(k, n−k) ≤ 33`, all of them overflows (row 521), and a race in its slow path across parallel calls (the new row). Walk's `Int$Choose` is exact over all of `ZZ32` and raises `IntegerOverflow` exactly where the coefficient does not fit.
  - What it means for the work: moving `ZZ32`'s `CHOOSE` onto the helper needs the patch's fix first, and then changes no value that walk gives.
  - The numbers: 6,023,925 pairs swept, 697,682 fitting and 5,326,232 overflowing; before the fix, 2,378,317 of the overflows raised the raw exception.
  - The check that fails if it stops holding, once the patch lands: `tests/ChooseHelperWalk.fss`, `compiler_tests/ChooseHelperCompiled`, and the guard `tests/ChooseZZ32Walk.fss`. Detail: sections 4 and 7.1 here.

**Commands worked out.**

- A Java sweep of a helper against the exact value: a scratch class compiled with `javac -cp "$(bin/fortress_classpath | tail -1)"` and run with `java -cp classes:$CP`. In a bare JVM, the helper's `IntegerOverflow` shows as `FortressImplementationError: fortress.CompilerBuiltin$IntegerOverflow`, and walk's `overflow()` as a `NullPointerException`, since no library is loaded. Read both as the raise.
- `junit.sh` and `harness-one.sh` run a test copied into any folder, as `junit.sh race1 tmp/probe/race ChooseRaceCompiled.test`. This let me run the race part of a test by itself.
- The team-demo driver limited to the demos that call `CHOOSE`: the driver of `rung-team-demos/REPORT.md` section 13, with `LIST=$(grep -l 'CHOOSE' *.fss | grep -v -E '…')`.

**Questions for the curator** (decisions not taken; none blocks batch 24):

- The `CHOOSE` property at `m = n = −1`. Source: `Specification/basic-lib/basic-integers.tex:613-616`, the team's text, the same in the Working Draft of February 2011. The ways:
  - restrict the property to `m ≥ 0`, which "defined only for natural number types" seems to mean, by the revision form (`specification.md`);
  - keep the text and record the conflict;
  - change the zero rule at negative `m`, a value change on both paths.

  The first two keep both paths' behaviour.
