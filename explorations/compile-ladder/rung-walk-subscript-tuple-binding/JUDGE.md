# Rung W, the judge's ruling: the skeptic's fix of the tuple binding's numerals

One launch of the judge worked this rung. Head judged: `83e4cbf432`. One fix was contested, `675932404d`; this ruling covers it and nothing else. No build and no test ran for this ruling: it reads the branch, the record, the specification and the code.

## Decision

**Stands.** `675932404d` is upheld; nothing is reverted. The rung lands as the branch holds it. One residue of the fix lands unrepaired and goes to the curator (below, "What lands unrepaired").

## The fix

`DesugarerVisitor.forVarDecl` now binds a tuple binding in two ways (`ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java`):

- a right side that is a tuple expression of as many elements as names, with no varargs and no keywords, becomes one declaration per name, each initialized by its own element, with no temporary (`:868-877`);
- any other right side is bound once to the temporary, now declared at the tuple of the names' types, `Any` for an untyped name, or untyped when no name has a type (`:878-893`), and each name reads its element from it through the worker's `Member` or `Local` reference (`:895-903`).

Its test, `ProjectFortress/tests/TupleBindingNumeralTypesWalk.fss`, failed on the worker's head (SKEPTIC.md, "Finding 1"):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/.../h1 ProjectFortress/tests/TupleBindingNumeralTypesWalk.fss
    # harness-one 2026-11-23T11:38:25Z; tree 9e3a47ac20; nproc=4; ...
    Type mismatch binding 5: ZZ32 (type ZZ32) to un (type NN32)
    Tests run: 1,  Failures: 1,  Errors: 0

## Which claims were right

**The skeptic.**

