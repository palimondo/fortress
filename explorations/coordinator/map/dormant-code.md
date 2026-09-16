<!-- Fifth part of the territory map, written by a survey worker before the historical source tree is opened for modification. Question: what in this repository is commented out, switched off, unwired or left unfinished, and how useful is each piece. Method: grep, find, sed and git log over the working tree at the branch tip; everything listed was opened and read. No tracked file was modified. Cites file:line throughout; where an earlier survey is right, it is cited rather than repeated. Read after README.md; the four surveys beside it hold the evidence for the system's shape. -->

# The dormant census

Dormant means: present in the tree, carrying a design, and not running — commented out, switched off, unreferenced, or never finished.

Four things are *not* dormant and are excluded, because mistaking them for dormant code wastes the reader's time.

The `%`-prefixed Fortress code in `Specification/` is not commented-out specification: it is the ASCII source of the typeset display that follows it, kept beside its Fortify output (`Specification/advanced-lib/algebraic-constraints.tex:1541-1546` is followed by the rendered `Ring` at `:1547-1556`, and `Specification/basic-lib/dimensions.tex:19-99` is the ASCII source of the SI-unit listing rendered at `:111`). This corrects `design-intent-sources.md` §6, which reads the `Ring`/`Field` blocks at `:1541,:1761` as surviving "only as commented-out declarations"; both traits are in the published specification, and it is the *implementation* that lacks them.

`(**  … *)` blocks in `Library/` are documentation comments, not disabled code; the census below counts only `(* … *)` and `(*)` that hold declarations.

The generated trees (`nodes/`, `parser/`, `parser_util/precedence_opexpr/`) are excluded; their commented-out fragments are the generator's, not a design.

Revival-era comments are excluded from the historical count and named where they matter (`runtimeSystem/BaseTask.java:151-164`, `Specification/fortress/fortress.tex:39-45`).

The usefulness judgment is one of four, and nothing else: **finished, unwired** (working code with nothing calling it, or code that would work if connected); **sketch** (a design with no working code behind it); **superseded** (a later mechanism replaced it); **unknown** (the source does not say and no cheap probe settles it).

Path steps 0-6 and the grammar branch are `README.md` §5; ledger rows are `explorations/fortress-gap-ledger.md`.

## 1. Library

### 1.1 Commented-out declarations in `Library/` and `ProjectFortress/LibraryBuiltin/`

47 `(* … *)` blocks and 19 `(*)` line-comment runs hold trait, object, `opr`, function or method declarations across the 106 library files; the table lists every one that carries a design rather than a scratch edit, grouped by what it bears on.

| Item | What it is | Lines | Why dormant, if said | Design area / step | Judgment |
|---|---|---|---|---|---|
| `Library/CompilerLibrary.fsi:168-181` | `trait Condition[\E\]`, the whole 14-method generator-shaped condition protocol | 14 | no comment | compiler prelude; step 2 (route b) | sketch |
| `Library/CompilerLibrary.fsi:183-198` | `value trait Maybe[\T\]`, `Just`, `NothingObject`, with `coerce` and `SQCAP` | 16 | no comment; `Maybe` is row 71's first named absence | compiler prelude; step 2, ledger 71 | sketch |
| `Library/CompilerLibrary.fsi:202-204` | `object Nothing end` | 3 | no comment | same | sketch |
| `Library/CompilerLibrary.fss:220-258` | ten checked/unchecked exception objects: `CastError`, `MatchFailure`, `DisjointUnionError`, `APIMissing`, `APINameCollision`, `ExportedAPIMissing`, `HiddenAPIMissing`, `TryAtomicFailure`, `AtomicSpawnSynchronization` | 39 | two of them carry open questions in-line (`(* SetsNotDisjoint? *)`, `(* Should take a spawned thread as an argument *)`) | compiler prelude; step 2 | finished, unwired |
| `Library/CompilerLibrary.fss:192-196`, `.fsi:71-73` | `object IndexOutOfBounds[\I\](range,index)` with its `asString` | 5 + 3 | needs `Range[\I\]`, which the compiler prelude lacks | compiler prelude; step 2 | finished, unwired |
| `Library/CompilerLibrary.fss:90-96`, `:103-109` | `assert(x,y,failMsg…)` and `deny(x,y,failMsg…)` with varargs and `BIG \|\|` | 7 + 7 | body needs varargs and the `BIG \|\|` reduction, neither of which the compiler world has | compiler prelude; step 2 | finished, unwired |
| `Library/CompilerLibrary.fss:440-442`, `.fsi:154-156` | `opr BIG \|\|(): StringConcatenation` / `ReductionString` — the nullary form of the string reduction | 3 + 3 | no comment | reductions; step 2, ledger 74 | sketch |
| `Library/CompilerLibrary.fss:454-459` | `opr SUFFIX_SUM(x: ZZ32Vector)`, a sequential scan | 6 | "For now, use a sequential implementation" — and then the sequential implementation is itself commented out | reductions/scans; step 2 | finished, unwired |
| `Library/CompilerLibrary.fss:504-507`, `.fsi:222-225` | `random(i:RR64)`, `randomZZ32(x:ZZ32)` over `jRandomDouble`/`jRandomInt` | 4 + 4 | no comment; the natives they call exist | compiler prelude; step 2 | finished, unwired |
| `Library/CompilerLibrary.fss:260-262` | `opr SEQV(a:Any,b:Any) = jSEQV(a,b)` | 3 | no comment | compiler prelude | finished, unwired |
| `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:55-91` and `.fss:430-472` | 34 `print`/`println`/`errorPrintln` overloads (per-type and per-tuple-arity) | 37 + 43 | no comment; what survives is `println(x:Object)` plus three fixed arities | dispatch on the compiled path; step 2 | superseded (by `asString` on `Object`) |
| `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:336-364` | `getter asDebugString()` with the English a/an article rule, hand-coded over ~40 spelling cases | 29 | no comment | diagnostics | finished, unwired |
| `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:952-958` | `opr <` and `opr CMP` on `Boolean` | 7 | no comment | total orders; `CompilerAlgebra` (§1.4) | finished, unwired |
| `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1320-1322`, `:1345-1346` | `opr IN`, `opr =`, `opr SQCAP` on `Some[\E\]`/`NoneObject[\E\]` | 3 + 2 | no comment; the matching assertions are commented out in `library_tests/MaybeTest9.fss:69-72` (§3.1) | `Option`/`Maybe`; step 2, ledger 71 | finished, unwired |
| `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:438-439` | `ceiling(self):RR64`, `floor(self):RR64` | 2 | no comment | numeric tower; step 2 | sketch |
| `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:483-525`, `.fsi:121-142` | 19 `IntLiteral` operators (`+ - DOT juxtaposition TIMES DIV REM MOD GCD LCM CHOOSE BITAND BITOR BITXOR LSHIFT RSHIFT BITNOT ^`) over existing `builtinPrimitive` glue | 43 + 22 | stated: "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals" | coercion and the numeric tower; ledger 19 | finished, unwired |
| `Library/FortressLibrary.fss:2341-2357`, `:2360-2362`, `:2364-2366` | the range-indexed reads on a 2-D array: `opr[r0:Range,r1:Range]`, the two mixed row/column forms | 17 + 3 + 3 | no comment; the `TrivialOpenRange` variants beside them are live | arrays and ranges; step 2 | finished, unwired |
| `Library/FortressLibrary.fss:1941-1946` | `immutableArray[\E\]` at ranks 2 and 3 | 6 | no comment; rank 1 is live | arrays; step 2 | finished, unwired |
| `Library/FortressLibrary.fss:2585-2588` | `mul[\nat s2\](v:TransposedMatrix[…])` | 4 | stated: "Can't overload generic methods yet, but this is preferable" | generics, `nat` parameters; step 1 | finished, unwired |
| `Library/FortressLibrary.fss:2821-2829` | `trait Monoid[\T, opr OPLUS\]` with `zero` and `OPLUS` | 9 | no comment; the only algebraic trait above `Number` anywhere in the shipped library | the tower; step 2, `spec-to-implementation.md` §4.2 | sketch |
| `Library/FortressLibrary.fss:3269-3282`, `.fsi:1941-1952` | `BitXorReduction` plus `opr BIG BITXOR` in both forms | 14 + 12 | no comment; every sibling reduction is live | reductions | finished, unwired |
| `Library/FortressLibrary.fss:3862-3867`, `.fsi:2188-2193` | the four one-sided range operators written as the author wanted them (`opr (x:I)#`, `opr (x:I):`, `opr #(x:I)`, `opr :(x:I)`) | 6 + 6 | stated: "Actually want for above:" — the live forms are the workaround | operators, ranges | sketch |
| `Library/FortressLibrary.fss:3945-3947`, `.fsi:2270-2272` | `opr :(r: FullRange[\I\], stride:I)` | 3 + 3 | stated: "This doesn't obey the subtyping rule due to the genericity involved!" | generics and subtyping | superseded |
| `Library/FortressLibrary.fss:3715-3717` | a narrower `opr INTERSECTION(self, other: Range[\I\]): RangeWithExtent[\I\]` | 3 | stated: "This signature is more specific, but troublesome" | ranges | sketch |
| `Library/FortressLibrary.fss:71-73`, `.fsi:51-53` | `copy[\T extends Any\](x:T): T` | 3 + 3 | stated: "copy is presently unimplemented"; the same sentence reaches the published api listing at `Specification/library/apis/FortressLibrary.tex:53` and the spec's `\note` at `advanced/parallelism-locality/shared-local.tex:15` | value semantics; `future.tex` unboxed-types thread | sketch |
| `Library/FortressLibrary.fsi:744-748` | `__nest` and `__map` as generator-level desugaring targets | 5 | stated: "Not currently used for desugaring, but will be used in future" | generators; step 2 | sketch |
| `Library/FortressLibrary.fsi:2022-2024` | `embiggen[\T,opr OP\](z:T)` | 3 | no comment | reductions | sketch |
| `Library/FortressLibrary.fss:4220-4222`, `.fsi:2463-2465` | `throwError(a:String)` over `StringPrim$ThrowError` | 3 + 3 | stated: "time to get rid of this" | diagnostics | superseded |
| `Library/FortressLibrary.fss:1269-1283` | a 15-line `(** TODO **)` arguing that the new `__bigOperator` desugaring blocks packaging a passed function, and that generator data must not be built eagerly | 15 | it is the argument itself, not code | generators and reductions; step 2 | sketch |
| `Library/GeneratorLibrary.fss:381-401`, `.fsi:226-246` | `trait NonemptyReduction[\B\]` over `Option[\B\]`, with `join`, `lift`, `unlift` and `EmptyReduction` | 21 + 21 | no comment; the only reduction in that file with no identity element | reductions; step 2 | finished, unwired |
| `Library/Generator2.fss:59-70` | `distributes[\Q,R\]` decided by `typecase` on `DistributesOver[\Q\]` | 12 | "checking by type annotation" — the live replacement asks the reduction instead | reduction algebra | superseded |
| `Library/Generator2.fss:74-84` | three further `distributes` forms with the author's diagnosis | 11 | stated: generic-method overloading is not resolved ("Don't actually resolve overloading of generic methods yet"), and dispatch without an explicit static argument misses | generics, dispatch; ledger 156 | sketch |
| `Library/Generator2.fss:374-385` | a `typecase` on `Indexed[\E,ZZ32\]` that would build segment generators structurally | 12 | inline: "fails for arrays"; the live path builds a `List` instead | generators | superseded |
| `Library/SetClosure.fss:24-45` | `isClosedN`, `arraysFrom`, `object ArraysFrom`, `arrayCons` — closure over *n*-ary relations | 22 | no comment; the live file does the binary case only | sets and closures | sketch |
| `Library/Relation.fss:42-45` | `opr INVERSE(self): Relation[\T\]` by `BIG RELATION` comprehension | 4 | no comment | relations, comprehensions | finished, unwired |
| `Library/Relation.fss:219-238` | `test testRelationClosuresViaSets()`, a transitive closure computed two ways and compared | 20 | no comment; the file it lives in is imported by nothing (§1.3) | tests; ledger 120-122 | finished, unwired |
| `Library/Treap.fss:47-50`, `:76-80`, `:137-147`, `:203-215` | `split(key): (Treap,Treap,Treap)` — the api declaration and all three implementations | 4+5+11+13 | no comment | data structures | finished, unwired |
| `Library/Heap.fss:177-192` | `emk`, an iterative pairing-heap merge | 16 | no comment | data structures | unknown |
| `Library/Sparse.fss:145-152` | `mul[\nat p\](other: Csc[\N,m,p\])`, the sparse-by-sparse product | 8 | stated: "Right now uncommenting unearths an obscure unification bug"; `(* TODO: make overloaded *)` sits above it | `nat` parameters and inference; step 1, ledger 23/156 | finished, unwired |
| `Library/ChunkedSparseArray.fss:28-46` | `bitNum` and `value object Bits(x0:ZZ64)` as a `SequentialGenerator[\ZZ32\]` | 19 | no comment; the body is visibly unfinished (the `while` loop computes `loBit` and discards it) | generators, bit tricks | sketch |
| `Library/IntMap.fss:89-92` | `differenceOp[\V\](other)` with its doc comment | 4 | no comment | data structures | sketch |
| `Library/Format.fss:102-106` | `scientific(number:ZZ32)` widening to the `RR64` case | 5 | no comment | formatting | finished, unwired |
| `Library/TypeProxy.fsi:14-25` | a live 12-line deprecation note giving the replacement idiom (`typecase fn(): T => throw NotFound of …`) | 12 | "DEPRACATED!" [sic] — the api it heads is still shipped and still imported by `FortressLibrary` and `RangeInternals` | reflection, type matching | superseded |

