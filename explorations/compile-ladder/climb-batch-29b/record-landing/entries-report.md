<!-- The entries writer's report for climb batch 29b's record-landing: each change of owed.md whose writer is entries, with its old and new words, its meaning, its size and, for POSITIONS, the decision before and after. -->

# The entries writer's report, climb batch 29b

The whole old line of each entry is in `entries.md` or in the record at `f629cd2dd`; the whole new line is in `record.apply`. Below, each change gives the sentence that changed, old then new. Sizes are characters of the entry line, before and after.

## Departures from the sort, found on the landed tree

- **C29, F-58.** The sort maps `FortressLibrary.fsi:369-370` to `:367-368`. Both are wrong. At the base, `:369-370` already named `sin` and `cos`. `RR64`'s two `^` declarations are at `:365-366` on the landed tree. I wrote `:365-366`. The entry also says "beside its `^(self, b:Number)`"; the tree declares `^(self, b:RR64)`. I kept that word: see "Decisions not taken".
- **C36 and C37, F-285.** The sort names only `:4639` and `:4645`. Seven more bare citations in the entry are of `Library/FortressLibrary.fss` and moved too. I re-anchored all of them, each read on the landed tree: `SUM[\T\]` `:2778`, `:3164`, `:3169` to `:2719`, `:3105`, `:3110`; `SUM[\ZZ32\]` `:4823`, `:4840` to `:4764`, `:4781`; the fused arm `:1644` to `:1585`; the `N[\0\]` arm `:2798` to `:2739`.
- **C58, P-154.** No change. Its citation is `a874948ac:Library/FortressLibrary.fss:1735-1741`, pinned to the team's commit. Read at `a874948ac`, those lines are `trait LexicographicOrder` and its `CMP`, as the entry says.
- **Headings.** The sort cites the record's "section 6, For the record-landing workflow" and RECORD.md's "Left for the coordinator". The files' headings are "For the record-landing workflow" and "Left for the coordinator and the skill writer". The provenance lines use those.

## FACTS: the passes (C1 to C18)

