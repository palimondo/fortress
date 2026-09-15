api Y06Syn
import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}
grammar Y06G extends { Expression, Literal, Identifier }
    Expr |:= s5⦇ × ⍟ SPACE n:Y6N ⦈ => <[ log((n)) ]>
           | s6⦇ `+ / SPACE r:Y6N ⦈ => <[ SUM (r) ]>
           | s8⦇ `+ / SPACE l:Y6N SPACE × SPACE r:Y6N ⦈ => <[ (l) DOT (r) ]>
           | s8⦇ `+ / SPACE l:Y6N SPACE × SPACE n:Y6L ⦈ => <[ (l) DOT (n) ]>
           | s2⦇ n:Y6L ⦈ => <[ (n) ]>
           | s9⦇ n:Y6Q ⦈ => <[ (n) ]>
           | s3⦇ / SPACE n:Y6N ⦈ => <[ (n) ]>
    Y6Q :Expr:=
        `+ SPACE n:Y6N => <[ (n) ]>

    Y6L :Expr:=
        ⍟ SPACE n:Y6N => <[ log((n)) ]>

    Y6N :Expr:=
        [v]# [v]# NOT [A:Za:z0:9] => <[ (vv) ]>
      | [w]# [w]# NOT [A:Za:z0:9] => <[ (ww) ]>
end
end
