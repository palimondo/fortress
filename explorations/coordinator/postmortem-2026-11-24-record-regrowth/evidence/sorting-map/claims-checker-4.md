<!-- The claims of each FACTS entry of chunk checker-4 (section "The checker and the one library", F-281 to F-323, 30 entries), each with its subject, its kind, the other entries that say the same, and what today's checks say of it, as the first step of the sorting map for the record's consolidation of 2026-11-24; written by a claims worker from FACTS at HEAD, scout-checker-4.md and stale-claims.md, judging nothing new. -->

# Claims of chunk checker-4

How to read a claim line: the sentence, then its subject label, its kind, its overlaps (for property, defect and choice only: entries of FACTS that say the same or overlap, with the words, or "none found" with the words searched), and today's checks (from `evidence/consolidation/scout-checker-4.md`, "scout", and `evidence/stale-claims.md`, "stale"). "Sound (scout)" means the scout found the cited sources, tests, lines and rows and found them agreeing; "not checked (scout)" means the scout says it did not check that part. The skill's references are named as the scout names them (`compiler.md`, `interpreter.md`, `library.md`). Overlap searches ran a grep of every entry line of FACTS for the words given.

## F-281 "The compiled checker checks the overloading of every operator, symbolic ones included"

1. The checker checks the overloading of every operator, symbolic ones included. — *the checker: operator overloading check*; kind: **property**; overlap: F-245 ("The checker checks every operator (F-281)"), F-81 ("the checker checks every operator (F-281)"), F-278; checks: `OverloadingChecker.scala:828` `isCheckedName` (scout).
2. With them checked, the distance and count are 0, with no crash. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-53 (the current values); checks: sound (scout).
3. Its three loops read `isCheckedName`, which admits every operator. — *the checker: operator overloading check*; kind: **detail**; checks: sound (scout).
4. The export check reads every operator too, each under its declared name only (F-287). — *the checker: export check*; kind: **property**; overlap: F-287 (same, "It admits a name by `isCheckedName`"); checks: sound (scout).
5. An on-demand import adds an api's declarations once and leaves out an `except`-listed name. — *the checker: imports*; kind: **property**; overlap: none found (searched "on-demand", `except`); checks: sound (scout).
6. The check still reads an on-demand api's declaration of a name imported by name from another api (row 813). — *the checker: imports*; kind: **defect** (row 813); overlap: none found (searched "row 813"); checks: row 813 NEGATIVE-VERIFIED (scout).
7. An `except` that lists an operator leaves it imported on both paths (row 814). — *the checker: imports*; kind: **defect** (row 814); overlap: none found (searched "row 814"); checks: row 814 NEGATIVE-VERIFIED (scout).
8. Outside its trait, a self type whose `comprises` lists types at a `where` variable is read as the trait type (`selfComprised`), so `AnyList`'s `||` is checked. — *the checker: where clauses*; kind: **property**; overlap: none found (searched `selfComprised`); checks: found in `TypeAnalyzer.scala` (scout).
9. Such a program also compiles where a listed generic type gives a member's body (row 812, fixed; F-384). — *the code generator: comprises clauses*; kind: **pointer**; checks: row 812 FIXED (scout).
10. So the distance stage is the full check of F-245. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-245 (same); checks: sound (scout).
11. Gated by five `compiler_tests` and the stages. — kind: **tests**; checks: found (scout).
12. Detail in `rung-symbolic-check` report and batch 28's review. — kind: **pointer**.

- Shape: several subjects (the checker: operator overloading check; the checker: imports; the checker: where clauses).
- Title: claims 1 and 2; the import rows (claims 5 to 7) and the `selfComprised` reading answer other questions.

## F-282 "The compiled export check matches an api's members by name and header and reads `abstract`"

1. The export check matches an api member with a component member of the same name and header. — *the checker: export check*; kind: **property**; overlap: library.md:44-48 (same rule); checks: sound (scout).
2. It matches a field by name, modifiers other than `var` and type, and an object's value parameter by modifiers and type, not by its name (row 839). — *the checker: export check*; kind: **defect** (row 839); overlap: F-288 and F-294 (row 839, "not by its name"), compiler.md:168; checks: row 839 NEGATIVE-VERIFIED (scout).
3. It matches a top-level variable by type, mutability and other modifiers (row 1028, fixed). — *the checker: export check*; kind: **property**; overlap: none found (searched "row 1028", "top-level variable"); checks: row 1028 FIXED (scout).
4. It asks the component to declare each api member written `abstract`, at its header, and an abstract getter also by a non-`hidden`, non-`private` field (F-297). — *the checker: export check*; kind: **property**; overlap: F-297 (same rule), F-294 (the specification's rule); checks: sound (scout).
5. `FortressLibrary.fsi` states its component's members at the component's headers: the 66 written `abstract`, `String`'s nine among them, and the others restated. — *the library: export alignment*; kind: **property**; overlap: F-286 (`String`'s abstract members, there 14), F-297 (12 added bodyless); checks: sound (scout).
6. It leaves out subscripts the component never built; where the api's type is the contract the component takes it, as `RR64`'s `truncate` at `ZZ64`. — *the library: export alignment*; kind: **property**; overlap: none found (searched `truncate`: F-90 and F-303 name it on other points); checks: sound (scout).
7. `String`'s api writes `abstract` on members its trait leaves bodyless or does not declare, and its `excludes` is the component's (F-286). — *the library: export alignment*; kind: **property**; overlap: F-286 (same); checks: sound (scout).
8. So the export check finds no difference, the distance holds no export error, with every api member counted. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-53, F-287; checks: sound (scout).
9. It reads every top-level operator under its declared name (F-287). — kind: **pointer**.
10. Gated by nine `compiler_tests`, the per-site list, and `ExportAlignedMembersWalk.fss` for walk's values. — kind: **tests**; checks: found (scout).
11. Detail in five rung reports. — kind: **pointer**.

- Shape: several subjects (the checker: export check; the library: export alignment).
- Title: the checker's rule and the library's match, two halves; the body serves both, and most of its claims are said in F-286, F-287, F-294 and F-297. The 2026-10-25 history block points to P-158 (scout).

## F-285 "The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter"

