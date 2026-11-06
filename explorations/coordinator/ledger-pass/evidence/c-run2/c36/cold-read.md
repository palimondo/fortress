# Cold read: c-run2/c36

Read with `CLAUDE.md`, the `fortress-repo` skill's core, `references/records.md` (status words, `$T` queries) and `references/tests-writing.md` (`XXX` tests). One lookup outside that set: the row template, through the `doc:` query that `records.md` names (`explorations/fortress-gap-ledger.md#The row template`). It defines "full text: history, row N", `siblings:`, and how to read a deleted probe path ("parent of HASH" = `git show HASH^:PATH`). Without it those phrases could only be guessed.

## Row 122

- **Defect:** A `property` declaration cannot be used at all. At top level, named or not, it stops with `** bug! Not yet implemented: PropertyDecl`. Inside an object it throws an uncaught `java.lang.Error: Not yet implemented` with no source position.
- **Where:** The index builder of the Scala checker, `scala_src/typechecker/IndexBuilder.scala:189` (top level) and `:349` (object), at c124c6b65. Seen under walk. By reading, the compiled path stops in the same place too (F-182), but nobody ran it.
- **Reproduce:** No test. Write a `.fss` with a top-level `property` (named and unnamed) and one inside an object, then run it under walk. Or restore the deleted probes `explorations/run-b2/probes/g1c_property{,_anon,_plain,_obj}.fss` with `git show 22ea0cd90^:PATH`, and `explorations/run-b/probes/c07_contracts_tests.fss` from `ed6dafb52^`.
- **Status:** NEGATIVE-VERIFIED: the spec requires properties and the failure is confirmed. The skill lists `property` as "specified, but not built", so this is unbuilt language, not a quick fix. Leave it unless a brief assigns it. Workaround: a Boolean function that a `test` function `assert`s.
- **Could not resolve:**
  - The class says `(walk)`, but both sites are in the Scala checker's index builder, and the notes say the compiled path stops there as well. Is the gap walk's, the checker's, or a shared phase's? It reads two ways (unclear wording, or a wrong area).
  - "named or not": it is probably the optional property name, but the row never shows the syntax, and the skill does not cover property declarations (missing language concept).

## Row 124

- **Defect:** This records a limit, not a bug. In an object body, a field, getter or setter declared after a method is refused with `Field/getter/setter declarations should come before method declarations.` The grammar requires this order, so the refusal follows the spec. Moving the declarations above the methods makes the program run.
- **Where:** Parser-side check `NodeUtil.checkMembers`, `nodes_util/NodeUtil.java:1561-1566` at c124c6b65. Both paths, since the parser is shared. Grammar: `appendices/grammars/concrete-syntax.tex`, `GoInAnObject`.
- **Reproduce:** Declare an object with a method and then a field or getter after it. Restore the deleted probes `explorations/run-b2/probes/g4g_{field_after,getter_after,getter_before}.fss` from `22ea0cd90^` (`getter_before` works), and `c14_lazy_grad_generators.fss` from `ed6dafb52^`.
- **Status:** Leave it. The class is `design limit` and the grammar sides with the check. To write such an object, put fields, getters and setters before the methods.
- **Could not resolve:**
  - NEGATIVE-VERIFIED on a row whose behaviour matches the spec. A worker could read it as "a defect to fix". Only the class word `design limit` and the grammar quote show that it is not (unclear wording).
  - `bump = 4  twice = 6` is the output of the reordered probe. Without the probe it means nothing, so the reader cannot check it (unclear wording, minor).

## Row 125

- **Defect:** The ordering check of row 124 also refuses a `property` placed after a method. The grammar allows `PropertyDecl` in both groups, and the spec prose lets properties mix freely with the other declarations. So this refusal is a defect: `NodeUtil.isFieldLike` counts a property as field-like.
- **Where:** `nodes_util/NodeUtil.java:1533` (`isFieldLike`) and `:1561-1566` (`checkMembers`), at c124c6b65. Parser-side, so both paths.
- **Reproduce:** An object with a method followed by a `property`. The ordering error appears at the property's span. Deleted probe `explorations/run-b2/probes/g4g_prop_after.fss`, restored with `git show 22ea0cd90^:PATH`.
- **Status:** A real defect that can be fixed (drop `PropertyDecl` from `isFieldLike`). It is "academic" while row 122 stands, so it has low priority, and it must be fixed along with any work on row 122. Workaround: put the property before the methods.
- **Could not resolve:**
  - "the prose lets properties be freely commingled": the row gives no section, and two sections are cited. Which spec sentence says this? (Unclear wording, a missing citation.)
  - After a fix, the program would reach row 122's not-yet-implemented error. Would that count as green for this row's test? The row does not say (unclear).

