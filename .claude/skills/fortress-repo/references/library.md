# The library

The library is `Library/` and `ProjectFortress/LibraryBuiltin/`, without the compiler's own files there:

- In `Library/`: the interpreter's prelude, `FortressLibrary.fss` and `.fsi`, and its other components. The compiler's `CompilerLibrary`, `CompilerAlgebra` and `CompilerSystem` are not part of it. `FortressAst.fss` and `.fsi` are generated from `ProjectFortress/astgen/Fortress.ast`: edit that file, never these two.
- In `ProjectFortress/LibraryBuiltin/`: `FortressBuiltin`, `NativeArray` and the rest. The compiler's `CompilerBuiltin` is not part of it.
- `LibraryBuiltin/AnyType`, the top type, belongs to both libraries. After an edit to it, also take the compiled path's step (`build-and-caches.md`, "After an edit of the library").
- `Library/incomplete/` is not on the source path (`default_repository/configuration`), so no program can import what it declares. Nothing that the suites or the model program run imports `Library/GeneratorLibrary.fss` either. Before you cite a declaration as the library's way, check that a running program can reach it.

## How loops and reductions call the library

The desugarer, which both paths share, turns these forms into calls of the library:

- `for x <- g do b end` becomes `g.loop(fn x => b)`, a call of the generator's `loop` method. Each further generator nests one more `loop` call inside.
- `while x <- e do b end` becomes `while __whileCond(e, fn x => b) do end`. `if x <- e then ... end` becomes a call of `__cond`.
- A comprehension or a big operator, such as `SUM`, becomes a call of `__bigOperator`, whose argument calls `__generate` on each generator. So does a big operator inside another: no desugaring calls the library's `__bigOperator2`.

These functions work on the library's generators and reductions: `trait Generator` and `trait Reduction` in `FortressLibrary.fsi`, and `RangeInternals.fss` for ranges. `FortressLibrary.fss` also defines `__loop`, but no desugaring calls it. So a failure inside a loop or a reduction is most often in the library's code, and its fix is a library edit.

## The curator's decisions on the library

- Scalar ranges are over `ZZ32` only. A range over another integer type is a static error, and walk stops when it builds one. Write a wider counter as a `ZZ32` loop that widens its index.
- `ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`.
- For arithmetic that wraps on overflow, use the wrapping operators ∔ `DOTPLUS`, ∸ `DOTMINUS` and ⨰ `DOTTIMES`. Parenthesise every such expression fully, because their precedence is stated only among themselves.
- `SUM` and `PROD` are generic over `AdditiveGroup` and `MultiplicativeRing`. Write the element type wherever generators stand in brackets, also where the generators, the body or a declared type fix it: `SUM[\ZZ32\][j <- 0#n] f(j)`. The checker refuses a call without it (ledger row 731). Walk runs such a call at its value's declared type, or else at the join of its elements' run-time types. An empty `SUM` with no static argument written and no declared type gives the integer 0, and an empty `PROD` the integer 1, whatever the body's type (ledger row 716). With a static argument written that is not a number type, such as a user group, an empty or filtered `SUM` ends in `CastError` (ledger row 436).
- An indexed type's index parameter is bounded by `Index` (`revival-changes.md`, "Traits and objects"). `BoundedRange[\I\]` cannot take the bound, because the open range `(:)` stays a range over `Any` (P-56). So its `atMost(n: I): FullRange[\I\]` has the condition `where { I extends Index }`, which each call must meet (`Library/FortressLibrary.fsi`). A type whose static parameter is a range's index type takes the bound too, as `UniformDistribution[\T extends Index\]` over a `FullRange[\T\]` (`Library/Random.fsi`).
- An array's `fill` takes a value, and its `tabulate` a function of the index: `array[\ZZ32\](4).fill(0)`, `array[\ZZ32\](4).tabulate(fn (i:ZZ32):ZZ32 => 10 i)`. The factories that take a function are `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`.

## Designing a change

- Put each extension into this library, outside the compiler's files. This includes an extension that only the model program needs.
- Fix a gap in the library, not by a workaround in the program that meets it. Take the design from the library's practice as well as from the specification's text. If the two disagree, do as `specification.md`, "When the text and an implementation disagree", says.
- If a rule of the language or the checker refuses the way that you want, find how the library writes that kind of thing. Do the same. The checker's refusals of this library reach you through your brief, or through a run of the count stage (`compiler.md`): `fortress typecheck` checks against the compiler's prelude.
- When you add a method, make it dotted or functional as its family in the library does. If the family shows no practice, follow the team's proposal, which no program can import (`Library/incomplete/Collection.fss`): an updater, a getter or a setter, indexing included, is dotted, and every other method is functional.
- A new functional method reserves its name in every program that imports the library. The phase that binds names then refuses each program that names a variable or a parameter after it: "Variable even is already declared."
- A `fail` without a static argument has the result type `Any`. Where it must have a type, write the static argument, as `strToInt` calls `fail[\ZZ32\]`.
- A dotted method shadows a top-level function of the same name (`overloading.tex`, "Principles of Overloading").
- In an api, declare each top-level function and each member of a trait or object at the header that the component gives it. A function's header is its name, its static parameters with their bounds, its modifiers, its `throws` clause, its parameters' modifiers and types, and its return type. A function's parameters' names and a `where` clause do not count, but each static parameter's name counts (ledger row 836). Give an object's value parameters the api's names, because they are its fields (`compiler.md`, "Traps of the compiled path"). In the cases below, change the component's header to the api's, not the api's to the component's. The examples are in `Library/FortressLibrary.fsi` and `Library/FortressLibrary.fss`.
  - The member's body already answers the api's type. `RR64`'s `opr |\self/|`, `opr |/self\|` and `truncate` answer `ZZ64`, because they call `Float`'s natives, which answer `ZZ64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:184-191`).
  - The api cannot name the component's type. `Array2`'s and `Array3`'s `bounds` and `zeroIndices` answered types of `RangeInternals`, which depends on this api. They now answer the api's `CompactFullRange` types, which those types extend.
  - The api's type is wider, and the overrides and bodies use only that type. `DelegatedIndexed`'s `generator` answers the api's `Generator[\E\]`, as `FlatString`'s override does.

  In the api, write `abstract` on each member that the component leaves without a body.
- The compiled checker's export check matches an api member with a component member of the same name and header. It matches a field by its name, its type and its modifiers other than `var`, and an object's value parameter by the same, its name aside. It matches an api's abstract getter by a component field of its name and type that is neither `hidden` nor `private`. It does not match an api's field by a component's getter, so declare such a member as a field (ledger row 842). It also requires a component member for each api member written `abstract`, at the api's header, with a body or without one. Each entry of the check's error names a trait or object and only its first member that differs. After you fix that member, check again to see the next.
- A new overload can make walk refuse every program at load. `interpreter.md`, "What walk checks", lists what walk refuses.
- A new native is a Java class under `interpreter/glue/prim/` (`interpreter.md`, "Natives"), so it is an edit of walk's Java too.
- `interpreter.md`, "The model program", says how to check microGPT under walk.

## Editing

A comment after a declaration that ends in an expression or a type becomes part of that declaration's source span. It also becomes part of the unambiguous name made from the span. So a comment-only edit changes the syntax tree. Before you compare parse trees or diagnostics across such an edit, map their positions back to the lines before the edit. Three removed scripts did this: `parse-compare.sh`, `ast-compare.py` and `remap-lines.py`. Print one with `git show ab067d9b6^:explorations/compile-ladder/rung-library-comments/<name>`.
