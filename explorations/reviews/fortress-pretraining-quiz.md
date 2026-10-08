<!-- What a fresh Opus session believes about Fortress from its pre-training alone, asked on 2026-10-08 at the curator's idea, run as `claude -p` outside the repository with no tools: the prompt and the answer, verbatim. The input to the skills distillation audit, which grades each claim against the record. -->

# Fortress from pre-training: the quiz

## The prompt

> From your own knowledge only, without any tool or search, describe the Fortress programming language that Sun Microsystems Labs designed (2003 to 2012). Write for a programmer who knows Java, Scala, Haskell and Julia and is about to work on Fortress's interpreter, compiler and standard library.
> 
> Cover each of these, and mark every statement with your confidence (sure, likely, guess):
> 1. Why the language exists and what its designers aimed for.
> 2. The type system: traits, objects, generics and static parameters (type, nat, int, bool, opr), variance, exclusion and `comprises`.
> 3. Dispatch and overloading: how a call chooses among declarations, at compile time and at run time.
> 4. Parallelism: which constructs run in parallel by default, `for` loops, tuples, `also`, `atomic`, work stealing, `spawn`.
> 5. Syntax and notation: juxtaposition, operators, Unicode, the mathematical rendering, how a program looks.
> 6. Numbers: the numeric types, literals, overflow, coercions.
> 7. The standard library: arrays, ranges, generators, reductions (`SUM`, `BIG`), its algebraic traits.
> 8. Components and APIs.
> 9. How the implementation was built: interpreter, compiler, target platform.
> 10. The traps: where a programmer who knows the four languages above would most likely assume something wrong about Fortress.

## The answer

# Fortress: a briefing from memory

Everything below comes from memory, with no sources checked. Each statement carries a tag: **[sure]**, **[likely]** or **[guess]**. Treat **[guess]** items as things to look up. Where the spec and the implementation disagree, the source tree is the authority. Large parts of the spec were never implemented, or were implemented only in part.

---

## 1. Why the language exists and what its designers aimed for

- Guy Steele led the design in the Programming Language Research group at Sun Labs. **[sure]** Eric Allen, David Chase, Victor Luchangco, Jan-Willem Maessen and Sukyoung Ryu were core contributors, and Sam Tobin-Hochstadt was among the others involved at various points. **[likely]**
- It began under DARPA's HPCS (High Productivity Computing Systems) program, alongside Cray's Chapel and IBM's X10. **[sure]** Sun was not funded for the program's final phase, around 2006, but kept the project going as open-source research. **[likely]**
- Its slogan was "to do for Fortran what Java did for C." **[sure]** The name is often explained as a play on "secure Fortran." **[likely]**
- The design goals were: **[sure]**
  - Code that looks like mathematical notation, so a whiteboard formula and the program are nearly the same.
  - Implicit parallelism by default, so the programmer must opt into sequential execution rather than into parallel execution.
  - A "growable" language, in the spirit of Steele's *Growing a Language* talk. The core stays small, and most features (numbers, arrays, even many operators and reductions) live in libraries written in Fortress.
  - A strong static type system with multiple inheritance of traits and symmetric multiple dispatch.
- Version 1.0 of the specification appeared around 2008. **[likely]** Oracle acquired Sun in 2010. Steele announced in 2012 that active development was winding down. **[sure]** The stated reason was roughly that the hard remaining problems were implementing the type system (generic multiple dispatch with reified types) efficiently on the JVM, and that those problems were not worth more investment. **[likely]**

## 2. The type system

- **Traits** are the unit of inheritance. **[sure]**
  - A trait may declare abstract and concrete methods, including bodies. **[sure]**
  - A trait has no fields, though it can declare abstract getters. **[likely]**
  - Multiple inheritance of traits is allowed: `trait T extends {A, B} ... end`. **[sure]**
- **Objects** are the concrete, instantiable types. **[sure]**
  - An object is a leaf. Nothing can extend an object. **[sure]**
  - An object is either a singleton (`object Empty extends List end`) or parameterized by its fields, which also serve as the constructor: `object Cons[\T\](first: T, rest: List[\T\]) extends List[\T\] ... end`. **[sure]**
  - Fields are immutable unless declared `var` or `settable`. **[likely]**
