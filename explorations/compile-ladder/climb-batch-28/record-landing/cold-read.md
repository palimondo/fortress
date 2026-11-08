# Cold read of `record-landing/clean.txt`

Read with only `CLAUDE.md`, the `fortress-repo` skill's `SKILL.md` and its `references/` (not `revival-changes.md` or `sources.md`). 51 entries: 46 facts and 5 positions, in the file's order. Terms the skill defines (walk, compiled path, one library, switch-over, count stage, distance stage, glue class, helper, transfer helper, wall, row) are taken as defined. Two words that recur and that the skill never defines: **rung** (a unit of work on the compile ladder, I infer) and **climb batch** (a batch of rungs that ends in a landed gate, I infer). I flag them once here, not again in every entry.

---

### 1. F-53, "At the last landed gate, climb batch 28's, the distance ..."

- **Established:** At the newest landed gate, which is climb batch 28's, the distance to the switch-over is 0 and the checker count is 0. The distance is the number of distinct errors the compiled checker finds over 14 components of the one library: twelve apis with their twelve components, plus `CovariantCollection` and `OneShotFlag`, which `List` imports. The distance runs every checker stage on each component even when an earlier stage failed. It classes its errors by root cause, and it now checks `value object Char` to its end with no crash. The checker count covers only the `FortressLibrary` component and the apis it imports, and each unit stops at its first failing stage. Its run ends clean, which reads as 0, and nothing crashes.
- **Conditions:** The values hold for the newest landed gate. A rise in either number is reported but does not turn the gate red by itself. The count stage can still turn the gate red on the faults that F-66 lists, for example a crash that no rung listed. Ledger row 731 is a checker gap: a `SUM`-like big operator with no static argument written is refused. The library's text avoids that form, so the gap stays open for user programs and the team's demos.
- **Consequence:** A rung measured by either number starts from the newest landed gate's tables: `climb-batch-<N>/gate/distance.txt`, `checker-count.txt` and `compile-ladder/gate/distance-sites.tsv`. The sites file is empty now, so any site a rung adds is new.
- **Evidence:** `tools/checker-count/run.sh`; F-288, F-54, F-334, F-285, F-233, P-39; the `coordinator` skill's `references/batch.md`, "The checker count and the distance".
- **Could not resolve:**
  - "twelve apis and their twelve components, and `List`'s two imports ..., fourteen components in all": is the count 12 apis or 14? F-288 says `CovariantCollection` has an api. Unclear wording.
  - "stage" has two senses in one entry: a checker stage ("each unit stops at its first failing stage") and a gate stage ("the count's stage"). Unclear wording.
  - "the faults that F-66 names, such as a crash that no rung listed": F-66 is not here. "Listed" is unclear: listed where, and by whom? Unclear wording, and it relies on an entry I do not have.
  - "which the stage reads as 0": does the hedge mean the 0 is only how the stage reads a clean run, and not a true count of 0? Two readings.
  - "distinct errors": distinct by text, by site, or by root cause? Unclear wording.
  - Neither `gate.md`'s seven steps nor this entry says which gate step runs the distance and count stages. This does not block reading the entry.

### 2. F-321, "Against the interpreter's prelude the checker reads the whole helper class ..."

- **Established:** When the compiled checker checks against the one library, it reads every method of a helper class that a binding names. `nativeHelpers/systemOps.getArgs` answers `FStringVector`, which `NamingCzar` maps to `FortressBuiltin.StringVector`, and the one library does not declare that type. So any component that binds any `systemOps` helper stops with 'FortressBuiltin.StringVector is undefined.'
- **Conditions:** It applies to checks against the one library (the count stage, the distance stage, and the switch-over). Checks against the compiler's prelude do not show it, because that prelude declares `StringVector`. No binding of the one library names `systemOps` today: `System` uses `stringOps` and `programArgs` (F-337). `CompilerSystem.fss:13-14` still imports `systemOps`. Checked alone against the one library, `System` gives no error ('### rc=0'), and neither gate stage reads `System`.
- **Consequence:** Bind a helper only from a class in which every method maps to the one library's types. This is why `FlatString`'s line separator names `stringOps.lineSeparator`. Do not bind any helper of `systemOps`.
- **Evidence:** `systemOps.java:24`; `NamingCzar.java:341-342`. A distance-stage run with `natLineSeparator` pointed at `systemOps.lineSeparator` printed the error and 'File FlatString.fss has 1 error.' No test. Detail is in the `rung-string-natives` and `rung-system-natives` reports.
- **Could not resolve:**
  - "Against the interpreter's prelude": `library.md` uses "prelude" for `FortressLibrary` alone, but the missing type belongs in `FortressBuiltin`. I read it as the whole one library. Unclear wording.
  - "'### rc=0'": the entry gives this output but not the command that printed it. `records.md` asks for the command when no test exists. Unclear: how do I reproduce it?
  - "`CompilerSystem` still imports `systemOps`' `getArgs` and `getProperty`": the entry does not say what this means for the work. Is it a hazard at the switch-over, or harmless? Unclear.

### 3. F-331, "The integer types convert by checked `as…` getters that raise `IntegerOverflow` ..."

- **Established:** `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` each have the getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ`, which give 25 in all. Each one keeps the value or raises `IntegerOverflow`. Of the 25, 5 are identities, 7 equal coercions and 13 can raise. Of those 13, 8 are written in Fortress and 5 are bare helper bindings. `bitsAsNN32`, `bitsAsNN64`, `bitsAsZZ32` and `bitsAsZZ64` equal `unsigned` and `signed`. `narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits and are declared on every type where they apply. `ZZ` has only `big`. `IntLiteral`'s 8 conversions and comparisons are Fortress over its `asZZ`.
- **Conditions:** Under walk, no conversion is reached through a coercion. Until the switch-over, the compiled prelude has only 8 of the 25 getters and no `big` (row 349).
- **Consequence:** `narrow(z)` on a `ZZ` finds no declaration, so write `z.asZZ32`. Use an `as…` getter for a checked conversion and the low-bits names for bit-keeping.
- **Evidence:** The tests `tests/IntegerConversionsWalk`, `tests/IntLiteralTextWalk`, `compiler_tests/IntegerConversionHelpersCompiled` and `compiler_tests/XXXZZNarrowRungP`; F-299 counts the bindings; `rung-integer-conversions/REPORT.md`.
- **Could not resolve:**
  - "`bitsAsNN32`, `bitsAsNN64`, `bitsAsZZ32` and `bitsAsZZ64` equal `unsigned` and `signed`": the entry does not say which getter equals which name, or on which types each getter is declared. For example, what is `bitsAsNN64` on a `ZZ32`? Unclear wording.
  - "return a value of their result type unchanged": I read two meanings. Either these names are declared on their own result type as identities (for example `widen` on a `ZZ64`), or they keep the bits. Unclear wording.
  - "the low-bits names on every type" (title) against "`ZZ` has `big` only" (body): the two agree only under "where it applies", which the title leaves out. Unclear wording.
  - `IntLiteral`: the skill does not define the numeral type. I infer that it is the type of an integer numeral, which walk represents as an `Int` (F-32). A language concept I lack.

### 4. F-332, "Walk carries `FortressLibrary`'s `JavaBufferedReader` in a Java `FortressBufferedReader` ..."

- **Established:** The one library's reader trait `JavaBufferedReader` has eight methods and two factories (one over a file name, one for standard input). All are natives on `nativeHelpers/fileOps`. Walk carries a value of the trait in the Java class `FortressBufferedReader`, through `FortressBuiltin`'s private native object `JavaBufferedReaderObject`. `FileReadStream`, `Reader`, `stdIn` and `FileWriteStream` are plain Fortress objects, each holding its Java-backed value in a field `under`. `File` and `Reader` are plain components. `uncheckedReadChar` answers -1 at the end by asking `eof`, because `jbrRead` answers 0 there.
- **Conditions:** A missing file raises `FileNotFoundException`, and a read after `consume` raises `IOFailure`. A `catch` sees both on both paths, because a compiled helper's raise builds the prelude's exception (F-336). On the compiled path, this holds for compiled tests that bind the helpers themselves.
- **Consequence:** I/O objects are Fortress code over the two Java-backed traits. A change belongs in the Fortress object or the `fileOps` helper, not in a glue class.
- **Evidence:** `FortressLibrary.fss:1994-2014`; `StaticNativeApp.java:71`; the tests `tests/NativeHelperReaderWalk`, `compiler_tests/NativeHelperFamilyReaderCompiled` and `compiler_tests/FileOpsRaiseCaughtCompiled`; `rung-io-reader/REPORT.md`.
- **Could not resolve:**
  - "carries the trait by its name through ... private native object": I infer from P-164 that the native object extends the trait. How "by its name" works is not explained. Unclear wording.
  - "plain components" against P-164's "native components": the skill does not define a native component. A concept I lack.
  - "the two Java-backed traits": I read these as `JavaBufferedReader` and `JavaBufferedWriter`, from F-330. The entry does not name the second.

### 5. F-333, "The one library's arrays hold their elements in a Java-backed store in a field ..."

- **Established:** `PrimitiveArray` and `PrimImmutableArray` hold a `JavaArrayStore` (declared in `FortressLibrary`) in their field `mem`, and they read elements through `cast[\T\]`. `PrimImmutableRR64Array` holds a `JavaRR64ArrayStore`; it is in the api, but no factory chooses it. `NativeArray` is a plain component. The stores' 7 bindings name `nativeHelpers/arrayOps` helpers over two compiled classes:
  - `FortressArrayStore`, an `Object[]` whose slots the compiled transaction tracks by array and index;
  - `FortressRR64ArrayStore`, a `double[]`.

  Walk's loader answers each `arrayOps` name with its own `ArrayOps$<name>` over `JavaArrayStoreObject` (an `AtomicArray`) or over `JavaRR64ArrayStoreObject` (a `double[]`). It refuses at load a name that has no operation.
- **Conditions:** A second initialisation of an element is ignored by walk's store and by `FortressArrayStore` (row 466). The two RR64 stores instead write it and answer `true`, as the old glue did. `PrimImmutableRR64Array` waits on P-84 and P-85.
- **Consequence:** Under walk, arrays keep walk's `AtomicArray`, so walk's transactions still see array writes. An `arrayOps` name with a typo stops the load.
- **Evidence:** The tests `tests/ArrayStoreWalk`, `ArrayStoreRR64Walk`, `ArrayInitOnceWalk` and `ArrayOpsMisspeltWalk`, and `compiler/runtimeValues/ArrayStoreJUTest`; `rung-array-store/REPORT.md`.
- **Could not resolve:**
  - "NamingCzar's walk-world table": the skill does not name this table. From F-330 and P-164, I infer that it is the checker's foreign-type table used when the checker checks the one library. A concept I lack.
  - "A second initialisation": the skill does not describe array initialisation (an `init` that sets an element once?). A library concept I lack.
  - "ignored in both arrays": which two arrays, `PrimitiveArray` and `PrimImmutableArray`? Unclear wording.
  - "and is in the api": which api? `FortressLibrary`'s or `NativeArray`'s? Unclear wording.
  - "The stores' 7 bindings": the entry does not list them. Not blocking.

