# What the revival changed in the team's Fortress

The team left three forms of Fortress, which disagree in places:

- the specification;
- walk, with the interpreter's library;
- the compiled path, with the compiler's library.

This part lists each change of the revival made for one of two reasons: two of the team's sources contradict each other, or a program failed. Its headings are the points of `SKILL.md`, "Fortress as a language", that the changes qualify.

Each resolution is a decision of the curator. Where it changed the specification, Appendix I keeps the original text (`specification.md`). The Working Draft is the unrevised specification, in `Specification-1.0-frozen/`. `specification.md`, "Weighing the sources", describes the type group, whose later texts most resolutions follow.

If a source of the team's, an old note or your training disagrees with this skill, find the point below. If it is there, follow the skill: it describes the tree. If it is not, do as `SKILL.md`, "When to explore", says.

A note written before the revival, and your training, can be right about the team's walk and out of date here. Three examples: the number types form a tower, fixed-width arithmetic wraps, and walk converts no argument.

## Dispatch is on every argument, at run time

**Overloads that differ in static parameters**

- Original: the Working Draft forbids two declarations of one name whose static parameters differ, beside the team's note "This restriction will be relaxed." Neither implementation enforced it, and the checker implements the type group's 2011 paper (`Papers/Types/`), which allows them.
- Resolution: such overloads are allowed, and the specification states the paper's model.
- Reason: the implementations and the library already allow such overloads. Enforcing the sentence would refuse about 180 pairs of declarations in the library's apis.

**The return-type rule**

- Original: the type group's 2011 paper asks for the rule on every instance of a generic declaration. The checker tested one instance, so a pair that broke the rule compiled, and its run failed the JVM's verification.
- Resolution: the checker tests every instance.
- Reason: the paper's rule. Such a program now fails at compile time, not at run time.

**Walk's choice between a generic and a plain declaration**

- Original: the Working Draft chooses the most specific declaration by the declared parameter types. Walk chose by the order in which the declarations were written.
- Resolution: walk chooses by the declared types.
- Reason: the specification's rule. A program's answer no longer depends on the order of its declarations.

**`fill` and `tabulate`**

- Original: the interpreter's library declared two array methods named `fill`: one takes a value, one a function of the index. For an element type of `Any` or of a function type, both apply and neither is more specific. The checker refused the pair, and walk called a function meant as the value.
- Resolution: the function form is `tabulate` (`library.md`).
- Reason: a second name ends the ambiguity. Scala's `Array.fill` and `Array.tabulate` have the same two meanings.

## Traits and objects, no classes

**The exclusion rule**

- Original: the type group's papers and the checker have the exclusion rule. The Working Draft does not state it, and some of its examples break it.
- Resolution: the specification states the rule. It keeps the examples that break it, marked "Not allowed".
- Reason: without it, the checker's return-type rule lets through programs that die with `IncompatibleClassChangeError`. The later Types chapter states the rule too.

**What a `comprises` clause says**

- Original: four passages of the Working Draft read the clause as a statement about types, and so are false for some programs that it allows. The type group's later Types chapter reads the clause as a statement about values.
- Resolution: every value of the closed trait is a value of a listed type. A generic trait may extend the closed trait without being listed, if each type that extends it is below a listed type.
- Reason: read by values, the passages hold for those programs.

**A trait's `override`, and object expressions, under walk**

- Original: walk dropped an inherited declaration only where the object itself declared the `override`, so an object below a trait that overrides ran the overridden declaration. Its load check of the Meet Rule for Functional Methods (`Specification/advanced/overloading.tex`, "Meet Rule") skipped object expressions: anonymous objects written inside an expression, such as `object extends { A, B } end`.
- Resolution: a trait's `override` declarations override for every type below it. Walk reads what each trait provides by the rule of "What a type provides", below, as its load check does. Walk lifts each object expression to the top level as an object, which takes the static parameters of an enclosing generic function. It checks the lifted object as it checks an object, unless the object has static parameters: walk checks no generic object (ledger row 647). The checker still accepts an object expression that breaks the rule (ledger row 570).
- Reason: the traits chapter (`Specification/basic/traits.tex`, "Method Declarations"), and the Meet Rule, which names object expressions.

**What a type provides**

- Original: the traits chapter says that a type provides the method declarations it declares and inherits, and that it does not inherit one that its own `override` declaration overrides or whose parameter types its own declaration repeats. The compiled checker read every declaration of every supertype as provided, and refused the team's `ProjectFortress/tests/disp0.fss`, whose `override` widens a parameter.
- Resolution: both paths read what a type provides as the chapter says. The checker checks that the return type of an overriding declaration is a subtype of the return type of the declaration that it overrides.
- Reason: the specification's rule, which walk follows (above). The team's own test is valid by it.

