api b06c_repeat_g
import FortressAst.{...}
import FortressSyntax.{Expression, Literal}
grammar Rep3 extends { Expression, Literal }
    Expr |:= sumc⦇ n1:Num3 ns:More3* ⦈ => <[ sumOf3(<|[\ZZ32\] (n1), ns** |>) ]>
    Num3 :Expr:= n:LiteralExpr => <[ (n) ]>
    More3 :Expr:= SPACE n:Num3 => <[ (n) ]>
end
end
