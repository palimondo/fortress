(* AplSyntaxB -- rung 2b's grammar: the same sub-language as base/AplSyntax.fsi,
   with APL's variables rebuilt on the route the shipped For.fsi uses and the
   paper describes, an identifier gap bound as a LAMBDA PARAMETER, instead of on
   rung 2's workspace table.  base/ is not touched; this file is the copy the
   brief asked for, and AplCore is unchanged.

   What changed, and why each piece is spelled the way it is (the probes are
   q01 to q09 in this directory).

   (1) A name is a CELL -- a reference object with a var field, declared in the
       using component -- and never a String.  Rung 2's aplGet("v")/aplSet("v",…)
       become aplCellGet(v)/aplCellPut(v,…) on a Fortress variable called v.

   (2) The BINDER is a generic Id gap spliced into a lambda parameter:
       n:Id ← e ⋄ rest  =>  (fn n => rest)(aplCellNew(e)).  That works (q01), and
       the name is then visible to ordinary Fortress code in the body, because a
       gap is NOT gensymmed (Transform.generateId returns the original for a
       TemplateGapId) while a binder written as a literal identifier of a template
       IS (q08: the preamble fn (v, m) => … is renamed, and the reference
       templates then fail with "Variable v is not defined").

   (3) The REFERENCE cannot be a gap at all: Transform.forVarRef looks a VarRef's
       id up in the hygiene environment instead of recurring into it, so a
       TemplateGapId inside a VarRef is never substituted and reaches the
       disambiguator as an Id with a null apiName (q03:
       "Parameter 'apiName' to the IdOrOpOrAnonymousName constructor was null").
       So the reference is one ALTERNATIVE PER NAME whose template writes that
       name as an ordinary free identifier, which resolves at the use site.
       That is the closed name set below, and it is the price of this design.

   (4) Each name in that set is spelled as a CHARACTER CLASS, [v], and never as
       the bare terminal v: a terminal that is a valid identifier becomes a
       KeywordSymbol (ItemDisambiguator.java:109-122) and every keyword of a user
       grammar is added to FORTRESS_KEYWORDS (ParserMaker.java:296), after which
       Id excludes it and the name is unreadable as a name everywhere, templates
       included -- q04 died exactly so, "Could not parse '(v) '".  A class is a
       CharacterClassSymbol and reserves nothing (q05, q06).

   (5) Statements: ⋄ or a line break separates them, and the last one is the
       block's value.  A line break between two symbols of a production becomes
       br (ComposingSyntaxDefTranslator.java:152), which is the host's own
       required line break -- Spacing.rats:101, br = nl / s semicolon w -- so a
       semicolon works in its place too.

   (6) Rung 2's notes (3) and (4) still hold: keep an APL glyph above every
       backtick escape, and no nonterminal may be named by two or more uppercase
       letters. *)
