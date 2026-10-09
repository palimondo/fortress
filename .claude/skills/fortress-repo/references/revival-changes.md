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
- Resolution: a trait's `override` declarations override for every type below it. Walk reads what each trait provides by the rule of "What a type provides", below, as its load check does. Walk lifts each object expression to the top level as an object, which takes the static parameters of an enclosing generic function. It checks the lifted object as it checks an object. Walk checks a trait, object or lifted object with static parameters through a stand-in: one type for all its instances, with a symbolic type for each static parameter (`symbolicInstance` in `interpreter/evaluator/BuildEnvironments.java`). It does not check a pair of declarations whose parameter types mention a symbolic type. Walk makes no stand-in, and so no Meet Rule check, for a declaration with an `opr` static parameter, or where it cannot make the type. The checker still accepts an object expression that breaks the rule (ledger row 570).
- Reason: the traits chapter (`Specification/basic/traits.tex`, "Method Declarations"), and the Meet Rule, which names object expressions.

**An abstract method without a body, and an `override` that overrides nothing, under walk**

- Original: the traits chapter makes both static errors. An `override` overrides an inherited declaration only if the inherited parameter type is a strict subtype of its own, so an `override` at equal parameter types overrides nothing. Walk loaded both: a call of the abstract method stopped with an `InterpreterBug`, "has neither body nor def", and the `override` ran. The compiled checker refuses the first and accepts the second (ledger row 653).
- Resolution: walk refuses the abstract method without a body at load in an object or an object expression without static parameters. It refuses at load an `override` that overrides nothing in every trait, object and object expression, also one at the inherited declaration's own parameter types. It checks a declaration with static parameters once, at its declaration, through the stand-in of "A trait's `override`, and object expressions, under walk". There it does not refuse one over an inherited declaration at a static parameter whose bounds it does not read: an object expression's, whose static parameters walk's rewrite lifts without the `where` clauses around them, or one under an `extends` clause's `where` clause (ledger row 693). An instance of a generic trait above a declared object is also checked, as before, at its static arguments, where equal parameter types count as overridden. So an instance that makes the two parameter types equal is not refused. A declaration with a body of the method's name, whose parameter types are the abstract declaration's or below them, counts as defining the abstract method (ledger row 666). This allowance departs from the chapter, which asks an object to define a body for the abstract method itself. A call outside the narrower types still stops walk with "has neither body nor def" (ledger rows 668 and 669). Walk makes no abstract-method check on a generic object (ledger row 665).
- Reason: the chapter's rules. Counting a body at narrower parameter types keeps the library loading: its `Pairs` component's `SingleRange` defines `RunRanges`'s abstract `BOXPLUS` only at the two types that `RunRanges`'s `comprises` clause lists. From their source, `QuickCheck`'s generators (ledger row 669) and `Random`'s `MersenneTwisterInit` (ledger row 668) need it too: each provides a body for an abstract method of a trait above it only at a narrower parameter type.

**What a type provides**

- Original: the traits chapter says that a type provides the method declarations it declares and inherits, and that it does not inherit one that its own `override` declaration overrides or whose parameter types its own declaration repeats. The compiled checker read every declaration of every supertype as provided, and refused the team's `ProjectFortress/tests/disp0.fss`, whose `override` widens a parameter.
- Resolution: both paths read what a type provides as the chapter says. The checker checks that the return type of an overriding declaration is a subtype of the return type of the declaration that it overrides.
- Reason: the specification's rule, which walk follows (above). The team's own test is valid by it.

**A string's `left` and `right`**

- Original: the interpreter's library declared `String`'s getters `left` and `right`, its first and last characters, as `Maybe[\Char\]`, but answered the character itself, so walk printed `a` for `"abc".left`. The specification is silent.
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
- Resolution: walk leaves the parameter open. Wherever walk checks a value against the open parameter, every value passes, so the reduction runs on the types of its elements. An empty reduction gives `ZZ32`'s identity, whatever the type of its elements (ledger row 645). A generic type that holds the open parameter admits no more than it admits at `Bottom`. So `Set`'s `BIG UNION` and `BIG INTERSECTION` still stop at their first element, which `Set[\OPEN\]` does not admit (ledger row 662). A printed type shows the open parameter as `OPEN`: `BoxU[\OPEN\]` for an object `BoxU[\T\]`. The checker still refuses the call (ledger row 425).
- Reason: walk has no static types, so it cannot take the element type from the static type of the reduced expression, as the specification's desugaring does (`Specification/basic/expressions/reductions.tex`). An open parameter refuses no element.

**Sizes on the compiled path**

- Original: the Working Draft has the size parameters `nat` and `int`. The checker crashed on sized declarations, and a sized program did not compile or load. The team's code generator had reserved a slot for a size's run-time descriptor.
- Resolution: the checker checks sizes, and the slot holds the size's descriptor (`SKILL.md`, "The compiled run time").
- Reason: it completes the team's design, which carries a size as it carries a type argument.

**Arithmetic in a size**

