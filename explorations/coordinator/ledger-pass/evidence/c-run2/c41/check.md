# Check of chunk c41 (run c-run2), base c124c6b65

## Row 359 (NEGATIVE-BOUNDED), keep: pass

`Fortress.rats:145-157` at the base is `createSpan`, with `while ( i >= 0 && yyData[i] == ' ' ) { i--; }` at :147, so the trim is over spaces only, as the row says. No commit since ae4f8e38a touches the file. ad2b0220a only moves a held-list paragraph. FACTS.md:17 agrees with the row. The bound "which productions consume it was not traced" is the bound that NEGATIVE-BOUNDED needs. Not a NEGATIVE-VERIFIED row, so no silent.txt line.

## Row 376 (NEGATIVE-VERIFIED), rewrite: fail (cold read)

- Fidelity: pass. At the base, `parser/Symbol.rats:222` is `IMPLIES = "IMPLIES":op / "→":op` and `:226` is `rightarrow = "->" / "→"`. `parser/Literal.rats:365-366` maps `->` and `IMPLIES` to U+2192. `parser/MayNewlineHeader.rats:464-492` is `StaticArg`, and the `BoolExpr` choice comes before the `Type` choice. Its lookahead at `:475-477` holds `w rightarrow` after `QualifiedName`. `:360-363` is `BoolPrimaryFront`'s `openparen w a1:OpBool w closeparen`. The writer is right that the old line numbers were two lines early (`:462-490`, `:474-476`) and that `:347-351` pointed at the comment. The two error messages and the `ZZ32 -> (ZZ32 -> ZZ32)` control are carried over unchanged from the guard line and the history's line.
- Nothing lost: pass.
  - `:347-351`, `:474-476` and `MayNewlineHeader.rats:462-490` were false, and the correct lines replace them.
  - `Symbol.rats`, `Symbol.rats:222`, `Literal.rats`, `Literal.rats:365-366` and `MayNewlineHeader.rats` are kept, now with their folder.
  - The cut "wrong under either reading" (walk should not raise an `InterpreterBug` under either parse) has a home in the history's line for row 376. An `InterpreterBug` already shows it.
- Present: pass. The cell "climb batch 3 rung S" is only the found-by cell.
- Reproducer: pass. `none`, and the notes point to the probe in the history.
- Status: pass. NEGATIVE-VERIFIED is unchanged.
- Form: pass. mech.md: 1121 of 1200 characters, notes 682 of 700.
- Cold read: fail. The reader could not tell what `:360-363` is: the lines that accept the parenthesized domain, or a second lookahead. A worker fixing the lookahead needs the answer, which is that `BoolPrimaryFront`'s parenthesized choice takes `(ZZ32 -> ZZ32)` as a Boolean. The history's line said "which the Boolean `( w BoolExpr w )` then accepts", and the new line drops it.
  - Source: `ProjectFortress/src/com/sun/fortress/parser/MayNewlineHeader.rats:347-363` at c124c6b65; `cold-read.md`, "Could not resolve", first item.
  - Correction, in the notes cell of rows.rewrite:
    - Replace `` `ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:222` `` with `` `parser/Symbol.rats:222` ``. It resolves as `parser/Literal.rats` does, and it frees room.
    - Replace "but not a parenthesized domain (`:360-363`)" with "but not a parenthesized domain, which `BoolPrimaryFront` takes as `( BoolExpr )` (`:360-363`)".
    - Result: notes 695 of 700, row 1134 of 1200.
  - The other "Could not resolve" items (the spec choosing neither reading, "the checker", "history") were resolved correctly by the reader and do not block a worker.

## Row 852 (CONTESTED), measure: pass

- The cited lines hold at the base. `ExprDisambiguator.scala:837-841` collects the names into a `Set[Id]`, and `Id.equals` compares the node's info (`nodes/Id.java:54-72`). At `:776-777`, `for {i <- 0 until vars.size - 2; j <- i + 1 until vars.size -1}` never reaches index `size-1`. With two names, the loop does not run at all.
- The question is narrow and has two whole programs. Its commands run from the main tree with private caches. Each outcome maps to a line or a close: `RETIRED` (a status of the template) routed to the curator, or a NEGATIVE-VERIFIED rewrite with an `XXX` test.
- The status stays CONTESTED until the run settles it.

## Row 898 (NEGATIVE-VERIFIED), keep: pass

- At the base, `Literal.rats:460-464` holds the four choices as the row describes. The first choice is upper case only, with an optional fifth digit, and it comes before the `"10"` choices, so `10FFFF` commits at `10FFF` and `1000a` commits at `1000`.
- The "moved" signal is only `10FFF` in the error message at `:469`. No commit since c141e7f6a touches the file.
- The notes carry the command and its output.
- `lexical-structure.tex`, "Character Literals", allows four or more digits, so the row is not silent.

Counts: 3 pass, 1 fail.