- **Generic (static) parameters** are written `[\ ... \]` in ASCII and render as ⟦ ⟧ (white square brackets). **[sure]** The kinds are:
  - Types (plain names, optionally with `extends` bounds). **[sure]**
  - `nat n`, `int i` and `bool b`: compile-time values used in types such as fixed-size vectors and arrays. **[sure]**
  - `opr ⊕`: an operator passed as a parameter. Algebraic traits such as `Monoid[\T, ⊕\]` use this to name *which* operation forms the monoid. **[sure]**
  - `dim` and `unit`, for physical dimensions. **[likely]**
  - Extra constraints go in `where { ... }` clauses. **[sure]** Where clauses can also introduce additional type variables, a form of bounded existential or hidden parameter. **[likely]**
- **Variance:** generic types are invariant, and there is no declaration-site `+T` or `-T` as in Scala. **[likely]** Covariant-style APIs are approximated with extra type parameters and `where` constraints. **[guess]**
- **Exclusion** has two forms. **[sure]**
  - `excludes { U, V }` asserts that no type is a subtype of both.
  - `comprises { A, B, C }` declares that every subtype of the trait is a subtype of one of the listed types. It is like Scala's `sealed`, but stated in the type. `comprises { ... }` with an ellipsis exists for hidden or private subtypes. **[likely]**
  - Distinct object types exclude each other automatically, because objects are leaves. **[sure]**
  - Exclusion exists mainly so the overloading checker can prove that two declarations never both apply (see §3). Without exclusion, many reasonable overload sets would be rejected as possibly ambiguous. **[sure]**
- **Tuples, arrows and the top type** are structural and somewhat special.
  - Arrow types are written `A -> B`, and a function can declare `throws`. **[sure]**
  - `()` is the unit/void type. **[sure]**
  - Tuple types are not ordinary trait types. I believe `Any` does not include tuples, so tuples cannot be stored as `Any` like an ordinary value. **[guess]**
- **Contracts** can appear on declarations: `requires`, `ensures` and `invariant`. `property` declarations state algebraic laws, and `test` declarations are their checkable counterpart. **[likely]**

## 3. Dispatch and overloading

- Fortress uses symmetric multiple dispatch. A call chooses among overloaded declarations using the **run-time types of all arguments**, not just the receiver. **[sure]** It is close to Julia in spirit, unlike Java's static overloading.
- **Compile time:** **[likely]**
  - The static argument types determine the set of declarations that are applicable and accessible.
  - The type checker assigns the call a static return type from the most specific *statically* applicable declaration.
- **Run time:** among declarations applicable to the dynamic argument types, the most specific is chosen. **[sure]**
- **Overload-set validity is checked statically, per pair of declarations**, so no run-time ambiguity can occur. **[sure]** For any two overloads of the same name, one of these must hold:
  1. The parameter types exclude each other, so they can never both apply. **[sure]**
  2. One declaration is strictly more specific than the other. **[sure]**
  3. **The meet rule:** a third declaration exists whose parameter type is the intersection of the two, which resolves the overlap. **[sure]**
- **Return-type rule:** if declaration A is more specific than B, then A's return type must be a subtype of B's. This keeps the static type sound under dynamic dispatch. **[sure]**
- Making all of this modular with generics and multiple inheritance was a research problem in itself. There were papers by Allen, Hilburn, Ryu, Steele and others around 2009 to 2011, for example at OOPSLA, on type-checking modular multiple dispatch with parametric polymorphism. **[sure]** Generic overloads need instance-level reasoning: specificity is compared over all instantiations. **[likely]**
- **Functional methods:** a method declared in a trait with `self` in a parameter position is called as a top-level function, `f(x, y)`, not `x.f(y)`. It takes part in overloading with top-level functions of the same name and dispatches on the position where `self` appears. **[sure]** Most operators are defined this way, for example `opr +(self, other: T): T` inside a trait. **[likely]**
- **Dotted methods**, `x.m(y)`, dispatch on the receiver and then overload on the other arguments in the usual way. **[likely]**
- Dispatch on generic type arguments requires reified types at run time, which the JVM does not provide. Erasure was a major implementation pain. **[likely]**

