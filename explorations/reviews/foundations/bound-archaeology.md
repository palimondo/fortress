<!-- This file is a retrieval report, with citations and no judgement, on what the team's texts and code say about the implicit bound of an unbounded type parameter, on why the compiled path sets it to `Object`, and on what the curator was told before decision P-42. -->

# The implicit bound of a static type parameter: what the team left, and what the curator was told

Scout report, tree at `5da8144e4` (branch `main`), 2026-10-26. Retrieval only. Nothing here is a recommendation.

## 0. How to read this report

- **The three layers.** Section 1 is the language (what the team's texts say the bound is). Section 2 is the team's implementation on the JVM (the switch, its history, what the code and tests do with a bound, how the run time represents `Any`, tuples, arrows and `()`). Section 3 is Java interoperability. Section 4 is the revival's record and the transcripts. Section 5 lists what I could not find.
- **Parentless snapshots.** Many of the team's 2011-2012 commits in this repository are parentless full-tree snapshots (`research/authorship.md`, header; `.claude/skills/fortress-repo/references/records.md`, "The repository's history"). `git blame` on the current lines of `Shell.java`, `PreDisambiguationDesugaringVisitor.java`, `NamingCzar.java`, `InstantiatingClassloader.java` and the Scala checker lands on `5a68404fd` (David Chase, 2012-07-19, "Added odd random longs to MagicNumbers", a root commit with no parent) or, for the classloader, on the revival's ASM upgrade `2f1fdbf2e` (blame with `-w --ignore-rev 2f1fdbf2e2` lands on `5a68404fd` again). So a blame hit is not where a line was written. I dated lines two ways:
  1. By content: the earliest commit, by commit time, whose version of the file contains the string (a small shell loop, "first appearance" below). This gives the commit that first holds a line, which is the author's commit or a later snapshot of it.
  2. By tree-to-tree diff against the snapshot's likely predecessor. For `91e71e62e` (Guy Steele, 2012-05-28) the predecessor is Steele's own previous commit `61f60e5fe`: `git diff --stat 61f60e5fe 91e71e62e -- . ':!Documentation'` gives 20 files, all on the subject (section 2.3). For `afb02f41d` (Steele, 2012-05-30) the predecessor is `d3f49be2f`: 9 files. The earlier record note `explorations/reviews/fill-overloads-ways.md:477-479` says these two diffs "cannot be isolated"; these two comparisons isolate them.
- **Dates.** Team commits are quoted with their git date and offset (`-0400` in 2012). Transcript entries are UTC.
- **Revival lines.** Where a cited line was written by the revival (author `Claude`, 2026), I say so. The switch lines themselves (`Shell.java:276-278`, `:324-326`, `:371-386`, `:1282`; `PreDisambiguationDesugaringVisitor.java:132-144`, `:194-208`) are unchanged since the team's last commit: `git diff --stat 5a68404fd a874948ac -- <both files>` is empty, and `git log a874948ac..HEAD -G'ExtendsObjectPreDesugaring|extendsObject_pre_desugar' -- ProjectFortress/src/com/sun/fortress/Shell.java` is empty.

---

## 1. Layer 1: the language, what the team's texts say

### 1.1 The Working Draft's sentence

- `Specification-1.0-frozen/basic/trait-parameters.tex:49-50`: "If a type parameter does not have an \KWD{extends} clause, it has an implicit ``\EXP{\KWD{extends} \TYP{Object}}'' clause."
- The same section, `:53-54`: "Type parameters are instantiated with types such as trait types, tuple types, and arrow types (See \chapref{types} ...)".
- The frozen directory is the draft of 2011-02-02: F-163 (`explorations/coordinator/FACTS.md:216`), `2f8b4331a` (chf, 2011-02-02, "Updated Copyright notices") being the team's last commit of the draft. I checked that this commit's blob of `Specification/basic/trait-parameters.tex` (`a9857a499`) holds the sentence.

### 1.2 Who wrote the sentence, and when

| Date | Where | What |
|---|---|---|
| 2008-03-31 | `Specification-1.0-frozen/fortress.1.0.pdf`, section 12.1 "Type Parameters", printed page 67 (`pdftotext`, lines 2717-2725) | The 1.0 text says only "a type parameter consists of an identifier followed by an optional extends clause." The implicit-bound sentence is not there. The title page lists Allen, Chase, Hallett, Luchangco, Maessen, Ryu, Steele, Tobin-Hochstadt (lines 1-27). |
| 2009-11-02 14:38 UTC | `cec470a34`, sukyoungryu, "[spec] Added Appendices." | First appearance in this repository: `Specification/appendices/future.tex:243`, in the chapter "Proposed Features (for Internal Uses)" (`\note{This chapter is not up to date.}`), section "Not Yet Implemented Features for the Next Release", under the bullet `\TYP{Object}:`, whose first sub-item reads "a multiple inheritance hierarchy rooted at trait \TYP{Object} (???)". |
| 2009-11-06 19:31 UTC | `0f49d8698`, sukyoungryu, "[spec] Added the entire spec files. The next task is to integrate the technical decisions since 1.0." | The sentence enters `Specification/basic/trait-parameters.tex` (the previous blob of that file, `b09fb5834` of 2009-10-30, `697375aa9`, holds only headings). |
| 2009-11-11 | `93f5018fd`, sukyoungryu, "[spec] Added the technical decisions since F1.0beta and the issues to discuss." | The chapter changes only by a `\note` on the where-clause syntax; the sentence is unchanged. |
| 2011-02-02 | `2f8b4331a`, chf | Last team commit of the draft; the sentence is as above. |

- A pickaxe over the whole history before 2010 (`git log --all --before=2010-01-01 --pickaxe-regex -S'extends.{0,12}Object.{0,12}clause'`) returns only `cec470a34`, `0f49d8698` and `93f5018fd`.
- The git author of both first appearances is `sukyoungryu@localhost`, the SVN user of Sukyoung Ryu (`research/authorship.md`, "The identity key": 1,586 commits, spec co-author). Both commits are bulk imports of spec files; git does not say who composed the sentence. The first commit of the chapter file in this repository is `d8859d236` (sukyoungryu, 2009-10-20, "[spec] Added chapter headings."), so spec history before 2009-10-20 is not in the repository.
- The same import brought the sibling rule `advanced/overloading.tex:113-127` ("a functional which takes a single parameter of type a naked type parameter of bound \TYP{Any} cannot be overloaded ... The type parameter of makeSet may be instantiated with (Z, Z) or Z"): `a8e403b50`, sukyoungryu, 2009-11-04, "[spec] Added the advanced part." Its Scala check, `OverloadingChecker.checkBoundAny` (`scala_src/typechecker/OverloadingChecker.scala:527`), was added by `33934d525`, sukyoungryu, 2009-08-11, "[overloading checker] Check that a functional which takes a single parameter of a parametric type bound by Any cannot be overloaded."

### 1.3 Other statements in the Working Draft (frozen copy)

- `basic/types-vals-vars.tex:136`: "immediate subtypes of \TYP{Any} comprises of tuple types, arrow types, \TYP{()}, and \TYP{Object}."
- `:215-216`: "Every trait type also excludes every arrow type and every tuple type, and the special types \TYP{()} and \TYP{BottomType}." (`Object` is a trait in the draft: `basic/traits.tex:181-182`, "every trait except \TYP{Any} and \TYP{Object} implicitly extends the trait \TYP{Object}".)
- `:376`: "A type parameter can be instantiated with an arrow type." `:263`: "Every tuple type is a subtype of \TYP{Any}."
- `advanced-lib/binary.tex:150, :385, :393, :432, :514, :525`: the element parameter of `LinearSequence`, `HeapSequence` and their makers is written `T extends Any`.
- `advanced/overloading.tex:113-127`, quoted in 1.2.
- The 1.0 text (March 2008) writes `extends Any` on `cast`, `instanceOf` (printed page 137) and `identity`, `shared`, `localize`, `copy` (page 138), and `extends Object` on the element of `List` in the varargs example (page 56: `List[\T extends Object, nat length\](rest: T[length])`). `builtinPrimitive[\T\](javaClass: String): T` is written with no bound on page 137.

### 1.4 The 2012 restart (`Documentation/Specification/`)

- The Types chapter `Prose/Language/types.tick` was first written by Victor Luchangco, `275b90773`, 2012-05-31 10:08 -0400, "New types chapter (draft)". Lines:
  - `:173-182`: `Any` is the top; every type is a subtype of `Any`; every value belongs to it; "The only type that Any excludes is Bottom."
  - `:232-238`: "There is a special trait type Object, which is a supertype of every trait type, arrow type and function type, and of Bottom. Object excludes Void and every tuple type, and is a subtype of Any." Followed by `\note{Should \Object\ be a trait type, or its own special type?}`.
  - `:894-895`, `:921-922`, `:953`: `Any` as the top and the single root (a commented line at `:932` repeats the draft's "Any comprises of tuple types, arrow types, (), and Object").
- That chapter, and the restart's Prose directory, state no default bound for a type parameter: `grep -n -i "implicit\|default bound\|no extends"` over `Prose/Language/*.tick` finds only a comment at `types.tick:307` about an "extends set". There is no chapter on static parameters in the restart (`Prose/Language/` has no `trait-parameters`).
- So two team texts differ on arrow types: the Working Draft puts them outside `Object` (`types-vals-vars.tex:136`, `:215-216`), the 2012 chapter inside it (`types.tick:232-236`). Both put tuples and `()` outside.
- Order in time: the Types chapter was committed 2012-05-31 10:08, about 18 hours after `afb02f41d` (2012-05-30 15:53) made the compiled path set `Object`.

### 1.5 Papers and extracts

- **Welterweight** (`Papers/Welterweight/`, "Dynamic Dispatch and Type Inference Semipredicates", authors Chase, Hilburn, Luchangco, Naden, Ryu, Steele, Tristan: `paper.tick:501-509`; the earliest commit in the repository is the root snapshot `5a68404fd`):
  - `grammar.tick:43-44`: each static type parameter has a "(possibly empty) set of upper bounds"; no default is stated.
  - `grammar.tick:61`: "The type Any is a supertype of all types. The type Object is a supertype of every constructed type, that is, every trait type and every object type."
  - `fig-exclusion.tick:20-24`: a tuple type with other than one element, and every arrow type, exclude `Object`. `fig-subtyping.tick:152-162`: `Object` is not a supertype of a tuple or an arrow type; an arrow type is not a subtype of `Object`.
- **OOPSLA 2011 type paper** (`Papers/Types/`): `setup.tick:30-38` and `:137-138` make `Any` the one special constructed type, a supertype of every type; `exc-reduction.tick:101` writes bounds as "X <: Any, Y <: ZZ". `Object` appears there only as a user-level example type (`Papers/Types/journal/justificationOfRTR.tex:175-180`, `:486-492`, `:552-555`).
- **Naden's instantiation theory** (`Papers/RuntimeInstantiation/RTRinstantionTheory.tex:128`, in the team's last commit `a874948ac`, karl.naden, 2012-08-31): "A concrete type T is either the distinguished top type Object, which is a supertype of all types, or a trait t with concrete types ..."; the file has no tuple or arrow type (`grep -n -i "tuple\|arrow"` finds nothing). His notes use `Object` as the top, too: `2012-5-16 return type dependency.txt:11` (`f[\ T <: Object \](x:T, y:T)`), `2012-6-15 return type instantiation restrictions.txt:72-92` ("X must be Object").
- **POPL 2019**, Park, Hong, Steele and Ryu, "Polymorphic Symmetric Multiple Dispatch with Variance" (`research/extracts/ParkPOPL2019.txt`, which carries the page footers):
  - **Page 11:9**, section 3.2 "Syntax" (`ParkPOPL2019.txt:418-419`): "By default, each type parameter has an upper bound Any and a lower bound Bottom, which we describe in the next subsection."
  - Same page (`:437-438`): "The type Any is a supertype of every type (and Bottom, used below, is a subtype of every type but is intentionally not expressible in the surface syntax)." Also `:434-436`: "While tuples are not first-class values in FGFV ..., we use tuple types (τ) to denote the domain types of functions and methods".
  - The extract has no type named `Object`.
  - The revival's note: `research/extracts/ParkPOPL2019-extract.md:52-54`.
- Other extracts (`SteeleICFP2009`, `SteeleFourSolutions2015`, `SteeleGoogleTechTalk2015`, `SteeleJuliaCon2016`, `growing-a-syntax`, `fortress-websites-wayback`): `grep -n -i` for "implicit", "upper bound", "unbounded", "extends Object" returns no line outside `ParkPOPL2019*`.

### 1.6 The team's own recorded uncertainty

- `2e3e67f18`, jmaessen, 2008-07-29, "[Library, static analysis, tests] Added type `Object` to `FortressBuiltin` ... Added simple desugaring visitor `ExtendsObjectVisitor` to add `Object` to the extends clause of any type that lacks an extends clause. There is still a bit of work to be done by the static analysis folks on this front: * Make the type checker know about type Object. * Enforce the appropriate upper bounds on type variables (either Object or Any). * Ensure that nothing except `Object` extends `Any`, and that `Any` doesn't extend anything ..."
- `e2a4830bd`, jrhil47, 2008-07-08, "[TypeChecker] Made sure all inference variable are bounded by Bottom and Any".
- `scala_src/typechecker/ConstraintFormula.scala:36`: "@TODO: Top type for inference is ANY or Object?" (first present in `23448c321`, jrhil47, 2009-10-24).
- `fdce0d438`, jrhil47, 2008-10-21, "[Typechecker] Checks bounds of static params." (the check of static arguments against bounds; current form `TypeWellFormedChecker.scala:258-273`, which the revival has edited since).

---

## 2. Layer 2: the team's implementation on the JVM

### 2.1 The switch as it stands

- `Shell.java:371-377`: `useCompilerLibraries()` calls `setExtendsObjectPreDesugaring(true)`; `:379-386`: `useInterpreterLibraries()` calls `setExtendsObjectPreDesugaring(false)`. `:1282`: the property `fortress.compile.predesugar.extendsobject` defaults to `false`. Getter `:276-278`, setter `:324-326`.
- `Shell.java:403-404` (`compile`), `:410-411` (`link`), `:415-416` (`build`): `useCompilerLibraries()`; `:420-421` (`walk`): `useInterpreterLibraries()`.
- `PreDisambiguationDesugaringVisitor.java:194-208` `forStaticParam`: with the switch off it calls `super`; with it on it rewrites the parameter through `rewriteStaticParamExtendsClause` (`:132-144`), which returns the clause unchanged if non-empty and otherwise `{Object}` built from `WellKnownNames.objectTypeName`. It does not look at the parameter's kind (a `nat` or `int` parameter is rewritten too; row 412 records this).
- The same visitor rewrites traits, objects and object expressions that lack an extends clause to extend `Object` (`rewriteExtendsClause` at `:107-125`; `forObjectExprOnly` `:147-160`, `forTraitDecl` `:163-180`, `forObjectDecl` `:183-192`), whatever the switch says; the traits `Any` and `Object` and the library's `Index` are exempt (`:167-172`). That part descends from `ExtendsObjectVisitor` (2008-07-29, 1.6). The header comment (`:37-44`), the `namesOnlyAny` and `namesOnlyAnyOrIndex` helpers (`:76-100`) and `isLibraryIndex` (`:127`) were edited or added by the revival (`4190069c4`, `153887360`); the static-parameter code (`:132-144`, `:194-208`) was not.

### 2.2 Timeline of the switch

| Commit | Author, date | Message / content |
|---|---|---|
| `2e3e67f18` | jmaessen, 2008-07-29 | `Object` added to `FortressBuiltin`; `ExtendsObjectVisitor` for traits and objects; "Enforce the appropriate upper bounds on type variables (either Object or Any)" left to the static analysis folks (1.6). |
| `e65e01efa` | David Chase, 2012-05-15 16:11 -0400 | "Trying a different schema canonicalization". Adds `FnNameInfo.boundsFor(StaticParam)`: an empty extends clause gives `Object` (first version: `makeTraitType(span, "Object")`; now `FnNameInfo.java:168-182`, with the size case at `:169-172` added by the revival, `3f297441c3`); `normalizedSchema` replaces each static parameter by its bound (`:184-208`). No explanation in the message. |
| `91e71e62e` | Guy Steele, 2012-05-28 17:09 -0400 | "(1) Spec has new directory Language/Operators with many files; (2) static parameters now have implicit boudn of Object if none given (amazingly, this was not yet implemented), and also updated libraries and tests to reflect this (many instances of /extends Any/ inserted)". Parentless snapshot; isolated by diff against `61f60e5fe` (2.3). The rewrite is unconditional here. |
| `6a25b09b9` | Tristan King, 2012-05-28 22:31 -0400 | "Adapted the code to new bound for static type parameter. More rewriting of functions that just throw an exception." 15 files: `BirdyLib/*.fsi/.fss` and `Library/GeneratorLibrary.fsi` gain `extends Any` (for example `trait Maybe[\T extends Any\]`, `BigOperator[\I extends Any, O extends Any, R extends Any, L extends Any\]`). |
| `c61723f61` | Guy Steele, 2012-05-29 12:52 -0400 | "Temporarily comment out the desugaring that causes implicit bounds of static parameters to be /Object/, so tahat interpreter tests will pass". Parent `6a25b09b9`, so the diff is exact: comments out `forStaticParam` with "Commented out for now: it seems to give the interpreter tests grief.  GLS 5/29/12 / When put back into action, tests XXX6b[uv] need to be updated to add \" extends Object\"."; reverts `XXX6bu.test` and `XXX6bv.test`; edits `Prose/Language/Operators/intro.tick`. |
| `a6435de4b` | Guy Steele, 2012-05-29 13:37 -0400 | "Undo the introduction of / extends Any/ into CompilerBuiltin and GeneratorLibrary (for now)". Parent `ad01558a9`; 4 files. |
| `afb02f41d` | Guy Steele, 2012-05-30 15:53 -0400 | "Redid the /extends Object/ update; the desugaring is now controlled by a CompilerProperties setting". Parentless; isolated by diff against `d3f49be2f` (9 files). Adds the getter, setter and property, the `if (!Shell.getExtendsObjectPreDesugaring())` guard in `forStaticParam`, `setExtendsObjectPreDesugaring(true)` in `useCompilerLibraries` and `(false}` (a typo) in `useInterpreterLibraries`; puts `extends Any` back into `CompilerBuiltin.fsi/.fss` (24 and 41 lines) and `Library/GeneratorLibrary.fsi` (53 lines; its `.fss` has none at this commit and 53 in the team's last tree); sets `XXX6bu.test` and `XXX6bv.test` back to `[\\T extends Object\\]`. |
| `ac054ecff` | Guy Steele, 2012-05-30 16:23 -0400 | "Merged 5452" (parents `afb02f41d`, `8415fc990`): first version of `Shell.java` with `setExtendsObjectPreDesugaring(false);`. |
| `5a68404fd` | David Chase, 2012-07-19 | Snapshot where blame lands on every current switch line. |
| `a874948ac` | karl.naden, 2012-08-31 | Team's last commit. The switch lines and the rewrite are as in `5a68404fd`. |

No team commit between 2012-05-30 and 2012-08-31 changes the switch (`git diff --stat 5a68404fd a874948ac` on the two files is empty). `git log --all --before=2012-09-01 -i --grep='extends Object\|extends Any\|implicit bound\|default bound\|bound of Object\|Object bound\|Any bound\|upper bound'` returns, for 2012, only `afb02f41d`, `a6435de4b`, `c61723f61` and `91e71e62e` (and, from earlier years, `69c881138` of 2011-09-02, 2.4(b), `2e3e67f18`, `e2a4830bd`, `fdce0d438` of 2008). `6a25b09b9` does not match that pattern; I found it through the 2026 record (`fill-overloads-ways.md:145`).

### 2.3 What `91e71e62e` and `afb02f41d` changed besides the switch

`git diff --stat 61f60e5fe 91e71e62e -- . ':!Documentation'` (Steele's own parent):

- `PreDisambiguationDesugaringVisitor.java` (+`rewriteStaticParamExtendsClause`, +`forStaticParam`, the header comment "Also rewrite static parameter bindings to explicitly extend Object if no explicit bounds were given.").
- `scala_src/typechecker/VarianceChecker.scala`: `verifyType` gains `case t: AnyType => true` and `case t: BottomType => true` (now `VarianceChecker.scala:242`, `:244`); before it, such a type fell to `error("Variance checker: unknow form of type: ...")`.
- The compiled path's libraries, `extends Any` inserted on static parameters: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi/.fss`, `Library/GeneratorLibrary.fsi/.fss`. The inserted bounds are on the parameters of generators and reductions whose signatures instantiate at tuples (for example `cross[\G2 extends Any\](g: Generator[\G2\]): Generator[\(E1,G2)\]`, `trait PairGenerator[\E12 extends Any, F8 extends Any\] extends DefaultGeneratorImplementation[\(E12,F8)\]`) and on their other parameters.
- Compiled-path tests, `extends Any` inserted (what each instantiates, read from the file):

  | File | First committed | Instantiation in the file |
  |---|---|---|
  | `compiler_tests/Compiled17e.fss` | `87604137b` dr2chase 2010-08-17, "I think this file should pass type checking, but it does not." | `G[\(ZZ32,ZZ32), String\](pluString)` |
  | `compiler_tests/Compiled3.l.fss`, `.m`, `.n`, `.o`, `.p` | `.l`: `6438e96c5` sukyoungryu 2009-04-14, "[static checker] Implemented declared exclusion relationships. Added tests."; the others not dated | `T[\()\]`, `S[\()\]`, `S[\String\]` |
  | `compiler_tests/VarianceTest2.fss`, `VarianceTest6.fss`, `VarianceTest8.fss` | `1dc6cb3bf` Tristan King 2012-03-14 (VarianceTest6) | `Impl[\Any\]()` |
  | `other_compiler_tests/VoidArrowTest3.fss` | `491e1dc5c` karl.naden 2011-06-24, "tests for tuples and arrows with null arguments in generics" | `list[\ () -> () \]` |
  | `compiler_tests/Compiled7.ApplicationErrors.fss` | (not dated) | `identity1[\T\](x: T): T` and `baz[\T\](x: T): T` get `extends Any`; `XXXApplicationErrors.test` before: "identity1 ... [\\T\\]T->T is not applicable to any type of the form _->_." |

- Expected output of `XXX6bu.test`, `XXX6bv.test`, `XXXApplicationErrors.test` changed (the printed bound `[\\T extends Object\\](T, T)->T`; the application errors).

`git diff --stat d3f49be2f afb02f41d`: `Shell.java` (+11), `PreDisambiguationDesugaringVisitor.java` (the guard), `CompilerBuiltin.fsi/.fss`, `GeneratorLibrary.fsi`, `XXX6bu.test`, `XXX6bv.test`, and two unrelated `BirdyLib` edits (`GenomeUtil2c.fss`, `Map.fss`).

### 2.4 What the team's code does with an `Object` or an `Any` bound

Items are read from the files; I ran nothing. Dates are first appearance by content.

**(a) Code generator, the naming of generic methods.**
- `FnNameInfo.boundsFor` (2.2, `e65e01efa`): the normalized schema of a generic method replaces each static parameter by its bound, and an empty clause gives `Object` (`FnNameInfo.java:168-183`, `:185-209`).
- `Papers/Implementation/MethodMapping.tex:124-136` (authors Chase and Naden, `:51`; `e2bc291b8` karl.naden 2012-05-30 "overload dispatch appears to be working for generic methods in simple cases"): "f[\T extends Object\](x:T):() = ... f[\T extends ZZ32\](x:T):() = ... constitute a valid overloading, but both would generate the a template file with name ... Therefore, mentions of static parameters are replaced with their upper bounds in domain and range."
- `NamingCzar.java:1212-1214` `makeBoxedAnyName` returns `Naming.ANY_TYPE_CLASS`; `:1260` the void tuple type is named by `Naming.SNOWMAN`; `:1285-1300` `makeBoxedTypeName` has cases for tuple, trait, `Any`, arrow, variable, union and intersection types.

**(b) Code generator, run-time inference for overloaded generic functions (`OverloadSet.java`, karl.naden, `69c881138`, 2011-09-02, "checking relative lower bounds and concrete upper bounds for invariant generics").**
- `:1510-1523`: for each bound of a static parameter: a `VarType` makes a lower bound of another parameter; `else if (bt instanceof AnyType) { ... //do nothing - no need to add meaningless upper bound }` (`:1516-1517`); a `NamedType` goes to `concreteUpperBounds` (`:1522`) or `genericUpperBounds`.
- `:1615-1621` and `:1668-1678`: "verify meets upper bounds": for each concrete upper bound, the code generates the bound's RTTI and calls `runtimeSupertypeOf` (`Naming.RTTI_SUBTYPE_METHOD_NAME`), jumping to the next arm if false.
- `RTTI.runtimeSupertypeOf` is `this.javaRep.isAssignableFrom(other.javaRep)` (`compiler/runtimeValues/RTTI.java:26-30`, `d48303c0e` David Chase 2011-04-07). By reading: an unwritten bound, once rewritten to `Object`, becomes such a concrete upper bound; a written `Any` adds none. `OverloadSet.java:1501-1502` (a comment about sizes, "the compile path gives it extends Object") is the revival's (`e893a3e008`, 2026-09-26).
- `OverloadSet.java:585-608` (`join`): "Type-level join that erases to Any if it obtains a Union type" (jmaessen, `ec2763801`, 2009-09-10). `:1029`: "invokeinterface Any.getRTTI()" (David Chase, `15d82d6e2`, 2011-04-16). `:1264-1266`: for `AnyType` in generic overload dispatch, "// throw new CompilerError("Not handling Any type yet in generic overload dispatch"); // might need to init "stem"" (David Chase, `3b0b1c38b`, 2011-03-09, "Further working towards generic overloading").

**(c) Code generator, RTTI of a static argument (`CodeGen.generateTypeReference`, `CodeGen.java:5703-5810`, first version `88b5bf907` David Chase 2011-01-25, extended since).**
- A static argument that is a `TupleType` builds a tuple RTTI by `Naming.tupleRTTIclass(n)`.`factory`, and the empty tuple loads the void RTTI singleton (`:5735-5758`); an `ArrowType` unpacks a tuple domain and builds an arrow RTTI by `Naming.arrowRTTIclass(n)`.`factory` (`:5759-5783`); a `TraitType` and a `VarType` have their own paths.
- `BottomType`, `AnyType`, `AbbreviatedType` and `SelfType` have empty branches (`:5795-5802`, `AnyType` at `:5798`) and fall to `throw new CompilerError("Only handling some static args of generic types in extends clause")` (`:5805`; the string is in `88b5bf907`).
- `CodeGen.forTraitDecl` (`:5011-5021`) skips the trait `Any` of API `AnyType`; the class writer for traits gives `fortress/AnyType$Any` no super-interfaces and `FValue` as its abstract superclass (`:5076-5080`), and every other trait interface has `NamingCzar.internalObject` (`java/lang/Object`) as its JVM superclass (`:5085-5087`).

**(d) Class loader and run-time classes (`runtimeSystem/InstantiatingClassloader.java`).** Line numbers are the current file (the revival's ASM upgrade reformatted it; text unchanged).
- `:942-960` (David Chase, `f14dbb2f5`, 2011-04-19): "Creates the interface for an Arrow type. ... The next "apply" method replaces all types in the domain and range with java/lang/Object, for use in certain contexts (coerced arrows for casts, also for dynamically instantiated generic functions). The third apply method is generated if there is more than parameter to the function, in which case the parameters are wrapped in a tuple, or if the first parameter is a Tuple, in which case they will be unwrapped."
- `:984-991` (David Chase, `b6e2df614`, 2012-05-30 17:53): `is_all_objects` ... "// might need to make Tuple also subtype Object" ... the arrow interface extends `fortress/AnyType$Any` when all its parameters are already `java/lang/Object`, else the Object-ified `Arrow`.
- `:1189-1191` (dr2chase, `a08d0f2ab`, 2010-09-21, "Closer yet, with tuples"): "Special case extensions to plumb tuples correctly in the face of generics instantiated with tuple types."
- `:1628`, `:1887` (David Chase, `8af8941d9`, 2012-01-29): "ought to create bogus xldata for tuples and arrows, instead we pass null".
- `:1676-1690` `instantiateAnyTuple`: `AnyTuple[\N\]` implements `fortress/AnyType$Any`.

**(e) The Scala checker (team code).**
- `scala_src/useful/STypesUtil.scala:536-548` `possiblyArrows`: "It could possibly be an arrow if it is a type variable whose bound is Any." (jrhil47, `be110d18b`, 2009-08-07; the pattern is `SStaticParam(_, _, sp, List(_: AnyType), ...)`).
- `:550-559` `staticParamBoundType`: for a type parameter with an empty extends clause the bound is `Types.ANY`; `:562-571` `staticParamLowerBoundType`: empty dominates clause gives `Types.ANY` (jrhil47, `dc75ba359`, 2009-06-06 for the former; as the file stands, both lines blame to `5a68404fd`).
- `scala_src/types/TypeAnalyzerUtil.scala:81-85` `makeIntersectionType`: no types give `ANY` (file's first commit `e16d36d04`, jrhil47, 2009-10-22).
- `VarianceChecker.scala:242-244`: 2.3.
- `OverloadingChecker.scala:524-533` `checkBoundAny`: the rule of 1.2 (`33934d525`).
- `ConstraintFormula.scala:36`: 1.6.

**(f) Libraries and tests in the team's last tree (`a874948ac`)**, `git grep -c -E "extends +Any\b"`:

| Area | Lines | Files |
|---|---|---|
| `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` / `.fss` | 24 / 47 | 2 |
| `Library/GeneratorLibrary.fsi` / `.fss` | 53 / 53 | 2 |
| `ProjectFortress/BirdyLib/` | 110 | 19 |
| `CompilerLibrary/FortressLibrary.fsi`, `Library/CompilerLibrary.fsi/.fss` | 6, 3, 3 | 3 |
| `ProjectFortress/compiler_tests/` | 26 | 15 |
| `ProjectFortress/other_compiler_tests/` | 16 | 11 |
| `Library/FortressLibrary.fsi/.fss` (the interpreter's library) | 6 / 6 | the same six functions as the 1.0 text: `cast`, `instanceOf`, `identity`, `shared`, `localize`, `copy` |
| `ProjectFortress/tests/` (interpreter tests) | 2 | `extendAny.fss:18`, `extendObject.fss:15`; both are `object ... extends Any`, not static parameters |

### 2.5 How the compiled run time represents `Any`, `Object`, tuples, arrows and `()`

- **`Any`** is the JVM interface `fortress/AnyType$Any`: `TypeMapping.tex:87-89` ("the root of the Fortress type hierarchy and supertype of Tuples, Arrows, and Object"; first in `4a839480f`, David Chase, 2012-05-21); `NamingCzar.java:138-140`, `:225`; `runtimeSystem/Naming.java:137` (`ANY_TYPE_CLASS`), `:143` (`RTTI_GETTER_CLASS = ANY_TYPE_CLASS`). The Fortress source is `ProjectFortress/LibraryBuiltin/AnyType.fsi:14` `trait Any end` (first in `f5e78afde`, jmaessen, 2008-04-15). Every runtime value class extends `FValue`, `public abstract class FValue implements fortress.AnyType.Any` (`compiler/runtimeValues/FValue.java:14`), which declares `getRTTI()`. The class loader's generated `isA` methods test `instanceof fortress/AnyType$Any` and call `getRTTI` through it (`InstantiatingClassloader.java:1286-1330`).
- **`Object`** is a separate trait, `trait Object extends Any` (`CompilerBuiltin.fsi:17`, `CompilerBuiltin.fss:354`, first in `c8d301411`, jmaessen, 2008-12-19; interpreter side `FortressBuiltin.fsi:32`, `2e3e67f18`). It declares the getters `asString`, `asExprString`, `asDebugString` (`CompilerBuiltin.fsi:18-20`; `CompilerBuiltin.fss:355-357`); `Any` has no member (`AnyType.fsi:14`). It compiles to the interface `fortress/CompilerBuiltin$Object` (`TypeMapping.tex:84-85`: "the root for the Fortress trait hierarchy"). It is not `java/lang/Object`: `NamingCzar.java:170` `internalObject` is `Type.getInternalName(Object.class)`, used as the superclass of generated types (`CodeGen.java:5085-5087`).
- **Tuples**: interface `Tuple[\T1..Tn\]` with a super-interface `AnyTuple[\N\]` that extends `AnyType$Any`; the classes are generated by the loader (`InstantiatingClassloader.java:1676-1690`, `:2046-2074`; `TypeMapping.tex:141-154`, `:207-210`). Elements are read as `Any` (`FortressEncodings.tex:301-309` at `5c13fce7e`, dr2chase, 2011-01-29: `o1`..`oN` "returning `Fortress$AnyType$Any`"). `TupleRTTI.runtimeSupertypeOf` (`TupleRTTI.java:28-41`) is the Java test or an element-wise test of the same arity. `TypeMapping.tex:154`: tuple subtype queries "are compiled into element-by-element subtype queries". `:151` states the covariance with `Object` as the element top ("if X, Y, and Z each extend Object, then (X,Y,Z) extends (Object,Y,Z), ..."), and `:196` speaks of the subtyping between `(T,U,V)` and `(Object, Object, Object)` that "might be compiled ahead of time".
- **Arrows**: interface `Arrow[\dom..., range\]` with up to three `apply` methods (`TypeMapping.tex:156-167`; `InstantiatingClassloader.java:942-1000`, `:1185-1260`). `ArrowRTTI.runtimeSupertypeOf` (`ArrowRTTI.java:43-57`) is contravariant in inputs and covariant in the output. `TypeMapping.tex:167`: the third `apply` "receives the argument list as a single Tuple of the appropriate element types; this is necessary to support certain forms of generic instantiation (if a type parameter is instantiated with a Tuple, for example)".
- **`()`**: the value is `FVoid` (`compiler/runtimeValues/FVoid.java:14`, `extends FValue`, so it implements `AnyType.Any`); its RTTI is `VoidRTTI`, whose `runtimeSupertypeOf` answers true only for another `VoidRTTI` (`VoidRTTI.java:13-16`; "Fixed glitch with RTTI of void", David Chase, `a9c625b1e`, 2012-06-19); in generated names it is the snowman `☃` (`Naming.java:175`, `:305`; `TypeMapping.tex:107`, "`()` as a static parameter").
- **`Bottom`** is erased to `java/lang/Object` (`NamingCzar.java:206`, `81d727ad8`, David Chase, 2012-06-18, "Some cleanup related to bottom types name conversion and modeling in the JVM"; `:1297-1306`).
- **Generic classes** are template classes instantiated by the loader with RTTI objects as static arguments (`TypeMapping.tex:114-125`, `MethodMapping.tex:98-120`); `NamingCzar.forVarType` leaves a naked type variable as its name (`NamingCzar.java:1427-1431`), which the loader replaces at instantiation. The team's notes on the cost: `MethodMapping.tex:435`, "Covariant generics with Any-bounded static parameters (for example AnyList[\ T extends Any \]) will create special headaches because Tuple and Arrow type relationions are far too large to encode into the Java type system. One possibility will simply be to forbid that case; otherwise, it can be implemented by wrapping values ..." (the same sentence is in `FortressEncodings.tex` since `5c13fce7e`, 2011-01-29). `MethodMapping.tex:430`: "Each Fortress Object (perhaps not Any, meaning not Tuples, not Arrows) will have a method getRTTI()" (first in `c45132992`, David Chase, 2011-03-29).

### 2.6 What the team says about the reason, in their own words

Every sentence in the team's commits, comments and notes that bears on why the switch exists:

1. `91e71e62e` message: "static parameters now have implicit boudn of Object if none given (amazingly, this was not yet implemented)". The Working Draft says so (1.1).
2. `c61723f61` message and code comment: it "seems to give the interpreter tests grief"; "so tahat interpreter tests will pass"; "When put back into action, tests XXX6b[uv] need to be updated to add \" extends Object\"."
3. `afb02f41d` message: "Redid the /extends Object/ update; the desugaring is now controlled by a CompilerProperties setting."
4. `a6435de4b` message: "Undo the introduction of / extends Any/ into CompilerBuiltin and GeneratorLibrary (for now)".
5. `6a25b09b9` message: "Adapted the code to new bound for static type parameter."
6. `2e3e67f18` message (2008): the bound "(either Object or Any)" left open.
7. The code comments of 2.4(b)-(d) and the notes of 2.5.

I found no comment, message or note in which the team says that the code generator, the class loader, `NamingCzar` or the RTTI classes require the bound `Object`, or what fails in them under `Any`. The tests and library edits of 2.3 show where the bound `Object` and an instantiation at `()`, a tuple, an arrow type or `Any` meet in the team's own files: each of those files got `extends Any` on 2012-05-28 or 2012-05-30.

---

## 3. Layer 3: Java interoperability

- **`java.lang.Object` is Fortress `Any`.** `NamingCzar.java:447`: `s(Object.class, anyLib, "Any");` in the table `specialForeignJavaTranslations` (declared `:413`, filled by the helpers `s(...)` at `:420-434` and the static block from `:436`; the lookups are `fortressTypeForForeignJavaType` at `:329-349`, `:361-363`, `:368-385`), which `ForeignJava.recurOnOpaqueClass` consults (`repository/ForeignJava.java:333-342`, comment "Need to special-case for primitives, String, Object, void"). The line exists since `65483e1f7` (dr2chase, 2009-02-02, "[compilation, naming] factoring naming related code into the NamingCzar ...", with `fortLib`; `anyLib` since `64e5f04db`, dr2chase, 2010-05-05, "Added definition of === for popular types"). No line of `NamingCzar` maps `java.lang.Object` to Fortress `Object`.
- **A foreign type that implements `fortress.AnyType.Any`** flows through unchanged: `NamingCzar.jvmTypeExtendsAny` (`:304-320`, `64e5f04db`), and `fortressTypeForForeignJavaType(Type ...)` returns the Fortress `Any` for the descriptor `Lfortress/AnyType$Any;` (`:329-337`).
- **Imported Java classes become traits with an empty extends clause**: `ForeignJava.classToTraitType` (`ForeignJava.java:382-404`, `List<TraitTypeWhere> extendsC = Collections.emptyList();`, first in `a960aa92e`, dr2chase, 2008-12-27); the Java superclass and interfaces are read in commented-out code (`:464-467`). Whether the desugaring then adds `Object` to these synthesized traits was not tested.
- **Natives take `Any`.** `nativeHelpers/equality.java:15-16` (EricAllen, `e7f37cb55`, 2009-06-09): `sEquiv(fortress.AnyType.Any a, fortress.AnyType.Any b)`, comment "Eventually need to deal with tuples, value types, etc."; imported by `Library/CompilerLibrary.fss:19` and used as `opr ===(a:Any, b:Any):Boolean = jSEQUIV(a,b)` (`:63`). The team's compiler tests import static methods of `com.sun.fortress.nativeHelpers` classes (24 uses of `simplePrintln.nativePrintln` and others); `grep -rhn "^ *import java"` over `compiler_tests` and `other_compiler_tests` shows one `java.lang` import (`Math.random`) and none of a class bound to a Fortress type parameter.
- **Naming**: `NamingCzar.java:170` `internalObject`, `:185` `descObject`, `:233-234` `extendsObject` are the JVM's `java/lang/Object` (the superclass of generated types); `:206` `internalFortressBottom = "java/lang/Object"`.
- `builtinPrimitive[\T\](javaClass:String):T` is declared without a bound in the 1.0 text (page 137), in `CompilerBuiltin.fsi` and in the interpreter's library; the bound `Object` written on it came from the revival (batch 7, 2026-09-27: see 4.3), not from the team.
- The Working Draft names no foreign-function interface: `Specification-1.0-frozen/appendices/future.tex:675` lists "foreign function interface" among proposals; `grep -rn "import java\|java\.lang\.Object" Specification-1.0-frozen --include=*.tex` finds no other line.

---

## 4. The record's side

### 4.1 P-42, F-289, F-55, row 412

- **P-42 now** (`explorations/coordinator/POSITIONS.md:39`): "A type parameter declared without a bound has the implicit bound `Any`, not `Object`. `Any` holds tuples, functions and `()`, which `Object` does not. The library instantiates its generic containers at tuple types: its arrays indexed by pairs, such as `(ZZ32,ZZ32)`, are among them. The specification states the bound `Any`, with a callout that records that the Working Draft of February 2011 said `Object`. The compiled path departs from it until the switch-over, which ends the departure: while it uses the compiler's prelude, it bounds such a parameter by `Object`, and so refuses a generic instantiated at a tuple (row 412)." Pointed to by F-289, F-173, F-174 and P-156.
- **P-42 history** (`POSITIONS-history.md`, `./tools/facts-extract.sh 'history:P-42'`), five blocks:
  1. `:105`, 2026-10-13 17:58Z, numbered (`a74f5a2b7`).
  2. `:493`, 2026-10-13 18:16Z, rewritten from `explorations/reviews/decisions-review/judgement.md`, "6. For Pavol" (`bc8902f47`): "The implicit bound of an unbounded type parameter is `Any`, the top, holding tuples, functions and `()`, which `Object` does not; the library's generic containers are instantiated at tuples, arrays indexed by pairs among them. The specification states it (`Specification/basic/trait-parameters.tex:49-62`), with a callout recording the Working Draft's `Object` ... and naming the compile path's `Object` setting (row 412) as the divergence until the switch-over."
  3. `:1972`, 2026-10-22 08:48Z, noted, from `positions-audit/full/evidence/corrections-c3.md` (`55f1a1352`): names the sources, "2026-09-29T14:02:25.736Z, his words: "Option one" (to item 3, an absolute no-brainer to him), answering the coordinator's 2026-09-29T13:58:02.218Z (option 1 writes `Any` into the specification with a callout recording that the draft said `Object`). 2026-09-29T13:57:39.332Z, his recap: we go with `Any`, as the status quo ..."; and records that "The coordinator's text of 13:58:02 told him that the 2012 Types chapter has `Object` exclude function types, but the chapter puts arrow types under `Object` (`types.tick:232-236`), so his yes rests on the tuples."
  4. `:2228`, 2026-10-22 09:45Z, rewritten by the clarity pass; keeps "functions"; the audit's question on it is open (`corrections-c3.md`, "P-42", question 1; review-queue item 218).
  5. `:2582`, 2026-10-22 12:37Z, rewritten by the scrape (the present text).
- **The audit's question** (`positions-audit/full/evidence/corrections-c3.md:52-80`): the specification in the tree and walk put functions outside `Object`; the 2012 Types chapter puts them inside; "Your yes rested on the tuples."
- **Row 412** (`explorations/fortress-gap-ledger.md:136`; earlier text `fortress-gap-ledger-history.md:2473`): NEGATIVE-VERIFIED, "the compile path gives every static parameter with an empty `extends` clause the bound `Object`, sizes included", set "in `PreDisambiguationDesugaringVisitor.java:77-86` via `:145` (at 052a7c3fe)" (now `:132-144` and `:194-208`); reproducer `ProjectFortress/compiler_tests/XXXImplicitBoundAny.test`; the history text records the effects measured by climb batch 7b's skeptic, and that the dispatcher skips a size's bound (`OverloadSet.java:1501-1502`, the revival's rung Z).
- **F-289** (`FACTS.md:123`): under the compile command's setting the twelve checked libraries give 685 errors, 580 of them "bound-Object"; under the distance stage's setting (the switch off) the count is the zero of F-53. Detail `reviews/phase3-exit/zero-audit.md`, "A.3".
- **F-55** (`FACTS.md:49`): "On the compile path, a parameter with no written bound is bounded by `Object`, not `Any` (row 412), so a parameter that nothing fixes takes `Object` there (F-78)."
- **Earlier archaeology already in the record**, consistent with section 2.2: `explorations/reviews/fill-overloads-ways.md:125-158` (way 1a; the three commits and `6a25b09b9`; "163 new ... errors" with a breakdown `(I, J)` 41, `(I, J, K)` 39, `()` 16, `(ZZ32, ZZ32)` 10, `Any` 9); `:468-479`; `explorations/reviews/batch-6b-7-conformance.md:148-153` ("The team's late word on the implicit bound is split"); `explorations/reviews/batch-5-conformance.md:197`; `explorations/reviews/overloading-judgement.md:132`. These notes read `afb02f41d` as "put it behind a setting" and do not say which side of the setting sets it.

### 4.2 Where the transcripts are

- The live coordinating session's file in the container, `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`, begins at 2026-10-08T12:53:02Z. Its earlier part, 2026-09-08T16:43Z to 2026-10-08T15:41Z, is in the backup branch `transcripts-blinded` as `projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/000..003.jsonl` (`.claude/skills/cloud-container/references/container-loss.md`, "Reading another session's transcript"). Part ranges: 000: 2026-09-08T16:43 to 09-24T00:14; 001: to 09-27T13:15; 002: to 10-03T05:00; 003: to 10-08T15:41. Everything below on 2026-09-26 to 2026-10-03 is from parts 001 and 002.
- The older coordinating session `bdff267d-67dc-5bb9-b970-8c3dfaa634b6` (2026-08-18 to 2026-09-17T20:31Z) is on `origin/transcripts`; it holds no message on the bound (searched for "implicit bound", "extends Object", "pre-desugar", "row 412"; the one hit is a description of `trait Matrix[\T, nat s0, nat s1\] extends Object end`).
- A curator message is a record with `"type":"user"` and `origin.kind == "human"` (the test in `explorations/coordinator/postmortem-2026-09-19/parse.py:84-90`). Entries that start with "Stop hook feedback", "Another Claude session sent a message", `<task-notification>` or a compaction summary are not his. All five quoted curator entries below have `origin: {'kind': 'human'}`.

### 4.3 What the curator was told, and what he said, in order

**2026-09-20T17:01:55.441Z, coordinator (the earliest assistant text I found on the subject).** In a report on the compiled library's checker errors: "A pre-desugaring step of the compile path rejects every generic instantiated at a tuple type. That alone adds 712 of the 960 checker errors in the library's apis. Nobody had counted it before." (The agent report behind it: "the compile path's own `extends Object` pre-desugaring (`Shell.java:371-386`) adds 712 of the 960 checker errors in the prelude apis", 2026-09-20T17:01:18Z.)

**2026-09-26T10:57:29.817Z, coordinator, answering his question whether the `fill` pair "fell through"** (the passage that reaches him with the team's history):

> 1. **Stop an array's elements from being functions.** This is the spec's own design: every type parameter implicitly extends `Object`, and functions are outside `Object`. Then `fill(value)` and `fill(function)` can never be confused, and both keep the name. The compiler's own library works this way today, which is why it accepts both `fill`s. The costs:
>    - Arrays whose elements are tuples stop working, because tuples aren't `Object`s either. The library's `Map`, `Heap`, sparse arrays and one team test use them.
>    - Turning the bound on adds 163 new checker errors, mostly on tuples. Limiting it to the array types adds 22.
>    - Steele switched this bound off in 2012 "so that interpreter tests will pass" (`c61723f61`).
>    - The team's later Types chapter, which you ruled counts, puts functions under `Object`. That takes away what this way depends on.

**2026-09-26T12:24:41.717Z, coordinator**, listing what is still to come: "**With the phase 3 brief:** four smaller points from the judgement: the implicit `Object` bound, how the interpreter treats an unused unknown size, the `seq` overloads, and whether Naden's approach to instantiation goes in as a ledger row or only in the record."

**2026-09-27T13:58:26.605Z, coordinator**, on the distance to the switch-over: "The implicit `Object` bound, 0 / 372. A setting that batch 7 decides."

**2026-09-27T16:36:28.711Z, coordinator**, presenting batch 7's third rung: "Batch 7's own open question, what bound an unbounded type parameter gets, is taken at its default, `Any`. That removes another 372 errors on the compiler's own settings." Options: "1. Batch 7 = H, A and N7 ... Recommendation: option 1."

**2026-09-27T18:43:34.570Z, curator:** `> Recommendation: option 1.` / `Yes.`

**2026-09-27T18:46:10.100Z, coordinator:** "Batch 7 now runs H, A and N7, with its open question taken at the default (`Any`)."

**2026-09-29T13:09:55.448Z, coordinator**, presenting the audit page ("Fortress Decisions Audit", `explorations/reviews/decisions-review/judgement.md`), list item 3: "Say "the implicit bound is `Any`" in so many words, before 7b's rung S writes it." The page's section 6, item 3 (`judgement.md:322-328`): "The draft says `Object` (`trait-parameters.tex:49-50`). The library declares its element types unbounded and instantiates them at tuples, which `Object` excludes; walk and the gate's count read `Any`; the compile path's desugarer writes `Object` (row 412). The 2012 Types chapter has `Any` as the top. Batch 7 took `Any` as a default inside decision 2 and listed it; the overloading judgement had called it your decision. Options: 1. `Any`, stated in the text with a callout, the compile path's `Object` setting named as the divergence until the switch-over collapses it ... 2. `Object`, the draft's word. Touches the library: 163 refusals, mostly tuple index types, and the arrays' element types. Costs a library sweep against the library's own practice. Recommendation: 1, said in so many words." The page carries no 2012 commit hash for the bound (`grep` of `judgement.md` for `c61723f61`, `afb02f41d`, `91e71e62e` is empty).

**2026-09-29T13:43:05.297Z, coordinator:** "**Item 3.** "The implicit bound is `Any`", said by you, because 7b's rung S writes that sentence into the specification."

**2026-09-29T13:57:39.332Z, curator** (verbatim):

> Regarding item three, I just, uh, I'll try to s uh, recap my understanding of the problem and you tell me whether that's correct so that I'm uh, making an informed decision and not just blindly flipping a coin. So unbounded type is from the like type hierarchy and basically is this like asking a question what is the type of each and every thing that exists in Fortress and any is then this type. It, I'm not sure whether this is the same thing as, as the bottom uh, that you were mentioning before somewhere. And the thing is in the... So the, the other answer from this draft of this... I'm not sure what draft. Draft of the specification that would say that everything in Fortress is an object. So I, I don't think any is a better answer and you are saying that any that any is what is currently implemented everywhere and if, if we were to enforce object then we would have to rewrite a uh, library. So yes, we go with any, because that's the status quo. But I want to understand, like, doesn't Fortress, like, what is the object in Fortress? Is that like, that is probably not like object in, in Scala, like a singleton instance of a class, or, Am I misremembering what that meaning is in, in Scala? But in, well, maybe this is in the broader sense of, of Scala, that everything in Scala is an object, like even functions are objects, or even values are objects. I, I'm not sure, like, it, it, am I in the right mind space? Somehow I, I have this in, in my mind connected to things like case classes. And I don't know now if I'm mixing Scala or Swift. But like, are, are there any primitive types in Fortress that would not be an object and therefore we need any? Like, I haven't studied Fortress's library at all so uh, I'm so out of my depth here

**2026-09-29T13:58:02.218Z, coordinator** (verbatim, the passages on the draft and the compile path):

> **What `Any` has that `Object` doesn't:** tuples like `(ZZ32, ZZ32)`, functions like `ZZ32 -> ZZ32`, and the empty tuple `()`. In Fortress these are not objects. The 2012 Types chapter says the same: `Any` is the top, and `Object` excludes function types.
>
> **Why `Any` isn't just the status quo:**
> - The library's own design needs it. A two-dimensional array is indexed by a pair: `Array[\RR64, (ZZ32, ZZ32)\]`. A list of pairs is `List[\(K, V)\]`. Under `Object`, every generic container instantiated at a tuple would be refused. That was measured at 163 refusals, most of them tuple index types, including the arrays microGPT uses.
> - The draft's sentence saying `Object` dates from 2008 to 2010, before the library instantiated generics at tuples everywhere. The 2012 Types chapter makes `Any` the top.
> - The compile path currently writes `Object` for an empty bound (row 412), which is why it refuses generics at tuple types today. That divergence goes away at the switch-over.
>
> So the choice is between the draft's 2008 wording and what the library needs and the designers' later text says. Option 1 writes `Any` into the specification with a callout recording that the draft said `Object`.

(For the claim "dates from 2008 to 2010": section 1.2 gives the dates found in git.)

**2026-09-29T14:02:25.736Z, curator** (verbatim): "Okay, that seems like an absolute no-brainer. Option one, right, Annie? Is this just a correction to the spec? Why, why was it like raised during the... decisions audit? It is just like a cleanup so that later workers do not get confused, right?"

**2026-09-29T14:02:59.997Z, coordinator:** "Recorded: `Any`, in your own words, and rung S writes it in 7b. Yes, it's a correction to the specification, and nothing in the code changes because of it. The library and walk already use `Any`, and batch 7 took it as a default back on 27 Sep. The audit raised it for its form, not its substance. ... Now the sentence carries your decision, with a callout recording the draft's `Object`. It also names the compile path's current `Object` setting as a known difference until the switch-over."

**2026-09-29T15:26:18.244Z, curator** (first sentences): "Okay, let's see what's next. So, item three was any and object. We decided that. Number four. ..."

**After P-42.**

- 2026-09-29T16:52:08.446Z, coordinator, on the POPL 2019 recheck: "The paper confirms route A with the flat number tower, dropping the overload sentence, the order of conversions, and `Any` as the implicit bound."
- 2026-10-03T04:01:11.833Z, coordinator, on the three `extends Object` bounds that batch 7 wrote on `fail`, `builtinPrimitive` and `List`'s nullary comprehension (a different matter from the implicit bound): "Now, with the bound written as `Object`, a call where nothing (`()`) is expected has no valid type, because `Object` excludes `()`. ... **Without the written bound**, the default bound is `Any`, your decision from 09-26. `Any` includes `()`, so those calls type-check. The original team wrote none of these three bounds." (P-42's history dates the decision to 2026-09-29, and its sources to 13:57 and 14:02 UTC that day.)
- 2026-10-03T04:14:20.092Z, curator, human-typed (verbatim, the passage on the bound): "Now with the bound written as object, a call where nothing is expected, because object excludes empty. What are these empty brackets? We just pronounce it as void or what? It sounds like void, like nothing, just spelled this way. And without the written bound, the default is any. And any includes the void, the bracket. So if we drop The declaration that extends object, we are back to the original spelling of the library, which I think is exactly desirable." and later in the same message: "So yes, put the library back to the team's own declaration, so previous state, that, yeah, that's the library."
- 2026-10-03T04:15:18.738Z, coordinator: "Recorded: the three bounds go, in batch 10."
- 2026-10-24T14:53:34.229Z, coordinator, on the distance to the switch-over: "**The compiled path's own setting.** The stage checks with the implicit bound `Any`, as your decision P-42 promises. `fortress compile` still uses `Object`, and under that setting the same library gives 685 errors. No PLAN step names the flip."
- 2026-10-26T05:25:27.242Z, curator, human-typed: "... I am doubting whether I made a good and well informed decision, or a mistake. The question of the bound seems like a linchpin … but I hope you are incorrectly mixing the aspects: what Fortress does with how is Fortress implemented on JVM and probably related is a topic of interoperability with Java. Are you capable of broadening the scope and help me re-verify the foundational tenets the revival rests on?"
- 2026-10-26T05:27:11.048Z, coordinator: "**The team's implementation on the JVM.** `fortress compile` turns every missing bound into `extends Object` before it checks. The record does not say why the team did this: to follow the Working Draft, or because the compiled path cannot handle a tuple, a function or `()` as a type argument. That is unverified." and "**Java interoperability.** ... The record has nothing on this." and "The judgement of 09-20 read layer 1 as a reason for layer 2. Whether that was wrong is not known yet."

### 4.4 Was the implementation layer put to him

What reached him, by the transcript (assistant text blocks of parts 000-003 and of the current file, searched for: `MethodMapping`, `TypeMapping`, `FortressEncodings`, `boundsFor`, `FnNameInfo`, `91e71e62e`, `afb02f41d`, `6a25b09b9`, `amazingly`, "Steele ... Object", "implicit ... bound", "pre-desugar", "row 412"):

- That the compile path writes `Object` for an empty bound and that this is what refuses generics at tuple types (2026-09-20T17:01:55Z; 2026-09-29T13:58:02Z).
- That the bound is the specification's design, that the compiler's own library works under it, and that "Steele switched this bound off in 2012 'so that interpreter tests will pass' (`c61723f61`)" (2026-09-26T10:57:29Z). The same reply names no commit that turned it on for the compiled path (`afb02f41d`), and says "The compiler's own library works this way today".
- The numbers (163, 372, 22, 685/580) and that the divergence ends at the switch-over.

What I found no sign of having reached him: the message of `91e71e62e` ("amazingly, this was not yet implemented"); `afb02f41d` and the setting's two sides; `6a25b09b9`; the `extends Any` insertions in the compiled path's own libraries and tests (2.3); `FnNameInfo.boundsFor`; `Papers/Implementation/`; the OverloadSet bound handling; the classloader comments; `NamingCzar.java:447`; the 1.0 text's lack of the sentence; the date of the sentence's first appearance (2.2 puts the commits of 2009-11-02 and 2009-11-06). The audit page he read (`judgement.md`) names none of the 2012 hashes. The record documents that hold the commit history (4.1, "Earlier archaeology") were not linked in the messages quoted above.

---

## 5. What I could not find

1. **Who composed the sentence.** Git shows the committer of the two bulk imports (sukyoungryu, 2009-11-02 and 2009-11-06). The repository has no spec history before 2009-10-20. The 1.0 PDF (2008-03-31) lacks the sentence, so it entered between that date and 2009-11-02 in a source I do not have (the Sun/Oracle SVN is not in the repository; the "1.0 beta" text is not in the repository either).
2. **A statement of what in the compiled path requires the bound `Object`.** No comment, commit message or note says so (2.6). The sources of the stated reasons are the Working Draft's sentence and, for turning it off in the interpreter, "the interpreter tests".
3. **Which interpreter tests failed.** `c61723f61` names none; it names `XXX6b[uv]` as tests that need `extends Object` in their expected output. The mailing lists and trackers of the team are not in the repository.
4. **Why `afb02f41d` made the compiled path, and not the interpreter, the side that sets `Object`**, beyond its message. The diffs show that the compiled path's libraries and tests were edited to carry `extends Any` and that `XXX6bu/v.test` expect `extends Object` in their messages.
5. **Any team discussion of `Any` against `Object` after 2012-05-30.** No commit between 2012-05-30 and 2012-08-31 touches the switch or the sentence. The last team text on the subject is in the Types chapter (2012-05-31), the instantiation theory (2012-08-31) and `Papers/Implementation/` (2012-05-21 and 2012-05-30).
6. **A test that runs the compiled path with the switch off, in the team's tree.** I ran nothing (retrieval only). The statement in 2.4(b) that an `Object` bound adds a run-time check that a void, tuple or arrow RTTI fails, and a written `Any` adds none, is by reading `OverloadSet.java`, `RTTI.java`, `VoidRTTI.java` and `FVoid.java`; the revival's own measurement for sizes is in row 412's history (the dispatcher "checked a size's descriptor against the `Object` bound, which `RTTIsize` fails").
7. **Whether `Object` was ever meant to be `java.lang.Object`.** No text ties them: `NamingCzar.java:447` maps `java.lang.Object` to `Any`; `NamingCzar.java:170` uses `java/lang/Object` as the JVM superclass; `TypeMapping.tex:85` maps Fortress `Object` to `fortress/CompilerBuiltin$Object`.
8. **Walk's side of the 2012 change.** I did not trace the interpreter's own handling of an unbounded type parameter (`interpreter/evaluator/EvaluatorBase.java:581-590`, `:900-915` read only written extends clauses); the revival's account is F-55, F-289 and the skill's "Static parameters".
9. **The authorship of `Compiled7.ApplicationErrors.fss` and the exact first date of `Papers/Welterweight/`.** Not dated; the earliest commit that holds them is a root snapshot.

---

## 6. Summary by layer

- **Language.** The Working Draft (frozen copy, `trait-parameters.tex:49-50`) gives an unbounded type parameter the implicit bound `Object`, and in the same section (`:53-54`) says type parameters are instantiated with tuple and arrow types. The sentence is not in the 1.0 text of 2008-03-31 (page 67); it first appears in the repository in two bulk imports by `sukyoungryu`, `cec470a34` (2009-11-02, `future.tex:243`, a list of "Not Yet Implemented Features") and `0f49d8698` (2009-11-06, the chapter). The composer is not recoverable from git. Other team texts: the Working Draft puts arrows outside `Object` (`types-vals-vars.tex:136`, `:215-216`); the 2012 Types chapter (Luchangco, 2012-05-31) puts arrows under `Object` and tuples and `()` outside (`types.tick:232-238`) and states no default bound; Welterweight and the OOPSLA paper have `Any` as the top, Welterweight puts tuples and arrows outside `Object`; Naden's August 2012 theory calls `Object` "the distinguished top type"; POPL 2019 says "By default, each type parameter has an upper bound Any" (p. 11:9). The team's own 2008 commit message left "(either Object or Any)" open.
- **Implementation on the JVM.** The switch was written by Guy Steele in three steps: 2012-05-28 `91e71e62e` (implemented unconditionally "amazingly, this was not yet implemented", with `extends Any` inserted in the compiled libraries and in nine tests that instantiate at `()`, tuples, arrows or `Any`); 2012-05-29 `c61723f61` (commented out "so that interpreter tests will pass"); 2012-05-30 `afb02f41d` (a setting, on in `useCompilerLibraries`, off in `useInterpreterLibraries`). David Chase's code generator already treated an empty clause as `Object` in the schema of generic methods (`FnNameInfo.boundsFor`, 2012-05-15). Karl Naden's dispatcher (2011-09-02) ignores a written `Any` bound as "meaningless" and checks any other bound with `runtimeSupertypeOf`. The run time carries `Any` as `fortress/AnyType$Any` (with `getRTTI`), `Object` as a separate trait under it, tuples, arrows and `()` as generated types that implement `Any`, with their own RTTI classes. The team wrote no sentence saying what in the code generator, class loader or RTTI requires `Object`.
- **Java interoperability.** `java.lang.Object` is translated to Fortress `Any` (`NamingCzar.java:447`, since 2009-02-02); natives are written against `fortress.AnyType.Any` (`equality.java:15`); imported Java classes are traits with an empty extends clause (`ForeignJava.java:383`); `Bottom` is erased to `java/lang/Object` (`NamingCzar.java:206`). No team text ties Fortress `Object` to `java.lang.Object`.
- **Record.** P-42 (curator's "Option one", 2026-09-29T14:02:25.736Z) rests on his recap of 13:57:39.332Z and the coordinator's text of 13:58:02.218Z; he was told that the compile path writes `Object` and why that refuses tuple instantiations, and on 2026-09-26 that Steele switched the bound off in 2012; he was not shown the commit history of the compiled path's setting or the code that uses it.