### 6. F-334, "The compiled checker orders a call's candidates ... by a linear extension of their partial order ..."

- **Established:** The checker now orders three things by a linear extension of their partial order, comparing each pair once: a call's candidates, a coercion's candidates and a trait's ancestors. `scala_src/useful/PartialOrder.scala` provides `minimal` and `linear`, which `Functionals.scala`, `CoercionOracle.scala` and `Formula.scala` use. A call with 32 or more candidates no longer stops the checker.
- **Conditions:** When several candidates tie as most specific, the checker keeps the first minimal one in the call's order of overloadings. That order depends on the build as well as on the program (row 935). On the one library, the results equal those of the sort this change replaced. The distance stage checks `value object Char` to its end (`#crash none`).
- **Consequence:** Do not rely on which candidate wins a tie: it can change from build to build. The change costs the count stage about 5 to 12 %, which P-148's measure calls small.
- **Evidence:** The tests `compiler_tests/PartialOrderCandidatesCompiled`, `compiler_tests/TieAmongMostSpecificCompiled` and `PartialOrderJUTest`, and the distance stage; the rung's runs of its base and its change; `rung-checker-partial-order/REPORT.md` sections 1, 2, 6 and 8.
- **Could not resolve:**
  - "no call stops it at 32 candidates or more": the entry does not say what used to happen at 32 candidates (a crash, or a refusal?). The reader has to infer the old failure. Unclear wording.
  - "follows the build as well as the program": in what way does the build change the order (hash order, file order)? Unclear wording.
  - "P-148's measure": P-148 is not here. The entry relies on an entry I do not have.

### 7. F-335, "`Thread`'s four methods, `abort` and `printTaskTrace` name helpers of `nativeHelpers/runtime` ..."

- **Established:** The one library binds six names to `nativeHelpers/runtime`'s `threadVal`, `threadWait`, `threadReady`, `threadStop`, `abort` and `printTaskTrace`:
  - `Thread`'s `wait`, `ready` and `stop`;
  - a private `valAny(): Any`, under `val(): T = cast[\T\](valAny())` (P-162's pair);
  - `abort`;
  - `printTaskTrace`.

  Walk's loader maps the six names to walk's own glue through its `OWN_OPERATIONS` table in `NativeApp.java`, so walk's `spawn`, transactions and trace are unchanged.
- **Conditions:** On the compiled path:
  - `abort` throws `TransactionAbortException` inside a transaction and does nothing outside one.
  - `printTaskTrace` prints one line `Task: <class>` for each task, from the current task to the primordial one.
  - `Thread`'s four raise `FailCalled` "spawn is not compiled yet" until `spawn` compiles (row 82).
- **Consequence:** Compiled code cannot use threads yet. Under walk, threads behave as before.
- **Evidence:** The tests `tests/RuntimeOwnOperationsWalk` and `compiler_tests/RuntimeOwnOperationsCompiled`; `rung-runtime-threads/REPORT.md` section 1.
- **Could not resolve:**
  - "P-162's pair": not defined here, but the entry describes it inline. Readable.
  - "P-58's form": P-58 is not here. P-169 describes it as a bare `builtinPrimitive("…")` naming a helper. Readable from the other entries.
  - "Compiled, ...": the compiled path does not read the one library yet. I take this as the helpers' behaviour when compiled code binds them. Slightly unclear wording.

### 8. F-336, "A compiled helper's raise with a message builds the prelude's exception over its `String`."

- **Established:** `Utility.makeFortressException(name, msg)` finds the exception's constructor that takes `fortress.CompilerBuiltin.String` and passes it an `FJavaString`. The `(name, e)` form goes through the same code. So a helper's `FailCalled`, `FileNotFoundException` or `IOFailure` reaches a `catch` on the compiled path.
- **Conditions:** Under walk, a helper's raise still becomes the library's object of the same name, but the message is lost (F-299).
- **Consequence:** A helper may raise these exceptions with a message. A walk program cannot read that message.
- **Evidence:** `compiler/runtimeValues/Utility.java:28-31`; the test `compiler_tests/HelperRaiseMessageCompiled`; `rung-runtime-threads/REPORT.md` section 1.
- **Could not resolve:**
  - "the prelude's exception": here it means the compiler's prelude, but in F-321 "the interpreter's prelude" means the one library. One word, two libraries. The class name settles which is meant. Unclear wording, but not blocking.

### 9. F-337, "The compiled path's class loader loads each helper class of `nativeHelpers/` itself ..."

- **Established:** `InstantiatingClassloader.mustUseSystemLoader` lists `MainWrapper` and no helper class. So the compiled run loads its own copy of each helper class. A static field that the compiled main sets on a helper class is set on a different copy from the one the helper reads.
- **Conditions:** It applies on the compiled path to any helper that reads state set by the run time. `systemOps.getArgs`, and `programArgs.count` and `at`, read `MainWrapper.cachedArgs`, which the compiled main and walk's driver both set.
- **Consequence:** A helper that reads run-time state must keep that state on a class that the loader leaves to the system loader, such as `MainWrapper`. It must not keep it in a static of its own.
- **Evidence:** `runtimeSystem/InstantiatingClassloader.java:2897-2919`. A `bin/fortress run` with the arguments `a b` printed `count =  0` when `programArgs` kept its own static and `count =  2` when it read `MainWrapper.cachedArgs`. The tests are `compiler_tests/NativeHelperProgramArgsPassedCompiled` (count 2 and both arguments) and `compiler_tests/NativeHelperProgramArgsCompiled` (count 0). Detail: `rung-system-natives/REPORT.md`, "The static, and the loader".
- **Could not resolve:** Clear.

### 10. F-54, "The gate classes the distance to the switch-over by root cause."

- **Established:** The `#class` rows of a gate's `distance.txt` count the errors of each class that occurs. Examples are X1 for an export error, BR for a big operator's body, and OT. `tools/distance/classify.py` assigns the classes. At a distance of 0 there are no `#class` rows (`table.py:112`). The newest gate's `distance.txt` shows no crash, so the checker checks `value object Char` and `FortressLibrary` to their ends.
- **Conditions:** The classes exist only while the distance is above 0.
- **Consequence:** Read a non-zero distance by its classes. F-53 gives the newest total.
- **Evidence:** `perf-probes/prelude/distance-triage.md` section 2; `reviews/batch-28-review.md` section 1; F-334, F-233.
- **Could not resolve:**
  - "holds no `#crash` row, '#crash none'": this reads two ways. Either there is no `#crash` row at all, or there is a `#crash` row whose value is `none`, which `compiler.md` says is the form. Unclear wording.
  - "OT for the other body errors, one-off library slips and checker limits": does OT cover all three, or are the slips and limits classes of their own? Unclear wording.

### 11. F-281, "The compiled checker checks the overloading of every operator, symbolic ones included ..."

- **Established:** The overloading checker's three loops (the top-level set, a trait's provided methods, and their overriding return types) admit every operator through `isCheckedName`. The export check also reads every operator, each under its declared name only. With all operators checked, the distance and the count are 0 with no crash. So the distance stage is the full check of F-245.
- **Conditions:** The open rows:
  - An on-demand import adds an api's declarations once and leaves out the names its `except` lists. But the check still reads an on-demand api's declaration of a name that the component imports by name from another api (row 813).
  - An `except` that lists an operator leaves that operator imported, on both paths (row 814).

  Outside its trait, a self type whose `comprises` lists types at a `where`-clause variable is read as the trait type. This is why `AnyList`'s `||` is checked. Such a program still stops in the code generator where a listed generic type gives a member's body (row 812).
- **Consequence:** A new symbolic operator overload in the library is checked like any other. Do not rely on `except` to drop an operator. Use `import A.{...} except { name }` only for identifiers.
- **Evidence:** `OverloadingChecker.scala:766-773`; `TypeAnalyzer.selfComprised`. The tests are `compiler_tests/XXXSymbolicOperatorOverloadUnrelated`, `ComprisesWhereFunctionalMethodChecker`, `XXXComprisesWhereFunctionalMethodBounds`, `OperatorPrefixInfixImport` and `ImportExceptOverload`, plus the two stages ('#total 0', '#crash none'). Detail: `rung-symbolic-check/REPORT.md` sections 1, 3 and 5, and `batch-28-review.md` section 1.
- **Could not resolve:**
  - "each under its declared name only": does it mean an operator is matched by the name it is declared under and not by an alias (such as `DOT` against `·`)? Unclear wording.
  - "a self type whose `comprises` clause lists types at a `where`-clause variable is read as the trait type": "self type" is not defined in the skill. I read it as the type of `self` in a trait like `AnyList comprises List[\E\] where [\E\]`. The sentence is hard to parse. Partly a concept I lack, partly unclear wording.
  - "the full check of F-245": F-245 is not here. The entry relies on an entry I do not have.
  - "on-demand import": the term is not in the skill. From `compiler.md`, "Imports", I read it as `import A.{...}`. Readable.

### 12. F-288, "The fourteen components the distance checks are closed under import ..."

- **Established:** `List` imports `CovariantCollection` and `OneShotFlag` (`List.fss:13`, `:15`). Both are in the distance stage's list, and neither imports anything. So the fourteen components import only one another. Over all fourteen, the checker reads '#total 0' and '#crash none'.
- **Conditions:** `CovariantCollection`'s api states its component's members and headers, and its `upward` takes its target type from its first argument. The export check matches an object's value parameter by type and by its modifiers other than `var`, not by its name (row 839).
- **Consequence:** After the switch-over, `List` compiles only together with both imports. Every `ArrayList` holds `OneShot` fields, and every list comprehension goes through `covariantCompr`. A distance of 0 shows that they type-check, not that they compile: the distance measures the checker, not the code generator.
- **Evidence:** `tools/distance/run.sh:87-90`; `List.fss:253-254` and `:178-179`; the distance stage; the tests `compiler_tests/ExportVarObjectParameter` and `tests/CovariantCollectionArmsWalk.fss`; `rung-list-imports/REPORT.md` sections 1 to 3, and `batch-28-review.md` section 1.
- **Could not resolve:**
  - "its `upward` takes its target type from its first argument": the entry does not say what `upward` is or why this matters for the fact. Unclear wording, and a library concept I lack.
  - "closed under import": I read it as "every component that one of the fourteen imports is also among the fourteen". The prelude's implicit import is presumably excluded. Mostly readable.

### 13. F-32, "The compiled path cannot reuse walk's glue classes, the Java classes that 52 of the one library's 424 live native bindings still name."

