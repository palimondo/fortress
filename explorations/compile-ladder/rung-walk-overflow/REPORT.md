# Rung O: overflow in the interpreter (row 379), stopped on its count

problem: under `walk`, `ZZ32 MAX + 1` wraps where row 379's test asserts `IntegerOverflow`; `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss:26`, walked in `explorations/compile-ladder/rung-walk-overflow/probes/failure-preedit.txt:3`
spec: "For integer results, overflow throws an `IntegerOverflow`", with wraparound given its own operators; `Specification/basic/operators/opr-overview.tex:154-155`, `:195-196`, `:172-176`, `:205-209`
precedent: the deliberate fix of batch 3.5's repair, which is `natives.patch` line for line; `explorations/compile-ladder/climb-batch-3.5/repair/overflow-xxx-harness.txt:35`
deviation: none; the patch is not applied (the rung stopped), so no line of the source differs from `47437c65f`; `explorations/compile-ladder/rung-walk-overflow/natives.patch:1`
historical: none

## 1. The outcome

The rung stopped, as its brief requires when the count is not zero (`explorations/coordinator/POSITIONS.md:88`; `explorations/coordinator/CLIMB-BATCH-4.md:145`). **Eleven** of the 393 files of `ProjectFortress/tests/` print something different under `walk` when the ten natives raise `IntegerOverflow`. All eleven exit 0 on the stock tree and 1 with the edit, so the gate would see eleven new failures. In every one the change is an uncaught `IntegerOverflow` that neither base run shows. The brief's second stop is met as well: four library files have bodies that rely on wrapping (section 4).

The branch changes nothing outside this directory. The test was renamed first and its failure captured, as the order of work requires. When the count came back at eleven the rename was undone (commit `a68f137d9`), so `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss` is back as it is at `47437c65f` and stays row 379's expected failure. The edit of the ten natives exists only as `natives.patch`. It was compiled into a shadow classes directory for the count and never applied to the source.

The eleven, with the first line that differs from the base output. For the two files whose output varies on its own, this is the first line neither base run has. The last column is the row 146 question: is the overflowing value declared `ZZ64` while it holds an `Int`?

| test | first differing line of the edited run | where the overflow is | native, first operands | row 146 shape |
|---|---|---|---|---|
| `HeapTest` (varies on its own) | line 5, `ProjectFortress/tests/HeapTest.fss:98:6-9:`, then `IntegerOverflow` | the test's own hash `spread`, `c1 n + c2` with `c1: ZZ32 = -761155213` (`HeapTest.fss:95-99`) | `Int$Mul -761155213 9` | no, all `ZZ32` |
| `IntMapTest` | line 1, `Library/RangeInternals.fss:1201:54-57:` (base line 1 is `OK`) | `StridedFullParScalarRange.generate`, `split-1` with `split` the minimum; later `IntMap.fss:676` `(-p)` | `Int$Sub -2147483648 1`; 27 × `Long$Negate` | no |
| `QuickCheckTest` (varies on its own) | line 1, `Library/Random.fss:235:22-37:` | `LinearCongruential.random`, `mult widen(state)` (`Random.fss:234-235`) | `Long$Mul 25214903917 81803813908983` | no, both genuine `ZZ64` |
| `RandomTest` | line 1, `Library/Random.fss:235:22-37:` | the same | `Long$Mul 25214903917 247594353610434` | no |
| `RangePrototype` | line 2, `Library/RangeInternals.fss:1031:48-51:` (base: `fullScalarRanges (16)`) | `CompactFullParScalarRange.generate`, `split-1` (`RangeInternals.fss:1030-1031`) | `Int$Sub -2147483648 1` | no |
| `ReflectiveQuickCheckTest` | line 1, `Library/Random.fss:235:22-37:` (base: `propAssociativeAddition:`) | `LinearCongruential.random` | `Long$Mul 25214903917 254418963896843` | no |
| `intPrim` | line 1, `ProjectFortress/tests/intPrim.fss:21:22-29:` | the test asserts wrapping: `a.minimum - 1 = a.maximum`, `a.maximum + 1 = a.minimum` (`intPrim.fss:21-22`) | `Int$Sub -2147483648 1` | no, `a: ZZ32` |
| `longPrim` | line 1, `ProjectFortress/tests/longPrim.fss:21:22-29:` | the same two assertions, with `a: ZZ64 = 0` (`longPrim.fss:20-22`) | `Int$Sub -2147483648 1` | **yes**: `a` holds an `Int`, so the minimum is `ZZ32`'s and the overflow is at 32 bits |
| `setSum` | line 1, `Library/RangeInternals.fss:1031:48-51:` | the parallel range `-4:4` (`setSum.fss:19`) through `RangeInternals.fss:1031` | `Int$Sub -2147483648 1` | no |
| `simpleSum` | line 1, `Library/RangeInternals.fss:1031:48-51:` | the range `(-2)#10` (`simpleSum.fss:53`) | `Int$Sub -2147483648 1` | no |
| `zeno` | line 1, `Library/ChunkedSparseArray.fss:76:57-59:` (base: `mx = 103`) | `secondaryIndex`, `(mask-1)` with `mask = widen(1) LSHIFT 63` | `Long$Sub -9223372036854775808 1` | no, genuine `ZZ64` |