- **C1, F-53.** Keep, no line. The commit stage wrote it in the record's form, and every figure stays. Size 1490.
- **C2, F-57.** Old: "no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy". New: "no coercion from a numeral into the type parameter `T` itself can be declared, since such a coercion is refused as a cyclic hierarchy". Meaning: unchanged; the word "generic" read as the coercions generic over the four numbers, which every number type now has. Size 1495 to 1499. Past 600: questions 1 and 2 keep each sentence (the paths, the generic code rule, the range refusals, the evidence).
- **C3, F-79.** Keep, no line. "the prelude declaring them too" holds of the types (`Library/FortressLibrary.fsi:457-465`, `compiler/Types.java:85-95`, read). The prelude's `RR64` and `RR32` taking only `RadixPointNumeral` is row 442's subject, not this entry's. Size 1392.
- **C4, F-112.** Keep, no line. Its grep prints nothing on the worktree (the sort), and `compiler_tests/IntLiteralWrapRepairR2.fss:12-14` holds the bare `:400-401`. Size 798.
- **C5, F-118.** Old: "A numeral that no place types becomes its default by its exact bit length, a `ZZ32`, `ZZ64` or `ZZ` (`compiler/codegen/CodeGen.java`, `forIntLiteralExpr`); a folded constant ... (F-340); and a numeral as written ... (F-347). So ... (walk converts a numeral bound to `NN32` or `NN64`, F-341); an untyped binding of the second is a `ZZ`, its default (F-342), and compares with `5` at `ZZ`." New: "A numeral that no place types becomes its default through that type's own coercion, which the checker inserts (`Functionals.scala`, `defaultNumeral`); only a numeral that the checker leaves without a coercion reaches the code generator's fallback, a `ZZ32`, `ZZ64` or `ZZ` by exact bit length (`CodeGen.java`, `forIntLiteralExpr`), and which numerals do is not measured. A folded constant ... (F-340), and a numeral as written ... (F-347). So ... (F-341); an untyped binding of the second is a `ZZ`, its default (F-342)." Meaning: changed, by its ground: the bit-length rule was given for every numeral that no place types; it now holds only for the fallback, whose reach is unmeasured (the review, correction B and section 1, "a way of their own", 3; `Functionals.scala:1016-1028`, read). Size 1206 to 1339. Moved out first: the parenthesis on walk's `NN32` and `NN64` conversion (F-341 says it), and "and compares with `5` at `ZZ`", what remained of the comparison of row 328, now FIXED (to the history). Past 600: question 1 keeps the fallback sentence, since a worker who reads the old rule would trust it for every numeral.
- **C6, F-168.** Keep, no line. Its citation `numbers.tex:245-250` holds ℚ's traits (the sort, read). Size 973.
- **C7, F-169.** Keep, no line. Its last sentence and `literals.tex:146-161` hold (the sort, read). Size 1191.
- **C8, F-173.** Keep, no line. The gather moved `:399-460` with rung T's edit. Size 1718.
- **C9, F-175.** Keep, no line. The gather moved both citations. Size 1298.
- **C10, F-240.** Keep the text; every figure stays, as the commit stage wrote it. Its history gets C24's note. Size 2034.
- **C11, F-262.** Old: "By reading." New: "That no overload can tell the two exponents apart is by reading." Meaning: unchanged; the scope of "by reading" now excludes the minus, which two tests gate. Size 1291 to 1344. Past 600: question 2 keeps the new sentence, since without it a reader takes the two tests as untested.
- **C12, F-272.** Keep, no line. Its citations hold (the sort, read). Size 1148.
- **C13, F-340.** Keep, no line. Each sentence states one condition of the compiled fold, and F-347 holds the rest. Size 1350.
- **C14, F-341.** Old: "(row 973; a walk program on climb batch 29b's merged tree printed 'h = 0.5: false', no test pins it)". New: "(row 973; observed once at `17e93a7da8`, no test pins it)". The batch's name goes to the history note; the code state stays as the observation's bound (fix round, check.md C14). Meaning: unchanged. Size 1699 to about 1650.
- **C15, F-342.** Fix round: its second sentence, 1,048 characters, is split at its semicolons into five sentences, one for each rule: the places that take the default; the type parameter and the rank of the conversion; the range refusals; the written-only rule; the size value. The words are unchanged, but for "and" before "the conversion". Meaning: unchanged. Size 1812 to about 1813. Past 600: questions 1 and 2 keep each sentence, since each is a rule that a worker meets when writing a numeral, or a test that gates one; no sentence is now past 600.
- **C16, F-345.** Fix round: its second sentence, 1,236 characters, is split by chapter: literals (two sentences), constant, numbers, binary, Appendix I. Meaning: unchanged. Size 1539 to about 1590; the growth is the subjects that each new sentence needs ("It also gives", "The constant chapter gives"). Past 600: question 1 keeps each sentence, since each names where the specification states one part of the design; no sentence is now past 600.
- **C17, F-346.** Old title: "The library's `=/=` over `Any` meets a numeral at its default, against `e =/= e'` being `NOT (e = e')`." New title: "Under walk the library's `=` and `=/=` over `Any` meet a numeral at its default, so a number and a numeral of one value answer both as if the values differed." Old body: "... since `opr =/=(a:Any, b:Any) = NOT (a=b)` (...) takes the numeral at its default, and so does `=`: ..., `u = 0` and `q = 0.5` are `false` there too (row 973), where `basic/operators/opr-overview.tex` (...) makes `e =/= e'` `NOT (e = e')` (row 966)." New body: "Under walk `u = 0` is `false` and `u =/= 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32`, and so are `q = 0.5` and `q =/= 0.5` for `q: QQ = 1/2`: with no `=` pairs ... (P-174), `=` takes the numeral at its default (row 973), and `opr =/=(a:Any, b:Any) = NOT (a=b)` (...) follows it (row 966). So walk's `=/=` stays `NOT (e = e')`" (in the fix round: "So under walk `e =/= e'` still answers `NOT (e = e')`."). Meaning: changed, by its ground: the departure is no longer `=/=` against `NOT (e = e')`, but both operators answering as if the values differed (rows 966 and 973 as rewritten). Size 1005 to 985.
- **C18, F-347.** Old title: "Every numeral's place on the compiled path is one value made before the program runs: ...". New: "Every numeral's place on the compiled path whose type names no type parameter is one value made before the program runs: ...". Old: "and a coercion that spawns a task fails the class's load (row 971)". New: "A coercion whose body puts two calls of the program's own functions in one operator or one argument list, as `small(n) - small(m)` does, spawns a task, and the spawn fails the class's load (row 971); bind the operands to locals first." Meaning: changed, by its ground: the title is limited to the case that its body already gives, and row 971's trigger is widened from "a coercion that spawns" to the analyzer's rule (the review, Findings, 1; `ParallelismAnalyzer.java:44`, read). Size 1473 to 1556. Moved out first: the five method names of `CodeGen.java`, to the report that the entry names (question 4). Past 600: question 1 keeps the spawn sentence and its workaround, since a worker who writes a coercion meets the trap otherwise.

