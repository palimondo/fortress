(* V02Syn -- rung 5's terminal probe.  It is rung 3's T02Syn.fsi VERBATIM --
   the grammar that is known to work at the use site -- with one block of new
   alternatives added, and nothing else changed but the names.  The trimmed
   hand-written version that preceded it compiled and then matched nothing at
   the use site (v02_term.out.4 before it was retired), which is the same trap
   rung 4's u05 fell into; copying a working grammar is the only way to ask a
   terminal question cleanly.

   The question is: which of the five characters rungs 5 and 6 add can be a
   terminal of a production, and how must it be spelled?

     ¨  each          (U+00A8)
     ⍀  scan-first
     ⍣  power
     \  scan          (the design says "may need the backtick escape -- probe")
     .  the dot of ∘.g and f.g   (rung 6, asked here to save a run)

   The answer is that all five are PLAIN ITEMS and none of them takes the
   backtick escape.  `\` and `.` are not among the macro language's
   SpecialChars (Syntax.rats:395-398 lists space breakline : ? # + * [ ] ` | _
   { }), so the escape is not merely unnecessary for them, it is a Syntax
   Error: `` `\ `` is v02_term.out.0 and `` `. `` is v02_term.out.1.

   ⌷ is asked here as an alternative of a glyph TABLE, which is the position
   rung 6 needs it in; it is already a terminal of rung 2's own rules.

   The rest of this header is T02Syn's own:

   (1) can `|` be a terminal at all?  It is the host's encloser, so it needs the
       backtick escape of gap row 3, and gap row 3 says the escape is read by the
       PREPARSER as an opening quote unless an APL glyph stands above it (the ⍴
       of the first rule here does).
   (2) can `<` and `>` be terminals?  They are one character away from the
       template delimiters `<[` and `]>`.
   (3) are ~ ∊ ∪ ∩ ↑ ↓ ⍋ ⍒ ⍟ ⍪ ≠ ∧ ∨ terminals?
   (4) the COMMUTE design: a nonterminal whose alternatives are dyadic glyphs and
       whose templates are host LAMBDAS, applied by two rules that read f⍨.
   (5) `(a,b)⍴x` with an EXPRESSION shape: does the gap have to be an atom
       (TAtom) or may it be the full expression nonterminal (TExp)?  Both rules are
       here, the TExp one first, and the expansions are told apart in the output. *)
