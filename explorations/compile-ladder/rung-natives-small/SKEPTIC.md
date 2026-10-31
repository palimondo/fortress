<!-- Climb batch 24, rung S (rung-natives-small): the skeptic's check of the worker's head df9e89d19, its programs old against new on both paths, one commit of record corrections, and the verdict, approved. -->

# Rung S: the skeptic's verdict

**Verdict: approved.** The eight strings are the planner's `rung-S.patch` exactly, each names the helper that computes what its glue class computed, no walk value moves in the worker's programs or in mine, and the record is true once the three corrections of `b8f67a725` are made. No fix of mine is contested, and none changes code.

- Head judged: `df9e89d197b39d7d0b8b00157a5fe856a824dc75`, the worker's last commit.
- My commits: `3163eb21a`, the worker's REPORT.md and record.md written from the run's journal (both commands exited 0, 22302 and 7174 bytes); `b8f67a725`, the corrections below; and this file.
- The report's count and distance tables are those of the worker's head. I ran no stage, since no commit of mine changes code.

## What I checked

1. **The tables.** I read the worker's files of the two stages against climb batch 23's gate tables:

       diff explorations/compile-ladder/climb-batch-23/gate/checker-count.txt tmp/rung-natives-small/checker-count-postedit.txt && echo COUNT-SAME
       COUNT-SAME
       explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-23/gate/distance.txt tmp/rung-natives-small/distance-postedit.txt
       DISTANCE SAME   0

   The count's table holds '#total 0', '#locations 0', '#crash none' and `com.sun.fortress.nativeHelpers 0`. `diff` of the distance tables differs only in `#seconds` and `#machine`. The count ran from 13:20:28 to 13:23:29 UTC, 181 s, at load 10.73 (the transcript's `uptime` at call `rfSgDN`), so the time is no measure. The rung changes no checker code, so the brief asks for no speed pass. The control's table (`distance-control.txt`) holds '#total 2' and '#seconds 209 FortressLibrary 155', as the report says.

2. **The order.** Read in the worker's transcript by time and call id:
   - 13:15:32 and 13:15:47: the five test files written (`yfiEuS`, `aLXJYu`). At 13:15:56, `git status --short` shows them as the only change (`c3TRHF`).
   - 13:16:03 (`4zbqdU`): `harness-one.sh` on the three walk tests, on the base's code with the library unedited: '# harness-one 2026-10-31T13:16:03Z; tree b0f6cd6b7; …; cache empty' and 'OK (3 tests)'.
   - 13:16:47 (`du1DFa`): `junit.sh smallbase`, '. run … NativeHelperFamilySmallCompiled (569ms) PASS' and 'OK (2 tests)'.
   - 13:17:03: the tests committed (`7b859b93f`). 13:17:39 (`5FJCvb`): `git apply` of `rung-S.patch`.
   - 13:28:12 (`xzxXHH`): the control's two `sed -i` edits. 13:32:00 (`8odtPJ`): the restore by `git checkout`.
   - 13:32:24 (`hGYjho`), the last run after the last change: 'tree df9e89d19; … cache empty', 'OK (3 tests)', then '. run … (371ms) PASS' and 'OK (2 tests)'.

   No test failed on the base, by design. The section has every test pass on the base and on the text, since the move changes no value under walk. The skill's `tests-writing.md`, "The order", gives a test that guards a behaviour that works today no failing run. No harness test can fail on the base here: what the move changes is what the checker reads, and the worker's control shows the distance stage reading it ('#total 2' with the two strings pointed at wrong helpers). So the missing failure is no defect, and `failureWasRecorded` is false.