## FACTS: sentences that the landing made false (C19 to C24)

- **C19, F-131.** Old: "`Numeral` comprises `NaturalNumeral` and `RadixPointNumeral`, the types that the library declares for a numeral, from which each of the eight converts (F-79)." New: "below `Numeral` lie the numeral types `NaturalNumeral` and `RadixPointNumeral`, which each of the eight converts from (F-79)." Old: "each type declares one at each type it coerces from or into (F-324)". New: "each number type declares one at each number type it coerces from or into (F-324)". Meaning: unchanged; two false readings removed (`FortressLibrary.fsi:457-465`, read). Size 1424 to 1405.
- **C20, F-324.** Old title: "an `=` at each type it coerces from or into". New: "an `=` at each number type it coerces from or into". Meaning: unchanged; the numeral types are not number types (F-79). Size 1073 to 1080.
- **C21, F-180.** Old: "(`compiler/NamingCzar.java:371-374`; F-298)". New: "(`compiler/NamingCzar.java:365-368`; F-298)" (read: the one-library branch). Old: "such as `FZZ32Vector` or `CompilerBuiltin$IntLiteral`, cannot take walk's values". New: "such as `FZZ32Vector`, cannot take walk's values". Old: "and the helper classes, read with `javap`, have 50 such parameters or results". New: "and the helper classes had 50 such parameters or results when read once with `javap`, before `nativeHelpers/simpleIntLiteralArith.java` was deleted". Old: "section 1 (the gaps and walk's half: "What each gap does to it", "Limits, by reading")". New: "section 1 (the gaps and walk's half)". Meaning: unchanged; the count is bounded to its one reading. Size 2349 to 2341. Moved out first: the two section names of `natives-shape.md` (question 4), to the history note.
- **C22, F-128.** Old: "a coercion with its own static parameter (row 513)". New: "a coercion with its own static parameter, unless it is a numeral coercion (row 513)". Meaning: changed, by its ground: row 513 as rewritten excepts a numeral coercion (`tests/NumeralGenericOwnTypeWalk.fss`). Size 840 to 873.
- **C23, F-129.** Old: "A size read as a value is a constant that the class loader replaces by the numeral." New (fix round, check.md C23): "A size read as a value is a `ZZ32` that the class loader writes in: `FZZ32.make` of an `int`, or, beyond 31 bits, `FZZ32.makeSize` of its digits, a `java.lang.Error` at run time that no `catch` sees (row 962; `runtimeSystem/MethodInstantiater.java:225-237`, by reading)." Meaning: changed, by its ground: the numeral class is deleted, and the loader stamps a `ZZ32` (`MethodInstantiater.java:225-237` and `FZZ32.java:26-30`, read). The raise is now named as row 962 and the code name it, a `java.lang.Error`, with the pointer to the row. Size 1319 to about 1490. Past 600: question 1 keeps the new clause, since a worker would otherwise try to catch the error; question 5 gives row 962 for its detail.
- **C24, F-240's history.** A noted block: the distance stage started at 00:12:52 and `testFast` beside it at 00:13:09, so the start load of 0.26 understates the stage's load. The entry is unchanged.

## FACTS: line citations that the hunks moved (C25 to C50)

Each changes only the numbers. I read each landed line, or a grep of the declaration it names, before I wrote it. Meaning: unchanged in each. Each size moves by at most two characters.

