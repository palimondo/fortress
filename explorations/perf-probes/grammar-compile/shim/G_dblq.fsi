api G_dblq
import FortressSyntax.{Expression}
import VocabC.{...}
grammar G_dblqG extends { Expression }
    Expr |:= dblq⦇ a:Expr ⦈ => <[ (mydoublec(a)) ]>
end
end