3. **The diff.** `git diff b0f6cd6b7...df9e89d19` changes the eight strings of the section, each one line for one line, and equals `rung-S.patch` hunk for hunk. Each helper exists with the Java types that walk's loader (`interpreter/glue/StaticNativeApp.java:87-128`) fits to the declaration:
   - `simpleLongArith.java:19`, `longToString(long)`;
   - `simpleArbitraryPrecisionArith.java:26`, `toString(BigInteger)`, the class's only static method of that name;
   - `simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`, `simpleChar.java:57` and `:63`, identities over `int` or `long`.

   Each computes what its glue class computed (`interpreter/glue/prim/Long.java:262-266`, `BigNum.java:274-278`, `NN32.java:239-243`, `UnsignedLong.java:239-243`, `Char.java:159-169`). `StaticNativeApp.unbox` reads a `Char` `self` by `FChar.getChar()`, an `int` (`interpreter/evaluator/values/FChar.java:21`, `:93`), so no code point is cut to 16 bits. `box` answers a `Char`, `NN32` or `NN64` by the declared result (`StaticNativeApp.java:204-217`), as F-299 says. The rest of the patch is as the section says:
   - `printlnWithThread` and `getProperty` still name `StringPrim` (`Library/FortressLibrary.fss:4632`, `Library/System.fss:45`), by Question 1.
   - No other binding in either library names any of the six glue classes (`grep` exits 1).
   - The paths changed are the two library files, the five test files and this folder's files.