Row 146's shape explains one of the eleven, `longPrim`. That test asserts wrapping at whatever width `a` has, so it would overflow at 64 bits as well.

## 2. How the count was measured

- **The runner.** `count-run.sh` has the shape of `explorations/reviews/mie-probes/keep/nestprobe/run-tests.sh` without its `NestProbe` shadow. It runs one JVM per test, four at a time. Each shard has private `FORTRESS_CACHES` and one core per JVM (`-XX:ActiveProcessorCount=1`), with `-Xmx4g -Xss64m`, `FORTRESS_THREADS=1` and `timeout 600`. It reads nothing from `default_repository/` and writes nothing there.
- **The list.** `count-list.txt` holds every `ProjectFortress/tests/*.fss` file except row 379's test, under either name: 393 files, 63 of them `XXX` files. The runner takes an optional shadow classes directory and puts it ahead of `ProjectFortress/build`.
- **The passes, in order.** Base A ran on the stock build. The edit pass ran with `natives.patch` compiled by `javac` into a shadow directory. Base B ran on the stock build again. Running the edit between the two bases makes drift over time equal for both.
- **The build.** `ant compileAll` ran first (`BUILD SUCCESSFUL`, 64 s). After it, `default_repository/caches/global.map` was restored with `git checkout`, as batch 3.5's repair did.
- **The comparison.** `count-compare.py` replaces each work directory's path with `W` and drops the `secs=` of the trailer. A file whose two base outputs agree is stable, and it has changed if the edited run differs. A file whose two base outputs differ is listed as unstable and judged by hand. The comparison is in `count-compare.txt`: 393 tests, 376 stable, 9 of those changed, and 17 unstable.
- **The unstable files.** Two of the seventeen, `HeapTest` and `QuickCheckTest`, go from rc 0 to rc 1 with an `IntegerOverflow` neither base run has, so they are counted. The other fifteen exit 0 in all three runs, and their differences are timings, random data or thread interleaving, of the same kind between A and B: `ArrayListQuick`, `CovCollTest`, `PureListQuick`, `ShuffleTest`, `SkipListTest`, `TimingTests`, `TreapTest`, `WordCountSmall`, `abortBlock`, `buffons`, `nestedTransactions1` to `4` and `quicksortTest`.
- **The fourth pass.** A check that does not depend on output. `probes/overflow-probe.patch` makes each of the ten natives print `OVERFLOW-PROBE <native> <x> <y>` to stderr where it meets an overflow and then return the wrapped value, as it does today. Run over all 393 files, exactly the same eleven files meet an overflow and no other file does (`probes/overflow-probe-summary.txt`). This rules out two things: an overflow caught silently inside a test whose output stays the same, and one of the fifteen unstable files changing without showing it. The exit codes under the logging shadow equal base A's: 329 files exit 0, 57 exit 1 and 7 exit 255. The edit changes a native's result only when an overflow is met, so a file that meets none prints the same with the edit. For the fifteen random-driven files, the evidence is the edit pass and this pass, two runs with no overflow.
- **The machine.** 4 CPUs (`nproc`), Intel(R) Xeon(R) Processor @ 2.80GHz, 2800.212 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. Load averages at the start of each pass: base A 0.61, edit 2.36, base B 6.14 and the logging pass 1.35 (one-minute figures). The pass times were 11 min 9 s, 12 min 31 s, 12 min 6 s and 11 min 47 s, with another rung's worker on the box (`count-machine.txt`).
- **The outputs.** Base A and the edited output of each of the eleven are in `probes/count/<test>.baseA.txt` and `.edit.txt`, plus `.baseB.txt` for the two unstable ones. The work directories are under `tmp/` and not committed.