- Original: the Working Draft allows a sum, a difference, a product or a power as a size, and fixes its value once the static parameters are known, but does not say when two such sizes are the same. The checker refused any arithmetic in a size, and counted a static parameter as different from every numeral. The compiled path spelled the expression into the class's name.
- Resolution: two sizes are the same when they are written alike once each operation on numerals is computed: `2 3` is `6`, and `s0 s1` is not `s1 s0`. A static parameter, or an expression with one in it, is not known to differ from a numeral, so the `N[\0\]` arm of a `typecase` on `N[\b0\]` is reachable. The checker checks a computed size against its parameter's kind, as it checks a numeral. The compiled path computes a size when it names a class, so `Box[\2 + 1\]` and `Box[\3\]` are one class; the class loader does not check a size it computes (ledger row 675). Walk computes a sum, a difference and a product, and stops on a power (ledger row 676).
- Reason: the library writes a product in the storage of its matrices and sums in result types. The team's questions and answers in the specification refuse `T[\n+1\]` beside `T[\0\]`.

**A size known only at run time**

- Original: `NatReflect`'s `reflect` answers a `NatParam`. The team's clause `comprises { N[\n\] } where [\ nat n \]` was a comment, with the reading that a `NatParam` passed where `N[\n\]` is expected makes `n` a static parameter. The checker refused every such call in the library; walk ran them, binding the size at dispatch.
- Resolution: the clause is restored, and the specification allows a where-clause variable in a listed type. A value of such a trait, passed where the listed type is expected, binds the call's `nat` parameter to the value's own size, a size equal only to itself: two values passed in one call have two sizes, and the size does not reach a type that names another. Walk loads the clause and binds the size at dispatch, as before. The compiled run waits for the switch-over (`compiler_tests/XXXNatOpenRun`).
- Reason: the team's comment, and the library's run-time factories, which pass `reflect`'s value to functions that take `N[\n\]`.

**Comparing pairs and triples**

- Original: the interpreter's library compared pairs and triples lexicographically with `<`, `<=`, `>`, `>=` and `CMP` over element types with no bound, under the team's comment "Shouldn't these operators have to extend something? A,B,C?". Walk compared an element only when the elements before it were equal, so `((1,2),3) < ((1,3),0)` and `(1,()) < (2,())` were `true`. A pair whose first elements were unordered, such as a NaN against a float, stopped walk.
- Resolution: each element type extends `StandardPartialOrder`, and walk refuses a pair or triple with an element of another type at the call, whatever the elements before it decide. Walk also refuses a pair whose elements at one position are numbers of two run-time types, such as `(1,2) < (1,2.5)`, which it answered `true`: it takes the element type at their join, which is no partial order (ledger row 511). A pair or triple whose deciding elements are unordered answers `false` to `<`, `<=`, `>` and `>=`, and `Unordered` to `CMP`. `Reflect`'s `members` is a list in the order the type declares its members, not a set sorted by name. This is the default of Q43 (way 1b) in `explorations/coordinator/CLIMB-BATCH-13.md`, which the curator has not answered.
- Reason: the checker refused the ten operators' bodies at 17 sites. The team bounded the range points' comparisons `PCMP` and `SCMP` per element in 2008, and `false` is what `RR64`'s own comparisons answer for a NaN.

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

**Checking a range of rank 2 or 3 against bounds**

- Original: the interpreter's library checked a range against an array's bounds (`narrowToRange`, through `checkSelection`) with its index type's `<` and `>`, which compare pairs and triples lexicographically. `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` answered `(2,0):(5,5)` and raised no `IndexOutOfBounds`, so an array's range subscript of rank 2 or 3 with a corner outside the bounds on an axis after the first was cut to the bounds, and a subarray read past them.
- Resolution: the check compares corner by corner, by the ranges' own point order `PCMP`, under which one point is below another only if it is below or equal on every axis. The call above raises `IndexOutOfBounds`, as do such subscripts and subarrays. The check is one function for each rank, `checkSelection`, `checkSelection2D` and `checkSelection3D` in `Library/RangeInternals.fss`, and `narrowToRange`'s bodies are declared at the range types over `ZZ32` of each rank.
- Reason: the curator's answer to Q50 in `explorations/coordinator/CLIMB-BATCH-12.md`. The lexicographic order serves sorting, and a corner outside the bounds on any axis is outside them.

**The trivial open range `(:)`**

- Original: `(:)` is a range over `Any`. The interpreter's library gave its `truncL`, `truncR`, `every`, `imposeStride` and `atMost` bodies that answer ranges over `ZZ32`: `(:).truncL(3)` was `3#`.
- Resolution: the five throw `FailCalled`, through the library's `fail`, with a message that names `(:)`, and so do `(:):s` and `(:)#n`, which call two of them. `(:)` as a whole subscript, `a[:]`, is unchanged. This is the default of Q49 in `explorations/coordinator/CLIMB-BATCH-12.md`, which the curator has not answered.
- Reason: each of the five declared types is a range over `Any`. Generics are invariant, so the old bodies' ranges over `ZZ32` broke those types, and the checker refused them.

**`SUM` and `PROD`**

