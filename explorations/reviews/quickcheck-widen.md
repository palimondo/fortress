<!-- What the library's `QuickCheck` is, which tests run it, how it came to call `ZZ`'s `widen` at `Library/QuickCheck.fss:322`, and what each way on `widen` would do to it, written 2026-10-31 by an Opus worker for the curator, by reading the tree and its history, with one run of the gated test and three probes under walk. Tree: `main` at `7cd6f8ee4`, whose `Library/` and `ProjectFortress/` are those of `1f5c49b4f`. The runs used a worktree seeded from `/home/user/fortress-base23` (`1f5c49b4f`) with private caches, removed after; nothing in the original tree was edited, and the probe programs are quoted here whole. -->

# QuickCheck and `ZZ`'s `widen`

## 0. The answers in short

- **What it is.** A Fortress port of QuickCheck: generators by type, properties, labels, classification, shrinking, and random functions (section 1). Two gated team tests run it under walk. Only `ReflectiveQuickCheckTest` reaches line 322 (section 2).
- **Who wrote the call.** The revival did, in `d846e3644` (2026-09-27, climb batch 6, rung F, decision D10). The team's line, from its first commit (`senokay`, 2010-06-29) to `a874948ac`, had no `widen`. Crink never touched QuickCheck (section 4).
- **What the flattening did.** It created the call. It made the call's inputs run-time `ZZ` values, where they had been 64-bit values. It did not make them larger than 64 bits (sections 3 and 5).
- **The four ways.** Today none of them changes a test's result, because no value beyond 64 bits reaches the call. A raising way would end a check with an uncaught `IntegerOverflow` once such values arrive, as they would if walk converted at a declared return (row 387). Row 431's fix removes the call, and with it every way's effect on QuickCheck (section 6).
- **Deleting `ZZ`'s `narrow` and `widen`**, the curator's leaning, reaches further: lines 320 and 323 call `ZZ`'s `narrow` on every call of `genZZ.perturb`. Row 431's fix does not remove those (section 6.2).

## 1. What QuickCheck is in this library

- Two components: `QuickCheck` (`Library/QuickCheck.fss`, 1,159 lines; api `Library/QuickCheck.fsi`, 502 lines) and `ReflectiveQuickCheck`, which builds on it (`Library/ReflectiveQuickCheck.fss`).
- A generator `Gen[\T\]` makes random values of `T` with `generate` (`QuickCheck.fss:110-124`). There is one per type: `genZZ32`, `genZZ64`, `genZZ`, `genQQ`, `genRR64`, `genString`, lists, sets, maps, tuples and more (`:258-694`).
- An `Arbitrary` picks the generator for a static type (`DefaultArbitrary.gen0`, `:738-768`).
- A property is built with `forAll`. `check` runs it on random cases. Labels (`|:`), `classify`, `collect`, implication (`==>`) and shrinking of a failing case are there too (`QuickCheck.fsi:404-500`).
- **Random functions.** `genArrow` makes a function of type `T->U` (`QuickCheck.fss:682-694`). Its answer for an argument is generated from a random generator that the argument has perturbed. So the same argument always gives the same answer.
- Each generator's `perturb` does that perturbing: it "perturbs a random number generator using a given `obj`" (`:115-119`). It is the generator's coarbitrary.
- `genZZ.perturb` is the one for `ZZ` (`:318-326`). Line 322 is inside it.
- `ReflectiveQuickCheck` checks generic properties. It picks random types for each property's static parameters, and finds a generator for each type (`ReflectiveQuickCheck.fss:109-160`, `:197-240`). It maps `ZZ`, `NN64` and `NN32` to `genZZ`, and `QQ` to `genQQ` (`:149-152`).
- **Random source.** `check` and `checkGeneric` without a seed start a linear congruential generator from a system random seed (`QuickCheck.fss:1150-1153`; `ReflectiveQuickCheck.fss:340`; `Random.fss:259-260`). So every run draws different data.
- **Exceptions.** Neither component holds a `try` or a `catch` (`grep -n 'try\b\|catch' Library/QuickCheck.fss Library/ReflectiveQuickCheck.fss` finds none). An exception inside a property ends the whole run. It is not recorded as a failing case.
- **Its authors.** `senokay` committed it, from 2010-06-29 (`1cc975d2a`) to 2010-08-30 (`b6f63329f`). The files' headers name "Kang Seonghoon, KAIST" from the first commit (`git show 1cc975d2a:Library/QuickCheck.fss`, line 2). `research/authorship.md:67` leaves `senokay` unresolved. Later team commits were small: `sukyoungryu` (2010-06-29 to 2011-01-08) and David Chase (2011-12-20, a juxtaposition operator removed) (`git log --full-history a874948ac -- Library/QuickCheck.fss`, commits with a parent).

