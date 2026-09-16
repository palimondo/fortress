api G_appq
import FortressSyntax.{Expression}
import VocabC.{...}
grammar G_appqG extends { Expression }
    Expr |:= appq⦇ a:Expr ⦈ => <[ (applytoc(fn (w: ZZ32): ZZ32 => (a) + w, 3)) ]>
end
end
