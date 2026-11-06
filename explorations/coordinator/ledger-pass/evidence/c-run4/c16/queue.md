# Queue, chunk c16 (run c-run4, base c124c6b65)

No row held. One question to measure:

- **c16-1.** Row 865: does a `builtinPrimitive` helper binding in an object expression's method also stop 'Variable builtinPrimitive is not defined.' on the compiled path? The row's earlier line said so with no program or output; this pass cut the case from the line for lack of a reproducer (`BuiltinPrimitiveRewriter.java:75-87` at c124c6b65 reaches only trait and object members, so it likely holds). FACTS.md:133 still names it.
  - Default: row 865's present line, as applied: "on the compiled path, a `builtinPrimitive` string naming a helper in a local function is not rewritten into a helper call: ..."; a compiled `XXX` test for the object-expression case, then the case restored to the claim.
  - Needed by: never; the rewrite's fix covers both cases either way.
