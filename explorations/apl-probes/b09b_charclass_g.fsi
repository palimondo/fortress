api b09b_charclass_g
import FortressAst.{...}
import FortressSyntax.{Expression}
grammar Cls extends { Expression }
    Expr |:= cls⦇ c:AplChar ⦈ => <[ c ]>
    AplChar:String :Expr:= x:[⍳:⍺] => <[ x ]>
end
end
