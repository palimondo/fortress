(* AplSyntax -- the grammar half: a sub-language apl⦇ … ⦈ whose terminals are
   the APL glyphs, evaluated strictly right to left as APL is, desugaring to
   the functions of AplCore.  Grown from explorations/apl-probes/e30_aplg.fsi.

   Three things to know before editing this file.

   (1) The free names in the templates below (aplDy, aplMon, aplRed, aplCat,
       aplScalar, aplZilde) resolve at the USE SITE, not here, so this api does
       not import AplCore; the component that writes apl⦇ … ⦈ must import both.

   (2) SPACE and a plain space between symbols both translate to the
       nonterminal w, which is OPTIONAL whitespace
       (ComposingSyntaxDefTranslator.java:147-149), so 2 4⍴⍳8 parses against a
       production written with spaces.  That is what lets the chapter's
       examples be copied in verbatim.

   (3) The escape for APL's plus, an escaped + in the AplFn table, is seen by
       the PREPARSER as an opening quote that wants a closing ' (
       PreCompilation.rats:115, PreParserState.java:256).  The file survives
       only because the preparser cannot tokenise an APL glyph at all and gives
       up before it reaches the table.  Keep at least one APL glyph above the
       table (the ⌿ in AplE and the ⍬ in AplAtom are both above it), or the
       delimiter check reaches the end of the file and rejects it. *)
api AplSyntax

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar Apl extends { Expression, Literal }

    (* one new Expr form, with and without a trailing APL comment, so that a
       line of the book can be copied in as it stands.  The comment tail is
       right-recursive with a NOT predicate, one character at a time: a
       { NOT ⦈ _ }* group instead runs to the end of the file and the expander
       never closes (rung-1/p09_comment.out.0). *)
    Expr |:= apl⦇ e:AplE SPACE ⍝ t:AplCmt ⦈ => <[ (e) ]>
           | apl⦇ e:AplE ⦈                  => <[ (e) ]>

    AplCmt :Expr:=
        NOT ⦈ _ t:AplCmt => <[ 0 ]>
      | NOT ⦈ _          => <[ 0 ]>

    (* APL evaluation order: no precedence, strictly right to left.  The left
       argument of a dyadic function is an atom; its right argument is the
       whole rest of the expression.  f/ and f⌿ are one rule each, for every
       function glyph, rather than one rule per glyph. *)
    AplE :Expr:=
        l:AplAtom SPACE f:AplFn SPACE r:AplE => <[ aplDy((f), (l), (r)) ]>
      | f:AplFn / SPACE r:AplE               => <[ aplRed((f), "last", (r)) ]>
      | f:AplFn ⌿ SPACE r:AplE               => <[ aplRed((f), "first", (r)) ]>
      | f:AplFn SPACE r:AplE                 => <[ aplMon((f), (r)) ]>
      | a:AplAtom                            => <[ (a) ]>

    (* ⍬ is zilde, the empty numeric vector; ⍎(…) escapes to a Fortress
       expression, which is how APL here names a Fortress variable -- an Id gap
       cannot be spliced into an expression position (p03a).  The parentheses
       are load-bearing: an undelimited Expr gap is greedy and eats any host
       operator that follows it, so ⍎v ≡ 1 4⍴⍎v parsed as aplDy("rho", v EQV
       (1 4), v) and died with "** bug! Expect all oprefs to be top level EQV"
       (p06_cross.out.0).  Rats does not re-enter a nonterminal for a shorter
       match, so only a closing delimiter bounds the gap. *)
    AplAtom :Expr:=
        ⍬                      => <[ aplZilde() ]>
      | ⍎ ( SPACE e:Expr SPACE ) => <[ (e) ]>
      | ( SPACE e:AplE SPACE ) => <[ (e) ]>
      | s:AplStrand            => <[ (s) ]>

    (* strand notation: 1 2 3 is one vector, not three juxtaposed numbers *)
    AplStrand :Expr:=
        n:AplNum SPACE s:AplStrand => <[ aplCat((n), (s)) ]>
      | n:AplNum                   => <[ (n) ]>

    AplNum :Expr:= n:LiteralExpr => <[ aplScalar(1.0 (n)) ]>

    (* Every function glyph reduces to its name; AplCore dispatches on the
       name, monadically or dyadically according to which rule of AplE fired.
       A glyph the host lexer knows (× ÷ - , = < >) and one it does not (⍳ ⍴ ≢
       ≡ ⊃ ⌽ ⊖ ⍉) are equally ordinary terminals here. *)
    AplFn :Expr:=
        ⍳ => <[ "iota" ]>
      | ⍴ => <[ "rho" ]>
      | ≢ => <[ "tally" ]>
      | ≡ => <[ "match" ]>
      | ⊃ => <[ "first" ]>
      | ⌽ => <[ "reverse" ]>
      | ⊖ => <[ "reversefirst" ]>
      | ⍉ => <[ "transpose" ]>
      | ⌈ => <[ "ceil" ]>
      | ⌊ => <[ "floor" ]>
      | × => <[ "times" ]>
      | ÷ => <[ "divide" ]>
      | `+ => <[ "plus" ]>
      | `* => <[ "power" ]>
      | -  => <[ "minus" ]>
      | ,  => <[ "cat" ]>
      | ≠ => <[ "ne" ]>
      | ≤ => <[ "le" ]>
      | ≥ => <[ "ge" ]>
      | =  => <[ "eq" ]>
      | <  => <[ "lt" ]>
      | >  => <[ "gt" ]>
end

end
