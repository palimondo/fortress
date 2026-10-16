# What the revival changed in the team's Fortress

The team left three forms of Fortress, which disagree in places:

- the specification;
- walk, with the interpreter's library;
- the compiled path, with the compiler's library.

This part lists each change of the revival made for one of two reasons: two of the team's sources contradict each other, or a program failed. Its headings are the points of `SKILL.md`, "Fortress as a language", that the changes qualify.

Each resolution is the rule of this tree. Follow it as you follow a decision of the curator, and question it only on new evidence (`SKILL.md`, "When to explore"). Where it changed the specification, Appendix I keeps the original text (`specification.md`). The Working Draft is the unrevised specification, in `Specification-1.0-frozen/`. `exploring.md`, "Weighing the sources", describes the type group, whose later texts most resolutions follow.

If a source of the team's, an old note or your training disagrees with this skill, find the point below. If it is there, follow the skill: it describes the tree. If it is not, do as `SKILL.md`, "When to explore", says.

A note written before the revival, and your training, can be right about the team's walk and out of date here. Three examples: the number types form a tower, fixed-width arithmetic wraps, and walk converts no argument.

## Dispatch is on every argument, at run time

**Overloads that differ in static parameters**

- Original: the Working Draft forbids two declarations of one name whose static parameters differ. The team's later restart of the specification drops it. Neither implementation enforced it, and the checker implements the type group's 2011 paper (`Papers/Types/`), which allows them.
- Resolution: such overloads are allowed, and the specification states the paper's model.
- Reason: the implementations and the library already allow such overloads. Enforcing the sentence would refuse about 180 pairs of declarations in the library's apis.

**The return-type rule**

- Original: the type group's 2011 paper asks for the rule on every instance of a generic declaration. The checker tested one instance, so a pair that broke the rule compiled, and its run failed the JVM's verification.
- Resolution: the checker tests every instance.
- Reason: the paper's rule. Such a program now fails at compile time, not at run time.

**Two functional methods with equivalent parameter types**

- Original: the No Duplicates Rule refuses two declarations of which each applies to every call that the other applies to (`Specification/advanced/overloading.tex`). The checker counted two functional methods as duplicates only where their `self` parameters stood at the same position. So, in a trait `S`, `f(self, y: S)` beside `f(x: S, self)` passed the checker, and the code generator stopped: "apparently malformed overload set not rejected".
- Resolution: the checker refuses two functional methods with equivalent parameter types wherever their `self` parameters stand. Its message is "There are multiple declarations of f with the same parameter type", with the domain of the declaration that comes first in the source.
- Reason: the rule, and the type group's 2011 paper, by which two declarations that are each more specific than the other are one declaration (`Papers/Types/rules.tick`). A functional method can be viewed as a top-level function (`Specification/basic/traits.tex`, "Method Declarations").

**Walk's choice between a generic and a plain declaration**

- Original: the Working Draft chooses the most specific declaration by the declared parameter types. Walk chose by the order in which the declarations were written.
- Resolution: walk chooses by the declared types.
- Reason: the specification's rule. A program's answer no longer depends on the order of its declarations.

**Walk's check of two generic declarations**