## 2. Which tests run it

| Test | Origin | What it checks | Reaches line 322? |
|---|---|---|---|
| `ProjectFortress/tests/QuickCheckTest.fss` | the team: `senokay`'s demo (`1cc975d2a`), moved into `tests/` by `sukyoungryu` (`5ed0be44b`), both 2010-06-29 | prints values of 19 generators and two random functions (`:47-85`); checks nine properties, some meant to fail (`:88-151`, `:93`, `:97`) | No, by reading. Its random functions take `ZZ32`, `ZZ64` or `Char` (`:72`, `:78`, `:113`). Its `ZZ` and `QQ` values are only generated (`:56-57`). |
| `ProjectFortress/tests/ReflectiveQuickCheckTest.fss` | the team: `senokay`, `e40544c31`, 2010-08-17 | nine generic properties, 100 cases each (`:14-46`) | Yes. `propMapSizeInvariant2` takes a random function `f:(Key,Val)->Maybe[\Res\]` (`:41-42`). When `Key` or `Val` is `ZZ`, `QQ`, `NN64` or `NN32`, the pair's `perturb` calls `genZZ.perturb` (`QuickCheck.fss:522-528`, `:337-342`). About 360 calls a run (`widen-evidence.md`, 8.2). |
| `ProjectFortress/tests/AnyGenPerturbOtherType.fss` | the revival, `f9fe5c874`, 2026-10-14 | `genZZ32`'s `perturb` | No |
| `ProjectFortress/tests/ReflectiveNumberTypes.fss` | the revival, `9d2e4c856`, 2026-10-02 | that a generator is found for four number types | No |

