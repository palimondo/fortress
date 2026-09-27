# Evidence B: a numeral's type, static arguments and coercion, part by part

Evidence for the coordinator's numerics plan. This digest recommends nothing.

- Tree: `219cd7038` on `main`. Its only difference from `cbb684be8` is one boot-note line, so every capture holds for both.
- Probes ran on `bin/fortress` as built, with private caches under `probes-B/work/` that were deleted after each run. Nothing tracked was edited, and nothing was written to `default_repository/`.
- **[measured]** marks a result from my own probes in `probes-B/`, with the capture named. **[record]** marks a measurement already on file (a ledger row, FACTS or a report). **[read]** marks something I read in the source or the text.
- "The checker against the one library" means the compiled path's static checker run with the interpreter's library in scope (`probes-B/check.sh`). That script is the driver of `explorations/reviews/sum-replacement-judgement/check.sh`: `CheckDriver.java` plus the fill worker's shadow `StaticChecker` with `-Dprobe.dropApiErrors`, both compiled read-only from the tree.

## 0. The short of it

- **A numeral's type has four answers.**
  - **Specification:** a numeral has a type of its own, and the relation of that type to the number types was never written (`literals.tex:83-96`, `:127-148`).
  - **Compiled checker:** it gives every integer numeral `IntLiteral` and every radix-point numeral `FloatLiteral` (`Misc.scala:467-473`). Which `IntLiteral` that is depends on the library in scope:
    - the compiler library's is a trait of its own, and each integer type coerces from it (`CompilerBuiltin.fsi:390`);
    - the one library's is `object IntLiteral extends ZZ32` (`FortressBuiltin.fsi:117`).
  - **Walk:** it makes an integer numeral an `Int`, a `Long` or a `BigNum` by magnitude, and a radix-point numeral a `FloatLiteral <: RR64` (`FIntLiteral.java:40-56`; **[measured]** `BNumeralKinds.walk.txt`).
- **Static arguments are inferred from the arguments alone, on both paths.**
  - **Walk** infers them from run-time values, by join (`EvaluatorBase.java:50-251`).
  - **The compiled checker** takes the join of the lower bounds, a union. It then tries one heuristic: when there is a single lower bound, it tries that type's ancestors. What is left open becomes `BottomType` or a "without context" error (`Formula.scala:486-562`, `STypesUtil.scala:1937-1940`).
  - **The checker's expected type** is threaded to the inference but dropped for a call written `f(x)` (`Operators.scala:89-90`). **[measured]** It does reach a method invocation and an operator (`BCtxCk2.check.txt`).
- **Coercion never takes part in inference, and it never targets a type parameter, on either path.**
  - The specification: "types named by type parameters do not have coercions" (`conversions-coercions.tex:363-365`).
  - The checker: `checkApplicableWithInference` is "with static argument inference and no coercion" (`Functionals.scala:171-173`); `CoercionOracle.checkCoercion` targets only trait, tuple and arrow types (`:145-155`).
  - Walk: inference unifies every argument, including one whose parameter has a non-generic declared type, before any conversion (`EvaluatorBase.java:167-176`), and rung C's overload pass skips generic arms (`OverloadedFunction.java:826`).
- **The three meet on the flat tower in five places.** **[measured]** unless marked.
  - A numeral or narrower argument for a declared `ZZ64` or `RR64` parameter of a generic function is refused on both paths, and converted when the static argument is written.
  - A generic call over `ZZ64` and a numeral, or `ZZ64` and `ZZ32`, fails on both. Walk infers `AnyIntegral` (shown in its error). The checker's join is the union `OR(ZZ64,IntLiteral)`, shown on the unbounded `pick`; `twice` is only reported not applicable. Either way the call then fails an `Integral[\T\]` bound, or passes as a union where the bound allows one: `l#3` gives `CompactFullRange[\OR(ZZ64,IntLiteral)\]`.
  - A numeral inside a body generic over `Integral[\T\]` (`x + 1`) is refused by the checker and runs under walk. Under walk the result has a third type when `T` is `NN32`: an `NN32` plus a numeral is a `ZZ64`.
  - A clause-form big operator or a no-argument generic binds `Bottom` **[record]**: rows 424, 425 and 447.
  - The library's range factories rely on walk's join through `0 asif ZZ32` ("to ensure that the result type is at least ZZ32", `RangeInternals.fss:1420-1421`). On the flat tower, `0#l` with `l: ZZ64` yields `Int` elements, and `u#unsigned(3)` yields `NN32`, then `Long`.

## 1. The specification (`Specification/`, July 2012 draft plus revival revisions) [read]

### 1.1 A numeral's type

- `basic/expressions/literals.tex:83-86`: "A numeral containing only digits (let $n$ be the number of digits) has type `NaturalNumeral[\n,10,v\]` where $v$ is the value of the numeral interpreted in radix ten. If the numeral has no leading zeros, or is the literal `0`, then it also has type `Literal[\v\]`."
- `:87-96` is a `\note`: "What is the relationship between `Literal[\v\]` and `NaturalNumeral[\n, 10, v\]`? We need to describe the `Numeral` type hierarchy. All the numeric/numeral types should be defined and their relations to each other given."
- `:104-125` covers the explicit-radix and radix-point numerals: `NaturalNumeralWithExplicitRadix`, `RadixPointNumeral[\n,m,10,v\]` and `RadixPointNumeralWithExplicitRadix`.
- `:127-129`: "Every numeral also has type `Numeral[\n,m,r,v\]` for appropriate values of n, m, r, and v."
- `:132-148`: "Numerals are not directly converted to any of the number types because, as in common mathematical usage, we expect them to be polymorphic. … Therefore, numerals have their own types as described above. This approach allows library designers to decide how numerals should interact with other types of objects by defining coercion operations … Libraries define coercions from numerals to integers (for simple numerals) and rational numbers (for compound numerals)."
- `:162-165`: "Numerals containing a radix point are actually rational literals; thus 3.125 has the rational value 3125/1000." `:170-173`: such static expressions in a floating-point computation are computed exactly and rounded once.
- `basic/conversions-coercions.tex:64-68`: "Fortress supports the automatic conversion of values of type ZZ32, and of integer numerals, to the floating-point type RR64 … a value of any other integer type is converted to RR64 explicitly".
- `:74-88` is the revision note recording answer 8. It says: "The interpreter gives an integer numeral outside the range of ZZ32 a wider integer type, and so does not yet convert it" (`:84-85`). It also says: "The compiled path's own library declares no coercion into RR64 from an integer type or an integer numeral" (`:86-88`).
- `:158-159`: "Example 1: For any floating-point parameter, a decimal integer literal argument may be used."

### 1.2 Static arguments, and the inference chapter the text cites

- `basic/overloading.tex:170-175`: "A declaration f(Ps) is applicable to a call f(Cs) if … Cs <: Ps. … If the parameter type Ps includes static parameters, they are inferred as described in \chapref{type-inference} before checking the applicability of the declaration to the call."
  - The same sentence is at `:202-206` for dotted methods, and at `:291-296` for "before comparing their parameter types to determine which declaration is more specific".
  - `:136-138` assumes that "all static variables in functional calls have been instantiated or inferred".
- **The cited chapter is `Specification/basic/inference.tex`** (`\chaplabel{type-inference}`, `:13`, included by `basic/basic.tex:32`). It is 27 lines, all heading and notes:
  - `:15`: `\note{This chapter will include the Fortress static type inference mechanism.}`
  - `:17-26` lists open questions, among them: "There seems to be a circular dependency between inference and juxtaposition disambiguation" (`:19-22`); "Type Inference (Dan's email titled ``Comments on a first reading of the spec'' on 06/05/07)" (`:23`); and "Do we want to forbid such cases where type inference infers `BottomType`s for static parameters?" (`:24-25`).
