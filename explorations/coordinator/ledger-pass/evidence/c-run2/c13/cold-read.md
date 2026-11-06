# Cold read: c-run2/c13

Read with only `CLAUDE.md`, the `fortress-repo` skill's core and its `references/` (not `revival-changes.md` or `sources.md`). The row template, which defines the status words, is in the ledger and was not read; I read `NEGATIVE-VERIFIED` as "the gap is confirmed and open, build a fix" and `CONTESTED` as "open question, wait for a decision", from `records.md` ("The last three close a row"; `close --settled` for a `CONTESTED` row).

## Row 790

- **Defect:** On the compiled path, an object whose `extends` set names the same trait twice compiles and links, but the JVM refuses to load its class (`ClassFormatError`, "Duplicate interface name"), because code generation writes one JVM interface per entry. The specification calls the clause a set, so the repeat should collapse to one; walk runs the object as a `Tr`.
- **Where:** compiled path only; code generation of `extends` clauses, `NamingCzar.extendsClauseToInterfaces` (`NamingCzar.java:779-803`).
- **Reproduce:** run `compiler_tests/XXXDuplicateExtendsEntry.test`, or compile and run `object Twice extends { Tr, Tr } end`. `extends { Any, Any }` no longer shows it, since an earlier desugaring rewrites that clause to `{Object}`.
- **Status:** open; build a fix (drop the repeated entries before writing interfaces). Workaround: list each trait once.
- **Could not resolve:**
  - "checks for no repeat": two readings, "checks that there is no repeat" (which would contradict the crash) or "does not check for a repeat". From context the second is meant. Unclear wording.
  - "the pre-disambiguation desugaring": which phase that is; the skill's phase list does not name it. A term I could not find.
  - "siblings: 414": I read it as "related row 414". Not defined in the skill.

## Row 889

- **Defect:** The code generator crashes with a `NullPointerException` when a trait or object extends a generic trait whose static argument is a tuple type that holds `Any`, as `Holder[\(Any, ZZ32)\]`. The checker accepts the program. The tuple branch of `generateTypeReference` passes an element that is neither a trait type nor a type variable (here `Any`) back to itself with a null name, and `NamingCzar.repairedApiName` dereferences that null.
- **Where:** compiled path, code generation; `CodeGen.java:6024` (tuple branch), `NamingCzar.java:1720`. The arrow-type branch (`CodeGen.java:6051`) makes the same call and probably fails alike, not measured.
- **Reproduce:** `compiler_tests/XXXExtendsGenericAtTupleOfAny.test`, or compile `object PairHolder extends Holder[\(Any, ZZ32)\]`; the message names `id_or_op` as null.
- **Status:** open; build a fix in the tuple branch (and check the arrow branch). Workaround: a named trait in place of `Any`.
- **Could not resolve:**
  - What walk does with the program: the row names no walk behaviour, so I cannot tell whether walk runs it or whether only one path was tried. The skill asks a row to say which paths show the defect. Missing information.
  - "siblings: 820": as for row 790.

## Row 366

