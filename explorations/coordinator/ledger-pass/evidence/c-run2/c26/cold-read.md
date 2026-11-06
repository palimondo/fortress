# Cold read: c26 (rows 754, 755, 756, 777, 805, 831, 869)

Read with CLAUDE.md, the fortress-repo SKILL.md and its references (not revival-changes.md, sources.md). The status words are listed in `references/records.md`, but their definitions are in the ledger's row template, which a cold reader may not read; I read NEGATIVE-VERIFIED as "the gap is confirmed, a fix is wanted" and CONTESTED as "an open question decides what the fix is".

## Row 754

- **Defect:** Walk's load-time `comprises` check is too permissive when the trait's `where`-clause variable has a bound. With `trait AnyNumBox comprises { NBox[\E\] } where [\E extends Number\]`, walk lets `NBox[\String\]` count as an `AnyNumBox`, though `String` is not below `Number`. The specification lists only the types at values below the bound, so `b: AnyNumBox = NBox[\String\]("s")` should be refused; walk loads and runs it.
- **Where:** walk; the `comprises` check at load in `BuildEnvironments.java` (lines 1463-1467 at c124c6b65, a term at 1513 in `named`).
- **Reproduce:** run `ProjectFortress/tests/XXXComprisesWhereBoundExtender.fss` under walk; it loads and runs where it should be refused. The compiled checker refuses it (row 753, fixed), which is the behaviour to match.
- **Status:** build a fix under walk: honour the binding's bound in the check.
- **Could not resolve:**
  - "reads a listed type at every type of a bounded type `where`-clause variable": I could only decode it from the example and notes; the wording is dense (unclear wording).
  - "a size has none": I take it that a size variable has no bound, so the size case is not affected, but it is not said so (unclear wording).
  - "its term at `:1513`, in `named`": which term, and what `named` is (a method? a variable?), I could not tell (unclear wording).

## Row 755