api V02Syn

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar V02G extends { Expression, Literal, Identifier }

    Expr |:= v02⦇ e:TExp ⦈ => <[ (e) ]>

    TExp :Expr:=
      (* an APL glyph above every backtick escape, as gap row 3 requires.
         The two `(a,b)⍴x` rules stand ABOVE the plain dyadic ⍴: below it the
         parenthesis is eaten by TAtom's own `( TExp )` and the rule is never
         reached at all (t02_gram.out.5). *)
        ( SPACE a:TExp SPACE , SPACE b:TExp SPACE ) SPACE ⍴ SPACE r:TExp
            => <[ tstReE((a), (b), (r)) ]>
      | ( SPACE a:TAtom SPACE , SPACE b:TAtom SPACE ) SPACE ⍴ SPACE r:TExp
            => <[ tstReA((a), (b), (r)) ]>
      | l:TAtom SPACE ⍴ SPACE r:TExp => <[ aplReshapeV((l), (r)) ]>

      (* (4) commute *)
      | l:TAtom SPACE f:TDy ⍨ SPACE r:TExp => <[ (f)((r), (l)) ]>
      | f:TDy ⍨ SPACE r:TExp            => <[ (f)((r), (r)) ]>

      (* catenate, so that the `(a,b)⍴x` rules above are asked the real
         question: the inner gap can itself parse `a , b` as a catenation *)
      | l:TAtom SPACE , SPACE r:TExp  => <[ aplCat((l), (r)) ]>


      (* ---- rungs 5 and 6: the new terminals ---- *)

      (* ¨ each, both valences, through the same glyph-table nonterminal ⍨ uses *)
      | l:TAtom SPACE f:TDy ¨ SPACE r:TExp => <[ ("each2 " aplShow((f)((l), (r)))) ]>
      | f:TDy ¨ SPACE r:TExp               => <[ ("each1 " aplShow((f)((r), (r)))) ]>

      (* \ as a one-character CLASS; the bare and escaped spellings are
         v02_term.out.0 and .out.1 *)
      | `+ \ SPACE r:TExp => <[ ("backslash " aplShow(aplSumLast((r)))) ]>

      (* ⍀ scan-first, a plain item *)
      | `+ ⍀ SPACE r:TExp => <[ ("slashbar " aplShow(aplSumFirst((r)))) ]>

      (* ⍣ power: the count read off the SOURCE, as ⍤'s rank is, and the
         ⊢ separator of rung 4's ⍤ rules *)
      | f:TDy ⍣ SPACE n:TAtom SPACE ⊢ SPACE r:TExp
            => <[ ("power n=" aplShow((n)) " once=" aplShow((f)((r), (r)))) ]>

      (* the DOT of ∘.g , as a one-character class; the bare and escaped
         spellings are v02_term.out.2 and .out.3.  It stands above rung 4's
         `a∘g` bind rule would, so the outer-product reading is tried first. *)
      | l:TAtom SPACE ∘ . × SPACE r:TExp => <[ ("outer " aplShow((l) × (r))) ]>

      (* ⌷ as a member of a glyph TABLE (rung 6 needs it in AplDy); it is
         already a terminal of rung 2's own rules *)
      | f:TSq ⍤ SPACE r:TExp => <[ ("squad-in-a-table " aplShow((f)(1.0, (r)))) ]>

      (* (1) (2) (3) the terminals *)
      | l:TAtom SPACE `| SPACE r:TExp => <[ tstRes((l), (r)) ]>
      | l:TAtom SPACE < SPACE r:TExp  => <[ (l) < (r) ]>
      | l:TAtom SPACE > SPACE r:TExp  => <[ (l) > (r) ]>
      | l:TAtom SPACE ≠ SPACE r:TExp  => <[ (l) ≠ (r) ]>
      | l:TAtom SPACE ∧ SPACE r:TExp  => <[ (l) ∧ (r) ]>
      | l:TAtom SPACE ∨ SPACE r:TExp  => <[ (l) ∨ (r) ]>
      | l:TAtom SPACE ∊ SPACE r:TExp  => <[ tstIn((l), (r)) ]>
      | l:TAtom SPACE ∪ SPACE r:TExp  => <[ tstUnion((l), (r)) ]>
      | l:TAtom SPACE ∩ SPACE r:TExp  => <[ tstIntersect((l), (r)) ]>
      | l:TAtom SPACE ~ SPACE r:TExp  => <[ tstWithout((l), (r)) ]>
      | l:TAtom SPACE ↑ SPACE r:TExp  => <[ tstTake((l), (r)) ]>
      | l:TAtom SPACE ↓ SPACE r:TExp  => <[ tstDrop((l), (r)) ]>
      | l:TAtom SPACE ⍟ SPACE r:TExp  => <[ tstLog((l), (r)) ]>
      | l:TAtom SPACE ⍪ SPACE r:TExp  => <[ tstCatFirst((l), (r)) ]>
      | ⍋ SPACE r:TExp  => <[ tstGradeUp((r)) ]>
      | ⍒ SPACE r:TExp  => <[ tstGradeDown((r)) ]>
      | ~ SPACE r:TExp  => <[ tstNot((r)) ]>
      | `* SPACE r:TExp => <[ * (r) ]>
      | a:TAtom          => <[ (a) ]>

    (* (4) the glyph-to-function table: each alternative is a host lambda, so a
       glyph handed to an operator becomes a value *)
    TSq :Expr:=
        ⌷ => <[ fn (x, y) => aplSquad1(x, y) ]>

    TDy :Expr:=
        × => <[ fn (x, y) => x × y ]>
      | ↑ => <[ fn (x, y) => tstTake(x, y) ]>
      | = => <[ fn (x, y) => x = y ]>
      | < => <[ fn (x, y) => x < y ]>
      | , => <[ fn (x, y) => aplCat(x, y) ]>

    TAtom :Expr:=
        ( SPACE e:TExp SPACE ) => <[ (e) ]>
      | s:TStrand            => <[ (s) ]>

    TStrand :Expr:=
        n:TNum SPACE s:TStrand => <[ aplCons((n), (s)) ]>
      | n:TNum                 => <[ (n) ]>

    TNum :Expr:=
        ¯# n:LiteralExpr => <[ aplNegS(1.0 (n)) ]>
      | n:LiteralExpr    => <[ (1.0 (n)) ]>
end

end
