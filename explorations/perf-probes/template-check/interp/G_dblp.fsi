api G_dblp
import FortressSyntax.{Expression}
grammar G_dblpG extends { Expression }
    Expr |:= dblp⦇ a:Expr ⦈ => <[ (mydoublec(a)) ]>
end
end
