<!-- The claims of each FACTS entry of the chunk checker-5 (section "The checker and the one library", 28 entries), each with its subject, its kind, the entries that overlap it and what today's checks say of it, as the first step of the sorting map of 2026-11-24; written by a worker that rewrote no entry and judged nothing new. -->

# Claims of chunk checker-5, by subject and by kind

Sources: the entries as `facts-extract.sh` printed them on 2026-11-24; `evidence/consolidation/scout-checker-5.md` ("scout"); `evidence/stale-claims.md` ("stale"); `pilot/pilot.md` through stale. Overlaps were searched over all 339 entries of FACTS by a script that matches a term in each entry's line; the term is given in brackets. "Checks" quotes only those two files; where they say nothing of a claim, the claim is marked "no finding".

Each claim reads: number, [kind], {subject}, sentence.

## F-325, "The code generator compiles a type assumption at a method call's receiver ..."

- Claims:
  1. [property] {the code generator: type assumptions} At a receiver, `(e asif T).m(args)` calls the body that `T` gives `m` as a static method, `self` first.
  2. [property] {the code generator: type assumptions} Where every dispatched argument is an assumption, the call runs the declaration that the checker resolves, without dispatch.
  3. [property] {the code generator: type assumptions} Where only some are, a call of an overloaded function or operator of its own component dispatches among the reachable declarations at or below the resolved one, on the other arguments' run-time types, as walk does.
  4. [detail] {the code generator: type assumptions} Such a call takes a direct call, the resolved dispatch method, or a dispatch method of its own in a class `<component>$asif@<span>`.
  5. [property] {the code generator: type assumptions} Elsewhere an assumption is the value at `T`.
  6. [defect] {the code generator: type assumptions} The partial calls of a functional method, of an overloaded method on an assumed receiver, a dotted call with an assumed argument, and one whose dispatch would hold a functional method are refused (row 818).
  7. [defect] {the code generator: type assumptions} A generic declaration at or below the resolved one, a generic method on an assumed receiver and an overloaded generic function are refused with messages of their own (row 818).
  8. [defect] {walk: type assumptions} Under walk an assumption stays on a bound value (row 919), a tuple under one cannot be taken apart (row 920), and a generic method on an assumed receiver stops (row 922).
  9. [property] {walk: type assumptions} Under walk an overloaded method on an assumed receiver runs.
  10. [detail] {the code generator: type assumptions} The source methods are `forAsIfExpr`, `assumedReceiverCall`, `assumedArgumentsCall`, `partiallyAssumedCall`, `membersUnderAssumptions`, `generateDispatchAmong`.
  11. [tests] {the code generator: type assumptions} `AsIfCallsCompiled`, `AsIfPartialCallCompiled`, `AsIfPartialDispatchCompiled`, `AsIfCallsWalk`, `AsIfOverloadedMethodWalk`.
  12. [pointer] Detail in `rung-partial-assumption/REPORT.md` and `rung-codegen-asif/REPORT.md`.
- Overlaps:
  - 1-3, 5: F-391 ("a call at an assumption runs the trait's body, also over an object's override" [assumption]); F-34 ("`String`'s two calls with a type assumption at one argument" [assumption]); F-379 ("`asif` at one of the five is the identity" [asif]).
  - 6-7: none found [row 818, partiallyAssumed].
  - 8: none found [row 919, row 920, row 922].
- Checks: all tests, files and methods found; rows 818, 919, 920, 922 NEGATIVE-VERIFIED and agree (scout 4). No stale finding.
- Shape: several subjects: the code generator: type assumptions; walk: type assumptions. Mostly property, with two defect claims.
- Title: states which assumption forms compile and which stay refused; the body serves it, except claims 8-9, on walk, which the title does not name.

## F-327, "The integers' shifts and powers over `AnyIntegral` convert their count or exponent in Fortress ..."