1. The library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the components the distance checks. — *the library: big operator static arguments*; kind: **property**; overlap: F-59 ("so does the interpreter's library at its own sites (F-285)"); checks: stale: "twelve components", where `run.sh` lists 14 (false today).
2. `__bigOperator2`'s fused arm casts its result to `O0`. — *the library: big operator static arguments*; kind: **property**; overlap: F-85 (same cast, "passes its result through `cast[\O0\]`"); checks: `:1670` agrees (scout).
3. It follows P-78. — kind: **pointer**.
4. The sites: `BIG MIN[\ZZ32\]` in `upto` and `beyond`, `<|[\E\] ...|>` in `List`'s range subscript, `SUM[\T\]` and `SUM[\ZZ32\]` lines, `transpose`. — *the library: big operator static arguments*; kind: **detail**; checks: every line agrees (scout).
5. The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), taken at their bound, or of `BIG LEXICO`, which has none. — *the library: big operator static arguments*; kind: **property**; overlap: F-59 and F-221 (a plain bound is taken at its bound); checks: sound (scout).
6. The fused arm uses the library's cast device (F-264), as `__builtinFactory1`'s `N[\0\]` arm does. — *the library: big operator static arguments*; kind: **property**; overlap: F-85 (F-264's device); checks: `:2824` agrees (scout).
7. So the distance holds no site of an unwritten argument or of the fused arm. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-85, F-53; checks: sound (scout).
8. The checker now infers such an argument (F-364); the library's sites stay written. — *the checker: expected type and inference*; kind: **pointer**.
9. Under walk the written comprehension makes `List`'s strided subscript answer a `List[\E\]`. — *walk: reduction instantiation*; kind: **property**; overlap: F-228 (walk instantiates by a declared type); checks: sound (scout).
10. `PureList`'s strided subscript answers objects at their run-time types, and `ZZ32` or `String` lists at their element type (row 824). — *walk: reduction instantiation*; kind: **defect** (row 824); overlap: none found (searched "row 824", `PureList`); checks: row 824 NEGATIVE-VERIFIED (scout).
11. Tests: the distance stage and three walk tests. — kind: **tests**; checks: found (scout).
12. Detail in `rung-body-arguments` report. — kind: **pointer**.

- Shape: one subject (the library: big operator static arguments), with walk's view.
- Title: claims 1 and 2; the body serves it. Claim 2 is said in F-85.

## F-286 "The api's `String` writes `abstract` on every member that its component's trait leaves without a body"

1. The api's `String` writes 14 members `abstract`, and the component's trait declares all 14 without a body. — *the library: export alignment*; kind: **property**; overlap: F-282 ("the 66 members written `abstract`, `String`'s nine among them"), F-297 (seven of the same members), F-63 (`split` and `splitWithOffsets` abstract); checks: `.fsi:2583`, `.fss:4596` found, ranges not walked (scout).
2. `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14 under walk. — *the library: string objects*; kind: **property**; overlap: none found (searched `StringMembersPromised`); checks: test found (scout).
3. `String`'s `excludes` is `{ Number, Char, AnyMultiplicativeRing }` on both sides, and `AnyList` states its exclusion of `String` itself. — *the library: export alignment*; kind: **property**; overlap: F-282 (same); checks: stale: `List.fsi:55` is a comment; the line is `:57` (cites a thing that moved).
4. So `String` has no entry in the export error (F-282). — *the harness and the gate: distance and count*; kind: **property**; overlap: F-282, F-83; checks: sound (scout).
5. `CatString`'s `rangeContains` answers what its halves answer, so it carries row 607's miss. — *the library: string objects*; kind: **defect** (row 607); overlap: F-83 (row 607); checks: row 607 NEGATIVE-VERIFIED (scout).
6. Gated by `StringMembersPromisedWalk.fss` and the per-site list. — kind: **tests**; checks: found (scout).
7. Detail in `rung-string-members` report. — kind: **pointer**.

- Shape: one subject (the library: export alignment), with the string objects.
- Title: claims 1 and 2; the body serves it. F-282 and F-297 count the same members differently (9, 7, 14).

## F-287 "The export check reads every top-level operator of an api under its declared name"

1. The export check reads every top-level operator of an api under its declared name. — *the checker: export check*; kind: **property**; overlap: F-281 ("each under its declared name only (F-287)"), F-282; checks: `ExportChecker.scala:278`, `:600` agree (scout).
2. The 157 top-level operator declarations of the apis match their components. — *the library: export alignment*; kind: **property**; overlap: none found (searched "157"); checks: not in the stale list; the scout notes, under F-288, that F-287 says "twelve" where the stage reads fourteen components.
3. It admits a name by `isCheckedName` and only a key under which a function is filed by its own name, never the span key. — *the checker: export check*; kind: **detail**; overlap: F-281 (`isCheckedName`).
4. The 9 that differed are stated once on both sides by the library's rule (named). — *the library: export alignment*; kind: **history**.
5. A narrower return type in the component is refused at the api's header, which the text accepts (row 834). — *the checker: export check*; kind: **defect** (row 834); overlap: F-294 (row 834's method half); checks: row 834 CONTESTED; the entry gives no status word (scout).
6. An api operator is not satisfied by a functional method of the component (row 835), nor by a declaration with renamed static parameters (row 836). — *the checker: export check*; kind: **defect** (rows 835, 836); overlap: none found (searched "row 835", "row 836"); checks: 835 NEGATIVE-VERIFIED, 836 CONTESTED (scout).
7. Gated by `XXXExportOperatorHeader`, `ExportOperatorMatch`, the per-site list. — kind: **tests**; checks: found (scout).
8. Detail in `rung-export-operators` report. — kind: **pointer**.

- Shape: one subject (the checker: export check), with the library's match.
- Title: claims 1 and 2; the body serves it.

## F-288 "The fourteen components the distance checks are closed under import"

1. The fourteen components the distance checks are closed under import. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-53 ("twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288)"), F-290; checks: `run.sh:87-90` lists 14 (scout).
2. The checker checks them to their end and finds no error: '#total 0', '#crash none'. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-53; checks: sound (scout).
3. `List` imports `CovariantCollection` and `OneShotFlag`, which import nothing. — *the library: List*; kind: **detail**; checks: lines agree (scout).
4. `CovariantCollection`'s api states its component's members, and its `upward` takes its target type from its first argument. — *the library: List*; kind: **property**; overlap: none found (searched `upward`); checks: sound (scout).
5. The export check matches an object's value parameter by modifiers and type, not name (row 839). — *the checker: export check*; kind: **defect** (row 839); overlap: F-282, F-294 (same); checks: row 839 NEGATIVE-VERIFIED (scout).
6. Every `ArrayList` holds `OneShot` fields and every list comprehension goes through `covariantCompr`, so after the switch-over `List` compiles only with both. — *the library: List*; kind: **property**; overlap: none found (searched `covariantCompr`, `OneShot`); checks: lines agree (scout).
7. Tests: the distance stage, `ExportVarObjectParameter`, `CovariantCollectionArmsWalk.fss`. — kind: **tests**; checks: found (scout).
8. Detail in `rung-list-imports` report and batch 28's review. — kind: **pointer**.

- Shape: one subject (the harness and the gate: distance and count), with `List`'s imports and an export-check row.
- Title: claims 1 and 2; the body serves it, except claim 5, said in F-282 and F-294.

## F-289 "The distance stage runs under the compile command's own setting, the bound `Any`, and gives 0"

1. The distance stage runs under the compile command's setting, the bound `Any`, and gives 0. — *the tools: distance stage*; kind: **property**; overlap: F-296 ("The distance stage's default setting, `compile`, reads that line at each run and gives 0 (F-289)"); checks: sound (scout).
2. `run.sh`'s default setting `compile` takes the extends-`Object` switch from `useCompilerLibraries()`'s first line at each run, which turns it off. — *the tools: distance stage*; kind: **detail**; checks: `DistanceMulti.java:79-92`, `Shell.java:378` agree (scout).
3. With the switch on, the twelve gave 685 errors, 580 on the bound `Object`, on batch 22's code. — *the harness and the gate: distance and count*; kind: **history**.
4. Test: the stage's own run, quoting its header and '#total 0'. — kind: **tests**.
5. Detail in `rung-bound-any` report section 6. — kind: **pointer**.

- Shape: one subject (the tools: distance stage).
- Title: claim 1; the body serves it. F-296 says the same.

## F-290 "On climb batch 22's code, outside the twelve, the compiled checker finds 624 component errors"

1. On batch 22's code, outside the twelve, the checker found 624 component errors in 30 of 40 components, at least 92 api errors in 10 apis, and 25 crashes. — *the checker: the rest of the library*; kind: **detail** (one measurement); checks: not re-measured (scout).
2. The driver, the exclusions, and an api counted up to its first failing stage. — *the checker: the rest of the library*; kind: **detail**.
3. `Avl.fss`, a program kept in the library, stops at name binding on both paths (row 830). — *the library: Avl*; kind: **defect** (row 830); overlap: none found (searched `Avl`, "row 830"); checks: row 830 NEGATIVE-VERIFIED (scout).
4. MicroGPT's imports on that code: `System` 2, `File` 4, `FileSupport` 24, `FortressAst` 1. — *the checker: the rest of the library*; kind: **detail**.
5. On `832f7d0d91`, `System` reads no error (F-321), `File` 1 export error, `FileSupport` 24; none is among the fourteen. — *the checker: the rest of the library*; kind: **detail**; overlap: F-321 (`System` reads no error).
6. `CovariantCollection` (12 errors, 2 crashes) and `OneShotFlag` (1) are among the fourteen since batch 22c, at 0 there (F-288). — *the harness and the gate: distance and count*; kind: **history**.
7. No test checks it. — kind: **detail**.
8. Detail in four reports. — kind: **pointer**.

- Shape: mostly history or plan (one measurement and its update), one subject (the checker: the rest of the library).
- Title: claim 1, a measurement of one batch's code; the body serves it. F-352 holds "624" too (search); P-12 and P-33 cite it (scout).

## F-292 "Under the compile command's bound `Any`, the compiled test tracks pass"

1. Under the bound `Any` the compiled test tracks pass: library 86, othercompiler 263, compiler 1318, on rung B's tree. — *the harness and the gate: compiled tracks*; kind: **history** (one run of one tree); checks: counts not re-run (scout).
2. The ten tests that pinned the bound `Object` keep their values respelled. — *the checker: implicit bound Any*; kind: **history**.
3. The 23 `.test` files that import `CompilerSystem` pass. — *the repository: CompilerSystem*; kind: **history**; checks: stale: 0 `.test` files name it, 27 `.fss` do (false today).
4. `XXXImplicitBoundAny` was promoted to `ImplicitBoundAny`; `XXX6bu`, `XXX6bv`, `XXXInferCallArgumentControls` pin the new text; four `comprises` tests write `where [\E\]`. — kind: **tests**; checks: stale: `XXXImplicitBoundAny` not found, only `ImplicitBoundAny` (cites a thing that is gone, as a promotion).
5. `XXXOverrideGenericReturnTypeNotSubtype` writes `T extends Object` since under `Any` its override overrides nothing, which the checker refuses (F-400). — *the checker: implicit bound Any*; kind: **property**; overlap: F-400 ("the checker refuses an `override` that overrides nothing"); checks: test found (scout).
6. `CoercionGenericFnCompiledRungC` writes `T extends Object` for the prelude's `||` at `Object` until the switch-over. — *the checker: implicit bound Any*; kind: **property**; overlap: F-296 (prelude's `||`, `print`, `println` at `Object`); checks: test found (scout).
7. Detail in `rung-bound-any` report sections 2 and 9. — kind: **pointer**.

- Shape: mostly history or plan.
- Title: claim 1 with the respelled tests; the body is the record of one landing's tests. F-291 cites it (scout).

## F-293 "`CompilerSystem` is a fourth file of the compiler's library, outside its prelude"

1. `CompilerSystem` is a fourth file of the compiler's library, outside its prelude: the compiled path's own `System` api (`args`, `getProperty`). — *the repository: CompilerSystem*; kind: **property**; overlap: compiler.md:32, F-321 ("`CompilerSystem` still imports `systemOps`' `getArgs` and `getProperty`"); checks: files found (scout).
2. No program imports it by default; the default imports are the prelude's three files and `AnyType`, or the one library's under its selection (F-381). — *the checker: default imports*; kind: **property**; overlap: F-381 (the selection), F-9; checks: sound (scout).
3. 27 programs of `compiler_tests/` and one of `other_compiler_tests/` import it. — *the repository: CompilerSystem*; kind: **detail**; checks: agrees (scout).
4. P-37 names only the prelude's three files. — kind: **pointer**.
5. Read in the tree; detail in the zero audit's "A.2 Scope". — kind: **pointer**.

- Shape: one subject (the repository: CompilerSystem).
- Title: claim 1; the body serves it. F-292 gives 23 for claim 3's count.

## F-294 "The specification's export rule asks a component to declare each field and method of an api's trait or object"

1. The specification's export rule asks a component to declare each field and method of an api's trait or object, the abstract ones at their header with or without a body. — *the specification: export rule*; kind: **property**; overlap: F-297 and F-282 (the compiled check of the same rule), library.md:47-48; checks: revised `source-code.tex:381` agrees (scout).
2. The Working Draft asked no declaration of an abstract method; the revision follows P-158. — *the specification: export rule*; kind: **history**; checks: frozen `:380-385` agrees (scout).
3. `apis.tex:252-256` asks no body of an abstract member, and stays. — *the specification: export rule*; kind: **property**; overlap: none found (searched `apis.tex`); checks: found (scout).
4. The compiled check takes an object's value parameter written `var` in the component (row 844). — *the checker: export check*; kind: **defect** (row 844); overlap: none found (searched "row 844"); checks: row 844 CONTESTED (scout).
5. It compares no name of an object's value parameter (row 839). — *the checker: export check*; kind: **defect** (row 839); overlap: F-282, F-288 (same); checks: row 839 NEGATIVE-VERIFIED (scout).
6. It takes only a field, not a getter, for an api trait's field (row 842). — *the checker: export check*; kind: **defect** (row 842); overlap: F-297 ("an api's field met by a component's getter stays refused (row 842)"); checks: row 842 NEGATIVE-VERIFIED (scout).
7. For a non-abstract method it asks the same header, return type included, where the rule takes a narrower one (row 834). — *the checker: export check*; kind: **defect** (row 834); overlap: F-287 (row 834); checks: row 834 CONTESTED (scout).
8. Read in the source. — kind: **detail**.

- Shape: several subjects (the specification: export rule; the checker: export check), mostly defects of the check against the rule.
- Title: claim 1; the body serves it through the four departures. P-158 cites it (scout).

## F-296 "`fortress compile` bounds a type parameter declared without a bound by `Any`, as walk does"

1. `fortress compile` bounds a type parameter declared without a bound by `Any`, as walk does (P-42). — *the checker: implicit bound Any*; kind: **property**; overlap: F-289 (same switch), SKILL.md ("An unbounded type parameter is bounded by `Any`"); checks: `Shell.java:378` agrees (scout).
2. The twelve commands of `Shell.java:411-469` that call `useCompilerLibraries()`, named, read an empty `extends` as `Any`. — *the checker: implicit bound Any*; kind: **detail**; checks: stale: 11 call lines lie in 411-469, 12 with :471 (false today).
3. Tuple and arrow static arguments compile. — *the code generator: implicit bound Any*; kind: **property**; overlap: F-291 (compiles at tuple and arrow static arguments); checks: sound (scout).
4. The distance stage's default setting reads that line and gives 0 (F-289). — kind: **pointer**.
5. The No Duplicates Rule now refuses `g[\T\](a: T)` beside `g(a: Any)` on the compile command too (row 759). — *the checker: implicit bound Any*; kind: **property**; overlap: F-274 (walk's No Duplicates Rule, row 759); checks: row 759 FIXED (scout).
6. Until the switch-over, a generic that concatenates or prints such a value bounds it by `Object`, for the prelude's `||`, `print`, `println`. — *the checker: implicit bound Any*; kind: **property**; overlap: F-292 (`CoercionGenericFnCompiledRungC` writes `T extends Object` for the prelude's `||`); checks: `CompilerBuiltin.fsi` lines agree (scout).
7. Row 339 is reached and stays open; row 832 is fixed. — *the checker: implicit bound Any*; kind: **defect** (row 339); overlap: F-291 (row 339, "`()` fails whatever the bound"); checks: row 339 NEGATIVE-VERIFIED, 832 FIXED (scout).
8. Test: `ImplicitBoundAny`. — kind: **tests**; checks: found (scout).
9. Detail in `rung-bound-any` report. — kind: **pointer**.

- Shape: one subject (the checker: implicit bound Any).
- Title: claim 1; the body serves it.

## F-297 "The compiled export check asks the component to declare each member its api writes `abstract`"

1. The export check asks the component to declare each api member written `abstract`, at the api's header, with or without a body. — *the checker: export check*; kind: **property**; overlap: F-282 (same rule), F-294 (the specification's rule), library.md:46-48; checks: sound (scout).
2. The `FortressLibrary` component declares them all. — *the library: export alignment*; kind: **property**; overlap: F-282 ("the 66 members written `abstract`"); checks: sound (scout).
3. `equalListMembers` counts every api member and matches an abstract one through `equalAbstractMember`, the team's 2009 comparison, with two refusal messages. — *the checker: export check*; kind: **detail**; checks: `:831`, `:863` agree (scout).
4. An abstract getter is also met by a non-`hidden`, non-`private` component field of its name and type, since a field declaration declares its getter. — *the checker: export check*; kind: **property**; overlap: F-282 (same), library.md:46-48; checks: `:867`, `traits.tex:722` agree (scout).
5. An api's field met by a component's getter stays refused (row 842). — *the checker: export check*; kind: **defect** (row 842); overlap: F-294 (row 842); checks: row 842 NEGATIVE-VERIFIED (scout).
6. The 12 members the traits lacked (named) are declared bodyless; the prelude declares its 85. — *the library: export alignment*; kind: **detail**; overlap: F-286 (`String`'s members).
7. Walk compares no component with its apis (row 841). — *walk: export check*; kind: **defect** (row 841); overlap: F-370 (row 841); checks: row 841 NEGATIVE-VERIFIED (scout).
8. Gated by five `compiler_tests` and the per-site list. — kind: **tests**; checks: found (scout).
9. Detail in `rung-abstract-declared` report and `JUDGE.md`. — kind: **pointer**.

- Shape: one subject (the checker: export check), with the library's match.
- Title: claims 1 and 2; the body serves it. F-282 says nearly all of it.

## F-298 "A `builtinPrimitive` body whose string names a static helper of `nativeHelpers/` compiles on the compiled path as a call of that helper"

1. A `builtinPrimitive` body naming a static helper of `nativeHelpers/` compiles as a call of that helper. — *the code generator: builtinPrimitive rewrite*; kind: **property**; overlap: compiler.md:107 (same), F-32 (glue classes); checks: sound (scout).
2. It builds P-58. — kind: **pointer**.
3. At the parse, in every run but walk's, the count and distance stages among them, the rewrite makes such a body a call through a synthetic `import java`, `self` first, checked against the helper's Java signature. — *the code generator: builtinPrimitive rewrite*; kind: **property**; overlap: compiler.md:107; checks: `BuiltinPrimitiveRewriter.java` found (scout).
4. In walk's world the checker reads the Java types as the one library's, `int` as `ZZ32`, as a written `import java` (F-180; row 845). — *the checker: native helper typing*; kind: **property**; overlap: F-322 ("reads a helper's Java types as the one library's (F-298)"), F-180 (row 845); checks: row 845 NEGATIVE-VERIFIED; `NamingCzarJUTest.testForeignOneLibrary` not searched (scout).
5. A string under the package that names no public static method is a static error. — *the code generator: builtinPrimitive rewrite*; kind: **property**; overlap: compiler.md:108-111; checks: sound (scout).
6. Every other body stays a `builtinPrimitive` call, typed at its return type, and a compile refuses it: outside the package, varargs (row 849), local functions and object expressions (row 865), components importing a grammar (row 884). — *the code generator: builtinPrimitive rewrite*; kind: **defect** (rows 849, 865, 884); overlap: compiler.md:108-123 (same rows); checks: stale: row 849 is CONTESTED, given without a status word (status disagrees); 865, 884 NEGATIVE-VERIFIED (scout).
7. One static flag that the JVM's newest repository sets switches the rewrite, so `parse` and `api` rewrite only after a compile in the same JVM (row 882), and a component is parsed four times (row 883). — *the code generator: builtinPrimitive rewrite*; kind: **defect** (rows 882, 883); overlap: compiler.md:112 (row 882); checks: rows NEGATIVE-VERIFIED (scout).
8. F-308 gives the transfers and their limits (rows 885, 886); F-301 the bytes. — kind: **pointer**.
9. The skill's `compiler.md`, "Natives", gives the messages. — kind: **pointer**.
10. Tests: `NativeHelperBindingCompiled` and four refusal tests; `NamingCzarJUTest.testForeignOneLibrary`. — kind: **tests**; checks: found except the JUnit test, not searched (scout).
11. Detail in `rung-natives-compiled` report. — kind: **pointer**.

- Shape: several subjects (the code generator: builtinPrimitive rewrite; the checker: native helper typing), much of it in the skill.
- Title: claim 1; the body serves it, with its defects.

## F-299 "Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 373 of the one library's 401 live bindings name one"

1. Walk loads a `builtinPrimitive` string that names a helper beside its glue classes. — *walk: native helper loader*; kind: **property**; overlap: interpreter.md:114-124; checks: `StaticNativeApp.java` found (scout).
2. 373 of the one library's 401 live bindings name a helper. — *the library: native binding counts*; kind: **property** (a count that each landing changes); overlap: F-32 ("28 of the one library's 401 live native bindings still name" glue); checks: stale: 372 with the package, 402 without (false today).
3. It builds P-58; F-298 gives the compiled half. — kind: **pointer**.
4. The loader calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. — *walk: native helper loader*; kind: **property**; overlap: interpreter.md:114-124, F-24 (a native can raise a Fortress exception); checks: sound (scout).
5. It refuses at load a string naming no helper or fitting none, and a declared type no Java type carries. — *walk: native helper loader*; kind: **property**; overlap: interpreter.md; checks: refusal tests found (scout).
6. For 15 names it runs walk's own operations instead: `OWN_OPERATIONS`'s eight, and `arrayOps`' seven by one rule. — *walk: native helper loader*; kind: **property**; overlap: F-328 (`typeName`, `sEquiv`), F-335 (`runtime`'s six), F-333 (`arrayOps`); checks: `NativeApp.java` found (scout).
7. The library's own `FlatString`, identified by its component, carries `self` in a Java `String`; a program's own `FlatString` or `JavaString` carries none. — *walk: native helper loader*; kind: **property**; overlap: interpreter.md:121, F-322; checks: sound (scout).
8. The skill's `interpreter.md`, "Natives", gives the carriers, messages, the refusal of a `String` parameter and the loader's departures (rows 864, 551, 846). — kind: **pointer**; checks: rows NEGATIVE-VERIFIED (scout).
9. The 373 by type, each with its entry (F-303 to F-337). — *the library: native binding counts*; kind: **detail**.
10. The other 28 name glue classes, `Reflect`'s (F-32). — *the library: native binding counts*; kind: **pointer**.
11. Fourteen tests named, and "the entries of the other families name their own tests". — kind: **tests**; checks: found (scout).
12. Detail in five reports. — kind: **pointer**.

- Shape: several subjects (walk: native helper loader; the library: native binding counts).
- Title: a loader property and a count; the body serves both, and claim 9 indexes the family entries. Cited by 15 entries and P-162, P-169 (scout).

## F-303 "Walk carries `RR64` in a Java `double`"

1. Walk carries `RR64` in a Java `double`, so a helper binding with an `RR64` parameter or result loads. — *walk: native helper loader*; kind: **property**; overlap: interpreter.md:120, F-310 (the `float` for `RR32`), F-311 ("walk carries an `RR64` in a `double` (F-303)"); checks: `StaticNativeApp.java:64` agrees (scout).
2. A type named `Float` is undefined. — *the library: number types*; kind: **property**; overlap: F-311 ("`Float`, a name that is gone"), revival-changes.md:91; checks: sound (scout).
3. The object `RR64`'s 61 bindings and the top-level `fromRawBits` name `simpleDoubleArith`'s helpers. — *the library: native bindings of RR64*; kind: **property**; overlap: F-299 (counts `RR64` 61); checks: `:384`, `:4790` agree, range not walked (scout).
4. Every value they give under walk is the glue classes'. — *the library: native bindings of RR64*; kind: **property**; overlap: none found (the same claim per family in F-306, F-307, F-310, F-311, F-312, F-313, F-314); checks: sound (scout).
5. The 61, named. — *the library: native bindings of RR64*; kind: **detail**.
6. F-299 counts the bindings that name a helper. — kind: **pointer**.
7. Five tests. — kind: **tests**; checks: found (scout).
8. Detail in three reports. — kind: **pointer**.

- Shape: several subjects (walk: native helper loader; the library: native bindings of RR64).
- Title: claims 1, 3 and 4; the body serves it.

## F-306 "Under walk, 26 native bindings of the object `ZZ64` and 22 of the object `ZZ` name helpers"

1. Under walk, 26 bindings of `ZZ64` and 22 of `ZZ` name helpers of `nativeHelpers/`. — *the library: native bindings of integers*; kind: **property**; overlap: F-299 (counts `ZZ64` 31 and `ZZ` 28, for all bindings); checks: `:951`, `:1170` agree; counts not re-counted (scout).
2. They keep every value the glue classes gave. — *the library: native bindings of integers*; kind: **property**; overlap: the same per-family claim in F-303, F-307, F-310 and others; checks: sound (scout).
3. Their `DIV` by zero throws `DivisionByZero`. — *the library: integer division by zero*; kind: **property**; overlap: F-312 (`REM`, `MOD`), F-308 (`NN32`, `NN64`), F-24, interpreter.md:148; checks: sound (scout).
4. The 48 name 29 helpers that the prelude binds for the same operations and 11 new ones (F-312, F-314). — *the library: native bindings of integers*; kind: **detail**.
5. `ZZ64`'s four wrapping bindings name the prelude's wrapping helpers under its `BOX` spellings (row 348). — *the library: wrapping operators*; kind: **defect** (row 348); overlap: F-32 and F-130 (row 348); checks: row 348 NEGATIVE-VERIFIED (scout).
6. `longOverflowingDiv` and `div` raise the library's `DivisionByZero` under walk (F-24). — *the library: integer division by zero*; kind: **detail**.
7. A `ZZ` helper takes only a `ZZ` value, walk's `FBigNum`, since walk's loader unboxes by `getBigInteger`; walk's coercions convert other operands first. — *walk: native helper loader*; kind: **property**; overlap: none found (searched `getBigInteger`); checks: sound (scout).
8. Four tests. — kind: **tests**; checks: found (scout).
9. Detail in `rung-natives-integers` report. — kind: **pointer**.

- Shape: several subjects (the library: native bindings of integers; the library: integer division by zero; walk: native helper loader).
- Title: claims 1 to 3; the body serves it.

## F-307 "The small rest's eight native bindings name their helpers of `nativeHelpers/`"

1. The small rest's eight bindings (`ZZ64`'s and `ZZ`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint`, top-level `char`) name helpers, with walk's values unchanged. — *the library: native bindings of integers*; kind: **property**; overlap: F-299 ("the small rest 8 (F-307)"); checks: sound (scout).
2. Their places in `FortressLibrary.fss` and `FortressBuiltin.fss`. — kind: **detail**.
3. The four over `NN32`, `NN64` and `Char` name the special names the checker reads at those types (`NamingCzar.java:371-382`). — *the checker: native helper typing*; kind: **property**; overlap: F-308 (the transfers), compiler.md:127; checks: stale: the special names run `:371-380` (cites a thing that moved).
4. `signed` above the signed half wraps, as a low-bits name does (F-331). — *the library: number conversions*; kind: **property**; overlap: F-331 (low-bits names), revival-changes.md:110; checks: sound (scout).
5. `char` keeps a code point outside 0 to 1114111, as the glue classes did (row 857). — *the library: number conversions*; kind: **defect** (row 857); overlap: none found (searched "row 857", "1114111"); checks: row 857 NEGATIVE-VERIFIED (scout).
6. The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` beside overloads over `String` (F-299). — *the library: native bindings of strings*; kind: **property**; overlap: F-299 (same sentence); checks: sound (scout).
7. Two tests. — kind: **tests**; checks: found (scout).
8. Detail in `rung-natives-small` report. — kind: **pointer**.

- Shape: one subject (the library: native bindings of integers), with the conversions' edge cases.
- Title: claim 1; the body serves it, except claim 6, which F-299 says.

## F-308 "A `builtinPrimitive` binding over `NN32`, `NN64` or `Char` ... compiles on the compiled path through the six transfer helpers"

1. A binding over `NN32`, `NN64` or `Char` whose helper uses a Java `int` or `long` compiles through the six transfer helpers, as the prelude does; walk needs none. — *the code generator: builtinPrimitive rewrite*; kind: **property**; overlap: compiler.md:127 (six transfer helpers), F-313 (`NN64` argument transfer), F-312; checks: sound (scout).
2. `NN32`'s 30, `NN64`'s 30 (F-299 counts 31 of 32) and `Char`'s 40 bindings name helpers. — *the library: native binding counts*; kind: **detail**; overlap: F-299 (different count for `NN64`); checks: not re-counted (scout).
3. A helper overloaded at its arity gets no transfer (row 885), nor does `self` in a generic owner; the declared type is read by its simple name (row 886). — *the code generator: builtinPrimitive rewrite*; kind: **defect** (rows 885, 886); overlap: F-313 (row 886); checks: rows NEGATIVE-VERIFIED (scout).
4. The transfers are identities, so the checker passes whatever the helper computes: a binding over `NN32` to the signed `intLT` answers `true` for 2^31 < 1. — *the checker: native helper typing*; kind: **property**; overlap: compiler.md:127 (same example); checks: sound (scout).
5. Only the walk and compiled guards check that each names the unsigned helper, but `Char`'s `asExprString` and F-327's six. — *the library: native bindings of unsigned types*; kind: **property**; overlap: none found (searched "guards"); checks: sound (scout).
6. Under walk those 93 keep the glue's values, but `NN32`'s and `NN64`'s `DIV`, `REM` and `MOD` by zero throw `DivisionByZero`. — *the library: integer division by zero*; kind: **property**; overlap: F-306, F-312, interpreter.md:148; checks: sound (scout).
7. All 100 bindings over these types name helpers, `NN64`'s `asFloat` among them; `Char`'s `asExprString` names `charToExprString` (F-329). — *the library: native bindings of unsigned types*; kind: **property**; overlap: F-313 (`NN64`'s `asFloat`); checks: not re-counted (scout).
8. The skill's `compiler.md` names the transfers. — kind: **pointer**.
9. Eleven tests and guards. — kind: **tests**; checks: found (scout).
10. Detail in batch 27's record and `rung-natives-hard`. — kind: **pointer**.

- Shape: several subjects (the code generator: builtinPrimitive rewrite; the checker: native helper typing; the library: native bindings of unsigned types).
- Title: claim 1 with a count; the body serves it.

## F-309 "`ForeignJava` reads every public method of a helper class once per JVM"

1. `ForeignJava` reads every public method of a helper class once per JVM, at the first import of any of them, and keeps that reading. — *the compiled runtime: native wrappers*; kind: **property**; overlap: F-180 and F-322 (name `ForeignJava`), build-and-caches.md:57; checks: `ForeignJava.java` found (scout).
2. Each compile that builds the foreign api writes the class's wrapper in `nativewrapper_cache/` anew. — *the compiled runtime: native wrappers*; kind: **property**; overlap: F-301 (generated wrapper), build-and-caches.md:57; checks: cache folder found (scout).
3. So a helper's Fortress type must not depend on which binding names it, or the first import decides the type and shared compiled code breaks. — *the compiled runtime: native wrappers*; kind: **property** (a constraint on design); overlap: none found; checks: none.
4. The probe found no defect in the tree; every reader of a helper reads it alike. — *the compiled runtime: native wrappers*; kind: **property**; overlap: none found; checks: none.
5. Observed with a prototype that read a helper at its binding's types: the reading changed with import order, and `javap` showed the wrapper rewritten. — kind: **history**.
6. No test checks it. — kind: **detail**.
7. Detail in `plan-24/probes/hard-set.md` 4.2. — kind: **pointer**.

- Shape: one subject (the compiled runtime: native wrappers).
- Title: claims 1 and 2; the body serves it with the design rule. Cited by none (scout).

## F-310 "Each of value object `RR32`'s 51 native bindings names a helper"

1. Each of `RR32`'s 51 bindings names a helper, and every value under walk is the glue class `RR32`'s. — *the library: native bindings of RR32*; kind: **property**; overlap: F-299 ("`RR32` 51 (F-310 ...)"), per-family claim as F-303; checks: sound (scout).
2. 50 name 47 helpers of `simpleFloatArith` over a Java `float`: walk carries `RR32` in a `float` and the checker reads a `float` as `RR32`, so each fits as a bare string. — *walk: native helper loader*; kind: **property**; overlap: F-303 (the `double` carrier), interpreter.md:120; checks: `StaticNativeApp.java:65` agrees (scout).
3. The distance stage checks each binding. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-53; checks: sound (scout).
4. Shared helpers: `floatToString`, `floatMul`; `^` at an `RR64` names `floatPowDouble` (F-323). — kind: **detail**.
5. The 51st, `asFloat`, names `floatToDouble` at `RR64` (F-311). — kind: **pointer**.
6. No file of the prelude imports `simpleFloatArith`. — *the repository: compiler's prelude*; kind: **property**; overlap: none found (searched `simpleFloatArith`); checks: sound (scout).
7. F-299 counts the bindings. — kind: **pointer**.
8. Two tests. — kind: **tests**; checks: found (scout).
9. Detail in `rung-natives-rr32` report. — kind: **pointer**.

- Shape: one subject (the library: native bindings of RR32), with the walk carrier.
- Title: claim 1; the body serves it.

## F-311 "`ZZ32`'s, `RR32`'s, `NN32`'s, `ZZ64`'s and `ZZ`'s `asFloat` answer `RR64`"

1. The five types' `asFloat` answer `RR64`, as each type's own api declares (F-324). — *the library: number conversions*; kind: **property**; overlap: F-324 (each number type declares its own `asFloat`), F-323, revival-changes.md:112, library.md:23; checks: sound (scout).
2. They name `intToDouble`, `floatToDouble`, `unsignedIntToDouble`, `longToDouble` and `toDouble`, with walk's values unchanged. — *the library: native bindings of numbers*; kind: **property**; overlap: F-308 (`NN64`'s `asFloat`), F-310; checks: sound (scout).
3. The specification: `numbers.tex:61`. — kind: **pointer**; checks: agrees (scout).
4. The team declared the result `Float`, a name that is gone; walk carries `RR64` in a `double` (F-303). — kind: **history**.
5. `longToDouble` and `toDouble` are new, `(double) a` and `a.doubleValue()`. — kind: **detail**.
6. Two tests. — kind: **tests**; checks: found (scout).
7. Detail in `rung-natives-asfloat` report. — kind: **pointer**.

- Shape: one subject (the library: number conversions).
- Title: claims 1 and 2; the body serves it.

## F-312 "`REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` name helpers ... on both paths"

1. `REM` and `MOD` on the five integer types name helpers on both paths and keep every value the glue gave. — *the library: native bindings of integers*; kind: **property**; overlap: F-306 ("four of `REM` and `MOD` (F-312)"); checks: lines agree (scout).
2. They throw `DivisionByZero` at a zero divisor. — *the library: integer division by zero*; kind: **property**; overlap: F-306, F-308, F-24, interpreter.md:148; checks: tests found (scout).
3. The ten bindings and the helpers they name, the unsigned ones through F-308's transfers. — kind: **detail**.
4. `REM` is the remainder of truncating division, `MOD` of floor division with the divisor's sign, and on the naturals `MOD` equals `REM`. — *the library: integer division*; kind: **property**; overlap: none found (searched "floor division"; revival-changes.md:101 lists `REM` and `MOD`); checks: sound (scout).
5. A compiled helper raises `DivisionByZero` by its simple name, which `LibraryNames` maps to the compiled library's class (F-336); walk raises the library's (F-24). — *the compiled runtime: native helper raises*; kind: **property**; overlap: F-336 (a compiled helper's raise builds the library's exception), F-24; checks: sound (scout).
6. 626 printed pairs are the old code's. — kind: **detail**.
7. Seven tests. — kind: **tests**; checks: found (scout).
8. Detail in `rung-natives-remainders` report. — kind: **pointer**.

- Shape: several subjects (the library: native bindings of integers; the library: integer division by zero; the compiled runtime: native helper raises).
- Title: claims 1 and 2; the body serves it.

## F-313 "The compiled path prints an `NN32` or `NN64` unsigned and negates an `NN64` by wrapping"

1. The compiled path prints an `NN32` or `NN64` unsigned and negates an `NN64` by wrapping. — *the compiled runtime: unsigned numbers*; kind: **property**; overlap: none found (searched `unsignedLongToString`, `unsignedLongWrappingNeg`); checks: sound (scout).
2. So `NN64`'s `asString`, `asExprString`, `asFloat` and prefix `DOTMINUS` and `NN32`'s `CHOOSE` name helpers. — *the library: native bindings of unsigned types*; kind: **property**; overlap: F-308 (all 100 bindings over these types name helpers), F-305 (`CHOOSE`); checks: sound (scout).
3. The helpers named and what each answers, `unsignedLongToDouble` ties to even as walk's glue. — kind: **detail**.
4. The rewrite reads an argument declared `NN64` through the argument transfer (`BuiltinPrimitiveRewriter.java:189`). — *the code generator: builtinPrimitive rewrite*; kind: **detail**; checks: agrees (scout).
5. A program's own trait `UnsignedLong` takes no transfer (row 886). — *the code generator: builtinPrimitive rewrite*; kind: **defect** (row 886); overlap: F-308 (row 886); checks: row 886 NEGATIVE-VERIFIED (scout).
6. Under walk these keep the glue's values; on the compiled path the prelude's `NN64` printing and prefix `BOXMINUS` move with the helpers. — *the compiled runtime: unsigned numbers*; kind: **property**; overlap: none found; checks: sound (scout).
7. Five tests. — kind: **tests**; checks: found (scout).
8. Detail in `rung-natives-unsigned` report. — kind: **pointer**.

- Shape: several subjects (the compiled runtime: unsigned numbers; the library: native bindings of unsigned types; the code generator: builtinPrimitive rewrite).
- Title: claim 1; the body serves it. Cited by P-38 (scout).

## F-314 "Under walk, `GCD` and `LCM` on the five integer types ... name 18 new helpers"

1. Under walk, `GCD` and `LCM` on the five integer types, `partitionL` on the fixed widths, `CHOOSE` on `NN64` and `ZZ`, `ZZ`'s `cmp` and `nanoTime` name 18 new helpers, which keep the glue's values and share no state. — *the library: native bindings of integers*; kind: **property**; overlap: F-306 ("seven of the divisors, `ZZ`'s `CHOOSE` and `cmp` (F-314)"), F-305 (`CHOOSE` on `ZZ32`, `ZZ64`, "shares no state"); checks: sound (scout).
2. It builds P-58, P-70 and P-73. — kind: **pointer**.
3. Where the helpers stand, and that the fixed widths share one unsigned Euclid's algorithm. — kind: **detail**.
4. `nanoTime` answers `ZZ64` through a `long`, which the compiled checker reads as `ZZ64` (row 75). — *the checker: native helper typing*; kind: **defect** (row 75); overlap: none found for row 75's subject (the search "row 75" also hits rows 750 to 759); checks: row 75 NEGATIVE-VERIFIED (scout).
5. `ZZ`'s `CHOOSE` keeps the 1 of walk's former `BigNum.choose` at `k < 0` or `k > n`, where the specification gives 0 (row 887). — *the library: integer division*; kind: **defect** (row 887); overlap: F-316 ("on the four fixed widths `n CHOOSE k` answers 0 for `k < 0` or `k > n`", row 887); checks: row 887 NEGATIVE-VERIFIED (scout).
6. Two tests. — kind: **tests**; checks: found (scout).
7. Detail in `rung-natives-divisors` report. — kind: **pointer**; checks: its "5. Old against new" heading not checked (scout).

- Shape: one subject (the library: native bindings of integers), with two defects.
- Title: claim 1; the body serves it.

## F-315 "The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`"