## 3. Test first, and the edit

The failing test came first.
- **The rename.** `git mv` made `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss` into `FixedWidthOverflowRungB.fss`. The component was renamed to match and the comment line re-pointed here. The assertions did not change (commits `218aea3dd` and `1225cff20`).
- **The failure.** Walked on the stock natives at `bin/fortress`'s default heap, the plain test prints `REACHED`, then fails its first assertion, `row 379: ZZ32 MAX + 1 throws IntegerOverflow`, and exits 1. Run through the `testSystem` harness over the one file (`explorations/compile-ladder/rung-int-semantics-walk/probes/harness-one.sh`), it is reported as a failure, `Tests run: 1, Failures: 1`, from `FileTests.java:364`'s `UNEXPECTED exception` branch. Both are in `probes/failure-preedit.txt`.
- **The edit.** `natives.patch` is the same text as batch 3.5's deliberate fix (`explorations/compile-ladder/climb-batch-3.5/repair/overflow-xxx-harness.txt:35-115`). `Negate` tests the minimum. `Add`, `Sub` and `Mul` use `Math.addExact`, `subtractExact` and `multiplyExact` and turn the `ArithmeticException` into `Int.overflow()`. `Div` tests the minimum divided by -1. Division by zero is left as it is (row 336).
- **What the edit does.** It was compiled into a shadow classes directory and never applied to the source. With it, the renamed test prints `REACHED` and `PASS`, and `IntSemanticsRungI.fss`, which must stay green, prints `PASS` (`probes/renamed-test-with-edit.txt`). This shows the edit, not a landed pass. `IntSemanticsRungI` is also among the 376 stable files and is unchanged in the count.
- **Why the rename was undone.** On the stop the rename was reverted (commit `a68f137d9`). A plain test that fails would turn the gate red if the branch were ever merged, while the `XXX` file is still the correct gated check of a deferred defect (home 2). The pre-edit capture keeps the renamed file's name, `ProjectFortress/tests/FixedWidthOverflowRungB.fss`, which exists only in commits `218aea3dd` to `39f08c9d1` of this branch.

## 4. Why the count is not zero: code that relies on wrapping

The count finds two kinds of code that rely on wrapping: the library, which is the brief's second stop ("a library body that relies on wrapping"), and tests.

