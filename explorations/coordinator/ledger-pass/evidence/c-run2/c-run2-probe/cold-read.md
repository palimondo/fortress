# Cold read: c-run2-probe

Read with `CLAUDE.md`, the `fortress-repo` skill's core and greps of its `references/` (not `revival-changes.md` or `sources.md`). Seven rows; no duplicate text.

A point common to every row: the skill names the seven status words (`records.md`, "The gap ledger") but defines them only in the ledger's row template, which a cold reader may not read. I read `NEGATIVE-VERIFIED` as "the defect is reproduced and stands; fix it" and `CONTESTED` as "an open question waits on the curator" (from `close ... --settled TEXT`). Neither is stated in the skill.

## Row 850

- **Defect:** the compiled checker's test of whether two types exclude each other treats every static parameter as invariant, even one declared `covariant`. So with `trait C[\covariant S\]` and `Dog`, `Cat` below `Animal`, it refuses an object that extends both `C[\Dog\]` and `C[\Animal\]` (which the variance paper allows), and it accepts `f(x: C[\Dog\])` beside `f(x: C[\Cat\])` as an exclusive pair although a `DogCat` value can be both, so the overloading check is unsound there.
- **Where:** compiled path, checker; `checkP` in `scala_src/types/TypeAnalyzer.scala:541-555`, the non-equivalence test at `:547-551`. Rules cited in `Papers/Variance/appendix.tex` and `lang.tex`.
- **Reproduce:** no test. Write `D` and `bin/fortress compile` it: expect 'Types C[\Dog\] and C[\Animal\] exclude each other.  D must not extend them.' (4 errors). Write the `f` pair with `object DogCatC extends C[\DogCat\]`: it compiles and `f(DogCatC)` prints 1.
- **Status:** CONTESTED: wait. Variance is future work by P-62 and no library or model line uses it; do not build a fix unless the curator settles it.
- **Could not resolve:**
  - `covariant` on a static parameter: language concept. The skill says "Generics are invariant: there is no `+T` or `-T`", so I cannot tell whether `covariant` parses today or is only the paper's syntax; the row implies it parses. Missing from the skill.
  - "siblings: 404, 406": unclear wording; I read it as related rows, but the relation is not said.
  - "the POPL 2019 rules map" (found by): a source I cannot place; presumably the variance paper's rules compared with the tree.
  - Which spec section is meant: the row cites "Where Clauses" of `trait-parameters.tex`, which does not obviously concern variance or exclusion. Unclear wording.
  - "the `f` pair ... compiles, and `f(DogCatC)` prints 1": which `f` has body 1 is not said, so I cannot tell whether 1 is the wrong or an arbitrary choice. Unclear wording.
  - "constructability", "[Anc-Same-Trait]": paper rule names; `lang.tex` lacks its `Papers/Variance/` folder (inferred from the previous citation).

## Row 465

- **Defect:** under walk, an overload of a name that only the component declares is callable from an importer when the api declares other overloads of that name. Api `Q465` declares `f(x: ZZ32)`; its component adds `f(x: String)`; a program importing `Q465` calls `f("a")` and it runs. A name that the api does not declare at all is correctly refused. The api should be the only interface (`interpreter.md:80`: walk compares no component with its apis).
- **Where:** walk; import of an api's functions. The code that merges the component's overloads into the import is not located.
- **Reproduce:** no test. Three files in one folder: `Q465.fsi` with `f(x: ZZ32): ZZ32`, `Q465.fss` with that and `f(x: String): String = x "!"`, `Q465Main.fss` with `import Q465.{...}`. `bin/fortress Q465Main.fss` prints `2` and `a!`. Control: `ComponentOnly.fss` (a name only the component has) fails 'Function __thrower is not defined'.
- **Status:** NEGATIVE-VERIFIED: a fix to build, but first locate where walk takes the component's overloads. No library code depends on it now (the `Array2` cases are declared in `FortressLibrary.fsi:1729-1730`). Workaround: declare the overload in the api.
- **Could not resolve:**
  - What `Q465Main` calls to print `2`: not given (presumably `f(1)` with body `x + 1`). Unclear wording.
  - The probe "in the parent of `9269f7bd2`": I read it as "the file was deleted in that commit; check it out from its parent", but this convention is not in the skill. Unclear wording.
  - "The library's cases are gone": which earlier cases, and what "gone" means (now declared in the api). Readable, but it leans on history.
  - "full text: history, row 465": I read it as "the row's earlier text is in `fortress-gap-ledger-history.md`" (`records.md`). Unclear wording, but resolvable.
  - "climb batch 7 rung A": project history; harmless for a worker.