The two `Maybe` entries and the `Option` operators in `CompilerBuiltin` are one item seen from three files, and they are the same absence the ledger records as row 71 and the same feature `not_working_library_tests/MaybeTest1,2,5,10` and `not_working_compiler_tests/MaybeTest15` reach for (§3.2).

### 1.2 `Library/incomplete/` and the `*.INCOMPLETE` files

`Library/incomplete/` holds 3,874 lines in 24 files and is **not on the source path**: `default_repository/configuration:44` lists `LibraryBuiltin`, `Library` and `test_library`, and nothing under them.

Its provenance is one commit: `1d2680d4d`, "Massive library reorganization … The libraries that used to be under StandardLibrary may now be found under Library/incomplete, along with two incomplete libraries from test_library."

| File | What it is | Lines | Design area / step | Judgment |
|---|---|---|---|---|
| `Library/incomplete/basic/Fortress.Core.fsi` | `trait Any` with `hashCode`, `asString`, `asDebugString`, `asExprString`, `===`, `IDENTITY`, `hash` | 101 | the root trait; step 2 | superseded (by `LibraryBuiltin/AnyType.fss`) |
| `Library/incomplete/basic/Fortress.Number.fsi` | `trait QQ` and the rational/real tower expressed through `Field[\…\]`, `TotalOrderOperators`, `PartialOrderAndLattice` | 189 | the numeric tower; step 2, `spec-to-implementation.md` §4.2 | sketch |
| `Library/incomplete/basic/Fortress.Standard.fsi` / `.fss` | `BooleanInterval` and the interval/containment layer over `BooleanAlgebra` | 97 + 64 | intervals; not on the path | sketch |
| `Library/incomplete/basic/Fortress.Convenience.fsi` / `.fss` | `cast[\T\]`, `instanceOf`, convenience functions, written with `\chapter`/`\section` Fortify markup in the doc comments | 58 + 49 | reflection and casts | sketch |
| `Library/incomplete/basic/Fortress.SIUnits.fsi` / `.fss` | the SI base and derived dimensions and units, the same listing the spec carries at `Specification/basic-lib/dimensions.tex:19-99` | 104 + 118 | dimensions and units; ledger 26, 27; not on the path | finished, unwired |
| `Library/incomplete/basic/Fortress.EnglishUnits.fsi` / `.fss` | inches through imperial fluid drachms, plus `knot` and `microfortnight` | 66 + 69 | dimensions and units; ledger 26 | finished, unwired |
| `Library/incomplete/basic/Fortress.InformationUnits.fsi` / `.fss` | `dim Information unit bit bits`, `unit byte bytes` | 13 + 15 | dimensions and units | finished, unwired |
| `Library/incomplete/basic/Fortress.Potrzebie.fsi` / `.fss` | Knuth's Potrzebie system (MAD #33, June 1957), cited in the source | 117 + 120 | dimensions and units, as a demonstration that the mechanism composes | finished, unwired |
| `Library/incomplete/basic/Fortress.NegatedOperators-NYI.fsi` | 341 lines of negated relational operators (`NSEQV`, and the negated forms of every comparison), with chapter/section markup | 341 | operators; the filename carries the verdict | sketch |
| `Library/incomplete/advanced/Fortress.Predicates.fsi` | `UnaryPredicate`, `BinaryPredicate` with `abstract opr SIM` | 63 | the algebraic-constraint layer; step 2 | sketch |
| `Library/incomplete/advanced/Fortress.PartialTotalOrders.fss` and `.fsi.INCOMPLETE` | `Antisymmetric`, `PartialOrder`, `StrictPartialOrder`, `TotalOrder`, `StrictTotalOrder` with their `property` laws | 144 + 115 | the tower's order layer; step 2 | sketch |
| `Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE` | 1,329 lines: the whole "Operators and Their Properties" chapter as a library api, prose and declarations together, opening with the exact/approximate distinction (`Associative` vs `ApproximatelyAssociative`) | 1,329 | the algebraic traits and their laws; the richest single statement of that design in the tree outside the spec | sketch |
| `Library/incomplete/Collection.fss` | `trait Collection[\alpha\]`, headed by a stated convention ("If it updates or is a getter or setter … dotted. Otherwise it should be a functional method.") | 27 | collections; the dotted-vs-functional rule is design intent stated nowhere else | sketch |
| `Library/incomplete/Sequence.fss` | `trait Sequence[\alpha\]` with `DOUBLE_PLUS`, `addFront`/`addBack`, `removeFront` returning `Maybe` | 21 | collections | sketch |
| `Library/incomplete/SkipTree.fss` / `.fsi` / `SkipTreeTest.fss` | a skip-tree map, its api, and a hand-rolled test harness | 453 + 86 + 115 | data structures; three commits of live work (`6bf42de0c`, `529749ef5`, `fefeb4a75`, `231950cd4`) ending mid-feature | finished, unwired |

The two `.INCOMPLETE` files are the only files in the repository with that suffix; the `.fss` beside `Fortress.PartialTotalOrders.fsi.INCOMPLETE` is complete, so the marker is on the api, not the implementation.

### 1.3 Library files that ship and are imported by nothing

An api is counted as read if any file under `Library/`, `LibraryBuiltin/`, `tests/`, `compiler_tests/`, `other_compiler_tests/`, `library_tests/`, `parser_tests/`, `not_passing_yet/`, `syntax_abstraction_tests/`, `demos/`, `test_library/`, `SpecData/` or `explorations/` imports it.

| Api | Lines (`.fss` + `.fsi`) | What it is | Only importer, if any | Step | Judgment |
|---|---|---|---|---|---|
| `Library/GeneratorLibrary` | 469 + 314 | the complete compiler-world generator and reduction protocol: `Container`, `DefaultGeneratorImplementation`, the reversed/mapped/nested/pair/filter generators in parallel and sequential forms, `GeneralReduction`, `MonoidReduction`, `CommutativeMonoidReduction`, `ReductionWithZeroes`, `BigOperator`, `BigReduction`, `Comprehension`; its first line after the api header is `import CompilerAlgebra.{ ... }` (§1.4) | `ProjectFortress/BirdyLib/*` and `not_working_library_tests/GenTest8.fss`, both of which nothing reads | step 2 (route b), ledger 74 | finished, unwired |
| `Library/Relation` | 289 + 60 | relations over a universe with transitive closure, and a self-test (§1.1) | none | — | finished, unwired |
| `Library/PrefixMap` | 446 + 139 | a prefix-trie map over `CovariantCollection` | none (`PrefixSet` is read, `PrefixMap` is not) | — | finished, unwired |
| `Library/Lazy` | 97 + 24 | lazy values | none; the only two mentions of the word are prose in `Library/Heap.fss:32` and `Heap.fsi:30` | — | finished, unwired |
| `Library/Reader` | 63 + 31 | a reader over `Stream` | none (`Writer` is read by `FortressLibrary`, `Reader` is not) | — | finished, unwired |
| `Library/Testable` | 16 + 15 | the `Testable[\T\]` trait | none by import; `ReflectiveQuickCheck.fss:253,272` extends it without importing | tests; ledger 120-123 | finished, unwired |