## Row 354

- **Defect:** In an api, the compiled checker refuses any type that extends a trait whose `comprises` clause contains `...`, even a type listed in that clause. So the grammar's "listed types plus `...`" form cannot be written in an api that also declares the listed type. The refusal: 'Invalid comprises clause: a trait with a comprises ..., such as T, should not be extended'.
- **Where:** Compiled path, `scala_src/typechecker/TypeHierarchyChecker.scala:338-341` at c124c6b65. The check looks only at "is this an api" and "does the clause have an ellipsis". It never checks whether the extender is listed. The team's own `test_library/Compiled3.q.fsi:12-15` has this shape.
- **Reproduce:** `ProjectFortress/compiler_tests/XXX3q.test`, also pinned by `XXX10p.test`. Before each red/green run, clear the component's `analyzed_cache` and `bytecode_cache` entries, or a stale cache keeps it red.
- **Status:** Build a fix. A repair is written up in `explorations/compile-ladder/rung-library-defects/REPORT.md`. Row 357 waits on it. Workaround: declare the extender in the component, not in the api.
- **Could not resolve:**
  - The correct rule is never stated. Is an api type that is listed before the `...` allowed, and an unlisted one refused? Or are all extenders allowed in an api? I inferred the first, but the claim only says what is refused (unclear wording; the spec rule is not paraphrased).
  - "a test of `isApi` and the ellipsis alone": I read "test" as the condition in the code, not a harness test. It reads two ways (unclear wording).

## Row 357

- **Defect:** `Library/IntMap.fsi` breaks the ellipsis rule. Its `trait IntMap` has `comprises { ... }` (`:20-22`), and the same api declares `trait NonEmptyIntMap[\Val\] extends IntMap[\Val\]` (`:64`). The compiled checker refuses it at `:64`, 'Invalid comprises clause: ... such as IntMap.IntMap, should not be extended'.
- **Where:** Library, `Library/IntMap.fsi`, and its component `Library/IntMap.fss:26` (clause `{ EmptyIM[\Val\], NonEmptyIntMap[\Val\] }`, at c124c6b65). Compiled path only. Nothing gated compiles `IntMap`: the count stage compiles only `FortressLibrary.fss`.
- **Reproduce:** No test. Presumably `bin/fortress compile` on `Library/IntMap.fss` (or the api), which should give the refusal above. The old capture `.../rung-library-defects/probes/skeptic/intmap-api-run.txt` is deleted, so only history has it.
- **Status:** Wait on row 354. The spec-correct api is `comprises { NonEmptyIntMap[\Val\], ... }` (`EmptyIM` is private, so it is left out). Row 354's defect refuses exactly that form, so fixing the library now would trade one refusal for another.
- **Could not resolve:**
  - "the ellipsis rule" is never stated. I inferred it: in an api, a trait whose clause is only `...` must not be extended there. Neither the row nor the skill states it (missing language concept).
  - The row gives no command to reproduce it. "Compile IntMap" is my guess (unclear wording).
  - "Capture ..., gone": the row never says which commit the capture can be read from (unclear wording, minor).

## Row 762

- **Defect:** A generic trait has a dotted (non-functional) method whose own static parameter is bounded by the trait's parameter: `trait Picker[\R\]` with `pick[\K extends R\](x: K)`. An object that extends it, `object ShapePicker extends Picker[\Shape\]`, stops under walk with 'Missing type R'. A bound that does not name a trait parameter (`N extends Number`) works.
- **Where:** Walk only, since the compiled path passes. `interpreter/evaluator/values/Constructor.java:216` (`finishInitializing`) calls `SingleFcn.createSymbolicInstantiation` (`SingleFcn.java:215`), which evaluates `R` without the trait's static parameters in scope, at 3aea3da53. A plain object fails at load. A generic object fails at its first instance.
- **Reproduce:** `ProjectFortress/tests/XXXTraitBoundGenericMethod.fss` under walk.
- **Status:** Build a fix. Row 567, the same defect for functional methods, was fixed by 669b77d03, and that commit is the model for this fix. Siblings 870, 567, 21.
- **Could not resolve:**
  - "symbolic instance" / "symbolic instantiation" is a walk-internal concept that the skill core does not explain. I could follow the row without it, but not judge the fix (missing concept, interpreter-specific).
  - "dotted" is used as the opposite of "functional method". That is inferable from the skill, but the skill never uses the word (minor).

