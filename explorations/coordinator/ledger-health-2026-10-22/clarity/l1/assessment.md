<!-- The ledger clarity run's chunk l1 (rows 8, 20, 25, 71, 75, 101, 219, 268, 305, 307, 314, 316): each row judged by the record rubric's six checks at 63e420a33, with its disposition and the evidence read. -->

# Chunk l1: assessment

Base: `63e420a33` (HEAD). Nothing was built or run. Marks: P pass, F fail, U unresolved. Sc scope, Pr present meaning, Ev evidence, Co comprehension, Ow ownership, Cn consistency.

| Row | Sc | Pr | Ev | Co | Ow | Cn | Disposition |
|---|---|---|---|---|---|---|---|
| 8 | P | P | P | P | P | P | keep |
| 20 | F | F | F | F | P | F | rewrite |
| 25 | P | F | F | F | P | F | rewrite |
| 71 | F | F | F | F | P | F | rewrite |
| 75 | P | P | F | F | P | P | rewrite |
| 101 | F | P | P | P | P | P | rewrite |
| 219 | U | U | F | P | P | F | investigate |
| 268 | F | P | F | P | P | P | rewrite |
| 305 | P | P | F | F | P | F | rewrite |
| 307 | F | F | F | P | F | F | rewrite |
| 314 | P | F | F | F | F | F | rewrite |
| 316 | P | F | P | F | F | P | rewrite |

Counts: keep 1, rewrite 10, close 0, investigate 1.

## Row 8

- All six pass.
- Sc, Pr: the parser is unchanged since the team except for build timestamps (`git log --oneline a874948ac..HEAD -- ProjectFortress/src/com/sun/fortress/parser/` prints only `3c4dcdabc` and `8fe1daa8f`). `Keyword.rats:28-49` lists `value`, `at`, `type`, `unit`, `of`, `most`, `label` among the keywords.
- Ev: the spec cell's "86 reserved words" holds: `SpecData/tables/fortress-keywords` holds 79 words and `fortress-unitOperators` 7 (`cubed cubic in inverse per square squared`), the two lists that `basic/lexical-structure.tex:776-785` calls reserved words. The health check's open point (REPORT section 2, "row 8 says 86 ... but ... 79") is settled so. The probe `g08.fss` (`value = 3`) is readable at `e879b6a44^`.
- Co, Ow: the `label`-parameter diagnostic is a consequence of the reserved word, kept with it. "Run C's row 148 is merged here" is the pointer that the template's "148 is vacant" needs.
- Cn: sibling 262 lists `at` and `wrapped` as keywords, agreeing.

## Row 20

