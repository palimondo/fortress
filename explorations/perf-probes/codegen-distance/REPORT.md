<!-- The code generator's distance from the interpreter's library, measured again on 2026-10-23 on main at aa5c67d48: the 2026-09-27 probe's per-declaration code generation over FortressLibrary.fss (switch-over-distance-flat.md sections 3 and 4, desugar-codegen.md section 4), repeated with the same shadows, and run once more over the other eleven components of the library and with the dispatch generator on. Written by a probe worker in the worktree /home/user/fortress-cgdist (detached at aa5c67d48, seeded from /home/user/fortress-base21b); nothing tracked was edited, built or committed; every shadow edit is in copies compiled into a scratch folder. Every count is measured from the captures named in "Files", unless a sentence says it is my reading. -->

# The code generator's distance from the interpreter's library

## 0. The answers

1. **`FortressLibrary.fss` under the switch-over's setting (bound `Any`, the distance stage's default):** 504 declarations reach the declaration loop: the 500 of the source and 4 made by overload rewriting. 475 are emitted and 29 refused. 27 of the 29 are declarations the checker passed.
   - Counted as on 2026-09-27 (an object refused in the pre-pass also counts as emitted), it is 481 emitted and 29 refused, against 326 and 225.
   - Refusals on declarations the checker passed went from 4 to 27, because the checker now passes 498 of the 500 (section 2).
2. **Under the 2026-09-27 setting (the compile path's, bound `Object`):** the same file emits 460 (2026-09-27 count) and refuses 74, 15 of them on declarations the checker passed. The other 59 are on declarations the checker reports errors on under that setting, and on the overload rewrites inside them (section 2).
3. **The dispatch generator refuses no overload set, under either setting:** 0 of the 178 sets that the skipping runs pass over, against 12 of 198 on 2026-09-27. With dispatch generation on, code generation took between 35 and 65 s of a 159 s run (section 5).
4. **Over all twelve components, under the switch-over's setting, 58 declarations are refused, 50 of them on declarations the checker passed.** The other 8 lie in or under the two declarations that hold four of the distance's five errors: `__bigOperator2` and trait `List` (section 4).
5. **The 50 refusals on checked declarations fall into 14 kinds by message (table in section 3).** The largest:
   - a local function (`Can't compile LetFn`): 9 declarations, 16 local-function groups in the parsed trees;
   - "Not in the trait table" on `RangeInternals`' 2-D and 3-D range objects: 8;
   - `asif` (`Can't compile AsIfExpr`): 7 declarations, 13 sites;
   - varargs: 7. Six are `Can't compile VarArgs yet`, on a varargs parameter or a call of `assert`; one is an `OptionUnwrapException` on a varargs method;
   - a postfix operator applied to a tuple operand ("Error trying to close method scope"): 4;
   - `label`: 3.

   Rows 304, 81, 315, 540, 624, 701 and 733 hold kinds. Row 650 holds the modifier guard, for `override` only. Six forms have no row:
   - `asif`;
   - the tuple-operand postfix operator;
   - the static argument `Any` in an `extends` clause;
   - `forbid`;
   - "is not in the kind env" in the code generator;
   - the `test` modifier.

## 1. How it was measured

- **Machine**: `nproc` 4; Intel(R) Xeon(R) Processor @ 2.10GHz, `cpu MHz` 2100.000; JDK `openjdk version "25.0.4.1" 2026-08-18`; `FORTRESS_THREADS=1`; `-Xmx4g -Xss64m`.
  - Every JVM ran under `nice -n 19`, one at a time, beside a climb batch.
  - Load average at the runs' starts: 2.25 to 7.20. No timing here is a comparison.
- **Tree**: worktree `/home/user/fortress-cgdist`, detached at `main`'s `aa5c67d48`, seeded from `/home/user/fortress-base21b` (`24919e97d`). `git diff --stat 24919e97d aa5c67d48 -- ProjectFortress Library build.xml bin` prints nothing, so the base build's classes are `main`'s code.
- **Shadows**: `explorations/coordinator/tools/distance/shadow-patch.py` and `add-patch.py`, the distance stage's copies.
  - They are byte-identical to the 2026-09-27 probe's `desugar-codegen/shadow-patch.py` and `switch-over-distance/add-patch.py`: `git show fc89ee7a5^:<path>`, then `diff`, prints nothing.
  - They write shadow copies of `StaticChecker`, `TypeCheckPhase`, `DesugarPhase`, `CodeGenerationPhase`, `CodeGen`, `Desugarer` and `NodeComparator`. javac compiles them into a scratch folder put ahead of `ProjectFortress/build` on the class path. Every edit matched today's sources.
  - Under `-Dprobe.tolerant` the checker checks each top-level declaration apart, and its errors do not stop the run.
  - Code generation catches each failure in four places: `CodeGen`'s constructor (inherited methods), dispatch generation, the object and variable pre-pass, and the declaration loop. After a catch it restores the loop's declaration state.
- **Drivers**:
  - the 2026-09-27 `Distance.java` (`git show fc89ee7a5^:explorations/perf-probes/prelude/switch-over-distance/Distance.java`), for the compile path's setting and the compiler's prelude;
  - the distance stage's `DistanceMulti.java`, for `-setting any`, which `Distance.java` lacks.

  Both run `PhaseOrder.compilerPhaseOrder` (`-order full`) with the interpreter's prelude in scope.
- **Flags**, as `run-all.sh`'s `codegen2` step (2026-09-27's `r5`): `-Dprobe.tolerant=true -Dprobe.bottomCompare=true -Dfortress.analyzer.overload.cache=false`.
  - Plus `-Dprobe.skipOverloads=true`, except in the dispatch runs.
  - Plus `-Dprobe.dumpErrors=true`, which prints the kept checker errors and is otherwise inert.
  - One private caches folder per run, deleted at its end.
