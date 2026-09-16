api G_lamp
import FortressSyntax.{Expression}
grammar G_lampG extends { Expression }
    Expr |:= lamp⦇ a:Expr ⦈ => <[ ((fn (w: ZZ32): ZZ32 => (a) + w)(10)) ]>
end
end
