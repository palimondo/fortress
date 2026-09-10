api a02_twice_g

import FortressSyntax.{Expression}

grammar Twice extends { Expression }
    Expr |:= twice⦇ a:Expr ⦈ => <[ (a) + (a) ]>
end

end
