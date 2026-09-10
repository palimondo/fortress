api b07b_optvar_g
import FortressAst.{...}
import FortressSyntax.{Expression}
grammar Opt2 extends { Expression }
    Expr |:= negb⦇ m:Minus2? e:Expr ⦈ => <[ maybeNeg(m, (e)) ]>
    Minus2 :Expr:= minus SPACE => <[ 0 ]>
end
end
