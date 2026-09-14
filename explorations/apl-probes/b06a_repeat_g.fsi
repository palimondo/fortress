api b06a_repeat_g
import FortressAst.{...}
import FortressSyntax.{Expression, Literal}
grammar Rep extends { Expression, Literal }
    Expr |:= sum⦇ n1:Num ns:More* ⦈ => <[ sumOf(<| (n1), ns** |>) ]>
    Num :Expr:= n:LiteralExpr => <[ (n) ]>
    More :Expr:= SPACE n:Num => <[ (n) ]>
end
end