- Original: walk read two generic declarations of one name at one shared symbolic instance, and took two instances of one generic object as types that exclude. So it loaded `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, where `P[\T\] excludes { Q[\T\] }`, and `dup[\T\](x: Box[\T\])` beside `dup[\U\](x: Box[\U\])`. It ran one declaration of each pair. The compiled checker refuses both pairs.
- Resolution: walk reads each declaration over its own instances. It loads such a pair only if the No Duplicates Rule, the Meet Rule and the return-type rule hold on the declared domains. Otherwise it refuses the pair at load: "with generic type, at least one pair of parameters must have excluding types". Three cases differ:
  - walk and the checker refuse a pair whose parameter types exclude only together, through a static argument that another parameter fixes (ledger row 740);
  - the checker refuses two kinds of pair that walk loads (ledger row 741);
  - walk loads two generic declarations whose declared domains are equal (ledger row 742).
- Reason: the specification reads a declaration with static parameters over every instance within its bounds. Two instances of one generic trait meet only where their static arguments are equal (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters").

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
- Resolution: every value of the closed trait, the trait that has the clause, is a value of a listed type. A generic trait may extend the closed trait without being listed, if each type that extends it is below a listed type.
- Reason: read by values, the passages hold for those programs.

**A trait's `override`, and object expressions, under walk**

- Original: walk dropped an inherited declaration only where the object itself declared the `override`, so an object below a trait that overrides ran the overridden declaration. Its load check of the Meet Rule for Functional Methods (`Specification/advanced/overloading.tex`, "Meet Rule") skipped object expressions: anonymous objects written inside an expression, such as `object extends { A, B } end`.
- Resolution: a trait's `override` declarations override for every type below it. Walk reads what each trait provides by the rule of "What a type provides", below, as its load check does. Walk lifts each object expression to the top level as an object, which takes the static parameters of an enclosing generic function. It checks the lifted object as it checks an object. Walk checks a trait, object or lifted object with static parameters through a stand-in: one type for all its instances, with a symbolic type for each static parameter (`symbolicInstance` in `interpreter/evaluator/BuildEnvironments.java`). It does not check a pair of declarations whose parameter types mention a symbolic type. Walk makes no stand-in, and so no Meet Rule check, for a declaration with an `opr` static parameter, or where it cannot make the type. The checker still accepts an object expression that breaks the rule (ledger row 570).
- Reason: the traits chapter (`Specification/basic/traits.tex`, "Method Declarations"), and the Meet Rule, which names object expressions.

**An abstract method without a body, and an `override` that overrides nothing, under walk**

- Original: the traits chapter makes both static errors. It asks an object to define a body for the abstract method itself. An `override` overrides an inherited declaration only if the inherited declaration's parameter type is a strict subtype of the `override`'s, so an `override` at equal parameter types overrides nothing. Walk loaded both: a call of the abstract method stopped with an `InterpreterBug`, "has neither body nor def", and the `override` ran. The compiled checker refuses the first and accepts the second (ledger row 653). The compiled checker split a single parameter type through a `comprises` clause, but not the tuple of a method's parameter types, so it refused bodies at `(Ping, Ping)`, `(Ping, Pong)` and `(Pong, Side)` under `(Side, Side)`, with `Side comprises { Ping, Pong }`.
- Resolution: walk refuses at load an object or object expression without static parameters that leaves an inherited abstract method without a body. In every trait, object and object expression, it refuses at load an `override` that overrides nothing, also one at the inherited declaration's own parameter types. It checks a trait, object or object expression with static parameters once, at its declaration, through the stand-in of "A trait's `override`, and object expressions, under walk". There it does not refuse an `override` of an inherited declaration whose parameter types differ from the `override`'s and mention a static parameter with bounds that walk does not read: an object expression's, which walk lifts without the `where` clauses around it, or one of a declaration that extends a type under a `where` clause (ledger row 693). An instance of a generic trait above a declared object is also checked at its static arguments, where equal parameter types count as overridden. So an `override` is not refused where those arguments make its parameter types equal to the inherited declaration's. An object defines an inherited abstract method by a body at its parameter types, or by bodies at narrower parameter types that together cover them, with `comprises` clauses read. The traits chapter now says so. Walk refuses the object where its search for a cover does not settle: at a cycle of `comprises` clauses, at a symbolic type, at a type whose clause walk cannot read, or beyond 10,000 steps or 4,096 combinations of listed types. A step is one type that the search splits or keeps. Walk also refuses a valid object whose one body for the method has a static parameter of its own (ledger row 728). The compiled checker splits the tuple of parameter types in the same way, and stops at the same limits. Where the abstract method or a covering method has static parameters of its own, it does not split, and refuses a cover that needs the split (ledger row 725). `Random` and `QuickCheck` now define the three abstract methods that their objects did not cover. Walk makes no abstract-method check on a generic object (ledger row 665).
- Reason: the chapter's rules. Coverage is the type group's rule of 2012: the compiled checker's, and the Covered rule of Welterweight Fortress (`Papers/Welterweight/static.tick`). The chapter's sentence on functional methods points to abstract functions, whose concrete declarations must "together cover" the abstract one. The library's `Pairs` and the team's test `FileConversion` define abstract methods by such bodies. With any one narrower body allowed, a call outside it stopped walk at run time with "has neither body nor def". Where the search does not settle, walk refuses the object, as the compiled checker and walk's own Meet Rule check refuse.

**What a type provides**

- Original: the traits chapter says that a type provides the method declarations it declares and inherits, and that it does not inherit one that its own `override` declaration overrides or whose parameter types its own declaration repeats. The compiled checker read every declaration of every supertype as provided, and refused the team's `ProjectFortress/tests/disp0.fss`, whose `override` widens a parameter.
- Resolution: both paths read what a type provides as the chapter says. The checker checks that the return type of an overriding declaration is a subtype of the return type of the declaration that it overrides.
- Reason: the specification's rule, which walk follows (above). The team's own test is valid by it.

**Abstract functional methods in the checker's overloading check**

- Original: the No Duplicates Rule, the Meet Rule over what a type provides and the return-type rule read abstract declarations too (`Specification/advanced/overloading.tex`; `Specification/basic/traits.tex`). The compiled checker read only functional methods with a body when it checked what a type provides. So these passed the checker:
  - an abstract and a concrete functional method with one parameter type, in one trait. The code generator then stopped.
  - an object that inherits an abstract functional method from one trait and its body from another, and declares none of its own. It ran the body.
  - an object's functional method that defines its trait's abstract one with an unrelated return type. Its run failed the JVM's verification.
- Resolution: the checker reads every functional method that a type provides, abstract ones too. It refuses the three cases: "There are multiple declarations of f with the same parameter type", "Invalid overloading of pick in trait O" and "For f, the return type of ... should be a subtype of ...". Walk refused all three at load already. The checker's check of top-level overloads still reads only declarations with a body (ledger row 739).
- Reason: the specification's rules, and the code generator's own refusal of such a set. The type group's Welterweight calculus refuses the second case too. Scala accepts it, and the revival keeps Fortress's rule.

**A string's `left` and `right`**

- Original: the interpreter's library declared `String`'s getters `left` and `right`, its first and last characters, as `Maybe[\Char\]`, but answered the character itself, so walk printed `a` for `"abc".left`. The specification is silent.
- Resolution: they answer `Just` of the character, and `Nothing` for the empty string, as `List`'s and the ranges' do.
- Reason: the declared type, which the checker enforced by refusing both bodies.

**`self` in a self-typed trait**

- Original: the Working Draft types `self` as the enclosing trait's type, or with a `comprises` clause, as its intersection with the listed types. The checker did the same. So it refused 29 of the library's default bodies that return or pass `self` where the trait's parameter is declared, such as `floor(self): I = self` in `trait Integral[\I extends Integral[\I\]\]`. Walk ran them. Nothing checked that a type that extends such a trait is an instance of its argument.
- Resolution: the specification defines a self-type parameter. It is a static parameter `X` of a trait `T` whose `comprises` clause is absent or lists only `...`, bounded in one of two ways:
  - by `T` at its own static parameters, as in `trait T[\X extends T[\X\]\]`;
  - by a trait with a self-type parameter that `T` extends at `X`.

  In `T`'s method bodies, the checker types `self` as `T[\X\] & X`. The method signatures keep the type `T[\X\]`. The checker refuses a trait, object or object expression that extends `T[\A\]` and is not an `A`. For a trait, it checks the type of `self` in that trait's own bodies. Walk is unchanged. A compiled body that returns `self` still fails the JVM's verification when its class loads with the parameter at an object type.
- Reason: the rule makes the 29 bodies well typed, and refuses nothing else in the library. They are the team's minimal complete definitions of its orders, algebra and arrays. Scala asks the same of a class's self type (*Scala Language Specification 2.13*, section 5.1). The signatures keep the trait's type because the POPL 2019 account of overloading compares declared domains, with no type parameter inside an intersection. With the intersection in the signatures, the checker reported 18 false errors of the return-type rule between the `CMP` declarations of `StandardPartialOrder` and `StandardTotalOrder`. The second form of the bound keeps the team's mixins `ContainmentBySubset` and `ContainmentByComparison` valid as written.

**`SYMDIFF` of a many-entry and a one-entry `IntMap`**

- Original: the library's comment says that `SYMDIFF` "returns the key/value mappings contained in exactly one input map". Its body for a many-entry map (`NodeIM`) and a one-entry map (`SingletonIM`) kept only the entry that `seek` found. Under walk `{0,1,2} SYMDIFF {5}` was `{2,5}`, while the reverse order gave `{0,1,2,5}`. A `SYMDIFF` of two many-entry maps that split down to such a pair lost entries in the same way.
- Resolution: the many-entry map is updated at the one-entry map's key. The key is dropped if the map holds it, and added with the one-entry map's value if not. Both orders give the same map.
- Reason: the library's own comment, and the one-entry map's `SYMDIFF`, which already answered so in the other order.

**`UPLUS` of `IntMap`s on a shared key**

- Original: the library's comment says that `UPLUS`, the disjoint union, throws `KeyOverlap` when a key occurs in both maps. Its body for a many-entry map and a one-entry map kept the many-entry map's value on a shared key, while the reverse order threw. So an `IntMap` comprehension or map expression with a repeated key kept one value or threw, by the order of its entries.
- Resolution: a shared key throws `KeyOverlap` in both orders, also between two many-entry maps. So every `IntMap` comprehension or map expression with a repeated key throws, also where the key repeats with the same value. `BIG UPLUS` over maps that share a key throws too.
- Reason: the library's own comment, and the one-entry map's `UPLUS`, which already threw. `Map`'s comprehension throws on every repeated key. The specification throws `KeyOverlap` where a key repeats with a different value (`Specification/basic/expressions/comprehensions.tex`).

## Static parameters

**The bound of a type parameter that has none written**

- Original: the Working Draft bounds it by `Object`. The library instantiates its generic containers at tuples, such as arrays indexed by pairs, and `Object` holds no tuple.
- Resolution: the bound is `Any`. The compiled path departs from it until the switch-over (`compiler.md`, "Traps of the compiled path").
- Reason: the library works only with `Any`.

**A type parameter that a call does not fix**

- Original: the implementations gave it the empty type `Bottom`, or left it unsolved, and some such compiled calls failed the JVM's verification. The type group's POPL 2019 paper gives such a parameter its bound.
- Resolution: it takes its bound on both paths. Under walk, one whose bound names itself stays open, and a big operator without static arguments takes them from its value or its elements (both below). Walk still gives `Bottom` to these:
  - a parameter declared with two bounds, neither below the other (ledger row 591);
  - a parameter that an argument bounds only from above, whose bound names another static parameter (ledger row 612);
  - a parameter that only the result of a function expression without a return type fixes (ledger row 587).
- Reason: the paper is the type group's latest word on the rule.

**A call written as an argument**

- Original: the specification infers a call's static arguments "from the context of the function call". The checker typed each argument of a call without an expected type. So a static argument that only the result mentions took its bound, or the numeral's type where only a numeral fixed it. For example, with `mk[\T\](): BoxT[\T\]` and `takesBox64(b: BoxT[\ZZ64\])`, the checker refused `takesBox64(mk())`.
- Resolution: if the checker does not accept a call with its arguments so typed, it types each argument that is a call with inferred static arguments again. It types the argument once for each declaration of the enclosing call, with that declaration's parameter type as the expected type. Then it chooses the most specific declaration that this makes applicable. It never passes over a declaration that accepts the call as written. So a reduction's big operator, which the desugaring writes as an argument, takes the reduction's expected type where its instance at its bound does not fit. Walk gives an argument no expected type (`ProjectFortress/tests/XXXInferCallArgumentWalk.fss`).
- Reason: the context of a call written as an argument is the parameter that it is passed to.

**A type parameter whose bound names itself, under walk**

- Original: walk gave such a parameter the empty type `Bottom` where a call did not fix it, as `SUM`'s `T extends AdditiveGroup[\T\]` in `SUM[i <- 1#100] i`. The reduction then refused its first element. The POPL 2019 paper's rule has no bound to give: such a bound is not a type until the parameter is known.
- Resolution: walk leaves the parameter open. Wherever walk checks a value against the open parameter, every value passes. A generic type that holds the open parameter admits no more than it admits at `Bottom`. A printed type shows the open parameter as `OPEN`: `BoxU[\OPEN\]` for an object `BoxU[\T\]`. A reduction now takes its static arguments by the next entry, and leaves such a parameter open only where it has neither a declared type nor an element.
- Reason: an open parameter refuses no value.

**A reduction or a comprehension without static arguments, under walk**

- Original: the specification desugars a reduction or a comprehension by the type of its expression: for generators `gs`, `SUM[gs] e` of type `N` calls `SUM[\N\]`, and `<| e | gs |>` of type `List[\E\]` calls `BIG <|[\E\]|>` (`Specification/advanced/parallelism-locality/defining-generators.tex`). Walk gave the big operator's static parameters `Bottom`, or left them open where their bound names them. So an empty `SUM` of `RR64` values gave the integer 0, and `Set`'s `BIG UNION` and `BIG INTERSECTION` stopped at their first element. The library left `__bigOperator`'s local function `body(i)` untyped. It declared `IntMap`'s comprehension operator to return an `IntMap[\Val\]`, while its body is a `Comprehension`.
- Resolution: walk instantiates the big operator in this order:
  1. at the declared type of its value: the type of the local variable that it initialises, or the return type of the top-level or local function that returns it, also where it is the last expression of a block that gives that value. A method's return type, a field's or a top-level variable's type, a parameter's type and an assignment do not direct it;
  2. else at the join, the least common supertype, of its elements' run-time types; walk collects the elements before it reduces them. Where the join is outside the bound, such as `Number` for `ZZ32` and `RR64` elements of a `SUM`, the parameter stays open, and each `+` runs at its operands' types;
  3. else, with no element, at each parameter's bound, or open where the bound names the parameter.

  The code is `bigOperatorByElements` in `interpreter/evaluator/Evaluator.java`. Walk reads a big operator's declared result through the `BigReduction`, `Comprehension` or `BigOperator` that it extends, so `opr BIG CATOP[\T\](): CatOperator[\T\]` is read as its supertype (`resultArgOf` in `EvaluatorBase.java`). `__bigOperator` declares `body(i: I): L`, and `IntMap`'s operator returns a `Comprehension[\(ZZ64,Val),IntMap[\Val\],AnyCovColl,AnyCovColl\]`. An element that converts to the instantiated type is converted, as at a call. Any other element stops inside `__bigOperator`, with "body param 1". Walk still differs from the specification in two cases:
  - an empty one that no declared type directs leaves `SUM`'s parameter open, and gives the integer 0, whatever its body's type (ledger row 716);
  - a comprehension inside another clause form, a reduction or comprehension with generators in brackets such as `BIG CONCAT[ys <- xss] e`, is built at its elements' run-time types where no declared type reaches it (ledger rows 20 and 717).

  On the compiled path, the checker takes a plain bound, or the expected type where the reduction's type at that bound does not fit it. It refuses a reduction whose bound names its parameter, such as `SUM`'s and `PROD`'s (ledger row 731).
- Reason: a type parameter that a call does not fix takes its bound, narrowed by the call's static return type, here the declared type of the value. Walk has no static types, so it reads its elements' run-time types for the type of the expression. At its bound alone, a comprehension is built at `Any`. With `Bottom`, the typed `body(i)` refused the first element.

**A type parameter with two bounds, one a closed trait, in the checker**

- Original: take `T extends { K, R[\T\] }`, with `K comprises { A, B, C }` and `C` not an `R`. The checker replaced `K` in such an intersection by the listed types that the other bound does not exclude, whatever that bound named. It also split a union on the right of a subtype question before it read the bound of a type variable, a static parameter in scope. So `T`'s bound became a union before the checker read it. The call `h(x)` in `g[\T extends { K, R[\T\] }\](x: Box[\T\])`, for an `h` with the same bounds, was refused ("is not applicable to an argument of type Box[\T\]"), or stopped the checker ("Applied a substitution to an And and got an Or"). A valid overloading beside it was refused by the return-type rule.
- Resolution: the checker expands a closed trait only against a bound that names no type variable or inference variable, the checker's placeholder for a static argument that it infers. An inference variable below a union takes the whole union as one upper bound. A type variable below a union is also tried through its bound. Such calls compile and run, and a call outside the bounds is refused as not applicable. Two cases still fail:
  - with a ground second bound, one that names no static parameter, the call is still refused: `h(x)` in `g[\T extends { K, Q }\](x: Box[\T\])`, where `Q` excludes a listed type (ledger row 712);
  - `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)`, where `Z` excludes `A` and `B` and `C` extends `Z`, is refused as an invalid overloading, though the bound `R[\T\]` rules out `C` (ledger row 713).
- Reason: the specification makes such a call applicable at an instance within the bounds (`Specification/basic/inference.tex`). The type group's subtyping algorithm reads no `comprises` clause (`Papers/Types/fig-subtype.tick`). The POPL 2019 paper proves its matching complete only where no union holds a type parameter.

**Sizes on the compiled path**

- Original: the Working Draft has the size parameters `nat` and `int`. The checker crashed on sized declarations, and a sized program did not compile or load. The team's code generator had reserved a slot for a size's run-time descriptor.
- Resolution: the checker checks sizes, and the slot holds the size's descriptor (`SKILL.md`, "The compiled run time").
- Reason: it completes the team's design, which carries a size as it carries a type argument.

**Arithmetic in a size**

- Original: the Working Draft allows a sum, a difference, a product or a power as a size, and fixes its value once the static parameters are known, but does not say when two such sizes are the same. The checker refused any arithmetic in a size, and counted a static parameter as different from every numeral. The compiled path spelled the expression into the class's name. Walk stopped on a power.
- Resolution: two sizes are the same when they are written alike once each operation on numerals is computed: `2 3` is `6`, and, for static parameters `s0` and `s1`, `s0 s1` is not `s1 s0`. A static parameter, or an expression with one in it, is not known to differ from a numeral, so in `typecase N[\b0\] of N[\0\] => ...`, for a static parameter `b0` and `NatReflect`'s object `N` (below), the arm `N[\0\]` is reachable. The checker checks a computed size against its parameter's kind, as it checks a numeral. It computes a power of 0, 1 or -1 at any exponent, and of another base up to the exponent 4096. It refuses a larger power as outside every kind. The compiled path computes a size when it names a class, so `Box[\2 + 1\]` and `Box[\3\]` are one class; the class loader does not check a size that it computes against its parameter's kind (ledger row 675). Walk computes a power exactly, as the compiled path does. Both compute no power at a negative exponent, which only a static parameter can give, and walk refuses it.
- Reason: the library writes a product in the storage of its matrices, `mem: PrimitiveArray[\T, (s0 s1)\]` in `Library/FortressLibrary.fss`, and sums in result types. The grammar allows a power in a size. A `nat` or `int` parameter takes an integer, and a power at a negative exponent is no integer, except of 1 and -1. The team's questions and answers in the specification's appendix "Internal Document" (`Specification/appendices/internal-document.tex`) refuse two overloads at `T[\n+1\]` and `T[\0\]`.

**A size known only at run time**

- Original: `NatReflect`'s `reflect` answers a `NatParam`, a trait that the object `N[\nat n\]` extends (`ProjectFortress/LibraryBuiltin/NatReflect.fsi`). The team's clause of `NatParam`, `comprises { N[\n\] } where [\ nat n \]`, was a comment, and the api's comment says that a `NatParam` passed where `N[\n\]` is expected makes `n` a static parameter. The checker refused every such call in the library; walk ran them, binding the size at dispatch.
- Resolution: the clause is restored, and the specification allows a where-clause variable in a listed type. In the checker, a value of such a trait, passed where the listed type is expected, binds the call's `nat` parameter to the value's own size. That size is known to equal only itself: two values passed in one call have two sizes, and the size does not reach a type that names another size. Walk loads the clause and binds each size at dispatch, as before, so it runs such a call. The compiled run waits for the switch-over (`ProjectFortress/compiler_tests/XXXNatOpenRun.fss`).
- Reason: the team's comment, and the library's run-time factories, which pass `reflect`'s value to functions that take `N[\n\]`.

**Comparing pairs and triples**

- Original: the interpreter's library compared pairs and triples lexicographically with `<`, `<=`, `>`, `>=` and `CMP` over element types with no bound, under the team's comment "Shouldn't these operators have to extend something? A,B,C?". Walk compared an element only when the elements before it were equal, so `((1,2),3) < ((1,3),0)` and `(1,()) < (2,())` were `true`. A pair whose first elements were unordered, such as a NaN against a float, stopped walk.
- Resolution: each element type extends `StandardPartialOrder`, and walk refuses at the call a pair or triple with an element of another type, such as a pair or `()`, whatever the elements before it decide. Walk also refuses a pair whose elements at one position are numbers of two run-time types, such as `(1,2) < (1,2.5)`, which it answered `true`: it takes the element type at their join, which is no partial order (ledger row 511). A pair or triple whose deciding elements are unordered answers `false` to `<`, `<=`, `>` and `>=`, and `Unordered` to `CMP`. `Reflect`'s `members` is a list in the order the type declares its members, not a set sorted by name: the set compared its triples, which the bound refuses.
- Reason: the checker refused the bodies of the ten operators, five on pairs and five on triples, at 17 sites. The team bounded the range points' comparisons `PCMP` and `SCMP` per element in 2008, and `false` is what `RR64`'s own comparisons answer for a NaN.

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
- Resolution: if the arguments of one type parameter mix number types, it takes the narrowest type into which all of them convert. For a `ZZ32` and a `ZZ64` that is `ZZ64`, and for a `ZZ32` and an `NN32` too. Walk does not apply this rule to the elements of a tuple or varargs argument: it takes their join (ledger row 511). So it refuses `(1,2) < (1,2.5)` ("Comparing pairs and triples").
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
- Reason: the lexicographic order serves sorting, and a corner outside the bounds on any axis is outside them.

**The trivial open range `(:)`**

- Original: `(:)` is a range over `Any`. The interpreter's library gave its `truncL`, `truncR`, `every`, `imposeStride` and `atMost` bodies that answer ranges over `ZZ32`: `(:).truncL(3)` was `3#`.
- Resolution: the five throw `FailCalled`, through the library's `fail`, with a message that names `(:)`, and so do `(:):s` and `(:)#n`, which call two of them. `(:)` as a whole subscript, `a[:]`, is unchanged.
- Reason: each of the five declared types is a range over `Any`. Generics are invariant, so the old bodies' ranges over `ZZ32` broke those types, and the checker refused them.

**`SUM` and `PROD`**

- Original: `SUM` and `PROD` reduced over `Number`, under the team's comment "Hack to permit any Number to work non-parametrically". Every sum had the type `Number`, and an empty sum of `RR64` values was the integer 0.
- Resolution: each is one generic declaration over the element type's own algebra, which gives its zero or one at that type (`library.md`).
- Reason: `Number`'s operators for any number went with the tower, so each reduction uses the element type's own operator.

**Vectors and matrices at an element type that is not a number type**

- Original: the specification makes a one-dimensional array whose elements are a subtype of `Number` a vector, and a two-dimensional one a matrix (`Specification/basic/expressions/aggregate.tex`). The interpreter's library followed it: `array1` and `array2` gave a `Vector` or a `Matrix` at every element type below `Number`, and at `Number` and `AnyIntegral` themselves. The library bounds a vector's element type by `{ Number, MultiplicativeRing[\T\] }` (`Library/FortressLibrary.fsi`), which `Number` and `AnyIntegral` do not satisfy. The checker refused the factories' calls of `vector` and `matrix` as ill-formed types.
- Resolution: `array1` and `array2` give a `Vector` or a `Matrix` only at `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`. At every other element type they give a plain array, also at a user type that extends `Number`. Walk stops at a plain array's `+` and unary `-` with a failed dispatch. Under walk, a `T` inferred from a `ZZ32` value is walk's run-time type `Int`, not `ZZ32`. So `array1` and `array2` with an inferred element type give a plain array, where the specification gives a vector (ledger row 721). Write the static argument to get a vector. The factories choose by a `typecase` over a witness, a value of their result type. A `typecase` over a value of the element type matched a type below a number type, and its `cast` threw `CastError`. `aggregate.tex` still states the rule at `Number`.
- Reason: `Vector[\Number,n\]` is not a well-formed type, because `Number` is not within the vector's bound (`Specification/basic/inference.tex`).

**Rounding a rational at an infinity or 0/0**

- Original: the Working Draft (`Specification-1.0-frozen/basic-lib/numbers.tex`, "Rational Numbers") gives `QQ`'s `floor`, `ceiling`, `round` and `truncate` the result type ℤ, and a later paragraph of that section says they return the argument at +∞, −∞ and 0/0, a rational. The interpreter's library returned the argument, and its `round` stopped walk there.
- Resolution: these methods and the brackets ⌊ ⌋ and ⌈ ⌉ throw `DivisionByZero` at those three values.
- Reason: the declared result type is ℤ, and a division by zero whose result is an integer throws `DivisionByZero` (`Specification/basic/operators/opr-overview.tex`, "Multiplication, Division, Modulo, and Remainder Operators").

## Loops and reductions are library code

**The lifted type of a reduction without an identity**

- Original: the interpreter's library lifted the reductions without an identity, such as `BIG MIN`, `BIG MAX` and `BIG //`, to the type `AnyMaybe`, which takes no type argument. Such a reduction wraps each element in a `Just` with its `lift`, joins two wrapped elements by its `simpleJoin` of their contents, and answers `Nothing` for no element. Their `simpleJoin` took and answered `Any`, and their `lift` took `Any`, while `Library/FortressLibrary.fsi` declared `lift(r:R)`. The team's tests declared their own such reductions with `simpleJoin` at `Any`, and passed `AnyMaybe` to `generate` as its static argument.
- Resolution: `AssociativeReduction[\R\]` lifts to `Maybe[\R\]`. Its `simpleJoin` takes and answers `R`, and every `lift` takes `R`. A reduction that extends it declares `simpleJoin` at its element type. Under walk, one declared at `Any` or with untyped parameters leaves the abstract `simpleJoin` without a body: walk refuses such a reduction at load, and one with static parameters stops at its first join. A static argument that names the lifted type is `Maybe[\R\]`, as in `h.generate[\Maybe[\(ZZ32,ZZ32,ZZ32)\]\](TestReduction, sing)` in `ProjectFortress/tests/HeapTest.fss`.
- Reason: the checker refused the library's declarations at `Any` in 13 places, and `join`'s `if av <- a` cannot bind from `AnyMaybe`, which is not a `Condition`, a generator of zero or one element. `FortressLibrary.fsi` and `Set`'s `Intersection` already wrote these types. The declarations at `Any` had kept some of walk's reductions running while walk gave `Bottom` to a type parameter that a call did not fix. Walk now instantiates such a reduction as "A reduction or a comprehension without static arguments, under walk" says.

**A generator's size, the relational predicate and the default index-value pairs**

- Original: the interpreter's library declared no size on `Generator`, though three of the library's bodies read the size of a `Generator`. The relational predicate, the condition that `relationalPredicate(r)` makes (`RelationalPredicateCondition`'s `cond` in `Library/FortressLibrary.fss`), asks whether `r` holds between each two consecutive elements of its target, a `Generator`; it read a size and indices from 0 off the target. Under walk, `|g|` of a filter, a nest or a mapped filter stopped, and so did the relational predicate on a filter; on an array whose indices start above 0 it read outside the bounds. `Indexed`'s default `indexValuePairs` answered a mapped generator, printed `mapped(...)`, where an `Indexed` is declared. The checker refused these at nine sites.
- Resolution: `Generator` has `opr |self|`, a default that counts the elements by running the generator, as `opr IN` searches them. A type with its own size keeps it. The relational predicate is one reduction in the generator's natural order, as the relational reduction of `Generator2` (`efficientImplRelationalDistributiveImpl` in `Library/Generator2.fss`) is. The default pairs are an object over the indexed value, `SimpleIndexValuePairs`, which prints as its elements and is indexed as the value is; a slice of it keeps each pair's index. So two answers change under walk: the relational predicate on a reversed indexed value follows its natural order, and the default pairs of a value indexed from 5 are indexed from 5, not from 0.
- Reason: the checker's refusals. A default keeps "only needs to define the generate method" true (`Specification/advanced/parallelism-locality/defining-generators.tex`). Counting consumes a consumable generator and never ends on an endless one, as every other derived default of `Generator` does.

**Walk's `if` on a value that is not a `Boolean`**

- Original: the specification takes a clause without a binding only of type `Boolean` (`Specification/basic/expressions/if.tex`). Walk took an object named `Just` as true and every other object as false, so an `if` on a number took its `else` branch. The team's tests `maybeTest.fss` and `naturalsTest.fss` give a plain `if` a `Maybe` clause.
- Resolution: walk takes a `Boolean` by its value, a `Just` as true and a `Nothing` as false. It refuses every other value: "If clause did not return boolean, but 1: ZZ32". The compiled checker refuses a `Maybe` clause too, so here walk departs from the specification. Walk tests names: an object named `Just` or `Nothing` that extends a trait named `Maybe` counts.
- Reason: the specification's rule, which the compiled checker enforces, and the team's own tests.

## Specified, but not built

**A parameter whose type is left out**

- Original: the components chapter (`Specification/basic/components/type-inference.tex`) says that type inference finds every type that a component leaves out. The compiled checker refused a top-level function's or a method's parameter written without a type, and crashed on a local function's. Walk runs such declarations, except a method that implements an abstract declaration, which stops at its first call (ledger row 405).
- Resolution: the compiled path refuses every such parameter of a top-level function, a method or a local function, with "Missing parameter type for" and the parameter's name. A `\revision` box in that file and Appendix I say so.
- Reason: no text describes that inference. A crash of the checker is no answer, and the refusal already stood at top level.
