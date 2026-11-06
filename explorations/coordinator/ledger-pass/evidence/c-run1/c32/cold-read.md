# Cold read: c32 (rows 37, 101, 199, 278, 460)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and `references/records.md` (the status-word list and row format). General note for all rows: `records.md` lists the seven status words but says "The row template (below) defines each", and that template lives in the ledger, which a cold reader may not open. So `NEGATIVE-VERIFIED` and `NEGATIVE-BOUNDED` are read from their names only (verified absent/broken; broken within a measured bound). The Found-by values (`ours`, `run-b`, `apl rung 2`, `apl feasibility`, `climb batch 7 rung H`) are provenance labels that the skill does not define; they do not block any row.

## Row 37

- **Defect:** The specification's algebraic-constraints library (traits `Monoid`, `Group`, `Ring`, `Field`, `Lattice` and others, 1894 spec lines) is not shipped. Only commented-out copies exist; the library has the self-typed `AdditiveGroup` and `MultiplicativeRing` instead (consistent with SKILL.md, "Numbers are siblings").
- **Where:** Library, both paths (nothing to run). `Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE` (all commented, e.g. `:775`, `:1196`); a commented block in `Library/FortressLibrary.fss:3218-3226`. Spec: `Specification/advanced-lib/algebraic-constraints.tex`.
- **Reproduce:** No program. Run `grep -n 'trait Monoid\[' Library/FortressLibrary.fss`; it prints only line 3220, inside the comment block (at c124c6b65). Probe `explorations/spec-probes/p5_ring.fss` in the parent of e879b6a44 for what exists.
- **Status:** Verified open library gap. A worker would build it only if a brief asks; "natural companion to the complex-numbers goal" hints at when, but is not a decision.
- **Could not resolve:**
  - "Natural companion to the complex-numbers goal": whether a complex-numbers goal is a curator decision in POSITIONS or an aside. Unclear wording (no citation).
  - "row 36": cited without saying what it holds beyond "what exists"; minor, readable.
  - How the comment block at 3218-3226 is commented (Fortress `(* *)` vs the `%` prefix in the `.fsi`): not needed, not blocking.

## Row 101

- **Defect:** A component that imports both `Set.{...}` and `Map.{...}` fails to load under walk, because each library declares a nullary `opr BIG CUP()` (the `BIG UNION` big operator) and only one nullary declaration per name is allowed. Same clash for `Map` with `IntMap`, and inside `PrefixMap` itself (which imports `PrefixSet.{...}`), so any program that imports `PrefixMap` does not load.
- **Where:** Walk, at load (overloading check). `Library/Map.fss:197` vs `Library/Set.fss:115`; `Library/IntMap.fss:738`; `Library/PrefixMap.fss:32` and `:419` vs `Library/PrefixSet.fss:425`. Compiled path not stated.
- **Reproduce:** Run under walk a component with `import Set.{...}` and `import Map.{...}` that uses `BIG UNION`; walk refuses with `Overloading of BIG CUP[\Key,Val\]():.../Library/Map.fss:197 and BIG CUP[...]():.../Library/Set.fss:115 fails because...`. Probes `explorations/run-b/probes/c19_bigunion_collision.fss` and `.../worker/w17_bigunion_except.fss` in the parent of `ed6dafb52`. `PrefixMap` refusal seen at 3aea3da53.
- **Status:** Verified open library bug; a worker may fix it (it is a library bug, not a question). Until then, use the workarounds: import one library by name, `import Set.{...} except { opr BIG CUP }`, or fold with `add`.
- **Could not resolve:**
  - Does the clash need `BIG UNION` to be used, or does the import alone fail? The claim says "cannot be used in a component that imports both", but the notes say walk "refuses at load" and that no program importing `PrefixMap` loads, which reads as the import alone failing. Two readings; unclear wording.
  - "one nullary declaration per name is allowed (row 40)": is this a spec rule or a walk check? The spec cite (`overloading.tex:99-105`) suggests the spec, but the row does not say whether the fix is in the library (rename/merge) or in the loader. Unclear wording.
  - Whether the compiled path shows it is not stated (SKILL.md asks the row to say which paths). Unclear/missing.
  - "the same pair stands for": reads as "the same clash exists"; understood.
  - "siblings: 39, 40": a cross-reference label not defined in the skill; read as related rows.

## Row 199

