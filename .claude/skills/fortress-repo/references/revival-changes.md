# What the revival changed in the team's Fortress

This part gives the departures of revived Fortress from the team's Fortress, and from what you expect from Java, Scala, Haskell or Julia. The team left three forms that disagree: the specification, walk with the interpreter's library, and the compiled path with the compiler's library. The rules below resolve them. Read the part whole, after `SKILL.md`, before work.

Each bold rule states the rule of this tree. A sentence that names a POSITIONS entry (P-N) states a decision of the curator. Build on a sentence without one, but do not cite it as a decision. Question a rule only on new evidence (`SKILL.md`, "When to explore"). Most rules follow the type group's later papers over the specification's early text (P-26; `exploring.md`). The Working Draft is the unrevised specification, in `Specification-1.0-frozen/`. Where a rule changed the specification, Appendix I keeps the original text (`specification.md`).

A sentence that cites a ledger row states a known departure of one path from a bold rule. A fix can change it, so do not assert it as correct in a test. If a change is not here, search FACTS and POSITIONS (`records.md`) before you call a disagreement a conflict. An old note, a team test and your training can be right about the team's walk and wrong here: the number types do not nest, fixed-width arithmetic does not wrap, and walk converts arguments.

## Dispatch and overloading

**Overloads may differ in their static parameters (P-45).** An example is `ident[\T extends Shape\](x: T): T` beside `ident[\T extends Round\](x: T): T`. The Working Draft forbids such pairs. A declaration's declared domain is the set of argument types that its declared parameter types accept at some instance within its bounds: every `Shape` for the first `ident`. The checker applies the overloading rules of `SKILL.md` to declared domains. The more specific declaration's return type must be a subtype of the other's at every instance, not at one only.

**Where a declaration has static parameters, exclusion is read over the whole tuple of parameter types (P-152).** By the exclusion rule, a value of both domains has one instance of each generic type at each position, so those instances' static arguments are equal. The domains exclude where these equalities cannot hold together, or where some position excludes at the instance that they force. So `o[\T\](x: P[\T\], b: Box[\T\])` beside `o[\T\](x: Q[\T\], b: Box[\T\])`, with `P[\T\] excludes { Q[\T\] }`, is valid. Both paths refuse a pair where the equalities leave a static parameter free, as `o[\T, U\](x: Q[\U\], b: Box[\T\])` beside the first `o`: nothing ties `U` to `T`. In its test of whether two domains exclude each other, the checker puts the meet of a static parameter's declared bounds in the parameter's place where the parameter is a whole parameter type, an element of a tuple or a member of an intersection or union (P-157). Inside a static argument, as `T` in `Box[\T\]`, the parameter stays.

**Walk chooses by declared parameter types, never by the order of the declarations.** It compares declared domains where one lies strictly inside the other. Otherwise it compares the instances that the call makes. It infers a dotted generic method's static arguments from the arguments' run-time types, as for a generic function. A trait's generic method called with an argument outside a bound fails with "Cannot unify".

**Walk's load check is not the verdict of these rules.** It refuses some valid pairs and loads some invalid ones, and the checker differs from it on others. Before you change code to pass walk's check, or take its acceptance as proof, find the case and its row in `interpreter.md`, "What walk checks". For example, walk compares two functional methods of a generic trait or object on their declared domains only at a call (row 780).

**Two functional methods with equivalent parameter types are duplicates, wherever `self` stands.** So the checker refuses `f(self, y: S)` beside `f(x: S, self)` in a trait `S`. Abstract declarations count:

- both paths refuse an abstract and a concrete method with the same parameter types in one trait;
- the checker refuses an abstract functional method `h(self): ZZ32` beside a top-level `h(x: String): ZZ32`;
- both paths refuse an object that inherits an abstract functional method from one trait and its body from another, unless the object declares the method itself (P-149). The Scala language accepts it.

## Traits and objects