`Library/GeneratorLibrary` is the one the map already flags as a decision (`README.md` §4, "the seed for generic reductions on the compile path or dead weight"); it is, on reading, a finished protocol, not a stub, and it is written against `CompilerAlgebra`, the api that §1.4 finds commented out of the default library — the two dormancies are one.

Six further apis are read by exactly one file, and that file is outside the gate: `ChunkedSparseArray` (`tests/zeno.fss`), `Format` (`tests/formatTest.fss`), `IntMap`, `SkipList`, `Treap`, `StatDigest`, `SetClosure` (`demos/turnersParaffins0.fss`), `ReflectiveQuickCheck`, `Generator22D` (`demos/DemoGenerator22D.fss`) and `FortressAstUtil` (`syntax_abstraction_tests/transformer/SyntaxTest.fsi`, in the corpus that is 1-of-17 green). They are alive but held by one thread each.

### 1.4 `CompilerAlgebra` commented out of the default library

`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:124` is `//			   compilerAlgebra(),` inside `useCompilerLibraries()`, so the compiler world links `CompilerLibrary`, `CompilerBuiltin` and `AnyType` and not `CompilerAlgebra`; the accessor at `:91` and the field at `:40` are live.

`Library/CompilerAlgebra.fss` (29 lines) and `.fsi` (28) declare `AllStandardTotalOrders`, `StandardTotalOrder[\T\]` with `< > <= >= CMP`, and `Equality[\T\] comprises T` with `opr =` defaulting to `===`.

35 test files import it explicitly, and so does `Library/GeneratorLibrary.fsi:13`, so the api is reachable — it is only absent from the *implicit* prelude; `not_working_compiler_tests/MaybeTest15.fss:14` is a file written to use it that does not pass.

Design area: the algebra layer of the compiler prelude, step 2; judgment **finished, unwired** — it is 57 lines of working declarations one uncommented line away from being in every compiled program's prelude, and what that line costs is not measured anywhere.

## 2. Source

### 2.1 Commented-out visitors and method bodies

Contiguous runs of `//`-commented code of six lines or more, at least half of them carrying code, outside the generated trees: 70 sites. The ones with a design in them:

| Item | What it is | Lines | Why dormant, if said | Design area / step | Judgment |
|---|---|---|---|---|---|
| `compiler/codegen/CodeGen.java:1768-1813` | `forCaseExpr`, a whole codegen visitor for `case … of` | 46 | stated: "I took a stab at this, but got stuck on the comparison operator"; the body refuses a non-default `CMP` and a null param | codegen; step 3, ledger 80 | sketch |
| `compiler/codegen/CodeGen.java:1817-1849` | `forChainExpr`'s body, beneath a live `throw sayWhat(x, "ChainExpr should have been desugared earlier")` at `:1816` | 33 | the desugarer took the job (`desugarer/ChainExprDesugarer.scala`, on by default, `Shell.java:1284`) | codegen | superseded |
| `compiler/codegen/CodeGen.java:1965-1974` | `forDo`, the multi-front `do … also do` visitor | 10 | inline: "TODO: these ought to occur in parallel!" | codegen, parallelism; step 5 | sketch |
| `compiler/codegen/CodeGen.java:2282-2311` | `generateRuntimeInstantiationClass`, a per-template `$TABLE` class with a `getFunctionBody` dispatch | 30 | no comment | generic instantiation; step 3 | sketch |
| `compiler/codegen/CodeGen.java:4779-4789` | `constructTaskWithFreeVars` | 11 | no comment | task codegen; step 5 | unknown |
| `compiler/desugarer/PreTypeCheckDesugaringVisitor.java:547-600` | `forCaseClauses`, the case-expression desugaring | 54 | no comment; `desugarer/CaseExprDesugarer.java` is the live one | desugaring | superseded |
| `compiler/phases/PhaseOrder.java:84-95` | `makePhase`, a per-enum phase factory | 12 | no comment; `makePhaseHelper` is live | phase plumbing | superseded |
| `compiler/phases/PhaseOrder.java:133-134` | `// Disabled because we are not using them. //,ENVGEN` — the ENVGEN phase removed from `interpreterPhaseOrder` | 2 | the reason is at `interpreter/env/CUWrapper.java:35-40` (§2.2) | interpreter startup | superseded |
| `compiler/Disambiguator.java:335-338` | `if (false) … ASTIO.writeJavaAst(comp, "aaa.tfs", System.out)` | 4 | a debugging hook left in | serializer | sketch |
| `compiler/NamingCzar.java:1215-1233` | a second `opToString` body, reachable only past `if (true) return …` at `:1730` | 19 + 13 | inline: "Conflicts with above!" | name mangling | superseded |
| `compiler/OverloadSet.java:2412-2431` | an `@Override` block | 20 | no comment | overloading | unknown |
| `runtimeSystem/InstantiatingClassloader.java:2829-2876` | six `getRTTIclass(String stem, RTTI…)` arities | 48 | no comment; `:668` says "KBN 06/2011 handled above now" of the neighbouring block | run-time type info | superseded |
| `runtimeSystem/InstantiatingClassloader.java:630-648` | an `InitializedStaticField` for an RTTI field, with `forClinit`, `asmName`, `asmSignature` | 19 | no comment | run-time type info | unknown |
| `runtimeSystem/InstantiatingClassloader.java:168-172` | `if (false) { // Here will go all the magic expando-stuff. }` in `getClass` | 5 | the sentence is the whole record | class loading | sketch |
| `runtimeSystem/InstantiationMap.java:129-189` | `oxfordSensitiveSubstitution`, a 61-line name-rewriting variant | 61 | no comment; the matching assertion is commented out at `InstantiationMapJUTest.java:49-52` with "Don't know what this is for, we aren't using it" | name rewriting | superseded |
| `runtimeSystem/MethodInstantiater.java:291-…` | `visitInvokeDynamicInsn` | — | no comment; ASM's invokedynamic hook, never implemented | bytecode rewriting | sketch |
| `runtimeSystem/FortressExecutable.java:81-97` | `runExecutable(String args[])` with `FORTRESS_THREAD_STATISTICS` reporting | 17 | no comment; the live entry point does not print pool statistics | the compiled-program runtime; step 5 | finished, unwired |
| `interpreter/evaluator/tasks/TupleTask.java:85-116` | `forkJoin(TupleTask[] tasks)`, Doug Lea's suggested fork/join that avoids an interface call, "Actual code cribbed from jsr166y.forkjoin.ForkJoinTask" | 32 | stated: "Commented out because not supported in new jsr166y library"; the commit that did it is `b1344d278`, "New jsr166y" | the interpreter's task runtime; step 5 | superseded |
| `interpreter/evaluator/BuildEnvironments.java:311-347`, `:349-409` | `putOrOverloadOrShadow` and `putOrOverloadOrShadowGeneric`, the overload/shadow resolution for top-level environments | 37 + 61 | no comment; the class's own header comment at `:31-68` says "This comment is not yet true; it is a goal." | the interpreter's name binding | sketch |
| `interpreter/evaluator/values/Constructor.java:98-133`, `:220-237` | `addParamsToCollection` and an override-finder visitor | 36 + 18 | no comment | object construction | unknown |
| `parser_util/precedence_resolver/Resolver.java:337-360, 520-562, 645-686, 770-793, 843-866` | the original OCaml source of the precedence resolver, kept as comments beside the Java | 24+43+42+24+24 | no comment; it is the reference the Java was transliterated from | juxtaposition and precedence | superseded |
| `nodes_util/ExprFactory.java:2178-2190, 2237-2260, 2346-2362` | the OCaml source of block building, multi-dimensional array construction and unpasting | 13+24+17 | same convention | aggregate expressions; ledger 12, 49, 50 | superseded |
| `syntax_abstractions/phases/ComposingSyntaxDefTranslator.java:489-505` | `forListDepth` returns `source` unchanged; the 14-line implementation that would build a `List<Expr>` and splice it sits beneath, with `//throw new MacroError("not supported now")` above it | 17 | the commented throw records that the author chose silence over failure | grammar branch; ledger 290, 291 | sketch |
| `syntax_abstractions/phases/ComposingSyntaxDefTranslator.java:508-522` | `forOptionDepth` throws `MacroError("not supported now")` with its 13-line implementation commented beneath | 15 | stated in the throw | grammar branch | sketch |
| `syntax_abstractions/phases/TemplateVarRewriter.java:122-147` | `extendWithCaseBindings` hard-codes `Cons` (2 parameters) and `Empty` (0) and throws on anything else, under a bare `// FIXME!!!` | 26 | the FIXME is the whole record | grammar branch | sketch |
| `syntax_abstractions/phases/Transform.java:752-762` | `matchClause` repeats the same two-constructor restriction at evaluation time — "Nothing else implemented yet" | 11 | stated | grammar branch | sketch |
| `repository/ProjectProperties.java:340-346` | `astSuffixForSource(String)` | 7 | no comment | cache naming | superseded |
| `repository/GraphRepository.java:456-…`, `:902-910` | `dependencies(ComponentGraphNode)` and an api-node lookup | — + 9 | no comment | the repository graph | unknown |
| `repository/JavaDBRepository.java:97-240` | the whole `FortressRepository` interface commented out inside a class that implements none of it | ~140 of 246 | no comment; the class is referenced by nothing (§2.5) | persistence | sketch |
| `scala_src/overloading/OverloadingOracle.scala:109-134, 137-148, 150-164, 167-181, 198-…` | four successive versions of `satisfiesReturnTypeRule` and one of `isMeet` | 26+12+15+15+? | no comment; the live method is the fifth | the return-type rule; `Papers/Types/journal/justificationOfRTR.tex` | superseded |
| `scala_src/typechecker/OverloadingChecker.scala:385-…` | `if (false) { … }` running `validOverloading` eleven times and printing "Inconsistent overloading validity results" if they disagree | ~25 | a determinism harness left in, commented | overloading | finished, unwired |
| `scala_src/typechecker/CoercionOracle.scala:213-…` | `if (false)` selects a plain `AppCandidate`; the live `else` branch says "Trying to fake an overloading to see if we can get the schema right. So far this breaks things, but why?" | ~18 | the comment is the record: the *live* branch is the one the author distrusts | coercion; ledger 19 | unknown |
| `scala_src/typechecker/impls/Operators.scala:394-425` | `makeOpExpr` and `makeNewLink`, chain-expression construction in the checker | 15 + 13 | no comment | chained operators | superseded |
| `scala_src/typechecker/AbstractMethodChecker.scala:135-138` | the error that would report an unimplemented abstract method in an object expression | 4 | stated: "Unfortunately, this code does not work properly. The typechecker needs for object expression types to have names." | object expressions; ledger 127, 128 | sketch |
| `compiler/asmbytecodeoptimizer/DefUseChains.java:57-69` | `removeUnusedBoxedValues(bcmv)` in the optimizer's driver loop | 13 | no comment | the bytecode optimizer; step 4 | finished, unwired |
| `useful/BASet.java:326-339` | `headSet`, `tailSet`, `subSet` | 14 | no comment; `SortedSet` methods never needed | collections | sketch |
| `nodes_util/NodeUtil.java:215-225` | `getAsType(TraitObjectDecl)` | 11 | stated: "TODO: we want a way to convert a decl into the corresponding type." | AST utilities | sketch |
| `nodes_util/Unprinter.java:513-526` | a parenthesis case in the cache reader | 14 | no comment; the layer whose round trip is untested (§3.1) | the cache; step 0 | unknown |

