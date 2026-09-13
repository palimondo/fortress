(* AplSyntax -- the grammar half: a sub-language apl⦇ … ⦈ whose terminals are
   the APL glyphs, evaluated strictly right to left as APL is, desugaring to
   the functions of AplCore.  Grown from explorations/apl-probes/e30_aplg.fsi
   (rung 1) and extended with indexing, assignment and the workspace (rung 2).

   Five things to know before editing this file.

   (1) The free names in the templates below (aplDy, aplMon, aplRed, aplCat,
       aplScalar, aplZilde, aplSet, aplGet, aplIx1 …) resolve at the USE SITE,
       not here, so this api does not import AplCore; the component that writes
       apl⦇ … ⦈ must import both.

   (2) SPACE and a plain space between symbols both translate to the
       nonterminal w, which is OPTIONAL whitespace
       (ComposingSyntaxDefTranslator.java:147-149), so 2 4⍴⍳8 parses against a
       production written with spaces.  That is what lets the chapter's
       examples be copied in verbatim.

   (3) The escape for APL's plus and for the index brackets -- an escaped +, [
       and ] -- is seen by the PREPARSER as an opening quote that wants a
       closing ' (PreCompilation.rats:115, PreParserState.java:256).  The file
       survives only because the preparser cannot tokenise an APL glyph at all
       and gives up before it reaches them.  Keep at least one APL glyph above
       every escape (the ⍝ of the Expr production is above them all), or the
       delimiter check reaches the end of the file and rejects it.

   (4) A nonterminal's name must not be a word of two or more uppercase letters:
       such a word is an operator, not an identifier (spec
       basic/lexical-structure.tex:1167-1172, NodeUtil.validOp), and the api is
       rejected with a bare "Syntax Error" pointing at the name.  rung-2/p12a.

   (5) APL's variables are the workspace of AplCore, not Fortress bindings: a
       template cannot expand to a binding or an assignment (rung 1, gap row 8),
       but it can expand to a call.  A name is SPELLED here rather than spliced
       -- a character class of letters concatenated into a String, as the
       shipped Xml.fsi builds its attribute names (syntax_abstraction_tests/
       Xml.fsi:120-133) -- because an Id gap is not an expression (gap row 4). *)
