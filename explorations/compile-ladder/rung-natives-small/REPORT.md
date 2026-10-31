<!-- Climb batch 24, rung S (rung-natives-small): the small rest's eight native bindings moved from walk's glue classes onto their static helpers of nativeHelpers, with a walk guard, a compiled guard and two tests of today's behaviour (rows 856 and 857). -->

# Rung S: the small rest, eight bindings onto their helpers

- problem: P-58 moves the bindings onto helpers step by step. The planner's families table lists the small rest's 8 among the 83 that fit as a bare string and still name a glue class (`explorations/compile-ladder/plan-24/probes/families-base.tsv:68-75`)
- spec: none: `grep -rln 'builtinPrimitive\|nativeHelpers' Specification/basic Specification/basic-lib` prints nothing (exit 1). The mechanism is the revival's own Appendix I entry (`Specification/appendices/changes.tex:4423`)
- precedent: climb batch 23's moves: `Int`'s getters onto `simpleIntArith.intToString` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:370-373`) and `ZZ32`'s `unsigned` onto a special name (`Library/FortressLibrary.fss:809-810`). The compiler's prelude binds the same six helpers (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:584`, `:523`, `:816`, `:880`, `:1067`, `:1060`)
- deviation: none
- historical: `Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`

## What changed and why

Under P-58, each native binding's string names a static helper of `nativeHelpers/`. The bindings move one family at a time, and from the step that moves a binding, the compiled checker reads it against the helper's Java signature. This rung moves the small rest: 8 strings, by the planner's `rung-S.patch` taken as it is.

| declaration | was | now |
|---|---|---|
| `value object Long`, `getter asString()` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:379-380`) | `Long$ToString` | `simpleLongArith.longToString` |
| `value object Long`, `getter asExprString()` (`:381-382`) | `Long$ToString` | `simpleLongArith.longToString` |
| `value object NN32`, `signed(self):ZZ32` (`:469-470`) | `NN32$ToInt` | `simpleUnsignedIntArith.makeZZ32FromNN32WithSpecialCompilerHackForNN32ArgumentType` |
| `value object BigNum`, `getter asString()` (`:566-567`) | `BigNum$ToString` | `simpleArbitraryPrecisionArith.toString` |
| `value object BigNum`, `getter asExprString()` (`:568-569`) | `BigNum$ToString` | `simpleArbitraryPrecisionArith.toString` |
| `value object Char`, `getter codePoint()` (`:616-617`) | `Char$CodePoint` | `simpleChar.charCodePointWithSpecialCompilerHackForCharacterArgumentType` |
| `trait NN64`, `signed(self):ZZ64` (`Library/FortressLibrary.fss:985-986`) | `UnsignedLong$ToLong` | `simpleUnsignedLongArith.makeZZ64FromNN64WithSpecialCompilerHackForNN64ArgumentType` |
| top-level `char(a:ZZ32):Char` (`Library/FortressLibrary.fss:4540`) | `Char$Chr` | `simpleChar.charMakeCharacterWithSpecialCompilerHackForCharacterResultType` |

Each helper computes what its glue class computed:

- `Long.toString(x)`: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:19-21`, against `interpreter/glue/prim/Long.java:262-266`.
- `b.toString()`: `simpleArbitraryPrecisionArith.java:26-28`, against `BigNum.java:274-278`.
- The identity on the `int` or `long`: `simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`, `simpleChar.java:57` and `:63`, against `NN32.java:239-243`, `UnsignedLong.java:239-243` and `Char.java:159-169`.

Walk carries `NN32` and `Char` in an `int` and `NN64` in a `long`, and answers each by the declared result (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:205-224`; F-299). So `char` answers a `Char`, and `signed` a `ZZ32` or `ZZ64`, as their glue classes did. The checker reads `int` as `NN32` or `Char`, and `long` as `NN64`, only for the six special names (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:373-384`, `:494-503`). That is why the four bindings over those types name them.

Left on their glue classes, as the brief says: `printlnWithThread` and `getProperty`, declared over `String` (Question 1, row 846); `FlatString`'s 5 (fork 17); and every other binding of these types.

## The runs

No test of this rung fails on the base's code, by design. The brief has every one of them pass on the base and on the text, because the move changes no value under walk (below). What the move does change is what the compiled checker reads, and the stages show that (below, with a control). The tests were written first, run on the base, and committed before the edit (`7b859b93f`). The edit is `df9e89d19`.

