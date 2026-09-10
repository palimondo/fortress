api b07a_option_g
import FortressAst.{...}
import FortressSyntax.{Expression}
grammar Opt extends { Expression }
    Expr |:= neg⦇ Minus? e:Expr ⦈ => <[ (e) ]>
    Minus :Expr:= minus SPACE => <[ 0 ]>
end
end