**Library bodies, measured.**
- **`Library/RangeInternals.fss:1030-1031`**, `CompactFullParScalarRange.generate` (object at `:1013`). It splits a range at a power-of-two boundary: `split = partitionL((lo BITXOR hi)+1)`, then `mid = hi BITAND (BITNOT (split-1))`. When the bounds straddle zero, `lo BITXOR hi` is negative, `partitionL` (the native `Integer.highestOneBit(u - 1)`, `Int.java:212-216`) returns the minimum, and `split-1` wraps to the maximum. That gives `mid = 0`, the right split, by wrapping. Every parallel `ZZ32` range with a negative lower bound and a nonnegative upper bound goes through it: `-4:4` in `setSum.fss:19` and `(-2)#10` in `simpleSum.fss:53`.
- **`RangeInternals.fss:1200-1201`**, the same shape in `StridedFullParScalarRange.generate` (object at `:1183`), met by `IntMapTest`.
- **`Library/Random.fss:234-235`**, `LinearCongruential.random`: `(mult widen(state) + add) MOD modulus`, with `mult = 25214903917` and `modulus = 2^48` (`:252-253`). The product exceeds 2^63 for nearly every state below 2^48. The answer is right today only because a wrap modulo 2^64 keeps residues modulo 2^48. `QuickCheck.fss:1151-1153` and `ReflectiveQuickCheck.fss:337-339` build every test context on it, so `QuickCheckTest`, `ReflectiveQuickCheckTest` and `RandomTest` stop before their first property.
- **`Library/ChunkedSparseArray.fss:76`**, `secondaryIndex`: `popCount((mask-1) BITAND fe)`. Here `mask = widen(1) LSHIFT (i BITAND 63)` (`:75`), which is the `ZZ64` minimum at bit 63, so `mask-1` wraps. `zeno.fss` meets it through `chunkedSparseArray`.
- **`Library/IntMap.fss:673-677`**, `keySplit`: `(-p) BITAND mx`, where `p` is a `ZZ64` `partitionL` that is the minimum when the keys straddle zero. The logging pass measures 27 `Long$Negate` overflows in `IntMapTest` after its first `Int$Sub`.

**Library bodies, by reading only.** Three more sites in `RangeInternals.fss` have the same `split-1`: `:1045-1046`, `:1220-1221` and `:1241-1242`. Each of the five `(lo BITXOR hi)+1` also overflows when `lo BITXOR hi` is the maximum, for example a range `0:2147483647`. `Random.fss:241`, `LinearCongruential.perturbed`, has the same product as `:235`. `Library/Generator22D.fss:227-238` has the same split shape four times. Its bounds are array indices, which are nonnegative, so by reading it does not overflow. The count covers only what `ProjectFortress/tests/` exercises. The library code no test reaches, and programs outside the corpus, were not measured.

**Tests that rely on wrapping.** These are the team's own tests in the 2012 tree:
- `ProjectFortress/tests/intPrim.fss:21-22` and `longPrim.fss:21-22` assert `a.minimum - 1 = a.maximum` and `a.maximum + 1 = a.minimum`, which is exactly what the specification refuses.
- `HeapTest.fss:95-99` is a multiplicative hash in `ZZ32`.
- `QuickCheckTest.fss:89-90` checks "associativity of `+` operator over `ZZ32` domain: should pass" on random `ZZ32` values, which holds only under wrapping. The logging pass meets 8 `Int$Add` overflows there.
- `ReflectiveQuickCheckTest.fss:16-17` has the same property; the logging pass meets 12 `Int$Add` overflows there.

The last two are hidden today behind the random generator's overflow, which comes first.

**The library authors knew about overflow.** `RangeInternals.fss:59` says "tries to avoid overflow", and `Random.fss:350-351` gives MT19937's seed vector the type `ZZ64` "due to the overflow mechanism". So the authors wrote parts of these files expecting overflow to be an error, and the sites above are the places where they did not.

## 5. Row 146's effect

This was measured separately in `probes/Row146Width.fss` and `probes/Row146Width.txt`, at `bin/fortress`'s default heap:
- `x: ZZ64 = 2147483647` holds an `Int` and `w: ZZ64 = widen(2147483647)` holds a `Long`.
- On the stock natives, `x + 1` is `-2147483648` and `x DOT x` is `1`, while `w + 1` is `2147483648`.
- With the edit, `x + 1` and `x DOT x` are `IntegerOverflow` at 32 bits, and `w`'s answers are unchanged.

