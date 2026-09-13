(* q02a -- can an Id gap be spliced into an EXPRESSION position after all, if
   it stands as a function ARGUMENT?  Rung 1 found that ( i ) + 1 and i + 1
   both fail (gap row 4), but neither spelling is the one a sub-language needs:
   what it needs is the name as an argument of the desugaring's call. *)
api q02a_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q02a extends { Expression, Literal, Identifier }
    Expr |:= qarg⦇ n:Id ⦈ => <[ q02inc(n) ]>
end

end