**The compiled checker applies the exclusion rule (P-43, P-97).** It refuses a type that extends two instantiations of one generic trait. Without the rule, such programs die with `IncompatibleClassChangeError`. Walk applies no instantiation exclusion (row 416). So it runs such a type, and it refuses overloads on two instantiations, as at `Tg[\3\]` and `Tg[\4\]`. The specification marks the Working Draft's examples that break the rule "Not allowed": do not copy them.

**A `comprises` clause speaks of values (P-60).** Every value of the trait that declares it is a value of a listed type. So a generic trait need not be listed if every type below it is below a listed type, as `Integral[\I\]` below `AnyIntegral`. A Java `permits` list names each direct subtype; this clause need not. Read so, several declarations can together cover the meet of two overloads. At load, walk checks extenders only against the clauses of the program's main component.

**`override` widens.** An `override` overrides an inherited declaration only where the inherited parameter types are strictly narrower than its own. To replace an inherited declaration at its own parameter types, declare it again without `override`. An `override` in a trait also overrides in every type below it. The checker checks that an overriding return type is a subtype. Walk refuses at load an `override` that overrides nothing, so a Java-style `override` in the library stops every program. Two departures: the checker accepts such an `override` (row 653), and the code generator refuses every `override` modifier (row 650).

**An object defines an inherited abstract method by bodies that together cover its parameter types (P-147).** It needs one body at those types, or several narrower bodies that cover them, with `comprises` clauses read. Walk refuses at load an object without static parameters that leaves one uncovered. Walk skips this check for a generic object (row 665). Walk stops its search for a cover at limits that `interpreter.md` gives, and the checker at the same limits. The checker refuses a cover by several bodies where the abstract or a covering method has static parameters (row 725).

**In a self-typed trait the checker types `self` as the trait met with the implementing type.** A trait `T` is self-typed if both conditions hold:

- `T` has no `comprises` clause, or one that lists only `...`;
- `T` has a parameter `X` bounded by `T` itself, as `trait T[\X extends T[\X\]\]` (P-146), or by a self-typed trait that `T` extends at `X`.

In `T`'s bodies, `self` has the intersection type of `T[\X\]` and `X`. So `floor(self): I = self` in `Integral[\I extends Integral[\I\]\]` is valid without a cast. The checker refuses a type that extends `T[\A\]` and is not an `A`. A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695).

When the checker applies the overloading rules to a method of `T`, `self` has the type `T[\X\]`, except in its test of whether two domains exclude each other. There `self` has the intersection type of `T[\X\]` and `X` (P-157). With this reading and the bounds that the test reads ("Dispatch and overloading"), the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk loads the library's pairs, but refuses such a pair where a program's own component declares both (row 804).

**An indexed type's index parameter is bounded by `Index` (P-156).** An indexed type is a type whose values `a[i]` subscripts, such as an array. Its index parameter is the static parameter that gives the type of `i`. In the library, and in your own generic over such a type, write `I extends Index`. Walk runs the code without the bound. The checker refuses it when it checks against the interpreter's library, as the count stage does. `ZZ32` extends `Index`, and `Range` excludes `Index`. To the checker a numeral is an `IntLiteral`, which is no `Index`. So it refuses `f(3)` for `f(x: Index)`; walk takes it (row 364). Pass a `ZZ32` value there instead. `a[3]` stays valid, because an array over `ZZ32` takes a `ZZ32`. The Working Draft lets no trait type hold a tuple, but here a tuple whose element types are all `Index` types is an `Index`. So `m[i, j]` passes the pair `(i, j)` as one index. `Index` extends only `Any`, so such a tuple is still no `Object`. The empty tuple `()` is no `Index`. A function over `Index` and one over a tuple of `Index` types do not exclude each other. Until the switch-over, the compiler's prelude declares no `Index`, so a program that names it does not compile. Two departures:

- the checker refuses a tuple expression at a parameter of type `Index`, but takes one at a parameter of type `I`, where `I extends Index` (row 805);
- walk loads a function over `Index` beside one over a pair whose element types neither lie below `Index` nor exclude it (row 806).

