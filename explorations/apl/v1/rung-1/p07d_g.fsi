(* p07d -- the fourth spelling of APL's assignment arrow.  Three ways of making
   a template expand to an assignment all failed (p07_assign.out.0 .1 and the
   Id-gap spelling in p07_assign.out): the template parser has no gap position
   on the left of :=.  What a template CAN do is call a method, so this one
   assigns through a user cell object.  That is as close to v ← … as the
   mechanism allows without touching the language. *)
api p07d_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P07d extends { Expression, Literal }
    Expr |:= asgnc⦇ ⍎ ( t:Expr ) ← r:Expr ⦈ => <[ ((t)).put((r)) ]>
end

end
