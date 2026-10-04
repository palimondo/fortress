# The library

The one library is `Library/` (the interpreter's prelude `FortressLibrary.fss`/`.fsi` and its other components) and `ProjectFortress/LibraryBuiltin/` (`FortressBuiltin`, `NativeArray`, `AnyType` and the rest). Walk runs it today. The goal is that the compiled checker accepts it and the compiler compiles it (the switch-over), and the compiler's own prelude (`CompilerLibrary`, `CompilerBuiltin`, `CompilerAlgebra`) is deleted then. Until then:

- No declaration goes into the compiler's prelude. Extensions go into this library itself, never into a tree of our own.
- The checker count and the distance measure how far the checker is from accepting this library, and every edit here can move them: run each once on your final code (`checker-measurements.md`).

## The library's own way first

The library's practice is the standard. Before designing a change, study the existing parts of the library for the same family of declarations, and use their patterns to extend it in its own way. No fix is designed from a reading of the specification alone or from a user-side workaround. A rule that refuses something is answered with how the library gets around it. Search the decisions on record before choosing (`area-records.md`).

What the library already decided:

- Exclusion (`excludes`, `comprises`) is used all over the library. The compiled checker keeps the multiple-instantiation exclusion rule.
- The numeric tower is flat: the fixed widths, `ZZ`, `QQ` and `RR64` are siblings under `Number`, each carrying its own algebra, and a wider type has a `coerce` from each narrower one. Walk converts by coercion at dispatch.
- The implicit bound of an unbounded type parameter is `Any`, which holds tuples, functions and `()`.
- A type parameter that a call's arguments do not fix takes its bound, never `Bottom`.
- A conversion is applied to make a call possible and never changes which declaration runs when one already fits.

These are decisions on record; they are not re-opened.

## Editing

- After an edit, walk re-reads the file on its next run: nothing to rebuild. The compiled path does not link this library yet.
- A comment placed after a declaration that ends in an expression or a type becomes part of that declaration's source span, and of the unambiguous name derived from it. A comment-only edit is therefore not neutral at the level of the syntax tree: compare parse trees or diagnostics only after mapping positions back (`explorations/compile-ladder/rung-library-comments/parse-compare.sh` and `remap-lines.py`).
- `Library/FortressAst.fss` and `.fsi` are generated from `ProjectFortress/astgen/Fortress.ast`: never edit them by hand.
- Natives are `builtinPrimitive("...")` strings naming classes under `interpreter/glue/prim/` (`area-interpreter.md`). The compiled path will need a static helper in `nativeHelpers/` for each; every program's output goes through the native `Writer`, since `println` writes through `stdOut`.
- A team test line that a library change breaks is respelled keeping the value it checks, never deleted, and listed in your report with its before and after.

Tests: walk's behaviour of the library goes in `ProjectFortress/tests/`. `library_tests/` holds compiled tests of the compiler's prelude.
