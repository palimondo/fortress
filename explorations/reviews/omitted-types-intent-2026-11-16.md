<!-- An answer for the curator's two page comments of 2026-11-16 on notes 8 and 9 of the specification's introduction (section 1.1, "types are not specified for all fields, nor for all method parameters and return values"), written 2026-11-16 by a Fable worker, exploring, with nine programs run on both paths: the most favourable reading of what the designers meant by leaving types out, from the specification, the papers, the team's code, tests, library and demos; the team's own examples that leave types out; which parts of the promise are built, which are designed and not built, and which no source of the team describes; one new defect of the compiled checker as a ledger row ready to file; three decisions not taken. No code, test, specification text or record entry was changed. -->

# What the introduction means by types that are left out

Words used here. "Walk" is the interpreter. "The compiled path" is `fortress compile` and `fortress run`. Only the compiled path has a static type checker. An "api" is a component's interface file, as a C header is. "Inference" is the checker working out a type that the program did not write.

## The answer

- The sentences are not simply wrong. They are a promise of which about half was kept.
- The favourable reading is this. A type may be left out wherever something else in the program already states it. The checker copies it from there. The places that can state it are: the api, the declaration that a method implements, the value on the right of `=`, a function's body (for the return type), and the function type that the surrounding code expects. The introduction says "wherever possible", and these are the possible places.
- That reading is built for the api, for the right side of `=` (variables, not fields), for return types, and for a function expression. It is shown in the specification's own examples and not built for a method that implements an inherited declaration. It is written in one sentence and not built for a default value of a parameter.
- One thing in the specification's examples goes beyond that reading: a top-level function such as `f(x) = x^2 + sin x - cos 2 x`, where nothing but the body's use of `x` could give its type. No text of the team says how that would be inferred. The chapter that was to say it stayed a heading. Walk runs such a function only because walk checks no types at all.
- So the fair summary is: true as a design, half built, and overstated for the last case.

## Nine programs

Each program was run on today's tree (`b1e3205e9e`) under walk (`bin/fortress P.fss`) and compiled (`bin/fortress compile P.fss`, then `bin/fortress run P`). A comment marks each place where a type is left out, and gives the line in full.

### 1. The value or the body states the type. Built on both paths.

```fortress
component Built
export Executable

sqr(x: ZZ32) = x x                        (* left out: the return type.  In full: sqr(x: ZZ32): ZZ32 = x x *)
apply(f: ZZ32 -> ZZ32, x: ZZ32): ZZ32 = f(x)

run(): () = do
    n = sqr(6)                            (* left out: the variable's type.  In full: n: ZZ32 = sqr(6) *)
    println n
    println apply(fn k => k + 1, 41)      (* left out: k's type and the result type.  In full: fn (k: ZZ32): ZZ32 => k + 1 *)
end

end
```

- What the words promise: return values and variables without written types.
- What is inferred, and from where: the return type of `sqr` from its body; the type of `n` from `sqr(6)`; the type of `k` from the parameter `f: ZZ32 -> ZZ32` of `apply`, which says what kind of function is expected there.
- Today: walk prints `36` and `42`. Compiled prints `36` and `42`.

This is what Swift and Scala also do for `let n = ...` and for a closure passed to a function.

### 2. The api states the types. Built on both paths.

The api, `Shapes.fsi`, states every type once:

```fortress
api Shapes

object Rect(w: ZZ32, h: ZZ32)
    tag: String
    area(): ZZ32
    scaled(k: ZZ32): ZZ32
end

describe(r: Rect, title: String): String
origin: ZZ32

end
```

The component, `Shapes.fss`, states none:

```fortress
component Shapes
export Shapes

object Rect(w, h)                         (* left out: both types.  In full: object Rect(w: ZZ32, h: ZZ32) *)
    tag = "cm"                            (* In full: tag: String = "cm" *)
    area() = w h                          (* In full: area(): ZZ32 = w h *)
    scaled(k) = k w h                     (* In full: scaled(k: ZZ32): ZZ32 = k w h *)
end

describe(r, title) = title || " " || r.area().asString || r.tag
                                          (* In full: describe(r: Rect, title: String): String = ... *)
origin = 0                                (* In full: origin: ZZ32 = 0 *)

end
```

The program:

