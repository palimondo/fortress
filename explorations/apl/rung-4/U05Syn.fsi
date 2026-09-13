(* U05Syn -- rung 3's throw-away grammar T02Syn.fsi, copied verbatim and given
   two extra alternatives at the top of TExp, one for ⍺ (U+237A) and one for
   ⍵ (U+2375).  Copying a grammar that is known to work was the only way to ask
   the question cleanly: four hand-written minimal grammars all failed at the
   USE site (u05_glyphid.out.4 through .out.9), and .out.6 shows the same
   failure for ⍳, a glyph rungs 1-3 use daily, so those failures were the
   grammar's shape and said nothing about these two characters.

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
api U05Syn

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar U05G extends { Expression, Literal, Identifier }

    Expr |:= dfn⦇ e:TExp ⦈ => <[ (e) ]>

    TExp :Expr:=
      (* u05: the only two alternatives that matter here.  ⍺ is U+237A and ⍵ is
         U+2375; the factors 100 and 200 are there only so the output tells the
         two rules apart. *)
        ⍺ SPACE r:TExp => <[ (r) 100.0 ]>
      | ⍵ SPACE r:TExp => <[ (r) 200.0 ]>
      |
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