## 4. Parallelism

- The defaults are parallel. **[sure]**
  - **Tuple components are evaluated in parallel**: `(f(x), g(y))`. **[sure]**
  - **Function arguments are evaluated in parallel**, because an argument list is a tuple. **[sure]**
  - **Operands of binary operators** may be evaluated in parallel. **[likely]**
  - **`for` loops are parallel by default.** Iteration order is determined by the generator, and iterations may run concurrently. **[sure]**
  - **Comprehensions and reductions** (`SUM`, `BIG op`) are parallel by default. **[sure]**
- What is sequential: **[sure]**
  - Statements in a `do ... end` block, separated by newlines or `;`.
  - A sequential loop is written by wrapping the generator: `for i <- seq(1:n) do ... end`. **[sure]** There is also `while`. **[sure]**
- **Generators** are `x <- expr`, where `expr` is a `Generator[\T\]` such as a range, array or set. **[sure]**
  - A loop or comprehension can combine several generators and Boolean filters, separated by commas: `for i <- 1:n, j <- 1:m, i ≠ j do ... end`. **[sure]**
  - Library code implements a generator through a `generate` method that takes a reduction and a body function. This is how parallel splitting becomes a library decision rather than a compiler decision. **[likely]** I believe the signature is roughly `generate[\R\](r: Reduction[\R\], body: T -> R): R`. **[guess]**
- **`also`** creates explicit parallel blocks: `do A also do B also do C end`. **[sure]**
- **`spawn e`** creates an explicit thread object. Its result is read with `.val()` or `.wait()`. **[likely]** The exact method names are **[guess]**.
- **`atomic e`** executes `e` as a transaction (transactional memory semantics). `tryatomic` fails instead of retrying. **[sure]** In the interpreter, transactions came from a software TM implementation in Java. I believe it was descended from DSTM2 or similar Sun Labs work. **[guess]**
- **Locality and distribution:** the spec has regions (a tree describing the machine), distributions for arrays, and `at r do ... end` to place computation. **[likely]** These were mostly unimplemented beyond stubs, or only on a shared-memory interpreter. **[likely]**
- **Scheduling** is work stealing. The interpreter ran tasks on a fork/join pool derived from Doug Lea's jsr166y (the precursor of `java.util.concurrent.ForkJoinPool`). **[likely]**
- **Data races are the programmer's problem.** A plain `var` mutated from a parallel `for` loop is racy. Use reductions, `atomic`, or reduction variables. **[sure]** I believe the spec defines "reduction variables": a variable assigned with `+=` inside a loop is treated as a reduction. **[guess]**

## 5. Syntax and notation

- **Two forms of the same program** **[sure]**
  - Source is plain text, either ASCII or Unicode.
  - A tool called **Fortify** renders source as LaTeX for mathematical typesetting.
  - ASCII names map to symbols. For example, `ZZ32` renders as ℤ32, `SUM` as Σ, `[\ \]` as ⟦ ⟧, `<-` as ←, `->` as →, and `NOT` as ¬. **[sure]**
  - You can type the Unicode characters directly instead. **[sure]**
- **Rendering conventions:** **[likely]**
  - All-caps or doubled-letter type names (`ZZ`, `RR`, `QQ`) render in blackboard bold.
  - A trailing `_x` becomes a subscript.
  - Identifiers in certain case styles render in italic, roman or bold.
