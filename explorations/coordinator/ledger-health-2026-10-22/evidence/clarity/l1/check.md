<!-- The ledger clarity run's chunk l1: the checker's verdict on each rewritten row and on the proposed closes, each failure with its passage, its source and the corrected line. -->

# Chunk l1: check

Read: `assessment.md`, `rows.rewrite`, `closes.txt`, `questions.md`, and each row as `ledger.py show N` prints it. `HEAD` is `b3dad547d`; it differs from the writer's base `63e420a33` only in record files (`git diff --stat 63e420a33 HEAD -- ProjectFortress Library` is empty), so every `at 63e420a33` citation is `HEAD`'s. Nothing was built or run.

Form: `python3 explorations/coordinator/tools/ledger.py check --rows .../l1/rows.rewrite` prints "10 rows, 0 fail the template". The four corrected lines below pass the same check ("4 rows, 0 fail the template"), each at or under 700 characters of notes and 1,200 in all.

| Row | Writer | Verdict |
|---|---|---|
| 8 | keep | no new line; keep agreed (one observation) |
| 20 | rewrite | pass |
| 25 | rewrite | fail: 1 |
| 71 | rewrite | pass |
| 75 | rewrite | pass |
| 101 | rewrite | pass |
| 219 | investigate | no new line; the question stands, its close command needs the landed commit |
| 268 | rewrite | pass |
| 305 | rewrite | pass |
| 307 | rewrite | fail: 1 |
| 314 | rewrite | fail: 1 |
| 316 | rewrite | fail: 1 |

Counts: of the 10 new lines, 6 pass and 4 fail. Closes: none proposed, none to check.

## Row 8 (keep)

No new line. The keep stands: `SpecData/tables/fortress-keywords` holds 79 words with `at label most of type unit value` among them, and `fortress-unitOperators` 7 (`wc -w`), 86 in all, the two lists that `Specification/basic/lexical-structure.tex:776-785` calls reserved words. Observation for a later rewrite, not a failure of this chunk: the spec cell says the list is generated "from `SpecData/tables/fortress-keywords`", while its 86 is that table and `fortress-unitOperators` together.

## Row 20: pass

