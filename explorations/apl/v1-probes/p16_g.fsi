(* p16 -- the one assignment route rung 1 did not try.  Rung 1 asked whether a
   template can expand to an ASSIGNMENT, ( t ) := ( r ), in three spellings, and
   all three failed with a Syntax Error at the := (gap row 8, p07_assign.out.0 and .1).
   This asks the neighbouring question: can it expand to a DECLARATION, t = (r)?
   An Id gap is legal in a binder position -- that is the one place the shipped
   For.fsi uses one (syntax_abstraction_tests/For.fsi:19, fn i => d) -- and a
   declaration binds rather than assigns, so the gap sits in a binder position
   here too.  If it parses, the question becomes one of SCOPE, not syntax: the
   binding lives in the do block the expansion introduces. *)
api p16_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar P16 extends { Expression, Literal, Identifier }
    Expr |:= decl⦇ t:Id ← r:Expr ⦈ => <[ do t = (r); println(("inside the expansion, " t)); t end ]>
end

end