So after row 379's fix, a `ZZ64` variable set from a small numeral fails at the 32-bit bound instead of wrapping there, until the flattening's coercion widens it. The specification wants neither answer, since it wants 64-bit arithmetic. In the corpus this shape reaches one file of the eleven, `longPrim`. It also moves one line of the walk-against-compiled differential (section 7).

## 6. Where the fix belongs, the precedent, and the specification

**Where it belongs.** `builtinPrimitive("…")` in a library body is matched and loaded from `interpreter/glue/prim/` (`explorations/coordinator/map/modules-and-phases.md:84`). The ten natives are `Int.java:98-125` and `Long.java:112-139`. They are bound once each by the `ZZ32` and `ZZ64` bodies of `Library/FortressLibrary.fss:658-671` and `:726-739`, and `DOT`, `TIMES` and juxtaposition share `Mul`. `|..|` is the library body `if self>=0 then self else -self end` over `Negate` (`:652`, `:710`). Nothing else in `ProjectFortress/src/` names those ten classes (a `git grep` over the tree). The other bindings are `ProjectFortress/not_working_static_tests/BuiltinTest.fss:31-43` and two probes under `explorations/perf-probes/prelude/`. `interpreter/glue/prim/ZZ32.java:86-114` holds a second, unbound copy of the same five wrapping natives; only its `ToNN32` is bound (`FortressLibrary.fss:700-701`). The fix of the natives belongs where the decision puts it. What the count shows is that it cannot land alone.

**The precedent: how the tree detects fixed-width overflow.** The tree has four shapes, cited:
1. The team's sign test, `((c ^ a) & (c ^ b)) < 0` (`nativeHelpers/simpleIntArith.java:62-72`, `simpleLongArith.java:58-68`).
2. `Math.*Exact` inside a `catch`: the compiled path's long multiply (`simpleLongArith.java:70-76`), `Int.lcm` in the same file as the edit (`Int.java:278-283`) and batch 3.5's deliberate fix.
3. Widen and check the narrowing: `simpleIntArith.intOverflowingMul`, and `Int.rc` (`Int.java:248-254`), which raises the uncatchable `ProgramError` of row 347.
4. An explicit minimum test for negation and for the minimum divided by -1 (`simpleIntArith.java:80`, `:85`; `simpleLongArith.java:80`, `:85`).

The raise under `walk` is `Int.overflow()` (`Int.java:256-259`), already used at `Int.java:137`, `:145`, `:277` and `:282` and `Long.java:151`. The patch takes shapes 2 and 4 with `Int.overflow()`, which is batch 3.5's deliberate fix. That fix was shown to turn the expected failure red and then reverted, so the patch has already been exercised against the harness.

**Sites of the same defect elsewhere in the two files**, by reading, not measured. Rung I's repair of `Gcd` and `Lcm` shows the defect lives in these files. Beyond the ten natives, four sites can leave the width without a catchable `IntegerOverflow`:
- `Int$Pow` (`Int.java:218-228`) and `Int$Choose` (`:150-154`) go through `Int.rc`, so they raise the uncatchable `ProgramError` (row 347).
- `Long$Pow` (`Long.java:230-240`) and `Long$Choose` (`:162-166`) wrap silently through `Int.pow` and `Int.choose`.

Division by zero is row 336's concern, at six sites: `Div`, `Rem` and `Mod` in each file. `Long$FromLong`, the narrowing that keeps the low 32 bits, is recorded behaviour (`explorations/coordinator/FACTS.md:76-77`). None of these is in row 379's list, and none was changed.