**A string's `left` and `right`**

- Original: the interpreter's library declared `String`'s `left` and `right` `Maybe[\Char\]` but answered the character itself, so walk printed `a` for `"abc".left`. The specification is silent.
- Resolution: they answer `Just` of the character, and `Nothing` for the empty string, as `List`'s and the ranges' do.
- Reason: the declared type, which the checker enforced by refusing both bodies.

## Static parameters

**The bound of a type parameter that has none written**

- Original: the Working Draft bounds it by `Object`. The library instantiates its generic containers at tuples, such as arrays indexed by pairs, and `Object` holds no tuple.
- Resolution: the bound is `Any`. The compiled path departs from it until the switch-over (`compiler.md`, "Traps of the compiled path").
- Reason: the library works only with `Any`.

**A type parameter that a call does not fix**

- Original: the implementations gave it the empty type `Bottom`, or left it unsolved, and some such compiled calls failed the JVM's verification. The type group's POPL 2019 paper gives such a parameter its bound.
- Resolution: it takes its bound on both paths. Under walk, one whose bound names itself stays open (the next entry). Walk still gives `Bottom` to these:
  - a big operator's static parameters with a plain bound (ledger row 424);
  - a parameter declared with two bounds, neither below the other (ledger row 591);
  - a parameter that an argument bounds only from above, whose bound names another static parameter (ledger row 612);
  - a parameter that only the result of a function expression without a return type fixes (ledger row 587).
- Reason: the paper is the type group's latest word on the rule.

**A type parameter whose bound names itself, under walk**

- Original: walk gave such a parameter the empty type `Bottom` where a call did not fix it, as `SUM`'s `T extends AdditiveGroup[\T\]` in `SUM[i <- 1#100] i`. The reduction then refused its first element. The POPL 2019 paper's rule has no bound to give: such a bound is not a type until the parameter is known.
- Resolution: walk leaves the parameter open. Wherever walk checks a value against the open parameter, every value passes, so the reduction runs on the types of its elements. An empty reduction gives `ZZ32`'s identity, whatever the type of its elements (ledger row 645). `Set`'s `BIG UNION` and `BIG INTERSECTION` still stop, at `Set[\OPEN\]` (ledger row 662). A printed type shows the open parameter as `OPEN`: `BoxU[\OPEN\]` for an object `BoxU[\T\]`. The checker still refuses the call (ledger row 425).
- Reason: walk has no static types, so it cannot take the element type from the static type of the reduced expression, as the specification's desugaring does (`Specification/basic/expressions/reductions.tex`). An open parameter refuses no element.

**Sizes on the compiled path**

- Original: the Working Draft has the size parameters `nat` and `int`. The checker crashed on sized declarations, and a sized program did not compile or load. The team's code generator had reserved a slot for a size's run-time descriptor.
- Resolution: the checker checks sizes, and the slot holds the size's descriptor (`SKILL.md`, "The compiled run time").
- Reason: it completes the team's design, which carries a size as it carries a type argument.

## Numbers are siblings, not a tower

**Tower or siblings**

- Original: the interpreter's library nested the number types: `ZZ32` extended `ZZ64`, which extended `ZZ`. The compiler's library had them as siblings. The tower breaks the exclusion rule: `ZZ32` was an `Integral[\ZZ32\]` and, through `ZZ64`, an `Integral[\ZZ64\]`.
- Resolution: the library makes them siblings, as the compiler's library does.
- Reason: the exclusion rule stays (above), so the tower cannot.

**Conversion under walk**

- Original: the Working Draft converts a call's arguments by coercion when that makes the call apply, and the checker does so. Walk converted nothing: its dispatch code held the team's note "TODO add checks for COERCE".
- Resolution: walk converts by coercion at a call, a typed binding and an assignment. `interpreter.md` says how it chooses the coercion.
- Reason: the specification's rule, which the siblings need for every mix of widths.

**Mixed number types in a generic call**

- Original: neither implementation inferred a static argument through a conversion, and the Working Draft's chapter on inference is a heading and two notes. The tower needed no conversion there: a `ZZ32` was a `ZZ64`.
- Resolution: if the arguments of one type parameter mix number types, it takes the narrowest type into which all of them convert. For a `ZZ32` and a `ZZ64` that is `ZZ64`, and for a `ZZ32` and an `NN32` too.
- Reason: among siblings, only a conversion joins two widths.

