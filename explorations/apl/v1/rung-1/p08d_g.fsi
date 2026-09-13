(* p08d -- the escape one line further in: inside the expander brackets rather
   than in a table at grammar top level.  Now the preparser's unclosed quote
   also breaks the pairing of ⦇ with ⦈ (it renders them "(./" and "/.)"), so the
   report is four errors instead of two.  This was the first spelling of p02 and
   the first thing this rung hit. *)
api p08d_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P08d extends { Expression, Literal }
    Expr |:= p8d⦇ a:LiteralExpr `+ b:LiteralExpr ⦈ => <[ (a) + (b) ]>
end

end