**Pairs and triples are ordered only where each element type extends `StandardPartialOrder`.** This holds for `<`, `<=`, `>`, `>=` and `CMP`. Walk refuses another element type at the call, also where earlier elements decide, as `(1,()) < (2,())`. It also refuses numbers of two run-time types at one position, as `(1,2) < (1,2.5)` (row 511). Unordered deciding elements give `false`, or `Unordered` for `CMP`. The checker orders a `List[\E\]` only where `E extends StandardTotalOrder[\E\]`, so a list of `RR64` has no order there (P-154). Walk orders every list (row 774). A list's `=` stays element by element.

## Static parameters, `where` clauses and sizes

**A type parameter that a call does not fix takes its bound, not Scala's `Nothing` (P-48).** The checker takes the intersection of its upper bounds, narrowed by the expected type. Under walk, a parameter whose bound names itself stays open, printed `OPEN`, as in `BoxU[\OPEN\]`. Every value passes `OPEN` itself. Where walk compares overloads, a type that holds `OPEN` admits only what it admits at `Bottom`: beside `pick(x: Any)`, `pick(x: (T,T))` takes no `(1, 2)`. Walk still gives `Bottom` to these parameters:

- one with two bounds, neither below the other (row 591);
- one that an argument bounds only from above, with a bound that names another static parameter (row 612);
- one that only the result of a function expression without a return type fixes (row 587).

**Only the checker gives a call written as an argument the enclosing call's context (P-51).** If the enclosing call fails as written, the checker types the inner call again against each declaration's parameter type. So `takesBox64(mk())` compiles for `mk[\T\](): BoxT[\T\]`. Walk gives an argument no expected type, so there `mk()` takes its bound (row 705). Under walk, write `mk[\ZZ64\]()`.

**Three `where` forms are built (P-151).** Conditional extension is an `extends` entry with a `where` clause that binds no variable and states only constraints `T extends SomeTrait`. The type extends the parent only where they hold, as `List[\E\]` extends `LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }`. The other two forms:

- a condition of a function or method on its own static parameters, or of a method on its trait's, checked at a call;
- a type variable of a `where` clause in a `comprises` clause, as `AnyList comprises List[\E\] where [\E\]`.

The checker reads an `extends` entry with any other `where` clause as unconditional, without a message. Walk and the compiled run time apply a conditional extension at every instance (row 774). Walk runs a dotted call that breaks a method's condition (row 777). The code generator refuses a declaration with a `where` clause of its own (row 701). `compiler.md` gives the checker's gaps.

**Sizes are compared by their written form (P-55).** The checker checks sizes against their kind, and the run time carries each as a descriptor. Two sizes are equal when they are written alike after numeral arithmetic: `2 3` is `6`, but `s0 s1` is not `s1 s0`. A static parameter is not known to differ from a numeral, so in `typecase N[\b0\] of N[\0\] => ...` the arm is reachable. The checker refuses a size power above the exponent 4096, except of 0, 1 or -1. Walk refuses a negative exponent. The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675).

**A size known only at run time comes from `reflect` in `NatReflect.fsi`.** Its value, a `NatParam`, passed where the object type `N[\n\]` is expected, binds `n` at the call. Such a call runs compiled only after the switch-over.

## Numbers

**The number types are flat siblings (P-43).** The record calls this choice route A, and calls the nested tower that was not chosen route C. The record still calls the number and order traits "the tower". That word does not mean that they nest.

**Under walk a numeral has a run-time class.** The checker types an integer numeral as `IntLiteral`, a sibling under `Number` that converts to the integer types, `QQ` and `RR64` (P-76). Walk gives a numeral the class `Int`, `Long` or `BigNum` by its value. These classes stand for `ZZ32`, `ZZ64` and `ZZ`, but a generic instantiates at the class: `Box[\Int\]` is not `Box[\ZZ32\]` (row 364). Walk answers `IntLiteral`'s arithmetic as a `ZZ32` (row 578). The library's factories `array1` and `array2` give a `Vector` or `Matrix` only at the eight number types, not at a user subtype of `Number`. Elsewhere they give a plain array, whose `+` and unary `-` fail dispatch under walk. Under walk, an inferred element type is a run-time class, so they give a plain array (row 721). Write the static argument.