- **Defect:** Walk refuses at load a trait whose `comprises` lists a type at a `where`-clause variable if a member's type names that variable: `getter item(): E` in `trait AnyBox comprises { Box[\E\] } where [\E\]` fails with 'Missing type E'; the size form `trait NatParamT comprises { Nt[\n\] } where [\nat n\]` with a member naming `Nt[\n\]` fails with 'Missing type n'. The specification puts the variable in scope in the trait, so both should load.
- **Where:** walk; `BuildTraitEnvironment.forFnDecl3` (`BuildTraitEnvironment.java:126`, `:148`) reads the member's type without the bindings that `processWhereClauses` (`BuildEnvironments.java:943`, `:948-970`) makes.
- **Reproduce:** run `ProjectFortress/tests/XXXWhereVariableMemberWalk.fss` under walk; it stops with 'Missing type E' (or 'Missing type n'). The compiled checker accepts both.
- **Status:** build a fix under walk; the size form is old (fails on base 3aea3da53 too).
- **Could not resolve:**
  - "The size face": I read "face" as "form/variant with a size variable", but the word is unusual (unclear wording).
  - "the base 3aea3da53": which base this names (the revival's starting tree?) is not said (unclear wording, minor).

## Row 756

- **Defect:** The compiled checker crashes ('E is not in the kind env') on a call made outside the trait of a member whose type names a type `where`-clause variable: `println(mk().item)` with `getter item(): E` in `trait AnyBox comprises { Box[\E\] } where [\E extends Object\]`. Without the outside call the program checks; the size form (`sz(mk().me)` with `getter me(): Nt[\n\]`) is accepted.
- **Where:** compiled path, checker: `TypeAnalyzer.staticParam` calls `bug` (`TypeAnalyzer.scala:1077`) from `pSubInner` (`:208`) under `Functionals.checkApplicableWithoutInference` (`Functionals.scala:458`). `references/compiler.md` ("The checker's gaps") also lists this departure.
- **Reproduce:** no reproducer file; write the program from the claim and run `fortress typecheck` (or compile) on it to see the crash.
- **Status:** wait: the question is what type the specification gives such a call (an opened/fresh type, or a refusal); a crash is neither. No gated test until that is settled.
- **Could not resolve:**
  - "the unopened variable" / "an opened type": I take "opened" to mean replaced by the fresh type the checker gives a `where`-clause variable at a call (`compiler.md`), but the skill never uses the word "open" for this (language/checker concept, half found).
  - "Row 809's fix, for a functional method": what a "functional method" is and what row 809 fixed is not given here (concept lacking; would need the ledger).
  - "No gated test: the refusal is a crash.": reads oddly; I take it as "a test cannot assert the right answer while the checker crashes and the right answer is undecided" (unclear wording).

## Row 777

- **Defect:** Walk does not check a method's `where` clause that constrains its object's static parameter at a dotted call: with `showIt(): String where { T extends Shows } = "h"` in `object Holder[\T\](x: T)`, `Holder[\String\]("s").showIt()` prints `h` though `String` does not extend `Shows`. It should be refused, as the compiled checker refuses it.
- **Where:** walk; dotted method call, method-level `where` clause on the enclosing object's parameter. No file named.
- **Reproduce:** run `ProjectFortress/tests/XXXWhereBoundDottedCallWalk.fss` under walk; it prints `h`. The compiled checker gives 'Method Holder[\String\].showIt is not applicable: its where clause requires String to extend Shows.'
- **Status:** build a fix under walk. Related: row 750 (walk does refuse an object's own constraint at a use of its type), row 748 (with a body that needs the bound walk stops in the body instead).
- **Could not resolve:** nothing blocking. The notes do not say where in walk the check is missing (a worker must find it).

## Row 805

- **Defect:** The compiled checker refuses passing a tuple of indices to a function whose single parameter has type `Index`: for `takesIndex(x: Index)` and `i, j: ZZ32`, both `takesIndex((i, j))` and `takesIndex(i, j)` fail with 'Index->ZZ32 is not applicable to an argument of type (ZZ32, ZZ32).' The checker splits the arguments and matches them one per domain type, so a non-tuple domain gets two arguments for one slot. A generic `[\I extends Index\](x: I)` and a typed variable `p: (ZZ32, ZZ32)` are accepted; walk runs both calls.
- **Where:** compiled path, checker: `Functionals.checkApplicableWithoutInference` (`Functionals.scala:452`, `:494`; only an `Any` domain keeps the whole list, `:481`).
- **Reproduce:** no test can hold it (the compiled tests use the compiler's prelude, which has no `Index`). Probe: run the count stage's `WorldFlip -stop typecheck` on such a call under the interpreter's library; it prints 'Could not check call to function takesIndex'.
- **Status:** build a fix in the checker, checked by the probe rather than a gated test. Workaround: bind the tuple to a typed variable first.
- **Could not resolve:**
  - `Index`: what it is (a library trait for array indices that tuples of `ZZ32` extend?) is not in the skill (language/library concept lacking).
  - "yet takes `p: (ZZ32, ZZ32)`": I read it as "yet accepts a variable `p` of that tuple type as the argument", but it could read as a parameter declaration (unclear wording).
  - "the count stage's `WorldFlip -stop typecheck`": `compiler.md` describes the count stage as `checker-count/run.sh`, but never names `WorldFlip` or a `-stop` flag; how to invoke it on one program is not said (unclear; tool not found in the skill).
  - The two message forms 'Index->ZZ32 is not applicable' and 'Could not check call' differ; the row does not say if they are the same refusal (unclear wording).

## Row 831

- **Defect:** Both paths' front end refuses, with 'X is undefined.', a trait whose `comprises` lists a type at a type `where`-clause variable when the trait declares a `coerce`. Coercion lifting produces a coercion whose type is the trait's self type, `T & G[\X\]`, outside the trait, where `X` is not bound. Without the `coerce`, the program is fine; a `nat` variable loads.
- **Where:** both paths (shared front end): `CoercionLifter.makeLiftedCoercion` (`compiler/desugarer/CoercionLifter.scala:156`), `SelfParamDisambiguator.scala:77-78`, before `TypeDisambiguator` binds `X` only in the trait (`compiler/Disambiguator.java:149`, `:304`).
- **Reproduce:** `trait T comprises G[\X\] where [\X\] coerce(x: ZZ32) = Gz end`, `trait G[\X\] extends T end`, `object Gz extends G[\ZZ32\] end`; run under walk or `fortress disambiguate`: 'X is undefined.'. No test file.
- **Status:** build a fix. No trait in the tree hits it today; the team's `AnyIntegral` would. A fix is sketched in `perf-probes/anyintegral-comprises-where/REPORT.md`.
- **Could not resolve:**
  - "the lifted coercion" / coercion lifting: what the lifter does (moves a trait's `coerce` to top level?) is not in the skill (language/compiler concept lacking).
  - Class `implementation gap (checker)` while the claim says the front end of both paths, the disambiguator; I could read the class two ways (unclear wording).
  - "the AnyIntegral comprises-where probe" and "the team's `AnyIntegral`": what `AnyIntegral` is and where the probe ran is not said; the report path's root (`explorations/`?) is not given (unclear wording).
  - "No trait of the tree is one": means no trait in the tree has this shape (unclear wording, minor).

## Row 869

- **Defect:** Walk refuses a use of an object (or trait) whose own `where` clause introduces a variable that only a constraint on a static parameter fixes: for `object W[\U\](u: U) where [\nat n\]{U extends {X[\n\]}}` and `O extends X[\1\]`, `W[\O\](O)` stops with 'O must subtype X[\n\]': walk does not find `n = 1`. The trait form `trait Shelf[\U\] where [\nat n\]{U extends {X[\n\]}}` with `object S[\U\](u: U) extends Shelf[\U\]` fails the same at `S[\O\](O)`. The compiled path accepts and runs both ('w O', 'shelf O').
- **Where:** walk; object/trait instantiation with a `where`-clause variable. No file named.
- **Reproduce:** run `ProjectFortress/tests/XXXWhereVariableObjectWalk.fss` under walk; it stops with 'O must subtype X[\n\]'. With a plain `where { U extends T }` the object runs, so the introduced variable is the trigger. Same on base b0f6cd6b7.
- **Status:** build a fix under walk. Check P-151 first (print it with the records tool): it lists the `where`-clause forms that were built and names neither of these.
- **Could not resolve:**
  - "P-151 lists neither form among those built": what P-151 decides is not given here; a worker must print it (would need the record).
  - `O` is used both as a type (`W[\O\]`, `O extends X[\1\]`) and as a value (`(O)`); I take it to be an object declaration used as its own singleton value (language concept I am fairly sure of, but the row does not say).
