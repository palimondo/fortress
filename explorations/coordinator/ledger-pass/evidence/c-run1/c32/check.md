# c32 check (base c124c6b65)

`mech.py` run as launched: `MECH: 5 lines, 0 failing, every check passes.` Form passes for 37, 101, 199, 278, 460. Every citation below was read at c124c6b65 with `git show c124c6b65:<path>`; no build or test was run.

## Row 37 (rewrite): FAIL

- Fidelity: the comment block `Library/FortressLibrary.fss:3218-3226` holds (`(*****` at 3218, `trait Monoid[\ T, opr OPLUS \]` at 3220, `*****)` at 3226). `grep -n 'trait Monoid\['` prints only 3220 (3347 is `trait MonoidReduction`, which the `\[` excludes). The INCOMPLETE file's `%trait Monoid` is at :775 and `%trait Field` at :1196. `p5_ring.fss` exists at `e879b6a44^`.
- Nothing lost: `Library/FortressLibrary.fss:3032` is false at the base (line 3032 is now `opr juxtaposition[...]`), and its replacement `:3218-3226` is in the line.
- Failure: "Natural companion to the complex-numbers goal." No complex-numbers goal is recorded: `git grep -i 'complex.numbers'` over POSITIONS.md, PLAN.md, FACTS.md and the ledger at the base finds only row 37 itself. The cold read could not resolve it, and a worker would also stumble on it. Correction: delete the sentence "Natural companion to the complex-numbers goal." (its home: the history, row 37).
- Cold read otherwise matches.

## Row 101 (rewrite): pass

- Fidelity: `Library/Map.fss:197` holds `opr BIG UNION[\Key,Val\]() : BigReduction[...]`, and `Library/Set.fss:115` holds `opr BIG UNION[\R extends StandardTotalOrder[\R\]\]()`. `Library/IntMap.fss:738`, `Library/PrefixMap.fss:32` (`import PrefixSet.{...}`), `:419` and `Library/PrefixSet.fss:425` hold their nullary declarations. 3aea3da53 is in the base's history. Both probes exist at `ed6dafb52^`, and c19 uses `BIG UNION` with both imports.
- Nothing lost: `3aea3da53` is kept ("refused at 3aea3da53"). `cdd25b95d` is not in the base's history (correctly dropped), and its fact is kept as library text that holds at the base. The full Set signature in the walk message is elided to `BIG CUP[…]` and kept whole in the history.
- Note for the judge, not a failure: the Map with IntMap clash is now claimed from the library text. Its refusal was measured only at cdd25b95d, and the declarations there match the base's.

## Row 199 (rewrite): FAIL

- Fidelity: `explorations/apl/base/AplCore.fss` at the base has no `AplArr` (count 0). `explorations/apl/v1/rung-2/Rung2.out` exists at `0ff5eae27~1`. `p15_box.fss` and its `.out` exist at `1ee3b0bc5^`, and the p15 header confirms the `AplArr` / `RR64` carrier. "its nested arrays meet row 219's wall" agrees with row 219 as written ("An array of arrays meets the same wall (`r14_nested.fss`)"). Row 219 is under measurement in this chunk, so this clause follows that row's outcome.
- Nothing lost: `.out` and `Rung2.out` are kept as the full path.
- Failure 1: "all 65 functions of `AplCore.fss` retyped" comes right after the current `explorations/apl/base/AplCore.fss` is named, so it reads as the current file. The 65 functions are the retired library's (a grep of `0ff5eae27~1:explorations/apl/v1/base/AplCore.fss` gives 65). Correction: "all 65 functions of the retired `AplCore.fss` retyped".
- Failure 2: "1 trait + 2 variants + 1 carrier for 1 carrier". The cold read could not resolve this, and the old line's verb was "replace". Correction: "1 trait + 2 variants + 1 carrier replace 1 carrier".

## Row 278 (rewrite): FAIL

- Fidelity: `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:175-178` holds `transient private String singleOp = ... &{ PrecedenceMap.ONLY.isOperator("" + a1) }`. `PrecedenceMap.java:176-179` holds `isOperator`. `operators.txt:490-491` and `:522-523` hold the four ceiling and floor entries, and `grep -i u23` finds no other. At `7c3218956^`, `c10_opr_iota.fss:6` is `opr ⍳(n: ZZ32)` and `c16_glyph_identifier.fss:6` is `⍳(n: ZZ32)`. Each `.out` is a bare `Syntax Error` at the declaration.
- Nothing lost: `Symbol.rats` and `Symbol.rats:175-178` are kept, now with the full path. `null` is false: the old "(the second prefixed `null`)" was wrong, because the `null` prefix is on the first probe, `c10_opr_iota.out` (`null/home/user/.../c10_opr_iota.fss:6:5:`), not on c16. The line drops it rightly. `unicode/OperatorStuffGenerator.java` has its home in the history.
- Failure: "Counterparts: row 185 (`≡ ≢`), row 216, row 233, row 276." The old line gave each relation, and this line loses them. The cold read could not tell what each row is to this one. Correction: replace it with "Row 185: `≡ ≢` are in the table; rows 216 and 233: the glyphs that are operators; row 276: a sub-grammar takes these glyphs." The row grows to about 1,200 characters, so the judge checks the length. If it is over, shorten "a lookup in the generated `Operators.java`; its source" to "via the generated `Operators.java`, from".

