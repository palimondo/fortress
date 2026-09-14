(* q05 -- bisecting the rejection of a template that is just a NAME.  q04's
   reference template <[ v ]> and then <[ (v) ]> were both rejected, "Could not
   parse 'v '" and "Could not parse '(v) '".  Four spellings in file order, so
   that the first one the template parser rejects is the one it names:

     1 (vv)        a parenthesised name of two letters
     2 q05id vv    the same name juxtaposed after an ordinary identifier
     3 (v)         a parenthesised name of ONE letter
     4 q05id v     one letter, juxtaposed

   Alternatives 1-4 of Q05x are never used at a use site; the template parser
   parses every template in the api regardless. *)
api q05_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q05a extends { Expression, Literal, Identifier }
    Expr |:= qfive⦇ a:Q05x ⦈ => <[ (a) ]>

    Q05x :Expr:=
        aa => <[ (vv) ]>
      | bb => <[ q05id vv ]>
      | cc => <[ (v) ]>
      | dd => <[ q05id v ]>
      | x:LiteralExpr => <[ (x) ]>
end

end