- Original: `SUM` and `PROD` reduced over `Number`, under the team's comment "Hack to permit any Number to work non-parametrically". Every sum had the type `Number`, and an empty sum of `RR64` values was the integer 0.
- Resolution: each is one generic declaration over the element type's own algebra, which gives its zero or one at that type (`library.md`).
- Reason: `Number`'s operators for any number went with the tower, so each reduction uses the element type's own operator.

**Rounding a rational at an infinity or 0/0**

- Original: the Working Draft (`Specification-1.0-frozen/basic-lib/numbers.tex`, "Rational Numbers") gives `QQ`'s `floor`, `ceiling`, `round` and `truncate` the result type ℤ, and a later paragraph of that section says they return the argument at +∞, −∞ and 0/0, a rational. The interpreter's library returned the argument, and its `round` stopped walk there.
- Resolution: these methods and the brackets ⌊ ⌋ and ⌈ ⌉ throw `DivisionByZero` at those three values.
- Reason: the curator kept the declared integer result. A division by zero whose result is an integer throws `DivisionByZero` (`Specification/basic/operators/opr-overview.tex`, "Multiplication, Division, Modulo, and Remainder Operators").

## Loops and reductions are library code

**The lifted type of a reduction without an identity**

- Original: the interpreter's library lifted the reductions without an identity, such as `BIG MIN`, `BIG MAX` and `BIG //`, to the type `AnyMaybe`, which takes no type argument. Such a reduction wraps each element in a `Just` with its `lift`, joins two wrapped elements by its `simpleJoin` of their contents, and answers `Nothing` for no element. Their `simpleJoin` took and answered `Any`, and their `lift` took `Any`, while `Library/FortressLibrary.fsi` declared `lift(r:R)`. The team's tests declared their own such reductions with `simpleJoin` at `Any`, and passed `AnyMaybe` to `generate` as its static argument.
- Resolution: `AssociativeReduction[\R\]` lifts to `Maybe[\R\]`. Its `simpleJoin` takes and answers `R`, and every `lift` takes `R`. A reduction that extends it declares `simpleJoin` at its element type. Under walk, one declared at `Any` or with untyped parameters leaves the abstract `simpleJoin` without a body: walk refuses such a reduction at load, and one with static parameters stops at its first join. A static argument that names the lifted type is `Maybe[\R\]`, as in `h.generate[\Maybe[\(ZZ32,ZZ32,ZZ32)\]\](TestReduction, sing)` in `ProjectFortress/tests/HeapTest.fss`.
- Reason: the checker refused the library's declarations at `Any` in 13 places, and `join`'s `if av <- a` cannot bind from `AnyMaybe`, which is not a `Condition`, a generator of zero or one element. `FortressLibrary.fsi` and `Set`'s `Intersection` already wrote these types. The declarations at `Any` had kept some of walk's reductions running while walk gave `Bottom` to a type parameter that a call did not fix. Walk now leaves such a parameter open only if its bound names itself. With a plain bound, it still gives `Bottom`, so `BIG SQCAP`, `BIG SQCUP` and `List`'s `BIG CONCAT` without static arguments stop at their first element (ledger row 424).

**A generator's size, the relational predicate and the default index-value pairs**

- Original: the interpreter's library declared no size on `Generator`, though three of its bodies read one, and the relational predicate read a size and indices from 0 off its target, a `Generator`. Under walk, `|g|` of a filter, a nest or a mapped filter stopped, and so did the relational predicate on a filter; on an array whose indices start above 0 it read outside the bounds. `Indexed`'s default `indexValuePairs` answered a mapped generator, printed `mapped(...)`, where an `Indexed` is declared. The checker refused the nine sites.
- Resolution: `Generator` has `opr |self|`, a default that counts the elements by running the generator, as `opr IN` searches them. A type with its own size keeps it. The relational predicate is one reduction in the natural order, as `Generator2`'s fused relational reduction is. The default pairs are an object over the indexed value, `SimpleIndexValuePairs`, which prints as its elements and is indexed as the value is; a slice of it keeps each pair's index. So two answers change under walk: the relational predicate on a reversed indexed value follows its natural order, and the default pairs of a value indexed from 5 are indexed from 5, not from 0. This is the default of item 45 in `explorations/coordinator/CLIMB-BATCH-13.md`, which the curator has not answered.
- Reason: the checker's refusals. A default keeps "only needs to define the generate method" true (`Specification/advanced/parallelism-locality/defining-generators.tex`). Counting consumes a consumable generator and never ends on an endless one, as every other derived default of `Generator` does.

## Specified, but not built

**A parameter whose type is left out**

- Original: the components chapter (`Specification/basic/components/type-inference.tex`) says that type inference finds every type that a component leaves out. The compiled checker refused a top-level function's or a method's parameter written without a type, and crashed on a local function's. Walk runs such declarations, except a method that implements an abstract declaration, which stops at its first call (ledger row 405).
- Resolution: the compiled path refuses every such parameter of a top-level function, a method or a local function, with "Missing parameter type for" and the parameter's name. A `\revision` box in that file and Appendix I say so.
- Reason: no text describes that inference. A crash of the checker is no answer, and the refusal already stood at top level.
