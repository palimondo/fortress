(* B: where do free identifiers in a <[ template ]> resolve -- in the
   grammar's api, or at the use site? *)
api b05_hygiene_g

import FortressSyntax.{Expression}

grammar Hyg extends { Expression }
    Expr |:= dbl⦇ a:Expr ⦈ => <[ mydouble(a) ]>
end

end