- **Delimiters are keywords**, not braces: `do ... end`, `if c then ... elif ... else ... end`, `object ... end`, `trait ... end`, `case ... of ... end`, `typecase`, `label ... end` with `exit`. **[likely]**
- **Comments** are `(* ... *)` and nest. **[sure]**
- **Declarations:** **[sure]**
  - `x = 3` is an immutable binding. **[sure]**
  - `var x: ZZ32 = 3` declares a mutable variable. **[likely]** A related form, `x: ZZ32 := 3`, declares a mutable variable with an initializer. **[likely]**
  - `x := e` is assignment. **[sure]** Compound forms such as `+=` exist. **[likely]**
  - `f(x: ZZ32): ZZ32 = x + 1` declares a function. **[sure]**
  - `opr` declares operators: prefix, infix, postfix, and bracket pairs such as `opr |x|`, `⌊x⌋` and `‖v‖`. **[sure]**
- **Juxtaposition** **[sure]**
  - `f x`, `2 x` and `a b` are meaningful, and the meaning depends on types.
  - If the left operand is a function, juxtaposition is **application**.
  - Otherwise it is the **juxtaposition operator**, which is overloadable. On numbers it means multiplication. On strings it means concatenation. **[likely]**
  - Tight versus loose juxtaposition, and the whitespace around it, affects grouping. For example, `sin x y` and `a b+c` versus `a b + c` can parse differently. **[likely]**
- **Whitespace is significant around operators** **[sure]**
  - `a - b` is infix, and `a -b` is application of a prefix `-`, or an error.
  - Infix operators must have symmetric whitespace.
  - `a[i]` is subscripting, while `a [i]` can mean juxtaposition with a one-element array.
  - Newlines can end expressions. A line that starts with an infix operator continues the previous line, but a trailing operator is the safe way to continue. **[likely]**
- **Precedence is not a total order** **[sure]**
  - Only "mathematically conventional" pairs have a defined precedence. Mixing unrelated operators without parentheses is a **static error**; I believe `a ∧ b ∨ c` is rejected. **[likely]**
- **Chained comparisons** such as `a < b ≤ c` mean the conjunction of `a < b` and `b ≤ c`. **[sure]**
- **Syntax extension:** libraries could add new syntax through grammar declarations, which hooked into the parser. **[likely]** It was hygienic and macro-like, built on Rats!-style grammar productions. **[guess]**

A small sketch (approximate):

```
component Hello
export Executable
run() = println "Hello, World!"
end
```

## 6. Numbers

- **Integers** **[sure]**
  - `ZZ32` and `ZZ64` (ℤ32, ℤ64) are fixed-width.
  - `ZZ` is arbitrary precision. **[likely]**
  - `NN32` and `NN64` are naturals. **[likely]**
  - `IntLiteral` is the type of integer literals. **[likely]**
- **Other numeric types**
  - `RR32` and `RR64` are floating point. **[sure]**
  - `QQ` holds rationals. **[likely]**
  - `CC` (complex) is in the spec, and the library implementation was partial. **[likely]**
  - Interval arithmetic was mentioned in the spec. **[guess]**
- **Literals** have their own types and coerce to the context's type. Integer literals have type `IntLiteral` and float literals have type `FloatLiteral`. This allows `x: RR64 = 3`. **[likely]**
  - Radix is written as a subscript: `1010_2`, `FF_16`. **[likely]**
  - Digit grouping exists in the spec. I don't remember the separator. **[guess]**
- **Overflow:** fixed-width integer overflow **throws an exception** rather than wrapping. **[likely]** Some wrapping or modular types may have existed separately. **[guess]**
- **Coercion** **[likely]**
  - Implicit conversions are user-definable through `coerce` declarations in the target type.
  - The spec has detailed rules for resolving coercion against overloading, which essentially prefer no coercion to coercion.
  - The interpreter implemented a subset of these rules. **[guess]**
- **Dimensions and units** **[likely]**
  - Physical dimensions and units were part of the type system in the spec: `dim Length`, `unit meter m`, values like `3 m/s`, and conversion with `in`.
  - The reference implementation largely omitted them, and they were later cut back. **[likely]**

## 7. The standard library

- **Library-first design:** much of the language is written in Fortress library code. **[sure]**
  - The main files are `FortressLibrary` and `FortressBuiltin` (`.fsi` and `.fss`). **[likely]**
  - Primitives call Java through a native or builtin-primitive mechanism, so many library operators bottom out in Java classes. **[likely]**
