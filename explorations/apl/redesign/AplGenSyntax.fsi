(* AplGenSyntax -- the grammar half of the APL redesign.  Same sub-language
   apl⦇ … ⦈ as base/AplSyntax.fsi, same strictly right-to-left evaluation, same
   strands, same index origin 0 -- but the templates expand to HOST CODE, not to
   a string-dispatched interpreter.  Where base wrote

       l:AplAtom SPACE f:AplFn SPACE r:AplE => <[ aplDy((f), (l), (r)) ]>
       ⍳ => <[ "iota" ]>   ×  => <[ "times" ]>   …

   and made AplCore switch on the name at run time, this file writes one rule
   per glyph per arity, and the expansion is the Fortress operator itself:

       l:AplAtom SPACE × SPACE r:AplE => <[ (l) × (r) ]>

   so the monadic/dyadic split and the rank split are both done by Fortress
   overload resolution, at the call, with no dispatch table in the library.

   Two consequences for the shape of the grammar.

   (1) One rule per glyph per arity is more rules than base's one rule for all
       glyphs -- but each rule is a translation, so the library loses its
       aplDy/aplMon/aplRed switches (67 lines in base) entirely.

   (2) Dyadic ⍴ is the one primitive whose RESULT RANK is the LENGTH of its left
       argument, a run-time value.  Rather than carry a runtime rank in the
       values, the grammar reads the rank off the SOURCE TEXT: `r c⍴x` is a
       matrix and fires aplReshapeM, `n⍴x` is a vector and fires aplReshapeV.
       These two rules must come first, before the strand in AplAtom can eat
       `r c` as one vector.

   The five things to know before editing base/AplSyntax.fsi all still hold:
   free names resolve at the use site; SPACE and a literal space are both
   OPTIONAL whitespace; a backtick escape is seen by the PREPARSER as an opening
   quote, so at least one APL glyph must stand ABOVE every escape (the ⍴ of the
   first rule is above them all); a nonterminal's name must not be a word of two
   or more uppercase letters; and a template cannot expand to a binding or an
   assignment, which is why rung 1 needs no APL names at all. *)
api AplGenSyntax

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar AplG extends { Expression, Literal }

    Expr |:= apl⦇ e:AplE SPACE ⍝ t:AplCmt ⦈ => <[ (e) ]>
           | apl⦇ e:AplE ⦈                  => <[ (e) ]>

    (* the book's own trailing comment, one character at a time: a NOT inside a
       repetition group runs to the end of the file (apl/gaps.md row 9) *)
    AplCmt :Expr:=
        NOT ⦈ _ t:AplCmt => <[ 0 ]>
      | NOT ⦈ _          => <[ 0 ]>

    AplE :Expr:=
      (* ---- dyadic ⍴: the rank of the result is fixed HERE, at expansion ---- *)
        a:AplNum SPACE b:AplNum SPACE ⍴ SPACE r:AplE => <[ aplReshapeM((a), (b), (r)) ]>
      | a:AplNum SPACE ⍴ SPACE r:AplE                => <[ aplReshapeV((a), (r)) ]>

      (* ---- dyadic glyphs.  Each expands to the host operator of the same
              shape; ⌈ and ⌊ are enclosers in the host table and cannot be
              declared, so they expand to MAX and MIN while the APL source keeps
              the glyph.  , cannot be an operator in any arity, so it expands to
              a call. ---- *)
      | l:AplAtom SPACE × SPACE r:AplE => <[ (l) × (r) ]>
      | l:AplAtom SPACE ÷ SPACE r:AplE => <[ (l) ÷ (r) ]>
      | l:AplAtom SPACE ⌈ SPACE r:AplE => <[ (l) MAX (r) ]>
      | l:AplAtom SPACE ⌊ SPACE r:AplE => <[ (l) MIN (r) ]>
      | l:AplAtom SPACE ≡ SPACE r:AplE => <[ (l) ≡ (r) ]>
      | l:AplAtom SPACE ≤ SPACE r:AplE => <[ (l) ≤ (r) ]>
      | l:AplAtom SPACE , SPACE r:AplE => <[ aplCat((l), (r)) ]>
      | l:AplAtom SPACE = SPACE r:AplE => <[ (l) = (r) ]>
      | l:AplAtom SPACE - SPACE r:AplE => <[ (l) - (r) ]>
      | l:AplAtom SPACE `+ SPACE r:AplE => <[ (l) + (r) ]>
      | l:AplAtom SPACE `* SPACE r:AplE => <[ (l) * (r) ]>

      (* ---- reductions.  f/ is the last axis, f⌿ the first.  base had ONE rule
              for every glyph because the glyph became a string; here there is
              one rule per glyph, and the expansion names the library function
              whose body is the shipped SUM / PROD / BIG MAX. ---- *)
      | `+ / SPACE r:AplE => <[ aplSumLast((r)) ]>
      | `+ ⌿ SPACE r:AplE => <[ aplSumFirst((r)) ]>
      | × / SPACE r:AplE  => <[ aplProdLast((r)) ]>
      | ⌈ / SPACE r:AplE  => <[ aplMaxLast((r)) ]>
      | - / SPACE r:AplE  => <[ aplDifLast((r)) ]>

      (* ---- monadic glyphs ---- *)
      | ⍴ SPACE r:AplE => <[ aplShapeOf((r)) ]>
      | ⍳ SPACE r:AplE => <[ aplIota((r)) ]>
      | ≢ SPACE r:AplE => <[ ≢ (r) ]>
      | ⊃ SPACE r:AplE => <[ ⊃ (r) ]>
      | ⊖ SPACE r:AplE => <[ ⊖ (r) ]>
      | ⌽ SPACE r:AplE => <[ aplRev((r)) ]>
      | ⍉ SPACE r:AplE => <[ aplTrans((r)) ]>
      | ⌈ SPACE r:AplE => <[ aplCeil((r)) ]>
      | ⌊ SPACE r:AplE => <[ aplFloor((r)) ]>
      | × SPACE r:AplE => <[ × (r) ]>
      | ÷ SPACE r:AplE => <[ ÷ (r) ]>
      | , SPACE r:AplE => <[ aplRavel((r)) ]>
      | - SPACE r:AplE => <[ - (r) ]>
      | `+ SPACE r:AplE => <[ (r) ]>
      | a:AplAtom      => <[ (a) ]>

    AplAtom :Expr:= b:AplBase => <[ (b) ]>

    (* ⍬ is zilde; ⍎(…) escapes to a Fortress expression, the parentheses being
       load-bearing because an undelimited Expr gap is greedy (gaps row 5) and an
       Id gap is not an expression at all (gaps row 4) *)
    AplBase :Expr:=
        ⍬                        => <[ aplZilde() ]>
      | ⍎ ( SPACE e:Expr SPACE ) => <[ (e) ]>
      | ( SPACE e:AplE SPACE )   => <[ (e) ]>
      | s:AplStrand              => <[ (s) ]>

    (* strand notation: 1 2 3 is one vector, 3 alone is a scalar.  The tail is a
       scalar when it has one element and a vector when it has more, and aplCons
       is overloaded on exactly that, so the grammar counts nothing. *)
    AplStrand :Expr:=
        n:AplNum SPACE s:AplStrand => <[ aplCons((n), (s)) ]>
      | n:AplNum                   => <[ (n) ]>

    (* ¯ is APL's high minus, part of the numeral; every APL number is an RR64 *)
    AplNum :Expr:=
        ¯# n:LiteralExpr => <[ aplNegS(1.0 (n)) ]>
      | n:LiteralExpr    => <[ (1.0 (n)) ]>
end

end
