api G_app
import FortressSyntax.{Expression}
grammar G_appG extends { Expression }
    Expr |:= app⦇ a:Expr ⦈ => <[ (applytoc(fn (w: ZZ32): ZZ32 => (a) + w, 3)) ]>
end
end