- C25, F-301: `FZZ32.java:22-24` to `:32-34`.
- C26, F-302: `FortressLibrary.fss:826`, `:722` to `:775`, `:671`; `CodeGen.java:5519-5526` to `:5527-5534`. `:380` and `:356` did not move (read).
- C27, F-35: `FortressLibrary.fsi:1400` to `:1364`.
- C28, F-44: `.fsi:1100` to `:1064`; `.fss:5146-5154` to `:5087-5095`.
- C29, F-58: `.fsi:369-370` to `:365-366` (above).
- C30, F-63: `.fsi:1053`, `:400` to `:1017`, `:398`.
- C31, F-74: `FortressBuiltin.fsi:128`, `:131`, `:200` to `:126`, `:129`, `:196`.
- C32, F-78: `Functionals.scala:779-783` to `:781-785`.
- C33, F-85: `.fss:1644` to `:1585`.
- C34, F-268: `CodeGen.java:6242-6247` to `:6250-6255`.
- C35, F-276: `.fsi:2707-2726` to `:2671-2690`.
- C36, F-279: `.fss:2973`, `:3375`, `:3354`, `:2685`, `:3057` to `:2914`, `:3316`, `:3295`, `:2626`, `:2998`.
- C37, F-285: `:4639`, `:4645` to `:4580`, `:4586`, and the seven more above.
- C38, F-286: `.fsi:2628-2703` to `:2592-2667`; `.fss:4570-4706` to `:4511-4647`.
- C39, F-303: `.fss:4764` to `:4705`.
- C40, F-305: `.fss:896`, `:1007` to `:844`, `:953`.
- C41, F-306: `.fss:930-1039`, `:1145-1253` to `:877-984`, `:1088-1194`.
- C42, F-307: `FortressBuiltin.fss:391`, `:393`, `:528`, `:549`, `:551`, `:599` to `:389`, `:391`, `:524`, `:545`, `:547`, `:595`; `.fss:1136`, `:4769` to `:1079`, `:4710`; `NamingCzar.java:375-386` to `:369-380`.
- C43, F-311: `numbers.tex:59` to `:61`.
- C44, F-312: `.fss:888-891`, `:999-1002`, `:1104-1107`, `:1221-1224` to `:836-839`, `:945-948`, `:1048-1051`, `:1163-1166`; `FortressBuiltin.fss:496-499` to `:493-496`.
- C45, F-315: `CodeGen.java:3015-3017` to `:3029-3031`.
- C46, F-321: `NamingCzar.java:341-342` to `:337-338`.
- C47, F-327: `.fss:780-825` to `:729-774`; `FortressBuiltin.fss:401-427` to `:399-425`.
- C48, F-330: `.fss:2046-2055`, `:2068-2073` to `:1987-1996`, `:2009-2014`; `NamingCzar.java:492-493` to `:486-487`.
- C49, F-332: `.fss:2057-2077` to `:1998-2018`.
- C50, F-334: `Functionals.scala:759`, `:769-774`, `:807-826` to `:761`, `:771-776`, `:809-828`; `CoercionOracle.scala:245-264` to `:350-369`.

## POSITIONS (C51 to C61), under the curator's rule of 2026-10-31

