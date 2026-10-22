# What the revival changed in the team's Fortress

This part gives the departures of revived Fortress from the team's Fortress, and from what you expect from Java, Scala, Haskell or Julia. The team left three forms that disagree: the specification, walk with the interpreter's library, and the compiled path with the compiler's library. The rules below resolve them. Read the part whole, after `SKILL.md`, before work.

Each rule states the tree as it stands. A rule that names a POSITIONS entry (P-N) states a decision of the curator. Build on a rule without one, but do not cite it as a decision. Question a rule only on new evidence (`SKILL.md`, "When to explore"). Most rules follow the type group's later texts over the specification's early text (P-26; `exploring.md`). Appendix I keeps the specification's original text (`specification.md`).

A ledger row names each known departure of walk or the checker from a rule. If a change is not here, search FACTS and POSITIONS (`records.md`) before you call a disagreement a conflict. An old note, a team test and your training can be right about the team's walk and wrong here: the number types do not nest, and walk converts arguments.

## Dispatch and overloading

**Overloads may differ in their static parameters (P-45).** A declaration's declared domain is the set of argument types that its declared parameter types accept, at every instance within its bounds. Both paths apply the overloading rules of `SKILL.md` to declared domains. A return type must fit at every instance: a pair that fits at one instance only is invalid (row 536). The Working Draft's ban on such pairs is gone.

**Exclusion is read over the whole tuple of parameter types (P-152).** A value of both domains has one instance of each generic type at each position, so those instances' static arguments are equal. The domains exclude where these equalities cannot hold together, or where some position excludes at the instance that they force. So `o[\T\](x: P[\T\], b: Box[\T\])` beside `o[\T\](x: Q[\T\], b: Box[\T\])`, with `P[\T\] excludes { Q[\T\] }`, is valid. Do not read exclusion position by position, as the team's walk did. Both paths refuse a pair where the equalities fix one declaration's static parameter and leave one of the other's free.

**Walk chooses by declared parameter types, never by the order of the declarations.** It infers a dotted generic method's static arguments from the arguments' run-time types, as for a generic function, also among overloads. A call with an argument outside a bound fails, "Cannot unify". Do not reorder declarations to steer dispatch.

**Walk's load check is not the specification's verdict.** It refuses some valid pairs and loads some invalid ones, and the checker differs from it on others (rows 539, 416, 786, 412, 759, 779, 780, 788, 787). Walk compares two functional methods of a generic trait at each call, not at load (row 780). Before you change code to pass walk's check, or take its acceptance as proof, find the row in `interpreter.md`, "What walk checks".

**Two functional methods with equivalent parameter types are duplicates, wherever `self` stands.** So `f(self, y: S)` beside `f(x: S, self)` is refused. Abstract declarations count: an abstract and a concrete method with the same parameter types in one trait are refused. An object that inherits an abstract functional method from one trait and its body from another must declare the method itself (P-149), unlike in Scala.

## Traits and objects

**The compiled checker applies the exclusion rule, and walk does not (P-43, P-97).** A type that extends two instantiations of one generic trait runs under walk (row 416) and is refused compiled. Without the rule, such programs die with `IncompatibleClassChangeError`. The Working Draft's examples that break the rule are marked "Not allowed": do not copy them.

**A `comprises` clause speaks of values (P-60).** Every value of the closed trait is a value of a listed type. So a generic trait need not be listed if every type below it is below a listed type, as `Integral[\I\]` below `AnyIntegral`. Scala's `sealed` lists each direct subtype. Several declarations can cover the meet of two overloads together. Walk checks only the main component's clauses at load.

**`override` widens.** An `override` overrides an inherited declaration only where the inherited parameter types are strictly narrower. To replace an inherited declaration at its own parameter types, declare it again without `override`. A trait's `override` holds for every type below it. The checker checks that an overriding return type is a subtype. Walk refuses at load an `override` that overrides nothing, so a Java-style `override` in the library stops every program. Exceptions: the checker accepts it (row 653), and the code generator refuses the modifier (row 650).

**An object defines an inherited abstract method by bodies that together cover its parameter types (P-147).** One body at those types, or narrower bodies whose union covers them, with `comprises` clauses read. Walk refuses at load an object without static parameters that leaves one uncovered; its limits are in `interpreter.md`. Walk checks no generic object (row 665). The checker refuses a cover that needs a split where a method has static parameters (row 725).

**In a self-typed trait the checker types `self` as the trait met with the implementing type (P-146).** For `trait T[\X extends T[\X\]\]`, or a trait that extends a self-typed trait at `X`, with no `comprises` clause or only `...`: `self` is `T[\X\] & X` in `T`'s bodies, and signatures keep `T[\X\]`. A type that extends `T[\A\]` and is not an `A` is refused. So `floor(self): I = self` needs no cast. Walk is unchanged.

**A tuple is ordered only where each element type extends `StandardPartialOrder`.** This holds for `<`, `<=`, `>`, `>=` and `CMP` on pairs and triples. Walk refuses another element type at the call, also where earlier elements decide, as `(1,()) < (2,())`. It also refuses numbers of two run-time types at one position, as `(1,2) < (1,2.5)` (row 511). Unordered deciding elements give `false`, or `Unordered` for `CMP`. A `List[\E\]` is ordered only where `E extends StandardTotalOrder[\E\]` (P-154), so a list of `RR64` has no order.

## Static parameters, `where` clauses and sizes

