(* p03b -- if an Id gap cannot be an expression, the other way to let APL name
   a Fortress variable is an Expr gap used as an escape hatch.  Two questions:
   (1) does an Expr gap stop at an APL glyph the host lexer does not know
       (U+2374 here), so that the glyph can delimit it?
   (2) does it stop at U+2261, which the host lexer does know?  If not, an
       Expr gap cannot be the left argument of APL's match. *)
api p03b_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P03b extends { Expression, Literal }
    Expr |:= esc1⦇ a:Expr ⍴ b:Expr ⦈ => <[ p03pair((a), (b)) ]>
           | esc2⦇ a:Expr ≡ b:Expr ⦈ => <[ p03pair((a), (b)) ]>
end

end
