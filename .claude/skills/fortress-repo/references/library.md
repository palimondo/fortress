# The library

The library is `Library/` and `ProjectFortress/LibraryBuiltin/`, without the compiler's own files there:

- In `Library/`: the interpreter's prelude, `FortressLibrary.fss` and `.fsi`, and its other components. The compiler's `CompilerLibrary`, `CompilerAlgebra` and `CompilerSystem` are not part of it.
- In `ProjectFortress/LibraryBuiltin/`: `FortressBuiltin`, `NativeArray` and the rest. The compiler's `CompilerBuiltin` is not part of it.
- `LibraryBuiltin/AnyType`, the top type, belongs to both libraries. An edit to it needs the library order (`build-and-caches.md`).
- `Library/incomplete/` is not on the source path (`default_repository/configuration`), so no program can import what it declares. No running program imports `Library/GeneratorLibrary.fss` either. Before you cite a declaration as the library's way, check that a running program can reach it.

`Library/FortressAst.fss` and `.fsi` are generated from `ProjectFortress/astgen/Fortress.ast`. Never edit them by hand.

A `for` loop, a comprehension and a big operator such as `SUM` are calls into the library. The shared desugarer turns a `for` loop into a call of its generator's `loop` method. It turns a comprehension or a reduction into calls of `__generate` and `__bigOperator`. These work on the library's generators and reductions: `trait Generator` and `trait Reduction` in `FortressLibrary.fsi`, and `RangeInternals.fss` for ranges. So a failure inside a loop or a reduction is most often in the library's code, and its fix is a library edit.

## The curator's decisions on the library

Build on these decisions:

- Exclusion (`excludes`, `comprises`) is used all over the library. The compiled checker keeps the multiple-instantiation exclusion rule.
- The numeric tower is flat. The fixed widths, `ZZ`, `QQ`, `RR64` and `RR32` are siblings under `Number`, and each carries its own algebra. A wider type has a `coerce` from each narrower type. Walk converts by coercion at dispatch.
- The implicit bound of an unbounded type parameter is `Any`, which holds tuples, functions and `()`.
- A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.
- A conversion is applied to make a call possible. It never changes which declaration runs if one already fits.
- `ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`.
- Scalar ranges are over `ZZ32` only. A range over another integer type is a static error. Write a wider counter as a `ZZ32` loop that widens its index.
- Fixed-width integer arithmetic raises `IntegerOverflow` on both paths. Code that means to wrap uses the wrapping operators ∔ `DOTPLUS`, ∸ `DOTMINUS` and ⨰ `DOTTIMES`. Parenthesise every such expression fully, because their precedence is stated only among themselves.
- `SUM` and `PROD` are generic over `AdditiveGroup` and `MultiplicativeRing`. If nothing at the call fixes the element type, write it: `SUM[\ZZ32\][j <- 0#n] f(j)`. Under walk, an unwritten element type dies at the first element (ledger row 424).
- A `nat` static parameter is an `NN32` value, and an `int` parameter is a `ZZ32` value. A larger size is refused.

## Designing a change

- Put extensions into this library itself, never into a separate library tree of our own. Do not add a declaration to the compiler's prelude.
- Do not design a fix from a reading of the specification alone, or from a workaround on the user's side.
- If a rule of the language or the checker refuses how you want to write something, find how the library already writes that kind of thing. Do the same.
- When you add a method, choose a dotted method or a functional method as the library does in the same family. The team proposed this rule: an updater, a getter or a setter, indexing included, is dotted, and every other method is functional (`Library/incomplete/Collection.fss`). The family's own practice comes first.
- One type must not declare a dotted method and a functional method of the same name. A dotted method shadows a top-level function of the same name (`overloading.tex`, "Principles of Overloading").
- The name of a new functional method is reserved in every program that imports the library. A program that uses the name for a variable or a parameter is then refused: "Variable even is already declared."
- Before you choose, search the curator's decisions (`records.md`).
- If the library's practice and the specification's text disagree, do as `specification.md`, "When the text and an implementation disagree", says.

## Editing

- A comment after a declaration that ends in an expression or a type becomes part of that declaration's source span. It also becomes part of the unambiguous name made from the span. So a comment-only edit changes the syntax tree. Compare parse trees or diagnostics only after you map the positions back (`explorations/compile-ladder/rung-library-comments/parse-compare.sh` and `remap-lines.py`).
- Put tests of walk's behaviour of the library in `ProjectFortress/tests/`. `library_tests/` holds compiled tests of the compiler's prelude.