1. The code generator compiles a trait or object that extends a generic trait at `Any`. — *the code generator: Any static arguments*; kind: **property**; overlap: F-268 (same, same test), compiler.md:84; checks: test found (scout).
2. It compiles a `try` with a `forbid` clause: an unhandled listed exception is rethrown as a `ForbiddenException` chained to it. — *the code generator: try and forbid*; kind: **property**; overlap: compiler.md:139, F-374 names forbid; checks: test found (scout).
3. The `finally` clause does not run then (row 890). — *the code generator: try and forbid*; kind: **defect** (row 890); overlap: F-373 (row 890); checks: row 890 NEGATIVE-VERIFIED (scout).
4. The guard of modifiers admits `test` and `override` (`CodeGen.java:3462-3465`, `fnDeclCompilableModifiers`). — *the code generator: modifiers*; kind: **detail**; checks: stale: `:3462-3465` is a parameter loop; the guard is at `:3469` (cites a thing that moved).
5. A method declared `test` compiled and ran in one probe, and no test gates it. — *the code generator: modifiers*; kind: **property** (observed once); overlap: none found (searched `TestModifier`); checks: none.
6. `Bottom`, `Self` or an abbreviated type at that static argument, and a tuple that holds `Any` (row 889), are still refused. — *the code generator: Any static arguments*; kind: **defect** (row 889); overlap: F-268 (row 889); checks: row 889 NEGATIVE-VERIFIED (scout).
7. The `override` modifier compiles (F-400). — kind: **pointer**.
8. The library's `test stringifyChars` is emitted in F-34's measure, since varargs compile under the one library (F-390). — *the code generator: library declarations*; kind: **pointer**.
9. F-34 gives what the code generator still refuses. — kind: **pointer**.
10. Four tests. — kind: **tests**; checks: found (scout).
11. Detail in `rung-codegen-walls` report and batch 25's review. — kind: **pointer**.