```fortress
component UseShapes
import Shapes.{...}
export Executable
run(): () = do
    r = Rect(6, 7)
    println describe(r, "area")
    println (r.scaled(2) + origin)
end
end
```

- What the words promise: fields, method parameters and return values without written types. This program leaves out all three kinds, and an object's parameters too.
- What is inferred, and from where: every type, from the api's declaration of the same name. This is the one rule that the team wrote down (below).
- Today: walk prints `area 42cm` and `84`. Compiled (`fortress compile Shapes.fss`, `fortress link UseShapes.fss`, `fortress run UseShapes`) prints `area 42cm` and `84`.
- The difference between the paths: the compiled checker really gives `k` the type `ZZ32` and checks the body with it (the answer to note 9 measured this: a wrong body is refused). Walk never compares a component with its api (ledger row 841). It runs because it checks nothing.

This answers the question of note 9 for a component: nothing defaults to `Any`. The signature is stated once, in the interface, and not repeated in the implementation.

### 3. The inherited declaration states the types. Shown by the team, built on neither path.

```fortress
component Inherit
export Executable

trait Greeter
    greet(name: String): String           (* the abstract method states both types *)
end

object Polite extends Greeter
    greet(name) = "Good day, " || name    (* left out: both types.  In full: greet(name: String): String = ... *)
end

run(): () = println Polite.greet("Pavol")

end
```

- What the words promise: a method parameter without a written type.
- What the favourable reading infers, and from where: `name: String` and the result `String`, from `Greeter`'s declaration of `greet`, which `Polite` must implement. This is the same copying as in program 2, with the trait in the api's place.
- Today, walk refuses it at load: "Object Polite does not define an abstract method declared in type Greeter: ... greet(String):String". Walk sees the untyped `greet` as a different method.
- Today, compiled refuses it: "Inherit.fss:9:11-13: Missing parameter type for name".
- With `greet(name: String)` written, both paths print `Good day, Pavol`.

The specification's own examples have this shape: `catalyze(reaction)` in trait `Enzyme` and `append(xs)` in object `Cons` (below). Ledger row 405 holds the gap.

### 4. Only the use states the type. Shown by the team, described nowhere.

```fortress
component FromUse
export Executable

f(x) = x x + 1                            (* left out: x's type and the return type.  One way in full: f(x: RR64): RR64 = x x + 1 *)

run(): () = do
    println f(3)
    println f(1.5)
end

end
```

- What the words promise: a parameter without a written type.
- What could be inferred, and from where: nothing states the type of `x`. The only evidence is the body, `x x + 1`: `x` must be something that can be multiplied by itself and added to `1`. Many types can: `ZZ32`, `RR64`, `ZZ`, `QQ`. No text of the team says which one the checker would choose, or whether `f` would become generic.
- Today, walk prints `10` and `3.25`. It calls `f` once with an integer and once with a float, and looks up each `+` at run time from the values. That is the absence of a check, as in Python. It is not inference.
- Today, compiled refuses it: "FromUse.fss:4:3: Missing parameter type for x".

The specification's overview shows exactly this shape: `f(x) = x^2 + sin x - cos 2 x`.

### 5. A field's value states its type. Written, built under walk only.

```fortress
component Field
export Executable

object Counter(start: ZZ32)
    step = 2                              (* left out: the field's type.  In full: step: ZZ32 = 2 *)
    next(): ZZ32 = start + step
end

run(): () = println Counter(40).next()

end
```

- What the words promise: a field without a written type.
- What is inferred, and from where: `ZZ32`, from the value `2`, by the same rule as the variable `n` in program 1.
- Today: walk prints `42`. Compiled refuses it: "Field.fss:5:5-100: Must provide type for initializer List(step)" (ledger row 837). The same line at the top level of a component, `limit = 40`, compiles and runs.

### 6. A parameter's default value states its type. Written in one sentence, built on neither path.

```fortress
component Keyword
export Executable

scale(x: ZZ32, factor = 3): ZZ32 = x factor   (* left out: factor's type.  In full: factor: ZZ32 = 3 *)

run(): () = println scale(14)

end
```

- What is inferred, and from where: the type of `factor` from its default value `3`.
- Today, walk stops: "The number of parameters (2) does not match with the number of arguments (1)". Compiled refuses it: "Missing parameter type for factor". Parameters with default values are built on neither path (ledger row 652), so this case cannot run whatever is inferred.