4. **The precedent.** The form is climb batch 23's: one string replaced, the header and the body form kept (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:370-373`, `Library/FortressLibrary.fss:809-810`). The compiler's prelude imports the same six helpers (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:78`, `:121`, `:157`, `:233-234`, `:317`) and binds them for the same members (`:523`, `:584`, `:816`, `:880`, `:1060`, `:1067`). The four special names are the library's own device for `NN32`, `NN64` and `Char` (`compiler/NamingCzar.java:368-389`, and `:494-503` for the one library).
   - Rung H's rewrite on its branch (`compiler/BuiltinPrimitiveRewriter.java` at `696a79095`, `transfer`) reads each position by the same `NamingCzar.fortressTypeForForeignJavaType` with the helper's name. It adds a transfer only where the read type differs from the declared one. On the one library the special names read `Char`, `NN32` and `NN64`, so S's four bindings get no second transfer on the merged tree. The gate's stages check this.

5. **The tests.** Each file has one comment line, says what it checks, cites no record and no specification line, and is named by its topic. The walk guard holds every value of the section's list: Long's getters at the bounds and 0; BigNum's past ZZ64 and at a negative value; `signed` at 0, 7 and the top of the signed range on both widths; `codePoint` and `char` at 'A', 0 and U+1F600. The compiled guard binds each of the six helpers once, in the section's form, and asserts the same values. Neither guard asserts a value outside the ranges (fork 5). The two tests of today's behaviour assert the values the section names.

6. **My programs, old against new.** I wrote them under `tmp/rung-natives-small/skeptic/`. Each reaches the moved bindings by routes that the worker's `ValSmall` and the tests do not take:
   - the library's coercions that call `signed` (`Library/FortressLibrary.fss:822`, `:996-1000`);
   - `NN32`'s and `NN64`'s `/` to `QQ`;
   - printing by juxtaposition, tuples, lists and `Just`;
   - `strToFloat`, which calls `codePoint` (`:4610`);
   - `FileReadStream.readChar` and `characters`, which call `char` (`Library/FileSupport.fss:67`, `:117`);
   - `char` as a function value and through `map`;
   - `SUM` reductions over `char`, `signed` and `asString`.

   Walk ran each with `old-fortress.sh /home/user/fortress-base23 …/tmp/old-caches P.fss` and with this tree's `bin/fortress P.fss`:

       SkSmallIndirect old rc=0 / new rc=0 / SAME     (FORTRESS_THREADS=1; and at 4: SAME4, SAME-1-4)
       SkSmallFile old rc=0 / new rc=0 / SAME
       SkSmallFnValue: SAME t1, SAME t4
       SkSmallWalkTwin old rc=0 / new rc=0 / SAME

   Among their lines, the same on both codes:
   - 'coerce NN64 to ZZ 18446744073709551615'
   - 'NN64 div to QQ 18446744073709551615/2'
   - 'tuple (9223372036854775807,1267650600228229401496703205376,x)'
   - 'readChar A 65 z 122'
   - 'map char <|H, e, l, l, o|>'
   - 'par sum signed 12497500'

   The rung writes no state, and the reductions agree at one and four threads. On the compiled path, `SkSmallCompiled` binds the six helpers by its own declarations, at values that the guard does not use: -12, the `BigInteger`s 0, -1 and 2^128, `signed` at 2^31 and 2^63, and `codePoint` of `char` at 55296, 1114111, -1 and 1114112. I compiled and ran it on the old code (`old-fortress.sh … compile`, then `run`) and on this tree (`bin/fortress compile`, then `run`). All four commands exited 0, and the two runs' output was the same. It printed 'signed32  -2147483648   -1' and 'cp  122   55296   1114111   -1   1114112'. Its walk twin, `SkSmallWalkTwin`, printed 'signed32 -2147483648 -1' and 'cp 122 55296 1114111 -1 1114112'. So walk and the compiled path agree on every value. Only the spacing differs, by the compiled path's juxtaposition of strings (row 76).

7. **The homes.** Rows 856 and 857 are home 3, and the specification is silent on both:
   - `basic-lib/basic-integers.tex`, "Integers", names only `narrow`'s conversion and wrap, and no `signed`.
   - No chapter names `char` or an integer-to-`Char` conversion: `grep` over `Specification/` finds only `lexical-structure.tex`'s character literals.
   - Row 502 holds the open question of the general overflow sentence for these conversions. The brief's default is home 3.
   
   My programs met no new defect.

8. **The ledger and the sibling sites.** `ledger-find` on codePoint, char, signed, asExprString, simpleChar, Char$Chr, plane and code point finds rows 856 and 857, and beside them rows 326, 345, 439, 502, 858, 859 and 861. None of those is changed by the move. Row 858's mechanism passes through `signed` (`ZZ`'s `coerce(x: NN64)`, `Library/FortressLibrary.fss:997-1000`), and its line names 856 as a sibling. Row 856's line named only 502: corrected (below). The rung repairs no defect, so no defect has other sites to count.

9. **The report.** I opened each provenance line and its citations, and they say what the report says:
   - `families-base.tsv:68-75`: the eight S lines;
   - `changes.tex:4423`: the entry's heading;
   - the `grep` of `Specification/basic` and `basic-lib`: exit 1;
   - the precedent's lines;
   - `CLIMB-BATCH-24.md:401-403`;
   - `FortressLibrary.fsi:2578-2580`;
   - `CompilerBuiltin.fss:1058-1062` and `:1638-1639`.

   The counts hold: 29 strings now name a helper (`grep -rho … | wc -l` prints 29; 19 and 2 on the base). The sentences made false are those the section names: `changes.tex:4466-4471` and `:4473`, F-32's title and its "the 21", and F-299's title and "The 21: …; the other 428". The entry's other sentences stay true for S. No whole suite is owed (fork 9). Every point to report is listed with its evidence. One citation named a scratch file as evidence: corrected (below).

10. **Names.** `grep -rlw` of the four components and the six compiled functions over both test corpora, `test_library`, `ProjectFortress/src/com/sun/fortress`, `Library` and `LibraryBuiltin` finds only this rung's files. No sibling rung's diff adds one of them. None of the tests' local names is a library function or functional method.

11. **The failure mode.** No loud failure becomes a quiet value. Each glue class and its helper answer the same value, and neither throws, also out of range. `char` out of range passes the value silently on both codes, row 857, as before the move.

## The corrections, `b8f67a725`

- **Row 857's line in `record.md`** said what the compiler's prelude does, but not what the helper does on the compiled path. The one library's `char` will compile to that helper after the switch-over, so the line now says that a compiled binding of the helper itself passes -1 and 1114112 (`SkSmallCompiled` above). The rule: "Say in the ledger row which paths show the defect" (`.claude/skills/fortress-repo/SKILL.md:62`).
- **Row 856's line** now names row 858 among its siblings, as row 858 names 856. The template puts "`siblings: N, M` first if there are any" (`explorations/fortress-gap-ledger.md:25`).
- **REPORT.md, "The stages"**, cited `tmp/rung-natives-small/dist-post/errors.tsv` as evidence. It now quotes the command and its output, `wc -l < …errors.tsv` printing '1', since a report never cites a file under `tmp/` (`.claude/skills/fortress-repo/references/records.md:34`; the brief, "Citing").

`ledger.py check --rows` on the two corrected lines printed '2 rows, 0 fail the template': lines of 1028 and 1032 characters, notes cells of 650 and 683.

## Where I differ from the worker

- Nowhere on the change. On the question for the curator about row 857, the evidence now includes the helper's own answer on the compiled path. Keeping today's value needs no change. The prelude's answer, `IntegerOverflow`, needs a guard in the one library's `char`, as the prelude's `makeCharacter` has one (`CompilerBuiltin.fss:1058-1062`), or a change of the helper, which the prelude's `jMakeCharacter` also calls.