- Shape: several subjects (the code generator: Any static arguments; the code generator: try and forbid; the code generator: modifiers).
- Title: three unrelated constructs that one rung opened; the body serves each.

## F-320 "The code generator compiles a block's local functions as closures"

1. The code generator compiles a block's local functions as closures, recursive and mutually recursive without a mutable cell. — *the code generator: local functions*; kind: **property**; overlap: compiler.md:55-58 (same); checks: sound (scout).
2. Each is a closure class bound under its name; it reaches itself as `this` and siblings through fields the block sets once before the body runs. — *the code generator: local functions*; kind: **property**; overlap: compiler.md:55-58; checks: sound (scout).
3. It refuses, after the checker passes, local functions with own static parameters, two of one name, and `atomic` (row 304). — *the code generator: local functions*; kind: **defect** (row 304); overlap: compiler.md:55-58; none in FACTS (searched "row 304"); checks: row 304 NEGATIVE-VERIFIED (scout).
4. A varargs one stops against the prelude and compiles under the one library (F-390). — *the code generator: local functions*; kind: **property**; overlap: F-390 (varargs under the one library); checks: sound (scout).
5. By F-34's measure on `dbf4825e0`'s code, once, all nine library declarations that stopped at 'Can't compile LetFn' emit. — *the code generator: library declarations*; kind: **history**; checks: not re-run (scout).
6. Gated by five tests, their walk guards and three refusal tests. — kind: **tests**; checks: found (scout).
7. Detail in `rung-codegen-local-functions` report. — kind: **pointer**.

