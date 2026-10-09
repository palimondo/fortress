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

- Original: walk dropped an inherited declaration only where the object itself declared the `override`, so an object below a trait that overrides ran the overridden declaration. Its load check of the Meet Rule for Functional Methods skipped object expressions.
- Resolution: a trait's `override` declarations override for every type below it, read per type, as walk's load check reads them. Walk checks an object expression without static parameters as it checks an object; one in a generic function is not checked, as a generic object is not (ledger row 647). The checker still accepts such an object expression (ledger row 570).
- Reason: the traits chapter, and the Meet Rule, which names object expressions.

**What a type provides**

- Original: the traits chapter says that a type provides the method declarations it declares and inherits, and that it does not inherit one that its own `override` declaration overrides or whose parameter types its own declaration repeats. The compiled checker read every declaration of every supertype as provided, and refused the team's `tests/disp0.fss`, whose `override` widens a parameter.
- Resolution: both paths read provides by the chapter. The checker checks the return type of an overriding declaration against the declaration that it overrides.
- Reason: the specification's rule, which walk already followed. The team's own test is valid by it.

## Static parameters

**The bound of a type parameter that has none written**

- Original: the Working Draft bounds it by `Object`. The library instantiates its generic containers at tuples, such as arrays indexed by pairs, and `Object` holds no tuple.
- Resolution: the bound is `Any`. The compiled path departs from it until the switch-over (`compiler.md`, "Traps of the compiled path").
- Reason: the library works only with `Any`.

**A type parameter that a call does not fix**

- Original: the implementations gave it the empty type `Bottom`, or left it unsolved, and some such compiled calls failed the JVM's verification. The type group's POPL 2019 paper gives such a parameter its bound.
- Resolution: it takes its bound, except under walk, as `SKILL.md`, "Fortress as a language", says.
- Reason: the paper is the type group's latest word on the rule.

**A type parameter whose bound names itself, under walk**

- Original: walk gave such a parameter the empty type `Bottom` where a call did not fix it, as `SUM`'s `T extends AdditiveGroup[\T\]` in `SUM[i <- 1#100] i`. The reduction then refused its first element. The POPL 2019 paper's rule has no bound to give: such a bound is not a type until the parameter is known.
- Resolution: walk leaves the parameter open. It admits every value where walk checks a value against the type, so the reduction runs on the types of its elements. An empty one gives `ZZ32`'s identity, and `BIG MINMAX` still stops (ledger rows 645 and 473). A printed type names the open parameter `OPEN`, as in `BoxU[\OPEN\]`. The checker still refuses the call (row 425).
- Reason: walk has no static types, so it cannot take the expression's type, as the specification's desugaring does. An open parameter refuses no element.

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

**`SUM` and `PROD`**

- Original: `SUM` and `PROD` reduced over `Number`, under the team's comment "Hack to permit any Number to work non-parametrically". Every sum had the type `Number`, and an empty sum of `RR64` values was the integer 0.
- Resolution: each is one generic declaration over the element type's own algebra, which gives its zero or one at that type (`library.md`).
- Reason: `Number`'s operators for any number went with the tower, so each reduction uses the element type's own operator.

## Specified, but not built

**A parameter whose type is left out**

- Original: the components chapter says that type inference finds every type that a component leaves out. The compiled checker refused a top-level function's or a method's parameter written without a type, and stopped on a local function's. Walk runs them.
- Resolution: the compiled path refuses every such parameter of a function declaration with "Missing parameter type for x". A box in the chapter and Appendix I say so.
- Reason: no text describes that inference. A stop of the checker is no answer, and the refusal already stood at top level.