- **Established:** A native binding is a body `builtinPrimitive("…")`. Its string names either a glue class, which takes walk's boxed values and runs only under walk, or a `nativeHelpers/` helper, which both paths call. Of the one library's 424 live bindings, 52 still name glue classes: `IntLiteral`'s 21, `FloatLiteral`'s 3 and `Reflect`'s 28. At `a1f8c4b8b`, before any binding moved, the 449 bindings sorted into four groups:
  - 154 needed only a new string;
  - 59 had a helper under another name or signature, 23 of them under a name that the prelude gives to another helper;
  - 158 needed a new helper;
  - 78 needed more: 36 I/O methods and 42 with no compiled analogue.

  The 42 now resolve as follows: `NativeArray`'s 7 name `arrayOps`, the six thread and trace names name `runtime`, `getProgramArgsPrim` is deleted, and `Reflect`'s 28 stay on glue. Of `IntLiteral`'s 29, 8 are now Fortress text.
- **Conditions:** `IntLiteral`'s 21 cannot move: their helpers take the compiled `IntLiteral`, and walk's numerals are `Int`s (P-76; row 578). `Reflect`'s 28 are off microGPT's path. `println` goes through `stdOut`, a Fortress `Writer` over `fileOps` (F-330). `nanoTime` (F-314) and `System`'s `args` (F-337) name helpers.
- **Consequence:** The 52 glue bindings are what still blocks those natives on the compiled path. microGPT's path does not need `Reflect`.
- **Evidence:** F-298, F-299, F-331, F-333, F-335, P-170; `FortressBuiltin.fss:549-629`. Detail: `climb-batch-28/RECORD.md`, "The count of the bindings"; `natives-shape.md` section 2; `CLIMB-BATCH-23.md` section 4.
- **Could not resolve:**
  - "424 live" against "the 449": the entry does not reconcile the old 449 with today's 424. The difference of 25 is unexplained (the 8 that became text, the deleted `getProgramArgsPrim`, the 36 I/O glue bindings replaced by 17 helper bindings?). Unclear wording.
  - "live": what makes a binding live (reachable, not deleted, not in `incomplete/`)? Unclear wording.
  - The entry mixes a historical classification at `a1f8c4b8b` with today's counts. Which numbers hold today is clear only for the 52 and the 424.

### 14. F-299, "Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 372 of the one library's 424 live bindings name one."

- **Established:** Walk's loader (`StaticNativeApp.java`) calls the helper overload whose Java types carry the declared types, with `self` first. It raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. At load it refuses:
  - a string that names no helper;
  - a string whose helper does not fit the declared types;
  - a declared type that no Java type carries, `self`'s included.

  For 15 names it runs walk's own operations and loads no helper: eight through `OWN_OPERATIONS` (`stringOps.typeName`, `equality.sEquiv`, and `runtime`'s six) and `arrayOps`' seven through one rule. Walk carries `self` of the library's own `FlatString` in a Java `String`. It recognises that `FlatString` by its declaring component, so a program's own `FlatString` or `JavaString` carries no `self`. The entry lists the 372 by type, and they sum to 372. The other 52 name glue classes: `IntLiteral` 21, `FloatLiteral` 3, `Reflect` 28.
- **Conditions:** The carriers, messages and departures are in `interpreter.md`, "Natives" (rows 864, 551 and 846).
- **Consequence:** A new native is a helper with carried Java types. Refusals stop the load, so test a binding with a run.
- **Evidence:** The tests `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk` and `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusal tests `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`. Detail is in `RECORD.md` and the four rung reports.
- **Could not resolve:**
  - Counts that conflict with other entries:
    - The list counts "`Float` 62" and "`RR32` 51" among the 372 helper bindings. F-303 says only 57 of `Float`'s 62 name helpers and 5 still name glue classes. F-310 says 50 of `RR32`'s 51 name helpers and one, `^` at a `Float` exponent, still names a glue class.
    - Yet the 52 glue bindings here (21 + 3 + 28) include none of those 6.
    - The sum of 372 works only with 62 and 51.

    So either F-303 and F-310 are stale (F-323 or F-311 may have moved the six), or this list is wrong. I cannot tell which. Unclear: the entries contradict each other.
  - The same problem for `ZZ64` and `ZZ`: this entry says `ZZ64` 31 and `ZZ` 28, and F-306 says `ZZ64`'s 26 and `ZZ`'s 22. The later rungs it cites (F-327, F-331) may explain the gap, but no entry says so.
  - "It builds P-58, 'Every native binding is a ...'": the quote is cut off, so I cannot read what P-58 says. Unclear wording.
  - "15 names": the 7 `arrayOps` and the 6 `runtime` names also count among the 372. That is consistent. I note it only because the title says walk "loads" helpers that it does not load for these 15.

### 15. F-34, "Under the switch-over's setting the code generator refuses 38 declarations of the fourteen components ..."

- **Established:** One measurement on `dbf4825e0`'s code. The setting was the distance stage's: checker failures caught per declaration, and "the bound `Any`". It used `plan-25/probes/codegen.sh`, with the 288 helper strings put back on glue classes. The code generator refused 38 declarations that the checker passes, in 10 kinds, each counted at its first wall. Earlier, before local functions compiled, it refused 47 in 11 kinds.
- **Conditions:**
  - F-315's three kinds and the local-function kind no longer occur.
  - Each remaining kind has a ledger row or a plan line: varargs (row 624), the type assumption (row 818 and F-325), and "Not in the trait table". F-338 fixes that last one for a first supertrait; its root is at `methodsNamed` and in the dispatch generator (rows 940, 942).
  - On `aa5c67d48`, the dispatch generator refused none of `FortressLibrary`'s 178 overload sets.
  - Nobody has measured today's count. No emitted class was run.
- **Consequence:** After the switch-over, the code generator still stands between the library and bytecode. No test checks the 38, because the distance stage runs no code generation.
- **Evidence:** The probe script; `rung-codegen-local-functions` and `rung-codegen-walls` reports, section 5; `zero-audit.md` Part C, item 4; `codegen-distance/REPORT.md` sections 2 to 6.
- **Could not resolve:**
  - "the bound `Any`": which bound? The default bound of an unbounded type parameter, or something else? Unclear wording.
  - "its 288 helper strings put back on their glue classes": why the probe reverts the helpers is not said. Is it because the code generator cannot handle them, or because the probe predates them? Unclear wording.
  - Timing of F-315's kinds: "47 in 11 kinds" becomes "38 in 10 kinds" with the local-function kind gone. But F-315 removes three kinds. Were those three already gone on `dbf4825e0`, or are they among the 10? If they are among the 10, today's count is lower than 38, and the last sentence names only F-325 and F-338. Unclear wording.
  - The title states 38 in the present tense, but the body says the count on today's code is not measured. Unclear wording.
  - "plan line": a line of which plan? Unclear wording.

### 16. F-172, "The specification's integer chapter states the library's integer rules."

- **Established:** The specification states these rules for integers:
  - The `as…` getters keep the value or throw `IntegerOverflow`.
  - `narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits and throw nothing. `narrow` takes `ZZ64` to `ZZ32` and `NN64` to `NN32` by keeping the low 32 bits, so a value that does not fit wraps. `ZZ` has neither `narrow` nor `widen`.
  - `LSHIFT` and `RSHIFT` work on all five integer types. On `ZZ` they are `shift`, which is exact at any count. On a fixed width, `LSHIFT` drops the bits shifted out and throws nothing.
  - `GCD` and `LCM` are nonnegative and throw `IntegerOverflow` when the result does not fit.
  - At a negative exponent, bases 1 and -1 give their exact power, base 0 throws `DivisionByZero`, and any other base throws `IntegerOverflow`.
- **Conditions:** The library follows the power rule under walk. The compiled path's own library does not (F-263).
- **Consequence:** The specification and the one library agree on these rules, so a worker can cite the specification for them.
- **Evidence:** `basic-integers.tex:39-98` and `:562-574`; `opr-overview.tex:262-268`; `rung-spec-integer-rules/decision-record.md` section 2.
- **Could not resolve:** "On a fixed-size type, `LSHIFT` loses the bits": the entry says nothing about `RSHIFT` on a fixed width (arithmetic or logical?). This is a small omission and does not block. Otherwise clear.

### 17. F-327, "The integers' shifts and powers over `AnyIntegral` convert their count or exponent in Fortress and call public bare bindings at narrow headers."