- Fidelity. `Library/List.fsi:112` is `opr <|[\E\] xs: E... |>: List[\E\]`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44` is `object FloatLiteral extends RR64`; F-74 gives `Int`; row 511 gives the join for a varargs call ("run at the join, unconverted"); row 510 and F-55 that a typed binding does not fix a call's static argument (gated by `tests/XXXInferExpectedTypeRungK`); `List.fss` and `List.fsi` declare no `coerce` (0 matches each). F-228 confines the declared-type hint to reductions and comprehensions, and cites row 20 for the comprehension face, which the notes keep. The team's own tests write the display's type at a declared type (`tests/ListNullPointer.fss:24`, `:27`, `<| 5 asif ZZ32 |>`), and `tests/asifTest.fss:61` shows the join (`<| 1.0 asif RR64, 2.0, ... |>` at `List[\RR64\]`). Both probes are where the row says: `p2_ascribe.fss` at `e879b6a44^` (its `g: List[\RR64\] = <| 1.0, 1.0 |>`), `c11_object_model.fss` at `ed6dafb52^` (`xs: List[\Node\] = <| a, c, o |>`). The display at a declared type was last run at the probe's commit; the rules that decide it are each gated at `HEAD`, so the claim stands on them.
- Losses with a home: `p1_infer.fss`, the `matrix-ad-probes/REPORT.md` Q1 face and the pointer to row 646 (FIXED) stay in the history; the flat tower's F-bounds are row 432's claim, a sibling.
- Present, reproducer (`none`), form: pass.

## Row 25: 1 failure

**Failure: the claim and the notes make "top-level" a present rule on the evidence of a comment about another function.**
- Passage: claim "inside one top-level generic for each use"; notes "The generic is top-level as generic local functions are incomplete (`NatReflect.fss:33-35`)".
- Source: `ProjectFortress/LibraryBuiltin/NatReflect.fss:33-35` says it of `reflect`'s own loop, `__refl'` ("Inner loop of reflect, hoisted to top level because of incomplete implementation of generic local functions"), in the team's comment. No FACTS entry, ledger row or test measures a local or method generic that takes an `N[\n\]` at `HEAD` (`ledger.py find generic local function*` and `local generic*`: no row; FACTS and the skill's references: no match). The old claim's "one hoisted generic per shape" also meant one per function, not one "for each use": the library's factories share `__arr1[\E, nat n\](w:()->E, x:N[\n\])` (`Library/FortressLibrary.fss:2247`, `:2255`).
- Correction: state the generic without the unmeasured "top-level" rule, and give the comment as the team's about `__refl'`. Corrected line (it passes `ledger.py check --rows`):

      | 25 | a `nat` static argument cannot be a run-time value: `vector[\RR64,n\](1.0)` with `n` a variable is `n is undefined.`; the escape is `reflect(n)`, a `NatParam` that binds `n` where it is passed to a generic's `N[\n\]` parameter | NEGATIVE-VERIFIED | design limit (specification) | `basic/trait-parameters.tex`, "Nat and Int Parameters" (a `nat` is a *static* parameter) | none | ours | siblings: 150, 307. A static argument resolves in the type namespace. `NatParam` comprises `N[\n\] where [\ nat n \]` (`ProjectFortress/LibraryBuiltin/NatReflect.fsi:22-31`). The library's factories use it: `array[\E\](x) = __arr1(__thrower[\E\], reflect(x))` (`Library/FortressLibrary.fss:2247` at `63e420a33`). The compiled checker accepts it (`compiler_tests/NatOpenChecker`); it does not run compiled (row 307). The team's `__refl'` is top-level, generic local functions being incomplete (`NatReflect.fss:33-35`); `:38-40` ask for the idiom in the language. Probes `explorations/libvector-probes/p09_runtime_size.fss` and `p22_runtime_sized.fss`, parent of `e879b6a44`. full text: history, row 25 |

- The rest holds: `NatReflect.fsi:22-31` (the trait, `N` and `reflect`); `FortressLibrary.fss:2247`; `NatReflect.fss:38-40` ("we ought to build it in and document it in the spec"); `compiler_tests/NatOpenChecker.test` is `typecheck` and its program passes an opened `NatParamT` for `Nt[\n\]`, and `tests/NatReflectTest.fss`, which imports `NatReflect` itself, passes the checker and stops at link (`compile-ladder/rung-size-expressions/REPORT.md`, section 8); `XXXNatOpenRun` gives "Can't compile TraitDecl NatParamT" (row 307). Both probes are at `e879b6a44^`; `p09` is `vector[\RR64,n\](1.0)` with `n: ZZ32 = 8`.

## Row 71: pass

- `Library/List.fsi:67` `ZeroIndexed[\E\]`, `:68` `LexicographicOrder`, `:114` `Comprehension`, `:117` `BigReduction`, `:135` `MonoidReduction`; none of the five is declared in `Library/CompilerLibrary.fsi`, `CompilerAlgebra.fsi`, `CompilerSystem.fsi` or `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` (only the commented `:193` names `ZeroIndexed`); `HasRank` at `CompilerLibrary.fsi:274`, `Maybe` at `:223`.
- "six errors ... at `372b9bf6a`": `compile-ladder/rung-checker-conditional-extension/SKEPTIC.md:36` measures `ImportList` on the rung's head, "6 errors, 'ZeroIndexed is undefined.' at `:67` first"; the head `bd18b6a47` and the landed `372b9bf6a` have the same sources (`git diff --stat bd18b6a47 372b9bf6a -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin` is empty). The base's count was 5 for four names (`:36`), so the sixth error is not one of the named five; the row does not say it is.
- The probes are "no longer in the tree" (the signals file counts them explained); they are readable at `c69cb2064^` (`p15.fss`) and `ab067d9b6^` (`SkImportList.fss`), if a later rewrite has room.

## Row 75: pass

`CompilerBuiltin.fsi:23` `nanoTime(): RR64`, body `CompilerBuiltin.fss:352` `nanoTime(): RR64 = jNanoTime()`; `Library/FortressLibrary.fsi:2547` `nanoTime():ZZ64`, under `\subsection{Top-level primitives}` (`:2541`). The reproducer `explorations/tparallel.fss` declares `ms(t0: ZZ64, t1: ZZ64)` and passes it `nanoTime()` results, so it gives the quoted refusal.

## Row 101: pass

`Map.fss:197`, `Set.fss:115`, `IntMap.fss:738` (each a nullary `opr BIG UNION`), `PrefixMap.fss:32` (`import PrefixSet.{...}`) and `:419` hold; no file under the test folders imports `PrefixMap` (grep of `tests`, `compiler_tests`, `library_tests`, `other_compiler_tests`, `not_passing_yet`); the `PrefixMap` sentence is the refused note of `compile-ladder/climb-batch-17/RECORD.md:188`. The old notes' `PrefixSet.fss:425`, the colliding declaration, is now cited only through the import at `:32`; `:425` holds, if a later rewrite has room.

## Row 219 (investigate)

No new line. The question in `questions.md` is a run, which this check does not make. Two corrections to its plan:
- Its close command names `a93fb3bfd`, which is not in `HEAD`'s history (`git merge-base --is-ancestor a93fb3bfd HEAD` fails; so does `84957e6ef`), and `ledger.py close` requires the commit to be in `HEAD`. Rung P landed as `14e91723f` ("Walk and the compiled checker read exclusion ... by existential reduction"), which holds `domainsExcludeTogether` (`OverloadedFunction.java:759`, `:794`, `:891`). The command is `ledger.py close 219 --commit 14e91723f --test NAME`.
- The row's own `Library/FortressLibrary.fsi:1530-1531` is now `:1544-1545` (`trait ReadableArray1[\T, nat b0, nat s0\]` / `extends { Indexed1[\s0\], Rank1, ReadableArray[\T,ZZ32\] }`); `Vector` extends `Array1[\T,0,s0\]` at `:1616-1617`, as the assessment says.

## Row 268: pass

The folder holds the nine `Syntax*Use.fss` and two `SXX…Use.fss`; `SyntaxAbstractionJUTestAll.java:36` (`endsWith("Use.fss")`), `:39` (`new File(STATIC_TESTS_DIR).list(fssFilter)`, the top directory) and `:42-43` (`SXX` run with `assertFails`); `ProjectFortress/src/com/sun/fortress/parser/Syntax.rats:85-92` (`name:Id w bar w colonequals`), `:148-153` (`SyntaxDef`), `:186-199` (`PreTransformer`, `case … of` or `<[ … ]>`); the root `build.xml:1507` `testsyntax`, `:1564` `testNightly` depends on it; `SyntaxHelloWorld.fsi:18` and `SyntaxTest.fsi:20` read `Expr |Expr:=`. The reproducer `SyntaxHelloWorldUse.fss` is in the folder.

## Row 305: pass

The prelude declares no `Array`, `Array1`, `Vector` or `array` (grep of the four prelude files); `CompilerBuiltin.fsi:563` `trait ZZ32Vector`, `:582` `trait StringVector`. The 77 errors are `perf-probes/kernels/REPORT.md:221-231` ("77 errors each ... identical for kmat, krows, FlatArrays"); that report came in `258105b3e`, and `b176a4b79` has the same sources (`git diff --stat 258105b3e b176a4b79 -- ProjectFortress/src Library ProjectFortress/LibraryBuiltin explorations/run-c4/src` is empty), so the pin is exact. The reproducer still uses `Array`, `array[\RR64\](n)`, `ivmap`, `init0`, `replica` and `import NatReflect` (`explorations/run-c4/src/FlatArrays.fss:11-77`). The pointer to row 72, a duplicate of this row, is rightly gone.

## Row 307: 1 failure

**Failure: `NatReflectTest`'s stop is pinned to a commit that does not hold it, and the claim's "load" and the notes' "link" name two stages.**
- Passage: "`NatReflectTest` stops at link, 'Unable to read serialized data for NatReflect$N??' (at `f623ce187`)."
- Source: `compile-ladder/rung-size-expressions/REPORT.md` section 8 ran the ladder subset "on `9d323883f`": "`NatReflectTest.fss` link Unable to read serialized data for NatReflect$N?? (baseline: codegen; the same on the base a1a75716a)". `f623ce187` (2026-10-09 16:58) precedes `4db778294` (17:12), which restored `NatParam`'s `comprises` clause, the obstacle that the next sentence names; neither `f623ce187` nor `9d323883f` is in `HEAD`'s history, while `a1a75716a` is. The message is thrown by the class loader (`ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:2519`), which is what the claim's "stops at load" and F-129 mean; "link" is only the harness stage at which it appeared.
- Correction: pin it at `a1a75716a` and `9d323883f`, and say where it stops. The quoted refusal is shortened to make room. Corrected line (it passes `ledger.py check --rows`):

      | 307 | **the compiled checker refuses by name to infer a `bool`, `dim` or `unit` static parameter**, and a size made from a number known only at run time does not run compiled: `ProjectFortress/tests/NatReflectTest.fss` stops at load | NEGATIVE-VERIFIED | implementation gap (checker) | `Specification/basic/trait-parameters.tex`, "Bool Parameters", "Nat and Int Parameters"; `Specification/basic/inference.tex`, "Type Inference" | `ProjectFortress/compiler_tests/XXXNatBoolChecker.test` | ours (prelude probe) | siblings: 701, 761, 763, 764. `makeInferenceArg` throws '… bool static parameter b is not supported by the type checker.' (`STypesUtil.scala:585-606` at `63e420a33`) at the declaration's parameter, not the call, hiding the component's other errors; `nat` and `int` ones are inferred. Walk does not unify a `bool` one. `NatReflectTest` stops in the class loader, 'Unable to read serialized data for NatReflect$N??' (at `a1a75716a` and `9d323883f`). To run, the code generator must compile `NatParam`, whose `comprises` clause binds a `where`-clause size (`compiler_tests/XXXNatOpenRun`; row 701), and read a call's size off its argument's descriptor. full text: history, row 307 |

- The rest holds: `STypesUtil.scala:585` `def makeInferenceArg`, `:589-590`, `:594` the `bool`, `dim` and `unit` cases, `:604-606` the throw at `sparam`; `:588` and `:595` infer `int` and `nat`; the reproducer's `compile_err_contains=bool static parameter b is not supported by the type checker`; `compiler_tests/XXXNatOpenRun.test` `compile_exception_contains=Can't compile TraitDecl NatParamT`; walk's `Cannot unify Flag[\true\] ... with Flag[\b\]` is `compile-ladder/rung-nat-checker/REPORT.md:173`. The three refused notes (`climb-batch-13/RECORD.md:179`, `climb-batch-17/RECORD.md:186`, `:194`) are covered by the code-generator sentence and the siblings.

## Row 314: 1 failure

**Failure: the team's four tests are said to stop for the Boolean or object pair, and on a measurement older than the declarations that the row lists.**
- Passage: "a `(Boolean, Boolean, String)` call or a pair of objects is refused. The team's four `objectCC_*mutVar*` tests stop so (`explorations/compile-ladder/ladder.tsv` at `7aaa952cd`)."
- Source: the four tests compare `ZZ32` values with more than one message value, `assert(3, o.foo(), "o.foo() failed: returns ", o.foo(), " instead of 3.")` (`ProjectFortress/tests/objectCC_mutVar1.fss:31`, and `:35-39` alike), which no three-argument declaration of `CompilerLibrary.fsi:45-49` takes; `compile-ladder/rung4/REPORT.md:81` gives their stop after rung 4 as "the vararg shape, unchanged". And `compile-ladder/ladder.tsv` was last written at `7aaa952cd` (2026-09-17 02:14, "rung 0 worker running"), before `b52a32ac2` (10:00, rung 4) declared the `ZZ32`, `String` and `Character` forms; `compile-ladder/baseline-2026-09-19/ladder.tsv:315-318` gives the same "Could not check call to function assert" after it.
- Correction: name the second message value as what stops them, cite the later ladder, and cut "into the prelude" for room. Corrected line (it passes `ledger.py check --rows`):

      | 314 | the compiled path's prelude lacks the specification's comparing `assert(x: Any, y: Any, failMsg: Any...)` and its `deny`, declaring them only at `ZZ32`, `String` and `Character`, so a call such as `assert(3 IN C, true, "...")` is refused: `Could not check call to function assert` | NEGATIVE-VERIFIED | implementation gap (prelude) | `library/default-libraries.tex`, "FortressLibrary" (subsection Assertions, typeset from `Library/FortressLibrary.fsi`) | none | ladder rung 4 | siblings: 604. `Library/CompilerLibrary.fsi:45-58` declare `assert` at `(ZZ32, ZZ32)` and `(String, String)`, with or without a message, and at `(Character, Character, String)`, and `deny` at the three-argument shapes; a `(Boolean, Boolean, String)` call, a pair of objects or a second message value is refused, as in the team's four `objectCC_*mutVar*` tests (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv:315-318`). The `Any` form cannot be copied: `opr ===` over `Any` compares boxes, an `Any` parameter blocks the `IntLiteral`-to-`ZZ32` coercion, and a varargs parameter's use is refused there (row 604). Workaround: `assert(3 IN C, "...")` (`:36`). full text: history, row 314 |