- Shape: one subject (the code generator: local functions).
- Title: claim 1; the body serves it.

## F-321 "Against the interpreter's prelude the checker reads the whole helper class that a binding names"

1. The checker reads the whole helper class that a binding names, so a binding of a `systemOps` helper fails it. — *the checker: native helper typing*; kind: **property**; overlap: compiler.md:129 (same, citing F-321); checks: sound (scout).
2. `systemOps.getArgs` answers an `FStringVector`, which `NamingCzar` maps to `FortressBuiltin.StringVector`, undeclared in the interpreter's `FortressBuiltin`, so the component stops. — *the checker: native helper typing*; kind: **defect** (no row); overlap: F-353 and F-183 name `StringVector` on other points; checks: `systemOps.java:24`, `NamingCzar.java:339` agree (scout).
3. A binding passes only where every method of its class maps to the one library's types; `FlatString`'s line separator names `stringOps.lineSeparator` for this. — *the library: native bindings of strings*; kind: **property**; overlap: none found (searched `lineSeparator`); checks: sound (scout).
4. No binding of the one library names `systemOps`: `System`'s `getEnvironment`, `getProperty` name `stringOps`, its `args` names `programArgs` (F-337). — *the library: native bindings of strings*; kind: **property**; overlap: F-337 (`programArgs`); checks: sound (scout).
5. `CompilerSystem` still imports `systemOps`' `getArgs` and `getProperty`. — *the repository: CompilerSystem*; kind: **property**; overlap: F-293 (`CompilerSystem`); checks: `CompilerSystem.fss:13` agrees (scout).
6. Checked alone on `ee14222d`, the checker over `System` against the one library reports no error; neither stage reads `System`. — *the checker: the rest of the library*; kind: **detail**; overlap: F-290 ("`System` reads no error (F-321)").
7. No test checks it; the compiled tests use the prelude, which declares `StringVector`. — kind: **detail**.
8. Shown by the distance stage with `natLineSeparator` naming `systemOps.lineSeparator`, quoting its two messages. — kind: **history**.
9. Detail in two reports. — kind: **pointer**.