### 2.2 Flags that default off (or on) with live code behind them

`Shell.java:1273-1286` is a class whose own comment reads "The fields of this class serve as temporary switches used for testing."

| Property | Default | What is behind it | Reached by | Judgment |
|---|---|---|---|---|
| `fortress.compile.typecheck` (`Shell.java:1275`) | **false** | the whole type-check phase; `StaticChecker.java:166` is `if (Shell.getTypeChecking() == true)` | set true by the `typecheck` and `desugar` subcommands (`Shell.java:445,459`); the interpreter path never sets it, which is why `README.md` §2 calls the interpreter's TYPECHECK phase inert | finished, unwired |
| `fortress.compile.desugar.objexpr` (`Shell.java:1276`) | **false** | nothing: `Shell.getObjExprDesugaring()` (`:260-262`) is read by no file in the tree, and `setObjExprDesugaring(true)` at `:444` therefore changes nothing | `fortress desugar`, a subcommand with zero tests (`test-coverage.md` A.3, `desugar` count 0) | sketch |
| `fortress.compile.testcoercion` (`Shell.java:1279`) | **false** | the `test-coercion` subcommand path | `Shell.java:459` onward | unknown |
| `fortress.compile.predesugar.assignment` (`Shell.java:1281`) | **false** | the `!Shell.getAssignmentPreDesugaring()` guards at `PreTypeCheckDesugaringVisitor.java:402,432` and `PreDisambiguationDesugaringVisitor.java:438,467` — turning it on moves compound and tuple assignment desugaring before disambiguation | — | unknown |
| `fortress.compile.predesugar.extendsobject` (`Shell.java:1282`) | **false** | the guard at `PreDisambiguationDesugaringVisitor.java:136` | — | unknown |
| `fortress.disable.contravariance` (`ProjectProperties.java:327-328`) | **true** | `OverloadSet.java:1162` passes `0` instead of `-variance`, disabling contravariance in overloaded dispatch; commit `c35aac139` (2012-04-24, David Chase) is "Preliminary disabling of contravariance (in overloaded dispatch)", the retreat the JuliaCon deck describes | every compiled program | finished, unwired |
| `fortress.test.compiled.environments` (`interpreter/env/CUWrapper.java:41`) | **false** | `SimpleClassLoader.loadEnvironment` instead of `BetterEnvLevelZero` at `CUWrapper.java:118` and `:150`, which is what the 1,231-line `compiler/environments/` package and the ENVGEN phase exist to produce | — | finished, unwired |
| `fortress.unittests.noopt` (`default_repository/configuration:51`, read at `FileTests.java:997`) | **true** | 226 tests: one `BytecodeOptimizeEverything` shell test plus a `runOpt` re-run of every `run` test — the only exercise the 43-file bytecode optimizer would get (`test-coverage.md` A.3) | — | finished, unwired |
| `fortress.test.leaks` (`ProjectProperties.java:325`) | false | leak checking | — | unknown |
| `fortress.bytecode.verify`, `fortress.bytecode.list`, `fortress.log.classloads`, `fortress.debug.method.tagging`, `fortress.debug.overloaded.methods`, `fortress.debug.analyzer.subtype`, `fortress.junit.verbose`, `fortress.astio.astgenserialization` | all false | diagnostics only | — | not dormant design |
| `FORTRESS_HELP_JOIN` (`runtimeSystem/BaseTask.java:146-164`) | — | the flag is now a no-op: the revival-era comment records that `java.util.concurrent`'s `join()` already helps, and that the helping broke a task-field invariant which the live code now saves and restores | every compiled program | (revival-era; noted, not counted) |

The reason ENVGEN is off is written once, at `interpreter/env/CUWrapper.java:35-40`: "Had to disable this, because (with additional unambiguous names) the search tree in the fortress library component env got too large. (Possible fix -- note when the number of cases is large, and subdivide into sub-methods)." That is a stated design with a stated repair, guarding 1,231 lines plus an excluded JUnit class (`TopLevelEnvGenJUTest`, `build.xml:982`).

### 2.3 `if (false)` and `if (true)` guards

Six in hand-written code, all listed above: `InstantiatingClassloader.java:168`, `CoercionOracle.scala:213`, `OverloadingChecker.scala:385` (inside a comment), `Disambiguator.java:335`, `NamingCzar.java:1730` (`if (true)` shadowing 13 further lines), `TupleTask.java:95` (inside a comment). The three in `parser/`, `parser/templateparser/` and `parser/import_collector/` are Rats! output.

### 2.4 `NI.nyi()` and `bug("Not yet implemented")`

`useful/NI.java` offers four refusals — `na()` "Not allowed", `ni()` "Not implemented", `np()` "Not possible", `nyi()` "Not yet implemented" — and only `nyi` marks intent.

Thirteen `NI.nyi` sites in `scala_src/`, the compiler-path front end:

| Site | What it refuses | Step / ledger | Judgment |
|---|---|---|---|
| `scala_src/useful/STypesUtil.scala:550` | a `KindInt` static parameter, in `makeInferenceArg` | step 1, ledger 307 | sketch |
| `scala_src/useful/STypesUtil.scala:551` | `KindBool` | step 1, ledger 307 | sketch |
| `scala_src/useful/STypesUtil.scala:552` | `KindDim` | dimensions; ledger 26 | sketch |
| `scala_src/useful/STypesUtil.scala:556` | `KindUnit` | dimensions; ledger 26 | sketch |
| `scala_src/useful/STypesUtil.scala:557` | `KindNat` — the wall the whole path runs into | step 1, ledger 307 | sketch |
| `scala_src/useful/STypesUtil.scala:1156` | inferring static args where the application has nowhere to put them ("No place to put inferred static args in application.") | inference | sketch |
| `scala_src/typechecker/staticenv/KindEnv.scala:126` | "non-type where clause bindings" — a `where` clause binding anything but a type | where clauses; `spec-to-implementation.md` ch. 12 | sketch |
| `scala_src/typechecker/impls/Common.scala:107` | calling a method on a union type ("You should be able to call methods on this type … but this is not yet implemented") | union types; `Papers/Welterweight` | sketch |
| `scala_src/typechecker/IndexBuilder.scala:301` | a `property` declaration in a trait body | tests and properties; ledger 122 | sketch |
| `scala_src/typechecker/IndexBuilder.scala:349` | a `property` declaration in an object body | ledger 122, 125 | sketch |
| `scala_src/useful/SExprUtil.scala:142, 148` | a `FunctionalRef` that is neither `SFnRef` nor `SOpRef`, when overloads are being attached | overloading | sketch |
| `scala_src/useful/SExprUtil.scala:163` | the same in `addStaticArgs` | overloading | sketch |

Three `bug("Not yet implemented: …")` sites, all in `scala_src/typechecker/IndexBuilder.scala:187-189`, refusing `TypeAlias` (ledger 18), `TestDecl` (ledger 120-121) and `PropertyDecl` (ledger 122) at api level — `IndexBuilder` runs on **both** paths, so these three are the only refusals in this section that the interpreter feels too (`README.md` §7).

Outside `scala_src/`, the interpreter has eighteen more, of which the ones that name a design rather than a corner are `interpreter/evaluator/types/SymbolicWhereType.java:30` ("Where clauses cause a stack overflow error"), `interpreter/evaluator/EvalType.java:288` ("Generic, generic in dimension"), `interpreter/evaluator/MakeInferenceSpecific.java:105,125` (keywords in arrow domains, varargs tuples), `interpreter/evaluator/LHSToLValue.java:104` (nested tuple on the left of a binding) and `compiler/disambiguator/TopLevelEnv.java:369`, itself commented out ("Disambiguator cannot yet handle the same Component providing the implementation for multiple APIs").

### 2.5 Classes referenced by nothing

Every `.java`/`.scala` under `ProjectFortress/src/com/sun/fortress` outside `nodes/`, `parser/` and `astgen/` whose class name appears in no other source file, no `.fss`/`.fsi`, and not in `build.xml`; JUnit classes (matched by build.xml filesets) and `nativeHelpers`/`glue` classes (named from Fortress source) removed.

