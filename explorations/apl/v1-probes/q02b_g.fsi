(* q02b -- and can an Id gap be the WHOLE template, so that a name in the
   sub-language reduces to the value of the Fortress variable with no wrapper
   at all?  This is the spelling AplBase would want: n:Id => <[ n ]>. *)
api q02b_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q02b extends { Expression, Literal, Identifier }
    Expr |:= qbare⦇ n:Id ⦈ => <[ n ]>
end

end