- **Ranges** **[sure]**
  - `a:b` is a closed range.
  - `a#n` is a range that starts at `a` and has `n` elements.
  - Strided and open forms exist.
  - Ranges are generators.
- **Arrays** **[likely]**
  - `Array[\T, E\]` is the general type. `Array1`, `Array2` and `Array3` are specializations with static `nat` bounds and sizes.
  - Vectors and matrices (`Vector[\T, n\]`, `Matrix[\T, m, n\]`) carry sizes in the type.
  - Array literals use whitespace for columns and newlines or `;` for rows, as in `[1 2 3]`. **[likely]**
  - Default indexing is 0-based. **[likely]** Indexing is `a[i]` and `a[i, j]`. **[sure]**
  - Mutable and immutable arrays both exist.
- **Collections** **[likely]**
  - Lists, sets, maps and multisets exist as persistent or functional structures.
  - Some are implemented as balanced trees with parallel generators.
  - Strings were rope-like and built from concatenation nodes, so juxtaposition concatenation is cheap. **[guess]**
- **Reductions and comprehensions** **[sure]**
  - `SUM[i <- 1:n] a[i]` and `PROD[...]` are reductions.
  - `BIG op [gen] body` reduces with any operator that has a big form. You declare one with `opr BIG ⊕ ...`. **[likely]**
  - Comprehensions build collections: `{ x^2 | x <- S, x > 0 }`, `⟨ ... ⟩` for lists, and `[ ... ]` for arrays. **[likely]**
- **The `Reduction` abstraction** has an empty element, a `join`, and possibly `lift` and `unlift`. Generators are parameterized over it, so one generator implementation serves all reductions. **[likely]**
- **Algebraic traits** **[sure]**
  - The library has a hierarchy parameterized by operator: `Associative[\T, ⊕\]`, `Commutative`, `Identity`, `Monoid[\T, ⊕\]`, `CommutativeMonoid`, `Group`, `Ring` and `Field`, plus ordering traits such as `PartialOrder` and `TotalOrder`. **[likely]**
  - These traits are what make `BIG ⊕` reductions legitimately parallel. Associativity is *declared*, through `property` declarations, rather than proved. **[likely]**

## 8. Components and APIs

- **The two module kinds** **[sure]**
  - An **API** (file extension `.fsi`) contains only declarations, like an interface for a module.
  - A **component** (file extension `.fss`) contains implementations.
  - A component `export`s one or more APIs and `import`s others: `import List.{...}`, `import Foo.{bar, baz}`, and `import api Foo`. **[likely]**
  - A component's code may see only imported APIs, never other components directly. **[sure]**
- **Linking** **[likely]**
  - Components are linked into compound components by matching exports to imports.
  - An `upgrade` operation replaces a component inside a compound one.
  - The spec envisions a persistent, transactional "fortress" store that holds compiled components.
- **The main program** exports `Executable` and defines `run()`. **[sure]** Early versions took `run(args: String...)`. **[guess]**
- **Implementation** **[likely]**
  - The interpreter implemented a simplified version: API and component files found on a path, one component per file, and imports resolved by name.
  - The store and upgrade machinery were mostly not implemented.

## 9. How the implementation was built

- **Language and hosting** **[sure]**
  - Everything was written in **Java**, and targeted the JVM.
  - It was open source under a BSD-style license. It was hosted first on Sun infrastructure (sunsource.net / projectfortress) and later mirrored elsewhere. **[likely]**