| Class | Lines | What it is | Design area / step | Judgment |
|---|---|---|---|---|
| `compiler/optimization/Unbox.java` | 250 | the only file in its package: an abstract `Unbox` with `bitWidth()`, a Java representation letter, and a four-case taxonomy in its header comment — "1) primitive. ZZ{8,16,32,64}, RR{32,64}, Boolean 2) singleton (non-generic) object. 3) unboxed fields 4) comprises unboxed" | unboxing; step 4, ledger 306 | sketch |
| `repository/JavaDBRepository.java` | 246 | a Derby-backed repository, with the interface it would implement left as comments (§2.1) | persistence, the cache | sketch |
| `scala_src/linker/HygienicRenamer.scala` | 293 | renames every name in a constituent of a compound component so constituents can be merged into one flattened component | the linker; `linker_tests/` (9 files, no target) | finished, unwired |
| `compiler/desugarer/AssignmentDesugarer.scala` | 296 | an assignment desugarer; `AssignmentAndSubscriptDesugarer.scala` is the live one | desugaring | superseded |
| `exceptions/ApplicationError.scala` | 248 | structured diagnostics for a failed application | diagnostics | finished, unwired |
| `interpreter/env/IndexedEnv.java` | 427 | an `Environment` implementation whose every method is `// TODO Auto-generated method stub` returning null | the interpreter's environments | sketch |
| `interpreter/evaluator/ScoutVisitor.java` | 160 | a `NodeAbstractVisitor_void` whose every override calls `super` under an auto-generated stub comment | unknown | sketch |
| `interpreter/evaluator/transactions/manager/FortressManager4.java` | 163 | the fourth of the contention managers, "Similar to FortressManager3, but with better exponential backoff" | transactions | finished, unwired |
| `parser_util/instrumentation/Coverage.java` and `OptimizedParserGenerator.java` | 382 + 137 | grammar-coverage instrumentation, naming a `static_tests/` directory that does not exist (`Coverage.java:72`) | the parser | superseded |
| `useful/UsefulPLT.java` | 173 | the `Useful` methods that depend on the external PLT collections, split out so `Useful` stays dependency-free (stated in its header) | utilities | finished, unwired |
| `useful/UnicodeCollisions.java` | 178 | a Unicode-database reader finding character-name collisions, with the UCD field layout as a comment | the operator/name tables | finished, unwired |
| `useful/MacPortsHelper.java` | 214 | a topological sort over MacPorts dependencies | build tooling | finished, unwired |
| `compiler/environments/TopLevelEnvBenchmark.java` | 93 | a benchmark for the environment generator that is itself switched off (§2.2) | interpreter startup | finished, unwired |
| `fib_tests/FibTests.java` | 990 | a fib benchmark harness; its tail is marked "Below this line are preliminary and less informative experiments" (`:881-901`) | benchmarking; step 6 | finished, unwired |

`compiler/optimization/Unbox.java` is the one the map already names as an intent source for step 4 (`README.md` §4, §5); read in full, it is a taxonomy and two abstract methods, with no analysis and no rewriting — a sketch, not an unfinished implementation.

### 2.6 The `TODO` markers

556 lines carry `TODO` across `ProjectFortress/src/com/sun/fortress`. They are not listed; the distribution is the useful fact, and it says where the unfinished work was left.

| Package | TODO lines | Package | TODO lines |
|---|---|---|---|
| `interpreter/env` | 84 | `compiler/index` | 12 |
| `interpreter/evaluator` | 72 | `scala_src/typechecker/impls` | 11 |
| `interpreter/evaluator/values` | 63 | `scala_src/typechecker` | 10 |
| `compiler/codegen` | 45 | `scala_src/disambiguator` | 10 |
| `useful` | 38 | `scala_src/types` | 9 |
| `runtimeSystem` | 24 | `astgen` | 8 |
| `interpreter/evaluator/types` | 24 | `scala_src/useful` | 6 |
| `compiler` | 24 | `repository` | 6 |
| `exceptions` | 20 | `compiler/typechecker` | 5 |
| `nodes_util` | 15 | `compiler/desugarer` | 5 |
| `compiler/disambiguator` | 15 | `tests/unit_tests` | 4 |
| `interpreter/rewrite` | 13 | others (18 packages) | 23 |

Two thirds of the interpreter's 243 are in `env/`, `evaluator/` and `evaluator/values/` — the layer the 2012 team stopped maintaining; `syntax_abstractions/` has 4 in total, because its unfinished corners are thrown, not marked (§2.1).

Ten that state a design rather than a chore:

`interpreter/evaluator/values/Constructor.java:538-539` — "TODO this is WRONG. The vars need to be inserted into self, but get evaluated against the larger (lexical) environment. Arrrrrrrggggggh." (object field initialization and scoping; ledger 127, 128).

`interpreter/evaluator/values/GenericConstructor.java:172-175` — "TODO This is not quite right, because we risk identifying two functions whose where clauses are interpreted differently in two different environments." (generic memoization under `where` clauses).

`compiler/OverloadSet.java:579-580` — "TODO: should really erase to concrete least upper bound in type hierarchy, but that requires extending TypeAnalyzer." (the join that erases to `Any`; overload dispatch).

`compiler/codegen/CodeGen.java:2188-2192` — "TODO Really, the canonicalization of the type names should occur in static analysis. This has to use names that will be known at the reference site, so for now we are using the declared names. In rare cases, this might lead to a problem." (naming across the api/component boundary).

`compiler/codegen/CodeGen.java:1966` — "TODO: these ought to occur in parallel!" (on the commented-out `forDo`; step 5).

`scala_src/typechecker/AbstractMethodChecker.scala:135` and `scala_src/useful/STypesUtil.scala:1624` — "the typechecker does not know a name for the type of an object expression" (the same root cause stated twice; ledger 127, 128).

`scala_src/useful/STypesUtil.scala:1596-1600` — "TODO: work around the fact that TraitIndex includes two copies of the same Functional for exported functional methods … Really the latter ought to have a methodFunc with a different name() and no body." (functional methods in the index).

`scala_src/typechecker/TypeHierarchyChecker.scala:89` and `:125` — "TODO: Extend to handle non-empty where clauses." (conditional inheritance, the third of the three things the wind-down post says the team wished it had explored).

`nodes_util/NodeReflection.java:176-177` — "TODO Ought to make all leaf classes final, and check for that." (the serializer that the cache round trip does not test; step 0).

`nodes_util/NodeComparator.java:159-160` — "TODO Optional parameters on extent ranges are tricky things; perhaps they need not both be present." (static ranges; `basic/expressions/ranges.tex`).

