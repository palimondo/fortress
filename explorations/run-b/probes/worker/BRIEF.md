# Worker brief: reproduce or refute language claims from the specification and your own probes

You are checking claims about the Fortress language as implemented in this tree
(the walk interpreter, JDK 25). You have NOT been told which way each claim was
decided; for each item you are given a GOAL. Try to achieve the goal. Report
what you found, with the specification citation that settles it where one does,
and the probe that demonstrates it.

Rules:
- Work only in `explorations/run-b/probes/worker/`. Write one probe per item,
  `wNN_name.fss` (the component name must equal the file name), and run it with
  `probes/worker/run.sh wNN_name` (which keeps the output in `wNN_name.out`,
  error text verbatim). Keep failed attempts; if you revise a probe, save the
  earlier output as `wNN_name.attempt1.out` and so on.
- Read the specification first: `Specification/**/*.tex` (its TeX sources; the
  table of contents is derived in `explorations/run-b/mechanisms.md` if it
  exists, otherwise grep for `\section`). The library is `Library/*.fss` and
  `Library/*.fsi`. `explorations/fortress-gap-ledger.md` is a ledger of earlier
  findings you may consult and cite by row number.
- Do NOT read `explorations/run-b/src/`, `explorations/run-b/probes/*.fss`
  outside your own directory, `explorations/run-b/probes/*.out`, or any article
  or notes under `explorations/run-b/`: the point is an independent
  reproduction.
- Do not modify anything outside your directory. Do not run the test suites.
- Environment: `source experiment/env.sh` is done by run.sh. Every probe
  `export Executable` and defines `run(): () = ...`. Facts that save time:
  `x[i][j]` must be written `(x[i])[j]`; a reduction (`SUM[...] e`) used as an
  operand must be parenthesized; all-uppercase words with two or more distinct
  letters are operator names, not identifiers; `var x := e` needs a type
  (`var x: T := e`); getters and setters must precede methods in an object body;
  a local name may not repeat a top-level function name.
- Budget: about 2 to 4 probes per item; if the goal is not reached after that,
  say what you tried and cite the specification section that governs it.
- Deliverable: `probes/worker/REPORT.md` with one section per item: the goal,
  ACHIEVED or NOT ACHIEVED, the probe file(s) and the decisive line of their
  output, the specification citation (path and line numbers), and one sentence
  of interpretation. No other prose.

## Items

G1. In one component, declare a user postfix operator `^T` that transposes
    both a runtime-sized vector (`array[\RR64\](n)`, static type
    `Array[\RR64,ZZ32\]`) and a runtime-sized matrix (`array[\RR64\](n, m)`,
    static type `Array[\RR64,(ZZ32,ZZ32)\]`), by any spec-legal route (two
    overloads, a single generic declaration, dispatch on a marker trait, or
    anything else the specification offers). Goal: `x^T` and `M^T` both run.

G2. Concatenate two runtime-sized matrices side by side with the
    specification's array-pasting syntax `[ A B ]` (basic/expressions/aggregate.tex),
    and stack them with `[ A ; B ]`; and paste two runtime-sized vectors
    `[ u v ]` into a vector bound to a variable whose declared type is
    `Array[\RR64,ZZ32\]`. Goal: each of the three prints the expected array.

G3. Write a postfix transpose directly after a dotted field access, `x.v^T`
    where `x` is an object with a matrix field `v`, so that it parses and runs.

G4. Apply the library's big operator MAX in its prefix form, `BIG MAX g`
    (no generator clause), to a user object that is a `Generator[\RR64\]`
    (for example one extending `ZeroIndexed[\RR64\]` and
    `DelegatedIndexed[\RR64, ZZ32\]`). Goal: it returns the maximum element.

G5. Build a `Map[\String, Array[\RR64,(ZZ32,ZZ32)\]\]` whose values are
    matrices of DIFFERENT shapes (2x3, 4x3, 3x5) with a map comprehension
    `{ k |-> f(k) | k <- keys }` (with or without static arguments). Goal: the
    comprehension evaluates and the map prints its three keys.

G6. Use the specification's constant pi (basic/expressions/literals.tex,
    "the object named pi") in an expression, by any spelling the specification
    or the library provides.

G7. On one user object, declare two subscript methods that are both usable on
    runtime values: `opr [ts: List[\ZZ32\]]` and `opr [r: Range[\ZZ32\]]`
    (or `Generator[\ZZ32\]` for one of them). Goal: `x[<|1,2|>]` and `x[0#2]`
    both dispatch.

G8. Write a list concatenation `a || b` that spans two source lines (the `||`
    at the end of the first line, or at the start of the second, or any other
    arrangement) inside a function body. Goal: find every arrangement that
    parses; report which do not.

G9. Declare a `value object` (basic/objects.tex, Value Objects) with an array
    field and a closure field; construct two instances from equal arguments and
    compare them with `===` (basic/objects.tex, Object Equivalence). Goal:
    report what `===` returns for the two instances and for an instance
    against itself.

G10. Declare a function with a `requires` contract on its arguments'
    lengths and call it with arguments that violate it; and declare a
    top-level `property` (basic/tests.tex) and run the program. Goal: report
    what the interpreter does with each.

G11. Declare `w: Array[\RR64,ZZ32\] = [ 1.0 2.0 ]` (an array literal with the
    runtime-sized array type on the left) and then print `w`. Goal: `w` prints.

G12. Overload a nullary big operator: after
    `import FortressLibrary.{...} except { opr BIG + }`, declare
    `opr SUM(): BigReduction[\Any,Any\]` over a reduction whose `join(a, b) = a + b`
    and ALSO a prefix `opr SUM(x: T): U` for a user object type `T`. Goal:
    `SUM[i <- 1:4] i`, `SUM[t <- 0#3] nodes[t]` over user objects with `+`,
    and the prefix `SUM x` on a `T` all work in one component.

G13. Give an object a field `var adj: Maybe[\T\] := Nothing[\T\]`, a
    `getter grad(): T` that returns a fresh zero when `adj` is `Nothing`, and a
    `setter grad(x: T)`; then write `obj.grad += y` twice. Goal: the second
    read returns the accumulated value.

G14. Declare a function `f(v: RR64, k: RR64 -> (), cs: Node...)` whose
    trailing varargs parameter has a trait type, and call it with zero, one,
    two and three objects of different types extending that trait, each also
    passing a closure. Goal: all four calls run and the varargs arrive as a
    generator of `Node`.

G15. On a user object with a matrix field, declare
    `opr [_: TrivialOpenRange, c: Range[\ZZ32\]]` and call it as `q[:, 1#2]`.
    Goal: the call dispatches and the range's bounds (`c.lower`, `|c|`) are
    readable.

G16. Declare a top-level `epsilon: RR64 = 10.0^(-5)` and an object with a
    field named `epsilon`; and separately a top-level function `rows(x)` and a
    function whose parameter is named `rows`. Goal: report which of the two
    shadowings the interpreter accepts, with the specification's rule
    (basic/declarations.tex, the section on shadowing).

G17. Import both `Set.{...}` and `Map.{...}` into one component and use
    `BIG UNION[\String, RR64\][k <- keys] {[\String, RR64\] k |-> 1.0 }`.
    Goal: it evaluates.

G18. Apply a prefix operator inside a juxtaposition, `"text " SQRT(d)` and
    `a SQRT(b) c` (as in `std SQRT(-2 log u) cos(2 pi u2)`). Goal: find the
    spellings that parse.