**Arguments convert by declared coercions, and a generic call promotes.** Walk converts at a call, a typed binding and an assignment, and chooses the coercion by the run-time value; the checker chooses it statically (P-59). Promotion instantiates a generic declaration at the narrowest type into which all its arguments coerce (P-74). So `f[\T\](a: T, b: T)` on a `ZZ32` and a `ZZ64` runs at `ZZ64`. Walk does not promote the elements of a tuple or varargs: it takes their join (rows 395, 511). Where several declarations apply only by coercion and none is more specific, both paths stop: "Ambiguous coercion". Where the tied declarations differ only where the call passes a numeral, the checker reads the numeral as `ZZ32`, or `ZZ64` or `ZZ` where the value does not fit.

**An integer power answers its base's type (P-153).** In the interpreter's library, `^` takes an exponent of any integer type. At a negative exponent, 1 and -1 give their power, 0 raises `DivisionByZero`, and other bases raise `IntegerOverflow`. For a fraction, write `2.0^(-1)`, or a `QQ` base as `(2/3)^(-1)`, not `10^(-k)`. Until the switch-over, the compiler's library has integer powers only at `ZZ32`, `NN32` and `NN64`, each with an exponent of its own type; its `RR64` power takes an `RR64` or a `ZZ32` exponent, a negative one included. Its `ZZ32` power gives 0 at a negative exponent for other bases. At a base of 0 it throws a Java exception that no `catch` sees (rows 441, 523).

## Reductions and comprehensions

A clause form is a reduction or comprehension with generators in brackets, as `SUM[j <- 0#n] f(j)`.

**A reduction's static argument depends on the path.** The checker does not infer it for `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, whose bound names the parameter. Write it in every clause form, as `SUM[\ZZ32\][j <- 0#n] f(j)` (row 731). Other reductions take their bound, or the expected type where the bound does not fit. Walk instantiates a reduction at its value's declared type: a local variable's, or a top-level or local function's return type, also where the clause form ends a block. A method's return type, a field, a top-level variable, a parameter and an assignment do not direct it. Else walk takes the join of the elements' run-time types. If that join is outside the reduction's bound, each `+` runs at its operands' types. An element that does not convert to the instance stops in `__bigOperator`, "body param 1". Departures under walk:

- with no declared type, an empty `SUM` gives the integer 0 (row 716);
- a comprehension inside another clause form is built at its elements' run-time types (rows 20, 717);
- a written static argument that is not a number type ends an empty `SUM` in `CastError` (row 436).

**A reduction without an identity lifts its elements to `Maybe[\R\]` inside the reduction.** `BIG MIN`, `BIG MAX` and the string reduction `BIG //` extend `AssociativeReduction[\R\]`, whose `simpleJoin` takes and answers `R`. `BIG MAX` over a generator still answers `R`. Walk refuses at load a reduction without static parameters that declares `simpleJoin` at `Any` or untyped. A generic one stops at its first join. The team's tests do so: do not copy them.

## Implementation limits

**Walk has no static types until it runs the checker after the switch-over (P-12).** So walk runs programs that the checker refuses. Besides a `Boolean`, it takes a `Maybe` as an `if` condition, `Just` as true and `Nothing` as false. It refuses any other value. The specification and the checker take only a `Boolean`, so do not write a `Maybe` condition. The compiled path's own limits are in `compiler.md`.

**Write every parameter type.** The compiled path refuses a parameter without a type, of a function, a method or a local function: "Missing parameter type for". Walk runs it, except in a method that implements an abstract one (row 405). A component's function that leaves out its return type takes the api's declaration at its parameter types. With none or several, the checker types the body.