## Row 838

- **Defect:** An api object whose value parameter is written `var` is refused by the parser's syntax check: 'var cannot modify an object parameter'. The api grammar seems to allow it: `AbsObjectDecl` takes `ObjectHeader`, whose `ObjectParam` admits `var`.
- **Where:** Parser, both paths: `parser_util/SyntaxChecker.java:154-157` (allows only `ApiFldMod`). Spec: `basic/components/apis.tex:87-88`, `basic/objects.tex:104-109`, the same in the frozen spec. Against it: `basic/traits.tex`, "Abstract Field Declarations", which excludes `var` from abstract fields.
- **Reproduce:** No test. Write an api with `object X(var p: T)` and compile or run anything that imports it. `OneShot`'s parameter written `var` gives 'var cannot modify an object parameter, canTryIt'.
- **Status:** CONTESTED: wait on the open question "may an api write `var` on an object parameter?". Do not build a fix. The export check ignores `var` either way. Workaround: leave `var` out of the api.
- **Could not resolve:**
  - `OneShot`: an object, but in which api or library file? It is never located (unclear wording).
  - `ExportVarObjectParameter`: a test name, a Java method, or a check? The row does not say, nor where it lives (unclear wording).
  - "so either answer matches `OneShot`": I read this as "whichever way the question goes, `OneShot` still works". It is a little elliptical (unclear wording, minor).
  - Who settles the question (the curator, or a spec reading) is not said (unclear).

## Row 839

- **Defect:** The compiled export check never compares the names of an object's value parameters between api and component. An api `object Np(a: ZZ32)` is satisfied by a component `object Np(z: ZZ32)`, and a client's `Np(3).a` then dies at run time with `NoSuchMethodError`. Swapped names pass too: an api `Tq(a, b)` against a component `Tq(b, a)` makes `Tq(1, 2).a` give 2 where the api means 1. For functions, parameter names do not matter. For objects they do, because they name the fields.
- **Where:** Compiled checker, `scala_src/typechecker/ExportChecker.scala:690-702` (`equalParams` binds both names, compares neither), reached through `equalOptListParams` (`:372-374`, `:710`), at c124c6b65. Walk agrees with the component's names: it gives `Tq(1, 2).a` = 2 and refuses `Np(3).a` with 'Cannot find definition for method a given receiver Np'.
- **Reproduce:** No test and no probe. Write the api/component pairs `Np` and `Tq` as above, plus a client that reads `.a`. Both compile with rc 0. Run the client on the compiled path and under walk.
- **Status:** Build a fix: compare object parameter names in the export check. Workaround: name the parameters as the api does. Siblings 844, 800, 801, 829.
- **Could not resolve:** Nothing blocking. "rc 0" is the exit code. "a function's parameter names do not count in the rule": "the rule" is the export-matching rule, which is inferable.

## Row 870

- **Defect:** A generic trait has a generic dotted method with a `where` clause on the trait's own parameter: `mixed[\U\](u: U): String where { T extends Named }` in `trait Pair[\T\]`. An object that extends it stops under walk with `ClassCastException: FTypeObject cannot be cast to SymbolicInstantiatedType`. With the clause on the method's own parameter, `where { U extends Named }`, it runs.
- **Where:** Walk only, since the compiled path prints 'mixed cat'. `interpreter/evaluator/values/SingleFcn.java:231`, the cast of `ge.getLeafType(we_name)` in `createSymbolicInstantiation`, called from `Constructor.java:216`, the same site as row 762, at c124c6b65.
- **Reproduce:** `ProjectFortress/tests/XXXGenericMethodTraitWhereWalk.fss` under walk.
- **Status:** Build a fix, probably together with row 762 since both fail at the same site. No workaround keeps the constraint on `T`.
- **Could not resolve:**
  - "symbolic instantiation" again (row 762).
  - "own dog" and "mixed cat" are the tests' outputs. They are fine as markers of "it runs", but their meaning depends on the test's source (minor).