- **Established:** On `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, `LSHIFT`, `RSHIFT` and `^` over `AnyIntegral` (and `ZZ`'s `shift`) are plain Fortress. Each wraps a public bare `builtinPrimitive` binding, declared in the api. The binding takes:
  - a `ZZ32` count on `ZZ32`, `NN32` and `ZZ`;
  - a `ZZ64` count on `ZZ64` and `NN64`;
  - a `ZZ32` exponent.

  Private helpers do the conversion in Fortress: `shiftCount32`, `shiftCount64`, `powerCount32`, `countNN32` and `exponentNN32`. They keep the old glue's saturation of the count and its sign and parity of the exponent. A `ZZ` count is clamped in `ZZ` and then read with `.asZZ32`. Ten helpers are new and five already existed.
- **Conditions:** The 16 bindings count among F-299's 372. A `ZZ32` count or exponent goes straight to the bare binding.
- **Consequence:** P-69 and P-153 hold on both paths at these declarations. Values equal the old glue's.
- **Evidence:** `FortressLibrary.fss:717-762`; `FortressBuiltin.fss:402-428`; the tests `tests/NativeHelperShiftPowerWalk` and `compiler_tests/NativeHelperFamilyShiftPowerCompiled`; `rung-natives-shift-power/REPORT.md`.
- **Could not resolve:**
  - "at narrow headers": I read it as "at headers with narrow (`ZZ32` or `ZZ64`) parameter types". The word collides with the `narrow` function. Unclear wording.
  - "every value of the walk guard is the glue's": the skill does not define "walk guard". I guess it means a guard test under walk that pins the old values. Unclear wording.
  - "P-69 and P-153 hold": neither entry is here, so I cannot say what holds. The entry relies on entries I do not have.
  - "a `ZZ64` count (`ZZ64`, `NN64`) and a `ZZ32` exponent": is the `ZZ32` exponent true for all five types, or only for `ZZ64` and `NN64`? Unclear wording.
  - The entry does not say why there are 16 bindings over 15 helpers. Not blocking.

### 18. F-328, "Walk answers the compiled helpers `stringOps.typeName` and `equality.sEquiv` with its own operations, and its ilk names the five native number objects by their traits."

- **Established:** The one library binds `Object.ilkName` to `stringOps.typeName` and `SEQV` over `Any` to `equality.sEquiv`. Walk's loader maps those two names, before it looks for a helper, to `ObjectPrims$ClassName` and `AnyPrim$SEquiv`, so it never loads the two helpers. `Object.asString` is `self.ilkName`. Walk prints `FortressBuiltin`'s `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`, also inside static arguments, tuples and arrows.
- **Conditions:** All other types keep their own names, including strings, `Char`, `Ratio` and `FloatLiteral`. Walk still instantiates generics at the run-time class (F-74).
- **Consequence:** A program sees trait names, not walk's internal native object names, when it prints a type.
- **Evidence:** `NativeApp.java`, `OWN_OPERATIONS`; the tests `tests/AnyNativesIntrinsicWalk` and `compiler_tests/AnyNativesIntrinsicCompiled`; `rung-any-carrier/REPORT.md`.
- **Could not resolve:**
  - "ilk": the skill does not define it. From the method names, I read it as the printed name of a value's type. A concept I lack, but readable.
  - "walk still instantiates generics at the run-time class (F-74)": the entry does not say what this means for the printed names. For example, does `Box[\Int\]` print as `Box[\ZZ32\]`? Unclear wording.

### 19. F-330, "Walk carries `FortressLibrary`'s `JavaBufferedWriter` in a Java `FortressBufferedWriter` ..."

- **Established:** `JavaBufferedWriter`'s natives are on `fileOps`: its `write`s, `flush` and `close`, and three factories (a file name, standard output, standard error). Walk carries the trait's values in `FortressBufferedWriter`, through `JavaBufferedWriterObject`. `stdOut`, `stdErr`, `Writer` and `BufferedWriter` are plain Fortress objects over it, and so is `FileWriteStream`, a `WriteStream`. The checker's walk-world table reads `FortressBufferedWriter` and `FortressBufferedReader` as the one library's two traits.
- **Conditions:** A missing file raises the library's `FileNotFoundException`, which a `catch` sees.
- **Consequence:** Output goes through Fortress objects over one Java-backed trait. Change it in the Fortress object or the helper.
- **Evidence:** `FortressLibrary.fss:1983-1992`, `:2005-2010`; `StaticNativeApp.java:70`; `NamingCzar.java:492-493`; the tests `tests/NativeHelperWriterWalk` and `compiler_tests/NativeHelperFamilyWriterCompiled`; `rung-io-writer/REPORT.md`.
- **Could not resolve:** "walk-world table" is not in the skill, as in F-333. Otherwise clear.

### 20. F-290, "Outside the twelve, the compiled checker finds 624 component errors in 30 of the library's 40 other components ..."

- **Established:** One measurement on climb batch 22's code. It ran the distance stage's driver over the components outside the twelve, leaving out the compiler's three files and `GeneratorLibrary`. It found 624 component errors in 30 of 40 components, at least 92 api errors in 10 apis (each api counted only up to its first failing stage), and 25 crashes. `Avl.fss` stops at name binding on both paths (row 830) and is not among the 40. microGPT's imports, each checked alone, gave `System` 2, `File` 4, `FileSupport` 24 and `FortressAst` 1.
- **Conditions:** The figures are from that code. Later changes:
  - `System`, checked alone on `ee14222d`, now reads 0 (F-321).
  - `File` has not been measured again since it became a plain component (F-332).
  - `CovariantCollection` (12 errors, 2 crashes) and `OneShotFlag` (1) have been among the distance's fourteen since climb batch 22c, and read 0 there (F-288).
- **Consequence:** The one library outside the fourteen is not clean for the checker. microGPT's imports `FileSupport`, `File` and `FortressAst` may still stop it after the switch-over.
- **Evidence:** No test. `zero-audit.md`, "A.2 Scope".
- **Could not resolve:**
  - The title uses the present tense ("finds 624") and "the twelve" for an old measurement. The distance now covers fourteen, and two of the 40 have since gone to 0. So the 624/92/25 figures are not today's. Unclear wording.
  - "the compiler's three files": I read them as `CompilerLibrary`, `CompilerAlgebra` and `CompilerSystem`, from `library.md`. Readable.
  - "climb batch 22" against "22c": the suffix is not explained.
  - The entry does not say what a worker should do with these numbers. Unclear.

### 21. F-140, "A size beyond `NN32` or `ZZ32` is refused by the compiled checker when it is a literal or folded from literals, and by walk when it binds one ..."

- **Established:** The checker refuses a size outside its kind's range: 0 to 4294967295 for `nat`, and `ZZ32`'s range for `int`. It refuses only a size that is a literal or is folded from literals. Walk refuses an out-of-range size at run time, when it binds the size to a static parameter. Walk computes sizes exactly with no wrap. A size used as a value reads as a `ZZ32` up to 2^31-1 and as a `ZZ64` above that.
- **Conditions:** The open gaps:
  - The compiled class loader checks no size that it computes at instantiation: `next[\nat k\]()` building `Box[\k + 1\]` answers 4294967296 at `k = 4294967295` (row 675, F-222).
  - Under walk, an array of static size from 2^31 to 2^32-1 stops at its store's factory with 'Closure/Constructor for makeJavaArrayStore ... got type Long', which no catch sees (row 527).
  - Row 325's notes: on the compiled path, a `nat` size above `ZZ32`'s range used where a `ZZ32` is needed fails at run time. Neither P-40 nor the specification says where it should be refused. Under walk, a `ZZ32`-declared return passes such a size on as a `ZZ64`.
- **Consequence:** Keep sizes within `NN32` or `ZZ32`. Do not rely on a size computed at instantiation being checked.
- **Evidence:** The test `tests/NatBigSizeWalk`. The refusal tests are `compiler_tests/XXXNatRangeChecker`, `XXXNatArithRangeChecker` and `NatRtBigSize`, and `tests/XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk` and `XXXNatArithSumWalk`. Detail: `rung-size-range/REPORT.md` sections 6 and 12.
- **Could not resolve:**
  - "The checker types such a value `IntLiteral`": "such a value" could mean a size used as a value, or one above 2^31-1. Unclear wording.
  - `IntLiteral`: the skill does not define it, as in F-331.

### 22. F-76, "The compiled checker accepts the specification's `comprises` example of the Meet Rule ..."

- **Established:** The checker accepts the specification's Meet Rule example for `comprises` ("The Meet Rule for Functions") through a coverage check. It uses that check only in overload checking, not in its subtype test. Take a call whose argument's static type is below closed traits and above the types they list. When the most specific declarations tie without coercion, the checker types the call by the intersection of their return types. This builds P-60: declarations below two overloads together serve as their meet if they cover it.
- **Conditions:** The open rows:
  - Coverage refuses a pair when a compared declaration has static parameters (row 546).
  - In an accepted family that has any other generic declaration, such a call takes its first minimal candidate's type, by the build's order (row 935), instead of the intersection (row 543). That scope is "a default".
  - On the compiled path, a method call on an intersection-typed value crashes the code generator (row 540), and a generic instantiated at an intersection dies as it loads (row 559).
  - `comprises` is checked only at immediate subtypes (row 487).
  - The verdict can depend on the components compiled earlier in the same JVM (row 547).
- **Consequence:** Programs can rely on value-level `comprises` coverage in the checker, but not in compiled code that calls methods on the intersection.
- **Evidence:** The tests `compiler_tests/*Comprises*` and `*CoverageReturn*`; `rung-return-type-rule/decision-record.md` sections 3 and 4.
- **Could not resolve:**
  - "That narrower scope than P-60's is a default.": "a default" can mean a default behaviour, or a provisional choice that the curator has not made. F-175 calls the same thing "a deliberate choice". Unclear wording, and it conflicts with F-175.
  - "In an accepted family that has any other generic declaration": other than what? Unclear wording.
  - "closed traits": I read them as traits with a `comprises` clause, from `SKILL.md`. Readable.

### 23. F-132, "Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow` when the result does not fit ..."

- **Established:** Under walk, every arithmetic operation on a fixed-width integer whose result can leave its type raises `IntegerOverflow` when it does, `^`, `CHOOSE` and `LCM` included. A program can catch it. Three kinds raise nothing:
  - the wrapping operators (F-130);
  - the low-bits conversions `narrow`, `widen`, `signed`, `unsigned` and `big` (P-72); the checked `as…` getters do raise (F-331);
  - `LSHIFT` and `RSHIFT`, which drop bits (F-125).
- **Conditions:** Walk only. The compiled path has known gaps:
  - its prelude's ranges raise where their bounds sum beyond `ZZ32` (row 453);
  - its `^` saturates, throws an uncatchable Java exception, or adds (rows 523 to 525);
  - its `CHOOSE` matches walk (F-305).
- **Consequence:** A walk program may rely on overflow raising. A compiled program must not yet rely on it for `^`.
- **Evidence:** The tests `tests/FixedWidthOverflowRungB.fss` and `tests/PowChooseLcmRungE.fss`; `rung-overflow-natives/REPORT.md` section 13, and `rung-size-range/REPORT.md` section 12. It builds P-73.
- **Could not resolve:** "or adds": `^` "adds" in what case? The rows explain it, but the entry alone does not. Unclear wording. Otherwise clear.

### 24. F-35, "The `FortressLibrary` api has 9 declarations with a dead size ..."

- **Established:** A dead size is a size parameter that appears in none of the declaration's parameter types or its return type. Nine api declarations have one:
  - the three one-dimensional `subarray` methods (`nat o`);
  - the two-dimensional `subarray` (`o0`, `o1`);
  - the three-dimensional `subarray` (`o0` to `o2`);
  - the traits `Rank`, `Indexed1`, `Indexed2` and `Indexed3`, whose `nat n` tells `Rank[\1\]` from `Rank[\2\]`.

  The component's `subarray` bodies read their offsets as values. The api declarations check clean, because a size that reaches no type, name or value is not an error (P-40).
- **Conditions:** The export checker compares static-parameter lists by length, name and kind. So a component that leaves out the api's dead size gets "declaration missing". An earlier census found 25 and missed the three-dimensional `subarray`, and the 17 vector and matrix operators have since lost their sizes, which leaves 9.
- **Consequence:** Keep each dead size in both the api and the component. Do not drop it from one side.
- **Evidence:** `FortressLibrary.fsi:1355`; `perf-probes/nat/REPORT.md` sections 2 and 7.
- **Could not resolve:** "a size that reaches no type, name or value": the skill does not say what it means for a size to reach a name, as in P-40. Unclear wording, but not blocking. Otherwise clear.

### 25. F-44, "The compiled checker enforces the multiple instantiation exclusion rule and relies on it, and the one library meets the rule."

- **Established:** The rule: no type extends two different instantiations of one generic trait. The checker enforces it, and two things depend on it:
  - the checker's Return Type Rule: with the rule relaxed alone, a program passes the checker and dies with `IncompatibleClassChangeError` (the probe `ProbeMIEPick`);
  - the team's JVM type mapping, which carries type relations over as Java ones.

  Walk applies no instantiation exclusion and does not count two instantiations as excluding (row 416). The one library meets the rule through its flat number tower (P-43) and three changes of `952892a00`:
  - `TotalComparison` extends `Comparison` and `StandardMinMax[\TotalComparison\]`;
  - `AnyMaybe` extends only `AnyUniqueItem`;
  - `andCondCombine` picks `andRelCond` by `typecase`.
- **Conditions:** Under walk, a program's `p1 ANDCOND p2` of two relational predicates is no longer itself a relational predicate (row 458). F-48 gives the kinds of static argument the rule compares.
- **Consequence:** Do not write a type that extends two instantiations of one generic trait. P-43 keeps the rule. The distance holds no exclusion error.
- **Evidence:** `OverloadingOracle.scala:81-105`; `Papers/Implementation/TypeMapping.tex:125` (read); `FortressLibrary.fsi:122-124`, `:1055`; `FortressLibrary.fss:5082-5090`; `reviews/multiple-instantiation-exclusion.md` sections 1 to 3.
- **Could not resolve:**
  - "relational predicates, conditions built from a relation over a generator, which `filter` fuses": the skill does not describe relational predicates or `filter`'s fusion. A library concept I lack.
  - "the review's section 3": which review is named only in the Detail list. Mildly unclear.

### 26. F-63, "The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract ..."

- **Established:** The `FortressLibrary` api has four repairs:
  - it declares `String`'s `split` and `splitWithOffsets` once, abstract;
  - it redeclares no `zip` in `List`, where the inherited `ZeroIndexed.zip` serves;
  - `Condition.map` (`Condition` is the sequential generator trait, `fsi:1008`) returns `Condition[\G\]`, the type the component gives;
  - it closes `QQ` with `comprises { ... }`, because `QQ`'s one value type `Ratio` is private and an api may leave out a private type only by `...`.
- **Conditions:** The checker refused the earlier forms: the pair declared twice, and `List`'s `zip[\F\](other: List[\F\])`. The `Condition.map` error appeared only under a checker change that did not land. Otherwise it is read from the export check, and no test gates that edit. No api type extends `QQ`, so F-64's refusal does not arise.
- **Consequence:** Keep these forms. They follow the specification's export rules.
- **Evidence:** Measured; `FortressLibrary.fsi:398`; `rung-library-defects/REPORT.md`, "Summary", "Decisions" and "Defects and their homes".
- **Could not resolve:**
  - "The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count": "plain" could mean not abstract. "The same count" could mean the same error count as the kept forms. Both are guesses. Unclear wording.
  - "F-64's refusal": F-64 is not here, but the entry says what it falls on. Readable.

### 27. F-78, "The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds ..."

- **Established:** When nothing at a call fixes a type parameter, the checker instantiates it at the intersection of its upper bounds, never at `BottomType`. Where the call has an expected type, the checker tries four ways in this order:
  1. subtyping without the expected type, kept if the result converts to it;
  2. subtyping with the expected type;
  3. coercion with it;
  4. coercion without it.

  The second way lets an untyped function argument that only the expected type fixes type-check (row 507). An argument of intersection type fixes the parameter at the whole intersection (row 541).
- **Conditions:** P-49 decides the first and third ways. The second and fourth are an agent's choice, from the instance-bound rung's decision record, D4. The compiled run time has no class for an intersection, so such an instance dies as it loads (row 559).
- **Consequence:** Do not expect `Bottom` for an unfixed parameter in the checker. An intersection-typed instance compiles but dies at load.
- **Evidence:** The tests `compiler_tests/InferResultOnly*` and `InferContextKeepsFit`; `rung-instance-bound/REPORT.md` sections 1 and 7, and `decision-record.md` D4; `Functionals.scala:738-742`. It builds P-48 and P-49.
- **Could not resolve:** "an agent's choice": does that mean a later worker may change the second and fourth without asking the curator? The entry implies yes but does not say. Mildly unclear. Otherwise clear.

### 28. F-85, "In the interpreter's library, the rung's repairs of the generator, condition, reduction and nested-generator declarations ... are in forms that the library already uses."

- **Established:** A rung repaired the generator, condition, reduction and nested-generator declarations that the checker refused. It used forms the library already uses:
  - `__bigOperator2`'s fused branch, which runs a nested big operator through `generate2`, casts its result with `cast[\O0\]` (`fss:1581`). This is the library's device for an arm whose type a `typecase` cannot show (F-264). So the checker no longer types the body `OR(I0,O0)` (row 632).
  - Each `Condition` method that calls `cond` writes the result type as a static argument, as in `cond[\Maybe[\G\]\]`.
- **Conditions:** Other work cleared the sites this rung left: F-250 (identity `cast`, typed `embiggen`), F-93 (size and index reads, row 629) and F-144 (reductions without identity, row 628). No site of these declarations is on the distance (F-53).
- **Consequence:** For an arm whose type the checker cannot show, use `cast[\T\]` as the library does. Write `cond`'s static argument.
- **Evidence:** The tests `tests/GeneratorDeclarations.fss` and `tests/NestedReductionFusion.fss`, with the cast gated by the distance stage; `rung-generator-slips/REPORT.md` sections 5 and 8, and `rung-body-arguments/REPORT.md` section 9.
- **Could not resolve:**
  - "the rung's repairs": the entry does not name the rung, except through the Detail path (`rung-generator-slips`). Unclear wording.
  - "`OR(I0,O0)`": the notation is not in the skill. I read it as the union of `I0` and `O0`. A language concept I lack.
  - The tests "run the arm fused", but `library.md` says "no desugaring calls the library's `__bigOperator2`". So how a program reaches the fused branch is unclear to me, unless `__bigOperator` calls it. The entry conflicts with the skill as I read them.
  - The fused-arm cast is also stated in F-285, so the same fact appears in two entries.

### 29. F-175, "The specification reads a `comprises` clause at the level of values in every passage."

- **Established:** Every passage of the specification now reads `comprises` at the level of values, and Appendix I has an entry that records the change. A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where no declaration has static parameters, the call's type is the intersection of the most specific declarations' return types.
- **Conditions:** Appendix I names five places where the compiled path departs:
  - `comprises` is checked at immediate subtypes only (row 487);
  - the code generator crashes on a method call on an intersection-typed result (row 540);
  - with static parameters in the overload set, the checker types the call by one of its most specific declarations, "a deliberate choice" (row 543);
  - the Meet Rule example is refused when declarations have static parameters (row 546);
  - the verdict depends on the components compiled earlier (row 547).
- **Consequence:** Cite the specification for value-level `comprises`. The departures are the compiled path's.
- **Evidence:** `Specification/appendices/changes.tex:3323-3519`, `:1616-1619`, `:3589-3596`; `rung-spec-overloading/decision-record.md` sections 8 and 9. It builds P-60.
- **Could not resolve:**
  - "stands between two closed traits": "between two" reads differently from F-76's "below closed traits and above the types that they list". Between a closed trait and its listed types, or between two closed traits? Unclear wording.
  - "a deliberate choice" against F-76's "a default", for the same row 543: the entries conflict.

### 30. F-180, "`import java` is wired on walk through `ForeignComponentWrapper` and `ClosureMaker`, but four gaps stop it and no test uses it."

- **Established:** Walk's `import java` is wired but stopped by four gaps. The tree once had five. In a probe, six Java patches closed all five (two of them for gap 4), and a component with two `import java` bindings then printed under walk what the compiled path prints. Gap 1, the type table, is now closed on the tree. Walk's three-argument `NamingCzar.fortressTypeForForeignJavaType` reads Java types as the one library's, so a component with one such import now stops at gap 3, 'Non-top-level reference to imported …' (row 845). P-58 took another way, `builtinPrimitive` helper bindings. Both of its halves are built (F-298, F-299).
- **Conditions:** Two findings apply to any binding both paths share:
  - A helper raises by naming a compiled prelude class, such as `CompilerBuiltin$IntegerOverflow`. Walk's `builtinPrimitive` loader translates the raise (F-299). Through a written `import java`, walk ends with `FortressImplementationError` unless the gap-5 patch is applied.
  - By reading, a helper whose parameters or results are compiled-path classes (`FZZ32Vector`, `CompilerBuiltin$IntLiteral`) cannot take walk's values. `javap` shows 50 such parameters or results in the helper classes. The probe's closure converts only Java numbers, booleans, strings and `BigInteger`, and walk's loader refuses such a binding at load.
- **Consequence:** Do not use `import java` under walk. Bind natives with `builtinPrimitive`, and keep helper signatures to Java types that walk carries.
- **Evidence:** No test. `natives-shape.md` section 1; `natives-binding-probe.md` section 1; `rung-natives-compiled/SKEPTIC.md`; `GraphRepository.java:957`; `NamingCzar.java:371-374`.
- **Could not resolve:**
  - Gaps 2, 4 and 5 are named only by number, and gap 3 only by its message. A reader cannot tell what gaps 2 and 4 are. Unclear wording.
  - "`gap5-helper-raise.patch`": the entry gives no path for the patch. Unclear wording.
  - "in walk's world": not defined in the skill, like "walk-world table". I read it as "when the repository is walk's". Readable.

### 31. F-255, "The compiled checker reads conditional extension in its subtype relation ..."

- **Established:** A trait or object can extend a type under a `where` clause that binds no variable and holds only trait constraints. The checker makes it a subtype of that type exactly where the constraints hold. With the constraints holding, it checks the `extends` entry itself, an object's value parameters and every member. Without them, it checks the static parameters, the declaration's own `where` clause, its `excludes` and `comprises` clauses and its other `extends` entries. The disambiguator drops `throws` clauses and contracts of traits and objects, so these go unchecked (row 781). A clause that binds a variable or holds a non-trait constraint is read as before: a parent at every instance.
- **Conditions:** The limits:
  - A member checked under the condition is callable where the condition fails (row 773).
  - Walk and the compiled run time read the extension at every instance (row 774).
  - Other readers of the clause in the checker ignore the condition. `TypeAnalyzer.ancestors` sees a conditional parent at no instance, and the overloading checker reads it to let a concrete method implement an abstract one. `TypeAnalyzer.excludesClause` sees the clause at every instance. Neither moved a result on the library, and no ledger row holds them.
- **Consequence:** `List` extends `LexicographicOrder[\List[\E\],E\]` only where `E extends StandardTotalOrder[\E\]`. Its `ZeroIndexed[\E\]` entry and its element-wise `opr =` stand outside the condition, so every list has them. This change cleared one distance site on climb batch 17's gate and added none.
- **Evidence:** `List.fss:106-107`, `:124-128`. The tests are `compiler_tests/CondExtendChecker`, the six `XXXCondExtend*Checker` tests and `CondExtendInheritedMember`, and `tests/XXXConditionalExtensionTypeTestWalk`. Detail: `rung-checker-conditional-extension/REPORT.md` sections 1, 6 and 10.
- **Could not resolve:**
  - "trait constraints": I read them as constraints of the form `T extends SomeTrait`. The skill does not name them. A concept I lack, though inferable.
  - "a `where` clause that binds no variable": readable from `compiler.md`'s `where [\nat n\]` example.
  - Otherwise clear.

### 32. F-268, "The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`."

- **Established:** For `Any` as an `extends` static argument, the code generator emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY`. For `Holder[\(Any, ZZ32)\]` it crashes with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889).
- **Conditions:** Only a tuple that holds `Any` crashes.
- **Consequence:** Do not compile a type that extends a generic at a tuple holding `Any`.
- **Evidence:** `CodeGen.java:6124-6129`; the tests `compiler_tests/ExtendsGenericAtAnyCompiled.test` and `XXXExtendsGenericAtTupleOfAny.test`; `rung-codegen-walls/REPORT.md` sections 1 and 5.
- **Could not resolve:** Clear. F-315 calls the same case "still refused", while this entry and `compiler.md` say "crashes". The wording differs across the two entries.

### 33. F-276, "String's four concatenation families are three top-level operators each, as juxtaposition's are ..."

- **Established:** `||`, `|||`, `//` and `///` are each declared three times at the top level: at `(Any, String)`, `(String, String)` and `(String, Any)`. The `(String, String)` `||` reaches `FlatString`'s and `Concatenable`'s own `||` by `typecase`, so under walk `"ab" || "cd"` stays a `FlatString` of depth 0. On climb batch 21's base, the change plus a list of known fixes lowered the full check from 191 to 137: the 54 known-fix errors of F-245 went, and none came. The stock count stayed 3 and the distance 5. The known fixes:
  - `EmptyString`'s meet;
  - `Integral`'s and `ZZ`'s `=`;
  - `String`'s api header extending `DelegatedIndexed`;
  - `Maybe`'s `|self|` and subscript meets;
  - `Float`'s `|self| : RR64` and `^` meet;
  - the api's six vector and matrix `+` and `-` "out".
- **Conditions:** Under walk, a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` needs `excludes { String }` or the meet. Walk refuses it only when it analyses the library afresh (row 342).
- **Consequence:** A program that adds a functional concatenation operator must exclude `String` or give the meet. Test it with a cold cache.
- **Evidence:** `FortressLibrary.fsi:2662-2681`; `String.fsi:17-19`, `:29-31`. The tests are `tests/StringConcatenationFamiliesWalk.fss`, `tests/XXXFunctionalMethodMeetOperator.fss` and the distance stage. Detail: `rung-symbolic-library/REPORT.md` sections 1, 3 and 4.
- **Could not resolve:**
  - "the full check of symbolic operators", "known-fix errors", "the stock count": none of the three is defined in the skill, and F-245 is not here. "Stock count" could be the count stage without the symbolic check, or the count on the unchanged library. Unclear wording.
  - "which String's api states": does the api state the `typecase`, or that the two types have their own `||`? Unclear wording.
  - "the api's six vector and matrix `+` and `-` out": "out" probably means removed from the api. Unclear wording.
  - The 191/137/3/5 numbers are on an old base, so the entry's present relevance is only the operator form and the walk rule.

### 34. F-279, "Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, except a shifted `Array2`."

- **Established:** `Array2.subarray` and `Array3.subarray` pass their 0-based views the offset minus the base, and `Array3`'s `[:]` passes its base, as `Array1` does. So slicing an array with a non-zero lower bound works. `SubArray2`'s own `subarray` subtracts the output base instead of its own (row 808). So a slice of a shifted `Array2` reads the wrong elements. A shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`.
- **Conditions:** Walk only.
- **Consequence:** Do not slice or shift a shifted `Array2` under walk.
- **Evidence:** `FortressLibrary.fss:2910`, `:3312`, `:3291`, `:2622`, `:2994`; the tests `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase` and `XXXArray2ShiftedSlice`; `rung-slices-list-equality/REPORT.md` sections 1 and 5.
- **Could not resolve:**
  - "shifted `Array2`", "a shift of a slice": the skill does not describe a shift operation on arrays (a method `shift`? a re-based view?). A library concept I lack.
  - "based above zero": I read it as a lower index bound above 0. Readable.
  - How a slice of a shifted `Array2` ends up in `SubArray2.subarray` is not explained. Is a shifted `Array2` a `SubArray2`? Unclear wording.

### 35. F-285, "The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension ..."

- **Established:** In the twelve components the distance checks, the library writes the static argument in two places: every big-operator clause form whose operator's bound names its own parameter, and every list comprehension. This is P-78's workaround for row 731. Examples are `BIG MIN[\ZZ32\]` in `String`'s `upto` and `beyond`, `<|[\E\] ... |>` in `List`'s range subscript, the `SUM[\T\]` and `SUM[\ZZ32\]` sites, and the team's `transpose`. Two kinds of clause form are left unwritten: plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, and `BIG LEXICO`, which has no static parameter. `__bigOperator2`'s fused arm uses the cast device (F-264), as `__builtinFactory1`'s `N[\0\]` arm does.
- **Conditions:** The distance holds no site of rows 731 and 632. Row 731's checker gap stays open for user programs and the team's demos. Under walk, the written comprehension makes `List`'s strided subscript answer a `List[\E\]`, not a list of its elements' run-time class. `PureList`'s does not yet (row 824).
- **Consequence:** In library code, write the static argument for every big operator whose bound names its own parameter, and for every comprehension.
- **Evidence:** `FortressLibrary.fss:4576`, `:4582`, `:2715`, `:3101`, `:3106`, `:4760`, `:4776`, `:1581`, `:2735`; `List.fss:151`, `:504`; `PureList.fss:73`. The tests are the distance stage, `tests/WrittenReductionArgumentsWalk`, `tests/NestedReductionFusion` and `tests/XXXPureListStridedSubscriptWalk`. Detail: `rung-body-arguments/REPORT.md` sections 3, 5, 7 and 9.
- **Could not resolve:**
  - "clause form": the skill does not define it. I read it as a big operator or comprehension written with generator clauses in brackets. Unclear wording.
  - "in the twelve components the distance checks": the distance checks fourteen (F-53, F-288). Does the claim cover `CovariantCollection` and `OneShotFlag`? Unclear wording; it reads as stale.
  - "whose big operator's bound names its parameter": readable from `SKILL.md` ("one whose bound names the parameter itself").

### 36. F-286, "The api's `String` writes `abstract` on every member that its component's trait leaves without a body, and every string object defines them."

- **Established:** `FortressLibrary.fsi:2583-2658` writes 14 of `String`'s members `abstract`, and the component's trait declares all 14 without a body. The 14: `size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `asDebugStringIndented`, `get`, `uncheckedSubstring`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`, `opr ||(self, c:Char)` and `writeOn`. `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14. `String`'s `excludes` is `{ Number, Char, AnyMultiplicativeRing }` in both files. `AnyList` states its own exclusion of `String`.
- **Conditions:** `String` has no entry in the `FortressLibrary` export error (F-282). `CatString`'s `rangeContains` answers what its flat halves answer, so it has row 607's miss.
- **Consequence:** A new bodiless `String` member must be written `abstract` in the api and defined in all four string objects.
- **Evidence:** `FortressLibrary.fss:4507-4643`; `List.fsi:55`; the test `tests/StringMembersPromisedWalk.fss` and the distance stage's per-site list; `rung-string-members/REPORT.md` sections 1, 2 and 5.
- **Could not resolve:**
  - "each define all 14 under walk": does "under walk" mean the definitions are checked only under walk, or only that they run there? Unclear wording.
  - "row 607's miss": what does `rangeContains` miss? Not stated. Unclear wording, but not blocking.

### 37. F-302, "In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default ..."

- **Established:** At JDK 25's default `MaxInlineLevel=15`, C2 inlines a frame at depth d when d is at most 16. The prelude's `+` reaches `Object.<init>` under its result's box at depth 12, and a top-level binding at depth 10. With the limit lowered to 8, a loop of two nested helper calls went from 33 to 96 bytes per iteration, because the temporaries' constructor chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. By reading, the one library's `ZZ32` springboard chain is two classes longer than the prelude's: `ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any`, against `ZZ32`, `Number`, `Object`, `Any`. That is because a springboard extends the springboard of its trait's first `extends` entry.
- **Conditions:** It was observed once (F-301). If `FZZ32` extends the one library's springboard after the switch-over, the margin falls to 2 frames. This is not measured.
- **Consequence:** After the switch-over, deep call chains may stop removing boxes. Watch the `ZZ32` chain's length.
- **Evidence:** `FortressLibrary.fss:763`, `:661`, `:380`, `:356`; `CompilerBuiltin.fsi:210`; `CodeGen.java:5401-5408`; `perf-probes/helper-calls/REPORT.md` sections 3 and 4.
- **Could not resolve:**
  - "In those loops": the entry opens on a dangling reference. Which loops? Presumably F-301's, but the entry does not say so until its last words. Unclear wording, and it blocks the first reading.
  - "C2 inlines down to depth 12 ..., against the 16 at which it stops": the title makes depth 12 sound like a limit. The body shows it is the depth the chain reaches, which leaves a margin of 4. Unclear wording.
  - "springboard": the skill does not define it. From the context, I read it as a class that the code generator emits for a trait's default methods. A compiled-path concept I lack.
  - "bytes per iteration": allocated bytes, I assume. Not stated.
  - "`MaxInlineLevel=15` ... d is at most 16": the off-by-one is stated but not explained. Not blocking.

### 38. F-303, "Walk carries a declared `Float` in a Java `double`, as it carries `RR64` ..."

- **Established:** Walk's `javaFor` names `Float` beside `RR64`, so a helper binding with a `Float` parameter or result now loads. Before, walk refused it: 'no Java type carries the declared type of parameter a.' 57 of `Float`'s 62 bindings, plus the top-level `fromRawBits`, name `simpleDoubleArith` helpers, and they give the old glue's values. 30 use existing helpers, 27 use new one-line helpers, and `fromRawBits` uses a 28th. The other 5 still name glue classes: `^` at `RR32` and at `AnyIntegral`, `atan2`, and the floor and ceiling brackets.
- **Conditions:** Walk carries `Float` in a `double`.
- **Consequence:** Bind a `Float` native over a `double` helper.
- **Evidence:** `StaticNativeApp.java:64`; `FortressBuiltin.fss:61-206`, `:163-201`; `FortressLibrary.fss:4701`; `simpleDoubleArith.java:136-246`. The tests are `tests/NativeHelperFloatCarriedWalk.fss`, `NativeHelperFamilyFloatWalk.fss`, `NativeHelperFamilyFloatBitsWalk.fss` and the two `compiler_tests/NativeHelperFamilyFloat*Compiled`. Detail: the `rung-natives-float` and `rung-natives-float-bits` reports.
- **Could not resolve:**
  - "Its other 5 ... still name glue classes": this conflicts with F-299 and F-32. F-299 counts "`Float` 62" among the 372 helper bindings. F-32 and F-299 list the 52 glue bindings without these 5. I cannot tell which entry is current. Unclear: the entries contradict each other.

### 39. F-304, "On the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings, not one ..."

- **Established:** `CodeGen.forFloatLiteralExpr` computes `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)`. So a compiled numeral of 16 or 17 significant digits can land on a neighbouring double: compiled `0.9999999999999999` is 1.0. Walk uses `Double.valueOf` on the text and rounds once. The specification asks for "at most one floating-point rounding error".
- **Conditions:** Compiled path only (row 862).
- **Consequence:** A compiled test should compare such a double by its string, or use a numeral with a zero integer part and at most 15 digits after the point.
- **Evidence:** `CodeGen.java:2035-2045`; `literals.tex:187-190`; the test `compiler_tests/XXXFloatNumeralOneRounding`; `rung-natives-float/REPORT.md`, "Defects, each with its home".
- **Could not resolve:**
  - "A compiled test compares such a double by its string": is this a rule a test must follow, or a description of what existing tests do? And whose string is compared? If the double itself is off, its printed string is off too. Unclear wording.

### 40. F-305, "`CHOOSE` on `ZZ32` and `ZZ64` names its helper on both paths ..."

- **Established:** Trait `ZZ32`'s and trait `ZZ64`'s `CHOOSE` name `simpleIntArith.intOverflowingChoose` and `simpleLongArith.longOverflowingChoose`, which the compiler's prelude binds too. The compiled `NN32` `CHOOSE` goes through the `ZZ64` helper. The one library's `NN32` binding names `unsignedIntOverflowingChoose` through the `NN32` transfer. Past their safe-bound tables, the helpers raise `IntegerOverflow`, starting at `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`. Each slow-path call has its own scratch array, so parallel calls no longer corrupt each other.
- **Conditions:** Swept against the exact value: 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs.
- **Consequence:** `CHOOSE` is exact or raises, on both paths, and it is safe in parallel.
- **Evidence:** `FortressLibrary.fss:833`, `:944`; `simpleIntArith.java:222-225`, `:174-175`; `simpleLongArith.java:200-203`, `:153-154`. The tests are `tests/ChooseHelperWalk.fss`, `ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `ChooseHelperZZ64Compiled` and `ChooseTableCompiledRungE`, with the guard tests `tests/ChooseZZ32Walk.fss` and `ChooseZZ64Walk.fss`. Detail: `rung-natives-choose/REPORT.md` sections 1, 2 and 5. It builds P-73 and F-313.
- **Could not resolve:**
  - "Past their safe-bound tables every coefficient overflows": read literally this is false (`100 CHOOSE 1` fits). Maybe it means every coefficient that the tables do not cover. Unclear wording.
  - "Swept against the exact value, ... give walk's glue arithmetic": did the helpers match the exact values, the old glue's values, or both (so the glue was exact)? Unclear wording.

### 41. F-306, "Under walk, trait `ZZ64`'s 26 and trait `ZZ`'s 22 native bindings name helpers of `nativeHelpers/` ..."

- **Established:** Trait `ZZ64`'s 26 and trait `ZZ`'s 22 bindings, 48 in all, name helpers and give the old glue's values. They name 29 helpers that the compiler's prelude binds for the same operations, plus 11 new ones: four for `REM` and `MOD` (F-312), and seven for the divisors, `ZZ`'s `CHOOSE` and `cmp` (F-314). `ZZ64`'s four wrapping bindings name the prelude's wrapping helpers, which the prelude binds under its `BOX` spellings (row 348). `DIV`, `REM` and `MOD` by zero raise the library's `DivisionByZero` under walk (F-24, F-312).
- **Conditions:** A `ZZ` helper takes only a `BigNum`, because walk unboxes a `BigInteger` with `getBigInteger`. Walk's coercions convert any other integer operand first.
- **Consequence:** These natives behave as before under walk, and division by zero is catchable.
- **Evidence:** `FortressLibrary.fss:867-976`, `:1082-1190`. The tests are `tests/NativeHelperFamilyIntegersWalk.fss`, `ZZ64DivisionByZeroWalk.fss`, `ZZDivisionByZeroWalk.fss` and `compiler_tests/NativeHelperFamilyIntegersCompiled`. Detail: `rung-natives-integers/REPORT.md`.
- **Could not resolve:**
  - The counts "26" and "22" conflict with F-299's "`ZZ64` 31 and `ZZ` 28". They may be counts as of this rung, before F-327 and F-331 added bindings. The entry states them as present. Unclear: the entries contradict each other.
  - "the divisors": the skill does not say which operations these are (`GCD`, `LCM`, a divides test?). Unclear wording.
  - "its `BOX` spellings": the skill does not define it. I guess it is the prelude's names for the wrapping operators. Unclear wording.

### 42. F-307, "The small rest's eight native bindings name their helpers of `nativeHelpers/` ..."

- **Established:** Eight bindings name helpers, and walk's values are unchanged:
  - `Long`'s and `BigNum`'s `asString` and `asExprString`;
  - `NN32`'s and `NN64`'s `signed`;
  - `Char`'s `codePoint`;
  - the top-level `char`.

  The four over `NN32`, `NN64` and `Char` name the transfer helpers that the checker reads at those types.
- **Conditions:** `signed` above the signed half wraps, as a low-bits name does (F-331). `char` accepts a code point outside 0 to 1114111, as the glue did (row 857).
- **Consequence:** None beyond the values. Do not rely on `char` to reject an invalid code point.
- **Evidence:** `FortressBuiltin.fss:392`, `:394`, `:529`, `:632`, `:634`, `:682`; `FortressLibrary.fss:1073`, `:4706`; `NamingCzar.java:375-386`; the tests `tests/NativeHelperFamilySmallWalk.fss` and `compiler_tests/NativeHelperFamilySmallCompiled`; `rung-natives-small/REPORT.md`.
- **Could not resolve:**
  - "The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` on helpers ...": this sentence is not about the eight, and the entry does not say why it is here. F-299 counts these two in the string family. Unclear wording, but not blocking.

### 43. F-310, "50 of value object `RR32`'s 51 native bindings name helpers ..."

- **Established:** 49 of `RR32`'s bindings name 46 `simpleFloatArith` helpers over a Java `float`. `asString` and `asExprString` share `floatToString`, and `DOT`, `TIMES` and juxtaposition share `floatMul`. Walk carries `RR32` in a `float`, and the checker reads a `float` as `RR32`, so each binding fits as a bare string. The distance stage checks them. The 50th, `asFloat`, names `simpleDoubleArith.floatToDouble` (F-311). The 51st, `^` at a `Float` exponent, still names a glue class. No file of the compiler's prelude imports `simpleFloatArith`.
- **Conditions:** Values equal the old glue's under walk.
- **Consequence:** `RR32` natives are helpers. The compiled prelude does not use them yet.
- **Evidence:** `StaticNativeApp.java:65`; the tests `tests/NativeHelperFamilyRR32Walk.fss` and `compiler_tests/NativeHelperFamilyRR32Compiled`; `rung-natives-rr32/REPORT.md`.
- **Could not resolve:**
  - "The 51st ... still names a glue class": this conflicts with F-299, which counts "`RR32` 51" among the 372 helper bindings, and with F-299 and F-32, whose 52 glue bindings do not include it. Unclear: the entries contradict each other.

### 44. F-312, "`REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` name helpers ..."

- **Established:** Ten bindings, a `REM` and a `MOD` on each of the five types, name `intRem`, `intMod`, `longRem`, `longMod`, `unsignedIntRem`, `unsignedIntMod`, `unsignedLongRem`, `unsignedLongMod`, and `rem` and `mod` of `simpleArbitraryPrecisionArith`. The unsigned ones go through F-308's transfers. `REM` is the remainder of truncating division. `MOD` is the remainder of floor division and takes the divisor's sign. On the natural numbers, `MOD` equals `REM`. Each raises `CompilerBuiltin$DivisionByZero` at a zero divisor, which walk raises as the library's `DivisionByZero` (F-24).
- **Conditions:** On both paths. 626 printed pairs equal the old code's.
- **Consequence:** A remainder by zero is catchable on both paths.
- **Evidence:** `FortressLibrary.fss:825-828`, `:936-939`, `:1041-1044`, `:1158-1161`; `FortressBuiltin.fss:497-500`. The tests are `tests/ZZ32RemainderByZeroWalk`, `ZZ64RemainderByZeroWalk`, `NN32RemainderByZeroWalk`, `NN64RemainderByZeroWalk`, `ZZRemainderByZeroWalk` and `NativeHelperFamilyRemainderWalk`, and `compiler_tests/NativeHelperFamilyRemainderCompiled`. Detail: `rung-natives-remainders/REPORT.md`.
- **Could not resolve:** Clear.

### 45. F-315, "The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`."

- **Established:** The code generator now compiles three things it used to refuse:
  - a type that extends a generic trait at `Any`;
  - a `try` with `forbid`: a listed exception that no `catch` takes is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor;
  - a function or method declared `test`.

  The guard of modifiers, which functions and methods share, admits `test`. A method declared `test` compiled and ran in one probe.
- **Conditions:** `finally` does not run after such an escape (row 890). Still refused: `Bottom`, `Self` or an abbreviated type as that static argument, a tuple holding `Any` (row 889), and `override` (row 650). The library's `test stringifyChars` stops next at a varargs call (row 624).
- **Consequence:** Do not rely on `finally` after an exception escapes. F-34 lists what the code generator still refuses in the library.
- **Evidence:** `CodeGen.java:2988-2990` (read). The tests are `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test` and `XXXFinallyOnEscape.test`. Detail: `rung-codegen-walls/REPORT.md` sections 1, 2 and 5; `reviews/batch-25-review.md` items 3 and 4.
- **Could not resolve:**
  - "a method declared `test` compiled and ran in one probe, and no test gates it", yet `TestModifierCompiled.test` is listed. I read it as gating only a function declared `test`. Unclear wording.
  - "a tuple that holds `Any` (row 889) ... are still refused": F-268 and `compiler.md` say the code generator crashes there, not refuses. Unclear wording.

### 46. P-164, "The five I/O objects become plain Fortress objects, each over a Java-backed value in a field ..."

- **Decided:** `FortressLibrary` declares two traits, `JavaBufferedWriter` and `JavaBufferedReader`, with the compiler prelude's names and methods. Each method is a public bare native binding on a `nativeHelpers/fileOps` helper: 17 bindings, 14 on existing helpers and 3 on new ones (for standard output, standard error and standard input). There are factories over a file name and for each standard stream. `Writer`, `BufferedWriter`, `FileWriteStream`, `FileReadStream` and `Reader` stop being native components. Each becomes a plain Fortress object that holds its Java-backed value in a field, as the team's `BirdyLib` `FileReadStream` does. `stdOut` stays a `Writer`, in UTF-8. The 36 glue bindings go.
- **Applies:** To these five objects and the two traits. P-162's pair pattern stays for natives that no bare helper reaches. No model line changes.
- **Requires:**
  - Walk's loader carries the two traits by name as `FortressBufferedWriter` and `FortressBufferedReader`, through a private native object below each trait.
  - The checker's walk-world foreign-type table in `NamingCzar.java` holds the two entries, because the checker reads the whole helper class (F-321).
  - At the switch-over, the run-time classes `FJavaBufferedWriter` and `FJavaBufferedReader` implement the one library's traits, and the boxed-type table's two entries and `fileOps`' raise strings name the one library's types.
- **Unfinished:** The switch-over half: the run-time classes implementing the one library's traits, and the boxed-type table and raise strings renamed. The walk half and the checker table are built (F-330, F-332).
- **Could not resolve:**
  - "native components": the skill does not define it. A concept I lack.
  - "the boxed-type table": which table, and in which file? Unclear wording.
  - "the other ways leave the compiled half undesigned, decide nothing, or cost a third rung and split the standard output": the alternatives are not named, so the rationale is hard to weigh. This does not block applying the decision.
  - "P-162's pair pattern": readable from F-335 (a native at `Any` under a typed wrapper with `cast`).

### 47. P-167, "The three natives over `Any`: `ilkName` and `SEQV` name the compiled path's helpers, which walk's loader answers with its own operations ..."

- **Decided:** `ilkName` and `SEQV` keep P-58's bare `builtinPrimitive("…")` form, naming `stringOps.typeName` and `equality.sEquiv`. The compiled path runs the helpers, and each helper's answer is the operation's definition. Walk's loader holds a table of eight names, which includes these two, and answers each with walk's own operation, like an intrinsic in a virtual machine. No implementation is shared, and one test on both paths keeps the two halves together. `Object`'s `asString` becomes `self.ilkName`. The ilk is the trait's name on both paths (`ZZ32`, never `Int`).
- **Applies:** To these two names, where P-58's walk half (walk loads the named helper) bends. P-169 extends the device to 45 more bindings. What `SEQV` answers is P-168.
- **Requires:** Do not share code between walk's operation and the helper. Keep a test that runs on both paths. Do not let walk's native object names appear as types a program sees.
- **Unfinished:** The compiled stack overflow of row 321 goes away only once the compiled path reads the one library. The walk side is built (F-328).
- **Could not resolve:**
  - "P-91's rule": P-91 is not here, beyond "as text". The entry relies on an entry I do not have.
  - "The three natives over `Any`": `asString` is the third, though the decision removes its native. Readable.
  - "options (c) and (e1)": named only in the Detail. Not blocking.

### 48. P-169, "The runtime's own 45 native bindings ... name compiled helpers that walk's loader answers with walk's own operations, P-167's device, in three compiled shapes."

- **Decided:** 45 bindings keep P-58's bare form, naming helpers the compiled path runs. Walk's loader answers the names with walk's glue, so walk keeps its `AtomicArray`, its `spawn` and its numerals. The three groups:
  - **Arrays, 7:** the compiled half uses P-164's device: a store trait in `FortressLibrary`, with bindings on a new `nativeHelpers/arrayOps` over a compiled element-holding class. `PrimitiveArray` and `PrimImmutableArray` leave the native component and hold the store in a field. Walk's native object below the trait holds an `AtomicArray`. `PrimImmutableRR64Array`'s two bindings use a compiled `double[]` class that no factory chooses until array decision A (P-84, P-85). The compiled store is an `Object[]`, tracked by array and index (`TXReadSlot`, `TXWriteSlot`). P-84 stores every number type's array unboxed, so a compiled `atomic` write into any array needs this keying, and an array of objects keeps one box per element.
  - **Threads, `abort` and the task trace, 6:** helpers over the compiled run time. `Thread`'s four raise until `spawn` compiles (row 82).
  - **Numerals, 32:** `IntLiteral`'s 8 conversions and comparisons become Fortress text (F-331). The other 24 (`IntLiteral` 21, `FloatLiteral` 3) will name helpers that compute, not the prelude's raising stubs (row 318), at the names batch, after a reading review designs their carrier. Walk answers them by one rule per helper class, still refusing a misspelt name.
- **Applies:** To these 45 bindings. A test on both paths holds the halves together where both run. `IntLiteral`'s 21 keep only walk's load check (P-76).
- **Requires:** Keep walk's array store inside walk's transactions; do not use an `Object` carrier. Key compiled transactional array access by array and index.
- **Unfinished:**
  - The numerals' 24 (the names batch, and the carrier design before it);
  - array decision A, for the RR64 factory;
  - `spawn` in the code generator.

  The arrays (F-333), the threads (F-335) and `IntLiteral`'s 8 (F-331) are built.
- **Could not resolve:**
  - "the runtime's own 45 native bindings ... name compiled helpers": 8 of the 45 (`IntLiteral`'s conversions) become Fortress text and name no helper. So the title's claim does not hold for all 45. Unclear wording.
  - "array decision A", "the names batch", "a reading review": none of the three is defined in the skill or here. Unclear wording, and I cannot tell when the unfinished parts are due.
  - "in three compiled shapes": I read them as the store-trait shape, the runtime-helper shape and the numeral shape. Mostly readable.

### 49. P-170, "`System`'s `args` is built in Fortress, by the library's immutable-array factory over two scalar helpers ..."

- **Decided:** `System`'s `args` is built in Fortress by the library's immutable-array factory over two scalar helpers: the number of arguments and the i-th argument. `getProgramArgsPrim` and `getProgramArgs` are deleted. The helpers live in a class other than `systemOps` (F-321) and read one static that walk's driver and the compiled `MainWrapper` both fill (F-337). `args` keeps the team's type, `ImmutableArray[\String,ZZ32\]`.
- **Applies:** To `System` only. Its api declares only `args`, so the api does not change.
- **Requires:** Do not bind `systemOps`. Keep the argument state on `MainWrapper`, which the loader delegates.
- **Unfinished:** On the compiled path, `args` needs the arrays' compiled store (P-169). The walk side is built (F-337).
- **Could not resolve:**
  - "On the compiled path, `args` needs the arrays' compiled store": F-333 says the compiled store classes exist. Is anything still missing, or is this only the switch-over? Unclear wording.

### 50. P-161, "The integer conversions: checked `as…` getters that raise `IntegerOverflow` on every integer type, `bitsAs…` getters for the bit pattern ..."

- **Decided:** On each of `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, the getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` raise `IntegerOverflow` when the value does not fit. Of the 25, 5 are identities, 7 equal coercions and 13 can raise. The four fixed widths have the compiler prelude's `bitsAs…` getters. `narrow`, `widen`, `unsigned`, `signed` and `big` keep the low bits and are declared on every type where they apply, so no call reaches one through a coercion. `ZZ`'s `narrow` and `widen` are deleted, and its only conversions out are its five getters. Callers move to `.asZZ32` or `.asZZ64` with their values unchanged: `Format.fss`, `QuickCheck.fss`, the demo `sudoku.fss` and the test `XXXZZNarrowRungP`. The specification states the getters and names, drops `ZZ` from `narrow`'s sentence, and gets an Appendix I entry. P-72, P-73 and P-74 stand.
- **Applies:** To all five integer types. So `z.asZZ64` raises for a `ZZ` that is too large, and `unsigned` of a negative value keeps the low bits; `x.asNN32` or `x.asNN64` is its check.
- **Requires:** Use the `as…` getter for a checked conversion and the low-bits names for bits. Do not call `narrow` or `widen` on a `ZZ`.
- **Unfinished:** The entry does not say. From F-331, the compiled prelude has only 8 of the 25 getters and no `big` until the switch-over. From F-172, the specification text is done.
- **Could not resolve:**
  - "The four fixed widths have the compiler prelude's `bitsAs…` getters": which `bitsAs…` getters each type has is not listed, as in F-331. Unclear wording.
  - "today's names as the low-bits forms": readable as `narrow`, `widen`, `unsigned`, `signed` and `big`.
  - The entry does not say what is still to build.

### 51. P-40, "Sizes are checked, and a size that inference leaves unknown is an error only where it is used."

- **Decided:** A size is a `nat` or `int` static parameter. The rules:
  - The compiled checker checks sizes and refuses one beyond `NN32` or `ZZ32` (F-140).
  - Wherever the array design (P-85) creates a JVM array, it checks the length at run time and refuses one over 2^31-1.
  - A size that inference leaves unknown is an error only when it reaches a type, a name or a value. So a declaration may declare a size that none of its types uses, and pass.
  - A call that cannot fix a size of the declaration it would choose is refused, also inside an overload set, rather than silently skipping that declaration.
  - In the exclusion rule, two instantiations differ when any static argument other than an operator differs, so `Vec[\3\]` and `Vec[\4\]` are two. Boolean arguments count once the checker has boolean parameters.
  - A size used as a number converts to `ZZ32` where one is needed, as a numeral does.
  - The api's 17 vector and matrix operators declare only the sizes their types use. This finishes the team's own fix of 2008, which removed the sizes from the component only.
- **Applies:** To all sizes, on the checker. The JVM length check applies only where the array design creates a JVM array.
- **Requires:** Do not write a call that leaves a size of its chosen declaration unfixed. Expect two instantiations at different sizes to be distinct for the exclusion rule.
- **Unfinished:**
  - The JVM length check waits for the array design. Under walk, such an array stops at its store's factory with walk's own error, which no catch sees (row 527).
  - The checker still skips a declaration whose unfixed size occurs in its own parameter type (row 400).
  - The checker compares no boolean arguments (row 406).
- **Could not resolve:**
  - "reaches a type, a name or a value": what it means for a size to reach a name is not explained (as in F-35). Unclear wording.
  - "pass" (accepted) against "passes over" (skipped) in the same entry: "The checker still passes over a declaration ..." could be misread as "accepts". Unclear wording.
  - "the change of `explorations/perf-probes/array-sites/e3-rebased.patch`": is the patch applied to the tree, or only a reference? F-35 says the operators "have lost their sizes", so I read it as applied. Mildly unclear.

---

## Across entries

These problems show only when entries are read together. A worker who meets one entry alone cannot see them.

1. **The binding counts disagree.**
   - F-299 counts "`Float` 62" and "`RR32` 51" among the 372 helper bindings, and F-299 and F-32 list the 52 glue bindings as `IntLiteral` 21, `FloatLiteral` 3 and `Reflect` 28.
   - F-303 says 5 of `Float`'s 62 still name glue classes, and F-310 says 1 of `RR32`'s 51 does.
   - F-306's `ZZ64` 26 and `ZZ` 22 differ from F-299's 31 and 28.

   Either the rung entries are stale or F-299 is wrong. No entry says which.
2. **"Default" against "deliberate choice".** F-76 calls the narrower typing of row 543 "a default", and F-175 calls it "a deliberate choice".
3. **"Twelve" against "fourteen".** F-285 and F-290 speak of "the twelve" components, while F-53 and F-288 say the distance checks fourteen.
4. **Crash against refusal.** F-268 and `compiler.md` say a tuple holding `Any` crashes the code generator, and F-315 says it is "still refused".
5. **Duplicates.** The `__bigOperator2` fused-arm cast is stated in both F-85 and F-285. `FileWriteStream`'s shape is stated in both F-330 and F-332.
6. **Entries that point to entries outside this file:** F-66 (F-53), F-245 (F-281, F-276), P-148 (F-334), P-69 and P-153 (F-327), P-91 (P-167). The truncated quote of P-58 in F-299 makes this worse.
7. **Old measurements in the present tense.** F-34 (38 refusals) and F-290 (624 errors) state old measurements in the present tense, and the body of each says they are not current.
8. **Terms the skill does not define:** rung, climb batch, walk-world table, native component, springboard, ilk, clause form, stock count, known-fix errors, boxed-type table, array decision A, names batch, reading review.