`astgen/FortressAstGenerator.java:325` — "TODO: this won't be needed once TemplateGap's are removed from Fortress.ast" (the grammar branch's cost to every generated node).

## 3. Tests

### 3.1 Commented-out test bodies and assertions

| Item | What it is | Lines | Why dormant, if said | Step / ledger | Judgment |
|---|---|---|---|---|---|
| `tests/unit_tests/ASTJUTest.java:653-668` | `testFile`, the only whole-file parse of a serialized compilation unit | 16 | stated: "The file is missing too often" — it reads `test.sexp`, which is not in the tree | step 0; the cache round trip `README.md` §7 names as unasserted | finished, unwired |
| `tests/unit_tests/ASTJUTest.java:634-651` | `testDotted`, a `DottedId` round trip | 18 | no comment; the class it names (`interpreter.nodes.DottedId`) no longer exists | the AST | superseded |
| `tests/unit_tests/ASTJUTest.java:266-282` | `testMakeAssignment` | 17 | stated: "Gone, because we changed the structure of Assignment" | the AST | superseded |
| `tests/unit_tests/ASTJUTest.java:165-169` | `testDecodeIntLiteralExpr` — `10_16`, `10_SIXTEEN`, `FF_SIXTEEN` | 5 | no comment; radix-suffixed literals still parse | literals | superseded |
| `tests/unit_tests/ASTJUTest.java:171-219` | `testDecodeFloatLiteralExpr`, 49 lines asserting `0.1_2` … `1.1_16` in every radix from 2 to 16 | 49 | no comment; `ExprFactory.java:1704` is the live decoder, itself marked "TODO Getting the rounding and overflow dead right is hard" | literals; ledger 303 (the `FFloatLiteral` re-parse) | finished, unwired |
| `tests/unit_tests/TestTask.java:43-44` | the multi-threaded half of the read-set test: `TestTask2.forkJoin(tasks)` over 8 tasks × 256 transactions, and the assertion that the set holds 2,048 | 2 | not stated here, but `TupleTask.java:85` is: `forkJoin` was commented out when jsr166y changed, so `TestTask2.forkJoin` no longer exists and the two lines cannot simply be restored | concurrency and transactions; step 5; `test-coverage.md` C.2 | superseded |
| `runtimeSystem/InstantiationMapJUTest.java:48-52` | the `C=cat;D=dog` substitution case | 5 | stated: "Don't know what this is for, we aren't using it" | name rewriting | superseded |
| `runtimeSystem/InstantiationMapJUTest.java:55-57` | `testMaybeVarInLSemi`, a test method whose body is `// fail("Not yet implemented"); // TODO` — it passes by being empty | 3 | stated | name rewriting | sketch |
| `scala_src/overloading/OverloadingJUTest.scala:50-51` | `assertTrue(oa.moreSpecific(a1,a2))` and `assertTrue(oa.typeSafe(a1,a2))` — the only assertions in `testNonGeneric`, which otherwise builds a hierarchy and checks nothing | 2 | no comment; the methods they call are among the five commented-out `satisfiesReturnTypeRule` versions' neighbours (§2.1) | overloading; the return-type rule | finished, unwired |
| `useful/BATJUTest.java:80-93` | `test8` and `test8Dupes`, 8-element permutation sweeps | 14 | stated: "Too dadgum slow" | collections | finished, unwired |
| `tests/DivPrecedence.fss:23`, `:26` | `5 DIV 2 DOT 7 + 0 > 0` and `(4 DOT 5 DIV 4) = 8` | 2 | no comment; the live assertions in the same file cover the simpler groupings | precedence and juxtaposition | unknown |
| `tests/stringJuxt.fss:25,28,31,34` | four assertions that string juxtaposition equals `\|\|` concatenation | 4 | no comment; each sits beside a live assertion against a literal, so the *equivalence* is what is untested — the same equivalence row 76 records as broken on the compiled path | ledger 76 | finished, unwired |
| `tests/ReflectTest.fss:82` | `meet(b,c) TYPESEQ {d}` | 1 | stated: "(* not working correctly for now *)"; `join` is asserted on the line above | the meet rule; `Papers/Dispatch` | sketch |
| `tests/CharacterTest.fss:365` | `isValidCodePoint(char(3479)) = false` | 1 | no comment | Unicode | unknown |
| `tests/vectorOps.fss:22` | `vector[\RR64,5\](3.0)` equals the same vector built by `fill` | 1 | no comment | arrays, equality | unknown |
| `tests/TreapTest.fss:21` | the only structural assertion in the file; what remains is `println` | 1 | no comment; the whole test therefore passes by not throwing (`test-coverage.md`: a `testSystem` pass is "no exception and no `fail` in output") | data structures | finished, unwired |
| `library_tests/Integer3.fss:87-91` | five `shouldDivideByZero` assertions | 5 | no comment | integer division; the compiler prelude | unknown |
| `library_tests/MaybeTest9.fss:69-72` | four `SQCAP` assertions on `TestJust`/`TestNothingObject` | 4 | no comment; `SQCAP` on `Some`/`NoneObject` is itself commented out at `CompilerBuiltin.fss:1320-1322,1345-1346` (§1.1) | `Maybe`; ledger 71 | finished, unwired |
| `other_compiler_tests/MaybeTest15a.fss:48` | the same `SQCAP` assertion | 1 | same | ledger 71 | finished, unwired |
| `compiler_tests/TreapAndTest.fss:22` | the compiled twin of `tests/TreapTest.fss:21` | 1 | no comment | data structures | finished, unwired |
| `syntax_abstraction_tests/GrammarCompositionUseA.fss:20`, `UseB.fss:19`, `UseC.fss:19` | `assert((fn(baz) => baz)1, 1)` | 3 | stated: "illegal because baz is a keyword" — a grammar extension makes the identifier unusable, which is the hygiene problem `research/extracts/growing-a-syntax.md:120` is about | grammar branch | sketch |

Commented-out `println` calls in the corpora (`compiler_tests/Compiled17b,c,ddd,dddd,ddddd.fss`, `other_compiler_tests/TupleCastGeneric7.fss`, `tests/LongStringTests.fss:129-130`) are debugging noise and carry no design.

### 3.2 The aspirational directories

None of these is read by any target (`test-coverage.md` A.1); each is a statement of what was meant to work.

| Directory | Files | What its files reach for | Ledger rows | Judgment |
|---|---|---|---|---|
| `not_passing_yet/` | 58 `.fss`, 2 `.fsi`, 1 `.sh` | everything the front end could parse but not run: `WhereConstraints.fss` and `conditionalExtension.fss` (where clauses and conditional inheritance), `UnitExpr.fss` and `dimensionUnit.fss` (dimensions and units), `Expr.Array.Pasting.fss`, `arrayComp.fss`, `comprehensions.fss`, `toplevelArray.fss`, `singletonArray.fss`, `arrayArgs.fss` (arrays, pasting, comprehensions), `XXXextendOprParam1.fss` and `extendsParam.fss` (operator-parameterised traits), `contraTest.fss`/`contraUnification.fss` (contravariance), `HiLoInference.fss`/`testMethodInference.fss`/`staticArg.fss` (inference), `simpleForeignImport.fss`/`trivialForeignImport.fss` (`import java` on the interpreter path, the route `README.md` §3 says no test exercises), `keywords.fss` (keyword parameters), `monoidalPolymorphism.fss` (the algebraic traits), `knuth.fss` and `tree.fss` (whole programs) | 12, 23, 26, 27, 49, 50, 156, 214; where clauses `spec-to-implementation.md` ch. 12 | sketch |
| `long_term_not_working/` | 17 `.fss` in 6 subdirectories | the name says the verdict: `inheritance/MultipleInheritance.fss` (two traits each defining `m`, inherited into one object — the `excludes` problem), `overriding/` (8 files: diamond overriding with and without parameters, graph overriding, redundant graph overriding), `abstract/DiamondInheritance7.fss`, `closures/` (dotted methods, getter references, object fields as closures), `fields/` (ordinary and untyped parameter fields), `wordcount/` (map comprehensions, string indexing — and `MapComprehensions.fss` in fact tests chained comparison `1 < 2 <= 3`, so its name lies) | multiple inheritance and overriding, `Papers/Dispatch`, `Papers/Types` | sketch |
| `not_working_static_tests/` | 41 `.fss`, 1 `.test`, 1 `README` | static checking the checker cannot do: 12 `DXX*` files (array elements, double subscript, function expressions and their type inference, generalized `if`, generator tuples, varargs method invocation, subscript expressions, `while` returning void), `Multifix.fss`, `LooseJuxt.fss`, `MathPrimary.fss`, `SetComprehension.fss`, `CrazyGenerators.fss`, `GeneratorOverload.fss`, `ClosureGenericOverload1/2.fss`, `SelfTypeTest.fss`, `DoFrontWithSpawn.fss`, `ExitNotThroughSpawn.fss`, `ExternalConstructor.fss`, `SingleImport.fss`. Its `README` points at a wiki page on `projectfortress.sun.com` that no longer exists and a ticket number (#262) with no tracker | 29 (multifix), 49, 50, 12; `spec-to-implementation.md` | sketch |
| `not_working_library_tests/` | 25 `.fss`, 4 `.fsi` | one story told 29 times: `Maybe`/`Option` with `Equality[\Self\] comprises Self` (`MaybeTest1,2,5,10`), the `Comparison` total order (`Comparison*.fss` ×6 plus `ComparisonLibrary.fss/.fsi`), equality bugs (`EqualityBug2,3`), `MatchErrorBug*` (3 pairs), inference (`FailInference2`), generators (`GenTest3,4,5,8` — `GenTest8` is the only importer of `GeneratorLibrary`) | 71 (`Maybe` absent from the compiler prelude); §1.1, §1.4 | sketch |
| `not_working_compiler_tests/` | 6 `.fss`, 3 `.test`, 1 `.timing` | `MaybeTest15.fss` (the `Maybe` story again, this time importing `CompilerAlgebra` explicitly), `OpParam1/2.fss` (operator-parameterised traits, `opr BAR`), `patternMatching1a.fss`, `MoreOverload.fss` with its own `.timing`, `Compiled5.ad.fss` | 71; §1.4 | sketch |
| `obsolete_interpreter_tests/` | 3 `.fss` | `monoidal.fss` declares `Identity[\opr OPLUS\]`, `Zero[\opr OTIMES\]`, `Monoid`, `EquivalenceRelation` by hand — the algebraic-trait layer written as user code; `extendOprParam.fss` and `extendOprWithParam.fss` extend a trait by an operator parameter | the tower; step 2 | sketch |
| `compiler_regressions/` | 6 `.fss`, 1 `.fsi`, 3 `.test` | fixed bugs with `.test` files and no runner: `seqv`, `any`, `object_from_diff_component`, `parent_method_override`, `CoBoA` | — | finished, unwired |
| `linker_tests/` | 9 `.fss`, 2 `.fsi` | the component-aliasing linker: `A/B/C`, `Foo/Bar/Quux`, `I`/`J` api pairs, `ComplexJar.fss`; the only consumer is `bin/comp/tlink` → `LinkShell.java:21`, and `linker/README` ends "TODO: generation of aliases." | the linker; `HygienicRenamer.scala` (§2.5) | finished, unwired |
| `BirdyLib/` | 31 `.fss`, 15 `.fsi`, 1 `.orig` | a second, parallel library — `List`, `Map`, `Set`, `Maybe`, `PureList`, `Pairs`, `Comparison`, `Bazaar`, `GenomeUtil2c` — with nine test drivers; it is the only live importer of `GeneratorLibrary`, and nothing names the directory | step 2 (an alternative prelude nobody has read) | unknown |

## 4. Specification

### 4.1 The `%` convention, and what is genuinely commented out

In `Specification/`, a `%`-prefixed Fortress declaration is almost always the ASCII source of the Fortify-typeset block that follows it; the reading rule is to look at the next non-blank line, and if it is `\begin{Fortress}`, `\Method`, `\Function`, `\Getter`, `\Value` or `\Type`, nothing is disabled.

This accounts for all 511 comment lines of `advanced-lib/algebraic-constraints.tex` (81 blocks, every algebraic trait from `UnaryPredicate` to `BooleanAlgebra`, `Ring` at `:1541` and `Field` at `:1761` among them), 142 of `basic-lib/dimensions.tex`, and the bulk of `advanced-lib/binary.tex`, `basic-lib/basic-integers.tex`, `basic-lib/numbers.tex` and `advanced-lib/numbers-advanced.tex`.

What is genuinely dormant:

| Item | What it holds | Lines | Design area / step | Judgment |
|---|---|---|---|---|
| `Specification/advanced-lib/binary.tex:3004-3085` | the chapter's scratch tail, after the last rendered block: the design of `BinaryEndianLinearEndianSequence` in prose ("you can declare the endianness information once for the sequence of words"), the `split` semantics, a worked IEEE-double assembly by bit concatenation, an `object IPHeader` decoding an IP packet header under SPARC bit numbering, and `maxMultiplyBitLog = 6` / `maxDivideBitLog = 6` / `indexIntBitLog = 6` | 82 | binary words and endianness; nothing on the path | sketch |
| `Specification/fortress/preamble.tex:99-155` | the Version 1.0 front matter: that the release ships with a compliant interpreter, that every code sample was executed and every display rendered by Fortify, which features were dropped to synchronize spec with implementation, and the closing goal — "to build off of the infrastructure of our interpreter to construct the first optimizing Fortress compiler" | 57 | the project's own statement of the compiled-path goal, in its own words | superseded (by the July 2012 draft's own preamble) |
| `Specification/fortress/fortress.tex:33` | `%\releasetrue`, under "Please uncomment the following line for a release version. -- Sukyoung" | 1 | the switch that hides the 230 `\note{}` boxes and the Internal Document (`design-intent-sources.md` §4) | finished, unwired |
| `Specification/preliminaries/intro/acknowledgments.tex:19-27` | the acknowledgment categories the authors kept but did not print: "Interns and externs", "People who signed the SCA form", "People who issued tickets" | 9 | attribution; `research/authorship.md` | sketch |
| `Specification/appendices/internal-document.tex:94-103, 230-240, 269-283, 324-326, 378-388, 596-598` | six worked api/component examples inside the rationale appendix, kept as comments beside their rendered forms or with no rendered form at all | 3-5 each | components, apis, `typecase`, object identity | unknown |
| `Specification/appendices/FAQ.tex:202-211` | the api/component example for the core-versus-standard-library answer | 9 | `design-intent-sources.md` §4 | unknown |
| `Specification/basic/traits.tex:677-688` | `trait T` with `f(x) = 17`, `abstract h(x)` and `f(x) = (self asif T).f(x)` — the `asif` idiom | 12 | traits and overriding | sketch |
| `Specification/basic/conversions-coercions.tex:269-275, 616-618, 846-853` | three coercion examples: two `coerce` declarations in one object, `trait Number coerce(z:ZZ)`, and `opr DOT` on `RR32` | 7+3+8 | coercion; ledger 19 | sketch |
| `Specification/basic/lexical-structure.tex:1477-1482` | rows of a rendering table marked `WRONG:` beside their corrected forms | 6 | numeral rendering; Fortify | superseded |
| `Specification/advanced/parallelism-locality/shared-local.tex:65-68, 79-83` | the `localVar := sharedVar.copy()` example and a `\input` of a parallel-shared example | 4 + 5 | the `copy` that `Library/FortressLibrary.fss:71` also lacks (§1.1) | finished, unwired |
| `Specification/advanced/parallelism-locality/defining-generators.tex:238-241` | a multi-generator comprehension form | 4 | generators | unknown |
| `Specification/appendices/future.tex:372-375, 514-516` | the `Identity[\+\]` branch-type example and an `api A.B` nesting example | 4 + 3 | see §4.3 | unknown |
| `Specification/basic/functions.tex:305-308` | `sin(pi)`, `arctan(y,x)`, `makeColor(red=5, green=3, blue=43)` — the keyword-argument example | 4 | keyword parameters, the first `\note` of that chapter | sketch |

There is no `\iffalse` anywhere in the repository. The only conditional switch is `\ifrelease`, declared at `Specification/fortress/fortress.tex:24-29`, set from the command line, forced false in practice by the commented `\releasetrue` at `:33`, and read at `:35-37` (it empties `\note` and `\marginnote`), `:112` (Version 1.0 versus "July 19, 2012") and `Specification/appendices/appendices.tex:24-26` (it drops the Internal Document chapter).

### 4.2 `\note{}` boxes that say a feature is not supported

62 passages across `Specification/` say "not yet supported", "not supported yet" or "unimplemented"; the chapter-opening ones are a feature-by-feature map of the 2012 gap, and every one of them is invisible in the published 1.0 PDF.

| Chapter (file) | Feature named as unsupported |
|---|---|
| `preliminaries/overview.tex:21` | distributions; some ASCII conversion; some common types; and §programming-env…§apitool "are out of date" |
| `preliminaries/intro/nutshell.tex:15` | keyword and varargs parameters; components linking; distributions |
| `basic/programs.tex:16` | Unicode synonyms; most ASCII encodings of Unicode characters |
| `basic/lexical-structure.tex:18` | connecting punctuation; `LINE SEPARATOR`/`PARAGRAPH SEPARATOR`; most ASCII conversion; dimensions and units |
| `basic/declarations.tex:20` | qualified names; dimensions and units; tests and properties; where clauses; keyword and varargs parameters; type aliases |
| `basic/types-vals-vars.tex:19` | dimensions and units; type aliases; some library types |
| `basic/trait-parameters.tex:15` | non-type static parameters; static expressions — and "the examples in this chapter are not tested nor run by the interpreter" |
| `basic/traits.tex:16` | method contracts; abstract functional declarations |
| `basic/objects.tex:15` | value objects; properties |
| `basic/variables.tex:16` | `io` functionals; matrix unpasting |
| `basic/functions.tex:19` | keyword and varargs parameters; where clauses; contract checking; tail-call optimization |
| `basic/overloading.tex:15` | keyword and varargs parameters |
| `basic/dimensions.tex:15` | dimensions and units — examples not tested |
| `basic/conversions-coercions.tex:15` | widening; where clauses — examples not tested |
| `basic/tests.tex:15` | tests and properties — examples not tested |
| `basic/exceptions.tex:16` | methods and fields of exceptions; chained exceptions; static checking of checked exceptions |
| `basic/matrix-unpasting.tex:15` | matrix unpasting |
| `basic/operators/intro.tex:13` | multifix operators; dimensions and units |
| `basic/operators/opr-fixity.tex:15` | multifix operators |
| `basic/operators/juxtameaning.tex:15` | qualified names |
| `basic/components/source-code.tex:53` | `import api AliasedAPINames`; qualified names |
| `basic/evaluation/values.tex:16` | `LinearSequence`, `HeapSequence` |
| `basic/evaluation/parallelism.tex:15` | reduction variables; deferred exceptions |
| `basic/evaluation/reduction.tex:15` | reduction variables |
| `basic/evaluation/io.tex:15` | the check for I/O actions |
| `basic/evaluation/memory-ops.tex:15` | the initializing-write check |
| `basic/expressions/comprehensions.tex:15` | array comprehensions |
| `basic/expressions/aggregate.tex:15` | some aggregate operators; matrix unpasting |
| `basic/expressions/ranges.tex:15` | static expressions; static range types; some range operations |
| `basic/expressions/constant.tex:15` | static expressions |
| `basic/expressions/generators.tex:15` | distributions |
| `basic/expressions/for.tex:15`, `also.tex:15`, `case.tex:77` | reduction variables |
| `basic/expressions/atomic.tex:15` | `atomic` and `io` modifiers on functionals |
| `basic/expressions/spawn.tex:15` | static checking for `io` actions |
| `basic/expressions/try.tex:15` | chained exceptions |
| `basic/expressions/bindings.tex:15`, `:115` | qualified names; the definite-assignment check |
| `basic/expressions/object.tex:15` | property declarations; where clauses; naked type variables in `extends` |
| `basic/expressions/others.tex:15` | some library functions — "even for the supported functions, they are not run by the interpreter yet" |
| `advanced/overloading.tex:15` | keyword and varargs parameters |
| `advanced/operator-definitions.tex:15`, `:112` | multifix operators; keyword parameters |
| `advanced/defining-dimensions.tex:15` | dimensions and units |
| `advanced/parallelism-locality/intro.tex:12`, `distributions.tex:15`, `arrays-distributed.tex:16` | distributions; `HeapSequence` |
| `advanced/parallelism-locality/shared-local.tex:15`, `:64`, `:78` | the `copy` method; two examples "commented out because not supported" |
| `advanced/parallelism-locality/transactions.tex:31` | an example "commented out because not yet supported nor run by the interpreter" |
| `appendices/rendering.tex:15` | identifiers including connecting punctuation |
| `appendices/grammars/concrete-syntax.tex:19`, `appendix-cst.tex:18` | the grammar appendices state outright that they include unimplemented features |
| `library/apis/Heap.tex:44` | a stated data-structure limitation, "not yet implemented" |
| `library/apis/QuickCheck.tex:573` | "(*) Not supported by Fortress yet", carried through from the library source |
| `library/apis/FortressLibrary.tex:53` | "copy is presently unimplemented", carried through from `Library/FortressLibrary.fss:71` |

`Specification/fortress/preamble.tex:55-96` is not a note but a live one-page figure, "The not-yet-supported features include:", listing 39 items — from widening coercion and multifix operators through unboxed types, distributions, dimensions and units, tests and properties, type aliases, where clauses and conditional extension, to tail-call optimization and components linking. It is the closest thing in the repository to a single-page statement of what was left undone, and it is printed in the draft build (`preamble.tex:46-49` explains the convention: "This version of the specification is not yet for a release; … This specification includes descriptions of unimplemented features in boxes").

Judgment on the whole of §4.2: **sketch** for the features named, and **finished, unwired** for the apparatus — the notes exist, are typeset, and reach no reader because `\releasetrue` is commented out in the direction that hides them from the published PDF, not from the draft.

### 4.3 `Specification/appendices/future.tex` — the proposals

756 lines in eleven subsections, "largely a digest of meetings and emails, with the participants named" (`design-intent-sources.md` §4). One line per proposal, at the file's own top level; nested items are the discussion beneath.

**Syntax and Evaluation** (`:18`): extension of Bracketmania for multiset notation (`:20`); mathematical notation for alternatives (`:24`); Jan's note #82 "Unboxed Types: the design space" (`:29`) with fourteen sub-items settling flattened representation, copying semantics, fixed size, header-freedom, no object identity, and boxing for unboxed traits (`:31-44`); mutual recursion in value objects (`:47`) with the participants' positions recorded verbatim and the outcome that a cycle across components loses the size guarantee (`:49-57`).

**Types** (`:61`): Guy's proposal for making tensors the principal user-level indexed aggregate type (`:63`); more powerful type aliases (`:75`); `_` ("whatever") as a type variable, with four use cases and three stated problems (`:96`).

**Traits and Objects** (`:150`): overriding, two dated revisits (`:152`, `:156`); array indexing (`:186`); whether object trait types may appear in `extends` clauses (`:209`); type variables in `excludes` clauses (`:212`).

**Functions and Overloading** (`:225`): functional applicability (`:227`); relaxing restrictions on static parameters of overloaded functionals (`:236`); overloaded functionals with different `throws` clauses (`:257`); overloading with static parameters (`:259`); David's "nice" overloading proposal (`:261`); Victor on overloading under the open-world assumption (`:262`); the exclusion rule for declarations with different static parameters (`:264`); whether to consider exclusion between static-parameter bounds as well as ground types (`:265`); identifying the intersection of two `comprises` types with the union of their common subtypes (`:269`).

**Expressions** (`:306`): pattern matching (`:308`); generator clauses and whether a clause list may start with a filter (`:310-318`); comprehension syntax, with Steve's complaint, Guy's reply on mutually exclusive syntax, and four candidate forms (`:321-359`); exiting from a function expression (`:363`); types of branch expressions (`:370`).

**Operators and Coercions** (`:388`): `BIG AND:` (`:390`); conditional chaining operators (`:391`); surprising behavior with coercion, and a proposed change to the overloading rules (`:393`).

**Exceptions** (`:397`): exception behavior of `atomic` (`:399`); naked type variables in `throws` and `catch` (`:405`, `:486`); a `StackTraceElement` trait with `fillInStackTrace`, `getStackTrace`, `setStackTrace` (`:411-418`); light-weight exceptions (`:421`); exceptions against transactions (`:422`) and against multiple threads (`:423`); sugar for the expand/wrap/catch/unwrap idiom (`:425`); inference for `throws` clauses (`:488`).

**Components and APIs** (`:501`): top-level expressions (`:503`); apis (`:505`); the namespace of apis (`:510`); automatically imported apis (`:548`); component and api names carrying the development team's URL and a timestamp (`:663`).

**Others** (`:667`): properties and concurrency (`:669`); the reflection story for Fortress (`:671`); native code (`:673`); purity and a sandbox (`:679`); `idiom` as a declaration form (`:690`); a Compliant Implementation chapter (`:715`); rewriting inheritance in terms of implicit declarations (`:724`); equivalence and equality (`:727`).

**Tools** (`:748`): the `api` tool (`:750`).

Judgment for the whole appendix: **sketch**. Twenty-seven of these items point at email threads by subject and date, and `research/README.md:103-105` records that no archive of those lists was found; the digest is what survives of them.

## 5. Papers and design documents

| Item | What it is | Size | Why dormant, if said | Judgment |
|---|---|---|---|---|
| `Papers/Implementation/` | `TypeMapping.tex` and `MethodMapping.tex`, the JVM encoding of every Fortress type and every function/method form — the only written source for step 3 and step 4's representation decision | 2 documents | the makefile's only source, `FortressEncodings.tex`, is absent from the tree and from the tracked history (`design-intent-sources.md` §1) | finished, unwired |
| `Papers/Implementation/MethodMapping.tex:144` | `****TODO: update the following 2 paragraphs****`, above the two paragraphs describing the container file and the non-rewritten schema that "help work around the lack of a linker in the current implementation" | 2 paragraphs | stated | sketch |
| `Papers/Implementation/MethodMapping.tex:150-…` | "Modifications to incorporate overloading of generics", three requirements (symbolic instantiator, dispatch cache, erased `apply` with casts) written as future work | 1 subsection | it is a plan, not a record | sketch |
| `Papers/Types/journal/justificationOfRTR.tex:111`, `:566` | "TODO - introduce types." in the Terminology section, and "will now pass the return type rule as well (TODO)" where the proof of the covariant special case should be | 2 gaps | stated | sketch |
| `Papers/Welterweight/dispatch.tick:412-425` | a worked contravariance example abandoned mid-derivation: "{\bf XXXX At this point we appear to get stuck, because no instance of Pair is a subtype of any instance of P. And we had to use separate Pair and P because objects cannot have covariant type parameters.}" | 14 | stated; the same retreat as `fortress.disable.contravariance` (§2.2) | sketch |
| `Papers/Types/*.tick`, `Papers/Welterweight/paper.tick:55-57` | a `\TODO` macro defined in red, with a commented-out empty definition beside it for the camera-ready, and ~20 `%% \TODO{…}` reviewer questions left in the sources | ~20 | the convention is the record | sketch |
| `ProjectFortress/src/com/sun/fortress/syntax_abstractions/productionsAndAst.txt` | the list of grammar productions a user grammar may extend: 91 productions named, **4 marked `x`** for extendable — `DelimitedExpr` (twice), `BlockElems`, `Literal` — under the heading "(Only those marked \"x\" can be extended currently)" | 127 lines | stated | sketch |
| `ProjectFortress/src/com/sun/fortress/parser/parser-doc.txt:13,18,51,56,61` | five `NYI:` markers in the Rats! module map: dimension and unit declarations (twice), `nat`/`int`/`bool`/unit constraints in where clauses, dimension and unit types, unit expressions | 5 lines | stated | sketch |
| `ProjectFortress/src/com/sun/fortress/linker/README` (last line) | "TODO: generation of aliases." — the linker's own unfinished half, matching the 11 orphaned `linker_tests/` files (§3.2) | 1 line | stated | sketch |
| `Documentation/Specification/Prose/README.txt:42,50` and `Root/README.txt:42,50` | "build-options: Adjustable options for building the specification. (* not yet used *)" and "build-options.tex: LaTeX macros from build-options (* not yet generated *)" | 4 lines | stated | sketch |
| `Documentation/Specification/` | the second, later, partial spec source in Fortify `.tick` form, carrying 35 `\note{}` passages of its own (including the same multifix, keyword-parameter and qualified-name notes as `Specification/`), with a 65-page render against the draft tree's 599 | a tree | superseded by `Specification/` for coverage, but it is a *later* rewrite, so which supersedes which is not settled by dates alone | unknown |
| `ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/operators.txt` | 1,093 lines of operator groups by meaning and shape; 20 lines are commented | 20 lines | no comment | unknown |
| root `README.txt` | the Subversion-era orientation, describing a layout the tree no longer has (`design-intent-sources.md` §5) | a file | superseded | superseded |
| `BasicCoreFortress/` | a core-calculus interpreter in Scala with its own `.bcf` example files and a `CFTest` runner, built and run by hand only | a tree | no comment; nothing in `build.xml` names it | finished, unwired |

## Not verified

Nothing here was run. No `ant` target, no `fortress` invocation, no shadow compile; every "would work if connected" judgment is a reading of the code, not a test of it, and the ones most likely to be wrong are the library entries whose bodies call names the surrounding world may not define.

`git log -S` was used on four distinctive strings only (`compilerAlgebra(),`, the `Library/incomplete` path, `GeneratorLibrary.fss`, and the jsr166y sentence). Every other "why dormant" in this file is the comment in the source, or is marked as absent. Path-scoped history in this repository is unreliable in both directions (`research/authorship.md:14-22`), so the four that did return are samples, not proofs.

The counts of commented-out blocks are the output of two scanners (a nesting-aware `(* … *)` reader that treats `(*)` as a line comment, and a contiguous-`//`-run detector requiring six lines and half of them code-shaped); both will miss a one-line disabled declaration and both will over-report a long prose comment that happens to contain a semicolon. The 47 + 19 library figure and the 70 source-block figure should be read as "about that many", and the tables list what was read, not what was counted.

The "imported by nothing" analysis matches `import X`, `import {…} from X` and `from X` in `.fss`/`.fsi` only; an api reached by a means other than an import statement would be missed, and `Library/Testable` is exactly such a case (extended without being imported), so there may be others.

The `\note{}` table is keyed on the chapter-opening note of each file; multi-note chapters (`basic/lexical-structure.tex` has 19, `basic/traits.tex` 15) have only their first note read, and the rest are counted in `design-intent-sources.md` §4 but not read here.

The specification's `%` blocks were classified by whether the next non-blank line begins a Fortify display; a block separated from its display by intervening prose would be misfiled as dormant. `advanced-lib/binary.tex:3004-3085` was confirmed by reading to the end of the file; the shorter entries in §4.1 were not each confirmed against the rendered PDF.

Whether `Library/incomplete/`, `BirdyLib/` or the `not_working_*` corpora would parse, let alone run, under the current interpreter was not tested; `Library/incomplete` is known only to be off the source path (`default_repository/configuration:44`).

The 556 `TODO` count is of lines matching the literal string, including javadoc boilerplate in `useful/`; the per-package table inherits that.

## Decisions not made

Whether to uncomment `WellKnownNames.java:124` and put `CompilerAlgebra` back in the compiler prelude, and what that does to the 1,377 (the five `Comparison*` and four `Maybe*` files in `not_working_library_tests/` are the reason to find out).

Whether `Library/GeneratorLibrary` is the seed for reductions on the compile path, as `README.md` §4 already asks; this survey adds only that it is a finished protocol rather than a stub, and that its one live importer is `BirdyLib/`, which nothing reads.

Whether `Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE` (1,329 lines) and `Fortress.PartialTotalOrders` should be read as the design document for step 2's algebra layer, alongside `Specification/advanced-lib/algebraic-constraints.tex`, or left where they are.

Whether the dimension and unit libraries under `Library/incomplete/basic/` are worth putting on the source path to see what the interpreter says, given that ledger 26 and 27 already record the mechanism as dead at the declaration.

Whether to turn on `fortress.test.compiled.environments` and the ENVGEN phase, given that the reason for turning them off is written down together with a proposed repair (`CUWrapper.java:35-40`), and whether `fortress.disable.contravariance` should ever be set false to see what fails.

Whether the 226 tests behind `fortress.unittests.noopt` come into the gate — already on the map's list (`README.md` §4), restated here because it is the largest single body of dormant testing in the tree.

Whether `ASTJUTest.testFile` is restored with a committed `test.sexp` as part of step 0's cache round-trip assertion, and whether `TestTask`'s multi-threaded half is rewritten against `java.util.concurrent` rather than restored (the method it calls no longer exists).

Whether the specification's draft-only apparatus is surfaced — `design-intent-sources.md` already puts this on the table; §4.2 adds that the 62 "not yet supported" notes and the 39-item figure at `preamble.tex:55-96` are, together, a ready-made gap list that predates our ledger by fourteen years.

Whether `Papers/Implementation` is made buildable, restated from `design-intent-sources.md` because §5 here adds that its `MethodMapping.tex` carries an explicit `****TODO****` over the two paragraphs that describe the linker workaround.

Whether `BirdyLib/`, `Library/Relation`, `Library/PrefixMap`, `Library/Lazy`, `Library/Reader` and `Library/Testable` are kept, wired or removed; the map's dead-code decision (`README.md` §4) covers the Java side and not these.
