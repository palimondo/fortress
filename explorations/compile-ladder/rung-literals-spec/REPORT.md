# Rung T: the specification of the numeral types, their conversion and default, the fold, and a string literal as one object (rung-literals-spec)

- problem: the specification still gave a numeral the type `IntLiteral`, said that walk gives it `ZZ32` until it runs the checker and that numerals are not directly converted, and said nothing of the default, the fold's result or a string literal's identity (`Specification/basic/expressions/literals.tex:132-165` at b430f9f428; `basic/conversions-coercions.tex:74-90`; `basic/inference.tex:183-187`, `:299-317`), against P-173, P-174, P-76, P-172 and P-171 (`explorations/coordinator/CLIMB-BATCH-29.md:613-617`)
- spec: `Specification-1.0-frozen/basic/expressions/literals.tex:83-148` (the Working Draft's numeral types and "Numerals are not directly converted"), the governing passage this rung revises; `Specification/basic/expressions/literals.tex:98-235` after the change
- precedent: the revision form of Appendix I's latest entry, "The conversions between the integer types" (`Specification/appendices/changes.tex:4890-4961` at b430f9f428), and climb batch 28's rung V, whose specification change put its reasoning in its report and wrote no decision record (`explorations/compile-ladder/rung-integer-conversions/REPORT.md:1`)
- deviation: no `decision-record.md` (`fortress-repo`'s `specification.md`, part 4): the brief's section asks for none and allows nothing else under `explorations/`, so this report holds the full reasoning, and the new entries cite it (`Specification/appendices/changes.tex:5123-5126`)
- deviation: the section title "A Numeral Whose Conversions Tie" is kept over a section now wider than ties, since ledger rows and rung N's fork N6 cite it by title (`Specification/basic/inference.tex:302`)
- historical: `Specification/advanced-lib/binary.tex`, `Specification/appendices/changes.tex`, `Specification/basic-lib/numbers.tex`, `Specification/basic/conversions-coercions.tex`, `Specification/basic/expressions/constant.tex`, `Specification/basic/expressions/literals.tex`, `Specification/basic/inference.tex`, `Specification/basic/objects.tex`, `Specification/basic/trait-parameters.tex` (each present at `a874948ac`; `Specification/basic/expressions/literals.tex:1`)

Commit on `wip/rung-literals-spec`: fcf9b18219 (the specification, 9 files, +844 −106). The worktree was seeded by `seed-worktree.sh` (exit 0, 3 s).

## What changed and why

The decided design (P-173, P-174, P-76, P-172, P-171, P-165, P-40) is written into the specification in the revision form (P-96), with two new Appendix I entries and four revised. T writes the decided design, not the rungs' code (fork T3); the rungs' forks whose behaviour the text states are N1-N12, C1-C8, F1-F8 and S1-S2 (`CLIMB-BATCH-29.md:347-395`).

Passage by passage (the full reasoning P-96 asks for; each original is quoted in the entry named):

1. **A string literal, one object** (`Specification/basic/expressions/literals.tex:72-86`, box `:83` to `revival-string-literals`). New: two literals of one text denote one object; a string built at run time is another object unless the operation answers an existing string; strings stay reference objects; a concatenation of literals is a literal. Reason: P-171. Original: none (the Draft is silent; `Specification-1.0-frozen/basic/expressions/literals.tex:57` stands). Way back: each evaluation constructs a new string.
2. **The numeral types** (`literals.tex:98-118`, `:134-150`, box `:139` to `revival-numerals`). New: `Numeral` comprises `NaturalNumeral` and `RadixPointNumeral`; the four numbers `n`, `m`, `r`, `v` are fields, the getters `digits`, `fractionDigits`, `radix`, `digitValue` (`ZZ32`, `ZZ32`, `ZZ32`, `ZZ`); the explicit-radix types fold into the radix, `Literal[\v\]` into the digit count; the team's two draft notes stand and the box answers them. Reason: P-174, fork N1, N3; the judgement's "Changed in form: `:83-129`" (`reviews/literal-design-judgement-2026-11-08.md:24-29`). Original: `Specification-1.0-frozen/basic/expressions/literals.tex:83-86`, `:104-129`. Way back: static parameters again, which no library can declare.
3. **"Numerals are not directly converted"** (`literals.tex:156-163` rewritten; `:164-171` the Draft's `:141-148` kept as written). New: a numeral is converted where it stands, into the type its place fixes, and not before. Reason: P-173; the judgement keeps `:141-148` and contradicts `:132-141` at places that fix no type. Original: `Specification-1.0-frozen/basic/expressions/literals.tex:132-141`, quoted in `revival-numerals`.
4. **The conversion and the default** (`literals.tex:172-235`, box `:230`, replacing the box `revival-numeral-type` of `:149-165` at b430f9f428). New: each of the eight number types coerces from `NaturalNumeral`, `QQ`, `RR64`, `RR32` from `RadixPointNumeral`, exact or one rounding; a place fixes a type when its declared type declares a coercion from the numeral's type or is a numeral type; the places named; the default `ZZ32`, `ZZ64` or `ZZ` by value, `RR64` with a radix point, at an untyped binding, `Any`, `Object`, `Number`, a type parameter without a bound; out of range or rounding to an infinity a static error (fork C3); the default for a numeral only, never an expression of a numeral type; a program's type through its own coercion, refused without one (no chain, fork C4), seeing the four numbers as written, a negative constant through prefix `-` (fork C6), applied once per place, one object per place; a numeral type written only as a parameter type (fork C2), so `pi` and `e` are `RR64`; inside a coercion's body equal and `SEQV` by `v/r^m` (fork N9). Reason: P-173, P-174, P-76, P-172. Way back: in the `revival-numerals` Rationale.
5. **Static rational expressions** (`literals.tex:239-274`, kept, box `:268`): the fold on both paths, `x = 7/2` a `QQ`, `1/2 = 0.5`, at most one rounding. Reason: P-173, F1, F3.
6. **The constant traits and the fold** (`Specification/basic/expressions/constant.tex:80-110`, box `:101`). The Draft's list of trait groups stands; new paragraph: `library` declares no constant trait; an expression of numerals and operators folds exactly into a signed constant, its forms (F1), its three defaults, the operators left alone (F2). Reason: P-173 and the judgement's repair 3; "Changed in form: `constant.tex:44-74`". Original: `Specification-1.0-frozen/basic/expressions/constant.tex:44-56`, quoted. Way back: constant traits declared with static arguments.
7. **The two concatenations** (`constant.tex:113-133`, boxes `:121` to `revival-string-literals` and `:128` to `revival-numerals`): kept, now built (S1, F4). Original: `Specification-1.0-frozen/basic/expressions/constant.tex:75-82`, which stands.
8. **The coercions of the number types** (`Specification/basic-lib/numbers.tex:40-69`, box `:62`): `QQ`, `RR64`, `RR32` from both numeral types, the integer types from `NaturalNumeral`, exact or one rounding, each with its `=` pair (N8), `asFloat` on both numeral types (P-165, fork N4). The original is the revival's own text (`numbers.tex:43` at b430f9f428), quoted in `revival-numerals`.
9. **The box on integers in floating-point expressions** (`Specification/basic/conversions-coercions.tex:84-88`, inside the box `revival-int-float`): `NaturalNumeral` for `IntLiteral`; the checker against the one library and walk convert an integer numeral at `RR64` whatever its value; the sentence on the prelude stands. Original: the revival's own `conversions-coercions.tex:84-88`, quoted.
10. **The default beside coercion** (`conversions-coercions.tex:105-124`, box `:119`): the default is not a coercion; a numeral is applicable without coercion to a parameter of its default type and to one that fixes no type, its conversion into any other type a coercion, so `h(5)` takes `h(x: ZZ32)` over `h(x: Any)` (C4, P-49); a program's type without the coercion refuses it. The Draft's `conversions-coercions.tex:78-81` stands (the judgement's "Changed in form: `:98-101`").
11. **`id(3)`** (`Specification/basic/inference.tex:183-190`, box `:188`): instantiated at the default `ZZ32`, the result coerced (C1).
12. **The numeral section widened** (`inference.tex:305-350`, box `:345`): the default at every place that fixes no type, the receiver whose member the default declares (C1), the narrowest default for a type parameter that several numerals fix (`pick(3, 3000000000)` at `ZZ64`, `<|3000000000, 0.5|>` a `List[\RR64\]`) and for the branches of an `if` or `case` at an untyped binding, the float tie read `RR64`, `round(2.50000000000000001)` 2 (P-172, N12).
13. **String literal, objects chapter** (`Specification/basic/objects.tex:66-74`, box `:71`): one sentence and a box (P-171).
14. **A `nat` parameter used as a value** (`Specification/basic/trait-parameters.tex:105-113`): the text stands; the box says that a `nat` used as a value is a `ZZ32` (P-40, P-173, C5) and quotes what it contradicts by pointing to the entry (fork T2).
15. **The binary chapter** (`Specification/advanced-lib/binary.tex:925`, `:1146`, `:1752`, `:1781`, `:1907`, `:2143`, `:2172`, `:2348`): eight boxes, one after each typeset group over `NaturalNumeral` (the Draft's `:905-914`, `:1117-1135`, `:1674-1735`, `:1750`, `:1860-1868`, `:2006-2099`, `:2114`, `:2271-2281`); the text stands (fork T2).
16. **Appendix I** (`Specification/appendices/changes.tex`): the new entries `revival-numerals` (`:4983-5333`) and `revival-string-literals` (`:5335-5411`), before "Passages not yet revised"; the entries `revival-numeral-type`, `revival-inference`, `revival-asfloat` and `revival-object-kinds` revised (below). The natives effect (`:4693-4694`, the base's `:4673-4674`) is the gather's (fork 4).

## Each entry's parts

- `revival-numerals` (`changes.tex:4993-5379`): Affected sections (`:4987`), Change (`:4994`), Rationale (`:5048`: the decision of 8 November 2026; the Draft's ground, `literals.tex:132-148`; the team's commit `128f313b5b`, "ZZ32 now coerces IntLiteral as described in the spec" (`git log -1 128f313b5b` prints `128f313b5b 2009-11-17 [libraries, codegen] ZZ32 now coerces IntLiteral as described in the spec.`); the double rounding of a 16-bit type; the binary chapter's static width; the default and the exact defaults declined (`literals.tick:25`); the bend of P-26, owned as the revival's finishing of the text; `FIntLiteral.java:21-23`; the fold; the `nat` value; no chain; the way back), Effect (`:5115`: both paths, rows 943, 944, 454, 946, 79, 325, 862, 486; `round`; printing; the inequality; walk's places and rows 395, 511; the prelude until the switch-over, forks F5-F7 and C2's exemption; the class-load call; the model program), Original text (`:5171`: the Draft's `literals.tex:83-86`, `:104-129`, `:132-141`, `constant.tex:44-56`, `conversions-coercions.tex:78-81`, `trait-parameters.tex:83-86`, `binary.tex:1620-1621`, `:1659-1662`; and the revival's own text replaced), Route C (`:5330`, the same).
- `revival-string-literals` (`changes.tex:5380-5459`): Affected sections (`:5339`), Change (`:5341`), Rationale (`:5351`: the decision of 8 November 2026; `literals.tex:25-26`, `literals.tick:29`, `compiler_regressions/seqv.fss:22`; Java's interning; the way back), Effect (`:5375`: row 945; the substring; the library's own literals, S2; how each path does it; the prelude's `===`, row 908), Original text (`:5396`: none; the Draft's `literals.tex:57` and `constant.tex:75-79` stand), Route C (`:5410`, the same).

## Each existing entry or box revised, before and after

- Box `revival-numeral-type` in `literals.tex` (`:149-165` at b430f9f428): before, `IntLiteral` and "The interpreter does not yet ... once it runs with the static types of the compiled type checker"; after, replaced by the box `revival-numerals` at `literals.tex:230`, which names the replaced text.
- Box `revival-int-float` in `conversions-coercions.tex:84-88`: before, "\Library\ give an integer numeral the type \TYP{IntLiteral} ... The interpreter does not yet: it gives an integer numeral outside the range of ZZ32 a wider integer type, and so does not yet convert it."; after, `NaturalNumeral`, one rounding, the checker against the one library and walk converting whatever the value.
- Entry `revival-numeral-type` (`changes.tex:3743-3847`): Change gains a sentence (`:3749-3753`) that the change of `revival-numerals` replaced its text; Effect: a first sentence on the name (`:3776-3778`); the `=` pairs at `NaturalNumeral` (`:3792`); "Inequality is not converted ... converts neither operand" becomes "Inequality is not stated in pairs ... receives the numeral at its default ... `u ≠ 0` is true for a zero `u` of `NN32` or `NN64`" (`:3796-3802`); "`IntLiteral` declares its own zero, one ..." becomes "declared ...; `NaturalNumeral` declares none of them" (`:3805-3809`); "The interpreter still gives an integer numeral the type ZZ32 ..." becomes "The interpreter converts an integer numeral where its place fixes a type, and gives it its default elsewhere" (`:3814-3815`).
- Entry `revival-inference`: Change gains "On 8 November 2026 the rule for numerals widened" (`changes.tex:1963-1966`); Rationale, "The compiled type checker gives a nat or int parameter used as a value the type of a numeral, and the interpreter makes it a ZZ32" becomes "Both implementations make ... a ZZ32 ... where the compiled type checker gave it the type of a numeral before 8 November 2026" (`:2237-2240`); Effect, "the ZZ32 declaration or instance is taken" becomes "the declaration or instance at its default ... ZZ32 ... RR64 for one with a radix point" (`:2258-2261`).
- Entry `revival-asfloat`: Rationale, "and the numeral type IntLiteral" becomes "and the two numeral types NaturalNumeral and RadixPointNumeral" (`changes.tex:2776-2777`); Effect, "the library's 21 coercions between number types" becomes "fourteen coercions between number types, and each of its eleven from the two numeral types" (`:2781-2785`). The fourteen are counted on the base's apis (`grep -n coerce Library/FortressLibrary.fsi ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`: `RR64` 2, `QQ` 5, `NN64` 1, `ZZ64` 2, `ZZ` 4 beside the `IntLiteral` ones), the eleven are N8's.
- Entry `revival-object-kinds`: Effect, "the two numeral objects of the interpreter" and the two numeral departures (walk's float numeral at `RR64`; a numeral compared with a typed value answering differently on the two paths) become the two numeral types as value objects, the conversion on both paths, and P-171's sentence (`changes.tex:4067-4078`).
- Entry `revival-int-float` (`changes.tex:1140-1165`): unchanged; no sentence of it is false (its Effect's Example 1 holds, now for `RR32` too); its box is revised under `revival-numerals`, whose Change says so.

## The failing and the passing run

None: an edit of the specification has no test (`fortress-repo`, `SKILL.md`, "Rules for every task"). The build is the check. On the final text, the commit fcf9b18219's content:

    ( cd Specification/fortress && ./ant genSource && ./ant tex )
    209:BUILD SUCCESSFUL
    210:Total time: 39 seconds
    20701:BUILD SUCCESSFUL
    20702:Total time: 41 seconds
    20703:EXIT=0

    grep -c 'LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply defined\|LaTeX Warning: There were multiply-defined labels\|^! Undefined control sequence' Specification/fortress/fortress.log
    0
    Output written on fortress.pdf (715 pages, 2474084 bytes).

`grep -c '^! [A-Z]' fortress.log` printed 0. The build's files were removed with `git clean -fXq -- Specification`; `Specification/fortress.pdf` is not updated (the brief does not ask).

## Where the change belongs, and the precedent

`fortress-repo`'s `specification.md`, "Changing the text: the revision form": a callout at each changed passage, an Appendix I entry in the revival section, the front matter's paragraph (`Specification/fortress/preamble.tex:54-64`, still true: it names the first revision and the boxes and Appendix I in general), the reasoning in a document (this report). Precedent searched: the latest entries `revival-int-conversions` (`changes.tex:4890-4961` at b430f9f428), `revival-object-kinds` (`:4003-4085`), and `revival-rr32` (`:2661-2737`), whose Original text quotes the revival's own revised text "before this revision", the form followed for every revival sentence replaced here. Callouts in a library chapter follow `Specification/advanced-lib/numbers-advanced.tex:14`. Earlier specification rungs held decision records (`explorations/compile-ladder/rung-spec-numbers/decision-record.md`); the latest, climb batch 28's V, held none.

## What the specification settles

The Working Draft settles the four numbers, the coercion as the library's device and one rounding; P-173 and P-174 settle the default, the places and the program's type; P-171 the strings. Two cases the decided text does not settle are questions below: a numeral at a library type that is neither a number type nor among the places that fix no type (`Index`), and the inequality that the default produces.

## Programs run, old against new

No code changed, so nothing runs new against old. Two probes on the base's code, under walk in this worktree (seeded from the base build), measure what the text states of walk "before this change":

    bin/fortress walk tmp/rung-literals-spec/NeNumeral.fss
    NN32 u =/= 0: true
    NN64 v =/= 0: true
    RR32 r =/= 0: true
    ZZ64 z =/= 0: false
    NN32 u = 0: false

    bin/fortress walk tmp/rung-literals-spec/NeNumeralQQ.fss
    QQ q =/= 0.5: true
    QQ q =/= 1: true
    QQ t =/= 1: false

(`u: NN32 = w.asNN32`, `v: NN64 = w.asNN64`, `r: RR32 = narrow(d)` for `w: ZZ32 = 0`, `d: RR64 = 0.0`; `q: QQ = 1/2`, `t: QQ = 1/1`.) A first probe that bound `u: NN32 = 0` stopped at the binding (row 454).

## The stages

Neither: every path this rung changes is under `Specification/` (`git diff --name-only b430f9f428` lists the nine files above), so neither stage can move (`STAGE_BLIND`). No ladder subset: no code changed.

## Sentences of the specification made false

By the merged design, outside the files this rung edits; for the gather:

- `Specification/basic/expressions/ranges.tex:55-58`: "the compiled type checker gives a \KWD{nat} or \KWD{int} parameter used as a value the type of a numeral, and the interpreter makes it a \EXP{\mathbb{Z}32}" (C5 makes both `ZZ32`).
- `Specification/basic/types-vals-vars.tex:572-578`: "\Library\ define simple standard types for literals such as ... \EXP{\TYP{Numeral}\llbracket{}n,m,r,v\rrbracket} for appropriate values of ..." (the Draft's; P-174 makes `Numeral` a type without static parameters).
- `Specification/appendices/changes.tex:4442-4446` (the base's `:4415-4418`, `revival-index`, as the gather corrected it): "A numeral is no \TYP{Index} to the compiled type checker, which types it \TYP{IntLiteral} (\secref{revival-numeral-type}); the interpreter, whose numerals are values of the integer types (row~364), passes one to a parameter of type \TYP{Index}."
- `Specification/appendices/changes.tex:4703-4704` (the base's `:4673-4674`, as the gather corrected it): the natives effect, "twenty-one of the interpreter's object \TYP{IntLiteral}, three of its object \TYP{FloatLiteral}" (fork 4, the gather's).
- `Specification/appendices/changes.tex:2706-2715` (`revival-rr32`'s Effect, as the gather corrected it): "an \EXP{\mathbb{R}32} combined with an \EXP{\mathbb{R}64}, a floating-point numeral or a \EXP{\mathbb{Z}32} is converted to \EXP{\mathbb{R}64}": with `RR32`'s coercion from `RadixPointNumeral` (N8), `r32 + 0.5` may run at `RR32`; to be measured on the merged tree.
- `Specification/fortress/preamble.tex:100-102`: the team's list of features not yet supported names `Numeral`, which N builds.
- `Specification/appendices/changes.tex:2603-2607` (the base's `:2595-2601`, `revival-expected-contexts`, as the gather corrected it): walk instantiates `wrap` "at the numeral's type", now its default; true in effect, worded for the old type.

Sentences this rung's own text states that the merged tree must bear out (T3): the test names are not stated; the counts "fourteen" and "eleven" (`changes.tex:2787-2789`), N8's; `<|3000000000, 0.5|>` a `List[\RR64\]` (`inference.tex:320-321`), which C reads by the count stage's driver, not a gated test; the compiled class-load call and a throwing coercion stopping the load (`changes.tex:5185-5189`, as the gather corrected it to rung F's component class), F5.

## Points to report

- Each passage revised, its callout and entry: the sixteen above, with the boxes at `literals.tex:83`, `:139`, `:230`, `:268`; `constant.tex:101`, `:121`, `:128`; `numbers.tex:62`; `conversions-coercions.tex:119`; `inference.tex:188`, `:345`; `objects.tex:71`; `trait-parameters.tex:105`; `binary.tex:925`, `:1146`, `:1752`, `:1781`, `:1907`, `:2143`, `:2172`, `:2348`; each entry's parts above.
- Each sentence of the Working Draft that the design contradicts, quoted:
  - `Specification-1.0-frozen/basic/expressions/literals.tex:132-134`: "Numerals are not directly converted to any of the number types because, as in common mathematical usage, we expect them to be polymorphic." (at places that fix no type; with `:135-140`, "converting it immediately to a floating-point number may lose precision").
  - `Specification-1.0-frozen/basic/trait-parameters.tex:83-86`: "A \KWD{nat} parameter may be used to instantiate other \KWD{nat} parameters, or to appear in any context that a variable of type \EXP{\mathbb{N}32} can appear, except that it cannot be assigned to."
  - `Specification-1.0-frozen/advanced-lib/binary.tex:1620-1621`: "coerce[\nat m,nat radix,nat q,nat k,nat v\](x: NaturalNumeral[\m,radix,v\]) where { radix = 2^q, q DOT m = n DOT 2^bk }", and `:1659-1662`: "opr || [\nat m,nat radix,nat q,nat k,nat v\](self, other: NaturalNumeral[\m,radix,v\]): LinearSequence[\BinaryWord[\b\],n+k\] where { radix = 2^q, q DOT m = k DOT 2^b }" with its mirror; and the same shape at `:839-848`, `:1112-1135`, `:1748-1750`, `:1858-1868`, `:1923`, `:1985-1988`, `:2112-2114`, `:2268-2281`.
  - Changed in form, not contradicted: `literals.tex:83-129` (the numeral types), `constant.tex:44-56` (the constant traits), `conversions-coercions.tex:78-81` (coercion only at exactly the type, the default beside it).
- The specification's build: both `BUILD SUCCESSFUL` lines (`209`, `20701` of the build log), warnings 0 by the skill's grep, 715 pages.
- Each existing entry or box revised, before and after: above.
- A file edited beyond those named: none; the nine files are the section's.
- A sentence written that the rungs' sections do not support: the inequality, `u ≠ 0` true for a zero `u` of `NN32`, `NN64` or `RR32` and `q ≠ 0.5` true for `q: QQ = 1/2` (`changes.tex:5155-5163`; `changes.tex:3802-3809` for `NN32` and `NN64`). No rung's section states it; it follows by reading from P-173 (a numeral at `Any` takes the default) and `Library/FortressLibrary.fss:98` (`opr =/=(a:Any, b:Any):Boolean = NOT (a=b)`, no pairs), and the walk probes above show the same answers at the base. It replaces the base's sentence "Inequality is not converted", which P-173 makes false.

## Decisions

1. **The section title "A Numeral Whose Conversions Tie" kept, its content widened.** Not taken: a new title, such as "The Default of a Numeral". Evidence: ledger rows and `CLIMB-BATCH-29.md:354` (fork N6) cite the title; `specification.md`, "Citing it", asks that a renaming update every citation.
2. **No `decision-record.md`; the reasoning in this report.** Not taken: a decision record (`specification.md`, part 4). Evidence: the brief, "A decision record if your section asks for one. Nothing else under explorations/", and the section asks for none; climb batch 28's V wrote none.
3. **One box after each typeset group over `NaturalNumeral` in the binary chapter, eight in all, in two forms (coercion, `||`) and a combined one.** Not taken: one box per chapter section (three), or one per typeset line (sixteen). Evidence: fork T2 lists `:906-911` and `:1118-1132` apart, and "any other that `grep -n NaturalNumeral` shows typeset".
4. **The literals box `revival-numeral-type` replaced by the box `revival-numerals`, the old entry kept as the record of 29 September with its Change and Effect revised.** Not taken: two boxes at the passage, one per entry; rewriting the old entry whole into the new. Evidence: the brief, "the box revival-numeral-type (:149-165) rewritten"; fork T1 revises that entry "where their Effects become false".
5. **The Draft's text rewritten only in the literals chapter (`:83-140`); elsewhere it stands with a box** (`constant.tex`'s list, `conversions-coercions.tex:98-103`, `trait-parameters.tex:97-104`, the binary chapter). Not taken: rewriting those too. Evidence: the brief's "What you build" and fork T2 ("keep their text").
6. **The Draft's `literals.tex:141-148` kept verbatim, from "Therefore, numerals have their own types".** Not taken: rewriting the whole paragraph. Evidence: the judgement's section 3, "Kept as written: ... `:141-148`".
7. **Only the named files edited; other sentences made false listed for the gather.** Not taken: correcting `ranges.tex:55-58`, `types-vals-vars.tex:572-578`, `revival-index`. Evidence: the brief's step 11 and "Files. `Specification/` only, the chapters named".
8. **The inequality written into the two Effects as the design's answer.** Not taken: keeping "Inequality is not converted", which P-173 makes false; leaving the case out; stating it as a departure with a row. Evidence: `specification.md`, "so that no disagreement between the text and an implementation stays hidden"; the probes; P-173's places. It goes to the curator as a question and to the record as row 966.
9. **`RadixPointNumeral`'s `asFloat` stated without a dated decision** ("declares asFloat as the number types and the other numeral type do", `numbers.tex:68-69`), and the numeral concatenation "built as written" (`constant.tex:128-133`). Not taken: attributing them to the decision of 8 November. Evidence: fork N4 is point 3's default, a reading of P-165's list (`CLIMB-BATCH-29.md:288`), and fork F4 point 2's default (`:286`), neither a POSITIONS sentence.
10. **The dates.** 8 November 2026 for P-171, P-173 and P-174 (`POSITIONS-history.md`, the entries of 2026-11-08), and 28 September 2026 for a `nat` value converting to `ZZ32` (`changes.tex:2124-2128`, the revival's own record of it). Not taken: no dates, which every other entry gives.
11. **The `revival-int-float` box says "the compiled type checker, against the library, and the interpreter"**, not "both implementations". Evidence: the box's own last sentence, that the compiled path's own library declares no coercion into `RR64` from an integer numeral (`conversions-coercions.tex:89-91`).
12. **The new entries placed at the end of the revival section, before "Passages not yet revised".** Not taken: beside `revival-numeral-type`. Evidence: the latest entries are appended there (`changes.tex:4742`, `:4816`, `:4890` at b430f9f428).
13. **Examples chosen from the batch's tests and the judgement's appendix** (`x = 3`, `bigN`, `Cell(3)`, `q: QQ = 0.1`, `deadc_16`, `7/2`, `0.1 + 0.2 = 0.3`, `2147483647 + 1`, `round(2.50000000000000001)`, `h(5)`), and `007` for the digit count with leading zeros. Not taken: the Draft's `6.0221415 × 10^23` as a folded example, since F's fold list names `^` and multiplication without saying `×` at a power (`CLIMB-BATCH-29.md:516`).

## Defects, each with its home

- `u =/= 0` true for a zero `u` of `NN32`, `NN64` or `RR32`, and `q =/= 0.5` true for `q: QQ = 1/2`, under walk at the base and on both paths by P-173. Home 3: the question is open (the decided text gives `true`, against the `=` pairs' `true` for `u = 0`), so a test of today's answer and a row; this rung may not edit tests, so the row 966 with reproducer `none` and the probe's output in its notes; the rung that next works there (the gather's repair or the names batch) writes the test.

## For FACTS

- **The specification states the decided numeral design.** `Specification/basic/expressions/literals.tex:98-235` gives the numeral types with their four numbers as fields, the conversion where a place fixes a type and the default elsewhere; `inference.tex:305-350` the default's places, the narrowest default and the float tie; `constant.tex:80-110` the fold; Appendix I's `revival-numerals` and `revival-string-literals` (`changes.tex:4993-5459`). Test: the specification's build, `ant genSource` and `ant tex`, 0 warnings. Detail: this report, "What changed and why".
- **The library's `=/=` over `Any` meets a numeral at its default.** Under walk at b430f9f428, `u =/= 0` is `true` for zero `u` of `NN32`, `NN64` and `RR32`, and `q =/= 0.5` for `q: QQ = 1/2`, since `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) has no pairs; P-173 gives the compiled path the same. Command and output: this report, "Programs run, old against new". Row row 966.

## Commands

None worked out beyond the skill's: the build is `specification.md`'s.

## Questions for the curator

1. **The inequality at a numeral (row 966).** P-173 converts a numeral at `Any` into its default, so `u =/= 0` (`=/=` over `Any`, `Library/FortressLibrary.fss:98`) is `true` for a zero `u` of `NN32`, `NN64` or `RR32`, and `q =/= 0.5` for `q: QQ = 1/2`, while `u = 0` and `q = 0.5` are `true` through the pairs (P-165, N8). Decision not taken: (a) keep it, as the text now states (`changes.tex:5155-5163`); (b) declare a `=/=` pair beside each `=` pair; (c) have the fallback `=/=` reach the `=` pairs, as by declaring `=/=` on each type as `NOT (self = other)`. Default the record would need: none on record; the text states (a).
2. **A numeral at a library type that P-173's lists do not name.** P-173 names the places that fix a type (a coercion from the numeral type, or a numeral type) and those that take the default (`Any`, `Object`, `Number`, an unbounded type parameter, no declared type); P-174 refuses a numeral at "a program's type" without a coercion. A library trait such as `Index` (`f(3)` for `f(x: Index)`), or a bounded type parameter such as `T extends Integral[\T\]` that a numeral alone does not fix, is in neither list; `revival-index` says the checker refuses `f(3)` at `Index` (`Specification/appendices/changes.tex:4442-4446`). Decision not taken: (a) the default at every type that its default is a subtype of, `Index` among them; (b) refused, as a program's type is. The text here names only the decided places.
