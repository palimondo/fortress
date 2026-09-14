(* V02Syn -- a throw-away grammar that asks ONLY "is this character usable as a
   terminal of a production, and does it need the backtick escape of gaps.md
   row 3?", for the five characters rungs 5 and 6 add:

     ¨  each            (U+00A8, a Latin-1 diaeresis -- the only non-ASCII one
                         of the five that is also a plain host character)
     \  scan            (the design says "may need the backtick escape -- probe")
     ⍀  scan-first
     ⍣  power
     .  the dot of ∘.g and f.g   (rung 6, asked here to save a run)

   The shape is rung 4's U06Syn.fsi, which is rung 3's T02Syn.fsi: a grammar
   that is KNOWN to work at the use site, trimmed to the rules that call AplCore
   directly, with the new alternatives added.  The ⍴ rule stands first so that an
   APL glyph is above every backtick escape (row 3).

   The two characters that might need the escape are asked TWICE, once bare and
   once escaped, under different left glyphs so that the output says which rule
   fired. *)
api V02Syn

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar V02G extends { Expression, Literal, Identifier }

    Expr |:= v02⦇ e:TExp ⦈ => <[ (e) ]>

    TExp :Expr:=
        l:TAtom SPACE ⍴ SPACE r:TExp => <[ aplReshapeV((l), (r)) ]>

      (* ¨ each, both valences *)
      | l:TAtom SPACE f:TDy ¨ SPACE r:TExp => <[ ("each2 " aplShow(aplCall((f), (l), (r)))) ]>
      | f:TMo ¨ SPACE r:TExp               => <[ ("each1 " aplShow(aplCall1((f), (r)))) ]>

      (* \ : the BARE spelling `| × \ SPACE r:TExp` is a Syntax Error at the
         backslash itself (v02_term.out.0, `V02Syn.fsi:38:12: Syntax Error`), so
         only the escaped one is left. *)
      | ⌈ [\]# SPACE r:TExp => <[ ("class-backslash " aplShow(aplMaxLast((r)))) ]>

      (* ⍀ scan-first *)
      | × ⍀ SPACE r:TExp => <[ ("slashbar " aplShow(aplProdFirst((r)))) ]>

      (* ⍣ power, with the count read off the source as ⍤'s rank is *)
      | f:TMo ⍣ SPACE n:TAtom SPACE ⊢ SPACE r:TExp
            => <[ ("power " aplShow(aplCall1((f), (r))) " n=" aplShow((n))) ]>

      (* . bare after ∘ , and ESCAPED under a different right glyph *)
      | l:TAtom SPACE ∘ . × SPACE r:TExp  => <[ ("bare-dot " aplShow((l) × (r))) ]>
      | l:TAtom SPACE ∘ `. ⌈ SPACE r:TExp => <[ ("escaped-dot " aplShow((l) MAX (r))) ]>

      | l:TAtom SPACE × SPACE r:TExp => <[ (l) × (r) ]>
      | a:TAtom                      => <[ (a) ]>

    TDy :Expr:=
        × => <[ fn (): Any => aplAlpha() × aplOmega() ]>
      | `+ => <[ fn (): Any => aplAlpha() + aplOmega() ]>

    TMo :Expr:=
        ÷ => <[ fn (): Any => ÷ aplOmega() ]>
      | × => <[ fn (): Any => × aplOmega() ]>

    TAtom :Expr:=
        ( SPACE e:TExp SPACE ) => <[ (e) ]>
      | s:TStrand              => <[ (s) ]>

    TStrand :Expr:=
        n:TNum SPACE s:TStrand => <[ aplCons((n), (s)) ]>
      | n:TNum                 => <[ (n) ]>

    TNum :Expr:=
        ¯# n:LiteralExpr => <[ aplNegS(1.0 (n)) ]>
      | n:LiteralExpr    => <[ (1.0 (n)) ]>
end

end
