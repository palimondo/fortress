api b08_caseof_g
import FortressAst.{...}
import FortressSyntax.{Expression, Literal}
grammar CaseG extends { Expression, Literal }
    Expr |:= kind⦇ n1:Num8 ns:More8* ⦈ =>
        case ns of
            Cons(h, t) => <[ "more than one" ]>
            Empty => <[ "exactly one" ]>
        end
    Num8 :Expr:= n:LiteralExpr => <[ (n) ]>
    More8 :Expr:= SPACE n:Num8 => <[ (n) ]>
end
end
