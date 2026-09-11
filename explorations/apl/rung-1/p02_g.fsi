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
   First spelling of this file put an escaped plus inside the expander
   brackets; see p02_mech.out.0.  Second spelling kept the escapes but had no
   APL glyph before them, and the preparser's delimiter check then reaches the
   end of the file and reports the escape as an unclosed quote
   (PreParserState.java:256, PreCompilation.rats:115); see p02_mech.out.1.
   Third spelling puts an APL glyph (U+2373) in the first alternative, which
   the preparser cannot tokenise at all, so it gives up before the escape. *)
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
