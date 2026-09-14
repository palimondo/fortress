api b06b_repeat_g
import FortressAst.{...}
import FortressSyntax.{Expression, Literal}
grammar Rep2 extends { Expression, Literal }
    Expr |:= sumb⦇ n1:Num2 ns:More2* ⦈ => <[ sumOf2((n1), ns) ]>
    Num2 :Expr:= n:LiteralExpr => <[ (n) ]>
    More2 :Expr:= SPACE n:Num2 => <[ (n) ]>
end
end