- **Defect:** A design limit, not a bug: the retired first APL library stored array elements as flat `RR64` (`AplArr`), so it could not hold nested (boxed) arrays. Supporting them needs a new representation (a trait with number and box variants over a parallel carrier) and all 65 library functions retyped. The current APL library has no `AplArr`; its nested arrays hit row 219's limit instead.
- **Where:** APL library under `explorations/apl/` (not the original tree): measured on `explorations/apl/v1/base` at `0ff5eae27~1`; current `explorations/apl/base/AplCore.fss`. Path (walk/compiled) not stated.
- **Reproduce:** Probe `explorations/apl/v1-probes/p15_box.fss` in the parent of `1ee3b0bc5` shows the boxed design working (Ex 9 frame, Ex 34 `(⊂1 1)⊃m` gives `5 6 8`, Ex 35 `⊃m` gives `1 2 3`). The 13 nested examples are SKIP in `explorations/apl/v1/rung-2/Rung2.out` of that commit.
- **Status:** Bounded, about a retired library. Nothing to build on this row; the live limit is row 219. Leave it.
- **Could not resolve:**
  - `NEGATIVE-BOUNDED`: meaning not defined in the skill (template is in the ledger). Missing concept.
  - "the book", "Ex 9", "Ex 34", "Ex 35": which book (an APL textbook the APL work follows?) is not named. Unclear wording.
  - "The price: 1 trait + 2 variants + 1 carrier for 1 carrier": readable as "replace one carrier with a trait, two variants and a carrier", but the phrasing is compressed. Unclear wording.
  - "carrier", "parallel carrier": APL-library terms (the backing storage type?) not in the skill. Missing concept.
  - "row 219's wall": what row 219 is; must be looked up. Not blocking.
  - "full text: history, row 199": read as "the full earlier text is in the ledger history file under row 199" (records.md names that file). Understood.
  - "SKIP" in an `.out` file: the APL rung's own output marker, not the harness's skip; inferred.

## Row 278

- **Defect:** The APL glyph block U+2336-U+237A (for example `⍳`) cannot be used as operator names nor as identifier characters. This matches the specification: its operator characters are only those the operator appendix lists, and of U+2300-U+23FF it lists only `⌈ ⌉ ⌊ ⌋` (U+2308-U+230B).
- **Where:** Parser, so both paths. `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:175-178` (`singleOp`) gates on `PrecedenceMap.isOperator` (`PrecedenceMap.java:176-179`), which looks up generated `Operators.java` from `parser_util/precedence_resolver/operators.txt` (`:490-491`, `:522-523`). Spec `basic/lexical-structure.tex` "Characters" and `appendices/operators.tex`.
- **Reproduce:** Probes `explorations/apl-probes/c10_opr_iota.fss` (`opr ⍳(n: ZZ32)`) and `explorations/apl-probes/c16_glyph_identifier.fss` (`⍳(n: ZZ32)`), in the parent of 7c3218956; each gives a bare `Syntax Error` at the declaration.
- **Status:** Verified, and by specification. Leave it: adding `⍳` to `operators.txt` changes the language, so it is not a fix a worker makes on its own (a curator matter).
- **Could not resolve:**
  - "`⍳` is not an identifier character either": the spec reason for identifiers is not given (only the operator reason). Whether that half is also "by specification" is unclear. Unclear wording.
  - The spec paths lack a root (`Specification/` or `Specification-1.0-frozen/`). Unclear wording, minor.
  - "Counterparts: row 185 (`≡ ≢`), row 216, row 233, row 276": relation unstated (other glyphs refused? or accepted?). Unclear wording.

## Row 460

- **Defect:** Two gaps in `typecase`. (1) The compiled checker does not narrow the variable in the shorthand form: in `typecase c of Rel[\E\] => useRel[\E\](c)`, `c` keeps its declared type `Cond`, so the call is refused, "not applicable to an argument of type Cond". Walk runs this form. (2) Neither path accepts the binding form `typecase x = e of` (nor its tuple form): the parser takes `x = e` as an equality expression, so `x` is reported "Variable rp is not defined". What works: the clause-binding form `rp:T =>` runs on both paths (compiled since fd5cb4864, row 351).
- **Where:** (1) Compiled checker (Scala), shorthand `typecase`. (2) Parser, both paths: `ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:122` (subject is an expression), clauses `:237-251` take `Id :`. Example of clause-binding form in `Library/FortressLibrary.fss:33-37`. Spec `Specification-1.0-frozen/basic/expressions/typecase.tex:55-62, 88-93, 126-133`.
- **Reproduce:** Probe `explorations/compile-ladder/rung-exclusion-remainder/probes/typecase/TcBind.fss` at ab067d9b6^. Compile the shorthand form for (1): refused with the "not applicable" message; walk runs it. Write `typecase rp = p of` for (2): both paths say "Variable rp is not defined".
- **Status:** (1) Verified checker gap; a worker may build a fix (narrowing in the checker). (2) Waits on a question: the binding form depends on the pattern-matching proposal (`typecase.tex:15`), which the curator parked in PLAN. Leave (2).
- **Could not resolve:**
  - "the curator's, PLAN, parked": compressed. Read as "the pattern-matching proposal is the curator's call, and PLAN records it as parked". PLAN is not defined in the fortress-repo skill (it appears only in the coordinator skill's description). Unclear wording.
  - Does the spec (`typecase.tex`) define the binding form `typecase x = e of`, so (2) is a spec-vs-implementation gap, or is it only proposed (`:15`)? The cited spec lines and "awaits the proposal" pull two ways. Unclear wording.
  - Is (1) a narrowing the spec requires? Implied by the cited lines but not said. Minor.
  - Row with two defects under one status: a worker fixing (1) cannot close the row while (2) is parked. Not a word problem, but the status applies differently to each half.