- Shape: one subject (the checker: native helper typing), with library and `CompilerSystem` facts.
- Title: claim 1; the body serves it. Cited by P-164 and P-170 (scout).

## F-322 "The compiled checker reads a helper's Java `String` parameter as the one library's `String`"

1. The checker reads a helper's Java `String` parameter as the one library's `String`. — *the checker: native helper typing*; kind: **property**; overlap: F-298 ("reads the Java types as the one library's"), compiler.md:123; checks: `NamingCzar.java:472` found (scout).
2. Walk refuses a helper parameter declared `String` at load, since a Java `String` cannot carry a string that is not flat (F-299). — *walk: native helper loader*; kind: **property**; overlap: F-299, interpreter.md:121; checks: sound (scout).
3. So the count and distance stages pass a binding that walk refuses. — *the checker: native helper typing*; kind: **defect** (no row); overlap: none found (searched "walk refuses"); checks: none.
4. The two readings differ, which bears on the design of the switch-over. — *the checker: native helper typing*; kind: **plan**.
5. Read in the code. — kind: **detail**.
6. Detail in `rung-string-natives` "Decisions" item 2 and a review. — kind: **pointer**.

- Shape: one subject (the checker: native helper typing), mostly a defect.
- Title: claim 1 with claim 3; the body serves it. Cited by none (scout).