## Row 789

- **Defect:** the compiled checker crashes its own reasoning on a pair of generic overloads: instead of judging the pair (accepting it, or reporting 'Invalid overloading'), it reports an internal-looking error 'V is not in the kind env' for `h[\T extends R[\ZZ32\]\](x: Box[\T\], y: T)` beside `h[\U, V\](x: Box[\V\], y: Ob[\U\])`.
- **Where:** compiled path, checker, overloading check of declarations with static parameters. No file named.
- **Reproduce:** no test. `P789.fss` with `trait R[\T\]`, `trait Box[\T\]`, `object Ob[\U\] extends R[\U\]`, `object BoxOb extends Box[\Ob[\ZZ32\]\]`, the two `h`, and `run(): () = println(h(BoxOb, Ob[\ZZ32\]))`. `bin/fortress compile P789.fss` prints 'P789.fss:8:19: V is not in the kind env [][][]' and 'File P789.fss has 1 error.', rc 255. With only the second `h`, it compiles and prints 2. Walk loads the pair (row 788).
- **Status:** NEGATIVE-VERIFIED: build a fix in the checker.
- **Could not resolve:**
  - "kind env": a checker term (the environment of static-parameter kinds, I infer); not in the skill.
  - What the right verdict is: the claim says the error comes "in place of 'Invalid overloading'", so the pair should be refused, but whether the spec refuses it is not argued. Unclear wording: a worker cannot tell whether the target is "refuse with the right message" or "accept".
  - Line 8 col 19: without the file's layout, which declaration that is. Minor.
  - What prints 2 with the second declaration alone: its body is not given. Unclear wording.
  - "siblings: 557, 788": relation not said.
  - Spec path `advanced/overloading.tex` omits `Specification/` (other rows give it); readable.

## Row 390

- **Defect:** on the compiled path, when one overload fits an argument directly (`p(x: Any)`) and another fits only after a coercion (`p(x: Wide)`, with a `coerce` in `Wide` from `NarrowOf`), the call `p(NarrowOf(1))` is compiled to call a dispatcher over both declarations at type `Any`, which is never emitted, so the run dies with `NoSuchMethodError`. The specification says the candidates applicable only with coercion drop out, so `p(Any)` should run, as it does without the `coerce` and under walk. Numerals hit it with no user coercion (`g1(5)`, `h(Circle, 3)`).
- **Where:** compiled path; the checker's overload ranking, `typedApplication` in `scala_src/typechecker/impls/Functionals.scala:650` (Class says checker), shown at run time.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXCoercionAnyOverloadRungC.test`: prints REACHED, then 'NoSuchMethodError: ... \=p{...}(fortress.AnyType$Any)'.
- **Status:** NEGATIVE-VERIFIED: build a fix; the `XXX` test exists to be promoted.
- **Could not resolve:**
  - The dispatcher name `=p{...fss\!20\!1-30,...}(...)`: I read it as a mangled name built from the two declarations' spans; the encoding is not in the skill, but the meaning is clear enough.
  - "a numeral reaches it with no user coercion": I read it as "integer literals coerce to `ZZ32`/`Object` through the library's coercions, so the same bug fires"; readable but the mechanism (literal type) is not explained. Language concept partly missing.
  - Whether the fix belongs in the checker (ranking) or the code generator (emitting the dispatcher): the class says checker and the note points at ranking; acceptable.

## Row 23