- `basic/components/type-inference.tex:15-18` presupposes the chapter: "Type inference for Fortress has been described as a procedure performed over a whole Fortress program in \chapref{type-inference}."
- `basic/expressions/var-ref.tex:35-40`: "most identifier references do not include them.; the static arguments are statically inferred from the context of the function call (as described in \chapref{type-inference})". `method-invocation.tex:49-52` says the same for methods ("from the context of the method invocation").
- Revival revisions that point at the empty chapter:
  - `basic-lib/basic-integers.tex:61-65`: "A generic call or a range over two different integer types is to infer the narrowest type that both coerce into, by a rule to be written into \chapref{type-inference} together with its implementation; until then such a call writes its static argument, as in f[\ZZ64\](a, b)." This is answer 8, the promotion rule.
  - `basic/trait-parameters.tex:478-485`: `Empty` "needs the element type written at each use until the static arguments of a generic object can be inferred".
  - `basic/expressions/reductions.tex:27-44`: the desugaring of a reduction "is directed by type … Neither implementation directs it by type yet … each take `BottomType` for it" (rows 424 and 425). The type-directed rule itself is `advanced/parallelism-locality/defining-generators.tex:147-157` (`SUM[\N\]`, `SumReduction[\N\]` for the type N of the expression).

### 1.3 Coercion at a call and in a typed binding; a generic callee; a type-parameter target

- The contexts where coercion happens (`conversions-coercions.tex:102-127`):
  - "Coercion from T to U may occur in an expression context where the context expects the expression to have type U and the type of the expression is a subtype of T", except type ascriptions and type assumptions (`:102-109`).
  - The contexts listed are right-hand sides of declarations with declared types, "arguments to functionals and constructors where the corresponding parameters have declared types", "body expressions of functionals and constructors where the return types are declared", and "expressions whose enclosing expressions constrain the types of their subexpressions" (`:115-127`).
- `:95-98`: "coercion occurs only when the declared type of the corresponding parameter in the functional declaration is exactly the type U being coerced to — not if it is a supertype of U."
- `:144-149`: "Coercion is not automatically chained in Fortress".
- **A type-parameter target** (`:348-387`), on `object Bozo[\T extends Frobboz\](t:T)`: "this says nothing about whether the type parameter T of Bozo has coercions, because coercions are not inherited. (In fact, we can make a stronger statement: types named by type parameters *do not have coercions*!)" (`:363-365`). Inherited methods of the bound still take coercions on their own parameters (`:381-387`).
- **Applicability with coercion** (`:417-432`):
  - It is defined with substitutability, "T ≼ U iff T <: U or T ⇝ U". A declaration f(Ps) is applicable with coercion if Cs ≼ Ps.
  - `:455-457`: "the only difference between applicability and applicability with coercion is that substitutability is used instead of subtyping".
  - The definition names no static parameters. The only statement on a generic callee is `overloading.tex:173-175`: infer first, then check applicability. **Nothing says whether inference may use substitutability; the chapter that would say is empty.**
- **Resolution** (`:472-480`, `:533-553`): a declaration applicable without coercion is chosen first; otherwise "the coercion that yields the most specific type is chosen". `:584-587`: "coercion is resolved statically … the statically chosen coercion is applied at run time". The ZZ32/ZZ64/ZZ128 example (`:567-582`) is refused by both paths as written (row 394).
- **Coercions with static parameters** (`:209-238`): the `where {T widens or coerces S}` clause, with the example `trait Vector[\T extends Number\] coerce[\S extends Number\](x: Vector[\S\]) where {T widens or coerces S}`. Coercions are not inherited (`:241-263`).
- **Widening** (`:806-848`) is the one place where the text uses the expected type U to re-choose a declaration: "discard all declarations whose return types are not subtypes of U". The chapter's opening note says "Widening and where clauses are not yet supported" (`:15`), and `:922-923` says "Future versions of this specification will include tables of coercions".

### 1.4 Ranges

- The section is `basic/expressions/ranges.tex` (`\seclabel{ranges}`, `:13`). A range is "a special kind of Generator for a set of integers" (`:37-38`), and "Assume that a, b, and c are expressions that produce integer values" (`:43-44`).
- Static ranges are `StaticRange[\a,n,1\]` and `RangeOfStaticSize[\n\]` (`:49-71`).
- **No integer type is named.** `advanced-lib/binary.tex:164` uses `RangeOfStaticSize[\IndexInt,m\]`, with `IndexInt` undefined in the text. The revision at `basic-integers.tex:61-65` (above) is the only sentence on a range over two integer types.

## 2. The team's later Types chapter and the Types papers [read]

- **`Documentation/Specification/Prose/Language/types.tick`** (1,056 lines; the word "infer" occurs nowhere in it):
  - `:970-976` makes numerals library types: "Libraries define simple standard types for literals such as `BooleanLiteral[\b\]`, … and `Numeral[\n,m,r,v\]` … (See \secref{literals})". Their relation to the number types is not given.
  - `:938-947` gives the coercion relation, the same definition as `conversions-coercions.tex:402-407`.
  - `:393-400`: "A trait or object declaration may provide a coercion from a type or a generic type … If it provides a coercion from a generic type, then an instantiation of the generic type defined by that declaration coerces the corresponding instantiation."
  - `:521-531`: arrow coercion "replaces what in some languages is handled by contravariance".
  - `:771-789` covers quantified types and "valid instantiation", with no inference procedure.
- **`Papers/Types`** says nothing on numerals or coercion (grep); on inference:
  - `rules.tick:118-129`: "This definition of specificity introduces a type inference problem for dynamic dispatch … we require type parameters for d1 to be inferred *dynamically*. Showing how to do so is beyond the scope of this paper."
  - `discussion.tick:1-66` is commented out. At `:7`: "In the Fortress programming language, a variant of local type inference is used by the type checker to infer instantiations of polymorphic function applications." At `:34-38`: "type inference is performed statically, and the results of that inference are passed to the run-time system to ensure that run-time type inference at a function call is sound."
  - `related-work.tick:92-94` (commented): "our system conservatively assumes only local type inference".
- **`Papers/Welterweight`** covers run-time inference only. `paper.tick:534-560` (abstract): the applicability test "is a semipredicate … a substitution of types for type parameters". `inference.tick:1-36` computes σ at run time from the argument ilks.
- **`Papers/Implementation/MethodMapping.tex:309-319`** is the code generator's plan: "T is the join (more general) of t1 and t2 … The second task … is to infer static parameters. … Top level parameter types are covariant, arrow ranges are covariant, and arrow domains are contravariant."
- **`Papers/RuntimeInstantiation/2012-6-15 return type instantiation restrictions.txt:160-165`**: "this could easily lead to an instantiation that must be bottom, but it is valid."
- **Commit `128f313b5`** (2009-11-17, jmaessen), cited by `coordinator/map/design-intent-sources.md:91`: "ZZ32 now coerces IntLiteral as described in the spec. Over the next few weeks expect more coercions to come on line as we gradually migrate to a flat numeric hierarchy." It touched `typechecker/impls/Misc.scala` and `Operators.scala`.

## 3. The compiled checker (`ProjectFortress/src/com/sun/fortress/scala_src/`)

### 3.1 Where a numeral gets `IntLiteral` [read, measured]

- `typechecker/impls/Misc.scala:467-469` types an `IntLiteralExpr` as `Types.INT_LITERAL`, and `:471-473` types a `FloatLiteralExpr` as `Types.FLOAT_LITERAL`. The value is never looked at.
- A `nat` or `int` static parameter read as a value also has type `INT_LITERAL` (`typechecker/staticenv/KindEnv.scala:67-68`).
- `compiler/Types.java:61-62` resolves both names in `fortressBuiltin()`. That is `"FortressBuiltin"` by default and `"CompilerBuiltin"` after `useCompilerLibraries()` (`compiler/WellKnownNames.java:43`, `:114-116`). So one checker line gives two different types:
  - Compiler library: `trait IntLiteral extends { Number, Equality[\IntLiteral\] } excludes {ZZ32, ZZ64, NN32, RR64, RR32, …}` (`LibraryBuiltin/CompilerBuiltin.fsi:390`).
  - One library: `object IntLiteral extends { ZZ32 }` (`LibraryBuiltin/FortressBuiltin.fsi:117`; `FortressBuiltin.fss:470`). Its arithmetic is withheld under the team's note "Do not enable these until coercion is implemented; doing so will cause all our arithmetic to occur on IntLiterals." (`FortressBuiltin.fsi:125-127`), so `3 + 4` is `ZZ32`'s `+`. `ZZ32 … comprises { Int, IntLiteral }` (`Library/FortressLibrary.fsi:505-507`). `object FloatLiteral extends RR64` (`FortressBuiltin.fsi:44`), and `RR64 … comprises { Float, FloatLiteral, RR32 }` (`FortressLibrary.fsi:286-289`).