- Sc F: "an aggregate's element type is computed from the elements' **runtime class**": a list comprehension now takes a local's or a function's declared type (F-228; `ProjectFortress/tests/UnwrittenComprehensionDeclaredTypeWalk.fss`, whose comment says "instantiated by that type"). The claim no longer holds for every aggregate; it holds for a list display, and for a comprehension that no declared type directs.
- Pr F: "explicit `[\T\]` ascriptions are mandatory in data/plumbing code" reads as true of comprehensions too; it is not, at a declared type.
- Ev F: "`explorations/spec-probes/p1_infer.fss` infers when the runtime class *is* the target" and `c11_object_model.fss` are gone and the row does not say where to read them (signals: `probe-unexplained`). The probe that failed, `p2_ascribe.fss`, is not named; it is at `e879b6a44^` and asserts the three faces (a binding `g: List[\RR64\] = <| 1.0, 1.0 |>`, a constructor's argument, a call's argument).
- Co F: "so the defect is the missing join, not the ascription": walk does take the join of a varargs call's elements (revival-changes, "Walk does not promote the elements of a tuple or varargs: it takes their join (rows 395, 511)"). The defect is that a numeral's run-time class is `FloatLiteral` or `Int` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44`; F-74) and that a declared type does not fix a call's static argument (F-55, row 510, gated by `tests/XXXInferExpectedTypeRungK`).
- Cn F: "probe and full text: history, row 20 A set comprehension shows it too: row 646." Text after the marker, and row 646 is FIXED (`20474c144`).
- Why rewrite, not investigate (the health check said investigate): the rules that decide the display's case are each in the record now and each gated: the display is the varargs call `opr <|[\E\] xs: E... |>` (`Library/List.fsi:112`), which walk instantiates at the join (row 511); a typed binding does not fix `E` (F-55, row 510, `XXXInferExpectedTypeRungK`); `List` declares no coercion (`grep coerce Library/List.fs*` is empty). F-228, written after the comprehension repair, still names row 20 open: "a comprehension that no declared type reaches is built at its elements' run-time class ... (rows 20, 717)". The team's own test of the repair writes `<|[\ZZ32\] 0, 2, 4|>` for its expected lists. The display at a declared type was not run at `HEAD`; the checker may prefer investigate, with `questions.md`'s form.
- Evidence read: `Library/List.fsi:112-115`; `FortressBuiltin.fsi:44`; F-55, F-74, F-137, F-143, F-228; rows 96, 432, 510, 511, 646, 705, 717; `compile-ladder/rung-walk-elements/REPORT.md` sections 10 and 11 ("The list face of row 20 at a declared type ... Row 20 stays open for what no declared type reaches"); `tests/UnwrittenComprehensionDeclaredTypeWalk.fss`, `UnwrittenComprehensionElementsWalk.fss`, `XXXInferExpectedTypeRungK.fss`; the probes at `e879b6a44^` and `ed6dafb52^`; the row's history.

## Row 25

- Sc P: a static argument is a static expression; `n is undefined.` for `vector[\RR64,n\](1.0)` with a run-time `n` (`p09_runtime_size.fss` at `e879b6a44^`; `Library/FortressLibrary.fsi:1649-1650` still declares `vector[\T ..., nat s0\]`).
- Pr F: "full text: history, row 25 Climb batch 13 rung N: the idiom stands, and the compiled checker accepts it: NatReflect's clause restored, ..." A batch story after the marker.
- Ev F: "The escape works in `explorations/libvector-probes/p22_runtime_sized.fss`": gone, no location given, and that probe exercises the library's run-time-sized factories, `array[\E\](n)`, not `reflect` directly. The factories are the idiom: `array[\E\](x:ZZ32):Array[\E,ZZ32\] = __arr1(__thrower[\E\],reflect(x))` (`Library/FortressLibrary.fss:2247`).
- Co F: "one hoisted generic per shape is the sanctioned escape": "hoisted" and "sanctioned" are undefined. The team's comment says why the generic is top-level: "hoisted to top level because of incomplete implementation of generic local functions" (`ProjectFortress/LibraryBuiltin/NatReflect.fss:33-35`).
- Cn F: "the compiled checker accepts it" without the run: compiled, such a call does not run (revival-changes, "Such a call runs compiled only after the switch-over"; F-270 and F-181 give `compiler_tests/XXXNatOpenRun`, "Can't compile TraitDecl NatParamT", under row 307).
- Evidence read: `NatReflect.fsi:12-33`, `NatReflect.fss:12-59`; `compiler_tests/NatOpenChecker.{fss,test}`, `XXXNatOpenRun.{fss,test}`; commit `4db778294`; F-181, F-270; rows 150, 307, 664, 701; the probes at `e879b6a44^`.

## Row 71

- Sc F: the claim names four missing names; `Library/List.fsi:67` names `ZeroIndexed` too, which the prelude lacks (`grep ZeroIndexed Library/CompilerLibrary.fsi` finds only a commented line, `:193`).
- Pr F: "Two of the three names the row first named are now declared: `HasRank` (ladder rung 2, ...)": the row's repair story.
- Ev F: "raised inside `Library/List.fsi` itself, at `:67`, `:110`, `:113` and `:131`": the file changed in `372b9bf6a` (and `24db899fa`); the names are now at `:68`, `:114`, `:117`, `:135`, with `ZeroIndexed` at `:67`. `git log -3 -- Library/List.fsi` shows `372b9bf6a` last, so the after-marker measurement's lines are `HEAD`'s.
- Co F: "G1 —": a label from a numbering the ledger has not kept (`process-engineering/gap-ledger-archaeology.md`, section 2.5).
- Cn F: the body says "The four errors"; the text after the marker says "6 errors".
- Evidence read: `Library/List.fsi:55-135`; `Library/CompilerLibrary.fsi`, `CompilerAlgebra.fsi`, `CompilerSystem.fsi`, `CompilerBuiltin.fsi` (none declares the five names); `fortress-repo` `references/compiler.md`, "The compiler's prelude, until the switch-over"; commit `372b9bf6a`.

## Row 75

- Sc, Pr P: `CompilerBuiltin.fsi:23` `nanoTime(): RR64`, `.fss:352`; `Library/FortressLibrary.fsi:2547` `nanoTime():ZZ64`. The reproducer `explorations/tparallel.fss` declares `ms(t0: ZZ64, t1: ZZ64)` and calls it on `nanoTime()` results, so it reproduces the claim.
- Ev F: "`Library/FortressLibrary.fsi:2524`": that line is now `abstract writeOn(s: WriteStream): ()`; the declaration is at `:2547`, and the row pins no commit.
- Co F: "G5 —", as row 71.
- Ow, Cn P.
- Evidence read: the files above; `references/compiler.md` (the prelude is deleted at the switch-over).

## Row 101

- Sc F: "the same load refusals ... for `PrefixMap` with `PrefixSet`" understates: `PrefixMap.fss:32` imports `PrefixSet.{...}` itself beside its own `BIG UNION` (`:419`), so a program that imports `PrefixMap` alone is refused. Batch 17's refused note says so: "`PrefixMap` alone is refused too, through `PrefixSet`'s `BIG CUP` ..., at 3aea3da53 and after climb batch 17 rung G; no gated test imports it" (`compile-ladder/climb-batch-17/RECORD.md:188`). No file under the test folders imports `PrefixMap` (grep).
- Pr, Ev, Co, Ow, Cn P. The message is the No Duplicates Rule's, which F-257 says walk keeps ("fails because their parameter lists have the same types"); the cited lines `Map.fss:197`, `Set.fss:115`, `PrefixMap.fss:419`, `PrefixSet.fss:425` hold; `IntMap.fss:738` is `IntMap`'s nullary form.
- The row has no room for the note (notes 688), so the rewrite folds it in.
- Evidence read: the five library files; rows 39, 40; F-252, F-257; the probes at `ed6dafb52^`.

## Row 219

- Sc U, Pr U: "a `Char` array parameter (`Array1[\Char,0,s\]`) beside an `RR64` one (`Vector[\RR64,s\]`) is refused". Its last measurement is climb batch 18 rung W's (`5262a2412`, 2026-10-18), "now 'fails the Meet Rule'" (`compile-ladder/rung-walk-trait-method-bounds/REPORT.md:103`; the refused note, `climb-batch-18/RECORD.md:151`). After it, climb batch 19 rung P (`a93fb3bfd`, `84957e6ef`) made walk read exclusion over the whole parameter type by existential reduction (F-258), through supertypes (`tests/GenericPairExcludesTogetherWalk.fss`, "where the shared parameter fixes the static argument through a supertype"). `Vector[\RR64,s0\]` extends `Array1[\RR64,0,s0\]` (`Library/FortressLibrary.fsi:1616-1617`), so a value of both domains forces `RR64 = Char`, which cannot hold: by F-258 the pair excludes and would load. The probe of that work lists microGPT's `mul` over `Array[\RR64,I\]` beside `Vector`/`Matrix` as "refused, Meet Rule" before and "loads" after (`perf-probes/existential-reduction/REPORT.md:178`). Only a run tells whether `r07_edge.fss` loads now.
- Ev F: "`… have parameters with generic type, at least one pair of parameters must have excluding types`": walk has not said this for the pair since `5262a2412`.
- Co, Ow P.
- Cn F: "siblings: 159": row 159 is FIXED (`6d187d069`). F-155 still says two declarations that differ only in the element type are refused ("as for `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])`"); the same run question applies to it (`questions.md`).
- Evidence read: `explorations/apl/rung-1/r07_edge.fss`, `REPORT.md:105-115`; `FortressLibrary.fsi:1544-1546`, `:1616-1618`; F-155, F-252, F-257, F-258; rows 159, 199; the commits above.

## Row 268

- Sc F: "every `*Use.fss` in `.../transformer/` ... fails to parse": the folder holds eleven, two of them `SXX…Use.fss` expected failures (`SyntaxAbstractionJUTestAll.java:42-43` runs an `SXX` file with `assertFails`); the measured outputs, `b_Syntax*Use.out`, are the nine `Syntax*Use.fss`, as the notes' "All nine" says.
- Ev F: "`ProjectFortress/build.xml:1264` (`testsyntax`) is reached only from `testNightly` (`:1321`)": `ProjectFortress/build.xml` is 18 lines; the targets are in the root `build.xml`, `testsyntax` at `:1507` and `testNightly` at `:1564` (no other target depends on `testsyntax`).
- Pr, Co, Ow, Cn P. `SyntaxAbstractionJUTestAll.java:36` (`name.endsWith("Use.fss")`) and `:39` (`new File(STATIC_TESTS_DIR).list(fssFilter)`, the top directory) hold; `Syntax.rats:85-92`, `:148-153`, `:186-199` hold; the transformer folder has no commit after the team's (`git log a874948ac..HEAD -- ProjectFortress/syntax_abstraction_tests/` is empty); `SyntaxHelloWorld.fsi:18` and `SyntaxTest.fsi:20` read `Expr |Expr:=`.

## Row 305

- Sc, Pr P: the prelude declares no `Array`, `Array1`, `Vector` or `array` (`CompilerBuiltin.fsi`, `CompilerLibrary.fsi`; only `ZZ32Vector` `:563` and `StringVector` `:582`). F-11 agrees ("the compiler prelude has no array type (row 305)").
- Ev F: "`fortress compile` of `FlatArrays.fss` gives 77 errors": measured at the kernels report (`b176a4b79`); `FlatArrays.fss` changed four times since (`8590d7a9e`, `405a31b0e`, `d846e3644`, `f3b62bc83`), so the count needs its commit.
- Co F: "G2 —", as row 71.
- Cn F: "`array[\RR64\](4)` gives `Function array is not defined.` (row 72)": row 72 is a DUPLICATE of row 305, so the pointer loops back.
- Evidence read: the prelude files; `explorations/perf-probes/kernels/REPORT.md:26`, `:221-231`, `:422`; rows 72, 310; F-11.

## Row 307

- Sc F: "Arithmetic in a size, so a negative `int` argument (`IBox[\0 - 2\]`), is refused (`XXXNatArithChecker`) where walk runs it": fixed in `f623ce187`; the test is now `compiler_tests/NatArithSize` (F-146, "The compiled checker accepts arithmetic in a size"); `XXXNatArithRangeChecker` declares `hInt(b: IBox[\0 - 2\])` as "inside ZZ32", accepted.
- Pr F: "Fixed for `nat` and `int`: checker by 3f297441c (climb batch 4, rung N), run time by e893a3e00 (climb batch 5, rung Z)."
- Ev F: "`XXXNatArithChecker`" is gone (signal `notes-xxx-gone`); "`STypesUtil.scala:553-574` at 052a7c3fe": `makeInferenceArg` is now `:585-598` with its refusal at `:604-606`; "the message saying `nat` for an `int` parameter (`TypeWellFormedChecker.scala:41-42`)": that file's size messages are now its range checks (`:120-133`), which name each kind.
- Ow F: the notes interleave three repair dates with the open half.
- Cn F: three refused notes wait (`climb-batch-13/RECORD.md:179`, `climb-batch-17/RECORD.md:186`, `:194`); the first holds the present state of `NatReflectTest` ("stops at its run, 'Unable to read serialized data for NatReflect$N??'"; `rung-size-expressions/REPORT.md:150` gives the stage, `link`). F-129, F-181 and F-270 cite row 307 for `NatReflectTest` and for `XXXNatOpenRun` ("Can't compile TraitDecl NatParamT"), which the row does not name. Rows 761, 763 and 764, the `bool` siblings, name 307, and 307 names none of them.
- The claim keeps "stops at load", as F-129 says it; the notes give the harness stage, `link` (`references/tests-writing.md:56`: "link compiles, then links").
- Evidence read: `STypesUtil.scala:580-607`; `TypeWellFormedChecker.scala:120-161`; `compiler_tests/XXXNatBoolChecker`, `XXXNatArithRangeChecker`, `NatArithSize`, `XXXNatOpenRun`; `tests/NatReflectTest.fss`; F-129, F-146, F-181, F-270; rows 675, 701, 761, 763, 764, 767; the refused notes.

## Row 314

- Sc P: `Library/CompilerLibrary.fsi:45-58` hold the shapes the claim gives; the comparing `Any` forms are `Library/FortressLibrary.fsi:244`, `:252`. The refusal over objects is recent: "only 'Could not check call to function assert', the compiler prelude's `assert` taking no objects" (`perf-probes/existential-reduction/REPORT.md:186`, 2026-10-19).
- Pr F: "Half fixed by `b52a32ac2` (ladder rung 4, test ...)".
- Ev F: "the vararg form, whose parameter does not typecheck against arguments needing a coercion": measured before the varargs repair `aa07efb31`; F-86 now gives the mechanism, "The compiled library declares no `ImmutableArray`, so under it each use of such a parameter is refused (row 604)".
- Co F: "the compiler world's prelude": "compiler world" is undefined; the skill's term is the compiled path's prelude.
- Ow F: the repair story fills half the notes.
- Cn F: the row names neither row 604 nor F-86.
- Evidence read: the two `.fsi` files; `git log -L45,58:Library/CompilerLibrary.fsi` (only `b52a32ac2` since the team); `compile-ladder/ladder.tsv:315-318` (at `7aaa952cd`, the four `objectCC_*mutVar*` tests, "Could not check call to function assert"); F-86; row 604.

## Row 316

- Sc P: `CompilerBuiltin.fsi:37-40` declare `||`, `|||`, `//` and `juxtaposition` with `self` first only (last changed by `9373985b4`); walk's library also declares the right-hand forms (`Library/FortressLibrary.fsi:2502`, `:2510`, `:2516`, `:2532`).
- Pr F: "Half fixed by `9373985b4` (ladder rung 5, ...): `//` is now ...".
- Ev P: `CompilerBuiltin.fss:407` and `Library/String.fss:568` hold.
- Co F: "the compiler world's `String`".
- Ow F: the half-fixed story.
- Cn P: row 76 (the compiled juxtaposition's `|||`) agrees.
- The probe `SkCompiledLeft.fss` was never committed; `rung-library-meets/SKEPTIC.md:96` records its output.