- **Adapted where the tree moved**: the 2026-09-27 runs used the compile path's setting (`extends Object` pre-desugaring on). The distance stage now runs `any` by default: the setting the switch-over takes under answer (a) of batch 7's Q1 (`explorations/coordinator/tools/distance/run.sh`, header). So `any` is the main run here, and `compile` is the like-for-like repeat.
- **Classifier**: the 2026-09-27 `desugar-codegen/classify.py`, with three changes:
  - a kind is named by the code generator's own message, or, where the message is `null`, by the frame that threw;
  - provenance is still matched by span;
  - an overload rewrite is attributed to the source declaration whose span encloses it.
- **Controls**:
  - The compiler's own prelude through `CODEGEN`, tolerant, dispatch on (`Distance -order full -setting compile -compilerlib Library/CompilerLibrary.fss`): 162 declarations checked with 0 errors, 162 emitted, 0 refused, `COMPONENT-OK`, rc 0, 20 s. This is the 2026-09-20 control's result (`desugar-codegen.md` section 2.4): the machinery changes nothing in a compile that works.
  - `FortressLibrary` alone, and as the first of twelve components in one JVM, give the same `@@CG OK`/`FAIL`/`PREFAIL` lines declaration by declaration (`diff` prints nothing). So do the dispatch run and the skipping run.
  - No run prints an `@@NC BOTTOM` or `@@DS FAIL` line. Desugaring and overload rewriting refused nothing, and the `BottomType` switch was never needed.

## 2. `FortressLibrary.fss`: emitted and refused

