# Skeptic: rung A, rung-any-carrier

Head judged: `c9bbfdaa7` (the worker's last commit). Head after: the commit of this file, after `84135bf0e`.

## The report and record from the journal

Both `REPORT.md` and `record.md` were already on the branch (`c9bbfdaa7`), so the journal step wrote neither file and no commit "The worker's report and record, from the run's journal" was made.

## What I checked

1. **The stages.** Read from the worker's files: `diff explorations/compile-ladder/climb-batch-26/gate/checker-count.txt tmp/rung-any-carrier/checker-count-postedit.txt` prints nothing (`#total 0`, `#crash none`); `distance/compare.sh ... tmp/rung-any-carrier/distance-postedit.txt` prints 'DISTANCE SAME   0' (`#total 0`, `#crash none`, `#seconds 167 FortressLibrary 121`). Both nohup calls (`snUYSr` 08:27:18 and the second distance run `1Y8ark` 08:33:11) started on `f5be3b7e7`, after the last change of code (`DnyEPC`, 08:22:24, the `match` form). The diff touches no checker or Scala file, so I ran no count stage. The tables in REPORT.md are those of the worker's head.
2. **Test first.** In the worker's transcript: the walk test was written at 08:16:43 (`ykBaDA`). It was seen failing through `harness-one.sh` at 08:17:04 (`XVivg2`) on the base's code, before the first library edit (08:17:40, `dgVTz8`) and the first build (08:18:33), with the three FAIL lines that REPORT.md quotes. The compiled guard passed on the base at 08:17:26 (`B6PRao`). The last walk harness run, 'OK (4 tests)' (08:22:37, `3V9hKn`), came after the last change of code. `ant testSystem` was started at 08:23:11 (`EzFZ48`) on the same code: 'BUILD SUCCESSFUL', four shards with 'Failures: 0' (194, 185, 192, 186). The walk test stops at its first failing assertion, so its `match` lines were never seen failing through the harness. The worker saw them fail on the old code by a probe ('got type CatString'), and so did I (below).
3. **The diff**, against the section, P-167, P-91 and P-58. The two strings are bare `builtinPrimitive` calls naming the helpers. The table maps the two names to `ObjectPrims$ClassName` and `AnyPrim$SEquiv` and is read after the string and before the cache and `StaticNativeApp.isHelperString` (`NativeApp.java:47-53`, `:209-210`). `asString` is `self.ilkName`. `ClassName`'s rendering matches `FTraitOrObject.toString`'s delimiters (`Useful.listInOxfords`, `listInParens` with ",", `FTypeArrow.toString`'s "->"). The five types are told apart by `FortressBuiltin`. I checked the 48 respelled lines by word diff: 17 Int to ZZ32, 7 Long to ZZ64, 6 BigNum to ZZ, 15 Float to RR64 and 3 UnsignedLong to NN64. Every removed line has its added line with only the name changed. No other edit falls outside the files the section names.
4. **Precedent.** `match` copies `System.fss:42-46`'s pair `typecase`, and the `fail` arm is the same. The component test copies `StaticNativeApp.declaringComponent` (`:136-146`), which is package-private in rung W's file. The copy is forced by the section's list of files.
5. **The tests' messages.** Two citations were wrong, and I corrected them (below). The compiled guard asserts what the section asks.
6. **No printed text moves except for the five.** The old `ObjectPrims$ToString` answered `FObject.toString()`, which is `getString()`, which is `type().toString()` (`FObject.java:33-38`). The glue objects that override `getString` (`Reader`, `Writer`, `BufferedWriter`, `FileReadStream`, `FileWriteStream`) all declare their own `asString` in `Reader.fss:26`, `Writer.fss:29`, `:53`, `File.fss:28` and `:70`. `Thread[\T\]` does not override it, so it keeps the rule.

## My programs (under `tmp/rung-any-carrier/skeptic/`), walk, new against old (`old-fortress.sh`), FORTRESS_THREADS=1

The diff has no mutable state, field write or atomic block. Its one static map is filled at class initialisation. So I ran no four-thread pass.

- `SkIlk.fss`, `bin/fortress SkIlk.fss` new against old:

      1 Just[\ZZ32\] Just(3) a Just[\ZZ32\]: Just(3)    | 1 Just[\Int\] Just(3) a Just[\Int\]: Just(3)
      2 Box[\(ZZ32,ZZ64)\] Box[\ZZ32->ZZ64\]           | 2 Box[\(Int,Long)\] Box[\ZZ32->ZZ64\]
      3 Box[\Box[\RR64\]\] Two[\ZZ32,FlatString\] Box[\Sq\] | 3 Box[\Box[\Float\]\] Two[\Int,FlatString\] Box[\Sq\]
      10 3 3.0 a ZZ64: 3 a RR64: 3.0                   | 10 3 3.0 a Long: 3 a Float: 3.0

  Lines 4 to 9 and 11 are the same on both: ranges, `__DefaultVector[\ZZ32,3\]`, `FloatLiteral`, `Ratio`, `Char`, `Boolean`, `Thread[\Any\]`, `Box[\Number\]`, `Box[\()\]`, and `Sq`, `a Sq: Sq` and `no expression for Pt`.
- `SkMatch.fss`, new: '1 true false false', '2 false true true', '3 false 2' (a rope, an empty pattern, a substring of a rope of depth 2). Old: 'Closure/Constructor for match parameter 2 (some:FlatString) got type CatString'.
- `SkFnBind.fss`, a top-level `tName(a: Any): String` bound to `stringOps.typeName`. New: 'Arity of type 1 does not match native arity 0'. Old: 'Native helper com.sun.fortress.nativeHelpers.stringOps.typeName: no Java type carries the declared type of parameter a.' Both refuse at load, with a different message.
- `SkSeqBind.fss`, a top-level `sEq(a: Any, b: Any)` bound to `equality.sEquiv`. New: 'sEq: true false true'. Old: the load refusal 'no Java type carries the declared type of parameter a.'
- `SkComp.fss`, compiled, new and old alike: '1  Box[\Box[\RR64\]\]   Two[\ZZ32,ZZ64\]', '2  true   false', 'Sub', '3  Sub'. These match walk's new names.

## Findings

- Corrected: `AnyNativesIntrinsicWalk.fss:11` cited "Specification/basic-lib/objects.tex, trait Object" for "an object's ilkName is its type name". That entry says nothing of `ilkName`, and the worker's own report says the specification names none. The citation is dropped. `:27` cited "objects.tex, opr SEQV". The entry is under trait Any (`objects.tex:15`, `:82`), so the message now names it: "objects.tex, trait Any, opr SEQV".
- Corrected: REPORT.md's deviation line cited `ObjectPrims.java:61-79` for "three lines" copied from `declaringComponent`. It now cites the copy at `:68-76`, inside `traitOf` at `:61-77`, and its source at `StaticNativeApp.java:136-146`.
- Not a defect, reported. Walk's table answers the two names wherever a program binds them, with no regard to the declaration's shape. A walk program's top-level function bound to `stringOps.typeName` is still refused at load, now with 'Arity of type 1 does not match native arity 0' (`ClassName` is a zero-argument method). This is a loud refusal, as before, but the message no longer names the helper.
- The failure-mode question. A walk program's function `sEq(a: Any, b: Any)` bound to `equality.sEquiv` was refused at load before. It now runs and answers walk's `SEQV`, so a loud refusal becomes a value. That value is the operation that P-167 asks walk to answer for that name, and what it answers is P-168's (rung E). `match` at a rope turns a refusal at the call into the matching answer. Its `fail` arm stays loud.
- Every point to report that the worker lists holds as written. Every sentence that REPORT.md lists as made false is as cited (`changes.tex:4444-4446`, `:4495`; `FACTS.md:54`; `PLAN.md:49`, `:67`; `review-queue.md:46`, `:292`). F-55's 'no coercion converts a `BoxK[\Int\]`' stays true, since walk's messages keep `FType.toString`.

## Fixes

- `84135bf0e`, a correction: the two citations of the test messages and REPORT.md's provenance line. The edit changes message strings only. On the head: `harness-one.sh tmp/rung-any-carrier/skeptic/h1 ProjectFortress/tests/AnyNativesIntrinsicWalk.fss`: ' OK (time = 7082ms)', 'OK (1 test)'. No code changed, so no build and no suite ran.

No defect fix and no contested fix.

## Verdict

Approved.
