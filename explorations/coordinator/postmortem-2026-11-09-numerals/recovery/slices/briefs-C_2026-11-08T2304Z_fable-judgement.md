# Briefs to workers, 2026-11-08T2304Z fable-judgement

The Fable judgement's brief (23:04 UTC on 11-08): "Fable judge: the literal design's coherence".

Source: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`. L = 1-based line of the .jsonl. Each entry is the verbatim input of one tool call (Agent, SendMessage, Workflow, TaskStop), every field as written; nothing is cut. Tool results are left out.

## L4987 · 2026-11-08T23:04:22Z · Agent · Fable judge: the literal design's coherence

**description:** `Fable judge: the literal design's coherence`

**subagent_type:** `general-purpose`

**model:** `fable`

**run_in_background:** `true`

**prompt:**

``````
You are the judge of one design question in the Fortress revival, /home/user/fortress. Load the `fortress-repo` skill (/home/user/fortress/.claude/skills/fortress-repo/SKILL.md) and read its `references/revival-changes.md` and `references/specification.md`. The curator (the person in charge) has decided a design for numerals, the numeric literals of a program, and asks you to judge whether it is internally coherent, where it bends the specification, and what test cases pin it, before it is written into the record and planned as a batch. You judge; you write a judgement file; you change nothing else and commit nothing.

## The decision, in the curator's words and the coordinator's condensation (2026-11-08)

1. Where no type is declared, a numeral takes the machine default: an integer numeral becomes `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit, and a numeral with a radix point becomes `RR64`. "We'll go with machine defaults. When the type is not declared." The places that fix no type: an untyped binding `x = 3`, a parameter of type `Any`, a static argument that only the numeral fixes (`Cell(3)`, `<|1, 2, 3|>`), the operands of `SEQV` or `=` with no typed side, a tie between two coercions (a float numeral tied between `QQ` and `RR64` reads `RR64`).
2. Where a type is fixed, the compiler converts the numeral at compile time from its exact value: exactly into the integer types and `QQ`, with one rounding into `RR64` and `RR32` (the Working Draft's "at most one floating-point rounding error"). Walk converts from the exact value at the same places.
3. The numeral types are the Working Draft's: `NaturalNumeral` and `RadixPointNumeral`, below `Numeral`, carrying the Draft's four numbers as fields of the numeral's value, not as static parameters of its type: the digit count `n`, the digits after the radix point `m`, the radix `r`, and the digits read as one integer in that radix `v` (`Specification-1.0-frozen/basic/expressions/literals.tex:83-129`). The implementations' names `IntLiteral` and `FloatLiteral` go.
4. A program's own number type receives a numeral through its coercion from the numeral type, written `coerce(x: RadixPointNumeral)` inside the type, and reads the four numbers; the compiler emits that call once per class, at load, with the numbers as constants. "Coerce is just invocation of the numeric type constructor that gets the constants from the parser." No numeral value lives on past such a call.
5. Sub-choices, taken as defaults for the curator's review: the library's `=` pairs over the numeral types stay and fold into constants; `gg(5, w)` with `gg` overloaded at `(ZZ32, T)` and `(Any, Any)` takes the `ZZ32` declaration; `x = 7/2` stays a `QQ` and a comparison of literals alone folds, so `1/2 = 0.5` is true; a numeral type may be written only as a parameter type, in a coercion or an operator, not as a variable's, field's or return type; an expression of numerals alone folds exactly before the checker; string literals of one text are one object and `"a" || "b"` folds (P-171).
6. The curator's reason: finishing the specification's design for numerals. He weighed and declined the 2012 restart's exact defaults (`ZZ`, `QQ`), because microGPT's untyped hyperparameters (`explorations/run-c4/src/MicroGptFlat.fss:18`) would become rationals and need typed lines, and every untyped index would need `asZZ32`.

## The sources, which you read

- The Working Draft: `Specification-1.0-frozen/basic/expressions/literals.tex:25-26`, `:83-129`, `:132-175`; `Specification-1.0-frozen/basic/expressions/constant.tex:13-60` (static expressions, "not yet supported"); the one use of the numeral types, `Specification-1.0-frozen/advanced-lib/binary.tex:1596-1661`, a coercion and an `opr ||` over `NaturalNumeral[\m, radix, v\]` with `where` clauses that derive a binary word's width from the digit count and the radix; `basic/conversions-coercions.tex:98-101`; `basic/variables.tex:75`.
- The revised text today: `Specification/basic/expressions/literals.tex:149-165`, the revival's box that names `IntLiteral`.
- The 2012 restart: `Documentation/Specification/Prose/Language/Expressions/literals.tick:25`, `types.tick:970-980`.
- The record, through `explorations/coordinator/tools/facts-extract.sh`: `P-26`, `P-74`, `P-76`, `P-165`, `P-168`, `P-171`, `P-172`, `P-40`, `P-41`, `F-169`, `F-57`, `F-73`, and `history:P-76`.
- The reviews: `explorations/reviews/literals-2026-11-08.md` (sections 1.1, 2, 6), `explorations/reviews/literals-one-picture-2026-11-08.md`, `explorations/reviews/literal-fork-2026-11-08.md` (sections 2, 3.6, 4, 5, 6, 7), and the prototype's report `explorations/compile-ladder/plan-29/probes/literal-default.md` (sections 4, 5, 6, 7, 9, 10, 11), whose patch built points 1, 2 and 5 on the compiled side, with `IntLiteral` and `FloatLiteral` as the names.
- The team's words on the two names: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/numeral-names/evidence.md` (a scout's file; the team called the two neither temporary nor final; Maessen's commit of 2009-11-17: "ZZ32 now coerces IntLiteral as described in the spec").

