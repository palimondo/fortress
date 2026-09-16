api MatrixC

import FortressSyntax.{Expression}

grammar MatrixG extends { Expression }
    Expr |:= m1⦇ ⦈          => <[ 42 ]>
           | m2⦇ a:Expr ⦈   => <[ (a) ]>
           | m3⦇ a:Expr ⦈   => <[ ((a) + (a)) ]>
           | m4⦇ a:Expr ⦈   => <[ (a) + (a) ]>
end

end