- **[measured]** Against the one library (`BNumeralKindsCk.check.txt`):
  - `3` is `IntLiteral` and `1.5` is `FloatLiteral`.
  - An untyped `hd = 4` binds `IntLiteral`, and `b1 = 0.85` binds `FloatLiteral`.
  - `3 + 4` is `ZZ32`, `1 - 0.85` is `RR64`, `1.0 3` is `RR64`, `1.0 hd` is `RR64`, and `1 - b1` is `RR64`.
  - `t0 DIV 1000000` with `t0: ZZ64` is `ZZ64`.
  - `3000000000` is `IntLiteral`, with no range check.
  - `a: ZZ64 = 3`, `r: RR64 = 3` and `q: QQ = 3` are accepted.
- **[measured]** Typed bindings (`BBindCk.check.txt`): `a: NN32 = 3` and `a: NN64 = 3` are refused ("Right-hand side has type IntLiteral, but declared type is NN32"), and so is `a: RR32 = 1.5`. `a: ZZ = 3`, `a: ZZ32 = 3000000000`, `a: ZZ64 = 3000000000` and `a: RR64 = 3000000000` are accepted.

### 3.2 How a static argument is inferred [read, measured]

- **The entry points.**
  - `useful/STypesUtil.scala:928-947` (`inferStaticParams`) builds the constraint "argType <: dom(infArrow)", adding "range(infArrow) <: context" when a context is given (`:935-942`).
  - `:965-1034` (`inferStaticParamsHelper`) substitutes inference variables, adds the bounds as upper bounds, and solves. `:1002-1003` carries GLS's 2/6/2012 comments: "Don't allow BottomType to be an upper bound … The real fix would be to prohibit BottomType as an upper bound only for vars that are in contravariant position."
- **The solver.** `typechecker/Formula.scala:486-562` (`solve`/`slv`):
  - A trivially true constraint returns the empty substitution (`:493`).
  - Otherwise each variable is bound to `ta.join(pl…)`, the join of its lower bounds (`:527`). The join is a union: `TypeAnalyzer.join(x) = normalize(makeUnionType(x))` (`types/TypeAnalyzer.scala:80-81`).
  - `:528-541` is the "Heuristic extension to Dan Smith's algorithm: If there is a single lower bound and it is a trait type, try all of its ancestors, searching for one that satisfies all upper bounds."
  - Remaining variables go through `TU.killIvars` (`:524`), which maps every leftover inference variable to `BOTTOM` (`STypesUtil.scala:1937-1940`).
  - `:507` is the team's TODO: "We can solve more constraints if we iterate … until we hit a fixed point".
- **The caller.** `typechecker/impls/Functionals.scala`:
  - `checkApplicable` (`:125-169`) infers lifted parameters, then calls `checkApplicableWithInference` (`:175-272`) when static parameters remain, and `checkApplicableWithoutInference` (`:278-339`) when none do.
  - Inference variables left in the result give `makeNoContextError` (`:246-259`), "Could not infer static argument T without context". `checkApplication` (`:438-476`) passes `context` to every candidate (`:449`).
- **[measured] What the solver produces** against the one library (`BGenCk.check.txt`, `BGenCk2.check.txt`):
  - `inc[\T extends Integral[\T\]\]`: `inc(l)` with `l: ZZ64` gives `ZZ64`, `inc(z)` gives `ZZ32`, and `inc(5)` gives `ZZ32`. `IntLiteral` fails the F-bound, so the ancestor heuristic picks `ZZ32`. `inc(u)` gives `NN32` and `inc(big(5))` gives `ZZ`.
  - `twice(3, 4)` gives `ZZ32`.
  - `twice(l, 3)` is refused: "`[\T extends Integral[\T\]\](T, T)->T` is not applicable to an argument of type (ZZ64, IntLiteral)". `twice(l, z)` is refused likewise (ZZ64, ZZ32).
  - The unbounded `pick[\T\](x: T, y: T)`: `pick(l, 3)` has type `OR(ZZ64,IntLiteral)` and `pick(l, z)` has `OR(ZZ64,ZZ32)`. **A union is inferred.**
  - `pick(3, 4)` and `idt(3)` have type `IntLiteral`.
  - Ranges (`BRangeCk.check.txt`): `l#3` is `CompactFullRange[\OR(ZZ64,IntLiteral)\]`, `0#l` is `CompactFullRange[\OR(IntLiteral,ZZ64)\]` and `big(1)#3` is `CompactFullRange[\OR(ZZ,IntLiteral)\]`. **`0#3` is `CompactFullRange[\IntLiteral\]`.** `u#unsigned(3)` is `CompactFullRange[\NN32\]` and `z#3` is `CompactFullRange[\ZZ32\]`.
- **[measured] What an unconstrained type parameter becomes** (`BBottomCk.check.txt`):
  - With a bound, `mkB[\T extends Integral[\T\]\](): BoxT[\T\]` and `etB[\T extends …\](x: ZZ32): BoxT[\T\]` give `BoxT[\BottomType\]`.
  - With no bound, `mk[\T\]()` and `et[\T\](z)` give "Could not infer static argument T without context".
  - **[record]** On the compile path proper, which gives every empty `extends` clause the bound `Object` (row 412), `et[\T\](x: ZZ32): BoxT[\T\]` binds `BottomType`, compiles, and dies loading `java/lang/Object$RTTIc` (row 447). The no-argument big operators bind `Bottom` (row 425).

### 3.3 Whether the expected type is used [read, measured]

- **Where it is passed.**
  - A typed binding: `Decls.scala:352-373` for local declarations, and `:241` and `:277` for top-level ones, through `checkExpr(expr, expected, msg)`.
  - A declared return type: `Decls.scala:206-214`.
  - a `do` block's last expression and the branches of an `if`: `Misc.scala:508`, `:527-529`.
- **Where it is dropped.** A call written `f(x)` is parsed as a tight juxtaposition:
  - `Operators.scala:89-90`: `case SJuxt(info, multi, infix, front::rest, true, true) => … checkExpr(S_RewriteFnApp(info, front, rest.head))`. The expected type is not passed on.
  - `:76-86`: a tight juxtaposition becomes a `MathPrimary`, also with no expected type.
  - `:197`: `SMathPrimary(…, Nil) => checkExpr(front)`.