## What you judge

1. **Coherence.** Is the design one rule with one answer for every case? List any case where two of its points give two answers, or where a point is undefined (for example: a numeral at a parameter of type `Number`; a numeral in a tuple at `Any`; a numeral in an `if` join; `-3` as prefix minus on a `NaturalNumeral`; `x = 3` then `x` at a `ZZ64` place, where `x` is a `ZZ32`; a `nat` parameter used as a value; `pi: RadixPointNumeral` in the library's `Constants.fsi`; what `SEQV` answers between two numeral values inside a coercion's body).
2. **Against the record.** Which decisions on record it revises (expected: P-76, P-172, and P-172's clause on places that fix no type), and whether it contradicts any other, with the entry's words.
3. **Against the Draft.** Each sentence of the Draft it keeps as written, each it changes in form only (the four numbers as fields), and each it contradicts (expected: numerals "not directly converted ... polymorphic" at places that fix no type; the binary chapter's static width from the digit count, which fields cannot feed). Say for the binary example what the design can and cannot give it.
4. **The sub-choices.** For each default of point 5, say whether it follows from points 1 to 4, is a free choice, or conflicts with them; where it is free, say which way the Draft, the library's way (P-74, P-165) and the peers point.
5. **The test cases.** List the programs that pin the design on both paths, each with its expected answer under the design and its answer today, grouped: the defaults (`x = 3`, `y = 0.5`, `Cell(3)`, `<|1,2,3|>`, `f(3)` at `Any`, `3 SEQV z`, `1/2 = 0.5`, `x = 7/2`, `1 - b` for `b = 0.9`, `1.0 s`); the typed places (`q: QQ = 0.1`, `r: RR64 = 0.1`, `z: ZZ32 = 3000000000` refused, a 17-digit numeral rounded once, `n: NN32 = 5`); a program's own type (a complex `CC64` from `3 + 4 i` and `3.78 + 3.243 i`; an interval enclosing `0.1`; a bfloat16 rounding once where a double rounds twice, the prototype's `1.00390625000000000001`; a decimal `Dec(314159, 5)` from `3.14159`; a round trip that prints `C.8_16` back as written); equivalence by value (`0.1_2 SEQV 0.5` true, `0.1 = 0.1_16` false, `2.5 SEQV 2.50` true, `"" 2.50` printing); strings (`"ab" SEQV "ab"`, `("a" || "b") SEQV "ab"`); and microGPT's lines (`MicroGptFlat.fss:17-18`, `:77-79`, `:82`, `:59`, `:66`; `MicroGptApl.fss:26-27`, `:106`, `:112`), with the tie rule. Mark each case the prototype already measured.
6. **What stays open** for the curator, as decisions not taken, in one line each.

## Form

Write `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/literal-judgement/JUDGEMENT.md` (create the folder; if writing is refused, return the whole text as your final message). Markdown, lists not tables, plain short sentences, every claim with its source (file:line, entry number, review section). Name the curator "the curator" and the coordinating session "the coordinator". Main text at most 9K characters; an appendix may add citations. End with a summary under 300 words that gives your verdict in one sentence first: coherent as stated, coherent with the changes you name, or not coherent. Final message under 300 words: the file's path and the verdict with the changes, if any.
``````