### 7. A function expression with nothing around it. Refused when compiled.

```fortress
component FnNoContext
export Executable

run(): () = do
    inc = fn k => k + 1                   (* left out: k's type, and nothing around states it.  In full: fn (k: ZZ32) => k + 1 *)
    println inc(41)
end

end
```

- This is program 4 in small. Here no surrounding code says what function is expected, so only the use `k + 1` is left.
- Today: walk prints `42`. Compiled refuses it: "Could not determine all parameter types of function expression."
- Swift and Scala refuse the same line for the same reason.

### 8 and 9. The specification's own examples, run as they are

`SpecData/examples/preliminaries/Overview.Rendering.a.fss`, which the overview prints:

```fortress
f(x) = x^2 + sin x - cos 2 x              (* left out: x's type and the return type.  One way in full: f(x: RR64): RR64 = ... *)
run() = println (f 3)
```

- Walk prints `8.180949721409501`. Compiled refuses it: "Missing parameter type for x".

`SpecData/examples/basic/Object.Decl.Cons.fss`, which the chapter on objects prints:

```fortress
trait List[\T\]
  append(List[\T\]):List[\T\]
end
object Cons[\T\](first:T, rest:List[\T\])
  extends List[\T\]
  cons(x) = Cons(x,self)                  (* left out: x's type and the return type.  In full: cons(x: T): Cons[\T\] = ... *)
  append(xs) = Cons(first,rest.append(xs))  (* In full: append(xs: List[\T\]): List[\T\] = ... *)
end
run() = ()
```

- `append(xs)` is program 3's case: the trait `List` states the type.
- `cons(x)` is program 4's case: only the use `Cons(x, self)` says that `x` is a `T`.
- Walk loads it and runs the empty `run`. Compiled refuses it: "Object.Decl.Cons.fss:24:8: Missing parameter type for x".

## The team's own examples that leave types out

This section answers note 8: where did the designers themselves leave types out, and why.

**The reason they give.** The introduction's next paragraph gives it: "These design decisions are motivated in part by our goal of making the scientist/programmer's life as easy as possible without compromising good software engineering. In particular, they allow us to write Fortress programs that preserve the look of standard mathematical notation." (`Specification-1.0-frozen/preliminaries/intro/nutshell.tex:88-95`; the same text in `Specification/`). The aim is that a formula in a program looks like the formula in the paper. A mathematician writes f(x) = x² + sin x − cos 2x and does not write the type of x.

**In the specification's example programs.** 16 of the 133 example files under `SpecData/examples/` declare a function or method with an untyped parameter (my count, by a search for a declaration line whose parameters are all bare names; `self` alone and `run(args)` not counted, so it is a lower bound). The clearest:

- `f(x) = x^2 + sin x - cos 2 x` (`preliminaries/Overview.Rendering.a.fss:19`, printed at `Specification-1.0-frozen/preliminaries/overview.tex:488-494`). It is there to show how source text is rendered as mathematics. Left out: the type of `x` and the result. Source of the type: only the use. Walk runs it; compiled refuses it.
- `factorial(n) = PROD[i <- 1:n] i` (`preliminaries/Overview.Expression.big.fss:18`, printed at `overview.tex:1007`). Left out: the type of `n` and the result. Source of the type: only the use. Walk runs it. Compiled refuses the component, first for another reason: the compiled path's library has no `PROD` yet ("Operator BIG juxtaposition is not defined").
- `catalyze(reaction) = reaction.accelerate(reactionSpeed())` in trait `Enzyme` (`basic/Trait.Method.e.fss:29`, printed at `Specification-1.0-frozen/basic/traits.tex:536-544`). The trait `Catalyst` above it declares `catalyze(reaction: Reaction):()`. The text says that `Enzyme` "declares the concrete method `catalyze` which is inherited as an abstract method from its supertrait `Catalyst`". Left out: the parameter's type and the result. Source of the type: the inherited declaration. Walk loads it (the example calls nothing); compiled refuses it, "Missing parameter type for reaction".
- `cons(x)` and `append(xs)` in `Cons` (program 9; `Specification-1.0-frozen/basic/objects.tex:224-231`).
- Hello, world. The overview says of `run(args)`: "Note that the parameter `args` does not include a declaration of its type. In many cases, types can be elided in Fortress and inferred from context. (In this case, the type of `args` is inferred based on the program's export statement ...)" (`overview.tex:70-79`), and again: "The definition of `run` in `HelloWorld` need not include declarations of the parameter type or return type of `run`, as these can be inferred from the definition of API `Executable`" (`overview.tex:301-305`). Source of the type: the api. This is program 2's case, and it is built. Every program of the team that writes `run() = ...` uses it.