- **Defect:** under walk, a function whose parameter type is an array with a size parameter, `f[\nat n\](a: RR64[n])`, refuses an array built at run time (`array[\RR64\](3).fill(1.5)`): unification of `__DefaultVector[\RR64,3\]` with the array type fails. A function with a literal size, `g(a: RR64[3])`, accepts the same array.
- **Where:** walk; static-parameter inference at a call, `unify` in `interpreter/evaluator/types/FType.java:576`.
- **Reproduce:** no test. `bin/fortress RvwNatArray.fss` (probe in the parent of `e879b6a44`) prints `literal size: 3`, then 'Unification error: RvwNatArray.fss:3:15-20: Cannot unify __DefaultVector[\RR64,3\](class ...FTypeObjectInstance) with ArrayType', rc 1.
- **Status:** NEGATIVE-VERIFIED: a fix to build in walk's unification. Workaround: use a literal size. The compiled path is not tried; the row names walk only.
- **Could not resolve:**
  - `T[n]` / `RR64[n]` as an array type with size `n`: language concept; the skill says `[i]` indexes and lists `nat` sizes, but not that `T[n]` in a type position is an array type. Inferred.
  - `__DefaultVector`, `ArrayType`: library and interpreter names not in the skill; I read the first as the library's run-time class of a 1-D array and the second as walk's internal form of `RR64[n]`.
  - Whether the compiled path has the defect: not said. The skill asks rows to say which paths show it. Unclear (missing).
  - "blinded" as finder: unclear wording; I cannot tell what it names (`committing.md` mentions a `blinded-fable` branch).
  - The probe's source is not given beyond the claim; "in the parent of" convention as in row 465.

## Row 393

- **Defect:** a cycle of coercions (`P` declares `coerce(x: Q)`, `Q` declares `coerce(x: P)`) is accepted, though the specification rejects it statically. Both paths run it: `fp(QOf(1))` and `fq(POf(2))` print 1 and 2. The compiled checker checks coercion overloading but not cycles in the graph of `extends` plus `coerce`; walk has no checker.
- **Where:** both paths, but the fix is in the compiled checker (class: checker). No checker file named.
- **Reproduce:** no test. Probe `SkCycle.fss` (in the parent of `ab067d9b6`): `bin/fortress compile SkCycle.fss` succeeds, `bin/fortress run SkCycle` prints `fp(QOf(1)) =  1` and `fq(POf(2)) =  2`; `bin/fortress SkCycle.fss` prints the same.
- **Status:** NEGATIVE-VERIFIED: build a fix: first an `XXX` compile test with `compile_err_contains`, then the cycle check in the checker. Walk stays as is.
- **Could not resolve:**
  - The refusal's message for `compile_err_contains`: not given, so a worker must choose it. Unclear (missing).
  - "the extends-plus-coerce graph": I read it as the graph whose edges are subtyping and declared coercions; the spec section would confirm. Readable.
  - `QOf`, `POf`: assumed objects extending `Q` and `P`; not stated.
  - "rung C's skeptic": history; harmless.

## Row 852

- **Defect:** a declaration with two parameters of one name, or two static parameters of one name, is accepted on both paths: `f(x: ZZ32, x: ZZ32): ZZ32 = x` runs and `f(1, 2)` prints 2; `g[\T, T\](x: T): T = x` runs and `g[\ZZ32, ZZ32\](3)` prints 3. The specification and the paper require the names to be distinct.
- **Where:** both paths, through the shared disambiguation phase: `ExprDisambiguator.scala:837-841` collects names in a `Set[Id]` whose `equals` also compares spans (`nodes/Id.java:54-72`), so two `x` stay distinct; and `checkForShadowingVars` (`ExprDisambiguator.scala:766-783`) has loop bounds `size - 2`, `size - 1` (`:776-777`) that skip pairs.
- **Reproduce:** no test. `bin/fortress DupParam.fss` prints 2, `bin/fortress DupStaticParam.fss` prints 3, rc 0; `bin/fortress compile` of each succeeds and `bin/fortress run` prints the same.
- **Status:** NEGATIVE-VERIFIED: build a fix in the disambiguator; since phase 2 is shared, test on both paths (SKILL.md, "How a program runs").
- **Could not resolve:**
  - Class "implementation gap (checker)" while the code cited is the disambiguator, which both paths run: unclear wording; a worker may think only the compiled path needs the fix.
  - The `ExprDisambiguator.scala` and `nodes/Id.java` paths lack their directories (`scala_src/...`?); findable, but unclear.
  - Whether the loop bounds are an off-by-one bug (they skip the last element) or just how the pairs are read: the note states them without saying they are wrong. Unclear wording.
  - Which of the two causes makes each probe pass (the `Set` for parameters, the loop for static parameters?): not said.
  - `[D-Method]`, `[T-Closure]`, `[D-Trait]`, `[D-Object]`, `resolve.tex`: paper rule names; `resolve.tex`'s folder inferred as `Papers/Variance/`.