- All four are walk tests in `ProjectFortress/tests/`, which `ant testSystem` runs (`fortress-repo` skill, `tests-running.md`).
- The harness reads the two team tests leniently. A file whose name contains `QuickCheckTest` may print "fail" (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:382`).
- That leniency covers printed text only. An exception that escapes the program fails the test (`FileTests.java:341-369`).
- One run here: `OK (1 test)`, nine properties passed 100 cases each, 23.5 s with an empty cache (section 7.1).

## 3. What line 322 does today

    perturb(obj:ZZ, g:AnySeededRandomGen): AnySeededRandomGen =
        if -2147483648 <= obj < 2147483648 then
            g.perturbed(0, narrow(obj))
        else
            perturb(big(widen(obj) LSHIFT 32),
                    g.perturbed(1, narrow((obj BITAND 4294967295 (* 2^32-1 *)) -
                                          2147483648 (* 2^31 *))))
        end

(`Library/QuickCheck.fss:318-326`.)

- The intent: feed the argument into the generator 32 bits at a time, and stop when what is left fits a `ZZ32`.
- **The bug, row 431.** The line shifts left where it should shift right. So only the low 32 bits ever reach the generator.
- Measured (section 7.3): 2^40+7, 2^50+7 and 2^70+7 leave the generator in the same state; 2^40+8 does not. So a random function of a `ZZ` gives one answer for any two large arguments with the same low 32 bits.
- **Which `widen` runs.** The argument is a run-time `ZZ` at every call: 486 of 486 calls in section 7.4. Walk converts a generated `ZZ64` into `ZZ` at the parameter (`fortress-repo` skill, `revival-changes.md`, "Arguments convert"; `ZZ`'s `coerce(x: ZZ64)`, `Library/FortressLibrary.fsi:655`). So line 322 runs `ZZ`'s `widen`, and lines 320 and 323 run `ZZ`'s `narrow`.
- **The values stay within 64 bits.** `genZZ.generate` answered a run-time `ZZ64` 1,000 times in 1,000 (section 7.2). Walk does not convert at a declared return (row 387; `explorations/compile-ladder/rung-flat-tower/REPORT.md:48`).
  - Its levels 8 to 11 (`QuickCheck.fss:301`, `:309-314`) are written to build values beyond 2^64, as `(x LSHIFT 64) BITOR ...`. On a `ZZ64`, the shift loses the bits instead (P-69).
  - The recursion's own value, `big(widen(obj) LSHIFT 32)`, is within 64 bits by construction.
  - The instrumented runs agree: 0 values beyond 64 bits in two runs (`widen-evidence.md`, 8.2).
- Every call of `genZZ.perturb` ends in the in-range branch, at line 320: 200 in-range calls for 200 applications of a random function in section 7.4.

## 4. How the call arose

### 4.1 The team's line had no `widen`

- `git log --full-history -S widen a874948ac -- Library/QuickCheck.fss` lists 147 commits. 146 have no parent: they are the conversion's full-tree snapshots, which match every file (`research/authorship.md:14-22`). They were set aside.
- The one commit left is `1cc975d2a`, 2010-06-29, by `senokay`: "[library] Added QuickCheck to the library and demos". Its `widen`s are `ZZ32`'s, in `genZZ64.generate` and `genZZ.generate` (`git show a874948ac:Library/QuickCheck.fss`, lines 283-312).
- The same search on `Library/QuickCheck.fsi` finds nothing.
- `1cc975d2a` already wrote the left shift, with no `widen`: `perturb(obj LSHIFT 32, ...)` (`git show 1cc975d2a:Library/QuickCheck.fss`, line 297). A search for `obj LSHIFT 32` finds no later team commit, and at `a874948ac` the line reads the same (line 322).
- **Crink.** `git log --all --full-history --author=Crink -- Library/QuickCheck.fss Library/QuickCheck.fsi` prints nothing. Crink wrote `ZZ`'s `widen` in `e1567d62f` (2009-09-10), reverted it in `02e648434` and put it back in `8d2eb48f5` (2009-09-11) (`widen-evidence.md`, section 3). That was nine months before QuickCheck existed.
- On the team's nested tower, a `ZZ64` was a `ZZ` (`git show a874948ac:Library/FortressLibrary.fsi`, lines 495 and 533). So an argument that fit 64 bits stayed a 64-bit value, and `obj LSHIFT 32` wrapped to 0 within two steps (row 431).
- By reading, QuickCheck reached `ZZ`'s `widen` on the team's tree in another place. `ZZ64` declared no `widen` of its own then; only `ZZ32` and `ZZ` did (same api, lines 490 and 537). So `Random`'s linear congruential generator, which draws every QuickCheck number, ran `ZZ`'s `widen` on its `ZZ64` state (`git show a874948ac:Library/Random.fss`, lines 235 and 241). Every such value fit.

### 4.2 The revival wrote the call

- `git log --full-history -S widen a874948ac..HEAD -- Library/QuickCheck.fss` lists one commit: `d846e3644`, 2026-09-27, climb batch 6, rung F, "The one library's number types are siblings under Number, SUM and PROD are typed, and rationals are exact". It is a commit of the revival, not of the team.
- Its diff of the line:

      -            perturb(obj LSHIFT 32,
      +            perturb(big(widen(obj) LSHIFT 32),

- Why, by the rung's decision D10: on the flat tower the argument is always a `BigNum`, and "the base's `obj LSHIFT 32` on a `BigNum` never terminates" (`explorations/compile-ladder/rung-flat-tower/REPORT.md:105`).
- The rung's capture shows it. With the team's line put back, `ReflectiveQuickCheckTest` passed eight properties, then died at `propMapSizeInvariant2` with `OutOfMemoryError: Java heap space`, `rc=1` (`git show ab067d9b6^:explorations/compile-ladder/rung-flat-tower/probes/perturb-base-line.txt`).
- The rung kept "the base's 64-bit behaviour" rather than fix the shift, and opened row 431 for the bug (`REPORT.md:105`, `:244`).

## 5. What the flattening changed, batch by batch

PLAN calls climb batch 5 phase 1, and climb batch 6 with its follow-up 6b phase 2 (`explorations/coordinator/PLAN.md:25-31`).

- **Batch 5, rung D** (`ab914b6e0`, 2026-09-26), the wrapping operators.
  - Both team tests' associativity property moved from `+` to `∔` (`QuickCheckTest.fss:89-90`, `ReflectiveQuickCheckTest.fss:16-17`; `explorations/coordinator/CLIMB-BATCH-5.md:78`).
  - The linear congruential generator's two formulas moved to `⨰` and `∔` (`Library/Random.fss:239`, `:245`). That kept QuickCheck's random numbers as they were once arithmetic raised.
  - It did not touch `QuickCheck.fss` or line 322.
- **Batch 6, rung F** (`d846e3644`, 2026-09-27), the flat tower.
  - It wrote line 322 (section 4.2).
  - It gave `ZZ64` its own `widen(self):ZZ64 = self` (`Library/FortressLibrary.fss:906`; `widen-evidence.md`, 2.1). So the random generator's `widen` no longer reaches `ZZ`'s.
  - It made a rational's parts always `BigNum`s (`REPORT.md`, D6). So `genQQ.perturb` passes `ZZ` values to `genZZ.perturb` (`QuickCheck.fss:337-342`).
  - It mapped `NN64` and `NN32` to `genZZ` in `ReflectiveQuickCheck` (`ReflectiveQuickCheck.fss:150-151`). That added callers of `genZZ.perturb`.
  - It also wrote `DIV` in `genQQ.perturb` and `asFloat` in `genRR64.generate` (`QuickCheck.fss:341`, `:371`; `REPORT.md`, section 8).
- **Batch 6b, rung O** (`917bb7b32`), the natives raising `IntegerOverflow`.
  - `ReflectiveQuickCheckTest` was the one test whose output it could change: through `QQ`'s `<`, at random, on the runs whose data reached it. Rung F's exact rationals repaired that first (`explorations/coordinator/CLIMB-BATCH-6.md:23`, `:68`; `explorations/compile-ladder/rung-wrap-operators/REPORT.md:23`).
  - It did not change line 322.
- **For line 322, in sum.** The call exists because of rung F. Its inputs became run-time `ZZ` values, where they had been 64-bit values. Their size did not change: within 64 bits.
- **The record.** No FACTS or POSITIONS entry names QuickCheck (`grep -n -i quickcheck` on both files finds none). The entries on the tower (F-131 and P-43 on the flattening; F-44, F-46, F-61 and F-62 on the checker) do not name it. Two ledger rows do: 431, open, and 669, closed (`facts-extract.sh 'ledger-find:QuickCheck'`).

## 6. The ways on `widen`, read against QuickCheck

The ways are those of `widen-evidence.md`, section 9.

When could a value beyond 64 bits reach line 322?

- If walk converts at a declared return (row 387's fix), or if QuickCheck runs on the compiled path, which converts there (row 387). By reading, `genZZ`'s levels 8 to 11 then build values beyond 2^64: about a third of its values (`QuickCheck.fss:301`, `:309-314`).
- If a user's property applies a random function of a `ZZ` to a large value of its own, such as 2^70.

### 6.1 The four ways

| Way | Today's tests | Once a value beyond 64 bits arrives |
|---|---|---|
| **A. Keep the low 64 bits** (walk today) | No change. | As today: the random function answers by the low 32 bits (section 3). No error. |
| **B. Raise `IntegerOverflow`** | No change: no such value arrives (section 3). | The raise comes from inside the random function. Nothing in QuickCheck catches it (section 1), so the check stops and the test fails (`FileTests.java:341-369`). After row 387's fix, by reading, `ReflectiveQuickCheckTest` would fail on most runs. |
| **B′. Raise in both conversions out of `ZZ`** | As B. `ZZ`'s `narrow` at lines 320 and 323 is always in range: line 320 sits under the guard of line 319, and line 323 narrows a value masked to 32 bits less 2^31. | As B. The `narrow`s still never raise. |
| **C. Raise, with a named low-bits form** | As B. | As B, unless line 322 is changed to the low-bits form. That keeps today's answers. |

- The record has seen this test fail at random once before, when an operation it reaches began to raise (rung O, section 5).
- **Row 431's fix** writes `perturb(obj RSHIFT 32, ...)` (row 431). It removes the call, so no way on `widen` reaches QuickCheck.
  - It ends on any `ZZ`: a right shift reaches 0 or -1, both in range. `ZZ` declares `RSHIFT` (`FortressLibrary.fsi:693`).
  - It feeds every 32-bit part of the argument into the generator, as intended.
  - Its one other effect: random functions over `ZZ`, `QQ`, `NN64` and `NN32` give other answers. No test asserts a particular answer of such a function (section 2), and the data differ on every run anyway (section 1).
- **Order.** If B, B′ or C lands before row 431's fix, QuickCheck keeps a raise that cannot fire today and that row 387's fix would arm.

### 6.2 Beyond the four: deleting `ZZ`'s `narrow` and `widen`

The curator leans to delete both from the library now and design `ZZ`'s conversions later (`explorations/coordinator/HELD.md:7`). `explorations/reviews/integer-conversions-evidence.md` lays it out as way E (`:505-514`).

- Deletion removes the target of lines 320, 322 and 323.
- No coercion leads from `ZZ` to a fixed width (`FortressLibrary.fsi:539`, `:596-598`). So, by reading, walk would find no `narrow` or `widen` for these calls and stop the run.
- Every call of `genZZ.perturb` reaches line 320 (section 3). So deletion stops `ReflectiveQuickCheckTest` on any run that reaches `genZZ.perturb`. Both instrumented runs did, hundreds of times (`widen-evidence.md`, 8.2).
- Row 431's fix does not prevent this. It removes line 322's `widen` only. Lines 320 and 323 need a `ZZ32` from a `ZZ`, and under way E `ZZ` has no conversion out until the later design (`integer-conversions-evidence.md:507`).
- Way E names only line 322 for QuickCheck (`integer-conversions-evidence.md:437`, `:509-510`, `:514`). Lines 320 and 323 are a further rewrite in the same change.
- **QuickCheck's seed, later.** When P-68's rung lands, `Random.fss:203`, the seed of every unseeded check, reaches `ZZ`'s `widen` with a value below 2^53 (`widen-evidence.md`, 2.5; `integer-conversions-evidence.md:438`). Each of the four ways handles it alike. Way E needs P-68's own way from a float to `ZZ64` (`integer-conversions-evidence.md:511`).

## 7. The runs

Setup: `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base23 /home/user/fortress-qcw -`, a detached worktree at `1f5c49b4f`, then the setup lines of the `fortress-repo` skill (`build-and-caches.md`). Each probe ran under walk at `FORTRESS_THREADS=1` with a private caches folder, from its own folder, so that a copy of `QuickCheck` there is the one loaded. The worktree was removed after (`git worktree remove --force`). The machine: 4 CPUs, OpenJDK 25.0.4.1, load 1.47 at the gated run's start.

### 7.1 The gated test, once

    $ explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-qcw/tmp/h1 ProjectFortress/tests/ReflectiveQuickCheckTest.fss
    # harness-one 2026-10-31T10:02:02Z; tree 1f5c49b4f; nproc=4; load 1.47 1.55 4.62; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    propMapSizeInvariant2:
    Passed 100 test(s).
     OK (time = 23168ms)
    OK (1 test)

All nine properties printed "Passed 100 test(s)." The whole call took 23.5 s.

### 7.2 What `genZZ.generate` answers

    component GenZZProbe
    import QuickCheck.{...}
    import Random.{...}
    export Executable

    kind(v: Any): String =
        typecase v of
            ZZ64 => "ZZ64"
            ZZ => "ZZ"
            else => "other"
        end

    seedOf(a: AnySeededRandomGen): ZZ64 =
        typecase a of
            m: MersenneTwisterInit => m.random()
            else => -1
        end

    run(): () = do
        c = TestContext(defaultArbitrary, linearCongruential(), 50)
        limit: ZZ = big(9223372036854775807)
        var n64: ZZ32 = 0
        var nzz: ZZ32 = 0
        var nbeyond: ZZ32 = 0
        var nother: ZZ32 = 0
        for i <- seq(0#1000) do
            v = genZZ.generate(c)
            k = kind(v)
            if k = "ZZ64" then n64 := n64 + 1
            elif k = "ZZ" then
                w: ZZ = v
                if |w| > limit then nbeyond := nbeyond + 1 else nzz := nzz + 1 end
            else nother := nother + 1
            end
        end
        println("genZZ.generate x1000: run-time ZZ64 " n64 ", ZZ within 64 bits " nzz ", ZZ beyond 64 bits " nbeyond ", other " nother)
        z: ZZ = 1180591620717411303429
        println("widen(2^70 + 5) = " widen(z))
        p = genZZ.perturb(z, MersenneTwisterInit(1))
        println("genZZ.perturb(2^70 + 5, g) returned, its next number: " seedOf(p))
    end
    end

    $ FORTRESS_CACHES=/home/user/fortress-qcw/tmp/probe-caches ../../bin/fortress GenZZProbe.fss
    genZZ.generate x1000: run-time ZZ64 1000, ZZ within 64 bits 0, ZZ beyond 64 bits 0, other 0
    widen(2^70 + 5) = 5
    genZZ.perturb(2^70 + 5, g) returned, its next number: 3329817392

### 7.3 Only the low 32 bits reach the generator

    component PerturbLowBits
    import QuickCheck.{...}
    import Random.{...}
    export Executable

    seedOf(a: AnySeededRandomGen): ZZ64 =
        typecase a of
            m: MersenneTwisterInit => m.random()
            else => -1
        end

    after(z: ZZ): ZZ64 = seedOf(genZZ.perturb(z, MersenneTwisterInit(1)))

    run(): () = do
        println("2^40 + 7: " after(big(1099511627783)))
        println("2^50 + 7: " after(big(1125899906842631)))
        println("2^70 + 7: " after(1180591620717411303431))
        println("2^40 + 8: " after(big(1099511627784)))
    end
    end

    $ FORTRESS_CACHES=/home/user/fortress-qcw/tmp/probe-caches ../../bin/fortress PerturbLowBits.fss
    2^40 + 7: 1001751898
    2^50 + 7: 1001751898
    2^70 + 7: 1001751898
    2^40 + 8: 1889282171

### 7.4 The argument's run-time type inside `genZZ.perturb`

A copy of `Library/QuickCheck.fss` and `.fsi` went into the probe's folder. The copy gained a top-level `probeKind`, with the body of `kind` above, and one `println` at the head of each branch of `genZZ.perturb`:

    >             println("PERTURB-IN " probeKind(obj))
    >             println("PERTURB-ELSE " probeKind(obj))

The driver applies one random function of a `ZZ` to 200 generated values, as `propMapSizeInvariant2` applies `f`:

    component PerturbClass
    import QuickCheck.{...}
    import Random.{...}
    export Executable

    run(): () = do
        c = TestContext(defaultArbitrary, linearCongruential(), 50)
        f = genArrow[\ZZ,ZZ32\](genZZ, genZZ32).generate(c)
        var total: ZZ32 = 0
        for i <- seq(0#200) do
            v = genZZ.generate(c)
            r = f(v)
            total := total + 1
        end
        println("applied " total)
    end
    end

    $ FORTRESS_CACHES=/home/user/fortress-qcw/tmp/probe3-caches ../../bin/fortress PerturbClass.fss > ../probe3-out.txt; sort ../probe3-out.txt | uniq -c
        286 PERTURB-ELSE ZZ
        200 PERTURB-IN ZZ
          1 applied 200

The probe's `interpreter_cache` entry for `QuickCheck` named the copy's path, so the copy was the one loaded.

## 8. Findings new to the record

- Under walk, `genZZ.generate` never makes a value beyond 64 bits: 1,000 of 1,000 were run-time `ZZ64`s (7.2). Its levels 8 to 11 are written to, but their shifts run at 64 bits, because walk does not convert at a declared return (row 387). This corrects the last bullet of `widen-evidence.md`, 8.2, which reads those levels as making such values.
- `genZZ.perturb` uses only the low 32 bits of a large argument (7.3). This is row 431's effect, measured: a random function of a `ZZ` answers 2^40+7, 2^50+7 and 2^70+7 alike.
- Inside `genZZ.perturb`, the argument is a run-time `ZZ` at every call (7.4). So lines 320 and 323 call `ZZ`'s `narrow`, besides line 322's `widen`. Deleting `ZZ`'s `narrow` (way E of `integer-conversions-evidence.md`) stops `ReflectiveQuickCheckTest` even after row 431's fix. That note names only line 322 for QuickCheck.
- QuickCheck is `senokay`'s of 2010-06-29 (`1cc975d2a`). Its `genZZ.perturb` never had a `widen` in the team's history. Crink never committed to it. The `widen` is the revival's, `d846e3644`, decision D10 (section 4).
- Line 322 is the one call of `ZZ`'s `widen` in QuickCheck. In the library it is not the only one: `widen-evidence.md`, 2.5, and `integer-conversions-evidence.md:437` also name `Library/Format.fss:70`.
- On the team's tree, by reading, QuickCheck reached `ZZ`'s `widen` on every random number, through `Random`'s linear congruential generator, because `ZZ64` had no `widen` of its own (4.1). The flattening moved that call to `ZZ64`'s identity.