**The specification.** `Specification/basic/operators/opr-overview.tex:154-155`, read with the paragraphs around it, for multiplication and division: "The handling of overflow depends on the type of the number produced. For integer results, overflow throws an `IntegerOverflow`." `:195-196` says the same for addition and subtraction. It gives wrapping its own spellings: "Wraparound multiplication on fixed-size integers is expressed by ⊙̇ … These operations do not overflow" (`:172-176`), and ∔ and ∸ for addition and subtraction (`:205-209`). `Specification/basic/types-vals-vars.tex:511-515` names ℤ32 and ℤ64 among the fixed-size integer types.

So the specification settles row 379 against `walk`. It also settles that every body in section 4 is, by the specification, an overflow, and that code which means to wrap has the ∔, ∸ and ⊙̇ spellings to say so. The interpreter's library declares none of those operators (row 348's note: "the interpreter prelude declares neither operator"; no `DOTPLUS`, `DOTMINUS` or `DOTTIMES` in `Library/FortressLibrary.fss` or `.fsi`, by `grep`). The compiler prelude declares them with the spellings reversed (row 348).

## 7. The differential for the skeptic

These runs are at `bin/fortress`'s default heap, `-Xmx256m -Xss32m`, and the capture is `probes/differential-intsemtable.txt`. Row 379's probe table, `explorations/compile-ladder/rung-int-semantics-compiled/probes/IntSemTableWalk.fss`, was walked twice: once on the stock natives, saved as `probes/IntSemTableWalk-stock.txt`, and once with the edit in the shadow, saved as `probes/IntSemTableWalk-edit.txt`.
- **Stock against edit.** Exactly row 379's lines move, each to `IntegerOverflow`: lines 35-40 (`|MIN|`, `-MIN` and `MIN DIV -1` on both widths), 49-50 (`ZZ64 MIN 2`, `MIN -1`) and 52 (`2^32 2^31`).
- **Edit against the compiled answers** (`IntSemTable-compiled-after.txt`). No overflow line differs. What remains is `ZZ64 3 LSHIFT 63`, `0` against `-9223372036854775808`: its receiver `threeL: ZZ64 = 3` (`IntSemTableWalk.fss:57`) holds an `Int` under `walk`, so `ZZ32`'s shift answers. That is row 146, already a ledger row. The other remaining lines are the `DOTMINUS` and `DOTCROSS` lines, which `walk` does not declare (row 348).

The twelve assertions of row 379's test all raise the catchable `IntegerOverflow` with the edit (`probes/renamed-test-with-edit.txt`).

## 8. What the decision needs

The count is eleven. The decision is Pavol's (`POSITIONS.md:88`) and is not taken here. These are the candidates, derived with what each costs:
- **(a) Repair what relies on wrapping first, then the natives, as in the decision.** It takes three sets of edits:
  - The library bodies of section 4: four files, `RangeInternals.fss` (five `split-1` sites and five `+1` sites), `Random.fss` (two), `ChunkedSparseArray.fss` (one) and `IntMap.fss` (one).
  - The five tests: `intPrim.fss` and `longPrim.fss` (two assertions each, either restated to expect `IntegerOverflow` as the specification says, or rewritten with a wraparound operator), `HeapTest.fss`'s hash, and `QuickCheckTest.fss`'s and `ReflectiveQuickCheckTest.fss`'s associativity properties.
  - The ten natives.

  Every one of those is a file of the 2012 tree. The specification's own spelling for code that means to wrap is ∔, ∸ and ⊙̇ (`opr-overview.tex:172-176`, `:205-209`). Using it under `walk` means declaring those operators on `ZZ32` and `ZZ64` in `Library/FortressLibrary.fss` and `.fsi`, which rung K owns in this batch, bound to wrapping natives beside the checked ones. That adds new declarations to the prelude and meets row 348's reversed spellings on the compiled side. The alternative is to rewrite each body so that it does not overflow, which needs no new operator but is harder to review. One example: `RangeInternals`'s split at zero is `mid = 0` when `split` is the minimum.