## F-323 "The floats' natives over `Number` and `AnyIntegral` are declared at `RR64` or convert in Fortress"

1. The floats' natives over `Number` and `AnyIntegral` are declared at `RR64` or convert in Fortress. — *the library: native bindings of RR64*; kind: **property**; overlap: F-327 (the integers' shifts and powers convert in Fortress); checks: sound (scout).
2. Group 3's six name one-line helpers. — *the library: native bindings of RR64*; kind: **property**; overlap: none found; checks: sound (scout).
3. `random`, `atan2`, `printThreadInfo` and `^` take an `RR64`, which coercion reaches from `ZZ32`, `RR32` or a numeral; another type writes `asFloat(x)`. — *the library: number conversions*; kind: **property**; overlap: F-311, F-324 (`asFloat`), revival-changes.md:112; checks: sound (scout).
4. P-165 names the getter `x.asRR64`, which no type declares (no row). — *the library: number conversions*; kind: **defect** (no row); overlap: F-324 (`asRR64`); checks: entry says no row (scout).
5. `RR64`'s power over `AnyIntegral` converts its exponent by `asFloat` around a bare `^` at `ZZ32` on `doublePowInt` (P-162). — *the library: native bindings of RR64*; kind: **property**; overlap: F-327 (powers over `AnyIntegral` call bare bindings); checks: sound (scout).
6. The mixed powers, floor and ceiling brackets, and `FlatString`'s `=` and `flatConcat` at a `Char` name new helpers that compute as their glue did. — *the library: native bindings of numbers*; kind: **property**; overlap: none found; checks: sound (scout).
7. `flatConcat` past U+FFFF keeps the low 16 bits (row 872). — *the library: native bindings of strings*; kind: **defect** (row 872); overlap: none found (searched "row 872"); checks: row 872 NEGATIVE-VERIFIED (scout).
8. `printThreadInfo` at `RR64` is Fortress through `asString`, so a numeral prints as `3.0`. — *the library: native bindings of RR64*; kind: **property**; overlap: F-299 (`printThreadInfo` native over `FlatString`); checks: sound (scout).
9. F-299 and F-32 give the counts. — kind: **pointer**.
10. Three tests. — kind: **tests**; checks: found (scout).
11. Detail in `rung-natives-float-number` report. — kind: **pointer**.