**A type parameter that a call does not fix takes its bound (P-48).** The checker takes the intersection of its upper bounds, narrowed by the expected type. Under walk, an F-bounded parameter stays open, printed `OPEN`, as in `BoxU[\OPEN\]`. Walk still gives `Bottom` to a parameter with two unrelated bounds (row 591), to one bounded only through another static parameter (row 612), and to one fixed only by a function expression's result (row 587). Do not expect Scala's `Nothing`.

**Only the checker types a call written as an argument from the enclosing call (P-51).** If the enclosing call fails as written, the checker types the inner call again against each declaration's parameter type. So `takesBox64(mk())` compiles for `mk[\T\](): BoxT[\T\]`. Walk gives an argument no expected type, so there `mk()` takes its bound (row 705).

**Only the `where` forms that the team wrote are built (P-151).** Conditional extension is an `extends` entry under a `where` clause that binds no variable and states only `T extends SomeTrait`. The type then extends the parent exactly where the constraints hold. The other forms:

- a condition of a function or a method on its own static parameters, or of a method on its trait's, checked at a call;
- a type variable of a `where` clause in a `comprises` clause, as `AnyList comprises List[\E\] where [\E\]`.

Only the checker reads them all. Walk and the compiled run time apply a conditional extension at every instance (row 774). Walk runs a dotted call that breaks a method's condition (row 777). The code generator refuses a declaration with a `where` clause of its own (row 701). `compiler.md` gives the checker's gaps.

**Sizes are compared by their written form (P-55).** The checker checks sizes, and the run time carries each as a descriptor. Two sizes are equal when they are written alike after numeral arithmetic: `2 3` is `6`, but `s0 s1` is not `s1 s0`. A static parameter is not known to differ from a numeral, so overloads at `T[\n+1\]` and `T[\0\]` are refused. The checker computes any power of 0, 1 or -1, and other powers up to the exponent 4096; it refuses a larger one. No path computes a negative exponent. A size known only at run time comes from `NatReflect`'s `reflect`. Its `NatParam`, passed where `N[\n\]` is expected, binds `n` at the call. It runs compiled only after the switch-over.

## Numbers

**The number types are flat siblings: route A (P-43).** Route C, the alternative not taken, would keep a nested tower under the forest rule of the team's 2012 patent applications. The record still calls the number and order traits "the tower". That word does not mean that they nest.

**Under walk a numeral has a run-time class.** The checker types an integer numeral as `IntLiteral`, a sibling under `Number` that converts to each number type. Walk gives it the class `Int`, `Long` or `BigNum` by its value, as `ZZ32`, `ZZ64` or `ZZ`. A generic instantiates at that class: `Box[\Int\]` is not `Box[\ZZ32\]` (row 364). `IntLiteral`'s arithmetic answers a `ZZ32` (row 578). `array1` and `array2` give a `Vector` or `Matrix` only at the eight number types, not at a user subtype of `Number`. Under walk, an inferred element type is a run-time class, so they give a plain array (row 721). Write the static argument. This holds until walk runs the checker (P-12, P-76).

**Arguments convert by declared coercions, and a generic call promotes (P-59, P-74).** Walk converts at a call, a typed binding and an assignment, by the run-time value. The checker chooses the coercion statically. Promotion instantiates a generic declaration at the narrowest type into which all its arguments coerce. So `f[\T\](a: T, b: T)` on a `ZZ32` and a `ZZ64` runs at `ZZ64`. Walk does not promote the elements of a tuple or varargs: it takes their join (rows 395, 511). Where several declarations apply only by coercion and none is more specific, both paths stop: "Ambiguous coercion". The checker reads a tie that only a numeral makes as `ZZ32`.

**An integer power answers its base's type (P-153).** In the interpreter's library, `^` takes an exponent of any integer type. At a negative exponent, 1 and -1 give their power, 0 raises `DivisionByZero`, and other bases raise `IntegerOverflow`. For a fraction, write `2.0^(-1)` or `(2/3)^(-1)`, not `10^(-k)`. Until the switch-over, the compiler's `ZZ32` power gives 0 at a negative exponent (rows 441, 523).

## Reductions and comprehensions

**A reduction's static argument depends on the path.** The checker does not infer it for `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, whose bound names the parameter. Write it in every clause form, as `SUM[\ZZ32\][j <- 0#n] f(j)` (row 731). Other reductions take their bound, or the expected type. Walk instantiates a reduction at its value's declared type: a local variable's, or a top-level or local function's return type. A method's return type, a field and a parameter do not direct it. Else walk takes the join of the elements' run-time types; outside the bound, each `+` runs at its operands' types. With neither, an empty `SUM` gives the integer 0 (row 716). A nested clause form is built at its elements' run-time types (rows 20, 717). A written argument that is not a number type ends an empty `SUM` in `CastError` (row 436).

**A reduction without an identity lifts to `Maybe[\R\]`.** `BIG MIN`, `BIG MAX` and `BIG //` extend `AssociativeReduction[\R\]`, whose `simpleJoin` takes and answers `R`. Walk refuses at load a reduction that declares `simpleJoin` at `Any` or untyped. The team's tests do so: do not copy them.

## Implementation limits

**Walk runs programs that the checker refuses.** It has no static types until it runs the checker after the switch-over (P-12). It takes a `Maybe` as an `if` condition: `Just` as true, `Nothing` as false, and refuses other values. The specification and the checker take only a `Boolean`. A walk run does not prove a program well typed. The compiled path's own limits are in `compiler.md`.

**Write every parameter type.** The compiled path refuses a parameter without a type: "Missing parameter type for". Walk runs it, except in a method that implements an abstract one (row 405). A component's function may leave out its return type only where one api declaration at its parameter types gives it.
