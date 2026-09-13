(* q08 -- the design that keeps the lambda route AND lets APL rebind.

   q07 showed that a second binding of a name inside one block is a nested
   lambda parameter of the same name, which this implementation rejects, so
   neither m ← … twice nor the indexed assignment v[3] ← ¯1 (a rebinding,
   AplArr being a value object) can go through a second lambda.

   So the block binds each name ONCE, in a preamble the expander writes, to a
   mutable CELL -- a reference object with a var field, whose put/get are
   ordinary calls, which is the one route to assignment rung 1 found open
   (gap row 8: asgnc⦇ ⍎(c) ← 41 ⦈ -> c.put(41) works).  Every APL name is then a
   real Fortress variable, bound by the lambda route, scoped to the block, and
   assignment is a call on it.

   The price is a CLOSED name set: the preamble and the name nonterminal each
   carry one line per name.  The assignment productions stay generic -- there is
   one per left-hand-side shape, not one per shape per name -- because the left
   of ← is parsed by the same name nonterminal, which yields the cell. *)
api q08_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q08a extends { Expression, Literal, Identifier }
    (* the preamble: one Fortress variable per APL name, each a fresh cell *)
    Expr |:= qeight⦇ blk:Q08S ⦈ => <[ (fn (v, m) => (blk))(q08cell(), q08cell()) ]>

    Q08S :Expr:=
        s:Q08E SPACE ⋄ SPACE r:Q08S => <[ (fn _ => (r))(q08echo((s))) ]>
      | s:Q08E
        r:Q08S                      => <[ (fn _ => (r))(q08echo((s))) ]>
      | s:Q08E                      => <[ (s) ]>

    Q08E :Expr:=
        c:Q08N SPACE ← SPACE r:Q08E        => <[ q08put((c), (r)) ]>
      | c:Q08N ⌈ SPACE ← SPACE r:Q08E      => <[ q08put((c), q08bump(q08val((c)), (r))) ]>
      | l:Q08A SPACE ⍴ SPACE r:Q08E        => <[ q08dy((l), (r)) ]>
      | a:Q08A                             => <[ (a) ]>

    Q08A :Expr:=
        c:Q08N          => <[ q08val((c)) ]>
      | x:LiteralExpr   => <[ (x) ]>

    (* one alternative per name, a character class so that nothing becomes a
       keyword (q05), each yielding the CELL *)
    Q08N :Expr:=
        [v]# NOT [A:Za:z0:9] => <[ (v) ]>
      | [m]# NOT [A:Za:z0:9] => <[ (m) ]>
end

end