- Shape: several subjects (the library: native bindings of RR64; the library: number conversions; the library: native bindings of strings).
- Title: claims 1 and 2; the body serves it, but `FlatString`'s helpers (claims 6 and 7) answer another question.

## Lists

### Subject labels and their entries

- the checker: operator overloading check: F-281
- the checker: export check: F-281, F-282, F-287, F-288, F-294, F-297
- the checker: imports: F-281
- the checker: where clauses: F-281
- the checker: expected type and inference: F-285
- the checker: implicit bound Any: F-292, F-296
- the checker: default imports: F-293
- the checker: native helper typing: F-298, F-307, F-308, F-314, F-321, F-322
- the checker: the rest of the library: F-290, F-321
- the code generator: comprises clauses: F-281
- the code generator: builtinPrimitive rewrite: F-298, F-308, F-313
- the code generator: implicit bound Any: F-296
- the code generator: Any static arguments: F-315
- the code generator: try and forbid: F-315
- the code generator: modifiers: F-315
- the code generator: local functions: F-320
- the code generator: library declarations: F-315, F-320
- the compiled runtime: native wrappers: F-309
- the compiled runtime: native helper raises: F-312
- the compiled runtime: unsigned numbers: F-313
- walk: reduction instantiation: F-285
- walk: export check: F-297
- walk: native helper loader: F-299, F-303, F-306, F-310, F-322
- the library: export alignment: F-282, F-286, F-287, F-297
- the library: big operator static arguments: F-285
- the library: string objects: F-286
- the library: List: F-288
- the library: Avl: F-290
- the library: native binding counts: F-299, F-308
- the library: number types: F-303
- the library: native bindings of RR64: F-303, F-323
- the library: native bindings of RR32: F-310
- the library: native bindings of integers: F-306, F-307, F-312, F-314
- the library: native bindings of unsigned types: F-308, F-313
- the library: native bindings of numbers: F-311, F-323
- the library: native bindings of strings: F-307, F-321, F-323
- the library: integer division by zero: F-306, F-308, F-312
- the library: integer division: F-312, F-314
- the library: number conversions: F-307, F-311, F-323
- the library: wrapping operators: F-306
- the specification: export rule: F-294
- the harness and the gate: distance and count: F-281, F-282, F-285, F-286, F-288, F-289, F-290, F-310
- the harness and the gate: compiled tracks: F-292
- the tools: distance stage: F-289
- the repository: CompilerSystem: F-292, F-293, F-321
- the repository: compiler's prelude: F-310

### Entries that overlap

- The export check and its abstract members: F-282, F-294 and F-297 (the rule, row 842); F-282, F-286 and F-297 (the library's abstract members, counted 66, 14 and 12); F-282, F-288 and F-294 (row 839); F-287 and F-294 (row 834); F-281, F-282 and F-287 (operators under their declared names).
- Every operator checked: F-281, F-245, F-81 and F-278.
- The bound `Any`: F-289 and F-296 (the distance stage's setting, `Shell.java:378`); F-292 and F-296 (`T extends Object` for the prelude's `||`); F-296 and F-291 (row 339, tuple and arrow arguments).
- The distance's components: F-288, F-53 and F-290 (fourteen, `CovariantCollection`, `OneShotFlag`), against "twelve" in F-285, F-287, F-289, F-290 and F-296.
- `CompilerSystem`: F-292 (23 `.test` files), F-293 (27 programs) and F-321.
- Written static arguments: F-285, F-59 and F-85 (the library writes them; the fused arm's `cast[\O0\]`).
- The native helpers' typing: F-298, F-322 and F-308 (the checker reads Java types as the one library's; the transfers; `intLT`), and the skill's `compiler.md` "Natives".
- Walk's native loader: F-299, F-303, F-310 and F-322 (the carriers, the refusal of a `String` parameter), and `interpreter.md` "Natives".
- The binding counts: F-299 against F-32 (401 live bindings), F-303, F-306, F-307, F-308 (`NN64` 30 or 31) and F-310.
- "Keeps every value the glue classes gave": F-303, F-306, F-307, F-310, F-311, F-312, F-313, F-314, F-323.
- Division by zero: F-306, F-308, F-312, F-24 and F-336.
- `CHOOSE` and divisors: F-314, F-305 and F-316 (row 887).
- `asFloat` and `asRR64`: F-311, F-323 and F-324.
- Code generator at `Any`: F-315 and F-268 (same tests, row 889).
- Row 886: F-308 and F-313.

### Not settled by the search

- F-290 and F-292: their counts (624, 92, 25; 86, 263, 1318) are of one tree each and were not re-measured (scout).
- F-308: the counts 30, 30, 40, 93 and 100, and its 30 against F-299's 31 for `NN64`, were not re-counted (scout).
- F-298: `NamingCzarJUTest.testForeignOneLibrary` was not searched (scout).
- F-309: no test; the design rule rests on one probe with a prototype; nothing today shows it.
- F-315, claim 5: a `test` method compiled once in a probe, with no test.
- F-320, claim 5: F-34's measure on `dbf4825e0` was not re-run.
- F-321, claim 2, and F-322, claim 3: defects that no ledger row holds; the search found no row for either.
- F-314, claim 4: row 75's subject could not be told apart by the search, since "row 75" also matches rows 750 to 759.
- F-299: the count 373 of 401 is false today (372 and 402); which bindings moved was not traced.