- **C51, P-173.** Cut only. Old: "... a program's own type may (P-174), or is a numeral type; `Any`, ...". New: "... a program's own type may (P-174); `Any`, ...". The decision, before and after: a numeral converts where it stands, into the place's type from its exact value, else into the machine default. Its reach before: places whose type has a coercion from the numeral type, or is a numeral type. After: places whose type has a coercion from the numeral type. The second half named a place that P-174 forbids and the checker refuses on both paths, so no program reaches it. Its requirement, unchanged: the conversion is exact or rounds once, and an out-of-range numeral is refused statically. Size 3166 to 3144.
- **C52, P-174.** Old: "Rows 969 and 970 hold the tree's run-time numeral with its four numbers as fields." New (fix round, check.md C52): "Rows 960 and 974 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written as a static argument or as a type that an object or a trait extends." The words on row 974 are now its claim's own scope. The decision, its reach and its requirement are unchanged: a numeral's type exists only at compile time, below `Numeral`, with its four numbers as static parameters; every number type takes a numeral through a coercion generic over the four numbers. Only the pointer to the departures changes. Size 2188 to 2246. Row 442 is left out: see "Questions for the curator".
- **C53, P-176.** Old: "Rows 969 and 970 hold where the tree departs." New: "Rows 957 and 971 hold where the tree departs: a place whose type names a type parameter, and a coercion that spawns a task." The decision, its reach and its requirement are unchanged: one value per place, the same on both paths, made once; a constant where the result is a JVM primitive, else a `static final` field filled when the class loads. Size 1062 to 1141.
- **C54, P-76.** Old: "the name that the compiler's prelude and the interpreter's library give the type". New: "... gave the type". Not cut only: one word changes tense. The decision, its reach and its requirement are unchanged: an integer numeral has the type `NaturalNumeral`, exact into the five integer types and `QQ`, one rounding into `RR64` and `RR32`. Size 864 to 864.
- **C55, P-172.** Old title: "... `RadixPointNumeral` (P-174), which holds the numeral's exact value: `QQ` converts ...". New: "... `RadixPointNumeral` (P-174): `QQ` converts ...". Old: "as the compiler's prelude declares its `FloatLiteral` (`LibraryBuiltin/CompilerBuiltin.fss:996`)". New: "as the compiler's prelude declares it (`LibraryBuiltin/CompilerBuiltin.fss:890`)" (read: `trait RadixPointNumeral`). Not cut only. The decision, its reach and its requirement are unchanged: a radix-point numeral converts exactly into `QQ` and with one rounding into `RR64` and `RR32`, on both paths. The cut clause read as a run-time value that holds the number; P-174 puts the four numbers in static parameters. Size 2115 to 2060.
- **C56, P-165.** `numbers.tex:56-73` to `:58-75` (read: the passage on explicit conversions and its revisions); `CompilerBuiltin.fss:510` to `:509` (the sort, read). Pointers only; the decision, reach and requirement unchanged.
- **C57, P-171.** `constant.tex:118-122` to `:129-133` (read: the concatenation of literals). Pointer only.
- **C58, P-154.** No line: the citation is pinned to `a874948ac` (above).
- **C59, P-163.** `FortressBuiltin.fss:598` to `:594` (read: `charToExprString`). Pointer only.
- **C60, P-166.** `FortressBuiltin.fss:548` to `:544` (read: `value object BigNum`); `.fsi:200` to `:196` (fix round, check.md C60; read: `value object BigNum extends ZZ end`); `FortressLibrary.fss:655` to `:648` (read: `value object Ratio`). Pointers only; the decision, reach and requirement unchanged.
- **C61, P-175.** `CodeGen.java:7062` to `:7068` (read: "Why isn't this parallel???"). Pointer only.

The POSITIONS changes to name to him, old and new, are C51 to C57 and C59 to C61 above.

## The gap ledger (C64 to C66), in `rows.rewrite`

- **C64, row 971.** Old claim: "on the compiled path a numeral's coercion that spawns a task, as `Cell(part(1) \|\| part(2))` does, fails the load of the component's class: the static initializer fills each place before the task pool starts, `ClassCastException: ...`". New claim: "on the compiled path a numeral coercion whose body spawns a task fails its component class's load, `ClassCastException: ...`: an operator or an argument list over two calls of the program's own functions spawns, as `small(n) - small(m)` does". Notes rewritten: the analyzer's rule (`ParallelismAnalyzer.java:44`, `:158-212`), the class load before the pool (`MainWrapper.java:61-64` at `a2be3e9e1d`, read), the run at 1 and at 4 threads, P-174's example by reading, the workaround. Cut from the notes to fit 700: `BaseTask.java:241` and the line on `NumeralStaticDesignCompiled`'s `Written` coercion. Meaning: changed, by its ground (the review, Findings, 1). Status unchanged. Row 1178 characters.
- **C65, row 960.** Notes gain: "The reproducer reads the deleted getters `x.digits`, `x.fractionDigits`, `x.radix` and `x.digitValue`, so it fails for that reason and cannot show a repair. A new reproducer is owed: a program's coercion over `RadixPointNumeral[\n, m, r, v\]` that returns `n` for `00.5`, asserting 3." (read: `tests/XXXRadixPointLeadingZerosWalk.fss:5-6`). The path of `ExprFactory.java` is shortened. Fix round (check.md C65): the condition is now in the note, "A new reproducer is owed, for the next batch that edits walk's numerals or the parser's float text: ...", since no PLAN line or queue item holds it. To fit 700, "the checker's `RadixPointNumeral[\n, m, r, v\]` and walk's binding of `n`" becomes "the checker's `n` and walk's". Status unchanged. Row 1135 characters.
- **C66, row 442.** Notes gain: "Its numeral half differs by path: compiled, `r: RR64 = 3` is refused, and walk binds `3.0` through `FortressLibrary.fss:389`; `NumeralFoldFloats.fss:11` writes `16777217.0` for it." (read: both lines). Cut to fit 1,200: the sentence on the one library's shifts and `ZZ64`'s `^` over new helpers (`NativeHelperFamilyShiftPowerCompiled`), which the row's history keeps, and the `ProjectFortress/` prefix of the prelude's path. Status unchanged. Row 1185 characters.

