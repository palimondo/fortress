# The library

The library is `Library/` and `ProjectFortress/LibraryBuiltin/`, without the compiler's own files there:

- In `Library/`: the interpreter's prelude, `FortressLibrary.fss` and `.fsi`, and its other components. The compiler's `CompilerLibrary`, `CompilerAlgebra` and `CompilerSystem` are not part of it.
- In `ProjectFortress/LibraryBuiltin/`: `FortressBuiltin`, `NativeArray` and the rest. The compiler's `CompilerBuiltin` is not part of it.
- `LibraryBuiltin/AnyType`, the top type, belongs to both libraries. An edit to it needs the library order (`build-and-caches.md`).

`Library/FortressAst.fss` and `.fsi` are generated from `ProjectFortress/astgen/Fortress.ast`. Never edit them by hand.

## The curator's decisions on the library

Build on these decisions:

- Exclusion (`excludes`, `comprises`) is used all over the library. The compiled checker keeps the multiple-instantiation exclusion rule.
- The numeric tower is flat. The fixed widths, `ZZ`, `QQ`, `RR64` and `RR32` are siblings under `Number`, and each carries its own algebra. A wider type has a `coerce` from each narrower type. Walk converts by coercion at dispatch.
- The implicit bound of an unbounded type parameter is `Any`, which holds tuples, functions and `()`.
- A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.
- A conversion is applied to make a call possible. It never changes which declaration runs if one already fits.

## Designing a change

- Put extensions into this library itself, never into a separate library tree of our own. Do not add a declaration to the compiler's prelude.
- Do not design a fix from a reading of the specification alone, or from a workaround on the user's side.
- If a rule of the language or the checker refuses how you want to write something, find how the library already writes that kind of thing. Do the same.
- Before you choose, search the curator's decisions (`records.md`).
- If the library's practice and the specification's text disagree, do as `specification.md`, "When the text and an implementation disagree", says.

## Editing

- A comment after a declaration that ends in an expression or a type becomes part of that declaration's source span. It also becomes part of the unambiguous name made from the span. So a comment-only edit changes the syntax tree. Compare parse trees or diagnostics only after you map the positions back (`explorations/compile-ladder/rung-library-comments/parse-compare.sh` and `remap-lines.py`).
- Put tests of walk's behaviour of the library in `ProjectFortress/tests/`. `library_tests/` holds compiled tests of the compiler's prelude.