**Overflow**

- Original: the Working Draft and the compiled path raise `IntegerOverflow` when a fixed-width result does not fit. Walk wrapped the result.
- Resolution: walk raises `IntegerOverflow` too. Code that means to wrap uses the specification's wrapping operators (`library.md`).
- Reason: the specification and the compiled path already agreed.

**Ranges**

- Original: the interpreter's ranges took any integer type. The compiler's library had ranges over `ZZ32` only.
- Resolution: ranges are over `ZZ32` only (`library.md`).
- Reason: a range counts the indices of an array, and a JVM array index is a 32-bit `int`.

**Bounded ranges of rank 2 and 3**

- Original: the interpreter's library named a bounded range of rank 1, `BoundedScalarRange`, and none of rank 2 or 3, whose indices are pairs or triples of `ZZ32`. Its generic range traits, such as `RangeWithExtent[\I\]` in `Library/FortressLibrary.fsi`, compared indices of their type parameter, which declares no comparison. `|#(0,3)|` was 1, and walk stopped on `((0,0)#).every(-1,-1)`.
- Resolution: `BoundedRange2D` and `BoundedRange3D` name them. The range types over `ZZ32` of each rank, in `Library/RangeInternals.fsi`, declare the comparisons `CMP` and `FORWARD_CMP`, and the generic range traits declare them abstract. `#(0,n)` is empty, and a range made by a prefix `#` is declared a `RangeWithExtent`.
- Reason: the checker refused the ranges' declarations at 36 sites, and walk stopped or answered a wrong size. The library's range types of rank 1 gave the design.

**`SUM` and `PROD`**

- Original: `SUM` and `PROD` reduced over `Number`, under the team's comment "Hack to permit any Number to work non-parametrically". Every sum had the type `Number`, and an empty sum of `RR64` values was the integer 0.
- Resolution: each is one generic declaration over the element type's own algebra, which gives its zero or one at that type (`library.md`).
- Reason: `Number`'s operators for any number went with the tower, so each reduction uses the element type's own operator.

**Rounding a rational at an infinity**

- Original: the Working Draft types `QQ`'s `floor`, `ceiling`, `round` and `truncate` ℤ, and its next sentence says they return the argument at +∞, −∞ and 0/0, a rational. The interpreter's library returned the argument, and its `round` stopped walk there.
- Resolution: these methods and the brackets ⌊ ⌋ and ⌈ ⌉ throw `DivisionByZero` at those three values.
- Reason: the curator kept the declared integer result. A division by zero whose result is an integer throws `DivisionByZero` (`opr-overview.tex`).

## Loops and reductions are library code

**The lifted type of a reduction without an identity**

- Original: the interpreter's library lifted the reductions without an identity, such as `BIG MIN`, `BIG MAX` and `BIG //`, to the type `AnyMaybe`, which takes no type argument. Their `simpleJoin` took and answered `Any`, and their `lift` took `Any`, while the api declared `lift(r:R)`. The team's tests declared their own such reductions with `simpleJoin` at `Any`, and passed `AnyMaybe` to `generate`.
- Resolution: `AssociativeReduction[\R\]` lifts to `Maybe[\R\]`. Its `simpleJoin` takes and answers `R`, and every `lift` takes `R`. A reduction that extends it declares `simpleJoin` at its element type. Under walk, one declared at `Any` or with untyped parameters leaves the abstract `simpleJoin` without a body, and the reduction stops. A static argument that names the lifted type is `Maybe[\R\]`, as in `h.generate[\Maybe[\(ZZ32,ZZ32,ZZ32)\]\](TestReduction, sing)`.
- Reason: the checker refused the `Any` devices at 13 places in the library, and `if av <- a` cannot bind from `AnyMaybe`, which is not a `Condition`. The api and `Set`'s `Intersection` already wrote these types. The devices had kept walk's reductions running while walk gave an unwritten static argument `Bottom`, which it no longer does.

## Specified, but not built

**A parameter whose type is left out**

- Original: the components chapter (`Specification/basic/components/type-inference.tex`) says that type inference finds every type that a component leaves out. The compiled checker refused a top-level function's or a method's parameter written without a type, and crashed on a local function's. Walk runs such declarations, except a method that implements an abstract declaration, which stops at its first call (ledger row 405).
- Resolution: the compiled path refuses every such parameter of a top-level function, a method or a local function, with "Missing parameter type for" and the parameter's name. A `\revision` box in that file and Appendix I say so.
- Reason: no text describes that inference. A crash of the checker is no answer, and the refusal already stood at top level.