- **Defect:** On the compiled path a generic object whose only static parameter is an `opr` parameter cannot be built: `Op[\+\]()` compiles but dies with `NoSuchMethodError` on `factory()` of its RTTI class. The run time folds the `opr` arguments into the class's name and then calls `factory()` even when no parameter is left, and such an RTTI class has only an `ONLY` field and no factory. Walk prints `Op[\+\]`.
- **Where:** compiled path, run time: `MethodInstantiater.rttiReference` (`runtimeSystem/MethodInstantiater.java:119-132`).
- **Reproduce:** `compiler_tests/XXXOprParamRungS.test`; or compile and run `object Op[\opr ODOT\]() end` with `println(Op[\+\]())`. The test expects walk's output `Op[\+\]`.
- **Status:** open; build a fix. A three-line fix (take `ONLY` when no parameter is left, as the non-generic branch does) is sketched and ran the program, but was not gated.
- **Could not resolve:**
  - "the stem's name" and `ONLY`: I take the stem to be the class name before the static arguments and `ONLY` to be the singleton field of an RTTI class with no parameters; neither is in the skill. A concept I lack (the run time's RTTI class layout).
  - "F-39": a FACTS entry; the skill says to print it with `$T 'F-39'`, but this read may not, so I do not know what it adds.
  - "full text: history, row 366": I read it as "the longer earlier text is in `explorations/fortress-gap-ledger-history.md`", but that is a guess at the abbreviation.

## Row 404

- **Defect:** The compiled checker accepts the variance keywords `covariant` and `contravariant` on a trait's type parameter and lets a `CImpl[\Dog\]` bind to `C[\Animal\]`; the compiled run then dies with `IncompatibleClassChangeError`, since nothing carries variance to run time. Walk refuses the binding. The language as the skill describes it is invariant ("there is no `+T` or `-T`"), and POSITIONS calls the keyword future work.
- **Where:** compiled checker (accepts) and compiled run time (dies); walk refuses. No file of the tree is named for the acceptance.
- **Reproduce:** no test. The probe `explorations/reviews/spec-refused-examples/probes/AltCovariantVariance.fss` and a contravariant twin, read from the parent of commit `84aef6a4f` (I take it they were deleted there, so `git show 84aef6a4f^:PATH`).
- **Status:** unclear to me. `NEGATIVE-VERIFIED` says build a fix, but the notes say the feature is future work per POSITIONS. I cannot tell whether a worker should make the checker refuse the keywords now, build variance, or leave the row.
- **Could not resolve:**
  - What the fix is: refuse variance in the checker, or build it. The status and the notes point two ways. Unclear wording.
  - The contravariant probe's file name ("its contravariant twin beside it") is not given.
  - Why the specification cell names "Where Clauses" for variance. Not explained.
  - "full text: history, row 404": as for row 366.

## Row 406

- **Defect:** An object that extends two instantiations of one generic trait that differ only in a `bool` static argument, `{ Flag[\true\], Flag[\false\] }`, passes the compiled checker, then code generation throws "Only emitting RTTI for types right now". The checker's comparison of static arguments (`cP` in `checkP`) knows only type and size arguments and has a "Todo: Handle bool args"; code generation's `BoolArg` branch throws. Walk runs the program.
- **Where:** compiled path: checker `scala_src/types/TypeAnalyzer.scala:544-552` and code generation `CodeGen.java:6085-6108`.
- **Reproduce:** `compiler_tests/XXXBoolExtendsTwice.test`, or compile the object above with `trait Flag[\bool b\]`.
- **Status:** open; build a fix: a `bool` case in `cP` beside the size case, plus a decision on what code generation emits for a `bool` static argument in an `extends` clause.
- **Could not resolve:**
  - "instantiation exclusion": a checker rule I do not find in the skill. I cannot tell whether the program is meant to be refused (two different instantiations of `Flag`) or to compile and run as under walk. Read with row 414, I think it should be refused, but the fix's "decision on what code generation emits" suggests some such clause must compile. A language concept I lack, and the expected result is not stated.
  - "returns no exclusion": whether "no exclusion" means "the two are not known to differ" (so they pass) or "the comparison gives nothing". Unclear wording.
  - Who makes "a decision": the curator, or the worker. Unclear.

## Row 414

- **Defect:** When an object extends two instantiations of one trait and an argument is a static parameter, `O[\nat n\] extends { Vec[\n\], Vec[\3\] }` (and a type twin `Vt[\T\], Vt[\ZZ32\]`), the compiled checker passes it and the class dies at load with `ClassFormatError` "Duplicate interface name". The extends check asks `definitelyExcludes`, "provably different", but the declaration rule needs "not provably the same".
- **Where:** compiled checker, `scala_src/typechecker/TypeHierarchyChecker.scala:297`; the failure shows at class load on the compiled path.
- **Reproduce:** `compiler_tests/XXXNatExtendsTwice.test`.
- **Status:** open; build a fix: a check of the declaration rule of its own at that line, not `definitelyExcludes`, which overloading needs as it is.
- **Could not resolve:**
  - "the declaration rule": not in the skill; I take it to be the specification's rule that a type may not extend two instantiations of one trait unless they are provably equal. A language concept I lack.
  - "Walk prints both (row 371)": prints both what? Both programs' output, or both supertypes? Unclear wording.
  - The last two sentences ("Through row 489's name capture, `079f54ea9` accepts in this class ... renamed `Odd[\V\]` it is refused"): I read that a third program of the same kind is accepted only because of a name-capture bug of row 489, and is refused once its parameter is renamed. "accepts in this class" can read as "accepts, in this class of defect" or "accepts inside this class". Unclear wording.
  - Why a load error of the duplicate kind arises for `Vec[\n\], Vec[\3\]` when `n` is not 3. Not explained.

## Row 768

- **Defect:** The compiled export check never matches an api declaration with its component declaration when a parameter type has a `bool` static argument (`f(x: Flag[\true\]): ZZ32` on both sides): it reports "does not define all declarations". `ExportChecker.equalStaticArgs` treats only two type or two size arguments as equal; `bool`, `opr`, `dim` and unit arguments are "ignored for now" (the `opr`, `dim` and unit cases found by reading, not run). Walk runs the program.
- **Where:** compiled checker, export check: `scala_src/typechecker/ExportChecker.scala:671-678`, header `:73-78`.
- **Reproduce:** `compiler_tests/XXXExportBoolStaticArg.test`.
- **Status:** open; build a fix in `equalStaticArgs`. No workaround on the compiled path.
- **Could not resolve:**
  - "A left-out return type is taken only from the api declaration whose parameter types are equal by the same `equalTypes`, so such a declaration that leaves it out takes none": I read that a component declaration without a return type gets it from the matching api declaration, so a `Flag[\true\]` declaration gets none. It is a second effect, and "such a declaration" has no clear antecedent. Unclear wording.
  - `equalTypes` is named only here; how it relates to `equalStaticArgs` is not said.

## Row 769

- **Defect:** The compiled export check refuses an api function that the component meets with a set of overloads whose parameter types together make up the api's: api `pick(q: Q): ZZ32` with `trait Q comprises { R1, R2 }`, component `pick(r: R1)` and `pick(r: R2)`. The check (`existsMatching`) looks for one component declaration with an equal header; the specification accepts a set whose parameter types' union is the api's, and the union of `R1` and `R2` is `Q`. Walk runs the program. Also, a member of such a set that leaves out its return type gets none from the api and takes its body's type (`IntLiteral`, measured).
- **Where:** compiled checker, export check: `scala_src/typechecker/ExportChecker.scala:431-437` and `:290`; specification `source-code.tex:356-361`.
- **Reproduce:** `compiler_tests/XXXExportSetOfDeclarations.test`.
- **Status:** open; build a fix (match a set of declarations by union). Workaround: export and declare `pick(q: Q)` itself.
- **Could not resolve:**
  - None blocking. "siblings: 834, 835" read as related rows.

## Row 834

- **Defect:** The compiled export check needs a component's function or method to have the api declaration's exact header, return type included; the specification accepts a component declaration whose return type is a subtype (`opr #(...): B` with `B` extending `A`, for an api's `#` answering `A`). Making the check accept it alone is not enough: a compiled call names the api's header, so a narrower component dies with `NoSuchMethodError` (row 827's probe).
- **Where:** compiled checker, `scala_src/typechecker/ExportChecker.scala:431-437`; specification `source-code.tex:356-361` (functions), `:413-418` (methods); code generation if a bridge is wanted.
- **Reproduce:** `compiler_tests/XXXExportOperatorHeader.test`.
- **Status:** wait on a decision: keep the check's equal-header rule, or take the specification's subtype rule and have the code generator emit a bridge method at the api's descriptor (not yet designed). The library is unaffected either way.
- **Could not resolve:**
  - The class "design limit (specification)" while the specification states the rule plainly; I would expect the limit to be the checker's. Unclear which side the row holds to be limited.
  - "row 827's probe", `P782Api`: the probe's name differs from the row's number, so I cannot place it without the ledger. Unclear reference.

## Row 835

- **Defect:** The compiled export check never lets a component's functional method (a method that takes `self` as a parameter, called like a top-level function) satisfy an api's top-level function or operator: an api's `opr <->(a: T, b: T): ZZ32` met by `object T opr <->(self, o: T): ZZ32 = 5 end` is refused. `uncoveredDeclarations` keeps only `SDeclaredFunction`s, as `coverOverloading` does; the specification accepts "a set of top-level function and functional method declarations". Walk runs it.
- **Where:** compiled checker: `scala_src/typechecker/ExportChecker.scala:613-620`, `:251`; `scala_src/typechecker/OverloadingChecker.scala:848-852`.
- **Reproduce:** `compiler_tests/XXXExportOperatorFunctionalMethod.test`.
- **Status:** open; build a fix (count functional methods in the export check). Workaround: a top-level declaration.
- **Could not resolve:**
  - "functional method": not defined in the skill; I know it from Fortress, but a worker without it would not. A language concept not in the skill.
  - "a named function was refused alike": whether that was before `bb3925156` (when operators were skipped) or is true now. Two readings. Unclear wording.

## Row 836

- **Defect:** The compiled export check compares static parameters by name, so a component's `opr <->[\U\](a: U, b: U): U` does not satisfy an api's `opr <->[\T\](a: T, b: T): T` ("does not define all declarations"); named functions are refused alike. The code generator names a generic template by its static parameters' names, so before `bb3925156` (when operators were not checked) a renamed component compiled and a client's call through the api died ("Unable to read serialized data for" the template at `T`); with one name it printed PASS. Walk runs it. The specification says nothing on static parameters in exports.
- **Where:** compiled checker: `scala_src/typechecker/ExportChecker.scala:654-662` (`equalStaticParams`), read by `equalFnHeaders` (`:632-645`); code generation's naming of templates.
- **Reproduce:** `compiler_tests/XXXExportOperatorStaticParamName.test`.
- **Status:** wait on a decision: require equal names, or accept a renaming and have the code generator name the template at the api's names. The library uses one name, so it is unaffected.
- **Could not resolve:**
  - "a generic template": the code generator's unit for a generic function, which the skill does not describe. A concept of the compiled path I lack, though the row is readable without it.