- **Arguments** are checked before the enclosing call's inference, with no expected type: `partitionArgs` (`Functionals.scala:95-101`) calls `checkExprIfCheckable` (`STypeChecker.scala:517-525`), which calls `checkExpr(expr)`. Only a function-expression argument waits for its parameter type (`Functionals.scala:187-205`).
- **[measured]** (`BCtxCk.check.txt`, `BCtxCk2.check.txt`):
  - At a function call the context never fixes a static argument:
    - `a: BoxT[\ZZ64\] = wrapT(3)` gives "Right-hand side has type BoxT[\IntLiteral\]".
    - `s: String = idt(3)` gives "Right-hand side has type IntLiteral". The call is not refused, so the context never reached the inference.
    - `a: BoxT[\ZZ64\] = mk()` gives "Could not infer static argument T without context".
    - A return type fails the same way: `b08(): BoxT[\ZZ64\] = wrapT(3)` gives "Function body has type BoxT[\IntLiteral\]".
    - So does an enclosing call's parameter: `takesBox64(wrapT(3))` is "not applicable to an argument of type BoxT[\IntLiteral\]", and `takesBox64(mk())` gives "without context".
    - **[record]** Row 21 (rung R's skeptic): "neither path uses a declared type as context to fix a static argument".
  - **At a method invocation and an operator the context is used:**
    - `a: BoxT[\ZZ64\] = Fac.mk()` is accepted, with T fixed to `ZZ64`. The untyped `v = Fac.mk()` gives "without context".
    - Used, the context can refuse a numeral: `a: BoxT[\ZZ64\] = Fac.wrap(3)` gives "`[\T\]T->BoxT[\T\]` is not applicable to an argument of type IntLiteral". So do the prefix operator `BOXOF 3` and the infix `3 OPLUS 4` under the same binding.
    - Walk has no static context. A typed binding converts the value after the call: `a: ZZ64 = idt(3)` gives `3 : Long` and `r: RR64 = idt(3)` gives `3.0 : Float` (§4.2).

### 3.4 Whether a coercion is considered while solving, and where coercions are inserted [read, measured]

- **Not while solving.**
  - `checkApplicableWithInference` is documented "Check that the arrow type is applicable to these args with static argument inference and no coercion" (`Functionals.scala:171-173`). Its constraint is the subtype relation `checkSubtype(argType, infArrow.getDomain)` (`STypesUtil.scala:936`).
  - Coercions are built only in `checkApplicableWithoutInference`, for a candidate with no static parameters left: "If `checked` is a subtype of the param type, use it. Otherwise, try to build a coercion" (`Functionals.scala:290-300`).
- **The coercion oracle** is `typechecker/CoercionOracle.scala`. Insertion sites:
  - a context with an expected type (`STypeChecker.scala:475-495`, `coercions.buildCoercion(checkedExpr, expected)`);
  - a non-generic argument (`Functionals.scala:296`);
  - `if` joins (`Misc.scala:539`, `substitutableFor`).
- **No coercion to a type variable.**
  - `getCoercionsTo` returns `Set()` unless the target is a trait type: `if (!u.isInstanceOf[TraitType]) return Set()` (`CoercionOracle.scala:92`).
  - `checkCoercion` handles union sources and trait, trait-self, tuple and arrow targets, and otherwise returns `case _ => None` (`:145-155`).
  - A coercion's own static parameters are inferred with no context: `inferStaticParams(liftedCoercion._2, t, None)` (`:199`). The lifted parameters come from the target: "the lifted args are given in U" (`:193-196`).
- **[measured] Consequences** against the one library:
  - In a generic function whose static argument is inferred, a numeral for a declared `ZZ64` or `RR64` parameter is refused: `scale64(BoxT[\String\](2), 3)` is "not applicable to an argument of type (BoxT[\String\], IntLiteral)", and likewise `scaleR`.
  - A `ZZ32` variable for the `ZZ64` parameter is refused likewise.
  - With the static argument written, `scale64[\String\](BoxT[\String\](2), 3)` is accepted, and the coercion is built.
  - **For a declared `ZZ32` parameter the numeral passes by subtyping**, because the one library's `IntLiteral` extends `ZZ32`: `scaleT(BoxT[\String\](2), 3)` is accepted (`BGenCk2.check.txt:a06`). With the compiler library's `IntLiteral` the same shape is refused (row 401, measured there).
  - A numeral in a generic body: in `inc[\T extends Integral[\T\]\](x: T): T = x + 1`, `x + 1` is refused. The error lists "(Integral[\I\], I)->I is not applicable to an argument of type (T, IntLiteral)" beside every number type's `+` (`BGenCk.check.txt`; full list in `work/check-BGenCk.full.txt:17-31`).
  - Non-generic promotion by coercion resolution does happen: `u + 1` with `u: NN32` is `ZZ64`, and so is `1 + u` (`BRangeCk.check.txt`).

### 3.5 The team's own TODOs on these points [read]

- `typechecker/impls/Misc.scala:628`: "TODO: handle generic higher-order function passing here." `:639-640`: "TODO: handle missing static args below (either generic higher-order function or generic singleton being used without explicit type instantiation)". The latter is in `SVarRef`, which keeps the uninstantiated type (FACTS "A generic object referenced without its static arguments …").
- `typechecker/impls/Operators.scala:500`: "TODO: Take care of coercions!" (indexed assignment).
- `typechecker/ConstraintFormula.scala:36`: "@TODO: Top type for inference is ANY or Object?"
- `Formula.scala:507` (above), and the GLS comments at `STypesUtil.scala:1002-1003`.

## 4. Walk (`ProjectFortress/src/com/sun/fortress/interpreter/`)

### 4.1 A numeral's run-time type [read, measured]

- `evaluator/Evaluator.java:1502-1508`: `forFloatLiteralExpr` builds a `new FFloatLiteral(...)`, and `forIntLiteralExpr` returns `FIntLiteral.make(x.getIntVal())`.
- `evaluator/values/FIntLiteral.java:40-56` picks by magnitude:
  - up to `INT_MAX`: `FInt`, a `ZZ32`;
  - up to `LONG_MAX`: `FLong`, a `ZZ64`;
  - above that: `FBigNum`, a `ZZ`.
  - Only a value below `LONG_MIN` stays an `FIntLiteral`. By reading, no source numeral reaches it: a numeral is nonnegative, and `-` is an operator (row 338).
- **[measured]** (`BNumeralKinds.walk.txt`):
  - `3` is `3 : Int`, `3000000000` is `Long` and `100000000000000000000` is `BigNum`. `1.5` is `1.5 : FloatLiteral`.
  - `3 + 4` is `Int`, `1.5 + 2.5` is `Float`, `1 - 0.85` is `0.15000000000000002 : Float`, `1.0 3` is `3.0 : Float`, and `hd = 4; 1.0 hd` is `4.0 : Float`.
  - `a: ZZ64 = 3` is `3 : Long`, `r: RR64 = 3` is `3.0 : Float` and `q: QQ = 3` is `3 : Ratio`.
- **[measured]** Typed bindings (`BwB*.walk.txt`):
  - `a: NN32 = 3` gives "RHS expression type Int is not assignable to LHS type NN32", and `NN64` likewise.
  - `a: RR32 = 1.5` gives "FloatLiteral is not assignable to … RR32".
  - `a: RR64 = 3000000000` and `a: ZZ32 = 3000000000` give "RHS expression type Long is not assignable".
  - `a: ZZ = 3` is `3 : BigNum` and `a: ZZ64 = 3000000000` is `Long`.
  - Against the checker (§3.1) the two paths differ on `RR64 = 3000000000` and `ZZ32 = 3000000000`, and agree on the rest.

### 4.2 How a generic call's static arguments are inferred [read, measured]

- **The entry point** is `evaluator/EvaluatorBase.java:50-251`, `inferAndInstantiateGenericFunction(args, appliedThing, env)`. It is reached from a single generic function (`values/GenericFunctionOrConstructor.java:54`), from each generic arm of an overload set (`values/OverloadedFunction.java:874`), and from a generic lifted coercion (`values/Coercions.java:59`).
  - Bounds are pre-installed by `abm.meetPut` (`:105`).
  - Each argument's **run-time** type `a.type()` is unified with the declared parameter type, whether or not that type mentions a static parameter (`:131-181`; `at.unify(…, ty)` at `:171`, `:176`).
  - The result type then filters the bindings (`MakeInferenceSpecific`, `:188-209`).
  - A self-typed bound that cannot be checked "Choosing to erase to bottom" (`:214-236`, message `:224`). Any parameter still unbound becomes `BottomType.ONLY` (`:245`).
  - There is no call-site context.
- **Two lower bounds are joined** by `FType.join` (`evaluator/types/FType.java:350-380`), the least common supertypes. `TypeLatticeOps.join` stops with `bug(...)` when that set is not a singleton (`evaluator/types/TypeLatticeOps.java:34`).
- **[measured]** (`BwG*`, `BwI*.walk.txt`):
  - `twice(l, 3)` and `twice(l, z)` give "Cannot unify AnyIntegral … with Integral[\T\] … abm=T=(AnyIntegral,Any)". The join of `Long` and `Int` is `AnyIntegral`.
  - `twice(3, 4)` is `7 : Int`. `pick(l, 3)` is `5 : Long`, the bound being `Any`.
  - `inc(l)` is `6 : Long`, `inc(5)` is `6 : Int` and `inc(big(5))` is `6 : BigNum`.
- **[record]** Also on file:
  - A generic method's own static argument is not inferred (row 21).
  - A generic object constructor infers from the run-time class: `Cell(3)` is `Cell[\Int\]` under walk and `Cell[\IntLiteral\]` compiled (row 364).
  - A list literal takes its element type from its elements' run-time class (rows 20 and 432).
  - A no-argument generic erases to `BOTTOM` (row 424).

### 4.3 Rung C's coercion at dispatch meets a generic callee (rows 388, 389) [read, measured]

- **The three kinds of type check** that convert (FACTS "Under `walk`, the interpreter converts by coercion…"):
  - `NonPrimitive.typecheckParams` (`values/NonPrimitive.java:134-194`; conversion `:169-176`) and `buildEnvFromParams` (`:255-270`);
  - `OverloadedFunction.bestMatchWithCoercion` (`:821-853`), reached only when `bestMatchInternal` finds nothing (`:787-802`);
  - typed bindings.
- **Where a generic callee meets them:**
  - The coercion pass skips every generic arm: `if (sfn instanceof GenericFunctionOrMethod) continue;` (`OverloadedFunction.java:826`).
  - For a single generic function, inference unifies each argument with its declared type first (`EvaluatorBase.java:171`, `:176`). "Cannot unify" stops the call before `typecheckParams` could convert.
  - `Coercions.liftedCoercions` finds a target's lifted `coerce_` only for an `FTraitOrObject` (`values/Coercions.java:36-42`), so after instantiation the target is concrete and is never the type parameter.
  - A generic trait's lifted coercion is itself inferred (`Coercions.java:55-63`) and throws (row 389).
- **[measured]** (`BwI8`, `BwI9`, `BwI10`, `BwI11`, `BwI12`):
  - `scale64(BoxT[\String\](2), 3)` gives "Cannot unify Int … with FortressLibrary.ZZ64 … abm=T=(String,Any)". `scaleR(…, 3)` gives the same with `RR64`, and `scale64(…, z)` the same with `z: ZZ32`.
  - `scale64[\String\](…, 3)`, written, is `3 : Long`: the conversion runs.
  - `scaleT(…, 3)`, a `ZZ32` parameter, is `3 : Int`.
  - These are row 388's shape reached by a numeral. On the checker the same five calls split the same way (§3.4).
- **[measured] Inside a generic body** operators dispatch on run-time values with rung C's conversion, and the declared return `T` is not checked:
  - `inc(u: NN32)` returns `6 : Long`, from a function declared to return `T` = `NN32` (`BwG4IncNN32.walk.txt`). The checker gives the call the type `NN32` (`BGenCk.check.txt`).
  - `u + 1` is `6 : Long` (`BwB8NNplus.walk.txt`).
  - The return check is switched off: `if (true || t.typeMatch(x)) return x;` (`values/Simple_fcn.java:42-45`; row 387).

## 5. The compiler library (`Library/CompilerLibrary.fsi/.fss`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi/.fss`) [read]

- **`IntLiteral`** (`CompilerBuiltin.fsi:390-428`) is a trait under `Number` that excludes every integer type.
  - It has six abstract getters, `asZZ32`, `asZZ64`, `asNN32`, `asZZ`, `asNN64` and `asRR64`, and its own arithmetic and comparison family. That family was partly stubbed and partly repaired (rows 80 and 318).
- **What converts from `IntLiteral`**, each by a getter:
  - `ZZ` (`fsi:103-104`; body `fss:518`, `= x.asZZ`);
  - `ZZ64` (`fsi:147-148`; `fss:579`, `= x.asZZ64`);
  - `ZZ32` (`fsi:210-211`; `fss:664`);
  - `NN32` (`fsi:273-274`; `fss:755`);
  - `NN64` (`fsi:332-333`; `fss:820`).
  - `RR64` does not (row 442).
- **`FloatLiteral`**, `trait FloatLiteral excludes {RR32, RR64}` (`fsi:479-482`), has the getters `asRR32` and `asRR64`. Only `RR64` (`fsi:433-434`; `fss:932`) and `RR32` (`fsi:475-476`; `fss:993`) coerce from it. `ZZ32` does not coerce into `RR64` either (row 442).
- **No declaration there is generic over a number bound.** Every static parameter in `CompilerLibrary`, `CompilerAlgebra` and `CompilerBuiltin` is `extends Any` or unbounded, apart from the algebra traits (grep). So no numeral meets a type variable in the compiler library.
- **Ranges** are `opr :(lo:ZZ32, hi:ZZ32): Range` and `opr #(lo:ZZ32, sz:ZZ32): Range` (`CompilerLibrary.fsi:173-174`), with `trait Range extends GeneratorZZ32` (`:143`). They are non-generic, so a numeral bound converts by `ZZ32`'s coercion.
- **Big operators** take no static argument and are over `ZZ32` only: `opr BIG +(): ReductionZZ32`, `opr BIG +(g: GeneratorZZ32): ZZ32`, `opr BIG MAX()` and `opr BIG MAX(g: GeneratorZZ32)` (`:180-184`).
- **`cast[\T extends Any\](x: Any): T`** (`CompilerLibrary.fsi:28`; body `fss:39-43`, a `typecase` on `T`) never matches on the compiled run (row 426).
- The library's own note on `assert` (`CompilerLibrary.fsi:39-44`): "an %Any% parameter suppresses the coercion from %IntLiteral% that a call such as %assert(n, 4)% needs".

## 6. The one library (`Library/*.fss/.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.*`)

### 6.1 Declarations generic over a number bound [measured by scan]

- **The scan** is `probes-B/library-scan/scan.py`, output `scan.out`. It lists every declaration header whose own `[\ … \]` parameters carry `extends Integral[\…\]`, `Number`, `AdditiveGroup[\…\]`, `MultiplicativeRing[\…\]` or `AnyIntegral`. It strips comments and strings, masks `[\ … \]` so that size literals are not counted, and takes the body by indentation up to a closing `end`.
- **175 component declarations** in four files have such a parameter. **66 of them have a numeral in the body.** The apis repeat the 175 (68 + 9 + 95 + 3) with no numerals.
  - `Library/FortressLibrary.fss`: 68 declarations, 23 with a numeral.
  - `Library/RangeInternals.fss`: 93 declarations, 39 with a numeral.
  - `Library/Random.fss`: 9 declarations, 2 with a numeral.
  - `Library/Sparse.fss`: 5 declarations, 2 with a numeral.
  - No other file has one.
- **By the header text** (a header can name two bounds):
  - `Integral[\…\]`: 82 (26 with a numeral);
  - `AnyIntegral`: 39 (33);
  - `Number`: 41 (5);
  - `AdditiveGroup`: 7 (1);
  - `MultiplicativeRing`: 7 (2).
- **By hand, the 23 in `FortressLibrary.fss`:**
  - 20 are the range factories (`:3888-3964`), whose only numerals are the `0 asif ZZ32` device (§6.2).
  - `trait Integral` (`:644`) has `(self MOD 2) = 0` in `even` (`:658`) and `big(1)` (`:650`).
  - `trait Matrix` has index numerals only (`:2612`, `:2630`, `:2644-2647`).
  - `matrix(v)` puts `else 0` off the diagonal (`:2718`; rows 51 and 437).
  - `additiveIdentity` and `multiplicativeIdentity` (`:3107-3131`) have witness branches and the `else => 0`/`else => 1` fallbacks (row 436).
- **In `RangeInternals.fss`** the numerals mostly meet `I` directly:
  - strides and bounds: `LeftScalarRange[\I\](x,1)` (`:1441`), `lo+ex-1` (`:1423`), `OpenScalarRange[\I\](1)` (`:368`, `:1483`);
  - `atOrAboveGoingUp`'s `stride-1` (`:38-39`).

### 6.2 The library's devices for a number of type T in generic code

- **The `zero` and `one` getters.**
  - Declared: `AdditiveGroup.zero(): T` (`FortressLibrary.fsi:256`), `MultiplicativeRing.one(): T` (`:269`, abstract), and `Integral` (`:432-433`).
  - Bodies: `AdditiveGroup` `getter zero(): T = self - self` (`fss:332`); `RR64` `0.0`/`1.0` (`:384-385`); `QQ` (`:553-554`); `ZZ32` `0`/`1` (`:691-692`); `ZZ64` `widen(0)`/`widen(1)` (`:765-766`); `ZZ` `self.zero + 1` (`:918-920`); `IntLiteral` `big(0)`/`big(1)` (`FortressBuiltin.fss:471-472`).
  - They need an element in hand (row 436).
  - **[measured]** `x + x.one`: walk `incOne(l)` is `6 : Long` and `incOne(u)` is `6 : NN32`, the right type (`BwD1One`, `BwD6OneNN`). The checker accepts it (`BDevCk.check.txt`, no error at `:13`).
- **The `() -> T` witness `typecase`.**
  - Sites: `array1` (`fss:2342-2346`), `array2` (`:2702-2706`), `__thrower[\T\](): T = throw ForbiddenException` (`:2339`), `additiveIdentity`/`multiplicativeIdentity` (`:3102-3131`).
  - **[measured]** A user copy returning `cast[\T\](widen(1))` and friends: walk `incWit(l)` is `6 : Long` and `incWit(u)` is `6 : NN32` (`BwD4Wit`, `BwD7WitNN`). The checker accepts it.
  - **[record]** The compiled run chooses the branch right (`WitnessComp2`), but a branch value through `cast[\T\]` throws (row 426).
  - **[measured]** The checker refuses the copied thrower body: "'throw' can only throw objects of Exception type. This expression is of type Exception->ForbiddenException" (`BDevCk.check.txt`). The library's own `__thrower` has that body.
- **`cast[\T\]`** (`fss:33-37`, a `typecase` that does not convert).
  - **[measured]** Walk: `x + cast[\T\](1)` with `T` = `ZZ64` gives `CastError` at `FortressLibrary.fss:36` (`BwD2Cast.walk.txt`). The checker accepts it.
  - **[record]** On the compiled run it never matches (row 426).
- **`asif`.** **[measured]** `x + (1 asif T)`: walk gives "Type of expression, Int, not a subtype of ZZ64" (`BwD3Asif`), and the checker gives "Expression has type IntLiteral, but assumed type is T" (`BDevCk.check.txt:15`).
- **`widen`** is a functional method to `ZZ64`: `ZZ32` (`fsi:540`), `ZZ64` (`:590`) and `ZZ` (`:604`); `NN32`'s goes to `NN64` (`FortressBuiltin.fsi`). It names a fixed type, not `T`.
  - **[measured]** `x + widen(1)`: walk `6 : Long` for `T` = `ZZ64` only (`BwD5Widen`); the checker refuses it: "(T, ZZ64)".
- **The join device of the range factories.**
  - `opr #[\I extends AnyIntegral\](lo:I, ex:I) = sized1Range(0 asif ZZ32,lo,ex)` (`fss:3888`, and the 19 siblings through `:3964`). The comment says "Helpers for # to get the type instantiation "right". We pass in bogus ZZ32's to ensure that the result type is at least ZZ32." (`RangeInternals.fss:1420-1421`, again at `:1431-1432`).
  - **[measured]** on the flat tower under walk:
    - `l#3` gives `5, 6, 7 : Long`, and so do `l#widen(3)` and `l:widen(7)`;
    - `0#l` with `l: ZZ64 = 5` gives `0 … 4 : Int`;
    - `u#unsigned(3)` gives `5 : NN32`, then `6 : Long`, `7 : Long`;
    - `big(1)#3` gives `BigNum`s (`BwR*.walk.txt`).
  - By reading, the element that changes type is the `i += 1` on an `i : I := l` in `CompactFullSeqScalarRange.generate` and `.loop` (`RangeInternals.fss:1069-1073`, `:1077-1081`).

## 7. microGPT's two programs [read; gate record]

The programs are `explorations/run-c4/src/` and `explorations/apl/mg/`; the APL port is the one the gate's `microgpt-phase.md` measures.

### 7.1 Where a numeral meets a non-`ZZ32` type or a generic call

- **Untyped top-level tuples.** `(nEmbd, …, bosId) = (16, …, 26)` and `(epsilon, lr0, beta1, beta2, epsilon_A, nSteps) = (10.0^(-5), 0.01, 0.85, 0.99, 10.0^(-8), 1000)` (`MicroGptFlat.fss:17-18`; APL twin `MicroGptApl.fss:26-27`).
  - Walk binds `Int` and `FloatLiteral`. The checker binds `IntLiteral` and `FloatLiteral` (**[measured]** `BNumeralKindsCk`: `hd = 4` is `IntLiteral`, `b1 = 0.85` is `FloatLiteral`).
  - Row 175 records the walk half as "each with its literal's type (ZZ32, RR64)".
- **A float numeral times an integer:**
  - `SQRT (1.0 headDim)` (`MicroGptFlat.fss:59`, `:66`), which the APL grammar writes as `SQRT (1.0 (l))` (`AplMgSyntax.fsi:232`);
  - `1.0 s` (`MicroGptFlat.fss:82`; `MicroGptApl.fss:112`);
  - `1.0 corpus.length(d)` (`MicroGptFlatCheck.fss:38`, `:72`; APL `:40`, `:74`).
  - These need `RR64`'s coercion from `ZZ32` (one library `fsi:290`). **[measured]** Both paths give `RR64`/`Float`. The compiler library has no such coercion (row 442).
- **An integer numeral minus a float:** `1 - beta1`, `1 - beta2`, `1 - beta1^t` (`MicroGptFlat.fss:77-79`); the APL `(1-B1)` expands to `(1) - (B1)` (`MicroGptApl.fss:106`; `AplMgSyntax.fsi:246`). **[measured]** Both paths give `RR64`.
- **An `RR64` over an integer:** `(1.0 s) / nSteps` (`:82`). Here `nSteps` is `IntLiteral` on the checker and `Int` under walk.
- **A numeral against `ZZ64`:** `(nanoTime() - t0) DIV 1000000` (`MicroGptFlat.fss:95`; checks `:59`, `:65`, `:95`; APL `:124`). **[measured]** Both paths give `ZZ64`/`Long`.
- **Float numerals against arrays, through `FlatArrays`' non-generic-in-element operators:** `0.0 MAX m0` and `m0 > 0.0` (`MicroGptFlat.fss:60`, `:64`). The APL grammar writes the float where APL has `0`: `0 ⌈ r` becomes `0.0 MAX (r)` and `m > 0` becomes `(m) > 0.0` (`AplMgSyntax.fsi:219-225`). "every numeral is the host literal it is written as, so that an index stays ZZ32 and a real stays RR64" (`:440-441`).
- **Ranges** are all numeral or `ZZ32`: `0#i` (`MicroGptFlat.fss:43`), `seq(0#5)` (`:91`), and in `FlatArrays.fss` and `FlatData.fss`, `0#np`, `0#n`, `seq(0#cnt)` and so on. **[measured]** On the checker `0#3` is `CompactFullRange[\IntLiteral\]`, so a loop variable over a numeral range is statically `IntLiteral`.
- **Big operators with a static argument written:**
  - `SUM[\ZZ32\][j <- 0#i] matCount(j)` (`MicroGptFlat.fss:43`; `MicroGptApl.fss:59`);
  - `SUM[\ZZ32\][m <- ms] |m|` (`FlatArrays.fss:181`; `apl/mg/FlatArrays2.fss:183`);
  - in the check programs, `SUM[\ZZ32\][i <- 0#nParams()] (if g0[i] = 0.0 then 1 else 0 end)` (`MicroGptFlatCheck.fss:56`; APL `:58`), whose numerals are the summed values;
  - `SUM[\RR64\][d <- 0#4] …` (`:72`; APL `:74`) and `BIG MAX[\RR64\][…]` (`:27`, `:36`, `:38`; APL `:29`, `:38`, `:40`).
  - The bare forms `SUM e`, `SUM vm` and `BIG MAX z` (`MicroGptFlat.fss:28`, `:52`; `MicroGptApl.fss:42`) take their element type from the argument.
- **Numeral-typed variables passed to generic (`nat`) functions with declared `ZZ32` parameters:**
  - C4: `heads(m, blockSize, nHead, headDim)` and `unheads(t, nHead)` (`MicroGptFlat.fss:54-55`, over `heads[\nat br, nat bc\](…, p: ZZ32, nh: ZZ32, k: ZZ32)`, `FlatArrays.fss:93`); `onehot(tg, vocabSize)`, `onehot(ids, vocabSize)` and `onehot(pos, blockSize)` (`:63`, `:70`, over `onehot[\nat k\](ks, width: ZZ32)`, `FlatArrays.fss:174`).
  - APL: `heads(m, Blk, Nh, Hd)` and `unheads(t, Nh)` (`MicroGptApl.fss:80-81`); the `1+⍳Blk` shape reaches `opr +[\I\](s: ZZ32, a: Array[\ZZ32,I\])` (`AplMg.fss:35`) with the numeral `1`.
  - On the checker these variables are `IntLiteral`. **[measured]** The analogue `scaleT(BoxT[\String\](2), 3)` passes against the one library by subtyping. **[record]** It is refused with the compiler library's `IntLiteral` (row 401).
- **No numeral in either program meets a type variable.** The generic-in-element declarations (`gather[\T extends Number, …\]`, `FlatArrays.fss:169`; `ravel`, `AplMg.fss:12`) have no numeral in their bodies.

### 7.2 Where each program stops on the compiled path today [record]

- `explorations/compile-ladder/climb-batch-6b/gate/ladder/microgpt-phase.md`: all 18 files stop at **disambiguate**.
  - C4 (7 files): `Array` in `FlatArrays.fsi`, `FlatArrays.fss`, `FlatData.fsi` and `MicroGptFlat.fsi`; `Char` in `FlatData.fss`; `ImmutableArray` in `MicroGptFlat.fss` and `MicroGptFlatCheck.fss`.
  - APL (11 files): `Char` in `AplMgSyntax.fsi`, `AplMgSyntax.fss`, `FlatData2.fss` and `MicroGptApl.fss`; `Array` in `FlatArrays2.fsi`, `FlatArrays2.fss`, `FlatData2.fsi` and `MicroGptApl.fsi`; `Vector` in `AplMg.fsi` and `AplMg.fss`; `ImmutableArray` in `MicroGptAplCheck.fss`.
  - Total: `Array` 8, `Char` 5, `ImmutableArray` 3, `Vector` 2, as `open-items-2026-09-26.md` § B3 counts them.
- Under walk both check programs pass 40 of 40 (PLAN "Where we stand"; FACTS "The one library's number tower is flat").

## 8. How the three interact: observations, with their sources

- **The inference ignores coercion; what counts as a subtype decides instead.**
  - The checker's constraint is "argType <: domain" (`STypesUtil.scala:936`), and walk's is `unify` (`EvaluatorBase.java:171-176`).
  - So a numeral argument fixes `T` to the numeral's own type: `IntLiteral` on the checker (`idt(3)`, `pick(3, 4)`) and `Int` under walk.
  - A `ZZ32` bound or `F`-bound is met only through `IntLiteral <: ZZ32` in the one library. The ancestor heuristic finds it (`Formula.scala:528-541`; `inc(5)`, `twice(3, 4)` both `ZZ32`, **[measured]**).
- **The same subtyping masks row 401 on the one library.** A numeral passes to a declared `ZZ32` parameter of a generic by subtyping (**[measured]** `a06`). The compiler library's `IntLiteral` is not a `ZZ32`, so there the same call is refused (**[record]** row 401).
  - By reading: a numeral type that is no longer a subtype of `ZZ32` reaches every such call through `checkApplicableWithInference`. That covers §7.1's `heads`, `unheads`, `onehot` and the APL `+`, and the range factories' `0#3` shape.
- **Mixed widths.**
  - Walk joins to `AnyIntegral` (**[measured]** I1, I2), and the checker unions to `OR(ZZ64, …)` (**[measured]** `twice`, `pick`, ranges). Neither consults the coercions between the widths.
  - Where the bound excludes a union or `AnyIntegral` the call fails on both paths. Where it does not (`pick`, `opr #[\I extends AnyIntegral\]`) the checker accepts a union static argument.
  - The non-generic operator path does promote by coercion resolution: `u + 1` is `ZZ64` on both (**[measured]**).
  - Answer 8's promotion rule is the specification's placeholder for the generic case (`basic-integers.tex:61-65`).
- **The expected type.**
  - The specification lists the typed binding, the declared return and the enclosing expression as coercion contexts (`conversions-coercions.tex:115-127`). It says static arguments are inferred "from the context of the function call" (`var-ref.tex:39`).
  - The checker threads the expected type into inference (`STypesUtil.scala:939-940`) but loses it for `f(x)` (`Operators.scala:89-90`). It keeps it for methods and operators, where it can refuse a numeral that the binding would have converted (**[measured]** `m03`, `m04`, `m05`).
  - Walk has none; the typed binding converts after the call (**[measured]** I5-I7).
- **A numeral inside generic code never becomes `T` by coercion.** The specification: a type parameter has no coercions (`conversions-coercions.tex:363-365`). The checker: no coercion to a non-trait (`CoercionOracle.scala:92`, `:154`). Walk converts on the run-time value, so its result can have a type the declaration does not state (**[measured]** `inc(u)` gives `Long`).
  - Only the element-in-hand getters (`x.one`) and the witness `typecase` produce a `T` on both walk and the checker (**[measured]**).
  - The witness's `cast` branch values fail on the compiled run (row 426). `cast` and `asif` do not convert (**[measured]**).
- **Unconstrained parameters.**
  - The checker gives `BottomType` when the parameter has a bound, and "without context" when it has none (**[measured]** `BBottomCk`). The compile path gives every empty `extends` clause the bound `Object` (row 412), so it takes the `Bottom` branch (rows 425, 447).
  - Walk gives `BOTTOM` (`EvaluatorBase.java:245`; row 424). The specification's only word is the open question at `inference.tex:24-25`.

## 9. Ledger rows (`explorations/fortress-gap-ledger.md`) by defect kind

A row's state is its status column plus what its notes say; "XXX" names the expected-failure test that gates it. A row that fits two kinds is listed once, under its first.

### 9.1 A static argument not inferred, or inferred as `Bottom`, `Any`, `Object`, a union or a run-time class

- 20: the aggregate element type comes from the run-time class (`<|1.0,1.0|>` is `List[\FloatLiteral\]`) and the join was never written. Open.
- 21: static arguments of a generic method are not inferred under walk (a size, a type and a `bool` alike). The rung R skeptic adds that neither path uses a declared type as context. Open for walk; the compiled checker infers methods.
- 23: walk does not unify a `nat` parameter with a run-time-built array. Open.
- 49: the element type of an untyped array literal is not inferred ("the element-type join was intended and never written"). Open; XXX `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss`.
- 83: `nat`-generic functions mis-unify on a second instantiation through an api. CONTESTED; no reproducer.
- 96: the join of two `nat` instantiations fails in a comprehension ("have no common supertype"). Open.
- 102: `BIG MAX g` finds no overload for `Generator[\RR64\]` because `RR64` was `StandardMax[\Number\]` only. Open as recorded on the nested tower; not re-measured on the flat one.
- 135: `BIG UNION` binds `BOTTOM` unless its static arguments are written. Open; the workaround of writing them is applied across the library since rung F.
- 156: a `nat`-generic function passed as a value has no type (`… of type null`), the checker's "generic higher-order function" TODO. Open.
- 307: the checker's `makeInferenceArg` did `NI.nyi()` for `nat` and `int`. Fixed for `nat`/`int` by batch 4 rung N; open for `bool`, `dim`, `unit` and run-time-made sizes.
- 364: walk infers a generic object's static argument from the argument's run-time class (`Cell[\Int\]`, compiled `Cell[\IntLiteral\]`). Open; XXX `ProjectFortress/tests/XXXInferredStaticArgRungS.fss` (the string case only).
- 400: an arm whose size cannot be inferred was dropped from compiled static resolution. Compiled half fixed in batch 6 rung R (`d65892d34`); XXX `XXXNatUnknownSizeArm`, `XXXNatUnknownSizeVal`, `XXXNatUnknownSizeFnValue`.
- 410: the checker dropped a size parameter from a generic arrow. Fixed (`3f297441c`).
- 424: walk binds `BOTTOM` for a no-argument generic call (unwritten clause-form `SUM`/`PROD`). Open; XXX `ProjectFortress/tests/XXXUnwrittenSumRungF.fss`.
- 425: the checker binds `BOTTOM` for a generic big operator's no-argument form. Open (a checker project).
- 432: walk takes a list literal's element type from the run-time class `Int`, so `SUM <|1, 2, 3|>` fails the F-bound on the flat tower. Open (named for answer 8's promotion rule or walk's inference).
- 446: a size nothing at the call fixes compiles, and both paths dispatch to the unsized arm. Open; three candidates are Pavol's.
- 447: a type parameter only in the return type is bound to `BottomType` by the compiled checker, and the run dies at class load. Open. **[measured]** Against the one library an unbounded parameter gives "without context" instead (§3.2).

### 9.2 A coercion not applied, applied on one path only, or impossible because the target is a type parameter

- 19: coercion declarations were ignored. Closed for walk by batch 4 rung C (`b628871a2`); the compiled path had them.
- 51: `matrix[\T,n,m\](v)` writes an integer `0` off the diagonal. Open; row 437 is its flat-tower form.
- 146: a `ZZ64` bound to a numeral held a `ZZ32`. Fixed at the typed binding by `d846e3644` (rung F); the declared-return position is open under 387.
- 318: the compiler library's `IntLiteral` arithmetic family suppresses the coercion to `ZZ32`/`ZZ64`. Repaired for four of the family; the rest open.
- 340: a `typecase` body whose value needs the `IntLiteral`-to-`ZZ32` coercion crashes code generation, while walk runs it. Open.
- 381: `ZZ32 LSHIFT` a `ZZ64` count takes `ZZ32`'s method under walk and `ZZ64`'s, by coercion, compiled. Open (home 3).
- 387: walk does not convert a body with a declared return type. Open; XXX `ProjectFortress/tests/XXXCoercionReturnRungC.fss`.
- 388: on both paths, a generic function's parameter of a declared type is not converted, extended to a `T` fixed by another argument. Open; XXX `ProjectFortress/tests/XXXCoercionGenericFnRungC.fss` and `ProjectFortress/compiler_tests/XXXCoercionGenericFnCompiledRungC.test`. **[measured]** A numeral reaches it too: `scale64(…, 3)`, `scaleR(…, 3)`.
- 389: walk does not apply a generic trait's coercion. Open; XXX `ProjectFortress/tests/XXXCoercionGenericTraitRungC.fss`.
- 390: on the compiled path, an overload set applicable with and without coercion dies with `NoSuchMethodError`. Open; XXX `ProjectFortress/compiler_tests/XXXCoercionAnyOverloadRungC.fss`.
- 391: on the compiled path, two coercion-only overloads with no most specific compile and pick one, where walk says "Ambiguous coercion". Open (no gated test, since the answer is a static error).
- 392: a type ascription coerces on the compiled path, where the specification forbids it and walk refuses. Open (no gated test).
- 394: the specification's own ZZ32/ZZ64/ZZ128 coercion example is refused by both paths. Open (a specification defect).
- 395: walk does not convert an overloaded function's tuple-typed parameter or a tuple field assignment. Open; XXX `ProjectFortress/tests/XXXCoercionTupleOverloadRungC.fss`.
- 401: a compiled generic call with inferred static arguments refuses a numeral for a declared `ZZ32` parameter. Open; XXX `ProjectFortress/compiler_tests/XXXNatLitArgChecker.fss`. **[measured]** Not reproduced against the one library, where `IntLiteral <: ZZ32`.
- 436: under walk an empty `SUM` over a non-number group gets the witness's integer `0` where a `T` is needed. Open; XXX `ProjectFortress/tests/XXXEmptyGroupSumRungF.fss`.
- 437: `matrix(v)` for `NN32`/`NN64`: the body's numeral `0` reaches `T` only by a coercion from `ZZ32` that they do not declare. Open.
- 442: the compiler library has none of the revised chapters' conversions (`ZZ32` and numerals into `RR64`, `NN32` into `ZZ64`, …). Open; closed by the switch-over as the row says.
- 443: walk does not convert an integer numeral outside `ZZ32` into `RR64`. Open; an XXX walk test is owed. **[measured]** "RHS expression type Long is not assignable to LHS type RR64".

### 9.3 A numeral typed (or represented) differently on the two paths

- 79: `typecase` on a numeral gives a different answer compiled (`IntLiteral`) than under walk (`ZZ32`), and the same split reaches overload dispatch (rung R). Open; no gated test, "pending Pavol's reconciliation", which is now decided (POSITIONS 2026-09-27, "a numeral's type").
- 80: `case x of <int literal>` threw compiled from the stubbed `IntLiteral` comparisons. Fixed `54861b62a`.
- 317: the code generator wrapped a numeral of bit length 32 or 64 negative. Repaired by R2 (`6a63980b`).
- 325: a numeral outside a bounded type is a run-time error compiled and a static one by the specification; walk refuses on type (`Long`). Open. **[measured]** Against the one library the checker also accepts `a: ZZ32 = 3000000000`.
- 327: `ChooseTest3.fss:125` coerces a numeral beyond `ZZ32` at `ZZ32` against a `ZZ32` `j`. Open (a test file with no gate).
- 328: `IntLiteral` comparison is done at `ZZ64` compiled and throws beyond it, where walk answers. Open.
- 338: walk refuses `d: ZZ32 = -2147483648` (`Long`), which the compiled path accepts. Open.
- 364: see 9.1 (`Cell[\Int\]` against `Cell[\IntLiteral\]`).
- 432: see 9.1 (walk's `Int` element type).
- 443: see 9.2 (walk's `Long` for `3000000000`).

### 9.4 Adjacent rows, outside the three kinds, named so they are not missed

- 175: POSITIVE-VERIFIED: untyped bindings take "their literal's type (`ZZ32`, `RR64`)" under walk; the checker gives `IntLiteral`/`FloatLiteral` (**[measured]**).
- 295: an element-generic operator over `Number` took an integer into an `RR64` slot before rung F and refuses it now (row 388).
- 360: a radix-point numeral is rounded as a double on both paths, not as the rational it denotes.
- 361: walk throws `NumberFormatException` on `2.5_10`.
- 362: the compiled path throws `NullPointerException` rendering a float numeral.
- 412: the compile path gives every empty `extends` clause the bound `Object`, which decides between `Bottom` and "without context" (§3.2).
- 426: the compiled `cast[\T\]` never matches; it is the witness device's conversion.
- 435: `RR32`'s natives die on any other number.
- 449: `HeapShakedown`'s `Ratio` reaches an `asif RR64` because walk does not check a declared return type.
- Not in the ledger:
  - The generic object referenced without its static arguments (FACTS "A generic object referenced without its static arguments …"; its consequence is row 331).
  - **[measured, no row found by grep]** A numeral into `NN32`, `NN64` or `RR32` at a typed binding is refused on both paths against the one library, where `literals.tex:146-148` has the libraries define coercions from numerals to integers.
  - **[measured]** The checker drops the expected type at `f(x)` but uses it at methods and operators.
  - **[measured]** Walk's ranges change element type: `0#l` gives `Int`, and `u#unsigned(3)` gives `NN32` then `Long`.

## 10. Probe inventory

Everything is under `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/coordinator-plan/probes-B/`. The first line of each capture records the date, tree, load and JDK. `FORTRESS_THREADS=1`.

- **Drivers.**
  - `walk.sh <Name>` runs `bin/fortress` with a private cache and writes `<Name>.walk.txt`.
  - `check.sh <Name>` runs the checker with the one library through `CheckDriver` and the shadow `StaticChecker`, with `-Dprobe.dropApiErrors`. It writes `<Name>.check.txt`, and the full log to `work/check-<Name>.full.txt`. `FortressLibrary`'s api shows 38 dropped errors in every run.
- **Generators.**
  - `make-walk-cases.py` writes the 25 `Bw{G,I,R}*.fss` cases: generic numeral, inference, ranges.
  - `make-dev-cases.py` writes the 7 `BwD*.fss` cases and `BDevCk.fss`: the devices.
  - `make-bind-cases.py` writes the 9 `BwB*.fss` cases and `BBindCk.fss`: typed bindings.
  - The case lists are `walk-cases.txt`, `dev-cases.txt` and `bind-cases.txt`.
- **Checker probes:** `BNumeralKindsCk`, `BGenCk`, `BGenCk2`, `BCtxCk`, `BCtxCk2`, `BRangeCk`, `BBottomCk` (with `e05` and `e06` appended in place before the kept run), `BDevCk` and `BBindCk`, each as `.fss` with its `.check.txt`.
- **Walk probe:** `BNumeralKinds.fss` with `.walk.txt`, plus the 41 `Bw*.walk.txt` captures.
- **Library scan:** `library-scan/scan.py` (run as `python3 scan.py /home/user/fortress`) and `library-scan/scan.out`.
- **Incidental:** my `shown(v: Any)` helper, taken from `ProjectFortress/tests/FlatTowerRungF.fss:6`, is refused by the checker ("Any has no getter called asString/ilkName", `BDevCk.check.txt`). So the checker probes reveal types through `String` bindings instead.