- **(b) Keep `walk` wrapping, which is the decision reversed.** Row 379 stays open against the specification, and its expected-failure test stays. Nothing else moves.
- **(c) Natives that raise, with a separate wrapping primitive for the library only**, not the specification's operators. This is the narrowest library change, but it leaves the specification's spellings undeclared and adds a spelling of our own.

With any repair, row 146's effect (section 5) reaches programs that set a `ZZ64` variable from a small numeral, until the flattening widens it.

## 9. Every measured defect and its home

- **Row 379, `walk` wrapping where the specification throws.** Deferred by the stop, and the specification settles it: **home 2**, the existing expected failure `ProjectFortress/tests/XXXFixedWidthOverflowRungB.fss`. It is restored unchanged, still fails as expected on the stock tree, and was shown to go red on this same edit in batch 3.5 (`climb-batch-3.5/repair/overflow-xxx-harness.txt:125-144`). The five tests that assert or rely on wrapping (section 4) are this defect seen from the corpus. They pin an answer the specification refuses, and changing them is part of the decision. They are listed in the ledger note for row 379.
- **The library bodies that rely on wrapping.** This is not a defect in what the current tree prints: every one computes the right answer today, and the specification does not fix how the library computes a range split or a random number. It is a dependency of row 379's repair, and the stop's reason. A test cannot observe it until the natives raise, so neither an expected failure nor a probe that fails today can hold it. Its gated check already exists: the eleven plain tests of section 1 go red if the natives change without it. It is recorded in row 379's ledger note, with `probes/overflow-probe-summary.txt` as the measurement. This is a decision, and the alternative was a new provisional row 387. I did not open one, because what the row's repair would be depends on candidate (a), (b) or (c), which is Pavol's.
- **Row 146's 32-bit overflow after the fix** (`probes/Row146Width.txt`). This is row 146's existing mechanism, which the decision already names. It goes in an appended note to row 146, not a new home.
- **`ZZ64 3 LSHIFT 63` in the differential.** This is row 146 again, through the probe's own `threeL: ZZ64 = 3`. It is covered by row 146 and needs no new entry.
- **The four sites in `Int.java` and `Long.java` beyond the ten**, and the six division-by-zero sites. These were found by reading and not measured, so they have no home of their own here. They are listed for whoever takes up row 379. The division sites are row 336's.

## 10. Inherited, verified, and not done

- **Inherited.** The branch was fresh: `git log 47437c65f..HEAD` was empty, the working tree clean and `tmp/` absent.
- **Not done.**
  - `ant testFast` and `ant testSystem` were not run, as the brief directs.
  - The checker count is 103 and unchanged: no source file differs from the base.
  - The ladder subset was not run: no name was added and no compiled-path file touched.
  - The competing-declaration grep (step 6) has nothing to cover: the rung adds no declaration. The one name it introduced, the component `FixedWidthOverflowRungB`, is no longer on the branch, and `git grep` found it nowhere else.

## 11. Files

- `count-run.sh`, `count-list.txt` and `count-compare.py`: the runner, its list and the comparison.
- `count-compare.txt` and `count-machine.txt`: the comparison's output and the machine and times.
- `natives.patch`: the ten natives' edit, not applied.
- `probes/failure-preedit.txt`: the renamed test failing, walked and through the harness.
- `probes/count/`: the eleven tests' outputs.
- `probes/overflow-probe.patch` and `probes/overflow-probe-summary.txt`: the logging pass.
- `probes/Row146Width.fss` and `probes/Row146Width.txt`: row 146's effect.
- `probes/differential-intsemtable.txt`, `probes/IntSemTableWalk-stock.txt` and `probes/IntSemTableWalk-edit.txt`: the differential.
- `probes/renamed-test-with-edit.txt`: the edit's effect on the two tests.
- `record.md`: the record lines.