- **Front end** **[likely]**
  - The parser was generated with **Rats!** (from Robert Grimm's xtc). It is a PEG/packrat parser, which suits whitespace-sensitive and extensible syntax.
  - AST classes were generated from a declarative description by a tool called **ASTGen**. **[likely]**
  - Some parts were written in Scala later in the project. **[likely]** I believe the type checker and some compiler phases were among them. **[guess]**
- **Static phases** **[likely]**
  - Disambiguation (names versus juxtaposition versus application), operator-precedence resolution, desugaring (generators, reductions and comprehensions into `generate` calls), and type checking with the overloading-validity checker.
  - For long stretches, the interpreter ran with static type checking incomplete or off by default. Dispatch relied on dynamic checks. **[likely]**
- **Interpreter** **[sure]**
  - A tree-walking interpreter over the AST.
  - Parallelism ran on fork/join work stealing. **[likely]**
  - Run with something like `fortress run Foo.fss`. **[likely]**
- **Compiler** **[likely]**
  - Later work, around 2009 to 2012, compiled Fortress to **JVM bytecode** using ASM.
  - It covered a subset of the language and specialized generics by instantiation, to work around erasure. **[guess]**
  - The project ended before the compiler covered the whole language. **[likely]**
- **Test suite:** a large directory of `.fss` test programs with expected output was used as the regression suite. **[likely]**

## 10. The traps

1. **Arguments, tuples and loops run in parallel.** **[sure]** `f(print "a", print "b")` has no defined order. A `for` loop that does `acc := acc + x` is a data race. Use `SUM`, a `BIG` reduction, `seq(...)` or `atomic`. Java habits will break things here.
2. **Juxtaposition is not just function application.** **[sure]** Coming from Haskell, `f x` looks familiar, but `2 x` multiplies, `"a" "b"` concatenates, and the meaning depends on the left operand's type. Also, `f x y` does not curry as in Haskell. **[likely]**
3. **Whitespace changes the parse.** **[sure]** `a -b`, `a[i]` versus `a [i]`, and unbalanced spacing around infix operators all matter. Scala and Java programmers assume whitespace is insignificant.
4. **No global precedence table.** **[sure]** Parenthesize when mixing operators that are not conventionally related. Chained comparisons are conjunctions, not `(a < b) < c`.
5. **Overloading is dynamic multiple dispatch.** **[sure]** This is unlike Java, where overloads are chosen statically. It is like Julia, but **the compiler statically rejects overload sets that could be ambiguous**, whereas Julia raises an ambiguity error only at run time. Expect to add meet declarations or `excludes` and `comprises` to get overload sets accepted.
6. **Functional methods.** **[sure]** A method in a trait with `self` as a parameter is called as `f(x)`, not `x.f()`, and it overloads with top-level functions.
7. **Objects are final and traits have no fields.** **[sure]** Scala users will look for class inheritance or abstract classes with state. There are none.
8. **Generics are invariant**, with no Scala-style `+T` or `-T`. **[likely]** Type parameters are written `[\T\]`, not `[T]`, and `[...]` is indexing.
9. **`=` binds and `:=` assigns.** **[sure]** `x = 5` is an immutable declaration, not an assignment. Writing it on an existing variable is a redeclaration or an error.
10. **Evaluation is strict, not lazy.** **[sure]** Haskell's laziness and purity are absent. Mutation and effects are common, and laziness exists only inside generators by convention.
11. **Fixed-width integers throw on overflow** instead of wrapping as in Java. **[likely]** Literals are not `int` or `Int`: they have literal types that coerce from context. **[likely]**
12. **The spec and the implementation differ.** **[sure]** Dimensions and units, distributions and regions, full coercion rules, the component store and `upgrade` are in the spec but are absent or partial in the code. Check the tests and library source before trusting the spec.
13. **The interpreter can be more permissive than the spec.** **[likely]** Code that runs under the interpreter may not pass the full type checker or the compiler. Don't treat "it runs" as "it's well typed."
14. **The library defines the "language."** **[sure]** Many things that look built in, such as `+` on `ZZ32`, `SUM`, ranges and even some control-like constructs, live in `FortressLibrary`/`FortressBuiltin` and in Java primitives. Changing them means changing library code, and sometimes the Java primitive behind it, not the parser.

**What to verify first:** the exact concrete syntax for variable declarations, the details of `spawn` and reduction variables, the digit-separator syntax, and which phases run in the current build (type checker on or off, interpreter or compiler path).