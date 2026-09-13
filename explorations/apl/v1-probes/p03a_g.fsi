(* p03a -- p02 showed that an Id gap spliced as (i) into an expression position
   cannot be parsed by the template parser ("Could not parse
   '( <!@#$%^&*<Id i >*&^%$#@!> ) + 1 '").  For.fsi uses its Id gap bare, in a
   binder position (fn i => d).  Does a bare Id gap work in an expression
   position? *)
api p03a_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar P03a extends { Expression, Literal, Identifier }
    Expr |:= idbare⦇ i:Id ⦈ => <[ i + 1 ]>
end

end