| | 2026-09-27 (compile) | today, compile | today, any (the switch-over's) |
|---|---|---|---|
| top-level declarations checked | 446 | 500 | 500 |
| … with no error of their own | (not printed) | 459 | **498** |
| … that crashed the checker | 5 | 0 | 0 |
| `@@CG OK` lines ("emitted", the 2026-09-27 count) | 326 | 460 | **481** |
| refused in the declaration loop | 206 | 64 | 23 |
| refused in the object pre-pass | 19 | 10 | 6 |
| refused in `CodeGen`'s constructor | 0 | 0 | 0 |
| **refused** | **225** | **74** | **29** |
| … on a declaration the checker passed | 4 | 15 | **27** |
| … on one it reported errors on | 138 | 38 | 1 |
| … on one it crashed on | 5 | 0 | 0 |
| … on an overload rewrite | 78 | 21 | 1 |
| emitted with no refusal (OK lines less the pre-pass refusals) | (307, my reading of its counts) | 450 | **475** |
| overload sets skipped (sum of `@@CG OVLSKIP sets=`) | 198 | 178 | 178 |
| run, seconds | | 67 | 133 |

The command and its counts, setting `any`:

    tmp/codegen-distance/run.sh cg-any        # DistanceMulti -order full -setting any Library/FortressLibrary.fss
    python3 -I tmp/codegen-distance/classify2.py work/cg-any.out $PWD
       500  @@TC DECL-OK (checker ran on the declaration)
       498    of which errors=0
       481  @@CG OK lines (the 2026-09-27 'emitted': includes objects refused in the pre-pass)
        23  @@CG FAIL   (declaration loop)
         6  @@CG PREFAIL (object/variable pre-pass)

The checker errors that this run kept are the distance's own three in this component (F-53), each printed twice:
- `Library/FortressLibrary.fss:1466:39`, "Function body has type OR(I0,O0), but declared return type is O0", in `__bigOperator2` (row 632);
- the two `BIG MIN` calls at `:4395:13` and `:4401:13` (row 731).

The export error is not reached in tolerant mode without `-Dprobe.all`. The two declarations with errors are `__bigOperator2` (`:1462`, `errors=1`) and trait `String` (`:4335`, `errors=2`). Trait `String` is still emitted (`@@CG OK TraitDecl String`); the probe does not show what is emitted at the two `BIG MIN` calls.

**The 27 refusals on declarations the checker passed (setting `any`)**, by the code generator's message:

| declaration | file:line of the wall | message |
|---|---|---|
| `assert`, `deny` | `Library/FortressLibrary.fss:307`, `:325` | Can't compile VarArgs yet |
| `shouldRaise` | `:339` (`try` … `forbid`) | NYI: Forbid clauses are not yet implemented |
| `simplestRationalBetween` | `:530` (`label done`) | Can't compile Label |
| `__filter` | `:1295` | ClassCastException: IntersectionType cannot be cast to NamedType, in `CodeGen.forMethodInvocation` |
| `__bigOperator` | `:1317` (`body(i: I): L = …`) | Can't compile LetFn |
| trait `SequentialGenerator` | `:1496` (`self asif Generator[\E\]`) | Can't compile AsIfExpr |
| trait `Indexed` | `:2042` (`label found`) | Can't compile Label |
| trait `LexicographicOrder` | `:2069`, closure at `:2080:12-52` | ZipException: duplicate entry: `FortressLibrary$\=fn@2080\!12-52??.class` |
| trait `ReadableArray1` | `:2361` | Can't compile LetFn |
| trait `Array2` | `:2659` | Can't compile LetFn |
| trait `Matrix` | `:2873` | Can't compile LetFn |
| trait `Array3` | `:3069` | Can't compile LetFn |
| object `SumReduction` | `:3444` (`distribute(…) … where { T extends StandardMax[\T\] }`) | Don't know how to compile this kind of FnDecl |
| object `MIMapReduceReduction` | `:3723` (`extends MonoidReduction[\Any\]`) | Only handling some static args of generic types in extends clause |
| trait `MappedGenerator` | `:3749` | Can't compile AsIfExpr |
| object `SimpleMappedSeqGenerator` | `:3805` | Can't compile AsIfExpr |
| object `NaiveSeqGenerator` | `:3983` | Can't compile LetFn |
| object `TrivialOpenRange` | `:4064` (`extends OpenRange[\Any\]`) | Only handling some static args of generic types in extends clause |
| trait `BoundedRange` | `:4108` (`atMost(n:I) … where { I extends Index }`) | Don't know how to compile this kind of FnDecl |
| `opr (x:(ZZ32,ZZ32)):`, `opr (x:(ZZ32,ZZ32,ZZ32)):` | `:4193`, `:4194` (`= x#`) | Error trying to close method scope |
| `opr (l:(ZZ32,ZZ32))::`, `opr (l:(ZZ32,ZZ32,ZZ32))::` | `:4236`, `:4237` (`= l#`) | Error trying to close method scope |
| object `SimpleMappedSeqIndexed` | `:4320` | Can't compile AsIfExpr |
| trait `Generator2` | `:4781` (`label dispatchingLoop`) | Can't compile Label |
| trait `RelationalPredicateCondition` | `:4858` | Can't compile LetFn |

The other two refusals are both downstream of the checker's error on `__bigOperator2`:
- `__bigOperator2` itself at `:1467`, "Variable being bound lacks type information!", on `o = outer.reduction`;
- the overload rewrite inside it at `:1469:23`: an `OptionUnwrapException` in `for_RewriteFnOverloadDecl`, which unwraps the rewrite's missing type (`x.getType().unwrap()`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6545`).

The four refusals on checked declarations of 2026-09-27 are still refused. They are the same declarations at moved lines: `SequentialGenerator` and `SimpleMappedSeqGenerator` (`asif`), `__filter` (intersection receiver) and `ReadableArray1` (`LetFn`).

**What went since 2026-09-27**, compile setting against compile setting:
- `Can't compile Juxt`: 39 to 12, all 12 on declarations with errors; 0 under `any`.
- The missing-type-information class: 175 to 40, all but one on declarations with errors or rewrites inside them; 2 under `any`.
- The checker's crashes: 5 to 0.

The other 23 refusals on checked declarations that `any` shows, beyond 2026-09-27's 4, are walls that checker errors hid then: the provenance moved and the walls did not. This is my reading of the 2026-09-27 table (`git show fc89ee7a5^:explorations/perf-probes/prelude/switch-over-distance-flat/r5-codegen-FortressLibrary.classified.txt`). I checked it for `assert`, `deny` and `shouldRaise`, which that table files under "checker reported errors on it".

## 3. The kinds of refusal

Under the switch-over's setting, over all twelve components (section 4), 58 declarations are refused.
- "Sites" counts the construct's nodes in walk's parsed tree of each component: `default_repository/caches/interpreter_parsed_cache/<C>-*.tfs`, with `grep -oE "\(<Node>( |$)"`.
- A declaration is refused at its first wall, so a site behind an earlier wall in the same declaration does not show among the refusals.

| kind (the code generator's message) | refused | on checked decls | where (component: count) | sites | example | ledger row |
|---|---|---|---|---|---|---|
| `Can't compile LetFn` | 9 | 9 | FortressLibrary 7, RangeInternals 2 | 16 LetFn groups (FL 10, RI 6) | `__bigOperator`, `Library/FortressLibrary.fss:1317`, `body(i: I): L = r.lift((o.body)(i))` | 304 |
| `Not in the trait table: <api trait>` (`CodeGen.dumpMethodChaining` → `TypeAnalyzer.equiv`) | 8 | 8 | RangeInternals 8 | | `OpenRange2D`, `Library/RangeInternals.fss:380`, `extends { OpenRange[\(ZZ32,ZZ32)\], ActualRange2D[…] }`: "Not in the trait table: OpenRange" | 733 |
| `Can't compile AsIfExpr` | 7 | 7 | FortressLibrary 4, RangeInternals 1, String 2 | 13 (FL 4, RI 1, String 8) | trait `SequentialGenerator`, `Library/FortressLibrary.fss:1496`, `(self asif Generator[\E\]).asString` | none |
| `Can't compile VarArgs yet` | 6 | 6 | FortressLibrary 2, List 1, String 2, FlatString 1 | 5 varargs parameters (FL 2, List 1, Stream 2) | `assert`, `Library/FortressLibrary.fss:307`, `failMsg: Any...`; see note (a) for three objects | 624 (declarations; the claim does not name a call) |
| `OptionUnwrapException` in `NamingCzar.jvmSignatureFor` from `dumpTraitMethodSigs` | 1 | 1 | Stream 1 | | trait `WriteStream`, `Library/Stream.fss:33`, `print(args:Any...)`, `println(args:Any...)` | 624 ("a trait method with `OptionUnwrapException`") |
| `Error trying to close method scope` | 4 | 4 | FortressLibrary 4 | | `opr (x:(ZZ32,ZZ32)): : LeftRange[\(ZZ32,ZZ32)\] = x#`, `Library/FortressLibrary.fss:4193` | none (rows 340 and 377 hold the message for other causes) |
| `Can't compile Label` | 3 | 3 | FortressLibrary 3 | 8 labels (FL 4, String 4) | `simplestRationalBetween`, `Library/FortressLibrary.fss:530`, `label done` | 81 |
| `Don't know how to compile this kind of FnDecl` | 3 | 3 | FortressLibrary 2 (a method's `where` clause), String 1 (the `test` modifier) | | `BoundedRange.atMost`, `Library/FortressLibrary.fss:4108`, `where { I extends Index }`; `test stringifyChars()`, `Library/String.fss:328` | 701 for the `where` clause; see note (b) for `test` |
| `Can't compile TraitDecl` | 2 | 2 | List 1, NatReflect 1 | | `AnyList`, `Library/List.fss:86`, `comprises { List[\E\] } where [\E\]`; `NatParam`, `ProjectFortress/LibraryBuiltin/NatReflect.fss:23`, `comprises { N[\n\] } where [\ nat n \]` | 701 (its reproducer is this form) |
| `Only handling some static args of generic types in extends clause` | 2 | 2 | FortressLibrary 2 | | `MIMapReduceReduction`, `Library/FortressLibrary.fss:3723`, `extends MonoidReduction[\Any\]`; `TrivialOpenRange`, `:4064`, `extends OpenRange[\Any\]` | none (row 411, closed, is the same message at a dispatched arm) |
| `CompilerBug: <X> is not in the kind env` | 2 | 2 | List 2 | | `ArrayList[\E\]` (`List.fss:252`) and `app` (`List.fss:93`); see note (c) | none |
| `ZipException: duplicate entry` (a closure class name) | 2 | 1 | FortressLibrary 1, List 1 (on trait `List`, which has an error) | | trait `LexicographicOrder`, `Library/FortressLibrary.fss:2080:12-52`, `(BIG AND [(a,b)<-self.zip[\E\](other)] a=b)`: `duplicate entry: FortressLibrary$\=fn@2080\!12-52??.class` | 315 |
| `NYI: Forbid clauses are not yet implemented` (`CodeGen.forTry`, `CodeGen.java:2030`) | 1 | 1 | FortressLibrary 1 | 1 `try` | `shouldRaise`, `Library/FortressLibrary.fss:339` | none |
| `ClassCastException: IntersectionType … NamedType` (`CodeGen.forMethodInvocation`) | 1 | 1 | FortressLibrary 1 | | `__filter`, `Library/FortressLibrary.fss:1295` | 540 |
| `Variable being bound lacks type information!` | 1 | 0 | FortressLibrary 1 | | `__bigOperator2`, `Library/FortressLibrary.fss:1467` (the checker's error, row 632) | 632 (the checker's) |
| `OptionUnwrapException` in `for_RewriteFnOverloadDecl` (a rewrite with no type) | 6 | 0 | FortressLibrary 1, List 5 | | see note (d) | 632, 731 (the checker's) |

Notes to the table:
- (a) The objects `CatString` (`String.fss:75`), `EmptyString` (`:275`) and `FlatString` (`FlatString.fss:34`) stop at the arrow type of a call of `assert`, at `String.fss:129`, `:306` and `FlatString.fss:107` (`NamingCzar.forArrowType` → `forTupleType`).
- (b) The `test` modifier fails the modifier guard of row 650. That row's claim names `override` only.
- (c) `ArrayList[\E\]` (`List.fss:252`) stops in `CodeGen`'s constructor (`CodeGen.java:485`, `STypesUtil.properlyInheritedMethodsNotIdenticallyCovered` → `TypeAnalyzer.lteq`): "E is not in the kind env". `app[\T,E extends T,F extends T\]` (`List.fss:93`) stops in its `typecase` (`CodeGen.forVarRef` → `TypeAnalyzer.normalize` → `pExc`): "T is not in the kind env".
- (d) The rewrites are at `Library/List.fss:147:16` … `:151:16`, inside trait `List`, whose `List.fss:146` is the distance's row-731 site, and at `FortressLibrary.fss:1469:23`, inside `__bigOperator2`.

Reproduced apart from the library, under the compiler's prelude (`bin/fortress compile` in the worktree), for three kinds that hold no row:
- **`asif`**: `run():() = println((Leaf asif Named).name)`, with `trait Named getter name(): String = "Named" end` and `object Leaf extends Named getter name(): String = "Leaf" end`. The compile stops: `AsIfProbe.fss:11:25-35: Can't compile AsIfExpr` (`CodeGen.defaultCase`, `CodeGen.java:1673`). The code generator has no visitor for `AsIfExpr`.
- **The tuple-operand postfix operator**: `opr (x:(ZZ32,ZZ32))! : ZZ32 = 3` beside `opr (x:(ZZ32,ZZ32)): : ZZ32 = x!`.
  - The compile stops: `TupleParamOpr.fss:5:31: Error trying to close method scope`, caused by `ArrayIndexOutOfBoundsException: Index -1 out of bounds for length 0 at org.objectweb.asm.Frame.merge`.
  - The method text shows the cause. The body rebuilds the tuple `x` from its two JVM parameters `x1` and `x2`. It then calls `postfix !` with the one tuple on the stack, where that method's JVM signature takes two `FZZ32`.
  - The same call written as a function, `g(x:(ZZ32,ZZ32)): ZZ32 = h(x)` for `h(x:(ZZ32,ZZ32)): ZZ32 = 3`, compiles and prints `3`. So the defect is in the operator application, not in a tuple parameter as such.
- **The static argument `Any` in an `extends` clause**: `trait Holder[\T extends Any\]` with `object AnyHolder extends Holder[\Any\] end`. The compile stops: `Only handling some static args of generic types in extends clause` (`CodeGen.generateTypeReference`, `CodeGen.java:5805`). That method's `AnyType`, `BottomType`, `SelfType` and `AbbreviatedType` branches are empty and fall through to the throw (`CodeGen.java:5786-5805`).

Not reproduced apart from the library: `forbid`, "is not in the kind env" and `test`. Their messages and frames are in the table above.

## 4. The other eleven components

The run: `DistanceMulti -order full -setting any` over the twelve components in one JVM, in the distance stage's list and order, with dispatch skipped. It took 198 s, rc 0. Counts are in the 2026-09-27 way:

| component | checked | errors=0 | OK lines | refused | of them on checked decls | sets skipped |
|---|---|---|---|---|---|---|
| FortressLibrary | 500 | 498 | 481 | 29 | 27 | 178 |
| RangeInternals | 101 | 101 | 102 | 11 | 11 | 55 |
| FortressBuiltin | 19 | 19 | 19 | 0 | 0 | 98 |
| NativeArray | 5 | 5 | 5 | 0 | 0 | 4 |
| List | 26 | 25 | 22 | 10 | 4 | 8 |
| String | 16 | 16 | 14 | 5 | 5 | 10 |
| FlatString | 6 | 6 | 7 | 1 | 1 | 13 |
| Stream | 4 | 4 | 3 | 1 | 1 | 0 |
| NatReflect | 4 | 4 | 3 | 1 | 1 | 1 |
| TypeProxy | 1 | 1 | 1 | 0 | 0 | 0 |
| Writer | 8 | 8 | 8 | 0 | 0 | 2 |
| AnyType | 1 | 1 | 1 | 0 | 0 | 0 |
| **total** | **691** | **688** | **666** | **58** | **50** | **369** |

- **`RangeInternals`** (2026-09-27, compile setting: 56 emitted, 97 refused). All 11 refusals are in the pre-pass.
  - Eight are "Not in the trait table", on the 2-D and 3-D `OpenRange`, `ExtentRange`, `LeftRange` and `RightRange` objects. Each extends an api trait of `FortressLibrary` first, then `RangeInternals`' own `ActualRange2D` or `ActualRange3D`.
  - A second copy of the `CodeGen` shadow printed the stack to 70 frames (step `deep`): `CodeGen.forObjectDeclPrePass` → `dumpMethodChaining` (`CodeGen.java:1006`) → `TypeAnalyzer.equiv` → `typeCons` (`TypeAnalyzer.scala:866`). That is row 733's mechanism and the line it cites.
  - Two are `LetFn` (`CompactFullParScalarRange`, `RangeInternals.fss:1313`; `StridedFullParScalarRange`, `:1495`). One is `asif` (`CompactFullSeqScalarRange`, `:1354`).
- **`FortressBuiltin`** (2026-09-27: 17 emitted, 17 refused) now refuses nothing: 19 of 19 emitted.
- **`List`**: 4 refusals on checked declarations: `AnyList`'s `where`, the varargs `<|[\E\] xs: E... |>` at `List.fss:177`, and the kind env in `app` and `ArrayList`. The other 6 are on trait `List` (`List.fss:106`), which holds the checker's one error at `:146`: its duplicate closure class, and 5 overload rewrites inside it at `:147`-`:151`.
- **`String`**: five refusals:
  - `CatString` and `EmptyString`, on calls of `assert`;
  - `SubString`, on `asif` at `String.fss:388`;
  - `concatAndBalanceIfNecessary`, on `asif` at `:67`;
  - `test stringifyChars`, at `:328`.

  String's four `label`s (`:141`, `:167`, `:417`, `:432`) and five more `asif` sites lie in `CatString` and `SubString`, behind each declaration's first wall.
- **`FlatString`, `Stream`, `NatReflect`**: one refusal each: a call of `assert` (varargs), a varargs method, and a trait `where` clause.

## 5. The dispatch generator

**It finishes, and refuses no overload set.**
- Under the switch-over's setting: `FortressLibrary` alone, with dispatch generation on and JFR recording, took 159 s, rc 0.
  - The `@@CG OK`/`FAIL`/`PREFAIL` lines are identical to the skipping run's (`diff` prints nothing).
  - No `@@CG OVLFAIL` line is printed: none of the 178 overload sets that the skipping run counts throws in `generateTopLevelOverloads`.
- Under the compile path's setting (2026-09-27's `r3`): 107 s, the same result. 0 `OVLFAIL`, and the declarations as in its skipping run (460/64/10).

The commands and their output:

    tmp/codegen-distance/run.sh dispatch-any      # TOL flags without -Dprobe.skipOverloads, JFR on
    grep -c '^@@CG OVLFAIL' work/dispatch-any.out        → 0
    grep '^# ' work/dispatch-any.watch.txt
    # code generation entered at 20:21:22, 123 s after the JVM was found
    # end 2026-10-23T20:21:57Z   (dispatch-any.out)

- **Gone**: the 12 sets of 2026-09-27 refused as "apparently malformed overload set not rejected … functional method and top level function with same signature" (`=` 5, `>=` 2, `LEXICO` 2, `SQCAP` 2, `INVERSE` 1; `compiler/OverloadSet.java`).
- **Time**:
  - The watcher polls every 30 s, so code generation, dispatch included, took between 35 and 65 s of the run. On 2026-09-27 it took about 210 s.
  - Of the recording's 10,093 execution samples, 1,199 have `CodeGenerationPhase.execute` on the stack. 256 have `CodeGen.generateTopLevelOverloads`, all of them with `OverloadSet` frames.
  - These are lower bounds: JFR kept 64 frames, and 8,199 samples carry none of the phase frames counted. Counted per sample from `jfr print --events jdk.ExecutionSample --stack-depth 200` over `work/dispatch-any.jfr`.
  - This is one run on a loaded machine (load 4.93 at its start), not a comparison with 2026-09-27.

## 6. Defects, and what this does not settle

**Defects measured.** None is written to the ledger, because the brief keeps this worker out of the tree.
- **`asif`**: the code generator has no case for `AsIfExpr` (`e asif T`, `Specification/basic/expressions/type-annotation.tex`). 7 library declarations, 13 sites. No ledger row. Reproducer: `AsIfProbe.fss` (section 3).
- **Postfix operator on a tuple operand**: where the operator's one parameter is a tuple, the call passes the tuple as one value to a method whose JVM signature takes the elements, and ASM's frame computation fails ("Error trying to close method scope"). 4 library declarations: the range operators `:` and `::` over pairs and triples. No row. Reproducer: `TupleParamOpr.fss` (section 3).
- **Static argument `Any` in an `extends` clause** stops the code generator. By my reading of `CodeGen.java:5786-5805`, `Bottom`, `Self` or an abbreviated type would stop it too. 2 declarations. No open row (row 411 is closed). Reproducer: `ExtendsAnyArg.fss`.
- **`try … forbid`** stops the code generator: "NYI: Forbid clauses are not yet implemented" (`CodeGen.java:2030`). 1 declaration, `shouldRaise`. No row. Not reproduced apart from the library.
- **"<X> is not in the kind env"**: the code generator's type analyzer lacks a declaration's own static parameters in two places, and stops there:
  - computing an object's inherited methods (`ArrayList[\E\]`, `CodeGen.java:485`);
  - normalizing a type inside a generic function's `typecase` (`app[\T,E,F\]`).

  2 declarations of `List`. No row in the code generator (rows 557 and 789 hold the message in the checker). Not reproduced apart from the library.
- **The `test` modifier** fails the code generator's modifier guard (`fnDeclCompilableModifiers`, `CodeGen.java:2897`, checked at `:2972`). 1 declaration. Row 650 holds that guard, for `override` only.
- **A call of a varargs function** (`assert`) stops an object's pre-pass at the call's arrow type. 3 objects. Row 624's claim names the declarations, not the call.

**Not settled**:
- **The refusals undercount the walls**, because a declaration is refused at its first wall. The parsed-tree site counts in section 3 bound the main constructs: 16 local-function groups against 9 refused declarations, 13 `asif` sites against 7, 8 `label`s against 3.
- **A refusal is caught, not undone.** `CodeGen` writes into one class writer as it goes, and the probe restores only the declaration-level state (`desugar-codegen.md` section 3, caveat 5). The kinds and their counts are the finding; a row after the first failure of a declaration is not certified.
  - The `duplicate entry` on `LexicographicOrder` fits row 315's mechanism by its message and stack (`CodeGen.forFnExpr` → `CodeGenClassWriter.dumpClass` → `ByteCodeWriter.writeJarredFile`).
  - It is not reproduced apart from the library, so it may instead be a closure written once before a caught failure and once after (my reading).
- **An emitted declaration is not a working one**: no emitted class was loaded or run.
  - Trait `String` is emitted although the checker reports its two `BIG MIN` calls.
  - By my reading of `CodeGen.java:481-487` and the shadow's catch there, `ArrayList` is emitted without the inherited methods that the failed constructor step computes.
- **The 2026-09-27 count of "emitted" counts an object refused in the pre-pass twice**: it also gets an `OK` line in the declaration loop (`@@CG OK ObjectDecl SumReduction` beside its `@@CG PREFAIL`). Section 2 gives both counts. By my reading of its counts, this is why the 2026-09-27 report's 326 + 225 exceeds its 532 declaration-loop lines.
- **Settings**: only `FortressLibrary` ran under the compile path's setting; the other eleven components ran under `any` only.

## 7. For FACTS

- **F-34 is stale.** Its counts are those of the tree of 2026-09-27.
- A replacement, as it stands now: *With the checker's failures caught per declaration, code generation under the switch-over's setting (bound `Any`) refuses 58 of the declarations of the library's twelve components and emits the rest. 50 of the 58 are declarations the checker passed, 27 of them in `FortressLibrary`, where 475 of 504 declarations are emitted. The dispatch generator refuses no overload set (0 of 178 in `FortressLibrary`).*
- What it means for the work: after the switch-over, the code generator stands between the library and bytecode at 50 declarations, in 14 kinds by message. Six forms (`asif`, tuple-operand postfix, `extends … [\Any\]`, `forbid`, kind env, `test`) have no ledger row.
- The numbers: 58 refused declarations, each kind with its row in section 3's table; 29 of them in `FortressLibrary`, 27 on checked declarations; 0 overload sets refused.
- How to show it: `tmp/codegen-distance/run.sh build cg-all-any dispatch-any`, then `classify2.py`, from the worktree's root (section 1). No test checks it, because the gate's distance stage does not run code generation.
- Detail: this report, sections 2 to 5.

## 8. Decisions and questions

- **Decision: the main run is under setting `any`; the 2026-09-27 setting is the like-for-like repeat.**
  - Alternatives: compile only (2026-09-27's), or `any` only.
  - Evidence: the distance stage runs `any` by default, after batch 7's Q1 answer (a) (`explorations/coordinator/tools/distance/run.sh`, header comment), and the distance of 5 (F-53) is measured there. The 2026-09-27 numbers were taken under compile.
- **Decision: a kind is named by the code generator's message, or, where the message is `null`, by the frame that threw.** So two `OptionUnwrapException`s with different causes count as two kinds.
- **Question for the curator, a decision not taken: should the gate's distance stage also run code generation per declaration, report-only?**
  - The twelve components through `CODEGEN`, with dispatch skipped, took 198 s here. The stage's check alone took 206 s at the last gate (F-240).
  - Alternatives:
    - (a) add it to the stage, about doubling the stage's time;
    - (b) keep it a probe, run when a rung touches the code generator;
    - (c) add it only after the switch-over.
  - The record holds no decision on it, and this report acted on none.

## Files

These are in the worktree `/home/user/fortress-cgdist`, under `tmp/codegen-distance/`, for the coordinator to copy beside this report if wanted. The evidence above is quoted, not cited from them.

| file | what |
|---|---|
| `run.sh` | every run, by step: `build`, `control`, `cg-any`, `cg-compile`, `cg-all-any`, `dispatch-any`, `dispatch-compile`, `deep` |
| `classify2.py` | the classifier: the 2026-09-27 `classify.py`, kinds by message, rewrites attributed by span |
| `old/` | the 2026-09-27 probe's `Distance.java`, `watch-dispatch.sh`, `jfr-stacks.py`, `classify.py`, `shadow-patch.py` and `add-patch.py`, from `fc89ee7a5^` |
| `repro/` | `AsIfProbe.fss`, `TupleParamOpr.fss`, `TupleParamCall.fss`, `ExtendsAnyArg.fss` |
| `work/*.out` | the captures: `cg-any`, `cg-compile`, `cg-all-any` (and `split/` by component), `dispatch-any`, `dispatch-compile`, `control-compilerlib`, `deep` |
| `*.classified.txt`, `work/split/*.classified.txt`, `work/dispatch-any.jfr-*.txt`, `log-repro.txt` | the derived tables, the JFR summaries and the reproductions' output |