1. Right: the worker's change was a defect against a decision on record. On the worker's head the temporary was untyped (`DesugarerVisitor.java:868` at `9e3a47ac20`). A top-level cell makes every numeral of its value plain, at its default (`interpreter/env/LazilyEvaluatedCell.java:76`, `theValue = Numerals.plain(v)`, which goes into a tuple: `interpreter/evaluator/values/Numerals.java:250-257`), so `(u: NN32, r: RR32) = (5, 0.5)` reached `u` as a `ZZ32` and stopped. The specification converts a numeral where the declared type of a variable or a field fixes one, "\EXP{n\COLON\mathbb{N}32 = 5} the natural number 5" (`Specification/basic/expressions/literals.tex:199-208`), and P-173 binds walk to it: "walk converts from the exact value at the same places, place by place". A field has the top-level declaration's meanings (`Specification/basic/objects.tex:295-297`), so the object form is the same defect. The base bound each of these (SKEPTIC.md's table).
2. Right: a temporary at the names' types for every right side, the way that keeps W2's wording, refuses `(arr, n): (ZZ32[2], ZZ32) = ([1 2], 3)`, which the base runs. The mechanism is in the code: a cell builds an array literal only where it is the cell's whole value (`LazilyEvaluatedCell.java:71-74`), and `Coercions.coerceTuple` converts a tuple's elements by coercion alone (`interpreter/evaluator/values/Coercions.java:317-334`).
3. Right, and stronger than the skeptic put it: the split follows the team's own code. The checker has the same two cases. For a tuple expression of as many elements as names, it checks each element at its own name's declared type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:250-277`). For any other right side, it checks the whole at the tuple of the declared types (`Decls.scala:280-300`, "Gather declared types of LHS as a big tuple type"). The skeptic cited `:272-277` for the second case, but those lines end the first one. The slip changes no part of the argument. The team's code generator likewise binds a field's tuple expression element by element (`compiler/codegen/CodeGen.java:5312-5318`).
4. Understated: the residue is a regression against the base, not only against the worker's head (below).

**The worker.**

1. Right: the fix departs from fork W2's wording for one shape. W2 reads "Each name of a top-level tuple binding reads its element from the temporary, so the right side runs once" (`explorations/coordinator/CLIMB-BATCH-35.md:448`), and a tuple expression no longer has a temporary.
2. Right: decision 3, the reference built by the desugarer's `Member` or `Local` rewriter, still stands. It serves every right side that is not a tuple expression (`DesugarerVisitor.java:897`).
3. Wrong as a ground for a revert. The rung's section says of its decisions, "None names the mechanism" (`CLIMB-BATCH-35.md:494`). A fork "chooses where the record leaves an implementation open" (`CLIMB-BATCH-35.md:442`). W2's purpose clause, that the right side runs once, still holds: each element of the tuple expression is evaluated once, in the one declaration that it initializes. Against W2's wording stand the specification and P-173, and the specification is the standard (POSITIONS.md, P-25). A revert would land the refusal above for every typed tuple binding of a numeral at a non-default type: `(u: NN32, r: RR32) = (5, 0.5)`, `(un, uq): (NN32, QQ) = (5, 0.1)`, `(en, em): NN32... = (7, 8)`, the `var` form and the field form. A program meets that form more often than any form that the fix leaves refused.

## What lands unrepaired

After the fix, a typed tuple binding stops at load where four things hold together:

- its right side is not a tuple expression of as many elements as names;
- an array literal is written inside that right side;
- the literal is bound to a name declared at an array type;
- the binding is a top-level variable or a field.

An example is `(arr, n): (ZZ32[2], ZZ32) = if flag then ([4 5], 6) else ([7 8], 9) end`.

The base ran it. On the base each name's initializer was the right side's own field at the name's declared type (`DesugarerVisitor.java:872-874` at `13f4fdea75`), and that cell built the literal (`LazilyEvaluatedCell.java:71-74`). The skeptic's correction says so in its message (`git show f39d01a66a`):

    NEW-W-2: under walk an array literal in a
    tuple bound at a tuple type is not built, for a variable on the base and now
    for a tuple binding over an if (tests/XXXTypedTupleArrayLiteralWalk).

SKEPTIC.md calls the failure new only "against the worker's head" ("Failure modes"). In fact it is new against the base too. It is walk's existing gap in typed tuples, row 1105, which the base shows for `t: (ZZ32[2], ZZ32) = ([1 2], 3)`. The fix now reaches the same gap from a tuple binding: walk reads that binding as the checker does, as a binding at the tuple type (`Decls.scala:280-300`). The branch records the gap. It has a row in record.md, the XXX test `ProjectFortress/tests/XXXTypedTupleArrayLiteralWalk.fss`, and a workaround: bind the array to a name of its own.

A second output changes. Where a typed tuple binding's right side is not a tuple expression and does not convert, the message names the temporary, 'Type mismatch binding (5,6) ... to *tuple_<span> (type (NN32,String))' (SKEPTIC.md, "Failure modes"). On the base it named the variable.

**Why not a repair round.** Each way that removes the residue edits a file outside the rung's section. The section's files are `Evaluator.java`, `DesugarerVisitor.java`, the tests and row 152. Each way also changes how every walk binding converts its value:

- (a) `Coercions.coerceTuple` builds an array literal at an array element type, as `LazilyEvaluatedCell.java:71-74` does through `LHSEvaluator.topLevelArray`. This also repairs row 1105's variable form.
- (b) The temporary keeps its value raw, and each name converts its own element. Walk's local tuple binding works this way already: `interpreter/evaluator/BuildLetEnvironments.java:103-118` evaluates the right side once and binds each element through `LHSEvaluator`. This way needs `LazilyEvaluatedCell.java:76` and the field initializer to skip `Numerals.plain` for the temporary: the skeptic's way (d).

The residue is narrow and recorded, and both ways stay open, so the rung lands now and the residue goes to the curator.

## Points this ruling adds

- A decision taken where nothing on record settles it: a narrow regression against the base lands, the `if` form above, rather than a repair beyond the rung's files. The ways are (a) and (b) above.
- Reserved point, an interpreter output that changed: the residue and the message above, beside those in REPORT.md, "Points to report", 6.

Neither is a step that cannot be undone, nor one against a decision on record. Neither holds the push.
