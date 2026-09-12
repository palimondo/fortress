(* q11 -- task C: a newline-terminated form.  The paper argues AGAINST bracketed
   extension forms -- "We could have chosen to enclose all macro uses in special
   brackets … However, the result would have been a language in which extensions
   stand out conspicuously from core syntax, reminiscent of user-defined function
   definitions in APL" (§3, p2) -- and the shipped Regex.fsi indeed uses no
   expander brackets at all: its form is Expr |:= x:Regex, and Regex itself
   begins and ends with a slash.  So: can an APL line be written

       apl 2 3 ⍴ ⍳ 6

   with a keyword to enter and the END OF LINE to leave?

   Syntax.rats:362 gives a NEWLINE Item (ComposingSyntaxDefTranslator.java:162
   translates it to the Rats string literal "\n"), and Syntax.rats:286 gives the
   AND predicate, which matches without consuming.  Both are tried here, plus the
   form with no terminator at all, plus the bracketed form, all four in ONE
   grammar so that the coexistence question is answered by the same run.

   Two mechanics to know.  (1) The space between two symbols of a production is
   an OPTIONAL-whitespace nonterminal w (gap row 1) and w eats newlines
   (Spacing.rats:92), so a space before NEWLINE would consume the newline and
   then fail to match it; # after the preceding symbol is what deletes that w
   (WhitespaceElimination.java:29-31), which is why it is written e:Q11E# NEWLINE.
   (2) A terminal that is a valid identifier becomes a KEYWORD of the whole
   language (ItemDisambiguator.java:109-122, ParserMaker.java:296), so aplx,
   aplw and aply below are reserved words in every component importing this api,
   while aplz⦇ is not -- it is not a valid identifier, so it is a token. *)
api q11_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar Q11a extends { Expression, Literal }
    Expr |:= aplx SPACE e:Q11E# NEWLINE     => <[ (e) ]>
           | aplw SPACE e:Q11E# AND NEWLINE => <[ (e) ]>
           | aply SPACE e:Q11E              => <[ (e) ]>
           | aplz⦇ e:Q11E ⦈                 => <[ (e) ]>

    Q11E :Expr:=
        l:Q11S SPACE f:Q11F SPACE r:Q11E => <[ q11dy((f), (l), (r)) ]>
      | f:Q11F SPACE r:Q11E              => <[ q11mon((f), (r)) ]>
      | s:Q11S                           => <[ (s) ]>

    Q11S :Expr:=
        n:Q11N SPACE s:Q11S => <[ q11cat((n), (s)) ]>
      | n:Q11N              => <[ (n) ]>

    Q11N :Expr:= n:LiteralExpr => <[ q11num((n)) ]>

    Q11F :Expr:= ⍴ => <[ "⍴" ]> | ⍳ => <[ "⍳" ]>
end

end
