api G_lamq
import FortressSyntax.{Expression}
import VocabC.{...}
grammar G_lamqG extends { Expression }
    Expr |:= lamq⦇ a:Expr ⦈ => <[ ((fn (w: ZZ32): ZZ32 => (a) + w)(10)) ]>
end
end
