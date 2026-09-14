(* X01Syn -- the microgpt rung's NAME probe, a throw-away grammar in the shape
   of base/AplSyntax.fsi but with only the rules the question needs: a binding,
   a dyadic ⍴ whose left argument is a NAME, ⍳, + , and a closed name set that
   carries the two contested spellings.

   Two questions, both about what the base's three closed name sets may hold.

   (a) a digit after a CAPITAL letter -- B1, Lr0, M0, X1.  Gap row 78 says a
       word of two or more uppercase letters is a Fortress OPERATOR and cannot
       be a name; one capital is fine (Q, K, A, B, S are in the set).  A capital
       followed by a DIGIT has never been asked.  The set already has m1, so a
       digit after a LOWERCASE letter is known to work.
   (b) an UNDERSCORE inside a name -- rmsn_b, sm_b.  `_` is one of the macro
       language's SpecialChars (gap row 77's list), and gap row 69 says a bare
       `_` is not accepted by an Id gap; whether `[_]` may be a character class
       of a name alternative, and whether an underscored name survives the
       `NOT [A:Za:z0:9]` terminator, has never been asked.

   The names are read in three positions, which is every position the program
   needs: as a free host name (B1, Lr0, Epsa, Blk, N, rmsn_b, sm_b are bound in
   the probe component), through the binding's Id gap (X1 ← , M0 ← ), and as
   the left argument of ⍴ , which is the microgpt rung's addition 4. *)
api X01Syn

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar X01G extends { Expression, Literal, Identifier }

    Expr |:= x01⦇ b:XStm ⦈ => <[ (b) ]>

    XStm :Expr:=
        n:Id SPACE ← SPACE e:XExp SPACE ⋄ SPACE r:XStm => <[ (fn n => (r))((e)) ]>
      | s:XExp SPACE ⋄ SPACE r:XStm                    => <[ (fn _ => (r))((s)) ]>
      | s:XExp                                         => <[ (s) ]>

    XExp :Expr:=
      (* addition 4, asked here as well: a NAME as the shape of a reshape *)
        n:XName SPACE ⍴ SPACE r:XExp => <[ aplReshapeV((n), (r)) ]>
      | a:XNum SPACE ⍴ SPACE r:XExp  => <[ aplReshapeV((a), (r)) ]>
      | ⍳ SPACE r:XExp               => <[ aplIota((r)) ]>
      | l:XAtom SPACE × SPACE r:XExp => <[ (l) × (r) ]>
      | l:XAtom SPACE `+ SPACE r:XExp => <[ (l) + (r) ]>
      | a:XAtom                      => <[ (a) ]>

    XAtom :Expr:=
        ( SPACE e:XExp SPACE ) => <[ (e) ]>
      | c:XName              => <[ (c) ]>
      | s:XStrand            => <[ (s) ]>

    (* the closed name set, longer names first, each letter one character class
       glued with # and closed by the NOT predicate, exactly as AplName is *)
    XName :Expr:=
        [r]# [m]# [s]# [n]# [`_]# [b]# NOT [A:Za:z0:9] => <[ (rmsn_b) ]>
      | [E]# [p]# [s]# [a]# NOT [A:Za:z0:9]           => <[ (Epsa) ]>
      | [s]# [m]# [`_]# [b]# NOT [A:Za:z0:9]           => <[ (sm_b) ]>
      | [B]# [l]# [k]# NOT [A:Za:z0:9]                => <[ (Blk) ]>
      | [L]# [r]# [0]# NOT [A:Za:z0:9]                => <[ (Lr0) ]>
      | [B]# [1]# NOT [A:Za:z0:9]                     => <[ (B1) ]>
      | [B]# [2]# NOT [A:Za:z0:9]                     => <[ (B2) ]>
      | [M]# [0]# NOT [A:Za:z0:9]                     => <[ (M0) ]>
      | [X]# [1]# NOT [A:Za:z0:9]                     => <[ (X1) ]>
      | [N]# NOT [A:Za:z0:9]                          => <[ (N) ]>

    XStrand :Expr:=
        n:XNum SPACE s:XStrand => <[ aplCons((n), (s)) ]>
      | n:XNum                 => <[ (n) ]>

    XNum :Expr:=
        ¯# n:LiteralExpr => <[ aplNegS(1.0 (n)) ]>
      | n:LiteralExpr    => <[ (1.0 (n)) ]>
end

end