**In the team's library, which walk runs.** The interpreter's library leaves parameter types out in small helper functions. Examples:

- `Library/Generator22D.fss:149-153`: `est_n(u) = narrow(|\ SQRT(2 u) /|)`, `ss(n) = ((n-1) n) DIV 2`, `fst(a,b) = a`, `snd(a,b) = b`; `:265-266`: `zipWith(f, a, b) = a.ivmap(fn (ij, v) => ...)`.
- `Library/PrefixMap.fss:356-357`: local functions `adHocMapThis(p,m) = m.mapFilter(fn (k,v) => doThis(p||k, v))`.
- `Library/Format.fss:263`: `getPlain(arg):String = arg ""`.
- In all of these the only source of the type is the use (program 4's case). They run because walk checks nothing. 5 of the 64 files under `Library/` have such a line (same search): these three, `Generator2.fss:79` and `ChunkedSparseArray.fss:30`.

**In the team's demos.** 12 of the 62 demo programs have such lines. They are written like the formulas they compute:

- `ProjectFortress/demos/npbft.fss:77-78` (a fast Fourier transform): `fft1(u, n1) = fft1core(u, n1, 0, 1, -1, array[\Complex\](n1))`; `:132`: `bar2(x, n) = if 0 <= x < (n DIV 2) then x^2 else (x-n)^2 end`.
- `ProjectFortress/demos/BiCGSTAB.fss:200`: `dot_product(u, v) = SUM [i <- (1 + imax jmax)#(imax jmax kmax)] u[i] v[i]`.
- `ProjectFortress/demos/tictactoe.fss:218`: `isNo(x) = (x = "no")`.
- I did not run the demos. They were written for walk. The compiled checker refuses an untyped parameter wherever it meets one, so it would refuse each of them at that line.

**In the team's tests of the compiled checker.** One test of the team leaves every type out on purpose: `ProjectFortress/compiler_tests/Compiled5.bk.fss` with the api `TypesInAPI.fsi`. The api declares `m(s: String): ()`, `object O(s:String, t:ZZ32)`, `foo: String -> ()`, `x: ZZ32`; the component writes `m(u) = ()`, `object O(s, t)`, `foo(s) = ()`, `x = 0`. It came with the code that copies types from the api (commit `084b460abd`, 2009-07-18, sukyoungryu, "[static checker] Implemented a type extractor from exported APIs. Added a test."). This is program 2's case.

**In the papers and talks.** I found no example there that leaves a parameter's type out and offers it as good practice.

- The type group's papers (`Papers/Types/`, `Papers/Dispatch/`, `Papers/Welterweight/`) write every parameter type in every declaration. Their subject is overloading, where the parameter types are what the rules are about.
- Steele's JuliaCon talk of 2016 shows only the variable case: `x = h+1`, with the remark "we see this on whiteboards!", beside the mutable `y:ZZ := h+1`, whose type is required (`research/extracts/SteeleJuliaCon2016-extract.md:247-249`).
- The project's front page of 2011 lists among the features "Static type-checking (but with type inference)" (`research/extracts/fortress-websites-wayback.md:21-25`).

**Why would anyone leave a method's types out?** The team's examples give three reasons, in their own material:

- The types are already stated in the interface (api or supertrait), and repeating them in the implementation is noise. Programs 2 and 3; `run(args)`; `catalyze(reaction)`.
- The line is a formula, and it should read as one. `f(x) = x^2 + sin x - cos 2 x`; `ss(n) = ((n-1) n) DIV 2`.
- The function is a small local helper, used two lines below. `adHocMapThis(p,m)`; `fst(a,b) = a`.

**What a method's parameter could be inferred from.** From the evidence above, in the order of how well the team's sources support it:

1. The api's declaration of the same method. Written as a rule, tested by the team, built.
2. The declaration that the method implements or overrides, in a supertrait. Shown in two printed examples, written as no rule, built on neither path.
3. Its default value, for a parameter that has one. One sentence, not built.
4. The uses of the parameter in the body. Shown in many examples, written as no rule, built on neither path. Walk's running of these examples is not this inference.

## What the designers' texts and code say

### The specification

- The sentence itself: "Although Fortress is statically and nominally typed, types are not specified for all fields, nor for all method parameters and return values. Instead, wherever possible, type inference is used to reconstruct types. In the examples throughout this specification, we often omit the types when they are clear from context." (`Specification-1.0-frozen/preliminaries/intro/nutshell.tex:76-84`; `Specification/preliminaries/intro/nutshell.tex` has the same words). The answer to note 8 records that versions 1.0 alpha, 1.0 beta and 1.0 print it too (`explorations/coordinator/tools/spec-html/answers-2026-11-15.md`, "Note 8"). Two phrases matter for the favourable reading: "wherever possible" and "when they are clear from context".
- The grammar lets the type be left out in these places: a parameter (`PlainParam ::= BindId IsType?`, `Specification-1.0-frozen/basic/functions.tex:85`), a return type (`FnHeaderClause ::= IsType? FnClauses`, `:90`; in a trait, `basic/traits.tex:385-388`), an object's parameter (`basic/objects.tex:111`), a function expression's return type (`basic/expressions/function.tex:30`).
- A variable: "`id = expr` declares `id` to be an immutable variable whose value is computed to be the value of the expression `expr`; the static type of the variable is the static type of `expr`" (`basic/variables.tex:68-75`). In a tuple of variables the types may be given "optionally eliding types that can be inferred from context" (`:107-108`). A field declaration "is syntactically identical to a top-level variable declaration ..., with the same meanings" (`basic/objects.tex:275-277`).
- A parameter with a default value: "If no type is declared for a keyword parameter, the type is inferred from the static type of its default expression." (`basic/functions.tex:171-172`).
- Where a type must be written: a varargs parameter ("cannot be omitted", `basic/functions.tex:183`); an abstract function declaration ("parameter types cannot be omitted", `:385-386`); an abstract method declaration ("parameter types cannot be omitted except for the self parameter", `basic/traits.tex:513-514`); every declaration in an api ("these declarations must include types for all variables, functions, fields, and methods; otherwise the APIs that declare them are not well-formed", `basic/components/type-inference.tex:34-36`). So the design has a clear rule for where types are stated in full: in interfaces and in declarations without a body.
- The one written procedure, "Type Inference for Components" (`basic/components/type-inference.tex:28-46`). Step 1: "All program constructs corresponding to declarations in APIs exported by C are expanded so that they include all types and static parameters included in the exported APIs." Then: "Once C is expanded, type inference is performed over all program constructs that still include elided types." Its first sentence says that the whole-program procedure "has been described" in the chapter on type inference. It had not.
- That chapter, in the Working Draft, is a heading and two notes (`Specification-1.0-frozen/basic/inference.tex:12-27`). The first: "This chapter will include the Fortress static type inference mechanism." The second lists three open points: "There seems to be a circular dependency between inference and juxtaposition disambiguation -- you have to know if the subexpressions have arrow types to disambiguate, but you can't do that without using inference, which requires knowing how the variable of unknown type is used."; "Type Inference (Dan's email titled ``Comments on a first reading of the spec'' on 06/05/07)"; "Do we want to forbid such cases where type inference infers `BottomType`s for static parameters?". The first point is about exactly program 4's case: in `f x`, is `f` a function applied to `x`, or two numbers multiplied? The answer depends on the type of `f`, and if `f` is an untyped parameter, its type depends on that answer. The file's earliest commits in this repository's history are of October and November 2009, by sukyoungryu (`d8859d236f`, `93f5018fd2`, "[spec] Added the technical decisions since F1.0beta and the issues to discuss").
- An escape for the programmer: a type ascription "can be used to provide type information when type inference ... cannot infer a type for an expression" (`basic/expressions/type-annotation.tex:27-29`). So the designers expected inference to fail in places.
- The team's notes on future work put it off: "I don't think we should worry about this too much until we get type inference for function/method calls worked out. -- Victor" (`Specification-1.0-frozen/appendices/future.tex:496-497`).
- The revival's edition keeps all of this text. It adds a chapter on a different inference, the type arguments of a call, and says that "the inference over a whole program of the types that declarations elide ... [is] not yet described" (`Specification/basic/inference.tex:19-25`). It adds one box that says what the compiled path refuses (`Specification/basic/components/type-inference.tex:47-53`; Appendix I, `Specification/appendices/changes.tex:4051-4107`, "The type of a parameter that a declaration leaves out").

### The team's later texts

- The unfinished restart of the specification (2012, `Documentation/Specification/`) has a chapter "Type Inference" that is a heading only (`Prose/Language/type-inference.tick:12`). Its introduction and overview are outlines in comments. Its hello-world program writes `run() = println("Hello, world!")`, with the return type left out (`Code/HelloWorld.fss`).
- The type group's paper on overloading says, in a draft passage that is commented out: "In the Fortress programming language, a variant of local type inference is used by the type checker to infer instantiations of polymorphic function applications." (`Papers/Types/discussion.tick:7`). "Local type inference" is a method of Pierce and Turner (2000). It takes types from nearby code: an expected type flows down into an expression, and a call's type arguments are worked out from its arguments. It never works out a declared function's parameter type from the body. The sentence names what is inferred: the type arguments of calls. It names no inference of parameter types.
- The POPL 2019 paper (one of the team's late positions) presents no static inference: "we do not present a specific static type inference algorithm" (`research/extracts/ParkPOPL2019-extract.md:276-278`). Its calculus writes all parameter types.
- The Welterweight draft's inference is the run-time choice of type arguments at dispatch (`Papers/Welterweight/inference.tick`). It is not about declarations.
- I also checked `Papers/RuntimeInstantiation/`, `Papers/Types/journal/` and `Papers/Dispatch/body.tex` for inference of a declaration's left-out types, and found none. The reading of the 2012 patents (`explorations/reviews/mie-probes/patents-forest-rule.md`) I did not open.

So the team's work on inference from 2009 on went into one thing: the type arguments of a call to a generic, overloaded function. Nothing after the Working Draft takes up the types that declarations leave out.

### The team's code

- Types from the api: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ApiTypeExtractor.scala`, the team's, of 2009 (`084b460abd`). Its header says: "Get types from exported APIs. PropertyDecl is not yet handled. Abstract function declarations coverage is not yet handled. Varargs types are not yet handled." It fills in a parameter's type (`forParam`, `:146-155`), a return type, a field's and a top-level variable's type (`forLValue`, `:157-188`) and an object's parameters. The revival changed how it picks the api's declaration when a name is overloaded (F-254).
- A function expression's parameters from the expected function type: `scala_src/typechecker/impls/Functionals.scala:1845-1857`, with the team's comment "If expecting an arrow type, use its domain to infer param types", and the refusal "Could not determine all parameter types of function expression" when nothing is expected. The team's commit: `cc9221e026`, 2009-07-21, jrhil47, "Parameter types of FnExprs will now be inferred if there is a context for the FnExpr".
- The refusal of every other untyped parameter: `scala_src/typechecker/staticenv/STypeEnv.scala:199-200`, "Missing parameter type for", the team's line (it is in their last commit, `a874948ac`, at `:190-191`). The line at `:75`, for a local function, is the revival's (F-266). The team's code has no comment there that says inference was planned at this point. Two messages of the team's overloading check do speak as if it were expected upstream: "Type checking couldn't infer the type of" a parameter list (`scala_src/typechecker/OverloadingChecker.scala:817`, `:832`).
- A field without a type: refused at `scala_src/typechecker/Thunker.scala:91`, the team's line (row 837).
- Walk has no static types. It runs an untyped parameter with any value (row 176), and treats an untyped method as not implementing a typed abstract one (program 3; row 405).

### Peers, as context only

- Scala, in the team's years (2.7 to 2.9): a method's parameter types must be written. Its result type may be left out, unless the method is recursive. A function literal's parameter types come from the expected type. A method that overrides another does not take its parameter types from it. This is local type inference, the same family as the team's checker.
- ML and Haskell: a function's parameter types are worked out from its body, for the whole program. This works because those languages have no subtyping, and no overloading chosen by argument types as Fortress has. Haskell adds overloading through type classes, and then an instance's methods take their types from the class's declaration, which is program 3's kind of copying.
- Swift, which the curator knows: programs 1 and 7 behave as in Swift. Swift has no case 2, 3 or 4 for a function's parameters.
- The contrast that matters for program 4: Fortress chooses among overloads of `+`, `sin` and juxtaposition by the types of the arguments, and its number types are siblings, not one type. So "the type that the body's uses require" has no single answer, where in ML it has one.

## Built, designed and not built, and described nowhere

Built, on both paths:

- A variable's type from its value, in a block and at a component's top level.
- A function's or method's return type from its body. (For a component's function that an api declares, from the api: F-254.)
- A function expression's parameter types and result from the function type that the context expects.
- Every type of a component's declaration from the api's declaration of it: parameters of functions, of methods and of objects, return types, fields, top-level variables. Walk runs these with no check against the api (row 841).

Designed by the team, in a sentence or a printed example, and not built:

- A method's types from the declaration that it implements in a supertrait. Printed examples: `Enzyme`, `Cons.append`. No written rule. Refused on both paths (row 405).
- A field's type from its value. The rule is the variable's rule. Walk runs it; compiled refuses it (row 837).
- A parameter's type from its default value. One sentence. Refused on both paths, with the parameters themselves (row 652).
- A method of an object that the api declares, where only the api's trait lists the method, and the api's object does not. I measured this while preparing program 2: the compiled checker refuses the parameter. It is the first item again, met through an api.

Described by no source of the team:

- The type of a parameter of a function that no api, no supertrait and no expected type states: a top-level or local helper such as `f(x) = x^2 + sin x - cos 2 x`, and `Cons.cons(x)`. The specification prints such examples and asks for inference "over all program constructs that still include elided types". The chapter that was to describe it is a heading and a note that names an unsolved circle. No paper, no later text and no code of the team takes it up. Walk runs these examples without checking them.

**Is "simply wrong" fair?** By the evidence, no for the sentence, and yes for one expectation that a reader takes from it.

- The sentence says "wherever possible". Read with the component rule, the variable rule and the printed examples, it describes a coherent design: the types are stated once, in the interface or by a value, and the implementation need not repeat them. Most of that is built, and the team built it (2009).
- The sentence, with examples like `f(x) = x^2 + sin x - cos 2 x`, also leads a reader to expect that a free-standing function needs no parameter types. For that the team left examples, an intent and an open problem, and no mechanism. The examples ran in the team's own practice only because their interpreter checked no types. A reader who calls that part unfounded is right about the text as it stands.
- No advanced inference that the curator has missed exists in the sources. What exists is ordinary: copying a type from where it is stated, and taking a type from a value.

## A new defect

The compiled checker stops with a Java exception on an object whose parameter has no type, where no api states it. For a function's parameter it prints a message.

```fortress
component ObjParam
export Executable

object Pair(a, b)                         (* left out: both types.  In full: object Pair(a: ZZ32, b: ZZ32) *)
    sum(): ZZ32 = 2
end

run(): () = println Pair(1, 1).sum()

end
```

- Walk prints `2`.
- `bin/fortress compile ObjParam.fss` prints, with exit code 1:

```
Exception in thread "main" java.util.NoSuchElementException: None.get
	at scala.None$.get(Option.scala:627)
	at com.sun.fortress.scala_src.typechecker.staticenv.STypeEnv$.$anonfun$extractTypeConsBindings$1(STypeEnv.scala:246)
```

- I searched the ledger for `None.get`, `NoSuchElementException`, `extractTypeConsBindings`, "Constructors must have" and "object value parameter without type", and FACTS for the message. Row 405 says that an untyped value parameter "is refused on the compiled path wherever it appears"; here it is not refused, the checker stops.
- The row, ready to file (it passes `ledger.py check --rows` except for its number). Section: "1. Syntax: lexing, expressions and declarations", beside row 405.

```
| ? | the compiled checker stops with a Java exception, `NoSuchElementException: None.get`, on an object whose value parameter has no type and that no exported api declares, where a function's untyped parameter is refused with a message; walk runs the program | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/objects.tex`, "Object Declarations"; `basic/components/type-inference.tex`, "Type Inference for Components" | none | omitted-types note | siblings: 405, 837. `object Pair(a, b) sum(): ZZ32 = 2 end` with `run(): () = println Pair(1, 1).sum()`: `bin/fortress compile ObjParam.fss` prints that exception and a stack, rc 1; walk prints 2. The constructor's arrow type is made with `makeDomainType(...).get` under the comment 'Constructors must have all param types' (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/STypeEnv.scala:244-246` at b1e3205e9e, the team's). Workaround: type each value parameter. Program: `explorations/reviews/omitted-types-intent-2026-11-16.md`, "A new defect". |
```

One observation on an existing row, not a new defect: row 405 says that under walk a method that leaves its parameter's type out and implements an abstract declaration "stops at its first call" with an `InterpreterBug`. Today walk refuses the object at load, with the message of program 3. The answer to note 9 already quotes that message.

## Decisions not taken

These are the curator's. I give the sources and the possible answers, and recommend none.

**1. Whether a method takes its left-out types from the declaration that it implements.**

- Sources: the printed examples `Enzyme` (`Specification-1.0-frozen/basic/traits.tex:536-544`) and `Cons` (`basic/objects.tex:224-231`), in the Working Draft of February 2011 and in the earlier versions; no written rule; no late position of the type group speaks to it; neither path builds it (row 405).
- Possible answers: (a) the text states the rule and both paths build it; (b) the text says that such a method must write its types, and the two examples are changed; (c) nothing changes, and row 405 stays open.
- (c) keeps the current behaviour.

**2. What the specification says of a parameter whose type only its uses could give.**

- Sources: the introduction (`nutshell.tex:76-84`); the component section's last sentence (`basic/components/type-inference.tex:44-46`); the draft notes with the unsolved circle (`Specification-1.0-frozen/basic/inference.tex:15-27`, 2009); the printed examples of program 4's kind; the team's library and demos, which use it under walk; the type group's papers and the POPL 2019 paper, which describe no such inference and write all parameter types (a late position, silent on the question); the compiled checker's refusal, the team's line.
- Possible answers: (a) the text keeps asking for this inference and someone designs it; (b) the text says that such a parameter must write its type, and the examples, the library's helpers and the demos get types; (c) the text says that such a function is checked at each call, or is generic over its parameter's type, which is a new design that no source of the team holds; (d) nothing changes: the text asks for it, says it is not yet described, and the compiled path refuses it.
- (d) keeps the current behaviour. At the switch-over the compiled path takes the interpreter's library. Five of its files have such untyped helpers (above). I did not measure what the compiled checker says of those five.

**3. Whether the introduction's sentence is revised.**

- Sources: as for decision 2; the sentence is the team's in every version.
- Possible answers: (a) it stays as it is; (b) it gets a box, as other passages have, that says which cases are built; (c) its words are changed to name the places a type can be taken from.
- (a) keeps the current text.

## What I did not get

- The email that the draft note cites, "Comments on a first reading of the spec" of 2007-06-05, is not in the repository. It may say what the team thought the inference should be.
- The printed specifications 1.0 alpha and 1.0 beta are not in the tree as sources. If an earlier version had a fuller inference chapter, its text would be the nearest thing to the team's design for program 4's case. I could not check this here.
- I did not run the team's demos or `Compiled5.bk` itself.

## For FACTS

- The compiled checker takes every left-out type of a component's declaration from the exported api's declaration of it: a function's and a method's parameters and return type, an object's value parameters, a field and a top-level variable. A method is covered only where the api's declaration of its own trait or object lists it. What it means: a component may leave all its types to its api on both paths; F-254 states only the return type. Shown by: `Shapes.fsi`, `Shapes.fss` and `UseShapes.fss` of program 2, which print `area 42cm` and `84` on both paths; code `ApiTypeExtractor.scala:52-188`. No test gates the whole of it; `compiler_tests/OmittedReturnTypeFromApi` gates the return type. Detail: this note, program 2 and "The team's code".
- The Working Draft holds one sentence and two printed examples for a method's types taken from an inherited declaration, and none of the team's later texts describes an inference of the types that declarations leave out. Detail: this note, "What the designers' texts and code say".