api AplSyntax

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar Apl extends { Expression, Literal }

    (* one new Expr form, with and without a trailing APL comment, so that a
       line of the book can be copied in as it stands.  The comment tail is
       right-recursive with a NOT predicate, one character at a time: a
       { NOT ⦈ _ }* group instead runs to the end of the file and the expander
       never closes (rung-1/p09_comment.out.0). *)
    Expr |:= apl⦇ e:AplE SPACE ⍝ t:AplCmt ⦈ => <[ (e) ]>
           | apl⦇ e:AplE ⦈                  => <[ (e) ]>

    AplCmt :Expr:=
        NOT ⦈ _ t:AplCmt => <[ 0 ]>
      | NOT ⦈ _          => <[ 0 ]>

    (* APL evaluation order: no precedence, strictly right to left.  The left
       argument of a dyadic function is an atom; its right argument is the
       whole rest of the expression.  f/ and f⌿ are one rule each, for every
       function glyph, rather than one rule per glyph; sel/ and sel⌿ -- an ATOM
       before the slash -- are Compress and Replicate, and must come after the
       reduce rules, which they cannot mask because a glyph is not an atom.

       The assignment rules come first, and there is one per invertible
       left-hand side: APL inverts an arbitrary expression on the left of ←,
       a template grammar needs a production and a function per shape. *)
    AplE :Expr:=
        n:AplId `[ SPACE i:AplE SPACE ; SPACE j:AplE SPACE `] SPACE ← SPACE r:AplE
            => <[ aplSet((n), aplIxSet2(aplGet((n)), (i), (j), (r))) ]>
      | n:AplId `[ SPACE i:AplE SPACE ; SPACE `] SPACE ← SPACE r:AplE
            => <[ aplSet((n), aplIxSetRow(aplGet((n)), (i), (r))) ]>
      | n:AplId `[ SPACE ; SPACE j:AplE SPACE `] SPACE ← SPACE r:AplE
            => <[ aplSet((n), aplIxSetCol(aplGet((n)), (j), (r))) ]>
      | n:AplId `[ SPACE i:AplE SPACE `] SPACE ← SPACE r:AplE
            => <[ aplSet((n), aplIxSet1(aplGet((n)), (i), (r))) ]>
      | ( SPACE s:AplAtom SPACE / SPACE n:AplId SPACE ) SPACE ← SPACE r:AplE
            => <[ aplSet((n), aplSelSet(aplGet((n)), (s), (r))) ]>
      | ( SPACE 0 SPACE 0 ⍉ SPACE n:AplId SPACE ) SPACE ← SPACE r:AplE
            => <[ aplSet((n), aplDiagSet(aplGet((n)), (r))) ]>
      | n:AplId SPACE ← SPACE r:AplE
            => <[ aplSet((n), (r)) ]>
      | ( SPACE ⊂ SPACE i:AplE SPACE ) SPACE ⌷ SPACE r:AplE
            => <[ aplSquadEncl((i), (r)) ]>
      | l:AplAtom SPACE f:AplFn SPACE r:AplE => <[ aplDy((f), (l), (r)) ]>
      | f:AplFn / SPACE r:AplE               => <[ aplRed((f), "last", (r)) ]>
      | f:AplFn ⌿ SPACE r:AplE               => <[ aplRed((f), "first", (r)) ]>
      | l:AplAtom / SPACE r:AplE             => <[ aplCompress((l), (r)) ]>
      | l:AplAtom ⌿ SPACE r:AplE             => <[ aplCompressFirst((l), (r)) ]>
      | f:AplFn SPACE r:AplE                 => <[ aplMon((f), (r)) ]>
      | a:AplAtom                            => <[ (a) ]>

    (* Bracket indexing, one production per bracket shape.  The axis list COULD
       be passed as one host list instead: a repeated gap splices with ** and
       rung-2/p17_ixlist.fss indexes with one, two and three axes through a
       single production.  What forces a production per shape is ELISION -- the
       empty axis of m[1;] -- because a bound optional gap (i:AplE?) is
       unimplemented ("not supported now", apl-probes b07b_optvar), so an elided
       axis would have to become a sentinel VALUE in the array domain.  One
       production and one function per shape keeps the sentinel out.  ⊂ and a vector of parenthesised
       coordinate vectors are absorbed HERE, by the grammar, and never become
       values: m[⊂1 1] is one coordinate vector and m[(0 0)(1 1)] is a matrix of
       them, so scatter indexing needs no array-of-arrays. *)
    AplAtom :Expr:=
        b:AplBase `[ SPACE i:AplE SPACE ; SPACE j:AplE SPACE `]
            => <[ aplIx2((b), (i), (j)) ]>
      | b:AplBase `[ SPACE i:AplE SPACE ; SPACE `] => <[ aplIxRow((b), (i)) ]>
      | b:AplBase `[ SPACE ; SPACE j:AplE SPACE `] => <[ aplIxCol((b), (j)) ]>
      | b:AplBase `[ SPACE ⊂ SPACE i:AplE SPACE `] => <[ aplPick((b), (i)) ]>
      | b:AplBase `[ SPACE i:AplE SPACE `]         => <[ aplIx1((b), (i)) ]>
      | b:AplBase `[ SPACE c:AplCoord SPACE `]     => <[ aplScatter((b), (c)) ]>
      | b:AplBase                                  => <[ (b) ]>

    AplCoord :Expr:=
        ( SPACE v:AplE SPACE ) SPACE r:AplCoord => <[ aplIdxCons((v), (r)) ]>
      | ( SPACE v:AplE SPACE )                  => <[ aplIdxOne((v)) ]>

    (* ⍬ is zilde, the empty numeric vector; a bare name is a workspace lookup;
       ⍎(…) escapes to a Fortress expression, which is how APL here names a
       Fortress variable -- an Id gap cannot be spliced into an expression
       position (p03a).  The parentheses are load-bearing: an undelimited Expr
       gap is greedy and eats any host operator that follows it, so ⍎v ≡ 1 4⍴⍎v
       parsed as aplDy("rho", v EQV (1 4), v) and died with "** bug! Expect all
       oprefs to be top level EQV" (p06_cross.out.0).  Rats does not re-enter a
       nonterminal for a shorter match, so only a closing delimiter bounds it. *)
    AplBase :Expr:=
        ⍬                        => <[ aplZilde() ]>
      | ⍎ ( SPACE e:Expr SPACE ) => <[ (e) ]>
      | ( SPACE e:AplE SPACE )   => <[ (e) ]>
      | n:AplId                  => <[ aplGet((n)) ]>
      | s:AplStrand              => <[ (s) ]>

    (* an APL name, spelled one character at a time; # forbids whitespace inside
       it, so "v w" is two names and not one.  The first character must be a
       LETTER and only the tail admits digits, APL's own rule: a name is tried
       before a numeral in AplBase, so a class that admitted a leading digit
       would read the 9 of 9 2 6 as a name (rung-2/p14_idx.out.0). *)
    AplId:String :Expr:=
        x:AplCh# y:AplIdTail => <[ x y ]>
      | x:AplCh              => <[ x "" ]>

    AplIdTail:String :Expr:=
        x:AplChD# y:AplIdTail => <[ x y ]>
      | x:AplChD              => <[ x "" ]>

    AplCh:String :StringLiteralExpr:= x:[A:Za:z] => <[ "" x ]>
    AplChD:String :StringLiteralExpr:= x:[A:Za:z0:9] => <[ "" x ]>

    (* strand notation: 1 2 3 is one vector, not three juxtaposed numbers *)
    AplStrand :Expr:=
        n:AplNum SPACE s:AplStrand => <[ aplCat((n), (s)) ]>
      | n:AplNum                   => <[ (n) ]>

    (* ¯ is APL's high minus, part of the numeral and not a function; # keeps it
       glued to its digits *)
    AplNum :Expr:=
        ¯# n:LiteralExpr => <[ aplScalarNeg(1.0 (n)) ]>
      | n:LiteralExpr    => <[ aplScalar(1.0 (n)) ]>

    (* Every function glyph reduces to its name; AplCore dispatches on the
       name, monadically or dyadically according to which rule of AplE fired.
       A glyph the host lexer knows (× ÷ - , = < >) and one it does not (⍳ ⍴ ≢
       ≡ ⊃ ⌽ ⊖ ⍉ ⌷ ⍸) are equally ordinary terminals here. *)
    AplFn :Expr:=
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