## Row 460 (rewrite): FAIL

- Fidelity: `ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:122` holds `typecase w a1:Expr w a2:(of / do / in) w a3:TypecaseClauses`. `:237-251` holds the clause rule with `(Id w : w)?`. `typecase.tex:15` holds the pattern-matching note in both `Specification/` and `Specification-1.0-frozen/`. `Library/FortressLibrary.fss:33-37` is `cast` with `x':T => x'`. fd5cb4864 is in the base's history, and row 351 is FIXED by it. `TcBind.fss` exists at `ab067d9b6^`. FACTS F-71 (FACTS.md:68) agrees.
- Nothing lost: `DelimitedExpr.rats:43` was false (it named the spec copy), and `DelimitedExpr.rats` is kept with the parser's path. `typecase (rp, rq) = (p, q) of` became "its tuple form", and the history holds it.
- Failure 1: "`TcTrait.fss`" was dropped. It is the probe of the line's first and main claim, the checker's refusal of the shorthand form on a trait type ('not applicable to an argument of type Cond'). `TcBind.fss` probes only the binding form. `TcTrait.fss` exists at `ab067d9b6^` beside `TcBind.fss`. Correction: replace "Probe `explorations/compile-ladder/rung-exclusion-remainder/probes/typecase/TcBind.fss`, at ab067d9b6^." with "Probes `explorations/compile-ladder/rung-exclusion-remainder/probes/typecase/TcTrait.fss` (shorthand) and `.../TcBind.fss` (binding form), at ab067d9b6^." If mech requires a full path for each, write both paths in full (about 1,175 characters).
- Failure 2: "the curator's, PLAN, parked". `explorations/coordinator/PLAN.md` at the base has no entry on typecase's binding form or the pattern-matching proposal (grep). The entry is `explorations/coordinator/PLAN-history.md:409`, under "Off the path, parked" ("Typecase's binding syntax (judge-review.1 ...)", default (a): revise the specification to the implemented grammar). The cold read could not resolve the pointer, and a worker would not find it. Correction: "a question parked in `explorations/coordinator/PLAN-history.md:409` (default: revise the specification to the implemented grammar)." To stay under the limit, drop "Walk runs the shorthand form." only if needed. It is better kept, so shorten elsewhere first.

## Row 39 (keep): pass

`PreTypeCheckDesugaringVisitor.java:358` still opens `private Expr visitAccumulator(...)` at the base. The probe's old path is named.

## Row 40 (keep): pass

The cited specification rule and the sibling rows (39, 101, 137) stand. The probe's old path is named.

## Row 280 (keep): pass

`Operators.java:2161` holds `"⌈;"+"|/;"`. No commit from 052a7c3fe to the base touches `parser_util/precedence_resolver/` or `parser/MethodParam.rats`. The probes name 7c3218956.

## Row 44 (measure): pass

At the base, `opr SUM[\T extends AdditiveGroup[\T\]\]` with `BigReduction[\T,T\](SumReduction[\T\])` is at `Library/FortressLibrary.fss:3455-3459`, with no cast. `Vector` extends `AdditiveGroup[\Vector[\T,s0\]\]` (`FortressLibrary.fsi:1645-1646`). d846e3644 is in the base's history. The question is narrow. `r14_nested.fss` exists, and the source path matches `Rung1.fss:8-11`. Each outcome maps to a close (with a test owed) or to a rewrite.

## Row 216 (measure): FAIL

- Failure: the outcome reads "`r05c` refuses the prefix `|`". `explorations/apl/rung-1/r05c_bar.fss` declares only an infix `opr |(a: D, b: D)` and prints `a | b = ...`. It is row 216's witness that `|` takes infix, and it holds no prefix declaration. So the outcome cannot occur as written, and nothing probes the prefix `|`. Correction: "r05c prints `a | b = D3` (infix `|` loads, as the row says)". For prefix `|`, add a one-line probe for the prober, `opr |(a: D): D = a` with `println(| D(1))`, whose `Syntax Error` keeps the claim. If either loads, rewrite the claim to drop that glyph.
- The rest holds: `r05a_comma.fss` and `r05e_ravel.fss` exist, and `r05e` declares the prefix `opr ,(a: D)`.

## Row 219 (measure): pass

The evidence's run dies at `r07_edge.fss:9:54-76` (`fill param 1 (v:RR64) got arg FnExpr`), and `fill(v:E)` takes a value while `tabulate(f:I->E)` takes a function (`FortressLibrary.fsi:1513-1514`). So the probe edit is sound. 5262a2412 is in the base's history. The outcomes map to a rewrite or a close.

## Row 223 (measure): pass

`r15_runtimerank.fss` exists. The command runs from the main tree, and each outcome maps. `silent.txt`'s `choice` keeps NEGATIVE-VERIFIED, as item 265 asks.

## Pairs: pass

None proposed, and the stated overlaps are different defects.