## Decisions not taken

- **F-58's `^(self, b:Number)`.** The tree's `RR64` declares `^(self, b:RR64)` beside `^(self, b:AnyIntegral)`. Ways: (a) keep, as now; (b) write `^(self, b:RR64)`, a change of the claim, to be checked against the earlier library that the entry measured.
- **F-79's "the prelude declaring them too".** Ways: (a) keep, as now; (b) add "and the prelude's `RR64` and `RR32` take only `RadixPointNumeral` (row 442)".
- **F-169's "its four numbers".** `NaturalNumeral[\n, r, v\]` has three static arguments. Ways: (a) keep, as F-57 and F-79 use the term; (b) "its numbers".

## Questions for the curator

- **P-174's departures.** I named rows 960 and 974. Row 442's numeral half, the prelude's `RR64` and `RR32` without a coercion from `NaturalNumeral`, is a departure from P-174 only if P-37's exception covers that coercion, which is his to say (the review's finding 2). Should P-174 name row 442 too? The other way: cut the sentence, the fewest words.

## The fix round

The checker's seven failures in my homes are fixed above: C14, C15, C16, C23, C52, C60, C65. Two passages that the cold reader read two ways are settled by a source and changed:

- **F-118.** Old: "as walk does at `ZZ` and `ZZ64` (F-341)". New: "as under walk, where they are a `ZZ64` and a `ZZ` (F-74, F-341)". F-74 gives walk's default by value: `4294967295` is a `ZZ64`, `18446744073709551615` a `ZZ`. Meaning: unchanged.
- **F-346.** Old: "So walk's `=/=` stays `NOT (e = e')`." New: "So under walk `e =/= e'` still answers `NOT (e = e')`." It is an observation of the tree (rows 966 and 973), not a decision. Meaning: unchanged.

The cold reader's other doubts, and what I did:

- **The skill disagrees with the record, for the skill writer.** `compiler.md` (row 961) and `interpreter.md` (row 968) say that a negative constant reaches a program type's coercion with its sign; both rows are FIXED, and P-174, F-262 and F-347 hold the type's `-` on the coercion's result. `interpreter.md` (row 966) advises `NOT (u = 0)` for `u =/= 0`, which F-346 shows is `true` too. `compiler.md` (row 963) says a `typecase` selector keeps `IntLiteral`; row 963 as rewritten says `NaturalNumeral[\1,10,7\]`. `compiler.md` names `useInterpreterLibraries()`, F-57 `useFortressLibraries`. The skill update owes each of these; I changed no entry for them.
- **Kept, with no source to settle them, in text that the sort did not name:** F-57's "witness `typecase`", "cyclic hierarchy" and "depends ... on the library in scope"; F-341's "a store keeps its default alone"; F-324's "nine types" and "21 coercions"; F-128's "a varargs parameter included" against P-76's varargs gap; F-129's "sized form ... type form"; F-131's widths among signed and unsigned types; P-173's "before it runs the checker", P-26 and "converting into it exactly" at `RR64`; P-172's tense of "changes" and "follow", and the tie among three types.
- **"four numbers" for `NaturalNumeral`'s three static parameters** (F-347, P-174): as "Decisions not taken" for F-169.

## Questions for the curator, from the fix round

- **P-173, P-76: "before it runs the checker (P-12)".** The cold reader reads it as "until". P-176 says "until it runs the checker". Should P-173 and P-76 say "until"? I kept his words.
- **P-174: "its four numbers"** for a `NaturalNumeral`, which has three static parameters, `n`, `r` and `v`. Should P-174 say "its numbers", or that a natural numeral has no `m`? I kept his words.

## What I could not follow

- The sort's map of F-58 and F-285, and its line for P-154: corrected above from the landed tree.
- `clean.txt` holds the 18 entries whose words changed. The 36 entries whose only change is a line number are in `record.apply` alone, since their text reads as before.
