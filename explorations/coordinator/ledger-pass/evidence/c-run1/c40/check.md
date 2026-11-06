# c40 check (run c-run1, base c124c6b65)

mech.md: 4 lines, 0 failing. I opened the cited lines at the base: NodeUtil.java:1152-1172, SyntaxChecker.java:176-189, frozen concrete-syntax.tex:686-719, v01_tuple.fss:15-40, STypeEnv.scala:185-200, Specification/appendices/changes.tex:3820-3870, Specification/basic/components/type-inference.tex:40-56, lexical-structure.tex:860-866 and 966-1000, and Literal.rats:168-195.

## Row 14 (rewrite): pass
- Fidelity: `validNumericLiteral(writer, span, numeral)` at NodeUtil.java:1158-1160 logs "Syntax Error: a numeral contains letters and does not have a radix specifier." for any letter. Spec lexical-structure.tex:1100 states the same rule. The workaround holds.
- Nothing lost: the list is empty.
- Cold read: the "Could not resolve" items (`blinded`, the spec path with no root) are ledger conventions, and a worker would not stumble on them.

## Row 177 (rewrite): fail (cold read)
- Fidelity holds: SyntaxChecker.java:179-181 is `if (that.getRhs().isNone() || lvb.isMutable())` then `if (lvb.getIdType().isNone())` logs "The type of ... is required.". Frozen 1125-1128 and 1135-1137 read as quoted.
- Nothing lost: each dropped token has a home. The error positions `MicroGptFlat.fss:88:9`/`:88:5-7` and probes `E`/`G` are in history row 177 (the line says `full text: history, row 177`, and `E` is still named). `row 21` is FIXED and stays in history.
- Failure: the passage "with the `null` prefix of row 166". The cold reader could not tell what the prefix is. The dropped token `null…/MicroGptFlat.fss:88:9:` was what showed it: the message's file name is printed with `null` in front of it. Row 166's evidence (`null/…/att_f_staticparams.fss:5:29:`) shows the same. Correction: replace it with "its message prefixed by `null` before the file name, as in row 166".
- Minor, not a failure: "It was the only annotation ... walk required" has turned past tense ("requires" in the old line). The judge may restore "is".

## Row 251 (rewrite): fail (fidelity, cold read)
- The class change holds. Frozen concrete-syntax.tex:712 (under "Parameters", :688) is `PlainParam ::= BindId [IsType]`. Specification/appendices/grammars/concrete-syntax.tex:712 is the same.
- Nothing lost: `basic/declarations.tex` is replaced by the grammar line. `v01_tuple.out` is gone from the tree and kept in history.
- Failure: the passage "`explorations/apl/rung-5/v01_tuple.fss` keeps that form in a comment". The file at the base holds no code of that form. Lines 24-26 hold prose only: "(* (a) the same as a PATTERN in the parameter list -- a Syntax Error at the opening parenthesis of the pattern (v01_tuple.out.0, `v01_tuple.fss:25:24: Syntax Error`) ... *)". The position `:25:24` is a position in the old file, and in the file at the base line 25 is that comment. The cold reader took the passage to mean "uncomment it", and a worker would do the same. Correction: "The error was `v01_tuple.fss:25:24: Syntax Error`, the column of the pattern's opening parenthesis, in the file as probed; `explorations/apl/rung-5/v01_tuple.fss:24-26` now describes the form in a comment and runs the named spelling."

## Row 405 (rewrite): fail (fidelity of the spec cell, cold read)
- Fidelity of the rest holds. STypeEnv.scala:200 (`case SParam(_, name, mods, _, _, _) => throw TypeError.make("Missing parameter type for " + name, node)`) and :72-75 are unchanged since d4d454f9d. Adding `siblings: 652.` is correct: 652 names 405, and both are refused at :200. FACTS F-266 (FACTS.md:114) agrees.
- Status: NEGATIVE-VERIFIED is kept, and silent.txt says defect. That is right (item 265).
- Failure: the cell "silent" sits beside the note "Appendix I's entry on a left-out parameter type states it". The cold reader called this contradictory and could not find "Appendix I", and a worker would stumble the same way. The specification at the base is not silent. `Specification/basic/components/type-inference.tex:48-53` holds the revival box `revival-paramtype`, which states the compiled refusal "Missing parameter type for". Its paragraph asks for inference over every construct that still has elided types. `Specification/appendices/changes.tex:3820`, "The type of a parameter that a declaration leaves out", states both paths' behaviour ("stops on a method that leaves it out and implements an abstract declaration (row~405)"). Correction: spec cell `basic/components/type-inference.tex`, "Type Inference" (inference of elided types asked, not described; its box `revival-paramtype` states the compiled refusal). In the notes, replace "Appendix I's entry on a left-out parameter type states it" with "`appendices/changes.tex`, \"The type of a parameter that a declaration leaves out\", states both paths". Status stays NEGATIVE-VERIFIED. silent.txt's entry for 405 is then moot, because the cell is no longer `silent`. If the judge keeps `silent` as the template's word for "no rule given", the note must still name the file `Specification/appendices/changes.tex` in place of "Appendix I".

## Row 63 (keep): pass
Frozen opr-overview.tex:87-91 is unchanged, and no commit touched it. The probe's old path and the workaround are in the line.

## Row 89 (keep): pass
Resolver.java:598-601 holds the message and is unchanged since the row. Frozen precedence.tex:162-169 states the non-transitive precedence.

## Row 90 (keep): pass
NEGATIVE-BOUNDED names the two spellings tried. "Same family as row 63" is loose but not false.

## Row 143 (keep): pass
Frozen 916-919 reads as cited, and the probes' old paths are in the line.

## Row 166 (keep): pass
Frozen 402-403 and 721-731 hold. The overlap with 133 is a different defect.

## Row 200 (measure): pass
The question is narrow, and both programs run from the main tree under walk. Each outcome maps to a line or a retirement. The premise holds at the base. lexical-structure.tex:966-1000 specifies restricted-word and quoted-character escapes, and :863-865 allows hex code-point character literals. Literal.rats:175-176 logs "Invalid string literal content: \" for any backslash that EscapeSequence (:182-195, `[btnfr"\\]`) does not take.

## Row 217 (keep): pass
The evidence's walk run of the reproducer at the base prints the claim's messages, and the workaround is in the line.

## Row 652 (keep): pass
The reproducer is an XXX compiled test. STypeEnv.scala:199-200 is unchanged. efd6bb2f2 touches functions.tex only at @@ -439, not the cited 171-172.

## Files
closes.txt, dups.txt and pairs.txt are empty, and nothing in the evidence calls for an entry. silent.txt: see row 405.
