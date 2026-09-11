(* p02 grammar -- three questions at once:
   (a) is the whitespace between symbols in a production optional?  The
       translator turns both a literal space and SPACE into the nonterminal w
       (ComposingSyntaxDefTranslator.java:147-149), so a use site written with
       no spaces at all should parse against a production written with them.
   (b) can an Id gap be spliced into an expression position, so that APL can
       name a Fortress variable?
   (c) can one production carry a *function glyph* gap followed by the reduce
       slash, so that f/ is one rule for every dyadic glyph rather than one
       rule per glyph?
   The escaped plus in the table below is what cost this probe two spellings:
   the preparser reads a backtick as an opening quote wanting a closing '
   (PreCompilation.rats:115, PreParserState.java:256).  p02_mech.out.0 is the
   rejection of the spelling without the APL glyph; p08d_pre.out is the first
   spelling of all, with the escape inside the expander brackets.  This
   spelling puts an APL glyph (U+2373) in the first alternative of the table,
   which the preparser cannot tokenise at all, so it abandons the delimiter
   check before reaching the escape; p08a and p08b isolate that. *)
api p02_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar P02 extends { Expression, Literal, Identifier }
    Expr |:= nospace⦇ a:LiteralExpr , b:LiteralExpr ⦈ => <[ (a) + (b) ]>
           | idgap⦇ i:Id ⦈                            => <[ (i) + 1 ]>
           | redop⦇ f:P02Fn / SPACE n:LiteralExpr ⦈   => <[ p02Red((f), (n)) ]>

    P02Fn :Expr:=
        ⍳ => <[ "iota" ]>
      | `+ => <[ "plus" ]>
      | `* => <[ "power" ]>
      | ×  => <[ "times" ]>
end

end