api AplSyntaxB

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar AplB extends { Expression, Literal, Identifier }

    (* one new Expr form, with and without a trailing APL comment.  The comment
       tail runs to ⦈, so it can only be the LAST thing in a block: a comment
       after a non-final statement would swallow the statements below it. *)
    Expr |:= apl⦇ b:AplbStm SPACE ⍝ t:AplbCmt ⦈ => <[ (b) ]>
           | apl⦇ b:AplbStm ⦈                   => <[ (b) ]>

    AplbCmt :Expr:=
        NOT ⦈ _ t:AplbCmt => <[ 0 ]>
      | NOT ⦈ _           => <[ 0 ]>

    (* the statement layer.  A binding needs a REST to be the body of its lambda,
       so the two binding alternatives come first and both demand a separator and
       a following statement; a line of the book that stands alone therefore falls
       through to the assignment rules of AplbE, which put to an existing cell. *)
    AplbStm :Expr:=
        n:Id SPACE ← SPACE e:AplbE SPACE ⋄ SPACE r:AplbStm
            => <[ (fn n => (r))(aplCellNew((e))) ]>
      | n:Id SPACE ← SPACE e:AplbE
        r:AplbStm
            => <[ (fn n => (r))(aplCellNew((e))) ]>
      | s:AplbE SPACE ⋄ SPACE r:AplbStm => <[ (fn _ => (r))((s)) ]>
      | s:AplbE
        r:AplbStm                       => <[ (fn _ => (r))((s)) ]>
      | s:AplbE                         => <[ (s) ]>

    (* exactly rung 2's AplE, with aplSet(name, …) replaced by aplCellPut(cell, …)
       and aplGet(name) by aplCellGet(cell) *)
    AplbE :Expr:=
        c:AplbName `[ SPACE i:AplbE SPACE ; SPACE j:AplbE SPACE `] SPACE ← SPACE r:AplbE
            => <[ aplCellPut((c), aplIxSet2(aplCellGet((c)), (i), (j), (r))) ]>
      | c:AplbName `[ SPACE i:AplbE SPACE ; SPACE `] SPACE ← SPACE r:AplbE
            => <[ aplCellPut((c), aplIxSetRow(aplCellGet((c)), (i), (r))) ]>
      | c:AplbName `[ SPACE ; SPACE j:AplbE SPACE `] SPACE ← SPACE r:AplbE
            => <[ aplCellPut((c), aplIxSetCol(aplCellGet((c)), (j), (r))) ]>
      | c:AplbName `[ SPACE i:AplbE SPACE `] SPACE ← SPACE r:AplbE
            => <[ aplCellPut((c), aplIxSet1(aplCellGet((c)), (i), (r))) ]>
      | ( SPACE s:AplbAtom SPACE / SPACE c:AplbName SPACE ) SPACE ← SPACE r:AplbE
            => <[ aplCellPut((c), aplSelSet(aplCellGet((c)), (s), (r))) ]>
      | ( SPACE 0 SPACE 0 ⍉ SPACE c:AplbName SPACE ) SPACE ← SPACE r:AplbE
            => <[ aplCellPut((c), aplDiagSet(aplCellGet((c)), (r))) ]>
      | c:AplbName SPACE ← SPACE r:AplbE
            => <[ aplCellPut((c), (r)) ]>
      | ( SPACE ⊂ SPACE i:AplbE SPACE ) SPACE ⌷ SPACE r:AplbE
            => <[ aplSquadEncl((i), (r)) ]>
      | l:AplbAtom SPACE f:AplbFn SPACE r:AplbE => <[ aplDy((f), (l), (r)) ]>
      | f:AplbFn / SPACE r:AplbE                => <[ aplRed((f), "last", (r)) ]>
      | f:AplbFn ⌿ SPACE r:AplbE                => <[ aplRed((f), "first", (r)) ]>
      | l:AplbAtom / SPACE r:AplbE              => <[ aplCompress((l), (r)) ]>
      | l:AplbAtom ⌿ SPACE r:AplbE              => <[ aplCompressFirst((l), (r)) ]>
      | f:AplbFn SPACE r:AplbE                  => <[ aplMon((f), (r)) ]>
      | a:AplbAtom                              => <[ (a) ]>

    AplbAtom :Expr:=
        b:AplbBase `[ SPACE i:AplbE SPACE ; SPACE j:AplbE SPACE `]
            => <[ aplIx2((b), (i), (j)) ]>
      | b:AplbBase `[ SPACE i:AplbE SPACE ; SPACE `] => <[ aplIxRow((b), (i)) ]>
      | b:AplbBase `[ SPACE ; SPACE j:AplbE SPACE `] => <[ aplIxCol((b), (j)) ]>
      | b:AplbBase `[ SPACE ⊂ SPACE i:AplbE SPACE `] => <[ aplPick((b), (i)) ]>
      | b:AplbBase `[ SPACE i:AplbE SPACE `]         => <[ aplIx1((b), (i)) ]>
      | b:AplbBase `[ SPACE c:AplbCoord SPACE `]     => <[ aplScatter((b), (c)) ]>
      | b:AplbBase                                   => <[ (b) ]>

    AplbCoord :Expr:=
        ( SPACE v:AplbE SPACE ) SPACE r:AplbCoord => <[ aplIdxCons((v), (r)) ]>
      | ( SPACE v:AplbE SPACE )                   => <[ aplIdxOne((v)) ]>

    AplbBase :Expr:=
        ⍬                        => <[ aplZilde() ]>
      | ⍎ ( SPACE e:Expr SPACE ) => <[ (e) ]>
      | ( SPACE e:AplbE SPACE )  => <[ (e) ]>
      | c:AplbName               => <[ aplCellGet((c)) ]>
      | s:AplbStrand             => <[ (s) ]>

    (* THE CLOSED NAME SET: one line per APL name, each a sequence of one-character
       classes glued with #, each template writing that name as a free Fortress
       identifier.  The NOT predicate ends the name, so m does not match the head
       of m1; the longer names come first for the same reason.  Nine names, nine
       lines -- rung 2's AplId was five lines for every name there can be. *)
    AplbName :Expr:=
        [s]# [e]# [l]# [e]# [c]# [t]# NOT [A:Za:z0:9] => <[ (select) ]>
      | [d]# [a]# [t]# [a]# NOT [A:Za:z0:9]           => <[ (data) ]>
      | [m]# [1]# NOT [A:Za:z0:9]                     => <[ (m1) ]>
      | [v]# NOT [A:Za:z0:9]                          => <[ (v) ]>
      | [m]# NOT [A:Za:z0:9]                          => <[ (m) ]>
      | [n]# NOT [A:Za:z0:9]                          => <[ (n) ]>
      | [q]# NOT [A:Za:z0:9]                          => <[ (q) ]>
      | [a]# NOT [A:Za:z0:9]                          => <[ (a) ]>
      | [b]# NOT [A:Za:z0:9]                          => <[ (b) ]>

    AplbStrand :Expr:=
        n:AplbNum SPACE s:AplbStrand => <[ aplCat((n), (s)) ]>
      | n:AplbNum                    => <[ (n) ]>

    AplbNum :Expr:=
        ¯# n:LiteralExpr => <[ aplScalarNeg(1.0 (n)) ]>
      | n:LiteralExpr    => <[ aplScalar(1.0 (n)) ]>

    AplbFn :Expr:=
        ⍳ => <[ "iota" ]>
      | ⍴ => <[ "rho" ]>
      | ≢ => <[ "tally" ]>
      | ≡ => <[ "match" ]>
      | ⊃ => <[ "first" ]>
      | ⌽ => <[ "reverse" ]>
      | ⊖ => <[ "reversefirst" ]>
      | ⍉ => <[ "transpose" ]>
      | ⌈ => <[ "ceil" ]>
      | ⌊ => <[ "floor" ]>
      | ⌷ => <[ "squad" ]>
      | ⍸ => <[ "where" ]>
      | × => <[ "times" ]>
      | ÷ => <[ "divide" ]>
      | `+ => <[ "plus" ]>
      | `* => <[ "power" ]>
      | -  => <[ "minus" ]>
      | ,  => <[ "cat" ]>
      | ≠ => <[ "ne" ]>
      | ≤ => <[ "le" ]>
      | ≥ => <[ "ge" ]>
      | =  => <[ "eq" ]>
      | <  => <[ "lt" ]>
      | >  => <[ "gt" ]>
end

end