- The rest holds: `CompilerLibrary.fsi:45-58` as described, `:36` `assert(flag: Boolean, failMsg: String)`, the comment at `:38-44` on `===` and the `IntLiteral` coercion; `FortressLibrary.fsi:244` and `:252` the `Any` forms, under `\subsection*{Assertions}` (`:236`); F-86 and row 604 for the varargs parameter; the `(Boolean, Boolean, String)` refusal is `compile-ladder/rung-overloading-checker/REPORT.md` section 16 ("Could not check call to function assert ... (Boolean, Boolean, String)"); objects, `perf-probes/existential-reduction/REPORT.md:186`.

## Row 316: 1 failure

**Failure: the claim gives the juxtaposition form as refused and answered, where only the `||` form was run.**
- Passage: claim "so `1 \|\| "a"` and `1 "a"` are refused on the compiled path, where walk answers `1a`".
- Source: the one measurement is `SkCompiledLeft.fss`, `1 || "a"`: refused compiled, walk prints `D1 1a` (`compile-ladder/rung-library-meets/SKEPTIC.md:96`, section 5). No run of `1 "a"` on either path is in the record: a grep for `1 "a"` over `explorations/compile-ladder/` finds nothing, and in the ledger history it appears first in a note on this row "(climb batch 8, rung M's skeptic)" (`fortress-gap-ledger-history.md:1897`), whose skeptic ran only `SkCompiledLeft` (`1 || "a"`) and the left-hand `SkCompiled` (`SKEPTIC.md:95-96`), then in the row's rewrite (`:5545`). `CompilerBuiltin.fsi:40`, `abstract opr juxtaposition(self, b:Object)`, makes the refusal likely, by reading.
- Correction: keep the run form as measured and mark the other as by reading. Corrected line (it passes `ledger.py check --rows`):

      | 316 | the compiled path's `String` declares `\|\|`, `\|\|\|`, `//` and `juxtaposition` with `self` on the left only, so `1 \|\| "a"` is refused on the compiled path, where walk answers `1a`, and `1 "a"` meets the same one-sided form | NEGATIVE-VERIFIED | implementation gap (prelude) | `basic/operators/juxtameaning.tex`, "Juxtaposition"; `library/default-libraries.tex`, "FortressLibrary" (subsection Ranges, trait `String`, typeset from `Library/FortressLibrary.fsi`) | none | ladder rung 5 | siblings: 76. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37-40` declare each as `opr OP(self, b:Object)`: `(String, Object)->String is not applicable to an argument of type (IntLiteral, String)`. Walk's library has `opr \|\|(a:Any, self)`, its kin and `juxtaposition(a:Any, b:String)` (`Library/FortressLibrary.fsi:2502`, `:2532` at `63e420a33`). The compiled `//` puts `makeCharacter(10)` between its operands (`CompilerBuiltin.fss:407`), where walk's `newline` is `lineSeparator` (`Library/String.fss:568`). The prelude goes at the switch-over. Probe `SkCompiledLeft.fss`, never committed: `explorations/compile-ladder/rung-library-meets/SKEPTIC.md` section 5. full text: history, row 316 |

- The rest holds: `CompilerBuiltin.fsi:37-40`; `FortressLibrary.fsi:2502` `opr ||(a:Any, self)`, `:2510` `opr |||(a:Any, self)`, `:2516` `opr //(a:Any, self)`, `:2532` `juxtaposition(a:Any, b:String)`, all under `\subsection*{Ranges}` (`:2173`), which runs to `:2541`; `CompilerBuiltin.fss:407` `self || makeCharacter(10).asString || b`; walk's `//` uses `newline` (`Library/FortressLibrary.fss:4430-4433`), `String.fss:568` `newline: String = lineSeparator`.

## Closes

`closes.txt` proposes none, so there is nothing to check. For row 219's possible close, see that row: the commit is `14e91723f`, not `a93fb3bfd`.
