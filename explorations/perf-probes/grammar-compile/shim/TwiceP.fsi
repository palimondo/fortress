api TwiceP

import FortressSyntax.{Expression}

grammar TwicePG extends { Expression }
    Expr |:= twicep⦇ a:Expr ⦈ => <[ ((a) + (a)) ]>
end

end