- Claims:
  1. [property] {the library: native helper bindings} The five integer types keep `LSHIFT`, `RSHIFT` and `^` over `AnyIntegral` (and `ZZ`'s `shift`) as Fortress around a public bare binding at a `ZZ32` or `ZZ64` count and a `ZZ32` exponent.
  2. [property] {the library: native helper bindings} Private helpers keep `ZZ32.shiftCount`'s saturation and `ZZ32.powCount`'s sign and parity, a `ZZ` count clamped in `ZZ` then read by `.asZZ32`.
  3. [detail] {the library: native helper bindings} The helpers are `shiftCount32`, `shiftCount64`, `powerCount32` (`FortressLibrary.fss:800-845`) and `countNN32`, `exponentNN32` (`FortressBuiltin.fss:234-260`).
  4. [history] {the library: native helper bindings} Ten new helpers and five existing; every value of the walk guard is the glue's.
  5. [detail] {the library: native helper bindings} The 16 bindings count among F-299's 373.
  6. [property] {the library: native helper bindings} A `ZZ32` count or exponent reaches its bare binding directly.
  7. [pointer] P-69 and P-153 hold on both paths at these declarations.
  8. [tests] {the library: native helper bindings} `tests/NativeHelperShiftPowerWalk`, `compiler_tests/NativeHelperFamilyShiftPowerCompiled`.
  9. [pointer] Detail in `rung-natives-shift-power/REPORT.md`.
- Overlaps:
  - 1, 2, 6: none found for the binding shape [shiftCount, powCount, NativeHelperShiftPower]; F-124, F-125, F-132, F-172 give the shifts' values [LSHIFT], another question; F-263 gives the power's rules under P-153 [P-153]; F-299 holds the count.
- Checks: files and tests found; line cites not checked (scout 4). No stale finding.
- Shape: one subject (the library: native helper bindings).
- Title: states the Fortress-around-bare-binding shape; the body serves it, with a count (claim 5) that belongs to F-299.

## F-328, "Walk answers the compiled helpers `stringOps.typeName` and `equality.sEquiv` with its own operations."

- Claims:
  1. [property] {the library: native helper bindings} The one library binds `Object.ilkName` to `stringOps.typeName` and `SEQV` over `Any` to `equality.sEquiv`.
  2. [property] {walk: own operations for helpers} Walk's loader maps the two names to `ObjectPrims$ClassName` and `AnyPrim$SEquiv` by its table `OWN_OPERATIONS`, and never loads the two helpers.
  3. [property] {the library: string conversion} `Object.asString` is `self.ilkName`.
  4. [property] {walk: type names and ilk} Walk's ilk names each type by its own name, also inside static arguments, tuples and arrows.
  5. [pointer] The five number types are objects of those names (F-379), and a string object keeps its own name though walk instantiates a generic at its trait (F-344).
  6. [tests] {walk: own operations for helpers} `tests/AnyNativesIntrinsicWalk`, `compiler_tests/AnyNativesIntrinsicCompiled`.
  7. [pointer] Detail in `rung-any-carrier/REPORT.md`.
- Overlaps:
  - 1: F-299 ("`Object`'s `ilkName` and `SEQV` over `Any` (F-328)" [typeName]); F-326, F-343 on `equality.sEquiv`'s compiled rule [sEquiv].
  - 2: F-299 ("eight by the table `OWN_OPERATIONS`") and F-335 ("maps the six names to its glue by its table `OWN_OPERATIONS`") [OWN_OPERATIONS].
  - 3: F-123 ("the one library's `Object`, whose `asString` is `self.ilkName`" [ilk]).
  - 4: F-344 ("The ilk still names a string object by its own name, `FlatString`" [ilk]).
- Checks: all found; cited entries exist (scout 4). No stale finding.
- Shape: several subjects: the library: native helper bindings; walk: own operations for helpers; walk: type names and ilk; the library: string conversion.
- Title: states walk's own operations for two helpers; claims 3-4 on the ilk's text serve another question.

## F-330, "Walk carries `FortressLibrary`'s `JavaBufferedWriter` in a Java `FortressBufferedWriter` ..."

- Claims:
  1. [property] {the library: I/O streams} `JavaBufferedWriter`'s writes, `flush`, `close` and three factories are natives on `nativeHelpers/fileOps`.
  2. [property] {walk: own operations for helpers} Walk's loader carries the trait through `FortressBuiltin`'s private native object `JavaBufferedWriterObject`.
  3. [property] {the checker: walk-world type table} The checker's walk-world table reads `FortressBufferedWriter` and `FortressBufferedReader` as the one library's traits.
  4. [property] {the library: I/O streams} A missing file raises the library's `FileNotFoundException`, which a `catch` sees.
  5. [property] {the library: I/O streams} `BufferedWriter` keeps no buffer: each operation passes to the wrapped stream, while its api still takes a size.
  6. [choice] {the library: I/O streams} A worker chose the unbuffered `BufferedWriter`, since a buffer in a `var` field would need `atomic` around I/O (climb batch 27, rung W, decision 8).
  7. [property] {the library: I/O streams} `FileWriteStream` is a plain `WriteStream` over `JavaBufferedWriter`, with its `flush`.
  8. [detail] {the library: I/O streams} Line cites `FortressLibrary.fss:2072-2081`, `:2094-2099`, `StaticNativeApp.java:70`, `NamingCzar.java:488-489`, `Writer.fss:38-44`, `Writer.fsi:24`.
  9. [tests] {the library: I/O streams} `tests/NativeHelperWriterWalk`, `compiler_tests/NativeHelperFamilyWriterCompiled`.
  10. [pointer] Detail in `rung-io-writer/REPORT.md`.
- Overlaps:
  - 1, 7: F-32 ("`println` writes through `stdOut`, a plain Fortress `Writer` over `JavaBufferedWriter`"); F-299 (its 7 bindings); F-332 (title: "`FileWriteStream` ... plain Fortress objects over ... `JavaBufferedWriter`") [BufferedWriter, FileWriteStream].
  - 3: none in FACTS [FortressBufferedWriter]; the skill's `interpreter.md:121` (scout 5).
  - 4: F-332, F-336 [FileNotFoundException].
  - 5, 6: none found [BufferedWriter keeps no buffer].
- Checks: all found; line cites not checked (scout 4). No stale finding.
- Shape: several subjects: the library: I/O streams; walk: own operations for helpers; the checker: walk-world type table.
- Title: states the Java carrier and the plain objects; the body serves it, with the worker's choice (6) and `FileWriteStream` (7), which F-332 owns too.

## F-332, "Walk carries `FortressLibrary`'s `JavaBufferedReader` in a Java `FortressBufferedReader` ..."

- Claims:
  1. [property] {the library: I/O streams} `JavaBufferedReader`'s eight methods and two factories are natives on `nativeHelpers/fileOps`.
  2. [property] {walk: own operations for helpers} Walk's loader carries the trait through `FortressBuiltin`'s private native object `JavaBufferedReaderObject`.
  3. [property] {the library: I/O streams} `File` and `Reader` are plain components, each object holding its Java-backed value in the field `under`.
  4. [property] {the library: I/O streams} `uncheckedReadChar` answers -1 at the end by the reader's `eof`, since `jbrRead` answers 0 there.
  5. [property] {the library: I/O streams} `FileWriteStream`'s write of a non-flat string makes one write and no flush, where `Writer`'s flushes after it.
  6. [choice] {the library: I/O streams} The rung's judge chose that difference to keep the file stream's buffering (climb batch 28, rung R).
  7. [property] {the library: I/O streams} A missing file raises `FileNotFoundException` and a read after `consume` raises `IOFailure`, and a `catch` sees each on both paths.
  8. [pointer] A compiled helper's raise builds the library's exception (F-336); F-299 counts the bindings.
  9. [tests] {the library: I/O streams} `NativeHelperReaderWalk`, `NativeHelperFamilyReaderCompiled`, `FileOpsRaiseCaughtCompiled`.
  10. [pointer] Detail in `rung-io-reader/REPORT.md` and `JUDGE.md`.
- Overlaps:
  - 1, 2: F-299 ("`JavaBufferedReader`'s 10 (F-332)" [JavaBufferedReader]); F-330 claim 2 (the same carrier mechanism for the writer).
  - 5: F-330 ("`FileWriteStream` is a plain `WriteStream` over `JavaBufferedWriter` too, with its `flush`" [FileWriteStream]).
  - 6: none found.
  - 7: F-330 ("A missing file raises the library's `FileNotFoundException`"); F-336 ("a helper's `FailCalled`, `FileNotFoundException` and `IOFailure` reach a `catch`" [IOFailure]).
- Checks: all found (scout 4); `JUDGE.md`'s "For the curator" heading is in the history only (scout 1). No stale finding.
- Shape: several subjects: the library: I/O streams; walk: own operations for helpers.
- Title: names the reader and `FileWriteStream` together; the writer stream half overlaps F-330's title, so the title holds two subjects.

## F-333, "The one library's arrays hold their elements in a Java-backed store in a field ..."

- Claims:
  1. [property] {the library: array stores} `PrimitiveArray` and `PrimImmutableArray` hold a `JavaArrayStore` in the field `mem` and read through `cast[\T\]`; `PrimImmutableRR64Array` holds a `JavaRR64ArrayStore`.
  2. [plan] {the library: array stores} `PrimImmutableRR64Array` is in the api with no factory choosing it (P-84, P-85).
  3. [property] {the compiled runtime: array stores} The stores' 7 bindings name `nativeHelpers/arrayOps` over `FortressArrayStore`, an `Object[]`, and `FortressRR64ArrayStore`, a `double[]`.
  4. [property] {the compiled runtime: transactions} The compiled transaction keys an `FortressArrayStore` element by array and index (`TXReadSlot`, `TXWriteSlot`).
  5. [property] {the checker: walk-world type table} NamingCzar's walk-world table reads the two classes as the two traits.
  6. [property] {walk: own operations for helpers} Walk answers each `arrayOps` name with `ArrayOps$<name>` over private objects, an `AtomicArray` and a `double[]`, and refuses an unknown name at load.
  7. [defect] {the library: array stores} A second initialisation is ignored in both arrays, on both paths (row 466).
  8. [property] {the library: array stores} The two RR64 stores write a second initialisation and answer `true`, as the old glue did.
  9. [pointer] The bindings leave glue classes; F-299 holds the count.
  10. [choice] {the repository: dead glue classes} A worker left the base's three array glue classes in the tree, named by no file (climb batch 28, rung A, decision 9).
  11. [tests] {the library: array stores} `ArrayStoreWalk`, `ArrayStoreRR64Walk`, `ArrayInitOnceWalk`, `ArrayOpsMisspeltWalk`, `ArrayStoreJUTest`.
  12. [pointer] Detail in `rung-array-store/REPORT.md`.
- Overlaps:
  - 1, 3: F-140 (`makeJavaArrayStore`, row 527 [JavaArrayStore]); F-32, F-299 (`arrayOps` helpers and their 7 [arrayOps]).
  - 4: none in FACTS [FortressArrayStore]; the skill's `compiler.md:103` (scout 5).
  - 5: F-330 claim 3 (the same table, for the I/O classes).
  - 6: F-299 ("`arrayOps`' seven by one rule (F-333)" [arrayOps]); none for `AtomicArray`.
  - 7, 8: none found [row 466, PrimImmutableRR64Array].
  - 10: none found for dead array glue; F-332's history names the reader's glue left by fork R3 (in the entry's own text).
- Checks: all found; the three glue classes still in the tree; row 466 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: several subjects: the library: array stores; the compiled runtime: array stores; the compiled runtime: transactions; walk: own operations for helpers; the repository: dead glue classes.
- Title: states the store-in-a-field shape and walk's answer; the body serves it, with the transaction keying (4) and the dead glue (10) on other questions.

## F-334, "The compiled checker orders a call's candidates, a coercion's candidates and a trait's ancestors by a linear extension ..."

- Claims:
  1. [property] {the checker: candidate order} The checker orders candidates and ancestors by a linear extension of their partial order, read once a pair, so no call stops it at 32 candidates or more.
  2. [detail] {the checker: candidate order} `PartialOrder.scala` gives `minimal` and `linear`, used at `Functionals.scala:972`, `:1101-1121`, `CoercionOracle.scala:363-382`, `Formula.scala:610`.
  3. [property] {the checker: candidate order} A call's candidates come in the order of their declarations' places.
  4. [pointer] F-408 gives how a tie among the most specific is decided.
  5. [history] {the checker: candidate order} On the one library the results are those of the sort it replaced.
  6. [property] {the checker: distance stage} The distance stage checks `value object Char` to its end (`#crash none`).
  7. [tests] {the checker: candidate order} `PartialOrderCandidatesCompiled`, `TieAmongMostSpecificCompiled`, `PartialOrderJUTest`, the distance stage.
  8. [pointer] Detail in `rung-checker-partial-order/REPORT.md`.
- Overlaps:
  - 1: none found [linear, 32 candidates, PartialOrder]; F-92, F-168 name `StandardPartialOrder`, another subject.
  - 3: F-408 ("The candidates are in the order of their declarations' places, file then line then column" [by place]).
  - 6: F-53, F-54 ("checks `value object Char` to its end (F-334)" [value object]); F-281, F-288, F-295, F-296, F-121 cite `#crash` [#crash].
- Checks: all found (scout 4). No stale finding.
- Shape: several subjects: the checker: candidate order; the checker: distance stage.
- Title: states the linear-extension order; the body serves it, with the distance's `Char` (6) owned by F-53 and F-54.

## F-335, "`Thread`'s four methods, `abort` and `printTaskTrace` name helpers of `nativeHelpers/runtime` ..."

- Claims:
  1. [property] {the library: native helper bindings} The one library binds `Thread`'s `wait`, `ready`, `stop`, a private `valAny` under `val(): T = cast[\T\](valAny())`, `abort` and `printTaskTrace` to six `runtime` helpers.
  2. [property] {walk: own operations for helpers} Walk maps the six names to its glue by `OWN_OPERATIONS`, so walk's `spawn`, transactions and trace do not change.
  3. [property] {the compiled runtime: tasks and transactions} Compiled, `abort` throws `TransactionAbortException` inside a transaction and does nothing outside one.
  4. [property] {the compiled runtime: tasks and transactions} Compiled, `printTaskTrace` prints one line `Task: <class>` per task from the current to the primordial one.
  5. [choice] {the compiled runtime: tasks and transactions} A worker chose to read `BaseTask`'s package-private `parent` by reflection, since the rung's brief kept `runtimeSystem/` out (climb batch 28, rung H, decision 6).
  6. [defect] {the compiled runtime: tasks and transactions} Compiled, `Thread`'s four raise `FailCalled` "spawn is not compiled yet" until `spawn` compiles (row 82).
  7. [pointer] P-58's form, P-162's pair, P-169.
  8. [tests] {walk: own operations for helpers} `tests/RuntimeOwnOperationsWalk`, `compiler_tests/RuntimeOwnOperationsCompiled`.
  9. [pointer] Detail in `rung-runtime-threads/REPORT.md`, section 1.
- Overlaps:
  - 1: F-32 ("`Thread`'s four, `abort` and `printTaskTrace` name `runtime` helpers (F-335)" [printTaskTrace]); F-299.
  - 2: F-328, F-299 [OWN_OPERATIONS].
  - 3, 4, 5: none found [threadWait, printTaskTrace, reflection].
  - 6: none found in FACTS [row 82, spawn is not compiled].
- Checks: all found; row 82 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: several subjects: the library: native helper bindings; walk: own operations for helpers; the compiled runtime: tasks and transactions.
- Title: states the binding of six names; the compiled behaviour (3-6) answers another question.

## F-336, "A compiled helper's raise builds the exception of the library in use ..."

- Claims:
  1. [property] {the compiled runtime: helper raises} `Utility.makeFortressException` takes the exception's class by the name that the class path's `LibraryNames` gives its simple name.
  2. [property] {the compiled runtime: helper raises} It passes the message as an `FJavaString` to a constructor over that library's `String`.
  3. [defect] {the compiled runtime: helper raises} An exception without that constructor, such as the one library's `IOFailure` and `FileNotFoundException`, is made without the message, and as a second instance of the object (row 1103).
  4. [property] {the compiled runtime: helper raises} A helper's `FailCalled`, `FileNotFoundException` and `IOFailure` reach a `catch` against the prelude, and its `IntegerOverflow` and `FileNotFoundException` against the one library.
  5. [property] {walk: helper raises} Under walk a helper's raise becomes the library's object of the same name, without the message (F-299).
  6. [detail] {the compiled runtime: helper raises} `Utility.java:34-52`.
  7. [tests] {the compiled runtime: helper raises} `HelperRaiseMessageCompiled`, `OneLibraryCatchHelperRaises.test`.
  8. [pointer] Detail in `rung-runtime-threads/REPORT.md` and `rung-first-run-one-library/REPORT.md`.
- Overlaps:
  - 1: F-24, F-312, F-388, F-396 (each "the class path's `LibraryNames`" maps a simple name [LibraryNames]); F-353 (raise strings by simple name).
  - 2: F-343 (`FJavaString` in `sEquiv`, another use [FJavaString]).
  - 3: F-396 ("a caught exception that a helper raises, which is not its object (row 1103)" [row 1103]).
  - 4: F-332 claim 7.
  - 5: F-299 (cited).
- Checks: all found; row 1103 NEGATIVE-VERIFIED, agrees (scout 4). Pilot finding on F-396: row 1103 holds "against either library" (stale, F-396), which bears on claim 3's scope here; no finding on F-336 itself.
- Shape: one subject (the compiled runtime: helper raises), with a walk side (5).
- Title: states the rule; the body serves it.

## F-337, "The compiled path's class loader loads each helper class of `nativeHelpers/` itself ..."

- Claims:
  1. [property] {the compiled runtime: class loader} The class loader loads each helper class itself; `mustUseSystemLoader` lists `MainWrapper` and no helper.
  2. [property] {the compiled runtime: class loader} So a static of a helper, set by the main, is another copy's; `systemOps.getArgs` and `programArgs` read `MainWrapper.cachedArgs`.
  3. [property] {the compiled runtime: class loader} A helper over the run time's state keeps that state on a class that the loader delegates.
  4. [detail] {the compiled runtime: class loader} Shown by a run that printed `count =  0` over a helper's static and `count =  2` over `MainWrapper.cachedArgs`; `InstantiatingClassloader.java:2969-2991`.
  5. [tests] {the compiled runtime: class loader} `NativeHelperProgramArgsPassedCompiled`, `NativeHelperProgramArgsCompiled`.
  6. [pointer] Detail in `rung-system-natives/REPORT.md`.
- Overlaps:
  - 1-3: none found [mustUseSystemLoader, cachedArgs, system loader]; F-321 ("its `args` names `programArgs` (F-337)" [programArgs]); F-348 names `MainWrapper.java` for start time, another subject.
- Checks: files and tests found; `mustUseSystemLoader` not checked (scout 4). No stale finding.
- Shape: one subject (the compiled runtime: class loader).
- Title: states the loader rule and its consequence; the body serves it.

## F-338, "The code generator compiles an object or trait whose first supertrait is an imported api's trait ..."

- Claims:
  1. [property] {the code generator: trait table} The code generator compiles an object or trait whose first supertrait is an imported api's trait, also with a same-named method from a later supertrait.
  2. [detail] {the code generator: trait table} `dumpMethodChaining` reads the first supertrait's methods through `CodeGen.firstSupertraitMethods`, naming each declaration's trait as the extends clause writes it.
  3. [history] {the code generator: trait table} `STypesUtil.allMethods` already gives them that name (F-391), so the renaming changes no entry.
  4. [tests] {the code generator: trait table} `TraitTableApiTraitCompiled`.
  5. [pointer] Detail in `rung-codegen-trait-table/REPORT.md`.
- Overlaps:
  - 1: F-391 (title: "a method of an imported api's trait is found by its api" [imported api]); F-372 ("forwards to a body that an imported api's trait holds" [imported api]).
- Checks: test found (scout 4). No stale finding.
- Shape: one subject (the code generator: trait table).
- Title: states the compile; claim 3 says the change is now redundant with F-391.

## F-342, "The compiled checker converts a numeral where nothing fixes a type into its default ..."

- Claims:
  1. [property] {the checker: numerals} Where no place's type has a coercion from the numeral's type, a numeral becomes `ZZ32`, `ZZ64` or `ZZ` by its value, or `RR64` with a radix point.
  2. [property] {the checker: numerals} A type parameter that numerals alone fix takes the narrowest default holding them all, and that conversion ranks as no coercion.
  3. [property] {the checker: numerals} A numeral outside a bounded number type's range, or rounding to an infinity, is a static error, also in a tuple and in result positions of `if`, `case`, `do` and `try`.
  4. [property] {the checker: numerals} A program's type with no coercion from the numeral's type refuses a numeral.
  5. [property] {the checker: numerals} `NaturalNumeral` and `RadixPointNumeral` are written only as a parameter's type, never extended.
  6. [property] {the checker: sizes as values} A `nat` or `int` parameter read as a value is a `ZZ32`.
  7. [property] {the checker: numerals} One of a numeral coercion's four numbers is a `ZZ` where nothing fixes a type and converts where a place fixes a bounded number type.
  8. [pointer] It builds P-173, P-174 (twice) and P-40; F-407.
  9. [defect] {the checker: numerals} A `typecase`'s selector keeps its own numeral type (row 963).
  10. [detail] {the checker: numerals} `KindEnv.scala`, `getType`; `CoercionOracle.buildCoercion`.
  11. [tests] {the checker: numerals} Nine tests from `LiteralDefaultCompiled` to `NumeralStaticDesignCompiled`.
  12. [pointer] Detail in `rung-numeral-checker/REPORT.md`.
- Overlaps:
  - 1: F-73 ("reading ... numeral as `ZZ32`, or as `ZZ64` or `ZZ` when its value does not fit"), F-74 (walk's same rule, P-173) [P-173]; F-57 (the checker types a numeral by its numeral type) [NaturalNumeral].
  - 2: F-73 ("A type parameter that numerals alone fix, with no expected type, takes the narrowest default (F-342)"); F-341 ("a type parameter that several numerals fix takes the narrowest default holding them all") [narrowest].
  - 3, 4: F-124 ("`asZZ32` throws out of range", another subject) [out of range]; none found for the static range error.
  - 5: F-345 ("the numeral types written only as parameter types", the specification's side [written only]); F-79, F-131 on the numeral types.
  - 6: F-140 ("The checker types such a value `ZZ32` (P-173, F-342)"); F-129 (compiled run reads it as `ZZ32`) [P-40, NatValueZZ32].
  - 7: F-407 (title: "the four numbers ... a `ZZ` where nothing fixes a type") [P-174].
  - 9: none found [row 963].
- Checks: all tests found; row 963 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: several subjects: the checker: numerals; the checker: sizes as values.
- Title: states the default, the range refusal and the written-only rule; the body serves it, and adds the size value (6) and the coercion's four numbers (7), which F-140 and F-407 own.

## F-344, "Under walk, a value of the four string objects is read at its trait where walk infers a static argument ..."

- Claims:
  1. [property] {walk: generic instantiation} Where walk infers a static argument, a value of `FlatString`, `CatString`, `EmptyString` or `SubString` is read as `String`, also inside tuple types.
  2. [property] {walk: type names and ilk} Walk's type text prints each of the four by its trait.
  3. [detail] {walk: generic instantiation} Told by its declaring component (`LanguageTypes.java:13-33`), at `EvaluatorBase`'s three reads and `FTraitOrObject.toString`.
  4. [property] {walk: generic instantiation} So `Cell("s")` is a `Cell[\String\]`, and `Cell(3)` a `Cell[\ZZ32\]`, `<|1, 2, 3|>` an `ArrayList[\ZZ32\]`.
  5. [pointer] Numbers need no such reading since the five are objects (F-379).
  6. [property] {walk: type names and ilk} The ilk still names a string object by its own name.
  7. [tests] {walk: generic instantiation} `tests/LanguageTypeInstancesWalk`.
  8. [pointer] Detail in `rung-walk-language-types/REPORT.md`.
- Overlaps:
  - 1, 4: F-123 ("`Cell(3)` is a `Cell[\ZZ32\]` (`tests/LanguageTypeInstancesWalk`" [Cell(]); F-74 (walk infers `Box(3)` at the value object); F-328 ("walk instantiates a generic at its trait (F-344)").
  - 6: F-328 claim 4 [ilk, FlatString].
- Checks: all found (scout 4). No stale finding.
- Shape: several subjects: walk: generic instantiation; walk: type names and ilk.
- Title: states both; the body serves it.

## F-352, "A scratch tree with twelve marked hacks ran compiled programs against the interpreter's library and met sixteen walls ..."

- Claims:
  1. [history] {the compiled runtime: library selection} A scratch tree with twelve hacks on `832f7d0d91`'s code pointed the compiled path at the one library, and a one-line program passed the checker and the code generator.
  2. [property] {the compiled runtime: library selection} On `main` the compile command reads the prelude unless `FORTRESS_LIBRARY=one` selects the one library, and a program so compiled can run.
  3. [detail] {the compiled runtime: one library run} The run needed the fourteen components as bytecode, compiled in about 200 s.
  4. [history] {the compiled runtime: one library run} Three programs ran and printed walk's output: a line, an `Array1` build and read, a dot loop.
  5. [history] {the compiled runtime: one library run} Rank 2 and 3 arrays, `DOT`, `SUM` and microGPT were not run; microGPT is stopped by the checker (F-58).
  6. [history] {the code generator: switch-over walls} The runs met sixteen walls; the first kind shows against the prelude (rows 624, 81, 315, 990, 991, 992, 732), all fixed since or, for 624, under the selection.
  7. [defect] {the code generator: switch-over walls} Of the second kind, row 995 holds for carried types other than those over payload classes; rows 874, 866, 942, 994, 993 are fixed.
  8. [property] {the code generator: trait table} The trait table's search by the prelude's api names stays, and no compiled test reaches it (F-391).
  9. [property] {the compiled runtime: one library run} The one library's seven numbers, `Boolean`, `Char` and `FlatString` compile over payload classes (F-396).
  10. [history] {the compiled runtime: one library run} Every run had the verifier off, so the number of emitted methods the verifier refuses was not known.
  11. [history] {the compiled runtime: library selection} Measured once; the hacks did not land, and no test holds the runs.
  12. [pointer] Detail in `plan-31/probes/switch-rehearsal.md` and `model-closure-check.md`.
- Overlaps:
  - 2: F-9 ("`useCompilerLibraries()` ... follows the selection (F-381)"), F-381 (title), F-396 (title), F-293 [useCompilerLibraries].
  - 7: none found [row 995, row 942].
  - 8: F-391 (title: "no compiled test reaches the trait table's search by the prelude's names").
  - 9: F-396, F-353, F-388 [payload class].
  - 10: F-393 (ASM's verifier refuses 2 methods over the one library's compiled components), F-396 and F-390 (runs with the verifier on) [verifier].
  - 1, 11: F-353, F-358, F-361 (other scratch-tree probes) [scratch tree].
- Checks: both probe files found; rows 81, 315, 624, 732, 866, 874, 942, 990-994 FIXED and 995 NEGATIVE-BOUNDED, agree with the entry (scout 4). No stale finding.
- Shape: mostly history or plan; several subjects: the compiled runtime: library selection; the compiled runtime: one library run; the code generator: switch-over walls; the code generator: trait table.
- Title: states a probe's history and, after the semicolon, the present selection; the body is mostly the probe's walls, which serve the history half only.

## F-353, "One build can serve the compiled path with either library, shown in a scratch tree ..."

- Claims:
  1. [history] {the compiled runtime: library selection} In F-352's scratch tree, nine hacks behind one environment variable let one build serve either library, with a second set of run-time classes put first on the class path.
  2. [property] {the compiled runtime: library selection} One JVM serves one library.
  3. [history] {the compiled runtime: one library run} There the one-line program ran against both libraries, and the `Array1` and dot programs against the one library, by hand and through `fortress junit`.
  4. [history] {the harness and the gate: one library} A sample of 137 of 876 `compiler_tests` files showed none disturbed; the whole tracks and walk were not run.
  5. [history] {the compiled runtime: library selection} There the second set's sources equalled the first's under a map of eight names.
  6. [detail] {the compiled runtime: library selection} The classes that link against a prelude class by name were the thirteen, `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector`, `FStringVector`; 105 raise strings among other string mentions.
  7. [property] {the compiled runtime: helper raises} On `main` a raise string names the exception by its simple name (F-336).
  8. [property] {the compiled runtime: library selection} `main` has its own selector (F-381) and builds such a second set by the same mechanism with its own files (F-396).
  9. [property] {the compiled runtime: library selection} Its seven number types need no second set, since their payload classes serve the object classes for either library (F-388).
  10. [defect] {the compiled runtime: one library run} Except the `asString` bridge that compiled generic code calls, typed at the prelude's `String` (row 1101).
  11. [history] {the compiled runtime: library selection} The hacks did not land as such, and no test holds the runs.
  12. [pointer] Detail in `plan-31/probes/probe-y.md`.
- Overlaps:
  - 2, 8: F-396 (title: "compiles to jars over a second set of run-time classes"), F-381 [second set].
  - 7: F-336, F-24, F-312 [LibraryNames].
  - 9: F-388 ("the second set's `LibraryNames`"), F-396 [payload class].
  - 10: F-396 ("`u.asString` in a generic body at `U extends ZZ32` (row 1101)") [row 1101].
- Checks: probe found; row 1101 NEGATIVE-VERIFIED, agrees; the sample and the 105 raise strings not rechecked (scout 4). No stale finding.
- Shape: mostly history or plan; several subjects: the compiled runtime: library selection; the compiled runtime: one library run; the compiled runtime: helper raises.
- Title: states a probe's finding; the present mechanism (8-9) is F-396's subject.

## F-364, "The compiled checker instantiates a reduction that writes no static argument by its expected type ..."

- Claims:
  1. [property] {the checker: reduction inference} For a reduction with no written static argument, the checker first checks the call as written, then writes the argument as the expected type, then as the body's type, within the bounds, taking the first form that is accepted and converts.
  2. [property] {the checker: reduction inference} A reduction accepted as written is unchanged, and the elements are converted to the instance.
  3. [property] {the checker: reduction inference} A call's argument has no expected type where the call is accepted without one (P-51), so a reduction there runs at its body's type.
  4. [property] {the checker: reduction inference} `SUM`, `PROD`, `BIG MIN` and `BIG MAX` need no written static argument for the checker.
  5. [property] {the library: reduction sites} The library still writes it (F-285), and the model's one clause-form sum does not (F-59).
  6. [defect] {the checker: reduction inference} The two paths give such a reduction different instances at a method's return type, a field, a top-level variable and an assignment (row 1008).
  7. [defect] {the checker: reduction inference} A big operator with two or more static parameters is refused (row 1007).
  8. [defect] {the checker: reduction inference} Where the bound names its parameter, a type error in an unwritten reduction's body is reported as the big operator's refusal (row 1015).
  9. [history] {the checker: reduction inference} Observed once in copies without the argument: the library's two `BIG MIN` sites, its list comprehension and the model's sum give no error.
  10. [detail] {the checker: reduction inference} `reductionApplication` in `Functionals.scala`; `MicroGptFlat.fss:38`.
  11. [tests] {the checker: reduction inference} `InferBigOperatorSelfBound`; guards `InferBigOperatorExpectedType`, `InferBigOperatorUnwritten`.
  12. [pointer] Detail in `rung-static-argument-inferred/REPORT.md`.
- Overlaps:
  - 1, 4: F-59 ("the compiled checker takes an unwritten one from the reduction's expected type, else from the type of its body"); F-221 ("one whose bound names its parameter takes that type, else its body's (F-364)") [F-364, expected type].
  - 3: F-56, F-78 (expected type at a call) [expected type].
  - 5: F-285 ("The checker now infers such an unwritten argument itself (F-364); the library's sites stay written"); F-58 (line 38's sum) [F-364].
  - 6, 7, 8: none found [row 1008, row 1007, row 1015]; the skill's `revival-changes.md:122` on the two paths (scout 5).
- Checks: all found; row 731 FIXED, rows 1007, 1008 NEGATIVE-VERIFIED and 1015 NEGATIVE-BOUNDED, agree; line 38 not checked (scout 4). Stale lists a skill pointer (`sources.md` cites F-59 where F-364 is meant), not a finding on this entry.
- Shape: one subject (the checker: reduction inference), with defects and a library pointer.
- Title: states the rule; the body serves it.

## F-365, "The compiled checker instantiates a reference to a generic function by the arrow type that receives it ..."

- Claims:
  1. [property] {the checker: generic function as value} A reference with one generic declaration, no written static arguments and an expected arrow type takes the static arguments that make its instance a subtype of that type.
  2. [property] {the checker: generic function as value} As an argument it is typed again in the retry with each candidate's parameter type (`retypable`).
  3. [property] {the checker: generic function as value} A static parameter that the arrow's domain does not fix is refused, with a message naming it.
  4. [property] {the checker: generic function as value} An arrow type that carries its own static parameters is a subtype of no arrow type and coerces to nothing.
  5. [property] {the checker: generic function as value} The applied value of an untyped binding is refused with a message.
  6. [property] {the checker: generic function as value} A function's own static parameter counts as unbound also where the kind environment holds its name for another declaration (`carriesOwnStaticParams`).
  7. [property] {the checker: memos} The memo of normalized arrow types keys an arrow type by its static parameters too.
  8. [plan] {the checker: generic function as value} No test compiles the model's row-lift form, `rows(rmsn, x)`, a generic callee whose sizes its other argument fixes.
  9. [defect] {the checker: generic function as value} A name with several declarations of which one is generic (row 1009), and an untyped binding never applied (row 1010), are still refused or stopped.
  10. [defect] {the checker: generic function as value} A reference at a non-arrow expected type (row 1012) and a generic trait's functional method passed inside the trait (row 1013) are accepted and dead at run time.
  11. [tests] {the checker: generic function as value} Four tests, `GenericFunctionAsValue*`.
  12. [pointer] Detail in `rung-static-argument-inferred/REPORT.md`, step 2.
- Overlaps:
  - 1: F-367 (walk's side: "Under walk a generic function is a value, received at the arrow type of its parameter or variable" [F-367, generic function]); the skill's `compiler.md:154` (scout 5).
  - 6: F-384 ("The code generator's kind environment holds the static parameters in scope", another phase) [kind env].
  - 7: F-235 (the checker's memos) [memo]; none for the arrow memo.
  - 9, 10: none found [row 1009, row 1010, row 1012, row 1013].
- Checks: all found; `instantiatedReference` not grepped; rows 758 FIXED, 1009, 1010, 1012, 1013 NEGATIVE-VERIFIED, agree (scout 4). No stale finding.
- Shape: one subject (the checker: generic function as value), with a memo claim (7).
- Title: states the rule and the refusal; the body serves it.

## F-370, "The compiled checker takes each type that a component's declaration leaves out from the exported api's declaration of it."

- Claims:
  1. [property] {the checker: types from the api} The checker takes a parameter, return, value-parameter, field or top-level variable type that a component leaves out from the exported api's declaration.
  2. [property] {the checker: types from the api} A method is covered only where the api's declaration of its own trait or object lists it.
  3. [property] {the checker: types from the api} So a component may leave all its types to its api on both paths, and the checker checks the bodies with the api's types.
  4. [defect] {walk: export check} Walk compares no component with its api (row 841).
  5. [pointer] F-254 gives the api declaration that an overloaded name's return type comes from.
  6. [defect] {the checker: types from the api} Where no api gives the type, a parameter is refused (F-266; row 405).
  7. [defect] {the checker: types from the api} An object's untyped value parameter stops the checker with a Java exception (row 1032).
  8. [detail] {the checker: types from the api} Observed by a component that writes no type; read in `ApiTypeExtractor.scala:52-188`.
  9. [tests] {the checker: types from the api} `OmittedReturnTypeFromApi` gates the return type only; no test gates the whole.
  10. [pointer] Detail in `reviews/omitted-types-intent-2026-11-16.md`.
- Overlaps:
  - 1-3: F-254 ("the one declaration of the exported api whose parameter types are the function's own" [ApiTypeExtractor]); F-371 ("beyond copying them from the exported api" [from the exported api]); F-232 [ApiTypeExtractor].
  - 4: F-297 ("Walk compares no component with its apis (row 841)") [row 841].
  - 6: F-266, F-371 [row 405].
  - 7: F-266 ("an object's own untyped value parameter stops the checker with a Java exception (row 1032)") [row 1032].
- Checks: rows 841, 405 NEGATIVE-VERIFIED agree; row 1032 is CONTESTED while the entry states its exception as plain fact: a ledger row's status disagrees (scout 4; stale, F-370).
- Shape: one subject (the checker: types from the api), with a walk defect (4).
- Title: states the rule; the body serves it.

## F-376, "A compiled dispatcher of a generic declaration casts an arm's result to its own range."

- Claims:
  1. [property] {the code generator: dispatcher casts} Where an overload set's principal declaration returns one of its static parameters, the dispatcher casts each arm's result of another declared type to that parameter.
  2. [property] {the code generator: dispatcher casts} So a generic declaration beside one on an object type verifies at every instance, where before it failed 'VerifyError: Bad return type'.
  3. [defect] {the code generator: dispatcher casts} A dispatcher whose range is no static parameter has no such cast (row 699).
  4. [property] {the checker: choice among declarations} The test's call at `Box[\Square\]` takes `Box`'s `keep(self)` by F-408's rules, read and not observed in a run.
  5. [detail] {the code generator: dispatcher casts} `OverloadSet`, `generateCall`, `generateLeafCall`.
  6. [tests] {the code generator: dispatcher casts} The `run` step of `OverloadReturnObjectDomain`.
  7. [pointer] Detail in `rung-return-rule-object/REPORT.md`.
- Overlaps:
  - 1-2: F-75 (gated by `OverloadReturnObjectDomain`; generic beside object declaration "the pair runs (row 542, fixed; F-376)" [OverloadReturnObjectDomain]); F-393 ('VerifyError: Bad local variable type', another cause [VerifyError]).
  - 3: none found [row 699].
- Checks: test found; row 699 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: one subject (the code generator: dispatcher casts).
- Title: states the cast; the body serves it, with a reading of the checker's choice (4).

## F-381, "The compile command reads the one library where `FORTRESS_LIBRARY=one` ... selects it ..."

- Claims:
  1. [property] {the compiled runtime: library selection} The compile command reads the one library where `FORTRESS_LIBRARY=one` or `-Dfortress.library=one` selects it, and keeps its caches in `default_repository/caches-one`.
  2. [property] {the compiled runtime: library selection} The selection is read once per JVM; `Shell.useCompilerLibraries()` follows it, and the two class path scripts follow the variable only.
  3. [property] {the compiled runtime: library selection} Unset, every command reads the prelude.
  4. [property] {the compiled runtime: one library run} A program compiled under the selection can run against the one library's jars, which the onelibrary track compiles first (F-396).
  5. [property] {the harness and the gate: one library} Its tests run in `testFast`'s onelibrary track and in `ant testOneLibrary`.
  6. [tests] {the harness and the gate: one library} `OneLibraryHalf`, `OneLibraryPrintBig`, `OneLibraryRunHello`, `XXXOneLibraryRunHalf`.
  7. [pointer] Detail in `rung-library-selector/REPORT.md` and `rung-first-run-one-library/REPORT.md`.
- Overlaps:
  - 1-3: F-9 ("`Shell.java` calls `useCompilerLibraries()` for the command, which follows the selection (F-381)"), F-293, F-352 claim 2 [useCompilerLibraries]; F-404 (`caches-one`, the seeding script) [caches-one]; the skill's `build-and-caches.md:73` (scout 5).
  - 4, 5: F-396 (the track compiles the fourteen first), F-34 ("the onelibrary track runs first in every gate") [onelibrary track].
- Checks: all found; `build.xml` targets exist (scout 4). No stale finding.
- Shape: several subjects: the compiled runtime: library selection; the harness and the gate: one library.
- Title: states the selection, its caches and its track; the body serves it.

## F-390, "The code generator passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]` ..."

- Claims:
  1. [property] {the code generator: varargs} A varargs parameter's arguments pass as one `ImmutableArray[\T, ZZ32\]` of the library in use, one JVM parameter after the plain ones.
  2. [defect] {the code generator: varargs} Against the compiler's prelude, which declares no such type, the code generator refuses the declaration.
  3. [property] {the code generator: varargs} The array is made at the call or in a dispatch method's branch and filled with `init`, as walk makes it; a single tuple argument passes its elements.
  4. [property] {the code generator: varargs} A call reaches the declaration by the specification's expansion rule (`OverloadSet.VarargsExpansion`).
  5. [defect] {the code generator: varargs} Under the selection the code generator stops on a varargs method, or a generic varargs function, beside another declaration with as many parameters (row 1086).
  6. [defect] {the code generator: varargs} A spread argument, `f(1, ys...)`, is dropped without a message on both paths (row 1085).
  7. [property] {the code generator: varargs} So under the selection the library's varargs declarations that a program reaches, such as `println` and `assert`, compile.
  8. [property] {the compiled runtime: one library run} Each element's index, made by `FZZ32.make`, agrees with `init`, since the one library's `ZZ32` is `FZZ32` in every descriptor.
  9. [property] {the compiled runtime: one library run} With the verifier on, a program that calls a varargs declaration runs, each class holding a method once (F-409).
  10. [defect] {the compiled runtime: one library run} Except where it prints a number by `println` (row 1098).
  11. [detail] {the code generator: varargs} `NamingCzar.varargsParamType`, `CodeGen.evalVarargsArgs`, `emitVarargsArray`.
  12. [tests] {the code generator: varargs} Six `OneLibraryVarargs*.test`, `XXXOneLibraryRunVarargs.test`, `XXXVarargsCodeGeneration.test`, `XXXVarargsMethodCodeGeneration.test`.
  13. [pointer] Detail in `rung-varargs/REPORT.md`, `rung-first-run-one-library/REPORT.md`, `reviews/batch-33b-review.md`.
- Overlaps:
  - 1, 2: F-86 ("types a varargs parameter as the team's `ImmutableArray[\T, ZZ32\]`", the checker side, and "the code generator refuses a varargs declaration with 'Can't compile VarArgs yet'"); F-320 (the same refusal against the prelude); F-352 (row 624) [varargs].
  - 5, 6: none found [row 1086, row 1085].
  - 7: F-315 ("the code generator compiles varargs" for the library's `stringifyChars`); F-396 (title: "calls a varargs declaration") [varargs].
  - 8: F-388, F-396 (cited).
  - 9: F-409 (cited); F-396 (verifier on).
  - 10: F-396 ("`println` of a number or a boolean ... (row 1098)") [row 1098].
- Checks: all found; the `OneLibraryVarargs*` glob matches 7 files where the entry says six (scout 4, a count, not marked a finding); rows 1085, 1086 agree; row 1098 is CONTESTED while the entry gives its `println` case as a plain exception: a ledger row's status disagrees (scout 4; stale, F-390).
- Shape: several subjects: the code generator: varargs; the compiled runtime: one library run.
- Title: states the convention and the prelude's refusal; the body serves it, with run results (8-10) that F-396 also holds.

## F-391, "The code generator gathers a trait's methods with entries that name each trait as the trait table finds it ..."

- Claims:
  1. [property] {the code generator: trait table} `STypesUtil.gatherMethods` names the trait of a type's own declarations by the name the table was asked for.
  2. [property] {the code generator: trait table} A functional method's special arrow names its trait with the api of its self type (`nameBySelfType`).
  3. [property] {the code generator: trait table} So an object's overload beside a method inherited from an api's trait, a call at an assumption of such a trait and the one library's `Array1` compile.
  4. [property] {the code generator: type assumptions} A call at an assumption runs the trait's body, also over an object's override (`hasBodyInItsTrait`).
  5. [defect] {the code generator: type assumptions} Except a method of a generic trait whose parameter has the trait's type parameter, where the code generator stops (row 1088).
  6. [property] {the code generator: trait table} No compiled test reaches the trait table's search by the prelude's names.
  7. [tests] {the code generator: trait table} Five `compiler_tests` and `OneLibraryArray1.test`.
  8. [pointer] Detail in `rung-api-method-index/REPORT.md`.
- Overlaps:
  - 1-3: F-338 (title: an imported api's trait as first supertrait [imported api]); F-372 (forwards to a body of an imported api's trait).
  - 4: F-325 (claims 1-3, the assumption forms) [assumption].
  - 5: none found [row 1088].
  - 6: F-352 ("the search stays, and no compiled test reaches it, F-391") [trait table].
- Checks: all found; `hasBodyInItsTrait` not grepped; row 1088 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: several subjects: the code generator: trait table; the code generator: type assumptions.
- Title: states the naming and that no test reaches the prelude-name search; the body serves it, with assumption claims (4-5) on F-325's subject.

## F-392, "The code generator compiles a generic method called on a receiver typed by a type variable."

- Claims:
  1. [property] {the code generator: type-variable receivers} The code generator casts the receiver to the variable's bound that declares or inherits the method, the most specific where several do, and the receiver object's own method runs.
  2. [property] {the code generator: type-variable receivers} The bounds include a `where` clause's, also that of a calling method with no static parameters of its own whose clause bounds its trait's parameter.
  3. [defect] {the checker: type-variable receivers} A bound that is another type variable is not read, since the checker refuses the call first (row 1093).
  4. [tests] {the code generator: type-variable receivers} `TypeVariableReceiverGenericMethod`.
  5. [pointer] Detail in `rung-type-variable-receiver/REPORT.md`.
- Overlaps:
  - 1-2: none found for the cast [type variable]; F-256 and F-250 read `where` clauses in the checker, another phase.
  - 3: none in FACTS [row 1093]; the skill's `compiler.md:174` (scout 5).
- Checks: test found; row 1093 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: one subject (the code generator: type-variable receivers).
- Title: states the compile; the body serves it.

## F-393, "The code generator keeps a local variable in its environment for the rest of its block only ..."

- Claims:
  1. [property] {the code generator: local variable scope} `CodeGen.forLocalVarDecl` adds a declaration's bindings to the environment of its body only, after the initializer, so a later closure or task reads no slot of a nested block's bindings.
  2. [history] {the code generator: local variable scope} Before, such a closure captured an arm's slot, unset on the other path, and failed 'VerifyError: Bad local variable type' (row 1078, with row 983's coercion parameter `r`).
  3. [history] {the code generator: bytecode verification} In one run on a scratch copy with the rehearsal patch less its stand-in for row 1078, `Hello` ran against the one library with the verifier on.
  4. [detail] {the code generator: bytecode verification} Over that copy, ASM's verifier refused none of `FortressLibrary`'s 4,694 methods and 2 in all, both in `RangeInternals` (row 1054), with 1,092 template classes skipped.
  5. [defect] {the code generator: bytecode verification} Two methods of `RangeInternals` fail ASM's verifier (row 1054).
  6. [detail] {the code generator: local variable scope} `CodeGen.java:4904-4910`.
  7. [tests] {the code generator: local variable scope} `BlockBindingScopeCompiled`.
  8. [pointer] Detail in `rung-label-local-verify/REPORT.md`.
- Overlaps:
  - 1: none found [row 1078, Bad local].
  - 5: F-378 ("an object's method overloaded at a pair (row 1054)") [row 1054].
  - 3-5: F-352 (verifier off), F-396, F-390 (verifier on) [verifier].
- Checks: test found; the rehearsal patch not checked; rows 983 NEGATIVE-BOUNDED, 1054 NEGATIVE-VERIFIED; the entry refers to "its stand-in for row 1078" without saying the row is FIXED: a ledger row's status disagrees (scout 4; stale, F-393).
- Shape: several subjects: the code generator: local variable scope; the code generator: bytecode verification.
- Title: states the scope rule; the body serves it, with a scratch-copy verification run (3-5) on another question.

## F-394, "The compiled checker checks the return type of a getter declared in a trait or an object against the getter that it keeps from being inherited ..."

- Claims:
  1. [property] {the checker: getter return types} At the same parameter types, a pair of getters is checked by the Return Type Rule as a pair of methods is, each receiver read as the plain type that declares it (P-146, P-157).
  2. [property] {the checker: getter return types} So a narrowing getter below a self-typed trait compiles, and a widening one is refused, also where its return type is inferred.
  3. [defect] {the checker: self-typed traits} A dotted method so redeclared reads the trait's receiver as the intersection and is refused where it narrows, against P-146 and P-157 (row 1094).
  4. [defect] {the checker: getter return types} An object expression's getter or dotted method is not checked so (row 1097).
  5. [defect] {the code generator: object expressions} The code generator stops at 'Can't compile ObjectExpr' (row 375), so no compiled program reaches row 1097.
  6. [property] {the library: getter return types} In the one library's fourteen components no getter widens, so the count and the distance stay 0.
  7. [defect] {the library: getter return types} The library's other components still hold some widening getters (row 1095).
  8. [tests] {the checker: getter return types} `XXXGetterReturnTypeNotSubtype`, `XXXInferredGetterReturnTypeNotSubtype`, `SelfTypedGetterNarrowedReturn`.
  9. [pointer] Detail in `rung-widening-getter/REPORT.md` and `SKEPTIC.md`.
- Overlaps:
  - 1-2: F-225 ("a getter so redeclared reads the plain type and compiles (F-394)") [getter].
  - 3: F-225 ("in the Return Type check of a dotted method redeclared below the trait (row 1094)") [row 1094].
  - 5: none in FACTS [row 375, ObjectExpr]; the skill's `compiler.md` lists the construct.
  - 6, 7: none found [row 1095].
- Checks: tests found; rows 375, 1094, 1095, 1097 NEGATIVE-VERIFIED, agree (scout 4). No stale finding.
- Shape: several subjects: the checker: getter return types; the checker: self-typed traits; the code generator: object expressions; the library: getter return types.
- Title: states the check and its gap at object expressions; the body serves it.

## F-396, "The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run ..."

- Claims:
  1. [property] {the harness and the gate: one library} Under `FORTRESS_LIBRARY=one` the onelibrary track compiles the fourteen components first, in one `.test`.
  2. [property] {the compiled runtime: one library run} A program compiled against them runs with the verifier on, as `Hello`, a varargs call, a range reduction and a string comparison do.
  3. [property] {the compiled runtime: library selection} The run time's classes that name a library's types come in two sets under one set of names: `build` for the prelude, `build-one` from `src-one` for the one library, first on the class path under the selection.
  4. [property] {the code generator: number objects} The one library's seven numbers, `Boolean`, `Char` and `FlatString` are objects whose classes the code generator writes over payload classes.
  5. [property] {the library: value objects} All of them are value objects but `FlatString`, a reference object.
  6. [property] {the compiled runtime: helper raises} A helper's raise names its exception by its simple name, which each set's `LibraryNames` maps to its library's class.
  7. [defect] {the compiled runtime: one library run} `println` of a number or a boolean departs from walk (row 1098).
  8. [defect] {the compiled runtime: one library run} `u.asString` in a generic body at `U extends ZZ32` departs (row 1101).
  9. [defect] {the compiled runtime: one library run} The report of an uncaught exception departs (row 1102).
  10. [defect] {the compiled runtime: helper raises} A caught exception that a helper raises is not its object (row 1103).
  11. [defect] {the compiled runtime: one library run} A reduction over a zip of two lists, or `=` of two lists, departs (row 1137).
  12. [defect] {the compiled runtime: one library run} A `Vector`'s `+` and `-` (row 643) and its `copy` (row 1138) depart.
  13. [defect] {the compiled runtime: one library run} A failing `assert` with a message dies with an `AbstractMethodError` (row 1140).
  14. [property] {the checker: choice among declarations} A call on `self` in `QQ comprises { Ratio }` takes `Ratio`'s declaration in every JVM (F-408).
  15. [tests] {the harness and the gate: one library} Seven `one_library_tests`.
  16. [pointer] Detail in `rung-first-run-one-library/REPORT.md` and `rung-one-library-run-walls/REPORT.md`.
- Overlaps:
  - 1: F-34 ("`OneLibraryComponents.test`, which the onelibrary track runs first in every gate"), F-381 [onelibrary track, fourteen components].
  - 2: F-390 (varargs run, verifier on), F-381 (`Hello`), F-409 [verifier].
  - 3: F-353 (the scratch-tree second set), F-381, F-404 (`build-one`) [second set].
  - 4, 5: F-388 ("number types as value objects, whose classes the code generator writes over the run time's payload classes"), F-302, F-352, F-353 [payload class]; F-379 (seven of eight objects).
  - 6: F-336, F-24, F-312 [LibraryNames].
  - 7: F-390 claim 10 [row 1098]; 8: F-353 claim 10 [row 1101]; 10: F-336 claim 3 [row 1103]; 11: F-34 ("such a class, as row 1137's" [row 1137]); 9, 12, 13: none found [row 1102, row 643, row 1140].
  - 14: F-408, F-377 ("`QQ`'s calls on `self` that take `Ratio`'s (F-408)") [Ratio].
- Checks (stale, F-396; pilot findings 1-4 and scout 4):
  - 11: "`=` of two lists" at row 1137 is beyond its support: the skeptic compared two empty lists.
  - 10: false today: row 1103 holds against either library, not only the one library.
  - 12: the `Vector` tie to row 643 is beyond its support: the row names no vector.
  - 13: beyond its support: row 1140's reproducer is none, observed once.
  - 7: row 1098 is CONTESTED and not marked so: a ledger row's status disagrees.
  - Others: all tests and files found (scout 4).
- Shape: several subjects: the harness and the gate: one library; the compiled runtime: one library run; the compiled runtime: library selection; the code generator: number objects; the compiled runtime: helper raises; the checker: choice among declarations. Seven of its claims are defects.
- Title: states that the jars build and that programs run; the list of departures (7-13) serves a different question, what does not yet run.

## F-408, "The compiled checker chooses among a call's declarations by their signatures as declared, takes them in the order of their places ..."

- Claims:
  1. [property] {the checker: choice among declarations} The checker chooses among a call's declarations by their declared signatures, with `self` in them (P-45, P-60, F-225).
  2. [property] {the checker: candidate order} The candidates are in the order of their declarations' places, file then line then column.
  3. [defect] {the checker: candidate order} Where the order decides a call, the tree departs from P-181 (rows 1136, 1143, 1145).
  4. [property] {the checker: choice among declarations} Of a tie's candidates, a declaration met twice counts once, and one more specific than every other on its declared arrow decides.
  5. [property] {the checker: choice among declarations} P-60's tie is typed by its intersection where the tied declarations, and every more specific one the call may run, have no static parameters.
  6. [property] {the checker: choice among declarations} Any other tie is 'Ambiguous call', save one the overloading check reports instead, among the unit's own declarations or duplicates.
  7. [defect] {the checker: choice among declarations} A tie that no rule decides among the unit's own declarations, in a set the overloading check accepts, keeps the first by place with no error (row 1136).
  8. [pointer] The code generator casts `self` where the chosen declaration takes a listed type (F-377).
  9. [property] {the checker: choice among declarations} So a call's choice and type no longer follow the JVM's identity hashes.
  10. [property] {the checker: choice among declarations} The one library's calls on `self` in `QQ` take `Ratio`'s declarations.
  11. [tests] {the checker: choice among declarations} Five `compiler_tests`.
  12. [pointer] Detail in `rung-checker-most-specific/REPORT.md`.
- Overlaps:
  - 1, 5: F-76 ("returns the intersection of the return types of its most specific declarations, when they tie", P-60), F-27, F-386, F-175 [P-60].
  - 2: F-334 ("a call's candidates come in the order of their declarations' places") [by place].
  - 3, 7: F-403 (P-181's overload set) [P-181]; none for rows 1136, 1143, 1145 [row 1136].
  - 9: F-232 ("The syntax tree's hashes do not depend on the JVM's identity hashes, except ..."), F-354 (the code generator's order follows identity hashes, row 996) [identity hash].
  - 10: F-396 claim 14, F-377 [Ratio].
- Checks: all found; rows 1136, 1143, 1145 NEGATIVE-VERIFIED, agree (scout 4). The curator's words of 2026-11-24, "File order cannot decide! There must be a language rule that decides definitively or its static error!", are in the history (scout 6; review-queue item 419). No stale finding.
- Shape: several subjects: the checker: choice among declarations; the checker: candidate order.
- Title: states the choice by declared signatures, the order by place and the kept tie; the body serves it.

## F-409, "A class that the code generator writes holds each method once by name and descriptor ..."

- Claims:
  1. [property] {the code generator: methods written once} A bridge, a forwarder to an inherited body and a dispatch method among inherited declarations are written only where the class's own methods leave the name and descriptor free.
  2. [property] {the code generator: methods written once} One bridge that two parents give is written once.
  3. [detail] {the code generator: methods written once} The class writer keeps the record and holds those methods to the class's end (`CodeGenClassWriter.java`).
  4. [property] {the specification: method declarations} It follows the specification's "Method Declarations": a declaration of the type itself replaces an inherited one at the same parameter types.
  5. [history] {the code generator: methods written once} The one library's 2208 classes held 25 methods twice on the base and hold none.
  6. [defect] {the code generator: methods written once} Two methods whose descriptors become equal only at a generic class's instance are not caught.
  7. [tests] {the code generator: methods written once} Four `one_library_tests` and `TraitBridgesWrittenOnce.test`.
  8. [pointer] Detail in `rung-one-library-run-walls/REPORT.md` and its `SKEPTIC.md`.
- Overlaps:
  - 1, 2: F-352 ("a method written twice (row 990)", fixed) [twice]; F-400 ("at each hidden declaration's JVM signature, a bridge that runs it"), F-378 (two bridges join a boxed tuple) [bridge].
  - 6: none found; no ledger row named.
- Checks: all found; `SKEPTIC.md`'s heading not checked (scout 1, 4). No stale finding.
- Shape: one subject (the code generator: methods written once).
- Title: states the rule; the body serves it, with an open gap (6) that names no row.

## Subject labels used

- the checker: candidate order: F-334, F-408
- the checker: choice among declarations: F-376, F-396, F-408
- the checker: distance stage: F-334
- the checker: generic function as value: F-365
- the checker: getter return types: F-394
- the checker: memos: F-365
- the checker: numerals: F-342
- the checker: reduction inference: F-364
- the checker: self-typed traits: F-394
- the checker: sizes as values: F-342
- the checker: type-variable receivers: F-392
- the checker: types from the api: F-370
- the checker: walk-world type table: F-330, F-333
- the code generator: bytecode verification: F-393
- the code generator: dispatcher casts: F-376
- the code generator: local variable scope: F-393
- the code generator: methods written once: F-409
- the code generator: number objects: F-396
- the code generator: object expressions: F-394
- the code generator: switch-over walls: F-352
- the code generator: trait table: F-338, F-352, F-391
- the code generator: type assumptions: F-325, F-391
- the code generator: type-variable receivers: F-392
- the code generator: varargs: F-390
- the compiled runtime: array stores: F-333
- the compiled runtime: class loader: F-337
- the compiled runtime: helper raises: F-336, F-353, F-396
- the compiled runtime: library selection: F-352, F-353, F-381, F-396
- the compiled runtime: one library run: F-352, F-353, F-381, F-390, F-396
- the compiled runtime: tasks and transactions: F-335
- the compiled runtime: transactions: F-333
- walk: export check: F-370
- walk: generic instantiation: F-344
- walk: helper raises: F-336
- walk: own operations for helpers: F-328, F-330, F-332, F-333, F-335
- walk: type assumptions: F-325
- walk: type names and ilk: F-328, F-344
- the library: array stores: F-333
- the library: getter return types: F-394
- the library: I/O streams: F-330, F-332
- the library: native helper bindings: F-327, F-328, F-335
- the library: reduction sites: F-364
- the library: string conversion: F-328
- the library: value objects: F-396
- the specification: method declarations: F-409
- the harness and the gate: one library: F-353, F-381, F-396
- the repository: dead glue classes: F-333

## Entries that overlap

- Library selection and the one library's run: F-352 (claim 2), F-353 (8-9), F-381 (1-4), F-396 (1-3), with F-9, F-293, F-34, F-404 and F-388 outside the chunk. F-352 and F-353 are probes in one scratch tree whose present half F-381 and F-396 own.
- One-library run departures by row: F-396 (rows 1098, 1101, 1103), F-390 (row 1098), F-353 (row 1101), F-336 (row 1103), F-34 (row 1137).
- Helper raises and `LibraryNames`: F-336, F-332 (claim 7), F-353 (7), F-396 (6), with F-24, F-312, F-388, F-299 outside.
- Walk's own operations for helpers (`OWN_OPERATIONS` and private native objects): F-328, F-335, F-330, F-332, F-333, with F-299 outside, which counts them all.
- Native helper bindings and their counts: F-327, F-328, F-330, F-332, F-333, F-335, all pointing at F-299's count, and F-32 outside.
- I/O streams: F-330 and F-332 (`FileWriteStream`, `FileNotFoundException`).
- Candidate order and choice: F-334 (claim 3) and F-408 (2); F-408 with F-76, F-232, F-354, F-377 outside; F-396 (14) and F-408 (10) on `QQ`'s `Ratio`.
- Trait table and api traits: F-338, F-391, F-352 (8), with F-372 outside.
- Type assumptions: F-325 and F-391 (4-5), with F-34, F-379 outside.
- Varargs: F-390 with F-86, F-320, F-315 outside, and F-352 (row 624).
- Bytecode verification: F-352 (10), F-393 (3-5), F-390 (9), F-396 (2), F-409, with F-34, F-378 outside.
- Numerals' default and size value: F-342 with F-73, F-74, F-140, F-341, F-407, F-57, F-345 outside.
- Reduction inference: F-364 with F-59, F-221, F-285, F-58 outside.
- Types from the api: F-370 with F-254, F-266, F-297, F-371 outside.
- Getter return types: F-394 with F-225 outside.
- Generic function as value: F-365 (compiled) and F-367 outside (walk).
- Walk's type text and ilk: F-328 (claim 4) and F-344 (2, 6), with F-123 outside on `Cell(3)`.

## What the search could not settle

- F-325 claims 6-8, F-335 claim 6, F-364 claims 6-8, F-365 claims 9-10, F-376 claim 3, F-390 claims 5-6, F-392 claim 3, F-394 claims 5 and 7, F-396 claims 9, 12-13: no other entry names these rows; whether the ledger alone should hold them is the grouping worker's question.
- F-409 claim 6 names a gap with no ledger row; the search found none.
- F-352 and F-353: their history and their present halves could not be told apart by search alone where the entry gives no date (F-352 claim 9, F-353 claims 8-9).
- F-390 cites "the six `OneLibraryVarargs*.test`"; the scout's glob found 7 files. Not marked a finding; not settled here.
- F-336 claim 3 against the pilot's finding on F-396 (row 1103 "against either library"): the finding names F-396 only, so whether F-336's scope is wrong is not settled.
- F-337: `mustUseSystemLoader` was not checked by the scout; F-365: `instantiatedReference`; F-391: `hasBodyInItsTrait`; F-393: the rehearsal patch.