On the base's code, with the library unedited and the tests in place, before the edit was made:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-small/h-base ProjectFortress/tests/NativeHelperFamilySmallWalk.fss ProjectFortress/tests/SignedAboveSignedRangeWalk.fss ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss
    # harness-one 2026-10-31T13:16:03Z; tree b0f6cd6b7; nproc=4; load 3.16 3.30 2.58; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    . interpret tmp/rung-natives-small/h-base/tests/NativeHelperFamilySmallWalk
     OK (time = 13063ms)
    OK (3 tests)

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh smallbase ProjectFortress/compiler_tests NativeHelperFamilySmallCompiled.test
    . link ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled  OK (time = 6366ms)
    . run ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled (569ms) PASS
    OK (2 tests)

On the final code, in the last run after the last change (the control's restore, below):

    COLD_CACHE=1 explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-small/h-final ProjectFortress/tests/NativeHelperFamilySmallWalk.fss ProjectFortress/tests/SignedAboveSignedRangeWalk.fss ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss
    # harness-one 2026-10-31T13:32:24Z; tree df9e89d19; nproc=4; load 1.65 3.17 3.83; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    OK (3 tests)

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh smallfinal ProjectFortress/compiler_tests NativeHelperFamilySmallCompiled.test
    . link ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled  OK (time = 4480ms)
    . run ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled (371ms) PASS
    OK (2 tests)

The same four passed on the text right after the edit too: the harness at 13:17:54Z, 'OK (3 tests)', and junit.sh at 13:19:58Z, 'OK (2 tests)'. Walk's cache entries from the text's run hold the eight strings. `grep -o` on `default_repository/caches/interpreter_cache/FortressBuiltin-*.tfs` counts `simpleLongArith.longToString` 2, `simpleArbitraryPrecisionArith.toString` 2, and the `NN32` and `Char` special names 1 each. On `FortressLibrary-*.tfs` it counts the `NN64` and `char` special names 1 each.

The tests:

- `ProjectFortress/tests/NativeHelperFamilySmallWalk.fss`, the walk guard. It asserts:
  - `Long`'s two getters at the `ZZ64` maximum, minimum and 0;
  - `BigNum`'s two getters at 2^64 and at -123456789012345678901234567890;
  - `NN32`'s `signed` at 0, 7 and 2^31-1, and `NN64`'s at 0, 7 and 2^63-1;
  - `codePoint` of `'A'`, `|'A'|`, and `char(65) = 'A'`;
  - `char` then `codePoint` at 65, 0 and 128512 (U+1F600).
  
  It asserts nothing above the signed range or outside the code points.
- `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss`, today's behaviour (home 3, row 856): `signed(unsigned(-1))` is -1 on `NN32` and on `NN64`, and `signed` of the `NN32` 2^31 is -2147483648.
- `ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss`, today's behaviour (home 3, row 857): `char(-1).codePoint` is -1, and `char(1114112).codePoint` is 1114112.
- `ProjectFortress/compiler_tests/NativeHelperFamilySmallCompiled.fss` with its `.test` (`link`, `run`, `run_out_contains=PASS`), the compiled guard. It has six top-level declarations, one per helper of the 8, since `longToString` and `toString` each serve two getters:
  - `smallLongToString(x:ZZ64):JavaString`
  - `smallBigToString(x:ZZ):JavaString`
  - `smallSigned32(x:NN32):ZZ32`
  - `smallSigned64(x:NN64):ZZ64`
  - `smallCodePoint(c:Character):ZZ32`
  - `smallChar(x:ZZ32):Character`
  
  Each is the helper's Java signature as the compile reads it, and the walk guard's values are asserted.

## Walk's values, old against new

A scratch program, `tmp/rung-natives-small/vals/ValSmall.fss`, prints every moved binding at chosen values:

- `Long`'s getters, and the lengths of their strings, at the `ZZ64` minimum, -12, -1, 0, 7 and the maximum;
- `BigNum`'s getters at -123456789012345678901234567890, -(2^63)-1, 2^64, 2^128 and `big` of the `ZZ64` bounds;
- `NN32`'s `signed` of `unsigned` of 0, 7, 65535, 2^31-1, -2^31, -1 and -7, and `NN64`'s of 0, 7, 2^32, the bounds, -1 and -7;
- `codePoint` and `|c|` of 'A', 'z', '0' and ' ';
- `char`, then `codePoint`, `|c|` and `=`, at 0, 9, 10, 65, 233, 931, 55296, 57343, 65535, 65536, 128512, 1114111, 1114112, -1 and the `ZZ32` bounds;
- `char(65) = 'A'` and `char(65) < 'B'`.

Run on the old code and on the text:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 $PWD/tmp/rung-natives-small/old-caches tmp/rung-natives-small/vals/ValSmall.fss > old.txt   # old rc=0
    bin/fortress tmp/rung-natives-small/vals/ValSmall.fss > new.txt                                                                                         # new rc=0
    diff old.txt new.txt     # prints nothing; 47 lines each

So no walk value moves. These lines are among the outputs, the same on both: 'NN32 signed 2147483648 -2147483648', 'NN64 signed 18446744073709551615 -1', 'char 1114112 1114112 1114112 true', 'char -1 -1 -1 true'.

## The stages

Neither stage had run on this tree before. Each ran once on the final code (`df9e89d19`), in the background, under `nice -n 19`. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, shared with other rungs' agents.

The count ran from 13:20:28 to 13:23:29 UTC, **181 s**, with load 10.73 at start:

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-small/checker-count-postedit.txt tmp/rung-natives-small/cc-post
    com.sun.fortress.nativeHelpers	0
    #total	0
    #locations	0
    #crash	none
    diff explorations/compile-ladder/climb-batch-23/gate/checker-count.txt tmp/rung-natives-small/checker-count-postedit.txt   # prints nothing

The distance, with load 3.65 at start:

    explorations/coordinator/tools/distance/run.sh tmp/rung-natives-small/distance-postedit.txt tmp/rung-natives-small/dist-post
    #total	0
    #crash	none
    #seconds	194	FortressLibrary 142
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-23/gate/distance.txt tmp/rung-natives-small/distance-postedit.txt
    DISTANCE SAME   0

`diff` of the two distance tables differs only in the `#seconds` and `#machine` rows. The stage's per-site list holds only its header line, as `explorations/compile-ladder/gate/distance-sites.tsv` does: `wc -l < tmp/rung-natives-small/dist-post/errors.tsv` printed '1'. Read by row, no site comes and none goes.

**The control.** The control shows that the stages read these bindings as calls of their helpers. It is one more distance run on the final code with two strings pointed at the wrong helpers, then restored with `git checkout` of the two files:

- `Long`'s `asString` (`FortressBuiltin.fss:380`) naming `simpleIntArith.intToString`;
- `char` (`FortressLibrary.fss:4540`) naming the `codePoint` special name.

The table: '#total 2', 'typecheck 2', '#unit component FortressBuiltin 1', '#unit component FortressLibrary 1', '#crash none'. The two sites:

    FortressLibrary.fss:4540  Could not check call to function builtinPrimitive_simpleChar_charCodePointWithSpecialCompilerHackForCharacterArgumentType - Char->ZZ32 is not applicable to an argument of type ZZ32.
    FortressBuiltin.fss:380   Could not check call to function builtinPrimitive_simpleIntArith_intToString - ZZ32->String is not applicable to an argument of type Long.

So the distance reads a moved binding of each component against its helper's signature, `self` first, and reads the special name over `Char` as `Char`. The four tests ran again after the restore (above).

## Where the fix belongs, and the precedent

The place is each binding's string in the one library (P-58): `Library/FortressLibrary.fss` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`. This is walk's library, which the compiled path does not link until the switch-over. Nothing under `ProjectFortress/src/` changes, because walk's loader (F-299) and the compiled rewrite (F-298) already take such a string (`explorations/coordinator/map/modules-and-phases.md`, "B.12 Native code and Java interop").

The precedent is climb batch 23's move. On the base, 21 strings name a helper, 19 in `Library/FortressLibrary.fss` and 2 in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, against 107 and 234 lines that name a glue class (`grep -c`). Each move replaces one string and keeps the declaration's header and body form, as here. The compiler's prelude binds the same helpers for the same members:

- `ZZ64`'s `asString`: `jLongToString(self)` (`CompilerBuiltin.fss:584`);
- `ZZ`'s `asString`: `jAPToString` (`:523`);
- `NN32`'s and `NN64`'s `signed` (`:816`, `:880`);
- `Character`'s `codePoint`: `jCodePoint(self)` (`:1067`);
- `makeCharacter`: `jMakeCharacter(n)` (`:1060`).

## What the specification settles

Nothing of the binding: the specification names no native mechanism outside the revival's Appendix I entry (grep above). Of the values, it names only `narrow`'s wrap among the integer conversions (`basic-lib/basic-integers.tex`, "Integers"), and no conversion from an integer to a `Char`. So it is silent on `signed` above the signed half and on `char` outside the code points, and their tests are home 3 (rows 856, 857).

## Programs run old against new

- `ValSmall` (above): 47 lines, `diff` empty.
- The four tests: on the base's code and on the text, all passing (above).

One compiled probe, not run old against new: `tmp/rung-natives-small/cprobe/SignedCharCompiledProbe.fss`, compiled and run on this tree with the compiler's prelude (`bin/fortress compile` rc 0, `bin/fortress run` rc 0). It printed:

- 'NN32 signed of 2^32-1: -1'
- 'NN32 signed of 2^31: -2147483648'
- 'NN64 signed of 2^64-1: -1'
- 'makeCharacter(-1): IntegerOverflow'
- 'makeCharacter(1114112): IntegerOverflow'
- 'makeCharacter(1114111).codePoint: 1114111'

So the compiled path wraps `signed` the same way, through the same helpers (`CompilerBuiltin.fss:816`, `:880`). Its prelude has no `char`, and its `makeCharacter` raises `IntegerOverflow` outside 0 to 1114111 (`CompilerBuiltin.fss:1058-1062`, `:1638-1639`), where walk's `char` passes the value.

## The ladder subset

The subset is empty, so nothing was run (fork 15):

- No file of the baseline's `raw/` (`explorations/compile-ladder/baseline-2026-09-19/raw/`, the 85 passing programs) and no line of its `microgpt-phase.md` names a changed member, helper or file. `grep -rlE 'FortressBuiltin|FortressLibrary|longToString|simpleChar|makeZZ32FromNN32|makeZZ64FromNN64|simpleArbitraryPrecisionArith'` and `grep -rlE '\bsigned\b|codePoint|\bchar\('` print nothing.
- The ladder compiles against the compiler's prelude, which this rung does not touch.

## Names

I ran `grep -rlw` for each added name (the four components and the six compiled functions) over `ProjectFortress/tests`, `ProjectFortress/*_tests`, `ProjectFortress/test_library`, `ProjectFortress/src/com/sun/fortress` and `Library`. It finds only this rung's own files. None of the other six rungs' worktrees holds a file or function of these names. The compiled functions carry the prefix `small` so that none takes the name of a prelude functional method, such as `signed`.

## Sentences made false

On this rung's tree, 29 of the 449 bindings name a helper and 420 a glue class. These sentences are made false:

- `Specification/appendices/changes.tex:4466`: "Twenty-one of the 449 bindings of \library\ name a helper: nineteen of the trait \EXP{\mathbb{Z}32}, … and the getters \VAR{asString} and \VAR{asExprString} of the interpreter's object \TYP{Int}." This is the gather's to correct (fork 7).
- `Specification/appendices/changes.tex:4473`: "The other 428 still name a glue class, which the compiled code cannot call." This is the gather's to correct (fork 7).
- F-32's title, "of its 449 live bindings, 428 name one", and its clause "F-299 holds the 21 that name one".
- F-299's title, "21 of the one library's 449 live bindings name one", and its sentence "The 21: 19 of trait `ZZ32`'s operators and functions … and `Int`'s `asString` and `asExprString` …; the other 428 still name glue classes".

`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`, `builtinPrimitive`'s comment, holds no count and stays true.

## Points to report

Each of these is reversible, and none holds the push.

- rung-S.patch was taken as it is. All 8 bindings moved, and none of the 8 is left on its glue class (above).
- The two guards on the base and on the text, through the harness and junit.sh: passing both times (above).
- The distance table and the count table on the final tree: 0 and 0, equal to climb batch 23's except the distance's `#seconds` and `#machine` rows. No site comes. The count stage took 181 s.
- Walk values that move: none (`ValSmall`, 47 lines, `diff` empty).
- Defects met: rows 856 and 857, each with its test of today's behaviour. The team's two libraries disagree on `char` out of range; that question goes to the curator (below).
- Sentences made false: the four above.
- A file edited beyond those named: none. `git diff --name-only b0f6cd6b7` lists the two library files, the four test files and the `.test`. This folder's two files are written from the journal.

## Decisions

1. **The planner's text, as it is.** Ways not taken: changing it (a comment on each binding, or wrapping the long lines), which the library's existing helper bindings do not do (`Library/FortressLibrary.fss:809-810`); leaving a binding on its glue class, which no measurement calls for (`ValSmall`'s empty diff; the stages at 0). Evidence: the planner's runs (`explorations/coordinator/CLIMB-BATCH-24.md:401-403`) and this rung's.
2. **The special names for the four bindings over `NN32`, `NN64` and `Char`.** Ways not taken: another helper with the same Java types (an identity over `int` or `long`), which the checker reads as `ZZ32` or `ZZ64` and so refuses against the declared `NN32`, `NN64` or `Char` (`NamingCzar.java:373-384`, `:494-503`); rung H's composed transfers, which are not on this tree. Evidence: the compiler's prelude binds these same names for these members (`CompilerBuiltin.fss:816`, `:880`, `:1060`, `:1067`).
3. **Today's behaviour pinned in two plain tests (home 3), not in `XXX` tests (home 2).** The specification is silent on both (above), so it gives no answer for an `XXX` test to assert. This is the brief's default. The out-of-range values stay out of the walk guard.
4. **The walk guard calls the library's own members** (the getters, `signed`, `char`, `codePoint` and `|c|`), not the helpers. The compiled guard binds the helpers through functions, one per helper: six for the eight bindings. Ways not taken: one compiled declaration per binding (two duplicate pairs); methods on the prelude's types, which a program cannot declare (fork 5). Precedent: `NativeHelperFamilyZZ32Walk.fss` and `NativeHelperBindingCompiled.fss`.
5. **Two values beyond the brief's list in the walk guard.** One is `|'A'|`, because `Char`'s `opr |self|` is `self.codePoint` (`FortressBuiltin.fss:618`). The other is `char(65) = 'A'`, which checks that `char` answers a `Char` the library compares. Way not taken: the brief's list alone. Both hold on the base and on the text.
6. **One control run of the distance stage.** Two strings were pointed at the wrong helpers and then restored, so that the claim that the stages read these eight bindings rests on this tree, not only on the planner's control of `Float`'s `<`. Way not taken: no control. Cost: one stage run (209 s). The four tests ran again after the restore.
7. **The compiled path measured for rows 856 and 857** with a scratch probe, so that the rows say which paths show the defect (the skill's `SKILL.md`, "How a program runs"). Way not taken: rows left walk-only. The rows' status and class stay as filed.
8. **No ladder subset run**, since none of its files names what the rung touched (above). Way not taken: running the 85 and the 18 anyway; the gate's step 7 runs them on the merged tree.
9. **No whole suite** (fork 9): the edit is library text only.

## Questions for the curator

- Row 857: walk's `char` passes a code point outside 0 to 1114111 (`Library/FortressLibrary.fss:4540`, `nativeHelpers/simpleChar.java:63`). The compiler's prelude's `makeCharacter` raises `IntegerOverflow` there, with the comment "Really should be IndexOutOfRange" (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1058-1062`). The specification names no such conversion. Which answer does the one library take: keep the value (today's behaviour), raise `IntegerOverflow` as the compiler's prelude does, or raise another exception? Default until asked: today's behaviour, pinned by `CharCodePointOutOfRangeWalk`, until the decision.

## Defects and their homes

- Row 856: `signed` above the signed half wraps (both paths, measured). Home 3: `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss` is its reproducer, and the row's line is rewritten in `record.md`.
- Row 857: `char` out of range passes under walk. Home 3: `ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss` is its reproducer, and the row's line is rewritten in `record.md`. The libraries' disagreement is the question above.
- No new defect, so no new row.

## For FACTS

See `record.md`, "For FACTS".

## Commands

- `python3 explorations/coordinator/tools/ledger.py check --rows FILE`: lints row lines in a file against the template without writing the ledger (its header). On the two rewritten rows it printed '2 rows, 0 fail the template'.
